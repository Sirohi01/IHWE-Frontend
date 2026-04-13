import { useState, useEffect, useMemo } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
    CheckCircle,
    Send, ChevronRight,
    Info,
    Calendar,
    MapPin,
    Mic2,
    Phone
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
    heroBackgroundApi,
    stallApi,
    exhibitorRegistrationApi,
    settingsApi,
    SERVER_URL,
    eventApi,
    stallRateApi,
    termsApi,
    publicApi,
    verifyApi,
    crmApi,
    eventHighlightsApi,
    countersApi,
    adminApi
} from "@/lib/api";
import Swal from 'sweetalert2';

const RAZORPAY_KEY_ID = import.meta.env.VITE_RAZORPAY_KEY_ID || "";

const loadScript = (src: string) => {
    return new Promise((resolve) => {
        const script = document.createElement("script");
        script.src = src;
        script.onload = () => resolve(true);
        script.onerror = () => resolve(false);
        document.body.appendChild(script);
    });
};


const PRIMARY_CATEGORIES = [
    "Medical & Healthcare",
    "AYUSH & Traditional Medicine",
    "Wellness, Fitness & Lifestyle",
    "Nutrition, Organic & Health Foods",
    "Beauty, Personal Care & Aesthetic Wellness",
    "Mental Health, Yoga & Spiritual Wellness",
    "Medical Technology, Diagnostics & Devices",
    "Institutions, Government Bodies & Startups"
];

const SUB_CATEGORIES: Record<string, string[]> = {
    "Medical & Healthcare": ["Hospitals & Clinics", "Pharmaceuticals", "Medical Services", "Healthcare Consultants"],
    "AYUSH & Traditional Medicine": ["Ayurveda Products", "Herbal Medicines", "Panchakarma & Therapies", "AYUSH Institutions"],
    "Wellness, Fitness & Lifestyle": ["Fitness Equipment", "Wellness Centers", "Lifestyle Products", "Preventive Healthcare"],
    "Nutrition, Organic & Health Foods": ["Organic Food Products", "Nutraceuticals", "Supplements", "Functional Foods"],
    "Beauty, Personal Care & Aesthetic Wellness": ["Skincare", "Cosmetics", "Herbal Beauty", "Aesthetic Clinics"],
    "Mental Health, Yoga & Spiritual Wellness": ["Yoga Institutes", "Meditation Services", "Mental Health Solutions", "Spiritual Organizations"],
    "Medical Technology, Diagnostics & Devices": ["Diagnostic Equipment", "Medical Devices", "Digital Health / HealthTech", "AI & Software Solutions"],
    "Institutions, Government Bodies & Startups": ["Government Bodies", "Research Institutes", "Universities", "Startups"]
};
const BUSINESS_TYPES = [
    "Private Ltd. Company",
    "Public Ltd. Company",
    "Partnership Company",
    "Limited Liability Partnership (LLP)",
    "One Person Company",
    "Sole Proprietorship",
    "Section 8 Company",
    "Others"
];

const INDUSTRY_SECTORS = [
    "AYUSH (Ayurveda, Yoga, Unani, Siddha, Homeopathy)",
    "Agriculture, Horticulture & Medicinal Plants",
    "Bio-Energy & Sustainable Living",
    "Fitness & Wellness Industry",
    "Health & Medical Services",
    "Health & Wellness Tourism",
    "Medical Equipment & Healthcare Technology",
    "Medical Tourism",
    "Nutrition & Health Supplements",
    "Organic & Herbal Products",
    "Pharmaceutical Companies",
    "Research, Education & Government Bodies",
    "Others"
];

// Removed static COUNTRIES array

const NATURE_OF_BUSINESS = [
    "Agency",
    "Aggregator",
    "Association",
    "College",
    "Dealer",
    "Digital Media",
    "Distributor",
    "Electronic Media",
    "Government Body",
    "Institution",
    "Manufacturer",
    "NGO",
    "Print Media",
    "Raw material Supplier",
    "Research Organisation",
    "Retailer",
    "Service Provider",
    "University",
    "Others"
];

const initialFormData = {
    eventId: '',
    exhibitorName: '',
    typeOfBusiness: '',
    industrySector: '',
    website: '',
    address: '',
    country: '',
    state: '',
    city: '',
    pincode: '',
    landlineNo: '',
    gstNo: '',
    panNo: '',
    natureOfBusiness: '',
    fasciaName: '',
    contact1: { title: '', firstName: '', lastName: '', email: '', designation: '', mobile: '', alternateNo: '' },
    contact2: { title: '', firstName: '', lastName: '', email: '', designation: '', mobile: '', alternateNo: '' },
    participation: {
        stallNo: '',
        stallFor: '',
        stallSize: 0,
        stallCategory: '',
        stallType: 'Shell Space',
        stallScheme: '',
        dimension: '',
        currency: 'INR',
        rate: 0,
        discount: 0,
        amount: 0,
        gstPercent: 18,
        total: 0
    },
    selectedSectors: [] as string[],
    primaryCategory: '',
    subCategory: '',
    otherSector: '',
    referredBy: '',
    spokenWith: '',
    filledBy: 'User',
    paymentMode: 'online' as 'manual' | 'online',
    paymentType: 'full' as 'advance' | 'full',
    amountPaid: 0,
    balanceAmount: 0,
    advancePercentage: 50,
    status: 'pending',
    paymentId: '',
    razorpayOrderId: '',
    razorpaySignature: ''
};

