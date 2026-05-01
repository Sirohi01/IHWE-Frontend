import { Phone, Mail, Globe, ShieldCheck, CheckCircle2, UserCheck, Trophy, Globe2, ShieldQuestion, Award } from "lucide-react";

const AWARD_CATEGORIES = [
  "Best Hospital / Healthcare Institution",
  "Excellence in Medical Practice",
  "Ayurveda & Natural Healing Leader",
  "Wellness & Spa Brand of the Year",
  "Fitness Innovation Award",
  "Nutrition & Organic Excellence",
  "Medical Tourism Excellence",
  "Healthcare Startup of the Year",
  "Women Leadership in Healthcare",
  "Lifetime Achievement Award",
];

const NominationSidebar = () => (
  <div className="w-full space-y-3">

    {/* About the Awards */}
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
      {/* Dark navy top section */}
      <div className="bg-[#0a2e5c] px-5 py-5">
        <h3 className="text-white font-black text-[14px] uppercase tracking-wide mb-2">About The Awards</h3>
        <div className="w-8 h-[2px] bg-white/40 mb-4"></div>
        <p className="text-white/85 text-[12px] leading-relaxed mb-3">
          The Namo Gange Global Health Excellence Awards recognizes outstanding contributions and remarkable achievements in the field of healthcare, wellness and holistic well-being.
        </p>
        <p className="text-white/85 text-[12px] leading-relaxed">
          These awards honor individuals, organizations and institutions that are shaping a healthier, stronger and more compassionate world.
        </p>
      </div>
      {/* White bottom section with benefit items */}
      <div className="p-4 space-y-4">
        <BenefitItem icon={<UserCheck className="w-5 h-5 text-[#008d48]" />} title="Credible Jury" desc="Industry Experts" />
        <BenefitItem icon={<Trophy className="w-5 h-5 text-[#008d48]" />} title="Transparent Process" desc="Fair Evaluation" />
        <BenefitItem icon={<Globe2 className="w-5 h-5 text-[#008d48]" />} title="National & Global" desc="Recognition" />
        <BenefitItem icon={<ShieldQuestion className="w-5 h-5 text-[#008d48]" />} title="Trusted & Prestigious" desc="Platform" />
      </div>
    </div>

    {/* Award Categories */}
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4">
      <h3 className="text-[#008d48] font-black text-[14px] uppercase tracking-widest mb-3">Award Categories</h3>
      <ul className="space-y-2">
        {AWARD_CATEGORIES.map((cat, i) => (
          <li key={i} className="flex items-start gap-2">
            <Award className="w-3.5 h-3.5 text-[#008d48] shrink-0 mt-0.5" />
            <span className="text-slate-600 text-[11px] leading-tight">{cat}</span>
          </li>
        ))}
      </ul>
    </div>

    {/* Why Participate */}
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4">
      <h3 className="text-[#008d48] font-black text-[14px] uppercase tracking-widest mb-3">Why Participate?</h3>
      <ul className="space-y-2">
        {[
          "National & Global Recognition",
          "Boost Brand Visibility",
          "Networking with Industry Leaders",
          "Media Coverage & Promotion",
          "Association with IHWE Platform",
          "Investor & Partnership Opportunities",
        ].map((item, i) => (
          <li key={i} className="flex items-start gap-2">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#008d48] shrink-0 mt-0.5" />
            <span className="text-slate-600 text-[11.5px] leading-tight">{item}</span>
          </li>
        ))}
      </ul>
    </div>

    {/* Important Notes */}
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4">
      <h3 className="text-[#0a2e5c] font-black text-[14px] uppercase tracking-widest mb-3">Important Notes</h3>
      <ul className="space-y-2">
        {[
          "All fields marked with * are mandatory.",
          "Ensure all details are accurate before submission.",
          "Shortlisted nominees will be contacted via email / phone.",
        ].map((text, i) => (
          <li key={i} className="flex items-start gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-[#008d48] mt-1.5 shrink-0" />
            <span className="text-slate-500 text-[11.5px] leading-tight">{text}</span>
          </li>
        ))}
      </ul>
    </div>

    {/* Need Help */}
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4">
      <h3 className="text-[#0a2e5c] font-black text-[14px] uppercase tracking-widest mb-1">Need Help?</h3>
      <p className="text-slate-400 text-[10px] font-medium mb-3">Our team is here to assist you.</p>
      <div className="space-y-2.5">
        <ContactLink icon={<Phone className="w-3.5 h-3.5" />} text="+91 93104 68663" href="tel:+919310468663" />
        <ContactLink icon={<Mail className="w-3.5 h-3.5" />} text="info@ihwe.in" href="mailto:info@ihwe.in" />
        <ContactLink icon={<Globe className="w-3.5 h-3.5" />} text="www.ihwe.in" href="https://www.ihwe.in" />
      </div>
    </div>

    {/* Secure Badge */}
    <div className="bg-[#edf7f2] rounded-xl border border-[#c4e9d6] p-4 flex items-center gap-3">
      <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm shrink-0">
        <ShieldCheck className="w-5 h-5 text-[#008d48]" />
      </div>
      <div>
        <h4 className="text-[#0a2e5c] text-[10.5px] font-black uppercase tracking-wide">Secure & Confidential</h4>
        <p className="text-slate-500 text-[10px] mt-0.5 leading-tight">Your data is safe with us and will not be shared with third parties.</p>
      </div>
    </div>

  </div>
);

const BenefitItem = ({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) => (
  <div className="flex items-center gap-3">
    <div className="w-10 h-10 bg-[#edf7f2] rounded-full flex items-center justify-center shrink-0">
      {icon}
    </div>
    <div>
      <p className="text-[#0a2e5c] text-[13px] font-bold leading-tight">{title}</p>
      <p className="text-slate-400 text-[11.5px] mt-0.5">{desc}</p>
    </div>
  </div>
);

const ContactLink = ({ icon, text, href }: { icon: React.ReactNode; text: string; href: string }) => (
  <a href={href} className="flex items-center gap-3 group">
    <span className="text-slate-400 group-hover:text-[#008d48] transition-colors">{icon}</span>
    <span className="text-slate-600 text-[11.5px] group-hover:text-[#008d48] transition-colors">{text}</span>
  </a>
);

export default NominationSidebar;

