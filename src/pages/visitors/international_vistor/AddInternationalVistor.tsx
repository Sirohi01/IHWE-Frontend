import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, Send, ShieldCheck, Loader2, Upload, Star, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { heroBackgroundApi, SERVER_URL, verifyApi, visitorApi, eventApi, crmApi } from "@/lib/api";
import HeroBg from "@/assets/car22.webp";

const PURPOSE_OPTIONS = [
    "Business Networking", "Product Sourcing", "Distributor Search",
    "Franchise Opportunity", "Investment Opportunity", "Medical Tourism",
    "Healthcare Collaboration", "Wellness Industry Exploration",
    "Ayurveda & AYUSH Interest", "Conference Participation",
    "Knowledge Sessions", "Startup Collaboration", "Government Delegation", "General Visit",
];

const INTEREST_OPTIONS = [
    "Business Networking", "Product Sourcing", "Distributor Search",
    "Franchise Opportunity", "Investment Opportunity", "Medical Tourism",
    "Healthcare Collaboration", "Wellness Industry Exploration",
    "Ayurveda & AYUSH Interest", "Conference Participation",
    "Knowledge Sessions", "Startup Collaboration", "Government Delegation", "General Visit",
];

const inputClasses = "rounded-[2px] border-slate-400 h-8 focus:border-[#23471d] focus:ring-[#23471d]/10 transition-all text-[12px] bg-white placeholder:text-slate-400 text-slate-900 font-medium shadow-none outline-none px-3 w-full text-left";
const labelClasses = "text-[10px] font-bold text-slate-700 uppercase tracking-widest";

function SectionHeader({ number, title }: { number: string; title: string }) {
    return (
        <div className="flex items-center gap-3 mb-4 mt-2">
            <div className="w-6 h-6 rounded-full bg-[#23471d] flex items-center justify-center shrink-0">
                <span className="text-[9px] font-black text-white">{number}</span>
            </div>
            <h3 className="text-[11px] font-black text-slate-700 uppercase tracking-[0.15em]">{title}</h3>
            <div className="flex-1 h-px bg-slate-100" />
        </div>
    );
}

function YesNoRadio({ label, name, value, onChange }: any) {
    return (
        <div className="space-y-1.5">
            <Label className={labelClasses}>{label}</Label>
            <RadioGroup value={value} onValueChange={(v) => onChange(name, v)} className="flex gap-4">
                {["yes", "no"].map((opt) => (
                    <div key={opt} className="flex items-center gap-2">
                        <RadioGroupItem value={opt} id={`${name}-${opt}`} className="w-3.5 h-3.5 border-slate-400 text-[#23471d]" />
                        <Label htmlFor={`${name}-${opt}`} className="text-[11px] font-semibold text-slate-700 cursor-pointer capitalize">{opt}</Label>
                    </div>
                ))}
            </RadioGroup>
        </div>
    );
}

