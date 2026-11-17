import fs from "fs";
import path from "path";
import {
  Tenant,
  User,
  Membership,
  BusinessProfile,
  Product,
  ProductUSP,
  AudiencePersona,
  BrandVoiceProfile,
  BrandAsset,
  KnowledgeDocument,
  KnowledgeFact,
  ApprovedClaim,
  RestrictedTopic,
  SocialAccount,
  PlatformCapability,
  TrendSignal,
  TrendScore,
  ContentPillar,
  ContentIdea,
  ContentPost,
  ContentVariant,
  MediaAsset,
  ContentVersion,
  CalendarSlot,
  Approval,
  DeletionFeedback,
  LearningPreference,
  PublishingJob,
  PostMetricSnapshot,
  NotificationItem,
  AuditLog,
} from "./types";

interface DatabaseSchema {
  tenants: Tenant[];
  users: User[];
  memberships: Membership[];
  businessProfiles: BusinessProfile[];
  products: Product[];
  productUSPs: ProductUSP[];
  audiencePersonas: AudiencePersona[];
  brandVoices: BrandVoiceProfile[];
  brandAssets: BrandAsset[];
  knowledgeDocuments: KnowledgeDocument[];
  knowledgeFacts: KnowledgeFact[];
  approvedClaims: ApprovedClaim[];
  restrictedTopics: RestrictedTopic[];
  socialAccounts: SocialAccount[];
  platformCapabilities: PlatformCapability[];
  trendSignals: TrendSignal[];
  trendScores: TrendScore[];
  contentPillars: ContentPillar[];
  contentIdeas: ContentIdea[];
  contentPosts: ContentPost[];
  contentVariants: ContentVariant[];
  mediaAssets: MediaAsset[];
  contentVersions: ContentVersion[];
  calendarSlots: CalendarSlot[];
  approvals: Approval[];
  deletionFeedbacks: DeletionFeedback[];
  learningPreferences: LearningPreference[];
  publishingJobs: PublishingJob[];
  postMetricSnapshots: PostMetricSnapshot[];
  notifications: NotificationItem[];
  auditLogs: AuditLog[];
}

const DB_DIR = path.join(process.cwd(), "data");
const DB_FILE = path.join(DB_DIR, "db.json");

function ensureDirectoryExists(dirPath: string) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

