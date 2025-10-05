import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Truck, Plane, Ship, Train } from "lucide-react";

type TransportStepProps = {
  onCalculate: (data: { mode: string; vehicleType: string }) => void;
  onBack: () => void;
  initialData: any;
};

// This is the new data structure you provided
const vehicle_options = {
  "road": {"hgv_avg": "Average Truck", "hgv_rigid_avg": "Rigid Truck", "hgv_artic_avg": "Articulated Truck"},
  "air": {"freighter_avg": "Average Freighter", "belly_freight": "Passenger Plane Belly"},
  "ship": {"container_ship_avg": "Container Ship", "bulk_carrier_avg": "Bulk Carrier", "ro-ro_ferry": "Ro-Ro Ferry"},
  "train": {"diesel": "Diesel Train", "electric": "Electric Train"},
};

const modes = [
  { id: "road", label: "Road", icon: Truck },
  { id: "air", label: "Air", icon: Plane },
  { id: "ship", label: "Ship", icon: Ship },
  // FIX 1: Changed 'rail' to 'train' to match the keys in vehicle_options
  { id: "train", label: "Train", icon: Train },
];

// The old 'vehicleTypes' object is no longer needed.

const TransportStep = ({ onCalculate, onBack, initialData }: TransportStepProps) => {
  const [selectedMode, setSelectedMode] = useState(initialData.mode || "");
  const [selectedVehicle, setSelectedVehicle] = useState(initialData.vehicleType || "");
  const [isCalculating, setIsCalculating] = useState(false);

  const handleCalculate = () => {
    if (selectedMode && selectedVehicle) {
      setIsCalculating(true);
      setTimeout(() => {
        // Now sends the key (e.g., "hgv_avg") instead of the label
        onCalculate({ mode: selectedMode, vehicleType: selectedVehicle });
      }, 1500);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-primary mb-6 text-[#003e0c]">How will it travel?</h2>
      
      {/* Mode Selection (No changes here) */}
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
            {/* FIX 2: Changed how we map over the vehicle options */}
            {Object.entries(vehicle_options[selectedMode as keyof typeof vehicle_options]).map(([vehicleKey, vehicleName]) => (
              <Card
                key={vehicleKey}
                onClick={() => setSelectedVehicle(vehicleKey)}
                className={`p-4 bg--[#85b708]/10 cursor-pointer text-[#85b708] transition-all hover:shadow-md ${
                  selectedVehicle === vehicleKey
                    ? "border-2 border-accent bg-accent/5"
                    : "border border-border hover:border-accent/50"
                }`}
              >
                <span className={`font-medium ${selectedVehicle === vehicleKey ? "text-primary" : "text-muted-foreground"}`}>
                  {vehicleName}
                </span>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Action Buttons (No changes here) */}
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