import { collections } from "@/lib/products";

export async function GET() {
  return Response.json({ collections });
}
