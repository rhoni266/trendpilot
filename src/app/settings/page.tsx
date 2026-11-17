"use client";

import React, { useState } from "react";
import { Header } from "@/components/layout/Header";
import {
  Settings,
  Shield,
  Users,
  Clock,
  Sparkles,
  FileText,
  CheckCircle2,
  Lock,
} from "lucide-react";

export default function SettingsPage() {
  const [timezone, setTimezone] = useState("Asia/Kuala_Lumpur");
  const [language, setLanguage] = useState("ms-MY_en");
  const [aiProvider, setAiProvider] = useState("mock");

  const auditEvents = [
    {
      id: "a1",
      action: "POST_APPROVED",
      entity: "ContentPost #1",
      user: "Sarah Lim (Admin)",
      time: "2 hours ago",
      details: "Approved Calamansi Cold Brew Fizz post for Instagram & TikTok dispatch.",
    },
    {
      id: "a2",
      action: "POST_DELETED_WITH_FEEDBACK",
      entity: "ContentPost #8",
      user: "Sarah Lim (Admin)",
      time: "5 hours ago",
      details: "Reason: TOO_PROMOTIONAL. Learning weight adjusted: avoid_format_aggressive_discount +0.15.",
    },
    {
      id: "a3",
      action: "TREND_SCAN_EXECUTED",
      entity: "TrendSignal Batch",
      user: "System Job",
      time: "12 hours ago",
      details: "168h rolling window scanned. 3 PASS signals admitted; 1 controversial political topic BLOCKED.",
    },
    {
      id: "a4",
      action: "FACT_VERIFIED",
      entity: "KnowledgeFact #1",
      user: "Sarah Lim (Admin)",
      time: "1 day ago",
      details: "Verified: All KopiCraft beans sourced directly from Kulai, Johor.",
    },
  ];

  return (
    <div className="flex-1 flex flex-col pb-12">
      <Header
        title="Settings & Immutable Audit Trail"
        subtitle="Tenant Governance, RBAC Permissions, Localization & Audited Activity Logs"
      />

      <div className="p-8 space-y-8 max-w-7xl">
        {/* Settings Configuration Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Timezone & Localization */}
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <div className="flex items-center gap-2 text-white font-bold text-sm">
              <Clock className="w-4 h-4 text-cyan-400" />
              <span>Timezone & Regional Locale</span>
            </div>
            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-400 mb-1 font-semibold">Tenant Timezone</label>
                <select
                  value={timezone}
                  onChange={(e) => setTimezone(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white text-xs"
                >
                  <option value="Asia/Kuala_Lumpur">Asia/Kuala_Lumpur (UTC+8)</option>
                  <option value="Asia/Singapore">Asia/Singapore (UTC+8)</option>
                  <option value="UTC">UTC (Universal Time)</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-400 mb-1 font-semibold">Default Language</label>
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white text-xs"
                >
                  <option value="ms-MY_en">Bahasa Malaysia & English (Campur / Bilingual)</option>
                  <option value="en">English (Official)</option>
                  <option value="ms-MY">Bahasa Malaysia (Formal)</option>
                </select>
              </div>
            </div>
          </div>

          {/* AI Engine Settings */}
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <div className="flex items-center gap-2 text-white font-bold text-sm">
              <Sparkles className="w-4 h-4 text-indigo-400" />
              <span>AI Provider Policy</span>
            </div>
            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-400 mb-1 font-semibold">Active AI Engine</label>
                <select
                  value={aiProvider}
                  onChange={(e) => setAiProvider(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white text-xs"
                >
                  <option value="mock">Local Deterministic Engine (Mock Demo)</option>
                  <option value="gemini">Google Gemini 2.0 Flash (API Key)</option>
                </select>
              </div>
              <p className="text-[11px] text-slate-500 leading-relaxed">
                Zero external dependencies required in local demo mode. Seamlessly activates Gemini 2.0 when
                GEMINI_API_KEY is supplied.
              </p>
            </div>
          </div>

          {/* RBAC Team Roles */}
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <div className="flex items-center gap-2 text-white font-bold text-sm">
              <Users className="w-4 h-4 text-emerald-400" />
              <span>Team & Role Access</span>
            </div>
            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between p-2 rounded-lg bg-slate-950 border border-slate-800">
                <span className="font-semibold text-slate-200">Sarah Lim</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800 font-bold">
                  BUSINESS_ADMIN
                </span>
              </div>
              <p className="text-[11px] text-slate-500 pt-1">
                Roles enforced at both API boundary and UI view level. Tenant data strictly isolated.
              </p>
            </div>
          </div>
        </div>

        {/* Immutable Audit Trail Table */}
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Shield className="w-4 h-4 text-cyan-400" /> Immutable Tenant Audit Log
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Every sensitive action (approvals, deletions, resets, publishing dispatches) is permanently recorded.
              </p>
            </div>
            <span className="text-xs font-mono text-slate-500">4 Events Logged</span>
          </div>

          <div className="space-y-2.5">
            {auditEvents.map((evt) => (
              <div
                key={evt.id}
                className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded bg-slate-800 text-cyan-300">
                      {evt.action}
                    </span>
                    <span className="text-slate-400">•</span>
                    <span className="text-slate-300 font-semibold">{evt.entity}</span>
                  </div>
                  <p className="text-slate-400 text-[11px]">{evt.details}</p>
                </div>

                <div className="text-right shrink-0 text-[11px] text-slate-500 font-mono">
                  <p className="text-slate-300 font-medium">{evt.user}</p>
                  <p>{evt.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
