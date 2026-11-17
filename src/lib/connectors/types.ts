import { PlatformType, PlatformCapability, TrendSignal, ContentPost, ContentVariant, SocialAccount } from "../types";

export interface PublishResult {
  success: boolean;
  externalPostId?: string;
  publishedUrl?: string;
  errorMessage?: string;
  publishedAt: string;
}

export interface PlatformMetrics {
  views: number;
  reach: number;
  likes: number;
  shares: number;
  comments: number;
  saves: number;
  lastUpdated: string;
}

export interface PlatformConnector {
  platform: PlatformType;
  getCapabilities(): PlatformCapability;
  fetchRollingTrends(timezone: string, lookbackHours: number): Promise<Partial<TrendSignal>[]>;
  validatePost(post: ContentPost, variant: ContentVariant): { valid: boolean; errors: string[] };
  publishPost(account: SocialAccount, post: ContentPost, variant: ContentVariant): Promise<PublishResult>;
  fetchPostMetrics(account: SocialAccount, externalPostId: string): Promise<PlatformMetrics>;
}
