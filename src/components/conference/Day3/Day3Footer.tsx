import React, { useState, useEffect } from "react";
import {
  Calendar,
  MapPin,
  Clock,
  Phone,
  Linkedin,
  Facebook,
  Instagram,
  Youtube
} from "lucide-react";
import { socialMediaApi } from "@/lib/api";

const Day3Footer: React.FC = () => {
  const [socialLinks, setSocialLinks] = useState({
    facebook: "https://www.facebook.com/namogangewellness.event",
    instagram: "https://instagram.com",
    twitter: "https://twitter.com",
    youtube: "https://youtube.com",
    linkedin: "https://linkedin.com",
  });

  useEffect(() => {
    const fetchSocialLinks = async () => {
      try {
        const data = await socialMediaApi.get();
        if (data) {
          setSocialLinks({
            facebook: data.facebook || "https://www.facebook.com/namogangewellness.event",
            instagram: data.instagram || "https://instagram.com",
            twitter: data.twitter || "https://twitter.com",
            youtube: data.youtube || "https://youtube.com",
            linkedin: data.linkedin || "https://linkedin.com",
          });
        }
      } catch (error) {
        console.error("Error fetching social links:", error);
      }
    };
    fetchSocialLinks();
  }, []);

  return (
    <footer className="border-t border-gray-100 py-3" >
      <div className="container  px-6 max-w-[1380px]" >
        <div className="flex flex-wrap items-center justify-between gap-y-4 gap-x-6">

          {/* Info Blocks */}
          <div className="flex flex-wrap items-center gap-x-12 gap-y-4">

            {/* Date */}
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl border-2 border-[#E2E8F0] flex items-center justify-center text-[#4E9F3D]">
                <Calendar className="w-6 h-6" />
              </div>
              <div className="flex flex-col">
                <span className="text-[14px] font-black text-[#0B2C66] uppercase">23 AUGUST 2026</span>
                <span className="text-[12px] font-bold text-[#5F6B7A]">(Day 3)</span>
              </div>
            </div>

            {/* Venue */}
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl border-2 border-[#E2E8F0] flex items-center justify-center text-[#4E9F3D]">
                <MapPin className="w-6 h-6" />
              </div>
              <div className="flex flex-col">
                <span className="text-[14px] font-black text-[#0B2C66] uppercase">PRAGATI MAIDAN</span>
                <span className="text-[12px] font-bold text-[#5F6B7A]">NEW DELHI, INDIA</span>
              </div>
            </div>

            {/* Time */}
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl border-2 border-[#E2E8F0] flex items-center justify-center text-[#4E9F3D]">
                <Clock className="w-6 h-6" />
              </div>
              <div className="flex flex-col">
                <span className="text-[14px] font-black text-[#0B2C66] uppercase">10:00 AM - 05:00 PM</span>
                <span className="text-[12px] font-bold text-[#5F6B7A]">IST</span>
              </div>
            </div>

            {/* Contact */}
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl border-2 border-[#E2E8F0] flex items-center justify-center text-[#4E9F3D]">
                <Phone className="w-6 h-6" />
              </div>
              <div className="flex flex-col -space-y-1">
                <span className="text-[14px] font-black text-[#0B2C66] uppercase">+91-9654900525</span>
                <span className="text-[12px] font-bold text-[#5F6B7A]">info@ihwe.in</span>
              </div>
            </div>

          </div>

          {/* Social Icons */}
          <div className="flex items-center gap-3">
            <a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-[#0B2C66] text-white flex items-center justify-center hover:bg-[#4E9F3D] hover:scale-110 transition-all shadow-md">
              <Linkedin className="w-5 h-5" />
            </a>
            <a href={socialLinks.facebook} target="_blank" rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-[#0B2C66] text-white flex items-center justify-center hover:bg-[#4E9F3D] hover:scale-110 transition-all shadow-md">
              <Facebook className="w-5 h-5" />
            </a>
            <a href={socialLinks.instagram} target="_blank" rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-[#0B2C66] text-white flex items-center justify-center hover:bg-[#4E9F3D] hover:scale-110 transition-all shadow-md">
              <Instagram className="w-5 h-5" />
            </a>
            <a href={socialLinks.youtube} target="_blank" rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-[#0B2C66] text-white flex items-center justify-center hover:bg-[#4E9F3D] hover:scale-110 transition-all shadow-md">
              <Youtube className="w-5 h-5" />
            </a>
            <a href={socialLinks.twitter} target="_blank" rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center hover:bg-[#4E9F3D] hover:scale-110 transition-all shadow-md">
              <span className="text-[18px] font-black">X</span>
            </a>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Day3Footer;
