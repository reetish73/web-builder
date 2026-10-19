# web-builder

Claude Code skills for building websites, landing pages and microsites. Private plugin, installed through [reetish-marketplace](https://github.com/reetish73/reetish-marketplace).

## Skills

| Skill | Fires when | Source |
| --- | --- | --- |
| `idea-refine` | An idea is vague or needs stress-testing | agent-skills |
| `planning-and-task-breakdown` | Multi-page sites, anything with login/payments/stored data, 5+ files | agent-skills |
| `ponytail` | Single page, section, component, fix or prototype: smallest complete change | ponytail |
| `design-variations` | You ask for design options or directions | original |
| `site-teardown` | You share a URL and ask how it's built | original |
| `apple-design` | Gesture UI, springs, materials, typography, reduced motion | emilkowalski/skills |
| `animate` | Adding motion or a transition | emilkowalski/skills |
| `animation-performance` | Janky or dropped-frame animation | emilkowalski/skills |
| `review-animations` | Only when called: `/web-builder:review-animations` | emilkowalski/skills |
| `pick-ui-library` | Only when called: `/web-builder:pick-ui-library` | emilkowalski/skills |
| `scroll-craft` | Scroll-driven, cinematic or 3D-scroll sites. Asks before spending kie.ai credits | scroll-craft |
| `supabase` | Any Supabase work: auth, RLS, migrations, Edge Functions, debugging | supabase/agent-skills |
| `supabase-postgres-best-practices` | Writing or tuning Postgres queries, indexes and schemas | supabase/agent-skills |
| `stripe-best-practices` | Planning or building a Stripe integration | stripe/ai |
| `playwright-cli` | Testing a site in a scripted browser, screenshots, Playwright tests | playwright-cli |
| `debugging-and-error-recovery` | Errors, failing builds, broken behaviour | agent-skills |
| `security-and-hardening` | Forms, auth, user data, third-party integrations | agent-skills |
| `shipping-and-launch` | Preparing to deploy | agent-skills |

**Precedence rule:** plan first for multi-page or data-handling work; otherwise ship the minimum (ponytail). When a plan exists, build each task the ponytail way. Validation, auth, error handling, security and accessibility are never cut.

### Tools some skills need (install once)

- `scroll-craft`: Node, a full ffmpeg build, Chrome, and `npm i playwright-core` in each build project. `node <skill>/scripts/doctor.mjs` checks them. Generating images or video also needs a `KIE_AI_API_KEY` in the project's `.env` (paid); building from your own photos needs no key.
- `playwright-cli`: `npm install -g @playwright/cli@latest`.
- `supabase`: works best with the Supabase CLI or the Supabase connector.

## Install and update (Claude Code)

One time:

```bash
claude plugin marketplace add reetish73/reetish-marketplace
claude plugin install web-builder@reetish-marketplace
```

After pushing changes here:

```bash
claude plugin marketplace update
claude plugin update web-builder@reetish-marketplace
```

Check the token cost of what is loaded:

```bash
claude plugin details web-builder@reetish-marketplace
```

## Claude Desktop

Every push to `main` that touches `skills/` builds one ZIP per skill (GitHub > Actions > skill-zips > Artifacts). Upload the ones you want in Claude Desktop under Settings > Capabilities > Skills. To build locally: `python scripts/build_zips.py` (output in `dist/`).

`site-teardown` needs a browser tool, so it is most useful in Claude Code or the desktop app's Code tab.

## Adding or changing a skill

1. Add a folder under `skills/<name>/` with a `SKILL.md` (frontmatter `name` and `description`). Keep the description specific so it only fires on the tasks you want.
2. If it is copied from elsewhere, keep the license in `licenses/` and add an entry to `THIRD_PARTY.md`.
3. Bump `version` in `.claude-plugin/plugin.json`, commit and push, then run the update commands above.
