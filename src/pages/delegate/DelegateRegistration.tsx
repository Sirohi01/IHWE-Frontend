import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import Swal from 'sweetalert2';
import DelegateHero from "../../components/delegate/delegate-registration/DelegateHero";
import RegistrationStepper from "../../components/delegate/delegate-registration/RegistrationStepper";
import SessionSelection from "../../components/delegate/delegate-registration/SessionSelection";
import RegistrationSidebar from "../../components/delegate/delegate-registration/RegistrationSidebar";
import WhyAttend from "../../components/delegate/delegate-registration/WhyAttend";
import DelegateFooter from "../../components/delegate/delegate-registration/DelegateFooter";
import DelegateRegistrationForm from "../../components/delegate/delegate-registration/DelegateRegistrationForm";
import { motion } from "framer-motion";

import { SelectedSession } from "../../components/delegate/delegate-registration/SessionSelection";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const DelegateRegistration: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [activeDay, setActiveDay] = useState<string | number>("");
  const [selectedSessions, setSelectedSessions] = useState<SelectedSession[]>([]);
  const [selectedPasses, setSelectedPasses] = useState<any[]>([]);

  const handleNextStep = () => {
    if (selectedSessions.length === 0 && selectedPasses.length === 0) {
      alert("Please select at least one session or pass to continue.");
      return;
    }
    setCurrentStep(2);
  };

  const resetForm = () => {
    setCurrentStep(1);
    setSelectedSessions([]);
    setSelectedPasses([]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedSessions.length === 0 && selectedPasses.length === 0) {
      toast.error("Please select at least one session or pass");
      return;
    }

    const formData = new FormData(e.target as HTMLFormElement);
    const subTotal = [...selectedSessions, ...selectedPasses].reduce((acc, curr) => acc + curr.price, 0);

    formData.append('sessions', JSON.stringify(selectedSessions));
    formData.append('specialPasses', JSON.stringify(selectedPasses));
    formData.append('gatewayAmount', subTotal.toString());
    const personalDetails = {
      fullName: formData.get('fullName') as string,
      email: formData.get('email') as string,
      mobile: formData.get('mobile') as string,
    };

    try {
      toast.loading("Creating order...", { id: "payment" });
      const res = await axios.post(`${API_URL}/delegate/register`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      if (!res.data.success) {
        toast.error(res.data.message || "Failed to create order", { id: "payment" });
        return;
      }

      toast.success("Order created! Redirecting to gateway...", { id: "payment" });

      // Load Razorpay
      const loadRazorpay = () => {
        return new Promise((resolve) => {
          if ((window as any).Razorpay) return resolve(true);
          const script = document.createElement('script');
          script.src = 'https://checkout.razorpay.com/v1/checkout.js';
          script.onload = () => resolve(true);
          script.onerror = () => resolve(false);
          document.body.appendChild(script);
        });
      };

      const isLoaded = await loadRazorpay();
      if (!isLoaded) {
        toast.error("Failed to load Razorpay SDK");
        return;
      }

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID || 'rzp_test_rYjE4Lms78Wn0s',
        amount: res.data.amount,
        currency: "INR",
        name: "IHWE 2026",
        description: "Delegate Registration",
        order_id: res.data.orderId,
        handler: async function (response: any) {
          toast.loading("Verifying payment...", { id: "payment-verify" });
          try {
            const verifyRes = await axios.post(`${API_URL}/delegate/verify`, {
              registrationId: res.data.registrationId,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_signature: response.razorpay_signature
            });

            if (verifyRes.data.success) {
              toast.dismiss("payment-verify");
              Swal.fire({
                title: 'Payment Successful!',
                text: 'Confirmation sent via WhatsApp & Email.',
                icon: 'success',
                confirmButtonColor: '#143111'
              });
              resetForm();
            } else {
              toast.error("Payment verification failed", { id: "payment-verify" });
            }
          } catch (err: any) {
            toast.error(err.response?.data?.message || "Verification error", { id: "payment-verify" });
          }
        },
        prefill: {
          name: personalDetails.fullName,
          email: personalDetails.email,
          contact: personalDetails.mobile
        },
        theme: {
          color: "#143111"
        }
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.open();

    } catch (error: any) {
      toast.error(error.response?.data?.message || "Error processing registration", { id: "payment" });
    }
  };

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
              {currentStep === 1 && (
                <SessionSelection
                  activeDay={activeDay}
                  setActiveDay={setActiveDay}
                  selectedSessions={selectedSessions}
                  setSelectedSessions={setSelectedSessions}
                  selectedPasses={selectedPasses}
                  setSelectedPasses={setSelectedPasses}
                />
              )}
              {currentStep === 2 && (
                <DelegateRegistrationForm onSubmit={handleSubmit} />
              )}
            </motion.div>
          </div>

          {/* Right Sidebar */}
          <div className="lg:col-span-4">
            <div className="sticky top-4">
              <RegistrationSidebar
                onNext={handleNextStep}
                showNextButton={currentStep === 1}
                selectedItems={[...selectedSessions, ...selectedPasses]}
                subTotal={[...selectedSessions, ...selectedPasses].reduce((acc, curr) => acc + curr.price, 0)}
              />
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
