/**
 * LaunchPilot AI — Mock AI Generation Engine
 *
 * This service simulates AI-powered MVP planning using deterministic
 * template-driven generation based on user inputs. The architecture
 * is designed so a real LLM provider (OpenAI, Anthropic, etc.)
 * can be connected later through this service layer.
 */

// ─── Types ────────────────────────────────────────────────────────────────────

export interface ProjectInput {
  title: string;
  industry: string;
  targetUsers: string;
  problem: string;
  solution: string;
  goals: string;
  budgetLevel: string;
  timeline: string;
}

export interface TechStack {
  frontend: string[];
  backend: string[];
  database: string[];
  deployment: string[];
  optional: string[];
}

export interface RoadmapPhase {
  phase: string;
  duration: string;
  tasks: string[];
}

export interface Risk {
  risk: string;
  impact: string;
  mitigation: string;
}

export interface GeneratedPlan {
  executiveSummary: string;
  mvpFeatures: string[];
  recommendedTechStack: TechStack;
  userStories: string[];
  roadmap: RoadmapPhase[];
  risks: Risk[];
  monetization: string;
  launchChecklist: string[];
}

// ─── Industry-specific configurations ────────────────────────────────────────

const industryConfigs: Record<
  string,
  {
    techFocus: string[];
    complianceNote: string;
    keyRisks: string[];
    monetizationHint: string;
  }
> = {
  healthcare: {
    techFocus: ["HIPAA-compliant storage", "HL7/FHIR APIs", "Telemedicine SDKs"],
    complianceNote: "HIPAA, GDPR, FDA regulations must be considered",
    keyRisks: [
      "Regulatory compliance failure",
      "Patient data breach",
      "Medical liability",
    ],
    monetizationHint: "SaaS subscription per clinic/hospital, per-patient pricing",
  },
  fintech: {
    techFocus: ["PCI-DSS compliance", "Payment gateway APIs", "KYC/AML tools"],
    complianceNote: "PCI-DSS, KYC/AML, financial regulations apply",
    keyRisks: [
      "Regulatory non-compliance",
      "Fraud and chargebacks",
      "Banking partnership delays",
    ],
    monetizationHint:
      "Transaction fees, SaaS subscription, premium API access",
  },
  edtech: {
    techFocus: ["Video streaming", "LMS platforms", "SCORM compliance"],
    complianceNote: "COPPA (if targeting minors), FERPA for student data",
    keyRisks: [
      "Low user engagement",
      "Content quality issues",
      "Competitor platforms",
    ],
    monetizationHint: "Freemium with paid courses, subscription, B2B licensing",
  },
  ecommerce: {
    techFocus: ["Payment processing", "Inventory management", "Shipping APIs"],
    complianceNote: "GDPR, consumer protection laws, tax compliance",
    keyRisks: [
      "Cart abandonment",
      "Logistics failures",
      "Payment fraud",
    ],
    monetizationHint:
      "Commission on sales, subscription for sellers, premium listings",
  },
  saas: {
    techFocus: ["Multi-tenancy", "Subscription billing", "API-first design"],
    complianceNote: "GDPR, SOC2 for enterprise customers",
    keyRisks: [
      "High churn rate",
      "Feature bloat",
      "Pricing strategy mismatch",
    ],
    monetizationHint: "Tiered SaaS subscription, usage-based pricing, enterprise deals",
  },
  "real estate": {
    techFocus: ["Property listing APIs", "Maps integration", "Virtual tour tools"],
    complianceNote: "Fair housing laws, real estate licensing regulations",
    keyRisks: [
      "Market volatility",
      "Agent resistance to adoption",
      "Legal compliance",
    ],
    monetizationHint:
      "Lead generation fees, listing subscriptions, agent commission sharing",
  },
  logistics: {
    techFocus: [
      "Route optimization algorithms",
      "GPS tracking",
      "Fleet management APIs",
    ],
    complianceNote: "DOT regulations, carrier compliance requirements",
    keyRisks: ["Driver supply shortage", "Fuel costs", "Route optimization complexity"],
    monetizationHint:
      "Per-delivery fee, SaaS for fleet management, enterprise contracts",
  },
  social: {
    techFocus: ["Real-time messaging", "Content moderation", "CDN for media"],
    complianceNote: "GDPR, CCPA, content moderation policies",
    keyRisks: [
      "User acquisition costs",
      "Content moderation challenges",
      "Network effect cold start",
    ],
    monetizationHint:
      "Advertising, premium memberships, creator monetization tools",
  },
};

