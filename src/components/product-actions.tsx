"use client";

import { useState } from "react";
import { Heart, HeartMinus, Send } from "lucide-react";
import type { Product } from "@/lib/types";
import { Button } from "./button";
import { useCart } from "./cart-provider";

export function ProductActions({ product }: { product: Product }) {
  const { addToCart, isFavorite, toggleFavorite } = useCart();
  const [message, setMessage] = useState("");
  const [loadingTelegram, setLoadingTelegram] = useState(false);
  const favorite = isFavorite(product.slug);

  async function openTelegramOrder() {
    if (!product.available) {
      const text = encodeURIComponent(
        `Здравствуйте. Хочу обсудить похожее изделие на ${product.name}.`
      );
      window.location.href = `https://t.me/glowstone_shop?text=${text}`;
      return;
    }

    setLoadingTelegram(true);
    setMessage("");

    try {
      const response = await fetch("/api/telegram-checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items: [{ slug: product.slug, quantity: 1 }] })
      });
      const data = (await response.json()) as { url?: string; error?: string };

      if (!response.ok || !data.url) {
        setMessage(data.error ?? "Не удалось собрать ссылку Telegram");
        return;
      }

      window.location.href = data.url;
    } catch {
      setMessage("Не удалось связаться с checkout API");
    } finally {
      setLoadingTelegram(false);
    }
  }

  return (
    <div className="space-y-4">
      <Button
        className="w-full"
        onClick={openTelegramOrder}
        disabled={loadingTelegram}
      >
        <Send aria-hidden="true" size={16} strokeWidth={1.8} />
        {loadingTelegram
          ? "Готовим разговор"
          : product.available
            ? "Написать мастеру"
            : "Обсудить похожее"}
      </Button>
      <Button
        className="w-full"
        onClick={() => {
          addToCart(product.slug);
          setMessage("Изделие отложено в подбор");
        }}
        variant="secondary"
        disabled={!product.available}
      >
        Отложить в подбор
      </Button>
      <Button
        className="w-full"
        onClick={() => toggleFavorite(product.slug)}
        variant="ghost"
      >
        {favorite ? (
          <HeartMinus aria-hidden="true" size={16} strokeWidth={1.8} />
        ) : (
          <Heart aria-hidden="true" size={16} strokeWidth={1.8} />
        )}
        {favorite ? "Убрать из кабинета" : "Сохранить в кабинет"}
      </Button>
      {message ? (
        <p className="text-sm text-secondary" aria-live="polite">
          {message}
        </p>
      ) : null}
    </div>
  );
}
