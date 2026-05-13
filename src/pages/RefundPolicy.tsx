import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { 
  FileText, 
  Download, 
  MessageCircle, 
  Mail, 
  Phone, 
  Globe, 
  Calendar, 
  ShieldCheck, 
  AlertCircle, 
  Clock, 
  Users, 
  CreditCard, 
  RotateCcw, 
  Ban, 
  Scale, 
  Zap, 
  MapPin,
  CheckCircle2,
  Building2,
  Handshake,
  ArrowRight
} from "lucide-react";
import SectionContainer from "@/components/layout/SectionContainer";
import refundBg from "@/assets/refundbg.jpeg";
import footerBand from "@/assets/footerband.png";

// Sparkle component
const Sparkle = ({ style, color = "#5ef5e0", shadow = "#0A7C6E" }: { style?: React.CSSProperties, color?: string, shadow?: string }) => (
  <span
    style={{
      position: 'absolute',
      pointerEvents: 'none',
      fontSize: '16px',
      color: color,
      textShadow: `0 0 8px ${shadow}, 0 0 15px ${color}, 0 0 25px ${color}`,
      animation: 'sparkleAnim 1.8s ease-in-out infinite',
      opacity: 0,
      ...style,
    }}
  >
    ✦
  </span>
);

const RefundPolicy = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const policySections = [
    {
      id: "01",
      icon: <FileText className="w-5 h-5" />,
      title: "Scope of Policy",
      desc: "This Refund & Cancellation Policy governs all payments made towards Exhibition Stall Booking, Sponsorship Packages, Buyer / Seller Registration, Delegate Registration, Seminar / Conference Participation and ICOA Buyer Membership."
    },
    {
      id: "02",
      icon: <RotateCcw className="w-5 h-5" />,
      title: "General Refund Policy",
      desc: "All payments made to Namo Gange Wellness Pvt. Ltd. are strictly non-refundable and non-transferable. By making payment, the Participant acknowledges and agrees to this policy."
    },
    {
      id: "03",
      icon: <Ban className="w-5 h-5" />,
      title: "No Refund Scenarios",
      desc: "No refund shall be provided under any circumstances including but not limited to: cancellation by participant, non-attendance (no-show), partial participation or early exit, change in business plans, priorities, or schedule, dissatisfaction with business outcomes or networking results."
    },
    {
      id: "04",
      icon: <Calendar className="w-5 h-5" />,
      title: "Event Rescheduling / Modification",
      desc: "The Organiser reserves the right to reschedule, modify, or change venue or format of the Event. In such cases, the registration/booking shall remain valid for the revised event and no refund shall be applicable."
    },
    {
      id: "05",
      icon: <Users className="w-5 h-5" />,
      title: "Event Cancellation by Organiser",
      desc: "In rare circumstances, if the Event is cancelled, the Organiser may, at its sole discretion, offer credit for future events or provide alternative participation benefits. Refunds, if any, shall be at the sole discretion of the Organiser and not a matter of right."
    },
    {
      id: "06",
      icon: <AlertCircle className="w-5 h-5" />,
      title: "Payment Errors / Duplicate Transactions",
      desc: "In case of duplicate payment, excess payment, or technical error during transaction, the Participant must notify within 7 (seven) days of the transaction. After verification, eligible excess amount may be adjusted or refunded."
    },
    {
      id: "07",
      icon: <CreditCard className="w-5 h-5" />,
      title: "Refund Processing (If Applicable)",
      desc: "Approved refunds (if any) shall be processed within a reasonable time frame through the original mode of payment, subject to banking norms."
    },
    {
      id: "08",
      icon: <ShieldCheck className="w-5 h-5" />,
      title: "Non-Transferability",
      desc: "Registration, booking, or membership is non-transferable. Substitution of participant is not allowed without prior written approval."
    },
    {
      id: "09",
      icon: <Handshake className="w-5 h-5" />,
      title: "Role of Associate Partners",
      desc: "ICOA and Namo Gange Trust act only as facilitation / knowledge partners. They shall not be responsible for refunds, payment disputes, or financial claims. All refund-related matters shall be handled solely by the Organiser."
    },
    {
      id: "10",
      icon: <Scale className="w-5 h-5" />,
      title: "Chargebacks & Disputes",
      desc: "Initiating a chargeback without valid grounds shall be treated as breach of agreement. The Organiser reserves the right to suspend participation, recover dues through legal means, and initiate appropriate legal proceedings."
    },
    {
      id: "11",
      icon: <Zap className="w-5 h-5" />,
      title: "Force Majeure",
      desc: "No refund or liability shall arise due to natural disasters, government restrictions, pandemic, or unforeseen circumstances."
    },
    {
      id: "12",
      icon: <Building2 className="w-5 h-5" />,
      title: "Limitation of Liability",
      desc: "The Organiser shall not be liable for indirect or consequential losses, business loss, missed opportunities, or damages."
    },
    {
      id: "13",
      icon: <MapPin className="w-5 h-5" />,
      title: "Governing Law & Jurisdiction",
      desc: "This Policy shall be governed by the laws of India. Subject to exclusive jurisdiction of Courts in Delhi NCR, India."
    }
  ];

  return (
    <div className="bg-[#fcfdfc] min-h-screen font-inter overflow-x-hidden">
      {/* Keyframes injected via style tag */}
      <style>{`
        @keyframes goldShift {
          0%   { background-position: 0% 50%; }
          50%  { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes shimmer {
          0%   { left: -75%; }
          100% { left: 125%; }
        }
        @keyframes sparkleAnim {
          0%   { opacity: 0; transform: scale(0.5) translateY(0); }
          50%  { opacity: 1; transform: scale(1.5) translateY(-15px); }
          100% { opacity: 0; transform: scale(0.8) translateY(-30px); }
        }
        .red-btn-refund {
          background: linear-gradient(135deg, #5E0006 0%, #8b000a 40%, #5E0006 100%);
          background-size: 200% 200%;
          animation: goldShift 2.5s ease infinite;
          box-shadow: 0 10px 30px -5px rgba(0,0,0,0.3), 0 0 20px rgba(94,0,6,0.3);
          position: relative;
          overflow: hidden;
        }
        .red-btn-refund::before {
          content: '';
          position: absolute;
          top: -50%;
          left: -75%;
          width: 50%;
          height: 200%;
          background: linear-gradient(to right, transparent, rgba(255,255,255,0.4), transparent);
          transform: skewX(-20deg);
          animation: shimmer 2s infinite;
        }
        .purple-btn-refund {
          background: linear-gradient(135deg, #1E104E 0%, #301b7a 40%, #1E104E 100%);
          background-size: 200% 200%;
          animation: goldShift 2.5s ease infinite;
          box-shadow: 0 10px 30px -5px rgba(0,0,0,0.3), 0 0 20px rgba(30,16,78,0.3);
          position: relative;
          overflow: hidden;
        }
        .purple-btn-refund::before {
          content: '';
          position: absolute;
          top: -50%;
          left: -75%;
          width: 50%;
          height: 200%;
          background: linear-gradient(to right, transparent, rgba(255,255,255,0.45), transparent);
          transform: skewX(-20deg);
          animation: shimmer 2s infinite;
        }
        @media print {
          .no-print { display: none !important; }
          nav, footer { display: none !important; }
          .print-container { width: 100% !important; margin: 0 !important; padding: 20px !important; }
          .bg-white { background: white !important; }
          .shadow-md { shadow: none !important; }
          .border-b { border-bottom: 1px solid #eee !important; }
          body { color: black !important; background: white !important; }
        }
      `}</style>
      
      {/* ─── HERO SECTION ─── */}
      <section className="relative min-h-[400px] md:h-[480px] flex items-center pt-24 md:pt-32 pb-16 overflow-hidden no-print">
        {/* BG Image with Gradient Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src={refundBg} 
            alt="Refund Policy BG" 
            className="w-full h-full object-cover object-center"
          />
        </div>

        <SectionContainer className="relative z-10">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl md:-mt-28 -mt-6"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="h-[2px] w-8 bg-[#1a682d]" />
              <p className="text-[#1a682d] font-black text-[12px] uppercase tracking-[0.3em]">
                LEGAL INFORMATION
              </p>
            </div>

            <h1 className="text-black font-bold text-2xl md:text-4xl lg:text-[40px] leading-tight mb-6 uppercase tracking-tight">
              <span className="block mb-2">Refund &</span>
              <span className="block mb-3">Cancellation Policy –</span>
              <span style={{ color: '#072a1a' }}>IHWE 2026</span>
            </h1>

            <div className="flex items-start gap-4 mb-8">
              <div className="w-8 h-8 rounded-full bg-[#1a682d]/10 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-5 h-5 text-[#1a682d]" />
              </div>
              <p className="text-black text-[13px] md:text-[14px] font-medium leading-relaxed opacity-90">
                Please read our refund & cancellation policy carefully <br className="hidden md:block" />
                before booking your participation.
              </p>
            </div>

            <div className="flex flex-wrap gap-4 mt-10">
              {/* Contact Support Button - Purple Style */}
              <div className="relative group/btn">
                <div className="hidden md:block">
                  <Sparkle color="#a78bfa" shadow="#1E104E" style={{ top: '-8px', left: '10%', animationDelay: '0s' }} />
                  <Sparkle color="#a78bfa" shadow="#1E104E" style={{ top: '-10px', left: '40%', animationDelay: '0.4s' }} />
                  <Sparkle color="#a78bfa" shadow="#1E104E" style={{ top: '-6px', right: '15%', animationDelay: '0.8s' }} />
                  <Sparkle color="#a78bfa" shadow="#1E104E" style={{ bottom: '-8px', left: '25%', animationDelay: '0.2s' }} />
                  <Sparkle color="#a78bfa" shadow="#1E104E" style={{ bottom: '-10px', right: '30%', animationDelay: '0.6s' }} />
                </div>
                <Link 
                  to="/contact" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="purple-btn-refund flex items-center gap-2.5 px-7 py-2.5 rounded-md transition-all relative z-10 hover:scale-[1.02]"
                >
                  <MessageCircle className="w-4 h-4 text-white" />
                  <span className="text-white font-black text-[10px] uppercase tracking-wider">CONTACT SUPPORT</span>
                  <ArrowRight size={13} className="text-white ml-1 opacity-70" />
                </Link>
              </div>

              {/* Download Policy Button - Red Style */}
              <div className="relative group/btn">
                <div className="hidden md:block">
                  <Sparkle color="#fca5a5" shadow="#5E0006" style={{ top: '-8px', left: '10%', animationDelay: '0s' }} />
                  <Sparkle color="#fca5a5" shadow="#5E0006" style={{ top: '-10px', left: '40%', animationDelay: '0.4s' }} />
                  <Sparkle color="#fca5a5" shadow="#5E0006" style={{ top: '-6px', right: '15%', animationDelay: '0.8s' }} />
                  <Sparkle color="#fca5a5" shadow="#5E0006" style={{ bottom: '-8px', left: '25%', animationDelay: '0.2s' }} />
                  <Sparkle color="#fca5a5" shadow="#5E0006" style={{ bottom: '-10px', right: '30%', animationDelay: '0.6s' }} />
                </div>
                <button 
                  onClick={() => window.print()}
                  className="red-btn-refund flex items-center gap-2.5 px-7 py-2.5 rounded-md transition-all relative z-10 hover:scale-[1.02]"
                >
                  <Download className="w-4 h-4 text-white" />
                  <span className="text-white font-black text-[10px] uppercase tracking-wider">DOWNLOAD POLICY PDF</span>
                  <ArrowRight size={13} className="text-white ml-1 opacity-70" />
                </button>
              </div>
            </div>
          </motion.div>
        </SectionContainer>
      </section>

      {/* ─── INFO BAR CARD ─── */}
      <div className="container mx-auto px-4 md:px-12 relative z-20 -mt-12 md:-mt-24 no-print">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="bg-white rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.08)] border border-slate-100 p-5 md:p-6"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            
            {/* Column 1 */}
            <div className="flex items-start gap-4 pr-6 lg:border-r border-slate-300 last:border-r-0">
              <div className="w-11 h-11 rounded-xl bg-[#0a4d2c] flex items-center justify-center shrink-0">
                <Calendar className="w-5 h-5 text-white" />
              </div>
              <div>
                <h4 className="text-black font-black text-[10px] uppercase tracking-widest leading-tight mb-1.5">
                  9th Edition of
                </h4>
                <p className="text-black text-[12px] font-bold leading-snug">
                  International Health & Wellness Expo 2026 (IHWE – Global Edition) & Associated Programs
                </p>
              </div>
            </div>

            {/* Column 2 */}
            <div className="flex items-start gap-4 pr-6 lg:border-r border-slate-300 last:border-r-0">
              <div className="w-11 h-11 rounded-xl bg-[#f0fdf4] flex items-center justify-center shrink-0">
                <Users className="w-5 h-5 text-[#0a4d2c]" />
              </div>
              <div>
                <h4 className="text-black font-black text-[10px] uppercase tracking-widest leading-tight mb-1.5">
                  Organised by:
                </h4>
                <p className="text-black text-[12px] font-bold leading-snug">
                  Namo Gange <br /> Wellness Pvt. Ltd.
                </p>
              </div>
            </div>

            {/* Column 3 */}
            <div className="flex items-start gap-4 pr-6 lg:border-r border-slate-300 last:border-r-0">
              <div className="w-11 h-11 rounded-xl bg-[#fefce8] flex items-center justify-center shrink-0">
                <Handshake className="w-5 h-5 text-[#854d0e]" />
              </div>
              <div>
                <h4 className="text-black font-black text-[10px] uppercase tracking-widest leading-tight mb-1.5">
                  In Association With:
                </h4>
                <p className="text-black text-[11px] font-bold leading-tight">
                  International Council of AYUSH (ICOA) – (Buyer-Seller Meet)<br />
                  Namo Gange Trust – (Arogya Sanghosti / Conferences)
                </p>
              </div>
            </div>

            {/* Column 4 */}
            <div className="flex items-start gap-4 pr-6">
              <div className="w-11 h-11 rounded-xl bg-slate-50 flex items-center justify-center shrink-0">
                <Clock className="w-5 h-5 text-slate-400" />
              </div>
              <div>
                <h4 className="text-black font-black text-[10px] uppercase tracking-widest leading-tight mb-1.5">
                  Last Updated
                </h4>
                <p className="text-black text-[14px] font-bold leading-tight">
                  April 15, 2026
                </p>
              </div>
            </div>

          </div>
        </motion.div>
      </div>

      <section className="pt-8 md:pt-12 pb-8 md:pb-12">
        <div 
          className="text-center mb-12 py-10 px-6 relative overflow-hidden w-full" 
          style={{ 
            backgroundImage: `url(${footerBand})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
          data-aos="fade-up"
        >
          <SectionContainer>
            <div className="relative z-10">
              <div className="flex items-center justify-center gap-3 mb-4">
                <Zap className="w-5 h-5 text-white fill-white/20" />
                <h2 className="text-white font-bold text-xl md:text-2xl uppercase tracking-tighter">
                  Refund & Cancellation Policy Sections
                </h2>
                <Zap className="w-5 h-5 text-white fill-white/20" />
              </div>
              <p className="text-white font-bold text-[13px] uppercase tracking-wide opacity-80">
                This Policy forms an integral part of the Terms & Conditions and shall be binding on all Participants.
              </p>
            </div>
          </SectionContainer>
        </div>

        <SectionContainer>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-0 gap-y-0 border-t border-slate-200">
            {policySections.map((item, index) => (
              <motion.div 
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className={`flex items-start gap-6 p-8 border-b border-slate-200 group hover:bg-slate-50/50 transition-colors ${index % 2 === 0 ? 'md:border-r' : ''}`}
              >
                <div className="flex items-center gap-4 shrink-0">
                  <div className="w-12 h-12 rounded-2xl bg-white shadow-md border border-slate-100 flex items-center justify-center group-hover:bg-[#0a4d2c] group-hover:text-white transition-all duration-300">
                    {item.icon}
                  </div>
                  <div className="w-8 h-8 rounded-full bg-[#1a682d] text-white text-[11px] font-black flex items-center justify-center shadow-sm">
                    {item.id}
                  </div>
                </div>
                <div>
                  <h3 className="text-[#0c1b3d] font-bold text-[17px] mb-2 leading-tight group-hover:text-[#1a682d] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-black text-[13px] leading-relaxed font-medium ">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </SectionContainer>
      </section>

      {/* ─── HELP BAR ─── */}
      <div className="bg-[#f8faf8] border-t border-b border-slate-200 py-6 no-print">
        <SectionContainer>
          <div className="flex flex-wrap items-center justify-between gap-8">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-sm">
                <Phone className="w-6 h-6 text-[#1a682d]" />
              </div>
              <div>
                <h4 className="text-[#0c1b3d] font-black text-[18px] leading-tight">Need Help?</h4>
                <p className="text-slate-500 font-bold text-[12px] uppercase">We're here to assist you.</p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-x-10 gap-y-4">
              <a href="mailto:info@ihwe.in" className="flex items-center gap-2.5 hover:text-[#1a682d] transition-colors group">
                <Mail className="w-4 h-4 text-[#1a682d] group-hover:scale-110 transition-transform" />
                <span className="text-[#0c1b3d] font-bold text-sm">info@ihwe.in</span>
              </a>
              <a href="tel:+919654900525" className="flex items-center gap-2.5 hover:text-[#1a682d] transition-colors group">
                <Phone className="w-4 h-4 text-[#1a682d] group-hover:scale-110 transition-transform" />
                <span className="text-[#0c1b3d] font-bold text-sm">+91 9654900525</span>
              </a>
              <a href="https://www.ihwe.in" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2.5 hover:text-[#1a682d] transition-colors group">
                <Globe className="w-4 h-4 text-[#1a682d] group-hover:scale-110 transition-transform" />
                <span className="text-[#0c1b3d] font-bold text-sm">www.ihwe.in</span>
              </a>
            </div>
          </div>
        </SectionContainer>
      </div>

    </div>
  );
};

export default RefundPolicy;
