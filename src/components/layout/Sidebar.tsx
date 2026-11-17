"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Compass,
  Sparkles,
  CalendarDays,
  BrainCircuit,
  Share2,
  BarChart3,
  Settings,
  Flame,
  ShieldCheck,
  CheckCircle2,
  Lock,
} from "lucide-react";

const NAV_ITEMS = [
  { name: "Overview", href: "/", icon: BarChart3 },
  { name: "Trend Radar", href: "/radar", icon: Compass, badge: "7-Day" },
  { name: "Content Studio", href: "/studio", icon: Sparkles },
  { name: "30-Day Calendar", href: "/calendar", icon: CalendarDays, badge: "Live" },
  { name: "Business Brain", href: "/brain", icon: BrainCircuit },
  { name: "Publishing & Accounts", href: "/publishing", icon: Share2 },
  { name: "Analytics & Learning", href: "/analytics", icon: Flame },
  { name: "Settings & Audit", href: "/settings", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 border-r border-slate-800/80 bg-slate-950/90 flex flex-col justify-between shrink-0 h-screen sticky top-0 backdrop-blur-md">
      <div>
        {/* Brand Header */}
        <div className="p-5 border-b border-slate-800/80">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-cyan-500/20 group-hover:scale-105 transition-transform">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-lg tracking-tight text-white">TrendPilot</span>
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-cyan-950 border border-cyan-800/80 text-cyan-400 font-semibold">
                  SaaS
                </span>
              </div>
              <p className="text-xs text-slate-400 truncate max-w-[140px]">KopiCraft Roasters</p>
            </div>
          </Link>
        </div>

        {/* Navigation Items */}
        <nav className="p-3 space-y-1">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center justify-between px-3.5 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  isActive
                    ? "bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 shadow-sm"
                    : "text-slate-400 hover:text-slate-200 hover:bg-slate-900/60"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 ${isActive ? "text-cyan-400" : "text-slate-400"}`} />
                  <span>{item.name}</span>
                </div>
                {item.badge && (
                  <span
                    className={`text-[10px] px-1.5 py-0.5 rounded font-mono font-semibold ${
                      item.badge === "7-Day"
                        ? "bg-indigo-950 text-indigo-400 border border-indigo-800"
                        : "bg-emerald-950 text-emerald-400 border border-emerald-800"
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Tenant Status Footer */}
      <div className="p-4 border-t border-slate-800/80 bg-slate-900/40 space-y-3">
        <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-800/80 text-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-slate-400 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> Mode
            </span>
            <span className="font-semibold px-2 py-0.5 rounded bg-amber-950/80 border border-amber-800/60 text-amber-300 text-[10px]">
              Manual Approval
            </span>
          </div>
          <div className="flex items-center justify-between text-[11px] text-slate-400">
            <span className="flex items-center gap-1">
              <Lock className="w-3 h-3 text-slate-400" /> 14d Probation
            </span>
            <span className="text-amber-400 font-mono font-medium">Day 2 / 14</span>
          </div>
        </div>

        <div className="flex items-center gap-2 px-1 text-xs text-slate-400">
          <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
          <span>Local Demo Mode (Mock APIs)</span>
        </div>
      </div>
    </aside>
  );
}
