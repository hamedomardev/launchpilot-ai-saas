import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { generateMVPPlan } from "@/lib/mock-ai";
import { projectSchema } from "@/lib/validations";

// GET /api/projects — Get all projects for current user
export async function GET(req: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const search = searchParams.get("search") || "";
    const industry = searchParams.get("industry") || "";

    const projects = await db.project.findMany({
      where: {
        userId: user.id,
        ...(search && {
          title: { contains: search, mode: "insensitive" },
        }),
        ...(industry && {
          industry: { contains: industry, mode: "insensitive" },
        }),
      },
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        title: true,
        industry: true,
        targetUsers: true,
        budgetLevel: true,
        timeline: true,
        generatedSummary: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return NextResponse.json({ projects });
  } catch (error) {
    console.error("Get projects error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// POST /api/projects — Create a new project with AI generation
export async function POST(req: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();

    // Validate input
    const parsed = projectSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0].message },
        { status: 400 }
      );
    }

    const input = parsed.data;

    // Generate MVP plan using mock AI
    const generatedPlan = await generateMVPPlan(input);

    // Save to database
    const project = await db.project.create({
      data: {
        userId: user.id,
        title: input.title,
        industry: input.industry,
        targetUsers: input.targetUsers,
        problem: input.problem,
        solution: input.solution,
        goals: input.goals,
        budgetLevel: input.budgetLevel,
        timeline: input.timeline,
        generatedSummary: generatedPlan.executiveSummary,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        generatedFeatures: JSON.parse(JSON.stringify(generatedPlan.mvpFeatures)) as any,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        generatedTechStack: JSON.parse(JSON.stringify(generatedPlan.recommendedTechStack)) as any,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        generatedUserStories: JSON.parse(JSON.stringify(generatedPlan.userStories)) as any,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        generatedRoadmap: JSON.parse(JSON.stringify(generatedPlan.roadmap)) as any,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        generatedRisks: JSON.parse(JSON.stringify(generatedPlan.risks)) as any,
        generatedMonetization: generatedPlan.monetization,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        generatedLaunchChecklist: JSON.parse(JSON.stringify(generatedPlan.launchChecklist)) as any,
      },
    });

    return NextResponse.json(
      { message: "Project created successfully", project },
      { status: 201 }
    );
  } catch (error) {
    console.error("Create project error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
