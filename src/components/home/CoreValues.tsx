import React from 'react';
import { Globe, Users, HeartPulse, Leaf } from 'lucide-react';
import { motion } from 'framer-motion';

const values = [
  {
    icon: <Globe className="w-6 h-6" />,
    title: "GLOBAL PARTICIPATION",
    description: "Connect with leaders and innovators from around the world.",
    color: "#0d47a1"
  },
  {
    icon: <Users className="w-6 h-6" />,
    title: "MEANINGFUL CONNECTIONS",
    description: "Build valuable relationships that drive growth.",
    color: "#2f8f3a"
  },
  {
    icon: <HeartPulse className="w-6 h-6" />,
    title: "HEALTHIER COMMUNITIES",
    description: "Empowering people to live healthier & happier lives.",
    color: "#0d47a1"
  },
  {
    icon: <Leaf className="w-6 h-6" />,
    title: "SUSTAINABLE FUTURE",
    description: "Creating a better tomorrow through innovation & collaboration.",
    color: "#2f8f3a"
  }
];

const CoreValues = () => {
  return (
    <section className="bg-white pb-2 overflow-hidden">
      <div className="max-w-[1500px] mx-auto px-6 md:px-14">
        <div className="flex flex-col lg:flex-row gap-0">
          {/* RIGHT CONTENT - Full width row */}
          <div className="w-full border-t border-b border-gray-200 py-3">
            <div className="flex flex-wrap lg:flex-nowrap items-center justify-between gap-y-10 gap-x-4">
              {values.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-center gap-4 group relative flex-1 min-w-[240px] lg:min-w-0"
                >
                  {/* Icon Container */}
                  <div className="relative shrink-0">
                    <div className="w-12 h-12 rounded-full border-[1px] border-gray-100 flex items-center justify-center bg-white shadow-sm transition-all duration-500 group-hover:shadow-md relative z-10">
                      <div
                        className="w-[85%] h-[85%] rounded-full flex items-center justify-center transition-transform duration-500 group-hover:scale-110"
                        style={{ backgroundColor: item.color, color: '#fff' }}
                      >
                        {/* Smaller icons for tighter fit */}
                        {React.cloneElement(item.icon as React.ReactElement, { className: 'w-4 h-4' })}
                      </div>
                    </div>
                  </div>

                  {/* Text Content */}
                  <div className="flex flex-col">
                    <h3 className="text-[11px] font-black tracking-tight text-[#071c3d] mb-0.5">
                      {item.title}
                    </h3>
                    <p className="text-[10px] text-gray-500 font-medium leading-[1.3] max-w-[180px]">
                      {item.description}
                    </p>
                  </div>

                  {/* Vertical Divider */}
                  {index < values.length - 1 && (
                    <div className="hidden lg:block h-8 w-[1px] bg-gray-100 absolute -right-2 top-1/2 -translate-y-1/2" />
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CoreValues;
