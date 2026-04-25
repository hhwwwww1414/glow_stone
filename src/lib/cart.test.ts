import { describe, expect, it } from "vitest";
import {
  addCartItem,
  calculateCartTotal,
  removeCartItem,
  updateCartQuantity
} from "./cart";
import { products } from "./products";

describe("cart utilities", () => {
  it("adds an item once and increments quantity on repeat add", () => {
    const first = addCartItem([], "verdant-soul-pendant");
    const second = addCartItem(first, "verdant-soul-pendant");

    expect(second).toEqual([{ slug: "verdant-soul-pendant", quantity: 2 }]);
  });

  it("updates and removes cart items", () => {
    const cart = addCartItem([], "verdant-soul-pendant");
    const updated = updateCartQuantity(cart, "verdant-soul-pendant", 3);

    expect(updated[0].quantity).toBe(3);
    expect(removeCartItem(updated, "verdant-soul-pendant")).toEqual([]);
  });

  it("removes items when quantity becomes zero", () => {
    const cart = addCartItem([], "verdant-soul-pendant");

    expect(updateCartQuantity(cart, "verdant-soul-pendant", 0)).toEqual([]);
  });

  it("calculates totals from product data", () => {
    const cart = [{ slug: "verdant-soul-pendant", quantity: 2 }];

    expect(calculateCartTotal(cart, products)).toBe(248000);
  });
});
