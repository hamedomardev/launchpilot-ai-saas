"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input, Textarea, Select } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

const INDUSTRIES = [
  { value: "saas", label: "SaaS / Software" },
  { value: "healthcare", label: "Healthcare / MedTech" },
  { value: "fintech", label: "FinTech / Finance" },
  { value: "edtech", label: "EdTech / Education" },
  { value: "ecommerce", label: "E-commerce / Retail" },
  { value: "real estate", label: "Real Estate / PropTech" },
  { value: "logistics", label: "Logistics / Supply Chain" },
  { value: "social", label: "Social / Community" },
  { value: "gaming", label: "Gaming / Entertainment" },
  { value: "marketplace", label: "Marketplace / Platform" },
  { value: "ai ml", label: "AI / Machine Learning" },
  { value: "other", label: "Other" },
];

const BUDGET_OPTIONS = [
  { value: "low", label: "Low (< $10K)" },
  { value: "medium", label: "Medium ($10K–$50K)" },
  { value: "high", label: "High (> $50K)" },
];

const TIMELINE_OPTIONS = [
  { value: "2 weeks", label: "2 Weeks" },
  { value: "1 month", label: "1 Month" },
  { value: "2-3 months", label: "2–3 Months" },
  { value: "3-6 months", label: "3–6 Months" },
];

interface FormErrors {
  [key: string]: string;
}

