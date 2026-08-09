import { ArrowDown, ArrowUpRight, Download } from "lucide-react";
import { Header } from "./components/Header";
import { OrbitMark } from "./components/OrbitMark";
import { EducationSection, ExperienceSection, ProjectsSection, SkillsSection } from "./components/ResumeSections";
import { usePreferences } from "./hooks/usePreferences";
import { messages, rtlLocales } from "./i18n";

export function App() {
  const { theme, setTheme, locale, setLocale } = usePreferences();
  const copy = messages[locale];
  const direction = rtlLocales.has(locale) ? "rtl" : "ltr";

  return (
    <div className="app" lang={locale} dir={direction}>
      <Header {...{ locale, setLocale, theme, setTheme, copy }} />
      <main>
        <section className="hero section-shell" id="home">
          <div className="hero-copy">
            <p className="eyebrow">{copy.hero.eyebrow}</p>
            <h1>{copy.hero.titleBefore} <em>{copy.hero.titleAccent}</em> {copy.hero.titleAfter}</h1>
            <p className="hero-description">{copy.hero.description}</p>
            <div className="hero-actions">
              <a className="button button-primary" href="#work">{copy.hero.primary}<ArrowDown size={16} /></a>
              <a className="button button-secondary" href="/xin-li-resume.pdf" download>{copy.hero.secondary}<Download size={16} /></a>
            </div>
          </div>
          <div className="hero-visual">
            <OrbitMark label={copy.hero.orbitLabel} />
            <aside className="exploring-card"><small>{copy.hero.current}</small><strong>{copy.hero.currentValue}</strong></aside>
          </div>
          <a className="scroll-cue" href="#work"><span>{copy.common.scroll}</span><ArrowDown size={15} /></a>
        </section>
        <section className="fact-rail" aria-label="Professional summary">
          {copy.facts.map(([label, value], index) => <div key={label}><small>0{index + 1} / {label}</small><strong>{value}</strong></div>)}
        </section>
        <ExperienceSection locale={locale} />
        <ProjectsSection locale={locale} />
        <EducationSection locale={locale} />
        <SkillsSection locale={locale} />
        <section className="content-section section-shell contact" id="contact"><p className="eyebrow">05 / {copy.sections.contactKicker}</p><h2>{copy.sections.contactTitle}</h2><p>{copy.sections.contactBody}</p><div className="contact-links"><a className="button button-primary" href="mailto:xin.li@outlook.co.il">xin.li@outlook.co.il<ArrowUpRight size={16} /></a><a className="button button-secondary" href="https://linkedin.com/in/xin-li-5387a5169" target="_blank" rel="noreferrer">LinkedIn<ArrowUpRight size={16} /></a><a className="button button-secondary" href="https://github.com/Him97" target="_blank" rel="noreferrer">GitHub<ArrowUpRight size={16} /></a></div></section>
      </main>
    </div>
  );
}
