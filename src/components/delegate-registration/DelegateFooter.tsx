import React, { useState, useEffect } from "react";
import { Headphones, Phone, Mail, Globe, Facebook, Instagram, Youtube, Linkedin } from "lucide-react";
import logo from "@/assets/arogyasangostilogo/compressed_arogyasangosti.webp";
import { socialMediaApi } from "@/lib/api";

const DelegateFooter: React.FC = () => {
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
    <footer className="w-full bg-white">
      {/* Top Contact Bar - Dark Green background with colorful icons */}
      {/* Top Contact Bar - Dark Green background with colorful icons */}
      <div className="bg-[#143111] py-6 md:py-4 px-4 sm:px-6 lg:px-10">
        <div className="max-w-[1360px] mx-auto flex flex-col md:flex-row items-center justify-between gap-6 pl-0 md:pl-[30px]">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:flex md:flex-wrap items-center gap-6 md:gap-10 w-full md:w-auto">
            {/* Helpline */}
            <div className="flex items-center gap-3">
              <Headphones className="w-6 h-6 text-[#A3E635]" />
              <div className="text-white">
                <p className="text-[10px] font-bold opacity-60 uppercase tracking-tighter">Have Questions?</p>
                <p className="text-[13px] font-black leading-none">We're here to help!</p>
              </div>
            </div>

            <div className="hidden md:block h-8 w-[1px] bg-white/10" />

            {/* Phone */}
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-[#A3E635]">
                <Phone className="w-4 h-4 fill-current" />
              </div>
              <span className="text-[15px] font-black text-white">+91-9654900525</span>
            </div>

            <div className="hidden md:block h-8 w-[1px] bg-white/10" />

            {/* Email */}
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-[#A3E635]">
                <Mail className="w-4 h-4" />
              </div>
              <span className="text-[13px] font-bold text-white tracking-tight">info@ihwe.in</span>
            </div>

            <div className="hidden md:block h-8 w-[1px] bg-white/10" />

            {/* Web */}
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-[#A3E635]">
                <Globe className="w-4 h-4" />
              </div>
              <span className="text-[13px] font-bold text-white tracking-tight">www.ihwe.in</span>
            </div>
          </div>

          {/* Socials - Colorful */}
          <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-5 w-full md:w-auto mt-4 md:mt-0 border-t border-white/10 pt-4 md:border-none md:pt-0">
            <span className="text-[12px] font-black text-white uppercase tracking-widest opacity-60 text-center">Follow Us</span>
            <div className="flex items-center gap-3 justify-center">
              <a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-[#0077b5] flex items-center justify-center text-white hover:scale-110 transition-transform shadow-lg">
                <Linkedin className="w-4 h-4" />
              </a>
              <a href={socialLinks.facebook} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-[#1877f2] flex items-center justify-center text-white hover:scale-110 transition-transform shadow-lg">
                <Facebook className="w-4 h-4" />
              </a>
              <a href={socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-black flex items-center justify-center text-white hover:scale-110 transition-transform shadow-lg">
                <span className="font-black text-[10px]">X</span>
              </a>
              <a href={socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] flex items-center justify-center text-white hover:scale-110 transition-transform shadow-lg">
                <Instagram className="w-4 h-4" />
              </a>
              <a href={socialLinks.youtube} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-[#ff0000] flex items-center justify-center text-white hover:scale-110 transition-transform shadow-lg">
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Branding Section - More Compact */}
      <div className="bg-white py-6 md:py-4 px-4 sm:px-6 lg:px-10 border-t border-gray-100">
        <div className="max-w-[1360px] mx-auto flex flex-col md:flex-row items-center justify-between gap-8 md:gap-6 pl-0 md:pl-[30px]">
          {/* Logo & Info */}
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-8 text-center sm:text-left">
            <img src={logo} alt="Arogya Sanghoshthi" className="h-16 w-auto" />
            <div className="border-t sm:border-t-0 sm:border-l border-gray-100 pt-4 sm:pt-0 sm:pl-8">
              <h3 className="text-[20px] font-black text-[#143111] uppercase tracking-tight leading-none">AROGYA SANGHOSHTI 2026</h3>
              <div className="h-[1px] w-20 bg-gray-100 my-2 mx-auto sm:mx-0" />
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">18th Edition</p>
            </div>
          </div>

          {/* Partners */}
          <div className="flex flex-wrap items-center justify-center gap-8 border-t border-gray-100 pt-6 md:pt-0 md:border-none w-full md:w-auto">
            <div className="flex flex-col items-center md:items-start">
              <p className="text-[9px] font-black text-gray-300 uppercase tracking-[0.2em] mb-2">Part of</p>
              <div className="flex items-center gap-4">
                <img
                  src="/logo.png"
                  alt="International Health & Wellness Expo"
                  className="w-14 h-14 object-contain"
                />
                <div className="text-[12px] font-black text-[#143111] leading-tight text-left">
                  <div>INTERNATIONAL</div>
                  <div className="text-green-600">HEALTH & WELLNESS</div>
                  <div>EXPO 2026</div>
                </div>
              </div>
            </div>

            <div className="h-12 w-[1px] bg-gray-100 hidden md:block" />

            <div className="flex flex-col items-center md:items-start w-full sm:w-auto">
              <p className="text-[9px] font-black text-gray-300 uppercase tracking-[0.2em] mb-2 text-center md:text-left w-full">Supported By</p>
              <div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-8 justify-center">
                <div className="flex items-center gap-3">
                  <img
                    src="/MSME.png"
                    alt="Govt of India"
                    className="w-10 h-10 object-contain"
                  />
                  <div className="text-[11px] font-black text-[#143111] text-left">
                    <div>Ministry of AYUSH</div>
                    <div className="text-[8px] font-bold text-gray-400 uppercase">Government of India</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <img
                    src="/MSME.png"
                    alt="NITI Aayog"
                    className="w-10 h-10 object-contain"
                  />
                  <div className="text-[11px] font-black text-[#143111] text-left">
                    <div>NITI Aayog</div>
                    <div className="text-[8px] font-bold text-gray-400 uppercase">Government of India</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default DelegateFooter;
