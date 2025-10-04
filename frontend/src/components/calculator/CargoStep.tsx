import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type CargoStepProps = {
  onNext: (data: { weight: number }) => void;
  onBack: () => void;
  initialData: any;
};

const CargoStep = ({ onNext, onBack, initialData }: CargoStepProps) => {
  const [weight, setWeight] = useState(initialData.weight || "");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (weight) {
      onNext({ weight: parseFloat(weight) });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h2 className="text-2xl font-bold text-primary mb-6 text-[#003e0c]">How heavy is it?</h2>
      
      <div>
        <Label htmlFor="weight" className="text-primary text-[#85b708]">Weight</Label>
        <div className="flex gap-2 mt-1">
          <Input
            id="weight"
            type="number"
            placeholder="e.g., 5000"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            required
            min="0"
            step="0.01"
            className="flex-1 text-[#85b708]"
          />
          <div className="flex items-center px-4 bg-muted rounded-md text-muted-foreground text-[#85b708]">
            kg
          </div>
        </div>
      </div>

      <div className="flex gap-4">
        <Button 
          type="button" 
          variant="outline" 
          onClick={onBack}
          className="flex-1 text-[#85b708]"
        >
          Back
        </Button>
        <Button 
          type="submit"
          variant="outline"
          className="flex-1 bg-accent text-primary text-[#85b708] bg-[#85b708]/10"
        >
          Next
        </Button>
      </div>
    </form>
  );
};

export default CargoStep;
