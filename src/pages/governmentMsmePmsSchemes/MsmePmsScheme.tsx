import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  CheckCircle2,
  Upload,
  Users,
  ShieldCheck,
  Phone,
  Instagram,
  Facebook,
  Linkedin,
  Youtube,
  ArrowRight,
} from "lucide-react";
import { motion, useInView, animate } from "framer-motion";
import band1 from "@/assets/band1.png";
import band2 from "@/assets/band2.png";
import band3 from "@/assets/band3.png";
import band4 from "@/assets/band4.png";
import band5 from "@/assets/band5.png";
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
import { msmePmsSchemeApi, verifyApi } from "@/lib/api";

const LocalStatCounter = ({ value }: { value: string }) => {
  const [displayValue, setDisplayValue] = useState(0);
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  if (!/^[\d,]+/.test(value)) return <span>{value}</span>;

  const numericValue = parseInt(value.replace(/,/g, '')) || 0;
  const suffix = value.replace(/[0-9,]/g, '');

  useEffect(() => {
    if (isInView) {
      const controls = animate(0, numericValue, {
        duration: 2.5,
        ease: 'easeOut',
        onUpdate(v) {
          setDisplayValue(Math.floor(v));
        },
      });
      return () => controls.stop();
    }
  }, [isInView, numericValue]);

  return (
    <span ref={ref}>
      {displayValue.toLocaleString()}{suffix}
    </span>
  );
};

const DEFAULT_PAGE_DATA = {
  heroSubTitle: "GOVERNMENT SUPPORT TO GROW YOUR BUSINESS",
  heroTitle: "MSME PMS SCHEME",
  heroSubTitle2: "BENEFITS & REGISTRATION",
  heroDescription: "Exhibit at International Health & Wellness Expo 2026 with Financial Assistance from Ministry of MSME, Government of India.",
  heroBannerImg: "/msmepmsscheme/msme_pms_header_banner.png",
  subsidyLimit: "₹1,50,000",
  subsidyImg: "/msmepmsscheme/mony-bag.png",
  subsidyFeatures: [
    "Government Financial Support",
    "Increase Market Reach",
    "Grow Your Business Globally"
  ],
  subsidyFooterTexts: [
    "TYPICALLY ₹50,000 – ₹1,00,000",
    "HIGHER SUPPORT FOR ELIGIBLE CASES"
  ],
  subsidyNotice: "*Subsidy amount may vary as per MSME guidelines, category and approval.",
  stats: [
    { img: "/msmepmsscheme/global.png", val: "1,000+", label: "GLOBAL BUYERS" },
    { img: "/msmepmsscheme/exhibitors.png", val: "150+", label: "EXHIBITORS" },
    { img: "/msmepmsscheme/visitors.png", val: "8,000+", label: "VISITORS/ DELEGATES" },
    { img: "/msmepmsscheme/conference.png", val: "18+", label: "CONFERENCE SESSIONS" },
    { img: "/msmepmsscheme/businessOpportunities.png", val: "3 DAYS", label: "OF BUSINESS OPPORTUNITIES" },
    { img: "/msmepmsscheme/networkevents.png", val: "MULTIPLE", label: "NETWORKING EVENTS" },
  ],
  footerStats: [
    { img: "/msmepmsscheme/global1.png", val: "1,000+", label: "GLOBAL BUYERS" },
    { img: "/msmepmsscheme/exhibitors.png", val: "150+", label: "EXHIBITORS" },
    { img: "/msmepmsscheme/visitors.png", val: "8,000+", label: "VISITORS/ DELEGATES" },
    { img: "/msmepmsscheme/conference.png", val: "18+", label: "CONFERENCE SESSIONS" },
    { img: "/msmepmsscheme/businessOpportunities1.png", val: "3 DAYS", label: "OF BUSINESS OPPORTUNITIES" },
  ],
  aboutTitle: "ABOUT PMS SCHEME",
  aboutImg: "/msmepmsscheme/aboutpmsscheme.png",
  aboutParagraphs: [
    "The Procurement and Marketing Support (PMS) Scheme of the Ministry of MSME, Government of India, aims to provide financial assistance to Micro, Small and Medium Enterprises (MSMEs) for participating in domestic and international exhibitions / trade fairs.",
    "The scheme helps MSMEs promote their products, explore new markets, enhance brand visibility and generate business opportunities."
  ],
  benefitsTitle: "BENEFITS OF PMS SCHEME",
  benefits: [
    { img: "/msmepmsscheme/reimbursement.png", title: "Up to ₹1.5 Lakh* Reimbursement", desc: "Subsidy on stall booking & participation cost" },
    { img: "/msmepmsscheme/reducedCost.png", title: "Reduced Cost", desc: "Lower financial burden for market expansion" },
    { img: "/msmepmsscheme/marketexposure.png", title: "Market Exposure", desc: "Showcase your products to national & international buyers" },
    { img: "/msmepmsscheme/businessgrowth.png", title: "Business Growth", desc: "Generate leads & expand your network" },
    { img: "/msmepmsscheme/govsupport.png", title: "Government Support", desc: "Exhibit with the backing of Ministry of MSME" },
    { img: "/msmepmsscheme/brandvisibility.png", title: "Brand Visibility", desc: "Enhance brand credibility and recognition" },
  ],
  collageImg: "/msmepmsscheme/msme_exhibition_stalls_grid.png",
  whoCanApplyTitle: "WHO CAN APPLY?",
  whoCanApplyItems: [
    "MSMEs with valid Udyam Registration",
    "Manufacturers / Service Providers",
    "Startups registered under MSME category",
    "Businesses in Health, Wellness, Ayurveda, Organic, Pharma, Nutraceuticals and related sectors"
  ],
  whyPmsTitle: "WHY PMS SCHEME?",
  whyPmsImg: "/msmepmsscheme/whypms.png",
  whyPmsItems: [
    "Encourages MSMEs to participate in exhibitions",
    "Helps in exploring new markets & technologies",
    "Strengthens competitiveness and innovation",
    "Supports sustainable growth and development"
  ],
  eligibilityTitle: "ELIGIBILITY CRITERIA",
  eligibilityItems: [
    "Applicant should be a registered MSME with valid Udyam Certificate",
    "The enterprise should be in manufacturing or service sector",
    "Should not have availed PMS benefit for the same exhibition in the previous financial year",
    "Subject to approval by Ministry of MSME"
  ],
  formTitle: "APPLY FOR PMS SCHEME – IHWE 2026",
  formSubTitle: "Claim your subsidy and grow your business at IHWE 2026!",
  bottomCtaTitle: "Don't Miss This Government-Supported Opportunity!",
  bottomCtaHighlight: "Government-Supported Opportunity!",
  bottomCtaDesc: "Exhibit at IHWE 2026 and take your business to the next level with financial support under the MSME PMS Scheme.",
  helpTitle: "Need Help?",
  helpSubTitle: "Our team is here to assist you",
  helpPhone: "+91 9654900525",
  helpEmail: "info@ihwe.in",
  footerCtaImg: "/msmepmsscheme/Announcement.png",
  facebookUrl: "https://www.facebook.com/namogangewellness.event",
  instagramUrl: "https://instagram.com",
  twitterUrl: "https://twitter.com",
  linkedinUrl: "https://linkedin.com",
  youtubeUrl: "https://youtube.com"
};

