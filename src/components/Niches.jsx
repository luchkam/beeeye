import React from 'react';
import { motion } from 'framer-motion';
import SectionTitle from './ui/SectionTitle.jsx';
import { niches } from '../data/niches.js';

export default function Niches() {
  return (
    <section className="relative py-24 sm:py-28">
      <div className="container-beeeye">
        <SectionTitle
          eyebrow="Для каких ниш"
          title="Работаем с любыми сферами"
          sub="Универсальные инструменты, которые адаптируются под специфику бизнеса — от туризма до отделов продаж."
        />

        <div className="mt-14 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {niches.map((n, i) => (
            <motion.div
              key={n.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: (i % 5) * 0.05 }}
              className="group card card-hover relative p-5 overflow-hidden"
            >
              <div className="font-display text-[16px] text-white">{n.title}</div>
              <div className="mt-1 text-[12px] text-white/50 leading-relaxed">{n.desc}</div>
              <span className="pointer-events-none absolute -right-10 -top-10 h-24 w-24 rounded-full bg-bee-400/[0.08] blur-2xl opacity-0 group-hover:opacity-100 transition" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
