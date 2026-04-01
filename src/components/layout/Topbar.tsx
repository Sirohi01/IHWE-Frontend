import { Link } from "react-router-dom";
import { Mail, Phone, CalendarDays } from "lucide-react";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { settingsApi } from "@/lib/api";

const Topbar = () => {
  const [settings, setSettings] = useState<any>(null);

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
    <motion.div
      className="bg-slate-900 border-b border-slate-800 text-slate-300 text-[11px] relative z-50 py-1"
    >
      <div className="container mx-auto flex flex-wrap items-center justify-center md:justify-between px-2 md:px-6 py-2 md:py-1 gap-y-2 gap-x-10 text-center md:text-left">

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
        <div className="hidden xl:flex flex-1 overflow-hidden relative h-full items-center px-4">
          <motion.div
            animate={{ x: ["100%", "-100%"] }}
            transition={{
              repeat: Infinity,
              duration: 30,
              ease: "linear"
            }}
            className="whitespace-nowrap text-white font-semibold uppercase tracking-[0.1em] text-[10px]"
          >
            {marqueeText}
          </motion.div>
        </div>

        {/* Right Section - Event Date + Login Buttons - Moved to Navbar on Mobile */}
        <div className="hidden lg:flex flex-shrink-0 items-center gap-4">
          <span className="flex items-center gap-2 font-bold text-slate-200">
            <CalendarDays className="w-3.5 h-3.5 text-[#d26019]" />
            <span className="uppercase tracking-wider">{eventDate}</span>
          </span>

          <div className="flex items-center gap-2">
            <Link to="/exhibitor-login" className="px-3 py-1.5 rounded-md bg-white/5 hover:bg-[#d26019] text-white transition-all duration-300 font-bold border border-white/30 hover:border-[#d26019] text-[9px] uppercase tracking-wider whitespace-nowrap shadow-sm hover:scale-105 inline-block">
              Exhibitor Login
            </Link>
            <button className="px-3 py-1.5 rounded-md bg-white/5 hover:bg-[#d26019] text-white transition-all duration-300 font-bold border border-white/30 hover:border-[#d26019] text-[9px] uppercase tracking-wider whitespace-nowrap shadow-sm hover:scale-105">
              Delegates Login
            </button>
            <button className="px-3 py-1.5 rounded-md bg-[#d26019] hover:bg-[#b05015] text-white transition-all duration-300 font-bold border border-white/40 text-[9px] uppercase tracking-wider whitespace-nowrap shadow-md hover:scale-105">
              User Login
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Topbar;