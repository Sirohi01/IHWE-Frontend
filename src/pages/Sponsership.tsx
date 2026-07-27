import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useInView, animate } from "framer-motion";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { ShieldCheck, Download, PhoneCall, Mail, Globe, Send, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { API_URL, otpApi, sponsorComparisonApi, SERVER_URL } from "@/lib/api";
const DEFAULT_SPONSOR_CARDS = [
  {
    title: "TITLE SPONSOR",
    desc: "Maximum visibility & brand exclusivity",
    image: "/images/partnership/trophy.png",
    color: "blue",
  },
  {
    title: "POWERED BY SPONSOR",
    desc: "Align your brand as the power behind IHWE",
    image: "/images/partnership/saver.png",
    color: "green",
  },
  {
    title: "ASSOCIATE SPONSOR",
    desc: "High-impact visibility & brand recognition",
    image: "/images/partnership/associate.png",
    color: "blue",
  },
  {
    title: "CONFERENCE SPONSOR",
    desc: "Brand association with knowledge sessions",
    image: "/images/partnership/speaker.png",
    color: "green",
  },
  {
    title: "REGISTRATION SPONSOR",
    desc: "High brand recall at every entry point",
    image: "/images/partnership/reg.png",
    color: "blue",
  },
  {
    title: "LANYARD / BADGE SPONSOR",
    desc: "Put your brand around every neck",
    image: "/images/partnership/lanyard.png",
    color: "green",
  },
  {
    title: "WELLNESS ZONE SPONSOR",
    desc: "Showcase your brand in the wellness experience zone",
    image: "/images/partnership/wellness.png",
    color: "blue",
  },
  {
    title: "DIGITAL PROMOTION PARTNER",
    desc: "Expand your reach across digital platforms",
    image: "/images/partnership/digital.png",
    color: "green",
  },
];

const DEFAULT_COMPARISON_DATA = [
  {
    benefit: "Logo on all event branding",
    values: ["✔", "✔", "✔", "✔", "✔", "✔", "✔", "✔"],
  },
  {
    benefit: "Keynote / Speaking Opportunity",
    values: ["30 mins", "20 mins", "—", "—", "—", "—", "—", "—"],
  },
  {
    benefit: "Exhibition Space",
    values: ["12 sqm", "9 sqm", "6 sqm", "—", "—", "—", "2 sqm", "—"],
  },
  {
    benefit: "Ad in Souvenir",
    values: [
      "Full Page",
      "Half Page",
      "Half Page",
      "Listing",
      "Listing",
      "Listing",
      "Listing",
      "—",
    ],
  },
  {
    benefit: "Press Release Mentions",
    values: ["All", "Featured", "Featured", "—", "—", "—", "—", "—"],
  },
  {
    benefit: "Complimentary Delegate Passes",
    values: ["12", "8", "6", "4", "4", "2", "2", "—"],
  },
  {
    benefit: "VIP Lounge Access",
    values: ["✔", "✔", "✔", "✔", "✔", "✔", "✔", "—"],
  },
];

// StatCounter component for live counting
const StatCounter = ({ value }) => {
    const [displayValue, setDisplayValue] = useState(0);
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });

    const isNumeric = /^[0-9]/.test(value);
    if (!isNumeric) {
        return <span ref={ref}>{value}</span>;
    }

    const numericValue = parseInt(value.replace(/[^0-9]/g, '')) || 0;
    const suffix = value.replace(/[0-9,]/g, '');

    useEffect(() => {
        if (isInView) {
            const controls = animate(0, numericValue, {
                duration: 2.5,
                ease: "easeOut",
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

const Sponsership = () => {
    const [activeMobileTab, setActiveMobileTab] = useState(0);
    const [sponsorCards, setSponsorCards] = useState<any[]>(DEFAULT_SPONSOR_CARDS);
    const [comparisonData, setComparisonData] = useState<any[]>(DEFAULT_COMPARISON_DATA);

    useEffect(() => {
        sponsorComparisonApi.get().then(data => {
            if (data) {
                if (data.cards && data.cards.length > 0) {
                    setSponsorCards(data.cards.map((c: any) => ({
                        ...c,
                        image: c.image.startsWith('/uploads') ? `${SERVER_URL}${c.image}` : c.image
                    })));
                }
                if (data.comparisonData && data.comparisonData.length > 0) {
                    setComparisonData(data.comparisonData);
                }
            }
        });
    }, []);

  const [formData, setFormData] = useState({
    fullName: "",
    companyName: "",
    email: "",
    countryCode: "+91",
    phone: "",
    category: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const categories = [
    "TITLE SPONSOR",
    "POWERED BY SPONSOR",
    "ASSOCIATE SPONSOR",
    "CONFERENCE SPONSOR",
    "REGISTRATION SPONSOR",
    "LANYARD / BADGE SPONSOR",
    "WELLNESS ZONE SPONSOR",
    "DIGITAL PROMOTION PARTNER",
  ];
  // OTP Verification States
  const [emailOtpSent, setEmailOtpSent] = useState(false);
  const [emailOtpVerified, setEmailOtpVerified] = useState(false);
  const [emailOtpValue, setEmailOtpValue] = useState("");
  const [emailResendTimer, setEmailResendTimer] = useState(0);

  const [mobileOtpSent, setMobileOtpSent] = useState(false);
  const [mobileOtpVerified, setMobileOtpVerified] = useState(false);
  const [mobileOtpValue, setMobileOtpValue] = useState("");
  const [mobileResendTimer, setMobileResendTimer] = useState(0);

  const [isVerifying, setIsVerifying] = useState({ email: false, mobile: false });

  // Timers Effect
  useEffect(() => {
    let eTimer: any, mTimer: any;
    if (emailResendTimer > 0) {
      eTimer = setInterval(() => setEmailResendTimer((p) => p - 1), 1000);
    }
    if (mobileResendTimer > 0) {
      mTimer = setInterval(() => setMobileResendTimer((p) => p - 1), 1000);
    }
    return () => {
      clearInterval(eTimer);
      clearInterval(mTimer);
    };
  }, [emailResendTimer, mobileResendTimer]);

  const requestOtp = async (type: "email" | "mobile") => {
    const identifier = type === "email" ? formData.email : formData.phone;
    if (!identifier) {
      toast.error(`Please enter a valid ${type === "email" ? "email address" : "phone number"}`);
      return;
    }

    setIsVerifying((p) => ({ ...p, [type]: true }));
    try {
      const res = await otpApi.request(
        identifier,
        type === "email" ? "email" : "phone",
        formData.fullName || "Sponsorship Lead",
        "Sponsorship Form"
      );
      if (res.success) {
        toast.success(`OTP sent to your ${type === "email" ? "email" : "phone"}`);
        if (type === "email") {
          setEmailOtpSent(true);
          setEmailResendTimer(60);
        } else {
          setMobileOtpSent(true);
          setMobileResendTimer(60);
        }
      } else {
        toast.error(res.message || "Failed to send OTP");
      }
    } catch (e) {
      console.error(e);
      toast.error("Network error");
    } finally {
      setIsVerifying((p) => ({ ...p, [type]: false }));
    }
  };

  const verifyOtp = async (type: "email" | "mobile") => {
    const identifier = type === "email" ? formData.email : formData.phone;
    const otp = type === "email" ? emailOtpValue : mobileOtpValue;
    if (!otp) {
      toast.error("Please enter the OTP");
      return;
    }

    setIsVerifying((p) => ({ ...p, [type]: true }));
    try {
      const res = await otpApi.verify(identifier, otp, type === "email" ? "email" : "phone");
      if (res.success) {
        toast.success(`${type === "email" ? "Email" : "Phone"} verified successfully!`);
        if (type === "email") {
          setEmailOtpVerified(true);
        } else {
          setMobileOtpVerified(true);
        }
      } else {
        toast.error(res.message || "Invalid OTP");
      }
    } catch (e) {
      console.error(e);
      toast.error("Verification error");
    } finally {
      setIsVerifying((p) => ({ ...p, [type]: false }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.fullName.trim() || !formData.companyName.trim() || !formData.email.trim() || !formData.phone.trim() || !formData.category) {
      toast.error("Please fill in all required fields marked with *");
      return;
    }

    if (!emailOtpVerified) {
      toast.error("Please verify your email address via OTP first.");
      return;
    }

    if (!mobileOtpVerified) {
      toast.error("Please verify your mobile number via OTP first.");
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch(`${API_URL}/sponsorship-enquiry`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName: formData.fullName,
          companyName: formData.companyName,
          email: formData.email,
          phone: `${formData.countryCode} ${formData.phone}`,
          category: formData.category,
          message: formData.message,
        }),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        toast.success("Your enquiry has been submitted successfully!");
        setFormData({
          fullName: "",
          companyName: "",
          email: "",
          countryCode: "+91",
          phone: "",
          category: "",
          message: "",
        });
        setEmailOtpSent(false);
        setEmailOtpVerified(false);
        setEmailOtpValue("");
        setEmailResendTimer(0);
        setMobileOtpSent(false);
        setMobileOtpVerified(false);
        setMobileOtpValue("");
        setMobileResendTimer(0);
      } else {
        toast.error(result.message || "Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Enquiry submission error:", error);
      toast.error("Network error. Please check your connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-[#f5f5f5] overflow-hidden">
      {/* SPONSOR HERO SECTION */}
      <section className="relative overflow-hidden bg-[#f5f9ff]">

        {/* HERO SECTION */}
        <div
          className="relative min-h-[480px] bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('/images/sponsor/sponsor-hero.png')",
          }}
        >

          {/* CONTENT */}
          <div className="relative z-20 max-w-[1450px] mx-auto px-4 md:px-10 lg:px-16 pt-6 lg:pt-12 pb-32">

            <div className="grid lg:grid-cols-[1fr_0.95fr] gap-10 items-center">

              {/* LEFT CONTENT */}
              <div>

                <p className="uppercase tracking-[3px] text-[#1E4D92] font-bold text-sm mb-3">
                  Partner For Impact
                </p>

                <h1 className="text-[#0B2C66] text-5xl lg:text-7xl font-black leading-[0.95] uppercase">
                  Sponsor
                  <span className="block text-[#76B82A] mt-1">
                    IHWE EXPO 2026
                  </span>
                </h1>

                                <p className="text-black font-medium text-[17px] leading-8 mt-6 max-w-[650px]">
                                    Position your brand at the forefront of the global health &
                                    wellness industry and connect with leaders, innovators and
                                    decision-makers.
                                </p>

                                {/* STATS IN A STRAIGHT LINE */}
                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 mt-10 w-full">

                                    {[
                                        {
                                            number: "8,000+",
                                            label: "Visitors / Delegates",
                                            icon: "/images/partnership/users.png",
                                        },
                                        {
                                            number: "1,000+",
                                            label: "Global Buyers",
                                            icon: "/images/partnership/global.png",
                                        },
                                        {
                                            number: "150+",
                                            label: "Exhibitors",
                                            icon: "/images/partnership/exhibitors.png",
                                        },
                                        {
                                            number: "150+",
                                            label: "Speakers",
                                            icon: "/images/partnership/delegate.png",
                                        },
                                    ].map((item, idx) => (
                                        <div
                                            key={idx}
                                            className="flex items-center gap-2 sm:gap-3"
                                        >

                                            <img loading="lazy" decoding="async" src={item.icon}
                                                alt=""
                                                className="w-10 h-10 sm:w-12 sm:h-12 object-contain shrink-0"
                                            />

                                            <div>

                                                <h4 className="text-[#0B2C66] font-black text-base sm:text-[18px] leading-none">
                                                    <StatCounter value={item.number} />
                                                </h4>

                                                <p className="text-[#5E6472] text-[11px] sm:text-[12px] mt-1 whitespace-nowrap">
                                                    {item.label}
                                                </p>

                      </div>

                    </div>
                  ))}

                </div>

              </div>

              {/* RIGHT SIDE */}
              <div className="relative flex justify-center lg:justify-end lg:min-h-[400px] mt-8 lg:mt-0">

                {/* FLOATING EVENT CARD */}
                <div className="lg:absolute lg:bottom-[-40px] lg:right-0 bg-[#032C69] text-white rounded-[24px] px-4 py-4 shadow-[0_20px_50px_rgba(0,0,0,0.25)] w-[340px] z-30 mx-auto lg:mx-0">
                  {[
                    {
                      label: "21 – 23 August 2026",
                      icon: "/images/partnership/blue-calender.png",
                    },
                    {
                      label: "Pragati Maidan\nNew Delhi, India",
                      icon: "/images/partnership/location.png",
                    },

                  ].map((item, idx) => (

                    <div key={idx} className="flex items-start gap-4 py-2">

                      <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-xl shrink-0">
                        <img loading="lazy" decoding="async" src={item.icon}
                          alt=""
                          className="w-full h-full object-contain"
                        />
                      </div>

                      <div>

                        <h4 className="font-bold text-[18px] leading-tight pt-1">
                          {item.label}
                        </h4>

                      </div>

                    </div>
                  ))}



                </div>

              </div>

            </div>

          </div>

        </div>

        {/* WHY SPONSOR SECTION */}
        <div className="relative z-20 -mt-20 px-6 md:px-16 lg:px-24 pb-8">

          <div className="max-w-[1450px] mx-auto bg-white rounded-[26px] border border-[#E7EAF0] shadow-[0_15px_60px_rgba(0,0,0,0.06)] overflow-hidden">

            {/* HEADING */}
            <div className="flex items-center justify-center gap-5 pt-3">

              <div className="w-16 h-[2px] bg-[#76B82A]"></div>

              <h2 className="text-[#0B2C66] text-[24px] font-black uppercase text-center">
                Why Sponsor IHWE Expo 2026?
              </h2>

              <div className="w-16 h-[2px] bg-[#76B82A]"></div>

            </div>

            {/* FEATURES */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6">

              {[
                {
                  title: "Increase Brand Visibility",
                  desc: "Showcase your brand to a highly targeted audience.",
                  icon: "/images/partnership/social.png",
                },
                {
                  title: "Network with Key Leaders",
                  desc: "Connect with industry leaders & innovators.",
                  icon: "/images/partnership/network.png",
                },
                {
                  title: "Generate Quality Leads",
                  desc: "Engage with clients, partners & investors.",
                  icon: "/images/partnership/leads.png",
                },
                {
                  title: "Thought Leadership",
                  desc: "Position your organization as an industry leader.",
                  icon: "/images/partnership/idea.png",
                },
                {
                  title: "Exclusive Privileges",
                  desc: "Enjoy VIP access & premium brand exposure.",
                  icon: "/images/partnership/diamond.png",
                },
                {
                  title: "Drive Business Growth",
                  desc: "Expand globally with meaningful partnerships.",
                  icon: "/images/partnership/grow.png",
                },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="text-center px-4 py-4 border-r border-b lg:border-b-0 border-[#ECECEC] last:border-r-0"
                >

                  <div className="w-16 h-16 mx-auto flex items-center justify-center">

                    <img loading="lazy" decoding="async" src={item.icon}
                      alt=""
                      className="w-full h-full object-contain"
                    />

                  </div>

                  <h4 className="text-[#0B2C66] text-[16px] font-bold leading-2 mt-3">
                    {item.title}
                  </h4>

                  <p className="text-[#5E6472] text-[14px] leading-6 mt-1">
                    {item.desc}
                  </p>

                </div>
              ))}

            </div>

          </div>

        </div>

      </section>
      <section className="w-full bg-white py-4 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          {/* ================= HEADING ================= */}
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-[#173A72] uppercase">
              Sponsorship Opportunities
            </h2>
          </div>

        {/* ================= SPONSOR CARDS ================= */}
        <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-8 gap-4">
          {sponsorCards.map((item, index) => (
            <div
              key={index}
              className="bg-white border border-gray-200 rounded-2xl p-4 transition-all duration-300 text-center hover:scale-[1.03] hover:shadow-lg"
              style={{ boxShadow: "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px" }}
            >
              {/* IMAGE */}
              <div className="w-16 h-16 mx-auto flex items-center justify-center">
                <img loading="lazy" decoding="async" src={item.image}
                  alt={item.title}
                  className="w-14 h-14 object-contain"
                />
              </div>

                {/* TITLE */}
                <h3
                  className={`mt-4 text-[13px] font-bold leading-5 ${item.color === "blue"
                      ? "text-[#173A72]"
                      : "text-[#1F8A4C]"
                    }`}
                >
                  {item.title}
                </h3>

                {/* DESCRIPTION */}
                <p className="text-[11px] text-gray-600 mt-2 leading-5">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>

          {/* ================= INFO BAR ================= */}
          <div className="mt-8 mx-6 bg-[#F3F7FD] border border-[#DCE6F8] rounded-2xl px-6 py-5 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">
            {/* LEFT */}
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                <ShieldCheck className="text-blue-700 w-6 h-6" />
              </div>

              <div>
                <h4 className="font-bold text-[#173A72] text-sm uppercase">
                  Limited Sponsorship Slots Available
                </h4>

                <p className="text-sm text-gray-600">
                  Secure your category before it’s gone!
                </p>
              </div>
            </div>

            {/* RIGHT */}
            <div className="text-sm text-gray-600">
              Featured sponsors get exclusive media coverage & brand promotions.
            </div>
          </div>

          {/* ================= COMPARISON TABLE ================= */}
          <div className="mt-8">
            <div className="text-center mb-2">
              <h2 className="text-sm md:text-2xl font-bold text-[#173A72] uppercase">
                Sponsorship Benefits Comparison
              </h2>
            </div>

          {/* ================= MOBILE VIEW (TABS + ACCORDION CARD) ================= */}
          <div className="block lg:hidden w-full">
            {/* Scrollable category tabs */}
            <div className="flex gap-2 overflow-x-auto pb-4 mb-4 scrollbar-none snap-x snap-mandatory">
              {sponsorCards.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveMobileTab(idx)}
                  className={`snap-center shrink-0 px-4 py-2.5 rounded-xl text-xs font-extrabold uppercase transition-all duration-300 ${
                    activeMobileTab === idx
                      ? item.color === "blue"
                        ? "bg-[#173A72] text-white shadow-md scale-105"
                        : "bg-[#1F8A4C] text-white shadow-md scale-105"
                      : "bg-[#F3F7FD] text-gray-600 border border-gray-200"
                  }`}
                >
                  {item.title.replace(" SPONSOR", "").replace(" PARTNER", "")}
                </button>
              ))}
            </div>

            {/* Selected category card details */}
            <div className="w-full bg-white border border-gray-100 rounded-3xl p-5 shadow-md" style={{ boxShadow: "rgba(60, 64, 67, 0.15) 0px 4px 12px 0px" }}>
              {/* Card header */}
              <div className="flex items-center gap-3.5 pb-4 border-b border-gray-100">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${
                  sponsorCards[activeMobileTab].color === "blue" ? "bg-blue-50" : "bg-green-50"
                }`}>
                  <img loading="lazy" decoding="async" src={sponsorCards[activeMobileTab].image}
                    alt=""
                    className="w-8 h-8 object-contain"
                  />
                </div>
                <div>
                  <h4 className={`text-sm font-black tracking-wide uppercase ${
                    sponsorCards[activeMobileTab].color === "blue" ? "text-[#173A72]" : "text-[#1F8A4C]"
                  }`}>
                    {sponsorCards[activeMobileTab].title}
                  </h4>
                  <p className="text-[11px] text-gray-500 leading-snug mt-0.5">
                    {sponsorCards[activeMobileTab].desc}
                  </p>
                </div>
              </div>

              {/* Benefits list */}
              <div className="mt-4 flex flex-col gap-2">
                {comparisonData.map((row, i) => {
                  const val = row.values[activeMobileTab] || "—";
                  return (
                    <div key={i} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0 gap-3">
                      <span className="text-[11px] font-bold text-gray-600 uppercase tracking-wide leading-tight">
                        {row.benefit}
                      </span>
                      <span className={`text-[12px] font-black shrink-0 px-3 py-1 rounded-lg text-center min-w-[75px] ${
                        val === "✔" 
                          ? sponsorCards[activeMobileTab].color === "blue"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-green-100 text-green-800"
                          : "bg-gray-100 text-gray-800"
                      }`}>
                        {val}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* ================= DESKTOP VIEW (FULL TABLE) ================= */}
          <div className="hidden lg:block overflow-x-auto border border-gray-200 rounded-2xl shadow-sm">
            <table className="w-full border-collapse" style={{ minWidth: "1200px" }}>
              {/* TABLE HEADER */}
              <thead>
                <tr>
                  <th className="bg-[#173A72] text-white p-4 text-left text-sm font-semibold sticky left-0 z-20 border-r border-white/10" style={{ minWidth: "220px", boxShadow: "2px 0 5px rgba(0,0,0,0.15)" }}>
                    BENEFITS
                  </th>

                  {sponsorCards.map((item, index) => (
                    <th
                      key={index}
                      className={`p-4 text-white text-xs font-bold text-center ${
                        item.color === "blue"
                          ? "bg-[#025cb4]"
                          : "bg-[#05803f]"
                      }`}
                      style={{ minWidth: "130px" }}
                    >
                      <div className="flex flex-col items-center gap-2">
                        <img loading="lazy" decoding="async" src={item.image}
                          alt={item.title}
                          className="w-7 h-7 object-contain brightness-0 invert"
                        />
                        <span className="leading-tight block uppercase tracking-wider text-[10px]">{item.title}</span>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>

              {/* TABLE BODY */}
              <tbody>
                {comparisonData.map((row, idx) => (
                  <tr
                    key={idx}
                    className="border-b border-gray-200 hover:bg-gray-50 transition-colors"
                  >
                    <td className="p-3.5 text-xs font-bold text-gray-700 bg-white sticky left-0 z-10 border-r border-gray-200/80" style={{ minWidth: "220px", boxShadow: "2px 0 5px rgba(0,0,0,0.05)" }}>
                      {row.benefit}
                    </td>

                     {sponsorCards.map((card, cIdx) => {
                       const value = row.values[cIdx] || '—';
                       return (
                         <td
                           key={cIdx}
                           className="p-3 text-center text-xs text-gray-600 font-semibold"
                           style={{ minWidth: "130px" }}
                         >
                           {value}
                         </td>
                       );
                     })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

            {/* ================= CTA BOX ================= */}
            <div className="mt-8 flex flex-col lg:flex-row items-center justify-between gap-5 bg-[#F8FAFC] border border-gray-200 rounded-2xl px-6 py-5">
              <div>
                <h4 className="font-bold text-[#173A72]">
                  Custom sponsorship packages are also available.
                </h4>

                <p className="text-sm text-gray-600 mt-1">
                  Let’s create something impactful together!
                </p>
              </div>

              <button className="flex items-center gap-2 bg-white border border-[#173A72] text-[#173A72] px-6 py-3 rounded-xl font-semibold hover:bg-[#173A72] hover:text-white transition-all duration-300">
                <Download size={18} />
                DOWNLOAD SPONSORSHIP BROCHURE
              </button>
            </div>
          </div>
        </div>
      </section>
      <section className="w-full bg-[#f5f7fb] py-2 px-4">
        <div className="max-w-7xl mx-auto">

          {/* MAIN WRAPPER */}
          <div className="grid grid-cols-1 lg:grid-cols-[380px_1fr] overflow-hidden rounded-[24px] shadow-[0_10px_40px_rgba(0,0,0,0.08)]">

            {/* LEFT SECTION */}
            <div
              className="relative min-h-[420px] bg-cover bg-center bg-no-repeat p-8 md:p-10 flex items-center"
              style={{
                backgroundImage:
                  "url('/images/partnership/pattern.png')",
              }}
            >


              {/* CONTENT */}
              <div className="relative z-10 max-w-[320px]">

                <h2 className="text-white text-[20px] md:text-[28px] font-extrabold leading-[1.1]">
                  READY TO PARTNER <br />
                  <span className="text-[#d9ff61]">WITH US?</span>
                </h2>

                <p className="text-white/90 text-[15px] leading-7 mt-5">
                  Fill out the form and our team will
                  get in touch with you shortly.
                </p>

                {/* CONTACT INFO */}
                <div className="flex flex-col gap-5 mt-8">

                  {/* PHONE */}
                  <div className="flex items-center gap-4 text-white">

                    <div className="w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center shrink-0">
                      <PhoneCall size={18} />
                    </div>

                    <a
                      href="tel:+919654900525"
                      className="text-[16px] font-medium"
                    >
                      +91 9654900525
                    </a>
                  </div>

                  {/* EMAIL */}
                  <div className="flex items-center gap-4 text-white">

                    <div className="w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center shrink-0">
                      <Mail size={18} />
                    </div>

                    <a
                      href="mailto:info@ihwe.in"
                      className="text-[16px] font-medium"
                    >
                      info@ihwe.in
                    </a>
                  </div>

                  {/* WEBSITE */}
                  <div className="flex items-center gap-4 text-white">

                    <div className="w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center shrink-0">
                      <Globe size={18} />
                    </div>

                    <a
                      href="https://www.ihwe.in"
                      target="_blank"
                      className="text-[16px] font-medium"
                    >
                      www.ihwe.in
                    </a>
                  </div>

                </div>
              </div>

            </div>

            {/* RIGHT FORM SECTION */}
            <div className="bg-white p-6 md:p-8 lg:p-10">

              <form onSubmit={handleSubmit}>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                  {/* FULL NAME */}
                  <div className="flex flex-col">
                    <label className="text-[14px] font-semibold text-[#1c2b4a] mb-2">
                      Full Name *
                    </label>

                    <input
                      type="text"
                      placeholder="Enter full name"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="h-[54px] border border-[#d7dce5] rounded-[10px] px-4 outline-none focus:border-[#0d9448]"
                      required
                    />
                  </div>

                  {/* COMPANY NAME */}
                  <div className="flex flex-col">
                    <label className="text-[14px] font-semibold text-[#1c2b4a] mb-2">
                      Company Name *
                    </label>

                    <input
                      type="text"
                      placeholder="Enter company name"
                      value={formData.companyName}
                      onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                      className="h-[54px] border border-[#d7dce5] rounded-[10px] px-4 outline-none focus:border-[#0d9448]"
                      required
                    />
                  </div>

                  {/* EMAIL */}
                  <div className="flex flex-col">
                    <label className="text-[14px] font-semibold text-[#1c2b4a] mb-2 flex items-center justify-between">
                      <span>Email Address *</span>
                      {emailOtpVerified && (
                        <span className="text-[12px] text-green-600 font-bold uppercase tracking-wider flex items-center gap-1">
                          <ShieldCheck size={14} /> Verified
                        </span>
                      )}
                    </label>

                    <div className="relative flex items-center">
                      <input
                        type="email"
                        placeholder="Enter email address"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        disabled={emailOtpVerified || emailOtpSent}
                        className={`w-full h-[54px] border rounded-[10px] pl-4 pr-[110px] outline-none focus:border-[#0d9448] ${
                          emailOtpVerified
                            ? "bg-green-50 border-green-300 text-green-800"
                            : "border-[#d7dce5]"
                        }`}
                        required
                      />
                      {!emailOtpVerified && (
                        <button
                          type="button"
                          onClick={() => requestOtp("email")}
                          disabled={
                            isVerifying.email ||
                            !formData.email.includes("@") ||
                            emailResendTimer > 0
                          }
                          className="absolute right-2 px-3 py-2 bg-[#0d9448] text-white text-[11px] uppercase font-bold tracking-wider rounded-[8px] hover:bg-[#087539] disabled:bg-slate-300 disabled:text-slate-500 transition-all"
                        >
                          {isVerifying.email
                            ? "..."
                            : emailResendTimer > 0
                            ? `${emailResendTimer}s`
                            : emailOtpSent
                            ? "Resend"
                            : "Send OTP"}
                        </button>
                      )}
                    </div>

                    {emailOtpSent && !emailOtpVerified && (
                      <div className="mt-2 flex gap-2 items-center bg-green-50/50 p-2 border border-green-200 rounded-[10px]">
                        <input
                          type="text"
                          placeholder="Enter Email OTP"
                          value={emailOtpValue}
                          onChange={(e) => setEmailOtpValue(e.target.value)}
                          maxLength={6}
                          className="flex-1 h-[44px] border border-green-300 rounded-[8px] px-4 text-center tracking-[0.3em] font-bold text-sm outline-none focus:border-[#0d9448]"
                        />
                        <button
                          type="button"
                          onClick={() => verifyOtp("email")}
                          disabled={isVerifying.email || emailOtpValue.length < 4}
                          className="h-[44px] bg-[#0d9448] hover:bg-[#087539] text-white text-[12px] font-bold px-4 rounded-[8px] transition-all"
                        >
                          {isVerifying.email ? "..." : "VERIFY"}
                        </button>
                      </div>
                    )}
                  </div>

                  {/* PHONE */}
                  <div className="flex flex-col">
                    <label className="text-[14px] font-semibold text-[#1c2b4a] mb-2 flex items-center justify-between">
                      <span>Phone Number *</span>
                      {mobileOtpVerified && (
                        <span className="text-[12px] text-green-600 font-bold uppercase tracking-wider flex items-center gap-1">
                          <ShieldCheck size={14} /> Verified
                        </span>
                      )}
                    </label>

                    <div className="flex gap-2 relative">
                      <select
                        value={formData.countryCode}
                        onChange={(e) => setFormData({ ...formData, countryCode: e.target.value })}
                        disabled={mobileOtpVerified || mobileOtpSent}
                        className="w-[105px] h-[54px] border border-[#d7dce5] rounded-[10px] px-3 outline-none"
                      >
                        <option value="+91">🇮🇳 +91</option>
                        <option value="+1">🇺🇸 +1</option>
                        <option value="+44">🇬🇧 +44</option>
                        <option value="+971">🇦🇪 +971</option>
                        <option value="+65">🇸🇬 +65</option>
                      </select>

                      <div className="relative flex-1 flex items-center">
                        <input
                          type="text"
                          placeholder="Enter phone number"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          disabled={mobileOtpVerified || mobileOtpSent}
                          className={`w-full h-[54px] border rounded-[10px] pl-4 pr-[110px] outline-none focus:border-[#0d9448] ${
                            mobileOtpVerified
                              ? "bg-green-50 border-green-300 text-green-800"
                              : "border-[#d7dce5]"
                          }`}
                          required
                        />
                        {!mobileOtpVerified && (
                          <button
                            type="button"
                            onClick={() => requestOtp("mobile")}
                            disabled={
                              isVerifying.mobile ||
                              formData.phone.length < 8 ||
                              mobileResendTimer > 0
                            }
                            className="absolute right-2 px-3 py-2 bg-[#0d9448] text-white text-[11px] uppercase font-bold tracking-wider rounded-[8px] hover:bg-[#087539] disabled:bg-slate-300 disabled:text-slate-500 transition-all"
                          >
                            {isVerifying.mobile
                              ? "..."
                              : mobileResendTimer > 0
                              ? `${mobileResendTimer}s`
                              : mobileOtpSent
                              ? "Resend"
                              : "Send OTP"}
                          </button>
                        )}
                      </div>
                    </div>

                    {mobileOtpSent && !mobileOtpVerified && (
                      <div className="mt-2 flex gap-2 items-center bg-green-50/50 p-2 border border-green-200 rounded-[10px]">
                        <input
                          type="text"
                          placeholder="Enter Mobile OTP"
                          value={mobileOtpValue}
                          onChange={(e) => setMobileOtpValue(e.target.value)}
                          maxLength={6}
                          className="flex-1 h-[44px] border border-green-300 rounded-[8px] px-4 text-center tracking-[0.3em] font-bold text-sm outline-none focus:border-[#0d9448]"
                        />
                        <button
                          type="button"
                          onClick={() => verifyOtp("mobile")}
                          disabled={isVerifying.mobile || mobileOtpValue.length < 4}
                          className="h-[44px] bg-[#0d9448] hover:bg-[#087539] text-white text-[12px] font-bold px-4 rounded-[8px] transition-all"
                        >
                          {isVerifying.mobile ? "..." : "VERIFY"}
                        </button>
                      </div>
                    )}
                  </div>

                  {/* CATEGORY */}
                  <div className="flex flex-col">
                    <label className="text-[14px] font-semibold text-[#1c2b4a] mb-2">
                      Interested Sponsorship Category *
                    </label>

                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="h-[54px] border border-[#d7dce5] rounded-[10px] px-4 outline-none focus:border-[#0d9448]"
                      required
                    >
                      <option value="">Select a category</option>
                      {categories.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* MESSAGE */}
                  <div className="flex flex-col">
                    <label className="text-[14px] font-semibold text-[#1c2b4a] mb-2">
                      Message (Optional)
                    </label>

                    <textarea
                      placeholder="Tell us about your sponsorship goals..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="h-[54px] border border-[#d7dce5] rounded-[10px] px-4 pt-3 resize-none outline-none focus:border-[#0d9448]"
                    ></textarea>
                  </div>

                </div>

                {/* BUTTON */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full h-[58px] bg-[#0d9448] hover:bg-[#087539] disabled:bg-[#0d9448]/60 transition-all duration-300 rounded-[10px] text-white text-[18px] font-bold mt-7 flex items-center justify-center gap-3"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="animate-spin" size={20} />
                      SUBMITTING...
                    </>
                  ) : (
                    <>
                      <Send size={20} />
                      SUBMIT ENQUIRY
                    </>
                  )}
                </button>

              </form>
            </div>

          </div>
        </div>
      </section>
    </div>
  )
}

export default Sponsership