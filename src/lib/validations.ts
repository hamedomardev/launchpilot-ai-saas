import { z } from "zod";

// ─── Auth Validations ─────────────────────────────────────────────────────────

export const registerSchema = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Please enter a valid email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(1, "Password is required"),
});

// ─── Project Validations ──────────────────────────────────────────────────────

export const projectSchema = z.object({
  title: z.string().min(2, "Project title is required (min 2 characters)"),
  industry: z.string().min(2, "Industry is required"),
  targetUsers: z.string().min(5, "Target users description is required"),
  problem: z
    .string()
    .min(10, "Problem description must be at least 10 characters"),
  solution: z
    .string()
    .min(10, "Proposed solution must be at least 10 characters"),
  goals: z.string().min(5, "Main goals are required"),
  budgetLevel: z.enum(["low", "medium", "high"]).refine(
    (val) => ["low", "medium", "high"].includes(val),
    { message: "Please select a budget level" }
  ),
  timeline: z.enum(["2 weeks", "1 month", "2-3 months", "3-6 months"]).refine(
    (val) => ["2 weeks", "1 month", "2-3 months", "3-6 months"].includes(val),
    { message: "Please select a timeline" }
  ),
});

// ─── Profile Validations ──────────────────────────────────────────────────────

export const updateProfileSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
});

// Type exports
export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type ProjectInput = z.infer<typeof projectSchema>;
export type UpdateProfileInput = z.infer<typeof updateProfileSchema>;
