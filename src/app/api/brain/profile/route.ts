import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
  const tenantId = "tenant_kopicraft_01";
  const profile = db.getBusinessProfile(tenantId);
  const brandVoice = db.getBrandVoice(tenantId);
  const products = db.getProducts(tenantId);
  const personas = db.getAudiencePersonas(tenantId);
  const restricted = db.getRestrictedTopics(tenantId);
  const preferences = db.getLearningPreferences(tenantId);

  return NextResponse.json({
    profile,
    brandVoice,
    products,
    personas,
    restricted,
    preferences,
  });
}

export async function POST(request: Request) {
  try {
    const tenantId = "tenant_kopicraft_01";
    const body = await request.json();

    if (body.profile) {
      db.updateBusinessProfile(tenantId, body.profile);
    }
    if (body.brandVoice) {
      db.updateBrandVoice(tenantId, body.brandVoice);
    }

    return NextResponse.json({ success: true, message: "Profile updated successfully." });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