// ─── Tech stack presets ───────────────────────────────────────────────────────

function getTechStack(
  budget: string,
  industry: string,
  timeline: string
): TechStack {
  const industryKey = Object.keys(industryConfigs).find((k) =>
    industry.toLowerCase().includes(k)
  );

  // Lean stack for low budget or short timeline
  if (budget === "low" || timeline === "2 weeks") {
    return {
      frontend: ["Next.js", "Tailwind CSS", "shadcn/ui"],
      backend: ["Next.js API Routes", "Prisma ORM"],
      database: ["PostgreSQL (Neon/Supabase free tier)"],
      deployment: ["Vercel (free tier)", "Railway (free tier)"],
      optional: ["Resend for emails", "Cloudinary (free tier) for media"],
    };
  }

  // Medium stack
  if (budget === "medium" || timeline === "1 month") {
    const extra = industryKey
      ? industryConfigs[industryKey].techFocus.slice(0, 1)
      : [];
    return {
      frontend: ["Next.js 14", "TypeScript", "Tailwind CSS", "Framer Motion"],
      backend: [
        "Node.js / Next.js API",
        "Prisma ORM",
        "Redis for caching",
        ...extra,
      ],
      database: ["PostgreSQL", "Redis"],
      deployment: ["Vercel", "Railway", "Docker"],
      optional: [
        "Stripe for payments",
        "Resend for transactional email",
        "Sentry for error tracking",
      ],
    };
  }

  // Full stack for high budget
  const extra = industryKey ? industryConfigs[industryKey].techFocus : [];
  return {
    frontend: [
      "Next.js 14 (App Router)",
      "TypeScript",
      "Tailwind CSS",
      "Framer Motion",
      "React Query",
    ],
    backend: [
      "Node.js / Next.js",
      "Prisma ORM",
      "Redis",
      "BullMQ for job queues",
      ...extra,
    ],
    database: ["PostgreSQL", "Redis", "S3-compatible storage"],
    deployment: [
      "Vercel / AWS",
      "Docker + Kubernetes",
      "CI/CD with GitHub Actions",
    ],
    optional: [
      "Stripe + Stripe Connect",
      "SendGrid / Resend",
      "Datadog / Sentry",
      "LaunchDarkly for feature flags",
    ],
  };
}

// ─── Roadmap generator ────────────────────────────────────────────────────────

