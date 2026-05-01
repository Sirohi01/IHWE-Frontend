
import React from "react";
import { motion } from "framer-motion";
import imgInsights from "../../assets/mettingindustery/Screenshot 2026-05-01 at 11.53.19 AM.png";
import imgGrowth from "../../assets/mettingindustery/Screenshot 2026-05-01 at 11.54.09 AM.png";
import imgTrends from "../../assets/mettingindustery/Screenshot 2026-05-01 at 11.53.33 AM.png";
import imgPanel from "../../assets/mettingindustery/Screenshot 2026-05-01 at 11.54.19 AM.png";
import imgConnect from "../../assets/mettingindustery/Screenshot 2026-05-01 at 11.53.42 AM.png";
import imgFuture from "../../assets/mettingindustery/Screenshot 2026-05-01 at 11.54.29 AM.png";

const benefits = [
  {
    icon: imgInsights,
    title: "Gain insights from top healthcare leaders and industry pioneers",
  },
  {
    icon: imgGrowth,
    title: "Discover growth opportunities through strategic networking",
  },
  {
    icon: imgTrends,
    title:
      "Learn emerging trends in wellness, medical technology, and preventive healthcare",
  },
  {
    icon: imgPanel,
    title:
      "Join live panel discussions, case studies, and expert masterclasses",
  },
  {
    icon: imgConnect,
    title:
      "Connect with investors, hospital buyers, doctors, and policy influencers",
  },
  {
    icon: imgFuture,
    title: "Stay ahead with future-ready healthcare solutions",
  },
];

const WhyAttend: React.FC = () => {
  return (
    <section className="py-8 bg-white">
      <div className="container mx-auto px-6 max-w-[1320px]">
        <div className="flex flex-col lg:flex-row gap-8 items-start">
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
              <h2 className="text-[34px] font-[900] text-[#1C2B3A] leading-[1.1]">
                Where <span className="text-[#4E9F3D]">Ideas</span><br /> Meet{" "}
                <span className="text-[#1E88E5]">Industry</span>
              </h2>
              <div className="w-6 h-[2px] bg-[#4E9F3D] rounded-full" />
              <p className="text-[12px] text-[#5F6B7A] leading-[1.5] font-normal">
                Be part of high-impact conversations, future-focused knowledge
                sessions, and meaningful connections that drive real change in
                healthcare & wellness.
              </p>
            </motion.div>
          </div>

          {/* Right benefits grid */}
          <div className="lg:w-[62%] grid md:grid-cols-2 gap-x-12 gap-y-6">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="flex items-center gap-1.5 group"
              >
                <div className="shrink-0 w-16 h-16 rounded-full overflow-hidden flex items-center justify-center">
                  <img
                    src={benefit.icon}
                    alt=""
                    className="w-full h-full object-contain object-center mix-blend-multiply contrast-125 brightness-110 group-hover:scale-105 transition-transform duration-300 rounded-full"
                  />
                </div>
                <p className="text-[14px] font-medium text-[#5F6B7A] leading-[1.5] flex-1">
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