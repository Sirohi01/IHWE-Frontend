import React from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  UserRound, 
  Trophy, 
  Rocket, 
  Handshake, 
  Globe 
} from 'lucide-react';

const extras = [
  {
    title: "INTERNATIONAL",
    title2: "CONFERENCES",
    subtitle: "Knowledge. Insights. Future Trends.",
    icon: <Users className="w-9 h-9" strokeWidth={2.5} />
  },
  {
    title: "LEADERSHIP",
    title2: "SUMMITS",
    subtitle: "Connect. Collaborate. Lead Change.",
    icon: <UserRound className="w-9 h-9" strokeWidth={2.5} />
  },
  {
    title: "HEALTHCARE",
    title2: "AWARDS",
    subtitle: "Recognizing Excellence. Inspiring Impact.",
    icon: <Trophy className="w-9 h-9" strokeWidth={2.5} />
  },
  {
    title: "STARTUP &",
    title2: "INNOVATION SHOWCASE",
    subtitle: "Innovate. Pitch. Grow. Get Invested.",
    icon: <Rocket className="w-9 h-9" strokeWidth={2.5} />
  },
  {
    title: "STRUCTURED",
    title2: "B2B MEETINGS",
    subtitle: "Network. Partner. Grow Together.",
    icon: <Handshake className="w-9 h-9" strokeWidth={2.5} />
  },
  {
    title: "GLOBAL DELEGATION",
    title2: "PARTICIPATION",
    subtitle: "Global Reach. Endless Opportunities.",
    icon: <Globe className="w-9 h-9" strokeWidth={2.5} />
  }
];

const BeyondExhibition = () => {
  return (
    <section className="bg-white pt-0 pb-8 px-[30px] overflow-hidden">
      <div className="max-w-[1600px] mx-auto">
        <div className="bg-[#ecfdf5] rounded-[1.2rem] p-4 lg:p-5 flex flex-col xl:flex-row items-center gap-3 border-[1px] border-[#d1fae5] shadow-sm">
          
          {/* LEFT HEADER */}
          <div className="w-full xl:w-[20%] flex flex-col items-start text-left border-b xl:border-b-0 xl:border-r border-gray-400/30 pb-3 xl:pb-0 xl:pr-5">
            <h2 className="text-[18px] font-black text-[#0f2a4a] tracking-tighter leading-tight mb-2 whitespace-nowrap">
              BEYOND <span className="text-[#2e7d32]">AN</span> <span className="text-[#0f2a4a]">EXHIBITION</span>
            </h2>
            <p className="text-[9px] text-gray-600 font-medium leading-[1.4] max-w-[280px]">
              A powerful ecosystem of conferences, summits, awards, B2B meetings and global collaborations.
            </p>
          </div>

          {/* RIGHT GRID ITEMS */}
          <div className="w-full xl:w-[80%] grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 items-start gap-1">
            {extras.map((item, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                viewport={{ once: true }}
                className={`flex flex-row items-start text-left px-2 gap-2 group ${index < extras.length - 1 ? 'lg:border-r border-gray-400/30' : ''}`}
              >
                {/* ICON */}
                <div className="text-[#2e7d32] transition-transform duration-300 group-hover:scale-110 flex-shrink-0 pt-[2px]">
                  {item.icon}
                </div>

                {/* TEXT */}
                <div className="flex flex-col">
                  <h4 className="text-[9.5px] font-bold text-[#1e4620] leading-[1.1] tracking-tight uppercase">
                    <div>{item.title}</div>
                    <div>{item.title2}</div>
                  </h4>
                  <p className="text-[9px] text-gray-600 font-bold leading-[1.2] mt-1 max-w-[150px]">
                    {item.subtitle}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default BeyondExhibition;
