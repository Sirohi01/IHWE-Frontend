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
      className="hidden md:block bg-slate-900 border-b border-slate-800 text-slate-300 text-[11px] relative z-50 py-1"
    >
      <div className="container mx-auto flex items-center justify-between px-6 py-1 gap-10">

        {/* Left Section - Contact Info */}
        <div className="flex-shrink-0 flex items-center gap-6">
          {topbarEmails.map((item: any, idx: number) => (
            <a
              key={`email-${idx}`}
              href={`mailto:${item.email}`}
              className="flex items-center gap-2 hover:text-white transition font-medium"
            >
              <Mail className="w-3.5 h-3.5 text-[#d26019]" />
              <span>{item.email}</span>
            </a>
          ))}

          {topbarPhones.map((item: any, idx: number) => (
            <a
              key={`phone-${idx}`}
              href={`tel:${item.phone}`}
              className="flex items-center gap-2 hover:text-white transition font-medium"
            >
              <Phone className="w-3.5 h-3.5 text-[#d26019]" />
              <span>{item.phone}</span>
            </a>
          ))}
        </div>

        {/* Center Section - Scrolling Marquee */}
        <div className="flex-1 overflow-hidden relative h-full flex items-center">
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

        {/* Right Section - Event Date + Login Buttons */}
        <div className="flex-shrink-0 flex items-center gap-4">
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