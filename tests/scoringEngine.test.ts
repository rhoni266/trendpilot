import { describe, it, expect } from "vitest";
import { scoringEngine } from "../src/lib/services/scoringEngine";
import { TrendSignal, BusinessProfile, Product } from "../src/lib/types";

describe("ScoringEngine & Safety Hard Gate", () => {
  it("should hard BLOCK prohibited political, controversial, or tragic topics", () => {
    const politicalResult = scoringEngine.evaluateSafety(
      "Upcoming Election Boycott Rallies",
      "Public controversy around election campaigns and boycott lists"
    );
    expect(politicalResult.status).toBe("BLOCKED");
    expect(politicalResult.reason).toContain("Violates Brand Safety Policy");

    const medicalResult = scoringEngine.evaluateSafety(
      "Coffee Can Cure Cancer Study",
      "Unverified health miracle claims circulating on forums"
    );
    expect(medicalResult.status).toBe("BLOCKED");

    const safeResult = scoringEngine.evaluateSafety(
      "18-Hour Cold Brew Pour Over Hacks",
      "Creators sharing refreshing coffee brewing techniques for hot weather"
    );
    expect(safeResult.status).toBe("PASS");
  });

  it("should calculate explainable 0-100 scores across all dimensions", () => {
    const now = new Date().toISOString();
    const mockSignal: TrendSignal = {
      id: "trend_mock_01",
      tenantId: "tenant_kopicraft_01",
      platform: "INSTAGRAM",
      title: "Malaysian Specialty Liberica Cold Brew Recipes",
      summary: "Trending interest in single-origin cold brew recipes.",
      category: "POPULAR_FORMAT",
      firstObservedAt: now,
      lastObservedAt: now,
      engagementMetrics: { views: 500000, likes: 35000, growthRate: "+60%", velocityScore: 88 },
      isExcluded: false,
      safetyStatus: "PASS",
      createdAt: now,
    };

    const mockBusiness: BusinessProfile = {
      id: "b1",
      tenantId: "tenant_kopicraft_01",
      industry: "Coffee Roastery",
      location: "Bangsar, KL",
      summary: "Specialty coffee roastery in KL",
      createdAt: now,
      updatedAt: now,
    };

    const mockProduct: Product = {
      id: "p1",
      tenantId: "tenant_kopicraft_01",
      name: "Johor Liberica Coffee",
      category: "Single Origin",
      description: "Rare Liberica beans",
      features: ["Johor origin", "Cold brew friendly"],
      benefits: ["Smooth taste"],
      differentiators: ["Direct trade"],
      isActive: true,
      createdAt: now,
    };

    const score = scoringEngine.calculateTrendScore(mockSignal, mockBusiness, [mockProduct]);

    expect(score.recencyScore).toBeGreaterThanOrEqual(90);
    expect(score.momentumScore).toBeGreaterThan(60);
    expect(score.businessRelevanceScore).toBeGreaterThanOrEqual(80);
    expect(score.compositeScore).toBeGreaterThan(70);
    expect(score.explanation).toContain("Strong strategic fit");
    expect(score.matchedProductIds).toContain("p1");
  });
});
