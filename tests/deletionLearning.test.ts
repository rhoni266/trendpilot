import { describe, it, expect } from "vitest";
import { db } from "../src/lib/db";

describe("Deletion Learning Engine", () => {
  it("should soft-delete post and adjust learning preferences when reason is TOO_PROMOTIONAL", () => {
    const tenantId = "tenant_kopicraft_01";
    // Create a post to delete
    const post = db.createContentPost({
      tenantId,
      title: "Hard-Sell Special Discount Promo",
      masterHook: "Get 50% off right now!",
      masterCaption: "Limited time discount on our coffee beans.",
      masterCta: "Buy now before it's gone!",
      visualBrief: "Big discount badge over coffee bag.",
      safetyOutcome: "PASS",
      lifecycleStatus: "DRAFT",
      isDeleted: false,
    });

    const initialPrefs = db.getLearningPreferences(tenantId);
    const initialAvoidWeight =
      initialPrefs.find((p) => p.preferenceKey === "avoid_format_aggressive_discount")?.weight ?? 0.7;

    // Delete with feedback
    const result = db.deletePostWithFeedback(tenantId, post.id, {
      reasonCategory: "TOO_PROMOTIONAL",
      reasonDetails: "Too salesy, doesn't match our craft artisan positioning.",
      improvementText: "Highlight the Kulai farming story rather than pure discounts.",
      userId: "user_owner_01",
    });

    expect(result.success).toBe(true);

    // Verify post is soft-deleted and status updated
    const fetched = db.getContentPost(post.id);
    expect(fetched?.isDeleted).toBe(true);
    expect(fetched?.lifecycleStatus).toBe("DELETED");

    // Verify learning preference weight has adjusted upwards
    const updatedPrefs = db.getLearningPreferences(tenantId);
    const updatedAvoid = updatedPrefs.find((p) => p.preferenceKey === "avoid_format_aggressive_discount");
    expect(updatedAvoid).toBeDefined();
    expect(updatedAvoid!.weight).toBeGreaterThan(initialAvoidWeight);

    // Verify audit log entry
    const auditLogs = db.getAuditLogs(tenantId);
    const delLog = auditLogs.find((l) => l.action === "POST_DELETED_WITH_FEEDBACK" && l.entityId === post.id);
    expect(delLog).toBeDefined();
    expect((delLog?.details as any).reasonCategory).toBe("TOO_PROMOTIONAL");
  });
});
