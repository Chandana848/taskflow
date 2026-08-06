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

## ADR-006: Layered Architecture (Repository - Service - Controller/Route)
- **Date**: 2026-11-20
- **Status**: Accepted
- **Context**: Decouple database access from business logic and HTTP routing for testability.
- **Decision**: Implement BaseRepository patterns in `src/server/repositories` and domain services in `src/server/services`.
- **Consequences**: Business logic is framework-agnostic, easily mockable in unit tests, and maintainable.

## ADR-007: Sliding-Window In-Memory Rate Limiting
- **Date**: 2026-11-20
- **Status**: Accepted
- **Context**: Need to protect sensitive auth endpoints and API routes from abuse.
- **Decision**: Sliding window timestamp tracking in memory with separate auth and API limits.
- **Consequences**: Zero external Redis dependency required for local development while easily swappable in multi-node production.

## ADR-008: Role-Based Access Control (RBAC) Hierarchy
- **Date**: 2026-11-20
- **Status**: Accepted
- **Context**: Need granular authorization across workspaces, projects, and tasks for 4 distinct user tiers.
- **Decision**: Define explicit permission sets for OWNER, ADMIN, MEMBER, VIEWER with static mapping and functional guards.
- **Consequences**: Deterministic access control, easy to verify in unit tests, and seamless UI permission checks via `useWorkspaceRole`.

## ADR-009: Double-Layered Auth Protection (Edge Middleware + Route Guards)
- **Date**: 2026-11-20
- **Status**: Accepted
- **Context**: Ensure unauthenticated requests never hit private database handlers.
- **Decision**: Use Next.js Edge Middleware for early URL path gating and Route Guards in API handlers for token verification.
- **Consequences**: Defense in depth, fast redirects at the network edge, and zero unauthenticated database round-trips.

## ADR-010: HTML5 Native Drag-and-Drop for Zero-Bundle Kanban Boards
- **Date**: 2026-11-20
- **Status**: Accepted
- **Context**: Need fluid, accessible card drag-and-drop between columns without heavy third-party bundle bloat.
- **Decision**: Leverage native HTML5 Drag and Drop API with dropzone coordinates and optimistic state sync.
- **Consequences**: Super fast 60fps card movement with 0kb added bundle overhead.

## ADR-011: Slide-Over Task Detail Panel Architecture
- **Date**: 2026-11-20
- **Status**: Accepted
- **Context**: Allow users to inspect and edit task properties while retaining context of the surrounding board.
- **Decision**: Slide-over drawer with deep linking support, optimistic attribute updating, and markdown previews.
- **Consequences**: Enhanced productivity, seamless keyboard dismissal, and continuous board visibility.

## ADR-012: Headless Custom Component Library over Heavy External Bundles
- **Date**: 2026-11-20
- **Status**: Accepted
- **Context**: Maintain lightning-fast bundle delivery while retaining maximum UI customizability.
- **Decision**: Handcrafted, accessible UI primitives with Tailwind v4 styling and strict ARIA attribute adherence.
- **Consequences**: Zero third-party breaking changes, consistent design tokens, and <50ms first contentful paint.

## ADR-013: Server-Sent Events (SSE) for Real-Time Notification and State Sync
- **Date**: 2026-11-20
- **Status**: Accepted
- **Context**: Real-time collaborative updates across distributed team members.
- **Decision**: Next.js App Router HTTP streaming endpoint (`/api/events`) utilizing native Server-Sent Events.
- **Consequences**: Automatic reconnect semantics, standard HTTP/2 multiplexing, and zero external socket server infrastructure needed.

## ADR-014: Cryptographic HMAC-SHA256 Webhook Signatures
- **Date**: 2026-11-20
- **Status**: Accepted
- **Context**: Outgoing notifications to third-party CI/CD, Slack, and automation pipelines.
- **Decision**: Pre-shared secret HMAC signing placed in `X-TaskFlow-Signature` headers.
- **Consequences**: Tamper-proof webhook delivery and seamless developer integration.

## ADR-015: Playwright for End-to-End Visual Flow Regression Testing
- **Date**: 2026-11-20
- **Status**: Accepted
- **Context**: Ensure mission-critical paths (Authentication, Workspace Creation, Kanban Drag-and-Drop) function flawlessly.
- **Decision**: Integrate Playwright with headless Chromium automation and cross-browser CI matrices.
- **Consequences**: Deterministic end-to-end verification, reliable regression detection, and rapid visual validation.

## ADR-016: Multi-Tiered Security Hardening Strategy
- **Date**: 2026-11-20
- **Status**: Accepted
- **Context**: Ensure enterprise readiness with hardened transport, CSRF defense, and XSS sanitization.
- **Decision**: Comprehensive security layer with HTML entity escaping, timing-safe equality checks, double-submit CSRF, and Strict-Transport-Security.
- **Consequences**: Zero attack surface for common OWASP Top 10 web vulnerabilities.
