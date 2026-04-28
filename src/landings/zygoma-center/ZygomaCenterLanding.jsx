import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import './styles.css';
import zygomaLogo from './assets/zygoma-logo.jpg';
import {
  PHONE_DISPLAY,
  PHONE_TEL,
  WHATSAPP_BOOK_URL,
  TELEGRAM_URL,
  INSTAGRAM_URL,
  TIKTOK_URL,
  THREADS_URL,
  TWO_GIS_URL,
  ADDRESS_LINE,
  HOURS_LINE,
  RATING,
  REVIEWS_COUNT,
  SERVICES,
  TRUST_POINTS,
  PRICING,
  TREATMENT_STEPS,
  MARQUEE_ITEMS,
  SOCIALS,
  EMAIL,
} from './data.js';

const FONT_HREF =
  'https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;1,400;1,500&family=Manrope:wght@400;500;600;700&display=swap';

function useLandingMeta() {
  useEffect(() => {
    const prevTitle = document.title;
    document.title =
      'Zygoma Center by dr. Utegenov — стоматология, имплантация и Zygoma в Астане';
    const meta = document.querySelector('meta[name="description"]');
    const prevDesc = meta?.getAttribute('content') ?? null;
    if (meta) {
      meta.setAttribute(
        'content',
        'Zygoma Center by dr. Utegenov — семейная стоматология, дентальная и скуловая имплантация Zygoma, лечение во сне «Севоран». Астана, ул. Кенесары, 4а. Бесплатная консультация.',
      );
    }
    if (!document.querySelector('link[data-zg-font="1"]')) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = FONT_HREF;
      link.dataset.zgFont = '1';
      document.head.appendChild(link);
    }
    return () => {
      document.title = prevTitle;
      if (meta && prevDesc != null) meta.setAttribute('content', prevDesc);
    };
  }, []);
}

export default function ZygomaCenterLanding() {
  useLandingMeta();
  const cursorRef = useCursorFollower();

  const { scrollYProgress } = useScroll();
  const progressX = useSpring(scrollYProgress, { stiffness: 120, damping: 20, mass: 0.3 });

  return (
    <div className="zygoma-root">
      <motion.div
        className="zg-progress"
        style={{ scaleX: progressX, width: '100%' }}
      />
      <div className="zg-cursor" ref={cursorRef} aria-hidden="true" />
      <Header />
      <Hero />
      <Marquee />
      <Trust />
      <Services />
      <Process />
      <Pricing />
      <Reviews />
      <Socials />
      <Contacts />
      <Footer />
      <MobileCTA />
      <div className="zg-mobile-bar-spacer" aria-hidden="true" />
    </div>
  );
}

/* =========================
   Cursor follower
   ========================= */
function useCursorFollower() {
  const ref = useRef(null);
  useEffect(() => {
    if (!ref.current) return;
    const el = ref.current;
    let raf = 0;
    let tx = -1000, ty = -1000;
    let cx = -1000, cy = -1000;
    const onMove = (e) => { tx = e.clientX; ty = e.clientY; };
    const tick = () => {
      cx += (tx - cx) * 0.18;
      cy += (ty - cy) * 0.18;
      el.style.transform = `translate(${cx}px, ${cy}px) translate(-50%, -50%)`;
      raf = requestAnimationFrame(tick);
    };
    window.addEventListener('mousemove', onMove);
    raf = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(raf);
    };
  }, []);
  return ref;
}

/* =========================
   Brand logo (close to real Zygoma Center mark)
   Stylized "Z" rendered as a tooth silhouette.
   ========================= */
function BrandLogo({ size = 56, light = true, drawStroke = false }) {
  const stroke = light ? '#ffffff' : '#0a1740';
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 200 200"
      fill="none"
      aria-label="Zygoma Center logo"
    >
      <g
        stroke={stroke}
        strokeWidth="9"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      >
        {/* Z letterform: left cusp arch → Z top → Z diagonal → Z bottom → left root */}
        <path
          className={drawStroke ? 'zg-logo-stroke' : ''}
          d="M 82,68 C 74,52 54,36 54,22 C 54,10 72,10 78,28 C 80,36 82,54 82,68 L 118,68 L 82,112 L 118,112 M 82,112 C 76,126 66,144 60,168"
        />
        {/* Right cusp (C) forming the ZC tooth mark + right root */}
        <path
          className={drawStroke ? 'zg-logo-stroke' : ''}
          d="M 118,68 C 118,52 128,18 146,24 C 154,32 150,54 140,68 M 118,112 C 124,126 134,144 140,168"
        />
      </g>
    </svg>
  );
}

