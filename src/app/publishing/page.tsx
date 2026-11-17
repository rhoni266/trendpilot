"use client";

import React, { useState } from "react";
import { Header } from "@/components/layout/Header";
import {
  Share2,
  ShieldCheck,
  ShieldAlert,
  PauseCircle,
  PlayCircle,
  AlertTriangle,
  CheckCircle2,
  Lock,
  Clock,
  RefreshCw,
  ExternalLink,
} from "lucide-react";

export default function PublishingPage() {
  const [autoPostEnabled, setAutoPostEnabled] = useState(false);
  const [isPausedAll, setIsPausedAll] = useState(false);
  const [maxDailyPosts, setMaxDailyPosts] = useState(3);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const handleToggleAutoPost = () => {
    // Check 14-day probation
    const isProbation = true;
    if (isProbation && !autoPostEnabled) {
      alert(
        "Auto-Post Blocked: Your tenant is currently in the initial 14-day learning probation period (Day 2 of 14). Manual approval is required to verify brand tone and accuracy before autonomous posting can be activated."
      );
      return;
    }
    setAutoPostEnabled(!autoPostEnabled);
  };

  const handleEmergencyPause = () => {
    setIsPausedAll(!isPausedAll);
    setStatusMessage(
      isPausedAll
        ? "Emergency pause lifted. Scheduled publishing resumed."
        : "EMERGENCY PAUSE ACTIVATED: All scheduled post dispatches have been immediately halted."
    );
    setTimeout(() => setStatusMessage(null), 5000);
  };

  return (
    <div className="flex-1 flex flex-col pb-12">
      <Header
        title="Publishing & Platform Integrations"
        subtitle="Manage Connected Accounts, Auto-Post Safety Gates, and Emergency Publishing Controls"
      />

      <div className="p-8 space-y-6 max-w-7xl">
        {statusMessage && (
          <div
            className={`p-4 rounded-xl text-xs font-semibold flex items-center gap-3 animate-in fade-in ${
              isPausedAll
                ? "bg-rose-950 border border-rose-800 text-rose-200"
                : "bg-emerald-950 border border-emerald-800 text-emerald-200"
            }`}
          >
            <AlertTriangle className="w-4 h-4 shrink-0" />
            <span>{statusMessage}</span>
          </div>
        )}

        {/* Emergency Controls Header Bar */}
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 flex flex-wrap items-center justify-between gap-4">
          <div className="space-y-1">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-amber-400" /> Emergency Controls & Kill-Switches
            </h3>
            <p className="text-xs text-slate-400">
              Instantly pause all scheduled dispatch jobs without losing draft contents or calendar history.
            </p>
          </div>

          <button
            onClick={handleEmergencyPause}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-lg ${
              isPausedAll
                ? "bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-600/20"
                : "bg-rose-600 hover:bg-rose-500 text-white shadow-rose-600/20"
            }`}
          >
            {isPausedAll ? <PlayCircle className="w-4 h-4" /> : <PauseCircle className="w-4 h-4" />}
            <span>{isPausedAll ? "Resume All Publishing" : "Pause All Publishing"}</span>
          </button>
        </div>

        {/* Connected Social Accounts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            {
              platform: "Instagram Business",
              accountName: "@kopicraft.my",
              status: "CONNECTED",
              tier: "Official Graph API (Content Publishing)",
              expiresIn: "58 days",
              autoPost: false,
            },
            {
              platform: "TikTok Creator",
              accountName: "@kopicraft.official",
              status: "CONNECTED",
              tier: "TikTok Content Posting API (Direct Post)",
              expiresIn: "84 days",
              autoPost: false,
            },
            {
              platform: "Threads",
              accountName: "@kopicraft.my",
              status: "CONNECTED",
              tier: "Official Threads Graph API",
              expiresIn: "58 days",
              autoPost: false,
            },
            {
              platform: "Facebook Page",
              accountName: "KopiCraft Malaysia",
              status: "CONNECTED",
              tier: "Meta Pages API (Page Publishing)",
              expiresIn: "60 days",
              autoPost: false,
            },
          ].map((acc, i) => (
            <div key={i} className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-white text-sm">{acc.platform}</h4>
                  <p className="text-xs text-cyan-400 font-mono mt-0.5">{acc.accountName}</p>
                </div>
                <span className="flex items-center gap-1 text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800">
                  <CheckCircle2 className="w-3 h-3 text-emerald-400" /> {acc.status}
                </span>
              </div>

              <div className="space-y-1 text-xs text-slate-400 border-t border-slate-800/80 pt-3">
                <p>
                  API Tier: <span className="text-slate-300">{acc.tier}</span>
                </p>
                <p>
                  Token Expiry: <span className="text-slate-300">{acc.expiresIn}</span>
                </p>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-slate-800/80">
                <button className="text-xs font-semibold text-slate-400 hover:text-white flex items-center gap-1">
                  <RefreshCw className="w-3 h-3" />
                  <span>Refresh Token</span>
                </button>
                <button className="text-xs font-semibold text-rose-400 hover:text-rose-300">Disconnect</button>
              </div>
            </div>
          ))}
        </div>

        {/* Auto-Post Gates Configuration */}
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-white">Autonomous Posting Safety Configuration</h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Configure conservative thresholds required before any post can publish without human sign-off.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400 font-medium">Auto-Post Mode:</span>
              <button
                onClick={handleToggleAutoPost}
                className={`w-12 h-6 rounded-full p-1 transition-colors ${
                  autoPostEnabled ? "bg-cyan-500" : "bg-slate-800"
                }`}
              >
                <div
                  className={`w-4 h-4 rounded-full bg-white transition-transform ${
                    autoPostEnabled ? "translate-x-6" : "translate-x-0"
                  }`}
                />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5 text-xs">
              <span className="font-semibold text-slate-300 flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-amber-400" /> Mandatory 14-Day Probation
              </span>
              <p className="text-[11px] text-slate-400">
                Requires minimum 14 days of manual admin approvals to train tone before auto-post unlocks.
              </p>
              <p className="text-amber-400 font-bold font-mono text-[10px] pt-1">Status: Active (12 days left)</p>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5 text-xs">
              <span className="font-semibold text-slate-300 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> Minimum Score Gate
              </span>
              <p className="text-[11px] text-slate-400">
                Only posts with Trend Score &gt;= 75 and 100% PASS safety rating can be auto-published.
              </p>
              <p className="text-emerald-400 font-bold font-mono text-[10px] pt-1">Enforced: &gt;= 75 / 100</p>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5 text-xs">
              <span className="font-semibold text-slate-300 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-cyan-400" /> Daily Post Caps
              </span>
              <p className="text-[11px] text-slate-400">
                Prevents audience fatigue by limiting maximum auto-published posts per 24 hours.
              </p>
              <p className="text-cyan-400 font-bold font-mono text-[10px] pt-1">Limit: 3 posts / day</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
