import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
    CheckCircle, 
    Send, ChevronRight, 
    ShieldCheck, 
    CreditCard, 
    Banknote, 
    Lock,
    Mail,
    Smartphone,
    RotateCcw,
    XCircle,
    Info,
    AlertCircle,
    Loader2
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
    verifyApi
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


const sectors = [
    {
        category: "HEALTHCARE & MEDICAL INNOVATIONS",
        options: ["Hospitals & Clinics", "Pharmaceutical Companies", "Medical Equipment & Devices", "Health Insurance Providers"]
    },
    {
        category: "WELLNESS & LIFESTYLE SOLUTIONS",
        options: ["Fitness & Gym Equipment", "Health Retreats & Spas", "Beauty & Personal Care"]
    },
    {
        category: "ALTERNATIVE MEDICINE & HOLISTIC HEALTH",
        options: ["AYUSH & Herbal Medicine", "Yoga & Meditation Centres", "Bio-Energy Products & Bio-Medicine"]
    },
    {
        category: "ORGANIC & SUSTAINABLE LIVING",
        options: ["Organic Farming & Agriculture", "Organic Food & Supplements", "Biological Clothing & Lifestyle Products"]
    },
    {
        category: "DIGITAL HEALTH & EMERGING TECHNOLOGIES",
        options: ["Health & Wellness Apps", "Wearable Health Tech", "Telemedicine & Online Pharmacy Services"]
    },
    {
        category: "CORPORATE & B2B HEALTH SOLUTIONS",
        options: ["Corporate Wellness Programs", "Health & Safety Equipment", "Event & Media Partners"]
    }
];

// Removed static registrationTiers to use dynamic database data

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

