import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(request: Request) {
  try {
    const { slotId, action } = await request.json();

    if (!slotId || !action) {
      return NextResponse.json({ error: "slotId and action required" }, { status: 400 });
    }

    if (action === "ACCEPT") {
      db.acceptCalendarReplacement("tenant_kopicraft_01", slotId);
      return NextResponse.json({ success: true, message: "Replacement proposal accepted." });
    } else if (action === "DISMISS") {
      db.dismissCalendarReplacement("tenant_kopicraft_01", slotId);
      return NextResponse.json({ success: true, message: "Replacement proposal dismissed. Original forecast retained." });
    } else {
      return NextResponse.json({ error: "Invalid action" }, { status: 400 });
    }
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
