import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductActions } from "@/components/product-actions";
import { ProductCard } from "@/components/product-card";
import { ProductGallery } from "@/components/product-gallery";
import { formatPrice } from "@/lib/format";
import { getProductBySlug, getRelatedProducts, products } from "@/lib/products";

type ProductPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({
  params
}: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    return { title: "Товар не найден" };
  }

  return {
    title: product.name,
    description: product.shortDescription
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const relatedProducts = getRelatedProducts(product.slug, 4);

  return (
    <main className="page-enter mx-auto max-w-screen-2xl px-6 pt-32 md:px-12">
      <div className="grid gap-16 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <ProductGallery product={product} />
        </div>
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-32">
            <nav className="mb-4 flex gap-2 text-[10px] uppercase tracking-[0.22em] text-on-surface/40">
              <span>Каталог</span>
              <span>/</span>
              <span>{product.collection}</span>
            </nav>
            <h1 className="font-serif text-5xl leading-tight text-primary">
              {product.name}
            </h1>
            <div className="mt-6 flex items-center gap-6">
              <span className="text-2xl font-light">
                {formatPrice(product.price)}
              </span>
              <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-secondary">
                {product.available ? "В наличии" : "На заказ"}
              </span>
            </div>
            <div className="mt-10">
              <ProductActions product={product} />
            </div>

            <section className="mt-10 space-y-6 border-y border-outline-variant/20 py-8">
              <div>
                <h2 className="font-serif text-lg italic text-secondary">
                  История украшения
                </h2>
                <p className="mt-3 text-sm leading-7 text-on-surface/70">
                  {product.story}
                </p>
              </div>
              <div>
                <h2 className="font-serif text-lg italic text-secondary">
                  Смысл камня
                </h2>
                <p className="mt-3 text-sm italic leading-7 text-on-surface/70">
                  {product.meaning}
                </p>
              </div>
            </section>

            <div className="mt-6">
              <details className="border-b border-outline-variant/20 py-4">
                <summary className="cursor-pointer text-xs font-semibold uppercase tracking-[0.22em] text-primary">
                  Материалы и параметры
                </summary>
                <ul className="mt-4 space-y-2 text-sm text-on-surface/65">
                  {product.specs.map((spec) => (
                    <li key={spec}>{spec}</li>
                  ))}
                </ul>
              </details>
              <details className="border-b border-outline-variant/20 py-4">
                <summary className="cursor-pointer text-xs font-semibold uppercase tracking-[0.22em] text-primary">
                  Уход
                </summary>
                <p className="mt-4 text-sm leading-7 text-on-surface/65">
                  {product.care}
                </p>
              </details>
            </div>
          </div>
        </div>
      </div>

      <section className="mt-32">
        <p className="text-xs uppercase tracking-[0.3em] text-secondary">
          Кураторский выбор
        </p>
        <h2 className="mt-4 font-serif text-4xl text-primary">Сочетается с</h2>
        <div className="mt-12 grid gap-8 md:grid-cols-4">
          {relatedProducts.map((related) => (
            <ProductCard key={related.slug} product={related} />
          ))}
        </div>
      </section>
    </main>
  );
}
