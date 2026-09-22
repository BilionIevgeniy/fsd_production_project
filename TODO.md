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
