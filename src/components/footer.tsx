"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { FormEvent, useState } from "react";

const productLinks = [
  { href: "/catalog?category=rings", label: "Кольца" },
  { href: "/catalog?category=bracelets", label: "Браслеты" },
  { href: "/catalog?category=earrings", label: "Серьги" },
  { href: "/catalog?category=necklaces", label: "Подвески" }
];

export function Footer() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!email.trim() || !email.includes("@")) {
      setMessage("Укажите email, чтобы мастерская могла ответить.");
      return;
    }

    setMessage("Спасибо. Мы напишем, когда появится новый камень.");
    setEmail("");
  }

  return (
    <footer className="mt-24 bg-footer-surface">
      <div className="mx-auto grid max-w-screen-2xl gap-12 px-6 py-16 md:grid-cols-4 md:px-12 md:py-24">
        <div>
          <Link
            className="font-serif text-xl font-bold tracking-[0.22em] text-primary"
            href="/"
          >
            GloWStone
          </Link>
          <p className="mt-8 max-w-xs text-sm leading-7 text-primary/55">
            Камни, металл и ручная работа без спешки: маленький архив предметов
            для спокойного разговора.
          </p>
        </div>
        <div>
          <h2 className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">
            Изделия
          </h2>
          <ul className="mt-8 space-y-4 text-sm text-primary/55">
            {productLinks.map((link) => (
              <li key={link.href}>
                <Link className="transition hover:text-secondary" href={link.href}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">
            Связь
          </h2>
          <ul className="mt-8 space-y-4 text-sm text-primary/55">
            <li>
              <a className="transition hover:text-secondary" href="https://instagram.com">
                Instagram
              </a>
            </li>
            <li>
              <a className="transition hover:text-secondary" href="https://t.me/glowstone_shop">
                Telegram
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h2 className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">
            Письма
          </h2>
          <form
            className="mt-8 border-b border-primary/20 pb-3 focus-within:border-secondary"
            onSubmit={handleSubmit}
          >
            <label className="sr-only" htmlFor="newsletter-email">
              Email
            </label>
            <div className="flex items-center">
              <input
                autoComplete="email"
                className="w-full bg-transparent text-sm uppercase tracking-[0.18em] text-primary placeholder:text-primary/35 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary"
                id="newsletter-email"
                name="email"
                onChange={(event) => setEmail(event.target.value)}
                placeholder="Ваш email…"
                spellCheck={false}
                type="email"
                value={email}
              />
              <button
                aria-label="Подписаться"
                className="inline-flex h-11 w-11 items-center justify-center text-primary transition-colors hover:text-secondary"
                type="submit"
              >
                <ArrowRight aria-hidden="true" size={20} strokeWidth={1.8} />
              </button>
            </div>
          </form>
          {message ? (
            <p className="mt-4 text-sm leading-6 text-primary/60" aria-live="polite">
              {message}
            </p>
          ) : null}
        </div>
      </div>
      <div className="mx-auto flex max-w-screen-2xl flex-col gap-4 px-6 pb-8 text-xs text-primary/45 md:flex-row md:items-center md:justify-between md:px-12">
        <p>© 2026 GloWStone. Создано для внимательного выбора.</p>
        <div className="flex gap-6">
          <Link href="/about">Этика</Link>
          <Link href="/catalog">Каталог</Link>
          <Link href="/cart">Корзина</Link>
        </div>
      </div>
    </footer>
  );
}
