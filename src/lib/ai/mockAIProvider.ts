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
import { ConceptType, PlatformType } from "../types";

export class MockAIProvider implements AIProvider {
  name = "MockAI Provider (Deterministic Local Engine)";

  async generatePostConcepts(input: GenerateConceptsInput): Promise<GeneratedConcept[]> {
    const { trend, product, usps, persona, brandVoice } = input;
    const prodName = product?.name ?? "Signature Artisan Coffee";
    const uspTitle = usps?.[0]?.title ?? "Direct Micro-Lot Ethical Sourcing";
    const personaName = persona?.name ?? "Coffee Enthusiasts";
    const voiceTone = brandVoice?.tone ?? "Warm, artisan, knowledgeable";

    const concepts: GeneratedConcept[] = [
      {
        conceptType: "PROBLEM_SOLUTION" as ConceptType,
        title: `The 2-Minute Solution: Beating Tropical Humidity with ${prodName}`,
        objective: `Position ${prodName} as the natural, high-performance antidote to afternoon sluggishness.`,
        targetAudience: personaName,
        trendSourceAndRationale: `Riding trend: "${trend.title}". Engagement signals show +${trend.engagementMetrics.growthRate ?? "50%"} interest in easy daytime refreshment.`,
        relevantProductAndUSP: `${prodName} — USP: ${uspTitle}`,
        openingHook: "Cuaca 34°C petang ni buat otak freeze depan laptop? Jangan minum kopi manis lekit.",
        masterCaption: `Bila hari panas terik, segelas ${prodName} adalah penyelamat sebenar. Diekstrak perlahan tanpa kepahitan dan tanpa gula tambahan. Hanya nota aromatik segar yang beri fokus padu dari tegukan pertama.`,
        masterCta: "Dapatkan botol minggu ini di link bio kami sebelum batch habis!",
        suggestedFormat: "Short-form video recipe or 3-step carousel",
        visualBrief: `Sunlit aesthetic shot of iced glass with natural condensation, placed next to a sleek bottle of ${prodName}. Warm tones, natural timber cafe counter background.`,
        safetyNotes: "100% compliant. No medical cure claims made; focuses strictly on refreshing sensory experience.",
        confidenceScore: 94,
      },
      {
        conceptType: "EDUCATIONAL" as ConceptType,
        title: `Coffee Lore Demystified: Why ${uspTitle} Matters for Your Cup`,
        objective: "Educate urban consumers on specialty processing without condescending coffee-snob jargon.",
        targetAudience: personaName,
        trendSourceAndRationale: `Addresses trend: "${trend.title}". High curiosity around bean origins and ethical value chains.`,
        relevantProductAndUSP: `${prodName} — USP: ${uspTitle}`,
        openingHook: "Kenapa specialty coffee rasa berbeza dari kopi kedai biasa? Ini rahsia yang roaster tak selalu kongsi.",
        masterCaption: `Ramai ingat kopi cuma ada satu rasa: pahit. Tapi bila biji kopi dituai pada tahap kematangan optimum di bawah penjagaan petani micro-lot, ia simpan rasa manis semula jadi seperti buah matang dan coklat gelap. ${uspTitle} bukan sekadar slogan, ia janji kesegaran terus ke cawan anda.`,
        masterCta: "Swipe left to explore the tasting notes guide, or order your freshly roasted bag today.",
        suggestedFormat: "Educational carousel infographic + roaster commentary",
        visualBrief: `Side-by-side comparison diagram showing fresh single-origin bean structure vs dark over-roasted commercial beans. Minimal typography in brand beige and charcoal.`,
        safetyNotes: "PASS. Sourcing and acidity facts verified against KopiCraft Knowledge Base.",
        confidenceScore: 92,
      },
      {
        conceptType: "BEHIND_SCENES" as ConceptType,
        title: `Roast Day Rituals: What 5 AM Looks Like Inside Our Bangsar Atelier`,
        objective: "Build authentic community connection and brand trust by revealing unvarnished daily craftsmanship.",
        targetAudience: personaName,
        trendSourceAndRationale: `Leverages trend: "${trend.title}". Video audiences crave transparency and authentic human stories over polished corporate ads.`,
        relevantProductAndUSP: `${prodName} — USP: ${uspTitle}`,
        openingHook: "Jam 5:30 pagi kat Bangsar, bila roaster drum mula panas dan aroma jasmine pertama keluar...",
        masterCaption: `Setiap batch ${prodName} dipanggang dengan perhatian rapi. Kami catat suhu setiap 30 saat untuk pastikan profil rasa kekal konsisten. Bila anda buka beg kopi ini, anda mencium kerja keras 12 keluarga peladang tempatan dan dedikasi roaster kami.`,
        masterCta: "Drop your brewing questions below — head roaster Sarah will reply directly today!",
        suggestedFormat: "Behind-the-scenes B-roll video with voiceover",
        visualBrief: "Cinematic close-up of amber roasted coffee beans cascading from the cooling tray under warm morning atelier lighting.",
        safetyNotes: "PASS. Human-led artisan storytelling.",
        confidenceScore: 89,
      },
      {
        conceptType: "SHORT_VIDEO_SCRIPT" as ConceptType,
        title: "60-Second Home Barista Hack: The Floating Cold Foam Layer",
        objective: "Drive viral saves and shares through an accessible, highly satisfying visual tutorial.",
        targetAudience: personaName,
        trendSourceAndRationale: `Trend alignment: "${trend.title}". Home cafe tutorials consistently generate 3x above-average share rates.`,
        relevantProductAndUSP: `${prodName} — USP: ${uspTitle}`,
        openingHook: "Stop buying RM18 iced lattes outside when you can make this cafe-grade floating foam in 45 seconds.",
        masterCaption: `Step 1: 50ml fresh milk in a french press, pump 20 times. Step 2: Pour 100ml ${prodName} over clear ice. Step 3: Gently float the micro-foam on top. Enjoy pure velvety luxury right at your WFH desk.`,
        masterCta: "Save this recipe for tomorrow morning and tap bio link to get your bean box!",
        suggestedFormat: "ASMR 9:16 vertical video with text overlay captions",
        visualBrief: "Slow-motion pour of dense white cold foam settling gently over dark, rich coffee concentrate in a crystal tumbler.",
        safetyNotes: "PASS. Pure culinary technique with zero exaggerated health claims.",
        confidenceScore: 96,
      },
    ];

    return concepts;
  }

