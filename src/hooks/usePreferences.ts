import { useEffect, useState } from "react";
import { locales, type Locale } from "../i18n";

export type Theme = "light" | "dark";

const getInitialTheme = (): Theme => {
  const stored = localStorage.getItem("portfolio-theme");
  if (stored === "light" || stored === "dark") return stored;
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
};

export function usePreferences() {
  const [theme, setTheme] = useState<Theme>(getInitialTheme);
  const [locale, setLocale] = useState<Locale>(() => {
    const stored = localStorage.getItem("portfolio-locale");
    return locales.includes(stored as Locale) ? (stored as Locale) : "en";
  });

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem("portfolio-theme", theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem("portfolio-locale", locale);
    document.documentElement.lang = locale;
    document.documentElement.dir = locale === "he" || locale === "ar" ? "rtl" : "ltr";
  }, [locale]);

  return { theme, setTheme, locale, setLocale };
}
