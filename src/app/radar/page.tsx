"use client";

import React, { useState, useEffect } from "react";
import { Header } from "@/components/layout/Header";
import { TrendEvidenceCard } from "@/components/radar/TrendEvidenceCard";
import { TrendSignal } from "@/lib/types";
import {
  Compass,
  Filter,
  ShieldAlert,
  Search,
  Sparkles,
  Info,
  RefreshCw,
} from "lucide-react";

export default function TrendRadarPage() {
  const [trends, setTrends] = useState<TrendSignal[]>([]);
  const [platform, setPlatform] = useState<string>("ALL");
  const [category, setCategory] = useState<string>("ALL");
  const [showBlocked, setShowBlocked] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("" );
  const [loading, setLoading] = useState<boolean>(true);

  const fetchTrends = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/trends?showExcluded=true`);
      const data = await res.json();
      if (data.trends) {
        setTrends(data.trends);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTrends();
  }, []);

  const filteredTrends = trends.filter((t) => {
    if (showBlocked && !t.isExcluded) return false;
    if (!showBlocked && t.isExcluded) return false;
    if (platform !== "ALL" && t.platform !== platform) return false;
    if (category !== "ALL" && t.category !== category) return false;
    if (search) {
      const q = search.toLowerCase();
      return t.title.toLowerCase().includes(q) || t.summary.toLowerCase().includes(q);
    }
    return true;
  });

  return (
    <div className="flex-1 flex flex-col pb-12">
      <Header
        title="7-Day Social Trend Radar"
        subtitle="Verifiable Public Signals from TikTok, Threads, Instagram & Facebook (168-Hour Window)"
        onScanSuccess={fetchTrends}
      />

      <div className="p-8 space-y-6 max-w-7xl">
        {/* Compliance and Reality Disclosure */}
        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex items-start gap-3 text-xs text-slate-300">
          <Info className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <p className="font-semibold text-slate-200">
              Platform Compliance & Zero Fake Data Guarantee
            </p>
            <p className="text-slate-400 leading-relaxed text-[11px]">
              TrendPilot connects exclusively to official APIs and licensed public feeds. Trend evidence is timestamped
              within the rolling 7-day window ({168} hours). In local development mode, simulated trends are clearly
              labeled as <span className="font-mono text-cyan-400 font-semibold">[DEMO SIMULATOR]</span> with realistic
              engagement indicators.
            </p>
          </div>
        </div>

        {/* Filters and Controls */}
        <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-3">
            {/* Search */}
            <div className="relative min-w-[220px]">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search trends or keywords..."
                className="w-full pl-8 pr-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
              />
            </div>

            {/* Platform Filter */}
            <select
              value={platform}
              onChange={(e) => setPlatform(e.target.value)}
              className="px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-300 focus:outline-none focus:border-cyan-500"
            >
              <option value="ALL">All Platforms</option>
              <option value="INSTAGRAM">Instagram</option>
              <option value="TIKTOK">TikTok</option>
              <option value="THREADS">Threads</option>
              <option value="FACEBOOK">Facebook</option>
            </select>

            {/* Category Filter */}
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-300 focus:outline-none focus:border-cyan-500"
            >
              <option value="ALL">All Categories</option>
              <option value="EMERGING_TOPIC">Emerging Topics</option>
              <option value="POPULAR_FORMAT">Popular Formats</option>
              <option value="AUDIENCE_QUESTION">Audience Questions</option>
              <option value="HASHTAG_KEYWORD">Hashtags & Keywords</option>
            </select>
          </div>

          {/* Safety Gate Excluded Trends Toggle */}
          <button
            onClick={() => setShowBlocked(!showBlocked)}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              showBlocked
                ? "bg-rose-950 border border-rose-800 text-rose-300 shadow-sm"
                : "bg-slate-950 border border-slate-800 text-slate-400 hover:text-slate-200"
            }`}
          >
            <ShieldAlert className="w-3.5 h-3.5 text-rose-400" />
            <span>{showBlocked ? "Showing Excluded Trends" : "View Excluded Trends"}</span>
          </button>
        </div>

        {/* Loading / Trend Cards Grid */}
        {loading ? (
          <div className="p-12 text-center rounded-2xl bg-slate-900/40 border border-slate-800 space-y-2">
            <RefreshCw className="w-6 h-6 text-cyan-400 animate-spin mx-auto" />
            <p className="text-xs text-slate-400">Scanning 7-day trend feeds...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTrends.map((trend) => (
              <TrendEvidenceCard key={trend.id} trend={trend} />
            ))}
          </div>
        )}

        {!loading && filteredTrends.length === 0 && (
          <div className="p-12 text-center rounded-2xl bg-slate-900/40 border border-slate-800 space-y-2">
            <Compass className="w-8 h-8 text-slate-600 mx-auto" />
            <p className="text-sm font-semibold text-slate-300">No trend signals match your current filters</p>
            <p className="text-xs text-slate-500">Try adjusting your platform, category, or search keywords.</p>
          </div>
        )}
      </div>
    </div>
  );
}
