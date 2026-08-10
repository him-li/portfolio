import type { ReactNode } from "react";

type InfoChipProps = {
  children: ReactNode;
  className?: string;
  href?: string;
  icon?: ReactNode;
  label?: string;
  rel?: string;
  size?: "sm" | "md" | "lg";
  target?: "_blank";
  variant?: "outline" | "soft" | "solid";
};

export function InfoChip({
  children,
  className = "",
  href,
  icon,
  label,
  rel,
  size = "md",
  target,
  variant = "outline",
}: InfoChipProps) {
  const classes = `info-chip info-chip--${size} info-chip--${variant} ${className}`.trim();
  const content = (
    <>
      {icon ? <span className="info-chip__icon">{icon}</span> : null}
      <span className="info-chip__label">{children}</span>
    </>
  );

  if (href) {
    return (
      <a
        aria-label={label}
        className={classes}
        href={href}
        rel={rel}
        target={target}
      >
        {content}
      </a>
    );
  }

  return <span className={classes}>{content}</span>;
}