function getRoadmap(timeline: string, budget: string): RoadmapPhase[] {
  if (timeline === "2 weeks") {
    return [
      {
        phase: "Phase 1 — Setup & Core",
        duration: "Days 1–5",
        tasks: [
          "Project setup, repository, CI/CD pipeline",
          "Database schema and Prisma setup",
          "Authentication (register, login, sessions)",
          "Core UI components and design system",
        ],
      },
      {
        phase: "Phase 2 — MVP Features",
        duration: "Days 6–11",
        tasks: [
          "Core feature implementation",
          "API routes and data handling",
          "User dashboard and primary workflows",
          "Basic error handling and validation",
        ],
      },
      {
        phase: "Phase 3 — Polish & Deploy",
        duration: "Days 12–14",
        tasks: [
          "Bug fixes and edge case handling",
          "Performance optimizations",
          "Deploy to production",
          "Basic monitoring and alerting",
        ],
      },
    ];
  }

  if (timeline === "1 month") {
    return [
      {
        phase: "Phase 1 — Foundation",
        duration: "Week 1",
        tasks: [
          "Technical architecture decisions",
          "Repository setup and CI/CD",
          "Database schema design and setup",
          "Authentication system",
          "Base UI design system",
        ],
      },
      {
        phase: "Phase 2 — Core Features",
        duration: "Week 2",
        tasks: [
          "Primary feature development",
          "REST API endpoints",
          "Database integrations",
          "User onboarding flow",
        ],
      },
      {
        phase: "Phase 3 — Secondary Features",
        duration: "Week 3",
        tasks: [
          "Secondary feature implementation",
          "Third-party integrations",
          "Email notifications",
          "Dashboard and analytics",
        ],
      },
      {
        phase: "Phase 4 — Launch",
        duration: "Week 4",
        tasks: [
          "QA testing and bug fixes",
          "Performance optimization",
          "Security audit",
          "Production deployment",
          "Post-launch monitoring",
        ],
      },
    ];
  }

  if (timeline === "2-3 months") {
    return [
      {
        phase: "Phase 1 — Discovery & Architecture",
        duration: "2 weeks",
        tasks: [
          "Requirements finalization and user research",
          "System architecture design",
          "Database schema and ERD",
          "Tech stack setup and CI/CD pipeline",
          "Design system and component library",
        ],
      },
      {
        phase: "Phase 2 — Core Development",
        duration: "3–4 weeks",
        tasks: [
          "Authentication and user management",
          "Core business logic and APIs",
          "Database models and migrations",
          "Primary user workflows",
          "Basic admin panel",
        ],
      },
      {
        phase: "Phase 3 — Feature Completion",
        duration: "3–4 weeks",
        tasks: [
          "All MVP features implemented",
          "Payment integration (if applicable)",
          "Third-party API integrations",
          "Email and notification system",
          "Dashboard and reporting",
        ],
      },
      {
        phase: "Phase 4 — QA & Launch",
        duration: "1–2 weeks",
        tasks: [
          "Comprehensive QA and user testing",
          "Security review and penetration testing",
          "Performance optimization",
          "Production deployment",
          "Go-to-market execution",
        ],
      },
    ];
  }

  // 3-6 months
  return [
    {
      phase: "Phase 1 — Discovery & Design",
      duration: "Month 1",
      tasks: [
        "Market research and competitor analysis",
        "User interviews and persona definition",
        "System architecture and technical planning",
        "UI/UX design and prototyping",
        "Team setup and development environment",
      ],
    },
    {
      phase: "Phase 2 — Foundation",
      duration: "Month 2",
      tasks: [
        "Core infrastructure and CI/CD",
        "Authentication and authorization system",
        "Database setup and core models",
        "Base API architecture",
        "Component library and design system",
      ],
    },
    {
      phase: "Phase 3 — Core Product",
      duration: "Month 3",
      tasks: [
        "Primary feature set development",
        "Business logic implementation",
        "Third-party integrations",
        "Internal alpha testing",
        "Performance baseline",
      ],
    },
    {
      phase: "Phase 4 — Beta & Growth Features",
      duration: "Month 4",
      tasks: [
        "Beta release to early adopters",
        "User feedback collection and iteration",
        "Payment and subscription system",
        "Analytics and reporting dashboard",
        "Marketing landing page",
      ],
    },
    {
      phase: "Phase 5 — Polish & Scale",
      duration: "Month 5",
      tasks: [
        "Performance optimization",
        "Security audit and compliance review",
        "Load testing and scalability improvements",
        "Documentation and API docs",
        "Customer support system",
      ],
    },
    {
      phase: "Phase 6 — Launch",
      duration: "Month 6",
      tasks: [
        "Public launch execution",
        "Go-to-market strategy activation",
        "Paid advertising campaigns",
        "Press and community outreach",
        "Post-launch monitoring and iteration",
      ],
    },
  ];
}

