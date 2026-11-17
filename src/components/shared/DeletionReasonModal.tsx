"use client";

import React, { useState } from "react";
import { AlertTriangle, Trash2, X, BrainCircuit, Check } from "lucide-react";
import { ContentPost, DeletionReasonCategory } from "@/lib/types";

const REASON_OPTIONS: { value: DeletionReasonCategory; label: string; desc: string }[] = [
  { value: "NOT_RELEVANT", label: "Not relevant to our business", desc: "Doesn't connect meaningfully to our products or USPs." },
  { value: "TREND_OUTDATED", label: "Trend is already outdated", desc: "Momentum has passed or format feels stale." },
  { value: "WRONG_AUDIENCE", label: "Wrong target audience", desc: "Doesn't appeal to our core personas." },
  { value: "VOICE_MISMATCH", label: "Does not match our brand voice", desc: "Tone feels off, too generic, or inappropriate." },
  { value: "WEAK_COPY", label: "Copywriting is weak or uninspired", desc: "Hook or body lacks persuasive punch." },
  { value: "UNSUITABLE_VISUAL", label: "Visual/image is unsuitable", desc: "Asset doesn't fit our visual identity." },
  { value: "INACCURATE_FACTS", label: "Inaccurate business or product facts", desc: "Mentions wrong specs, price, or unapproved claims." },
  { value: "TOO_PROMOTIONAL", label: "Too promotional or repetitive", desc: "Too hard-sell or repeats recent content angles." },
  { value: "SENSITIVE_TOPIC", label: "Sensitive or inappropriate topic", desc: "Touches controversy or brand risk." },
  { value: "OFFER_CHANGED", label: "Campaign or offer has changed", desc: "Promotion is expired or superseded." },
  { value: "OTHER", label: "Other reason", desc: "Specify custom feedback below." },
];

interface DeletionReasonModalProps {
  post: ContentPost;
  isOpen: boolean;
  onClose: () => void;
  onDeleted: () => void;
}

export function DeletionReasonModal({ post, isOpen, onClose, onDeleted }: DeletionReasonModalProps) {
  const [selectedReason, setSelectedReason] = useState<DeletionReasonCategory | "">("");
  const [improvementText, setImprovementText] = useState("");
  const [otherText, setOtherText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleConfirmDelete = async () => {
    if (!selectedReason) {
      setError("Please select a reason category. This feedback refines future AI recommendations.");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const res = await fetch(`/api/posts/${post.id}/delete`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          reasonCategory: selectedReason,
          reasonDetails: selectedReason === "OTHER" ? otherText : undefined,
          improvementText: improvementText.trim() || undefined,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to delete post");
      }

      onDeleted();
      onClose();
    } catch (e: any) {
      setError(e.message || "Failed to submit deletion feedback");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950/50">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400">
              <Trash2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Delete Post & Refine AI Learning</h3>
              <p className="text-xs text-slate-400">Your feedback adjusts weights for future recommendations</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-5 text-sm">
          {/* Post Preview Summary */}
          <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/80 space-y-1.5">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span className="font-semibold text-slate-300 truncate max-w-[280px]">{post.title}</span>
              <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                {post.lifecycleStatus}
              </span>
            </div>
            <p className="text-xs text-slate-400 line-clamp-2 italic">"{post.masterHook}"</p>
          </div>

          {/* Reason Selection */}
          <div className="space-y-2.5">
            <label className="block text-xs font-semibold text-slate-200">
              Why should this post be removed? <span className="text-rose-400">*</span>
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-56 overflow-y-auto pr-1">
              {REASON_OPTIONS.map((opt) => (
                <button
                  type="button"
                  key={opt.value}
                  onClick={() => {
                    setSelectedReason(opt.value);
                    setError(null);
                  }}
                  className={`text-left p-2.5 rounded-xl border text-xs transition-all flex flex-col justify-between ${
                    selectedReason === opt.value
                      ? "bg-rose-500/10 border-rose-500 text-rose-200 font-medium shadow-sm"
                      : "bg-slate-950/40 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-300"
                  }`}
                >
                  <span className="font-semibold text-slate-200">{opt.label}</span>
                  <span className="text-[10px] text-slate-500 mt-0.5">{opt.desc}</span>
                </button>
              ))}
            </div>
          </div>

          {selectedReason === "OTHER" && (
            <div>
              <label className="block text-xs font-semibold text-slate-200 mb-1">Details on other reason:</label>
              <input
                type="text"
                value={otherText}
                onChange={(e) => setOtherText(e.target.value)}
                placeholder="Explain why this content was unsuitable..."
                className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
              />
            </div>
          )}

          {/* Improvement Input */}
          <div>
            <label className="block text-xs font-semibold text-slate-200 mb-1">
              What would make the next post better? <span className="text-slate-500 font-normal">(Optional)</span>
            </label>
            <textarea
              rows={2}
              value={improvementText}
              onChange={(e) => setImprovementText(e.target.value)}
              placeholder="e.g. Focus more on Kulai farmer stories rather than discounts; use more Bahasa Malaysia phrases."
              className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
            />
          </div>

          {/* Learning Signal Notice */}
          <div className="flex items-start gap-2.5 p-3 rounded-xl bg-cyan-950/30 border border-cyan-800/40 text-xs text-cyan-300">
            <BrainCircuit className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
            <p className="text-[11px] leading-relaxed">
              This feedback automatically refines your business's <strong>Learning Preferences</strong> (e.g. adjusts
              pillar weights, penalizes repetitive formats). Preferences can be reviewed anytime in Business Brain.
            </p>
          </div>

          {error && (
            <div className="p-2.5 rounded-lg bg-rose-950/80 border border-rose-800 text-xs text-rose-300 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 shrink-0 text-rose-400" />
              <span>{error}</span>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-950 flex items-center justify-between">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-lg text-xs font-medium text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            Cancel
          </button>

          <button
            type="button"
            disabled={isSubmitting}
            onClick={handleConfirmDelete}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold bg-rose-600 hover:bg-rose-500 text-white transition-colors disabled:opacity-50"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>{isSubmitting ? "Deleting & Learning..." : "Confirm Deletion"}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
