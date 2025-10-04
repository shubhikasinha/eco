// src/app/calculator/page.js

"use client";
import { useState } from "react";
import { Card } from "@/components/ui/card";
import RouteStep from "@/components/calculator/RouteStep";
import CargoStep from "@/components/calculator/CargoStep";
import TransportStep from "@/components/calculator/TransportStep";
import ResultsDisplay from "@/components/calculator/ResultsDisplay";

/**
 * Defines the structure for the calculator's data.
 * @typedef {{
 * source: string;
 * destination: string;
 * weight: number;
 * mode: string;
 * vehicleType: string;
 * }} CalculatorData
 */

const CalculatorPage = () => {
  const [step, setStep] = useState(1);
  /** @type {[Partial<CalculatorData>, React.Dispatch<React.SetStateAction<Partial<CalculatorData>>>]} */
  const [data, setData] = useState({});
  const [showResults, setShowResults] = useState(false);

  const progressPercentage = Math.min((step / 3) * 100, 100);

  /** @param {Partial<CalculatorData>} stepData */
  const handleNext = (stepData) => {
    setData({ ...data, ...stepData });
    setStep(step + 1);
  };

  const handleBack = () => {
    setStep(step - 1);
  };

  /** @param {Partial<CalculatorData>} stepData */
  const handleCalculate = (stepData) => {
    setData({ ...data, ...stepData });
    setShowResults(true);
  };

  const handleReset = () => {
    setStep(1);
    setData({});
    setShowResults(false);
  };

  if (showResults) {
    return (
      <div className="min-h-screen bg-background pt-24 pb-12">
        <div className="container mx-auto px-6">
          <ResultsDisplay data={data} onReset={handleReset} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pt-24 pb-12">
      <div className="container mx-auto px-6 max-w-3xl">
        <h1 className="text-4xl font-bold text-center mb-8 animate-fade-in text-[#003e0c]">
          Transport Emission Calculator
        </h1>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between text-sm text-gray-500 mb-2">
            <span className={step >= 1 ? "font-medium text-[#003e0c]" : ""}>Route</span>
            <span className={step >= 2 ? "font-medium text-[#003e0c]" : ""}>Cargo</span>
            <span className={step >= 3 ? "font-medium text-[#003e0c]" : ""}>Transport</span>
          </div>
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-[#85b708] transition-all duration-500"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>

        {/* Form Steps */}
        <Card className="p-8 border-2 border-gray-100 animate-fade-in-up">
          {step === 1 && <RouteStep onNext={handleNext} initialData={data} />}
          {step === 2 && <CargoStep onNext={handleNext} onBack={handleBack} initialData={data} />}
          {step === 3 && <TransportStep onCalculate={handleCalculate} onBack={handleBack} initialData={data} />}
        </Card>
      </div>
    </div>
  );
};

export default CalculatorPage;