function getInitialData(): DatabaseSchema {
  const tenantId = "tenant_kopicraft_01";
  const now = new Date();
  const probationEnds = new Date(now.getTime() + 14 * 24 * 60 * 60 * 1000);

  const tenant: Tenant = {
    id: tenantId,
    name: "KopiCraft Artisan Roasters",
    slug: "kopicraft-my",
    plan: "GROWTH",
    status: "ACTIVE",
    timezone: "Asia/Kuala_Lumpur",
    defaultLanguage: "ms-MY_en",
    autoPostEnabled: false,
    probationEndsAt: probationEnds.toISOString(),
    maxDailyPosts: 3,
    allowedPostDays: ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"],
    allowedTimeWindows: [
      { start: "09:00", end: "12:00" },
      { start: "14:00", end: "18:00" },
      { start: "20:00", end: "22:00" },
    ],
    createdAt: now.toISOString(),
    updatedAt: now.toISOString(),
  };

  const user: User = {
    id: "user_owner_01",
    email: "sarah@kopicraft.my",
    name: "Sarah Lim (Lead Roaster & Founder)",
    avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    createdAt: now.toISOString(),
  };

  const membership: Membership = {
    id: "mem_01",
    tenantId,
    userId: user.id,
    role: "BUSINESS_ADMIN",
    createdAt: now.toISOString(),
  };

  const businessProfile: BusinessProfile = {
    id: "profile_01",
    tenantId,
    industry: "Specialty Coffee Roastery & F&B Retail",
    location: "Bangsar, Kuala Lumpur, Malaysia",
    website: "https://kopicraft.my",
    contactEmail: "hello@kopicraft.my",
    phone: "+60 3-2284 8899",
    summary:
      "Independent specialty coffee roastery pioneering micro-lot Johor Liberica and ethical single-origin beans, roasted fresh in small batches in Bangsar.",
    createdAt: now.toISOString(),
    updatedAt: now.toISOString(),
  };

  const prod1Id = "prod_liberica_01";
  const prod2Id = "prod_coldbrew_02";
  const prod3Id = "prod_dripper_03";

  const products: Product[] = [
    {
      id: prod1Id,
      tenantId,
      name: "KopiCraft Signature Johor Liberica (250g)",
      category: "Single Origin Whole Beans",
      description: "Rare micro-lot Liberica from Kulai, Johor. Distinct floral jasmine aroma with sweet jackfruit and dark cocoa finish.",
      price: "RM 48.00",
      features: [
        "100% Kulai Johor high-elevation Liberica",
        "Medium roast for balanced sweetness",
        "Roasted weekly in small 12kg drum batches",
      ],
      benefits: [
        "Naturally low acidity cup that is gentle on sensitive stomachs",
        "Celebrates authentic Malaysian heritage coffee with third-wave craftsmanship",
        "Direct trade ensures ethical farmer wages (+25% above fair trade benchmark)",
      ],
      differentiators: [
        "First specialty roaster to earn SCA cupping score 85+ for Malaysian Liberica",
        "Guaranteed roast date stamped on every valve bag",
      ],
      isActive: true,
      createdAt: now.toISOString(),
    },
    {
      id: prod2Id,
      tenantId,
      name: "Barista Nitro-Steeped Cold Brew (500ml)",
      category: "Ready to Drink / Concentrate",
      description: "18-hour cold drip extraction using Sumatra Gayo and Johor Liberica. Silky, chocolatey, zero bitter bite.",
      price: "RM 38.00",
      features: [
        "18-hour cold drip extraction",
        "1:2 dilution ratio (yields 6-8 glasses)",
        "Zero added sugars, no preservatives",
      ],
      benefits: [
        "Instant cafe-quality iced latte at your office desk",
        "Smooth natural sweetness without syrup",
      ],
      differentiators: ["Filtered with quadruple micro-mesh to eliminate all sediment and bitterness"],
      isActive: true,
      createdAt: now.toISOString(),
    },
    {
      id: prod3Id,
      tenantId,
      name: "Artisan Ceramic Pour-Over Dripper Set",
      category: "Brewing Equipment",
      description: "Locally handcrafted ceramic dripper with 12 interior spiral ribs designed for optimal extraction flow rate.",
      price: "RM 85.00",
      features: ["Handcrafted Malaysian stoneware", "Custom spiral extraction ribs", "Includes 40 unbleached filters"],
      benefits: ["Even water saturation eliminates channeling", "Retains brew heat 30% longer than plastic drippers"],
      differentiators: ["Collaborative design with homegrown ceramic atelier in Petaling Jaya"],
      isActive: true,
      createdAt: now.toISOString(),
    },
  ];

  const productUSPs: ProductUSP[] = [
    {
      id: "usp_01",
      productId: prod1Id,
      title: "Direct Johor Farmer Micro-Lot Partnership",
      description: "We work directly with 12 multi-generation smallholder farming families in Kulai, Johor.",
      proofPoint: "Direct trade contract certificates and batch QR code linking directly to farm coordinates.",
      isVerified: true,
      createdAt: now.toISOString(),
    },
    {
      id: "usp_02",
      productId: prod1Id,
      title: "Freshness Guaranteed: 48-Hour Roast-to-Pouch",
      description: "Every order is packed and dispatched within 48 hours of being roasted.",
      proofPoint: "Roast date handwritten and heat-embossed on each package.",
      isVerified: true,
      createdAt: now.toISOString(),
    },
    {
      id: "usp_03",
      productId: prod2Id,
      title: "18-Hour Nitrogen Cold Steep Process",
      description: "Slow-steeped under nitrogen blanket to preserve delicate volatile aromas without oxidation.",
      proofPoint: "Lab-tested zero oxidation and shelf-life of 28 days refrigerated without additives.",
      isVerified: true,
      createdAt: now.toISOString(),
    },
  ];

  const audiencePersonas: AudiencePersona[] = [
    {
      id: "persona_01",
      tenantId,
      name: "Urban Coffee Explorer (Afiq & Chloe)",
      ageRange: "24-38",
      painPoints: [
        "Tired of burnt, bitter commercial chain coffee",
        "Wants to support genuine Malaysian craft but finds specialty beans intimidating",
        "Values aesthetic packaging and transparent sourcing",
      ],
      motivations: ["Experiencing unique regional flavor profiles", "Weekend café hopping & home brewing ritual"],
      preferredPlatforms: ["INSTAGRAM", "THREADS", "TIKTOK"],
      preferredLanguages: ["English", "Bahasa Malaysia (Campur/Manglish friendly)"],
      createdAt: now.toISOString(),
    },
    {
      id: "persona_02",
      tenantId,
      name: "Busy WFH Professional / Office Team Lead (Mei Ling)",
      ageRange: "28-45",
      painPoints: [
        "Needs quick high-grade coffee between back-to-back Zoom meetings",
        "Frustrated by mediocre instant coffee pods and mess of grounds during busy workdays",
      ],
      motivations: ["Convenience without compromising premium artisan taste", "Team pantry coffee upgrades"],
      preferredPlatforms: ["INSTAGRAM", "FACEBOOK", "THREADS"],
      preferredLanguages: ["English", "Bahasa Malaysia"],
      createdAt: now.toISOString(),
    },
  ];

  const brandVoices: BrandVoiceProfile[] = [
    {
      id: "bvoice_01",
      tenantId,
      tone: "Warm, passionate, knowledgeable, approachable, proud Malaysian heritage (Bukan snob kopi!)",
      personalityTraits: ["Artisan Roaster", "Friendly Barista Kakak/Abang", "Coffee Lore Enthusiast", "Community Builder"],
      wordsToUse: [
        "Aromatik",
        "Freshly roasted",
        "Johor Liberica",
        "Kulai micro-lot",
        "Nikmat sebenar",
        "Craft batch",
        "Sapot lokal",
        "Notes of jackfruit & chocolate",
      ],
      wordsToAvoid: [
        "Cheap coffee",
        "Instant fix",
        "Miracle cure",
        "Bitterest bean",
        "Burned roast",
        "Fake syrup",
      ],
      mixedLanguageAllowed: true,
      createdAt: now.toISOString(),
    },
  ];

  const knowledgeFacts: KnowledgeFact[] = [
    {
      id: "fact_01",
      tenantId,
      claim: "All KopiCraft beans are sourced directly from Kulai, Johor with +25% premium paid above fair-trade benchmark.",
      category: "Sourcing & Ethics",
      verificationStatus: "VERIFIED",
      verifiedAt: now.toISOString(),
      createdAt: now.toISOString(),
    },
    {
      id: "fact_02",
      tenantId,
      claim: "Roasting takes place every Tuesday and Friday in our Bangsar roastery using a cast-iron drum roaster.",
      category: "Production Schedule",
      verificationStatus: "VERIFIED",
      verifiedAt: now.toISOString(),
      createdAt: now.toISOString(),
    },
    {
      id: "fact_03",
      tenantId,
      claim: "Johor Liberica variety naturally has lower titratable acidity than standard Robusta and Arabica varieties.",
      category: "Product Science",
      verificationStatus: "VERIFIED",
      verifiedAt: now.toISOString(),
      createdAt: now.toISOString(),
    },
    {
      id: "fact_04",
      tenantId,
      claim: "Upcoming subscription service planned to launch at 15% discount in Q1 2027.",
      category: "Roadmap",
      verificationStatus: "UNVERIFIED_NEEDS_PROOF",
      createdAt: now.toISOString(),
    },
  ];

  const restrictedTopics: RestrictedTopic[] = [
    {
      id: "rest_01",
      tenantId,
      topic: "Political elections, party endorsements, or boycott campaigns",
      reason: "Brand policy strictly prohibits political alignment or exploitation of public political debates.",
      severity: "HARD_BLOCK",
      createdAt: now.toISOString(),
    },
    {
      id: "rest_02",
      tenantId,
      topic: "Medical or disease-curing claims about coffee",
      reason: "Regulatory advertising laws in Malaysia prohibit unsupported medicinal claims for food & beverage products.",
      severity: "HARD_BLOCK",
      createdAt: now.toISOString(),
    },
    {
      id: "rest_03",
      tenantId,
      topic: "Aggressive competitor disparagement (naming other cafes negatively)",
      reason: "Our brand voice focuses on elevating local coffee culture respectfully, not tearing competitors down.",
      severity: "HARD_BLOCK",
      createdAt: now.toISOString(),
    },
  ];

  const socialAccounts: SocialAccount[] = [
    {
      id: "acc_ig_01",
      tenantId,
      platform: "INSTAGRAM",
      accountName: "@kopicraft.my",
      externalAccountId: "ig_act_982341201",
      autoPostEnabled: false,
      status: "CONNECTED",
      createdAt: now.toISOString(),
    },
    {
      id: "acc_tt_02",
      tenantId,
      platform: "TIKTOK",
      accountName: "@kopicraft.official",
      externalAccountId: "tt_act_748291039",
      autoPostEnabled: false,
      status: "CONNECTED",
      createdAt: now.toISOString(),
    },
    {
      id: "acc_th_03",
      tenantId,
      platform: "THREADS",
      accountName: "@kopicraft.my",
      externalAccountId: "th_act_102938475",
      autoPostEnabled: false,
      status: "CONNECTED",
      createdAt: now.toISOString(),
    },
    {
      id: "acc_fb_04",
      tenantId,
      platform: "FACEBOOK",
      accountName: "KopiCraft Artisan Roasters",
      externalAccountId: "fb_page_593820194",
      autoPostEnabled: false,
      status: "CONNECTED",
      createdAt: now.toISOString(),
    },
  ];

  const platformCapabilities: PlatformCapability[] = [
    {
      id: "cap_ig",
      platform: "INSTAGRAM",
      supportsTrends: true,
      supportsPublishing: true,
      supportsScheduledPublishing: true,
      supportsAnalytics: true,
      tier: "OFFICIAL_GRAPH_API",
    },
    {
      id: "cap_tt",
      platform: "TIKTOK",
      supportsTrends: true,
      supportsPublishing: true,
      supportsScheduledPublishing: true,
      supportsAnalytics: true,
      tier: "MOCK_DEMO",
    },
    {
      id: "cap_th",
      platform: "THREADS",
      supportsTrends: true,
      supportsPublishing: true,
      supportsScheduledPublishing: true,
      supportsAnalytics: true,
      tier: "OFFICIAL_GRAPH_API",
    },
    {
      id: "cap_fb",
      platform: "FACEBOOK",
      supportsTrends: true,
      supportsPublishing: true,
      supportsScheduledPublishing: true,
      supportsAnalytics: true,
      tier: "OFFICIAL_GRAPH_API",
    },
  ];

  // 7-day Rolling Trend Signals (Verified timestamps within the last 168 hours)
  const d1 = new Date(now.getTime() - 1 * 24 * 60 * 60 * 1000).toISOString();
  const d2 = new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000).toISOString();
  const d3 = new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000).toISOString();
  const d4 = new Date(now.getTime() - 4 * 24 * 60 * 60 * 1000).toISOString();
  const d5 = new Date(now.getTime() - 5 * 24 * 60 * 60 * 1000).toISOString();

  const trend1: TrendSignal = {
    id: "trend_farm_to_cup",
    tenantId,
    platform: "INSTAGRAM",
    title: "#SapotLokal Single-Origin Coffee Origin Stories",
    summary:
      "Surge in Southeast Asian coffee drinkers wanting to know the exact estate, farmer name, and altitude of their morning brew. High engagement on reels showing real farm harvesting.",
    category: "EMERGING_TOPIC",
    firstObservedAt: d4,
    lastObservedAt: d1,
    sourceUrl: "https://instagram.com/explore/tags/sapotlokalcoffee",
    engagementMetrics: { views: 840000, likes: 62000, shares: 14200, growthRate: "+64% vs last week", velocityScore: 89 },
    isExcluded: false,
    safetyStatus: "PASS",
    createdAt: d4,
  };

  const score1: TrendScore = {
    id: "score_01",
    trendSignalId: trend1.id,
    tenantId,
    recencyScore: 92,
    momentumScore: 88,
    businessRelevanceScore: 98,
    audienceFitScore: 94,
    platformFitScore: 90,
    brandFitScore: 96,
    commercialUsefulnessScore: 92,
    compositeScore: 94.2,
    explanation:
      "Extremely strong fit. Directly matches KopiCraft's core USP of Kulai Johor micro-lot direct trade. Audiences in KL are actively engaging with ethical origin storytelling.",
    matchedProductIds: [prod1Id],
    matchedUSPIds: ["usp_01"],
    suggestedAngle: "Take followers behind the scenes with Uncle Tan in Kulai — show the distinct giant Liberica cherries and explain why our direct trade puts RM directly into farmers' hands.",
    calculatedAt: d1,
  };
  trend1.scores = score1;

  const trend2: TrendSignal = {
    id: "trend_coldbrew_mocktails",
    tenantId,
    platform: "TIKTOK",
    title: "Refreshing Cold Brew Spritz & Tropical Mocktails",
    summary:
      "Creators sharing easy 2-minute afternoon mocktails mixing cold brew concentrate with tonic, calamansi, and sparkling soda to beat the humid 34°C afternoon heat.",
    category: "POPULAR_FORMAT",
    firstObservedAt: d3,
    lastObservedAt: d1,
    sourceUrl: "https://tiktok.com/tag/coldbrewmocktail",
    engagementMetrics: { views: 1250000, likes: 110000, shares: 38000, growthRate: "+82%", velocityScore: 95 },
    isExcluded: false,
    safetyStatus: "PASS",
    createdAt: d3,
  };

  const score2: TrendScore = {
    id: "score_02",
    trendSignalId: trend2.id,
    tenantId,
    recencyScore: 95,
    momentumScore: 94,
    businessRelevanceScore: 90,
    audienceFitScore: 92,
    platformFitScore: 96,
    brandFitScore: 88,
    commercialUsefulnessScore: 95,
    compositeScore: 92.4,
    explanation:
      "High commercial viability. Connects perfectly to Barista Nitro Cold Brew concentrate. Highly shareable DIY recipe format popular among urban office workers.",
    matchedProductIds: [prod2Id],
    matchedUSPIds: ["usp_03"],
    suggestedAngle: "15-second recipe reel: 'The Bangsar Calamansi Cold Brew Tonic' using 50ml KopiCraft concentrate + fresh calamansi + tonic water.",
    calculatedAt: d1,
  };
  trend2.scores = score2;

  const trend3: TrendSignal = {
    id: "trend_coffee_myths",
    tenantId,
    platform: "THREADS",
    title: "Debunking 'Dark Roast Has More Caffeine' Myth",
    summary:
      "Viral discussion thread on caffeine extraction misconceptions. Educational content comparing bean densities and explaining why lighter roasts retain caffeine.",
    category: "AUDIENCE_QUESTION",
    firstObservedAt: d2,
    lastObservedAt: d1,
    sourceUrl: "https://threads.net/trending/topic/coffee-myths",
    engagementMetrics: { views: 420000, likes: 29000, shares: 8100, growthRate: "+41%", velocityScore: 82 },
    isExcluded: false,
    safetyStatus: "PASS",
    createdAt: d2,
  };

  const score3: TrendScore = {
    id: "score_03",
    trendSignalId: trend3.id,
    tenantId,
    recencyScore: 90,
    momentumScore: 82,
    businessRelevanceScore: 86,
    audienceFitScore: 88,
    platformFitScore: 94,
    brandFitScore: 95,
    commercialUsefulnessScore: 84,
    compositeScore: 87.8,
    explanation:
      "Establishes KopiCraft's authority as craft roasters. Demystifies roast profiles without condescending jargon.",
    matchedProductIds: [prod1Id],
    matchedUSPIds: ["usp_02"],
    suggestedAngle: "Punchy Threads carousel: 'Why that pitch-black roast isn't giving you more energy (and what's actually happening in the roaster)'.",
    calculatedAt: d1,
  };
  trend3.scores = score3;

  const trend4: TrendSignal = {
    id: "trend_boycott_controversy",
    tenantId,
    platform: "TIKTOK",
    title: "Partisan Political Boycott Debates",
    summary:
      "Polarizing comment wars around political party affiliations and boycott lists targeting multinational retail chains.",
    category: "EMERGING_TOPIC",
    firstObservedAt: d5,
    lastObservedAt: d2,
    sourceUrl: "https://tiktok.com/tag/politicsmy",
    engagementMetrics: { views: 3100000, likes: 210000, growthRate: "+120%", velocityScore: 98 },
    isExcluded: true,
    exclusionReason: "Violates ethical and brand safety policy: Prohibited political controversy & commercial exploitation of conflict.",
    safetyStatus: "BLOCKED",
    safetyNotes: "Excluded by Safety Hard Gate. No promotional tie-in or opportunistic commentary allowed.",
    createdAt: d5,
  };

  const trendSignals = [trend1, trend2, trend3, trend4];
  const trendScores = [score1, score2, score3];

  const contentPillars: ContentPillar[] = [
    {
      id: "pillar_edu",
      tenantId,
      name: "Coffee Lore & Craft Education",
      targetPercentage: 30,
      description: "Demystifying brewing, Liberica heritage, roast science, and tasting notes in friendly, unpretentious language.",
    },
    {
      id: "pillar_origin",
      tenantId,
      name: "Farm to Cup & Origin Stories",
      targetPercentage: 25,
      description: "Spotlighting Kulai farmers, micro-lot harvests, ethical direct-trade pricing, and bean traceability.",
    },
    {
      id: "pillar_recipes",
      tenantId,
      name: "Barista Hacks & Home Recipes",
      targetPercentage: 25,
      description: "Fast, mouthwatering recipes (Cold brew mocktails, pour-over hacks, iced lattes) driving concentrate and equipment sales.",
    },
    {
      id: "pillar_community",
      tenantId,
      name: "Bangsar Roastery & Community Vibe",
      targetPercentage: 20,
      description: "Behind the scenes at roast day, customer stories, cafe popups, and answering barista questions.",
    },
  ];

  // Learning Preferences
  const learningPreferences: LearningPreference[] = [
    {
      id: "pref_01",
      tenantId,
      preferenceKey: "affinity_pillar_recipes",
      weight: 1.25,
      confidence: 0.85,
      sampleCount: 14,
      lastAdjustedAt: d1,
      isUserOverridden: false,
    },
    {
      id: "pref_02",
      tenantId,
      preferenceKey: "tone_weight_playful_bilingual",
      weight: 1.15,
      confidence: 0.78,
      sampleCount: 10,
      lastAdjustedAt: d1,
      isUserOverridden: false,
    },
    {
      id: "pref_03",
      tenantId,
      preferenceKey: "avoid_format_aggressive_discount",
      weight: 0.7,
      confidence: 0.9,
      sampleCount: 8,
      lastAdjustedAt: d2,
      isUserOverridden: true,
    },
  ];

  // Rolling 30-Day Calendar generation
  const calendarSlots: CalendarSlot[] = [];
  const contentPosts: ContentPost[] = [];
  const contentVariants: ContentVariant[] = [];
  const mediaAssets: MediaAsset[] = [];

  // Seed sample planned posts for the next 30 days
  for (let i = 0; i < 30; i++) {
    const slotDate = new Date(now.getTime() + i * 24 * 60 * 60 * 1000);
    const dateStr = slotDate.toISOString().split("T")[0];
    const isFirstWeek = i < 7;
    const isApproved = i === 1 || i === 2; // Days 1 & 2 are approved & scheduled

    let postId: string | undefined = undefined;

    if (i % 2 === 0 || isFirstWeek) {
      postId = `post_${i}`;
      let lifecycle: ContentPost["lifecycleStatus"] = "FORECAST";
      if (isApproved) {
        lifecycle = "APPROVED";
      } else if (i === 3) {
        lifecycle = "NEEDS_REVIEW";
      } else if (i === 4) {
        lifecycle = "REPLACEMENT_PROPOSED"; // Demonstrates dynamic trend replacement!
      }

      const pTitle = i === 0 
        ? "Behind the Roaster: Kulai Liberica Drop Day"
        : i === 1 
        ? "Calamansi Cold Brew Fizz Recipe"
        : i === 2
        ? "Mythbuster: Does Dark Roast Have More Kick?"
        : i === 4
        ? "The Rise of Rare Liberica in Global Coffee Competitions"
        : `Artisan Coffee Moment #${i + 1}`;

      const post: ContentPost = {
        id: postId,
        tenantId,
        trendSignalId: i % 3 === 0 ? trend1.id : i % 3 === 1 ? trend2.id : trend3.id,
        productId: i % 2 === 0 ? prod1Id : prod2Id,
        pillarId: i % 4 === 0 ? "pillar_origin" : i % 4 === 1 ? "pillar_recipes" : "pillar_edu",
        title: pTitle,
        masterHook: i === 1 
          ? "Cuaca panas KL ni, jangan minum kopi biasa yang pekat melekit. Try this 2-minute mocktail!" 
          : "Ramai ingat biji kopi Malaysia tak boleh compete dengan luar negara. Uncle Tan bukti sebaliknya.",
        masterCaption: i === 1 
          ? "When it's 34°C in Bangsar, our 18-Hour Barista Cold Brew Concentrate + sparkling tonic + fresh calamansi is the ultimate afternoon revival. No bitterness, zero added sugar, just pure chocolatey citrus bliss." 
          : "Every Tuesday, we roast 12kg micro-batches of Kulai Liberica. Rare, floral, and naturally low in acidity. Stamped fresh with our 48-Hour roast guarantee.",
        masterCta: i === 1 
          ? "Grab a 500ml bottle at the link in bio — makes 8 refreshing glasses at home!" 
          : "Link in bio to reserve this week's fresh batch.",
        visualBrief: "Clean studio top-down shot of condensation-covered glass with calamansi slice, next to minimalist amber bottle of KopiCraft Cold Brew.",
        safetyOutcome: "PASS",
        lifecycleStatus: lifecycle,
        scheduledFor: isApproved ? `${dateStr}T11:30:00` : undefined,
        isDeleted: false,
        variants: [],
        mediaAssets: [],
        createdAt: now.toISOString(),
        updatedAt: now.toISOString(),
      };

      const variantIg: ContentVariant = {
        id: `var_ig_${postId}`,
        postId,
        platform: "INSTAGRAM",
        hook: post.masterHook,
        caption: `${post.masterCaption}\n\n${post.masterCta}`,
        callToAction: post.masterCta,
        hashtags: ["#KopiCraft", "#BangsarRoastery", "#JohorLiberica", "#SpecialtyCoffeeMY", "#SapotLokalCoffee"],
        aspectRatio: "1:1",
        characterCount: 380,
      };

      const variantTt: ContentVariant = {
        id: `var_tt_${postId}`,
        postId,
        platform: "TIKTOK",
        hook: "Wait, stop scrolling! Ni cara buat iced cold brew fizz macam kat Bangsar cafe in 60s.",
        caption: "Bahan: 50ml KopiCraft cold brew + ice + tonic + calamansi. Save video ni untuk bila cuaca panas nanti! ☕✨",
        callToAction: "Order link on profile!",
        hashtags: ["#coffeetiktok", "#malaysiacoffee", "#coldbrewrecipe", "#fypkl"],
        aspectRatio: "9:16",
        characterCount: 160,
      };

      post.variants = [variantIg, variantTt];
      contentVariants.push(variantIg, variantTt);

      const media: MediaAsset = {
        id: `media_${postId}`,
        tenantId,
        postId,
        url: i % 2 === 0 
          ? "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=800&auto=format&fit=crop&q=80" 
          : "https://images.unsplash.com/photo-1517701604599-bb29b565090c?w=800&auto=format&fit=crop&q=80",
        provider: "MockAI Visual Studio (Brand Asset Grounded)",
        aspectRatio: "1:1",
        version: 1,
        createdAt: now.toISOString(),
      };
      post.mediaAssets = [media];
      mediaAssets.push(media);

      contentPosts.push(post);
    }

    const slot: CalendarSlot = {
      id: `slot_${i}`,
      tenantId,
      postId,
      targetDate: dateStr,
      slotTime: "11:30",
      platform: i % 2 === 0 ? "INSTAGRAM" : "TIKTOK",
      isForecast: !isApproved,
      hasReplacementProposal: i === 4,
      proposedReplacementPostId: i === 4 ? "post_replacement_demo" : undefined,
      replacementReason: i === 4 
        ? "New 7-Day Trend: Rapid spike (+82%) in tropical cold brew recipes. Proposing to replace generic bean forecast with high-momentum Cold Brew Mocktail post to capture immediate seasonal demand." 
        : undefined,
    };

    calendarSlots.push(slot);
  }

  // Create the proposed replacement post
  const replacementPost: ContentPost = {
    id: "post_replacement_demo",
    tenantId,
    trendSignalId: trend2.id,
    productId: prod2Id,
    pillarId: "pillar_recipes",
    title: "⚡ Trend Replacement: Tropical Cold Brew Spritz for 34°C Heatwave",
    masterHook: "Cuaca panas terik harini? Jump into the viral Cold Brew Calamansi Spritz trend!",
    masterCaption:
      "Captured right from this week's trending #coldbrewmocktail wave (+82% momentum). We pair our 18-hour cold steeped concentrate with sparkling water and fresh calamansi for a 0-sugar afternoon boost.",
    masterCta: "Limited stock of this week's cold brew batch available online now.",
    visualBrief: "Bright, sunlit aesthetic of glass tumbler with effervescent bubbles, floating calamansi wheels, and deep rich coffee separation.",
    safetyOutcome: "PASS",
    lifecycleStatus: "REPLACEMENT_PROPOSED",
    isDeleted: false,
    variants: [],
    mediaAssets: [],
    createdAt: now.toISOString(),
    updatedAt: now.toISOString(),
  };
  contentPosts.push(replacementPost);

  const notifications: NotificationItem[] = [
    {
      id: "notif_01",
      tenantId,
      title: "New High-Relevance Trend Detected (94/100)",
      message: "The '#SapotLokal Single-Origin Coffee Origin' trend gained +64% momentum in Malaysia over the last 7 days. Matches your Kulai Liberica USP.",
      type: "HIGH_RELEVANCE_TREND",
      isRead: false,
      actionUrl: "/radar",
      createdAt: d1,
    },
    {
      id: "notif_02",
      tenantId,
      title: "30-Day Calendar: Replacement Proposal Available",
      message: "Day 5 forecast has a recommended replacement based on viral tropical cold brew mocktail trends. Review side-by-side comparison.",
      type: "REPLACEMENT_PROPOSAL",
      isRead: false,
      actionUrl: "/calendar",
      createdAt: d1,
    },
    {
      id: "notif_03",
      tenantId,
      title: "Content Awaiting Review",
      message: "2 forecast concepts have been generated and are ready for your review in Content Studio.",
      type: "POST_AWAITING_REVIEW",
      isRead: true,
      actionUrl: "/studio",
      createdAt: d2,
    },
  ];

  const auditLogs: AuditLog[] = [
    {
      id: "audit_01",
      tenantId,
      userId: user.id,
      action: "TENANT_INITIALIZED",
      entityType: "Tenant",
      entityId: tenantId,
      details: { name: tenant.name, plan: tenant.plan, timezone: tenant.timezone },
      createdAt: now.toISOString(),
    },
    {
      id: "audit_02",
      tenantId,
      userId: user.id,
      action: "TREND_SCAN_COMPLETED",
      entityType: "TrendSignal",
      entityId: "batch_initial_scan",
      details: { signalsFound: 4, eligibleTrends: 3, blockedTrends: 1, lookbackHours: 168 },
      createdAt: d1,
    },
  ];

  return {
    tenants: [tenant],
    users: [user],
    memberships: [membership],
    businessProfiles: [businessProfile],
    products,
    productUSPs,
    audiencePersonas,
    brandVoices,
    brandAssets: [],
    knowledgeDocuments: [],
    knowledgeFacts,
    approvedClaims: [],
    restrictedTopics,
    socialAccounts,
    platformCapabilities,
    trendSignals,
    trendScores,
    contentPillars,
    contentIdeas: [],
    contentPosts,
    contentVariants,
    mediaAssets,
    contentVersions: [],
    calendarSlots,
    approvals: [],
    deletionFeedbacks: [],
    learningPreferences,
    publishingJobs: [],
    postMetricSnapshots: [],
    notifications,
    auditLogs,
  };
}