// ─── Risk generator ───────────────────────────────────────────────────────────

function getRisks(
  industry: string,
  budget: string,
  timeline: string
): Risk[] {
  const industryKey = Object.keys(industryConfigs).find((k) =>
    industry.toLowerCase().includes(k)
  );

  const baseRisks: Risk[] = [
    {
      risk: "Scope creep during development",
      impact: "High",
      mitigation:
        "Define an MVP feature set upfront, use a change control process, and prioritize ruthlessly.",
    },
    {
      risk: "Low user adoption at launch",
      impact: "High",
      mitigation:
        "Build a waitlist before launch, engage with target users early, gather feedback from beta testers.",
    },
    {
      risk: "Technical debt accumulation",
      impact: "Medium",
      mitigation:
        "Allocate 20% of sprint time for refactoring, enforce code reviews, maintain test coverage.",
    },
  ];

  if (budget === "low") {
    baseRisks.push({
      risk: "Underfunding critical infrastructure",
      impact: "High",
      mitigation:
        "Use free tiers and open-source tools aggressively, prioritize cloud providers with generous free plans.",
    });
  }

  if (timeline === "2 weeks" || timeline === "1 month") {
    baseRisks.push({
      risk: "Compressed timeline leading to quality issues",
      impact: "High",
      mitigation:
        "Limit features ruthlessly, use proven libraries, allocate buffer time for QA.",
    });
  }

  const industryRisks: Risk[] =
    industryKey
      ? industryConfigs[industryKey].keyRisks.map((risk) => ({
          risk,
          impact: "High",
          mitigation: `Engage ${industry} domain experts early, consult legal counsel, and build compliance into the architecture from day one.`,
        }))
      : [
          {
            risk: "Market timing risk",
            impact: "Medium",
            mitigation:
              "Validate the problem with real users before full build, launch an MVP quickly.",
          },
        ];

  return [...baseRisks, ...industryRisks].slice(0, 6);
}

// ─── Main generator function ──────────────────────────────────────────────────

