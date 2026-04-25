import type { Metadata } from "next";
import Image from "next/image";
import { ButtonLink } from "@/components/button";

export const metadata: Metadata = {
  title: "О бренде"
};

const heroImage =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuBxO1oX11f0J-XlJL6oqOoolcUiJGurRf4_M7ZPbwOUyr9-yxXBDlXCTC_n58TCrpzr5X5lAwd_tkNR9z2MzAwqJ8uTXCNfyeLIiy7J3ld9z_59nVf225xjCvQV907HdtdKjtZ-WUoMLwflfSUFEYo0dw_48UA1_mPuAKhtkdPmoWkKaOlP82sd9Ydycjr3T54TcmMMfhrcIs9Gj_1bjsSTZeT7nKYlifDDcyWjSXUvKDdY99GJwSAecZ5aaRvhhkd9PnY05o_YDi0";

const founderImage =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuDLWwWEUOoBKv2U6BImr6D2uZS3w45Sb7QEA3wHe0L99_xcmOxCAAdoubJhT7OA0jgejda1BbXqat8uKnq74F127HP8SkeXOcYxlT-fCgRGYedssCUJfDP1GXnmT09RXtzzw1Q0QdQG8w1QtWhf8dBLOsJ-DsI1mB8c_E3MCNZOPLFvWF4YOScLLkefv_YpzJDWDHCjMzjoq0WetCMXGZIBLkwiLkh_yMDegP2Qb5gzhYX2Z1idSbpvzkmpZfgTRJuaEg_-Vggf5Vo";

const workshopImages = [
  "https://lh3.googleusercontent.com/aida-public/AB6AXuDyklFky8H6zp5-XCGLlwSCSY9rAaNDiK81xkOWqYaEPkmxCpHB_oB1UtqpF1GcEmyIcf9OnGKdxOF-pSK7PkAXtHD18Ai-RrZAtJIOWITZN8Q6k1OkWART3Kvs4gXu7Xo1Htrd9Dl96iOptmNhVZVWLQFYwXrqEk1pHoZMcWOnaIWAdBvV0lkPu6cp4bUFbVbqjhdqcLMlhnmp3rETTwad9R1nrTZo_PH48lSPhm8om185m2BPKr8m7RBE-aQPoDyxRSD7H9XxYQQ",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuCnLmpTaCrS4QNFOgWi5k2fg1R5Ed3h41rhcRmTshvVwOzje4fojxP9nioU1t3eIfNQrNU3dOAZuphO1_EPLYR6GGHycFuhC22qNiJVIOQ3EMPuOlpI3mZHSnpRhMPbrSzkjwbPeZf0HWJSgf-7L-giRm9hoLl0MHlHiq3yDrRo_WC0sqZBiz199zN0j2Tfwk30s6bRlc-f9vyYr8unKp1F19H2wQoiqS9gwmOVVF4BzvIPx361FcZ9vt1MMLqoI7scUOHJ3K9-q4U",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuBgzP3pMUE80QYYrXqcP1EQKl3JJAGV6wwCkxT6GfONqk4Dkbv72Dms0E3U7rfSs7-RRNKvIAV2ePOGJI0DkWLNk3ezWePMst6sLK1D-NVyIq7l9F5W-qj2aVjnOxfSHWsyccO91KIC3_4TltMv5RPZCtUv_iZ9JBCqi2gl4dXfpLPMg8uux_DRENo8O1qq08ixNKV2rvCOAfYy4EOqTI9W9Mdp-36yRJechb9ek73ts-dH_QjPsJqiXnHEozuYFfeHE5psAbr_yOU"
];