export default function NewProjectPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [apiError, setApiError] = useState("");

  const [form, setForm] = useState({
    title: "",
    industry: "",
    targetUsers: "",
    problem: "",
    solution: "",
    goals: "",
    budgetLevel: "",
    timeline: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!form.title.trim() || form.title.length < 2)
      newErrors.title = "Project title is required (min 2 characters)";
    if (!form.industry) newErrors.industry = "Industry is required";
    if (!form.targetUsers.trim() || form.targetUsers.length < 5)
      newErrors.targetUsers = "Target users description is required";
    if (!form.problem.trim() || form.problem.length < 10)
      newErrors.problem = "Problem description must be at least 10 characters";
    if (!form.solution.trim() || form.solution.length < 10)
      newErrors.solution = "Proposed solution must be at least 10 characters";
    if (!form.goals.trim() || form.goals.length < 5)
      newErrors.goals = "Main goals are required";
    if (!form.budgetLevel) newErrors.budgetLevel = "Please select a budget level";
    if (!form.timeline) newErrors.timeline = "Please select a timeline";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setApiError("");

    try {
      const response = await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok) {
        setApiError(data.error || "Failed to generate MVP plan. Please try again.");
        return;
      }

      router.push(`/dashboard/projects/${data.project.id}`);
    } catch {
      setApiError("Network error. Please check your connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white shadow-sm">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
              <path fillRule="evenodd" d="M9 4.5a.75.75 0 0 1 .721.544l.813 2.846a3.75 3.75 0 0 0 2.576 2.576l2.846.813a.75.75 0 0 1 0 1.442l-2.846.813a3.75 3.75 0 0 0-2.576 2.576l-.813 2.846a.75.75 0 0 1-1.442 0l-.813-2.846a3.75 3.75 0 0 0-2.576-2.576l-2.846-.813a.75.75 0 0 1 0-1.442l2.846-.813A3.75 3.75 0 0 0 7.466 7.89l.813-2.846A.75.75 0 0 1 9 4.5Z" clipRule="evenodd" />
            </svg>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
              Generate MVP Plan
            </h1>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Fill in your startup idea and get a complete structured plan in seconds.
            </p>
          </div>
        </div>
      </div>

      {/* Error banner */}
      {apiError && (
        <div className="mb-6 rounded-lg border border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-900/20 p-4 flex items-start gap-3">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-red-500 shrink-0 mt-0.5">
            <path fillRule="evenodd" d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 1.995-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.505-2.598-4.5L9.4 3.003ZM12 8.25a.75.75 0 0 1 .75.75v3.75a.75.75 0 0 1-1.5 0V9a.75.75 0 0 1 .75-.75Zm0 8.25a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z" clipRule="evenodd" />
          </svg>
          <div>
            <p className="text-sm font-medium text-red-700 dark:text-red-400">{apiError}</p>
          </div>
        </div>
      )}

      {/* Loading overlay */}
      {isSubmitting && (
        <div className="mb-6 rounded-lg border border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-900/20 p-4 flex items-center gap-3">
          <svg className="w-5 h-5 animate-spin text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
          <div>
            <p className="text-sm font-medium text-blue-700 dark:text-blue-400">
              Generating your MVP plan...
            </p>
            <p className="text-xs text-blue-600 dark:text-blue-500">
              Our AI engine is analyzing your idea and crafting a structured plan.
            </p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Section 1: Basic Info */}
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6">
          <h2 className="text-base font-semibold text-slate-900 dark:text-white mb-5 flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-400 text-xs font-bold">1</span>
            Basic Information
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="sm:col-span-2">
              <Input
                label="Startup Idea Name"
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="e.g. MedConnect Pro"
                error={errors.title}
                required
              />
            </div>
            <Select
              label="Industry"
              name="industry"
              value={form.industry}
              onChange={handleChange}
              options={INDUSTRIES}
              placeholder="Select an industry"
              error={errors.industry}
              required
            />
            <Input
              label="Target Users"
              name="targetUsers"
              value={form.targetUsers}
              onChange={handleChange}
              placeholder="e.g. Healthcare professionals"
              error={errors.targetUsers}
              required
            />
          </div>
        </div>

        {/* Section 2: Problem & Solution */}
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6">
          <h2 className="text-base font-semibold text-slate-900 dark:text-white mb-5 flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-400 text-xs font-bold">2</span>
            Problem & Solution
          </h2>
          <div className="space-y-5">
            <Textarea
              label="Problem Description"
              name="problem"
              value={form.problem}
              onChange={handleChange}
              placeholder="Describe the core problem your startup is solving..."
              rows={4}
              error={errors.problem}
              required
            />
            <Textarea
              label="Proposed Solution"
              name="solution"
              value={form.solution}
              onChange={handleChange}
              placeholder="Describe how your product solves this problem..."
              rows={4}
              error={errors.solution}
              required
            />
            <Textarea
              label="Main Goals"
              name="goals"
              value={form.goals}
              onChange={handleChange}
              placeholder="e.g. Achieve 1,000 users in 3 months, reduce patient wait time by 40%..."
              rows={3}
              error={errors.goals}
              required
            />
          </div>
        </div>

        {/* Section 3: Budget & Timeline */}
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6">
          <h2 className="text-base font-semibold text-slate-900 dark:text-white mb-5 flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-400 text-xs font-bold">3</span>
            Budget & Timeline
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <Select
              label="Budget Level"
              name="budgetLevel"
              value={form.budgetLevel}
              onChange={handleChange}
              options={BUDGET_OPTIONS}
              placeholder="Select budget range"
              error={errors.budgetLevel}
              required
              hint="Affects tech stack and feature recommendations"
            />
            <Select
              label="Development Timeline"
              name="timeline"
              value={form.timeline}
              onChange={handleChange}
              options={TIMELINE_OPTIONS}
              placeholder="Select timeline"
              error={errors.timeline}
              required
              hint="Affects roadmap and MVP scope"
            />
          </div>
        </div>

        {/* Submit */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.back()}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            isLoading={isSubmitting}
            leftIcon={
              !isSubmitting && (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                  <path fillRule="evenodd" d="M9 4.5a.75.75 0 0 1 .721.544l.813 2.846a3.75 3.75 0 0 0 2.576 2.576l2.846.813a.75.75 0 0 1 0 1.442l-2.846.813a3.75 3.75 0 0 0-2.576 2.576l-.813 2.846a.75.75 0 0 1-1.442 0l-.813-2.846a3.75 3.75 0 0 0-2.576-2.576l-2.846-.813a.75.75 0 0 1 0-1.442l2.846-.813A3.75 3.75 0 0 0 7.466 7.89l.813-2.846A.75.75 0 0 1 9 4.5Z" clipRule="evenodd" />
                </svg>
              )
            }
          >
            {isSubmitting ? "Generating Plan..." : "Generate MVP Plan"}
          </Button>
        </div>
      </form>
    </div>
  );
}
