import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from './ui/Icon.jsx';
import { submitLead, trackEvent } from '../lib/api.js';

// ============================================================================
// Форма заявки. Сейчас идёт в mock submitLead() из lib/api.js.
// Подключение к реальному backend: заменить submitLead() → POST /api/leads
// ============================================================================

const channels = [
  { id: 'whatsapp', label: 'WhatsApp' },
  { id: 'telegram', label: 'Telegram' },
  { id: 'phone', label: 'Телефон' },
  { id: 'email', label: 'E-mail' },
];

export default function LeadForm() {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    task: '',
    channel: 'whatsapp',
  });
  const [status, setStatus] = useState('idle'); // idle | sending | ok | error

  function update(k, v) {
    setForm((f) => ({ ...f, [k]: v }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus('sending');
    try {
      await submitLead(form);
      trackEvent('lead_submitted', { channel: form.channel });
      setStatus('ok');
    } catch (err) {
      setStatus('error');
    }
  }

  return (
    <section id="lead" className="relative py-24 sm:py-32">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-0 h-[500px] w-[900px] -translate-x-1/2 rounded-full bg-bee-400/10 blur-[130px]" />
      </div>
      <div className="container-beeeye relative">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-16 items-start">
          <div>
            <span className="eyebrow"><span className="dot" />Оставить заявку</span>
            <h2 className="mt-6 font-display text-[40px] sm:text-[52px] leading-[1.04] tracking-[-0.02em] text-grad">
              Расскажите о задаче — дадим предложение
            </h2>
            <p className="mt-5 text-base text-white/60 max-w-md leading-relaxed">
              Сначала дадим первичную оценку и предложим формат реализации. Никакого автомат-ответа — смотрим на вашу задачу вручную.
            </p>

            <ul className="mt-8 space-y-3 text-[14px] text-white/70">
              {[
                'Первичная обратная связь в день обращения',
                'Оценка стоимости и формата без обязательств',
                'Рекомендация связки инструментов',
              ].map((t) => (
                <li key={t} className="flex items-center gap-3">
                  <span className="grid h-6 w-6 place-items-center rounded-full bg-bee-400/15 text-bee-300 ring-1 ring-bee-400/20">
                    <Icon name="check" size={12} />
                  </span>
                  {t}
                </li>
              ))}
            </ul>
          </div>

          <div className="card p-6 sm:p-8">
            <AnimatePresence mode="wait">
              {status !== 'ok' ? (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  className="space-y-4"
                >
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Field
                      label="Имя"
                      value={form.name}
                      onChange={(v) => update('name', v)}
                      placeholder="Как к вам обращаться"
                      required
                    />
                    <Field
                      label="Телефон"
                      type="tel"
                      value={form.phone}
                      onChange={(v) => update('phone', v)}
                      placeholder="+7 (___) ___-__-__"
                      required
                    />
                  </div>
                  <Field
                    label="E-mail"
                    type="email"
                    value={form.email}
                    onChange={(v) => update('email', v)}
                    placeholder="you@company.com"
                  />
                  <div>
                    <label className="text-[12px] text-white/50">Что хотите реализовать</label>
                    <textarea
                      required
                      rows={4}
                      value={form.task}
                      onChange={(e) => update('task', e.target.value)}
                      placeholder="Коротко о задаче. Можно своими словами — мы поймём и предложим формат."
                      className="mt-1 w-full resize-none rounded-xl border border-white/10 bg-ink-900/60 px-4 py-3 text-[14px] text-white placeholder:text-white/30 focus:outline-none focus:border-bee-400/50 transition"
                    />
                  </div>
                  <div>
                    <div className="text-[12px] text-white/50">Удобный способ связи</div>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {channels.map((c) => (
                        <button
                          key={c.id}
                          type="button"
                          onClick={() => update('channel', c.id)}
                          className={`rounded-full border px-3.5 py-1.5 text-[12.5px] transition ${
                            form.channel === c.id
                              ? 'border-bee-400/50 bg-bee-400/10 text-bee-200'
                              : 'border-white/10 bg-white/[0.02] text-white/60 hover:text-white/90'
                          }`}
                        >
                          {c.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={status === 'sending'}
                    className={`btn-primary w-full mt-2 !py-4 text-[14px] ${status === 'sending' ? 'opacity-60 pointer-events-none' : ''}`}
                  >
                    {status === 'sending' ? 'Отправляем…' : 'Получить предложение'}
                    <Icon name="arrowRight" size={16} />
                  </button>
                  <p className="text-[11.5px] text-white/40 text-center">
                    * Сначала дадим первичную оценку и предложим формат реализации.
                  </p>
                </motion.form>
              ) : (
                <motion.div
                  key="ok"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-10 text-center"
                >
                  <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-bee-400/15 text-bee-300 ring-1 ring-bee-400/30">
                    <Icon name="check" size={24} />
                  </div>
                  <div className="mt-5 font-display text-[22px] text-white">Заявка отправлена</div>
                  <p className="mt-2 text-[14px] text-white/55 max-w-sm mx-auto">
                    Спасибо! Мы свяжемся с вами в ближайшее время в выбранном канале и дадим первичную оценку.
                  </p>
                  <button
                    onClick={() => setStatus('idle')}
                    className="btn-ghost mt-6 !py-2 !px-4 text-[13px]"
                  >
                    Отправить ещё одну
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}

function Field({ label, value, onChange, type = 'text', placeholder, required }) {
  return (
    <div>
      <label className="text-[12px] text-white/50">{label}</label>
      <input
        required={required}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="mt-1 w-full rounded-xl border border-white/10 bg-ink-900/60 px-4 py-3 text-[14px] text-white placeholder:text-white/30 focus:outline-none focus:border-bee-400/50 transition"
      />
    </div>
  );
}
