import React, { useEffect, useMemo, useState } from 'react';
import { motion, useReducedMotion, useScroll, useSpring } from 'framer-motion';
import './styles.css';
import logoUrl from './assets/logo.jpg';
import {
  CLINIC_NAME,
  TAGLINE,
  CITY,
  LICENSE,
  INSTAGRAM_URL,
  THREADS_URL,
  BRANCHES,
  HIGHLIGHTS,
  BENEFITS,
  SERVICES,
  STATS,
  REVIEW_THEMES,
  PROBLEM_MATCHES,
  PRICING,
} from './data.js';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

function useLandingMeta() {
  useEffect(() => {
    const prevTitle = document.title;
    const meta = document.querySelector('meta[name="description"]');
    const prevDesc = meta?.getAttribute('content') ?? null;

    document.title = 'Liberty Stom — премиальные стоматологии в Астане';
    if (meta) {
      meta.setAttribute(
        'content',
        'Liberty Stom — сеть стоматологий в Астане: 3 филиала, лечение во сне «Севоран», импланты, брекеты, детская и взрослая стоматология.',
      );
    }

    return () => {
      document.title = prevTitle;
      if (meta && prevDesc != null) meta.setAttribute('content', prevDesc);
    };
  }, []);
}

function useGoogleFonts() {
  useEffect(() => {
    const links = [];
    const add = (href) => {
      const l = document.createElement('link');
      l.rel = 'stylesheet';
      l.href = href;
      document.head.appendChild(l);
      links.push(l);
    };
    add('https://fonts.googleapis.com/css2?family=Marcellus&family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400&family=Inter:wght@400;500;600;700;800&display=swap');
    return () => {
      links.forEach((l) => l.parentNode && l.parentNode.removeChild(l));
    };
  }, []);
}

export default function LibertyStomLanding() {
  useLandingMeta();
  useGoogleFonts();
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 24, mass: 0.25 });

  return (
    <div className="liberty-root">
      <motion.div className="ls-progress" style={{ scaleX }} aria-hidden="true" />
      <Header />
      <main>
        <Hero reduceMotion={reduceMotion} />
        <Marquee />
        <Highlights />
        <Benefits />
        <Branches />
        <ProblemMatcher />
        <Services />
        <Pricing />
        <Severan />
        <Trust />
        <FinalCTA />
      </main>
      <Footer />
      <MobileCTA />
      <div className="ls-mobile-safe" aria-hidden="true" />
    </div>
  );
}

/* ----- Header ----- */
function Header() {
  return (
    <header className="ls-header">
      <div className="ls-container ls-header__inner">
        <a className="ls-brand" href="/liberty-stom" aria-label={CLINIC_NAME}>
          <span className="ls-brand__logo">
            <img src={logoUrl} alt={CLINIC_NAME} />
          </span>
          <span className="ls-brand__txt">
            <strong>LIBERTY STOM</strong>
            <small>{TAGLINE}</small>
          </span>
        </a>
        <nav className="ls-nav" aria-label="Навигация">
          <a href="#branches">Филиалы</a>
          <a href="#services">Услуги</a>
          <a href="#prices">Цены</a>
          <a href="#severan">Лечение во сне</a>
          <a href="#contacts">Контакты</a>
        </nav>
        <div className="ls-header__actions">
          <a className="ls-btn ls-btn--ghost ls-btn--small" href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer">
            <IconInstagram /> Instagram
          </a>
          <a className="ls-btn ls-btn--gold ls-btn--small" href="#branches">
            <IconBranch /> Выбрать филиал
          </a>
        </div>
      </div>
    </header>
  );
}

