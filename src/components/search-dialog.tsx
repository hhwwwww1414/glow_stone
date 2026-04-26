"use client";

import Link from "next/link";
import { Search, X } from "lucide-react";
import { useDeferredValue, useEffect, useMemo, useRef, useState } from "react";
import { formatPrice } from "@/lib/format";
import { products } from "@/lib/products";
import { searchProducts } from "@/lib/search";

type SearchDialogProps = {
  open: boolean;
  onClose: () => void;
};

export function SearchDialog({ onClose, open }: SearchDialogProps) {
  const [query, setQuery] = useState("");
  const deferredQuery = useDeferredValue(query);
  const inputRef = useRef<HTMLInputElement>(null);
  const results = useMemo(() => searchProducts(products, deferredQuery), [deferredQuery]);
  const suggestedProducts = query.trim() ? results : products.slice(0, 4);

  useEffect(() => {
    if (!open) {
      return;
    }

    const originalOverflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    window.setTimeout(() => inputRef.current?.focus(), 0);

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.documentElement.style.overflow = originalOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose, open]);

  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[100]" role="dialog" aria-modal="true">
      <button
        aria-label="Закрыть поиск"
        className="absolute inset-0 bg-[var(--scrim)]"
        onClick={onClose}
        type="button"
      />
      <section className="absolute left-1/2 top-6 max-h-[calc(100dvh-3rem)] w-[min(92vw,760px)] -translate-x-1/2 overflow-y-auto overscroll-contain bg-surface p-5 shadow-[0_24px_80px_rgba(28,28,25,0.18)] md:top-12 md:p-8">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.28em] text-secondary">
              Поиск по кабинету
            </p>
            <h2 className="mt-3 font-serif text-3xl text-primary">
              Найти камень или изделие
            </h2>
          </div>
          <button
            aria-label="Закрыть поиск"
            className="inline-flex h-11 w-11 items-center justify-center bg-surface-container-low text-primary transition-colors hover:text-secondary"
            onClick={onClose}
            type="button"
          >
            <X aria-hidden="true" size={18} strokeWidth={1.8} />
          </button>
        </div>

        <label className="mt-8 flex min-h-14 items-center gap-3 border-b border-outline-variant/35 focus-within:border-secondary">
          <Search aria-hidden="true" className="text-secondary" size={18} strokeWidth={1.8} />
          <span className="sr-only">Поисковый запрос</span>
          <input
            ref={inputRef}
            autoComplete="off"
            className="w-full bg-transparent text-lg text-primary placeholder:text-primary/35 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary"
            name="site-search"
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Малахит, жемчуг, золото…"
            spellCheck={false}
            type="search"
            value={query}
          />
        </label>

        <p className="mt-4 text-sm text-on-surface/55" aria-live="polite">
          {query.trim()
            ? `Найдено: ${results.length}`
            : "Начните с камня, материала или настроения."}
        </p>

        <div className="mt-8 grid gap-4">
          {suggestedProducts.length > 0 ? (
            suggestedProducts.map((product) => (
              <Link
                className="grid gap-2 bg-surface-container-low p-4 transition-colors hover:bg-surface-container md:grid-cols-[1fr_auto] md:items-center"
                href={`/product/${product.slug}`}
                key={product.slug}
                onClick={onClose}
              >
                <span>
                  <span className="block font-serif text-xl text-primary">
                    {product.name}
                  </span>
                  <span className="mt-2 block text-sm leading-6 text-on-surface/60">
                    {product.shortDescription}
                  </span>
                </span>
                <span className="text-sm text-secondary">
                  {formatPrice(product.price)}
                </span>
              </Link>
            ))
          ) : (
            <div className="bg-surface-container-low p-8 text-center">
              <h3 className="font-serif text-2xl text-primary">
                Такого предмета нет в витрине
              </h3>
              <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-on-surface/60">
                Напишите мастеру: возможно, похожий камень уже лежит в архиве.
              </p>
              <a
                className="mt-6 inline-flex min-h-12 items-center justify-center bg-primary px-6 text-xs font-semibold uppercase tracking-[0.2em] text-white"
                href="https://t.me/glowstone_shop"
              >
                Обсудить похожее
              </a>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
