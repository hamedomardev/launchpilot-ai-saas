import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Navbar */}
      <nav className="fixed top-0 inset-x-0 z-50 border-b border-slate-800/60 bg-slate-950/80 backdrop-blur-xl">
        <div className="mx-auto max-w-7xl px-6 flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="w-4 h-4">
                <path fillRule="evenodd" d="M14.615 1.595a.75.75 0 0 1 .359.852L12.982 9.75h7.268a.75.75 0 0 1 .548 1.262l-10.5 11.25a.75.75 0 0 1-1.272-.71l1.992-7.302H3.818a.75.75 0 0 1-.548-1.262l10.5-11.25a.75.75 0 0 1 .845-.143Z" clipRule="evenodd" />
              </svg>
            </div>
            <span className="font-bold text-lg">LaunchPilot <span className="text-blue-400">AI</span></span>
          </Link>
          <div className="hidden md:flex items-center gap-8 text-sm text-slate-400">
            <a href="#features" className="hover:text-white transition-colors">Features</a>
            <a href="#how-it-works" className="hover:text-white transition-colors">How It Works</a>
            <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/login" className="text-sm text-slate-300 hover:text-white transition-colors px-3 py-1.5">
              Sign In
            </Link>
            <Link href="/register" className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-500 transition-colors shadow-lg shadow-blue-600/20">
              Get Started Free
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/30 via-slate-950 to-slate-950" />
        <div className="absolute top-24 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-blue-600/10 blur-[100px] rounded-full" />
        <div className="relative mx-auto max-w-5xl px-6 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-1.5 text-xs font-medium text-blue-400 mb-8">
            <span className="h-1.5 w-1.5 rounded-full bg-blue-400 animate-pulse" />
            AI-Powered MVP Planning · No API Key Required
          </div>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight mb-6 bg-gradient-to-br from-white via-slate-200 to-slate-400 bg-clip-text text-transparent leading-tight">
            Turn Ideas Into<br />MVP Plans in Minutes
          </h1>
          <p className="text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            LaunchPilot AI helps startup founders structure rough ideas into complete MVP plans — with features, roadmaps, user stories, risks, and launch checklists.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/register" className="rounded-xl bg-blue-600 px-8 py-3.5 text-base font-semibold text-white hover:bg-blue-500 transition-all shadow-lg shadow-blue-600/30 hover:shadow-blue-500/40 hover:-translate-y-0.5">
              Start for Free →
            </Link>
            <a href="#how-it-works" className="rounded-xl border border-slate-700 px-8 py-3.5 text-base font-semibold text-slate-300 hover:border-slate-500 hover:text-white transition-colors">
              See How It Works
            </a>
          </div>
          <p className="mt-4 text-xs text-slate-500">No credit card required · No API key needed</p>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-16 border-y border-slate-800">
        <div className="mx-auto max-w-5xl px-6 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">The Problem Every Founder Faces</h2>
          <p className="text-slate-400 max-w-2xl mx-auto mb-10">You have a great startup idea — but turning it into a structured plan that developers, investors, and co-founders can understand takes weeks of work.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: "⏱", title: "Wasted Weeks", desc: "Founders spend weeks structuring ideas instead of building." },
              { icon: "📋", title: "Missing Structure", desc: "Ideas without roadmaps, user stories, and risk plans fail to execute." },
              { icon: "💸", title: "Expensive Consultants", desc: "Hiring product managers to plan MVPs costs thousands of dollars." },
            ].map((item) => (
              <div key={item.title} className="rounded-xl border border-slate-800 bg-slate-900/50 p-6 text-left">
                <div className="text-3xl mb-3">{item.icon}</div>
                <h3 className="font-semibold text-white mb-2">{item.title}</h3>
                <p className="text-sm text-slate-400">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Everything You Need to Launch</h2>
            <p className="text-slate-400 max-w-xl mx-auto">From a rough idea to a complete structured plan — in one click.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { icon: "📝", title: "Executive Summary", desc: "Clear, concise overview tailored to your idea, industry, and goals." },
              { icon: "⚡", title: "MVP Features", desc: "Prioritized feature list scoped to your budget and timeline." },
              { icon: "🛠", title: "Tech Stack", desc: "Recommended frontend, backend, database, and deployment tools." },
              { icon: "👤", title: "User Stories", desc: "Role-based user stories written in standard format." },
              { icon: "🗺", title: "Dev Roadmap", desc: "Phased development timeline from setup to launch." },
              { icon: "⚠️", title: "Risk Analysis", desc: "Key risks with impact ratings and mitigation strategies." },
              { icon: "💰", title: "Monetization", desc: "Revenue model suggestions based on your industry." },
              { icon: "🚀", title: "Launch Checklist", desc: "18-point checklist to ensure a successful product launch." },
            ].map((f) => (
              <div key={f.title} className="group rounded-xl border border-slate-800 bg-slate-900/50 hover:border-blue-700/50 hover:bg-slate-900 p-5 transition-all duration-200">
                <div className="text-2xl mb-3">{f.icon}</div>
                <h3 className="font-semibold text-white mb-1.5 text-sm">{f.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 bg-slate-900/40 border-y border-slate-800">
        <div className="mx-auto max-w-5xl px-6">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">How It Works</h2>
            <p className="text-slate-400">Three simple steps from idea to complete MVP plan.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { step: "01", title: "Describe Your Idea", desc: "Enter your startup name, industry, target users, problem, solution, goals, budget, and timeline." },
              { step: "02", title: "Generate Your Plan", desc: "Our AI engine analyzes your inputs and generates a complete structured MVP plan in seconds." },
              { step: "03", title: "Export & Execute", desc: "Download your plan as PDF, share with your team, and start building your startup." },
            ].map((s) => (
              <div key={s.step} className="relative flex flex-col items-start">
                <div className="text-5xl font-black text-blue-900/60 mb-4">{s.step}</div>
                <h3 className="text-lg font-bold text-white mb-2">{s.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Simple, Transparent Pricing</h2>
          <p className="text-slate-400 mb-12">Start free, upgrade when you need more.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-8 text-left">
              <h3 className="text-lg font-bold text-white mb-1">Free</h3>
              <div className="text-4xl font-black text-white mb-6">$0<span className="text-base font-normal text-slate-400">/mo</span></div>
              <ul className="space-y-3 mb-8">
                {["5 MVP plans per month", "All 8 plan sections", "PDF export", "Dashboard & analytics"].map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm text-slate-300">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 text-emerald-400">
                      <path fillRule="evenodd" d="M12.416 3.376a.75.75 0 0 1 .208 1.04l-5 7.5a.75.75 0 0 1-1.154.114l-3-3a.75.75 0 0 1 1.06-1.06l2.353 2.353 4.493-6.74a.75.75 0 0 1 1.04-.207Z" clipRule="evenodd" />
                    </svg>
                    {f}
                  </li>
                ))}
              </ul>
              <Link href="/register" className="block w-full rounded-lg border border-slate-700 py-2.5 text-center text-sm font-semibold text-white hover:border-slate-500 transition-colors">
                Get Started Free
              </Link>
            </div>
            <div className="rounded-2xl border border-blue-500/50 bg-gradient-to-br from-blue-900/30 to-indigo-900/30 p-8 text-left relative">
              <div className="absolute -top-3 left-6 rounded-full bg-blue-600 px-3 py-0.5 text-xs font-bold text-white">COMING SOON</div>
              <h3 className="text-lg font-bold text-white mb-1">Pro</h3>
              <div className="text-4xl font-black text-white mb-6">$19<span className="text-base font-normal text-slate-400">/mo</span></div>
              <ul className="space-y-3 mb-8">
                {["Unlimited MVP plans", "Real LLM-powered generation", "Custom branding on PDFs", "Priority support", "Team collaboration"].map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm text-slate-300">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 text-blue-400">
                      <path fillRule="evenodd" d="M12.416 3.376a.75.75 0 0 1 .208 1.04l-5 7.5a.75.75 0 0 1-1.154.114l-3-3a.75.75 0 0 1 1.06-1.06l2.353 2.353 4.493-6.74a.75.75 0 0 1 1.04-.207Z" clipRule="evenodd" />
                    </svg>
                    {f}
                  </li>
                ))}
              </ul>
              <button disabled className="block w-full rounded-lg bg-blue-600/40 py-2.5 text-center text-sm font-semibold text-blue-300 cursor-not-allowed">
                Coming Soon
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 border-t border-slate-800">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Ready to Launch Your Idea?</h2>
          <p className="text-slate-400 mb-8">Join founders who are turning ideas into structured plans with LaunchPilot AI.</p>
          <Link href="/register" className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-8 py-3.5 text-base font-semibold text-white hover:bg-blue-500 transition-all shadow-lg shadow-blue-600/30">
            Get Started Free →
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800 py-10">
        <div className="mx-auto max-w-7xl px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="w-3.5 h-3.5">
                <path fillRule="evenodd" d="M14.615 1.595a.75.75 0 0 1 .359.852L12.982 9.75h7.268a.75.75 0 0 1 .548 1.262l-10.5 11.25a.75.75 0 0 1-1.272-.71l1.992-7.302H3.818a.75.75 0 0 1-.548-1.262l10.5-11.25a.75.75 0 0 1 .845-.143Z" clipRule="evenodd" />
              </svg>
            </div>
            <span className="font-bold text-sm text-white">LaunchPilot AI</span>
          </div>
          <div className="text-center md:text-right">
            <p className="text-sm text-slate-400">
              Built by <span className="text-white font-medium">Hamed Omar</span> — Full-Stack & Mobile Product Engineer · Cairo, Egypt
            </p>
            <a href="mailto:omarhamedbadr1244@gmail.com" className="text-xs text-blue-400 hover:text-blue-300">
              omarhamedbadr1244@gmail.com
            </a>
          </div>
        </div>
        <div className="mt-6 text-center text-xs text-slate-600">
          © {new Date().getFullYear()} LaunchPilot AI. Built with Next.js, TypeScript & Prisma.
        </div>
      </footer>
    </div>
  );
}
