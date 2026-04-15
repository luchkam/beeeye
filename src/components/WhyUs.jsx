import React from 'react';
import { motion } from 'framer-motion';
import Icon from './ui/Icon.jsx';
import SectionTitle from './ui/SectionTitle.jsx';

const points = [
  {
    icon: 'layers',
    title: 'Не просто дизайн — рабочая логика',
    desc: 'Мы строим то, что даёт результат в цифрах, а не только красиво выглядит на демо.',
  },
  {
    icon: 'plug',
    title: 'Комбинируем инструменты в систему',
    desc: 'AI, сайты, реклама, мессенджеры, voice и автоматизация — в одной связке, а не по отдельности.',
  },
  {
    icon: 'zap',
    title: 'MVP-подход',
    desc: 'Можно начать с минимальной рабочей версии и развивать дальше — по мере проверки гипотез.',
  },
  {
    icon: 'play',
    title: 'Быстрый запуск',
    desc: 'Быстро собираем понятные бизнес-решения, которые приносят результат, а не живут в роадмапе.',
  },
  {
    icon: 'target',
    title: 'Системное мышление',
    desc: 'Собираем не отдельный кусок, а рабочую систему — с воронкой, аналитикой и владельцами процесса.',
  },
  {
    icon: 'eye',
    title: 'Внимание к деталям',
    desc: 'Сразу думаем о реальной работе инструмента — не только о внешнем виде. Как говорит наш слоган.',
  },
];

export default function WhyUs() {
  return (
    <section className="relative py-24 sm:py-32">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-0 h-[400px] w-[800px] -translate-x-1/2 rounded-full bg-bee-400/5 blur-[120px]" />
      </div>
      <div className="container-beeeye relative">
        <SectionTitle
          eyebrow="Почему с нами"
          title="Премиальный уровень. Измеримый результат."
          sub="Мы — tech-команда, которая одинаково уверенно работает с AI, backend, frontend, рекламой и интеграциями."
        />

        <div className="mt-14 grid gap-px rounded-3xl border border-white/8 bg-white/[0.02] overflow-hidden md:grid-cols-2 lg:grid-cols-3">
          {points.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.55, delay: (i % 3) * 0.08 }}
              className="group relative bg-ink-950/40 p-7 sm:p-8 hover:bg-ink-900/40 transition"
            >
              <div className="flex items-start gap-4">
                <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-bee-400/10 text-bee-300 ring-1 ring-bee-400/20">
                  <Icon name={p.icon} size={19} />
                </div>
                <div className="min-w-0">
                  <div className="font-display text-[18px] text-white tracking-[-0.01em]">
                    {p.title}
                  </div>
                  <p className="mt-2 text-[13.5px] leading-relaxed text-white/55">{p.desc}</p>
                </div>
              </div>
              <span className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-bee-400/40 to-transparent opacity-0 group-hover:opacity-100 transition" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
