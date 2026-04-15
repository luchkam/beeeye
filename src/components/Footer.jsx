import React, { useState } from 'react';
import Icon from './ui/Icon.jsx';
import LegalModal from './LegalModal.jsx';

const quickLinks = [
  { href: '#services', label: 'Услуги' },
  { href: '#solutions', label: 'Решения' },
  { href: '#demos', label: 'Демо' },
  { href: '#process', label: 'Процесс' },
  { href: '#faq', label: 'FAQ' },
  { href: '#lead', label: 'Заявка' },
];

export default function Footer() {
  const [legalOpen, setLegalOpen] = useState(null);
  return (
    <footer className="relative border-t border-white/5 pt-16 pb-10 mt-12">
      <div className="container-beeeye">
        <div className="grid gap-10 md:grid-cols-[1.5fr_1fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="font-display text-[18px] tracking-[0.16em] text-white">
                BEE <span className="text-bee-400">EYE</span>
              </span>
            </div>
            <p className="mt-4 text-[13px] text-white/50 max-w-sm leading-relaxed">
              Внимание к деталям. AI-агенты, Voice AI, сайты, мессенджеры и автоматизация — в одну работающую систему.
            </p>
            <div className="mt-6 flex gap-2">
              <SocialButton
                icon="telegram"
                label="Telegram"
                href="https://t.me/beeeye_demo_bot"
                target="_blank"
                rel="noreferrer"
              />
              <SocialButton icon="mail" label="E-mail" href="mailto:info@beeeye.kz" />
            </div>
          </div>

          <Column title="Навигация" items={quickLinks} />

          <div>
            <div className="text-[11px] uppercase tracking-[0.18em] text-white/40">Контакты</div>
            <ul className="mt-4 space-y-2.5 text-[13px] text-white/70">
              <li>
                <a href="tel:+77001451728" className="flex items-center gap-2 hover:text-white transition">
                  <Icon name="phone" size={14} className="text-bee-300" />
                  +7 (700) 145-17-28
                </a>
              </li>
              <li>
                <a href="mailto:info@beeeye.kz" className="flex items-center gap-2 hover:text-white transition">
                  <Icon name="mail" size={14} className="text-bee-300" />
                  info@beeeye.kz
                </a>
              </li>
            </ul>
          </div>

          <div>
            <div className="text-[11px] uppercase tracking-[0.18em] text-white/40">Документы</div>
            <ul className="mt-4 space-y-2.5 text-[13px] text-white/70">
              <li>
                <button
                  type="button"
                  onClick={() => setLegalOpen('privacy')}
                  className="text-left hover:text-white transition"
                >
                  Политика конфиденциальности
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => setLegalOpen('terms')}
                  className="text-left hover:text-white transition"
                >
                  Пользовательское соглашение
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-white/5 text-[12px] text-white/40">
          <div>© {new Date().getFullYear()} BEE EYE. Все права защищены.</div>
        </div>
      </div>
      <LegalModal docKey={legalOpen} onClose={() => setLegalOpen(null)} />
    </footer>
  );
}

function SocialButton({ icon, label, href, target, rel }) {
  return (
    <a
      aria-label={label}
      href={href}
      target={target}
      rel={rel}
      className="grid h-10 w-10 place-items-center rounded-xl border border-white/8 bg-white/[0.02] text-white/70 hover:bg-white/[0.06] hover:text-bee-300 hover:border-bee-400/30 transition"
    >
      <Icon name={icon} size={16} />
    </a>
  );
}

function Column({ title, items }) {
  return (
    <div>
      <div className="text-[11px] uppercase tracking-[0.18em] text-white/40">{title}</div>
      <ul className="mt-4 space-y-2.5">
        {items.map((it) => (
          <li key={it.href}>
            <a className="text-[13px] text-white/70 hover:text-white transition" href={it.href}>
              {it.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
