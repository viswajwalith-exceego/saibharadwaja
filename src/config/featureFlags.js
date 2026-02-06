/**
 * Menu items and their React vs legacy URLs.
 * Matches keys in public/feature-flags.js (window.FEATURE_FLAGS).
 * Layout uses this + window.FEATURE_FLAGS to render Link vs <a href>.
 *
 * Canonical menu order (match legacy):
 *   Top row:    Acharya Sri Ekkirala Bharadwaja ★ Divyajanani Alivelu Mangamma
 *   Bottom row: Books ★ Saibaba Magazine ★ Speeches & Videos ★ Photos ★ Contacts ★ Calendar ★ Home
 */
const REACT_BASE = typeof window !== 'undefined' && window.REACT_BASE ? window.REACT_BASE : '/New'

export const MENU_ROUTES = [
  { flag: 'home', reactPath: '/', legacyUrl: '/Default.aspx', label: 'Home', isLogo: true },
  { flag: 'acharya', reactPath: '/about/acharya', legacyUrl: '/pages/acharyaeb.aspx', label: 'Acharya Sri Ekkirala Bharadwaja' },
  { flag: 'divyajanani', reactPath: '/about/divyajanani', legacyUrl: '/pages/Ammagaru/divyajanani.aspx', label: 'Divyajanani Alivelu Mangamma' },
  { flag: 'books', reactPath: '/books', legacyUrl: '/pages/sbbooks/sbbooksTel.html', label: 'Books' },
  { flag: 'magazine', reactPath: '/magazine', legacyUrl: '/pages/magazine.aspx', label: 'Saibaba Magazine' },
  { flag: 'speechesVideos', reactPath: '/media/speeches-videos', legacyUrl: '/pages/sbmedia/sbplayTel.html', label: 'Speeches & Videos' },
  { flag: 'photos', reactPath: '/media/photos', legacyUrl: '/photos/gallery1.aspx', label: 'Photos' },
  { flag: 'contact', reactPath: '/contact', legacyUrl: '/pages/contacts.aspx', label: 'Contacts', strong: true },
  { flag: 'calendar', reactPath: '/calendar', legacyUrl: '/pages/calander.aspx', label: 'Calender', strong: true }
]

/** Get current flags; empty if script not loaded */
export function getFlags() {
  if (typeof window === 'undefined') return {}
  return window.FEATURE_FLAGS || {}
}

/** True only when this menu item is explicitly enabled for React. Otherwise use legacy URL. */
export function useReact(flagKey) {
  const flags = getFlags()
  return flags[flagKey] === true
}

export { REACT_BASE }
