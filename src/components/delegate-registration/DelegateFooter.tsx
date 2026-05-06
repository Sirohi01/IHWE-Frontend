import React from "react";
import { Headphones, Phone, Mail, Globe, Facebook, Instagram, Youtube, Linkedin } from "lucide-react";
import logo from "@/assets/arogyasangosti.png";

const DelegateFooter: React.FC = () => {
  return (
    <footer className="w-full bg-white">
      {/* Top Contact Bar - Dark Green background with colorful icons */}
      <div className="bg-[#143111] py-4 px-6 lg:px-10">
        <div className="max-w-[1400px] mx-auto flex flex-wrap items-center justify-between gap-6">
          <div className="flex flex-wrap items-center gap-10">
            {/* Helpline */}
            <div className="flex items-center gap-3">
              <Headphones className="w-6 h-6 text-[#A3E635]" />
              <div className="text-white">
                <p className="text-[10px] font-bold opacity-60 uppercase tracking-tighter">Have Questions?</p>
                <p className="text-[13px] font-black leading-none">We're here to help!</p>
              </div>
            </div>

            <div className="h-8 w-[1px] bg-white/10" />

            {/* Phone */}
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-[#A3E635]">
                <Phone className="w-4 h-4 fill-current" />
              </div>
              <span className="text-[15px] font-black text-white">+91 98765 43210</span>
            </div>

            <div className="h-8 w-[1px] bg-white/10" />

            {/* Email */}
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-[#A3E635]">
                <Mail className="w-4 h-4" />
              </div>
              <span className="text-[13px] font-bold text-white tracking-tight">info@arogyasanghoshti.com</span>
            </div>

            <div className="h-8 w-[1px] bg-white/10" />

            {/* Web */}
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-[#A3E635]">
                <Globe className="w-4 h-4" />
              </div>
              <span className="text-[13px] font-bold text-white tracking-tight">www.ihwe.in</span>
            </div>
          </div>

          {/* Socials - Colorful */}
          <div className="flex items-center gap-5">
            <span className="text-[12px] font-black text-white uppercase tracking-widest opacity-60">Follow Us</span>
            <div className="flex items-center gap-3">
              <a href="#" className="w-8 h-8 rounded-full bg-[#0077b5] flex items-center justify-center text-white hover:scale-110 transition-transform shadow-lg">
                <Linkedin className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-[#1877f2] flex items-center justify-center text-white hover:scale-110 transition-transform shadow-lg">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-black flex items-center justify-center text-white hover:scale-110 transition-transform shadow-lg">
                <span className="font-black text-[10px]">X</span>
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] flex items-center justify-center text-white hover:scale-110 transition-transform shadow-lg">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-[#ff0000] flex items-center justify-center text-white hover:scale-110 transition-transform shadow-lg">
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Branding Section - More Compact */}
      <div className="bg-white py-4 px-6 lg:px-10 border-t border-gray-100">
        <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo & Info */}
          <div className="flex items-center gap-8">
            <img src={logo} alt="Arogya Sanghoshthi" className="h-16 w-auto" />
            <div className="border-l border-gray-100 pl-8">
              <h3 className="text-[20px] font-black text-[#143111] uppercase tracking-tight leading-none">AROGYA SANGHOSHTI 2026</h3>
              <div className="h-[1px] w-20 bg-gray-100 my-2" />
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">18th Edition</p>
            </div>
          </div>

          {/* Partners */}
          <div className="flex flex-wrap items-center justify-center gap-8">
            <div className="flex flex-col items-center md:items-start">
              <p className="text-[9px] font-black text-gray-300 uppercase tracking-[0.2em] mb-2">Part of</p>
              <div className="flex items-center gap-4">
                 <div className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center border border-gray-100">
                   {/* Placeholder for Expo Logo */}
                   <div className="text-[8px] font-black text-center text-gray-300">EXPO<br/>LOGO</div>
                 </div>
                 <div className="text-[12px] font-black text-[#143111] leading-tight">
                    <div>INTERNATIONAL</div>
                    <div className="text-green-600">HEALTH & WELLNESS</div>
                    <div>EXPO 2026</div>
                 </div>
              </div>
            </div>

            <div className="h-12 w-[1px] bg-gray-100 hidden md:block" />

            <div className="flex flex-col items-center md:items-start">
              <p className="text-[9px] font-black text-gray-300 uppercase tracking-[0.2em] mb-2">Supported By</p>
              <div className="flex items-center gap-8">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded bg-gray-50 flex items-center justify-center text-[7px] font-bold text-center leading-tight text-gray-400">Govt of<br/>India</div>
                  <div className="text-[11px] font-black text-[#143111]">
                    <div>Ministry of AYUSH</div>
                    <div className="text-[8px] font-bold text-gray-400 uppercase">Government of India</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded bg-gray-50 flex items-center justify-center text-[7px] font-bold text-center leading-tight text-gray-400">NITI<br/>Aayog</div>
                  <div className="text-[11px] font-black text-[#143111]">
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
