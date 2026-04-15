// Каталог услуг по категориям.
// Цены только в формате "от".
// Валюта — тенге. 1 номер — 1 услуга.

export const serviceCategories = [
  {
    id: 'ai-agents',
    code: 'A',
    title: 'AI-агенты и чат-боты',
    tagline: 'Агенты, которые говорят с вашими клиентами круглосуточно',
    icon: 'bot',
    accent: 'from-bee-400/20 to-transparent',
    items: [
      { name: 'AI-агент для сайта', price: 220000 },
      { name: 'AI-консультант по базе знаний', price: 180000 },
      { name: 'AI-агент продаж', price: 280000 },
      { name: 'Telegram-бот для бизнеса', price: 160000 },
      { name: 'AI-бот для Telegram', price: 220000 },
      { name: 'WhatsApp AI-агент', price: 260000 },
    ],
  },
  {
    id: 'voice',
    code: 'B',
    title: 'Voice AI и звонки',
    tagline: 'Голосовой AI, который звонит и отвечает как живой оператор',
    icon: 'voice',
    accent: 'from-bee-300/20 to-transparent',
    items: [
      { name: 'Voice AI для первичного обзвона и сбора брифа', price: 280000 },
      { name: 'Voice AI для входящих звонков', price: 300000 },
      { name: 'AI-агент для квалификации лида по телефону', price: 290000 },
      { name: 'Voice AI с обратным звонком', price: 240000 },
    ],
  },
  {
    id: 'whatsapp',
    code: 'C',
    title: 'WhatsApp Business API и мессенджеры',
    tagline: 'Полная инфраструктура WABA под ваш бизнес',
    icon: 'whatsapp',
    accent: 'from-emerald-400/15 to-transparent',
    items: [
      { name: 'Подключение WhatsApp Business API', price: 180000 },
      { name: 'Настройка шаблонов и сценариев WABA', price: 140000 },
      { name: 'WhatsApp-рассылки для бизнеса', price: 160000 },
      { name: 'Автоматизация заявок в WhatsApp', price: 220000 },
      { name: 'Интеграция WhatsApp с CRM / таблицами / внутренней логикой', price: 280000 },
    ],
  },
  {
    id: 'sites',
    code: 'D',
    title: 'Сайты и лендинги',
    tagline: 'Сайты под задачу — с AI, квизами, многоязычностью',
    icon: 'monitor',
    accent: 'from-sky-400/15 to-transparent',
    items: [
      { name: 'Лендинг под услугу или продукт', price: 140000 },
      { name: 'Сайт с AI-элементами', price: 260000 },
      { name: 'Мультиязычный сайт / лендинг', price: 240000 },
      { name: 'Квиз-лендинг', price: 190000 },
      { name: 'Промо-сайт под рекламную кампанию', price: 170000 },
    ],
  },
  {
    id: 'content',
    code: 'E',
    title: 'Автоматизация контента и автопостинг',
    tagline: 'Контент, который сам создаётся и публикуется по расписанию',
    icon: 'layers',
    accent: 'from-fuchsia-400/15 to-transparent',
    items: [
      { name: 'Автопостинг в Telegram', price: 140000 },
      { name: 'Автопостинг в Threads', price: 150000 },
      { name: 'Автопостинг в Instagram', price: 150000 },
      { name: 'AI-генерация контента для публикаций', price: 130000 },
      { name: 'Мультиканальная публикация контента', price: 240000 },
      { name: 'Контент-автоматизация под расписание', price: 200000 },
      { name: 'AI-ответы на сообщения и комментарии', price: 180000 },
    ],
  },
  {
    id: 'ads',
    code: 'F',
    title: 'Реклама и привлечение заявок',
    tagline: 'Запуск рекламы и воронок, которые приносят лиды',
    icon: 'target',
    accent: 'from-rose-400/15 to-transparent',
    items: [
      { name: 'Запуск рекламы в Google Ads', price: 140000 },
      { name: 'Запуск рекламы в Яндекс Директ', price: 140000 },
      { name: 'Запуск рекламы в Meta Ads', price: 150000 },
      { name: 'Запуск рекламы в Telegram Ads', price: 140000 },
      { name: 'Push-реклама', price: 120000 },
      { name: 'Pop Ads / Popunder-реклама', price: 130000 },
      { name: 'Рекламная воронка под ключ', price: 300000 },
      { name: 'Тест гипотез через рекламу', price: 160000 },
      { name: 'Подготовка рекламной инфраструктуры', price: 100000 },
    ],
  },
  {
    id: 'integrations',
    code: 'G',
    title: 'Интеграции и техническая логика',
    tagline: 'Связываем всё в единую работающую систему',
    icon: 'plug',
    accent: 'from-indigo-400/15 to-transparent',
    items: [
      { name: 'Интеграции с API сторонних сервисов', price: 270000 },
      { name: 'Интеграция AI с внутренней бизнес-логикой', price: 300000 },
      { name: 'Передача заявок в CRM / таблицы / Telegram / e-mail', price: 180000 },
      { name: 'Подключение форм, уведомлений и автоматических сценариев', price: 140000 },
      { name: 'Разработка кастомной логики под процесс клиента', price: 300000 },
    ],
  },
];

export const priceFootnote =
  'Стоимость маркетинг-сообщений WhatsApp оплачивается отдельно по тарифам провайдера.';

export function formatTenge(value) {
  return new Intl.NumberFormat('ru-RU').format(value) + ' ₸';
}
