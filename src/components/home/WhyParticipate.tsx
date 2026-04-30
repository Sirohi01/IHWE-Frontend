import { CheckCircle2, FileDown, ArrowRight, Leaf } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

import participateImg from '@/assets/participate.webp';

const WhyParticipate = () => {
  const points = [
    "Meet genuine buyers, distributors, retailers, and healthcare professionals",
    "Generate high-quality B2B & B2C leads with faster business conversions",
    "Launch new products with maximum visibility and market impact",
    "Expand your dealer, distributor, franchise, and export network",
     "Strengthen brand presence through live demos and media exposure",
    "Connect with investors, CEOs, doctors, and key decision-makers",
    "Achieve higher ROI with direct customer engagement and trust building"
  ];

  return (
    <section className="bg-[#F9FCF9] pt-4 pb-12 px-6 md:px-14 overflow-hidden">
      <div className="max-w-[1400px] mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
        
        {/* LEFT CONTENT */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="w-full lg:w-1/2"
        >
          <div className="flex items-center gap-2 mb-3">
            <span className="text-[13px] font-bold uppercase tracking-[0.2em] text-[#2f8f3a]">Why Participate</span>
            <Leaf className="w-[22px] h-[22px] text-[#2f8f3a]" fill="#2f8f3a" />
          </div>

          <h2 className="text-[26px] md:text-[34px] font-extrabold text-[#071c3d] leading-[1.1] mb-5">
            Your Gateway to <span className="text-[#346739]">Growth</span>
          </h2>

          <p className="text-[13.5px] font-semibold text-[#071c3d] leading-[1.7] mb-6 max-w-[480px] text-justify">
          The International Health & Wellness Expo 2026 is a leading platform for health, wellness, fitness, beauty, Ayurveda, organic products, and medical innovation—bringing together top brands, buyers, investors, and industry leaders from India and worldwide.
          </p>

          <div className="space-y-3 mb-8">
            {points.map((point, index) => (
              <div key={index} className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#2f8f3a]" fill="#2f8f3a" color="#fff" />
                <span className="text-[13px] font-semibold text-[#071c3d]">{point}</span>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-6">
            <Link to="/book-a-stand">
              <Button className="bg-[#0b4d17] hover:bg-[#073610] text-white px-8 h-11 rounded-xl font-bold uppercase tracking-wider text-[11px] flex items-center gap-3 shadow-lg transition-all group">
                Exhibit With Us
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>

            <a 
              href="/pdf.pdf" 
              download 
              className="flex items-center gap-2 text-[#2f8f3a] font-bold uppercase tracking-wider text-[11px] hover:underline transition-all"
            >
              <FileDown className="w-5 h-5" /> Download Brochure
            </a>
          </div>
        </motion.div>

        {/* RIGHT IMAGE SECTION */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="w-full lg:w-1/2 relative"
        >
          {/* Green background block behind image */}
          <div className="absolute bottom-[-18px] right-[-18px] w-[180px] h-[180px] bg-[#2f8f3a] rounded-[20px] z-0" />

          <div className="relative rounded-[2rem] overflow-hidden shadow-2xl border-[7px] border-white/70 z-10">
            <img
              src={participateImg}
              alt="Business Meeting"
              className="w-full h-[330px] object-cover"
            />

            {/* Floating Badge */}
            <div className="absolute bottom-6 right-6 bg-white p-4 rounded-2xl shadow-xl border-l-[5px] border-[#2f8f3a] max-w-[190px] z-20 transform hover:-translate-y-2 transition-transform duration-300">
              <div className="flex items-start gap-3">
                <Leaf className="w-4 h-4 text-[#2f8f3a] shrink-0 mt-[2px]" fill="#2f8f3a" />
                <p className="text-[12px] font-bold text-[#071c3d] leading-tight">
                  Build Relationships. <br />
                  Generate Leads. <br />
                  Grow Your Business.
                </p>
              </div>
            </div>
          </div>

          {/* New 3-point bullets below image */}
          <div className="flex justify-start items-center gap-8 mt-8 ml-6">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-[#2f8f3a]" fill="#2f8f3a" color="#fff" />
              <span className="text-[14px] font-bold text-[#071c3d] tracking-tight uppercase">Exhibit</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-[#2f8f3a]" fill="#2f8f3a" color="#fff" />
              <span className="text-[14px] font-bold text-[#071c3d] tracking-tight uppercase">Connect</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-[#2f8f3a]" fill="#2f8f3a" color="#fff" />
              <span className="text-[14px] font-bold text-[#071c3d] tracking-tight uppercase">Grow</span>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default WhyParticipate;