/* ----- Hero ----- */
function Hero({ reduceMotion }) {
  return (
    <section className="ls-hero" id="top">
      <div className="ls-hero__mesh" aria-hidden="true" />
      <motion.div
        className="ls-container ls-hero__grid"
        initial="hidden"
        animate="visible"
        variants={stagger}
      >
        <motion.div variants={fadeUp}>
          <p className="ls-eyebrow"><span /> Премиальная стоматология · {CITY}</p>
          <h1>
            Liberty Stom.<br />
            <em>Гарантия</em> вашей улыбки.
          </h1>
          <p className="ls-lead">
            Сеть из трёх стоматологий в Астане: дентальная имплантация, брекеты, лечение во сне под газом «Севоран», детская и взрослая стоматология.
          </p>
          <div className="ls-hero__cta">
            <a className="ls-btn ls-btn--whatsapp" href={BRANCHES[0].whatsapp} target="_blank" rel="noopener noreferrer">
              <IconWhatsApp /> Записаться в WhatsApp
            </a>
            <a className="ls-btn ls-btn--gold" href={`tel:${BRANCHES[0].phoneTel}`}>
              <IconPhone /> Позвонить
            </a>
            <a className="ls-btn ls-btn--ghost" href="#branches">
              <IconBranch /> Выбрать филиал
            </a>
            <a className="ls-btn ls-btn--instagram" href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer">
              <IconInstagram /> Instagram
            </a>
          </div>
          <div className="ls-hero__chips" aria-label="Ключевые направления">
            <span className="ls-chip">Севоран · 15 000 ₸</span>
            <span className="ls-chip">Импланты · от 70 000 ₸</span>
            <span className="ls-chip">Брекеты · 89 990 ₸</span>
            <span className="ls-chip">Консультация · 0 ₸</span>
          </div>
          <div className="ls-hero__meta">
            <div>
              <strong>3 филиала</strong>
              <span>Левый берег · Сарайшык · Байтурсынова</span>
            </div>
            <div>
              <strong>{LICENSE}</strong>
              <span>Медицинская лицензия</span>
            </div>
            <div>
              <strong>1 450+</strong>
              <span>оценок в 2GIS по всем филиалам</span>
            </div>
          </div>
        </motion.div>

        <motion.div className="ls-hero__visual" variants={fadeUp}>
          <div className="ls-medallion" aria-hidden="true">
            <span className="ls-medallion__halo" />
            <span className="ls-medallion__ring" />
            {!reduceMotion && (
              <>
                <span className="ls-medallion__sparkle ls-medallion__sparkle--1" />
                <span className="ls-medallion__sparkle ls-medallion__sparkle--2" />
                <span className="ls-medallion__sparkle ls-medallion__sparkle--3" />
                <span className="ls-medallion__sparkle ls-medallion__sparkle--4" />
              </>
            )}
            <div className="ls-medallion__core">
              <img src={logoUrl} alt="" />
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ----- Marquee strip ----- */
function Marquee() {
  const items = [
    'Севоран · лечение во сне',
    'Импланты Корея · от 70 000 ₸',
    'Брекеты на 2 челюсти · 89 990 ₸',
    'Консультация бесплатно',
    'Детская стоматология',
    'Лицензия №000735',
    '3 филиала в Астане',
  ];
  const track = [...items, ...items];
  return (
    <div className="ls-marquee" aria-hidden="true">
      <div className="ls-marquee__track">
        {track.map((t, i) => (
          <span key={i}>{t}</span>
        ))}
      </div>
    </div>
  );
}

/* ----- Highlights ----- */
function Highlights() {
  return (
    <section className="ls-section">
      <div className="ls-container">
        <SectionIntro
          eyebrow="Акции и условия"
          title="Понятные стартовые предложения"
          text="Цены и акции взяты из карточек филиалов в 2GIS и Instagram клиники. Точную стоимость по конкретному случаю утверждает врач после диагностики."
        />
        <motion.div
          className="ls-highlights"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={stagger}
        >
          {HIGHLIGHTS.map((h) => (
            <motion.article className="ls-highlight" key={h.title} variants={fadeUp}>
              <span className="ls-highlight__tag">{h.tag}</span>
              <h3>{h.title}</h3>
              <p>{h.body}</p>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ----- Benefits ----- */
function Benefits() {
  return (
    <section className="ls-section ls-section--soft">
      <div className="ls-container">
        <SectionIntro
          eyebrow="Почему Liberty Stom"
          title="Премиальный подход без лишнего пафоса"
        />
        <motion.div
          className="ls-benefits"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={stagger}
        >
          {BENEFITS.map((b, idx) => (
            <motion.article
              className="ls-benefit"
              key={b.title}
              variants={fadeUp}
              onMouseMove={(e) => {
                const r = e.currentTarget.getBoundingClientRect();
                e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`);
                e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`);
              }}
            >
              <span className="ls-benefit__num">{String(idx + 1).padStart(2, '0')}</span>
              <h3>{b.title}</h3>
              <p>{b.body}</p>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ----- Branches ----- */
function Branches() {
  return (
    <section className="ls-section" id="branches">
      <div className="ls-container">
        <SectionIntro
          eyebrow="Филиалы"
          title="Выберите ближайший филиал"
          text="Один Instagram, три удобные точки в городе. Запись по WhatsApp или звонком. Маршруты — в 2GIS."
        />
        <motion.div
          className="ls-branches"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={stagger}
        >
          {BRANCHES.map((b) => (
            <motion.article className="ls-branch" key={b.id} variants={fadeUp}>
              <div className="ls-branch__head">
                <h3 className="ls-branch__name">{b.name}</h3>
                <div className="ls-branch__rating">
                  <strong>★ {b.rating}</strong>
                  <small>{b.reviews} оценок · 2GIS</small>
                </div>
              </div>
              <div className="ls-branch__row">
                <IconRoute />
                <span><strong>Адрес: </strong>{b.addressFull}</span>
              </div>
              <div className="ls-branch__row">
                <IconClock />
                <span><strong>Режим: </strong>{b.hours}</span>
              </div>
              <div className="ls-branch__row">
                <IconPhone />
                <a href={`tel:${b.phoneTel}`}><strong>{b.phoneDisplay}</strong></a>
              </div>
              <div className="ls-branch__actions">
                <a className="ls-btn ls-btn--gold" href={`tel:${b.phoneTel}`}>
                  <IconPhone /> Позвонить
                </a>
                <a className="ls-btn ls-btn--whatsapp" href={b.whatsapp} target="_blank" rel="noopener noreferrer">
                  <IconWhatsApp /> WhatsApp
                </a>
                <a className="ls-btn ls-btn--map" href={b.twoGisRoute} target="_blank" rel="noopener noreferrer">
                  <IconMap /> Маршрут
                </a>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ----- Problem Matcher ----- */
function ProblemMatcher() {
  const [active, setActive] = useState(PROBLEM_MATCHES[0].label);
  const selected = useMemo(
    () => PROBLEM_MATCHES.find((p) => p.label === active) || PROBLEM_MATCHES[0],
    [active],
  );

  return (
    <section className="ls-section ls-section--soft">
      <div className="ls-container">
        <div className="ls-matcher__grid">
          <div>
            <p className="ls-eyebrow"><span /> Быстрый подбор</p>
            <h2 style={{
              margin: '12px 0 0',
              fontFamily: "'Marcellus', serif",
              fontWeight: 400,
              fontSize: 'clamp(32px, 4.4vw, 54px)',
              lineHeight: 1.05,
              letterSpacing: '-0.012em',
            }}>
              Что вас беспокоит — покажем, с чего начать
            </h2>
            <p style={{ margin: '18px 0 0', color: 'var(--ls-muted)', fontSize: 16, lineHeight: 1.6, maxWidth: 540 }}>
              Это не медицинская диагностика, а навигатор по услугам. Точный план лечения определяет врач после осмотра.
            </p>
            <div className="ls-matcher__chips" role="list">
              {PROBLEM_MATCHES.map((p) => (
                <button
                  key={p.label}
                  type="button"
                  className={p.label === active ? 'is-active' : ''}
                  onClick={() => setActive(p.label)}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>
          <motion.div
            key={selected.label}
            className="ls-matcher__result"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.28 }}
          >
            <span>Подходящий старт</span>
            <h3>{selected.title}</h3>
            <p>{selected.body}</p>
            <div className="ls-matcher__result__actions">
              <a className="ls-btn ls-btn--gold" href={BRANCHES[0].whatsapp} target="_blank" rel="noopener noreferrer">
                <IconWhatsApp /> {selected.cta}
              </a>
              <a className="ls-btn ls-btn--ghost" href={`tel:${BRANCHES[0].phoneTel}`}>
                <IconPhone /> Позвонить
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ----- Services ----- */
function Services() {
  return (
    <section className="ls-section" id="services">
      <div className="ls-container">
        <SectionIntro
          eyebrow="Направления"
          title="Полный спектр стоматологии — взрослым и детям"
        />
        <motion.div
          className="ls-services"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={stagger}
        >
          {SERVICES.map((s) => (
            <motion.article className="ls-service" key={s.title} variants={fadeUp}>
              <span className="ls-service__tag">{s.tag}</span>
              <h3>{s.title}</h3>
              <p>{s.body}</p>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ----- Pricing ----- */
function Pricing() {
  const [tab, setTab] = useState(PRICING[0].id);
  const current = useMemo(() => PRICING.find((p) => p.id === tab) || PRICING[0], [tab]);

  return (
    <section className="ls-section ls-section--soft" id="prices">
      <div className="ls-container">
        <SectionIntro
          eyebrow="Цены"
          title="Прозрачный прайс — без сюрпризов на приёме"
          text="Цены подтверждены и взяты из публичных источников клиники. Финальная стоимость рассчитывается после осмотра и диагностики."
        />
        <div className="ls-pricing__tabs" role="tablist" aria-label="Категории цен">
          {PRICING.map((p) => (
            <button
              key={p.id}
              type="button"
              role="tab"
              aria-selected={p.id === tab}
              className={p.id === tab ? 'is-active' : ''}
              onClick={() => setTab(p.id)}
            >
              {p.label}
            </button>
          ))}
        </div>
        <motion.div
          key={current.id}
          className="ls-pricing__list"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
        >
          {current.items.map((item) => (
            <article className="ls-pricing__item" key={item.title}>
              <div>
                <h4>{item.title}</h4>
                {item.note ? <small>{item.note}</small> : null}
              </div>
              <strong>{item.price}</strong>
            </article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ----- Severan banner ----- */
function Severan() {
  return (
    <section className="ls-section" id="severan">
      <div className="ls-container">
        <div className="ls-severan">
          <div className="ls-severan__grid">
            <div>
              <p className="ls-eyebrow"><span /> Лечение во сне</p>
              <h2>«Севоран» — спокойный приём для тех, кто переживает</h2>
              <p>
                Газ-анестетик «Севоран» помогает мягко перенести стоматологическое лечение детям и взрослым, для которых стандартный приём — стресс. Анестезию проводит врач-анестезиолог, лечение — параллельно.
              </p>
              <div className="ls-severan__price">
                <span style={{ color: 'var(--ls-muted)', fontSize: 13, letterSpacing: '0.14em', textTransform: 'uppercase', fontWeight: 800 }}>от</span>
                <strong>15 000 ₸</strong>
                <span style={{ color: 'var(--ls-muted)', fontSize: 13 }}>/ час анестезии</span>
              </div>
              <div className="ls-severan__cta">
                <a className="ls-btn ls-btn--gold" href={BRANCHES[0].whatsapp} target="_blank" rel="noopener noreferrer">
                  <IconWhatsApp /> Узнать в WhatsApp
                </a>
                <a className="ls-btn ls-btn--ghost" href={`tel:${BRANCHES[0].phoneTel}`}>
                  <IconPhone /> Позвонить
                </a>
              </div>
            </div>
            <div className="ls-severan__visual" aria-hidden="true">
              <div className="ls-pulse">
                <IconTooth />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ----- Trust ----- */
function Trust() {
  return (
    <section className="ls-section">
      <div className="ls-container">
        <SectionIntro
          eyebrow="Доверие"
          title="Цифры и темы из реальных отзывов в 2GIS"
        />
        <div className="ls-trust">
          <div className="ls-trust__stats">
            {STATS.map((s) => (
              <div key={s.label}>
                <strong>{s.value}</strong>
                <span>{s.label}</span>
                <small>{s.sub}</small>
              </div>
            ))}
          </div>
          <div className="ls-trust__themes">
            <p style={{
              borderBottom: '1px solid var(--ls-line-soft)',
              padding: '0 0 14px',
              fontFamily: "'Marcellus', serif",
              fontSize: 18,
              color: 'var(--ls-gold-2)',
              fontWeight: 400,
            }}>
              Что отмечают пациенты:
            </p>
            {REVIEW_THEMES.map((t) => (
              <p key={t}>{t}</p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ----- Final CTA ----- */
function FinalCTA() {
  return (
    <section className="ls-final" id="contacts">
      <div className="ls-container">
        <p className="ls-eyebrow" style={{ justifyContent: 'center', display: 'inline-flex' }}><span /> Запись</p>
        <h2>Запишитесь сегодня — выберите ближайший филиал</h2>
        <p>
          Удобнее всего написать в WhatsApp филиала, позвонить или прийти на бесплатную консультацию.
        </p>
        <div className="ls-final__cta">
          <a className="ls-btn ls-btn--whatsapp" href={BRANCHES[0].whatsapp} target="_blank" rel="noopener noreferrer">
            <IconWhatsApp /> WhatsApp
          </a>
          <a className="ls-btn ls-btn--instagram" href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer">
            <IconInstagram /> Instagram
          </a>
          <a className="ls-btn ls-btn--threads" href={THREADS_URL} target="_blank" rel="noopener noreferrer">
            <IconThreads /> Threads
          </a>
        </div>
        <div className="ls-final__branches">
          {BRANCHES.map((b) => (
            <div className="ls-final__branch" key={b.id}>
              <strong>{b.name}</strong>
              <small>{b.addressFull}</small>
              <small>{b.phoneDisplay} · ★ {b.rating}</small>
              <div className="ls-final__branch__buttons">
                <a className="ls-btn ls-btn--gold ls-btn--small" href={`tel:${b.phoneTel}`}>
                  <IconPhone /> Звонок
                </a>
                <a className="ls-btn ls-btn--whatsapp ls-btn--small" href={b.whatsapp} target="_blank" rel="noopener noreferrer">
                  <IconWhatsApp /> WhatsApp
                </a>
                <a className="ls-btn ls-btn--map ls-btn--small" href={b.twoGisRoute} target="_blank" rel="noopener noreferrer">
                  <IconMap /> Маршрут
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ----- Footer ----- */
function Footer() {
  return (
    <footer className="ls-footer">
      <div className="ls-container">
        <div className="ls-footer__inner">
          <div className="ls-footer__brand">
            <img src={logoUrl} alt={CLINIC_NAME} />
            <div>
              <strong>LIBERTY STOM</strong>
              <small>{TAGLINE} · Лицензия {LICENSE}</small>
            </div>
          </div>
          <div className="ls-footer__links">
            <a className="ls-btn ls-btn--ghost ls-btn--small" href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer">
              <IconInstagram /> Instagram
            </a>
            <a className="ls-btn ls-btn--ghost ls-btn--small" href={THREADS_URL} target="_blank" rel="noopener noreferrer">
              <IconThreads /> Threads
            </a>
          </div>
        </div>
        <p className="ls-disclaimer">
          Это демонстрационная страница, подготовленная BeeEye. Она не является официальным сайтом компании до подтверждения владельцем.
        </p>
        <p className="ls-footer__copy">
          © {new Date().getFullYear()} {CLINIC_NAME} · Сайт-демо by <a href="/">BeeEye</a>
        </p>
      </div>
    </footer>
  );
}

/* ----- Mobile sticky CTA ----- */
function MobileCTA() {
  return (
    <div className="ls-mobile-cta" aria-label="Быстрая запись">
      <a className="ls-mobile-cta__call" href={`tel:${BRANCHES[0].phoneTel}`}>
        <IconPhone /> Звонок
      </a>
      <a className="ls-mobile-cta__wa" href={BRANCHES[0].whatsapp} target="_blank" rel="noopener noreferrer">
        <IconWhatsApp /> WhatsApp
      </a>
      <a className="ls-mobile-cta__ig" href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer">
        <IconInstagram /> Inst
      </a>
    </div>
  );
}

/* ----- Section intro ----- */
function SectionIntro({ eyebrow, title, text }) {
  return (
    <div className="ls-section-intro">
      <p className="ls-eyebrow"><span /> {eyebrow}</p>
      <h2>{title}</h2>
      {text ? <p>{text}</p> : null}
    </div>
  );
}

/* ----- Icons ----- */
function IconPhone() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.4 19.4 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.4 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7A2 2 0 0 1 22 16.9Z" />
    </svg>
  );
}

function IconWhatsApp() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M20.5 3.5A11.4 11.4 0 0 0 2.8 17.1L2 22l5-1.3A11.4 11.4 0 0 0 20.5 3.5Zm-8.9 16a8.9 8.9 0 0 1-4.5-1.2l-.3-.2-2.7.7.7-2.6-.2-.3a8.9 8.9 0 1 1 7 3.6Zm4.9-6.6c-.3-.1-1.6-.8-1.9-.9-.2-.1-.5-.1-.7.2-.2.3-.7.9-.9 1.1-.2.2-.3.2-.6.1a7.3 7.3 0 0 1-2.1-1.3 7.8 7.8 0 0 1-1.5-1.8c-.1-.3 0-.4.1-.6l.5-.5c.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5 0-.1-.7-1.7-1-2.3-.3-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.4s1 2.8 1.2 3c.1.2 2 3.1 4.9 4.3.7.3 1.2.5 1.6.6.7.2 1.3.2 1.8.1.6-.1 1.6-.7 1.9-1.3.2-.6.2-1.2.2-1.3-.1-.2-.3-.2-.6-.4Z" />
    </svg>
  );
}

function IconInstagram() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5Zm0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7Zm5 4.2a3.8 3.8 0 1 1 0 7.6 3.8 3.8 0 0 1 0-7.6Zm0 2a1.8 1.8 0 1 0 0 3.6 1.8 1.8 0 0 0 0-3.6ZM17.8 6a1.1 1.1 0 1 1 0 2.2 1.1 1.1 0 0 1 0-2.2Z" />
    </svg>
  );
}

function IconThreads() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12.2 2c-5 0-8.8 3-9.5 7.6-.4 2.5-.2 5.2.8 7.4 1.4 3 4.3 4.8 8.4 5h.4c2.6 0 4.7-.8 6.2-2.4 1.5-1.6 2.2-3.6 1.9-5.6-.3-2.3-1.7-4.2-3.7-5.2 0-.2 0-.4-.1-.6-.4-3-2.6-4.6-5.5-4.6-1.7 0-3.2.6-4.1 1.6l1.3 1.4c.6-.7 1.6-1.2 2.8-1.2 2 0 3.3 1.1 3.6 3-1-.4-2.1-.5-3.3-.5-2.7.1-4.5 1.7-4.4 3.9.1 1 .6 1.9 1.4 2.6.9.7 2 .9 3.3.7 1.7-.3 3-1.3 3.7-2.9.4.3.7.7.9 1.1.4.9.5 2 0 3-.7 1.4-2.2 2-4.5 2-2.5 0-4.4-.7-5.6-2.2-1-1.3-1.6-3-1.6-5.3 0-3.7 2.5-7.7 7.6-7.7 2 0 3.7.6 4.9 1.6l1.3-1.4C16 2.6 14.3 2 12.2 2Zm-.4 9.7c.7 0 1.4.1 2 .3-.3 1.2-1.1 2-2.4 2.2-.7.1-1.4 0-1.9-.3-.4-.3-.6-.7-.7-1.1 0-.7.7-1.1 1.7-1.1h1.3Z" />
    </svg>
  );
}

function IconRoute() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 22s7-5.4 7-12A7 7 0 1 0 5 10c0 6.6 7 12 7 12Zm0-9a3 3 0 1 1 0-6 3 3 0 0 1 0 6Z" />
    </svg>
  );
}

function IconClock() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm1 10.2 3.6 2.1-1 1.7-4.6-2.7V6h2v6.2Z" />
    </svg>
  );
}

function IconMap() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M9 3 3 5v16l6-2 6 2 6-2V3l-6 2-6-2Zm0 2.2 6 2v13.6l-6-2V5.2Zm-2 .3v13.6l-2 .7V6.2l2-.7Zm10 0 2-.7v13.6l-2 .7V5.5Z" />
    </svg>
  );
}

function IconBranch() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 2 4 6v6c0 5 3.5 9.4 8 10 4.5-.6 8-5 8-10V6l-8-4Zm0 2.2 6 3v4.8c0 4-2.7 7.6-6 8.2-3.3-.6-6-4.2-6-8.2V7.2l6-3Zm-1 4.8v3H8v2h3v3h2v-3h3v-2h-3V9h-2Z" />
    </svg>
  );
}

function IconTooth() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor">
      <path d="M12 2c-3.3 0-7 2-7 6 0 1.3.4 2.5 1 3.5.5.8.7 1.7.8 2.6.1 1 .2 2.1.4 3.1.3 1.5.7 3 1.4 4.2.4.7 1.1 1.1 1.9 1.1.7 0 1.4-.4 1.7-1 .4-.8.7-1.6.8-2.5.1-.7.4-1.1 1-1.1.7 0 .9.4 1 1.1.1.9.4 1.7.8 2.5.3.6 1 1 1.7 1 .8 0 1.5-.4 1.9-1.1.7-1.2 1.1-2.7 1.4-4.2.2-1 .3-2 .4-3.1.1-.9.3-1.8.8-2.6.6-1 1-2.2 1-3.5 0-4-3.7-6-7-6Z" />
    </svg>
  );
}
