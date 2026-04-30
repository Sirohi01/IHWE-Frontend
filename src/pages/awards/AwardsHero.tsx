import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { MapPin, Calendar, Star } from "lucide-react";
import heroBg from "../../assets/hero.png";
import awardsLogo from "../../assets/new.png";

const AwardsHero = () => {
  const navyColor = "#0a2e5c";
  const greenColor = "#008d48";
  const darkYellow = "#a67c00";
  const jakartaFont = { fontFamily: "'Plus Jakarta Sans', sans-serif" };

  return (
    <section className="relative w-full min-h-[450px] lg:min-h-[600px] xl:min-h-[80vh] flex flex-col justify-center overflow-hidden bg-white" style={jakartaFont}>

      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${heroBg})`,
          backgroundSize: '100% 100%',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      ></div>

      {/* Reduced Max-Width to 1280px to push alignment inward */}
      <div className="container mx-auto px-6 max-w-[1280px] relative z-10 pt-1 pb-2">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">

          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-8 flex flex-col items-start"
          >
            {/* Awards Logo */}
            <div className="mb-1 w-full">
              <img src={awardsLogo} alt="Namo Gange Awards Logo" className="h-40 w-96 object-contain" />
            </div>

            <div className="flex items-center gap-4">
              <span className="text-[12px] font-bold uppercase tracking-[0.4em]" style={{ color: darkYellow }}>3rd Edition Of</span>
              <div className="flex items-center gap-0">
                <div className="h-[1px] w-14" style={{ backgroundColor: darkYellow }}></div>
                <div className="w-2.5 h-2.5 rotate-45 border border-[#a67c00] bg-white -ml-1 relative z-10 shadow-sm"></div>
                <div className="h-[1px] w-14 -ml-1" style={{ backgroundColor: darkYellow }}></div>
              </div>
            </div>

            <div className="flex flex-col gap-0 leading-[1.0] tracking-tighter">
              <h1 className="font-[800] text-[35px] md:text-[54px] uppercase" style={{ color: navyColor }}>NAMO GANGE</h1>
              <h1 className="font-[800] text-[35px] md:text-[54px] uppercase" style={{ color: greenColor }}>GLOBAL HEALTH</h1>
              <h1 className="font-[800] text-[25px] md:text-[38px] uppercase" style={{ color: navyColor }}>EXCELLENCE AWARDS 2026</h1>
            </div>

            <p className="text-[#555] text-[16px] md:text-[19px] font-semibold tracking-tight">
              Honouring Excellence in Healthcare, Wellness & Innovation
            </p>

            <div className="w-full max-w-xl h-[1.5px] my-3 relative opacity-100" style={{ backgroundColor: '#f0f0f0' }}>
              <div
                className="absolute left-[0%] top-1/2 -translate-y-1/2 h-[1.5px] w-[60%]"
                style={{ backgroundColor: darkYellow }}
              ></div>
              <div
                className="absolute left-[20%] top-1/2 -translate-y-1/2 w-3 h-3 bg-white border rotate-45"
                style={{ borderColor: darkYellow }}
              ></div>
            </div>

            <div className="flex flex-wrap items-center gap-6">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5" style={{ color: greenColor }} />
                <span className="font-bold text-[13px] uppercase" style={{ color: navyColor }}>21-23 AUGUST 2026</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5" style={{ color: greenColor }} />
                <div className="flex flex-col">
                  <span className="font-bold text-[13px] uppercase" style={{ color: navyColor }}>PRAGATI MAIDAN</span>
                  <span className="text-[#888] font-bold text-[9px] uppercase">NEW DELHI, INDIA</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5" style={{ color: greenColor }} />
                <div className="flex flex-col">
                  <span className="font-bold text-[13px] uppercase" style={{ color: navyColor }}>HOSTED AT</span>
                  <span className="text-[#888] font-bold text-[9px] uppercase">IHWE 2026</span>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 mt-4">
              <Link
                to="/visitor-registration"
                className="text-white px-7 py-2 rounded-md text-[12px] font-black uppercase tracking-[0.1em] flex items-center gap-2.5 shadow-lg transition-all hover:scale-[1.02]"
                style={{ ...jakartaFont, backgroundColor: greenColor }}
              >
                NOMINATE NOW <span className="text-[16px]">→</span>
              </Link>
              <button
                className="bg-white px-7 py-2 rounded-md text-[12px] font-black uppercase tracking-[0.1em] border-2 transition-all hover:bg-slate-50 shadow-md"
                style={{ ...jakartaFont, borderColor: navyColor, color: navyColor }}
              >
                BECOME A SPONSOR
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AwardsHero;
