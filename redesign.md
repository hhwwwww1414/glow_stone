---
title: GloWStone Frontend Redesign Plan
status: active
date: 2026-04-26
type: redesign
---

# GloWStone Frontend Redesign Plan

## 1. Контекст проекта

Проект уже является рабочим Next.js storefront:

- Stack: Next.js 16.2.4, React 19.2.5, TypeScript 6.0.3, Tailwind CSS 4.2.4, Vitest.
- Routes: `/`, `/catalog`, `/product/[slug]`, `/about`, `/cart`, локальные API routes.
- Data layer: typed local catalog in `src/lib/products.ts`, filters in `src/lib/catalog.ts`, cart helpers in `src/lib/cart.ts`, Telegram checkout in `src/lib/telegram.ts`.
- UI: App Router shell in `src/app/layout.tsx`, shared components in `src/components/*`, global tokens in `src/app/globals.css`.
- Existing creative source: `lustre_lithos/DESIGN.md` defines the "Digital Curator" direction: bone-white canvas, deep emerald, muted gold, editorial serif, Manrope UI text, sharp geometry, tonal layering.
- Baseline verification on 2026-04-26: tests pass, typecheck passes, lint passes, production build passes.

Current frontend is a solid first implementation, but it still feels like a converted static concept rather than a mature luxury ecommerce experience. The redesign should refine the existing direction instead of replacing it.

## 2. Skills Applied

- `frontend-design`: treat this as an existing design system, not greenfield. Keep the current luxury/editorial language, improve composition, states, accessibility, and visual verification.
- `ui-ux-pro-max`: apply priority checks for accessibility, touch targets, image performance, responsive layout, typography, animation, and feedback.
- `web-design-guidelines`: use Vercel Web Interface Guidelines as a review checklist for focus states, forms, reduced motion, URL state, images, locale formatting, and semantic controls.
- `react-best-practices`: use Vercel React/Next guidance for image loading, server/client boundaries, localStorage schema, rerender control, and bundle discipline.
- `bencium-controlled-ux-designer`: before implementation, ask for approval on major visual direction choices. This plan defines the recommended direction, but code work should start with a short design checkpoint.

## 3. Visual Thesis

Recommended direction: **Digital Curator v2**.

The site should feel like an online jewelry cabinet curated by a gallery: tactile macro imagery, asymmetric editorial rhythm, quiet bone-white surfaces, deep emerald brand moments, gold only for meaningful emphasis, and commerce controls that feel precise rather than generic.

Do not pivot to generic SaaS, rounded card grids, heavy shadows, decorative gradients, or busy marketplace UI. The modernization should make the current identity more deliberate, not louder.

## 4. Brand Lock / Anti-Template Direction

Before any UI changes, the implementation must lock the GloWStone brand direction so AI-assisted work does not drift into generic luxury ecommerce.

**Brand lock outputs:**

- Brand manifesto, 300-500 words, written in Russian.
- Anti-generic checklist for every redesign pass.
- Approved tone-of-voice examples.
- Banned phrases and visual patterns.
- Translation of visual references into concrete UI rules.
- Three homepage composition sketches in text form.

**Banned phrases:**

- "Украшения, которые подчеркнут вашу индивидуальность"
- "Уникальные изделия для особенных женщин"
- "Купить сейчас"
- "Успейте купить"
- "Эксклюзивное предложение"
- "Получить скидку"
- "Роскошь, доступная каждой"
- Any phrase that sounds like marketplace, info-business, mass beauty retail, or generic luxury copy.

**Banned visual patterns:**

- Generic beige luxury.
- Pink feminine boutique.
- SaaS gradients.
- Round cards with icons.
- Meaningless "advantages" section.
- Stock jewelry glamor.
- Template hero with centered headline and CTA.
- Decorative orbs, bokeh blobs, abstract SVG waves, and generic gradient backgrounds.
- Overloaded logo clouds, metric strips, or fake social proof sections.

**Visual references translated into UI rules:**

- `lustre_lithos/DESIGN.md`: use deep emerald for high-impact brand moments, muted gold for restrained action emphasis, bone-white and tonal surface shifts for section rhythm.
- Existing screenshots in `docs/superpowers/screenshots/*`: preserve large serif editorial scale, sharp geometry, quiet spacing, and full-bleed product imagery.
- Source static pages in `glowstone_*`: preserve the gallery/shop hybrid, but remove static-page repetition and weak placeholder sections.
- `reference/public/images/*`: use as optional local asset source, not as a style reset.

