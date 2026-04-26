"use client";

import Link from "next/link";
import { X } from "lucide-react";
import { useEffect } from "react";
import { products } from "@/lib/products";
import { useCart } from "./cart-provider";

type FavoritesDialogProps = {
  open: boolean;
  onClose: () => void;
};

export function FavoritesDialog({ onClose, open }: FavoritesDialogProps) {
  const { favoriteSlugs } = useCart();
  const favoriteProducts = products.filter((product) =>
    favoriteSlugs.includes(product.slug)
  );

  useEffect(() => {
    if (!open) {
      return;
    }

    const originalBodyOverflow = document.body.style.overflow;
    const originalRootOverflow = document.documentElement.style.overflow;
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalBodyOverflow;
      document.documentElement.style.overflow = originalRootOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose, open]);

  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[100]" role="dialog" aria-modal="true">
      <button
        aria-label="Закрыть кабинет"
        className="absolute inset-0 bg-[var(--scrim)]"
        onClick={onClose}
        type="button"
      />
      <section className="absolute right-0 top-0 h-full w-[min(92vw,420px)] overflow-y-auto overscroll-contain bg-surface p-6 shadow-[0_24px_80px_rgba(28,28,25,0.18)]">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.28em] text-secondary">
              Личный кабинет
            </p>
            <h2 className="mt-3 font-serif text-3xl text-primary">
              Сохраненные изделия
            </h2>
          </div>
          <button
            aria-label="Закрыть кабинет"
            className="inline-flex h-11 w-11 items-center justify-center bg-surface-container-low text-primary transition-colors hover:text-secondary"
            onClick={onClose}
            type="button"
          >
            <X aria-hidden="true" size={18} strokeWidth={1.8} />
          </button>
        </div>

        {favoriteProducts.length > 0 ? (
          <div className="mt-8 grid gap-4">
            {favoriteProducts.map((product) => (
              <Link
                className="block bg-surface-container-low p-4 transition-colors hover:bg-surface-container"
                href={`/product/${product.slug}`}
                key={product.slug}
                onClick={onClose}
              >
                <span className="block font-serif text-xl text-primary">
                  {product.name}
                </span>
                <span className="mt-2 block text-sm leading-6 text-on-surface/60">
                  {product.available
                    ? "Можно уточнить наличие"
                    : "Архивный предмет для похожего запроса"}
                </span>
              </Link>
            ))}
          </div>
        ) : (
          <div className="mt-10 bg-surface-container-low p-8">
            <h3 className="font-serif text-2xl text-primary">
              Здесь пока нет предметов
            </h3>
            <p className="mt-4 text-sm leading-6 text-on-surface/60">
              Сохраняйте изделия из каталога, чтобы вернуться к ним перед разговором
              с мастером.
            </p>
            <Link
              className="mt-6 inline-flex min-h-12 items-center justify-center bg-primary px-6 text-xs font-semibold uppercase tracking-[0.2em] text-white"
              href="/catalog"
              onClick={onClose}
            >
              Рассмотреть изделия
            </Link>
          </div>
        )}
      </section>
    </div>
  );
}
