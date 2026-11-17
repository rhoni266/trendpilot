# IMPLEMENTATION PLAN: TrendPilot (Trend-Driven Social Media Marketing SaaS)

## 1. Executive Summary & Product Vision
**TrendPilot** is a production-minded, multi-tenant SaaS marketing platform that bridges the gap between fast-moving social media trends and grounded, truth-based business marketing. 

Unlike generic caption generators or blind "trend-chasing" tools, TrendPilot operates on a rigorous, closed-loop principle:
```
Business Knowledge Base -> Rolling 7-Day Trend Intelligence -> Multi-Factor Relevance & Safety Scoring -> Multi-Concept Generation -> Human/Automatic Approval -> Scheduling & Publishing -> Performance & Deletion Feedback Loop -> Continuous Refinement
```

### Core Principles
1. **Trend-Aware, Not Trend-Chasing**: A trend is only adopted if it directly aligns with verified business USPs and audience pain points.
2. **Business-First**: Verified product truth and brand guidelines strictly take precedence over viral fads. Fabricated facts, fake endorsements, or unsupported claims are categorically forbidden.
3. **Safety by Design**: A strict two-stage filter (pre-generation screening + post-generation moderation) eliminates political controversy, discriminatory framing, hate, harassment, and sensitive exploitation.
4. **Transparent & Explainable**: Every trend-driven recommendation surfaces its origin platform, observation date, evidence URL, confidence metrics, and relevance breakdown.
5. **No Fake Certainty**: Projected reach, engagement estimates, and forecast models are clearly tagged as estimates rather than guarantees.
6. **Platform-Compliant**: Official APIs only. Clear labeling of capabilities and honest limitations where platform APIs restrict public trend feeds or scheduling.
7. **Rolling 30-Day Calendar**: Maintains a dynamic forward-looking calendar where unapproved posts are living forecasts that adapt gracefully to fresh 7-day trend intelligence.
8. **Deletion as Learning**: Deletion is treated as high-signal feedback. A required, lightweight reason query updates tenant learning weights with full inspectability and reset controls.

---

## 2. Multi-Tenant Architecture & Roles

### 2.1 Role-Based Access Control (RBAC)
- **Super Admin**: System-wide health, tenant management, global AI provider configuration, audit log inspection, safety policy enforcement.
- **Business Owner / Admin**: Company profile, product/USP catalogue, social account connection, Auto-post vs Manual approval modes, posting windows, team management, learning preferences.
- **Marketing Manager / Editor**: Content ideation, copy & visual review, calendar rescheduling, deletion with feedback, manual post approval (if delegated).
- **Viewer**: Read-only access to calendar, published posts, trend radar, and analytics.

### 2.2 Localization & Regional Defaults
- **Default Timezone**: `Asia/Kuala_Lumpur` (UTC+8), configurable per tenant.
- **Language Support**: English and Bahasa Malaysia (`ms-MY`), with first-class support for mixed-language Malaysian/Southeast Asian marketing vernacular.

---

## 3. Phased Implementation Roadmap

### Phase 0: Repository Inspection, Architecture & Setup
- Detailed technical specifications, data models, and integration registries.
- Initialize Next.js 15 App Router, TypeScript, Tailwind CSS, Lucide icons, Vitest.
- Setup Prisma ORM with SQLite for zero-friction local development + PostgreSQL production schema.
- Environment variable contracts (`.env.example`) with zero hardcoded credentials.

### Phase 1: SaaS Foundation & Tenant Shell
- Multi-tenant scoping and session context.
- Navigation shell, responsive layout, dark/light theme, timezone badge, language toggle.
- Tenant onboarding wizard: business name, market, brand voice, target audience, posting frequency.

### Phase 2: Business Brain (Knowledge Base & Fact Ingestion)
- Product & USP manager (features, benefits, proof points, differentiators).
- Audience personas & brand voice profile (tones, words to use, words to avoid).
- Document ingestion interface (PDF, DOCX, text) with automatic structured fact extraction.
- Fact Verification status engine: `VERIFIED`, `UNVERIFIED_NEEDS_PROOF`, `EXPIRED`.
- Approved claims repository vs restricted/prohibited topics.

