import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
    CheckCircle,
    Loader2,
    Send, ChevronRight,
    ShieldCheck,
    Mic2,
    Building2,
    Linkedin,
    UserCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { heroBackgroundApi, verifyApi, SERVER_URL } from "@/lib/api";
import HeroBg from "@/assets/speakers.jpg";

const COUNTRIES = [
    "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda", "Argentina", "Armenia", "Australia", "Austria", "Azerbaijan",
    "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bhutan", "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria", "Burkina Faso", "Burundi",
    "Cote d'Ivoire", "Cabo Verde", "Cambodia", "Cameroon", "Canada", "Central African Republic", "Chad", "Chile", "China", "Colombia", "Comoros", "Congo (Congo-Brazzaville)", "Costa Rica", "Croatia", "Cuba", "Cyprus", "Czechia (Czech Republic)",
    "Democratic Republic of the Congo", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Eswatini", "Ethiopia", "Fiji", "Finland", "France", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Greece", "Grenada", "Guatemala", "Guinea", "Guinea-Bissau", "Guyana", "Haiti", "Holy See", "Honduras", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Israel", "Italy", "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Kuwait", "Kyrgyzstan", "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Mauritania", "Mauritius", "Mexico", "Micronesia", "Moldova", "Monaco", "Mongolia", "Montenegro", "Morocco", "Mozambique", "Myanmar (formerly Burma)", "Namibia", "Nauru", "Nepal", "Netherlands", "New Zealand", "Nicaragua", "Niger", "Nigeria", "North Korea", "North Macedonia", "Norway", "Oman", "Pakistan", "Palau", "Palestine State", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Qatar", "Romania", "Russia", "Rwanda", "Saint Kitts and Nevis", "Saint Lucia", "Saint Vincent and the Grenadines", "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Korea", "South Sudan", "Spain", "Sri Lanka", "Sudan", "Suriname", "Sweden", "Switzerland", "Syria", "Tajikistan", "Tanzania", "Thailand", "Timor-Leste", "Togo", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan", "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States of America", "Uruguay", "Uzbekistan", "Vanuatu", "Venezuela", "Vietnam", "Yemen", "Zambia", "Zimbabwe"
];

import Swal from 'sweetalert2';

