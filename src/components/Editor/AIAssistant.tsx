import React, { useState } from 'react';
import { Sparkles, Loader2, Check, AlertCircle } from 'lucide-react';
import { createGeminiClient } from '../../utils/geminiApi';

interface AIAssistantProps {
  type: 'summary' | 'bullet-point';
  onApply: (suggestion: string) => void;
}

export const AIAssistant: React.FC<AIAssistantProps> = ({ type, onApply }) => {
  const [loading, setLoading] = useState(false);
  const [suggestion, setSuggestion] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    setLoading(true);
    setError(null);

    try {
      const client = createGeminiClient();
      const result = await client.generateSuggestion(type);
      setSuggestion(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate suggestion');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="ai-assistant glass">
      <div className="ai-header">
        <Sparkles size={16} className="sparkle-icon" />
        <span>AI Writing Assistant (Gemini Powered)</span>
      </div>

      {!suggestion ? (
        <div className="ai-prompt">
          <p>Need help with your {type === 'summary' ? 'professional summary' : 'achievements'}?</p>
          {error && (
            <div className="error-message">
              <AlertCircle size={14} />
              <span>{error}</span>
            </div>
          )}
          <button className="btn-ai" onClick={handleGenerate} disabled={loading}>
            {loading ? <Loader2 size={16} className="animate-spin" /> : <Sparkles size={16} />}
            {loading ? 'Generating...' : 'Generate Suggestion'}
          </button>
        </div>
      ) : (
        <div className="ai-suggestion animate-fade-in">
          <p className="suggestion-text">{suggestion}</p>
          <div className="suggestion-actions">
            <button className="btn-secondary" onClick={() => setSuggestion(null)}>
              Try Again
            </button>
            <button className="btn-primary-sm" onClick={() => onApply(suggestion)}>
              <Check size={14} />
              Apply
            </button>
          </div>
        </div>
      )}

      <style>{`
        .ai-assistant {
          margin-top: 1rem;
          padding: 1.25rem;
          border-radius: var(--radius-lg);
          border: 1px solid var(--primary-glow);
          background: linear-gradient(to bottom right, rgba(99, 102, 241, 0.05), rgba(236, 72, 153, 0.05));
        }

        .ai-header {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.75rem;
          font-weight: 700;
          color: var(--primary);
          text-transform: uppercase;
          margin-bottom: 0.75rem;
        }

        .sparkle-icon {
          color: var(--primary);
        }

        .ai-prompt p {
          font-size: 0.875rem;
          margin-bottom: 1rem;
          color: var(--text-muted);
        }

        .error-message {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem;
          background: rgba(239, 68, 68, 0.1);
          border: 1px solid rgba(239, 68, 68, 0.3);
          border-radius: var(--radius-md);
          color: #ef4444;
          font-size: 0.8125rem;
          margin-bottom: 0.75rem;
        }

        .btn-ai {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.6rem 1.25rem;
          background: var(--primary);
          color: white;
          border-radius: var(--radius-md);
          font-size: 0.875rem;
          font-weight: 600;
          width: 100%;
          justify-content: center;
          transition: all 0.2s;
        }

        .btn-ai:hover:not(:disabled) {
          background: var(--primary-hover);
          box-shadow: 0 4px 12px var(--primary-glow);
        }

        .btn-ai:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .suggestion-text {
          font-size: 0.875rem;
          line-height: 1.5;
          margin-bottom: 1.25rem;
          color: var(--text-main);
          padding: 0.75rem;
          background: var(--bg-card);
          border-radius: var(--radius-sm);
          border-left: 3px solid var(--primary);
        }

        .suggestion-actions {
          display: flex;
          justify-content: flex-end;
          gap: 0.75rem;
        }

        .btn-primary-sm {
          display: flex;
          align-items: center;
          gap: 0.25rem;
          padding: 0.4rem 0.8rem;
          background: var(--primary);
          color: white;
          border-radius: var(--radius-sm);
          font-size: 0.75rem;
          font-weight: 600;
        }

        .btn-secondary {
          font-size: 0.75rem;
          font-weight: 600;
          color: var(--text-muted);
        }

        .animate-spin {
          animation: spin 1s linear infinite;
        }

        .animate-fade-in {
          animation: fadeIn 0.3s ease-in;
        }

        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};
