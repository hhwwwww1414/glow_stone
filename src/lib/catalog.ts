import type { CatalogFilters, CatalogSort, Product } from "./types";

function hasAny<T>(selected: T[], values: T[]) {
  return selected.length === 0 || selected.some((value) => values.includes(value));
}

export function filterProducts(products: Product[], filters: CatalogFilters) {
  return products.filter((product) => {
    const inCategory =
      filters.categories.length === 0 ||
      filters.categories.includes(product.category);
    const hasStone = hasAny(filters.stones, product.stones);
    const hasMaterial = hasAny(filters.materials, product.materials);
    const inAvailability = !filters.availableOnly || product.available;
    const inPrice =
      product.price >= filters.price.min && product.price <= filters.price.max;

    return inCategory && hasStone && hasMaterial && inAvailability && inPrice;
  });
}

export function sortProducts(products: Product[], sort: CatalogSort) {
  const sorted = [...products];

  switch (sort) {
    case "newest":
      return sorted.sort((left, right) => {
        if (left.isNew === right.isNew) {
          return left.featuredRank - right.featuredRank;
        }

        return left.isNew ? -1 : 1;
      });
    case "price-asc":
      return sorted.sort((left, right) => left.price - right.price);
    case "price-desc":
      return sorted.sort((left, right) => right.price - left.price);
    case "featured":
    default:
      return sorted.sort((left, right) => left.featuredRank - right.featuredRank);
  }
}

export const defaultFilters: CatalogFilters = {
  categories: [],
  stones: [],
  materials: [],
  availableOnly: false,
  price: { min: 0, max: 200000 }
};
