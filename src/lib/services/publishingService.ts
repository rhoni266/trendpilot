import { db } from "../db";
import { connectorRegistry } from "../connectors/registry";
import { ContentPost, ContentVariant, PlatformType, SocialAccount } from "../types";

export interface AutoPostEligibilityResult {
  eligible: boolean;
  blockers: string[];
}

export class PublishingService {
  /**
   * Evaluates strict Auto-Post eligibility gates.
   */
  evaluateAutoPostEligibility(post: ContentPost, tenantId = "tenant_kopicraft_01"): AutoPostEligibilityResult {
    const tenant = db.getTenant(tenantId);
    const blockers: string[] = [];

    if (!tenant) {
      return { eligible: false, blockers: ["Tenant record not found."] };
    }

    // 1. Tenant master auto-post toggle
    if (!tenant.autoPostEnabled) {
      blockers.push("Auto-post mode is currently disabled in business settings.");
    }

    // 2. 14-day probation period check
    const now = new Date();
    const probationEnds = new Date(tenant.probationEndsAt);
    if (now < probationEnds) {
      const daysLeft = Math.ceil((probationEnds.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
      blockers.push(`Tenant is currently in the mandatory 14-day learning probation period (${daysLeft} days remaining). All posts require manual review.`);
    }

    // 3. Safety outcome must be strictly PASS
    if (post.safetyOutcome !== "PASS") {
      blockers.push(`Safety status is ${post.safetyOutcome}. Only verified 'PASS' content can be auto-published.`);
    }

    // 4. Trend Score relevance gate
    const compositeScore = post.trendSignal?.scores?.compositeScore ?? 0;
    if (compositeScore < 75) {
      blockers.push(`Composite trend score is ${compositeScore}/100 (Minimum threshold: 75/100).`);
    }

    // 5. Unverified facts check
    const facts = db.getKnowledgeFacts(tenantId);
    const unverified = facts.filter((f) => f.verificationStatus !== "VERIFIED");
    for (const unfact of unverified) {
      if (post.masterCaption.toLowerCase().includes(unfact.claim.toLowerCase().slice(0, 20))) {
        blockers.push(`Post references unverified business fact: "${unfact.claim}". Admin verification required.`);
      }
    }

    return {
      eligible: blockers.length === 0,
      blockers,
    };
  }

  /**
   * Publishes post to specified platform using official platform connector abstraction
   */
  async publishPost(
    postId: string,
    platform: PlatformType,
    tenantId = "tenant_kopicraft_01",
    approvalType: "MANUAL_ADMIN" | "SYSTEM_AUTOPOST" = "MANUAL_ADMIN"
  ): Promise<{ success: boolean; externalPostId?: string; error?: string }> {
    const post = db.getContentPost(postId);
    if (!post) throw new Error("Post not found");

    const variant = post.variants.find((v) => v.platform === platform);
    if (!variant) throw new Error(`No variant configured for platform: ${platform}`);

    const accounts = db.getSocialAccounts(tenantId);
    const account = accounts.find((a) => a.platform === platform && a.status === "CONNECTED");
    if (!account) throw new Error(`No connected active social account for ${platform}`);

    // If auto-post, run strict eligibility gate
    if (approvalType === "SYSTEM_AUTOPOST") {
      const eligibility = this.evaluateAutoPostEligibility(post, tenantId);
      if (!eligibility.eligible) {
        return {
          success: false,
          error: `Auto-post blocked: ${eligibility.blockers.join("; ")}`,
        };
      }
    }

    const connector = connectorRegistry.getConnector(platform);

    // Validate platform-specific character limits and assets
    const validation = connector.validatePost(post, variant);
    if (!validation.valid) {
      return { success: false, error: validation.errors.join("; ") };
    }

    // Publish
    const result = await connector.publishPost(account, post, variant);

    if (result.success) {
      // Update post status to PUBLISHED
      db.updateContentPost(postId, {
        lifecycleStatus: "PUBLISHED",
        publishedAt: new Date().toISOString(),
      });

      // Audit log
      db.addAuditLog({
        tenantId,
        action: approvalType === "SYSTEM_AUTOPOST" ? "POST_AUTO_PUBLISHED" : "POST_MANUALLY_PUBLISHED",
        entityType: "ContentPost",
        entityId: postId,
        details: {
          platform,
          account: account.accountName,
          externalPostId: result.externalPostId,
          publishedUrl: result.publishedUrl,
        },
      });

      return { success: true, externalPostId: result.externalPostId };
    } else {
      db.updateContentPost(postId, { lifecycleStatus: "FAILED" });
      return { success: false, error: result.errorMessage ?? "Publishing failed" };
    }
  }
}

export const publishingService = new PublishingService();