**Homepage composition sketches:**

1. **Object First:** full-bleed macro jewelry hero with left-anchored serif headline, one soft CTA, and a visible next-section sliver showing a curated object note.
2. **Curator Table:** hero as a worktable/cabinet composition, with product image, material notes, and a short maker sentence arranged asymmetrically.
3. **Stone Archive:** first screen built like an exhibition wall: one dominant product texture, narrow caption column, quiet navigation into catalog, and no centered template CTA block.

## 5. Creative Acceptance Criteria

These criteria are as important as build health. A technically passing redesign can still fail if it loses the brand.

- The first screen does not look like an ecommerce template.
- Within 5 seconds, it is clear that GloWStone is an authorial workshop/curated jewelry studio, not a costume-jewelry shop.
- The writing sounds like a living maker or curator, without familiarity, pressure, or mystical overstatement.
- The catalog feels like a curated cabinet, not a marketplace grid.
- The product page creates the feeling of inspecting an object, not only buying an SKU.
- Primary CTAs are soft and human: "Написать мастеру", "Уточнить наличие", "Обсудить похожее", "Рассмотреть изделие".
- Sold or unavailable pieces can exist as part of the brand story, not only as broken commerce states.
- Every decorative choice has a relationship to stone, metal, craft, light, cabinet, archive, or workshop.
- No section exists only because generic landing pages usually have it.

## 6. Copy System

GloWStone depends on voice. Copy work is not a finishing pass; it is part of the design system.

**Tone of voice:**

- Warm, adult, personal.
- Calm and precise, without marketplace pressure.
- Slightly poetic, but not sweet or sentimental.
- No info-business energy, no "unlock/transform/elevate" language.
- No "buy now" urgency.
- No excessive esotericism. Stones may carry mood and meaning, but not miracle claims.
- Describe stones through color, texture, light, weight, irregularity, temperature, and how they sit on the body.
- The maker should sound like a person, not a brand department.

**CTA vocabulary to use:**

- Написать мастеру
- Уточнить наличие
- Обсудить похожее
- Рассмотреть изделие
- Забронировать
- Собрать под образ
- Перейти в кабинет изделий
- Спросить о камне

**CTA vocabulary to avoid:**

- Купить сейчас
- Добавить в корзину as the dominant product CTA
- Получить скидку
- Успейте купить
- Эксклюзивное предложение
- Оформить покупку in a hard marketplace tone
- Любая CTA-фраза, которая давит на срочность вместо приглашения к разговору.

**Implementation implications:**

- `src/components/product-actions.tsx` should likely demote "В корзину" and elevate Telegram conversation/reservation language.
- `src/components/cart-view.tsx` should explain Telegram handoff as a conversation with the workshop.
- `src/app/page.tsx` and `src/app/about/page.tsx` should carry the brand voice before component polish.
- `src/lib/copy.test.ts` should remain and may be expanded with banned phrase coverage.

## 7. Requirements

- R1. Preserve the existing GloWStone brand system from `lustre_lithos/DESIGN.md`.
- R2. Complete Brand Lock before UI implementation so the redesign has a non-generic creative boundary.
- R3. Improve the first-screen impact and section rhythm on home/about without adding marketing filler.
- R4. Make catalog browsing feel curated and efficient on desktop and mobile.
- R5. Make product pages stronger for inspection, trust, and Telegram conversion.
- R6. Improve cart/checkout clarity, unavailable-item handling, and async feedback.
- R7. Replace ad hoc visual styling with reusable tokens/components where repetition is already visible.
- R8. Meet accessibility basics: labels, focus states, keyboard paths, live async messages, reduced motion, 44px touch targets.
- R9. Improve image strategy: local or stable assets where possible, lazy loading below fold, no irrelevant gallery thumbnails.
- R10. Preserve and expand copy constraints so Russian brand voice does not drift into generic ecommerce.
- R11. Keep current build health: tests, typecheck, lint, production build must continue passing.
- R12. Keep scope frontend-only: no real payments, accounts, CMS, inventory backend, or admin panel in this redesign phase.

## 8. Scope Boundaries

In scope:

