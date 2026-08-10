import { ArrowDown, Download, Mail } from "lucide-react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import { useRef } from "react";
import { siGithub } from "simple-icons";
import { Header } from "./components/Header";
import { InfoChip } from "./components/InfoChip";
import { OrbitMark } from "./components/OrbitMark";
import {
  ExperienceSection,
  ProfileSection,
  ProjectsSection,
} from "./components/ResumeSections";
import { usePreferences } from "./hooks/usePreferences";
import { useActiveSection } from "./hooks/useActiveSection";
import { messages, rtlLocales } from "./i18n";

const linkedInPath =
  "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1 0-4.124 2.062 2.062 0 0 1 0 4.124zM7.119 20.452H3.555V9h3.564v11.452z";

function BrandIcon({ path }: { path: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24">
      <path d={path} />
    </svg>
  );
}

function ContactDetails({ size }: { size?: "sm" | "md" | "lg" }) {
  return (
    <div className="contact-links">
      <InfoChip
        href="mailto:xin.li@outlook.co.il"
        icon={<Mail aria-hidden="true" />}
        size={size}
      >
        xin.li@outlook.co.il
      </InfoChip>
      <InfoChip
        href="https://linkedin.com/in/xin-li-5387a5169"
        icon={<BrandIcon path={linkedInPath} />}
        label="Xin Li on LinkedIn"
        size={size}
        target="_blank"
        rel="noreferrer"
      >
        LinkedIn
      </InfoChip>
      <InfoChip
        href="https://github.com/him-li"
        icon={<BrandIcon path={siGithub.path} />}
        label="Xin Li on GitHub"
        size={size}
        target="_blank"
        rel="noreferrer"
      >
        GitHub
      </InfoChip>
    </div>
  );
}

export function App() {
  const { theme, setTheme, locale, setLocale } = usePreferences();
  const copy = messages[locale];
  const direction = rtlLocales.has(locale) ? "rtl" : "ltr";
  const activeSection = useActiveSection();
  const heroRef = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroCopyY = useTransform(
    heroProgress,
    [0, 1],
    [0, reducedMotion ? 0 : 90],
  );
  const heroVisualY = useTransform(
    heroProgress,
    [0, 1],
    [0, reducedMotion ? 0 : -70],
  );
  const heroOpacity = useTransform(heroProgress, [0, 0.82], [1, 0.22]);

  return (
    <div className="app" lang={locale} dir={direction}>
      <motion.div
        className="scroll-progress"
        style={{ scaleX: scrollYProgress }}
      />
      <Header
        {...{ locale, setLocale, theme, setTheme, copy, activeSection }}
      />
      <main>
        <section className="hero section-shell" id="home" ref={heroRef}>
          <motion.div
            className="hero-copy"
            style={{ y: heroCopyY, opacity: heroOpacity }}
          >
            <ContactDetails size="sm" />
            <h1 className="pt-6">
              {copy.hero.titleBefore} <em>{copy.hero.titleAccent}</em>{" "}
              {copy.hero.titleAfter}
            </h1>
            <p className="hero-description">{copy.hero.description}</p>
            <div className="hero-actions">
              <a className="button button-primary" href="#work">
                {copy.hero.primary}
                <ArrowDown size={16} />
              </a>
              <a
                className="button button-secondary"
                href="/xin-li-resume.pdf"
                download
              >
                {copy.hero.secondary}
                <Download size={16} />
              </a>
            </div>
          </motion.div>
          <motion.div
            className="hero-visual"
            style={{ y: heroVisualY, opacity: heroOpacity }}
          >
            <OrbitMark label={copy.hero.orbitLabel} theme={theme} />
            <aside className="exploring-card">
              <small>{copy.hero.current}</small>
              <strong>{copy.hero.currentValue}</strong>
            </aside>
          </motion.div>
          <a className="scroll-cue" href="#work">
            <span>{copy.common.scroll}</span>
            <ArrowDown size={15} />
          </a>
        </section>
        <section className="fact-rail" aria-label="Professional summary">
          {copy.facts.map(([label, value], index) => (
            <div key={label}>
              <small>
                0{index + 1} / {label}
              </small>
              <strong>{value}</strong>
            </div>
          ))}
        </section>
        <ExperienceSection locale={locale} />
        <ProjectsSection locale={locale} />
        <ProfileSection locale={locale} />
        <section className="content-section section-shell contact" id="contact">
          <p className="eyebrow">04 / {copy.sections.contactKicker}</p>
          <h2>{copy.sections.contactTitle}</h2>
          <p>{copy.sections.contactBody}</p>
          <ContactDetails size="lg" />
        </section>
      </main>
    </div>
  );
}