const BookAStand = () => {
    const [submitted, setSubmitted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [heroData, setHeroData] = useState<any>(null);
    const [events, setEvents] = useState<any[]>([]);
    const [selectedEventId, setSelectedEventId] = useState<string>('');
    const [availableStalls, setAvailableStalls] = useState<any[]>([]);
    const [staff, setStaff] = useState<any[]>([]);
    const [marketingStaff, setMarketingStaff] = useState<any[]>([]);
    const [termsContent, setTermsContent] = useState<any>(null);
    const [allRates, setAllRates] = useState<any[]>([]);
    const [countries, setCountries] = useState<any[]>([]);
    const [states, setStates] = useState<any[]>([]);
    const [cities, setCities] = useState<any[]>([]);
    const [eventHighlights, setEventHighlights] = useState<any>(null);
    const [settings, setSettings] = useState<any>(null);
    const [counters, setCounters] = useState<any[]>([]);

    const [formData, setFormData] = useState(initialFormData);

    const [onlineAdvancePercent, setOnlineAdvancePercent] = useState(50);
    const [exhibitorType, setExhibitorType] = useState<'domestic' | 'international' | null>(null);
    const [searchParams, setSearchParams] = useSearchParams();

    // Verification States
    const [emailVerified, setEmailVerified] = useState(false);
    const [phoneVerified, setPhoneVerified] = useState(false);
    const [emailOtp, setEmailOtp] = useState("");
    const [phoneOtp, setPhoneOtp] = useState("");
    const [emailTimer, setEmailTimer] = useState(0);
    const [phoneTimer, setPhoneTimer] = useState(0);
    const [isEmailLoading, setIsEmailLoading] = useState(false);
    const [isPhoneLoading, setIsPhoneLoading] = useState(false);
    const [verificationError, setVerificationError] = useState<string | null>(null);

    // Initial Data Fetch
    useEffect(() => {
        const fetchInitialData = async () => {
            try {
                const [hData, eData, employeesRes, staffRes, termsRes, countryRes, stateRes, cityRes, highlightRes, settingsRes, counterRes] = await Promise.all([
                    heroBackgroundApi.getByPage("Registration / Book A Stand"),
                    eventApi.getActive(),
                    publicApi.getEmployees(),
                    publicApi.getStaff(),
                    termsApi.getByPage("exhibitor-registration"),
                    crmApi.getCountries(),
                    crmApi.getStates(),
                    crmApi.getCities(),
                    eventHighlightsApi.get(),
                    settingsApi.get(),
                    countersApi.get()
                ]);

                if (hData) setHeroData((hData as any).data || hData);
                const actualEvents = Array.isArray(eData) ? eData : ((eData as any).data || []);
                if (actualEvents.length > 0) {
                    setEvents(actualEvents);
                    const urlEventId = searchParams.get('eventId');
                    const initialEventId = urlEventId && actualEvents.find((e: any) => e._id === urlEventId) ? urlEventId : actualEvents[0]._id;
                    setSelectedEventId(initialEventId);
                    const selEvent = actualEvents.find((e: any) => e._id === initialEventId) || actualEvents[0];
                    setFormData(prev => ({ ...prev, eventId: initialEventId, advancePercentage: selEvent.onlineAdvancePercentage }));
                    setOnlineAdvancePercent(selEvent.onlineAdvancePercentage || 50);
                }
                if (employeesRes) setMarketingStaff(Array.isArray(employeesRes) ? employeesRes : ((employeesRes as any).data || []));
                if (staffRes) setStaff(Array.isArray(staffRes) ? staffRes : ((staffRes as any).data || []));
                if (termsRes) setTermsContent(termsRes);
                if (countryRes) setCountries(countryRes);
                if (stateRes) setStates(stateRes);
                if (cityRes) setCities(cityRes);
                if (highlightRes) setEventHighlights(highlightRes);
                if (settingsRes) setSettings(settingsRes);
                if (counterRes) setCounters(counterRes);
            } catch (error) {
                console.error("Error fetching initial data:", error);
            }
        };
        fetchInitialData();
    }, []);

    // Fetch Stalls when Event changes
    useEffect(() => {
        if (selectedEventId) {
            stallApi.getByEvent(selectedEventId).then(data => {
                setAvailableStalls(data);
                // Reset selected stall if not in new list
                if (!data.find(s => s._id === formData.participation.stallNo)) {
                    setFormData(prev => ({
                        ...prev,
                        participation: { ...prev.participation, stallNo: '' }
                    }));
                }
            });

            // Fetch all rates for this event to display in table
            stallRateApi.getAllByEvent(selectedEventId).then(rates => {
                setAllRates(rates);
            });

            // Update advance percentage from event (line 215)
            const ev = events.find(e => e._id === selectedEventId);
            if (ev) setOnlineAdvancePercent(ev.onlineAdvancePercentage);
        }
    }, [selectedEventId, events]);

    const filteredStates = useMemo(() => {
        if (!formData.country || countries.length === 0) return [];
        const selectedCountry = countries.find(c =>
            c.name && c.name.trim().toLowerCase() === formData.country.trim().toLowerCase()
        );
        if (!selectedCountry) return [];
        return states.filter(s =>
            s.countryCode != null && selectedCountry.countryCode != null &&
            String(s.countryCode) === String(selectedCountry.countryCode)
        );
    }, [formData.country, countries, states]);

    const filteredCities = useMemo(() => {
        if (!formData.state || states.length === 0) return [];
        const selectedState = states.find(s =>
            s.name && s.name.trim().toLowerCase() === formData.state.trim().toLowerCase()
        );
        if (!selectedState) return [];
        return cities.filter(c =>
            c.stateCode != null && selectedState.stateCode != null &&
            String(c.stateCode) === String(selectedState.stateCode)
        );
    }, [formData.state, states, cities]);

    // OTP Timers
    useEffect(() => {
        let eTimer: any;
        let pTimer: any;

        if (emailTimer > 0) {
            eTimer = setInterval(() => setEmailTimer(prev => prev - 1), 1000);
        }
        if (phoneTimer > 0) {
            pTimer = setInterval(() => setPhoneTimer(prev => prev - 1), 1000);
        }

        return () => {
            if (eTimer) clearInterval(eTimer);
            if (pTimer) clearInterval(pTimer);
        };
    }, [emailTimer, phoneTimer]);

    // Rate Calculation Effect
    useEffect(() => {
        const updateRate = async () => {
            if (!selectedEventId || !formData.participation.stallType || !formData.participation.currency) return;

            try {
                const rateData = await stallRateApi.getRate(selectedEventId, formData.participation.currency, formData.participation.stallType);
                if (rateData) {
                    setFormData(prev => ({
                        ...prev,
                        participation: { ...prev.participation, rate: rateData.ratePerSqm }
                    }));
                }
            } catch (e) {
                console.error("Rate fetch error", e);
            }
        };
        updateRate();
    }, [selectedEventId, formData.participation.stallType, formData.participation.currency]);

    // Final Total Calculation
    useEffect(() => {
        const part = formData.participation;
        const rate = Number(part.rate) || 0;
        const size = Number(part.stallSize) || 0;

        // Find selected stall for increments/discounts
        const stall = availableStalls.find(s => s._id === part.stallNo);
        const incPercent = stall?.incrementPercentage || 0;
        const discPercent = stall?.discountPercentage || 0;

        const baseAmount = rate * size;
        const withInc = baseAmount * (1 + incPercent / 100);
        const discountAmount = withInc * (discPercent / 100);
        const subtotal = withInc - discountAmount;
        const gst = subtotal * 0.18;
        const total = subtotal + gst;

        const currentAdvancePercent = onlineAdvancePercent;
        let paid = total;
        if (formData.paymentType === 'advance') {
            paid = Number((total * (currentAdvancePercent / 100)).toFixed(2));
        }

        setFormData(prev => ({
            ...prev,
            participation: {
                ...prev.participation,
                amount: Number(subtotal.toFixed(2)),
                discount: Number(discountAmount.toFixed(2)),
                total: Number(total.toFixed(2))
            },
            amountPaid: paid,
            balanceAmount: Number((total - paid).toFixed(2)),
            advancePercentage: currentAdvancePercent
        }));
    }, [formData.participation.rate, formData.participation.stallSize, formData.participation.stallNo, formData.paymentType, onlineAdvancePercent]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        // Reset verification if email or phone changes
        if (name === 'contact1.email') {
            setEmailVerified(false);
            setVerificationError(null);
        }
        if (name === 'contact1.mobile') {
            setPhoneVerified(false);
            setVerificationError(null);
        }

        if (name.includes('.')) {
            const [parent, child] = name.split('.');
            setFormData(prev => ({
                ...prev,
                [parent]: { ...prev[parent as keyof typeof prev] as any, [child]: value }
            }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleSelectChange = (name: string, value: string) => {
        if (name === 'eventId') {
            setSelectedEventId(value);
            setFormData(prev => ({ ...prev, eventId: value }));
            return;
        }

        if (name === 'country') {
            setFormData(prev => ({ ...prev, country: value, state: '', city: '' }));
            return;
        }

        if (name === 'state') {
            setFormData(prev => ({ ...prev, state: value, city: '' }));
            return;
        }

        if (name.includes('.')) {
            const [parent, child] = name.split('.');
            setFormData(prev => ({
                ...prev,
                [parent]: { ...prev[parent as keyof typeof prev] as any, [child]: value }
            }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleStallChange = (stallId: string) => {
        const stall = availableStalls.find(s => s._id === stallId);
        if (stall) {
            setFormData(prev => ({
                ...prev,
                participation: {
                    ...prev.participation,
                    stallNo: stall._id,
                    stallFor: stall.stallNumber,
                    stallSize: stall.area,
                    dimension: `${stall.length}x${stall.width}m`,
                    stallScheme: stall.plScheme || 'One Side Open',
                    stallType: stall.stallType || prev.participation.stallType
                }
            }));
        }
    };

    const handleExhibitorTypeChange = (type: 'domestic' | 'international') => {
        setExhibitorType(type);
        setFormData(prev => ({
            ...prev,
            country: type === 'domestic' ? 'India' : '',
            state: '',
            city: '',
            participation: {
                ...prev.participation,
                currency: type === 'domestic' ? 'INR' : 'USD'
            }
        }));
    };

    const handleSectorToggle = (sector: string) => {
        setFormData(prev => {
            const current = [...prev.selectedSectors];
            const idx = current.indexOf(sector);
            if (idx > -1) current.splice(idx, 1);
            else current.push(sector);
            return { ...prev, selectedSectors: current };
        });
    };

    // --- VERIFICATION FUNCTIONS ---
    const handleSendEmailOtp = async () => {
        if (!formData.contact1.email) {
            setVerificationError("Please enter your official email first.");
            return;
        }
        setIsEmailLoading(true);
        setVerificationError(null);
        try {
            const res = await verifyApi.sendEmailOtp(formData.contact1.email, 'EXHIBITOR');
            if (res.success) {
                setEmailTimer(60);
                setVerificationError(null);
            } else {
                setVerificationError(res.message || "Failed to send email OTP.");
            }
        } catch (error) {
            setVerificationError("Failed to send email OTP. Please try again.");
        } finally {
            setIsEmailLoading(false);
        }
    };

    const handleVerifyEmailOtp = async () => {
        if (!emailOtp || emailOtp.length < 6) {
            setVerificationError("Please enter a valid 6-digit OTP.");
            return;
        }
        setIsEmailLoading(true);
        setVerificationError(null);
        try {
            const res = await verifyApi.verifyEmailOtp(formData.contact1.email, emailOtp);
            if (res.success) {
                setEmailVerified(true);
                setEmailOtp("");
                setVerificationError(null);
            } else {
                setVerificationError("Invalid or expired OTP. Please check again.");
            }
        } catch (error) {
            setVerificationError("Verification failed. Please try again.");
        } finally {
            setIsEmailLoading(false);
        }
    };

    const handleSendPhoneOtp = async () => {
        if (!formData.contact1.mobile) {
            setVerificationError("Please enter your mobile number first.");
            return;
        }
        setIsPhoneLoading(true);
        setVerificationError(null);
        try {
            const res = await verifyApi.sendPhoneOtp(formData.contact1.mobile, 'EXHIBITOR');
            if (res.success) {
                setPhoneTimer(60);
                setVerificationError(null);
            } else {
                setVerificationError(res.message || "Failed to send WhatsApp OTP.");
            }
        } catch (error) {
            setVerificationError("Failed to send WhatsApp OTP. Please try again.");
        } finally {
            setIsPhoneLoading(false);
        }
    };

    const handleVerifyPhoneOtp = async () => {
        if (!phoneOtp || phoneOtp.length < 6) {
            setVerificationError("Please enter a valid 6-digit OTP.");
            return;
        }
        setIsPhoneLoading(true);
        setVerificationError(null);
        try {
            const res = await verifyApi.verifyPhoneOtp(formData.contact1.mobile, phoneOtp);
            if (res.success) {
                setPhoneVerified(true);
                setPhoneOtp("");
                setVerificationError(null);
            } else {
                setVerificationError("Invalid or expired OTP. Please check again.");
            }
        } catch (error) {
            setVerificationError("Verification failed. Please try again.");
        } finally {
            setIsPhoneLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!emailVerified || !phoneVerified) {
            setVerificationError("Verification Required: Please verify your Email and WhatsApp mobile number before proceeding to payment.");
            const liaisonSection = document.getElementById('liaison-officer-section');
            if (liaisonSection) {
                liaisonSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
            return;
        }

        if (!formData.participation.stallNo) {
            Swal.fire('Error', 'Please select a stall first', 'error');
            return;
        }

        setIsLoading(true);
        try {
            if (formData.paymentMode === 'online') {
                const isLoaded = await loadScript("https://checkout.razorpay.com/v1/checkout.js");
                if (!isLoaded) {
                    Swal.fire('Error', 'Razorpay SDK failed to load.', 'error');
                    setIsLoading(false);
                    return;
                }

                const orderRes = await fetch(`${SERVER_URL}/api/payment/create-order`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        amount: formData.amountPaid,
                        currency: formData.participation.currency
                    })
                });
                const orderData = await orderRes.json();

                const options = {
                    key: RAZORPAY_KEY_ID,
                    amount: orderData.order.amount,
                    currency: formData.participation.currency,
                    name: "IH&WE Registration",
                    description: `Stand Booking - Stall ${formData.participation.stallFor}`,
                    order_id: orderData.order.id,
                    handler: async (response: any) => {
                        const finalData = {
                            ...formData,
                            razorpayOrderId: response.razorpay_order_id,
                            paymentId: response.razorpay_payment_id,
                            razorpaySignature: response.razorpay_signature,
                            status: formData.paymentType === 'full' ? 'paid' : 'advance-paid'
                        };
                        const submitRes = await exhibitorRegistrationApi.submit(finalData);
                        if (submitRes.success) {
                            setSubmitted(true);
                            window.scrollTo({ top: 0, behavior: "smooth" });
                        }
                    },
                    prefill: {
                        name: `${formData.contact1.firstName} ${formData.contact1.lastName}`,
                        email: formData.contact1.email,
                        contact: formData.contact1.mobile
                    },
                    theme: { color: "#23471d" }
                };

                const rzp = new (window as any).Razorpay(options);
                rzp.open();
                setIsLoading(false);
            }
        } catch (error: any) {
            Swal.fire('Error', error.message || "Failed to process registration", 'error');
        } finally {
            if (formData.paymentMode !== 'online') setIsLoading(false);
        }
    };

    const inputClasses =
        "rounded-[2px] border-slate-400 h-8 focus:border-[#23471d] focus:ring-[#23471d]/10 transition-all text-[12px] bg-white placeholder:text-slate-400 text-slate-900 font-medium shadow-none outline-none px-3 w-full text-left";
    const labelClasses =
        "text-[10px] font-bold uppercase tracking-[0.05em] text-slate-800 mb-1 block";
    const formatDateRange = (start?: string, end?: string) => {
        if (!start || !end) return "";
        const startDate = new Date(start);
        const endDate = new Date(end);

        const startDay = startDate.getDate();
        const endDay = endDate.getDate();
        const month = startDate.toLocaleString('default', { month: 'long' });
        const year = startDate.getFullYear();

        if (startDate.getMonth() === endDate.getMonth()) {
            return `${startDay} - ${endDay} ${month} ${year}`;
        }
        return `${startDay} ${month} - ${endDay} ${endDate.toLocaleString('default', { month: 'long' })} ${year}`;
    };

    const selectedEvent = events.find(e => e._id === selectedEventId);
    const selectedStall = useMemo(() =>
        availableStalls.find(s => s._id === formData.participation.stallNo),
        [availableStalls, formData.participation.stallNo]);

    return (
        <div className="min-h-screen bg-[#FDFDFD] text-slate-900 font-inter">
            {/* -- HERO SECTION - Registration Standard 16:5 -- */}
            <section
                className="hero-background-registration"
                style={{
                    backgroundImage: `url(${heroData?.backgroundImage ? `${SERVER_URL}${heroData.backgroundImage}` : ""})`,
                    backgroundColor: "#1a3516" // Professional fallback
                }}
            >
                <div className="absolute inset-0 bg-black/45" />

                <div
                    className="container mx-auto px-4 text-center text-white relative z-10"
                    data-aos="fade-up"
                >
                    <p className="text-sm uppercase tracking-[0.4em] mb-4 opacity-80">
                        {heroData?.title || ""}
                    </p>

                    <h1
                        className="text-[60px] font-inter font-bold mb-6 leading-[1.1]"
                    >
                        {heroData?.heading || "Book Your Exhibition Stand"}
                    </h1>

                    <p className="text-white/70 text-base md:text-lg mb-8 max-w-xl mx-auto font-light leading-relaxed">
                        {heroData?.shortDescription || "Showcase your innovations to 8,000+ top healthcare professionals. Fill out the form and our team will tailor the perfect space for your brand."}
                    </p>
                </div>
            </section>

            {/* -- MAIN CONTENT -- */}
            <section className="pt-4 pb-12 relative overflow-hidden">
                <div className="container mx-auto px-6 max-w-[1400px]">
                    <div className="space-y-4">
                        {/* -- PERPETUAL EVENT HEADER -- */}
                        <div className="bg-white border border-slate-300 shadow-xl overflow-hidden mb-4" data-aos="fade-up">
                            <div className="bg-slate-50/80 border-b border-slate-200 px-8 py-3 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-1">
                                        <h3 className="text-[22px] font-inter font-bold text-[#D26019]">{events.find(e => e._id === selectedEventId)?.name || 'IH&WE'}</h3>
                                    </div>
                                    <p className="text-[10px] font-bold text-slate-600 uppercase tracking-[0.15em]">Exhibitor Registration - Booking Form</p>

                                    {events.find(e => e._id === selectedEventId)?.description && (
                                        <div className="mt-2 relative">
                                            <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#d26019]/20 rounded-full" />
                                            <p className="text-[15px] text-slate-500 pl-4 font-medium max-w-full leading-relaxed">
                                                {events.find(e => e._id === selectedEventId)?.description}
                                            </p>
                                        </div>
                                    )}
                                </div>
                                <div className="flex flex-col items-end gap-1">
                                    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Support Protocol</span>
                                    <div className="flex items-center gap-2 mb-2">
                                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                        <span className="text-[11px] font-bold text-[#23471d] uppercase tracking-wider">{exhibitorType ? `${exhibitorType} Module` : 'Initialization...'}</span>
                                    </div>

                                    {events.find(e => e._id === selectedEventId)?.contactPhone && (
                                        <a href={`tel:${events.find(e => e._id === selectedEventId)?.contactPhone}`} className="flex items-center gap-2 px-4 py-2 bg-white border-2 border-[#d26019]/20 rounded-md shadow-sm hover:border-[#d26019] transition-all group">
                                            <Phone size={16} className="text-[#d26019] group-hover:scale-110 transition-transform" />
                                            <span className="text-[16px] font-bold text-slate-900 tracking-normal">{events.find(e => e._id === selectedEventId)?.contactPhone}</span>
                                        </a>
                                    )}
                                </div>
                            </div>
                            <div className="bg-slate-50/30 px-8 py-5">
                                <div className="flex flex-col md:flex-row items-end gap-6">
                                    <div className="w-full md:w-96">
                                        <Label className="text-[10px] font-bold text-[#23471d] uppercase mb-2 block tracking-[0.1em]">Select Exhibition Event *</Label>
                                        <Select onValueChange={(v) => handleSelectChange('eventId', v)} value={selectedEventId}>
                                            <SelectTrigger className="h-11 rounded-sm border-slate-300 bg-white text-xs font-bold text-slate-900 shadow-sm focus:ring-[#23471d]/20 hover:border-[#23471d] transition-all">
                                                <SelectValue placeholder="Choose Event" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {events.map(ev => (
                                                    <SelectItem key={ev._id} value={ev._id} className="text-xs font-bold uppercase tracking-tight">
                                                        {ev.name} ({new Date(ev.startDate).getFullYear()})
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="flex-1 pb-1">
                                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-1">Configuration Note</p>
                                        <p className="text-[11px] text-slate-500 font-medium">Selecting an event will automatically update pricing structures and protocols below.</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* -- REGISTRATION FLOW -- */}
                        <div className="w-full">
                            <AnimatePresence mode="wait">
                                {!exhibitorType ? (
                                    <motion.div
                                        key="placeholder"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="h-[400px] flex flex-col items-center justify-center text-center p-8 bg-white border border-slate-200 border-dashed rounded-xl shadow-sm"
                                    >
                                        <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-6">
                                            <Info className="text-slate-300" size={40} />
                                        </div>
                                        <h3 className="text-2xl font-inter font-bold text-slate-900 mb-2 leading-tight">Select Category to Start</h3>
                                        <p className="text-slate-400 text-sm max-w-sm font-medium mb-8">Please choose between Domestic or International to begin your registration process.</p>

                                        <div className="flex flex-col sm:flex-row gap-4">
                                            <button
                                                type="button"
                                                onClick={() => handleExhibitorTypeChange('domestic')}
                                                className="group relative px-10 py-4 bg-white border border-[#23471d] text-[#23471d] rounded-sm transition-all hover:bg-[#23471d] hover:text-white shadow-sm active:scale-[0.98] active:translate-y-0.5"
                                            >
                                                <div className="relative z-10 flex items-center gap-3">
                                                    <span className="text-xs font-bold uppercase tracking-[0.2em]">Domestic (India)</span>
                                                    <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                                                </div>
                                            </button>

                                            <button
                                                type="button"
                                                onClick={() => handleExhibitorTypeChange('international')}
                                                className="group relative px-10 py-4 bg-white border border-[#d26019] text-[#d26019] rounded-sm transition-all hover:bg-[#d26019] hover:text-white shadow-sm active:scale-[0.98] active:translate-y-0.5"
                                            >
                                                <div className="relative z-10 flex items-center gap-3">
                                                    <span className="text-xs font-bold uppercase tracking-[0.2em]">International</span>
                                                    <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                                                </div>
                                            </button>
                                        </div>
                                    </motion.div>
                                ) : submitted ? (
                                    <motion.div
                                        key="success"
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="min-h-[500px] flex flex-col items-center justify-center text-center p-8 bg-white border border-slate-200 shadow-2xl relative overflow-hidden rounded-xl"
                                    >
                                        {/* Decorative Background Elements */}
                                        <div className="absolute top-0 right-0 w-64 h-64 bg-[#23471d]/5 rounded-full -mr-32 -mt-32 blur-3xl" />
                                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#d26019]/5 rounded-full -ml-32 -mb-32 blur-3xl" />

                                        <div className="relative z-10 space-y-6 max-w-lg">
                                            <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4 border border-green-100 shadow-inner">
                                                <CheckCircle className="text-[#23471d]" size={40} />
                                            </div>

                                            <div className="space-y-2">
                                                <h2 className="text-4xl font-inter font-bold text-slate-900">Application Received!</h2>
                                                <p className="text-[#d26019] font-bold text-[10px] uppercase tracking-[0.3em]">Exhibitor Registration Protocol Complete</p>
                                            </div>

                                            <p className="text-slate-500 text-sm leading-relaxed font-medium">
                                                Thank you for choosing to exhibit at IHWE 2026. Your stall booking application for <span className="font-bold text-slate-900">Stall #{formData.participation.stallFor}</span> has been successfully submitted.
                                            </p>

                                            <div className="bg-slate-50 border border-slate-100 p-4 rounded-xl space-y-3">
                                                <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-wider text-slate-400">
                                                    <span>Transaction Status</span>
                                                    <span className="text-green-600">Verification Success</span>
                                                </div>
                                                <div className="h-px bg-slate-200" />
                                                <p className="text-[11px] text-slate-600 font-medium">
                                                    A confirmation email has been sent to <span className="text-slate-900 font-bold">{formData.contact1.email}</span> with your registration details and invoice.
                                                </p>
                                            </div>

                                            <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center">
                                                <Link to="/">
                                                    <Button className="h-11 px-8 rounded-xl bg-slate-900 hover:bg-black text-[11px] font-bold uppercase tracking-widest w-full">
                                                        Return to Home
                                                    </Button>
                                                </Link>
                                            </div>

                                            <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest pt-4">
                                                Official IHWE 2026 Exhibitor Portal
                                            </p>
                                        </div>
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        key="form"
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="bg-white border border-slate-300 shadow-2xl overflow-hidden rounded-sm"
                                    >
                                        <form onSubmit={handleSubmit} className="p-4 space-y-3 font-inter bg-white">
                                            {/* -- RATES COMPARISON TABLE (Matches Image 1) -- */}
                                            <div className="overflow-x-auto border border-slate-200 shadow-sm" data-aos="fade-up">
                                                <table className="w-full text-left border-collapse">
                                                    <thead>
                                                        <tr className="bg-[#0091d5] text-white">
                                                            <th className="py-3 px-6 text-xs font-bold uppercase tracking-wider border-r border-[#ffffff33] w-1/2">Stand Type</th>
                                                            {exhibitorType === 'domestic' && (
                                                                <th className="py-3 px-6 text-xs font-bold uppercase tracking-wider">Cost (in Indian Rupees ₹)</th>
                                                            )}
                                                            {exhibitorType === 'international' && (
                                                                <th className="py-3 px-6 text-xs font-bold uppercase tracking-wider">Cost (in USD $)</th>
                                                            )}
                                                        </tr>
                                                    </thead>
                                                    <tbody className="text-slate-700">
                                                        {allRates.length > 0 ? (
                                                            [...new Set(allRates.map(r => r.stallType))].map((type, idx) => {
                                                                const inrRate = allRates.find(r => r.stallType === type && r.currency === 'INR');
                                                                const usdRate = allRates.find(r => r.stallType === type && r.currency === 'USD');
                                                                return (
                                                                    <tr key={type} className={`border-b border-slate-200 ${idx % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'}`}>
                                                                        <td className="py-4 px-6 text-[12px] font-medium border-r border-slate-200 uppercase">{type} (min. {type?.toLowerCase().includes('raw') ? '18' : '9'} sq m.)</td>
                                                                        {exhibitorType === 'domestic' && (
                                                                            <td className="py-4 px-6 text-[12px] font-medium uppercase">
                                                                                {inrRate ? `INR ${inrRate.ratePerSqm.toLocaleString()} / sq m.` : 'N/A'}
                                                                            </td>
                                                                        )}
                                                                        {exhibitorType === 'international' && (
                                                                            <td className="py-4 px-6 text-[12px] font-medium uppercase">
                                                                                {usdRate ? `USD ${usdRate.ratePerSqm.toLocaleString()} / sq m.` : 'N/A'}
                                                                            </td>
                                                                        )}
                                                                    </tr>
                                                                );
                                                            })
                                                        ) : (
                                                            <tr>
                                                                <td colSpan={2} className="py-8 text-center text-[11px] text-slate-400">No stall rates available for this event</td>
                                                            </tr>
                                                        )}
                                                    </tbody>
                                                </table>
                                            </div>

                                            {/* -- EXHIBITOR DETAILS SECTION -- */}
                                            <div className="space-y-2 pt-1">
                                                <div className="pb-2 border-b border-slate-100">
                                                    <h3 className="text-sm font-bold text-[#d26019] uppercase tracking-[0.05em]">Exhibitor Details</h3>
                                                </div>

                                                <div className="grid grid-cols-1 md:grid-cols-5 gap-x-6 gap-y-2">
                                                    <div>
                                                        <Label className="text-[12px] font-bold text-slate-900 uppercase mb-1 block">COMPANY NAME <span className="text-red-500">*</span></Label>
                                                        <Input required name="exhibitorName" value={formData.exhibitorName} onChange={handleInputChange} placeholder="Write Here.." className="h-8 border-slate-400 rounded-[2px] bg-white text-[12px] font-medium text-slate-900 placeholder:text-slate-400" />
                                                    </div>
                                                    <div>
                                                        <Label className="text-[12px] font-bold text-slate-900 uppercase mb-1 block">TYPE OF BUSINESS <span className="text-red-500">*</span></Label>
                                                        <Select onValueChange={(v) => handleSelectChange('typeOfBusiness', v)} value={formData.typeOfBusiness}>
                                                            <SelectTrigger className="h-8 border-slate-400 rounded-[2px] bg-white text-[12px] font-medium text-slate-900">
                                                                <SelectValue placeholder="Select Here" />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                {BUSINESS_TYPES.map(type => (
                                                                    <SelectItem key={type} value={type} className="text-xs">{type}</SelectItem>
                                                                ))}
                                                            </SelectContent>
                                                        </Select>
                                                    </div>
                                                    <div>
                                                        <Label className="text-[12px] font-bold text-slate-900 uppercase mb-1 block">INDUSTRY/SECTOR <span className="text-red-500">*</span></Label>
                                                        <Select onValueChange={(v) => handleSelectChange('industrySector', v)} value={formData.industrySector}>
                                                            <SelectTrigger className="h-8 border-slate-400 rounded-[2px] bg-white text-[12px] font-medium text-slate-900">
                                                                <SelectValue placeholder="Select Here" />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                {PRIMARY_CATEGORIES.map(s => (
                                                                    <SelectItem key={s} value={s} className="text-xs">{s}</SelectItem>
                                                                ))}
                                                            </SelectContent>
                                                        </Select>
                                                    </div>
                                                    <div>
                                                        <Label className="text-[12px] font-bold text-slate-900 uppercase mb-1 block">WEBSITE <span className="text-red-500">*</span></Label>
                                                        <Input required name="website" value={formData.website} onChange={handleInputChange} placeholder="Write Here.." className="h-8 border-slate-400 rounded-[2px] bg-white text-[12px] font-medium text-slate-900 placeholder:text-slate-400" />
                                                    </div>

                                                    <div>
                                                        <Label className="text-[12px] font-bold text-slate-900 uppercase mb-1 block">EXHIBITOR ADDRESS <span className="text-red-500">*</span></Label>
                                                        <Input required name="address" value={formData.address} onChange={handleInputChange} placeholder="Write Here.." className="h-8 border-slate-400 rounded-[2px] bg-white text-[12px] font-medium text-slate-900 placeholder:text-slate-400" />
                                                    </div>
                                                    <div>
                                                        <Label className="text-[12px] font-bold text-slate-900 uppercase mb-1 block">COUNTRY <span className="text-red-500">*</span></Label>
                                                        <Select onValueChange={(v) => handleSelectChange('country', v)} value={formData.country}>
                                                            <SelectTrigger className="h-8 border-slate-400 rounded-[2px] bg-white text-[12px] font-medium text-slate-900">
                                                                <SelectValue placeholder="Select Here" />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                {countries
                                                                    .filter(c => exhibitorType === 'domestic' ? c.name.toLowerCase() === 'india' : c.name.toLowerCase() !== 'india')
                                                                    .map(c => (
                                                                        <SelectItem key={c._id} value={c.name} className="text-xs">{c.name}</SelectItem>
                                                                    ))
                                                                }
                                                            </SelectContent>
                                                        </Select>
                                                    </div>
                                                    <div>
                                                        <Label className="text-[12px] font-bold text-slate-900 uppercase mb-1 block">{exhibitorType === 'domestic' ? 'STATE' : 'STATE/PROVINCE'} <span className="text-red-500">*</span></Label>
                                                        <Select onValueChange={(v) => handleSelectChange('state', v)} value={formData.state} disabled={!formData.country}>
                                                            <SelectTrigger className="h-8 border-slate-400 rounded-[2px] bg-white text-[12px] font-medium text-slate-900">
                                                                <SelectValue placeholder="Select Here" />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                {filteredStates.map(s => (
                                                                    <SelectItem key={s._id} value={s.name} className="text-xs">{s.name}</SelectItem>
                                                                ))}
                                                            </SelectContent>
                                                        </Select>
                                                    </div>
                                                    <div>
                                                        <Label className="text-[12px] font-bold text-slate-900 uppercase mb-1 block">CITY <span className="text-red-500">*</span></Label>
                                                        <Select onValueChange={(v) => handleSelectChange('city', v)} value={formData.city} disabled={!formData.state}>
                                                            <SelectTrigger className="h-8 border-slate-400 rounded-[2px] bg-white text-[12px] font-medium text-slate-900">
                                                                <SelectValue placeholder="Select Here" />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                {filteredCities.map(c => (
                                                                    <SelectItem key={c._id} value={c.name} className="text-xs">{c.name}</SelectItem>
                                                                ))}
                                                            </SelectContent>
                                                        </Select>
                                                    </div>

                                                    <div>
                                                        <Label className="text-[12px] font-bold text-slate-900 uppercase mb-1 block">NATURE OF BUSINESS <span className="text-red-500">*</span></Label>
                                                        <Select onValueChange={(v) => handleSelectChange('natureOfBusiness', v)} value={formData.natureOfBusiness}>
                                                            <SelectTrigger className="h-8 border-slate-400 rounded-[2px] bg-white text-[12px] font-medium text-slate-900">
                                                                <SelectValue placeholder="Select Here" />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                {NATURE_OF_BUSINESS.map(n => (
                                                                    <SelectItem key={n} value={n} className="text-xs">{n}</SelectItem>
                                                                ))}
                                                            </SelectContent>
                                                        </Select>
                                                    </div>
                                                    <div>
                                                        <Label className="text-[12px] font-bold text-slate-900 uppercase mb-1 block">LANDLINE NO.</Label>
                                                        <Input name="landlineNo" value={formData.landlineNo} onChange={handleInputChange} placeholder="Write Here.." className="h-8 border-slate-400 rounded-[2px] bg-white text-[12px] font-medium text-slate-900 placeholder:text-slate-400" />
                                                    </div>
                                                </div>
                                            </div>

                                            {/* -- EXHIBITOR CONTACT DETAILS -- */}
                                            <div className="space-y-2 pt-1">
                                                <div className="pb-2 border-b border-slate-100">
                                                    <h3 className="text-sm font-bold text-[#d26019] uppercase tracking-[0.05em]">Exhibitor Contact Details</h3>
                                                </div>

                                                {/* First Contact Person */}
                                                <div className="space-y-4">
                                                    <h4 className="text-[13px] font-bold text-slate-900 border-l-4 border-[#23471d] pl-3 uppercase tracking-wider">First Contact Person Details</h4>
                                                    <div className="grid grid-cols-1 md:grid-cols-4 gap-x-5 gap-y-2">
                                                        <div>
                                                            <Label className="text-[12px] font-bold text-slate-900 uppercase mb-1 block">TITLE <span className="text-red-500">*</span></Label>
                                                            <Select onValueChange={(v) => handleSelectChange('contact1.title', v)} value={formData.contact1.title}>
                                                                <SelectTrigger className="h-8 border-slate-400 rounded-[2px] bg-white text-[12px] font-medium text-slate-900">
                                                                    <SelectValue placeholder="Select Here" />
                                                                </SelectTrigger>
                                                                <SelectContent>
                                                                    <SelectItem value="Mr.">Mr.</SelectItem>
                                                                    <SelectItem value="Ms.">Ms.</SelectItem>
                                                                    <SelectItem value="Mrs.">Mrs.</SelectItem>
                                                                    <SelectItem value="Dr.">Dr.</SelectItem>
                                                                </SelectContent>
                                                            </Select>
                                                        </div>
                                                        <div>
                                                            <Label className="text-[12px] font-bold text-slate-900 uppercase mb-1 block">FIRST NAME <span className="text-red-500">*</span></Label>
                                                            <Input required name="contact1.firstName" value={formData.contact1.firstName} onChange={handleInputChange} placeholder="Write Here.." className="h-8 border-slate-400 rounded-[2px] bg-white text-[12px] font-medium text-slate-900 placeholder:text-slate-400" />
                                                        </div>
                                                        <div>
                                                            <Label className="text-[12px] font-bold text-slate-900 uppercase mb-1 block">LAST NAME <span className="text-red-500">*</span></Label>
                                                            <Input required name="contact1.lastName" value={formData.contact1.lastName} onChange={handleInputChange} placeholder="Write Here.." className="h-8 border-slate-400 rounded-[2px] bg-white text-[12px] font-medium text-slate-900 placeholder:text-slate-400" />
                                                        </div>
                                                        <div>
                                                            <Label className="text-[12px] font-bold text-slate-900 uppercase mb-1 block">EMAIL <span className="text-red-500">*</span></Label>
                                                            <div className="flex gap-1">
                                                                <Input
                                                                    required
                                                                    type="email"
                                                                    name="contact1.email"
                                                                    value={formData.contact1.email}
                                                                    onChange={handleInputChange}
                                                                    placeholder="Official Email"
                                                                    className={`h-8 border-slate-400 rounded-[2px] bg-white text-[12px] font-medium text-slate-900 flex-1 ${emailVerified ? 'border-green-500' : ''}`}
                                                                    readOnly={emailVerified}
                                                                />
                                                                {!emailVerified && (
                                                                    <Button type="button" onClick={handleSendEmailOtp} disabled={isEmailLoading || emailTimer > 0} className="h-8 bg-slate-800 text-[10px] font-bold uppercase rounded-[2px] px-3">
                                                                        {emailTimer > 0 ? `Resend ${emailTimer}s` : 'Get OTP'}
                                                                    </Button>
                                                                )}
                                                                {emailVerified && (
                                                                    <div className="h-8 px-3 bg-green-50 border border-green-200 rounded-[2px] flex items-center justify-center">
                                                                        <CheckCircle className="text-green-600" size={14} />
                                                                    </div>
                                                                )}
                                                            </div>
                                                            {!emailVerified && emailTimer > 0 && (
                                                                <div className="flex gap-1 mt-2 animate-in fade-in slide-in-from-top-1">
                                                                    <Input
                                                                        value={emailOtp}
                                                                        onChange={(e) => setEmailOtp(e.target.value)}
                                                                        placeholder="6-Digit OTP"
                                                                        maxLength={6}
                                                                        className="h-8 border-[#23471d] text-xs font-bold text-center tracking-[0.5em] focus:ring-0 rounded-[2px]"
                                                                    />
                                                                    <Button type="button" onClick={handleVerifyEmailOtp} disabled={isEmailLoading} className="h-8 bg-[#23471d] text-[10px] font-bold uppercase rounded-[2px]">Verify</Button>
                                                                </div>
                                                            )}
                                                        </div>

                                                        <div>
                                                            <Label className="text-[12px] font-bold text-slate-900 uppercase mb-1 block">DESIGNATION <span className="text-red-500">*</span></Label>
                                                            <Input required name="contact1.designation" value={formData.contact1.designation} onChange={handleInputChange} placeholder="Write Here.." className="h-8 border-slate-400 rounded-[2px] bg-white text-[12px] font-medium text-slate-900 placeholder:text-slate-400" />
                                                        </div>
                                                        <div>
                                                            <Label className="text-[12px] font-bold text-slate-900 uppercase mb-1 block">MOBILE <span className="text-red-500">*</span></Label>
                                                            <div className="flex gap-1">
                                                                <Input
                                                                    required
                                                                    name="contact1.mobile"
                                                                    value={formData.contact1.mobile}
                                                                    onChange={handleInputChange}
                                                                    placeholder="WhatsApp Number"
                                                                    className={`h-8 border-slate-400 rounded-[2px] bg-white text-[12px] font-medium text-slate-900 flex-1 ${phoneVerified ? 'border-green-500' : ''}`}
                                                                    readOnly={phoneVerified}
                                                                />
                                                                {!phoneVerified && (
                                                                    <Button type="button" onClick={handleSendPhoneOtp} disabled={isPhoneLoading || phoneTimer > 0} className="h-8 bg-[#25D366] text-white text-[10px] font-bold uppercase rounded-[2px] px-3">
                                                                        {phoneTimer > 0 ? `${phoneTimer}s` : 'Send OTP'}
                                                                    </Button>
                                                                )}
                                                                {phoneVerified && (
                                                                    <div className="h-8 px-3 bg-green-50 border border-green-200 rounded-[2px] flex items-center justify-center">
                                                                        <CheckCircle className="text-green-600" size={14} />
                                                                    </div>
                                                                )}
                                                            </div>
                                                            {!phoneVerified && phoneTimer > 0 && (
                                                                <div className="flex gap-1 mt-2 animate-in fade-in slide-in-from-top-1">
                                                                    <Input
                                                                        value={phoneOtp}
                                                                        onChange={(e) => setPhoneOtp(e.target.value)}
                                                                        placeholder="6-Digit OTP"
                                                                        maxLength={6}
                                                                        className="h-8 border-[#25D366] text-xs font-bold text-center tracking-[0.5em] focus:ring-0 rounded-[2px]"
                                                                    />
                                                                    <Button type="button" onClick={handleVerifyPhoneOtp} disabled={isPhoneLoading} className="h-8 bg-[#25D366] text-white text-[10px] font-bold uppercase rounded-[2px]">Verify</Button>
                                                                </div>
                                                            )}
                                                        </div>
                                                        <div>
                                                            <Label className="text-[12px] font-bold text-slate-900 uppercase mb-1 block">ALTERNATE NO.</Label>
                                                            <Input name="contact1.alternateNo" value={formData.contact1.alternateNo} onChange={handleInputChange} placeholder="Write Here.." className="h-8 border-slate-400 rounded-[2px] bg-white text-[12px] font-medium text-slate-900 placeholder:text-slate-400" />
                                                        </div>
                                                    </div>
                                                </div>


                                            </div>

                                            {/* -- PARTICIPATION DETAILS SECTION -- */}
                                            <div className="space-y-2 pt-1 border-t border-slate-100">
                                                <div className="pb-2 border-b border-slate-100">
                                                    <h3 className="text-sm font-bold text-[#d26019] uppercase tracking-[0.05em]">Participation Details</h3>
                                                </div>

                                                <div className="space-y-4">
                                                    {/* Selection Controls */}
                                                    <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-5 gap-y-2">
                                                        <div className="space-y-1.5">
                                                            <Label className="text-[12px] font-bold text-slate-900 uppercase mb-1 block">STALL FOR <span className="text-red-500">*</span></Label>
                                                            <Select onValueChange={(v) => handleStallChange(v)} value={formData.participation.stallNo}>
                                                                <SelectTrigger className="h-8 border-slate-400 rounded-[2px] bg-white text-[12px] font-medium text-slate-900">
                                                                    <SelectValue placeholder="Select Stall" />
                                                                </SelectTrigger>
                                                                <SelectContent>
                                                                    {availableStalls.map(s => (
                                                                        <SelectItem key={s._id} value={s._id} className="text-xs">Stall {s.stallNumber}</SelectItem>
                                                                    ))}
                                                                </SelectContent>
                                                            </Select>
                                                        </div>
                                                        <div className="space-y-1.5">
                                                            <Label className="text-[12px] font-bold text-slate-900 uppercase mb-1 block">STALL SIZE <span className="text-red-500">*</span></Label>
                                                            <Input readOnly value={formData.participation.stallSize} className="h-8 border-slate-400 rounded-[2px] bg-slate-50 text-[12px] font-bold text-slate-900" />
                                                        </div>
                                                        <div className="space-y-1.5">
                                                            <Label className="text-[12px] font-bold text-slate-900 uppercase mb-1 block">STALL CATEGORY <span className="text-red-500">*</span></Label>
                                                            <Select
                                                                onValueChange={(v) => {
                                                                    setFormData(prev => ({
                                                                        ...prev,
                                                                        participation: { ...prev.participation, stallType: v }
                                                                    }));
                                                                }}
                                                                value={formData.participation.stallType}
                                                            >
                                                                <SelectTrigger className="h-8 border-slate-400 rounded-[2px] bg-white text-[12px] font-medium text-slate-900">
                                                                    <SelectValue placeholder="Select Category" />
                                                                </SelectTrigger>
                                                                <SelectContent>
                                                                    <SelectItem value="Shell Space" className="text-xs">Shell Space (Built-up)</SelectItem>
                                                                    <SelectItem value="Raw Space" className="text-xs">Raw Space (Plot)</SelectItem>
                                                                </SelectContent>
                                                            </Select>
                                                        </div>
                                                        <div className="space-y-1.5">
                                                            <Label className="text-[12px] font-bold text-slate-900 uppercase mb-1 block">PL SCHEME <span className="text-red-500">*</span></Label>
                                                            <Input readOnly value={formData.participation.stallScheme || "N/A"} className="h-8 border-slate-400 rounded-[2px] bg-slate-50 text-[12px] font-bold text-slate-900" />
                                                        </div>
                                                        <div className="space-y-1.5">
                                                            <Label className="text-[12px] font-bold text-slate-900 uppercase mb-1 block">DIMENSION <span className="text-red-500">*</span></Label>
                                                            <Input readOnly value={formData.participation.dimension} className="h-8 border-slate-400 rounded-[2px] bg-slate-50 text-[12px] font-bold text-slate-900" />
                                                        </div>
                                                        <div className="space-y-1.5">
                                                            <Label className="text-[12px] font-bold text-slate-900 uppercase mb-1 block">STALL NO. <span className="text-red-500">*</span></Label>
                                                            <Input readOnly value={formData.participation.stallFor} className="h-8 border-slate-400 rounded-[2px] bg-slate-50 text-[12px] font-bold text-slate-900" />
                                                        </div>
                                                    </div>

                                                    {/* Cost Breakdown box (full width below fields) */}
                                                    <div className="w-full">
                                                        <div className="p-4 bg-[#f8fafc] border border-slate-200 rounded-sm shadow-sm relative overflow-hidden group">
                                                            {/* Accent Decoration */}
                                                            <div className="absolute top-0 right-0 w-24 h-24 bg-[#23471d]/5 rounded-full -mr-12 -mt-12 blur-2xl" />

                                                            <div className="flex items-center gap-2 mb-3">
                                                                <div className="w-1.5 h-4 bg-[#23471d] rounded-full" />
                                                                <Label className="text-[11px] font-bold text-slate-500 uppercase tracking-[0.15em] block">Cost Breakdown</Label>
                                                            </div>

                                                            <div className="flex flex-wrap gap-6 relative z-10 items-end">
                                                                <div className="flex flex-col gap-1 min-w-[160px]">
                                                                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Space Area ({formData.participation.stallSize} sqm)</span>
                                                                    <span className="text-lg font-bold text-slate-900">
                                                                        {formData.participation.currency === 'INR' ? '\u20b9' : '\$'} {Number(formData.participation.rate * formData.participation.stallSize).toLocaleString()}
                                                                    </span>
                                                                </div>
                                                                {selectedStall?.incrementPercentage > 0 && (
                                                                    <div className="flex flex-col gap-1 min-w-[160px] text-orange-600">
                                                                        <span className="text-[10px] font-bold uppercase tracking-widest">PL Increment ({selectedStall.incrementPercentage}%)</span>
                                                                        <span className="text-lg font-bold">+ {formData.participation.currency === 'INR' ? '\u20b9' : '\$'} {Number(formData.participation.rate * formData.participation.stallSize * selectedStall.incrementPercentage / 100).toLocaleString()}</span>
                                                                    </div>
                                                                )}
                                                                <div className="flex flex-col gap-1 min-w-[160px] border-l border-slate-200 pl-4">
                                                                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">GST (18%)</span>
                                                                    <span className="text-lg font-bold text-slate-900">
                                                                        {formData.participation.currency === 'INR' ? '\u20b9' : '\$'} {Math.round(formData.participation.total - formData.participation.amount).toLocaleString()}
                                                                    </span>
                                                                </div>
                                                                <div className="flex flex-col gap-1 min-w-[160px] border-l border-slate-200 pl-4 ml-auto">
                                                                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Grand Total <span className="text-[8px] normal-case text-slate-300 ml-1">Tax Included</span></span>
                                                                    <span className="text-2xl font-bold text-[#23471d]">
                                                                        {formData.participation.currency === 'INR' ? '\u20b9' : '\$'} {formData.participation.total.toLocaleString()}
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="space-y-2 pt-1 border-t border-slate-100">
                                                <h3 className="text-sm font-bold text-[#d26019] uppercase tracking-[0.05em] border-b border-slate-100 pb-1 mb-2">
                                                    Exhibitor Category
                                                </h3>

                                                <div className="grid grid-cols-4 gap-4">
                                                    <div>
                                                        <Label className="text-[12px] font-bold text-slate-900 uppercase mb-1 block">PRIMARY CATEGORY <span className="text-red-500">*</span></Label>
                                                        <Select
                                                            onValueChange={(v) => setFormData(prev => ({ ...prev, primaryCategory: v, subCategory: '' }))}
                                                            value={formData.primaryCategory}
                                                        >
                                                            <SelectTrigger className="h-8 w-full border-slate-400 rounded-[2px] bg-white text-[12px] font-medium text-slate-900">
                                                                <SelectValue placeholder="Select Primary Category" />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                {PRIMARY_CATEGORIES.map(cat => (
                                                                    <SelectItem key={cat} value={cat} className="text-xs">{cat}</SelectItem>
                                                                ))}
                                                            </SelectContent>
                                                        </Select>
                                                    </div>

                                                    <div>
                                                        <Label className="text-[12px] font-bold text-slate-900 uppercase mb-1 block">SUB-CATEGORY</Label>
                                                        <Select
                                                            onValueChange={(v) => setFormData(prev => ({ ...prev, subCategory: v }))}
                                                            value={formData.subCategory}
                                                            disabled={!formData.primaryCategory}
                                                        >
                                                            <SelectTrigger className="h-8 w-full border-slate-400 rounded-[2px] bg-white text-[12px] font-medium text-slate-900 disabled:opacity-50">
                                                                <SelectValue placeholder={formData.primaryCategory ? "Select Sub-Category" : "Select Primary Category first"} />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                {(SUB_CATEGORIES[formData.primaryCategory] || []).map(sub => (
                                                                    <SelectItem key={sub} value={sub} className="text-xs">{sub}</SelectItem>
                                                                ))}
                                                            </SelectContent>
                                                        </Select>
                                                    </div>

                                                    <div>
                                                        <Label className="text-[12px] font-bold text-slate-900 uppercase mb-1 block">REFERRAL CHANNEL *</Label>
                                                        <Select onValueChange={(v) => handleSelectChange('referredBy', v)} value={formData.referredBy}>
                                                            <SelectTrigger className="h-8 border-slate-400 rounded-[2px] bg-white text-[12px] font-medium text-slate-900">
                                                                <SelectValue placeholder="How did you hear about us?" />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                <SelectItem value="Direct Website" className="text-xs">Direct Website</SelectItem>
                                                                <SelectItem value="Email Marketing" className="text-xs">Email Marketing</SelectItem>
                                                                <SelectItem value="Social Media" className="text-xs">Social Media</SelectItem>
                                                                <SelectItem value="Search Engine" className="text-xs">Search Engine</SelectItem>
                                                                <SelectItem value="Others" className="text-xs">Others</SelectItem>
                                                            </SelectContent>
                                                        </Select>
                                                    </div>

                                                    <div>
                                                        <Label className="text-[12px] font-bold text-slate-900 uppercase mb-1 block">SPOKEN WITH *</Label>
                                                        <Select onValueChange={(v) => handleSelectChange('spokenWith', v)} value={formData.spokenWith}>
                                                            <SelectTrigger className="h-8 border-slate-400 rounded-[2px] bg-white text-[12px] font-medium text-slate-900">
                                                                <SelectValue placeholder="Select Staff Member" />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                {marketingStaff.map(s => (
                                                                    <SelectItem key={s._id} value={s.username} className="text-xs">{s.username}</SelectItem>
                                                                ))}
                                                                <SelectItem value="Direct" className="text-xs underline font-bold">No One (Directly Booking)</SelectItem>
                                                            </SelectContent>
                                                        </Select>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* -- FINAL BOOKING CONTROL -- */}
                                            <div className="pt-2 border-t border-slate-200">
                                                <div className="flex flex-col gap-4">
                                                    <div className="space-y-3">
                                                        <div className="space-y-2">
                                                            <label className="flex items-start gap-3 p-3 bg-slate-50 border border-slate-200 rounded-sm cursor-pointer group hover:bg-slate-100 transition-all">
                                                                <Checkbox required className="mt-0.5 border-slate-400 peer-checked:bg-[#23471d]" />
                                                                <span className="text-[11px] font-medium text-slate-600 group-hover:text-slate-900 transition-colors leading-relaxed">
                                                                    I hereby confirm that the information provided is accurate. I have read and agree to the <Link to={`/terms-of-service?page=exhibitor-registration&eventId=${selectedEventId}`} className="text-blue-600 font-bold hover:underline" target="_blank">Terms & Conditions</Link> and the exhibition policy for IHWE Stand Booking.
                                                                </span>
                                                            </label>
                                                        </div>

                                                    </div>

                                                    {/* Right: Summary Card (Fills White Space) */}
                                                    <div className="w-full">
                                                        <div className="bg-white border-2 border-slate-100 p-4 rounded-sm shadow-sm">
                                                            <div className="pb-4 border-b border-slate-100 mb-3 flex justify-between items-center">
                                                                <h3 className="text-base font-inter font-bold text-slate-900 tracking-normal uppercase">Booking Summary</h3>
                                                                <span className="px-2 py-0.5 bg-green-50 text-green-600 text-[9px] font-bold uppercase rounded-full border border-green-100">Live Quote</span>
                                                            </div>

                                                            <div className="space-y-3">
                                                                {/* Payment Choice Selector */}
                                                                <div className="p-1 bg-slate-50 border border-slate-200 rounded-sm grid grid-cols-2 gap-1 mb-2">
                                                                    <button
                                                                        type="button"
                                                                        onClick={() => setFormData(prev => ({ ...prev, paymentType: 'full' }))}
                                                                        className={`py-2.5 text-[10px] font-bold uppercase tracking-wider rounded-sm transition-all ${formData.paymentType === 'full' ? 'bg-[#23471d] text-white shadow-md' : 'text-slate-400 hover:text-slate-700 hover:bg-white'}`}
                                                                    >
                                                                        Full Payment
                                                                    </button>
                                                                    <button
                                                                        type="button"
                                                                        onClick={() => setFormData(prev => ({ ...prev, paymentType: 'advance' }))}
                                                                        className={`py-2.5 text-[10px] font-bold uppercase tracking-wider rounded-sm transition-all ${formData.paymentType === 'advance' ? 'bg-[#23471d] text-white shadow-md' : 'text-slate-400 hover:text-slate-700 hover:bg-white'}`}
                                                                    >
                                                                        Pay Advance ({onlineAdvancePercent}%)
                                                                    </button>
                                                                </div>

                                                                <div className="flex items-start gap-4">
                                                                    <div className="w-10 h-10 bg-slate-50 rounded-full flex items-center justify-center text-[#23471d] flex-shrink-0">
                                                                        <MapPin size={18} />
                                                                    </div>
                                                                    <div>
                                                                        <p className="text-[9px] text-slate-400 font-bold uppercase">Selected Stand</p>
                                                                        <p className="text-sm font-bold text-slate-900">Stall {formData.participation.stallFor || 'Not Selected'}</p>
                                                                        <p className="text-[11px] text-slate-500">{formData.participation.stallType} � {formData.participation.stallSize} Sq M.</p>
                                                                    </div>
                                                                </div>

                                                                <div className="bg-slate-50 p-4 space-y-3 rounded-sm">
                                                                    <div className="flex justify-between items-center text-xs">
                                                                        <span className="text-slate-500 font-medium">Space Rental</span>
                                                                        <span className="font-bold text-slate-900">
                                                                            {formData.participation.currency === 'INR' ? '?' : '$'} {Number(formData.participation.rate * formData.participation.stallSize).toLocaleString()}
                                                                        </span>
                                                                    </div>
                                                                    {selectedStall?.incrementPercentage > 0 && (
                                                                        <div className="flex justify-between items-center text-xs text-orange-600">
                                                                            <span className="font-medium">PL Increment ({selectedStall.incrementPercentage}%)</span>
                                                                            <span className="font-bold">+ {formData.participation.currency === 'INR' ? '₹' : '$'} {Number(formData.participation.rate * formData.participation.stallSize * selectedStall.incrementPercentage / 100).toLocaleString()}</span>
                                                                        </div>
                                                                    )}
                                                                    <div className="h-px bg-slate-200 my-2" />
                                                                    <div className="flex justify-between items-center text-xs text-slate-600">
                                                                        <span className="font-medium">GST (18%)</span>
                                                                        <span className="font-bold">+ {formData.participation.currency === 'INR' ? '₹' : '\$'} {Math.round(formData.participation.total - formData.participation.amount).toLocaleString()}</span>
                                                                    </div>
                                                                    <div className="flex justify-between items-center">
                                                                        <span className="text-xs font-bold uppercase text-slate-500">Total Booking Value</span>
                                                                        <span className="text-sm font-bold text-slate-900">
                                                                            {formData.participation.currency === 'INR' ? '₹' : '$'} {Number(formData.participation.total).toLocaleString()}
                                                                        </span>
                                                                    </div>

                                                                    {formData.paymentType === 'advance' && (
                                                                        <div className="flex justify-between items-center pt-2">
                                                                            <span className="text-xs font-bold uppercase text-orange-600">Balance Later</span>
                                                                            <span className="text-sm font-bold text-orange-600">
                                                                                {formData.participation.currency === 'INR' ? '₹' : '$'} {formData.balanceAmount.toLocaleString()}
                                                                            </span>
                                                                        </div>
                                                                    )}
                                                                </div>

                                                                <div className="p-4 bg-[#23471d]/5 border-2 border-[#23471d]/20 rounded-sm">
                                                                    <div className="flex justify-between items-center">
                                                                        <div className="space-y-0.5">
                                                                            <p className="text-[10px] font-bold text-[#23471d] uppercase tracking-widest">{formData.paymentType === 'full' ? 'Net Payable' : 'Advance Payable'}</p>
                                                                            <p className="text-[9px] text-slate-500 font-bold uppercase">Payable right now</p>
                                                                        </div>
                                                                        <div className="text-right">
                                                                            <p className="text-2xl font-bold text-[#23471d]">{formData.participation.currency === 'INR' ? '₹' : '$'} {formData.amountPaid.toLocaleString()}</p>
                                                                        </div>
                                                                    </div>
                                                                </div>

                                                                <div className="pt-2">
                                                                    <p className="text-[10px] text-slate-400 font-medium leading-tight">
                                                                        * Total includes current taxes. Final invoice will be sent to <strong>{formData.contact1.email || 'your email'}</strong> upon successful transaction.
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <button
                                                        type="submit"
                                                        disabled={isLoading || !formData.participation.stallNo}
                                                        className="w-full py-3 bg-[#a37512] hover:bg-[#8b6310] text-white text-sm font-bold uppercase tracking-[0.2em] rounded-sm shadow-xl transition-all active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-3 group"
                                                    >
                                                        {isLoading ? (
                                                            <>
                                                                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                                                PROCESSING...
                                                            </>
                                                        ) : (
                                                            <>
                                                                Proceed for Payment
                                                                <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
                                                            </>
                                                        )}
                                                    </button>
                                                </div>
                                            </div>
                                        </form>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* -- EVENT INFO FOOTER BAR -- */}
                        <div className="w-full bg-[#0072bc] text-white p-4 rounded-sm shadow-xl flex flex-wrap justify-between items-center gap-4" data-aos="fade-up">
                            <div className="flex items-center gap-4 border-r border-[#ffffff33] pr-8 last:border-none last:pr-0">
                                <div className="p-3 bg-white/10 rounded-full"><Calendar size={24} /></div>
                                <div>
                                    <p className="text-[10px] font-bold uppercase tracking-widest text-white/60">DATE</p>
                                    <p className="text-[13px] font-bold">{selectedEvent ? formatDateRange(selectedEvent.startDate, selectedEvent.endDate) : (eventHighlights?.eventDate || "21th-23th March 2026")}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4 border-r border-[#ffffff33] pr-8 last:border-none last:pr-0">
                                <div className="p-3 bg-white/10 rounded-full"><MapPin size={24} /></div>
                                <div>
                                    <p className="text-[10px] font-bold uppercase tracking-widest text-white/60">LOCATION</p>
                                    <p className="text-[13px] font-bold">
                                        {(selectedEvent?.location || selectedEvent?.venue) || (eventHighlights?.venueName || "Pragati Maidan, New Delhi")}
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4 border-r border-[#ffffff33] pr-8 last:border-none last:pr-0">
                                <div className="p-3 bg-white/10 rounded-full"><Send size={24} /></div>
                                <div>
                                    <p className="text-[10px] font-bold uppercase tracking-widest text-white/60">TICKETS</p>
                                    <p className="text-[13px] font-bold">
                                        {(selectedEvent?.ticketsStatus) || (eventHighlights?.ticketsRemaining || "Few Remaining")}
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-white/10 rounded-full"><Mic2 size={24} /></div>
                                <div>
                                    <p className="text-[10px] font-bold uppercase tracking-widest text-white/60">SPEAKERS</p>
                                    <p className="text-[13px] font-bold">
                                        {(selectedEvent?.speakersCount) || (eventHighlights?.speakersCount || "100+ Speakers")}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section >
        </div >
    );
};

export default BookAStand;



