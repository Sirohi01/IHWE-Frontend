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
import { heroBackgroundApi, SERVER_URL, verifyApi, visitorApi, eventApi } from "@/lib/api";
import HeroBg from "@/assets/car22.jpg";

const COUNTRIES = [
    "Afghanistan", "Albania", "Algeria", "American Samoa", "Andorra", "Angola", "Anguilla", "Antarctica", "Antigua And Barbuda", "Argentina", "Armenia", "Aruba", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bermuda", "Bhutan", "Bolivia", "Bosnia And Herzegovina", "Botswana", "Bouvet Island", "Brazil", "British Indian Ocean Territory", "Brunei Darussalam", "Bulgaria", "Burkina Faso", "Burundi", "Cambodia", "Cameroon", "Canada", "Cape Verde", "Cayman Islands", "Central African Republic", "Chad", "Chile", "China", "Christmas Island", "Cocos (Keeling) Islands", "Colombia", "Comoros", "Congo", "Congo, The Democratic Republic Of The", "Cook Islands", "Costa Rica", "Cote D'ivoire", "Croatia", "Cuba", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Ethiopia", "Falkland Islands (Malvinas)", "Faroe Islands", "Fiji", "Finland", "France", "French Guiana", "French Polynesia", "French Southern Territories", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Gibraltar", "Greece", "Greenland", "Grenada", "Guadeloupe", "Guam", "Guatemala", "Guinea", "Guinea-bissau", "Guyana", "Haiti", "Heard Island And Mcdonald Islands", "Holy See (Vatican City State)", "Honduras", "Hong Kong", "Hungary", "Iceland", "India", "Indonesia", "Iran, Islamic Republic Of", "Iraq", "Ireland", "Israel", "Italy", "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Korea, Democratic People's Republic Of", "Korea, Republic Of", "Kuwait", "Kyrgyzstan", "Lao People's Democratic Republic", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libyan Arab Jamahiriya", "Liechtenstein", "Lithuania", "Luxembourg", "Macao", "Macedonia, The Former Yugoslav Republic Of", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Martinique", "Mauritania", "Mauritius", "Mayotte", "Mexico", "Micronesia, Federated States Of", "Moldova, Republic Of", "Monaco", "Mongolia", "Montserrat", "Morocco", "Mozambique", "Myanmar", "Namibia", "Nauru", "Nepal", "Netherlands", "Netherlands Antilles", "New Caledonia", "New Zealand", "Nicaragua", "Niger", "Nigeria", "Niue", "Norfolk Island", "Northern Mariana Islands", "Norway", "Oman", "Pakistan", "Palau", "Palestinian Territory, Occupied", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Pitcairn", "Poland", "Portugal", "Puerto Rico", "Qatar", "Reunion", "Romania", "Russian Federation", "Rwanda", "Saint Helena", "Saint Kitts And Nevis", "Saint Lucia", "Saint Pierre And Miquelon", "Saint Vincent And The Grenadines", "Samoa", "San Marino", "Sao Tome And Principe", "Saudi Arabia", "Senegal", "Serbia And Montenegro", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Georgia And The South Sandwich Islands", "Spain", "Sri Lanka", "Sudan", "Suriname", "Svalbard And Jan Mayen", "Swaziland", "Sweden", "Switzerland", "Syrian Arab Republic", "Taiwan, Province Of China", "Tajikistan", "Tanzania, United Republic Of", "Thailand", "Timor-leste", "Togo", "Tokelau", "Tonga", "Trinidad And Tobago", "Tunisia", "Turkey", "Turkmenistan", "Turks And Caicos Islands", "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States", "United States Minor Outlying Islands", "Uruguay", "Uzbekistan", "Vanuatu", "Venezuela", "Viet Nam", "Virgin Islands, British", "Virgin Islands, U.s.", "Wallis And Futuna", "Western Sahara", "Yemen", "Zambia", "Zimbabwe"
];

const PURPOSE_GENERAL = [
    "Business Networking",
    "Exploring New Products",
    "Buying Products & Services",
    "Learning Industry Trends",
    "Others"
];

