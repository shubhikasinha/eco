"use client";
import { useState, useMemo } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Trees, Wind, Recycle, Waves, Search, Target, Handshake } from "lucide-react";

// Added 'category' and a 'description' for richer content and filtering
const ngos = [
  {
    icon: Trees,
    name: "Green Earth Alliance",
    campaign: "Global Reforestation Initiative",
    description: "Focused on restoring vital forest ecosystems and biodiversity across the globe.",
    impact: "Planted 2M trees",
    category: "Reforestation",
    color: "text-[#003e0c]", // Primary
  },
  {
    icon: Wind,
    name: "Clean Energy Coalition",
    campaign: "Renewable Transport Network",
    description: "Accelerating the transition to sustainable energy in logistics and public transport.",
    impact: "50K EVs deployed",
    category: "Clean Energy",
    color: "text-[#85b708]", // Accent
  },
  {
    icon: Recycle,
    name: "Circular Logistics Network",
    campaign: "Zero-Waste Supply Chain",
    description: "Innovating solutions to create a fully circular economy, eliminating waste in supply chains.",
    impact: "100K tons diverted",
    category: "Logistics",
    color: "text-[#003e0c]", // Primary
  },
  {
    icon: Waves,
    name: "Ocean Guardian Project",
    campaign: "Maritime Emissions Reduction",
    description: "Dedicated to protecting marine life by reducing the carbon footprint of global shipping.",
    impact: "500K kg CO2e reduced",
    category: "Maritime",
    color: "text-[#85b708]", // Accent
  },
];

const categories = ["All", "Reforestation", "Clean Energy", "Logistics", "Maritime"];

const NGOHub = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");

  const filteredNgos = useMemo(() => {
    return ngos.filter((ngo) => {
      const matchesFilter = activeFilter === "All" || ngo.category === activeFilter;
      const matchesSearch =
        ngo.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ngo.campaign.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ngo.category.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesFilter && matchesSearch;
    });
  }, [searchTerm, activeFilter]);

  return (
    <div className="min-h-screen bg-slate-50 text-[#003e0c]">
      <main className="container mx-auto px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 animate-fade-in">
            <h1 className="text-5xl md:text-6xl font-bold mb-4">
              Partner for a Greener Planet
            </h1>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto mb-8">
              Discover and collaborate with leading environmental organizations to amplify your company's sustainability impact.
            </p>

            <div className="max-w-2xl mx-auto relative mb-6">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
              <Input
                placeholder="Search NGOs by name, focus, or campaign..."
                className="pl-12 py-6 border-2 border-slate-200 focus:border-[#85b708] focus:ring-2 focus:ring-[#85b708]/50 text-lg transition-all"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="flex justify-center items-center gap-2 flex-wrap">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={activeFilter === category ? "default" : "outline"}
                  onClick={() => setActiveFilter(category)}
                  className={`transition-all duration-300 ${
                    activeFilter === category
                      ? 'bg-[#003e0c] text-white border-[#003e0c] hover:bg-[#003e0c]/90'
                      : 'border-slate-300 text-slate-600 hover:bg-slate-100 hover:text-[#003e0c]'
                  }`}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {filteredNgos.map((ngo, index) => (
              <Card
                key={index}
                className="p-8 border-2 border-slate-200/80 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 group relative overflow-hidden animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >

                
                <div className="relative z-10 flex flex-col h-full bg-slate-50 rounded-lg">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-16 h-16 rounded-xl bg-slate-100 flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-110">
                      <ngo.icon className={`h-8 w-8 ${ngo.color}`} />
                    </div>
                    <div>
                      <span className="text-sm font-semibold bg-[#85b708]/20 text-[#85b708] py-1 px-2 rounded-full">{ngo.category}</span>
                      <h3 className="text-2xl font-bold mt-2 text-[#003e0c]">{ngo.name}</h3>
                    </div>
                  </div>
                  <p className="text-slate-600 mb-4 text-base flex-grow">{ngo.campaign}: {ngo.description}</p>
                  
                  <div className="mt-auto pt-4 border-t border-slate-200 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-[#003e0c] font-medium">
                      <Target className="h-4 w-4" />
                      {ngo.impact}
                    </div>
                    <Button
                      size="sm"
                      className="bg-[#003e0c] text-white hover:bg-[#003e0c]/90 transition-all group-hover:scale-105"
                    >
                      <Handshake className="w-4 h-4 mr-2"/>
                      Partner Now
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
          
          {filteredNgos.length === 0 && (
            <div className="text-center py-20 animate-fade-in">
              <h3 className="text-2xl font-bold text-[#003e0c]">No NGOs Found</h3>
              <p className="text-slate-600 mt-2">Try adjusting your search or filter criteria.</p>
            </div>
          )}

        </div>
      </main>
    </div>
  );
};

export default NGOHub;