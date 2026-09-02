# 🖥 Full Production React App

![CI](https://github.com/BilionIevgeniy/fsd_production_project/actions/workflows/ci.yml/badge.svg)

Frontend application built with **React, TypeScript, Redux Toolkit**, and modern development practices, structured with **Feature-Sliced Design (FSD)**.

> This project demonstrates the ability to work on complex, production-ready web applications — including test coverage (unit, Storybook, visual regression) and CI automation.

---

## 📌 About the Project

- Large-scale **React frontend project**
- Modular and scalable architecture (Feature-Sliced Design)
- Reusable UI components and theming (light/dark)
- Routing, state management, and asynchronous data fetching
- Multi-language support (i18n) backed by Google Sheets + a NestJS service
- Unit tests, isolated component development in Storybook, and automated visual regression testing
- CI pipeline that runs all of the above on every push/PR

---

## 🛠 Tech Stack

| Area              | Tools                                                 |
| ----------------- | ----------------------------------------------------- |
| UI                | React 17, TypeScript                                  |
| State             | Redux Toolkit, React Redux                            |
| Routing           | React Router v6                                       |
| Styling           | SCSS Modules, Stylelint                               |
| Bundler           | Webpack 5                                             |
| i18n              | i18next (backend: Google Sheets via a NestJS service) |
| Unit testing      | Jest, React Testing Library                           |
| Component dev     | Storybook 6                                           |
| Visual regression | Loki                                                  |
| Linting           | ESLint (Airbnb config), Stylelint                     |
| CI                | GitHub Actions                                        |

---

## 🚀 Getting Started

### Prerequisites

Node version is pinned in [`.nvmrc`](.nvmrc). If you use [nvm](https://github.com/nvm-sh/nvm):

```bash
nvm use
```

### Install

```bash
npm ci --legacy-peer-deps
```

> `--legacy-peer-deps` is required: `stylelint-config-prettier@9` declares a peer range (`stylelint <15`) older than the `stylelint@17` actually used in this project. A plain `npm ci`/`npm install` fails to resolve without this flag.

### Run the dev server

```bash
npm start
```

Serves the app at `http://localhost:4200`.

---

## 📜 Available Scripts

| Script                                | What it does                                                                    |
| ------------------------------------- | ------------------------------------------------------------------------------- |
| `npm start`                           | Dev server with hot reload (port 4200)                                          |
| `npm run build:dev`                   | Development build                                                               |
| `npm run build:prod`                  | Production build                                                                |
| `npm run build:prod:analyze`          | Production build + bundle analyzer                                              |
| `npm run lint:ts` / `lint:ts:fix`     | ESLint for `.ts`/`.tsx`                                                         |
| `npm run lint:scss` / `lint:scss:fix` | Stylelint for `.scss`                                                           |
| `npm run test:unit`                   | Unit tests (Jest)                                                               |
| `npm run storybook`                   | Storybook dev server (port 6006)                                                |
| `npm run build-storybook`             | Static Storybook build                                                          |
| `npm run test:ui`                     | Visual regression tests (Loki) — compares current UI against `.loki/reference`  |
| `npm run test:ui:ok`                  | Approve the current UI as the new baseline (`loki approve`)                     |
| `npm run test:ui:report`              | Build a browsable HTML report (`.loki/report.html`) of the last `test:ui` diffs |

---

## 🗂 Project Structure (Feature-Sliced Design)

IMPORT RULE: each layer can only import from layers BELOW it.
app → pages → widgets → features → entities → shared
Slices within the same layer CANNOT import each other (except shared).

src/
├── app/ # LAYER 1 — app init: providers (Theme/Language/Router/Store), global styles, entry point
├── pages/ # LAYER 2 — one page = one route, composes widgets/features, no own logic
├── widgets/ # LAYER 3 — large self-contained UI blocks built from features/entities (e.g. Navbar, Sidebar)
├── features/ # LAYER 4 — a user action that delivers business value (e.g. ThemeSwitcher, login)
├── entities/ # LAYER 5 — business domain objects the app works with (e.g. User)
└── shared/ # LAYER 6 — reusable infrastructure with no business logic: ui-kit, api client, hooks, lib

Each slice follows the same internal shape: `ui/`, `model/` (types, Redux slice, selectors, thunks), `lib/`, `api/`, and an `index.ts` that re-exports the slice's public API — nothing outside the slice reaches into anything not re-exported there.

---

## 🧪 Testing

### Unit tests

```bash
npm run test:unit
```

Jest + React Testing Library, configured in [`config/jest`](config/jest).

### Storybook

```bash
npm run storybook       # dev server, http://localhost:6006
npm run build-storybook # static build, used by CI and by Loki
```

Every shared/widget/page component that's meaningfully reusable in isolation should have a `*.stories.tsx`.

### Visual regression (Loki)

[Loki](https://loki.js.org/) screenshots every story (in `chrome.laptop` and `chrome.iphone7` configurations, light + dark theme) and diffs them pixel-by-pixel against a committed baseline.

.loki/
├── .gitignore # generated by loki; ignores current/ and difference/
├── reference/ # ✅ committed — the accepted baseline, one PNG per story/config/theme
├── current/ # ❌ not committed — screenshots from the last local run
└── difference/ # ❌ not committed — highlighted pixel diffs for anything that didn't match

- `npm run test:ui` — starts by comparing the current UI to `.loki/reference` and fails on any mismatch.
- On a failure, open `.loki/difference/<name>.png` to see exactly what changed.
- `npm run test:ui:ok` — accept the current output as the new baseline (`loki approve`), when the diff is an _intentional_ visual change.

Opening PNGs one by one in `.loki/difference/` doesn't scale once more than a couple of stories fail. `npm run test:ui:report` builds a single browsable page instead:

```bash
npm run test:ui         # populates .loki/current and .loki/difference
npm run test:ui:report  # -> .loki/report.html
```

It runs [`scripts/generate-visual-json-report.js`](scripts/generate-visual-json-report.js) — which turns the contents of `.loki/difference/` into `.loki/report.json` — through `reg-cli` (already in `devDependencies`), which renders that JSON as `.loki/report.html`: a side-by-side reference/current/diff view for every failed story on one page. Open the file directly in a browser. It must stay inside `.loki/` — the image paths inside the report are relative to wherever the report file itself lives, so moving it elsewhere breaks the images.

**Engine note:** `package.json`'s `loki` config targets `chrome.docker` (Loki runs Chrome inside a Docker container it manages). That's reliable on `amd64` (GitHub Actions runners), but on **Apple Silicon** the amd64 image needs QEMU emulation and hits a known `runc` incompatibility. If you're on an M-series Mac, don't fight this locally — use the **Update Loki baseline** GitHub Action below, which runs on a matching `amd64` runner.

---

## ⚙️ CI/CD

Two GitHub Actions workflows, both pinned to the Node version in [`.nvmrc`](.nvmrc):

### [`ci.yml`](.github/workflows/ci.yml) — on every push/PR to `main`

| Job           | Checks                                                                                                                                                        |
| ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `lint`        | `lint:ts` + `lint:scss`                                                                                                                                       |
| `unit-test`   | `test:unit`                                                                                                                                                   |
| `build`       | `build:prod` + `build-storybook` compile cleanly                                                                                                              |
| `visual-test` | `test:ui` against the committed Loki baseline (runs after the three jobs above pass; uploads `.loki/current` + `.loki/difference` as an artifact if it fails) |

### [`update-loki-baseline.yml`](.github/workflows/update-loki-baseline.yml) — manual only

Run from the **Actions** tab after an intentional visual change. It boots Storybook, re-shoots every story with `loki update` on the same `amd64` + `chrome.docker` engine `ci.yml` compares against, and commits the refreshed `.loki/reference` back to the branch — so the baseline and the comparison are always produced by the same renderer.

---

## 🌐 Internationalization (i18n) — Quick Start

This project uses Google Sheets, a NestJS backend, and i18next for translations.

- **Google Sheets** — manage translations in a central spreadsheet. Each sheet name is a namespace (e.g. `common`, `auth`); columns are `key`, `en`, `ru`, etc.
- **Backend (NestJS)** — serves translations from Google Sheets. Requires `GOOGLE_SPREADSHEET_ID`, `GOOGLE_SERVICE_ACCOUNT_EMAIL`, and `GOOGLE_PRIVATE_KEY` in `.env`. Endpoint: `/translations?lang={{lng}}&ns={{ns}}`.
- **Frontend (React)**:
  - List every Google Sheet namespace in the `ns` array in `src/i18n.ts`.
  - `useTranslation('your_namespace')` to get `t()` (e.g. `t('button_save')`); `useTranslation()` for the default namespace.
  - Switch language via `useLanguageContext()` (from `providers/LanguageProvider`) and `changeLanguage('new_lang_code')` — a loading indicator shows while translations fetch.

---

## 📬 Author

Frontend Developer aiming for **professional frontend roles**, focused on scalable, maintainable, and modern web applications.
