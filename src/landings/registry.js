// Registry for company landing pages.
// To add a new landing:
//   1. Create src/landings/<slug>/<Component>.jsx
//   2. Import it here and add to landingRegistry under its URL slug.

import ZygomaCenterLanding from './zygoma-center/ZygomaCenterLanding.jsx';
import AkzhayikStomLanding from './akzhayik-stom/AkzhayikStomLanding.jsx';

const landingRegistry = {
  'zygoma-center': {
    Component: ZygomaCenterLanding,
    title: 'Zygoma Center by dr. Utegenov',
  },
  'akzhayik-stom': {
    Component: AkzhayikStomLanding,
    title: 'Стоматология Акжайык',
  },
};

export function normalizePathToSlug(pathname = '/') {
  const cleaned = String(pathname || '/').split('?')[0].split('#')[0];
  const segments = cleaned.split('/').filter(Boolean);
  if (segments.length !== 1) return null;
  return decodeURIComponent(segments[0]).toLowerCase();
}

export function getLandingBySlug(slug) {
  if (!slug) return null;
  return landingRegistry[slug] || null;
}

export function getLandingFromPath(pathname = '/') {
  const slug = normalizePathToSlug(pathname);
  if (!slug) return null;
  return getLandingBySlug(slug);
}

export { landingRegistry };
