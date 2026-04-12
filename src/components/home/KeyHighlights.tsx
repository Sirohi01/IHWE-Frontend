import { Cpu, Rocket, Users, Globe, Lightbulb, MessageSquare, Wifi, Monitor, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const highlights = [
  { icon: Globe, title: "Global Medical Summit", desc: "World-class keynotes from international healthcare leaders" },
  { icon: Rocket, title: "Live Product Launches", desc: "Witness groundbreaking medical innovations first-hand" },
  { icon: Users, title: "Buyer Delegations", desc: "Hosted buyer programs from 25+ countries" },
  { icon: Cpu, title: "AI & Digital Health Pavilion", desc: "Dedicated zone for artificial intelligence in healthcare" },
  { icon: Lightbulb, title: "Start-up Innovation Zone", desc: "Emerging healthtech companies showcasing solutions" },
  { icon: MessageSquare, title: "CEO Roundtable", desc: "Exclusive C-suite networking and strategy sessions" },
  { icon: Wifi, title: "Networking Lounges", desc: "Premium spaces designed for meaningful connections" },
  { icon: Monitor, title: "Live Demos", desc: "Hands-on demonstrations of latest medical equipment" },
];

const containerVariants: any = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants: any = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

const KeyHighlights = () => {
  return (
    <section className="py-24 lg:py-32 bg-white relative overflow-hidden">
      {/* Visual Accents */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center justify-center gap-3 mb-4"
          >
            <div className="h-px w-8 bg-[#23471d]" />
            <span className="text-[#23471d] font-bold text-[12px] uppercase tracking-[0.3em]">Event Features</span>
            <div className="h-px w-8 bg-[#23471d]" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-2xl md:text-3xl lg:text-4xl font-inter text-slate-900 mb-6 leading-tight"
          >
            What Awaits You at <br />
            <span className="text-[#d26019]">IHWE 2026</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-slate-500 text-lg max-w-2xl mx-auto"
          >
            Experience a curated selection of world-class events, networking opportunities, and technological showcases designed to transform the healthcare landscape.
          </motion.p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {highlights.map((h, i) => (
            <motion.div
              key={h.title}
              variants={cardVariants}
              className="group relative bg-white p-8 rounded-2xl border border-slate-100 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.1)] hover:shadow-[0_20px_40px_-15px_rgba(29,161,216,0.15)] transition-all duration-500"
            >
              {/* Card Numbering */}
              <div className="absolute top-4 right-6 text-slate-100 text-5xl font-bold select-none transition-colors group-hover:text-slate-50 z-0">
                {(i + 1).toString().padStart(2, '0')}
              </div>

              <div className="relative z-10">
                <div className="mb-6 inline-flex items-center justify-center w-14 h-14 bg-slate-50 border border-slate-100 text-[#d26019] transition-all duration-500 group-hover:bg-[#d26019] group-hover:text-white group-hover:scale-110 group-hover:rotate-[10deg] shadow-sm">
                  <h.icon className="w-6 h-6" />
                </div>

                <h3 className="text-xl font-inter text-slate-900 mb-3 group-hover:text-[#d26019] transition-colors duration-300">
                  {h.title}
                </h3>

                <p className="text-slate-500 text-sm leading-relaxed mb-4">
                  {h.desc}
                </p>

                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#d26019] opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x--4 group-hover:translate-x-0">
                  Learn More <ArrowRight className="w-3 h-3" />
                </div>
              </div>

              {/* Bottom Interactive Line */}
              <div className="absolute bottom-0 left-0 w-12 h-[3px] bg-slate-100 group-hover:w-full group-hover:bg-[#d26019] transition-all duration-500 rounded-b-2xl" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default KeyHighlights;
