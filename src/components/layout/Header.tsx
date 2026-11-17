"use client";

import React, { useState } from "react";
import { RefreshCw, Bell, Search, Check, AlertCircle } from "lucide-react";
import { TimezoneBadge } from "./TimezoneBadge";

export function Header({
  title,
  subtitle,
  onScanSuccess,
}: {
  title: string;
  subtitle?: string;
  onScanSuccess?: () => void;
}) {
  const [isScanning, setIsScanning] = useState(false);
  const [scanMessage, setScanMessage] = useState<string | null>(null);

  const handleTriggerScan = async () => {
    setIsScanning(true);
    setScanMessage(null);
    try {
      const res = await fetch("/api/trends/scan", { method: "POST" });
      const data = await res.json();
      if (data.success) {
        setScanMessage(
          `7-Day Scan Complete: ${data.newSignalsCount} signals evaluated, ${data.proposalsGenerated} calendar replacement proposals generated.`
        );
        if (onScanSuccess) onScanSuccess();
      } else {
        setScanMessage(`Scan error: ${data.error}`);
      }
    } catch (e: any) {
      setScanMessage(`Failed to trigger scan: ${e.message}`);
    } finally {
      setIsScanning(false);
      setTimeout(() => setScanMessage(null), 6000);
    }
  };

  return (
    <header className="border-b border-slate-800/80 bg-slate-950/60 backdrop-blur-md px-8 py-4 sticky top-0 z-30 flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-white tracking-tight">{title}</h1>
          {subtitle && <p className="text-xs text-slate-400 mt-0.5">{subtitle}</p>}
        </div>

        <div className="flex items-center gap-4">
          <TimezoneBadge timezone="Asia/Kuala_Lumpur" />

          {/* Trigger 7-Day Trend Scan */}
          <button
            onClick={handleTriggerScan}
            disabled={isScanning}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold shadow-sm transition-all ${
              isScanning
                ? "bg-slate-800 text-slate-400 cursor-not-allowed"
                : "bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 hover:bg-cyan-500/25 hover:border-cyan-500/50"
            }`}
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isScanning ? "animate-spin text-cyan-400" : ""}`} />
            <span>{isScanning ? "Scanning 7-Day Feeds..." : "Run 7-Day Scan"}</span>
          </button>

          {/* Notifications Button */}
          <button className="relative p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white transition-colors">
            <Bell className="w-4 h-4" />
            <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-cyan-400 ring-2 ring-slate-950" />
          </button>

          {/* User Profile avatar */}
          <div className="flex items-center gap-2 pl-2 border-l border-slate-800">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-amber-500 to-rose-500 flex items-center justify-center font-bold text-white text-xs ring-1 ring-white/20">
              SL
            </div>
            <div className="hidden lg:block text-left text-xs">
              <p className="font-semibold text-slate-200">Sarah Lim</p>
              <p className="text-[10px] text-slate-400">Admin</p>
            </div>
          </div>
        </div>
      </div>

      {scanMessage && (
        <div className="p-2.5 rounded-lg bg-cyan-950/80 border border-cyan-800/80 text-xs text-cyan-200 flex items-center gap-2 animate-in fade-in slide-in-from-top-1">
          <Check className="w-4 h-4 text-cyan-400 shrink-0" />
          <span>{scanMessage}</span>
        </div>
      )}
    </header>
  );
}
