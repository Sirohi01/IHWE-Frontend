<<<<<<< HEAD
import { useState, useEffect } from "react";
=======
import React, { useState } from "react";
>>>>>>> invoicechanges
import { motion, AnimatePresence } from "framer-motion";
import pop1 from "../../assets/pop1.png";
import leaf2 from "../../assets/leaf2.png";
import why1 from "../../assets/why1.png";
import t1 from "../../assets/t1.png";
import t2 from "../../assets/t2.png";
import t3 from "../../assets/t3.png";
import t4 from "../../assets/t4.png";
import t5 from "../../assets/t5.png";


const Sparkle = ({ style, color = '#fff176' }: { style?: React.CSSProperties, color?: string }) => (
  <span
    style={{
      position: 'absolute',
      pointerEvents: 'none',
      fontSize: '12px',
      color: color,
      textShadow: `0 0 6px ${color}, 0 0 12px ${color}`,
      animation: 'sparkleAnim 1.6s ease-in-out infinite',
      opacity: 0,
      zIndex: 20,
      ...style,
    }}
  >
    ✦
  </span>
);

const serviceOptions = [
  {
    id: "hotel", label: "Hotel Booking",
    icon: <svg viewBox="0 0 40 40" fill="none" className="w-6 h-6" stroke="#2d6a2d" strokeWidth="1.6"><rect x="6" y="14" width="28" height="22" rx="2" /><path d="M12 36V28h6v8M22 28h6v8M6 22h28M14 14V10a6 6 0 0112 0v4" /><rect x="16" y="20" width="8" height="5" rx="1" /></svg>
  },
  {
    id: "travel", label: "Travel Assistance",
    icon: <svg viewBox="0 0 40 40" fill="none" className="w-6 h-6" stroke="#2d6a2d" strokeWidth="1.6"><path d="M8 30l4-14 4 7 6-12 4 8 5-7 4 7" strokeLinejoin="round" /><ellipse cx="20" cy="22" rx="11" ry="5" /></svg>
  },
  {
    id: "stall", label: "Stall Design & Fabrication",
    icon: <svg viewBox="0 0 40 40" fill="none" className="w-6 h-6" stroke="#2d6a2d" strokeWidth="1.6"><rect x="6" y="16" width="28" height="20" rx="1" /><path d="M6 16l4-8h20l4 8M14 36V26h12v10" /><path d="M10 20h4v6h-4zM26 20h4v6h-4z" /></svg>
  },
  {
    id: "logistics", label: "Logistics Support",
    icon: <svg viewBox="0 0 40 40" fill="none" className="w-6 h-6" stroke="#2d6a2d" strokeWidth="1.6"><rect x="4" y="14" width="22" height="16" rx="2" /><path d="M26 20h6l4 6v4h-10V20z" /><circle cx="11" cy="32" r="3" /><circle cx="29" cy="32" r="3" /><path d="M4 22h22" /></svg>
  },
  {
    id: "printing", label: "Printing & Branding",
    icon: <svg viewBox="0 0 40 40" fill="none" className="w-6 h-6" stroke="#2d6a2d" strokeWidth="1.6"><rect x="8" y="6" width="24" height="16" rx="2" /><path d="M12 22v12h16V22M8 14h24M16 28h8M16 32h6" /><circle cx="12" cy="17" r="1.5" fill="#2d6a2d" /></svg>
  },
  {
    id: "hospitality", label: "Hospitality Services",
    icon: <svg viewBox="0 0 40 40" fill="none" className="w-6 h-6" stroke="#2d6a2d" strokeWidth="1.6"><path d="M10 28a10 6 0 0020 0" /><path d="M8 28h24M20 10v6M14 16a6 4 0 0012 0" /><circle cx="20" cy="8" r="2" /><path d="M16 34h8" /></svg>
  },
];