const COUNTRIES = [
    "Afghanistan", "Albania", "Algeria", "American Samoa", "Andorra", "Angola", "Anguilla", "Antarctica", "Antigua And Barbuda", "Argentina", "Armenia", "Aruba", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bermuda", "Bhutan", "Bolivia", "Bosnia And Herzegovina", "Botswana", "Bouvet Island", "Brazil", "British Indian Ocean Territory", "Brunei Darussalam", "Bulgaria", "Burkina Faso", "Burundi", "Cambodia", "Cameroon", "Canada", "Cape Verde", "Cayman Islands", "Central African Republic", "Chad", "Chile", "China", "Christmas Island", "Cocos (Keeling) Islands", "Colombia", "Comoros", "Congo", "Congo, The Democratic Republic Of The", "Cook Islands", "Costa Rica", "Cote D'ivoire", "Croatia", "Cuba", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Ethiopia", "Falkland Islands (Malvinas)", "Faroe Islands", "Fiji", "Finland", "France", "French Guiana", "French Polynesia", "French Southern Territories", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Gibraltar", "Greece", "Greenland", "Grenada", "Guadeloupe", "Guam", "Guatemala", "Guinea", "Guinea-bissau", "Guyana", "Haiti", "Heard Island And Mcdonald Islands", "Holy See (Vatican City State)", "Honduras", "Hong Kong", "Hungary", "Iceland", "India", "Indonesia", "Iran, Islamic Republic Of", "Iraq", "Ireland", "Israel", "Italy", "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Korea, Democratic People's Republic Of", "Korea, Republic Of", "Kuwait", "Kyrgyzstan", "Lao People's Democratic Republic", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libyan Arab Jamahiriya", "Liechtenstein", "Lithuania", "Luxembourg", "Macao", "Macedonia, The Former Yugoslav Republic Of", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Martinique", "Mauritania", "Mauritius", "Mayotte", "Mexico", "Micronesia, Federated States Of", "Moldova, Republic Of", "Monaco", "Mongolia", "Montserrat", "Morocco", "Mozambique", "Myanmar", "Namibia", "Nauru", "Nepal", "Netherlands", "Netherlands Antilles", "New Caledonia", "New Zealand", "Nicaragua", "Niger", "Nigeria", "Niue", "Norfolk Island", "Northern Mariana Islands", "Norway", "Oman", "Pakistan", "Palau", "Palestinian Territory, Occupied", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Pitcairn", "Poland", "Portugal", "Puerto Rico", "Qatar", "Reunion", "Romania", "Russian Federation", "Rwanda", "Saint Helena", "Saint Kitts And Nevis", "Saint Lucia", "Saint Pierre And Miquelon", "Saint Vincent And The Grenadines", "Samoa", "San Marino", "Sao Tome And Principe", "Saudi Arabia", "Senegal", "Serbia And Montenegro", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Georgia And The South Sandwich Islands", "Spain", "Sri Lanka", "Sudan", "Suriname", "Svalbard And Jan Mayen", "Swaziland", "Sweden", "Switzerland", "Syrian Arab Republic", "Taiwan, Province Of China", "Tajikistan", "Tanzania, United Republic Of", "Thailand", "Timor-leste", "Togo", "Tokelau", "Tonga", "Trinidad And Tobago", "Tunisia", "Turkey", "Turkmenistan", "Turks And Caicos Islands", "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States", "United States Minor Outlying Islands", "Uruguay", "Uzbekistan", "Vanuatu", "Venezuela", "Viet Nam", "Virgin Islands, British", "Virgin Islands, U.s.", "Wallis And Futuna", "Western Sahara", "Yemen", "Zambia", "Zimbabwe"
];

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
        dimension: '',
        currency: 'INR',
        rate: 0,
        discount: 0,
        amount: 0,
        gstPercent: 18,
        total: 0
    },
    selectedSectors: [] as string[],
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

    const [formData, setFormData] = useState(initialFormData);

    const [onlineAdvancePercent, setOnlineAdvancePercent] = useState(50);

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
                const [hData, eData, employeesRes, staffRes, termsRes] = await Promise.all([
                    heroBackgroundApi.getByPage("Registration / Book A Stand"),
                    eventApi.getActive(),
                    publicApi.getEmployees(),
                    publicApi.getStaff(),
                    termsApi.getByPage("exhibitor-registration")
                ]);

                if (hData) setHeroData(hData);
                if (eData && eData.length > 0) {
                    setEvents(eData);
                    setSelectedEventId(eData[0]._id);
                    setFormData(prev => ({ ...prev, eventId: eData[0]._id, advancePercentage: eData[0].onlineAdvancePercentage }));
                    setOnlineAdvancePercent(eData[0].onlineAdvancePercentage || 50);
                }
                if (employeesRes) setMarketingStaff(employeesRes);
                if (staffRes) setStaff(staffRes);
                if (termsRes) setTermsContent(termsRes);
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
                    stallType: stall.stallType || prev.participation.stallType
                }
            }));
        }
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
                    body: JSON.stringify({ amount: formData.amountPaid })
                });
                const orderData = await orderRes.json();

                const options = {
                    key: RAZORPAY_KEY_ID,
                    amount: orderData.order.amount,
                    currency: "INR",
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
        "text-[11px] font-bold text-slate-800 mb-1.5 block uppercase tracking-[0.05em]";

    return (
        <div className="min-h-screen bg-[#FDFDFD] font-inter text-slate-900">
            {/* ── HERO SECTION - Registration Standard 16:5 ── */}
            <section
                className="hero-background-registration"
                style={{
                    backgroundImage: `url(${heroData?.backgroundImage ? `${SERVER_URL}${heroData.backgroundImage}` : ""})`,
                    backgroundColor: "#1a3516", // Professional fallback
                    aspectRatio: '16 / 5'
                }}
            >
                <div className="absolute inset-0 bg-black/45" />

                <div
                    className="container mx-auto px-4 text-center text-white relative z-10"
                    data-aos="fade-up"
                >
                    <p className="text-sm uppercase tracking-[0.4em] mb-4 opacity-80">
                        {heroData?.title || "Exhibitor Portal"}
                    </p>

                    <h1
                        className="text-4xl md:text-6xl font-serif font-semibold mb-6 italic tracking-tight"
                    >
                        {heroData?.heading || "Book Your Exhibition Stand"}
                    </h1>

                    <p className="text-white/70 text-base md:text-lg mb-8 max-w-xl mx-auto font-light leading-relaxed">
                        {heroData?.shortDescription || "Showcase your innovations to 8,000+ top healthcare professionals. Fill out the form and our team will tailor the perfect space for your brand."}
                    </p>
                </div>
            </section>

            {/* ── MAIN CONTENT ── */}
            <section className="pt-8 pb-24 relative overflow-hidden">
                <div className="container mx-auto px-6 max-w-[1400px]">
                    <div className="space-y-8">

                        {/* ── EXHIBITOR REGISTRATION TABLE ── */}
                        <div className="bg-white border border-slate-200 overflow-hidden shadow-sm" data-aos="fade-up">
                            <div className="bg-slate-50 border-b border-slate-200 px-6 py-4">
                                <h2
                                    className="text-xl font-bold text-slate-900 uppercase tracking-tight flex items-baseline gap-0.5"
                                    style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                                >
                                    {events.find(e => e._id === selectedEventId)?.name || "INTERNATIONAL HEALTH AND WELLNESS EXPO"}
                                </h2>
                                <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">EXHIBITOR REGISTRATION - BOOKING FORM</p>
                            </div>
                        </div>

                        {/* ── REGISTRATION FORM ── */}
                        <div className="w-full">
                            <AnimatePresence mode="wait">
                                {submitted ? (
                                    <motion.div
                                        key="success"
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="min-h-[500px] flex flex-col items-center justify-center text-center p-8 bg-white border border-slate-200 shadow-2xl relative overflow-hidden"
                                    >
                                        {/* Decorative Background Elements */}
                                        <div className="absolute top-0 right-0 w-64 h-64 bg-[#23471d]/5 rounded-full -mr-32 -mt-32 blur-3xl" />
                                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#d26019]/5 rounded-full -ml-32 -mb-32 blur-3xl" />

                                        <div className="relative z-10 space-y-6 max-w-lg">
                                            <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4 border border-green-100 shadow-inner">
                                                <CheckCircle className="text-[#23471d]" size={40} />
                                            </div>
                                            
                                            <div className="space-y-2">
                                                <h2 className="text-3xl font-black text-slate-900 uppercase tracking-tight">Application Received!</h2>
                                                <p className="text-[#d26019] font-black text-[10px] uppercase tracking-[0.3em]">Exhibitor Registration Protocol Complete</p>
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
                                                    <Button className="h-11 px-8 rounded-xl bg-slate-900 hover:bg-black text-[11px] font-black uppercase tracking-widest w-full">
                                                        Return to Home
                                                    </Button>
                                                </Link>
                                                <Button variant="outline" onClick={() => window.print()} className="h-11 px-8 rounded-xl border-slate-200 text-[11px] font-black uppercase tracking-widest text-slate-600 hover:bg-slate-50 w-full">
                                                    Print Application
                                                </Button>
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
                                        className="bg-white border border-slate-300 shadow-2xl overflow-hidden"
                                    >
                                        <div className="bg-slate-50/80 border-b border-slate-200 px-8 py-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                                            <div>
                                                <h2
                                                    className="text-lg font-bold text-slate-900 uppercase"
                                                    style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                                                >
                                                    Exhibition Space Application
                                                </h2>
                                                <p className="text-[10px] text-slate-500 uppercase tracking-[0.2em] mt-0.5 font-bold">Registration Portal</p>
                                            </div>

                                            <div className="w-full md:w-64">
                                                <Label className="text-[9px] font-black text-[#23471d] uppercase mb-1.5 block">Select Exhibition Event *</Label>
                                                <Select onValueChange={(v) => handleSelectChange('eventId', v)} value={selectedEventId}>
                                                    <SelectTrigger className="h-9 rounded-sm border-slate-300 bg-white text-xs font-bold text-slate-900 shadow-sm focus:ring-[#23471d]/20">
                                                        <SelectValue placeholder="Choose Event" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {events.map(ev => (
                                                            <SelectItem key={ev._id} value={ev._id} className="text-xs font-medium uppercase tracking-tight">
                                                                {ev.name} ({new Date(ev.startDate).getFullYear()})
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                        </div>

                                        <form onSubmit={handleSubmit} className="p-8 space-y-8 font-inter">
                                            {/* ── APPLICABLE RATES DISPLAY ── */}
                                            {selectedEventId && allRates.length > 0 && (
                                                <div className="bg-slate-50 border border-slate-200 p-6 rounded-md shadow-sm mb-8">
                                                    <h3 
                                                        className="text-[16px] font-bold text-[#23471d] pb-0.5 border-b border-slate-100 mb-6 flex items-center gap-2"
                                                        style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                                                    >
                                                        <Banknote size={18} /> APPLICABLE STALL RATES
                                                    </h3>
                                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                                        {allRates.map(rate => (
                                                            <div key={rate._id} className="bg-white p-5 rounded-[2px] border border-slate-300 shadow-sm flex flex-col items-center text-center group hover:border-[#23471d] transition-all">
                                                                <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 group-hover:text-[#23471d]">{rate.stallType}</div>
                                                                <div className="text-xl font-bold text-slate-900 leading-tight">
                                                                    {rate.currency === 'INR' ? '₹' : '$'}{rate.ratePerSqm.toLocaleString()}
                                                                </div>
                                                                <div className="text-[9px] text-[#d26019] font-black uppercase tracking-tighter mt-1 italic">/ PER SQ. MT.</div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}

                                            {/* ── EXHIBITOR DETAILS ── */}
                                            <div className="space-y-5">
                                                <h3
                                                    className="text-sm font-black text-[#d26019] uppercase tracking-[0.1em] border-b border-slate-100 pb-2 flex items-center gap-2"
                                                    style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                                                >
                                                    <ShieldCheck size={18} /> Company Profile
                                                </h3>
                                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-5 gap-y-4">
                                                    <div className="lg:col-span-2">
                                                        <Label className={labelClasses}>EXHIBITOR NAME *</Label>
                                                        <Input required name="exhibitorName" value={formData.exhibitorName} onChange={handleInputChange} placeholder="Official Company Name" className={inputClasses} />
                                                    </div>
                                                    <div className="lg:col-span-2">
                                                        <Label className={labelClasses}>FASCIA NAME (NAME ON STALL) *</Label>
                                                        <Input required name="fasciaName" value={formData.fasciaName} onChange={handleInputChange} placeholder="Name to be displayed on stall" className={inputClasses} />
                                                    </div>
                                                    <div>
                                                        <Label className={labelClasses}>TYPE OF BUSINESS *</Label>
                                                        <Select onValueChange={(v) => handleSelectChange('typeOfBusiness', v)} value={formData.typeOfBusiness}>
                                                            <SelectTrigger className={inputClasses}>
                                                                <SelectValue placeholder="Select Business Type" />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                {BUSINESS_TYPES.map(type => (
                                                                    <SelectItem key={type} value={type} className="text-[11px] font-medium">{type}</SelectItem>
                                                                ))}
                                                            </SelectContent>
                                                        </Select>
                                                    </div>
                                                    <div>
                                                        <Label className={labelClasses}>NATURE OF BUSINESS *</Label>
                                                        <Select onValueChange={(v) => handleSelectChange('natureOfBusiness', v)} value={formData.natureOfBusiness}>
                                                            <SelectTrigger className={inputClasses}>
                                                                <SelectValue placeholder="Select Nature" />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                {NATURE_OF_BUSINESS.map(nature => (
                                                                    <SelectItem key={nature} value={nature} className="text-[11px] font-medium">{nature}</SelectItem>
                                                                ))}
                                                            </SelectContent>
                                                        </Select>
                                                    </div>
                                                    <div>
                                                        <Label className={labelClasses}>MAIN SECTOR *</Label>
                                                        <Select onValueChange={(v) => handleSelectChange('industrySector', v)} value={formData.industrySector}>
                                                            <SelectTrigger className={inputClasses}>
                                                                <SelectValue placeholder="Select Sector" />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                {INDUSTRY_SECTORS.map(s => (
                                                                    <SelectItem key={s} value={s} className="text-[11px] font-medium">{s}</SelectItem>
                                                                ))}
                                                            </SelectContent>
                                                        </Select>
                                                    </div>
                                                    <div>
                                                        <Label className={labelClasses}>WEBSITE *</Label>
                                                        <Input required name="website" value={formData.website} onChange={handleInputChange} placeholder="www.example.com" className={inputClasses} />
                                                    </div>
                                                    <div className="lg:col-span-2">
                                                        <Label className={labelClasses}>EXHIBITOR ADDRESS *</Label>
                                                        <Input required name="address" value={formData.address} onChange={handleInputChange} placeholder="Full Registered Address" className={inputClasses} />
                                                    </div>
                                                    <div>
                                                        <Label className={labelClasses}>COUNTRY *</Label>
                                                        <Select onValueChange={(v) => handleSelectChange('country', v)} value={formData.country}>
                                                            <SelectTrigger className={inputClasses}>
                                                                <SelectValue placeholder="Select Country" />
                                                            </SelectTrigger>
                                                            <SelectContent className="max-h-[300px]">
                                                                {COUNTRIES.map(country => (
                                                                    <SelectItem key={country} value={country} className="text-[11px] font-medium">{country}</SelectItem>
                                                                ))}
                                                            </SelectContent>
                                                        </Select>
                                                    </div>
                                                    <div>
                                                        <Label className={labelClasses}>STATE *</Label>
                                                        <Input required name="state" value={formData.state} onChange={handleInputChange} placeholder="State/Province" className={inputClasses} />
                                                    </div>
                                                    <div>
                                                        <Label className={labelClasses}>CITY *</Label>
                                                        <Input required name="city" value={formData.city} onChange={handleInputChange} placeholder="Town/City" className={inputClasses} />
                                                    </div>
                                                    <div>
                                                        <Label className={labelClasses}>PINCODE *</Label>
                                                        <Input required name="pincode" value={formData.pincode} onChange={handleInputChange} placeholder="Postal Code" className={inputClasses} />
                                                    </div>
                                                    <div>
                                                        <Label className={labelClasses}>LANDLINE NO (OFFICE)</Label>
                                                        <Input name="landlineNo" value={formData.landlineNo} onChange={handleInputChange} placeholder="e.g. 011-XXXXXXXX" className={inputClasses} />
                                                    </div>
                                                    <div>
                                                        <Label className={labelClasses}>GSTIN / TAX ID *</Label>
                                                        <Input required name="gstNo" value={formData.gstNo} onChange={handleInputChange} placeholder="GST Number" className={inputClasses} />
                                                    </div>
                                                    <div>
                                                        <Label className={labelClasses}>PAN CARD NO. *</Label>
                                                        <Input required name="panNo" value={formData.panNo} onChange={handleInputChange} placeholder="PAN No" className={inputClasses} />
                                                    </div>
                                                </div>
                                            </div>

                                            {/* ── CONTACT INFORMATION ── */}
                                            <div className="space-y-6 pt-4 border-t border-slate-100">
                                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                                    {/* Primary Contact */}
                                                    <div className="space-y-4" id="liaison-officer-section">
                                                        <h3 className="text-sm font-black text-[#23471d] uppercase tracking-[0.1em] flex items-center gap-2">
                                                            <CheckCircle size={16} /> Primary Liaison Officer
                                                        </h3>
                                                        <div className="bg-slate-50/50 p-5 border border-slate-100 space-y-4">
                                                            <div className="grid grid-cols-2 gap-4">
                                                                <div>
                                                                    <Label className={labelClasses}>Title *</Label>
                                                                    <Select onValueChange={(v) => handleSelectChange('contact1.title', v)} value={formData.contact1.title}>
                                                                        <SelectTrigger className={inputClasses}><SelectValue placeholder="Title" /></SelectTrigger>
                                                                        <SelectContent>
                                                                            <SelectItem value="Mr.">Mr.</SelectItem>
                                                                            <SelectItem value="Ms.">Ms.</SelectItem>
                                                                            <SelectItem value="Dr.">Dr.</SelectItem>
                                                                            <SelectItem value="Prof.">Prof.</SelectItem>
                                                                        </SelectContent>
                                                                    </Select>
                                                                </div>
                                                                <div>
                                                                    <Label className={labelClasses}>Designation *</Label>
                                                                    <Input required name="contact1.designation" value={formData.contact1.designation} onChange={handleInputChange} placeholder="e.g. Director" className={inputClasses} />
                                                                </div>
                                                                <div>
                                                                    <Label className={labelClasses}>First Name *</Label>
                                                                    <Input required name="contact1.firstName" value={formData.contact1.firstName} onChange={handleInputChange} placeholder="First Name" className={inputClasses} />
                                                                </div>
                                                                <div>
                                                                    <Label className={labelClasses}>Last Name *</Label>
                                                                    <Input required name="contact1.lastName" value={formData.contact1.lastName} onChange={handleInputChange} placeholder="Last Name" className={inputClasses} />
                                                                </div>
                                                                
                                                                {/* Email & OTP */}
                                                                <div className="col-span-2 space-y-2">
                                                                    <Label className={labelClasses}>Official Email *</Label>
                                                                    <div className="flex gap-2">
                                                                        <div className="relative flex-1">
                                                                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={12} />
                                                                            <Input 
                                                                                required 
                                                                                type="email" 
                                                                                name="contact1.email" 
                                                                                value={formData.contact1.email} 
                                                                                onChange={handleInputChange} 
                                                                                placeholder="email@company.com" 
                                                                                className={`${inputClasses} pl-8 ${emailVerified ? 'border-green-500 bg-green-50/30' : ''}`}
                                                                                readOnly={emailVerified}
                                                                            />
                                                                            {emailVerified && <CheckCircle className="absolute right-3 top-1/2 -translate-y-1/2 text-green-600" size={14} />}
                                                                        </div>
                                                                        {!emailVerified && (
                                                                            <Button 
                                                                                type="button"
                                                                                onClick={handleSendEmailOtp}
                                                                                disabled={isEmailLoading || emailTimer > 0 || !formData.contact1.email}
                                                                                className="h-8 bg-[#23471d] hover:bg-[#1a3516] text-[10px] font-bold uppercase px-4 rounded-sm transition-all"
                                                                            >
                                                                                {isEmailLoading ? <Loader2 className="animate-spin" size={14} /> : (emailTimer > 0 ? `Resend (${emailTimer}s)` : "Send OTP")}
                                                                            </Button>
                                                                        )}
                                                                    </div>

                                                                    <AnimatePresence>
                                                                        {emailTimer > 0 && !emailVerified && (
                                                                            <motion.div 
                                                                                initial={{ opacity: 0, height: 0 }}
                                                                                animate={{ opacity: 1, height: 'auto' }}
                                                                                exit={{ opacity: 0, height: 0 }}
                                                                                className="flex gap-2 pt-1"
                                                                            >
                                                                                <Input 
                                                                                    placeholder="Enter Email OTP" 
                                                                                    value={emailOtp}
                                                                                    onChange={(e) => setEmailOtp(e.target.value)}
                                                                                    className={inputClasses}
                                                                                    maxLength={6}
                                                                                    autoComplete="off"
                                                                                    name="exhibitor-email-otp-field"
                                                                                    inputMode="numeric"
                                                                                />
                                                                                <Button 
                                                                                    type="button"
                                                                                    onClick={handleVerifyEmailOtp}
                                                                                    disabled={isEmailLoading || emailOtp.length < 6}
                                                                                    className="h-8 bg-[#d26019] hover:bg-[#b85415] text-[10px] font-bold uppercase px-4 rounded-sm transition-all text-white border-none shadow-sm"
                                                                                >
                                                                                    {isEmailLoading ? <Loader2 className="animate-spin" size={14} /> : "Verify"}
                                                                                </Button>
                                                                            </motion.div>
                                                                        )}
                                                                    </AnimatePresence>
                                                                </div>

                                                                {/* Mobile & OTP */}
                                                                <div className="col-span-2 space-y-2">
                                                                    <Label className={labelClasses}>Mobile Number *</Label>
                                                                    <div className="flex gap-2">
                                                                        <div className="relative flex-1">
                                                                            <Smartphone className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={12} />
                                                                            <Input 
                                                                                required 
                                                                                name="contact1.mobile" 
                                                                                value={formData.contact1.mobile} 
                                                                                onChange={handleInputChange} 
                                                                                placeholder="+91 XXXXXXXXXX" 
                                                                                className={`${inputClasses} pl-8 ${phoneVerified ? 'border-green-500 bg-green-50/30' : ''}`}
                                                                                readOnly={phoneVerified}
                                                                            />
                                                                            {phoneVerified && <CheckCircle className="absolute right-3 top-1/2 -translate-y-1/2 text-green-600" size={14} />}
                                                                        </div>
                                                                        {!phoneVerified && (
                                                                            <Button 
                                                                                type="button"
                                                                                onClick={handleSendPhoneOtp}
                                                                                disabled={isPhoneLoading || phoneTimer > 0 || !formData.contact1.mobile}
                                                                                className="h-8 bg-[#25D366] hover:bg-[#128C7E] text-[10px] font-bold uppercase px-4 rounded-sm transition-all text-white border-none shadow-sm font-inter"
                                                                            >
                                                                                {isPhoneLoading ? <Loader2 className="animate-spin" size={14} /> : (phoneTimer > 0 ? `Resend (${phoneTimer}s)` : "Verify via WhatsApp")}
                                                                            </Button>
                                                                        )}
                                                                    </div>

                                                                    <AnimatePresence>
                                                                        {phoneTimer > 0 && !phoneVerified && (
                                                                            <motion.div 
                                                                                initial={{ opacity: 0, height: 0 }}
                                                                                animate={{ opacity: 1, height: 'auto' }}
                                                                                exit={{ opacity: 0, height: 0 }}
                                                                                className="flex gap-2 pt-1"
                                                                            >
                                                                                <Input 
                                                                                    placeholder="Enter WhatsApp OTP" 
                                                                                    value={phoneOtp}
                                                                                    onChange={(e) => setPhoneOtp(e.target.value)}
                                                                                    className={inputClasses}
                                                                                    maxLength={6}
                                                                                    autoComplete="off"
                                                                                    name="exhibitor-phone-otp-field"
                                                                                    inputMode="numeric"
                                                                                />
                                                                                <Button 
                                                                                    type="button"
                                                                                    onClick={handleVerifyPhoneOtp}
                                                                                    disabled={isPhoneLoading || phoneOtp.length < 6}
                                                                                    className="h-8 bg-[#d26019] hover:bg-[#b85415] text-[10px] font-bold uppercase px-4 rounded-sm transition-all text-white border-none shadow-sm"
                                                                                >
                                                                                    {isPhoneLoading ? <Loader2 className="animate-spin" size={14} /> : "Verify"}
                                                                                </Button>
                                                                            </motion.div>
                                                                        )}
                                                                    </AnimatePresence>
                                                                </div>

                                                                <div className="col-span-2">
                                                                    <Label className={labelClasses}>Alternate Contact No.</Label>
                                                                    <Input name="contact1.alternateNo" value={formData.contact1.alternateNo} onChange={handleInputChange} placeholder="Secondary mobile or landline" className={inputClasses} />
                                                                </div>
                                                            </div>

                                                            {/* Verification Error Alert */}
                                                            <AnimatePresence>
                                                                {verificationError && (
                                                                    <motion.div 
                                                                        initial={{ opacity: 0, y: -10 }}
                                                                        animate={{ opacity: 1, y: 0 }}
                                                                        exit={{ opacity: 0, y: -10 }}
                                                                        className="p-3 bg-red-50 border border-red-200 rounded-sm flex items-center gap-3 text-red-600 text-[11px] font-bold uppercase tracking-tight"
                                                                    >
                                                                        <AlertCircle size={14} />
                                                                        {verificationError}
                                                                        <button 
                                                                            type="button"
                                                                            onClick={() => setVerificationError(null)}
                                                                            className="ml-auto text-red-400 hover:text-red-600"
                                                                        >
                                                                            <RotateCcw size={12} />
                                                                        </button>
                                                                    </motion.div>
                                                                )}
                                                            </AnimatePresence>

                                                            {(emailVerified && phoneVerified) && (
                                                                <div className="p-3 bg-green-50 border border-green-200 rounded-sm flex items-center gap-3 text-green-700 text-[11px] font-bold uppercase tracking-tight">
                                                                    <ShieldCheck size={14} />
                                                                    Identity Verified Successfully
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>

                                                    {/* Secondary Contact */}
                                                    <div className="space-y-4">
                                                        <h3 className="text-sm font-black text-slate-400 uppercase tracking-[0.1em] flex items-center gap-2">
                                                            <CheckCircle size={16} /> Secondary Correspondent (Optional)
                                                        </h3>
                                                        <div className="grid grid-cols-2 gap-4 bg-slate-50/10 p-5 border border-slate-100 border-dashed">
                                                            <div>
                                                                <Label className={labelClasses}>Title</Label>
                                                                <Select onValueChange={(v) => handleSelectChange('contact2.title', v)} value={formData.contact2.title}>
                                                                    <SelectTrigger className={inputClasses}><SelectValue placeholder="Title" /></SelectTrigger>
                                                                    <SelectContent>
                                                                        <SelectItem value="Mr.">Mr.</SelectItem>
                                                                        <SelectItem value="Ms.">Ms.</SelectItem>
                                                                        <SelectItem value="Dr.">Dr.</SelectItem>
                                                                    </SelectContent>
                                                                </Select>
                                                            </div>
                                                            <div>
                                                                <Label className={labelClasses}>Designation</Label>
                                                                <Input name="contact2.designation" value={formData.contact2.designation} onChange={handleInputChange} placeholder="Designation" className={inputClasses} />
                                                            </div>
                                                            <div>
                                                                <Label className={labelClasses}>First Name</Label>
                                                                <Input name="contact2.firstName" value={formData.contact2.firstName} onChange={handleInputChange} placeholder="First Name" className={inputClasses} />
                                                            </div>
                                                            <div>
                                                                <Label className={labelClasses}>Last Name</Label>
                                                                <Input name="contact2.lastName" value={formData.contact2.lastName} onChange={handleInputChange} placeholder="Last Name" className={inputClasses} />
                                                            </div>
                                                            <div>
                                                                <Label className={labelClasses}>Official Email</Label>
                                                                <Input type="email" name="contact2.email" value={formData.contact2.email} onChange={handleInputChange} placeholder="email@company.com" className={inputClasses} />
                                                            </div>
                                                            <div>
                                                                <Label className={labelClasses}>Mobile Number</Label>
                                                                <Input name="contact2.mobile" value={formData.contact2.mobile} onChange={handleInputChange} placeholder="+91 XXXXXXXXXX" className={inputClasses} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* ── INDUSTRY SECTORS CHECKBOX ── */}
                                            <div className="space-y-4 pt-4 border-t border-slate-100">
                                                <h3 className="text-sm font-black text-[#23471d] uppercase tracking-[0.1em] flex items-center gap-2">
                                                    <ShieldCheck size={16} /> Interested Business Sectors
                                                </h3>
                                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 bg-slate-50/30 p-8 border border-slate-200">
                                                    {sectors.map((cat, cIdx) => (
                                                        <div key={cIdx} className="space-y-3">
                                                            <h4 className="text-[10px] font-black text-slate-800 uppercase tracking-widest border-b border-slate-200 pb-1">{cat.category}</h4>
                                                            <div className="space-y-2">
                                                                {cat.options.map((opt, oIdx) => (
                                                                    <div key={oIdx} className="flex items-center space-x-2">
                                                                        <Checkbox
                                                                            id={`sector-${cIdx}-${oIdx}`}
                                                                            checked={formData.selectedSectors.includes(opt)}
                                                                            onCheckedChange={() => handleSectorToggle(opt)}
                                                                            className="border-slate-300 data-[state=checked]:bg-[#23471d]"
                                                                        />
                                                                        <label htmlFor={`sector-${cIdx}-${oIdx}`} className="text-[11px] font-bold text-slate-600 cursor-pointer hover:text-slate-900 transition-colors">{opt}</label>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>

                                            {/* ── PARTICIPATION DETAILS ── */}
                                            <div className="space-y-6 pt-4">
                                                <h3
                                                    className="text-sm font-bold text-[#d26019] uppercase tracking-[0.05em] border-b border-slate-100 pb-1.5 flex items-center gap-2"
                                                    style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                                                >
                                                    <CheckCircle size={16} /> Participation & Space Details
                                                </h3>

                                                <div className="bg-slate-50/50 border border-slate-200 p-6 rounded-[2px] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                                    <div className="lg:col-span-2">
                                                        <Label className={labelClasses}>SELECT STALL FROM AVAILABLE LIST *</Label>
                                                        <Select onValueChange={handleStallChange} value={formData.participation.stallNo}>
                                                            <SelectTrigger className="h-10 rounded-sm border-slate-400 bg-white font-black text-[#23471d]">
                                                                <SelectValue placeholder="-- Click to Choose Stall --" />
                                                            </SelectTrigger>
                                                            <SelectContent className="max-h-[300px]">
                                                                {availableStalls.filter(s => 
                                                                    (typeof s.eventId === 'string' ? s.eventId === selectedEventId : s.eventId?._id === selectedEventId) || 
                                                                    (typeof s.event === 'string' ? s.event === selectedEventId : s.event?._id === selectedEventId)
                                                                ).length === 0 ? (
                                                                    <p className="p-4 text-center text-xs text-slate-400 italic">No stalls available for this event</p>
                                                                ) : (
                                                                    availableStalls.filter(s => 
                                                                        (typeof s.eventId === 'string' ? s.eventId === selectedEventId : s.eventId?._id === selectedEventId) || 
                                                                        (typeof s.event === 'string' ? s.event === selectedEventId : s.event?._id === selectedEventId)
                                                                    ).map(s => (
                                                                        <SelectItem key={s._id} value={s._id} className="text-xs font-bold">
                                                                            Stall {s.stallNumber} ({s.area} sqm - {s.length}x{s.width}m) - {s.plScheme}
                                                                        </SelectItem>
                                                                    ))
                                                                )}
                                                            </SelectContent>
                                                        </Select>
                                                    </div>

                                                    <div>
                                                        <Label className={labelClasses}>CURRENCY *</Label>
                                                        <Select onValueChange={(v) => handleSelectChange('participation.currency', v)} value={formData.participation.currency}>
                                                            <SelectTrigger className={inputClasses}>
                                                                <SelectValue />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                <SelectItem value="INR" className="text-xs font-bold">INR (₹)</SelectItem>
                                                                <SelectItem value="USD" className="text-xs font-bold">USD ($)</SelectItem>
                                                            </SelectContent>
                                                        </Select>
                                                    </div>

                                                    <div>
                                                        <Label className={labelClasses}>STALL TYPE *</Label>
                                                        <Select onValueChange={(v) => handleSelectChange('participation.stallType', v)} value={formData.participation.stallType}>
                                                            <SelectTrigger className={inputClasses}>
                                                                <SelectValue />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                <SelectItem value="Shell Space" className="text-xs font-bold uppercase">Shell Space</SelectItem>
                                                                <SelectItem value="Raw Space" className="text-xs font-bold uppercase">Raw Space</SelectItem>
                                                            </SelectContent>
                                                        </Select>
                                                    </div>

                                                    <div className="col-span-1">
                                                        <Label className={labelClasses}>RATE (PER SQ MT)</Label>
                                                        <div className="h-8 bg-slate-100 flex items-center px-4 text-xs font-black text-slate-700 border border-slate-300">
                                                            {formData.participation.currency === 'INR' ? '₹' : '$'} {formData.participation.rate || 0}
                                                        </div>
                                                    </div>

                                                    <div className="col-span-1">
                                                        <Label className={labelClasses}>TOTAL AREA (SQM)</Label>
                                                        <div className="h-8 bg-slate-100 flex items-center px-4 text-xs font-black text-[#d26019] border border-slate-300">
                                                            {formData.participation.stallSize || 0} SQ M.
                                                        </div>
                                                    </div>

                                                    <div className="col-span-1">
                                                        <Label className={labelClasses}>DIMENSIONS</Label>
                                                        <div className="h-8 bg-slate-100 flex items-center px-4 text-xs font-bold text-slate-500 border border-slate-300">
                                                            {formData.participation.dimension || "0x0m"}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* ── SETTLEMENT & BOOKING CONTROL ── */}
                                            <div className="pt-6">
                                                <div className="bg-white rounded-[2.5rem] overflow-hidden shadow-2xl shadow-slate-200/50 relative border border-slate-100">

                                                    <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12">

                                                        {/* ── LEFT: BOOKING SUMMARY ── */}
                                                        <div className="lg:col-span-5 p-7 border-b lg:border-b-0 lg:border-r border-slate-100 flex flex-col justify-between bg-white">
                                                            <div className="space-y-6">
                                                                <div>
                                                                    <div className="flex items-center gap-3 mb-2">
                                                                        <div className="w-6 h-px bg-[#d26019]"></div>
                                                                        <h4 className="text-[10px] font-black text-[#d26019] uppercase tracking-[0.4em]">Review Details</h4>
                                                                    </div>
                                                                    <h3 className="text-[18px] font-bold text-slate-900 leading-tight" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Order Overview</h3>
                                                                </div>

                                                                <div className="space-y-6 bg-slate-50/50 p-6 border border-slate-200 rounded-[2px]">
                                                                    {/* Stall Detail Row */}
                                                                    <div className="flex justify-between items-end group">
                                                                        <div className="space-y-1.5">
                                                                            <p className="text-[10px] text-[#23471d] font-black uppercase tracking-[0.2em]">Stall Selection</p>
                                                                            <h3 className="text-2xl font-black text-slate-900 leading-none tracking-tight">
                                                                                {formData.participation.stallFor || "Not Selected"}
                                                                            </h3>
                                                                        </div>
                                                                        <div className="text-right">
                                                                            <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">Area</p>
                                                                            <p className="text-lg font-black text-slate-700">{formData.participation.stallSize} SQM</p>
                                                                        </div>
                                                                    </div>

                                                                    {/* Cost Breakdown Section */}
                                                                    <div className="pt-6 border-t border-slate-200 space-y-4">
                                                                        {(() => {
                                                                            const stall = availableStalls.find(s => s._id === formData.participation.stallNo);
                                                                            const inc = stall?.incrementPercentage || 0;
                                                                            const disc = stall?.discountPercentage || 0;
                                                                            const baseValue = (Number(formData.participation.stallSize) || 0) * (Number(formData.participation.rate) || 0);
                                                                            const incValue = baseValue * (inc / 100);
                                                                            const discValue = (baseValue + incValue) * (disc / 100);

                                                                            return (
                                                                                <>
                                                                                    {inc > 0 && (
                                                                                        <div className="flex justify-between text-[11px] font-bold text-red-600">
                                                                                            <span>Stall Increment (+{inc}%)</span>
                                                                                            <span className="text-red-700">+{formData.participation.currency === 'INR' ? '₹' : '$'} {Math.round(incValue).toLocaleString()}</span>
                                                                                        </div>
                                                                                    )}
                                                                                    {disc > 0 && (
                                                                                        <div className="flex justify-between text-[11px] font-bold text-emerald-600">
                                                                                            <span>Stall Discount (-{disc}%)</span>
                                                                                            <span className="text-emerald-700">-{formData.participation.currency === 'INR' ? '₹' : '$'} {Math.round(discValue).toLocaleString()}</span>
                                                                                        </div>
                                                                                    )}
                                                                                </>
                                                                            );
                                                                        })()}
                                                                        <div className="flex justify-between text-[11px] font-bold text-slate-500">
                                                                            <span>Sub-Total (Net Rate)</span>
                                                                            <span className="text-slate-900">{formData.participation.currency === 'INR' ? '₹' : '$'} {formData.participation.amount.toLocaleString()}</span>
                                                                        </div>
                                                                        <div className="flex justify-between text-[11px] font-bold text-slate-500">
                                                                            <span>GST (18% Statutory)</span>
                                                                            <span className="text-slate-900">{formData.participation.currency === 'INR' ? '₹' : '$'} {Math.round(formData.participation.total - formData.participation.amount).toLocaleString()}</span>
                                                                        </div>
                                                                        
                                                                        <div className="pt-6 mt-2 border-t border-slate-200 flex justify-between items-center">
                                                                            <div className="flex flex-col">
                                                                                <span className="text-[10px] font-black text-[#23471d] uppercase tracking-[0.2em] mb-1">Total Value</span>
                                                                                <p className="text-[8px] text-slate-400 font-bold uppercase tracking-widest italic leading-none">Inclusive of all taxes</p>
                                                                            </div>
                                                                            <div className="text-right">
                                                                                <span className="text-3xl font-black text-slate-900 tracking-tighter">{formData.participation.currency === 'INR' ? '₹' : '$'} {formData.participation.total.toLocaleString()}</span>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            {/* Bottom Badge */}
                                                            <div className="mt-6 pt-5 border-t border-slate-200/60 flex items-center gap-4">
                                                                <div className="w-9 h-9 border border-slate-200 rounded-full flex items-center justify-center text-[#d26019]">
                                                                    <ShieldCheck size={18} />
                                                                </div>
                                                                <div>
                                                                    <p className="text-[9px] font-black text-slate-900 uppercase tracking-widest">Certified Exhibitor</p>
                                                                    <p className="text-[8px] text-slate-400 font-medium">IHWE-2026-REG</p>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        {/* ── RIGHT: PAYMENT & CONTROLS ── */}
                                                        <div className="lg:col-span-7 p-6 lg:p-7 flex flex-col justify-between">
                                                            <div className="space-y-7">
                                                                {/* Deployment Source */}
                                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                                                                        <div className="space-y-1.5">
                                                                            <Label className="text-[9px] font-black text-[#d26019] uppercase tracking-[0.2em] block">Referral Channel *</Label>
                                                                            <Select onValueChange={(v) => handleSelectChange('referredBy', v)} value={formData.referredBy}>
                                                                                <SelectTrigger className="h-9 rounded-[2px] border-slate-300 bg-white text-slate-900 text-[11px] font-bold focus:ring-[#d26019]/20 hover:bg-slate-50 transition-all">
                                                                                    <SelectValue placeholder="Select Platform" />
                                                                                </SelectTrigger>
                                                                                <SelectContent className="bg-white border-slate-200 text-slate-900">
                                                                                    <SelectItem value="Direct Website">Direct Website</SelectItem>
                                                                                    <SelectItem value="Email Marketing">Email Marketing</SelectItem>
                                                                                    <SelectItem value="Social Media">Social Media</SelectItem>
                                                                                    {Array.isArray(marketingStaff) && marketingStaff.map((staff: any) => (
                                                                                        <SelectItem key={staff._id} value={staff.username}>Staff: {staff.username}</SelectItem>
                                                                                    ))}
                                                                                </SelectContent>
                                                                            </Select>
                                                                        </div>

                                                                        <div className="space-y-1.5">
                                                                            <Label className="text-[9px] font-black text-[#d26019] uppercase tracking-[0.2em] block">Spoken With *</Label>
                                                                            <Select onValueChange={(v) => handleSelectChange('spokenWith', v)} value={formData.spokenWith}>
                                                                                <SelectTrigger className="h-9 rounded-[2px] border-slate-300 bg-white text-slate-900 text-[11px] font-bold focus:ring-[#d26019]/20 hover:bg-slate-50 transition-all">
                                                                                    <SelectValue placeholder="Select Team Member" />
                                                                                </SelectTrigger>
                                                                                <SelectContent className="bg-white border-slate-200 text-slate-900">
                                                                                    <SelectItem value="None">None / Direct</SelectItem>
                                                                                    {Array.isArray(staff) && staff.map((s: any) => (
                                                                                        <SelectItem key={s._id} value={s.username}>{s.username}</SelectItem>
                                                                                    ))}
                                                                                </SelectContent>
                                                                            </Select>
                                                                        </div>

                                                                        <div className="space-y-1.5 col-span-1 md:col-span-2">
                                                                            <Label className="text-[9px] font-black text-[#d26019] uppercase tracking-[0.2em] block">Agreement *</Label>
                                                                            <label
                                                                                htmlFor="terms-check"
                                                                                className="h-9 flex items-center gap-3 px-4 bg-white border border-slate-300 rounded-[2px] cursor-pointer hover:bg-slate-50 transition-all"
                                                                            >
                                                                                <Checkbox
                                                                                    id="terms-check"
                                                                                    required
                                                                                    className="border-slate-300 data-[state=checked]:bg-[#d26019] data-[state=checked]:border-[#d26019]"
                                                                                />
                                                                                <span className="text-[10px] font-bold text-slate-700 uppercase">
                                                                                    I accept <Link to={`/terms-of-service?page=exhibitor-registration&eventId=${selectedEventId}`} target="_blank" className="text-[#d26019] hover:text-[#23471d] underline transition-colors" onClick={(e) => e.stopPropagation()}>Terms & Conditions</Link>
                                                                                </span>
                                                                            </label>
                                                                        </div>
                                                                    </div>

                                                                {/* Payment Schedule Selector */}
                                                                <div className="space-y-4">
                                                                    <div className="flex justify-between items-baseline">
                                                                        <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Payment Schedule</h4>
                                                                        <p className="text-[8px] text-[#23471d] font-black uppercase tracking-tighter italic">Recommended: Full</p>
                                                                    </div>
                                                                    <div className="grid grid-cols-2 gap-4">
                                                                        <button
                                                                            type="button"
                                                                            onClick={() => handleSelectChange('paymentType', 'full')}
                                                                            className={`relative overflow-hidden group px-6 py-6 rounded-[2px] border-2 transition-all duration-300 text-left ${formData.paymentType === 'full' ? 'border-[#23471d] bg-white shadow-lg' : 'border-slate-300 bg-white hover:border-slate-400'}`}
                                                                        >
                                                                            <div className="relative z-10">
                                                                                <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-3 transition-transform group-hover:scale-110 ${formData.paymentType === 'full' ? 'bg-[#23471d] text-white' : 'bg-slate-100 text-slate-400 border border-slate-200'}`}>
                                                                                    <CreditCard size={14} />
                                                                                </div>
                                                                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-0.5 group-hover:text-[#23471d]">Full Payment</p>
                                                                                <p className="text-[15px] font-bold text-slate-900 leading-tight">100% Secure</p>
                                                                            </div>
                                                                        </button>
                                                                        <button
                                                                            type="button"
                                                                            onClick={() => handleSelectChange('paymentType', 'advance')}
                                                                            className={`relative overflow-hidden group px-6 py-6 rounded-[2px] border-2 transition-all duration-300 text-left ${formData.paymentType === 'advance' ? 'border-[#23471d] bg-white shadow-lg' : 'border-slate-300 bg-white hover:border-slate-400'}`}
                                                                        >
                                                                            <div className="relative z-10">
                                                                                <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-3 transition-transform group-hover:scale-110 ${formData.paymentType === 'advance' ? 'bg-[#23471d] text-white' : 'bg-slate-100 text-slate-400 border border-slate-200'}`}>
                                                                                    <Banknote size={14} />
                                                                                </div>
                                                                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-0.5 group-hover:text-[#23471d]">Advance Token</p>
                                                                                <p className="text-[15px] font-bold text-slate-900 leading-tight">{onlineAdvancePercent}% Deposit</p>
                                                                            </div>
                                                                        </button>
                                                                    </div>
                                                                </div>

                                                                {/* Final Call to Action */}
                                                                <div className="pt-2 space-y-5">
                                                                    <div className="flex justify-between items-center py-5 border-y border-slate-100">
                                                                        <div className="space-y-0.5">
                                                                            <p className="text-[9px] text-slate-400 font-black uppercase tracking-widest">Amount to Pay Now</p>
                                                                            <div className="flex items-baseline gap-1.5">
                                                                                <span className="text-lg font-medium text-[#d26019]">{formData.participation.currency === 'INR' ? '₹' : '$'}</span>
                                                                                <span className="text-4xl font-black text-slate-900 tracking-tighter">{formData.amountPaid.toLocaleString()}</span>
                                                                            </div>
                                                                        </div>
                                                                        {formData.paymentType === 'advance' && (
                                                                            <div className="text-right">
                                                                                <p className="text-[10px] text-white/30 font-black uppercase tracking-widest">Deferred Balance</p>
                                                                                <p className="text-lg font-black text-white/50">{formData.participation.currency === 'INR' ? '₹' : '$'} {(formData.participation.total - formData.amountPaid).toLocaleString()}</p>
                                                                            </div>
                                                                        )}
                                                                    </div>

                                                                    <button
                                                                        type="submit"
                                                                        disabled={isLoading || !formData.participation.stallNo || !emailVerified || !phoneVerified}
                                                                        className="group relative w-full h-14 rounded-[2px] bg-slate-900 text-white font-bold text-[13px] uppercase tracking-[0.2em] shadow-xl hover:bg-black transition-all duration-300 disabled:opacity-50 disabled:grayscale overflow-hidden"
                                                                    >
                                                                        <div className="relative z-10 flex items-center justify-center gap-3">
                                                                            {isLoading ? "Synchronizing Secure Server..." : (
                                                                                <>
                                                                                    <span>Confirm & Initialize Payment</span>
                                                                                    <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
                                                                                </>
                                                                            )}
                                                                        </div>
                                                                    </button>

                                                                    <div className="flex justify-center items-center gap-6 text-slate-400">
                                                                        <div className="flex flex-col items-center gap-1.5 opacity-60 hover:opacity-100 transition-opacity">
                                                                            <Lock size={14} />
                                                                            <span className="text-[7px] font-black uppercase tracking-widest text-center">AES-256 <br />Secure</span>
                                                                        </div>
                                                                        <div className="h-6 w-px bg-slate-200" />
                                                                        <div className="flex flex-col items-center gap-1.5 opacity-60 hover:opacity-100 transition-opacity">
                                                                            <ShieldCheck size={14} />
                                                                            <span className="text-[7px] font-black uppercase tracking-widest text-center">RBI <br />Compliant</span>
                                                                        </div>
                                                                        <div className="h-6 w-px bg-slate-200" />
                                                                        <div className="flex flex-col items-center gap-1.5 opacity-60 hover:opacity-100 transition-opacity">
                                                                            <Banknote size={14} />
                                                                            <span className="text-[7px] font-black uppercase tracking-widest text-center">Instant <br />Invoice</span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="mt-14 flex flex-col md:flex-row justify-between items-center gap-6 px-12 opacity-50 border-t border-slate-100 pt-10">
                                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em]">Official Registration Gateway v4.5</p>
                                                    <div className="hidden md:block h-px flex-1 bg-slate-100 mx-10" />
                                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em]">Global Healthcare Excellence 2026</p>
                                                </div>
                                            </div>
                                        </form>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default BookAStand;