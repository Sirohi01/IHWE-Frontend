import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin, Mail, Phone, Clock, Send, CheckCircle, Loader2,
} from "lucide-react";
import { settingsApi, heroBackgroundApi, contactEnquiryApi, verifyApi, SERVER_URL } from "@/lib/api";


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
      address: `${addr.street}, ${addr.city}, ${addr.state} ${addr.zipCode}, ${addr.country}`,
      icon: MapPin,
    })) : [
      {
        city: "Dubai (Headquarters)",
        address: "Dubai World Trade Centre, Sheikh Zayed Road, Dubai, UAE",
        icon: MapPin,
      },
    ];

  const contactInfo = [
    {
      icon: Phone,
      label: "Call Us",
      values: contactPhones.map((p: any) => ({ text: p.phone, href: `tel:${p.phone}` })),
      sub: "Mon – Sat, 9:00 AM – 6:00 PM (GST)",
      accent: "#d26019",
    },
    {
      icon: Mail,
      label: "Email Us",
      values: contactEmails.map((e: any) => ({ text: e.email, href: `mailto:${e.email}` })),
      sub: "We'll respond within 24 hours",
      accent: "#d26019",
    },
    {
      icon: Clock,
      label: "Working Hours",
      values: [{ text: "Mon – Sat: 9:00 AM – 6:00 PM", href: null }],
      sub: "Sunday: Closed",
      accent: "#d26019",
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
    <div className="bg-[#f9fafb] min-h-screen font-inter">
      {/* ── HERO SECTION - Standardized 16:4 Sleek Style ── */}
      <section
        className="hero-background-standard"
        style={{ 
          backgroundImage: `url(${heroData?.backgroundImage ? `${SERVER_URL}${heroData.backgroundImage}` : "/images/contact.jpg"})`
        }}
      >

        <div className="absolute inset-0 bg-black/40" />
        <div
          className="absolute bottom-0 left-0 w-full h-4 md:h-8 bg-[#f9fafb]"
          style={{ clipPath: "ellipse(60% 100% at 50% 100%)" }}
        />

        <div className="container mx-auto px-4 text-center text-white relative z-10" data-aos="fade-up">
          <p className="text-sm uppercase tracking-[0.4em] mb-4 opacity-80">
            {heroData?.title || "Reach Out"}
          </p>
          <h1 className="text-4xl md:text-6xl font-inter font-semibold mb-6 tracking-tight">
            {heroData?.heading || "Contact Us"}
          </h1>
          <p className="text-white/70 text-base md:text-lg mb-8 max-w-2xl mx-auto font-light leading-relaxed">
            {heroData?.shortDescription || "Have questions about the expo, exhibiting, or partnerships? We'd love to hear from you."}
          </p>
        </div>
      </section>


      {/* CONTACT FORM + INFO */}
      <section className="py-12 bg-[#fafafa] border-t border-slate-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14" data-aos="fade-up">
            <div className="flex items-center justify-center gap-3 mb-3">
              <div className="h-px w-8 bg-[#23471d]" />
              <span className="text-xs font-bold uppercase tracking-[0.4em] text-[#23471d]">Get In Touch</span>
              <div className="h-px w-8 bg-[#23471d]" />
            </div>
            <h2 className="text-3xl md:text-4xl font-inter text-slate-900">
              Send Us a <span className="text-[#23471d]">Message</span>
            </h2>
          </div>

          <div className="grid lg:grid-cols-5 gap-12 max-w-6xl mx-auto">
            {/* LEFT: info */}
            <div className="lg:col-span-2 space-y-5" data-aos="fade-right">
              {/* Added Office Cards here */}
              <div className="grid grid-cols-1 gap-4 mb-6">
                {officeCards.map((office, i) => (
                  <div
                    key={`${office.city}-${i}`}
                    className="group border border-slate-100 p-5 hover:border-[#23471d]/30 hover:shadow-md transition-all duration-300 bg-white"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-11 h-11 bg-[#23471d]/10 flex items-center justify-center shrink-0 group-hover:bg-[#23471d] transition-colors duration-300">
                        <MapPin className="w-5 h-5 text-[#23471d] group-hover:text-white transition-colors duration-300" />
                      </div>
                      <div>
                        <div className="text-[11px] font-bold uppercase tracking-widest text-[#23471d] mb-1">Office Location</div>
                        <h3 className="text-sm font-bold text-slate-800 mb-1">{office.city}</h3>
                        <p className="text-xs text-slate-500 leading-relaxed">{office.address}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {contactInfo.map((info) => (
                <div key={info.label} className="group flex items-start gap-4 p-5 bg-white border border-slate-100 hover:border-[#23471d]/30 hover:shadow-md transition-all duration-300">
                  <div className="w-11 h-11 rounded-none bg-[#23471d]/10 flex items-center justify-center shrink-0 group-hover:bg-[#23471d] transition-colors duration-300">
                    <info.icon className="w-5 h-5 text-[#23471d] group-hover:text-white transition-colors duration-300" />
                  </div>
                  <div>
                    <div className="text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-1">{info.label}</div>
                    <div className="space-y-1">
                      {info.values.map((val: any, i: number) => (
                        val.href ? (
                          <a
                            key={`val-${i}`}
                            href={val.href}
                            className="block text-gray-700 font-semibold hover:text-[#d26019] transition-colors"
                          >
                            {val.text}
                          </a>
                        ) : (
                          <p key={`val-${i}`} className="text-gray-700 font-semibold">
                            {val.text}
                          </p>
                        )
                      ))}
                    </div>
                    <div className="text-xs text-slate-600 mt-0.5">{info.sub}</div>
                  </div>
                </div>
              ))}

              <div className="p-5 bg-[#23471d] text-white">
                <h4 className="font-bold text-sm uppercase tracking-wide mb-2">International Support Desk</h4>
                <p className="text-white/90 text-sm leading-relaxed text-justify mb-4">
                  {supportDeskText}
                </p>
              </div>
            </div>

            {/* RIGHT: form */}
            <div className="lg:col-span-3" data-aos="fade-left">
              <AnimatePresence mode="wait">
                {isSuccess ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="bg-white border border-green-300 p-14 flex flex-col items-center justify-center min-h-[480px] shadow-sm"
                  >
                    <CheckCircle className="w-20 h-20 text-green-500 mb-6" />
                    <h3 className="text-2xl font-bold text-slate-900 mb-3 text-center">Message Sent!</h3>
                    <p className="text-slate-500 text-center text-sm max-w-sm mb-6">Thank you for reaching out. Our team will respond within 24 hours.</p>
                    <div className="flex items-center gap-2 text-xs text-slate-400">
                      <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                      Form will reset automatically...
                    </div>
                  </motion.div>
                ) : (
                  <motion.div 
                    key="form"
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }} 
                    exit={{ opacity: 0 }}
                    className="bg-white border border-slate-100 p-8 shadow-sm"
                  >
                    <div className="space-y-6">
                      {/* Row 1: Name & Phone */}
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <input
                            type="text" name="name" placeholder="Full Name *" value={formData.name} onChange={handleChange}
                            className={`w-full px-4 py-3.5 border-2 text-sm outline-none transition-all ${errors.name ? "border-red-400" : "border-slate-200 focus:border-[#23471d]"}`}
                          />
                          {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                        </div>
                        
                        <div className="relative flex items-center group">
                          <input
                            type="tel" name="phone" placeholder="Phone Number *" value={formData.phone} onChange={handleChange}
                            disabled={phoneVerified || phoneOtpSent}
                            className={`w-full px-4 py-3.5 border-2 text-sm outline-none transition-all ${errors.phone ? "border-red-400" : "border-slate-200 focus:border-[#23471d]"} ${phoneVerified ? "bg-green-50/50 border-green-200 text-green-700 font-semibold" : ""} ${phoneOtpSent && !phoneVerified ? "border-orange-200" : ""}`}
                          />
                          {!phoneVerified && (
                            <button
                              onClick={sendPhoneOtp}
                              disabled={sendingPhoneOtp || !formData.phone || phoneResendTimer > 0}
                              className={`absolute right-2 px-3 py-1.5 bg-[#23471d] text-white text-[10px] uppercase font-bold tracking-wider rounded-sm hover:bg-[#1a3a14] disabled:bg-slate-200 transition-all shadow-sm active:scale-95 ${phoneResendTimer > 0 ? "bg-slate-300" : ""}`}
                            >
                              {sendingPhoneOtp ? "Sending..." : phoneResendTimer > 0 ? `Resend in ${phoneResendTimer}s` : phoneOtpSent ? "Resend OTP" : "Send OTP"}
                            </button>
                          )}
                          {phoneVerified && <CheckCircle size={18} className="absolute right-3 text-green-500 animate-in zoom-in duration-300" />}
                          {errors.phone && <p className="absolute -bottom-5 left-0 text-red-500 text-xs">{errors.phone}</p>}
                        </div>
                      </div>

                      {/* Row 2: Email & Service */}
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="relative flex items-center group">
                          <input
                            type="email" name="email" placeholder="Email Address *" value={formData.email} onChange={handleChange}
                            disabled={emailVerified || emailOtpSent}
                            className={`w-full px-4 py-3.5 border-2 text-sm outline-none transition-all ${errors.email ? "border-red-400" : "border-slate-200 focus:border-[#23471d]"} ${emailVerified ? "bg-green-50/50 border-green-200 text-green-700 font-semibold" : ""} ${emailOtpSent && !emailVerified ? "border-orange-200" : ""}`}
                          />
                          {!emailVerified && (
                            <button
                              onClick={sendEmailOtp}
                              disabled={sendingEmailOtp || !formData.email || emailResendTimer > 0}
                              className={`absolute right-2 px-3 py-1.5 bg-[#23471d] text-white text-[10px] uppercase font-bold tracking-wider rounded-sm hover:bg-[#1a3a14] disabled:bg-slate-300 transition-all shadow-sm active:scale-95 ${emailResendTimer > 0 ? "bg-slate-300" : ""}`}
                            >
                              {sendingEmailOtp ? "Sending..." : emailResendTimer > 0 ? `Resend in ${emailResendTimer}s` : emailOtpSent ? "Resend OTP" : "Send OTP"}
                            </button>
                          )}
                          {emailVerified && <CheckCircle size={18} className="absolute right-3 text-green-500 animate-in zoom-in duration-300" />}
                          {errors.email && <p className="absolute -bottom-5 left-0 text-red-500 text-xs">{errors.email}</p>}
                        </div>

                        <select
                          name="service" value={formData.service} onChange={handleChange}
                          className="w-full px-4 py-[13px] border-2 border-slate-200 focus:border-[#23471d] text-sm outline-none transition-colors bg-white text-slate-500 h-[52px]"
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

                      {/* Row 3: Combined OTPs (Shared space) */}
                      {( (phoneOtpSent || sendingPhoneOtp) && !phoneVerified || (emailOtpSent || sendingEmailOtp) && !emailVerified ) && (
                        <div className="grid md:grid-cols-2 gap-4 animate-in fade-in slide-in-from-top-4 duration-500 ease-out">
                          {/* WhatsApp OTP Column */}
                          <div>
                            { (phoneOtpSent || sendingPhoneOtp) && !phoneVerified ? (
                              <div className="flex gap-2">
                                <input
                                  type="text" 
                                  placeholder={sendingPhoneOtp ? "Sending..." : "WhatsApp OTP"} 
                                  value={phoneOtp} 
                                  onChange={(e) => setPhoneOtp(e.target.value)}
                                  disabled={sendingPhoneOtp}
                                  className={`flex-1 px-4 py-2.5 border-2 border-[#d26019]/30 text-xs outline-none focus:border-[#d26019] bg-orange-50/50 placeholder:text-orange-300 font-medium tracking-widest text-center ${sendingPhoneOtp ? "opacity-50 cursor-not-allowed" : ""}`}
                                  maxLength={6}
                                />
                                <button
                                  onClick={confirmPhoneOtp}
                                  disabled={verifyingPhone || !phoneOtp || sendingPhoneOtp}
                                  className="px-4 py-2.5 bg-[#23471d] text-white text-[10px] uppercase font-bold tracking-wider rounded-sm hover:bg-[#1a3a14] transition-all shadow-md active:scale-95"
                                >
                                  {verifyingPhone ? "..." : "Verify"}
                                </button>
                              </div>
                            ) : <div className="hidden md:block h-10" />}
                          </div>

                          {/* Email OTP Column */}
                          <div>
                            { (emailOtpSent || sendingEmailOtp) && !emailVerified ? (
                              <div className="flex gap-2">
                                <input
                                  type="text" 
                                  placeholder={sendingEmailOtp ? "Sending..." : "Email OTP"} 
                                  value={emailOtp} 
                                  onChange={(e) => setEmailOtp(e.target.value)}
                                  disabled={sendingEmailOtp}
                                  className={`flex-1 px-4 py-2.5 border-2 border-[#d26019]/30 text-xs outline-none focus:border-[#d26019] bg-orange-50/50 placeholder:text-orange-300 font-medium tracking-widest text-center ${sendingEmailOtp ? "opacity-50 cursor-not-allowed" : ""}`}
                                  maxLength={6}
                                />
                                <button
                                  onClick={confirmEmailOtp}
                                  disabled={verifyingEmail || !emailOtp || sendingEmailOtp}
                                  className="px-4 py-2.5 bg-[#23471d] text-white text-[10px] uppercase font-bold tracking-wider rounded-sm hover:bg-[#1a3a14] transition-all shadow-md active:scale-95"
                                >
                                  {verifyingEmail ? "..." : "Verify"}
                                </button>
                              </div>
                            ) : <div className="hidden md:block h-10" />}
                          </div>
                        </div>
                      )}

                      <div>
                        <textarea
                          name="message" placeholder="Tell us more about your inquiry..." value={formData.message} onChange={handleChange} rows={5}
                          className={`w-full px-4 py-3 border-2 text-sm outline-none transition-colors resize-none ${errors.message ? "border-red-400" : "border-slate-200 focus:border-[#23471d]"}`}
                        />
                        {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
                      </div>

                      <button
                        onClick={handleSubmit} disabled={submitting}
                        className="w-full bg-[#23471d] hover:bg-[#1a3a14] disabled:bg-slate-300 text-white font-bold py-4 px-6 uppercase tracking-widest text-sm transition-all duration-300 flex items-center justify-center gap-2"
                      >
                        {submitting ? (<><Loader2 className="w-4 h-4 animate-spin" />Sending...</>) : (<>Send Message <Send className="w-4 h-4" /></>)}
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* MAP */}
      {settings?.mapIframe && (
        <section className="py-16 bg-white border-t border-slate-100">
          <div className="container mx-auto px-4" data-aos="fade-up">
            <div className="overflow-hidden shadow-lg border border-slate-100 min-h-[420px] flex items-center justify-center bg-slate-50">
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
