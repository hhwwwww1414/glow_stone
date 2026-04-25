"use client";

import { useState } from "react";
import { Send } from "lucide-react";
import type { CartItem } from "@/lib/types";
import { Button } from "./button";

export function TelegramCheckout({ items }: { items: CartItem[] }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function checkout() {
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/telegram-checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items })
      });
      const data = (await response.json()) as { url?: string; error?: string };

      if (!response.ok || !data.url) {
        setError(data.error ?? "Не удалось подготовить заказ");
        return;
      }

      window.location.href = data.url;
    } catch {
      setError("Checkout API недоступен");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mt-8">
      <Button className="w-full bg-white text-primary hover:bg-surface-container" onClick={checkout}>
        <Send size={16} strokeWidth={1.8} />
        {loading ? "Готовим ссылку" : "Оформить в Telegram"}
      </Button>
      {error ? <p className="mt-4 text-sm text-secondary-container">{error}</p> : null}
    </div>
  );
}
