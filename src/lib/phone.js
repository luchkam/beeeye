export function parseKzPhoneInput(rawValue) {
  const raw = String(rawValue || '');
  let digits = raw.replace(/\D+/g, '');

  if (!digits) {
    return { localDigits: '', showPrefix: false };
  }

  // Trunk prefix for KZ numbers: 8XXXXXXXXXX -> 7XXXXXXXXXX
  if (digits.startsWith('8')) {
    digits = `7${digits.slice(1)}`;
  }

  // User typed only country code start, keep +7 visible and wait for local digits.
  if (digits === '7') {
    return { localDigits: '', showPrefix: true };
  }

  const hasExplicitCountryCode = raw.trim().startsWith('+7') || digits.length === 11;
  if (hasExplicitCountryCode && digits.startsWith('7')) {
    digits = digits.slice(1);
  }

  return {
    localDigits: digits.slice(0, 10),
    showPrefix: true,
  };
}

export function formatKzPhone(localDigits, showPrefix = false) {
  const digits = String(localDigits || '').replace(/\D+/g, '').slice(0, 10);
  if (!digits && !showPrefix) return '';

  let out = '+7';
  if (!digits) return out;

  const a = digits.slice(0, 3);
  const b = digits.slice(3, 6);
  const c = digits.slice(6, 8);
  const d = digits.slice(8, 10);

  out += ` (${a}`;
  if (a.length === 3) out += ')';
  if (b) out += ` ${b}`;
  if (c) out += `-${c}`;
  if (d) out += `-${d}`;

  return out;
}

export function toRetellPhoneDigits(localDigits) {
  const local = String(localDigits || '').replace(/\D+/g, '').slice(0, 10);
  return `7${local}`;
}
