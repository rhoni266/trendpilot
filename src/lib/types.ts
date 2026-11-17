export type Role = "SUPER_ADMIN" | "BUSINESS_ADMIN" | "MARKETING_MANAGER" | "VIEWER";
export type TenantPlan = "FREE_TRIAL" | "GROWTH" | "ENTERPRISE";
export type TenantStatus = "ACTIVE" | "SUSPENDED" | "CANCELLED";

export type VerificationStatus = "VERIFIED" | "UNVERIFIED_NEEDS_PROOF" | "EXPIRED";
export type PlatformType = "TIKTOK" | "THREADS" | "INSTAGRAM" | "FACEBOOK";

export type TrendCategory = 
  | "EMERGING_TOPIC" 
  | "POPULAR_FORMAT" 
  | "HASHTAG_KEYWORD" 
  | "SEASONAL_MOMENT" 
  | "AUDIENCE_QUESTION" 
  | "INDUSTRY_NEWS";

export type SafetyStatus = "PASS" | "MANUAL_REVIEW_REQUIRED" | "BLOCKED";

export type ConceptType = 
  | "EDUCATIONAL" 
  | "PROBLEM_SOLUTION" 
  | "MYTH_VS_FACT" 
  | "FAQ_OBJECTION" 
  | "BEHIND_SCENES" 
  | "STORYTELLING" 
  | "SHORT_VIDEO_SCRIPT" 
  | "PROMOTIONAL";

export type LifecycleStatus = 
  | "IDEA" 
  | "FORECAST" 
  | "DRAFT" 
  | "NEEDS_REVIEW" 
  | "APPROVED" 
  | "SCHEDULED" 
  | "PUBLISHING" 
  | "PUBLISHED" 
  | "FAILED" 
  | "ON_HOLD" 
  | "REPLACEMENT_PROPOSED" 
  | "DELETED";

export type DeletionReasonCategory = 
  | "NOT_RELEVANT"
  | "TREND_OUTDATED"
  | "WRONG_AUDIENCE"
  | "VOICE_MISMATCH"
  | "WEAK_COPY"
  | "UNSUITABLE_VISUAL"
  | "INACCURATE_FACTS"
  | "TOO_PROMOTIONAL"
  | "SENSITIVE_TOPIC"
  | "OFFER_CHANGED"
  | "OTHER";

export interface Tenant {
  id: string;
  name: string;
  slug: string;
  plan: TenantPlan;
  status: TenantStatus;
  timezone: string;
  defaultLanguage: string;
  autoPostEnabled: boolean;
  probationEndsAt: string;
  maxDailyPosts: number;
  allowedPostDays: string[];
  allowedTimeWindows: { start: string; end: string }[];
  createdAt: string;
  updatedAt: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  avatarUrl?: string;
  createdAt: string;
}

export interface Membership {
  id: string;
  tenantId: string;
  userId: string;
  role: Role;
  createdAt: string;
}

export interface AuditLog {
  id: string;
  tenantId: string;
  userId?: string;
  action: string;
  entityType: string;
  entityId: string;
  details: Record<string, unknown>;
  ipAddress?: string;
  createdAt: string;
}

export interface BusinessProfile {
  id: string;
  tenantId: string;
  industry: string;
  location: string;
  website?: string;
  contactEmail?: string;
  phone?: string;
  summary: string;
  createdAt: string;
  updatedAt: string;
}

export interface ProductUSP {
  id: string;
  productId: string;
  title: string;
  description: string;
  proofPoint: string;
  isVerified: boolean;
  createdAt: string;
}

export interface Product {
  id: string;
  tenantId: string;
  name: string;
  category: string;
  description: string;
  price?: string;
  features: string[];
  benefits: string[];
  differentiators: string[];
  isActive: boolean;
  usps?: ProductUSP[];
  createdAt: string;
}

