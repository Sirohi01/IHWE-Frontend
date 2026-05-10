import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import {
  X, Calendar, MapPin, Store, Users,
  UserPlus, Globe, Award, MessageCircle, Phone,
  ShieldCheck, Clock, Stethoscope, Landmark, Leaf,
  Building2, ChevronRight, Star, BadgeCheck, ArrowLeft, Send, CheckCircle2
} from "lucide-react";
import { useLocation } from "react-router-dom";
import { settingsApi, socialMediaApi, SERVER_URL, brochureLeadApi } from "@/lib/api";
import { toast } from "sonner";
import BrochurePopUp from "./BrochurePopUp";

const participationCards = [
  {
    id: "exhibitor",
    title: "BOOK A STALL",
    desc: "Exhibit your products & grow your business",
    icon: <Store size={20} />,
    color: "border-emerald-200 bg-white",
    iconBg: "bg-emerald-50 text-emerald-600",
    arrowBg: "bg-emerald-600",
    link: "/book-a-stand"
  },

    {
    id: "visitor",
    title: "REGISTER AS VISITOR",
    desc: "Explore innovations & industry trends",
    icon: <UserPlus size={20} />,
    color: "border-purple-200 bg-white",
    iconBg: "bg-purple-50 text-purple-600",
    arrowBg: "bg-purple-600",
    link: "/visitor-registration"
  },

  {
    id: "delegate",
    title: "DELEGATE REGISTRATION",
    desc: "Exclusive benefits for global delegates",
    icon: <Globe size={20} />,
    color: "border-orange-200 bg-white",
    iconBg: "bg-orange-50 text-orange-600",
    arrowBg: "bg-orange-500",
    link: "/conference"
  },
  

  {
    id: "buyer",
    title: "REGISTER AS BUYER",
    desc: "Connect with top suppliers & close better deals",
    icon: <Users size={20} />,
    color: "border-blue-200 bg-white",
    iconBg: "bg-blue-50 text-blue-600",
    arrowBg: "bg-blue-600",
    link: "/buyer-registration"
  },


  {
    id: "sponsor",
    title: "SPONSORSHIP OPPORTUNITIES",
    desc: "Maximize brand visibility & get premium exposure",
    icon: <Award size={20} />,
    color: "border-amber-200 bg-white",
    iconBg: "bg-amber-50 text-amber-600",
    arrowBg: "bg-amber-500",
    link: "coming-soon"
  },
  {
    id: "whatsapp",
    title: "TALK TO EXPO ADVISOR",
    desc: "Get Instant assistance on Call",
    icon: <Phone size={20} />,
    color: "border-teal-200 bg-white",
    iconBg: "bg-teal-50 text-teal-600",
    arrowBg: "bg-teal-600",
    link: "tel:+919654900525"
  }
];

const trustedItems = [
  { icon: <Stethoscope size={14} />, label: "HEALTHCARE", label2: "LEADERS", color: "bg-emerald-50 text-emerald-600" },
  { icon: <Landmark size={14} />, label: "GOVERNMENT", label2: "BODIES", color: "bg-blue-50 text-blue-600" },
  { icon: <Leaf size={14} />, label: "AYUSH", label2: "INDUSTRY", color: "bg-green-50 text-green-600" },
  { icon: <Globe size={14} />, label: "INTERNATIONAL", label2: "BUYERS", color: "bg-indigo-50 text-indigo-600" },
  { icon: <Building2 size={14} />, label: "HOSPITAL & CLINIC", label2: "PROCUREMENT TEAMS", color: "bg-red-50 text-red-600" },
  { icon: <Globe size={14} />, label: "UNIVERSITY/", label2: "ACADEMIC PARTNERS", color: "bg-amber-50 text-amber-600" },
];

const overlayVariants: Variants = {
  hidden: { opacity: 0, backdropFilter: "blur(0px)" },
  visible: { opacity: 1, backdropFilter: "blur(4px)" },
  exit: { opacity: 0, backdropFilter: "blur(0px)" }
};

