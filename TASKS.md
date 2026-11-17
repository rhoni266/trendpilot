# TASKS & EXECUTION CHECKLIST: TrendPilot

## Phase 0: Architecture & Foundation Planning
- [x] Inspect local machine, storage drives, and runtime environment.
- [x] Create project workspace on `D:\dev\trendpilot`.
- [x] Author `IMPLEMENTATION_PLAN.md`.
- [x] Author `ARCHITECTURE.md`.
- [x] Author `DATA_MODEL.md` with complete 35-entity specification.
- [x] Author `INTEGRATIONS.md` with honest capability disclosures.
- [x] Author `TASKS.md` and initialize `PROGRESS.md`.

## Phase 1: SaaS Foundation & Project Scaffold
- [ ] Initialize Next.js 15 App Router + TypeScript + Tailwind CSS structure.
- [ ] Install dependencies: Prisma, Lucide-react, Zod, date-fns, clsx, tailwind-merge.
- [ ] Author Prisma schema (`prisma/schema.prisma`) matching all 35 entities.
- [ ] Run Prisma migration / DB push for local SQLite database.
- [ ] Build multi-tenant context, session provider, and RBAC middleware.
- [ ] Build global layout shell: responsive sidebar, header, dark/light theme, Asia/Kuala_Lumpur timezone indicator, and EN/MS language selector.

## Phase 2: Business Brain (Knowledge Base & Fact Grounding)
- [ ] Business Profile editor (Company name, industry, location, contact, summary).
- [ ] Product and USP manager (features, benefits, proof points, differentiators).
- [ ] Audience Persona creator (pain points, motivations, preferred platforms).
- [ ] Brand Voice profile editor (tones, words to use, words to avoid, mixed-language toggle).
- [ ] Document ingestion pipeline with structured fact extraction.
- [ ] Fact Verification status manager: `VERIFIED`, `UNVERIFIED_NEEDS_PROOF`, `EXPIRED`.
- [ ] Approved claims repository vs restricted/prohibited topics list.

## Phase 3: Trend Radar (Rolling 7-Day Intelligence Engine)
- [ ] Platform connector abstraction (`PlatformConnector`) with declared capabilities.
- [ ] Implement TikTok, Threads, Instagram, and Facebook connectors (Mock/Demo + Live structure).
- [ ] Rolling 7-day filter window calculation (168 hours based on tenant timezone).
- [ ] Normalisation, deduplication, and topic categorization.
- [ ] Multi-factor 0-100 explainable scoring algorithm (Recency, Momentum, Business Relevance, Audience Fit, Platform Fit, Brand Fit, Commercial Usefulness).
- [ ] Safety Hard Gate: Automatic filter for politics, racism, harassment, and tragedy exploitation.
- [ ] Trend Evidence Card component with source links, metrics, and "Generate Ideas" button.
- [ ] Excluded trends drawer showing safety/relevance rejection rationale.

## Phase 4: Content Studio (Multi-Concept Generator & Visuals)
- [ ] AI Provider abstraction (`GeminiProvider` and `MockAIProvider`).
- [ ] Multi-concept ideation engine: Educational, Problem->Solution, Myth vs Fact, FAQ, Behind-the-Scenes, Storytelling, Video Script, Promotional.
- [ ] Platform-specific copy adaptation:
  - TikTok: Hook, concise body, 3-5 trending tags, duration prompt.
  - Threads: Conversational hook, punchy thoughts, engagement question.
  - Instagram: Narrative caption, line breaks, CTA, hashtag bank (10-15 tags), 1:1 or 4:5 visual brief.
  - Facebook: Link-friendly copy, community hook, clear CTA.
- [ ] Visual Studio: Brand asset integration, prompt generator, SVG/Canvas deterministic preview renderer.
- [ ] Pre-generation & post-generation moderation checks (PASS, MANUAL_REVIEW, BLOCKED).
- [ ] Version history, copy regenerator, and save draft / queue for approval actions.

## Phase 5: Rolling 30-Day Calendar & Dynamic Refresh
- [ ] 30-Day calendar view (Month, Week, List formats) with timezone awareness.
- [ ] Visual distinction for `FORECAST` vs `APPROVED` / `SCHEDULED` posts.
- [ ] Drag-and-drop / date picker rescheduling with validation.
- [ ] Rolling 7-Day refresh comparator:
  - Scans new trends against unapproved forecast slots.
  - Flags superior options as `REVIEW_SUGGESTED`.
  - Side-by-side comparison modal: Old draft vs Proposed replacement with score differences.
  - Keep / Replace / Hold actions.

## Phase 6: Deletion Learning Engine
- [ ] Deletion confirmation modal intercepting all delete actions.
- [ ] Required 10-option structured reason selection + optional improvement feedback.
- [ ] Soft-delete implementation (`isDeleted = true`) with audit trail.
- [ ] Preference adaptation engine: adjust tenant `LearningPreference` weights.
- [ ] Business Brain -> Learning Insights UI: inspect learned weights and "Reset to Default" button.

## Phase 7: Publishing & Auto-Post Orchestrator
- [ ] Manual approval workflow: Review -> Approve -> Schedule -> Idempotent Publishing Job.
- [ ] Auto-Post Mode controls with mandatory safety checklist:
  - 14-day probation period validation.
  - Required PASS safety rating.
  - Minimum business relevance (>= 75) & brand fit (>= 75).
  - Verified product facts only.
  - Configurable daily post limits and allowed time windows.
- [ ] Idempotent publishing job executor with bounded retries and failure logging.
- [ ] Emergency Controls: "Pause All Publishing", "Pause Platform", and "Cancel Post".

## Phase 8: Analytics, Observability & Production Verification
- [ ] Analytics dashboard: Reach, impressions, engagement, best hooks/CTAs.
- [ ] Performance breakdown by content pillar and format.
- [ ] Immutable tenant audit logs viewer.
- [ ] Unit & integration test suite (Vitest):
  - Multi-tenant isolation tests.
  - Trend scoring algorithm test.
  - Safety filter gate test.
  - Deletion feedback weight update test.
- [ ] Seed script with rich Malaysian demo business data ("KopiCraft Artisan Roasters").
- [ ] Full production build (`npm run build`) verification and test execution.
- [ ] Author final `README.md` and complete `PROGRESS.md`.
