-- Grand Piece Explorer Database Schema
-- Run this in your Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================
-- USERS
-- ============================================================
CREATE TABLE IF NOT EXISTS public.users (
  id            UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  username      TEXT UNIQUE NOT NULL,
  email         TEXT UNIQUE NOT NULL,
  avatar_url    TEXT,
  banner_url    TEXT,
  devil_fruit   TEXT CHECK (devil_fruit IN (
    'Gomu Gomu','Mera Mera','Hie Hie','Yami Yami','Gura Gura',
    'Ope Ope','Magu Magu','Pika Pika','Tori Tori','Suna Suna'
  )),
  role          TEXT CHECK (role IN ('Navigator','Shipwright','Combatant','Scholar')),
  crew_role     TEXT CHECK (crew_role IN ('Captain','First Mate','Swabbie')),
  bounty        BIGINT NOT NULL DEFAULT 0,
  haki_level    INT NOT NULL DEFAULT 0 CHECK (haki_level BETWEEN 0 AND 5),
  status        TEXT,
  crew_id       UUID,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================
-- CREWS
-- ============================================================
CREATE TABLE IF NOT EXISTS public.crews (
  id                    UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name                  TEXT UNIQUE NOT NULL,
  flag_url              TEXT,
  base_of_operations    TEXT NOT NULL,
  captain_id            UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  member_count          INT NOT NULL DEFAULT 1,
  bounty_total          BIGINT NOT NULL DEFAULT 0,
  created_at            TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Foreign key for users.crew_id
ALTER TABLE public.users
  ADD CONSTRAINT fk_users_crew
  FOREIGN KEY (crew_id) REFERENCES public.crews(id) ON DELETE SET NULL;

-- ============================================================
-- MESSAGES
-- ============================================================
CREATE TABLE IF NOT EXISTS public.messages (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  content     TEXT NOT NULL CHECK (char_length(content) <= 500),
  user_id     UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  crew_id     UUID REFERENCES public.crews(id) ON DELETE CASCADE,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_messages_created ON public.messages (created_at DESC);
CREATE INDEX idx_messages_crew ON public.messages (crew_id, created_at DESC);

-- ============================================================
-- MAP MARKERS
-- ============================================================
CREATE TABLE IF NOT EXISTS public.map_markers (
  id           UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id      UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  crew_id      UUID REFERENCES public.crews(id) ON DELETE SET NULL,
  latitude     DOUBLE PRECISION NOT NULL CHECK (latitude BETWEEN -90 AND 90),
  longitude    DOUBLE PRECISION NOT NULL CHECK (longitude BETWEEN -180 AND 180),
  depth        DOUBLE PRECISION NOT NULL CHECK (depth > 0),
  title        TEXT NOT NULL,
  description  TEXT,
  marker_type  TEXT NOT NULL CHECK (marker_type IN ('discovery','false_sighting','crew_route')),
  created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_markers_depth ON public.map_markers (depth);
CREATE INDEX idx_markers_user ON public.map_markers (user_id);

-- ============================================================
-- FORUM THREADS
-- ============================================================
CREATE TABLE IF NOT EXISTS public.forum_threads (
  id               UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title            TEXT NOT NULL,
  content          TEXT NOT NULL,
  author_id        UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  category         TEXT NOT NULL CHECK (category IN ('Theories','Maritime Data','Gear/Tech','Off-Topic')),
  upvotes          INT NOT NULL DEFAULT 0,
  downvotes        INT NOT NULL DEFAULT 0,
  created_at       TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_threads_category ON public.forum_threads (category);
CREATE INDEX idx_threads_created ON public.forum_threads (created_at DESC);

-- ============================================================
-- FORUM REPLIES
-- ============================================================
CREATE TABLE IF NOT EXISTS public.forum_replies (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  thread_id   UUID NOT NULL REFERENCES public.forum_threads(id) ON DELETE CASCADE,
  content     TEXT NOT NULL,
  author_id   UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  upvotes     INT NOT NULL DEFAULT 0,
  downvotes   INT NOT NULL DEFAULT 0,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_replies_thread ON public.forum_replies (thread_id, created_at ASC);

-- ============================================================
-- BADGES
-- ============================================================
CREATE TABLE IF NOT EXISTS public.badges (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id     UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  badge_type  TEXT NOT NULL,
  earned_at   TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (user_id, badge_type)
);

-- ============================================================
-- ROW LEVEL SECURITY
-- ============================================================
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.crews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.map_markers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.forum_threads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.forum_replies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.badges ENABLE ROW LEVEL SECURITY;

-- Public read for most tables
CREATE POLICY "Public read users" ON public.users FOR SELECT USING (true);
CREATE POLICY "Public read crews" ON public.crews FOR SELECT USING (true);
CREATE POLICY "Public read messages" ON public.messages FOR SELECT USING (true);
CREATE POLICY "Public read markers" ON public.map_markers FOR SELECT USING (true);
CREATE POLICY "Public read threads" ON public.forum_threads FOR SELECT USING (true);
CREATE POLICY "Public read replies" ON public.forum_replies FOR SELECT USING (true);
CREATE POLICY "Public read badges" ON public.badges FOR SELECT USING (true);

-- Authenticated write policies
CREATE POLICY "Users can update own profile" ON public.users
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" ON public.users
  FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Auth can insert messages" ON public.messages
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Auth can insert markers" ON public.map_markers
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Auth can insert threads" ON public.forum_threads
  FOR INSERT WITH CHECK (auth.uid() = author_id);

CREATE POLICY "Auth can insert replies" ON public.forum_replies
  FOR INSERT WITH CHECK (auth.uid() = author_id);

CREATE POLICY "Captains can create crews" ON public.crews
  FOR INSERT WITH CHECK (auth.uid() = captain_id);
