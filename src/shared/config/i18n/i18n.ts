import i18next, { i18n } from 'i18next';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector'; // Don't forget to use it!
import { initReactI18next } from 'react-i18next';

const translationApiUrl = 'http://localhost:3000'; // Base URL of your backend

i18next
  .use(Backend)
  .use(LanguageDetector) // Using LanguageDetector for automatic language detection
  .use(initReactI18next)
  .init({
    backend: {
      // loadPath should now point to your controller that accepts `ns` and `lng`
      // {{lng}} will be replaced with the current language
      // {{ns}} will be replaced with the requested namespace
      loadPath: `${translationApiUrl}/translations?lang={{lng}}&ns={{ns}}`,
      // request(options, url, payload, callback) {},
    },
    // debug is used to enable/disable debug mode
    debug: __IS_DEV__,
    fallbackLng: 'en',
    // List of all available namespaces
    ns: ['common'], // <--- VERY IMPORTANT: Define all your namespaces here
    defaultNS: 'common', // <--- Default namespace. If not specified, 'common' is used.
    // If you want to load all namespaces at startup:
    // load: 'all',
    // But it's better to load them as needed (lazy loading)
    // i18next-http-backend will request them by default as they are accessed.
    // interpolation is used to format values in translations
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: true, // Leave as false for manual isLoading
    },
  });
export const initI18n: i18n = i18next;
