import React from 'react';
import { motion } from 'framer-motion';
import Icon from './ui/Icon.jsx';
import BeeOrb from './ui/BeeOrb.jsx';

const directions = [
  { label: 'AI-агенты' },
  { label: 'Voice AI' },
  { label: 'WhatsApp API' },
  { label: 'Сайты и лендинги' },
  { label: 'Автоматизация' },
  { label: 'Реклама и воронки' },
];

export default function Hero({ onOpenChat, onRequestCallback, onOpenWhatsAppDemo }) {
  return (
    <section id="top" className="relative overflow-hidden pt-32 sm:pt-36 pb-20 sm:pb-28">
      {/* backdrop */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 grid-bg opacity-60" />
        <div className="absolute left-1/2 top-[-10%] h-[720px] w-[720px] -translate-x-1/2 rounded-full bg-bee-400/10 blur-[120px]" />
        <div className="absolute right-[-10%] bottom-[-10%] h-[520px] w-[520px] rounded-full bg-bee-500/5 blur-[120px]" />
      </div>

      <div className="container-beeeye relative">
        <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-12">
          <div>
            <motion.span
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="eyebrow"
            >
              <span className="dot" />
              Внимание к деталям · AI · Digital · Systems
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.05 }}
              className="headline mt-6 text-grad"
            >
              Строим <span className="text-grad-bee">AI-системы</span>
              <br />
              для роста бизнеса
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="sub mt-6"
            >
              AI-агенты, Voice AI, чат-боты, сайты, автоматизация, реклама и мессенджер-решения.
              Собираем не отдельные инструменты, а работающие цифровые системы под бизнес-логику клиента.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.25 }}
              className="mt-8 flex flex-wrap gap-3"
            >
              <a href="#lead" className="btn-primary shine">
                Оставить заявку
                <Icon name="arrowRight" size={16} />
              </a>
              <a href="#services" className="btn-ghost">
                Посмотреть услуги
              </a>
              <button onClick={onOpenChat} className="btn-outline">
                <Icon name="sparkle" size={16} />
                Попробовать AI-агента
              </button>
              <button onClick={onRequestCallback} className="btn-ghost">
                <Icon name="phone" size={16} />
                Звонок от AI-агента
              </button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mt-10 flex flex-wrap items-center gap-x-5 gap-y-2"
            >
              {directions.map((d, i) => (
                <div key={d.label} className="flex items-center gap-2">
                  <span className="h-1 w-1 rounded-full bg-bee-400/80" />
                  <span className="text-[13px] text-white/55">{d.label}</span>
                  {i < directions.length - 1 && <span className="text-white/15">·</span>}
                </div>
              ))}
            </motion.div>
          </div>

          {/* Visual composition */}
          <div className="relative mx-auto w-full max-w-[560px] aspect-square">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <BeeOrb size={520} />
            </motion.div>

            {/* Floating UI cards */}
            <FloatingCard
              className="top-[2%] left-[-6%]"
              delay={0.45}
              icon="bot"
              title="AI-агент"
              body="Онлайн · 24/7"
              meta="2.3s response"
              onClick={onOpenChat}
              interactive
            />
            <FloatingCard
              className="top-[-2%] left-[36%]"
              delay={0.55}
              icon="facebook"
              title="Facebook"
              body="Автопостинг"
            />
            <FloatingCard
              className="top-[4%] right-[-4%]"
              delay={0.6}
              icon="telegram"
              title="Telegram"
              body="Бот · 24/7"
              accent
              href="https://t.me/beeeye_demo_bot"
              target="_blank"
              rel="noreferrer"
              interactive
            />
            <FloatingCard
              className="top-[40%] left-[-10%]"
              delay={0.7}
              icon="instagram"
              title="Instagram"
              body="Автопостинг"
            />
            <FloatingCard
              className="top-[42%] right-[-8%]"
              delay={0.75}
              icon="voice"
              title="Voice AI"
              body="Перезвонит за 90 сек"
              accent
              onClick={onRequestCallback}
              interactive
            />
            <FloatingCard
              className="bottom-[6%] left-[-2%]"
              delay={0.9}
              icon="whatsapp"
              title="WhatsApp"
              body="87% автоматизация"
              onClick={onOpenWhatsAppDemo}
              interactive
            />
            <FloatingCard
              className="bottom-[-2%] left-[36%]"
              delay={1.0}
              icon="threads"
              title="Threads"
              body="Автопостинг"
              accent
            />
            <FloatingCard
              className="bottom-[10%] right-[-2%]"
              delay={1.05}
              icon="target"
              title="Реклама"
              body="CAC ↓ 42%"
            />
          </div>
        </div>

        {/* bottom stat strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
          className="mt-16 grid grid-cols-2 gap-px rounded-2xl border border-white/8 bg-white/[0.02] overflow-hidden sm:grid-cols-4"
        >
          {[
            { k: '24/7', v: 'AI работает без перерывов' },
            { k: '2–4 нед.', v: 'Запуск сложных систем' },
            { k: '7 дней', v: 'MVP лендинг + AI' },
            { k: '50+', v: 'Типов готовых сценариев' },
          ].map((s) => (
            <div key={s.k} className="bg-ink-950/40 p-5 sm:p-6">
              <div className="font-display text-2xl sm:text-3xl text-white">{s.k}</div>
              <div className="mt-1 text-[13px] text-white/50">{s.v}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function FloatingCard({
  className,
  delay = 0,
  icon,
  title,
  body,
  meta,
  accent,
  href,
  target,
  rel,
  onClick,
  interactive = false,
}) {
  const containerClass = `absolute z-20 ${className}`;
  const cardClass = `card card-hover min-w-[150px] px-3.5 py-2.5 ${accent ? 'shadow-glow-bee' : ''} ${
    interactive ? 'cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-bee-400/60' : ''
  }`;
  const cardContent = (
    <motion.div
      animate={{ y: [0, -6, 0] }}
      transition={{ duration: 5 + Math.random() * 2, repeat: Infinity, ease: 'easeInOut' }}
      className={cardClass}
    >
      <div className="flex items-center gap-2.5">
        <div className={`grid h-9 w-9 place-items-center rounded-xl ${accent ? 'bg-bee-400/15 text-bee-300' : 'bg-white/5 text-white/80'}`}>
          <Icon name={icon} size={18} />
        </div>
        <div>
          <div className="text-[13px] font-medium text-white">{title}</div>
          <div className="text-[11px] text-white/50">{body}</div>
        </div>
      </div>
      {meta && (
        <div className="mt-2 flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-bee-300/90">
          <span className="h-1 w-1 rounded-full bg-bee-400 animate-pulse" />
          {meta}
        </div>
      )}
    </motion.div>
  );

  if (href) {
    return (
      <motion.a
        initial={{ opacity: 0, y: 16, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
        className={containerClass}
        href={href}
        target={target}
        rel={rel}
      >
        {cardContent}
      </motion.a>
    );
  }

  if (onClick) {
    return (
      <motion.button
        type="button"
        initial={{ opacity: 0, y: 16, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
        className={`${containerClass} bg-transparent p-0 text-left`}
        onClick={onClick}
        aria-label={title}
      >
        {cardContent}
      </motion.button>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 16, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
      className={containerClass}
    >
      {cardContent}
    </motion.div>
  );
}
