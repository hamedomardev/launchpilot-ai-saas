import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import { getCurrentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { formatDate } from "@/lib/utils";
import { Badge } from "@/components/ui/Badge";
import { ProjectDetailClient } from "@/components/dashboard/ProjectDetailClient";

interface ProjectPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: ProjectPageProps) {
  const { id } = await params;
  const project = await db.project.findUnique({
    where: { id },
    select: { title: true },
  });
  return { title: project ? `${project.title} — LaunchPilot AI` : "Project" };
}

export default async function ProjectDetailPage({ params }: ProjectPageProps) {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const { id } = await params;

  const project = await db.project.findUnique({ where: { id } });

  if (!project) notFound();
  if (project.userId !== user.id) redirect("/dashboard/projects");

  // Cast JSON fields
  const features = project.generatedFeatures as string[];
  const techStack = project.generatedTechStack as {
    frontend: string[];
    backend: string[];
    database: string[];
    deployment: string[];
    optional: string[];
  };
  const userStories = project.generatedUserStories as string[];
  const roadmap = project.generatedRoadmap as {
    phase: string;
    duration: string;
    tasks: string[];
  }[];
  const risks = project.generatedRisks as {
    risk: string;
    impact: string;
    mitigation: string;
  }[];
  const launchChecklist = project.generatedLaunchChecklist as string[];

  const budgetColors: Record<string, "success" | "warning" | "purple"> = {
    low: "success",
    medium: "warning",
    high: "purple",
  };

  return (
    <div className="max-w-4xl space-y-6">
      {/* Back navigation */}
      <div className="flex items-center gap-3">
        <Link
          href="/dashboard/projects"
          className="flex items-center gap-1.5 text-sm text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4">
            <path fillRule="evenodd" d="M14 8a.75.75 0 0 1-.75.75H4.56l3.22 3.22a.75.75 0 1 1-1.06 1.06l-4.5-4.5a.75.75 0 0 1 0-1.06l4.5-4.5a.75.75 0 0 1 1.06 1.06L4.56 7.25h8.69A.75.75 0 0 1 14 8Z" clipRule="evenodd" />
          </svg>
          Back to Projects
        </Link>
      </div>

      {/* Project header */}
      <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-gradient-to-br from-blue-600 to-indigo-700 text-white p-6">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
          <div>
            <div className="flex flex-wrap gap-2 mb-3">
              <Badge className="bg-white/20 text-white border-0 capitalize">
                {project.industry}
              </Badge>
              <Badge className="bg-white/20 text-white border-0 capitalize">
                {project.budgetLevel} budget
              </Badge>
              <Badge className="bg-white/20 text-white border-0">
                {project.timeline}
              </Badge>
            </div>
            <h1 className="text-2xl font-bold mb-1">{project.title}</h1>
            <p className="text-blue-100 text-sm">
              Target: {project.targetUsers} • Created {formatDate(project.createdAt)}
            </p>
          </div>
          <ProjectDetailClient project={{
            id: project.id,
            title: project.title,
            industry: project.industry,
            targetUsers: project.targetUsers,
            problem: project.problem,
            solution: project.solution,
            goals: project.goals,
            budgetLevel: project.budgetLevel,
            timeline: project.timeline,
            generatedSummary: project.generatedSummary,
            generatedFeatures: features,
            generatedTechStack: techStack,
            generatedUserStories: userStories,
            generatedRoadmap: roadmap,
            generatedRisks: risks,
            generatedMonetization: project.generatedMonetization,
            generatedLaunchChecklist: launchChecklist,
            createdAt: project.createdAt.toISOString(),
          }} />
        </div>
      </div>

      {/* Project Input Summary */}
      <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6">
        <h2 className="text-base font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-blue-500">
            <path fillRule="evenodd" d="M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0Zm-7-4a1 1 0 1 1-2 0 1 1 0 0 1 2 0ZM9 9a.75.75 0 0 0 0 1.5h.253a.25.25 0 0 1 .244.304l-.459 2.066A1.75 1.75 0 0 0 10.747 15H11a.75.75 0 0 0 0-1.5h-.253a.25.25 0 0 1-.244-.304l.459-2.066A1.75 1.75 0 0 0 9.253 9H9Z" clipRule="evenodd" />
          </svg>
          Project Brief
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InfoBlock label="Problem" value={project.problem} />
          <InfoBlock label="Proposed Solution" value={project.solution} />
          <InfoBlock label="Main Goals" value={project.goals} className="md:col-span-2" />
        </div>
      </div>

      {/* Executive Summary */}
      <Section
        icon={<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-blue-500"><path fillRule="evenodd" d="M4 4a2 2 0 0 1 2-2h4.586A2 2 0 0 1 12 2.586L15.414 6A2 2 0 0 1 16 7.414V16a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4Zm2 6a1 1 0 0 1 1-1h6a1 1 0 1 1 0 2H7a1 1 0 0 1-1-1Zm1 3a1 1 0 1 0 0 2h6a1 1 0 1 0 0-2H7Z" clipRule="evenodd" /></svg>}
        title="Executive Summary"
      >
        <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed whitespace-pre-wrap">
          {project.generatedSummary}
        </p>
      </Section>

      {/* MVP Features */}
      <Section
        icon={<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-blue-500"><path fillRule="evenodd" d="M9.664 1.319a.75.75 0 0 1 .672 0 41.059 41.059 0 0 1 8.198 5.424.75.75 0 0 1-.254 1.285 31.372 31.372 0 0 0-7.86 3.83.75.75 0 0 1-.84 0 31.508 31.508 0 0 0-2.08-1.287V9.394c0-.244.116-.463.315-.6a32.836 32.836 0 0 1 3.54-2.031 41.218 41.218 0 0 0-6.089-3.748.75.75 0 0 1-.255-1.285 41.059 41.059 0 0 1 8.198-5.424Z" clipRule="evenodd" /></svg>}
        title="MVP Feature List"
      >
        <ul className="space-y-2">
          {features.map((feature, i) => (
            <li key={i} className="flex items-start gap-3">
              <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 text-xs font-bold mt-0.5">
                {i + 1}
              </div>
              <span className="text-sm text-slate-600 dark:text-slate-300">{feature}</span>
            </li>
          ))}
        </ul>
      </Section>

      {/* Tech Stack */}
      <Section
        icon={<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-blue-500"><path fillRule="evenodd" d="M6.28 5.22a.75.75 0 0 1 0 1.06L2.56 10l3.72 3.72a.75.75 0 0 1-1.06 1.06L.97 10.53a.75.75 0 0 1 0-1.06l4.25-4.25a.75.75 0 0 1 1.06 0Zm7.44 0a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L17.44 10l-3.72-3.72a.75.75 0 0 1 0-1.06ZM11.377 2.011a.75.75 0 0 1 .612.867l-2.5 14.5a.75.75 0 0 1-1.478-.255l2.5-14.5a.75.75 0 0 1 .866-.612Z" clipRule="evenodd" /></svg>}
        title="Recommended Tech Stack"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            { label: "Frontend", items: techStack.frontend, color: "blue" },
            { label: "Backend", items: techStack.backend, color: "indigo" },
            { label: "Database", items: techStack.database, color: "purple" },
            { label: "Deployment", items: techStack.deployment, color: "emerald" },
            { label: "Optional", items: techStack.optional, color: "amber" },
          ].map(({ label, items, color }) => (
            <div key={label} className="rounded-lg bg-slate-50 dark:bg-slate-800/50 p-4">
              <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-2">
                {label}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {items.map((item) => (
                  <span
                    key={item}
                    className="text-xs bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-full px-2.5 py-1 text-slate-700 dark:text-slate-300"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* User Stories */}
      <Section
        icon={<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-blue-500"><path d="M10 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM3.465 14.493a1.23 1.23 0 0 0 .41 1.412A9.957 9.957 0 0 0 10 18c2.31 0 4.438-.784 6.131-2.1.43-.333.604-.903.408-1.41a7.002 7.002 0 0 0-13.074.003Z" /></svg>}
        title="User Stories"
      >
        <ul className="space-y-2">
          {userStories.map((story, i) => (
            <li key={i} className="flex items-start gap-3 py-2 border-b border-slate-100 dark:border-slate-800 last:border-0">
              <span className="text-xs font-bold text-blue-500 mt-1 shrink-0">#{i + 1}</span>
              <span className="text-sm text-slate-600 dark:text-slate-300 italic">{story}</span>
            </li>
          ))}
        </ul>
      </Section>

      {/* Roadmap */}
      <Section
        icon={<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-blue-500"><path fillRule="evenodd" d="M1 2.75A.75.75 0 0 1 1.75 2h16.5a.75.75 0 0 1 0 1.5H18v8.75A2.75 2.75 0 0 1 15.25 15h-1.072l.798 3.06a.75.75 0 0 1-1.452.38L13.41 18H6.59l-.114.44a.75.75 0 0 1-1.452-.38L5.823 15H4.75A2.75 2.75 0 0 1 2 12.25V3.5h-.25A.75.75 0 0 1 1 2.75Z" clipRule="evenodd" /></svg>}
        title="Development Roadmap"
      >
        <div className="space-y-4">
          {roadmap.map((phase, i) => (
            <div key={i} className="relative pl-6">
              {i < roadmap.length - 1 && (
                <div className="absolute left-2 top-6 bottom-0 w-px bg-slate-200 dark:bg-slate-700" />
              )}
              <div className="absolute left-0 top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-blue-600 text-white ring-4 ring-white dark:ring-slate-900">
                <span className="text-[8px] font-bold">{i + 1}</span>
              </div>
              <div className="rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 p-4">
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <h4 className="font-semibold text-sm text-slate-900 dark:text-white">
                    {phase.phase}
                  </h4>
                  <Badge variant="blue" className="text-xs">{phase.duration}</Badge>
                </div>
                <ul className="space-y-1.5">
                  {phase.tasks.map((task, j) => (
                    <li key={j} className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-300">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5">
                        <path fillRule="evenodd" d="M12.416 3.376a.75.75 0 0 1 .208 1.04l-5 7.5a.75.75 0 0 1-1.154.114l-3-3a.75.75 0 0 1 1.06-1.06l2.353 2.353 4.493-6.74a.75.75 0 0 1 1.04-.207Z" clipRule="evenodd" />
                      </svg>
                      {task}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Risks */}
      <Section
        icon={<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-amber-500"><path fillRule="evenodd" d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495ZM10 5a.75.75 0 0 1 .75.75v3.5a.75.75 0 0 1-1.5 0v-3.5A.75.75 0 0 1 10 5Zm0 9a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" clipRule="evenodd" /></svg>}
        title="Risk Analysis"
      >
        <div className="space-y-3">
          {risks.map((risk, i) => (
            <div key={i} className="rounded-lg border border-amber-200 dark:border-amber-800/50 bg-amber-50 dark:bg-amber-900/10 p-4">
              <div className="flex items-start justify-between gap-3 mb-2">
                <h4 className="font-semibold text-sm text-slate-900 dark:text-white">{risk.risk}</h4>
                <Badge variant={risk.impact === "High" ? "destructive" : "warning"} className="shrink-0">
                  {risk.impact} impact
                </Badge>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                <span className="font-medium">Mitigation: </span>
                {risk.mitigation}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* Monetization */}
      <Section
        icon={<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-emerald-500"><path d="M10.75 10.818v2.614A3.13 3.13 0 0 0 11.888 13c.482-.315.612-.648.612-.875 0-.227-.13-.56-.612-.875a3.13 3.13 0 0 0-1.138-.432ZM8.33 8.62c.053.055.115.11.184.164.208.16.46.284.736.363V6.603a2.45 2.45 0 0 0-.35.13c-.14.065-.27.143-.386.233-.377.292-.514.627-.514.909 0 .184.058.39.33.576Z" /><path fillRule="evenodd" d="M9.999 15.5c3.038 0 5.5-2.462 5.5-5.5s-2.462-5.5-5.5-5.5-5.5 2.462-5.5 5.5 2.462 5.5 5.5 5.5ZM9.4 7.01c.048.317.048.64 0 .957-.14-.052-.292-.094-.45-.127V5.61a2.2 2.2 0 0 1 .45-.127c.048.317.048.64 0 .957V7.01Zm.35 3.942v1.888a2.2 2.2 0 0 0 .45-.127V9.824a2.2 2.2 0 0 0-.45-.127v1.255ZM8.6 9.4h-.35a.35.35 0 0 0 0 .7h.35V9.4Zm1.4-.7h.35a.35.35 0 0 0 0-.7H10V8.7Z" clipRule="evenodd" /></svg>}
        title="Monetization Model"
      >
        <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed whitespace-pre-wrap">
          {project.generatedMonetization}
        </p>
      </Section>

      {/* Launch Checklist */}
      <Section
        icon={<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-emerald-500"><path fillRule="evenodd" d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z" clipRule="evenodd" /></svg>}
        title="Launch Checklist"
      >
        <ul className="space-y-2">
          {launchChecklist.map((item, i) => (
            <li key={i} className="flex items-center gap-2.5 text-sm text-slate-600 dark:text-slate-300 py-1.5 border-b border-slate-100 dark:border-slate-800 last:border-0">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 text-emerald-500 shrink-0">
                <path fillRule="evenodd" d="M12.416 3.376a.75.75 0 0 1 .208 1.04l-5 7.5a.75.75 0 0 1-1.154.114l-3-3a.75.75 0 0 1 1.06-1.06l2.353 2.353 4.493-6.74a.75.75 0 0 1 1.04-.207Z" clipRule="evenodd" />
              </svg>
              {item.replace(/^✅\s*/, "")}
            </li>
          ))}
        </ul>
      </Section>
    </div>
  );
}

function InfoBlock({ label, value, className }: { label: string; value: string; className?: string }) {
  return (
    <div className={className}>
      <p className="text-xs font-semibold uppercase tracking-wide text-slate-400 dark:text-slate-500 mb-1.5">
        {label}
      </p>
      <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">{value}</p>
    </div>
  );
}

function Section({
  icon,
  title,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6">
      <h2 className="text-base font-semibold text-slate-900 dark:text-white mb-5 flex items-center gap-2">
        {icon}
        {title}
      </h2>
      {children}
    </div>
  );
}
