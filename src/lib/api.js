// ============================================================================
// BEE EYE — слой интеграции с будущим backend.
//
// СЕЙЧАС: submitLead/requestCallback/startVoiceDemo/sendChatMessage уже ходят в реальный backend.
// getTelegramLink/getWhatsAppLink/trackEvent пока остаются mock.
//
// ЧТО ПОДКЛЮЧАТЬ ПОЗЖЕ:
//   1) submitLead       -> POST /api/leads            (форма обратной связи)
//   2) requestCallback  -> POST /api/voice/callback   ("AI-агент перезвонит вам")
//   3) startVoiceDemo   -> POST /api/retell/create-web-call (Retell web call)
//   4) sendChatMessage  -> POST /api/chat/message     (встроенный AI-агент на сайт)
//   5) getTelegramLink  -> GET  /api/telegram/link    (deep link в Telegram-бота)
//   6) getWhatsAppLink  -> GET  /api/whatsapp/link    (deep link в WhatsApp)
//   7) trackEvent       -> POST /api/analytics/event  (аналитика / CRM hooks)
// ============================================================================

// 1) Lead form
export async function submitLead(payload) {
  const res = await fetch('/api/leads', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  const data = await res.json().catch(() => null);
  if (!res.ok || !data?.ok) {
    throw new Error(data?.error || 'Lead submit failed');
  }
  return data;
}

// 2) Callback from AI voice agent
export async function requestCallback({ phone, reason }) {
  const phoneDigits = String(phone || '').replace(/\D+/g, '');
  if (!/^77\d{9}$/.test(phoneDigits)) {
    throw new Error('Мы звоним только по Казахстану. Укажите номер в формате 77XXXXXXXXX.');
  }

  const res = await fetch('/api/voice/callback', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      phone: phoneDigits,
      reason: reason || 'website_callback',
      pageUrl: typeof window !== 'undefined' ? window.location.href : '',
    }),
  });
  const data = await res.json().catch(() => null);
  if (!res.ok || !data?.ok) {
    throw new Error(data?.error || 'Callback request failed');
  }
  return data;
}

// 3) Voice demo
export async function startVoiceDemo() {
  const res = await fetch('/api/retell/create-web-call', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      source: 'voice_demo_modal',
      pageUrl: typeof window !== 'undefined' ? window.location.href : '',
    }),
  });
  const data = await res.json().catch(() => null);
  if (!res.ok || !data?.ok || !data?.accessToken) {
    throw new Error(data?.error || 'Failed to create Retell web call');
  }
  return data;
}

// 4) In-site AI chat
export async function sendChatMessage(history, text) {
  // Backend endpoint: POST /api/chat/message
  // NOTE: В UI нет отдельного catch для chat-ошибок, поэтому здесь всегда
  // возвращаем валидный объект (ok/reply), даже если сеть/бэк упали.
  try {
    const res = await fetch('/api/chat/message', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ history, text }),
    });

    const data = await res.json().catch(() => null);
    if (!res.ok || !data?.ok || !data?.reply) {
      return {
        ok: true,
        reply: 'Не удалось получить ответ от AI-агента. Попробуйте ещё раз через несколько секунд.',
      };
    }

    return { ok: true, reply: data.reply };
  } catch {
    return {
      ok: true,
      reply: 'Сейчас есть проблема с соединением. Попробуйте ещё раз чуть позже.',
    };
  }
}

// 5) Telegram deep link
export async function getTelegramLink() {
  return { ok: true, url: 'https://t.me/beeeye_demo_bot' };
}

// 6) WhatsApp deep link
export async function getWhatsAppLink() {
  return { ok: true, url: 'https://wa.me/77710852911?text=Здравствуйте%2C%20хочу%20посмотреть%20демо%20AI-%D0%B0%D0%B3%D0%B5%D0%BD%D1%82%D0%B0%20%D0%B4%D0%BB%D1%8F%20%D1%82%D1%83%D1%80%D0%B0%D0%B3%D0%B5%D0%BD%D1%82%D1%81%D1%82%D0%B2%D0%B0' };
}

// 7) Analytics
export async function trackEvent(name, data = {}) {
  if (typeof window !== 'undefined') {
    console.debug('[track]', name, data);
  }
}
