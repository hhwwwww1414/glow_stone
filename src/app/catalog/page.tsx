import type { Metadata } from "next";
import { Suspense } from "react";
import { CatalogView } from "@/components/catalog-view";
import { products } from "@/lib/products";

export const metadata: Metadata = {
  title: "Каталог"
};

export default function CatalogPage() {
  return (
    <main>
      <Suspense
        fallback={
          <section className="mx-auto max-w-screen-2xl px-6 pt-32 md:px-12">
            <p className="text-xs uppercase tracking-[0.25em] text-on-surface/40">
              Каталог загружается
            </p>
            <div className="mt-12 h-[420px] bg-surface-container-low" />
          </section>
        }
      >
        <CatalogView products={products} />
      </Suspense>
    </main>
  );
}
