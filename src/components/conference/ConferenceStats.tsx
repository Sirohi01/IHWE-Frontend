
// import React from "react";
// import { motion } from "framer-motion";
// import { Users, Mic, Calendar, Trophy, Globe2 } from "lucide-react";


// const InfinityIcon = () => (
//   <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#4E9F3D" strokeWidth="2">
//     <path d="M18.178 8c5.096 0 5.096 8 0 8-5.095 0-7.133-8-12.739-8C.344 8 .344 16 5.44 16c5.095 0 7.133-8 12.738-8z" />
//   </svg>
// );

// const statsData = [
//   { icon: Users, value: "150+", label: "Expert Speakers" },
//   { icon: Mic, value: "18", label: "Premium Sessions" },
//   { icon: Calendar, value: "3", label: "Days Major Conferences" },
//   { icon: Trophy, value: "1000+", label: "Visitors/Delegates" },
//   { icon: Globe2, value: "1000+", label: "Global Buyers" },
//   { icon: InfinityIcon, value: "", label: "Endless Opportunities", custom: true },
// ];

// const ConferenceStats: React.FC = () => {
//   return (
//     <section className="relative z-0 mx-auto max-w-[1380px] -mt-10 px-6 left-[20px]">
//       <div className="bg-[#0B2C66] rounded-[20px] shadow-[0_15px_40px_rgba(11,44,102,0.25)] border border-white/10 px-8 py-1.5 relative overflow-hidden">

//         <div className="absolute inset-0 opacity-5 pointer-events-none">
//           <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
//             <defs>
//               <pattern id="grid" width="30" height="30" patternUnits="userSpaceOnUse">
//                 <path d="M 30 0 L 0 0 0 30" fill="none" stroke="white" strokeWidth="0.5" />
//               </pattern>
//             </defs>
//             <rect width="100%" height="100%" fill="url(#grid)" />
//           </svg>
//         </div>

//         <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 relative z-10 divide-x divide-white/10">
//           {statsData.map((stat, index) => (
//             <motion.div
//               key={index}
//               initial={{ opacity: 0, y: 15 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true }}
//               transition={{ delay: index * 0.05 }}
//               className="flex items-center justify-center gap-3 py-2 group px-4"
//             >
//               <div className="transition-transform duration-500 group-hover:scale-110">
//                 {stat.custom ? (
//                   <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#4E9F3D" strokeWidth="2">
//                     <path d="M18.178 8c5.096 0 5.096 8 0 8-5.095 0-7.133-8-12.739-8C.344 8 .344 16 5.44 16c5.095 0 7.133-8 12.738-8z" />
//                   </svg>
//                 ) : (
//                   <stat.icon className="w-8 h-8 text-[#4E9F3D]" strokeWidth={2} />
//                 )}
//               </div>
//               <div className="flex flex-col">
//                 <h3 className="text-[22px] font-black text-white leading-none tracking-tight">
//                   {stat.value}
//                 </h3>
//                 <p className="text-[10px] font-black text-white/50 uppercase tracking-[0.1em] leading-tight mt-0.5">
//                   {stat.label}
//                 </p>
//               </div>
//             </motion.div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default ConferenceStats;
import React from "react";
import { motion } from "framer-motion";
import { Users, Mic, Calendar, Trophy, Globe2 } from "lucide-react";

const InfinityIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#4E9F3D" strokeWidth="2">
    <path d="M18.178 8c5.096 0 5.096 8 0 8-5.095 0-7.133-8-12.739-8C.344 8 .344 16 5.44 16c5.095 0 7.133-8 12.738-8z" />
  </svg>
);

const statsData = [
  { icon: Users, value: "150+", label: "Expert Speakers" },
  { icon: Mic, value: "18", label: "Premium Sessions" },
  { icon: Calendar, value: "3", label: "Days Major Conferences" },
  { icon: Trophy, value: "1000+", label: "Visitors/Delegates" },
  { icon: Globe2, value: "1000+", label: "Global Buyers" },
  { icon: InfinityIcon, value: "", label: "Endless Opportunities", custom: true },
];

const ConferenceStats: React.FC = () => {
  return (
    <section className="z-0 w-full -mt-5  left-[20px]">
      <div className="bg-[#0B2C66] rounded-[0px] shadow-[0_15px_40px_rgba(11,44,102,0.25)] border border-white/10 px-6 py-0 relative overflow-hidden w-full">

        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="30" height="30" patternUnits="userSpaceOnUse">
                <path d="M 30 0 L 0 0 0 30" fill="none" stroke="white" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 relative z-10 divide-x divide-white/10">
          {statsData.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="flex items-center justify-center gap-2 py-2 group px-2"
            >
              <div className="transition-transform duration-500 group-hover:scale-110">
                {stat.custom ? (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#4E9F3D" strokeWidth="2">
                    <path d="M18.178 8c5.096 0 5.096 8 0 8-5.095 0-7.133-8-12.739-8C.344 8 .344 16 5.44 16c5.095 0 7.133-8 12.738-8z" />
                  </svg>
                ) : (
                  <stat.icon className="w-5 h-5 text-[#4E9F3D]" strokeWidth={2} />
                )}
              </div>
              <div className="flex flex-col">
                <h3 className="text-[16px] font-black text-white leading-none tracking-tight">
                  {stat.value}
                </h3>
                <p className="text-[9px] font-medium text-white/100 uppercase tracking-[0.1em] leading-tight mt-0.5">
                  {stat.label}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ConferenceStats;