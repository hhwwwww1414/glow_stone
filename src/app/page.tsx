import Image from "next/image";
import { ButtonLink } from "@/components/button";
import { ProductCard } from "@/components/product-card";
import { collections, products } from "@/lib/products";

const heroImage =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuCnbQ6vBqMkxtgsIHHIeXQ99HwPFV-VIUmH7xQMUIsRL5434EoeR5N_mVZ8rloitWxJ1SWt5VqRmrt4Nsnor0H5ADvoPClCdh2W_TXUMwCY4XKAbPp5SqPsNPJxOpOBdx4l5S4_OHB5dY98ImfkzIax1EEGMcc8GpI56z9il4-w3bCvaxKFZjjMizMB2UkrD6LyD-VY9kl0XMC13gbT1VdFRUstLIwqyAiBZEGW1t5lQqnTM4c9C2-CfyWl6ITQuSKqGUU-Qbwoua8";

const processSteps = [
  {
    label: "01",
    title: "Найдено в земле",
    text: "Мы выбираем камни с выразительным природным рисунком и прозрачной историей."
  },
  {
    label: "02",
    title: "Сохранено",
    text: "Форма изделия подстраивается под минерал, а не прячет его особенности."
  },
  {
    label: "03",
    title: "Надето",
    text: "Украшение становится личным предметом, а не сезонным аксессуаром."
  }
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
              Кураторские украшения из природных камней
            </p>
            <h1 className="font-serif text-5xl leading-[0.95] text-white md:text-8xl">
              Украшения с характером, фактурой и историей.
            </h1>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <ButtonLink href="/catalog" variant="secondary" className="bg-white text-primary">
                В каталог
              </ButtonLink>
              <ButtonLink
                href="/about"
                variant="ghost"
                className="!text-white hover:!text-secondary-container"
              >
                О бренде
              </ButtonLink>
            </div>
          </div>
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
            Мы ищем не идеальную симметрию, а голос материала.
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
            <h2 className="font-serif text-5xl text-primary">Материалы Земли</h2>
            <ButtonLink href="/catalog" variant="ghost">
              Смотреть все
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
            Как рождается изделие
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
          Найдите украшение, которое совпадает с вашим ритуалом.
        </h2>
        <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {["Защита", "Ясность", "Заземление", "Ритуал", "Праздник"].map(
            (mood) => (
              <ButtonLink href="/catalog" key={mood} variant="secondary">
                {mood}
              </ButtonLink>
            )
          )}
        </div>
      </section>
    </main>
  );
}
