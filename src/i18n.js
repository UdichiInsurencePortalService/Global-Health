import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpApi from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(HttpApi) // load translations using http (default public/locales)
  .use(LanguageDetector) // detect user language
  .use(initReactI18next) // pass i18n instance to react-i18next
  .init({
    fallbackLng: 'en',  // fallback language
    supportedLngs: ['en', 'hi'],  // supported languages
    debug: false,

    interpolation: {
      escapeValue: false, // React already safe from xss
    },

    backend: {
      loadPath: '/locales/{{lng}}/translation.json',
    },
  });

export default i18n;
