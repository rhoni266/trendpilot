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
  Check,
  RefreshCw,
} from "lucide-react";

export default function CalendarPage() {
  const [slots, setSlots] = useState<CalendarSlot[]>([]);
  const [selectedSlotForReplacement, setSelectedSlotForReplacement] = useState<CalendarSlot | null>(null);
  const [selectedPostForDeletion, setSelectedPostForDeletion] = useState<ContentPost | null>(null);
  const [viewMode, setViewMode] = useState<"MONTH" | "LIST">("MONTH");
  const [platformFilter, setPlatformFilter] = useState<string>("ALL");
  const [loading, setLoading] = useState<boolean>(true);
  const [statusNotice, setStatusNotice] = useState<string | null>(null);

  const fetchCalendar = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/calendar");
      const data = await res.json();
      if (data.slots) {
        setSlots(data.slots);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCalendar();
  }, []);

  const handleApproveSlot = async (slotId: string) => {
    try {
      const res = await fetch("/api/calendar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slotId, action: "APPROVE" }),
      });
      if (res.ok) {
        setStatusNotice("Post successfully approved and locked on calendar.");
        fetchCalendar();
        setTimeout(() => setStatusNotice(null), 3000);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const filteredSlots = slots.filter((slot) => {
    if (platformFilter !== "ALL" && slot.platform !== platformFilter) return false;
    return true;
  });

  return (
    <div className="flex-1 flex flex-col pb-12">
      <Header
        title="30-Day Rolling Content Forecast"
        subtitle="Dynamic 30-Day Calendar with Adaptive 7-Day Trend Re-evaluation & Zero Unauthorised Overwrites"
        onScanSuccess={fetchCalendar}
      />

      <div className="p-8 space-y-6 max-w-7xl">
        {statusNotice && (
          <div className="p-3.5 rounded-xl bg-emerald-950/80 border border-emerald-800 text-xs text-emerald-200 flex items-center gap-2 animate-in fade-in">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{statusNotice}</span>
          </div>
        )}

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
              <span className="text-amber-300 font-semibold">Review Suggested (+15% Trend)</span>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="p-16 text-center rounded-2xl bg-slate-900/40 border border-slate-800 space-y-2">
            <RefreshCw className="w-6 h-6 text-cyan-400 animate-spin mx-auto" />
            <p className="text-xs text-slate-400">Synchronizing rolling 30-day forecast slots...</p>
          </div>
        ) : viewMode === "MONTH" ? (
          /* 30-Day Grid View */
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
                      {slot.post?.title ?? "Adaptive Forecast Slot"}
                    </p>
                    <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">
                      "{slot.post?.masterHook ?? "Awaiting 7-day trend signal assignment..."}"
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

                  {/* Footer Meta & Actions */}
                  <div className="pt-2 border-t border-slate-800/60 flex items-center justify-between text-[11px] text-slate-500 font-mono">
                    <span>{slot.platform}</span>
                    <div className="flex items-center gap-2">
                      <span>{slot.slotTime}</span>
                      {slot.post && slot.isForecast && !hasProposal && (
                        <button
                          onClick={() => handleApproveSlot(slot.id)}
                          className="text-emerald-400 hover:text-emerald-300 transition-colors"
                          title="Approve & Lock slot"
                        >
                          <Check className="w-3.5 h-3.5" />
                        </button>
                      )}
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
                  <p className="text-xs font-bold text-white truncate">{slot.post?.title ?? "Empty Slot"}</p>
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
                  ) : slot.post && slot.isForecast ? (
                    <button
                      onClick={() => handleApproveSlot(slot.id)}
                      className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs"
                    >
                      Approve
                    </button>
                  ) : (
                    <span className="text-[11px] font-mono text-emerald-400 font-semibold">
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
          onActionComplete={fetchCalendar}
        />
      )}

      {/* Deletion Learning Modal */}
      {selectedPostForDeletion && (
        <DeletionReasonModal
          post={selectedPostForDeletion}
          isOpen={true}
          onClose={() => setSelectedPostForDeletion(null)}
          onDeleted={fetchCalendar}
        />
      )}
    </div>
  );
}
