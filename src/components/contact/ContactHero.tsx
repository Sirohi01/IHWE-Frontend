import React from "react";
import SectionContainer from "@/components/layout/SectionContainer";
import { Mail, Clock, CheckCircle, Send } from "lucide-react";
import contactBg from "@/assets/contactbg.webp";
import leafImg from "@/assets/leaf.webp";
import webg from "@/assets/webg.webp";

const ContactHero = () => {
  return (
    <section
      className="relative flex items-center pt-14 md:pt-20 pb-10 md:pb-14 aspect-[0.75/1] sm:aspect-[16/9] md:aspect-[21/9] lg:aspect-[16/7] min-h-[380px] md:min-h-[420px] lg:min-h-[480px]"
      style={{ 
        backgroundImage: `url(${contactBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <SectionContainer className="relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          <div className="text-white max-w-4xl" data-aos="fade-right">
            <div className="inline-flex items-center gap-2 mb-6">
              <Mail className="w-4 h-4 text-[#72a01d]" />
              <span className="text-sm font-bold uppercase tracking-widest text-[#72a01d]">CONTACT US</span>
              <div className="w-8 h-[1px] bg-[#72a01d]" />
            </div>
            
            <h1 className="text-5xl md:text-6xl font-black mb-4 leading-tight drop-shadow-lg">
              WE'RE HERE <br />
              <span className="text-[#73ad1d]">TO HELP YOU!</span>
            </h1>
            
            <p className="text-white text-lg mb-8 max-w-xl leading-relaxed drop-shadow-md">
              Have questions about the expo, exhibiting,<br />
              partnerships or anything else?<br />
              Our team is just a message away.
            </p>
            
            <div className="flex flex-wrap items-center gap-y-4">
              {[
                { icon: Clock, label: "QUICK RESPONSE", sub: "We reply within 24 hrs" },
                { icon: CheckCircle, label: "EXPERT SUPPORT", sub: "Dedicated team to help" },
                { icon: Send, label: "RELIABLE ASSISTANCE", sub: "We're just a message away" },
              ].map((item, i, arr) => (
                <div key={i} className="flex items-center">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#8cc63f] flex items-center justify-center shrink-0">
                      <item.icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-white tracking-wider leading-none mb-1">{item.label}</p>
                      <p className="text-xs text-white">{item.sub}</p>
                    </div>
                  </div>
                  {i < arr.length - 1 && (
                    <div className="hidden md:block w-[1px] h-8 bg-white/30 mx-6 md:mx-8" />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Floating Info Card (WE VALUE YOUR TIME) */}
          <div className="hidden lg:block w-44 bg-white rounded-2xl shadow-2xl px-3 py-6 relative transform hover:-translate-y-2 transition-all duration-500" data-aos="fade-left">
            <div className="absolute top-0 right-0 w-24 h-24 opacity-[0.03] pointer-events-none overflow-hidden rounded-tr-2xl">
              <img loading="lazy" decoding="async" src={leafImg} alt="" className="w-full h-full object-contain rotate-45" />
            </div>
            
            <div className="flex flex-col items-center text-center">
              {/* Floating Icon Header */}
              <div className="w-20 h-20 rounded-full bg-[#73ad1d] flex items-center justify-center mb-4 shadow-[0_10px_25px_rgba(115,173,29,0.3)] -mt-14 border-4 border-white transition-transform duration-300 hover:scale-110 relative z-10">
                <img loading="lazy" decoding="async" src={webg} alt="Web Icon" className="w-12 h-12 object-contain" />
              </div>
              
              <h3 className="text-[17px] font-black text-[#151f43] tracking-tighter uppercase leading-none">WE VALUE</h3>
              <h3 className="text-[17px] font-black text-[#151f43] tracking-tighter uppercase mb-3 mt-1">YOUR TIME</h3>
              
              <div className="w-12 h-[3px] bg-[#73ad1d] rounded-full mb-4" />
              
              <p className="text-xs text-gray-900 font-bold leading-relaxed px-2">
                Reach out to us and <br /> we'll get back to you <br /> promptly!
              </p>

              {/* Decorative corner accent */}
              <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-[#73ad1d] rounded-tl-2xl opacity-10" />
            </div>
          </div>
        </div>
      </SectionContainer>
    </section>
  );
};

export default ContactHero;
