import { useState, useEffect } from "react";
import advisoryHeroImage from "../assets/advisory/advisoryimagelogo.webp";
import { otpApi, advisoryNominationApi } from "../lib/api";
import { toast } from "sonner";

const AdvisoryForm = () => {
    const [formData, setFormData] = useState({
        fullName: "",
        designation: "",
        organization: "",
        industry: "",
        email: "",
        phone: "",
        linkedin: "",
        areasOfExpertise: "",
        yearsOfExperience: "",
        professionalSummary: "",
        whyRecommend: "",
        contribution: "",
        nominatorName: "",
        nominatorDesignation: "",
        nominatorOrg: "",
        nominatorEmail: "",
        nominatorPhone: "",
        relationship: "",
    });

    const [cvFile, setCvFile] = useState<File | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);


    const [emailOtpSent, setEmailOtpSent] = useState(false);
    const [emailOtpVerified, setEmailOtpVerified] = useState(false);
    const [emailOtpValue, setEmailOtpValue] = useState("");
    const [mobileOtpSent, setMobileOtpSent] = useState(false);
    const [mobileOtpVerified, setMobileOtpVerified] = useState(false);
    const [mobileOtpValue, setMobileOtpValue] = useState("");
    const [isVerifying, setIsVerifying] = useState({
        nominatorEmail: false, nominatorMobile: false,
        nomineeEmail: false, nomineeMobile: false
    });
    const [emailResendTimer, setEmailResendTimer] = useState(0);
    const [mobileResendTimer, setMobileResendTimer] = useState(0);

    // Nominee OTP States
    const [nomineeEmailOtpSent, setNomineeEmailOtpSent] = useState(false);
    const [nomineeEmailOtpVerified, setNomineeEmailOtpVerified] = useState(false);
    const [nomineeEmailOtpValue, setNomineeEmailOtpValue] = useState("");
    const [nomineeMobileOtpSent, setNomineeMobileOtpSent] = useState(false);
    const [nomineeMobileOtpVerified, setNomineeMobileOtpVerified] = useState(false);
    const [nomineeMobileOtpValue, setNomineeMobileOtpValue] = useState("");
    const [nomineeEmailResendTimer, setNomineeEmailResendTimer] = useState(0);
    const [nomineeMobileResendTimer, setNomineeMobileResendTimer] = useState(0);

    const [charCount, setCharCount] = useState({
        professionalSummary: 0,
        whyRecommend: 0,
        contribution: 0,
    });

    const [confirmed, setConfirmed] = useState(false);

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

    useEffect(() => {
        let neTimer: any;
        if (nomineeEmailResendTimer > 0) {
            neTimer = setInterval(() => setNomineeEmailResendTimer(prev => prev - 1), 1000);
        }
        return () => clearInterval(neTimer);
    }, [nomineeEmailResendTimer]);

    useEffect(() => {
        let nmTimer: any;
        if (nomineeMobileResendTimer > 0) {
            nmTimer = setInterval(() => setNomineeMobileResendTimer(prev => prev - 1), 1000);
        }
        return () => clearInterval(nmTimer);
    }, [nomineeMobileResendTimer]);

    const handleChange = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        if (name in charCount) {
            setCharCount((prev) => ({ ...prev, [name]: value.length }));
        }
    };

    const requestOtp = async (type: 'email' | 'mobile', target: 'nominee' | 'nominator' = 'nominator') => {
        const identifier = target === 'nominator'
            ? (type === 'email' ? formData.nominatorEmail : formData.nominatorPhone)
            : (type === 'email' ? formData.email : formData.phone);

        const name = target === 'nominator' ? formData.nominatorName : formData.fullName;

        if (!identifier) {
            toast.error(`Please enter ${target}'s ${type} first.`);
            return;
        }

        const verifyKey = target === 'nominator'
            ? (type === 'email' ? 'nominatorEmail' : 'nominatorMobile')
            : (type === 'email' ? 'nomineeEmail' : 'nomineeMobile');

        setIsVerifying(prev => ({ ...prev, [verifyKey]: true }));
        try {
            const res = await otpApi.request(identifier, type === 'email' ? 'email' : 'phone', name, 'ADVISORY');
            if (res.success) {
                toast.success(`OTP sent to ${target}'s ${type}.`);
                if (target === 'nominator') {
                    if (type === 'email') { setEmailOtpSent(true); setEmailResendTimer(60); }
                    else { setMobileOtpSent(true); setMobileResendTimer(60); }
                } else {
                    if (type === 'email') { setNomineeEmailOtpSent(true); setNomineeEmailResendTimer(60); }
                    else { setNomineeMobileOtpSent(true); setNomineeMobileResendTimer(60); }
                }
            } else {
                toast.error(res.message || `Failed to send OTP.`);
            }
        } catch (err) {
            toast.error("Connection error.");
        } finally {
            setIsVerifying(prev => ({ ...prev, [verifyKey]: false }));
        }
    };

    const verifyOtp = async (type: 'email' | 'mobile', target: 'nominee' | 'nominator' = 'nominator') => {
        const identifier = target === 'nominator'
            ? (type === 'email' ? formData.nominatorEmail : formData.nominatorPhone)
            : (type === 'email' ? formData.email : formData.phone);

        const otp = target === 'nominator'
            ? (type === 'email' ? emailOtpValue : mobileOtpValue)
            : (type === 'email' ? nomineeEmailOtpValue : nomineeMobileOtpValue);

        if (!otp) {
            toast.error("Please enter OTP.");
            return;
        }

        const verifyKey = target === 'nominator'
            ? (type === 'email' ? 'nominatorEmail' : 'nominatorMobile')
            : (type === 'email' ? 'nomineeEmail' : 'nomineeMobile');

        setIsVerifying(prev => ({ ...prev, [verifyKey]: true }));
        try {
            const res = await otpApi.verify(identifier, otp, type === 'email' ? 'email' : 'phone');
            if (res.success) {
                toast.success(`${target === 'nominator' ? 'Nominator' : 'Nominee'} ${type} verified!`);
                if (target === 'nominator') {
                    type === 'email' ? setEmailOtpVerified(true) : setMobileOtpVerified(true);
                } else {
                    type === 'email' ? setNomineeEmailOtpVerified(true) : setNomineeMobileOtpVerified(true);
                }
            } else {
                toast.error(res.message || "Invalid OTP.");
            }
        } catch (err) {
            toast.error("Verification failed.");
        } finally {
            setIsVerifying(prev => ({ ...prev, [verifyKey]: false }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Validation
        if (!nomineeEmailOtpVerified || !nomineeMobileOtpVerified) {
            toast.error("Please verify Nominee's email and phone via OTP.");
            return;
        }
        if (!emailOtpVerified || !mobileOtpVerified) {
            toast.error("Please verify your (Nominator) email and phone via OTP.");
            return;
        }

        if (!confirmed) {
            toast.error("Please confirm the information accuracy.");
            return;
        }

        setIsSubmitting(true);
        try {
            const data = new FormData();
            Object.entries(formData).forEach(([key, value]) => {
                data.append(key, value);
            });

            // Add verification status
            data.append('otpVerifiedEmail', nomineeEmailOtpVerified.toString());
            data.append('otpVerifiedMobile', nomineeMobileOtpVerified.toString());
            data.append('nominatorOtpVerifiedEmail', emailOtpVerified.toString());
            data.append('nominatorOtpVerifiedMobile', mobileOtpVerified.toString());

            if (cvFile) {
                data.append('cv', cvFile);
            }

            const res = await advisoryNominationApi.submit(data);
            if (res.success) {
                toast.success("Nomination submitted successfully!");
                setSubmitted(true);
            } else {
                toast.error(res.message || "Submission failed.");
            }
        } catch (err) {
            toast.error("An error occurred during submission.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const requiredStar = <span className="text-red-600">*</span>;

    return (
        <div className="w-full mx-auto font-sans overflow-x-hidden">

            <div
                className="w-full h-[250px] md:h-[400px] relative flex items-start flex-shrink-0 bg-cover bg-center md:rounded-xl overflow-hidden"
                style={{ backgroundImage: `url(${advisoryHeroImage})` }}
            >
                <div className="absolute top-4 md:top-[28px] left-4 md:left-[50px] flex flex-col gap-2 md:gap-3">
                    <img
                        src="/logo.png"
                        alt="IHWE Logo"
                        className="w-[200px] md:w-[380px] h-auto object-contain drop-shadow-md"
                    />
                    <div className="text-[#1a5c2a] text-sm md:text-lg font-bold tracking-wide pl-1 md:pl-4">
                        Global Platform. &nbsp; Limitless Possibilities.
                    </div>
                </div>


                <div className="absolute bottom-0 inset-x-0 h-[120px] opacity-10">
                    <svg viewBox="0 0 1400 120" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" className="w-full h-full">
                        <path d="M0,120 L0,80 L40,80 L40,60 L60,60 L60,40 L80,40 L80,60 L100,60 L100,50 L110,50 L110,30 L120,30 L120,20 L130,20 L130,30 L140,30 L140,50 L150,50 L150,40 L170,40 L170,60 L190,60 L190,70 L220,70 L220,50 L240,50 L240,30 L250,30 L250,50 L260,50 L260,70 L300,70 L300,55 L310,55 L310,35 L320,35 L320,55 L340,55 L340,65 L380,65 L380,45 L390,45 L390,25 L400,25 L400,45 L420,45 L420,60 L460,60 L460,40 L475,40 L475,20 L485,20 L485,40 L500,40 L500,55 L540,55 L540,70 L580,70 L580,50 L600,50 L600,35 L610,35 L610,50 L630,50 L630,65 L670,65 L670,50 L690,50 L690,30 L700,30 L700,50 L720,50 L720,60 L760,60 L760,45 L780,45 L780,65 L820,65 L820,50 L840,50 L840,30 L850,30 L850,50 L870,50 L870,60 L910,60 L910,45 L920,45 L920,25 L930,25 L930,45 L950,45 L950,55 L990,55 L990,70 L1030,70 L1030,55 L1050,55 L1050,35 L1060,35 L1060,55 L1080,55 L1080,65 L1120,65 L1120,50 L1140,50 L1140,30 L1150,30 L1150,50 L1170,50 L1170,60 L1210,60 L1210,45 L1230,45 L1230,65 L1270,65 L1270,75 L1350,75 L1350,120 Z" fill="#1a5c2a" />
                    </svg>
                </div>
            </div>

            {/* ── BODY ── */}
            <div className="max-w-[1390px] md:ml-[30px] w-full mx-auto bg-white box-border px-4 md:px-9 py-4 pb-6">
                <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
                    {/* LEFT SIDEBAR */}
                    <div className="w-full lg:w-[420px] shrink-0 lg:pr-8 lg:border-r border-gray-100">
                        <div className="mb-8">
                            <div className="text-[20px] md:text-[24px] font-black text-[#1a5c2a] leading-tight uppercase tracking-tight">
                                ADVISORY BOARD MEMBERS
                            </div>
                            <div className="text-[15px] md:text-[18px] font-bold text-gray-800 uppercase tracking-wide mt-1">
                                NOMINATION FORM
                            </div>
                            <div className="w-12 h-1 bg-[#1a5c2a] my-4" />
                            <div className="text-[13.5px] text-gray-600 font-medium leading-relaxed">
                                Nominate an exceptional leader to join the Advisory Board of the
                                International Health & Wellness Expo 2026 and help shape the
                                future of global health & wellness.
                            </div>
                        </div>

                        {/* WHY NOMINATE Box */}
                        <div className="bg-[#fcfdfc] border border-gray-100 rounded-2xl p-6 shadow-sm mb-10">
                            <div className="text-sm font-extrabold text-[#1a5c2a] uppercase tracking-wider mb-2">
                                WHY NOMINATE?
                            </div>
                            <div className="w-8 h-[2px] bg-[#1a5c2a] mb-6" />

                            {[
                                {
                                    icon: (
                                        <svg viewBox="0 0 24 24" fill="none" stroke="#1a5c2a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
                                            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
                                        </svg>
                                    ),
                                    title: "Shape the Future",
                                    desc: "Contribute to strategic direction and innovation in health & wellness."
                                },
                                {
                                    icon: (
                                        <svg viewBox="0 0 24 24" fill="none" stroke="#1a5c2a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
                                            <circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                                        </svg>
                                    ),
                                    title: "Global Impact",
                                    desc: "Be part of a global platform driving positive change."
                                },
                                {
                                    icon: (
                                        <svg viewBox="0 0 24 24" fill="none" stroke="#1a5c2a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
                                            <path d="M18 8a3 3 0 0 0-3-3H5a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3V8z" /><path d="M10 12h.01" /><path d="M14 12h.01" /><path d="M6 12h.01" />
                                        </svg>
                                    ),
                                    title: "Network & Collaborate",
                                    desc: "Connect with industry leaders and changemakers worldwide."
                                },
                                {
                                    icon: (
                                        <svg viewBox="0 0 24 24" fill="none" stroke="#1a5c2a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
                                            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                                        </svg>
                                    ),
                                    title: "Recognition",
                                    desc: "Celebrate excellence and leadership in the health & wellness ecosystem."
                                },
                            ].map((item, i, arr) => (
                                <div key={i}>
                                    <div className="flex gap-3 items-start mb-0 last:mb-0">
                                        <div className="w-[54px] h-[54px] rounded-full border-2 border-[#1a5c2a] flex items-center justify-center shrink-0 bg-white shadow-sm">
                                            {item.icon}
                                        </div>
                                        <div className="pt-1">
                                            <div className="text-[15px] font-bold text-[#1a5c2a] mb-1.5">{item.title}</div>
                                            <div className="text-[13px] text-gray-500 font-medium leading-relaxed">{item.desc}</div>
                                        </div>
                                    </div>
                                    {i < arr.length - 1 && <div className="border-b border-dashed border-gray-100 mb-7" />}
                                </div>
                            ))}
                        </div>

                        {/* NEED HELP box */}
                        <div className="bg-[#144a21] rounded-xl p-5 text-white mt-8 relative overflow-hidden shadow-lg">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                                        <path d="M3 18v-6a9 9 0 0 1 18 0v6" /><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
                                    </svg>
                                </div>
                                <span className="text-base font-black tracking-wider uppercase">NEED HELP?</span>
                            </div>

                            <div className="space-y-3 mb-4">
                                <div className="flex items-center gap-3 text-[13px] font-semibold">
                                    <span className="text-lg">✉️</span>
                                    <span className="hover:underline cursor-pointer">info@ihwe.in</span>
                                </div>
                                <div className="flex items-center gap-3 text-[13px] font-semibold">
                                    <span className="text-lg">📞</span>
                                    <span>+91 9654900525</span>
                                </div>
                            </div>

                            <div className="border-t border-white/20 pt-4 text-[13px] font-bold opacity-100 flex justify-between items-end">
                                <span>We're here to assist you!</span>
                                <div className="text-2xl opacity-30 rotate-12">🌿</div>
                            </div>

                            {/* Corner leaf accent */}
                            <div className="absolute -bottom-4 -right-4 text-[100px] opacity-10 pointer-events-none">🌿</div>
                        </div>
                    </div>

                    {/* RIGHT FORM */}
                    <div className="flex-1">
                        {submitted ? (
                            <div className="flex flex-col items-center justify-center h-[500px] text-center p-10 bg-[#fcfdfc] rounded-2xl border border-gray-100 shadow-sm">
                                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
                                    <span className="text-4xl">🎉</span>
                                </div>
                                <h2 className="text-2xl font-bold text-[#1a5c2a] mb-4">Nomination Submitted Successfully!</h2>
                                <p className="text-gray-600 mb-8 max-w-md">
                                    Thank you for your nomination. We have received the details for {formData.fullName}.
                                    A confirmation has been sent to your email and WhatsApp.
                                </p>
                                <button
                                    onClick={() => window.location.reload()}
                                    className="bg-[#1a5c2a] text-white px-8 py-3 rounded-lg font-bold hover:bg-[#144a21] transition-colors"
                                >
                                    SUBMIT ANOTHER NOMINATION
                                </button>
                            </div>
                        ) : (
                            <>
                                {/* ── SECTION 01 ── */}
                                <div className="flex items-center gap-3 mb-2 mt-2">
                                    <div className="bg-[#1a5c2a] text-white font-extrabold text-[14px] h-8 w-12 flex items-center justify-center pr-1.5 rounded-l-md shrink-0" style={{ clipPath: "polygon(0 0, 80% 0, 100% 50%, 80% 100%, 0 100%)" }}>
                                        01
                                    </div>
                                    <div className="w-8 h-8 rounded-full bg-[#e8f5e9] flex items-center justify-center shrink-0">
                                        <svg viewBox="0 0 24 24" fill="currentColor" className="w-4.5 h-4.5 text-[#1a5c2a]"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" /></svg>
                                    </div>
                                    <div className="text-[#1a5c2a] text-[12px] md:text-[15px] font-extrabold tracking-wide uppercase shrink-0">
                                        NOMINEE INFORMATION
                                    </div>
                                    <div className="flex-1 h-[1px] bg-[#1a5c2a] opacity-30 ml-3" />
                                </div>
                                <div className="border border-gray-200 rounded-xl shadow-sm p-4 px-5 bg-white mb-4">
                                    {/* Row 1: 4 columns */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
                                        <div className="flex flex-col gap-1">
                                            <label className="text-[13px] font-semibold text-gray-800 mb-0.5 block">Full Name of Nominee {requiredStar}</label>
                                            <input name="fullName" placeholder="Enter full name" value={formData.fullName} onChange={handleChange} className="h-[38px] w-full border border-gray-300 rounded-md px-3 text-sm text-gray-700 outline-none bg-white font-sans" />
                                        </div>
                                        <div className="flex flex-col gap-1">
                                            <label className="text-[13px] font-semibold text-gray-800 mb-0.5 block">Designation / Title {requiredStar}</label>
                                            <input name="designation" placeholder="Enter designation" value={formData.designation} onChange={handleChange} className="h-[38px] w-full border border-gray-300 rounded-md px-3 text-sm text-gray-700 outline-none bg-white font-sans" />
                                        </div>
                                        <div className="flex flex-col gap-1">
                                            <label className="text-[13px] font-semibold text-gray-800 mb-0.5 block">Organization / Institution {requiredStar}</label>
                                            <div className="relative flex items-center">
                                                <span className="absolute left-2.5 text-sm text-gray-400">🏢</span>
                                                <input name="organization" placeholder="Enter organization" value={formData.organization} onChange={handleChange} className="h-[38px] w-full border border-gray-300 rounded-md pl-8 pr-3 text-sm text-gray-700 outline-none bg-white font-sans" />
                                            </div>
                                        </div>
                                        <div className="flex flex-col gap-1">
                                            <label className="text-[13px] font-semibold text-gray-800 mb-0.5 block">Industry / Sector {requiredStar}</label>
                                            <select name="industry" value={formData.industry} onChange={handleChange} className={`w-full border border-gray-300 rounded-md py-2.5 px-3 text-sm outline-none bg-white font-sans ${formData.industry ? 'text-gray-700' : 'text-gray-400'}`}>
                                                <option value="">Select industry / sector</option>
                                                <option>Healthcare</option>
                                                <option>Wellness & Fitness</option>
                                                <option>Pharmaceuticals</option>
                                                <option>Nutrition</option>
                                                <option>Technology</option>
                                                <option>Research & Academia</option>
                                                <option>Government & Policy</option>
                                                <option>Other</option>
                                            </select>
                                        </div>
                                    </div>

                                    {/* Row 2: 3 columns (Email, Phone, LinkedIn) */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                                        <div className="flex flex-col gap-1 col-span-2">
                                            <label className="text-[13px] font-semibold text-gray-800 mb-0.5 block">Email Address {requiredStar}</label>
                                            <div className="relative flex items-center">
                                                <span className="absolute left-2.5 text-sm text-gray-400">✉️</span>
                                                <input name="email" type="email" placeholder="Enter email address" value={formData.email} onChange={handleChange} disabled={nomineeEmailOtpVerified} className={`h-[38px] w-full border border-gray-300 rounded-md pl-8 pr-20 text-sm text-gray-700 outline-none bg-white font-sans ${nomineeEmailOtpVerified ? 'bg-green-50 border-green-200' : ''}`} />
                                                {!nomineeEmailOtpVerified && (
                                                    <button
                                                        onClick={() => requestOtp('email', 'nominee')}
                                                        disabled={isVerifying.nomineeEmail || nomineeEmailResendTimer > 0}
                                                        className="absolute right-1 px-2 py-1 bg-[#1a5c2a] text-white text-[10px] rounded hover:bg-[#144a21] disabled:opacity-50"
                                                    >
                                                        {nomineeEmailOtpSent ? (nomineeEmailResendTimer > 0 ? `Resend (${nomineeEmailResendTimer}s)` : 'Resend') : 'Verify'}
                                                    </button>
                                                )}
                                                {nomineeEmailOtpVerified && <span className="absolute right-2 text-green-600 text-sm">✓</span>}
                                            </div>
                                            {nomineeEmailOtpSent && !nomineeEmailOtpVerified && (
                                                <div className="mt-1 flex gap-1 animate-in fade-in slide-in-from-top-1 duration-200">
                                                    <input
                                                        type="text"
                                                        placeholder="Enter OTP"
                                                        value={nomineeEmailOtpValue}
                                                        onChange={(e) => setNomineeEmailOtpValue(e.target.value)}
                                                        className="h-[30px] flex-1 border border-gray-300 rounded px-2 text-xs"
                                                    />
                                                    <button
                                                        onClick={() => verifyOtp('email', 'nominee')}
                                                        disabled={isVerifying.nomineeEmail}
                                                        className="h-[30px] px-2 bg-green-600 text-white text-[10px] rounded"
                                                    >
                                                        Submit
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                        <div className="flex flex-col gap-1 col-span-2">
                                            <label className="text-[13px] font-semibold text-gray-800 mb-0.5 block">Phone Number {requiredStar}</label>
                                            <div className={`flex items-center border border-gray-300 rounded-md overflow-hidden bg-white h-[38px] transition-all ${nomineeMobileOtpVerified ? 'bg-green-50 border-green-200' : 'focus-within:border-[#1a5c2a] focus-within:ring-1 focus-within:ring-[#1a5c2a]/20'}`}>
                                                <div className="flex items-center gap-1 px-2 border-r border-gray-200 h-full bg-gray-50/50 shrink-0">
                                                    <select className="border-none outline-none text-[11px] font-bold text-gray-600 bg-transparent cursor-pointer ">
                                                        <option>+91</option>
                                                        <option>+1</option>
                                                    </select>
                                                </div>
                                                <div className="relative flex-1 h-full">
                                                    <input
                                                        name="phone"
                                                        placeholder="Enter phone number"
                                                        value={formData.phone}
                                                        onChange={handleChange}
                                                        disabled={nomineeMobileOtpVerified}
                                                        className="w-full h-full border-none outline-none px-3 text-sm text-gray-700 bg-transparent font-sans"
                                                    />
                                                    {!nomineeMobileOtpVerified && (
                                                        <button
                                                            onClick={() => requestOtp('mobile', 'nominee')}
                                                            disabled={isVerifying.nomineeMobile || nomineeMobileResendTimer > 0}
                                                            className="absolute right-1 top-1/2 -translate-y-1/2 px-2 py-1 bg-[#1a5c2a] text-white text-[10px] rounded hover:bg-[#144a21] disabled:opacity-50"
                                                        >
                                                            {nomineeMobileOtpSent ? (nomineeMobileResendTimer > 0 ? `Resend (${nomineeMobileResendTimer}s)` : 'Resend') : 'Verify'}
                                                        </button>
                                                    )}
                                                    {nomineeMobileOtpVerified && <span className="absolute right-2 top-1/2 -translate-y-1/2 text-green-600 text-sm">✓</span>}
                                                </div>
                                            </div>
                                            {nomineeMobileOtpSent && !nomineeMobileOtpVerified && (
                                                <div className="mt-1 flex gap-1 animate-in fade-in slide-in-from-top-1 duration-200">
                                                    <input
                                                        type="text"
                                                        placeholder="Enter OTP"
                                                        value={nomineeMobileOtpValue}
                                                        onChange={(e) => setNomineeMobileOtpValue(e.target.value)}
                                                        className="h-[30px] flex-1 border border-gray-300 rounded px-2 text-xs"
                                                    />
                                                    <button
                                                        onClick={() => verifyOtp('mobile', 'nominee')}
                                                        disabled={isVerifying.nomineeMobile}
                                                        className="h-[30px] px-2 bg-green-600 text-white text-[10px] rounded"
                                                    >
                                                        Submit
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                        <div className="flex flex-col gap-1 col-span-1">
                                            <label className="text-[13px] font-semibold text-gray-800 mb-0.5 block">LinkedIn Profile</label>
                                            <div className="relative flex items-center">
                                                <span className="absolute left-2.5 text-sm text-gray-400">🔗</span>
                                                <input name="linkedin" placeholder="LinkedIn URL" value={formData.linkedin} onChange={handleChange} className="h-[38px] w-full border border-gray-300 rounded-md pl-8 pr-3 text-sm text-gray-700 outline-none bg-white font-sans" />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* ── SECTION 02 ── */}
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="bg-[#1a5c2a] text-white font-extrabold text-[14px] h-8 w-12 flex items-center justify-center pr-1.5 rounded-l-md shrink-0" style={{ clipPath: "polygon(0 0, 80% 0, 100% 50%, 80% 100%, 0 100%)" }}>
                                        02
                                    </div>
                                    <div className="w-8 h-8 rounded-full bg-[#e8f5e9] flex items-center justify-center shrink-0">
                                        <svg viewBox="0 0 24 24" fill="currentColor" className="w-4.5 h-4.5 text-[#1a5c2a]"><path d="M20 6h-4V4c0-1.11-.89-2-2-2h-4c-1.11 0-2 .89-2 2v2H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-6 0h-4V4h4v2z" /></svg>
                                    </div>
                                    <div className="text-[#1a5c2a] text-[12px] md:text-[15px] font-extrabold tracking-wide uppercase shrink-0">
                                        NOMINEE'S EXPERTISE & BACKGROUND
                                    </div>
                                    <div className="flex-1 h-[1px] bg-[#1a5c2a] opacity-30 ml-3" />
                                </div>
                                <div className="border border-gray-200 rounded-xl shadow-sm p-4 px-5 bg-white mb-4">
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                        <div className="flex flex-col gap-1">
                                            <label className="text-[13px] font-semibold text-gray-800 mb-0.5 block">Areas of Expertise {requiredStar}</label>
                                            <select name="areasOfExpertise" value={formData.areasOfExpertise} onChange={handleChange} className={`h-[38px] w-full border border-gray-300 rounded-md px-3 text-sm outline-none bg-white font-sans ${formData.areasOfExpertise ? 'text-gray-700' : 'text-gray-400'}`}>
                                                <option value="">Select one or more areas</option>
                                                <option>Clinical Medicine</option>
                                                <option>Public Health</option>
                                                <option>Nutrition & Dietetics</option>
                                                <option>Mental Health</option>
                                                <option>Health Technology</option>
                                                <option>Yoga & Alternative Medicine</option>
                                                <option>Research & Innovation</option>
                                                <option>Health Policy</option>
                                            </select>
                                        </div>
                                        <div className="flex flex-col gap-1">
                                            <label className="text-[13px] font-semibold text-gray-800 mb-0.5 block">Years of Experience {requiredStar}</label>
                                            <input name="yearsOfExperience" placeholder="Enter total years" value={formData.yearsOfExperience} onChange={handleChange} className="h-[38px] w-full border border-gray-300 rounded-md px-3 text-sm text-gray-700 outline-none bg-white font-sans" />
                                        </div>
                                        <div className="flex flex-col gap-1">
                                            <label className="text-[13px] font-semibold text-gray-800 mb-0.5 block">Professional Summary {requiredStar} <span className="text-[11px] text-gray-500 cursor-pointer">ℹ</span></label>
                                            <div className="relative">
                                                <textarea name="professionalSummary" placeholder="Brief background & achievements" value={formData.professionalSummary} onChange={handleChange} maxLength={1000} className="h-[38px] w-full border border-gray-300 rounded-md py-1.5 px-3 text-sm text-gray-700 outline-none bg-white font-sans resize-none" />
                                                <div className="absolute right-2.5 bottom-1 text-[10px] text-gray-400">{charCount.professionalSummary} / 1000</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* ── SECTION 03 ── */}
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="bg-[#1a5c2a] text-white font-extrabold text-[14px] h-8 w-12 flex items-center justify-center pr-1.5 rounded-l-md shrink-0" style={{ clipPath: "polygon(0 0, 80% 0, 100% 50%, 80% 100%, 0 100%)" }}>
                                        03
                                    </div>
                                    <div className="w-8 h-8 rounded-full bg-[#e8f5e9] flex items-center justify-center shrink-0">
                                        <svg viewBox="0 0 24 24" fill="currentColor" className="w-4.5 h-4.5 text-[#1a5c2a]"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-14c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm0-7c-1.65 0-3 1.35-3 3s1.35 3 3 3 3-1.35 3-3-1.35-3-3-3z" /></svg>
                                    </div>
                                    <div className="text-[#1a5c2a] text-[12px] md:text-[15px] font-extrabold tracking-wide uppercase shrink-0">
                                        NOMINATION DETAILS
                                    </div>
                                    <div className="flex-1 h-[1px] bg-[#1a5c2a] opacity-30 ml-3" />
                                </div>
                                <div className="border border-gray-200 rounded-xl shadow-sm p-4 px-5 bg-white mb-4">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                        <div className="flex flex-col gap-1">
                                            <label className="text-[13px] font-semibold text-gray-800 mb-0.5 block">Why do you recommend this nominee? {requiredStar} <span className="text-[11px] text-gray-500 cursor-pointer">ℹ</span></label>
                                            <div className="relative">
                                                <textarea name="whyRecommend" placeholder="Share your reasons..." value={formData.whyRecommend} onChange={handleChange} maxLength={1000} rows={3} className="w-full border border-gray-300 rounded-md py-2 px-3 text-sm text-gray-700 outline-none bg-white font-sans resize-none" />
                                                <div className="absolute right-2.5 bottom-1.5 text-[10px] text-gray-400">{charCount.whyRecommend} / 1000</div>
                                            </div>
                                        </div>
                                        <div className="flex flex-col gap-1">
                                            <label className="text-[13px] font-semibold text-gray-800 mb-0.5 block">How will they contribute to Expo 2026? {requiredStar} <span className="text-[11px] text-gray-500 cursor-pointer">ℹ</span></label>
                                            <div className="relative">
                                                <textarea name="contribution" placeholder="Potential impact & value" value={formData.contribution} onChange={handleChange} maxLength={1000} rows={3} className="w-full border border-gray-300 rounded-md py-2 px-3 text-sm text-gray-700 outline-none bg-white font-sans resize-none" />
                                                <div className="absolute right-2.5 bottom-1.5 text-[10px] text-gray-400">{charCount.contribution} / 1000</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* ── SECTION 04 ── */}
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="bg-[#1a5c2a] text-white font-extrabold text-[14px] h-8 w-12 flex items-center justify-center pr-1.5 rounded-l-md shrink-0" style={{ clipPath: "polygon(0 0, 80% 0, 100% 50%, 80% 100%, 0 100%)" }}>
                                        04
                                    </div>
                                    <div className="w-8 h-8 rounded-full bg-[#e8f5e9] flex items-center justify-center shrink-0">
                                        <svg viewBox="0 0 24 24" fill="currentColor" className="w-4.5 h-4.5 text-[#1a5c2a]"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" /></svg>
                                    </div>
                                    <div className="text-[#1a5c2a] text-[12px] md:text-[15px] font-extrabold tracking-wide uppercase shrink-0">
                                        NOMINATOR INFORMATION
                                    </div>
                                    <div className="flex-1 h-[1px] bg-[#1a5c2a] opacity-30 ml-3" />
                                </div>
                                <div className="border border-gray-200 rounded-xl shadow-sm p-4 px-5 bg-white mb-4">
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 mb-2.5">
                                        <div className="flex flex-col gap-1">
                                            <label className="text-[13px] font-semibold text-gray-800 mb-0.5 block">Your Full Name {requiredStar}</label>
                                            <input name="nominatorName" placeholder="Enter your full name" value={formData.nominatorName} onChange={handleChange} className="h-[38px] w-full border border-gray-300 rounded-md px-3 text-sm text-gray-700 outline-none bg-white font-sans" />
                                        </div>
                                        <div className="flex flex-col gap-1">
                                            <label className="text-[13px] font-semibold text-gray-800 mb-0.5 block">Designation / Title {requiredStar}</label>
                                            <input name="nominatorDesignation" placeholder="Enter designation" value={formData.nominatorDesignation} onChange={handleChange} className="h-[38px] w-full border border-gray-300 rounded-md px-3 text-sm text-gray-700 outline-none bg-white font-sans" />
                                        </div>
                                        <div className="flex flex-col gap-1">
                                            <label className="text-[13px] font-semibold text-gray-800 mb-0.5 block">Organization / Institution {requiredStar}</label>
                                            <div className="relative flex items-center">
                                                <span className="absolute left-2.5 text-sm text-gray-400">🏢</span>
                                                <input name="nominatorOrg" placeholder="Enter organization" value={formData.nominatorOrg} onChange={handleChange} className="h-[38px] w-full border border-gray-300 rounded-md pl-8 pr-3 text-sm text-gray-700 outline-none bg-white font-sans" />
                                            </div>
                                        </div>
                                        <div className="flex flex-col gap-1">
                                            <label className="text-[13px] font-semibold text-gray-800 mb-0.5 block">Email Address {requiredStar}</label>
                                            <div className="relative flex items-center">
                                                <span className="absolute left-2.5 text-sm text-gray-400">✉️</span>
                                                <input name="nominatorEmail" type="email" placeholder="Enter email address" value={formData.nominatorEmail} onChange={handleChange} disabled={emailOtpVerified} className={`h-[38px] w-full border border-gray-300 rounded-md pl-8 pr-20 text-sm text-gray-700 outline-none bg-white font-sans ${emailOtpVerified ? 'bg-green-50 border-green-200' : ''}`} />
                                                {!emailOtpVerified && (
                                                    <button
                                                        onClick={() => requestOtp('email', 'nominator')}
                                                        disabled={isVerifying.nominatorEmail || emailResendTimer > 0}
                                                        className="absolute right-1 px-2 py-1 bg-[#1a5c2a] text-white text-[10px] rounded hover:bg-[#144a21] disabled:opacity-50"
                                                    >
                                                        {emailOtpSent ? (emailResendTimer > 0 ? `Resend (${emailResendTimer}s)` : 'Resend') : 'Verify'}
                                                    </button>
                                                )}
                                                {emailOtpVerified && <span className="absolute right-2 text-green-600 text-sm">✓</span>}
                                            </div>
                                            {emailOtpSent && !emailOtpVerified && (
                                                <div className="mt-1 flex gap-1">
                                                    <input
                                                        type="text"
                                                        placeholder="Enter OTP"
                                                        value={emailOtpValue}
                                                        onChange={(e) => setEmailOtpValue(e.target.value)}
                                                        className="h-[30px] flex-1 border border-gray-300 rounded px-2 text-xs"
                                                    />
                                                    <button
                                                        onClick={() => verifyOtp('email', 'nominator')}
                                                        disabled={isVerifying.nominatorEmail}
                                                        className="h-[30px] px-2 bg-green-600 text-white text-[10px] rounded"
                                                    >
                                                        Submit
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                                        <div className="flex flex-col gap-1 col-span-1 md:col-span-2">
                                            <label className="text-[13px] font-semibold text-gray-800 mb-0.5 block">Phone Number {requiredStar}</label>
                                            <div className={`flex items-center border border-gray-300 rounded-md overflow-hidden bg-white h-[38px] transition-all ${mobileOtpVerified ? 'bg-green-50 border-green-200' : 'focus-within:border-[#1a5c2a] focus-within:ring-1 focus-within:ring-[#1a5c2a]/20'}`}>
                                                <div className="flex items-center gap-1 px-2 border-r border-gray-200 h-full bg-gray-50/50 shrink-0">
                                                    <span className="text-[14px]">📞</span>
                                                    <span className="text-[14px]">🇮🇳</span>
                                                    <select className="border-none outline-none text-[11px] font-bold text-gray-600 bg-transparent cursor-pointer ml-0.5">
                                                        <option>+91</option>
                                                        <option>+1</option>
                                                        <option>+44</option>
                                                    </select>
                                                </div>
                                                <div className="relative flex-1 h-full">
                                                    <input
                                                        name="nominatorPhone"
                                                        placeholder="Enter phone number"
                                                        value={formData.nominatorPhone}
                                                        onChange={handleChange}
                                                        disabled={mobileOtpVerified}
                                                        className="w-full h-full border-none outline-none px-3 text-sm text-gray-700 bg-transparent font-sans"
                                                    />
                                                    {!mobileOtpVerified && (
                                                        <button
                                                            onClick={() => requestOtp('mobile', 'nominator')}
                                                            disabled={isVerifying.nominatorMobile || mobileResendTimer > 0}
                                                            className="absolute right-1 top-1/2 -translate-y-1/2 px-2 py-1 bg-[#1a5c2a] text-white text-[10px] rounded hover:bg-[#144a21] disabled:opacity-50"
                                                        >
                                                            {mobileOtpSent ? (mobileResendTimer > 0 ? `Resend (${mobileResendTimer}s)` : 'Resend') : 'Verify'}
                                                        </button>
                                                    )}
                                                    {mobileOtpVerified && <span className="absolute right-2 top-1/2 -translate-y-1/2 text-green-600 text-sm">✓</span>}
                                                </div>
                                            </div>
                                            {mobileOtpSent && !mobileOtpVerified && (
                                                <div className="mt-1 flex gap-1">
                                                    <input
                                                        type="text"
                                                        placeholder="Enter OTP"
                                                        value={mobileOtpValue}
                                                        onChange={(e) => setMobileOtpValue(e.target.value)}
                                                        className="h-[30px] flex-1 border border-gray-300 rounded px-2 text-xs"
                                                    />
                                                    <button
                                                        onClick={() => verifyOtp('mobile', 'nominator')}
                                                        disabled={isVerifying.nominatorMobile}
                                                        className="h-[30px] px-2 bg-green-600 text-white text-[10px] rounded"
                                                    >
                                                        Submit
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                        <div className="flex flex-col gap-1 col-span-2">
                                            <label className="text-[13px] font-semibold text-gray-800 mb-0.5 block">Relationship with Nominee {requiredStar}</label>
                                            <select name="relationship" value={formData.relationship} onChange={handleChange} className={`w-full border border-gray-300 rounded-md py-2.5 px-3 text-sm outline-none bg-white font-sans ${formData.relationship ? 'text-gray-700' : 'text-gray-400'}`}>
                                                <option value="">Select relationship</option>
                                                <option>Colleague</option>
                                                <option>Supervisor / Manager</option>
                                                <option>Mentor</option>
                                                <option>Peer</option>
                                                <option>Industry Associate</option>
                                                <option>Other</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                {/* ── SECTION 05 ── */}
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="bg-[#1a5c2a] text-white font-extrabold text-[14px] h-8 w-12 flex items-center justify-center pr-1.5 rounded-l-md shrink-0" style={{ clipPath: "polygon(0 0, 80% 0, 100% 50%, 80% 100%, 0 100%)" }}>
                                        05
                                    </div>
                                    <div className="w-8 h-8 rounded-full bg-[#e8f5e9] flex items-center justify-center shrink-0">
                                        <svg viewBox="0 0 24 24" fill="currentColor" className="w-4.5 h-4.5 text-[#1a5c2a]"><path d="M16.5 6v11.5c0 2.21-1.79 4-4 4s-4-1.79-4-4V5a2.5 2.5 0 015 0v10.5c0 .55-.45 1-1 1s-1-.45-1-1V6H10v9.5a2.5 2.5 0 005 0V5c0-2.21-1.79-4-4-4S7 2.79 7 5v12.5c0 3.04 2.46 5.5 5.5 5.5s5.5-2.46 5.5-5.5V6h-1.5z" /></svg>
                                    </div>
                                    <div className="text-[#1a5c2a] text-[12px] md:text-[15px] font-extrabold tracking-wide uppercase shrink-0">
                                        ADDITIONAL INFORMATION
                                    </div>
                                    <div className="flex-1 h-[1px] bg-[#1a5c2a] opacity-30 ml-3" />
                                </div>
                                <div className="border border-gray-200 rounded-xl shadow-sm p-4 px-5 bg-white mb-3">
                                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                                        <div>
                                            <label className="text-[13px] font-semibold text-gray-800 mb-0.5 block">Upload Nominee's CV / Profile <span className="text-gray-500 font-normal">(Optional)</span></label>
                                            <p className="text-xs text-gray-400 m-0">PDF, DOC, or DOCX (Max. 5MB)</p>
                                        </div>
                                        <label className="border border-dashed border-gray-300 rounded-lg py-3 px-6 flex items-center gap-3 cursor-pointer bg-gray-50 w-full md:min-w-[300px] md:w-auto justify-center hover:bg-gray-100 transition-colors">
                                            <input
                                                type="file"
                                                className="hidden"
                                                onChange={(e) => setCvFile(e.target.files ? e.target.files[0] : null)}
                                                accept=".pdf,.doc,.docx"
                                            />
                                            <span className="text-xl">☁️</span>
                                            <div>
                                                <div className="text-[13px] font-semibold text-[#1a5c2a] truncate max-w-[200px]">
                                                    {cvFile ? cvFile.name : "Click to upload"}
                                                </div>
                                                <div className="text-[11px] text-gray-400">
                                                    {cvFile ? `${(cvFile.size / 1024 / 1024).toFixed(2)} MB` : "or drag and drop file here"}
                                                </div>
                                            </div>
                                        </label>
                                    </div>

                                    {/* Consent checkbox */}
                                    <div className="flex items-start gap-2.5 mt-4">
                                        <input type="checkbox" checked={confirmed} onChange={(e) => setConfirmed(e.target.checked)} className="w-4 h-4 mt-0.5 accent-[#1a5c2a] shrink-0 cursor-pointer" />
                                        <label className="text-[13px] text-gray-600 leading-normal cursor-pointer" onClick={() => setConfirmed(!confirmed)}>
                                            I confirm that the information provided is accurate and I have the nominee's consent to submit this nomination. {requiredStar}
                                        </label>
                                    </div>
                                </div>

                                {/* SUBMIT BUTTON */}
                                <div className="flex justify-center mt-1">
                                    <button
                                        onClick={handleSubmit}
                                        disabled={isSubmitting || submitted}
                                        className="w-full md:w-[300px] bg-[#1a5c2a] hover:bg-[#144a21] text-white border-none rounded-lg py-3 text-sm font-bold tracking-wider cursor-pointer flex items-center justify-center gap-2.5 uppercase font-sans mb-2 shadow-sm transition-colors disabled:opacity-50"
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <span className="animate-spin text-sm">⏳</span>
                                                SUBMITTING...
                                            </>
                                        ) : submitted ? (
                                            <>
                                                <span className="text-sm">✓</span>
                                                SUBMITTED
                                            </>
                                        ) : (
                                            <>
                                                <span className="text-sm">✈️</span>
                                                SUBMIT NOMINATION
                                            </>
                                        )}
                                    </button>
                                </div>

                                {/* Security note */}
                                <p className="text-center text-[12px] text-gray-400 m-0">
                                    🔒 Your information is secure and will be used only for IHWE Expo 2026 Advisory Board selection.
                                </p>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdvisoryForm;