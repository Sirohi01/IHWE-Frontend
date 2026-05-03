import { motion } from "framer-motion";
import lineImg from "../../assets/line.png";

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
    <section className="py-4 md:py-6 bg-white overflow-hidden">
      {/* Wider alignment matching home page */}
      <div className="px-6 md:px-14">
        
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-2"
        >
          <span className="text-[#008d48] text-[14px] font-black uppercase tracking-[0.25em] block mb-0.5">
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
            className="w-full h-[90px] md:h-[130px] overflow-hidden flex items-center justify-center -mb-2"
          >
            <img 
              src={lineImg} 
              alt="Nomination Process" 
              className="w-full h-auto min-h-full object-contain" 
              style={{ objectPosition: 'center' }} 
            />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-y-4 gap-x-4 w-full mt-1 px-4">
            {steps.map((step, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 + idx * 0.05 }}
                className="flex flex-col items-center text-center px-1"
              >
                <h3 className="text-[12px] font-black mb-1 uppercase tracking-tight leading-tight" style={{ color: navyColor }}>
                  {step.title}
                </h3>
                <p className="text-slate-600 text-[12px] font-medium leading-[1.3] max-w-[200px] whitespace-pre-line">
                  {step.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default AwardsNomination;
