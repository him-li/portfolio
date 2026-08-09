import { useEffect, useState } from "react";

export const sectionIds = ["home", "experience", "work", "education", "profile", "contact"] as const;
export type SectionId = (typeof sectionIds)[number];

export function useActiveSection() {
  const [activeSection, setActiveSection] = useState<SectionId>("home");

  useEffect(() => {
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => Boolean(section));

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) setActiveSection(visible.target.id as SectionId);
      },
      { rootMargin: "-28% 0px -58%", threshold: [0, 0.15, 0.35, 0.6] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return activeSection;
}
