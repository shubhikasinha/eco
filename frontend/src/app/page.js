"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

import { BACKEND_URL } from "@/lib/api";

const SCENARIO_PRESETS = [
  {
    id: "nyc-express",
    label: "NYC → Chicago Express",
    activity: "Consolidated freight lane",
    payload: { distance: 1000, lat: 40.7128, lon: -74.006 },
  },
  {
    id: "la-micro",
    label: "LA Micro-fulfillment Sprint",
    activity: "EV van orchestration",
    payload: { distance: 380, lat: 34.0522, lon: -118.2437 },
  },
  {
    id: "eu-h2",
    label: "EU Hydrogen Pilot",
    activity: "Hydrogen corridor",
    payload: { distance: 820, lat: 52.520, lon: 13.4050 },
  },
];

const HERO_STATS = [
  { label: "Avg CO₂e saved per route", value: "18.2%" },
  { label: "Playbooks activated", value: "12" },
  { label: "Marketplace projects", value: "32" },
  { label: "Pilot partners", value: "15" },
];

const OPPORTUNITY_TRACKS = [
  {
    title: "Carbon Ops Command",
    summary: "Live telemetry on lanes, fuel mix, and RAG-backed mitigations.",
    tags: ["Live dashboard", "Gemini insights", "Auto alerts"],
  },
  {
    title: "Offset Marketplace",
    summary: "Tokenize credits and co-fund community climate innovation.",
    tags: ["Stripe-ready", "Impact scoring", "SDG alignment"],
  },
  {
    title: "AI Mitigation Copilot",
    summary: "Gemini + RAG w/ EPA & IPCC guidance curated for planners.",
    tags: ["LangChain", "FAISS", "Action buttons"],
  },
];

const INITIAL_STATE = {
  activity: "Consolidated freight lane",
  preset: SCENARIO_PRESETS[0],
  payload: { ...SCENARIO_PRESETS[0].payload },
};

function StatCard({ label, value }) {
  return (
    <div className="rounded-2xl border border-[#85b708]/10 bg-[#85b708]/5 p-4 text-[#003e0c]/80">
      <p className="text-xs uppercase tracking-wide text-[#003e0c]/40">{label}</p>
      <p className="mt-2 text-2xl font-semibold text-[#003e0c]">{value}</p>
    </div>
  );
}

function Tag({ children }) {
  return (
    <span className="rounded-full border border-[#85b708]/10 bg-[#85b708]/5 px-3 py-1 text-xs text-[#003e0c]/70">
      {children}
    </span>
  );
}