export interface AudiencePersona {
  id: string;
  tenantId: string;
  name: string;
  ageRange?: string;
  painPoints: string[];
  motivations: string[];
  preferredPlatforms: PlatformType[];
  preferredLanguages: string[];
  createdAt: string;
}

export interface BrandVoiceProfile {
  id: string;
  tenantId: string;
  tone: string;
  personalityTraits: string[];
  wordsToUse: string[];
  wordsToAvoid: string[];
  mixedLanguageAllowed: boolean;
  createdAt: string;
}

export interface BrandAsset {
  id: string;
  tenantId: string;
  name: string;
  type: "LOGO" | "COLOR_PALETTE" | "TYPOGRAPHY" | "PRODUCT_IMAGE" | "TEMPLATE";
  url: string;
  meta?: Record<string, unknown>;
  createdAt: string;
}

export interface KnowledgeDocument {
  id: string;
  tenantId: string;
  title: string;
  fileType: string;
  rawContent: string;
  sourceUrl?: string;
  processingStatus: "PENDING" | "PROCESSED" | "FAILED";
  createdAt: string;
}

export interface KnowledgeFact {
  id: string;
  documentId?: string;
  tenantId: string;
  claim: string;
  category: string;
  verificationStatus: VerificationStatus;
  verifiedByUserId?: string;
  verifiedAt?: string;
  expiresAt?: string;
  createdAt: string;
}

export interface ApprovedClaim {
  id: string;
  tenantId: string;
  claim: string;
  evidence: string;
  allowedPillars: string[];
  createdAt: string;
}

export interface RestrictedTopic {
  id: string;
  tenantId: string;
  topic: string;
  reason: string;
  severity: "HARD_BLOCK" | "REQUIRE_MANUAL_REVIEW";
  createdAt: string;
}

export interface SocialAccount {
  id: string;
  tenantId: string;
  platform: PlatformType;
  accountName: string;
  externalAccountId: string;
  autoPostEnabled: boolean;
  status: "CONNECTED" | "EXPIRED" | "DISCONNECTED" | "PAUSED";
  createdAt: string;
}

export interface PlatformCapability {
  id: string;
  platform: PlatformType;
  supportsTrends: boolean;
  supportsPublishing: boolean;
  supportsScheduledPublishing: boolean;
  supportsAnalytics: boolean;
  tier: "OFFICIAL_GRAPH_API" | "RESEARCH_API" | "MOCK_DEMO";
}

export interface TrendSignal {
  id: string;
  tenantId: string;
  sourceId?: string;
  platform: PlatformType | "CROSS_PLATFORM";
  externalTrendId?: string;
  title: string;
  summary: string;
  category: TrendCategory;
  firstObservedAt: string;
  lastObservedAt: string;
  sourceUrl?: string;
  engagementMetrics: {
    views?: number;
    likes?: number;
    shares?: number;
    growthRate?: string;
    velocityScore?: number;
  };
  isExcluded: boolean;
  exclusionReason?: string;
  safetyStatus: SafetyStatus;
  safetyNotes?: string;
  scores?: TrendScore;
  createdAt: string;
}

export interface TrendScore {
  id: string;
  trendSignalId: string;
  tenantId: string;
  recencyScore: number;
  momentumScore: number;
  businessRelevanceScore: number;
  audienceFitScore: number;
  platformFitScore: number;
  brandFitScore: number;
  commercialUsefulnessScore: number;
  compositeScore: number;
  explanation: string;
  matchedProductIds: string[];
  matchedUSPIds: string[];
  suggestedAngle: string;
  calculatedAt: string;
}

export interface ContentPillar {
  id: string;
  tenantId: string;
  name: string;
  targetPercentage: number;
  description: string;
}

export interface ContentIdea {
  id: string;
  tenantId: string;
  trendSignalId?: string;
  pillarId?: string;
  conceptType: ConceptType;
  title: string;
  objective: string;
  targetAudience: string;
  openingHook: string;
  status: "DRAFT" | "ACCEPTED" | "REJECTED";
  createdAt: string;
}

