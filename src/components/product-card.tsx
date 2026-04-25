"use client";

import Link from "next/link";
import Image from "next/image";
import { Heart } from "lucide-react";
import { formatPrice } from "@/lib/format";
import type { Product } from "@/lib/types";
import { useCart } from "./cart-provider";

export function ProductCard({ product }: { product: Product }) {
  const { isFavorite, toggleFavorite } = useCart();
  const favorite = isFavorite(product.slug);

  return (
    <article className="group">
      <div className="relative aspect-[4/5] overflow-hidden bg-surface-container-lowest">
        <Link className="relative block h-full w-full" href={`/product/${product.slug}`}>
          <Image
            alt={product.alt}
            className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
            fill
            loading="eager"
            sizes="(min-width: 1280px) 30vw, (min-width: 768px) 45vw, 100vw"
            src={product.image}
          />
        </Link>
        <div className="pointer-events-none absolute inset-0 bg-secondary opacity-0 transition duration-700 group-hover:opacity-[0.05]" />
        <button
          aria-label={favorite ? "Убрать из избранного" : "Добавить в избранное"}
          className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center bg-surface/85 text-primary backdrop-blur transition hover:text-secondary"
          onClick={() => toggleFavorite(product.slug)}
          type="button"
        >
          <Heart fill={favorite ? "currentColor" : "none"} size={18} strokeWidth={1.7} />
        </button>
        {!product.available ? (
          <span className="absolute left-4 top-4 bg-on-surface px-3 py-2 text-[10px] uppercase tracking-[0.2em] text-white">
            На заказ
          </span>
        ) : null}
      </div>
      <div className="pt-6">
        <p className="text-[10px] uppercase tracking-[0.24em] text-secondary">
          {product.collection}
        </p>
        <h2 className="mt-3 font-serif text-2xl leading-tight text-primary">
          <Link href={`/product/${product.slug}`}>{product.name}</Link>
        </h2>
        <p className="mt-3 text-sm text-on-surface/70">{formatPrice(product.price)}</p>
      </div>
    </article>
  );
}
