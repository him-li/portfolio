import type { MouseEventHandler, ReactNode } from "react";

type InfoChipProps = {
  children: ReactNode;
  className?: string;
  href?: string;
  icon?: ReactNode;
  label?: string;
  expanded?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
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
  expanded,
  onClick,
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

  if (onClick) {
    return (
      <button
        aria-expanded={expanded}
        aria-label={label}
        className={classes}
        onClick={onClick}
        type="button"
      >
        {content}
      </button>
    );
  }

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