const whyChoose = [
  {
    id: 1, title: "Verified & Trusted", desc: "All partners are verified and experienced",
    icon: <img src={t1} alt="verified" className="w-[34px] h-[34px] object-contain" />
  },
  {
    id: 2, title: "Best Pricing", desc: "Competitive rates and best value",
    icon: <img src={t2} alt="pricing" className="w-[34px] h-[34px] object-contain" />
  },
  {
    id: 3, title: "Faster Coordination", desc: "Quick response and smooth execution",
    icon: <img src={t3} alt="coordination" className="w-[34px] h-[34px] object-contain" />
  },
  {
    id: 4, title: "Expo-Specific Support", desc: "Solutions tailored for IHWE exhibitors",
    icon: <img src={t4} alt="support" className="w-[34px] h-[34px] object-contain" />
  },
  {
    id: 5, title: "Trusted Network", desc: "Backed by IHWE's reliable partner network",
    icon: <img src={t5} alt="network" className="w-[34px] h-[34px] object-contain" />
  },
];

<<<<<<< HEAD
export default function PartnershipPopup({ isOpen, onClose, initialService }) {
=======
interface PartnershipPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function PartnershipPopup({ isOpen, onClose }: PartnershipPopupProps) {
>>>>>>> invoicechanges
  const [formData, setFormData] = useState({ fullName: "", companyName: "", mobile: "", email: "", stallSize: "", message: "" });
  const [selectedServices, setSelectedServices] = useState([]);
  const [charCount, setCharCount] = useState(0);

  // Initialize selected services when initialService changes
  useEffect(() => {
    if (initialService) {
      setSelectedServices([initialService]);
    } else {
      setSelectedServices([]);
    }
  }, [initialService, isOpen]);

  const toggleService = (id) => setSelectedServices(p => p.includes(id) ? p.filter(s => s !== id) : [...p, id]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "message") setCharCount(value.length);
    setFormData(p => ({ ...p, [name]: value }));
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[999] flex items-center justify-center bg-black/70 backdrop-blur-md p-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          {/* ── Inject keyframe animations ── */}
          <style>{`
            @keyframes goldShift {
              0%   { background-position: 0% 50%; }
              50%  { background-position: 100% 50%; }
              100% { background-position: 0% 50%; }
            }
            @keyframes shimmer {
              0%   { left: -75%; }
              100% { left: 150%; }
            }
            @keyframes sparkleAnim {
              0%   { opacity: 0; transform: scale(0.5) translateY(0); }
              40%  { opacity: 1; transform: scale(1.2) translateY(-4px); }
              80%  { opacity: 0.6; transform: scale(0.9) translateY(-6px); }
              100% { opacity: 0; transform: scale(0.5) translateY(-8px); }
            }
            .blue-btn-pp {
              background: linear-gradient(135deg, #2FA4D7 0%, #4db8e6 30%, #1c88bc 60%, #2FA4D7 100%);
              background-size: 200% 200%;
              animation: goldShift 2.5s ease infinite;
              box-shadow: 0 0 16px 4px rgba(47, 164, 215, 0.3), 0 4px 15px rgba(47, 164, 215, 0.25);
              position: relative;
              overflow: hidden;
            }
            .blue-btn-pp::before {
              content: '';
              position: absolute;
              top: -50%;
              left: -75%;
              width: 50%;
              height: 200%;
              background: linear-gradient(to right, transparent, rgba(255,255,255,0.4), transparent);
              transform: skewX(-20deg);
              animation: shimmer 2s infinite;
            }
            .green-btn-pp {
              background: linear-gradient(135deg, #084c17 0%, #1a682d 30%, #063c12 60%, #084c17 100%);
              background-size: 200% 200%;
              animation: goldShift 2.5s ease infinite;
              box-shadow: 0 0 16px 4px rgba(8, 76, 23, 0.3), 0 4px 15px rgba(8, 76, 23, 0.25);
              position: relative;
              overflow: hidden;
            }
            .green-btn-pp::before {
              content: '';
              position: absolute;
              top: -50%;
              left: -75%;
              width: 50%;
              height: 200%;
              background: linear-gradient(to right, transparent, rgba(255,255,255,0.4), transparent);
              transform: skewX(-20deg);
              animation: shimmer 2s infinite;
            }
          `}</style>

          {/* Popup Content Container with GSAP-style advanced animation */}
          <motion.div
<<<<<<< HEAD
            className="relative bg-white rounded-3xl shadow-2xl overflow-hidden flex mt-6"
            style={{ width: '100%', maxWidth: 720, height: 'auto', maxHeight: 'min(94vh, 850px)' }}
            initial={{ 
              opacity: 0, 
              scale: 0.85, 
              rotateX: 15, 
=======
            className="relative bg-white rounded-[2.5rem] shadow-2xl overflow-hidden flex mt-6"
            style={{ width: '100%', maxWidth: 800, height: 'auto', maxHeight: 'min(94vh, 820px)' }}
            initial={{
              opacity: 0,
              scale: 0.85,
              rotateX: 15,
>>>>>>> invoicechanges
              y: 60,
              perspective: 1000
            }}
            animate={{
              opacity: 1,
              scale: 1,
              rotateX: 0,
              y: 0
            }}
            exit={{
              opacity: 0,
              scale: 0.9,
              y: 40,
              rotateX: -10,
              transition: { duration: 0.3, ease: "easeInOut" }
            }}
            transition={{
              type: "spring",
              damping: 18,
              stiffness: 100,
              mass: 1,
              duration: 0.6
            }}
          >
            {/* Close */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-50 w-8 h-8 bg-black/10 hover:bg-red-600 text-black hover:text-white rounded-full flex items-center justify-center transition-all shadow-sm backdrop-blur-sm"
            >
              <svg viewBox="0 0 20 20" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M4 4l12 12M16 4L4 16" strokeLinecap="round" /></svg>
            </button>

            {/* ── LEFT PANEL ── */}
            <div className="flex-1 flex flex-col p-6 overflow-hidden">

              {/* Header */}
<<<<<<< HEAD
              <motion.div 
                className="flex items-center gap-3 mb-5 flex-shrink-0"
=======
              <motion.div
                className="flex items-center gap-4 mb-6 flex-shrink-0"
>>>>>>> invoicechanges
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center border-2 border-[#2d6a2d] p-1 shadow-sm flex-shrink-0">
                  <img src={pop1} alt="Support" className="w-full h-full object-contain" />
                </div>
                <div>
                  <h2 className="text-[19px] font-bold text-gray-900 leading-tight tracking-tight">Request Expo Support</h2>
                  <p className="text-gray-800 text-[11px] leading-tight">
                    Share requirements and we'll connect you with the <span className="text-[#2d6a2d] font-semibold">right partner.</span>
                  </p>
                </div>
              </motion.div>

              {/* Form Fields Section */}
              <motion.div
                className="space-y-5 flex-shrink-0"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                {/* Name + Company */}
                <div className="grid grid-cols-2 gap-4 px-1">
                  <div>
<<<<<<< HEAD
                    <label className="text-[9.5px] font-bold text-black uppercase tracking-wide block mb-1">Full Name *</label>
                    <div className="relative">
                      <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400"><svg viewBox="0 0 20 20" className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="10" cy="6" r="3"/><path d="M3 18a7 7 0 0114 0" strokeLinecap="round"/></svg></span>
                      <input type="text" name="fullName" placeholder="Full Name" value={formData.fullName} onChange={handleChange} className="w-full pl-7 pr-3 py-2 border border-gray-200 rounded-lg text-[11.5px] bg-gray-50/50 focus:outline-none focus:border-[#2d6a2d] focus:bg-white transition-all"/>
                    </div>
                  </div>
                  <div>
                    <label className="text-[9.5px] font-bold text-black uppercase tracking-wide block mb-1">Company Name *</label>
                    <div className="relative">
                      <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400"><svg viewBox="0 0 20 20" className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="6" width="16" height="12" rx="1"/><path d="M6 6V4a4 4 0 018 0v2" strokeLinecap="round"/></svg></span>
                      <input type="text" name="companyName" placeholder="Company Name" value={formData.companyName} onChange={handleChange} className="w-full pl-7 pr-3 py-2 border border-gray-200 rounded-lg text-[11.5px] bg-gray-50/50 focus:outline-none focus:border-[#2d6a2d] focus:bg-white transition-all"/>
=======
                    <label className="text-[10px] font-bold text-black uppercase tracking-wide block mb-1">Full Name *</label>
                    <div className="relative max-w-[280px]">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"><svg viewBox="0 0 20 20" className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="10" cy="6" r="3" /><path d="M3 18a7 7 0 0114 0" strokeLinecap="round" /></svg></span>
                      <input type="text" name="fullName" placeholder="Full Name" value={formData.fullName} onChange={handleChange} className="w-full pl-8 pr-3 py-2.5 border border-gray-200 rounded-xl text-sm bg-gray-50/50 focus:outline-none focus:border-[#2d6a2d] focus:bg-white transition-all" />
                    </div>
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-black uppercase tracking-wide block mb-1">Company Name *</label>
                    <div className="relative max-w-[280px]">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"><svg viewBox="0 0 20 20" className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="6" width="16" height="12" rx="1" /><path d="M6 6V4a4 4 0 018 0v2" strokeLinecap="round" /></svg></span>
                      <input type="text" name="companyName" placeholder="Company Name" value={formData.companyName} onChange={handleChange} className="w-full pl-8 pr-3 py-2.5 border border-gray-200 rounded-xl text-sm bg-gray-50/50 focus:outline-none focus:border-[#2d6a2d] focus:bg-white transition-all" />
>>>>>>> invoicechanges
                    </div>
                  </div>
                </div>

                {/* Mobile + Email */}
                <div className="grid grid-cols-2 gap-4 px-1">
                  <div>
<<<<<<< HEAD
                    <label className="text-[9.5px] font-bold text-black uppercase tracking-wide block mb-1">Mobile Number *</label>
                    <div className="relative">
                      <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400"><svg viewBox="0 0 20 20" className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="5" y="2" width="10" height="16" rx="2"/><circle cx="10" cy="15" r="0.7" fill="currentColor"/></svg></span>
                      <input type="tel" name="mobile" placeholder="Mobile Number" value={formData.mobile} onChange={handleChange} className="w-full pl-7 pr-3 py-2 border border-gray-200 rounded-lg text-[11.5px] bg-gray-50/50 focus:outline-none focus:border-[#2d6a2d] focus:bg-white transition-all"/>
                    </div>
                  </div>
                  <div>
                    <label className="text-[9.5px] font-bold text-black uppercase tracking-wide block mb-1">Email Address *</label>
                    <div className="relative">
                      <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400"><svg viewBox="0 0 20 20" className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="5" width="16" height="11" rx="2"/><path d="M2 7l8 5 8-5" strokeLinecap="round"/></svg></span>
                      <input type="email" name="email" placeholder="Email Address" value={formData.email} onChange={handleChange} className="w-full pl-7 pr-3 py-2 border border-gray-200 rounded-lg text-[11.5px] bg-gray-50/50 focus:outline-none focus:border-[#2d6a2d] focus:bg-white transition-all"/>
=======
                    <label className="text-[10px] font-bold text-black uppercase tracking-wide block mb-1">Mobile Number *</label>
                    <div className="relative max-w-[280px]">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"><svg viewBox="0 0 20 20" className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="5" y="2" width="10" height="16" rx="2" /><circle cx="10" cy="15" r="0.7" fill="currentColor" /></svg></span>
                      <input type="tel" name="mobile" placeholder="Mobile Number" value={formData.mobile} onChange={handleChange} className="w-full pl-8 pr-3 py-2.5 border border-gray-200 rounded-xl text-sm bg-gray-50/50 focus:outline-none focus:border-[#2d6a2d] focus:bg-white transition-all" />
                    </div>
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-black uppercase tracking-wide block mb-1">Email Address *</label>
                    <div className="relative max-w-[280px]">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"><svg viewBox="0 0 20 20" className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="5" width="16" height="11" rx="2" /><path d="M2 7l8 5 8-5" strokeLinecap="round" /></svg></span>
                      <input type="email" name="email" placeholder="Email Address" value={formData.email} onChange={handleChange} className="w-full pl-8 pr-3 py-2.5 border border-gray-200 rounded-xl text-sm bg-gray-50/50 focus:outline-none focus:border-[#2d6a2d] focus:bg-white transition-all" />
>>>>>>> invoicechanges
                    </div>
                  </div>
                </div>

                {/* Services Selection */}
                <div className="px-2">
                  <label className="text-[10px] font-bold text-black uppercase tracking-wide block mb-2">Select Required Service(s) *</label>
                  <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                    {serviceOptions.map(s => {
                      const checked = selectedServices.includes(s.id);
                      return (
                        <button key={s.id} type="button" onClick={() => toggleService(s.id)}
                          className={`relative border-2 rounded-lg pt-2 pb-1.5 px-1.5 flex flex-col items-center gap-1 transition-all cursor-pointer
                            ${checked ? "border-[#2d6a2d] bg-[#f0f7ee]" : "border-gray-200 bg-white hover:border-[#a5d6a7]"}`}>
                          <div className={`absolute top-1 right-1 w-3.5 h-3.5 border-2 rounded flex items-center justify-center
                            ${checked ? "border-[#2d6a2d] bg-[#2d6a2d]" : "border-gray-300 bg-white"}`}>
                            {checked && <svg viewBox="0 0 10 10" className="w-2 h-2" fill="none" stroke="white" strokeWidth="2.5"><path d="M2 5l2.5 2.5L8 3" strokeLinecap="round" strokeLinejoin="round" /></svg>}
                          </div>
                          {s.icon}
                          <span className="text-[9.5px] font-semibold text-gray-700 leading-tight text-center">{s.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

<<<<<<< HEAD
                {/* Message Field */}
                <div className="px-2">
                  <label className="text-[10px] font-bold text-black uppercase tracking-wide block mb-1">Message <span className="normal-case font-normal">(Optional)</span></label>
                  <div className="relative w-full">
                    <textarea 
                      name="message" 
                      placeholder="Share your specific requirements or queries here..." 
                      value={formData.message} 
                      onChange={handleChange} 
                      maxLength={300} 
                      rows={2}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm bg-gray-50/50 focus:outline-none focus:border-[#2d6a2d] focus:bg-white transition-all resize-none"
                    />
                    <span className="absolute bottom-2 right-3 text-[8.5px] text-gray-400">{charCount}/300</span>
=======
                {/* Stall Size + Message */}
                <div className="grid grid-cols-2 gap-5 px-2">
                  <div>
                    <label className="text-[10px] font-bold text-black uppercase tracking-wide block mb-1">Stall Size / Requirement</label>
                    <div className="relative max-w-[280px]">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"><svg viewBox="0 0 20 20" className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 17L7 13M17 3l-4 4M3 3l4 4M17 17l-4-4M3 3h4M3 3v4M17 17h-4M17 17v-4" strokeLinecap="round" /></svg></span>
                      <input type="text" name="stallSize" placeholder="Stall size" value={formData.stallSize} onChange={handleChange} className="w-full pl-8 pr-3 py-2.5 border border-gray-200 rounded-xl text-sm bg-gray-50/50 focus:outline-none focus:border-[#2d6a2d] focus:bg-white transition-all" />
                    </div>
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-black uppercase tracking-wide block mb-1">Message <span className="normal-case font-normal">(Optional)</span></label>
                    <div className="relative max-w-[280px]">
                      <textarea name="message" placeholder="Message..." value={formData.message} onChange={handleChange} maxLength={300} rows={1}
                        className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm bg-gray-50/50 focus:outline-none focus:border-[#2d6a2d] focus:bg-white transition-all resize-none" />
                      <span className="absolute bottom-1 right-2 text-[8.5px] text-gray-400">{charCount}/300</span>
                    </div>
>>>>>>> invoicechanges
                  </div>
                </div>
              </motion.div>

              {/* Action Buttons */}
<<<<<<< HEAD
              <motion.div 
                className="flex flex-wrap gap-2.5 mt-8 mb-4 px-2 flex-shrink-0"
=======
              <motion.div
                className="flex gap-3 mt-8 mb-4 px-2 flex-shrink-0"
>>>>>>> invoicechanges
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                {/* Submit */}
                <div className="relative group/btn flex-1 min-w-[140px]">
                  <Sparkle style={{ top: '-10px', left: '10%', animationDelay: '0.1s' }} />
                  <Sparkle style={{ top: '-8px', right: '15%', animationDelay: '0.9s' }} />
                  <Sparkle style={{ bottom: '-10px', left: '25%', animationDelay: '0.3s' }} />

<<<<<<< HEAD
                  <button type="button" className="blue-btn-pp w-full text-white font-black text-[9.5px] tracking-widest uppercase py-2.5 rounded-lg flex items-center justify-center gap-1.5 transition-all hover:scale-[1.02] shadow-lg">
                    SUBMIT
                    <svg viewBox="0 0 20 20" className="w-3 h-3" fill="none" stroke="white" strokeWidth="2.5"><path d="M4 10h12M10 4l6 6-6 6" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </button>
                </div>

                {/* WhatsApp */}
                <button type="button" className="flex-1 min-w-[120px] border-2 border-[#2d6a2d] text-[#2d6a2d] hover:bg-[#f0f7ee] font-black text-[9.5px] tracking-widest uppercase py-2.5 rounded-lg flex items-center justify-center gap-1.5 transition-all hover:scale-[1.02]">
                  <svg viewBox="0 0 20 20" className="w-3.5 h-3.5" fill="#2d6a2d"><path d="M10 2C5.58 2 2 5.36 2 9.5c0 1.74.6 3.35 1.6 4.64L2 18l4.07-1.56C7.24 17.46 8.58 18 10 18c4.42 0 8-3.36 8-7.5S14.42 2 10 2z"/></svg>
=======
                  <button type="button" className="blue-btn-pp w-full text-white font-black text-[11px] tracking-widest uppercase py-3 rounded-xl flex items-center justify-center gap-2 transition-all hover:scale-[1.02] shadow-lg">
                    SUBMIT REQUIREMENT
                    <svg viewBox="0 0 20 20" className="w-3.5 h-3.5" fill="none" stroke="white" strokeWidth="2.5"><path d="M4 10h12M10 4l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </button>
                </div>
                <button type="button" className="flex-1 border-2 border-[#2d6a2d] text-[#2d6a2d] hover:bg-[#f0f7ee] font-black text-[11px] tracking-widest uppercase py-3 rounded-xl flex items-center justify-center gap-2 transition-all hover:scale-[1.02]">
                  <svg viewBox="0 0 20 20" className="w-4 h-4" fill="#2d6a2d"><path d="M10 2C5.58 2 2 5.36 2 9.5c0 1.74.6 3.35 1.6 4.64L2 18l4.07-1.56C7.24 17.46 8.58 18 10 18c4.42 0 8-3.36 8-7.5S14.42 2 10 2z" /></svg>
>>>>>>> invoicechanges
                  WHATSAPP
                </button>

                {/* Call Us */}
                <div className="relative group/btn flex-1 min-w-[120px]">
                  <Sparkle color="#a2d149" style={{ top: '-8px', left: '15%', animationDelay: '0.2s' }} />
                  <Sparkle color="#a2d149" style={{ bottom: '-8px', right: '10%', animationDelay: '0.6s' }} />
                  <a href="tel:+911149588555" className="w-full">
                    <button type="button" className="green-btn-pp w-full text-white font-black text-[9.5px] tracking-widest uppercase py-2.5 rounded-lg flex items-center justify-center gap-1.5 transition-all hover:scale-[1.02] shadow-lg">
                      <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="currentColor"><path d="M20 15.5c-1.25 0-2.45-.2-3.57-.57a1.02 1.02 0 00-1.02.24l-2.2 2.2a15.05 15.05 0 01-6.59-6.59l2.2-2.2a1 1 0 00.25-1.02A11.36 11.36 0 018.5 4c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1 0 9.39 7.61 17 17 17 .55 0 1-.45 1-1v-3.5c0-.55-.45-1-1-1z"/></svg>
                      QUICK CALL
                    </button>
                  </a>
                </div>
              </motion.div>

              {/* Privacy Disclaimer */}
              <div className="flex items-center justify-center gap-2 text-gray-800 text-[9px] flex-shrink-0 mt-auto opacity-70">
                <svg viewBox="0 0 16 16" className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="7" width="10" height="8" rx="1" /><path d="M5 7V5a3 3 0 016 0v2" /></svg>
                Your information is safe. We never share your details.
              </div>
            </div>

            {/* ── RIGHT PANEL ── */}
            <div className="w-56 bg-[#f5f9f4] border-l border-gray-100 flex flex-col p-5 relative flex-shrink-0 overflow-hidden">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6, type: "spring" }}
              >
                {/* Header Image */}
                <div className="flex justify-center mb-3">
                  <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-md border-2 border-[#2d6a2d] p-0.5 relative">
                    <img src={why1} alt="Why IHWE" className="w-full h-full object-contain" />
                  </div>
                </div>

                {/* Title */}
<<<<<<< HEAD
                <div className="text-left mb-4 px-1">
                  <p className="text-black text-[11px] font-medium uppercase tracking-wider leading-tight">Why Choose</p>
                  <h3 className="text-[15px] font-extrabold text-[#2d6a2d] leading-tight">IHWE Partners?</h3>
                  <div className="w-6 h-0.5 bg-[#2d6a2d] mt-1 rounded-full"/>
=======
                <div className="text-left mb-6 px-1">
                  <p className="text-black text-[13px] font-medium uppercase tracking-wider">Why Choose</p>
                  <h3 className="text-[17px] font-extrabold text-[#2d6a2d]">IHWE Partners?</h3>
                  <div className="w-8 h-0.5 bg-[#2d6a2d] mt-1.5 rounded-full" />
>>>>>>> invoicechanges
                </div>
              </motion.div>

              {/* Items List */}
              <div className="relative z-10 space-y-0.5 flex-1">
                {whyChoose.map((item, i) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.7 + i * 0.1 }}
                  >
                    <div className="flex items-start gap-2.5 py-2.5">
                      <div className="w-9 h-9 bg-white rounded-full flex items-center justify-center flex-shrink-0 shadow-sm border border-[#e8f5e9]">
                        {item.icon}
                      </div>
                      <div>
                        <p className="text-[11.5px] font-bold text-gray-900 leading-tight">{item.title}</p>
                        <p className="text-[9.5px] text-gray-900 leading-snug">{item.desc}</p>
                      </div>
                    </div>
                    {i < whyChoose.length - 1 && <div className="h-px bg-gray-300/50" />}
                  </motion.div>
                ))}
              </div>

              {/* Branded Leaf Decoration */}
              <motion.div
                className="absolute -bottom-8 -right-8 w-56 h-56 pointer-events-none transform -rotate-12"
                initial={{ opacity: 0, scale: 0.5, rotate: -30 }}
                animate={{ opacity: 1, scale: 1, rotate: -12 }}
                transition={{ delay: 1.2, duration: 1 }}
              >
                <img src={leaf2} alt="decoration" className="w-full h-full object-contain" />
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}