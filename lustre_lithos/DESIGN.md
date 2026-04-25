# Design System: The Artisanal Monolith

## 1. Overview & Creative North Star: "The Digital Curator"
This design system moves away from the rapid-fire cadence of traditional e-commerce, embracing the slow, intentional pace of a high-end gallery. Our Creative North Star is **The Digital Curator**. Every interface should feel like a physical exhibition space—quiet, expansive, and deeply tactile. 

We break the "template" look by rejecting rigid symmetry. We utilize **intentional asymmetry**, where product imagery may bleed off-canvas or sit off-center, paired with extreme typographic scales. This creates a rhythmic "editorial" flow that guides the eye through a narrative rather than a grid of SKUs.

## 2. Colors & Surface Philosophy
The palette is rooted in the raw materials of the earth: deep emeralds, muted golds, and stone neutrals. 

- **Primary (`#003229`)**: Our "Deep Emerald." Used for high-impact brand moments and key narrative headers.
- **Secondary (`#775a19`)**: Our "Muted Gold." Reserved for refined accents and meaningful interaction cues.
- **Surface Strategy**: We use `surface` (#fcf9f4) as our "Bone White" canvas.

### The "No-Line" Rule
Standard 1px borders are strictly prohibited for sectioning. To separate content, designers must use:
- **Tonal Shifts**: Transitioning from `surface` to `surface-container-low` (#f6f3ee) to define new content blocks.
- **Whitespace**: Using the spacing scale to create "breathing rooms" that act as invisible barriers.

### Surface Hierarchy & Nesting
Treat the UI as a series of stacked fine papers. 
- **The Base**: `surface`
- **The Secondary Tier**: `surface-container` (#f0ede8) for subtle grouping.
- **The Focus Tier**: `surface-container-lowest` (#ffffff) for product cards or modals to create a soft, natural "pop" against the bone-white background.

### The "Glass & Gradient" Rule
To mimic the translucency of rare gemstones, use **Glassmorphism** for floating navigation and overlays. Apply `surface` at 80% opacity with a `20px` backdrop-blur. For primary CTAs, a subtle linear gradient from `primary` (#003229) to `primary-container` (#004b3e) provides a "jewel-toned" depth that flat color cannot replicate.

## 3. Typography: The Editorial Voice
We contrast the ancient weight of serifs with the modern precision of sans-serifs.

- **The Display Scale (`notoSerif`)**: Used for "Hero" moments. `display-lg` (3.5rem) should be used with tight letter-spacing (-0.02em) to create an authoritative, editorial feel. 
- **The Headline Scale (`notoSerif`)**: Used for storytelling and product titles. This conveys the "handcrafted" heritage of the brand.
- **The Functional Scale (`manrope`)**: All labels, body copy, and UI metadata use Manrope. This provides a clean, neutral balance to the expressive serif. 

**Pro-Tip:** Use `body-lg` with increased line-height (1.6) to enhance the feeling of "luxury" and readability in long-form brand stories.

## 4. Elevation & Depth
In this system, depth is felt, not seen. We avoid heavy drop shadows in favor of **Tonal Layering**.

- **The Layering Principle**: Place a `surface-container-lowest` card on a `surface-container-low` section. The change in "paper weight" creates a sophisticated lift.
- **Ambient Shadows**: For floating elements (like a "Quick Shop" drawer), use a shadow color tinted with our `on-surface` (#1c1c19) at 4% opacity, with a 40px blur. It should look like a soft glow of light, not a shadow.
- **The "Ghost Border" Fallback**: If a boundary is required for accessibility, use the `outline-variant` (#bfc9c4) at 15% opacity. It should be a mere suggestion of a line.

## 5. Components

### Refined Buttons
- **Primary**: Rectangular (0px radius), `primary` background, `on-primary` text. No border. On hover, transition to `primary-container`.
- **Secondary**: Ghost style. `on-surface` text with a 1px "Ghost Border" (15% opacity).
- **Animation**: All button states should use a `cubic-bezier(0.4, 0, 0.2, 1)` transition for a "weighted" feel.

### Elegant Product Cards
- **Construction**: Forbid dividers. Use `surface-container-lowest` for the card background.
- **Hover Effect**: On hover, the image should subtly scale (1.05x) while a soft `secondary` (Gold) tint overlay appears at 5% opacity.
- **Typography**: Product names in `title-md` (notoSerif), prices in `label-md` (manrope) for a functional contrast.

### Minimalist Filters
- Use **Filter Chips** with `0px` radius. 
- **Unselected**: `surface-container-high` background.
- **Selected**: `primary` background with `on-primary` text.
- **Layout**: Horizontally scrollable list with no visible scrollbar, allowing the natural edge of the screen to cut the content.

### Inputs & Fields
- **Style**: Bottom-border only (the "Ghost Border" at 20% opacity). 
- **Focus**: Transition the bottom border to `secondary` (Gold) and lift the label using `label-sm`.

## 6. Do's and Don'ts

### Do:
- **Embrace the Bleed**: Let high-resolution macro textures of stone and metal bleed to the edges of the screen.
- **Use "Scale as Contrast"**: Make a headline massive and the caption tiny. This hierarchy is the hallmark of luxury design.
- **Prioritize Motion**: Use slow, fading transitions (600ms+) for page entries to mimic the unfolding of a physical lookbook.

### Don't:
- **Don't use Rounded Corners**: The `0px` radius scale is non-negotiable. Sharp edges convey the precision of jewelry cutting.
- **Don't use Dividers**: If you feel the need for a line, use 48px of empty space instead.
- **Don't use Pure Black**: Use `on-surface` (#1c1c19) for text to maintain the "stone/charcoal" softness.
- **Don't Crowd the Canvas**: If a page feels "efficient," it’s likely too crowded. Add whitespace until it feels "expensive."