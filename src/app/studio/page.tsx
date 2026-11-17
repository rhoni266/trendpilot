"use client";

import React, { useState, useEffect } from "react";
import { Header } from "@/components/layout/Header";
import { DeletionReasonModal } from "@/components/shared/DeletionReasonModal";
import {
  Sparkles,
  Layers,
  Send,
  Calendar,
  CheckCircle2,
  Trash2,
  RefreshCw,
  Copy,
  ShieldCheck,
  ShieldAlert,
  Camera,
  ExternalLink,
  MessageSquare,
  Hash,
} from "lucide-react";
import { PlatformType, ContentPost } from "@/lib/types";
import { GeneratedConcept } from "@/lib/ai/types";

const PLATFORMS: { id: PlatformType; name: string }[] = [
  { id: "INSTAGRAM", name: "Instagram" },
  { id: "TIKTOK", name: "TikTok" },
  { id: "THREADS", name: "Threads" },
  { id: "FACEBOOK", name: "Facebook" },
];

export default function ContentStudioPage() {
  const [selectedPlatform, setSelectedPlatform] = useState<PlatformType>("INSTAGRAM");
  const [activeConceptIndex, setActiveConceptIndex] = useState(0);
  const [hook, setHook] = useState(
    "Cuaca panas KL ni, jangan minum kopi biasa yang pekat melekit. Try this 2-minute mocktail!"
  );
  const [caption, setCaption] = useState(
    "When it's 34°C in Bangsar, our 18-Hour Barista Cold Brew Concentrate + sparkling tonic + fresh calamansi is the ultimate afternoon revival. No bitterness, zero added sugar, just pure chocolatey citrus bliss.\n\nGrab a 500ml bottle at the link in bio — makes 8 refreshing glasses at home!"
  );
  const [cta, setCta] = useState("Order link in bio to reserve this week's fresh batch.");
  const [hashtags, setHashtags] = useState("#KopiCraft #BangsarRoastery #JohorLiberica #ColdBrewMocktail #SapotLokal");
  const [visualUrl, setVisualUrl] = useState(
    "https://images.unsplash.com/photo-1517701604599-bb29b565090c?w=900&auto=format&fit=crop&q=80"
  );
  const [isDeleting, setIsDeleting] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  // Active mock post object for deletion modal
  const currentPostMock: ContentPost = {
    id: "post_active_editor",
    tenantId: "tenant_kopicraft_01",
    title: "Calamansi Cold Brew Fizz Recipe",
    masterHook: hook,
    masterCaption: caption,
    masterCta: cta,
    visualBrief: "Clean studio top-down shot of condensation-covered glass with calamansi slice and bottle.",
    safetyOutcome: "PASS",
    lifecycleStatus: "DRAFT",
    isDeleted: false,
    variants: [],
    mediaAssets: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  const handleGenerateVariations = async () => {
    setIsGenerating(true);
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ trendId: "trend_coldbrew_mocktails" }),
      });
      const data = await res.json();
      if (data.concepts && data.concepts.length > 0) {
        const c = data.concepts[0];
        setHook(c.openingHook);
        setCaption(c.masterCaption);
        setCta(c.masterCta);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleApproveAndSchedule = async () => {
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <div className="flex-1 flex flex-col pb-12">
      <Header
        title="Content Studio"
        subtitle="Multi-Concept Ideation & Platform-Adapted Copy Grounded in Verified Product Facts"
      />

      <div className="p-8 space-y-6 max-w-7xl">
        {/* Top Control Bar: Concepts & Platform Tabs */}
        <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
          {/* Concept Variations Selector */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-slate-400 mr-2 flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-cyan-400" /> Concept Angles:
            </span>
            {["Problem → Solution", "Educational Lore", "Behind Scenes", "ASMR Video Script"].map((name, i) => (
              <button
                key={name}
                onClick={() => setActiveConceptIndex(i)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  activeConceptIndex === i
                    ? "bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20"
                    : "bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800"
                }`}
              >
                {name}
              </button>
            ))}
          </div>

          {/* Regenerate AI Button */}
          <button
            onClick={handleGenerateVariations}
            disabled={isGenerating}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-indigo-500/15 border border-indigo-500/30 text-indigo-300 hover:bg-indigo-500/25 text-xs font-semibold transition-all"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isGenerating ? "animate-spin" : ""}`} />
            <span>{isGenerating ? "Regenerating Ideas..." : "Regenerate Concepts"}</span>
          </button>
        </div>

        {/* 2-Column Editor & Preview Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Copy & Platform Editor (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Platform Selector Tabs */}
            <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
              {PLATFORMS.map((plat) => (
                <button
                  key={plat.id}
                  onClick={() => setSelectedPlatform(plat.id)}
                  className={`px-4 py-2 rounded-t-lg text-xs font-bold transition-all relative ${
                    selectedPlatform === plat.id
                      ? "text-cyan-400 border-b-2 border-cyan-400 font-semibold"
                      : "text-slate-400 hover:text-slate-200"
                  }`}
                >
                  {plat.name}
                </button>
              ))}
            </div>

            {/* Grounding Fact Pill */}
            <div className="p-3 rounded-xl bg-cyan-950/20 border border-cyan-900/40 text-xs flex items-center justify-between">
              <span className="text-slate-300">
                Grounding Fact: <strong className="text-cyan-300">18-Hour Nitrogen Steep (USP 3)</strong>
              </span>
              <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800 text-[10px] font-bold">
                FACT VERIFIED
              </span>
            </div>

            {/* Hook Input */}
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-slate-200">Opening Hook</label>
              <textarea
                rows={2}
                value={hook}
                onChange={(e) => setHook(e.target.value)}
                className="w-full p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 font-medium leading-relaxed"
              />
            </div>

            {/* Main Caption Input */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="block text-xs font-semibold text-slate-200">Main Caption Copy</label>
                <span className="text-[10px] font-mono text-slate-400">{caption.length} / 2,200 chars</span>
              </div>
              <textarea
                rows={6}
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                className="w-full p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 leading-relaxed font-sans"
              />
            </div>

            {/* CTA & Hashtags */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-slate-200">Call to Action (CTA)</label>
                <input
                  type="text"
                  value={cta}
                  onChange={(e) => setCta(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-slate-200">Hashtags</label>
                <input
                  type="text"
                  value={hashtags}
                  onChange={(e) => setHashtags(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-cyan-400 font-mono focus:outline-none focus:border-cyan-500"
                />
              </div>
            </div>

            {/* Safety & Etiquette Gate Bar */}
            <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span className="text-slate-300 font-medium">Safety Check: 100% PASS</span>
              </div>
              <span className="text-[11px] text-slate-500 font-mono">Zero sensitive keywords flagged</span>
            </div>

            {/* Action Buttons: Delete with feedback vs Approve/Schedule */}
            <div className="pt-2 flex items-center justify-between border-t border-slate-800">
              <button
                onClick={() => setIsDeleting(true)}
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Delete & Learn</span>
              </button>

              <div className="flex items-center gap-3">
                <button
                  onClick={handleApproveAndSchedule}
                  className="flex items-center gap-2 px-5 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white shadow-lg shadow-cyan-500/20 transition-all"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>{isSaved ? "Saved to Calendar!" : "Approve & Schedule"}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Live Mobile Mockup Preview (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span className="font-semibold uppercase tracking-wider">Live Platform Preview</span>
              <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                {selectedPlatform} Mockup
              </span>
            </div>

            {/* Mobile Device Frame */}
            <div className="rounded-3xl border-4 border-slate-800 bg-slate-950 p-4 shadow-2xl space-y-3 max-w-sm mx-auto">
              {/* Account Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-amber-600 flex items-center justify-center font-bold text-white text-xs">
                    KC
                  </div>
                  <div>
                    <p className="text-xs font-bold text-white leading-tight">kopicraft.my</p>
                    <p className="text-[10px] text-slate-500">Bangsar, Kuala Lumpur</p>
                  </div>
                </div>
                <div className="text-slate-500 text-xs">•••</div>
              </div>

              {/* Visual Mockup */}
              <div className="relative aspect-square rounded-2xl overflow-hidden bg-slate-900 border border-slate-800">
                <img src={visualUrl} alt="Visual brief preview" className="w-full h-full object-cover" />
                <div className="absolute bottom-2 right-2 px-2 py-1 rounded bg-black/70 backdrop-blur-md text-[10px] text-white font-mono">
                  1:1 Studio Brief
                </div>
              </div>

              {/* Post Caption Preview */}
              <div className="space-y-1.5 text-xs text-slate-200">
                <p className="leading-snug">
                  <strong className="text-white mr-1.5">kopicraft.my</strong>
                  {caption.slice(0, 160)}...
                </p>
                <p className="text-cyan-400 font-mono text-[11px]">{hashtags}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Deletion Feedback Modal */}
      <DeletionReasonModal
        post={currentPostMock}
        isOpen={isDeleting}
        onClose={() => setIsDeleting(false)}
        onDeleted={() => {
          setIsDeleting(false);
          setHook("Post deleted. Learning preference weights updated.");
        }}
      />
    </div>
  );
}
