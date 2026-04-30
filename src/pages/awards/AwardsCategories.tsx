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
  { title: "Best Hospital / Healthcare Institution", color: "#008d48", icon: icon1  },
  { title: "Excellence in Medical Practice",         color: "#008d48", icon: icon2  },
  { title: "Ayurveda & Natural Healing Leader",      color: "#008d48", icon: icon3  },
  { title: "Wellness & Spa Brand of the Year",       color: "#008d48", icon: icon4  },
  { title: "Fitness Innovation Award",               color: "#0a2e5c", icon: icon5  },
  { title: "Nutrition & Organic Excellence",         color: "#008d48", icon: icon6  },
  { title: "Medical Tourism Excellence",             color: "#0a2e5c", icon: icon7  },
  { title: "Healthcare Startup of the Year",         color: "#0a2e5c", icon: icon8  },
  { title: "Women Leadership in Healthcare",         color: "#0a2e5c", icon: icon9  },
  { title: "Lifetime Achievement Award",             color: "#008d48", icon: icon10 },
];

const stats = [
  { number: "200+",  label: "Award Winners",     icon: icon11 },
  { number: "100+",  label: "Healthcare Brands", icon: icon12   },
  { number: "5000+", label: "Industry Visitors", icon: icon13  },
  { number: "25+",   label: "Media Partners",    icon: icon14   },
];

const AwardsCategories = () => {
  return (
    <section className="py-8 md:py-12 bg-[#edf7f2]">
      <div className="container mx-auto px-6 max-w-[1400px]">

        {/* Header - Tighter margins */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <p className="text-[#008d48] text-[10px] font-extrabold uppercase tracking-[0.3em] mb-2">
            Award Categories
          </p>
          <h2 className="text-[26px] md:text-[34px] font-bold font-serif text-[#003366] mb-4">
            Recognizing Leaders Across the Health & Wellness Ecosystem
          </h2>

          <div className="flex items-center justify-center gap-3">
            <div className="h-px flex-1 max-w-[200px] bg-[#b6ddc8]" />
            <svg width="20" height="20" viewBox="0 0 22 22" fill="none">
              <path
                d="M11 20C11 20 3 15 3 9C3 4 11 1 11 1C11 1 19 4 19 9C19 15 11 20 11 20Z"
                fill="#008d48" fillOpacity="0.15" stroke="#008d48" strokeWidth="1.5"
              />
            </svg>
            <div className="h-px flex-1 max-w-[200px] bg-[#b6ddc8]" />
          </div>
        </motion.div>

        {/* Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-4">
          {awardCategories.map((cat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05 }}
              className="bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col items-center justify-between p-4 gap-2"
            >
              <div className="w-24 h-24 overflow-hidden flex items-center justify-center">
                {cat.icon ? (
                  <img
                    src={cat.icon}
                    alt={cat.title}
                    className={`w-full h-full object-contain ${idx === 8 ? 'scale-[1.1]' : 'scale-[1.3]'}`}
                  />
                ) : (
                  <div className="w-24 h-24" />
                )}
              </div>
              <p className="text-center text-[12px] font-semibold leading-tight" style={{ color: "#0a2e5c" }}>
                {cat.title}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Stats Strip - Compact */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-[#002b5c] rounded-2xl px-6 md:px-8 py-5 grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {stats.map((stat, idx) => (
            <div key={idx} className="flex items-center gap-3 relative">
              {idx !== 0 && (
                <div className="hidden md:block absolute -left-2 top-1/2 -translate-y-1/2 h-8 w-px bg-white/20" />
              )}
              <div className="w-10 h-10 overflow-hidden flex items-center justify-center shrink-0">
                {stat.icon ? (
                  <img src={stat.icon} alt={stat.label} className="w-full h-full object-contain scale-[1.3]" />
                ) : null}
              </div>
              <div>
                <div className="text-white text-[24px] md:text-[28px] font-black leading-none">
                  {stat.number}
                </div>
                <div className="text-white/55 text-[9px] font-bold uppercase tracking-widest mt-0.5">
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
