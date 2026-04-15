// "Как это может работать у вас" — сценарные цепочки.
export const scenarios = [
  {
    id: 'site-ai',
    title: 'Клиент заходит на сайт',
    summary: 'AI отвечает, собирает телефон и передаёт менеджеру',
    steps: [
      { label: 'Заход на сайт', icon: 'globe' },
      { label: 'AI-агент отвечает', icon: 'bot' },
      { label: 'Собирает телефон', icon: 'phone' },
      { label: 'Передаёт в CRM', icon: 'crm' },
    ],
  },
  {
    id: 'callback',
    title: 'Клиент оставляет номер',
    summary: 'Voice AI перезванивает и собирает бриф',
    steps: [
      { label: 'Заявка', icon: 'form' },
      { label: 'Voice AI звонит', icon: 'call' },
      { label: 'Собирает бриф', icon: 'brief' },
      { label: 'Отчёт менеджеру', icon: 'send' },
    ],
  },
  {
    id: 'whatsapp',
    title: 'Клиент пишет в WhatsApp',
    summary: 'AI консультирует и забирает вводные',
    steps: [
      { label: 'Сообщение', icon: 'whatsapp' },
      { label: 'AI-консультант', icon: 'bot' },
      { label: 'Собирает данные', icon: 'brief' },
      { label: 'Передача менеджеру', icon: 'send' },
    ],
  },
  {
    id: 'ads-funnel',
    title: 'Реклама ведёт на лендинг',
    summary: 'AI-агент помогает дожать заявку',
    steps: [
      { label: 'Клик по рекламе', icon: 'target' },
      { label: 'Лендинг', icon: 'globe' },
      { label: 'AI-агент', icon: 'bot' },
      { label: 'Лид', icon: 'check' },
    ],
  },
  {
    id: 'content-auto',
    title: 'Контент создаётся автоматически',
    summary: 'AI пишет и публикует по расписанию',
    steps: [
      { label: 'AI пишет', icon: 'pen' },
      { label: 'Согласование', icon: 'check' },
      { label: 'Расписание', icon: 'clock' },
      { label: 'Публикация', icon: 'send' },
    ],
  },
];
