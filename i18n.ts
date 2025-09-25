import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

import ar from "./messages/ar.json";
import en from "./messages/en.json";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: "en",
    supportedLngs: ["en", "ar"],
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ["localStorage", "cookie", "htmlTag", "navigator"],
      caches: ["localStorage", "cookie"],
    },
    resources: {
      en: { translation: en },
      ar: { translation: ar },
    },
  });

export default i18n;
