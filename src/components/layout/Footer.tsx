import { Link } from "react-router-dom";
import { Mail, Phone, MapPin } from "lucide-react";
import { useState, useEffect } from "react";
import { settingsApi } from "@/lib/api";

const Footer = () => {
  const [settings, setSettings] = useState<any>(null);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const data = await settingsApi.get();
        if (data) {
          setSettings(data);
        }
      } catch (error) {
        console.error("Error fetching settings for footer:", error);
      }
    };
    fetchSettings();
  }, []);

  const contactEmail = settings?.emails?.find((e: any) => e.forContact)?.email || "info@healthwellnessexpo.com";
  const contactPhone = settings?.phones?.find((p: any) => p.forContact)?.phone || "+1 (234) 567-890";
  const address = settings?.addresses?.[0] ?
    `${settings.addresses[0].street}, ${settings.addresses[0].city}, ${settings.addresses[0].country}` :
    "Dubai World Trade Centre, UAE";

  return (
    <footer className="bg-slate-950 text-white border-t border-slate-800" style={{ fontFamily: "'Inter', sans-serif" }}>
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div className="space-y-6">
            <Link to="/" className="inline-block group bg-white p-2 rounded-lg">
              <img
                src="/logo.png"
                alt="IHWE Logo"
                className="h-14 w-auto group-hover:scale-105 transition-transform"
              />
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed max-w-xs">
              The International Health & Wellness Expo brings together global healthcare leaders, innovators, and decision-makers for three days of transformative experiences.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-sm mb-6 uppercase tracking-[0.2em] text-[#d26019]">Quick Links</h4>
            <div className="flex flex-col gap-3">
              {(settings?.quickLinks?.length > 0 ? settings.quickLinks : [
                { label: "Home", href: "/" },
                { label: "About Us", href: "/about" },
                { label: "Conference", href: "/conference" },
                { label: "Blog", href: "/blog" },
                { label: "Contact", href: "/contact" },
              ]).map((l: any) => (
                <Link key={l.href} to={l.href} className="text-[13px] font-medium text-slate-300 hover:text-[#d26019] transition-colors flex items-center gap-2 group">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-700 group-hover:bg-[#d26019] transition-colors" />
                  {l.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-extrabold text-sm mb-6 uppercase tracking-[0.2em] text-[#d26019]">Exhibition</h4>
            <div className="flex flex-col gap-3">
              {(settings?.exhibitionLinks?.length > 0 ? settings.exhibitionLinks : [
                { label: "Why Exhibit", href: "/exhibition" },
                { label: "Exhibitors", href: "/exhibitors" },
                { label: "Partners", href: "/partners" },
                { label: "Floor Plan", href: "/exhibition#floor" },
                { label: "Book a Stand", href: "/book-a-stand" },
              ]).map((l: any) => (
                <Link key={l.label} to={l.href} className="text-[13px] font-medium text-slate-300 hover:text-[#d26019] transition-colors flex items-center gap-2 group">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-700 group-hover:bg-[#d26019] transition-colors" />
                  {l.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-bold text-sm mb-6 uppercase tracking-[0.2em] text-[#d26019]">Contact Info</h4>
            <div className="flex flex-col gap-4 text-sm text-slate-300">
              <span className="flex items-start gap-3">
                <MapPin className="w-4.5 h-4.5 text-[#d26019] mt-0.5 shrink-0" />
                <span className="text-[13px]">{address}</span>
              </span>
              <a href={`mailto:${contactEmail}`} className="flex items-center gap-3 hover:text-[#d26019] transition-colors group">
                <Mail className="w-4.5 h-4.5 text-[#d26019]" />
                <span className="text-[13px]">{contactEmail}</span>
              </a>
              <a href={`tel:${contactPhone}`} className="flex items-center gap-3 hover:text-[#d26019] transition-colors group">
                <Phone className="w-4.5 h-4.5 text-[#d26019]" />
                <span className="text-[13px]">{contactPhone}</span>
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="border-t border-slate-900 py-6 bg-black/20">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] font-bold uppercase tracking-widest">
          <span className="text-white font-inter">
            © 2026 <span className="text-[#d26019]">Encodancy Pvt Ltd</span>. All rights reserved.
          </span>
          <div className="flex gap-6">
            <Link to="/privacy-policy" className="text-white hover:text-[#d26019] transition-colors">Privacy Policy</Link>
            <Link to="/terms-of-service" className="text-white hover:text-[#d26019] transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
