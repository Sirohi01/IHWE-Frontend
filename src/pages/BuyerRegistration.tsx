
import { useState, useEffect, useMemo } from "react";
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
    Ban
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import HeroBg from "@/assets/buyer.jpg";
import { buyerRegistrationApi, heroBackgroundApi, SERVER_URL, crmApi, otpApi, policyApi } from "@/lib/api";
import { toast } from "sonner";


const loadRazorpayScript = () => {
    return new Promise((resolve) => {
        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.onload = () => resolve(true);
        script.onerror = () => resolve(false);
        document.body.appendChild(script);
    });
};

const PACKAGE_METADATA: Record<string, any> = {
    "Standard Buyer Pass": {
        tagline: "For Emerging Buyers & Business Explorers",
        description: "Designed for professionals who want to explore new products, suppliers, and market opportunities through structured Buyer–Seller interactions.",
        whyChoose: "A great starting point to explore opportunities and build initial business connections.",
        cta: "Register Now",
        color: "blue",
        badge: null
    },
    "VIP Buyer Pass": {
        tagline: "For Serious Buyers & Decision Makers",
        description: "Crafted for high-intent buyers who are looking for structured, result-oriented meetings and premium networking.",
        whyChoose: "Perfect for buyers who want focused meetings, comfort, and faster business outcomes.",
        cta: "Upgrade to VIP",
        badge: "Recommended",
        color: "yellow"
    },
    "ICOA Standard Buyer Membership": {
        tagline: "For Active Buyers & Market Explorers",
        description: "The Buyer–Seller Meet at IHWE 2026 is being conducted in association with the International Council of AYUSH (ICOA), bringing you access to a trusted network of verified suppliers and brands.",
        whyChoose: "Ideal for buyers who want to explore the AYUSH and wellness ecosystem and build reliable connections.",
        cta: "Become a Member",
        color: "blue",
        badge: null
    },
    "ICOA VIP Buyer Membership": {
        tagline: "For Serious Buyers & Decision Makers",
        description: "Experience structured and high-value business networking through ICOA-curated Buyer–Seller Meets at IHWE and beyond.",
        whyChoose: "Best suited for buyers who want focused meetings, verified suppliers, and faster business outcomes.",
        cta: "Upgrade to VIP Membership",
        badge: "Recommended",
        color: "yellow"
    },
    "ICOA Elite Buyer Membership": {
        tagline: "For High-Value & Institutional Buyers",
        description: "An exclusive membership offering a fully managed sourcing experience through ICOA’s curated network and IHWE platform.",
        whyChoose: "Designed for buyers who want a complete sourcing ecosystem with strategic business support.",
        cta: "Get Elite Membership",
        color: "red",
        badge: null
    },
    "ICOA Buyer Membership": {
        tagline: "For Serious Buyers Seeking Year-Round Opportunities",
        description: "Extend your benefits beyond the event with ICOA Buyer Membership, offering continuous access to curated sourcing opportunities and supplier connections throughout the year.",
        whyChoose: "Perfect for buyers who want continuous business opportunities, not just a one-time event experience.",
        cta: "Get Membership",
        badge: "Best Value",
        color: "green"
    }
};

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
    const [emailResendTimer, setEmailResendTimer] = useState(0);
    const [mobileResendTimer, setMobileResendTimer] = useState(0);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [loadingLocations, setLoadingLocations] = useState({ states: false, cities: false });


    const [showTermsModal, setShowTermsModal] = useState(false);
    const [showPaymentConfirmModal, setShowPaymentConfirmModal] = useState(false);
    const [tempSelectedPackage, setTempSelectedPackage] = useState<any>(null);
    const [activePolicyTab, setActivePolicyTab] = useState<'payment' | 'refund' | 'privacy'>('payment');
    const [policyConsents, setPolicyConsents] = useState({
        paymentTerms: false,
        refundPolicy: false,
        privacyPolicy: false
    });

    const [policiesData, setPoliciesData] = useState<Record<string, any>>({});
    const [loadingPolicies, setLoadingPolicies] = useState(false);
    const [isFormLocked, setIsFormLocked] = useState(true);

    const initialFormState = {
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
        secondaryProductCategories: "",
        specificProductRequirements: "",
        estimatedPurchaseVolume: "",
        budgetRange: "",
        preferredSupplierRegion: [] as string[],
        preferredState: "",
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
    };

    const [formData, setFormData] = useState(initialFormState);
    const [showMembershipOptions, setShowMembershipOptions] = useState(false);

    const membershipPackages = useMemo(() => config?.packages?.filter((p: any) => p.category === 'Membership') || [], [config]);
    const passPackages = useMemo(() => config?.packages?.filter((p: any) => p.category === 'Pass') || [], [config]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [hData, cRes, configRes] = await Promise.all([
                    heroBackgroundApi.getByPage("Registration / Buyer Registration"),
                    crmApi.getCountries(),
                    buyerRegistrationApi.getConfig()
                ]);
                if (hData) setHeroData(hData);
                if (cRes) setCountries(cRes);
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


                setLoadingPolicies(true);
                try {
                    const [payment, refund, privacy] = await Promise.all([
                        policyApi.getByPage('terms-of-service'),
                        policyApi.getByPage('refund-policy'),
                        policyApi.getByPage('privacy-policy')
                    ]);
                    setPoliciesData({
                        'payment': payment,
                        'refund': refund,
                        'privacy': privacy
                    });
                } catch (policyErr) {
                    console.error("Error fetching policies:", policyErr);
                } finally {
                    setLoadingPolicies(false);
                }
            } catch (err) {
                console.error("Error fetching initial data:", err);
            }
        };
        fetchData();
    }, []);


    useEffect(() => {
        const fetchStates = async () => {
            if (!formData.country) {
                setStates([]);
                return;
            }
            const selectedCountry = countries.find(c => c.name === formData.country);
            if (selectedCountry) {
                setLoadingLocations(prev => ({ ...prev, states: true }));
                try {
                    const data = await crmApi.getStates(selectedCountry.countryCode);
                    setStates(data);
                } catch (err) {
                    console.error("Error fetching states:", err);
                } finally {
                    setLoadingLocations(prev => ({ ...prev, states: false }));
                }
            }
        };
        fetchStates();
    }, [formData.country, countries]);


    useEffect(() => {
        const fetchCities = async () => {
            if (!formData.stateProvince) {
                setCities([]);
                return;
            }
            const selectedState = states.find(s => s.name === formData.stateProvince);
            if (selectedState) {
                setLoadingLocations(prev => ({ ...prev, cities: true }));
                try {
                    const data = await crmApi.getCities(selectedState.stateCode);
                    setCities(data);
                } catch (err) {
                    console.error("Error fetching cities:", err);
                } finally {
                    setLoadingLocations(prev => ({ ...prev, cities: false }));
                }
            }
        };
        fetchCities();
    }, [formData.stateProvince, states]);

    // OTP Resend Timers
    useEffect(() => {
        let eTimer: any;
        if (emailResendTimer > 0) {
            eTimer = setInterval(() => setEmailResendTimer(prev => prev - 1), 1000);
        }
        return () => clearInterval(eTimer);
    }, [emailResendTimer]);

    useEffect(() => {
        let mTimer: any;
        if (mobileResendTimer > 0) {
            mTimer = setInterval(() => setMobileResendTimer(prev => prev - 1), 1000);
        }
        return () => clearInterval(mTimer);
    }, [mobileResendTimer]);

    const validateField = (name: string, value: any) => {
        let error = "";
        const requiredFields = [
            'fullName', 'designation', 'companyName', 'businessType',
            'emailAddress', 'mobileNumber', 'registeredAddress', 'pinCode',
            'stateProvince', 'city', 'yearsInOperation', 'annualTurnover',
            'keyProductsServices', 'primaryProductInterest', 'buyingFrequency',
            'estimatedAnnualPurchaseValue', 'purchaseTimeline', 'roleInPurchaseDecision',
            'matchmakingInterest', 'preferredMeetingDate', 'preferredTimeSlot',
            'registrationCategory'
        ];

        const lettersOnlyFields = ['fullName', 'designation', 'companyName', 'specificProductRequirements'];

        if (requiredFields.includes(name) && !value) {
            error = "This field is required";
        } else if (lettersOnlyFields.includes(name) && value && !/^[A-Za-z\s]+$/.test(value)) {
            error = "Only letters and spaces allowed";
        } else if (name === 'emailAddress' && value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
            error = "Invalid email format";
        } else if (name === 'mobileNumber' && value) {

            if (!/^\d{10}$/.test(value)) {
                error = "Mobile number must be exactly 10 digits";
            }
        } else if (name === 'alternateNumber' && value && !/^\d{10}$/.test(value)) {
            error = "Alternate number must be exactly 10 digits";
        } else if (name === 'pinCode' && value && !/^\d{6}$/.test(value)) {
            error = "Pin code must be exactly 6 digits";
        }

        setErrors(prev => ({ ...prev, [name]: error }));
        return error === "";
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;


        if (name === 'mobileNumber') {
            const digitsOnly = value.replace(/\D/g, '').slice(0, 10);
            setFormData(prev => ({ ...prev, [name]: digitsOnly }));
            validateField(name, digitsOnly);
        } else if (name === 'alternateNumber') {
            const digitsOnly = value.replace(/\D/g, '').slice(0, 10);
            setFormData(prev => ({ ...prev, [name]: digitsOnly }));
            validateField(name, digitsOnly);
        } else if (name === 'pinCode') {
            const digitsOnly = value.replace(/\D/g, '').slice(0, 6);
            setFormData(prev => ({ ...prev, [name]: digitsOnly }));
            validateField(name, digitsOnly);
        } else if (['fullName', 'designation', 'companyName', 'specificProductRequirements'].includes(name)) {
            const lettersOnly = value.replace(/[^A-Za-z\s]/g, '');
            setFormData(prev => ({ ...prev, [name]: lettersOnly }));
            validateField(name, lettersOnly);
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
            validateField(name, value);
        }
    };

    const handleSelectChange = (name: string, value: string) => {
        setErrors(prev => ({ ...prev, [name]: "" }));

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

    const validateForm = (skipPackageCheck = false) => {
        let isValid = true;
        const newErrors: Record<string, string> = {};


        const fieldsToValidate = [
            'fullName', 'designation', 'companyName', 'businessType',
            'emailAddress', 'mobileNumber', 'alternateNumber', 'registeredAddress', 'pinCode',
            'stateProvince', 'city', 'yearsInOperation', 'annualTurnover',
            'keyProductsServices', 'primaryProductInterest', 'buyingFrequency',
            'estimatedAnnualPurchaseValue', 'purchaseTimeline', 'roleInPurchaseDecision',
            'matchmakingInterest', 'preferredMeetingDate', 'preferredTimeSlot',
            'registrationCategory'
        ];

        fieldsToValidate.forEach(field => {
            if (skipPackageCheck && field === 'registrationCategory') return;
            if (!formData[field as keyof typeof formData]) {
                newErrors[field] = "This field is required";
                isValid = false;
            }
        });

        // 2. Format Validations
        if (formData.emailAddress && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.emailAddress)) {
            newErrors.emailAddress = "Invalid email format";
            isValid = false;
        }

        if (formData.mobileNumber && !/^\d{10}$/.test(formData.mobileNumber)) {
            newErrors.mobileNumber = "Mobile number must be exactly 10 digits";
            isValid = false;
        }

        // 3. Multi-selects
        if (formData.preferredSupplierRegion.length === 0) {
            newErrors.preferredSupplierRegion = "Select at least one region";
            isValid = false;
        }
        if (formData.preferredSupplierType.length === 0) {
            newErrors.preferredSupplierType = "Select at least one type";
            isValid = false;
        }

        // 4. OTP Verification
        if (!emailOtpVerified) {
            newErrors.emailAddress = "Please verify your email via OTP";
            isValid = false;
        }
        if (!mobileOtpVerified) {
            newErrors.mobileNumber = "Please verify your mobile via OTP";
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleUnlockPackages = () => {

        const isValid = validateForm(true);

        if (!isValid) {
            toast.error("Please fill in all required fields and correct any errors to continue.");
            const firstErrorField = Object.keys(errors)[0];
            const element = document.getElementsByName(firstErrorField || "")[0];
            if (element) element.scrollIntoView({ behavior: 'smooth', block: 'center' });
            return;
        }

        if (!emailOtpVerified || !mobileOtpVerified) {
            toast.warning("Please verify your Email and Mobile via OTP to view available packages.");
            return;
        }

        setIsFormLocked(false);

        setTimeout(() => {
            const packageSection = document.getElementById('package-section');
            if (packageSection) {
                packageSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }, 100);
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
        if (!identifier) {
            toast.error(`Please enter a valid ${type} first.`);
            return;
        }
        if (type === 'mobile' && !/^\d{10}$/.test(identifier)) {
            toast.error("Please enter a valid 10-digit mobile number.");
            return;
        }
        setIsVerifying(prev => ({ ...prev, [type]: true }));
        try {
            const res = await otpApi.request(identifier, type === 'email' ? 'email' : 'phone', formData.fullName);
            if (res.success) {
                toast.success(`OTP sent to your ${type === 'email' ? 'email address' : 'mobile number'}.`);
                if (type === 'email') {
                    setEmailOtpSent(true);
                    setEmailResendTimer(60);
                } else {
                    setMobileOtpSent(true);
                    setMobileResendTimer(60);
                }
            } else {
                toast.error(res.message || `Failed to send OTP to ${type}.`);
            }
        } catch (err) {
            toast.error("Connection error. Please try again.");
        } finally {
            setIsVerifying(prev => ({ ...prev, [type]: false }));
        }
    };

    const verifyOtp = async (type: 'email' | 'mobile') => {
        const identifier = type === 'email' ? formData.emailAddress : formData.mobileNumber;
        const otp = type === 'email' ? emailOtpValue : mobileOtpValue;
        if (!otp) {
            toast.error("Please enter the OTP first.");
            return;
        }
        setIsVerifying(prev => ({ ...prev, [type]: true }));
        try {
            const res = await otpApi.verify(identifier, otp, type === 'email' ? 'email' : 'phone');
            if (res.success) {
                toast.success(`${type === 'email' ? 'Email' : 'Mobile'} verified successfully! ✓`);
                type === 'email' ? setEmailOtpVerified(true) : setMobileOtpVerified(true);
            } else {
                toast.error(res.message || "Invalid OTP. Please try again.");
            }
        } catch (err) {
            toast.error("Verification failed. Please try again.");
        } finally {
            setIsVerifying(prev => ({ ...prev, [type]: false }));
        }
    };

    const handlePackageSelection = (pkg: any) => {
        setTempSelectedPackage(pkg);
        setPolicyConsents({ paymentTerms: false, refundPolicy: false, privacyPolicy: false });
        setActivePolicyTab('payment');
        setShowTermsModal(true);
    };

    const initiateRazorpayPayment = async () => {
        const razorpayLoaded = await loadRazorpayScript();
        if (!razorpayLoaded) {
            toast.error("Failed to load payment gateway. Please try again.");
            return;
        }

        const options = {
            key: import.meta.env.VITE_RAZORPAY_KEY_ID || "rzp_test_YOUR_KEY",
            amount: tempSelectedPackage.price * 100,
            currency: "INR",
            name: "IHWE 2026",
            description: `${tempSelectedPackage.name} Registration`,
            handler: async function (response: any) {
                setFormData(prev => ({
                    ...prev,
                    registrationCategory: tempSelectedPackage.name,
                    registrationFee: `₹${tempSelectedPackage.price}`,
                    transactionId: response.razorpay_payment_id
                }));
                setShowTermsModal(false);
                setShowPaymentConfirmModal(false);
                await submitFinal(response.razorpay_payment_id);
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
                confirm_close: true,
                ondismiss: function () {
                    toast.warning("Payment cancelled. Complete payment to confirm your registration.");
                }
            }
        };

        const razorpay = new (window as any).Razorpay(options);
        razorpay.open();
    };

    const confirmPackage = () => {
        if (!policyConsents.paymentTerms || !policyConsents.refundPolicy || !policyConsents.privacyPolicy) {
            toast.error("Please accept all Terms, Refund Policy, and Privacy Policy to proceed.");
            return;
        }
        setShowTermsModal(false);
        setShowPaymentConfirmModal(true);
    };


    const submitFinal = async (transactionId: string) => {
        setIsSubmitting(true);
        try {
            const res = await buyerRegistrationApi.submit({
                ...formData,
                registrationCategory: tempSelectedPackage?.name,
                registrationFee: `₹${tempSelectedPackage?.price}`,
                paymentStatus: "Completed",
                transactionId: transactionId,
                consentTerms: true,
                consentPaymentValid: true,
                consentMatchedExhibitors: true
            });
            if (res.success) {
                setSubmitted(true);
                window.scrollTo({ top: 0, behavior: "smooth" });
            } else {
                toast.error(res.message || "Submission error. Please contact support.");
            }
        } catch (error) {
            toast.error("Submission error. Please contact support.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const isValid = validateForm();

        if (!isValid) {
            toast.error("Please correct the errors in the form before submitting.");
            const firstErrorField = Object.keys(errors)[0];
            const element = document.getElementsByName(firstErrorField)[0];
            if (element) element.scrollIntoView({ behavior: 'smooth', block: 'center' });
            return;
        }

        if (formData.preferredSupplierRegion.length === 0 || formData.preferredSupplierType.length === 0) {
            toast.error("Please select at least one Preferred Supplier Region and Type.");
            return;
        }

        if (!emailOtpVerified || !mobileOtpVerified) {
            toast.error("Please verify your Email and Mobile via OTP before submitting.");
            return;
        }


    };

    const handleReset = () => {
        setFormData({
            ...initialFormState,
            registrationCategory: config?.packages?.[0]?.name || "",
            registrationFee: config?.packages?.[0]?.price ? `₹${config.packages[0].price}` : "₹0"
        });
        setSubmitted(false);
        setEmailOtpSent(false);
        setEmailOtpVerified(false);
        setEmailOtpValue("");
        setMobileOtpSent(false);
        setMobileOtpVerified(false);
        setMobileOtpValue("");
        setShowMembershipOptions(false);
        setTempSelectedPackage(null);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };


    const inputClasses = "w-full h-8 px-3 py-2 rounded-[2px] border border-slate-400 bg-white text-left text-[12px] font-medium text-slate-900 outline-none shadow-none transition-all ring-offset-background focus:border-[#23471d] focus:ring-[#23471d]/10 placeholder:text-slate-400 font-sans";
    const labelClasses = "text-[12px] font-semibold text-slate-900 mb-0.5 block text-left font-sans";
    const sectionTitleClasses = "text-[13px] font-black text-[#23471d] pb-1 border-b border-emerald-500/20 flex items-center gap-1.5 mb-3 uppercase tracking-tight font-sans";
    const buttonTextClasses = "text-[11px] font-bold uppercase tracking-wider font-sans";

    return (
        <div className="min-h-screen bg-[#FDFDFD] font-sans">
            <section className="relative h-[140px] flex items-center justify-center bg-cover bg-center overflow-hidden" style={{ backgroundImage: `url(${heroData?.backgroundImage ? `${SERVER_URL}${heroData.backgroundImage}` : HeroBg})` }}>
                <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/20" />
                <div className="container mx-auto px-4 text-center text-white relative z-10">
                    <p className="text-[9px] uppercase tracking-[0.5em] mb-1 text-emerald-400 font-bold font-sans">IHWE 2026 - Global Connect</p>
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
                                    <p className="text-slate-500 text-sm max-w-lg mx-auto leading-relaxed font-sans">Thank you for choosing IHWE 2026. Your registration details and payment confirmation have been emailed to you.</p>
                                </div>
                                <div className="flex flex-wrap gap-4 justify-center">
                                    <Button onClick={handleReset} className={`rounded-full px-8 h-10 border-[#23471d] text-[#23471d] hover:bg-emerald-50 ${buttonTextClasses} shadow-sm`} variant="outline">Register Another</Button>
                                    <Link to="/"><Button className={`rounded-full px-8 h-10 bg-[#23471d] hover:bg-[#1a3516] ${buttonTextClasses} shadow-xl`}>Return Home</Button></Link>
                                </div>
                            </motion.div>
                        ) : (
                            <motion.div key="form" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="bg-white border border-slate-200 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] rounded-lg overflow-hidden">
                                <div className="bg-[#23471d] px-5 py-3 text-white flex justify-between items-center">
                                    <div>
                                        <h2 className="text-base font-bold uppercase tracking-wider font-sans">Domestic Buyer Registration</h2>
                                        <p className="text-[9px] text-emerald-300 uppercase tracking-[0.3em] font-medium font-sans">9th Edition of International Health & Wellness Expo 2026 (IHWE Global Edition)</p>
                                    </div>
                                    <ShieldCheck className="text-emerald-400 opacity-50" size={24} />
                                </div>
                                <form onSubmit={handleSubmit} className="p-5 space-y-5">

                                    {/* 1. Personal & Company Information */}
                                    <div className="space-y-2">
                                        <h3 className={sectionTitleClasses}> Personal & Company Information</h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 gap-y-4 gap-x-5">
                                            <div><Label className={labelClasses}>Full Name *</Label><Input required name="fullName" value={formData.fullName} onChange={handleChange} placeholder="As per ID Proof" className={`${inputClasses} ${errors.fullName ? 'border-red-400' : ''}`} /><ErrorDisplay name="fullName" errors={errors} /></div>
                                            <div><Label className={labelClasses}>Designation *</Label><Input required name="designation" value={formData.designation} onChange={handleChange} placeholder="Current Position" className={`${inputClasses} ${errors.designation ? 'border-red-400' : ''}`} /><ErrorDisplay name="designation" errors={errors} /></div>
                                            <div><Label className={labelClasses}>Company Name *</Label><Input required name="companyName" value={formData.companyName} onChange={handleChange} placeholder="Full Registered Name" className={`${inputClasses} ${errors.companyName ? 'border-red-400' : ''}`} /><ErrorDisplay name="companyName" errors={errors} /></div>
                                            <div><Label className={labelClasses}>Business Type *</Label><Select required value={formData.businessType} onValueChange={(v) => handleSelectChange('businessType', v)}><SelectTrigger className={`${inputClasses} ${errors.businessType ? 'border-red-400' : ''}`}><SelectValue placeholder="Select Type" /></SelectTrigger><SelectContent className="bg-white font-sans text-[12px]">{config?.companyTypes?.map((t: string) => <SelectItem key={t} value={t}>{t}</SelectItem>)}</SelectContent></Select><ErrorDisplay name="businessType" errors={errors} /></div>
                                        </div>
                                    </div>

                                    {/* 2. Contact Information */}
                                    <div className="space-y-2">
                                        <h3 className={sectionTitleClasses}>Contact Information</h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 gap-y-4 gap-x-5">
                                            <div className="space-y-1">
                                                <Label className={labelClasses}>Mobile Number (10 digits) *</Label>
                                                <div className="flex gap-2">
                                                    <div className="relative flex-1"><Smartphone className="absolute left-2 top-1.5 text-slate-400" size={12} /><Input required name="mobileNumber" value={formData.mobileNumber} onChange={handleChange} placeholder="10-digit mobile number" className={`${inputClasses} pl-7 ${errors.mobileNumber ? 'border-red-400' : ''}`} disabled={mobileOtpVerified || mobileOtpSent} maxLength={10} /></div>
                                                    {!mobileOtpVerified && !mobileOtpSent && (
                                                        <Button type="button" onClick={() => requestOtp('mobile')} disabled={isVerifying.mobile || formData.mobileNumber.length !== 10} className={`bg-[#23471d] text-[10px] h-7 px-2 whitespace-nowrap ${buttonTextClasses}`}>
                                                            {isVerifying.mobile ? <Loader2 className="animate-spin" size={10} /> : 'Send OTP'}
                                                        </Button>
                                                    )}
                                                    {mobileOtpSent && !mobileOtpVerified && (
                                                        <Button type="button" onClick={() => verifyOtp('mobile')} disabled={isVerifying.mobile || !mobileOtpValue} className={`bg-[#23471d] text-[10px] h-7 px-2 whitespace-nowrap ${buttonTextClasses}`}>
                                                            {isVerifying.mobile ? <Loader2 className="animate-spin" size={10} /> : 'Verify'}
                                                        </Button>
                                                    )}
                                                    {mobileOtpVerified && <CheckCircle size={16} className="text-emerald-500 self-center shrink-0" />}
                                                </div>
                                                <ErrorDisplay name="mobileNumber" errors={errors} />
                                                {mobileOtpSent && !mobileOtpVerified && (
                                                    <div className="space-y-1">
                                                        <Input placeholder="Enter 6-digit OTP" value={mobileOtpValue} onChange={(e) => setMobileOtpValue(e.target.value)} className={`${inputClasses} tracking-[0.3em] text-center font-bold`} maxLength={6} inputMode="numeric" />
                                                        <div className="flex items-center justify-between">
                                                            <span className="text-[10px] text-slate-400">Didn't receive it?</span>
                                                            {mobileResendTimer > 0 ? (
                                                                <span className="text-[10px] font-bold text-slate-400">Resend in {mobileResendTimer}s</span>
                                                            ) : (
                                                                <button type="button" onClick={() => requestOtp('mobile')} disabled={isVerifying.mobile} className="text-[10px] font-bold text-[#23471d] hover:underline disabled:opacity-50">
                                                                    Resend OTP
                                                                </button>
                                                            )}
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                            <div><Label className={labelClasses}>Alternate Number (10 digits) *</Label><Input required name="alternateNumber" value={formData.alternateNumber} onChange={handleChange} placeholder="10-digit alternate number" className={`${inputClasses} ${errors.alternateNumber ? 'border-red-400' : ''}`} maxLength={10} /><ErrorDisplay name="alternateNumber" errors={errors} /></div>
                                            <div className="space-y-1">
                                                <Label className={labelClasses}>Email Address (OTP) *</Label>
                                                <div className="flex gap-2">
                                                    <div className="relative flex-1"><AtSign className="absolute left-2 top-1.5 text-slate-400" size={12} /><Input type="email" required name="emailAddress" value={formData.emailAddress} onChange={handleChange} placeholder="Work Email" className={`${inputClasses} pl-7 ${errors.emailAddress ? 'border-red-400' : ''}`} disabled={emailOtpVerified || emailOtpSent} /></div>
                                                    {!emailOtpVerified && !emailOtpSent && (
                                                        <Button type="button" onClick={() => requestOtp('email')} disabled={isVerifying.email || !formData.emailAddress} className={`bg-[#23471d] text-[10px] h-7 px-2 whitespace-nowrap ${buttonTextClasses}`}>
                                                            {isVerifying.email ? <Loader2 className="animate-spin" size={10} /> : 'Send OTP'}
                                                        </Button>
                                                    )}
                                                    {emailOtpSent && !emailOtpVerified && (
                                                        <Button type="button" onClick={() => verifyOtp('email')} disabled={isVerifying.email || !emailOtpValue} className={`bg-[#23471d] text-[10px] h-7 px-2 whitespace-nowrap ${buttonTextClasses}`}>
                                                            {isVerifying.email ? <Loader2 className="animate-spin" size={10} /> : 'Verify'}
                                                        </Button>
                                                    )}
                                                    {emailOtpVerified && <CheckCircle size={16} className="text-emerald-500 self-center shrink-0" />}
                                                </div>
                                                <ErrorDisplay name="emailAddress" errors={errors} />
                                                {emailOtpSent && !emailOtpVerified && (
                                                    <div className="space-y-1">
                                                        <Input placeholder="Enter 6-digit OTP" value={emailOtpValue} onChange={(e) => setEmailOtpValue(e.target.value)} className={`${inputClasses} tracking-[0.3em] text-center font-bold`} maxLength={6} inputMode="numeric" />
                                                        <div className="flex items-center justify-between">
                                                            <span className="text-[10px] text-slate-400">Didn't receive it?</span>
                                                            {emailResendTimer > 0 ? (
                                                                <span className="text-[10px] font-bold text-slate-400">Resend in {emailResendTimer}s</span>
                                                            ) : (
                                                                <button type="button" onClick={() => requestOtp('email')} disabled={isVerifying.email} className="text-[10px] font-bold text-[#23471d] hover:underline disabled:opacity-50">
                                                                    Resend OTP
                                                                </button>
                                                            )}
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                            <div><Label className={labelClasses}>Website (Optional)</Label><Input name="website" value={formData.website} onChange={handleChange} placeholder="https://..." className={`${inputClasses} ${errors.website ? 'border-red-400' : ''}`} /><ErrorDisplay name="website" errors={errors} /></div>
                                        </div>
                                    </div>

                                    {/* Registered Address, State, City, Pin Code */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 gap-y-4 gap-x-5">
                                        <div><Label className={labelClasses}>Registered Address *</Label><Input required name="registeredAddress" value={formData.registeredAddress} onChange={handleChange} placeholder="Full Corporate Address" className={`${inputClasses} ${errors.registeredAddress ? 'border-red-400' : ''}`} /><ErrorDisplay name="registeredAddress" errors={errors} /></div>
                                        <div><Label className={labelClasses}>State/Province *</Label><Select value={formData.stateProvince} onValueChange={(v) => handleSelectChange('stateProvince', v)} disabled={loadingLocations.states}><SelectTrigger className={`${inputClasses} ${errors.stateProvince ? 'border-red-400' : ''}`}><SelectValue placeholder={loadingLocations.states ? "Loading..." : "Select State"} /></SelectTrigger><SelectContent className="bg-white font-sans text-[12px] max-h-[200px]">{states.map(s => <SelectItem key={s._id} value={s.name}>{s.name}</SelectItem>)}</SelectContent></Select><ErrorDisplay name="stateProvince" errors={errors} /></div>
                                        <div><Label className={labelClasses}>City *</Label><Select value={formData.city} onValueChange={(v) => handleSelectChange('city', v)} disabled={!formData.stateProvince || loadingLocations.cities}><SelectTrigger className={`${inputClasses} ${errors.city ? 'border-red-400' : ''}`}><SelectValue placeholder={loadingLocations.cities ? "Loading..." : "Select City"} /></SelectTrigger><SelectContent className="bg-white font-sans text-[12px] max-h-[200px]">{cities.map(c => <SelectItem key={c._id} value={c.name}>{c.name}</SelectItem>)}</SelectContent></Select><ErrorDisplay name="city" errors={errors} /></div>
                                        <div><Label className={labelClasses}>Pin Code (6 digits) *</Label><Input required name="pinCode" value={formData.pinCode} onChange={handleChange} placeholder="Postal Code" className={`${inputClasses} ${errors.pinCode ? 'border-red-400' : ''}`} maxLength={6} /><ErrorDisplay name="pinCode" errors={errors} /></div>
                                    </div>

                                    {/* 3. Business Profile */}
                                    <div className="space-y-2">
                                        <h3 className={sectionTitleClasses}> Business Profile</h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 gap-y-4 gap-x-5">
                                            <div><Label className={labelClasses}>Years in Operation *</Label><Input type="date" required name="yearsInOperation" value={formData.yearsInOperation} onChange={handleChange} className={`${inputClasses} ${errors.yearsInOperation ? 'border-red-400' : ''}`} /><ErrorDisplay name="yearsInOperation" errors={errors} /></div>
                                            <div><Label className={labelClasses}>Annual Turnover *</Label><Select value={formData.annualTurnover} onValueChange={(v) => handleSelectChange('annualTurnover', v)}><SelectTrigger className={`${inputClasses} ${errors.annualTurnover ? 'border-red-400' : ''}`}><SelectValue placeholder="Choose Range" /></SelectTrigger><SelectContent className="bg-white font-sans text-[12px]">{config?.annualTurnoverRanges?.map((r: string) => <SelectItem key={r} value={r}>{r}</SelectItem>)}</SelectContent></Select><ErrorDisplay name="annualTurnover" errors={errors} /></div>
                                            <div><Label className={labelClasses}>Key Products / Services *</Label><Input required name="keyProductsServices" value={formData.keyProductsServices} onChange={handleChange} placeholder="Your primary offerings..." className={`${inputClasses} ${errors.keyProductsServices ? 'border-red-400' : ''}`} /><ErrorDisplay name="keyProductsServices" errors={errors} /></div>
                                        </div>
                                    </div>

                                    {/* 4. Sourcing & Buying Interests */}
                                    <div className="space-y-2">
                                        <h3 className={sectionTitleClasses}> Sourcing & Buying Interests</h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 gap-y-4 gap-x-5">
                                            <div><Label className={labelClasses}>Primary Product Interest *</Label><Select value={formData.primaryProductInterest} onValueChange={(v) => handleSelectChange('primaryProductInterest', v)}><SelectTrigger className={`${inputClasses} ${errors.primaryProductInterest ? 'border-red-400' : ''}`}><SelectValue placeholder="Choose Interest" /></SelectTrigger><SelectContent className="bg-white font-sans text-[12px]">{config?.primaryProductInterests?.map((i: string) => <SelectItem key={i} value={i}>{i}</SelectItem>)}</SelectContent></Select><ErrorDisplay name="primaryProductInterest" errors={errors} /></div>
                                            <div>
                                                <Label className={labelClasses}>Secondary Product Categories</Label>
                                                <Select value={formData.secondaryProductCategories} onValueChange={(v) => handleSelectChange('secondaryProductCategories', v)}>
                                                    <SelectTrigger className={inputClasses}>
                                                        <SelectValue placeholder="Choose Interests" />
                                                    </SelectTrigger>
                                                    <SelectContent className="bg-white font-sans text-[12px]">
                                                        {config?.secondaryProductCategories?.map((c: string) => (
                                                            <SelectItem key={c} value={c}>{c}</SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                            <div><Label className={labelClasses}>Estimated Purchase Volume</Label><Input name="estimatedPurchaseVolume" value={formData.estimatedPurchaseVolume} onChange={handleChange} placeholder="e.g. 5000 Units" className={inputClasses} /><div className="h-3" /></div>
                                            <div><Label className={labelClasses}>Budget Range</Label><Select value={formData.budgetRange} onValueChange={(v) => handleSelectChange('budgetRange', v)}><SelectTrigger className={inputClasses}><SelectValue placeholder="Choose Budget" /></SelectTrigger><SelectContent className="bg-white font-sans text-[12px]">{config?.budgetRanges?.map((b: string) => <SelectItem key={b} value={b}>{b}</SelectItem>)}</SelectContent></Select><div className="h-3" /></div>
                                        </div>
                                        <div className="mt-1">
                                            <Label className={labelClasses}>Specific Product Requirements</Label>
                                            <Textarea name="specificProductRequirements" value={formData.specificProductRequirements} onChange={handleChange} className={`${inputClasses} h-auto min-h-[50px] py-1`} placeholder="Any custom needs..." />
                                        </div>
                                    </div>

                                    {/* 5. Supplier Preference */}
                                    <div className="space-y-2">
                                        <h3 className={sectionTitleClasses}> Supplier Preference (India Only)</h3>
                                        <div className="grid grid-cols-1 lg:grid-cols-4 gap-3 gap-y-4 gap-x-5">
                                            <div className="space-y-1">
                                                <Label className={labelClasses}>Preferred Supplier Region *</Label>
                                                <div className={`p-2 border rounded-lg bg-white ${errors.preferredSupplierRegion ? 'border-red-400' : 'border-slate-400'}`}>
                                                    <div className="flex flex-wrap gap-2">
                                                        {['North India', 'South India', 'East India', 'West India', 'Pan India'].map((r: string) => (
                                                            <label key={r} className={`flex items-center gap-1 text-[12px] font-medium text-slate-700 font-sans bg-slate-50 border border-slate-200 px-2 py-0.5 rounded-[2px] cursor-pointer hover:border-emerald-500`}>
                                                                <Checkbox checked={formData.preferredSupplierRegion.includes(r)} onCheckedChange={(checked) => handleCheckboxChange('preferredSupplierRegion', r, !!checked)} className="h-3 w-3" /> {r}
                                                            </label>
                                                        ))}
                                                    </div>
                                                </div>
                                                <ErrorDisplay name="preferredSupplierRegion" errors={errors} />
                                            </div>
                                            <div className="space-y-1">
                                                <Label className={labelClasses}>Preferred Supplier Type *</Label>
                                                <div className={`p-2 border rounded-lg bg-white ${errors.preferredSupplierType ? 'border-red-400' : 'border-slate-400'}`}>
                                                    <div className="flex flex-wrap gap-2">
                                                        {['Manufacturer', 'Exporter', 'MSME', 'Startup', 'Wholesaler'].map((t: string) => (
                                                            <label key={t} className={`flex items-center gap-1 text-[12px] font-medium text-slate-700 font-sans bg-slate-50 border border-slate-200 px-2 py-0.5 rounded-[2px] cursor-pointer hover:border-emerald-500`}>
                                                                <Checkbox checked={formData.preferredSupplierType.includes(t)} onCheckedChange={(checked) => handleCheckboxChange('preferredSupplierType', t, !!checked)} className="h-3 w-3" /> {t}
                                                            </label>
                                                        ))}
                                                    </div>
                                                </div>
                                                <ErrorDisplay name="preferredSupplierType" errors={errors} />
                                            </div>
                                            <div>
                                                <Label className={labelClasses}>Preferred State (Optional)</Label>
                                                <Select value={formData.preferredState} onValueChange={(v) => handleSelectChange('preferredState', v)}>
                                                    <SelectTrigger className={inputClasses}>
                                                        <SelectValue placeholder="Select State" />
                                                    </SelectTrigger>
                                                    <SelectContent className="bg-white font-sans text-[12px] max-h-[200px]">
                                                        {states.map(s => (
                                                            <SelectItem key={s._id} value={s.name}>{s.name}</SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                            <div><Label className={labelClasses}>Preferred Company Size</Label><Select value={formData.preferredCompanySize} onValueChange={(v) => handleSelectChange('preferredCompanySize', v)}><SelectTrigger className={inputClasses}><SelectValue placeholder="Select Size" /></SelectTrigger><SelectContent className="bg-white font-sans text-[12px]">{config?.companySizes?.map((s: string) => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent></Select></div>
                                        </div>
                                    </div>

                                    {/* 6. Purchase Intent & Capacity */}
                                    <div className="space-y-2 ">
                                        <h3 className={sectionTitleClasses}> Purchase Intent & Capacity</h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3 gap-y-4 gap-x-5">
                                            <div><Label className={labelClasses}>Buying Frequency *</Label><Select value={formData.buyingFrequency} onValueChange={(v) => handleSelectChange('buyingFrequency', v)}><SelectTrigger className={`${inputClasses} ${errors.buyingFrequency ? 'border-red-400' : ''}`}><SelectValue placeholder="Select" /></SelectTrigger><SelectContent className="bg-white font-sans text-[12px]">{['One-time', 'Monthly', 'Quarterly', 'Long-term'].map(f => <SelectItem key={f} value={f}>{f}</SelectItem>)}</SelectContent></Select><ErrorDisplay name="buyingFrequency" errors={errors} /></div>
                                            <div><Label className={labelClasses}>Est. Annual Purchase Value *</Label><Input name="estimatedAnnualPurchaseValue" value={formData.estimatedAnnualPurchaseValue} onChange={handleChange} placeholder="e.g. 50-100 Lakhs" className={`${inputClasses} ${errors.estimatedAnnualPurchaseValue ? 'border-red-400' : ''}`} /><ErrorDisplay name="estimatedAnnualPurchaseValue" errors={errors} /></div>
                                            <div><Label className={labelClasses}>Purchase Timeline *</Label><Select value={formData.purchaseTimeline} onValueChange={(v) => handleSelectChange('purchaseTimeline', v)}><SelectTrigger className={`${inputClasses} ${errors.purchaseTimeline ? 'border-red-400' : ''}`}><SelectValue placeholder="Select" /></SelectTrigger><SelectContent className="bg-white font-sans text-[12px]">{['Immediate', '1–3 Months', '3–6 Months', 'Exploring'].map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}</SelectContent></Select><ErrorDisplay name="purchaseTimeline" errors={errors} /></div>
                                            <div><Label className={labelClasses}>Matchmaking Interest *</Label><Select value={formData.matchmakingInterest} onValueChange={(v) => handleSelectChange('matchmakingInterest', v)}><SelectTrigger className={`${inputClasses} ${errors.matchmakingInterest ? 'border-red-400' : ''}`}><SelectValue placeholder="Yes/No" /></SelectTrigger><SelectContent className="bg-white font-sans text-[12px]}"><SelectItem value="Yes">Yes</SelectItem><SelectItem value="No">No</SelectItem></SelectContent></Select><ErrorDisplay name="matchmakingInterest" errors={errors} /></div>
                                            <div><Label className={labelClasses}>Role in Purchase Decision *</Label><Select value={formData.roleInPurchaseDecision} onValueChange={(v) => handleSelectChange('roleInPurchaseDecision', v)}><SelectTrigger className={`${inputClasses} ${errors.roleInPurchaseDecision ? 'border-red-400' : ''}`}><SelectValue placeholder="Select Role" /></SelectTrigger><SelectContent className="bg-white font-sans text-[12px]}">{['Final Decision Maker', 'Influencer', 'Research Only'].map(r => <SelectItem key={r} value={r}>{r}</SelectItem>)}</SelectContent></Select><ErrorDisplay name="roleInPurchaseDecision" errors={errors} /></div>
                                        </div>
                                    </div>

                                    {/* 7. Certification & Compliance + 8. Pricing Preference */}
                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 gap-y-4 gap-x-5">
                                        <div className="space-y-2">
                                            <h3 className={sectionTitleClasses}> Certification & Compliance</h3>
                                            <div className="flex flex-wrap gap-2 p-2 border rounded-lg bg-white">
                                                {['ISO', 'GMP', 'FDA', 'AYUSH', 'Organic', 'Others'].map((c: string) => (
                                                    <label key={c} className={`flex items-center gap-1 text-[12px] font-medium text-slate-700 font-sans bg-slate-50 px-2 py-0.5 rounded border border-slate-400 cursor-pointer hover:bg-emerald-50`}>
                                                        <Checkbox checked={formData.requiredCertifications.includes(c)} onCheckedChange={(checked) => handleCheckboxChange('requiredCertifications', c, !!checked)} className="h-3 w-3" /> {c}
                                                    </label>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <h3 className={sectionTitleClasses}> Pricing Preference</h3>
                                            <div className="flex gap-4 p-2">
                                                <label className={`flex items-center gap-1 text-[12px] font-medium text-slate-700 font-sans`}><Checkbox checked={formData.pricingPreference === 'Premium'} onCheckedChange={() => handleSelectChange('pricingPreference', 'Premium')} className="h-3 w-3" /> Premium</label>
                                                <label className={`flex items-center gap-1 text-[12px] font-medium text-slate-700 font-sans`}><Checkbox checked={formData.pricingPreference === 'Mid-Range'} onCheckedChange={() => handleSelectChange('pricingPreference', 'Mid-Range')} className="h-3 w-3" /> Mid-Range</label>
                                                <label className={`flex items-center gap-1 text-[12px] font-medium text-slate-700 font-sans`}><Checkbox checked={formData.pricingPreference === 'Budget'} onCheckedChange={() => handleSelectChange('pricingPreference', 'Budget')} className="h-3 w-3" /> Budget</label>
                                            </div>
                                        </div>
                                    </div>

                                    {/* 9. B2B Meeting Preferences */}
                                    <div className="space-y-2">
                                        <h3 className={sectionTitleClasses}> B2B Meeting Preferences</h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 gap-y-4 gap-x-5">
                                            <div><Label className={labelClasses}>Preferred Meeting Date *</Label><Input type="date" required name="preferredMeetingDate" value={formData.preferredMeetingDate} onChange={handleChange} className={`${inputClasses} ${errors.preferredMeetingDate ? 'border-red-400' : ''}`} /><ErrorDisplay name="preferredMeetingDate" errors={errors} /></div>
                                            <div><Label className={labelClasses}>Preferred Time Slot *</Label><Select value={formData.preferredTimeSlot} onValueChange={(v) => handleSelectChange('preferredTimeSlot', v)}><SelectTrigger className={`${inputClasses} ${errors.preferredTimeSlot ? 'border-red-400' : ''}`}><SelectValue placeholder="Select Slot" /></SelectTrigger><SelectContent className="bg-white font-sans text-[12px]}"><SelectItem value="Morning (10AM - 1PM)">Morning (10AM - 1PM)</SelectItem><SelectItem value="Afternoon (2PM - 4PM)">Afternoon (2PM - 4PM)</SelectItem><SelectItem value="Evening (4PM - 6PM)">Evening (4PM - 6PM)</SelectItem></SelectContent></Select><ErrorDisplay name="preferredTimeSlot" errors={errors} /></div>
                                            <div><Label className={labelClasses}>Pre-scheduled B2B *</Label><Select value={formData.requirePreScheduledB2B} onValueChange={(v) => handleSelectChange('requirePreScheduledB2B', v)}><SelectTrigger className={inputClasses}><SelectValue placeholder="Yes/No" /></SelectTrigger><SelectContent className="bg-white font-sans text-[12px]}"><SelectItem value="Yes">Yes</SelectItem><SelectItem value="No">No</SelectItem></SelectContent></Select><div className="h-3" /></div>
                                            <div><Label className={labelClasses}>Meeting Priority Level *</Label><Select value={formData.meetingPriorityLevel} onValueChange={(v) => handleSelectChange('meetingPriorityLevel', v)}><SelectTrigger className={inputClasses}><SelectValue placeholder="Priority" /></SelectTrigger><SelectContent className="bg-white font-sans text-[12px]}">{(config?.meetingPriorityLevels || ['Low', 'Medium', 'High']).map((m: string) => <SelectItem key={m} value={m}>{m}</SelectItem>)}</SelectContent></Select><div className="h-3" /></div>
                                        </div>
                                    </div>

                                    {/* 10. Registration Category */}
                                    <div id="package-section" className="space-y-4 pt-4 border-t border-slate-100">
                                        <h3 className={sectionTitleClasses}> Registration Category 🔹</h3>

                                        {isFormLocked ? (
                                            <div className="bg-emerald-50/50 border-2 border-dashed border-emerald-200 rounded-xl p-8 flex flex-col items-center text-center space-y-4">
                                                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-emerald-600 shadow-sm">
                                                    <Lock size={20} />
                                                </div>
                                                <div className="space-y-1">
                                                    <h4 className="text-[14px] font-black text-slate-800 uppercase tracking-tight">Registration Packages Locked</h4>
                                                    <p className="text-[11px] text-slate-500 font-medium max-w-sm">Please complete all required form fields and verify your contact details via OTP to unlock available passes and memberships.</p>
                                                </div>
                                                <Button
                                                    type="button"
                                                    onClick={handleUnlockPackages}
                                                    className={`bg-[#23471d] hover:bg-[#1a3516] text-white px-8 h-10 rounded-full shadow-lg transition-all hover:scale-105 ${buttonTextClasses}`}
                                                >
                                                    Step 2: Verify & View Packages →
                                                </Button>
                                            </div>
                                        ) : (
                                            <div className="animate-in fade-in slide-in-from-bottom-5 duration-500">
                                                {!showMembershipOptions ? (
                                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-stretch">
                                                        {passPackages.map((pkg: any) => {
                                                            const meta = PACKAGE_METADATA[pkg.name] || {};
                                                            const isSelected = formData.registrationCategory === pkg.name;
                                                            const colorScheme = meta.color === 'yellow' ? 'border-amber-400 bg-amber-50/10' : 'border-blue-400 bg-blue-50/10';
                                                            const accentColor = meta.color === 'yellow' ? 'text-amber-700' : 'text-blue-700';

                                                            return (
                                                                <div
                                                                    key={pkg.name}
                                                                    onClick={() => handlePackageSelection(pkg)}
                                                                    className={`relative p-5 border-2 transition-all cursor-pointer rounded-xl flex flex-col h-full font-sans group ${isSelected ? `border-[#23471d] bg-white shadow-2xl ring-4 ring-emerald-100 scale-[1.02] z-10` : `border-slate-200 bg-white hover:border-emerald-300 hover:shadow-lg`}`}
                                                                >
                                                                    {meta.badge && (
                                                                        <div className={`absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest shadow-sm z-20 ${meta.color === 'yellow' ? 'bg-amber-400 text-white' : 'bg-emerald-500 text-white'}`}>
                                                                            ⭐ {meta.badge}
                                                                        </div>
                                                                    )}

                                                                    <div className="mb-3">
                                                                        <h4 className="text-[15px] font-black leading-tight text-slate-800 font-sans group-hover:text-[#23471d] transition-colors">
                                                                            {pkg.name} – ₹{pkg.price}
                                                                        </h4>
                                                                        <p className={`text-[10px] font-bold uppercase tracking-tight mt-1 ${accentColor}`}>
                                                                            {meta.tagline}
                                                                        </p>
                                                                    </div>

                                                                    <div className="flex-1 space-y-4">
                                                                        <p className="text-[11px] text-slate-500 leading-relaxed italic border-l-2 border-slate-200 pl-2">
                                                                            {meta.description}
                                                                        </p>

                                                                        <div className="space-y-1.5">
                                                                            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">What You Get:</p>
                                                                            <ul className="text-[11px] text-slate-700 space-y-1.5 font-medium font-sans">
                                                                                {pkg.benefits.map((b: string, i: number) => (
                                                                                    <li key={i} className="flex items-start gap-2">
                                                                                        <CheckCircle size={12} className="text-emerald-500 mt-0.5 shrink-0" />
                                                                                        <span>{b}</span>
                                                                                    </li>
                                                                                ))}
                                                                            </ul>
                                                                        </div>

                                                                        <div className={`p-2 rounded-lg ${colorScheme} border`}>
                                                                            <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1">Why Choose This:</p>
                                                                            <p className="text-[10px] text-slate-700 font-semibold leading-snug">
                                                                                {meta.whyChoose}
                                                                            </p>
                                                                        </div>
                                                                    </div>

                                                                    <div className={`mt-4 w-full py-2.5 rounded-lg text-center text-[11px] font-black uppercase tracking-widest transition-all font-sans ${isSelected ? 'bg-[#23471d] text-white shadow-lg' : 'bg-slate-50 text-slate-400 group-hover:bg-emerald-600 group-hover:text-white'}`}>
                                                                        👉 {meta.cta || "Select Plan"}
                                                                    </div>
                                                                </div>
                                                            );
                                                        })}

                                                        {/* Membership Trigger Card */}
                                                        <div
                                                            onClick={() => setShowMembershipOptions(true)}
                                                            className="relative p-3 border-2 border-dashed border-emerald-300 bg-emerald-50/20 transition-all cursor-pointer rounded-xl flex flex-col justify-center items-center text-center hover:border-emerald-500 hover:bg-emerald-50/40 h-full min-h-[200px] font-sans"
                                                        >
                                                            <h4 className="text-[14px] font-black text-emerald-800 mb-1 font-sans">Membership Option</h4>
                                                            <div className={`text-[11px] text-emerald-500 font-bold uppercase mt-2 px-4 py-1.5 border border-emerald-200 rounded-full bg-white shadow-sm font-sans`}>View More Plans →</div>
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <div className="space-y-4">
                                                        <div className="flex items-center justify-between px-2">
                                                            <div className="flex items-center gap-2">
                                                                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                                                                <p className="text-[11px] font-black text-slate-600 uppercase tracking-[0.2em] font-sans">Exclusive Membership Plans</p>
                                                            </div>
                                                            <Button type="button" onClick={() => setShowMembershipOptions(false)} variant="ghost" className={`h-8 text-[11px] text-emerald-700 font-black hover:bg-emerald-50 border border-emerald-100 ${buttonTextClasses}`}>← Back</Button>
                                                        </div>

                                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-stretch">
                                                            {membershipPackages.map((pkg: any) => {
                                                                const meta = PACKAGE_METADATA[pkg.name] || {};
                                                                const isSelected = formData.registrationCategory === pkg.name;

                                                                let colorScheme = 'border-blue-400 bg-blue-50/10';
                                                                let accentColor = 'text-blue-700';
                                                                let badgeColor = 'bg-blue-500';

                                                                if (meta.color === 'yellow') {
                                                                    colorScheme = 'border-amber-400 bg-amber-50/10';
                                                                    accentColor = 'text-amber-700';
                                                                    badgeColor = 'bg-amber-400';
                                                                } else if (meta.color === 'red') {
                                                                    colorScheme = 'border-red-400 bg-red-50/10';
                                                                    accentColor = 'text-red-700';
                                                                    badgeColor = 'bg-red-500';
                                                                } else if (meta.color === 'green') {
                                                                    colorScheme = 'border-emerald-400 bg-emerald-50/10';
                                                                    accentColor = 'text-emerald-700';
                                                                    badgeColor = 'bg-emerald-500';
                                                                }

                                                                return (
                                                                    <div
                                                                        key={pkg.name}
                                                                        onClick={() => handlePackageSelection(pkg)}
                                                                        className={`relative p-5 border-2 transition-all cursor-pointer rounded-xl flex flex-col h-full font-sans group ${isSelected ? `border-[#23471d] bg-white shadow-2xl ring-4 ring-emerald-100 scale-[1.02] z-10` : `border-slate-200 bg-white hover:border-emerald-300 hover:shadow-lg`}`}
                                                                    >
                                                                        {meta.badge && (
                                                                            <div className={`absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest shadow-sm z-20 text-white ${badgeColor}`}>
                                                                                ⭐ {meta.badge}
                                                                            </div>
                                                                        )}

                                                                        <div className="mb-3">
                                                                            <h4 className="text-[15px] font-black leading-tight text-slate-800 font-sans group-hover:text-[#23471d] transition-colors">
                                                                                {pkg.name} – ₹{pkg.price}
                                                                            </h4>
                                                                            <p className={`text-[10px] font-bold uppercase tracking-tight mt-1 ${accentColor}`}>
                                                                                {meta.tagline}
                                                                            </p>
                                                                        </div>

                                                                        <div className="flex-1 space-y-4">
                                                                            <p className="text-[11px] text-slate-500 leading-relaxed italic border-l-2 border-slate-200 pl-2">
                                                                                {meta.description}
                                                                            </p>

                                                                            <div className="space-y-1.5">
                                                                                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">What You Get:</p>
                                                                                <ul className="text-[11px] text-slate-700 space-y-1.5 font-medium font-sans">
                                                                                    {pkg.benefits.map((b: string, i: number) => (
                                                                                        <li key={i} className="flex items-start gap-2">
                                                                                            <CheckCircle size={12} className="text-emerald-500 mt-0.5 shrink-0" />
                                                                                            <span>{b}</span>
                                                                                        </li>
                                                                                    ))}
                                                                                </ul>
                                                                            </div>

                                                                            <div className={`p-2 rounded-lg ${colorScheme} border`}>
                                                                                <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1">Why Choose This:</p>
                                                                                <p className="text-[10px] text-slate-700 font-semibold leading-snug">
                                                                                    {meta.whyChoose}
                                                                                </p>
                                                                            </div>
                                                                        </div>

                                                                        <div className={`mt-4 w-full py-2.5 rounded-lg text-center text-[11px] font-black uppercase tracking-widest transition-all font-sans ${isSelected ? 'bg-[#23471d] text-white shadow-lg' : 'bg-slate-50 text-slate-400 group-hover:bg-emerald-600 group-hover:text-white'}`}>
                                                                            👉 {meta.cta || "Select Plan"}
                                                                        </div>
                                                                    </div>
                                                                );
                                                            })}
                                                        </div>
                                                        <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 flex items-start gap-3 mt-4">
                                                            <AlertTriangle size={16} className="text-amber-600 shrink-0 mt-0.5" />
                                                            <p className="text-[11px] font-medium text-amber-800 leading-relaxed">
                                                                <span className="font-black uppercase tracking-wider">⚠️ Important Note:</span> Expo entry is free for all visitors. Buyer–Seller Meet is conducted by the International Council of AYUSH (ICOA) at IHWE, ensuring curated B2B interactions and high-quality business engagement.
                                                            </p>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                    </div>



                                </form>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </section>

            {/* Comprehensive Terms & Conditions Modal with Policies */}
            <AnimatePresence>
                {showTermsModal && tempSelectedPackage && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm overflow-y-auto"
                    >
                        <motion.div
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 20 }}
                            className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] flex flex-col overflow-hidden"
                        >
                            {/* Header */}
                            <div className="bg-[#23471d] p-4 text-white flex justify-between items-center sticky top-0 z-10">
                                <div>
                                    <h3 className="font-bold uppercase tracking-wider text-sm font-sans">Registration & Payment Terms</h3>
                                    <p className="text-[9px] text-emerald-300 uppercase tracking-[0.2em] font-medium font-sans">
                                        {tempSelectedPackage?.name} - ₹{tempSelectedPackage?.price}
                                    </p>
                                </div>
                                <button onClick={() => setShowTermsModal(false)} className="hover:rotate-90 transition-transform text-white">
                                    ✕
                                </button>
                            </div>

                            {/* Policy Tabs */}
                            <div className="flex border-b bg-slate-50 sticky top-[57px] z-10">
                                <button
                                    onClick={() => setActivePolicyTab('payment')}
                                    className={`flex-1 px-4 py-2.5 text-[11px] font-black uppercase tracking-wider transition-all flex items-center justify-center gap-2 ${activePolicyTab === 'payment' ? 'bg-white text-[#23471d] border-b-2 border-[#23471d]' : 'text-slate-500 hover:text-[#23471d]'}`}
                                >
                                    <FileText size={14} /> 1. Payment Terms
                                </button>
                                <button
                                    onClick={() => policyConsents.paymentTerms && setActivePolicyTab('refund')}
                                    disabled={!policyConsents.paymentTerms}
                                    className={`flex-1 px-4 py-2.5 text-[11px] font-black uppercase tracking-wider transition-all flex items-center justify-center gap-2 ${activePolicyTab === 'refund' ? 'bg-white text-[#23471d] border-b-2 border-[#23471d]' : 'text-slate-500 hover:text-[#23471d]'} disabled:opacity-50 disabled:cursor-not-allowed`}
                                >
                                    <AlertTriangle size={14} /> 2. Refund Policy
                                </button>
                                <button
                                    onClick={() => policyConsents.refundPolicy && setActivePolicyTab('privacy')}
                                    disabled={!policyConsents.refundPolicy}
                                    className={`flex-1 px-4 py-2.5 text-[11px] font-black uppercase tracking-wider transition-all flex items-center justify-center gap-2 ${activePolicyTab === 'privacy' ? 'bg-white text-[#23471d] border-b-2 border-[#23471d]' : 'text-slate-500 hover:text-[#23471d]'} disabled:opacity-50 disabled:cursor-not-allowed`}
                                >
                                    <Lock size={14} /> 3. Privacy Policy
                                </button>
                            </div>

                            {/* Policy Content */}
                            <div className="p-6 overflow-y-auto text-[12px] leading-relaxed text-slate-600 space-y-4 font-medium custom-scrollbar font-sans flex-1">
                                {loadingPolicies ? (
                                    <div className="flex flex-col items-center justify-center py-20 gap-3">
                                        <Loader2 className="animate-spin text-emerald-500" size={32} />
                                        <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">Loading Legal Terms...</p>
                                    </div>
                                ) : (
                                    <>
                                        {activePolicyTab === 'payment' && (
                                            <div className="space-y-4">
                                                <div className="bg-red-50 border-l-4 border-red-500 p-3 rounded">
                                                    <p className="text-red-700 font-bold text-[11px] uppercase">⚠️ IMPORTANT: STRICT NO REFUND POLICY</p>
                                                    <p className="text-red-600 text-[11px] mt-1">All payments are FINAL, NON-REFUNDABLE, and NON-TRANSFERABLE under any circumstances.</p>
                                                </div>
                                                <div
                                                    className="policy-content"
                                                    dangerouslySetInnerHTML={{ __html: policiesData['payment']?.content || '<p class="text-slate-400">Loading payment terms...</p>' }}
                                                />
                                            </div>
                                        )}

                                        {activePolicyTab === 'refund' && (
                                            <div className="space-y-4">
                                                <div className="bg-red-50 border-l-4 border-red-500 p-3 rounded">
                                                    <p className="text-red-700 font-bold text-[11px] uppercase">⚠️ STRICT NO REFUND POLICY</p>
                                                    <p className="text-red-600 text-[11px] mt-1">All payments made to Namo Gange Wellness Pvt. Ltd. are strictly non-refundable and non-transferable.</p>
                                                </div>
                                                <div
                                                    className="policy-content"
                                                    dangerouslySetInnerHTML={{ __html: policiesData['refund']?.content || '<p class="text-slate-400">Loading refund policy...</p>' }}
                                                />
                                            </div>
                                        )}

                                        {activePolicyTab === 'privacy' && (
                                            <div className="space-y-4">
                                                <div
                                                    className="policy-content"
                                                    dangerouslySetInnerHTML={{ __html: policiesData['privacy']?.content || '<p class="text-slate-400">Loading privacy policy...</p>' }}
                                                />
                                            </div>
                                        )}
                                    </>
                                )}
                            </div>

                            {/* Footer with Consent Checkboxes */}
                            <div className="p-4 bg-slate-50 border-t border-slate-200 flex flex-col gap-3 sticky bottom-0">
                                <div className="space-y-2">
                                    {activePolicyTab === 'payment' && (
                                        <div className="flex items-start gap-3 p-2 bg-white rounded border border-emerald-100 shadow-sm animate-in fade-in slide-in-from-bottom-2">
                                            <Checkbox
                                                id="consent-payment"
                                                checked={policyConsents.paymentTerms}
                                                onCheckedChange={(checked) => setPolicyConsents(prev => ({ ...prev, paymentTerms: !!checked }))}
                                            />
                                            <Label htmlFor="consent-payment" className="text-[11px] leading-tight text-slate-700 font-medium cursor-pointer">
                                                I have read, understood, and agree to the <span className="font-bold text-[#23471d]">Payment Terms & Conditions</span>, including the strictly non-refundable and non-transferable policy.
                                            </Label>
                                        </div>
                                    )}

                                    {activePolicyTab === 'refund' && (
                                        <div className="flex items-start gap-3 p-2 bg-white rounded border border-red-100 shadow-sm animate-in fade-in slide-in-from-bottom-2">
                                            <Checkbox
                                                id="consent-refund"
                                                checked={policyConsents.refundPolicy}
                                                onCheckedChange={(checked) => setPolicyConsents(prev => ({ ...prev, refundPolicy: !!checked }))}
                                            />
                                            <Label htmlFor="consent-refund" className="text-[11px] leading-tight text-slate-700 font-medium cursor-pointer">
                                                I have read, understood, and agree to the <span className="font-bold text-red-600">Refund & Cancellation Policy</span>, acknowledging that all payments are strictly non-refundable.
                                            </Label>
                                        </div>
                                    )}

                                    {activePolicyTab === 'privacy' && (
                                        <div className="flex items-start gap-3 p-2 bg-white rounded border border-emerald-100 shadow-sm animate-in fade-in slide-in-from-bottom-2">
                                            <Checkbox
                                                id="consent-privacy"
                                                checked={policyConsents.privacyPolicy}
                                                onCheckedChange={(checked) => setPolicyConsents(prev => ({ ...prev, privacyPolicy: !!checked }))}
                                            />
                                            <Label htmlFor="consent-privacy" className="text-[11px] leading-tight text-slate-700 font-medium cursor-pointer">
                                                I hereby provide my consent for the collection, processing, storage, and sharing of my personal data in accordance with the <span className="font-bold text-[#23471d]">Privacy Policy</span>.
                                            </Label>
                                        </div>
                                    )}
                                </div>

                                <div className="flex gap-2 mt-2">
                                    <Button
                                        variant="outline"
                                        onClick={() => setShowTermsModal(false)}
                                        className={`flex-1 h-9 text-xs font-sans ${buttonTextClasses}`}
                                    >
                                        Cancel
                                    </Button>
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
                                        className={`flex-1 h-9 bg-[#23471d] hover:bg-[#1a3516] text-white ${buttonTextClasses} disabled:opacity-50 disabled:cursor-not-allowed`}
                                    >
                                        {activePolicyTab === 'payment' && "Agree & Continue to Refund Policy →"}
                                        {activePolicyTab === 'refund' && "Agree & Continue to Privacy Policy →"}
                                        {activePolicyTab === 'privacy' && "Agree & Proceed to Payment 💳"}
                                    </Button>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* ── PAYMENT CONFIRMATION MODAL ── */}
            <AnimatePresence>
                {showPaymentConfirmModal && tempSelectedPackage && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
                    >
                        <motion.div
                            initial={{ scale: 0.85, y: 30 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.85, y: 30 }}
                            className="bg-white rounded-xl shadow-2xl max-w-lg w-full overflow-hidden font-sans border border-slate-200"
                        >
                            {/* Header */}
                            <div className="bg-[#23471d] px-6 py-4 flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                                    <CreditCard size={20} className="text-emerald-300" />
                                </div>
                                <div>
                                    <h3 className="text-white font-black uppercase tracking-wider text-sm">Payment Confirmation</h3>
                                    <p className="text-emerald-300 text-[10px] font-bold uppercase tracking-widest">{tempSelectedPackage?.name} — ₹{tempSelectedPackage?.price}</p>
                                </div>
                            </div>

                            {/* Body */}
                            <div className="p-6 space-y-5">
                                {/* Non-refundable notice */}
                                <div className="bg-red-50 border-2 border-red-400 rounded-lg p-4 flex items-start gap-3">
                                    <Ban size={22} className="text-red-600 shrink-0 mt-0.5" />
                                    <div>
                                        <p className="text-red-700 font-black text-sm uppercase tracking-wide mb-1">
                                            ⚠️ IMPORTANT NOTICE
                                        </p>
                                        <p className="text-red-600 text-[13px] font-semibold leading-relaxed">
                                            All payments are{" "}
                                            <span className="bg-red-600 text-white px-1.5 py-0.5 rounded font-black text-[12px] mx-0.5">NON-REFUNDABLE</span>{" "}
                                            and{" "}
                                            <span className="bg-red-600 text-white px-1.5 py-0.5 rounded font-black text-[12px] mx-0.5">NON-TRANSFERABLE</span>.
                                        </p>
                                    </div>
                                </div>

                                {/* Package summary */}
                                <div className="bg-emerald-50/60 border border-emerald-200 rounded-lg p-4 space-y-2">
                                    <p className="text-[10px] font-black text-emerald-700 uppercase tracking-widest">You are about to pay for:</p>
                                    <div className="flex justify-between items-center">
                                        <span className="text-slate-800 font-bold text-sm">{tempSelectedPackage?.name}</span>
                                        <span className="text-[#23471d] font-black text-xl">₹{tempSelectedPackage?.price}</span>
                                    </div>
                                    <p className="text-[11px] text-slate-500 font-medium">9th International Health &amp; Wellness Expo 2026</p>
                                </div>

                                <p className="text-slate-500 text-[12px] leading-relaxed text-center">
                                    By proceeding, you confirm that you have read and agreed to all policies.
                                </p>
                            </div>

                            {/* Actions */}
                            <div className="px-6 pb-6 grid grid-cols-2 gap-3">
                                <Button
                                    variant="outline"
                                    onClick={() => setShowPaymentConfirmModal(false)}
                                    className="h-11 border-slate-300 text-slate-600 font-black text-[11px] uppercase tracking-wider rounded-lg hover:bg-slate-50"
                                >
                                    Cancel
                                </Button>
                                <Button
                                    onClick={() => initiateRazorpayPayment()}
                                    className="h-11 bg-[#23471d] hover:bg-[#1a3516] text-white font-black text-[11px] uppercase tracking-wider rounded-lg shadow-lg flex items-center justify-center gap-2 transition-all hover:scale-[1.02]"
                                >
                                    <CreditCard size={14} />
                                    Proceed to Pay
                                </Button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

// Error Display Component
const ErrorDisplay = ({ name, errors }: { name: string; errors: Record<string, string> }) => (
    errors[name] ? <span className="text-red-500 text-[10px] mt-0.5 block h-3 font-medium animate-in fade-in slide-in-from-top-1">{errors[name]}</span> : <div className="h-3" />
);

export default BuyerRegistration;