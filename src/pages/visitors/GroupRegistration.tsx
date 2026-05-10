import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
    CheckCircle, ShieldCheck, Loader2, ArrowRight,
    Users, Plus, Trash2, BadgePercent, BadgeCheck, Gift,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { AnimatePresence, motion } from "framer-motion";
import { crmApi, eventApi, visitorApi, verifyApi } from "@/lib/api";

// ── Constants ──────────────────────────────────────────────────────────────
const MIN_PERSONS = 5;
const MAX_PERSONS = 10;

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

const emptyPerson = () => ({
    firstName: "", lastName: "", gender: "", designation: "", email: "", mobileNo: "",
});
type Person = ReturnType<typeof emptyPerson>;

const defaultCompany = {
    registrationFor: "", companyName: "", companyWebsite: "", industry: "",
    companySize: "", country: "India", state: "", city: "", companyPincode: "",
    schedulingB2B: "no", whatsappUpdates: "yes", anyRequirement: "",
    subscribeNewsletter: true, purposeOfVisit: [] as string[], areaOfInterest: [] as string[],
};

// ── Styles ─────────────────────────────────────────────────────────────────
const inputClasses = "rounded-[2px] border-slate-400 h-8 focus:border-[#23471d] focus:ring-[#23471d]/10 transition-all text-[12px] bg-white placeholder:text-slate-400 text-slate-900 font-medium shadow-none outline-none px-3 w-full text-left";
const labelClasses = "text-[10px] font-extrabold uppercase tracking-[0.05em] text-slate-800 mb-1 block";

// ── BenefitsBar ─────────────────────────────────────────────────────────────
const BenefitsBar = ({ items }: { items: any[] }) => (
    <div className="bg-white border border-slate-100 rounded-[20px] px-6 py-2 shadow-[0_8px_30px_rgba(0,0,0,0.04)] max-w-[1400px] mx-auto relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-2 divide-y md:divide-y-0 md:divide-x divide-slate-100">
            {items.map((item, idx) => (
                <div key={idx} className="flex items-center gap-4 px-6 py-2 transition-all group">
                    <div className="w-14 h-14 rounded-full border border-[#0e4293]/20 flex items-center justify-center text-[#0e4293] shrink-0">
                        <item.icon className="w-7 h-7 stroke-[1.2]" />
                    </div>
                    <div className="flex flex-col">
                        <p className="text-[14px] font-bold text-[#111827] leading-tight mb-0.5">{item.title}</p>
                        <p className="text-[11px] font-medium text-slate-500 leading-tight whitespace-pre-line">{item.desc}</p>
                    </div>
                </div>
            ))}
        </div>
    </div>
);