const AddInternationalVistor = ({ embedded = false }: { embedded?: boolean }) => {
    const [requireOtpForVisitorRegistration, setRequireOtpForVisitorRegistration] = useState(true);
    const [isSuccess, setIsSuccess] = useState(false);
    const [step, setStep] = useState(1);
    const [heroData, setHeroData] = useState<any>(null);
    const [events, setEvents] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [countries, setCountries] = useState<any[]>([]);
    const [states, setStates] = useState<any[]>([]);
    const [cities, setCities] = useState<any[]>([]);
    const [loadingStates, setLoadingStates] = useState(false);
    const [loadingCities, setLoadingCities] = useState(false);

    const [formData, setFormData] = useState({
        registrationFor: "",
        firstName: "", lastName: "", gender: "", dob: "",
        nationality: "", passportNo: "", occupation: "",
        email: "", personalEmail: "", mobileNo: "", whatsappNo: "", indiaContactNo: "",
        designation: "", companyName: "", companyWebsite: "",
        industry: "", companySize: "",
        address: "", country: "", state: "", city: "", companyPincode: "",
        preferredDate: "", numAttendees: "",
        invitationLetter: "no", hotelAssistance: "no", airportPickup: "no", translatorSupport: "no",
        conferenceInterest: "no", conferenceRole: "",
        vipPass: "no",
        schedulingB2B: "no", whatsappUpdates: "yes",
        anyRequirement: "", subscribeNewsletter: true,
        purposeOfVisit: [] as string[],
        areaOfInterest: [] as string[],
        // Declaration
        confirmInfo: false, agreeTerms: false, acceptPrivacy: false, agreeRules: false,
        digitalSignature: "",
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
    const [files, setFiles] = useState<Record<string, File | null>>({});

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
                try {
                    const res = await fetch(`${SERVER_URL}/api/settings?website=9th%20IHWE`);
                    const data = await res.json();
                    if (data.success && data.data && data.data.requireOtpForVisitorRegistration !== undefined) {
                        setRequireOtpForVisitorRegistration(data.data.requireOtpForVisitorRegistration);
                    }
                } catch (err) { console.error("Settings error:", err); }
            } catch (err) { console.error(err); }
        };
        fetchInitialData();
    }, []);

    useEffect(() => {
        if (events.length > 0 && !formData.registrationFor) {
            setFormData(prev => ({ ...prev, registrationFor: events[0].name }));
        }
    }, [events]);

    useEffect(() => { let t: any; if (emailTimer > 0) t = setInterval(() => setEmailTimer(p => p - 1), 1000); return () => clearInterval(t); }, [emailTimer]);
    useEffect(() => { let t: any; if (phoneTimer > 0) t = setInterval(() => setPhoneTimer(p => p - 1), 1000); return () => clearInterval(t); }, [phoneTimer]);

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

    const handleInputChange = (e: any) => {
        const { name, value, type, checked } = e.target;
        if (name === 'email') setEmailVerified(false);
        if (name === 'mobileNo') setPhoneVerified(false);
        if (name === 'country') {
            setFormData(prev => ({ ...prev, state: "", city: "" }));
            setStates([]);
            setCities([]);
        }
        if (name === 'state') {
            setFormData(prev => ({ ...prev, city: "" }));
            setCities([]);
        }
        setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    };

    const handleRadioChange = (name: string, value: string) => setFormData(prev => ({ ...prev, [name]: value }));
    const handleSelectChange = (name: string, value: string) => {
        if (name === 'country') {
            setFormData(prev => ({ ...prev, [name]: value, state: "", city: "" }));
            setStates([]);
            setCities([]);
        }
        else if (name === 'state') {
            setFormData(prev => ({ ...prev, [name]: value, city: "" }));
            setCities([]);
        }
        else setFormData(prev => ({ ...prev, [name]: value }));
    };
    const handleCheckboxList = (field: 'purposeOfVisit' | 'areaOfInterest', opt: string, checked: boolean) => {
        setFormData(prev => ({
            ...prev,
            [field]: checked ? [...prev[field], opt] : prev[field].filter(i => i !== opt)
        }));
    };

    const sendEmailOtp = async () => {
        if (!formData.email) return;
        setIsSendingEmailOtp(true);
        try {
            const res = await verifyApi.sendEmailOtp(formData.email, 'VISITOR');
            if (res.success) { setEmailOtpSent(true); setEmailTimer(60); }
        } finally { setIsSendingEmailOtp(false); }
    };

    const confirmEmailOtp = async () => {
        if (!emailOtp) return;
        setIsVerifyingEmail(true);
        try {
            const res = await verifyApi.verifyEmailOtp(formData.email, emailOtp);
            if (res.success) setEmailVerified(true);
            else alert(res.message || "Invalid OTP");
        } finally { setIsVerifyingEmail(false); }
    };

    const sendPhoneOtp = async () => {
        if (!formData.mobileNo) return;
        setIsSendingPhoneOtp(true);
        try {
            const name = `${formData.firstName} ${formData.lastName}`.trim() || 'Visitor';
            const res = await verifyApi.sendPhoneOtp(formData.mobileNo, 'VISITOR', name);
            if (res.success) { setPhoneOtpSent(true); setPhoneTimer(60); }
        } finally { setIsSendingPhoneOtp(false); }
    };

    const confirmPhoneOtp = async () => {
        if (!phoneOtp) return;
        setIsVerifyingPhone(true);
        try {
            const res = await verifyApi.verifyPhoneOtp(formData.mobileNo, phoneOtp);
            if (res.success) setPhoneVerified(true);
            else alert(res.message || "Invalid OTP");
        } finally { setIsVerifyingPhone(false); }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (requireOtpForVisitorRegistration && (!emailVerified || !phoneVerified)) { alert("Please verify Email and Mobile first."); return; }
        if (!formData.confirmInfo || !formData.agreeTerms || !formData.acceptPrivacy || !formData.agreeRules) {
            alert("Please accept all declarations."); return;
        }

        const { 
            mobileNo, subscribeNewsletter, schedulingB2B, anyRequirement, industry, 
            ...restFormData 
        } = formData;

        const payload = {
            ...restFormData,
            mobile: mobileNo,
            subscribe: subscribeNewsletter,
            b2bMeeting: schedulingB2B,
            specificRequirement: anyRequirement,
            industrySector: industry,
        };

        setLoading(true);
        try {
            const res = await visitorApi.submitCorporate(payload);
            if (res.success || res.data) { setIsSuccess(true); window.scrollTo({ top: 0, behavior: "smooth" }); }
            else throw new Error(res.message || 'Failed');
        } catch (err: any) { alert(err.message || "Submission failed."); }
        finally { setLoading(false); }
    };

    const content = (
        <AnimatePresence mode="wait">

            {/* ── SUCCESS ── */}
            {isSuccess && (
                <motion.div key="success" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
                    className="bg-white border border-green-200 p-16 flex flex-col items-center justify-center min-h-[500px] shadow-2xl">
                    <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mb-6">
                        <CheckCircle className="w-10 h-10 text-green-500" />
                    </div>
                    <h3 className="text-3xl font-serif font-bold text-slate-900 mb-3 text-center">Registration Successful!</h3>
                    <p className="text-slate-500 text-center max-w-md mb-8">Thank you for registering as an International Visitor. We look forward to welcoming you at IHWE 2026.</p>
                    <div className="flex gap-4">
                        <Button onClick={() => setIsSuccess(false)} className="h-11 px-8 rounded-sm bg-[#23471d] hover:bg-[#1a3516] text-xs font-bold uppercase tracking-widest">Register Another</Button>
                        <Link to="/"><Button className="h-11 px-8 rounded-sm bg-[#d26019] hover:bg-[#a84c14] text-xs font-bold uppercase tracking-widest">Go Home</Button></Link>
                    </div>
                </motion.div>
            )}

            {/* ── FORM ── */}
            {!isSuccess && (
                <motion.div key="form" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                    className="bg-white border border-slate-200 rounded-xl shadow-xl overflow-hidden">

                    {/* Form Header */}
                    <div className="bg-gradient-to-r from-[#23471d] to-[#2d5a25] px-8 py-2 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                        <div>
                            <p className="text-[9px] font-medium text-slate-200 uppercase tracking-[0.3em] mb-1">International Registration Portal</p>
                            <h2 className="text-lg font-medium text-white uppercase tracking-tight">International Visitor Registration</h2>
                            <p className="text-[10px] text-slate-200 uppercase tracking-[0.2em] mt-0.5 font-semibold">9th Edition · IHWE Global Edition 2026</p>
                        </div>
                        <div className="flex flex-col gap-1 min-w-[220px]">
                            <Label className="text-[10px] font-medium text-slate-200 uppercase tracking-widest">Registering For <span className="text-red-500 font-bold">*</span></Label>
                            <Select required value={formData.registrationFor} onValueChange={(v) => handleSelectChange('registrationFor', v)}>
                                <SelectTrigger className="h-8 border-[#d26019] bg-white/10 text-white text-[11px] font-medium rounded-sm">
                                    <SelectValue placeholder="Select Event" />
                                </SelectTrigger>
                                <SelectContent>
                                    {events.map((ev: any) => <SelectItem key={ev._id} value={ev.name} className="text-xs">{ev.name}</SelectItem>)}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <div className="h-0.5 bg-gradient-to-r from-[#d26019] to-transparent" />

                    <form onSubmit={handleSubmit} className="px-8 py-3 space-y-2 font-inter">

                        {/* ── SECTION 1: Personal Information ── */}
                        <div>
                            <SectionHeader number="1" title="Personal Information" />
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2">
                                <div>
                                    <Label className={labelClasses}>First Name <span className="text-red-500 font-bold">*</span></Label>
                                    <Input name="firstName" value={formData.firstName} onChange={handleInputChange} required placeholder="First Name" className={inputClasses} />
                                </div>
                                <div>
                                    <Label className={labelClasses}>Last Name <span className="text-red-500 font-bold">*</span></Label>
                                    <Input name="lastName" value={formData.lastName} onChange={handleInputChange} required placeholder="Last Name" className={inputClasses} />
                                </div>
                                <div>
                                    <Label className={labelClasses}>Gender <span className="text-red-500 font-bold">*</span> </Label>
                                    <Select onValueChange={(v) => handleSelectChange('gender', v)} value={formData.gender}>
                                        <SelectTrigger className={inputClasses}><SelectValue placeholder="Select" /></SelectTrigger>
                                        <SelectContent className="bg-white">
                                            <SelectItem value="male">Male</SelectItem>
                                            <SelectItem value="female">Female</SelectItem>
                                            <SelectItem value="other">Other</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div>
                                    <Label className={labelClasses}>Date of Birth</Label>
                                    <Input name="dob" type="date" value={formData.dob} onChange={handleInputChange} className={inputClasses} />
                                </div>
                                <div>
                                    <Label className={labelClasses}>Nationality<span className="text-red-500 font-bold">*</span> </Label>
                                    <Select onValueChange={(v) => handleSelectChange('nationality', v)} value={formData.nationality}>
                                        <SelectTrigger className={inputClasses}><SelectValue placeholder="Select Country" /></SelectTrigger>
                                        <SelectContent className="max-h-[280px] bg-white">
                                            {countries.map(c => <SelectItem key={c._id || c.name} value={c.name}>{c.name}</SelectItem>)}
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div>
                                    <Label className={labelClasses}>Passport Number</Label>
                                    <Input name="passportNo" value={formData.passportNo} onChange={handleInputChange} placeholder="Passport / ID No." className={inputClasses} />
                                </div>
                                <div>
                                    <Label className={labelClasses}>Occupation</Label>
                                    <Input name="occupation" value={formData.occupation} onChange={handleInputChange} placeholder="Your Occupation" className={inputClasses} />
                                </div>
                                <div>
                                    <Label className={labelClasses}>Designation<span className="text-red-500 font-bold">*</span> </Label>
                                    <Input name="designation" value={formData.designation} onChange={handleInputChange} required placeholder="Your Designation" className={inputClasses} />
                                </div>
                                <div className="lg:col-span-2">
                                    <Label className={labelClasses}>Organisation / Company Name</Label>
                                    <Input name="companyName" value={formData.companyName} onChange={handleInputChange} placeholder="Company Name (if applicable)" className={inputClasses} />
                                </div>
                            </div>
                        </div>

                        {/* ── SECTION 2: Contact Details ── */}
                        <div>
                            <SectionHeader number="2" title="Contact Details" />
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2">

                                {/* Mobile OTP */}
                                <div>
                                    <Label className={labelClasses}>Mobile No. (with Country Code) <span className="text-red-500 font-bold">*</span> </Label>
                                    <div className="relative flex items-center">
                                        <Input name="mobileNo" value={formData.mobileNo} onChange={handleInputChange} disabled={phoneVerified || phoneOtpSent} required placeholder="+1 234 567 8900" className={`${inputClasses} pr-20 ${phoneVerified ? "bg-green-50 border-green-300 text-green-700" : ""}`} />
                                        {requireOtpForVisitorRegistration && !phoneVerified ? (
                                            <button type="button" onClick={sendPhoneOtp} disabled={isSendingPhoneOtp || !formData.mobileNo || phoneTimer > 0}
                                                className="absolute right-1 px-2 py-1 bg-[#23471d] text-white text-[8px] uppercase font-black tracking-wider rounded-sm hover:bg-[#1a3a14] disabled:bg-slate-300 transition-all">
                                                {isSendingPhoneOtp ? "..." : phoneTimer > 0 ? `${phoneTimer}s` : phoneOtpSent ? "RESEND" : "SEND OTP"}
                                            </button>
                                        ) : <CheckCircle size={13} className="absolute right-2 text-green-500" />}
                                    </div>
                                </div>

                                <div>
                                    <Label className={labelClasses}>WhatsApp Number</Label>
                                    <Input name="whatsappNo" value={formData.whatsappNo} onChange={handleInputChange} placeholder="+1 234 567 8900" className={inputClasses} />
                                </div>

                                <div>
                                    <Label className={labelClasses}>India Contact Number</Label>
                                    <Input name="indiaContactNo" value={formData.indiaContactNo} onChange={handleInputChange} placeholder="+91 123 456 7890" className={inputClasses} />
                                </div>

                                {/* Email OTP */}
                                <div>
                                    <Label className={labelClasses}>Official Email ID <span className="text-red-500 font-bold">*</span> </Label>
                                    <div className="relative flex items-center">
                                        <Input name="email" type="email" value={formData.email} onChange={handleInputChange} disabled={emailVerified || emailOtpSent} required placeholder="official@company.com" className={`${inputClasses} pr-20 ${emailVerified ? "bg-green-50 border-green-300 text-green-700" : ""}`} />
                                        {requireOtpForVisitorRegistration && !emailVerified ? (
                                            <button type="button" onClick={sendEmailOtp} disabled={isSendingEmailOtp || !formData.email || emailTimer > 0}
                                                className="absolute right-1 px-2 py-1 bg-[#d26019] text-white text-[8px] uppercase font-black tracking-wider rounded-sm hover:bg-[#a84c14] disabled:bg-slate-300 transition-all">
                                                {isSendingEmailOtp ? "..." : emailTimer > 0 ? `${emailTimer}s` : emailOtpSent ? "RESEND" : "SEND OTP"}
                                            </button>
                                        ) : <CheckCircle size={13} className="absolute right-2 text-green-500" />}
                                    </div>
                                </div>

                                <div>
                                    <Label className={labelClasses}>Personal Email ID</Label>
                                    <Input name="personalEmail" type="email" value={formData.personalEmail} onChange={handleInputChange} placeholder="personal@email.com" className={inputClasses} />
                                </div>
                            </div>

                            {/* OTP Verify Row */}
                            <AnimatePresence>
                                {requireOtpForVisitorRegistration && ((emailOtpSent && !emailVerified) || (phoneOtpSent && !phoneVerified)) && (
                                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}
                                        className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3 overflow-hidden">
                                        {phoneOtpSent && !phoneVerified && (
                                            <div className="flex gap-2 items-center bg-green-50 p-2.5 border border-green-200 rounded-sm">
                                                <Input value={phoneOtp} onChange={(e) => setPhoneOtp(e.target.value)} placeholder="Enter Mobile OTP" className="flex-1 h-8 rounded-sm border-green-300 text-center tracking-[0.3em] font-bold text-xs" maxLength={6} inputMode="numeric" />
                                                <Button type="button" onClick={confirmPhoneOtp} disabled={isVerifyingPhone || phoneOtp.length < 4} className="h-8 bg-[#23471d] hover:bg-[#1a3516] text-[9px] font-black px-4 rounded-sm">{isVerifyingPhone ? "..." : "VERIFY"}</Button>
                                            </div>
                                        )}
                                        {emailOtpSent && !emailVerified && (
                                            <div className="flex gap-2 items-center bg-orange-50 p-2.5 border border-orange-200 rounded-sm">
                                                <Input value={emailOtp} onChange={(e) => setEmailOtp(e.target.value)} placeholder="Enter Email OTP" className="flex-1 h-8 rounded-sm border-orange-300 text-center tracking-[0.3em] font-bold text-xs" maxLength={6} inputMode="numeric" />
                                                <Button type="button" onClick={confirmEmailOtp} disabled={isVerifyingEmail || emailOtp.length < 4} className="h-8 bg-[#d26019] hover:bg-[#a84c14] text-[9px] font-black px-4 rounded-sm">{isVerifyingEmail ? "..." : "VERIFY"}</Button>
                                            </div>
                                        )}
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {/* Address */}
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mt-4">
                                <div className="lg:col-span-2">
                                    <Label className={labelClasses}>Residential Address</Label>
                                    <Input name="address" value={formData.address} onChange={handleInputChange} placeholder="Street / Area / Building" className={inputClasses} />
                                </div>
                                <div>
                                    <Label className={labelClasses}>Country <span className="text-red-500 font-bold">*</span> </Label>
                                    <Select onValueChange={(v) => handleSelectChange('country', v)} value={formData.country}>
                                        <SelectTrigger className={inputClasses}><SelectValue placeholder="Select Country" /></SelectTrigger>
                                        <SelectContent className="max-h-[280px] bg-white">
                                            {countries.filter(c => c.name?.toLowerCase() !== 'india').map(c => <SelectItem key={c._id || c.name} value={c.name}>{c.name}</SelectItem>)}
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div>
                                    <Label className={labelClasses}>State / Province</Label>
                                    <Select disabled={!formData.country || loadingStates} onValueChange={(v) => handleSelectChange('state', v)} value={formData.state}>
                                        <SelectTrigger className={inputClasses}><SelectValue placeholder={loadingStates ? "Loading..." : "Select State"} /></SelectTrigger>
                                        <SelectContent className="max-h-[280px] bg-white">
                                            {states.map(s => <SelectItem key={s._id || s.name} value={s.name}>{s.name}</SelectItem>)}
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div>
                                    <Label className={labelClasses}>City</Label>
                                    <Select disabled={!formData.state || loadingCities} onValueChange={(v) => handleSelectChange('city', v)} value={formData.city}>
                                        <SelectTrigger className={inputClasses}><SelectValue placeholder={loadingCities ? "Loading..." : "Select City"} /></SelectTrigger>
                                        <SelectContent className="max-h-[280px] bg-white">
                                            {cities.map(ct => <SelectItem key={ct._id || ct.name} value={ct.name}>{ct.name}</SelectItem>)}
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div>
                                    <Label className={labelClasses}>Postal Code</Label>
                                    <Input name="companyPincode" value={formData.companyPincode} onChange={handleInputChange} placeholder="Postal / ZIP Code" className={inputClasses} />
                                </div>
                            </div>
                        </div>

                        {/* ── NEXT STEP BUTTON (STEP 1) ── */}
                        {step === 1 && (
                            <div className="pt-4 flex flex-col items-center border-t border-slate-100 mt-4">
                                <Button 
                                    type="button" 
                                    onClick={() => setStep(2)} 
                                    disabled={requireOtpForVisitorRegistration && (!emailVerified || !phoneVerified)}
                                    className="w-full max-w-xs h-10 rounded-sm bg-[#23471d] hover:bg-[#1a3516] text-white font-black text-xs uppercase tracking-widest shadow-xl flex items-center justify-center gap-3 group disabled:opacity-60 disabled:cursor-not-allowed transition-all"
                                >
                                    Next Step <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                                </Button>
                                {requireOtpForVisitorRegistration && (!emailVerified || !phoneVerified) && (
                                    <p className="mt-2 text-[10px] text-red-500 font-bold uppercase tracking-wider">
                                        Please verify both Email and Mobile Number to proceed
                                    </p>
                                )}
                            </div>
                        )}

                        {/* ── STEP 2 CONTENT ── */}
                        <AnimatePresence>
                            {step === 2 && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: "auto" }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="space-y-2 overflow-hidden"
                                >
                                    {/* ── SECTION 3 & 4: Purpose & Interest ── */}
                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 mt-4">
                                        <div>
                                            <SectionHeader number="3" title="Purpose of Visit" />
                                            <div className="border border-slate-100 rounded-sm p-4 bg-slate-50/40">
                                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                                                    {PURPOSE_OPTIONS.map((opt) => (
                                                        <label key={opt} className="flex items-center gap-2.5 cursor-pointer group">
                                                            <Checkbox checked={formData.purposeOfVisit.includes(opt)} onCheckedChange={(c: boolean) => handleCheckboxList('purposeOfVisit', opt, c)}
                                                                className="rounded-none w-3.5 h-3.5 border-slate-400 data-[state=checked]:bg-[#23471d] data-[state=checked]:border-[#23471d]" />
                                                            <span className="text-[11px] text-slate-600 group-hover:text-slate-900 font-medium transition-colors">{opt}</span>
                                                        </label>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                        <div>
                                            <SectionHeader number="4" title="Interested Sectors" />
                                            <div className="border border-slate-100 rounded-sm p-4 bg-slate-50/40">
                                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                                                    {INTEREST_OPTIONS.map((opt) => (
                                                        <label key={opt} className="flex items-center gap-2.5 cursor-pointer group">
                                                            <Checkbox checked={formData.areaOfInterest.includes(opt)} onCheckedChange={(c: boolean) => handleCheckboxList('areaOfInterest', opt, c)}
                                                                className="rounded-none w-3.5 h-3.5 border-slate-400 data-[state=checked]:bg-[#23471d] data-[state=checked]:border-[#23471d]" />
                                                            <span className="text-[11px] text-slate-600 group-hover:text-slate-900 font-medium transition-colors">{opt}</span>
                                                        </label>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* ── SECTION 5: Visit Planning ── */}
                                    <div>
                                        <SectionHeader number="5" title="Visit Planning" />
                                        <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                                            <div>
                                                <Label className={labelClasses}>Preferred Visit Days</Label>
                                                <Select onValueChange={(v) => handleSelectChange('preferredDate', v)} value={formData.preferredDate}>
                                                    <SelectTrigger className={inputClasses}><SelectValue placeholder="Select Days" /></SelectTrigger>
                                                    <SelectContent className="bg-white">
                                                        <SelectItem value="1 Day">1 Day</SelectItem>
                                                        <SelectItem value="2 Days">2 Days</SelectItem>
                                                        <SelectItem value="3 Days">3 Days</SelectItem>
                                                        <SelectItem value="All Days">All Days</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>

                                            <YesNoRadio label="Need Invitation Letter for Visa?" name="invitationLetter" value={formData.invitationLetter} onChange={handleRadioChange} />
                                            <YesNoRadio label="Need Hotel Booking Assistance?" name="hotelAssistance" value={formData.hotelAssistance} onChange={handleRadioChange} />
                                            <YesNoRadio label="Need Airport Pickup?" name="airportPickup" value={formData.airportPickup} onChange={handleRadioChange} />
                                            <YesNoRadio label="Need Translator Support?" name="translatorSupport" value={formData.translatorSupport} onChange={handleRadioChange} />
                                        </div>
                                    </div>

                                    {/* ── SECTION 6: Conference ── */}
                                    <div>
                                        <SectionHeader number="6" title="Conference Participation" />
                                        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
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
                                            <YesNoRadio label="Interested in Medical Conference / Knowledge Sessions?" name="conferenceInterest" value={formData.conferenceInterest} onChange={handleRadioChange} />
                                            {formData.conferenceInterest === 'yes' && (
                                                <div>
                                                    <Label className={labelClasses}>Interested As</Label>
                                                    <Select onValueChange={(v) => handleSelectChange('conferenceRole', v)} value={formData.conferenceRole}>
                                                        <SelectTrigger className={inputClasses}><SelectValue placeholder="Select Role" /></SelectTrigger>
                                                        <SelectContent className="bg-white">
                                                            {["Delegate", "Attendee", "Speaker", "Panel Participant", "Industry Expert"].map(r => (
                                                                <SelectItem key={r} value={r.toLowerCase().replace(' ', '-')}>{r}</SelectItem>
                                                            ))}
                                                        </SelectContent>
                                                    </Select>
                                                </div>
                                            )}

                                        </div>
                                    </div>

                                    {/* ── SECTION 7: Document Upload ── */}
                                    <div>
                                        <SectionHeader number="7" title="Document Upload" />
                                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2">
                                            {[
                                                { key: 'passport', label: 'Passport Copy' },
                                                { key: 'visitingCard', label: 'Visiting Card' },
                                                { key: 'companyProfile', label: 'Company Profile' },
                                                { key: 'visaDocs', label: 'Visa Documents' },
                                                { key: 'photoId', label: 'Photo ID' },
                                            ].map(({ key, label }) => (
                                                <label key={key} className="flex flex-col items-center justify-center gap-2 p-4 border-2 border-dashed border-slate-200 rounded-sm cursor-pointer hover:border-[#23471d]/40 hover:bg-green-50/30 transition-all group">
                                                    <Upload size={16} className="text-slate-300 group-hover:text-[#23471d] transition-colors" />
                                                    <span className="text-[9px] font-black text-slate-400 uppercase tracking-wider text-center group-hover:text-[#23471d]">{label}</span>
                                                    {files[key] && <span className="text-[8px] text-green-600 font-bold truncate w-full text-center">{files[key]?.name}</span>}
                                                    <input type="file" className="hidden" onChange={(e) => setFiles(prev => ({ ...prev, [key]: e.target.files?.[0] || null }))} />
                                                </label>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="space-y-2 mt-1">
                                        <Label className="text-[11px] font-bold text-slate-900 uppercase tracking-wider block">Any Specific requirement</Label>
                                        <Input
                                            name="anyRequirement"
                                            value={formData.anyRequirement}
                                            onChange={handleInputChange}
                                            placeholder="Write Here .." className={inputClasses}
                                        />
                                    </div>

                                    {/* ── DECLARATION ── */}
                                    <div className="pt-4 space-y-3">
                                        <label className="flex items-start gap-3 cursor-pointer group">
                                            <Checkbox checked={formData.confirmInfo} onCheckedChange={(c: boolean) => setFormData(prev => ({ ...prev, confirmInfo: !!c }))}
                                                className="rounded-none w-3.5 h-3.5 border-slate-400 data-[state=checked]:bg-[#23471d] mt-0.5" />
                                            <span className="text-[11px] font-medium text-slate-600 leading-tight">I confirm that the information provided is accurate and complete.</span>
                                        </label>
                                        <label className="flex items-start gap-3 cursor-pointer group">
                                            <Checkbox checked={formData.agreeTerms} onCheckedChange={(c: boolean) => setFormData(prev => ({ ...prev, agreeTerms: !!c }))}
                                                className="rounded-none w-3.5 h-3.5 border-slate-400 data-[state=checked]:bg-[#23471d] mt-0.5" />
                                            <span className="text-[11px] font-medium text-slate-600 leading-tight">I agree to the Terms and Conditions of the event.</span>
                                        </label>
                                        <label className="flex items-start gap-3 cursor-pointer group">
                                            <Checkbox checked={formData.acceptPrivacy} onCheckedChange={(c: boolean) => setFormData(prev => ({ ...prev, acceptPrivacy: !!c }))}
                                                className="rounded-none w-3.5 h-3.5 border-slate-400 data-[state=checked]:bg-[#23471d] mt-0.5" />
                                            <span className="text-[11px] font-medium text-slate-600 leading-tight">I accept the Privacy Policy.</span>
                                        </label>
                                        <label className="flex items-start gap-3 cursor-pointer group">
                                            <Checkbox checked={formData.agreeRules} onCheckedChange={(c: boolean) => setFormData(prev => ({ ...prev, agreeRules: !!c }))}
                                                className="rounded-none w-3.5 h-3.5 border-slate-400 data-[state=checked]:bg-[#23471d] mt-0.5" />
                                            <span className="text-[11px] font-medium text-slate-600 leading-tight">I agree to abide by the event rules and regulations.</span>
                                        </label>
                                    </div>

                                    {/* ── SUBSCRIBE ── */}
                                    <label className="flex items-center gap-3 cursor-pointer group pt-2">
                                        <Checkbox checked={formData.subscribeNewsletter} onCheckedChange={(c: boolean) => setFormData(prev => ({ ...prev, subscribeNewsletter: !!c }))}
                                            className="rounded-none w-3.5 h-3.5 border-slate-400 data-[state=checked]:bg-[#23471d] data-[state=checked]:border-[#23471d]" />
                                        <span className="text-[11px] font-bold text-slate-600 uppercase tracking-wide">Subscribe to IHWE Global Updates & Newsletters</span>
                                    </label>

                                    {/* ── SUBMIT ── */}
                                    <div className="pt-4 flex flex-col items-center border-t border-slate-100">
                                        <Button type="submit" disabled={loading}
                                            className="w-full max-w-xs h-10 rounded-sm bg-[#d26019] hover:bg-[#a84c14] text-white font-black text-xs uppercase tracking-widest shadow-xl flex items-center justify-center gap-3 group disabled:opacity-60 disabled:cursor-not-allowed transition-all">
                                            {loading
                                                ? <><Loader2 className="w-4 h-4 animate-spin" /> Submitting...</>
                                                : <>Submit Registration <Send size={14} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" /></>
                                            }
                                        </Button>
                                        <p className="mt-3 text-[9px] text-slate-400 font-black uppercase tracking-[0.2em] flex items-center gap-2">
                                            <ShieldCheck size={11} className="text-[#d26019]" />
                                            International Visitor · Secure Portal · IHWE 2026
                                        </p>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                    </form>
                </motion.div>
            )}
        </AnimatePresence>
    );

    if (embedded) {
        return <div className="w-full pt-2">{content}</div>;
    }

    return (
        <div className="min-h-screen bg-[#FDFDFD] font-inter text-slate-900">
            <section className="hero-background-registration" style={{ backgroundImage: `url(${heroData?.backgroundImage ? `${SERVER_URL}${heroData.backgroundImage}` : HeroBg})` }}>
                <div className="absolute inset-0 bg-black/45" />
                <div className="container mx-auto px-4 text-center text-white relative z-10" data-aos="fade-up">
                    <p className="text-sm uppercase tracking-[0.4em] mb-4 opacity-80">{heroData?.title || "Visitor Experience"}</p>
                    <h1 className="text-4xl md:text-6xl font-serif font-semibold mb-6 italic tracking-tight">{heroData?.heading || "Witness the Future of Wellness"}</h1>
                    <p className="text-white/70 text-base md:text-lg mb-8 max-w-xl mx-auto font-light leading-relaxed">{heroData?.shortDescription || "Join 8,000+ healthcare professionals worldwide."}</p>
                </div>
            </section>

            <section className="pt-8 pb-24">
                <div className="container mx-auto px-6 max-w-[1400px] space-y-6">
                    {content}
                </div>
            </section>
        </div>
    );
};

export default AddInternationalVistor;