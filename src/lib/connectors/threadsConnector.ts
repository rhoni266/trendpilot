import { PlatformConnector, PublishResult, PlatformMetrics } from "./types";
import { PlatformCapability, TrendSignal, ContentPost, ContentVariant, SocialAccount } from "../types";

export class ThreadsConnector implements PlatformConnector {
  platform = "THREADS" as const;

  getCapabilities(): PlatformCapability {
    return {
      id: "cap_th",
      platform: "THREADS",
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
    const d2 = new Date(now.getTime() - 48 * 60 * 60 * 1000).toISOString();

    return [
      {
        platform: "THREADS",
        title: "Debunking 'Dark Roast Has More Caffeine' Myth",
        summary: "Viral discussion on caffeine extraction misconceptions and bean densities.",
        category: "AUDIENCE_QUESTION",
        firstObservedAt: d2,
        lastObservedAt: d1,
        sourceUrl: "https://threads.net/trending/topic/coffee-myths",
        engagementMetrics: { views: 420000, likes: 29000, shares: 8100, growthRate: "+41%", velocityScore: 82 },
        isExcluded: false,
        safetyStatus: "PASS",
      },
    ];
  }

  validatePost(post: ContentPost, variant: ContentVariant): { valid: boolean; errors: string[] } {
    const errors: string[] = [];
    if (variant.characterCount > 500) {
      errors.push("Threads post exceeds 500 character limit.");
    }
    return { valid: errors.length === 0, errors };
  }

  async publishPost(account: SocialAccount, post: ContentPost, variant: ContentVariant): Promise<PublishResult> {
    const now = new Date().toISOString();
    return {
      success: true,
      externalPostId: `th_thread_${Date.now()}`,
      publishedUrl: `https://threads.net/@${account.accountName}/post/348910239`,
      publishedAt: now,
    };
  }

  async fetchPostMetrics(account: SocialAccount, externalPostId: string): Promise<PlatformMetrics> {
    return {
      views: 8900,
      reach: 6700,
      likes: 820,
      shares: 140,
      comments: 72,
      saves: 110,
      lastUpdated: new Date().toISOString(),
    };
  }
}
