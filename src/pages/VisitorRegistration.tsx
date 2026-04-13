import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
    CheckCircle,
    Send, ChevronRight,
    ShieldCheck,
    Loader2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { heroBackgroundApi, SERVER_URL, verifyApi, visitorApi, eventApi, crmApi } from "@/lib/api";
import HeroBg from "@/assets/car22.jpg";



const PURPOSE_GENERAL = [
    "Business Networking",
    "Exploring New Products",
    "Buying Products & Services",
    "Learning Industry Trends",
    "Others"
];

const PURPOSE_CORPORATE = [
    "Business Meeting",
    "Networking & Industry Interaction",
    "Partnership / Collaboration Discussion",
    "Exploring Business Opportunities",
    "Exhibitor / Vendor Meeting",
    "Product Sourcing / Procurement",
    "Market Research",
    "Investment Opportunities",
    "Conference / Seminar Participation"
];

const INTEREST_GENERAL = [
    "AYUSH & Herbal Products",
    "Organic & Natural Products",
    "Fitness & Wellness Equipment",
    "Health Supplements",
    "Hospitals & Healthcare Services",
    "Agriculture & Organic Farming",
    "R&D & Innovations",
    "Others"
];

const INTEREST_CORPORATE = [
    "Medical, Healthcare & Hospital Solutions",
    "Medical Technology, Diagnostics & Devices",
    "AYUSH & Traditional Systems of Medicine",
    "Nutrition, Organic & Health Foods",
    "Beauty, Personal Care & Aesthetic Wellness",
    "Mental Health, Yoga & Spiritual Wellness",
    "Wellness, Fitness & Lifestyle",
    "Institutions, Government Bodies & Startups"
];

