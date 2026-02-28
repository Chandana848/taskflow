# TaskFlow

A production-quality, full-stack task management application built with **Next.js 14**, **TypeScript**, **Tailwind CSS**, **PostgreSQL**, and **Redis**.

## Overview

TaskFlow is a modern project and task management platform that enables teams to plan, track, and collaborate on work efficiently. It features real-time updates, authentication, role-based access control, and a rich interactive UI.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS + CSS Variables |
| Database | PostgreSQL (via Prisma ORM) |
| Cache / Pub-Sub | Redis |
| Auth | NextAuth.js v5 |
| State Management | Zustand + React Query |
| Testing | Jest + React Testing Library + Playwright |
| CI/CD | GitHub Actions |
| Containerisation | Docker + docker-compose |

## Features (Planned)

- 📋 Projects, boards, tasks, and sub-tasks
- 👥 Team collaboration with roles and permissions
- 🔔 Real-time notifications via WebSockets
- 🌙 Light / dark mode
- 📊 Analytics dashboard
- 🔗 GitHub / GitLab integrations
- 📱 Responsive design (mobile-first)

## Getting Started

### Prerequisites

- Node.js ≥ 18
- pnpm ≥ 8
- Docker & docker-compose

### Local Development

```bash
# Clone the repo
git clone https://github.com/your-org/taskflow.git
cd taskflow

# Install dependencies
pnpm install

# Copy env template
cp .env.example .env.local

# Start services
docker-compose up -d

# Run migrations
pnpm db:migrate

# Start dev server
pnpm dev
```

The app will be available at [http://localhost:3000](http://localhost:3000).

## Project Structure

```
taskflow/
├── src/
│   ├── app/            # Next.js App Router pages & layouts
│   ├── components/     # Shared React components
│   ├── lib/            # Utility libraries (db, auth, env, …)
│   ├── hooks/          # Custom React hooks
│   ├── store/          # Zustand state stores
│   ├── types/          # Global TypeScript types
│   └── styles/         # Global CSS & design tokens
├── prisma/             # Prisma schema & migrations
├── public/             # Static assets
├── tests/              # E2E & integration tests
├── .github/            # CI/CD workflows
├── docker/             # Dockerfile & compose files
└── docs/               # Architecture decisions & guides
```

## Development Phases

| Phase | Scope | Status |
|-------|-------|--------|
| 1 | Foundation — tooling, CI, design system base | ✅ In Progress |
| 2 | Database & Auth — Prisma, NextAuth, RBAC | 🔜 Planned |
| 3 | Core features — projects, tasks, boards | 🔜 Planned |
| 4 | Real-time, notifications, integrations | 🔜 Planned |
| 5 | Analytics, polish, production hardening | 🔜 Planned |

## Contributing

Please read [CONTRIBUTING.md](./docs/CONTRIBUTING.md) before submitting pull requests. All commits must follow the [Conventional Commits](https://www.conventionalcommits.org/) specification.

## License

[MIT](./LICENSE) © 2026 Karthika Sai Chandana
