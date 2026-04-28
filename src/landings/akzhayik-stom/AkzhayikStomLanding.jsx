import React, { useEffect, useMemo, useState } from 'react';
import { motion, useReducedMotion, useScroll, useSpring } from 'framer-motion';
import './styles.css';
import logoUrl from './assets/logo.jpeg';
import {
  ADDRESS,
  ADDRESS_SHORT,
  BENEFITS,
  CITY,
  CLINIC_NAME,
  CLINIC_NAME_KZ,
  DISTRICT,
  DOCTORS,
  EMAIL,
  HOURS,
  INSTAGRAM_URL,
  LICENSE_INFO,
  PHONE_PRIMARY_DISPLAY,
  PHONE_PRIMARY_TEL,
  PHONES,
  PRICES,
  PROBLEM_MATCHES,
  RATINGS,
  REVIEW_THEMES,
  SERVICES,
  TRUST_STATS,
  MAP_IMAGE_URL,
  YANDEX_MAP_URL,
  TWO_GIS_ROUTE_URL,
  TWO_GIS_URL,
  WHATSAPP_URL,
} from './data.js';

function useLandingMeta() {
  useEffect(() => {
    const previousTitle = document.title;
    const meta = document.querySelector('meta[name="description"]');
    const previousDescription = meta?.getAttribute('content') ?? null;

    document.title = 'Стоматология Акжайык - семейная стоматология в Астане';
    if (meta) {
      meta.setAttribute(
        'content',
        'Демонстрационный лендинг стоматологии Акжайык в Астане: терапия, имплантация, ортопедия, диагностика, детская стоматология. Адрес: Улы Дала, 65/1.',
      );
    }

    return () => {
      document.title = previousTitle;
      if (meta && previousDescription != null) meta.setAttribute('content', previousDescription);
    };
  }, []);
}

const fadeUp = {
  hidden: { opacity: 0, y: 26 },
  visible: { opacity: 1, y: 0 },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

export default function AkzhayikStomLanding() {
  useLandingMeta();
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 24, mass: 0.25 });

  return (
    <div className="akzhayik-root">
      <motion.div className="ak-progress" style={{ scaleX }} aria-hidden="true" />
      <Header />
      <main>
        <Hero reduceMotion={reduceMotion} />
        <TrustStrip />
        <Benefits />
        <ProblemMatcher />
        <Services />
        <Prices />
        <Doctors />
        <Reviews />
        <Contacts />
      </main>
      <Footer />
      <MobileCTA />
      <div className="ak-mobile-safe-space" aria-hidden="true" />
    </div>
  );
}

function Header() {
  return (
    <header className="ak-header">
      <div className="ak-container ak-header__inner">
        <a href="/akzhayik-stom" className="ak-brand" aria-label="Акжайык">
          <img src={logoUrl} alt="Логотип Акжайык" />
          <span>
            <strong>Акжайык</strong>
            <small>тіс емханасы</small>
          </span>
        </a>
        <nav className="ak-nav" aria-label="Навигация по странице">
          <a href="#services">Услуги</a>
          <a href="#prices">Цены</a>
          <a href="#doctors">Врачи</a>
          <a href="#contacts">Контакты</a>
        </nav>
        <div className="ak-header__actions">
          <a className="ak-btn ak-btn--ghost ak-hide-mobile" href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer">
            <IconInstagram /> Instagram
          </a>
          <a className="ak-btn ak-btn--primary" href={`tel:${PHONE_PRIMARY_TEL}`}>
            <IconPhone /> Позвонить
          </a>
        </div>
      </div>
    </header>
  );
}

