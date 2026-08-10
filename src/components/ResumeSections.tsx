import {
  ArrowUpRight,
  ChevronDown,
  SlidersHorizontal,
  X,
} from "lucide-react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  type MotionProps,
} from "motion/react";
import { useState } from "react";
import {
  siCss,
  siExpress,
  siFastapi,
  siGit,
  siHtml5,
  siJavascript,
  siMongodb,
  siMui,
  siNextdotjs,
  siNodedotjs,
  siPython,
  siReact,
  siTailwindcss,
  siTypescript,
} from "simple-icons";
import {
  education,
  experiences,
  languages,
  projects,
  resumeLabels,
  skillGroups,
  type ProjectStatus,
} from "../data/resume";
import type { Locale } from "../i18n";
import { InfoChip } from "./InfoChip";

const iconMap = {
  React: siReact,
  TypeScript: siTypescript,
  JavaScript: siJavascript,
  "Next.js": siNextdotjs,
  HTML5: siHtml5,
  CSS: siCss,
  "Tailwind CSS": siTailwindcss,
  MUI: siMui,
  Python: siPython,
  FastAPI: siFastapi,
  "Node.js": siNodedotjs,
  Express: siExpress,
  MongoDB: siMongodb,
  Git: siGit,
};

function SkillIcon({ name }: { name: string }) {
  const icon = iconMap[name as keyof typeof iconMap];
  if (!icon)
    return (
      <span className="skill-fallback" aria-hidden="true">
        {Array.from(name)[0]?.toUpperCase()}
      </span>
    );
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24">
      <path d={icon.path} />
    </svg>
  );
}

function periodSortValue(period: string) {
  const years = period.match(/\d{4}/g)?.map(Number) ?? [];
  const start = years[0] ?? 0;
  const end = /present|current|now/i.test(period)
    ? Number.MAX_SAFE_INTEGER
    : (years.at(-1) ?? start);
  return { end, start };
}

const chronologicalEducation = [...education].sort((a, b) => {
  const aPeriod = periodSortValue(a.period);
  const bPeriod = periodSortValue(b.period);
  return bPeriod.end - aPeriod.end || bPeriod.start - aPeriod.start;
});

function useRevealProps(): MotionProps {
  const reducedMotion = useReducedMotion();
  return reducedMotion
    ? { initial: false }
    : {
        initial: { opacity: 0, y: 38 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, amount: 0.16 },
        transition: { duration: 0.62, ease: [0.22, 1, 0.36, 1] },
      };
}

export function ExperienceSection({ locale }: { locale: Locale }) {
  const labels = resumeLabels;
  const [expanded, setExpanded] = useState<string | null>(experiences[0].id);
  const reveal = useRevealProps();
  return (
    <motion.section className="resume-section section-shell" id="experience">
      <motion.header className="section-heading" {...reveal}>
        <p className="eyebrow">01 / {labels.experience[locale]}</p>
        <h2>{labels.experienceTitle[locale]}</h2>
      </motion.header>
      <div className="career-timeline">
        {experiences.map((job, index) => {
          const isExpanded = expanded === job.id;
          return (
            <motion.article
              className="career-entry"
              key={job.id}
              {...reveal}
              transition={{ duration: 0.56, delay: index * 0.08 }}
            >
              <div className="career-node" />
              <div className="career-background" aria-hidden="true">
                <div
                  className="career-background__image"
                  style={{ backgroundImage: `url(${job.cover})` }}
                />
                <div className="career-background__overlay" />
              </div>
              <div className="company-mark">
                <img src={job.logo} alt="" />
              </div>
              <div className="career-content">
                <div className="career-meta">
                  <div>
                    <h3>{job.role[locale]}</h3>
                    <p>
                      {job.company} · {job.location[locale]}
                    </p>
                  </div>
                  <time>{job.period}</time>
                </div>
                <p className="career-summary">{job.summary[locale]}</p>
                <button
                  className="detail-toggle"
                  aria-expanded={isExpanded}
                  onClick={() => setExpanded(isExpanded ? null : job.id)}
                >
                  {isExpanded
                    ? labels.hideDetails[locale]
                    : labels.viewDetails[locale]}
                  <ChevronDown size={15} />
                </button>
                <AnimatePresence initial={false}>
                  {isExpanded && (
                    <motion.ul
                      className="career-details"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.32 }}
                    >
                      {job.bullets.map((bullet) => (
                        <li key={bullet.en}>{bullet[locale]}</li>
                      ))}
                    </motion.ul>
                  )}
                </AnimatePresence>
              </div>
            </motion.article>
          );
        })}
      </div>
    </motion.section>
  );
}

