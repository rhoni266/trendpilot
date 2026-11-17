"use client";

import React, { useState } from "react";
import { Header } from "@/components/layout/Header";
import {
  BrainCircuit,
  Package,
  Award,
  Users,
  MessageSquare,
  ShieldAlert,
  FileText,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  Sparkles,
  ShieldCheck,
  Plus,
} from "lucide-react";

type TabType = "PROFILE" | "PRODUCTS" | "FACTS" | "VOICE" | "RESTRICTIONS" | "PREFERENCES";

export default function BusinessBrainPage() {
  const [activeTab, setActiveTab] = useState<TabType>("FACTS");
  const [resetMessage, setResetMessage] = useState<string | null>(null);

  // In-memory demo state for facts to allow immediate interactive verification
  const [facts, setFacts] = useState([
    {
      id: "fact_01",
      claim: "All KopiCraft beans are sourced directly from Kulai, Johor with +25% premium paid above fair-trade benchmark.",
      category: "Sourcing & Ethics",
      verificationStatus: "VERIFIED",
      verifiedAt: "2026-11-15T09:00:00Z",
    },
    {
      id: "fact_02",
      claim: "Roasting takes place every Tuesday and Friday in our Bangsar roastery using a cast-iron drum roaster.",
      category: "Production Schedule",
      verificationStatus: "VERIFIED",
      verifiedAt: "2026-11-16T10:30:00Z",
    },
    {
      id: "fact_03",
      claim: "Johor Liberica variety naturally has lower titratable acidity than standard Robusta and Arabica varieties.",
      category: "Product Science",
      verificationStatus: "VERIFIED",
      verifiedAt: "2026-11-14T14:00:00Z",
    },
    {
      id: "fact_04",
      claim: "Upcoming subscription service planned to launch at 15% discount in Q1 2027.",
      category: "Roadmap",
      verificationStatus: "UNVERIFIED_NEEDS_PROOF",
      verifiedAt: null,
    },
  ]);

  const [preferences, setPreferences] = useState([
    {
      id: "pref_01",
      preferenceKey: "affinity_pillar_recipes",
      weight: 1.25,
      confidence: 0.85,
      sampleCount: 14,
      desc: "Increased appetite for cold brew mocktail tutorials and afternoon drink hacks.",
    },
    {
      id: "pref_02",
      preferenceKey: "tone_weight_playful_bilingual",
      weight: 1.15,
      confidence: 0.78,
      sampleCount: 10,
      desc: "Positive response to Malaysian bilingual Manglish/Campur phrasing (friendly barista persona).",
    },
    {
      id: "pref_03",
      preferenceKey: "avoid_format_aggressive_discount",
      weight: 0.7,
      confidence: 0.9,
      sampleCount: 8,
      desc: "Admin previously deleted hard-sell promo posts; AI penalizes pushy discount angles.",
    },
  ]);

  const handleVerifyFact = (id: string) => {
    setFacts((prev) =>
      prev.map((f) => (f.id === id ? { ...f, verificationStatus: "VERIFIED", verifiedAt: new Date().toISOString() } : f))
    );
  };

  const handleResetPreferences = () => {
    setPreferences([
      {
        id: "pref_01",
        preferenceKey: "affinity_pillar_recipes",
        weight: 1.0,
        confidence: 0.5,
        sampleCount: 0,
        desc: "Default neutral preference weight.",
      },
      {
        id: "pref_02",
        preferenceKey: "tone_weight_playful_bilingual",
        weight: 1.0,
        confidence: 0.5,
        sampleCount: 0,
        desc: "Default neutral tone weight.",
      },
      {
        id: "pref_03",
        preferenceKey: "avoid_format_aggressive_discount",
        weight: 1.0,
        confidence: 0.5,
        sampleCount: 0,
        desc: "Default format weight.",
      },
    ]);
    setResetMessage("Learned preferences reset to system baseline.");
    setTimeout(() => setResetMessage(null), 4000);
  };

  return (
    <div className="flex-1 flex flex-col pb-12">
      <Header
        title="Business Brain & Knowledge Ingestion"
        subtitle="Single Source of Truth: Verified Products, USPs, Brand Voice, and Continuous Learning Signals"
      />

      <div className="p-8 space-y-6 max-w-7xl">
        {/* Navigation Tabs */}
        <div className="flex flex-wrap items-center gap-2 border-b border-slate-800 pb-2">
          {[
            { id: "FACTS", label: "Fact Verification & Grounding", icon: FileText },
            { id: "PRODUCTS", label: "Product Catalogue & USPs", icon: Package },
            { id: "VOICE", label: "Brand Voice & Tone", icon: MessageSquare },
            { id: "RESTRICTIONS", label: "Restricted Topics", icon: ShieldAlert },
            { id: "PREFERENCES", label: "Learned Preferences", icon: BrainCircuit },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as TabType)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  isActive
                    ? "bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20"
                    : "text-slate-400 hover:text-slate-200 hover:bg-slate-900"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab 1: Facts & Verification Status (Crucial for Section 4.3 & 17 Acceptance Criteria) */}
        {activeTab === "FACTS" && (
          <div className="space-y-6">
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex items-start justify-between gap-4">
              <div className="space-y-1">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" /> Grounding Fact Verification Engine
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed max-w-3xl">
                  TrendPilot strictly distinguishes between <strong>VERIFIED</strong> business facts, claims that still
                  need proof, and unverified rumors. The AI generator is barred from inventing prices, certifications,
                  or product specs.
                </p>
              </div>

              <button
                onClick={() => {
                  const newClaim = prompt("Enter a new business fact to verify:");
                  if (newClaim) {
                    setFacts((prev) => [
                      ...prev,
                      {
                        id: `fact_${Date.now()}`,
                        claim: newClaim,
                        category: "Company Facts",
                        verificationStatus: "VERIFIED",
                        verifiedAt: new Date().toISOString(),
                      },
                    ]);
                  }
                }}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-500 text-slate-950 text-xs font-bold shrink-0 hover:bg-cyan-400"
              >
                <Plus className="w-3.5 h-3.5" /> Add Fact
              </button>
            </div>

            <div className="space-y-3">
              {facts.map((fact) => {
                const isVerified = fact.verificationStatus === "VERIFIED";
                return (
                  <div
                    key={fact.id}
                    className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between gap-4"
                  >
                    <div className="space-y-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                          {fact.category}
                        </span>
                        {isVerified ? (
                          <span className="flex items-center gap-1 text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800">
                            <CheckCircle2 className="w-3 h-3" /> VERIFIED
                          </span>
                        ) : (
                          <span className="flex items-center gap-1 text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-amber-950 text-amber-400 border border-amber-800">
                            <AlertTriangle className="w-3 h-3" /> UNVERIFIED — NEEDS PROOF
                          </span>
                        )}
                      </div>
                      <p className="text-xs font-medium text-slate-200">{fact.claim}</p>
                    </div>

                    {!isVerified && (
                      <button
                        onClick={() => handleVerifyFact(fact.id)}
                        className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shrink-0 transition-colors"
                      >
                        Verify Fact
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Tab 2: Products & USPs */}
        {activeTab === "PRODUCTS" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  title: "KopiCraft Signature Johor Liberica",
                  category: "Single Origin Beans",
                  price: "RM 48.00 / 250g",
                  usp: "Direct Kulai farmer partnership (+25% above fair trade benchmark)",
                  proof: "Verified direct trade contracts with 12 smallholder families in Kulai, Johor.",
                },
                {
                  title: "Barista Nitro-Steeped Cold Brew",
                  category: "Concentrate (500ml)",
                  price: "RM 38.00",
                  usp: "18-Hour Nitrogen Cold Steep Process",
                  proof: "Lab-tested zero oxidation; maintains smooth chocolate sweetness without bitterness.",
                },
                {
                  title: "Artisan Ceramic Pour-Over Dripper",
                  category: "Brewing Equipment",
                  price: "RM 85.00",
                  usp: "Handcrafted Malaysian Stoneware with Flow Ribs",
                  proof: "Developed in collaboration with homegrown Petaling Jaya ceramic atelier.",
                },
              ].map((prod, i) => (
                <div key={i} className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-400">
                      {prod.category}
                    </span>
                    <span className="text-xs font-bold text-cyan-400 font-mono">{prod.price}</span>
                  </div>
                  <h4 className="font-bold text-white text-sm">{prod.title}</h4>
                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800/80 space-y-1 text-xs">
                    <p className="font-semibold text-cyan-300">Core USP:</p>
                    <p className="text-slate-300">{prod.usp}</p>
                    <p className="text-[11px] text-slate-500 pt-1 font-mono">Proof: {prod.proof}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 3: Brand Voice */}
        {activeTab === "VOICE" && (
          <div className="space-y-6">
            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
              <h3 className="text-sm font-bold text-white">Brand Voice Profile & Language Rules</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Tone: Warm, passionate, knowledgeable, approachable, proud Malaysian heritage (Bukan snob kopi!).
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-900/40 space-y-2">
                  <h4 className="text-xs font-bold text-emerald-300 uppercase tracking-wider">
                    Approved Words & Phrases to Use:
                  </h4>
                  <div className="flex flex-wrap gap-1.5 text-xs">
                    {["Aromatik", "Freshly roasted", "Johor Liberica", "Kulai micro-lot", "Nikmat sebenar", "Sapot lokal"].map(
                      (w) => (
                        <span key={w} className="px-2 py-1 rounded bg-emerald-950/60 border border-emerald-800 text-emerald-200">
                          {w}
                        </span>
                      )
                    )}
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-rose-950/20 border border-rose-900/40 space-y-2">
                  <h4 className="text-xs font-bold text-rose-300 uppercase tracking-wider">
                    Words & Claims Strictly Prohibited:
                  </h4>
                  <div className="flex flex-wrap gap-1.5 text-xs">
                    {["Cheap coffee", "Instant fix", "Miracle cure", "Bitterest bean", "Burned roast"].map((w) => (
                      <span key={w} className="px-2 py-1 rounded bg-rose-950/60 border border-rose-800 text-rose-200">
                        {w}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 4: Restricted Topics */}
        {activeTab === "RESTRICTIONS" && (
          <div className="space-y-4">
            {[
              {
                topic: "Political elections, party endorsements, or boycott campaigns",
                reason: "Brand policy strictly prohibits political alignment or commercial exploitation of conflict.",
                severity: "HARD_BLOCK",
              },
              {
                topic: "Medical or disease-curing claims about coffee",
                reason: "Malaysian food & beverage advertising regulations prohibit unverified medicinal claims.",
                severity: "HARD_BLOCK",
              },
              {
                topic: "Aggressive competitor disparagement (naming other cafes negatively)",
                reason: "Brand voice focuses on elevating Malaysian coffee culture collaboratively.",
                severity: "HARD_BLOCK",
              },
            ].map((r, i) => (
              <div key={i} className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
                <div className="space-y-1">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-rose-950 text-rose-400 border border-rose-800 font-bold">
                    {r.severity}
                  </span>
                  <p className="text-xs font-bold text-white mt-1">{r.topic}</p>
                  <p className="text-[11px] text-slate-400">{r.reason}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 5: Learned Preferences Inspector */}
        {activeTab === "PREFERENCES" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between p-4 rounded-xl bg-slate-900 border border-slate-800">
              <div className="space-y-1">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <BrainCircuit className="w-4 h-4 text-cyan-400" /> Continuous Learning Preferences
                </h3>
                <p className="text-xs text-slate-400">
                  Inspectable weights refined from admin approvals, edits, and deletions. Admins maintain full reset control.
                </p>
              </div>

              <button
                onClick={handleResetPreferences}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-400 hover:bg-rose-500/20 text-xs font-semibold transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset to Default</span>
              </button>
            </div>

            {resetMessage && (
              <div className="p-3 rounded-xl bg-emerald-950 border border-emerald-800 text-xs text-emerald-300">
                {resetMessage}
              </div>
            )}

            <div className="space-y-3">
              {preferences.map((p) => (
                <div key={p.id} className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-cyan-300">{p.preferenceKey}</span>
                    <span className="font-mono text-xs font-bold text-emerald-400">Weight: {p.weight}x</span>
                  </div>
                  <p className="text-xs text-slate-300">{p.desc}</p>
                  <div className="flex items-center gap-4 text-[10px] text-slate-500 font-mono pt-1">
                    <span>Confidence: {(p.confidence * 100).toFixed(0)}%</span>
                    <span>Sample feedback events: {p.sampleCount}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
