import { describe, expect, it } from "vitest";
import { searchProducts } from "./search";
import { products } from "./products";

describe("product search", () => {
  it("finds products by Russian name and stone meaning", () => {
    const result = searchProducts(products, "малахит защита");

    expect(result.map((product) => product.slug)).toContain("verdant-soul-pendant");
  });

  it("finds products by collection and material", () => {
    const result = searchProducts(products, "Pearl золото");

    expect(result.map((product) => product.slug)).toContain("sea-foam-necklace");
  });

  it("returns an empty list for blank queries", () => {
    expect(searchProducts(products, "   ")).toEqual([]);
  });
});
