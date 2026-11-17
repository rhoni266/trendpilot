import { NextResponse } from "next/server";
import { publishingService } from "@/lib/services/publishingService";
import { PlatformType } from "@/lib/types";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const platform = (body.platform ?? "INSTAGRAM") as PlatformType;
    const approvalType = body.approvalType ?? "MANUAL_ADMIN";

    const result = await publishingService.publishPost(id, platform, "tenant_kopicraft_01", approvalType);

    if (result.success) {
      return NextResponse.json({
        success: true,
        externalPostId: result.externalPostId,
        message: `Post successfully published to ${platform}.`,
      });
    } else {
      return NextResponse.json({ success: false, error: result.error }, { status: 400 });
    }
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
