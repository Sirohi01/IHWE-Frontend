
import { useState, useEffect, useMemo, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
    CheckCircle,
    ShieldCheck,
    Loader2,
    CreditCard,
    Smartphone,
    AtSign,
    FileText,
    Lock,
    AlertTriangle,
    Ban,
    ChevronDown,
    X,
    Store,
    Factory,
    Globe,
    Laptop,
    HeartPulse,
    Leaf,
    Hotel,
    Briefcase,
    ChevronsUpDown,
    Upload,
    Signature,
    Scale
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import HeroBg from "@/assets/buyer.jpg";
import { buyerRegistrationApi, heroBackgroundApi, SERVER_URL, crmApi, otpApi, policyApi, internationalBuyerApi } from "@/lib/api";
import { toast } from "sonner";
import { useEffect as useEffectDropdown } from "react";


interface MultiSelectDropdownProps {
    options: string[];
    selected: string[];
    onChange: (selected: string[]) => void;
    placeholder?: string;
    error?: boolean;
    disabled?: boolean;
    accentColor?: string;
    badgeColor?: string;
}

const MultiSelectDropdown = ({
    options,
    selected,
    onChange,
    placeholder = "Select options",
    error = false,
    disabled = false,
    accentColor = "emerald",
}: MultiSelectDropdownProps) => {
    const [open, setOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffectDropdown(() => {
        const handler = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, []);

    const toggle = (item: string) => {
        if (selected.includes(item)) {
            onChange(selected.filter((s) => s !== item));
        } else {
            onChange([...selected, item]);
        }
    };

    const accentClasses: Record<string, { bg: string; border: string; text: string; check: string; tag: string; tagText: string; tagX: string }> = {
        emerald: {
            bg: "bg-emerald-50",
            border: "border-emerald-300",
            text: "text-emerald-700",
            check: "data-[state=checked]:bg-emerald-500 border-emerald-400",
            tag: "bg-emerald-100 border-emerald-300",
            tagText: "text-emerald-700",
            tagX: "text-emerald-500 hover:text-emerald-700",
        },
        amber: {
            bg: "bg-amber-50",
            border: "border-amber-300",
            text: "text-amber-700",
            check: "data-[state=checked]:bg-amber-500 border-amber-400",
            tag: "bg-amber-100 border-amber-300",
            tagText: "text-amber-700",
            tagX: "text-amber-500 hover:text-amber-700",
        },
        blue: {
            bg: "bg-blue-50",
            border: "border-blue-300",
            text: "text-blue-700",
            check: "data-[state=checked]:bg-blue-500 border-blue-400",
            tag: "bg-blue-100 border-blue-300",
            tagText: "text-blue-700",
            tagX: "text-blue-500 hover:text-blue-700",
        },
        slate: {
            bg: "bg-slate-50",
            border: "border-slate-300",
            text: "text-slate-700",
            check: "data-[state=checked]:bg-slate-500 border-slate-400",
            tag: "bg-slate-100 border-slate-300",
            tagText: "text-slate-700",
            tagX: "text-slate-500 hover:text-slate-700",
        },
    };

    const ac = accentClasses[accentColor] || accentClasses.emerald;

    return (
        <div ref={ref} className="relative w-full">
            <button
                type="button"
                disabled={disabled}
                onClick={() => setOpen((p) => !p)}
                className={`w-full min-h-[32px] px-3 py-1.5 rounded-[2px] border text-left text-[12px] font-medium bg-white transition-all outline-none flex items-center justify-between gap-2 flex-wrap
                    ${disabled ? "opacity-50 cursor-not-allowed bg-slate-50" : ""}
                    ${error ? "border-red-400" : open ? `border-[#23471d]` : "border-slate-400"} hover:border-[#23471d]`}
            >
                <span className="flex flex-wrap gap-1 flex-1">
                    {selected.length === 0 ? (
                        <span className="text-slate-400">{placeholder}</span>
                    ) : (
                        selected.slice(0, 3).map((s) => (
                            <span
                                key={s}
                                className={`inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full border ${ac.tag} ${ac.tagText}`}
                            >
                                {s}
                                <span
                                    role="button"
                                    onClick={(e) => { e.stopPropagation(); toggle(s); }}
                                    className={`cursor-pointer ${ac.tagX}`}
                                >
                                    <X size={9} />
                                </span>
                            </span>
                        ))
                    )}
                    {selected.length > 3 && (
                        <span className={`inline-flex items-center text-[10px] font-bold px-2 py-0.5 rounded-full border ${ac.tag} ${ac.tagText}`}>
                            +{selected.length - 3} more
                        </span>
                    )}
                </span>
                <ChevronDown
                    size={14}
                    className={`shrink-0 text-slate-400 transition-transform ${open ? "rotate-180" : ""}`}
                />
            </button>

            {open && (
                <div className="absolute z-50 top-full left-0 right-0 mt-1 bg-white border border-slate-200 rounded-lg shadow-xl max-h-[220px] overflow-y-auto custom-scrollbar">
                    {options.length === 0 ? (
                        <p className="text-[11px] text-slate-400 text-center py-3">No options available</p>
                    ) : (
                        options.map((opt) => {
                            const isChecked = selected.includes(opt);
                            return (
                                <label
                                    key={opt}
                                    className={`flex items-center gap-2.5 px-3 py-2 cursor-pointer text-[12px] font-medium transition-colors
                                        ${isChecked ? `${ac.bg} ${ac.text}` : "text-slate-700 hover:bg-slate-50"}`}
                                >
                                    <Checkbox
                                        checked={isChecked}
                                        onCheckedChange={() => toggle(opt)}
                                        className={`h-3.5 w-3.5 shrink-0 ${ac.check}`}
                                    />
                                    {opt}
                                </label>
                            );
                        })
                    )}
                </div>
            )}
        </div>
    );
};

const loadRazorpayScript = () => {
    return new Promise((resolve) => {
        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.onload = () => resolve(true);
        script.onerror = () => resolve(false);
        document.body.appendChild(script);
    });
};

const InternationalBuyerRegistration = () => {
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
    const [emailResendTimer, setEmailResendTimer] = useState(0);
    const [mobileResendTimer, setMobileResendTimer] = useState(0);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [loadingLocations, setLoadingLocations] = useState({ states: false, cities: false });
    const [newSocialLink, setNewSocialLink] = useState("");

    const [showTermsModal, setShowTermsModal] = useState(false);
    const [showPaymentConfirmModal, setShowPaymentConfirmModal] = useState(false);
    const [tempSelectedPackage, setTempSelectedPackage] = useState<any>(null);
    const [activePolicyTab, setActivePolicyTab] = useState<'info' | 'payment' | 'refund' | 'privacy' | 'rules'>('info');
    const [policyConsents, setPolicyConsents] = useState({
        infoAccurate: false,
        paymentTerms: false,
        refundPolicy: false,
        privacyPolicy: false,
        participationRules: false
    });

    const [policiesData, setPoliciesData] = useState<Record<string, any>>({});
    const [showMembershipOptions, setShowMembershipOptions] = useState(false);

    const membershipPackages = useMemo(() => config?.packages?.filter((p: any) => p.category === 'Membership') || [], [config]);
    const passPackages = useMemo(() => config?.packages?.filter((p: any) => p.category === 'Pass') || [], [config]);

    const initialFormState = {
        brandName: "",
        legalEntityType: "",
        countryOfRegistration: "",
        registrationStatus: "Other Country",
        yearOfEstablishment: "",
        registrationNumber: "",
        taxRegistrationNumber: "",
        importExportCode: "",
        businessLicenseNumber: "",
        natureOfBusiness: [] as string[],
        address: "",
        city: "",
        stateProvince: "",
        country: "",
        postalCode: "",
        website: "",
        linkedInPage: "",
        socialMediaLinks: [] as string[],
        primaryContact: {
            fullName: "",
            designation: "",
            mobileNumber: "",
            whatsappNumber: "",
            emailId: ""
        },
        secondaryContact: {
            fullName: "",
            designation: "",
            contactNumber: "",
            emailId: ""
        },
        productCategories: [] as string[],
        stallRequirement: {
            preferredStallType: "",
            stallSize: "",
            cornerStallRequired: "No",
            preferredHallNumber: "",
            preferredStallLocation: "",
            countryPavilionParticipation: "No"
        },
        sponsorship: {
            interested: "No",
            preferredType: ""
        },
        businessProfile: {
            companyProfileShort: "",
            keyProductsServices: "",
            exportCountries: "",
            existingMajorClients: "",
            certifications: [] as string[]
        },
        b2bInterest: {
            interested: "No",
            lookingFor: [] as string[]
        },
        travelSupport: {
            visaInvitation: "No",
            hotelBooking: "No",
            airportPickup: "No",
            translatorSupport: "No",
            arrivalDate: "",
            departureDate: ""
        },
        billingDetails: {
            billingName: "",
            billingAddress: "",
            accountsContactPerson: "",
            accountsEmail: "",
            accountsMobileNumber: "",
            invoiceRequired: "No",
            paymentMode: "Online Payment Gateway",
            bookingAmountPaid: "",
            utrTransactionId: ""
        },
        declarations: {
            infoAccurate: false,
            agreeTerms: false,
            acceptCancellationPolicy: false,
            acceptPrivacyPolicy: false,
            agreeParticipationRules: false,
            digitalSignature: ""
        },
        vipProgram: {
            interested: "No"
        },
        registrationCategory: "",
        registrationFee: "₹0",
        transactionId: ""
    };

    const [formData, setFormData] = useState(initialFormState);
    const [files, setFiles] = useState<Record<string, File | null>>({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [hData, cRes, configRes, payment, refund, privacy, rules] = await Promise.all([
                    heroBackgroundApi.getByPage("Registration / International Buyer Registration"),
                    crmApi.getCountries(),
                    internationalBuyerApi.getConfig(),
                    policyApi.getByPage('terms-of-service'),
                    policyApi.getByPage('refund-policy'),
                    policyApi.getByPage('privacy-policy'),
                    policyApi.getByPage('international-participation-rules')
                ]);
                if (hData) setHeroData(hData);
                if (cRes) setCountries(cRes);
                if (configRes?.success) setConfig(configRes.data);
                setPoliciesData({
                    'payment': payment,
                    'refund': refund,
                    'privacy': privacy,
                    'rules': rules || { content: "<h3>International Participation Rules</h3><p>By participating in the 9th IHWE 2026, international exhibitors and buyers agree to comply with all local laws, export/import regulations, and event-specific guidelines provided by the International Council of AYUSH (ICOA).</p>" }
                });
            } catch (err) { console.error("Error fetching data:", err); }
        };
        fetchData();
    }, []);

    useEffect(() => {
        const fetchStates = async () => {
            if (!formData.country) return;
            const selectedCountry = countries.find(c => c.name === formData.country);
            if (selectedCountry) {
                setLoadingLocations(prev => ({ ...prev, states: true }));
                try { setStates(await crmApi.getStates(selectedCountry.countryCode)); }
                catch (err) { console.error(err); }
                finally { setLoadingLocations(prev => ({ ...prev, states: false })); }
            }
        };
        fetchStates();
    }, [formData.country, countries]);

    useEffect(() => {
        const fetchCities = async () => {
            if (!formData.stateProvince) return;
            const selectedState = states.find(s => s.name === formData.stateProvince);
            if (selectedState) {
                setLoadingLocations(prev => ({ ...prev, cities: true }));
                try { setCities(await crmApi.getCities(selectedState.stateCode)); }
                catch (err) { console.error(err); }
                finally { setLoadingLocations(prev => ({ ...prev, cities: false })); }
            }
        };
        fetchCities();
    }, [formData.stateProvince, states]);

    useEffect(() => {
        let eTimer: any;
        if (emailResendTimer > 0) eTimer = setInterval(() => setEmailResendTimer(p => p - 1), 1000);
        return () => clearInterval(eTimer);
    }, [emailResendTimer]);

    useEffect(() => {
        let mTimer: any;
        if (mobileResendTimer > 0) mTimer = setInterval(() => setMobileResendTimer(p => p - 1), 1000);
        return () => clearInterval(mTimer);
    }, [mobileResendTimer]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        if (name.includes('.')) {
            const [parent, child] = name.split('.');
            setFormData(prev => ({ ...prev, [parent]: { ...(prev[parent as keyof typeof prev] as any), [child]: value } }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleAddSocialLink = () => {
        if (newSocialLink.trim()) {
            const links = Array.isArray(formData.socialMediaLinks) ? formData.socialMediaLinks : [];
            setFormData(prev => ({ ...prev, socialMediaLinks: [...links, newSocialLink.trim()] }));
            setNewSocialLink("");
        }
    };
    const handleRemoveSocialLink = (index: number) => {
        const links = Array.isArray(formData.socialMediaLinks) ? [...formData.socialMediaLinks] : [];
        links.splice(index, 1);
        setFormData(prev => ({ ...prev, socialMediaLinks: links }));
    };

    const handleSelectChange = (name: string, value: string) => {
        if (name.includes('.')) {
            const [parent, child] = name.split('.');
            setFormData(prev => ({ ...prev, [parent]: { ...(prev[parent as keyof typeof prev] as any), [child]: value } }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleMultiSelectChange = (name: string, value: string[]) => {
        if (name.includes('.')) {
            const [parent, child] = name.split('.');
            setFormData(prev => ({ ...prev, [parent]: { ...(prev[parent as keyof typeof prev] as any), [child]: value } }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, files: selectedFiles } = e.target;
        if (selectedFiles && selectedFiles[0]) setFiles(prev => ({ ...prev, [name]: selectedFiles[0] }));
    };

    const requestOtp = async (type: 'email' | 'mobile') => {
        const identifier = type === 'email' ? formData.primaryContact.emailId : formData.primaryContact.mobileNumber;
        if (!identifier) { toast.error(`Please enter a valid ${type} first.`); return; }
        setIsVerifying(prev => ({ ...prev, [type]: true }));
        try {
            const res = await otpApi.request(identifier, type === 'email' ? 'email' : 'phone', formData.primaryContact.fullName);
            if (res.success) {
                toast.success(`OTP sent to your ${type}.`);
                if (type === 'email') { setEmailOtpSent(true); setEmailResendTimer(60); }
                else { setMobileOtpSent(true); setMobileResendTimer(60); }
            } else { toast.error(res.message || "Failed to send OTP."); }
        } catch (err) { toast.error("Connection error."); }
        finally { setIsVerifying(prev => ({ ...prev, [type]: false })); }
    };

    const verifyOtp = async (type: 'email' | 'mobile') => {
        const identifier = type === 'email' ? formData.primaryContact.emailId : formData.primaryContact.mobileNumber;
        const otp = type === 'email' ? emailOtpValue : mobileOtpValue;
        if (!otp) { toast.error("Please enter the OTP."); return; }
        setIsVerifying(prev => ({ ...prev, [type]: true }));
        try {
            const res = await otpApi.verify(identifier, otp, type === 'email' ? 'email' : 'phone');
            if (res.success) {
                toast.success(`${type} verified!`);
                type === 'email' ? setEmailOtpVerified(true) : setMobileOtpVerified(true);
            } else { toast.error("Invalid OTP."); }
        } catch (err) { toast.error("Verification failed."); }
        finally { setIsVerifying(prev => ({ ...prev, [type]: false })); }
    };

    const handlePackageSelection = (pkg: any) => {
        if (!emailOtpVerified || !mobileOtpVerified) { toast.error("Please verify Email and Mobile OTP first."); return; }
        setTempSelectedPackage(pkg);
        setPolicyConsents({ infoAccurate: false, paymentTerms: false, refundPolicy: false, privacyPolicy: false, participationRules: false });
        setActivePolicyTab('info');
        setShowTermsModal(true);
    };

    const initiateRazorpayPayment = async () => {
        const razorpayLoaded = await loadRazorpayScript();
        if (!razorpayLoaded) { toast.error("Failed to load payment gateway."); return; }
        const gatewayPrice = Math.round(tempSelectedPackage.price * 1.025);
        const options = {
            key: import.meta.env.VITE_RAZORPAY_KEY_ID || "",
            amount: gatewayPrice * 100,
            currency: "INR",
            name: "IHWE 2026",
            description: `${tempSelectedPackage.name} Registration`,
            handler: async (response: any) => {
                setFormData(prev => ({ ...prev, registrationCategory: tempSelectedPackage.name, registrationFee: `₹${tempSelectedPackage.price}`, transactionId: response.razorpay_payment_id }));
                setShowTermsModal(false); setShowPaymentConfirmModal(false);
                await submitFinal(response.razorpay_payment_id);
            },
            prefill: { name: formData.primaryContact.fullName, email: formData.primaryContact.emailId, contact: formData.primaryContact.mobileNumber },
            theme: { color: "#23471d" }
        };
        const razorpay = new (window as any).Razorpay(options);
        razorpay.open();
    };

    const submitFinal = async (transactionId: string) => {
        setIsSubmitting(true);
        try {
            const finalFormData = new FormData();
            Object.keys(formData).forEach(key => {
                const val = formData[key as keyof typeof formData];
                if (typeof val === 'object' && val !== null) finalFormData.append(key, JSON.stringify(val));
                else finalFormData.append(key, String(val));
            });
            Object.keys(files).forEach(key => { if (files[key]) finalFormData.append(key, files[key] as File); });
            if (transactionId) finalFormData.append('transactionId', transactionId);
            const res = await internationalBuyerApi.submit(finalFormData);
            if (res.success) { setSubmitted(true); window.scrollTo({ top: 0, behavior: "smooth" }); }
            else toast.error(res.message || "Submission failed.");
        } catch (error) { toast.error("Submission error."); }
        finally { setIsSubmitting(false); }
    };

    const inputClasses = "w-full h-8 px-3 py-2 rounded-[2px] border border-slate-400 bg-white text-left text-[12px] font-medium text-slate-900 outline-none shadow-none transition-all ring-offset-background focus:border-[#23471d] focus:ring-[#23471d]/10 placeholder:text-slate-400 font-sans";
    const labelClasses = "text-[12px] font-semibold text-slate-900 mb-0.5 block text-left font-sans ";
    const sectionTitleClasses = "text-[13px] font-black text-[#23471d] pb-1 border-b border-emerald-500/20 flex items-center gap-1.5 mb-3 uppercase tracking-tight font-sans";

    return (
        <div className="min-h-screen bg-[#FDFDFD] font-sans">
            <section className="hero-background-registration" style={{ backgroundImage: `url(${heroData?.backgroundImage ? `${SERVER_URL}${heroData.backgroundImage}` : HeroBg})` }}>
                <div className="absolute inset-0 bg-black/45" />
                <div className="container mx-auto px-4 text-center text-white relative z-10">
                    <p className="text-sm uppercase tracking-[0.4em] mb-4 opacity-80">{heroData?.title || "International Registration"}</p>
                    <h1 className="text-4xl md:text-6xl font-serif font-semibold mb-6 italic tracking-tight">{heroData?.heading || "International Buyer Registration"}</h1>
                    <p className="w-1/2 text-lg flex align-text-center font-normal justify-center mx-auto mb-4 opacity-80">{heroData?.shortDescription || "International Buyer Registration"}</p>
                </div>
            </section>

            <section className="py-8 relative bg-[#F8FAFC]">
                <div className="container mx-auto px-4 max-w-[1400px]">
                    <AnimatePresence mode="wait">
                        {submitted ? (
                            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="bg-white border border-slate-200 p-12 flex flex-col items-center text-center space-y-5 shadow-2xl rounded-xl">
                                <CheckCircle size={48} className="text-emerald-500" />
                                <h2 className="text-2xl font-bold">Registration Successful!</h2>
                                <Link to="/"><Button className="rounded-full bg-[#23471d]">Return Home</Button></Link>
                            </motion.div>
                        ) : (
                            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="bg-white border border-slate-200 shadow-xl rounded-lg overflow-hidden">
                                <div className="bg-[#23471d] px-5 py-3 text-white flex justify-between items-center">
                                    <div>
                                        <h2 className="text-base font-bold uppercase tracking-wider font-sans">International Buyer Registration</h2>
                                        <p className="text-[9px] text-emerald-300 uppercase tracking-[0.3em] font-medium font-sans">9th Edition of International Health & Wellness Expo 2026 (IHWE Global Edition)</p>
                                    </div>
                                    <ShieldCheck className="text-emerald-400 opacity-50" size={24} />
                                </div>

                                <form className="p-5 space-y-8">

                                    {/* Section 1: Company Information */}
                                    <div className="space-y-4">
                                        <h3 className={sectionTitleClasses}>Section 1 – Company Information</h3>
                                        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
                                            <div><Label className={labelClasses}>Company / Brand Name *</Label><Input name="brandName" value={formData.brandName} onChange={handleInputChange} className={inputClasses} placeholder="Enter brand name" /></div>
                                            <div>
                                                <Label className={labelClasses}>Legal Entity Type *</Label>
                                                <Select value={formData.legalEntityType} onValueChange={v => handleSelectChange('legalEntityType', v)}>
                                                    <SelectTrigger className={inputClasses}><SelectValue placeholder="Select type" /></SelectTrigger>
                                                    <SelectContent className="bg-white">{(config?.companyTypes || ['Private Limited', 'Public Limited', 'LLC', 'LLP', 'Partnership', 'Proprietorship', 'Government Organization', 'Trade Association', 'Embassy / Delegation', 'Other']).map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}</SelectContent>
                                                </Select>
                                            </div>
                                            <div><Label className={labelClasses}>Country of Registration *</Label><Input name="countryOfRegistration" value={formData.countryOfRegistration} onChange={handleInputChange} className={inputClasses} placeholder="Country name" /></div>
                                            <div><Label className={labelClasses}>Year of Establishment</Label><Input name="yearOfEstablishment" value={formData.yearOfEstablishment} onChange={handleInputChange} className={inputClasses} placeholder="YYYY" /></div>
                                            <div><Label className={labelClasses}>Company Registration Number</Label><Input name="registrationNumber" value={formData.registrationNumber} onChange={handleInputChange} className={inputClasses} placeholder="Reg number" /></div>
                                            <div><Label className={labelClasses}>VAT / GST / Tax ID</Label><Input name="taxRegistrationNumber" value={formData.taxRegistrationNumber} onChange={handleInputChange} className={inputClasses} placeholder="Tax ID" /></div>
                                            <div><Label className={labelClasses}>Import Export Code (IEC)</Label><Input name="importExportCode" value={formData.importExportCode} onChange={handleInputChange} className={inputClasses} placeholder="IEC Code" /></div>
                                            <div><Label className={labelClasses}>Business License Number</Label><Input name="businessLicenseNumber" value={formData.businessLicenseNumber} onChange={handleInputChange} className={inputClasses} placeholder="License number" /></div>
                                            <div className="lg:col-span-2"><Label className={labelClasses}>Nature of Business *</Label><MultiSelectDropdown options={config?.supplierTypes || ['Manufacturer', 'Exporter', 'Importer', 'Distributor', 'Wholesaler', 'Service Provider', 'Government Body', 'Startup', 'Franchise Brand', 'Medical Institution', 'Hospital Group', 'AYUSH Organization']} selected={formData.natureOfBusiness} onChange={val => handleMultiSelectChange('natureOfBusiness', val)} placeholder="Select business nature" /></div>
                                        </div>
                                    </div>

                                    {/* Section 2: Registered Office Details */}
                                    <div className="space-y-4">
                                        <h3 className={sectionTitleClasses}>Section 2 – Registered Office Details</h3>
                                        <div className="grid grid-cols-1 md:grid-cols-5 lg:grid-cols-5 gap-4">
                                            <div><Label className={labelClasses}>Full Registered Address *</Label><Input name="address" value={formData.address} onChange={handleInputChange} className={inputClasses} placeholder="Full address" /></div>
                                            <div><Label className={labelClasses}>Country *</Label><Select value={formData.country} onValueChange={v => handleSelectChange('country', v)}><SelectTrigger className={inputClasses}><SelectValue placeholder="Select Country" /></SelectTrigger><SelectContent className="bg-white max-h-[200px]">{countries.map(c => <SelectItem key={c._id} value={c.name}>{c.name}</SelectItem>)}</SelectContent></Select></div>
                                            <div><Label className={labelClasses}>State / Province</Label><Select value={formData.stateProvince} onValueChange={v => handleSelectChange('stateProvince', v)} disabled={!formData.country}><SelectTrigger className={inputClasses}><SelectValue placeholder="Select State" /></SelectTrigger><SelectContent className="bg-white max-h-[200px]">{states.map(s => <SelectItem key={s._id} value={s.name}>{s.name}</SelectItem>)}</SelectContent></Select></div>
                                            <div><Label className={labelClasses}>City</Label><Select value={formData.city} onValueChange={v => handleSelectChange('city', v)} disabled={!formData.stateProvince}><SelectTrigger className={inputClasses}><SelectValue placeholder="Select City" /></SelectTrigger><SelectContent className="bg-white max-h-[200px]">{cities.map(c => <SelectItem key={c._id} value={c.name}>{c.name}</SelectItem>)}</SelectContent></Select></div>
                                            <div><Label className={labelClasses}>Postal Code</Label><Input name="postalCode" value={formData.postalCode} onChange={handleInputChange} className={inputClasses} placeholder="PIN/Postal" /></div>
                                            <div><Label className={labelClasses}>Company Website</Label><Input name="website" value={formData.website} onChange={handleInputChange} className={inputClasses} placeholder="https://..." /></div>
                                            <div><Label className={labelClasses}>LinkedIn Company Page</Label><Input name="linkedInPage" value={formData.linkedInPage} onChange={handleInputChange} className={inputClasses} placeholder="https://linkedin.com/company/..." /></div>
                                            <div>
                                                <Label className={labelClasses}>Social Media Links</Label>
                                                <div className="flex gap-2">
                                                    <Input
                                                        value={newSocialLink}
                                                        onChange={(e) => setNewSocialLink(e.target.value)}
                                                        className={inputClasses}
                                                        placeholder="Instagram, Facebook, Twitter links..."
                                                        onKeyDown={(e) => {
                                                            if (e.key === 'Enter') {
                                                                e.preventDefault();
                                                                handleAddSocialLink();
                                                            }
                                                        }}
                                                    />
                                                    <Button type="button" onClick={handleAddSocialLink} className="bg-[#23471d] text-xs h-8 px-3 shrink-0">Add</Button>
                                                </div>
                                                {Array.isArray(formData.socialMediaLinks) && formData.socialMediaLinks.length > 0 && (
                                                    <div className="flex flex-wrap gap-2 mt-2">
                                                        {formData.socialMediaLinks.map((link: string, idx: number) => (
                                                            <span key={idx} className="bg-slate-100 text-slate-700 px-2 py-1 text-[10px] rounded flex items-center gap-1 border border-slate-200">
                                                                <a href={link} target="_blank" rel="noopener noreferrer" className="truncate max-w-[150px]">{link}</a>
                                                                <button type="button" onClick={() => handleRemoveSocialLink(idx)} className="text-slate-500 hover:text-red-500 ml-1"><X size={10} /></button>
                                                            </span>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>


                                    <div className="space-y-4">
                                        <h3 className={sectionTitleClasses}>Section 3 – Primary Contact Person</h3>
                                        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
                                            <div><Label className={labelClasses}>Full Name *</Label><Input name="primaryContact.fullName" value={formData.primaryContact.fullName} onChange={handleInputChange} className={inputClasses} placeholder="Full name" /></div>
                                            <div><Label className={labelClasses}>Designation</Label><Input name="primaryContact.designation" value={formData.primaryContact.designation} onChange={handleInputChange} className={inputClasses} placeholder="e.g. CEO, Manager" /></div>
                                            <div><Label className={labelClasses}>WhatsApp Number</Label><Input name="primaryContact.whatsappNumber" value={formData.primaryContact.whatsappNumber} onChange={handleInputChange} className={inputClasses} placeholder="WhatsApp with country code" /></div>
                                            <div className="lg:col-span-2">
                                                <Label className={labelClasses}>Official Email ID *</Label>
                                                <div className="flex gap-2">
                                                    <Input name="primaryContact.emailId" value={formData.primaryContact.emailId} onChange={handleInputChange} className={inputClasses} disabled={emailOtpVerified || emailOtpSent} placeholder="email@example.com" />
                                                    {!emailOtpVerified && !emailOtpSent && <Button type="button" size="sm" onClick={() => requestOtp('email')} className="bg-[#23471d] h-8 text-[10px]">OTP</Button>}
                                                    {emailOtpSent && !emailOtpVerified && <div className="flex gap-1"><Input className="w-16 h-8 text-center text-[10px]" value={emailOtpValue} onChange={e => setEmailOtpValue(e.target.value)} maxLength={6} /><Button type="button" size="sm" onClick={() => verifyOtp('email')} className="bg-[#23471d] h-8 text-[10px]">Verify</Button></div>}
                                                    {emailOtpVerified && <CheckCircle size={16} className="text-emerald-500 self-center" />}
                                                </div>
                                            </div>
                                            <div className="lg:col-span-2">
                                                <Label className={labelClasses}>Mobile Number * (with Country Code) <div className="inline-flex w-32 overflow-hidden align-middle ml-2 items-center h-4 relative"><motion.span initial={{ x: "100%" }} animate={{ x: "-100%" }} transition={{ repeat: Infinity, duration: 4, ease: "linear" }} className="text-red-500 text-[10px] uppercase font-semibold whitespace-nowrap absolute">Our team will contact you</motion.span></div></Label>
                                                <div className="flex gap-2">
                                                    <Input name="primaryContact.mobileNumber" value={formData.primaryContact.mobileNumber} onChange={handleInputChange} className={inputClasses} disabled={mobileOtpVerified || mobileOtpSent} placeholder="+91 9XXXXXXXXX" />
                                                    {!mobileOtpVerified && !mobileOtpSent && <Button type="button" size="sm" onClick={() => requestOtp('mobile')} className="bg-[#23471d] h-8 text-[10px]">OTP</Button>}
                                                    {mobileOtpSent && !mobileOtpVerified && <div className="flex gap-1"><Input className="w-16 h-8 text-center text-[10px]" value={mobileOtpValue} onChange={e => setMobileOtpValue(e.target.value)} maxLength={6} /><Button type="button" size="sm" onClick={() => verifyOtp('mobile')} className="bg-[#23471d] h-8 text-[10px]">Verify</Button></div>}
                                                    {mobileOtpVerified && <CheckCircle size={16} className="text-emerald-500 self-center" />}
                                                </div>
                                            </div>
                                        </div>
                                    </div>


                                    <div className="space-y-4">
                                        <h3 className={sectionTitleClasses}>Section 4 – Secondary Contact Person</h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                            <div><Label className={labelClasses}>Full Name</Label><Input name="secondaryContact.fullName" value={formData.secondaryContact.fullName} onChange={handleInputChange} className={inputClasses} placeholder="Full name" /></div>
                                            <div><Label className={labelClasses}>Designation</Label><Input name="secondaryContact.designation" value={formData.secondaryContact.designation} onChange={handleInputChange} className={inputClasses} placeholder="Designation" /></div>
                                            <div><Label className={labelClasses}>Contact Number</Label><Input name="secondaryContact.contactNumber" value={formData.secondaryContact.contactNumber} onChange={handleInputChange} className={inputClasses} placeholder="Mobile" /></div>
                                            <div><Label className={labelClasses}>Email ID</Label><Input type="email" name="secondaryContact.emailId" value={formData.secondaryContact.emailId} onChange={handleInputChange} className={inputClasses} placeholder="email@example.com" /></div>
                                        </div>
                                    </div>


                                    <div className="space-y-4">
                                        <h3 className={sectionTitleClasses}>Section 5 – Product Category</h3>
                                        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
                                            <div className="lg:col-span-5">
                                                <MultiSelectDropdown options={config?.primaryProductInterests || ['Healthcare Products', 'Medical Equipment', 'Hospital Infrastructure', 'Wellness Products', 'Ayurveda', 'Pharmaceuticals', 'Diagnostics', 'Nutraceuticals', 'Organic Products', 'Beauty & Personal Care', 'Fitness & Rehabilitation', 'Medical Tourism', 'Franchise Opportunities', 'Startups', 'Government Participation', 'International Pavilion']} selected={formData.productCategories} onChange={val => handleMultiSelectChange('productCategories', val)} placeholder="Select interest categories" />
                                            </div>
                                        </div>
                                    </div>


                                    <div className="space-y-4">
                                        <h3 className={sectionTitleClasses}>Section 6 – Stall Requirement</h3>
                                        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
                                            <div>
                                                <Label className={labelClasses}>Preferred Stall Type</Label>
                                                <Select value={formData.stallRequirement.preferredStallType} onValueChange={v => handleSelectChange('stallRequirement.preferredStallType', v)}>
                                                    <SelectTrigger className={inputClasses}><SelectValue placeholder="Select type" /></SelectTrigger>
                                                    <SelectContent className="bg-white">
                                                        {['Shell Scheme', 'Bare Space', 'Premium Pavilion', 'International Pavilion', 'Country Pavilion', 'Startup Pavilion'].map(o => <SelectItem key={o} value={o}>{o}</SelectItem>)}
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                            <div>
                                                <Label className={labelClasses}>Stall Size Requirement</Label>
                                                <Select value={formData.stallRequirement.stallSize} onValueChange={v => handleSelectChange('stallRequirement.stallSize', v)}>
                                                    <SelectTrigger className={inputClasses}><SelectValue placeholder="Select size" /></SelectTrigger>
                                                    <SelectContent className="bg-white">
                                                        {['9 sqm', '18 sqm', '27 sqm', '36 sqm', '54 sqm', 'Custom Size'].map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                            <div>
                                                <Label className={labelClasses}>Corner Stall Required?</Label>
                                                <Select value={formData.stallRequirement.cornerStallRequired} onValueChange={v => handleSelectChange('stallRequirement.cornerStallRequired', v)}>
                                                    <SelectTrigger className={inputClasses}><SelectValue placeholder="No" /></SelectTrigger>
                                                    <SelectContent className="bg-white"><SelectItem value="Yes">Yes</SelectItem><SelectItem value="No">No</SelectItem></SelectContent>
                                                </Select>
                                            </div>

                                            <div>
                                                <Label className={labelClasses}>Preferred Stall Location</Label>
                                                <Select value={formData.stallRequirement.preferredStallLocation} onValueChange={v => handleSelectChange('stallRequirement.preferredStallLocation', v)}>
                                                    <SelectTrigger className={inputClasses}><SelectValue placeholder="Select..." /></SelectTrigger>
                                                    <SelectContent className="bg-white">
                                                        <SelectItem value="One Side Open">One Side Open</SelectItem>
                                                        <SelectItem value="Two Side Open">Two Side Open</SelectItem>
                                                        <SelectItem value="Three Side Open">Three Side Open</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                            <div>
                                                <Label className={labelClasses}>Country Pavilion Participation</Label>
                                                <Select value={formData.stallRequirement.countryPavilionParticipation} onValueChange={v => handleSelectChange('stallRequirement.countryPavilionParticipation', v)}>
                                                    <SelectTrigger className={inputClasses}><SelectValue placeholder="No" /></SelectTrigger>
                                                    <SelectContent className="bg-white"><SelectItem value="Yes">Yes</SelectItem><SelectItem value="No">No</SelectItem></SelectContent>
                                                </Select>
                                            </div>
                                        </div>
                                    </div>


                                    <div className="space-y-4">
                                        <h3 className={sectionTitleClasses}>Section 7 – Sponsorship Interest</h3>
                                        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
                                            <div>
                                                <Label className={labelClasses}>Interested in Sponsorship?</Label>
                                                <Select value={formData.sponsorship.interested} onValueChange={v => handleSelectChange('sponsorship.interested', v)}>
                                                    <SelectTrigger className={inputClasses}><SelectValue placeholder="No" /></SelectTrigger>
                                                    <SelectContent className="bg-white"><SelectItem value="Yes">Yes</SelectItem><SelectItem value="No">No</SelectItem></SelectContent>
                                                </Select>
                                            </div>
                                            <div>
                                                <Label className={labelClasses}>Preferred Sponsorship Type</Label>
                                                <Select value={formData.sponsorship.preferredType} onValueChange={v => handleSelectChange('sponsorship.preferredType', v)} disabled={formData.sponsorship.interested === 'No'}>
                                                    <SelectTrigger className={inputClasses}><SelectValue placeholder="Select type" /></SelectTrigger>
                                                    <SelectContent className="bg-white">
                                                        {['Title Sponsor', 'Powered By Sponsor', 'Associate Sponsor', 'Session Sponsor', 'Delegate Bag Sponsor', 'Lanyard Sponsor', 'Registration Desk Sponsor', 'Knowledge Session Sponsor', 'International Buyer Lounge Sponsor'].map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Section 8 & 9: Profile & B2B */}
                                    <div className="space-y-4">
                                        <h3 className={sectionTitleClasses}>Section 8 & 9 – Profile & B2B</h3>
                                        <div className="grid grid-cols-1 md:grid-cols-5 lg:grid-cols-5 gap-4">
                                            <div><Label className={labelClasses}>Company Profile (Short)</Label><Input name="businessProfile.companyProfileShort" value={formData.businessProfile.companyProfileShort} onChange={handleInputChange} className={inputClasses} placeholder="Short bio" /></div>
                                            <div><Label className={labelClasses}>Key Products / Services</Label><Input name="businessProfile.keyProductsServices" value={formData.businessProfile.keyProductsServices} onChange={handleInputChange} className={inputClasses} placeholder="Top products" /></div>
                                            <div><Label className={labelClasses}>Export Countries</Label><Input name="businessProfile.exportCountries" value={formData.businessProfile.exportCountries} onChange={handleInputChange} className={inputClasses} placeholder="Countries you export to" /></div>
                                            <div><Label className={labelClasses}>Existing Major Clients</Label><Input name="businessProfile.existingMajorClients" value={formData.businessProfile.existingMajorClients} onChange={handleInputChange} className={inputClasses} placeholder="Key clients" /></div>
                                            <div>
                                                <Label className={labelClasses}>Certifications</Label>
                                                <MultiSelectDropdown
                                                    options={['ISO', 'CE', 'FDA', 'GMP', 'WHO-GMP', 'AYUSH Certified', 'Organic Certification', 'Other']}
                                                    selected={formData.businessProfile.certifications}
                                                    onChange={val => handleMultiSelectChange('businessProfile.certifications', val)}
                                                    placeholder="Select certifications"
                                                />
                                            </div>
                                            <div>
                                                <Label className={labelClasses}>Interested in B2B Meetings?</Label>
                                                <Select value={formData.b2bInterest.interested} onValueChange={v => handleSelectChange('b2bInterest.interested', v)}>
                                                    <SelectTrigger className={inputClasses}><SelectValue placeholder="No" /></SelectTrigger>
                                                    <SelectContent className="bg-white"><SelectItem value="Yes">Yes</SelectItem><SelectItem value="No">No</SelectItem></SelectContent>
                                                </Select>
                                            </div>
                                            <div>
                                                <Label className={labelClasses}>Looking For</Label>
                                                <MultiSelectDropdown
                                                    options={["Distributors", "Importers", "Hospital Buyers", "Government Buyers", "Franchise Partners", "Investors", "OEM Partners", "Strategic Collaborations"]}
                                                    selected={formData.b2bInterest.lookingFor}
                                                    onChange={val => handleMultiSelectChange('b2bInterest.lookingFor', val)}
                                                    placeholder="Select interests..."
                                                    disabled={formData.b2bInterest.interested === 'No'}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Section 10: Travel Support */}
                                    <div className="space-y-4">
                                        <h3 className={sectionTitleClasses}>Section 10 – Travel Support</h3>
                                        <div className="grid grid-cols-1 md:grid-cols-5 lg:grid-cols-5 gap-4">
                                            <div>
                                                <Label className={labelClasses}>Visa Letter Required?</Label>
                                                <Select value={formData.travelSupport.visaInvitation} onValueChange={v => handleSelectChange('travelSupport.visaInvitation', v)}>
                                                    <SelectTrigger className={inputClasses}><SelectValue placeholder="No" /></SelectTrigger>
                                                    <SelectContent className="bg-white"><SelectItem value="Yes">Yes</SelectItem><SelectItem value="No">No</SelectItem></SelectContent>
                                                </Select>
                                            </div>
                                            <div>
                                                <Label className={labelClasses}>Hotel Booking Support?</Label>
                                                <Select value={formData.travelSupport.hotelBooking} onValueChange={v => handleSelectChange('travelSupport.hotelBooking', v)}>
                                                    <SelectTrigger className={inputClasses}><SelectValue placeholder="No" /></SelectTrigger>
                                                    <SelectContent className="bg-white"><SelectItem value="Yes">Yes</SelectItem><SelectItem value="No">No</SelectItem></SelectContent>
                                                </Select>
                                            </div>
                                            <div>
                                                <Label className={labelClasses}>Airport Pickup?</Label>
                                                <Select value={formData.travelSupport.airportPickup} onValueChange={v => handleSelectChange('travelSupport.airportPickup', v)}>
                                                    <SelectTrigger className={inputClasses}><SelectValue placeholder="No" /></SelectTrigger>
                                                    <SelectContent className="bg-white"><SelectItem value="Yes">Yes</SelectItem><SelectItem value="No">No</SelectItem></SelectContent>
                                                </Select>
                                            </div>
                                            <div>
                                                <Label className={labelClasses}>Translator Support?</Label>
                                                <Select value={formData.travelSupport.translatorSupport} onValueChange={v => handleSelectChange('travelSupport.translatorSupport', v)}>
                                                    <SelectTrigger className={inputClasses}><SelectValue placeholder="No" /></SelectTrigger>
                                                    <SelectContent className="bg-white"><SelectItem value="Yes">Yes</SelectItem><SelectItem value="No">No</SelectItem></SelectContent>
                                                </Select>
                                            </div>
                                            <div><Label className={labelClasses}>Arrival Date</Label><Input type="date" name="travelSupport.arrivalDate" value={formData.travelSupport.arrivalDate} onChange={handleInputChange} className={inputClasses} /></div>
                                            <div><Label className={labelClasses}>Departure Date</Label><Input type="date" name="travelSupport.departureDate" value={formData.travelSupport.departureDate} onChange={handleInputChange} className={inputClasses} /></div>
                                        </div>
                                    </div>

                                    {/* Section 11: Billing & Payment Details */}
                                    <div className="space-y-4">
                                        <h3 className={sectionTitleClasses}>Section 11 – Billing & Payment Details</h3>
                                        <div className="grid grid-cols-1 md:grid-cols-5 lg:grid-cols-5 gap-4">
                                            <div><Label className={labelClasses}>Billing Name</Label><Input name="billingDetails.billingName" value={formData.billingDetails.billingName} onChange={handleInputChange} className={inputClasses} placeholder="Entity name for invoice" /></div>
                                            <div><Label className={labelClasses}>Billing Address</Label><Input name="billingDetails.billingAddress" value={formData.billingDetails.billingAddress} onChange={handleInputChange} className={inputClasses} placeholder="Complete billing address" /></div>
                                            <div><Label className={labelClasses}>Accounts Contact Person</Label><Input name="billingDetails.accountsContactPerson" value={formData.billingDetails.accountsContactPerson} onChange={handleInputChange} className={inputClasses} placeholder="Name" /></div>
                                            <div><Label className={labelClasses}>Accounts Email</Label><Input type="email" name="billingDetails.accountsEmail" value={formData.billingDetails.accountsEmail} onChange={handleInputChange} className={inputClasses} placeholder="email@example.com" /></div>
                                            <div><Label className={labelClasses}>Accounts Mobile Number</Label><Input name="billingDetails.accountsMobileNumber" value={formData.billingDetails.accountsMobileNumber} onChange={handleInputChange} className={inputClasses} placeholder="Mobile" /></div>
                                            <div>
                                                <Label className={labelClasses}>Invoice Required?</Label>
                                                <Select value={formData.billingDetails.invoiceRequired} onValueChange={v => handleSelectChange('billingDetails.invoiceRequired', v)}>
                                                    <SelectTrigger className={inputClasses}><SelectValue placeholder="No" /></SelectTrigger>
                                                    <SelectContent className="bg-white"><SelectItem value="Yes">Yes</SelectItem><SelectItem value="No">No</SelectItem></SelectContent>
                                                </Select>
                                            </div>
                                            <div>
                                                <Label className={labelClasses}>Payment Mode</Label>
                                                <Select value={formData.billingDetails.paymentMode} onValueChange={v => handleSelectChange('billingDetails.paymentMode', v)}>
                                                    <SelectTrigger className={inputClasses}><SelectValue placeholder="Select Mode" /></SelectTrigger>
                                                    <SelectContent className="bg-white">
                                                        <SelectItem value="Bank Transfer">Bank Transfer</SelectItem>
                                                        <SelectItem value="International Wire Transfer">International Wire Transfer</SelectItem>
                                                        <SelectItem value="Credit Card">Credit Card</SelectItem>
                                                        <SelectItem value="Online Payment Gateway">Online Payment Gateway</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                            <div><Label className={labelClasses}>Booking Amount Paid</Label><Input name="billingDetails.bookingAmountPaid" value={formData.billingDetails.bookingAmountPaid} onChange={handleInputChange} className={inputClasses} placeholder="e.g. ₹25000" /></div>
                                            <div className="lg:col-span-2"><Label className={labelClasses}>UTR / Transaction ID</Label><Input name="billingDetails.utrTransactionId" value={formData.billingDetails.utrTransactionId} onChange={handleInputChange} className={inputClasses} placeholder="Transaction reference" /></div>
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <h3 className={sectionTitleClasses}>Section 12 – Document Upload</h3>
                                        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
                                            {[
                                                { label: 'Company Registration', name: 'companyRegistrationCertificate' },
                                                { label: 'Tax Registration', name: 'taxRegistrationCertificate' },
                                                { label: 'Passport Copy', name: 'passportCopy' },
                                                { label: 'Product Catalogue', name: 'productCatalogue' },
                                                { label: 'Company Brochure', name: 'companyBrochure' },
                                                { label: 'Logo (High Res)', name: 'logo' },
                                                { label: 'Visiting Card', name: 'visitingCard' },
                                                { label: 'Product Certs', name: 'productCertifications' },
                                                { label: 'Previous Proof', name: 'previousParticipationProof' }
                                            ].map(doc => (
                                                <div key={doc.name} className="p-3 border border-dashed border-slate-300 rounded-md bg-slate-50 flex flex-col gap-2">
                                                    <Label className="text-[11px] font-bold">{doc.label}</Label>
                                                    <div className="flex items-center gap-2">
                                                        <Input type="file" name={doc.name} onChange={handleFileChange} className="hidden" id={`file-${doc.name}`} />
                                                        <label htmlFor={`file-${doc.name}`} className="flex-1 flex items-center gap-2 px-3 py-1.5 bg-white border border-slate-300 rounded cursor-pointer hover:bg-slate-50 transition-colors">
                                                            <Upload size={14} className="text-[#23471d]" />
                                                            <span className="text-[10px] text-slate-500 truncate">{files[doc.name]?.name || "Upload"}</span>
                                                        </label>
                                                        {files[doc.name] && <CheckCircle size={14} className="text-emerald-500" />}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>


                                    <div id="package-section" className="space-y-4 pt-4 border-t border-slate-100">
                                        <h3 className={sectionTitleClasses}> Registration Category 🔹</h3>
                                        <div className="relative">
                                            {!showMembershipOptions ? (
                                                <div className="space-y-4">
                                                    <div className="flex items-center gap-2 px-2">
                                                        <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
                                                        <p className="text-[11px] font-black text-slate-600 uppercase tracking-[0.2em]">Available Registration Passes</p>
                                                    </div>

                                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-stretch">
                                                        {passPackages.map((pkg: any) => {
                                                            const isSelected = formData.registrationCategory === pkg.name;
                                                            const colorMap: Record<string, any> = {
                                                                blue: { border: 'border-blue-400 bg-blue-50/10', accent: 'text-blue-700', badge: 'bg-emerald-500' },
                                                                yellow: { border: 'border-amber-400 bg-amber-50/10', accent: 'text-amber-700', badge: 'bg-amber-400' },
                                                                green: { border: 'border-emerald-400 bg-emerald-50/10', accent: 'text-emerald-700', badge: 'bg-emerald-500' },
                                                                red: { border: 'border-red-400 bg-red-50/10', accent: 'text-red-700', badge: 'bg-red-500' }
                                                            };
                                                            const theme = colorMap[pkg.color] || colorMap.blue;

                                                            return (
                                                                <div
                                                                    key={pkg.name}
                                                                    onClick={() => handlePackageSelection(pkg)}
                                                                    className={`relative p-5 border-2 transition-all cursor-pointer rounded-xl flex flex-col h-full group 
                                                                        ${isSelected ? `border-[#23471d] bg-white shadow-2xl ring-4 ring-emerald-100 scale-[1.02] z-10` : `border-slate-200 bg-white hover:border-emerald-300 hover:shadow-lg`}
                                                                    `}
                                                                >
                                                                    {pkg.badge && (
                                                                        <div className={`absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest shadow-sm z-20 text-white ${theme.badge}`}>
                                                                            ⭐ {pkg.badge}
                                                                        </div>
                                                                    )}

                                                                    <div className="mb-3">
                                                                        <h4 className="text-[15px] font-black leading-tight text-slate-800 group-hover:text-[#23471d] transition-colors">
                                                                            {pkg.name} – ₹{pkg.price}
                                                                        </h4>
                                                                        {pkg.tagline && (
                                                                            <p className={`text-[10px] font-bold uppercase tracking-tight mt-1 ${theme.accent}`}>
                                                                                {pkg.tagline}
                                                                            </p>
                                                                        )}
                                                                    </div>

                                                                    <div className="flex-1 space-y-4">
                                                                        {pkg.description && (
                                                                            <p className="text-[11px] text-slate-500 leading-relaxed italic border-l-2 border-slate-200 pl-2">
                                                                                {pkg.description}
                                                                            </p>
                                                                        )}

                                                                        {pkg.benefits && pkg.benefits.length > 0 && (
                                                                            <div className="space-y-1.5">
                                                                                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">What You Get:</p>
                                                                                <ul className="text-[11px] text-slate-700 space-y-1.5 font-medium">
                                                                                    {pkg.benefits.map((b: string, i: number) => (
                                                                                        <li key={i} className="flex items-start gap-2">
                                                                                            <CheckCircle size={12} className="text-emerald-500 mt-0.5 shrink-0" />
                                                                                            <span>{b}</span>
                                                                                        </li>
                                                                                    ))}
                                                                                </ul>
                                                                            </div>
                                                                        )}

                                                                        {pkg.whyChoose && (
                                                                            <div className={`p-2 rounded-lg ${theme.border} border`}>
                                                                                <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1">Why Choose This:</p>
                                                                                <p className="text-[10px] text-slate-700 font-semibold leading-snug">
                                                                                    {pkg.whyChoose}
                                                                                </p>
                                                                            </div>
                                                                        )}
                                                                    </div>

                                                                    <div className={`mt-4 w-full py-2.5 rounded-lg text-center text-[11px] font-black uppercase tracking-widest transition-all 
                                                                        ${isSelected ? 'bg-[#23471d] text-white shadow-lg' : 'bg-slate-50 text-slate-400 group-hover:bg-emerald-600 group-hover:text-white'}
                                                                    `}>
                                                                        {pkg.cta || "Select Plan"}
                                                                    </div>
                                                                </div>
                                                            );
                                                        })}

                                                        {membershipPackages.length > 0 && (
                                                            <div
                                                                onClick={() => setShowMembershipOptions(true)}
                                                                className={`relative p-3 border-2 border-dashed border-emerald-300 bg-emerald-50/20 transition-all rounded-xl flex flex-col justify-center items-center text-center cursor-pointer hover:border-emerald-500 hover:bg-emerald-50/40`}
                                                            >
                                                                <h4 className="text-[14px] font-black text-emerald-800 mb-1">Membership Options</h4>
                                                                <div className={`text-[11px] text-emerald-500 font-bold uppercase mt-2 px-4 py-1.5 border border-emerald-200 rounded-full bg-white shadow-sm`}>
                                                                    View More Plans →
                                                                </div>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className="space-y-4">
                                                    <div className="flex justify-between items-center px-2">
                                                        <p className="text-[11px] font-black text-slate-600 uppercase tracking-[0.2em]">Membership Plans (via ICOA)</p>
                                                        <Button onClick={() => setShowMembershipOptions(false)} variant="ghost" className="h-8 text-[11px] font-bold text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50">← Back to Passes</Button>
                                                    </div>
                                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                                        {membershipPackages.map((pkg: any) => {
                                                            const isSelected = formData.registrationCategory === pkg.name;
                                                            const colorMap: Record<string, any> = {
                                                                blue: { border: 'border-blue-400 bg-blue-50/10', accent: 'text-blue-700', badge: 'bg-emerald-500' },
                                                                yellow: { border: 'border-amber-400 bg-amber-50/10', accent: 'text-amber-700', badge: 'bg-amber-400' },
                                                                green: { border: 'border-emerald-400 bg-emerald-50/10', accent: 'text-emerald-700', badge: 'bg-emerald-500' },
                                                                red: { border: 'border-red-400 bg-red-50/10', accent: 'text-red-700', badge: 'bg-red-500' }
                                                            };
                                                            const theme = colorMap[pkg.color] || colorMap.blue;

                                                            return (
                                                                <div
                                                                    key={pkg.name}
                                                                    onClick={() => handlePackageSelection(pkg)}
                                                                    className={`relative p-5 border-2 transition-all cursor-pointer rounded-xl flex flex-col group
                                                                        ${isSelected ? `border-[#23471d] bg-white shadow-2xl ring-4 ring-emerald-100 scale-[1.02] z-10` : `border-slate-200 bg-white hover:border-emerald-300 hover:shadow-lg`}
                                                                    `}
                                                                >
                                                                    {pkg.badge && (
                                                                        <div className={`absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest shadow-sm z-20 text-white ${theme.badge}`}>
                                                                            ⭐ {pkg.badge}
                                                                        </div>
                                                                    )}

                                                                    <div className="mb-3">
                                                                        <h4 className="text-[15px] font-black leading-tight text-slate-800 group-hover:text-[#23471d] transition-colors">
                                                                            {pkg.name} – ₹{pkg.price}
                                                                        </h4>
                                                                        {pkg.tagline && (
                                                                            <p className={`text-[10px] font-bold uppercase tracking-tight mt-1 ${theme.accent}`}>
                                                                                {pkg.tagline}
                                                                            </p>
                                                                        )}
                                                                    </div>

                                                                    <div className="flex-1 space-y-4">
                                                                        {pkg.description && (
                                                                            <p className="text-[11px] text-slate-500 leading-relaxed italic border-l-2 border-slate-200 pl-2">
                                                                                {pkg.description}
                                                                            </p>
                                                                        )}

                                                                        {pkg.benefits && pkg.benefits.length > 0 && (
                                                                            <div className="space-y-1.5">
                                                                                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">What You Get:</p>
                                                                                <ul className="text-[11px] text-slate-700 space-y-1.5 font-medium">
                                                                                    {pkg.benefits.map((b: string, i: number) => (
                                                                                        <li key={i} className="flex items-start gap-2">
                                                                                            <CheckCircle size={12} className="text-emerald-500 mt-0.5 shrink-0" />
                                                                                            <span>{b}</span>
                                                                                        </li>
                                                                                    ))}
                                                                                </ul>
                                                                            </div>
                                                                        )}

                                                                        {pkg.whyChoose && (
                                                                            <div className={`p-2 rounded-lg ${theme.border} border`}>
                                                                                <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1">Why Choose This:</p>
                                                                                <p className="text-[10px] text-slate-700 font-semibold leading-snug">
                                                                                    {pkg.whyChoose}
                                                                                </p>
                                                                            </div>
                                                                        )}
                                                                    </div>

                                                                    <div className={`mt-4 w-full py-2.5 rounded-lg text-center text-[11px] font-black uppercase tracking-widest transition-all 
                                                                        ${isSelected ? 'bg-[#23471d] text-white shadow-lg' : 'bg-slate-50 text-slate-400 group-hover:bg-emerald-600 group-hover:text-white'}
                                                                    `}>
                                                                        {pkg.cta || "Select Plan"}
                                                                    </div>
                                                                </div>
                                                            );
                                                        })}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </form>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </section >

            {/* Terms Modal with Integrated Declaration */}
            <AnimatePresence>
                {
                    showTermsModal && (
                        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 backdrop-blur-sm bg-black/40">
                            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="bg-white w-full max-w-4xl rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
                                <div className="bg-[#23471d] p-4 text-white flex justify-between items-center">
                                    <div><h3 className="font-bold text-[14px] uppercase tracking-widest">Declaration & Legal Terms</h3><p className="text-[9px] text-emerald-300 uppercase tracking-[0.2em]">{tempSelectedPackage?.name} - ₹{tempSelectedPackage?.price}</p></div>
                                    <button onClick={() => setShowTermsModal(false)}><X size={20} /></button>
                                </div>

                                <div className="flex border-b bg-slate-50 sticky top-0 z-10">
                                    {['info', 'payment', 'refund', 'privacy', 'rules'].map((tab: any) => (
                                        <button key={tab} onClick={() => setActivePolicyTab(tab)} className={`flex-1 px-4 py-2.5 text-[11px] font-black uppercase tracking-wider transition-all flex items-center justify-center gap-2 ${activePolicyTab === tab ? 'bg-white text-[#23471d] border-b-2 border-[#23471d]' : 'text-slate-500 hover:text-[#23471d]'}`}>
                                            {tab === 'info' && <CheckCircle size={14} />}
                                            {tab === 'payment' && <FileText size={14} />}
                                            {tab === 'refund' && <AlertTriangle size={14} />}
                                            {tab === 'privacy' && <Lock size={14} />}
                                            {tab === 'rules' && <Scale size={14} />}
                                            {tab.charAt(0).toUpperCase() + tab.slice(1)}
                                        </button>
                                    ))}
                                </div>

                                <div className="flex-1 overflow-y-auto p-8 space-y-6 custom-scrollbar">
                                    <div className="bg-slate-50 border border-slate-100 rounded-lg p-5 text-[11px] text-slate-600 leading-relaxed font-sans min-h-[300px]">
                                        {activePolicyTab === 'info' && (
                                            <div className="space-y-4">
                                                <h4 className="font-bold text-[#23471d] uppercase tracking-widest">General Declaration</h4>
                                                <p>As an international applicant for the 9th International Health & Wellness Expo 2026, you are required to confirm the accuracy of all submitted documents and information.</p>
                                            </div>
                                        )}
                                        {activePolicyTab !== 'info' && policiesData[activePolicyTab]?.content ? <div dangerouslySetInnerHTML={{ __html: policiesData[activePolicyTab].content }} /> : (activePolicyTab !== 'info' && <div className="flex flex-col items-center justify-center py-12 text-slate-400 gap-4"><Loader2 size={32} className="animate-spin" /><p className="font-bold uppercase tracking-[0.2em]">Fetching details...</p></div>)}
                                    </div>

                                    <div className="p-4 bg-emerald-50/50 border border-emerald-100 rounded-xl">
                                        {activePolicyTab === 'info' && <label className="flex items-start gap-3 cursor-pointer"><Checkbox checked={policyConsents.infoAccurate} onCheckedChange={v => setPolicyConsents(p => ({ ...p, infoAccurate: !!v }))} /><span className="text-[11px] font-bold uppercase">I confirm all submitted information is true and accurate.</span></label>}
                                        {activePolicyTab === 'payment' && <label className="flex items-start gap-3 cursor-pointer"><Checkbox checked={policyConsents.paymentTerms} onCheckedChange={v => setPolicyConsents(p => ({ ...p, paymentTerms: !!v }))} /><span className="text-[11px] font-bold uppercase">I agree to Terms & Conditions</span></label>}
                                        {activePolicyTab === 'refund' && <label className="flex items-start gap-3 cursor-pointer"><Checkbox checked={policyConsents.refundPolicy} onCheckedChange={v => setPolicyConsents(p => ({ ...p, refundPolicy: !!v }))} /><span className="text-[11px] font-bold uppercase">I accept Cancellation & Refund Policy</span></label>}
                                        {activePolicyTab === 'privacy' && <label className="flex items-start gap-3 cursor-pointer"><Checkbox checked={policyConsents.privacyPolicy} onCheckedChange={v => setPolicyConsents(p => ({ ...p, privacyPolicy: !!v }))} /><span className="text-[11px] font-bold uppercase">I accept Privacy Policy</span></label>}
                                        {activePolicyTab === 'rules' && <label className="flex items-start gap-3 cursor-pointer"><Checkbox checked={policyConsents.participationRules} onCheckedChange={v => setPolicyConsents(p => ({ ...p, participationRules: !!v }))} /><span className="text-[11px] font-bold uppercase">I agree to International Participation Rules</span></label>}
                                    </div>
                                </div>

                                <div className="p-6 bg-slate-50 border-t border-slate-100 flex justify-end gap-4">
                                    <Button variant="outline" onClick={() => setShowTermsModal(false)} className="rounded-full px-8 uppercase text-[11px] font-bold">Cancel</Button>
                                    {activePolicyTab !== 'rules' ? (
                                        <Button onClick={() => setActivePolicyTab(activePolicyTab === 'info' ? 'payment' : activePolicyTab === 'payment' ? 'refund' : activePolicyTab === 'refund' ? 'privacy' : 'rules')} disabled={!policyConsents[activePolicyTab === 'info' ? 'infoAccurate' : activePolicyTab === 'payment' ? 'paymentTerms' : activePolicyTab === 'refund' ? 'refundPolicy' : 'privacyPolicy']} className="rounded-full px-12 bg-[#23471d] uppercase text-[11px] font-bold shadow-lg">Next Step →</Button>
                                    ) : (
                                        <Button onClick={() => { setShowTermsModal(false); setShowPaymentConfirmModal(true); }} disabled={!policyConsents.participationRules} className="rounded-full px-12 bg-emerald-600 uppercase text-[11px] font-bold shadow-lg">Proceed to Pay</Button>
                                    )}
                                </div>
                            </motion.div>
                        </div>
                    )
                }
            </AnimatePresence >

            {/* Payment Confirm Modal */}
            <AnimatePresence>
                {
                    showPaymentConfirmModal && tempSelectedPackage && (
                        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 backdrop-blur-md bg-black/60">
                            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="bg-white w-full max-w-md rounded-2xl overflow-hidden shadow-2xl">
                                <div className="bg-[#23471d] p-6 text-white text-center">
                                    <CreditCard size={32} className="mx-auto mb-2" />
                                    <h3 className="text-xl font-bold uppercase tracking-wider">Confirm Payment</h3>
                                </div>
                                <div className="p-8 space-y-6">
                                    <div className="space-y-2 border-b pb-4">
                                        <div className="flex justify-between"><span>Plan:</span><span className="font-bold">{tempSelectedPackage.name}</span></div>
                                        <div className="flex justify-between"><span>Fee:</span><span className="font-bold">₹{tempSelectedPackage.price}</span></div>
                                        <div className="flex justify-between text-[#23471d] font-black uppercase tracking-widest pt-2"><span>Total (+Tax/Fee):</span><span>₹{Math.round(tempSelectedPackage.price * 1.025)}</span></div>
                                    </div>
                                    <Button onClick={initiateRazorpayPayment} disabled={isSubmitting} className="w-full h-14 rounded-xl bg-[#23471d] font-black uppercase tracking-[0.2em] shadow-xl">Pay Now</Button>
                                </div>
                            </motion.div>
                        </div>
                    )
                }
            </AnimatePresence >
        </div >
    );
};

export default InternationalBuyerRegistration;