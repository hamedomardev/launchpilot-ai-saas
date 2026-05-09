# LaunchPilot AI — AI-Style SaaS Platform for Startup MVP Planning

LaunchPilot AI is a full-stack SaaS-style web application that helps startup founders turn rough business ideas into structured MVP plans, including feature lists, recommended tech stacks, user stories, development roadmaps, risk analysis, monetization ideas, and launch checklists.

This project was built as a portfolio-ready full-stack product to demonstrate SaaS architecture, authentication, database-backed workflows, dashboard design, mock AI generation, and PDF export.

---

## Overview

Many early-stage founders have ideas but struggle to convert them into a clear execution plan. LaunchPilot AI solves this by transforming a simple startup idea form into a structured MVP planning document.

The generated plan includes:

- Executive summary
- MVP feature list
- Recommended tech stack
- User stories
- Development roadmap
- Risk analysis
- Monetization model
- Launch checklist
- PDF export

This version uses a local mock AI generator, so no paid AI API is required.

---

## Problem

Startup founders often waste weeks trying to structure their ideas into plans that developers, investors, and co-founders can understand.

Common problems include:

- Lack of clear MVP scope
- No structured feature prioritization
- Unclear development roadmap
- Missing risk analysis
- No launch checklist
- Expensive product consultants

---

## Solution

LaunchPilot AI provides a simple workflow:

1. The user creates an account.
2. The user enters a startup idea.
3. The app generates a complete MVP plan.
4. The plan is saved to the user dashboard.
5. The user can view, manage, delete, and export projects as PDF.

The platform acts like an AI-powered product planning assistant, while using a local mock AI engine for demo purposes.

---

## Key Features

### Authentication

- User registration
- User login
- Secure password hashing
- JWT-based session handling
- Protected dashboard routes
- Logout functionality

### Dashboard

- Total projects count
- MVP plans generated count
- Industries covered count
- Projects by industry chart
- Recent projects section
- Empty states for new users

### Project Generation

- Startup idea form
- Industry and target users input
- Problem and solution description
- Goals, budget, and timeline fields
- Mock AI-generated structured MVP plan

### Project Management

- Projects list page
- Search projects
- Filter projects by industry
- View project details
- Delete projects

### MVP Plan Output

Each generated project includes:

- Project brief
- Executive summary
- MVP feature list
- Recommended tech stack
- User stories
- Development roadmap
- Risk analysis
- Monetization model
- Launch checklist

### PDF Export

- Export generated MVP plans as PDF
- Useful for sharing plans with clients, teams, or investors

---

## Tech Stack

### Frontend

- Next.js App Router
- TypeScript
- Tailwind CSS
- React
- Recharts

### Backend

- Next.js API Routes
- Prisma ORM
- PostgreSQL
- JWT authentication
- bcryptjs password hashing

### Database

- PostgreSQL
- Prisma schema and migrations
- Docker-based local database setup

### Other Tools

- Docker Compose
- Local mock AI generation engine
- PDF export utility

---

## Screenshots

Add the screenshots inside a folder named `screenshots/` in the project root.

### Landing Page

![Landing Page](screenshots/landing-page.png)

### Register Page

![Register Page](screenshots/register-page.png)

### Login Page

![Login Page](screenshots/login-page.png)

### Empty Dashboard

![Empty Dashboard](screenshots/dashboard-empty.png)

### Dashboard Overview

![Dashboard Overview](screenshots/dashboard-overview.png)

### New MVP Plan Form

![New MVP Plan Form](screenshots/new-project-form.png)

### Projects List

![Projects List](screenshots/projects-list.png)

### Project Details

![Project Details](screenshots/project-details.png)

### Recommended Tech Stack and User Stories

![Tech Stack and User Stories](screenshots/tech-stack-user-stories.png)

### Roadmap and Risk Analysis

![Roadmap and Risk Analysis](screenshots/roadmap-risk-analysis.png)

### Launch Checklist

![Launch Checklist](screenshots/launch-checklist.png)

---

## Example Generated Project

A sample test project used during development:

**Project Name:** MedQueue  
**Industry:** Healthcare / MedTech  
**Target Users:** Patients, emergency clinics, hospital reception teams, and doctors  

**Problem:**  
Patients in emergency clinics often wait for a long time without knowing their queue status, estimated waiting time, or which doctor is available.

**Solution:**  
MedQueue allows patients to join a digital queue, track estimated waiting time, and receive updates about appointment status, while clinics manage patient flow from an admin dashboard.

---

## No Paid API Required

LaunchPilot AI uses a local mock AI generator to simulate AI-powered MVP planning.

No OpenAI API key, paid AI API, or external AI service is required.

