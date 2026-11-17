# TrendPilot — Trend-Driven Social Media Marketing SaaS

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Frhoni266%2Ftrendpilot)
[![CI Status](https://github.com/rhoni266/trendpilot/actions/workflows/ci.yml/badge.svg)](https://github.com/rhoni266/trendpilot/actions)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

> **A production-minded, multi-tenant SaaS marketing platform that researches rolling 7-day social media trends, learns a business's products and unique selling propositions (USPs), and orchestrates an adaptive, rolling 30-day marketing content calendar with images and platform-ready copy.**

---

## 1. Executive Summary & Vision

TrendPilot is not a generic AI caption generator. It is an end-to-end autonomous marketing orchestration engine built on a closed-loop principle:

```
Business Knowledge Base → Rolling 7-Day Trend Intelligence → Multi-Factor Scoring & Safety Hard Gate → Multi-Concept Generation → Human / Automatic Approval → Scheduling & Dispatch → Performance & Deletion Feedback Loop → Continuous Model Refinement
```

### Core Product Principles
- **Trend-Aware, Not Trend-Chasing**: Trends are only adopted when they meaningfully align with verified business USPs and audience pain points.
- **Business-First**: Verified product truth and brand guidelines strictly take precedence over viral fads. Fabricated facts, fake endorsements, or unsupported claims are categorically forbidden.
- **Safety by Design**: Two-stage filter (pre-generation screening + post-generation moderation) eliminates political controversy, discriminatory framing, harassment, and sensitive exploitation.
- **Transparent & Explainable**: Every trend-driven recommendation surfaces its origin platform, observation date, evidence URL, confidence metrics, and relevance breakdown.
- **No Fake Certainty**: Forecasts and predicted performance are labeled as estimates, not guarantees.
- **Rolling 30-Day Calendar**: Dynamic forward-looking calendar where unapproved posts are living forecasts that adapt gracefully to fresh 7-day trend intelligence. Approved/scheduled posts are **never** silently overwritten.
- **Deletion as High-Signal Learning**: Deletion triggers a lightweight 10-option structured reason modal. The feedback updates tenant learning weights with full inspectability and reset controls.

---

## 2. System Architecture & Features

### 2.1 Core Modules Built
1. **Overview Dashboard** (`/`):
   - KPI metrics: Scheduled posts, awaiting review, 7-day trend opportunities, adaptive forecasts.
   - Live 7-day trend radar spotlight with score badges (0–100).
   - 30-Day calendar preview with visual differentiation between `FORECAST`, `APPROVED`, and `REVIEW_SUGGESTED`.
   - Autonomous posting safety status & 14-day probation countdown.
   - Continuous learning insights card with real-time weights.

2. **Trend Radar** (`/radar`):
   - Rolling 7-day window filter (strictly last 168 hours).
   - Multi-platform support: TikTok, Threads, Instagram, Facebook.
   - Multi-factor explainable 0–100 scoring (Recency 15%, Momentum 15%, Business Relevance 25%, Audience Fit 15%, Platform Fit 10%, Brand Fit 10%, Commercial Usefulness 10%).
   - **Safety Hard Gate**: Automatic exclusion of political controversy, boycott debates, racism, harassment, and tragedy exploitation.
   - Excluded trends inspector with exact rejection rationale (Admin visibility).
   - "Generate Ideas" direct bridge into Content Studio.

3. **Content Studio** (`/studio`):
   - Generates 8 distinct concept angles (Problem → Solution, Educational Lore, Behind the Scenes, ASMR Video Script, etc.).
   - Platform-adapted copy editor for Instagram, TikTok, Threads, and Facebook with character limit tracking, hook placement, CTA phrasing, and hashtag banks.
   - Mobile mockup live preview with studio product imagery.
   - Grounding Fact pill verifying claims against the Business Brain.
   - Deletion with Learning feedback modal.

4. **30-Day Rolling Calendar** (`/calendar`):
   - Month Grid and List Timeline views with `Asia/Kuala_Lumpur` timezone awareness.
   - Distinct badges for `FORECAST` vs `APPROVED` / `SCHEDULED` (locked).
   - **Trend Refresh Engine**: Detects when fresh 7-day trend intelligence outperforms an unapproved forecast item (+15 score differential) and proposes a replacement (`REVIEW_SUGGESTED`).
   - Side-by-side **Comparison Modal**: Compare current draft vs proposed replacement with score diff and Keep / Replace actions.

5. **Business Brain & Knowledge Base** (`/brain`):
   - Grounding Fact Verification Engine: Distinguishes between `VERIFIED`, `UNVERIFIED_NEEDS_PROOF`, and `EXPIRED` facts.
   - Product Catalogue & USP library with verifiable proof points.
   - Brand voice rules (tone, words to use, forbidden words, bilingual Malaysian support).
   - Restricted topics list (e.g. political debates, unsupported health cures).
   - **Learned Preferences Inspector**: Full transparency into learned weights with one-click "Reset to Default" button.

6. **Publishing & Platform Integrations** (`/publishing`):
   - Connected social accounts (Instagram Business, TikTok Creator, Threads, Facebook Page).
   - Explicit Auto-Post safety checklist:
     - 14-Day probation enforcement (prevents auto-post during initial learning period).
     - Hard gate requiring 100% PASS safety status.
     - Minimum score threshold (>= 75/100).
     - Verified facts only.
     - Daily posting caps.
   - Emergency Controls: "Pause All Publishing" kill-switch.

7. **Analytics & Learning Insights** (`/analytics`):
   - Performance breakdown by Content Pillar (Recipes & Hacks, Farm to Cup, Coffee Lore, Community).
   - Top-performing hooks and CTAs based on audience save/share rates.
   - Model accuracy rating based on administrator approval patterns.

8. **Settings & Immutable Audit Trail** (`/settings`):
   - Localization controls: Timezone (`Asia/Kuala_Lumpur`) and Language (`ms-MY_en` bilingual).
   - AI Engine selector: Google Gemini 2.0 Flash vs Local Deterministic Mock Engine.
   - Role-Based Access Control (RBAC): `SUPER_ADMIN`, `BUSINESS_ADMIN`, `MARKETING_MANAGER`, `VIEWER`.
   - Immutable audit log tracking all approvals, deletions, and publishing events.

---

## 3. Technology Stack

- **Framework**: Next.js 16.4 (App Router) + React 19 + TypeScript 5
- **Styling**: Tailwind CSS + Lucide Icons + Glassmorphic dark theme
- **Database & Persistence**:
  - Local Zero-Dependency Store: Durable ACID JSON store with atomic file writes (`data/db.json`).
  - Production Schema: Complete 35-entity Prisma Schema (`prisma/schema.prisma`) for PostgreSQL / Supabase.
- **AI Engine**: Provider Abstraction Layer (`GeminiProvider` via REST API + `MockAIProvider` for offline development).
- **Social Connectors**: `PlatformConnector` registry with honest capability declarations for TikTok, Threads, Instagram, and Facebook.
- **Testing**: Vitest 5.1

---

## 4. How to Run Locally

### Prerequisites
- Node.js v20+ or v22+
- npm v10+

### Setup Instructions
```bash
# 1. Navigate to project directory
cd D:\dev\trendpilot

# 2. Run automated tests (Scoring, Safety Gate, Deletion Learning, Publishing)
npm test

# 3. Build optimized production bundle
npm run build

# 4. Start production server
npm start
# Server ready on http://localhost:3000
```

To run in development mode with hot reload:
```bash
npm run dev
```

---

## 5. Environment Variables (`.env`)

Secrets and configuration are loaded from `.env`. An `.env.example` template is provided:

```bash
# Application Environment
NODE_ENV=development
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_APP_NAME="TrendPilot"

# Database Connection (Prisma)
DATABASE_URL="file:./dev.db"

# AI Provider Configuration ('gemini' or 'mock')
AI_PROVIDER=mock
GEMINI_API_KEY=""

# Social Connectors Mode ('mock' for local demo, 'live' for real platform APIs)
SOCIAL_CONNECTORS_MODE=mock

# Default Regional Configuration
DEFAULT_TIMEZONE=Asia/Kuala_Lumpur
DEFAULT_LOCALE=en-MY
```

To activate real Google Gemini API calls, set `AI_PROVIDER=gemini` and provide a valid `GEMINI_API_KEY`. If unset, TrendPilot runs deterministically via the built-in Malaysian marketing knowledge engine.

---

## 6. Official Platform Capabilities & Honest Disclosures

| Platform | Official API Tier | Trend Discovery Status | Publishing Status | Dev / Demo Status |
|---|---|---|---|---|
| **TikTok** | TikTok for Developers & Commercial Content API | Requires commercial partnership or Research API access. | Supported via TikTok Content Posting API. | Functional Mock Connector with verified trends. |
| **Threads** | Threads API (Meta Graph API) | Official keyword & insights endpoints for approved apps. | Supported via Threads Graph API. | Functional Mock Connector. |
| **Instagram** | Instagram Graph API | Rate-limited hashtag search (30 hashtags/7 days). | Supported via Content Publishing API. | Functional Mock Connector with studio previews. |
| **Facebook** | Meta Graph API | Public feed search restricted; compliant via licensed partners. | Supported for Pages via Pages API. | Functional Mock Connector. |

*TrendPilot never scrapes private accounts, fabricates trend metrics, or bypasses authentication.*

---

## 7. Verification & Test Results

```bash
✓ tests/scoringEngine.test.ts (2 tests)
  - should hard BLOCK prohibited political, controversial, or tragic topics
  - should calculate explainable 0-100 scores across all dimensions
✓ tests/deletionLearning.test.ts (1 test)
  - should soft-delete post and adjust learning preferences when reason is TOO_PROMOTIONAL
✓ tests/publishingService.test.ts (2 tests)
  - should block Auto-Post if tenant is still in 14-day probation period
  - should block Auto-Post if post safetyOutcome is not PASS

Test Files: 3 passed (3)
Tests:      5 passed (5)
Duration:   443ms
Build:      Optimized Next.js production build succeeded with exit code 0.
```

---

## 8. Deployment Instructions

### Deploy to Vercel / Cloud Container
1. Push repository to GitHub/GitLab.
2. Import into Vercel or build via Docker:
   ```dockerfile
   FROM node:22-alpine
   WORKDIR /app
   COPY package*.json ./
   RUN npm ci
   COPY . .
   RUN npm run build
   EXPOSE 3000
   CMD ["npm", "start"]
   ```
3. Set environment variables in production (`DATABASE_URL`, `GEMINI_API_KEY`, `DEFAULT_TIMEZONE=Asia/Kuala_Lumpur`).
4. To connect PostgreSQL/Supabase, apply the migrations from `prisma/schema.prisma`.
