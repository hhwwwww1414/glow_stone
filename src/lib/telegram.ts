import { formatPrice } from "./format";
import type {
  CartItem,
  CheckoutPayload,
  OrderLinesResult,
  Product,
  ValidationResult
} from "./types";

export function validateCheckoutPayload(
  payload: Partial<CheckoutPayload>
): ValidationResult {
  if (!Array.isArray(payload.items) || payload.items.length === 0) {
    return { ok: false, error: "Корзина пуста" };
  }

  const invalidItem = payload.items.find(
    (item) =>
      typeof item.slug !== "string" ||
      item.slug.trim().length === 0 ||
      !Number.isInteger(item.quantity) ||
      item.quantity < 1
  );

  if (invalidItem) {
    return { ok: false, error: "Некорректная позиция заказа" };
  }

  return { ok: true };
}

export function createTelegramOrderLines(
  items: CartItem[],
  products: Product[]
): OrderLinesResult {
  const validation = validateCheckoutPayload({ items });

  if (!validation.ok) {
    return validation;
  }

  const lines: string[] = [];
  let total = 0;

  for (const item of items) {
    const product = products.find((candidate) => candidate.slug === item.slug);

    if (!product) {
      return { ok: false, error: "Товар не найден" };
    }

    if (!product.available) {
      return { ok: false, error: `Товар недоступен: ${product.name}` };
    }

    const lineTotal = product.price * item.quantity;
    lines.push(`${product.name} x ${item.quantity} — ${formatPrice(lineTotal)}`);
    total += lineTotal;
  }

  return { ok: true, lines, total };
}

export function buildTelegramCheckoutUrl({
  username,
  orderLines,
  total
}: {
  username: string;
  orderLines: string[];
  total: number;
}) {
  const message = [
    "Здравствуйте. Хочу обсудить подбор GloWStone:",
    "",
    ...orderLines,
    "",
    `Итого: ${formatPrice(total)}`
  ].join("\n");

  return `https://t.me/${username}?text=${encodeURIComponent(message)}`;
}
