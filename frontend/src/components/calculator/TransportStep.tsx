import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Truck, Plane, Ship, Train } from "lucide-react";

type TransportStepProps = {
  onCalculate: (data: { mode: string; vehicleType: string }) => void;
  onBack: () => void;
  initialData: any;
};

const modes = [
  { id: "road", label: "Road", icon: Truck },
  { id: "air", label: "Air", icon: Plane },
  { id: "ship", label: "Ship", icon: Ship },
  { id: "rail", label: "Train", icon: Train },
];

const vehicleTypes: Record<string, string[]> = {
  road: ["Average Truck", "Rigid Truck", "Articulated Truck"],
  air: ["Average Cargo Plane", "Short-haul Flight", "Long-haul Flight"],
  ship: ["Container Ship", "Bulk Carrier", "General Cargo"],
  rail: ["Electric Train", "Diesel Train", "Freight Train"],
};

const TransportStep = ({ onCalculate, onBack, initialData }: TransportStepProps) => {
  const [selectedMode, setSelectedMode] = useState(initialData.mode || "");
  const [selectedVehicle, setSelectedVehicle] = useState(initialData.vehicleType || "");
  const [isCalculating, setIsCalculating] = useState(false);

  const handleCalculate = () => {
    if (selectedMode && selectedVehicle) {
      setIsCalculating(true);
      // Simulate calculation delay
      setTimeout(() => {
        onCalculate({ mode: selectedMode, vehicleType: selectedVehicle });
      }, 1500);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-primary mb-6 text-[#003e0c]">How will it travel?</h2>
      
      {/* Mode Selection */}
      <div>
        <h3 className="text-lg font-semibold text-primary mb-4 text-[#85b708]">Select Transport Mode</h3>
        <div className="grid grid-cols-2 gap-4">
          {modes.map((mode) => (
            <Card
              key={mode.id}
              onClick={() => {
                setSelectedMode(mode.id);
                setSelectedVehicle("");
              }}
              className={`p-6 text-[#003e0c] cursor-pointer transition-all hover:shadow-lg ${
                selectedMode === mode.id
                  ? "border-2 border-accent bg-accent/5"
                  : "border-2 border-border hover:border-accent/50"
              }`}
            >
              <div className="flex flex-col items-center gap-3">
                <mode.icon className={`w-12 h-12 ${selectedMode === mode.id ? "text-accent" : "text-muted-foreground"}`} />
                <span className={`font-medium ${selectedMode === mode.id ? "text-primary" : "text-muted-foreground"}`}>
                  {mode.label}
                </span>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Vehicle Type Selection */}
      {selectedMode && (
        <div className="animate-fade-in">
          <h3 className="text-lg font-semibold text-primary mb-4 text-[#85b708]">Select Vehicle Type</h3>
          <div className="space-y-2">
            {vehicleTypes[selectedMode].map((vehicle) => (
              <Card
                key={vehicle}
                onClick={() => setSelectedVehicle(vehicle)}
                className={`p-4 bg--[#85b708]/10 cursor-pointer text-[#85b708] transition-all hover:shadow-md ${
                  selectedVehicle === vehicle
                    ? "border-2 border-accent bg-accent/5"
                    : "border border-border hover:border-accent/50"
                }`}
              >
                <span className={`font-medium ${selectedVehicle === vehicle ? "text-primary" : "text-muted-foreground"}`}>
                  {vehicle}
                </span>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex gap-4 pt-4">
        <Button 
          type="button" 
          variant="outline" 
          onClick={onBack}
          className="flex-1 text-[#85b708]"
          disabled={isCalculating}
        >
          Back
        </Button>
        <Button 
          onClick={handleCalculate}
          variant="outline"
          disabled={!selectedMode || !selectedVehicle || isCalculating}
          className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90 text-[#003e0c]"
          
        >
          {isCalculating ? (
            <span className="flex items-center gap-2 text-[#003e0c]">
              <span className="animate-pulse text-[#003e0c] ">Calculating...</span>
            </span>
          ) : (
            "Calculate Emissions"
          )}
        </Button>
      </div>
    </div>
  );
};

export default TransportStep;
