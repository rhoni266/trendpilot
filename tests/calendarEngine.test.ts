import { describe, it, expect } from "vitest";
import { calendarEngine } from "../src/lib/services/calendarEngine";
import { db } from "../src/lib/db";

describe("CalendarEngine & Dynamic Rolling Trend Re-evaluation", () => {
  it("should never overwrite or replace approved or scheduled posts", async () => {
    const tenantId = "tenant_kopicraft_01";
    const initialSlots = db.getCalendarSlots(tenantId);
    const approvedSlot = initialSlots.find((s) => !s.isForecast && s.post?.lifecycleStatus === "APPROVED");

    if (approvedSlot && approvedSlot.post) {
      const originalPostId = approvedSlot.post.id;
      const originalTitle = approvedSlot.post.title;

      await calendarEngine.refreshRollingCalendar(tenantId);

      const refreshedSlots = db.getCalendarSlots(tenantId);
      const postAfter = refreshedSlots.find((s) => s.id === approvedSlot.id)?.post;

      expect(postAfter?.id).toBe(originalPostId);
      expect(postAfter?.title).toBe(originalTitle);
      expect(postAfter?.lifecycleStatus).toBe("APPROVED");
    }
  });

  it("should generate replacement proposal for unapproved forecast slot when superior trend is found", async () => {
    const tenantId = "tenant_kopicraft_01";
    const result = await calendarEngine.refreshRollingCalendar(tenantId);

    expect(result.slotsRefreshed).toBeGreaterThan(0);
    const slots = db.getCalendarSlots(tenantId);
    const proposalSlot = slots.find((s) => s.hasReplacementProposal);
    expect(proposalSlot).toBeDefined();
    expect(proposalSlot?.replacementReason).toBeDefined();
    expect(proposalSlot?.proposedReplacementPostId).toBeDefined();
  });
});
