# TODO

## Migrate visual regression testing to Chromatic

**When:** end of the project (not urgent now).

**What:** replace the self-hosted Loki setup (`.loki/`, `chrome.docker`, `update-loki-baseline.yml`, `generate-visual-json-report.js` + `reg-cli`) with [Chromatic](https://www.chromatic.com/) — the Storybook team's own visual regression service.

**Why:**

- No self-hosted infra to maintain (no Docker image, no custom diff-report script, no manual baseline-update workflow).
- Built-in web UI to review diffs and accept/reject changes directly on the PR — replaces our `test:ui:report`.
- Native git/CI integration, baseline history.

**Free tier (checked 2026-09):** 5,000 snapshots/month, no credit card, unlimited projects/collaborators, Chrome-only testing.

**Watch out for:** current estimate is ~250 snapshots per run × ~20 workdays/month ≈ 5,000 — right at the free cap. Unknown whether the component count (and snapshot count) grows further as the project continues. Re-check actual usage against the free tier once this migration is scheduled; upgrade to Starter ($179/mo) if it's been outgrown.

**Rough steps** (see conversation history for the full plan):

1. Sign up at chromatic.com via GitHub, link this repo, get a `project-token`.
2. `npm install --save-dev chromatic`.
3. Add `CHROMATIC_PROJECT_TOKEN` as a GitHub repo secret.
4. Add a CI job running `npx chromatic --exit-zero-on-changes`.
5. Once confirmed working, remove the Loki-specific pieces (`.loki/`, `update-loki-baseline.yml`, `test:ui*` scripts, `reg-cli`/`loki` devDependencies).

## Interview prep: question bank + mock Q&A

**When:** after the project is finished (can start earlier on finished modules: `Profile`, `DynamicModuleLoader`, store).

**What:** Claude reads the code and builds a question bank specific to this project, then runs a mock interview.

**Topics:** FSD (layers, public API, import rules); Redux Toolkit (slices, thunks, `reducerManager`, `DynamicModuleLoader`, effect order); routing, lazy/Suspense, code splitting; configs (webpack, Jest, tsconfig, ESLint, Storybook); testing (unit, RTL, screenshot); i18n, themes, `classNames`, `__API__`, axios instance; general React (hooks, rerenders, closures).

**Question types:**

- Basic: what does it do and why is it needed.
- Tricky "why this and not that": why `dispatch` in the page and not in `ProfileCard`; why `modulePaths` and not `moduleDirectories`; why this type and not another (e.g. `interface` vs `type`, `unknown` vs `any`); why `removeAfterUnmount`; why a render helper and not global setup.
- Each with a reference answer and likely follow-ups.

**Mode:** user answers in own words, Claude grades; where the user is shaky, Claude explains using examples from this repo, asks a follow-up, and marks the topic for a later round.

**Output:** `docs/interview-questions.md` (questions + reference answers) and a weak-topics list (file or memory), since Claude doesn't remember between sessions.
