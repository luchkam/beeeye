# BEE EYE — Landing

Premium-tech лендинг для digital/AI-компании BEE EYE.
Слоган: **Внимание к деталям**.

Frontend-витрина (React + Vite + Tailwind + Framer Motion) с backend-интеграциями для AI-чата, лид-формы, Retell Web Call и Telegram-бота, плюс подготовленными точками расширения для callback/аналитики.

---

## Запуск

```bash
npm install
npm run dev      # dev-server http://localhost:5173
npm run dev:api  # backend API для AI-чата (http://localhost:8787)
npm run dev:telegram # Telegram AI-бот (long polling)
npm run build    # production build → /dist
npm run start    # production server (API + статические файлы из /dist)
npm run preview  # preview production build
```

Требуется Node 18+.

### Локальный просмотр для Claude Code

```bash
npm install
npm run dev -- --host 0.0.0.0
```

Далее:
- открыть URL, который покажет Vite в терминале;
- после изменений проверять главную `/` и будущие страницы вида `/zygoma-center`.

Для AI-чата задайте переменные окружения для backend:

```bash
export OPENAI_API_KEY=...
export OPENAI_MODEL=gpt-4.1-mini
export RETELL_API_KEY=...
export RETELL_AGENT_ID=...
export RETELL_FROM_NUMBER=77000000000
export TELEGRAM_BOT_TOKEN=...
export ADMIN_CHAT_ID=309797796
```

`vite` уже проксирует `/api/*` на `http://localhost:8787`, поэтому фронт продолжает работать без изменений UI.

Для Render (Web Service):
- Build Command: `npm ci && npm run build`
- Start Command: `npm run start`
- Health Check Path: `/api/health`
- Рекомендуемые env: `NODE_ENV=production`, `HOST=0.0.0.0` + ключи из блока выше.

Для Telegram-бота:

```bash
npm run dev:telegram
```

Бот использует OpenAI tool-calling: модель сама запрашивает контакт в нужный момент
и вызывает функцию передачи лида менеджеру (`submit_lead`) в `ADMIN_CHAT_ID`.

Команды бота:
- `/start` — приветствие и старт диалога
- `/reset` — очистка истории диалога
- `/id` — показать текущий `chat_id`

---

## Структура

```
src/
├── App.jsx                 # общий каркас + управление overlay-ами
├── main.jsx                # entrypoint
├── index.css               # tailwind + глобальные стили, премиум-токены
│
├── data/                   # контент (легко редактировать и расширять)
│   ├── services.js         # каталог услуг + цены + сноска по WhatsApp
│   ├── solutions.js        # "готовые форматы" / пакеты
│   ├── scenarios.js        # сценарные цепочки "как это работает у вас"
│   ├── niches.js           # список ниш
│   └── faq.js              # частые вопросы
│
├── lib/
│   └── api.js              # ★ слой интеграции с backend (частично real, частично mock)
│
└── components/
    ├── Nav.jsx             # шапка + mobile drawer
    ├── Hero.jsx            # главный экран (BeeOrb + floating cards + CTA)
    ├── ValueProp.jsx       # блок "что мы делаем"
    ├── Services.jsx        # каталог услуг с табами и ценами
    ├── Solutions.jsx       # готовые форматы решений
    ├── Scenarios.jsx       # product-flow сценарии
    ├── Demos.jsx           # интерактивные демо (Voice, TG, WA, Callback)
    ├── Process.jsx         # 6 шагов процесса + гарантии
    ├── WhyUs.jsx           # почему с нами
    ├── Niches.jsx          # для каких ниш
    ├── FAQ.jsx             # сворачиваемые вопросы
    ├── LeadForm.jsx        # главная форма захвата
    ├── FinalCTA.jsx        # завершающий CTA
    ├── Footer.jsx          # премиум-футер
    ├── ChatWidget.jsx      # встроенный AI-агент на сайте
    ├── CallbackModal.jsx   # "AI-агент перезвонит вам"
    └── ui/
        ├── Icon.jsx        # мини-библиотека SVG-иконок
        ├── SectionTitle.jsx
        └── BeeOrb.jsx      # dot-sphere анимация (интерпретация логотипа)
```

