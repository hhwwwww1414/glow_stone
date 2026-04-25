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
        disabled={!product.available}
        onClick={() => {
          addToCart(product.slug);
          setMessage("Украшение добавлено в корзину");
        }}
      >
        В корзину
      </Button>
      <Button
        className="w-full"
        onClick={openTelegramOrder}
        variant="secondary"
        disabled={loadingTelegram || !product.available}
      >
        <Send size={16} strokeWidth={1.8} />
        {loadingTelegram ? "Готовим ссылку" : "Заказать в Telegram"}
      </Button>
      <Button
        className="w-full"
        onClick={() => toggleFavorite(product.slug)}
        variant="ghost"
      >
        {favorite ? (
          <HeartMinus size={16} strokeWidth={1.8} />
        ) : (
          <Heart size={16} strokeWidth={1.8} />
        )}
        {favorite ? "Убрать из избранного" : "В избранное"}
      </Button>
      {message ? <p className="text-sm text-secondary">{message}</p> : null}
    </div>
  );
}