const SpeakerRegistration = () => {
    const [heroData, setHeroData] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Verification State
    const [emailOtp, setEmailOtp] = useState("");
    const [phoneOtp, setPhoneOtp] = useState("");
    const [emailVerified, setEmailVerified] = useState(false);
    const [phoneVerified, setPhoneVerified] = useState(false);
    const [emailOtpSent, setEmailOtpSent] = useState(false);
    const [phoneOtpSent, setPhoneOtpSent] = useState(false);
    const [verifyingEmail, setVerifyingEmail] = useState(false);
    const [verifyingPhone, setVerifyingPhone] = useState(false);
    const [sendingEmailOtp, setSendingEmailOtp] = useState(false);
    const [sendingPhoneOtp, setSendingPhoneOtp] = useState(false);
    const [emailResendTimer, setEmailResendTimer] = useState(0);
    const [phoneResendTimer, setPhoneResendTimer] = useState(0);

    const [formData, setFormData] = useState({
        title: "",
        firstName: "",
        lastName: "",
        officialEmail: "",
        mobileNo: "",
        linkedinUrl: "",
        organizationName: "",
        designation: "",
        areaOfExpertise: "",
        country: "",
        state: "",
        city: "",
        proposedTopic: "",
        shortBiography: ""
    });

    useEffect(() => {
        const fetchHero = async () => {
            try {
                const data = await heroBackgroundApi.getByPage("Registration / Speaker Registration");
                if (data) setHeroData(data);
            } catch (err) {
                console.error("Error fetching hero:", err);
            }
        };
        fetchHero();
    }, []);

    // Timer logic for OTP resend
    useEffect(() => {
        let emailInterval: any;
        let phoneInterval: any;

        if (emailResendTimer > 0) {
            emailInterval = setInterval(() => {
                setEmailResendTimer((prev) => prev - 1);
            }, 1000);
        }

        if (phoneResendTimer > 0) {
            phoneInterval = setInterval(() => {
                setPhoneResendTimer((prev) => prev - 1);
            }, 1000);
        }

        return () => {
            clearInterval(emailInterval);
            clearInterval(phoneInterval);
        };
    }, [emailResendTimer, phoneResendTimer]);

    const sendEmailOtp = async () => {
        if (!formData.officialEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.officialEmail)) {
            setError("Please enter a valid official email address first.");
            return;
        }
        if (emailResendTimer > 0) return;

        setSendingEmailOtp(true);
        setError(null);

        const timeoutId = setTimeout(() => {
            if (sendingEmailOtp) {
                setSendingEmailOtp(false);
                Swal.fire({
                    icon: 'warning',
                    title: 'Request Timeout',
                    text: 'The email service is taking longer than expected. Please try again.',
                    confirmButtonColor: '#d26019'
                });
            }
        }, 45000);

        try {
            const res = await verifyApi.sendEmailOtp(formData.officialEmail);
            clearTimeout(timeoutId);
            if (res.success) {
                setEmailOtpSent(true);
                setEmailResendTimer(60);
                setError(null);
                Swal.fire({
                    icon: 'success',
                    title: 'OTP Sent!',
                    text: `A 6-digit verification code has been sent to ${formData.officialEmail}.`,
                    timer: 3000,
                    showConfirmButton: false,
                    color: '#23471d'
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Failed to Send OTP',
                    text: res.message || 'Email service is temporarily unavailable.',
                    confirmButtonColor: '#d26019'
                });
                setSendingEmailOtp(false);
            }
        } catch (err: any) {
            clearTimeout(timeoutId);
            Swal.fire({
                icon: 'error',
                title: 'Network Error',
                text: 'Could not connect to the verification server. Please check your internet.',
                confirmButtonColor: '#d26019'
            });
            setSendingEmailOtp(false);
        } finally {
            setSendingEmailOtp(false);
        }
    };

    const confirmEmailOtp = async () => {
        if (!emailOtp) return;
        setVerifyingEmail(true);
        setError(null);
        try {
            const res = await verifyApi.verifyEmailOtp(formData.officialEmail, emailOtp);
            if (res.success) {
                setEmailVerified(true);
                setEmailOtpSent(false);
            } else {
                setError(res.message || "Invalid Email OTP.");
            }
        } catch (err) {
            setError("Error verifying email OTP.");
        } finally {
            setVerifyingEmail(false);
        }
    };

    const sendPhoneOtp = async () => {
        if (!/^[0-9]{10,15}$/.test(formData.mobileNo.replace(/[^0-9]/g, ""))) {
            setError("Please enter a valid phone number first.");
            return;
        }
        if (phoneResendTimer > 0) return;

        setSendingPhoneOtp(true);
        setError(null);

        // Safety timeout for UI state
        const timeoutId = setTimeout(() => {
            setSendingPhoneOtp(prev => {
                if (prev) {
                    setError("WhatsApp service is taking too long. Please try again.");
                    return false;
                }
                return prev;
            });
        }, 12000);

        try {
            const res = await verifyApi.sendPhoneOtp(formData.mobileNo);
            clearTimeout(timeoutId);
            if (res.success) {
                setPhoneOtpSent(true);
                setPhoneResendTimer(60);
                setError(null);
                Swal.fire({
                    icon: 'success',
                    title: 'OTP Sent!',
                    text: 'A 6-digit verification code has been sent to your WhatsApp.',
                    timer: 3000,
                    showConfirmButton: false,
                    color: '#23471d'
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Failed to Send OTP',
                    text: res.message || 'WhatsApp service is temporarily unavailable. Please use the "Resend" option in 60 seconds.',
                    confirmButtonColor: '#d26019'
                });
                setSendingPhoneOtp(false);
            }
        } catch (err: any) {
            clearTimeout(timeoutId);
            Swal.fire({
                icon: 'error',
                title: 'Network Error',
                text: 'Could not connect to the verification server. Please check your internet.',
                confirmButtonColor: '#d26019'
            });
            setSendingPhoneOtp(false);
        } finally {
            setSendingPhoneOtp(false);
        }
    };

    const confirmPhoneOtp = async () => {
        if (!phoneOtp) return;
        setVerifyingPhone(true);
        setError(null);
        try {
            const res = await verifyApi.verifyPhoneOtp(formData.mobileNo, phoneOtp);
            if (res.success) {
                setPhoneVerified(true);
                setPhoneOtpSent(false);
            } else {
                setError(res.message || "Invalid WhatsApp OTP.");
            }
        } catch (err) {
            setError("Error verifying phone OTP.");
        } finally {
            setVerifyingPhone(false);
        }
    };

    const handleInputChange = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        if (error) setError(null);

        // Reset verification if email or phone changes
        if (field === "officialEmail") {
            setEmailVerified(false);
            setEmailOtpSent(false);
            setEmailResendTimer(0);
        }
        if (field === "mobileNo") {
            setPhoneVerified(false);
            setPhoneOtpSent(false);
            setPhoneResendTimer(0);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!emailVerified || !phoneVerified) {
            setError("Please verify both your email and mobile number first.");
            const Toast = Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true
            });
            Toast.fire({
                icon: 'warning',
                title: 'Contact Verification Required'
            });
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const response = await fetch(`${SERVER_URL}/api/speaker-nomination`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (data.success) {
                Swal.fire({
                    title: '<span style="color: #23471d; font-family: serif;">Nomination Received!</span>',
                    html: `<p style="font-family: inter; font-size: 14px; color: #4b5563;">Thank you, <b>${formData.firstName}</b>. Your expertise is valuable to us. Our committee will review your proposal and get back to you shortly.</p>`,
                    icon: 'success',
                    iconColor: '#23471d',
                    confirmButtonText: 'GO TO HOMEPAGE',
                    confirmButtonColor: '#23471d',
                    padding: '2.5rem',
                    background: '#ffffff',
                    customClass: {
                        popup: 'rounded-[2px] shadow-2xl border border-slate-100',
                        confirmButton: 'rounded-[2px] font-bold tracking-widest text-[10px] py-3 px-8 transition-all hover:scale-105 active:scale-95'
                    }
                }).then((result) => {
                    if (result.isConfirmed) {
                        window.location.href = '/';
                    }
                });
            } else {
                setError(data.message || "Failed to submit nomination. Please try again.");
            }
        } catch (err) {
            console.error("Submission error:", err);
            setError("Something went wrong. Please check your connection.");
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
            {/* ── HERO SECTION ── */}
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
                        {heroData?.title || "Speaker Registration"}
                    </p>

                    <h1 
                        className="text-4xl md:text-6xl font-serif font-semibold mb-6 italic tracking-tight"
                    >
                        {heroData?.heading || "Share Your Expertise"}
                    </h1>

                    <p className="text-white/70 text-base md:text-lg mb-8 max-w-xl mx-auto font-light leading-relaxed">
                        {heroData?.shortDescription || "Join our prestigious lineup of 150+ speakers. Inspire thousands with your insights on health and wellness."}
                    </p>
                </div>
            </section>

            {/* ── MAIN CONTENT ── */}
            <section className="pt-8 pb-24 relative overflow-hidden">
                <div className="container mx-auto px-6 max-w-[1400px]">
                    <div className="space-y-8">
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-white border border-slate-300 shadow-2xl overflow-hidden"
                        >
                            <div className="bg-slate-50/80 border-b border-slate-200 px-8 py-4">
                                <h2 
                                    className="text-xl font-bold text-slate-900 uppercase"
                                    style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                                >
                                    Speaker Nomination
                                </h2>
                                <p className="text-[10px] text-slate-500 uppercase tracking-[0.2em] mt-0.5 font-bold">IHWE 2026 Speaker Portal</p>
                            </div>

                            <form onSubmit={handleSubmit} className="p-8 space-y-8 font-inter">
                                {/* ── PERSONAL DETAILS ── */}
                                <div className="space-y-6">
                                    <h3 
                                        className="text-sm font-bold text-[#d26019] uppercase tracking-[0.05em] border-b border-slate-100 pb-1.5"
                                        style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                                    >
                                        Speaker Information
                                    </h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-5 gap-y-4">
                                        <div>
                                            <Label className={labelClasses}>TITLE *</Label>
                                            <Select 
                                                required
                                                value={formData.title} 
                                                onValueChange={(val) => handleInputChange("title", val)}
                                            >
                                                <SelectTrigger className={inputClasses}>
                                                    <SelectValue placeholder="Select Title" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="dr">Dr.</SelectItem>
                                                    <SelectItem value="prof">Prof.</SelectItem>
                                                    <SelectItem value="mr">Mr.</SelectItem>
                                                    <SelectItem value="ms">Ms.</SelectItem>
                                                    <SelectItem value="mrs">Mrs.</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <div>
                                            <Label className={labelClasses}>FIRST NAME *</Label>
                                            <Input 
                                                required 
                                                placeholder="Enter First Name" 
                                                className={inputClasses} 
                                                value={formData.firstName}
                                                onChange={(e) => handleInputChange("firstName", e.target.value)}
                                            />
                                        </div>
                                        <div>
                                            <Label className={labelClasses}>LAST NAME *</Label>
                                            <Input 
                                                required 
                                                placeholder="Enter Last Name" 
                                                className={inputClasses} 
                                                value={formData.lastName}
                                                onChange={(e) => handleInputChange("lastName", e.target.value)}
                                            />
                                        </div>
                                        <div>
                                            <Label className={labelClasses}>OFFICIAL EMAIL *</Label>
                                            <div className="relative flex items-center group">
                                                <Input 
                                                    type="email" 
                                                    required 
                                                    placeholder="Enter Email.." 
                                                    className={`${inputClasses} ${emailVerified ? "bg-green-50 border-green-200" : ""}`} 
                                                    value={formData.officialEmail}
                                                    onChange={(e) => handleInputChange("officialEmail", e.target.value)}
                                                    disabled={emailVerified || emailOtpSent}
                                                />
                                                {!emailVerified && (
                                                    <Button
                                                        type="button"
                                                        onClick={sendEmailOtp}
                                                        disabled={sendingEmailOtp || !formData.officialEmail || emailResendTimer > 0}
                                                        className="absolute right-1 top-1 bottom-1 h-auto px-3 bg-[#23471d] text-white text-[10px] uppercase font-bold tracking-wider rounded-sm hover:bg-[#1a3a14] disabled:bg-slate-300 transition-all shadow-sm z-10"
                                                    >
                                                        {sendingEmailOtp ? "..." : emailResendTimer > 0 ? `${emailResendTimer}s` : emailOtpSent ? "Resend" : "Send OTP"}
                                                    </Button>
                                                )}
                                                {emailVerified && <CheckCircle size={14} className="absolute right-3 text-green-500 animate-in zoom-in duration-300" />}
                                            </div>
                                        </div>
                                        <div>
                                            <Label className={labelClasses}>MOBILE NO. *</Label>
                                            <div className="relative flex items-center group">
                                                <Input 
                                                    required 
                                                    placeholder="Enter Mobile.." 
                                                    className={`${inputClasses} ${phoneVerified ? "bg-green-50 border-green-200" : ""}`}
                                                    value={formData.mobileNo}
                                                    onChange={(e) => handleInputChange("mobileNo", e.target.value)}
                                                    disabled={phoneVerified || phoneOtpSent}
                                                />
                                                {!phoneVerified && (
                                                    <Button
                                                        type="button"
                                                        onClick={sendPhoneOtp}
                                                        disabled={sendingPhoneOtp || !formData.mobileNo || phoneResendTimer > 0}
                                                        className="absolute right-1 top-1 bottom-1 h-auto px-3 bg-[#23471d] text-white text-[10px] uppercase font-bold tracking-wider rounded-sm hover:bg-[#1a3a14] disabled:bg-slate-300 transition-all shadow-sm z-10"
                                                    >
                                                        {sendingPhoneOtp ? "..." : phoneResendTimer > 0 ? `${phoneResendTimer}s` : phoneOtpSent ? "Resend" : "Send OTP"}
                                                    </Button>
                                                )}
                                                {phoneVerified && <CheckCircle size={14} className="absolute right-3 text-green-500 animate-in zoom-in duration-300" />}
                                            </div>
                                        </div>
                                        <div>
                                            <Label className={labelClasses}>LINKEDIN PROFILE URL *</Label>
                                            <Input 
                                                required 
                                                placeholder="https://linkedin.com/in/.." 
                                                className={inputClasses} 
                                                value={formData.linkedinUrl}
                                                onChange={(e) => handleInputChange("linkedinUrl", e.target.value)}
                                            />
                                        </div>
                                    </div>

                                    {/* SEPARATE OTP INPUTS SECTION */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-5 gap-y-4 mt-6 min-h-[110px]">
                                        {/* Email OTP Verification */}
                                        <div className="min-h-[70px]">
                                            <AnimatePresence mode="wait">
                                                {emailOtpSent && !emailVerified && (
                                                    <motion.div 
                                                        key="email-otp-box"
                                                        initial={{ opacity: 0, y: 10 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        exit={{ opacity: 0, y: 10 }}
                                                        className="bg-orange-50/50 border border-orange-200 p-3 rounded-[2px]"
                                                    >
                                                        <Label className="text-[9px] font-extrabold text-[#d26019] uppercase tracking-widest block mb-1.5 leading-none">Enter Email OTP</Label>
                                                        <div className="relative flex items-center">
                                                            <Input 
                                                                type="text" 
                                                                placeholder="6-Digit Code.." 
                                                                value={emailOtp} 
                                                                onChange={(e) => setEmailOtp(e.target.value)}
                                                                maxLength={6}
                                                                autoComplete="off"
                                                                name="speaker-email-otp-field"
                                                                inputMode="numeric"
                                                                className={`${inputClasses} h-8 text-center tracking-[0.5em] font-bold border-orange-200 focus:border-[#d26019] bg-white pr-16`}
                                                            />
                                                            <Button 
                                                                type="button"
                                                                onClick={confirmEmailOtp}
                                                                disabled={verifyingEmail || !emailOtp}
                                                                className="absolute right-1 top-1 bottom-1 h-auto px-3 bg-[#d26019] hover:bg-[#b05015] text-[9px] font-bold uppercase tracking-wider rounded-sm transition-all z-10"
                                                            >
                                                                {verifyingEmail ? <Loader2 className="w-3 h-3 animate-spin" /> : "Verify"}
                                                            </Button>
                                                        </div>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </div>

                                        {/* Mobile OTP Verification */}
                                        <div className="min-h-[70px]">
                                            <AnimatePresence mode="wait">
                                                {phoneOtpSent && !phoneVerified && (
                                                    <motion.div 
                                                        key="phone-otp-box"
                                                        initial={{ opacity: 0, y: 10 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        exit={{ opacity: 0, y: 10 }}
                                                        className="bg-green-50/50 border border-green-200 p-3 rounded-[2px]"
                                                    >
                                                        <Label className="text-[9px] font-extrabold text-[#23471d] uppercase tracking-widest block mb-1.5 leading-none">Enter WhatsApp OTP</Label>
                                                        <div className="relative flex items-center">
                                                            <Input 
                                                                type="text" 
                                                                placeholder="6-Digit Code.." 
                                                                value={phoneOtp} 
                                                                onChange={(e) => setPhoneOtp(e.target.value)}
                                                                maxLength={6}
                                                                autoComplete="off"
                                                                name="speaker-phone-otp-field"
                                                                inputMode="numeric"
                                                                className={`${inputClasses} h-8 text-center tracking-[0.5em] font-bold border-green-200 focus:border-[#23471d] bg-white pr-16`}
                                                            />
                                                            <Button 
                                                                type="button"
                                                                onClick={confirmPhoneOtp}
                                                                disabled={verifyingPhone || !phoneOtp}
                                                                className="absolute right-1 top-1 bottom-1 h-auto px-3 bg-[#23471d] hover:bg-[#1a3516] text-[9px] font-bold uppercase tracking-wider rounded-sm transition-all z-10"
                                                            >
                                                                {verifyingPhone ? <Loader2 className="w-3 h-3 animate-spin" /> : "Verify"}
                                                            </Button>
                                                        </div>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </div>
                                    </div>
                                </div>

                                {/* ── PROFESSIONAL DETAILS ── */}
                                <div className="space-y-6">
                                    <h3 
                                        className="text-sm font-bold text-[#d26019] uppercase tracking-[0.05em] border-b border-slate-100 pb-1.5"
                                        style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                                    >
                                        Organization / Expertise
                                    </h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-5 gap-y-4">
                                        <div className="lg:col-span-2">
                                            <Label className={labelClasses}>ORGANIZATION NAME *</Label>
                                            <Input 
                                                required 
                                                placeholder="Enter Organization Name.." 
                                                className={inputClasses} 
                                                value={formData.organizationName}
                                                onChange={(e) => handleInputChange("organizationName", e.target.value)}
                                            />
                                        </div>
                                        <div>
                                            <Label className={labelClasses}>DESIGNATION *</Label>
                                            <Input 
                                                required 
                                                placeholder="Enter Designation.." 
                                                className={inputClasses} 
                                                value={formData.designation}
                                                onChange={(e) => handleInputChange("designation", e.target.value)}
                                            />
                                        </div>
                                        <div>
                                            <Label className={labelClasses}>AREA OF EXPERTISE *</Label>
                                            <Input 
                                                required 
                                                placeholder="e.g. Ayurveda, HealthTech.." 
                                                className={inputClasses} 
                                                value={formData.areaOfExpertise}
                                                onChange={(e) => handleInputChange("areaOfExpertise", e.target.value)}
                                            />
                                        </div>
                                        <div>
                                            <Label className={labelClasses}>COUNTRY *</Label>
                                            <Select 
                                                required
                                                value={formData.country}
                                                onValueChange={(val) => handleInputChange("country", val)}
                                            >
                                                <SelectTrigger className={inputClasses}>
                                                    <SelectValue placeholder="Select Country" />
                                                </SelectTrigger>
                                                <SelectContent className="max-h-[300px]">
                                                    {COUNTRIES.map(c => (
                                                        <SelectItem key={c} value={c}>{c}</SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <div>
                                            <Label className={labelClasses}>STATE *</Label>
                                            <Input 
                                                required 
                                                placeholder="Enter State.." 
                                                className={inputClasses} 
                                                value={formData.state}
                                                onChange={(e) => handleInputChange("state", e.target.value)}
                                            />
                                        </div>
                                        <div>
                                            <Label className={labelClasses}>CITY *</Label>
                                            <Input 
                                                required 
                                                placeholder="Enter City.." 
                                                className={inputClasses} 
                                                value={formData.city}
                                                onChange={(e) => handleInputChange("city", e.target.value)}
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <Label className="text-[11px] font-bold text-slate-900 uppercase tracking-wider block">Proposed Topic of Discussion *</Label>
                                    <Input 
                                        required 
                                        placeholder="Enter Topic Title.." 
                                        className={inputClasses} 
                                        value={formData.proposedTopic}
                                        onChange={(e) => handleInputChange("proposedTopic", e.target.value)}
                                    />
                                </div>

                                <div className="space-y-4">
                                    <Label className="text-[11px] font-bold text-slate-900 uppercase tracking-wider block">Short Biography *</Label>
                                    <Input 
                                        required 
                                        placeholder="Write a short bio (max 150 words).." 
                                        className={inputClasses} 
                                        value={formData.shortBiography}
                                        onChange={(e) => handleInputChange("shortBiography", e.target.value)}
                                    />
                                </div>

                                {/* ── SUBMIT BAR ── */}
                                <div className="pt-6 flex flex-col items-center">
                                    {error && (
                                        <p className="text-red-500 text-xs font-bold uppercase tracking-wider mb-4 animate-pulse">
                                            Error: {error}
                                        </p>
                                    )}
                                    <Button
                                        type="submit"
                                        disabled={loading || !emailVerified || !phoneVerified}
                                        className={`w-full max-w-sm h-12 rounded-sm text-white font-bold text-xs uppercase tracking-widest transition-all duration-300 shadow-xl flex items-center justify-center gap-3 group ${(!emailVerified || !phoneVerified) ? "bg-slate-400 cursor-not-allowed" : "bg-[#23471d] hover:bg-[#1a3516] shadow-[#23471d]/10"}`}
                                    >
                                        {loading ? (
                                            <span className="flex items-center gap-2">
                                                <Loader2 size={14} className="animate-spin" />
                                                Sending Nomination...
                                            </span>
                                        ) : (
                                            <>
                                                {(!emailVerified || !phoneVerified) ? (
                                                    <>Verify Contact to Continue</>
                                                ) : (
                                                    <>SUBMIT NOMINATION</>
                                                )}
                                            </>
                                        )}
                                    </Button>
                                    <p className="mt-4 text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em] flex items-center gap-2">
                                        <ShieldCheck size={12} className="text-[#23471d]" />
                                        Speaker Nomination Portal
                                    </p>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default SpeakerRegistration;
