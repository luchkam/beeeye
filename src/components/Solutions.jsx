import React from 'react';
import { motion } from 'framer-motion';
import Icon from './ui/Icon.jsx';
import SectionTitle from './ui/SectionTitle.jsx';
import { solutions } from '../data/solutions.js';

export default function Solutions() {
  return (
    <section id="solutions" className="relative py-24 sm:py-28">
      <div className="container-beeeye">
        <SectionTitle
          eyebrow="Готовые форматы · Быстро"
          title="Решения, которые можно запустить сразу"
          sub="Собранные пакеты для самых частых задач. Можно брать как есть или расширять под ваш сценарий."
        />

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {solutions.map((s, i) => (
            <motion.a
              key={s.id}
              href="#lead"
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.55, delay: (i % 3) * 0.08 }}
              className="card card-hover group relative p-6 flex flex-col"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] rounded-md bg-white/5 px-1.5 py-0.5 text-white/50 tracking-wider">
                  {s.tag}
                </span>
                <Icon
                  name="arrowUpRight"
                  size={18}
                  className="text-white/30 group-hover:text-bee-300 transition"
                />
              </div>
              <div className="mt-6 font-display text-[22px] leading-tight text-white tracking-[-0.01em]">
                {s.title}
              </div>
              <p className="mt-3 text-[13.5px] leading-relaxed text-white/55">{s.desc}</p>
              <ul className="mt-5 space-y-2">
                {s.bullets.map((b) => (
                  <li key={b} className="flex items-center gap-2 text-[13px] text-white/70">
                    <Icon name="check" size={14} className="text-bee-300 shrink-0" />
                    {b}
                  </li>
                ))}
              </ul>

              <div className="pointer-events-none absolute inset-x-0 -bottom-px h-px bg-gradient-to-r from-transparent via-bee-400/30 to-transparent opacity-0 group-hover:opacity-100 transition" />
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
