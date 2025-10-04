import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type RouteStepProps = {
  onNext: (data: { source: string; destination: string }) => void;
  initialData: any;
};

const RouteStep = ({ onNext, initialData }: RouteStepProps) => {
  const [source, setSource] = useState(initialData.source || "");
  const [destination, setDestination] = useState(initialData.destination || "");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (source && destination) {
      onNext({ source, destination });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h2 className="text-2xl text-[#003e0c] font-bold text-primary mb-6">Where is your shipment going?</h2>
      
      <div className="space-y-4">
        <div>
          <Label htmlFor="source" className="text-primary text-[#85b708]">Source City</Label>
          <Input
            id="source"
            type="text"
            placeholder="e.g., Mumbai"
            value={source}
            onChange={(e) => setSource(e.target.value)}
            required
            className="mt-1 text-[#85b708]"
          />
        </div>

        <div>
          <Label htmlFor="destination" className="text-primary text-[#85b708]">Destination City</Label>
          <Input
            id="destination"
            type="text"
            placeholder="e.g., Delhi"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            required
            className="mt-1 text-[#85b708]"
          />
        </div>
      </div>

      <Button 
        type="submit" 
        variant="outline"
        className="w-full bg-accent text-primary text-[#85b708] bg-[#85b708]/10"
      >
        Next
      </Button>
    </form>
  );
};

export default RouteStep;
