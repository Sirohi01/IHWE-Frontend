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
        
        // 1. All Mandatory Text & Single-Select Fields Validation
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
            { key: 'preferredMeetingDate', label: 'Preferred Meeting Date' },
            { key: 'preferredTimeSlot', label: 'Preferred Time Slot' },
            { key: 'registrationCategory', label: 'Registration Category' }
        ];

        const missingFields = requiredFields.filter(field => !formData[field.key as keyof typeof formData]);
        
        if (missingFields.length > 0) {
            alert(`Please complete the following required fields: \n- ${missingFields.map(f => f.label).join('\n- ')}`);
            return;
        }

        // 2. Multi-select Validation
        if (formData.preferredSupplierRegion.length === 0 || formData.preferredSupplierType.length === 0) {
            alert("Please select at least one Preferred Supplier Region and Type.");
            return;
        }

        // 3. Consent Validation
        if (!formData.consentTerms || !formData.consentPaymentValid || !formData.consentMatchedExhibitors) { 
            alert("Please check all mandatory consent boxes."); 
            return; 
        }
        
        // 4. OTP Verification Check
        if (!emailOtpVerified || !mobileOtpVerified) { 
            alert("Please verify your Email and Mobile via OTP before submitting."); 
            return; 
        }

        // 5. Proceed with Payment/Submission
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
                if (key === 'paymentProof' && value instanceof File) {
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


    const inputClasses = "rounded border-slate-200 h-8 focus:border-[#23471d] focus:ring-[#23471d]/10 transition-all text-[10px] bg-white placeholder:text-slate-400 text-slate-700 font-medium shadow-none outline-none px-2 ";
    const labelClasses = "text-[10px] font-semibold text-slate-600 mb-1 block";
    const sectionTitleClasses = "text-[13px] font-black text-[#23471d] pb-2 border-b-2 border-emerald-500/20 flex items-center gap-1.5 mb-4 uppercase tracking-tight";

    return (
        <div className="min-h-screen bg-[#FDFDFD] font-inter">
            <section className="relative h-[160px] flex items-center justify-center bg-cover bg-center overflow-hidden" style={{ backgroundImage: `url(${heroData?.backgroundImage ? `${SERVER_URL}${heroData.backgroundImage}` : HeroBg})` }}>
                <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/20" />
                <div className="container mx-auto px-4 text-center text-white relative z-10">
                    <p className="text-[8px] uppercase tracking-[0.5em] mb-1.5 text-emerald-400 font-bold">IHWE 2026 - Global Connect</p>
                    <h1 className="text-2xl md:text-3xl font-serif font-bold mb-2 italic">Buyer Registration</h1>
                    <div className="w-12 h-0.5 bg-emerald-500 mx-auto rounded-full" />
                </div>
            </section>

            <section className="py-6 relative bg-[#F8FAFC]">
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
                                <div className="bg-[#23471d] px-6 py-4 text-white flex justify-between items-center">
                                    <div>
                                        <h2 className="text-lg font-bold uppercase tracking-widest">Buyer-Seller Meet</h2>
                                        <p className="text-[9px] text-emerald-300 uppercase tracking-[0.3em] font-medium">International Health & Wellness Expo 2026</p>
                                    </div>
                                    <ShieldCheck className="text-emerald-400 opacity-50" size={28} />
                                </div>
                                <form onSubmit={handleSubmit} className="p-6 space-y-6">

                                    <div className="space-y-3">
                                        <h3 className={sectionTitleClasses}>Personal & Company Information</h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                                            <div><Label className={labelClasses}>Contact Person *</Label><Input required name="fullName" value={formData.fullName} onChange={handleChange} placeholder="As per ID Proof" className={inputClasses} /></div>
                                            <div><Label className={labelClasses}>Designation *</Label><Input required name="designation" value={formData.designation} onChange={handleChange} placeholder="Current Position" className={inputClasses} /></div>
                                            <div><Label className={labelClasses}>Company Name *</Label><Input required name="companyName" value={formData.companyName} onChange={handleChange} placeholder="Full Registered Name" className={inputClasses} /></div>
                                            <div><Label className={labelClasses}>Business Type *</Label><Select required onValueChange={(v) => handleSelectChange('businessType', v)}><SelectTrigger className={inputClasses}><SelectValue placeholder="Select Type" /></SelectTrigger><SelectContent className="bg-white">{config?.companyTypes.map((t: string) => <SelectItem key={t} value={t}>{t}</SelectItem>)}</SelectContent></Select></div>
                                        </div>
                                    </div>


                                    <div className="space-y-3">
                                        <h3 className={sectionTitleClasses}>Contact Information</h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                                            <div className="space-y-1.5">
                                                <Label className={labelClasses}>Email (verified by OTP) *</Label>
                                                <div className="flex gap-2">
                                                    <div className="relative flex-1"><AtSign className="absolute left-2 top-2 text-slate-400" size={12} /><Input type="email" required name="emailAddress" value={formData.emailAddress} onChange={handleChange} placeholder="Work Email" className={`${inputClasses} pl-7`} disabled={emailOtpVerified} /></div>
                                                    {!emailOtpVerified && <Button type="button" onClick={() => (emailOtpSent ? verifyOtp('email') : requestOtp('email'))} disabled={isVerifying.email} className="bg-[#23471d] text-[10px] h-8 px-2 whitespace-nowrap">{isVerifying.email ? <Loader2 className="animate-spin" size={10} /> : (emailOtpSent ? 'Verify' : 'Send')}</Button>}
                                                </div>
                                                {emailOtpSent && !emailOtpVerified && <Input placeholder="OTP" value={emailOtpValue} onChange={(e) => setEmailOtpValue(e.target.value)} className={inputClasses} />}
                                            </div>
                                            <div className="space-y-1.5">
                                                <Label className={labelClasses}>Mobile (verified by OTP) *</Label>
                                                <div className="flex gap-2">
                                                    <div className="relative flex-1"><Smartphone className="absolute left-2 top-2 text-slate-400" size={12} /><Input required name="mobileNumber" value={formData.mobileNumber} onChange={handleChange} placeholder="Primary" className={`${inputClasses} pl-7`} disabled={mobileOtpVerified} /></div>
                                                    {!mobileOtpVerified && <Button type="button" onClick={() => (mobileOtpSent ? verifyOtp('mobile') : requestOtp('mobile'))} disabled={isVerifying.mobile} className="bg-[#23471d] text-[10px] h-8 px-2 whitespace-nowrap">{isVerifying.mobile ? <Loader2 className="animate-spin" size={10} /> : (mobileOtpSent ? 'Verify' : 'Send')}</Button>}
                                                </div>
                                                {mobileOtpSent && !mobileOtpVerified && <Input placeholder="OTP" value={mobileOtpValue} onChange={(e) => setMobileOtpValue(e.target.value)} className={inputClasses} />}
                                            </div>
                                            <div><Label className={labelClasses}>Alternate Number</Label><Input name="alternateNumber" value={formData.alternateNumber} onChange={handleChange} placeholder="Optional" className={inputClasses} /></div>
                                            <div><Label className={labelClasses}>Website</Label><Input name="website" value={formData.website} onChange={handleChange} placeholder="https://..." className={inputClasses} /></div>
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 pt-1">

                                            <div><Label className={labelClasses}>State/Province *</Label><Select onValueChange={(v) => handleSelectChange('stateProvince', v)}><SelectTrigger className={inputClasses}><SelectValue placeholder="Select" /></SelectTrigger><SelectContent className="bg-white max-h-[200px]">{filteredStates.map(s => <SelectItem key={s._id} value={s.name}>{s.name}</SelectItem>)}</SelectContent></Select></div>
                                            <div><Label className={labelClasses}>City *</Label><Select onValueChange={(v) => handleSelectChange('city', v)} disabled={!formData.stateProvince}><SelectTrigger className={inputClasses}><SelectValue placeholder="Select" /></SelectTrigger><SelectContent className="bg-white max-h-[200px]">{filteredCities.map(c => <SelectItem key={c._id} value={c.name}>{c.name}</SelectItem>)}</SelectContent></Select></div>


                                            <div><Label className={labelClasses}>Registered Address *</Label><Input required name="registeredAddress" value={formData.registeredAddress} onChange={handleChange} className={inputClasses} placeholder="Full Corporate Address" /></div>
                                            <div><Label className={labelClasses}>Pin Code *</Label><Input required name="pinCode" value={formData.pinCode} onChange={handleChange} className={inputClasses} placeholder="Pin code" /></div>
                                        </div>

                                    </div>


                                    <div className="space-y-3">
                                        <h3 className={sectionTitleClasses}>Business Profile & Interests</h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                                            <div><Label className={labelClasses}>Years in Operation *</Label><Input type="date" required name="yearsInOperation" value={formData.yearsInOperation} onChange={handleChange} className={inputClasses} /></div>
                                            <div><Label className={labelClasses}>Annual Turnover *</Label><Select onValueChange={(v) => handleSelectChange('annualTurnover', v)}><SelectTrigger className={inputClasses}><SelectValue placeholder="Choose Range" /></SelectTrigger><SelectContent className="bg-white">{config?.annualTurnoverRanges.map((r: string) => <SelectItem key={r} value={r}>{r}</SelectItem>)}</SelectContent></Select></div>
                                            <div><Label className={labelClasses}>Buying Frequency *</Label><Select onValueChange={(v) => handleSelectChange('buyingFrequency', v)}><SelectTrigger className={inputClasses}><SelectValue placeholder="Choose Frequency" /></SelectTrigger><SelectContent className="bg-white">{config?.buyingFrequencies.map((f: string) => <SelectItem key={f} value={f}>{f}</SelectItem>)}</SelectContent></Select></div>
                                            <div><Label className={labelClasses}>Primary Product Interest *</Label><Select onValueChange={(v) => handleSelectChange('primaryProductInterest', v)}><SelectTrigger className={inputClasses}><SelectValue placeholder="Choose Interest" /></SelectTrigger><SelectContent className="bg-white">{config?.primaryProductInterests.map((i: string) => <SelectItem key={i} value={i}>{i}</SelectItem>)}</SelectContent></Select></div>
                                            <div><Label className={labelClasses}>Est. Annual Purchase *</Label><Select onValueChange={(v) => handleSelectChange('estimatedAnnualPurchaseValue', v)}><SelectTrigger className={inputClasses}><SelectValue placeholder="Choose Range" /></SelectTrigger><SelectContent className="bg-white">{config?.annualPurchaseValueRanges.map((v: string) => <SelectItem key={v} value={v}>{v}</SelectItem>)}</SelectContent></Select></div>
                                            <div><Label className={labelClasses}>Budget Range *</Label><Select onValueChange={(v) => handleSelectChange('budgetRange', v)}><SelectTrigger className={inputClasses}><SelectValue placeholder="Choose Budget" /></SelectTrigger><SelectContent className="bg-white">{config?.budgetRanges.map((b: string) => <SelectItem key={b} value={b}>{b}</SelectItem>)}</SelectContent></Select></div>
                                            <div><Label className={labelClasses}>Est. Purchase Volume</Label><Input name="estimatedPurchaseVolume" value={formData.estimatedPurchaseVolume} onChange={handleChange} className={inputClasses} placeholder="e.g. 5000 Units" /></div>
                                            <div><Label className={labelClasses}>Key Products/Services *</Label><Input required name="keyProductsServices" value={formData.keyProductsServices} onChange={handleChange} className={inputClasses} placeholder="Your primary offerings..." /></div>
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                                            <div><Label className={labelClasses}>Secondary Categories</Label><div className="flex flex-wrap gap-2 mt-1 max-h-[100px] overflow-y-auto p-2 border rounded bg-white">{config?.secondaryProductCategories.map((c: string) => (<label key={c} className="flex items-center gap-1.5 text-[9px] cursor-pointer bg-slate-50 px-2 py-1 rounded border border-slate-200 hover:bg-emerald-50 transition-colors"><Checkbox checked={formData.secondaryProductCategories.includes(c)} onCheckedChange={(checked) => handleCheckboxChange('secondaryProductCategories', c, !!checked)} className="h-2.5 w-2.5" /> {c}</label>))}</div></div>
                                            <div><Label className={labelClasses}>Specific Requirements</Label><Textarea name="specificProductRequirements" value={formData.specificProductRequirements} onChange={handleChange} className={`${inputClasses} h-auto min-h-[50px] py-1.5`} placeholder="Any custom needs..." /></div>
                                        </div>
                                    </div>

                                    {/* Supplier Preference (India Only) */}
                                    <div className="space-y-3">
                                        <h3 className={sectionTitleClasses}>Supplier Preference (India Only)</h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                            <div className="col-span-1 lg:col-span-2 space-y-1.5"><Label className={labelClasses}>Preferred Regions *</Label><div className="flex flex-wrap gap-1.5">{config?.regions.map((r: string) => (<label key={r} className="flex items-center gap-1.5 text-[10px] bg-white border border-slate-300 px-2 py-1  cursor-pointer hover:border-emerald-500 transition-all"><Checkbox checked={formData.preferredSupplierRegion.includes(r)} onCheckedChange={(checked) => handleCheckboxChange('preferredSupplierRegion', r, !!checked)} className="h-3 w-3" /> {r}</label>))}</div></div>
                                            <div className="col-span-1 lg:col-span-2 space-y-1.5"><Label className={labelClasses}>Preferred Types *</Label><div className="flex flex-wrap gap-1.5">{config?.supplierTypes.map((t: string) => (<label key={t} className="flex items-center gap-1.5 text-[10px] bg-white border border-slate-300 px-2 py-1  cursor-pointer hover:border-emerald-500 transition-all"><Checkbox checked={formData.preferredSupplierType.includes(t)} onCheckedChange={(checked) => handleCheckboxChange('preferredSupplierType', t, !!checked)} className="h-3 w-3" /> {t}</label>))}</div></div>
                                            <div><Label className={labelClasses}>Preferred States</Label><div className="flex flex-wrap gap-1.5 max-h-[80px] overflow-y-auto p-2 border rounded bg-white">{filteredStates.map(s => (<label key={s._id} className="flex items-center gap-1.5 text-[10px]"><Checkbox checked={formData.preferredState.includes(s.name)} onCheckedChange={(checked) => handleCheckboxChange('preferredState', s.name, !!checked)} className="h-3 w-3" /> {s.name}</label>))}</div></div>
                                            <div><Label className={labelClasses}>Preferred Company Size</Label><Select onValueChange={(v) => handleSelectChange('preferredCompanySize', v)}><SelectTrigger className={inputClasses}><SelectValue placeholder="Select" /></SelectTrigger><SelectContent className="bg-white">{config?.companySizes.map((s: string) => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent></Select></div>
                                        </div>
                                    </div>

                                    {/* Purchase Timeline, Decision Role, Pricing Preference */}
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-emerald-50/30 p-4 rounded-lg border border-emerald-100/50">
                                        <div className="space-y-1.5"><Label className={labelClasses}>Purchase Timeline *</Label><RadioGroup onValueChange={(v) => handleSelectChange('purchaseTimeline', v)} className="flex flex-wrap gap-x-4 gap-y-1">{config?.purchaseTimelines.map((t: string) => (<div key={t} className="flex items-center space-x-1.5"><RadioGroupItem value={t} id={`timeline-${t}`} className="h-3 w-3" /><Label htmlFor={`timeline-${t}`} className="text-[10px] font-medium text-slate-600">{t}</Label></div>))}</RadioGroup></div>
                                        <div className="space-y-1.5"><Label className={labelClasses}>Decision Role *</Label><RadioGroup onValueChange={(v) => handleSelectChange('roleInPurchaseDecision', v)} className="flex flex-wrap gap-x-4 gap-y-1">{config?.roles.map((r: string) => (<div key={r} className="flex items-center space-x-1.5"><RadioGroupItem value={r} id={`role-${r}`} className="h-3 w-3" /><Label htmlFor={`role-${r}`} className="text-[10px] font-medium text-slate-600">{r}</Label></div>))}</RadioGroup></div>
                                        <div className="space-y-1.5"><Label className={labelClasses}>Pricing Preference *</Label><RadioGroup defaultValue="Mid-Range" onValueChange={(v) => handleSelectChange('pricingPreference', v)} className="flex flex-wrap gap-x-4 gap-y-1">{["Premium", "Mid-Range", "Budget"].map(p => (<div key={p} className="flex items-center space-x-1.5"><RadioGroupItem value={p} id={`price-${p}`} className="h-3 w-3" /><Label htmlFor={`price-${p}`} className="text-[10px] font-medium text-slate-600">{p}</Label></div>))}</RadioGroup></div>
                                    </div>

                                    {/* B2B Meeting Preferences */}
                                    <div className="space-y-3">
                                        <h3 className={sectionTitleClasses}>B2B Meeting Preferences</h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                                            <div><Label className={labelClasses}>Preferred Date *</Label><Input type="date" required name="preferredMeetingDate" value={formData.preferredMeetingDate} onChange={handleChange} className={inputClasses} /></div>
                                            <div><Label className={labelClasses}>Preferred Slot *</Label><Select onValueChange={(v) => handleSelectChange('preferredTimeSlot', v)}><SelectTrigger className={inputClasses}><SelectValue placeholder="Select Slot" /></SelectTrigger><SelectContent className="bg-white"><SelectItem value="Morning (10AM - 1PM)">Morning (10AM - 1PM)</SelectItem><SelectItem value="Afternoon (2PM - 4PM)">Afternoon (2PM - 4PM)</SelectItem><SelectItem value="Evening (4PM - 6PM)">Evening (4PM - 6PM)</SelectItem></SelectContent></Select></div>
                                            <div><Label className={labelClasses}>Pre-Scheduled? *</Label><Select defaultValue="Yes" onValueChange={(v) => handleSelectChange('requirePreScheduledB2B', v)}><SelectTrigger className={inputClasses}><SelectValue placeholder="Yes/No" /></SelectTrigger><SelectContent className="bg-white"><SelectItem value="Yes">Yes, Require sB2B</SelectItem><SelectItem value="No">No, Walk-in only</SelectItem></SelectContent></Select></div>
                                            <div><Label className={labelClasses}>Priority Level *</Label><Select defaultValue="Medium" onValueChange={(v) => handleSelectChange('meetingPriorityLevel', v)}><SelectTrigger className={inputClasses}><SelectValue placeholder="Priority" /></SelectTrigger><SelectContent className="bg-white"><SelectItem value="High">High Priority</SelectItem><SelectItem value="Medium">Medium Priority</SelectItem><SelectItem value="General">General</SelectItem></SelectContent></Select></div>
                                        </div>
                                    </div>

                                    {/* Certification & Remarks */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-3">
                                            <h3 className={sectionTitleClasses}>Certifications & Compliance</h3>
                                            <div className="flex flex-wrap gap-2 p-3 border rounded-lg bg-white min-h-[50px]">{config?.certificationOptions.map((c: string) => (<label key={c} className="flex items-center gap-1.5 text-[10px] bg-slate-50 px-2 py-1.5 rounded border border-slate-200 cursor-pointer hover:bg-emerald-50"><Checkbox checked={formData.requiredCertifications.includes(c)} onCheckedChange={(checked) => handleCheckboxChange('requiredCertifications', c, !!checked)} className="h-3 w-3" /> {c}</label>))}</div>
                                        </div>
                                        <div className="space-y-3">
                                            <h3 className={sectionTitleClasses}>Additional Remarks</h3>
                                            <Textarea name="remarks" value={formData.remarks} onChange={handleChange} placeholder="Any other special requirements or remarks..." className={`${inputClasses} h-[55px]`} />
                                        </div>
                                    </div>

                                    {/* Registration Packages & Payment Mode */}
                                    <div className="space-y-3">
                                        <h3 className={sectionTitleClasses}>Registration Details & Payment</h3>
                                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 col-span-1">
                                                {config?.packages.map((pkg: any) => {
                                                    const isActive = formData.registrationCategory === pkg.name;
                                                    return (
                                                        <div key={pkg.name} onClick={() => handleSelectChange('registrationCategory', pkg.name)} className={`relative p-3 border-2 transition-all cursor-pointer rounded-lg ${isActive ? 'border-[#23471d] bg-emerald-50/50 shadow-md' : 'border-slate-200 hover:border-slate-300'}`}>
                                                            {isActive && <div className="absolute -top-2 left-1/2 -translate-x-1/2 bg-[#23471d] text-white text-[8px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider whitespace-nowrap">Selected</div>}
                                                            <h4 className="text-[11px] font-bold mb-0.5">{pkg.name}</h4>
                                                            <div className="text-lg font-black text-[#23471d] mb-2">₹{pkg.price} <span className="text-[8px] font-normal text-slate-400">+ GST</span></div>
                                                            <ul className="space-y-1">{pkg.benefits.slice(0, 3).map((b: string, i: number) => (<li key={i} className="flex items-start gap-1 text-[8px] font-medium text-slate-600"><CheckCircle className="text-emerald-500 mt-0.5 shrink-0" size={8} /> {b}</li>))}</ul>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                            <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                                                <Label className={labelClasses}>Payment Mode *</Label>
                                                <RadioGroup defaultValue="Online/Razorpay" onValueChange={(v) => setFormData(p => ({ ...p, paymentMode: v }))} className="flex gap-4 mb-3">
                                                    <div className="flex items-center space-x-1.5"><RadioGroupItem value="Online/Razorpay" id="mode-online" /><Label htmlFor="mode-online" className="text-[10px] cursor-pointer">Online / Instant</Label></div>
                                                    <div className="flex items-center space-x-1.5"><RadioGroupItem value="Manual Transfer" id="mode-manual" /><Label htmlFor="mode-manual" className="text-[10px] cursor-pointer">Manual Transfer (UPI/NetBanking)</Label></div>
                                                </RadioGroup>

                                                {formData.paymentMode !== 'Online/Razorpay' && (
                                                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="space-y-3 pt-3 border-t border-slate-200">
                                                        <div className="grid grid-cols-2 gap-3">
                                                            <div><Label className={labelClasses}>Transaction ID / Ref *</Label><Input required name="transactionId" value={formData.transactionId} onChange={handleChange} className={inputClasses} placeholder="UTR / Ref Number" /></div>
                                                            <div><Label className={labelClasses}>Upload Proof *</Label><Input type="file" required accept="image/*" onChange={handleFileChange} className={`${inputClasses} pt-1`} /></div>
                                                        </div>
                                                        <p className="text-[8px] text-slate-500 italic font-medium">Please upload a screenshot of your payment for manual verification.</p>
                                                    </motion.div>
                                                )}
                                                {formData.paymentMode === 'Online/Razorpay' && (
                                                    <div className="flex items-center gap-2 p-3 bg-white rounded border border-emerald-100">
                                                        <CreditCard className="text-emerald-600" size={16} />
                                                        <p className="text-[10px] text-emerald-800 font-medium leading-tight">Pay securely via UPI, Card, or Net Banking. Your registration will be confirmed instantly.</p>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Terms & Submit */}
                                    <div className="pt-4 space-y-4 border-t border-slate-200">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
                                            <div className="space-y-2">
                                                <div className="flex items-start gap-2 p-2 bg-slate-50 rounded border border-slate-100"><Checkbox id="consent-terms" checked={formData.consentTerms} onCheckedChange={(c) => setFormData(p => ({ ...p, consentTerms: !!c }))} className="h-3 w-3 mt-0.5" /><Label htmlFor="consent-terms" className="text-[9px] leading-relaxed text-slate-600 font-medium">I agree to the Terms & Conditions and Refund Policy *</Label></div>
                                                <div className="flex items-start gap-2 p-2 bg-slate-50 rounded border border-slate-100"><Checkbox id="consent-valid" checked={formData.consentPaymentValid} onCheckedChange={(c) => setFormData(p => ({ ...p, consentPaymentValid: !!c }))} className="h-3 w-3 mt-0.5" /><Label htmlFor="consent-valid" className="text-[9px] leading-relaxed text-slate-600 font-medium">I confirm that the payment made is valid and non-refundable *</Label></div>
                                                <div className="flex items-start gap-2 p-2 bg-slate-50 rounded border border-slate-100"><Checkbox id="consent-match" checked={formData.consentMatchedExhibitors} onCheckedChange={(c) => setFormData(p => ({ ...p, consentMatchedExhibitors: !!c }))} className="h-3 w-3 mt-0.5" /><Label htmlFor="consent-match" className="text-[9px] leading-relaxed text-slate-600 font-medium">I agree to be matched with relevant exhibitors *</Label></div>
                                            </div>
                                            <div className="flex flex-col items-center">
                                                <Button type="submit" disabled={isSubmitting} className="w-full h-10 bg-[#23471d] hover:bg-[#1a3516] rounded-full text-white font-bold text-[10px] uppercase tracking-[0.2em] shadow-md transition-all flex items-center justify-center gap-2 group">{isSubmitting ? <Loader2 size={14} className="animate-spin" /> : <>{formData.paymentMode === 'Online/Razorpay' ? 'Complete Registration & Pay' : 'Submit Registration Proof'} <Send size={12} className="group-hover:translate-x-1 transition-transform" /></>}</Button>
                                                <p className="mt-2 text-[8px] text-slate-400 font-bold uppercase tracking-[0.2em] flex items-center gap-1"><Shield size={8} className="text-[#23471d]" /> Secured Registration System</p>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </section >
        </div >
    );
};

export default BuyerRegistration;