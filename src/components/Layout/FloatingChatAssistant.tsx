import React, { useState } from 'react';
import { MessageCircle, X, Send, Bot } from 'lucide-react';
import { createGeminiClient } from '../../utils/geminiApi';

type ChatMessage = {
  id: number;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
};

export const FloatingChatAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 1,
      role: 'assistant',
      content: 'Hi! I am your AI assistant. Ask me anything about resumes, job applications, or how to use this builder.',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const nowTime = () => new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  const formatAnswer = (raw: string): string => {
    let text = raw;
    // Remove markdown headings like ###, ##, # (with or without spaces, and any text after)
    text = text.replace(/^#{1,6}\s+.*$/gm, '');
    // Also remove standalone ###, ##, # at start of lines
    text = text.replace(/^#{1,6}\s*/gm, '');
    // Remove any remaining markdown headers in the middle of text
    text = text.replace(/##+/g, '');
    // Normalize bullet points (keep dashes but trim extra spaces)
    text = text.replace(/^\s*-\s+/gm, '• ');
    // Remove extra blank lines (more than 2 consecutive newlines)
    text = text.replace(/\n{3,}/g, '\n\n');
    // Trim extra leading/trailing whitespace
    return text.trim();
  };

  const quickQuestions: { id: number; label: string; question: string }[] = [
    {
      id: 101,
      label: 'Improve my summary',
      question: 'Can you help me improve my professional summary for a software engineer role?',
    },
    {
      id: 102,
      label: 'Tailor for a job',
      question: 'How should I tailor my resume for a specific job description?',
    },
    {
      id: 103,
      label: 'Fix bullet points',
      question: 'How can I rewrite my experience bullets to be more impactful and metric-driven?',
    },
    {
      id: 104,
      label: 'Using this builder',
      question: 'Can you explain how to best use this resume builder to create a strong resume?',
    },
  ];

  const sendMessage = async (question: string) => {
    const trimmed = question.trim();
    if (!trimmed || loading) return;

    const client = createGeminiClient();
    const nextId = messages.length ? messages[messages.length - 1].id + 1 : 1;

    setMessages((prev) => [
      ...prev,
      { id: nextId, role: 'user', content: trimmed, timestamp: nowTime() },
    ]);
    setInput('');
    setLoading(true);

    try {
      const answer = await client.generateSuggestion('chat', trimmed);
      const formatted = formatAnswer(answer);
      setMessages((prev) => [
        ...prev,
        {
          id: prev[prev.length - 1]?.id + 1 || nextId + 1,
          role: 'assistant',
          content: formatted,
          timestamp: nowTime(),
        },
      ]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          id: prev[prev.length - 1]?.id + 1 || nextId + 1,
          role: 'assistant',
          content: 'Sorry, I could not answer that right now. Please try again later.',
          timestamp: nowTime(),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleSend = async () => {
    await sendMessage(input);
  };

  return (
    <>
      <button
        type="button"
        className="chat-toggle-btn"
        onClick={() => setIsOpen((v) => !v)}
      >
        <MessageCircle size={20} />
      </button>

      {isOpen && (
        <div className="chat-panel glass-panel">
          <div className="chat-header">
            <div className="chat-title">
              <Bot size={18} />
              <span>AI Assistant</span>
            </div>
            <button
              type="button"
              className="chat-close-btn"
              onClick={() => setIsOpen(false)}
            >
              <X size={16} />
            </button>
          </div>

          <div className="chat-messages">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`chat-message ${m.role === 'user' ? 'chat-message-user' : 'chat-message-assistant'}`}
              >
                <div className="chat-message-meta">
                  {m.role === 'assistant' && (
                    <div className="chat-avatar">
                      <Bot size={14} />
                    </div>
                  )}
                  <div className="chat-meta-main">
                    <span className="chat-badge">{m.role === 'user' ? 'You' : 'AI'}</span>
                    <span className="chat-timestamp">{m.timestamp}</span>
                  </div>
                </div>
                <p>{m.content}</p>
              </div>
            ))}

            {messages.length <= 2 && (
              <div className="chat-quick-questions">
                <p className="chat-quick-title">Popular questions</p>
                <div className="chat-quick-grid">
                  {quickQuestions.map((q) => (
                    <button
                      key={q.id}
                      type="button"
                      className="chat-quick-btn"
                      onClick={() => sendMessage(q.question)}
                      disabled={loading}
                    >
                      {q.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {loading && (
              <div className="chat-typing-row">
                <div className="chat-typing-bubble">
                  <span className="dot" />
                  <span className="dot" />
                  <span className="dot" />
                </div>
                <span className="chat-typing-label">AI is typing…</span>
              </div>
            )}
          </div>

          <div className="chat-input-row">
            <textarea
              rows={2}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask a question..."
            />
            <button
              type="button"
              className="chat-send-btn"
              onClick={handleSend}
              disabled={loading || !input.trim()}
            >
              <Send size={16} />
            </button>
          </div>

          <div className="chat-powered-by">
            <span>Powered by our store</span>
          </div>
        </div>
      )}

      <style>{`
        .chat-toggle-btn {
          position: fixed;
          right: 1.5rem;
          bottom: 5.5rem;
          width: 52px;
          height: 52px;
          border-radius: 999px;
          background: linear-gradient(135deg, var(--primary), var(--secondary));
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 18px 35px rgba(15, 23, 42, 0.45);
          z-index: 250;
        }

        .chat-panel {
          position: fixed;
          right: 1.5rem;
          bottom: 8.5rem;
          width: 360px;
          max-width: calc(100% - 2.5rem);
          max-height: 420px;
          display: flex;
          flex-direction: column;
          padding: 1rem;
          z-index: 250;
          border-radius: 1rem;
          backdrop-filter: blur(18px);
          background: radial-gradient(circle at top left, rgba(129, 140, 248, 0.22), transparent 55%),
            radial-gradient(circle at bottom right, rgba(236, 72, 153, 0.18), transparent 55%),
            rgba(15, 23, 42, 0.88);
          border: 1px solid rgba(148, 163, 184, 0.65);
          box-shadow: 0 20px 45px rgba(15, 23, 42, 0.75);
        }

        .chat-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 0.5rem;
        }

        .chat-title {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          font-size: 0.85rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.06em;
        }

        .chat-close-btn {
          border-radius: 999px;
          width: 28px;
          height: 28px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid var(--border);
          background: transparent;
        }

        .chat-messages {
          flex: 1;
          overflow-y: auto;
          padding: 0.25rem 0.1rem;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          font-size: 0.85rem;
        }

        .chat-message {
          padding: 0.5rem 0.75rem;
          border-radius: 0.75rem;
          max-width: 100%;
          line-height: 1.5;
          position: relative;
          background: rgba(15, 23, 42, 0.55);
          border: 1px solid rgba(148, 163, 184, 0.35);
          display: flex;
          flex-direction: column;
          gap: 0.2rem;
        }

        .chat-message p {
          margin: 0.15rem 0 0.1rem;
          white-space: pre-wrap;
        }

        .chat-message-meta {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 0.4rem;
          margin-bottom: 0.1rem;
        }

        .chat-badge {
          font-size: 0.7rem;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: var(--text-muted);
        }

        .chat-meta-main {
          display: flex;
          align-items: baseline;
          gap: 0.35rem;
        }

        .chat-timestamp {
          font-size: 0.7rem;
          color: rgba(148, 163, 184, 0.9);
        }

        .chat-avatar {
          width: 20px;
          height: 20px;
          border-radius: 999px;
          background: radial-gradient(circle at 30% 0, #f9fafb, #e5e7eb 55%, #4f46e5 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #111827;
          box-shadow: 0 0 0 1px rgba(148, 163, 184, 0.6);
          flex-shrink: 0;
        }

        .chat-message-user {
          align-self: flex-end;
          background: linear-gradient(135deg, rgba(59, 130, 246, 0.9), rgba(129, 140, 248, 0.95));
          border-color: rgba(191, 219, 254, 0.75);
          color: #f9fafb;
        }

        .chat-message-assistant {
          align-self: flex-start;
          background: rgba(15, 23, 42, 0.7);
          border-color: rgba(148, 163, 184, 0.75);
        }

        .chat-input-row {
          margin-top: 0.5rem;
          display: grid;
          grid-template-columns: 1fr auto;
          gap: 0.5rem;
          align-items: flex-end;
        }

        .chat-input-row textarea {
          width: 100%;
          resize: none;
          font-size: 0.85rem;
        }

        .chat-send-btn {
          width: 40px;
          height: 40px;
          border-radius: 999px;
          background: var(--primary);
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .chat-send-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .chat-quick-questions {
          margin-top: 0.5rem;
          padding-top: 0.5rem;
          border-top: 1px dashed rgba(148, 163, 184, 0.4);
        }

        .chat-quick-title {
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: var(--text-muted);
          margin-bottom: 0.35rem;
        }

        .chat-quick-grid {
          display: flex;
          flex-wrap: wrap;
          gap: 0.4rem;
        }

        .chat-quick-btn {
          border-radius: 999px;
          padding: 0.3rem 0.7rem;
          font-size: 0.75rem;
          background: rgba(15, 23, 42, 0.03);
          border: 1px solid rgba(148, 163, 184, 0.5);
          color: var(--text-muted);
          transition: background 0.15s ease, border-color 0.15s ease, color 0.15s ease;
        }

        .chat-quick-btn:hover:not(:disabled) {
          background: rgba(59, 130, 246, 0.18);
          border-color: rgba(129, 140, 248, 0.9);
          color: #e5e7eb;
        }

        .chat-typing-row {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          margin-top: 0.35rem;
        }

        .chat-typing-bubble {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.2rem;
          padding: 0.25rem 0.5rem;
          border-radius: 999px;
          background: rgba(15, 23, 42, 0.7);
          border: 1px solid rgba(148, 163, 184, 0.55);
        }

        .chat-typing-bubble .dot {
          width: 4px;
          height: 4px;
          border-radius: 999px;
          background: rgba(148, 163, 184, 0.9);
          animation: chat-bounce 1s infinite ease-in-out;
        }

        .chat-typing-bubble .dot:nth-child(2) {
          animation-delay: 0.12s;
        }

        .chat-typing-bubble .dot:nth-child(3) {
          animation-delay: 0.24s;
        }

        .chat-typing-label {
          font-size: 0.7rem;
          color: var(--text-muted);
        }

        @keyframes chat-bounce {
          0%, 80%, 100% { transform: translateY(0); opacity: 0.3; }
          40% { transform: translateY(-3px); opacity: 1; }
        }

        .chat-powered-by {
          margin-top: 0.5rem;
          padding-top: 0.5rem;
          border-top: 1px solid rgba(148, 163, 184, 0.2);
          text-align: center;
        }

        .chat-powered-by span {
          font-size: 0.7rem;
          color: var(--text-muted);
          opacity: 0.7;
          font-style: italic;
        }

        @media (max-width: 768px) {
          .chat-toggle-btn {
            right: 1rem;
            bottom: 5rem;
          }
          .chat-panel {
            right: 0.75rem;
            left: 0.75rem;
            bottom: 7.5rem;
            width: auto;
            max-width: none;
          }
        }
      `}</style>
    </>
  );
};

