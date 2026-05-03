import { motion } from "framer-motion";
import plaqueImg from "../../assets/aboutA.png";
import credImg from "../../assets/cred.png";

const AwardsAbout = () => {
  const navyColor = "#003366";
  const jakartaFont = { fontFamily: "'Plus Jakarta Sans', sans-serif" };

  return (
    <section className="py-6 md:py-10 bg-white overflow-hidden" style={jakartaFont}>
      {/* Wider alignment matching home page */}
      <div className="px-6 md:px-14">
        <div className="flex flex-col lg:flex-row gap-10 xl:gap-16 items-center">

          {/* LEFT — Award Plaque Composite Image */}
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
            <span className="text-[#008d48] text-[11px] font-black uppercase tracking-[0.2em]">
              About The Awards
            </span>

            <h2 className="text-[28px] md:text-[38px] font-[900] leading-[1.1] tracking-tight uppercase" style={{ color: navyColor }}>
              Celebrating Leaders Who <br className="hidden md:block" />
              Transform Healthcare
            </h2>

            <div className="flex flex-col gap-3 mt-2 mb-4">
              <p className="text-slate-600 text-[15px] md:text-[16.5px] leading-relaxed font-semibold opacity-90">
                The Namo Gange Global Health Excellence Awards is a prestigious initiative that recognizes outstanding contributions and remarkable achievements in the field of healthcare, wellness and holistic well-being.
              </p>
              <p className="text-slate-600 text-[15px] md:text-[16.5px] leading-relaxed font-semibold opacity-90">
                These awards honor individuals, organizations and institutions that are shaping a healthier, stronger and more compassionate world.
              </p>
            </div>

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
