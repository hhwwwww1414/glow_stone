"use client";

import Image from "next/image";
import { useState } from "react";
import type { Product } from "@/lib/types";

export function ProductGallery({ product }: { product: Product }) {
  const [activeImage, setActiveImage] = useState(product.gallery[0] ?? product.image);

  return (
    <div className="space-y-6">
      <div className="relative aspect-[4/5] overflow-hidden bg-surface-container-low">
        <Image
          alt={product.alt}
          className="h-full w-full object-cover transition duration-700 hover:scale-105"
          fill
          loading="eager"
          sizes="(min-width: 1024px) 58vw, 100vw"
          src={activeImage}
        />
        {product.isNew ? (
          <span className="absolute left-6 top-6 bg-primary px-4 py-2 text-[10px] uppercase tracking-[0.22em] text-white">
            Новое
          </span>
        ) : null}
      </div>
      <div className="grid grid-cols-4 gap-4">
        {product.gallery.map((image, index) => (
          <button
            aria-label={`Показать изображение ${index + 1}`}
            className={`relative aspect-square overflow-hidden bg-surface-container-high transition ${
              activeImage === image ? "opacity-100 ring-1 ring-primary" : "opacity-60"
            }`}
            key={image}
            onClick={() => setActiveImage(image)}
            type="button"
          >
            <Image
              alt=""
              className="h-full w-full object-cover"
              fill
              loading="eager"
              sizes="25vw"
              src={image}
            />
          </button>
        ))}
      </div>
    </div>
  );
}
