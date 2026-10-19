# Third-party material

Each copied skill keeps its original license. Full license texts are in `licenses/`.

## From addyosmani/agent-skills (MIT, Copyright (c) 2025 Addy Osmani)

Source: https://github.com/addyosmani/agent-skills, commit `aeac41d4d005999432bb7312f7ff06383a91d59d` (2026-10-13). License: `licenses/agent-skills.LICENSE`.

- `skills/idea-refine/`: removed `scripts/idea-refine.sh` and replaced its usage block with a one-line instruction; replaced references to `interview-me` and `spec-driven-development` (not included) with `planning-and-task-breakdown`.
- `skills/planning-and-task-breakdown/`: added a precedence rule with ponytail.
- `skills/debugging-and-error-recovery/`: replaced a reference to the `test-driven-development` skill (not included) with a plain instruction.
- `skills/security-and-hardening/`: unchanged.
- `skills/shipping-and-launch/`: unchanged.

## From dietrichgebert/ponytail (MIT, Copyright (c) 2026 DietrichGebert)

Source: https://github.com/dietrichgebert/ponytail, commit `16352ac229eb08a9598dcae48fe9f2b342567d86` (2026-10-17). License: `licenses/ponytail.LICENSE`.

- `skills/ponytail/`: core `SKILL.md` only (no hooks, MCP server or commands). Narrowed the trigger description to single-page, fix and prototype work; replaced "active for the whole session" with per-task activation; added the ponytail-vs-planning precedence rule.

## From emilkowalski/skills (MIT, Copyright (c) 2026 Emil Kowalski)

Source: https://github.com/emilkowalski/skills, commit `2d228630ba1446365f614a108cb8252f1feda202` (2026-10-11). License: `licenses/emilkowalski-skills.LICENSE`.

- All five: removed the canned "Initial Response" section.
- `skills/apple-design/`: relabelled the spring-values table as suggested starting values; resolved the conflict between sections 11 and 12 (blur stays static; animate scale and opacity); added web notes on `navigator.vibrate` in iPhone Safari and `system-ui` fallbacks.
- `skills/animate/`, `skills/animation-performance/`: removed references to skills not included (`improve-animations`, `find-animation-opportunities`, `animate-expo`).
- `skills/review-animations/`, `skills/pick-ui-library/`: otherwise unchanged.

## From nateherkai/scroll-craft (MIT, Copyright (c) 2026 Nate Herk)

Source: https://github.com/nateherkai/scroll-craft, commit `75d81f74e83692add18cd7a8a8e078b8a887a579` (2026-09-30). License: `licenses/scroll-craft.LICENSE`.

- `skills/scroll-craft/`: narrowed the trigger description to scroll-driven work (dropped "premium hero", "Apple-style landing page", "interactive landing page", "this looks like a template") and pointed ordinary pages to ponytail and design-variations; removed the `allowed-tools` line so normal permission prompts apply; added a "Spending and uploads need approval" section (approve kie.ai credits before generating; ask before uploading the user's files as references). Engine, scripts and references unchanged.

## From supabase/agent-skills (MIT, Copyright (c) 2026 Supabase)

Source: https://github.com/supabase/agent-skills, commit `c9be0e931b7930f7d02126d04774d904c381e7d7` (2026-10-02). License: `licenses/supabase-agent-skills.LICENSE`.

- `skills/supabase/`, `skills/supabase-postgres-best-practices/`: unchanged.

## From stripe/ai (MIT, Copyright (c) 2024–2025 Stripe)

Source: https://github.com/stripe/ai, commit `2f68b6e13ceab52310058fd60d3ea24adaf8df32` (2026-10-19), folder `skills/stripe-best-practices`. License: `licenses/stripe-ai.LICENSE`.

- `skills/stripe-best-practices/`: added one paragraph asking to confirm Stripe account availability first (India: Razorpay as the usual alternative). The Claude plugin's hooks and usage reporting are not included. Upstream syncs this skill from Stripe's docs; re-copy it when the API version moves on.

## From microsoft/playwright-cli (Apache-2.0, Copyright (c) Microsoft Corporation)

Source: https://github.com/microsoft/playwright-cli, commit `b85c7a736bb473bf55b584e54a09ffa698d6d871` (2026-09-28). License: `licenses/playwright-cli.LICENSE`.

- `skills/playwright-cli/`: added a paragraph under "Open parameters": fresh in-memory browser by default, attach to the user's own browser or use a persistent profile only when asked, keep `state-save` files out of git. Requires the CLI: `npm install -g @playwright/cli@latest`.

## Original to this repo

- `skills/design-variations/`: written from scratch. The idea of three parallel variations saved as numbered files was inspired by superdesigndev/superdesign; none of its text or code is used.
- `skills/site-teardown/` (including `references/extract.js`).
