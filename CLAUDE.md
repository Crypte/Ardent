# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Ardent is a content delivery platform with a freemium model. The project consists of three main components:
1. **Landing** (`/landing`): Public-facing marketing website
2. **App** (`/app`): Main authenticated application for content consumption
3. **Back** (`/back`): PocketBase backend with custom hooks

## Architecture

### Monorepo Structure
- **landing/**: React + Vite landing page for marketing and public information
- **app/**: React + Vite application for authenticated users with premium/free tier logic
- **back/**: PocketBase instance with custom JavaScript hooks and migrations

### Technology Stack
- **Frontend**: React 19, TypeScript, Vite 7, TailwindCSS 4, Shadcn
- **Backend**: PocketBase (self-hosted)
- **Payment**: Stripe integration for premium subscriptions
- **State Management**: React Context API (AuthContext)
- **Routing**: React Router DOM v7
- **Forms**: React Hook Form with Yup/Zod validation

### Documentation References
- **PocketBase**: https://pocketbase.io/docs/ (backend, hooks, collections, auth)
- **Shadcn UI**: https://ui.shadcn.com/docs/installation (UI components)

### Key Architectural Patterns

#### Authentication Flow
- Centralized authentication via `app/src/contexts/AuthContext.tsx`
- Token-based auth with automatic refresh (checks every 60s)
- Session validation with user cache (5-minute TTL)
- Protected routes via `ProtectedRoute` and `PublicOnlyRoute` components
- Auth routes: `/auth/login`, `/auth/register`, `/auth/forgot-password`, etc.

#### Content Access Model
- Resources (`resource` collection) have `is_public` and `published` flags
- Free users see public resources only
- Premium users see all published resources
- Resource views tracked in `user_views` collection
- Navigation logic handles viewed/unviewed resources automatically

#### PocketBase Integration
- Client initialized in `src/pocketbase/pocketbase.ts` with `VITE_PB_URL` env var
- Custom backend routes in `back/pb_hooks/`:
  - `RouteArticleSelection.pb.js`: Handles resource selection and view tracking
  - `RouteGetArticle.pb.js`: Fetches resources with access control
  - `RouteStripe.pb.js`: Stripe webhook handler for premium upgrades
  - `CronDaily.pb.js`: Daily scheduled tasks
- Database schema defined in migrations (`back/pb_migrations/`)

#### Resource System
- Resources contain cards with different types: `vocabulaire`, `event`, `anecdote`, `keynumber`
- Each card type has specific metadata structure (see `app/src/types/index.ts`)
- Resources fetched with user-specific data (is_viewed, access_type, etc.)
- Smart navigation system that prioritizes unviewed resources

## Common Development Commands

### Landing Site
```bash
cd landing
npm run dev      # Development server on port 5174
npm run build    # TypeScript check + production build
npm run lint     # ESLint
npm run preview  # Preview production build
```

### Main App
```bash
cd app
npm run dev      # Development server on port 5173
npm run build    # TypeScript check + production build
npm run lint     # ESLint
npm run preview  # Preview production build
```

### PocketBase Backend
```bash
cd back
./pocketbase serve  # Start PocketBase on port 8090
```

### Environment Setup
- Use `.env.dev` for local development (already configured)
- Landing URL: `http://localhost:5174`
- App URL: `http://localhost:5173`
- PocketBase URL: `http://localhost:8090`

## Critical Implementation Details

### Path Aliases
Both `landing` and `app` use `@/` alias pointing to `./src` directory (configured in `vite.config.ts`)

### Resource Navigation Hook Pattern
The app uses a sophisticated hook composition pattern:
- `useArticleRoute()`: Top-level routing and URL management
- `useArticleNavigation()`: Fetches next resource based on user's viewed history
- `useArticleById()`: Fetches specific resource with user context

### Stripe Integration
- Checkout sessions created with `client_reference_id` = user ID
- Webhook validates signatures using `STRIPE_WEBHOOK_SECRET`
- On successful payment (`checkout.session.completed`), user's `is_premium` flag is set to true
- Stripe customer ID stored in user record

### Custom Markdown Handling (Landing)
Landing site has a custom Vite plugin `markdownPreloader()` that allows importing `.md` files with `?raw` suffix

### User Types and Interfaces
Key interfaces defined in `app/src/types/index.ts`:
- `User`: Full user model with premium status and Stripe data
- `Article`: Resource with cards and user-specific view data
- `ArticleCard`: Individual content cards within resources

### Authentication Constants
Auth messages and cache configuration in `app/src/constants/auth.ts`:
- User cache duration: 5 minutes
- Token refresh threshold: 5 minutes before expiry
- Session check interval: 5 minutes

## Important Notes

### Terminology
- **IMPORTANT**: The codebase uses "resource" consistently throughout (collection name: `resource`)
- Some legacy code may still reference "Article" in hook/function names but they handle resources

### Git Workflow
- Main branch: `master` (use this for PRs)
- Current branch: `dev`

### PocketBase Hooks
- Written in JavaScript (not TypeScript)
- Use `routerAdd()` for custom routes
- Access auth user via `c.auth` or `e.requestInfo().auth`
- Collections accessed via `$app.findCollectionByNameOrId()` or `$app.findRecordById()`

### Component Organization
- `app/src/components/ui/`: Shadcn-style UI components (48+ components)
- `app/src/components/auth/`: Auth-specific components (ProtectedRoute, PublicOnlyRoute, etc.)
- `app/src/components/profile/`: Profile page components
- `app/src/components/resource/`: Resource display components

### Testing Resource Access
To test premium features, manually update user record in PocketBase admin:
```javascript
// Set user.is_premium = true in PocketBase admin
```