class Database {
  private data: DatabaseSchema;

  constructor() {
    ensureDirectoryExists(DB_DIR);
    if (fs.existsSync(DB_FILE)) {
      try {
        const raw = fs.readFileSync(DB_FILE, "utf-8");
        this.data = JSON.parse(raw);
      } catch {
        this.data = getInitialData();
        this.save();
      }
    } else {
      this.data = getInitialData();
      this.save();
    }
  }

  private save(): void {
    ensureDirectoryExists(DB_DIR);
    fs.writeFileSync(DB_FILE, JSON.stringify(this.data, null, 2), "utf-8");
  }

  // Tenant
  getTenant(id = "tenant_kopicraft_01"): Tenant | undefined {
    return this.data.tenants.find((t) => t.id === id);
  }

  updateTenant(id: string, updates: Partial<Tenant>): Tenant {
    const idx = this.data.tenants.findIndex((t) => t.id === id);
    if (idx === -1) throw new Error("Tenant not found");
    this.data.tenants[idx] = { ...this.data.tenants[idx], ...updates, updatedAt: new Date().toISOString() };
    this.save();
    return this.data.tenants[idx];
  }

  // Business Profile
  getBusinessProfile(tenantId = "tenant_kopicraft_01"): BusinessProfile | undefined {
    return this.data.businessProfiles.find((b) => b.tenantId === tenantId);
  }

