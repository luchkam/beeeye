import React from 'react';
import { motion } from 'framer-motion';
import Icon from './ui/Icon.jsx';

export default function FinalCTA({ onOpenChat, onRequestCallback }) {
  return (
    <section className="relative py-24 sm:py-32">
      <div className="container-beeeye">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
          className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-bee-400/[0.08] via-white/[0.02] to-transparent p-8 sm:p-14"
        >
          <div className="pointer-events-none absolute inset-0 grid-bg opacity-50" />
          <div className="pointer-events-none absolute -right-20 -top-20 h-[380px] w-[380px] rounded-full bg-bee-400/15 blur-[120px]" />

          <div className="relative">
            <span className="eyebrow"><span className="dot" />Не знаете, с чего начать?</span>
            <h2 className="mt-6 font-display text-[34px] sm:text-[52px] leading-[1.05] tracking-[-0.02em] text-grad max-w-3xl">
              Опишите задачу — поможем собрать правильную систему
            </h2>
            <p className="mt-5 max-w-2xl text-base text-white/60 leading-relaxed">
              Сайт, AI-агент, бот, Voice AI, WhatsApp, реклама или комплексное решение — подберём комбинацию,
              которая действительно решает ваш вопрос.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#lead" className="btn-primary shine">
                Оставить заявку
                <Icon name="arrowRight" size={16} />
              </a>
              <button onClick={onOpenChat} className="btn-outline">
                <Icon name="sparkle" size={16} />
                Написать AI-агенту
              </button>
              <button onClick={onRequestCallback} className="btn-ghost">
                <Icon name="phone" size={16} />
                Заказать звонок AI-агента
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
