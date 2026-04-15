import React from 'react';
import { motion } from 'framer-motion';

export default function SectionTitle({ eyebrow, title, sub, align = 'left' }) {
  const alignCls = align === 'center' ? 'text-center items-center mx-auto' : 'text-left items-start';
  return (
    <div className={`flex flex-col gap-5 ${alignCls} max-w-3xl`}>
      {eyebrow && (
        <motion.span
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
          className="eyebrow"
        >
          <span className="dot" />
          {eyebrow}
        </motion.span>
      )}
      <motion.h2
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.6 }}
        className="font-display text-[32px] sm:text-[44px] md:text-[54px] leading-[1.05] tracking-[-0.02em] text-grad"
      >
        {title}
      </motion.h2>
      {sub && (
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, delay: 0.05 }}
          className="text-white/60 text-base sm:text-lg leading-relaxed max-w-2xl"
        >
          {sub}
        </motion.p>
      )}
    </div>
  );
}