  updateBusinessProfile(tenantId: string, updates: Partial<BusinessProfile>): BusinessProfile {
    const idx = this.data.businessProfiles.findIndex((b) => b.tenantId === tenantId);
    if (idx === -1) throw new Error("Business profile not found");
    this.data.businessProfiles[idx] = { ...this.data.businessProfiles[idx], ...updates, updatedAt: new Date().toISOString() };
    this.save();
    return this.data.businessProfiles[idx];
  }

  // Products
  getProducts(tenantId = "tenant_kopicraft_01"): Product[] {
    const prods = this.data.products.filter((p) => p.tenantId === tenantId);
    return prods.map((p) => ({
      ...p,
      usps: this.data.productUSPs.filter((u) => u.productId === p.id),
    }));
  }

  createProduct(tenantId: string, product: Omit<Product, "id" | "tenantId" | "createdAt">): Product {
    const newProd: Product = {
      id: `prod_${Date.now()}`,
      tenantId,
      ...product,
      createdAt: new Date().toISOString(),
    };
    this.data.products.push(newProd);
    this.save();
    return newProd;
  }

  // Brand Voice
  getBrandVoice(tenantId = "tenant_kopicraft_01"): BrandVoiceProfile | undefined {
    return this.data.brandVoices.find((v) => v.tenantId === tenantId);
  }