export interface ContentVariant {
  id: string;
  postId: string;
  platform: PlatformType;
  caption: string;
  hook: string;
  callToAction: string;
  hashtags: string[];
  aspectRatio: string;
  characterCount: number;
  platformSpecificNotes?: string;
}

export interface MediaAsset {
  id: string;
  tenantId: string;
  postId?: string;
  url: string;
  prompt?: string;
  provider: string;
  aspectRatio: string;
  version: number;
  createdAt: string;
}

export interface ContentVersion {
  id: string;
  postId: string;
  versionNumber: number;
  captionSnapshot: string;
  hookSnapshot: string;
  changedByUserId?: string;
  changeReason?: string;
  createdAt: string;
}

export interface ContentPost {
  id: string;
  tenantId: string;
  ideaId?: string;
  trendSignalId?: string;
  productId?: string;
  pillarId?: string;
  title: string;
  masterHook: string;
  masterCaption: string;
  masterCta: string;
  visualBrief: string;
  safetyOutcome: "PASS" | "MANUAL_REVIEW" | "BLOCKED";
  safetyNotes?: string;
  lifecycleStatus: LifecycleStatus;
  scheduledFor?: string;
  publishedAt?: string;
  isDeleted: boolean;
  deletedAt?: string;
  variants: ContentVariant[];
  mediaAssets: MediaAsset[];
  versions?: ContentVersion[];
  createdAt: string;
  updatedAt: string;
  // Joined relation fields for convenience
  trendSignal?: TrendSignal;
  product?: Product;
  pillar?: ContentPillar;
}

export interface CalendarSlot {
  id: string;
  tenantId: string;
  postId?: string;
  targetDate: string; // YYYY-MM-DD
  slotTime: string;   // HH:mm
  platform: PlatformType;
  isForecast: boolean;
  hasReplacementProposal: boolean;
  proposedReplacementPostId?: string;
  proposedReplacementPost?: ContentPost;
  replacementReason?: string;
  post?: ContentPost;
}

export interface Approval {
  id: string;
  postId: string;
  userId: string;
  approvalType: "MANUAL_ADMIN" | "SYSTEM_AUTOPOST";
  notes?: string;
  decidedAt: string;
}

export interface DeletionFeedback {
  id: string;
  tenantId: string;
  postId: string;
  reasonCategory: DeletionReasonCategory;
  reasonDetails?: string;
  improvementText?: string;
  rejectedPillarId?: string;
  rejectedFormat?: string;
  userId: string;
  createdAt: string;
}

export interface LearningPreference {
  id: string;
  tenantId: string;
  preferenceKey: string;
  weight: number; // 0.0 to 2.0
  confidence: number; // 0.0 to 1.0
  sampleCount: number;
  lastAdjustedAt: string;
  isUserOverridden: boolean;
}

export interface PublishingJob {
  id: string;
  tenantId: string;
  postId: string;
  socialAccountId: string;
  idempotencyKey: string;
  scheduledPublishAt: string;
  status: "PENDING" | "PROCESSING" | "PUBLISHED" | "FAILED" | "CANCELLED";
  retryCount: number;
  maxRetries: number;
  lastError?: string;
  createdAt: string;
}

export interface PostMetricSnapshot {
  id: string;
  postId: string;
  snapshotDate: string;
  impressions: number;
  reach: number;
  likes: number;
  shares: number;
  comments: number;
  saves: number;
  isSimulated: boolean;
}

export interface NotificationItem {
  id: string;
  tenantId: string;
  userId?: string;
  title: string;
  message: string;
  type: "HIGH_RELEVANCE_TREND" | "POST_AWAITING_REVIEW" | "REPLACEMENT_PROPOSAL" | "PUBLISHING_SUCCESS" | "PUBLISHING_FAILED" | "SAFETY_ALERT";
  isRead: boolean;
  actionUrl?: string;
  createdAt: string;
}