const MsmePmsScheme = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const [pageData, setPageData] = useState<any>(DEFAULT_PAGE_DATA);

  const [formData, setFormData] = useState({
    companyName: '',
    contactPerson: '',
    mobileNumber: '',
    emailId: '',
    udyamNumber: '',
    gstNumber: '',
    category: '',
    companyBrief: ''
  });

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

  const sendEmailOtp = async () => {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.emailId)) {
      toast({ title: "Validation Error", description: "Please enter a valid email address first.", variant: "destructive" });
      return;
    }
    if (emailResendTimer > 0) return;

    setSendingEmailOtp(true);
    try {
      const res = await verifyApi.sendEmailOtp(formData.emailId);
      if (res.success) {
        setEmailOtpSent(true);
        setEmailResendTimer(60);
        toast({ title: "OTP Sent", description: "Email OTP sent successfully!" });
      } else {
        toast({ title: "Error", description: res.message || "Failed to send OTP.", variant: "destructive" });
      }
    } catch (error: any) {
      console.error("Error sending email OTP:", error);
      toast({ title: "Error", description: error.message || "Failed to send OTP.", variant: "destructive" });
    } finally {
      setSendingEmailOtp(false);
    }
  };

  const confirmEmailOtp = async () => {
    if (!emailOtp) return;
    setVerifyingEmail(true);
    try {
      const res = await verifyApi.verifyEmailOtp(formData.emailId, emailOtp);
      if (res.success) {
        setEmailVerified(true);
        setEmailOtpSent(false);
        toast({ title: "Verified", description: "Email address verified successfully!" });
      } else {
        toast({ title: "Error", description: res.message || "Invalid OTP.", variant: "destructive" });
      }
    } catch (error) {
      console.error("Error verifying email OTP:", error);
    } finally {
      setVerifyingEmail(false);
    }
  };

  const sendPhoneOtp = async () => {
    if (!/^[0-9]{10,15}$/.test(formData.mobileNumber.replace(/[^0-9]/g, ""))) {
      toast({ title: "Validation Error", description: "Please enter a valid 10-15 digit mobile number first.", variant: "destructive" });
      return;
    }
    if (phoneResendTimer > 0) return;

    setSendingPhoneOtp(true);
    try {
      const res = await verifyApi.sendPhoneOtp(formData.mobileNumber);
      if (res.success) {
        setPhoneOtpSent(true);
        setPhoneResendTimer(60);
        toast({ title: "OTP Sent", description: "Mobile OTP sent successfully via WhatsApp!" });
      } else {
        toast({ title: "Error", description: res.message || "Failed to send OTP.", variant: "destructive" });
      }
    } catch (error: any) {
      console.error("Error sending phone OTP:", error);
      toast({ title: "Error", description: error.message || "Failed to send OTP.", variant: "destructive" });
    } finally {
      setSendingPhoneOtp(false);
    }
  };

  const confirmPhoneOtp = async () => {
    if (!phoneOtp) return;
    setVerifyingPhone(true);
    try {
      const res = await verifyApi.verifyPhoneOtp(formData.mobileNumber, phoneOtp);
      if (res.success) {
        setPhoneVerified(true);
        setPhoneOtpSent(false);
        toast({ title: "Verified", description: "Mobile number verified successfully!" });
      } else {
        toast({ title: "Error", description: res.message || "Invalid OTP.", variant: "destructive" });
      }
    } catch (error) {
      console.error("Error verifying phone OTP:", error);
    } finally {
      setVerifyingPhone(false);
    }
  };

  useEffect(() => {
    const fetchPageContent = async () => {
      try {
        const data = await msmePmsSchemeApi.getPageContent();
        if (data) {
          setPageData((prev: any) => ({ ...prev, ...data }));
        }
      } catch (error) {
        console.error("Error fetching MSME PMS page content:", error);
      }
    };
    fetchPageContent();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailVerified || !phoneVerified) {
      toast({ title: "Verification Required", description: "Please verify both your email and mobile number first.", variant: "destructive" });
      return;
    }
    setIsSubmitting(true);

    try {
      const submitData = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        submitData.append(key, value);
      });

      selectedFiles.forEach((file) => {
        submitData.append('documents', file);
      });

      const response = await msmePmsSchemeApi.submit(submitData);

      if (response.success) {
        toast({ title: "Success", description: "Application Submitted successfully!" });
        setFormData({
          companyName: '',
          contactPerson: '',
          mobileNumber: '',
          emailId: '',
          udyamNumber: '',
          gstNumber: '',
          category: '',
          companyBrief: ''
        });
        setSelectedFiles([]);
        setEmailVerified(false);
        setPhoneVerified(false);
      } else {
        toast({ title: "Error", description: response.message || "Failed to submit application", variant: "destructive" });
      }
    } catch (error) {
      console.error("Submission error:", error);
      toast({ title: "Error", description: "An error occurred. Please try again.", variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
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
          <div className="flex flex-col lg:flex-row min-h-[450px]">
            {/* Left Side: Content */}
            <div className="lg:w-[58%] xl:w-[50%] pt-28 sm:pt-4 pb-0 relative z-20 bg-white flex flex-col justify-end">

              {/* Gold Ribbon - Fixed position with refined spacing */}
              <div className="absolute top-3 left-2 sm:top-8 lg:left-0 z-30">
                <div className="relative w-24 h-32 sm:w-28 sm:h-36 lg:w-32 lg:h-44 flex items-center justify-center">
                  <img src="/msmepmsscheme/gold-ribbon.png" alt="Limited Slots" className="absolute inset-0 w-full h-full object-contain" />
                </div>
              </div>

              <div className="mt-4 flex flex-col items-start pl-28 sm:pl-36 lg:pl-40">
                <div className="text-[#1a3615] text-[11px] sm:text-[13px] font-black uppercase tracking-[0.25em] mb-2 opacity-70">
                  {pageData.heroSubTitle}
                </div>
                <h1 className="text-[24px] sm:text-[30px] md:text-[38px] lg:text-[44px] font-extrabold text-[#1a3615] leading-[1.1] mb-4 tracking-[-0.03em] uppercase">
                  <span className="block md:whitespace-nowrap">{pageData.heroTitle}</span>
                  <span className="text-slate-900 font-extrabold tracking-[-0.04em] block md:whitespace-nowrap">{pageData.heroSubTitle2}</span>
                </h1>
                <p className="text-[13px] sm:text-[15px] md:text-[16px] text-slate-600 mb-6 max-w-2xl font-bold leading-tight">
                  {pageData.heroDescription}
                </p>

              </div>
              {/* Subsidy Box - Final Refinement for Parity */}
              <div className="w-full lg:w-[760px] max-w-[calc(100vw-3rem)] mt-auto shadow-[0_18px_38px_rgba(11,43,15,0.18)] rounded-[16px] overflow-hidden border border-[#f3b71b]/20">
                <div className="bg-[#0d3b16] px-5 py-8 md:px-6 md:py-10 grid grid-cols-1 md:grid-cols-[auto_1fr] items-center gap-4 md:gap-6 relative overflow-hidden">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(255,255,255,0.10),transparent_34%),linear-gradient(135deg,rgba(0,0,0,0.26),transparent_55%)] pointer-events-none"></div>

                  {/* Left: Icon & Amount Container */}
                  <div className="relative flex items-center gap-3 md:gap-5 shrink-0">
                    <div className="relative w-20 h-24 md:w-24 md:h-32 shrink-0 flex items-center justify-center">
                      <img
                        src={pageData.subsidyImg}
                        alt="Subsidy Bag"
                        className="w-full h-full object-contain relative z-10 drop-shadow-xl"
                      />
                    </div>

                    <div className="flex flex-col min-w-0 pr-2">
                      <div className="text-white/95 text-[13px] md:text-[14px] font-semibold leading-none mb-1">Get Up To</div>
                      <div className="flex items-start">
                        <span className="text-[#f3b71b] text-[40px] md:text-[50px] font-extrabold leading-[0.85] tracking-tighter drop-shadow-sm">{pageData.subsidyLimit}</span>
                        <span className="text-[#f4bd18] text-2xl md:text-3xl font-black mt-0.5 ml-1">*</span>
                      </div>
                      <div className="text-white text-[24px] md:text-[30px] font-black tracking-[0.02em] mt-2 leading-none">SUBSIDY</div>
                      <div className="text-white/90 text-[11px] md:text-[12px] font-medium mt-1.5 tracking-wide">Under MSME PMS Scheme</div>
                    </div>
                  </div>

                  {/* Right: Checklist Column */}
                  <div className="flex flex-col gap-3 md:gap-4 relative z-10 w-full md:border-l md:border-white/10 md:pl-6 lg:pl-8">
                    {pageData.subsidyFeatures.map((text: string, i: number) => (
                      <div key={i} className="flex items-center gap-2 md:gap-3 text-white text-[12px] md:text-[13px] font-normal min-w-0">
                        <div className="w-5 h-5 md:w-6 md:h-6 rounded-full border border-[#f4bd18] flex items-center justify-center shrink-0 text-[#f4bd18]">
                          <CheckCircle2 size={14} strokeWidth={2.5} />
                        </div>
                        <span className="opacity-95 tracking-wide whitespace-nowrap text-ellipsis overflow-hidden">{text}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Yellow Strip Footer */}
                <div className="bg-[#f3b71b] py-2 px-8 flex flex-col items-center justify-center text-center">
                  <div className="flex flex-col md:flex-row items-center gap-1 md:gap-6 text-[10px] md:text-[12px] font-black text-[#1a3615] uppercase tracking-[0.05em]">
                    {pageData.subsidyFooterTexts.map((text: string, i: number) => (
                      <React.Fragment key={i}>
                        <span>{text}</span>
                        {i < pageData.subsidyFooterTexts.length - 1 && (
                          <span className="w-[1px] h-3 bg-[#1a3615]/30 hidden md:block"></span>
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Image Banner - Bleeding to edge */}
        <div className="hidden lg:block absolute top-0 right-0 bottom-0 lg:w-[42%] xl:w-[50%] overflow-hidden">
          <img
            src={pageData.heroBannerImg}
            alt="MSME Exhibition"
            className="w-full h-full object-cover object-[center_20%]"
          />
          {/* Supported By Badge - Added for parity */}
          {/* <div className="absolute top-8 right-8 bg-white/95 backdrop-blur shadow-2xl p-4 rounded-xl flex items-center gap-4 border border-slate-100 z-20">
            <div className="flex flex-col items-center">
              <span className="text-[7px] font-black text-slate-400 uppercase tracking-tighter mb-1">SUPPORTED BY</span>
              <img src="/msmepmsscheme/MSME.png" alt="Ministry of MSME" className="h-10 object-contain" />
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
            src={pageData.heroBannerImg}
            alt="MSME Exhibition"
            className="absolute inset-0 w-full h-full object-cover object-[center_20%]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-white via-white/40 to-transparent"></div>
        </div>
      </section >

      {/* Integrated Action Buttons Bar - Positioned immediately after Hero */}
      <div className="bg-white py-2 px-4 lg:px-16 z-30">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
            <div className="text-[11px] md:text-[12px] text-slate-500 font-bold italic max-w-md sm:pt-2">
              {pageData.subsidyNotice}
            </div>
            <div className="flex flex-col sm:flex-row justify-end items-center gap-3">
              <Button onClick={() => document.getElementById('apply-form')?.scrollIntoView({ behavior: 'smooth' })} className="px-5 py-2 bg-[#064420] hover:bg-[#0a5a2a] text-white font-bold text-[13px] uppercase tracking-wide rounded-lg transition-all flex items-center gap-3 group">
                APPLY FOR PMS SCHEME NOW <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Bar (Rounded Card Style) - Using WhyExhibit style */}
      <div className="relative z-40 -mt-4 md:-mt-6 mb-8">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div 
            className="rounded-2xl border border-white/10 p-1 md:py-1.5 md:px-4"
            style={{ 
              backgroundColor: '#134E8E',
              boxShadow: '0 8px 20px -10px rgba(0,0,0,0.3)',
            }}
          >
            <div className="grid grid-cols-2 sm:grid-cols-3 md:flex md:flex-nowrap items-center justify-center md:justify-between gap-y-6 gap-x-2 md:gap-0">
              {[
                { img: band1, val: "8,000+", label: "VISITORS / DELEGATES" },
                { img: band2, val: "150+", label: "EXHIBITORS" },
                { img: band3, val: "1,000+", label: "GLOBAL BUYERS" },
                { img: band4, val: "150+", label: "EXPERTS SPEAKERS" },
                { img: band5, val: "B2B", label: "MEETINGS" },
              ].map((stat: any, i: number, arr: any[]) => (
                <React.Fragment key={i}>
                  <div className="flex flex-col items-center text-center group flex-1">
                    <img src={stat.img} alt={stat.label} className="w-6 h-6 md:w-7 md:h-7 mb-0.5 object-contain brightness-0 invert" />
                    <h4 className="text-base md:text-lg font-bold text-white leading-none">
                      <LocalStatCounter value={stat.val} />
                    </h4>
                    <p className="text-[7.5px] md:text-[9.5px] font-bold text-[#f5c842] uppercase tracking-widest leading-tight">{stat.label}</p>
                  </div>
                  {i < arr.length - 1 && (
                    <div className="hidden md:block w-px h-6 bg-white/20" />
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </div>

        {/* Content Sections: About & Benefits Grid */}
        < section className="py-2 bg-white" >
          <div className="max-w-[1400px] mx-auto px-6 md:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
              {/* About Section */}
              <div className="lg:col-span-4 bg-white rounded-[20px] border border-slate-100 p-6 flex flex-col justify-center">
                <h2 className="text-[20px] md:text-[22px] font-black text-[#1a3615] mb-2 uppercase tracking-tight">{pageData.aboutTitle}</h2>
                <div className="flex gap-2 mb-5">
                  <div className="w-6 h-1 bg-[#23471d]"></div>
                  <div className="w-3 h-1 bg-slate-200"></div>
                </div>

                <div className="flex flex-row gap-5 items-center">
                  <div className="w-24 h-24 lg:w-28 lg:h-28 shrink-0 transition-transform hover:scale-105">
                    <img src={pageData.aboutImg} alt={pageData.aboutTitle} className="w-full h-full object-contain" />
                  </div>
                  <div className="space-y-3 flex-1">
                    {pageData.aboutParagraphs.map((para: string, i: number) => (
                      <p key={i} className="text-[12px] md:text-[13px] text-slate-600 leading-relaxed font-medium">
                        {para}
                      </p>
                    ))}
                  </div>
                </div>
              </div>

              {/* Benefits Section */}
              <div className="lg:col-span-8 bg-white rounded-[20px] border border-slate-100 p-6 shadow-[0_4px_20px_rgba(0,0,0,0.03)]">
                <h2 className="text-[20px] md:text-[22px] font-black text-[#1a3615] mb-2 uppercase tracking-tight">{pageData.benefitsTitle}</h2>
                <div className="flex gap-2 mb-5">
                  <div className="w-12 h-1 bg-[#d26019]"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border border-slate-100 rounded-2xl overflow-hidden">
                  {pageData.benefits.map((benefit: any, i: number) => (
                    <div key={i} className={`p-4 hover:bg-slate-50 transition-all border-b border-r border-slate-100 last:border-r-0 group`}>
                      <div className="flex flex-row gap-4 items-center">
                        <div className="w-[64px] h-[64px] md:w-[80px] md:h-[80px] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                          <img src={benefit.img} alt={benefit.title} className="w-full h-full object-contain" />
                        </div>
                        <div className="flex-1">
                          <h4 className="text-[11px] md:text-[12px] font-black text-slate-800 leading-tight mb-1 group-hover:text-[#23471d] transition-colors">{benefit.title}</h4>
                          <p className="text-[9px] md:text-[10px] font-medium text-slate-500 leading-relaxed">
                            {benefit.desc}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <p className="mt-4 text-[9px] text-slate-400 italic font-medium">
                  {pageData.subsidyNotice}
                </p>
              </div>
            </div>
          </div>
        </section >

        {/* Detailed Guidelines Grid */}
        < section className="py-2 bg-[#f3fbf2] border-y border-[#d3eed1]" >
          <div className="max-w-[1400px] mx-auto px-6 md:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Left: Imagery Collage */}
              <div className="lg:col-span-3">
                <div className="rounded-[20px] overflow-hidden shadow-lg border border-slate-100 h-full">
                  <img
                    src={pageData.collageImg}
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
                    <h3 className="text-[18px] font-black text-[#1a3615] uppercase tracking-tight">{pageData.whoCanApplyTitle}</h3>
                  </div>
                  <ul className="space-y-4 flex-1">
                    {pageData.whoCanApplyItems.map((item: string, i: number) => (
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
                    <img src={pageData.whyPmsImg} alt={pageData.whyPmsTitle} className="w-8 h-8 object-contain shrink-0" />
                    <h3 className="text-[18px] font-black text-[#1a3615] uppercase tracking-tight">{pageData.whyPmsTitle}</h3>
                  </div>
                  <ul className="space-y-4 flex-1">
                    {pageData.whyPmsItems.map((item: string, i: number) => (
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
                    <h3 className="text-[18px] font-black text-[#1a3615] uppercase tracking-tight">{pageData.eligibilityTitle}</h3>
                  </div>
                  <ul className="space-y-4 flex-1">
                    {pageData.eligibilityItems.map((item: string, i: number) => (
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
          </div>
        </section >
        < section className="pb-4 bg-white border-y border-[#d3eed1]" >
          <div className="max-w-[1400px] mx-auto px-6 md:px-12">
            {/* Bottom Grid: Documents & How to Apply */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-4">
              {/* Documents Required */}
              <div className="lg:col-span-4 bg-[#f9fafb] rounded-[20px] p-6 border border-[#e5e7eb] shadow-[0_4px_20px_rgba(0,0,0,0.02)]">
                <h3 className="text-[18px] font-black text-[#1a3615] mb-4 uppercase tracking-tight">DOCUMENTS REQUIRED</h3>
                <ul className="space-y-3">
                  {[
                    { label: "Udyam Registration Certificate", img: "/msmepmsscheme/udyamreg.png" },
                    { label: "PAN Card", img: "/msmepmsscheme/pan.png" },
                    { label: "GST Certificate", img: "/msmepmsscheme/gstcerti.png" },
                    { label: "Company Profile", img: "/msmepmsscheme/companyprofile.png" },
                    { label: "Product / Service Details", img: "/msmepmsscheme/productdetails.png" },
                    { label: "Bank Account Details", img: "/msmepmsscheme/bankaccdetails.png" },
                  ].map((doc, i) => (
                    <li key={i} className="flex gap-5 items-center group">
                      <div className="w-8 h-8 flex items-center justify-center group-hover:scale-110 transition-transform shrink-0">
                        <img src={doc.img} alt={doc.label} className="w-full h-full object-contain" />
                      </div>
                      <span className="text-[14px] font-bold text-slate-700 leading-tight">{doc.label}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* How to Apply */}
              <div className="lg:col-span-8 bg-[#f9fafb] rounded-[20px] p-4 border border-[#e5e7eb] shadow-[0_4px_20px_rgba(0,0,0,0.02)] flex flex-col md:flex-row gap-6 relative overflow-hidden">
                <div className="flex-1 relative">
                  <h3 className="text-[18px] font-black text-[#1a3615] mb-4 uppercase tracking-tight">HOW TO APPLY?</h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-0">
                    {/* Column 1: Steps 1, 2, 3 */}
                    <div className="space-y-3 relative">
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
                    <div className="space-y-3 relative mt-4 md:mt-0">
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
                    src="/msmepmsscheme/approved.png"
                    alt="Application Approved"
                    className="w-full max-w-[240px] h-auto object-contain drop-shadow-2xl"
                  />
                  {/* <div className="absolute bottom-[15%] right-[15%]">
                    <div className="inline-block bg-[#1a3615] text-white text-[11px] font-black px-6 py-2 rounded-full shadow-2xl uppercase tracking-widest border-4 border-white animate-bounce-slow">
                      APPROVED
                    </div>
                  </div> */}
                </div>
              </div>
            </div>
          </div>
        </section >

        {/* Application Form Section - High Density Compact UI */}
        < section id="apply-form" className="py-4 bg-[#f3fbf2] border-t border-[#d3eed1]" >
          <div className="max-w-[1400px] mx-auto px-6 md:px-12">
            <div className="bg-white rounded-[15px] shadow-[0_2px_20px_rgba(0,0,0,0.03)] border border-slate-100 p-5 lg:p-7">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

                {/* Left Column: Form Header & Help */}
                <div className="lg:col-span-3">
                  <h2 className="text-[18px] font-black text-[#1a3615] leading-[1.2] mb-2">
                    {pageData.formTitle || "APPLY FOR PMS SCHEME – IHWE 2026"}
                  </h2>
                  <div className="flex gap-1.5 mb-4">
                    <div className="w-6 h-[2px] bg-[#1a3615]"></div>
                    <div className="w-12 h-[2px] bg-orange-200"></div>
                  </div>
                  <p className="text-[11px] text-slate-500 font-bold leading-relaxed mb-6">
                    {pageData.formSubTitle || "Claim your subsidy and grow your business at IHWE 2026!"}
                  </p>

                  {/* Important Note Box */}
                  <div className="bg-[#fdf8f1] rounded-xl p-4 border border-orange-100">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-6 h-6 bg-[#1a3615] rounded-full flex items-center justify-center text-yellow-400">
                        <img src="/msmepmsscheme/impnotice.png" alt="Important Note" className="w-full h-full object-contain" />
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
                        <Input name="companyName" value={formData.companyName} onChange={handleInputChange} required className="h-8 bg-white border-slate-200 focus:border-[#1a3615] rounded-md text-[11px] font-bold px-3" placeholder="Enter company name" />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[9px] font-black text-slate-600 uppercase tracking-tight">Contact Person <span className="text-red-500">*</span></label>
                        <Input name="contactPerson" value={formData.contactPerson} onChange={handleInputChange} required className="h-8 bg-white border-slate-200 focus:border-[#1a3615] rounded-md text-[11px] font-bold px-3" placeholder="Enter full name" />
                      </div>
                      <div className="space-y-1 relative">
                        <label className="text-[9px] font-black text-slate-600 uppercase tracking-tight">Mobile Number <span className="text-red-500">*</span></label>
                        <div className="relative flex items-center">
                          <Input
                            name="mobileNumber"
                            value={formData.mobileNumber}
                            onChange={handleInputChange}
                            required
                            type="tel"
                            disabled={phoneVerified || phoneOtpSent}
                            className={`h-8 bg-white border-slate-200 focus:border-[#1a3615] rounded-md text-[11px] font-bold pl-3 pr-20 ${phoneVerified ? "bg-green-50/50 border-green-200 text-green-700 font-semibold" : ""}`}
                            placeholder="Enter mobile number"
                          />
                          {!phoneVerified && (
                            <button
                              type="button"
                              onClick={sendPhoneOtp}
                              disabled={sendingPhoneOtp || !formData.mobileNumber || phoneResendTimer > 0}
                              className="absolute right-1 px-2.5 py-1 bg-[#1a3615] text-white text-[8px] uppercase font-bold tracking-wider rounded-sm hover:bg-[#0a2008] disabled:bg-slate-200 transition-all active:scale-95"
                            >
                              {sendingPhoneOtp ? "Sending..." : phoneResendTimer > 0 ? `${phoneResendTimer}s` : phoneOtpSent ? "Resend" : "Send OTP"}
                            </button>
                          )}
                          {phoneVerified && <CheckCircle2 size={14} className="absolute right-3 text-green-500" />}
                        </div>
                      </div>
                      <div className="space-y-1 relative">
                        <label className="text-[9px] font-black text-slate-600 uppercase tracking-tight">Email ID <span className="text-red-500">*</span></label>
                        <div className="relative flex items-center">
                          <Input
                            name="emailId"
                            value={formData.emailId}
                            onChange={handleInputChange}
                            required
                            type="email"
                            disabled={emailVerified || emailOtpSent}
                            className={`h-8 bg-white border-slate-200 focus:border-[#1a3615] rounded-md text-[11px] font-bold pl-3 pr-20 ${emailVerified ? "bg-green-50/50 border-green-200 text-green-700 font-semibold" : ""}`}
                            placeholder="Enter email address"
                          />
                          {!emailVerified && (
                            <button
                              type="button"
                              onClick={sendEmailOtp}
                              disabled={sendingEmailOtp || !formData.emailId || emailResendTimer > 0}
                              className="absolute right-1 px-2.5 py-1 bg-[#1a3615] text-white text-[8px] uppercase font-bold tracking-wider rounded-sm hover:bg-[#0a2008] disabled:bg-slate-200 transition-all active:scale-95"
                            >
                              {sendingEmailOtp ? "Sending..." : emailResendTimer > 0 ? `${emailResendTimer}s` : emailOtpSent ? "Resend" : "Send OTP"}
                            </button>
                          )}
                          {emailVerified && <CheckCircle2 size={14} className="absolute right-3 text-green-500" />}
                        </div>
                      </div>
                    </div>

                    {/* OTP Inputs Row */}
                    {((phoneOtpSent || sendingPhoneOtp) && !phoneVerified || (emailOtpSent || sendingEmailOtp) && !emailVerified) && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3 bg-orange-50/30 border border-orange-100 rounded-md">
                        <div>
                          {(phoneOtpSent || sendingPhoneOtp) && !phoneVerified ? (
                            <div className="space-y-1">
                              <label className="text-[9px] font-black text-slate-600 uppercase tracking-tight">Enter Mobile OTP <span className="text-red-500">*</span></label>
                              <div className="flex gap-2">
                                <Input
                                  type="text"
                                  placeholder="WhatsApp OTP"
                                  value={phoneOtp}
                                  onChange={(e) => setPhoneOtp(e.target.value)}
                                  className="h-8 bg-white border-slate-200 focus:border-[#1a3615] rounded-md text-[11px] font-bold px-3 text-center tracking-widest"
                                  maxLength={6}
                                />
                                <Button
                                  type="button"
                                  onClick={confirmPhoneOtp}
                                  disabled={verifyingPhone || !phoneOtp}
                                  className="h-8 bg-[#1a3615] text-white text-[10px] font-bold uppercase rounded-md px-4 shrink-0"
                                >
                                  {verifyingPhone ? "Verifying..." : "Verify"}
                                </Button>
                              </div>
                            </div>
                          ) : null}
                        </div>
                        <div>
                          {(emailOtpSent || sendingEmailOtp) && !emailVerified ? (
                            <div className="space-y-1">
                              <label className="text-[9px] font-black text-slate-600 uppercase tracking-tight">Enter Email OTP <span className="text-red-500">*</span></label>
                              <div className="flex gap-2">
                                <Input
                                  type="text"
                                  placeholder="Email OTP"
                                  value={emailOtp}
                                  onChange={(e) => setEmailOtp(e.target.value)}
                                  className="h-8 bg-white border-slate-200 focus:border-[#1a3615] rounded-md text-[11px] font-bold px-3 text-center tracking-widest"
                                  maxLength={6}
                                />
                                <Button
                                  type="button"
                                  onClick={confirmEmailOtp}
                                  disabled={verifyingEmail || !emailOtp}
                                  className="h-8 bg-[#1a3615] text-white text-[10px] font-bold uppercase rounded-md px-4 shrink-0"
                                >
                                  {verifyingEmail ? "Verifying..." : "Verify"}
                                </Button>
                              </div>
                            </div>
                          ) : null}
                        </div>
                      </div>
                    )}

                    {/* Row 2: Udyam, GST, Category */}
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-3">
                      <div className="space-y-1">
                        <label className="text-[9px] font-black text-slate-600 uppercase tracking-tight">Udyam Registration Number <span className="text-red-500">*</span></label>
                        <Input name="udyamNumber" value={formData.udyamNumber} onChange={handleInputChange} required className="h-8 bg-white border-slate-200 focus:border-[#1a3615] rounded-md text-[11px] font-bold px-3" placeholder="Enter Udyam number" />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[9px] font-black text-slate-600 uppercase tracking-tight">GST Number</label>
                        <Input name="gstNumber" value={formData.gstNumber} onChange={handleInputChange} className="h-8 bg-white border-slate-200 focus:border-[#1a3615] rounded-md text-[11px] font-bold px-3" placeholder="Enter GST number" />
                      </div>
                      <div className="lg:col-span-2 space-y-1">
                        <label className="text-[9px] font-black text-slate-600 uppercase tracking-tight">Product / Service Category <span className="text-red-500">*</span></label>
                        <Select required value={formData.category} onValueChange={(val) => setFormData(prev => ({ ...prev, category: val }))}>
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
                        <Textarea name="companyBrief" value={formData.companyBrief} onChange={handleInputChange} required className="flex-1 min-h-[90px] bg-white border-slate-200 focus:border-[#1a3615] rounded-md text-[11px] font-medium p-3" placeholder="Write here..." />
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
                            <h4 className="text-[14px] font-black text-white mb-0.5 leading-tight">{pageData.helpTitle || "Need Help?"}</h4>
                            <p className="text-[9px] text-white/50 font-bold mb-3 uppercase tracking-tighter">{pageData.helpSubTitle || "Our team is here to assist you"}</p>

                            <div className="space-y-0.5 mb-3">
                              <p className="text-[14px] font-black text-white">{pageData.helpPhone || "+91 9654900525"}</p>
                              <p className="text-[14px] font-bold text-white/60 truncate w-full">{pageData.helpEmail || "info@ihwe.in"}</p>
                            </div>

                            <Link to="/contact" className="w-full">
                              <Button variant="outline" className="w-full border-yellow-400/50 text-yellow-400 bg-[#0b1d09] hover:bg-yellow-400 hover:text-[#1a3615] font-black text-[8px] uppercase tracking-[0.2em] h-8 rounded-md transition-all">
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
        <section className="py-2 bg-white font-['Barlow',sans-serif]">
          <div className="max-w-[1400px] mx-auto px-6 md:px-12">
            <div className="bg-[#123b17] rounded-lg px-4 md:px-8 py-4 shadow-lg relative flex flex-col lg:flex-row items-center justify-between gap-6">

              <div className="flex flex-col sm:flex-row items-center gap-4 md:gap-6 text-center sm:text-left">
                <div className="w-24 h-24 md:w-32 md:h-32 shrink-0 -my-8 md:-my-10 relative z-10 drop-shadow-xl transition-transform hover:scale-105">
                  <img src={pageData.footerCtaImg || "/msmepmsscheme/Announcement.png"} alt="Announcement" className="w-full h-full object-contain" />
                </div>

                <div className="space-y-1 mt-4 sm:mt-0">
                  <h3 className="text-xl md:text-[22px] font-bold text-white leading-tight tracking-wide">
                    {pageData.bottomCtaTitle ? (
                      pageData.bottomCtaTitle.includes(pageData.bottomCtaHighlight) ? (
                        <>
                          {pageData.bottomCtaTitle.split(pageData.bottomCtaHighlight)[0]}
                          <span className="text-[#f59e0b]">{pageData.bottomCtaHighlight}</span>
                          {pageData.bottomCtaTitle.split(pageData.bottomCtaHighlight)[1]}
                        </>
                      ) : (
                        pageData.bottomCtaTitle
                      )
                    ) : (
                      <>Don't Miss This <span className="text-[#f59e0b]">Government-Supported Opportunity!</span></>
                    )}
                  </h3>
                  <p className="text-white/90 text-sm md:text-[15px] font-normal max-w-xl leading-snug">
                    {pageData.bottomCtaDesc || "Exhibit at IHWE 2026 and take your business to the next level with financial support under the MSME PMS Scheme."}
                  </p>
                </div>
              </div>

              {/* Right: Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 shrink-0 w-full sm:w-auto mt-2 lg:mt-0">
                <Button
                  onClick={() => document.getElementById('apply-form')?.scrollIntoView({ behavior: 'smooth' })}
                  className="px-2 py-2.5 h-auto bg-orange-500 hover:bg-orange-600 text-white font-bold text-[12px] md:text-[13px] tracking-wide rounded flex items-center justify-center gap-2 transition-colors border border-[#f59e0b]"
                >
                  APPLY FOR PMS SCHEME <ArrowRight size={14} />
                </Button>

                {/* <Button
                  variant="outline"
                  className="px-6 py-2.5 h-auto border border-white bg-transparent text-white hover:bg-white/10 font-bold text-[12px] md:text-[13px] tracking-wide rounded flex items-center justify-center gap-2 transition-colors"
                >
                  BOOK YOUR STALL <ArrowRight size={14} />
                </Button> */}
              </div>
            </div>
          </div>
        </section>

        {/* Final Footer Strip (Repeating stats for impact) */}
        < div className="bg-[#123b17] py-2 border-t border-white/5" >
          <div className="max-w-[1400px] mx-auto px-6 md:px-12">
            <div className="flex flex-col xl:flex-row items-center justify-between gap-6 xl:gap-4 w-full">

              <div className="flex flex-wrap lg:flex-nowrap items-center justify-center lg:justify-start gap-y-4 lg:gap-y-0 w-full xl:w-auto">
                {(pageData.footerStats && pageData.footerStats.length > 0 ? pageData.footerStats : DEFAULT_PAGE_DATA.footerStats).map((stat: any, i: number) => (
                  <div key={i} className={`flex items-center gap-2.5 ${i !== (pageData.footerStats && pageData.footerStats.length > 0 ? pageData.footerStats : DEFAULT_PAGE_DATA.footerStats).length - 1 ? 'lg:border-r lg:border-white/10 lg:pr-5 lg:mr-5' : ''}`}>
                    <div className="flex items-center justify-center shrink-0 w-12 h-12 md:w-14 md:h-14">
                      <img src={stat.img} alt={stat.label} className={`object-contain opacity-90 w-[75%] h-[75%]`} />
                    </div>
                    <div className="flex flex-col justify-center">
                      <span className="text-[13px] md:text-[15px] font-black text-white leading-tight">{stat.val}</span>
                      <span className="text-[8px] md:text-[9px] font-bold text-white/70 uppercase leading-tight tracking-wide">{stat.label}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Social Icons */}
              <div className="flex flex-col items-center xl:items-start gap-1.5 shrink-0">
                <span className="text-[9px] font-black text-white uppercase tracking-wider">FOLLOW US</span>
                <div className="flex gap-2">
                  <a href={pageData.facebookUrl || "https://facebook.com"} target="_blank" className="w-9 h-9 rounded-full bg-[#1877F2] flex items-center justify-center text-white hover:scale-110 transition-transform shadow-lg"><Facebook size={16} strokeWidth={2.5} className="fill-white" /></a>
                  <a href={pageData.instagramUrl || "https://instagram.com"} target="_blank" className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] flex items-center justify-center text-white hover:scale-110 transition-transform shadow-lg"><Instagram size={16} strokeWidth={2.5} /></a>
                  <a href={pageData.linkedinUrl || "https://linkedin.com"} target="_blank" className="w-9 h-9 rounded-full bg-[#0A66C2] flex items-center justify-center text-white hover:scale-110 transition-transform shadow-lg"><Linkedin size={16} strokeWidth={0} className="fill-white" /></a>
                  <a href={pageData.youtubeUrl || "https://youtube.com"} target="_blank" className="w-9 h-9 rounded-full bg-[#FF0000] flex items-center justify-center text-white hover:scale-110 transition-transform shadow-lg"><Youtube size={16} strokeWidth={2.5} /></a>
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
