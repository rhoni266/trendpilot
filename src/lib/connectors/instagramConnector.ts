import { PlatformConnector, PublishResult, PlatformMetrics } from "./types";
import { PlatformCapability, TrendSignal, ContentPost, ContentVariant, SocialAccount } from "../types";

export class InstagramConnector implements PlatformConnector {
  platform = "INSTAGRAM" as const;

  getCapabilities(): PlatformCapability {
    return {
      id: "cap_ig",
      platform: "INSTAGRAM",
      supportsTrends: true,
      supportsPublishing: true,
      supportsScheduledPublishing: true,
      supportsAnalytics: true,
      tier: "OFFICIAL_GRAPH_API",
    };
  }

  async fetchRollingTrends(timezone: string, lookbackHours = 168): Promise<Partial<TrendSignal>[]> {
    const now = new Date();
    const d1 = new Date(now.getTime() - 24 * 60 * 60 * 1000).toISOString();
    const d4 = new Date(now.getTime() - 96 * 60 * 60 * 1000).toISOString();

    return [
      {
        platform: "INSTAGRAM",
        title: "#SapotLokal Single-Origin Coffee Origin Stories",
        summary: "Surge in Malaysian third-wave coffee drinkers engaging with farm harvesting reels and transparent origin stories.",
        category: "EMERGING_TOPIC",
        firstObservedAt: d4,
        lastObservedAt: d1,
        sourceUrl: "https://instagram.com/explore/tags/sapotlokalcoffee",
        engagementMetrics: { views: 840000, likes: 62000, shares: 14200, growthRate: "+64% vs last week", velocityScore: 89 },
        isExcluded: false,
        safetyStatus: "PASS",
      },
    ];
  }

  validatePost(post: ContentPost, variant: ContentVariant): { valid: boolean; errors: string[] } {
    const errors: string[] = [];
    if (variant.characterCount > 2200) {
      errors.push("Instagram caption exceeds 2,200 character limit.");
    }
    if (variant.hashtags.length > 30) {
      errors.push("Instagram allows a maximum of 30 hashtags.");
    }
    return { valid: errors.length === 0, errors };
  }

  async publishPost(account: SocialAccount, post: ContentPost, variant: ContentVariant): Promise<PublishResult> {
    const now = new Date().toISOString();
    return {
      success: true,
      externalPostId: `ig_media_${Date.now()}`,
      publishedUrl: `https://instagram.com/p/DB94827103/`,
      publishedAt: now,
    };
  }

  async fetchPostMetrics(account: SocialAccount, externalPostId: string): Promise<PlatformMetrics> {
    return {
      views: 12400,
      reach: 9800,
      likes: 1840,
      shares: 290,
      comments: 64,
      saves: 512,
      lastUpdated: new Date().toISOString(),
    };
  }
}
