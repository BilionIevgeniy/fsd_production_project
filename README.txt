node version=17.4.0

# 🖥 Full Production React App

Frontend application built with **React, TypeScript, Redux Toolkit**, and modern development practices.

> This project demonstrates my ability to work on complex, production-ready web applications.

---

## 📌 About the Project

* Large-scale **React frontend project**
* Modular and scalable architecture
* Reusable UI components and theming (light/dark/custom)
* Routing, state management, and asynchronous data fetching
* Optimized performance and maintainable code
* Testing: unit, component, and basic end-to-end

This project reflects **real-world frontend engineering skills**, not just learning exercises.

---

## 🛠 Tech Stack

* React 18
* TypeScript
* Redux Toolkit
* React Router v6
* SCSS / CSS Modules
* Webpack / Vite
* Jest & React Testing Library
* Storybook (UI components)

---

## 🚀 Features

* Responsive design for desktop and mobile
* Multi-language support (i18n)
* Reusable component library
* Error handling with Error Boundaries
* Optimized bundle size and lazy loading

---

## 📦 Learning Outcomes

Through this project I demonstrated:

* Ability to build **scalable frontend applications**
* Writing **clean, maintainable code**
* Experience with **state management, routing, and component architecture**
* Basic testing and QA for production readiness

---

## 📬 Author

Frontend Developer aiming for **professional frontend roles**, 
focused on scalable, maintainable, and modern web applications.



FSD (Feature-Sliced Design)
---------------------------------------------------------------
IMPORT RULE: each layer can only import from layers BELOW it.
  app → pages → widgets → features → entities → shared
Slices within the same layer CANNOT import each other (except shared).
---------------------------------------------------------------

