import { Link } from "react-router-dom";
import { Mail, Phone, CalendarDays, ChevronDown, Lock, Users, ShoppingBag, Handshake, Briefcase, Camera, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { settingsApi, analyticsApi } from "@/lib/api";
import { cn } from "@/lib/utils";

const Topbar = () => {
  const [settings, setSettings] = useState<any>(null);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);

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
      <div className="container mx-auto max-w-[1400px] flex items-center justify-between px-6 py-1.5 flex-nowrap gap-x-4">
 
        <div className="flex items-center gap-3 md:gap-4 flex-shrink-0 pl-1">
          {/* Left Section - Contact Info (Compact on mobile) */}
          <div className="flex items-center justify-center md:justify-start gap-3 md:gap-3 w-full md:w-auto overflow-hidden">
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
          <div className="hidden md:flex flex-1 min-w-0 max-w-[200px] lg:max-w-[340px] xl:max-w-[560px] 2xl:max-w-[720px] overflow-hidden relative h-full items-center justify-center px-4 ml-6">
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
          </div>

        <div className="hidden md:flex flex-shrink-0 items-center gap-1.5">
          <Link to="/exhibitor-login" className="px-2.5 py-1.5 rounded-md bg-white/5 hover:bg-[#d26019] text-white transition-all duration-300 font-bold border border-white/30 hover:border-[#d26019] text-[9px] uppercase tracking-wider whitespace-nowrap shadow-sm hover:scale-105 inline-block">
            Exhibitor Login
          </Link>
          <Link to="/buyer-login" className="px-2.5 py-1.5 rounded-md bg-white/5 hover:bg-[#d26019] text-white transition-all duration-300 font-bold border border-white/30 hover:border-[#d26019] text-[9px] uppercase tracking-wider whitespace-nowrap shadow-sm hover:scale-105 inline-block">
            Buyer Login
          </Link>
          <button className="px-2.5 py-1.5 rounded-md bg-white/5 hover:bg-[#d26019] text-white transition-all duration-300 font-bold border border-white/30 hover:border-[#d26019] text-[9px] uppercase tracking-wider whitespace-nowrap shadow-sm hover:scale-105">
            Delegates Login
          </button>
          <a
            href="https://admin.ihwe.in/login"
            target="_blank"
            rel="noopener noreferrer"
            className="px-2.5 py-1.5 rounded-md bg-[#d26019] hover:bg-[#b05015] text-white transition-all duration-300 font-bold border border-white/40 text-[9px] uppercase tracking-wider whitespace-nowrap shadow-md hover:scale-105 inline-block text-center"
          >
            User Login
          </a>
        </div>
      </div>
    </motion.div>
    </>
  );
};

export default Topbar;
