import React from "react";
import { motion } from "framer-motion";
import {
  Users,
  Target,
  Store,
  Handshake,
  CheckCircle2
} from "lucide-react";

const detailsData = [
  {
    icon: Users,
    title: "WHO SHOULD ATTEND?",
    items: [
      "Healthcare Professionals",
      "Public Health Experts",
      "NGOs & Policy Makers",
      "Students & Researchers",
      "Wellness Coaches",
      "Corporate CSR Leaders"
    ]
  },
  {
    icon: Target,
    title: "WHY ATTEND DAY 3?",
    items: [
      "Learn future-ready strategies",
      "Discover preventive solutions",
      "Network with global leaders",
      "Explore collaborations",
      "Be part of a sustainable future",
      "Create real-world impact"
    ]
  },
  {
    icon: Store,
    title: "EXHIBITION & NETWORKING",
    description: "Explore preventive health solutions, sustainable products, wellness innovations & connect with global organizations, startups, researchers & change-makers."
  },
  {
    icon: Handshake,
    title: "SPONSOR OPPORTUNITIES",
    description: "Showcase your brand, engage with a purpose-driven audience and drive visibility for your healthcare or wellness solutions.",
    linkText: "BECOME A SPONSOR"
  }
];

const Day3Details: React.FC = () => {
  return (
    <section className="py-2 bg-white max-w-[1340px] mx-auto -mt-6" style={{ backgroundColor: "#e2f1d0ff" }}>
      <div className="container mx-auto px-6 ">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {detailsData.map((section, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="flex flex-col h-full"
            >
              <div className="flex items-center gap-3 mb-5">
                <div className="w-12 h-12 rounded-xl bg-[#F0FDF4] flex items-center justify-center text-[#4E9F3D] border border-[#DCFCE7] shadow-sm">
                  <section.icon className="w-6 h-6" />
                </div>
                <h3 className="text-[14px] font-black text-[#0B2C66] uppercase tracking-tight leading-tight">
                  {section.title}
                </h3>
              </div>

              {section.items ? (
                <ul className="space-y-2">
                  {section.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 group">
                      <CheckCircle2 className="w-4 h-4 text-[#4E9F3D] mt-0.5 shrink-0" />
                      <span className="text-[13px] font-bold text-[#5F6B7A] group-hover:text-[#0B2C66] transition-colors">{item}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="flex flex-col h-full">
                  <p className="text-[13px] font-medium text-[#5F6B7A] leading-relaxed">
                    {section.description}
                  </p>
                  {section.linkText && (
                    <button className="mt-auto pt-6 text-[12px] font-black text-[#4E9F3D] flex items-center gap-2 hover:translate-x-1 transition-transform uppercase tracking-widest">
                      {section.linkText} <span className="text-[18px]">→</span>
                    </button>
                  )}
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Day3Details;
