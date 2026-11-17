# INTEGRATIONS & API COMPLIANCE REGISTRY: TrendPilot

This registry documents the integration realities, official platform capabilities, API boundaries, and authentication requirements for TrendPilot.

---

## 1. Social Platform Capabilities & Honest Limitations

In accordance with Product Principles (**Platform-compliant & Transparent**), TrendPilot never fabricates API capabilities, scrapes private user data, or bypasses authentication barriers.

| Platform | Official API Tier | Trend Discovery Capability | Content Publishing Capability | Analytics Ingestion | Local / Dev Mode |
|---|---|---|---|---|---|
| **TikTok** | TikTok for Developers & Commercial Content API | Requires commercial partnership or Research API access. General open public firehose is not offered to unvetted apps. | Supported via TikTok Content Posting API (Direct Post & Video Share). | Supported for owned business accounts via Business API. | Fully functional Mock Connector with verifiable public trend templates. |
| **Threads** | Threads API (Meta Graph API) | Keyword search and topic insights available via official Threads endpoints for approved partner apps. | Full text, single image, and carousel publishing supported via Threads Graph API. | Media insights (views, likes, replies, reposts, quotes). | Fully functional Mock Connector for local simulated publishing. |
| **Instagram** | Instagram Graph API | Hashtag search available (rate-limited, public posts only, top 30 hashtags/7-day period). No universal trend feed. | Supported for Instagram Business & Creator accounts via Content Publishing API. | Supported (impressions, reach, engagement, saved). | Fully functional Mock Connector with authentic visual generation previews. |
| **Facebook** | Meta Graph API | Public Page Feed search restricted. Compliant via licensed listening or admin-imported topics. | Supported for Facebook Pages via Pages API. | Supported (post impressions, reactions, shares, comments). | Fully functional Mock Connector with Page simulation. |

### Compliant Alternatives for Trend Intelligence
Where direct platform APIs do not provide a universal 7-day public trending feed, TrendPilot supports:
1. **Licensed Social-Listening Connectors** (e.g. Brandwatch, Meltwater, Talkwalker API bridges).
2. **Admin-Imported Trend Signals**: Business admins can import verified public article URLs, TikTok creative center links, or industry reports.
3. **Simulated Development Mode**: Realistic, date-stamped 7-day trend intelligence clearly labeled as `[DEMO SIMULATOR]` for local development, testing, and team review.

---

## 2. AI Provider Orchestration

TrendPilot abstracts AI capabilities across two distinct engines:

### 2.1 Google Gemini Provider (`GeminiProvider`)
- **Text & Reasoning**: Google Gemini 2.0 Flash / Gemini 1.5 Pro via Google AI SDK.
  - Generates 8 distinct marketing concept types (educational, problem-solution, myth-vs-fact, behind-the-scenes, etc.).
  - Adapts platform-specific copy (character limits, hook styles, CTA tone, hashtag strategy).
  - Extracts verified facts from user-uploaded PDFs, DOCX, and texts.
- **Visual Asset Generation**: Imagen 3 via Gemini API for high-resolution, brand-safe marketing graphics following exact visual briefs.
- **Safety Moderation**: Automated classification against hate, harassment, political campaigning, tragedy exploitation, and unsupported claims.

### 2.2 Local / Offline Mock AI Provider (`MockAIProvider`)
- **Zero-Dependency Development**: Fully deterministic local AI engine delivering realistic Malaysian and Southeast Asian marketing copy in English and Bahasa Malaysia.
- Generates SVG/Canvas-based high-contrast visual previews matching brand colours and typography.
- Simulates multi-stage safety scoring (PASS, MANUAL_REVIEW, BLOCKED).

---

## 3. Environment Variable Specifications (`.env.example`)

TrendPilot follows strict security best practices. Secrets are loaded via `.env.local` and never committed to source control.

```bash
# Application Environment
NODE_ENV=development
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_APP_NAME="TrendPilot"

# Database Connection (Prisma)
# Local SQLite default:
DATABASE_URL="file:./dev.db"
# Production PostgreSQL (Supabase / Neon / AWS RDS):
# DATABASE_URL="postgresql://user:password@host:5432/trendpilot?schema=public&sslmode=require"

# AI Provider Configuration
# Set to 'gemini' for real API calls, or 'mock' for local zero-cost development
AI_PROVIDER=mock
GEMINI_API_KEY=your_gemini_api_key_here

# Social Connectors Mode: 'mock' for local demo, 'live' for real platform APIs
SOCIAL_CONNECTORS_MODE=mock

# Meta (Instagram, Threads, Facebook) Graph API
META_APP_ID=your_meta_app_id
META_APP_SECRET=your_meta_app_secret
META_WEBHOOK_VERIFY_TOKEN=your_webhook_verify_token

# TikTok for Developers API
TIKTOK_CLIENT_KEY=your_tiktok_client_key
TIKTOK_CLIENT_SECRET=your_tiktok_client_secret

# Encryption Key for Stored Social Tokens (AES-256-GCM 32-byte hex)
TOKEN_ENCRYPTION_SECRET=e1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2

# Default Regional Configuration
DEFAULT_TIMEZONE=Asia/Kuala_Lumpur
DEFAULT_LOCALE=en-MY
```
