import { motion } from "framer-motion";
import icon1 from "../../assets/icon1.png";
import icon2 from "../../assets/icon2.png";
import icon3 from "../../assets/icon3.png";
import icon4 from "../../assets/icon4.png";
import icon5 from "../../assets/icon5.png";
import icon6 from "../../assets/icon6.png";
import icon7 from "../../assets/icon7.png";
import icon8 from "../../assets/icon8.png";
import icon9 from "../../assets/icon9.png";
import icon10 from "../../assets/icon10.png";
import icon11 from "../../assets/icon11.png";
import icon12 from "../../assets/icon12.png";
import icon13 from "../../assets/icon13.png";
import icon14 from "../../assets/icon14.png";

const awardCategories = [
  { title: "Best Hospital / Healthcare Institution", color: "#008d48", icon: icon1 },
  { title: "Excellence in Medical Practice", color: "#008d48", icon: icon2 },
  { title: "Ayurveda & Natural Healing Leader", color: "#008d48", icon: icon3 },
  { title: "Wellness & Spa Brand of the Year", color: "#008d48", icon: icon4 },
  { title: "Fitness Innovation Award", color: "#0a2e5c", icon: icon5 },
  { title: "Nutrition & Organic Excellence", color: "#008d48", icon: icon6 },
  { title: "Medical Tourism Excellence", color: "#0a2e5c", icon: icon7 },
  { title: "Healthcare Startup of the Year", color: "#0a2e5c", icon: icon8 },
  { title: "Women Leadership in Healthcare", color: "#0a2e5c", icon: icon9 },
  { title: "Lifetime Achievement Award", color: "#008d48", icon: icon10 },
];

const stats = [
  { number: "10+", label: "Years of Legacy", icon: icon11 },
  { number: "100+", label: "Exhibitors", icon: icon12 },
  { number: "8000+", label: "Visitors/Delegates", icon: icon13 },
  { number: "150+", label: "Speakers & Experts", icon: icon14 },
];

const AwardsCategories = () => {
  return (
    <section className="pt-0.5 md:pt-0.5 pb-1 md:pb-1 bg-[#edf7f2]">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-1"
        >
          <p className="text-[#008d48] text-[14px] font-black uppercase tracking-[0.3em] mb-0.5 pt-2">
            Award Categories
          </p>
          <h2 className="text-[24px] md:text-[32px] font-bold font-serif text-[#003366] mb-1 leading-tight">
            Recognizing Leaders Across the Health & Wellness Ecosystem
          </h2>

          <div className="flex items-center justify-center gap-2 mb-0">
            <div className="h-[1.5px] flex-1 max-w-[200px] bg-[#b6ddc8] opacity-60" />
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="rotate-[15deg]">
              <path
                d="M21 3C21 3 14 3.5 9 8.5C4 13.5 3 21 3 21C3 21 10.5 20 15.5 15C20.5 10 21 3 21 3Z"
                fill="#008d48"
              />
              <path
                d="M3 21L12 12"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                opacity="0.3"
              />
            </svg>
            <div className="h-[1.5px] flex-1 max-w-[200px] bg-[#b6ddc8] opacity-60" />
          </div>
        </motion.div>

        {/* Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-4 mt-1">
          {awardCategories.map((cat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05 }}
              className="bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col items-center justify-between p-4 gap-2"
            >
              <div className="w-24 h-24 flex items-center justify-center">
                {cat.icon ? (
                  <img
                    src={cat.icon}
                    alt={cat.title}
                    className="w-full h-full object-contain scale-[0.95]"
                  />
                ) : (
                  <div className="w-24 h-24" />
                )}
              </div>
              <p className="text-center text-[14px] font-semibold leading-tight" style={{ color: "#0a2e5c" }}>
                {cat.title}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Stats Strip */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-[#002b5c] rounded-2xl px-8 md:px-12 py-4 md:py-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-y-4 md:gap-4 mt-4 md:mt-4"
        >
          {stats.map((stat, idx) => (
            <div key={idx} className="flex items-center gap-3 md:gap-4 relative group">
              {idx !== 0 && (
                <div className="hidden md:block absolute -left-3 top-1/2 -translate-y-1/2 h-8 w-px bg-white/20" />
              )}
              <div className="w-14 h-14 md:w-11 md:h-11 flex items-center justify-center shrink-0 bg-white/5 rounded-xl md:bg-transparent">
                {stat.icon ? (
                  <img src={stat.icon} alt={stat.label} className="w-full h-full object-contain scale-[1.2] md:scale-[1.3]" />
                ) : null}
              </div>
              <div className="flex flex-col">
                <div className="text-white text-[22px] md:text-[24px] font-black leading-none">
                  {stat.number}
                </div>
                <div className="text-white/70 text-[10px] md:text-[10px] font-bold uppercase tracking-[0.15em] mt-1 md:mt-0.5">
                  {stat.label}
                </div>
              </div>
            </div>
          ))}
        </motion.div>

      </div>
    </section>
  );
};

export default AwardsCategories;
