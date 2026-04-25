import { describe, expect, it } from "vitest";
import { filterProducts, sortProducts } from "./catalog";
import { products } from "./products";

describe("catalog filtering", () => {
  it("filters products by category, stone, material, availability, and price", () => {
    const result = filterProducts(products, {
      categories: ["bracelets"],
      stones: ["malachite"],
      materials: ["gold"],
      availableOnly: true,
      price: { min: 10000, max: 90000 }
    });

    expect(result.map((product) => product.slug)).toEqual([
      "forest-whisper-bracelet"
    ]);
  });

  it("returns no products when filters cannot match", () => {
    const result = filterProducts(products, {
      categories: ["rings"],
      stones: ["pearl"],
      materials: ["eco-resin"],
      availableOnly: true,
      price: { min: 1, max: 1000 }
    });

    expect(result).toHaveLength(0);
  });
});

describe("catalog sorting", () => {
  it("sorts by price ascending", () => {
    const result = sortProducts(products, "price-asc");

    expect(result[0].price).toBeLessThanOrEqual(result[1].price);
  });

  it("sorts by featured order without mutating source products", () => {
    const original = products.map((product) => product.slug);
    const result = sortProducts(products, "featured");

    expect(products.map((product) => product.slug)).toEqual(original);
    expect(result[0].featuredRank).toBeLessThanOrEqual(result[1].featuredRank);
  });
});
