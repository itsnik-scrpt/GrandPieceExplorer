# 🌊 Grand Piece Explorer

A collaborative deep-sea research platform for tracking Oda's 651-meter mystery. Built for One Piece fans, researchers, and maritime data enthusiasts.

## Tech Stack

- **Next.js 15** – App Router, TypeScript
- **Tailwind CSS v4** – Glassmorphism design (Pearl White / Ocean Blue)
- **Framer Motion** – Page transitions, hover effects, animations
- **Supabase** – Auth, PostgreSQL database, Row Level Security
- **Mapbox GL JS** – Interactive bathymetry map with 651m depth filter
- **Socket.io** – Real-time global & crew chat

## Features

- 🗺️ Interactive Mapbox map filtered to the 646–656m depth range
- 💬 Real-time global chat sidebar with Haki level badges
- 🏴‍☠️ Crew system (form crews, private chat, member roles)
- 🍈 Devil Fruit assignment modal during onboarding
- 📋 Forum with categories: Theories, Maritime Data, Gear/Tech, Off-Topic
- 🏅 Bounty & badge profile system with "Wanted" poster cards
- 🎭 Glassmorphism UI throughout

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment variables

Copy `.env.local.example` to `.env.local` and fill in your credentials:

```bash
cp .env.local.example .env.local
```

| Variable | Description |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anon/public key |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase service role key (server-side only) |
| `NEXT_PUBLIC_MAPBOX_TOKEN` | Mapbox public access token |
| `NEXT_PUBLIC_SOCKET_URL` | WebSocket server URL (default: `http://localhost:3001`) |
| `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` | Cloudinary cloud name for image uploads |

### 3. Set up the database

Run `supabase/schema.sql` in your Supabase SQL Editor to create all tables and RLS policies.

### 4. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

## Project Structure

```
src/
  app/               # Next.js App Router pages
    layout.tsx       # Root layout (Navbar)
    page.tsx         # Landing page
    about/           # About the 651m mystery
    auth/            # Login & Registration
    dashboard/       # Map dashboard + chat sidebar
    crews/           # Crew listing and individual crew pages
    forum/           # Community forum
    profile/         # User profiles
  components/        # Shared UI components
    GlassCard.tsx    # Glassmorphic card (default/dark/ocean variants)
    Navbar.tsx       # Fixed navigation bar
    ChatSidebar.tsx  # Slide-in WebSocket chat
    MapboxMap.tsx    # Mapbox GL map with 651m filter
    BountyMarquee.tsx  # Animated bounty ticker
    WantedPoster.tsx   # "Wanted Dead or Alive" card
    DevilFruitModal.tsx  # Devil Fruit assignment spinner
  lib/
    supabase.ts      # Browser Supabase client
    supabaseServer.ts  # Server Supabase client
    socket.ts        # Singleton Socket.io client
  types/
    index.ts         # TypeScript types for all entities
supabase/
  schema.sql         # Full database schema with RLS policies
```

## The 651m Mystery

In **Chapter 651** of One Piece, Eiichiro Oda included a precise 651-meter depth annotation in the Sea Forest arc. Cross-referenced with JAMSTEC bathymetric surveys, researchers have identified anomalous acoustic signatures at the 646–656m range. Oda is expected to reveal more in **2026**.

## Build

```bash
npm run build
```

## License

MIT
