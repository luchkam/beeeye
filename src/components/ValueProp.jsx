import React from 'react';
import { motion } from 'framer-motion';
import Icon from './ui/Icon.jsx';

const items = [
  {
    icon: 'zap',
    title: 'Больше заявок',
    desc: 'AI-воронки и квалификация помогают получать больше целевых лидов из каждого канала.',
  },
  {
    icon: 'bot',
    title: 'Автоматизация общения',
    desc: 'AI консультирует, отвечает и квалифицирует клиентов там, где раньше были менеджеры.',
  },
  {
    icon: 'layers',
    title: 'Запуск digital-инструментов',
    desc: 'Сайты, боты, интеграции, voice, рассылки — быстро собираем нужные инструменты в систему.',
  },
  {
    icon: 'target',
    title: 'AI-воронки под бизнес',
    desc: 'Строим сквозные AI-воронки: от рекламы до передачи лида менеджеру в CRM.',
  },
];

export default function ValueProp() {
  return (
    <section className="relative py-24 sm:py-28">
      <div className="container-beeeye">
        <div className="mb-12 max-w-3xl">
          <motion.span
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            className="eyebrow"
          >
            <span className="dot" /> Что мы делаем
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6 }}
            className="mt-5 font-display text-[34px] sm:text-[46px] leading-[1.05] tracking-[-0.02em] text-grad"
          >
            Помогаем бизнесу получать заявки и автоматизировать общение — без хаоса и случайных решений.
          </motion.h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((it, i) => (
            <motion.div
              key={it.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              className="card card-hover p-6"
            >
              <div className="grid h-11 w-11 place-items-center rounded-xl bg-bee-400/10 text-bee-300 ring-1 ring-bee-400/20">
                <Icon name={it.icon} size={20} />
              </div>
              <div className="mt-5 font-display text-lg text-white">{it.title}</div>
              <div className="mt-2 text-[14px] leading-relaxed text-white/55">{it.desc}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
