import { products } from "@/lib/products";
import {
  buildTelegramCheckoutUrl,
  createTelegramOrderLines,
  validateCheckoutPayload
} from "@/lib/telegram";
import type { CheckoutPayload } from "@/lib/types";

const telegramUsername = "glowstone_shop";

export async function POST(request: Request) {
  let payload: Partial<CheckoutPayload>;

  try {
    payload = (await request.json()) as Partial<CheckoutPayload>;
  } catch {
    return Response.json({ error: "Некорректный JSON" }, { status: 400 });
  }

  const validation = validateCheckoutPayload(payload);

  if (!validation.ok) {
    return Response.json({ error: validation.error }, { status: 400 });
  }

  const order = createTelegramOrderLines(payload.items ?? [], products);

  if (!order.ok) {
    return Response.json({ error: order.error }, { status: 400 });
  }

  return Response.json({
    url: buildTelegramCheckoutUrl({
      username: telegramUsername,
      orderLines: order.lines,
      total: order.total
    })
  });
}
