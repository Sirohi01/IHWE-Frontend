import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
    CheckCircle, ChevronRight, ShieldCheck, Loader2, ArrowRight,
    Users, User, Plus, Trash2, BadgePercent, BadgeCheck, Gift,
    Ticket, Lock, Headphones, Check
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { crmApi, eventApi, visitorApi } from "@/lib/api";

// ── Constants ──────────────────────────────────────────────────────────────
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

const MAX_PERSONS = 5;

const emptyPerson = () => ({
    firstName: "",
    lastName: "",
    gender: "",
    designation: "",
    email: "",
    mobileNo: "",
});

type Person = ReturnType<typeof emptyPerson>;

const defaultCompany = {
    registrationFor: "",
    companyName: "",
    companyWebsite: "",
    industry: "",
    companySize: "",
    country: "India",
    state: "",
    city: "",
    companyPincode: "",
    schedulingB2B: "no",
    whatsappUpdates: "yes",
    anyRequirement: "",
    subscribeNewsletter: true,
    purposeOfVisit: [] as string[],
    areaOfInterest: [] as string[],
};

// ── Styles ─────────────────────────────────────────────────────────────────
const inputClasses =
    "rounded-[2px] border-slate-400 h-8 focus:border-[#23471d] focus:ring-[#23471d]/10 transition-all text-[12px] bg-white placeholder:text-slate-400 text-slate-900 font-medium shadow-none outline-none px-3 w-full text-left";
const labelClasses =
    "text-[10px] font-extrabold uppercase tracking-[0.05em] text-slate-800 mb-1 block";

