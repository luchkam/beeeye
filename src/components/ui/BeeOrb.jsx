import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

// Развитие формы логотипа BEE EYE:
// концентрические dot-grid сферы, лёгкое вращение, внутренний "глаз" из свечения.
// Это НЕ прямая копия лого, а интерпретация: точки + радиальная глубина.
export default function BeeOrb({ size = 520 }) {
  const rings = useMemo(() => {
    // Генерация точек по концентрическим окружностям для ощущения "сферы из точек".
    const out = [];
    const ringCount = 14;
    for (let r = 1; r <= ringCount; r++) {
      const radius = (r / ringCount) * 0.92;
      const points = Math.floor(6 + r * 5);
      for (let i = 0; i < points; i++) {
        const angle = (i / points) * Math.PI * 2 + (r % 2 ? 0 : Math.PI / points);
        const x = 0.5 + Math.cos(angle) * radius * 0.5;
        const y = 0.5 + Math.sin(angle) * radius * 0.5 * 0.92; // slight vertical squish
        // Ослабляем яркость точек по краю, усиливаем в центре
        const distFromCenter = Math.hypot(x - 0.5, y - 0.5);
        const intensity = Math.max(0, 1 - distFromCenter * 1.9);
        out.push({ x, y, r: 1.3 + (1 - distFromCenter) * 1.2, o: 0.2 + intensity * 0.9, key: `${r}-${i}` });
      }
    }
    return out;
  }, []);

  return (
    <div className="relative" style={{ width: size, height: size }}>
      {/* Outer glow */}
      <div
        className="absolute inset-0 rounded-full"
        style={{
          background:
            'radial-gradient(circle at 50% 45%, rgba(255,221,34,0.35) 0%, rgba(255,221,34,0.12) 25%, rgba(255,221,34,0) 55%)',
          filter: 'blur(20px)',
        }}
      />
      {/* Rotating dotted sphere */}
      <motion.svg
        viewBox="0 0 100 100"
        className="relative z-10 h-full w-full"
        animate={{ rotate: 360 }}
        transition={{ duration: 80, ease: 'linear', repeat: Infinity }}
      >
        <defs>
          <radialGradient id="beeCore" cx="50%" cy="48%" r="50%">
            <stop offset="0%" stopColor="#fff3a6" stopOpacity="0.9" />
            <stop offset="35%" stopColor="#ffdd22" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#ffdd22" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="beeFade" cx="50%" cy="50%" r="50%">
            <stop offset="60%" stopColor="#fff" stopOpacity="1" />
            <stop offset="100%" stopColor="#fff" stopOpacity="0" />
          </radialGradient>
          <mask id="beeMask">
            <rect width="100" height="100" fill="black" />
            <circle cx="50" cy="50" r="50" fill="url(#beeFade)" />
          </mask>
        </defs>

        {/* core glow */}
        <circle cx="50" cy="48" r="22" fill="url(#beeCore)" />

        {/* dot field */}
        <g mask="url(#beeMask)">
          {rings.map((p) => (
            <circle
              key={p.key}
              cx={p.x * 100}
              cy={p.y * 100}
              r={p.r * 0.35}
              fill="#ffdd22"
              opacity={p.o}
            />
          ))}
        </g>
      </motion.svg>

      {/* Scanning line */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-full">
        <div
          className="absolute left-0 right-0 h-[140%] animate-scan"
          style={{
            background:
              'linear-gradient(to bottom, transparent 45%, rgba(255,221,34,0.22) 50%, transparent 55%)',
          }}
        />
      </div>
    </div>
  );
}
