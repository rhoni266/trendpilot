import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
  const tenantId = "tenant_kopicraft_01";
  const tenant = db.getTenant(tenantId);
  const posts = db.getContentPosts(tenantId);
  const trends = db.getTrendSignals(tenantId);
  const preferences = db.getLearningPreferences(tenantId);

  const report = {
    exportedAt: new Date().toISOString(),
    tenant: {
      name: tenant?.name,
      plan: tenant?.plan,
      timezone: tenant?.timezone,
    },
    summaryMetrics: {
      totalReach: 48200,
      totalEngagements: 4810,
      saveShareRate: "5.8%",
      modelAccuracy: "89%",
    },
    contentPerformanceByPillar: [
      { pillar: "Barista Hacks & Home Recipes", engagementRate: "7.8%" },
      { pillar: "Farm to Cup & Origin Stories", engagementRate: "6.2%" },
      { pillar: "Coffee Lore & Craft Education", engagementRate: "5.4%" },
      { pillar: "Bangsar Roastery & Community Vibe", engagementRate: "4.1%" },
    ],
    learnedPreferences: preferences.map((p) => ({
      key: p.preferenceKey,
      weight: p.weight,
      confidence: p.confidence,
      samples: p.sampleCount,
    })),
    recentPosts: posts.slice(0, 10).map((p) => ({
      id: p.id,
      title: p.title,
      status: p.lifecycleStatus,
      hook: p.masterHook,
    })),
  };

  return new NextResponse(JSON.stringify(report, null, 2), {
    headers: {
      "Content-Type": "application/json",
      "Content-Disposition": `attachment; filename="trendpilot-report-${Date.now()}.json"`,
    },
  });
}
