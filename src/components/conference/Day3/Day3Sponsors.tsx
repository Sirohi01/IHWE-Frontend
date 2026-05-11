import React from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";

const sponsorPlans = [
  {
    type: "TITLE SPONSOR",
    price: "₹15,00,000",
    color: "#0B2C66",
    features: [
      "Event Title Association",
      "Keynote Speaking (10 mins)",
      "Logo on all branding",
      "Premium Stall (3m x 3m)",
      "Full page ad in brochure",
      "5 Delegate Passes",
      "Social Media Promotion"
    ]
  },
  {
    type: "PLATINUM SPONSOR",
    price: "₹7,50,000",
    color: "#4E9F3D",
    features: [
      "Co-branding on stage",
      "Panel Speaking (7 mins)",
      "Logo on key branding",
      "Premium Stall (3m x 3m)",
      "Half page ad in brochure",
      "3 Delegate Passes",
      "Social Media Mention"
    ]
  },
  {
    type: "GOLD SPONSOR",
    price: "₹4,00,000",
    color: "#C9A227",
    features: [
      "Logo on backdrop",
      "Speaking Opportunity",
      "Stall (3m x 3m)",
      "Quarter page ad in brochure",
      "2 Delegate Passes",
      "Social Media Mention"
    ]
  },
  {
    type: "SILVER SPONSOR",
    price: "₹2,00,000",
    color: "#94A3B8",
    features: [
      "Logo on branding",
      "Stall (3m x 3m)",
      "Logo in brochure",
      "1 Delegate Pass",
      "Social Media Mention"
    ]
  },
  {
    type: "BECOIATE SPONSOR",
    price: "₹1,00,000",
    color: "#1A4D2E",
    features: [
      "Logo on website",
      "Logo in brochure",
      "1 Delegate Pass",
      "Social Media Mention"
    ]
  }
];

const Day3Sponsors: React.FC = () => {
  return (
    <section className="py-4 bg-white max-w-[1340px] mx-auto" style={{ backgroundColor: "#e2f1d0ff" }}>
      <div className="container mx-auto px-6 ">


        <div className="text-center mb-1 flex flex-col items-center">
          <div className="flex items-center gap-4 mb-2">
            <div className="h-[2px] w-12 bg-[#4E9F3D]" />
            <h2 className="text-[20px] font-[900] text-[#0B2C66] uppercase tracking-tighter">
              SPONSOR DAY 3 — <span className="text-[#4E9F3D]">PARTNER FOR IMPACT</span>
            </h2>
            <div className="h-[2px] w-12 bg-[#4E9F3D]" />
          </div>

        </div>


        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-2">
          {sponsorPlans.map((plan, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05 }}
              className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm flex flex-col group hover:shadow-xl transition-all duration-300"
            >

              <div
                className="py-2 px-3 text-center"
                style={{ backgroundColor: plan.color }}
              >
                <h3 className="text-[16px] font-black text-white uppercase tracking-wider">{plan.type}</h3>
              </div>

              <div className="p-3 flex flex-col h-full -mt-2">
                <div className="text-center mb-2">
                  <span className="text-[18px] font-black text-[#0B2C66]" style={{ color: plan.color }}>{plan.price}</span>
                </div>

                <ul className="space-y-2 mb-2">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <div
                        className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0"
                        style={{ backgroundColor: plan.color }}
                      />
                      <span className="text-[10px] font-bold text-[#5F6B7A] leading-tight">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  className="mt-auto py-2 px-4 rounded-full text-[15px] font-black uppercase tracking-widest text-white transition-all shadow-md active:scale-95"
                  style={{ backgroundColor: plan.color }}
                >
                  CHOOSE PLAN
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Day3Sponsors;