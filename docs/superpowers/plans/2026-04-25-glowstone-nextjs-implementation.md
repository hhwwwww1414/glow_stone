# GloWStone Next.js Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a production-oriented Russian GloWStone ecommerce frontend from the four static HTML pages.

**Architecture:** Scaffold a Next.js App Router app with TypeScript, Tailwind CSS v4, local API routes, typed local product data, and client-side cart/favorites. Keep API boundaries thin so local data can later be replaced by a CMS or commerce backend.

**Tech Stack:** Next.js 16.2.4, React 19.2.5, TypeScript, Tailwind CSS 4.2.4, Vitest 4.1.5.

---

## File Structure

- Create `package.json` for scripts and dependencies.
- Create `next.config.ts`, `tsconfig.json`, `postcss.config.mjs`, `vitest.config.ts`, `.gitignore`.
- Create `src/app/layout.tsx`, `src/app/globals.css`, `src/app/page.tsx`, `src/app/catalog/page.tsx`, `src/app/product/[slug]/page.tsx`, `src/app/about/page.tsx`, `src/app/cart/page.tsx`.
- Create `src/app/api/products/route.ts`, `src/app/api/products/[slug]/route.ts`, `src/app/api/collections/route.ts`, `src/app/api/telegram-checkout/route.ts`.
- Create `src/components/*` for shared shell, product UI, catalog controls, cart UI, and editorial sections.
- Create `src/lib/types.ts`, `src/lib/products.ts`, `src/lib/catalog.ts`, `src/lib/cart.ts`, `src/lib/telegram.ts`, `src/lib/format.ts`.
- Create tests: `src/lib/catalog.test.ts`, `src/lib/cart.test.ts`, `src/lib/telegram.test.ts`.

## Task 1: Scaffold App Tooling

**Files:**
- Create: `package.json`
- Create: `next.config.ts`
- Create: `tsconfig.json`
- Create: `postcss.config.mjs`
- Create: `vitest.config.ts`
- Create: `.gitignore`
- Create: `src/app/globals.css`
- Create: `src/app/layout.tsx`

- [ ] **Step 1: Add package scripts and dependencies**

Use `package.json` with these scripts:

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "typecheck": "tsc --noEmit",
    "test": "vitest run"
  }
}
```

- [ ] **Step 2: Install dependencies**

Run: `npm.cmd install`
Expected: dependencies installed and `package-lock.json` created.

- [ ] **Step 3: Add base app shell**

Create `src/app/layout.tsx` using `next/font/google` for `Noto Serif` and `Manrope`. Create `src/app/globals.css` with `@import "tailwindcss";`, design tokens, base typography, focus states, and Material Symbols font import.

- [ ] **Step 4: Verify tooling baseline**

Run: `npm.cmd run typecheck`
Expected: either no source errors or only missing page/module errors that are resolved in later tasks.

## Task 2: Add Failing Domain Tests

**Files:**
- Create: `src/lib/catalog.test.ts`
- Create: `src/lib/cart.test.ts`
- Create: `src/lib/telegram.test.ts`

- [ ] **Step 1: Write catalog tests**

Test behaviors:

```ts
import { describe, expect, it } from "vitest";
import { filterProducts, sortProducts } from "./catalog";
import { products } from "./products";

describe("catalog filtering", () => {
  it("filters products by category, stone, material, availability, and price", () => {
    const result = filterProducts(products, {
      categories: ["bracelets"],
      stones: ["malachite"],
      materials: ["gold"],
      availableOnly: true,
      price: { min: 10000, max: 90000 }
    });

    expect(result.map((product) => product.slug)).toEqual(["forest-whisper-bracelet"]);
  });

  it("returns no products when filters cannot match", () => {
    const result = filterProducts(products, {
      categories: ["rings"],
      stones: ["pearl"],
      materials: ["eco-resin"],
      availableOnly: true,
      price: { min: 1, max: 1000 }
    });

    expect(result).toHaveLength(0);
  });
});

