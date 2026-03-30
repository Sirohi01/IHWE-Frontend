import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
    CheckCircle,
    Send, ChevronRight,
    ShieldCheck,
    CreditCard,
    Banknote,
    Lock
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { heroBackgroundApi, stallApi, exhibitorRegistrationApi, settingsApi, SERVER_URL, eventApi, stallRateApi, termsApi, publicApi } from "@/lib/api";
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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
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
        "text-[10px] font-bold uppercase tracking-[0.05em] text-slate-800 mb-1 block";

    return (
        <div className="min-h-screen bg-[#FDFDFD] font-inter">

            {/* ── HERO ── */}
            <section
                className="relative pt-36 pb-20 overflow-hidden"
                style={{
                    backgroundImage: heroData?.backgroundImage ? `url(${SERVER_URL}${heroData.backgroundImage})` : "none",
                    backgroundColor: "#1a3516", // Professional fallback color
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
            >
                <div className="absolute inset-0 bg-black/45" />

                <div
                    className="container mx-auto px-4 text-center text-white relative z-10"
                    data-aos="fade-up"
                >
                    <p className="text-sm uppercase tracking-[0.4em] mb-3 opacity-80">
                        {heroData?.title || "Exhibition 2026"}
                    </p>

                    <h1
                        className="text-4xl md:text-6xl font-semibold mb-4 tracking-tight"
                        style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                    >
                        {heroData?.heading || "Book Your Exhibition Stand"}
                    </h1>

                    <p className="text-white/70 text-base mb-6 max-w-xl mx-auto leading-relaxed">
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
                                    9<span className="text-[0.6em] relative -top-[0.2em] font-sans lowercase">th</span> INTERNATIONAL HEALTH AND WELLNESS EXPO
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
                                        initial={{ opacity: 0, scale: 0.98 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="bg-white border border-slate-300 shadow-2xl p-12 flex flex-col items-center justify-center text-center space-y-8"
                                    >
                                        <div className="flex flex-col items-center space-y-4">
                                            <div className="w-20 h-20 bg-[#23471d]/10 flex items-center justify-center text-[#23471d] rounded-full">
                                                <CheckCircle size={40} />
                                            </div>
                                            <h2
                                                className="text-3xl font-bold text-slate-900"
                                                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                                            >
                                                Registration Successful!
                                            </h2>
                                            <p className="text-slate-600 text-sm max-w-md mx-auto leading-relaxed font-inter italic">
                                                Thank you for your interest in IH&WE 2026. Our team will contact you within 24 hours to discuss the next steps of your registration.
                                            </p>
                                        </div>

                                        <div className="bg-slate-50 border border-slate-200 overflow-hidden rounded-sm text-left w-full max-w-2xl mx-auto shadow-sm">
                                            <div className="bg-white border-b border-slate-200 px-6 py-3 flex justify-between items-center">
                                                <div className="flex flex-col">
                                                    <h4 className="text-[10px] font-black text-[#23471d] uppercase tracking-[0.2em]">RESERVATION SUMMARY (SPACE DETAIL)</h4>
                                                    <p className="text-[9px] text-slate-400 font-bold uppercase tracking-tight">Exhibitor: {formData.exhibitorName}</p>
                                                </div>
                                                <span className="text-[10px] font-mono text-slate-400 font-bold uppercase tracking-widest">ID: REG-{Date.now().toString().slice(-6)}</span>
                                            </div>

                                            <div className="p-6 grid grid-cols-2 md:grid-cols-4 gap-y-6 gap-x-4 font-inter">
                                                <div className="border-r border-slate-100">
                                                    <p className="text-[9px] text-slate-400 font-black uppercase mb-1">STALL NO.</p>
                                                    <p className="text-sm font-black text-[#d26019]">{formData.participation.stallFor || formData.participation.stallNo}</p>
                                                </div>
                                                <div className="border-r border-slate-100">
                                                    <p className="text-[9px] text-slate-400 font-black uppercase mb-1">AREA / DIMENS.</p>
                                                    <p className="text-xs font-bold text-slate-800">{formData.participation.stallSize} sqm / {formData.participation.dimension}</p>
                                                </div>
                                                <div className="border-r border-slate-100">
                                                    <p className="text-[9px] text-slate-400 font-black uppercase mb-1">STALL TYPE</p>
                                                    <p className="text-xs font-bold text-slate-800 uppercase">{formData.participation.stallType}</p>
                                                </div>
                                                <div>
                                                    <p className="text-[9px] text-slate-400 font-black uppercase mb-1">RATE PER SQMT</p>
                                                    <p className="text-xs font-bold text-slate-800">₹ {Number(formData.participation.rate).toLocaleString()}</p>
                                                </div>

                                                <div className="col-span-full border-y border-slate-100 py-4 flex flex-col md:flex-row md:justify-between md:items-center gap-4">
                                                    <div className="flex flex-col">
                                                        <p className="text-[9px] text-slate-400 font-black uppercase mb-1">CONTACT PERSON</p>
                                                        <p className="text-xs font-bold text-slate-800">{formData.contact1.title} {formData.contact1.firstName} {formData.contact1.lastName}</p>
                                                        <p className="text-[10px] text-slate-500">{formData.contact1.mobile} | {formData.contact1.email}</p>
                                                    </div>
                                                    <div className="flex flex-col md:text-right">
                                                        <p className="text-[9px] text-slate-400 font-black uppercase mb-1">NET PAYABLE AMOUNT</p>
                                                        <p className="text-xl font-black text-slate-900 leading-none">₹ {Number(formData.participation.total).toLocaleString()}</p>
                                                        <span className="text-[8px] text-slate-400 font-bold italic">Inclusive of 18% GST</span>
                                                    </div>
                                                </div>

                                                <div className="col-span-full md:col-span-2 space-y-4">
                                                    <div className="bg-orange-50/50 p-4 border border-orange-100 rounded-sm">
                                                        <p className="text-[9px] text-orange-600 font-black uppercase tracking-[0.1em] mb-2 flex items-center gap-1.5"><CreditCard size={10} /> ESTIMATED PAYMENT SCHEDULE</p>
                                                        <div className="grid grid-cols-2 gap-4">
                                                            <div>
                                                                <p className="text-[8px] text-slate-500 font-bold uppercase">Balance Remaining</p>
                                                                <p className="text-sm font-black text-slate-700">₹ {Number(formData.balanceAmount).toLocaleString()}</p>
                                                            </div>
                                                            <div className="text-right">
                                                                <p className="text-[8px] text-slate-500 font-bold uppercase italic">Future Installments (30/20%)</p>
                                                                <div className="flex flex-col text-[10px] font-bold text-slate-400">
                                                                    <span>₹ {Math.round(formData.participation.total * 0.3).toLocaleString()} (2 M. before)</span>
                                                                    <span>₹ {Math.round(formData.participation.total * 0.2).toLocaleString()} (1 M. before)</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="col-span-full md:col-span-2 bg-slate-100/50 p-4 border border-slate-200 rounded-sm flex flex-col justify-between">
                                                    <div className="flex justify-between items-start">
                                                        <div>
                                                            <p className="text-[9px] text-slate-400 font-black uppercase mb-1">PAYMENT RECEIVED</p>
                                                            <p className="text-lg font-black text-green-700 leading-none">₹ {Number(formData.amountPaid).toLocaleString()}</p>
                                                        </div>
                                                        <span className="bg-green-100 text-green-700 text-[8px] px-2 py-0.5 rounded-full font-black uppercase tracking-widest">{formData.paymentMode} ({formData.paymentType})</span>
                                                    </div>
                                                    <div className="pt-4 mt-4 border-t border-slate-200 grid grid-cols-2 gap-4 text-center">
                                                        <div>
                                                            <div className="h-8 border-b border-slate-300 mb-1 border-dashed"></div>
                                                            <p className="text-[8px] text-slate-400 font-bold uppercase">Exhibitor Signature</p>
                                                        </div>
                                                        <div>
                                                            <div className="h-8 border-b border-slate-300 mb-1 border-dashed"></div>
                                                            <p className="text-[8px] text-slate-400 font-bold uppercase">Organizer Seal</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex gap-4 pt-4">
                                            <Link to="/">
                                                <Button className="rounded-sm px-10 h-11 bg-[#23471d] hover:bg-[#1a3516] text-sm font-bold uppercase tracking-widest transition-all">
                                                    Return Home
                                                </Button>
                                            </Link>
                                            <Button
                                                variant="outline"
                                                onClick={() => {
                                                    setSubmitted(false);
                                                    setFormData(initialFormData);
                                                }}
                                                className="rounded-sm px-10 h-11 border-slate-300 text-sm font-bold uppercase tracking-widest hover:bg-slate-50 transition-all font-inter"
                                            >
                                                New Registration
                                            </Button>
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
                                                    <h3 className="text-sm font-black text-[#23471d] uppercase tracking-[0.1em] border-b border-slate-200 pb-2 mb-4 flex items-center gap-2">
                                                        <Banknote size={18} /> APPLICABLE STALL RATES
                                                    </h3>
                                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                                        {allRates.map(rate => (
                                                            <div key={rate._id} className="bg-white p-4 rounded border border-slate-200 shadow-sm flex flex-col items-center text-center">
                                                                <div className="text-[10px] font-black text-slate-500 uppercase mb-1">{rate.stallType}</div>
                                                                <div className="text-lg font-black text-[#d26019]">
                                                                    {rate.currency === 'INR' ? '₹' : '$'}{rate.ratePerSqm.toLocaleString()}
                                                                    <span className="text-[10px] text-slate-400 font-bold ml-1">/ SQM</span>
                                                                </div>
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
                                                    <div className="space-y-4">
                                                        <h3 className="text-sm font-black text-[#23471d] uppercase tracking-[0.1em] flex items-center gap-2">
                                                            <CheckCircle size={16} /> Primary Liaison Officer
                                                        </h3>
                                                        <div className="grid grid-cols-2 gap-4 bg-slate-50/50 p-5 border border-slate-100">
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
                                                            <div>
                                                                <Label className={labelClasses}>Official Email *</Label>
                                                                <Input required type="email" name="contact1.email" value={formData.contact1.email} onChange={handleInputChange} placeholder="email@company.com" className={inputClasses} />
                                                            </div>
                                                            <div>
                                                                <Label className={labelClasses}>Mobile Number *</Label>
                                                                <Input required name="contact1.mobile" value={formData.contact1.mobile} onChange={handleInputChange} placeholder="+91 XXXXXXXXXX" className={inputClasses} />
                                                            </div>
                                                            <div className="col-span-2">
                                                                <Label className={labelClasses}>Alternate Contact No.</Label>
                                                                <Input name="contact1.alternateNo" value={formData.contact1.alternateNo} onChange={handleInputChange} placeholder="Secondary mobile or landline" className={inputClasses} />
                                                            </div>
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
                                                                {availableStalls.length === 0 ? (
                                                                    <p className="p-4 text-center text-xs text-slate-400 italic">No stalls available for this event</p>
                                                                ) : (
                                                                    availableStalls.map(s => (
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
                                                <div className="bg-[#11250f] rounded-[2rem] overflow-hidden shadow-2xl shadow-[#1a3516]/30 relative border border-white/5">
                                                    {/* Background Artistic Accents */}
                                                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-br from-[#d26019]/20 to-transparent rounded-full -mr-64 -mt-64 blur-[100px] pointer-events-none" />
                                                    <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-tr from-[#23471d]/40 to-transparent rounded-full -ml-48 -mb-48 blur-[80px] pointer-events-none" />

                                                    <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12">

                                                        {/* ── LEFT: BOOKING SUMMARY ── */}
                                                        <div className="lg:col-span-5 p-6 lg:p-8 border-b lg:border-b-0 lg:border-r border-white/10 flex flex-col justify-between">
                                                            <div className="space-y-6">
                                                                <div>
                                                                    <div className="flex items-center gap-3 mb-2">
                                                                        <div className="w-8 h-px bg-[#d26019]"></div>
                                                                        <h4 className="text-[11px] font-black text-[#d26019] uppercase tracking-[0.4em]">Final Summary</h4>
                                                                    </div>
                                                                    <h3 className="text-3xl font-black text-white leading-tight">Order <br />Overview</h3>
                                                                </div>

                                                                <div className="space-y-6">
                                                                    {/* Stall Detail Row */}
                                                                    <div className="flex justify-between items-end group">
                                                                        <div className="space-y-1">
                                                                            <p className="text-[10px] text-white/40 font-bold uppercase tracking-widest">Stall Selection</p>
                                                                            <p className="text-lg font-black text-white group-hover:text-[#d26019] transition-colors">
                                                                                {formData.participation.stallFor || "Not Selected"}
                                                                            </p>
                                                                        </div>
                                                                        <div className="text-right">
                                                                            <p className="text-[10px] text-white/40 font-bold uppercase tracking-widest">Area</p>
                                                                            <p className="text-sm font-black text-white/80">{formData.participation.stallSize} SQM</p>
                                                                        </div>
                                                                    </div>

                                                                    {/* Cost Breakdown Section */}
                                                                    <div className="pt-6 border-t border-white/5 space-y-4">
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
                                                                                        <div className="flex justify-between text-xs font-bold text-red-400">
                                                                                            <span>Stall Increment (+{inc}%)</span>
                                                                                            <span className="text-red-400">+{formData.participation.currency === 'INR' ? '₹' : '$'} {Math.round(incValue).toLocaleString()}</span>
                                                                                        </div>
                                                                                    )}
                                                                                    {disc > 0 && (
                                                                                        <div className="flex justify-between text-xs font-bold text-green-400">
                                                                                            <span>Stall Discount (-{disc}%)</span>
                                                                                            <span className="text-green-400">-{formData.participation.currency === 'INR' ? '₹' : '$'} {Math.round(discValue).toLocaleString()}</span>
                                                                                        </div>
                                                                                    )}
                                                                                </>
                                                                            );
                                                                        })()}
                                                                        <div className="flex justify-between text-xs font-bold text-white/50">
                                                                            <span>Sub-Total (Net Rate)</span>
                                                                            <span className="text-white/80">{formData.participation.currency === 'INR' ? '₹' : '$'} {formData.participation.amount.toLocaleString()}</span>
                                                                        </div>
                                                                        <div className="flex justify-between text-xs font-bold text-white/50">
                                                                            <span>GST (18% Statutory)</span>
                                                                            <span className="text-white/80">{formData.participation.currency === 'INR' ? '₹' : '$'} {Math.round(formData.participation.total - formData.participation.amount).toLocaleString()}</span>
                                                                        </div>
                                                                        <div className="pt-4 flex justify-between items-center decoration-slice">
                                                                            <span className="text-sm font-black text-white uppercase tracking-widest">Total Contract Value</span>
                                                                            <div className="text-right">
                                                                                <span className="text-2xl font-black text-white">{formData.participation.currency === 'INR' ? '₹' : '$'} {formData.participation.total.toLocaleString()}</span>
                                                                                <p className="text-[8px] text-white/30 font-bold uppercase tracking-tighter mt-1 italic">Inclusive of all administrative levies</p>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            {/* Bottom Badge */}
                                                            <div className="mt-8 pt-6 border-t border-white/5 flex items-center gap-4">
                                                                <div className="w-10 h-10 border border-white/10 rounded-full flex items-center justify-center text-[#d26019]">
                                                                    <ShieldCheck size={20} />
                                                                </div>
                                                                <div>
                                                                    <p className="text-[9px] font-black text-white uppercase tracking-[0.2em]">Certified Exhibitor Space</p>
                                                                    <p className="text-[8px] text-white/30 font-medium">Booking ID: IHWE-2026-TEMP</p>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        {/* ── RIGHT: PAYMENT & CONTROLS ── */}
                                                        <div className="lg:col-span-7 p-6 lg:p-8 flex flex-col justify-between bg-white/[0.02]">
                                                            <div className="space-y-8">
                                                                {/* Deployment Source */}
                                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                                                    <div className="space-y-4">
                                                                        <Label className="text-[10px] font-black text-[#d26019] uppercase tracking-[0.3em] block">Referral Channel *</Label>
                                                                        <Select onValueChange={(v) => handleSelectChange('referredBy', v)} value={formData.referredBy}>
                                                                            <SelectTrigger className="h-12 rounded-2xl border-white/10 bg-white/5 text-white text-xs font-bold focus:ring-[#d26019]/30 hover:bg-white/10 transition-all">
                                                                                <SelectValue placeholder="Select Platform" />
                                                                            </SelectTrigger>
                                                                            <SelectContent className="bg-[#1a3516] border-white/10 text-white">
                                                                                <SelectItem value="Direct Website">Direct Website</SelectItem>
                                                                                <SelectItem value="Email Marketing">Email Marketing</SelectItem>
                                                                                <SelectItem value="Social Media">Social Media</SelectItem>
                                                                                {Array.isArray(marketingStaff) && marketingStaff.map((staff: any) => (
                                                                                    <SelectItem key={staff._id} value={staff.username}>Staff: {staff.username}</SelectItem>
                                                                                ))}
                                                                            </SelectContent>
                                                                        </Select>
                                                                    </div>

                                                                    <div className="space-y-4">
                                                                        <Label className="text-[10px] font-black text-[#d26019] uppercase tracking-[0.3em] block">Spoken With (Team Member) *</Label>
                                                                        <Select onValueChange={(v) => handleSelectChange('spokenWith', v)} value={formData.spokenWith}>
                                                                            <SelectTrigger className="h-12 rounded-2xl border-white/10 bg-white/5 text-white text-xs font-bold focus:ring-[#d26019]/30 hover:bg-white/10 transition-all">
                                                                                <SelectValue placeholder="Select Team Member" />
                                                                            </SelectTrigger>
                                                                            <SelectContent className="bg-[#1a3516] border-white/10 text-white">
                                                                                <SelectItem value="None">None / Direct</SelectItem>
                                                                                {Array.isArray(staff) && staff.map((s: any) => (
                                                                                    <SelectItem key={s._id} value={s.username}>{s.username}</SelectItem>
                                                                                ))}
                                                                            </SelectContent>
                                                                        </Select>
                                                                    </div>

                                                                    <div className="space-y-4">
                                                                        <Label className="text-[10px] font-black text-[#d26019] uppercase tracking-[0.3em] block">Agreement *</Label>
                                                                        <label
                                                                            htmlFor="terms-check"
                                                                            className="h-12 flex items-center gap-3 px-5 bg-white/5 border border-white/10 rounded-2xl cursor-pointer hover:bg-white/10 transition-all"
                                                                        >
                                                                            <Checkbox
                                                                                id="terms-check"
                                                                                required
                                                                                className="border-white/20 data-[state=checked]:bg-[#d26019] data-[state=checked]:border-[#d26019]"
                                                                            />
                                                                            <span className="text-[11px] font-bold text-white/70 uppercase">
                                                                                Accept <Link to={`/terms-of-service?page=exhibitor-registration&eventId=${selectedEventId}`} target="_blank" className="text-[#d26019] hover:text-white underline transition-colors" onClick={(e) => e.stopPropagation()}>Terms & Conditions</Link>
                                                                            </span>
                                                                        </label>
                                                                    </div>
                                                                </div>

                                                                {/* Payment Schedule Selector */}
                                                                <div className="space-y-6">
                                                                    <div className="flex justify-between items-baseline">
                                                                        <h4 className="text-[10px] font-black text-white/40 uppercase tracking-[0.3em]">Payment Schedule</h4>
                                                                        <p className="text-[9px] text-[#d26019] font-black uppercase tracking-tighter italic">Recommended: Full Payment</p>
                                                                    </div>
                                                                    <div className="grid grid-cols-2 gap-4">
                                                                        <button
                                                                            type="button"
                                                                            onClick={() => handleSelectChange('paymentType', 'full')}
                                                                            className={`relative overflow-hidden group px-6 py-6 rounded-[1.5rem] border-2 transition-all duration-500 text-left ${formData.paymentType === 'full' ? 'border-[#d26019] bg-[#d26019]/10 shadow-[0_0_40px_rgba(210,96,25,0.1)]' : 'border-white/5 bg-white/5 hover:border-white/20'}`}
                                                                        >
                                                                            <div className="relative z-10">
                                                                                <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-4 transition-transform group-hover:scale-110 ${formData.paymentType === 'full' ? 'bg-[#d26019] text-white' : 'bg-white/10 text-white/40'}`}>
                                                                                    <CreditCard size={14} />
                                                                                </div>
                                                                                <p className="text-[10px] font-black text-white uppercase tracking-widest mb-1">Full Payment</p>
                                                                                <p className="text-[14px] font-black text-white leading-tight">100% Secure Settlement</p>
                                                                            </div>
                                                                            {formData.paymentType === 'full' && (
                                                                                <div className="absolute -bottom-2 -right-2 w-16 h-16 bg-[#d26019]/20 blur-2xl rounded-full" />
                                                                            )}
                                                                        </button>
                                                                        <button
                                                                            type="button"
                                                                            onClick={() => handleSelectChange('paymentType', 'advance')}
                                                                            className={`relative overflow-hidden group px-6 py-6 rounded-[1.5rem] border-2 transition-all duration-500 text-left ${formData.paymentType === 'advance' ? 'border-[#d26019] bg-[#d26019]/10 shadow-[0_0_40px_rgba(210,96,25,0.1)]' : 'border-white/5 bg-white/5 hover:border-white/20'}`}
                                                                        >
                                                                            <div className="relative z-10">
                                                                                <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-4 transition-transform group-hover:scale-110 ${formData.paymentType === 'advance' ? 'bg-[#d26019] text-white' : 'bg-white/10 text-white/40'}`}>
                                                                                    <Banknote size={14} />
                                                                                </div>
                                                                                <p className="text-[10px] font-black text-white uppercase tracking-widest mb-1">Advance Booking</p>
                                                                                <p className="text-[14px] font-black text-white leading-tight">{onlineAdvancePercent}% Deposit Only</p>
                                                                            </div>
                                                                        </button>
                                                                    </div>
                                                                </div>

                                                                {/* Final Call to Action */}
                                                                <div className="pt-4 space-y-6">
                                                                    <div className="flex justify-between items-center py-6 border-y border-white/5">
                                                                        <div className="space-y-1">
                                                                            <p className="text-[10px] text-white/30 font-black uppercase tracking-widest">Amount to Pay Now</p>
                                                                            <div className="flex items-baseline gap-2">
                                                                                <span className="text-xl font-medium text-[#d26019]">{formData.participation.currency === 'INR' ? '₹' : '$'}</span>
                                                                                <span className="text-5xl font-black text-white tracking-tighter transition-all duration-500">{formData.amountPaid.toLocaleString()}</span>
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
                                                                        disabled={isLoading || !formData.participation.stallNo}
                                                                        className="group relative w-full h-20 rounded-[1.8rem] bg-white text-[#11250f] font-black text-sm uppercase tracking-[0.2em] shadow-[0_20px_50px_rgba(0,0,0,0.3)] transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:grayscale overflow-hidden"
                                                                    >
                                                                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out"></div>
                                                                        <div className="relative z-10 flex items-center justify-center gap-4">
                                                                            {isLoading ? "Synchronizing Secure Server..." : (
                                                                                <>
                                                                                    <span>Confirm & Initialize Payment</span>
                                                                                    <ChevronRight size={22} className="group-hover:translate-x-2 transition-transform" />
                                                                                </>
                                                                            )}
                                                                        </div>
                                                                    </button>

                                                                    <div className="flex justify-center items-center gap-8 text-white/20">
                                                                        <div className="flex flex-col items-center gap-1.5 opacity-50 hover:opacity-100 transition-opacity">
                                                                            <Lock size={16} />
                                                                            <span className="text-[7px] font-black uppercase tracking-widest text-center">AES-256 <br />Secure</span>
                                                                        </div>
                                                                        <div className="h-8 w-px bg-white/5" />
                                                                        <div className="flex flex-col items-center gap-1.5 opacity-50 hover:opacity-100 transition-opacity">
                                                                            <ShieldCheck size={16} />
                                                                            <span className="text-[7px] font-black uppercase tracking-widest text-center">RBI <br />Compliant</span>
                                                                        </div>
                                                                        <div className="h-8 w-px bg-white/5" />
                                                                        <div className="flex flex-col items-center gap-1.5 opacity-50 hover:opacity-100 transition-opacity">
                                                                            <Banknote size={16} />
                                                                            <span className="text-[7px] font-black uppercase tracking-widest text-center">Instant <br />Invoice</span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="mt-10 flex flex-col md:flex-row justify-between items-center gap-6 px-12 opacity-30">
                                                    <p className="text-[9px] font-black text-slate-500 uppercase tracking-[0.4em]">Official Registration Gateway v4.5</p>
                                                    <div className="hidden md:block h-px flex-1 bg-slate-200 mx-10" />
                                                    <p className="text-[9px] font-black text-slate-500 uppercase tracking-[0.4em]">Global Healthcare Excellence 2026</p>
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