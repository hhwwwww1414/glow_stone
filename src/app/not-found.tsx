import { ButtonLink } from "@/components/button";

export default function NotFound() {
  return (
    <main className="mx-auto max-w-2xl px-6 py-40 text-center">
      <p className="text-xs uppercase tracking-[0.3em] text-secondary">
        Страница не найдена
      </p>
      <h1 className="mt-6 font-serif text-5xl text-primary">
        Этого артефакта здесь нет
      </h1>
      <p className="mt-6 text-on-surface/65">
        Возможно, ссылка устарела или украшение уже покинуло коллекцию.
      </p>
      <ButtonLink className="mt-10" href="/catalog">
        Вернуться в каталог
      </ButtonLink>
    </main>
  );
}