export default function AboutPage() {
  return (
    <main className="page-enter pt-24">
      <section className="relative flex min-h-[76vh] items-center overflow-hidden">
        <Image
          alt="Фактура природного камня"
          className="absolute inset-0 h-full w-full scale-110 object-cover grayscale opacity-20"
          fill
          priority
          sizes="100vw"
          src={heroImage}
        />
        <div className="relative z-10 mx-auto grid w-full max-w-screen-2xl gap-12 px-6 py-24 md:grid-cols-12 md:px-12">
          <div className="md:col-span-7">
            <p className="mb-6 text-xs uppercase tracking-[0.35em] text-secondary">
              The Digital Curator
            </p>
            <h1 className="font-serif text-6xl leading-[0.9] text-primary md:text-9xl">
              Искусство вне времени
            </h1>
          </div>
          <p className="self-end text-lg leading-8 text-on-surface-variant md:col-span-5">
            GloWStone — это материальное воплощение тишины, природы и
            осознанного выбора.
          </p>
        </div>
      </section>

      <section className="bg-surface-container-low py-28">
        <div className="mx-auto grid max-w-screen-2xl gap-20 px-6 md:grid-cols-2 md:px-12">
          <div className="relative min-h-[620px]">
            <Image
              alt="Портрет основательницы бренда"
              className="aspect-[4/5] w-full object-cover grayscale"
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              src={founderImage}
            />
            <blockquote className="bg-primary p-8 text-white md:absolute md:-bottom-10 md:-right-10 md:max-w-sm">
              <p className="font-serif text-xl italic leading-8">
                Красота не в симметрии, а в истории, которую хранит каждый
                камень.
              </p>
              <cite className="mt-6 block text-xs not-italic uppercase tracking-[0.22em] text-white/55">
                Елена Г., основательница
              </cite>
            </blockquote>
          </div>
          <div className="self-center">
            <h2 className="font-serif text-5xl text-primary">За брендом</h2>
            <p className="mt-8 text-lg leading-8 text-on-surface/65">
              Всё началось с необработанного кристалла кварца из частной
              коллекции поставщика. Эта встреча изменила восприятие формы:
              материал стал не сырьем, а собеседником.
            </p>
            <p className="mt-6 text-lg leading-8 text-on-surface/65">
              Каждое изделие проходит через руки мастера — от кураторского
              выбора камня у поставщика до финальной полировки, сохраняющей
              природную душу материала.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-screen-2xl px-6 py-28 md:px-12">
        <div className="grid gap-20 md:grid-cols-[320px_1fr]">
          <div>
            <h2 className="font-serif text-5xl leading-tight text-primary">
              Наша философия
            </h2>
          </div>
          <div className="grid gap-12 md:grid-cols-2">
            <article>
              <h3 className="font-serif text-2xl text-primary">
                Медленный дизайн
              </h3>
              <p className="mt-5 leading-8 text-on-surface/65">
                Мы создаем по одной вещи за раз, позволяя камню задавать ритм
                будущего украшения.
              </p>
            </article>
            <article>
              <h3 className="font-serif text-2xl text-primary">
                Честность материалов
              </h3>
              <p className="mt-5 leading-8 text-on-surface/65">
                Переработанные металлы и природные камни от проверенных
                поставщиков — основа нашей роскоши.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="bg-surface-container-low py-28">
        <div className="mx-auto max-w-screen-2xl px-6 md:px-12">
          <h2 className="text-center font-serif text-5xl text-primary">
            Атмосфера мастерской
          </h2>
          <p className="mt-4 text-center text-xs uppercase tracking-[0.3em] text-on-surface/45">
            Место, где рождаются смыслы
          </p>
          <div className="mt-14 grid gap-4 md:grid-cols-3">
            {workshopImages.map((image, index) => (
              <div className="relative min-h-[420px] overflow-hidden" key={image}>
                <Image
                  alt={`Фрагмент мастерской ${index + 1}`}
                  className="object-cover"
                  fill
                  sizes="(min-width: 768px) 33vw, 100vw"
                  src={image}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="journal" className="mx-auto max-w-screen-2xl px-6 py-28 md:px-12">
        <div className="mb-12 flex items-end justify-between">
          <h2 className="font-serif text-4xl text-primary">События и жизнь</h2>
          <ButtonLink href="/catalog" variant="ghost">
            Смотреть каталог
          </ButtonLink>
        </div>
        <div className="grid gap-8 md:grid-cols-2">
          <article>
            <div className="aspect-[16/10] bg-primary/10" />
            <h3 className="mt-5 font-serif text-2xl text-primary">
              Презентация новой коллекции «Шепот камня»
            </h3>
          </article>
          <article>
            <div className="aspect-[16/10] bg-secondary/10" />
            <h3 className="mt-5 font-serif text-2xl text-primary">
              Как мы выбираем минералы у проверенных поставщиков
            </h3>
          </article>
        </div>
      </section>

      <section className="bg-primary px-6 py-24 text-center text-white">
        <h2 className="mx-auto max-w-2xl font-serif text-5xl leading-tight">
          Готовы найти свой артефакт?
        </h2>
        <ButtonLink className="mt-8" href="/catalog" variant="light">
          Посмотреть коллекцию
        </ButtonLink>
      </section>
    </main>
  );
}
