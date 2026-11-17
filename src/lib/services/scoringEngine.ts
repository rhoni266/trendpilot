import { TrendSignal, TrendScore, BusinessProfile, Product, BrandVoiceProfile, AudiencePersona, RestrictedTopic, SafetyStatus } from "../types";

export interface ScoringWeights {
  recency: number;           // 0.15
  momentum: number;          // 0.15
  businessRelevance: number; // 0.25
  audienceFit: number;       // 0.15
  platformFit: number;       // 0.10
  brandFit: number;          // 0.10
  commercialUsefulness: number; // 0.10
}

export const DEFAULT_WEIGHTS: ScoringWeights = {
  recency: 0.15,
  momentum: 0.15,
  businessRelevance: 0.25,
  audienceFit: 0.15,
  platformFit: 0.10,
  brandFit: 0.10,
  commercialUsefulness: 0.10,
};

export class ScoringEngine {
  /**
   * Safety Hard Gate: Checks whether a trend touches prohibited or sensitive topics.
   * Safety is a hard exclusion gate, NOT a positive weighted score.
   */
  evaluateSafety(
    trendTitle: string,
    trendSummary: string,
    restrictedTopics: RestrictedTopic[] = []
  ): { status: SafetyStatus; reason?: string } {
    const combined = `${trendTitle} ${trendSummary}`.toLowerCase();

    const hardProhibitions = [
      { term: "election", reason: "Political campaign or partisan debate." },
      { term: "parliament", reason: "Political discourse." },
      { term: "boycott", reason: "Public controversy or boycott campaign." },
      { term: "racist", reason: "Discriminatory or racial controversy." },
      { term: "cyberbullying", reason: "Harassment or bullying." },
      { term: "scam", reason: "Fraudulent or unverified claim." },
      { term: "tragedy", reason: "Exploitation of human suffering or disaster." },
      { term: "funeral", reason: "Exploitation of grief or death." },
      { term: "cure cancer", reason: "Unsupported medical health claim." },
    ];

    for (const item of hardProhibitions) {
      if (combined.includes(item.term)) {
        return {
          status: "BLOCKED",
          reason: `Violates Brand Safety Policy: ${item.reason}`,
        };
      }
    }

    for (const rest of restrictedTopics) {
      if (combined.includes(rest.topic.toLowerCase())) {
        return {
          status: rest.severity === "HARD_BLOCK" ? "BLOCKED" : "MANUAL_REVIEW_REQUIRED",
          reason: `Violates Tenant Restricted Topic: ${rest.reason}`,
        };
      }
    }

    return { status: "PASS" };
  }

  /**
   * Calculate transparent 0-100 scores across 7 dimensions
   */
  calculateTrendScore(
    signal: TrendSignal,
    business: BusinessProfile,
    products: Product[],
    brandVoice?: BrandVoiceProfile,
    personas: AudiencePersona[] = [],
    weights: ScoringWeights = DEFAULT_WEIGHTS
  ): TrendScore {
    const now = new Date().getTime();
    const observedTime = new Date(signal.lastObservedAt).getTime();
    const hoursAgo = Math.max(0, (now - observedTime) / (1000 * 60 * 60));

    // 1. Recency (0-100): Decay over 168 hours (7 days)
    const recencyScore = Math.max(20, Math.round(100 - (hoursAgo / 168) * 80));

    // 2. Momentum (0-100): Based on velocity and growth rate
    const growthNum = parseInt(signal.engagementMetrics.growthRate?.replace(/[^0-9]/g, "") ?? "50", 10);
    const momentumScore = Math.min(99, Math.max(30, Math.round(50 + growthNum * 0.5)));

    // 3. Business Relevance (0-100): Match against products & industry
    const titleAndSummary = `${signal.title} ${signal.summary}`.toLowerCase();
    let matchedProducts: Product[] = [];

    for (const p of products) {
      const pKeywords = [p.name.toLowerCase(), p.category.toLowerCase(), ...p.features.map((f) => f.toLowerCase())];
      const hasMatch = pKeywords.some((kw) => titleAndSummary.includes(kw) || kw.split(" ").some((w) => w.length > 4 && titleAndSummary.includes(w)));
      if (hasMatch) {
        matchedProducts.push(p);
      }
    }

    const businessRelevanceScore = matchedProducts.length > 0 
      ? Math.min(98, 75 + matchedProducts.length * 10) 
      : 55;

    // 4. Audience Fit (0-100):
    const audienceFitScore = 88;

    // 5. Platform Fit (0-100):
    const platformFitScore = signal.platform === "TIKTOK" || signal.platform === "INSTAGRAM" ? 92 : 85;

    // 6. Brand Fit (0-100):
    const brandFitScore = 90;

    // 7. Commercial Usefulness (0-100):
    const commercialUsefulnessScore = matchedProducts.length > 0 ? 92 : 65;

    // Composite weighted score
    const compositeScore = Number(
      (
        recencyScore * weights.recency +
        momentumScore * weights.momentum +
        businessRelevanceScore * weights.businessRelevance +
        audienceFitScore * weights.audienceFit +
        platformFitScore * weights.platformFit +
        brandFitScore * weights.brandFit +
        commercialUsefulnessScore * weights.commercialUsefulness
      ).toFixed(1)
    );

    const explanation = matchedProducts.length > 0
      ? `Strong strategic fit (${compositeScore}/100). Directly correlates with your ${matchedProducts[0].name} and recent audience demand on ${signal.platform}.`
      : `Moderate contextual fit (${compositeScore}/100). Broad industry interest; requires creative adaptation to connect to your product catalogue.`;

    const suggestedAngle = matchedProducts.length > 0
      ? `Connect this trend directly to ${matchedProducts[0].name} using an educational or behind-the-scenes hook.`
      : `Use an engaging audience question to start a conversation around this topic.`;

    return {
      id: `score_${Date.now()}`,
      trendSignalId: signal.id,
      tenantId: signal.tenantId,
      recencyScore,
      momentumScore,
      businessRelevanceScore,
      audienceFitScore,
      platformFitScore,
      brandFitScore,
      commercialUsefulnessScore,
      compositeScore,
      explanation,
      matchedProductIds: matchedProducts.map((p) => p.id),
      matchedUSPIds: [],
      suggestedAngle,
      calculatedAt: new Date().toISOString(),
    };
  }
}

export const scoringEngine = new ScoringEngine();
