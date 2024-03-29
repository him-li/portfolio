import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import EN from './src/locales/en.json'
import HE from './src/locales/he.json';
import ZH_HANS from './src/locales/zh_hans.json';
import ZH_HANT from './src/locales/zh_hant.json';

const resources = {
  en: {
    translation: EN
  },
  he: {
    translation: HE
  },
  zh_hans: {
    translation: ZH_HANS
  },
  zh_hant: {
    translation: ZH_HANT
  },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: localStorage.getItem('language')||"en",
    debug: true,
    fallbackLng: localStorage.getItem('language') ?? 'en',
    interpolation: {
      escapeValue: false
    },
    ns: "translation",
    defaultNS: "translation"
  });

export default i18n;