  updateBrandVoice(tenantId: string, updates: Partial<BrandVoiceProfile>): BrandVoiceProfile {
    const idx = this.data.brandVoices.findIndex((v) => v.tenantId === tenantId);
    if (idx === -1) throw new Error("Brand voice profile not found");
    this.data.brandVoices[idx] = { ...this.data.brandVoices[idx], ...updates };
    this.save();
    return this.data.brandVoices[idx];
  }

  // Audience Personas
  getAudiencePersonas(tenantId = "tenant_kopicraft_01"): AudiencePersona[] {
    return this.data.audiencePersonas.filter((a) => a.tenantId === tenantId);
  }

  // Knowledge Facts
  getKnowledgeFacts(tenantId = "tenant_kopicraft_01"): KnowledgeFact[] {
    return this.data.knowledgeFacts.filter((f) => f.tenantId === tenantId);
  }

  verifyKnowledgeFact(id: string, status: "VERIFIED" | "UNVERIFIED_NEEDS_PROOF" | "EXPIRED"): KnowledgeFact {
    const idx = this.data.knowledgeFacts.findIndex((f) => f.id === id);
    if (idx === -1) throw new Error("Fact not found");
    this.data.knowledgeFacts[idx].verificationStatus = status;
    if (status === "VERIFIED") {
      this.data.knowledgeFacts[idx].verifiedAt = new Date().toISOString();
    }
    this.save();
    return this.data.knowledgeFacts[idx];
  }