function LogoLockup({ light = true, compact = false }) {
  const main = light ? '#ffffff' : '#0a1740';
  const sub = light ? 'rgba(232,234,242,0.6)' : 'rgba(10, 23, 64, 0.55)';
  const markSize = compact ? 38 : 46;
  return (
    <div className="zg-logo-lockup" style={{ display: 'inline-flex', alignItems: 'center', gap: compact ? 12 : 14 }}>
      <span
        className="zg-logo-mark"
        style={{
          width: markSize,
          height: markSize,
          borderRadius: 10,
          overflow: 'hidden',
          flexShrink: 0,
          display: 'inline-flex',
          background: '#0f2f88',
          border: '1px solid rgba(255,255,255,0.22)',
          boxShadow: light ? '0 8px 24px rgba(5, 12, 40, 0.45)' : '0 8px 18px rgba(10, 23, 64, 0.22)',
        }}
      >
        <img
          src={zygomaLogo}
          alt="Zygoma Center logo"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center top',
            transform: 'scale(1.18)',
            transformOrigin: 'center 24%',
          }}
        />
      </span>
      <div style={{ lineHeight: 1.05, whiteSpace: 'nowrap' }}>
        <div
          className="zg-logo-name"
          style={{
            fontFamily: 'Manrope, sans-serif',
            fontWeight: 700,
            fontSize: compact ? 17 : 19,
            letterSpacing: '0.18em',
            color: main,
            textTransform: 'uppercase',
          }}
        >
          ZYGOMA CENTER
        </div>
        <div
          className="zg-logo-sub"
          style={{
            marginTop: 4,
            fontFamily: 'Playfair Display, serif',
            fontStyle: 'italic',
            fontSize: compact ? 12 : 13,
            color: sub,
          }}
        >
          by dr. Utegenov
        </div>
      </div>
      <style>{`
        @media (max-width: 480px) {
          .zg-logo-lockup .zg-logo-name { font-size: 13px !important; letter-spacing: 0.14em !important; }
          .zg-logo-lockup .zg-logo-sub  { font-size: 10px !important; }
          .zg-logo-lockup .zg-logo-mark { width: 32px !important; height: 32px !important; }
        }
      `}</style>
    </div>
  );
}

/* =========================
   Header
   ========================= */
function Header() {
  return (
    <header className="zg-header">
      <div
        className="zg-container"
        style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16 }}
      >
        <LogoLockup light />
        <div style={{ display: 'flex', gap: 10 }}>
          <a
            className="zg-btn zg-btn-ghost zg-hide-mobile"
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            <IconInstagram /> Instagram
          </a>
          <a className="zg-btn zg-btn-primary" href={`tel:${PHONE_TEL}`}>
            <IconPhone />
            <span className="zg-hide-mobile-inline">{PHONE_DISPLAY}</span>
            <span className="zg-show-mobile-inline">Позвонить</span>
          </a>
        </div>
      </div>
    </header>
  );
}

/* =========================
   Hero
   ========================= */
