import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';

// A separate, standalone i18next instance used only in tests.
// No Backend/LanguageDetector plugins: no network requests, no Suspense wait —
// resources are provided inline and synchronously, so components render immediately.
i18next.use(initReactI18next).init({
  lng: 'en',
  fallbackLng: 'en',

  ns: ['common'],
  defaultNS: 'common',

  debug: false,

  interpolation: {
    escapeValue: false, // not needed for react!!
  },

  // Empty resources: missing keys fall back to returning the key itself,
  // which is fine for tests that assert on translation keys, not copy.
  resources: { en: { common: {} } },
});

export default i18next;