  async adaptPlatformCopy(input: AdaptCopyInput): Promise<PlatformCopyResult> {
    const { concept, platform, brandVoice } = input;

    if (platform === "TIKTOK") {
      return {
        platform: "TIKTOK",
        hook: concept.openingHook,
        caption: `${concept.openingHook}\n\nCara paling senang nak dapat rasa kopi premium kat rumah tanpa mesin mahal. Save video ni untuk try esok pagi! ☕✨\n\nLink kat profile untuk batch minggu ni.`,
        callToAction: "Tap the link in bio to order your fresh roast!",
        hashtags: ["#coffeetiktok", "#malaysiacoffee", "#homebarista", "#sapotlokal", "#kopicraft"],
        aspectRatio: "9:16",
        characterCount: 195,
        platformSpecificNotes: "Fast-paced visual hook in first 2 seconds. Keep on-screen text legible on mobile screens.",
      };
    }

    if (platform === "THREADS") {
      return {
        platform: "THREADS",
        hook: concept.openingHook,
        caption: `${concept.openingHook}\n\n${concept.masterCaption}\n\nWhat's your go-to coffee ritual on a busy weekday? Are you team Pour-Over or team Cold Brew Concentrate? Drop your thoughts below 👇`,
        callToAction: "Join the conversation below!",
        hashtags: ["#CoffeeTalk", "#SapotLokal", "#SpecialtyCoffee"],
        aspectRatio: "1:1",
        characterCount: 320,
        platformSpecificNotes: "Conversational tone designed to foster discussion and quote reposts without aggressive sales jargon.",
      };
    }

    if (platform === "INSTAGRAM") {
      return {
        platform: "INSTAGRAM",
        hook: concept.openingHook,
        caption: `${concept.openingHook}\n\n${concept.masterCaption}\n\n• Origin: Kulai, Johor Micro-Lot\n• Roast Profile: Medium Craft Batch\n• Tasting Notes: Ripe Jackfruit, Floral Jasmine & Dark Cocoa\n\n${concept.masterCta}\n.\n.\n.`,
        callToAction: concept.masterCta,
        hashtags: [
          "#KopiCraft",
          "#SpecialtyCoffeeMY",
          "#BangsarEats",
          "#JohorLiberica",
          "#MalaysianCoffee",
          "#SapotLokalCoffee",
          "#SingleOriginCoffee",
          "#HomeBaristaClub",
          "#ThirdWaveCoffee",
          "#ArtisanRoastery",
        ],
        aspectRatio: "1:1",
        characterCount: 460,
        platformSpecificNotes: "High visual aesthetic. Structured line breaks with clean emoji accents for readability.",
      };
    }

    // FACEBOOK
    return {
      platform: "FACEBOOK",
      hook: concept.openingHook,
      caption: `${concept.openingHook}\n\n${concept.masterCaption}\n\nAt KopiCraft Bangsar, every bag is stamped with its verified roast date. We believe Malaysian coffee lovers deserve world-class quality while directly supporting homegrown smallholder farmers.\n\n👉 Order directly online with same-day Klang Valley delivery: https://kopicraft.my`,
      callToAction: "Order online at https://kopicraft.my",
      hashtags: ["#KopiCraft", "#MalaysianSpecialtyCoffee", "#SapotLokal", "#BangsarRoastery"],
      aspectRatio: "16:9",
      characterCount: 410,
      platformSpecificNotes: "Includes direct clickable website link and customer trust proof points.",
    };
  }

