# Unite Club

Unite Club is a premium companion platform for the **Union Living** co-living community, designed to connect residents, showcase community events, manage registrations, and foster collaboration across our properties.

Built using **React (v19)**, **Vite**, and **Supabase**, the application offers a sleek dark aesthetic, fluid page transitions, and realtime state syncing.

---

## Features

- **Realtime Events Calendar**: Browse upcoming meetups, community dinners, fitness programs, and creative workshops.
- **The Six Pillars**: Learn about our core community themes:
  - **Declutter** (Calm. Reflect. Reset.)
  - **Elevate** (Move. Energise. Thrive.)
  - **Junior Senior** (Learn. Grow. Level Up.)
  - **Mixtape Sessions** (Discover. Listen. Experience.)
  - **Moodboard** (Create. Express. Explore.)
  - **Better Together** (Connect. Share. Belong.)
- **Secure Authentication**: Robust user authentication (Sign Up, Sign In, Google OAuth) powered by Supabase.
- **Password Recovery**: Complete forgot password and secure password reset flow (`/reset-password`).
- **Premium Transitions & Performance**: Featuring smooth page load curtain animation, grid line backgrounds, and optimized asset loading.

---

## Tech Stack

- **Frontend**: [React 19](https://react.dev/), [Vite 8](https://vite.dev/)
- **Backend & Database**: [Supabase](https://supabase.com/) (Auth, PostgreSQL Database, Realtime Subscriptions)
- **Routing**: [React Router DOM v7](https://reactrouter.com/)
- **Styling**: Vanilla CSS (Fluid Glassmorphism & Responsive Flex/Grid Layouts)
- **Icons**: [Lucide React](https://lucide.dev/)

---

## Getting Started

### 1. Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed (v18+ recommended).

### 2. Installation
Clone the repository and install dependencies:
```bash
npm install
```

### 3. Environment Variables
Create a `.env` file in the root directory and configure your Supabase credentials:
```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_public_key
```

### 4. Running Locally
Start the local development server:
```bash
npm run dev
```
Open your browser and navigate to `http://localhost:5173`.

### 5. Build for Production
Generate the optimized production build:
```bash
npm run build
```

---

## Project Structure

```text
uniteclub/
├── public/                # Static assets (images, logos, icons)
│   ├── partners/          # Partner/Brand logos
│   └── six-pillars/       # Images for the community pillars
├── src/
│   ├── components/        # Reusable UI components (Navbar, Layout, Loader)
│   ├── context/           # AuthContext & Navigation Transition contexts
│   ├── pages/             # Page views (Home, Calendar, Pillar details, Auth pages)
│   ├── App.jsx            # Main app router setup
│   ├── index.css          # Layout grids & primary animation overrides
│   ├── mock-styles.css    # Component UI themes and button styles
│   └── supabase.js        # Supabase Client initialisation
├── package.json
└── tsconfig.json          # TypeScript compiler configurations for JS files
```

---

## License
Created for Union Living. All rights reserved.
