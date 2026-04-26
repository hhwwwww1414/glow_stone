"use client";

import Image from "next/image";
import { useMemo } from "react";
import { calculateCartTotal, resolveCartLines } from "@/lib/cart";
import { formatPrice } from "@/lib/format";
import type { Product } from "@/lib/types";
import { ButtonLink } from "./button";
import { useCart } from "./cart-provider";
import { TelegramCheckout } from "./telegram-checkout";

export function CartView({ products }: { products: Product[] }) {
  const { cartItems, removeFromCart, updateQuantity } = useCart();
  const lines = useMemo(
    () => resolveCartLines(cartItems, products),
    [cartItems, products]
  );
  const total = useMemo(
    () =>
      calculateCartTotal(
        lines.filter((line) => line.status === "available").map((line) => line.item),
        products
      ),
    [lines, products]
  );
  const blockedReason = lines.some((line) => line.status === "missing")
    ? "В подборе есть изделие, которого уже нет в витрине. Уберите его, чтобы написать мастеру."
    : lines.some((line) => line.status === "unavailable")
      ? "В подборе есть архивное изделие. Уберите его или обсудите похожее с мастером."
      : undefined;

  if (cartItems.length === 0) {
    return (
      <section className="mx-auto max-w-2xl px-6 py-32 text-center">
        <p className="text-xs uppercase tracking-[0.3em] text-secondary">Корзина</p>
        <h1 className="mt-6 font-serif text-5xl text-primary">В подборе пока тихо</h1>
        <p className="mt-6 text-on-surface/65">
          Рассмотрите изделия в каталоге и отложите те, о которых хотите написать мастеру.
        </p>
        <ButtonLink className="mt-10" href="/catalog">
          Рассмотреть изделия
        </ButtonLink>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-screen-2xl px-6 pt-32 md:px-12">
      <div className="mb-16 max-w-3xl">
        <p className="text-xs uppercase tracking-[0.3em] text-secondary">Корзина</p>
        <h1 className="mt-6 font-serif text-6xl leading-tight text-primary">
          Ваши отложенные изделия
        </h1>
        <p className="mt-6 max-w-2xl leading-8 text-on-surface/65">
          Подбор не оформляет покупку автоматически. Он собирает предметы для
          спокойного разговора в Telegram: мастер уточнит наличие, детали и похожие
          камни.
        </p>
      </div>

      <div className="grid gap-12 lg:grid-cols-[1fr_380px]">
        <div className="space-y-6">
          {lines.map((line) => {
            const { item } = line;
            const product = line.product;

            return (
            <article
              className="grid gap-6 bg-surface-container-low p-5 md:grid-cols-[140px_1fr_auto]"
              key={item.slug}
            >
              <div className="relative aspect-square w-full overflow-hidden">
                {product ? (
                  <Image
                    alt={product.alt}
                    className="object-cover"
                    fill
                    sizes="140px"
                    src={product.image}
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-primary/10 text-xs uppercase tracking-[0.2em] text-primary/45">
                    Архив
                  </div>
                )}
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-[0.24em] text-secondary">
                  {product?.collection ?? "Архив мастерской"}
                </p>
                <h2 className="mt-3 font-serif text-2xl text-primary">
                  {product?.name ?? "Изделие уже не в витрине"}
                </h2>
                <p className="mt-3 text-sm text-on-surface/60">
                  {line.status === "available"
                    ? "В наличии, можно обсудить с мастером"
                    : line.status === "unavailable"
                      ? "Архивное изделие. Можно обсудить похожий камень"
                      : "Позиция устарела в локальном подборе"}
                </p>
                <button
                  className="mt-5 text-xs uppercase tracking-[0.22em] text-secondary"
                  onClick={() => removeFromCart(item.slug)}
                  type="button"
                >
                  Удалить
                </button>
              </div>
              <div className="flex items-center gap-5 md:flex-col md:items-end">
                <div className="flex items-center bg-surface">
                  <button
                    aria-label="Уменьшить количество"
                    className="h-11 w-11"
                    onClick={() => updateQuantity(item.slug, item.quantity - 1)}
                    type="button"
                  >
                    -
                  </button>
                  <span className="w-10 text-center">{item.quantity}</span>
                  <button
                    aria-label="Увеличить количество"
                    className="h-11 w-11"
                    onClick={() => updateQuantity(item.slug, item.quantity + 1)}
                    type="button"
                  >
                    +
                  </button>
                </div>
                {product ? (
                  <p className="text-sm text-primary">
                    {formatPrice(product.price * item.quantity)}
                  </p>
                ) : null}
              </div>
            </article>
          );
          })}
        </div>

        <aside className="h-fit bg-primary p-8 text-white lg:sticky lg:top-32">
          <h2 className="font-serif text-3xl">Итого</h2>
          <div className="mt-8 flex justify-between border-t border-white/15 pt-6 text-sm">
            <span>Сумма</span>
            <span>{formatPrice(total)}</span>
          </div>
          <p className="mt-6 text-sm leading-7 text-white/70">
            Список уйдет мастеру в Telegram. Это не автоматическая покупка: вы
            сможете уточнить наличие, посадку, упаковку и похожие камни.
          </p>
          <TelegramCheckout disabledReason={blockedReason} items={cartItems} />
        </aside>
      </div>
    </section>
  );
}
