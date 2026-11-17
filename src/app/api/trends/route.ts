import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const platform = searchParams.get("platform");
  const category = searchParams.get("category");
  const showExcluded = searchParams.get("showExcluded") === "true";

  let trends = db.getTrendSignals("tenant_kopicraft_01");

  if (!showExcluded) {
    trends = trends.filter((t) => !t.isExcluded);
  }

  if (platform && platform !== "ALL") {
    trends = trends.filter((t) => t.platform === platform);
  }

  if (category && category !== "ALL") {
    trends = trends.filter((t) => t.category === category);
  }

  return NextResponse.json({ trends });
}
