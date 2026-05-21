import React from "react";
import { Users, Lightbulb, Globe, CheckCircle, BarChart } from "lucide-react";

const WhyAttend: React.FC = () => {
  const benefits = [
    {
      title: "Learn from Industry Experts",
      description: "Gain knowledge from leading experts",
      icon: <Users className="w-6 h-6 text-[#143111]" />,
    },
    {
      title: "Discover Latest Innovations",
      description: "Explore cutting-edge technologies & trends",
      icon: <Lightbulb className="w-6 h-6 text-[#143111]" />,
    },
    {
      title: "Build Valuable Connections",
      description: "Network with decision makers & professionals",
      icon: <Globe className="w-6 h-6 text-[#143111]" />,
    },
    {
      title: "Business & Growth Opportunities",
      description: "Expand your business & collaborations",
      icon: <BarChart className="w-6 h-6 text-[#143111]" />,
    },
    {
      title: "Certificate of Participation",
      description: "Get an official certificate for your participation",
      icon: <CheckCircle className="w-6 h-6 text-[#143111]" />,
    },
  ];

  return (
    <section className="w-full bg-white py-6 px-6 lg:px-10">
      <div className="max-w-[1360px] mx-auto pl-0 md:pl-[30px]">
        {/* Section Title with Dot-Line Decoration */}
        <div className="relative flex items-center justify-center mb-10 gap-4">
          <div className="flex-1 h-[1px] bg-gray-200" />
          <div className="w-1.5 h-1.5 rounded-full bg-[#143111]" />
          <h2 className="text-[15px] sm:text-[18px] md:text-[20px] font-black text-[#143111] uppercase tracking-[0.1em] text-center whitespace-normal">
            WHY ATTEND AROGYA SANGHOSHTI 2026?
          </h2>
          <div className="w-1.5 h-1.5 rounded-full bg-[#143111]" />
          <div className="flex-1 h-[1px] bg-gray-200" />
        </div>

        {/* Benefits Grid with Dividers */}
        <div className="flex flex-wrap lg:flex-nowrap items-stretch justify-between gap-6">
          {benefits.map((benefit, index) => (
            <React.Fragment key={index}>
              <div className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left group min-w-[200px]">
                <div className="flex items-center gap-4 mb-3">
                  <div className="w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center text-[#143111] group-hover:bg-[#F1F8EE] transition-all">
                    {benefit.icon}
                  </div>
                  <h3 className="text-[14px] font-black text-gray-900 leading-tight tracking-tight">
                    {benefit.title}
                  </h3>
                </div>
                <p className="text-[12px] font-medium text-gray-400 leading-relaxed pl-0 lg:pl-16">
                  {benefit.description}
                </p>
              </div>
              {/* Vertical Divider */}
              {index < benefits.length - 1 && (
                <div className="hidden lg:block w-[1px] bg-gray-100 self-stretch my-2" />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyAttend;
