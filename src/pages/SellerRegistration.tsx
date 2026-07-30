import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
    CheckCircle,
    ChevronDown,
    Smartphone,
    AtSign,
    Loader2,
    Check,
    CreditCard,
    AlertTriangle,
    FileText,
    Lock,
    Ban,
    Globe,
    Building2,
    Info,
    Tag,
    Briefcase,
    Calendar,
    Clock,
    Users,
    Upload,
    Package,
    Send,
    ShieldCheck
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

import {
    heroBackgroundApi,
    SERVER_URL,
    crmApi,
    otpApi,
    sellerRegistrationApi,
    policyApi,
    publicApi
} from "@/lib/api";

import HeroBg from "@/assets/car22.webp";

// --- Types & Constants ---

const SELLER_ROLES = [
    { title: 'Industry Leaders', items: ['Manufacturer', 'Exporter', 'Large Scale Industry', 'Company Director', 'CEO/Founder', 'Brand Owner'] },
    { title: 'Trade & Distribution', items: ['Distributor', 'Wholesaler', 'Importer', 'Authorized Dealer', 'Trade Agent', 'Stockist'] },
    { title: 'Retail & Consumer', items: ['Retailer', 'Store Owner', 'E-commerce Seller', 'Franchise Partner'] },
    { title: 'Innovation & Growth', items: ['Startup Founder', 'Product Innovator', 'Service Provider', 'Organic Farmer/Cooperative'] },
    { title: 'Others', items: ['Consultant', 'Marketing Agency', 'Research & Development'] }
];

const PRODUCT_CATEGORIES = [
    "AYUSH & Herbal Products",
    "Organic & Natural Foods",
    "Health Supplements & Nutraceuticals",
    "Medical Equipment & Devices",
    "Fitness & Wellness Equipment",
    "Beauty & Personal Care",
    "Healthcare IT & Digital Health",
    "Services & Consultation",
    "Others"
];

// Fallback/Default Packages for Sellers
const DEFAULT_SELLER_PACKAGES = [
    {
        name: "Standard Seller Pass",
        price: 999,
        category: "Pass",
        benefits: ["Entry for 3 Days", "Access to BSM Hall", "Basic Matchmaking", "Digital Listing"]
    },
    {
        name: "Premium Seller Pass",
        price: 2499,
        category: "Pass",
        isRecommended: true,
        benefits: ["Priority BSM Access", "Scheduled Meetings", "VIP Networking Lounge", "Enhanced Directory Scan"]
    }
];

const PACKAGE_METADATA: Record<string, any> = {
    "Standard Seller Pass": {
        tagline: "Start Your Trade Journey",
        description: "Perfect for emerging sellers and startups looking to explore domestic markets.",
        whyChoose: "Most affordable entry point with full event access.",
        color: "blue",
        cta: "Select Basic"
    },
    "Premium Seller Pass": {
        tagline: "Maximum Business Visibility",
        description: "For established brands focused on high-conversion B2B meetings and exports.",
        whyChoose: "Get pre-scheduled meetings with verified big-ticket buyers.",
        color: "yellow",
        badge: "Recommended",
        cta: "Go Premium"
    }
};

