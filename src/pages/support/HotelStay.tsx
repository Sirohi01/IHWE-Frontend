import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight, Mail, Phone, MapPin,
  ChevronRight, HelpCircle,
  ShieldCheck, Zap, HeartHandshake,
  MessageCircle
} from "lucide-react";

// Assets
import who1 from "../../assets/who1.png";
import who2 from "../../assets/who2.png";
import who3 from "../../assets/who3.png";
import who4 from "../../assets/who4.png";
import who5 from "../../assets/who5.png";
import part11 from "../../assets/part11.webp";
import part22 from "../../assets/part22.webp";
import part33 from "../../assets/part33.webp";
import part44 from "../../assets/part44.webp";
import part55 from "../../assets/part55.webp";
import part66 from "../../assets/part66.webp";

const HotelStay = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    checkIn: "",
    checkOut: "",
    guests: "",
    category: "",
    requirements: ""
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);
  };

  const serviceCards = [
    { title: "Hotel & Stay", icon: part11, desc: "Handpicked hotels at exclusive rates for exhibitors, buyers and delegates.", active: true },
    { title: "Travel Assistance", icon: part22, desc: "Flight bookings, airport transfers, local transport and complete travel arrangements." },
    { title: "Stall Design & Fabrication", icon: part33, desc: "Creative stall design, fabrication and installation to make your brand stand out." },
    { title: "Logistics Support", icon: part44, desc: "Freight forwarding, customs clearance, storage and material handling support." },
    { title: "Printing & Branding", icon: part55, desc: "High-quality printing, signage and branding solutions for maximum visibility." },
    { title: "Hospitality Desk", icon: part66, desc: "On-ground assistance for all your queries to ensure a smooth and pleasant experience." },
  ];

  const whyItems = [
    { img: who1, title: "Exclusive Benefits", desc: "Special rates and value added services." },
    { img: who2, title: "Verified Partners", desc: "Trusted and verified service providers." },
    { img: who3, title: "Time & Cost Saving", desc: "Save time and cost with our efficient solutions." },
    { img: who4, title: "Experienced Team", desc: "Professional team with years of experience." },
    { img: who5, title: "End-to-End Support", desc: "From planning to execution, we are with you at every step." },
  ];

  const steps = [
    { step: "1", title: "Submit Your Requirement", desc: "Fill out the inquiry form with your needs." },
    { step: "2", title: "We Connect With You", desc: "Our team will reach out to understand better." },
    { step: "3", title: "Get Customized Options", desc: "We provide the best options for you." },
    { step: "4", title: "Confirm & Relax", desc: "Confirm and leave the rest to us." },
    { step: "5", title: "Enjoy A Seamless Experience", desc: "Focus on your event, we handle everything." },
  ];

  const testimonials = [
    { name: "Rahul Mehta", role: "Exhibitor", quote: "The hotel and travel arrangements were flawless. Great support!", img: "https://randomuser.me/api/portraits/men/32.jpg" },
    { name: "Anita Sharma", role: "Buyer", quote: "Very professional team and on-time delivery of all services.", img: "https://randomuser.me/api/portraits/women/44.jpg" },
    { name: "Vikram S.", role: "Delegate", quote: "Their logistics and on-ground support made our participation stress-free.", img: "https://randomuser.me/api/portraits/men/67.jpg" },
  ];

  return (
    <div className="bg-white min-h-screen font-inter">

      {/* ══════════════════════════════════════
          HERO SECTION — height kept moderate
      ══════════════════════════════════════ */}
      <section className="relative h-[420px] overflow-hidden">
        {/* BG Image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=1600')` }}
        >
          <div className="absolute inset-0 bg-black/38" />
          <div className="absolute inset-y-0 left-0 w-full lg:w-[50%] bg-gradient-to-r from-[#001507]/95 via-[#001507]/80 to-transparent z-10" />
        </div>

        <div className="container mx-auto px-4 lg:pl-14 relative z-20 h-full flex flex-col justify-center">
          <div className="max-w-xl text-white space-y-4">

            <motion.div
              initial={{ opacity: 0, x: -24 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-2 text-[#74b123] font-bold tracking-[0.18em] uppercase text-[11px]"
            >
              <div className="h-px w-7 bg-[#74b123]" />
              Our Support Services
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl font-black leading-tight"
            >
              We Make Your <br />
              <span className="text-[#74b123]">Experience Seamless</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-[14px] text-white/80 max-w-md leading-relaxed font-medium"
            >
              From comfortable stays to seamless logistics, we provide end-to-end support so you can focus on what matters most.
            </motion.p>

            {/* 4 Mini Feature Icons */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-wrap gap-6 pt-3"
            >
              {[
                { icon: <ShieldCheck className="w-5 h-5" />, label: "Trusted Network" },
                { icon: <Zap className="w-5 h-5" />, label: "End-to-End Solutions" },
                { icon: <MapPin className="w-5 h-5" />, label: "On-Ground Assistance" },
                { icon: <HeartHandshake className="w-5 h-5" />, label: "Customer First" },
              ].map((item, i) => (
                <div key={i} className="flex flex-col items-center gap-1.5 text-center group cursor-default">
                  <div className="p-2.5 rounded-full bg-white/10 group-hover:bg-[#74b123] transition-colors">
                    {item.icon}
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider">{item.label}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          SUPPORT SERVICES + FORM
      ══════════════════════════════════════ */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 lg:px-14">
          <div className="flex flex-col lg:flex-row gap-10">

            {/* LEFT: Services Grid */}
            <div className="w-full lg:w-[65%]">
              <div className="flex items-center gap-3 mb-7">
                <div className="h-px w-10 bg-[#2e7d32]" />
                <h2 className="text-xl font-black text-[#00153c] uppercase tracking-wider">Our Support Services</h2>
                <div className="h-px w-10 bg-[#2e7d32]" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {serviceCards.map((card, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.07 }}
                    viewport={{ once: true }}
                    className={`p-5 rounded-2xl border transition-all duration-300 group flex flex-col justify-between min-h-[160px] ${card.active
                      ? "border-[#2e7d32] bg-[#f7fff4] shadow-md ring-1 ring-[#2e7d32]/20"
                      : "border-slate-100 hover:border-[#2e7d32]/30 hover:bg-slate-50 shadow-sm"
                      }`}
                  >
                    <div>
                      <div className="w-10 h-10 mb-3">
                        <img src={card.icon} alt={card.title} className="w-full h-full object-contain" />
                      </div>
                      <h3 className="text-[12px] font-black text-[#00153c] uppercase mb-1.5 tracking-tight leading-snug">{card.title}</h3>
                      <p className="text-[11px] text-slate-600 font-medium leading-relaxed">{card.desc}</p>
                    </div>
                    <button className="mt-3 flex items-center gap-1.5 text-[10px] font-black text-[#2e7d32] uppercase tracking-widest group-hover:gap-2.5 transition-all">
                      Learn More <ArrowRight className="w-3 h-3" />
                    </button>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* RIGHT: Booking Form */}
            <div className="w-full lg:w-[35%]">
              <div className="bg-[#002511] rounded-3xl p-7 shadow-2xl text-white sticky top-24">
                <div className="mb-5">
                  <h3 className="text-[17px] font-black mb-1.5">Need Help with Your Stay?</h3>
                  <p className="text-[12px] text-white/65 font-medium leading-relaxed">
                    Send us your requirements and our team will get back to you shortly.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="text" name="fullName" placeholder="Full Name"
                      value={formData.fullName} onChange={handleChange}
                      className="w-full bg-white/5 border border-white/20 rounded-lg px-3 py-2.5 text-[12px] focus:outline-none focus:border-[#74b123] transition-colors placeholder:text-white/40"
                    />
                    <input
                      type="email" name="email" placeholder="Email Address"
                      value={formData.email} onChange={handleChange}
                      className="w-full bg-white/5 border border-white/20 rounded-lg px-3 py-2.5 text-[12px] focus:outline-none focus:border-[#74b123] transition-colors placeholder:text-white/40"
                    />
                  </div>

                  <input
                    type="tel" name="phone" placeholder="Mobile Number"
                    value={formData.phone} onChange={handleChange}
                    className="w-full bg-white/5 border border-white/20 rounded-lg px-3 py-2.5 text-[12px] focus:outline-none focus:border-[#74b123] transition-colors placeholder:text-white/40"
                  />

                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="date" name="checkIn"
                      value={formData.checkIn} onChange={handleChange}
                      className="w-full bg-white/5 border border-white/20 rounded-lg px-3 py-2.5 text-[12px] text-white/60 focus:outline-none focus:border-[#74b123] transition-colors"
                    />
                    <input
                      type="date" name="checkOut"
                      value={formData.checkOut} onChange={handleChange}
                      className="w-full bg-white/5 border border-white/20 rounded-lg px-3 py-2.5 text-[12px] text-white/60 focus:outline-none focus:border-[#74b123] transition-colors"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <select
                      name="guests" value={formData.guests} onChange={handleChange}
                      className="w-full bg-white/5 border border-white/20 rounded-lg px-3 py-2.5 text-[12px] text-white/60 focus:outline-none focus:border-[#74b123] transition-colors"
                    >
                      <option value="">Number of Guests</option>
                      <option value="1">1 Person</option>
                      <option value="2">2 Persons</option>
                      <option value="3+">3+ Persons</option>
                    </select>
                    <select
                      name="category" value={formData.category} onChange={handleChange}
                      className="w-full bg-white/5 border border-white/20 rounded-lg px-3 py-2.5 text-[12px] text-white/60 focus:outline-none focus:border-[#74b123] transition-colors"
                    >
                      <option value="">Preferred Category</option>
                      <option value="5star">5-Star Luxury</option>
                      <option value="4star">4-Star Deluxe</option>
                      <option value="budget">Budget-Friendly</option>
                    </select>
                  </div>

                  <textarea
                    name="requirements" placeholder="Additional Requirements (Optional)" rows={3}
                    value={formData.requirements} onChange={handleChange}
                    className="w-full bg-white/5 border border-white/20 rounded-lg px-3 py-2.5 text-[12px] focus:outline-none focus:border-[#74b123] transition-colors resize-none placeholder:text-white/40"
                  />

                  <button
                    type="submit"
                    className="w-full bg-[#2e7d32] hover:bg-[#1e5221] text-white py-3.5 rounded-xl font-black text-[11px] uppercase tracking-widest transition-all shadow-lg active:scale-[0.98]"
                  >
                    Submit Inquiry
                  </button>
                </form>

                {/* Quick Contact */}
                <div className="mt-6 pt-6 border-t border-white/10 space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-[#74b123]/20 rounded-xl text-[#74b123]">
                      <HelpCircle className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-wider mb-0.5">Quick Contact</p>
                      <p className="text-[11px] text-white/55 leading-relaxed">Our support team is available 24x7 to assist you.</p>
                    </div>
                  </div>
                  <div className="space-y-1.5 pl-11">
                    <a href="tel:+91 9654900525" className="flex items-center gap-2 text-[12px] font-bold hover:text-[#74b123] transition-colors">
                      <Phone className="w-3 h-3" /> +91 9654900525
                    </a>
                    <a href="mailto:support@ihwe.in" className="flex items-center gap-2 text-[12px] font-bold hover:text-[#74b123] transition-colors">
                      <Mail className="w-3 h-3" /> support@ihwe.in
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          WHY CHOOSE US?
      ══════════════════════════════════════ */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4 lg:px-14 text-center">
          <div className="flex items-center justify-center gap-3 mb-10">
            <div className="h-px w-12 bg-[#2e7d32]" />
            <h2 className="text-2xl font-black text-[#00153c] uppercase tracking-wider">Why Choose Our Support Services?</h2>
            <div className="h-px w-12 bg-[#2e7d32]" />
          </div>

          <div className="flex flex-wrap justify-center gap-8 lg:gap-14">
            {whyItems.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                viewport={{ once: true }}
                className="flex flex-col items-center max-w-[150px]"
              >
                <div className="w-14 h-14 mb-3 flex items-center justify-center">
                  <img src={item.img} alt={item.title} className="w-full h-full object-contain" />
                </div>
                <h4 className="text-[11px] font-black text-[#00153c] uppercase mb-1.5 leading-tight">{item.title}</h4>
                <p className="text-[10px] text-slate-600 font-medium leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          HOW IT WORKS
      ══════════════════════════════════════ */}
      <section className="py-16 bg-white overflow-hidden">
        <div className="container mx-auto px-4 lg:px-14 text-center">
          <div className="flex items-center justify-center gap-3 mb-14">
            <div className="h-px w-12 bg-[#2e7d32]" />
            <h2 className="text-2xl font-black text-[#00153c] uppercase tracking-wider">How It Works</h2>
            <div className="h-px w-12 bg-[#2e7d32]" />
          </div>

          <div className="relative">
            {/* Dashed connector line */}
            <div className="absolute top-6 left-[10%] w-[80%] h-px border-t-2 border-dashed border-slate-200 hidden lg:block" />

            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-10 relative z-10">
              {steps.map((item, i) => (
                <div key={i} className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-[#2e7d32] text-white flex items-center justify-center text-lg font-black mb-5 shadow-lg relative z-10">
                    {item.step}
                    {i < 4 && (
                      <div className="absolute -right-3 top-1/2 -translate-y-1/2 lg:hidden">
                        <ChevronRight className="w-4 h-4 text-slate-300" />
                      </div>
                    )}
                  </div>
                  <h4 className="text-[11px] font-black text-[#00153c] uppercase mb-2 px-2 min-h-[36px] flex items-center justify-center leading-snug">
                    {item.title}
                  </h4>
                  <p className="text-[10px] text-slate-500 font-medium leading-relaxed max-w-[130px] mx-auto">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          WHAT OUR CLIENTS SAY
      ══════════════════════════════════════ */}
      <section className="py-16 bg-[#001c27] relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-10"
          style={{ backgroundImage: "radial-gradient(#fff 1px, transparent 1px)", backgroundSize: "40px 40px" }}
        />

        <div className="container mx-auto px-4 lg:px-14 relative z-10">
          <div className="flex items-center justify-center gap-3 mb-12">
            <div className="h-px w-12 bg-[#74b123]" />
            <h2 className="text-2xl font-black text-white uppercase tracking-wider flex items-center gap-2">
              What Our Clients Say <MessageCircle className="w-6 h-6 text-[#74b123]" />
            </h2>
            <div className="h-px w-12 bg-[#74b123]" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="bg-white/5 backdrop-blur-sm p-7 rounded-3xl border border-white/10 hover:bg-white/10 transition-colors group"
              >
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-[#74b123] shrink-0">
                    <img src={item.img} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h4 className="text-white font-black text-[12px] uppercase">{item.name}</h4>
                    <p className="text-[10px] text-[#74b123] font-black uppercase tracking-widest">{item.role}</p>
                  </div>
                </div>
                <p className="text-white/80 text-[12px] font-medium leading-relaxed italic">"{item.quote}"</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          BOTTOM CTA
      ══════════════════════════════════════ */}
      <section className="py-10 bg-white">
        <div className="container mx-auto px-4 lg:px-14">
          <div className="bg-[#f2f9f0] border border-[#2e7d32]/20 rounded-full py-5 px-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-5">
              <div className="w-14 h-14 bg-[#2e7d32] rounded-full flex items-center justify-center text-white shadow-lg shrink-0">
                <Phone className="w-7 h-7" />
              </div>
              <div className="text-left">
                <h3 className="text-[17px] font-black text-[#00153c] uppercase">We Are Here to Support You!</h3>
                <p className="text-[12px] text-slate-600 font-medium">Let us handle the details, so you can focus on greater opportunities.</p>
              </div>
            </div>

            <button className="bg-[#2e7d32] hover:bg-[#1e5221] text-white px-9 py-3.5 rounded-full font-black text-[10px] uppercase tracking-[0.18em] transition-all flex items-center gap-2.5 shadow-lg hover:scale-[1.03] active:scale-[0.98]">
              Contact Support Team <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};

export default HotelStay;