### Phase 3: Trend Radar (Rolling 7-Day Intelligence Engine)
- Connector abstraction: `TikTokConnector`, `ThreadsConnector`, `InstagramConnector`, `FacebookConnector`.
- Clear platform capability declaration (`trendDiscovery`, `publishing`, `analytics`, etc.).
- Rolling 7-day window filter (168 hours relative to tenant timezone).
- Trend signal normalisation, deduplication, and classification (topics, formats, hashtags, questions).
- Multi-factor explainable scoring (0-100): Recency (15%), Momentum (15%), Business Relevance (25%), Audience Fit (15%), Platform Fit (10%), Brand Fit (10%), Commercial Usefulness (10%).
- Safety Hard Gate: Automatic exclusion of sensitive, controversial, political, or prohibited themes.
- Trend Evidence Cards with verifiable links and confidence ratings. Clearly labeled demo/mock data provider for local development.

### Phase 4: Content Studio (Multi-Concept Generator & Visuals)
- Trend-to-concept generator producing distinctly different angles:
  1. Educational / Explain-it-simply
  2. Problem -> Solution
  3. Myth vs. Fact
  4. FAQ / Objection Handling
  5. Behind the Scenes / Process
  6. Customer Scenario / Storytelling
  7. Short-form Video Script / Hook-and-Hold
  8. Promotional / Offer-led
- Platform-specific copy adaptation (TikTok, Threads, Instagram, Facebook): tailored character limits, hook placement, CTA phrasing, hashtag limits.
- Visual Brief & Image Generation abstraction (Gemini / Mock visual studio) with logo integration rules, minimal text overlay, and deterministic layout formatting.
- Multi-stage moderation: Pre-generation screening + Post-generation moderation (PASS, MANUAL_REVIEW, BLOCKED).

### Phase 5: Rolling 30-Day Planner & Adaptive Refresh
- Rolling 30-day calendar (Month, Week, List views) distinguishing `FORECAST` vs `APPROVED` / `SCHEDULED`.
- Refresh Engine: When new 7-day trend scans execute, compare against unapproved future posts. If a significantly superior opportunity appears, flag as `REVIEW_SUGGESTED` with a side-by-side comparison modal (Keep vs Replace).
- Calendar lifecycle states: `IDEA`, `FORECAST`, `DRAFT`, `NEEDS_REVIEW`, `APPROVED`, `SCHEDULED`, `PUBLISHING`, `PUBLISHED`, `FAILED`, `ON_HOLD`, `REPLACEMENT_PROPOSED`, `DELETED`.

### Phase 6: Deletion Learning Engine
- Intercept post deletion with a contextual, required reason modal:
  - Not relevant to our business
  - Trend is already outdated
  - Wrong audience
  - Does not match our brand voice
  - Copywriting is weak
  - Visual/image is unsuitable
  - Inaccurate business info
  - Too promotional / repetitive
  - Sensitive or inappropriate
  - Campaign/offer changed
  - Other (text)
- Optional improvement feedback field.
- Soft-delete record into `DeletionFeedback`.
- Incremental update of tenant `LearningPreference` weights (e.g. decrease pillar affinity, flag voice dissonance).
- Admin inspect & reset preference controls.

### Phase 7: Publishing & Auto-Post Orchestrator
- Manual Approval Pipeline (default): Strict review -> Approve -> Schedule -> Publish.
- Auto-Post Mode: Explicit opt-in with strict hard safety gates:
  - 14-day probation period enforcement.
  - Required PASS safety rating.
  - High business relevance (>= 75) & brand fit (>= 75).
  - Only verified product facts.
  - Configurable daily post limits and allowed time windows.
  - Excluded sensitive topics.
- Publishing executor with idempotent job IDs, bounded retry policy, and emergency pause controls.

### Phase 8: Analytics, Observability & Production Hardening
- Platform metric ingestion (reach, impressions, likes, shares, comments) with honest "simulated" vs "verified API" status.
- Content performance breakdown by pillar, product, and format.
- Audit logging for all tenant actions (approvals, edits, deletions, preference resets).
- Unit and integration tests (Vitest) validating multi-tenancy, scoring algorithm, safety filters, and deletion feedback.

---

## 4. Key Risks & Mitigations
| Risk | Severity | Mitigation Strategy |
|---|---|---|
| Platform API restrictions on public trend feeds | High | Modular connector interface; clear user disclosure; support for third-party licensed listening feeds and manual trend ingestion; never fake API feeds. |
| AI hallucination of product features or prices | High | Enforce strict Grounding Prompt architecture; business facts strictly pulled from `KnowledgeFact` with `VERIFIED` status; pre-flight fact check. |
| Over-frequent calendar churn from daily trend updates | Medium | Configurable score improvement threshold (e.g. +20% score diff required), 48h cooldown on recently touched slots; unapproved posts only. |
| Sensitive topic exploitation (e.g. tragic news) | High | Keyword & semantic safety gate; mandatory `BLOCKED` status for tragedy/politics/conflict; zero auto-post eligibility for sensitive topics. |