- Brand manifesto and anti-template direction.
- Copy system and CTA language.
- Visual system hardening.
- Early home/about editorial prototype.
- Shared component refinement.
- Home, catalog, product, about, cart UI modernization.
- Frontend state and interaction polish.
- Accessibility and performance improvements.
- Screenshot-based desktop/mobile verification, including edge states.

Out of scope:

- Real payment processing.
- User accounts.
- Admin editor.
- CMS or database migration.
- Real inventory synchronization.
- Full shadcn/ui migration.
- Replacing Telegram checkout with a custom order system.

## 9. Current Findings

### Strengths

- `src/app/globals.css` already has semantic brand tokens for surface, primary, secondary, typefaces, and focus outline.
- `src/app/page.tsx` and `src/app/about/page.tsx` already use a strong editorial layout and high-impact typography.
- `src/components/catalog-view.tsx` already keeps filter state in the URL, which is correct for shareable catalog state.
- `src/components/product-card.tsx` and `src/components/product-gallery.tsx` already reserve image aspect ratios and use `next/image`.
- `src/components/cart-provider.tsx` keeps cart and favorites client-side without contaminating server routes.
- Existing tests cover catalog filtering, cart logic, Telegram checkout, and brand copy constraints.

### Gaps To Address

- Header search is a visible control but has no search experience.
- Footer newsletter form has no real state, no `name`/`autocomplete`, and no submission feedback.
- `outline-none` appears on form controls without local focus replacement in `src/components/catalog-view.tsx` and `src/components/footer.tsx`.
- Async UI messages in `src/components/product-actions.tsx` and `src/components/telegram-checkout.tsx` should use accessible live regions.
- Mobile filter drawer in `src/components/catalog-view.tsx` locks scroll manually but lacks a fuller sheet pattern: focus handling, Escape behavior, inert/background isolation, and `overscroll-behavior`.
- Product gallery thumbnails can show unrelated remote imagery. The gallery needs an asset audit and stronger product-specific image set.
- Product card images use `loading="eager"` in catalog grids; below-fold grid images should lazy load.
- Motion is mostly hover/page opacity and does not yet honor `prefers-reduced-motion`.
- Some styling is still ad hoc, especially hardcoded footer color `bg-[#e7fbf3]` and inline `style={{ zIndex: 100 }}`.
- Cart and product pages are functional, but they do not yet build enough trust around packaging, availability, care, and Telegram handoff.
- The current plan needs creative acceptance gates so implementation does not pass only technical checks.

## 10. Design Decision Checkpoint

Before implementation, choose one direction:

1. **Controlled Curator (recommended)**: keep current aesthetic, improve layout rhythm, states, assets, and commerce trust. Lowest risk.
2. **Editorial Impact**: bigger asymmetry, more full-bleed image sections, stronger motion. Better brand impact, more QA risk.
3. **Commerce Utility**: denser catalog/product UX, stronger filters/search/cart. Better conversion, less distinctive.

Default implementation assumption: start with Controlled Curator, borrow only the best parts of Editorial Impact for home/about hero sections.

Before any large visual code change, produce a short textual design checkpoint:

- Visual thesis.
- Content plan.
- Interaction plan.
- Which banned patterns were avoided.
- Which creative acceptance criteria the change is meant to satisfy.

## 11. AI Workflow Rules

These rules govern how AI-assisted implementation should execute this redesign.

- Do not change more than 3-5 files in one pass unless the phase explicitly requires it.
- After each phase, provide a short diff summary: changed files, user-visible impact, tests run, risks left.
- Before a major visual change, generate the textual design checkpoint described above.
- Do not rewrite working business logic without a specific requirement or bug.
- Do not add new dependencies without justification tied to R1-R12.
- Do not remove `src/lib/copy.test.ts` or existing domain tests.
- If an "improvement" does not map to a requirement, creative acceptance criterion, or known issue, defer it.
- Prefer small reusable component refinements over broad component-system rewrites.
- Keep file paths repo-relative in all follow-up plans and summaries.
- Preserve UTF-8 Russian text; read/write files with UTF-8-aware tooling.

## 12. Implementation Plan

### Phase 0: Brand Lock / Anti-Template Direction

**Goal:** Freeze the creative philosophy before UI changes, so the site cannot drift into generic luxury/ecommerce.

**Files:**

- Create: `docs/brand-lock.md`
- Modify: `redesign.md`
- Modify: `src/lib/copy.test.ts`

**Outputs:**

