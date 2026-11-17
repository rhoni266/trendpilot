"use client";

import React from "react";
import Link from "next/link";
import {
  ExternalLink,
  Sparkles,
  TrendingUp,
  ShieldCheck,
  ShieldAlert,
  Clock,
  Eye,
  Heart,
  Share2,
} from "lucide-react";
import { TrendSignal } from "@/lib/types";

interface TrendEvidenceCardProps {
  trend: TrendSignal;
  onSelectForIdeation?: (trend: TrendSignal) => void;
}

export function TrendEvidenceCard({ trend, onSelectForIdeation }: TrendEvidenceCardProps) {
  const score = trend.scores;
  const isBlocked = trend.safetyStatus === "BLOCKED";

  const getPlatformBadge = (plat: string) => {
    switch (plat) {
      case "TIKTOK":
        return "bg-black text-white border-zinc-700";
      case "INSTAGRAM":
        return "bg-gradient-to-r from-purple-950 to-pink-950 text-pink-300 border-pink-800/60";
      case "THREADS":
        return "bg-zinc-900 text-zinc-200 border-zinc-700";
      case "FACEBOOK":
        return "bg-blue-950 text-blue-300 border-blue-800/60";
      default:
        return "bg-slate-800 text-slate-300 border-slate-700";
    }
  };

  return (
    <div
      className={`rounded-2xl border transition-all flex flex-col justify-between overflow-hidden ${
        isBlocked
          ? "bg-slate-950/40 border-rose-900/40 opacity-75"
          : "bg-slate-900/80 border-slate-800/90 hover:border-slate-700 hover:shadow-xl hover:shadow-cyan-950/20"
      }`}
    >
      {/* Top Banner */}
      <div className="p-5 space-y-3">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span
              className={`text-[10px] font-bold px-2 py-0.5 rounded-full border uppercase tracking-wider ${getPlatformBadge(
                trend.platform
              )}`}
            >
              {trend.platform}
            </span>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800/80 text-slate-400 font-medium">
              {trend.category.replace(/_/g, " ")}
            </span>
          </div>

          {/* Safety & Score Badges */}
          <div className="flex items-center gap-2">
            {isBlocked ? (
              <span className="flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full bg-rose-950/80 border border-rose-800 text-rose-300">
                <ShieldAlert className="w-3 h-3 text-rose-400" /> BLOCKED
              </span>
            ) : (
              <span className="flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-950/80 border border-emerald-800 text-emerald-300">
                <ShieldCheck className="w-3 h-3 text-emerald-400" /> PASS
              </span>
            )}

            {score && !isBlocked && (
              <div className="flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-cyan-950 border border-cyan-800 text-cyan-300 font-mono text-xs font-bold shadow-inner">
                <TrendingUp className="w-3 h-3 text-cyan-400" />
                <span>{score.compositeScore}</span>
              </div>
            )}
          </div>
        </div>

        {/* Title & Summary */}
        <div>
          <h3 className="font-bold text-white text-base leading-snug group-hover:text-cyan-300 transition-colors">
            {trend.title}
          </h3>
          <p className="text-xs text-slate-400 mt-1.5 leading-relaxed line-clamp-2">{trend.summary}</p>
        </div>

        {/* Public Engagement Metrics */}
        {trend.engagementMetrics && (
          <div className="flex items-center gap-4 py-2 px-3 rounded-xl bg-slate-950/60 border border-slate-800/60 text-[11px] font-mono text-slate-400">
            {trend.engagementMetrics.views && (
              <span className="flex items-center gap-1">
                <Eye className="w-3 h-3 text-slate-500" />
                {(trend.engagementMetrics.views / 1000).toFixed(0)}k
              </span>
            )}
            {trend.engagementMetrics.likes && (
              <span className="flex items-center gap-1">
                <Heart className="w-3 h-3 text-rose-400" />
                {(trend.engagementMetrics.likes / 1000).toFixed(0)}k
              </span>
            )}
            {trend.engagementMetrics.growthRate && (
              <span className="text-cyan-400 font-semibold flex items-center gap-1 ml-auto">
                <TrendingUp className="w-3 h-3" />
                {trend.engagementMetrics.growthRate}
              </span>
            )}
          </div>
        )}

        {/* Grounded Business Synergies */}
        {score && !isBlocked && (
          <div className="p-3 rounded-xl bg-cyan-950/20 border border-cyan-900/40 text-xs space-y-1.5">
            <p className="font-semibold text-cyan-300 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" /> Why It Matters to KopiCraft:
            </p>
            <p className="text-[11px] text-slate-300 leading-relaxed">{score.explanation}</p>
            <p className="text-[11px] text-cyan-400/90 font-medium pt-1">
              Angle: <span className="text-slate-300 font-normal">{score.suggestedAngle}</span>
            </p>
          </div>
        )}

        {isBlocked && (
          <div className="p-3 rounded-xl bg-rose-950/30 border border-rose-900/40 text-xs space-y-1">
            <p className="font-semibold text-rose-300 flex items-center gap-1.5">
              <ShieldAlert className="w-3.5 h-3.5 text-rose-400" /> Excluded by Safety Gate:
            </p>
            <p className="text-[11px] text-rose-200/80 leading-relaxed">{trend.exclusionReason}</p>
          </div>
        )}
      </div>

      {/* Card Footer */}
      <div className="px-5 py-3 border-t border-slate-800/80 bg-slate-950/40 flex items-center justify-between text-xs">
        <div className="flex items-center gap-2 text-slate-500 font-mono text-[10px]">
          <Clock className="w-3 h-3" />
          <span>7-Day Window</span>
          {trend.sourceUrl && (
            <a
              href={trend.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-cyan-500 hover:text-cyan-400 flex items-center gap-0.5 ml-1"
            >
              <span>Source</span>
              <ExternalLink className="w-2.5 h-2.5" />
            </a>
          )}
        </div>

        {!isBlocked && (
          <Link
            href={`/studio?trendId=${trend.id}`}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold text-xs transition-colors shadow-sm"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Generate Ideas</span>
          </Link>
        )}
      </div>
    </div>
  );
}
