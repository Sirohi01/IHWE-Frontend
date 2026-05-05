import React from 'react';
import { motion } from 'framer-motion';
import SectionContainer from '../layout/SectionContainer';
import {
  Lightbulb,
  Handshake,
  TrendingUp,
  BookOpen,
  PackageSearch,
  Zap,
  Users,
  Target,
  Star,
  Leaf,
  ShoppingCart,
  Globe,
  Hospital,
  Stethoscope,
  Dumbbell,
  Flower2,
  Sprout,
  Heart
} from 'lucide-react';

import image1 from '@/assets/image1.png';
import image2 from '@/assets/image2.png';
import image3 from '@/assets/image3.png';
import image4 from '@/assets/image4.png';

const WhyAttendItemsLeft = [
  {
    title: "DISCOVER",
    desc: "Explore the latest products, services  driving the future of health & wellness.",
    icon: <Lightbulb className="w-5 h-5 text-[#2e7d32]" />
  },
  {
    title: "CONNECT",
    desc: "Meet leading brands, manufacturers, suppliers under one roof.",
    icon: <Handshake className="w-5 h-5 text-[#2e7d32]" />
  },
  {
    title: "GROW",
    desc: "Unlock new business opportunities, partnerships and investment possibilities.",
    icon: <TrendingUp className="w-5 h-5 text-[#2e7d32]" />
  }
];

const WhyAttendItemsRight = [
  {
    title: "LEARN",
    desc: "Attend seminars, workshops and live demos by industry experts.",
    icon: <BookOpen className="w-5 h-5 text-[#2e7d32]" />
  },
  {
    title: "SOURCE",
    desc: "Find trusted suppliers, distributors and franchise opportunities.",
    icon: <PackageSearch className="w-5 h-5 text-[#2e7d32]" />
  },
  {
    title: "STAY AHEAD",
    desc: "Stay updated with market trends, consumer insights and future industry developments.",
    icon: <Zap className="w-5 h-5 text-[#2e7d32]" />
  }
];

const WhoShouldAttendItems = [
  { label: "Distributors, Wholesalers & Retailers", icon: <ShoppingCart className="w-5 h-5" /> },
  { label: "Importers & Exporters", icon: <Globe className="w-5 h-5" /> },
  { label: "Hospitals, Clinics & Healthcare Institutions", icon: <Hospital className="w-5 h-5" /> },
  { label: "Doctors, Nutritionists & Wellness Experts", icon: <Stethoscope className="w-5 h-5" /> },
  { label: "Gym Owners, Spa & Fitness Professionals", icon: <Dumbbell className="w-5 h-5" /> },
  { label: "Ayurveda, Organic & Natural Product Buyers", icon: <Sprout className="w-5 h-5" /> },
  { label: "Beauty, Skincare & Personal Care Professionals", icon: <Flower2 className="w-5 h-5" /> },
  { label: "Investors, Franchise Seekers & Business Owners", icon: <Handshake className="w-5 h-5" /> },
  { label: "Corporate Buyers & Procurement Teams", icon: <Users className="w-5 h-5" /> },
  { label: "Health-Conscious Consumers & Lifestyle Enthusiasts", icon: <Heart className="w-5 h-5" /> },
];

