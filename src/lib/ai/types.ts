import {
  ConceptType,
  PlatformType,
  Product,
  ProductUSP,
  AudiencePersona,
  BrandVoiceProfile,
  ContentPillar,
  TrendSignal,
  SafetyStatus,
} from "../types";

export interface GenerateConceptsInput {
  trend: TrendSignal;
  product?: Product;
  usps?: ProductUSP[];
  persona?: AudiencePersona;
  brandVoice?: BrandVoiceProfile;
  pillars?: ContentPillar[];
  conceptTypes?: ConceptType[];
  language?: string;
}

export interface GeneratedConcept {
  conceptType: ConceptType;
  title: string;
  objective: string;
  targetAudience: string;
  trendSourceAndRationale: string;
  relevantProductAndUSP: string;
  openingHook: string;
  masterCaption: string;
  masterCta: string;
  suggestedFormat: string;
  visualBrief: string;
  safetyNotes: string;
  confidenceScore: number;
}

export interface AdaptCopyInput {
  concept: GeneratedConcept;
  platform: PlatformType;
  brandVoice?: BrandVoiceProfile;
  language?: string;
}

export interface PlatformCopyResult {
  platform: PlatformType;
  hook: string;
  caption: string;
  callToAction: string;
  hashtags: string[];
  aspectRatio: string;
  characterCount: number;
  platformSpecificNotes: string;
}

export interface VisualGenerationInput {
  visualBrief: string;
  productName?: string;
  brandColors?: string[];
  aspectRatio?: string;
}

export interface VisualGenerationResult {
  url: string;
  prompt: string;
  provider: string;
  aspectRatio: string;
}

export interface SafetyCheckResult {
  outcome: SafetyStatus;
  riskScore: number; // 0 (safest) to 100 (hazardous)
  reasons: string[];
  flaggedKeywords: string[];
  suggestedMitigation?: string;
}

export interface AIProvider {
  name: string;
  generatePostConcepts(input: GenerateConceptsInput): Promise<GeneratedConcept[]>;
  adaptPlatformCopy(input: AdaptCopyInput): Promise<PlatformCopyResult>;
  evaluateContentSafety(text: string, restrictedTopics?: string[]): Promise<SafetyCheckResult>;
  generateVisualAsset(input: VisualGenerationInput): Promise<VisualGenerationResult>;
}
