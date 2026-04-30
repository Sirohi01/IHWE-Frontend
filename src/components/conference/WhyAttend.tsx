// components/conference/WhyAttend.tsx
import React from "react";
import { motion } from "framer-motion";
import {
  Target,
  TrendingUp,
  Users2,
  Network,
  MessageSquare,
  Lightbulb,
} from "lucide-react";

const benefits = [
  {
    icon: Target,
    title: "Gain insights from top healthcare leaders and industry pioneers",
  },
  {
    icon: Network,
    title: "Discover growth opportunities through strategic networking",
  },
  {
    icon: TrendingUp,
    title:
      "Learn emerging trends in wellness, medical technology, and preventive healthcare",
  },
  {
    icon: MessageSquare,
    title:
      "Join live panel discussions, case studies, and expert masterclasses",
  },
  {
    icon: Users2,
    title:
      "Connect with investors, hospital buyers, doctors, and policy influencers",
  },
  {
    icon: Lightbulb,
    title: "Stay ahead with future-ready healthcare solutions",
  },
];

const WhyAttend: React.FC = () => {
  return (
    <section className="py-20 bg-[#F7F9FC]">
      <div className="container mx-auto px-6 max-w-[1320px]">
        <div className="flex flex-col lg:flex-row gap-16 items-start">
          {/* Left */}
          <div className="lg:w-[38%] sticky top-24">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-5"
            >
              <span className="text-[12px] font-semibold text-[#4E9F3D] uppercase tracking-widest">
                WHY ATTEND CONFERENCE?
              </span>
              <h2 className="text-[42px] font-bold text-[#1C2B3A] leading-[1.2]">
                Where <span className="text-[#4E9F3D]">Ideas</span> Meet{" "}
                <span className="text-[#1E88E5]">Industry</span>
              </h2>
              <div className="w-8 h-[3px] bg-[#4E9F3D] rounded-full" />
              <p className="text-[14px] text-[#5F6B7A] leading-[1.7] font-normal">
                Be part of high-impact conversations, future-focused knowledge
                sessions, and meaningful connections that drive real change in
                healthcare & wellness.
              </p>
            </motion.div>
          </div>

          {/* Right benefits grid */}
          <div className="lg:w-[62%] grid md:grid-cols-2 gap-4">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className="flex items-start gap-4 p-5 rounded-[14px] bg-white shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 border border-[#E6ECF3]"
              >
                <div className="shrink-0 w-11 h-11 rounded-[10px] bg-[#EEF4FF] flex items-center justify-center">
                  <benefit.icon className="w-5 h-5 text-[#1E88E5]" />
                </div>
                <p className="text-[13px] font-semibold text-[#1C2B3A] leading-[1.5] pt-0.5">
                  {benefit.title}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyAttend;