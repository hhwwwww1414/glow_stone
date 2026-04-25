import { getProductBySlug } from "@/lib/products";

export async function GET(
  _request: Request,
  context: { params: Promise<{ slug: string }> }
) {
  const { slug } = await context.params;
  const product = getProductBySlug(slug);

  if (!product) {
    return Response.json({ error: "Товар не найден" }, { status: 404 });
  }

  return Response.json({ product });
}
