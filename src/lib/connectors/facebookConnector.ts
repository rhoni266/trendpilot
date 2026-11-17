import { PlatformConnector, PublishResult, PlatformMetrics } from "./types";
import { PlatformCapability, TrendSignal, ContentPost, ContentVariant, SocialAccount } from "../types";

export class FacebookConnector implements PlatformConnector {
  platform = "FACEBOOK" as const;

  getCapabilities(): PlatformCapability {
    return {
      id: "cap_fb",
      platform: "FACEBOOK",
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
    const d3 = new Date(now.getTime() - 72 * 60 * 60 * 1000).toISOString();

    return [
      {
        platform: "FACEBOOK",
        title: "Malaysian Artisan Food & Coffee Roasters Community Spotlight",
        summary: "Local business communities sharing sustainable sourcing stories and Klang Valley home delivery recommendations.",
        category: "INDUSTRY_NEWS",
        firstObservedAt: d3,
        lastObservedAt: d1,
        sourceUrl: "https://facebook.com/groups/klcoffeelovers",
        engagementMetrics: { views: 310000, likes: 18400, shares: 3200, growthRate: "+28%", velocityScore: 72 },
        isExcluded: false,
        safetyStatus: "PASS",
      },
    ];
  }

  validatePost(post: ContentPost, variant: ContentVariant): { valid: boolean; errors: string[] } {
    const errors: string[] = [];
    if (variant.characterCount > 63206) {
      errors.push("Facebook post exceeds maximum character limit.");
    }
    return { valid: errors.length === 0, errors };
  }

  async publishPost(account: SocialAccount, post: ContentPost, variant: ContentVariant): Promise<PublishResult> {
    const now = new Date().toISOString();
    return {
      success: true,
      externalPostId: `fb_post_${Date.now()}`,
      publishedUrl: `https://facebook.com/kopicraftmalaysia/posts/102938482`,
      publishedAt: now,
    };
  }

  async fetchPostMetrics(account: SocialAccount, externalPostId: string): Promise<PlatformMetrics> {
    return {
      views: 7400,
      reach: 5900,
      likes: 640,
      shares: 98,
      comments: 34,
      saves: 52,
      lastUpdated: new Date().toISOString(),
    };
  }
}
