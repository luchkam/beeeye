import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from './ui/Icon.jsx';
import SectionTitle from './ui/SectionTitle.jsx';
import { faq } from '../data/faq.js';

export default function FAQ() {
  const [open, setOpen] = useState(0);
  return (
    <section id="faq" className="relative py-24 sm:py-32">
      <div className="container-beeeye">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.3fr]">
          <div>
            <SectionTitle
              eyebrow="FAQ"
              title="Частые вопросы"
              sub="Коротко о стоимости, сроках, MVP и поддержке. Если не нашли ответ — задайте его AI-агенту на сайте."
            />
          </div>
          <div className="space-y-3">
            {faq.map((item, i) => {
              const isOpen = i === open;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.5, delay: i * 0.04 }}
                  className={`card overflow-hidden ${isOpen ? 'border-bee-400/25' : ''}`}
                >
                  <button
                    onClick={() => setOpen(isOpen ? -1 : i)}
                    className="flex w-full items-center justify-between gap-4 px-5 sm:px-6 py-5 text-left"
                  >
                    <span className={`font-display text-[16px] sm:text-[17px] ${isOpen ? 'text-white' : 'text-white/85'}`}>
                      {item.q}
                    </span>
                    <span
                      className={`grid h-8 w-8 shrink-0 place-items-center rounded-full border border-white/10 transition ${
                        isOpen ? 'bg-bee-400/15 text-bee-300 border-bee-400/30 rotate-180' : 'text-white/50'
                      }`}
                    >
                      <Icon name="chevronDown" size={16} />
                    </span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                      >
                        <div className="px-5 sm:px-6 pb-5 text-[14px] leading-relaxed text-white/60">
                          {item.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
