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
    <div className="w-full py-3 px-4 sm:px-6 lg:px-10 bg-white border-b border-gray-100">
      <div className="max-w-[600px] flex items-center justify-between sm:justify-start w-full pl-0 sm:pl-[35px]">
        {steps.map((step, idx) => (
          <React.Fragment key={step.number}>
            {/* Step Item */}
            <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
              <div
                className={`w-7 h-7 sm:w-9 sm:h-9 rounded-full flex items-center justify-center text-[13px] sm:text-[15px] font-black transition-all duration-300 ${
                  currentStep > step.number
                    ? "bg-[#143111] text-white"
                    : currentStep === step.number
                    ? "bg-[#143111] text-white shadow-md shadow-green-900/20"
                    : "bg-white border-2 border-gray-300 text-gray-400"
                }`}
              >
                {currentStep > step.number ? (
                  <Check className="w-3 h-3 sm:w-4 sm:h-4" />
                ) : (
                  step.number
                )}
              </div>
              <span
                className={`text-[10px] sm:text-[13px] font-bold tracking-tight whitespace-nowrap ${
                  currentStep >= step.number ? "text-[#143111]" : "text-gray-400"
                }`}
              >
                {step.title}
              </span>
            </div>

            {/* Connecting Line */}
            {idx < steps.length - 1 && (
              <div className="flex-1 h-[1.5px] bg-gray-200 mx-2 sm:mx-3 min-w-[15px] sm:min-w-[30px]" />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default RegistrationStepper;
