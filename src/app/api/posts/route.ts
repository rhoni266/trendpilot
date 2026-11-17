import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const includeDeleted = searchParams.get("includeDeleted") === "true";
  const posts = db.getContentPosts("tenant_kopicraft_01", includeDeleted);
  return NextResponse.json({ posts });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const post = db.createContentPost(
      {
        tenantId: "tenant_kopicraft_01",
        title: body.title,
        masterHook: body.masterHook,
        masterCaption: body.masterCaption,
        masterCta: body.masterCta,
        visualBrief: body.visualBrief,
        safetyOutcome: body.safetyOutcome ?? "PASS",
        lifecycleStatus: body.lifecycleStatus ?? "DRAFT",
        isDeleted: false,
        trendSignalId: body.trendSignalId,
        productId: body.productId,
        pillarId: body.pillarId,
      },
      body.variants ?? [],
      body.mediaUrl
    );
    return NextResponse.json({ success: true, post });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
