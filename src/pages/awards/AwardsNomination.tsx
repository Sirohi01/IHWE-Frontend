import { motion } from "framer-motion";
import lineImg from "../../assets/line.webp";

const steps = [
  { title: "Submit Nomination", desc: "Fill the online nomination form\nwith required details." },
  { title: "Screening & Shortlisting", desc: "Applications are screened and\nshortlisted by our team." },
  { title: "Jury Evaluation", desc: "Shortlisted entries are\nevaluated by our expert jury." },
  { title: "Final Selection", desc: "Winners are selected based on\nmerit & impact." },
  { title: "Awards Ceremony", desc: "Celebrate excellence at the\nGrand Awards Night." }
];

const AwardsNomination = () => {
  const navyColor = "#003366";

  return (
    <section className="pt-1 md:pt-2 pb-4 md:pb-6 bg-white overflow-hidden">
      {/* Wider alignment matching home page */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-2"
        >
          <span className="text-[#008d48] text-[14px] font-black uppercase tracking-[0.25em] block mb-0.5 pt-2">
            NOMINATION PROCESS
          </span>
          <h2 className="text-[20px] md:text-[26px] font-bold font-serif" style={{ color: navyColor }}>
            A Simple & Transparent Process
          </h2>
        </motion.div>

        <div className="flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.99 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="w-full h-[130px] overflow-hidden hidden md:flex items-center justify-center -mb-2"
          >
            <img loading="lazy" decoding="async" src={lineImg}
              alt="Nomination Process"
              className="w-full h-auto min-h-full object-contain"
              style={{ objectPosition: 'center' }}
            />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-y-5 md:gap-x-4 w-full mt-6 md:mt-1 px-4 relative">
            {/* Vertical connecting line for mobile */}
            <div className="absolute left-[39.5px] top-4 bottom-10 w-[2px] bg-slate-100 md:hidden"></div>

            {steps.map((step, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 + idx * 0.05 }}
                className="flex flex-row md:flex-col items-start md:items-center text-left md:text-center px-1 gap-5 md:gap-0 relative z-10"
              >
                {/* Number indicator for mobile */}
                <div 
                  className="md:hidden flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center font-black text-xl shadow-md border-2 border-white"
                  style={{ backgroundColor: '#008d48', color: 'white' }}
                >
                  {idx + 1}
                </div>

                <div className="flex flex-col pt-1.5 md:pt-0">
                  <h3 className="text-[15px] md:text-[12px] font-black mb-1 uppercase tracking-tight leading-tight" style={{ color: navyColor }}>
                    {step.title}
                  </h3>
                  <p className="text-slate-600 text-[13px] md:text-[12px] font-medium leading-[1.4] md:leading-[1.3] max-w-[280px] md:max-w-[200px] whitespace-pre-line">
                    {step.desc}
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

export default AwardsNomination;
