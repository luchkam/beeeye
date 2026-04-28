// Registry for future company landing pages.
// Add entries here when a new landing is implemented.
//
// Example:
// import ZygomaCenterLanding from './zygoma-center/ZygomaCenterLanding.jsx';
//
// const landingRegistry = {
//   'zygoma-center': {
//     Component: ZygomaCenterLanding,
//     title: 'Zygoma Center',
//   },
// };

const landingRegistry = {};

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