  addKnowledgeFact(tenantId: string, fact: { claim: string; category: string }): KnowledgeFact {
    const newFact: KnowledgeFact = {
      id: `fact_${Date.now()}`,
      tenantId,
      claim: fact.claim,
      category: fact.category,
      verificationStatus: "VERIFIED",
      verifiedAt: new Date().toISOString(),
      createdAt: new Date().toISOString(),
    };
    this.data.knowledgeFacts.push(newFact);
    this.save();
    return newFact;
  }

  // Restricted Topics
  getRestrictedTopics(tenantId = "tenant_kopicraft_01"): RestrictedTopic[] {
    return this.data.restrictedTopics.filter((t) => t.tenantId === tenantId);
  }

  // Social Accounts & Platform Capabilities
  getSocialAccounts(tenantId = "tenant_kopicraft_01"): SocialAccount[] {
    return this.data.socialAccounts.filter((a) => a.tenantId === tenantId);
  }

  getPlatformCapabilities(): PlatformCapability[] {
    return this.data.platformCapabilities;
  }

  // Trend Signals & Scores
  getTrendSignals(tenantId = "tenant_kopicraft_01"): TrendSignal[] {
    const signals = this.data.trendSignals.filter((s) => s.tenantId === tenantId);
    return signals.map((s) => ({
      ...s,
      scores: this.data.trendScores.find((sc) => sc.trendSignalId === s.id),
    }));
  }