describe("catalog sorting", () => {
  it("sorts by price ascending", () => {
    const result = sortProducts(products, "price-asc");
    expect(result[0].price).toBeLessThanOrEqual(result[1].price);
  });
});
```

- [ ] **Step 2: Write cart tests**

Test behaviors:

```ts
import { describe, expect, it } from "vitest";
import { addCartItem, calculateCartTotal, removeCartItem, updateCartQuantity } from "./cart";
import { products } from "./products";

describe("cart utilities", () => {
  it("adds an item once and increments quantity on repeat add", () => {
    const first = addCartItem([], "verdant-soul-pendant");
    const second = addCartItem(first, "verdant-soul-pendant");
    expect(second).toEqual([{ slug: "verdant-soul-pendant", quantity: 2 }]);
  });

  it("updates and removes cart items", () => {
    const cart = addCartItem([], "verdant-soul-pendant");
    const updated = updateCartQuantity(cart, "verdant-soul-pendant", 3);
    expect(updated[0].quantity).toBe(3);
    expect(removeCartItem(updated, "verdant-soul-pendant")).toEqual([]);
  });

  it("calculates totals from product data", () => {
    const cart = [{ slug: "verdant-soul-pendant", quantity: 2 }];
    expect(calculateCartTotal(cart, products)).toBe(248000);
  });
});
```

- [ ] **Step 3: Write Telegram tests**

Test behaviors:

```ts
import { describe, expect, it } from "vitest";
import { buildTelegramCheckoutUrl, validateCheckoutPayload } from "./telegram";

