import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import * as LucideIcons from "lucide-react";
import { Mail, Phone, MapPin, User, Building2, Loader2 } from "lucide-react";
import { stallVendorApi } from "@/lib/api";
import heroImg from "../assets/stall.jpg";

const DynamicIcon = ({ name, className }: { name: string; className?: string }) => {
  const Icon = (LucideIcons as any)[name] || Building2;
  return <Icon className={className} />;
};

const StallDesigningVendors = () => {
  const [content, setContent] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await stallVendorApi.get();
        if (data) setContent(data);
      } catch (err) {
        console.error("Error fetching vendors:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <Loader2 className="w-10 h-10 text-[#23471d] animate-spin" />
      </div>
    );
  }

  if (!content) return null;

  return (
    <div className="bg-white min-h-screen">

      {/* HERO SECTION — exactly matching Contact page with reduced bottom padding */}
      <section
        className="relative pt-36 pb-12 overflow-hidden"
        style={{
          backgroundImage: `url(${heroImg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/50" />
        {/* Same curve as Contact page */}
        <div
          className="absolute bottom-0 left-0 w-full h-16 bg-white"
          style={{ clipPath: "ellipse(60% 100% at 50% 100%)" }}
        />

        <div
          className="container mx-auto px-4 text-center text-white relative z-10"
          data-aos="fade-up"
        >
          <p className="text-sm uppercase tracking-[0.4em] mb-4 opacity-80">{content.subheading || "Our Partners"}</p>
          <h1 className="text-4xl md:text-6xl font-serif font-semibold mb-6 italic tracking-tight">
            Stall Designing Vendors
          </h1>
          <p className="text-white/70 text-base md:text-lg mb-8 max-w-2xl mx-auto font-light leading-relaxed">
            Professional exhibition stall designers and fabrication experts for IH&WE 2026.
          </p>
        </div>
      </section>

      {/* HEADING SECTION — matching Resources style exactly */}
      <section className="pt-10 pb-12 bg-white">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto" data-aos="fade-up">
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="h-px w-8 bg-[#23471d]" />
              <span className="text-[12px] font-bold uppercase tracking-[0.3em] text-[#23471d] relative">
                {content.subheading || "Our Vendors"}
                <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-[#d26019]/30" />
              </span>
              <div className="h-px w-8 bg-[#23471d]" />
            </div>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-serif text-slate-900 leading-tight mb-4">
              {/* Replace specific words with orange span if highlightText matches */}
              {content.heading?.split(content.highlightText).map((part: string, i: number, arr: any) => (
                <span key={i} className="font-serif">
                  {part}
                  {i < arr.length - 1 && <span className="text-[#d26019]">{content.highlightText}</span>}
                </span>
              )) || content.heading}
            </h2>
            <p className="text-slate-600 text-sm md:text-base max-w-2xl mx-auto leading-relaxed whitespace-pre-line">
              {content.description}
            </p>
          </div>
        </div>
      </section>

      {/* VENDORS GRID — normal positioning (no negative margin) */}
      <section className="pb-24 relative z-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {content.cards?.map((vendor: any, idx: number) => (
              <motion.div
                key={vendor._id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: idx * 0.1 }}
                className="group bg-white border border-slate-300 overflow-hidden shadow-sm hover:shadow-xl hover:border-[#23471d]/40 transition-all duration-500"
              >
                {/* Card Content */}
                <div className="p-6 space-y-5">

                  {/* Company Name + Icon */}
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-[#23471d]/10 flex items-center justify-center shrink-0 group-hover:bg-[#23471d] transition-colors duration-300">
                      <DynamicIcon name={vendor.icon} className="w-5 h-5 text-[#23471d] group-hover:text-white transition-colors duration-300" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-[#23471d] uppercase tracking-wider leading-tight">
                        {vendor.company}
                      </h3>
                    </div>
                  </div>

                  {/* Address */}
                  <div className="flex items-start gap-2 text-xs text-slate-500 font-medium">
                    <MapPin className="w-3.5 h-3.5 text-[#d26019] flex-shrink-0 mt-0.5" />
                    <span>{vendor.address}</span>
                  </div>

                  {/* Contact Details */}
                  <div className="space-y-2.5 border-t border-slate-100 pt-4">
                    <div className="flex items-center gap-2 text-xs text-slate-700 font-bold uppercase tracking-tight">
                      <User className="w-3.5 h-3.5 text-[#23471d]" />
                      {vendor.contactPerson}
                    </div>
                    <div className="flex items-center gap-2 text-xs text-slate-600 font-medium">
                      <Phone className="w-3.5 h-3.5 text-slate-400" />
                      {vendor.tel}
                    </div>
                    <div className="flex items-center gap-2 text-xs text-slate-600 font-medium">
                      <Mail className="w-3.5 h-3.5 text-slate-400" />
                      <span className="truncate">{vendor.email}</span>
                    </div>
                  </div>

                  {/* CTA Button */}
                  <a
                    href={vendor.buttonUrl || "#"}
                    className="block w-full text-center py-2.5 bg-slate-900 group-hover:bg-[#23471d] text-white text-[10px] font-black uppercase tracking-[0.2em] transition-colors shadow-sm"
                  >
                    {vendor.buttonText || "Inquire Now"}
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default StallDesigningVendors;