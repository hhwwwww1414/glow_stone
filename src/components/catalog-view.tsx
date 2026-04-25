"use client";

import { useMemo, useState } from "react";
import { defaultFilters, filterProducts, sortProducts } from "@/lib/catalog";
import type {
  CatalogFilters,
  CatalogSort,
  Product,
  ProductCategory,
  ProductMaterial,
  ProductStone
} from "@/lib/types";
import { ProductCard } from "./product-card";

const categories: { value: ProductCategory; label: string }[] = [
  { value: "earrings", label: "Серьги" },
  { value: "bracelets", label: "Браслеты" },
  { value: "necklaces", label: "Подвески" },
  { value: "rings", label: "Кольца" }
];

const stones: { value: ProductStone; label: string }[] = [
  { value: "malachite", label: "Малахит" },
  { value: "pearl", label: "Жемчуг" },
  { value: "seraphinite", label: "Серфинит" },
  { value: "citrine", label: "Цитрин" },
  { value: "garnet", label: "Гранат" },
  { value: "amethyst", label: "Аметист" }
];

const materials: { value: ProductMaterial; label: string }[] = [
  { value: "gold", label: "Золото" },
  { value: "silver", label: "Серебро" },
  { value: "eco-resin", label: "Эко-смола" }
];

function toggle<T>(values: T[], value: T) {
  return values.includes(value)
    ? values.filter((item) => item !== value)
    : [...values, value];
}

function FilterButton({
  active,
  children,
  onClick
}: {
  active: boolean;
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      className={`px-4 py-3 text-xs uppercase tracking-[0.18em] transition ${
        active
          ? "bg-primary text-white"
          : "bg-surface-container-high text-primary hover:bg-surface-container"
      }`}
      onClick={onClick}
      type="button"
    >
      {children}
    </button>
  );
}

export function CatalogView({ products }: { products: Product[] }) {
  const [filters, setFilters] = useState<CatalogFilters>(defaultFilters);
  const [sort, setSort] = useState<CatalogSort>("featured");

  const visibleProducts = useMemo(
    () => sortProducts(filterProducts(products, filters), sort),
    [filters, products, sort]
  );

  return (
    <div className="grid gap-12 lg:grid-cols-[280px_1fr]">
      <aside className="space-y-10">
        <div>
          <h2 className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">
            Категории
          </h2>
          <div className="mt-5 grid gap-2">
            {categories.map((category) => (
              <button
                className={`flex justify-between py-2 text-left text-sm transition hover:text-secondary ${
                  filters.categories.includes(category.value)
                    ? "text-primary"
                    : "text-on-surface/55"
                }`}
                key={category.value}
                onClick={() =>
                  setFilters((current) => ({
                    ...current,
                    categories: toggle(current.categories, category.value)
                  }))
                }
                type="button"
              >
                <span>{category.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">
            Камни
          </h2>
          <div className="mt-5 flex flex-wrap gap-2">
            {stones.map((stone) => (
              <FilterButton
                active={filters.stones.includes(stone.value)}
                key={stone.value}
                onClick={() =>
                  setFilters((current) => ({
                    ...current,
                    stones: toggle(current.stones, stone.value)
                  }))
                }
              >
                {stone.label}
              </FilterButton>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">
            Материалы
          </h2>
          <div className="mt-5 grid gap-3">
            {materials.map((material) => (
              <label
                className="flex items-center gap-3 text-sm text-on-surface/65"
                key={material.value}
              >
                <input
                  checked={filters.materials.includes(material.value)}
                  className="h-4 w-4 accent-[var(--primary)]"
                  onChange={() =>
                    setFilters((current) => ({
                      ...current,
                      materials: toggle(current.materials, material.value)
                    }))
                  }
                  type="checkbox"
                />
                {material.label}
              </label>
            ))}
          </div>
        </div>

        <label className="flex items-center gap-3 text-sm text-on-surface/70">
          <input
            checked={filters.availableOnly}
            className="h-4 w-4 accent-[var(--primary)]"
            onChange={(event) =>
              setFilters((current) => ({
                ...current,
                availableOnly: event.target.checked
              }))
            }
            type="checkbox"
          />
          Только в наличии
        </label>

        <button
          className="text-xs uppercase tracking-[0.22em] text-secondary"
          onClick={() => setFilters(defaultFilters)}
          type="button"
        >
          Сбросить фильтры
        </button>
      </aside>

      <section>
        <div className="mb-12 flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <p className="text-xs uppercase tracking-[0.25em] text-on-surface/45">
            Найдено {visibleProducts.length} украшений
          </p>
          <label className="flex items-center gap-3 text-xs uppercase tracking-[0.2em] text-primary">
            Сортировка
            <select
              className="bg-transparent py-2 text-xs uppercase tracking-[0.18em] text-primary outline-none"
              onChange={(event) => setSort(event.target.value as CatalogSort)}
              value={sort}
            >
              <option value="featured">Кураторский порядок</option>
              <option value="newest">Сначала новые</option>
              <option value="price-asc">Цена по возрастанию</option>
              <option value="price-desc">Цена по убыванию</option>
            </select>
          </label>
        </div>

        {visibleProducts.length > 0 ? (
          <div className="grid gap-x-10 gap-y-16 md:grid-cols-2 xl:grid-cols-3">
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
          </div>
        )}
      </section>
    </div>
  );
}
