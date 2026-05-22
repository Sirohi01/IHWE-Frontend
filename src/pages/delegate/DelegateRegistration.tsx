import React, { useState } from "react";
import DelegateHero from "../../components/delegate/delegate-registration/DelegateHero";
import RegistrationStepper from "../../components/delegate/delegate-registration/RegistrationStepper";
import SessionSelection from "../../components/delegate/delegate-registration/SessionSelection";
import RegistrationSidebar from "../../components/delegate/delegate-registration/RegistrationSidebar";
import WhyAttend from "../../components/delegate/delegate-registration/WhyAttend";
import DelegateFooter from "../../components/delegate/delegate-registration/DelegateFooter";
import { motion } from "framer-motion";

const DelegateRegistration: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);

  return (
    <div className="min-h-screen bg-white flex flex-col font-inter">
      {/* Hero Section */}
      <DelegateHero />

      {/* Main Content Area */}
      <main className="flex-grow bg-[#F8FAFC]/30">
        {/* Stepper Container - Compact py-4 */}
        <div className="bg-white border-b border-gray-100 py-1">
          <RegistrationStepper currentStep={currentStep} />
        </div>

        {/* Content Grid - Standard py-4 gap-8 */}
        <div className="max-w-[1360px] mx-auto px-6 lg:px-10 py-4 grid grid-cols-1 lg:grid-cols-12 gap-8">

          {/* Left Content (Step Specific) */}
          <div className="lg:col-span-8">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              {currentStep === 1 && <SessionSelection />}
            </motion.div>
          </div>

          {/* Right Sidebar */}
          <div className="lg:col-span-4">
            <div className="sticky top-4">
              <RegistrationSidebar />
            </div>
          </div>

        </div>
      </main>

      {/* Why Attend Section - Compact py-4 */}
      <div className="py-4">
        <WhyAttend />
      </div>

      {/* Footer */}
      <DelegateFooter />
    </div>
  );
};

export default DelegateRegistration;
