import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, TrendingDown, Truck, TrainFront, Ship, Factory, Car } from "lucide-react"; // Added more icons
import {CalculatorData } from "../../app/calculator/page";

type ResultsDisplayProps = {
  data: CalculatorData;
  onReset: () => void;
};

// Mock calculation - in a real app, this would use DEFRA 2023 standards
const calculateEmissions = (data: CalculatorData) => {
  const baseEmission = 452.78; // kg CO2e
  // In a real scenario, you'd use data.source, data.destination, etc. here
  // For now, it's a fixed mock value.
  return baseEmission;
};

const getScore = (emission: number): { grade: string; color: string; level: string } => {
  if (emission < 100) return { grade: "A", color: "text-green-600", level: "Low" };
  if (emission < 300) return { grade: "B", color: "text-yellow-500", level: "Medium-Low" }; // Adjusted to a slightly more yellow-green
  if (emission < 500) return { grade: "C", color: "text-orange-500", level: "Medium" }; // Orange for medium
  return { grade: "D", color: "text--[#003e0c]", level: "High" };
};

const getAlternativeIcon = (title: string) => {
  if (title.includes("Train")) return <TrainFront className="w-8 h-8 text-[#003e0c]" />;
  if (title.includes("Truck")) return <Truck className="w-8 h-8 text-[#003e0c]" />;
  if (title.includes("Ship")) return <Ship className="w-8 h-8 text-[#003e0c]" />;
  // Add more as needed
  return <Factory className="w-8 h-8 text-[#003e0c]" />; // Default icon
};

const alternatives = [
  {
    title: "Switch to Electric Train",
    reduction: 95,
    emission: 20.41,
  },
  {
    title: "Optimize with Average Truck",
    reduction: 22,
    emission: 353.12,
  },
  // Add more dynamic alternatives here based on data
];

const ResultsDisplay = ({ data, onReset }: ResultsDisplayProps) => {
  const emission = calculateEmissions(data);
  const score = getScore(emission);

  return (
    <div className="space-y-8 animate-fade-in">
      <Button
        variant="outline" // Assuming your Button component's outline variant uses border-border and text-primary
        onClick={onReset}
        className="mb-4 text-[#003e0c] border-[#003e0c] hover:bg-[#003e0c] hover:text-white transition-all duration-200" // Custom styling for the button
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        New Calculation
      </Button>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Main Result */}
        <Card className="border-2 border-[#003e0c]/30 shadow-md"> {/* Light border with shadow */}
          <CardHeader>
            <CardTitle className="text-[#003e0c]">Total Emissions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <div className="text-6xl font-bold text-[#003e0c] mb-2">
                {emission.toFixed(2)}
              </div>
              <div className="text-xl text-gray-600">kg CO2e</div> {/* Muted foreground */}
            </div>
          </CardContent>
        </Card>

        {/* Carbon Score */}
        <Card className="border-2 border-[#003e0c]/30 shadow-md">
          <CardHeader>
            <CardTitle className="text-[#003e0c]">Shipment Impact Score</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center space-y-4">
              <div className={`text-6xl font-bold ${score.color}`}>
                {score.grade}
              </div>
              <div className="text-xl text-gray-600">{score.level} Impact</div>
              
              {/* Simple gauge visualization */}
              <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden"> {/* Muted background for gauge */}
                <div 
                  className="h-full bg-[#85b708] transition-all duration-500" // Accent color for progress
                  style={{ width: `${(emission / 1000) * 100}%` }} // Example: 1000 is max possible emission for gauge
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Calculation Summary */}
      <Card className="border-2 border-[#003e0c]/30 shadow-md">
        <CardHeader>
          <CardTitle className="text-[#003e0c]">Calculation Summary</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-gray-700"> {/* Muted foreground */}
          <p><strong className="text-[#003e0c]">Route:</strong> {data.source || 'N/A'} to {data.destination || 'N/A'}</p>
          <p><strong className="text-[#003e0c]">Weight:</strong> {data.weight || 'N/A'} kg</p>
          <p><strong className="text-[#003e0c]">Mode:</strong> {data.mode || 'N/A'} ({data.vehicleType || 'N/A'})</p>
        </CardContent>
      </Card>

      {/* Alternatives */}
      <div>
        <h2 className="text-3xl font-bold text-[#003e0c] mb-6">Smarter Alternatives</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {alternatives.map((alt, index) => (
            <Card 
              key={index}
              className="border-2 border-[#85b708]/50 hover:shadow-lg transition-all duration-300" // Accent color border
            >
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <div className="text-4xl">
                    {getAlternativeIcon(alt.title)} {/* Dynamic icon */}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-[#003e0c] mb-2">{alt.title}</h3>
                    <div className="flex items-center gap-2 text-[#85b708] font-bold text-lg mb-2">
                      <TrendingDown className="w-5 h-5" />
                      -{alt.reduction}% Emission Reduction
                    </div>
                    <p className="text-gray-700">
                      Estimated Emission: <strong className="text-[#003e0c]">{alt.emission} kg CO2e</strong>
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ResultsDisplay;