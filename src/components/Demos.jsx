import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RetellWebClient } from 'retell-client-js-sdk';
import Icon from './ui/Icon.jsx';
import SectionTitle from './ui/SectionTitle.jsx';
import { requestCallback, startVoiceDemo, getTelegramLink, getWhatsAppLink } from '../lib/api.js';
import { formatKzPhone, parseKzPhoneInput, toRetellPhoneDigits } from '../lib/phone.js';

// ============================================================================
// ДЕМО-БЛОК
// Voice AI Demo уже подключен к реальному backend endpoint (Retell web call).
// Остальные демо-компоненты остаются mock, но с точками подключения в api.js.
// ============================================================================

const demos = [
  {
    id: 'site-ai',
    title: 'AI-агент на сайте',
    desc: 'Диалоговый агент, который отвечает на вопросы и квалифицирует лид.',
    icon: 'bot',
    accent: 'from-bee-400/20',
    cta: 'Попробовать',
  },
  {
    id: 'voice',
    title: 'Voice AI-агент',
    desc: 'Голосовой агент принимает входящие и звонит по заявкам.',
    icon: 'voice',
    accent: 'from-amber-300/15',
    cta: 'Посмотреть демо',
  },
  {
    id: 'telegram',
    title: 'Telegram-бот',
    desc: 'Бот для заявок, сценариев, рассылок и квалификации.',
    icon: 'telegram',
    accent: 'from-sky-400/15',
    cta: 'Открыть Telegram',
  },
  {
    id: 'whatsapp',
    title: 'WhatsApp AI-агент',
    desc: 'AI в WhatsApp — консультирует и собирает данные 24/7.',
    icon: 'whatsapp',
    accent: 'from-emerald-400/15',
    cta: 'Открыть WhatsApp',
  },
  {
    id: 'callback',
    title: 'AI-агент перезвонит вам',
    desc: 'Оставьте номер — AI-агент позвонит и соберёт бриф за 1 минуту.',
    icon: 'phone',
    accent: 'from-fuchsia-400/15',
    cta: 'Заказать звонок',
  },
];

