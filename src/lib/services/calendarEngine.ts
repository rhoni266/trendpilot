import { db } from "../db";
import { ai } from "../ai/orchestrator";
import { CalendarSlot, ContentPost } from "../types";

export class CalendarEngine {
  /**
   * Refreshes the 30-day calendar forecast using latest 7-day trend intelligence.
   * Compares unapproved future forecast slots with newly discovered high-momentum trends.
   * If a trend offers a significantly higher score (+15 points), proposes a replacement.
   * NEVER alters or deletes APPROVED or SCHEDULED posts!
   */
  async refreshRollingCalendar(tenantId = "tenant_kopicraft_01"): Promise<{
    proposalsGenerated: number;
    slotsRefreshed: number;
  }> {
    const slots = db.getCalendarSlots(tenantId);
    const trends = db.getTrendSignals(tenantId).filter((s) => !s.isExcluded && s.safetyStatus === "PASS");
    const products = db.getProducts(tenantId);
    const brandVoice = db.getBrandVoice(tenantId);
    const pillars = db.getContentPillars(tenantId);

    if (trends.length === 0 || products.length === 0) {
      return { proposalsGenerated: 0, slotsRefreshed: 0 };
    }

    // Sort trends by composite score
    const topTrend = trends.sort((a, b) => (b.scores?.compositeScore ?? 0) - (a.scores?.compositeScore ?? 0))[0];
    let proposalsGenerated = 0;

    // Inspect future unapproved forecast slots
    for (const slot of slots) {
      // Rule: Never alter approved, scheduled, or already published posts
      if (!slot.isForecast || !slot.post) continue;
      if (slot.post.lifecycleStatus === "APPROVED" || slot.post.lifecycleStatus === "SCHEDULED" || slot.post.lifecycleStatus === "PUBLISHED") {
        continue;
      }

      // Check if slot already has a replacement proposal
      if (slot.hasReplacementProposal) continue;

      // If slot has a forecast item with no trend or a much lower score trend
      const existingScore = slot.post.trendSignal?.scores?.compositeScore ?? 65;
      const topScore = topTrend.scores?.compositeScore ?? 92;

      // Threshold: at least +15 points difference required
      if (topScore - existingScore >= 15 && proposalsGenerated < 2) {
        // Generate superior replacement post proposal
        const concepts = await ai.generatePostConcepts({
          trend: topTrend,
          product: products[0],
          brandVoice,
          pillars,
        });

        if (concepts.length > 0) {
          const chosenConcept = concepts[0];
          const replacementPost = db.createContentPost(
            {
              tenantId,
              trendSignalId: topTrend.id,
              productId: products[0].id,
              pillarId: pillars[0]?.id,
              title: `⚡ Trend Replacement: ${chosenConcept.title}`,
              masterHook: chosenConcept.openingHook,
              masterCaption: chosenConcept.masterCaption,
              masterCta: chosenConcept.masterCta,
              visualBrief: chosenConcept.visualBrief,
              safetyOutcome: "PASS",
              lifecycleStatus: "REPLACEMENT_PROPOSED",
              isDeleted: false,
            },
            [
              {
                platform: slot.platform,
                caption: `${chosenConcept.masterCaption}\n\n${chosenConcept.masterCta}`,
                hook: chosenConcept.openingHook,
                callToAction: chosenConcept.masterCta,
                hashtags: ["#KopiCraft", "#TrendingNow", "#SapotLokal"],
                aspectRatio: slot.platform === "TIKTOK" ? "9:16" : "1:1",
                characterCount: 280,
              },
            ],
            "https://images.unsplash.com/photo-1517701604599-bb29b565090c?w=900&auto=format&fit=crop&q=80"
          );

          // Mark slot with proposal
          slot.hasReplacementProposal = true;
          slot.proposedReplacementPostId = replacementPost.id;
          slot.replacementReason = `New 7-Day Trend Discovery: "${topTrend.title}" (${topScore}/100 vs existing ${existingScore}/100). Higher audience momentum and direct synergy with ${products[0].name}.`;

          proposalsGenerated++;

          // Create notification
          db.getNotifications(tenantId).unshift({
            id: `notif_${Date.now()}`,
            tenantId,
            title: "New Calendar Replacement Proposal",
            message: `Day ${slot.targetDate} has a recommended update based on "${topTrend.title}". Review comparison.`,
            type: "REPLACEMENT_PROPOSAL",
            isRead: false,
            actionUrl: "/calendar",
            createdAt: new Date().toISOString(),
          });
        }
      }
    }

    return { proposalsGenerated, slotsRefreshed: slots.length };
  }
}

export const calendarEngine = new CalendarEngine();
