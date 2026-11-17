import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
  const slots = db.getCalendarSlots("tenant_kopicraft_01");
  return NextResponse.json({ slots });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { slotId, action, targetDate, slotTime, postId } = body;

    const slots = db.getCalendarSlots("tenant_kopicraft_01");
    const slot = slots.find((s) => s.id === slotId);
    if (!slot) {
      return NextResponse.json({ error: "Slot not found" }, { status: 404 });
    }

    if (action === "RESCHEDULE") {
      if (targetDate) slot.targetDate = targetDate;
      if (slotTime) slot.slotTime = slotTime;
      return NextResponse.json({ success: true, slot });
    }

    if (action === "APPROVE" && slot.post) {
      db.updateContentPost(slot.post.id, {
        lifecycleStatus: "APPROVED",
        scheduledFor: `${slot.targetDate}T${slot.slotTime}:00`,
      });
      slot.isForecast = false;
      return NextResponse.json({ success: true, message: "Post approved and locked on calendar." });
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
