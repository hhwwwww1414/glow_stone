import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { join } from "node:path";

const sourceFiles = [
  "glowstone_about_brand/code.html",
  "glowstone_home_page/code.html",
  "src/app/page.tsx",
  "src/app/about/page.tsx",
  "src/lib/products.ts"
];

const selfMiningClaims = [
  "Найдено в земле",
  "найденного в",
  "искали идеальные минералы",
  "Мы ищем",
  "добываем",
  "добыча"
];

describe("brand copy", () => {
  it("does not imply that GloWStone mines or finds stones itself", () => {
    const source = sourceFiles
      .map((file) => readFileSync(join(process.cwd(), file), "utf8"))
      .join("\n");

    for (const claim of selfMiningClaims) {
      expect(source).not.toContain(claim);
    }
  });
});
