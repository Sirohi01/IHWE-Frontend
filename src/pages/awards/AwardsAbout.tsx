import { motion } from "framer-motion";
import plaqueImg from "../../assets/aboutA.png";
import credImg from "../../assets/cred.png";

const AwardsAbout = () => {
  const navyColor = "#003366";

  return (
    <section className="py-6 md:py-10 bg-white overflow-hidden">
      {/* Standardized to Navbar Width (1400px) for Logo Alignment */}
      <div className="container mx-auto px-6 max-w-[1400px]">
        <div className="flex flex-col lg:flex-row gap-10 xl:gap-16 items-center">

          {/* LEFT — Award Plaque Composite Image (Balanced Size) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex-1 relative flex justify-center lg:justify-start"
          >
            <div className="w-full max-w-[550px] h-auto overflow-hidden rounded-[24px]">
              <img
                src={plaqueImg}
                alt="Award Plaque"
                className="w-full h-auto object-contain"
              />
            </div>
          </motion.div>

          {/* RIGHT — Content Area */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex-1 flex flex-col justify-center gap-1.5"
          >
            {/* Section Label */}
            <span className="text-[#008d48] text-[11px] font-black uppercase tracking-[0.2em] font-sans">
              About The Awards
            </span>

            {/* Serif Heading */}
            <h2 className="text-[28px] md:text-[38px] font-bold leading-[1.1] tracking-tight font-serif" style={{ color: navyColor }}>
              Celebrating Leaders Who <br className="hidden md:block" />
              Transform Healthcare
            </h2>

            {/* Description Area */}
            <div className="flex flex-col gap-3 mt-2 mb-4">
              <p className="text-slate-600 text-[15px] md:text-[16.5px] leading-relaxed font-medium">
                The Namo Gange Global Health Excellence Awards is a prestigious initiative that recognizes outstanding contributions and remarkable achievements in the field of healthcare, wellness and holistic well-being.
              </p>
              <p className="text-slate-600 text-[15px] md:text-[16.5px] leading-relaxed font-medium">
                These awards honor individuals, organizations and institutions that are shaping a healthier, stronger and more compassionate world.
              </p>
            </div>

            {/* Features Strip */}
            <div className="border-t border-slate-100">
              <img
                src={credImg}
                alt="Award Features"
                className="w-full h-auto object-contain max-w-[700px]"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AwardsAbout;
