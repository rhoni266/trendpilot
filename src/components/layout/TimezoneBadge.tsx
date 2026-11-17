"use client";

import React, { useState, useEffect } from "react";
import { Clock, Globe } from "lucide-react";

export function TimezoneBadge({ timezone = "Asia/Kuala_Lumpur" }: { timezone?: string }) {
  const [timeStr, setTimeStr] = useState<string>("");

  useEffect(() => {
    function updateTime() {
      try {
        const now = new Date();
        const formatted = new Intl.DateTimeFormat("en-GB", {
          timeZone: timezone,
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        }).format(now);
        setTimeStr(formatted);
      } catch {
        setTimeStr(new Date().toLocaleTimeString());
      }
    }

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, [timezone]);

  return (
    <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/80 border border-slate-800 text-xs text-slate-300 font-mono shadow-inner">
      <Globe className="w-3.5 h-3.5 text-cyan-400" />
      <span className="font-sans font-medium text-slate-400 hidden sm:inline">{timezone}</span>
      <span className="text-slate-500 hidden sm:inline">•</span>
      <Clock className="w-3 h-3 text-cyan-400" />
      <span className="text-cyan-300 font-semibold">{timeStr || "--:--:--"}</span>
    </div>
  );
}
