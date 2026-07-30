
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
    ChevronsUpDown
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, SelectGroup, SelectLabel } from "@/components/ui/select";
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuTrigger,
    DropdownMenuSeparator
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import HeroBg from "@/assets/buyer.webp";
import { buyerRegistrationApi, heroBackgroundApi, SERVER_URL, crmApi, otpApi, policyApi } from "@/lib/api";
import { toast } from "sonner";
import { useRef, useEffect as useEffectDropdown } from "react";


interface MultiSelectDropdownProps {
    options: string[];
    selected: string[];
    onChange: (selected: string[]) => void;
    placeholder?: string;
    error?: boolean;
    accentColor?: string;
    badgeColor?: string;
}

const MultiSelectDropdown = ({
    options,
    selected,
    onChange,
    placeholder = "Select options",
    error = false,
    accentColor = "emerald",
    badgeColor = "emerald",
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
                onClick={() => setOpen((p) => !p)}
                className={`w-full min-h-[32px] px-3 py-1.5 rounded-[2px] border text-left text-[12px] font-medium bg-white transition-all outline-none flex items-center justify-between gap-2 flex-wrap
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



const BuyerRegistration = () => {
    const isComingSoon = false;
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
    const [openRoleGroup, setOpenRoleGroup] = useState<string | null>("Trade & Distribution");

    const initialFormState = {
        fullName: "",
        designation: "",
        companyName: "",
        businessType: "",
        mobileNumber: "",
        alternateNumber: "",
        emailAddress: "",
        website: "",
        brandName: "",
        pinCode: "",
        country: "India",
        stateProvince: "",
        city: "",
        registeredAddress: "",
        companyFirmName: "",
        basicBusinessType: "",
        yearOfEstablishment: "",
        gstNumber: "",
        panNumber: "",
        natureOfBusiness: "",
        yearsInBusiness: "",
        numberOfOutlets: "",
        annualTurnover: "",
        buyerIndustry: "",
        buyingFrequency: "",
        estimatedAnnualPurchaseValue: "",
        primaryProductInterest: "",
        secondaryProductCategories: [] as string[],
        specificProductRequirements: "",
        estimatedPurchaseVolume: "",
        budgetRange: "",
        purchaseFrequency: "",
        businessModelPreference: "",
        b2bMeetInterest: "Yes",
        interestedInImporting: "No",
        interestedInExporting: "No",
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
        preferredMeetingCategories: [] as string[],
        preferredExhibitorTypes: [] as string[],
        numberOfMeetingsInterested: "",
        meetingObjectives: [] as string[],
        preferredBusinessTypes: [] as string[],
        meetingRequirements: "",
        preferredMeetingDay: "",
        meetingPriorityLevel: "Medium",
        remarks: "",
        registrationCategory: "",
        registrationFee: "₹0",
        paymentMode: "Online/Razorpay",
        transactionId: "",
        paymentProof: null as File | null,
        otherBusinessType: "",
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

    const handleSelectChange = (name: string, value: string | string[]) => {
        setErrors(prev => ({ ...prev, [name]: "" }));

        if (name === 'country') {
            setFormData(prev => ({ ...prev, country: value as string, stateProvince: '', city: '' }));
            return;
        }
        if (name === 'stateProvince') {
            setFormData(prev => ({ ...prev, stateProvince: value as string, city: '' }));
            return;
        }

        setFormData(prev => {
            const next = { ...prev, [name]: value };
            if (name === 'businessType' && !value.toString().toLowerCase().includes('other')) {
                next.otherBusinessType = "";
            }
            return next;
        });
    };

    const isFormValidForPayment = () => {

        const requiredFields = [
            'fullName', 'designation', 'companyName', 'businessType',
            'emailAddress', 'mobileNumber', 'registeredAddress', 'pinCode',
            'stateProvince', 'city', 'companyFirmName', 'basicBusinessType', 'yearOfEstablishment',
            'natureOfBusiness', 'yearsInBusiness', 'numberOfOutlets', 'annualTurnover',
            'buyerIndustry', 'primaryProductInterest',
            'estimatedAnnualPurchaseValue', 'purchaseTimeline', 'roleInPurchaseDecision',
            'matchmakingInterest'
        ];


        if (formData.requirePreScheduledB2B === 'Yes') {
            requiredFields.push('preferredMeetingDay', 'preferredTimeSlot');
        }

        for (const field of requiredFields) {
            if (!formData[field as keyof typeof formData]) {
                return false;
            }
        }


        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.emailAddress)) {
            return false;
        }

        if (!/^\d{10}$/.test(formData.mobileNumber)) {
            return false;
        }


        if (formData.preferredSupplierRegion.length === 0) {
            return false;
        }
        if (formData.preferredSupplierType.length === 0) {
            return false;
        }


        if (formData.requirePreScheduledB2B === 'Yes') {
            if (formData.preferredMeetingCategories.length === 0) return false;
            if (formData.meetingObjectives.length === 0) return false;
            if (formData.preferredBusinessTypes.length === 0) return false;
        }

        if (!emailOtpVerified || !mobileOtpVerified) {
            return false;
        }

        return true;
    };

    const validateForm = (skipPackageCheck = false) => {
        let isValid = true;
        const newErrors: Record<string, string> = {};

        const fieldsToValidate = [
            'fullName', 'designation', 'companyName', 'businessType',
            'emailAddress', 'mobileNumber', 'registeredAddress', 'pinCode',
            'stateProvince', 'city', 'companyFirmName', 'basicBusinessType', 'yearOfEstablishment',
            'natureOfBusiness', 'yearsInBusiness', 'numberOfOutlets', 'annualTurnover',
            'primaryProductInterest',
            'estimatedAnnualPurchaseValue', 'purchaseTimeline', 'roleInPurchaseDecision',
            'matchmakingInterest', 'registrationCategory'
        ];


        if (formData.requirePreScheduledB2B === 'Yes') {
            fieldsToValidate.push('preferredMeetingDay', 'preferredTimeSlot');
        }

        fieldsToValidate.forEach(field => {
            if (skipPackageCheck && field === 'registrationCategory') return;
            if (!formData[field as keyof typeof formData]) {
                newErrors[field] = "This field is required";
                isValid = false;
            }
        });


        if (formData.emailAddress && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.emailAddress)) {
            newErrors.emailAddress = "Invalid email format";
            isValid = false;
        }

        if (formData.mobileNumber && !/^\d{10}$/.test(formData.mobileNumber)) {
            newErrors.mobileNumber = "Mobile number must be exactly 10 digits";
            isValid = false;
        }


        if (formData.preferredSupplierRegion.length === 0) {
            newErrors.preferredSupplierRegion = "Select at least one region";
            isValid = false;
        }
        if (formData.preferredSupplierType.length === 0) {
            newErrors.preferredSupplierType = "Select at least one type";
            isValid = false;
        }


        if (formData.requirePreScheduledB2B === 'Yes') {
            if (formData.preferredMeetingCategories.length === 0) {
                newErrors.preferredMeetingCategories = "Select at least one category";
                isValid = false;
            }
            if (formData.meetingObjectives.length === 0) {
                newErrors.meetingObjectives = "Select at least one objective";
                isValid = false;
            }
            if (formData.preferredBusinessTypes.length === 0) {
                newErrors.preferredBusinessTypes = "Select business types";
                isValid = false;
            }
        }


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

        const isValid = validateForm(true);

        if (!isValid) {

            const requiredBase = [
                'fullName', 'designation', 'companyName', 'businessType',
                'emailAddress', 'mobileNumber', 'registeredAddress', 'pinCode',
                'stateProvince', 'city', 'companyFirmName', 'basicBusinessType', 'yearOfEstablishment',
                'natureOfBusiness', 'yearsInBusiness', 'numberOfOutlets', 'annualTurnover',
                'buyerIndustry', 'primaryProductInterest',
                'estimatedAnnualPurchaseValue', 'purchaseTimeline', 'roleInPurchaseDecision',
                'matchmakingInterest'
            ];

            const b2bFields = formData.requirePreScheduledB2B === 'Yes'
                ? ['preferredMeetingDay', 'preferredTimeSlot', 'preferredMeetingCategories', 'meetingObjectives', 'preferredBusinessTypes']
                : [];

            const allToCheck = [...requiredBase, ...b2bFields];
            const missing = allToCheck.filter(f => {
                const val = formData[f as keyof typeof formData];
                return Array.isArray(val) ? val.length === 0 : !val;
            });

            const fieldNames: Record<string, string> = {
                fullName: "Full Name",
                designation: "Designation",
                companyName: "Company Name",
                businessType: "Business Role",
                emailAddress: "Email Address",
                mobileNumber: "Mobile Number",
                registeredAddress: "Address",
                pinCode: "Pin Code",
                stateProvince: "State",
                city: "City",
                companyFirmName: "Firm Name",
                basicBusinessType: "Firm Type",
                yearOfEstablishment: "Year of Establishment",
                natureOfBusiness: "Nature of Business",
                yearsInBusiness: "Years in Business",
                numberOfOutlets: "Number of Outlets",
                annualTurnover: "Annual Turnover",
                buyerIndustry: "Buyer Industry",
                primaryProductInterest: "Primary Product Interest",
                estimatedAnnualPurchaseValue: "Annual Purchase Value",
                purchaseTimeline: "Purchase Timeline",
                roleInPurchaseDecision: "Purchase Decision Role",
                matchmakingInterest: "Matchmaking Interest",
                preferredMeetingDay: "Meeting Day",
                preferredTimeSlot: "Time Slot",
                preferredMeetingCategories: "Meeting Categories",
                meetingObjectives: "Meeting Objectives",
                preferredBusinessTypes: "B2B Business Types"
            };

            const missingList = missing.map(f => fieldNames[f] || f).join(', ');

            toast.error(`⚠️ Missing fields: ${missingList}. Please check highlighted sections.`);


            setTimeout(() => {
                const firstError = document.querySelector('.border-red-400, .text-red-500, [data-error="true"]');
                if (firstError) {
                    firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            }, 100);
            return;
        }

        if (!isFormValidForPayment()) {
            toast.error("⚠️ Please verify OTP and complete all required sections.");
            return;
        }

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
        const gatewayPrice = Math.round(tempSelectedPackage.price * 1.025);

        const options = {
            key: import.meta.env.VITE_RAZORPAY_KEY_ID || "",
            amount: gatewayPrice * 100,
            currency: "INR",
            name: "IHWE 2026",
            description: `${tempSelectedPackage.name} Registration (incl. 2.5% gateway fee)`,
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

        razorpay.on('payment.failed', async function (response: any) {
            toast.error(`Payment failed: ${response.error?.description || "Unknown error"}`);
            try {
                const finalBusinessType = formData.businessType.toString().toLowerCase().includes('other') && formData.otherBusinessType
                    ? formData.otherBusinessType
                    : formData.businessType;

                await buyerRegistrationApi.submit({
                    ...formData,
                    businessType: finalBusinessType,
                    registrationCategory: tempSelectedPackage?.name,
                    registrationFee: `₹${tempSelectedPackage?.price}`,
                    paymentStatus: "Failed",
                    transactionId: response.error?.metadata?.payment_id || "FAILED",
                    consentTerms: true,
                    consentPaymentValid: true,
                    consentMatchedExhibitors: true
                });
            } catch (error) {
                console.error("Error saving failed payment entry:", error);
            }
            setShowTermsModal(false);
            setShowPaymentConfirmModal(false);
        });

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
            const finalBusinessType = formData.businessType.toString().toLowerCase().includes('other') && formData.otherBusinessType
                ? formData.otherBusinessType
                : formData.businessType;

            const res = await buyerRegistrationApi.submit({
                ...formData,
                businessType: finalBusinessType,
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
    const labelClasses = "text-[12px] font-semibold text-slate-900 mb-0.5 block text-left font-sans ";
    const sectionTitleClasses = "text-[13px] font-black text-[#23471d] pb-1 border-b border-emerald-500/20 flex items-center gap-1.5 mb-3 uppercase tracking-tight font-sans";
    const buttonTextClasses = "text-[11px] font-bold uppercase tracking-wider font-sans";

    if (isComingSoon) {
        return (
            <div className="min-h-screen bg-white font-sans flex flex-col items-center justify-center relative overflow-hidden">

                <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform [transition-duration:20000ms] hover:scale-110"
                    style={{ backgroundImage: `url(${HeroBg})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-br from-[#23471d]/95 via-black/70 to-black/90" />


                <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                    <div className="absolute top-[10%] left-[5%] w-64 h-64 bg-emerald-500/10 rounded-full blur-[100px] animate-pulse" />
                    <div className="absolute bottom-[10%] right-[5%] w-80 h-80 bg-emerald-600/10 rounded-full blur-[120px] animate-pulse" />
                </div>

                <div className="relative z-10 container mx-auto px-6 text-center max-w-4xl">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <Badge className="mb-6 px-4 py-1.5 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[10px] uppercase tracking-[0.3em] font-black rounded-full backdrop-blur-md">
                            Domestic Buyer Registration
                        </Badge>

                        <h1 className="text-5xl md:text-8xl font-serif font-bold text-white mb-8 italic tracking-tighter leading-[1.1]">
                            Opening <span className="text-emerald-400">Soon.</span>
                        </h1>

                        <div className="w-24 h-1 bg-gradient-to-r from-transparent via-emerald-500 to-transparent mx-auto mb-10 opacity-50" />

                        <p className="text-white/70 text-lg md:text-xl mb-12 max-w-2xl mx-auto font-light leading-relaxed tracking-wide">
                            The gateway to India's most exclusive health and wellness sourcing event is almost ready. Prepare for structured B2B networking at IHWE 2026.
                        </p>

                        <div className="flex flex-col md:flex-row items-center justify-center gap-6">
                            <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-2xl flex items-center gap-4 group hover:bg-white/10 transition-all duration-500 cursor-pointer">
                                <div className="w-12 h-12 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform">
                                    <AtSign size={20} />
                                </div>
                                <div className="text-left">
                                    <p className="text-[10px] text-emerald-500 font-black uppercase tracking-widest mb-1">Pre-Register Interest</p>
                                    <p className="text-white font-medium">info@namogangewellness.com</p>
                                </div>
                            </div>

                            <Link to="/">
                                <Button className="h-16 px-10 rounded-2xl bg-white text-black hover:bg-emerald-500 hover:text-white transition-all duration-500 text-sm font-black uppercase tracking-[0.2em] shadow-2xl group">
                                    Explore Expo Site
                                </Button>
                            </Link>
                        </div>

                        <div className="mt-20 flex justify-center gap-12 opacity-40 grayscale hover:grayscale-0 transition-all duration-700">
                            <ShieldCheck className="text-white" size={32} />
                            <Globe className="text-white" size={32} />
                            <Lock className="text-white" size={32} />
                        </div>
                    </motion.div>
                </div>

                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/30 text-[9px] uppercase tracking-[0.5em] font-medium text-center">
                    IHWE 2026 • 9th Edition • Global Wellness Sourcing
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#FDFDFD] font-sans">
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

                                    <div className="space-y-2">
                                        <h3 className={sectionTitleClasses}> Personal & Company Information</h3>
                                        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-3 gap-y-4 gap-x-5">
                                            <div><Label className={labelClasses}>Full Name *</Label><Input required name="fullName" value={formData.fullName} onChange={handleChange} placeholder="As per ID Proof" className={`${inputClasses} ${errors.fullName ? 'border-red-400' : ''}`} /><ErrorDisplay name="fullName" errors={errors} /></div>
                                            <div><Label className={labelClasses}>Designation *</Label><Input required name="designation" value={formData.designation} onChange={handleChange} placeholder="Current Position" className={`${inputClasses} ${errors.designation ? 'border-red-400' : ''}`} /><ErrorDisplay name="designation" errors={errors} /></div>
                                            <div><Label className={labelClasses}>Company Name *</Label><Input required name="companyName" value={formData.companyName} onChange={handleChange} placeholder="Full Registered Name" className={`${inputClasses} ${errors.companyName ? 'border-red-400' : ''}`} /><ErrorDisplay name="companyName" errors={errors} /></div>
                                            <div>
                                                <Label className={labelClasses}>Business Role *</Label>
                                                {!formData.businessType.toString().toLowerCase().includes('other') ? (
                                                    <Select required value={formData.businessType} onValueChange={(v) => handleSelectChange('businessType', v)}>
                                                        <SelectTrigger className={`${inputClasses} ${errors.businessType ? 'border-red-400' : ''}`}>
                                                            <SelectValue placeholder="Select Type" />
                                                        </SelectTrigger>
                                                        <SelectContent side="bottom" className="bg-white font-sans text-[12px] max-h-[300px]">
                                                            {(() => {
                                                                const staticGroups = [
                                                                    { title: 'Trade & Distribution', icon: <Store size={14} />, items: ['Distributor', 'Super Distributor', 'Wholesaler', 'Retailer (Single Store)', 'Retail Chain / Multi-Store', 'Modern Trade Buyer'] },
                                                                    { title: 'Manufacturing & Business', icon: <Factory size={14} />, items: ['Manufacturer', 'Private Label Buyer', 'Franchise Seeker', 'Investor'] },
                                                                    { title: 'International Trade', icon: <Globe size={14} />, items: ['Importer', 'Exporter', 'International Buying Agent'] },
                                                                    { title: 'Online & Digital', icon: <Laptop size={14} />, items: ['E-commerce Seller', 'D2C Brand Owner'] },
                                                                    { title: 'Healthcare & Medical', icon: <HeartPulse size={14} />, items: ['Hospital / Clinic', 'Doctor / Medical Practitioner', 'Pharmacy / Chemist', 'Diagnostic Center'] },
                                                                    { title: 'Wellness & Lifestyle', icon: <Leaf size={14} />, items: ['Spa / Salon Owner', 'Wellness Center', 'Gym / Fitness Center', 'Yoga Studio', 'Nutritionist / Dietician'] },
                                                                    { title: 'Hospitality & Institutional', icon: <Hotel size={14} />, items: ['Wellness Resort / Hospitality', 'Hotel / Resort', 'Corporate Buyer (Procurement / HR)', 'Government / PSU', 'NGO / Trust'] },
                                                                    { title: 'Professionals & Others', icon: <Briefcase size={14} />, items: ['Consultant / Advisor', 'Startup Founder', 'Student / Researcher'] }
                                                                ];

                                                                const backendTypes = config?.companyTypes || [];
                                                                const allListedStaticItems = new Set(staticGroups.flatMap(g => g.items));

                                                                const normalize = (s: string) => s.replace(/^\d+[\s\.)\-]+/, '').trim().toLowerCase();

                                                                return staticGroups.map(group => {
                                                                    const staticNormalized = new Set(group.items.map(normalize));

                                                                    const groupItems = backendTypes.length > 0
                                                                        ? backendTypes.filter((t: string) => staticNormalized.has(normalize(t)))
                                                                        : group.items;

                                                                    if (group.title === 'Professionals & Others' && backendTypes.length > 0) {
                                                                        const allStaticNormalized = new Set([...allListedStaticItems].map(normalize));
                                                                        const unlisted = backendTypes.filter((t: string) => !allStaticNormalized.has(normalize(t)));

                                                                        const existingNames = new Set(groupItems.map(normalize));
                                                                        unlisted.forEach((u: string) => {
                                                                            if (!existingNames.has(normalize(u))) {
                                                                                groupItems.push(u);
                                                                            }
                                                                        });
                                                                    }

                                                                    if (backendTypes.length > 0 && groupItems.length === 0) return null;

                                                                    return (
                                                                        <SelectGroup key={group.title}>
                                                                            <div
                                                                                className="px-2 py-2 text-[11px] font-semibold text-slate-700 bg-emerald-50/50 cursor-pointer flex items-center justify-between hover:bg-emerald-50 border-b border-emerald-100/50 transition-colors"
                                                                                onPointerDown={(e) => {
                                                                                    e.preventDefault();
                                                                                    e.stopPropagation();
                                                                                    setOpenRoleGroup(openRoleGroup === group.title ? null : group.title);
                                                                                }}
                                                                            >
                                                                                <div className="flex items-center gap-2">
                                                                                    <span className="text-emerald-600 opacity-70">{group.icon}</span>
                                                                                    {group.title}
                                                                                </div>
                                                                                <ChevronsUpDown size={12} className="text-slate-400" />
                                                                            </div>
                                                                            {openRoleGroup === group.title && groupItems.map((t: string) => (
                                                                                <SelectItem key={t} value={t} className="pl-6 font-medium text-slate-600 text-[10px]">
                                                                                    {t}
                                                                                </SelectItem>
                                                                            ))}
                                                                        </SelectGroup>
                                                                    );
                                                                });
                                                            })()}
                                                        </SelectContent>
                                                    </Select>
                                                ) : (
                                                    <div className="relative">
                                                        <Input
                                                            name="otherBusinessType"
                                                            value={formData.otherBusinessType}
                                                            onChange={handleChange}
                                                            placeholder="Specify Business Role"
                                                            className={`${inputClasses} pr-8 ${errors.otherBusinessType ? 'border-red-400' : ''}`}
                                                            required
                                                            autoFocus
                                                        />
                                                        <button
                                                            type="button"
                                                            onClick={() => handleSelectChange('businessType', '')}
                                                            className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-red-500 transition-colors"
                                                        >
                                                            <X className="h-3 w-3" />
                                                        </button>
                                                    </div>
                                                )}
                                                <ErrorDisplay name="businessType" errors={errors} />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <h3 className={sectionTitleClasses}>Contact Information</h3>
                                        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-3 gap-y-4 gap-x-5">
                                            <div className="space-y-1">
                                                <Label className={labelClasses}>Mobile Number (10 digits) * <div className="inline-flex w-32 overflow-hidden align-middle ml-2 items-center h-4 relative"><motion.span initial={{ x: "100%" }} animate={{ x: "-100%" }} transition={{ repeat: Infinity, duration: 4, ease: "linear" }} className="text-red-500 text-[10px] uppercase font-semibold whitespace-nowrap absolute">Our team will contact you</motion.span></div></Label>
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


                                    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-3 gap-y-4 gap-x-5">
                                        <div><Label className={labelClasses}>Registered Address *</Label><Input required name="registeredAddress" value={formData.registeredAddress} onChange={handleChange} placeholder="Full Corporate Address" className={`${inputClasses} ${errors.registeredAddress ? 'border-red-400' : ''}`} /><ErrorDisplay name="registeredAddress" errors={errors} /></div>
                                        <div><Label className={labelClasses}>State/Province *</Label><Select value={formData.stateProvince} onValueChange={(v) => handleSelectChange('stateProvince', v)} disabled={loadingLocations.states}><SelectTrigger className={`${inputClasses} ${errors.stateProvince ? 'border-red-400' : ''}`}><SelectValue placeholder={loadingLocations.states ? "Select State" : "Select State"} /></SelectTrigger><SelectContent className="bg-white font-sans text-[12px] max-h-[200px]">{states.map(s => <SelectItem key={s._id} value={s.name}>{s.name}</SelectItem>)}</SelectContent></Select><ErrorDisplay name="stateProvince" errors={errors} /></div>
                                        <div><Label className={labelClasses}>City *</Label><Select value={formData.city} onValueChange={(v) => handleSelectChange('city', v)} disabled={!formData.stateProvince || loadingLocations.cities}><SelectTrigger className={`${inputClasses} ${errors.city ? 'border-red-400' : ''}`}><SelectValue placeholder={loadingLocations.cities ? "Loading..." : "Select City"} /></SelectTrigger><SelectContent className="bg-white font-sans text-[12px] max-h-[200px]">{cities.map(c => <SelectItem key={c._id} value={c.name}>{c.name}</SelectItem>)}</SelectContent></Select><ErrorDisplay name="city" errors={errors} /></div>
                                        <div><Label className={labelClasses}>Pin Code (6 digits) *</Label><Input required name="pinCode" value={formData.pinCode} onChange={handleChange} placeholder="Postal Code" className={`${inputClasses} ${errors.pinCode ? 'border-red-400' : ''}`} maxLength={6} /><ErrorDisplay name="pinCode" errors={errors} /></div>
                                    </div>

                                    <div className="space-y-2">
                                        <h3 className={sectionTitleClasses}> 1. Company Business Profile </h3>
                                        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-3 gap-y-4 gap-x-5">
                                            <div><Label className={labelClasses}>Company / Firm Name *</Label><Input required name="companyFirmName" value={formData.companyFirmName} onChange={handleChange} placeholder="Company / Firm Name" className={`${inputClasses} ${errors.companyFirmName ? 'border-red-400' : ''}`} /><ErrorDisplay name="companyFirmName" errors={errors} /></div>
                                            <div><Label className={labelClasses}>Brand Name</Label><Input name="brandName" value={formData.brandName} onChange={handleChange} placeholder="Brand Name" className={inputClasses} /></div>
                                            <div><Label className={labelClasses}>Business Type *</Label><Select required value={formData.basicBusinessType} onValueChange={(v) => handleSelectChange('basicBusinessType', v)}><SelectTrigger className={`${inputClasses} ${errors.basicBusinessType ? 'border-red-400' : ''}`}><SelectValue placeholder="Select Type" /></SelectTrigger><SelectContent className="bg-white font-sans text-[12px]">{['Proprietorship', 'Partnership', 'Pvt Ltd', 'LLP', 'Others'].map((t: string) => <SelectItem key={t} value={t}>{t}</SelectItem>)}</SelectContent></Select><ErrorDisplay name="basicBusinessType" errors={errors} /></div>
                                            <div><Label className={labelClasses}>Year of Establishment *</Label><Input required name="yearOfEstablishment" value={formData.yearOfEstablishment} onChange={handleChange} placeholder="e.g. 2010" className={`${inputClasses} ${errors.yearOfEstablishment ? 'border-red-400' : ''}`} /><ErrorDisplay name="yearOfEstablishment" errors={errors} /></div>
                                            <div><Label className={labelClasses}>GST Number <span className="font-normal text-slate-500">(Optional but recommended)</span></Label><Input name="gstNumber" value={formData.gstNumber} onChange={handleChange} placeholder="GST Number" className={inputClasses} /></div>
                                            <div><Label className={labelClasses}>PAN Number <span className="font-normal text-slate-500">(Optional)</span></Label><Input name="panNumber" value={formData.panNumber} onChange={handleChange} placeholder="PAN Number" className={inputClasses} /></div>
                                            <div><Label className={labelClasses}>Buyer Industry *</Label><Select required value={formData.buyerIndustry} onValueChange={(v) => handleSelectChange('buyerIndustry', v)}><SelectTrigger className={`${inputClasses} ${errors.buyerIndustry ? 'border-red-400' : ''}`}><SelectValue placeholder="Choose Industry" /></SelectTrigger><SelectContent side="bottom" className="bg-white font-sans text-[12px] max-h-[300px]">{config?.primaryProductInterests?.map((i: string) => <SelectItem key={i} value={i}>{i}</SelectItem>)}</SelectContent></Select><ErrorDisplay name="buyerIndustry" errors={errors} /></div>
                                        </div>
                                    </div>


                                    <div className="space-y-2 pt-2">
                                        <h3 className={sectionTitleClasses}> 2. Business Profile Details</h3>
                                        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-3 gap-y-4 gap-x-5">
                                            <div><Label className={labelClasses}>Nature of Business *</Label><Input required name="natureOfBusiness" value={formData.natureOfBusiness} onChange={handleChange} placeholder="Short description" className={`${inputClasses} ${errors.natureOfBusiness ? 'border-red-400' : ''}`} /><ErrorDisplay name="natureOfBusiness" errors={errors} /></div>
                                            <div><Label className={labelClasses}>Years in Business *</Label><Input type="number" required name="yearsInBusiness" value={formData.yearsInBusiness} onChange={handleChange} placeholder="e.g. 10" className={`${inputClasses} [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none ${errors.yearsInBusiness ? 'border-red-400' : ''}`} /><ErrorDisplay name="yearsInBusiness" errors={errors} /></div>
                                            <div><Label className={labelClasses}>Number of Outlets / Branches *</Label><Input type="number" required name="numberOfOutlets" value={formData.numberOfOutlets} onChange={handleChange} placeholder="e.g. 5" className={`${inputClasses} [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none ${errors.numberOfOutlets ? 'border-red-400' : ''}`} /><ErrorDisplay name="numberOfOutlets" errors={errors} /></div>
                                            <div><Label className={labelClasses}>Annual Turnover *</Label><Select required value={formData.annualTurnover} onValueChange={(v) => handleSelectChange('annualTurnover', v)}><SelectTrigger className={`${inputClasses} ${errors.annualTurnover ? 'border-red-400' : ''}`}><SelectValue placeholder="Select Range" /></SelectTrigger><SelectContent side="bottom" className="bg-white font-sans text-[12px] max-h-[300px]">{(config?.annualTurnoverRanges || ['Below 50 Lakhs', '50L – 2 Cr', '2 – 10 Cr', '10 Cr+']).map((r: string) => <SelectItem key={r} value={r}>{r}</SelectItem>)}</SelectContent></Select><ErrorDisplay name="annualTurnover" errors={errors} /></div>
                                        </div>
                                    </div>




                                    <div className="space-y-2">
                                        <h3 className={sectionTitleClasses}> Sourcing & Buying Interests</h3>
                                        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-3 gap-y-4 gap-x-5">
                                            <div><Label className={labelClasses}>Primary Product Interest *</Label><Select value={formData.primaryProductInterest} onValueChange={(v) => handleSelectChange('primaryProductInterest', v)}><SelectTrigger className={`${inputClasses} ${errors.primaryProductInterest ? 'border-red-400' : ''}`}><SelectValue placeholder="Choose Interest" /></SelectTrigger><SelectContent className="bg-white font-sans text-[12px]">{config?.primaryProductInterests?.map((i: string) => <SelectItem key={i} value={i}>{i}</SelectItem>)}</SelectContent></Select><ErrorDisplay name="primaryProductInterest" errors={errors} /></div>
                                            <div className="">
                                                <Label className={labelClasses}>Secondary Product Categories</Label>
                                                <div className="mt-1">
                                                    <MultiSelectDropdown
                                                        options={config?.secondaryProductCategories || ['Ayurveda', 'Organic', 'Wellness', 'Pharma', 'Cosmetics']}
                                                        selected={formData.secondaryProductCategories}
                                                        onChange={(val) => handleSelectChange('secondaryProductCategories', val)}
                                                        placeholder="Select categories..."
                                                        accentColor="emerald"
                                                    />
                                                </div>
                                            </div>
                                            <div><Label className={labelClasses}>Interested in Importing Products?</Label><Select value={formData.interestedInImporting} onValueChange={(v) => handleSelectChange('interestedInImporting', v)}><SelectTrigger className={inputClasses}><SelectValue placeholder="Yes / No" /></SelectTrigger><SelectContent className="bg-white font-sans text-[12px]">{['Yes', 'No'].map(o => <SelectItem key={o} value={o}>{o}</SelectItem>)}</SelectContent></Select></div>
                                            <div><Label className={labelClasses}>Interested in Export Partnerships?</Label><Select value={formData.interestedInExporting} onValueChange={(v) => handleSelectChange('interestedInExporting', v)}><SelectTrigger className={inputClasses}><SelectValue placeholder="Yes / No" /></SelectTrigger><SelectContent className="bg-white font-sans text-[12px]">{['Yes', 'No'].map(o => <SelectItem key={o} value={o}>{o}</SelectItem>)}</SelectContent></Select></div>
                                            <div><Label className={labelClasses}>Business Model Preference</Label><Select value={formData.businessModelPreference} onValueChange={(v) => handleSelectChange('businessModelPreference', v)}><SelectTrigger className={inputClasses}><SelectValue placeholder="Select Model" /></SelectTrigger><SelectContent className="bg-white font-sans text-[12px]">{config?.businessModelOptions?.map((m: string) => <SelectItem key={m} value={m}>{m}</SelectItem>)}</SelectContent></Select></div>

                                            <div><Label className={labelClasses}>Estimated Monthly Purchase </Label><Input name="estimatedPurchaseVolume" value={formData.estimatedPurchaseVolume} onChange={handleChange} placeholder="e.g. 5000 " className={inputClasses} /></div>
                                            <div><Label className={labelClasses}>Est. Annual Purchase Value *</Label><Select value={formData.estimatedAnnualPurchaseValue} onValueChange={(v) => handleSelectChange('estimatedAnnualPurchaseValue', v)}><SelectTrigger className={`${inputClasses} ${errors.estimatedAnnualPurchaseValue ? 'border-red-400' : ''}`}><SelectValue placeholder="Select" /></SelectTrigger><SelectContent className="bg-white font-sans text-[12px]">{(config?.annualPurchaseValueRanges || ['Below 10 Lakhs', '10-50 Lakhs', '50 Lakhs - 1 Crore', '1-5 Crore', '5+ Crore']).map(v => <SelectItem key={v} value={v}>{v}</SelectItem>)}</SelectContent></Select><ErrorDisplay name="estimatedAnnualPurchaseValue" errors={errors} /></div>
                                            <div><Label className={labelClasses}>Purchase Frequency</Label><Select value={formData.purchaseFrequency} onValueChange={(v) => handleSelectChange('purchaseFrequency', v)}><SelectTrigger className={inputClasses}><SelectValue placeholder="Select Frequency" /></SelectTrigger><SelectContent className="bg-white font-sans text-[12px]">{config?.purchaseFrequencyOptions?.map((f: string) => <SelectItem key={f} value={f}>{f}</SelectItem>)}</SelectContent></Select></div>


                                            <div><Label className={labelClasses}>Purchase Timeline *</Label><Select value={formData.purchaseTimeline} onValueChange={(v) => handleSelectChange('purchaseTimeline', v)}><SelectTrigger className={`${inputClasses} ${errors.purchaseTimeline ? 'border-red-400' : ''}`}><SelectValue placeholder="Select" /></SelectTrigger><SelectContent className="bg-white font-sans text-[12px]">{(config?.purchaseTimelines || ['Immediate', '1–3 Months', '3–6 Months', 'Exploring']).map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}</SelectContent></Select><ErrorDisplay name="purchaseTimeline" errors={errors} /></div>
                                            <div><Label className={labelClasses}>Matchmaking Interest *</Label><Select value={formData.matchmakingInterest} onValueChange={(v) => handleSelectChange('matchmakingInterest', v)}><SelectTrigger className={`${inputClasses} ${errors.matchmakingInterest ? 'border-red-400' : ''}`}><SelectValue placeholder="Yes/No" /></SelectTrigger><SelectContent className="bg-white font-sans text-[12px]}"><SelectItem value="Yes">Yes</SelectItem><SelectItem value="No">No</SelectItem></SelectContent></Select><ErrorDisplay name="matchmakingInterest" errors={errors} /></div>
                                            <div><Label className={labelClasses}>Role in Purchase Decision *</Label><Select value={formData.roleInPurchaseDecision} onValueChange={(v) => handleSelectChange('roleInPurchaseDecision', v)}><SelectTrigger className={`${inputClasses} ${errors.roleInPurchaseDecision ? 'border-red-400' : ''}`}><SelectValue placeholder="Select Role" /></SelectTrigger><SelectContent className="bg-white font-sans text-[12px]}">{(config?.roles || ['Final Decision Maker', 'Influencer', 'Research Only']).map(r => <SelectItem key={r} value={r}>{r}</SelectItem>)}</SelectContent></Select><ErrorDisplay name="roleInPurchaseDecision" errors={errors} /></div>
                                            <div className="mt-1">
                                                <Label className={labelClasses}>Specific Product Requirements</Label>
                                                <Textarea name="specificProductRequirements" value={formData.specificProductRequirements} onChange={handleChange} className={`${inputClasses} h-auto min-h-[50px] py-1`} placeholder="Any custom needs..." />
                                            </div>
                                        </div>

                                    </div>


                                    <div className="space-y-2">
                                        <h3 className={sectionTitleClasses}> Supplier Preference</h3>
                                        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-3 gap-x-5">
                                            <div className="space-y-1">
                                                <Label className={labelClasses}>Preferred Supplier Region *</Label>
                                                <MultiSelectDropdown
                                                    options={config?.regions || ['North India', 'South India', 'East India', 'West India', 'Pan India', 'Global']}
                                                    selected={formData.preferredSupplierRegion}
                                                    onChange={(val) => { handleSelectChange('preferredSupplierRegion', val); setErrors(p => ({ ...p, preferredSupplierRegion: '' })); }}
                                                    placeholder="Select regions..."
                                                    error={!!errors.preferredSupplierRegion}
                                                    accentColor="emerald"
                                                />
                                                <ErrorDisplay name="preferredSupplierRegion" errors={errors} />
                                            </div>
                                            <div className="space-y-1">
                                                <Label className={labelClasses}>Preferred Supplier Type *</Label>
                                                <MultiSelectDropdown
                                                    options={config?.supplierTypes || ['Manufacturer', 'Exporter', 'MSME', 'Startup', 'Wholesaler']}
                                                    selected={formData.preferredSupplierType}
                                                    onChange={(val) => { handleSelectChange('preferredSupplierType', val); setErrors(p => ({ ...p, preferredSupplierType: '' })); }}
                                                    placeholder="Select supplier types..."
                                                    error={!!errors.preferredSupplierType}
                                                    accentColor="emerald"
                                                />
                                                <ErrorDisplay name="preferredSupplierType" errors={errors} />
                                            </div>
                                            <div className="space-y-1">
                                                <Label className={labelClasses}>Preferred State (Optional)</Label>
                                                <MultiSelectDropdown
                                                    options={states.map(s => s.name)}
                                                    selected={formData.preferredState}
                                                    onChange={(val) => handleSelectChange('preferredState', val)}
                                                    placeholder={states.length === 0 ? "Select country first..." : "Select states..."}
                                                    accentColor="emerald"
                                                />
                                            </div>
                                            <div className="space-y-1">
                                                <Label className={labelClasses}>Preferred Company Size</Label>
                                                <Select value={formData.preferredCompanySize} onValueChange={(v) => handleSelectChange('preferredCompanySize', v)}>
                                                    <SelectTrigger className={inputClasses}><SelectValue placeholder="Select Size" /></SelectTrigger>
                                                    <SelectContent className="bg-white font-sans text-[12px]">{config?.companySizes?.map((s: string) => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent>
                                                </Select>
                                            </div>
                                            <div className="space-y-1">
                                                <Label className={labelClasses}>Certification & Compliance</Label>
                                                <MultiSelectDropdown
                                                    options={config?.certificationOptions || ['ISO', 'GMP', 'FDA', 'AYUSH', 'Organic', 'Others']}
                                                    selected={formData.requiredCertifications}
                                                    onChange={(val) => handleSelectChange('requiredCertifications', val)}
                                                    placeholder="Select certifications..."
                                                    accentColor="slate"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-1">
                                        <h3 className={sectionTitleClasses}>Pricing Preference</h3>
                                        <div className="flex gap-4 p-2">
                                            <label className={`flex items-center gap-1 text-[12px] font-medium text-slate-700 font-sans`}><Checkbox checked={formData.pricingPreference === 'Premium'} onCheckedChange={() => handleSelectChange('pricingPreference', 'Premium')} className="h-3 w-3" /> Premium</label>
                                            <label className={`flex items-center gap-1 text-[12px] font-medium text-slate-700 font-sans`}><Checkbox checked={formData.pricingPreference === 'Mid-Range'} onCheckedChange={() => handleSelectChange('pricingPreference', 'Mid-Range')} className="h-3 w-3" /> Mid-Range</label>
                                            <label className={`flex items-center gap-1 text-[12px] font-medium text-slate-700 font-sans`}><Checkbox checked={formData.pricingPreference === 'Budget'} onCheckedChange={() => handleSelectChange('pricingPreference', 'Budget')} className="h-3 w-3" /> Budget</label>
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <h3 className={sectionTitleClasses}> B2B Meeting Preferences</h3>




                                        {formData.requirePreScheduledB2B === 'Yes' && (
                                            <div className="space-y-4 animate-in fade-in slide-in-from-top-2 duration-300">


                                                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">

                                                    <div className="space-y-1.5">
                                                        <div className="flex justify-between items-center mb-1">
                                                            <Label className="text-[11px] font-semibold">Preferred Meeting Categories *</Label>
                                                            {formData.preferredMeetingCategories.length === 0 &&
                                                                <span className="text-[9px] text-red-500 font-bold">Required</span>
                                                            }
                                                        </div>
                                                        <MultiSelectDropdown
                                                            options={config?.meetingCategoryOptions || []}
                                                            selected={formData.preferredMeetingCategories}
                                                            onChange={(val) => { handleSelectChange('preferredMeetingCategories', val); setErrors(p => ({ ...p, preferredMeetingCategories: '' })); }}
                                                            placeholder="Select categories..."
                                                            error={!!errors.preferredMeetingCategories}
                                                            accentColor="emerald"
                                                        />
                                                        <ErrorDisplay name="preferredMeetingCategories" errors={errors} />
                                                    </div>


                                                    <div className="space-y-1.5">
                                                        <Label className="text-[11px] font-semibold mb-1 block">Exhibitor Types to Meet</Label>
                                                        <MultiSelectDropdown
                                                            options={config?.exhibitorTypeOptions || []}
                                                            selected={formData.preferredExhibitorTypes}
                                                            onChange={(val) => handleSelectChange('preferredExhibitorTypes', val)}
                                                            placeholder="Select exhibitor types..."
                                                            accentColor="emerald"
                                                        />
                                                    </div>


                                                    <div className="space-y-1.5">
                                                        <Label className="text-[11px] font-semibold mb-1 block">💼 Meeting Objectives *</Label>
                                                        <MultiSelectDropdown
                                                            options={config?.meetingObjectiveOptions || ["Product Sourcing", "Partnership / Collaboration", "Distribution Opportunities", "Private Label / OEM", "Investment / Business Expansion"]}
                                                            selected={formData.meetingObjectives}
                                                            onChange={(val) => { handleSelectChange('meetingObjectives', val); setErrors(p => ({ ...p, meetingObjectives: '' })); }}
                                                            placeholder="Select objectives..."
                                                            error={!!errors.meetingObjectives}
                                                            accentColor="amber"
                                                        />
                                                        <ErrorDisplay name="meetingObjectives" errors={errors} />
                                                    </div>


                                                    <div className="space-y-1.5">
                                                        <Label className="text-[11px] font-semibold mb-1 block">🏷 Preferred Business Type *</Label>
                                                        <MultiSelectDropdown
                                                            options={config?.preferredBusinessTypeOptions || ["Bulk Purchase", "Private Label", "Franchise", "Exclusive Distribution"]}
                                                            selected={formData.preferredBusinessTypes}
                                                            onChange={(val) => { handleSelectChange('preferredBusinessTypes', val); setErrors(p => ({ ...p, preferredBusinessTypes: '' })); }}
                                                            placeholder="Select business types..."
                                                            error={!!errors.preferredBusinessTypes}
                                                            accentColor="blue"
                                                        />
                                                        <ErrorDisplay name="preferredBusinessTypes" errors={errors} />
                                                    </div>
                                                </div>


                                                <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                                                    <div>
                                                        <Label className={labelClasses}>Preferred Day *</Label>
                                                        <Select value={formData.preferredMeetingDay} onValueChange={(v) => handleSelectChange('preferredMeetingDay', v)}>
                                                            <SelectTrigger className={`${inputClasses} ${errors.preferredMeetingDay ? 'border-red-400' : ''}`}>
                                                                <SelectValue placeholder="Select Day" />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                {(config?.meetingDayOptions || ["Day 1", "Day 2", "Day 3"]).map(d =>
                                                                    <SelectItem key={d} value={d} className="text-[12px]">{d}</SelectItem>
                                                                )}
                                                            </SelectContent>
                                                        </Select>
                                                        <ErrorDisplay name="preferredMeetingDay" errors={errors} />
                                                    </div>

                                                    <div>
                                                        <Label className={labelClasses}>Time Slot *</Label>
                                                        <Select value={formData.preferredTimeSlot} onValueChange={(v) => handleSelectChange('preferredTimeSlot', v)}>
                                                            <SelectTrigger className={`${inputClasses} ${errors.preferredTimeSlot ? 'border-red-400' : ''}`}>
                                                                <SelectValue placeholder="Select Slot" />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                <SelectItem value="Morning (10AM - 1PM)" className="text-[11px]">Morning (10AM-1PM)</SelectItem>
                                                                <SelectItem value="Afternoon (2PM - 4PM)" className="text-[11px]">Afternoon (2PM-4PM)</SelectItem>
                                                                <SelectItem value="Evening (4PM - 6PM)" className="text-[11px]">Evening (4PM-6PM)</SelectItem>
                                                            </SelectContent>
                                                        </Select>
                                                        <ErrorDisplay name="preferredTimeSlot" errors={errors} />
                                                    </div>

                                                    <div>
                                                        <Label className={labelClasses}>Number of Meetings</Label>
                                                        <Select value={formData.numberOfMeetingsInterested} onValueChange={(v) => handleSelectChange('numberOfMeetingsInterested', v)}>
                                                            <SelectTrigger className={inputClasses}>
                                                                <SelectValue placeholder="Select Count" />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                {(["3–5 Meetings", "5–10 Meetings", "10+ Meetings"]).map(count =>
                                                                    <SelectItem key={count} value={count} className="text-[11px]">{count}</SelectItem>
                                                                )}
                                                            </SelectContent>
                                                        </Select>
                                                    </div>

                                                    <div>
                                                        <Label className={labelClasses}>Priority Level</Label>
                                                        <Select value={formData.meetingPriorityLevel} onValueChange={(v) => handleSelectChange('meetingPriorityLevel', v)}>
                                                            <SelectTrigger className={inputClasses}>
                                                                <SelectValue placeholder="Select Priority" />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                {(['Low Priority', 'Medium Priority', 'High Priority']).map(lvl =>
                                                                    <SelectItem key={lvl} value={lvl} className="text-[11px]">{lvl}</SelectItem>
                                                                )}
                                                            </SelectContent>
                                                        </Select>
                                                    </div>
                                                </div>


                                                <div className="space-y-1.5">
                                                    <Label className="text-[11px] font-semibold">📝 Specific Meeting Requirements</Label>
                                                    <Textarea
                                                        name="meetingRequirements"
                                                        placeholder="👉 Mention specific expectations, brands you want to meet, or items you are sourcing..."
                                                        value={formData.meetingRequirements}
                                                        onChange={handleChange}
                                                        rows={2}
                                                        className="text-[12px] p-3 rounded-lg border-slate-300 bg-white/50 resize-none min-h-[60px] max-h-[80px]"
                                                    />
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    <div id="package-section" className="space-y-4 pt-4 border-t border-slate-100">
                                        <h3 className={sectionTitleClasses}> Registration Category 🔹</h3>
                                        <div className="relative">
                                            {!showMembershipOptions ? (
                                                <div className="space-y-4">
                                                    <div className="flex items-center gap-2 px-2">
                                                        <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
                                                        <p className="text-[11px] font-black text-slate-600 uppercase tracking-[0.2em] font-sans">Available Registration Passes</p>
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
                                                                    className={`relative p-5 border-2 transition-all cursor-pointer rounded-xl flex flex-col h-full font-sans group 
                                                                        ${isSelected ? `border-[#23471d] bg-white shadow-2xl ring-4 ring-emerald-100 scale-[1.02] z-10` : `border-slate-200 bg-white hover:border-emerald-300 hover:shadow-lg`}
                                                                    `}
                                                                >
                                                                    {pkg.badge && (
                                                                        <div className={`absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest shadow-sm z-20 text-white ${theme.badge}`}>
                                                                            ⭐ {pkg.badge}
                                                                        </div>
                                                                    )}

                                                                    <div className="mb-3">
                                                                        <h4 className="text-[15px] font-black leading-tight text-slate-800 font-sans group-hover:text-[#23471d] transition-colors">
                                                                            {pkg.name} – ₹{pkg.price}
                                                                        </h4>
                                                                        <p className={`text-[10px] font-bold uppercase tracking-tight mt-1 ${theme.accent}`}>
                                                                            {pkg.tagline}
                                                                        </p>
                                                                    </div>

                                                                    <div className="flex-1 space-y-4">
                                                                        <p className="text-[11px] text-slate-500 leading-relaxed italic border-l-2 border-slate-200 pl-2">
                                                                            {pkg.description}
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

                                                                        <div className={`p-2 rounded-lg ${theme.border} border`}>
                                                                            <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1">Why Choose This:</p>
                                                                            <p className="text-[10px] text-slate-700 font-semibold leading-snug">
                                                                                {pkg.whyChoose}
                                                                            </p>
                                                                        </div>
                                                                    </div>

                                                                    <div className={`mt-4 w-full py-2.5 rounded-lg text-center text-[11px] font-black uppercase tracking-widest transition-all font-sans 
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
                                                                className={`relative p-3 border-2 border-dashed border-emerald-300 bg-emerald-50/20 transition-all rounded-xl flex flex-col justify-center items-center text-center font-sans cursor-pointer hover:border-emerald-500 hover:bg-emerald-50/40
                                                                `}
                                                            >
                                                                <h4 className="text-[14px] font-black text-emerald-800 mb-1 font-sans">Membership Option</h4>
                                                                <div className={`text-[11px] text-emerald-500 font-bold uppercase mt-2 px-4 py-1.5 border border-emerald-200 rounded-full bg-white shadow-sm font-sans`}>
                                                                    View More Plans →
                                                                </div>
                                                            </div>
                                                        )}
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
                                                            const isSelected = formData.registrationCategory === pkg.name;

                                                            const colorThemes: any = {
                                                                blue: { border: 'border-blue-400 bg-blue-50/10', accent: 'text-blue-700', badge: 'bg-blue-500' },
                                                                yellow: { border: 'border-amber-400 bg-amber-50/10', accent: 'text-amber-700', badge: 'bg-amber-400' },
                                                                green: { border: 'border-emerald-400 bg-emerald-50/10', accent: 'text-emerald-700', badge: 'bg-emerald-500' },
                                                                red: { border: 'border-red-400 bg-red-50/10', accent: 'text-red-700', badge: 'bg-red-500' }
                                                            };

                                                            const theme = colorThemes[pkg.color || 'blue'] || colorThemes.blue;

                                                            return (
                                                                <div
                                                                    key={pkg.name}
                                                                    onClick={() => handlePackageSelection(pkg)}
                                                                    className={`relative p-5 border-2 transition-all rounded-xl flex flex-col h-full font-sans group cursor-pointer
                                                                        ${isSelected ? `border-[#23471d] bg-white shadow-2xl ring-4 ring-emerald-100 scale-[1.02] z-10` : `border-slate-200 bg-white hover:border-emerald-300 hover:shadow-lg`}
                                                                    `}
                                                                >
                                                                    {pkg.badge && (
                                                                        <div className={`absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest shadow-sm z-20 text-white ${theme.badge}`}>
                                                                            ⭐ {pkg.badge}
                                                                        </div>
                                                                    )}

                                                                    <div className="mb-3">
                                                                        <h4 className="text-[15px] font-black leading-tight text-slate-800 font-sans group-hover:text-[#23471d] transition-colors">
                                                                            {pkg.name} – ₹{pkg.price}
                                                                        </h4>
                                                                        <p className={`text-[10px] font-bold uppercase tracking-tight mt-1 ${theme.accent}`}>
                                                                            {pkg.tagline}
                                                                        </p>
                                                                    </div>

                                                                    <div className="flex-1 space-y-4">
                                                                        <p className="text-[11px] text-slate-500 leading-relaxed italic border-l-2 border-slate-200 pl-2">
                                                                            {pkg.description}
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

                                                                        <div className={`p-2 rounded-lg ${theme.border} border`}>
                                                                            <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1">Why Choose This:</p>
                                                                            <p className="text-[10px] text-slate-700 font-semibold leading-snug">
                                                                                {pkg.whyChoose}
                                                                            </p>
                                                                        </div>
                                                                    </div>

                                                                    <div className={`mt-4 w-full py-2.5 rounded-lg text-center text-[11px] font-black uppercase tracking-widest transition-all font-sans 
                                                                        ${isSelected ? 'bg-[#23471d] text-white shadow-lg' : 'bg-slate-50 text-slate-400 group-hover:bg-emerald-600 group-hover:text-white'}
                                                                    `}>
                                                                        {pkg.cta || "Select Plan"}
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
                                    </div>



                                </form>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </section >


            <AnimatePresence>
                {
                    showTermsModal && tempSelectedPackage && (
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
                    )
                }
            </AnimatePresence >


            <AnimatePresence>
                {
                    showPaymentConfirmModal && tempSelectedPackage && (
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

                                <div className="bg-[#23471d] px-6 py-4 flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                                        <CreditCard size={20} className="text-emerald-300" />
                                    </div>
                                    <div>
                                        <h3 className="text-white font-black uppercase tracking-wider text-sm">Payment Confirmation</h3>
                                        <p className="text-emerald-300 text-[10px] font-bold uppercase tracking-widest">{tempSelectedPackage?.name} — ₹{tempSelectedPackage?.price}</p>
                                    </div>
                                </div>


                                <div className="p-6 space-y-5">

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
                    )
                }
            </AnimatePresence >
        </div >
    );
};


const ErrorDisplay = ({ name, errors }: { name: string; errors: Record<string, string> }) => (
    errors[name] ? <span className="text-red-500 text-[10px] mt-0.5 block h-3 font-medium animate-in fade-in slide-in-from-top-1">{errors[name]}</span> : <div className="h-3" />
);

export default BuyerRegistration;