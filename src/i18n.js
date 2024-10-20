import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import translationEN from './locales/en/translate.json';
import translationHN from './locales/hn/translate.json';
import translationTG from './locales/tg/translate.json';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: translationEN
      },
      hn: {
        translation: translationHN
      },
      tg: {
        translation: translationTG
      }
    },
    fallbackLng: 'en', // Default language
    debug: true,
    interpolation: {
      escapeValue: false // React already handles escaping
    }
  });

export default i18n;
