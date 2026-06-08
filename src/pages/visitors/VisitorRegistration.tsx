import React, { useState, useEffect, Fragment } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
    CheckCircle,
    Send, ChevronRight,
    ShieldCheck,
    Loader2,
    MapPin,
    Globe,
    ArrowRight,
    Users,
    User,
    Store,
    Mic,
    Handshake,
    Award,
    Gift,
    Timer,
    Bell,
    Ticket,
    Lock,
    Headphones,
    Check,
    Package,
    BadgePercent,
    BadgeCheck,
    Heart,
    Activity,
    Calendar
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { heroBackgroundApi, SERVER_URL, verifyApi, visitorApi, eventApi, crmApi } from "@/lib/api";
import HeroBg from "@/assets/car22.jpg";
import AddInternationalVistor from "./international_vistor/AddInternationalVistor";
import DelegateRegistration from "../delegate/DelegateRegistration";
import GroupRegistration from "./GroupRegistration";



const PURPOSE_GENERAL = [
    "Business Networking",
    "Exploring New Products",
    "Buying Products & Services",
    "Learning Industry Trends",
    "Others",
];

const PURPOSE_CORPORATE = [
    // "Business Meeting",
    // "Networking & Industry Interaction",
    // "Partnership / Collaboration Discussion",
    // "Exploring Business Opportunities",
    // "Exhibitor / Vendor Meeting",
    // "Product Sourcing / Procurement",
    // "Market Research",
    // "Investment Opportunities",
    // "Conference / Seminar Participation",
    "Business Networking", "Product Sourcing", "Distributor Search",
    "Franchise Opportunity", "Investment Opportunity", "Medical Tourism",
    "Healthcare Collaboration", "Wellness Industry Exploration",
    "Ayurveda & AYUSH Interest", "Conference Participation",
    "Knowledge Sessions", "Startup Collaboration", "Government Delegation", "General Visit",
];

const INTEREST_GENERAL = [
    "AYUSH & Herbal Products",
    "Organic & Natural Products",
    "Fitness & Wellness Equipment",
    "Health Supplements",
    "Hospitals & Healthcare Services",
    "Agriculture & Organic Farming",
    "R&D & Innovations",
    "Others",
];

const INTEREST_CORPORATE = [
    // "Medical, Healthcare & Hospital Solutions",
    // "Medical Technology, Diagnostics & Devices",
    // "AYUSH & Traditional Systems of Medicine",
    // "Nutrition, Organic & Health Foods",
    // "Beauty, Personal Care & Aesthetic Wellness",
    // "Mental Health, Yoga & Spiritual Wellness",
    // "Wellness, Fitness & Lifestyle",
    // "Institutions, Government Bodies & Startups",
    "Business Networking", "Product Sourcing", "Distributor Search",
    "Franchise Opportunity", "Investment Opportunity", "Medical Tourism",
    "Healthcare Collaboration", "Wellness Industry Exploration",
    "Ayurveda & AYUSH Interest", "Conference Participation",
    "Knowledge Sessions", "Startup Collaboration", "Government Delegation", "General Visit",
];

const HEALTH_SERVICES = [
    { key: "generalHealth", label: "General Check-up" },
    { key: "bloodSugar", label: "Blood Sugar Test" },
    { key: "bloodPressure", label: "Blood Pressure" },
    { key: "eyeCheckup", label: "Eye Check-up" },
    { key: "dentalCheckup", label: "Dental Check-up" },
    { key: "ayurvedaConsultation", label: "Ayurveda Consultation" },
    { key: "nutritionConsultation", label: "Nutrition Consultation" },
    { key: "other", label: "Other" },
];

const TIME_SLOTS = [
    "09:00 AM - 12:00 PM",
    "12:00 PM - 03:00 PM",
    "03:00 PM - 06:00 PM",
];

const getInitialHealthCampData = () => ({
    registrationFor: "",
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    alternateNo: "",
    dateOfBirth: "",
    gender: "",
    residenceAddress: "",
    country: "India",
    state: "",
    city: "",
    existingMedicalConditions: "",
    isTakingMedications: "",
    medicationNames: "",
    hasAllergies: "",
    allergyDetails: "",
    isExperiencingSymptoms: "",
    symptomDetails: "",
    healthCheckupServices: {
        generalHealth: false,
        bloodSugar: false,
        bloodPressure: false,
        eyeCheckup: false,
        dentalCheckup: false,
        ayurvedaConsultation: false,
        nutritionConsultation: false,
        other: false,
    } as Record<string, boolean>,
    preferredDate: "",
    preferredTimeSlot: "09:00 AM - 12:00 PM",
    consentMedicalData: "",
    agreeToUpdates: "",
    specificHealthConcerns: "",
    subscribe: true,
});

const BenefitsBar = ({ items }: { items: any[] }) => (
    <div className="bg-white border border-slate-100 rounded-[20px] px-6 py-2 shadow-[0_8px_30px_rgba(0,0,0,0.04)] max-w-[1400px] mx-auto relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-2 divide-y md:divide-y-0 md:divide-x divide-slate-100">
            {items.map((item, idx) => (
                <div key={idx} className="flex items-center gap-4 px-6 py-2 transition-all group">
                    <div className="w-16 h-16 rounded-full border border-[#1a4d1a]/20 bg-transparent flex items-center justify-center text-[#1a4d1a] shrink-0 group-hover:border-[#a8d060]/50 transition-all shadow-sm">
                        <item.icon className="w-8 h-8 stroke-[1.2]" />
                    </div>
                    <div className="flex flex-col">
                        <p className="text-[15px] font-bold text-[#111827] leading-tight mb-1">{item.title}</p>
                        <p className="text-[12px] font-medium text-slate-500 leading-tight whitespace-pre-line">{item.desc}</p>
                    </div>
                </div>
            ))}
        </div>
    </div>
);

const SelectionHeader = () => (
    <div className="flex items-center justify-center gap-4 mt-2 mb-2">
        <div className="flex items-center gap-2 flex-1 max-w-[220px] justify-end">
            <div className="h-[1px] bg-gradient-to-r from-transparent to-[#1a5f15] flex-1 opacity-70" />
            <div className="w-1.5 h-1.5 rotate-45 bg-[#1a5f15] shrink-0" />
        </div>

        <h2 className="text-[18px] md:text-[24px] font-bold text-[#111827] uppercase tracking-[0.1em] text-center select-none font-sans">
            CHOOSE YOUR REGISTRATION TYPE
        </h2>

        <div className="flex items-center gap-2 flex-1 max-w-[220px] justify-start">
            <div className="w-1.5 h-1.5 rotate-45 bg-[#1a5f15] shrink-0" />
            <div className="h-[1px] bg-gradient-to-l from-transparent to-[#1a5f15] flex-1 opacity-70" />
        </div>
    </div>
);

