import React from 'react';

// Мини-библиотека иконок. 1.5px stroke, currentColor.
const common = {
  width: 20,
  height: 20,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.5,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
};

const paths = {
  bot: (
    <>
      <rect x="3" y="7" width="18" height="13" rx="3" />
      <circle cx="9" cy="13" r="1" />
      <circle cx="15" cy="13" r="1" />
      <path d="M12 3v4" />
      <circle cx="12" cy="3" r="1" />
      <path d="M7 17h10" />
    </>
  ),
  voice: (
    <>
      <rect x="9" y="3" width="6" height="12" rx="3" />
      <path d="M5 11a7 7 0 0 0 14 0" />
      <path d="M12 18v3" />
      <path d="M9 21h6" />
    </>
  ),
  whatsapp: (
    <>
      <path d="M20.5 11.5a8.5 8.5 0 0 1-12.7 7.4L3 20.5l1.7-4.6A8.5 8.5 0 1 1 20.5 11.5z" />
      <path d="M9 9.2c.2-.4.5-.5.7-.5h.5c.2 0 .4.1.5.4l.6 1.4c.1.2 0 .5-.1.7l-.4.4c-.2.2-.2.4-.1.6.5.9 1.2 1.6 2.1 2.1.2.1.4.1.6-.1l.4-.4c.2-.1.5-.2.7-.1l1.4.6c.3.1.4.3.4.5v.5c0 .2-.1.5-.5.7-.6.4-1.4.6-2.1.5-2.4-.4-4.7-2.6-5-5-.2-.7 0-1.5.4-2.1z" />
    </>
  ),
  instagram: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" />
    </>
  ),
  threads: (
    <>
      <circle cx="12" cy="12" r="3.5" />
      <path d="M15.5 12v1.3a2.5 2.5 0 0 0 5 0V12a9 9 0 1 0-3.6 7.2" />
    </>
  ),
  facebook: (
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  ),
  monitor: (
    <>
      <rect x="2" y="4" width="20" height="13" rx="2" />
      <path d="M8 21h8" />
      <path d="M12 17v4" />
    </>
  ),
  layers: (
    <>
      <path d="M12 3 2 9l10 6 10-6-10-6z" />
      <path d="m2 15 10 6 10-6" />
    </>
  ),
  target: (
    <>
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="12" cy="12" r="1.5" />
    </>
  ),
  plug: (
    <>
      <path d="M9 2v4" />
      <path d="M15 2v4" />
      <rect x="7" y="6" width="10" height="6" rx="2" />
      <path d="M12 12v4a4 4 0 0 1-4 4" />
    </>
  ),
  arrowRight: <path d="M5 12h14m-6-6 6 6-6 6" />,
  arrowUpRight: <path d="M7 17 17 7M7 7h10v10" />,
  check: <path d="m5 12 4 4L19 7" />,
  close: <path d="M6 6l12 12M6 18 18 6" />,
  phone: (
    <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z" />
  ),
  globe: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" />
    </>
  ),
  crm: (
    <>
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <path d="M3 9h18M8 14h4" />
    </>
  ),
  call: <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z" />,
  form: (
    <>
      <rect x="4" y="3" width="16" height="18" rx="2" />
      <path d="M8 8h8M8 12h8M8 16h5" />
    </>
  ),
  brief: (
    <>
      <rect x="4" y="4" width="16" height="16" rx="2" />
      <path d="M8 9h8M8 13h8M8 17h5" />
    </>
  ),
  send: <path d="m4 12 16-8-6 18-3-8-7-2z" />,
  pen: <path d="M4 20h4L20 8l-4-4L4 16v4z" />,
  clock: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </>
  ),
  sparkle: (
    <path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M6 18l2.5-2.5M15.5 8.5 18 6" />
  ),
  play: <path d="M7 5v14l12-7-12-7z" />,
  chevronDown: <path d="m6 9 6 6 6-6" />,
  chevronRight: <path d="m9 6 6 6-6 6" />,
  menu: <path d="M4 7h16M4 12h16M4 17h16" />,
  telegram: (
    <path d="m21 4-9 16-3-7-7-3 19-6z" />
  ),
  eye: (
    <>
      <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z" />
      <circle cx="12" cy="12" r="3" />
    </>
  ),
  shield: <path d="M12 3 4 6v6c0 5 4 8 8 9 4-1 8-4 8-9V6l-8-3z" />,
  zap: <path d="M13 2 4 14h7l-1 8 9-12h-7l1-8z" />,
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </>
  ),
};

export default function Icon({ name, className = '', size = 20 }) {
  const body = paths[name] || paths.sparkle;
  return (
    <svg {...common} width={size} height={size} className={className} aria-hidden="true">
      {body}
    </svg>
  );
}
