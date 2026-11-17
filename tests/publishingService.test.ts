import { describe, it, expect } from "vitest";
import { publishingService } from "../src/lib/services/publishingService";
import { db } from "../src/lib/db";
import { ContentPost } from "../src/lib/types";

describe("PublishingService & Auto-Post Eligibility", () => {
  it("should block Auto-Post if tenant is still in 14-day probation period", () => {
    const post: ContentPost = {
      id: "post_test_01",
      tenantId: "tenant_kopicraft_01",
      title: "Test Post",
      masterHook: "Great coffee hook",
      masterCaption: "Great caption",
      masterCta: "Order now",
      visualBrief: "Cup of coffee",
      safetyOutcome: "PASS",
      lifecycleStatus: "DRAFT",
      isDeleted: false,
      variants: [],
      mediaAssets: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const eligibility = publishingService.evaluateAutoPostEligibility(post, "tenant_kopicraft_01");
    expect(eligibility.eligible).toBe(false);
    expect(eligibility.blockers.some((b) => b.includes("probation period") || b.includes("Auto-post mode is currently disabled"))).toBe(true);
  });

  it("should block Auto-Post if post safetyOutcome is not PASS", () => {
    const unsafePost: ContentPost = {
      id: "post_test_unsafe",
      tenantId: "tenant_kopicraft_01",
      title: "Controversial Post",
      masterHook: "Controversial hook",
      masterCaption: "Controversial caption",
      masterCta: "Click here",
      visualBrief: "Image",
      safetyOutcome: "BLOCKED",
      lifecycleStatus: "DRAFT",
      isDeleted: false,
      variants: [],
      mediaAssets: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const eligibility = publishingService.evaluateAutoPostEligibility(unsafePost, "tenant_kopicraft_01");
    expect(eligibility.eligible).toBe(false);
    expect(eligibility.blockers.some((b) => b.includes("safety") || b.includes("BLOCKED"))).toBe(true);
  });
});
