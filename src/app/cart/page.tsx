import type { Metadata } from "next";
import { CartView } from "@/components/cart-view";
import { products } from "@/lib/products";

export const metadata: Metadata = {
  title: "Корзина"
};

export default function CartPage() {
  return <CartView products={products} />;
}
