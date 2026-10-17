---
name: design-variations
description: Produce three distinct design directions for a page, section or component as standalone HTML files, so the user can compare them side by side and pick or combine. Use when the user asks for design options, variations, alternatives, mockups or "a few directions" for a landing page, microsite, hero, pricing section, card, form or similar UI, or says they are unsure how something should look.
---

# Design Variations

Make three genuinely different directions, save each as its own file, and let the user choose. Comparing real options beats debating one.

## 1. Gather inputs (briefly)

- **What it is:** page, section or component; its one job (sign up, explain, sell, book).
- **Audience and tone:** ask only if the request gives no hint.
- **Design system:** look before asking. Check for `DESIGN.md`, a theme or tokens file, Tailwind config, CSS custom properties in a global stylesheet, or an existing component library. If one exists, all three variations must use its tokens (colors, type, spacing, radii); vary layout and emphasis instead.
- **Content:** use the user's real copy if given. Otherwise write short, plausible placeholder copy for that business, never lorem ipsum, and say it is placeholder.

## 2. Pick three axes of difference

Variations must differ on purpose, not by recoloring. Choose a distinct stance for each, for example:

| Axis | Examples |
| --- | --- |
| Layout | single column story / split hero / bento grid / editorial with sidebar |
| Density | airy and minimal / balanced / information-rich |
| Type | large display serif / neutral grotesk / mono or condensed accent |
| Visual weight | photo-led / illustration or shape-led / type-only |
| Mood | calm and premium / energetic and bold / friendly and warm |

Before building, state the three directions in one line each so the difference is explicit.

## 3. Build each file

- Save to `.design/<name>/<name>_1.html`, `_2.html`, `_3.html` in the project (create the folder). `<name>` is short kebab-case, e.g. `pricing-section`.
- Each file is self-contained: inline CSS, no build step, opens by double-click.
- Responsive from 360px to 1440px; no horizontal scroll on phones.
- Accessible: semantic landmarks and headings, visible focus states, text contrast at least 4.5:1, `alt` text on images, honours `prefers-reduced-motion`.
- Images: use the project's own assets, or neutral shapes and gradients sized like real images. Do not hotlink images from other sites.
- Avoid external scripts. A Google Font link is fine; anything else only if the design truly needs it.
- At the top of each file, an HTML comment with: direction name, the stance on each axis, and who it suits.

## 4. Present and iterate

- Give a 3-row summary: file, direction, strongest point, main trade-off.
- Recommend one, with the reason, but let the user decide.
- When the user picks or mixes ("hero from 2, pricing from 3"), save the result as the next version, e.g. `<name>_2_1.html`, and keep the originals for comparison.
- Once a direction is chosen, build it into the real project with the project's own stack and components; the `.design/` files are references, not production code.

## Rules

- Three is the default; do one or five only if asked.
- Never reuse another site's copy, images, logos or distinctive brand assets in a variation. If the user is working from a site teardown, use its structure and principles only.
- Keep `.design/` out of production builds (add it to the deploy ignore list if the host would publish it).
