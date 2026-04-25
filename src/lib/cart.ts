import type { CartItem, Product } from "./types";

export function addCartItem(items: CartItem[], slug: string): CartItem[] {
  const existing = items.find((item) => item.slug === slug);

  if (!existing) {
    return [...items, { slug, quantity: 1 }];
  }

  return items.map((item) =>
    item.slug === slug ? { ...item, quantity: item.quantity + 1 } : item
  );
}

export function updateCartQuantity(
  items: CartItem[],
  slug: string,
  quantity: number
): CartItem[] {
  if (quantity <= 0) {
    return removeCartItem(items, slug);
  }

  return items.map((item) =>
    item.slug === slug ? { ...item, quantity } : item
  );
}

export function removeCartItem(items: CartItem[], slug: string): CartItem[] {
  return items.filter((item) => item.slug !== slug);
}

export function calculateCartTotal(items: CartItem[], products: Product[]) {
  return items.reduce((total, item) => {
    const product = products.find((candidate) => candidate.slug === item.slug);

    return total + (product?.price ?? 0) * item.quantity;
  }, 0);
}

export function countCartItems(items: CartItem[]) {
  return items.reduce((total, item) => total + item.quantity, 0);
}