const AttendanceInfo = () => {
  return (
    <section className="bg-white pt-0 pb-0 w-full relative z-10">
      <SectionContainer className="pt-0 pb-4">

        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">

          {/* LEFT: WHY ATTEND */}
          <div className="xl:col-span-5">
            <div className="flex items-center gap-2 mb-2">
              <h2 className="text-[36px] font-black text-[#1a1a1a] tracking-tight">
                WHY <span className="text-[#1a5d1a]">ATTEND?</span>
              </h2>
              <Leaf className="w-9 h-9 text-[#2e7d32] fill-[#2e7d32]" />
            </div>
            <p className="text-[12.5px] text-gray-700 font-medium mb-4 leading-relaxed max-w-[350px]">
              Explore innovations, build connections and gain insights that drive better health and stronger businesses.
            </p>

            {/* Divider with Leaf */}
            <div className="flex items-center gap-4 mb-1">
              <div className="h-[1px] flex-grow bg-gray-200" />
              <Leaf className="w-4 h-4 text-[#2e7d32] fill-[#2e7d32]" />
              <div className="h-[1px] flex-grow bg-gray-200" />
            </div>

            <div className="grid grid-cols-2 relative border-l border-gray-100">
              {/* Vertical Divider */}
              <div className="absolute top-0 bottom-0 left-1/2 w-[1px] border-r border-dashed border-gray-300 z-0" />

              {/* Row 1 */}
              <div className="py-1.5 px-4 border-b border-dashed border-gray-300 relative">
                {WhyAttendItemsLeft.slice(0, 1).map((item, index) => (
                  <div key={index} className="flex gap-4 group">
                    <div className="w-12 h-12 rounded-full flex items-center justify-center bg-[#f0fdf4] shrink-0 mt-1">
                      {React.cloneElement(item.icon as React.ReactElement, { className: 'w-7 h-7 text-[#1a5d1a]' })}
                    </div>
                    <div className="max-w-[240px]">
                      <h3 className="text-[14px] font-bold text-[#1a5d1a] mb-0.5 leading-none pt-3">{item.title}</h3>
                      <p className="text-[10px] text-gray-700 font-semibold leading-relaxed mt-1">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="py-1.5 px-4 border-b border-dashed border-gray-300 relative">
                {WhyAttendItemsRight.slice(0, 1).map((item, index) => (
                  <div key={index} className="flex gap-4 group">
                    <div className="w-12 h-12 rounded-full flex items-center justify-center bg-[#f0fdf4] shrink-0 mt-1">
                      {React.cloneElement(item.icon as React.ReactElement, { className: 'w-7 h-7 text-[#1a5d1a]' })}
                    </div>
                    <div className="max-w-[240px]">
                      <h3 className="text-[14px] font-bold text-[#1a5d1a] mb-0.5 leading-none pt-3">{item.title}</h3>
                      <p className="text-[10px] text-gray-700 font-semibold leading-relaxed mt-1">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Row 2 */}
              <div className="py-1.5 px-4 border-b border-dashed border-gray-300 relative">
                {WhyAttendItemsLeft.slice(1, 2).map((item, index) => (
                  <div key={index} className="flex gap-4 group">
                    <div className="w-12 h-12 rounded-full flex items-center justify-center bg-[#f0fdf4] shrink-0 mt-1">
                      {React.cloneElement(item.icon as React.ReactElement, { className: 'w-7 h-7 text-[#1a5d1a]' })}
                    </div>
                    <div className="max-w-[240px]">
                      <h3 className="text-[14px] font-bold text-[#1a5d1a] mb-0.5 leading-none pt-3">{item.title}</h3>
                      <p className="text-[10px] text-gray-700 font-semibold leading-relaxed mt-1">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="py-1.5 px-4 border-b border-dashed border-gray-300 relative">
                {WhyAttendItemsRight.slice(1, 2).map((item, index) => (
                  <div key={index} className="flex gap-4 group">
                    <div className="w-12 h-12 rounded-full flex items-center justify-center bg-[#f0fdf4] shrink-0 mt-1">
                      {React.cloneElement(item.icon as React.ReactElement, { className: 'w-7 h-7 text-[#1a5d1a]' })}
                    </div>
                    <div className="max-w-[240px]">
                      <h3 className="text-[14px] font-bold text-[#1a5d1a] mb-0.5 leading-none pt-3">{item.title}</h3>
                      <p className="text-[10px] text-gray-700 font-semibold leading-relaxed mt-1">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Row 3 */}
              <div className="py-1.5 px-4 relative">
                {WhyAttendItemsLeft.slice(2, 3).map((item, index) => (
                  <div key={index} className="flex gap-4 group">
                    <div className="w-12 h-12 rounded-full flex items-center justify-center bg-[#f0fdf4] shrink-0 mt-1">
                      {React.cloneElement(item.icon as React.ReactElement, { className: 'w-7 h-7 text-[#1a5d1a]' })}
                    </div>
                    <div className="max-w-[240px]">
                      <h3 className="text-[14px] font-bold text-[#1a5d1a] mb-0.5 leading-none pt-3">{item.title}</h3>
                      <p className="text-[10px] text-gray-700 font-semibold leading-relaxed mt-1">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="py-1.5 px-4 relative">
                {WhyAttendItemsRight.slice(2, 3).map((item, index) => (
                  <div key={index} className="flex gap-4 group">
                    <div className="w-12 h-12 rounded-full flex items-center justify-center bg-[#f0fdf4] shrink-0 mt-1">
                      {React.cloneElement(item.icon as React.ReactElement, { className: 'w-7 h-7 text-[#1a5d1a]' })}
                    </div>
                    <div className="max-w-[240px]">
                      <h3 className="text-[14px] font-bold text-[#1a5d1a] mb-0.5 leading-none pt-3">{item.title}</h3>
                      <p className="text-[10px] text-gray-700 font-semibold leading-relaxed mt-1">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* CENTER: CIRCULAR INFOGRAPHIC */}
          <div className="xl:col-span-4 flex justify-center items-center relative py-12">
            <div className="relative w-[380px] h-[380px] aspect-square">

              {/* Image Circle Container */}
              <div className="absolute inset-0 rounded-full border-[10px] border-white shadow-2xl overflow-hidden grid grid-cols-2 grid-rows-2 gap-1 bg-white">
                <div className="overflow-hidden bg-gray-50 border-r border-b border-white"><img src={image1} className="w-full h-full object-cover" alt="1" /></div>
                <div className="overflow-hidden bg-gray-50 border-l border-b border-white"><img src={image2} className="w-full h-full object-cover" alt="2" /></div>
                <div className="overflow-hidden bg-gray-50 border-r border-t border-white"><img src={image3} className="w-full h-full object-cover" alt="3" /></div>
                <div className="overflow-hidden bg-gray-50 border-l border-t border-white"><img src={image4} className="w-full h-full object-cover" alt="4" /></div>
              </div>

              {/* Center Overlay Circle */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-[160px] h-[160px] bg-white rounded-full flex flex-col items-center justify-center text-center shadow-xl p-4 border-[6px] border-white">
                <Users className="w-7 h-7 text-[#2e7d32] mb-1" />
                <p className="text-[13px] font-black text-[#2e7d32] leading-tight">ONE PLATFORM.</p>
                <p className="text-[13px] font-black text-[#1a1a1a] leading-tight uppercase tracking-tight">ENDLESS</p>
                <p className="text-[13px] font-black text-[#1a1a1a] leading-tight uppercase tracking-tight">OPPORTUNITIES.</p>
                <Leaf className="w-3.5 h-3.5 text-[#2e7d32] mt-1" />
              </div>

              {/* Outer Decorative Gradient Ring */}
              <div className="absolute inset-[-7px] pointer-events-none z-0">
                <svg width="394" height="394" viewBox="0 0 394 394" className="w-full h-full overflow-visible">
                  <defs>
                    <linearGradient id="ringGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#d26019" />
                      <stop offset="100%" stopColor="#2e7d32" />
                    </linearGradient>
                  </defs>
                  <circle cx="197" cy="197" r="195.5" fill="none" stroke="url(#ringGradient)" strokeWidth="3" />
                </svg>
              </div>
              
              {/* Dots perfectly centered on the ring */}
              <div className="absolute top-[-7px] left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-[#2e7d32] rounded-full border-[3px] border-white shadow-md z-30" />
              <div className="absolute bottom-[-7px] left-1/2 -translate-x-1/2 translate-y-1/2 w-4 h-4 bg-[#2e7d32] rounded-full border-[3px] border-white shadow-md z-30" />
              <div className="absolute left-[-7px] top-1/2 -translate-y-1/2 -translate-x-1/2 w-4 h-4 bg-[#d26019] rounded-full border-[3px] border-white shadow-md z-30" />
              <div className="absolute right-[-7px] top-1/2 -translate-y-1/2 translate-x-1/2 w-4 h-4 bg-[#2e7d32] rounded-full border-[3px] border-white shadow-md z-30" />
            </div>

            {/* Bottom Floating Info Box */}
            <div className="absolute bottom-[10px] left-0 right-0 flex justify-center">
              <div className="bg-white border border-gray-100 rounded-2xl p-4 shadow-lg flex items-center gap-4 max-w-[380px]">
                <div className="w-10 h-10 bg-green-50 rounded-full flex items-center justify-center shrink-0">
                  <Target className="w-6 h-6 text-[#2e7d32]" />
                </div>
                <p className="text-[11.5px] text-gray-600 font-semibold leading-tight">
                  Connect with thousands of industry professionals, expand your network and take your business to the next level.
                </p>
                <div className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center shrink-0 ml-auto">
                  <Target className="w-6 h-6 text-[#2e7d32]" />
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: WHO SHOULD ATTEND */}
          <div className="xl:col-span-3 relative z-20 -mb-10 mt-3">
            <div className="bg-white border border-gray-300 rounded-[1.1rem] overflow-hidden shadow-xl">
              <div className="bg-[#0b2912] text-white p-3 flex items-center justify-between shadow-md">
                <div className="flex items-center gap-3">
                  <Users className="w-5 h-5 text-white" />
                  <span className="text-[13.5px] font-black uppercase tracking-wider">WHO SHOULD ATTEND?</span>
                </div>
                <div className="grid grid-cols-3 gap-1 opacity-40">
                  {[...Array(9)].map((_, i) => <div key={i} className="w-0.5 h-0.5 bg-white rounded-full" />)}
                </div>
              </div>

              <div className="px-4 py-0.5">
                {WhoShouldAttendItems.map((item, index) => (
                  <div key={index} className="flex items-center gap-4 py-[2px] border-b border-gray-100 last:border-0 group cursor-default">
                    <div className="w-7 h-7 rounded-lg bg-[#f0f9f1] flex items-center justify-center text-[#2e7d32] group-hover:bg-[#2e7d32] group-hover:text-white transition-all duration-300 border border-gray-100 shrink-0">
                      {React.cloneElement(item.icon as React.ReactElement, { className: 'w-4 h-4' })}
                    </div>
                    <span className="text-[11px] text-gray-700 font-bold group-hover:text-[#2e7d32] transition-colors">{item.label}</span>
                  </div>
                ))}
              </div>

              {/* Bottom Right CTA Card */}
              <div className="p-2 bg-[#f0f9f1] border-t border-gray-100 flex items-center gap-3">
                <div className="w-7 h-7 bg-[#0b2912] rounded-full flex items-center justify-center shrink-0 shadow-sm">
                  <Star className="w-3.5 h-3.5 text-white" />
                </div>
                <p className="text-[10.5px] text-[#0b2912] font-black leading-tight">
                  Whether you're sourcing, learning or networking — this is the place to be!
                </p>
              </div>
            </div>
          </div>

        </div>
      </SectionContainer>
    </section>
  );
};

export default AttendanceInfo;