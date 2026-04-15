import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from './ui/Icon.jsx';
import { legalDocs } from '../data/legal.js';

// ============================================================================
// Модалка для юридических документов (Политика / Соглашение).
// Закрывается по клику на фон, крестик или Esc.
// ============================================================================

export default function LegalModal({ docKey, onClose }) {
  const doc = docKey ? legalDocs[docKey] : null;

  useEffect(() => {
    if (!doc) return;
    function onKey(e) {
      if (e.key === 'Escape') onClose();
    }
    window.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [doc, onClose]);

  return (
    <AnimatePresence>
      {doc && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] grid place-items-center p-4 sm:p-8"
        >
          <div
            className="absolute inset-0 bg-ink-950/80 backdrop-blur-xl"
            onClick={onClose}
          />

          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-[720px] max-h-[88vh] card flex flex-col overflow-hidden"
          >
            <div className="flex items-start justify-between gap-4 p-6 sm:p-8 pb-4 border-b border-white/5">
              <div>
                <div className="eyebrow"><span className="dot" />Legal</div>
                <h3 className="mt-3 font-display text-[22px] sm:text-[26px] leading-tight text-white">
                  {doc.title}
                </h3>
                <p className="mt-1 text-[12.5px] text-white/45">{doc.subtitle}</p>
              </div>
              <button
                onClick={onClose}
                aria-label="Свернуть"
                className="shrink-0 rounded-lg p-1.5 text-white/60 hover:text-white hover:bg-white/5 transition"
              >
                <Icon name="close" size={18} />
              </button>
            </div>

            <div className="overflow-y-auto px-6 sm:px-8 py-6 space-y-6 text-[13.5px] leading-relaxed text-white/70 legal-scroll">
              {doc.sections.map((s) => (
                <section key={s.heading}>
                  <h4 className="font-display text-[14.5px] tracking-wide text-white">
                    {s.heading}
                  </h4>
                  <div className="mt-2 space-y-2.5">
                    {s.paragraphs.map((p, i) => (
                      <p key={i}>{p}</p>
                    ))}
                  </div>
                </section>
              ))}
            </div>

            <div className="p-4 sm:p-5 border-t border-white/5 flex justify-end">
              <button onClick={onClose} className="btn-ghost !py-2 !px-4 text-[13px]">
                Свернуть
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
