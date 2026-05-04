# AI Search Agent

AI Search Agent is a modern React + TypeScript web app that provides an interactive, filterable search experience with authentication and result exploration views. The UI is built with Radix UI primitives (shadcn-style components) and Tailwind CSS.

> Note: The current repository snapshot contains a UI-first implementation with mocked/sample data in components. The Home screen mentions the **Exa API**, but a production search backend is not yet wired up in this code.

## Features

- **Authentication UI**: Login / Sign Up form with validation (React Hook Form + Zod) and social login buttons (UI placeholders).
- **Search interface**: Query input + responsive filter panel (desktop sidebar + mobile sheet).
- **Filters**: Sources, date range, content types, relevance slider, and an exact-match toggle.
- **Results list**: Paginated results list with loading skeletons and empty states.
- **Result detail view**: A detailed view component with save/share/visit actions and related content section (UI component).
- **Design system**: Reusable UI components under `src/components/ui` built on Radix UI and styled with Tailwind.

## Tech Stack

- **React 18** + **TypeScript**
- **Vite** (dev server + build)
- **React Router**
- **Tailwind CSS** + **tailwindcss-animate**
- **Radix UI** primitives (Accordion, Dialog, Tabs, etc.)
- **React Hook Form** + **Zod** (forms + validation)
- **framer-motion** (UI animation)
- **Supabase JS** (dependency included; types generation script present)

## Repository Structure

```text
.
├── README.md
├── index.html
├── package.json
├── vite.config.ts
├── tailwind.config.js
├── postcss.config.js
├── components.json
├── public/
└── src/
    ├── main.tsx
    ├── App.tsx
    ├── index.css
    ├── components/
    │   ├── home.tsx
    │   ├── AuthForm.tsx
    │   ├── SearchInterface.tsx
    │   ├── SearchResults.tsx
    │   ├── ResultDetail.tsx
    │   └── ui/
    ├── lib/
    │   └── utils.ts
    ├── stories/
    └── types/
        └── supabase.ts
```

## Getting Started

### Prerequisites

- Node.js 18+ recommended
- npm (this repo includes a `package-lock.json`)

### Install

```bash
npm install
```

### Run locally

```bash
npm run dev
```

Then open the URL printed by Vite (typically `http://localhost:5173`).

### Build

```bash
npm run build
```

### Preview production build

```bash
npm run preview
```

## Configuration

This project is set up for Vite environment variables (via `.env` files).

### Tempo routes (optional)

`src/App.tsx` conditionally enables Tempo routes when:

- `VITE_TEMPO="true"`

### Supabase types (optional)

A helper script exists to generate Supabase TypeScript types into `src/types/supabase.ts`:

```bash
SUPABASE_PROJECT_ID=your-project-id npm run types:supabase
```

You will also need the Supabase CLI installed/authenticated for this to work.

## How the App Works (Current Snapshot)

- **Entry**: `src/main.tsx` mounts the app and sets up `BrowserRouter`.
- **Routing**: `src/App.tsx` defines the `/` route pointing to `Home`.
- **Home** (`src/components/home.tsx`):
  - Shows `AuthForm` when unauthenticated (local state simulation).
  - Shows `SearchInterface` when authenticated.
- **SearchInterface**:
  - Holds local state for query and filters.
  - Calls `onSearch(query, filters)` when submitted (defaults to a no-op).
  - Renders `SearchResults` (note: the current `SearchResults` component expects pagination callbacks/props; wiring may be in-progress).

## Development Notes / TODOs

If you want to turn this UI into a working “AI Search Agent”, you will likely add:

- A real auth provider (e.g., Supabase Auth) and session persistence
- A server/API layer for search (e.g., Exa API integration)
- Result storage (saved results, search history) in Supabase
- A proper routing setup for result details (e.g., `/results/:id`)

## Scripts

- `npm run dev` — start Vite dev server
- `npm run build` — typecheck with `tsc` then build
- `npm run lint` — run ESLint
- `npm run preview` — preview production build
- `npm run types:supabase` — generate Supabase types to `src/types/supabase.ts`

## License

No license file is currently included in the repository. If you plan to open-source this project, add a `LICENSE` file (e.g., MIT).
