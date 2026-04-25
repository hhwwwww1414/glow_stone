import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost" | "light" | "inverseGhost";
};

type ButtonLinkProps = {
  children: ReactNode;
  href: string;
  variant?: "primary" | "secondary" | "ghost" | "light" | "inverseGhost";
  className?: string;
};

const variants = {
  primary:
    "bg-primary text-white hover:bg-primary-container focus-visible:outline-secondary",
  secondary:
    "bg-transparent text-primary ring-1 ring-outline-variant/40 hover:bg-surface-container-low",
  ghost: "bg-transparent text-primary hover:text-secondary",
  light: "bg-white text-primary ring-1 ring-white/80 hover:bg-surface-container-low",
  inverseGhost: "bg-transparent text-white hover:text-secondary-container"
};

const baseClass =
  "inline-flex min-h-12 items-center justify-center gap-2 whitespace-normal px-6 py-3 text-center text-xs font-semibold uppercase leading-tight tracking-[0.22em] transition duration-500 disabled:pointer-events-none disabled:opacity-40";

export function Button({
  children,
  className = "",
  variant = "primary",
  ...props
}: ButtonProps) {
  return (
    <button className={`${baseClass} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
}

export function ButtonLink({
  children,
  className = "",
  href,
  variant = "primary"
}: ButtonLinkProps) {
  return (
    <Link className={`${baseClass} ${variants[variant]} ${className}`} href={href}>
      {children}
    </Link>
  );
}
