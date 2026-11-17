import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { connectorRegistry } from "@/lib/connectors/registry";
import { scoringEngine } from "@/lib/services/scoringEngine";
import { calendarEngine } from "@/lib/services/calendarEngine";

export async function POST() {
  try {
    const tenantId = "tenant_kopicraft_01";
    const tenant = db.getTenant(tenantId);
    const business = db.getBusinessProfile(tenantId);
    const products = db.getProducts(tenantId);
    const brandVoice = db.getBrandVoice(tenantId);
    const personas = db.getAudiencePersonas(tenantId);
    const restricted = db.getRestrictedTopics(tenantId);

    if (!tenant || !business) {
      return NextResponse.json({ error: "Tenant or business not found" }, { status: 404 });
    }

    // 1. Collect rolling 7-day signals from all active platform connectors
    const connectors = connectorRegistry.getAllConnectors();
    let newSignalsCount = 0;

    for (const connector of connectors) {
      const rawSignals = await connector.fetchRollingTrends(tenant.timezone, 168);

      for (const raw of rawSignals) {
        if (!raw.title) continue;

        // Check if signal already exists (deduplication)
        const existing = db.getTrendSignals(tenantId).find((s) => s.title.toLowerCase() === raw.title!.toLowerCase());
        if (existing) continue;

        // Run safety hard gate
        const safety = scoringEngine.evaluateSafety(raw.title, raw.summary ?? "", restricted);

        // Save new trend signal
        const signal = db.addTrendSignal({
          tenantId,
          platform: raw.platform ?? connector.platform,
          title: raw.title,
          summary: raw.summary ?? "",
          category: raw.category ?? "EMERGING_TOPIC",
          firstObservedAt: raw.firstObservedAt ?? new Date().toISOString(),
          lastObservedAt: raw.lastObservedAt ?? new Date().toISOString(),
          sourceUrl: raw.sourceUrl,
          engagementMetrics: raw.engagementMetrics ?? {},
          isExcluded: safety.status === "BLOCKED",
          exclusionReason: safety.reason,
          safetyStatus: safety.status,
          safetyNotes: safety.reason,
        });

        // If PASS, calculate explainable 0-100 score
        if (safety.status === "PASS") {
          scoringEngine.calculateTrendScore(signal, business, products, brandVoice, personas);
        }

        newSignalsCount++;
      }
    }

    // 2. Trigger rolling calendar refresh to detect potential replacement proposals
    const refreshResult = await calendarEngine.refreshRollingCalendar(tenantId);

    // 3. Log audit event
    db.addAuditLog({
      tenantId,
      action: "TREND_SCAN_EXECUTED",
      entityType: "TrendSignal",
      entityId: "manual_scan_trigger",
      details: {
        newSignalsFound: newSignalsCount,
        proposalsGenerated: refreshResult.proposalsGenerated,
        lookbackHours: 168,
      },
    });

    return NextResponse.json({
      success: true,
      newSignalsCount,
      proposalsGenerated: refreshResult.proposalsGenerated,
    });
  } catch (error: any) {
    console.error("Scan error:", error);
    return NextResponse.json({ error: error.message ?? "Scan failed" }, { status: 500 });
  }
}
