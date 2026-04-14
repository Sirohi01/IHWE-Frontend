
import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
    CheckCircle,
    Send,
    ShieldCheck,
    Loader2,
    User,
    Phone,
    Briefcase,
    Target,
    Globe,
    Calendar,
    CreditCard,
    Smartphone,
    AtSign,
    Shield
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import HeroBg from "@/assets/buyer.jpg";
import { buyerRegistrationApi, heroBackgroundApi, SERVER_URL, crmApi, otpApi } from "@/lib/api";

const BuyerRegistration = () => {
    const [config, setConfig] = useState<any>(null);
    const [submitted, setSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [heroData, setHeroData] = useState<any>(null);
    const [countries, setCountries] = useState<any[]>([]);
    const [states, setStates] = useState<any[]>([]);
    const [cities, setCities] = useState<any[]>([]);

    const [emailOtpSent, setEmailOtpSent] = useState(false);
    const [emailOtpVerified, setEmailOtpVerified] = useState(false);
    const [emailOtpValue, setEmailOtpValue] = useState("");
    const [mobileOtpSent, setMobileOtpSent] = useState(false);
    const [mobileOtpVerified, setMobileOtpVerified] = useState(false);
    const [mobileOtpValue, setMobileOtpValue] = useState("");
    const [isVerifying, setIsVerifying] = useState({ email: false, mobile: false });

    const [formData, setFormData] = useState({
        fullName: "",
        designation: "",
        companyName: "",
        businessType: "",
        mobileNumber: "",
        alternateNumber: "",
        emailAddress: "",
        website: "",
        pinCode: "",
        country: "India",
        stateProvince: "",
        city: "",
        registeredAddress: "",
        yearsInOperation: "",
        annualTurnover: "",
        buyingFrequency: "",
        estimatedAnnualPurchaseValue: "",
        keyProductsServices: "",
        primaryProductInterest: "",
        secondaryProductCategories: [] as string[],
        specificProductRequirements: "",
        estimatedPurchaseVolume: "",
        budgetRange: "",
        preferredSupplierRegion: [] as string[],
        preferredState: [] as string[],
        preferredSupplierType: [] as string[],
        preferredCompanySize: "",
        purchaseTimeline: "",
        roleInPurchaseDecision: "",
        pricingPreference: "Mid-Range",
        matchmakingInterest: "Yes",
        logisticsRequirements: "",
        preferredPaymentMethods: [] as string[],
        companyProfile: null as File | null,
        requiredCertifications: [] as string[],
        preferredMeetingDate: "",
        preferredTimeSlot: "",
        requirePreScheduledB2B: "Yes",
        meetingPriorityLevel: "Medium",
        remarks: "",
        registrationCategory: "",
        registrationFee: "₹0",
        paymentMode: "Online/Razorpay",
        transactionId: "",
        paymentProof: null as File | null,
        consentTerms: false,
        consentPaymentValid: false,
        consentMatchedExhibitors: false
    });

    const [showMembershipOptions, setShowMembershipOptions] = useState(false);
    const [showTermsModal, setShowTermsModal] = useState(false);
    const [tempSelectedPackage, setTempSelectedPackage] = useState<any>(null);

    const membershipPackages = [
        {
            name: "ICOA Standard Buyer Membership",
            price: 1999,
            color: "bg-blue-50 border-blue-500 text-blue-700",
            benefits: ["Access to Expo Floor", "Standard B2B Meeting Lounge", "ICOA Network basic updates"]
        },
        {
            name: "ICOA VIP Buyer Membership",
            price: 9999,
            color: "bg-amber-50 border-amber-500 text-amber-700",
            benefits: ["Priority B2B matching", "VIP Networking Lounge", "Dedicated matchmaking assistance"]
        },
        {
            name: "ICOA Elite Buyer Membership",
            price: 25000,
            color: "bg-red-50 border-red-500 text-red-700",
            benefits: ["Relationship Manager", "Personalized supplier discovery", "Institutional buyer status"]
        }
    ];

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [hData, cRes, sRes, ciRes, configRes] = await Promise.all([
                    heroBackgroundApi.getByPage("Registration / Buyer Registration"),
                    crmApi.getCountries(),
                    crmApi.getStates(),
                    crmApi.getCities(),
                    buyerRegistrationApi.getConfig()
                ]);
                if (hData) setHeroData(hData);
                if (cRes) setCountries(cRes);
                if (sRes) setStates(sRes);
                if (ciRes) setCities(ciRes);
                if (configRes?.success) {
                    const cfg = configRes.data;
                    setConfig(cfg);

                    if (cfg.packages?.length > 0) {
                        setFormData(prev => ({
                            ...prev,
                            registrationCategory: cfg.packages[0].name,
                            registrationFee: `₹${cfg.packages[0].price}`
                        }));
                    }
                }
            } catch (err) {
                console.error("Error fetching initial data:", err);
            }
        };
        fetchData();
    }, []);

    const filteredStates = useMemo(() => {
        const countryToUse = formData.country || "India";
        const selectedCountry = countries.find(c => c.name === countryToUse);
        if (!selectedCountry) return [];
        return states.filter(s => String(s.countryCode) === String(selectedCountry.countryCode));
    }, [formData.country, countries, states]);

    const filteredCities = useMemo(() => {
        if (!formData.stateProvince || states.length === 0) return [];
        const selectedState = states.find(s => s.name === formData.stateProvince);
        if (!selectedState) return [];
        return cities.filter(c => String(c.stateCode) === String(selectedState.stateCode));
    }, [formData.stateProvince, states, cities]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSelectChange = (name: string, value: string) => {
        if (name === 'registrationCategory' && config) {
            const pkg = config.packages.find((p: any) => p.name === value);
            if (pkg) {
                setFormData(prev => ({ ...prev, registrationCategory: value, registrationFee: `₹${pkg.price}` }));
            }
            return;
        }
        if (name === 'country') {
            setFormData(prev => ({ ...prev, country: value, stateProvince: '', city: '' }));
            return;
        }
        if (name === 'stateProvince') {
            setFormData(prev => ({ ...prev, stateProvince: value, city: '' }));
            return;
        }
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleCheckboxChange = (name: string, value: string, checked: boolean) => {
        setFormData(prev => {
            const list = prev[name as keyof typeof prev] as string[];
            return { ...prev, [name]: checked ? [...list, value] : list.filter(item => item !== value) };
        });
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        setFormData(prev => ({ ...prev, paymentProof: file }));
    };

    const requestOtp = async (type: 'email' | 'mobile') => {
        const identifier = type === 'email' ? formData.emailAddress : formData.mobileNumber;
        if (!identifier) { alert(`Please enter a valid ${type} first.`); return; }
        setIsVerifying(prev => ({ ...prev, [type]: true }));
        try {
            const res = await otpApi.request(identifier, type === 'email' ? 'email' : 'phone', formData.fullName);
            if (res.success) {
                alert(`OTP sent to your ${type}.`);
                type === 'email' ? setEmailOtpSent(true) : setMobileOtpSent(true);
            } else alert(res.message);
        } catch (err) { alert("Connection error."); } finally { setIsVerifying(prev => ({ ...prev, [type]: false })); }
    };

    const verifyOtp = async (type: 'email' | 'mobile') => {
        const identifier = type === 'email' ? formData.emailAddress : formData.mobileNumber;
        const otp = type === 'email' ? emailOtpValue : mobileOtpValue;
        if (!otp) { alert("Please enter the OTP."); return; }
        setIsVerifying(prev => ({ ...prev, [type]: true }));
        try {
            const res = await otpApi.verify(identifier, otp, type === 'email' ? 'email' : 'phone');
            if (res.success) {
                alert(`${type.toUpperCase()} verified successfully!`);
                type === 'email' ? setEmailOtpVerified(true) : setMobileOtpVerified(true);
            } else alert(res.message);
        } catch (err) { alert("Verification failed."); } finally { setIsVerifying(prev => ({ ...prev, [type]: false })); }
    };

    const handleRazorpay = async () => {
        if (!(window as any).Razorpay) {
            alert("Razorpay SDK not loaded. Please check your internet connection and try again.");
            return;
        }

        try {
            const pkg = config?.packages.find((p: any) => p.name === formData.registrationCategory);
            if (!pkg) {
                alert("Invalid package selected.");
                return;
            }
            const res = await buyerRegistrationApi.createOrder(pkg.price);

            if (res.success && res.order) {
                const options = {
                    key: (import.meta.env.VITE_RAZORPAY_KEY_ID || "").trim(),
                    amount: res.order.amount,
                    currency: "INR",
                    name: "IHWE 2026",
                    description: `Registration for ${formData.registrationCategory}`,
                    order_id: res.order.id,
                    handler: async function (response: any) {
                        try {
                            await submitFinal(response);
                        } catch (err) {
                            console.error("Payment handler error:", err);
                            alert("Payment successful but final submission failed. Please contact support.");
                        }
                    },
                    prefill: {
                        name: formData.fullName,
                        email: formData.emailAddress,
                        contact: formData.mobileNumber
                    },
                    theme: {
                        color: "#23471d"
                    },
                    modal: {
                        ondismiss: function () {
                            setIsSubmitting(false);
                        }
                    }
                };
                const rzp = new (window as any).Razorpay(options);
                rzp.open();
            } else {
                console.error("Order creation failed:", res);
                alert(res.message || "Failed to create payment order. Please try again.");
            }
        } catch (error) {
            console.error("Razorpay trigger error:", error);
            alert("An error occurred while initializing payment.");
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();


        const requiredFields = [
            { key: 'fullName', label: 'Contact Person' },
            { key: 'designation', label: 'Designation' },
            { key: 'companyName', label: 'Company Name' },
            { key: 'businessType', label: 'Business Type' },
            { key: 'emailAddress', label: 'Email Address' },
            { key: 'mobileNumber', label: 'Mobile Number' },
            { key: 'registeredAddress', label: 'Registered Address' },
            { key: 'pinCode', label: 'Pin Code' },
            { key: 'stateProvince', label: 'State/Province' },
            { key: 'city', label: 'City' },
            { key: 'yearsInOperation', label: 'Years in Operation' },
            { key: 'annualTurnover', label: 'Annual Turnover' },
            { key: 'keyProductsServices', label: 'Key Products/Services' },
            { key: 'primaryProductInterest', label: 'Primary Product Interest' },
            { key: 'buyingFrequency', label: 'Buying Frequency' },
            { key: 'estimatedAnnualPurchaseValue', label: 'Estimated Annual Purchase Value' },
            { key: 'purchaseTimeline', label: 'Purchase Timeline' },
            { key: 'roleInPurchaseDecision', label: 'Decision Role' },
            { key: 'matchmakingInterest', label: 'Matchmaking Interest' },
            { key: 'preferredMeetingDate', label: 'Preferred Meeting Date' },
            { key: 'preferredTimeSlot', label: 'Preferred Time Slot' },
            { key: 'registrationCategory', label: 'Registration Category' }
        ];

        const missingFields = requiredFields.filter(field => !formData[field.key as keyof typeof formData]);

        if (missingFields.length > 0) {
            alert(`Please complete the following required fields: \n- ${missingFields.map(f => f.label).join('\n- ')}`);
            return;
        }

        if (formData.preferredSupplierRegion.length === 0 || formData.preferredSupplierType.length === 0) {
            alert("Please select at least one Preferred Supplier Region and Type.");
            return;
        }


        if (!formData.consentTerms || !formData.consentPaymentValid || !formData.consentMatchedExhibitors) {
            alert("Please check all mandatory consent boxes.");
            return;
        }


        if (!emailOtpVerified || !mobileOtpVerified) {
            alert("Please verify your Email and Mobile via OTP before submitting.");
            return;
        }


        if (formData.paymentMode === 'Online/Razorpay') {
            handleRazorpay();
        } else {
            if (!formData.transactionId || !formData.paymentProof) {
                alert("Please provide Transaction ID and upload Payment Proof for manual transfer.");
                return;
            }
            submitFinal();
        }
    };

    const submitFinal = async (paymentDetails: any = null) => {
        setIsSubmitting(true);
        try {
            const fd = new FormData();


            Object.entries(formData).forEach(([key, value]) => {
                if ((key === 'paymentProof' || key === 'companyProfile') && value instanceof File) {
                    fd.append(key, value);
                } else if (Array.isArray(value)) {
                    fd.append(key, JSON.stringify(value));
                } else if (value !== null && value !== undefined) {
                    fd.append(key, String(value));
                }
            });

            if (paymentDetails) {
                fd.set('paymentMode', 'Online/Razorpay');
                fd.append('razorpayOrderId', paymentDetails.razorpay_order_id);
                fd.append('razorpayPaymentId', paymentDetails.razorpay_payment_id);
                fd.set('paymentStatus', 'Completed');
            } else {
                fd.set('paymentStatus', 'Pending');
            }

            const res = await buyerRegistrationApi.submit(fd);
            if (res.success) { setSubmitted(true); window.scrollTo({ top: 0, behavior: "smooth" }); } else alert(res.message);
        } catch (error) { alert("Submission error."); } finally { setIsSubmitting(false); }
    };

    // Consistent compact styles
    const inputClasses = "rounded border-slate-200 h-7 focus:border-[#23471d] focus:ring-[#23471d]/10 transition-all text-[11px] bg-white placeholder:text-[11px] placeholder:text-slate-400 text-slate-700 font-medium shadow-none outline-none px-2 ";
    const labelClasses = "text-[11px] font-semibold text-slate-600 mb-0.5 block";
    const sectionTitleClasses = "text-[13px] font-black text-[#23471d] pb-1 border-b border-emerald-500/20 flex items-center gap-1.5 mb-3 uppercase tracking-tight";

    const handlePackageSelection = (pkg: any) => {
        setTempSelectedPackage(pkg);
        setShowTermsModal(true);
    };

    const confirmPackage = () => {
        if (tempSelectedPackage) {
            setFormData(prev => ({
                ...prev,
                registrationCategory: tempSelectedPackage.name,
                registrationFee: `₹${tempSelectedPackage.price}`,
                consentTerms: true,
                consentPaymentValid: true,
                consentMatchedExhibitors: true
            }));
        }
        setShowTermsModal(false);
    };

    return (
        <div className="min-h-screen bg-[#FDFDFD] font-inter">
            <section className="relative h-[140px] flex items-center justify-center bg-cover bg-center overflow-hidden" style={{ backgroundImage: `url(${heroData?.backgroundImage ? `${SERVER_URL}${heroData.backgroundImage}` : HeroBg})` }}>
                <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/20" />
                <div className="container mx-auto px-4 text-center text-white relative z-10">
                    <p className="text-[9px] uppercase tracking-[0.5em] mb-1 text-emerald-400 font-bold">IHWE 2026 - Global Connect</p>
                    <h1 className="text-2xl md:text-3xl font-serif font-bold mb-1 italic">Buyer Registration</h1>
                    <div className="w-12 h-0.5 bg-emerald-500 mx-auto rounded-full" />
                </div>
            </section>

            <section className="py-4 relative bg-[#F8FAFC]">
                <div className="container mx-auto px-4 max-w-[1400px]">
                    <AnimatePresence mode="wait">
                        {submitted ? (
                            <motion.div key="success" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="bg-white border border-slate-200 p-12 flex flex-col items-center text-center space-y-5 shadow-2xl rounded-xl">
                                <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-500"><CheckCircle size={48} strokeWidth={1.5} /></div>
                                <div className="space-y-2">
                                    <h2 className="text-2xl font-bold text-slate-900 font-serif">Registration Successful!</h2>
                                    <p className="text-slate-500 text-sm max-w-lg mx-auto leading-relaxed">Thank you for choosing IHWE 2026. Your registration details and payment confirmation have been emailed to you.</p>
                                </div>
                                <Link to="/"><Button className="rounded-full px-8 h-10 bg-[#23471d] hover:bg-[#1a3516] text-xs font-bold uppercase tracking-widest shadow-xl">Return Home</Button></Link>
                            </motion.div>
                        ) : (
                            <motion.div key="form" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="bg-white border border-slate-200 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] rounded-lg overflow-hidden">
                                <div className="bg-[#23471d] px-5 py-3 text-white flex justify-between items-center">
                                    <div>
                                        <h2 className="text-base font-bold uppercase tracking-wider">Buyer-Seller Meet</h2>
                                        <p className="text-[9px] text-emerald-300 uppercase tracking-[0.3em] font-medium">International Health & Wellness Expo 2026</p>
                                    </div>
                                    <ShieldCheck className="text-emerald-400 opacity-50" size={24} />
                                </div>
                                <form onSubmit={handleSubmit} className="p-5 space-y-5">

                                    {/* 1. Personal & Company Information */}
                                    <div className="space-y-2">
                                        <h3 className={sectionTitleClasses}> Personal & Company Information</h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                                            <div><Label className={labelClasses}>Full Name *</Label><Input required name="fullName" value={formData.fullName} onChange={handleChange} placeholder="As per ID Proof" className={inputClasses} /></div>
                                            <div><Label className={labelClasses}>Designation *</Label><Input required name="designation" value={formData.designation} onChange={handleChange} placeholder="Current Position" className={inputClasses} /></div>
                                            <div><Label className={labelClasses}>Company Name *</Label><Input required name="companyName" value={formData.companyName} onChange={handleChange} placeholder="Full Registered Name" className={inputClasses} /></div>
                                            <div><Label className={labelClasses}>Business Type *</Label><Select required onValueChange={(v) => handleSelectChange('businessType', v)}><SelectTrigger className={inputClasses}><SelectValue placeholder="Select Type" /></SelectTrigger><SelectContent className="bg-white">{config?.companyTypes?.map((t: string) => <SelectItem key={t} value={t}>{t}</SelectItem>)}</SelectContent></Select></div>
                                        </div>
                                    </div>

                                    {/* 2. Contact Information */}
                                    <div className="space-y-2">
                                        <h3 className={sectionTitleClasses}>Contact Information</h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                                            <div className="space-y-1">
                                                <Label className={labelClasses}>Mobile Number (OTP) *</Label>
                                                <div className="flex gap-2">
                                                    <div className="relative flex-1"><Smartphone className="absolute left-2 top-1.5 text-slate-400" size={12} /><Input required name="mobileNumber" value={formData.mobileNumber} onChange={handleChange} placeholder="Primary" className={`${inputClasses} pl-7`} disabled={mobileOtpVerified} /></div>
                                                    {!mobileOtpVerified && <Button type="button" onClick={() => (mobileOtpSent ? verifyOtp('mobile') : requestOtp('mobile'))} disabled={isVerifying.mobile} className="bg-[#23471d] text-[10px] h-7 px-2 whitespace-nowrap">{isVerifying.mobile ? <Loader2 className="animate-spin" size={10} /> : (mobileOtpSent ? 'Verify' : 'Send')}</Button>}
                                                </div>
                                                {mobileOtpSent && !mobileOtpVerified && <Input placeholder="Enter OTP" value={mobileOtpValue} onChange={(e) => setMobileOtpValue(e.target.value)} className={`${inputClasses} mt-1`} />}
                                            </div>
                                            <div><Label className={labelClasses}>Alternate Number</Label><Input name="alternateNumber" value={formData.alternateNumber} onChange={handleChange} placeholder="Optional" className={inputClasses} /></div>
                                            <div className="space-y-1">
                                                <Label className={labelClasses}>Email Address (OTP) *</Label>
                                                <div className="flex gap-2">
                                                    <div className="relative flex-1"><AtSign className="absolute left-2 top-1.5 text-slate-400" size={12} /><Input type="email" required name="emailAddress" value={formData.emailAddress} onChange={handleChange} placeholder="Work Email" className={`${inputClasses} pl-7`} disabled={emailOtpVerified} /></div>
                                                    {!emailOtpVerified && <Button type="button" onClick={() => (emailOtpSent ? verifyOtp('email') : requestOtp('email'))} disabled={isVerifying.email} className="bg-[#23471d] text-[10px] h-7 px-2 whitespace-nowrap">{isVerifying.email ? <Loader2 className="animate-spin" size={10} /> : (emailOtpSent ? 'Verify' : 'Send')}</Button>}
                                                </div>
                                                {emailOtpSent && !emailOtpVerified && <Input placeholder="Enter OTP" value={emailOtpValue} onChange={(e) => setEmailOtpValue(e.target.value)} className={`${inputClasses} mt-1`} />}
                                            </div>
                                            <div><Label className={labelClasses}>Website (Optional)</Label><Input name="website" value={formData.website} onChange={handleChange} placeholder="https://..." className={inputClasses} /></div>
                                        </div>
                                    </div>

                                    {/* Registered Address, State, City, Pin Code - Single Row without Country */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                                        <div><Label className={labelClasses}>Registered Address *</Label><Input required name="registeredAddress" value={formData.registeredAddress} onChange={handleChange} placeholder="Full Corporate Address" className={inputClasses} /></div>
                                        <div><Label className={labelClasses}>State/Province *</Label><Select onValueChange={(v) => handleSelectChange('stateProvince', v)}><SelectTrigger className={inputClasses}><SelectValue placeholder="Select State" /></SelectTrigger><SelectContent className="bg-white max-h-[200px]">{filteredStates.map(s => <SelectItem key={s._id} value={s.name}>{s.name}</SelectItem>)}</SelectContent></Select></div>
                                        <div><Label className={labelClasses}>City *</Label><Select onValueChange={(v) => handleSelectChange('city', v)} disabled={!formData.stateProvince}><SelectTrigger className={inputClasses}><SelectValue placeholder="Select City" /></SelectTrigger><SelectContent className="bg-white max-h-[200px]">{filteredCities.map(c => <SelectItem key={c._id} value={c.name}>{c.name}</SelectItem>)}</SelectContent></Select></div>
                                        <div><Label className={labelClasses}>Pin Code *</Label><Input required name="pinCode" value={formData.pinCode} onChange={handleChange} placeholder="Postal Code" className={inputClasses} /></div>
                                    </div>

                                    {/* 3. Business Profile */}
                                    <div className="space-y-2">
                                        <h3 className={sectionTitleClasses}> Business Profile</h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                                            <div><Label className={labelClasses}>Years in Operation *</Label><Input type="date" required name="yearsInOperation" value={formData.yearsInOperation} onChange={handleChange} className={inputClasses} /></div>
                                            <div><Label className={labelClasses}>Annual Turnover *</Label><Select onValueChange={(v) => handleSelectChange('annualTurnover', v)}><SelectTrigger className={inputClasses}><SelectValue placeholder="Choose Range" /></SelectTrigger><SelectContent className="bg-white">{config?.annualTurnoverRanges?.map((r: string) => <SelectItem key={r} value={r}>{r}</SelectItem>)}</SelectContent></Select></div>
                                            <div><Label className={labelClasses}>Key Products / Services *</Label><Input required name="keyProductsServices" value={formData.keyProductsServices} onChange={handleChange} placeholder="Your primary offerings..." className={inputClasses} /></div>
                                        </div>
                                    </div>

                                    {/* 4. Sourcing & Buying Interests */}
                                    <div className="space-y-2">
                                        <h3 className={sectionTitleClasses}> Sourcing & Buying Interests</h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                                            <div><Label className={labelClasses}>Primary Product Interest *</Label><Select onValueChange={(v) => handleSelectChange('primaryProductInterest', v)}><SelectTrigger className={inputClasses}><SelectValue placeholder="Choose Interest" /></SelectTrigger><SelectContent className="bg-white">{config?.primaryProductInterests?.map((i: string) => <SelectItem key={i} value={i}>{i}</SelectItem>)}</SelectContent></Select></div>
                                            <div>
                                                <Label className={labelClasses}>Secondary Product Categories</Label>
                                                <Select onValueChange={(v) => handleCheckboxChange('secondaryProductCategories', v, true)}>
                                                    <SelectTrigger className={inputClasses}>
                                                        <SelectValue placeholder={formData.secondaryProductCategories.length > 0 ? `${formData.secondaryProductCategories.length} selected` : "Choose Interests"} />
                                                    </SelectTrigger>
                                                    <SelectContent className="bg-white">
                                                        {config?.secondaryProductCategories?.map((c: string) => (
                                                            <div key={c} className="flex items-center gap-2 px-2 py-1.5 hover:bg-emerald-50 cursor-pointer text-[11px]">
                                                                <Checkbox
                                                                    checked={formData.secondaryProductCategories.includes(c)}
                                                                    onCheckedChange={(checked) => handleCheckboxChange('secondaryProductCategories', c, !!checked)}
                                                                    className="h-3 w-3"
                                                                />
                                                                <span>{c}</span>
                                                            </div>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                            <div><Label className={labelClasses}>Estimated Purchase Volume</Label><Input name="estimatedPurchaseVolume" value={formData.estimatedPurchaseVolume} onChange={handleChange} placeholder="e.g. 5000 Units" className={inputClasses} /></div>
                                            <div><Label className={labelClasses}>Budget Range</Label><Select onValueChange={(v) => handleSelectChange('budgetRange', v)}><SelectTrigger className={inputClasses}><SelectValue placeholder="Choose Budget" /></SelectTrigger><SelectContent className="bg-white">{config?.budgetRanges?.map((b: string) => <SelectItem key={b} value={b}>{b}</SelectItem>)}</SelectContent></Select></div>
                                        </div>
                                        <div className="mt-1">
                                            <Label className={labelClasses}>Specific Product Requirements</Label>
                                            <Textarea name="specificProductRequirements" value={formData.specificProductRequirements} onChange={handleChange} className={`${inputClasses} h-auto min-h-[50px] py-1`} placeholder="Any custom needs..." />
                                        </div>
                                    </div>

                                    {/* 5. Supplier Preference - Single Row */}
                                    <div className="space-y-2">
                                        <h3 className={sectionTitleClasses}> Supplier Preference (India Only)</h3>
                                        <div className="grid grid-cols-1 lg:grid-cols-4 gap-3">
                                            <div className="space-y-1">
                                                <Label className={labelClasses}>Preferred Supplier Region *</Label>
                                                <div className="flex flex-wrap gap-2">
                                                    {['North India', 'South India', 'East India', 'West India', 'Pan India'].map((r: string) => (
                                                        <label key={r} className="flex items-center gap-1 text-[11px] bg-white border border-slate-300 px-2 py-0.5 rounded cursor-pointer hover:border-emerald-500">
                                                            <Checkbox checked={formData.preferredSupplierRegion.includes(r)} onCheckedChange={(checked) => handleCheckboxChange('preferredSupplierRegion', r, !!checked)} className="h-3 w-3" /> {r}
                                                        </label>
                                                    ))}
                                                </div>
                                            </div>
                                            <div className="space-y-1">
                                                <Label className={labelClasses}>Preferred Supplier Type *</Label>
                                                <div className="flex flex-wrap gap-2">
                                                    {['Manufacturer', 'Exporter', 'MSME', 'Startup', 'Wholesaler'].map((t: string) => (
                                                        <label key={t} className="flex items-center gap-1 text-[11px] bg-white border border-slate-300 px-2 py-0.5 rounded cursor-pointer hover:border-emerald-500">
                                                            <Checkbox checked={formData.preferredSupplierType.includes(t)} onCheckedChange={(checked) => handleCheckboxChange('preferredSupplierType', t, !!checked)} className="h-3 w-3" /> {t}
                                                        </label>
                                                    ))}
                                                </div>
                                            </div>
                                            <div><Label className={labelClasses}>Preferred State (Optional)</Label><Select onValueChange={(v) => handleCheckboxChange('preferredState', v, true)}><SelectTrigger className={inputClasses}><SelectValue placeholder="Select State" /></SelectTrigger><SelectContent className="bg-white max-h-[200px]">{filteredStates.map(s => (<div key={s._id} className="flex items-center gap-2 px-2 py-1.5 hover:bg-emerald-50 cursor-pointer text-[11px]"><Checkbox checked={formData.preferredState.includes(s.name)} onCheckedChange={(checked) => handleCheckboxChange('preferredState', s.name, !!checked)} className="h-3 w-3" /><span>{s.name}</span></div>))}</SelectContent></Select></div>
                                            <div><Label className={labelClasses}>Preferred Company Size</Label><Select onValueChange={(v) => handleSelectChange('preferredCompanySize', v)}><SelectTrigger className={inputClasses}><SelectValue placeholder="Select Size" /></SelectTrigger><SelectContent className="bg-white">{config?.companySizes?.map((s: string) => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent></Select></div>
                                        </div>
                                    </div>

                                    {/* 6. Purchase Intent & Capacity */}
                                    <div className="space-y-2 ">
                                        <h3 className={sectionTitleClasses}> Purchase Intent & Capacity</h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                                            <div><Label className={labelClasses}>Buying Frequency *</Label><Select value={formData.buyingFrequency} onValueChange={(v) => handleSelectChange('buyingFrequency', v)}><SelectTrigger className={inputClasses}><SelectValue placeholder="Select" /></SelectTrigger><SelectContent className="bg-white">{['One-time', 'Monthly', 'Quarterly', 'Long-term'].map(f => <SelectItem key={f} value={f}>{f}</SelectItem>)}</SelectContent></Select></div>
                                            <div><Label className={labelClasses}>Est. Annual Purchase Value *</Label><Select value={formData.estimatedAnnualPurchaseValue} onValueChange={(v) => handleSelectChange('estimatedAnnualPurchaseValue', v)}><SelectTrigger className={inputClasses}><SelectValue placeholder="Choose Range" /></SelectTrigger><SelectContent className="bg-white">{config?.annualPurchaseValueRanges?.map((v: string) => <SelectItem key={v} value={v}>{v}</SelectItem>)}</SelectContent></Select></div>
                                            <div><Label className={labelClasses}>Purchase Timeline *</Label><Select value={formData.purchaseTimeline} onValueChange={(v) => handleSelectChange('purchaseTimeline', v)}><SelectTrigger className={inputClasses}><SelectValue placeholder="Select" /></SelectTrigger><SelectContent className="bg-white">{['Immediate', '1–3 Months', '3–6 Months', 'Exploring'].map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}</SelectContent></Select></div>
                                            <div><Label className={labelClasses}>Role in Purchase Decision *</Label><Select value={formData.roleInPurchaseDecision} onValueChange={(v) => handleSelectChange('roleInPurchaseDecision', v)}><SelectTrigger className={inputClasses}><SelectValue placeholder="Select Role" /></SelectTrigger><SelectContent className="bg-white">{['Final Decision Maker', 'Influencer', 'Research Only'].map(r => <SelectItem key={r} value={r}>{r}</SelectItem>)}</SelectContent></Select></div>
                                        </div>
                                    </div>

                                    {/* 7. Certification & Compliance + 8. Pricing Preference - Single Row */}
                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <h3 className={sectionTitleClasses}> Certification & Compliance</h3>
                                            <div className="flex flex-wrap gap-2 p-2 border rounded-lg bg-white">
                                                {['ISO', 'GMP', 'FDA', 'AYUSH', 'Organic', 'Others'].map((c: string) => (
                                                    <label key={c} className="flex items-center gap-1 text-[11px] bg-slate-50 px-2 py-0.5 rounded border border-slate-200 cursor-pointer hover:bg-emerald-50">
                                                        <Checkbox checked={formData.requiredCertifications.includes(c)} onCheckedChange={(checked) => handleCheckboxChange('requiredCertifications', c, !!checked)} className="h-3 w-3" /> {c}
                                                    </label>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <h3 className={sectionTitleClasses}> Pricing Preference</h3>
                                            <div className="flex gap-4 p-2">
                                                <label className="flex items-center gap-1 text-[11px]"><Checkbox checked={formData.pricingPreference === 'Premium'} onCheckedChange={() => handleSelectChange('pricingPreference', 'Premium')} className="h-3 w-3" /> Premium</label>
                                                <label className="flex items-center gap-1 text-[11px]"><Checkbox checked={formData.pricingPreference === 'Mid-Range'} onCheckedChange={() => handleSelectChange('pricingPreference', 'Mid-Range')} className="h-3 w-3" /> Mid-Range</label>
                                                <label className="flex items-center gap-1 text-[11px]"><Checkbox checked={formData.pricingPreference === 'Budget'} onCheckedChange={() => handleSelectChange('pricingPreference', 'Budget')} className="h-3 w-3" /> Budget</label>
                                            </div>
                                        </div>
                                    </div>

                                    {/* 9. B2B Meeting Preferences */}
                                    <div className="space-y-2">
                                        <h3 className={sectionTitleClasses}> B2B Meeting Preferences</h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                                            <div><Label className={labelClasses}>Preferred Meeting Date *</Label><Input type="date" required name="preferredMeetingDate" value={formData.preferredMeetingDate} onChange={handleChange} className={inputClasses} /></div>
                                            <div><Label className={labelClasses}>Preferred Time Slot *</Label><Select onValueChange={(v) => handleSelectChange('preferredTimeSlot', v)}><SelectTrigger className={inputClasses}><SelectValue placeholder="Select Slot" /></SelectTrigger><SelectContent className="bg-white"><SelectItem value="Morning (10AM - 1PM)">Morning (10AM - 1PM)</SelectItem><SelectItem value="Afternoon (2PM - 4PM)">Afternoon (2PM - 4PM)</SelectItem><SelectItem value="Evening (4PM - 6PM)">Evening (4PM - 6PM)</SelectItem></SelectContent></Select></div>
                                            <div><Label className={labelClasses}>Pre-scheduled sB2B *</Label><Select defaultValue="Yes" onValueChange={(v) => handleSelectChange('requirePreScheduledB2B', v)}><SelectTrigger className={inputClasses}><SelectValue placeholder="Yes/No" /></SelectTrigger><SelectContent className="bg-white"><SelectItem value="Yes">Yes</SelectItem><SelectItem value="No">No</SelectItem></SelectContent></Select></div>
                                            <div><Label className={labelClasses}>Meeting Priority Level *</Label><Select defaultValue="Medium" onValueChange={(v) => handleSelectChange('meetingPriorityLevel', v)}><SelectTrigger className={inputClasses}><SelectValue placeholder="Priority" /></SelectTrigger><SelectContent className="bg-white"><SelectItem value="High">High</SelectItem><SelectItem value="Medium">Medium</SelectItem><SelectItem value="General">General</SelectItem></SelectContent></Select></div>
                                        </div>
                                    </div>

                                    {/* 10. Paid Registration Details - Packages Row + Payment Row */}
                                    <div className="space-y-2">
                                        <h3 className={sectionTitleClasses}> Paid Registration Details 💳</h3>
                                        
                                        {!showMembershipOptions ? (
                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                                {/* Standard Buyer Pass */}
                                                <div 
                                                    onClick={() => handlePackageSelection({ name: "Standard Buyer Pass", price: 999 })}
                                                    className={`relative p-2 border-2 transition-all cursor-pointer rounded-lg ${formData.registrationCategory === "Standard Buyer Pass" ? 'border-[#23471d] bg-emerald-50/50 shadow-md' : 'border-slate-200'}`}
                                                >
                                                    {formData.registrationCategory === "Standard Buyer Pass" && <div className="absolute -top-2 left-1/2 -translate-x-1/2 bg-[#23471d] text-white text-[8px] font-bold px-2 py-0.5 rounded-full uppercase">Selected</div>}
                                                    <h4 className="text-[11px] font-bold">Standard Buyer Pass</h4>
                                                    <div className="text-sm font-black text-[#23471d]">₹999</div>
                                                    <ul className="text-[9px] text-slate-500"><li>✓ Access to Expo Floor</li><li>✓ Standard B2B Lounge</li></ul>
                                                </div>

                                                {/* VIP Buyer Pass */}
                                                <div 
                                                    onClick={() => handlePackageSelection({ name: "VIP Buyer Pass", price: 2499 })}
                                                    className={`relative p-2 border-2 transition-all cursor-pointer rounded-lg ${formData.registrationCategory === "VIP Buyer Pass" ? 'border-[#23471d] bg-emerald-50/50 shadow-md' : 'border-slate-200'}`}
                                                >
                                                    {formData.registrationCategory === "VIP Buyer Pass" && <div className="absolute -top-2 left-1/2 -translate-x-1/2 bg-[#23471d] text-white text-[8px] font-bold px-2 py-0.5 rounded-full uppercase">Selected</div>}
                                                    <h4 className="text-[11px] font-bold">VIP Buyer Pass</h4>
                                                    <div className="text-sm font-black text-[#23471d]">₹2499</div>
                                                    <ul className="text-[9px] text-slate-500"><li>✓ Everything in Standard</li><li>✓ Priority B2B Matching</li></ul>
                                                </div>

                                                {/* ICOA Trigger Card */}
                                                <div 
                                                    onClick={() => setShowMembershipOptions(true)}
                                                    className="relative p-2 border-2 border-dashed border-emerald-300 bg-emerald-50/20 transition-all cursor-pointer rounded-lg hover:border-emerald-500"
                                                >
                                                    <h4 className="text-[11px] font-bold text-emerald-800">ICOA Buyer Membership</h4>
                                                    <div className="text-sm font-black text-emerald-600">Starting ₹1,999</div>
                                                    <div className="text-[9px] text-emerald-500 font-bold uppercase mt-1">View Membership Plans →</div>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="space-y-3">
                                                <div className="flex items-center justify-between">
                                                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">ICOA Membership Categories</p>
                                                    <Button type="button" onClick={() => setShowMembershipOptions(false)} variant="ghost" className="h-6 text-[10px] text-emerald-600 font-bold hover:bg-emerald-50">← Back to Passes</Button>
                                                </div>
                                                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                                    {membershipPackages.map((pkg) => (
                                                        <div 
                                                            key={pkg.name} 
                                                            onClick={() => handlePackageSelection(pkg)}
                                                            className={`relative p-2 border-2 transition-all cursor-pointer rounded-lg ${formData.registrationCategory === pkg.name ? 'border-[#23471d] bg-emerald-50/50 shadow-md' : 'border-slate-200'}`}
                                                        >
                                                            {formData.registrationCategory === pkg.name && <div className="absolute -top-2 left-1/2 -translate-x-1/2 bg-[#23471d] text-white text-[8px] font-bold px-2 py-0.5 rounded-full uppercase">Selected</div>}
                                                            <h4 className="text-[11px] font-bold">{pkg.name}</h4>
                                                            <div className="text-sm font-black text-[#23471d]">₹{pkg.price}</div>
                                                            <ul className="text-[9px] text-slate-500">
                                                                {pkg.benefits.map((b, i) => <li key={i}>✓ {b}</li>)}
                                                            </ul>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                        <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mt-2">
                                            <div><Label className={labelClasses}>Registration Fee</Label><Input value={formData.registrationFee} disabled className={`${inputClasses} bg-slate-50`} placeholder="Fee" /></div>
                                            <div><Label className={labelClasses}>Payment Mode *</Label><RadioGroup defaultValue="UPI" onValueChange={(v) => setFormData(p => ({ ...p, paymentMode: v }))} className="flex gap-3"><div className="flex items-center gap-1"><RadioGroupItem value="UPI" id="mode-upi" /><Label htmlFor="mode-upi" className="text-[11px]">UPI</Label></div><div className="flex items-center gap-1"><RadioGroupItem value="Credit/Debit Card" id="mode-card" /><Label htmlFor="mode-card" className="text-[11px]">Card</Label></div><div className="flex items-center gap-1"><RadioGroupItem value="Net Banking" id="mode-net" /><Label htmlFor="mode-net" className="text-[11px]">Net Banking</Label></div></RadioGroup></div>
                                            <div><Label className={labelClasses}>Transaction ID / Reference *</Label><Input required name="transactionId" value={formData.transactionId} onChange={handleChange} placeholder="UTR / Ref Number" className={inputClasses} /></div>
                                            <div><Label className={labelClasses}>Upload Payment Proof *</Label><Input type="file" required accept="image/*" onChange={handleFileChange} className={`${inputClasses} pt-1`} placeholder="No file chosen" /></div>
                                        </div>
                                    </div>

                                    {/* 11. Additional Information */}
                                    <div className="space-y-2">
                                        <h3 className={sectionTitleClasses}> Additional Information</h3>
                                        <Textarea name="remarks" value={formData.remarks} onChange={handleChange} placeholder="Remarks / Special Requirements" className={`${inputClasses} h-[50px]`} />
                                    </div>

                                    {/* 12. Consent & Declaration */}
                                    <div className="pt-2 space-y-3 border-t border-slate-200">
                                        <h3 className={sectionTitleClasses}> Consent & Declaration</h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 items-start">
                                            <div className="space-y-1">
                                                <div className="flex items-start gap-2 p-1"><Checkbox id="consent-terms" checked={formData.consentTerms} onCheckedChange={(c) => setFormData(p => ({ ...p, consentTerms: !!c }))} className="h-3 w-3 mt-0.5" /><Label htmlFor="consent-terms" className="text-[10px] leading-tight text-slate-600 font-medium">I agree to Terms & Conditions and Refund Policy *</Label></div>
                                                <div className="flex items-start gap-2 p-1"><Checkbox id="consent-valid" checked={formData.consentPaymentValid} onCheckedChange={(c) => setFormData(p => ({ ...p, consentPaymentValid: !!c }))} className="h-3 w-3 mt-0.5" /><Label htmlFor="consent-valid" className="text-[10px] leading-tight text-slate-600 font-medium">I confirm that the payment made is valid and non-refundable *</Label></div>
                                                <div className="flex items-start gap-2 p-1"><Checkbox id="consent-match" checked={formData.consentMatchedExhibitors} onCheckedChange={(c) => setFormData(p => ({ ...p, consentMatchedExhibitors: !!c }))} className="h-3 w-3 mt-0.5" /><Label htmlFor="consent-match" className="text-[10px] leading-tight text-slate-600 font-medium">I agree to be matched with relevant exhibitors *</Label></div>
                                            </div>
                                            <div className="flex flex-col items-center">
                                                <Button type="submit" disabled={isSubmitting} className="w-full h-8 bg-[#23471d] hover:bg-[#1a3516] rounded-full text-white font-bold text-[11px] uppercase tracking-wider shadow-md transition-all flex items-center justify-center gap-2">{isSubmitting ? <Loader2 size={12} className="animate-spin" /> : <>Submit Registration <Send size={11} /></>}</Button>
                                                <p className="mt-1 text-[8px] text-slate-400 font-bold uppercase tracking-wide flex items-center gap-1"><Shield size={8} className="text-[#23471d]" /> Secured Registration System</p>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </section>

            {/* Terms & Conditions Modal */}
            <AnimatePresence>
                {showTermsModal && (
                    <motion.div 
                        initial={{ opacity: 0 }} 
                        animate={{ opacity: 1 }} 
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
                    >
                        <motion.div 
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 20 }}
                            className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[85vh] flex flex-col overflow-hidden"
                        >
                            <div className="bg-[#23471d] p-4 text-white flex justify-between items-center">
                                <h3 className="font-bold uppercase tracking-wider text-sm">Payment Terms & Conditions</h3>
                                <button onClick={() => setShowTermsModal(false)} className="hover:rotate-90 transition-transform"><Loader2 className="rotate-45" size={20} /></button>
                            </div>
                            
                            <div className="p-6 overflow-y-auto text-[11px] leading-relaxed text-slate-600 space-y-4 font-medium custom-scrollbar">
                                <div className="p-3 bg-emerald-50 rounded-lg border border-emerald-100 text-emerald-800 font-bold mb-4">
                                    Registration: {tempSelectedPackage?.name} — ₹{tempSelectedPackage?.price}
                                </div>
                                <p className="font-bold underline text-slate-800 uppercase">9th Edition of International Health & Wellness Expo 2026 (IHWE – Global Edition)</p>
                                <p>Organised by: Namo Gange Wellness Pvt. Ltd.</p>
                                
                                <div className="space-y-3 pt-2">
                                    <p><strong>1. Acceptance of Terms:</strong> By proceeding with registration, the Participant confirms they have read and agreed to these Terms under the Indian Contract Act, 1872.</p>
                                    <p><strong>2. Scope of Payment:</strong> Includes Exhibition Stall Booking, Sponsorship, Buyer/Seller Registration, and Membership fees.</p>
                                    <p><strong>3. Confirmation:</strong> Confirmed only upon receipt of payment. Confirmation invoice will be issued via email.</p>
                                    <p><strong>4. Pricing & Taxes:</strong> Fees are exclusive of GST. Participant agrees to bear all duties and charges.</p>
                                    <p><strong>5. Strict No Refund Policy:</strong> ALL PAYMENTS ARE FINAL, NON-REFUNDABLE, AND NON-TRANSFERABLE. This includes cancellations, no-shows, or changes in plans.</p>
                                    <p><strong>6. Force Majeure:</strong> Organiser reserves right to reschedule. Registration remains valid for revised dates; no refund arises.</p>
                                    <p><strong>7. Jurisdiction:</strong> Governed by laws of India. Disputes subject to Courts in Delhi NCR.</p>
                                </div>
                                
                                <div className="pt-4 border-t border-slate-100 italic text-[10px]">
                                    Note: Expo entry is free; Buyer-Seller Meet is conducted by ICOA for curated business engagement.
                                </div>
                            </div>

                            <div className="p-4 bg-slate-50 border-t border-slate-200 flex flex-col gap-3">
                                <div className="flex items-start gap-3 p-3 bg-white border border-emerald-200 rounded-lg">
                                    <Checkbox id="modal-consent" onCheckedChange={(checked) => {
                                        if (checked) {
                                            // Optional: visual feedback before closing or auto-confirm
                                        }
                                    }} />
                                    <Label htmlFor="modal-consent" className="text-[10px] leading-tight text-slate-700 font-bold">
                                        I have read, understood, and agree to the Payment Terms & Conditions, including the strictly non-refundable and non-transferable policy, and I voluntarily proceed.
                                    </Label>
                                </div>
                                <div className="flex gap-2">
                                    <Button variant="outline" onClick={() => setShowTermsModal(false)} className="flex-1 h-9 text-xs">Cancel</Button>
                                    <Button 
                                        onClick={confirmPackage}
                                        className="flex-1 h-9 bg-[#23471d] hover:bg-[#1a3516] text-white text-xs font-bold uppercase"
                                    >
                                        Agree & Proceed
                                    </Button>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default BuyerRegistration;