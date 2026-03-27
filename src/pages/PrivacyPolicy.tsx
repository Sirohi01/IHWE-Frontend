import React from "react";
import { motion } from "framer-motion";
import { Shield, Lock, Eye, FileText } from "lucide-react";

const PrivacyPolicy = () => {
  return (
    <div className="bg-[#f9fafb] min-h-screen font-inter">
      {/* Hero Section */}
      <section className="relative pt-36 pb-20 overflow-hidden bg-slate-900 text-white">
        <div className="absolute inset-0 bg-black/40" />
        <div className="container mx-auto px-4 text-center relative z-10" data-aos="fade-up">
          <p className="text-sm uppercase tracking-[0.4em] mb-4 opacity-80">Legal Information</p>
          <h1 className="text-4xl md:text-6xl font-serif font-semibold mb-6 italic tracking-tight">
            Privacy Policy
          </h1>
          <p className="text-white/70 text-base md:text-lg mb-8 max-w-2xl mx-auto font-light leading-relaxed">
            Your privacy is important to us. This policy outlines how we collect, use, and protect your information.
          </p>
        </div>
        <div
          className="absolute bottom-0 left-0 w-full h-16 bg-[#f9fafb]"
          style={{ clipPath: "ellipse(60% 100% at 50% 100%)" }}
        />
      </section>

      {/* Content Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white p-8 md:p-12 shadow-sm border border-slate-100 space-y-12 text-slate-700 leading-relaxed"
          >
            {/* Introduction */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <Shield className="w-8 h-8 text-[#d26019]" />
                <h2 className="text-2xl md:text-3xl font-serif font-bold text-slate-900">1. Introduction</h2>
              </div>
              <p>
                Welcome to the International Health & Wellness Expo 2026 (IHWE). We are committed to protecting your personal data and your privacy. This Privacy Policy explains how Encodancy Pvt Ltd ("we", "us", or "our") collects, uses, and shares information about you when you visit our website or participate in our events.
              </p>
            </div>

            {/* Information We Collect */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <Eye className="w-8 h-8 text-[#d26019]" />
                <h2 className="text-2xl md:text-3xl font-serif font-bold text-slate-900">2. Information We Collect</h2>
              </div>
              <p className="mb-4">
                We collect information that you provide directly to us when you:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Register for the expo as a visitor, exhibitor, or speaker.</li>
                <li>Fill out contact forms or inquiry forms.</li>
                <li>Subscribe to our newsletter or updates.</li>
                <li>Communicate with us via email or phone.</li>
              </ul>
              <p className="mt-4">
                This information may include your name, email address, phone number, job title, company name, and any other details you choose to provide.
              </p>
            </div>

            {/* How We Use Your Information */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <FileText className="w-8 h-8 text-[#d26019]" />
                <h2 className="text-2xl md:text-3xl font-serif font-bold text-slate-900">3. How We Use Your Information</h2>
              </div>
              <p className="mb-4">
                We use the information we collect to:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Process your registration and manage your participation in the event.</li>
                <li>Respond to your inquiries and provide customer support.</li>
                <li>Send you event-related updates, newsletters, and promotional materials.</li>
                <li>Improve our website and event services.</li>
                <li>Comply with legal obligations.</li>
              </ul>
            </div>

            {/* Data Protection */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <Lock className="w-8 h-8 text-[#d26019]" />
                <h2 className="text-2xl md:text-3xl font-serif font-bold text-slate-900">4. Data Protection</h2>
              </div>
              <p>
                We implement a variety of security measures to maintain the safety of your personal information. Your personal information is contained behind secured networks and is only accessible by a limited number of persons who have special access rights to such systems and are required to keep the information confidential.
              </p>
            </div>

            {/* Cookies */}
            <div>
              <h2 className="text-2xl md:text-3xl font-serif font-bold text-slate-900 mb-6">5. Cookies</h2>
              <p>
                Our website uses cookies to enhance your browsing experience. Cookies are small files that a site or its service provider transfers to your computer's hard drive through your Web browser (if you allow) that enables the site's or service provider's systems to recognize your browser and capture and remember certain information.
              </p>
            </div>

            {/* Contact Us */}
            <div className="pt-8 border-t border-slate-100">
              <h2 className="text-2xl md:text-3xl font-serif font-bold text-slate-900 mb-6">Contact Us</h2>
              <p className="mb-4">
                If you have any questions regarding this privacy policy, you may contact us using the information below:
              </p>
              <div className="space-y-2 text-sm">
                <p className="font-bold text-slate-900">Encodancy Pvt Ltd</p>
                <p>12/29, Site-II, Loni Road, Industrial Area, Mohan Nagar, Ghaziabad, India</p>
                <p>Email: info@healthwellnessexpo.com</p>
                <p>Phone: +91 98765 43210</p>
              </div>
            </div>

            <div className="text-xs text-slate-400 pt-10">
              Last Updated: March 19, 2026
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default PrivacyPolicy;
