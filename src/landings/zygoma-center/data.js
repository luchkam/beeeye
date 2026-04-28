// Verified data sources:
//   - 2GIS firm card 70000001103174339
//   - Instagram @zygoma_center_dr.utegenov
//   - TikTok @zygoma_center
//   - Threads @zygoma_center_dr.utegenov
//   - WhatsApp business deep link (provided by owner via Instagram)
// Facts below are taken from those public sources only — no fabrication.

export const PHONE_DISPLAY = '+7 700 100 5525';
export const PHONE_TEL = '+77001005525';
export const ADMIN_PHONE_TEL = '+77474573184';
export const EMAIL = 'zygomacenter@mail.ru';

// WhatsApp link the clinic uses for appointments (admin number).
export const WHATSAPP_BOOK_URL =
  'https://api.whatsapp.com/send/?phone=%2B77474573184&text=&type=phone_number&app_absent=0';

// Direct social links.
export const INSTAGRAM_URL = 'https://www.instagram.com/zygoma_center_dr.utegenov';
export const TIKTOK_URL = 'https://www.tiktok.com/@zygoma_center';
export const THREADS_URL = 'https://www.threads.com/@zygoma_center_dr.utegenov';
export const TELEGRAM_URL = 'https://t.me/+77474573184';
export const TWO_GIS_URL =
  'https://2gis.kz/astana/firm/70000001103174339?m=71.401829%2C51.160708%2F16';

export const ADDRESS_LINE = 'Астана, ул. Кенесары, 4а';
export const HOURS_LINE = 'Ежедневно с 09:00 до 21:00';
export const RATING = '5.0';
export const REVIEWS_COUNT = 291;

// Marquee strip between sections.
export const MARQUEE_ITEMS = [
  'Скуловые импланты Zygoma',
  'Дентальная имплантация',
  'Лечение во сне «Севоран»',
  'Семейная стоматология',
  'Астана · ул. Кенесары, 4а',
  'Без выходных · 09:00 — 21:00',
];

// Services. All entries derived from Instagram bio + 2GIS card. No invented services.
export const SERVICES = [
  {
    key: 'zygoma',
    title: 'Скуловая имплантация Zygoma',
    body:
      'Профильное направление центра. Установка скуловых имплантов при выраженной атрофии костной ткани верхней челюсти — там, где обычная имплантация невозможна.',
    tag: 'Профильное',
    accent: true,
  },
  {
    key: 'implants',
    title: 'Дентальная имплантация',
    body:
      'Восстановление одного зуба, нескольких или всего ряда. Подбор системы имплантации индивидуально под клинический случай.',
    tag: 'Имплантация',
  },
  {
    key: 'sedation',
    title: 'Лечение под седацией «Севоран»',
    body:
      'Спокойное лечение во сне для пациентов, кому сложно перенести стандартный приём. Анестезия проводится врачом-анестезиологом.',
    tag: 'Под седацией',
  },
  {
    key: 'family',
    title: 'Семейная стоматология',
    body:
      'Терапия, гигиена, профилактика и приём в одном центре — для взрослых и детей. Подход «всей семьёй» в одной клинике.',
    tag: 'Для всей семьи',
  },
  {
    key: 'consult',
    title: 'Бесплатная консультация',
    body:
      'Осмотр, ответы на вопросы и предварительный план лечения — без оплаты. Дальнейшие шаги обсуждаются после диагностики.',
    tag: 'Бесплатно',
  },
  {
    key: 'plan',
    title: 'Индивидуальный план лечения',
    body:
      'Стоимость и протокол согласовываются после диагностики и КЛКТ — без «приёма по картинке».',
    tag: 'По диагностике',
  },
];

export const TREATMENT_STEPS = [
  {
    n: '01',
    title: 'Заявка',
    body: 'Звоните или пишите в WhatsApp / Instagram / Telegram. Администратор подберёт удобное время.',
  },
  {
    n: '02',
    title: 'Бесплатная консультация',
    body: 'Осмотр, ответы на вопросы и предварительный план лечения — без оплаты.',
  },
  {
    n: '03',
    title: 'Диагностика',
    body: 'Снимки и при необходимости КЛКТ. Только после этого формируется точный план и стоимость.',
  },
  {
    n: '04',
    title: 'Лечение',
    body: 'По согласованному плану. При необходимости — под седацией «Севоран».',
  },
  {
    n: '05',
    title: 'Контроль',
    body: 'Профилактические визиты и сопровождение после лечения.',
  },
];

export const TRUST_POINTS = [
  { value: '5.0', label: '291 оценка · 2ГИС', sub: 'Рейтинг центра' },
  { value: 'Zygoma', label: 'Скуловая имплантация', sub: 'Профильное направление' },
  { value: 'Севоран', label: 'Лечение во сне', sub: 'С анестезиологом' },
  { value: '09–21', label: 'Без выходных', sub: 'Каждый день' },
];

export const PRICING = [
  {
    title: 'Первичная консультация',
    price: 'Бесплатно',
    note: 'Осмотр, план лечения, ответы на вопросы.',
    highlight: true,
  },
  {
    title: 'Лечение под седацией «Севоран»',
    price: 'от 15 000 ₸ / час',
    note: 'Стоимость анестезии. Лечение тарифицируется отдельно.',
  },
  {
    title: 'Имплантация и Zygoma',
    price: 'По плану лечения',
    note: 'Точную стоимость рассчитываем после диагностики и КЛКТ.',
  },
];

export const SOCIALS = [
  { key: 'instagram', label: 'Instagram', url: INSTAGRAM_URL, handle: '@zygoma_center_dr.utegenov' },
  { key: 'tiktok', label: 'TikTok', url: TIKTOK_URL, handle: '@zygoma_center' },
  { key: 'threads', label: 'Threads', url: THREADS_URL, handle: '@zygoma_center_dr.utegenov' },
  { key: 'telegram', label: 'Telegram', url: TELEGRAM_URL, handle: 'Запись и связь' },
];
