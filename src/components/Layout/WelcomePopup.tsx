import { motion } from 'framer-motion';
import { Sparkles, FileText, Share2, X } from 'lucide-react';

interface WelcomePopupProps {
  onClose: () => void;
}

export const WelcomePopup = ({ onClose }: WelcomePopupProps) => {
  return (
    <motion.div
      className="welcome-backdrop"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        className="welcome-modal glass-panel"
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        transition={{ type: "spring", damping: 25, stiffness: 300, delay: 0.1 }}
      >
        <button className="close-btn" onClick={onClose}>
          <X size={20} />
        </button>

        <div className="welcome-content">
          <motion.div
            className="welcome-logo-container"
            initial={{ scale: 0, y: -20 }}
            animate={{ scale: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.3 }}
          >
            <img src="/logo.png" alt="Logo" className="welcome-logo" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            Welcome to <span className="gradient-text">Our Store</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Create professional, ATS-friendly resumes in minutes with our AI-powered platform.
          </motion.p>

          <div className="features-grid">
            <FeatureItem
              icon={<Sparkles size={20} />}
              title="AI Powered"
              desc="Smart suggestions for your content"
              delay={0.6}
            />
            <FeatureItem
              icon={<FileText size={20} />}
              title="Modern Templates"
              desc="Stand out with beautiful designs"
              delay={0.7}
            />
            <FeatureItem
              icon={<Share2 size={20} />}
              title="Easy Export"
              desc="Download PDF with one click"
              delay={0.8}
            />
          </div>

          <motion.button
            className="get-started-btn"
            onClick={onClose}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
          >
            Get Started Now
          </motion.button>
        </div>
      </motion.div>

      <style>{`
        .welcome-backdrop {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.4);
          backdrop-filter: blur(8px);
          z-index: 1000;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1rem;
        }

        .welcome-modal {
          background: rgba(255, 255, 255, 0.9);
          border: 1px solid rgba(255, 255, 255, 0.2);
          box-shadow: 
            0 20px 50px rgba(0, 0, 0, 0.2),
            0 0 0 1px rgba(255, 255, 255, 0.5) inset;
          border-radius: 24px;
          padding: 3rem;
          max-width: 500px;
          width: 100%;
          position: relative;
          text-align: center;
          overflow: hidden;
        }

        .dark .welcome-modal {
          background: rgba(30, 30, 30, 0.9);
          border-color: rgba(255, 255, 255, 0.1);
        }

        .close-btn {
          position: absolute;
          top: 1.5rem;
          right: 1.5rem;
          background: none;
          border: none;
          color: var(--text-secondary);
          cursor: pointer;
          padding: 0.5rem;
          border-radius: 50%;
          transition: all 0.2s;
        }

        .close-btn:hover {
          background: rgba(0, 0, 0, 0.05);
          color: var(--text-main);
        }

        .welcome-logo-container {
          width: 100px;
          height: 100px;
          margin: 0 auto 1.5rem;
          display: flex;
          align-items: center;
          justify-content: center;
          filter: drop-shadow(0 10px 15px rgba(0, 0, 0, 0.1));
        }

        .welcome-logo {
          width: 100%;
          height: 100%;
          object-fit: contain;
        }

        h2 {
          font-size: 2rem;
          font-weight: 800;
          margin-bottom: 0.5rem;
          color: var(--text-main);
          letter-spacing: -0.03em;
        }

        .gradient-text {
          background: linear-gradient(135deg, #FFD700, #FF8C00);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        p {
          color: var(--text-secondary);
          margin-bottom: 2rem;
          font-size: 1.1rem;
          line-height: 1.5;
        }

        .features-grid {
          display: grid;
          gap: 1rem;
          margin-bottom: 2.5rem;
          text-align: left;
        }

        .feature-item {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1rem;
          background: rgba(0, 0, 0, 0.03);
          border-radius: 16px;
          transition: transform 0.2s;
        }

        .dark .feature-item {
          background: rgba(255, 255, 255, 0.03);
        }

        .feature-item:hover {
          transform: translateX(5px);
          background: rgba(255, 140, 0, 0.05);
        }

        .feature-icon {
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: white;
          border-radius: 12px;
          color: #FF8C00;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
        }

        .dark .feature-icon {
          background: #2d2d2d;
        }

        .feature-text h3 {
          font-size: 0.95rem;
          font-weight: 700;
          margin: 0;
          color: var(--text-main);
        }

        .feature-text span {
          font-size: 0.85rem;
          color: var(--text-secondary);
        }

        .get-started-btn {
          width: 100%;
          padding: 1rem;
          background: linear-gradient(135deg, #FFD700, #FF8C00);
          color: white;
          border: none;
          border-radius: 14px;
          font-size: 1.1rem;
          font-weight: 700;
          cursor: pointer;
          box-shadow: 0 10px 20px rgba(255, 140, 0, 0.3);
          transition: all 0.2s;
        }

        .get-started-btn:hover {
          box-shadow: 0 15px 30px rgba(255, 140, 0, 0.4);
          transform: translateY(-2px);
        }

        @media (max-width: 480px) {
          .welcome-backdrop {
            padding: 0.75rem;
            align-items: flex-end;
          }

          .welcome-modal {
            width: 100%;
            max-width: 100%;
            padding: 1.25rem;
            border-radius: 18px;
            max-height: calc(100dvh - 1.5rem);
            overflow: auto;
            -webkit-overflow-scrolling: touch;
          }

          .close-btn {
            top: 0.75rem;
            right: 0.75rem;
          }

          .welcome-logo-container {
            width: 70px;
            height: 70px;
            margin-bottom: 1rem;
          }

          h2 {
            font-size: 1.35rem;
          }

          p {
            font-size: 0.95rem;
            margin-bottom: 1.25rem;
          }

          .features-grid {
            margin-bottom: 1.5rem;
          }

          .feature-item {
            padding: 0.85rem;
          }

          .get-started-btn {
            padding: 0.9rem;
            font-size: 1rem;
          }
        }
      `}</style>
    </motion.div>
  );
};

const FeatureItem = ({ icon, title, desc, delay }: { icon: any, title: string, desc: string, delay: number }) => (
  <motion.div
    className="feature-item"
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay }}
  >
    <div className="feature-icon">{icon}</div>
    <div className="feature-text">
      <h3>{title}</h3>
      <span>{desc}</span>
    </div>
  </motion.div>
);