  async evaluateContentSafety(text: string, restrictedTopics: string[] = []): Promise<SafetyCheckResult> {
    const prohibitedKeywords = [
      "election",
      "political party",
      "boycott",
      "racist",
      "scam",
      "cure cancer",
      "miracle drug",
      "guaranteed rich",
      "kill",
      "hate",
      "harass",
    ];

    const lower = text.toLowerCase();
    const flagged: string[] = [];

    for (const kw of prohibitedKeywords) {
      if (lower.includes(kw)) {
        flagged.push(kw);
      }
    }

    for (const rest of restrictedTopics) {
      if (lower.includes(rest.toLowerCase())) {
        flagged.push(`Restricted topic: ${rest}`);
      }
    }

    if (flagged.length > 0) {
      return {
        outcome: "BLOCKED",
        riskScore: 95,
        reasons: [`Contains prohibited safety terms or tenant-restricted topics: ${flagged.join(", ")}`],
        flaggedKeywords: flagged,
        suggestedMitigation: "Remove all references to sensitive topics or unsupported health/political claims.",
      };
    }

    return {
      outcome: "PASS",
      riskScore: 4,
      reasons: ["No sensitive or prohibited content detected. Safe for public social media distribution."],
      flaggedKeywords: [],
    };
  }

  async generateVisualAsset(input: VisualGenerationInput): Promise<VisualGenerationResult> {
    const { visualBrief, productName, aspectRatio = "1:1" } = input;
    // Generate deterministic high-quality curated visual link
    const imageUrl = visualBrief.toLowerCase().includes("cold brew")
      ? "https://images.unsplash.com/photo-1517701604599-bb29b565090c?w=900&auto=format&fit=crop&q=80"
      : visualBrief.toLowerCase().includes("farm") || visualBrief.toLowerCase().includes("cherry")
      ? "https://images.unsplash.com/photo-1524350876685-274059332603?w=900&auto=format&fit=crop&q=80"
      : "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=900&auto=format&fit=crop&q=80";

    return {
      url: imageUrl,
      prompt: `Clean studio product photography: ${productName ?? "Artisan Coffee"}. ${visualBrief}. Professional warm directional lighting, 8k resolution, minimalist modern cafe aesthetic.`,
      provider: "MockAI Visual Studio (Brand Asset Grounded)",
      aspectRatio,
    };
  }
}
