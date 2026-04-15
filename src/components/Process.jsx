import React from 'react';
import { motion } from 'framer-motion';
import Icon from './ui/Icon.jsx';
import SectionTitle from './ui/SectionTitle.jsx';

const steps = [
  {
    n: '01',
    title: 'Вы оставляете заявку',
    desc: 'Описываете задачу своими словами — коротко или подробно.',
    icon: 'form',
  },
  {
    n: '02',
    title: 'Первичная обратная связь',
    desc: 'Предлагаем форму реализации и примерную оценку разработки и обслуживания.',
    icon: 'sparkle',
  },
  {
    n: '03',
    title: 'Подробное ТЗ',
    desc: 'Если всё подходит — запрашиваем или помогаем составить подробное техническое задание.',
    icon: 'brief',
  },
  {
    n: '04',
    title: 'Схема, сроки, точная стоимость',
    desc: 'Даём подробную схему реализации, план работ, сроки и финальную стоимость.',
    icon: 'layers',
  },
  {
    n: '05',
    title: 'Запуск по предоплате 50%',
    desc: 'После согласования стартуем проект по предоплате и показываем промежуточные результаты.',
    icon: 'play',
  },
  {
    n: '06',
    title: 'Промежуточный результат и правки',
    desc: 'Если решение устраивает, но нужны доработки — запрашиваем 30% и продолжаем правки. После финальной сдачи — оставшиеся 20%.',
    icon: 'check',
  },
];

export default function Process() {
  return (
    <section id="process" className="relative py-24 sm:py-32">
      <div className="container-beeeye">
        <SectionTitle
          eyebrow="Как мы работаем"
          title="Прозрачный процесс без хаоса"
          sub="Шесть понятных шагов, фиксированные этапы оплаты и поддержка после запуска. Никаких сюрпризов."
        />

        <div className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {steps.map((s, i) => (
            <motion.div
              key={s.n}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.55, delay: (i % 3) * 0.08 }}
              className="card card-hover group relative p-6 sm:p-7"
            >
              <div className="flex items-start justify-between">
                <div className="font-mono text-[11px] text-white/40 tracking-wider">STEP {s.n}</div>
                <div className="grid h-10 w-10 place-items-center rounded-xl bg-white/5 text-bee-300 ring-1 ring-white/10 group-hover:ring-bee-400/30 transition">
                  <Icon name={s.icon} size={18} />
                </div>
              </div>
              <div className="mt-5 font-display text-[19px] text-white leading-tight tracking-[-0.01em]">
                {s.title}
              </div>
              <p className="mt-2 text-[13.5px] leading-relaxed text-white/55">{s.desc}</p>

              {/* subtle vertical bar */}
              <span className="absolute left-0 top-6 bottom-6 w-px bg-gradient-to-b from-transparent via-bee-400/30 to-transparent opacity-0 group-hover:opacity-100 transition" />
            </motion.div>
          ))}
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          <Feature icon="shield" title="Гарантия поддержки">
            Продолжаем сопровождать проект после запуска: мониторинг, доработки, обновления.
          </Feature>
          <Feature icon="check" title="Поэтапная прозрачность">
            Видите результат на каждом этапе — без «чёрного ящика».
          </Feature>
          <Feature icon="zap" title="Без хаоса">
            Каждый проект ведётся по чёткому плану с зафиксированными сроками и ответственностью.
          </Feature>
        </div>
      </div>
    </section>
  );
}

function Feature({ icon, title, children }) {
  return (
    <div className="flex items-start gap-3 rounded-2xl border border-white/8 bg-white/[0.02] p-5">
      <div className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-bee-400/10 text-bee-300 ring-1 ring-bee-400/20">
        <Icon name={icon} size={16} />
      </div>
      <div>
        <div className="text-[14px] font-medium text-white">{title}</div>
        <div className="mt-1 text-[12.5px] text-white/55 leading-relaxed">{children}</div>
      </div>
    </div>
  );
}
