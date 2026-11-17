import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();

    if (!body.reasonCategory) {
      return NextResponse.json(
        { error: "Deletion reason category is required to update recommendation learning." },
        { status: 400 }
      );
    }

    const result = db.deletePostWithFeedback("tenant_kopicraft_01", id, {
      reasonCategory: body.reasonCategory,
      reasonDetails: body.reasonDetails,
      improvementText: body.improvementText,
      userId: "user_owner_01",
    });

    return NextResponse.json({
      success: true,
      message: "Post soft-deleted and learning preferences refined.",
      adjustedPreferences: result.adjustedPreferences,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
