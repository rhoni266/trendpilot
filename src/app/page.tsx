import React from "react";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { db } from "@/lib/db";
import {
  Sparkles,
  Calendar,
  Compass,
  CheckCircle2,
  Clock,
  TrendingUp,
  ShieldCheck,
  AlertCircle,
  BrainCircuit,
  ArrowRight,
  Flame,
  Share2,
} from "lucide-react";

export default function OverviewPage() {
  const tenant = db.getTenant();
  const posts = db.getContentPosts();
  const trends = db.getTrendSignals().filter((t) => !t.isExcluded);
  const calendarSlots = db.getCalendarSlots();
  const learningPrefs = db.getLearningPreferences();
  const notifications = db.getNotifications();
  const accounts = db.getSocialAccounts();

  const publishedCount = posts.filter((p) => p.lifecycleStatus === "PUBLISHED").length;
  const scheduledCount = posts.filter((p) => p.lifecycleStatus === "APPROVED" || p.lifecycleStatus === "SCHEDULED").length;
  const reviewCount = posts.filter((p) => p.lifecycleStatus === "NEEDS_REVIEW" || p.lifecycleStatus === "REPLACEMENT_PROPOSED").length;
  const forecastCount = calendarSlots.filter((s) => s.isForecast).length;

  return (
    <div className="flex-1 flex flex-col pb-12">
      <Header
        title="Marketing Command Center"
        subtitle="7-Day Trend Intelligence Grounded in Business Knowledge & Rolling 30-Day Calendar"
      />

      <div className="p-8 space-y-8 max-w-7xl">
        {/* KPI Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-sm space-y-2">
            <div className="flex items-center justify-between text-slate-400 text-xs">
              <span className="font-semibold uppercase tracking-wider">Scheduled Posts</span>
              <Calendar className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-white">{scheduledCount}</span>
              <span className="text-xs text-emerald-400 font-medium">Ready to publish</span>
            </div>
            <p className="text-[11px] text-slate-500">Approved by administrator</p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-sm space-y-2">
            <div className="flex items-center justify-between text-slate-400 text-xs">
              <span className="font-semibold uppercase tracking-wider">Awaiting Review</span>
              <Clock className="w-4 h-4 text-amber-400" />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-amber-300">{reviewCount}</span>
              <span className="text-xs text-amber-400 font-medium">Needs sign-off</span>
            </div>
            <p className="text-[11px] text-slate-500">Generated from 7-day signals</p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-sm space-y-2">
            <div className="flex items-center justify-between text-slate-400 text-xs">
              <span className="font-semibold uppercase tracking-wider">7-Day Trends</span>
              <Compass className="w-4 h-4 text-cyan-400" />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-cyan-300">{trends.length}</span>
              <span className="text-xs text-cyan-400 font-medium">Safe opportunities</span>
            </div>
            <p className="text-[11px] text-slate-500">100% verified platform sources</p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-sm space-y-2">
            <div className="flex items-center justify-between text-slate-400 text-xs">
              <span className="font-semibold uppercase tracking-wider">30-Day Forecasts</span>
              <Sparkles className="w-4 h-4 text-indigo-400" />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-indigo-300">{forecastCount}</span>
              <span className="text-xs text-indigo-400 font-medium">Adaptive slots</span>
            </div>
            <p className="text-[11px] text-slate-500">Re-evaluates as trends emerge</p>
          </div>
        </div>

        {/* 2-Column Main Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: High-Relevance Trends & 30-Day Calendar Quick Preview */}
          <div className="lg:col-span-2 space-y-8">
            {/* 7-Day Trend Radar Spotlight */}
            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
                    <TrendingUp className="w-4 h-4" />
                  </div>
                  <div>
                    <h2 className="text-base font-bold text-white">Top 7-Day Trend Opportunities</h2>
                    <p className="text-xs text-slate-400">Public signals filtered through KopiCraft Business Brain</p>
                  </div>
                </div>
                <Link
                  href="/radar"
                  className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
                >
                  <span>View All Radar</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              <div className="space-y-3">
                {trends.slice(0, 3).map((trend) => (
                  <div
                    key={trend.id}
                    className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/80 flex items-center justify-between gap-4 hover:border-slate-700 transition-colors"
                  >
                    <div className="space-y-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-bold">
                          {trend.platform}
                        </span>
                        <span className="text-xs font-bold text-white truncate">{trend.title}</span>
                      </div>
                      <p className="text-xs text-slate-400 line-clamp-1">{trend.summary}</p>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                      <div className="text-right">
                        <div className="text-xs font-mono font-bold text-cyan-400">
                          {trend.scores?.compositeScore ?? 90}/100
                        </div>
                        <div className="text-[10px] text-slate-500 font-mono">
                          {trend.engagementMetrics.growthRate}
                        </div>
                      </div>

                      <Link
                        href={`/studio?trendId=${trend.id}`}
                        className="px-3 py-1.5 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 hover:bg-cyan-500/20 text-xs font-semibold transition-colors"
                      >
                        Generate
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Rolling 30-Day Calendar Preview */}
            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
                    <Calendar className="w-4 h-4" />
                  </div>
                  <div>
                    <h2 className="text-base font-bold text-white">Upcoming 7-Day Content Forecast</h2>
                    <p className="text-xs text-slate-400">Live preview of planned & approved posts</p>
                  </div>
                </div>
                <Link
                  href="/calendar"
                  className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
                >
                  <span>Open Full Calendar</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {calendarSlots.slice(0, 4).map((slot, idx) => (
                  <div
                    key={slot.id}
                    className={`p-3.5 rounded-xl border flex flex-col justify-between space-y-2 ${
                      slot.hasReplacementProposal
                        ? "bg-amber-950/20 border-amber-800/80 shadow-md shadow-amber-950/30"
                        : slot.isForecast
                        ? "bg-slate-950/50 border-slate-800/80"
                        : "bg-emerald-950/20 border-emerald-800/60"
                    }`}
                  >
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="font-semibold text-slate-300">{slot.targetDate.slice(5)}</span>
                      <span
                        className={`text-[9px] px-1.5 py-0.5 rounded font-bold font-mono ${
                          slot.hasReplacementProposal
                            ? "bg-amber-900 text-amber-200"
                            : slot.isForecast
                            ? "bg-slate-800 text-slate-400"
                            : "bg-emerald-900 text-emerald-300"
                        }`}
                      >
                        {slot.hasReplacementProposal ? "REVIEW_SUGGESTED" : slot.isForecast ? "FORECAST" : "APPROVED"}
                      </span>
                    </div>

                    <p className="text-xs font-medium text-slate-200 line-clamp-2">
                      {slot.post?.title ?? "Standard Brand Post"}
                    </p>

                    <div className="text-[10px] text-slate-500 font-mono flex items-center justify-between pt-1 border-t border-slate-800/60">
                      <span>{slot.platform}</span>
                      <span>{slot.slotTime}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Auto-Post Gate & System Learning Insights */}
          <div className="space-y-8">
            {/* Auto-Post Mode Status Card */}
            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Publishing Mode</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-800 font-bold">
                  MANUAL DEFAULT
                </span>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2 text-xs">
                <div className="flex items-center gap-2 text-amber-400 font-semibold">
                  <ShieldCheck className="w-4 h-4" />
                  <span>14-Day Safety Probation</span>
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  Tenant is currently in probation mode. To ensure brand safety and fact truthfulness, Auto-Post remains
                  locked until manual approval history proves voice alignment.
                </p>
                <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden mt-1">
                  <div className="bg-amber-500 h-full w-[15%]" />
                </div>
              </div>

              {/* Connected Accounts */}
              <div className="space-y-2 pt-1">
                <p className="text-xs font-semibold text-slate-300">Connected Accounts</p>
                <div className="space-y-1.5">
                  {accounts.map((acc) => (
                    <div
                      key={acc.id}
                      className="flex items-center justify-between text-xs p-2 rounded-lg bg-slate-950/50 border border-slate-800/60"
                    >
                      <span className="text-slate-300 font-medium">{acc.platform}</span>
                      <span className="text-[11px] text-slate-400 font-mono">{acc.accountName}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Continuous Learning Insights Card */}
            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <BrainCircuit className="w-4 h-4 text-cyan-400" />
                  <h3 className="text-sm font-bold text-white">System Learning Insights</h3>
                </div>
                <Link href="/brain" className="text-xs text-cyan-400 hover:text-cyan-300 font-semibold">
                  Manage
                </Link>
              </div>

              <p className="text-xs text-slate-400 leading-relaxed">
                Refined automatically from approved, edited, and rejected posts. Verified business facts are never
                altered.
              </p>

              <div className="space-y-2.5">
                {learningPrefs.map((pref) => (
                  <div
                    key={pref.id}
                    className="p-3 rounded-xl bg-slate-950/70 border border-slate-800/80 space-y-1.5 text-xs"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-slate-300 font-mono text-[11px] truncate max-w-[170px]">
                        {pref.preferenceKey}
                      </span>
                      <span
                        className={`font-mono font-bold text-[11px] ${
                          pref.weight > 1.0 ? "text-emerald-400" : "text-amber-400"
                        }`}
                      >
                        {pref.weight > 1.0 ? `+${((pref.weight - 1) * 100).toFixed(0)}%` : `${((pref.weight - 1) * 100).toFixed(0)}%`}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-[10px] text-slate-500">
                      <span>Samples: {pref.sampleCount}</span>
                      <span>Confidence: {(pref.confidence * 100).toFixed(0)}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
