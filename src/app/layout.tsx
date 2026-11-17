import type { Metadata } from "next";
import "./globals.css";
import { Sidebar } from "@/components/layout/Sidebar";

export const metadata: Metadata = {
  title: "TrendPilot — Trend-Driven Social Media Marketing SaaS",
  description:
    "Autonomous SaaS platform researching rolling 7-day social trends, grounding with business USPs, and orchestrating a rolling 30-day content calendar.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-slate-950 text-slate-100 min-h-screen flex antialiased selection:bg-cyan-500/30 selection:text-cyan-200">
        <Sidebar />
        <main className="flex-1 min-w-0 flex flex-col h-screen overflow-y-auto">
          {children}
        </main>
      </body>
    </html>
  );
}
