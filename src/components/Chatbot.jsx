import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Sparkles, Loader2 } from 'lucide-react';
import { generateRAGResponse } from '../../chatbot/rag/ragService.js';

/**
 * Renders a bot message as styled React elements.
 * - Strips leftover ** bold markers
 * - Detects section headings (e.g. "Petit Déjeuner", "STARTERS:")
 * - Formats "Dish Name — description. Rs. XXX" lines with bold name + smaller desc
 * - Adds spacing between paragraphs / blank lines
 */
function formatBotMessage(text) {
  if (!text) return null;

  // Strip any remaining **bold** markers, keeping inner text
  const clean = text.replace(/\*\*(.*?)\*\*/g, '$1').replace(/\*(.*?)\*/g, '$1');

  const lines = clean.split('\n');
  const elements = [];

  // A line is a section heading if it ends with ':' OR is short (≤40 chars) and
  // contains no price and follows/precedes a blank line
  const isSectionHeading = (line, prevLine, nextLine) => {
    const trimmed = line.trim();
    if (!trimmed) return false;
    if (trimmed.endsWith(':') && trimmed.length <= 50 && !trimmed.includes('Rs.')) return true;
    // Short line with no dash separator and no price, surrounded by blank lines
    if (
      trimmed.length <= 45 &&
      !trimmed.includes('Rs.') &&
      !trimmed.includes('—') &&
      !trimmed.includes('-') &&
      (prevLine === '' || nextLine === '')
    ) return true;
    return false;
  };

  lines.forEach((line, i) => {
    const trimmed = line.trim();
    const prev = i > 0 ? lines[i - 1].trim() : '';
    const next = i < lines.length - 1 ? lines[i + 1].trim() : '';

    if (!trimmed) {
      // Blank line → small spacer (skip duplicate spacers)
      if (elements.length && elements[elements.length - 1]?.type !== 'div') {
        elements.push(<div key={`sp-${i}`} style={{ height: '0.35rem' }} />);
      }
      return;
    }

    if (isSectionHeading(trimmed, prev, next)) {
      // Section title: bold, slightly larger, with extra top margin
      elements.push(
        <p
          key={`h-${i}`}
          style={{
            fontWeight: '700',
            fontSize: '0.92rem',
            marginTop: elements.length ? '0.85rem' : '0',
            marginBottom: '0.15rem',
            letterSpacing: '0.01em',
          }}
        >
          {trimmed.replace(/:$/, '')}
        </p>
      );
      return;
    }

    // Dish line: "Name — description. Rs. XXX"
    const dashIdx = trimmed.indexOf('—');
    if (dashIdx !== -1 && trimmed.includes('Rs.')) {
      const dishName = trimmed.slice(0, dashIdx).trim();
      const rest = trimmed.slice(dashIdx + 1).trim();
      // Split description from price: last "Rs. XXX" token
      const priceMatch = rest.match(/(.*?)(Rs\.\s*[\d,]+)\s*$/);
      if (priceMatch) {
        const desc = priceMatch[1].trim().replace(/\.$/, '');
        const price = priceMatch[2];
        elements.push(
          <p key={`d-${i}`} style={{ marginBottom: '0.1rem' }}>
            <span style={{ fontWeight: '700' }}>{dishName}</span>
            {desc ? (
              <span style={{ fontSize: '0.8rem', opacity: 0.82 }}> — {desc}. </span>
            ) : ' '}
            <span style={{ fontWeight: '600' }}>{price}</span>
          </p>
        );
        return;
      }
    }

    // Plain line
    elements.push(
      <p key={`p-${i}`} style={{ marginBottom: '0.05rem' }}>
        {trimmed}
      </p>
    );
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
      {elements}
    </div>
  );
}

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'bot',
      text: 'Bonjour! Welcome to Maison Élan. I am your virtual maître d\'. How may I assist your dining experience today?',
    },
  ]);

  const quickPrompts = [
    "What are your opening hours?",
    "Tell me about signature dishes",
    "What is L'Offre Maison?",
    "How to reserve a table?"
  ];

  // Auto-scroll chat to bottom on new message
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping, isOpen]);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleSendMessage = async (textToSend) => {
    const query = textToSend || inputValue.trim();
    if (!query || isTyping) return;

    const userMsg = {
      id: Date.now(),
      sender: 'user',
      text: query,
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputValue('');
    setIsTyping(true);

    try {
      // Call RAG Engine using chatbot/material/data.txt context and Groq API
      const result = await generateRAGResponse(query, messages);

      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: 'bot',
          text: result.answer,
        },
      ]);
    } catch (err) {
      console.error('RAG Chatbot Error:', err);
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: 'bot',
          text: "Merci for your message! Our host will be delighted to assist you at +92 300 1234567.",
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSendMessage();
  };

  return (
    <div style={{ position: 'fixed', bottom: '24px', right: '24px', zIndex: 9999 }}>
      {/* Chat Window Panel */}
      {isOpen && (
        <div
          className="chatbot-window"
          style={{
            position: 'absolute',
            bottom: '72px',
            right: '0',
            width: '360px',
            maxWidth: 'calc(100vw - 32px)',
            height: '480px',
            maxHeight: 'calc(100vh - 120px)',
            backgroundColor: 'var(--bg-ivory)',
            border: '1px solid var(--border-subtle)',
            borderRadius: '12px',
            boxShadow: '0 16px 40px rgba(28, 21, 18, 0.22)',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            animation: 'chatbotOpen 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
            transformOrigin: 'bottom right',
          }}
        >
          {/* Header */}
          <div
            style={{
              backgroundColor: 'var(--accent-burgundy)',
              color: '#FFFFFF',
              padding: '1.15rem 1.5rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderBottom: '1px solid rgba(197, 160, 89, 0.3)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(255, 255, 255, 0.15)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--accent-gold)',
                }}
              >
                <Sparkles size={18} />
              </div>
              <div>
                <h4
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: '1.25rem',
                    fontWeight: '600',
                    lineHeight: 1.1,
                    color: '#FAF7F2',
                  }}
                >
                  Maison Élan
                </h4>
                <p style={{ fontSize: '0.75rem', color: 'var(--accent-gold-light)', fontStyle: 'italic' }}>
                  AI Concierge (RAG Active)
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              style={{
                color: '#FAF7F2',
                opacity: 0.85,
                padding: '0.25rem',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'opacity 0.2s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = '1')}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = '0.85')}
              aria-label="Close chat"
            >
              <X size={20} />
            </button>
          </div>

          {/* Messages Body */}
          <div
            style={{
              flexGrow: 1,
              padding: '1.25rem',
              overflowY: 'auto',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.85rem',
              backgroundColor: 'var(--bg-cream)',
            }}
          >
            {messages.map((msg) => (
              <div
                key={msg.id}
                style={{
                  alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                  maxWidth: '85%',
                  backgroundColor: msg.sender === 'user' ? 'var(--accent-burgundy)' : 'var(--bg-card)',
                  color: msg.sender === 'user' ? '#FFFFFF' : 'var(--text-main)',
                  border: msg.sender === 'user' ? 'none' : '1px solid var(--border-light)',
                  padding: '0.75rem 1rem',
                  borderRadius: msg.sender === 'user' ? '14px 14px 2px 14px' : '14px 14px 14px 2px',
                  fontSize: '0.875rem',
                  lineHeight: 1.55,
                  boxShadow: 'var(--shadow-sm)',
                }}
              >
                {msg.sender === 'bot' ? formatBotMessage(msg.text) : msg.text}
              </div>
            ))}

            {isTyping && (
              <div
                style={{
                  alignSelf: 'flex-start',
                  backgroundColor: 'var(--bg-card)',
                  color: 'var(--text-muted)',
                  border: '1px solid var(--border-light)',
                  padding: '0.65rem 1rem',
                  borderRadius: '14px 14px 14px 2px',
                  fontSize: '0.825rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                }}
              >
                <Loader2 size={14} className="spin-icon" style={{ animation: 'spin 1s linear infinite' }} />
                <span>Maison Élan is retrieving answer...</span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Suggestion Chips (when 1 message) */}
          {messages.length === 1 && (
            <div
              style={{
                padding: '0.5rem 1rem',
                backgroundColor: 'var(--bg-ivory)',
                borderTop: '1px solid var(--border-light)',
                display: 'flex',
                gap: '0.4rem',
                overflowX: 'auto',
              }}
            >
              {quickPrompts.map((prompt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendMessage(prompt)}
                  style={{
                    fontSize: '0.725rem',
                    padding: '0.3rem 0.65rem',
                    borderRadius: '12px',
                    backgroundColor: 'var(--bg-cream)',
                    border: '1px solid var(--border-subtle)',
                    color: 'var(--accent-burgundy)',
                    whiteSpace: 'nowrap',
                    flexShrink: 0,
                    fontWeight: '500',
                  }}
                >
                  {prompt}
                </button>
              ))}
            </div>
          )}

          {/* Input Form */}
          <form
            onSubmit={handleSubmit}
            style={{
              padding: '0.85rem 1rem',
              backgroundColor: 'var(--bg-ivory)',
              borderTop: '1px solid var(--border-light)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
            }}
          >
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask about menu, hours, deals..."
              disabled={isTyping}
              style={{
                flexGrow: 1,
                padding: '0.65rem 1rem',
                fontSize: '0.875rem',
                fontFamily: 'var(--font-sans)',
                backgroundColor: 'var(--bg-card)',
                border: '1px solid var(--border-light)',
                borderRadius: '20px',
                outline: 'none',
                color: 'var(--text-main)',
              }}
            />
            <button
              type="submit"
              disabled={isTyping || !inputValue.trim()}
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                backgroundColor: inputValue.trim() ? 'var(--accent-burgundy)' : 'var(--border-strong)',
                color: '#FFFFFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                boxShadow: inputValue.trim() ? '0 2px 6px rgba(107, 29, 47, 0.25)' : 'none',
                opacity: inputValue.trim() ? 1 : 0.6,
                cursor: inputValue.trim() ? 'pointer' : 'default',
              }}
              aria-label="Send message"
            >
              <Send size={15} />
            </button>
          </form>
        </div>
      )}

      {/* Floating Trigger Button */}
      <div style={{ position: 'relative' }} className="chatbot-trigger-wrapper">
        {/* Tooltip */}
        <span
          className="chatbot-tooltip"
          style={{
            position: 'absolute',
            right: '68px',
            top: '50%',
            transform: 'translateY(-50%)',
            backgroundColor: 'var(--text-main)',
            color: 'var(--bg-ivory)',
            fontSize: '0.75rem',
            fontWeight: '600',
            letterSpacing: '0.05em',
            padding: '0.4rem 0.85rem',
            borderRadius: '4px',
            whiteSpace: 'nowrap',
            boxShadow: 'var(--shadow-md)',
            pointerEvents: 'none',
            opacity: 0,
            transition: 'opacity 0.2s ease, transform 0.2s ease',
          }}
        >
          Ask Maison Élan
        </span>

        <button
          onClick={toggleChat}
          aria-label="Ask Maison Élan Chatbot"
          style={{
            width: '56px',
            height: '56px',
            borderRadius: '50%',
            backgroundColor: 'var(--accent-burgundy)',
            color: '#FAF7F2',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 6px 20px rgba(107, 29, 47, 0.35)',
            border: '2px solid var(--accent-gold)',
            transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), background-color 0.3s',
            cursor: 'pointer',
          }}
          className="chatbot-btn"
        >
          {isOpen ? <X size={26} /> : <MessageSquare size={26} />}
        </button>
      </div>

      {/* Animation Styles */}
      <style>{`
        @keyframes chatbotOpen {
          from {
            opacity: 0;
            transform: translateY(20px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .chatbot-btn:hover {
          transform: scale(1.08);
          background-color: var(--accent-burgundy-hover);
        }
        .chatbot-trigger-wrapper:hover .chatbot-tooltip {
          opacity: 1 !important;
          transform: translateY(-50%) translateX(-4px) !important;
        }
        @media (max-width: 480px) {
          .chatbot-window {
            right: -8px !important;
            bottom: 68px !important;
            width: calc(100vw - 32px) !important;
          }
        }
      `}</style>
    </div>
  );
};

export default Chatbot;
