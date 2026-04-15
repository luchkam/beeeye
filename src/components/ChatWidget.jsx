import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from './ui/Icon.jsx';
import { sendChatMessage } from '../lib/api.js';

// ============================================================================
// Встроенный AI-агент на сайт.
// Сейчас — frontend mock с красивыми фейковыми ответами из api.js.
// Backend подключение: заменить sendChatMessage() на streaming endpoint.
// ============================================================================

const intro = [
  {
    role: 'bot',
    text: 'Привет! Я AI-агент BEE EYE 👋 Расскажите, какую задачу хотите решить — сайт, AI, бот, Voice, WhatsApp или реклама?',
  },
];

export default function ChatWidget({ open, onClose }) {
  const [messages, setMessages] = useState(intro);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const listRef = useRef(null);

  useEffect(() => {
    if (listRef.current) listRef.current.scrollTop = listRef.current.scrollHeight;
  }, [messages, typing]);

  async function send(e) {
    e?.preventDefault();
    const text = input.trim();
    if (!text) return;
    setInput('');
    setMessages((m) => [...m, { role: 'user', text }]);
    setTyping(true);
    const res = await sendChatMessage(messages, text);
    setTyping(false);
    if (res?.ok) setMessages((m) => [...m, { role: 'bot', text: res.reply }]);
  }

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[90] bg-ink-950/60 backdrop-blur-md"
          />
          {/* panel */}
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.98 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="fixed z-[95] bottom-4 right-4 left-4 sm:left-auto sm:bottom-6 sm:right-6 sm:w-[420px] card overflow-hidden flex flex-col max-h-[80vh]"
          >
            {/* header */}
            <div className="flex items-center justify-between border-b border-white/8 px-5 py-4 bg-ink-900/70">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="h-10 w-10 rounded-full bg-bee-400/15 grid place-items-center text-bee-300 ring-1 ring-bee-400/30">
                    <Icon name="bot" size={18} />
                  </div>
                  <span className="absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full bg-emerald-400 ring-2 ring-ink-900" />
                </div>
                <div>
                  <div className="text-[14px] font-medium text-white">BEE EYE · AI Agent</div>
                  <div className="text-[11px] text-white/50">Онлайн · отвечает за 2 сек</div>
                </div>
              </div>
              <button
                onClick={onClose}
                className="rounded-lg p-1.5 text-white/60 hover:text-white hover:bg-white/5"
              >
                <Icon name="close" size={18} />
              </button>
            </div>

            {/* messages */}
            <div ref={listRef} className="flex-1 overflow-y-auto px-5 py-5 space-y-3 bg-gradient-to-b from-ink-950/60 to-ink-900/40">
              {messages.map((m, i) => (
                <Bubble key={i} role={m.role}>{m.text}</Bubble>
              ))}
              {typing && (
                <div className="flex items-center gap-1.5 pl-1 pt-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-white/40 animate-bounce" />
                  <span className="h-1.5 w-1.5 rounded-full bg-white/40 animate-bounce [animation-delay:120ms]" />
                  <span className="h-1.5 w-1.5 rounded-full bg-white/40 animate-bounce [animation-delay:240ms]" />
                </div>
              )}
            </div>

            {/* quick chips */}
            <div className="flex flex-wrap gap-2 px-5 pb-3">
              {['Нужен сайт + AI', 'Voice AI для звонков', 'WhatsApp бот', 'Реклама под ключ'].map((q) => (
                <button
                  key={q}
                  onClick={() => {
                    setInput(q);
                    setTimeout(() => send(), 10);
                  }}
                  className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-[11.5px] text-white/70 hover:text-white hover:border-bee-400/40 transition"
                >
                  {q}
                </button>
              ))}
            </div>

            {/* input */}
            <form onSubmit={send} className="flex items-center gap-2 border-t border-white/8 px-4 py-3 bg-ink-900/70">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Напишите сообщение…"
                className="flex-1 bg-transparent text-[14px] text-white placeholder:text-white/30 focus:outline-none"
              />
              <button
                type="submit"
                className="grid h-9 w-9 place-items-center rounded-full bg-bee-400 text-ink-950 hover:bg-bee-300 transition"
                aria-label="Отправить"
              >
                <Icon name="send" size={14} />
              </button>
            </form>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

function Bubble({ role, children }) {
  if (role === 'user') {
    return (
      <div className="flex justify-end">
        <div className="max-w-[85%] rounded-2xl rounded-tr-md bg-bee-400/15 border border-bee-400/25 px-4 py-2.5 text-[13.5px] text-bee-50">
          {children}
        </div>
      </div>
    );
  }
  return (
    <div className="flex">
      <div className="max-w-[85%] rounded-2xl rounded-tl-md bg-white/[0.05] border border-white/10 px-4 py-2.5 text-[13.5px] text-white/90">
        {children}
      </div>
    </div>
  );
}
