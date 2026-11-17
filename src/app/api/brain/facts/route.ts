import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
  const facts = db.getKnowledgeFacts("tenant_kopicraft_01");
  return NextResponse.json({ facts });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { action, factId, claim, category } = body;

    if (action === "VERIFY" && factId) {
      const updated = db.verifyKnowledgeFact(factId, "VERIFIED");
      return NextResponse.json({ success: true, fact: updated });
    }

    if (claim && category) {
      const newFact = db.addKnowledgeFact("tenant_kopicraft_01", { claim, category });
      return NextResponse.json({ success: true, fact: newFact });
    }

    return NextResponse.json({ error: "Invalid action or parameters" }, { status: 400 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