  addTrendSignal(signal: Omit<TrendSignal, "id" | "createdAt">, score?: Omit<TrendScore, "id" | "trendSignalId" | "calculatedAt">): TrendSignal {
    const id = `trend_${Date.now()}`;
    const newSignal: TrendSignal = {
      ...signal,
      id,
      createdAt: new Date().toISOString(),
    };
    this.data.trendSignals.push(newSignal);

    if (score) {
      const newScore: TrendScore = {
        ...score,
        id: `score_${Date.now()}`,
        trendSignalId: id,
        calculatedAt: new Date().toISOString(),
      };
      this.data.trendScores.push(newScore);
      newSignal.scores = newScore;
    }
    this.save();
    return newSignal;
  }

  // Content Pillars
  getContentPillars(tenantId = "tenant_kopicraft_01"): ContentPillar[] {
    return this.data.contentPillars.filter((p) => p.tenantId === tenantId);
  }

  // Content Posts
  getContentPosts(tenantId = "tenant_kopicraft_01", includeDeleted = false): ContentPost[] {
    let posts = this.data.contentPosts.filter((p) => p.tenantId === tenantId);
    if (!includeDeleted) {
      posts = posts.filter((p) => !p.isDeleted);
    }
    return posts.map((p) => ({
      ...p,
      variants: this.data.contentVariants.filter((v) => v.postId === p.id),
      mediaAssets: this.data.mediaAssets.filter((m) => m.postId === p.id),
      trendSignal: this.data.trendSignals.find((s) => s.id === p.trendSignalId),
      product: this.data.products.find((prod) => prod.id === p.productId),
      pillar: this.data.contentPillars.find((pil) => pil.id === p.pillarId),
    }));
  }

  getContentPost(id: string): ContentPost | undefined {
    const p = this.data.contentPosts.find((post) => post.id === id);
    if (!p) return undefined;
    return {
      ...p,
      variants: this.data.contentVariants.filter((v) => v.postId === p.id),
      mediaAssets: this.data.mediaAssets.filter((m) => m.postId === p.id),
      trendSignal: this.data.trendSignals.find((s) => s.id === p.trendSignalId),
      product: this.data.products.find((prod) => prod.id === p.productId),
      pillar: this.data.contentPillars.find((pil) => pil.id === p.pillarId),
    };
  }

  createContentPost(post: Omit<ContentPost, "id" | "createdAt" | "updatedAt" | "variants" | "mediaAssets">, variants: Omit<ContentVariant, "id" | "postId">[] = [], mediaUrl?: string): ContentPost {
    const id = `post_${Date.now()}`;
    const now = new Date().toISOString();
    const newPost: ContentPost = {
      ...post,
      id,
      variants: [],
      mediaAssets: [],
      createdAt: now,
      updatedAt: now,
    };
    this.data.contentPosts.push(newPost);

    for (const v of variants) {
      const variant: ContentVariant = {
        ...v,
        id: `var_${Date.now()}_${Math.random().toString(36).substring(7)}`,
        postId: id,
      };
      this.data.contentVariants.push(variant);
      newPost.variants.push(variant);
    }

    if (mediaUrl) {
      const media: MediaAsset = {
        id: `media_${Date.now()}`,
        tenantId: post.tenantId,
        postId: id,
        url: mediaUrl,
        provider: "MockAI Visual Studio (Brand Asset Grounded)",
        aspectRatio: "1:1",
        version: 1,
        createdAt: now,
      };
      this.data.mediaAssets.push(media);
      newPost.mediaAssets.push(media);
    }

    this.save();
    return newPost;
  }

  updateContentPost(id: string, updates: Partial<ContentPost>): ContentPost {
    const idx = this.data.contentPosts.findIndex((p) => p.id === id);
    if (idx === -1) throw new Error("Post not found");
    this.data.contentPosts[idx] = {
      ...this.data.contentPosts[idx],
      ...updates,
      updatedAt: new Date().toISOString(),
    };
    this.save();
    return this.getContentPost(id)!;
  }

  // Deletion with required learning feedback
  deletePostWithFeedback(tenantId: string, postId: string, feedback: {
    reasonCategory: DeletionFeedback["reasonCategory"];
    reasonDetails?: string;
    improvementText?: string;
    userId: string;
  }): { success: boolean; adjustedPreferences: LearningPreference[] } {
    const postIdx = this.data.contentPosts.findIndex((p) => p.id === postId && p.tenantId === tenantId);
    if (postIdx === -1) throw new Error("Post not found");

    const post = this.data.contentPosts[postIdx];
    post.isDeleted = true;
    post.deletedAt = new Date().toISOString();
    post.lifecycleStatus = "DELETED";

    // Unassign from calendar slot if assigned
    const slotIdx = this.data.calendarSlots.findIndex((s) => s.postId === postId && s.tenantId === tenantId);
    if (slotIdx !== -1) {
      this.data.calendarSlots[slotIdx].postId = undefined;
    }

    // Record DeletionFeedback
    const newFeedback: DeletionFeedback = {
      id: `del_fb_${Date.now()}`,
      tenantId,
      postId,
      reasonCategory: feedback.reasonCategory,
      reasonDetails: feedback.reasonDetails,
      improvementText: feedback.improvementText,
      rejectedPillarId: post.pillarId,
      userId: feedback.userId,
      createdAt: new Date().toISOString(),
    };
    this.data.deletionFeedbacks.push(newFeedback);

    // Update Learning Preferences
    const adjusted = this.applyLearningFromDeletion(tenantId, newFeedback);

    // Record Audit Log
    this.data.auditLogs.push({
      id: `audit_${Date.now()}`,
      tenantId,
      userId: feedback.userId,
      action: "POST_DELETED_WITH_FEEDBACK",
      entityType: "ContentPost",
      entityId: postId,
      details: {
        reasonCategory: feedback.reasonCategory,
        improvementText: feedback.improvementText,
        postTitle: post.title,
      },
      createdAt: new Date().toISOString(),
    });

    this.save();
    return { success: true, adjustedPreferences: adjusted };
  }