- Brand manifesto, 300-500 words.
- Anti-generic checklist.
- Approved tone-of-voice examples.
- Banned phrases and banned visual patterns.
- Visual references translated into concrete UI rules.
- Three homepage composition sketches in text form.

**Approach:**

- Use `lustre_lithos/DESIGN.md`, existing screenshots, and this plan as source material.
- Write the manifesto in Russian; it should sound like the brand, not like a design brief.
- Expand copy tests with banned phrase coverage for the most dangerous generic lines.
- Treat Brand Lock as a gate: no page redesign starts until this file exists and is accepted.

**Test scenarios:**

- `src/lib/copy.test.ts` fails when banned phrases such as "Украшения, которые подчеркнут вашу индивидуальность" or "Успейте купить" appear in source copy.
- Brand lock document includes all required outputs and does not introduce new product claims.

**Verification:**

- Copy test remains green after Brand Lock is added.
- Manual review confirms the manifesto and checklist are specific to GloWStone, not reusable for any jewelry brand.

### Phase 1: Design Foundation Hardening

**Goal:** Make the current visual system easier to extend safely without turning it into a generic component kit.

**Files:**

- Modify: `src/app/globals.css`
- Modify: `src/components/button.tsx`
- Modify: `src/components/icon-button.tsx`
- Modify: `src/app/layout.tsx`

**Work:**

- Add missing semantic tokens for success/error, muted text, overlay/scrim, glass nav, and footer surface.
- Replace raw color usage like `bg-[#e7fbf3]` with named tokens.
- Add `@media (prefers-reduced-motion: reduce)` rules for page enter and hover transitions.
- Add `touch-action: manipulation` and intentional tap highlight behavior for interactive controls.
- Add a skip link in the root layout or header for keyboard users.
- Ensure button and icon button variants have visible hover, active, disabled, and focus-visible states without changing layout dimensions.
- Keep CTAs compatible with the Copy System, including softer Telegram/reservation language.

**Test scenarios:**

- Keyboard tabbing reaches skip link, header actions, primary CTAs, catalog controls, cart controls.
- Reduced-motion mode removes page entrance movement and long hover animations.
- Button variants still satisfy the sharp, no-radius GloWStone style.
- CTA labels avoid banned marketplace urgency.

**Verification:**

- Typecheck, lint, production build.
- Desktop/mobile screenshots of `/`, `/catalog`, `/product/verdant-soul-pendant`.

### Phase 2: Home/About Editorial Prototype

**Goal:** Establish the soul of the redesign early, before catalog/product/cart implementation hardens around a generic component system.

**Files:**

- Modify: `src/app/page.tsx`
- Modify: `src/app/about/page.tsx`
- Optional create: `src/components/editorial-section.tsx`
- Optional create: `docs/home-about-prototype.md`

**Work:**

- Create a concept-level home/about prototype with real layout and copy, but avoid deep commerce integration churn.
- Home: keep hero as first screen, but refine crop, overlay, text measure, and bottom hint of next section across mobile/desktop.
- Home: test one of the approved composition sketches from Brand Lock.
- About: make the founder/workshop/philosophy sections feel like a real brand story, not placeholder content.
- Use asymmetry and scale deliberately; do not add nested cards or decorative blobs.
- Use product language only. No UI text describing features or design decisions.
- Keep this prototype small enough to review visually before polishing every shared component.

**Test scenarios:**

- Home first viewport identifies GloWStone and exposes a soft path into catalog or maker conversation.
- At 375px width, hero heading wraps cleanly and CTA buttons remain tappable.
- About page headings maintain hierarchy with one page-level h1.
- Long Russian copy remains readable with controlled line length.
- The prototype satisfies at least the first three creative acceptance criteria.

**Verification:**

- Desktop screenshots at wide viewport.
- Mobile screenshots at 375px.
- Visual check against `lustre_lithos/DESIGN.md` and `docs/brand-lock.md`.

### Phase 3: Asset And Content Quality Pass

**Goal:** Make imagery stable, product-specific, and inspectable.

**Files:**

- Modify: `src/lib/products.ts`
- Modify: `src/app/page.tsx`
- Modify: `src/app/about/page.tsx`
- Modify: `src/components/product-gallery.tsx`
- Optional create: `public/images/*`

**Work:**

