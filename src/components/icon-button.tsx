import type { ButtonHTMLAttributes } from "react";
import { Heart, Search } from "lucide-react";

type IconButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  icon: "favorite" | "search";
  label: string;
  badge?: number;
};

const icons = {
  favorite: Heart,
  search: Search
};

export function IconButton({
  badge,
  className = "",
  icon,
  label,
  ...props
}: IconButtonProps) {
  const Icon = icons[icon];

  return (
    <button
      aria-label={label}
      className={`relative inline-flex h-11 w-11 items-center justify-center text-primary transition-colors duration-300 hover:text-secondary active:text-secondary ${className}`}
      type="button"
      {...props}
    >
      <Icon aria-hidden="true" size={20} strokeWidth={1.8} />
      {typeof badge === "number" && badge > 0 ? (
        <span className="absolute right-0 top-0 flex h-4 min-w-4 items-center justify-center bg-secondary px-1 text-[10px] leading-none text-white">
          {badge}
        </span>
      ) : null}
    </button>
  );
}
