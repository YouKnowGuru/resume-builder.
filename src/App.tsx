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

  // Enhanced screenshot protection for fullscreen preview
  useEffect(() => {
    if (!isPreviewOpen) return;

    // Block common screenshot keyboard shortcuts
    const handleKeyDown = (e: KeyboardEvent) => {
      // Windows: Print Screen, Alt+Print Screen, Win+Print Screen
      // Mac: Cmd+Shift+3, Cmd+Shift+4, Cmd+Shift+5
      // Linux: Print Screen
      if (
        e.key === 'PrintScreen' ||
        (e.altKey && e.key === 'PrintScreen') ||
        (e.metaKey && e.shiftKey && ['3', '4', '5'].includes(e.key)) ||
        (e.ctrlKey && e.shiftKey && e.key === 'S')
      ) {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }
    };

    // Block right-click context menu
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      return false;
    };

    // Block common screenshot-related events
    const handleSelectStart = (e: Event) => {
      e.preventDefault();
      return false;
    };

    // Block drag operations
    const handleDragStart = (e: DragEvent) => {
      e.preventDefault();
      return false;
    };

    // Block copy operations
    const handleCopy = (e: ClipboardEvent) => {
      if (isPreviewOpen) {
        e.preventDefault();
        return false;
      }
    };

    // Block cut operations
    const handleCut = (e: ClipboardEvent) => {
      if (isPreviewOpen) {
        e.preventDefault();
        return false;
      }
    };

    // Add event listeners
    document.addEventListener('keydown', handleKeyDown, true);
    document.addEventListener('contextmenu', handleContextMenu, true);
    document.addEventListener('selectstart', handleSelectStart, true);
    document.addEventListener('dragstart', handleDragStart, true);
    document.addEventListener('copy', handleCopy, true);
    document.addEventListener('cut', handleCut, true);

    // Mobile-specific: Block long press
    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length > 1) {
        e.preventDefault();
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 1) {
        e.preventDefault();
      }
    };

    document.addEventListener('touchstart', handleTouchStart, { passive: false });
    document.addEventListener('touchmove', handleTouchMove, { passive: false });

    // Cleanup
    return () => {
      document.removeEventListener('keydown', handleKeyDown, true);
      document.removeEventListener('contextmenu', handleContextMenu, true);
      document.removeEventListener('selectstart', handleSelectStart, true);
      document.removeEventListener('dragstart', handleDragStart, true);
      document.removeEventListener('copy', handleCopy, true);
      document.removeEventListener('cut', handleCut, true);
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchmove', handleTouchMove);
    };
  }, [isPreviewOpen]);

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
                <img src="/logo.png" alt="Our Store" className="logo-image" />
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
              onContextMenu={(e) => {
                // Block right-click menu on preview, especially in fullscreen
                if (isPreviewOpen) {
                  e.preventDefault();
                  e.stopPropagation();
                  return false;
                }
              }}
              onDragStart={(e) => {
                // Block drag operations in fullscreen
                if (isPreviewOpen) {
                  e.preventDefault();
                  return false;
                }
              }}
            >
              <div className="preview-background-pattern"></div>
              {(isPreviewOpen || showMobilePreview) && (
                <>
                  {/* Dense watermark grid covering entire screen */}
                  <div className="preview-watermark preview-watermark-1">
                    <span>PREVIEW ONLY · SCREENSHOTS RESTRICTED</span>
                  </div>
                  <div className="preview-watermark preview-watermark-2">
                    <span>PROTECTED CONTENT · DO NOT CAPTURE</span>
                  </div>
                  <div className="preview-watermark preview-watermark-3">
                    <span>tsirang@ourstore.tech</span>
                  </div>
                  <div className="preview-watermark preview-watermark-4">
                    <span>CONFIDENTIAL · NOT FOR SHARING</span>
                  </div>
                  <div className="preview-watermark preview-watermark-5">
                    <span>PROTECTED BY OUR STORE</span>
                  </div>
                  <div className="preview-watermark preview-watermark-6">
                    <span>SCREENSHOTS PROHIBITED</span>
                  </div>
                  <div className="preview-watermark preview-watermark-7">
                    <span>tsirang@ourstore.tech</span>
                  </div>
                  <div className="preview-watermark preview-watermark-8">
                    <span>PREVIEW ONLY · NO CAPTURE</span>
                  </div>
                  <div className="preview-watermark preview-watermark-9">
                    <span>RESTRICTED CONTENT</span>
                  </div>
                  <div className="preview-watermark preview-watermark-10">
                    <span>DO NOT SCREENSHOT</span>
                  </div>
                  <div className="preview-watermark preview-watermark-11">
                    <span>tsirang@ourstore.tech</span>
                  </div>
                  <div className="preview-watermark preview-watermark-12">
                    <span>PROTECTED · OUR STORE</span>
                  </div>
                  <div className="preview-watermark preview-watermark-13">
                    <span>NO SCREENSHOTS ALLOWED</span>
                  </div>
                  <div className="preview-watermark preview-watermark-14">
                    <span>CONFIDENTIAL PREVIEW</span>
                  </div>
                  <div className="preview-watermark preview-watermark-15">
                    <span>tsirang@ourstore.tech</span>
                  </div>
                  <div className="preview-watermark preview-watermark-16">
                    <span>RESTRICTED · NO CAPTURE</span>
                  </div>
                  <div className="preview-watermark preview-watermark-17">
                    <span>PROTECTED CONTENT</span>
                  </div>
                  <div className="preview-watermark preview-watermark-18">
                    <span>SCREENSHOTS BLOCKED</span>
                  </div>
                  {/* Overlay protection layer */}
                  <div className="preview-protection-overlay"></div>
                </>
              )}
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

        .logo-image {
            height: 80px; /* Increased size as requested */
            width: auto;
            object-fit: contain;
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

        /* Enhanced screenshot protection for fullscreen preview */
        .preview-area.fullscreen {
          -webkit-user-select: none !important;
          -moz-user-select: none !important;
          -ms-user-select: none !important;
          user-select: none !important;
          -webkit-touch-callout: none !important;
          -webkit-user-drag: none !important;
          -khtml-user-select: none !important;
        }

        .preview-area.fullscreen * {
          -webkit-user-select: none !important;
          -moz-user-select: none !important;
          -ms-user-select: none !important;
          user-select: none !important;
          -webkit-touch-callout: none !important;
          -webkit-user-drag: none !important;
          -khtml-user-select: none !important;
        }

        .preview-area.fullscreen img,
        .preview-area.fullscreen svg,
        .preview-area.fullscreen canvas {
          pointer-events: none !important;
          -webkit-user-drag: none !important;
          -webkit-touch-callout: none !important;
          -webkit-user-select: none !important;
        }

        /* Multiple watermark layers for stronger visual protection */
        .preview-watermark {
          position: fixed;
          inset: 0;
          pointer-events: none;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 9999;
          mix-blend-mode: multiply;
        }

        .preview-watermark-1 {
          opacity: 0.15;
        }

        .preview-watermark-1 span {
          font-size: 3rem;
          font-weight: 900;
          text-transform: uppercase;
          letter-spacing: 0.3em;
          color: #dc2626;
          transform: rotate(-25deg);
          text-align: center;
          padding: 0 3rem;
          text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
        }

        .preview-watermark-2 {
          opacity: 0.12;
          transform: translateY(150px);
        }

        .preview-watermark-2 span {
          font-size: 2.5rem;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.25em;
          color: #ea580c;
          transform: rotate(15deg);
          text-align: center;
          padding: 0 2rem;
        }

        .preview-watermark-3 {
          opacity: 0.18;
          transform: translateY(-150px);
        }

        .preview-watermark-3 span {
          font-size: 1.75rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.2em;
          color: #059669;
          transform: rotate(-10deg);
          text-align: center;
          padding: 0 2rem;
        }

        .preview-watermark-4 {
          opacity: 0.14;
          transform: translateX(-200px) translateY(100px);
        }

        .preview-watermark-4 span {
          font-size: 2.2rem;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.2em;
          color: #7c3aed;
          transform: rotate(30deg);
          text-align: center;
          padding: 0 2rem;
        }

        .preview-watermark-5 {
          opacity: 0.16;
          transform: translateX(200px) translateY(-100px);
        }

        .preview-watermark-5 span {
          font-size: 2rem;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.25em;
          color: #dc2626;
          transform: rotate(-35deg);
          text-align: center;
          padding: 0 2rem;
        }

        .preview-watermark-6 {
          opacity: 0.13;
          transform: translateY(250px);
        }

        .preview-watermark-6 span {
          font-size: 2.3rem;
          font-weight: 900;
          text-transform: uppercase;
          letter-spacing: 0.3em;
          color: #ea580c;
          transform: rotate(20deg);
          text-align: center;
          padding: 0 2rem;
        }

        .preview-watermark-7 {
          opacity: 0.17;
          transform: translateX(-150px) translateY(-200px);
        }

        .preview-watermark-7 span {
          font-size: 1.5rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          color: #059669;
          transform: rotate(45deg);
          text-align: center;
          padding: 0 2rem;
        }

        .preview-watermark-8 {
          opacity: 0.15;
          transform: translateX(150px) translateY(200px);
        }

        .preview-watermark-8 span {
          font-size: 2.1rem;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.22em;
          color: #7c3aed;
          transform: rotate(-20deg);
          text-align: center;
          padding: 0 2rem;
        }

        .preview-watermark-9 {
          opacity: 0.12;
          transform: translateY(-250px);
        }

        .preview-watermark-9 span {
          font-size: 2.4rem;
          font-weight: 900;
          text-transform: uppercase;
          letter-spacing: 0.28em;
          color: #dc2626;
          transform: rotate(10deg);
          text-align: center;
          padding: 0 2rem;
        }

        .preview-watermark-10 {
          opacity: 0.16;
          transform: translateX(-250px);
        }

        .preview-watermark-10 span {
          font-size: 1.9rem;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.2em;
          color: #ea580c;
          transform: rotate(-40deg);
          text-align: center;
          padding: 0 2rem;
        }

        .preview-watermark-11 {
          opacity: 0.19;
          transform: translateX(250px);
        }

        .preview-watermark-11 span {
          font-size: 1.6rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.18em;
          color: #059669;
          transform: rotate(35deg);
          text-align: center;
          padding: 0 2rem;
        }

        .preview-watermark-12 {
          opacity: 0.14;
          transform: translateX(-100px) translateY(300px);
        }

        .preview-watermark-12 span {
          font-size: 2rem;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.24em;
          color: #7c3aed;
          transform: rotate(-15deg);
          text-align: center;
          padding: 0 2rem;
        }

        .preview-watermark-13 {
          opacity: 0.17;
          transform: translateX(100px) translateY(-300px);
        }

        .preview-watermark-13 span {
          font-size: 2.2rem;
          font-weight: 900;
          text-transform: uppercase;
          letter-spacing: 0.26em;
          color: #dc2626;
          transform: rotate(25deg);
          text-align: center;
          padding: 0 2rem;
        }

        .preview-watermark-14 {
          opacity: 0.13;
          transform: translateY(350px);
        }

        .preview-watermark-14 span {
          font-size: 1.8rem;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.21em;
          color: #ea580c;
          transform: rotate(-30deg);
          text-align: center;
          padding: 0 2rem;
        }

        .preview-watermark-15 {
          opacity: 0.18;
          transform: translateX(-300px) translateY(50px);
        }

        .preview-watermark-15 span {
          font-size: 1.4rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.16em;
          color: #059669;
          transform: rotate(50deg);
          text-align: center;
          padding: 0 2rem;
        }

        .preview-watermark-16 {
          opacity: 0.15;
          transform: translateX(300px) translateY(-50px);
        }

        .preview-watermark-16 span {
          font-size: 1.7rem;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.19em;
          color: #7c3aed;
          transform: rotate(-45deg);
          text-align: center;
          padding: 0 2rem;
        }

        .preview-watermark-17 {
          opacity: 0.16;
          transform: translateY(-350px);
        }

        .preview-watermark-17 span {
          font-size: 2.5rem;
          font-weight: 900;
          text-transform: uppercase;
          letter-spacing: 0.27em;
          color: #dc2626;
          transform: rotate(5deg);
          text-align: center;
          padding: 0 2rem;
        }

        .preview-watermark-18 {
          opacity: 0.14;
          transform: translateX(-180px) translateY(180px);
        }

        .preview-watermark-18 span {
          font-size: 1.9rem;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.23em;
          color: #ea580c;
          transform: rotate(40deg);
          text-align: center;
          padding: 0 2rem;
        }

        /* Protection overlay with pattern */
        .preview-protection-overlay {
          position: fixed;
          inset: 0;
          pointer-events: none;
          z-index: 9998;
          background-image: 
            repeating-linear-gradient(
              45deg,
              transparent,
              transparent 10px,
              rgba(220, 38, 38, 0.03) 10px,
              rgba(220, 38, 38, 0.03) 20px
            ),
            repeating-linear-gradient(
              -45deg,
              transparent,
              transparent 10px,
              rgba(234, 88, 12, 0.03) 10px,
              rgba(234, 88, 12, 0.03) 20px
            );
          mix-blend-mode: overlay;
        }

        /* Mobile-specific protections */
        @media (max-width: 768px) {
          .preview-watermark-1 span { font-size: 1.8rem; }
          .preview-watermark-2 span { font-size: 1.4rem; }
          .preview-watermark-3 span { font-size: 1.2rem; }
          .preview-watermark-4 span { font-size: 1.5rem; }
          .preview-watermark-5 span { font-size: 1.3rem; }
          .preview-watermark-6 span { font-size: 1.6rem; }
          .preview-watermark-7 span { font-size: 1.1rem; }
          .preview-watermark-8 span { font-size: 1.4rem; }
          .preview-watermark-9 span { font-size: 1.7rem; }
          .preview-watermark-10 span { font-size: 1.3rem; }
          .preview-watermark-11 span { font-size: 1.2rem; }
          .preview-watermark-12 span { font-size: 1.4rem; }
          .preview-watermark-13 span { font-size: 1.5rem; }
          .preview-watermark-14 span { font-size: 1.3rem; }
          .preview-watermark-15 span { font-size: 1.1rem; }
          .preview-watermark-16 span { font-size: 1.2rem; }
          .preview-watermark-17 span { font-size: 1.6rem; }
          .preview-watermark-18 span { font-size: 1.3rem; }

          .preview-area.fullscreen {
            -webkit-touch-callout: none !important;
            -webkit-user-select: none !important;
            touch-action: none;
          }
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
