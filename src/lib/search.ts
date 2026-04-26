import type { Product } from "./types";

const stoneLabels: Record<Product["stones"][number], string> = {
  malachite: "малахит",
  pearl: "жемчуг",
  seraphinite: "серфинит",
  citrine: "цитрин",
  garnet: "гранат",
  amethyst: "аметист",
  quartz: "кварц"
};

const materialLabels: Record<Product["materials"][number], string> = {
  gold: "золото",
  silver: "серебро",
  "eco-resin": "эко смола",
  "recycled-gold": "переработанное золото",
  "recycled-silver": "переработанное серебро"
};

function normalize(value: string) {
  return value.toLocaleLowerCase("ru-RU").replace(/ё/g, "е");
}

function termVariants(term: string) {
  if (term.length > 4 && /[аяыиеу]$/.test(term)) {
    return [term, term.slice(0, -1)];
  }

  return [term];
}

function searchableText(product: Product) {
  return normalize(
    [
      product.name,
      product.collection,
      product.shortDescription,
      product.story,
      product.meaning,
      product.specs.join(" "),
      product.stones.map((stone) => stoneLabels[stone]).join(" "),
      product.materials.map((material) => materialLabels[material]).join(" ")
    ].join(" ")
  );
}

export function searchProducts(products: Product[], query: string) {
  const terms = normalize(query)
    .split(/\s+/)
    .map((term) => term.trim())
    .filter(Boolean);

  if (terms.length === 0) {
    return [];
  }

  return products.filter((product) => {
    const source = searchableText(product);

    return terms.every((term) =>
      termVariants(term).some((variant) => source.includes(variant))
    );
  });
}
