# 🌙 Selamat Hari Raya Aidilfitri — Wishing Website

A modern, festive, and fully responsive **Hari Raya Aidilfitri wishing website** built with **Next.js 14 App Router**, **TypeScript**, **Tailwind CSS**, and **Supabase**.

## ✨ Features

- 🟢 Deep green festive theme with gold accents & Islamic geometric patterns
- 🪔 Animated lanterns, crescent moons, and floating ketupat decorations
- 💬 Live wish board — users submit their name & Hari Raya message
- 🫧 Desktop: floating pill-shaped wish bubbles (left & right columns, gently animated)
- 📱 Mobile: stacked festive wish cards with smooth transitions
- ⭐ Twinkling star field background animation
- 🎵 Toggle background Hari Raya music (YouTube hidden embed)
- ✅ Full Supabase integration — wishes stored & fetched in real-time
- 🚀 Deploy-ready for Vercel

---

## 🗂 Project Structure

```
rayawish/
├── app/
│   ├── api/
│   │   └── wishes/
│   │       └── route.ts          # GET + POST API for wishes
│   ├── globals.css               # Global styles, animations, Islamic pattern
│   ├── layout.tsx                # App layout with fonts & Toaster
│   └── page.tsx                  # Main homepage
├── components/
│   ├── BackgroundMusic.tsx       # Hidden YouTube audio player
│   ├── FloatingKetupat.tsx       # Drifting + floating ketupat SVGs
│   ├── StarField.tsx             # Twinkling star particles
│   ├── WishBubble.tsx            # Individual wish (bubble or card)
│   ├── WishesDisplay.tsx         # Desktop columns / mobile stack
│   └── WishForm.tsx              # Submit form
├── lib/
│   └── supabase.ts               # Supabase client + Wish type
├── supabase/
│   └── schema.sql                # SQL to create the wishes table
├── .env.local.example            # Environment variable template
├── next.config.mjs
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

---

## 🚀 Getting Started

### 1. Install dependencies

```bash
npm install
# or
yarn install
# or
pnpm install
```

### 2. Set up Supabase

1. Go to [supabase.com](https://supabase.com) and create a new project.
2. In the Supabase **SQL Editor**, run the contents of `supabase/schema.sql` to create the `wishes` table with Row-Level Security.
3. In your project settings → **API**, copy:
   - `Project URL` → `NEXT_PUBLIC_SUPABASE_URL`
   - `anon / public` key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### 3. Configure environment variables

```bash
cp .env.local.example .env.local
```

Edit `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxxxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### 4. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

---

## 🗄 Supabase Table

The `wishes` table has the following schema:

| Column       | Type        | Description              |
| ------------ | ----------- | ------------------------ |
| `id`         | uuid (PK)   | Auto-generated UUID      |
| `username`   | text        | Submitter's name         |
| `message`    | text        | Hari Raya wish message   |
| `created_at` | timestamptz | Auto-set on insert (now) |

Row-Level Security is enabled:
- **SELECT**: public (anyone can read)
- **INSERT**: public (anyone can submit)

---

## 🎵 Background Music

The site includes a hidden YouTube iframe player that can be toggled via the 🔇 / 🎵 button in the bottom-right corner.

The default video ID is `xc38KCZAdvA`. To change the song:

1. Find a Hari Raya music YouTube video.
2. Copy its `VIDEO_ID` from the URL: `https://www.youtube.com/watch?v=VIDEO_ID`
3. Update `videoId` prop in `app/page.tsx`:

```tsx
<BackgroundMusic videoId="YOUR_VIDEO_ID" />
```

> **Note:** Browser autoplay policies may prevent audio from playing until the user interacts with the page. The toggle button allows users to enable music after their first interaction.

---

## 🌐 Deploy to Vercel

### Option A — Vercel CLI

```bash
npm install -g vercel
vercel
```

### Option B — Vercel Dashboard

1. Push this repo to **GitHub / GitLab / Bitbucket**.
2. Go to [vercel.com](https://vercel.com) → **New Project** → Import your repo.
3. In the **Environment Variables** section, add:
   - `NEXT_PUBLIC_SUPABASE_URL` = your Supabase project URL
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` = your Supabase anon key
4. Click **Deploy**. Your site will be live in seconds!

---

## 🛠️ Tech Stack

| Layer      | Technology                            |
| ---------- | ------------------------------------- |
| Framework  | Next.js 14 (App Router)               |
| Language   | TypeScript                            |
| Styling    | Tailwind CSS + custom CSS animations  |
| Animation  | Framer Motion                         |
| Database   | Supabase (PostgreSQL)                 |
| Fonts      | Google Fonts (Playfair Display, Inter, Amiri) |
| Music      | YouTube IFrame API (hidden embed)     |
| Hosting    | Vercel                                |

---

## 🧩 Customisation

### Change the greeting year
Update `1446 H` in `app/page.tsx` to the relevant Hijri year.

### Add more ketupat / decorations
Edit `components/FloatingKetupat.tsx` — add entries to the `drifting` or `fixed` arrays.

### Change colour palette
Update `tailwind.config.ts` under `colors.raya` or CSS variables in `app/globals.css`.

---

*Selamat Hari Raya Aidilfitri — Maaf Zahir & Batin 🌙*