const SellerRegistration = () => {
    const navigate = useNavigate();
    const [heroData, setHeroData] = useState<any>(null);
    const [isSuccess, setIsSuccess] = useState(false);
    const [finalRegId, setFinalRegId] = useState("");

    // Location State
    const [countries, setCountries] = useState<any[]>([]);
    const [states, setStates] = useState<any[]>([]);
    const [cities, setCities] = useState<any[]>([]);
    const [loadingLocations, setLoadingLocations] = useState({ countries: false, states: false, cities: false });

    // OTP State
    const [emailOtpSent, setEmailOtpSent] = useState(false);
    const [emailOtpVerified, setEmailOtpVerified] = useState(false);
    const [emailOtpValue, setEmailOtpValue] = useState("");
    const [emailResendTimer, setEmailResendTimer] = useState(0);

    const [mobileOtpSent, setMobileOtpSent] = useState(false);
    const [mobileOtpVerified, setMobileOtpVerified] = useState(false);
    const [mobileOtpValue, setMobileOtpValue] = useState("");
    const [mobileResendTimer, setMobileResendTimer] = useState(0);

    const [isVerifying, setIsVerifying] = useState({ email: false, mobile: false });

    // Packages & UI State
    const [packages, setPackages] = useState<any[]>(DEFAULT_SELLER_PACKAGES);
    const [showTermsModal, setShowTermsModal] = useState(false);
    const [showPaymentConfirmModal, setShowPaymentConfirmModal] = useState(false);
    const [activePolicyTab, setActivePolicyTab] = useState<'payment' | 'refund' | 'privacy'>('payment');
    const [tempSelectedPackage, setTempSelectedPackage] = useState<any>(null);
    const [loadingPolicies, setLoadingPolicies] = useState(false);
    const [policiesData, setPoliciesData] = useState<Record<string, any>>({});
    const [policyConsents, setPolicyConsents] = useState({ paymentTerms: false, refundPolicy: false, privacyPolicy: false });

    const [openRoleGroup, setOpenRoleGroup] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState<null | 'domestic' | 'international'>(null);

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        designation: "",
        gender: "",
        dob: "",
        companyName: "",
        businessType: "",
        companyFirmName: "",
        basicBusinessType: "",
        yearOfEstablishment: "",
        gstNumber: "",
        panNumber: "",
        mobileNumber: "",
        alternateNumber: "",
        emailAddress: "",
        website: "",
        registeredAddress: "",
        pinCode: "",
        country: "India",
        stateProvince: "",
        city: "",
        natureOfBusiness: "",
        yearsInBusiness: "",
        numberOfOutlets: "",
        annualTurnover: "",
        primaryProductCategory: "",
        secondaryProductCategories: [] as string[],
        certifications: [] as string[],
        specificProductDetails: "",
        productionCapacity: "",
        targetMarket: [] as string[],
        preferredBuyerType: [] as string[],
        preferredBuyerRegion: [] as string[],
        sellingFrequency: "",
        estimatedAnnualSaleValue: "",
        matchmakingInterest: "Yes",
        preferredMeetingDate: "",
        preferredTimeSlot: "",
        requirePreScheduledB2B: "Yes",
        meetingPriorityLevel: "Medium",
        registrationCategory: "",
        registrationFee: "0",
        paymentMode: "Online",
        consentTerms: false,
        consentPaymentValid: false,
        consentMatchedBuyers: false
    });
    const [catalogFile, setCatalogFile] = useState<File | null>(null);
    const [errors, setErrors] = useState<Record<string, string>>({});

    // --- Effects & Fetching ---

    useEffect(() => {
        const fetchInitialData = async () => {
            try {
                const [heroRes, countriesRes] = await Promise.all([
                    heroBackgroundApi.getByPage("Registration / Seller Registration"),
                    crmApi.getCountries(),
                ]);
                if (heroRes) setHeroData(heroRes);
                setCountries(countriesRes);
            } catch (err) {
                console.error("Initial load error:", err);
            }
        };
        fetchInitialData();
    }, []);

    // States fetch
    useEffect(() => {
        if (!formData.country) return;
        const selected = countries.find(c => c.name === formData.country);
        if (selected) {
            setLoadingLocations(p => ({ ...p, states: true }));
            crmApi.getStates(selected.countryCode).then(res => {
                setStates(res);
                setLoadingLocations(p => ({ ...p, states: false }));
            });
        }
    }, [formData.country, countries]);

    // Cities fetch
    useEffect(() => {
        if (!formData.stateProvince) return;
        const selected = states.find(s => s.name === formData.stateProvince);
        if (selected) {
            setLoadingLocations(p => ({ ...p, cities: true }));
            crmApi.getCities(selected.stateCode).then(res => {
                setCities(res);
                setLoadingLocations(p => ({ ...p, cities: false }));
            });
        }
    }, [formData.stateProvince, states]);

    // Timers
    useEffect(() => {
        let eTimer: any, mTimer: any;
        if (emailResendTimer > 0) eTimer = setInterval(() => setEmailResendTimer(p => p - 1), 1000);
        if (mobileResendTimer > 0) mTimer = setInterval(() => setMobileResendTimer(p => p - 1), 1000);
        return () => { clearInterval(eTimer); clearInterval(mTimer); };
    }, [emailResendTimer, mobileResendTimer]);

    // --- Handlers ---

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(p => ({ ...p, [name]: value }));
        if (errors[name]) setErrors(p => { const n = { ...p }; delete n[name]; return n; });
    };

    const handleSelectChange = (name: string, value: string) => {
        setFormData(p => ({ ...p, [name]: value }));
        if (errors[name]) setErrors(p => { const n = { ...p }; delete n[name]; return n; });
        if (name === 'country') setFormData(p => ({ ...p, stateProvince: '', city: '' }));
        if (name === 'stateProvince') setFormData(p => ({ ...p, city: '' }));
    };

    const handleCheckboxChange = (field: keyof typeof formData, item: string, checked: boolean) => {
        const current = formData[field] as string[];
        if (checked) {
            setFormData(p => ({ ...p, [field]: [...current, item] }));
        } else {
            setFormData(p => ({ ...p, [field]: current.filter(i => i !== item) }));
        }
    };

    // --- OTP Logic ---

    const requestOtp = async (type: 'email' | 'mobile') => {
        const identifier = type === 'email' ? formData.emailAddress : formData.mobileNumber;
        if (!identifier) return toast.error(`Please enter a valid ${type}`);

        setIsVerifying(p => ({ ...p, [type]: true }));
        try {
            const fullName = `${formData.firstName} ${formData.lastName}`.trim();
            const res = await otpApi.request(identifier, type === 'email' ? 'email' : 'phone', fullName);
            if (res.success) {
                toast.success(`OTP sent to your ${type}`);
                type === 'email' ? setEmailOtpSent(true) : setMobileOtpSent(true);
                type === 'email' ? setEmailResendTimer(60) : setMobileResendTimer(60);
            } else {
                toast.error(res.message || "Failed to send OTP");
            }
        } catch (e) {
            toast.error("Network error");
        } finally {
            setIsVerifying(p => ({ ...p, [type]: false }));
        }
    };

    const verifyOtp = async (type: 'email' | 'mobile') => {
        const identifier = type === 'email' ? formData.emailAddress : formData.mobileNumber;
        const otp = type === 'email' ? emailOtpValue : mobileOtpValue;
        if (!otp) return toast.error("Please enter OTP");

        setIsVerifying(p => ({ ...p, [type]: true }));
        try {
            const res = await otpApi.verify(identifier, otp, type === 'email' ? 'email' : 'phone');
            if (res.success) {
                toast.success(`${type.toUpperCase()} verified successfully!`);
                type === 'email' ? setEmailOtpVerified(true) : setMobileOtpVerified(true);
            } else {
                toast.error(res.message || "Invalid OTP");
            }
        } catch (e) {
            toast.error("Verification error");
        } finally {
            setIsVerifying(p => ({ ...p, [type]: false }));
        }
    };

    // --- Payment Flow ---

    const handlePackageSelection = (pkg: any) => {
        setTempSelectedPackage(pkg);
        setPolicyConsents({ paymentTerms: false, refundPolicy: false, privacyPolicy: false });
        setActivePolicyTab('payment');
        setShowTermsModal(true);
        fetchPolicies();
    };

    const fetchPolicies = async () => {
        setLoadingPolicies(true);
        try {
            const [pay, ref, priv] = await Promise.all([
                policyApi.getByPage('payment-policy'),
                policyApi.getByPage('refund-policy'),
                policyApi.getByPage('privacy-policy')
            ]);
            setPoliciesData({ payment: pay, refund: ref, privacy: priv });
        } catch (e) {
            console.error(e);
        } finally {
            setLoadingPolicies(false);
        }
    };

    const confirmPackage = () => {
        setShowTermsModal(false);
        setShowPaymentConfirmModal(true);
    };

    const initiateRazorpayPayment = async () => {
        if (!validateForm()) {
            setShowPaymentConfirmModal(false);
            return toast.error("Please fill all required fields first");
        }

        try {
            const orderRes = await sellerRegistrationApi.createOrder(tempSelectedPackage.price);
            if (!orderRes.success) throw new Error("Order creation failed");

            const options = {
                key: (import.meta.env.VITE_RAZORPAY_KEY || "rzp_test_placeholder"),
                amount: orderRes.order.amount,
                currency: "INR",
                name: "9th IHWE 2026",
                description: `Seller Registration - ${tempSelectedPackage.name}`,
                order_id: orderRes.order.id,
                prefill: {
                    name: `${formData.firstName} ${formData.lastName}`.trim(),
                    email: formData.emailAddress,
                    contact: formData.mobileNumber
                },
                theme: { color: "#23471d" },
                handler: async (response: any) => {
                    handleFinalSubmit(response);
                }
            };

            const rzp = (window as any).Razorpay ? new (window as any).Razorpay(options) : null;
            if (rzp) {
                rzp.open();
            } else {
                toast.error("Razorpay SDK not loaded");
            }
        } catch (err) {
            toast.error("Payment initiation failed");
        }
    };

    const validateForm = () => {
        const newErrors: Record<string, string> = {};
        if (!formData.firstName) newErrors.firstName = "First Name is required";
        if (!formData.lastName) newErrors.lastName = "Last Name is required";
        if (!formData.designation) newErrors.designation = "Designation is required";
        if (!formData.gender) newErrors.gender = "Gender is required";
        if (!formData.companyName) newErrors.companyName = "Company is required";
        if (!formData.emailAddress) newErrors.emailAddress = "Email is required";
        if (!emailOtpVerified) newErrors.emailAddress = "Email not verified";
        if (!formData.mobileNumber) newErrors.mobileNumber = "Mobile is required";
        if (!mobileOtpVerified) newErrors.mobileNumber = "Mobile not verified";
        if (!formData.registrationCategory) newErrors.registrationCategory = "Select a pass";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleFinalSubmit = async (paymentResponse?: any) => {
        setIsSubmitting(true);
        try {
            const finalData = new FormData();
            const fullName = `${formData.firstName} ${formData.lastName}`.trim();
            finalData.append('fullName', fullName);

            Object.entries(formData).forEach(([key, val]) => {
                if (key === 'firstName' || key === 'lastName') return; // Handled by fullName
                if (Array.isArray(val)) {
                    finalData.append(key, JSON.stringify(val));
                } else {
                    finalData.append(key, val);
                }
            });

            if (catalogFile) {
                finalData.append('companyCatalog', catalogFile);
            }

            if (paymentResponse) {
                finalData.set('razorpayPaymentId', paymentResponse.razorpay_payment_id);
                finalData.set('razorpayOrderId', paymentResponse.razorpay_order_id);
                finalData.set('razorpaySignature', paymentResponse.razorpay_signature);
                finalData.set('paymentStatus', 'Completed');
            }

            const res = await sellerRegistrationApi.submit(finalData);
            if (res.success) {
                setFinalRegId(res.data.registrationId);
                setIsSuccess(true);
                setShowPaymentConfirmModal(false);
                window.scrollTo({ top: 0, behavior: "smooth" });
            } else {
                toast.error(res.message || "Submission failed");
            }
        } catch (e) {
            toast.error("An error occurred during submission");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleCategorySelect = (cat: 'domestic' | 'international') => {
        setSelectedCategory(cat);
        if (cat === 'domestic') {
            setFormData(prev => ({ ...prev, country: "India" }));
        } else {
            setFormData(prev => ({ ...prev, country: "", stateProvince: "", city: "" }));
        }
    };

    const inputClasses =
        "rounded-[2px] border-slate-400 h-8 focus:border-[#23471d] focus:ring-[#23471d]/10 transition-all text-[12px] bg-white placeholder:text-slate-400 text-slate-900 font-medium shadow-none outline-none px-3 w-full text-left";
    const labelClasses =
        "text-[10px] font-bold uppercase tracking-[0.05em] text-slate-800 mb-1 block";
    const sectionTitleClasses = "text-sm font-bold text-[#d26019] uppercase tracking-[0.05em] border-b border-slate-100 pb-1.5";
    const ErrorDisplay = ({ name, errors }: { name: string; errors: Record<string, string> }) => (
        errors[name] ? <span className="text-red-500 text-[10px] mt-1 font-black uppercase tracking-widest animate-in fade-in slide-in-from-top-1 flex items-center gap-1.5"><AlertTriangle size={10} /> {errors[name]}</span> : null
    );

    return (
        <div className="min-h-screen bg-[#FDFDFD] font-inter text-slate-900">
            {/* ── HERO SECTION ── */}
            {/* ... */}
            <section
                className="hero-background-registration"
                style={{ backgroundImage: `url(${heroData?.backgroundImage ? `${SERVER_URL}${heroData.backgroundImage}` : HeroBg})` }}
            >
                <div className="absolute inset-0 bg-black/45" />
                <div className="container mx-auto px-4 text-center text-white relative z-10">
                    <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-sm uppercase tracking-[0.4em] mb-4 opacity-80">
                        {heroData?.title || "Seller Registration"}
                    </motion.p>
                    <motion.h1 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-4xl md:text-6xl font-serif font-semibold mb-6 italic tracking-tight">
                        {heroData?.heading || "Expand Your Global Trade Footprint"}
                    </motion.h1>
                    <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-white/70 text-base md:text-lg mb-8 max-w-xl mx-auto font-light leading-relaxed">
                        {heroData?.shortDescription || "Connect with 5,000+ targeted corporate buyers, importers, and wellness professionals at IHWE 2026."}
                    </motion.p>
                </div>
            </section>

            {/* ── MAIN CONTENT ── */}
            <section className="pt-8 pb-24 relative overflow-hidden">
                <div className="container mx-auto px-6 max-w-[1400px]">
                    <AnimatePresence mode="wait">
                        {isSuccess ? (
                            <motion.div
                                key="success"
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                className="bg-white border border-green-300 p-16 flex flex-col items-center justify-center min-h-[500px] shadow-2xl relative overflow-hidden"
                            >
                                <div className="absolute top-0 left-0 w-full h-1 bg-green-500" />
                                <CheckCircle className="w-24 h-24 text-green-500 mb-8 animate-bounce-short" />
                                <h3 className="text-3xl font-serif font-bold text-slate-900 mb-4 text-center">Registration Success!</h3>
                                <p className="text-slate-600 text-center text-lg max-w-md mb-8 leading-relaxed">
                                    Your seller registration application has been successfully submitted.
                                </p>
                                <div className="bg-slate-50 border border-slate-200 px-8 py-4 mb-8">
                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-1">Registration ID</p>
                                    <p className="text-2xl font-bold text-[#d26019]">{finalRegId || "IHWE/2026/SLR"}</p>
                                </div>
                                <div className="flex gap-4">
                                    <Button onClick={() => navigate("/")} className="h-11 px-8 rounded-sm bg-[#23471d] hover:bg-[#1a3516] text-xs font-bold uppercase tracking-widest text-white transition-all">Back to Home</Button>
                                    <Button onClick={() => { setIsSuccess(false); setSelectedCategory(null); }} className="h-11 px-8 rounded-sm bg-[#d26019] hover:bg-[#a84c14] text-xs font-bold uppercase tracking-widest text-white transition-all">New Registration</Button>
                                </div>
                            </motion.div>
                        ) : !selectedCategory ? (
                            <motion.div
                                key="selection"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="bg-white border border-slate-300 shadow-2xl overflow-hidden"
                            >
                                <div className="bg-slate-50/80 border-b border-slate-200 px-8 py-4">
                                    <h3 className="text-[22px] mb-2 font-semibold text-[#d26019]">
                                        Welcome to the 9th Edition of International Health & Wellness Expo 2026 (Seller Portal)
                                    </h3>
                                    <p className="mb-2 text-slate-600">
                                        Join IHWE 2026 as a premiere exhibitor or delegate and connect with India's most trusted brands and manufacturers. 
                                        Step into a global platform uniting healthcare, wellness, AYUSH, and organic industries under one roof.
                                    </p>
                                    <p className="mb-2 text-slate-500 italic text-sm">
                                        Expand your global trade footprint and network with 5,000+ targeted corporate buyers and importers.
                                    </p>
                                </div>

                                <div className="text-center py-16 space-y-8">
                                    <h2 className="text-2xl font-bold text-slate-800 uppercase tracking-tight">
                                        Choose Seller Category
                                    </h2>
                                    <div className="flex justify-center gap-8">
                                        <button 
                                            onClick={() => handleCategorySelect('domestic')}
                                            className="px-8 py-3 bg-[#23471d] text-white text-sm font-bold uppercase tracking-widest shadow-xl hover:scale-105 transition-all rounded-sm active:scale-95"
                                        >
                                            Domestic Seller
                                        </button>
                                        <button 
                                            onClick={() => handleCategorySelect('international')}
                                            className="px-8 py-3 bg-[#d26019] text-white text-sm font-bold uppercase tracking-widest shadow-xl hover:scale-105 transition-all rounded-sm active:scale-95"
                                        >
                                            International Seller
                                        </button>
                                    </div>
                                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.3em] pt-4">
                                         Secure B2B Seller Onboarding 🔹 IHWE 2026
                                    </p>
                                </div>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="form"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="bg-white border border-slate-300 shadow-2xl overflow-hidden"
                            >
                                {/* Form Header */}
                                <div className="bg-slate-50/80 border-b border-slate-200 px-8 py-4 flex justify-between items-center">
                                    <div>
                                        <h2 className="text-xl font-bold text-slate-900 uppercase" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                                            {selectedCategory === 'domestic' ? 'Domestic' : 'International'} Seller Registration
                                        </h2>
                                        <p className="text-[10px] text-slate-500 uppercase tracking-[0.2em] mt-0.5 font-bold">
                                            9th Edition · IHWE Global B2B Network 2026
                                        </p>
                                    </div>
                                    <div className="flex gap-4">
                                        <Button 
                                            variant="outline" 
                                            onClick={() => setSelectedCategory(null)}
                                            className="px-4 h-9 border-slate-300 text-slate-500 hover:bg-slate-100 text-[10px] font-bold uppercase tracking-widest transition-all"
                                        >
                                            Change Type
                                        </Button>
                                        <Link to="/visitor-registration">
                                            <Button variant="outline" className="px-6 h-9 border-[#d26019] text-[#d26019] hover:bg-[#d26019] hover:text-white text-[10px] font-bold uppercase tracking-wider transition-all">
                                                Visitor Portal
                                            </Button>
                                        </Link>
                                    </div>
                                </div>

                                <form className="p-6 md:p-10 space-y-10">
                                    {/* --- Section 1: Personal Information --- */}
                                    <div className="space-y-4">
                                        <h3 className={sectionTitleClasses} style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                                            Personal Information
                                        </h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-x-5 gap-y-4">
                                            <div>
                                                <Label className={labelClasses}>FIRST NAME *</Label>
                                                <Input name="firstName" value={formData.firstName} onChange={handleChange} required placeholder="Enter First Name" className={`${inputClasses} ${errors.firstName ? 'border-red-400' : ''}`} />
                                            </div>
                                            <div>
                                                <Label className={labelClasses}>LAST NAME *</Label>
                                                <Input name="lastName" value={formData.lastName} onChange={handleChange} required placeholder="Enter Last Name" className={`${inputClasses} ${errors.lastName ? 'border-red-400' : ''}`} />
                                            </div>
                                            <div>
                                                <Label className={labelClasses}>DESIGNATION *</Label>
                                                <Input name="designation" value={formData.designation} onChange={handleChange} required placeholder="Enter Designation" className={`${inputClasses} ${errors.designation ? 'border-red-400' : ''}`} />
                                            </div>
                                            <div>
                                                <Label className={labelClasses}>GENDER *</Label>
                                                <Select value={formData.gender} onValueChange={(v) => handleSelectChange('gender', v)}>
                                                    <SelectTrigger className={inputClasses}>
                                                        <SelectValue placeholder="Select Here" />
                                                    </SelectTrigger>
                                                    <SelectContent className="bg-white">
                                                        <SelectItem value="Male">Male</SelectItem>
                                                        <SelectItem value="Female">Female</SelectItem>
                                                        <SelectItem value="Other">Other</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                            <div>
                                                <Label className={labelClasses}>DATE OF BIRTH (OPTIONAL)</Label>
                                                <Input type="date" name="dob" value={formData.dob} onChange={handleChange} className={inputClasses} />
                                            </div>
                                        </div>
                                    </div>

                                    {/* --- Section 2: Identity Verification --- */}
                                    <div className="space-y-4">
                                        <h3 className={sectionTitleClasses} style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                                            Identity Verification (OTP)
                                        </h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-5 gap-y-4">
                                            {/* Mobile OTP */}
                                            <div className="lg:col-span-1">
                                                <Label className={labelClasses}>MOBILE NO. (WHATSAPP) *</Label>
                                                <div className="relative flex items-center">
                                                    <Input name="mobileNumber" value={formData.mobileNumber} onChange={handleChange} maxLength={10} disabled={mobileOtpVerified || mobileOtpSent} placeholder="10-digit mobile" className={`${inputClasses} pr-20 ${mobileOtpVerified ? "bg-green-50 border-green-200 text-green-700" : ""}`} />
                                                    {!mobileOtpVerified && (
                                                        <button type="button" onClick={() => requestOtp('mobile')} disabled={isVerifying.mobile || formData.mobileNumber.length !== 10 || mobileResendTimer > 0} className="absolute right-1 px-3 py-1 bg-[#23471d] text-white text-[9px] uppercase font-bold tracking-wider rounded-sm hover:bg-[#1a3a14] disabled:bg-slate-300 transition-all">
                                                            {isVerifying.mobile ? "..." : mobileResendTimer > 0 ? `${mobileResendTimer}s` : mobileOtpSent ? "RE-SEND" : "SEND OTP"}
                                                        </button>
                                                    )}
                                                    {mobileOtpVerified && <CheckCircle size={14} className="absolute right-3 text-green-500" />}
                                                </div>
                                                {mobileOtpSent && !mobileOtpVerified && (
                                                    <div className="mt-2 flex gap-2 items-center bg-orange-50/50 p-2 border border-orange-100 rounded-sm">
                                                        <Input placeholder="OTP" value={mobileOtpValue} onChange={(e) => setMobileOtpValue(e.target.value)} maxLength={6} className="flex-1 h-9 rounded-sm border-orange-200 text-center tracking-[0.3em] font-bold text-xs" />
                                                        <Button type="button" onClick={() => verifyOtp('mobile')} disabled={isVerifying.mobile || mobileOtpValue.length < 4} className="h-9 bg-[#23471d] hover:bg-[#1a3516] text-[10px] font-bold px-4">{isVerifying.mobile ? "..." : "VERIFY"}</Button>
                                                    </div>
                                                )}
                                            </div>

                                            {/* Alternate Number */}
                                            <div>
                                                <Label className={labelClasses}>ALTERNATE NO. (OPTIONAL)</Label>
                                                <Input name="alternateNumber" value={formData.alternateNumber} onChange={handleChange} placeholder="Secondary Phone" className={inputClasses} />
                                            </div>

                                            {/* Email OTP */}
                                            <div className="lg:col-span-2">
                                                <Label className={labelClasses}>EMAIL ADDRESS *</Label>
                                                <div className="relative flex items-center">
                                                    <Input type="email" name="emailAddress" value={formData.emailAddress} onChange={handleChange} disabled={emailOtpVerified || emailOtpSent} placeholder="name@company.com" className={`${inputClasses} pr-20 ${emailOtpVerified ? "bg-green-50 border-green-200 text-green-700" : ""}`} />
                                                    {!emailOtpVerified && (
                                                        <button type="button" onClick={() => requestOtp('email')} disabled={isVerifying.email || !formData.emailAddress.includes('@') || emailResendTimer > 0} className="absolute right-1 px-3 py-1 bg-[#d26019] text-white text-[9px] uppercase font-bold tracking-wider rounded-sm hover:bg-[#a84c14] disabled:bg-slate-300 transition-all">
                                                            {isVerifying.email ? "..." : emailResendTimer > 0 ? `${emailResendTimer}s` : emailOtpSent ? "RE-SEND" : "SEND OTP"}
                                                        </button>
                                                    )}
                                                    {emailOtpVerified && <CheckCircle size={14} className="absolute right-3 text-green-500" />}
                                                </div>
                                                {emailOtpSent && !emailOtpVerified && (
                                                    <div className="mt-2 flex gap-2 items-center bg-orange-50/50 p-2 border border-orange-100 rounded-sm">
                                                        <Input placeholder="OTP" value={emailOtpValue} onChange={(e) => setEmailOtpValue(e.target.value)} maxLength={6} className="flex-1 h-9 rounded-sm border-orange-200 text-center tracking-[0.3em] font-bold text-xs" />
                                                        <Button type="button" onClick={() => verifyOtp('email')} disabled={isVerifying.email || emailOtpValue.length < 4} className="h-9 bg-[#d26019] hover:bg-[#a84c14] text-[10px] font-bold px-4">{isVerifying.email ? "..." : "VERIFY"}</Button>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    {/* --- Section 3: Company & Industry Information --- */}
                                    <div className="space-y-4">
                                        <h3 className={sectionTitleClasses} style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                                            Company & Industry Information
                                        </h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-5 gap-y-4">
                                            <div>
                                                <Label className={labelClasses}>COMPANY NAME *</Label>
                                                <Input name="companyName" value={formData.companyName} onChange={handleChange} required placeholder="Enter Company Name" className={inputClasses} />
                                            </div>
                                            <div>
                                                <Label className={labelClasses}>COMPANY WEBSITE</Label>
                                                <Input name="website" value={formData.website} onChange={handleChange} placeholder="www.example.com" className={inputClasses} />
                                            </div>
                                            <div>
                                                <Label className={labelClasses}>BUSINESS ROLE *</Label>
                                                <Select value={formData.businessType} onValueChange={(v) => handleSelectChange('businessType', v)}>
                                                    <SelectTrigger className={inputClasses}>
                                                        <SelectValue placeholder="Select Your Role" />
                                                    </SelectTrigger>
                                                    <SelectContent className="bg-white border-slate-200">
                                                        {SELLER_ROLES.map((group) => (
                                                            <SelectGroup key={group.title}>
                                                                <div
                                                                    className="px-2 py-2 text-[10px] font-black text-emerald-700 bg-emerald-50/50 flex justify-between items-center cursor-default uppercase tracking-widest"
                                                                    onPointerDown={(e) => { e.preventDefault(); e.stopPropagation(); setOpenRoleGroup(openRoleGroup === group.title ? null : group.title); }}
                                                                >
                                                                    {group.title}
                                                                    <ChevronDown size={12} className={`transition-transform ${openRoleGroup === group.title ? 'rotate-180' : ''}`} />
                                                                </div>
                                                                {openRoleGroup === group.title && group.items.map(item => (
                                                                    <SelectItem key={item} value={item} className="pl-6 font-bold text-slate-600 text-[12px]">{item}</SelectItem>
                                                                ))}
                                                            </SelectGroup>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                            <div>
                                                <Label className={labelClasses}>ANNUAL TURNOVER *</Label>
                                                <Select value={formData.annualTurnover} onValueChange={(v) => handleSelectChange('annualTurnover', v)}>
                                                    <SelectTrigger className={inputClasses}><SelectValue placeholder="Choose Range" /></SelectTrigger>
                                                    <SelectContent className="bg-white">{['Below 50 Lakhs', '50L - 2 Cr', '2 - 10 Cr', '10 - 50 Cr', '50 - 100 Cr', '100 Cr +'].map(r => <SelectItem key={r} value={r} className="font-bold text-xs">{r}</SelectItem>)}</SelectContent>
                                                </Select>
                                            </div>
                                        </div>
                                    </div>

                                    {/* --- Section 4: Geographic Reach --- */}
                                    <div className="space-y-4">
                                        <h3 className={sectionTitleClasses} style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                                            Geographic Reach
                                        </h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-5 gap-y-4">
                                            <div className="lg:col-span-2">
                                                <Label className={labelClasses}>FULL REGISTERED ADDRESS *</Label>
                                                <Input required name="registeredAddress" value={formData.registeredAddress} onChange={handleChange} placeholder="Building, Street, Area" className={inputClasses} />
                                            </div>
                                            <div>
                                                <Label className={labelClasses}>COUNTRY *</Label>
                                                {selectedCategory === 'domestic' ? (
                                                    <div className={`${inputClasses} bg-slate-50 flex items-center font-bold text-slate-500 cursor-not-allowed`}>
                                                        India
                                                    </div>
                                                ) : (
                                                    <Select value={formData.country} onValueChange={(v) => handleSelectChange('country', v)}>
                                                        <SelectTrigger className={inputClasses}>
                                                            <SelectValue placeholder="Select Country" />
                                                        </SelectTrigger>
                                                        <SelectContent className="bg-white max-h-[300px]">
                                                            {countries.filter(c => c.name !== 'India').map(c => <SelectItem key={c._id} value={c.name} className="text-xs font-bold">{c.name}</SelectItem>)}
                                                        </SelectContent>
                                                    </Select>
                                                )}
                                            </div>
                                            <div>
                                                <Label className={labelClasses}>STATE / PROVINCE *</Label>
                                                <Select value={formData.stateProvince} onValueChange={(v) => handleSelectChange('stateProvince', v)} disabled={loadingLocations.states || (selectedCategory === 'international' && !formData.country)}>
                                                    <SelectTrigger className={inputClasses}>
                                                        <SelectValue placeholder={formData.country ? (loadingLocations.states ? "Loading..." : "Select State") : "Select Country First"} />
                                                    </SelectTrigger>
                                                    <SelectContent className="bg-white max-h-[300px]">
                                                        {states.map(s => <SelectItem key={s._id} value={s.name} className="text-xs font-bold">{s.name}</SelectItem>)}
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                            <div>
                                                <Label className={labelClasses}>CITY / TOWN *</Label>
                                                <Select value={formData.city} onValueChange={(v) => handleSelectChange('city', v)} disabled={!formData.stateProvince || loadingLocations.cities}>
                                                    <SelectTrigger className={inputClasses}>
                                                        <SelectValue placeholder={formData.stateProvince ? (loadingLocations.cities ? "Loading..." : "Select City") : "Select State First"} />
                                                    </SelectTrigger>
                                                    <SelectContent className="bg-white max-h-[300px]">
                                                        {cities.map(c => <SelectItem key={c._id} value={c.name} className="text-xs font-bold">{c.name}</SelectItem>)}
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                            <div>
                                                <Label className={labelClasses}>PIN / ZIP CODE *</Label>
                                                <Input name="pinCode" value={formData.pinCode} onChange={handleChange} maxLength={10} placeholder="6-digit ZIP" className={inputClasses} />
                                            </div>
                                        </div>
                                    </div>

                                    {/* --- Section 5: Business Legalities --- */}
                                    <div className="space-y-4">
                                        <h3 className={sectionTitleClasses} style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                                            Business Legalities
                                        </h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-5 gap-y-4">
                                            <div className="lg:col-span-2">
                                                <Label className={labelClasses}>COMPANY / FIRM NAME (LEGAL) *</Label>
                                                <Input required name="companyFirmName" value={formData.companyFirmName} onChange={handleChange} placeholder="Legal Entity Name" className={inputClasses} />
                                            </div>
                                            <div>
                                                <Label className={labelClasses}>ENTITY TYPE *</Label>
                                                <Select value={formData.basicBusinessType} onValueChange={(v) => handleSelectChange('basicBusinessType', v)}>
                                                    <SelectTrigger className={inputClasses}><SelectValue placeholder="Select Type" /></SelectTrigger>
                                                    <SelectContent className="bg-white">
                                                        <SelectItem value="Proprietorship" className="font-bold text-xs">Proprietorship</SelectItem>
                                                        <SelectItem value="Partnership" className="font-bold text-xs">Partnership</SelectItem>
                                                        <SelectItem value="Pvt Ltd" className="font-bold text-xs">Pvt Ltd</SelectItem>
                                                        <SelectItem value="LLP" className="font-bold text-xs">LLP</SelectItem>
                                                        <SelectItem value="Public Ltd" className="font-bold text-xs">Public Ltd</SelectItem>
                                                        <SelectItem value="NGO" className="font-bold text-xs">NGO</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                            <div>
                                                <Label className={labelClasses}>ESTABLISHMENT YEAR *</Label>
                                                <Input name="yearOfEstablishment" value={formData.yearOfEstablishment} onChange={handleChange} placeholder="e.g. 2005" className={inputClasses} />
                                            </div>
                                            <div>
                                                <Label className={labelClasses}>GST / VAT NO.</Label>
                                                <Input name="gstNumber" value={formData.gstNumber} onChange={handleChange} placeholder="Tax No." className={inputClasses} />
                                            </div>
                                            <div>
                                                <Label className={labelClasses}>PAN / NATIONAL ID</Label>
                                                <Input name="panNumber" value={formData.panNumber} onChange={handleChange} placeholder="ID No." className={inputClasses} />
                                            </div>
                                        </div>
                                    </div>

                                    {/* --- Section 6: Products & Market Focus --- */}
                                    <div className="space-y-4">
                                        <h3 className={sectionTitleClasses} style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                                            Products & Market Focus
                                        </h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-5 gap-y-4">
                                            <div className="lg:col-span-2">
                                                <Label className={labelClasses}>PRIMARY PRODUCT CATEGORY *</Label>
                                                <Select value={formData.primaryProductCategory} onValueChange={(v) => handleSelectChange('primaryProductCategory', v)}>
                                                    <SelectTrigger className={inputClasses}><SelectValue placeholder="Main Category" /></SelectTrigger>
                                                    <SelectContent className="bg-white">{PRODUCT_CATEGORIES.map(c => <SelectItem key={c} value={c} className="font-bold text-xs">{c}</SelectItem>)}</SelectContent>
                                                </Select>
                                            </div>
                                            <div className="lg:col-span-2">
                                                <Label className={labelClasses}>CERTIFICATIONS (SELECT MULTIPLE)</Label>
                                                <div className="p-1 border border-slate-200 rounded-[2px] bg-slate-50/10 flex flex-wrap gap-2 min-h-[32px]">
                                                    {['ISO', 'GMP', 'FDA', 'AYUSH', 'Organic', 'FSSAI'].map(c => (
                                                        <label key={c} className="flex items-center gap-1.5 text-[10px] font-bold text-slate-700 bg-white border border-slate-200 px-2 py-0.5 rounded cursor-pointer hover:border-emerald-400">
                                                            <Checkbox checked={formData.certifications.includes(c)} onCheckedChange={(ch) => handleCheckboxChange('certifications', c, !!ch)} className="h-3 w-3 rounded-none" /> {c}
                                                        </label>
                                                    ))}
                                                </div>
                                            </div>
                                            <div className="lg:col-span-4">
                                                <Label className={labelClasses}>SPECIFIC PRODUCT DETAILS & USPS</Label>
                                                <Textarea name="specificProductDetails" value={formData.specificProductDetails} onChange={handleChange} placeholder="Briefly explain what makes your products unique..." className={`${inputClasses} h-16 py-2 leading-relaxed`} />
                                            </div>
                                            <div className="lg:col-span-1">
                                                <Label className={labelClasses}>PRODUCTION CAPACITY</Label>
                                                <Input name="productionCapacity" value={formData.productionCapacity} onChange={handleChange} placeholder="units/month" className={inputClasses} />
                                            </div>
                                            <div className="lg:col-span-3">
                                                <Label className={labelClasses}>PREFERRED BUYER REGIONS *</Label>
                                                <div className="p-1 border border-slate-200 rounded-[2px] bg-slate-50/10 flex flex-wrap gap-4 min-h-[32px]">
                                                    {['North India', 'South India', 'East India', 'West India', 'Overseas'].map(r => (
                                                        <label key={r} className="flex items-center gap-2 text-[10px] font-bold text-slate-700 cursor-pointer">
                                                            <Checkbox checked={formData.preferredBuyerRegion.includes(r)} onCheckedChange={(ch) => handleCheckboxChange('preferredBuyerRegion', r, !!ch)} className="h-3.5 w-3.5 rounded-none" /> {r}
                                                        </label>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* --- Section 7: B2B Matchmaking Schedule --- */}
                                    <div className="space-y-4">
                                        <h3 className={sectionTitleClasses} style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                                            B2B Matchmaking Schedule
                                        </h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-5 gap-y-4">
                                            <div>
                                                <Label className={labelClasses}>PREFERRED BSM DATE *</Label>
                                                <Input type="date" name="preferredMeetingDate" value={formData.preferredMeetingDate} onChange={handleChange} className={inputClasses} />
                                            </div>
                                            <div>
                                                <Label className={labelClasses}>PREFERRED SLOT *</Label>
                                                <Select value={formData.preferredTimeSlot} onValueChange={(v) => handleSelectChange('preferredTimeSlot', v)}>
                                                    <SelectTrigger className={inputClasses}><SelectValue placeholder="Select Slot" /></SelectTrigger>
                                                    <SelectContent className="bg-white font-bold">{['Morning (10AM-1PM)', 'Afternoon (2PM-4PM)', 'Evening (4PM-6PM)'].map(sm => <SelectItem key={sm} value={sm} className="text-xs">{sm}</SelectItem>)}</SelectContent>
                                                </Select>
                                            </div>
                                            <div>
                                                <Label className={labelClasses}>MEETING PRIORITY *</Label>
                                                <Select value={formData.meetingPriorityLevel} onValueChange={(v) => handleSelectChange('meetingPriorityLevel', v)}>
                                                    <SelectTrigger className={inputClasses}><SelectValue placeholder="Priority Level" /></SelectTrigger>
                                                    <SelectContent className="bg-white font-bold">{['High', 'Medium', 'General'].map(p => <SelectItem key={p} value={p} className="text-xs">{p}</SelectItem>)}</SelectContent>
                                                </Select>
                                            </div>
                                            <div>
                                                <Label className={labelClasses}>UPLOAD CATALOG (PDF)</Label>
                                                <div className="relative group">
                                                    <input type="file" accept=".pdf" onChange={(e) => setCatalogFile(e.target.files?.[0] || null)} className="hidden" id="catalog-upload" />
                                                    <label htmlFor="catalog-upload" className={`flex items-center gap-2 px-3 h-8 rounded-[2px] border border-dashed border-slate-400 bg-white cursor-pointer transition-all hover:border-[#d26019] text-[10px] font-bold ${catalogFile ? 'text-[#23471d] border-[#23471d]' : 'text-slate-500'}`}>
                                                        <Upload size={14} /> {catalogFile ? catalogFile.name.substring(0, 15) : 'Upload Catalogue'}
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Section 6: Selection of Category (Packages) */}
                                    <div className="space-y-4 pt-4 border-t border-slate-100">
                                        <h3 className={sectionTitleClasses} style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Registration Category</h3>
                                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Select the most suitable engagement plan for your business</p>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch max-w-4xl">
                                            {packages.map((pkg) => {
                                                const meta = PACKAGE_METADATA[pkg.name] || {};
                                                const isSelected = formData.registrationCategory === pkg.name;
                                                const accentColor = meta.color === 'yellow' ? '#d26019' : '#23471d';

                                                return (
                                                    <div
                                                        key={pkg.name}
                                                        onClick={() => handlePackageSelection(pkg)}
                                                        className={`relative p-6 border transition-all cursor-pointer flex flex-col h-full group
                                                            ${isSelected ? 'border-[#d26019] bg-orange-50/10 shadow-lg scale-[1.01]' : 'border-slate-300 bg-white hover:border-orange-200'}
                                                        `}
                                                    >
                                                        <div className="mb-4">
                                                            <div className="flex justify-between items-start mb-1">
                                                                <h4 className="text-lg font-bold text-slate-800" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{pkg.name}</h4>
                                                                <div className="text-right">
                                                                    <span className="text-2xl font-bold text-[#d26019]">₹{pkg.price}</span>
                                                                    <p className="text-[9px] font-bold text-slate-400 uppercase">+ GST 18%</p>
                                                                </div>
                                                            </div>
                                                            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{meta.tagline}</p>
                                                        </div>
                                                        
                                                        <div className="flex-1 space-y-4">
                                                            <p className="text-[12px] text-slate-600 font-medium italic leading-relaxed">{meta.description}</p>
                                                            <div className="space-y-2">
                                                                <p className="text-[10px] font-bold text-[#23471d] uppercase tracking-widest">Included Benefits:</p>
                                                                <ul className="space-y-1.5 text-[11px] text-slate-700 font-medium">
                                                                    {pkg.benefits.map((b: string) => (
                                                                        <li key={b} className="flex items-start gap-2">
                                                                            <CheckCircle size={12} className="text-[#23471d] mt-0.5 shrink-0" />
                                                                            <span>{b}</span>
                                                                        </li>
                                                                    ))}
                                                                </ul>
                                                            </div>
                                                        </div>

                                                        <div className={`mt-6 w-full py-2.5 text-center text-[10px] font-bold uppercase tracking-widest transition-all
                                                            ${isSelected ? 'bg-[#d26019] text-white' : 'bg-slate-100 text-slate-500 group-hover:bg-[#23471d] group-hover:text-white'}
                                                        `}>
                                                            {isSelected ? 'PLAN SELECTED' : 'CHOOSE THIS PLAN'}
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                        <ErrorDisplay name="registrationCategory" errors={errors} />
                                    </div>
                                    
                                    {/* Final Footer / Submit Area */}
                                    <div className="pt-10 flex flex-col items-center border-t border-slate-100">
                                        <Button 
                                            type="button"
                                            onClick={() => {
                                                if (validateForm()) setShowPaymentConfirmModal(true);
                                            }}
                                            disabled={isSubmitting || !emailOtpVerified || !mobileOtpVerified || !formData.registrationCategory}
                                            className="w-full max-w-64 h-12 rounded-sm bg-[#d26019] hover:bg-[#a84c14] text-white font-bold text-xs uppercase tracking-widest transition-all shadow-xl flex items-center justify-center gap-3 group disabled:opacity-70 disabled:cursor-not-allowed"
                                        >
                                            {isSubmitting ? <><Loader2 className="w-5 h-5 animate-spin" /><span>PROCESSING...</span></> : <>COMPLETE REGISTRATION <Send size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" /></>}
                                        </Button>
                                        <div className="mt-4 flex flex-col items-center gap-2">
                                            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em] flex items-center gap-2">
                                                <ShieldCheck size={12} className="text-[#d26019]" />
                                                SECURE B2B PORTAL · IHWE 2026
                                            </p>
                                        </div>
                                    </div>
                                </form>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </section>

            {/* --- Modals (Terms, Payment Confirm) -            {/* Terms Modal */}
            <AnimatePresence>
                {showTermsModal && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                        <motion.div initial={{ scale: 0.98, y: 10 }} animate={{ scale: 1, y: 0 }} className="bg-white border border-slate-300 shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden">
                            <div className="bg-[#23471d] p-6 text-white flex justify-between items-center">
                                <div>
                                    <h3 className="font-bold uppercase tracking-wider text-sm" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Legal & Regulatory Declaration</h3>
                                    <p className="text-white/70 text-[10px] font-bold uppercase tracking-[0.2em] mt-1">Compliance Check for {tempSelectedPackage?.name}</p>
                                </div>
                                <button onClick={() => setShowTermsModal(false)} className="bg-white/10 hover:bg-white/20 p-2 rounded-sm transition-all">
                                    <Ban size={18} />
                                </button>
                            </div>

                            {/* Tabs */}
                            <div className="flex border-b bg-slate-50">
                                {['payment', 'refund', 'privacy'].map((tab) => (
                                    <button
                                        key={tab}
                                        onClick={() => {
                                            if (tab === 'payment') setActivePolicyTab('payment');
                                            if (tab === 'refund' && policyConsents.paymentTerms) setActivePolicyTab('refund');
                                            if (tab === 'privacy' && policyConsents.refundPolicy) setActivePolicyTab('privacy');
                                        }}
                                        disabled={ (tab === 'refund' && !policyConsents.paymentTerms) || (tab === 'privacy' && !policyConsents.refundPolicy) }
                                        className={`flex-1 py-4 text-[11px] font-bold uppercase tracking-widest transition-all relative ${activePolicyTab === tab ? 'text-[#23471d] bg-white' : 'text-slate-400 opacity-60'} disabled:opacity-30`}
                                    >
                                        {tab} Authorization
                                        {activePolicyTab === tab && <div className="absolute bottom-0 left-0 w-full h-[2px] bg-[#d26019]" />}
                                    </button>
                                ))}
                            </div>

                            {/* Policy Area */}
                            <div className="flex-1 overflow-y-auto p-10 custom-scrollbar bg-white">
                                {loadingPolicies ? (
                                    <div className="h-full flex flex-col items-center justify-center gap-4">
                                        <Loader2 className="animate-spin text-[#d26019]" size={40} />
                                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Encrypting Communication...</p>
                                    </div>
                                ) : (
                                    <div className="prose prose-sm max-w-none selection:bg-orange-100">
                                        <div dangerouslySetInnerHTML={{ __html: policiesData[activePolicyTab]?.content || "Policy content arriving shortly..." }} />
                                    </div>
                                )}
                            </div>

                            {/* Footer Consents */}
                            <div className="p-6 bg-slate-50 border-t border-slate-200">
                                <div className="bg-white p-4 border border-slate-200 shadow-sm mb-6">
                                    <div className="flex items-start gap-4">
                                        <Checkbox 
                                            id="policy-check" 
                                            checked={activePolicyTab === 'payment' ? policyConsents.paymentTerms : activePolicyTab === 'refund' ? policyConsents.refundPolicy : policyConsents.privacyPolicy}
                                            onCheckedChange={(c) => {
                                                if (activePolicyTab === 'payment') setPolicyConsents(p => ({ ...p, paymentTerms: !!c }));
                                                if (activePolicyTab === 'refund') setPolicyConsents(p => ({ ...p, refundPolicy: !!c }));
                                                if (activePolicyTab === 'privacy') setPolicyConsents(p => ({ ...p, privacyPolicy: !!c }));
                                            }}
                                            className="h-5 w-5 mt-0.5 border-slate-300 rounded-none shadow-none" 
                                        />
                                        <Label htmlFor="policy-check" className="text-xs font-bold text-slate-700 leading-relaxed cursor-pointer uppercase">
                                            {activePolicyTab === 'payment' && "I hereby acknowledge that I have read, understood, and voluntarily agree to the Payment Terms. I understand all processing is final."}
                                            {activePolicyTab === 'refund' && "I confirm my understanding that Namo Gange Wellness Pvt. Ltd. maintains a strict No-Refund Policy for all trade event registrations."}
                                            {activePolicyTab === 'privacy' && "I authorize the processing of my business data for matchmaking and networking purposes as defined in the Privacy Statement."}
                                        </Label>
                                    </div>
                                </div>

                                <div className="flex gap-4">
                                    <Button variant="outline" onClick={() => setShowTermsModal(false)} className="flex-1 h-11 font-bold uppercase tracking-widest text-[11px] rounded-sm border-slate-300">Cancel</Button>
                                    <Button 
                                        onClick={() => {
                                            if (activePolicyTab === 'payment') setActivePolicyTab('refund');
                                            else if (activePolicyTab === 'refund') setActivePolicyTab('privacy');
                                            else confirmPackage();
                                        }}
                                        disabled={
                                            (activePolicyTab === 'payment' && !policyConsents.paymentTerms) ||
                                            (activePolicyTab === 'refund' && !policyConsents.refundPolicy) ||
                                            (activePolicyTab === 'privacy' && !policyConsents.privacyPolicy)
                                        }
                                        className="flex-1 h-11 bg-[#23471d] hover:bg-[#1a3516] text-white font-bold uppercase tracking-widest text-[11px] rounded-sm shadow-lg"
                                    >
                                        {activePolicyTab === 'privacy' ? "Authorize & Proceed 💳" : `Next: ${activePolicyTab === 'payment' ? 'Refund Policy' : 'Privacy Policy'} →`}
                                    </Button>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Payment Confirm Modal */}
            <AnimatePresence>
                {showPaymentConfirmModal && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
                        <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} className="bg-white border border-slate-300 shadow-2xl w-full max-w-md overflow-hidden relative">
                            <div className="bg-[#23471d] p-8 text-center text-white">
                                <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-white/10">
                                    <CreditCard size={32} className="text-white" />
                                </div>
                                <h3 className="text-xl font-bold uppercase tracking-tight mb-1" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Final Authorization</h3>
                                <p className="text-white/70 text-[10px] font-bold uppercase tracking-[0.3em]">Payment Security Check</p>
                            </div>

                            <div className="p-8 space-y-6">
                                <div className="bg-red-50 border-l-4 border-red-500 p-4">
                                    <div className="flex gap-3 mb-2">
                                        <AlertTriangle size={20} className="text-red-600 shrink-0" />
                                        <p className="text-red-700 font-bold text-sm uppercase tracking-tight">Financial Disclaimer</p>
                                    </div>
                                    <p className="text-[12px] font-bold text-red-600 leading-relaxed italic uppercase">"Once processed, payments cannot be reversed, refunded, or swapped for any other service. 18% GST applies to this transaction."</p>
                                </div>

                                <div className="bg-slate-50 p-6 border border-slate-100 flex justify-between items-center transition-all hover:bg-orange-50/50">
                                    <div>
                                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Pass Fee</p>
                                        <p className="text-lg font-bold text-slate-800 uppercase tracking-tighter">{tempSelectedPackage?.name}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-3xl font-bold text-[#d26019]">₹{tempSelectedPackage?.price}</p>
                                        <p className="text-[9px] font-bold text-slate-400 uppercase">INR Only</p>
                                    </div>
                                </div>

                                <div className="pt-4 flex gap-4">
                                    <Button variant="ghost" onClick={() => setShowPaymentConfirmModal(false)} className="flex-1 h-11 font-bold uppercase tracking-widest text-[11px] text-slate-400 hover:text-slate-900">Cancel</Button>
                                    <Button onClick={initiateRazorpayPayment} className="flex-1 h-11 bg-[#d26019] hover:bg-[#a84c14] text-white font-bold uppercase tracking-widest text-[11px] shadow-xl">Initiate Payment</Button>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

const ErrorDisplay = ({ name, errors }: { name: string; errors: Record<string, string> }) => (
    errors[name] ? <span className="text-red-500 text-[10px] mt-1 font-black uppercase tracking-widest animate-in fade-in slide-in-from-top-1 flex items-center gap-1.5"><AlertTriangle size={10} /> {errors[name]}</span> : null
);

export default SellerRegistration;