- Audit every remote image URL currently used by products and editorial pages.
- Replace unrelated or unstable gallery thumbnails with local images from `reference/public/images/*` or newly approved generated/curated images.
- Keep `next/image` aspect ratios and `sizes`, but remove eager loading from non-critical gallery/grid images.
- Add stronger product alt text where image content changes.
- Define which image is critical per page: home hero, about hero, product main image. Everything else should lazy load.
- Keep copy in Russian and preserve `src/lib/copy.test.ts` constraints that avoid implying self-mining.
- Decide how sold/unavailable product imagery should appear as archive/history, not only dead inventory.

**Test scenarios:**

- Product gallery shows only relevant jewelry/process images for each product.
- Home/about first viewport still has a clear visual anchor.
- Product grid no longer eagerly loads every card image.
- Copy test still prevents mining/finding claims and banned generic phrases.

**Verification:**

- Production build.
- Screenshot check: home hero, catalog first grid, product gallery mobile and desktop.

### Phase 4: Shared Shell Modernization

**Goal:** Make navigation, search, footer, and repeated controls feel complete.

**Files:**

- Modify: `src/components/header.tsx`
- Modify: `src/components/footer.tsx`
- Modify: `src/components/icon-button.tsx`
- Optional create: `src/components/search-dialog.tsx`
- Optional test: `src/lib/search.test.ts`

**Work:**

- Decide whether search is real in this phase. If yes, implement a lightweight product search overlay using local product data. If no, remove or visibly disable the search control.
- Add `aria-live` feedback for cart/favorite count changes if the interaction message is not otherwise visible.
- Improve mobile nav: clear close behavior, active states, focus handling.
- Convert newsletter form into either a working local "request received" state, a Telegram subscription CTA, or remove it until supported. If kept, add `name`, `autocomplete`, inline feedback, and accessible status.
- Keep navigation links as `Link`; keep actions as `button`.
- Ensure shell copy follows the Copy System and does not pressure the visitor.

**Test scenarios:**

- Search opens with keyboard and pointer, closes predictably, and product links navigate correctly.
- Newsletter empty/invalid email shows inline recovery message; valid email shows non-persistent success state.
- Header counters update after cart/favorite actions without layout shift.
- Mobile menu can be opened, navigated, and closed with keyboard.

**Verification:**

- Typecheck, lint.
- Manual keyboard pass over header and footer.
- Screenshot search overlay and mobile menu states.

### Phase 5: Catalog UX Modernization

**Goal:** Make browsing feel curated, fast, and controllable.

**Files:**

- Modify: `src/components/catalog-view.tsx`
- Modify: `src/components/product-card.tsx`
- Modify: `src/lib/catalog.ts`
- Modify: `src/lib/catalog.test.ts`

**Work:**

- Keep URL-backed filters and sort.
- Improve mobile filter drawer into a true sheet pattern: Escape close, focus return, overscroll containment, stronger scrim, no background scroll leakage.
- Add or integrate search if Phase 4 chooses real search.
- Make active filter chips more compact and readable on mobile.
- Add `content-visibility` or progressive rendering only if product count grows beyond the current small seed catalog.
- Ensure native select has explicit readable background/text colors on Windows.
- Replace any lost focus behavior from `outline-none` with explicit `focus-visible` styling.
- Reframe sold/unavailable items as archive/availability states when appropriate.

**Test scenarios:**

- Category, stone, material, mood, availability, price, and sort can be combined via URL params.
- Invalid query params fall back safely.
- Mobile filter sheet opens, closes, restores scroll/focus, and does not trap the page in a locked state.
- Empty result state offers a clear reset action.
- Catalog still feels like a curated cabinet, not a marketplace grid.

**Verification:**

- Existing catalog tests remain green.
- Add tests for any new search/filter helper.
- Screenshot `/catalog` desktop and mobile with active filters.

### Phase 6: Product Page Conversion And Inspection

**Goal:** Make product pages feel like a luxury object inspection page with clear, soft purchase paths.

**Files:**

- Modify: `src/app/product/[slug]/page.tsx`
- Modify: `src/components/product-gallery.tsx`
- Modify: `src/components/product-actions.tsx`
- Modify: `src/components/product-card.tsx`
- Modify: `src/lib/products.ts`

**Work:**