const unescapeHtml = (str: string) => {
    if (!str) return str;
    return str.replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&#39;/g, "'");
};

const getEventName = (event: any) => event?.name || event?.event_fullName || event?.event_name || "";

const VisitorRegistration = () => {
    const [visitorType, setVisitorType] = useState("corporate");
    const [selected, setSelected] = useState<string | null>(null);
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
    const [healthCampStates, setHealthCampStates] = useState<any[]>([]);
    const [healthCampCities, setHealthCampCities] = useState<any[]>([]);
    const [loadingHealthCampStates, setLoadingHealthCampStates] = useState(false);
    const [loadingHealthCampCities, setLoadingHealthCampCities] = useState(false);

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
        companyPincode: "",
        anyRequirement: "",
        schedulingB2B: "no",
        whatsappUpdates: "yes",
        subscribeNewsletter: true,
        purposeOfVisit: [] as string[],
        areaOfInterest: [] as string[]
    });
    const [healthCampData, setHealthCampData] = useState(getInitialHealthCampData());

    const defaultEventName = "9th Edition of International Health & Wellness Expo 2026";

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

    useEffect(() => {
        const fetchHealthCampStates = async () => {
            if (!healthCampData.country) {
                setHealthCampStates([]);
                return;
            }
            const selectedCountry = countries.find(c => c.name === healthCampData.country);
            if (selectedCountry) {
                setLoadingHealthCampStates(true);
                try {
                    const data = await crmApi.getStates(selectedCountry.countryCode);
                    setHealthCampStates(data);
                } catch (err) {
                    console.error("Error fetching health camp states:", err);
                } finally {
                    setLoadingHealthCampStates(false);
                }
            }
        };
        fetchHealthCampStates();
    }, [healthCampData.country, countries]);

    useEffect(() => {
        const fetchHealthCampCities = async () => {
            if (!healthCampData.state) {
                setHealthCampCities([]);
                return;
            }
            const selectedState = healthCampStates.find(s => s.name === healthCampData.state);
            if (selectedState) {
                setLoadingHealthCampCities(true);
                try {
                    const data = await crmApi.getCities(selectedState.stateCode);
                    setHealthCampCities(data);
                } catch (err) {
                    console.error("Error fetching health camp cities:", err);
                } finally {
                    setLoadingHealthCampCities(false);
                }
            }
        };
        fetchHealthCampCities();
    }, [healthCampData.state, healthCampStates]);

    // Smooth Scroll to Form on Activation
    useEffect(() => {
        if (selected) {
            setTimeout(() => {
                const target = document.getElementById("registration-form-section");
                if (target) {
                    const yOffset = -40; // Account for small header buffer
                    const y = target.getBoundingClientRect().top + window.pageYOffset + yOffset;
                    window.scrollTo({ top: y, behavior: 'smooth' });
                }
            }, 300); // Wait for framer-motion reveal delay
        }
    }, [selected]);

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

    const handleHealthCampInputChange = (e: any) => {
        const { name, value, type, checked } = e.target;
        setHealthCampData(prev => {
            const next = {
                ...prev,
                [name]: type === "checkbox" ? checked : value,
            };
            if (name === "country") {
                next.state = "";
                next.city = "";
                setHealthCampStates([]);
                setHealthCampCities([]);
            }
            if (name === "state") {
                next.city = "";
                setHealthCampCities([]);
            }
            return next;
        });
    };

    const handleHealthServiceChange = (key: string, checked: boolean) => {
        setHealthCampData(prev => ({
            ...prev,
            healthCheckupServices: {
                ...prev.healthCheckupServices,
                [key]: checked,
            },
        }));
    };

    const resetHealthCampForm = () => {
        setHealthCampData({
            ...getInitialHealthCampData(),
            registrationFor: events.length > 0 ? getEventName(events[0]) : defaultEventName,
        });
    };

    const validateHealthCampForm = () => {
        if (!healthCampData.registrationFor) return "Please select Event";
        if (!healthCampData.firstName.trim()) return "First Name is required";
        if (!healthCampData.lastName.trim()) return "Last Name is required";
        if (!healthCampData.email.trim()) return "Email is required";
        if (!healthCampData.mobile.trim()) return "Mobile Number is required";
        if (!healthCampData.dateOfBirth) return "Date of Birth is required";
        if (!healthCampData.gender) return "Gender is required";
        if (!healthCampData.preferredDate) return "Preferred Date is required";
        if (!healthCampData.preferredTimeSlot) return "Preferred Time Slot is required";
        if (!healthCampData.consentMedicalData) return "Please answer the consent question";
        if (!healthCampData.agreeToUpdates) return "Please answer the agreement question";
        return "";
    };

    const handleHealthCampSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrorMessage("");

        const validationMessage = validateHealthCampForm();
        if (validationMessage) {
            alert(validationMessage);
            return;
        }

        setLoading(true);
        try {
            const payload = {
                ...healthCampData,
                registrationFor: healthCampData.registrationFor || (events.length > 0 ? getEventName(events[0]) : defaultEventName),
            };

            const res = await visitorApi.submitHealthCamp(payload);
            if (res.success || res.data) {
                setIsSuccess(true);
                window.scrollTo({ top: 0, behavior: "smooth" });
                setTimeout(() => {
                    resetHealthCampForm();
                    setSelected(null);
                    setVisitorType("corporate");
                    setIsSuccess(false);
                }, 5000);
            } else {
                throw new Error(res.message || "Registration failed");
            }
        } catch (error: any) {
            setErrorMessage(error.message || "Something went wrong. Please try again.");
            alert("Error: " + (error.message || "Submission failed. Please check your data."));
        } finally {
            setLoading(false);
        }
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
                setEmailOtpSent(false);
                setEmailOtp("");
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
            const visitorName = `${formData.firstName || ''} ${formData.lastName || ''}`.trim() || 'Visitor';
            const res = await verifyApi.sendPhoneOtp(formData.mobileNo, 'VISITOR', visitorName);
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
                setPhoneOtpSent(false);
                setPhoneOtp("");
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
            const eventName = formData.registrationFor || (events.length > 0 ? getEventName(events[0]) : defaultEventName);

            if (visitorType === 'general') {
                payload = {
                    registrationFor: eventName,
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
                    purposeOfVisit: formData.purposeOfVisit,
                    areaOfInterest: formData.areaOfInterest,
                };
            } else {
                payload = {
                    registrationFor: eventName,
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
                    purposeOfVisit: formData.purposeOfVisit,
                    areaOfInterest: formData.areaOfInterest,
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
                        companyPincode: "",
                        anyRequirement: "",
                        schedulingB2B: "no",
                        whatsappUpdates: "yes",
                        subscribeNewsletter: true,
                        purposeOfVisit: [],
                        areaOfInterest: []
                    });
                    setSelected(null);
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

    useEffect(() => {
        if (events.length > 0 && !formData.registrationFor) {
            setFormData(prev => ({ ...prev, registrationFor: getEventName(events[0]) }));
            setHealthCampData(prev => ({
                ...prev,
                registrationFor: prev.registrationFor || getEventName(events[0]),
            }));
        } else if (events.length === 0 && !formData.registrationFor) {
            setFormData(prev => ({ ...prev, registrationFor: defaultEventName }));
            setHealthCampData(prev => ({
                ...prev,
                registrationFor: prev.registrationFor || defaultEventName,
            }));
        }
    }, [events]);

    const inputClasses =
        "rounded-[2px] border-slate-400 h-8 focus:border-[#23471d] focus:ring-[#23471d]/10 transition-all text-[12px] bg-white placeholder:text-slate-400 text-slate-900 font-medium shadow-none outline-none px-3 w-full text-left";
    const labelClasses =
        "text-[10px] font-extrabold uppercase tracking-[0.05em] text-slate-800 mb-1 block";

    // Define benefit items for reuse
    const TOP_BENEFITS = [
        { icon: Gift, title: "Early Registration Benefits", desc: "Priority Entry | Special Access\nExclusive Updates" },
        { icon: BadgePercent, title: "Save Time", desc: "Pre-register and\nskip the queue" },
        { icon: BadgeCheck, title: "Stay Updated", desc: "Get event alerts, schedules\nand important info" },
        { icon: ShieldCheck, title: "Safe & Secure", desc: "Your data is protected\nwith us" },
    ];

    const BOTTOM_BENEFITS = [
        { icon: Ticket, title: "100% Free Entry", desc: "No registration fees" },
        { icon: Lock, title: "Secure Registration", desc: "Your data is safe with us" },
        { icon: ShieldCheck, title: "Verified Event", desc: "Organised by ITPO with MSME support" },
        { icon: Headphones, title: "Need Help?", desc: "We're here to assist you every step of the way" },
    ];

    return (
        <div className="min-h-screen bg-[#ffffff] font-inter text-slate-900 pb-0">
            {/* ── 1. HERO BANNER SECTION ── */}

            <section
                className="hero-background-registration relative overflow-hidden pt-[135px] sm:pt-[110px] lg:pt-[85px] pb-8 lg:pb-0 !aspect-auto lg:!aspect-[16/5] !h-auto lg:!h-auto"
                style={{
                    backgroundImage: `linear-gradient(to right, rgba(0, 40, 15, 0.96) 0%, rgba(0, 40, 15, 0.85) 35%, rgba(0, 40, 15, 0.4) 65%, rgba(0, 40, 15, 0.1) 100%), url(${heroData?.backgroundImage ? `${SERVER_URL}${heroData.backgroundImage}` : '/visitor/visitor-reg.png'})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center right',
                    backgroundRepeat: 'no-repeat',
                    fontFamily: "'Barlow', sans-serif",
                }}
            >
                <div className="max-w-[1400px] mx-auto px-4 md:px-12 relative z-10 w-full">
                    <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between w-full gap-6 lg:gap-4">
                        <div className="flex flex-col w-full lg:w-[60%] text-center lg:text-left items-center lg:items-start">
                            {/* Badge Row */}
                            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#0b2d09]/90 border border-[#C7DF36] rounded-full text-[#C7DF36] text-[12px] sm:text-[13px] font-extrabold uppercase tracking-wider w-fit backdrop-blur-sm shadow-md mb-4">
                                <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full border border-[#C7DF36] flex items-center justify-center shrink-0 shadow-inner">
                                    <User className="w-3 sm:w-3.5 h-3 sm:h-3.5 text-[#C7DF36] fill-current" />
                                </div>
                                {unescapeHtml(heroData?.subtitle) || "Visitor Registration"}
                            </div>

                            {/* Main Heading */}
                            <div className="mb-3 text-center lg:text-left">
                                <h1 className="text-[28px] sm:text-[38px] lg:text-[42px] font-extrabold text-white leading-[1.1] tracking-tight">
                                    {unescapeHtml(heroData?.title) || "Your Pass to"}
                                </h1>
                                <h1 className="text-[26px] sm:text-[36px] lg:text-[42px] font-extrabold text-[#C7DF36] leading-[1.1] tracking-tight mt-1">
                                    {unescapeHtml(heroData?.title2) || "Health & Wellness Excellence!"}
                                </h1>
                            </div>

                            {/* Description */}
                            <p className="text-white text-[13px] sm:text-[14px] font-medium leading-relaxed max-w-xl mb-5 opacity-95 drop-shadow-sm lg:px-0">
                                {unescapeHtml(heroData?.shortDescription) || "Register as a visitor and unlock access to innovations, global experts, live sessions and endless networking opportunities."}
                            </p>

                            {/* Stats Row with separators */}
                            <div className="grid grid-cols-2 lg:flex lg:items-center lg:justify-start gap-y-6 gap-x-2 lg:gap-0 mb-4 lg:mb-0 w-full max-w-lg lg:max-w-none mx-auto lg:mx-0 mt-3">
                                {[
                                    { label: 'Meet 8,000+\nIndustry Professionals', img: "/visitor/meet.png" },
                                    { label: 'Explore 8,000+\nProducts & Solutions', img: "/visitor/explore.png" },
                                    { label: 'Attend Conferences\n& Live Sessions', img: "/visitor/conference.png" },
                                    { label: 'Build Valuable\nBusiness Connections', img: "/visitor/buildvalue.png" },
                                ].map((stat, i, arr) => (
                                    <div key={i} className="flex items-center lg:contents">
                                        <div className="flex flex-col items-center text-center px-2 flex-1">
                                            <div className="mb-2 flex items-center justify-center">
                                                <img src={stat.img} alt={stat.label} className="w-8 h-8 object-contain opacity-95" />
                                            </div>
                                            <div className="text-[10px] md:text-[12px] font-bold text-white tracking-tight leading-snug whitespace-pre-line drop-shadow-md max-w-[130px]">
                                                {stat.label}
                                            </div>
                                        </div>
                                        {i < arr.length - 1 && <div className="hidden lg:block w-[1px] h-10 bg-white/25 shrink-0" />}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Right-Side Visual Identity Seal */}
                        <div className="shrink-0 relative flex items-center justify-center lg:mr-12 z-20">
                            <img
                                src="/visitor/free_register_now.png"
                                alt="Registration is Free! Register Now."
                                className="w-[160px] sm:w-[200px] lg:w-[240px] h-auto object-contain drop-shadow-2xl animate-float-subtle"
                            />
                        </div>
                    </div>
                </div>
            </section>
            {/* Floating Benefits Bar explicitly positioned to overlap bottom edge with optimized scaling */}
            <div className="max-w-[1400px] mx-auto px-4 md:px-12 relative -mt-10 sm:-mt-12 md:-mt-14 z-30">
                <BenefitsBar items={TOP_BENEFITS} />
            </div>


            {/* ── 2. CONTENT LAYOUT WRAPPER ── */}
            <section className="pt-2 pb-8 relative overflow-hidden">
                <div className="max-w-[1400px] mx-auto px-6 md:px-12">
                    <div className="space-y-6">
                        <AnimatePresence mode="wait">
                            {isSuccess ? (
                                <motion.div
                                    key="success"
                                    initial={{ opacity: 0, scale: 0.98 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="bg-white border border-[#d3eed1] rounded-[20px] p-16 flex flex-col items-center justify-center min-h-[450px] shadow-xl shadow-[#f3fbf2] relative overflow-hidden"
                                >
                                    <div className="absolute top-0 left-0 w-full h-1 bg-[#1a5f15]" />
                                    <CheckCircle className="w-20 h-20 text-[#1a5f15] mb-6 animate-bounce-short" />
                                    <h3 className="text-[24px] font-black text-slate-900 uppercase tracking-tight mb-3 text-center">
                                        Registration Success!
                                    </h3>
                                    <p className="text-slate-600 text-center text-[15px] max-w-md mb-8 font-bold leading-relaxed">
                                        Thank you for registering. Your details have been successfully submitted.
                                    </p>
                                    <div className="flex items-center gap-2 text-[11px] text-slate-400 font-black uppercase tracking-widest">
                                        <div className="w-2 h-2 rounded-full bg-[#1a5f15] animate-pulse" />
                                        Redirecting in 5 seconds...
                                    </div>
                                    <div className="mt-10 flex gap-4">
                                        <Button
                                            onClick={() => { setIsSuccess(false); setSelected(null); }}
                                            className="h-11 px-8 rounded-lg bg-[#1a3615] hover:bg-[#0d270c] text-[12px] font-extrabold uppercase tracking-wider shadow-lg"
                                        >
                                            Register Another
                                        </Button>
                                        <Link to="/">
                                            <Button variant="outline" className="h-11 px-8 rounded-lg border-slate-300 text-slate-700 text-[12px] font-extrabold uppercase tracking-wider hover:bg-slate-50">
                                                Go Home
                                            </Button>
                                        </Link>
                                    </div>
                                </motion.div>
                            ) : (
                                <div className="flex flex-col gap-12">
                                    <motion.div
                                        key="selection-view"
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="space-y-6"
                                    >
                                        {/* RENDERED DYNAMICALLY ATTACHED TO BANNER BLOCK */}

                                        {/* HEADER */}
                                        <SelectionHeader />

                                        {/* CARDS */}
                                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                                            {/* DOMESTIC CARD */}
                                            <div className="border border-[#e6f4e5] bg-white hover:border-[#1a5f15] hover:shadow-xl hover:shadow-[#edf7ec] transition-all duration-300 rounded-[20px] p-6 flex flex-col justify-between relative group">
                                                <div className="absolute top-0 left-0 bg-[#1a5f15] text-white text-[9px] font-extrabold px-4 py-2.5 rounded-tl-[19px] rounded-br-[35px] shadow-sm z-10 flex flex-col leading-[1.2] tracking-wide text-left max-w-[125px]">
                                                    <span>FOR RESIDENTS</span>
                                                    <span className="opacity-90 font-bold">WITHIN INDIA</span>
                                                </div>
                                                <div className="flex items-center gap-5 mb-6">
                                                    <div className="w-24 h-24 rounded-full shrink-0 relative group-hover:scale-105 transition-transform duration-300">
                                                        <img src="/visitor/domestic.png" alt="Domestic Visitor" className="w-full h-full object-contain" />
                                                    </div>
                                                    <div className="flex-1 space-y-0.5">
                                                        <h3 className="text-[22px] md:text-[24px] font-bold text-[#1a5f15] tracking-tight leading-tight">Domestic Visitor</h3>
                                                        <p className="text-[13px] font-medium text-slate-600 mb-2">For residents within India</p>
                                                        <div className="space-y-1.5 pt-1">
                                                            {["Free Entry", "Full Expo Access", "Conference & Sessions"].map((feat, i) => (
                                                                <div key={i} className="flex items-center gap-2.5">
                                                                    <div className="w-[18px] h-[18px] rounded-full bg-[#1a5f15] flex items-center justify-center shrink-0 shadow-sm">
                                                                        <Check className="w-2.5 h-2.5 text-white stroke-[4]" />
                                                                    </div>
                                                                    <span className="text-[13px] font-semibold text-slate-800 tracking-tight">{feat}</span>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>
                                                <button onClick={() => setSelected("domestic")} className="relative w-full h-12 bg-[#1a5f15] hover:bg-[#13450f] text-white font-bold text-[12px] md:text-[13px] tracking-[0.05em] uppercase rounded-xl flex items-center justify-center px-12 shadow-md transition-all group/btn">
                                                    <span>REGISTER AS DOMESTIC VISITOR</span>
                                                    <div className="absolute right-4 w-7 h-7 rounded-full bg-white flex items-center justify-center text-[#1a5f15] shadow-sm transition-transform group-hover/btn:translate-x-1">
                                                        <ArrowRight className="w-3.5 h-3.5 stroke-[3.5]" />
                                                    </div>
                                                </button>
                                            </div>

                                            {/* INTERNATIONAL CARD */}
                                            <div className="border border-[#ffebd8] bg-[#fffcf9] hover:border-[#e25c05] hover:shadow-xl hover:shadow-[#fff5eb] transition-all duration-300 rounded-[20px] p-6 flex flex-col justify-between relative group">
                                                <div className="flex items-center gap-5 mb-6">
                                                    <div className="w-24 h-24 rounded-full shrink-0 relative group-hover:scale-105 transition-transform duration-300">
                                                        <img src="/visitor/international.png" alt="International Visitor" className="w-full h-full object-contain" />
                                                    </div>
                                                    <div className="flex-1 space-y-0.5">
                                                        <h3 className="text-[22px] md:text-[24px] font-bold text-[#e25c05] tracking-tight leading-tight">International Visitor</h3>
                                                        <p className="text-[13px] font-medium text-slate-600 mb-2">For delegates from overseas</p>
                                                        <div className="space-y-1.5 pt-1">
                                                            {["Free Entry", "Full Expo Access", "Conference & Sessions"].map((feat, i) => (
                                                                <div key={i} className="flex items-center gap-2.5">
                                                                    <div className="w-[18px] h-[18px] rounded-full bg-[#e25c05] flex items-center justify-center shrink-0 shadow-sm">
                                                                        <Check className="w-2.5 h-2.5 text-white stroke-[4]" />
                                                                    </div>
                                                                    <span className="text-[13px] font-semibold text-slate-800 tracking-tight">{feat}</span>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>
                                                <button onClick={() => setSelected("international")} className="relative w-full h-12 bg-[#e25c05] hover:bg-[#be4c02] text-white font-bold text-[12px] md:text-[13px] tracking-[0.05em] uppercase rounded-xl flex items-center justify-center px-12 shadow-md transition-all group/btn">
                                                    <span>REGISTER AS INTERNATIONAL VISITOR</span>
                                                    <div className="absolute right-4 w-7 h-7 rounded-full bg-white flex items-center justify-center text-[#e25c05] shadow-sm transition-transform group-hover/btn:translate-x-1">
                                                        <ArrowRight className="w-3.5 h-3.5 stroke-[3.5]" />
                                                    </div>
                                                </button>
                                            </div>

                                            {/* GROUP CARD */}
                                            <div className="border border-[#dfe9f8] bg-[#f7faff] hover:border-[#0e4293] hover:shadow-xl hover:shadow-[#edf4fe] transition-all duration-300 rounded-[20px] p-6 flex flex-col justify-between relative group">
                                                <div className="flex items-center gap-5 mb-6">
                                                    <div className="w-24 h-24 rounded-full shrink-0 relative group-hover:scale-105 transition-transform duration-300">
                                                        <img src="/visitor/group.png" alt="Group Registration" className="w-full h-full object-contain" />
                                                    </div>
                                                    <div className="flex-1 space-y-0.5">
                                                        <h3 className="text-[22px] md:text-[24px] font-bold text-[#0e4293] tracking-tight leading-tight">Group Registration</h3>
                                                        <p className="text-[13px] font-medium text-slate-600 mb-2">For groups of 5 or more visitors</p>
                                                        <div className="space-y-1.5 pt-1">
                                                            {[
                                                                { label: "Dedicated Group Support" },
                                                                { label: "Faster Check-in" },
                                                                { label: "Special Group Benefits" }
                                                            ].map((feat, i) => (
                                                                <div key={i} className="flex items-center gap-2.5">
                                                                    <div className="w-[18px] h-[18px] rounded-full bg-[#0e4293] flex items-center justify-center shrink-0 shadow-sm">
                                                                        <Check className="w-2.5 h-2.5 text-white stroke-[4]" />
                                                                    </div>
                                                                    <span className="text-[13px] font-semibold text-slate-800 tracking-tight">{feat.label}</span>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>
                                                <button onClick={() => setSelected("group")} className="relative w-full h-12 bg-[#0e4293] hover:bg-[#092f6d] text-white font-bold text-[12px] md:text-[13px] tracking-[0.05em] uppercase rounded-xl flex items-center justify-center px-12 shadow-md transition-all group/btn">
                                                    <span>REGISTER AS GROUP</span>
                                                    <div className="absolute right-4 w-7 h-7 rounded-full bg-white flex items-center justify-center text-[#0e4293] shadow-sm transition-transform group-hover/btn:translate-x-1">
                                                        <ArrowRight className="w-3.5 h-3.5 stroke-[3.5]" />
                                                    </div>
                                                </button>
                                            </div>
                                        </div>

                                        {/* BENEFITS 2 */}
                                        {!selected && <BenefitsBar items={BOTTOM_BENEFITS} />}
                                    </motion.div>

                                    <AnimatePresence mode="wait">
                                        {selected === "international" && (
                                            <motion.div
                                                id="registration-form-section"
                                                key="intl-form"
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: -10 }}
                                            >
                                                <AddInternationalVistor embedded={true} />
                                            </motion.div>
                                        )}
                                        {selected === "group" && (
                                            <motion.div
                                                id="registration-form-section"
                                                key="group-form"
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: -10 }}
                                            >
                                                <GroupRegistration embedded={true} />
                                            </motion.div>
                                        )}
                                        {selected === "domestic" && (
                                            <motion.div
                                                id="registration-form-section"
                                                key="form"
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: -10 }}
                                                className="bg-white border border-slate-300 shadow-2xl rounded-lg overflow-hidden"
                                            >

                                                <div className="bg-gradient-to-r from-[#23471d] to-[#2d5a25] border-b border-slate-200  px-8 py-4 flex justify-between items-center">
                                                    {/* LEFT SIDE */}
                                                    <div>
                                                        <h2
                                                            className="text-xl font-medium text-slate-200 uppercase"
                                                            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                                                        >
                                                            Domestic Visitor Registration
                                                        </h2>
                                                        <p className="text-[10px] text-slate-200 uppercase tracking-[0.2em] mt-0.5 font-bold">
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

                                                <form onSubmit={visitorType === "freeHealth" ? handleHealthCampSubmit : handleSubmit} className="p-8 space-y-4 font-inter">
                                                    {/* —— VISITOR TYPE —— */}

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
                                                            <div className="flex items-center space-x-3">
                                                                <RadioGroupItem value="freeHealth" id="freeHealth" className="w-5 h-5 border-slate-400 text-[#23471d]" />
                                                                <Label htmlFor="freeHealth" className="text-sm font-bold text-slate-700 cursor-pointer flex items-center gap-2">
                                                                    Free Health Camp
                                                                </Label>
                                                            </div>
                                                        </RadioGroup>

                                                        <div className="hidden flex flex-col gap-1 min-w-[220px]">
                                                            <Label className="text-[10px] font-bold text-slate-700 uppercase tracking-widest">Registering For (Event) *</Label>
                                                            <Select required value={formData.registrationFor} onValueChange={(v) => setFormData(prev => ({ ...prev, registrationFor: v }))}>
                                                                <SelectTrigger className="h-8 border-slate-400 rounded-[2px] bg-white text-[12px] font-medium text-slate-900">
                                                                    <SelectValue placeholder="Select Event" />
                                                                </SelectTrigger>
                                                                <SelectContent>
                                                                    {events.map((ev: any) => (
                                                                        <SelectItem key={ev._id || getEventName(ev)} value={getEventName(ev)} className="text-xs">{getEventName(ev)}</SelectItem>
                                                                    ))}
                                                                </SelectContent>
                                                            </Select>
                                                        </div>
                                                    </div>

                                                    {visitorType === "freeHealth" && (
                                                        <div className="space-y-4 animate-fadeIn">
                                                            <section>
                                                                <h3 className="text-[13px] font-semibold text-[#23471d] pb-1 border-b border-slate-200 mb-2 flex items-center gap-2">
                                                                    <User className="w-5 h-5 text-[#d26019]" /> Patient Information
                                                                </h3>
                                                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-3">
                                                                    <div>
                                                                        <Label className={labelClasses}>EVENT NAME <span className="text-red-500">*</span></Label>
                                                                        <Select value={healthCampData.registrationFor} onValueChange={(v) => setHealthCampData(prev => ({ ...prev, registrationFor: v }))}>
                                                                            <SelectTrigger className={inputClasses}>
                                                                                <SelectValue placeholder="Select Here" />
                                                                            </SelectTrigger>
                                                                            <SelectContent className="bg-white">
                                                                                {(events.length > 0 ? events : [{ _id: "default", name: defaultEventName }]).map((ev: any) => (
                                                                                    <SelectItem key={ev._id || getEventName(ev)} value={getEventName(ev)}>{getEventName(ev)}</SelectItem>
                                                                                ))}
                                                                            </SelectContent>
                                                                        </Select>
                                                                    </div>
                                                                    <div>
                                                                        <Label className={labelClasses}>FIRST NAME <span className="text-red-500">*</span></Label>
                                                                        <Input name="firstName" value={healthCampData.firstName} onChange={handleHealthCampInputChange} required placeholder="First Name" className={inputClasses} />
                                                                    </div>
                                                                    <div>
                                                                        <Label className={labelClasses}>LAST NAME <span className="text-red-500">*</span></Label>
                                                                        <Input name="lastName" value={healthCampData.lastName} onChange={handleHealthCampInputChange} required placeholder="Last Name" className={inputClasses} />
                                                                    </div>
                                                                    <div>
                                                                        <Label className={labelClasses}>EMAIL ADDRESS <span className="text-red-500">*</span></Label>
                                                                        <Input name="email" type="email" value={healthCampData.email} onChange={handleHealthCampInputChange} required placeholder="Email" className={inputClasses} />
                                                                    </div>
                                                                    <div>
                                                                        <Label className={labelClasses}>MOBILE NUMBER <span className="text-red-500">*</span></Label>
                                                                        <Input name="mobile" value={healthCampData.mobile} onChange={handleHealthCampInputChange} required placeholder="Mobile No." className={inputClasses} />
                                                                    </div>
                                                                    <div>
                                                                        <Label className={labelClasses}>ALTERNATE NO.</Label>
                                                                        <Input name="alternateNo" value={healthCampData.alternateNo} onChange={handleHealthCampInputChange} placeholder="Optional" className={inputClasses} />
                                                                    </div>
                                                                    <div>
                                                                        <Label className={labelClasses}>DATE OF BIRTH <span className="text-red-500">*</span></Label>
                                                                        <Input name="dateOfBirth" type="date" value={healthCampData.dateOfBirth} onChange={handleHealthCampInputChange} required className={inputClasses} />
                                                                    </div>
                                                                    <div>
                                                                        <Label className={labelClasses}>GENDER <span className="text-red-500">*</span></Label>
                                                                        <Select value={healthCampData.gender} onValueChange={(v) => setHealthCampData(prev => ({ ...prev, gender: v }))}>
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
                                                                    <div className="lg:col-span-2">
                                                                        <Label className={labelClasses}>RESIDENCE ADDRESS</Label>
                                                                        <Input name="residenceAddress" value={healthCampData.residenceAddress} onChange={handleHealthCampInputChange} placeholder="Full Address" className={inputClasses} />
                                                                    </div>
                                                                    <div>
                                                                        <Label className={labelClasses}>COUNTRY</Label>
                                                                        <Select value={healthCampData.country} onValueChange={(v) => handleHealthCampInputChange({ target: { name: "country", value: v } })}>
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
                                                                    <div>
                                                                        <Label className={labelClasses}>STATE</Label>
                                                                        <Select disabled={!healthCampData.country || loadingHealthCampStates} value={healthCampData.state} onValueChange={(v) => handleHealthCampInputChange({ target: { name: "state", value: v } })}>
                                                                            <SelectTrigger className={inputClasses}>
                                                                                <SelectValue placeholder={loadingHealthCampStates ? "Loading..." : "Select State"} />
                                                                            </SelectTrigger>
                                                                            <SelectContent className="max-h-[300px] bg-white">
                                                                                {healthCampStates.map(s => (
                                                                                    <SelectItem key={s._id || s.name} value={s.name}>{s.name}</SelectItem>
                                                                                ))}
                                                                            </SelectContent>
                                                                        </Select>
                                                                    </div>
                                                                    <div>
                                                                        <Label className={labelClasses}>CITY</Label>
                                                                        <Select disabled={!healthCampData.state || loadingHealthCampCities} value={healthCampData.city} onValueChange={(v) => handleHealthCampInputChange({ target: { name: "city", value: v } })}>
                                                                            <SelectTrigger className={inputClasses}>
                                                                                <SelectValue placeholder={loadingHealthCampCities ? "Loading..." : "Select City"} />
                                                                            </SelectTrigger>
                                                                            <SelectContent className="max-h-[300px] bg-white">
                                                                                {healthCampCities.map(ct => (
                                                                                    <SelectItem key={ct._id || ct.name} value={ct.name}>{ct.name}</SelectItem>
                                                                                ))}
                                                                            </SelectContent>
                                                                        </Select>
                                                                    </div>
                                                                </div>
                                                            </section>

                                                            <section>
                                                                <h3 className="text-[13px] font-semibold text-[#23471d] pb-1 border-b border-slate-200 mb-2 flex items-center gap-2">
                                                                    <Heart className="w-5 h-5 text-[#d26019]" /> Medical Background
                                                                </h3>
                                                                <div className="space-y-3 bg-slate-50 px-6 py-3 border border-slate-200">
                                                                    {[
                                                                        { label: "Existing Medical Conditions?", key: "existingMedicalConditions", area: "existingMedicalConditions" },
                                                                        { label: "Currently taking medications?", key: "isTakingMedications", area: "medicationNames" },
                                                                        { label: "Do you have any allergies?", key: "hasAllergies", area: "allergyDetails" },
                                                                        { label: "Experiencing any symptoms currently?", key: "isExperiencingSymptoms", area: "symptomDetails" },
                                                                    ].map(({ label, key, area }) => (
                                                                        <div key={key} className="grid grid-cols-1 md:grid-cols-3 gap-2 items-start">
                                                                            <div>
                                                                                <Label className="text-[12px] font-semibold text-gray-700 uppercase">{label}</Label>
                                                                                <RadioGroup value={(healthCampData as any)[key]} onValueChange={(v) => setHealthCampData(prev => ({ ...prev, [key]: v }))} className="flex gap-4 mt-1">
                                                                                    {["yes", "no"].map(val => (
                                                                                        <div key={val} className="flex items-center space-x-2">
                                                                                            <RadioGroupItem value={val} id={`${key}-${val}`} className="w-4 h-4 border-slate-400 text-[#23471d]" />
                                                                                            <Label htmlFor={`${key}-${val}`} className="text-[11px] font-semibold text-gray-600 uppercase cursor-pointer">{val}</Label>
                                                                                        </div>
                                                                                    ))}
                                                                                </RadioGroup>
                                                                            </div>
                                                                            <div className="md:col-span-2">
                                                                                {(healthCampData as any)[key] === "yes" && (
                                                                                    <textarea
                                                                                        className="w-full h-10 p-2 border border-slate-400 focus:border-[#23471d] outline-none text-[12.5px] rounded-[2px] bg-white resize-none shadow-inner"
                                                                                        placeholder="Provide details here..."
                                                                                        value={(healthCampData as any)[area]}
                                                                                        onChange={(e) => setHealthCampData(prev => ({ ...prev, [area]: e.target.value }))}
                                                                                    />
                                                                                )}
                                                                            </div>
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                            </section>

                                                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                                                                <section>
                                                                    <h3 className="text-[13px] font-semibold text-[#23471d] pb-1 border-b border-slate-200 mb-2 flex items-center gap-2">
                                                                        <Activity className="w-5 h-5 text-[#d26019]" /> Health Check-Up Services
                                                                    </h3>
                                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 bg-[#f0f4f0] p-4 border border-[#23471d]/20 rounded-sm">
                                                                        {HEALTH_SERVICES.map(({ key, label }) => (
                                                                            <label key={key} className="flex items-center gap-3 cursor-pointer group">
                                                                                <Checkbox
                                                                                    checked={healthCampData.healthCheckupServices[key]}
                                                                                    onCheckedChange={(checked: boolean) => handleHealthServiceChange(key, checked)}
                                                                                    className="w-4 h-4 rounded border-slate-400 data-[state=checked]:bg-[#23471d] data-[state=checked]:border-[#23471d]"
                                                                                />
                                                                                <span className="text-[13px] font-medium text-gray-600 group-hover:text-[#23471d] transition-colors">{label}</span>
                                                                            </label>
                                                                        ))}
                                                                    </div>
                                                                </section>

                                                                <section>
                                                                    <h3 className="text-[13px] font-semibold text-[#23471d] pb-1 border-b border-slate-200 mb-2 flex items-center gap-2">
                                                                        <Calendar className="w-5 h-5 text-[#d26019]" /> Appointment Schedule
                                                                    </h3>
                                                                    <div className="space-y-5 bg-slate-50 px-6 py-4 rounded border border-slate-200">
                                                                        <div>
                                                                            <Label className={labelClasses}>PREFERRED DATE <span className="text-red-500">*</span></Label>
                                                                            <Input name="preferredDate" type="date" value={healthCampData.preferredDate} onChange={handleHealthCampInputChange} required className={inputClasses} />
                                                                        </div>
                                                                        <div>
                                                                            <Label className={labelClasses}>PREFERRED TIME SLOT <span className="text-red-500">*</span></Label>
                                                                            <Select value={healthCampData.preferredTimeSlot} onValueChange={(v) => setHealthCampData(prev => ({ ...prev, preferredTimeSlot: v }))}>
                                                                                <SelectTrigger className={inputClasses}>
                                                                                    <SelectValue placeholder="Select Time Slot" />
                                                                                </SelectTrigger>
                                                                                <SelectContent className="bg-white">
                                                                                    {TIME_SLOTS.map(slot => (
                                                                                        <SelectItem key={slot} value={slot}>{slot}</SelectItem>
                                                                                    ))}
                                                                                </SelectContent>
                                                                            </Select>
                                                                        </div>
                                                                    </div>
                                                                </section>
                                                            </div>

                                                            <section className="bg-orange-50 p-6 border-l-4 border-[#d26019] space-y-3">
                                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                                                    <div className="space-y-3">
                                                                        {[
                                                                            { label: "Consent to share medical data for analysis?", key: "consentMedicalData", name: "consent" },
                                                                            { label: "Agree to health updates & reminders?", key: "agreeToUpdates", name: "updates" },
                                                                        ].map(({ label, key, name }) => (
                                                                            <div key={key}>
                                                                                <Label className="text-[12px] font-semibold text-gray-700 uppercase block mb-1 leading-tight">{label} <span className="text-red-500">*</span></Label>
                                                                                <RadioGroup value={(healthCampData as any)[key]} onValueChange={(v) => setHealthCampData(prev => ({ ...prev, [key]: v }))} className="flex gap-6">
                                                                                    {["yes", "no"].map(val => (
                                                                                        <div key={val} className="flex items-center space-x-2">
                                                                                            <RadioGroupItem value={val} id={`${name}-${val}`} className="w-4 h-4 border-slate-400 text-[#23471d]" />
                                                                                            <Label htmlFor={`${name}-${val}`} className="text-[11px] font-medium text-gray-700 uppercase cursor-pointer">{val}</Label>
                                                                                        </div>
                                                                                    ))}
                                                                                </RadioGroup>
                                                                            </div>
                                                                        ))}
                                                                    </div>
                                                                    <div>
                                                                        <Label className={labelClasses}>SPECIFIC HEALTH CONCERNS OR QUESTIONS?</Label>
                                                                        <textarea
                                                                            className="w-full h-20 p-2 border border-slate-400 focus:border-[#23471d] outline-none text-[12.5px] rounded-[2px] bg-white resize-none"
                                                                            placeholder="Mention any specific concerns for the doctors..."
                                                                            value={healthCampData.specificHealthConcerns}
                                                                            onChange={(e) => setHealthCampData(prev => ({ ...prev, specificHealthConcerns: e.target.value }))}
                                                                        />
                                                                    </div>
                                                                </div>
                                                                <div className="pt-4 border-t border-orange-100">
                                                                    <label className="flex items-center gap-3 cursor-pointer group">
                                                                        <Checkbox
                                                                            checked={healthCampData.subscribe}
                                                                            onCheckedChange={(checked: boolean) => setHealthCampData(prev => ({ ...prev, subscribe: checked }))}
                                                                            className="w-5 h-5 rounded border-slate-400 data-[state=checked]:bg-[#23471d] data-[state=checked]:border-[#23471d]"
                                                                        />
                                                                        <span className="text-sm font-bold text-gray-700 uppercase tracking-tight">Subscribe to Event Updates & Wellness Newsletters</span>
                                                                    </label>
                                                                </div>
                                                            </section>

                                                            <div className="py-6 border-t border-slate-100 flex flex-col sm:flex-row justify-between items-center bg-white">
                                                                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em] flex items-center gap-2 mb-4 sm:mb-0">
                                                                    <ShieldCheck size={14} className="text-[#23471d]" />
                                                                    Secure Visitor Portal
                                                                </p>
                                                                <div className="flex gap-4">
                                                                    <Button type="button" onClick={resetHealthCampForm} variant="outline" className="px-10 h-9 bg-red-50 border-red-200 text-red-600 text-[11px] font-bold uppercase tracking-widest hover:bg-red-100">
                                                                        Reset Form
                                                                    </Button>
                                                                    <Button type="submit" disabled={loading} className="px-12 h-9 bg-[#23471d] hover:bg-[#1a3516] text-white text-[11px] font-bold uppercase tracking-widest rounded-[2px] shadow-lg flex items-center gap-3">
                                                                        {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <>Submit Registration <Send size={15} /></>}
                                                                    </Button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )}

                                                    {visitorType !== "freeHealth" && (
                                                        <>
                                                    {/* —— PERSONAL DETAILS —— */}
                                                    <div className="">
                                                        <h3
                                                            className="text-sm font-bold text-[#d26019] uppercase tracking-[0.05em] border-b border-slate-100 pb-1.5"
                                                            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                                                        >
                                                            Personal Information
                                                        </h3>
                                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-x-5 gap-y-4">

                                                            <div>
                                                                <Label className={labelClasses}>FIRST NAME <span className=" text-red-500">*</span></Label>
                                                                <Input
                                                                    name="firstName"
                                                                    value={formData.firstName}
                                                                    onChange={handleInputChange}
                                                                    required placeholder="Enter First Name" className={inputClasses}
                                                                />
                                                            </div>
                                                            <div>
                                                                <Label className={labelClasses}>LAST NAME <span className=" text-red-500">*</span></Label>
                                                                <Input
                                                                    name="lastName"
                                                                    value={formData.lastName}
                                                                    onChange={handleInputChange}
                                                                    required placeholder="Enter Last Name" className={inputClasses}
                                                                />
                                                            </div>
                                                            {visitorType === "corporate" && (
                                                                <div>
                                                                    <Label className={labelClasses}>DESIGNATION <span className=" text-red-500">*</span></Label>
                                                                    <Input
                                                                        name="designation"
                                                                        value={formData.designation}
                                                                        onChange={handleInputChange}
                                                                        required placeholder="Enter Designation.." className={inputClasses}
                                                                    />
                                                                </div>
                                                            )}
                                                            <div>
                                                                <Label className={labelClasses}>GENDER <span className=" text-red-500">*</span></Label>
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
                                                                <Label className={labelClasses}>MOBILE NO. (WHATSAPP) <span className=" text-red-500">*</span></Label>
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
                                                                <Label className={labelClasses}>EMAIL ADDRESS <span className=" text-red-500">*</span></Label>
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

                                                        {/* —— DUAL OTP INPUT GRID —— */}
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

                                                    {/* —— PROFESSIONAL DETAILS —— */}
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
                                                                    <Label className={labelClasses}>COMPANY NAME <span className=" text-red-500">*</span></Label>
                                                                    <Input
                                                                        name="companyName"
                                                                        value={formData.companyName}
                                                                        onChange={handleInputChange}
                                                                        required placeholder="Enter Company Name.." className={inputClasses}
                                                                    />
                                                                </div>
                                                                <div>
                                                                    <Label className={labelClasses}>COMPANY WEBSITE <span className=" text-red-500">*</span></Label>
                                                                    <Input
                                                                        name="companyWebsite"
                                                                        value={formData.companyWebsite}
                                                                        onChange={handleInputChange}
                                                                        required placeholder="Enter Company Website.." className={inputClasses}
                                                                    />
                                                                </div>
                                                                <div>
                                                                    <Label className={labelClasses}>INDUSTRY/SECTOR <span className=" text-red-500">*</span></Label>
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
                                                                    <Label className={labelClasses}>COMPANY SIZE <span className=" text-red-500">*</span></Label>
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
                                                                        <Label className={labelClasses}>COUNTRY <span className=" text-red-500">*</span></Label>
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
                                                                    <Label className={labelClasses}>STATE <span className=" text-red-500">*</span></Label>
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
                                                                    <Label className={labelClasses}>CITY <span className=" text-red-500">*</span></Label>
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
                                                                    <Label className={labelClasses}>Pincode <span className=" text-red-500">*</span></Label>
                                                                    <Input
                                                                        name="companyPincode"
                                                                        value={formData.companyPincode}
                                                                        onChange={handleInputChange}
                                                                        required placeholder="Enter Pincode" className={inputClasses}
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )}

                                                    {/* —— PURPOSE & INTEREST —— */}
                                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                                        {/* Purpose of Visit */}
                                                        <div className="space-y-4 bg-slate-50/50 p-5 border border-slate-300 rounded-[2px] shadow-sm">
                                                            <Label className="text-[11px] font-bold text-[#23471d] uppercase tracking-wider block border-b border-slate-200 pb-2">Purpose of Visit <span className=" text-red-500">*</span></Label>
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
                                                            <Label className="text-[11px] font-bold text-[#23471d] uppercase tracking-wider block border-b border-slate-200 pb-2">Area of Interest <span className=" text-red-500">*</span></Label>
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
                                                                <Label className="text-[11px] font-bold text-slate-900 uppercase tracking-wider block">Would you like to schedule B2B meetings? <span className=" text-red-500">*</span></Label>
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

                                                    {/* —— NEWSLETTER —— */}
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

                                                    {/* —— SUBMIT BAR —— */}
                                                    <div className="pt-6 flex flex-col items-center">
                                                        <Button
                                                            type="submit"
                                                            disabled={loading || !emailVerified || !phoneVerified}
                                                            className="w-full max-w-56 h-12 rounded-sm bg-[#23471d] hover:bg-[#1a3516] text-white font-bold text-xs uppercase tracking-widest transition-all duration-300 shadow-xl shadow-[#23471d]/10 flex items-center justify-center gap-3 group disabled:opacity-70 disabled:cursor-not-allowed"
                                                        >
                                                            {loading ? (
                                                                <>
                                                                    <Loader2 className="w-5 h-5 animate-spin" />
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
                                                        </>
                                                    )}
                                                </form>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default VisitorRegistration;
