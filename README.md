# 🌸 MomEase — Professional Maternal & Childcare Platform

[![React](https://img.shields.io/badge/React-19-blue.svg?logo=react&logoColor=white)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue.svg?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-7.x-646CFF.svg?logo=vite&logoColor=white)](https://vite.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.x-38B2AC.svg?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![i18n](https://img.shields.io/badge/i18n-English%20%7C%20Arabic-orange.svg)](https://react.i18next.com/)

**MomEase** is a modern, bilingual (English & Arabic) maternal and childcare support application. It provides mothers with intelligent diagnostic tools, comprehensive child tracking utilities, a supportive peer community, personalized chatbot assistance, and verified educational resources. The frontend is built on **React 19**, **TypeScript**, and **Vite**, using **Tailwind CSS** and **shadcn/ui** for a premium, accessible, and responsive user interface.

---

## 🚀 Core Features

### 🤖 AI-Driven Diagnostics & Assistance
*   **Baby Cry Analysis:** Analyzes audio recordings of infant cries using AI models to determine potential triggers (hunger, sleepiness, pain, etc.).
*   **Skin Condition Screening:** Image upload tool designed to detect and screen pediatric/maternal skin issues, outputting diagnosis confidence and care recommendations.
*   **Maternal Depression Assessment:** Guided postpartum depression screening questionnaires with continuous history tracking to help mothers monitor their emotional well-being.
*   **AI ChatBot:** Instant virtual pediatric assistant for parenting tips, guidance, and direct answers to maternal questions.

### 📊 Child Tracking & Growth Analytics
*   **Child Management:** Unified CRUD operations to register multiple children, select active profiles, and manage child-specific information.
*   **Feeding Log:** Tracker for breastfeeding sessions, formula intake, and solid food meals.
*   **Growth Tracker:** Log child height, weight, and head circumference over time with interactive trend charts powered by `recharts`.
*   **Sleep Tracker:** Record sleep and wake schedules, calculating sleep duration and patterns.
*   **Vaccination Records:** Dynamic immunization timeline with logs of completed and upcoming vaccines.
*   **Automated Reports:** Generated growth and tracking reports summarizing baby metrics.

### 👥 Peer Community & Educational Articles
*   **Interactive Community:** Social space for mothers to write posts, comment, like, save posts, and share advice.
*   **Article Library:** Verified resources and articles categorized by child-rearing themes, with advanced filtering options.

### ⚙️ Notifications & Admin Controls
*   **Notifications Hub:** Integrated alerts for tracking milestones, community updates, and screening results.
*   **Admin Dashboard:** Robust moderation console to manage accounts, moderate community posts, handle reports, and publish educational articles.

---

## 🛠️ Tech Stack & Libraries

*   **Framework:** [React 19](https://react.dev/) + [Vite 7](https://vite.dev/) + [TypeScript](https://www.typescriptlang.org/)
*   **Styling:** [Tailwind CSS v4](https://tailwindcss.com/) & [shadcn/ui](https://ui.shadcn.com/)
*   **State Management:** Context API (`AuthContext`, `ChildContext`, `LanguageContext`, `NotificationContext`)
*   **Routing:** [React Router DOM v7](https://reactrouter.com/)
*   **Animations:** [Framer Motion](https://www.framer.com/motion/) for smooth layout transitions and responsive animations
*   **Form Management:** [Formik](https://formik.org/) & [Yup](https://github.com/jquense/yup) for form validation
*   **Charts & Graphs:** [Recharts](https://recharts.org/)
*   **Networking:** [Axios](https://axios-http.com/) (with custom JWT auto-refresh token and localization headers)
*   **Internationalization:** [i18next](https://www.i18next.com/) + [react-i18next](https://react.i18next.com/)

---

## 📂 Codebase Architecture

The project maintains a modular directory structure, keeping pages, UI components, business logic, and API calls highly decoupled:

```
├── pages/                    # Main page modules
│   ├── admin/                # Admin panels (Accounts, Articles, Post Moderation)
│   ├── articles/             # Article categories, details, list
│   ├── auth/                 # Login, signup, password reset flow
│   ├── babyTracking/         # Baby tracking hub & growth report pages
│   ├── community/            # Feed, post creation, saved posts
│   ├── Cry/                  # Cry recording, analyzing, and results
│   ├── dep/                  # Postpartum depression assessments & history
│   ├── profile/              # User profile & child profiles management
│   └── skin/                 # Skin issue upload, processing, and results
├── services/                 # API connection files (Axios client & resource services)
│   ├── instance.ts           # Shared Axios client configuration & interceptors
│   ├── auth.ts               # Authentication endpoints
│   ├── children.ts           # Child profile CRUD endpoints
│   ├── babyCry.ts            # Cry analysis endpoints
│   └── [feature].ts          # Additional feature API endpoints
├── src/
│   ├── components/
│   │   ├── layouts/          # Layout wrappers (MainLayout, AdminLayout)
│   │   ├── UI/               # Reusable shadcn/ui components (buttons, dialogs, charts)
│   │   └── [feature]/        # Specific child-components (babyTracking, community)
│   ├── contexts/             # Application state providers
│   │   ├── AuthContext.tsx         # User session & profile context
│   │   ├── ChildContext.tsx        # Active child selection & CRUD context
│   │   ├── LanguageContext.tsx     # Language toggle & localization settings
│   │   └── NotificationContext.tsx # Real-time notification context
│   ├── guards/               # Route security (AdminGuard)
│   ├── routes/               # Public & Protected route settings
│   ├── App.tsx               # Main Router and context provider wrappers
│   ├── index.css             # Main styling entry (Tailwind rules)
│   └── main.tsx              # React mounting root
└── public/
    └── locales/              # Translation files
        ├── en/               # English translations (JSON)
        └── ar/               # Arabic translations (JSON)
```

---

## 🔑 Backend API & JWT Authentication

All network requests are handled through a configured Axios instance in `services/instance.ts`, containing custom interceptors:

1.  **Authorization Header:** Automatically injects the user's JWT `Bearer token` from `localStorage` into every outgoing request.
2.  **Language Preference:** Sets the header `Accept-Language` matching the current app language (`en` or `ar`) to allow localized responses from the backend.
3.  **Automatic Token Refresh:** If a request fails with a `401 Unauthorized` status code, the response interceptor automatically posts the `refreshToken` to `/api/Auth/refresh-token`, updates the tokens in local storage, and retries the original request seamlessly.

---

## 🌐 Localization & Bilingual Configuration

MomEase is fully localized to accommodate both English and Arabic speakers.
*   **Directionality (RTL/LTR):** Handled dynamically through HTML class modifications according to the active language context.
*   **Translation Source:** Translation keys are maintained in `public/locales/en/translation.json` and `public/locales/ar/translation.json`, loaded on-demand via `i18next-http-backend`.

---

## 💻 Getting Started

### 📋 Prerequisites
*   Node.js (v18.0.0 or higher)
*   npm or yarn

### 🔧 Installation
1.  **Clone the Repository:**
    ```bash
    git clone https://github.com/sallyalbeba/Graduation_Project.git
    cd Graduation_Project
    ```
2.  **Install Dependencies:**
    ```bash
    npm install
    ```
3.  **Configure Environment Variables:**
    Create a `.env` file in the root directory:
    ```env
    VITE_API_URL=http://momease.runasp.net
    ```

### ⚡ Running Locally
Start the local development server:
```bash
npm run dev
```
Open `http://localhost:5173` in your browser.

### 📦 Production Build
To build the application for deployment:
```bash
npm run build
```
The output files will be generated in the `dist` directory and are ready for hosting.

---

## 🤝 Contribution Guidelines
1.  **Clean Architecture:** Keep UI components isolated from API calls; use the services directory for backend interactions.
2.  **TypeScript Integrity:** Ensure all component props and API responses are typed correctly without bypassing TypeScript compile checks.
3.  **Localization:** When adding new UI text, define its corresponding keys in both English and Arabic `translation.json` files and consume it via the `useTranslation` hook.