export default function Home() {
  const [activity, setActivity] = useState(INITIAL_STATE.activity);
  const [preset, setPreset] = useState(INITIAL_STATE.preset);
  const [payload, setPayload] = useState(INITIAL_STATE.payload);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);
  const [decision, setDecision] = useState(null);
  const [emissions, setEmissions] = useState(null);
  const [weather, setWeather] = useState(null);
  const [analysis, setAnalysis] = useState([]);
  const [playbook, setPlaybook] = useState([]);

  const backendLabel = useMemo(
    () => BACKEND_URL.replace(/^https?:\/\//, ""),
    [],
  );

  const isValid = useMemo(() => {
    return [payload.distance, payload.lat, payload.lon].every((value) => {
      return typeof value === "number" && !Number.isNaN(value);
    });
  }, [payload]);

  const selectPreset = (option) => {
    setPreset(option);
    setActivity(option.activity);
    setPayload({ ...option.payload });
  };

  const handleNumericChange = (field) => (event) => {
    const next = Number(event.target.value);
    setPayload((prev) => ({ ...prev, [field]: Number.isNaN(next) ? 0 : next }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!isValid || isSubmitting) return;

    setIsSubmitting(true);
    setError(null);
    setResult(null);
    setDecision(null);
    setEmissions(null);
    setWeather(null);
    setAnalysis([]);
    setPlaybook([]);

    try {
      const response = await fetch(`${BACKEND_URL}/workflow`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorPayload = await response.json().catch(() => ({}));
        throw new Error(errorPayload?.error ?? "Workflow failed");
      }

      const data = await response.json();
      setResult(data.forecastResult ?? "No suggestion available");
      setDecision(data.decision ?? "pending");
      setEmissions(data.emissions ?? null);
      setWeather(data.weather ?? null);
      setAnalysis(Array.isArray(data.analysisAttempts) ? data.analysisAttempts : []);
      setPlaybook(Array.isArray(data.playbook) ? data.playbook : []);
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen">
      <div className="relative isolate overflow-hidden bg-white pb-24 pt-28">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-16 px-6">
          <section className="grid gap-6 lg:grid-cols-[2fr,1fr]">
            <div className="space-y-8">
              <span className="inline-flex items-center gap-2 rounded-full border border-[#85b708]/20 bg-[#85b708]/10 px-4 py-1 text-xs uppercase tracking-wider text-[#85b708]/70">
                EcoImpactWorkflow • Pilot Studio
              </span>
              <h1 className="text-6xl font-semibold tracking-tight text-[#003e0c] ">
                Measure. Reduce. Sustain.<br /> Make Your Business Carbon-Conscious.
              </h1>
              <p className="text-lg text-[#003e0c]/70 sm:max-w-2xl">
                Forecast carbon, spin up mitigations, and ship offsets in one command center. We orchestrate emissions modelling, weather intelligence, Gemini analysis, and marketplace activations so teams can ship greener without slowing operations.
              </p>
              <div className="flex items-center justify-center">
                <a href="/calculator" class="bg-[#003e0c] text-white font-bold py-3 px-8 rounded-lg shadow-md hover:bg-[#005a14] hover:scale-105 transform transition-transform duration-200 mt-6 mb-15">
                  Find Carbon Emitted
                </a>
              </div>

            </div>
            {/* <div className="rounded-3xl border border-[#85b708]/10 bg-[#85b708]/5 p-6 text-[#003e0c]/80">
              <h2 className="text-sm uppercase tracking-wide text-[#003e0c]/40">Launch a forecast</h2>
              <p className="mt-3 text-sm text-[#003e0c]/70">
                Pick a lane, feed the workflow, and watch the AI attempt until it hits confidence.
              </p>
              <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
                <label className="block text-xs uppercase tracking-wide text-[#003e0c]/40">
                  Activity headline
                  <input
                    value={activity}
                    onChange={(event) => setActivity(event.target.value)}
                    placeholder="Consolidated freight lane"
                    className="mt-2 w-full rounded-xl border border-[#85b708]/10 bg-[#85b708]/10 px-3 py-2 text-sm text-[#003e0c] outline-none focus:border-[#85b708] focus:ring-2 focus:ring-[#85b708]/40"
                  />
                </label>

                <div className="grid grid-cols-3 gap-3 text-xs">
                  <label className="flex flex-col gap-1 text-[#003e0c]/50">
                    Distance (km)
                    <input
                      type="number"
                      value={payload.distance}
                      onChange={handleNumericChange("distance")}
                      className="rounded-xl border border-[#85b708]/10 bg-[#85b708]/10 p-2 text-sm text-[#003e0c] outline-none focus:border-[#85b708] focus:ring-2 focus:ring-[#85b708]/40"
                      required
                    />
                  </label>
                  <label className="flex flex-col gap-1 text-[#003e0c]/50">
                    Latitude
                    <input
                      type="number"
                      value={payload.lat}
                      onChange={handleNumericChange("lat")}
                      className="rounded-xl border border-[#85b708]/10 bg-[#85b708]/10 p-2 text-sm text-[#003e0c] outline-none focus:border-[#85b708] focus:ring-2 focus:ring-[#85b708]/40"
                      step="0.0001"
                      required
                    />
                  </label>
                  <label className="flex flex-col gap-1 text-[#003e0c]/50">
                    Longitude
                    <input
                      type="number"
                      value={payload.lon}
                      onChange={handleNumericChange("lon")}
                      className="rounded-xl border border-[#85b708]/10 bg-[#85b708]/10 p-2 text-sm text-[#003e0c] outline-none focus:border-[#85b708] focus:ring-2 focus:ring-[#85b708]/40"
                      step="0.0001"
                      required
                    />
                  </label>
                </div>

                <div className="grid gap-2 text-xs sm:grid-cols-3">
                  {SCENARIO_PRESETS.map((option) => {
                    const isActive = preset?.id === option.id;
                    return (
                      <button
                        key={option.id}
                        type="button"
                        onClick={() => selectPreset(option)}
                        className={`rounded-2xl border px-3 py-3 text-left transition ${isActive
                            ? "border-[#85b708]/60 bg-[#85b708]/20 text-[#003e0c]"
                            : "border-[#85b708]/10 bg-[#85b708]/10 text-[#003e0c]/70 hover:border-[#85b708]/30 hover:text-[#003e0c]"
                          }`}
                      >
                        <p className="text-sm font-medium">{option.label}</p>
                        <p className="mt-1 text-[11px] uppercase tracking-wide text-[#003e0c]/40">
                          {option.activity}
                        </p>
                      </button>
                    );
                  })}
                </div>

                <div className="flex items-center justify-between pt-2 text-xs text-[#003e0c]/50">
                  <span>Backend: {backendLabel}</span>
                  <button
                    type="submit"
                    disabled={!isValid || isSubmitting}
                    className="rounded-full bg-[#85b708] px-4 py-2 text-sm font-medium text-[#003e0c] transition hover:bg-[#85b708] disabled:cursor-not-allowed disabled:bg-[#85b708]/20"
                  >
                    {isSubmitting ? "Running…" : "Launch Forecast"}
                  </button>
                </div>
              </form>

              {error ? (
                <p className="mt-4 rounded-xl border border-red-500/40 bg-red-500/10 p-3 text-xs text-red-100">
                  {error}
                </p>
              ) : null}
            </div> */}
          </section>
          <div className="max-w-6xl mx-auto p-6 font-sans text-[#003e0c]">
            {/* Title Section */}
            <div className="flex items-center gap-4 mb-10">
              <div className="bg-[#85b708] rounded-xl p-4 shadow-md">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="w-8 h-8">
                  <path d="M3 7a1 1 0 0 1 1-1h9v2H5v6h2a3 3 0 1 0 4 0h2a3 3 0 1 0 4 0h1a1 1 0 0 0 1-1V9l-3-3H12V4H4a1 1 0 0 0-1 1v2z" />
                </svg>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-[#003e0c]">Simple Steps to a Greener Supply Chain</h1>
                <p className="opacity-85 text-sm">Follow three simple actions to measure and reduce shipment emissions.</p>
              </div>
            </div>

            {/* Steps Section */}
            <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6">
              {[{
                title: 'Input Your Data',
                text: "Enter your shipment's source, destination, weight, and mode of transport.",
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="w-6 h-6">
                    <path d="M3 6h18v2H3zM3 11h12v2H3zM3 16h8v2H3z" />
                  </svg>
                ),
              }, {
                title: 'Instantly Analyze',
                text: 'Our engine calculates the CO2e emissions using DEFRA 2023 standards in real-time.',
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="w-6 h-6">
                    <path d="M3 13h2v-2H3v2zm4 0h2v-4H7v4zm4 0h2v-6h-2v6zm4 0h2V8h-2v5zm4 0h2v-3h-2v3z" />
                  </svg>
                ),
              }, {
                title: 'Get Actionable Insights',
                text: 'Receive a detailed report, your carbon score, and smart alternatives to reduce your impact.',
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="w-6 h-6">
                    <path d="M4 4h10v6H4zM4 12h16v8H4z" />
                  </svg>
                ),
              }].map((step, i) => (
                <div key={i} className="flex gap-3 bg-[#85b708]/10 p-4 rounded-xl">
                  <div className="bg-[#003e0c] rounded-lg w-12 h-12 flex items-center justify-center shrink-0">{step.icon}</div>
                  <div>
                    <h3 className="font-semibold text-base mb-1">{step.title}</h3>
                    <p className="text-sm opacity-90 leading-snug">{step.text}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Divider */}
            <div className="my-10 h-[1px] bg-gradient-to-r from-[#003e0c]/10 via-[#85b708]/20 to-[#003e0c]/10"></div>

            {/* Insights Section */}
            <h2 className="text-xl font-bold mb-5">Data-Driven Sustainability</h2>
            <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6">
              {[{
                title: 'Precision Matters',
                text: 'Use official GHG conversion factors for accurate, auditable emission reports.',
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="w-6 h-6">
                    <path d="M3 3h18v2H3zM5 7h14v2H5zM7 11h10v2H7z" />
                  </svg>
                ),
              }, {
                title: 'Smarter Logistics',
                text: 'Discover lower-emission transport alternatives for your key routes.',
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="w-6 h-6">
                    <path d="M3 12h14v2H3zM18 8h3v6h-3zM16 16a2 2 0 1 0 4 0 2 2 0 0 0-4 0z" />
                  </svg>
                ),
              }, {
                title: 'Corporate Responsibility',
                text: 'Demonstrate your commitment to sustainability to clients, investors, and stakeholders.',
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="w-6 h-6">
                    <path d="M12 2l2 5h5l-4 3 2 5-5-3-5 3 2-5-4-3h5z" />
                  </svg>
                ),
              }].map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="bg-[#85b708] rounded-lg w-11 h-11 flex items-center justify-center">{item.icon}</div>
                  <div>
                    <h4 className="font-semibold text-base mb-1">{item.title}</h4>
                    <p className="text-sm opacity-90 leading-snug">{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* <section className="grid gap-6 lg:grid-cols-[2fr,1fr]">
            <article className="space-y-4 rounded-3xl border border-[#85b708]/10 bg-[#85b708]/10 p-8 text-[#003e0c]">
              <h2 className="text-xl font-semibold text-[#003e0c]">Workflow output</h2>
              {result ? (
                <div className="space-y-4">
                  <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-4">
                    <p className="text-sm uppercase tracking-wide text-emerald-200/80">{decision} decision</p>
                    <p className="mt-2 text-lg text-[#003e0c]/90">{result}</p>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="rounded-2xl border border-[#85b708]/10 bg-[#85b708]/5 p-4 text-sm text-[#003e0c]/80">
                      <p className="text-xs uppercase tracking-wide text-[#003e0c]/40">Simulated emissions</p>
                      <p className="mt-2 text-2xl font-semibold text-[#003e0c]">{emissions ?? "+"} kg CO₂e</p>
                    </div>
                    <div className="rounded-2xl border border-[#85b708]/10 bg-[#85b708]/5 p-4 text-sm text-[#003e0c]/80">
                      <p className="text-xs uppercase tracking-wide text-[#003e0c]/40">Weather snapshot</p>
                      <p className="mt-2 text-base text-[#003e0c]/90">{weather ?? "Awaiting forecast"}</p>
                    </div>
                  </div>

                  <div className="rounded-2xl border border-[#85b708]/10 bg-[#85b708]/5 p-4 text-sm text-[#003e0c]/80">
                    <p className="text-xs uppercase tracking-wide text-[#003e0c]/40">Gemini analysis attempts</p>
                    <ul className="mt-3 space-y-3">
                      {analysis.map((attempt) => (
                        <li
                          key={attempt.attempt}
                          className="rounded-xl border border-[#85b708]/10 bg-[#85b708]/10 px-3 py-3"
                        >
                          <div className="flex items-center justify-between text-xs uppercase tracking-wide text-[#003e0c]/40">
                            <span>Attempt {attempt.attempt}</span>
                            <span>Confidence {attempt.confidence}</span>
                          </div>
                          <p className="mt-2 text-sm text-[#003e0c]/90">{attempt.text}</p>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {playbook.length ? (
                    <div className="rounded-2xl border border-[#85b708]/10 bg-[#85b708]/5 p-4 text-sm text-[#003e0c]/80">
                      <div className="flex items-center justify-between">
                        <p className="text-xs uppercase tracking-wide text-[#003e0c]/40">Launch playbook</p>
                        <Link
                          href="/playbooks"
                          className="text-xs font-medium text-cyan-300 hover:text-cyan-200"
                        >
                          View library →
                        </Link>
                      </div>
                      <div className="mt-4 grid gap-3 sm:grid-cols-3">
                        {playbook.map((phase) => (
                          <div key={phase.phase} className="rounded-2xl border border-[#85b708]/10 bg-[#85b708]/10 p-3">
                            <p className="text-xs uppercase tracking-wide text-[#003e0c]/40">{phase.phase}</p>
                            <p className="mt-1 text-sm font-medium text-[#003e0c]">{phase.headline}</p>
                            <ul className="mt-2 space-y-1 text-xs text-[#003e0c]/60">
                              {phase.milestones.map((item) => (
                                <li key={item}>• {item}</li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : null}
                </div>
              ) : (
                <div className="rounded-2xl border border-dashed border-[#85b708]/10 bg-[#85b708]/5 p-8 text-sm text-[#003e0c]/60">
                  <p>Run the workflow to populate emissions, weather, and AI mitigation recommendations.</p>
                </div>
              )}
            </article>

            <aside className="space-y-4 rounded-3xl border border-[#85b708]/10 bg-[#85b708]/5 p-6 text-[#003e0c]/80">
              <h3 className="text-sm uppercase tracking-wide text-[#003e0c]/40">Opportunity tracks</h3>
              <div className="space-y-5">
                {OPPORTUNITY_TRACKS.map((track) => (
                  <div key={track.title} className="rounded-2xl border border-[#85b708]/10 bg-[#85b708]/10 p-4">
                    <p className="text-sm font-medium text-[#003e0c]">{track.title}</p>
                    <p className="mt-2 text-xs text-[#003e0c]/60">{track.summary}</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {track.tags.map((tag) => (
                        <Tag key={tag}>{tag}</Tag>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              <div className="rounded-2xl border border-[#85b708]/40 bg-[#85b708]/10 p-4 text-xs text-cyan-100">
                <p className="font-medium text-cyan-100">Share this with stakeholders</p>
                <p className="mt-2 text-cyan-50">
                  Jump to the <Link href="/marketplace" className="underline">crowdsourced offset marketplace</Link> and <Link href="/executive" className="underline">exec-ready snapshot</Link> to tell the full story.
                </p>
              </div>
            </aside>
          </section> */}
        </div>
      </div>
    </main>
  );
}