import { useState, useEffect } from 'react';
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

type PageType = 'home' | 'privacy' | 'terms';

function App() {
  const [activeTab, setActiveTab] = useState<'content' | 'appearance'>('content');
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showMobilePreview, setShowMobilePreview] = useState(false);
  const [currentPage, setCurrentPage] = useState<PageType>('home');
  const [showWelcome, setShowWelcome] = useState(true);

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
                <span className="logo-icon">🐉</span>
                <h1>Our Store</h1>
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
            {(isMobileMenuOpen || !isPreviewOpen) && (
              <motion.div
                initial={false}
                animate={{
                  x: (isMobileMenuOpen || window.innerWidth > 1024) ? 0 : -320,
                  opacity: (isMobileMenuOpen || window.innerWidth > 1024) ? 1 : 0
                }}
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
              animate={{ flex: isPreviewOpen ? 10 : 1.5 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            >
              <div className="preview-background-pattern"></div>
              <motion.div
                id="resume-preview"
                className="preview-container"
                layout
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
          background: linear-gradient(135deg, #fdfbfb 0%, #ebedee 100%);
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
        }

        .header-content {
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
          max-width: 1600px;
          margin: 0 auto;
        }

        .logo {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .logo h1 {
          font-size: 1.5rem;
          font-weight: 900;
          letter-spacing: -0.05em;
          background: linear-gradient(135deg, #FFD700, #FF8C00);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          text-transform: uppercase;
        }

        .logo-icon {
           font-size: 1.8rem;
        }

        .header-actions {
          display: flex;
          gap: 1rem;
        }

        .main-content {
          display: flex;
          flex: 1;
          position: relative;
        }

        .editor-area {
          flex: 2.5;
          padding: 2rem;
          max-width: 1400px;
          min-width: 600px;
          margin: 0;
        }

        .preview-area {
          flex: 1.8;
          padding: 2rem;
          display: flex;
          justify-content: center;
          position: relative;
          min-width: 500px;
        }

        .preview-background-pattern {
           position: absolute;
           top: 0;
           left: 0;
           right: 0;
           bottom: 0;
           opacity: 0.03;
           background-image: radial-gradient(#FF8C00 1px, transparent 1px);
           background-size: 40px 40px;
           pointer-events: none;
        }

        .preview-area.fullscreen {
          position: fixed;
          top: var(--header-height);
          left: 0;
          right: 0;
          bottom: 0;
          z-index: 50;
          background: rgba(244, 247, 246, 0.98);
          overflow-y: auto;
        }

        .preview-container {
          width: 210mm;
          min-height: 297mm;
          background: white;
          box-shadow: 0 20px 50px rgba(0,0,0,0.1);
          transform-origin: top center;
          z-index: 1;
          border: 1px solid rgba(0,0,0,0.05);
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

        @media (max-width: 1400px) {
           .preview-container {
              transform: scale(0.85);
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
            padding: 1.5rem;
          }

          .preview-area {
            display: none;
            position: fixed;
            top: var(--header-height);
            left: 0;
            right: 0;
            bottom: 0;
            z-index: 150;
            background: #f4f7f6;
            min-width: 100%;
            padding: 1rem;
          }

          .preview-area.mobile-visible {
            display: flex;
            flex-direction: column;
            overflow-y: auto;
          }

          .preview-container {
             width: 100%;
             min-height: auto;
             transform: scale(0.6);
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
