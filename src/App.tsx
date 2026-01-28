import { useState, useEffect, useLayoutEffect, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './index.css';
import { Sidebar } from './components/Layout/Sidebar';
import { Editor } from './components/Editor/Editor';
import { AppearanceSettings } from './components/Editor/AppearanceSettings';
import { Preview } from './components/Preview/Preview';
import { SiteFooter } from './components/Layout/SiteFooter';
import { ScrollToTop } from './components/Layout/ScrollToTop';
import { PrivacyPolicy } from './components/Legal/PrivacyPolicy';
import { TermsOfService } from './components/Legal/TermsOfService';
import { useResumeStore } from './store/useResumeStore';
import { exportToPDF } from './utils/pdfExport';
import { Moon, Sun, Menu, X, Eye } from 'lucide-react';
import { WelcomePopup } from './components/Layout/WelcomePopup';
import { FloatingChatAssistant } from './components/Layout/FloatingChatAssistant';

type PageType = 'home' | 'privacy' | 'terms';

function App() {
  const [activeTab, setActiveTab] = useState<'content' | 'appearance'>('content');
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showMobilePreview, setShowMobilePreview] = useState(false);
  const [currentPage, setCurrentPage] = useState<PageType>('home');
  const [showWelcome, setShowWelcome] = useState(true);
  const [previewScale, setPreviewScale] = useState(1);

  const previewAreaRef = useRef<HTMLDivElement | null>(null);
  const previewContainerRef = useRef<HTMLDivElement | null>(null);
  const basePreviewWidthPxRef = useRef<number | null>(null);

  const { resume, isDarkMode, toggleDarkMode } = useResumeStore();

  // Apply dark mode class to body
  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, [isDarkMode]);

  const handleExport = async () => {
    const filename = `${resume.personal.fullName.replace(/\s+/g, '_')}_Resume.pdf`;
    await exportToPDF('resume-preview', filename);
  };

  const shouldAutoScalePreview = useMemo(() => {
    // Only auto-scale in desktop split view. Fullscreen & mobile overlay should be 1:1.
    return !isPreviewOpen && !showMobilePreview;
  }, [isPreviewOpen, showMobilePreview]);

  useLayoutEffect(() => {
    if (!shouldAutoScalePreview) {
      setPreviewScale(1);
      return;
    }

    const area = previewAreaRef.current;
    const container = previewContainerRef.current;
    if (!area || !container) return;

    const update = () => {
      // Measure the "paper" width at scale=1 once, then reuse.
      if (!basePreviewWidthPxRef.current) {
        const prevTransform = container.style.transform;
        container.style.transform = 'none';
        basePreviewWidthPxRef.current = container.getBoundingClientRect().width;
        container.style.transform = prevTransform;
      }

      const baseWidth = basePreviewWidthPxRef.current || container.getBoundingClientRect().width || 1;
      // Leave some breathing room for padding and shadows inside the preview area.
      const available = Math.max(0, area.clientWidth - 24);
      const nextScale = Math.min(1, available / baseWidth);
      setPreviewScale(Number.isFinite(nextScale) && nextScale > 0 ? nextScale : 1);
    };

    update();
    const ro = new ResizeObserver(() => update());
    ro.observe(area);

    return () => ro.disconnect();
  }, [shouldAutoScalePreview]);

  return (
    <div className="app-container">
      {currentPage === 'privacy' && (
        <PrivacyPolicy onBack={() => setCurrentPage('home')} />
      )}
      {currentPage === 'terms' && (
        <TermsOfService onBack={() => setCurrentPage('home')} />
      )}
      {currentPage === 'home' && (
        <>
          <header className="main-header glass-panel">
            <div className="header-content">
              <motion.div
                className="logo"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="logo-mark">
                  <span className="logo-glyph">༄</span>
                </div>
                <div className="logo-text">
                  <h1>Our Store</h1>
                  <p>Bhutanese-inspired, job-ready resumes</p>
                </div>
              </motion.div>
              <div className="header-actions">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="btn-icon mobile-only"
                  onClick={() => setShowMobilePreview(!showMobilePreview)}
                  title="Toggle Preview"
                >
                  <Eye size={20} color={showMobilePreview ? 'var(--primary)' : 'currentColor'} />
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="btn-icon"
                  onClick={toggleDarkMode}
                  title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Night Mode'}
                >
                  {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-outline desktop-only"
                  onClick={() => setIsPreviewOpen(!isPreviewOpen)}
                >
                  {isPreviewOpen ? 'Edit Content' : 'Preview Fullscreen'}
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-primary desktop-only"
                  onClick={handleExport}
                >
                  <span>Export PDF</span>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="btn-icon mobile-only"
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                  {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
                </motion.button>
              </div>
            </div>
          </header>

          <main className="main-content">
            {!isPreviewOpen && !showMobilePreview && (
              <motion.div
                initial={false}
                animate={{ opacity: isMobileMenuOpen || !isPreviewOpen ? 1 : 0 }}
                className={`sticky-sidebar-wrapper ${isMobileMenuOpen ? 'mobile-open' : ''}`}
              >
                <Sidebar
                  activeTab={activeTab}
                  setActiveTab={(tab) => {
                    setActiveTab(tab);
                    setIsMobileMenuOpen(false);
                  }}
                />
              </motion.div>
            )}

            <AnimatePresence mode="wait">
              {!isPreviewOpen && (
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="editor-area"
                >
                  {activeTab === 'content' ? <Editor /> : <AppearanceSettings />}
                </motion.div>
              )}
            </AnimatePresence>

            <motion.div
              className={`preview-area ${isPreviewOpen ? 'fullscreen' : ''} ${showMobilePreview ? 'mobile-visible' : ''}`}
              animate={{ flex: isPreviewOpen ? 10 : 1.0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              ref={previewAreaRef as any}
            >
              <div className="preview-background-pattern"></div>
              <motion.div
                id="resume-preview"
                className="preview-container"
                layout
                ref={previewContainerRef as any}
                style={{
                  transform: `scale(${previewScale})`,
                }}
              >
                <Preview />
              </motion.div>
              {showMobilePreview && (
                <button className="mobile-export-btn btn-primary mobile-only" onClick={handleExport}>
                  Export PDF
                </button>
              )}
            </motion.div>
          </main>

          <SiteFooter onNavigate={setCurrentPage} />
          <ScrollToTop />
          <ScrollToTop />
          <AnimatePresence>
            {showWelcome && <WelcomePopup onClose={() => setShowWelcome(false)} />}
          </AnimatePresence>
          <FloatingChatAssistant />
        </>
      )}

      <style>{`
        .btn-icon {
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          background: var(--bg-main);
          border: 1px solid var(--border);
          color: var(--text-main);
          transition: var(--transition);
          flex: 0 0 auto;
          touch-action: manipulation;
        }

        .btn-icon:hover {
          border-color: var(--primary);
          color: var(--primary);
          background: var(--primary-glow);
        }

        .app-container {
          display: flex;
          flex-direction: column;
          min-height: 100vh;
          padding-bottom: 0;
          background: transparent;
        }

        .main-header {
          position: sticky;
          top: 0;
          height: var(--header-height);
          padding: 0 2rem;
          display: flex;
          align-items: center;
          z-index: 100;
          margin: 1rem 2rem 0;
          border-radius: var(--radius-lg);
          /* iOS notch / Android cutout */
          padding-top: env(safe-area-inset-top);
        }

        .header-content {
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
          max-width: 1600px;
          margin: 0 auto;
          min-width: 0;
        }

        .logo {
          display: flex;
          align-items: center;
          gap: 1rem;
          min-width: 0;
        }

        .logo-mark {
          width: 40px;
          height: 40px;
          border-radius: 999px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: conic-gradient(from 180deg, var(--primary), var(--secondary), var(--accent), var(--primary));
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.16);
          border: 2px solid rgba(255, 255, 255, 0.7);
        }

        .logo-glyph {
          font-size: 1.25rem;
          color: #fff;
        }

        .logo-text {
          display: flex;
          flex-direction: column;
          min-width: 0;
        }

        .logo-text h1 {
          font-size: 1.35rem;
          font-weight: 800;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--text-main);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .logo-text p {
          font-size: 0.75rem;
          color: var(--text-muted);
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }

        .header-actions {
          display: flex;
          gap: 1rem;
          align-items: center;
          flex: 0 0 auto;
          min-width: 0;
        }

        .main-content {
          display: flex;
          flex: 1;
          position: relative;
          max-width: 1440px;
          margin: 0 auto;
          width: 100%;
        }

        .editor-area {
          flex: 1.75;
          padding: 2rem 2.25rem 2.5rem;
          min-width: 0;
        }

        .preview-area {
          flex: 0.9;
          padding: 2rem 2.25rem 2.5rem;
          display: flex;
          justify-content: center;
          position: relative;
          min-width: 0;
        }

        .preview-background-pattern {
          position: absolute;
          inset: 0;
          opacity: 0.12;
          background-image:
            radial-gradient(circle at 0% 0%, rgba(255, 215, 0, 0.35) 0, transparent 55%),
            radial-gradient(circle at 100% 0%, rgba(213, 43, 30, 0.35) 0, transparent 55%),
            radial-gradient(circle at 50% 100%, rgba(255, 140, 0, 0.25) 0, transparent 55%);
          mix-blend-mode: soft-light;
          pointer-events: none;
        }

        .preview-area.fullscreen {
          position: fixed;
          top: var(--header-height);
          left: 0;
          right: 0;
          bottom: 0;
          z-index: 50;
          background: radial-gradient(circle at 0 0, rgba(255, 215, 0, 0.12), transparent 55%),
                      radial-gradient(circle at 100% 0, rgba(255, 140, 0, 0.12), transparent 55%),
                      rgba(244, 247, 246, 0.98);
          overflow-y: auto;
          -webkit-overflow-scrolling: touch;
        }

        .preview-container {
          width: min(210mm, 100%);
          min-height: 297mm;
          background: white;
          box-shadow: 0 20px 50px rgba(0,0,0,0.12);
          transform-origin: top center;
          z-index: 1;
          border-radius: 18px;
          border: 1px solid rgba(15, 23, 42, 0.06);
          overflow: hidden;
        }

        .glass-light {
           background: rgba(255, 255, 255, 1);
           backdrop-filter: blur(4px);
        }

        .sticky-sidebar-wrapper {
          position: sticky;
          top: var(--header-height);
          height: calc(100vh - var(--header-height));
          display: flex;
          z-index: 90;
        }

        /* Preview scaling is handled dynamically in JS so it always fits the available panel width */

        @media (max-width: 1280px) {
          .main-header {
            margin: 0.75rem 1.25rem 0;
            padding: 0 1.25rem;
          }

          .editor-area,
          .preview-area {
            padding-inline: 1.5rem;
          }
        }

        @media (max-width: 768px) {
          .main-header {
            /* Allow header to grow if needed instead of clipping when space is tight */
            height: auto;
            min-height: var(--header-height);
            padding-block: 0.5rem;
          }

          .header-content {
            gap: 0.5rem;
            flex-wrap: nowrap;
            align-items: center;
          }

          .logo {
            gap: 0.75rem;
            flex: 1 1 auto;
            min-width: 0;
          }

          .header-actions {
            gap: 0.5rem;
            flex-wrap: nowrap;
          }

          .logo-mark {
            width: 32px;
            height: 32px;
          }

          .logo-text h1 {
            font-size: clamp(0.85rem, 2.8vw, 0.95rem);
            letter-spacing: 0.12em;
            max-width: 12.5rem;
          }

          .logo-text p {
            font-size: 0.6rem;
            letter-spacing: 0.12em;
          }
        }

        @media (max-width: 480px) {
          .main-header {
            margin: 0.5rem 0.75rem 0;
            padding: 0 0.75rem;
          }

          .logo-text p {
            display: none;
          }

          .logo-text h1 {
            max-width: 10.5rem;
          }

          .header-actions .btn-icon {
            width: 34px;
            height: 34px;
          }

          .header-actions {
            gap: 0.35rem;
          }
        }

        @media (max-width: 360px) {
          .logo-text h1 {
            max-width: 9rem;
          }

          .header-actions .btn-icon {
            width: 32px;
            height: 32px;
          }
        }

        .mobile-only { display: none; }
        .desktop-only { display: flex; }

        @media (max-width: 1024px) {
          .mobile-only { display: flex; }
          .desktop-only { display: none; }

          .main-content {
            flex-direction: column;
          }

          .sticky-sidebar-wrapper {
            position: fixed;
            top: var(--header-height);
            left: 0;
            width: 80%;
            max-width: 320px;
            height: calc(100vh - var(--header-height));
            z-index: 200;
            background: var(--bg-sidebar);
            box-shadow: 20px 0 50px rgba(0,0,0,0.2);
            transform: translateX(-100%);
            transition: transform 0.3s ease;
          }

          .sticky-sidebar-wrapper.mobile-open {
            transform: translateX(0);
          }

          .editor-area {
            min-width: 100%;
            padding: 1.25rem 1.5rem 2rem;
          }

          .preview-area {
            display: none;
            position: fixed;
            top: var(--header-height);
            left: 0;
            right: 0;
            bottom: 0;
            z-index: 150;
            background: radial-gradient(circle at 50% 0, rgba(255, 215, 0, 0.24), transparent 55%),
                        #0b1120;
            min-width: 100%;
            padding: 1.25rem 0.75rem 1.25rem;
          }

          .preview-area.mobile-visible {
            display: flex;
            flex-direction: column;
            overflow-y: auto;
            -webkit-overflow-scrolling: touch;
            overscroll-behavior: contain;
          }

          .preview-container {
            width: 100%;
            min-height: auto;
            transform-origin: top center;
          }

          .mobile-export-btn {
            position: fixed;
            bottom: 2rem;
            left: 50%;
            transform: translateX(-50%);
            z-index: 160;
            box-shadow: 0 10px 20px rgba(0,0,0,0.2);
          }
        }
      `}</style>
    </div>
  );
}

export default App;
