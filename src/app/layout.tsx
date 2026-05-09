import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "LaunchPilot AI — AI SaaS Platform for Startup MVP Planning",
  description:
    "LaunchPilot AI helps startup founders turn rough ideas into structured MVP plans, feature lists, technical roadmaps, user stories, risks, monetization strategies, and launch checklists.",
  keywords: ["MVP planning", "startup", "SaaS", "AI", "product roadmap", "feature list"],
  authors: [{ name: "Hamed Omar" }],
  openGraph: {
    title: "LaunchPilot AI",
    description: "Turn startup ideas into MVP plans in minutes.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  );
}
