export type ProductCategory = "earrings" | "bracelets" | "necklaces" | "rings";

export type ProductStone =
  | "malachite"
  | "pearl"
  | "seraphinite"
  | "citrine"
  | "garnet"
  | "amethyst"
  | "quartz";

export type ProductMaterial =
  | "gold"
  | "silver"
  | "eco-resin"
  | "recycled-gold"
  | "recycled-silver";

export type ProductMood =
  | "protection"
  | "clarity"
  | "grounding"
  | "ritual"
  | "celebration";

export type ProductCollectionSlug =
  | "one-of-a-kind"
  | "stones-of-power"
  | "pearl-silence"
  | "mountain-line"
  | "resin-archives"
  | "garden-relics"
  | "daily-relics"
  | "night-minerals";

export type Product = {
  slug: string;
  name: string;
  collection: string;
  collectionSlug: ProductCollectionSlug;
  category: ProductCategory;
  stones: ProductStone[];
  materials: ProductMaterial[];
  moods: ProductMood[];
  price: number;
  available: boolean;
  isNew: boolean;
  featuredRank: number;
  image: string;
  gallery: string[];
  alt: string;
  shortDescription: string;
  story: string;
  meaning: string;
  specs: string[];
  care: string;
};

export type Collection = {
  slug: string;
  title: string;
  description: string;
  image: string;
};

export type PriceFilter = {
  min: number;
  max: number;
};

export type CatalogFilters = {
  categories: ProductCategory[];
  collections: ProductCollectionSlug[];
  stones: ProductStone[];
  materials: ProductMaterial[];
  moods: ProductMood[];
  availableOnly: boolean;
  price: PriceFilter;
};

export type CatalogSort = "featured" | "newest" | "price-asc" | "price-desc";

export type CartItem = {
  slug: string;
  quantity: number;
};

export type CheckoutPayload = {
  items: CartItem[];
};

export type ValidationResult =
  | { ok: true }
  | { ok: false; error: string };

export type OrderLinesResult =
  | { ok: true; lines: string[]; total: number }
  | { ok: false; error: string };