export function ProjectsSection({ locale }: { locale: Locale }) {
  const statusCopy = {
    featured: resumeLabels.featured[locale],
    developing: resumeLabels.developing[locale],
    repository: resumeLabels.repository[locale],
  };
  const [filter, setFilter] = useState<"all" | ProjectStatus>("all");
  const [expanded, setExpanded] = useState<string | null>(null);
  const reveal = useRevealProps();
  const filters: Array<{ id: "all" | ProjectStatus; label: string }> = [
    { id: "all", label: resumeLabels.allProjects[locale] },
    { id: "featured", label: resumeLabels.featured[locale] },
    { id: "developing", label: resumeLabels.developing[locale] },
    { id: "repository", label: resumeLabels.repository[locale] },
  ];
  const visibleProjects =
    filter === "all"
      ? projects
      : projects.filter((project) => project.status === filter);
  return (
    <motion.section
      className="resume-section project-section section-shell"
      id="work"
    >
      <motion.header className="section-heading" {...reveal}>
        <p className="eyebrow">02 / {resumeLabels.projects[locale]}</p>
        <h2>{resumeLabels.projectsTitle[locale]}</h2>
      </motion.header>
      <motion.div
        className="project-filters"
        {...reveal}
        role="group"
        aria-label={resumeLabels.projects[locale]}
      >
        <SlidersHorizontal size={16} aria-hidden="true" />
        {filters.map((item) => (
          <button
            className={filter === item.id ? "is-active" : ""}
            aria-pressed={filter === item.id}
            key={item.id}
            onClick={() => {
              setFilter(item.id);
              setExpanded(null);
            }}
          >
            {item.label}
          </button>
        ))}
      </motion.div>
      <div className="project-grid">
        <AnimatePresence mode="popLayout">
          {visibleProjects.map((project) => (
            <motion.article
              className={`project-card ${project.status === "featured" && filter === "all" ? "is-featured" : ""}`}
              layout
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.94 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              key={project.id}
            >
              <img src={project.image} alt="" />
              <div className="project-overlay" />
              <div className="project-card-content">
                <span>{statusCopy[project.status]}</span>
                <h3>{project.title}</h3>
                <p>{project.description[locale]}</p>
                <footer>
                  <div className="project-stack">
                    {project.stack.map((technology) => (
                      <InfoChip
                        icon={<SkillIcon name={technology} />}
                        key={technology}
                        variant="soft"
                      >
                        {technology}
                      </InfoChip>
                    ))}
                  </div>
                  <div className="project-actions">
                    <button
                      aria-expanded={expanded === project.id}
                      onClick={() =>
                        setExpanded(expanded === project.id ? null : project.id)
                      }
                    >
                      {expanded === project.id ? (
                        <X size={14} />
                      ) : (
                        <ChevronDown size={14} />
                      )}
                      {expanded === project.id
                        ? resumeLabels.collapseProject[locale]
                        : resumeLabels.expandProject[locale]}
                    </button>
                    <a href={project.href} target="_blank" rel="noreferrer">
                      {resumeLabels.viewProject[locale]}{" "}
                      <ArrowUpRight size={15} />
                    </a>
                  </div>
                </footer>
                <AnimatePresence initial={false}>
                  {expanded === project.id && (
                    <motion.div
                      className="project-details"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                    >
                      <p>{project.details[locale]}</p>
                      <div>
                        {project.stack.map((technology) => (
                          <InfoChip
                            icon={<SkillIcon name={technology} />}
                            key={technology}
                            variant="soft"
                          >
                            {technology}
                          </InfoChip>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.article>
          ))}
        </AnimatePresence>
      </div>
    </motion.section>
  );
}

export function ProfileSection({ locale }: { locale: Locale }) {
  const reveal = useRevealProps();
  return (
    <motion.section
      className="resume-section skills-section section-shell"
      id="profile"
    >
      <motion.header className="section-heading" {...reveal}>
        <p className="eyebrow">03 / {resumeLabels.skills[locale]}</p>
        <h2>{resumeLabels.skillsTitle[locale]}</h2>
      </motion.header>
      <div className="profile-layout">
        <div className="profile-capabilities">
          <div className="skill-groups">
            {skillGroups.map((group) => (
              <motion.article key={group.id} {...reveal}>
                <h3>{group.title[locale]}</h3>
                <div className="chip-cloud">
                  {group.skills.map((skill) => (
                    <InfoChip icon={<SkillIcon name={skill} />} key={skill}>
                      {skill}
                    </InfoChip>
                  ))}
                </div>
              </motion.article>
            ))}
          </div>
          <motion.div className="language-section" {...reveal}>
            <p className="eyebrow">{resumeLabels.languages[locale]}</p>
            <div className="chip-cloud">
              {languages.map((language) => (
                <InfoChip
                  icon={
                    <span className="language-mark" aria-hidden="true">
                      {language.mark}
                    </span>
                  }
                  key={language.native}
                  variant="soft"
                >
                  {language.native} · {language.level[locale]}
                </InfoChip>
              ))}
            </div>
          </motion.div>
        </div>
        <motion.aside className="education-profile" {...reveal}>
          <p className="eyebrow">{resumeLabels.education[locale]}</p>
          <div className="education-timeline">
            {chronologicalEducation.map((item, index) => (
              <motion.article
                className={`education-card${item.image ? " has-image" : ""}`}
                key={item.id}
                initial={{ opacity: 0, x: 18 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: Math.min(index * 0.06, 0.24) }}
              >
                <div className="education-card__surface">
                  {item.image ? (
                    <div
                      className="education-card__image"
                      style={{ backgroundImage: `url(${item.image})` }}
                    />
                  ) : null}
                  <div className="education-card__overlay" />
                  <div className="education-card__copy">
                    <time>{item.period}</time>
                    <h3>{item.title[locale]}</h3>
                    <p>{item.school[locale]}</p>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </motion.aside>
      </div>
    </motion.section>
  );
}
