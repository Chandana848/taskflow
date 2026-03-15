# Architecture Decision Records (ADRs)

## ADR-001: Next.js App Router for Unified Full-Stack Architecture
- **Date**: 2026-11-20
- **Status**: Accepted
- **Context**: Need a scalable, modern full-stack web application structure for collaborative project management.
- **Decision**: Use Next.js 16 with App Router, TypeScript strict mode, and React Server Components + Client Components where interactivity is needed.
- **Consequences**: Unified codebase, native SSR/SSG capabilities, streamlined API Route Handlers in `src/app/api`, and rapid DX.

## ADR-002: Tailwind CSS v4 & CSS Variables for Design Tokens
- **Date**: 2026-11-20
- **Status**: Accepted
- **Context**: Need flexible theming (light/dark mode) and consistent design tokens.
- **Decision**: Configure design tokens in CSS variables with HSL color values and bind to Tailwind utility classes.
- **Consequences**: Zero-runtime CSS theming, instantaneous dark mode switching, and cohesive typography/spacing.

## ADR-003: SQLite Local Development with PostgreSQL Production Target via Prisma ORM
- **Date**: 2026-11-20
- **Status**: Accepted
- **Context**: Need fast, zero-dependency local developer workflow with easy deployment to production PostgreSQL.
- **Decision**: Prisma ORM schema compatible with PostgreSQL and SQLite, enabling instant local development, fast migrations, and type-safe query generation.
- **Consequences**: Strict type safety across database entities with migration parity.

## ADR-004: JWT & Cookie-Based Stateless Authentication
- **Date**: 2026-11-20
- **Status**: Accepted
- **Context**: Need scalable authentication supporting credentials and OAuth.
- **Decision**: HttpOnly cookie-based session handling with signed JWTs and bcryptjs password hashing.
- **Consequences**: Secure against XSS, works seamlessly across Edge/Node runtime, and easy role-based access control.

## ADR-005: Zod Schema Validation Pipeline
- **Date**: 2026-11-20
- **Status**: Accepted
- **Context**: All API requests and form submissions must be validated with precise error reporting.
- **Decision**: Implement centralized Zod schemas for all domain entities and request payloads.
- **Consequences**: Full compile-time and runtime type safety, standard 400 Bad Request responses with detailed field errors.
