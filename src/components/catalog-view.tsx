"use client";

import { SlidersHorizontal, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { defaultFilters, filterProducts, sortProducts } from "@/lib/catalog";
import type {
  CatalogFilters,
  CatalogSort,
  Product,
  ProductCategory,
  ProductCollectionSlug,
  ProductMaterial,
  ProductMood,
  ProductStone
} from "@/lib/types";
import { ProductCard } from "./product-card";

type FacetOption<T extends string> = {
  value: T;
  label: string;
};

type SearchParamsReader = Pick<URLSearchParams, "get" | "getAll">;

const categoryOptions: FacetOption<ProductCategory>[] = [
  { value: "earrings", label: "Серьги" },
  { value: "bracelets", label: "Браслеты" },
  { value: "necklaces", label: "Подвески" },
  { value: "rings", label: "Кольца" }
];

const stoneOptions: FacetOption<ProductStone>[] = [
  { value: "malachite", label: "Малахит" },
  { value: "pearl", label: "Жемчуг" },
  { value: "seraphinite", label: "Серфинит" },
  { value: "citrine", label: "Цитрин" },
  { value: "garnet", label: "Гранат" },
  { value: "amethyst", label: "Аметист" },
  { value: "quartz", label: "Кварц" }
];

const materialOptions: FacetOption<ProductMaterial>[] = [
  { value: "gold", label: "Золото" },
  { value: "recycled-gold", label: "Переработанное золото" },
  { value: "silver", label: "Серебро" },
  { value: "recycled-silver", label: "Переработанное серебро" },
  { value: "eco-resin", label: "Эко-смола" }
];

const moodOptions: FacetOption<ProductMood>[] = [
  { value: "protection", label: "Защита" },
  { value: "clarity", label: "Ясность" },
  { value: "grounding", label: "Заземление" },
  { value: "ritual", label: "Ритуал" },
  { value: "celebration", label: "Праздник" }
];

const sortOptions: FacetOption<CatalogSort>[] = [
  { value: "featured", label: "Кураторский порядок" },
  { value: "newest", label: "Сначала новые" },
  { value: "price-asc", label: "Сначала дешевле" },
  { value: "price-desc", label: "Сначала дороже" }
];

const priceLimit = 200000;
const priceStep = 5000;

function readValues<T extends string>(
  searchParams: SearchParamsReader,
  key: string,
  options: FacetOption<T>[]
) {
  const allowed = new Set(options.map((option) => option.value));

  return searchParams
    .getAll(key)
    .flatMap((value) => value.split(","))
    .filter((value): value is T => allowed.has(value as T));
}

function readPrice(searchParams: SearchParamsReader, key: string, fallback: number) {
  const rawValue = searchParams.get(key);

  if (!rawValue) {
    return fallback;
  }

  const value = Number(rawValue);

  if (!Number.isFinite(value)) {
    return fallback;
  }

  return Math.min(priceLimit, Math.max(0, Math.round(value / priceStep) * priceStep));
}

function getFilters(
  searchParams: SearchParamsReader,
  collectionOptions: FacetOption<ProductCollectionSlug>[]
): CatalogFilters {
  const min = readPrice(searchParams, "minPrice", defaultFilters.price.min);
  const max = readPrice(searchParams, "maxPrice", defaultFilters.price.max);

  return {
    categories: readValues(searchParams, "category", categoryOptions),
    collections: readValues(searchParams, "collection", collectionOptions),
    stones: readValues(searchParams, "stone", stoneOptions),
    materials: readValues(searchParams, "material", materialOptions),
    moods: readValues(searchParams, "mood", moodOptions),
    availableOnly: searchParams.get("available") === "true",
    price: {
      min: Math.min(min, max),
      max: Math.max(min, max)
    }
  };
}

function getSort(searchParams: SearchParamsReader): CatalogSort {
  const value = searchParams.get("sort");

  return sortOptions.some((option) => option.value === value)
    ? (value as CatalogSort)
    : "featured";
}

function pluralizeProducts(count: number) {
  const last = count % 10;
  const lastTwo = count % 100;

  if (last === 1 && lastTwo !== 11) {
    return "украшение";
  }

  if (last >= 2 && last <= 4 && (lastTwo < 12 || lastTwo > 14)) {
    return "украшения";
  }

  return "украшений";
}

function optionLabel<T extends string>(options: FacetOption<T>[], value: T) {
  return options.find((option) => option.value === value)?.label ?? value;
}

function buildCollectionOptions(products: Product[]) {
  const bySlug = new Map<ProductCollectionSlug, string>();

  for (const product of products) {
    bySlug.set(product.collectionSlug, product.collection);
  }

  return Array.from(bySlug.entries()).map(([value, label]) => ({ value, label }));
}

export function CatalogView({ products }: { products: Product[] }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  useEffect(() => {
    if (!mobileFiltersOpen) {
      return;
    }

    const originalBodyOverflow = document.body.style.overflow;
    const originalRootOverflow = document.documentElement.style.overflow;
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalBodyOverflow;
      document.documentElement.style.overflow = originalRootOverflow;
    };
  }, [mobileFiltersOpen]);

  const collectionOptions = useMemo(() => buildCollectionOptions(products), [products]);
  const filters = useMemo(
    () => getFilters(searchParams, collectionOptions),
    [collectionOptions, searchParams]
  );
  const sort = getSort(searchParams);
  const visibleProducts = useMemo(
    () => sortProducts(filterProducts(products, filters), sort),
    [filters, products, sort]
  );

  const activeCount =
    filters.categories.length +
    filters.collections.length +
    filters.stones.length +
    filters.materials.length +
    filters.moods.length +
    Number(filters.availableOnly) +
    Number(
      filters.price.min !== defaultFilters.price.min ||
        filters.price.max !== defaultFilters.price.max
    );

  const activeLabels = [
    ...filters.categories.map((value) => ({
      key: "category",
      value,
      label: optionLabel(categoryOptions, value)
    })),
    ...filters.collections.map((value) => ({
      key: "collection",
      value,
      label: optionLabel(collectionOptions, value)
    })),
    ...filters.stones.map((value) => ({
      key: "stone",
      value,
      label: optionLabel(stoneOptions, value)
    })),
    ...filters.materials.map((value) => ({
      key: "material",
      value,
      label: optionLabel(materialOptions, value)
    })),
    ...filters.moods.map((value) => ({
      key: "mood",
      value,
      label: optionLabel(moodOptions, value)
    })),
    ...(filters.availableOnly
      ? [{ key: "available", value: "true", label: "В наличии" }]
      : [])
  ];

  const heroLabel = activeLabels[0]?.label ?? "Каталог украшений";
  const heroDescription = activeLabels[0]
    ? `Подборка GloWStone по фильтру «${activeLabels[0].label}». Можно уточнить материал, настроение, цену и наличие.`
    : "Кураторская витрина украшений из природных камней: фильтруйте по форме, коллекции, камню, материалу и настроению.";

  function updateParams(mutator: (params: URLSearchParams) => void) {
    const params = new URLSearchParams(searchParams.toString());
    mutator(params);
    const query = params.toString();

    router.push(query ? `${pathname}?${query}` : pathname, { scroll: false });
  }

  function toggleFacet<T extends string>(key: string, value: T) {
    updateParams((params) => {
      const values = new Set(params.getAll(key).flatMap((item) => item.split(",")));

      if (values.has(value)) {
        values.delete(value);
      } else {
        values.add(value);
      }

      params.delete(key);

      for (const selectedValue of values) {
        if (selectedValue) {
          params.append(key, selectedValue);
        }
      }
    });
  }

  function setSingleParam(key: string, value: string | null) {
    updateParams((params) => {
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
    });
  }

  function clearFilters() {
    updateParams((params) => {
      [
        "category",
        "collection",
        "stone",
        "material",
        "mood",
        "available",
        "minPrice",
        "maxPrice"
      ].forEach((key) => params.delete(key));
    });
  }

  function clearPrice() {
    updateParams((params) => {
      params.delete("minPrice");
      params.delete("maxPrice");
    });
  }

  function countBy(predicate: (product: Product) => boolean) {
    return products.filter(predicate).length;
  }

  function renderFilterPill({
    active,
    count,
    label,
    onClick
  }: {
    active: boolean;
    count?: number;
    label: string;
    onClick: () => void;
  }) {
    return (
      <button
        className={`inline-flex min-h-10 items-center justify-center gap-2 px-4 py-2 text-xs uppercase leading-tight tracking-[0.18em] transition ${
          active
            ? "bg-primary text-white"
            : "bg-surface-container-high text-primary hover:bg-surface-container"
        }`}
        onClick={onClick}
        type="button"
      >
        <span>{label}</span>
        {typeof count === "number" ? <span className="opacity-45">{count}</span> : null}
      </button>
    );
  }

  function renderFilterPanel() {
    return (
      <div className="space-y-10">
        <div className="flex items-center justify-between">
          <h2 className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">
            Фильтры
          </h2>
          <button
            className="text-xs uppercase tracking-[0.22em] text-secondary disabled:text-on-surface/25"
            disabled={activeCount === 0}
            onClick={clearFilters}
            type="button"
          >
            Сбросить
          </button>
        </div>

        <fieldset>
          <legend className="text-xs font-semibold uppercase tracking-[0.28em] text-primary">
            Категории
          </legend>
          <div className="mt-5 grid gap-2">
            {categoryOptions.map((category) => (
              <button
                className={`flex justify-between py-2 text-left text-sm transition hover:text-secondary ${
                  filters.categories.includes(category.value)
                    ? "text-primary"
                    : "text-on-surface/55"
                }`}
                key={category.value}
                onClick={() => toggleFacet("category", category.value)}
                type="button"
              >
                <span>{category.label}</span>
                <span className="text-on-surface/35">
                  {countBy((product) => product.category === category.value)}
                </span>
              </button>
            ))}
          </div>
        </fieldset>

        <fieldset>
          <legend className="text-xs font-semibold uppercase tracking-[0.28em] text-primary">
            Коллекции
          </legend>
          <div className="mt-5 grid gap-2">
            {collectionOptions.map((collection) => (
              <button
                className={`flex justify-between py-2 text-left text-sm transition hover:text-secondary ${
                  filters.collections.includes(collection.value)
                    ? "text-primary"
                    : "text-on-surface/55"
                }`}
                key={collection.value}
                onClick={() => toggleFacet("collection", collection.value)}
                type="button"
              >
                <span>{collection.label}</span>
                <span className="text-on-surface/35">
                  {countBy((product) => product.collectionSlug === collection.value)}
                </span>
              </button>
            ))}
          </div>
        </fieldset>

        <fieldset>
          <legend className="text-xs font-semibold uppercase tracking-[0.28em] text-primary">
            Камни
          </legend>
          <div className="mt-5 flex flex-wrap gap-2">
            {stoneOptions.map((stone) => (
              <div key={stone.value}>
                {renderFilterPill({
                  active: filters.stones.includes(stone.value),
                  count: countBy((product) => product.stones.includes(stone.value)),
                  label: stone.label,
                  onClick: () => toggleFacet("stone", stone.value)
                })}
              </div>
            ))}
          </div>
        </fieldset>

        <fieldset>
          <legend className="text-xs font-semibold uppercase tracking-[0.28em] text-primary">
            Настроение
          </legend>
          <div className="mt-5 flex flex-wrap gap-2">
            {moodOptions.map((mood) => (
              <div key={mood.value}>
                {renderFilterPill({
                  active: filters.moods.includes(mood.value),
                  label: mood.label,
                  onClick: () => toggleFacet("mood", mood.value)
                })}
              </div>
            ))}
          </div>
        </fieldset>

        <fieldset>
          <legend className="text-xs font-semibold uppercase tracking-[0.28em] text-primary">
            Материалы
          </legend>
          <div className="mt-5 grid gap-3">
            {materialOptions.map((material) => (
              <label
                className="flex cursor-pointer items-center gap-3 text-sm text-on-surface/65"
                key={material.value}
              >
                <input
                  checked={filters.materials.includes(material.value)}
                  className="h-4 w-4 accent-[var(--primary)]"
                  onChange={() => toggleFacet("material", material.value)}
                  type="checkbox"
                />
                {material.label}
              </label>
            ))}
          </div>
        </fieldset>

        <fieldset>
          <legend className="text-xs font-semibold uppercase tracking-[0.28em] text-primary">
            Цена
          </legend>
          <div className="mt-5 space-y-5">
            <input
              aria-label="Минимальная цена"
              className="w-full accent-[var(--primary)]"
              max={priceLimit}
              min={0}
              onChange={(event) => setSingleParam("minPrice", event.target.value)}
              step={priceStep}
              type="range"
              value={filters.price.min}
            />
            <input
              aria-label="Максимальная цена"
              className="w-full accent-[var(--primary)]"
              max={priceLimit}
              min={0}
              onChange={(event) => setSingleParam("maxPrice", event.target.value)}
              step={priceStep}
              type="range"
              value={filters.price.max}
            />
            <div className="grid grid-cols-2 gap-3">
              <div className="border border-outline-variant/40 px-3 py-2 text-xs uppercase tracking-[0.16em] text-on-surface/55">
                от {filters.price.min.toLocaleString("ru-RU")} ₽
              </div>
              <div className="border border-outline-variant/40 px-3 py-2 text-xs uppercase tracking-[0.16em] text-on-surface/55">
                до {filters.price.max.toLocaleString("ru-RU")} ₽
              </div>
            </div>
          </div>
        </fieldset>

        <button
          className="flex w-full items-center justify-between py-2 text-left text-sm text-on-surface/70"
          onClick={() =>
            setSingleParam("available", filters.availableOnly ? null : "true")
          }
          type="button"
        >
          <span>Только в наличии</span>
          <span
            className={`relative h-5 w-10 transition ${
              filters.availableOnly ? "bg-primary" : "bg-surface-container-high"
            }`}
          >
            <span
              className={`absolute top-1 h-3 w-3 bg-white transition ${
                filters.availableOnly ? "left-6" : "left-1"
              }`}
            />
          </span>
        </button>
      </div>
    );
  }

  return (
    <>
      <section className="bg-surface-container-low px-6 pt-32 pb-20 md:px-12 md:pb-24">
        <div className="mx-auto max-w-screen-2xl">
          <nav className="mb-12 text-xs uppercase tracking-[0.25em] text-on-surface/40">
            Главная / Каталог
          </nav>
          <div className="grid gap-8 lg:grid-cols-[minmax(0,780px)_1fr] lg:items-end">
            <header>
              <h1 className="max-w-full break-words font-serif text-5xl leading-[1] text-primary sm:text-6xl md:text-8xl">
                {heroLabel}
              </h1>
              <p className="mt-8 max-w-3xl text-lg leading-8 text-on-surface/65">
                {heroDescription}
              </p>
            </header>
            <div className="hidden justify-self-end text-right text-xs uppercase tracking-[0.24em] text-on-surface/45 lg:block">
              {products.length} {pluralizeProducts(products.length)} в витрине
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-screen-2xl px-6 py-12 md:px-12">
        <div className="grid gap-10 lg:grid-cols-[280px_1fr]">
          <aside className="hidden lg:block">
            <div className="sticky top-28">
              {renderFilterPanel()}
            </div>
          </aside>

          <section>
            <div className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
              <button
                className="inline-flex min-h-12 items-center justify-center gap-3 bg-primary px-5 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-white lg:hidden"
                onClick={() => setMobileFiltersOpen(true)}
                type="button"
              >
                <SlidersHorizontal size={16} strokeWidth={1.8} />
                Фильтры
                {activeCount > 0 ? (
                  <span className="bg-white px-2 py-1 text-[10px] text-primary">
                    {activeCount}
                  </span>
                ) : null}
              </button>

              <div>
                <p className="text-xs uppercase tracking-[0.24em] text-on-surface/45">
                  Найдено {visibleProducts.length}{" "}
                  {pluralizeProducts(visibleProducts.length)}
                </p>
                {activeLabels.length > 0 ||
                filters.price.min !== defaultFilters.price.min ||
                filters.price.max !== defaultFilters.price.max ? (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {activeLabels.map((filter) => (
                      <button
                        className="inline-flex items-center gap-2 bg-surface-container-high px-3 py-2 text-[10px] uppercase tracking-[0.18em] text-primary"
                        key={`${filter.key}-${filter.value}`}
                        onClick={() => toggleFacet(filter.key, filter.value)}
                        type="button"
                      >
                        {filter.label}
                        <X size={12} strokeWidth={1.8} />
                      </button>
                    ))}
                    {filters.price.min !== defaultFilters.price.min ||
                    filters.price.max !== defaultFilters.price.max ? (
                      <button
                        className="inline-flex items-center gap-2 bg-surface-container-high px-3 py-2 text-[10px] uppercase tracking-[0.18em] text-primary"
                        onClick={clearPrice}
                        type="button"
                      >
                        Цена
                        <X size={12} strokeWidth={1.8} />
                      </button>
                    ) : null}
                  </div>
                ) : null}
              </div>

              <label className="flex items-center gap-3 text-xs uppercase tracking-[0.2em] text-primary">
                Сортировка
                <select
                  className="min-h-11 border border-outline-variant/40 bg-transparent px-3 text-xs uppercase tracking-[0.16em] text-primary outline-none"
                  onChange={(event) => setSingleParam("sort", event.target.value)}
                  value={sort}
                >
                  {sortOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            {visibleProducts.length > 0 ? (
              <div className="grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 md:grid-cols-3 xl:grid-cols-4">
                {visibleProducts.map((product) => (
                  <ProductCard key={product.slug} product={product} />
                ))}
              </div>
            ) : (
              <div className="bg-surface-container-low px-8 py-16 text-center">
                <h2 className="font-serif text-3xl text-primary">
                  По этим фильтрам ничего не найдено
                </h2>
                <p className="mx-auto mt-4 max-w-md text-on-surface/65">
                  Снимите часть ограничений или вернитесь к кураторскому порядку.
                </p>
                <button
                  className="mt-8 text-xs uppercase tracking-[0.22em] text-secondary"
                  onClick={clearFilters}
                  type="button"
                >
                  Сбросить фильтры
                </button>
              </div>
            )}
          </section>
        </div>
      </section>

      {mobileFiltersOpen ? (
        <div className="fixed inset-0 lg:hidden" style={{ zIndex: 100 }}>
          <button
            aria-label="Закрыть фильтры"
            className="absolute inset-0 bg-primary/45"
            onClick={() => setMobileFiltersOpen(false)}
            type="button"
          />
          <aside className="absolute left-0 top-0 h-full w-[min(88vw,380px)] overflow-y-auto bg-surface px-6 py-8 shadow-2xl">
            <div className="mb-8 flex items-center justify-between">
              <p className="text-xs uppercase tracking-[0.28em] text-secondary">
                Подбор
              </p>
              <button
                aria-label="Закрыть фильтры"
                className="flex h-10 w-10 items-center justify-center bg-surface-container-low text-primary"
                onClick={() => setMobileFiltersOpen(false)}
                type="button"
              >
                <X size={18} strokeWidth={1.8} />
              </button>
            </div>
            {renderFilterPanel()}
          </aside>
        </div>
      ) : null}
    </>
  );
}
