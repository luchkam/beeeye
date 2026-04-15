import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from './ui/Icon.jsx';
import SectionTitle from './ui/SectionTitle.jsx';
import { serviceCategories, priceFootnote, formatTenge } from '../data/services.js';

export default function Services() {
  const [active, setActive] = useState(serviceCategories[0].id);
  const current = serviceCategories.find((c) => c.id === active);

  return (
    <section id="services" className="relative py-24 sm:py-32">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="container-beeeye">
        <SectionTitle
          eyebrow="Услуги · 7 направлений"
          title="Каталог возможностей под любую бизнес-задачу"
          sub="От AI-агентов и Voice AI до рекламных воронок и системных интеграций. Все цены указаны в формате «от» — точная стоимость после ТЗ."
        />

        {/* Category tabs */}
        <div className="mt-10 flex flex-wrap gap-2">
          {serviceCategories.map((c) => (
            <button
              key={c.id}
              onClick={() => setActive(c.id)}
              className={`group flex items-center gap-2.5 rounded-full border px-4 py-2.5 text-[13px] font-medium transition-all ${
                active === c.id
                  ? 'border-bee-400/50 bg-bee-400/10 text-bee-200 shadow-glow-bee'
                  : 'border-white/10 bg-white/[0.02] text-white/60 hover:text-white/90 hover:border-white/20'
              }`}
            >
              <span
                className={`font-mono text-[10px] rounded-md px-1.5 py-0.5 ${
                  active === c.id ? 'bg-bee-400/20 text-bee-200' : 'bg-white/5 text-white/50'
                }`}
              >
                {c.code}
              </span>
              {c.title}
            </button>
          ))}
        </div>

        {/* Content bento */}
        <div className="mt-8 grid gap-4 lg:grid-cols-[1.2fr_1fr]">
          {/* Left — items */}
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35 }}
              className="card p-6 sm:p-8"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="eyebrow">
                    <span className="dot" />
                    Категория {current.code}
                  </div>
                  <h3 className="mt-4 font-display text-2xl sm:text-3xl text-white tracking-[-0.01em]">
                    {current.title}
                  </h3>
                  <p className="mt-2 text-white/55 text-sm max-w-md">{current.tagline}</p>
                </div>
                <div className="hidden sm:grid h-14 w-14 place-items-center rounded-2xl bg-bee-400/10 text-bee-300 ring-1 ring-bee-400/20">
                  <Icon name={current.icon} size={24} />
                </div>
              </div>

              <div className="mt-6 divide-y divide-white/5 rounded-xl border border-white/5 bg-ink-900/50">
                {current.items.map((s, i) => (
                  <motion.div
                    key={s.name}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.35, delay: i * 0.03 }}
                    className="group flex items-center justify-between gap-4 px-4 py-4 hover:bg-white/[0.02] transition"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <span className="font-mono text-[10px] text-white/30">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <span className="text-[14.5px] text-white/85 truncate">{s.name}</span>
                    </div>
                    <div className="flex items-center gap-3 shrink-0">
                      <span className="font-mono text-[12px] text-white/40">от</span>
                      <span className="text-[14.5px] font-medium text-bee-200 whitespace-nowrap">
                        {formatTenge(s.price)}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Right — category map */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-1">
            <div className="card p-6">
              <div className="text-[11px] uppercase tracking-[0.18em] text-white/40">
                Все категории
              </div>
              <div className="mt-4 space-y-2">
                {serviceCategories.map((c) => {
                  const isActive = c.id === active;
                  return (
                    <button
                      key={c.id}
                      onClick={() => setActive(c.id)}
                      className={`group flex w-full items-center justify-between gap-3 rounded-xl border px-3.5 py-3 text-left transition ${
                        isActive
                          ? 'border-bee-400/40 bg-bee-400/5'
                          : 'border-white/5 bg-white/[0.01] hover:bg-white/[0.03] hover:border-white/10'
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <span
                          className={`font-mono text-[10px] rounded-md px-1.5 py-0.5 ${
                            isActive ? 'bg-bee-400/20 text-bee-200' : 'bg-white/5 text-white/50'
                          }`}
                        >
                          {c.code}
                        </span>
                        <span className={`text-[13.5px] truncate ${isActive ? 'text-white' : 'text-white/75'}`}>
                          {c.title}
                        </span>
                      </div>
                      <span className="text-[11px] font-mono text-white/30">
                        {c.items.length}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="card p-6 bg-gradient-to-br from-bee-400/[0.08] to-transparent border-bee-400/15">
              <div className="flex items-start gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-xl bg-bee-400/15 text-bee-300">
                  <Icon name="sparkle" size={18} />
                </div>
                <div className="min-w-0">
                  <div className="font-display text-base text-white">Не знаете, что выбрать?</div>
                  <p className="mt-1 text-[13px] text-white/55">
                    Опишите задачу своими словами — мы предложим связку, которая даст результат.
                  </p>
                  <a href="#lead" className="mt-4 btn-primary !py-2 !px-4 text-[13px]">
                    Получить предложение
                    <Icon name="arrowRight" size={14} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-start gap-2 rounded-xl border border-white/5 bg-white/[0.02] px-4 py-3">
          <Icon name="sparkle" size={14} className="mt-0.5 text-bee-300" />
          <p className="text-[12.5px] text-white/50">{priceFootnote}</p>
        </div>
      </div>
    </section>
  );
}
