import { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { CheckCircle2, RefreshCcw, UploadCloud, X } from 'lucide-react';

const PAYMENT_DURATION_SECONDS = 300;
const AMOUNT_TOLERANCE = 0.5;
const QR_IMAGE_SRC = '/mbob-qr.png.jpeg';

const validExtensions = ['png', 'jpg', 'jpeg'];
const OCR_LANGUAGE = 'eng';

const formatTime = (totalSeconds: number) => {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
};

const formatFileSize = (size: number) => {
  if (size < 1024) return `${size} B`;
  if (size < 1024 * 1024) return `${(size / 1024).toFixed(1)} KB`;
  return `${(size / (1024 * 1024)).toFixed(2)} MB`;
};

const normalizeText = (text: string) => text.replace(/[\n\r]+/g, ' ').replace(/\s+/g, ' ').trim();

const parseAmountFromText = (text: string, expectedAmount: number) => {
  const cleaned = text.replace(/,/g, '');
  const patterns = [
    /(?:nu\.?|btn|amount|amt|paid|pay)\s*[:\-]?\s*([0-9]+(?:\.[0-9]{1,2})?)/gi,
    /\b([0-9]+(?:\.[0-9]{1,2})?)\s*(?:nu\.?|btn)\b/gi
  ];

  const candidates: number[] = [];
  patterns.forEach((pattern) => {
    for (const match of cleaned.matchAll(pattern)) {
      const value = Number.parseFloat(match[1]);
      if (!Number.isNaN(value)) {
        candidates.push(value);
      }
    }
  });

  if (!candidates.length) return null;

  const closest = candidates.reduce((prev, current) =>
    Math.abs(current - expectedAmount) < Math.abs(prev - expectedAmount) ? current : prev
  );

  return closest;
};

const parseDateCandidates = (text: string) => {
  const candidates: Date[] = [];
  const normalized = text.replace(/\s+/g, ' ');

  const yyyyFirst = /\b(\d{4})[\/.\-](\d{1,2})[\/.\-](\d{1,2})\b/g;
  const ddFirst = /\b(\d{1,2})[\/.\-](\d{1,2})[\/.\-](\d{2,4})\b/g;

  let match: RegExpExecArray | null;
  while ((match = yyyyFirst.exec(normalized))) {
    const year = Number.parseInt(match[1], 10);
    const month = Number.parseInt(match[2], 10);
    const day = Number.parseInt(match[3], 10);
    if (month >= 1 && month <= 12 && day >= 1 && day <= 31) {
      candidates.push(new Date(year, month - 1, day));
    }
  }

  while ((match = ddFirst.exec(normalized))) {
    const part1 = Number.parseInt(match[1], 10);
    const part2 = Number.parseInt(match[2], 10);
    const yearRaw = Number.parseInt(match[3], 10);
    const year = yearRaw < 100 ? 2000 + yearRaw : yearRaw;

    if (part1 >= 1 && part1 <= 31 && part2 >= 1 && part2 <= 12) {
      candidates.push(new Date(year, part2 - 1, part1));
    }
    if (part2 >= 1 && part2 <= 31 && part1 >= 1 && part1 <= 12) {
      candidates.push(new Date(year, part1 - 1, part2));
    }
  }

  return candidates;
};

const parseTimeCandidates = (text: string) => {
  const candidates: { hours: number; minutes: number }[] = [];
  const normalized = text.replace(/\s+/g, ' ');
  const timePattern = /\b(\d{1,2})[:.](\d{2})(?:[:.](\d{2}))?\s*(am|pm)?\b/gi;

  let match: RegExpExecArray | null;
  while ((match = timePattern.exec(normalized))) {
    let hours = Number.parseInt(match[1], 10);
    const minutes = Number.parseInt(match[2], 10);
    const meridiem = match[4]?.toLowerCase();

    if (Number.isNaN(hours) || Number.isNaN(minutes)) continue;
    if (meridiem) {
      if (meridiem === 'pm' && hours < 12) hours += 12;
      if (meridiem === 'am' && hours === 12) hours = 0;
    }

    if (hours >= 0 && hours <= 23 && minutes >= 0 && minutes <= 59) {
      candidates.push({ hours, minutes });
    }
  }

  return candidates;
};

const buildDateTimeCandidates = (dates: Date[], times: { hours: number; minutes: number }[]) => {
  const candidates: Date[] = [];
  if (!dates.length || !times.length) return candidates;

  dates.forEach((date) => {
    times.forEach((time) => {
      const next = new Date(date.getFullYear(), date.getMonth(), date.getDate(), time.hours, time.minutes, 0, 0);
      candidates.push(next);
    });
  });

  return candidates;
};

type PaymentStep = 'qr' | 'preview' | 'verifying' | 'success' | 'expired';

interface PaymentModalProps {
  amount?: number;
  onClose: () => void;
  onVerified: () => void;
}

export const PaymentModal = ({ amount = 300, onClose, onVerified }: PaymentModalProps) => {
  const [step, setStep] = useState<PaymentStep>('qr');
  const [remainingSeconds, setRemainingSeconds] = useState(PAYMENT_DURATION_SECONDS);
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const timerStartRef = useRef<number>(Date.now());
  const paymentStartRef = useRef<Date>(new Date());
  const remainingRef = useRef<number>(PAYMENT_DURATION_SECONDS);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const timerTone = useMemo(() => {
    if (remainingSeconds <= 10) return 'danger';
    if (remainingSeconds <= 30) return 'warning';
    return 'safe';
  }, [remainingSeconds]);

  const isExpired = step === 'expired' || remainingSeconds <= 0;

  const resetFlow = () => {
    setStep('qr');
    setFile(null);
    setErrorMessage(null);
    setPreviewUrl((current) => {
      if (current) URL.revokeObjectURL(current);
      return null;
    });
    timerStartRef.current = Date.now();
    paymentStartRef.current = new Date();
    setRemainingSeconds(PAYMENT_DURATION_SECONDS);
  };

  useEffect(() => {
    resetFlow();

    const intervalId = window.setInterval(() => {
      const elapsedSeconds = Math.floor((Date.now() - timerStartRef.current) / 1000);
      const nextRemaining = Math.max(PAYMENT_DURATION_SECONDS - elapsedSeconds, 0);
      setRemainingSeconds(nextRemaining);
    }, 500);

    return () => {
      window.clearInterval(intervalId);
      setPreviewUrl((current) => {
        if (current) URL.revokeObjectURL(current);
        return null;
      });
    };
  }, []);

  useEffect(() => {
    remainingRef.current = remainingSeconds;
    if (remainingSeconds <= 0 && step !== 'success') {
      setStep('expired');
    }
  }, [remainingSeconds, step]);

  const handleClose = () => {
    onClose();
  };

  const openFilePicker = () => {
    if (isExpired) return;
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (!selectedFile) return;

    setErrorMessage(null);
    setFile(selectedFile);
    setStep('preview');

    setPreviewUrl((current) => {
      if (current) URL.revokeObjectURL(current);
      return URL.createObjectURL(selectedFile);
    });

    event.target.value = '';
  };

  const handleVerify = async () => {
    if (!file) {
      setErrorMessage('Please upload a payment screenshot before verifying.');
      return;
    }

    if (remainingRef.current <= 0) {
      setErrorMessage('Payment window expired. Please click Retry and try again.');
      return;
    }

    const extension = file.name.split('.').pop()?.toLowerCase();
    const isValidType = ['image/png', 'image/jpeg'].includes(file.type) || (extension ? validExtensions.includes(extension) : false);

    if (!isValidType) {
      setErrorMessage('Invalid file type. Please upload a PNG or JPG screenshot.');
      return;
    }

    setStep('verifying');
    setErrorMessage(null);

    try {
      const { createWorker } = await import('tesseract.js');
      const worker = await createWorker(OCR_LANGUAGE);
      let extractedText = '';

      try {
        const { data } = await worker.recognize(file);
        extractedText = normalizeText(data.text || '');
      } finally {
        await worker.terminate();
      }

      // Verify amount (Nu 300)
      const parsedAmount = parseAmountFromText(extractedText, amount);
      if (parsedAmount === null || Math.abs(parsedAmount - amount) > AMOUNT_TOLERANCE) {
        throw new Error('Payment amount not detected. Please upload a full payment confirmation screenshot.');
      }

      // Verify date and time
      const dateCandidates = parseDateCandidates(extractedText);
      const timeCandidates = parseTimeCandidates(extractedText);
      const dateTimeCandidates = buildDateTimeCandidates(dateCandidates, timeCandidates);

      if (!dateTimeCandidates.length) {
        throw new Error('Payment date/time not detected. Please upload the full payment confirmation screenshot.');
      }

      const windowStart = paymentStartRef.current;
      const windowEnd = new Date(windowStart.getTime() + PAYMENT_DURATION_SECONDS * 1000);
      const withinWindow = dateTimeCandidates.some((candidate) => candidate >= windowStart && candidate <= windowEnd);

      if (!withinWindow) {
        throw new Error('Payment date/time is outside the 5-minute window. Please retry and upload the latest payment screenshot.');
      }

      if (remainingRef.current <= 0) {
        throw new Error('Payment window expired. Please click Retry and try again.');
      }

      setStep('success');
      window.setTimeout(() => {
        onVerified();
        onClose();
      }, 1500);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Verification failed. Please try again.';
      setStep(remainingRef.current <= 0 ? 'expired' : 'preview');
      setErrorMessage(message);
    }
  };

  const stepMotion = {
    initial: { opacity: 0, y: 12 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -8 }
  };

  return (
    <motion.div
      className="payment-backdrop"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="payment-modal glass-panel"
        initial={{ scale: 0.95, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.96, opacity: 0, y: 10 }}
        transition={{ type: 'spring', stiffness: 260, damping: 24 }}
      >
        <button className="payment-close" onClick={handleClose} aria-label="Close payment modal">
          <X size={20} />
        </button>

        <div className="payment-header">
          <h2>Export Your Resume</h2>
          <p>Complete payment of Nu. {amount} to download your resume as PDF</p>
        </div>

        <div className={`payment-timer ${timerTone}`}>
          Payment window: {formatTime(remainingSeconds)} remaining
        </div>

        <AnimatePresence mode="wait">
          {step === 'qr' && (
            <motion.div key="qr" className="payment-step" {...stepMotion}>
              <div className="qr-placeholder">
                {/* TODO: Replace with actual bank QR code image if needed */}
                <img src={QR_IMAGE_SRC} alt="Bank QR code" className="qr-image" />
              </div>
              <p className="qr-hint">Scan this QR code using your bank app to pay Nu. {amount}</p>
              <div className="payment-actions">
                {!isExpired && (
                  <button className="btn-primary payment-upload-btn" onClick={openFilePicker}>
                    <UploadCloud size={18} />
                    I have paid — Upload Screenshot
                  </button>
                )}
              </div>
            </motion.div>
          )}

          {step === 'preview' && (
            <motion.div key="preview" className="payment-step" {...stepMotion}>
              <div className="payment-preview">
                {previewUrl && (
                  <img src={previewUrl} alt="Payment screenshot preview" />
                )}
                {file && (
                  <div className="payment-file-meta">
                    <strong>{file.name}</strong>
                    <span>{formatFileSize(file.size)}</span>
                  </div>
                )}
              </div>

              {errorMessage && <div className="payment-error">{errorMessage}</div>}

              <div className="payment-actions">
                <button className="btn-primary" onClick={handleVerify} disabled={isExpired}>
                  Verify &amp; Export
                </button>
                <button className="btn-outline" onClick={openFilePicker}>
                  Change Screenshot
                </button>
              </div>
            </motion.div>
          )}

          {step === 'verifying' && (
            <motion.div key="verifying" className="payment-step" {...stepMotion}>
              <div className="payment-verifying">
                <span className="spinner" />
                <p>Verifying...</p>
              </div>
            </motion.div>
          )}

          {step === 'success' && (
            <motion.div key="success" className="payment-step" {...stepMotion}>
              <div className="payment-success">
                <div className="success-icon">
                  <CheckCircle2 size={56} />
                </div>
                <h3>Payment verified!</h3>
                <p>Your resume is being exported...</p>
              </div>
            </motion.div>
          )}

          {step === 'expired' && (
            <motion.div key="expired" className="payment-step" {...stepMotion}>
              <div className="payment-expired">
                <h3>Payment Expired</h3>
                <p>Your payment window has expired. Please try again.</p>
                <button className="btn-primary" onClick={resetFlow}>
                  <RefreshCcw size={18} />
                  Retry
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <input
          ref={fileInputRef}
          className="payment-file-input"
          type="file"
          accept="image/png, image/jpeg"
          onChange={handleFileChange}
        />
      </motion.div>

      <style>{`
        .payment-backdrop {
          position: fixed;
          inset: 0;
          background: rgba(15, 15, 15, 0.55);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          z-index: 1200;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1.5rem;
        }

        .payment-modal {
          width: min(560px, 100%);
          border-radius: 24px;
          padding: 2.5rem;
          position: relative;
          text-align: center;
          max-height: calc(100dvh - 3rem);
          overflow-y: auto;
        }

        .payment-close {
          position: absolute;
          top: 1.25rem;
          right: 1.25rem;
          width: 40px;
          height: 40px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          color: var(--text-muted);
          background: rgba(255, 255, 255, 0.6);
          border: 1px solid var(--border);
          transition: all 0.2s ease;
        }

        .payment-close:hover {
          color: var(--text-main);
          border-color: var(--primary);
          background: var(--primary-glow);
        }

        .payment-header h2 {
          font-size: 1.85rem;
          font-weight: 800;
          letter-spacing: -0.02em;
          margin-bottom: 0.5rem;
          color: var(--text-main);
        }

        .payment-header p {
          color: var(--text-muted);
          font-size: 1rem;
          line-height: 1.5;
        }

        .payment-timer {
          margin: 1.25rem 0 1.75rem;
          font-weight: 700;
          border-radius: 14px;
          padding: 0.75rem 1rem;
          border: 1px solid transparent;
          font-size: 0.95rem;
        }

        .payment-timer.safe {
          background: rgba(16, 185, 129, 0.18);
          color: #059669;
          border-color: rgba(16, 185, 129, 0.35);
        }

        .payment-timer.warning {
          background: rgba(251, 146, 60, 0.18);
          color: #c2410c;
          border-color: rgba(251, 146, 60, 0.35);
        }

        .payment-timer.danger {
          background: rgba(239, 68, 68, 0.18);
          color: #dc2626;
          border-color: rgba(239, 68, 68, 0.35);
        }

        .qr-placeholder {
          width: 250px;
          height: 250px;
          border: 2px dashed var(--border);
          border-radius: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          margin: 0 auto 1.25rem;
          color: var(--text-muted);
          background: rgba(255, 255, 255, 0.5);
          padding: 1rem;
          font-weight: 600;
        }

        .qr-image {
          width: 100%;
          height: 100%;
          object-fit: contain;
          border-radius: 16px;
        }

        .qr-hint {
          color: var(--text-muted);
          font-size: 0.95rem;
          margin-bottom: 1.5rem;
        }

        .payment-actions {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          align-items: center;
        }

        .payment-actions button {
          width: 100%;
          justify-content: center;
        }

        .payment-upload-btn {
          text-transform: none;
          font-size: 0.95rem;
        }

        .payment-preview {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 1.25rem;
        }

        .payment-preview img {
          max-width: 200px;
          width: 100%;
          height: auto;
          border-radius: 16px;
          border: 1px solid var(--border);
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
        }

        .payment-file-meta {
          display: flex;
          flex-direction: column;
          gap: 0.35rem;
          color: var(--text-muted);
          font-size: 0.85rem;
        }

        .payment-file-meta strong {
          color: var(--text-main);
        }

        .payment-error {
          background: rgba(239, 68, 68, 0.12);
          border: 1px solid rgba(239, 68, 68, 0.3);
          color: #dc2626;
          padding: 0.75rem 1rem;
          border-radius: 12px;
          margin-bottom: 1rem;
          font-size: 0.9rem;
        }

        .payment-verifying {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
          padding: 1rem 0 1.5rem;
        }

        .payment-verifying p {
          color: var(--text-muted);
          font-weight: 600;
        }

        .spinner {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          border: 3px solid rgba(255, 255, 255, 0.6);
          border-top-color: var(--primary);
          animation: spin 1s linear infinite;
        }

        .payment-success,
        .payment-expired {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.75rem;
          padding: 0.5rem 0 1.5rem;
        }

        .payment-success h3,
        .payment-expired h3 {
          font-size: 1.3rem;
          font-weight: 700;
          color: var(--text-main);
        }

        .payment-success p,
        .payment-expired p {
          color: var(--text-muted);
        }

        .success-icon {
          color: #16a34a;
          background: rgba(22, 163, 74, 0.15);
          border-radius: 50%;
          width: 84px;
          height: 84px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid rgba(22, 163, 74, 0.3);
        }

        .payment-file-input {
          display: none;
        }

        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @media (min-width: 480px) {
          .payment-actions {
            flex-direction: row;
          }

          .payment-actions button {
            width: auto;
            min-width: 180px;
          }
        }

        @media (max-width: 480px) {
          .payment-modal {
            padding: 1.5rem;
            border-radius: 20px;
          }

          .payment-header h2 {
            font-size: 1.4rem;
          }

          .payment-close {
            top: 0.85rem;
            right: 0.85rem;
          }

          .qr-placeholder {
            width: 210px;
            height: 210px;
          }
        }
      `}</style>
    </motion.div>
  );
};