export default function Demos({ onOpenChat, openRequest }) {
  const [open, setOpen] = useState(null);

  useEffect(() => {
    if (!openRequest?.id) return;
    setOpen(openRequest.id);
  }, [openRequest?.nonce, openRequest?.id]);

  return (
    <section id="demos" className="relative py-24 sm:py-32">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="container-beeeye">
        <SectionTitle
          eyebrow="Демо · Живые интерфейсы"
          title="Потрогайте, как это работает"
          sub="Каждый продукт доступен прямо на странице. Интерфейсы настоящие — под них уже подготовлены точки подключения к backend."
        />

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {demos.map((d, i) => (
            <motion.button
              key={d.id}
              onClick={() => {
                if (d.id === 'site-ai') onOpenChat();
                else setOpen(d.id);
              }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.55, delay: (i % 3) * 0.08 }}
              className={`card card-hover group relative p-6 text-left overflow-hidden`}
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${d.accent} to-transparent opacity-0 group-hover:opacity-100 transition-opacity`}
              />
              <div className="relative">
                <div className="flex items-center justify-between">
                  <div className="grid h-11 w-11 place-items-center rounded-xl bg-white/5 text-bee-300 ring-1 ring-white/10">
                    <Icon name={d.icon} size={20} />
                  </div>
                  <span className="text-[10px] uppercase tracking-[0.18em] text-white/30">
                    Demo
                  </span>
                </div>
                <div className="mt-5 font-display text-[20px] text-white tracking-[-0.01em]">
                  {d.title}
                </div>
                <p className="mt-2 text-[13.5px] leading-relaxed text-white/55">{d.desc}</p>

                <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-1.5 text-[12px] text-white/80 group-hover:border-bee-400/40 group-hover:text-bee-200 transition">
                  <Icon name="play" size={12} />
                  {d.cta}
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      <DemoModal demoId={open} onClose={() => setOpen(null)} />
    </section>
  );
}

// ---------------------------------------------------------------------------
// Modal shell
// ---------------------------------------------------------------------------
function DemoModal({ demoId, onClose }) {
  return (
    <AnimatePresence>
      {demoId && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-[80] bg-ink-950/80 backdrop-blur-xl p-4 sm:p-8 grid place-items-center"
        >
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.98 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-[640px] max-h-[90vh] overflow-y-auto card p-6 sm:p-8"
          >
            <button
              onClick={onClose}
              className="absolute right-4 top-4 rounded-lg p-1.5 text-white/60 hover:text-white hover:bg-white/5"
              aria-label="Закрыть"
            >
              <Icon name="close" size={18} />
            </button>
            {demoId === 'voice' && <VoiceDemo />}
            {demoId === 'telegram' && <TelegramDemo />}
            {demoId === 'whatsapp' && <WhatsAppDemo />}
            {demoId === 'callback' && <CallbackDemo />}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ---------------------------------------------------------------------------
// Voice demo
// ---------------------------------------------------------------------------
function VoiceDemo() {
  const clientRef = useRef(null);
  const isMountedRef = useRef(true);
  const [state, setState] = useState('idle'); // idle | connecting | live
  const [seconds, setSeconds] = useState(0);
  const [error, setError] = useState('');

  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
      if (clientRef.current) {
        try {
          clientRef.current.stopCall();
        } catch {
          // noop
        }
        clientRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (state !== 'live') return;
    const timer = setInterval(() => {
      setSeconds((value) => value + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [state]);

  async function start() {
    if (state !== 'idle') return;
    setError('');
    setSeconds(0);
    setState('connecting');
    try {
      const createRes = await startVoiceDemo();
      const accessToken = createRes.accessToken;
      if (!accessToken) {
        throw new Error('Не удалось получить access token для звонка');
      }

      const retell = new RetellWebClient();
      clientRef.current = retell;

      retell.on('call_started', () => {
        if (!isMountedRef.current) return;
        setState('live');
        setSeconds(0);
      });

      retell.on('call_ended', () => {
        if (!isMountedRef.current) return;
        setState('idle');
        setSeconds(0);
        clientRef.current = null;
      });

      retell.on('error', (retellError) => {
        console.error('[voice-demo] Retell SDK error:', retellError);
        if (!isMountedRef.current) return;
        setError('Не удалось продолжить звонок. Проверьте доступ к микрофону и попробуйте снова.');
        setState('idle');
        setSeconds(0);
        try {
          retell.stopCall();
        } catch {
          // noop
        }
        clientRef.current = null;
      });

      await retell.startCall({
        accessToken,
      });
      if (isMountedRef.current) {
        setState((prev) => (prev === 'connecting' ? 'live' : prev));
      }
    } catch (err) {
      console.error('[voice-demo] Start call error:', err);
      if (!isMountedRef.current) return;
      setState('idle');
      setSeconds(0);
      setError('Не удалось запустить звонок. Попробуйте ещё раз.');
      if (clientRef.current) {
        try {
          clientRef.current.stopCall();
        } catch {
          // noop
        }
        clientRef.current = null;
      }
    }
  }
  return (
    <div>
      <div className="eyebrow"><span className="dot" />Voice AI Demo</div>
      <h3 className="mt-4 font-display text-2xl text-white">Голосовой AI-агент</h3>
      <p className="mt-2 text-sm text-white/55">
        Нажмите «Начать» — запустится web-call в браузере: агент поздоровается, задаст вопросы и
        соберёт бриф.
      </p>

      <div className="mt-6 rounded-2xl border border-white/8 bg-ink-900/60 p-5">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className={`h-10 w-10 rounded-full bg-bee-400/15 grid place-items-center text-bee-300`}>
                <Icon name="voice" size={18} />
              </div>
              {state === 'live' && (
                <span className="absolute inset-0 rounded-full border border-bee-400/60 animate-ping" />
              )}
            </div>
            <div>
              <div className="text-sm text-white">BEE EYE · Voice</div>
              <div className="text-[11px] font-mono text-white/40">
                {state === 'idle' && 'offline'}
                {state === 'connecting' && 'connecting…'}
                {state === 'live' && <span className="text-bee-300">live · {formatLiveDuration(seconds)}</span>}
              </div>
            </div>
          </div>
          <button
            onClick={start}
            disabled={state !== 'idle'}
            className={`btn-primary !py-2 !px-4 text-[13px] ${state !== 'idle' ? 'opacity-60 pointer-events-none' : ''}`}
          >
            {state === 'idle' ? 'Начать' : state === 'connecting' ? 'Подключение…' : 'В эфире'}
          </button>
        </div>

        <div className="mt-5 flex items-end gap-1 h-10">
          {Array.from({ length: 32 }).map((_, i) => (
            <motion.span
              key={i}
              className="w-1 rounded-full bg-bee-400/70"
              animate={{
                height: state === 'live' ? [4, 18 + Math.random() * 18, 4] : 4,
              }}
              transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.03 }}
            />
          ))}
        </div>
        <div className="mt-4 text-[12px] text-white/50 font-mono">
          {state === 'live' ? '> Здравствуйте! Я голосовой ассистент BEE EYE...' : '> — готов к запуску —'}
        </div>
        {error && (
          <div className="mt-3 text-[12px] text-rose-300">
            {error}
          </div>
        )}
      </div>
    </div>
  );
}

function formatLiveDuration(totalSeconds) {
  const mm = String(Math.floor(totalSeconds / 60)).padStart(2, '0');
  const ss = String(totalSeconds % 60).padStart(2, '0');
  return `${mm}:${ss}`;
}

// ---------------------------------------------------------------------------
// Telegram demo
// ---------------------------------------------------------------------------
function TelegramDemo() {
  const [link, setLink] = useState(null);
  React.useEffect(() => {
    getTelegramLink().then((r) => setLink(r.url));
  }, []);
  return (
    <div>
      <div className="eyebrow"><span className="dot" />Telegram Bot Demo</div>
      <h3 className="mt-4 font-display text-2xl text-white">Telegram-бот для бизнеса</h3>
      <p className="mt-2 text-sm text-white/55">
        Превью диалога. В реальной версии бот собирает заявки, квалифицирует и отдаёт их менеджеру.
      </p>

      <div className="mt-6 rounded-2xl border border-white/8 bg-ink-900/60 p-4">
        <div className="space-y-2">
          <BubbleBot>Здравствуйте! Я AI-ассистент BEE EYE. Чем могу помочь?</BubbleBot>
          <BubbleUser>Нужен AI-агент на сайт</BubbleUser>
          <BubbleBot>Отлично! Пару вопросов для подбора решения 👇</BubbleBot>
          <BubbleBot>— Какая ниша?
— Сайт уже есть?
— Нужен голос или только чат?</BubbleBot>
        </div>
      </div>

      <a href={link || '#'} target="_blank" rel="noreferrer" className="btn-primary mt-6 w-full">
        <Icon name="telegram" size={16} />
        Открыть в Telegram
      </a>
    </div>
  );
}

// ---------------------------------------------------------------------------
// WhatsApp demo
// ---------------------------------------------------------------------------
function WhatsAppDemo() {
  const [link, setLink] = useState(null);
  React.useEffect(() => {
    getWhatsAppLink().then((r) => setLink(r.url));
  }, []);
  return (
    <div>
      <div className="eyebrow"><span className="dot" />WhatsApp Demo · Client Case</div>
      <h3 className="mt-4 font-display text-2xl text-white">Кейс: AI-агент в WhatsApp для турагентства</h3>
      <p className="mt-2 text-sm text-white/55">
        Это пример реального сценария, который мы сделали для клиента. По кнопке ниже откроется
        живой чат с AI-агентом турагентства в WhatsApp.
      </p>

      <div className="mt-6 rounded-2xl border border-emerald-500/15 bg-[#0b1514] p-4">
        <div className="space-y-2">
          <BubbleBot variant="wa">Здравствуйте! Я AI-помощник турагентства 👋</BubbleBot>
          <BubbleUser variant="wa">Нужен тур в Дубай на двоих в июне</BubbleUser>
          <BubbleBot variant="wa">Отлично! Подскажите бюджет, город вылета и желаемые даты.</BubbleBot>
          <BubbleUser variant="wa">Бюджет до 1 200 000 тг, вылет из Алматы</BubbleUser>
          <BubbleBot variant="wa">Принял. Подберу варианты и передам менеджеру с уже заполненным брифом.</BubbleBot>
        </div>
      </div>

      <a href={link || '#'} target="_blank" rel="noreferrer" className="btn-primary mt-6 w-full !bg-emerald-400 hover:!bg-emerald-300">
        <Icon name="whatsapp" size={16} />
        Открыть демо в WhatsApp
      </a>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Callback demo
// ---------------------------------------------------------------------------
function CallbackDemo() {
  const [phoneDigits, setPhoneDigits] = useState('');
  const [showPrefix, setShowPrefix] = useState(false);
  const [status, setStatus] = useState('idle'); // idle | sending | done
  const [error, setError] = useState('');
  async function submit(e) {
    e.preventDefault();
    const normalizedPhone = toRetellPhoneDigits(phoneDigits);
    if (!/^77\d{9}$/.test(normalizedPhone)) {
      setError('Мы звоним только по Казахстану. Укажите номер в формате 77XXXXXXXXX.');
      return;
    }
    setStatus('sending');
    setError('');
    try {
      await requestCallback({ phone: normalizedPhone, reason: 'demos_callback' });
      setStatus('done');
    } catch (err) {
      setStatus('idle');
      setError(err?.message || 'Не удалось запустить звонок. Попробуйте еще раз.');
    }
  }
  return (
    <div>
      <div className="eyebrow"><span className="dot" />AI Callback</div>
      <h3 className="mt-4 font-display text-2xl text-white">AI-агент перезвонит вам</h3>
      <p className="mt-2 text-sm text-white/55">
        Оставьте номер — наш Voice AI позвонит, поздоровается и соберёт первичный бриф. Звонок длится до 1 минуты.
      </p>

      {status !== 'done' ? (
        <form onSubmit={submit} className="mt-6 space-y-3">
          <div>
            <label className="text-[12px] text-white/50">Телефон</label>
            <input
              required
              type="tel"
              placeholder="+7 (___) ___-__-__"
              value={formatKzPhone(phoneDigits, showPrefix)}
              onChange={(e) => {
                const next = parseKzPhoneInput(e.target.value);
                setPhoneDigits(next.localDigits);
                setShowPrefix(next.showPrefix);
                if (error) setError('');
              }}
              inputMode="tel"
              autoComplete="tel"
              className="mt-1 w-full rounded-xl border border-white/10 bg-ink-900/60 px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-bee-400/50"
            />
          </div>
          {error && <div className="text-[12px] text-rose-300">{error}</div>}
          <button
            type="submit"
            disabled={status === 'sending'}
            className={`btn-primary w-full ${status === 'sending' ? 'opacity-60 pointer-events-none' : ''}`}
          >
            {status === 'sending' ? 'Подключаем AI…' : 'Заказать звонок'}
          </button>
          <p className="text-[11px] text-white/40">* Звоним на номера Казахстана в формате 77XXXXXXXXX.</p>
        </form>
      ) : (
        <div className="mt-6 rounded-xl border border-bee-400/30 bg-bee-400/5 p-5 text-center">
          <div className="grid mx-auto h-12 w-12 place-items-center rounded-full bg-bee-400/20 text-bee-300">
            <Icon name="check" size={22} />
          </div>
          <div className="mt-4 font-display text-lg text-white">AI-агент свяжется с вами</div>
          <p className="mt-1 text-sm text-white/55">Ориентировочное время — до 90 секунд.</p>
        </div>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Chat bubbles
// ---------------------------------------------------------------------------
function BubbleBot({ children, variant }) {
  return (
    <div className={`max-w-[85%] rounded-2xl rounded-tl-md px-4 py-2.5 text-[13.5px] whitespace-pre-line ${
      variant === 'wa' ? 'bg-white/[0.06] text-white/90' : 'bg-white/[0.05] text-white/90'
    }`}>
      {children}
    </div>
  );
}
function BubbleUser({ children, variant }) {
  return (
    <div className="flex justify-end">
      <div className={`max-w-[85%] rounded-2xl rounded-tr-md px-4 py-2.5 text-[13.5px] ${
        variant === 'wa' ? 'bg-emerald-500/20 text-emerald-100' : 'bg-bee-400/15 text-bee-100'
      }`}>
        {children}
      </div>
    </div>
  );
}
