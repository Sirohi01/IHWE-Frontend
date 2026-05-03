import { Link } from "react-router-dom";
import { Mail, Phone, CalendarDays, ChevronDown, Lock, Users, ShoppingBag, Handshake } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { settingsApi } from "@/lib/api";
import { cn } from "@/lib/utils";

const Topbar = () => {
  const [settings, setSettings] = useState<any>(null);
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const data = await settingsApi.get();
        if (data) {
          setSettings(data);
        }
      } catch (error) {
        console.error("Error fetching settings for topbar:", error);
      }
    };
    fetchSettings();
  }, []);

  const topbarEmails = settings?.emails?.filter((e: any) => e.forTopbar) || [{ email: "info@healthwellnessexpo.com" }];
  const topbarPhones = settings?.phones?.filter((p: any) => p.forTopbar) || [{ phone: "+1 (234) 567-890" }];
  const marqueeText = settings?.marqueeText || "Registration Open for Global Health Connect 2026 Dubai! • Secure your Booth Today • 150+ Speakers confirmed • Early Bird discount ending soon! • Join 8,000+ Professionals from 25+ Countries";
  const eventDate = settings?.topbarDate || "15–17 October 2026";

  return (
    <>
      <style>{`
        @keyframes goldShift {
          0%   { background-position: 0% 50%; }
          50%  { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes sparkleAnim {
          0%   { opacity: 0; transform: scale(0.5) translateY(0); }
          40%  { opacity: 1; transform: scale(1.2) translateY(-2px); }
          80%  { opacity: 0.6; transform: scale(0.9) translateY(-3px); }
          100% { opacity: 0; transform: scale(0.5) translateY(-4px); }
        }
        .marquee-golden-text {
          background: linear-gradient(135deg, #f5c842 0%, #ffdd00 30%, #ffa500 60%, #f5c842 100%);
          background-size: 200% 200%;
          animation: goldShift 2.5s ease infinite;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          color: transparent;
          font-weight: 900;
          text-shadow: 0 0 10px rgba(245, 200, 66, 0.2);
        }
        .sparkle-dot {
          position: relative;
          display: inline-block;
          margin: 0 15px;
          color: #ffdd00;
          text-shadow: 0 0 10px #ffdd00, 0 0 20px gold;
          animation: sparkleAnim 1.6s ease-in-out infinite;
          -webkit-text-fill-color: #ffdd00;
        }
      `}</style>
      <motion.div
        className="bg-slate-900 border-b border-slate-800 text-slate-300 text-[11px] relative z-[150] py-1"
      >
      <div className="container mx-auto flex flex-wrap items-center justify-center md:justify-between px-2 md:px-6 py-2 md:py-1 gap-y-2 gap-x-4 text-center md:text-left">

        {/* Left Section - Contact Info (Compact on mobile) */}
        <div className="flex items-center justify-center md:justify-start gap-3 md:gap-6 w-full md:w-auto overflow-hidden">
          {topbarEmails.slice(0, 1).map((item: any, idx: number) => (
            <a
              key={`email-top-${idx}`}
              href={`mailto:${item.email}`}
              className="flex items-center gap-1.5 hover:text-white transition font-bold text-[9px] md:text-[11px] whitespace-nowrap"
            >
              <Mail className="w-3 md:w-3.5 h-3 md:h-3.5 text-[#d26019]" />
              <span>{item.email}</span>
            </a>
          ))}

          {/* Secondary Emails - Desktop Only */}
          <div className="hidden md:flex gap-6">
            {topbarEmails.slice(1).map((item: any, idx: number) => (
              <a
                key={`email-sec-${idx}`}
                href={`mailto:${item.email}`}
                className="flex items-center gap-2 hover:text-white transition font-medium"
              >
                <Mail className="w-3.5 h-3.5 text-[#d26019]" />
                <span>{item.email}</span>
              </a>
            ))}
          </div>

          <div className="h-2 w-px bg-slate-700 md:hidden" />

          {topbarPhones.slice(0, 1).map((item: any, idx: number) => (
            <a
              key={`phone-top-${idx}`}
              href={`tel:${item.phone}`}
              className="flex items-center gap-1.5 hover:text-white transition font-bold text-[9px] md:text-[11px] whitespace-nowrap"
            >
              <Phone className="w-3 md:w-3.5 h-3 md:h-3.5 text-[#d26019]" />
              <span>{item.phone}</span>
            </a>
          ))}

          {/* Secondary Phones - Desktop Only */}
          <div className="hidden md:flex gap-6">
            {topbarPhones.slice(1).map((item: any, idx: number) => (
              <a
                key={`phone-sec-${idx}`}
                href={`tel:${item.phone}`}
                className="flex items-center gap-2 hover:text-white transition font-medium"
              >
                <Phone className="w-3.5 h-3.5 text-[#d26019]" />
                <span>{item.phone}</span>
              </a>
            ))}
          </div>
        </div>

        {/* Center Section - Scrolling Marquee - Hidden on small screens */}
        <div className="hidden xl:flex flex-1 overflow-hidden relative h-full items-center px-2">
          <motion.div
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              repeat: Infinity,
              duration: 50,
              ease: "linear",
              delay: 0
            }}
            className="whitespace-nowrap font-bold uppercase tracking-[0.1em] text-[10px] marquee-golden-text flex items-center"
          >
            {marqueeText}
            <span className="sparkle-dot">✦</span>
            {marqueeText}
            <span className="sparkle-dot">✦</span>
          </motion.div>
        </div>

        {/* Right Section - Event Date + Login Dropdown */}
        <div className="hidden lg:flex flex-shrink-0 items-center gap-4">
          <span className="flex items-center gap-2 font-bold text-slate-200">
            <CalendarDays className="w-3.5 h-3.5 text-[#d26019]" />
            <span className="uppercase tracking-wider">{eventDate}</span>
          </span>

          {/* Login Dropdown */}
          <div 
            className="relative"
            onMouseEnter={() => setIsLoginOpen(true)}
            onMouseLeave={() => setIsLoginOpen(false)}
          >
            <button
              className={cn(
                "group px-4 py-1.5 rounded-full bg-[#d26019] text-white transition-all duration-300 font-bold border border-white/20 text-[10px] uppercase tracking-widest whitespace-nowrap shadow-md flex items-center gap-2",
                isLoginOpen ? "bg-[#b05015]" : ""
              )}
            >
              <Lock className="w-3 h-3" />
              <span>Login</span>
              <ChevronDown className={cn("w-3 h-3 transition-transform duration-300", isLoginOpen ? "rotate-180" : "")} />
            </button>

            <AnimatePresence>
              {isLoginOpen && (
                <div className="absolute top-[calc(100%-4px)] right-0 pt-4 w-[210px] z-[60]">
                  {/* Arrow Tip */}
                  <div className="absolute top-[10px] right-8 w-3 h-3 bg-white border-t border-l border-slate-100 rotate-45 z-10" />

                  <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 10, transformOrigin: "top right" }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: 5 }}
                    transition={{ type: "spring", damping: 25, stiffness: 300 }}
                    className="relative bg-white rounded-xl shadow-[0_15px_45px_rgba(0,0,0,0.2)] border border-slate-100 p-1 overflow-hidden z-20"
                  >
                    <div className="grid grid-cols-2">
                      <Link
                        to="/exhibitor-login"
                        className="flex items-center gap-1.5 px-2 py-2 hover:bg-slate-50 transition-all group border-b border-r border-slate-100"
                        onClick={() => setIsLoginOpen(false)}
                      >
                        <div className="w-5 h-5 flex-shrink-0 rounded-lg bg-[#23471d]/5 flex items-center justify-center text-[#23471d] group-hover:bg-[#23471d] group-hover:text-white transition-all duration-300">
                          <Users className="w-2.5 h-2.5" />
                        </div>
                        <span className="text-[9px] font-bold text-slate-800 uppercase tracking-tight leading-tight group-hover:text-[#23471d]">Exhibitor<br/>Login</span>
                      </Link>

                      <Link
                        to="/buyer-login"
                        className="flex items-center gap-1.5 px-2 py-2 hover:bg-slate-50 transition-all group border-b border-slate-100"
                        onClick={() => setIsLoginOpen(false)}
                      >
                        <div className="w-5 h-5 flex-shrink-0 rounded-lg bg-[#d26019]/5 flex items-center justify-center text-[#d26019] group-hover:bg-[#d26019] group-hover:text-white transition-all duration-300">
                          <ShoppingBag className="w-2.5 h-2.5" />
                        </div>
                        <span className="text-[9px] font-bold text-slate-800 uppercase tracking-tight leading-tight group-hover:text-[#d26019]">Buyer<br/>Login</span>
                      </Link>

                      <Link
                        to="/conference"
                        className="flex items-center gap-1.5 px-2 py-2 hover:bg-slate-50 transition-all group border-r border-slate-100"
                        onClick={() => setIsLoginOpen(false)}
                      >
                        <div className="w-5 h-5 flex-shrink-0 rounded-lg bg-[#23471d]/5 flex items-center justify-center text-[#23471d] group-hover:bg-[#23471d] group-hover:text-white transition-all duration-300">
                          <Handshake className="w-2.5 h-2.5" />
                        </div>
                        <span className="text-[9px] font-bold text-slate-800 uppercase tracking-tight leading-tight group-hover:text-[#23471d]">Delegates<br/>Login</span>
                      </Link>

                      <a
                        href="https://admin.ihwe.in/login"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 px-2 py-2 hover:bg-slate-50 transition-all group"
                        onClick={() => setIsLoginOpen(false)}
                      >
                        <div className="w-5 h-5 flex-shrink-0 rounded-lg bg-[#d26019]/5 flex items-center justify-center text-[#d26019] group-hover:bg-[#d26019] group-hover:text-white transition-all duration-300">
                          <Lock className="w-2.5 h-2.5" />
                        </div>
                        <span className="text-[9px] font-bold text-slate-800 uppercase tracking-tight leading-tight group-hover:text-[#d26019]">User<br/>Login</span>
                      </a>
                    </div>
                  </motion.div>
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </motion.div>
    </>
  );
};

export default Topbar;
