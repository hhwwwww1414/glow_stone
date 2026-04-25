# GloWStone Next.js Site Design

Date: 2026-04-25

## Goal

Convert the four static GloWStone HTML pages into a production-oriented ecommerce frontend. The result should keep the existing "Digital Curator" visual direction while replacing duplicated standalone markup with a maintainable Next.js application.

The site will be fully Russian-language in this phase.

## Source Context

Current project contents:

- `glowstone_home_page/code.html` and `screen.png`
- `glowstone_catalog/code.html` and `screen.png`
- `glowstone_product_page/code.html` and `screen.png`
- `glowstone_about_brand/code.html` and `screen.png`
- `lustre_lithos/DESIGN.md`

The source pages use Tailwind CDN, Google Fonts, Material Symbols, image URLs, and repeated navigation/footer markup. `lustre_lithos/DESIGN.md` defines the core visual system: bone-white surfaces, deep emerald, muted gold, sharp geometry, editorial serif headlines, Manrope functional copy, tonal layering, glass navigation, and restrained luxury pacing.

There is no existing npm app and no git repository at the project root.

## Architecture

Use:

- Next.js App Router
- TypeScript
- Tailwind CSS
- Local API routes
- Client-side state for cart and favorites

Routes:

- `/` - editorial storefront home page
- `/catalog` - product catalog
- `/product/[slug]` - product detail page
- `/about` - brand story page
- `/cart` - cart and Telegram checkout handoff

Local API routes:

- `GET /api/products`
- `GET /api/products/[slug]`
- `GET /api/collections`
- `POST /api/telegram-checkout`

Data should live behind a small typed data layer so the local source can later be replaced by a CMS, commerce backend, inventory service, or payment provider without rewriting the UI.

## Visual Direction

Visual thesis: a quiet, editorial jewelry gallery with high contrast product imagery, expansive spacing, deep emerald brand moments, muted gold interaction accents, and sharp rectangular controls.

Content plan:

1. Global glass navigation and mobile navigation.
2. Home page as an editorial storefront, preserving the strongest source sections: hero, philosophy, materials, process, mood-based discovery, events, final CTA.
3. Catalog page with filters and product grid.
4. Product page with gallery, story, specs, related products, and Telegram order CTA.
5. Brand page with founder/story, philosophy, workshop atmosphere, events, final CTA.
6. Cart page with line items, totals, and Telegram handoff.

Interaction plan:

- Subtle page/section entrance transitions using CSS.
- Product image hover zoom and refined gold-tint overlay.
- Catalog filters, favorites, cart controls, accordions, mobile nav, and checkout handoff with clear focus states.

The implementation should avoid visible prompt/design commentary in the UI. It should use product language only.

## Components

Shared shell:

- `Header`
- `Footer`
- `MobileNav`
- `IconButton`
- `Button`
- `NewsletterForm`

Commerce components:

- `ProductCard`
- `ProductGallery`
- `CatalogFilters`
- `SortSelect`
- `PriceRange`
- `FavoriteButton`
- `CartLineItem`
- `CartSummary`
- `TelegramCheckout`

Editorial components:

- Home hero
- Philosophy section
- Materials section
- Process section
- Mood discovery section
- Event preview section
- Brand hero
- Founder/story section
- Workshop gallery

Data/model modules:

- Product types
- Collection types
- Filter helpers
- Price formatting
- Telegram checkout payload builder
- Cart/favorite localStorage helpers

## Behavior

Catalog:

- Filter by category, stones, materials, availability, and price.
- Sort by newest, price, and featured order.
- Show a clear empty state when no products match.
- Product cards link to product detail routes.

Product detail:

- Use dynamic route by slug.
- Show 404-style state for unknown products.
- Gallery thumbnails switch the main image.
- Add to cart and favorite controls update client state.
- Telegram order CTA builds a product-specific order handoff.

Cart and favorites:

- Persist cart and favorite state in `localStorage`.
- Support quantity changes and item removal.
- Show item count in the header.
- Show empty cart state with a path back to catalog.
- Show unavailable item messaging if local data marks a product unavailable.

Telegram checkout:

- Cart checkout sends a payload to `POST /api/telegram-checkout`.
- The API validates required fields and cart contents against local product data.
- The API returns a Telegram URL with a readable prefilled order summary.
- The client opens the returned URL.

## Error Handling

Required user-facing states:

- Empty catalog results.
- Unknown product slug.
- Empty cart.
- Failed checkout API call.
- Unavailable product in cart.

API responses should use clear status codes and small JSON error objects. Client components should avoid silent failures.

## Testing And Verification

Before calling the implementation complete:

- Run install/build tooling available in the chosen app scaffold.
- Run typecheck.
- Run lint.
- Run production build.
- Start the dev server.
- Visually verify desktop and mobile layouts in a browser.
- Manually test: catalog filtering, product navigation, favorite toggle, add to cart, cart quantity change, remove from cart, Telegram checkout URL generation.

## Out Of Scope

This phase does not include:

- Real payment processing.
- User accounts.
- Admin product editor.
- Real inventory synchronization.
- CMS integration.
- Real order persistence.

## Implementation Notes

Use the existing static pages and screenshots as visual/content references, but do not keep the implementation as copied HTML blobs. Extract reusable components and centralize data.

Keep `.superpowers/` out of future version control if a git repository is initialized.
