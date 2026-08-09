import { ArrowUpRight, ChevronDown } from "lucide-react";
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
import { education, experiences, languages, projects, resumeLabels, skillGroups } from "../data/resume";
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

export function ExperienceSection({ locale }: { locale: Locale }) {
  const labels = resumeLabels;
  const [expanded, setExpanded] = useState<string | null>(experiences[0].id);
  return (
    <section className="resume-section section-shell" id="experience">
      <header className="section-heading"><p className="eyebrow">01 / {labels.experience[locale]}</p><h2>{labels.experienceTitle[locale]}</h2></header>
      <div className="career-timeline">
        {experiences.map((job) => {
          const isExpanded = expanded === job.id;
          return (
            <article className="career-entry" key={job.id}>
              <div className="career-node" />
              <div className="company-mark" style={{ backgroundColor: job.color }}>{job.logo}</div>
              <div className="career-content">
                <div className="career-meta"><div><h3>{job.role[locale]}</h3><p>{job.company} · {job.location[locale]}</p></div><time>{job.period}</time></div>
                <p className="career-summary">{job.summary[locale]}</p>
                <button className="detail-toggle" aria-expanded={isExpanded} onClick={() => setExpanded(isExpanded ? null : job.id)}>{isExpanded ? labels.hideDetails[locale] : labels.viewDetails[locale]}<ChevronDown size={15} /></button>
                {isExpanded && <ul className="career-details">{job.bullets.map((bullet) => <li key={bullet.en}>{bullet[locale]}</li>)}</ul>}
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

export function ProjectsSection({ locale }: { locale: Locale }) {
  const statusCopy = { featured: resumeLabels.featured[locale], developing: resumeLabels.developing[locale], repository: resumeLabels.repository[locale] };
  return (
    <section className="resume-section project-section section-shell" id="work">
      <header className="section-heading"><p className="eyebrow">02 / {resumeLabels.projects[locale]}</p><h2>{resumeLabels.projectsTitle[locale]}</h2></header>
      <div className="project-grid">
        {projects.map((project, index) => (
          <a className={`project-card ${index === 0 ? "is-featured" : ""}`} href={project.href} target="_blank" rel="noreferrer" key={project.id}>
            <img src={project.image} alt="" />
            <div className="project-overlay" />
            <div className="project-card-content"><span>{statusCopy[project.status]}</span><h3>{project.title}</h3><p>{project.description[locale]}</p><footer><small>{project.stack.join(" · ")}</small><strong>{resumeLabels.viewProject[locale]} <ArrowUpRight size={15} /></strong></footer></div>
          </a>
        ))}
      </div>
    </section>
  );
}

export function EducationSection({ locale }: { locale: Locale }) {
  const degrees = education.filter((item) => item.type === "degree");
  const training = education.filter((item) => item.type === "training");
  return (
    <section className="resume-section section-shell" id="education">
      <header className="section-heading"><p className="eyebrow">03 / {resumeLabels.education[locale]}</p><h2>{resumeLabels.educationTitle[locale]}</h2></header>
      <div className="education-layout">
        {degrees.map((item) => <article className="degree-card" key={item.id} style={{ backgroundImage: `url(${item.image})` }}><div className="degree-overlay" /><div className="degree-copy"><span>{item.period}</span><h3>{item.title[locale]}</h3><p>{item.school[locale]}</p></div></article>)}
        <aside className="training-list">{training.map((item) => <article key={item.id}><time>{item.period}</time><div><h3>{item.title[locale]}</h3><p>{item.school[locale]}</p></div></article>)}</aside>
      </div>
    </section>
  );
}

export function SkillsSection({ locale }: { locale: Locale }) {
  return (
    <section className="resume-section skills-section section-shell" id="profile">
      <header className="section-heading"><p className="eyebrow">04 / {resumeLabels.skills[locale]}</p><h2>{resumeLabels.skillsTitle[locale]}</h2></header>
      <div className="skill-groups">{skillGroups.map((group) => <article key={group.id}><h3>{group.title[locale]}</h3><div className="skill-grid">{group.skills.map((skill) => <div className="skill-item" key={skill}><SkillIcon name={skill} /><span>{skill}</span></div>)}</div></article>)}</div>
      <div className="language-section"><p className="eyebrow">{resumeLabels.languages[locale]}</p><div className="language-grid">{languages.map((language) => <div key={language.native}><strong>{language.native}</strong><span>{language.level[locale]}</span></div>)}</div></div>
    </section>
  );
}
