import { describe, expect, it } from "vitest";
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

const sourceFiles = [
  ...collectSourceFiles("src")
];

const selfMiningClaims = [
  "Найдено в земле",
  "найденного в",
  "искали идеальные минералы",
  "Мы ищем",
  "добываем",
  "добыча"
];

const genericLuxuryClaims = [
  "Украшения, которые подчеркнут вашу индивидуальность",
  "Уникальные изделия для особенных женщин",
  "Купить сейчас",
  "Успейте купить",
  "Эксклюзивное предложение",
  "Получить скидку",
  "Роскошь, доступная каждой"
];

function collectSourceFiles(directory: string): string[] {
  return readdirSync(join(process.cwd(), directory)).flatMap((entry) => {
    const path = `${directory}/${entry}`;
    const absolutePath = join(process.cwd(), path);

    if (statSync(absolutePath).isDirectory()) {
      return collectSourceFiles(path);
    }

    return /\.(test|spec)\.(ts|tsx)$/.test(entry) || !/\.(ts|tsx|css)$/.test(entry)
      ? []
      : [path];
  });
}

describe("brand copy", () => {
  it("does not imply that GloWStone mines or finds stones itself", () => {
    const source = sourceFiles
      .map((file) => readFileSync(join(process.cwd(), file), "utf8"))
      .join("\n");

    for (const claim of selfMiningClaims) {
      expect(source).not.toContain(claim);
    }
  });

  it("does not use generic luxury or urgency phrases", () => {
    const source = sourceFiles
      .map((file) => readFileSync(join(process.cwd(), file), "utf8"))
      .join("\n");

    for (const claim of genericLuxuryClaims) {
      expect(source).not.toContain(claim);
    }
  });

  it("has a brand lock document with required creative guardrails", () => {
    const brandLockPath = join(process.cwd(), "docs/brand-lock.md");

    expect(existsSync(brandLockPath)).toBe(true);

    const brandLock = readFileSync(brandLockPath, "utf8");

    expect(brandLock).toContain("## Манифест");
    expect(brandLock).toContain("## Anti-Generic Checklist");
    expect(brandLock).toContain("## Tone Of Voice");
    expect(brandLock).toContain("## Banned");
    expect(brandLock).toContain("## Homepage Composition Sketches");
  });
});