const modalVariants: Variants = {
  hidden: { scale: 0.4, opacity: 0, rotateY: 25, y: 100, filter: "blur(20px)" },
  visible: {
    scale: 1, opacity: 1, rotateY: 0, y: 0, filter: "blur(0px)",
    transition: { type: "spring" as const, damping: 25, stiffness: 200, mass: 1, delayChildren: 0.3, staggerChildren: 0.1 }
  },
  exit: {
    scale: 0.8, opacity: 0, rotateY: -15, y: 50, filter: "blur(10px)",
    transition: { duration: 0.3, ease: "easeInOut" }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { type: "spring" as const, damping: 20, stiffness: 300 } }
};

const BrochureDownloadPopup: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [logoUrl, setLogoUrl] = useState("");
  const [whatsappUrl, setWhatsappUrl] = useState("https://wa.me/919654900525");
  const [showForm, setShowForm] = useState(false);
  const [formType, setFormType] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "" });
  const [showSecondModal, setShowSecondModal] = useState(false);
  const [showPopUpConfig, setShowPopUpConfig] = useState(true);
  const [popUpDelayConfig, setPopUpDelayConfig] = useState(7);
  const location = useLocation();

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const settings = await settingsApi.get();
        if (settings?.logo) setLogoUrl(`${SERVER_URL}${settings.logo}`);
        if (settings?.showBrochurePopUp !== undefined) setShowPopUpConfig(settings.showBrochurePopUp);
        if (settings?.brochurePopUpDelay !== undefined) setPopUpDelayConfig(settings.brochurePopUpDelay);

        const social = await socialMediaApi.get();
        if (social?.whatsappNumber) {
          const msg = encodeURIComponent(social.whatsappMessage || "Hello! I would like to know more about IHWE 2026.");
          setWhatsappUrl(`https://wa.me/${social.whatsappNumber}?text=${msg}`);
        }
      } catch (error) { }
    };
    fetchSettings();
  }, []);

  useEffect(() => {
    if (location.pathname === "/" || location.pathname === "/home") {
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 500);
      return () => clearTimeout(timer);
    } else {
      setIsOpen(false);
    }
  }, [location.pathname]);

  const handleClose = () => {
    setIsOpen(false);
    // After first modal closes, check if second modal is enabled and use configured delay
    if (showPopUpConfig) {
      setTimeout(() => {
        setShowSecondModal(true);
        setShowForm(false);
        setIsSubmitted(false);
        setFormData({ name: "", email: "", phone: "" });
      }, popUpDelayConfig * 1000); 
    }
  };

  const handleAction = (card: any) => {
    if (card.link === "coming-soon") {
      setFormType(card.title);
      setShowForm(true);
      return;
    }
    const link = card.link;
    if (link.startsWith("http") || link.startsWith("tel:") || link.startsWith("mailto:")) {
      window.location.href = link;
    } else {
      window.location.href = link;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await brochureLeadApi.submit({
        ...formData,
        source: `Popup_${formType.replace(/\s+/g, '_')}`
      });
      setIsSubmitted(true);
      toast.success("Interest Registered Successfully!");
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // ✅ FIX: "REGISTRATION" word ko formType se remove karo taaki duplicate na aaye
  const getFormDisplayTitle = (type: string) => {
    return type.replace(/\bREGISTRATION\b/gi, "").trim();
  };

  return (
    <>
      <AnimatePresence>
      {isOpen && (
        <motion.div
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="fixed inset-0 z-[10000] flex items-center justify-center p-3 sm:p-4 bg-black/75 overflow-y-auto"
        >
          <motion.div
            variants={modalVariants}
            className="relative w-full max-w-[660px] bg-white rounded-2xl overflow-hidden shadow-[0_30px_90px_rgba(0,0,0,0.4)] my-auto border border-white/20"
            style={{ perspective: "1200px", transformStyle: "preserve-3d" }}
          >
            <motion.button
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleClose}
              className="absolute top-3 right-3 z-[110] w-7 h-7 bg-black text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors shadow-lg"
            >
              <X size={14} />
            </motion.button>

            <div className="flex flex-col md:flex-row">
              <div className="w-full md:w-[40%] bg-white flex border-r border-slate-100">
                <div className="w-[30%] h-full min-h-[320px] relative shrink-0">
                  <motion.img
                    initial={{ scale: 1.2, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                    src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=300"
                    alt="Doctor"
                    className="absolute top-0 left-0 w-full h-[38%] object-cover"
                    style={{ clipPath: "polygon(0 0, 100% 0, 100% 88%, 0% 100%)" }}
                  />
                  <motion.img
                    initial={{ scale: 1.2, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.6, duration: 0.8 }}
                    src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=300"
                    alt="Yoga"
                    className="absolute top-[34%] left-0 w-full h-[36%] object-cover"
                    style={{ clipPath: "polygon(0 12%, 100% 0, 100% 88%, 0% 100%)" }}
                  />
                  <motion.img
                    initial={{ scale: 1.2, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.7, duration: 0.8 }}
                    src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=300"
                    alt="Building"
                    className="absolute bottom-0 left-0 w-full h-[32%] object-cover"
                    style={{ clipPath: "polygon(0 12%, 100% 0, 100% 100%, 0% 100%)" }}
                  />
                </div>

                <div className="flex-1 p-4 md:p-5 flex flex-col justify-center text-left">
                  <motion.div variants={itemVariants}>
                    <img src={logoUrl || "/logo.png"} alt="Logo" className="object-contain" />
                  </motion.div>

                  <div className="space-y-0.5 mb-4">
                    <motion.p variants={itemVariants} className="text-slate-500 text-[9px] font-bold uppercase tracking-wider">Welcome to</motion.p>
                    <motion.h2 variants={itemVariants} className="text-[17px] font-extrabold text-[#134698] leading-[1.1] tracking-tight">
                      INTERNATIONAL <br />
                      HEALTH & WELLNESS <br />
                      <span className="text-emerald-600">EXPO 2026</span>
                    </motion.h2>
                  </div>

                  <motion.p variants={itemVariants} className="text-slate-500 text-[8.5px] font-semibold mb-5 leading-tight max-w-[160px] uppercase">
                    India's Leading Global Healthcare, Wellness & Medical Trade Platform
                  </motion.p>

                  <div className="space-y-3">
                    <motion.div variants={itemVariants} className="flex items-center gap-2.5">
                      <div className="bg-emerald-50 p-1.5 rounded-lg text-emerald-600 shrink-0">
                        <Calendar size={14} />
                      </div>
                      <div>
                        <p className="text-[10px] font-bold text-slate-900 leading-tight">21-23 AUGUST 2026</p>
                        <p className="text-[8px] text-slate-400 font-bold uppercase">Fri - Sat - Sun</p>
                      </div>
                    </motion.div>
                    <motion.div variants={itemVariants} className="flex items-center gap-2.5">
                      <div className="bg-emerald-50 p-1.5 rounded-lg text-emerald-600 shrink-0">
                        <MapPin size={14} />
                      </div>
                      <div>
                        <p className="text-[10px] font-bold text-slate-900 leading-tight uppercase">PRAGATI MAIDAN</p>
                        <p className="text-[8px] text-slate-400 font-bold uppercase">NEW DELHI, INDIA</p>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </div>

              <div className="w-full md:w-[60%] bg-[#f8fafc] p-5 md:p-6 flex flex-col justify-center min-h-[350px] relative overflow-hidden">
                <AnimatePresence mode="wait">
                  {!showForm ? (
                    <motion.div
                      key="grid"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <motion.div variants={itemVariants} className="mb-4">
                        <h3 className="text-[16px] font-extrabold text-slate-800 leading-tight text-left uppercase">
                          How Would You Like to <span className="text-emerald-600">Participate?</span>
                        </h3>
                        <p className="text-[9.5px] text-slate-500 font-semibold mt-0.5 text-left uppercase">
                          Choose your category and start your journey with IHWE 2026
                        </p>
                      </motion.div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {participationCards.map((card, idx) => (
                          <motion.button
                            key={idx}
                            variants={itemVariants}
                            whileHover={{ scale: 1.02, y: -2, boxShadow: "0 10px 20px rgba(0,0,0,0.05)" }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => handleAction(card)}
                            className={`flex items-center gap-3 p-3.5 rounded-xl border ${card.color} text-left transition-all shadow-sm`}
                          >
                            <div className={`w-9 h-9 ${card.iconBg} rounded-lg flex items-center justify-center shrink-0`}>
                              {card.icon}
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="text-[9px] font-bold text-slate-800 leading-none mb-1 uppercase tracking-tight">{card.title}</h4>
                              <p className="text-[8px] text-slate-500 font-medium leading-tight line-clamp-1 uppercase">{card.desc}</p>
                            </div>
                            <div className={`w-5.5 h-5.5 ${card.arrowBg} text-white rounded-full flex items-center justify-center shrink-0 shadow-sm`}>
                              <ChevronRight size={12} />
                            </div>
                          </motion.button>
                        ))}
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="form"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                      className="h-full flex flex-col"
                    >
                      <button
                        onClick={() => { setShowForm(false); setIsSubmitted(false); }}
                        className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 hover:text-slate-800 transition-colors mb-4 w-fit"
                      >
                        <ArrowLeft size={14} />
                        BACK TO OPTIONS
                      </button>

                      {!isSubmitted ? (
                        <>
                          <div className="mb-5">
                            {/* ✅ FIXED: getFormDisplayTitle() se "REGISTRATION" remove hota hai formType se
                                Pehle: "DELEGATE REGISTRATION Registration" ❌
                                Ab:    "DELEGATE Registration" ✅                              */}
                            <h3 className="text-[18px] font-extrabold text-slate-800 leading-tight">
                              {getFormDisplayTitle(formType)}{" "}
                              <span className="text-orange-500 underline decoration-orange-200 underline-offset-4">Registration</span>
                            </h3>
                            <p className="text-[10px] text-slate-500 font-semibold mt-1">
                              This page is under renovation. Please leave your details and our team will contact you shortly.
                            </p>
                          </div>

                          <form onSubmit={handleSubmit} className="space-y-3 flex-1">
                            <div>
                              <label className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Full Name</label>
                              <input
                                required
                                type="text"
                                placeholder="Enter your name"
                                className="w-full px-3 py-2.5 bg-white border border-slate-200 rounded-xl text-[11px] focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                              />
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                              <div>
                                <label className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Email Address</label>
                                <input
                                  required
                                  type="email"
                                  placeholder="Email"
                                  className="w-full px-3 py-2.5 bg-white border border-slate-200 rounded-xl text-[11px] focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all"
                                  value={formData.email}
                                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                />
                              </div>
                              <div>
                                <label className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Phone Number</label>
                                <input
                                  required
                                  type="tel"
                                  placeholder="Phone"
                                  className="w-full px-3 py-2.5 bg-white border border-slate-200 rounded-xl text-[11px] focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all"
                                  value={formData.phone}
                                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                />
                              </div>
                            </div>
                            <button
                              type="submit"
                              disabled={isSubmitting}
                              className="w-full bg-orange-500 hover:bg-orange-600 text-white font-extrabold py-3 rounded-xl text-[11px] uppercase tracking-widest shadow-lg shadow-orange-500/30 transition-all flex items-center justify-center gap-2 disabled:opacity-50 mt-4"
                            >
                              {isSubmitting ? "Submitting..." : (
                                <>
                                  Register Interest
                                  <Send size={14} />
                                </>
                              )}
                            </button>
                          </form>
                        </>
                      ) : (
                        <motion.div
                          initial={{ scale: 0.9, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          className="flex-1 flex flex-col items-center justify-center text-center p-6 bg-emerald-50/50 rounded-2xl border border-emerald-100"
                        >
                          <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-4 shadow-inner">
                            <CheckCircle2 size={32} />
                          </div>
                          <h4 className="text-[18px] font-extrabold text-slate-800 mb-2">Thank You!</h4>
                          <p className="text-[11px] text-slate-600 font-bold max-w-[200px]">
                            Our team will contact you shortly regarding your <span className="text-emerald-600">{formType}</span> inquiry.
                          </p>
                          <button
                            onClick={() => { setShowForm(false); setIsSubmitted(false); }}
                            className="mt-6 text-[10px] font-extrabold text-emerald-600 uppercase tracking-widest hover:underline"
                          >
                            Back to Options
                          </button>
                        </motion.div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            <motion.div
              initial={{ x: -100, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.8 }}
              className="bg-[#cd1c24] text-white py-2 px-6 flex flex-wrap items-center justify-between gap-3 border-y border-white/10"
            >
              <div className="flex items-center gap-3">
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 2 }}
                  className="p-1.5 bg-white/10 rounded-full"
                >
                  <Clock size={16} className="text-white" />
                </motion.div>
                <div className="text-left">
                  <p className="text-[12px] font-bold uppercase tracking-tight leading-none mb-0.5">EARLY BIRD OFFER CLOSING SOON!</p>
                  <p className="text-[9px] font-bold text-white/70 uppercase tracking-widest">Premium Corner Stalls Almost Full</p>
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                onClick={() => handleAction({ link: "/book-a-stand" })}
                className="bg-[#f4b63f] hover:bg-yellow-300 text-[#cd1c24] px-4 py-2 rounded-lg text-[9px] font-bold flex items-center gap-1.5 transition-all shadow-lg"
              >
                <Star size={12} className="fill-current" />
                RESERVE PREMIUM SPACE NOW
              </motion.button>
            </motion.div>

            <div className="bg-white py-2 px-4 border-b border-slate-100 overflow-hidden">
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:flex lg:flex-nowrap items-center justify-center gap-x-2 gap-y-2 lg:gap-x-4">
                {trustedItems.map((item, i) => (
                  <motion.div
                    key={i} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 1 + (i * 0.1) }}
                    className="flex items-center gap-1.5 opacity-80 hover:opacity-100 transition-opacity"
                  >
                    <div className={`w-6 h-6 ${item.color} rounded-full flex items-center justify-center shrink-0 shadow-sm border border-white`}>
                      {React.cloneElement(item.icon as React.ReactElement, { size: 10 })}
                    </div>
                    <div className="flex flex-col text-left">
                      <p className="text-[7px] font-bold text-slate-800 leading-tight whitespace-nowrap">{item.label}</p>
                      <p className="text-[7px] font-medium text-slate-500 leading-tight tracking-tighter uppercase whitespace-nowrap">{item.label2}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="bg-[#0f172a] py-3 px-6 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-5 text-white">
                <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 1.5 }} className="flex items-center gap-1.5 opacity-90">
                  <ShieldCheck size={14} className="text-blue-400" />
                  <span className="text-[8px] font-bold uppercase tracking-widest">Secure</span>
                </motion.div>
                <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 1.6 }} className="flex items-center gap-1.5 opacity-90">
                  <BadgeCheck size={14} className="text-emerald-400" />
                  <span className="text-[8px] font-bold uppercase tracking-widest">Trusted</span>
                </motion.div>
              </div>

              <div className="flex items-center gap-6">
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.7 }} className="flex items-center gap-2.5 text-white text-left">
                  <div className="p-1.5 bg-white/5 rounded-lg border border-white/10">
                    <Phone size={14} className="text-blue-400" />
                  </div>
                  <div className="flex-1 min-w-[150px]">
                    <p className="text-[7.5px] text-white/30 font-bold uppercase tracking-wider">Need Help?</p>
                    <p className="text-[11px] font-bold tracking-tight text-white">+91 9654900525</p>
                    <p className="text-[8px] font-bold text-blue-400/80 tracking-tight lowercase mt-0.5">info@ihwe.in</p>
                  </div>
                </motion.div>
                <motion.button
                  initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 1.8 }}
                  whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                  onClick={() => handleAction({ link: whatsappUrl })}
                  className="bg-[#22c55e] hover:bg-[#16a34a] text-white px-4 py-2 rounded-xl flex items-center gap-2 text-[10px] font-bold transition-all shadow-lg"
                >
                  <MessageCircle size={15} fill="currentColor" />
                  CHAT ON WHATSAPP
                </motion.button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
      </AnimatePresence>

      <BrochurePopUp 
        isOpen={showSecondModal} 
        onClose={() => setShowSecondModal(false)} 
        logoUrl={logoUrl}
      />
    </>
  );
};

export default BrochureDownloadPopup;