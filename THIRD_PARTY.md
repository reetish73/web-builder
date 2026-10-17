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

## Original to this repo

- `skills/design-variations/`: written from scratch. The idea of three parallel variations saved as numbered files was inspired by superdesigndev/superdesign; none of its text or code is used.
- `skills/site-teardown/` (including `references/extract.js`).
