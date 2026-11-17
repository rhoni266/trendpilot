import {
  AIProvider,
  GenerateConceptsInput,
  GeneratedConcept,
  AdaptCopyInput,
  PlatformCopyResult,
  VisualGenerationInput,
  VisualGenerationResult,
  SafetyCheckResult,
} from "./types";
import { MockAIProvider } from "./mockAIProvider";

export class GeminiProvider implements AIProvider {
  name = "Google Gemini Provider (Gemini 2.0 Flash)";
  private apiKey: string;
  private fallback: MockAIProvider;

  constructor(apiKey = process.env.GEMINI_API_KEY ?? "") {
    this.apiKey = apiKey;
    this.fallback = new MockAIProvider();
  }

  async generatePostConcepts(input: GenerateConceptsInput): Promise<GeneratedConcept[]> {
    if (!this.apiKey) {
      return this.fallback.generatePostConcepts(input);
    }

    try {
      const prompt = `You are the lead social media strategist and copywriter for ${input.product?.name ?? "an artisan business"}.
Trend context:
Title: ${input.trend.title}
Category: ${input.trend.category}
Summary: ${input.trend.summary}

Product knowledge:
Product: ${input.product?.name}
Features: ${JSON.stringify(input.product?.features)}
Benefits: ${JSON.stringify(input.product?.benefits)}
USPs: ${JSON.stringify(input.usps?.map((u) => u.title))}
Brand Voice: ${input.brandVoice?.tone}
Allowed Words: ${JSON.stringify(input.brandVoice?.wordsToUse)}
Avoid Words: ${JSON.stringify(input.brandVoice?.wordsToAvoid)}
Audience: ${input.persona?.name} (Pain points: ${JSON.stringify(input.persona?.painPoints)})

Generate 4 distinctly different post concepts (e.g. Problem-Solution, Educational, Behind-The-Scenes, Short Video Script) in JSON format matching the schema:
[{
  "conceptType": "EDUCATIONAL" | "PROBLEM_SOLUTION" | "BEHIND_SCENES" | "SHORT_VIDEO_SCRIPT",
  "title": string,
  "objective": string,
  "targetAudience": string,
  "trendSourceAndRationale": string,
  "relevantProductAndUSP": string,
  "openingHook": string,
  "masterCaption": string,
  "masterCta": string,
  "suggestedFormat": string,
  "visualBrief": string,
  "safetyNotes": string,
  "confidenceScore": number
}]
Return ONLY valid JSON.`;

      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${this.apiKey}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
            generationConfig: { responseMimeType: "application/json" },
          }),
        }
      );

      if (!res.ok) {
        console.warn("Gemini API call failed, using fallback MockAIProvider:", res.statusText);
        return this.fallback.generatePostConcepts(input);
      }

      const data = await res.json();
      const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
      if (!text) return this.fallback.generatePostConcepts(input);

      const parsed = JSON.parse(text);
      return Array.isArray(parsed) ? parsed : this.fallback.generatePostConcepts(input);
    } catch (e) {
      console.warn("Gemini error:", e);
      return this.fallback.generatePostConcepts(input);
    }
  }

  async adaptPlatformCopy(input: AdaptCopyInput): Promise<PlatformCopyResult> {
    if (!this.apiKey) return this.fallback.adaptPlatformCopy(input);
    return this.fallback.adaptPlatformCopy(input);
  }

  async evaluateContentSafety(text: string, restrictedTopics: string[] = []): Promise<SafetyCheckResult> {
    return this.fallback.evaluateContentSafety(text, restrictedTopics);
  }

  async generateVisualAsset(input: VisualGenerationInput): Promise<VisualGenerationResult> {
    return this.fallback.generateVisualAsset(input);
  }
}
