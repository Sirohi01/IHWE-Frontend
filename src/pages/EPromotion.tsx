import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageCircle, Mail, Share2, CheckCircle, Loader2, Send,
  Users, Globe, ArrowRight, Zap, Target, Rocket, Briefcase, Star
} from "lucide-react";
import { ePromotionApi, heroBackgroundApi, SERVER_URL } from "@/lib/api";

// ── Sub-components defined OUTSIDE to prevent remount on re-render ──────────
const InputField = ({
  type = "text",
  name,
  placeholder,
  value,
  onChange,
  error,
}: {
  type?: string;
  name: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
}) => (
  <div>
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`w-full px-4 py-3 border-2 text-sm outline-none transition-colors font-inter ${error ? "border-red-400" : "border-slate-200 focus:border-[#23471d]"
        }`}
    />
    {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
  </div>
);

const ICONS_MAP: Record<string, any> = {
  MessageCircle, Mail, Share2, Globe, Zap, Target, Rocket, Users, Briefcase, Star
};

// ── Why promote bullet points ────────────────────────────────────────────────
const whyPoints = [
  "Reach 8,000+ verified health professionals",
  "Pre-event & during-event brand visibility",
  "Targeted digital outreach across platforms",
  "Year-round global marketing campaigns",
  "Connect with B2B buyers & decision-makers",
];

// ── Quick stat cards for left panel ──────────────────────────────────────────
const statCards = [
  { icon: Users, label: "Event Attendees", value: "8,000+", color: "#23471d" },
  { icon: Globe, label: "Countries Represented", value: "25+", color: "#d26019" },
];

