import { motion } from "framer-motion";
import awardsLogo from "../../assets/new.png";
import nominationHeroImg from "../../assets/nomination1.png";

const NominationHero = () => {
  const jakartaFont = { fontFamily: "'Plus Jakarta Sans', sans-serif" };

  return (
    <section className="relative w-full overflow-hidden bg-white" style={jakartaFont}>
      <div 
        className="absolute inset-0 z-0 hidden lg:block"
        style={{
          backgroundImage: `url(${nominationHeroImg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'right center',
          backgroundRepeat: 'no-repeat'
        }}
      ></div>

      {/* Mobile Background (Simple Gradient) */}
      <div className="absolute inset-0 z-0 lg:hidden bg-gradient-to-br from-white to-slate-50"></div>

      <div className="container mx-auto px-6 max-w-[1280px] relative z-10 py-12 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Column: Recreating the Text Design from the Image */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-start"
          >
            {/* IHWE Logo */}
            <div className="mb-1">
              <img src={awardsLogo} alt="IHWE Logo" className="h-auto w-[300px] object-contain" />
            </div>

            <div className="space-y-1">
              {/* <p className="text-[#008d48] font-black text-[15px] tracking-[0.2em] uppercase">
                3rd Edition Of
              </p> */}
              <h1 className="text-[35px] md:text-[50px] font-black leading-[1.05] tracking-tight flex flex-col">
                <span className="text-[#0a2e5c]">NAMO GANGE</span>
                <span className="text-[#008d48]">GLOBAL HEALTH</span>
                <span className="text-[#0a2e5c]">EXCELLENCE AWARDS 2026</span>
              </h1>
              <p className="text-[#0a2e5c] text-[15px] md:text-[18px] font-bold mt-4 opacity-90">
                Honouring Excellence in Healthcare, Wellness &amp; Innovation
              </p>
            </div>

            {/* Nomination Form Button - Styled exactly like the image */}
            <div className="mt-5">
              <div className="bg-[#0a2e5c] text-white px-10 py-2 rounded-sm font-black text-[15px] uppercase tracking-widest shadow-xl hover:bg-[#08244a] transition-all cursor-pointer transform hover:scale-105 active:scale-95">
                NOMINATION FORM
              </div>
            </div>
          </motion.div>
          <div className="hidden lg:block h-[400px]"></div>

        </div>
      </div>
    </section>
  );
};

export default NominationHero;