export async function generateMVPPlan(
  input: ProjectInput
): Promise<GeneratedPlan> {
  const {
    title,
    industry,
    targetUsers,
    problem,
    solution,
    goals,
    budgetLevel,
    timeline,
  } = input;

  const industryKey = Object.keys(industryConfigs).find((k) =>
    industry.toLowerCase().includes(k)
  ) ?? "saas";

  const config = industryConfigs[industryKey];

  // ── Executive Summary ──────────────────────────────────────────────────────
  const executiveSummary = `${title} is a ${industry} startup targeting ${targetUsers}. 
The core problem being solved is: ${problem}. 
The proposed solution is: ${solution}.

Strategic objectives include: ${goals}.

With a ${budgetLevel} budget and a ${timeline} delivery timeline, this MVP will focus on delivering core value quickly while maintaining technical quality and scalability. ${config?.complianceNote ? `Note: ${config.complianceNote}.` : ""}`;

  // ── MVP Features ───────────────────────────────────────────────────────────
  const isLean = budgetLevel === "low" || timeline === "2 weeks";

  const mvpFeatures = [
    `User authentication and account management (registration, login, profile)`,
    `Core ${industry} feature: ${solution.slice(0, 80)}`,
    `User dashboard with key metrics and activity overview`,
    `Data management: create, read, update, delete core entities`,
    isLean
      ? "Email notifications (basic)"
      : "Real-time notifications and email system",
    isLean
      ? "Basic search and filtering"
      : "Advanced search, filtering, and sorting",
    `${targetUsers.split(" ").slice(0, 4).join(" ")} onboarding flow`,
    isLean
      ? "Basic reporting"
      : "Analytics dashboard with charts and exportable reports",
    "Responsive web interface (mobile + desktop)",
    isLean
      ? "Basic settings page"
      : "Settings, preferences, and account management",
  ].filter(Boolean);

  // ── User Stories ───────────────────────────────────────────────────────────
  const userStories = [
    `As a ${targetUsers}, I want to create an account so I can access the platform and start using its features.`,
    `As a ${targetUsers}, I want to log in securely so my data is protected and personalized to me.`,
    `As a ${targetUsers}, I want to ${solution.split(".")[0].toLowerCase()} so that ${problem.split(".")[0].toLowerCase()}.`,
    `As a ${targetUsers}, I want to see a dashboard overview so I can quickly understand my current status and recent activity.`,
    `As a ${targetUsers}, I want to receive notifications about important events so I stay informed without having to check manually.`,
    `As a ${targetUsers}, I want to search and filter data so I can quickly find what I need.`,
    `As a ${targetUsers}, I want to update my profile and settings so the platform fits my preferences.`,
    `As a ${targetUsers}, I want to export or share my data so I can use it in other tools or share with colleagues.`,
    `As an admin, I want to view usage analytics so I can understand how users engage with the platform.`,
    `As a ${targetUsers}, I want the app to work on my mobile device so I can access it on the go.`,
  ];

  // ── Tech Stack ─────────────────────────────────────────────────────────────
  const recommendedTechStack = getTechStack(budgetLevel, industry, timeline);

  // ── Roadmap ────────────────────────────────────────────────────────────────
  const roadmap = getRoadmap(timeline, budgetLevel);

  // ── Risks ──────────────────────────────────────────────────────────────────
  const risks = getRisks(industry, budgetLevel, timeline);

  // ── Monetization ──────────────────────────────────────────────────────────
  const monetization = config?.monetizationHint
    ? `Primary: ${config.monetizationHint}.

Secondary revenue streams:
• Freemium tier with premium upgrades
• API access for developers and enterprises
• White-label licensing for B2B partners
• Professional services: onboarding, customization, consulting

Pricing strategy recommendation: Start with a competitive freemium plan to drive adoption, then convert active users to paid plans. For ${budgetLevel} budget, prioritize a simple 2-tier pricing model (Free + Pro) before adding enterprise tiers.`
    : `Primary: SaaS subscription model with tiered pricing based on usage and features.

Secondary revenue streams:
• API access for third-party integrations
• White-label licensing
• Professional services and consulting

Pricing strategy: Freemium to drive top-of-funnel, then convert to paid plans.`;

  // ── Launch Checklist ──────────────────────────────────────────────────────
  const launchChecklist = [
    "✅ Complete MVP feature set and internal QA",
    "✅ Set up production environment (Vercel/AWS + managed database)",
    "✅ Configure custom domain and SSL certificate",
    "✅ Set up error monitoring (Sentry or similar)",
    "✅ Set up uptime monitoring and alerting",
    "✅ Configure automated database backups",
    "✅ Write and publish Terms of Service and Privacy Policy",
    isLean ? "✅ Set up basic analytics (GA4)" : "✅ Configure analytics (Mixpanel / PostHog)",
    "✅ Create landing page with waitlist/signup CTA",
    "✅ Set up transactional email (welcome, password reset, notifications)",
    "✅ Test all critical user flows end-to-end",
    "✅ Test on mobile, tablet, and desktop browsers",
    "✅ Prepare onboarding documentation or in-app guide",
    "✅ Set up customer support channel (email, chat, or Discord)",
    "✅ Draft and schedule launch announcement (Product Hunt, Twitter/X, LinkedIn)",
    "✅ Notify beta users and gather testimonials",
    "✅ Set up referral or early-access incentive program",
    "✅ Monitor performance metrics post-launch for 7 days",
  ];

  return {
    executiveSummary,
    mvpFeatures,
    recommendedTechStack,
    userStories,
    roadmap,
    risks,
    monetization,
    launchChecklist,
  };
}
