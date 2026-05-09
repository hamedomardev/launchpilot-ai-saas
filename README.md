# LaunchPilot AI — AI SaaS Platform for Startup MVP Planning

> **AI-style SaaS platform that helps startup founders generate MVP plans, feature lists, technical roadmaps, user stories, risks, monetization ideas, and launch checklists.**

[![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38bdf8?logo=tailwindcss)](https://tailwindcss.com/)
[![Prisma](https://img.shields.io/badge/Prisma-7-5a67d8?logo=prisma)](https://prisma.io/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15-336791?logo=postgresql)](https://www.postgresql.org/)

---

## Live Demo

> _Deploy to Vercel + Neon PostgreSQL — see deployment section below_

---

## Problem

Startup founders waste weeks turning rough ideas into structured plans that developers, investors, and co-founders can understand and act on. Hiring product managers or consultants costs thousands.

## Solution

LaunchPilot AI provides instant, structured MVP planning. Fill in a simple form describing your idea, and the platform generates a complete plan — in seconds.

---

## Features

- **Authentication** — Email/password auth with JWT sessions and HTTP-only cookies
- **Mock AI Generation** — Deterministic, intelligent MVP plan generation based on your inputs
- **8 Plan Sections** — Executive summary, MVP features, tech stack, user stories, roadmap, risks, monetization, launch checklist
- **Dashboard Analytics** — Project stats and industry distribution charts (Recharts)
- **PDF Export** — Download generated plans as formatted PDFs (jsPDF)
- **Search & Filter** — Find projects by name or industry
- **Protected Routes** — All dashboard routes server-side protected
- **Responsive Design** — Mobile + tablet + desktop layout
- **Premium UI** — Dark/navy SaaS design with smooth interactions

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16 App Router |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| ORM | Prisma v7 |
| Database | PostgreSQL |
| Auth | JWT + bcryptjs + HTTP-only cookies |
| Charts | Recharts |
| PDF | jsPDF |
| Validation | Zod v4 |
| DB Driver | @prisma/adapter-pg |

---

## AI Generation Note

> **This portfolio version uses a local mock AI generator to simulate AI-powered MVP planning without requiring a paid API key.**
>
> The architecture is designed so a real LLM provider can be connected later through the AI service layer (`src/lib/mock-ai.ts`). Simply replace the `generateMVPPlan` function with a call to OpenAI, Anthropic, or any other LLM API.

---

## Architecture

```
src/
├── app/                          # Next.js App Router
│   ├── page.tsx                  # Landing page
│   ├── login/page.tsx            # Login
│   ├── register/page.tsx         # Register
│   ├── dashboard/
│   │   ├── layout.tsx            # Auth-protected layout + Sidebar
│   │   ├── page.tsx              # Dashboard overview
│   │   ├── new/page.tsx          # Create new project
│   │   ├── projects/
│   │   │   ├── page.tsx          # Projects list
│   │   │   └── [id]/page.tsx     # Project details
│   │   └── settings/page.tsx     # Profile settings
│   └── api/
│       ├── auth/                 # Register, login, logout, me
│       ├── projects/             # CRUD for projects
│       └── profile/              # Profile update
├── components/
│   ├── ui/                       # Button, Input, Card, Badge
│   ├── layout/                   # Sidebar
│   └── dashboard/                # DashboardCharts, ProjectDetailClient
├── lib/
│   ├── auth.ts                   # JWT session management
│   ├── db.ts                     # Prisma client (pg adapter)
│   ├── mock-ai.ts                # Mock AI generation engine
│   ├── pdf.ts                    # PDF export utility
│   ├── validations.ts            # Zod schemas
│   └── utils.ts                  # Helper functions
├── proxy.ts                      # Route protection (Next.js 16)
└── prisma/
    └── schema.prisma             # Database models
```

---

## Environment Variables

```bash
cp .env.example .env
```

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/launchpilot"
JWT_SECRET="your-long-random-secret-at-least-32-characters"
```

---

## Local Setup

```bash
# 1. Install dependencies
npm install

# 2. Copy and fill environment variables
cp .env.example .env

# 3. Start local PostgreSQL
docker compose up -d

# 4. Run database migrations
npx prisma migrate dev --name init

# 5. Start development server
npm run dev
```

Open http://localhost:3000

---

## Prisma Commands

```bash
npm run prisma:generate   # Generate Prisma Client
npm run prisma:migrate    # Run migrations (dev)
npm run prisma:push       # Push schema (no migration)
npm run prisma:studio     # Open database GUI
```

---

## Deployment on Vercel

1. Push to GitHub
2. Import on [vercel.com](https://vercel.com)
3. Set environment variables: `DATABASE_URL` and `JWT_SECRET`
4. Deploy

**Recommended PostgreSQL:** [Neon](https://neon.tech) (free) · [Supabase](https://supabase.com) · [Railway](https://railway.app)

---

## Future Improvements

- Connect real LLM (OpenAI / Anthropic) through the AI service layer
- Email verification on registration
- Team collaboration and project sharing
- Stripe billing for Pro plan
- Export to Notion / Google Docs
- API for third-party integrations

---

## Developer

**Hamed Omar**
Full-Stack & Mobile Product Engineer · Cairo, Egypt · Cairo University, 2020 · 5 years experience

Email: [omarhamedbadr1244@gmail.com](mailto:omarhamedbadr1244@gmail.com)

**Niche:** Startup MVPs · SaaS Platforms · AI-integrated products · Mobile/Web ecosystems

---

MIT License © 2024 Hamed Omar
