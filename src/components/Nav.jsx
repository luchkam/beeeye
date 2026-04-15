import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from './ui/Icon.jsx';

const links = [
  { href: '#services', label: 'Услуги' },
  { href: '#solutions', label: 'Решения' },
  { href: '#demos', label: 'Демо' },
  { href: '#process', label: 'Процесс' },
  { href: '#faq', label: 'FAQ' },
];

export default function Nav({ onOpenChat }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled ? 'backdrop-blur-xl bg-ink-950/70 border-b border-white/5' : 'bg-transparent'
        }`}
      >
        <div className="container-beeeye flex h-16 items-center justify-between">
          <a href="#top" className="flex items-center gap-2.5 group">
            <Logo />
            <span className="font-display text-[15px] tracking-[0.16em] text-white/90 group-hover:text-white transition">
              BEE <span className="text-bee-400">EYE</span>
            </span>
          </a>
          <nav className="hidden md:flex items-center gap-1">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="rounded-full px-4 py-2 text-sm text-white/65 hover:text-white hover:bg-white/[0.04] transition"
              >
                {l.label}
              </a>
            ))}
          </nav>
          <div className="hidden md:flex items-center gap-2">
            <button onClick={onOpenChat} className="btn-ghost !py-2 !px-4 text-[13px]">
              <Icon name="sparkle" size={16} className="text-bee-300" />
              AI-агент
            </button>
            <a href="#lead" className="btn-primary !py-2 !px-4 text-[13px]">
              Оставить заявку
              <Icon name="arrowRight" size={16} />
            </a>
          </div>
          <button
            className="md:hidden rounded-lg p-2 text-white/80 hover:bg-white/5"
            onClick={() => setOpen(true)}
            aria-label="Меню"
          >
            <Icon name="menu" size={22} />
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-ink-950/90 backdrop-blur-2xl md:hidden"
          >
            <div className="container-beeeye flex h-16 items-center justify-between">
              <span className="font-display tracking-[0.16em] text-white">BEE <span className="text-bee-400">EYE</span></span>
              <button onClick={() => setOpen(false)} className="rounded-lg p-2 text-white/80">
                <Icon name="close" size={22} />
              </button>
            </div>
            <div className="container-beeeye pt-8 flex flex-col gap-2">
              {links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="rounded-2xl border border-white/8 bg-white/[0.03] px-5 py-4 text-white/90 hover:bg-white/[0.06]"
                >
                  {l.label}
                </a>
              ))}
              <a href="#lead" onClick={() => setOpen(false)} className="btn-primary mt-4 !py-4">
                Оставить заявку
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function Logo() {
  return (
    <svg width="26" height="26" viewBox="0 0 40 40" className="shrink-0" aria-hidden="true">
      <defs>
        <radialGradient id="logoGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ffdd22" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#ffdd22" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="20" cy="20" r="18" fill="url(#logoGlow)" />
      {[...Array(5)].map((_, r) => {
        const radius = 4 + r * 3;
        const count = 6 + r * 4;
        return Array.from({ length: count }).map((__, i) => {
          const a = (i / count) * Math.PI * 2;
          return (
            <circle
              key={`${r}-${i}`}
              cx={20 + Math.cos(a) * radius}
              cy={20 + Math.sin(a) * radius}
              r={1}
              fill="#ffdd22"
              opacity={0.4 + (1 - r / 5) * 0.6}
            />
          );
        });
      })}
    </svg>
  );
}
