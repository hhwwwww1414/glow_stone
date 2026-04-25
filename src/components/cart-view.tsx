"use client";

import Image from "next/image";
import { useMemo } from "react";
import { calculateCartTotal } from "@/lib/cart";
import { formatPrice } from "@/lib/format";
import type { Product } from "@/lib/types";
import { ButtonLink } from "./button";
import { useCart } from "./cart-provider";
import { TelegramCheckout } from "./telegram-checkout";

export function CartView({ products }: { products: Product[] }) {
  const { cartItems, removeFromCart, updateQuantity } = useCart();
  const total = useMemo(
    () => calculateCartTotal(cartItems, products),
    [cartItems, products]
  );
  const lines = cartItems
    .map((item) => {
      const product = products.find((candidate) => candidate.slug === item.slug);
      return product ? { item, product } : null;
    })
    .filter((line): line is NonNullable<typeof line> => Boolean(line));

  if (cartItems.length === 0) {
    return (
      <section className="mx-auto max-w-2xl px-6 py-32 text-center">
        <p className="text-xs uppercase tracking-[0.3em] text-secondary">Корзина</p>
        <h1 className="mt-6 font-serif text-5xl text-primary">Пока пусто</h1>
        <p className="mt-6 text-on-surface/65">
          Выберите украшение в каталоге, а затем отправьте заказ в Telegram.
        </p>
        <ButtonLink className="mt-10" href="/catalog">
          Перейти в каталог
        </ButtonLink>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-screen-2xl px-6 pt-32 md:px-12">
      <div className="mb-16 max-w-3xl">
        <p className="text-xs uppercase tracking-[0.3em] text-secondary">Корзина</p>
        <h1 className="mt-6 font-serif text-6xl leading-tight text-primary">
          Ваши выбранные артефакты
        </h1>
      </div>

      <div className="grid gap-12 lg:grid-cols-[1fr_380px]">
        <div className="space-y-6">
          {lines.map(({ item, product }) => (
            <article
              className="grid gap-6 bg-surface-container-low p-5 md:grid-cols-[140px_1fr_auto]"
              key={item.slug}
            >
              <div className="relative aspect-square w-full overflow-hidden">
                <Image
                  alt={product.alt}
                  className="object-cover"
                  fill
                  sizes="140px"
                  src={product.image}
                />
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-[0.24em] text-secondary">
                  {product.collection}
                </p>
                <h2 className="mt-3 font-serif text-2xl text-primary">
                  {product.name}
                </h2>
                <p className="mt-3 text-sm text-on-surface/60">
                  {product.available
                    ? "В наличии"
                    : "Недоступно для моментального заказа"}
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
                    className="h-10 w-10"
                    onClick={() => updateQuantity(item.slug, item.quantity - 1)}
                    type="button"
                  >
                    -
                  </button>
                  <span className="w-10 text-center">{item.quantity}</span>
                  <button
                    aria-label="Увеличить количество"
                    className="h-10 w-10"
                    onClick={() => updateQuantity(item.slug, item.quantity + 1)}
                    type="button"
                  >
                    +
                  </button>
                </div>
                <p className="text-sm text-primary">
                  {formatPrice(product.price * item.quantity)}
                </p>
              </div>
            </article>
          ))}
        </div>

        <aside className="h-fit bg-primary p-8 text-white lg:sticky lg:top-32">
          <h2 className="font-serif text-3xl">Итого</h2>
          <div className="mt-8 flex justify-between border-t border-white/15 pt-6 text-sm">
            <span>Сумма</span>
            <span>{formatPrice(total)}</span>
          </div>
          <p className="mt-6 text-sm leading-7 text-white/70">
            Заказ будет передан в Telegram с перечнем изделий и итоговой суммой.
          </p>
          <TelegramCheckout items={cartItems} />
        </aside>
      </div>
    </section>
  );
}
