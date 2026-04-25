import { describe, expect, it } from "vitest";
import {
  buildTelegramCheckoutUrl,
  createTelegramOrderLines,
  validateCheckoutPayload
} from "./telegram";
import { products } from "./products";

describe("telegram checkout", () => {
  it("validates a non-empty checkout payload", () => {
    const result = validateCheckoutPayload({
      items: [{ slug: "verdant-soul-pendant", quantity: 1 }]
    });

    expect(result.ok).toBe(true);
  });

  it("rejects empty checkout payloads", () => {
    const result = validateCheckoutPayload({ items: [] });

    expect(result).toEqual({ ok: false, error: "Корзина пуста" });
  });

  it("builds readable order lines from product data", () => {
    const result = createTelegramOrderLines(
      [{ slug: "verdant-soul-pendant", quantity: 1 }],
      products
    );

    expect(result).toEqual({
      ok: true,
      lines: ["Подвеска «Зеленая душа» x 1 — 124 000 ₽"],
      total: 124000
    });
  });

  it("builds a Telegram URL with readable order text", () => {
    const url = buildTelegramCheckoutUrl({
      username: "glowstone_shop",
      orderLines: ["Подвеска «Зеленая душа» x 1 — 124 000 ₽"],
      total: 124000
    });

    expect(url).toContain("https://t.me/glowstone_shop");
    expect(decodeURIComponent(url)).toContain("Подвеска «Зеленая душа» x 1");
    expect(decodeURIComponent(url)).toContain("Итого: 124 000 ₽");
  });
});
