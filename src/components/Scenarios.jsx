import React from 'react';
import { motion } from 'framer-motion';
import Icon from './ui/Icon.jsx';
import SectionTitle from './ui/SectionTitle.jsx';
import { scenarios } from '../data/scenarios.js';

export default function Scenarios() {
  return (
    <section id="scenarios" className="relative py-24 sm:py-28">
      <div className="container-beeeye">
        <SectionTitle
          eyebrow="Как это может работать у вас"
          title="Готовые сценарии, которые приносят результат"
          sub="Реальные цепочки: от первого касания клиента до лида в CRM. Каждый блок можно собрать как часть единой системы."
        />

        <div className="mt-14 space-y-5">
          {scenarios.map((sc, i) => (
            <motion.div
              key={sc.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6, delay: i * 0.06 }}
              className="card p-5 sm:p-7"
            >
              <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:gap-8">
                <div className="lg:w-[260px] shrink-0">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-[11px] text-bee-300/80">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="h-px flex-1 bg-gradient-to-r from-bee-400/40 to-transparent" />
                  </div>
                  <div className="mt-3 font-display text-lg text-white tracking-[-0.01em]">
                    {sc.title}
                  </div>
                  <div className="mt-1 text-[13px] text-white/50">{sc.summary}</div>
                </div>

                {/* Flow */}
                <div className="flex-1 overflow-x-auto">
                  <div className="flex items-center gap-2 min-w-max">
                    {sc.steps.map((st, idx) => (
                      <React.Fragment key={idx}>
                        <StepNode icon={st.icon} label={st.label} index={idx} />
                        {idx < sc.steps.length - 1 && <FlowArrow />}
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function StepNode({ icon, label, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: 0.1 + index * 0.08 }}
      className="flex items-center gap-3 rounded-xl border border-white/8 bg-white/[0.03] px-3.5 py-2.5"
    >
      <div className="grid h-8 w-8 place-items-center rounded-lg bg-bee-400/10 text-bee-300 ring-1 ring-bee-400/20">
        <Icon name={icon} size={16} />
      </div>
      <span className="text-[13px] text-white/85 whitespace-nowrap">{label}</span>
    </motion.div>
  );
}

function FlowArrow() {
  return (
    <div className="relative flex items-center w-10 shrink-0">
      <div className="h-px flex-1 bg-gradient-to-r from-white/15 via-white/25 to-white/15" />
      <Icon name="chevronRight" size={14} className="text-white/40 -ml-1" />
    </div>
  );
}
