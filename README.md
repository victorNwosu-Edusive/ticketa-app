# Ticketa Web App

Ticket management dashboard built with React and Vite. Track ticket status, create new tickets, and keep an overview of workflow metrics.

## Table of Contents
1. [Features](#features)
2. [Tech Stack](#tech-stack)
3. [Prerequisites](#prerequisites)
4. [Installation](#installation)
5. [Available Scripts](#available-scripts)
6. [Project Structure](#project-structure)
7. [Local Storage Keys](#local-storage-keys)
8. [Troubleshooting](#troubleshooting)

## Features
- Dynamic dashboard summarizing ticket metrics
- Ticket CRUD flows (create, edit, delete)
- Local storage persistence with seeded demo tickets
- Auth mock using local storage session tokens
- Toast notifications and responsive UI

## Tech Stack
- React 19 with Vite bundler
- React Router DOM 7 for routing
- Tailwind CSS utility classes
- Lucide React icons

## Prerequisites
- Node.js 18 or newer
- npm 9 or newer

## Installation
1. Clone the repository:
   ```bash
   git clone <repo-url>
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Open the printed URL (default `http://localhost:5173`) in your browser.

## Available Scripts
- `npm run dev` – start Vite dev server
- `npm run build` – generate production bundle
- `npm run preview` – preview production build locally
- `npm run lint` – run ESLint checks

## Project Structure
```
.
├── public/             # Static assets served as-is
├── src/
│   ├── assets/         # Images and fonts
│   ├── components/     # Reusable UI pieces (Navbar, Toast, ProtectedRoute)
│   ├── frontend/
│   │   └── pages/      # Route views (Home, Login, Dashboard, Tickets, etc.)
│   ├── services/       # Local storage ticket service helpers
│   ├── App.jsx         # Root component
│   └── main.jsx        # Router setup
└── README.md
```

## Local Storage Keys
- `ticketapp_users` – Registered user accounts
- `ticketapp_session` – Current session token & user data
- `ticketapp_tickets` – Persisted ticket records (auto-seeded on first load)

## Troubleshooting
- If tickets do not appear, clear browser storage for the domain and reload to restore seed data.
- Ensure the required Node/npm versions are installed if commands fail.
- Run `npm run lint` to diagnose syntax or best-practice issues.
