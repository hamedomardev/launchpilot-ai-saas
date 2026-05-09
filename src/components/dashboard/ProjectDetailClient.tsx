"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";

interface ProjectData {
  id: string;
  title: string;
  industry: string;
  targetUsers: string;
  problem: string;
  solution: string;
  goals: string;
  budgetLevel: string;
  timeline: string;
  generatedSummary: string;
  generatedFeatures: string[];
  generatedTechStack: {
    frontend: string[];
    backend: string[];
    database: string[];
    deployment: string[];
    optional: string[];
  };
  generatedUserStories: string[];
  generatedRoadmap: { phase: string; duration: string; tasks: string[] }[];
  generatedRisks: { risk: string; impact: string; mitigation: string }[];
  generatedMonetization: string;
  generatedLaunchChecklist: string[];
  createdAt: string;
}

export function ProjectDetailClient({ project }: { project: ProjectData }) {
  const router = useRouter();
  const [isExporting, setIsExporting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleExportPDF = async () => {
    setIsExporting(true);
    try {
      // Dynamic import to avoid SSR issues
      const { exportProjectToPDF } = await import("@/lib/pdf");
      await exportProjectToPDF(project);
    } catch (error) {
      console.error("PDF export error:", error);
      alert("Failed to export PDF. Please try again.");
    } finally {
      setIsExporting(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm(`Are you sure you want to delete "${project.title}"? This cannot be undone.`)) return;

    setIsDeleting(true);
    try {
      const res = await fetch(`/api/projects/${project.id}`, { method: "DELETE" });
      if (res.ok) {
        router.push("/dashboard/projects");
        router.refresh();
      } else {
        alert("Failed to delete project. Please try again.");
        setIsDeleting(false);
      }
    } catch {
      alert("Network error. Please try again.");
      setIsDeleting(false);
    }
  };

  return (
    <div className="flex items-center gap-2 shrink-0">
      <Button
        variant="outline"
        size="sm"
        className="border-white/30 text-white bg-white/10 hover:bg-white/20 dark:border-white/30"
        onClick={handleExportPDF}
        isLoading={isExporting}
        leftIcon={
          !isExporting && (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
              <path fillRule="evenodd" d="M4.5 2A1.5 1.5 0 0 0 3 3.5v13A1.5 1.5 0 0 0 4.5 18h11a1.5 1.5 0 0 0 1.5-1.5V7.621a1.5 1.5 0 0 0-.44-1.06l-4.12-4.122A1.5 1.5 0 0 0 11.378 2H4.5Zm4.75 6.75a.75.75 0 0 1 1.5 0v2.546l.943-1.048a.75.75 0 1 1 1.114 1.004l-2.25 2.5a.75.75 0 0 1-1.114 0l-2.25-2.5a.75.75 0 1 1 1.114-1.004l.943 1.048V8.75Z" clipRule="evenodd" />
            </svg>
          )
        }
      >
        {isExporting ? "Exporting..." : "Export PDF"}
      </Button>
      <Button
        variant="destructive"
        size="sm"
        className="bg-red-500/80 hover:bg-red-600 border-0"
        onClick={handleDelete}
        isLoading={isDeleting}
        leftIcon={
          !isDeleting && (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
              <path fillRule="evenodd" d="M8.75 1A2.75 2.75 0 0 0 6 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 1 0 .23 1.482l.149-.022.841 10.518A2.75 2.75 0 0 0 7.596 19h4.807a2.75 2.75 0 0 0 2.742-2.53l.841-10.52.149.023a.75.75 0 0 0 .23-1.482A41.03 41.03 0 0 0 14 4.193V3.75A2.75 2.75 0 0 0 11.25 1h-2.5ZM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4ZM8.58 7.72a.75.75 0 0 0-1.5.06l.3 7.5a.75.75 0 1 0 1.5-.06l-.3-7.5Zm4.34.06a.75.75 0 1 0-1.5-.06l-.3 7.5a.75.75 0 1 0 1.5.06l.3-7.5Z" clipRule="evenodd" />
            </svg>
          )
        }
      >
        {isDeleting ? "Deleting..." : "Delete"}
      </Button>
    </div>
  );
}
