import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { ai } from "@/lib/ai/orchestrator";

export async function POST(request: Request) {
  try {
    const { trendId, productId } = await request.json();
    const tenantId = "tenant_kopicraft_01";

    const trends = db.getTrendSignals(tenantId);
    const trend = trends.find((t) => t.id === trendId);
    if (!trend) {
      return NextResponse.json({ error: "Trend not found" }, { status: 404 });
    }

    const products = db.getProducts(tenantId);
    const product = productId ? products.find((p) => p.id === productId) : products[0];
    const brandVoice = db.getBrandVoice(tenantId);
    const personas = db.getAudiencePersonas(tenantId);
    const pillars = db.getContentPillars(tenantId);

    const concepts = await ai.generatePostConcepts({
      trend,
      product,
      usps: product?.usps,
      brandVoice,
      persona: personas[0],
      pillars,
    });

    return NextResponse.json({ success: true, concepts });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
