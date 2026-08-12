# Project instructions

## Config consistency

This project defines the same cross-cutting settings (e.g. absolute imports from `src`, path aliases, module resolution) in multiple independent config files: `tsconfig.json` (`baseUrl`/`paths`), `config/build/buildResolvers.ts` (webpack `resolve`), `config/jest/jest.config.ts` (Jest module resolution), and possibly others (ESLint, Storybook).

When adding or changing a setting in one of these configs:

- First check how the same concern is already solved in the other config files, and match that approach (e.g. "resolve relative to one absolute path" vs. "search upward for a directory by name") rather than picking whichever option merely works.
- Prefer the option that is the closest semantic equivalent across tools (e.g. Jest's `modulePaths` mirrors tsconfig's `baseUrl` and webpack's `resolve.modules` with an absolute path — both resolve a fixed absolute directory — whereas `moduleDirectories` does a Node-style upward name search and is not the same mechanism).
- Don't stop at the first working fix for build/test infra changes; state which option is more consistent with the rest of the repo before applying it.

## Prefer explicit, opt-in test setup over global side effects

When a test needs infrastructure that not every test needs (e.g. i18n, a store, a router), don't wire it into `config/jest/jest.setup.ts` (`setupFilesAfterEnv`) just because that makes it "work everywhere." A global setup-file import is an implicit dependency: every test file pays for it and is silently coupled to it, whether it uses it or not, and shared mutable state (e.g. a singleton i18next instance) leaks between tests unless manually reset.

Prefer a small opt-in test helper instead (e.g. `src/shared/lib/tests/renderWithTranslation/renderWithTranslation.tsx`, which wraps `render()` in the relevant `Provider`) that individual test files import only when they actually need it. This was caught after first reaching for a global `setupFilesAfterEnv` import for `i18nForTests` — it worked, but wasn't the best-practice choice; see [[render-helper-over-global-setup]].
