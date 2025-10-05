"use client";

export default function BusinessModel() {
  return (
    <div className="min-h-screen bg-white text-[#003e0c] flex flex-col items-center px-6 py-20">
      {/* Header */}
      <div className="max-w-4xl text-center mb-16">
        <h1 className="text-4xl font-bold tracking-tight">
          Business Model & Future Scope
        </h1>
        <p className="text-[#5c705d] mt-4 text-sm leading-relaxed max-w-2xl mx-auto">
          Building a measurable, scalable, and responsible ecosystem that empowers
          businesses to act on their environmental impact.
        </p>
        <div className="mt-3 w-16 h-1 bg-[#85b708] mx-auto rounded-full"></div>
      </div>

      {/* Business Model Section */}
      <div className="max-w-6xl bg-[#f8fbf7] rounded-2xl shadow-sm p-12 border border-[#eaf5e3] mb-20">
        <h2 className="text-2xl font-semibold mb-6">Our Business Model</h2>
        <p className="text-[#5c705d] leading-relaxed mb-10">
          EcoImpact operates on a data-driven and impact-focused framework that
          merges analytics with action. It enables businesses to quantify and
          reduce their environmental footprint, ensuring sustainability becomes
          a measurable business value.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-xl p-6 border border-[#eaf5e3] hover:shadow-md transition-all duration-200">
            <h3 className="font-semibold text-lg mb-3 text-[#003e0c]">
              Subscription Plans
            </h3>
            <p className="text-sm text-[#5c705d] leading-relaxed">
              Tiered access for individuals, startups, and enterprises to
              advanced analytics dashboards and sustainability tracking.
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 border border-[#eaf5e3] hover:shadow-md transition-all duration-200">
            <h3 className="font-semibold text-lg mb-3 text-[#003e0c]">
              B2B Integrations
            </h3>
            <p className="text-sm text-[#5c705d] leading-relaxed">
              Collaborations with logistics and manufacturing firms to embed
              EcoImpact APIs directly into their operations for real-time
              carbon tracking.
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 border border-[#eaf5e3] hover:shadow-md transition-all duration-200">
            <h3 className="font-semibold text-lg mb-3 text-[#003e0c]">
              Sustainability Insights
            </h3>
            <p className="text-sm text-[#5c705d] leading-relaxed">
              AI-powered insights to help organizations identify inefficiencies,
              optimize operations, and achieve measurable sustainability goals.
            </p>
          </div>
        </div>
      </div>

      {/* Impact Section */}
      <div className="max-w-6xl bg-[#f8fbf7] rounded-2xl shadow-sm p-12 border border-[#eaf5e3] mb-20">
        <h2 className="text-2xl font-semibold mb-6">Our Impact</h2>
        <p className="text-[#5c705d] leading-relaxed mb-10 max-w-3xl">
          Every measurable change creates a ripple. EcoImpact has already enabled
          meaningful improvements in carbon efficiency and awareness among its
          partner network.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="text-center">
            <h3 className="text-4xl font-bold text-[#85b708]">12,000+</h3>
            <p className="text-sm text-[#5c705d] mt-2">
              Tons of CO₂ Emissions Tracked
            </p>
          </div>
          <div className="text-center">
            <h3 className="text-4xl font-bold text-[#85b708]">3,500+</h3>
            <p className="text-sm text-[#5c705d] mt-2">
              Active Organizations Onboarded
            </p>
          </div>
          <div className="text-center">
            <h3 className="text-4xl font-bold text-[#85b708]">28%</h3>
            <p className="text-sm text-[#5c705d] mt-2">
              Average Reduction Achieved
            </p>
          </div>
          <div className="text-center">
            <h3 className="text-4xl font-bold text-[#85b708]">40+</h3>
            <p className="text-sm text-[#5c705d] mt-2">
              Sustainability Partnerships
            </p>
          </div>
        </div>
      </div>

      {/* Future Scope Section */}
      <div className="max-w-6xl bg-[#f8fbf7] rounded-2xl shadow-sm p-12 border border-[#eaf5e3]">
        <h2 className="text-2xl font-semibold mb-6">Future Scope</h2>
        <p className="text-[#5c705d] leading-relaxed mb-8 max-w-3xl">
          EcoImpact is on its way to becoming an intelligent sustainability
          infrastructure for enterprises and governments alike. The platform’s
          roadmap focuses on AI-led predictive analytics, verified data exchange,
          and cross-sectoral collaborations for global carbon neutrality.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-[#5c705d] text-sm">
          <p>• Integration with carbon offset marketplaces and credit systems</p>
          <p>• Expansion into logistics and smart mobility analytics</p>
          <p>• AI-driven sustainability consultancy modules</p>
          <p>• Government-level collaborations for verified impact data</p>
          <p>• Global sustainability leaderboard and certification framework</p>
        </div>

        <div className="mt-10">
          <button className="px-6 py-3 rounded-lg bg-[#003e0c] text-white font-semibold hover:bg-[#003e0c] transition">
            Explore Partnership Opportunities
          </button>
        </div>
      </div>
    </div>
  );
}
