import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin, Mail, Phone, Clock, Send, CheckCircle, Loader2,
} from "lucide-react";
import { settingsApi, heroBackgroundApi, contactEnquiryApi, verifyApi, SERVER_URL } from "@/lib/api";
import SectionContainer from "../components/layout/SectionContainer";
import contactBg from "@/assets/contactbg.webp";
import conbg from "@/assets/conbg.png";
import arrowImg from "@/assets/arrow.png";
import leafImg from "@/assets/leaf.png";
import teleImg from "@/assets/tele.png";
import webg from "@/assets/webg.png";
import c1 from "@/assets/c1.png";
import c2 from "@/assets/c2.png";
import c3 from "@/assets/c3.png";
import c4 from "@/assets/c4.png";


const Contact = () => {
  const [settings, setSettings] = useState<any>(null);
  const [formData, setFormData] = useState({ name: "", phone: "", email: "", service: "", message: "" });
  const [submitting, setSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState({ name: "", phone: "", email: "", message: "" });
  const [heroData, setHeroData] = useState<any>(null);

  // Verification State
  const [emailOtp, setEmailOtp] = useState("");
  const [phoneOtp, setPhoneOtp] = useState("");
  const [emailVerified, setEmailVerified] = useState(false);
  const [phoneVerified, setPhoneVerified] = useState(false);
  const [emailOtpSent, setEmailOtpSent] = useState(false);
  const [phoneOtpSent, setPhoneOtpSent] = useState(false);
  const [verifyingEmail, setVerifyingEmail] = useState(false);
  const [verifyingPhone, setVerifyingPhone] = useState(false);
  const [sendingEmailOtp, setSendingEmailOtp] = useState(false);
  const [sendingPhoneOtp, setSendingPhoneOtp] = useState(false);
  const [emailResendTimer, setEmailResendTimer] = useState(0);
  const [phoneResendTimer, setPhoneResendTimer] = useState(0);

  // Timer logic for OTP resend
  useEffect(() => {
    let emailInterval: any;
    let phoneInterval: any;

    if (emailResendTimer > 0) {
      emailInterval = setInterval(() => {
        setEmailResendTimer((prev) => prev - 1);
      }, 1000);
    }

    if (phoneResendTimer > 0) {
      phoneInterval = setInterval(() => {
        setPhoneResendTimer((prev) => prev - 1);
      }, 1000);
    }

    return () => {
      clearInterval(emailInterval);
      clearInterval(phoneInterval);
    };
  }, [emailResendTimer, phoneResendTimer]);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const data = await settingsApi.get();
        if (data) {
          setSettings(data);
        }
      } catch (error) {
        console.error("Error fetching settings for contact page:", error);
      }
    };
    fetchSettings();
  }, []);

  useEffect(() => {
    const fetchHero = async () => {
      try {
        const data = await heroBackgroundApi.getByPage("General / Contact Us");
        if (data) setHeroData(data);
      } catch (error) {
        console.error("Error fetching hero:", error);
      }
    };
    fetchHero();
  }, []);

  const contactEmails = settings?.emails?.filter((e: any) => e.forContact) || [{ email: "info@healthwellnessexpo.com" }];
  const contactPhones = settings?.phones?.filter((p: any) => p.forContact) || [{ phone: "+971 4 308 6000" }];
  const supportDeskText = settings?.supportDeskText || "For exhibitors and delegates traveling from abroad, our international support team is available 24/7 during the expo period for visa, travel, and logistics assistance.";

  const officeCards = settings?.addresses?.length > 0 ?
    settings.addresses.map((addr: any) => ({
      city: addr.title || "Office Location",
      addressHtml: addr.street, // This now contains rich text/HTML
      icon: MapPin,
    })) : [
      {
        city: "Dubai (Headquarters)",
        addressHtml: "Dubai World Trade Centre, Sheikh Zayed Road, Dubai, UAE",
        icon: MapPin,
      },
    ];

  const contactInfo = [
    {
      icon: MapPin,
      label: "OFFICE LOCATION",
      title: settings?.addresses?.[0]?.title || "Head Office",
      value: settings?.addresses?.[0]?.street || "Namo Gange Wellness Pvt Ltd 12/2B, Site-II, Sunrise Industrial Area, Mohan Nagar, Ghaziabad, Uttar Pradesh - 201007",
      isHtml: true,
    },
    {
      icon: Phone,
      label: "CALL US",
      value: contactPhones[0]?.phone || "+91-9654900525",
      sub: "Mon – Sat, 9:00 AM – 6:00 PM (GST)",
      color: "#01601d",
      link: "tel:+919654900525",
    },
    {
      icon: Mail,
      label: "EMAIL US",
      value: contactEmails[0]?.email || "info@ihwe.in",
      sub: "We'll respond within 24 hours",
      color: "#0056b3",
      link: `mailto:${contactEmails[0]?.email || "info@ihwe.in"}`,
    },
    {
      icon: Clock,
      label: "WORKING HOURS",
      value: "Mon – Sat: 9:00 AM – 6:00 PM",
      sub: "Sunday: Closed",
    },
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validate = () => {
    const e = { name: "", phone: "", email: "", message: "" };
    let ok = true;
    if (!formData.name.trim() || formData.name.trim().length < 2) { e.name = "Please enter your full name."; ok = false; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) { e.email = "Please enter a valid email."; ok = false; }
    if (!/^[0-9]{7,15}$/.test(formData.phone.replace(/[^0-9]/g, ""))) { e.phone = "Please enter a valid phone number."; ok = false; }
    if (formData.message.trim() && formData.message.trim().length < 10) { e.message = "Message must be at least 10 characters."; ok = false; }
    setErrors(e);
    return ok;
  };

  const sendEmailOtp = async () => {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setErrors(prev => ({ ...prev, email: "Please enter a valid email first." }));
      return;
    }
    if (emailResendTimer > 0) return;

    setSendingEmailOtp(true);
    try {
      const res = await verifyApi.sendEmailOtp(formData.email);
      if (res.success) {
        setEmailOtpSent(true);
        setEmailResendTimer(60);
        console.log("Email OTP sent successfully");
      } else {
        alert(res.message || "Failed to send OTP.");
      }
    } catch (error: any) {
      console.error("Error sending email OTP:", error);
      alert("Error: " + (error.message || "Failed to send OTP. Please check your connection."));
    } finally {
      setSendingEmailOtp(false);
    }
  };

  const confirmEmailOtp = async () => {
    if (!emailOtp) return;
    setVerifyingEmail(true);
    try {
      const res = await verifyApi.verifyEmailOtp(formData.email, emailOtp);
      if (res.success) {
        setEmailVerified(true);
        setEmailOtpSent(false);
      } else {
        alert(res.message || "Invalid OTP.");
      }
    } catch (error) {
      console.error("Error verifying email OTP:", error);
    } finally {
      setVerifyingEmail(false);
    }
  };

  const sendPhoneOtp = async () => {
    if (!/^[0-9]{10,15}$/.test(formData.phone.replace(/[^0-9]/g, ""))) {
      setErrors(prev => ({ ...prev, phone: "Please enter a valid phone number first." }));
      return;
    }
    if (phoneResendTimer > 0) return;

    setSendingPhoneOtp(true);
    try {
      const res = await verifyApi.sendPhoneOtp(formData.phone);
      if (res.success) {
        setPhoneOtpSent(true);
        setPhoneResendTimer(60);
        console.log("Phone OTP sent successfully");
      } else {
        alert(res.message || "Failed to send OTP.");
      }
    } catch (error: any) {
      console.error("Error sending phone OTP:", error);
      alert("Error: " + (error.message || "Failed to send OTP. Please check your connection."));
    } finally {
      setSendingPhoneOtp(false);
    }
  };

  const confirmPhoneOtp = async () => {
    if (!phoneOtp) return;
    setVerifyingPhone(true);
    try {
      const res = await verifyApi.verifyPhoneOtp(formData.phone, phoneOtp);
      if (res.success) {
        setPhoneVerified(true);
        setPhoneOtpSent(false);
      } else {
        alert(res.message || "Invalid OTP.");
      }
    } catch (error) {
      console.error("Error verifying phone OTP:", error);
    } finally {
      setVerifyingPhone(false);
    }
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    if (!emailVerified || !phoneVerified) {
      alert("Please verify both your email and phone number first.");
      return;
    }
    setSubmitting(true);
    try {
      const res = await contactEnquiryApi.submitEnquiry(formData);
      if (res.success) {
        setIsSuccess(true);
        setTimeout(() => {
          setFormData({ name: "", phone: "", email: "", service: "", message: "" });
          setEmailVerified(false);
          setPhoneVerified(false);
          setIsSuccess(false);
        }, 4000);
      } else {
        alert(res.message || "Failed to submit enquiry.");
      }
    } catch (error) {
      console.error("Error submitting contact inquiry:", error);
      alert("An error occurred. Please try again later.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-[#f3f4f6] min-h-screen font-inter overflow-hidden">
      {/* ── HERO SECTION ── */}
      <section
        className="relative min-h-[250px] md:min-h-[320px] flex items-center pt-14 md:pt-20 pb-10 md:pb-14"
        style={{ 
          backgroundImage: `url(${contactBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {/* Removed Overlay as requested */}
        
        <SectionContainer className="relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            <div className="text-white max-w-4xl" data-aos="fade-right">
              <div className="inline-flex items-center gap-2 mb-6">
                <Mail className="w-4 h-4 text-[#72a01d]" />
                <span className="text-sm font-bold uppercase tracking-widest text-[#72a01d]">CONTACT US</span>
                <div className="w-8 h-[1px] bg-[#72a01d]" />
              </div>
              
              <h1 className="text-5xl md:text-6xl font-black mb-4 leading-tight drop-shadow-lg">
                WE'RE HERE <br />
                <span className="text-[#73ad1d]">TO HELP YOU!</span>
              </h1>
              
              <p className="text-white text-lg mb-8 max-w-xl leading-relaxed drop-shadow-md">
                Have questions about the expo, exhibiting,<br />
                partnerships or anything else?<br />
                Our team is just a message away.
              </p>
              
              <div className="flex flex-wrap items-center gap-y-4">
                {[
                  { icon: Clock, label: "QUICK RESPONSE", sub: "We reply within 24 hrs" },
                  { icon: CheckCircle, label: "EXPERT SUPPORT", sub: "Dedicated team to help" },
                  { icon: Send, label: "RELIABLE ASSISTANCE", sub: "We're just a message away" },
                ].map((item, i, arr) => (
                  <div key={i} className="flex items-center">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#8cc63f] flex items-center justify-center shrink-0">
                        <item.icon className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-white tracking-wider leading-none mb-1">{item.label}</p>
                        <p className="text-xs text-white">{item.sub}</p>
                      </div>
                    </div>
                    {i < arr.length - 1 && (
                      <div className="hidden md:block w-[1px] h-8 bg-white/30 mx-6 md:mx-8" />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Floating Info Card (WE VALUE YOUR TIME) */}
            <div className="hidden lg:block w-44 bg-white rounded-2xl shadow-2xl px-3 py-6 relative transform hover:-translate-y-2 transition-all duration-500" data-aos="fade-left">
              <div className="absolute top-0 right-0 w-24 h-24 opacity-[0.03] pointer-events-none overflow-hidden rounded-tr-2xl">
                <img src={leafImg} alt="" className="w-full h-full object-contain rotate-45" />
              </div>
              
              <div className="flex flex-col items-center text-center">
                {/* Floating Icon Header */}
                <div className="w-20 h-20 rounded-full bg-[#73ad1d] flex items-center justify-center mb-4 shadow-[0_10px_25px_rgba(115,173,29,0.3)] -mt-14 border-4 border-white transition-transform duration-300 hover:scale-110 relative z-10">
                  <img src={webg} alt="Web Icon" className="w-12 h-12 object-contain" />
                </div>
                
                <h3 className="text-[17px] font-black text-[#151f43] tracking-tighter uppercase leading-none">WE VALUE</h3>
                <h3 className="text-[17px] font-black text-[#151f43] tracking-tighter uppercase mb-3 mt-1">YOUR TIME</h3>
                
                <div className="w-12 h-[3px] bg-[#73ad1d] rounded-full mb-4" />
                
                <p className="text-xs text-gray-900 font-bold leading-relaxed px-2">
                  Reach out to us and <br /> we'll get back to you <br /> promptly!
                </p>

                {/* Decorative corner accent */}
                <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-[#73ad1d] rounded-tl-2xl opacity-10" />
              </div>
            </div>
          </div>
        </SectionContainer>
      </section>

      {/* ── OVERLAPPING CARDS SECTION ── */}
      <section className="relative z-20 pt-10 md:pt-12 pb-20">
        <SectionContainer>
          <div className="grid lg:grid-cols-12 gap-8 items-stretch">
            
            {/* Left: Office Location */}
            <div 
              className="lg:col-span-4 bg-white rounded-xl p-6 flex flex-col relative overflow-hidden" 
              style={{ boxShadow: 'rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgb(209, 213, 219) 0px 0px 0px 1px inset' }}
              data-aos="fade-up"
            >
              {/* Removed absolute watermark to place it contextually */}

              <div className="divide-y divide-gray-200 relative z-10">
                {contactInfo.map((info, i) => (
                  <div key={i} className="flex items-start gap-4 py-4 first:pt-0 last:pb-0 relative group">
                    <div className="w-12 h-12 rounded-full bg-[#01601d] flex items-center justify-center shrink-0 shadow-md">
                      <info.icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[10px] font-bold text-black tracking-[0.2em] mb-1">{info.label}</p>
                      {info.title && <h4 className="text-sm font-bold text-black mb-1">{info.title}</h4>}
                      {info.isHtml ? (
                        <div 
                          className="text-xs text-black leading-relaxed font-bold"
                          dangerouslySetInnerHTML={{ __html: info.value }}
                        />
                      ) : (
                        info.link ? (
                          <a 
                            href={info.link}
                            className="text-sm font-bold hover:underline transition-all"
                            style={{ color: info.color || "black" }}
                          >
                            {info.value}
                          </a>
                        ) : (
                          <p 
                            className="text-sm font-bold"
                            style={{ color: info.color || "black" }}
                          >
                            {info.value}
                          </p>
                        )
                      )}
                      {info.sub && <p className="text-[11px] text-black font-medium mt-1">{info.sub}</p>}
                    </div>
                    {i === 0 && (
                      <div className="absolute right-0 bottom-0 translate-x-2 translate-y-1 opacity-70 pointer-events-none w-14 md:w-16">
                        <img 
                          src={conbg} 
                          alt="Building" 
                          className="w-full h-auto object-contain"
                          style={{ filter: 'grayscale(1) brightness(0.5) sepia(1) hue-rotate(190deg) saturate(20)' }}
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Contact Form */}
            <div 
              className="lg:col-span-8 bg-white rounded-xl p-5 md:p-6 relative overflow-hidden" 
              style={{ boxShadow: 'rgba(9, 30, 66, 0.25) 0px 1px 1px, rgba(9, 30, 66, 0.13) 0px 0px 1px 1px' }}
              data-aos="fade-up" 
              data-aos-delay="100"
            >
              {/* Decorative Leaf in top right */}
              <div className="absolute -top-14 -right-1 w-40  pointer-events-none transform rotate-[15deg]">
                <img src={leafImg} alt="Decorative Leaf" className="w-full h-full object-contain" />
              </div>
              <div className="flex items-center gap-4 mb-8">
                <div className="w-14 h-14 rounded-full bg-[#e8f5e9] flex items-center justify-center shrink-0">
                  <img src={teleImg} alt="Telegram Icon" className="w-14 h-14 object-contain" />
                </div>
                <div className="flex items-center gap-6">
                  <div>
                    <h2 className="text-2xl md:text-3xl font-bold text-[#151f43]">
                      SEND US A <span className="text-[#1e6b13]">MESSAGE</span>
                    </h2>
                    <p className="text-[#151f43] text-sm font-medium">Share your query and we'll get back to you.</p>
                  </div>
                </div>
              </div>

              <AnimatePresence mode="wait">
                {isSuccess ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col items-center justify-center py-12 text-center"
                  >
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
                      <CheckCircle className="w-10 h-10 text-green-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Thank You!</h3>
                    <p className="text-gray-600">Your message has been sent successfully. <br />We'll get back to you shortly.</p>
                  </motion.div>
                ) : (
                  <div className="space-y-4">
                    {/* Row 1: Name & Phone */}
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="relative group">
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#085a25] group-focus-within:text-[#23471d] transition-colors">
                          <CheckCircle className="w-4 h-4" />
                        </div>
                        <input
                          type="text" name="name" placeholder="Full Name *" value={formData.name} onChange={handleChange}
                          className={`w-full pl-11 pr-4 py-2.5 bg-gray-50 border rounded-lg text-sm outline-none transition-all ${errors.name ? "border-red-400" : "border-gray-200 focus:border-[#23471d] focus:bg-white"}`}
                        />
                        {errors.name && <p className="text-red-500 text-[10px] mt-1 ml-1">{errors.name}</p>}
                      </div>
                      
                      <div className="relative group flex items-center">
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#085a25] group-focus-within:text-[#23471d] transition-colors z-10">
                          <Phone className="w-4 h-4" />
                        </div>
                        <input
                          type="tel" name="phone" placeholder="Phone Number *" value={formData.phone} onChange={handleChange}
                          disabled={phoneVerified || phoneOtpSent}
                          className={`w-full pl-11 pr-24 py-2.5 bg-gray-50 border rounded-lg text-sm outline-none transition-all ${errors.phone ? "border-red-400" : "border-gray-200 focus:border-[#23471d] focus:bg-white"} ${phoneVerified ? "bg-green-50 border-green-200" : ""}`}
                        />
                        {!phoneVerified && (
                          <button
                            onClick={sendPhoneOtp}
                            disabled={sendingPhoneOtp || !formData.phone || phoneResendTimer > 0}
                            className="absolute right-2 px-3 py-1.5 bg-white border border-[#085a25] text-[#085a25] text-[10px] font-bold uppercase rounded-md hover:bg-[#085a25] hover:text-white transition-all disabled:"
                          >
                            {sendingPhoneOtp ? "..." : phoneResendTimer > 0 ? `${phoneResendTimer}s` : "SEND OTP"}
                          </button>
                        )}
                        {phoneVerified && <CheckCircle size={18} className="absolute right-3 text-green-500" />}
                        {errors.phone && <p className="absolute -bottom-5 left-0 text-red-500 text-[10px]">{errors.phone}</p>}
                      </div>
                    </div>

                    {/* Row 2: Email & Service */}
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="relative group flex items-center">
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#085a25] group-focus-within:text-[#23471d] transition-colors z-10">
                          <Mail className="w-4 h-4" />
                        </div>
                        <input
                          type="email" name="email" placeholder="Email Address *" value={formData.email} onChange={handleChange}
                          disabled={emailVerified || emailOtpSent}
                          className={`w-full pl-11 pr-24 py-2.5 bg-gray-50 border rounded-lg text-sm outline-none transition-all ${errors.email ? "border-red-400" : "border-gray-200 focus:border-[#23471d] focus:bg-white"} ${emailVerified ? "bg-green-50 border-green-200" : ""}`}
                        />
                        {!emailVerified && (
                          <button
                            onClick={sendEmailOtp}
                            disabled={sendingEmailOtp || !formData.email || emailResendTimer > 0}
                            className="absolute right-2 px-3 py-1.5 bg-white border border-[#085a25] text-[#085a25] text-[10px] font-bold uppercase rounded-md hover:bg-[#085a25] hover:text-white transition-all disabled:"
                          >
                            {sendingEmailOtp ? "..." : emailResendTimer > 0 ? `${emailResendTimer}s` : "SEND OTP"}
                          </button>
                        )}
                        {emailVerified && <CheckCircle size={18} className="absolute right-3 text-green-500" />}
                        {errors.email && <p className="absolute -bottom-5 left-0 text-red-500 text-[10px]">{errors.email}</p>}
                      </div>

                      <div className="relative group">
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#085a25] group-focus-within:text-[#23471d] transition-colors z-10">
                          <CheckCircle className="w-4 h-4" />
                        </div>
                        <select
                          name="service" value={formData.service} onChange={handleChange}
                          className="w-full pl-11 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm outline-none focus:border-[#23471d] focus:bg-white transition-all appearance-none"
                        >
                          <option value="">Select Inquiry Type...</option>
                          <option value="exhibition">Exhibition & Stands</option>
                          <option value="conference">Conference & Speakers</option>
                          <option value="sponsorship">Sponsorship</option>
                          <option value="registration">Visitor Registration</option>
                          <option value="media">Media & Press</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                    </div>

                    {/* OTP Inputs */}
                    {((phoneOtpSent && !phoneVerified) || (emailOtpSent && !emailVerified)) && (
                      <div className="grid md:grid-cols-2 gap-4">
                        {phoneOtpSent && !phoneVerified && (
                          <div className="flex gap-2">
                            <input
                              type="text" placeholder="Phone OTP" value={phoneOtp} onChange={(e) => setPhoneOtp(e.target.value)}
                              className="flex-1 px-4 py-3 bg-orange-50 border border-orange-200 rounded-lg text-sm text-center tracking-widest font-bold outline-none"
                              maxLength={6}
                            />
                            <button onClick={confirmPhoneOtp} disabled={verifyingPhone} className="px-6 py-3 bg-[#23471d] text-white text-xs font-bold rounded-lg hover:bg-[#1a3a14]">
                              {verifyingPhone ? "..." : "VERIFY"}
                            </button>
                          </div>
                        )}
                        {emailOtpSent && !emailVerified && (
                          <div className="flex gap-2">
                            <input
                              type="text" placeholder="Email OTP" value={emailOtp} onChange={(e) => setEmailOtp(e.target.value)}
                              className="flex-1 px-4 py-3 bg-orange-50 border border-orange-200 rounded-lg text-sm text-center tracking-widest font-bold outline-none"
                              maxLength={6}
                            />
                            <button onClick={confirmEmailOtp} disabled={verifyingEmail} className="px-6 py-3 bg-[#23471d] text-white text-xs font-bold rounded-lg hover:bg-[#1a3a14]">
                              {verifyingEmail ? "..." : "VERIFY"}
                            </button>
                          </div>
                        )}
                      </div>
                    )}

                    <div className="relative group">
                      <textarea
                        name="message" placeholder="Tell us more about your inquiry..." value={formData.message} onChange={handleChange} rows={4}
                        className={`w-full px-4 py-3 bg-gray-50 border rounded-lg text-sm outline-none transition-all resize-none ${errors.message ? "border-red-400" : "border-gray-200 focus:border-[#23471d] focus:bg-white"}`}
                      />
                      {errors.message && <p className="text-red-500 text-[10px] mt-1">{errors.message}</p>}
                    </div>

                    <div className="flex flex-col md:flex-row items-stretch rounded-lg overflow-hidden shadow-xl group/btn">
                      <button
                        onClick={handleSubmit} disabled={submitting}
                        className="flex-1 bg-gradient-to-r from-[#2e7d32] via-[#1b5e20] to-[#0d47a1] text-white font-bold py-3 px-6 uppercase tracking-widest text-[13px] transition-all flex items-center justify-center gap-3 active:scale-[0.98] relative z-10"
                      >
                        {submitting ? <Loader2 className="w-5 h-5 animate-spin" /> : <>SEND MESSAGE <Send className="w-4 h-4" /></>}
                      </button>

                      <div className="hidden md:flex bg-gradient-to-r from-[#fbc02d] to-[#f9a825] px-6 py-3 items-center gap-3 relative -left-1" style={{ clipPath: 'polygon(15px 0, 100% 0, 100% 100%, 0% 100%)', marginLeft: '-30px' }}>
                        <div className="text-[#0d47a1] text-[10px] font-black leading-tight ml-4">
                          We'll get back <br /> to you shortly!
                        </div>
                        <div className="relative">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 text-[#0d47a1]">
                            <circle cx="12" cy="12" r="4" />
                            <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </SectionContainer>
      </section>

      {/* ── TRUST BAND ── */}
      <section className="relative z-30 -mt-16">
        <SectionContainer>
          <div className="bg-white rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.08)] border border-gray-100 py-5 px-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-y-8">
              {[
                { img: c1, top: "100% SECURE", bot: "Your information is safe with us" },
                { img: c2, top: "DEDICATED TEAM", bot: "We are here to help" },
                { img: c3, top: "QUICK RESPONSE", bot: "We reply within 24 hrs" },
                { img: c4, top: "TRUSTED SUPPORT", bot: "Your satisfaction is our priority" },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4 px-6 border-gray-300 md:border-r last:border-none">
                  <img src={item.img} alt={item.top} className="w-12 h-12 object-contain shrink-0" />
                  <div>
                    <p className="text-[13px] font-bold text-[#044716] leading-tight tracking-tight">{item.top}</p>
                    <p className="text-[11px] text-gray-900 font-bold leading-tight mt-1">{item.bot}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </SectionContainer>
      </section>

      {/* MAP */}
      {settings?.mapIframe && (
        <section className="pt-10 pb-8 bg-[#f3f4f6] -mt-4">
          <SectionContainer data-aos="fade-up">
            <div className="overflow-hidden rounded-2xl shadow-xl border border-white min-h-[420px] flex items-center justify-center bg-white">
              {settings.mapIframe.includes("<iframe") ? (
                <div
                  dangerouslySetInnerHTML={{ __html: settings.mapIframe }}
                  className="w-full map-container"
                />
              ) : (
                <iframe
                  src={settings.mapIframe}
                  width="100%"
                  height="420"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              )}
            </div>
          </SectionContainer>
        </section>
      )}

      <style dangerouslySetInnerHTML={{
        __html: `
        .map-container iframe {
          width: 100% !important;
          height: 420px !important;
          border: 0 !important;
        }
      `}} />
    </div>
  );
};

export default Contact;
