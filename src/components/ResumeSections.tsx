import { ArrowUpRight, ChevronDown, SlidersHorizontal, X } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion, type MotionProps } from "motion/react";
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
import { education, experiences, languages, projects, resumeLabels, skillGroups, type ProjectStatus } from "../data/resume";
import type { Locale } from "../i18n";

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
  if (!icon) return <span className="skill-fallback" aria-hidden="true">{name.slice(0, 2).toUpperCase()}</span>;
  return <svg aria-hidden="true" viewBox="0 0 24 24"><path d={icon.path} /></svg>;
}

function useRevealProps(): MotionProps {
  const reducedMotion = useReducedMotion();
  return reducedMotion
    ? { initial: false }
    : { initial: { opacity: 0, y: 38 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, amount: 0.16 }, transition: { duration: 0.62, ease: [0.22, 1, 0.36, 1] } };
}

export function ExperienceSection({ locale }: { locale: Locale }) {
  const labels = resumeLabels;
  const [expanded, setExpanded] = useState<string | null>(experiences[0].id);
  const reveal = useRevealProps();
  return (
    <motion.section className="resume-section section-shell" id="experience">
      <motion.header className="section-heading" {...reveal}><p className="eyebrow">01 / {labels.experience[locale]}</p><h2>{labels.experienceTitle[locale]}</h2></motion.header>
      <div className="career-timeline">
        {experiences.map((job, index) => {
          const isExpanded = expanded === job.id;
          return (
            <motion.article className="career-entry" key={job.id} {...reveal} transition={{ duration: 0.56, delay: index * 0.08 }}>
              <div className="career-node" />
              <div className="company-mark" style={{ backgroundColor: job.color }}>{job.logo}</div>
              <div className="career-content">
                <div className="career-meta"><div><h3>{job.role[locale]}</h3><p>{job.company} · {job.location[locale]}</p></div><time>{job.period}</time></div>
                <p className="career-summary">{job.summary[locale]}</p>
                <button className="detail-toggle" aria-expanded={isExpanded} onClick={() => setExpanded(isExpanded ? null : job.id)}>{isExpanded ? labels.hideDetails[locale] : labels.viewDetails[locale]}<ChevronDown size={15} /></button>
                <AnimatePresence initial={false}>{isExpanded && <motion.ul className="career-details" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.32 }}>{job.bullets.map((bullet) => <li key={bullet.en}>{bullet[locale]}</li>)}</motion.ul>}</AnimatePresence>
              </div>
            </motion.article>
          );
        })}
      </div>
    </motion.section>
  );
}

export function ProjectsSection({ locale }: { locale: Locale }) {
  const statusCopy = { featured: resumeLabels.featured[locale], developing: resumeLabels.developing[locale], repository: resumeLabels.repository[locale] };
  const [filter, setFilter] = useState<"all" | ProjectStatus>("all");
  const [expanded, setExpanded] = useState<string | null>(null);
  const reveal = useRevealProps();
  const filters: Array<{ id: "all" | ProjectStatus; label: string }> = [
    { id: "all", label: resumeLabels.allProjects[locale] },
    { id: "featured", label: resumeLabels.featured[locale] },
    { id: "developing", label: resumeLabels.developing[locale] },
    { id: "repository", label: resumeLabels.repository[locale] },
  ];
  const visibleProjects = filter === "all" ? projects : projects.filter((project) => project.status === filter);
  return (
    <motion.section className="resume-section project-section section-shell" id="work">
      <motion.header className="section-heading" {...reveal}><p className="eyebrow">02 / {resumeLabels.projects[locale]}</p><h2>{resumeLabels.projectsTitle[locale]}</h2></motion.header>
      <motion.div className="project-filters" {...reveal} role="group" aria-label={resumeLabels.projects[locale]}><SlidersHorizontal size={16} aria-hidden="true" />{filters.map((item) => <button className={filter === item.id ? "is-active" : ""} aria-pressed={filter === item.id} key={item.id} onClick={() => { setFilter(item.id); setExpanded(null); }}>{item.label}</button>)}</motion.div>
      <div className="project-grid">
        <AnimatePresence mode="popLayout">
        {visibleProjects.map((project) => (
          <motion.article className={`project-card ${project.status === "featured" && filter === "all" ? "is-featured" : ""}`} layout initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.94 }} transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }} key={project.id}>
            <img src={project.image} alt="" />
            <div className="project-overlay" />
            <div className="project-card-content"><span>{statusCopy[project.status]}</span><h3>{project.title}</h3><p>{project.description[locale]}</p><footer><small>{project.stack.join(" · ")}</small><div className="project-actions"><button aria-expanded={expanded === project.id} onClick={() => setExpanded(expanded === project.id ? null : project.id)}>{expanded === project.id ? <X size={14} /> : <ChevronDown size={14} />}{expanded === project.id ? resumeLabels.collapseProject[locale] : resumeLabels.expandProject[locale]}</button><a href={project.href} target="_blank" rel="noreferrer">{resumeLabels.viewProject[locale]} <ArrowUpRight size={15} /></a></div></footer><AnimatePresence initial={false}>{expanded === project.id && <motion.div className="project-details" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}><p>{project.details[locale]}</p><div>{project.stack.map((technology) => <span key={technology}>{technology}</span>)}</div></motion.div>}</AnimatePresence></div>
          </motion.article>
        ))}
        </AnimatePresence>
      </div>
    </motion.section>
  );
}

export function EducationSection({ locale }: { locale: Locale }) {
  const degrees = education.filter((item) => item.type === "degree");
  const training = education.filter((item) => item.type === "training");
  const reveal = useRevealProps();
  return (
    <motion.section className="resume-section section-shell" id="education">
      <motion.header className="section-heading" {...reveal}><p className="eyebrow">03 / {resumeLabels.education[locale]}</p><h2>{resumeLabels.educationTitle[locale]}</h2></motion.header>
      <div className="education-layout">
        {degrees.map((item, index) => <motion.article className="degree-card" key={item.id} style={{ backgroundImage: `url(${item.image})` }} {...reveal} transition={{ duration: 0.62, delay: index * 0.1 }}><div className="degree-overlay" /><div className="degree-copy"><span>{item.period}</span><h3>{item.title[locale]}</h3><p>{item.school[locale]}</p></div></motion.article>)}
        <motion.aside className="training-list" {...reveal}>{training.map((item) => <article key={item.id}><time>{item.period}</time><div><h3>{item.title[locale]}</h3><p>{item.school[locale]}</p></div></article>)}</motion.aside>
      </div>
    </motion.section>
  );
}

export function SkillsSection({ locale }: { locale: Locale }) {
  const reveal = useRevealProps();
  return (
    <motion.section className="resume-section skills-section section-shell" id="profile">
      <motion.header className="section-heading" {...reveal}><p className="eyebrow">04 / {resumeLabels.skills[locale]}</p><h2>{resumeLabels.skillsTitle[locale]}</h2></motion.header>
      <div className="skill-groups">{skillGroups.map((group) => <motion.article key={group.id} {...reveal}><h3>{group.title[locale]}</h3><div className="skill-grid">{group.skills.map((skill, index) => <motion.div className="skill-item" key={skill} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: Math.min(index * 0.035, 0.2) }}><SkillIcon name={skill} /><span>{skill}</span></motion.div>)}</div></motion.article>)}</div>
      <motion.div className="language-section" {...reveal}><p className="eyebrow">{resumeLabels.languages[locale]}</p><div className="language-grid">{languages.map((language) => <div key={language.native}><strong>{language.native}</strong><span>{language.level[locale]}</span></div>)}</div></motion.div>
    </motion.section>
  );
}
