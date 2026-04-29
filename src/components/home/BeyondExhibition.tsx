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
    title: "INTERNATIONAL CONFERENCES",
    subtitle: "Knowledge. Insights. Future Trends.",
    icon: <Users className="w-6 h-6" />
  },
  {
    title: "LEADERSHIP SUMMITS",
    subtitle: "Connect. Collaborate. Lead Change.",
    icon: <UserRound className="w-6 h-6" />
  },
  {
    title: "HEALTHCARE AWARDS",
    subtitle: "Recognizing Excellence. Inspiring Impact.",
    icon: <Trophy className="w-6 h-6" />
  },
  {
    title: "STARTUP & INNOVATION SHOWCASE",
    subtitle: "Innovate. Pitch. Grow. Get Invested.",
    icon: <Rocket className="w-6 h-6" />
  },
  {
    title: "STRUCTURED B2B MEETINGS",
    subtitle: "Network. Partner. Grow Together.",
    icon: <Handshake className="w-6 h-6" />
  },
  {
    title: "GLOBAL DELEGATION PARTICIPATION",
    subtitle: "Global Reach. Endless Opportunities.",
    icon: <Globe className="w-6 h-6" />
  }
];

const BeyondExhibition = () => {
  return (
    <section className="bg-white pt-0 pb-12 px-[48px] overflow-hidden">
      <div className="max-w-[1500px] mx-auto">
        <div className="bg-[#f3f9f4] rounded-[1.5rem] p-6 lg:p-7 flex flex-col xl:flex-row items-center gap-6 border-[1px] border-[#e8f0e9] shadow-sm">
          
          {/* LEFT HEADER */}
          <div className="w-full xl:w-[25%] flex flex-col items-start text-left border-b xl:border-b-0 xl:border-r border-gray-300/50 pb-6 xl:pb-0 xl:pr-8">
            <h2 className="text-[18px] font-black text-[#071c3d] tracking-tight leading-tight mb-3">
              BEYOND <span className="bg-gradient-to-r from-[#2f8f3a] to-[#0d47a1] bg-clip-text text-transparent">AN EXHIBITION</span>
            </h2>
            <p className="text-[11px] text-gray-500 font-medium leading-relaxed max-w-[280px]">
              A powerful ecosystem of conferences, summits, awards, B2B meetings and global collaborations.
            </p>
          </div>

          {/* RIGHT GRID ITEMS */}
          <div className="w-full xl:w-[75%] grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-y-8 gap-x-2">
            {extras.map((item, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`flex flex-col items-start text-left px-2 group ${index < extras.length - 1 ? 'lg:border-r border-gray-300/30' : ''}`}
              >
                <div className="text-[#2f8f3a] mb-3 transition-transform duration-300 group-hover:scale-110">
                  {item.icon}
                </div>
                <h4 className="text-[9px] font-black text-[#2f8f3a] mb-1 leading-tight tracking-tight uppercase">
                  {item.title}
                </h4>
                <p className="text-[8.5px] text-gray-500 font-bold leading-tight max-w-[110px]">
                  {item.subtitle}
                </p>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default BeyondExhibition;