The architecture is designed so a real LLM provider can be connected later through the AI service layer.

---

## Mock AI Engine

The mock AI engine generates structured startup plans using the user’s input.

It considers:

- Startup idea name
- Industry
- Target users
- Problem description
- Proposed solution
- Main goals
- Budget level
- Development timeline

The output is deterministic and designed for demo/portfolio use.

---

## Database Models

The project uses two main Prisma models:

### User

Stores account information, authentication details, and project ownership.

### Project

Stores the original startup idea input and all generated MVP plan sections.

---

## Local Setup

### 1. Clone the Repository

```bash
git clone https://github.com/hamedomardev/launchpilot-ai-saas.git
cd launchpilot-ai-saas
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Create Environment File

```bash
cp .env.example .env
```

Update `.env`:

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/launchpilot"
JWT_SECRET="replace-this-with-a-long-random-secret"
```

### 4. Start PostgreSQL with Docker

```bash
docker compose up -d
```

### 5. Run Prisma Migration

```bash
npx prisma migrate dev --name init
```

### 6. Generate Prisma Client

```bash
npx prisma generate
```

### 7. Run the Development Server

```bash
npm run dev
```

Open the app:

```txt
http://localhost:3000
```

If port 3000 is busy, Next.js may run on:

```txt
http://localhost:3001
```

---

## Useful Commands

### Run Development Server

```bash
npm run dev
```

### Build for Production

```bash
npm run build
```

### Start Production Server

```bash
npm run start
```

### Run TypeScript Check

```bash
npx tsc --noEmit
```

### Open Prisma Studio

```bash
npx prisma studio
```

### Stop Docker Database

```bash
docker compose down
```

---

## Environment Variables

Create a `.env` file in the project root.

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/launchpilot"
JWT_SECRET="replace-this-with-a-long-random-secret"
```

Important:

- Do not commit `.env` to GitHub.
- Use `.env.example` for public setup instructions.
- This project does not use `OPENAI_API_KEY`.

---

## Project Structure

```txt
launchpilot-ai-saas/
  prisma/
    migrations/
    schema.prisma

  public/

  src/
    app/
      api/
        auth/
        profile/
        projects/
      dashboard/
        new/
        projects/
        settings/
      login/
      register/
      globals.css
      layout.tsx
      page.tsx

    components/
      dashboard/
      layout/
      ui/

    lib/
      auth.ts
      db.ts
      mock-ai.ts
      pdf.ts
      utils.ts
      validations.ts

  docker-compose.yml
  package.json
  README.md
```

---

## Main Pages

| Page | Route |
|---|---|
| Landing Page | `/` |
| Register | `/register` |
| Login | `/login` |
| Dashboard | `/dashboard` |
| New MVP Plan | `/dashboard/new` |
| Projects List | `/dashboard/projects` |
| Project Details | `/dashboard/projects/[id]` |
| Settings | `/dashboard/settings` |

---

## API Routes

| Endpoint | Purpose |
|---|---|
| `POST /api/auth/register` | Register a new user |
| `POST /api/auth/login` | Login user |
| `POST /api/auth/logout` | Logout user |
| `GET /api/auth/me` | Get current authenticated user |
| `GET /api/projects` | Get user projects |
| `POST /api/projects` | Create generated MVP plan |
| `GET /api/projects/[id]` | Get project details |
| `DELETE /api/projects/[id]` | Delete project |
| `PATCH /api/profile` | Update user profile |

---

## What This Project Demonstrates

This project demonstrates:

- Full-stack SaaS application development
- Authentication and protected routes
- PostgreSQL database integration
- Prisma ORM modeling and migrations
- Dashboard UI design
- Form validation
- Mock AI product logic
- PDF export functionality
- Docker-based local development
- Production build readiness
- Portfolio-level project presentation

---

## Future Improvements

Possible future improvements:

- Add real LLM provider integration
- Add Stripe subscriptions
- Add team collaboration
- Add project sharing links
- Add email notifications
- Add richer PDF templates
- Add editable generated plans
- Add project export as Markdown
- Add admin analytics dashboard
- Add multi-language support

---

## Developer

**Hamed Omar**  
Full-Stack & Mobile Product Engineer  
Cairo, Egypt  

Email: [omarhamedbadr1244@gmail.com](mailto:omarhamedbadr1244@gmail.com)

GitHub: [hamedomardev](https://github.com/hamedomardev)

---

## Repository

GitHub Repository:  
[https://github.com/hamedomardev/launchpilot-ai-saas](https://github.com/hamedomardev/launchpilot-ai-saas)

---

## License

This project is created for portfolio and educational purposes.
