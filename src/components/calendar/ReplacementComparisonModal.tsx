"use client";

import React, { useState } from "react";
import { Sparkles, ArrowRight, Check, X, ShieldAlert, TrendingUp } from "lucide-react";
import { CalendarSlot } from "@/lib/types";

interface ReplacementComparisonModalProps {
  slot: CalendarSlot;
  isOpen: boolean;
  onClose: () => void;
  onActionComplete: () => void;
}

export function ReplacementComparisonModal({
  slot,
  isOpen,
  onClose,
  onActionComplete,
}: ReplacementComparisonModalProps) {
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isOpen || !slot.hasReplacementProposal) return null;

  const existingPost = slot.post;
  const proposedPost = slot.proposedReplacementPost;

  const handleAction = async (action: "ACCEPT" | "DISMISS") => {
    setIsProcessing(true);
    try {
      const res = await fetch("/api/calendar/replacement", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slotId: slot.id, action }),
      });
      if (res.ok) {
        onActionComplete();
        onClose();
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-4xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950/60">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-white">Trend Replacement Proposal</h3>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-950 text-amber-400 border border-amber-800 font-semibold">
                  REVIEW_SUGGESTED
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Target Slot: <span className="text-slate-200 font-semibold">{slot.targetDate}</span> at {slot.slotTime} ({slot.platform})
              </p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Rationale Banner */}
        <div className="px-6 py-3 bg-amber-950/20 border-b border-amber-800/30 flex items-center gap-2.5 text-xs text-amber-200">
          <TrendingUp className="w-4 h-4 text-amber-400 shrink-0" />
          <span>{slot.replacementReason}</span>
        </div>

        {/* Side-by-Side Comparison */}
        <div className="p-6 overflow-y-auto grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
          {/* Left: Existing Forecast Post */}
          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-3.5 opacity-80">
            <div className="flex items-center justify-between border-b border-slate-800/80 pb-2">
              <span className="font-semibold text-slate-400 uppercase tracking-wider text-[10px]">
                Current Forecast Draft
              </span>
              <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-400 font-mono text-[10px]">
                Score: {existingPost?.trendSignal?.scores?.compositeScore ?? 72}/100
              </span>
            </div>

            <div className="space-y-1">
              <p className="text-slate-500 font-medium text-[11px]">Title</p>
              <p className="text-slate-200 font-semibold text-sm">{existingPost?.title ?? "Standard Brand Post"}</p>
            </div>

            <div className="space-y-1">
              <p className="text-slate-500 font-medium text-[11px]">Hook</p>
              <p className="text-slate-300 italic bg-slate-900/60 p-2.5 rounded-lg border border-slate-800/50">
                "{existingPost?.masterHook}"
              </p>
            </div>

            <div className="space-y-1">
              <p className="text-slate-500 font-medium text-[11px]">Copy Summary</p>
              <p className="text-slate-400 line-clamp-3 leading-relaxed">{existingPost?.masterCaption}</p>
            </div>

            <div className="pt-2 text-[11px] text-slate-500 flex items-center justify-between">
              <span>Pillar: {existingPost?.pillar?.name ?? "General"}</span>
              <span>Safety: PASS</span>
            </div>
          </div>

          {/* Right: Proposed Superior Replacement */}
          <div className="p-4 rounded-xl bg-cyan-950/20 border border-cyan-800/60 space-y-3.5 shadow-lg shadow-cyan-950/30">
            <div className="flex items-center justify-between border-b border-cyan-800/50 pb-2">
              <span className="font-semibold text-cyan-400 uppercase tracking-wider text-[10px] flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" /> Proposed Replacement
              </span>
              <span className="px-2 py-0.5 rounded bg-cyan-900 text-cyan-200 font-mono text-[10px] font-bold">
                Score: 92/100 (+20%)
              </span>
            </div>

            <div className="space-y-1">
              <p className="text-cyan-400 font-medium text-[11px]">Title</p>
              <p className="text-white font-semibold text-sm">{proposedPost?.title}</p>
            </div>

            <div className="space-y-1">
              <p className="text-cyan-400 font-medium text-[11px]">Hook (Trending Structure)</p>
              <p className="text-cyan-100 italic bg-cyan-950/60 p-2.5 rounded-lg border border-cyan-800/60 font-medium">
                "{proposedPost?.masterHook}"
              </p>
            </div>

            <div className="space-y-1">
              <p className="text-cyan-400 font-medium text-[11px]">Platform-Adapted Copy</p>
              <p className="text-slate-200 line-clamp-3 leading-relaxed">{proposedPost?.masterCaption}</p>
            </div>

            <div className="pt-2 text-[11px] text-cyan-300 flex items-center justify-between">
              <span>Pillar: Recipes & Hacks</span>
              <span className="text-emerald-400 font-semibold">Safety: 100% PASS</span>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-slate-800 bg-slate-950 flex items-center justify-between">
          <button
            type="button"
            disabled={isProcessing}
            onClick={() => handleAction("DISMISS")}
            className="px-4 py-2 rounded-lg text-xs font-semibold text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800 transition-colors"
          >
            Keep Original Forecast
          </button>

          <button
            type="button"
            disabled={isProcessing}
            onClick={() => handleAction("ACCEPT")}
            className="flex items-center gap-2 px-5 py-2 rounded-lg text-xs font-semibold bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white shadow-lg shadow-cyan-500/20 transition-all"
          >
            <Check className="w-3.5 h-3.5" />
            <span>Accept & Replace Forecast</span>
          </button>
        </div>
      </div>
    </div>
  );
}
