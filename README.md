# Sudoku Gen Z

A modern Sudoku PWA built with **React + Vite**, **TailwindCSS**, and **Zustand**. Installable on mobile and desktop, works offline, and supports multiple player profiles with per‑user stats persistence.

<p align="center">
  <img alt="Sudoku Gen Z" src="https://sudoku-genz.netlify.app/screenshot-1.webp" width="100%" />
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
- [Deployment](#deployment)
- [Live Demo](#live-demo)
- [License](#license)

---

## Features

- **Installable PWA** (Add to Home Screen / Desktop) with offline support
- **Login by name** to keep scores & stats
- **Guest mode** (stats are _not_ persisted and reset on refresh)
- **Difficulty selection** ("easy" …) and game screen flow
- **Session stats** (and per‑user persisted stats for named users)
- **Responsive UI** with Tailwind and modern React patterns
- **Icon set** including _maskable_ icons for Android

> Planned / in-progress (see [Roadmap](#roadmap))
>
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
npm run dev -- --host
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

## Routes

- `/` — Landing
- `/game` — Play
- `/privacy` — Privacy Policy
- `/terms` — Terms of Service
- `/contact` — Contact
- `*` — 404 (NotFound)

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
- **Guest user**: login persists the _session_ user (so guest stays logged in across refresh), but **guest stats are not persisted** and reset on refresh.

## PWA Details

This project uses `vite-plugin-pwa` with a manifest and Workbox for caching.

### iOS meta tags (index.html)

```html
<link rel="apple-touch-icon" href="/apple-touch-icon-180.png" />
<meta name="apple-mobile-web-app-capable" content="yes" />
<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
<meta name="theme-color" content="#9810fa" />
```

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

## Live Demo

https://sudoku-genz.netlify.app/game

---

### License

MIT — see [LICENSE](./LICENSE).

---

**Made with ❤️ using React, Vite, Tailwind, Zustand, and vite-plugin-pwa.**
