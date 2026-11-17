import { AIProvider } from "./types";
import { MockAIProvider } from "./mockAIProvider";
import { GeminiProvider } from "./geminiProvider";

class AIOrchestrator {
  private activeProvider: AIProvider;

  constructor() {
    const providerConfig = process.env.AI_PROVIDER || "mock";
    const geminiKey = process.env.GEMINI_API_KEY;

    if (providerConfig === "gemini" && geminiKey) {
      this.activeProvider = new GeminiProvider(geminiKey);
    } else {
      this.activeProvider = new MockAIProvider();
    }
  }

  getProvider(): AIProvider {
    return this.activeProvider;
  }
}

export const ai = new AIOrchestrator().getProvider();
