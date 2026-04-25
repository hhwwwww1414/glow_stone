import type { Metadata } from "next";
import { CatalogView } from "@/components/catalog-view";
import { products } from "@/lib/products";

export const metadata: Metadata = {
  title: "Каталог"
};

export default function CatalogPage() {
  return (
    <main className="page-enter mx-auto max-w-screen-2xl px-6 pt-32 md:px-12">
      <nav className="mb-12 text-xs uppercase tracking-[0.25em] text-on-surface/40">
        Главная / Каталог
      </nav>
      <header className="mb-20 max-w-4xl">
        <h1 className="font-serif text-6xl leading-tight text-primary md:text-8xl">
          Каталог украшений
        </h1>
        <p className="mt-8 max-w-3xl text-lg leading-8 text-on-surface/65">
          Каждое изделие GloWStone — это диалог между необузданной силой
          природы и мастерством ювелирного искусства.
        </p>
      </header>
      <CatalogView products={products} />
    </main>
  );
}
