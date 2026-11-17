"use client";

import React, { useState } from "react";
import { Header } from "@/components/layout/Header";
import {
  Flame,
  TrendingUp,
  BarChart3,
  PieChart,
  Eye,
  Heart,
  Share2,
  Bookmark,
  BrainCircuit,
  Download,
  CheckCircle2,
} from "lucide-react";

export default function AnalyticsPage() {
  const [downloading, setDownloading] = useState(false);

  const handleExport = async () => {
    setDownloading(true);
    try {
      const res = await fetch("/api/analytics/export");
      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `trendpilot-marketing-report-${new Date().toISOString().slice(0, 10)}.json`;
      document.body.appendChild(a);
      a.click();
      a.remove();
    } catch (e) {
      console.error(e);
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className="flex-1 flex flex-col pb-12">
      <Header
        title="Analytics & Continuous Learning Insights"
        subtitle="Verifiable Performance Data Across Content Pillars, Hooks, and System Recommendation Signals"
      />

      <div className="p-8 space-y-8 max-w-7xl">
        {/* Export Banner */}
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h3 className="text-sm font-bold text-white">Export Tenant Performance Report</h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Download complete structured JSON/CSV report of metrics, pillar performance, and learned preference weights.
            </p>
          </div>

          <button
            onClick={handleExport}
            disabled={downloading}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs transition-colors shadow-sm disabled:opacity-50"
          >
            <Download className="w-4 h-4" />
            <span>{downloading ? "Generating Report..." : "Export Report (JSON)"}</span>
          </button>
        </div>

        {/* Top Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <Eye className="w-3.5 h-3.5 text-cyan-400" /> Total 30d Reach
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-white">48,200</span>
              <span className="text-xs text-emerald-400 font-semibold">+34%</span>
            </div>
            <p className="text-[10px] text-slate-500 font-mono">Instagram & TikTok Organic</p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <Heart className="w-3.5 h-3.5 text-rose-400" /> Total Engagements
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-white">4,810</span>
              <span className="text-xs text-emerald-400 font-semibold">+22%</span>
            </div>
            <p className="text-[10px] text-slate-500 font-mono">Likes, Comments & Shares</p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <Bookmark className="w-3.5 h-3.5 text-amber-400" /> Save & Share Rate
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-amber-300">5.8%</span>
              <span className="text-xs text-emerald-400 font-semibold">+1.4%</span>
            </div>
            <p className="text-[10px] text-slate-500 font-mono">High bookmark intent</p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <BrainCircuit className="w-3.5 h-3.5 text-cyan-400" /> Model Accuracy
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-cyan-300">89%</span>
              <span className="text-xs text-cyan-400 font-semibold">Voice Fit</span>
            </div>
            <p className="text-[10px] text-slate-500 font-mono">Based on 14 admin approvals</p>
          </div>
        </div>

        {/* Content Pillars & Best Performing Formats */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Pillar Performance Breakdown */}
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-white">Performance by Content Pillar</h3>
                <p className="text-xs text-slate-400">Average engagement rate per content angle</p>
              </div>
              <BarChart3 className="w-5 h-5 text-slate-600" />
            </div>

            <div className="space-y-4 pt-2">
              {[
                { name: "Barista Hacks & Home Recipes", rate: "7.8%", width: "85%", color: "bg-cyan-500" },
                { name: "Farm to Cup & Origin Stories", rate: "6.2%", width: "70%", color: "bg-indigo-500" },
                { name: "Coffee Lore & Craft Education", rate: "5.4%", width: "60%", color: "bg-emerald-500" },
                { name: "Bangsar Roastery & Community Vibe", rate: "4.1%", width: "45%", color: "bg-amber-500" },
              ].map((pil, i) => (
                <div key={i} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-slate-200">{pil.name}</span>
                    <span className="font-mono font-bold text-slate-300">{pil.rate}</span>
                  </div>
                  <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden border border-slate-800">
                    <div className={`${pil.color} h-full rounded-full`} style={{ width: pil.width }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Top Hooks & CTAs */}
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <h3 className="text-base font-bold text-white">Top Performing Hooks & Angles</h3>
            <p className="text-xs text-slate-400">High-converting openings identified in customer feedback</p>

            <div className="space-y-3">
              {[
                {
                  hook: "Cuaca panas KL ni, jangan minum kopi biasa yang pekat melekit. Try this 2-minute mocktail!",
                  saves: "412 saves",
                  platform: "TikTok & Reels",
                  score: 96,
                },
                {
                  hook: "Ramai ingat biji kopi Malaysia tak boleh compete dengan luar negara. Uncle Tan bukti sebaliknya.",
                  saves: "290 saves",
                  platform: "Threads & Instagram",
                  score: 92,
                },
                {
                  hook: "Kenapa specialty coffee rasa berbeza dari kopi kedai biasa? Ini rahsia roaster...",
                  saves: "184 saves",
                  platform: "Instagram Carousel",
                  score: 88,
                },
              ].map((h, i) => (
                <div key={i} className="p-3.5 rounded-xl bg-slate-950 border border-slate-800/80 space-y-1.5 text-xs">
                  <p className="font-semibold text-slate-200 leading-snug">"{h.hook}"</p>
                  <div className="flex items-center justify-between text-[11px] text-slate-500 font-mono">
                    <span className="text-cyan-400 font-medium">{h.platform}</span>
                    <span className="font-bold text-slate-300">{h.saves}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
