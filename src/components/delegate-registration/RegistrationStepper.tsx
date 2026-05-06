import React from "react";
import { Check } from "lucide-react";

interface RegistrationStepperProps {
  currentStep?: number;
}

const RegistrationStepper: React.FC<RegistrationStepperProps> = ({ currentStep = 1 }) => {
  const steps = [
    { number: 1, title: "Select Day & Session" },
    { number: 2, title: "Your Details" },
    { number: 3, title: "Review & Payment" },
  ];

  return (
    <div className="w-full py-2 px-6 bg-white">
      <div className="max-w-[1000px] mx-auto flex items-center justify-between gap-4">
        {steps.map((step, idx) => (
          <React.Fragment key={step.number}>
            {/* Step Item */}
            <div className="flex items-center gap-3 shrink-0">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center text-[16px] font-black transition-all duration-300 ${
                  currentStep >= step.number
                    ? "bg-[#143111] text-white shadow-lg shadow-green-900/20"
                    : "bg-gray-100 text-gray-400"
                }`}
              >
                {currentStep > step.number ? (
                  <Check className="w-5 h-5" />
                ) : (
                  step.number
                )}
              </div>
              <span 
                className={`text-[14px] font-bold uppercase tracking-tight ${
                  currentStep >= step.number ? "text-[#143111]" : "text-gray-400"
                }`}
              >
                {step.title}
              </span>
            </div>

            {/* Connecting Line */}
            {idx < steps.length - 1 && (
              <div className="flex-grow h-[1px] bg-gray-200 mx-4 hidden sm:block" />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default RegistrationStepper;
