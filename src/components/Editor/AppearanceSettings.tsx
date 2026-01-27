import React from 'react';
import { useResumeStore } from '../../store/useResumeStore';

export const AppearanceSettings: React.FC = () => {
  const { resume, setTemplate, setThemeColor, setFontSize, setSpacing } = useResumeStore();

  const templates = [
    { id: 'modern', name: 'Modern Minimal', color: '#6366f1' },
    { id: 'corporate', name: 'Professional Corporate', color: '#1e293b' },
    { id: 'creative', name: 'Creative Bold', color: '#ec4899' },
  ];

  const colors = [
    '#FFD700', '#FF8C00', '#D52B1E', '#6366f1',
    '#4f46e5', '#1e293b', '#10b981', '#f59e0b'
  ];

  // Safety checks for persisted metadata (handling migrations from string to number)
  const safeFontSize = typeof resume.metadata.fontSize === 'number' ? resume.metadata.fontSize : 11;
  const safeSpacing = typeof resume.metadata.spacing === 'number' ? resume.metadata.spacing : 1.0;

  return (
    <div id="editor-appearance" className="appearance-settings animate-fade-in">
      <section className="settings-section">
        <h3>Choose Template</h3>
        <div className="template-grid">
          {templates.map((t) => (
            <button
              key={t.id}
              className={`template-card ${resume.metadata.template === t.id ? 'active' : ''}`}
              onClick={() => setTemplate(t.id)}
            >
              <div className="template-preview" style={{ background: t.color }}></div>
              <span>{t.name}</span>
            </button>
          ))}
        </div>
      </section>

      <section className="settings-section">
        <h3>Theme Color</h3>
        <div className="color-grid">
          {colors.map((c) => (
            <button
              key={c}
              className={`color-circle ${resume.metadata.themeColor === c ? 'active' : ''}`}
              style={{ background: c }}
              onClick={() => setThemeColor(c)}
            />
          ))}
        </div>
      </section>

      <section className="settings-section">
        <div className="slider-header">
          <h3>Font Size</h3>
          <span className="slider-value">{safeFontSize}pt</span>
        </div>
        <input
          type="range"
          min="8"
          max="16"
          step="0.5"
          value={safeFontSize}
          onChange={(e) => setFontSize(parseFloat(e.target.value))}
          className="settings-slider"
        />
      </section>

      <section className="settings-section">
        <div className="slider-header">
          <h3>Section Spacing</h3>
          <span className="slider-value">{safeSpacing.toFixed(1)}x</span>
        </div>
        <input
          type="range"
          min="0.5"
          max="2.5"
          step="0.1"
          value={safeSpacing}
          onChange={(e) => setSpacing(parseFloat(e.target.value))}
          className="settings-slider"
        />
      </section>

      <style>{`
        .appearance-settings {
          display: flex;
          flex-direction: column;
          gap: 2rem;
          padding-bottom: 5rem;
        }

        .settings-section {
          background: var(--glass-bg);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid var(--glass-border);
          border-radius: var(--radius-lg);
          padding: 1.5rem;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
          transition: all 0.3s ease;
        }

        .settings-section:hover {
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
          border-color: rgba(255, 215, 0, 0.2);
        }

        .settings-section h3 {
          font-size: 0.875rem;
          font-weight: 700;
          color: var(--text-main);
          margin-bottom: 1rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .slider-header {
           display: flex;
           justify-content: space-between;
           align-items: center;
        }

        .slider-value {
           font-size: 0.875rem;
           font-weight: 600;
           color: var(--primary);
        }

        .settings-slider {
           width: 100%;
           accent-color: var(--primary);
           height: 6px;
           background: var(--border);
           border-radius: 3px;
           margin-top: 0.5rem;
        }

        .template-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1rem;
        }

        .template-card {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          padding: 1rem;
          border: 2px solid var(--border);
          border-radius: var(--radius-lg);
          background: rgba(255, 255, 255, 0.3);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          transition: all 0.3s;
          text-align: left;
        }

        body.dark .template-card {
          background: rgba(20, 20, 20, 0.3);
        }

        .template-card:hover {
          border-color: var(--primary);
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(255, 215, 0, 0.2);
        }

        .template-card.active {
          border-color: var(--primary);
          background: linear-gradient(135deg, rgba(255, 215, 0, 0.2), rgba(255, 140, 0, 0.2));
          box-shadow: 0 4px 16px rgba(255, 215, 0, 0.3);
        }

        .template-preview {
          height: 80px;
          border-radius: var(--radius-md);
          opacity: 0.9;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }

        .template-card span {
          font-size: 0.875rem;
          font-weight: 600;
          color: var(--text-main);
        }

        .color-grid {
          display: flex;
          flex-wrap: wrap;
          gap: 0.75rem;
        }

        .color-circle {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          border: 3px solid transparent;
          cursor: pointer;
          transition: all 0.3s;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }

        .color-circle:hover {
          transform: scale(1.15);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
        }

        .color-circle.active {
          border-color: var(--text-main);
          transform: scale(1.25);
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
        }
      `}</style>
    </div>
  );
};