// ── PersonCard ──────────────────────────────────────────────────────────────
const PersonCard = ({
    index, person, onChange, onRemove, canRemove,
    // OTP props only for index 0
    emailVerified, phoneVerified,
    emailOtpSent, phoneOtpSent,
    emailOtp, phoneOtp,
    onSetEmailOtp, onSetPhoneOtp,
    onSendEmailOtp, onSendPhoneOtp,
    onVerifyEmailOtp, onVerifyPhoneOtp,
    isSendingEmailOtp, isSendingPhoneOtp,
    isVerifyingEmail, isVerifyingPhone,
    emailTimer, phoneTimer,
}: {
    index: number; person: Person;
    onChange: (i: number, f: keyof Person, v: string) => void;
    onRemove: (i: number) => void; canRemove: boolean;
    emailVerified?: boolean; phoneVerified?: boolean;
    emailOtpSent?: boolean; phoneOtpSent?: boolean;
    emailOtp?: string; phoneOtp?: string;
    onSetEmailOtp?: (v: string) => void; onSetPhoneOtp?: (v: string) => void;
    onSendEmailOtp?: () => void; onSendPhoneOtp?: () => void;
    onVerifyEmailOtp?: () => void; onVerifyPhoneOtp?: () => void;
    isSendingEmailOtp?: boolean; isSendingPhoneOtp?: boolean;
    isVerifyingEmail?: boolean; isVerifyingPhone?: boolean;
    emailTimer?: number; phoneTimer?: number;
}) => (
    <div className={`border rounded-lg px-4 py-3 ${index === 0 ? "border-[#0e4293]/40 bg-[#f7faff]" : "border-slate-200 bg-slate-50/40"}`}>
        <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-[28px_1fr_1fr_1fr_1fr_1fr_1fr_28px] gap-x-3 gap-y-2 items-end">
            {/* Number badge */}
            <div className="hidden xl:flex items-center justify-center pb-1">
                <div className="w-6 h-6 rounded-full bg-[#0e4293] text-white flex items-center justify-center text-[10px] font-black shrink-0">
                    {index + 1}
                </div>
            </div>

            {/* First Name */}
            <div>
                {index === 0 && <Label className={labelClasses}>FIRST NAME <span className="text-red-500">*</span></Label>}
                <Input required value={person.firstName} onChange={e => onChange(index, "firstName", e.target.value)} placeholder="First Name" className={inputClasses} />
            </div>
            {/* Last Name */}
            <div>
                {index === 0 && <Label className={labelClasses}>LAST NAME <span className="text-red-500">*</span></Label>}
                <Input required value={person.lastName} onChange={e => onChange(index, "lastName", e.target.value)} placeholder="Last Name" className={inputClasses} />
            </div>
            {/* Designation */}
            <div>
                {index === 0 && <Label className={labelClasses}>DESIGNATION <span className="text-red-500">*</span></Label>}
                <Input required value={person.designation} onChange={e => onChange(index, "designation", e.target.value)} placeholder="Designation" className={inputClasses} />
            </div>
            {/* Gender */}
            <div>
                {index === 0 && <Label className={labelClasses}>GENDER <span className="text-red-500">*</span></Label>}
                <Select value={person.gender} onValueChange={v => onChange(index, "gender", v)}>
                    <SelectTrigger className={inputClasses}><SelectValue placeholder="Gender" /></SelectTrigger>
                    <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                        <SelectItem value="others">Others</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            {/* Email — with OTP for person 0 */}
            <div>
                {index === 0 && <Label className={labelClasses}>EMAIL ADDRESS <span className="text-red-500">*</span></Label>}
                {index === 0 ? (
                    <div className="relative flex items-center">
                        <Input required type="email" value={person.email}
                            onChange={e => { onChange(index, "email", e.target.value); }}
                            disabled={emailVerified || emailOtpSent}
                            placeholder="Email Address"
                            className={`${inputClasses} pr-20 ${emailVerified ? "bg-green-50 border-green-300 text-green-700" : ""}`} />
                        {!emailVerified && (
                            <button type="button" onClick={onSendEmailOtp}
                                disabled={isSendingEmailOtp || !person.email || (emailTimer ?? 0) > 0}
                                className="absolute right-1 px-2 py-1 bg-[#d26019] text-white text-[9px] uppercase font-bold tracking-wider rounded-sm hover:bg-[#a84c14] disabled:bg-slate-300 transition-all whitespace-nowrap">
                                {isSendingEmailOtp ? "..." : (emailTimer ?? 0) > 0 ? `${emailTimer}s` : emailOtpSent ? "RESEND" : "SEND OTP"}
                            </button>
                        )}
                        {emailVerified && <CheckCircle size={13} className="absolute right-2 text-green-500" />}
                    </div>
                ) : (
                    <Input required type="email" value={person.email} onChange={e => onChange(index, "email", e.target.value)} placeholder="Email Address" className={inputClasses} />
                )}
            </div>

            {/* Mobile — with OTP for person 0 */}
            <div>
                {index === 0 && <Label className={labelClasses}>MOBILE (WHATSAPP) <span className="text-red-500">*</span></Label>}
                {index === 0 ? (
                    <div className="relative flex items-center">
                        <Input required value={person.mobileNo}
                            onChange={e => { onChange(index, "mobileNo", e.target.value); }}
                            disabled={phoneVerified || phoneOtpSent}
                            placeholder="WhatsApp Number"
                            className={`${inputClasses} pr-20 ${phoneVerified ? "bg-green-50 border-green-300 text-green-700" : ""}`} />
                        {!phoneVerified && (
                            <button type="button" onClick={onSendPhoneOtp}
                                disabled={isSendingPhoneOtp || !person.mobileNo || (phoneTimer ?? 0) > 0}
                                className="absolute right-1 px-2 py-1 bg-[#23471d] text-white text-[9px] uppercase font-bold tracking-wider rounded-sm hover:bg-[#1a3516] disabled:bg-slate-300 transition-all whitespace-nowrap">
                                {isSendingPhoneOtp ? "..." : (phoneTimer ?? 0) > 0 ? `${phoneTimer}s` : phoneOtpSent ? "RESEND" : "SEND OTP"}
                            </button>
                        )}
                        {phoneVerified && <CheckCircle size={13} className="absolute right-2 text-green-500" />}
                    </div>
                ) : (
                    <Input required value={person.mobileNo} onChange={e => onChange(index, "mobileNo", e.target.value)} placeholder="WhatsApp Number" className={inputClasses} />
                )}
            </div>

            {/* Remove */}
            <div className="hidden xl:flex items-center justify-center pb-1">
                {canRemove ? (
                    <button type="button" onClick={() => onRemove(index)}
                        className="w-6 h-6 rounded-full bg-red-50 hover:bg-red-100 text-red-400 hover:text-red-600 flex items-center justify-center transition-colors shrink-0">
                        <Trash2 size={12} />
                    </button>
                ) : <div className="w-6 h-6" />}
            </div>

            {/* Mobile remove */}
            {canRemove && (
                <div className="xl:hidden flex justify-end col-span-full">
                    <button type="button" onClick={() => onRemove(index)}
                        className="text-red-400 hover:text-red-600 flex items-center gap-1 text-[10px] font-bold uppercase">
                        <Trash2 size={12} /> Remove Person {index + 1}
                    </button>
                </div>
            )}
        </div>

        {/* OTP input row — only for person 0 */}
        {index === 0 && (
            <AnimatePresence>
                {((emailOtpSent && !emailVerified) || (phoneOtpSent && !phoneVerified)) && (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}
                        className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3 overflow-hidden">
                        {phoneOtpSent && !phoneVerified && (
                            <div className="flex gap-2 items-center bg-orange-50/50 p-2 border border-orange-100 rounded-sm">
                                <Input value={phoneOtp ?? ""} onChange={e => onSetPhoneOtp?.(e.target.value)}
                                    placeholder="WhatsApp OTP" maxLength={6} inputMode="numeric" autoComplete="off"
                                    className="flex-1 h-9 rounded-sm border-orange-200 text-center tracking-[0.3em] font-bold text-xs" />
                                <Button type="button" onClick={onVerifyPhoneOtp}
                                    disabled={isVerifyingPhone || (phoneOtp?.length ?? 0) < 4}
                                    className="h-9 bg-[#23471d] hover:bg-[#1a3516] text-[10px] font-bold px-4">
                                    {isVerifyingPhone ? "..." : "VERIFY"}
                                </Button>
                            </div>
                        )}
                        {emailOtpSent && !emailVerified && (
                            <div className="flex gap-2 items-center bg-orange-50/50 p-2 border border-orange-100 rounded-sm">
                                <Input value={emailOtp ?? ""} onChange={e => onSetEmailOtp?.(e.target.value)}
                                    placeholder="Email OTP" maxLength={6} inputMode="numeric" autoComplete="off"
                                    className="flex-1 h-9 rounded-sm border-orange-200 text-center tracking-[0.3em] font-bold text-xs" />
                                <Button type="button" onClick={onVerifyEmailOtp}
                                    disabled={isVerifyingEmail || (emailOtp?.length ?? 0) < 4}
                                    className="h-9 bg-[#d26019] hover:bg-[#a84c14] text-[10px] font-bold px-4">
                                    {isVerifyingEmail ? "..." : "VERIFY"}
                                </Button>
                            </div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        )}
    </div>
);

// ── Main Component ──────────────────────────────────────────────────────────
const GroupRegistration: React.FC<{ embedded?: boolean }> = ({ embedded = false }) => {
    const [isSuccess, setIsSuccess] = useState(false);
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const [countries, setCountries] = useState<any[]>([]);
    const [states, setStates] = useState<any[]>([]);
    const [cities, setCities] = useState<any[]>([]);
    const [loadingStates, setLoadingStates] = useState(false);
    const [loadingCities, setLoadingCities] = useState(false);
    const [events, setEvents] = useState<any[]>([]);

    const [company, setCompany] = useState({ ...defaultCompany });
    const [persons, setPersons] = useState<Person[]>(Array.from({ length: MIN_PERSONS }, emptyPerson));

    // OTP state for person 0
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

    const defaultEventName = "9th Edition of International Health & Wellness Expo 2026";

    useEffect(() => {
        const init = async () => {
            try {
                const [eventsRes, countriesRes] = await Promise.all([eventApi.getActive(), crmApi.getCountries()]);
                setEvents(eventsRes);
                setCountries(countriesRes);
            } catch (err) { console.error(err); }
        };
        init();
    }, []);

    useEffect(() => {
        if (events.length > 0 && !company.registrationFor)
            setCompany(prev => ({ ...prev, registrationFor: events[0].name }));
        else if (events.length === 0 && !company.registrationFor)
            setCompany(prev => ({ ...prev, registrationFor: defaultEventName }));
    }, [events]);

    // Timers
    useEffect(() => {
        if (emailTimer <= 0) return;
        const t = setInterval(() => setEmailTimer(p => p - 1), 1000);
        return () => clearInterval(t);
    }, [emailTimer]);
    useEffect(() => {
        if (phoneTimer <= 0) return;
        const t = setInterval(() => setPhoneTimer(p => p - 1), 1000);
        return () => clearInterval(t);
    }, [phoneTimer]);

    // Country → States
    useEffect(() => {
        const run = async () => {
            if (!company.country) { setStates([]); return; }
            const found = countries.find(c => c.name === company.country);
            if (found) { setLoadingStates(true); try { setStates(await crmApi.getStates(found.countryCode)); } catch (e) { console.error(e); } finally { setLoadingStates(false); } }
        };
        run();
    }, [company.country, countries]);

    // State → Cities
    useEffect(() => {
        const run = async () => {
            if (!company.state) { setCities([]); return; }
            const found = states.find(s => s.name === company.state);
            if (found) { setLoadingCities(true); try { setCities(await crmApi.getCities(found.stateCode)); } catch (e) { console.error(e); } finally { setLoadingCities(false); } }
        };
        run();
    }, [company.state, states]);

    const handleCompanyChange = (e: any) => {
        const { name, value, type, checked } = e.target;
        if (name === "country") { setCompany(prev => ({ ...prev, country: value, state: "", city: "" })); setStates([]); setCities([]); return; }
        if (name === "state") { setCompany(prev => ({ ...prev, state: value, city: "" })); setCities([]); return; }
        setCompany(prev => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
    };

    const handlePersonChange = (index: number, field: keyof Person, value: string) => {
        // Reset OTP if person 0 email/phone changes
        if (index === 0 && field === "email") { setEmailVerified(false); setEmailOtpSent(false); setEmailOtp(""); }
        if (index === 0 && field === "mobileNo") { setPhoneVerified(false); setPhoneOtpSent(false); setPhoneOtp(""); }
        setPersons(prev => prev.map((p, i) => i === index ? { ...p, [field]: value } : p));
    };

    const addPerson = () => {
        if (persons.length < MAX_PERSONS) setPersons(prev => [...prev, emptyPerson()]);
    };
    const removePerson = (index: number) => {
        if (persons.length > MIN_PERSONS) setPersons(prev => prev.filter((_, i) => i !== index));
    };

    // OTP handlers
    const sendEmailOtp = async () => {
        if (!persons[0].email) { alert("Enter email for Person 1 first."); return; }
        setIsSendingEmailOtp(true);
        try {
            const res = await verifyApi.sendEmailOtp(persons[0].email, "VISITOR");
            if (res.success) { setEmailOtpSent(true); setEmailTimer(60); }
            else alert(res.message || "Failed to send OTP");
        } catch (e: any) { alert(e.message || "Failed to send OTP"); }
        finally { setIsSendingEmailOtp(false); }
    };
    const verifyEmailOtp = async () => {
        if (!emailOtp) return;
        setIsVerifyingEmail(true);
        try {
            const res = await verifyApi.verifyEmailOtp(persons[0].email, emailOtp);
            if (res.success) { setEmailVerified(true); setEmailOtpSent(false); setEmailOtp(""); }
            else alert(res.message || "Invalid OTP");
        } catch { alert("Verification failed."); }
        finally { setIsVerifyingEmail(false); }
    };
    const sendPhoneOtp = async () => {
        if (!persons[0].mobileNo) { alert("Enter WhatsApp number for Person 1 first."); return; }
        setIsSendingPhoneOtp(true);
        try {
            const name = `${persons[0].firstName} ${persons[0].lastName}`.trim() || "Visitor";
            const res = await verifyApi.sendPhoneOtp(persons[0].mobileNo, "VISITOR", name);
            if (res.success) { setPhoneOtpSent(true); setPhoneTimer(60); }
            else alert(res.message || "Failed to send OTP");
        } catch (e: any) { alert(e.message || "Failed to send OTP"); }
        finally { setIsSendingPhoneOtp(false); }
    };
    const verifyPhoneOtp = async () => {
        if (!phoneOtp) return;
        setIsVerifyingPhone(true);
        try {
            const res = await verifyApi.verifyPhoneOtp(persons[0].mobileNo, phoneOtp);
            if (res.success) { setPhoneVerified(true); setPhoneOtpSent(false); setPhoneOtp(""); }
            else alert(res.message || "Invalid OTP");
        } catch { alert("Verification failed."); }
        finally { setIsVerifyingPhone(false); }
    };

    const handlePurposeChange = (opt: string, checked: boolean) =>
        setCompany(prev => ({ ...prev, purposeOfVisit: checked ? [...prev.purposeOfVisit, opt] : prev.purposeOfVisit.filter(i => i !== opt) }));
    const handleInterestChange = (opt: string, checked: boolean) =>
        setCompany(prev => ({ ...prev, areaOfInterest: checked ? [...prev.areaOfInterest, opt] : prev.areaOfInterest.filter(i => i !== opt) }));

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrorMessage("");
        if (!emailVerified || !phoneVerified) {
            alert("Please verify the Email and WhatsApp number for Person 1.");
            return;
        }
        setLoading(true);
        try {
            const payload = {
                registrationFor: company.registrationFor || defaultEventName,
                companyName: company.companyName,
                companyWebsite: company.companyWebsite,
                industrySector: company.industry,
                companySize: company.companySize,
                country: company.country,
                state: company.state,
                city: company.city,
                companyPincode: company.companyPincode,
                b2bMeeting: company.schedulingB2B,
                whatsappUpdates: company.whatsappUpdates,
                specificRequirement: company.anyRequirement,
                subscribe: company.subscribeNewsletter,
                purposeOfVisit: company.purposeOfVisit,
                areaOfInterest: company.areaOfInterest,
                persons,
            };
            const res = await visitorApi.submitGroup(payload);
            if (res.success || res.data) {
                setIsSuccess(true);
                window.scrollTo({ top: 0, behavior: "smooth" });
                setTimeout(() => {
                    setCompany({ ...defaultCompany });
                    setPersons(Array.from({ length: MIN_PERSONS }, emptyPerson));
                    setEmailVerified(false); setPhoneVerified(false);
                    setIsSuccess(false);
                }, 5000);
            } else {
                throw new Error(res.message || "Registration failed");
            }
        } catch (error: any) {
            setErrorMessage(error.message || "Something went wrong.");
            alert("Error: " + (error.message || "Submission failed."));
        } finally {
            setLoading(false);
        }
    };

    const BENEFITS = [
        { icon: Gift, title: "Group Priority Entry", desc: "Dedicated group lane\nfor faster check-in" },
        { icon: BadgePercent, title: "Up to 10 Members", desc: "Register your full\nteam in one form" },
        { icon: BadgeCheck, title: "Stay Updated", desc: "All members get event\nalerts & schedules" },
        { icon: ShieldCheck, title: "Safe & Secure", desc: "Your data is protected\nwith us" },
    ];

    const resetAll = () => {
        setIsSuccess(false);
        setPersons(Array.from({ length: MIN_PERSONS }, emptyPerson));
        setCompany({ ...defaultCompany });
        setEmailVerified(false); setPhoneVerified(false);
    };

    // ── Success Screen ──────────────────────────────────────────────────────
    if (isSuccess) {
        return (
            <div className="bg-white border border-[#d3eed1] rounded-[20px] p-16 flex flex-col items-center justify-center min-h-[450px] shadow-xl relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-[#0e4293]" />
                <CheckCircle className="w-20 h-20 text-[#0e4293] mb-6" />
                <h3 className="text-[24px] font-black text-slate-900 uppercase tracking-tight mb-3 text-center">Group Registration Successful!</h3>
                <p className="text-slate-600 text-center text-[15px] max-w-md mb-8 font-bold leading-relaxed">
                    Thank you for registering your group. All members' details have been submitted successfully.
                </p>
                <div className="flex items-center gap-2 text-[11px] text-slate-400 font-black uppercase tracking-widest">
                    <div className="w-2 h-2 rounded-full bg-[#0e4293] animate-pulse" /> Redirecting in 5 seconds...
                </div>
                <div className="mt-10 flex gap-4">
                    <Button onClick={resetAll} className="h-11 px-8 rounded-lg bg-[#0e4293] hover:bg-[#092f6d] text-[12px] font-extrabold uppercase tracking-wider shadow-lg">
                        Register Another Group
                    </Button>
                    <Link to="/"><Button variant="outline" className="h-11 px-8 rounded-lg border-slate-300 text-slate-700 text-[12px] font-extrabold uppercase tracking-wider">Go Home</Button></Link>
                </div>
            </div>
        );
    }

    // ── Form ────────────────────────────────────────────────────────────────
    const formContent = (
        <div className="bg-white border border-slate-300 shadow-2xl rounded-lg overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-[#0e4293] to-[#1a5bbf] border-b border-slate-200 px-8 py-4 flex justify-between items-center">
                <div>
                    <h2 className="text-xl font-medium text-slate-200 uppercase" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                        Group Registration — Corporate Visitor
                    </h2>
                    <p className="text-[10px] text-slate-200 uppercase tracking-[0.2em] mt-0.5 font-bold">
                        9th Edition of International Health & Wellness Expo 2026 (IHWE Global Edition)
                    </p>
                </div>
                <Link to="/buyer-registration">
                    <Button type="button" variant="outline" className="px-6 h-9 border-[#d26019] text-[#d26019] hover:bg-[#d26019] hover:text-white text-[14px] font-bold uppercase tracking-wider transition-all">
                        Buyer Registration
                    </Button>
                </Link>
            </div>

            <form onSubmit={handleSubmit} className="p-8 space-y-6 font-inter">

                {/* ── SECTION 1: Company & Industry ── */}
                <div className="space-y-3">
                    <h3 className="text-sm font-bold text-[#d26019] uppercase tracking-[0.05em] border-b border-slate-400 pb-1.5" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                        Company &amp; Industry Information
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-x-5 gap-y-4">
                        <div className="lg:col-span-2">
                            <Label className={labelClasses}>COMPANY NAME <span className="text-red-500">*</span></Label>
                            <Input name="companyName" value={company.companyName} onChange={handleCompanyChange} required placeholder="Enter Company Name" className={inputClasses} />
                        </div>
                        <div>
                            <Label className={labelClasses}>COMPANY WEBSITE <span className="text-red-500">*</span></Label>
                            <Input name="companyWebsite" value={company.companyWebsite} onChange={handleCompanyChange} required placeholder="Enter Company Website" className={inputClasses} />
                        </div>
                        <div>
                            <Label className={labelClasses}>INDUSTRY / SECTOR <span className="text-red-500">*</span></Label>
                            <Select value={company.industry} onValueChange={v => setCompany(prev => ({ ...prev, industry: v }))}>
                                <SelectTrigger className={inputClasses}><SelectValue placeholder="Select Here" /></SelectTrigger>
                                <SelectContent className="bg-white">
                                    <SelectItem value="ayush">AYUSH</SelectItem>
                                    <SelectItem value="agriculture">Agriculture &amp; Organic</SelectItem>
                                    <SelectItem value="fitness">Fitness &amp; Wellness</SelectItem>
                                    <SelectItem value="healthcare">Healthcare Services</SelectItem>
                                    <SelectItem value="pharma">Pharmaceutical</SelectItem>
                                    <SelectItem value="others">Others</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div>
                            <Label className={labelClasses}>COMPANY SIZE <span className="text-red-500">*</span></Label>
                            <Select value={company.companySize} onValueChange={v => setCompany(prev => ({ ...prev, companySize: v }))}>
                                <SelectTrigger className={inputClasses}><SelectValue placeholder="Select Here" /></SelectTrigger>
                                <SelectContent className="bg-white">
                                    <SelectItem value="1-10">1–10 Employees</SelectItem>
                                    <SelectItem value="11-50">11–50 Employees</SelectItem>
                                    <SelectItem value="51-200">51–200 Employees</SelectItem>
                                    <SelectItem value="200+">200+ Employees</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div>
                            <Label className={labelClasses}>STATE <span className="text-red-500">*</span></Label>
                            <Select disabled={loadingStates} value={company.state} onValueChange={v => handleCompanyChange({ target: { name: "state", value: v } })}>
                                <SelectTrigger className={inputClasses}><SelectValue placeholder={loadingStates ? "Loading..." : "Select State"} /></SelectTrigger>
                                <SelectContent className="max-h-[300px] bg-white">
                                    {states.map(s => <SelectItem key={s._id || s.name} value={s.name}>{s.name}</SelectItem>)}
                                </SelectContent>
                            </Select>
                        </div>
                        <div>
                            <Label className={labelClasses}>CITY <span className="text-red-500">*</span></Label>
                            <Select disabled={!company.state || loadingCities} value={company.city} onValueChange={v => handleCompanyChange({ target: { name: "city", value: v } })}>
                                <SelectTrigger className={inputClasses}><SelectValue placeholder={loadingCities ? "Loading..." : "Select City"} /></SelectTrigger>
                                <SelectContent className="max-h-[300px] bg-white">
                                    {cities.map(ct => <SelectItem key={ct._id || ct.name} value={ct.name}>{ct.name}</SelectItem>)}
                                </SelectContent>
                            </Select>
                        </div>
                        <div>
                            <Label className={labelClasses}>PINCODE <span className="text-red-500">*</span></Label>
                            <Input name="companyPincode" value={company.companyPincode} onChange={handleCompanyChange} required placeholder="Enter Pincode" className={inputClasses} />
                        </div>
                    </div>
                </div>

                {/* ── SECTION 2: Personal Information ── */}
                <div className="space-y-2">
                    <div className="flex items-center justify-between border-b border-slate-400 pb-1.5">
                        <h3 className="text-sm font-bold text-[#d26019] uppercase tracking-[0.05em]" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                            Personal Information
                            <span className="ml-2 text-[10px] text-slate-400 normal-case tracking-normal font-medium">
                                ({persons.length} / {MAX_PERSONS} — min. {MIN_PERSONS})
                            </span>
                        </h3>
                        <button type="button" onClick={addPerson} disabled={persons.length >= MAX_PERSONS}
                            className="flex items-center gap-1.5 text-[10px] font-extrabold text-[#0e4293] uppercase tracking-wider hover:text-[#092f6d] disabled:text-slate-300 disabled:cursor-not-allowed transition-colors">
                            <Plus size={13} /> Add Member
                        </button>
                    </div>

                    {/* Note for person 1 */}
                    <p className="text-[10px] text-[#0e4293] font-bold bg-[#eef3ff] border border-[#0e4293]/20 rounded px-3 py-1.5">
                        Person 1 is the primary contact — email &amp; WhatsApp OTP verification required.
                    </p>

                    <div className="space-y-2">
                        {persons.map((person, idx) => (
                            <PersonCard key={idx} index={idx} person={person}
                                onChange={handlePersonChange} onRemove={removePerson} canRemove={persons.length > MIN_PERSONS}
                                {...(idx === 0 ? {
                                    emailVerified, phoneVerified,
                                    emailOtpSent, phoneOtpSent,
                                    emailOtp, phoneOtp,
                                    onSetEmailOtp: setEmailOtp, onSetPhoneOtp: setPhoneOtp,
                                    onSendEmailOtp: sendEmailOtp, onSendPhoneOtp: sendPhoneOtp,
                                    onVerifyEmailOtp: verifyEmailOtp, onVerifyPhoneOtp: verifyPhoneOtp,
                                    isSendingEmailOtp, isSendingPhoneOtp,
                                    isVerifyingEmail, isVerifyingPhone,
                                    emailTimer, phoneTimer,
                                } : {})}
                            />
                        ))}
                    </div>

                    {persons.length < MAX_PERSONS && (
                        <button type="button" onClick={addPerson}
                            className="w-full border border-dashed border-[#0e4293]/40 rounded-lg py-2.5 text-[11px] font-bold text-[#0e4293] uppercase tracking-wider hover:bg-[#0e4293]/5 transition-colors flex items-center justify-center gap-2">
                            <Plus size={13} /> Add Another Member ({persons.length} / {MAX_PERSONS})
                        </button>
                    )}
                </div>

                {/* ── SECTION 3: Purpose & Interest ── */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="space-y-4 bg-slate-50/50 p-5 border border-slate-300 rounded-[2px] shadow-sm">
                        <Label className="text-[11px] font-bold text-[#23471d] uppercase tracking-wider block border-b border-slate-200 pb-2">Purpose of Visit <span className="text-red-500">*</span></Label>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                            {PURPOSE_OPTIONS.map(opt => (
                                <label key={opt} className="flex items-center gap-3 cursor-pointer group">
                                    <Checkbox checked={company.purposeOfVisit.includes(opt)} onCheckedChange={(c: boolean) => handlePurposeChange(opt, c)}
                                        className="rounded-none w-3.5 h-3.5 border-slate-400 data-[state=checked]:bg-[#23471d] data-[state=checked]:border-[#23471d]" />
                                    <span className="text-[11px] text-slate-600 group-hover:text-slate-900 font-medium">{opt}</span>
                                </label>
                            ))}
                        </div>
                    </div>
                    <div className="space-y-4 bg-slate-50/50 p-5 border border-slate-300 rounded-[2px] shadow-sm">
                        <Label className="text-[11px] font-bold text-[#23471d] uppercase tracking-wider block border-b border-slate-200 pb-2">Area of Interest <span className="text-red-500">*</span></Label>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                            {INTEREST_OPTIONS.map(opt => (
                                <label key={opt} className="flex items-center gap-3 cursor-pointer group">
                                    <Checkbox checked={company.areaOfInterest.includes(opt)} onCheckedChange={(c: boolean) => handleInterestChange(opt, c)}
                                        className="rounded-none w-3.5 h-3.5 border-slate-400 data-[state=checked]:bg-[#23471d] data-[state=checked]:border-[#23471d]" />
                                    <span className="text-[11px] text-slate-600 group-hover:text-slate-900 font-medium">{opt}</span>
                                </label>
                            ))}
                        </div>
                    </div>
                </div>

                {/* ── SECTION 4: Additional Preferences ── */}
                <div className="space-y-3">
                    <h3 className="text-sm font-bold text-[#d26019] uppercase tracking-[0.05em] border-b border-slate-400 pb-1.5" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                        Additional Preferences
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-5 gap-y-4">
                        <div>
                            <Label className={labelClasses}>SCHEDULING B2B MEETINGS?</Label>
                            <RadioGroup value={company.schedulingB2B} onValueChange={v => setCompany(prev => ({ ...prev, schedulingB2B: v }))} className="flex gap-6 mt-1">
                                <div className="flex items-center space-x-2"><RadioGroupItem value="yes" id="b2b-yes" className="w-4 h-4 border-slate-400 text-[#0e4293]" /><Label htmlFor="b2b-yes" className="text-[12px] font-bold text-slate-700 cursor-pointer">Yes</Label></div>
                                <div className="flex items-center space-x-2"><RadioGroupItem value="no" id="b2b-no" className="w-4 h-4 border-slate-400 text-[#0e4293]" /><Label htmlFor="b2b-no" className="text-[12px] font-bold text-slate-700 cursor-pointer">No</Label></div>
                            </RadioGroup>
                        </div>
                        <div>
                            <Label className={labelClasses}>WHATSAPP UPDATES?</Label>
                            <RadioGroup value={company.whatsappUpdates} onValueChange={v => setCompany(prev => ({ ...prev, whatsappUpdates: v }))} className="flex gap-6 mt-1">
                                <div className="flex items-center space-x-2"><RadioGroupItem value="yes" id="wa-yes" className="w-4 h-4 border-slate-400 text-[#0e4293]" /><Label htmlFor="wa-yes" className="text-[12px] font-bold text-slate-700 cursor-pointer">Yes</Label></div>
                                <div className="flex items-center space-x-2"><RadioGroupItem value="no" id="wa-no" className="w-4 h-4 border-slate-400 text-[#0e4293]" /><Label htmlFor="wa-no" className="text-[12px] font-bold text-slate-700 cursor-pointer">No</Label></div>
                            </RadioGroup>
                        </div>
                        <div>
                            <Label className={labelClasses}>ANY SPECIFIC REQUIREMENT</Label>
                            <Input name="anyRequirement" value={company.anyRequirement} onChange={handleCompanyChange} placeholder="Enter any specific requirement" className={inputClasses} />
                        </div>
                    </div>
                </div>

                {/* ── Submit ── */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 pt-2">
                    <label className="flex items-center gap-3 cursor-pointer">
                        <Checkbox checked={company.subscribeNewsletter} onCheckedChange={(c: boolean) => setCompany(prev => ({ ...prev, subscribeNewsletter: c }))}
                            className="rounded-none w-3.5 h-3.5 border-slate-400 data-[state=checked]:bg-[#0e4293] data-[state=checked]:border-[#0e4293]" />
                        <span className="text-[10px] font-bold text-slate-500">
                            I agree to the <Link to="/terms-of-service" className="text-[#0e4293] underline">Terms &amp; Conditions</Link> and <Link to="/privacy-policy" className="text-[#0e4293] underline">Privacy Policy</Link>
                        </span>
                    </label>
                </div>
                {errorMessage && <p className="text-red-500 text-[12px] font-bold">{errorMessage}</p>}
                <Button type="submit" disabled={loading}
                    className="w-full md:w-[380px] h-10 bg-[#0e4293] hover:bg-[#092f6d] text-white font-black text-[12px] uppercase tracking-[0.2em] rounded-md shadow-lg transition-all flex items-center justify-center gap-3">
                    {loading ? <><Loader2 size={14} className="animate-spin" /> SUBMITTING...</> : <>SUBMIT GROUP REGISTRATION <ArrowRight size={14} /></>}
                </Button>
            </form>
        </div>
    );

    if (embedded) return formContent;

    return (
        <div className="min-h-screen bg-white font-inter text-slate-900 pb-0">
            <section className="relative overflow-hidden pt-[80px] pb-0"
                style={{
                    backgroundImage: "linear-gradient(to right, rgba(14,66,147,0.96) 0%, rgba(14,66,147,0.85) 35%, rgba(14,66,147,0.4) 65%, rgba(14,66,147,0.1) 100%), url('/visitor/visitor-reg.png')",
                    backgroundSize: "cover", backgroundPosition: "center right", backgroundRepeat: "no-repeat",
                    fontFamily: "'Barlow', sans-serif",
                }}>
                <div className="max-w-[1400px] mx-auto px-4 md:px-12 relative z-10 w-full">
                    <div className="flex flex-col lg:flex-row items-center justify-between w-full gap-6 pt-10 pb-6">
                        <div className="flex flex-col w-full lg:w-[60%] text-center lg:text-left items-center lg:items-start">
                            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#0b2d09]/90 border border-[#C7DF36] rounded-full text-[#C7DF36] text-[12px] font-extrabold uppercase tracking-wider w-fit mb-4">
                                <Users className="w-4 h-4 text-[#C7DF36]" /> Group Registration
                            </div>
                            <h1 className="text-[28px] sm:text-[38px] lg:text-[42px] font-extrabold text-white leading-[1.1] tracking-tight mb-1">Register Your Team</h1>
                            <h1 className="text-[26px] sm:text-[36px] lg:text-[42px] font-extrabold text-[#C7DF36] leading-[1.1] tracking-tight mb-3">at Health &amp; Wellness Expo!</h1>
                            <p className="text-white text-[13px] font-medium leading-relaxed max-w-xl mb-5 opacity-95">
                                Register 5–10 corporate visitors from your company in a single form. Faster check-in, dedicated group support, and exclusive group benefits.
                            </p>
                            <div className="flex items-center justify-center lg:justify-start w-full">
                                {[
                                    { label: "5–10 Members\nPer Registration", img: "/visitor/meet.png" },
                                    { label: "Dedicated Group\nSupport Desk", img: "/visitor/explore.png" },
                                    { label: "Faster Group\nCheck-in", img: "/visitor/conference.png" },
                                    { label: "Corporate\nNetworking Access", img: "/visitor/buildvalue.png" },
                                ].map((stat, i) => (
                                    <React.Fragment key={i}>
                                        <div className="flex flex-col items-center text-center px-4 md:px-6">
                                            <img src={stat.img} alt={stat.label} className="w-8 h-8 object-contain opacity-95 mb-2" />
                                            <div className="text-[11px] md:text-[12px] font-bold text-white tracking-tight leading-snug whitespace-pre-line">{stat.label}</div>
                                        </div>
                                        {i < 3 && <div className="w-[1px] h-10 bg-white/25 shrink-0" />}
                                    </React.Fragment>
                                ))}
                            </div>
                        </div>
                        <div className="shrink-0 flex items-center justify-center lg:mr-12 z-20">
                            <img src="/visitor/free_register_now.png" alt="Register Now" className="w-[160px] sm:w-[200px] lg:w-[240px] h-auto object-contain drop-shadow-2xl" />
                        </div>
                    </div>
                </div>
                <div className="mt-6 bg-white border-t border-slate-100 shadow-[0_8px_30px_rgba(0,0,0,0.06)]">
                    <div className="max-w-[1400px] mx-auto px-4 md:px-12">
                        <div className="grid grid-cols-1 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-slate-100">
                            {BENEFITS.map((item, idx) => (
                                <div key={idx} className="flex items-center gap-4 px-6 py-4 group">
                                    <div className="w-12 h-12 rounded-full border border-[#0e4293]/20 flex items-center justify-center text-[#0e4293] shrink-0">
                                        <item.icon className="w-6 h-6 stroke-[1.2]" />
                                    </div>
                                    <div>
                                        <p className="text-[13px] font-bold text-[#111827] leading-tight mb-0.5">{item.title}</p>
                                        <p className="text-[11px] font-medium text-slate-500 leading-tight whitespace-pre-line">{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <section className="pt-6 pb-8">
                <div className="max-w-[1400px] mx-auto px-6 md:px-12">
                    {isSuccess ? (
                        <div className="bg-white border border-[#d3eed1] rounded-[20px] p-16 flex flex-col items-center justify-center min-h-[450px] shadow-xl relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-full h-1 bg-[#0e4293]" />
                            <CheckCircle className="w-20 h-20 text-[#0e4293] mb-6" />
                            <h3 className="text-[24px] font-black text-slate-900 uppercase tracking-tight mb-3 text-center">Group Registration Successful!</h3>
                            <p className="text-slate-600 text-center text-[15px] max-w-md mb-8 font-bold leading-relaxed">All members' details have been submitted successfully.</p>
                            <div className="mt-10 flex gap-4">
                                <Button onClick={resetAll} className="h-11 px-8 rounded-lg bg-[#0e4293] hover:bg-[#092f6d] text-[12px] font-extrabold uppercase tracking-wider shadow-lg">Register Another Group</Button>
                                <Link to="/"><Button variant="outline" className="h-11 px-8 rounded-lg border-slate-300 text-slate-700 text-[12px] font-extrabold uppercase tracking-wider">Go Home</Button></Link>
                            </div>
                        </div>
                    ) : formContent}
                </div>
            </section>
        </div>
    );
};

export default GroupRegistration;
