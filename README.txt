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



FCD
src/
  ├── app/                  # LAYER Initialization (Providers, Router) Entry point of the project
  ├── pages/                # LAYER Pages High-level screens (Home, Profile)
  ├── widgets/              # LAYER Composition (Navbar, Footer)
  │    └── Navbar/          #   SLICE Widget components
  │         ├── ui/         #     SEGMENT 
  │         └── index.ts    #     Public API
  ├── features/             # LAYER Feature/Action Business logic and actions(ThemeSwitcher, Auth)
  │    └── ThemeSwitcher/   #   SLICE Theme switching logic
  │         ├── ui/         #     SEGMENT
  │         ├── model/      #     SEGMENT 
  │         └── index.ts
  ├── entities/             # LAYER Entities (User, Article)
  │    └── User/            #   SLICE
  │         ├── ui/         #     SEGMENT User card
  │         ├── model/      #     SEGMENT User state
  │         └── index.ts
  └── shared/               # LAYER Infrastructure Reusable low-level code(Button, Input, API)
       ├── ui/              #   SEGMENT UI-Kit
       └── api/             #   SEGMENT Basic axios config


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

