import React from 'react';
import { Zap, BrainCircuit, ShieldCheck } from 'lucide-react';

// You can place this component in your components directory
const HeroSection = () => {
  // Data for the new features/benefits section
  const features = [
    {
      icon: Zap,
      title: "Instant & Accurate Calculations",
      description: "Connect your data sources and get real-time, precise CO₂e calculations for your entire supply chain. No more spreadsheets, no more guesswork."
    },
    {
      icon: BrainCircuit,
      title: "AI-Powered Insights",
      description: "Our platform uses Gemini to analyze your emissions data, identify hotspots, and provide actionable, cost-effective strategies for reduction."
    },
    {
      icon: ShieldCheck,
      title: "Auditable & Compliant",
      description: "Generate investor-grade reports compliant with global standards like GHG Protocol. Partner with verified NGOs for transparent carbon offsetting."
    }
  ];

  return (
    <main className="min-h-screen">
      <img
        src="/foot.png"
        alt="A decorative vertical image"
        className="absolute top-20 left-0 w-40 z-20"
      ></img>
      <img
        src="/foot.png"
        alt="A decorative vertical image"
        className="absolute top-90 left-0 w-40 z-20"
      ></img>
      <img
        src="/foot.png"
        alt="A decorative vertical image"
        className="absolute bottom-10 right-0 w-40 z-20"
      ></img>
      <img
        src="/foot.png"
        alt="A decorative vertical image"
        className="absolute bottom-80 right-0 w-40 z-20"
      ></img>
      {/* Main Hero Section */}
      <div className="relative isolate overflow-hidden bg-white pb-24 pt-28">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-16 px-6">
          <section className="grid gap-12 lg:grid-cols-[2fr,1fr]">
            {/* Left Column: Text Content */}
            <div className="space-y-8 animate-fade-in">
              <span className="inline-flex items-center gap-2 rounded-full border border-[#85b708]/20 bg-[#85b708]/10 px-4 py-1 text-xs uppercase tracking-wider text-[#85b708]/70">
                EcoImpactWorkflow • Pilot Studio
              </span>
              <h1 className="text-6xl font-semibold tracking-tight text-[#003e0c]">
                Measure. Reduce. Sustain.<br /> Make Your Business Carbon-Conscious.
              </h1>
              <p className="text-lg text-[#003e0c]/70 sm:max-w-2xl">
                Forecast carbon, spin up mitigations, and ship offsets in one command center. We orchestrate emissions modelling, weather intelligence, Gemini analysis, and marketplace activations so teams can ship greener without slowing operations.
              </p>
              <div className="flex items-center">
                <a href="/calculator" className="bg-[#003e0c] text-white font-bold py-3 px-8 rounded-lg shadow-md hover:bg-[#005a14] hover:scale-105 transform transition-transform duration-200 mt-6">
                  Find Carbon Emitted
                </a>
              </div>
            </div>

            {/* Right Column: Visual Component */}
            <div className="relative animate-fade-in animation-delay-300">
              <div className="rounded-2xl border-2 border-slate-200/80 bg-slate-50/50 p-6 shadow-lg backdrop-blur-sm">
                <div className="mb-4">
                  <p className="text-sm font-medium text-[#003e0c]">Current Impact</p>
                  <p className="text-xs text-slate-500">Last 30 Days</p>
                </div>
                <div className="mb-6 flex items-baseline gap-2">
                  <p className="text-4xl font-semibold text-[#003e0c]">452.8</p>
                  <p className="text-slate-600">kg CO₂e</p>
                </div>
                {/* Mock Graph Section */}
                <div className="w-full rounded-lg bg-slate-100 p-3 flex items-center justify-between shadow-sm">
                  {/* Graph Container */}
                  <div className="h-80 rounded-lg border-2 border-dashed border-slate-300 flex items-center justify-center overflow-hidden bg-white">
                    <img src="/graph.png" alt="Weekly Reduction Graph" className="h-full w-full object-contain" />
                  </div>

                  {/* Motivational Text */}
                  <div className="ml-1 flex flex-col">
                    <p className="text-sm font-semibold text-[#003e0c]">
                      Wow! Great progress this week!
                    </p>
                    <p className="text-xs text-black mt-1">
                      You achieved a significant reduction in your carbon score — keep it up!
                    </p>
                  </div>
                </div>

                <div className="mt-6 space-y-3">
                  <p className="text-sm font-medium text-[#003e0c]">Mitigation Suggestions</p>
                  <div className="flex items-center gap-3 rounded-lg bg-white p-3 shadow-sm">
                    <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-[#85b708]/20">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5 text-[#85b708]">
                        <path fillRule="evenodd" d="M15.962 2.962a1.5 1.5 0 0 0-2.122 0l-5.363 5.364-.877.877a1.5 1.5 0 0 0 0 2.121l.877.877 5.364 5.364a1.5 1.5 0 0 0 2.121-2.121L11.72 12l4.242-4.243a1.5 1.5 0 0 0 0-2.121Z" clipRule="evenodd" />
                        <path d="M4.038 2.962a1.5 1.5 0 0 0-2.122 0l-1.877 1.877a1.5 1.5 0 0 0 0 2.121l1.877 1.877a1.5 1.5 0 0 0 2.121-2.121L2.78 7.5l1.257-1.257a1.5 1.5 0 0 0 0-2.121Z" />
                      </svg>
                    </div>
                    <p className="text-xs text-slate-700">Switch to EV Fleet for Route A-B</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* "Trusted By" Logo Strip */}
          <section className="animate-fade-in animation-delay-500">
            <h2 className="text-center text-sm font-semibold uppercase tracking-widest text-slate-500">
              Trusted by climate-conscious leaders
            </h2>
            <div className="mx-auto mt-8 grid max-w-lg grid-cols-2 items-center gap-x-8 gap-y-10 sm:max-w-xl sm:grid-cols-5 sm:gap-x-10 lg:mx-0 lg:max-w-none">
              {/* Placeholder Logos */}
              <svg className="col-span-1 h-8 w-auto max-h-12 w-full object-contain text-slate-300 transition-colors hover:text-slate-400" viewBox="0 0 49 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M24.5 48C38.031 48 49 37.2548 49 24C49 10.7452 38.031 0 24.5 0C10.969 0 0 10.7452 0 24C0 37.2548 10.969 48 24.5 48Z" fill="currentColor"></path></svg>
              <svg className="col-span-1 h-8 w-auto max-h-12 w-full object-contain text-slate-300 transition-colors hover:text-slate-400" viewBox="0 0 49 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M49 24H0V48H49V24Z" fill="currentColor"></path><path d="M24.5 0L49 24H0L24.5 0Z" fill="currentColor"></path></svg>
              <svg className="col-span-1 h-8 w-auto max-h-12 w-full object-contain text-slate-300 transition-colors hover:text-slate-400" viewBox="0 0 49 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M24.5 0L49 48H0L24.5 0Z" fill="currentColor"></path></svg>
              <svg className="col-span-1 h-8 w-auto max-h-12 w-full object-contain text-slate-300 transition-colors hover:text-slate-400" viewBox="0 0 49 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0 0H24.5V48H0V0Z" fill="currentColor"></path><path d="M24.5 0H49V48H24.5V0Z" fill="currentColor"></path></svg>
              <svg className="col-span-1 h-8 w-auto max-h-12 w-full object-contain text-slate-300 transition-colors hover:text-slate-400" viewBox="0 0 49 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M49 0V24C49 37.2548 38.031 48 24.5 48C10.969 48 0 37.2548 0 24V0H49Z" fill="currentColor"></path></svg>
            </div>
          </section>
        </div>
      </div>

      {/* =============================================================== */}
      {/* NEW SECTION: Features / Selling Points */}
      {/* =============================================================== */}
      <section className="bg-slate-50/70 py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-4xl font-semibold text-[#003e0c]">Go from Data to Decarbonization in Minutes</h2>
            <p className="mt-4 text-lg text-slate-600">Our platform is more than a calculator; it's an end-to-end command center for your company's climate strategy.</p>
          </div>

          <div className="mt-16 grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm transition-all hover:shadow-lg hover:-translate-y-1 animate-fade-in-up"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#85b708]/20 mb-6">
                  <feature.icon className="h-6 w-6 text-[#003e0c]" />
                </div>
                <h3 className="text-xl font-semibold text-[#003e0c] mb-2">{feature.title}</h3>
                <p className="text-slate-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default HeroSection;