- Improve gallery: product-specific thumbnails, selected state, keyboard navigation, reduced-motion-safe hover zoom.
- Add stronger product info hierarchy: availability, price, materials, care, story, meaning, packaging/order note.
- Add accessible live region for add-to-cart, favorite, Telegram loading, and checkout errors.
- Replace hard-commerce primary CTA language with softer workshop language, for example "Написать мастеру" or "Уточнить наличие".
- Add a mobile sticky CTA only if it does not cover content or conflict with browser safe areas.
- Replace raw `details/summary` styling with accessible, polished accordion states while preserving native semantics if possible.
- Keep product page static generation via `generateStaticParams`.

**Test scenarios:**

- Unknown slug still routes to not-found.
- Available product allows reservation/conversation and secondary cart behavior.
- Unavailable/sold product shows archive/story state and a path to "Обсудить похожее".
- Telegram order handles loading, API failure, unavailable item, and success navigation.
- Keyboard users can switch gallery thumbnails and operate accordions.

**Verification:**

- Existing Telegram/cart tests remain green.
- Screenshot product page desktop and mobile.
- Manual checkout URL generation smoke test.

### Phase 7: Cart And Telegram Checkout Refinement

**Goal:** Make checkout feel intentional and recoverable, even though Telegram remains the order channel.

**Files:**

- Modify: `src/components/cart-view.tsx`
- Modify: `src/components/telegram-checkout.tsx`
- Modify: `src/lib/cart.ts`
- Modify: `src/lib/telegram.ts`
- Modify: `src/lib/cart.test.ts`
- Modify: `src/lib/telegram.test.ts`

**Work:**

- Add clearer order summary: item count, total, availability note, Telegram handoff explanation.
- Improve quantity controls to meet touch target and focus standards.
- Add inline async status with `aria-live`.
- Handle stale localStorage items more explicitly: unknown product, unavailable product, zero quantity.
- Consider versioning localStorage schema before changing stored cart/favorites shape.
- Keep Telegram URL generation server-validated.
- Shift checkout language from "purchase now" to "send a considered request to the workshop".

**Test scenarios:**

- Empty cart shows catalog path.
- Quantity decrement to zero removes item.
- Unavailable product blocks Telegram checkout with clear recovery copy.
- Invalid/stale cart items do not crash UI.
- API returns readable errors for malformed JSON, empty cart, unknown slug, unavailable product.

**Verification:**

- Cart and Telegram tests remain green or are expanded.
- Manual cart flow: add item, change quantity, remove, checkout.

### Phase 8: Performance, Accessibility, Creative QA, And Visual QA

**Goal:** Finish with measurable technical quality and explicit taste checks.

**Files:**

- Modify as needed: `src/app/globals.css`
- Modify as needed: affected page/component files.
- Optional create: `docs/redesign-screenshots/*`

**Work:**

- Run a Vercel Web Guidelines pass on changed UI files.
- Check reduced motion, keyboard navigation, focus visibility, color contrast, and touch targets.
- Check image loading behavior and layout shift on home/catalog/product.
- Preserve route-level static generation where possible.
- Keep client components scoped: avoid moving server-renderable page content into client components just for interaction.
- Record final desktop/mobile screenshots for required pages and states.
- Run the Creative Acceptance Criteria checklist manually against screenshots.

**Screenshots required:**

- Home desktop 1440.
- Home mobile 375.
- Catalog default desktop.
- Catalog with filters active mobile.
- Product available desktop.
- Product unavailable/sold mobile.
- Cart empty.
- Cart with unavailable item.
- Search overlay.
- Mobile menu.
- Filter sheet open.
- Checkout error state.

**Test scenarios:**

- No horizontal overflow at 375px.
- All icon-only buttons have labels.
- Form controls have labels and autocomplete/name where applicable.
- Async updates are announced or visibly placed near the triggering control.
- Build output remains clean and all existing routes render.
- Creative acceptance criteria pass, especially first-screen originality, curated catalog feel, product inspection feel, and soft CTA language.

**Verification:**

- Test suite, typecheck, lint, production build.
- Browser verification on desktop and mobile viewport.
- Screenshot review against `docs/brand-lock.md`, `lustre_lithos/DESIGN.md`, and this plan.

## 13. Component-Level Rules For Implementation

