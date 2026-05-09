"use client";

import jsPDF from "jspdf";

interface ProjectData {
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
  createdAt: string | Date;
}

/**
 * Exports a project's generated MVP plan to a PDF document.
 * Uses jsPDF for client-side PDF generation.
 */
export async function exportProjectToPDF(project: ProjectData): Promise<void> {
  const pdf = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });

  const pageWidth = 210;
  const pageHeight = 297;
  const margin = 20;
  const contentWidth = pageWidth - margin * 2;
  let y = margin;

  // Colors
  const navyRgb = { r: 15, g: 23, b: 42 };
  const blueRgb = { r: 59, g: 130, b: 246 };
  const grayRgb = { r: 100, g: 116, b: 139 };
  const lightGray = { r: 241, g: 245, b: 249 };

  const checkPage = (needed: number = 10) => {
    if (y + needed > pageHeight - margin) {
      pdf.addPage();
      y = margin;
    }
  };

  const addTitle = (text: string) => {
    checkPage(20);
    pdf.setFillColor(navyRgb.r, navyRgb.g, navyRgb.b);
    pdf.rect(margin, y, contentWidth, 12, "F");
    pdf.setTextColor(255, 255, 255);
    pdf.setFontSize(12);
    pdf.setFont("helvetica", "bold");
    pdf.text(text, margin + 4, y + 8);
    y += 16;
    pdf.setTextColor(navyRgb.r, navyRgb.g, navyRgb.b);
  };

  const addSectionTitle = (text: string) => {
    checkPage(15);
    pdf.setFillColor(blueRgb.r, blueRgb.g, blueRgb.b);
    pdf.rect(margin, y, 3, 8, "F");
    pdf.setTextColor(navyRgb.r, navyRgb.g, navyRgb.b);
    pdf.setFontSize(11);
    pdf.setFont("helvetica", "bold");
    pdf.text(text, margin + 6, y + 6);
    y += 12;
  };

  const addBodyText = (text: string, indent: number = 0) => {
    pdf.setFontSize(9);
    pdf.setFont("helvetica", "normal");
    pdf.setTextColor(grayRgb.r, grayRgb.g, grayRgb.b);
    const lines = pdf.splitTextToSize(text, contentWidth - indent);
    lines.forEach((line: string) => {
      checkPage(6);
      pdf.text(line, margin + indent, y);
      y += 5;
    });
    y += 2;
  };

  const addBullet = (text: string) => {
    checkPage(6);
    pdf.setFontSize(9);
    pdf.setFont("helvetica", "normal");
    pdf.setTextColor(grayRgb.r, grayRgb.g, grayRgb.b);
    pdf.setFillColor(blueRgb.r, blueRgb.g, blueRgb.b);
    pdf.circle(margin + 2, y - 1, 0.8, "F");
    const lines = pdf.splitTextToSize(text, contentWidth - 8);
    lines.forEach((line: string, i: number) => {
      checkPage(5);
      pdf.text(line, margin + 6, y + (i * 5));
    });
    y += lines.length * 5 + 1;
  };

  // ── Cover Page ──────────────────────────────────────────────────────────────
  pdf.setFillColor(navyRgb.r, navyRgb.g, navyRgb.b);
  pdf.rect(0, 0, pageWidth, 80, "F");

  pdf.setTextColor(255, 255, 255);
  pdf.setFontSize(22);
  pdf.setFont("helvetica", "bold");
  pdf.text("LaunchPilot AI", margin, 30);
  pdf.setFontSize(13);
  pdf.setFont("helvetica", "normal");
  pdf.setTextColor(blueRgb.r, blueRgb.g + 50, 255);
  pdf.text("MVP Plan Report", margin, 40);

  pdf.setFontSize(16);
  pdf.setFont("helvetica", "bold");
  pdf.setTextColor(255, 255, 255);
  const titleLines = pdf.splitTextToSize(project.title, contentWidth);
  titleLines.forEach((line: string, i: number) => {
    pdf.text(line, margin, 56 + i * 8);
  });

  y = 95;
  pdf.setFillColor(lightGray.r, lightGray.g, lightGray.b);
  pdf.rect(margin, y, contentWidth, 40, "F");
  pdf.setTextColor(navyRgb.r, navyRgb.g, navyRgb.b);
  pdf.setFontSize(9);
  pdf.setFont("helvetica", "bold");

  const metaItems = [
    [`Industry:`, project.industry],
    [`Target Users:`, project.targetUsers],
    [`Budget Level:`, project.budgetLevel.toUpperCase()],
    [`Timeline:`, project.timeline],
    [`Generated:`, new Date(project.createdAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })],
  ];

  metaItems.forEach(([label, value], i) => {
    const col = i % 2 === 0 ? margin + 4 : margin + contentWidth / 2;
    const row = y + 8 + Math.floor(i / 2) * 10;
    pdf.setFont("helvetica", "bold");
    pdf.text(label, col, row);
    pdf.setFont("helvetica", "normal");
    pdf.setTextColor(grayRgb.r, grayRgb.g, grayRgb.b);
    pdf.text(value, col + 28, row);
    pdf.setTextColor(navyRgb.r, navyRgb.g, navyRgb.b);
  });

  y = 150;

  // ── Executive Summary ──────────────────────────────────────────────────────
  addTitle("EXECUTIVE SUMMARY");
  addBodyText(project.generatedSummary);

  // ── MVP Features ──────────────────────────────────────────────────────────
  addSectionTitle("MVP Feature List");
  project.generatedFeatures.forEach((f) => addBullet(f));

  // ── Tech Stack ────────────────────────────────────────────────────────────
  addSectionTitle("Recommended Tech Stack");
  const techStack = project.generatedTechStack;

  const techSections = [
    ["Frontend", techStack.frontend],
    ["Backend", techStack.backend],
    ["Database", techStack.database],
    ["Deployment", techStack.deployment],
    ["Optional", techStack.optional],
  ] as [string, string[]][];

  techSections.forEach(([label, items]) => {
    checkPage(8);
    pdf.setFontSize(9);
    pdf.setFont("helvetica", "bold");
    pdf.setTextColor(navyRgb.r, navyRgb.g, navyRgb.b);
    pdf.text(`${label}:`, margin, y);
    pdf.setFont("helvetica", "normal");
    pdf.setTextColor(grayRgb.r, grayRgb.g, grayRgb.b);
    pdf.text(items.join(", "), margin + 22, y);
    y += 6;
  });
  y += 4;

  // ── User Stories ──────────────────────────────────────────────────────────
  addTitle("USER STORIES");
  project.generatedUserStories.forEach((s, i) => {
    addBullet(`${i + 1}. ${s}`);
  });

  // ── Roadmap ───────────────────────────────────────────────────────────────
  addTitle("DEVELOPMENT ROADMAP");
  project.generatedRoadmap.forEach((phase) => {
    addSectionTitle(`${phase.phase} (${phase.duration})`);
    phase.tasks.forEach((task) => addBullet(task));
  });

  // ── Risks ─────────────────────────────────────────────────────────────────
  addTitle("RISK ANALYSIS");
  project.generatedRisks.forEach((risk) => {
    checkPage(18);
    pdf.setFontSize(10);
    pdf.setFont("helvetica", "bold");
    pdf.setTextColor(navyRgb.r, navyRgb.g, navyRgb.b);
    pdf.text(`⚠ ${risk.risk}`, margin, y);
    y += 5;
    pdf.setFontSize(9);
    pdf.setFont("helvetica", "bold");
    pdf.setTextColor(grayRgb.r, grayRgb.g, grayRgb.b);
    pdf.text(`Impact: ${risk.impact}`, margin + 4, y);
    y += 5;
    pdf.setFont("helvetica", "normal");
    addBodyText(`Mitigation: ${risk.mitigation}`, 4);
  });

  // ── Monetization ──────────────────────────────────────────────────────────
  addTitle("MONETIZATION MODEL");
  addBodyText(project.generatedMonetization);

  // ── Launch Checklist ──────────────────────────────────────────────────────
  addTitle("LAUNCH CHECKLIST");
  project.generatedLaunchChecklist.forEach((item) => addBullet(item));

  // ── Footer ────────────────────────────────────────────────────────────────
  const totalPages = pdf.getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    pdf.setPage(i);
    pdf.setFontSize(7);
    pdf.setFont("helvetica", "normal");
    pdf.setTextColor(grayRgb.r, grayRgb.g, grayRgb.b);
    pdf.text(
      `LaunchPilot AI — MVP Plan for ${project.title} | Page ${i} of ${totalPages}`,
      margin,
      pageHeight - 8
    );
    pdf.text(
      "Generated by LaunchPilot AI | launchpilot-ai.vercel.app",
      pageWidth - margin,
      pageHeight - 8,
      { align: "right" }
    );
  }

  // Save the PDF
  const fileName = `${project.title.replace(/[^a-z0-9]/gi, "-").toLowerCase()}-mvp-plan.pdf`;
  pdf.save(fileName);
}