describe("telegram checkout", () => {
  it("validates a non-empty checkout payload", () => {
    const result = validateCheckoutPayload({ items: [{ slug: "verdant-soul-pendant", quantity: 1 }] });
    expect(result.ok).toBe(true);
  });

  it("rejects empty checkout payloads", () => {
    const result = validateCheckoutPayload({ items: [] });
    expect(result).toEqual({ ok: false, error: "Корзина пуста" });
  });

  it("builds a Telegram URL with readable order text", () => {
    const url = buildTelegramCheckoutUrl({
      username: "glowstone_shop",
      orderLines: ["The Verdant Soul Pendant x 1 — 124 000 ₽"],
      total: 124000
    });

    expect(url).toContain("https://t.me/glowstone_shop");
    expect(decodeURIComponent(url)).toContain("The Verdant Soul Pendant x 1");
  });
});
```

- [ ] **Step 4: Run tests and verify RED**

Run: `npm.cmd test -- src/lib/catalog.test.ts src/lib/cart.test.ts src/lib/telegram.test.ts`
Expected: FAIL because `catalog`, `cart`, `telegram`, and `products` modules do not exist yet.

## Task 3: Implement Domain Data And Helpers

**Files:**
- Create: `src/lib/types.ts`
- Create: `src/lib/products.ts`
- Create: `src/lib/catalog.ts`
- Create: `src/lib/cart.ts`
- Create: `src/lib/telegram.ts`
- Create: `src/lib/format.ts`

- [ ] **Step 1: Add types**

Define product, collection, filter, sort, cart, and checkout payload types in `src/lib/types.ts`.

- [ ] **Step 2: Add local products**

Create at least eight Russian-language products, including slug `verdant-soul-pendant` with price `124000` and `forest-whisper-bracelet` with category `bracelets`, stone `malachite`, material `gold`, available `true`.

- [ ] **Step 3: Add helper implementations**

Implement:

```ts
filterProducts(products, filters)
sortProducts(products, sort)
addCartItem(items, slug)
updateCartQuantity(items, slug, quantity)
removeCartItem(items, slug)
calculateCartTotal(items, products)
validateCheckoutPayload(payload)
buildTelegramCheckoutUrl(input)
formatPrice(price)
```

- [ ] **Step 4: Run tests and verify GREEN**

Run: `npm.cmd test -- src/lib/catalog.test.ts src/lib/cart.test.ts src/lib/telegram.test.ts`
Expected: PASS.

## Task 4: Implement Local API Routes

**Files:**
- Create: `src/app/api/products/route.ts`
- Create: `src/app/api/products/[slug]/route.ts`
- Create: `src/app/api/collections/route.ts`
- Create: `src/app/api/telegram-checkout/route.ts`

- [ ] **Step 1: Add route handlers**

Use App Router route handlers:

```ts
export async function GET() {
  return Response.json({ products });
}
```

For checkout, parse `await request.json()`, validate payload, resolve product names/prices, and return `{ url }` or `{ error }`.

- [ ] **Step 2: Verify API compiles**

Run: `npm.cmd run typecheck`
Expected: PASS for API route types.

## Task 5: Implement Client State And Shared UI

**Files:**
- Create: `src/components/cart-provider.tsx`
- Create: `src/components/header.tsx`
- Create: `src/components/footer.tsx`
- Create: `src/components/button.tsx`
- Create: `src/components/icon-button.tsx`

- [ ] **Step 1: Add cart provider**

Implement a client component that persists cart and favorites to `localStorage`, exposes add/update/remove/toggle methods, and derives cart count.

- [ ] **Step 2: Add shared shell components**

Implement glass header, mobile nav, cart/favorite counters, and footer links in Russian.

- [ ] **Step 3: Verify component types**

Run: `npm.cmd run typecheck`
Expected: PASS or only missing page component imports that are resolved in the next task.

## Task 6: Implement Pages And Product UI

**Files:**
- Create: `src/components/product-card.tsx`
- Create: `src/components/product-gallery.tsx`
- Create: `src/components/catalog-filters.tsx`
- Create: `src/components/cart-line-item.tsx`
- Create: `src/components/telegram-checkout.tsx`
- Create: `src/app/page.tsx`
- Create: `src/app/catalog/page.tsx`
- Create: `src/app/product/[slug]/page.tsx`
- Create: `src/app/about/page.tsx`
- Create: `src/app/cart/page.tsx`
- Create: `src/app/not-found.tsx`

- [ ] **Step 1: Implement product components**

Product cards link to `/product/[slug]`, support favorite toggles, image hover zoom, price, category, and availability messaging.

- [ ] **Step 2: Implement catalog**

Use client filters and sort controls. Show empty state when no products match.

- [ ] **Step 3: Implement product detail**

Use dynamic slug route, `notFound()` for unknown products, gallery thumbnails, accordions, add-to-cart, favorite, and Telegram CTA.

- [ ] **Step 4: Implement cart**

Show line items, quantity controls, total, empty state, and Telegram checkout button that calls `POST /api/telegram-checkout`.

- [ ] **Step 5: Implement editorial pages**

Translate source content into Russian, preserving the luxury editorial hierarchy from screenshots and design doc.

## Task 7: Final Verification

**Files:**
- Verify all created files.

- [ ] **Step 1: Run tests**

Run: `npm.cmd test`
Expected: PASS.

- [ ] **Step 2: Run typecheck**

Run: `npm.cmd run typecheck`
Expected: PASS.

- [ ] **Step 3: Run lint**

Run: `npm.cmd run lint`
Expected: PASS or document if Next 16 CLI lint script requires replacement.

- [ ] **Step 4: Run production build**

Run: `npm.cmd run build`
Expected: PASS.

- [ ] **Step 5: Start dev server**

Run: `npm.cmd run dev -- --port 3000`
Expected: app serves locally.

- [ ] **Step 6: Browser verification**

Verify desktop and mobile pages:

- `/`
- `/catalog`
- `/product/verdant-soul-pendant`
- `/about`
- `/cart`

Manual flow:

- Apply catalog filter.
- Open product.
- Add to favorites.
- Add to cart.
- Change quantity.
- Generate Telegram checkout URL.

## Self-Review

Spec coverage:

- Architecture, routes, local API, Russian language, visual direction, components, catalog behavior, cart/favorites, Telegram checkout, error states, and verification are covered.

Placeholder scan:

- No `TBD`, `TODO`, or intentionally incomplete scope remains.

Type consistency:

- Core names are consistent: product `slug`, cart item `{ slug, quantity }`, checkout `items`, filters `categories/stones/materials/availableOnly/price`.

