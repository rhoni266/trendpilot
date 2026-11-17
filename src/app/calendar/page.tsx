"use client";

import React, { useState, useEffect } from "react";
import { Header } from "@/components/layout/Header";
import { ReplacementComparisonModal } from "@/components/calendar/ReplacementComparisonModal";
import { DeletionReasonModal } from "@/components/shared/DeletionReasonModal";
import { CalendarSlot, ContentPost } from "@/lib/types";
import {
  CalendarDays,
  Sparkles,
  Clock,
  CheckCircle2,
  AlertCircle,
  Filter,
  Trash2,
  ArrowRight,
  Eye,
  Edit,
} from "lucide-react";

export default function CalendarPage() {
  const [slots, setSlots] = useState<CalendarSlot[]>([]);
  const [selectedSlotForReplacement, setSelectedSlotForReplacement] = useState<CalendarSlot | null>(null);
  const [selectedPostForDeletion, setSelectedPostForDeletion] = useState<ContentPost | null>(null);
  const [viewMode, setViewMode] = useState<"MONTH" | "LIST">("MONTH");
  const [platformFilter, setPlatformFilter] = useState<string>("ALL");

  useEffect(() => {
    // Generate 30 slots client-side or read from db
    const now = new Date();
    const generated: CalendarSlot[] = [];

    for (let i = 0; i < 30; i++) {
      const d = new Date(now.getTime() + i * 24 * 3600 * 1000);
      const dateStr = d.toISOString().split("T")[0];
      const isApproved = i === 1 || i === 2;
      const isReplacement = i === 4;

      const pTitle = i === 0 
        ? "Behind the Roaster: Kulai Liberica Drop Day"
        : i === 1 
        ? "Calamansi Cold Brew Fizz Recipe"
        : i === 2
        ? "Mythbuster: Does Dark Roast Have More Kick?"
        : i === 4
        ? "The Rise of Rare Liberica in Global Coffee Competitions"
        : `Artisan Coffee Moment #${i + 1}`;

      const post: ContentPost = {
        id: `post_${i}`,
        tenantId: "tenant_kopicraft_01",
        title: pTitle,
        masterHook: "Cuaca panas KL ni, jangan minum kopi biasa yang pekat melekit. Try this 2-minute mocktail!",
        masterCaption: "When it's 34°C in Bangsar, our 18-Hour Barista Cold Brew Concentrate + sparkling tonic + fresh calamansi is the ultimate afternoon revival.",
        masterCta: "Link in bio to reserve this week's fresh batch.",
        visualBrief: "Clean studio top-down shot of condensation-covered glass with calamansi slice.",
        safetyOutcome: "PASS",
        lifecycleStatus: isApproved ? "APPROVED" : isReplacement ? "REPLACEMENT_PROPOSED" : "FORECAST",
        isDeleted: false,
        variants: [],
        mediaAssets: [],
        createdAt: now.toISOString(),
        updatedAt: now.toISOString(),
      };

      generated.push({
        id: `slot_${i}`,
        tenantId: "tenant_kopicraft_01",
        targetDate: dateStr,
        slotTime: "11:30",
        platform: i % 2 === 0 ? "INSTAGRAM" : "TIKTOK",
        isForecast: !isApproved,
        hasReplacementProposal: isReplacement,
        proposedReplacementPostId: isReplacement ? "post_replacement_demo" : undefined,
        proposedReplacementPost: isReplacement
          ? {
              id: "post_replacement_demo",
              tenantId: "tenant_kopicraft_01",
              title: "⚡ Trend Replacement: Tropical Cold Brew Spritz for 34°C Heatwave",
              masterHook: "Cuaca panas terik harini? Jump into the viral Cold Brew Calamansi Spritz trend!",
              masterCaption: "Captured right from this week's trending #coldbrewmocktail wave (+82% momentum). We pair our 18-hour cold steeped concentrate with sparkling water and fresh calamansi.",
              masterCta: "Limited stock of this week's cold brew batch available online now.",
              visualBrief: "Bright, sunlit aesthetic of glass tumbler with effervescent bubbles, floating calamansi wheels.",
              safetyOutcome: "PASS",
              lifecycleStatus: "REPLACEMENT_PROPOSED",
              isDeleted: false,
              variants: [],
              mediaAssets: [],
              createdAt: now.toISOString(),
              updatedAt: now.toISOString(),
            }
          : undefined,
        replacementReason: isReplacement
          ? "New 7-Day Trend: Rapid spike (+82%) in tropical cold brew recipes. Proposing to replace generic bean forecast with high-momentum Cold Brew Mocktail post to capture immediate seasonal demand."
          : undefined,
        post,
      });
    }

    setSlots(generated);
  }, []);

  const filteredSlots = slots.filter((slot) => {
    if (platformFilter !== "ALL" && slot.platform !== platformFilter) return false;
    return true;
  });

  return (
    <div className="flex-1 flex flex-col pb-12">
      <Header
        title="30-Day Rolling Content Forecast"
        subtitle="Dynamic 30-Day Calendar with Adaptive 7-Day Trend Re-evaluation & Zero Unauthorised Overwrites"
      />

      <div className="p-8 space-y-6 max-w-7xl">
        {/* Calendar Legend & Filter Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
          <div className="flex flex-wrap items-center gap-3">
            {/* View Mode Toggle */}
            <div className="flex rounded-lg bg-slate-950 p-1 border border-slate-800 text-xs">
              <button
                onClick={() => setViewMode("MONTH")}
                className={`px-3 py-1 rounded-md font-semibold transition-all ${
                  viewMode === "MONTH" ? "bg-cyan-500 text-slate-950" : "text-slate-400 hover:text-white"
                }`}
              >
                Month Grid
              </button>
              <button
                onClick={() => setViewMode("LIST")}
                className={`px-3 py-1 rounded-md font-semibold transition-all ${
                  viewMode === "LIST" ? "bg-cyan-500 text-slate-950" : "text-slate-400 hover:text-white"
                }`}
              >
                List Timeline
              </button>
            </div>

            {/* Platform Filter */}
            <select
              value={platformFilter}
              onChange={(e) => setPlatformFilter(e.target.value)}
              className="px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-300 focus:outline-none focus:border-cyan-500"
            >
              <option value="ALL">All Platforms</option>
              <option value="INSTAGRAM">Instagram</option>
              <option value="TIKTOK">TikTok</option>
              <option value="THREADS">Threads</option>
              <option value="FACEBOOK">Facebook</option>
            </select>
          </div>

          {/* Status Badges Legend */}
          <div className="flex items-center gap-4 text-xs">
            <div className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
              <span className="text-slate-300">Approved / Scheduled (Locked)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-slate-500" />
              <span className="text-slate-400">Adaptive Forecast</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse" />
              <span className="text-amber-300 font-semibold">Review Suggested (+20% Trend)</span>
            </div>
          </div>
        </div>

        {/* 30-Day Grid View */}
        {viewMode === "MONTH" ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {filteredSlots.map((slot) => {
              const isApproved = !slot.isForecast;
              const hasProposal = slot.hasReplacementProposal;

              return (
                <div
                  key={slot.id}
                  className={`p-4 rounded-2xl border transition-all flex flex-col justify-between space-y-3 relative overflow-hidden ${
                    hasProposal
                      ? "bg-amber-950/20 border-amber-800/80 shadow-lg shadow-amber-950/30 ring-1 ring-amber-500/30"
                      : isApproved
                      ? "bg-emerald-950/20 border-emerald-800/60 shadow-sm"
                      : "bg-slate-900/70 border-slate-800/80 hover:border-slate-700"
                  }`}
                >
                  {/* Card Header */}
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-200 font-mono">{slot.targetDate}</span>
                    <span
                      className={`text-[9px] font-mono px-2 py-0.5 rounded font-bold uppercase ${
                        hasProposal
                          ? "bg-amber-900/80 text-amber-200 border border-amber-700"
                          : isApproved
                          ? "bg-emerald-950 text-emerald-300 border border-emerald-800"
                          : "bg-slate-800 text-slate-400"
                      }`}
                    >
                      {hasProposal ? "REVIEW_SUGGESTED" : isApproved ? "APPROVED" : "FORECAST"}
                    </span>
                  </div>

                  {/* Post Content */}
                  <div className="space-y-1">
                    <p className="font-semibold text-white text-xs line-clamp-2 leading-snug">
                      {slot.post?.title}
                    </p>
                    <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">
                      "{slot.post?.masterHook}"
                    </p>
                  </div>

                  {/* Review Suggested Replacement Callout */}
                  {hasProposal && (
                    <div className="p-2.5 rounded-xl bg-amber-950/60 border border-amber-800/60 text-xs space-y-1.5">
                      <div className="flex items-center gap-1.5 text-amber-300 font-bold text-[11px]">
                        <Sparkles className="w-3.5 h-3.5" /> Superior Trend Found
                      </div>
                      <p className="text-[10px] text-amber-200/80 line-clamp-2 leading-tight">
                        {slot.replacementReason}
                      </p>
                      <button
                        onClick={() => setSelectedSlotForReplacement(slot)}
                        className="w-full mt-1 py-1 rounded bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-[10px] transition-colors"
                      >
                        Compare & Replace
                      </button>
                    </div>
                  )}

                  {/* Footer Meta */}
                  <div className="pt-2 border-t border-slate-800/60 flex items-center justify-between text-[11px] text-slate-500 font-mono">
                    <span>{slot.platform}</span>
                    <div className="flex items-center gap-2">
                      <span>{slot.slotTime}</span>
                      {slot.post && (
                        <button
                          onClick={() => setSelectedPostForDeletion(slot.post!)}
                          className="text-slate-600 hover:text-rose-400 transition-colors"
                          title="Delete post and submit feedback"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* List Timeline View */
          <div className="space-y-3">
            {filteredSlots.map((slot) => (
              <div
                key={slot.id}
                className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between gap-4"
              >
                <div className="flex items-center gap-4 min-w-[160px]">
                  <span className="font-mono text-xs font-bold text-slate-300">{slot.targetDate}</span>
                  <span className="text-xs text-slate-500 font-mono">{slot.slotTime}</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-400">
                    {slot.platform}
                  </span>
                </div>

                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold text-white truncate">{slot.post?.title}</p>
                  <p className="text-[11px] text-slate-400 truncate">{slot.post?.masterHook}</p>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  {slot.hasReplacementProposal ? (
                    <button
                      onClick={() => setSelectedSlotForReplacement(slot)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500 text-slate-950 font-bold text-xs"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Compare Trend Proposal</span>
                    </button>
                  ) : (
                    <span className="text-[11px] font-mono text-slate-500">
                      {slot.isForecast ? "FORECAST" : "APPROVED"}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Replacement Comparison Modal */}
      {selectedSlotForReplacement && (
        <ReplacementComparisonModal
          slot={selectedSlotForReplacement}
          isOpen={true}
          onClose={() => setSelectedSlotForReplacement(null)}
          onActionComplete={() => {
            // Update slots
            setSlots((prev) =>
              prev.map((s) =>
                s.id === selectedSlotForReplacement.id
                  ? { ...s, hasReplacementProposal: false, isForecast: false }
                  : s
              )
            );
          }}
        />
      )}

      {/* Deletion Learning Modal */}
      {selectedPostForDeletion && (
        <DeletionReasonModal
          post={selectedPostForDeletion}
          isOpen={true}
          onClose={() => setSelectedPostForDeletion(null)}
          onDeleted={() => {
            setSlots((prev) =>
              prev.map((s) => (s.post?.id === selectedPostForDeletion.id ? { ...s, post: undefined } : s))
            );
          }}
        />
      )}
    </div>
  );
}