// ── BenefitsBar ─────────────────────────────────────────────────────────────
const BenefitsBar = ({ items }: { items: any[] }) => (
    <div className="bg-white border border-slate-100 rounded-[20px] px-6 py-2 shadow-[0_8px_30px_rgba(0,0,0,0.04)] max-w-[1400px] mx-auto relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-2 divide-y md:divide-y-0 md:divide-x divide-slate-100">
            {items.map((item, idx) => (
                <div key={idx} className="flex items-center gap-4 px-6 py-2 transition-all group">
                    <div className="w-16 h-16 rounded-full border border-[#0e4293]/20 bg-transparent flex items-center justify-center text-[#0e4293] shrink-0 group-hover:border-[#0e4293]/50 transition-all shadow-sm">
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

// ── PersonCard ──────────────────────────────────────────────────────────────
const PersonCard = ({
    index, person, onChange, onRemove, canRemove,
}: {
    index: number;
    person: Person;
    onChange: (index: number, field: keyof Person, value: string) => void;
    onRemove: (index: number) => void;
    canRemove: boolean;
}) => (
    <div className="border border-slate-200 rounded-lg p-5 bg-slate-50/40 relative">
        <div className="flex items-center justify-between mb-4">
            <span className="text-[11px] font-extrabold text-[#0e4293] uppercase tracking-widest flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-[#0e4293] text-white flex items-center justify-center text-[10px] font-black">
                    {index + 1}
                </div>
                Person {index + 1}
            </span>
            {canRemove && (
                <button
                    type="button"
                    onClick={() => onRemove(index)}
                    className="text-red-400 hover:text-red-600 transition-colors flex items-center gap-1 text-[10px] font-bold uppercase"
                >
                    <Trash2 size={13} /> Remove
                </button>
            )}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-5 gap-y-3">
            <div>
                <Label className={labelClasses}>FIRST NAME <span className="text-red-500">*</span></Label>
                <Input required value={person.firstName} onChange={e => onChange(index, "firstName", e.target.value)}
                    placeholder="Enter First Name" className={inputClasses} />
            </div>
            <div>
                <Label className={labelClasses}>LAST NAME <span className="text-red-500">*</span></Label>
                <Input required value={person.lastName} onChange={e => onChange(index, "lastName", e.target.value)}
                    placeholder="Enter Last Name" className={inputClasses} />
            </div>
            <div>
                <Label className={labelClasses}>DESIGNATION <span className="text-red-500">*</span></Label>
                <Input required value={person.designation} onChange={e => onChange(index, "designation", e.target.value)}
                    placeholder="Enter Designation" className={inputClasses} />
            </div>
            <div>
                <Label className={labelClasses}>GENDER <span className="text-red-500">*</span></Label>
                <Select value={person.gender} onValueChange={v => onChange(index, "gender", v)}>
                    <SelectTrigger className={inputClasses}><SelectValue placeholder="Select Gender" /></SelectTrigger>
                    <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                        <SelectItem value="others">Others</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <div>
                <Label className={labelClasses}>EMAIL ADDRESS <span className="text-red-500">*</span></Label>
                <Input required type="email" value={person.email} onChange={e => onChange(index, "email", e.target.value)}
                    placeholder="Enter Email Address" className={inputClasses} />
            </div>
            <div>
                <Label className={labelClasses}>MOBILE NO. (WHATSAPP) <span className="text-red-500">*</span></Label>
                <Input required value={person.mobileNo} onChange={e => onChange(index, "mobileNo", e.target.value)}
                    placeholder="Enter WhatsApp Number" className={inputClasses} />
            </div>
        </div>
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
    const [persons, setPersons] = useState<Person[]>([emptyPerson()]);

    const defaultEventName = "9th Edition of International Health & Wellness Expo 2026";

    useEffect(() => {
        const init = async () => {
            try {
                const [eventsRes, countriesRes] = await Promise.all([
                    eventApi.getActive(),
                    crmApi.getCountries(),
                ]);
                setEvents(eventsRes);
                setCountries(countriesRes);
            } catch (err) {
                console.error(err);
            }
        };
        init();
    }, []);

    useEffect(() => {
        if (events.length > 0 && !company.registrationFor) {
            setCompany(prev => ({ ...prev, registrationFor: events[0].name }));
        } else if (events.length === 0 && !company.registrationFor) {
            setCompany(prev => ({ ...prev, registrationFor: defaultEventName }));
        }
    }, [events]);

    // Country → States
    useEffect(() => {
        const fetch = async () => {
            if (!company.country) { setStates([]); return; }
            const found = countries.find(c => c.name === company.country);
            if (found) {
                setLoadingStates(true);
                try { setStates(await crmApi.getStates(found.countryCode)); }
                catch (e) { console.error(e); }
                finally { setLoadingStates(false); }
            }
        };
        fetch();
    }, [company.country, countries]);

    // State → Cities
    useEffect(() => {
        const fetch = async () => {
            if (!company.state) { setCities([]); return; }
            const found = states.find(s => s.name === company.state);
            if (found) {
                setLoadingCities(true);
                try { setCities(await crmApi.getCities(found.stateCode)); }
                catch (e) { console.error(e); }
                finally { setLoadingCities(false); }
            }
        };
        fetch();
    }, [company.state, states]);

    const handleCompanyChange = (e: any) => {
        const { name, value, type, checked } = e.target;
        if (name === "country") {
            setCompany(prev => ({ ...prev, country: value, state: "", city: "" }));
            setStates([]); setCities([]);
            return;
        }
        if (name === "state") {
            setCompany(prev => ({ ...prev, state: value, city: "" }));
            setCities([]);
            return;
        }
        setCompany(prev => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
    };

    const handlePersonChange = (index: number, field: keyof Person, value: string) => {
        setPersons(prev => prev.map((p, i) => i === index ? { ...p, [field]: value } : p));
    };

    const addPerson = () => {
        if (persons.length < MAX_PERSONS) setPersons(prev => [...prev, emptyPerson()]);
    };

    const removePerson = (index: number) => {
        setPersons(prev => prev.filter((_, i) => i !== index));
    };

    const handlePurposeChange = (opt: string, checked: boolean) => {
        setCompany(prev => ({
            ...prev,
            purposeOfVisit: checked ? [...prev.purposeOfVisit, opt] : prev.purposeOfVisit.filter(i => i !== opt),
        }));
    };

    const handleInterestChange = (opt: string, checked: boolean) => {
        setCompany(prev => ({
            ...prev,
            areaOfInterest: checked ? [...prev.areaOfInterest, opt] : prev.areaOfInterest.filter(i => i !== opt),
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrorMessage("");
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
            const res = await visitorApi.submitCorporate(payload);
            if (res.success || res.data) {
                setIsSuccess(true);
                window.scrollTo({ top: 0, behavior: "smooth" });
                setTimeout(() => {
                    setCompany({ ...defaultCompany });
                    setPersons([emptyPerson()]);
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
        { icon: BadgePercent, title: "Save Time", desc: "One form for\nup to 5 members" },
        { icon: BadgeCheck, title: "Stay Updated", desc: "All members get event\nalerts & schedules" },
        { icon: ShieldCheck, title: "Safe & Secure", desc: "Your data is protected\nwith us" },
    ];

    // ── Success Screen ──────────────────────────────────────────────────────
    if (isSuccess) {
        return (
            <div className="bg-white border border-[#d3eed1] rounded-[20px] p-16 flex flex-col items-center justify-center min-h-[450px] shadow-xl relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-[#0e4293]" />
                <CheckCircle className="w-20 h-20 text-[#0e4293] mb-6" />
                <h3 className="text-[24px] font-black text-slate-900 uppercase tracking-tight mb-3 text-center">
                    Group Registration Successful!
                </h3>
                <p className="text-slate-600 text-center text-[15px] max-w-md mb-8 font-bold leading-relaxed">
                    Thank you for registering your group. All members' details have been submitted successfully.
                </p>
                <div className="flex items-center gap-2 text-[11px] text-slate-400 font-black uppercase tracking-widest">
                    <div className="w-2 h-2 rounded-full bg-[#0e4293] animate-pulse" />
                    Redirecting in 5 seconds...
                </div>
                <div className="mt-10 flex gap-4">
                    <Button onClick={() => { setIsSuccess(false); setPersons([emptyPerson()]); setCompany({ ...defaultCompany }); }}
                        className="h-11 px-8 rounded-lg bg-[#0e4293] hover:bg-[#092f6d] text-[12px] font-extrabold uppercase tracking-wider shadow-lg">
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
                    <Button type="button" variant="outline"
                        className="px-6 h-9 border-[#d26019] text-[#d26019] hover:bg-[#d26019] hover:text-white text-[14px] font-bold uppercase tracking-wider transition-all">
                        Buyer Registration
                    </Button>
                </Link>
            </div>

            <form onSubmit={handleSubmit} className="p-8 space-y-6 font-inter">

                {/* ── SECTION 1: Company & Industry Information ── */}
                <div className="space-y-3">
                    <h3 className="text-sm font-bold text-[#d26019] uppercase tracking-[0.05em] border-b border-slate-400 pb-1.5"
                        style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                        Company &amp; Industry Information
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-x-5 gap-y-4">
                        <div className="lg:col-span-2">
                            <Label className={labelClasses}>COMPANY NAME <span className="text-red-500">*</span></Label>
                            <Input name="companyName" value={company.companyName} onChange={handleCompanyChange}
                                required placeholder="Enter Company Name" className={inputClasses} />
                        </div>
                        <div>
                            <Label className={labelClasses}>COMPANY WEBSITE <span className="text-red-500">*</span></Label>
                            <Input name="companyWebsite" value={company.companyWebsite} onChange={handleCompanyChange}
                                required placeholder="Enter Company Website" className={inputClasses} />
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
                            <Select disabled={loadingStates} value={company.state}
                                onValueChange={v => handleCompanyChange({ target: { name: "state", value: v } })}>
                                <SelectTrigger className={inputClasses}><SelectValue placeholder={loadingStates ? "Loading..." : "Select State"} /></SelectTrigger>
                                <SelectContent className="max-h-[300px] bg-white">
                                    {states.map(s => <SelectItem key={s._id || s.name} value={s.name}>{s.name}</SelectItem>)}
                                </SelectContent>
                            </Select>
                        </div>
                        <div>
                            <Label className={labelClasses}>CITY <span className="text-red-500">*</span></Label>
                            <Select disabled={!company.state || loadingCities} value={company.city}
                                onValueChange={v => handleCompanyChange({ target: { name: "city", value: v } })}>
                                <SelectTrigger className={inputClasses}><SelectValue placeholder={loadingCities ? "Loading..." : "Select City"} /></SelectTrigger>
                                <SelectContent className="max-h-[300px] bg-white">
                                    {cities.map(ct => <SelectItem key={ct._id || ct.name} value={ct.name}>{ct.name}</SelectItem>)}
                                </SelectContent>
                            </Select>
                        </div>
                        <div>
                            <Label className={labelClasses}>PINCODE <span className="text-red-500">*</span></Label>
                            <Input name="companyPincode" value={company.companyPincode} onChange={handleCompanyChange}
                                required placeholder="Enter Pincode" className={inputClasses} />
                        </div>
                    </div>
                </div>

                {/* ── SECTION 2: Personal Information (up to 5 persons) ── */}
                <div className="space-y-3">
                    <div className="flex items-center justify-between border-b border-slate-400 pb-1.5">
                        <h3 className="text-sm font-bold text-[#d26019] uppercase tracking-[0.05em]"
                            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                            Personal Information
                            <span className="ml-2 text-[10px] text-slate-400 normal-case tracking-normal font-medium">
                                ({persons.length} / {MAX_PERSONS} persons)
                            </span>
                        </h3>
                        {persons.length < MAX_PERSONS && (
                            <button type="button" onClick={addPerson}
                                className="flex items-center gap-1.5 text-[10px] font-extrabold text-[#0e4293] uppercase tracking-wider hover:text-[#092f6d] transition-colors">
                                <Plus size={13} /> Add Person
                            </button>
                        )}
                    </div>

                    <div className="space-y-4">
                        {persons.map((person, idx) => (
                            <PersonCard key={idx} index={idx} person={person}
                                onChange={handlePersonChange} onRemove={removePerson} canRemove={persons.length > 1} />
                        ))}
                    </div>

                    {persons.length < MAX_PERSONS && (
                        <button type="button" onClick={addPerson}
                            className="w-full border border-dashed border-[#0e4293]/40 rounded-lg py-3 text-[11px] font-bold text-[#0e4293] uppercase tracking-wider hover:bg-[#0e4293]/5 transition-colors flex items-center justify-center gap-2">
                            <Plus size={14} /> Add Another Person ({persons.length}/{MAX_PERSONS})
                        </button>
                    )}
                </div>

                {/* ── SECTION 3: Purpose & Interest ── */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="space-y-4 bg-slate-50/50 p-5 border border-slate-300 rounded-[2px] shadow-sm">
                        <Label className="text-[11px] font-bold text-[#23471d] uppercase tracking-wider block border-b border-slate-200 pb-2">
                            Purpose of Visit <span className="text-red-500">*</span>
                        </Label>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                            {PURPOSE_OPTIONS.map(opt => (
                                <label key={opt} className="flex items-center gap-3 cursor-pointer group">
                                    <Checkbox checked={company.purposeOfVisit.includes(opt)}
                                        onCheckedChange={(checked: boolean) => handlePurposeChange(opt, checked)}
                                        className="rounded-none w-3.5 h-3.5 border-slate-400 data-[state=checked]:bg-[#23471d] data-[state=checked]:border-[#23471d]" />
                                    <span className="text-[11px] text-slate-600 group-hover:text-slate-900 font-medium transition-colors">{opt}</span>
                                </label>
                            ))}
                        </div>
                    </div>
                    <div className="space-y-4 bg-slate-50/50 p-5 border border-slate-300 rounded-[2px] shadow-sm">
                        <Label className="text-[11px] font-bold text-[#23471d] uppercase tracking-wider block border-b border-slate-200 pb-2">
                            Area of Interest <span className="text-red-500">*</span>
                        </Label>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                            {INTEREST_OPTIONS.map(opt => (
                                <label key={opt} className="flex items-center gap-3 cursor-pointer group">
                                    <Checkbox checked={company.areaOfInterest.includes(opt)}
                                        onCheckedChange={(checked: boolean) => handleInterestChange(opt, checked)}
                                        className="rounded-none w-3.5 h-3.5 border-slate-400 data-[state=checked]:bg-[#23471d] data-[state=checked]:border-[#23471d]" />
                                    <span className="text-[11px] text-slate-600 group-hover:text-slate-900 font-medium transition-colors">{opt}</span>
                                </label>
                            ))}
                        </div>
                    </div>
                </div>

                {/* ── SECTION 4: Additional Preferences ── */}
                <div className="space-y-3">
                    <h3 className="text-sm font-bold text-[#d26019] uppercase tracking-[0.05em] border-b border-slate-400 pb-1.5"
                        style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                        Additional Preferences
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-5 gap-y-4">
                        <div>
                            <Label className={labelClasses}>SCHEDULING B2B MEETINGS?</Label>
                            <RadioGroup value={company.schedulingB2B} onValueChange={v => setCompany(prev => ({ ...prev, schedulingB2B: v }))}
                                className="flex gap-6 mt-1">
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="yes" id="b2b-yes" className="w-4 h-4 border-slate-400 text-[#0e4293]" />
                                    <Label htmlFor="b2b-yes" className="text-[12px] font-bold text-slate-700 cursor-pointer">Yes</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="no" id="b2b-no" className="w-4 h-4 border-slate-400 text-[#0e4293]" />
                                    <Label htmlFor="b2b-no" className="text-[12px] font-bold text-slate-700 cursor-pointer">No</Label>
                                </div>
                            </RadioGroup>
                        </div>
                        <div>
                            <Label className={labelClasses}>WHATSAPP UPDATES?</Label>
                            <RadioGroup value={company.whatsappUpdates} onValueChange={v => setCompany(prev => ({ ...prev, whatsappUpdates: v }))}
                                className="flex gap-6 mt-1">
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="yes" id="wa-yes" className="w-4 h-4 border-slate-400 text-[#0e4293]" />
                                    <Label htmlFor="wa-yes" className="text-[12px] font-bold text-slate-700 cursor-pointer">Yes</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="no" id="wa-no" className="w-4 h-4 border-slate-400 text-[#0e4293]" />
                                    <Label htmlFor="wa-no" className="text-[12px] font-bold text-slate-700 cursor-pointer">No</Label>
                                </div>
                            </RadioGroup>
                        </div>
                        <div className="lg:col-span-1">
                            <Label className={labelClasses}>ANY SPECIFIC REQUIREMENT</Label>
                            <Input name="anyRequirement" value={company.anyRequirement} onChange={handleCompanyChange}
                                placeholder="Enter any specific requirement" className={inputClasses} />
                        </div>
                    </div>
                </div>

                {/* ── Submit ── */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 pt-2">
                    <label className="flex items-center gap-3 cursor-pointer">
                        <Checkbox checked={company.subscribeNewsletter}
                            onCheckedChange={(checked: boolean) => setCompany(prev => ({ ...prev, subscribeNewsletter: checked }))}
                            className="rounded-none w-3.5 h-3.5 border-slate-400 data-[state=checked]:bg-[#0e4293] data-[state=checked]:border-[#0e4293]" />
                        <span className="text-[10px] font-bold text-slate-500">
                            I agree to the{" "}
                            <Link to="/terms-of-service" className="text-[#0e4293] underline">Terms &amp; Conditions</Link>{" "}
                            and{" "}
                            <Link to="/privacy-policy" className="text-[#0e4293] underline">Privacy Policy</Link>
                        </span>
                    </label>
                </div>

                {errorMessage && (
                    <p className="text-red-500 text-[12px] font-bold">{errorMessage}</p>
                )}

                <Button type="submit" disabled={loading}
                    className="w-full md:w-[380px] h-10 bg-[#0e4293] hover:bg-[#092f6d] text-white font-black text-[12px] uppercase tracking-[0.2em] rounded-md shadow-lg transition-all flex items-center justify-center gap-3">
                    {loading ? <><Loader2 size={14} className="animate-spin" /> SUBMITTING...</> : <>SUBMIT GROUP REGISTRATION <ArrowRight size={14} /></>}
                </Button>
            </form>
        </div>
    );

    if (embedded) return formContent;

    return (
        <div className="min-h-screen bg-[#ffffff] font-inter text-slate-900 pb-0">
            {/* Hero */}
            <section className="relative overflow-hidden pb-12 sm:pb-16 md:pb-24 pt-32 sm:pt-28 md:pt-24 lg:pt-12"
                style={{
                    backgroundImage: "linear-gradient(to right, rgba(14,66,147,0.96) 0%, rgba(14,66,147,0.85) 35%, rgba(14,66,147,0.4) 65%, rgba(14,66,147,0.1) 100%), url('/visitor/visitor-reg.png')",
                    backgroundSize: "cover", backgroundPosition: "center right", backgroundRepeat: "no-repeat",
                    fontFamily: "'Barlow', sans-serif",
                }}>
                <div className="max-w-[1400px] mx-auto px-4 md:px-12 relative z-10 w-full">
                    <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between w-full gap-8 lg:gap-6">
                        <div className="flex flex-col w-full lg:w-[60%] text-center lg:text-left items-center lg:items-start">
                            <div className="inline-flex items-center gap-2 mt-20 px-4 py-1.5 bg-[#0b2d09]/90 border border-[#C7DF36] rounded-full text-[#C7DF36] text-[12px] sm:text-[13px] font-extrabold uppercase tracking-wider w-fit backdrop-blur-sm shadow-md mb-5">
                                <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full border border-[#C7DF36] flex items-center justify-center shrink-0">
                                    <Users className="w-3 sm:w-3.5 h-3 sm:h-3.5 text-[#C7DF36]" />
                                </div>
                                Group Registration
                            </div>
                            <div className="mb-4 text-center lg:text-left">
                                <h1 className="text-[32px] sm:text-[46px] lg:text-[52px] font-extrabold text-white leading-[1.1] tracking-tight">
                                    Register Your Team
                                </h1>
                                <h1 className="text-[30px] sm:text-[42px] lg:text-[52px] font-extrabold text-[#C7DF36] leading-[1.1] tracking-tight mt-1">
                                    at Health &amp; Wellness Expo!
                                </h1>
                            </div>
                            <p className="text-white text-[14px] sm:text-[16px] font-medium leading-relaxed max-w-2xl mb-10 opacity-95">
                                Register up to 5 corporate visitors from your company in a single form. Faster check-in, dedicated group support, and exclusive group benefits.
                            </p>
                            <div className="grid grid-cols-2 md:flex md:items-center justify-center lg:justify-start mt-3 mb-8 sm:mb-20 lg:mb-32 gap-x-8 md:gap-x-12 gap-y-6 w-full md:w-auto">
                                {[
                                    { label: "Up to 5 Members\nPer Registration", img: "/visitor/meet.png" },
                                    { label: "Dedicated Group\nSupport Desk", img: "/visitor/explore.png" },
                                    { label: "Faster Group\nCheck-in", img: "/visitor/conference.png" },
                                    { label: "Corporate\nNetworking Access", img: "/visitor/buildvalue.png" },
                                ].map((stat, i) => (
                                    <div key={i} className="flex flex-col items-center text-center px-1 max-w-[140px]">
                                        <div className="mb-3 flex items-center justify-center">
                                            <img src={stat.img} alt={stat.label} className="w-10 h-10 object-contain opacity-95" />
                                        </div>
                                        <div className="text-[12px] md:text-[13px] font-bold text-white tracking-tight leading-snug whitespace-pre-line drop-shadow-md">
                                            {stat.label}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="shrink-0 relative flex items-center justify-center lg:mr-12 mb-8 sm:mb-12 lg:mb-0 z-20">
                            <img src="/visitor/free_register_now.png" alt="Register Now"
                                className="w-[200px] sm:w-[260px] lg:w-[340px] h-auto object-contain drop-shadow-2xl" />
                        </div>
                    </div>
                </div>
            </section>

            {/* Benefits Bar */}
            <div className="max-w-[1400px] mx-auto px-4 md:px-12 relative -mt-10 sm:-mt-12 md:-mt-14 z-30">
                <BenefitsBar items={BENEFITS} />
            </div>

            {/* Form Section */}
            <section className="pt-6 pb-8">
                <div className="max-w-[1400px] mx-auto px-6 md:px-12">
                    {isSuccess ? (
                        <div className="bg-white border border-[#d3eed1] rounded-[20px] p-16 flex flex-col items-center justify-center min-h-[450px] shadow-xl relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-full h-1 bg-[#0e4293]" />
                            <CheckCircle className="w-20 h-20 text-[#0e4293] mb-6" />
                            <h3 className="text-[24px] font-black text-slate-900 uppercase tracking-tight mb-3 text-center">Group Registration Successful!</h3>
                            <p className="text-slate-600 text-center text-[15px] max-w-md mb-8 font-bold leading-relaxed">
                                Thank you for registering your group. All members' details have been submitted successfully.
                            </p>
                            <div className="flex items-center gap-2 text-[11px] text-slate-400 font-black uppercase tracking-widest">
                                <div className="w-2 h-2 rounded-full bg-[#0e4293] animate-pulse" />
                                Redirecting in 5 seconds...
                            </div>
                            <div className="mt-10 flex gap-4">
                                <Button onClick={() => { setIsSuccess(false); setPersons([emptyPerson()]); setCompany({ ...defaultCompany }); }}
                                    className="h-11 px-8 rounded-lg bg-[#0e4293] hover:bg-[#092f6d] text-[12px] font-extrabold uppercase tracking-wider shadow-lg">
                                    Register Another Group
                                </Button>
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