- Use `lucide-react` for icons; keep stroke style consistent.
- Do not introduce a full UI library unless a specific component need justifies it.
- Keep sharp rectangular geometry unless the existing design system is intentionally revised.
- Prefer tokens in `src/app/globals.css` over raw hex classes in components.
- Use `Link` for navigation and `button` for actions.
- Avoid `transition-all`; list transition properties or use existing focused utilities.
- Use `Intl.NumberFormat` for currency. Current `src/lib/format.ts` already does this.
- Use `aria-live="polite"` for add-to-cart, favorite, newsletter, checkout, and search result feedback.
- Keep filter/sort/search state shareable via URL when it changes page results.
- Do not rely on hover-only behavior for critical product interactions.
- Use Copy System CTA language unless a specific commerce flow requires clearer transactional wording.
- Treat sold/unavailable products as archive/trust content where possible.

## 14. Risks And Mitigations

| Risk | Mitigation |
| --- | --- |
| Redesign drifts away from current luxury identity | Complete Phase 0 first; use `docs/brand-lock.md` and `lustre_lithos/DESIGN.md` as gates. |
| AI builds generic component system before brand voice is set | Move home/about prototype to Phase 2 and require textual design checkpoints. |
| Copy passes technically but sounds like marketplace marketing | Use Copy System, banned phrases, and expanded `src/lib/copy.test.ts`. |
| Remote image URLs change or show weak product imagery | Move approved key assets into `public/images/*` or generate stable replacement assets. |
| Visual polish breaks accessibility | Apply Vercel Web Guidelines and UI/UX Pro Max checks before final screenshots. |
| Catalog/product components become too client-heavy | Keep data and static page rendering server-side; isolate interactive islands. |
| Cart/favorites localStorage changes break existing users | Version schema before changing storage shape; gracefully handle stale entries. |
| Motion feels premium on desktop but annoying on mobile | Use reduced-motion support and keep micro-interactions short. |
| Scope expands into backend/admin/CMS | Keep this phase frontend-only; move admin/CMS to a later plan if needed. |

## 15. Proposed Delivery Order

1. Phase 0: Brand Lock / Anti-Template Direction.
2. Phase 1: Design foundation hardening.
3. Phase 2: Home/About editorial prototype.
4. Phase 3: Asset and content quality pass.
5. Phase 4: Shared shell modernization.
6. Phase 5: Catalog UX modernization.
7. Phase 6: Product page conversion and inspection.
8. Phase 7: Cart and Telegram checkout refinement.
9. Phase 8: Final performance, accessibility, creative QA, and visual QA.

Reasoning: the brand and home/about prototype define the soul of the site before component work hardens. After that, assets and shared shell can stabilize the system, then catalog/product/cart can be modernized without drifting into generic ecommerce.

## 16. Open Questions Before Coding

- Should search be implemented now, or should the header search icon be removed until product search is in scope?
- Should we use local images from `reference/public/images/*`, generate a new consistent image set, or keep remote Googleusercontent assets for now?
- Should the redesign stay strictly light-mode, or should dark mode become a formal requirement?
- Should the newsletter form become a real interaction, a Telegram subscription CTA, or be removed?
- Is the preferred visual direction Controlled Curator, Editorial Impact, or Commerce Utility?
- Should sold/unavailable products remain visible as archive/story objects?
- Should "cart" remain a real concept in UI, or should the primary flow become Telegram reservation/conversation with cart as a secondary aid?

Default assumptions if not answered:

- Implement search as local product search.
- Replace only obviously weak/unrelated images first.
- Keep light-mode only.
- Convert newsletter to a lightweight local success state or Telegram subscription CTA.
- Use Controlled Curator as the base direction.
- Keep sold/unavailable products visible when they add trust or story.
- Keep cart logic, but soften primary CTA language toward maker conversation.

## 17. Sources And References

- Current design source: `lustre_lithos/DESIGN.md`
- Existing implementation spec: `docs/superpowers/specs/2026-04-25-glowstone-nextjs-design.md`
- Existing implementation plan: `docs/superpowers/plans/2026-04-25-glowstone-nextjs-implementation.md`
- Current screenshots: `docs/superpowers/screenshots/*`
- App shell: `src/app/layout.tsx`, `src/components/header.tsx`, `src/components/footer.tsx`
- Design tokens: `src/app/globals.css`
- Commerce data and logic: `src/lib/products.ts`, `src/lib/catalog.ts`, `src/lib/cart.ts`, `src/lib/telegram.ts`
- Copy constraints: `src/lib/copy.test.ts`
- Installed skill references: `frontend-design`, `ui-ux-pro-max`, `web-design-guidelines`, `react-best-practices`, `bencium-controlled-ux-designer`
