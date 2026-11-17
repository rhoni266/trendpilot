import { PlatformConnector, PublishResult, PlatformMetrics } from "./types";
import { PlatformCapability, TrendSignal, ContentPost, ContentVariant, SocialAccount } from "../types";

export class TikTokConnector implements PlatformConnector {
  platform = "TIKTOK" as const;

  getCapabilities(): PlatformCapability {
    return {
      id: "cap_tt",
      platform: "TIKTOK",
      supportsTrends: true,
      supportsPublishing: true,
      supportsScheduledPublishing: true,
      supportsAnalytics: true,
      tier: "MOCK_DEMO", // Honest capability declaration
    };
  }

  async fetchRollingTrends(timezone: string, lookbackHours = 168): Promise<Partial<TrendSignal>[]> {
    const now = new Date();
    const d1 = new Date(now.getTime() - 24 * 60 * 60 * 1000).toISOString();
    const d3 = new Date(now.getTime() - 72 * 60 * 60 * 1000).toISOString();

    return [
      {
        platform: "TIKTOK",
        title: "Cold Brew Calamansi Mocktail Hacks",
        summary: "Trending Malaysian DIY beverage creators pairing chilled cold brew with sparkling soda and local calamansi.",
        category: "POPULAR_FORMAT",
        firstObservedAt: d3,
        lastObservedAt: d1,
        sourceUrl: "https://tiktok.com/tag/coldbrewmocktail",
        engagementMetrics: { views: 1250000, likes: 110000, shares: 38000, growthRate: "+82%", velocityScore: 95 },
        isExcluded: false,
        safetyStatus: "PASS",
      },
      {
        platform: "TIKTOK",
        title: "Behind-The-Roaster ASMR Bean Drop",
        summary: "High engagement audio format showcasing the hypnotic sound of roasted beans cooling in commercial drums.",
        category: "POPULAR_FORMAT",
        firstObservedAt: d3,
        lastObservedAt: d1,
        sourceUrl: "https://tiktok.com/tag/coffeeasmr",
        engagementMetrics: { views: 890000, likes: 74000, shares: 12000, growthRate: "+45%", velocityScore: 84 },
        isExcluded: false,
        safetyStatus: "PASS",
      },
    ];
  }

  validatePost(post: ContentPost, variant: ContentVariant): { valid: boolean; errors: string[] } {
    const errors: string[] = [];
    if (variant.characterCount > 2200) {
      errors.push("TikTok caption exceeds 2,200 character limit.");
    }
    if (variant.aspectRatio !== "9:16") {
      errors.push("TikTok requires 9:16 vertical video format.");
    }
    return { valid: errors.length === 0, errors };
  }

  async publishPost(account: SocialAccount, post: ContentPost, variant: ContentVariant): Promise<PublishResult> {
    const now = new Date().toISOString();
    return {
      success: true,
      externalPostId: `tt_post_${Date.now()}`,
      publishedUrl: `https://tiktok.com/@${account.accountName}/video/748291039`,
      publishedAt: now,
    };
  }

  async fetchPostMetrics(account: SocialAccount, externalPostId: string): Promise<PlatformMetrics> {
    return {
      views: 18400,
      reach: 14200,
      likes: 2150,
      shares: 412,
      comments: 98,
      saves: 680,
      lastUpdated: new Date().toISOString(),
    };
  }
}
