import React from "react";
import { motion } from "framer-motion";
import { FileText, Gavel, AlertCircle, Info } from "lucide-react";

const TermsOfService = () => {
  return (
    <div className="bg-[#f9fafb] min-h-screen font-inter">
      {/* Hero Section */}
      <section className="relative pt-36 pb-20 overflow-hidden bg-slate-900 text-white">
        <div className="absolute inset-0 bg-black/40" />
        <div className="container mx-auto px-4 text-center relative z-10" data-aos="fade-up">
          <p className="text-sm uppercase tracking-[0.4em] mb-4 opacity-80">Legal Information</p>
          <h1 className="text-4xl md:text-6xl font-serif font-semibold mb-6 italic tracking-tight">
            Terms of Service
          </h1>
          <p className="text-white/70 text-base md:text-lg mb-8 max-w-2xl mx-auto font-light leading-relaxed">
            Please read these terms carefully before using our website or participating in our event.
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
            {/* Agreement to Terms */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <Info className="w-8 h-8 text-[#d26019]" />
                <h2 className="text-2xl md:text-3xl font-serif font-bold text-slate-900">1. Agreement to Terms</h2>
              </div>
              <p>
                By accessing our website (healthwellnessexpo.com) or registering for the International Health & Wellness Expo (IHWE), you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our site or register for the event.
              </p>
            </div>

            {/* Intellectual Property */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <FileText className="w-8 h-8 text-[#d26019]" />
                <h2 className="text-2xl md:text-3xl font-serif font-bold text-slate-900">2. Intellectual Property</h2>
              </div>
              <p>
                All content on this website, including text, graphics, logos, images, and software, is the property of Encodancy Pvt Ltd or its sponsors/partners and is protected by intellectual property laws. You may not use, reproduce, or distribute any content without our prior written permission.
              </p>
            </div>

            {/* Use of Site */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <AlertCircle className="w-8 h-8 text-[#d26019]" />
                <h2 className="text-2xl md:text-3xl font-serif font-bold text-slate-900">3. Use of Site</h2>
              </div>
              <p className="mb-4">
                You agree to use the site only for lawful purposes. You are prohibited from:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Using the site in any way that violates local, state, or international laws.</li>
                <li>Engaging in any conduct that disrupts or interferes with the site's functionality.</li>
                <li>Attempting to gain unauthorized access to any portion of the site.</li>
                <li>Using any automated means (like bots) to access the site without permission.</li>
              </ul>
            </div>

            {/* Limitation of Liability */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <Gavel className="w-8 h-8 text-[#d26019]" />
                <h2 className="text-2xl md:text-3xl font-serif font-bold text-slate-900">4. Limitation of Liability</h2>
              </div>
              <p>
                Encodancy Pvt Ltd will not be liable for any damages of any kind arising from the use of this site or from your participation in the event, including but not limited to direct, indirect, incidental, punitive, and consequential damages.
              </p>
            </div>

            {/* Governing Law */}
            <div>
              <h2 className="text-2xl md:text-3xl font-serif font-bold text-slate-900 mb-6">5. Governing Law</h2>
              <p>
                These terms are governed by and construed in accordance with the laws of India. Any disputes relating to these terms will be subject to the exclusive jurisdiction of the courts in Ghaziabad, India.
              </p>
            </div>

            {/* Changes to Terms */}
            <div>
              <h2 className="text-2xl md:text-3xl font-serif font-bold text-slate-900 mb-6">6. Changes to Terms</h2>
              <p>
                We reserve the right to modify these Terms of Service at any time. Any changes will be effective immediately upon posting on the site. Your continued use of the site or registration for the event after any changes constitutes your acceptance of the new terms.
              </p>
            </div>

            {/* Contact Us */}
            <div className="pt-8 border-t border-slate-100">
              <h2 className="text-2xl md:text-3xl font-serif font-bold text-slate-900 mb-6">Contact Us</h2>
              <p className="mb-4">
                If you have any questions regarding these Terms of Service, you may contact us using the information below:
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

export default TermsOfService;
