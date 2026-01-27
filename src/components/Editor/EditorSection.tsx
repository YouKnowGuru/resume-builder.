import React, { type ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronUp, GripVertical } from 'lucide-react';

interface SectionProps {
  title: string;
  icon?: React.ElementType;
  children: ReactNode;
  isOpen?: boolean;
  onToggle?: () => void;
}

export const EditorSection: React.FC<SectionProps> = ({
  title,
  icon: Icon,
  children,
  isOpen = true,
  onToggle
}) => {
  return (
    <motion.div
      className="editor-section card animate-fade-in"
      layout
    >
      <header className="section-header" onClick={onToggle}>
        <div className="header-left">
          <GripVertical size={18} className="grip-handle" />
          {Icon && <Icon size={20} className="section-icon" />}
          <h2 className="section-title">{title}</h2>
        </div>
        <motion.button
          className="toggle-btn"
          animate={{ rotate: isOpen ? 0 : 180 }}
        >
          <ChevronUp size={20} />
        </motion.button>
      </header>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="section-content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <div style={{ paddingBottom: '1.5rem' }}>
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .editor-section {
          margin-bottom: 1.5rem;
          padding: 0;
          overflow: hidden;
          background: var(--glass-bg);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid var(--glass-border);
          border-radius: var(--radius-lg);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
          transition: all 0.3s ease;
        }

        .editor-section:hover {
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
          border-color: rgba(255, 215, 0, 0.2);
        }

        .section-header {
          padding: 1.25rem 1.5rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          cursor: pointer;
          user-select: none;
        }

        .header-left {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .grip-handle {
          color: var(--text-muted);
          cursor: grab;
          opacity: 0.3;
          transition: opacity 0.2s;
        }

        .editor-section:hover .grip-handle {
          opacity: 1;
        }

        .section-icon {
          color: var(--secondary);
        }

        .section-title {
          font-size: 1rem;
          font-weight: 800;
          color: var(--text-main);
          text-transform: uppercase;
          letter-spacing: 0.025em;
        }

        .toggle-btn {
          color: var(--text-muted);
        }

        .section-content {
          padding: 0 1.5rem;
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          overflow: hidden;
        }
      `}</style>
    </motion.div>
  );
};