const VisitorRegistration = () => {
    const [visitorType, setVisitorType] = useState("corporate");
    const [isSuccess, setIsSuccess] = useState(false);
    const [heroData, setHeroData] = useState<any>(null);
    const [events, setEvents] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    // Cascading Dropdown State
    const [countries, setCountries] = useState<any[]>([]);
    const [states, setStates] = useState<any[]>([]);
    const [cities, setCities] = useState<any[]>([]);
    const [loadingStates, setLoadingStates] = useState(false);
    const [loadingCities, setLoadingCities] = useState(false);

    // OTP States
    const [formData, setFormData] = useState({
        registrationFor: "",
        firstName: "",
        lastName: "",
        gender: "",
        dob: "",
        email: "",
        mobileNo: "",
        designation: "",
        alternateNo: "",
        companyName: "",
        companyWebsite: "",
        industry: "",
        companySize: "",
        country: "India",
        state: "",
        city: "",
        companyPincode:"",
        anyRequirement: "",
        schedulingB2B: "no",
        whatsappUpdates: "yes",
        subscribeNewsletter: true,
        purposeOfVisit: [] as string[],
        areaOfInterest: [] as string[]
    });

    const [emailOtp, setEmailOtp] = useState("");
    const [phoneOtp, setPhoneOtp] = useState("");
    const [emailOtpSent, setEmailOtpSent] = useState(false);
    const [phoneOtpSent, setPhoneOtpSent] = useState(false);
    const [emailVerified, setEmailVerified] = useState(false);
    const [phoneVerified, setPhoneVerified] = useState(false);
    const [isSendingEmailOtp, setIsSendingEmailOtp] = useState(false);
    const [isSendingPhoneOtp, setIsSendingPhoneOtp] = useState(false);
    const [isVerifyingEmail, setIsVerifyingEmail] = useState(false);
    const [isVerifyingPhone, setIsVerifyingPhone] = useState(false);
    const [emailTimer, setEmailTimer] = useState(0);
    const [phoneTimer, setPhoneTimer] = useState(0);
    const [selected, setSelected] = useState<"domestic" | "international" | null>(null);

    useEffect(() => {
        const fetchInitialData = async () => {
            try {
                const [heroRes, eventsRes, countriesRes] = await Promise.all([
                    heroBackgroundApi.getByPage("Registration / Visitor Registration"),
                    eventApi.getActive(),
                    crmApi.getCountries()
                ]);
                if (heroRes) setHeroData(heroRes);
                setEvents(eventsRes);
                setCountries(countriesRes);
            } catch (err) {
                console.error("Error fetching initial data:", err);
            }
        };
        fetchInitialData();
    }, []);

    // Timers
    useEffect(() => {
        let eInterval: any;
        if (emailTimer > 0) {
            eInterval = setInterval(() => setEmailTimer(prev => prev - 1), 1000);
        }
        return () => clearInterval(eInterval);
    }, [emailTimer]);

    useEffect(() => {
        let pInterval: any;
        if (phoneTimer > 0) {
            pInterval = setInterval(() => setPhoneTimer(prev => prev - 1), 1000);
        }
        return () => clearInterval(pInterval);
    }, [phoneTimer]);

    // Cascade: Country -> States
    useEffect(() => {
        const fetchStates = async () => {
            if (!formData.country) {
                setStates([]);
                return;
            }
            const selectedCountry = countries.find(c => c.name === formData.country);
            if (selectedCountry) {
                setLoadingStates(true);
                try {
                    const data = await crmApi.getStates(selectedCountry.countryCode);
                    setStates(data);
                } catch (err) {
                    console.error("Error fetching states:", err);
                } finally {
                    setLoadingStates(false);
                }
            }
        };
        fetchStates();
    }, [formData.country, countries]);

    // Cascade: State -> Cities
    useEffect(() => {
        const fetchCities = async () => {
            if (!formData.state) {
                setCities([]);
                return;
            }
            const selectedState = states.find(s => s.name === formData.state);
            if (selectedState) {
                setLoadingCities(true);
                try {
                    const data = await crmApi.getCities(selectedState.stateCode);
                    setCities(data);
                } catch (err) {
                    console.error("Error fetching cities:", err);
                } finally {
                    setLoadingCities(false);
                }
            }
        };
        fetchCities();
    }, [formData.state, states]);

    const handleInputChange = (e: any) => {
        const { name, value, type, checked } = e.target;
        
        if (name === 'email') setEmailVerified(false);
        if (name === 'mobileNo') setPhoneVerified(false);

        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));

        // Reset cascades
        if (name === "country") {
            setFormData(prev => ({ ...prev, state: "", city: "" }));
            setStates([]);
            setCities([]);
        }
        if (name === "state") {
            setFormData(prev => ({ ...prev, city: "" }));
            setCities([]);
        }
    };

    const handlePurposeChange = (opt: string, checked: boolean) => {
        setFormData(prev => ({
            ...prev,
            purposeOfVisit: checked 
                ? [...prev.purposeOfVisit, opt] 
                : prev.purposeOfVisit.filter(i => i !== opt)
        }));
    };

    const handleInterestChange = (opt: string, checked: boolean) => {
        setFormData(prev => ({
            ...prev,
            areaOfInterest: checked 
                ? [...prev.areaOfInterest, opt] 
                : prev.areaOfInterest.filter(i => i !== opt)
        }));
    };

    const sendEmailOtp = async () => {
        if (!formData.email) {
            alert("Please enter your email first.");
            return;
        }
        setIsSendingEmailOtp(true);
        try {
            const res = await verifyApi.sendEmailOtp(formData.email, 'VISITOR');
            if (res.success) {
                setEmailOtpSent(true);
                setEmailTimer(60);
            } else {
                alert(res.message || "Failed to send OTP");
            }
        } catch (error: any) {
            alert(error.message || "Failed to send OTP");
        } finally {
            setIsSendingEmailOtp(false);
        }
    };

    const confirmEmailOtp = async () => {
        if (!emailOtp) return;
        setIsVerifyingEmail(true);
        try {
            const res = await verifyApi.verifyEmailOtp(formData.email, emailOtp);
            if (res.success) {
                setEmailVerified(true);
            } else {
                alert(res.message || "Invalid OTP");
            }
        } catch (error) {
            alert("Verification failed.");
        } finally {
            setIsVerifyingEmail(false);
        }
    };

    const sendPhoneOtp = async () => {
        if (!formData.mobileNo) {
            alert("Please enter your WhatsApp number.");
            return;
        }
        setIsSendingPhoneOtp(true);
        try {
            const res = await verifyApi.sendPhoneOtp(formData.mobileNo);
            if (res.success) {
                setPhoneOtpSent(true);
                setPhoneTimer(60);
            } else {
                alert(res.message || "Failed to send OTP");
            }
        } catch (error: any) {
            alert(error.message || "Failed to send OTP");
        } finally {
            setIsSendingPhoneOtp(false);
        }
    };

    const confirmPhoneOtp = async () => {
        if (!phoneOtp) return;
        setIsVerifyingPhone(true);
        try {
            const res = await verifyApi.verifyPhoneOtp(formData.mobileNo, phoneOtp);
            if (res.success) {
                setPhoneVerified(true);
            } else {
                alert(res.message || "Invalid OTP");
            }
        } catch (error) {
            alert("Verification failed.");
        } finally {
            setIsVerifyingPhone(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrorMessage("");
        
        if (!emailVerified || !phoneVerified) {
            alert("Please verify both your Email and WhatsApp number.");
            return;
        }
        
        setLoading(true);
        try {
            let payload: any = {};

            if (visitorType === 'general') {
                payload = {
                    registrationFor: formData.registrationFor,
                    firstName: formData.firstName,
                    lastName: formData.lastName,
                    email: formData.email,
                    mobile: formData.mobileNo,
                    alternateNo: formData.alternateNo,
                    dateOfBirth: formData.dob,
                    gender: formData.gender,
                    companyName: formData.companyName,
                    designation: formData.designation,
                    industrySector: formData.industry,
                    country: formData.country,
                    state: formData.state,
                    city: formData.city,
                    subscribe: formData.subscribeNewsletter,
                    purposeOfVisit: {
                        businessNetworking: formData.purposeOfVisit.includes("Business Networking"),
                        exploringProducts: formData.purposeOfVisit.includes("Exploring New Products"),
                        buyingProducts: formData.purposeOfVisit.includes("Buying Products & Services"),
                        learningTrends: formData.purposeOfVisit.includes("Learning Industry Trends"),
                        others: formData.purposeOfVisit.includes("Others")
                    },
                    areaOfInterest: {
                        ayushHerbal: formData.areaOfInterest.includes("Mediacal Healthcare & Hospital Solution"),
                        organicProducts: formData.areaOfInterest.includes("AYUSH & Traditional Systems of Medicine"),
                        fitnessWellness: formData.areaOfInterest.includes("Wellness, Fitness & Lifestyle"),
                        healthSupplements: formData.areaOfInterest.includes("Nutrition, Organic & Health Foods"),
                        healthcareServices: formData.areaOfInterest.includes("Beauty, Personal Care & Aesthetic Wellness"),
                        agricultureFarming: formData.areaOfInterest.includes("Mental Health, Yoga & Spiritual Wellness"),
                        researchInnovations: formData.areaOfInterest.includes("Medical Technology, Diagnostics & Devices"),
                        others: formData.areaOfInterest.includes("Institutions, Government Bodies & Startups")
                    }
                };
            } else {
                payload = {
                    registrationFor: formData.registrationFor,
                    firstName: formData.firstName,
                    lastName: formData.lastName,
                    email: formData.email,
                    mobile: formData.mobileNo,
                    designation: formData.designation,
                    companyName: formData.companyName,
                    companyWebsite: formData.companyWebsite,
                    industrySector: formData.industry,
                    companySize: formData.companySize,
                    country: formData.country,
                    state: formData.state,
                    city: formData.city,
                    b2bMeeting: formData.schedulingB2B,
                    whatsappUpdates: formData.whatsappUpdates,
                    specificRequirement: formData.anyRequirement,
                    subscribe: formData.subscribeNewsletter,
                    purposeOfVisit: {
                        exploringBusiness: formData.purposeOfVisit.includes("Exploring Business Opportunities"),
                        meetingExhibitors: formData.purposeOfVisit.includes("Meeting Exhibitors & Suppliers"),
                        attendingSeminar: formData.purposeOfVisit.includes("Attending Arogya Sangosthi Seminar"),
                        networking: formData.purposeOfVisit.includes("Networking & Collaborations"),
                        learningTrends: formData.purposeOfVisit.includes("Learning About Latest Trends")
                    },
                    areaOfInterest: {
                       mediacal: formData.areaOfInterest.includes("Medical, Healthcare & Hospital Solutions"),
                        ayush: formData.areaOfInterest.includes("AYUSH & Traditional Systems of Medicine"),
                        wellness: formData.areaOfInterest.includes("Wellness, Fitness & Lifestyle"),
                        Nutrition: formData.areaOfInterest.includes("Nutrition, Organic & Health Foods"),
                        beauty: formData.areaOfInterest.includes("Beauty, Personal Care & Aesthetic Wellness"),
                        mental: formData.areaOfInterest.includes("Mental Health, Yoga & Spiritual Wellness"),
                        medicaltech: formData.areaOfInterest.includes("Medical Technology, Diagnostics & Devices"),
                        institution: formData.areaOfInterest.includes("Institutions, Government Bodies & Startups")
                    }
                };
            }

            const res = visitorType === 'corporate' 
                ? await visitorApi.submitCorporate(payload)
                : await visitorApi.submitGeneral(payload);

            if (res.success || res.data) {
                setIsSuccess(true);
                window.scrollTo({ top: 0, behavior: "smooth" });
                setTimeout(() => {
                    setFormData({
                        registrationFor: "",
                        firstName: "",
                        lastName: "",
                        gender: "",
                        dob: "",
                        email: "",
                        mobileNo: "",
                        designation: "",
                        alternateNo: "",
                        companyName: "",
                        companyWebsite: "",
                        industry: "",
                        companySize: "",
                        country: "India",
                        state: "",
                        city: "",
                        companyPincode:"",
                        anyRequirement: "",
                        schedulingB2B: "no",
                        whatsappUpdates: "yes",
                        subscribeNewsletter: true,
                        purposeOfVisit: [],
                        areaOfInterest: []
                    });
                    setEmailVerified(false);
                    setPhoneVerified(false);
                    setIsSuccess(false);
                }, 5000);
            } else {
                throw new Error(res.message || 'Registration failed');
            }
        } catch (error: any) {
            setErrorMessage(error.message || "Something went wrong. Please try again.");
            alert("Error: " + (error.message || "Submission failed. Please check your data."));
        } finally {
            setLoading(false);
        }
    };

    const inputClasses =
        "rounded-[2px] border-slate-400 h-8 focus:border-[#23471d] focus:ring-[#23471d]/10 transition-all text-[12px] bg-white placeholder:text-slate-400 text-slate-900 font-medium shadow-none outline-none px-3 w-full text-left";
    const labelClasses =
        "text-[10px] font-bold uppercase tracking-[0.05em] text-slate-800 mb-1 block";

    return (
        <div className="min-h-screen bg-[#FDFDFD] font-inter text-slate-900">
            {/* ── HERO SECTION - Registration Standard 16:5 ── */}
            <section
                className="hero-background-registration"
                style={{
                    backgroundImage: `url(${heroData?.backgroundImage ? `${SERVER_URL}${heroData.backgroundImage}` : HeroBg})`
                }}
            >
                <div className="absolute inset-0 bg-black/45" />

                <div
                    className="container mx-auto px-4 text-center text-white relative z-10"
                    data-aos="fade-up"
                >
                    <p className="text-sm uppercase tracking-[0.4em] mb-4 opacity-80">
                        {heroData?.title || "Visitor Experience"}
                    </p>

                    <h1 
                        className="text-4xl md:text-6xl font-serif font-semibold mb-6 italic tracking-tight"
                    >
                        {heroData?.heading || "Witness the Future of Wellness"}
                    </h1>

                    <p className="text-white/70 text-base md:text-lg mb-8 max-w-xl mx-auto font-light leading-relaxed">
                        {heroData?.shortDescription || "Join 8,000+ healthcare professionals and discover the latest innovations in health and wellness."}
                    </p>

                </div>
            </section>

            {/* ── MAIN CONTENT ── */}
            <section className="pt-8 pb-24 relative overflow-hidden">
                <div className="container mx-auto px-6 max-w-[1400px]">
                    <motion.div
                                    key="form"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    className="bg-white border border-slate-300 shadow-2xl overflow-hidden"
                                >
                            
{/* ================= VISITOR SELECTION ================= */}
{!selected && (
    <>
    <div className="bg-slate-50/80 border-b border-slate-200 px-8 py-4 justify-between items-center">
                                 <h3 className="text-[22px] mb-2 font-semibold text-[#d26019]">
    Welcome to the 9th Edition of International Health & Wellness Expo 2026 (IHWE Global Edition)
  </h3>

  <p className="mb-2">
    Step into IHWE 2026, a leading global platform uniting healthcare, wellness, AYUSH, organic, and sustainable industries under one roof.
  </p>

  <p className="mb-2">
    Whether you are a visitor discovering innovations or a corporate buyer seeking meaningful business connections, IHWE offers a high-value, curated experience with India’s most trusted brands and manufacturers.
  </p>

  <p className="mb-2">
    Register now and be part of a powerful global movement in health & wellness.
  </p>    
</div>
   
  <div className="text-center py-12 space-y-6">

    <h2 className="text-2xl font-bold text-slate-800">
      Choose Visitor Category
    </h2>

    <div className="flex justify-center gap-6">

      <button
        onClick={() => setSelected("domestic")}
        className="px-4 py-2 bg-[#23471d] text-white font-semibold shadow hover:scale-105 transition-all"
      >
        Domestic Visitor
      </button>

      <button
        onClick={() => setSelected("international")}
        className="px-4 py-2 bg-[#d26019] text-white font-semibold shadow hover:scale-105 transition-all"
      >
        International Visitor
      </button>

    </div>
  </div>
   </>
)}


                                </motion.div>
                     
                    <div className="space-y-8">
                    <AnimatePresence mode="wait">
                          {isSuccess && (
  <motion.div
    key="success"
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.95 }}
    className="bg-white border border-green-300 p-16 flex flex-col items-center justify-center min-h-[500px] shadow-2xl relative overflow-hidden"
  >
    <div className="absolute top-0 left-0 w-full h-1 bg-green-500" />

    <CheckCircle className="w-24 h-24 text-green-500 mb-8 animate-bounce-short" />

    <h3 className="text-3xl font-serif font-bold text-slate-900 mb-4 text-center">
      Registration Success!
    </h3>

    <p className="text-slate-600 text-center text-lg max-w-md mb-8 leading-relaxed">
      Thank you for registering. Your details have been successfully submitted.
    </p>

    <div className="flex items-center gap-3 text-sm text-slate-400 font-bold uppercase tracking-widest">
      <div className="w-2.5 h-2.5 rounded-full bg-green-400 animate-pulse" />
      Redirecting in 5 seconds...
    </div>

    <div className="mt-10 flex gap-4">
      <Button
        onClick={() => {
          setIsSuccess(false);
          setSelected(null); // ✅ IMPORTANT (back to buttons)
        }}
        className="h-11 px-8 rounded-sm bg-[#23471d] hover:bg-[#1a3516] text-xs font-bold uppercase tracking-widest"
      >
        Register Another
      </Button>

      <Link to="/">
        <Button className="h-11 px-8 rounded-sm bg-[#d26019] hover:bg-[#a84c14] text-xs font-bold uppercase tracking-widest">
          Go Home
        </Button>
      </Link>
    </div>
  </motion.div>
)}
                             
                  {selected === "domestic" && !isSuccess && (
                   <motion.div
                                    key="form"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    className="bg-white border border-slate-300 shadow-2xl overflow-hidden"
                                >
                                   
                            <div className="bg-slate-50/80 border-b border-slate-200 px-8 py-4 flex justify-between items-center">
                                {/* LEFT SIDE */}
                                <div>
                                    <h2 
                                        className="text-xl font-bold text-slate-900 uppercase"
                                        style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                                    >
                                        Domestic Visitor Registration
                                    </h2>
                                    <p className="text-[10px] text-slate-500 uppercase tracking-[0.2em] mt-0.5 font-bold">
                                       9th Edition of International Health & Wellness Expo 2026 (IHWE Global Edition)
                                    </p>
                                </div>

                                {/* RIGHT SIDE */}
                                <Link to="/buyer-registration">
                                    <Button 
                                        type="button"
                                        variant="outline"
                                        className="px-6 h-9 border-[#d26019] text-[#d26019] hover:bg-[#d26019] hover:text-white text-[14px] font-bold uppercase tracking-wider transition-all"
                                    >
                                        Buyer Registeration
                                    </Button>
                                </Link>

                            </div>

                                    <form onSubmit={handleSubmit} className="p-8 space-y-4 font-inter">
                                        {/* ── VISITOR TYPE ── */}
                                        
                                        <div className="flex flex-wrap items-center gap-12">
                                            <RadioGroup
                                                defaultValue="corporate"
                                                value={visitorType}
                                                className="flex flex-wrap gap-10"
                                                onValueChange={(v) => setVisitorType(v)}
                                            >
                                                <div className="flex items-center space-x-3">
                                                    <RadioGroupItem value="corporate" id="corporate" className="w-5 h-5 border-slate-400 text-[#23471d]" />
                                                    <Label htmlFor="corporate" className="text-sm font-bold text-slate-700 cursor-pointer flex items-center gap-2">
                                                        Corporate Visitor
                                                    </Label>
                                                </div>
                                                <div className="flex items-center space-x-3">
                                                    <RadioGroupItem value="general" id="general" className="w-5 h-5 border-slate-400 text-[#23471d]" />
                                                    <Label htmlFor="general" className="text-sm font-bold text-slate-700 cursor-pointer flex items-center gap-2">
                                                        General Visitor
                                                    </Label>
                                                </div>
                                            </RadioGroup>

                                            
                                        </div>

                                        {/* ── PERSONAL DETAILS ── */}
                                        <div className="">
                                            <h3 
                                                className="text-sm font-bold text-[#d26019] uppercase tracking-[0.05em] border-b border-slate-100 pb-1.5"
                                                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                                            >
                                                Personal Information
                                            </h3>
                                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-x-5 gap-y-4">
                                                
                                                <div>
                                                    <Label className={labelClasses}>FIRST NAME *</Label>
                                                    <Input 
                                                        name="firstName"
                                                        value={formData.firstName}
                                                        onChange={handleInputChange}
                                                        required placeholder="Enter First Name" className={inputClasses} 
                                                    />
                                                </div>
                                                <div>
                                                    <Label className={labelClasses}>LAST NAME *</Label>
                                                    <Input 
                                                        name="lastName"
                                                        value={formData.lastName}
                                                        onChange={handleInputChange}
                                                        required placeholder="Enter Last Name" className={inputClasses} 
                                                    />
                                                </div>
                                                {visitorType === "corporate" && (
                                                    <div>
                                                        <Label className={labelClasses}>DESIGNATION *</Label>
                                                        <Input 
                                                            name="designation"
                                                            value={formData.designation}
                                                            onChange={handleInputChange}
                                                            required placeholder="Enter Designation.." className={inputClasses} 
                                                        />
                                                    </div>
                                                )}
                                                <div>
                                                    <Label className={labelClasses}>GENDER *</Label>
                                                    <Select
                                                        onValueChange={(v) => setFormData(prev => ({ ...prev, gender: v }))}
                                                        value={formData.gender}
                                                    >
                                                        <SelectTrigger className={inputClasses}>
                                                            <SelectValue placeholder="Select Here" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <SelectItem value="male">Male</SelectItem>
                                                            <SelectItem value="female">Female</SelectItem>
                                                            <SelectItem value="others">Others</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                </div>
                                                <div>
                                                    <Label className={labelClasses}>DATE OF BIRTH (OPTIONAL)</Label>
                                                    <Input 
                                                        name="dob"
                                                        value={formData.dob}
                                                        onChange={handleInputChange}
                                                        type="date" className={inputClasses} 
                                                    />
                                                </div>
                                                
                                                {/* Phone & OTP Row */}
                                                <div className="relative flex flex-col group">
                                                    <Label className={labelClasses}>MOBILE NO. (WHATSAPP) *</Label>
                                                    <div className="relative flex items-center">
                                                        <Input 
                                                            name="mobileNo"
                                                            value={formData.mobileNo}
                                                            onChange={handleInputChange}
                                                            disabled={phoneVerified || phoneOtpSent}
                                                            required placeholder="Enter WhatsApp Number" 
                                                            className={`${inputClasses} pr-20 ${phoneVerified ? "bg-green-50 border-green-200 text-green-700" : ""}`} 
                                                        />
                                                        {!phoneVerified && (
                                                            <button
                                                                type="button"
                                                                onClick={sendPhoneOtp}
                                                                disabled={isSendingPhoneOtp || !formData.mobileNo || phoneTimer > 0}
                                                                className="absolute right-1 px-3 py-1 bg-[#23471d] text-white text-[9px] uppercase font-bold tracking-wider rounded-sm hover:bg-[#1a3a14] disabled:bg-slate-300 transition-all"
                                                            >
                                                                {isSendingPhoneOtp ? "..." : phoneTimer > 0 ? `${phoneTimer}s` : phoneOtpSent ? "RE-SEND" : "SEND OTP"}
                                                            </button>
                                                        )}
                                                        {phoneVerified && <CheckCircle size={14} className="absolute right-3 text-green-500" />}
                                                    </div>
                                                </div>
                                                <div>
                                                    <Label className={labelClasses}>ALTERNATE NO. (OPTIONAL)</Label>
                                                    <Input 
                                                        name="alternateNo"
                                                        value={formData.alternateNo}
                                                        onChange={handleInputChange}
                                                        placeholder="Enter Alternate No." className={inputClasses} 
                                                    />
                                                </div>
                                                {/* Email & OTP Row */}
                                                <div className="relative flex flex-col group lg:col-span-2">
                                                    <Label className={labelClasses}>EMAIL ADDRESS *</Label>
                                                    <div className="relative flex items-center">
                                                        <Input 
                                                            name="email"
                                                            value={formData.email}
                                                            onChange={handleInputChange}
                                                            disabled={emailVerified || emailOtpSent}
                                                            type="email" required placeholder="Enter Email Address" 
                                                            className={`${inputClasses} pr-20 ${emailVerified ? "bg-green-50 border-green-200 text-green-700" : ""}`} 
                                                        />
                                                        {!emailVerified && (
                                                            <button
                                                                type="button"
                                                                onClick={sendEmailOtp}
                                                                disabled={isSendingEmailOtp || !formData.email || emailTimer > 0}
                                                                className="absolute right-1 px-3 py-1 bg-[#d26019] text-white text-[9px] uppercase font-bold tracking-wider rounded-sm hover:bg-[#a84c14] disabled:bg-slate-300 transition-all"
                                                            >
                                                                {isSendingEmailOtp ? "..." : emailTimer > 0 ? `${emailTimer}s` : emailOtpSent ? "RE-SEND" : "SEND OTP"}
                                                            </button>
                                                        )}
                                                        {emailVerified && <CheckCircle size={14} className="absolute right-3 text-green-500" />}
                                                    </div>
                                                </div>

                                                
                                                
                                            </div>

                                            {/* ── DUAL OTP INPUT GRID ── */}
                                            <AnimatePresence>
                                                {((emailOtpSent && !emailVerified) || (phoneOtpSent && !phoneVerified)) && (
                                                    <motion.div
                                                        initial={{ opacity: 0, height: 0 }}
                                                        animate={{ opacity: 1, height: "auto" }}
                                                        exit={{ opacity: 0, height: 0 }}
                                                        className="grid grid-cols-1 md:grid-cols-2 gap-4 pb-4 overflow-hidden"
                                                    >
                                                        {/* WhatsApp OTP Column */}
                                                        <div>
                                                            {phoneOtpSent && !phoneVerified && (
                                                                <div className="flex gap-2 items-center bg-orange-50/50 p-2 border border-orange-100 rounded-sm">
                                                                    <Input 
                                                                        value={phoneOtp}
                                                                        onChange={(e) => setPhoneOtp(e.target.value)}
                                                                        placeholder="WhatsApp OTP" 
                                                                        className="flex-1 h-9 rounded-sm border-orange-200 text-center tracking-[0.3em] font-bold text-xs"
                                                                        maxLength={6}
                                                                        autoComplete="off"
                                                                        name="visitor-phone-otp-field"
                                                                        inputMode="numeric"
                                                                    />
                                                                    <Button
                                                                        type="button"
                                                                        onClick={confirmPhoneOtp}
                                                                        disabled={isVerifyingPhone || phoneOtp.length < 4}
                                                                        className="h-9 bg-[#23471d] hover:bg-[#1a3516] text-[10px] font-bold px-4"
                                                                    >
                                                                        {isVerifyingPhone ? "..." : "VERIFY"}
                                                                    </Button>
                                                                </div>
                                                            )}
                                                        </div>

                                                        {/* Email OTP Column */}
                                                        <div>
                                                            {emailOtpSent && !emailVerified && (
                                                                <div className="flex gap-2 items-center bg-orange-50/50 p-2 border border-orange-100 grid-col-3 rounded-sm">
                                                                    <Input 
                                                                        value={emailOtp}
                                                                        onChange={(e) => setEmailOtp(e.target.value)}
                                                                        placeholder="Email OTP" 
                                                                        className="flex-1 h-9 rounded-sm border-orange-200 text-center tracking-[0.3em] font-bold text-xs"
                                                                        maxLength={6}
                                                                        autoComplete="off"
                                                                        name="visitor-email-otp-field"
                                                                        inputMode="numeric"
                                                                    />
                                                                    <Button
                                                                        type="button"
                                                                        onClick={confirmEmailOtp}
                                                                        disabled={isVerifyingEmail || emailOtp.length < 4}
                                                                        className="h-9 bg-[#d26019] hover:bg-[#a84c14] text-[10px] font-bold px-4"
                                                                    >
                                                                        {isVerifyingEmail ? "..." : "VERIFY"}
                                                                    </Button>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </div>

                                        {/* ── PROFESSIONAL DETAILS ── */}
                                        {visitorType === "corporate" && (
                                            <div className="space-y-2">
                                                <h3 
                                                    className="text-sm font-bold text-[#d26019] uppercase tracking-[0.05em] border-b border-slate-400 pb-1.5"
                                                    style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                                                >
                                                    Company & Industry Information
                                                </h3>
                                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-x-5 gap-y-4">
                                                    <div className="lg:col-span-2">
                                                        <Label className={labelClasses}>COMPANY NAME *</Label>
                                                        <Input 
                                                            name="companyName"
                                                            value={formData.companyName}
                                                            onChange={handleInputChange}
                                                            required placeholder="Enter Company Name.." className={inputClasses} 
                                                        />
                                                    </div>
                                                    <div>
                                                        <Label className={labelClasses}>COMPANY WEBSITE *</Label>
                                                        <Input 
                                                            name="companyWebsite"
                                                            value={formData.companyWebsite}
                                                            onChange={handleInputChange}
                                                            required placeholder="Enter Company Website.." className={inputClasses} 
                                                        />
                                                    </div>
                                                    <div>
                                                        <Label className={labelClasses}>INDUSTRY/SECTOR *</Label>
                                                        <Select
                                                            onValueChange={(v) => setFormData(prev => ({ ...prev, industry: v }))}
                                                            value={formData.industry}
                                                        >
                                                            <SelectTrigger className={inputClasses}>
                                                                <SelectValue placeholder="Select Here" />
                                                            </SelectTrigger>
                                                            <SelectContent className="bg-white">
                                                                <SelectItem value="ayush">AYUSH</SelectItem>
                                                                <SelectItem value="agriculture">Agriculture & Organic</SelectItem>
                                                                <SelectItem value="fitness">Fitness & Wellness</SelectItem>
                                                                <SelectItem value="healthcare">Healthcare Services</SelectItem>
                                                                <SelectItem value="pharma">Pharmaceutical</SelectItem>
                                                                <SelectItem value="others">Others</SelectItem>
                                                                </SelectContent>
                                                            </Select>
                                                        </div>
                                                        <div>
                                                            <Label className={labelClasses}>COMPANY SIZE *</Label>
                                                            <Select
                                                                onValueChange={(v) => setFormData(prev => ({ ...prev, companySize: v }))}
                                                                value={formData.companySize}
                                                            >
                                                                <SelectTrigger className={inputClasses}>
                                                                    <SelectValue placeholder="Select Here" />
                                                                </SelectTrigger>
                                                                <SelectContent className="bg-white">
                                                                    <SelectItem value="1-10">1-10 Employees</SelectItem>
                                                                    <SelectItem value="11-50">11-50 Employees</SelectItem>
                                                                    <SelectItem value="51-200">51-200 Employees</SelectItem>
                                                                    <SelectItem value="200+">200+ Employees</SelectItem>
                                                                </SelectContent>
                                                            </Select>
                                                        </div>
                                                    {visitorType != "corporate" && (
                                                    <div>
                                                        <Label className={labelClasses}>COUNTRY *</Label>
                                                        <Select
                                                            onValueChange={(v) => handleInputChange({ target: { name: 'country', value: v } })}
                                                            value={formData.country}
                                                        >
                                                            <SelectTrigger className={inputClasses}>
                                                                <SelectValue placeholder="Select Country" />
                                                            </SelectTrigger>
                                                            <SelectContent className="max-h-[300px] bg-white">
                                                                {countries.map(c => (
                                                                    <SelectItem key={c._id || c.name} value={c.name}>{c.name}</SelectItem>
                                                                ))}
                                                            </SelectContent>
                                                        </Select>
                                                    </div>
                                                    )}
                                                    <div>
                                                        <Label className={labelClasses}>STATE *</Label>
                                                        <Select 
                                                            disabled={!formData.country || loadingStates}
                                                            onValueChange={(v) => handleInputChange({ target: { name: 'state', value: v } })}
                                                            value={formData.state}
                                                        >
                                                            <SelectTrigger className={inputClasses}>
                                                                <SelectValue placeholder={loadingStates ? "Loading..." : "Select State"} />
                                                            </SelectTrigger>
                                                            <SelectContent className="max-h-[300px] bg-white">
                                                                {states.map(s => (
                                                                    <SelectItem key={s._id || s.name} value={s.name}>{s.name}</SelectItem>
                                                                ))}
                                                            </SelectContent>
                                                        </Select>
                                                    </div>
                                                    <div>
                                                        <Label className={labelClasses}>CITY *</Label>
                                                        <Select 
                                                            disabled={!formData.state || loadingCities}
                                                            onValueChange={(v) => handleInputChange({ target: { name: 'city', value: v } })}
                                                            value={formData.city}
                                                        >
                                                            <SelectTrigger className={inputClasses}>
                                                                <SelectValue placeholder={loadingCities ? "Loading..." : "Select City"} />
                                                            </SelectTrigger>
                                                            <SelectContent className="max-h-[300px] bg-white">
                                                                {cities.map(ct => (
                                                                    <SelectItem key={ct._id || ct.name} value={ct.name}>{ct.name}</SelectItem>
                                                                ))}
                                                            </SelectContent>
                                                        </Select>
                                                    </div>
                                                    <div>
                                                        <Label className={labelClasses}>Pincode *</Label>
                                                        <Input 
                                                            name="companyWebsite"
                                                            value={formData.companyPincode}
                                                            onChange={handleInputChange}
                                                            required placeholder="Enter Pincode" className={inputClasses} 
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        )}

                                        {/* ── PURPOSE & INTEREST ── */}
                                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                            {/* Purpose of Visit */}
                                            <div className="space-y-4 bg-slate-50/50 p-5 border border-slate-300 rounded-[2px] shadow-sm">
                                                <Label className="text-[11px] font-bold text-[#23471d] uppercase tracking-wider block border-b border-slate-200 pb-2">Purpose of Visit *</Label>
                                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                                                    {(visitorType === "corporate" ? PURPOSE_CORPORATE : PURPOSE_GENERAL).map((opt) => (
                                                        <label key={opt} className="flex items-center gap-3 cursor-pointer group">
                                                            <Checkbox 
                                                                checked={formData.purposeOfVisit.includes(opt)}
                                                                onCheckedChange={(checked: boolean) => handlePurposeChange(opt, checked)}
                                                                className="rounded-none w-3.5 h-3.5 border-slate-400 data-[state=checked]:bg-[#23471d] data-[state=checked]:border-[#23471d]" 
                                                            />
                                                            <span className="text-[11px] text-slate-600 group-hover:text-slate-900 font-medium transition-colors">{opt}</span>
                                                        </label>
                                                    ))}
                                                </div>
                                            </div>

                                            {/* Area of Interest */}
                                            <div className="space-y-4 bg-slate-50/50 p-5 border border-slate-300 rounded-[2px] shadow-sm">
                                                <Label className="text-[11px] font-bold text-[#23471d] uppercase tracking-wider block border-b border-slate-200 pb-2">Area of Interest *</Label>
                                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                                                    {(visitorType === "corporate" ? INTEREST_CORPORATE : INTEREST_GENERAL).map((opt) => (
                                                        <label key={opt} className="flex items-center gap-3 cursor-pointer group">
                                                            <Checkbox 
                                                                checked={formData.areaOfInterest.includes(opt)}
                                                                onCheckedChange={(checked: boolean) => handleInterestChange(opt, checked)}
                                                                className="rounded-none w-3.5 h-3.5 border-slate-400 data-[state=checked]:bg-[#23471d] data-[state=checked]:border-[#23471d]" 
                                                            />
                                                            <span className="text-[11px] text-slate-600 group-hover:text-slate-900 font-medium transition-colors">{opt}</span>
                                                        </label>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>

                                        {visitorType === "corporate" && (
                                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-4">
                                                <div className="space-y-4 text-left">
                                                    <Label className="text-[11px] font-bold text-slate-900 uppercase tracking-wider block">Would you like to schedule B2B meetings? *</Label>
                                                    <RadioGroup 
                                                        value={formData.schedulingB2B}
                                                        onValueChange={(v) => setFormData(prev => ({ ...prev, schedulingB2B: v }))}
                                                        className="flex gap-6"
                                                    >
                                                        <div className="flex items-center space-x-2">
                                                            <RadioGroupItem value="yes" id="b2b-yes" className="w-4 h-4 border-slate-400 text-[#23471d]" />
                                                            <Label htmlFor="b2b-yes" className="text-sm font-medium text-slate-600 cursor-pointer">Yes</Label>
                                                        </div>
                                                        <div className="flex items-center space-x-2">
                                                            <RadioGroupItem value="no" id="b2b-no" className="w-4 h-4 border-slate-400 text-[#23471d]" />
                                                            <Label htmlFor="b2b-no" className="text-sm font-medium text-slate-600 cursor-pointer">No</Label>
                                                        </div>
                                                    </RadioGroup>
                                                </div>
                                                <div className="space-y-4 text-left">
                                                    <Label className="text-[11px] font-bold text-slate-900 uppercase tracking-wider block">Would you like updates via WhatsApp? *</Label>
                                                    <RadioGroup 
                                                        value={formData.whatsappUpdates}
                                                        onValueChange={(v) => setFormData(prev => ({ ...prev, whatsappUpdates: v }))}
                                                        className="flex gap-6"
                                                    >
                                                        <div className="flex items-center space-x-2">
                                                            <RadioGroupItem value="yes" id="wa-yes" className="w-4 h-4 border-slate-400 text-[#23471d]" />
                                                            <Label htmlFor="wa-yes" className="text-sm font-medium text-slate-600 cursor-pointer">Yes</Label>
                                                        </div>
                                                        <div className="flex items-center space-x-2">
                                                            <RadioGroupItem value="no" id="wa-no" className="w-4 h-4 border-slate-400 text-[#23471d]" />
                                                            <Label htmlFor="wa-no" className="text-sm font-medium text-slate-600 cursor-pointer">No</Label>
                                                        </div>
                                                    </RadioGroup>
                                                </div>
                                            </div>
                                        )}

                                        {visitorType === "corporate" && (
                                            <div className="space-y-2">
                                                <Label className="text-[11px] font-bold text-slate-900 uppercase tracking-wider block">Any Specific requirement</Label>
                                                <Input 
                                                    name="anyRequirement"
                                                    value={formData.anyRequirement}
                                                    onChange={handleInputChange}
                                                    placeholder="Write Here .." className={inputClasses} 
                                                />
                                            </div>
                                        )}

                                        {/* ── NEWSLETTER ── */}
                                        <div className="pt-4 border-t border-slate-100">
                                            <label className="flex items-center gap-3 cursor-pointer group">
                                                <Checkbox 
                                                    checked={formData.subscribeNewsletter}
                                                    onCheckedChange={(checked: boolean) => setFormData(prev => ({ ...prev, subscribeNewsletter: checked }))}
                                                    className="rounded-none w-4 h-4 border-slate-400 data-[state=checked]:bg-[#23471d] data-[state=checked]:border-[#23471d]" 
                                                />
                                                <span className="text-[11px] font-bold text-slate-700 uppercase tracking-wide">Subscribe to Event Updates & Newsletters</span>
                                            </label>
                                        </div>

                                        {/* ── SUBMIT BAR ── */}
                                        <div className="pt-6 flex flex-col items-center">
                                            <Button
                                                type="submit"
                                                disabled={loading || !emailVerified || !phoneVerified}
                                                className="w-full max-w-56 h-12 rounded-sm bg-[#23471d] hover:bg-[#1a3516] text-white font-bold text-xs uppercase tracking-widest transition-all duration-300 shadow-xl shadow-[#23471d]/10 flex items-center justify-center gap-3 group disabled:opacity-70 disabled:cursor-not-allowed"
                                            >
                                                {loading ? (
                                                    <>
                                                        <Loader2 className="w-5 h-5 animate-spin"/>
                                                        <span>SUBMITTING...</span>
                                                    </>
                                                ) : (
                                                    <>
                                                        SUBMIT REGISTRATION
                                                        <Send size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                                    </>
                                                )}
                                            </Button>
                                            <p className="mt-4 text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em] flex items-center gap-2">
                                                <ShieldCheck size={12} className="text-[#23471d]" />
                                                Secure Registration Portal
                                            </p>
                                        </div>
                                    </form>
                                </motion.div>
                            
                        )}
                    
                        </AnimatePresence>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default VisitorRegistration;