import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from './ui/Icon.jsx';
import { requestCallback } from '../lib/api.js';
import { formatKzPhone, parseKzPhoneInput, toRetellPhoneDigits } from '../lib/phone.js';

// ============================================================================
// Модалка "AI-агент перезвонит вам".
// ============================================================================

export default function CallbackModal({ open, onClose }) {
  const [phoneDigits, setPhoneDigits] = useState('');
  const [showPrefix, setShowPrefix] = useState(false);
  const [status, setStatus] = useState('idle');
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
      await requestCallback({ phone: normalizedPhone, reason: 'callback_modal' });
      setStatus('done');
    } catch (err) {
      setStatus('idle');
      setError(err?.message || 'Не удалось запустить звонок. Попробуйте еще раз.');
    }
  }

  function reset() {
    setStatus('idle');
    setPhoneDigits('');
    setShowPrefix(false);
    setError('');
    onClose();
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[95] grid place-items-center p-4 sm:p-8"
        >
          <div
            className="absolute inset-0 bg-ink-950/75 backdrop-blur-xl"
            onClick={reset}
          />
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.98 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-[520px] card p-6 sm:p-8"
          >
            <button
              onClick={reset}
              className="absolute right-4 top-4 rounded-lg p-1.5 text-white/60 hover:text-white hover:bg-white/5"
              aria-label="Закрыть"
            >
              <Icon name="close" size={18} />
            </button>

            {status !== 'done' ? (
              <>
                <div className="eyebrow"><span className="dot" />Voice AI callback</div>
                <h3 className="mt-4 font-display text-[26px] leading-tight text-white">
                  AI-агент перезвонит вам
                </h3>
                <p className="mt-2 text-[13.5px] text-white/55">
                  Оставьте номер — наш Voice AI позвонит в течение 90 секунд, поздоровается, задаст пару уточняющих вопросов и соберёт бриф.
                </p>

                <form onSubmit={submit} className="mt-6 space-y-4">
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
                      className="mt-1 w-full rounded-xl border border-white/10 bg-ink-900/60 px-4 py-3 text-[14px] text-white placeholder:text-white/30 focus:outline-none focus:border-bee-400/50 transition"
                    />
                  </div>
                  {error && <div className="text-[12px] text-rose-300">{error}</div>}
                  <button
                    type="submit"
                    disabled={status === 'sending'}
                    className={`btn-primary w-full !py-3.5 ${status === 'sending' ? 'opacity-60 pointer-events-none' : ''}`}
                  >
                    {status === 'sending' ? 'Запускаем AI…' : 'Заказать звонок'}
                    <Icon name="phone" size={16} />
                  </button>
                </form>
              </>
            ) : (
              <div className="py-6 text-center">
                <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-bee-400/15 text-bee-300 ring-1 ring-bee-400/30">
                  <Icon name="check" size={24} />
                </div>
                <div className="mt-5 font-display text-[22px] text-white">Заявка принята</div>
                <p className="mt-2 text-[13.5px] text-white/55 max-w-sm mx-auto">
                  AI-агент позвонит вам в ближайшее время и соберет первичный бриф.
                </p>
                <button onClick={reset} className="btn-ghost mt-6 !py-2 !px-4 text-[13px]">
                  Закрыть
                </button>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
