import { Languages, Menu, Moon, Sun, X } from "lucide-react";
import { useState } from "react";
import { localeNames, locales, type Locale, type Messages } from "../i18n";
import type { Theme } from "../hooks/usePreferences";
import type { SectionId } from "../hooks/useActiveSection";

type HeaderProps = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  theme: Theme;
  setTheme: (theme: Theme) => void;
  copy: Messages;
  activeSection: SectionId;
};

export function Header({
  locale,
  setLocale,
  theme,
  setTheme,
  copy,
  activeSection,
}: HeaderProps) {
  const [open, setOpen] = useState(false);
  const [languagesOpen, setLanguagesOpen] = useState(false);
  const links: Array<[SectionId, string]> = [
    ["home", copy.nav.home],
    ["experience", copy.nav.experience],
    ["work", copy.nav.work],
    ["profile", copy.nav.profile],
    ["contact", copy.nav.contact],
  ];

  return (
    <header className="site-header">
      <a className="brand" href="#home" aria-label="Xin Li — home">
        <span />
        {copy.nav.name}
      </a>
      <nav
        className={open ? "site-nav is-open" : "site-nav"}
        aria-label="Primary navigation"
      >
        {links.map(([id, label], index) => (
          <a
            className={activeSection === id ? "is-active" : ""}
            aria-current={activeSection === id ? "location" : undefined}
            href={`#${id}`}
            key={id}
            onClick={() => setOpen(false)}
          >
            <small>0{index + 1}</small>
            {label}
          </a>
        ))}
      </nav>
      <div className="header-actions">
        <div className="language-picker">
          <button
            className="icon-button language-trigger"
            aria-label={copy.common.language}
            aria-expanded={languagesOpen}
            onClick={() => setLanguagesOpen(!languagesOpen)}
          >
            <Languages size={17} />
            <span>{localeNames[locale]}</span>
          </button>
          {languagesOpen && (
            <div className="language-menu">
              {locales.map((item) => (
                <button
                  className={item === locale ? "is-active" : ""}
                  key={item}
                  onClick={() => {
                    setLocale(item);
                    setLanguagesOpen(false);
                  }}
                >
                  {localeNames[item]}
                </button>
              ))}
            </div>
          )}
        </div>
        <button
          className="icon-button theme-button"
          aria-label={copy.common.theme}
          onClick={() => setTheme(theme === "light" ? "dark" : "light")}
        >
          {theme === "light" ? <Moon size={17} /> : <Sun size={17} />}
        </button>
        <button
          className="icon-button menu-button"
          aria-label={open ? copy.common.close : copy.common.menu}
          aria-expanded={open}
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={19} /> : <Menu size={19} />}
        </button>
      </div>
    </header>
  );
}
