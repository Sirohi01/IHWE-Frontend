import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin, Mail, Phone, Clock, Send, CheckCircle, Loader2,
} from "lucide-react";
import { settingsApi, heroBackgroundApi, contactEnquiryApi, verifyApi, SERVER_URL } from "@/lib/api";
import contactBg from "@/assets/contactbg.png";


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
    },
    {
      icon: Mail,
      label: "EMAIL US",
      value: contactEmails[0]?.email || "info@ihwe.in",
      sub: "We'll respond within 24 hours",
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
        className="relative min-h-[500px] md:min-h-[600px] flex items-center pt-20 pb-32 md:pb-40"
        style={{ 
          backgroundImage: `url(${contactBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-black/60" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            {/* Left: Content */}
            <div className="lg:col-span-8 text-white" data-aos="fade-right">
              <div className="inline-flex items-center gap-2 bg-[#23471d]/20 border border-[#23471d] px-3 py-1 mb-6">
                <Mail className="w-4 h-4 text-[#8cc63f]" />
                <span className="text-xs font-bold uppercase tracking-widest text-[#8cc63f]">CONTACT US</span>
                <div className="w-8 h-[1px] bg-[#8cc63f]" />
              </div>
              
              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                WE'RE HERE <br />
                <span className="text-[#8cc63f]">TO HELP YOU!</span>
              </h1>
              
              <p className="text-gray-300 text-lg mb-10 max-w-xl leading-relaxed">
                Have questions about the expo, exhibiting, partnerships or anything else? 
                Our team is just a message away.
              </p>
              
              <div className="grid sm:grid-cols-3 gap-6">
                {[
                  { icon: Clock, label: "QUICK RESPONSE", sub: "We reply within 24 hrs" },
                  { icon: CheckCircle, label: "EXPERT SUPPORT", sub: "Dedicated team to help" },
                  { icon: Send, label: "RELIABLE ASSISTANCE", sub: "We're just a message away" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#8cc63f] flex items-center justify-center shrink-0">
                      <item.icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-white tracking-wider leading-none mb-1">{item.label}</p>
                      <p className="text-[10px] text-gray-400">{item.sub}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Right: Floating Card */}
            <div className="lg:col-span-4 hidden lg:block" data-aos="fade-left">
              <div className="bg-white rounded-2xl p-8 shadow-2xl relative">
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 bg-[#8cc63f] rounded-xl flex items-center justify-center shadow-lg">
                  <Clock className="w-6 h-6 text-white" />
                </div>
                <div className="text-center pt-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 uppercase tracking-tight">WE VALUE <br />YOUR TIME</h3>
                  <div className="w-12 h-1 bg-[#8cc63f] mx-auto mb-4" />
                  <p className="text-sm text-gray-500 leading-relaxed">
                    Reach out to us and we'll get back to you promptly!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── OVERLAPPING CARDS SECTION ── */}
      <section className="relative z-20 -mt-24 md:-mt-32 pb-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-12 gap-8 items-stretch">
            
            {/* Left: Office Location */}
            <div className="lg:col-span-4 bg-white rounded-xl shadow-xl p-8 border border-gray-100 flex flex-col relative overflow-hidden" data-aos="fade-up">
              {/* Background building illustration (optional, but requested via image) */}
              <div className="absolute bottom-0 right-0 opacity-5 pointer-events-none">
                <MapPin size={200} />
              </div>

              <div className="space-y-8 relative z-10">
                {contactInfo.map((info, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-[#23471d] flex items-center justify-center shrink-0 shadow-md">
                      <info.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-gray-400 tracking-[0.2em] mb-1">{info.label}</p>
                      {info.title && <h4 className="text-sm font-bold text-gray-900 mb-1">{info.title}</h4>}
                      {info.isHtml ? (
                        <div 
                          className="text-xs text-gray-600 leading-relaxed font-medium"
                          dangerouslySetInnerHTML={{ __html: info.value }}
                        />
                      ) : (
                        <p className="text-sm font-bold text-gray-800">{info.value}</p>
                      )}
                      {info.sub && <p className="text-[11px] text-gray-500 mt-1">{info.sub}</p>}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Contact Form */}
            <div className="lg:col-span-8 bg-white rounded-xl shadow-xl p-8 md:p-10 border border-gray-100 relative" data-aos="fade-up" data-aos-delay="100">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-14 h-14 rounded-full bg-[#e8f5e9] flex items-center justify-center">
                  <Send className="w-7 h-7 text-[#23471d]" />
                </div>
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                    SEND US A <span className="text-[#23471d]">MESSAGE</span>
                  </h2>
                  <p className="text-gray-500 text-sm">Share your query and we'll get back to you.</p>
                </div>
                <div className="ml-auto hidden md:block">
                  <Send className="w-12 h-12 text-[#23471d]/10 transform -rotate-12" />
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
                  <div className="space-y-6">
                    {/* Row 1: Name & Phone */}
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="relative group">
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#23471d] transition-colors">
                          <CheckCircle className="w-4 h-4" />
                        </div>
                        <input
                          type="text" name="name" placeholder="Full Name *" value={formData.name} onChange={handleChange}
                          className={`w-full pl-11 pr-4 py-4 bg-gray-50 border rounded-lg text-sm outline-none transition-all ${errors.name ? "border-red-400" : "border-gray-200 focus:border-[#23471d] focus:bg-white"}`}
                        />
                        {errors.name && <p className="text-red-500 text-[10px] mt-1 ml-1">{errors.name}</p>}
                      </div>
                      
                      <div className="relative group flex items-center">
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#23471d] transition-colors z-10">
                          <Phone className="w-4 h-4" />
                        </div>
                        <input
                          type="tel" name="phone" placeholder="Phone Number *" value={formData.phone} onChange={handleChange}
                          disabled={phoneVerified || phoneOtpSent}
                          className={`w-full pl-11 pr-24 py-4 bg-gray-50 border rounded-lg text-sm outline-none transition-all ${errors.phone ? "border-red-400" : "border-gray-200 focus:border-[#23471d] focus:bg-white"} ${phoneVerified ? "bg-green-50 border-green-200" : ""}`}
                        />
                        {!phoneVerified && (
                          <button
                            onClick={sendPhoneOtp}
                            disabled={sendingPhoneOtp || !formData.phone || phoneResendTimer > 0}
                            className="absolute right-2 px-3 py-1.5 bg-white border border-[#23471d] text-[#23471d] text-[10px] font-bold uppercase rounded-md hover:bg-[#23471d] hover:text-white transition-all disabled:opacity-50"
                          >
                            {sendingPhoneOtp ? "..." : phoneResendTimer > 0 ? `${phoneResendTimer}s` : "SEND OTP"}
                          </button>
                        )}
                        {phoneVerified && <CheckCircle size={18} className="absolute right-3 text-green-500" />}
                        {errors.phone && <p className="absolute -bottom-5 left-0 text-red-500 text-[10px]">{errors.phone}</p>}
                      </div>
                    </div>

                    {/* Row 2: Email & Service */}
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="relative group flex items-center">
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#23471d] transition-colors z-10">
                          <Mail className="w-4 h-4" />
                        </div>
                        <input
                          type="email" name="email" placeholder="Email Address *" value={formData.email} onChange={handleChange}
                          disabled={emailVerified || emailOtpSent}
                          className={`w-full pl-11 pr-24 py-4 bg-gray-50 border rounded-lg text-sm outline-none transition-all ${errors.email ? "border-red-400" : "border-gray-200 focus:border-[#23471d] focus:bg-white"} ${emailVerified ? "bg-green-50 border-green-200" : ""}`}
                        />
                        {!emailVerified && (
                          <button
                            onClick={sendEmailOtp}
                            disabled={sendingEmailOtp || !formData.email || emailResendTimer > 0}
                            className="absolute right-2 px-3 py-1.5 bg-white border border-[#23471d] text-[#23471d] text-[10px] font-bold uppercase rounded-md hover:bg-[#23471d] hover:text-white transition-all disabled:opacity-50"
                          >
                            {sendingEmailOtp ? "..." : emailResendTimer > 0 ? `${emailResendTimer}s` : "SEND OTP"}
                          </button>
                        )}
                        {emailVerified && <CheckCircle size={18} className="absolute right-3 text-green-500" />}
                        {errors.email && <p className="absolute -bottom-5 left-0 text-red-500 text-[10px]">{errors.email}</p>}
                      </div>

                      <div className="relative group">
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#23471d] transition-colors z-10">
                          <CheckCircle className="w-4 h-4" />
                        </div>
                        <select
                          name="service" value={formData.service} onChange={handleChange}
                          className="w-full pl-11 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-lg text-sm outline-none focus:border-[#23471d] focus:bg-white transition-all appearance-none"
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
                        className={`w-full px-4 py-4 bg-gray-50 border rounded-lg text-sm outline-none transition-all resize-none ${errors.message ? "border-red-400" : "border-gray-200 focus:border-[#23471d] focus:bg-white"}`}
                      />
                      {errors.message && <p className="text-red-500 text-[10px] mt-1">{errors.message}</p>}
                    </div>

                    <div className="relative">
                      <button
                        onClick={handleSubmit} disabled={submitting}
                        className="w-full bg-gradient-to-r from-[#23471d] to-[#1a3a14] hover:from-[#1a3a14] hover:to-[#0f240c] text-white font-bold py-5 px-8 rounded-lg uppercase tracking-widest text-sm transition-all shadow-lg flex items-center justify-center gap-3 active:scale-[0.98]"
                      >
                        {submitting ? <Loader2 className="w-5 h-5 animate-spin" /> : <>SEND MESSAGE <Send className="w-4 h-4" /></>}
                      </button>

                      {/* Yellow corner tag */}
                      <div className="absolute -bottom-6 -right-6 hidden md:block">
                        <div className="bg-[#fbc02d] text-[#23471d] px-6 py-4 rounded-tl-3xl shadow-xl transform rotate-3">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                              <CheckCircle size={18} />
                            </div>
                            <p className="text-[11px] font-bold leading-tight">We'll get back <br />to you shortly!</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* ── TRUST BAND ── */}
      <section className="bg-white py-10 border-y border-gray-100">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { icon: CheckCircle, top: "100% SECURE", bot: "Your information is safe with us" },
              { icon: Send, top: "DEDICATED TEAM", bot: "We are here to help" },
              { icon: Clock, top: "QUICK RESPONSE", bot: "We reply within 24 hrs" },
              { icon: MapPin, top: "TRUSTED SUPPORT", bot: "Your satisfaction is our priority" },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-4 border-r last:border-none border-gray-100 pr-4">
                <div className="w-12 h-12 rounded-full bg-[#e8f5e9] flex items-center justify-center shrink-0">
                  <item.icon className="w-6 h-6 text-[#23471d]" />
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-900 leading-tight">{item.top}</p>
                  <p className="text-[10px] text-gray-500 leading-tight">{item.bot}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MAP */}
      {settings?.mapIframe && (
        <section className="py-16 bg-[#f3f4f6]">
          <div className="container mx-auto px-4" data-aos="fade-up">
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
          </div>
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
