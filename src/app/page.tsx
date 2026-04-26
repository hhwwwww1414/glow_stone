import Image from "next/image";
import { ButtonLink } from "@/components/button";
import { ProductCard } from "@/components/product-card";
import { collections, products } from "@/lib/products";

const heroImage =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuCnbQ6vBqMkxtgsIHHIeXQ99HwPFV-VIUmH7xQMUIsRL5434EoeR5N_mVZ8rloitWxJ1SWt5VqRmrt4Nsnor0H5ADvoPClCdh2W_TXUMwCY4XKAbPp5SqPsNPJxOpOBdx4l5S4_OHB5dY98ImfkzIax1EEGMcc8GpI56z9il4-w3bCvaxKFZjjMizMB2UkrD6LyD-VY9kl0XMC13gbT1VdFRUstLIwqyAiBZEGW1t5lQqnTM4c9C2-CfyWl6ITQuSKqGUU-Qbwoua8";

const processSteps = [
  {
    label: "01",
    title: "Рассмотрено",
    text: "Сначала мы смотрим на рисунок камня: как ложится свет, где проходит жила, насколько форма просит оправу."
  },
  {
    label: "02",
    title: "Собрано",
    text: "Металл не спорит с минералом. Он держит его тихо, оставляя неровность, глубину и природный ритм видимыми."
  },
  {
    label: "03",
    title: "Передано",
    text: "Изделие уходит не как быстрая покупка, а как предмет, о котором уже состоялся разговор."
  }
];

const moodLinks = [
  { label: "Защита", href: "/catalog?mood=protection" },
  { label: "Ясность", href: "/catalog?mood=clarity" },
  { label: "Заземление", href: "/catalog?mood=grounding" },
  { label: "Ритуал", href: "/catalog?mood=ritual" },
  { label: "Праздник", href: "/catalog?mood=celebration" }
];

export default function Home() {
  const featuredProducts = products.slice(0, 3);

  return (
    <main className="page-enter">
      <section className="relative flex min-h-[92vh] items-center overflow-hidden bg-primary pt-24">
        <Image
          alt="Макросъемка украшения GloWStone"
          className="absolute inset-0 h-full w-full object-cover opacity-55"
          fill
          priority
          sizes="100vw"
          src={heroImage}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/70 to-transparent" />
        <div className="relative z-10 mx-auto w-full max-w-screen-2xl px-6 py-24 md:px-12">
          <div className="max-w-3xl">
            <p className="mb-8 text-xs uppercase tracking-[0.34em] text-secondary-container">
              Кабинет камня и ручной работы
            </p>
            <h1 className="font-serif text-5xl leading-[0.95] text-white md:text-8xl">
              Камни, металл и тихие истории на коже.
            </h1>
            <p className="mt-8 max-w-xl text-lg leading-8 text-white/72">
              GloWStone собирает украшения как маленькие артефакты: без спешки,
              без давления, с вниманием к фактуре и голосу материала.
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <ButtonLink href="/catalog" variant="light">
                Рассмотреть изделия
              </ButtonLink>
              <ButtonLink href="/about" variant="inverseGhost">
                О мастерской
              </ButtonLink>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-surface px-6 py-10 md:px-12">
        <div className="mx-auto grid max-w-screen-2xl gap-6 border-b border-outline-variant/20 pb-10 md:grid-cols-[220px_1fr_280px] md:items-end">
          <p className="text-xs uppercase tracking-[0.28em] text-secondary">
            Object note
          </p>
          <p className="max-w-3xl font-serif text-2xl leading-snug text-primary md:text-4xl">
            В витрине остаются не только доступные изделия. Архивные предметы
            помогают понять почерк мастерской и обсудить похожий камень.
          </p>
          <ButtonLink href="/catalog?available=true" variant="ghost">
            Уточнить наличие
          </ButtonLink>
        </div>
      </section>

      <section className="mx-auto grid max-w-screen-2xl gap-16 px-6 py-28 md:grid-cols-2 md:px-12">
        <div className="relative aspect-square overflow-hidden bg-surface-container-low">
          <Image
            alt="Абстрактная минералогическая гравюра"
            className="h-full w-full object-cover"
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            src={collections[0].image}
          />
        </div>
        <div className="self-center">
          <p className="text-xs uppercase tracking-[0.3em] text-secondary">
            Философия GloWStone
          </p>
          <h2 className="mt-6 font-serif text-5xl leading-tight text-primary">
            Мы ценим не идеальную симметрию, а голос материала.
          </h2>
          <p className="mt-8 max-w-xl text-lg leading-8 text-on-surface/65">
            Каждое изделие строится вокруг камня: его прожилок, трещин,
            плотности цвета и ощущения в руке. Поэтому украшения не повторяются
            буквально.
          </p>
        </div>
      </section>

      <section className="bg-surface-container-low py-28">
        <div className="mx-auto max-w-screen-2xl px-6 md:px-12">
          <div className="mb-14 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <h2 className="font-serif text-5xl text-primary">Камни в витрине</h2>
            <ButtonLink href="/catalog" variant="ghost">
              Рассмотреть все
            </ButtonLink>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {featuredProducts.map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-primary py-28 text-white">
        <div className="mx-auto max-w-screen-2xl px-6 md:px-12">
          <h2 className="max-w-xl font-serif text-5xl italic leading-tight">
            Как предмет становится вашим
          </h2>
          <div className="mt-16 grid gap-8 md:grid-cols-3">
            {processSteps.map((step) => (
              <article className="bg-white/5 p-8" key={step.label}>
                <p className="text-4xl text-secondary-container">{step.label}</p>
                <h3 className="mt-8 font-serif text-2xl">{step.title}</h3>
                <p className="mt-4 text-sm leading-7 text-white/65">{step.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-screen-2xl px-6 py-28 text-center md:px-12">
        <p className="text-xs uppercase tracking-[0.3em] text-secondary">
          Подбор по настроению
        </p>
        <h2 className="mx-auto mt-6 max-w-2xl font-serif text-5xl leading-tight text-primary">
          Выберите не категорию, а состояние, с которым хочется жить рядом.
        </h2>
        <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {moodLinks.map((mood) => (
            <ButtonLink href={mood.href} key={mood.href} variant="secondary">
              {mood.label}
            </ButtonLink>
          ))}
        </div>
      </section>
    </main>
  );
}