src/
  │
  ├── app/                        # LAYER 1: App initialization
  │    │                          # Entry point. Everything that runs ONCE on startup lives here.
  │    │                          # No business logic — just wires the whole project together.
  │    ├── providers/             # React providers: Theme, Language, Router, Redux Store
  │    │    └── ThemeProvider/
  │    │         ├── ui/          # Provider component with useState/useEffect inside
  │    │         └── index.ts     # Re-export
  │    ├── styles/                # Global styles: reset, CSS variables, themes
  │    │    ├── index.scss        # Styles entry point, imported once in App.tsx
  │    │    ├── reset.scss        # Browser style reset
  │    │    ├── variables/        # CSS custom properties (colors, fonts, spacing)
  │    │    └── themes/           # Theme classes: .dark, .normal — override CSS variables
  │    ├── types/                 # Global TypeScript types and declarations (*.d.ts)
  │    └── App.tsx                # Root component: layout + providers + Suspense
  │
  ├── pages/                      # LAYER 2: Pages
  │    │                          # One page = one router route.
  │    │                          # Pages only COMPOSE widgets and features — no own logic.
  │    └── ProfilePage/           # SLICE — one page
  │         ├── ui/
  │         │    ├── ProfilePage.tsx        # Page component itself
  │         │    └── ProfilePage.async.tsx  # Lazy wrapper for code splitting
  │         └── index.ts                    # Public API: export { ProfilePage }
  │
  ├── widgets/                    # LAYER 3: Widgets
  │    │                          # Large self-contained UI blocks built from multiple features/entities.
  │    │                          # Example: Navbar knows about user, theme, language — composes them all.
  │    └── Navbar/                # SLICE
  │         ├── ui/
  │         │    ├── Navbar.tsx            # Widget component
  │         │    └── Navbar.module.scss    # Styles (CSS Modules)
  │         └── index.ts                  # Public API: export { Navbar }
  │
  ├── features/                   # LAYER 4: Features
  │    │                          # A user action that delivers business value.
  │    │                          # Answers: "What can the user DO?"
  │    │                          # Examples: toggle theme, log in, add to cart.
  │    └── ThemeSwitcher/         # SLICE
  │         ├── ui/
  │         │    ├── ThemeSwitcher.tsx         # Button/toggle UI component
  │         │    └── ThemeSwitcher.module.scss
  │         ├── model/
  │         │    ├── types.ts                  # Local types for this feature (if needed)
  │         │    ├── slice.ts                  # Redux slice (if the feature uses Redux)
  │         │    ├── selectors.ts              # Selectors from the store
  │         │    └── thunks.ts                 # Async actions (API calls)
  │         ├── lib/
  │         │    └── useSomeHelper.ts          # Hooks/utils specific ONLY to this feature
  │         ├── api/
  │         │    └── featureApi.ts             # RTK Query endpoint or axios call for this feature
  │         └── index.ts                       # Public API: export { ThemeSwitcher }
  │
  ├── entities/                   # LAYER 5: Entities
  │    │                          # Business domain objects.
  │    │                          # Answers: "What does the app WORK WITH?"
  │    │                          # Examples: User, Post, Product, Order, Comment.
  │    │                          # NOT here: theme, language — those go in shared/config (not business entities).
  │    └── User/                  # SLICE
  │         ├── ui/
  │         │    ├── UserCard.tsx            # User card display component
  │         │    └── UserCard.module.scss
  │         ├── model/
  │         │    ├── types.ts                # interface User { id, name, role... }
  │         │    ├── slice.ts                # Redux slice for user state
  │         │    ├── selectors.ts            # selectCurrentUser, selectUserRole...
  │         │    └── thunks.ts               # fetchUserById, updateProfile...
  │         ├── lib/
  │         │    └── getUserInitials.ts      # Pure utils over the entity (no hooks, no store)
  │         ├── api/
  │         │    └── userApi.ts              # RTK Query or axios for /users endpoint
  │         └── index.ts                     # Public API: export { UserCard, selectCurrentUser }
  │
  └── shared/                     # LAYER 6: Infrastructure
       │                          # Reusable code with NO business logic.
       │                          # Knows nothing about layers above. Can be copy-pasted to any project.
       ├── ui/                    # UI-kit: atomic components with no business logic
       │    ├── Button/
       │    │    ├── Button.tsx
       │    │    ├── Button.module.scss
       │    │    └── index.ts     # export { Button }
       │    ├── Input/
       │    ├── Modal/
       │    └── index.ts          # Barrel: export { Button, Input, Modal }
       ├── api/                   # Base HTTP setup: axios instance, baseURL, interceptors
       │    └── api.ts
       ├── config/                # Configuration for cross-cutting concerns
       │    ├── theme/
       │    │    ├── ThemeContext.ts   # createContext for theme
       │    │    ├── useTheme.ts       # useTheme hook — lives NEXT TO its context
       │    │    └── types.ts          # enum Theme { LIGHT, DARK }
       │    └── i18n/
       │         ├── i18n.ts           # i18next initialization
       │         ├── LanguageContext.ts
       │         ├── useLanguage.ts    # useLanguage hook — lives next to its context
       │         └── types.ts          # enum Language { RU, EN }
       ├── hooks/                 # GENERIC hooks only — not tied to any business concept
       │    ├── useDebounce.ts    # Delays a function call
       │    ├── useLocalStorage.ts
       │    └── useClickOutside.ts
       └── lib/                   # Pure utilities: no React, no store, no API
            └── classNames/
                 └── index.ts     # classNames('btn', { active: isActive })


Internationalization (i18n) - Quick Start
	This project uses Google Sheets, a NestJS backend, and i18next for translations.

	*Google Sheets: Manage translations in a central Google Spreadsheet. 
		Each sheet name acts as a namespace (e.g., common, auth). Columns must be key, en, ru, etc.

	*Backend (NestJS): Serves translations from Google Sheets. 
		Ensure GOOGLE_SPREADSHEET_ID, GOOGLE_SERVICE_ACCOUNT_EMAIL, 
		and GOOGLE_PRIVATE_KEY are set in .env. Endpoint: /translations?lang={{lng}}&ns={{ns}}.

	*Frontend (React):

		*Setup: List all your Google Sheet names (namespaces) in ns array in src/i18n.ts.

		*Access: Use useTranslation('your_namespace') to get t() function (e.g., t('button_save')). 
			Use useTranslation() for defaultNS.

		*Switch Language: Utilize the useLanguageContext() hook from providers/LanguageProvider 
			and call changeLanguage('new_lang_code'). A loading indicator will appear during fetching.