  private applyLearningFromDeletion(tenantId: string, feedback: DeletionFeedback): LearningPreference[] {
    const adjusted: LearningPreference[] = [];

    // Adjust preferences based on reason
    if (feedback.reasonCategory === "TOO_PROMOTIONAL") {
      const prefKey = "avoid_format_aggressive_discount";
      let pref = this.data.learningPreferences.find((p) => p.tenantId === tenantId && p.preferenceKey === prefKey);
      if (pref) {
        pref.weight = Math.min(2.0, Number((pref.weight + 0.15).toFixed(2)));
        pref.sampleCount += 1;
        pref.lastAdjustedAt = new Date().toISOString();
      } else {
        pref = {
          id: `pref_${Date.now()}`,
          tenantId,
          preferenceKey: prefKey,
          weight: 1.15,
          confidence: 0.6,
          sampleCount: 1,
          lastAdjustedAt: new Date().toISOString(),
          isUserOverridden: false,
        };
        this.data.learningPreferences.push(pref);
      }
      adjusted.push(pref);
    }

    if (feedback.rejectedPillarId) {
      const prefKey = `affinity_pillar_${feedback.rejectedPillarId}`;
      let pref = this.data.learningPreferences.find((p) => p.tenantId === tenantId && p.preferenceKey === prefKey);
      if (pref) {
        pref.weight = Math.max(0.1, Number((pref.weight - 0.1).toFixed(2)));
        pref.sampleCount += 1;
        pref.lastAdjustedAt = new Date().toISOString();
      } else {
        pref = {
          id: `pref_${Date.now()}`,
          tenantId,
          preferenceKey: prefKey,
          weight: 0.9,
          confidence: 0.5,
          sampleCount: 1,
          lastAdjustedAt: new Date().toISOString(),
          isUserOverridden: false,
        };
        this.data.learningPreferences.push(pref);
      }
      adjusted.push(pref);
    }

    return adjusted;
  }

  // Calendar Slots
  getCalendarSlots(tenantId = "tenant_kopicraft_01"): CalendarSlot[] {
    const slots = this.data.calendarSlots.filter((s) => s.tenantId === tenantId);
    return slots.map((s) => ({
      ...s,
      post: s.postId ? this.getContentPost(s.postId) : undefined,
      proposedReplacementPost: s.proposedReplacementPostId ? this.getContentPost(s.proposedReplacementPostId) : undefined,
    }));
  }

  acceptCalendarReplacement(tenantId: string, slotId: string): boolean {
    const slotIdx = this.data.calendarSlots.findIndex((s) => s.id === slotId && s.tenantId === tenantId);
    if (slotIdx === -1) throw new Error("Slot not found");

    const slot = this.data.calendarSlots[slotIdx];
    if (!slot.proposedReplacementPostId) return false;

    // Swap post
    slot.postId = slot.proposedReplacementPostId;
    slot.hasReplacementProposal = false;
    slot.proposedReplacementPostId = undefined;
    slot.replacementReason = undefined;

    // Update replacement post status to FORECAST or NEEDS_REVIEW
    const repPost = this.data.contentPosts.find((p) => p.id === slot.postId);
    if (repPost) {
      repPost.lifecycleStatus = "NEEDS_REVIEW";
    }

    this.save();
    return true;
  }

  dismissCalendarReplacement(tenantId: string, slotId: string): boolean {
    const slotIdx = this.data.calendarSlots.findIndex((s) => s.id === slotId && s.tenantId === tenantId);
    if (slotIdx === -1) throw new Error("Slot not found");

    this.data.calendarSlots[slotIdx].hasReplacementProposal = false;
    this.data.calendarSlots[slotIdx].proposedReplacementPostId = undefined;
    this.data.calendarSlots[slotIdx].replacementReason = undefined;

    this.save();
    return true;
  }

  // Learning Preferences
  getLearningPreferences(tenantId = "tenant_kopicraft_01"): LearningPreference[] {
    return this.data.learningPreferences.filter((p) => p.tenantId === tenantId);
  }

  resetLearningPreferences(tenantId = "tenant_kopicraft_01"): void {
    const defaultData = getInitialData();
    this.data.learningPreferences = defaultData.learningPreferences.map((p) => ({
      ...p,
      tenantId,
      id: `pref_${Date.now()}_${Math.random().toString(36).substring(7)}`,
      lastAdjustedAt: new Date().toISOString(),
    }));
    this.save();
  }

  // Notifications
  getNotifications(tenantId = "tenant_kopicraft_01"): NotificationItem[] {
    return this.data.notifications.filter((n) => n.tenantId === tenantId);
  }

  markNotificationRead(id: string): void {
    const n = this.data.notifications.find((notif) => notif.id === id);
    if (n) {
      n.isRead = true;
      this.save();
    }
  }

  // Audit Logs
  getAuditLogs(tenantId = "tenant_kopicraft_01"): AuditLog[] {
    return this.data.auditLogs
      .filter((a) => a.tenantId === tenantId)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  addAuditLog(entry: Omit<AuditLog, "id" | "createdAt">): AuditLog {
    const log: AuditLog = {
      ...entry,
      id: `audit_${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    this.data.auditLogs.unshift(log);
    this.save();
    return log;
  }
}

// Global Singleton
const globalForDb = globalThis as unknown as { __trendpilot_db?: Database };
export const db = globalForDb.__trendpilot_db ?? new Database();
if (process.env.NODE_ENV !== "production") globalForDb.__trendpilot_db = db;
