"use client";

import Link from "next/link";
import { Menu, ShoppingBag, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useCart } from "./cart-provider";
import { IconButton } from "./icon-button";

const navItems = [
  { href: "/catalog", label: "Каталог" },
  { href: "/catalog?collection=stones-of-power", label: "Коллекции" },
  { href: "/about", label: "О бренде" },
  { href: "/catalog?stone=malachite", label: "Камни" },
  { href: "/about#journal", label: "Журнал" }
];

export function Header() {
  const pathname = usePathname();
  const { cartCount, favoriteCount } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 z-50 w-full bg-white/80 shadow-[0_4px_40px_rgba(28,28,25,0.04)] backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-screen-2xl items-center justify-between px-5 py-4 md:px-12 md:py-6">
        <Link
          className="font-serif text-xl font-bold tracking-[0.22em] text-primary md:text-2xl"
          href="/"
        >
          GloWStone
        </Link>

        <nav className="hidden items-center gap-10 md:flex">
          {navItems.map((item) => {
            const active =
              item.href === pathname ||
              (item.href.startsWith("/catalog") && pathname === "/catalog") ||
              (item.href.startsWith("/about") && pathname === "/about");

            return (
              <Link
                className={`font-serif text-sm font-light uppercase tracking-tight transition duration-300 hover:text-secondary ${
                  active
                    ? "border-b border-primary/20 pb-1 text-primary"
                    : "text-primary/60"
                }`}
                href={item.href}
                key={item.href}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-1 md:gap-3">
          <IconButton icon="search" label="Поиск" />
          <IconButton badge={favoriteCount} icon="favorite" label="Избранное" />
          <Link aria-label="Корзина" className="relative" href="/cart">
            <ShoppingBag
              className="text-primary transition duration-300 hover:text-secondary"
              size={22}
              strokeWidth={1.8}
            />
            {cartCount > 0 ? (
              <span className="absolute -right-2 -top-2 flex h-4 min-w-4 items-center justify-center bg-secondary px-1 text-[10px] leading-none text-white">
                {cartCount}
              </span>
            ) : null}
          </Link>
          <button
            aria-expanded={menuOpen}
            aria-label="Открыть меню"
            className="ml-2 inline-flex h-10 w-10 items-center justify-center text-primary md:hidden"
            onClick={() => setMenuOpen((open) => !open)}
            type="button"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {menuOpen ? (
        <nav className="border-t border-outline-variant/20 bg-surface px-5 py-5 md:hidden">
          <div className="grid gap-4">
            {navItems.map((item) => (
              <Link
                className="font-serif text-lg text-primary"
                href={item.href}
                key={item.href}
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </nav>
      ) : null}
    </header>
  );
}
