import React, { useEffect, useMemo, useState } from 'react';
import './styles.css';
import logoImage from './assets/elstom-logo.jpeg';
import {
  BRANCHES,
  ELSTOM_LOGO_ALT,
  HERO_FACTS,
  NETWORK_PRIMARY,
  PROBLEM_FLOWS,
  PROMOTIONS,
  SERVICE_CARDS,
  TRUST_POINTS,
} from './data.js';

export default function ElstomLanding() {
  const [activeProblemId, setActiveProblemId] = useState(PROBLEM_FLOWS[0]?.id ?? null);
  const [openedBranchId, setOpenedBranchId] = useState(null);

  const activeProblem = useMemo(
    () => PROBLEM_FLOWS.find((item) => item.id === activeProblemId) ?? PROBLEM_FLOWS[0],
    [activeProblemId],
  );

  const openedBranch = useMemo(
    () => BRANCHES.find((item) => item.id === openedBranchId) ?? null,
    [openedBranchId],
  );

  useEffect(() => {
    const previousTitle = document.title;
    document.title = 'Elstom — сеть стоматологических клиник в Астане';
    const description = document.querySelector('meta[name=\"description\"]');
    const previousDescription = description?.getAttribute('content') ?? null;
    if (description) {
      description.setAttribute(
        'content',
        'Elstom — сеть стоматологических клиник в Астане: 6 филиалов, лечение, имплантация, ортодонтия и детская стоматология.',
      );
    }

    const onEsc = (event) => {
      if (event.key === 'Escape') setOpenedBranchId(null);
    };

    window.addEventListener('keydown', onEsc);
    return () => {
      document.title = previousTitle;
      if (description && previousDescription != null) {
        description.setAttribute('content', previousDescription);
      }
      window.removeEventListener('keydown', onEsc);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = openedBranch ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [openedBranch]);

  const openBranchById = (id) => setOpenedBranchId(id);

  const openBranchesSection = () => {
    const element = document.getElementById('elstom-branches');
    if (element) element.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="elstom-root">
      <div className="elstom-ambient" aria-hidden="true" />

      <header className="elstom-header">
        <div className="elstom-container elstom-header__inner">
          <a href="#top" className="elstom-brand" aria-label="Elstom">
            <img src={logoImage} alt={ELSTOM_LOGO_ALT} className="elstom-brand__logo" />
            <span className="elstom-brand__text">
              <strong>Elstom</strong>
              <small>сеть стоматологических клиник</small>
            </span>
          </a>

          <a className="elstom-btn elstom-btn--call elstom-hide-mobile" href={NETWORK_PRIMARY.phoneTel}>
            <IconPhone />
            Позвонить
          </a>
        </div>
      </header>

      <main>
        <section className="elstom-hero" id="top">
          <div className="elstom-container elstom-hero__grid">
            <div className="elstom-hero__content">
              <p className="elstom-eyebrow">ASTANA · ELSTOM · DENTAL NETWORK</p>
              <h1>
                Elstom — стоматология в Астане,
                <span> где забота о пациенте масштабируется на 6 филиалов.</span>
              </h1>
              <p className="elstom-hero__lead">
                Лечение, имплантация, ортодонтия, детский приём и помощь в неотложных случаях.
                Часть филиалов работает круглосуточно — выбирайте удобную локацию и формат связи.
              </p>

              <div className="elstom-hero__cta">
                <button type="button" className="elstom-btn elstom-btn--primary" onClick={openBranchesSection}>
                  Выбрать филиал
                </button>
                <a className="elstom-btn elstom-btn--call" href={NETWORK_PRIMARY.phoneTel}>
                  <IconPhone />
                  Позвонить
                </a>
                <a
                  className="elstom-btn elstom-btn--wa"
                  href={NETWORK_PRIMARY.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <IconWhatsApp />
                  Написать в WhatsApp
                </a>
                <a
                  className="elstom-btn elstom-btn--ghost"
                  href={NETWORK_PRIMARY.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <IconInstagram />
                  Открыть Instagram
                </a>
              </div>

              <div className="elstom-facts" role="list" aria-label="Ключевые факты Elstom">
                {HERO_FACTS.map((fact) => (
                  <article key={fact.label} className="elstom-facts__item" role="listitem">
                    <strong>{fact.value}</strong>
                    <span>{fact.label}</span>
                  </article>
                ))}
              </div>
            </div>

            <div className="elstom-hero__visual" aria-hidden="true">
              <div className="elstom-orbit elstom-orbit--1" />
              <div className="elstom-orbit elstom-orbit--2" />
              <div className="elstom-orbit elstom-orbit--3" />
              <div className="elstom-glass-card">
                <img src={logoImage} alt="" className="elstom-glass-card__logo" />
                <h3>Премиальная стоматология c акцентом на комфорт</h3>
                <p>
                  Градиентный стиль бренда + медицинская эстетика: свет, аккуратные формы, прозрачные карточки
                  и понятная навигация по филиалам.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="elstom-branches" className="elstom-section">
          <div className="elstom-container">
            <div className="elstom-section__head">
              <p>Филиалы</p>
              <h2>6 филиалов Elstom в Астане</h2>
            </div>

            <div className="elstom-branches-grid">
              {BRANCHES.map((branch) => (
                <article key={branch.id} className="elstom-branch-card">
                  <div className="elstom-branch-card__top">
                    <h3>{branch.title}</h3>
                    <span className={branch.isConfirmedInSources ? 'is-confirmed' : 'is-partial'}>
                      {branch.isConfirmedInSources ? 'подтверждено' : 'частично подтверждено'}
                    </span>
                  </div>

                  <p className="elstom-branch-card__address">{branch.address}</p>
                  <p className="elstom-branch-card__meta">{branch.district} · {branch.hours}</p>

                  <div className="elstom-branch-card__phones">
                    {branch.phones.map((phone) => (
                      <a key={phone.tel} href={phone.tel}>
                        <IconPhone /> {phone.display}
                      </a>
                    ))}
                  </div>

                  <div className="elstom-icon-row" aria-label="Быстрые ссылки филиала">
                    <SmartIconLink href={branch.phones[0]?.tel} title="Позвонить"><IconPhone /></SmartIconLink>
                    <SmartIconLink href={branch.phones[0]?.wa} title="WhatsApp"><IconWhatsApp /></SmartIconLink>
                    <SmartIconLink href={branch.instagram} title="Instagram"><IconInstagram /></SmartIconLink>
                    <SmartIconLink href={branch.telegram} title="Telegram"><IconTelegram /></SmartIconLink>
                    <SmartIconLink href={branch.twoGis} title="2GIS"><IconMapPin /></SmartIconLink>
                  </div>

                  <button type="button" className="elstom-btn elstom-btn--ghost elstom-btn--wide" onClick={() => openBranchById(branch.id)}>
                    Подробнее
                  </button>
                </article>
              ))}
            </div>

            <div className="elstom-map-scheme" aria-label="Схема филиалов">
              <div className="elstom-map-scheme__surface" />
              {BRANCHES.map((branch, index) => (
                <button
                  key={branch.id}
                  type="button"
                  className={`elstom-map-node elstom-map-node--${index + 1}`}
                  onClick={() => openBranchById(branch.id)}
                >
                  <span className="dot" />
                  <span>{branch.title.replace('Филиал ', '')}</span>
                </button>
              ))}
            </div>
          </div>
        </section>

        <section className="elstom-section elstom-services">
          <div className="elstom-container">
            <div className="elstom-section__head">
              <p>Услуги</p>
              <h2>Основные направления сети Elstom</h2>
            </div>

            <div className="elstom-services-grid">
              {SERVICE_CARDS.map((service) => (
                <article key={service.title} className="elstom-service-card">
                  <h3>{service.title}</h3>
                  <p>{service.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="elstom-section">
          <div className="elstom-container elstom-flow-grid">
            <div>
              <div className="elstom-section__head">
                <p>Навигация</p>
                <h2>Что вас беспокоит?</h2>
              </div>
              <div className="elstom-flow-options">
                {PROBLEM_FLOWS.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    className={item.id === activeProblem.id ? 'is-active' : ''}
                    onClick={() => setActiveProblemId(item.id)}
                  >
                    {item.question}
                  </button>
                ))}
              </div>
            </div>

            <article className="elstom-flow-result">
              <p className="elstom-flow-result__tag">{activeProblem.serviceTag}</p>
              <h3>Рекомендация от навигатора Elstom</h3>
              <p>{activeProblem.recommendation}</p>
              <button type="button" className="elstom-btn elstom-btn--primary" onClick={openBranchesSection}>
                Выбрать филиал
              </button>
            </article>
          </div>
        </section>

        <section className="elstom-section">
          <div className="elstom-container">
            <div className="elstom-section__head">
              <p>Доверие</p>
              <h2>Почему пациенты выбирают Elstom</h2>
            </div>

            <div className="elstom-trust-grid">
              {TRUST_POINTS.map((point) => (
                <article key={point.title} className="elstom-trust-card">
                  <h3>{point.title}</h3>
                  <p>{point.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="elstom-section elstom-promos">
          <div className="elstom-container">
            <div className="elstom-section__head">
              <p>Акции</p>
              <h2>Действующие предложения сети</h2>
            </div>

            <div className="elstom-promos-grid">
              {PROMOTIONS.map((promo) => (
                <article key={promo.title} className="elstom-promo-card">
                  <h3>{promo.title}</h3>
                  <p>{promo.note}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="elstom-section elstom-contacts" id="elstom-contacts">
          <div className="elstom-container">
            <div className="elstom-section__head">
              <p>Контакты</p>
              <h2>Выберите филиал и удобный канал связи</h2>
            </div>

            <div className="elstom-contact-list">
              {BRANCHES.map((branch) => (
                <article key={branch.id} className="elstom-contact-row">
                  <button type="button" className="elstom-contact-row__address" onClick={() => openBranchById(branch.id)}>
                    <strong>{branch.title}</strong>
                    <span>{branch.address}</span>
                  </button>

                  <div className="elstom-contact-row__actions">
                    <a className="elstom-btn elstom-btn--call" href={branch.phones[0]?.tel}><IconPhone />Позвонить</a>
                    <a className="elstom-btn elstom-btn--wa" href={branch.phones[0]?.wa} target="_blank" rel="noopener noreferrer"><IconWhatsApp />WhatsApp</a>
                    {branch.instagram ? (
                      <a className="elstom-btn elstom-btn--ghost" href={branch.instagram} target="_blank" rel="noopener noreferrer"><IconInstagram />Instagram</a>
                    ) : null}
                    <a className="elstom-btn elstom-btn--ghost" href={branch.twoGis} target="_blank" rel="noopener noreferrer"><IconMapPin />Маршрут</a>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="elstom-disclaimer">
          <div className="elstom-container">
            Это демонстрационная страница, подготовленная BeeEye. Она не является официальным сайтом
            компании до подтверждения владельцем.
          </div>
        </section>
      </main>

      <div className="elstom-mobile-bar" role="navigation" aria-label="Быстрые действия">
        <a href={NETWORK_PRIMARY.phoneTel}><IconPhone />Позвонить</a>
        <a href={NETWORK_PRIMARY.whatsapp} target="_blank" rel="noopener noreferrer"><IconWhatsApp />WhatsApp</a>
      </div>

      {openedBranch ? (
        <BranchModal
          branch={openedBranch}
          onClose={() => setOpenedBranchId(null)}
        />
      ) : null}
    </div>
  );
}

function BranchModal({ branch, onClose }) {
  return (
    <div className="elstom-modal" role="dialog" aria-modal="true" aria-label={`Филиал ${branch.title}`} onClick={onClose}>
      <div className="elstom-modal__content" onClick={(event) => event.stopPropagation()}>
        <div className="elstom-modal__head">
          <div>
            <h3>{branch.title}</h3>
            <p>{branch.address}</p>
          </div>
          <button type="button" onClick={onClose} className="elstom-modal__close" aria-label="Закрыть">
            <IconClose />
          </button>
        </div>

        <div className="elstom-modal__meta">
          <MetaLine icon={<IconMapPin />} label="Адрес" value={`${branch.address}, ${branch.district}`} />
          <MetaLine icon={<IconClock />} label="Режим" value={branch.hours} />
          <MetaLine
            icon={<IconPhone />}
            label="Телефоны"
            value={
              <div className="elstom-modal__phones">
                {branch.phones.map((phone) => (
                  <a key={phone.tel} href={phone.tel}>{phone.display}</a>
                ))}
              </div>
            }
          />
          {branch.email ? <MetaLine icon={<IconMail />} label="E-mail" value={<a href={`mailto:${branch.email}`}>{branch.email}</a>} /> : null}
          {branch.instagram ? <MetaLine icon={<IconInstagram />} label="Instagram" value={<a href={branch.instagram} target="_blank" rel="noopener noreferrer">Открыть профиль</a>} /> : null}
          {branch.telegram ? <MetaLine icon={<IconTelegram />} label="Telegram" value={<a href={branch.telegram} target="_blank" rel="noopener noreferrer">Открыть Telegram</a>} /> : null}
        </div>

        <div className="elstom-modal__services">
          <h4>Подходящие услуги филиала</h4>
          <ul>
            {branch.services.map((service) => (
              <li key={service}>{service}</li>
            ))}
          </ul>
        </div>

        <div className="elstom-modal__actions">
          <a className="elstom-btn elstom-btn--call" href={branch.phones[0]?.tel}><IconPhone />Позвонить</a>
          <a className="elstom-btn elstom-btn--wa" href={branch.phones[0]?.wa} target="_blank" rel="noopener noreferrer"><IconWhatsApp />WhatsApp</a>
          {branch.instagram ? (
            <a className="elstom-btn elstom-btn--ghost" href={branch.instagram} target="_blank" rel="noopener noreferrer"><IconInstagram />Instagram</a>
          ) : null}
          <a className="elstom-btn elstom-btn--ghost" href={branch.twoGis} target="_blank" rel="noopener noreferrer"><IconMapPin />Маршрут в 2GIS</a>
          <button type="button" className="elstom-btn elstom-btn--ghost" onClick={onClose}>Закрыть</button>
        </div>
      </div>
    </div>
  );
}

function MetaLine({ icon, label, value }) {
  return (
    <div className="elstom-meta-line">
      <span className="elstom-meta-line__icon">{icon}</span>
      <div>
        <p>{label}</p>
        <div>{value}</div>
      </div>
    </div>
  );
}

function SmartIconLink({ href, title, children }) {
  if (!href) {
    return (
      <span className="elstom-icon-link is-disabled" aria-label={`${title}: не подтверждено`} title={`${title}: не подтверждено`}>
        {children}
      </span>
    );
  }

  return (
    <a
      href={href}
      target={href.startsWith('http') ? '_blank' : undefined}
      rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
      className="elstom-icon-link"
      aria-label={title}
      title={title}
    >
      {children}
    </a>
  );
}

function IconPhone() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92V21a1 1 0 0 1-1.1 1 19.9 19.9 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.9 19.9 0 0 1 3 3.1 1 1 0 0 1 4 2h4.1a1 1 0 0 1 1 .8l1 4.4a1 1 0 0 1-.2.9l-1.2 1.3a16 16 0 0 0 6 6l1.3-1.2a1 1 0 0 1 .9-.2l4.4 1a1 1 0 0 1 .7 1Z" />
    </svg>
  );
}

function IconWhatsApp() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.5 3.5A11.9 11.9 0 0 0 12 0C5.4 0 0 5.4 0 12c0 2.1.6 4.2 1.6 5.9L0 24l6.3-1.7c1.7.9 3.6 1.4 5.7 1.4h.1c6.6 0 11.9-5.4 11.9-12 0-3.2-1.2-6.2-3.5-8.2Zm-8.4 18.1h-.1c-1.8 0-3.5-.5-5.1-1.4l-.4-.2-3.7 1 1-3.6-.2-.4A9.8 9.8 0 0 1 2.2 12C2.2 6.6 6.6 2.2 12 2.2c2.6 0 5.1 1 6.9 2.9a9.7 9.7 0 0 1 2.9 6.9c0 5.4-4.4 9.8-9.7 9.8Zm5.4-7.3c-.3-.2-1.8-.9-2.1-1-.3-.1-.5-.1-.7.2l-.9 1.1c-.2.2-.4.2-.7.1-.3-.2-1.2-.5-2.3-1.5-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.5.1-.6l.4-.5.3-.5c.1-.2 0-.4 0-.6l-.9-2.2c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.4s1 2.8 1.2 3.1c.1.2 2.1 3.2 5 4.5.7.3 1.3.5 1.8.6.8.2 1.5.2 2 .1.6-.1 1.8-.8 2-1.5.2-.8.2-1.4.2-1.5-.1-.1-.3-.2-.6-.4Z" />
    </svg>
  );
}

function IconInstagram() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <path d="M16 11.4a4 4 0 1 1-3.4-3.4A4 4 0 0 1 16 11.4Z" />
      <line x1="17.5" y1="6.5" x2="17.5" y2="6.5" />
    </svg>
  );
}

function IconTelegram() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M9.8 15.3 9.6 20c.4 0 .6-.2.8-.4l2-1.9 4.1 3c.8.4 1.3.2 1.5-.7l2.9-13.7c.3-1.1-.4-1.6-1.1-1.3L2.4 10.5c-1 .4-1 1 0 1.3l4.5 1.4 10.5-6.6c.5-.3 1-.1.6.2L9.8 15.3Z" />
    </svg>
  );
}

function IconMapPin() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 10c0 6.5-9 13-9 13S3 16.5 3 10a9 9 0 1 1 18 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function IconClock() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

function IconMail() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 7-10 6L2 7" />
    </svg>
  );
}

function IconClose() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}