---

## Подключение backend

Все интеграции с backend инкапсулированы в `src/lib/api.js`.
Часть функций уже подключена к реальному backend (`submitLead`, `requestCallback`, `startVoiceDemo`, `sendChatMessage`),
остальные оставлены как mock с той же сигнатурой для поэтапного подключения.

| Функция в `lib/api.js` | Что подключается | Куда потом смотрит бекенд |
|---|---|---|
| `submitLead(payload)`       | Форма заявки (`LeadForm`)                         | `POST /api/leads` |
| `requestCallback(payload)`  | "AI-агент перезвонит вам" (`CallbackModal`, Demos) | `POST /api/voice/callback` |
| `startVoiceDemo()`          | Voice AI demo panel (`Demos`)                      | `POST /api/retell/create-web-call` |
| `sendChatMessage(hist,msg)` | AI-чат на сайте (`ChatWidget`)                     | `POST /api/chat/message` (идеально — streaming/SSE) |
| `getTelegramLink()`         | Deep-link к Telegram-боту                          | `GET /api/telegram/link` |
| `getWhatsAppLink()`         | Deep-link к WhatsApp                               | `GET /api/whatsapp/link` |
| `trackEvent(name, data)`    | Analytics / CRM hooks                              | `POST /api/analytics/event` |

Комментарии `// TODO(backend): …` уже расставлены в нужных местах.

---

## Контент и цены

Все тексты услуг, цены и FAQ лежат в `src/data/`. Цены используют формат "от"
через helper `formatTenge()` из `data/services.js`. Категории описываются
объектами — добавление новой категории/пункта сводится к дописыванию одной
записи в массив.

Сноска по стоимости сообщений WhatsApp берётся из `priceFootnote`.

---

## Дизайн-система

- **Цвета** — расширены в `tailwind.config.js`: `ink-*` (фоны), `bee-*` (жёлтый акцент).
- **Шрифты** — Space Grotesk (display), Inter (body), JetBrains Mono (meta).
- **Классы-компоненты** — в `@layer components` (`.card`, `.btn-primary`, `.btn-ghost`, `.btn-outline`, `.eyebrow`, `.headline`, `.shine`, `.grid-bg`, `.text-grad`, `.text-grad-bee`).
- **Motion** — Framer Motion, reveal-on-scroll через `whileInView`, плавные transitions через кривую `[0.16, 1, 0.3, 1]`.
- **Адаптивность** — desktop / tablet / mobile, mobile-меню в `Nav.jsx`.

---

## Что сделано из ТЗ

- ✅ Hero с 4 CTA, BeeOrb-анимация, floating UI cards, stat-strip
- ✅ Value prop блок
- ✅ Все 7 категорий услуг с ценами "от" и вкладками
- ✅ Готовые форматы решений (пакеты)
- ✅ Сценарии "как это работает у вас" с product-flow
- ✅ Живые demo-панели (Voice AI, Telegram, WhatsApp, Callback)
- ✅ Встроенный AI-чат на сайт (с typing-indicator и quick chips)
- ✅ Процесс 6 шагов + гарантии поддержки
- ✅ Почему с нами (6 тезисов)
- ✅ Для каких ниш (10 блоков)
- ✅ FAQ
- ✅ Форма заявки (Имя, Телефон, E-mail, Задача, Канал связи)
- ✅ Финальный CTA
- ✅ Premium-футер
- ✅ Sticky blurred nav + scroll state
- ✅ Реальные backend-вызовы для лид-формы, AI-чата и Retell Web Call + mock для остальных интеграций

---

## Что удобно расширить дальше

- Подключение реального AI-чата (streaming / SSE) в `sendChatMessage()`
- Реальный Voice AI через телефонию → `requestCallback()`
- WhatsApp Business API → `getWhatsAppLink()` / webhook-приёмник
- Отправка лидов в CRM → `submitLead()`
- A/B-тесты CTA, аналитика событий → `trackEvent()`