// ── Main Page ────────────────────────────────────────────────────────────────
const EPromotion = () => {
  const [heroData, setHeroData] = useState<any>(null);
  const [data, setData] = useState({
    subheading: 'Promotion',
    title: 'Boost Your Brand Before & During the Expo!',
    highlightText: 'During the Expo!',
    shortDescription: '',
    cards: []
  });

  const [formData, setFormData] = useState({
    name: "", company: "", email: "", mobile: "", message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    fetchContent();
    fetchHero();
  }, []);

  const fetchHero = async () => {
    try {
      const res = await heroBackgroundApi.getByPage("Exhibit / E-Promotion");
      if (res) setHeroData(res);
    } catch (err) {
      console.error("Hero fetch error:", err);
    }
  };

  const fetchContent = async () => {
    try {
      const res = await ePromotionApi.getContent();
      if (res) setData(res);
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validate = () => {
    const e: Record<string, string> = {};
    let ok = true;
    if (!formData.name.trim() || formData.name.trim().length < 2) { e.name = "Please enter your full name."; ok = false; }
    if (!formData.company.trim()) { e.company = "Please enter your company name."; ok = false; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) { e.email = "Please enter a valid email address."; ok = false; }
    if (!/^[0-9]{7,15}$/.test(formData.mobile.replace(/[^0-9]/g, ""))) { e.mobile = "Please enter a valid mobile number."; ok = false; }
    setErrors(e);
    return ok;
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    setSubmitting(true);
    try {
      const res = await ePromotionApi.submitEnquiry(formData);
      if (res.success) {
        setIsSuccess(true);
        setTimeout(() => {
          setFormData({ name: "", company: "", email: "", mobile: "", message: "" });
          setIsSuccess(false);
        }, 4000);
      }
    } catch (err) {
      console.error("Submit error:", err);
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
          backgroundImage: heroData?.backgroundImage ? `url(${SERVER_URL}${heroData.backgroundImage})` : "none",
          backgroundColor: "#1a3516"
        }}
      >
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute bottom-0 left-0 w-full h-4 md:h-8 bg-[#f9fafb]" style={{ clipPath: "ellipse(60% 100% at 50% 100%)" }} />
        <div className="container mx-auto px-4 text-center text-white relative z-10" data-aos="fade-up">
          <p className="text-sm uppercase tracking-[0.4em] mb-4 opacity-80">
            {heroData?.title || "Exhibit · Exhibit"}
          </p>
          <h1 className="text-4xl md:text-6xl font-serif font-semibold mb-6 italic tracking-tight">
            {heroData?.heading || "E-Promotion Opportunities"}
          </h1>
          <p className="text-white/70 text-base md:text-lg mb-8 max-w-2xl mx-auto font-light leading-relaxed">
            {heroData?.shortDescription || "Take advantage of exclusive online promotion opportunities with the 9th International Expo."}
          </p>
        </div>
      </section>

      {/* ── MAIN CONTENT ─────────────────────────────────────────────────── */}
      <section className="mt-8 md:-mt-8 pb-16 relative z-20 bg-[#f9fafb]">
        <div className="container mx-auto px-4 max-w-5xl">

          {/* Main heading */}
          <div className="text-center mb-12 pt-4" data-aos="fade-up">
            <div className="flex items-center justify-center gap-3 mb-3">
              <div className="h-px w-8 bg-[#23471d]" />
              <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#23471d]">{data.subheading}</span>
              <div className="h-px w-8 bg-[#23471d]" />
            </div>
            <h2 className="text-3xl md:text-4xl font-serif text-slate-900 leading-tight">
              {data.title.split(data.highlightText)[0]}
              <span className="text-[#d26019]">{data.highlightText}</span>
              {data.title.split(data.highlightText)[1]}
            </h2>
            <p className="text-slate-500 text-sm md:text-base mt-4 max-w-2xl mx-auto leading-relaxed normal-case">
              {data.shortDescription}
            </p>
          </div>

          {/* ── Channel Cards — border-2 border-slate-200 + shadow ───────── */}
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            {data.cards.map((ch: any, i: number) => {
              const Icon = ICONS_MAP[ch.icon] || Star;
              return (
                <motion.div
                  key={i}
                  data-aos="fade-up"
                  data-aos-delay={i * 100}
                  whileHover={{ y: -4 }}
                  className="bg-white border-2 border-slate-200 shadow-sm hover:shadow-xl hover:border-slate-300 transition-all duration-300 p-8 flex flex-col items-center text-center group"
                >
                  <div
                    className="w-14 h-14 rounded-full flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110"
                    style={{ backgroundColor: `${ch.color}18` }}
                  >
                    <Icon className="w-7 h-7" style={{ color: ch.color }} />
                  </div>
                  <h3 className="font-bold text-slate-800 text-base mb-2 uppercase">{ch.title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed normal-case font-normal">{ch.description}</p>
                </motion.div>
              );
            })}
          </div>

          {/* ── ENQUIRY SECTION ─────────────────────────────────────────── */}
          <div data-aos="fade-up">
            <div className="text-center mb-10">
              <div className="flex items-center justify-center gap-3 mb-3">
                <div className="h-px w-8 bg-[#23471d]" />
                <span className="text-xs font-bold uppercase tracking-[0.4em] text-[#23471d]">Get In Touch</span>
                <div className="h-px w-8 bg-[#23471d]" />
              </div>
              <h2 className="text-3xl md:text-4xl font-serif text-slate-900">
                Interested in <span className="text-[#23471d]">Promoting Your Brand?</span>
              </h2>
            </div>

            <AnimatePresence mode="wait">
              {isSuccess ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="bg-white border-2 border-green-500 p-12 shadow-lg flex flex-col items-center justify-center min-h-[480px]"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                  >
                    <CheckCircle className="w-24 h-24 text-green-500 mb-6" />
                  </motion.div>

                  <motion.h3
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-3xl font-bold text-gray-900 mb-4 text-center"
                  >
                    Enquiry Submitted Successfully!
                  </motion.h3>

                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="text-gray-600 text-center mb-8 max-w-md text-lg italic"
                  >
                    Thank you for your interest. Our promotions team will review your enquiry and contact you within 24 hours.
                  </motion.p>

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="flex items-center gap-2 text-sm text-gray-500"
                  >
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    Form will reset automatically...
                  </motion.div>
                </motion.div>
              ) : (
                <motion.div
                  key="form"
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="grid lg:grid-cols-5 gap-6"
                >
                  {/* ── LEFT panel — Design House career page style ─────── */}
                  <div className="lg:col-span-2 flex flex-col gap-4">

                    {/* Stat cards — like Phone/Email cards in reference */}
                    {statCards.map((s) => (
                      <div
                        key={s.label}
                        className="flex items-start gap-4 p-5 bg-white border-2 border-slate-200 shadow-sm hover:shadow-md hover:border-[#23471d]/30 transition-all duration-300 group"
                      >
                        <div
                          className="w-11 h-11 flex items-center justify-center shrink-0 transition-colors duration-300 group-hover:opacity-90"
                          style={{ backgroundColor: `${s.color}15` }}
                        >
                          <s.icon className="w-5 h-5" style={{ color: s.color }} />
                        </div>
                        <div>
                          <div className="text-[11px] font-bold uppercase tracking-widest mb-1" style={{ color: s.color }}>
                            {s.label}
                          </div>
                          <div className="text-xl font-bold text-slate-800">{s.value}</div>
                        </div>
                      </div>
                    ))}

                    {/* Why Promote With Us box — like "Why Join Us?" in reference */}
                    <div className="p-5 bg-white border-2 border-[#23471d]/30 shadow-sm">
                      <h4 className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#23471d] mb-3">
                        Why Promote With Us?
                      </h4>
                      <ul className="space-y-2">
                        {whyPoints.map((pt) => (
                          <li key={pt} className="flex items-start gap-2 text-sm text-slate-600">
                            <ArrowRight className="w-4 h-4 text-[#d26019] shrink-0 mt-0.5" />
                            {pt}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* ── RIGHT: Form — border-2 border-slate-200 ─────────── */}
                  <div className="lg:col-span-3 border-2 border-slate-200 bg-white p-8 shadow-sm">
                    <div className="space-y-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        <InputField name="name" placeholder="Your Name *" value={formData.name} onChange={handleChange} error={errors.name} />
                        <InputField name="company" placeholder="Company Name *" value={formData.company} onChange={handleChange} error={errors.company} />
                      </div>
                      <div className="grid md:grid-cols-2 gap-4">
                        <InputField type="email" name="email" placeholder="Email Address *" value={formData.email} onChange={handleChange} error={errors.email} />
                        <InputField type="tel" name="mobile" placeholder="Mobile Number *" value={formData.mobile} onChange={handleChange} error={errors.mobile} />
                      </div>
                      <textarea
                        name="message"
                        placeholder="Your Message / Interest"
                        value={formData.message}
                        onChange={handleChange}
                        rows={5}
                        className="w-full px-4 py-3 border-2 border-slate-200 focus:border-[#23471d] text-sm outline-none transition-colors resize-none font-inter"
                      />
                      <button
                        onClick={handleSubmit}
                        disabled={submitting}
                        className="w-full bg-[#DE802B] hover:bg-[#c97024] disabled:bg-slate-300 text-white font-bold py-4 px-6 uppercase tracking-widest text-sm transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
                      >
                        {submitting ? (
                          <><Loader2 className="w-4 h-4 animate-spin" /> Sending...</>
                        ) : (
                          <>Submit Enquiry <Send className="w-4 h-4" /></>
                        )}
                      </button>
                    </div>
                  </div>

                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>
      </section>
    </div>
  );
};

export default EPromotion;
