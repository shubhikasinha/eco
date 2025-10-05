import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const RouteStep = ({ onNext }) => {
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");

  const handleNext = () => {
    if (source && destination) {
      onNext({ source, destination });
    }
  };

  return (
    <form onSubmit={handleNext} className="space-y-6">
      <h2 className="text-2xl font-bold text-primary mb-6">Where is your shipment going?</h2>
      
      <div className="space-y-4">
        <div>
          <Label htmlFor="source" className="text-primary">Source City</Label>
          <Input
            id="source"
            type="text"
            placeholder="e.g., Mumbai"
            value={source}
            onChange={(e) => setSource(e.target.value)}
            required
            className="mt-1"
          />
        </div>

        <div>
          <Label htmlFor="destination" className="text-primary">Destination City</Label>
          <Input
            id="destination"
            type="text"
            placeholder="e.g., Delhi"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            required
            className="mt-1"
          />
        </div>
      </div>

      <Button 
        type="submit" 
        className="w-full bg-accent text-primary hover:bg-accent/90"
      >
        Next
      </Button>
    </form>
  );
};

export default RouteStep;