const PURPOSE_CORPORATE = [
    "Exploring Business Opportunities",
    "Networking & Collaborations",
    "Meeting Exhibitors & Suppliers",
    "Learning About Latest Trends",
    "Attending Arogya Sangosthi Seminar"
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
    "AYUSH & Herbal Products",
    "Fitness & Nutrition",
    "Health & Wellness",
    "Bio-Medicine & Research",
    "Organic Farming & Agriculture",
    "HealthTech & Startups"
];

const VisitorRegistration = () => {
    const [visitorType, setVisitorType] = useState("corporate");
    const [isSuccess, setIsSuccess] = useState(false);
    const [heroData, setHeroData] = useState<any>(null);
    const [events, setEvents] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

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

    useEffect(() => {
        const fetchInitialData = async () => {
            try {
                const [heroRes, eventsRes] = await Promise.all([
                    heroBackgroundApi.getByPage("Registration / Visitor Registration"),
                    eventApi.getActive()
                ]);
                if (heroRes) setHeroData(heroRes);
                setEvents(eventsRes);
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

    const handleInputChange = (e: any) => {
        const { name, value, type, checked } = e.target;
        
        if (name === 'email') setEmailVerified(false);
        if (name === 'mobileNo') setPhoneVerified(false);

        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
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
                        ayushHerbal: formData.areaOfInterest.includes("AYUSH & Herbal Products"),
                        organicProducts: formData.areaOfInterest.includes("Organic & Natural Products"),
                        fitnessWellness: formData.areaOfInterest.includes("Fitness & Wellness Equipment"),
                        healthSupplements: formData.areaOfInterest.includes("Health Supplements"),
                        healthcareServices: formData.areaOfInterest.includes("Hospitals & Healthcare Services"),
                        agricultureFarming: formData.areaOfInterest.includes("Agriculture & Organic Farming"),
                        researchInnovations: formData.areaOfInterest.includes("R&D & Innovations"),
                        others: formData.areaOfInterest.includes("Others")
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
                        ayushHerbal: formData.areaOfInterest.includes("AYUSH & Herbal Products"),
                        healthWellness: formData.areaOfInterest.includes("Health & Wellness"),
                        organicFarming: formData.areaOfInterest.includes("Organic Farming & Agriculture"),
                        fitnessNutrition: formData.areaOfInterest.includes("Fitness & Nutrition"),
                        bioMedicine: formData.areaOfInterest.includes("Bio-Medicine & Research"),
                        healthTech: formData.areaOfInterest.includes("HealthTech & Startups")
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
                    backgroundImage: `url(${heroData?.backgroundImage ? `${SERVER_URL}${heroData.backgroundImage}` : HeroBg})`,
                    aspectRatio: '16 / 5'
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
                    <div className="space-y-8">
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
                                        Thank you for registering. Your details have been successfully submitted. You will receive a confirmation shortly.
                                    </p>
                                    <div className="flex items-center gap-3 text-sm text-slate-400 font-bold uppercase tracking-widest">
                                        <div className="w-2.5 h-2.5 rounded-full bg-green-400 animate-pulse" />
                                        Redirecting or resetting in 5 seconds...
                                    </div>
                                    
                                    <div className="mt-10 flex gap-4">
                                        <Link to="/">
                                            <Button className="h-11 px-8 rounded-sm bg-[#23471d] hover:bg-[#1a3516] text-xs font-bold uppercase tracking-widest shadow-lg shadow-[#23471d]/20 transition-all active:scale-95">
                                                Go to Homepage
                                            </Button>
                                        </Link>
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
                                    <div className="bg-slate-50/80 border-b border-slate-200 px-8 py-4">
                                        <h2 
                                            className="text-xl font-bold text-slate-900 uppercase"
                                            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                                        >
                                            Visitor Registration
                                        </h2>
                                        <p className="text-[10px] text-slate-500 uppercase tracking-[0.2em] mt-0.5 font-bold">International Health & Wellness Expo 2026</p>
                                    </div>

                                    <form onSubmit={handleSubmit} className="p-8 space-y-8 font-inter">
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

                                            <Link to="/buyer-registration">
                                                <Button 
                                                    type="button"
                                                    variant="outline"
                                                    className="rounded-full px-6 h-9 border-[#d26019] text-[#d26019] hover:bg-[#d26019] hover:text-white text-[11px] font-bold uppercase tracking-wider transition-all"
                                                >
                                                    Buyer Register
                                                </Button>
                                            </Link>
                                        </div>

                                        {/* ── PERSONAL DETAILS ── */}
                                        <div className="space-y-6">
                                            <h3 
                                                className="text-sm font-bold text-[#d26019] uppercase tracking-[0.05em] border-b border-slate-100 pb-1.5"
                                                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                                            >
                                                Personal Information
                                            </h3>
                                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-5 gap-y-4">
                                                <div>
                                                    <Label className={labelClasses}>REGISTRATION FOR *</Label>
                                                    <Select 
                                                        onValueChange={(v) => setFormData(prev => ({ ...prev, registrationFor: v }))}
                                                        value={formData.registrationFor}
                                                    >
                                                        <SelectTrigger className={inputClasses}>
                                                            <SelectValue placeholder="Select Here" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            {events.map(e => (
                                                                <SelectItem key={e._id} value={e._id}>{e.name}</SelectItem>
                                                            ))}
                                                            {!events.length && (
                                                                <>
                                                                    <SelectItem value="organic_expo">5th Organic Expo 2026</SelectItem>
                                                                    <SelectItem value="ihwe_expo">9th International Health and Wellness Expo</SelectItem>
                                                                </>
                                                            )}
                                                        </SelectContent>
                                                    </Select>
                                                </div>
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

                                                {/* Email & OTP Row */}
                                                <div className="relative flex flex-col group">
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
                                                    <Label className={labelClasses}>ALTERNATE NO. (OPTIONAL)</Label>
                                                    <Input 
                                                        name="alternateNo"
                                                        value={formData.alternateNo}
                                                        onChange={handleInputChange}
                                                        placeholder="Enter Alternate No." className={inputClasses} 
                                                    />
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
                                                                <div className="flex gap-2 items-center bg-orange-50/50 p-2 border border-orange-100 rounded-sm">
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
                                            <div className="space-y-6">
                                                <h3 
                                                    className="text-sm font-bold text-[#d26019] uppercase tracking-[0.05em] border-b border-slate-100 pb-1.5"
                                                    style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                                                >
                                                    Company & Industry Information
                                                </h3>
                                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-5 gap-y-4">
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
                                                    <div>
                                                        <Label className={labelClasses}>COUNTRY *</Label>
                                                        <Select
                                                            onValueChange={(v) => setFormData(prev => ({ ...prev, country: v }))}
                                                            value={formData.country}
                                                        >
                                                            <SelectTrigger className={inputClasses}>
                                                                <SelectValue placeholder="Select Country" />
                                                            </SelectTrigger>
                                                            <SelectContent className="max-h-[300px] bg-white">
                                                                {COUNTRIES.map(c => (
                                                                    <SelectItem key={c} value={c}>{c}</SelectItem>
                                                                ))}
                                                            </SelectContent>
                                                        </Select>
                                                    </div>
                                                    <div>
                                                        <Label className={labelClasses}>STATE *</Label>
                                                        <Input 
                                                            name="state"
                                                            value={formData.state}
                                                            onChange={handleInputChange}
                                                            placeholder="Enter State" className={inputClasses} 
                                                        />
                                                    </div>
                                                    <div>
                                                        <Label className={labelClasses}>CITY *</Label>
                                                        <Input 
                                                            name="city"
                                                            value={formData.city}
                                                            onChange={handleInputChange}
                                                            placeholder="Enter City" className={inputClasses} 
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
                                                className="w-full max-w-sm h-12 rounded-sm bg-[#23471d] hover:bg-[#1a3516] text-white font-bold text-xs uppercase tracking-widest transition-all duration-300 shadow-xl shadow-[#23471d]/10 flex items-center justify-center gap-3 group disabled:opacity-70 disabled:cursor-not-allowed"
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
