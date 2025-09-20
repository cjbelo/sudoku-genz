# Sudoku Gen Z

A modern Sudoku PWA built with **React + Vite**, **TailwindCSS**, and **Zustand**. Installable on mobile and desktop, works offline, and supports multiple player profiles with per‑user stats persistence.

<p align="center">
  <img alt="Sudoku Gen Z" src="./public/pwa-icon-512-maskable.png" width="120" />
</p>

---

## Table of Contents
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Available Scripts](#available-scripts)
- [State & Persistence](#state--persistence)
- [PWA Details](#pwa-details)
- [Icons & Manifest](#icons--manifest)
- [Deployment](#deployment)
- [Roadmap](#roadmap)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)
- [License](#license)

---

## Features
- **Installable PWA** (Add to Home Screen / Desktop) with offline support
- **Login by name** to keep scores & stats
- **Guest mode** (stats are *not* persisted and reset on refresh)
- **Difficulty selection** ("easy" …) and game screen flow
- **Session stats** (and per‑user persisted stats for named users)
- **Responsive UI** with Tailwind and modern React patterns
- **Icon set** including *maskable* icons for Android

> Planned / in-progress (see [Roadmap](#roadmap))
> - Notes with valid/invalid candidates (invalid shown red)
> - Remaining counts per digit (1–9)
> - Cell selection animation (white border grow)
> - Box background/opacity wave animations (diagonal sequence)
> - Suggested candidates for empty cells
> - Undo history
> - Victory detection by comparing with `solvedSudoku`
> - Scoring & timer (MM:SS, auto‑start, reset on restart)

---

## Tech Stack
- **React 19** + **Vite 7** (SWC)
- **TailwindCSS** (via `@tailwindcss/vite`)
- **Zustand** (with `persist` middleware)
- **vite-plugin-pwa** for service worker & manifest
- **@fontsource/poppins** for typography

---

## Project Structure
```
.
├─ public/
│  ├─ favicon.ico
│  ├─ favicon-16.png
│  ├─ favicon-32.png
│  ├─ apple-touch-icon-180.png
│  ├─ pwa-icon-192.png
│  ├─ pwa-icon-192-maskable.png
│  ├─ pwa-icon-512.png
│  └─ pwa-icon-512-maskable.png
├─ src/
│  ├─ components/
│  ├─ screens/
│  │  └─ LoginScreen.jsx
│  ├─ stores/
│  │  └─ appStore.js
│  ├─ App.jsx
│  └─ main.jsx
├─ index.html
├─ package.json
├─ vite.config.js (or .ts)
└─ README.md
```

---

## Getting Started

### Prerequisites
- **Node.js 18+** (recommended) and **npm 9+**

### Install
```bash
npm install
```

### Run (Dev)
```bash
npm run dev
```

### Build (Prod)
```bash
npm run build
```

### Preview (Prod build)
```bash
npm run preview -- --host
```
> Use the preview server (or deploy to HTTPS hosting) to properly test PWA install & service worker.

---

## Available Scripts
- `npm run dev` – start Vite dev server
- `npm run build` – production build
- `npm run preview` – preview production build locally
- `npm run lint` – run ESLint

---

## State & Persistence
State is managed with **Zustand** and persisted via the `persist` middleware to `localStorage`.

- **Named users**: stats are persisted under `userStats[username]` and restored on login and page refresh.
- **Guest user**: login persists the *session* user (so guest stays logged in across refresh), but **guest stats are not persisted** and reset on refresh.

Example (store excerpt):
```js
export const useAppStore = create(
  persist(
    (set, get) => ({
      currentUser: null,
      screen: "login",
      difficulty: "easy",
      userStats: {},
      stats: {},

      login: (username) => {
        if (username === "guest") {
          set({ currentUser: "guest", screen: "difficulty", stats: {} });
        } else {
          const stats = get().userStats[username] || {};
          set({ currentUser: username, screen: "difficulty", stats });
        }
      },

      logout: () => set({ currentUser: null, screen: "login", stats: {} }),

      saveStats: (newStats) => {
        const { currentUser, userStats, stats } = get();
        if (!currentUser) return;
        const updated = { ...stats, ...newStats };
        set({ stats: updated });
        if (currentUser === "guest") return;
        set({ userStats: { ...userStats, [currentUser]: updated } });
      },
    }),
    {
      name: "sudoku-genz",
      getStorage: () => localStorage,
      partialize: (s) => ({ currentUser: s.currentUser, screen: s.screen, difficulty: s.difficulty, userStats: s.userStats }),
      onRehydrateStorage: () => (state) => {
        if (state?.currentUser === "guest") state.stats = {};
      },
    }
  )
);
```

---

## PWA Details
This project uses `vite-plugin-pwa` with a manifest and Workbox for caching.

**vite.config.js** (excerpt):
```js
import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: "autoUpdate",
      injectRegister: "auto",
      devOptions: { enabled: true, type: "module" },
      workbox: { globPatterns: ["**/*.{js,css,html,ico,png,svg}"] },
      manifest: {
        id: "/sudoku-genz",
        name: "Sudoku Gen Z",
        short_name: "Sudoku Gen Z",
        description: "Play the classic puzzle game with a modern twist",
        theme_color: "#9810fa",
        background_color: "#fbf9fa",
        display: "standalone",
        scope: "/",
        start_url: "/",
        icons: [
          { src: "/pwa-icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
          { src: "/pwa-icon-192-maskable.png", sizes: "192x192", type: "image/png", purpose: "maskable" },
          { src: "/pwa-icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
          { src: "/pwa-icon-512-maskable.png", sizes: "512x512", type: "image/png", purpose: "maskable" }
        ],
      },
    }),
  ],
});
```

### iOS meta tags (index.html)
```html
<link rel="apple-touch-icon" href="/apple-touch-icon-180.png" />
<meta name="apple-mobile-web-app-capable" content="yes" />
<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
<meta name="theme-color" content="#9810fa" />
```

---

## Icons & Manifest
Place generated icons in `public/`:
- `pwa-icon-192.png`
- `pwa-icon-192-maskable.png`
- `pwa-icon-512.png`
- `pwa-icon-512-maskable.png`
- `apple-touch-icon-180.png`
- `favicon-16.png`, `favicon-32.png`, `favicon.ico`

Maskable icons ensure proper rendering on Android without a small Chrome badge when installed as a true PWA.

---

## Deployment
Any static hosting that serves the built `dist/` over HTTPS works:
- **Vercel**, **Netlify**, **Cloudflare Pages**, **GitHub Pages**

General steps:
1. `npm run build`
2. Upload the `dist/` folder to your host
3. Ensure correct SPA fallback (e.g., `/* -> /index.html`) if using client-side routing

> To test installability on device, use the production URL over HTTPS.

---

## Roadmap
- ✅ Name login + per‑user stats persistence
- ✅ Guest session with non‑persisted stats
- ⏳ Notes with invalid candidate highlighting
- ⏳ Remaining digit counts (1–9)
- ⏳ Cell selection border animation
- ⏳ Box background/opacity wave animation (diagonal)
- ⏳ Suggested candidates for empty cells
- ⏳ Undo history
- ⏳ Victory detection vs `solvedSudoku`
- ⏳ Scoring system
- ⏳ Timer (MM:SS)
- ⏳ Optional cloud sync (future)

---

## Troubleshooting
**"App installs but shows a tiny Chrome badge on icon / opens in Chrome UI"**
- Ensure you install the **PWA** (not a shortcut). Use production build with an active service worker.
- Include **maskable** icons in the manifest.
- On **desktop**, Chrome overlays a small corner badge on PWA icons by design (cannot remove without a native wrapper).

**Service worker not updating**
- With `registerType: "autoUpdate"`, updates are fetched in the background. You can also close/reopen the app to activate.

**TypeScript type error for PWA client (if you add TS)**
- Add to `tsconfig.json`: `"types": ["vite-plugin-pwa/client"]`.

---

## Contributing
1. Fork the repo
2. Create a feature branch: `git checkout -b feat/my-feature`
3. Commit changes: `git commit -m "feat: add my feature"`
4. Push branch: `git push origin feat/my-feature`
5. Open a Pull Request

Use conventional commits where possible.

---

## License
Choose a license for your project (e.g., MIT). Create a `LICENSE` file in the repo root.

---

**Made with ❤️ using React, Vite, Tailwind, Zustand, and vite-plugin-pwa.**

