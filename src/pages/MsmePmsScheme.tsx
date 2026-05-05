import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  CheckCircle2,
  ChevronRight,
  FileText,
  HelpCircle,
  Upload,
  Users,
  Globe,
  Building2,
  Mic,
  Calendar,
  Briefcase,
  ShieldCheck,
  TrendingUp,
  Award,
  Download,
  Phone,
  Mail,
  Instagram,
  Facebook,
  Linkedin,
  Youtube,
  ArrowRight,
  IdCard,
  Store,
  Package,
  Landmark,
  Clock,
  Share2,
  Handshake,
  Presentation,
  Timer,
  Megaphone
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";

const MsmePmsScheme = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setSelectedFiles(Array.from(e.target.files));
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files) {
      setSelectedFiles(Array.from(e.dataTransfer.files));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Application Submitted Successfully",
        description: "Our team will review your application and get back to you shortly.",
      });
    }, 2000);
  };

  return (
    <div className="bg-white">
      {/* Breadcrumb - Exactly as per image */}
      {/* <div className="py-4">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="flex items-center gap-2 text-[11px] font-bold text-slate-400 uppercase tracking-[0.15em]">
            <Link to="/" className="hover:text-[#1a3615]">Home</Link>
            <ChevronRight size={10} className="mt-0.5" />
            <Link to="/participate" className="hover:text-[#1a3615]">Participate</Link>
            <ChevronRight size={10} className="mt-0.5" />
            <span className="text-[#1a3615]">MSME PMS Scheme</span>
          </div>
        </div>
      </div> */}

      {/* Hero Section */}
      <section className="relative bg-white overflow-hidden border-b border-slate-100">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative z-20">
          {/* Main Banner Container */}
          <div className="flex flex-col lg:flex-row min-h-[550px]">
            {/* Left Side: Content */}
            <div className="lg:w-[50%] pt-40 sm:pt-4 pb-12 relative z-20 bg-white">

              {/* Gold Ribbon - Fixed position with refined spacing */}
              <div className="absolute top-3 left-4 sm:top-8 lg:left-0 z-30">
                <div className="relative w-28 h-36 lg:w-32 lg:h-44 flex items-center justify-center">
                  <img src="/gold-ribbon.png" alt="Limited Slots" className="absolute inset-0 w-full h-full object-contain" />
                </div>
              </div>

              <div className="mt-4 flex flex-col items-start lg:pl-40">
                <div className="text-[#1a3615] text-[13px] font-black uppercase tracking-[0.25em] mb-2 opacity-70">
                  GOVERNMENT SUPPORT TO GROW YOUR BUSINESS
                </div>
                <h1 className="text-[30px] md:text-[38px] lg:text-[44px] font-extrabold text-[#1a3615] leading-[1.1] mb-4 tracking-[-0.03em] uppercase">
                  <span className="block whitespace-nowrap">MSME PMS SCHEME</span>
                  <span className="text-slate-900 font-extrabold tracking-[-0.04em] block whitespace-nowrap">BENEFITS & REGISTRATION</span>
                </h1>
                <p className="text-[15px] md:text-[16px] text-slate-600 mb-6 max-w-2xl font-bold leading-tight">
                  <span className="block md:whitespace-nowrap">Exhibit at International Health & Wellness Expo 2026 with</span>
                  <span className="block md:whitespace-nowrap">Financial Assistance from Ministry of MSME, Government of India.</span>
                </p>

                {/* Subsidy Box - Final Refinement for Parity */}
                <div className="w-full lg:w-[760px] max-w-[calc(100vw-3rem)] mb-3 shadow-[0_18px_38px_rgba(11,43,15,0.18)] rounded-[16px] overflow-hidden border border-[#f3b71b]/20">
                  <div className="bg-[#0d3b16] px-5 py-4 md:px-8 md:py-5 grid grid-cols-1 md:grid-cols-[auto_1fr] lg:grid-cols-[auto_1fr_auto] items-center gap-4 md:gap-6 relative overflow-hidden">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(255,255,255,0.10),transparent_34%),linear-gradient(135deg,rgba(0,0,0,0.26),transparent_55%)] pointer-events-none"></div>

                    {/* Left: Icon & Amount Container */}
                    <div className="relative flex items-center gap-4 md:gap-6 shrink-0">
                      <div className="relative w-16 h-16 md:w-24 md:h-24 shrink-0 rounded-xl bg-[#0a2f11] flex items-center justify-center">
                        <img
                          src="/msme_application_checklist_graphic2.png"
                          alt="Subsidy Bag"
                          className="w-[90%] h-[90%] object-contain relative z-10"
                        />
                      </div>

                      <div className="flex flex-col min-w-0">
                        <div className="text-white/95 text-[11px] md:text-[13px] font-black leading-none">Get Up To</div>
                        <div className="flex items-start">
                          <span className="text-[#f3b71b] text-[38px] md:text-[54px] font-extrabold leading-[0.85] tracking-tighter drop-shadow-md">₹1,50,000</span>
                          <span className="text-[#f4bd18] text-2xl md:text-4xl font-black mt-1 ml-1">*</span>
                        </div>
                        <div className="text-white text-[20px] md:text-[28px] font-black uppercase tracking-[0.16em] mt-1 leading-none">SUBSIDY</div>
                        <div className="text-white/60 text-[9px] md:text-[10px] font-black uppercase tracking-[0.08em] mt-1">UNDER MSME PMS SCHEME</div>
                      </div>
                    </div>

                    {/* Right: Checklist Column */}
                    <div className="flex flex-col gap-2.5 relative z-10 w-full md:border-l md:border-white/15 md:pl-6 lg:pl-10">
                      {[
                        "Government Financial Support",
                        "Increase Market Reach",
                        "Grow Your Business Globally"
                      ].map((text, i) => (
                        <div key={i} className="flex items-center gap-3 text-white text-[11px] md:text-[12px] font-bold">
                          <div className="w-6 h-6 rounded-full border-2 border-[#f4bd18] flex items-center justify-center shrink-0 text-[#f4bd18]">
                            <CheckCircle2 size={12} strokeWidth={3.5} />
                          </div>
                          <span className="opacity-95 tracking-tight">{text}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Yellow Strip Footer */}
                  <div className="bg-[#f3b71b] py-2 px-8 flex flex-col items-center justify-center text-center">
                    <div className="flex flex-col md:flex-row items-center gap-1 md:gap-6 text-[10px] md:text-[12px] font-black text-[#1a3615] uppercase tracking-[0.05em]">
                      <span>TYPICALLY ₹50,000 – ₹1,00,000</span>
                      <span className="w-[1px] h-3 bg-[#1a3615]/30 hidden md:block"></span>
                      <span>HIGHER SUPPORT FOR ELIGIBLE CASES</span>
                    </div>
                  </div>
                </div>

                <div className="text-[11px] text-slate-400 font-bold italic">
                  *Subsidy amount may vary as per MSME guidelines, category and approval.
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Image Banner - Bleeding to edge */}
        <div className="hidden lg:block absolute top-0 right-0 bottom-0 w-[50%] overflow-hidden">
          <img
            src="/msme_pms_header_banner_bg_1777877814391.png"
            alt="MSME Exhibition"
            className="w-full h-full object-cover object-[center_20%]"
          />
          {/* Supported By Badge - Added for parity */}
          {/* <div className="absolute top-8 right-8 bg-white/95 backdrop-blur shadow-2xl p-4 rounded-xl flex items-center gap-4 border border-slate-100 z-20">
            <div className="flex flex-col items-center">
              <span className="text-[7px] font-black text-slate-400 uppercase tracking-tighter mb-1">SUPPORTED BY</span>
              <img src="/MSME.png" alt="Ministry of MSME" className="h-10 object-contain" />
            </div>
            <div className="w-[1px] h-10 bg-slate-200"></div>
            <div className="flex flex-col text-[8px] font-black text-slate-800 leading-tight">
              <span>MINISTRY OF</span>
              <span>MICRO, SMALL &</span>
              <span>MEDIUM ENTERPRISES</span>
              <span className="text-[#1a3615]">GOVERNMENT OF INDIA</span>
            </div>
          </div> */}
          {/* Wide Soft Gradient Overlay */}
          <div className="absolute inset-y-0 left-0 w-96 bg-gradient-to-r from-white via-white/95 to-transparent z-10"></div>
        </div>

        {/* Mobile Image (Visible only on mobile) */}
        <div className="lg:hidden relative min-h-[300px] overflow-hidden">
          <img
            src="/msme_pms_header_banner_bg_1777877814391.png"
            alt="MSME Exhibition"
            className="absolute inset-0 w-full h-full object-cover object-[center_20%]"
          />
        </div>
      </section >

      {/* Integrated Action Buttons Bar - Positioned immediately after Hero */}
      < div className="bg-white py-2 px-4 lg:px-16 z-30" >
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="flex flex-col sm:flex-row justify-end items-center gap-4">
            <Button className="h-12 px-8 bg-[#064420] hover:bg-[#0a5a2a] text-white font-black text-[12px] uppercase tracking-[0.1em] rounded transition-all flex items-center gap-4 group">
              APPLY FOR PMS SCHEME NOW <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Button>
            {/* <Button variant="outline" className="h-12 px-8 bg-white border-[#064420] text-[#064420] font-black text-[12px] uppercase tracking-[0.1em] rounded hover:bg-[#064420] hover:text-white transition-all flex items-center gap-4 group">
              BOOK YOUR STALL <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Button> */}
          </div>
        </div>
      </div >

      {/* Stats Bar (Rounded Card Style) */}
      < div className="relative z-40 mt-4" >
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="bg-white rounded-[12px] shadow-[0_8px_28px_rgba(0,0,0,0.035)] border border-slate-100 py-4 px-3">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 items-center gap-y-4">
              {[
                { icon: Globe, val: "25+", label: "COUNTRIES" },
                { icon: Landmark, val: "500+", label: "EXHIBITORS" },
                { icon: Users, val: "20,000+", label: "TRADE VISITORS" },
                { icon: Presentation, val: "50+", label: "CONFERENCE SESSIONS" },
                { icon: Timer, val: "3 DAYS", label: "OF BUSINESS OPPORTUNITIES" },
                { icon: Handshake, val: "MULTIPLE", label: "NETWORKING EVENTS" },
              ].map((stat, i) => (
                <div key={i} className={`flex items-center gap-3 px-3 sm:px-5 min-h-[56px] ${i !== 5 ? "lg:border-r border-slate-100" : ""} group`}>
                  <div className="w-10 h-10 rounded-full bg-[#f5f8f2] flex items-center justify-center shrink-0 ring-1 ring-[#23471d]/10 group-hover:bg-[#23471d]/10 transition-colors">
                    <stat.icon size={22} className="text-[#23471d]" strokeWidth={1.8} />
                  </div>
                  <div>
                    <div className="text-lg md:text-xl font-black text-slate-900 leading-none mb-1">{stat.val}</div>
                    <div className="text-[8px] md:text-[9px] font-black text-slate-400 tracking-widest uppercase leading-tight">{stat.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div >

        {/* Content Sections: About & Benefits Grid */}
        < section className="py-2 bg-white" >
          <div className="max-w-[1400px] mx-auto px-6 md:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
              {/* About Section */}
              <div className="lg:col-span-4 bg-white rounded-[20px] border border-slate-100 p-8 shadow-[0_4px_20px_rgba(0,0,0,0.03)] flex flex-col">
                <h2 className="text-2xl font-black text-[#1a3615] mb-2 uppercase tracking-tight">ABOUT PMS SCHEME</h2>
                <div className="flex gap-2 mb-8">
                  <div className="w-6 h-1 bg-[#23471d]"></div>
                  <div className="w-3 h-1 bg-slate-200"></div>
                </div>

                <div className="flex flex-row gap-6 items-start">
                  <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center shrink-0 border border-slate-100">
                    <div className="w-16 h-16 rounded-full border-2 border-dashed border-[#23471d]/20 flex items-center justify-center p-2">
                      <Landmark className="text-[#23471d] w-8 h-8" />
                    </div>
                  </div>
                  <div className="space-y-4 flex-1">
                    <p className="text-[13px] text-slate-600 leading-relaxed font-medium">
                      The Procurement and Marketing Support (PMS) Scheme of the Ministry of MSME, Government of India, aims to provide financial assistance to Micro, Small and Medium Enterprises (MSMEs) for participating in domestic and international exhibitions / trade fairs.
                    </p>
                    <p className="text-[13px] text-slate-600 leading-relaxed font-medium">
                      The scheme helps MSMEs promote their products, explore new markets, enhance brand visibility and generate business opportunities.
                    </p>
                  </div>
                </div>
              </div>

              {/* Benefits Section */}
              <div className="lg:col-span-8 bg-white rounded-[20px] border border-slate-100 p-8 shadow-[0_4px_20px_rgba(0,0,0,0.03)]">
                <h2 className="text-2xl font-black text-[#1a3615] mb-2 uppercase tracking-tight">BENEFITS OF PMS SCHEME</h2>
                <div className="flex gap-2 mb-8">
                  <div className="w-12 h-1 bg-[#d26019]"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border border-slate-100 rounded-2xl overflow-hidden">
                  {[
                    { icon: Landmark, title: "Up to ₹1.5 Lakh* Reimbursement", desc: "Subsidy on stall booking & participation cost" },
                    { icon: Package, title: "Reduced Cost", desc: "Lower financial burden for market expansion" },
                    { icon: Globe, title: "Market Exposure", desc: "Showcase your products to national & international buyers" },
                    { icon: TrendingUp, title: "Business Growth", desc: "Generate leads & expand your network" },
                    { icon: ShieldCheck, title: "Government Support", desc: "Exhibit with the backing of Ministry of MSME" },
                    { icon: Award, title: "Brand Visibility", desc: "Enhance brand credibility and recognition" },
                  ].map((benefit, i) => (
                    <div key={i} className={`p-5 hover:bg-slate-50 transition-all border-b border-r border-slate-100 last:border-r-0 group`}>
                      <div className="flex flex-row gap-4 items-start">
                        <div className="w-12 h-12 bg-[#0d4a1f] rounded-full flex items-center justify-center text-[#f4bd18] shrink-0 shadow-[0_8px_16px_rgba(13,74,31,0.18)] ring-4 ring-[#f5f8f2] group-hover:scale-105 transition-transform">
                          <benefit.icon size={22} strokeWidth={1.9} />
                        </div>
                        <div className="flex-1">
                          <h4 className="text-[12px] font-black text-slate-800 leading-tight mb-1.5 group-hover:text-[#23471d] transition-colors">{benefit.title}</h4>
                          <p className="text-[10px] font-medium text-slate-500 leading-relaxed">
                            {benefit.desc}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <p className="mt-6 text-[10px] text-slate-400 italic font-medium">
                  *Subsidy amount may vary as per MSME guidelines, category and approval.
                </p>
              </div>
            </div>
          </div>
        </section >

        {/* Detailed Guidelines Grid */}
        < section className="py-2 bg-white" >
          <div className="max-w-[1400px] mx-auto px-6 md:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Left: Imagery Collage */}
              <div className="lg:col-span-3">
                <div className="rounded-[20px] overflow-hidden shadow-lg border border-slate-100 h-full">
                  <img
                    src="/msme_exhibition_stalls_grid.png"
                    alt="Exhibition Stalls"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Right: 3-Column Info Grid */}
              <div className="lg:col-span-9 grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Who Can Apply */}
                <div className="bg-[#f9fafb] rounded-[20px] p-6 border border-[#e5e7eb] flex flex-col group transition-all hover:bg-white hover:shadow-xl">
                  <div className="flex items-center gap-3 mb-6">
                    <Users className="text-[#1a3615]" size={26} strokeWidth={2.5} />
                    <h3 className="text-[18px] font-black text-[#1a3615] uppercase tracking-tight">WHO CAN APPLY?</h3>
                  </div>
                  <ul className="space-y-4 flex-1">
                    {[
                      "MSMEs with valid Udyam Registration",
                      "Manufacturers / Service Providers",
                      "Startups registered under MSME category",
                      "Businesses in Health, Wellness, Ayurveda, Organic, Pharma, Nutraceuticals and related sectors"
                    ].map((item, i) => (
                      <li key={i} className="flex gap-4 items-start group/li">
                        <div className="shrink-0 mt-1">
                          <CheckCircle2 size={18} className="text-[#1a3615]" strokeWidth={3} />
                        </div>
                        <span className="text-[13px] font-bold text-slate-700 leading-[1.6]">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Why PMS Scheme */}
                <div className="bg-[#f9fafb] rounded-[20px] p-6 border border-[#e5e7eb] flex flex-col group transition-all hover:bg-white hover:shadow-xl">
                  <div className="flex items-center gap-3 mb-6">
                    <TrendingUp className="text-[#1a3615]" size={26} strokeWidth={2.5} />
                    <h3 className="text-[18px] font-black text-[#1a3615] uppercase tracking-tight">WHY PMS SCHEME?</h3>
                  </div>
                  <ul className="space-y-4 flex-1">
                    {[
                      "Encourages MSMEs to participate in exhibitions",
                      "Helps in exploring new markets & technologies",
                      "Strengthens competitiveness and innovation",
                      "Supports sustainable growth and development"
                    ].map((item, i) => (
                      <li key={i} className="flex gap-4 items-start group/li">
                        <div className="shrink-0 mt-1">
                          <CheckCircle2 size={18} className="text-[#1a3615]" strokeWidth={3} />
                        </div>
                        <span className="text-[13px] font-bold text-slate-700 leading-[1.6]">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Eligibility Criteria */}
                <div className="bg-[#f9fafb] rounded-[20px] p-6 border border-[#e5e7eb] flex flex-col group transition-all hover:bg-white hover:shadow-xl">
                  <div className="flex items-center gap-3 mb-6">
                    <ShieldCheck className="text-[#1a3615]" size={26} strokeWidth={2.5} />
                    <h3 className="text-[18px] font-black text-[#1a3615] uppercase tracking-tight">ELIGIBILITY CRITERIA</h3>
                  </div>
                  <ul className="space-y-4 flex-1">
                    {[
                      "Applicant should be a registered MSME with valid Udyam Certificate",
                      "The enterprise should be in manufacturing or service sector",
                      "Should not have availed PMS benefit for the same exhibition in the previous financial year",
                      "Subject to approval by Ministry of MSME"
                    ].map((item, i) => (
                      <li key={i} className="flex gap-4 items-start group/li">
                        <div className="shrink-0 mt-1">
                          <CheckCircle2 size={18} className="text-[#1a3615]" strokeWidth={3} />
                        </div>
                        <span className="text-[13px] font-bold text-slate-700 leading-[1.6]">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Bottom Grid: Documents & How to Apply */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-8">
              {/* Documents Required */}
              <div className="lg:col-span-4 bg-[#f9fafb] rounded-[20px] p-8 border border-[#e5e7eb] shadow-[0_4px_20px_rgba(0,0,0,0.02)]">
                <h3 className="text-[18px] font-black text-[#1a3615] mb-6 uppercase tracking-tight">DOCUMENTS REQUIRED</h3>
                <ul className="space-y-4">
                  {[
                    { label: "Udyam Registration Certificate", icon: Building2 },
                    { label: "PAN Card", icon: IdCard },
                    { label: "GST Certificate", icon: ShieldCheck },
                    { label: "Company Profile", icon: Store },
                    { label: "Product / Service Details", icon: Package },
                    { label: "Bank Account Details", icon: Landmark },
                  ].map((doc, i) => (
                    <li key={i} className="flex gap-5 items-center group">
                      <div className="w-8 h-8 flex items-center justify-center text-[#1a3615] group-hover:scale-110 transition-transform">
                        <doc.icon size={22} strokeWidth={2.5} />
                      </div>
                      <span className="text-[14px] font-bold text-slate-700 leading-tight">{doc.label}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* How to Apply */}
              <div className="lg:col-span-8 bg-[#f9fafb] rounded-[20px] p-8 border border-[#e5e7eb] shadow-[0_4px_20px_rgba(0,0,0,0.02)] flex flex-col md:flex-row gap-6 relative overflow-hidden">
                <div className="flex-1 relative">
                  <h3 className="text-[18px] font-black text-[#1a3615] mb-4 uppercase tracking-tight">HOW TO APPLY?</h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-0">
                    {/* Column 1: Steps 1, 2, 3 */}
                    <div className="space-y-4 relative">
                      {/* Vertical Line for Column 1 */}
                      <div className="absolute left-[15px] top-[24px] bottom-[24px] w-[1px] bg-slate-200"></div>

                      {[
                        { title: "Fill Online Application Form", desc: "with correct details" },
                        { title: "Upload Required Documents", desc: "Submit all the necessary documents online" },
                        { title: "Verification & Approval", desc: "Documents will be verified by the Ministry of MSME" },
                      ].map((step, i) => (
                        <div key={i} className="flex gap-6 items-start relative z-10">
                          <div className="w-8 h-8 bg-[#1a3615] rounded-full flex items-center justify-center text-white font-black text-[12px] shrink-0 shadow-lg ring-4 ring-[#f9fafb]">
                            {i + 1}
                          </div>
                          <div className="pt-0.5">
                            <h4 className="text-[13px] font-black text-slate-800 leading-tight mb-0.5">{step.title}</h4>
                            <p className="text-[11px] font-medium text-slate-500 leading-relaxed max-w-[220px]">{step.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Column 2: Steps 4, 5 */}
                    <div className="space-y-4 relative mt-4 md:mt-0">
                      {/* Vertical Line for Column 2 */}
                      <div className="absolute left-[15px] top-[24px] bottom-[24px] w-[1px] bg-slate-200"></div>

                      {[
                        { title: "Stall Allocation", desc: "Stall will be allocated after approval" },
                        { title: "Participation Confirmation", desc: "Confirm your participation and get ready to exhibit!" },
                      ].map((step, i) => (
                        <div key={i} className="flex gap-6 items-start relative z-10">
                          <div className="w-8 h-8 bg-[#1a3615] rounded-full flex items-center justify-center text-white font-black text-[12px] shrink-0 shadow-lg ring-4 ring-[#f9fafb]">
                            {i + 4}
                          </div>
                          <div className="pt-0.5">
                            <h4 className="text-[13px] font-black text-slate-800 leading-tight mb-0.5">{step.title}</h4>
                            <p className="text-[11px] font-medium text-slate-500 leading-relaxed max-w-[220px]">{step.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Checklist Graphic */}
                <div className="w-full md:w-[300px] shrink-0 flex items-center justify-center relative">
                  <img
                    src="/msme_application_checklist_graphic.png"
                    alt="Application Approved"
                    className="w-full max-w-[240px] h-auto object-contain drop-shadow-2xl"
                  />
                  <div className="absolute bottom-[15%] right-[15%]">
                    <div className="inline-block bg-[#1a3615] text-white text-[11px] font-black px-6 py-2 rounded-full shadow-2xl uppercase tracking-widest border-4 border-white animate-bounce-slow">
                      APPROVED
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section >

        {/* Application Form Section - High Density Compact UI */}
        < section id="apply-form" >
          <div className="max-w-[1400px] mx-auto px-6 md:px-12">
            <div className="bg-white rounded-[15px] shadow-[0_2px_20px_rgba(0,0,0,0.03)] border border-slate-100 p-5 lg:p-7">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

                {/* Left Column: Form Header & Help */}
                <div className="lg:col-span-3">
                  <h2 className="text-[18px] font-black text-[#1a3615] leading-[1.2] mb-2">
                    APPLY FOR <br />
                    PMS SCHEME – IHWE 2026
                  </h2>
                  <div className="flex gap-1.5 mb-4">
                    <div className="w-6 h-[2px] bg-[#1a3615]"></div>
                    <div className="w-12 h-[2px] bg-orange-200"></div>
                  </div>
                  <p className="text-[11px] text-slate-500 font-bold leading-relaxed mb-6">
                    Claim your subsidy and grow your business at IHWE 2026!
                  </p>

                  {/* Important Note Box */}
                  <div className="bg-[#fdf8f1] rounded-xl p-4 border border-orange-100">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-6 h-6 bg-[#1a3615] rounded-full flex items-center justify-center text-yellow-400">
                        <HelpCircle size={12} />
                      </div>
                      <span className="text-[9px] font-black text-[#1a3615] uppercase tracking-wider">IMPORTANT NOTE</span>
                    </div>
                    <p className="text-[10px] text-slate-700 font-bold leading-relaxed">
                      Final subsidy approval and amount is subject to MSME PMS scheme guidelines and ministry approval.
                    </p>
                  </div>
                </div>

                {/* Middle Column: The Form */}
                <div className="lg:col-span-9 bg-white rounded-[15px] shadow-[0_2px_20px_rgba(0,0,0,0.03)] border border-slate-100  p-5 lg:p-7">
                  <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Row 1: 4 Column Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                      <div className="space-y-1">
                        <label className="text-[9px] font-black text-slate-600 uppercase tracking-tight">Company / Organization Name <span className="text-red-500">*</span></label>
                        <Input required className="h-8 bg-white border-slate-200 focus:border-[#1a3615] rounded-md text-[11px] font-bold px-3" placeholder="Enter company name" />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[9px] font-black text-slate-600 uppercase tracking-tight">Contact Person <span className="text-red-500">*</span></label>
                        <Input required className="h-8 bg-white border-slate-200 focus:border-[#1a3615] rounded-md text-[11px] font-bold px-3" placeholder="Enter full name" />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[9px] font-black text-slate-600 uppercase tracking-tight">Mobile Number <span className="text-red-500">*</span></label>
                        <Input required type="tel" className="h-8 bg-white border-slate-200 focus:border-[#1a3615] rounded-md text-[11px] font-bold px-3" placeholder="Enter mobile number" />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[9px] font-black text-slate-600 uppercase tracking-tight">Email ID <span className="text-red-500">*</span></label>
                        <Input required type="email" className="h-8 bg-white border-slate-200 focus:border-[#1a3615] rounded-md text-[11px] font-bold px-3" placeholder="Enter email address" />
                      </div>
                    </div>

                    {/* Row 2: Udyam, GST, Category */}
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-3">
                      <div className="space-y-1">
                        <label className="text-[9px] font-black text-slate-600 uppercase tracking-tight">Udyam Registration Number <span className="text-red-500">*</span></label>
                        <Input required className="h-8 bg-white border-slate-200 focus:border-[#1a3615] rounded-md text-[11px] font-bold px-3" placeholder="Enter Udyam number" />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[9px] font-black text-slate-600 uppercase tracking-tight">GST Number</label>
                        <Input className="h-8 bg-white border-slate-200 focus:border-[#1a3615] rounded-md text-[11px] font-bold px-3" placeholder="Enter GST number" />
                      </div>
                      <div className="lg:col-span-2 space-y-1">
                        <label className="text-[9px] font-black text-slate-600 uppercase tracking-tight">Product / Service Category <span className="text-red-500">*</span></label>
                        <Select required>
                          <SelectTrigger className="h-8 bg-white border-slate-200 focus:border-[#1a3615] rounded-md text-[11px] font-bold px-3">
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="ayurveda">Ayurveda & Herbal</SelectItem>
                            <SelectItem value="wellness">Wellness & Fitness</SelectItem>
                            <SelectItem value="organic">Organic Food</SelectItem>
                            <SelectItem value="pharma">Pharma & Nutraceuticals</SelectItem>
                            <SelectItem value="personal">Personal Care</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    {/* Row 3: TextArea + Upload + Help Card */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
                      {/* Company Brief */}
                      <div className="lg:col-span-5 space-y-1 flex flex-col">
                        <label className="text-[9px] font-black text-slate-600 uppercase tracking-tight">Brief About Your Company / Products <span className="text-red-500">*</span></label>
                        <Textarea required className="flex-1 min-h-[90px] bg-white border-slate-200 focus:border-[#1a3615] rounded-md text-[11px] font-medium p-3" placeholder="Write here..." />
                      </div>

                      {/* Upload & Help Card Side */}
                      <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-7 gap-5">
                        {/* Upload Section */}
                        <div className="md:col-span-4 space-y-1 flex flex-col">
                          <label className="text-[9px] font-black text-slate-600 uppercase tracking-tight">Upload Documents <span className="text-red-500">*</span></label>
                          <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleFileSelect}
                            className="hidden"
                            multiple
                            accept=".pdf,.jpg,.jpeg,.png"
                          />
                          <div
                            onDragOver={handleDragOver}
                            onDrop={handleDrop}
                            onClick={() => fileInputRef.current?.click()}
                            className="flex-1 border border-dashed border-slate-200 rounded-md flex flex-col items-center justify-center bg-[#f9fafb] hover:bg-slate-50 transition-colors cursor-pointer group p-3"
                          >
                            <Upload size={20} className="text-slate-400 mb-1 group-hover:text-[#1a3615] transition-colors" />
                            <p className="text-[10px] font-black text-slate-700">
                              {selectedFiles.length > 0 ? `${selectedFiles.length} files selected` : "Drag & drop files here"}
                            </p>
                            <p className="text-[9px] text-slate-500 font-bold uppercase tracking-widest mt-0.5">
                              or <span className="text-[#1a3615] underline">Browse Files</span>
                            </p>
                            {selectedFiles.length > 0 && (
                              <div className="mt-2 w-full max-h-12 overflow-y-auto">
                                {selectedFiles.map((file, i) => (
                                  <p key={i} className="text-[8px] text-slate-400 truncate">{file.name}</p>
                                ))}
                              </div>
                            )}
                          </div>
                          <p className="text-[8px] text-slate-400 font-bold uppercase tracking-tighter mt-1">Allowed: PDF, JPG, PNG (Max size: 10MB each)</p>
                        </div>

                        {/* Need Help Card (Ultra Compact) */}
                        <div className="md:col-span-3">
                          <div className="bg-[#0b1d09] rounded-xl p-4 h-full flex flex-col items-center justify-center text-center relative overflow-hidden">
                            <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center mb-2 text-yellow-400">
                              <Phone size={16} />
                            </div>
                            <h4 className="text-[14px] font-black text-white mb-0.5 leading-tight">Need Help?</h4>
                            <p className="text-[9px] text-white/50 font-bold mb-3 uppercase tracking-tighter">Our team is here to assist you</p>

                            <div className="space-y-0.5 mb-3">
                              <p className="text-[10px] font-black text-white">+91 98765 43210</p>
                              <p className="text-[8px] font-bold text-white/60 truncate w-full">pms@healthwellnessexpo.com</p>
                            </div>

                            <Link to="/contact" className="w-full">
                              <Button variant="outline" className="w-full border-yellow-400/20 text-yellow-400 hover:bg-yellow-400 hover:text-[#1a3615] font-black text-[8px] uppercase tracking-[0.2em] h-8 rounded-md transition-all">
                                CONTACT US
                              </Button>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Submit Row */}
                    <div className="space-y-4 pt-1">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="terms" required className="w-3.5 h-3.5 border border-slate-300" />
                        <label htmlFor="terms" className="text-[10px] font-bold text-slate-500 leading-none cursor-pointer">
                          I agree to the <Link to="/terms-of-service" className="text-[#1a3615] underline">Terms & Conditions</Link> and <Link to="/privacy-policy" className="text-[#1a3615] underline">Privacy Policy</Link>
                        </label>
                      </div>
                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full md:w-[380px] h-10 bg-[#1a3615] hover:bg-[#1a3615] text-white font-black text-[12px] uppercase tracking-[0.2em] rounded-md shadow-lg transition-all flex items-center justify-center gap-3"
                      >
                        {isSubmitting ? "PROCESSING..." : "SUBMIT APPLICATION"}
                        {!isSubmitting && <ArrowRight size={14} />}
                      </Button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section >

        {/* Footer CTA - Rebuilt for exact parity with brochure design */}
        < section className="py-2 bg-white" >
          <div className="max-w-[1400px] mx-auto px-6 md:px-12">
            <div className="bg-[#123b17] rounded-[14px] px-5 py-4 md:px-7 md:py-5 shadow-[0_16px_34px_rgba(10,42,15,0.16)] relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent pointer-events-none"></div>

              <div className="flex flex-col lg:flex-row items-center justify-between gap-4 lg:gap-6 relative z-10">
                {/* Left: Megaphone & Text */}
                <div className="flex flex-col sm:flex-row items-center gap-3 md:gap-5 text-center sm:text-left">
                  <div className="w-16 h-16 md:w-20 md:h-20 shrink-0 flex items-center justify-center relative rounded-full bg-[#f4bd18]/10">
                    <div className="absolute inset-1 rounded-full border border-[#f4bd18]/20"></div>
                    <Megaphone size={42} className="text-[#f4bd18] drop-shadow-xl -rotate-12" strokeWidth={2.2} />
                  </div>

                  <div className="space-y-1.5">
                    <h3 className="text-xl md:text-2xl font-black text-white leading-tight tracking-normal">
                      Don't Miss This <span className="text-[#f3b71b]">Government-Supported</span> Opportunity!
                    </h3>
                    <p className="text-white/75 text-sm md:text-[15px] font-bold max-w-2xl leading-snug">
                      Exhibit at IHWE 2026 and take your business to the next level <br className="hidden md:block" />
                      with financial support under the MSME PMS Scheme.
                    </p>
                  </div>
                </div>

                {/* Right: Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 shrink-0 w-full lg:w-auto">
                  <Button className="h-12 px-8 bg-orange-500 hover:bg-orange-600 text-white font-black text-[12px] uppercase tracking-[0.12em] rounded-md shadow-xl transition-all flex items-center justify-center gap-3 group/btn">
                    APPLY NOW <ArrowRight size={18} className="group-hover/btn:translate-x-1 transition-transform" />
                  </Button>
                  {/* <Button variant="outline" className="h-12 px-8 border-white/25 bg-transparent text-white hover:bg-white/10 font-black text-[12px] uppercase tracking-[0.12em] rounded-md transition-all flex items-center justify-center gap-3 group/btn">
                    BOOK YOUR STALL <ArrowRight size={18} className="group-hover/btn:translate-x-1 transition-transform" />
                  </Button> */}
                </div>
              </div>
            </div>
          </div>
        </section >

        {/* Final Footer Strip (Repeating stats for impact) */}
        < div className="bg-[#123b17] py-2 border-t border-white/5" >
          <div className="max-w-[1400px] mx-auto px-6 md:px-12">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 md:gap-8 w-full lg:w-auto">
                {[
                  { icon: Globe, val: "25+", label: "COUNTRIES" },
                  { icon: Landmark, val: "500+", label: "EXHIBITORS" },
                  { icon: Users, val: "20,000+", label: "TRADE VISITORS" },
                  { icon: Presentation, val: "50+", label: "CONFERENCE SESSIONS" },
                  { icon: Timer, val: "3 DAYS", label: "OF BUSINESS OPPORTUNITIES" },
                ].map((stat, i) => (
                  <div key={i} className="flex flex-col items-center lg:items-start">
                    <div className="flex items-center gap-2 mb-1">
                      <stat.icon size={22} className="text-orange-500" strokeWidth={1.9} />
                      <span className="text-lg font-black text-white">{stat.val}</span>
                    </div>
                    <span className="text-[9px] font-bold text-white/40 tracking-widest uppercase">{stat.label}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-col items-center lg:items-end gap-3 shrink-0">
                <span className="text-[10px] font-black text-white/40 uppercase tracking-[0.2em]">FOLLOW US</span>
                <div className="flex gap-4">
                  {[Facebook, Instagram, Linkedin, Youtube].map((Icon, i) => (
                    <a key={i} href="#" className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-white/60 hover:bg-[#23471d] hover:text-white transition-all hover:border-transparent">
                      <Icon size={16} />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div >
      </div >
    </div >
  );
};

export default MsmePmsScheme;