function Hero({ reduceMotion }) {
  return (
    <section className="ak-hero">
      <div className="ak-hero__mesh" aria-hidden="true" />
      <motion.div
        className="ak-container ak-hero__grid"
        initial="hidden"
        animate="visible"
        variants={stagger}
      >
        <motion.div className="ak-hero__copy" variants={fadeUp}>
          <div className="ak-kicker">
            <span /> {CITY} · {DISTRICT} район · стоматологический центр
          </div>
          <div className="ak-hero__logo-row">
            <img src={logoUrl} alt="Логотип стоматологии Акжайык" />
            <div>
              <p>{CLINIC_NAME_KZ}</p>
              <strong>{CLINIC_NAME}</strong>
            </div>
          </div>
          <h1>Семейная стоматология с мягким медицинским подходом</h1>
          <p className="ak-lead">
            Лечение, детский приём, имплантация, ортопедия и диагностика в Астане. Страница собрана как премиальная витрина клиники, чтобы пациент быстро выбрал удобный способ записи.
          </p>
          <div className="ak-hero__cta" aria-label="Основные действия">
            <a className="ak-btn ak-btn--instagram" href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer">
              <IconInstagram /> Instagram
            </a>
            <a className="ak-btn ak-btn--twogis" href={TWO_GIS_ROUTE_URL} target="_blank" rel="noopener noreferrer">
              <span className="ak-2gis-mark" aria-hidden="true">2Г</span>
              Маршрут в 2GIS
            </a>
          </div>
          <div className="ak-hero__meta">
            {RATINGS.map((rating) => (
              <div key={rating.label}>
                <strong>Рейтинг {rating.value}</strong>
                <span>{rating.label}</span>
                <small>{rating.sub}</small>
              </div>
            ))}
            <div>
              <strong>Работаем с 09:00 до 21:00</strong>
              <span>ежедневно</span>
              <small>{ADDRESS_SHORT}</small>
            </div>
          </div>
        </motion.div>

        <motion.div className="ak-hero__visual" variants={fadeUp}>
          <div className="ak-visual-card">
            <div className="ak-visual-card__top">
              <span>Premium dental care</span>
              <strong>Akzhayik</strong>
            </div>
            <div className="ak-tooth-stage" aria-hidden="true">
              {!reduceMotion && <span className="ak-tooth-ring ak-tooth-ring--one" />}
              {!reduceMotion && <span className="ak-tooth-ring ak-tooth-ring--two" />}
              <div className="ak-orb-scene">
                <span className="ak-orb-glow" />
                <span className="ak-orb-core" />
                <span className="ak-orb-cross" />
                {!reduceMotion && (
                  <>
                    <span className="ak-orb-satellite ak-orb-satellite--one" />
                    <span className="ak-orb-satellite ak-orb-satellite--two" />
                    <span className="ak-orb-satellite ak-orb-satellite--three" />
                    <span className="ak-orb-wave ak-orb-wave--one" />
                    <span className="ak-orb-wave ak-orb-wave--two" />
                  </>
                )}
              </div>
            </div>
            <div className="ak-floating-note ak-floating-note--left">
              <strong>4.8</strong>
              <span>рейтинг 103.kz</span>
            </div>
            <div className="ak-floating-note ak-floating-note--right">
              <strong>№18016178</strong>
              <span>лицензия</span>
            </div>
            <div className="ak-visual-card__bottom">
              <span>Терапия</span>
              <span>Имплантация</span>
              <span>Детский приём</span>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}

function TrustStrip() {
  return (
    <section className="ak-trust-strip" aria-label="Ключевые факты">
      <div className="ak-container ak-trust-strip__grid">
        {TRUST_STATS.map((item) => (
          <div key={item.label} className="ak-stat-card">
            <strong>{item.value}</strong>
            <span>{item.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

function Benefits() {
  return (
    <section className="ak-section ak-section--soft" id="benefits">
      <div className="ak-container">
        <SectionIntro
          eyebrow="Почему выбирают"
          title="Не просто стоматология рядом, а понятный маршрут лечения"
        />
        <motion.div className="ak-benefits" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={stagger}>
          {BENEFITS.map((item, index) => (
            <motion.article className="ak-benefit-card" key={item.title} variants={fadeUp}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function ProblemMatcher() {
  const [active, setActive] = useState(PROBLEM_MATCHES[0].label);
  const selected = useMemo(
    () => PROBLEM_MATCHES.find((item) => item.label === active) || PROBLEM_MATCHES[0],
    [active],
  );

  return (
    <section className="ak-section ak-matcher" aria-labelledby="matcher-title">
      <div className="ak-container ak-matcher__grid">
        <div>
          <p className="ak-eyebrow">Быстрый подбор</p>
          <h2 id="matcher-title">Выберите задачу - покажем, с чего начать</h2>
          <p>
            Это не медицинская диагностика, а быстрый навигатор по услугам. Точный план лечения определяет врач после осмотра.
          </p>
          <div className="ak-matcher__chips" role="list" aria-label="Выбор задачи пациента">
            {PROBLEM_MATCHES.map((item) => (
              <button
                key={item.label}
                type="button"
                className={item.label === active ? 'is-active' : ''}
                onClick={() => setActive(item.label)}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
        <motion.div key={selected.label} className="ak-matcher__result" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }}>
          <span>Подходящий старт</span>
          <h3>{selected.title}</h3>
          <p>{selected.body}</p>
          <div className="ak-matcher__actions">
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">Записаться в WhatsApp</a>
            <a href={`tel:${PHONE_PRIMARY_TEL}`}>Позвонить</a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Services() {
  return (
    <section className="ak-section" id="services">
      <div className="ak-container">
        <SectionIntro
          eyebrow="Услуги"
          title="Основные направления клиники"
        />
        <div className="ak-service-grid">
          {SERVICES.map((service) => (
            <article className="ak-service-card" key={service.title}>
              <div>
                <span>{service.tag}</span>
                <h3>{service.title}</h3>
              </div>
              <p>{service.body}</p>
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">Уточнить запись</a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Prices() {
  return (
    <section className="ak-section ak-section--green" id="prices">
      <div className="ak-container ak-prices__grid">
        <div>
          <p className="ak-eyebrow">Цены</p>
          <h2>Показываем только подтверждённые позиции</h2>
        </div>
        <div className="ak-price-list">
          {PRICES.map((item) => (
            <article className={item.featured ? 'ak-price-card is-featured' : 'ak-price-card'} key={item.title}>
              <div>
                <h3>{item.title}</h3>
                <p>{item.note}</p>
              </div>
              <strong>{item.price}</strong>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Doctors() {
  return (
    <section className="ak-section" id="doctors">
      <div className="ak-container">
        <SectionIntro
          eyebrow="Специалисты"
          title="Ведущие врачи с подтверждённым стажем"
        />
        <div className="ak-doctor-grid">
          {DOCTORS.map((doctor) => (
            <article className="ak-doctor-card" key={doctor.name}>
              <div className="ak-doctor-card__avatar" aria-hidden="true">
                <span>{doctor.name.split(' ').map((part) => part[0]).slice(0, 2).join('')}</span>
              </div>
              <div>
                <h3>{doctor.name}</h3>
                <p>{doctor.role}</p>
                <div className="ak-doctor-card__tags">
                  <span>{doctor.experience}</span>
                  <span>{doctor.category}</span>
                </div>
                <small>{doctor.focus}</small>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Reviews() {
  return (
    <section className="ak-section ak-reviews" id="reviews">
      <div className="ak-container ak-reviews__grid">
        <div>
          <p className="ak-eyebrow">Доверие</p>
          <h2>Рейтинги в каталогах и смысловые выжимки отзывов</h2>
        </div>
        <div className="ak-rating-panel">
          {RATINGS.map((rating) => (
            <div key={rating.label} className="ak-rating-card">
              <strong>{rating.value}</strong>
              <span>{rating.label}</span>
              <small>{rating.sub}</small>
            </div>
          ))}
          <div className="ak-review-themes">
            {REVIEW_THEMES.map((theme) => (
              <p key={theme}>{theme}</p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Contacts() {
  return (
    <section className="ak-section ak-contacts" id="contacts">
      <div className="ak-container ak-contacts__grid">
        <div className="ak-contact-card">
          <p className="ak-eyebrow">Контакты</p>
          <h2>Записаться удобнее всего по телефону или WhatsApp</h2>
          <div className="ak-contact-list">
            <ContactRow icon={<IconRoute />} title="Адрес" text={ADDRESS} href={TWO_GIS_URL} />
            <ContactRow icon={<IconClock />} title="Режим работы" text={HOURS} />
            <ContactRow icon={<IconPhone />} title="Телефон" text={PHONE_PRIMARY_DISPLAY} href={`tel:${PHONE_PRIMARY_TEL}`} />
            <ContactRow icon={<IconMail />} title="Почта" text={EMAIL} href={`mailto:${EMAIL}`} />
          </div>
          <div className="ak-phone-stack" aria-label="Все телефоны">
            {PHONES.map((phone) => (
              <a key={phone} href={`tel:+${phone.replace(/\D/g, '')}`}>{phone}</a>
            ))}
          </div>
          <div className="ak-contact-actions">
            <a className="ak-btn ak-btn--primary" href={`tel:${PHONE_PRIMARY_TEL}`}><IconPhone /> Позвонить</a>
            <a className="ak-btn ak-btn--whatsapp" href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer"><IconWhatsApp /> WhatsApp</a>
            <a className="ak-btn ak-btn--instagram" href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer"><IconInstagram /> Instagram</a>
            <a className="ak-btn ak-btn--ghost-light" href={TWO_GIS_ROUTE_URL} target="_blank" rel="noopener noreferrer"><span className="ak-2gis-mark" aria-hidden="true">2Г</span> Построить маршрут в 2GIS</a>
          </div>
        </div>
        <div className="ak-map-card">
          <a className="ak-map-card__frame-wrap" href={TWO_GIS_ROUTE_URL} target="_blank" rel="noopener noreferrer" aria-label="Открыть карту и маршрут в 2GIS">
            <img src={MAP_IMAGE_URL} alt="Карта района проспекта Улы Дала, 65/1" loading="lazy" />
          </a>
          <h3>{ADDRESS_SHORT}</h3>
          <p>{DISTRICT} район, {CITY}</p>
          <div className="ak-map-card__links">
            <a href={TWO_GIS_ROUTE_URL} target="_blank" rel="noopener noreferrer">Открыть маршрут в 2GIS</a>
            <a href={YANDEX_MAP_URL} target="_blank" rel="noopener noreferrer">Открыть в Яндекс Картах</a>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="ak-footer">
      <div className="ak-container ak-footer__inner">
        <div>
          <img src={logoUrl} alt="Акжайык" />
          <p>{LICENSE_INFO}</p>
        </div>
        <p className="ak-disclaimer">
          Это демонстрационная страница, подготовленная BeeEye. Она не является официальным сайтом компании до подтверждения владельцем.
        </p>
      </div>
    </footer>
  );
}

function MobileCTA() {
  return (
    <div className="ak-mobile-cta" aria-label="Быстрая запись">
      <a href={`tel:${PHONE_PRIMARY_TEL}`}><IconPhone /> Позвонить</a>
      <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer"><IconWhatsApp /> WhatsApp</a>
    </div>
  );
}

function SectionIntro({ eyebrow, title, text }) {
  return (
    <div className="ak-section-intro">
      <p className="ak-eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
      {text ? <p>{text}</p> : null}
    </div>
  );
}

function ContactRow({ icon, title, text, href }) {
  const body = (
    <>
      <span>{icon}</span>
      <div>
        <strong>{title}</strong>
        <p>{text}</p>
      </div>
    </>
  );

  if (href) {
    return <a className="ak-contact-row" href={href} target={href.startsWith('http') ? '_blank' : undefined} rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}>{body}</a>;
  }
  return <div className="ak-contact-row">{body}</div>;
}

function IconPhone() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.4 19.4 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.4 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7A2 2 0 0 1 22 16.9Z" /></svg>;
}

function IconWhatsApp() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.5 3.5A11.4 11.4 0 0 0 2.8 17.1L2 22l5-1.3A11.4 11.4 0 0 0 20.5 3.5Zm-8.9 16a8.9 8.9 0 0 1-4.5-1.2l-.3-.2-2.7.7.7-2.6-.2-.3a8.9 8.9 0 1 1 7 3.6Zm4.9-6.6c-.3-.1-1.6-.8-1.9-.9-.2-.1-.5-.1-.7.2-.2.3-.7.9-.9 1.1-.2.2-.3.2-.6.1a7.3 7.3 0 0 1-2.1-1.3 7.8 7.8 0 0 1-1.5-1.8c-.1-.3 0-.4.1-.6l.5-.5c.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5 0-.1-.7-1.7-1-2.3-.3-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.4s1 2.8 1.2 3c.1.2 2 3.1 4.9 4.3.7.3 1.2.5 1.6.6.7.2 1.3.2 1.8.1.6-.1 1.6-.7 1.9-1.3.2-.6.2-1.2.2-1.3-.1-.2-.3-.2-.6-.4Z" /></svg>;
}

function IconInstagram() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5Zm0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7Zm5 4.2a3.8 3.8 0 1 1 0 7.6 3.8 3.8 0 0 1 0-7.6Zm0 2a1.8 1.8 0 1 0 0 3.6 1.8 1.8 0 0 0 0-3.6ZM17.8 6a1.1 1.1 0 1 1 0 2.2 1.1 1.1 0 0 1 0-2.2Z" /></svg>;
}

function IconRoute() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 22s7-5.4 7-12A7 7 0 1 0 5 10c0 6.6 7 12 7 12Zm0-9a3 3 0 1 1 0-6 3 3 0 0 1 0 6Z" /></svg>;
}

function IconClock() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm1 10.2 3.6 2.1-1 1.7-4.6-2.7V6h2v6.2Z" /></svg>;
}

function IconMail() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Zm8 8.7L4.7 7.2 3.5 8.8l8.5 6.4 8.5-6.4-1.2-1.6L12 12.7Z" /></svg>;
}