function Hero() {
  const heroRef = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;
    const onMove = (e) => {
      const rect = el.getBoundingClientRect();
      const dx = (e.clientX - (rect.left + rect.width / 2)) / rect.width;
      const dy = (e.clientY - (rect.top + rect.height / 2)) / rect.height;
      setTilt({ x: dx, y: dy });
    };
    el.addEventListener('mousemove', onMove);
    return () => el.removeEventListener('mousemove', onMove);
  }, []);

  return (
    <section
      ref={heroRef}
      className="zg-hero zg-grain"
      style={{ padding: 'clamp(140px, 18vw, 200px) 0 clamp(80px, 10vw, 120px)' }}
    >
      <div className="zg-stars" />
      <div className="zg-hero-glow gold" />
      <div className="zg-hero-glow blue" />

      {/* Decorative dental arches */}
      <svg
        aria-hidden="true"
        viewBox="0 0 800 800"
        style={{
          position: 'absolute',
          right: '-180px',
          bottom: '-180px',
          width: '720px',
          height: '720px',
          opacity: 0.18,
          pointerEvents: 'none',
        }}
      >
        <path
          d="M120 400 C 170 160, 630 160, 680 400 C 660 600, 460 700, 400 700 C 340 700, 140 600, 120 400 Z"
          stroke="#d4af6f"
          strokeWidth="1"
          fill="none"
        />
        <path
          d="M180 400 C 220 220, 580 220, 620 400 C 600 560, 460 640, 400 640 C 340 640, 200 560, 180 400 Z"
          stroke="#d4af6f"
          strokeWidth="1"
          fill="none"
        />
        <path
          d="M240 400 C 270 270, 530 270, 560 400 C 545 520, 460 580, 400 580 C 340 580, 255 520, 240 400 Z"
          stroke="#d4af6f"
          strokeWidth="1"
          fill="none"
        />
      </svg>

      <div className="zg-container" style={{ position: 'relative', zIndex: 2 }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 1.2fr) minmax(0, 1fr)',
            gap: 60,
            alignItems: 'center',
          }}
          className="zg-hero-grid"
        >
          {/* Text column */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
          >
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.7 } },
              }}
              className="zg-eyebrow"
            >
              Zygoma · Имплантация · Севоран · Астана
            </motion.div>

            <motion.h1
              variants={{
                hidden: { opacity: 0, y: 24 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.9 } },
              }}
              className="zg-display"
              style={{
                marginTop: 28,
                fontSize: 'clamp(40px, 6.4vw, 84px)',
                lineHeight: 1.02,
                color: '#fff',
              }}
            >
              Скуловая имплантация
              <br />
              там, где другие говорят{' '}
              <span style={{ fontStyle: 'italic', color: 'var(--zg-gold-2)' }}>«невозможно»</span>.
            </motion.h1>

            <motion.p
              variants={{
                hidden: { opacity: 0, y: 18 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.9 } },
              }}
              style={{
                marginTop: 28,
                maxWidth: 560,
                fontSize: 'clamp(16px, 1.4vw, 18px)',
                lineHeight: 1.65,
                color: 'var(--zg-text-soft)',
              }}
            >
              Zygoma Center by&nbsp;dr.&nbsp;Utegenov — центр семейной стоматологии и имплантации
              в&nbsp;Астане. Дентальная имплантация, скуловые импланты Zygoma и&nbsp;лечение во&nbsp;сне
              под&nbsp;«Севораном».
            </motion.p>

            <motion.div
              variants={{
                hidden: { opacity: 0, y: 14 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
              }}
              style={{ marginTop: 40, display: 'flex', flexWrap: 'wrap', gap: 12 }}
            >
              <MagneticBtn className="zg-btn zg-btn-primary" href={`tel:${PHONE_TEL}`}>
                <IconPhone />
                <span className="zg-hide-mobile-inline">Позвонить · {PHONE_DISPLAY}</span>
                <span className="zg-show-mobile-inline">Позвонить</span>
              </MagneticBtn>
              <MagneticBtn
                className="zg-btn zg-btn-wa"
                href={WHATSAPP_BOOK_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                <IconWhatsApp /> Запись в WhatsApp
              </MagneticBtn>
              <a
                className="zg-btn zg-btn-ghost"
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                <IconInstagram /> Instagram
              </a>
              <a
                className="zg-btn zg-btn-ghost"
                href={TWO_GIS_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                <IconPin /> Маршрут
              </a>
            </motion.div>

            <motion.div
              variants={{
                hidden: { opacity: 0 },
                visible: { opacity: 1, transition: { duration: 0.9, delay: 0.2 } },
              }}
              style={{
                marginTop: 44,
                display: 'flex',
                flexWrap: 'wrap',
                gap: 28,
                fontSize: 14,
                color: 'var(--zg-text-soft)',
              }}
            >
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 10 }}>
                <Stars />
                <strong style={{ color: '#fff', fontSize: 16 }}>{RATING}</strong>
                <span>· {REVIEWS_COUNT} отзывов в&nbsp;2ГИС</span>
              </span>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                <IconClock /> {HOURS_LINE}
              </span>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                <IconPin small /> {ADDRESS_LINE}
              </span>
            </motion.div>
          </motion.div>

          {/* Logo column with parallax */}
          <motion.div
            className="zg-hero-logo"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1, transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1] } }}
            style={{
              position: 'relative',
              aspectRatio: '1 / 1',
              transform: `perspective(1200px) rotateY(${tilt.x * -8}deg) rotateX(${tilt.y * 8}deg) translate3d(${tilt.x * 10}px, ${tilt.y * 10}px, 0)`,
              transition: 'transform 0.2s ease-out',
            }}
          >
            <div
              style={{
                position: 'absolute',
                inset: '6%',
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(212,175,111,0.35) 0%, transparent 65%)',
                filter: 'blur(40px)',
              }}
            />
            <svg
              viewBox="0 0 400 400"
              style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
              aria-hidden="true"
            >
              <g className="zg-logo-orbit" style={{ transformOrigin: 'center' }}>
                <circle
                  cx="200"
                  cy="200"
                  r="178"
                  fill="none"
                  stroke="rgba(212,175,111,0.35)"
                  strokeWidth="0.8"
                  strokeDasharray="2 8"
                />
              </g>
              <circle
                cx="200"
                cy="200"
                r="160"
                fill="none"
                stroke="rgba(255,255,255,0.12)"
                strokeWidth="1"
              />
            </svg>
            <div
              style={{
                position: 'absolute',
                inset: 0,
                display: 'grid',
                placeItems: 'center',
              }}
            >
              <div
                style={{
                  width: '62%',
                  aspectRatio: '1 / 1',
                  borderRadius: '50%',
                  background: 'linear-gradient(160deg, #142255 0%, #050c28 100%)',
                  display: 'grid',
                  placeItems: 'center',
                  border: '1px solid rgba(212,175,111,0.3)',
                  boxShadow: 'inset 0 0 60px rgba(212,175,111,0.08), 0 30px 80px -20px rgba(0,0,0,0.6)',
                }}
              >
                <div style={{ width: '60%', aspectRatio: '1 / 1', display: 'grid', placeItems: 'center' }}>
                  <BrandLogo size="100%" light drawStroke />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .zg-hero-grid { grid-template-columns: 1fr !important; gap: 48px !important; }
          .zg-hero-logo { max-width: 360px; margin: 0 auto; }
        }
      `}</style>
    </section>
  );
}

/* =========================
   Magnetic button — subtle pull on hover (desktop)
   ========================= */
function MagneticBtn({ children, className, ...rest }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    const onMove = (e) => {
      const rect = el.getBoundingClientRect();
      const dx = (e.clientX - (rect.left + rect.width / 2)) * 0.18;
      const dy = (e.clientY - (rect.top + rect.height / 2)) * 0.18;
      el.style.transform = `translate(${dx}px, ${dy}px)`;
    };
    const onLeave = () => { el.style.transform = ''; };
    el.addEventListener('mousemove', onMove);
    el.addEventListener('mouseleave', onLeave);
    return () => {
      el.removeEventListener('mousemove', onMove);
      el.removeEventListener('mouseleave', onLeave);
    };
  }, []);
  return (
    <a ref={ref} className={className} {...rest} style={{ transition: 'transform .25s ease' }}>
      {children}
    </a>
  );
}

/* =========================
   Marquee
   ========================= */
function Marquee() {
  const items = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS];
  return (
    <div className="zg-marquee" aria-hidden="true">
      <div className="zg-marquee-track">
        {items.map((item, i) => (
          <span key={i} className="zg-marquee-item">{item}</span>
        ))}
      </div>
    </div>
  );
}

/* =========================
   Trust strip
   ========================= */
function Trust() {
  const counterRef = useRef(null);
  const [animatedRating, setAnimatedRating] = useState(0);
  const [animatedReviews, setAnimatedReviews] = useState(0);

  useEffect(() => {
    if (!counterRef.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          const dur = 1500;
          const start = performance.now();
          const tick = (t) => {
            const p = Math.min(1, (t - start) / dur);
            const eased = 1 - Math.pow(1 - p, 3);
            setAnimatedRating(eased * 5);
            setAnimatedReviews(Math.round(eased * REVIEWS_COUNT));
            if (p < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
          observer.disconnect();
        }
      },
      { threshold: 0.4 },
    );
    observer.observe(counterRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="zg-trust" style={{ padding: '80px 0' }} ref={counterRef}>
      <div className="zg-container">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: 28,
          }}
        >
          {TRUST_POINTS.map((p, i) => (
            <motion.div
              key={p.value}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.7, delay: i * 0.06 }}
              style={{ borderLeft: '1px solid rgba(212,175,111,0.3)', paddingLeft: 22 }}
            >
              <div
                className="zg-display zg-big-num"
                style={{ fontSize: 'clamp(38px, 5vw, 56px)', lineHeight: 1 }}
              >
                {i === 0 ? animatedRating.toFixed(1) : p.value}
              </div>
              <div
                style={{
                  marginTop: 12,
                  fontSize: 11,
                  letterSpacing: '0.22em',
                  textTransform: 'uppercase',
                  color: 'var(--zg-gold)',
                }}
              >
                {p.sub}
              </div>
              <div style={{ marginTop: 6, fontSize: 14, color: 'var(--zg-text-soft)' }}>
                {i === 0 ? `${animatedReviews} оценок · 2ГИС` : p.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* =========================
   Services with tilt + cursor glow
   ========================= */
function TiltCard({ className, children, accent }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    const onMove = (e) => {
      const rect = el.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width;
      const py = (e.clientY - rect.top) / rect.height;
      const rx = (py - 0.5) * -6;
      const ry = (px - 0.5) * 6;
      el.style.transform = `perspective(800px) rotateX(${rx}deg) rotateY(${ry}deg)`;
      el.style.setProperty('--mx', `${px * 100}%`);
      el.style.setProperty('--my', `${py * 100}%`);
    };
    const onLeave = () => { el.style.transform = ''; };
    el.addEventListener('mousemove', onMove);
    el.addEventListener('mouseleave', onLeave);
    return () => {
      el.removeEventListener('mousemove', onMove);
      el.removeEventListener('mouseleave', onLeave);
    };
  }, []);
  return (
    <div
      ref={ref}
      className={`zg-card ${accent ? 'zg-card-accent' : ''} ${className || ''}`}
      style={{ transition: 'transform .3s ease, border-color .35s ease, box-shadow .35s ease, background .35s ease' }}
    >
      {children}
    </div>
  );
}

function Services() {
  return (
    <section className="zg-section">
      <div className="zg-container">
        <div style={{ maxWidth: 760 }}>
          <div className="zg-eyebrow">Направления</div>
          <h2
            className="zg-display"
            style={{
              marginTop: 18,
              fontSize: 'clamp(34px, 5vw, 60px)',
              lineHeight: 1.05,
              color: '#fff',
            }}
          >
            Комплексное лечение —{' '}
            <span style={{ fontStyle: 'italic', color: 'var(--zg-gold-2)' }}>
              от&nbsp;гигиены до&nbsp;имплантации Zygoma.
            </span>
          </h2>
          <p style={{ marginTop: 18, color: 'var(--zg-text-soft)', fontSize: 17, lineHeight: 1.65 }}>
            Перечень и&nbsp;стоимость каждой процедуры обсуждаются на&nbsp;бесплатной консультации
            после осмотра.
          </p>
        </div>

        <div
          style={{
            marginTop: 56,
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: 18,
          }}
        >
          {SERVICES.map((s, i) => (
            <motion.div
              key={s.key}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.7, delay: i * 0.05 }}
            >
              <TiltCard accent={s.accent}>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: 12,
                  }}
                >
                  <ServiceIcon kind={s.key} accent={s.accent} />
                  <span
                    style={{
                      fontSize: 11,
                      letterSpacing: '0.18em',
                      textTransform: 'uppercase',
                      color: s.accent ? 'var(--zg-gold-2)' : 'var(--zg-text-muted)',
                    }}
                  >
                    {s.tag}
                  </span>
                </div>
                <h3 className="zg-display" style={{ marginTop: 22, fontSize: 24, lineHeight: 1.2, color: '#fff' }}>
                  {s.title}
                </h3>
                <p
                  style={{
                    marginTop: 12,
                    fontSize: 15,
                    lineHeight: 1.6,
                    color: 'var(--zg-text-soft)',
                  }}
                >
                  {s.body}
                </p>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* =========================
   Process / 5 steps
   ========================= */
function Process() {
  return (
    <section className="zg-section" style={{ paddingTop: 0 }}>
      <div className="zg-container">
        <div style={{ maxWidth: 720 }}>
          <div className="zg-eyebrow">Как проходит лечение</div>
          <h2
            className="zg-display"
            style={{
              marginTop: 18,
              fontSize: 'clamp(32px, 4.5vw, 52px)',
              lineHeight: 1.05,
              color: '#fff',
            }}
          >
            5&nbsp;шагов — от&nbsp;первой&nbsp;заявки до&nbsp;контрольного&nbsp;визита.
          </h2>
        </div>
        <div
          style={{
            marginTop: 56,
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: 20,
          }}
        >
          {TREATMENT_STEPS.map((s, i) => (
            <motion.div
              key={s.n}
              className="zg-step"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.7, delay: i * 0.06 }}
            >
              <span className="zg-step-num">{s.n}</span>
              <h4 className="zg-display" style={{ marginTop: 18, fontSize: 22, color: '#fff' }}>
                {s.title}
              </h4>
              <p style={{ marginTop: 10, fontSize: 14, lineHeight: 1.55, color: 'var(--zg-text-soft)' }}>
                {s.body}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* =========================
   Pricing
   ========================= */
function Pricing() {
  return (
    <section className="zg-section zg-section-light">
      <div className="zg-container">
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            gap: 24,
            flexWrap: 'wrap',
          }}
        >
          <div style={{ maxWidth: 600 }}>
            <div className="zg-eyebrow">Стоимость</div>
            <h2
              className="zg-display"
              style={{
                marginTop: 18,
                fontSize: 'clamp(30px, 4.5vw, 50px)',
                lineHeight: 1.05,
                color: '#0a1740',
              }}
            >
              Прозрачно. Без неожиданных строк&nbsp;в&nbsp;счёте.
            </h2>
          </div>
          <p style={{ maxWidth: 380, color: 'rgba(10, 23, 64, 0.65)', fontSize: 15, lineHeight: 1.6 }}>
            Точную стоимость рассчитываем после осмотра — никакого «приём по&nbsp;картинке».
          </p>
        </div>

        <div
          style={{
            marginTop: 48,
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: 18,
          }}
        >
          {PRICING.map((p, i) => (
            <motion.div
              key={p.title}
              className={`zg-price-card ${p.highlight ? 'is-highlight' : ''}`}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, delay: i * 0.05 }}
              style={{ background: p.highlight ? undefined : '#fff', color: p.highlight ? '#1a1208' : '#0a1740' }}
            >
              <div
                style={{
                  fontSize: 12,
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color: p.highlight ? 'rgba(26,18,8,0.6)' : 'var(--zg-gold-deep)',
                }}
              >
                {p.highlight ? 'Бесплатно для пациента' : 'Услуга'}
              </div>
              <div
                className="zg-display"
                style={{ marginTop: 14, fontSize: 26, lineHeight: 1.15 }}
              >
                {p.title}
              </div>
              <div
                style={{
                  marginTop: 18,
                  fontSize: 32,
                  fontWeight: 700,
                  fontFamily: 'Manrope, sans-serif',
                }}
              >
                {p.price}
              </div>
              <div
                style={{
                  marginTop: 12,
                  fontSize: 14,
                  lineHeight: 1.6,
                  color: p.highlight ? 'rgba(26,18,8,0.7)' : 'rgba(10, 23, 64, 0.65)',
                }}
              >
                {p.note}
              </div>
            </motion.div>
          ))}
        </div>

        <div style={{ marginTop: 40, display: 'flex', flexWrap: 'wrap', gap: 12 }}>
          <a className="zg-btn zg-btn-primary" href={`tel:${PHONE_TEL}`}>
            <IconPhone /> Записаться на консультацию
          </a>
          <a
            className="zg-btn zg-btn-wa"
            href={WHATSAPP_BOOK_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            <IconWhatsApp /> Написать в WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}

/* =========================
   Reviews / trust block
   ========================= */
function Reviews() {
  return (
    <section className="zg-section">
      <div className="zg-container">
        <div
          style={{
            display: 'grid',
            gap: 48,
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            alignItems: 'center',
          }}
        >
          <div>
            <div className="zg-eyebrow">Доверие пациентов</div>
            <h2
              className="zg-display"
              style={{
                marginTop: 18,
                fontSize: 'clamp(34px, 5vw, 60px)',
                lineHeight: 1.05,
                color: '#fff',
              }}
            >
              <span className="zg-big-num" style={{ fontSize: 'clamp(60px, 8vw, 110px)', display: 'block', lineHeight: 0.9 }}>
                {RATING}
              </span>
              <span style={{ fontSize: 'clamp(20px, 2vw, 24px)', color: 'var(--zg-text-soft)', fontStyle: 'italic' }}>
                из&nbsp;{REVIEWS_COUNT} оценок в&nbsp;2ГИС
              </span>
            </h2>
            <p
              style={{
                marginTop: 22,
                color: 'var(--zg-text-soft)',
                fontSize: 16,
                maxWidth: 540,
                lineHeight: 1.65,
              }}
            >
              Пациенты отмечают центр в&nbsp;2ГИС — от&nbsp;первичной консультации до сложных
              имплантационных кейсов. Чтобы прочитать отзывы целиком, перейдите на&nbsp;карточку центра.
            </p>
            <div style={{ marginTop: 28, display: 'flex', flexWrap: 'wrap', gap: 12 }}>
              <a className="zg-btn zg-btn-outline-gold" href={TWO_GIS_URL} target="_blank" rel="noopener noreferrer">
                Открыть 2ГИС
              </a>
              <a className="zg-btn zg-btn-ghost" href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer">
                <IconInstagram /> Instagram
              </a>
            </div>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: 14,
            }}
          >
            {[
              { label: 'Внимательное отношение', sub: 'к каждому пациенту' },
              { label: 'Сложные случаи', sub: 'Zygoma и имплантация' },
              { label: 'Чистота и комфорт', sub: 'современный центр' },
              { label: 'Семейная стоматология', sub: 'для взрослых и детей' },
            ].map((c) => (
              <div key={c.label} className="zg-card" style={{ padding: 22 }}>
                <Stars />
                <div className="zg-display" style={{ marginTop: 14, fontSize: 20, lineHeight: 1.2, color: '#fff' }}>
                  {c.label}
                </div>
                <div style={{ marginTop: 6, color: 'var(--zg-text-muted)', fontSize: 13 }}>{c.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* =========================
   Socials
   ========================= */
function Socials() {
  return (
    <section className="zg-section" style={{ paddingTop: 0 }}>
      <div className="zg-container">
        <div style={{ maxWidth: 720 }}>
          <div className="zg-eyebrow">Подписывайтесь</div>
          <h2
            className="zg-display"
            style={{
              marginTop: 18,
              fontSize: 'clamp(28px, 4vw, 44px)',
              lineHeight: 1.1,
              color: '#fff',
            }}
          >
            Кейсы, ответы на&nbsp;вопросы и&nbsp;жизнь центра — в&nbsp;соцсетях.
          </h2>
        </div>

        <div
          style={{
            marginTop: 36,
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: 14,
          }}
        >
          {SOCIALS.map((s) => (
            <a
              key={s.key}
              className="zg-social"
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span
                className="zg-social-icon"
                style={{ background: socialBg(s.key), color: socialFg(s.key) }}
              >
                <SocialIcon kind={s.key} />
              </span>
              <span style={{ display: 'flex', flexDirection: 'column', minWidth: 0 }}>
                <span style={{ fontWeight: 600, fontSize: 15, color: '#fff' }}>{s.label}</span>
                <span
                  style={{
                    marginTop: 4,
                    fontSize: 13,
                    color: 'var(--zg-text-muted)',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {s.handle}
                </span>
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function socialBg(kind) {
  switch (kind) {
    case 'instagram': return 'linear-gradient(135deg, #f58529, #dd2a7b 45%, #8134af 80%, #515bd4)';
    case 'tiktok': return 'linear-gradient(135deg, #000 0%, #25f4ee 50%, #fe2c55 100%)';
    case 'threads': return '#000';
    case 'telegram': return 'linear-gradient(135deg, #2aabee, #229ed9)';
    default: return 'rgba(255,255,255,0.06)';
  }
}
function socialFg() { return '#fff'; }

/* =========================
   Contacts
   ========================= */
function Contacts() {
  return (
    <section className="zg-section" style={{ paddingTop: 0 }}>
      <div className="zg-container">
        <div
          style={{
            display: 'grid',
            gap: 48,
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            alignItems: 'start',
          }}
        >
          <div>
            <div className="zg-eyebrow">Контакты</div>
            <h2
              className="zg-display"
              style={{
                marginTop: 18,
                fontSize: 'clamp(30px, 4vw, 46px)',
                lineHeight: 1.05,
                color: '#fff',
              }}
            >
              Запишитесь сегодня — консультация бесплатна.
            </h2>
            <p
              style={{
                marginTop: 16,
                color: 'var(--zg-text-soft)',
                fontSize: 16,
                lineHeight: 1.6,
              }}
            >
              Удобнее всего позвонить или написать в&nbsp;WhatsApp / Telegram. Ответим в&nbsp;часы
              работы центра.
            </p>

            <div style={{ marginTop: 28, display: 'flex', flexWrap: 'wrap', gap: 10 }}>
              <a className="zg-btn zg-btn-primary" href={`tel:${PHONE_TEL}`}>
                <IconPhone /> {PHONE_DISPLAY}
              </a>
              <a className="zg-btn zg-btn-wa" href={WHATSAPP_BOOK_URL} target="_blank" rel="noopener noreferrer">
                <IconWhatsApp /> WhatsApp
              </a>
              <a className="zg-btn zg-btn-ghost" href={TELEGRAM_URL} target="_blank" rel="noopener noreferrer">
                <IconTelegram /> Telegram
              </a>
              <a className="zg-btn zg-btn-ghost" href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer">
                <IconInstagram /> Instagram
              </a>
            </div>
          </div>

          <div className="zg-card" style={{ padding: 32 }}>
            <ContactRow icon={<IconPin />} label="Адрес" value={ADDRESS_LINE} href={TWO_GIS_URL} external />
            <Divider />
            <ContactRow icon={<IconClock />} label="Часы работы" value={HOURS_LINE} />
            <Divider />
            <ContactRow icon={<IconPhone />} label="Телефон" value={PHONE_DISPLAY} href={`tel:${PHONE_TEL}`} />
            <Divider />
            <ContactRow icon={<IconMail />} label="E-mail" value={EMAIL} href={`mailto:${EMAIL}`} />
            <Divider />
            <ContactRow icon={<IconPin small />} label="Маршрут" value="Открыть в 2ГИС" href={TWO_GIS_URL} external />
          </div>
        </div>
      </div>
    </section>
  );
}

function ContactRow({ icon, label, value, href, external }) {
  const content = (
    <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
      <span
        style={{
          width: 42, height: 42,
          borderRadius: 12,
          display: 'grid', placeItems: 'center',
          background: 'rgba(212, 175, 111, 0.12)',
          color: 'var(--zg-gold-2)',
          flexShrink: 0,
        }}
      >
        {icon}
      </span>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div
          style={{
            fontSize: 11,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: 'var(--zg-text-muted)',
          }}
        >
          {label}
        </div>
        <div
          style={{
            marginTop: 4,
            fontSize: 16,
            color: '#fff',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          {value}
        </div>
      </div>
    </div>
  );
  if (href) {
    return (
      <a
        href={href}
        target={external ? '_blank' : undefined}
        rel={external ? 'noopener noreferrer' : undefined}
        style={{ display: 'block', padding: '14px 0', textDecoration: 'none', color: 'inherit' }}
      >
        {content}
      </a>
    );
  }
  return <div style={{ padding: '14px 0' }}>{content}</div>;
}

function Divider() {
  return <div style={{ height: 1, background: 'var(--zg-line)' }} />;
}

/* =========================
   Footer
   ========================= */
function Footer() {
  return (
    <>
      <div className="zg-disclaimer">
        <div className="zg-container" style={{ padding: '20px 20px' }}>
          Это демонстрационная страница, подготовленная BeeEye. Она не является официальным сайтом
          компании до подтверждения владельцем.
        </div>
      </div>
      <footer className="zg-footer" style={{ padding: '40px 0' }}>
        <div
          className="zg-container"
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 24,
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <LogoLockup light compact />
          <div style={{ display: 'flex', gap: 18, fontSize: 14, flexWrap: 'wrap' }}>
            <a href={`tel:${PHONE_TEL}`}>{PHONE_DISPLAY}</a>
            <a href={WHATSAPP_BOOK_URL} target="_blank" rel="noopener noreferrer">WhatsApp</a>
            <a href={TELEGRAM_URL} target="_blank" rel="noopener noreferrer">Telegram</a>
            <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer">Instagram</a>
            <a href={TIKTOK_URL} target="_blank" rel="noopener noreferrer">TikTok</a>
            <a href={THREADS_URL} target="_blank" rel="noopener noreferrer">Threads</a>
            <a href={TWO_GIS_URL} target="_blank" rel="noopener noreferrer">2ГИС</a>
          </div>
        </div>
        <div
          className="zg-container"
          style={{
            marginTop: 24,
            paddingTop: 18,
            borderTop: '1px solid rgba(255,255,255,0.08)',
            fontSize: 12,
            color: 'rgba(232,234,242,0.45)',
          }}
        >
          © {new Date().getFullYear()} Zygoma Center by dr. Utegenov · Сайт-демо by{' '}
          <a href="/" style={{ color: 'var(--zg-gold-2)' }}>BeeEye</a>
        </div>
      </footer>
    </>
  );
}

function MobileCTA() {
  return (
    <div className="zg-mobile-bar" role="navigation" aria-label="Быстрые действия">
      <a className="zg-mb-call" href={`tel:${PHONE_TEL}`}>
        <IconPhone /> Позвонить
      </a>
      <a className="zg-mb-wa" href={WHATSAPP_BOOK_URL} target="_blank" rel="noopener noreferrer">
        <IconWhatsApp /> WhatsApp
      </a>
      <a className="zg-mb-route" href={TWO_GIS_URL} target="_blank" rel="noopener noreferrer">
        <IconPin /> Маршрут
      </a>
    </div>
  );
}

/* =========================
   Icons
   ========================= */
function IconPhone() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92V21a1 1 0 0 1-1.11 1A19.86 19.86 0 0 1 2 4.11 1 1 0 0 1 3 3h4.09a1 1 0 0 1 1 .75l1.13 4.52a1 1 0 0 1-.27 1L7.21 11.21a16 16 0 0 0 6 6l1.94-1.74a1 1 0 0 1 1-.27l4.52 1.13a1 1 0 0 1 .75 1z" />
    </svg>
  );
}
function IconWhatsApp() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.52 3.48A11.94 11.94 0 0 0 12 0C5.37 0 0 5.37 0 12c0 2.12.55 4.12 1.6 5.92L0 24l6.27-1.64A11.94 11.94 0 0 0 12 24c6.63 0 12-5.37 12-12 0-3.2-1.25-6.21-3.48-8.52ZM12 21.82c-1.86 0-3.66-.5-5.24-1.45l-.37-.22-3.72.97.99-3.62-.24-.38A9.78 9.78 0 0 1 2.18 12C2.18 6.59 6.59 2.18 12 2.18c2.62 0 5.08 1.02 6.93 2.87A9.74 9.74 0 0 1 21.82 12c0 5.41-4.41 9.82-9.82 9.82Zm5.41-7.34c-.3-.15-1.78-.88-2.06-.98-.28-.1-.48-.15-.68.15-.2.3-.78.98-.96 1.18-.18.2-.35.22-.65.07-.3-.15-1.27-.47-2.42-1.5-.9-.8-1.5-1.78-1.68-2.08-.18-.3-.02-.46.13-.6.13-.13.3-.35.45-.52.15-.18.2-.3.3-.5.1-.2.05-.38-.02-.53-.08-.15-.68-1.65-.93-2.27-.25-.6-.5-.52-.68-.53-.18-.01-.38-.01-.58-.01-.2 0-.53.07-.8.38-.27.3-1.05 1.03-1.05 2.5s1.07 2.9 1.22 3.1c.15.2 2.13 3.27 5.18 4.58.72.31 1.28.5 1.72.64.72.23 1.38.2 1.9.12.58-.09 1.78-.73 2.03-1.43.25-.7.25-1.3.18-1.43-.07-.13-.27-.2-.57-.35Z"/>
    </svg>
  );
}
function IconInstagram() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}
function IconTelegram() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M9.78 15.27 9.6 19.7c.36 0 .52-.16.7-.34l1.7-1.62 3.52 2.58c.65.36 1.12.17 1.29-.6L21.7 4.6c.22-.95-.34-1.32-1-1.07L2.46 10.5c-.93.36-.92.88-.16 1.12l4.66 1.45 10.83-6.83c.5-.32.96-.14.58.18Z" />
    </svg>
  );
}
function IconTikTok() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5.8 20.1a6.34 6.34 0 0 0 10.86-4.43V8.59a8.16 8.16 0 0 0 4.77 1.52v-3.5a4.85 4.85 0 0 1-1.84-.42Z"/>
    </svg>
  );
}
function IconThreads() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.66 11.21c-.08-.04-.16-.07-.24-.1-.14-2.65-1.59-4.18-4.02-4.19h-.04c-1.45 0-2.66.62-3.41 1.75l1.34.92c.55-.83 1.42-1 2.07-1h.02c.81 0 1.43.24 1.83.7.29.34.49.81.59 1.4-.74-.13-1.55-.17-2.4-.13-2.41.14-3.96 1.55-3.85 3.5.05.99.55 1.84 1.39 2.4.71.47 1.62.7 2.57.65 1.25-.07 2.23-.55 2.92-1.42.52-.66.85-1.51.99-2.59.59.36 1.02.83 1.27 1.39.41.96.43 2.53-.85 3.81-1.12 1.12-2.46 1.6-4.5 1.62-2.27-.02-3.99-.75-5.11-2.16-1.05-1.32-1.59-3.23-1.61-5.69.02-2.46.56-4.37 1.61-5.69 1.12-1.41 2.84-2.14 5.11-2.16 2.28.02 4.03.75 5.21 2.18.58.7 1.02 1.59 1.31 2.62l1.59-.42c-.35-1.27-.91-2.36-1.66-3.27C17.66 1.92 15.51 1.02 12.79 1h-.01c-2.71.02-4.83.92-6.29 2.68C5.12 5.24 4.45 7.5 4.42 10.39v.04c.03 2.89.7 5.15 2.07 6.71 1.46 1.76 3.58 2.66 6.29 2.68h.01c2.41-.02 4.11-.65 5.51-2.05 1.83-1.83 1.78-4.13 1.17-5.54-.43-1.01-1.25-1.83-2.36-2.4z"/>
    </svg>
  );
}
function IconPin({ small }) {
  const s = small ? 14 : 16;
  return (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}
function IconClock() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}
function IconMail() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  );
}

function SocialIcon({ kind }) {
  if (kind === 'instagram') return <IconInstagram />;
  if (kind === 'tiktok') return <IconTikTok />;
  if (kind === 'threads') return <IconThreads />;
  if (kind === 'telegram') return <IconTelegram />;
  return null;
}

function Stars() {
  return (
    <span style={{ display: 'inline-flex', gap: 2, color: 'var(--zg-gold-2)' }}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      ))}
    </span>
  );
}

function ServiceIcon({ kind, accent }) {
  const stroke = accent ? '#ecc88a' : '#d4af6f';
  const bg = accent ? 'rgba(212, 175, 111, 0.18)' : 'rgba(212, 175, 111, 0.1)';
  return (
    <span
      style={{
        display: 'grid', placeItems: 'center',
        width: 54, height: 54,
        borderRadius: 14,
        background: bg,
        border: '1px solid rgba(212, 175, 111, 0.25)',
      }}
    >
      {kind === 'zygoma' && <ZygomaMark stroke={stroke} />}
      {kind === 'implants' && <ImplantMark stroke={stroke} />}
      {kind === 'sedation' && <SedationMark stroke={stroke} />}
      {kind === 'family' && <FamilyMark stroke={stroke} />}
      {kind === 'consult' && <ChatMark stroke={stroke} />}
      {kind === 'plan' && <PlanMark stroke={stroke} />}
    </span>
  );
}

function ZygomaMark({ stroke }) {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 4 L19 4 L7 12 L19 12 L9 20" />
      <circle cx="12" cy="12" r="9" strokeOpacity="0.4" />
    </svg>
  );
}
function ImplantMark({ stroke }) {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 3h6l-1 4h-4z" />
      <path d="M10 7h4v3h-4z" />
      <path d="M11 10h2v3h-2z" />
      <path d="M12 13l.5 8" />
      <path d="M9 8h6M9.5 11h5" />
    </svg>
  );
}
function SedationMark({ stroke }) {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}
function FamilyMark({ stroke }) {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="9" cy="7" r="3" />
      <circle cx="17" cy="9" r="2" />
      <path d="M3 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2" />
      <path d="M16 21v-1a3 3 0 0 1 3-3 3 3 0 0 1 3 3v1" />
    </svg>
  );
}
function ChatMark({ stroke }) {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  );
}
function PlanMark({ stroke }) {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="9" y1="13" x2="15" y2="13" />
      <line x1="9" y1="17" x2="13" y2="17" />
    </svg>
  );
}
