import React, { useState, useEffect, useMemo, useRef } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
    CheckCircle,
    Send, ChevronRight,
    Info,
    Calendar,
    MapPin,
    Mic2,
    Phone,
    AtSign,
    ShieldCheck,
    Globe,
    Lock
} from "lucide-react";
import HeroBg from "@/assets/buyer.jpg";
import { Badge } from "@/components/ui/badge";
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
    API_URL,
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
import PaymentProcessingModal from '@/components/PaymentProcessingModal';
import SectionContainer from "@/components/layout/SectionContainer";

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
    aadhaarNo: '',
    registrantType: 'registered' as 'registered' | 'unregistered',
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
    paymentPlanType: 'full',
    paymentPlanLabel: 'Full Payment',
    amountPaid: 0,
    balanceAmount: 0,
    status: 'pending',
    paymentId: '',
    razorpayOrderId: '',
    razorpaySignature: '',
    chosenTdsPercent: 0,
    financeBreakdown: {
        grossAmount: 0,
        stallDiscountPercent: 0,
        stallDiscountAmount: 0,
        subtotal1: 0,
        discountPercent: 0,
        discountAmount: 0,
        subtotal: 0,
        gstAmount: 0,
        tdsPercent: 0,
        tdsAmount: 0,
        netPayable: 0,
        isFullPayment: false
    }
};

const BookAStand = () => {
    const [submitted, setSubmitted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [paymentModal, setPaymentModal] = useState<{ status: 'processing' | 'success' | 'failed' } | null>(null);
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

    const [exhibitorType, setExhibitorType] = useState<'domestic' | 'international' | null>(null);
    const [usdToInrRate, setUsdToInrRate] = useState<number>(86);
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
    const emailTimerRef = useRef<number | null>(null);
    const phoneTimerRef = useRef<number | null>(null);
    const formRef = useRef<HTMLDivElement>(null);
    const [isComingSoon, setIsComingSoon] = useState(false);

    // Scroll to form when exhibitorType changes
    useEffect(() => {
        if (exhibitorType && formRef.current) {
            formRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }, [exhibitorType]);

    // Optimized Data Fetch - Priority Loading (Removed Promise.all for better performance)
    useEffect(() => {
        const fetchInitialData = async () => {
            try {
                // Priority 1: Critical data for page render
                const hData = await heroBackgroundApi.getByPage("Registration / Book A Stand");
                if (hData) setHeroData((hData as any).data || hData);

                const eData = await eventApi.getActive();
                const actualEvents = Array.isArray(eData) ? eData : ((eData as any).data || []);
                if (actualEvents.length > 0) {
                    setEvents(actualEvents);
                    const urlEventId = searchParams.get('eventId');
                    const initialEventId = urlEventId && actualEvents.find((e: any) => e._id === urlEventId) ? urlEventId : actualEvents[0]._id;
                    setSelectedEventId(initialEventId);
                    setFormData(prev => ({ ...prev, eventId: initialEventId }));
                }
                Promise.all([
                    publicApi.getEmployees(),
                    publicApi.getStaff(),
                    termsApi.getByPage("exhibitor-registration"),
                    crmApi.getCountries(),
                    eventHighlightsApi.get(),
                    settingsApi.get(),
                    countersApi.get()
                ]).then(([employeesRes, staffRes, termsRes, countryRes, highlightRes, settingsRes, counterRes]) => {
                    if (employeesRes) setMarketingStaff(Array.isArray(employeesRes) ? employeesRes : ((employeesRes as any).data || []));
                    if (staffRes) setStaff(Array.isArray(staffRes) ? staffRes : ((staffRes as any).data || []));
                    if (termsRes) setTermsContent(termsRes);
                    if (countryRes) setCountries(countryRes);
                    if (highlightRes) setEventHighlights(highlightRes);
                    if (settingsRes) setSettings(settingsRes);
                    if (counterRes) setCounters(counterRes);
                });
            } catch (error) {
                console.error("Error fetching initial data:", error);
            }
        };
        fetchInitialData();
    }, []);
    useEffect(() => {
        if (formData.country) {
            const selectedCountry = countries.find(c => c.name === formData.country);
            if (selectedCountry && selectedCountry.countryCode) {
                crmApi.getStates(selectedCountry.countryCode).then(stateRes => {
                    setStates(stateRes);
                }).catch(err => console.error("Error fetching states:", err));
            }
        } else {
            setStates([]);
            setCities([]);
        }
    }, [formData.country, countries]);
    useEffect(() => {
        if (formData.state) {
            const selectedState = states.find(s => s.name === formData.state);
            if (selectedState && selectedState.stateCode) {
                crmApi.getCities(selectedState.stateCode).then(cityRes => {
                    setCities(cityRes);
                }).catch(err => console.error("Error fetching cities:", err));
            }
        } else {
            setCities([]);
        }
    }, [formData.state, states]);

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
            stallRateApi.getAllByEvent(selectedEventId).then(rates => {
                setAllRates(rates);
            });
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
        const selectedStall = availableStalls.find(s => s._id === part.stallNo);
        if (!selectedStall) return;

        const size = Number(part.stallSize) || 0;
        const rate = Number(part.rate) || 0;
        const incrementPercent = selectedStall.incrementPercentage || 0;

        // 1. Gross cost before any discounts
        const baseCost = size * rate;
        const plIncrement = (baseCost * incrementPercent) / 100;
        const grossCost = baseCost + plIncrement;

        // 2. Stall specific discount
        const stallDiscountPct = selectedStall.discountPercentage || 0;
        const stallDiscountAmt = Math.round((grossCost * stallDiscountPct) / 100);
        const subtotal1 = grossCost - stallDiscountAmt;

        // 3. Organization-wide Full Payment Discount
        const currentEvent = events.find(e => e._id === selectedEventId);
        const selectedPlan = (currentEvent?.paymentPlans || []).find((p: any) => p.id === formData.paymentPlanType);

        // Check if full payment (either by ID or by 100% percentage)
        const isFull = formData.paymentPlanType === 'full' || (selectedPlan && Number(selectedPlan.percentage) === 100);

        const fpDiscountPct = isFull ? (settings?.fullPaymentDiscount || 0) : 0;
        const fpDiscountAmt = Math.round(subtotal1 * fpDiscountPct / 100);
        const subtotal2 = subtotal1 - fpDiscountAmt;

        // 4. GST 18% on taxable value (subtotal2)
        const gstAmt = Math.round(subtotal2 * 0.18);

        // 5. Invoice total (subtotal2 + GST) — what seller invoices
        const invoiceTotal = subtotal2 + gstAmt;

        // 6. TDS on taxable value only (subtotal2), NOT on GST
        const tdsPct = formData.chosenTdsPercent || 0;
        const tdsAmt = Math.round(subtotal2 * tdsPct / 100);

        // 7. Net cash payable by buyer = invoiceTotal - TDS
        const netPayable = invoiceTotal - tdsAmt;

        // Calculate due now based on selected plan percentage
        // If no plan selected or plan is full → 100% due now
        const planPercent = selectedPlan ? Number(selectedPlan.percentage) : 100;

        const advanceAmt = Math.round(netPayable * (planPercent / 100));
        const balanceAmt = Math.round(netPayable - advanceAmt);

        setFormData(prev => ({
            ...prev,
            participation: {
                ...prev.participation,
                amount: Math.round(subtotal2),
                total: Math.round(invoiceTotal),
            },
            paymentPlanLabel: selectedPlan ? selectedPlan.label : 'Full Payment',
            amountPaid: advanceAmt,
            balanceAmount: balanceAmt,
            financeBreakdown: {
                grossAmount: Math.round(grossCost),
                stallDiscountPercent: stallDiscountPct,
                stallDiscountAmount: Math.round(stallDiscountAmt),
                subtotal1: Math.round(subtotal1),
                discountPercent: fpDiscountPct,
                discountAmount: Math.round(fpDiscountAmt),
                subtotal: Math.round(subtotal2),
                gstAmount: gstAmt,
                tdsPercent: tdsPct,
                tdsAmount: tdsAmt,
                netPayable: Math.round(netPayable),
                isFullPayment: isFull
            }
        }));

    }, [
        formData.participation.stallSize,
        formData.participation.rate,
        formData.participation.stallNo,
        availableStalls,
        formData.paymentPlanType,
        formData.chosenTdsPercent,
        settings,
        events,
        selectedEventId
    ]);

    useEffect(() => {
        if (emailTimer > 0) {
            emailTimerRef.current = window.setInterval(() => {
                setEmailTimer(prev => prev - 1);
            }, 1000);
        } else if (emailTimerRef.current) {
            clearInterval(emailTimerRef.current);
        }
        return () => {
            if (emailTimerRef.current) clearInterval(emailTimerRef.current);
        };
    }, [emailTimer]);

    useEffect(() => {
        if (phoneTimer > 0) {
            phoneTimerRef.current = window.setInterval(() => {
                setPhoneTimer(prev => prev - 1);
            }, 1000);
        } else if (phoneTimerRef.current) {
            clearInterval(phoneTimerRef.current);
        }
        return () => {
            if (phoneTimerRef.current) clearInterval(phoneTimerRef.current);
        };
    }, [phoneTimer]);

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
        const isNameOrDesignation = name.includes('firstName') || name.includes('lastName') || name.includes('designation');
        let newValue = value;
        if (isNameOrDesignation) {
            newValue = value.replace(/[0-9]/g, '');
        }

        if (name === 'landlineNo') {
            newValue = value.replace(/\D/g, '');
        }

        const isMobileField = name === 'contact1.mobile' || name === 'contact2.mobile' ||
            name === 'contact1.alternateNo' || name === 'contact2.alternateNo';
        if (isMobileField && exhibitorType === 'domestic') {
            const digitsOnly = newValue.replace(/\D/g, '').slice(0, 10);
            if (name.includes('.')) {
                const [parent, child] = name.split('.');
                setFormData(prev => ({
                    ...prev,
                    [parent]: { ...prev[parent as keyof typeof prev] as any, [child]: digitsOnly }
                }));
            }
            return;
        }

        if (name.includes('.')) {
            const [parent, child] = name.split('.');
            setFormData(prev => ({
                ...prev,
                [parent]: { ...prev[parent as keyof typeof prev] as any, [child]: newValue }
            }));
        } else {
            setFormData(prev => ({ ...prev, [name]: newValue }));
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
            },
            chosenTdsPercent: 0,
            financeBreakdown: {
                grossAmount: 0,
                stallDiscountPercent: 0,
                stallDiscountAmount: 0,
                subtotal1: 0,
                discountPercent: 0,
                discountAmount: 0,
                subtotal: 0,
                gstAmount: 0,
                tdsPercent: 0,
                tdsAmount: 0,
                netPayable: 0,
                isFullPayment: false
            },
            paymentMode: 'online'
        }));
        if (type === 'international') {
            fetch(`${API_URL}/exchange-rate/usd-to-inr`)
                .then(r => r.json())
                .then(res => { if (res.success && res.rate) setUsdToInrRate(res.rate); })
                .catch(() => { });
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
            const exhibitorName = `${formData.contact1.firstName || ''} ${formData.contact1.lastName || ''}`.trim() || formData.exhibitorName || 'Exhibitor';
            const res = await verifyApi.sendPhoneOtp(formData.contact1.mobile, 'EXHIBITOR', exhibitorName);
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
                const isUSD = formData.participation.currency === 'USD';
                const finalAmount = formData.amountPaid;
                const gatewayAmount = Math.round(finalAmount * 1.025 * 100) / 100;

                // Step 1: Save registration first (status=pending) to get a DB _id for order creation
                const pendingData = {
                    ...formData,
                    status: 'pending',
                    paymentMode: 'online',
                    amountPaid: 0,
                    balanceAmount: formData.financeBreakdown?.netPayable || 0,
                };
                const regRes = await exhibitorRegistrationApi.submit(pendingData);
                if (!regRes.success || !regRes.data?._id) {
                    Swal.fire('Error', regRes.message || 'Failed to initiate registration. Please try again.', 'error');
                    setIsLoading(false);
                    return;
                }
                const registrationDbId = regRes.data._id;

                // Step 2: Create Razorpay order on backend (gets a proper order_id)
                const orderRes = await fetch(`${API_URL}/payment/create-order/${registrationDbId}`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ amount: gatewayAmount })
                });
                const orderData = await orderRes.json();
                if (!orderData.success) {
                    Swal.fire('Error', orderData.message || 'Failed to create payment order.', 'error');
                    setIsLoading(false);
                    return;
                }

                const options = {
                    key: orderData.key || RAZORPAY_KEY_ID,
                    amount: orderData.order.amount,
                    currency: isUSD ? 'USD' : 'INR',
                    name: "IHWE Registration",
                    description: `Stand Booking - Stall ${formData.participation.stallFor}${isUSD ? ' (International)' : ''} (incl. 2.5% gateway fee)`,
                    order_id: orderData.order.id,
                    handler: async (response: any) => {
                        setPaymentModal({ status: 'processing' });
                        try {
                            // Step 3: Verify payment and update registration
                            // amountPaid = original finalAmount (NOT gatewayAmount) — gateway fee stays with Razorpay
                            const verifyRes = await fetch(`${API_URL}/payment/verify-payment`, {
                                method: 'POST',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify({
                                    razorpay_order_id: response.razorpay_order_id,
                                    razorpay_payment_id: response.razorpay_payment_id,
                                    razorpay_signature: response.razorpay_signature,
                                    registrationId: registrationDbId,
                                    amountPaid: finalAmount,
                                    paymentType: formData.balanceAmount === 0 ? 'full' : 'installment',
                                })
                            });
                            const verifyData = await verifyRes.json();
                            if (verifyData.success) {
                                setPaymentModal({ status: 'success' });
                                setTimeout(() => {
                                    setPaymentModal(null);
                                    setSubmitted(true);
                                    window.scrollTo({ top: 0, behavior: "smooth" });
                                }, 2500);
                            } else {
                                setPaymentModal({ status: 'failed' });
                            }
                        } catch {
                            setPaymentModal({ status: 'failed' });
                        }
                    },
                    modal: {
                        ondismiss: () => {
                            setIsLoading(false);
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

                rzp.on('payment.failed', async (response: any) => {
                    setIsLoading(false);
                    setPaymentModal({ status: 'failed' });
                    // Registration already saved as pending — no need to re-submit
                    console.error('Payment failed:', response.error?.description);
                });

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
    const fmtAmt = (n: number) => Math.round(n).toLocaleString('en-IN');
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
    if (isComingSoon && exhibitorType === 'international') {
        return (
            <div className="min-h-screen bg-white font-sans flex flex-col items-center justify-center relative overflow-hidden">
                {/* Background with Overlay */}
                <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-[20000ms] hover:scale-110"
                    style={{ backgroundImage: `url(${HeroBg})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-br from-[#23471d]/95 via-black/70 to-black/90" />

                {/* Animated Particles/Accents */}
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                    <div className="absolute top-[10%] left-[5%] w-64 h-64 bg-emerald-500/10 rounded-full blur-[100px] animate-pulse" />
                    <div className="absolute bottom-[10%] right-[5%] w-80 h-80 bg-emerald-600/10 rounded-full blur-[120px] animate-pulse" />
                </div>

                <div className="relative z-10 container mx-auto px-6 text-center max-w-4xl">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <Badge className="mb-6 px-4 py-1.5 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[10px] uppercase tracking-[0.3em] font-black rounded-full backdrop-blur-md">
                            International Exhibitor Registration
                        </Badge>

                        <h1 className="text-5xl md:text-8xl font-serif font-bold text-white mb-8 italic tracking-tighter leading-[1.1]">
                            Coming <span className="text-emerald-400">Soon.</span>
                        </h1>

                        <div className="w-24 h-1 bg-gradient-to-r from-transparent via-emerald-500 to-transparent mx-auto mb-10 opacity-50" />

                        <p className="text-white/70 text-lg md:text-xl mb-12 max-w-2xl mx-auto font-light leading-relaxed tracking-wide">
                            The gateway to India's most exclusive health and wellness sourcing event is almost ready. Prepare for structured B2B networking at IHWE 2026.
                        </p>

                        <div className="flex flex-col md:flex-row items-center justify-center gap-6">
                            <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-2xl flex items-center gap-4 group hover:bg-white/10 transition-all duration-500 cursor-pointer">
                                <div className="w-12 h-12 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform">
                                    <AtSign size={20} />
                                </div>
                                <div className="text-left">
                                    <p className="text-[10px] text-emerald-500 font-black uppercase tracking-widest mb-1">Pre-Register Interest</p>
                                    <p className="text-white font-medium">info@ihwe.in</p>
                                </div>
                            </div>

                            <Link to="/">
                                <Button className="h-16 px-10 rounded-2xl bg-white text-black hover:bg-emerald-500 hover:text-white transition-all duration-500 text-sm font-black uppercase tracking-[0.2em] shadow-2xl group">
                                    Explore Expo Site
                                </Button>
                            </Link>
                        </div>

                        <div className="mt-20 flex justify-center gap-12 opacity-40 grayscale hover:grayscale-0 transition-all duration-700">
                            <ShieldCheck className="text-white" size={32} />
                            <Globe className="text-white" size={32} />
                            <Lock className="text-white" size={32} />
                        </div>
                    </motion.div>
                </div>

                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/30 text-[9px] uppercase tracking-[0.5em] font-medium text-center">
                    IHWE 2026 • 9th Edition • Global Wellness Sourcing
                </div>
            </div>
        );
    }
    return (
        <div className="min-h-screen bg-[#FDFDFD] text-slate-900 font-inter">
            <PaymentProcessingModal
                status={paymentModal?.status ?? null}
                stallNo={formData.participation.stallFor}
                amount={`${formData.participation.currency === 'USD' ? '$' : '\u20B9'}${fmtAmt(formData.amountPaid)}`}
                onClose={() => { setPaymentModal(null); setIsLoading(false); }}
            />
            {/* -- HERO SECTION - Registration Standard 16:5 -- */}

            {/* bg section  */}
            <section
                className="hero-background-registration relative overflow-hidden "
                style={{
                    backgroundImage: "url('/exhibition/bg.png')",
                    backgroundSize: 'cover',
                    backgroundPosition: 'left',
                    backgroundRepeat: 'no-repeat',
                    fontFamily: "'Barlow', sans-serif",
                }}
            >
                <SectionContainer>
                    <div className="w-full">
                        <div className="relative z-10  py-2 flex flex-col gap-2 w-[60%]">

                            {/* Register as a Buyer */}
                            <div className="inline-block mt-4 px-5 py-1 bg-[#a8d060]/15 border border-[#a8d060]/40 rounded-lg text-[#a8d060] text-sm md:text-base font-bold uppercase tracking-[0.2em] w-fit backdrop-blur-sm shadow-[0_0_20px_rgba(168,208,96,0.2)]">
                                Exhibition stall booking
                            </div>

                            {/* Main Heading */}
                            <div>
                                <h1 className="text-5xl font-semibold text-white  leading-tight">
                                    Book Your
                                </h1>
                                <h1 className="text-5xl font-semibold text-white  leading-tight">
                                    Exhibition <span className="text-[#a8d060]"  >Stand</span>
                                </h1>
                            </div>

                            {/* Description */}
                            <p className="text-white/90 text-lg leading-relaxed max-w-lg">
                                Showcase your innovations to 8,000+ healthcare  Professionals-fill the form and get a customized stall for your brand.
                            </p>

                            {/* Stats Row */}
                            <div className="flex items-center mt-2 gap-2">
                                {[
                                    {
                                        num: '', label: '8,000+\nHealthcare\nProfessionals',
                                        icon: <img src="/exhibition/b1.png" alt="" className="w-20 h-auto object-contain" />
                                    },
                                    {
                                        num: '', label: 'Custom\nStall\nSolutions',
                                        icon: <img src="/exhibition/b2.png" alt="" className="w-20 h-auto object-contain" />,
                                    },
                                    {
                                        num: '', label: 'Maximum\nBrand\nVisibility',
                                        icon: <img src="/exhibition/b3.png" alt="" className="w-20 h-auto object-contain" />,
                                    },
                                    {
                                        num: '', label: 'High-Value\nBusiness\nConnections',
                                        icon: <img src="/exhibition/b4.png" alt="" className="w-20 h-auto object-contain" />,
                                    },
                                ].map((stat, i) => (
                                    <React.Fragment key={i}>
                                        <div className="flex flex-col items-center text-center px-1.5">
                                            <div>{stat.icon}</div>
                                            {stat.num && (
                                                <div className="text-2xl font-medium text-[#a8d060] leading-none tracking-tight">
                                                    {stat.num}
                                                </div>
                                            )}
                                            <div className="text-xs font-medium text-white uppercase tracking-[0.25em] mt-1 opacity-90 whitespace-pre-line">
                                                {stat.label}
                                            </div>
                                        </div>
                                        {i < 3 && (
                                            <div className="h-28 w-[1.5px] bg-[#a8d060]/30" />
                                        )}
                                    </React.Fragment>
                                ))}
                            </div>

                            <div className="mt-4">
                                <button className="flex items-center gap-3 bg-[#4a8f2f] hover:bg-[#3d7a26] text-white px-8 py-1.5 rounded-md text-sm font-medium uppercase tracking-widest transition-colors">
                                    Book Your Stall Now
                                    <span className="w-7 h-7 rounded-full bg-white flex items-center justify-center shrink-0">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-[#4a8f2f]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M5 12h14M13 6l6 6-6 6" />
                                        </svg>
                                    </span>
                                </button>
                            </div>

                        </div>

                        <div className="w-[40%]">
                            {/* <img src="/bsmeet/bsherob.png" alt="" /> */}
                        </div>
                    </div>
                </SectionContainer>
            </section>

            {/* bannar section  */}
            <SectionContainer>
                <section className="flex items-center justify-between  my-3 py-3 bg-white border border-gray-100 rounded-xl shadow-sm">
                    {[
                        {
                            icon: <div className="w-full h-full bg-[#19491A]" style={{ WebkitMask: "url('/exhibition/sb4.png') center/contain no-repeat", mask: "url('/exhibition/sb4.png') center/contain no-repeat" }} />,
                            title: 'Global Platform',
                            desc: 'Uniting healthcare, wellness, and sustainable industries',
                        },
                        {
                            icon: <div className="w-full h-full bg-[#19491A]" style={{ WebkitMask: "url('/exhibition/b1.png') center/contain no-repeat", mask: "url('/exhibition/b1.png') center/contain no-repeat" }} />,
                            title: 'Trusted Brands',
                            desc: "Connect with India's most trusted brands & manufacturers",
                        },
                        {
                            icon: <div className="w-full h-full bg-[#19491A]" style={{ WebkitMask: "url('/exhibition/b5.png') center/contain no-repeat", mask: "url('/exhibition/b5.png') center/contain no-repeat" }} />,
                            title: 'Targeted Audience',
                            desc: 'Engage with qualified buyers, Investors & decision makers',
                        },
                        {
                            icon: <div className="w-full h-full bg-[#19491A]" style={{ WebkitMask: "url('/icons/growth.png') center/contain no-repeat", mask: "url('/exhibition/b6.png') center/contain no-repeat" }} />,
                            title: 'Business Growth',
                            desc: 'Expand your market & accelerate your growth',
                        },
                    ].map((item, i) => (
                        <React.Fragment key={i}>
                            <div className="flex items-start gap-3 flex-1 px-4 ">
                                {/* Icon Circle */}
                                <div className="w-16 h-16 rounded-full bg-[#f0f7e6] flex items-center justify-center shrink-0">
                                    {item.icon}
                                </div>
                                {/* Text */}
                                <div>
                                    <p className="text-sm font-semibold text-gray-900 mb-0.5">{item.title}</p>
                                    <p className="text-xs text-gray-500 leading-relaxed">{item.desc}</p>
                                </div>
                            </div>
                            {/* Divider */}
                            {i < 3 && <div className="w-px h-12 bg-gray-200 shrink-0" />}
                        </React.Fragment>
                    ))}
                </section>
            </SectionContainer>
            {/* button section */}
            <SectionContainer>
                <section className="bg-white border border-gray-100 my-3 py-4 rounded-xl shadow-sm p-8 flex gap-10">

                    {/* Left Side */}
                    <div className="flex-1 flex flex-col justify-between">
                        <div>
                            <p className="text-gray-900 text-xl font-medium mb-1">9th Edition of</p>
                            <h2 className="text-[#1a4d1a] text-2xl font-semibold leading-snug mb-2">
                                International Health & Wellness Expo 2026<br />(IHWE Global Edition)
                            </h2>
                            <div className="w-8 h-[3px] bg-[#4a8f2f] rounded mb-4" />
                            <p className="text-gray-600 text-sm leading-relaxed mb-4">
                                Step into IHWE 2026, a leading global platform uniting healthcare, wellness, AYUSH,
                                organic, and sustainable industries under one roof. Whether you are a visitor
                                discovering innovations or a corporate buyer seeking meaningful business
                                connections, IHWE offers a high-value, curated experience with India's most
                                trusted brands and manufacturers.
                            </p>
                            <p className="text-gray-600 text-sm">
                                Register now and be part of a powerful global movement in{' '}
                                <span className="text-[#4a8f2f] font-semibold">health & wellness.</span>
                            </p>
                        </div>
                    </div>

                    {/* Divider */}
                    <div className="w-px bg-gray-200 self-stretch" />

                    {/* Right Side */}
                    <div className="flex-1">
                        <h3 className="text-gray-900 text-xl font-medium mb-1">Choose Exhibitor Category</h3>
                        <div className="w-8 h-[3px] bg-[#4a8f2f] rounded mb-5" />

                        <div className="grid grid-cols-2 gap-4">

                            {/* Domestic Exhibitor */}
                            <div
                                onClick={() => handleExhibitorTypeChange('domestic')}
                                className={`cursor-pointer transition-all duration-300 rounded-xl px-5 py-4 flex flex-col items-center text-center gap-2 border-2 ${exhibitorType === 'domestic' ? 'bg-[#f0f7e6] border-[#4a8f2f] shadow-lg scale-[1.02]' : 'bg-[#f0f7e6]/50 border-transparent hover:border-[#c8e6a0] hover:bg-[#f0f7e6]'}`}
                            >
                                <div className="flex items-center justify-center">
                                    <img src="/exhibition/dom.png" alt="Domestic" className="w-18 h-20 object-contain" />
                                </div>
                                <div>
                                    <p className="text-gray-800 font-bold text-base mb-1">Domestic Exhibitor</p>
                                    <p className="text-gray-700 text-xs">For exhibitors based in India</p>
                                </div>
                                <button
                                    type="button"
                                    className={`flex gap-2 items-center text-white text-xs font-medium uppercase tracking-widest px-5 py-2 rounded-lg transition-colors ${exhibitorType === 'domestic' ? 'bg-[#1a4d1a]' : 'bg-[#23471d] hover:bg-[#1a4d1a]'}`}
                                >
                                    {exhibitorType === 'domestic' ? 'Selected' : 'Register Now'}
                                    <span className="w-5 h-5 rounded-full bg-white flex items-center justify-center shrink-0">
                                        <svg className={`w-3 h-3 ${exhibitorType === 'domestic' ? 'text-[#1a4d1a]' : 'text-[#23471d]'}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M5 12h14M13 6l6 6-6 6" />
                                        </svg>
                                    </span>
                                </button>
                            </div>

                            {/* International Exhibitor */}
                            <div
                                onClick={() => handleExhibitorTypeChange('international')}
                                className={`cursor-pointer transition-all duration-300 rounded-xl px-5 py-4 flex flex-col items-center text-center gap-2 border-2 ${exhibitorType === 'international' ? 'bg-[#fff7f0] border-[#d26019] shadow-lg scale-[1.02]' : 'bg-[#fff7f0]/50 border-transparent hover:border-[#f5d5b0] hover:bg-[#fff7f0]'}`}
                            >
                                <div className="flex items-center justify-center">
                                    <img src="/exhibition/int.png" alt="International" className="w-18 h-20 object-contain" />
                                </div>
                                <div>
                                    <p className="text-gray-800 font-bold text-base mb-1">International Exhibitor</p>
                                    <p className="text-gray-700 text-xs">For exhibitors based outside India</p>
                                </div>
                                <button
                                    type="button"
                                    className={`flex items-center gap-2 text-white text-xs font-medium uppercase tracking-widest px-5 py-2 rounded-lg transition-colors ${exhibitorType === 'international' ? 'bg-[#c96a18]' : 'bg-[#e07820] hover:bg-[#c96a18]'}`}
                                >
                                    {exhibitorType === 'international' ? 'Selected' : 'Register Now'}
                                    <span className="w-5 h-5 rounded-full bg-white flex items-center justify-center shrink-0">
                                        <svg className={`w-3 h-3 ${exhibitorType === 'international' ? 'text-[#c96a18]' : 'text-[#e07820]'}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M5 12h14M13 6l6 6-6 6" />
                                        </svg>
                                    </span>
                                </button>
                            </div>

                        </div>
                    </div>

                </section>
            </SectionContainer>
            {/* -- MAIN CONTENT -- */}
            <section className="pt-4 pb-12 relative overflow-hidden">

                <div className="space-y-4">
                    {/* -- REGISTRATION FLOW -- */}
                    <SectionContainer className="w-full">


                        <div ref={formRef} className="scroll-mt-10">
                            <AnimatePresence mode="wait">
                                {!exhibitorType ? null : submitted ? (
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
                                        className="bg-white border border-slate-500 shadow-2xl overflow-hidden rounded-sm"
                                    >
                                        <div className="bg-green-800 px-6 py-1 text-white flex justify-between items-center border-b-2 border-[#a8d060]">
                                            <div>
                                                <h2 className="text-base font-medium uppercase tracking-wider text-white">
                                                    {exhibitorType === 'domestic' ? 'Domestic Exhibitor Registration' : 'International Exhibitor Registration'}
                                                </h2>
                                                <p className="text-xs text-[#a8d060] uppercase tracking-[0.3em] font-semibold mb-1">
                                                    9th Edition of International Health & Wellness Expo 2026 (IHWE Global Edition)
                                                </p>
                                            </div>
                                            <ShieldCheck className="text-[#a8d060]" size={22} />
                                        </div>
                                        <form onSubmit={handleSubmit} className="px-8 pt-4 pb-8 space-y-4 font-inter bg-white">
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
                                                                        <td className="py-2 px-6 text-[12px] font-medium border-r border-slate-200 uppercase">{type} (min. {type?.toLowerCase().includes('raw') ? '9' : '9'} sq m.)</td>
                                                                        {exhibitorType === 'domestic' && (
                                                                            <td className="py-2 px-6 text-[12px] font-medium uppercase">
                                                                                {inrRate ? `INR ${inrRate.ratePerSqm.toLocaleString()} / sq m.` : 'N/A'}
                                                                            </td>
                                                                        )}
                                                                        {exhibitorType === 'international' && (
                                                                            <td className="py-2 px-6 text-[12px] font-medium uppercase">
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
                                            <div className="space-y-1.5 pt-0.5">
                                                <div className="pb-1 border-b border-slate-500">
                                                    <h3 className="text-sm font-bold text-[#d26019] uppercase tracking-[0.05em]" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Exhibitor Details</h3>
                                                </div>

                                                <div className="grid grid-cols-1 md:grid-cols-5 gap-x-6 gap-y-2">
                                                    <div>
                                                        <Label className={labelClasses}>COMPANY NAME <span className="text-red-500">*</span></Label>
                                                        <Input required name="exhibitorName" value={formData.exhibitorName} onChange={handleInputChange} placeholder="Write Here.." className={inputClasses} />
                                                    </div>
                                                    <div>
                                                        <Label className={labelClasses}>TYPE OF BUSINESS <span className="text-red-500">*</span></Label>
                                                        <Select onValueChange={(v) => handleSelectChange('typeOfBusiness', v)} value={formData.typeOfBusiness}>
                                                            <SelectTrigger className={inputClasses}>
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
                                                        <Label className={labelClasses}>INDUSTRY/SECTOR <span className="text-red-500">*</span></Label>
                                                        <Select onValueChange={(v) => handleSelectChange('industrySector', v)} value={formData.industrySector}>
                                                            <SelectTrigger className={inputClasses}>
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
                                                        <Label className={labelClasses}>WEBSITE <span className="text-red-500">*</span></Label>
                                                        <Input required name="website" value={formData.website} onChange={handleInputChange} placeholder="Write Here.." className={inputClasses} />
                                                    </div>

                                                    <div>
                                                        <Label className={labelClasses}>EXHIBITOR ADDRESS <span className="text-red-500">*</span></Label>
                                                        <Input required name="address" value={formData.address} onChange={handleInputChange} placeholder="Write Here.." className={inputClasses} />
                                                    </div>
                                                    <div>
                                                        <Label className={labelClasses}>COUNTRY <span className="text-red-500">*</span></Label>
                                                        <Select onValueChange={(v) => handleSelectChange('country', v)} value={formData.country}>
                                                            <SelectTrigger className={inputClasses}>
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
                                                        <Label className={labelClasses}>{exhibitorType === 'domestic' ? 'STATE' : 'STATE/PROVINCE'} <span className="text-red-500">*</span></Label>
                                                        <Select onValueChange={(v) => handleSelectChange('state', v)} value={formData.state} disabled={!formData.country}>
                                                            <SelectTrigger className={inputClasses}>
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
                                                        <Label className={labelClasses}>CITY <span className="text-red-500">*</span></Label>
                                                        <Select onValueChange={(v) => handleSelectChange('city', v)} value={formData.city} disabled={!formData.state}>
                                                            <SelectTrigger className={inputClasses}>
                                                                <SelectValue placeholder="Select Here" />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                {filteredCities.map(c => (
                                                                    <SelectItem key={c._id} value={c.name} className="text-xs">{c.name}</SelectItem>
                                                                ))}
                                                            </SelectContent>
                                                        </Select>
                                                    </div>

                                                    {/* <div>
                                                        <Label className={labelClasses}>NATURE OF BUSINESS <span className="text-red-500">*</span></Label>
                                                        <Select onValueChange={(v) => handleSelectChange('natureOfBusiness', v)} value={formData.natureOfBusiness}>
                                                            <SelectTrigger className={inputClasses}>
                                                                <SelectValue placeholder="Select Here" />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                {NATURE_OF_BUSINESS.map(n => (
                                                                    <SelectItem key={n} value={n} className="text-xs">{n}</SelectItem>
                                                                ))}
                                                            </SelectContent>
                                                        </Select>
                                                    </div> */}
                                                    <div>
                                                        <Label className={labelClasses}>PINCODE/Postal Code <span className="text-red-500">*</span></Label>
                                                        <Input required name="pincode" value={formData.pincode} onChange={(e) => setFormData(prev => ({ ...prev, pincode: e.target.value.replace(/\D/g, '') }))} placeholder="Write Here.." className={inputClasses} inputMode="numeric" />
                                                    </div>
                                                    <div>
                                                        <Label className={labelClasses}>LANDLINE NO.</Label>
                                                        <Input name="landlineNo" value={formData.landlineNo} onChange={handleInputChange} placeholder="Write Here.." className={inputClasses} inputMode="numeric" />
                                                    </div>
                                                </div>

                                                {/* -- REGISTRANT TYPE + GST / PAN / AADHAAR -- */}
                                                <div className="mt-3 p-3 border border-slate-300 rounded-sm bg-slate-50/60">
                                                    {/* Radio buttons */}
                                                    <p className="text-[10px] font-black text-slate-700 uppercase tracking-widest mb-2">Exhibitor Registration Type <span className="text-red-500">*</span></p>
                                                    <div className="flex gap-6 mb-3">
                                                        <label className="flex items-center gap-2 cursor-pointer group">
                                                            <input
                                                                type="radio"
                                                                name="registrantType"
                                                                value="registered"
                                                                checked={formData.registrantType === 'registered'}
                                                                onChange={() => setFormData(prev => ({ ...prev, registrantType: 'registered', panNo: '', aadhaarNo: '' }))}
                                                                className="accent-[#23471d] w-4 h-4"
                                                            />
                                                            <span className="text-[11px] font-bold text-slate-800 group-hover:text-[#23471d] transition-colors">
                                                                Registered Exhibitor
                                                                <span className="ml-1.5 text-[9px] font-black text-[#23471d] bg-green-50 border border-green-200 px-1.5 py-0.5 rounded-[2px] uppercase tracking-wider">GST Required</span>
                                                            </span>
                                                        </label>
                                                        <label className="flex items-center gap-2 cursor-pointer group">
                                                            <input
                                                                type="radio"
                                                                name="registrantType"
                                                                value="unregistered"
                                                                checked={formData.registrantType === 'unregistered'}
                                                                onChange={() => setFormData(prev => ({ ...prev, registrantType: 'unregistered', gstNo: '' }))}
                                                                className="accent-[#d26019] w-4 h-4"
                                                            />
                                                            <span className="text-[11px] font-bold text-slate-800 group-hover:text-[#d26019] transition-colors">
                                                                Unregistered Buyer
                                                                <span className="ml-1.5 text-[9px] font-black text-[#d26019] bg-orange-50 border border-orange-200 px-1.5 py-0.5 rounded-[2px] uppercase tracking-wider">PAN + Aadhaar Required</span>
                                                            </span>
                                                        </label>
                                                    </div>

                                                    {/* Conditional fields */}
                                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-x-5 gap-y-2">
                                                        {formData.registrantType === 'registered' ? (
                                                            <>
                                                                <div>
                                                                    <Label className={labelClasses}>GST NO. (GSTIN) <span className="text-red-500">*</span></Label>
                                                                    <Input
                                                                        required
                                                                        name="gstNo"
                                                                        value={formData.gstNo}
                                                                        onChange={(e) => setFormData(prev => ({ ...prev, gstNo: e.target.value.toUpperCase() }))}
                                                                        placeholder="e.g. 07AABCU9603R1ZX"
                                                                        maxLength={15}
                                                                        className={inputClasses}
                                                                    />
                                                                </div>
                                                                <div>
                                                                    <Label className={labelClasses}>FASCIA NAME <span className="text-red-500">*</span></Label>
                                                                    <Input required name="fasciaName" value={formData.fasciaName} onChange={handleInputChange} placeholder="Name on stall board" className={inputClasses} />
                                                                </div>
                                                            </>
                                                        ) : (
                                                            <>
                                                                <div>
                                                                    <Label className={labelClasses}>PAN CARD NO. <span className="text-red-500">*</span></Label>
                                                                    <Input
                                                                        required
                                                                        name="panNo"
                                                                        value={formData.panNo}
                                                                        onChange={(e) => setFormData(prev => ({ ...prev, panNo: e.target.value.toUpperCase() }))}
                                                                        placeholder="e.g. ABCDE1234F"
                                                                        maxLength={10}
                                                                        className={inputClasses}
                                                                    />
                                                                </div>
                                                                <div>
                                                                    <Label className={labelClasses}>AADHAAR CARD NO. <span className="text-red-500">*</span></Label>
                                                                    <Input
                                                                        required
                                                                        name="aadhaarNo"
                                                                        value={formData.aadhaarNo}
                                                                        onChange={(e) => setFormData(prev => ({ ...prev, aadhaarNo: e.target.value.replace(/\D/g, '').slice(0, 12) }))}
                                                                        placeholder="12-digit Aadhaar number"
                                                                        maxLength={12}
                                                                        inputMode="numeric"
                                                                        className={inputClasses}
                                                                    />
                                                                </div>
                                                                <div>
                                                                    <Label className={labelClasses}>FASCIA NAME <span className="text-red-500">*</span></Label>
                                                                    <Input required name="fasciaName" value={formData.fasciaName} onChange={handleInputChange} placeholder="Name on stall board" className={inputClasses} />
                                                                </div>
                                                            </>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>

                                            {/* -- EXHIBITOR CONTACT DETAILS -- */}
                                            <div className="space-y-1.5 pt-0.5">
                                                <div className="pb-1 border-b border-slate-500">
                                                    <h3 className="text-sm font-bold text-[#d26019] uppercase tracking-[0.05em]" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Exhibitor Contact Details</h3>
                                                </div>

                                                {/* First Contact Person */}
                                                <div className="space-y-4">
                                                    <h4 className="text-[13px] font-bold text-slate-900 border-l-4 border-[#23471d] pl-3 uppercase tracking-wider">First Contact Person Details</h4>
                                                    <div className="grid grid-cols-1 md:grid-cols-4 gap-x-5 gap-y-2">
                                                        <div>
                                                            <Label className={labelClasses}>TITLE <span className="text-red-500">*</span></Label>
                                                            <Select onValueChange={(v) => handleSelectChange('contact1.title', v)} value={formData.contact1.title}>
                                                                <SelectTrigger className={inputClasses}>
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
                                                            <Label className={labelClasses}>FIRST NAME <span className="text-red-500">*</span></Label>
                                                            <Input required name="contact1.firstName" value={formData.contact1.firstName} onChange={handleInputChange} placeholder="Write Here.." className={inputClasses} />
                                                        </div>
                                                        <div>
                                                            <Label className={labelClasses}>LAST NAME <span className="text-red-500">*</span></Label>
                                                            <Input required name="contact1.lastName" value={formData.contact1.lastName} onChange={handleInputChange} placeholder="Write Here.." className={inputClasses} />
                                                        </div>
                                                        <div>
                                                            <Label className={labelClasses}>EMAIL <span className="text-red-500">*</span></Label>
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
                                                            <Label className={labelClasses}>DESIGNATION <span className="text-red-500">*</span></Label>
                                                            <Input required name="contact1.designation" value={formData.contact1.designation} onChange={handleInputChange} placeholder="Write Here.." className={inputClasses} />
                                                        </div>
                                                        <div>
                                                            <Label className={labelClasses}>MOBILE <span className="text-red-500">*</span></Label>
                                                            <div className="flex gap-1">
                                                                <Input
                                                                    required
                                                                    name="contact1.mobile"
                                                                    value={formData.contact1.mobile}
                                                                    onChange={handleInputChange}
                                                                    placeholder={exhibitorType === 'domestic' ? "10-digit number" : "WhatsApp Number"}
                                                                    inputMode={exhibitorType === 'domestic' ? 'numeric' : 'tel'}
                                                                    maxLength={exhibitorType === 'domestic' ? 10 : undefined}
                                                                    className={`h-8 border-slate-400 rounded-[2px] bg-white text-[12px] font-medium text-slate-900 flex-1 ${phoneVerified ? 'border-green-500' : ''}`}
                                                                    readOnly={phoneVerified}
                                                                />
                                                                {!phoneVerified && (
                                                                    <Button type="button" onClick={handleSendPhoneOtp} disabled={isPhoneLoading || phoneTimer > 0} className="h-8 bg-slate-800 text-[10px] font-bold uppercase rounded-[2px] px-3">
                                                                        {phoneTimer > 0 ? `${phoneTimer}s` : 'Get OTP'}
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
                                                            <Label className={labelClasses}>ALTERNATE NO. <span className="text-red-500">*</span></Label>
                                                            <Input required name="contact1.alternateNo" value={formData.contact1.alternateNo} onChange={handleInputChange} placeholder={exhibitorType === 'domestic' ? "10-digit number" : "Write Here.."} className={inputClasses} inputMode={exhibitorType === 'domestic' ? 'numeric' : 'text'} maxLength={exhibitorType === 'domestic' ? 10 : undefined} />
                                                        </div>
                                                    </div>
                                                </div>


                                            </div>

                                            {/* -- PARTICIPATION DETAILS SECTION -- */}
                                            <div className="space-y-1.5 pt-2 border-t border-slate-500">
                                                <div className="pb-1 border-b border-slate-500">
                                                    <h3 className="text-sm font-bold text-[#d26019] uppercase tracking-[0.05em]" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Participation Details</h3>
                                                </div>

                                                <div className="space-y-4">
                                                    {/* Selection Controls */}
                                                    <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-5 gap-y-2">
                                                        <div className="space-y-1.5">
                                                            <Label className={labelClasses}>STALL FOR <span className="text-red-500">*</span></Label>
                                                            <Select onValueChange={(v) => handleStallChange(v)} value={formData.participation.stallNo}>
                                                                <SelectTrigger className={inputClasses}>
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
                                                            <Label className={labelClasses}>STALL SIZE <span className="text-red-500">*</span></Label>
                                                            <Input readOnly value={formData.participation.stallSize} className="h-8 border-slate-400 rounded-[2px] bg-slate-50 text-[12px] font-bold text-slate-900" />
                                                        </div>
                                                        <div className="space-y-1.5">
                                                            <Label className={labelClasses}>STALL CATEGORY <span className="text-red-500">*</span></Label>
                                                            <Select
                                                                onValueChange={(v) => {
                                                                    setFormData(prev => ({
                                                                        ...prev,
                                                                        participation: { ...prev.participation, stallType: v }
                                                                    }));
                                                                }}
                                                                value={formData.participation.stallType}
                                                            >
                                                                <SelectTrigger className={inputClasses}>
                                                                    <SelectValue placeholder="Select Category" />
                                                                </SelectTrigger>
                                                                <SelectContent>
                                                                    <SelectItem value="Shell Space" className="text-xs">Shell Space (Built-up)</SelectItem>
                                                                    <SelectItem value="Raw Space" className="text-xs">Raw Space (Plot)</SelectItem>
                                                                </SelectContent>
                                                            </Select>
                                                        </div>
                                                        <div className="space-y-1.5">
                                                            <Label className={labelClasses}>PL SCHEME <span className="text-red-500">*</span></Label>
                                                            <Input readOnly value={formData.participation.stallScheme || "N/A"} className="h-8 border-slate-400 rounded-[2px] bg-slate-50 text-[12px] font-bold text-slate-900" />
                                                        </div>
                                                        <div className="space-y-1.5">
                                                            <Label className={labelClasses}>DIMENSION <span className="text-red-500">*</span></Label>
                                                            <Input readOnly value={formData.participation.dimension} className="h-8 border-slate-400 rounded-[2px] bg-slate-50 text-[12px] font-bold text-slate-900" />
                                                        </div>
                                                        <div className="space-y-1.5">
                                                            <Label className={labelClasses}>STALL NO. <span className="text-red-500">*</span></Label>
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
                                                                        {formData.participation.currency === 'INR' ? '\u20b9' : '\$'} {fmtAmt(formData.participation.rate * formData.participation.stallSize)}
                                                                    </span>
                                                                </div>
                                                                {selectedStall?.incrementPercentage > 0 && (
                                                                    <div className="flex flex-col gap-1 min-w-[160px] text-orange-600">
                                                                        <span className="text-[10px] font-bold uppercase tracking-widest">PL Increment ({selectedStall.incrementPercentage}%)</span>
                                                                        <span className="text-lg font-bold">+ {formData.participation.currency === 'INR' ? '\u20b9' : '\$'} {fmtAmt(formData.participation.rate * formData.participation.stallSize * selectedStall.incrementPercentage / 100)}</span>
                                                                    </div>
                                                                )}
                                                                <div className="flex flex-col gap-1 min-w-[160px] border-l border-slate-200 pl-4">
                                                                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">GST (18%)</span>
                                                                    <span className="text-lg font-bold text-slate-900">
                                                                        {formData.participation.currency === 'INR' ? '\u20b9' : '\$'} {fmtAmt(formData.participation.total - formData.participation.amount)}
                                                                    </span>
                                                                </div>
                                                                <div className="flex flex-col gap-1 min-w-[160px] border-l border-slate-200 pl-4 ml-auto">
                                                                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Grand Total <span className="text-[8px] normal-case text-slate-500 ml-1">Tax Included</span></span>
                                                                    <span className="text-2xl font-bold text-[#23471d]">
                                                                        {formData.participation.currency === 'INR' ? '\u20b9' : '\$'} {fmtAmt(formData.participation.total)}
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="space-y-1.5 pt-2 border-t border-slate-500">
                                                <h3 className="text-sm font-bold text-[#d26019] uppercase tracking-[0.05em] border-b border-slate-500 pb-1 mb-2">
                                                    Exhibitor Category
                                                </h3>

                                                <div className="grid grid-cols-4 gap-4">
                                                    <div>
                                                        <Label className={labelClasses}>PRIMARY CATEGORY <span className="text-red-500">*</span></Label>
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
                                                        <Label className={labelClasses}>SUB-CATEGORY <span className="text-red-500">*</span></Label>
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
                                                        <Label className={labelClasses}>REFERRAL CHANNEL <span className="text-red-500">*</span></Label>
                                                        <Select onValueChange={(v) => handleSelectChange('referredBy', v)} value={formData.referredBy}>
                                                            <SelectTrigger className={inputClasses}>
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
                                                        <Label className={labelClasses}>SPOKEN WITH <span className="text-red-500">*</span></Label>
                                                        <Select onValueChange={(v) => handleSelectChange('spokenWith', v)} value={formData.spokenWith}>
                                                            <SelectTrigger className={inputClasses}>
                                                                <SelectValue placeholder="Select Staff Member" />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                {marketingStaff.map(s => (
                                                                    <SelectItem key={s._id} value={s.username} className="text-xs">
                                                                        {s.fullName ? `${s.fullName} (${s.username})` : s.username}
                                                                    </SelectItem>
                                                                ))}
                                                                <SelectItem value="Direct" className="text-xs underline font-bold">No One (Directly Booking)</SelectItem>
                                                            </SelectContent>
                                                        </Select>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* -- FINAL BOOKING CONTROL -- */}
                                            <div className="pt-2 border-t border-slate-500">
                                                <div className="flex flex-col gap-4">
                                                    <div className="space-y-3">
                                                        <div className="space-y-2">
                                                            <label className="flex items-start gap-3 p-3 bg-slate-50 border border-slate-200 rounded-sm cursor-pointer group hover:bg-slate-100 transition-all">
                                                                <Checkbox required className="mt-0.5 border-slate-400 peer-checked:bg-[#23471d]" />
                                                                <span className="text-[11px] font-medium text-slate-600 group-hover:text-slate-900 transition-colors leading-relaxed">
                                                                    I hereby confirm that the information provided is accurate. I have read and agree to the <Link to={`/terms-of-service?page=exhibitor-registration&eventId=${selectedEventId}`} className="text-blue-600 font-bold hover:underline" target="_blank">Terms & Conditions</Link> and the exhibition policy for IHWE Stand Booking.
                                                                </span>
                                                            </label>
                                                            <label className="flex items-start gap-3 p-3 bg-slate-50 border border-slate-200 rounded-sm cursor-pointer group hover:bg-slate-100 transition-all">
                                                                <Checkbox required className="mt-0.5 border-slate-400 peer-checked:bg-[#23471d]" />
                                                                <span className="text-[11px] font-medium text-slate-600 group-hover:text-slate-900 transition-colors leading-relaxed">
                                                                    I have read and agree to the <Link to="/refund-policy" className="text-blue-600 font-bold hover:underline" target="_blank">Refund & Cancellation Policy</Link> for IHWE Stand Booking.
                                                                </span>
                                                            </label>
                                                            <label className="flex items-start gap-3 p-3 bg-slate-50 border border-slate-200 rounded-sm cursor-pointer group hover:bg-slate-100 transition-all">
                                                                <Checkbox required className="mt-0.5 border-slate-400 peer-checked:bg-[#23471d]" />
                                                                <span className="text-[11px] font-medium text-slate-600 group-hover:text-slate-900 transition-colors leading-relaxed">
                                                                    I have read and agree to the <Link to="/privacy-policy" className="text-blue-600 font-bold hover:underline" target="_blank">Privacy Policy</Link> of IHWE.
                                                                </span>
                                                            </label>
                                                        </div>
                                                    </div>

                                                    {/* Right: Summary Card */}
                                                    <div className="w-full">
                                                        <div className="bg-white border border-slate-200 p-4 rounded-sm shadow-sm">
                                                            <div className="flex justify-between items-center mb-4">
                                                                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Financial Breakdown</h3>
                                                                <div className="flex gap-3 items-end">
                                                                    {/* Payment Plan Buttons — only 2 choices: Full or Installment */}
                                                                    <div className="flex flex-col gap-1">
                                                                        <span className="text-[9px] font-bold text-slate-400 uppercase">Payment Plan</span>
                                                                        <div className="flex gap-1">
                                                                            {(() => {
                                                                                const ev = events.find((e: any) => e._id === selectedEventId);
                                                                                const plans = ev?.paymentPlans || [];
                                                                                const fullPlan = plans.find((p: any) => Number(p.percentage) === 100 || p.id === 'full');
                                                                                // First installment phase (lowest %)
                                                                                const firstInstallPlan = plans
                                                                                    .filter((p: any) => Number(p.percentage) < 100)
                                                                                    .sort((a: any, b: any) => Number(a.percentage) - Number(b.percentage))[0];
                                                                                const isFullSelected = formData.paymentPlanType === 'full' || formData.paymentPlanType === fullPlan?.id;
                                                                                return (
                                                                                    <>
                                                                                        {/* Full Payment */}
                                                                                        <button type="button"
                                                                                            onClick={() => setFormData(prev => ({
                                                                                                ...prev,
                                                                                                paymentPlanType: fullPlan?.id || 'full',
                                                                                                paymentPlanLabel: fullPlan?.label || 'Full Payment'
                                                                                            }))}
                                                                                            className={`px-3 py-1.5 text-[10px] font-black rounded-[2px] border transition-all ${isFullSelected ? 'bg-[#23471d] text-white border-[#23471d]' : 'bg-white text-slate-600 border-slate-300 hover:border-[#23471d]'}`}>
                                                                                            Full Payment{settings?.fullPaymentDiscount > 0 ? ` (-${settings.fullPaymentDiscount}%)` : ''}
                                                                                        </button>
                                                                                        {/* Installment — sets Phase 1 automatically */}
                                                                                        {firstInstallPlan && (
                                                                                            <button type="button"
                                                                                                onClick={() => setFormData(prev => ({
                                                                                                    ...prev,
                                                                                                    paymentPlanType: firstInstallPlan.id,
                                                                                                    paymentPlanLabel: firstInstallPlan.label
                                                                                                }))}
                                                                                                className={`px-3 py-1.5 text-[10px] font-black rounded-[2px] border transition-all ${!isFullSelected ? 'bg-[#1a3a6b] text-white border-[#1a3a6b]' : 'bg-white text-slate-600 border-slate-300 hover:border-[#1a3a6b]'}`}>
                                                                                                Installment ({firstInstallPlan.percentage}% Now)
                                                                                            </button>
                                                                                        )}
                                                                                    </>
                                                                                );
                                                                            })()}
                                                                        </div>
                                                                    </div>
                                                                    {/* TDS on right */}
                                                                    <div className="flex flex-col gap-1">
                                                                        <span className="text-[9px] font-bold text-slate-400 uppercase">TDS (%)</span>
                                                                        <select
                                                                            value={formData.chosenTdsPercent}
                                                                            onChange={(e) => setFormData(prev => ({ ...prev, chosenTdsPercent: Number(e.target.value) }))}
                                                                            className="h-7 px-2 border border-slate-300 rounded-[2px] text-[11px] font-bold text-slate-900 bg-white outline-none focus:border-[#23471d]"
                                                                        >
                                                                            <option value={0}>0%</option>
                                                                            <option value={1}>1%</option>
                                                                            <option value={2}>2%</option>
                                                                            <option value={10}>10%</option>
                                                                        </select>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            <div className="space-y-2 text-xs border-t border-slate-100 pt-3">
                                                                <div className="flex justify-between items-center">
                                                                    <span className="text-slate-500 font-medium">Gross Cost (Space + PL)</span>
                                                                    <span className="font-bold text-slate-900">{formData.participation.currency === 'INR' ? '₹' : '$'} {fmtAmt(formData.financeBreakdown.grossAmount)}</span>
                                                                </div>

                                                                {formData.financeBreakdown.stallDiscountAmount > 0 && (
                                                                    <div className="flex justify-between items-center text-green-600 bg-green-50 px-2 py-1 rounded-sm border border-green-100 italic">
                                                                        <span className="text-[10px] font-bold">Stall Discount ({formData.financeBreakdown.stallDiscountPercent}%)</span>
                                                                        <span className="font-bold">- {formData.participation.currency === 'INR' ? '₹' : '$'} {fmtAmt(formData.financeBreakdown.stallDiscountAmount)}</span>
                                                                    </div>
                                                                )}

                                                                {formData.financeBreakdown.discountAmount > 0 && (
                                                                    <div className="flex justify-between items-center text-[#d26019] bg-orange-50 px-2 py-1 rounded-sm border border-orange-100 italic">
                                                                        <span className="text-[10px] font-bold">Full Payment Discount ({formData.financeBreakdown.discountPercent}%)</span>
                                                                        <span className="font-bold">- {formData.participation.currency === 'INR' ? '₹' : '$'} {fmtAmt(formData.financeBreakdown.discountAmount)}</span>
                                                                    </div>
                                                                )}

                                                                <div className="flex justify-between items-center border-t border-slate-100 pt-1 text-slate-400">
                                                                    <span className="text-[10px] uppercase font-bold">Net Taxable Value</span>
                                                                    <span className="font-bold">{formData.participation.currency === 'INR' ? '₹' : '$'} {fmtAmt(formData.financeBreakdown.subtotal)}</span>
                                                                </div>

                                                                <div className="flex justify-between items-center">
                                                                    <span className="text-slate-500 font-medium text-[11px]">GST (18%)</span>
                                                                    <span className="font-bold text-slate-900">+ {formData.participation.currency === 'INR' ? '₹' : '$'} {fmtAmt(formData.financeBreakdown.gstAmount)}</span>
                                                                </div>

                                                                {formData.financeBreakdown.tdsAmount > 0 && (
                                                                    <div className="flex justify-between items-center text-red-600 font-medium">
                                                                        <span className="text-[11px]">TDS Deduction ({formData.financeBreakdown.tdsPercent}%)</span>
                                                                        <span className="font-bold">- {formData.participation.currency === 'INR' ? '₹' : '$'} {fmtAmt(formData.financeBreakdown.tdsAmount)}</span>
                                                                    </div>
                                                                )}

                                                                <div className="flex justify-between items-center border-t border-slate-200 pt-2 bg-slate-50 px-2 py-1.5 rounded-sm">
                                                                    <span className="font-black text-slate-700 uppercase tracking-tighter text-[11px]">Total Net Payable</span>
                                                                    <span className="font-black text-[15px] text-[#23471d]">{formData.participation.currency === 'INR' ? '₹' : '$'} {fmtAmt(formData.financeBreakdown.netPayable)}</span>
                                                                </div>

                                                                {formData.balanceAmount > 0 && (
                                                                    <div className="flex justify-between items-center text-[#d26019] bg-orange-50/50 px-2 py-1 rounded-sm">
                                                                        <span className="font-bold uppercase text-[9px]">Balance Payment Later</span>
                                                                        <span className="font-bold text-[11px]">{formData.participation.currency === 'INR' ? '₹' : '$'} {fmtAmt(formData.balanceAmount)}</span>
                                                                    </div>
                                                                )}
                                                            </div>

                                                            <div className="mt-4 p-3 bg-[#23471d] rounded-sm text-white shadow-lg">
                                                                <div className="flex justify-between items-center">
                                                                    <div>
                                                                        <p className="text-[10px] font-bold uppercase opacity-80">{formData.balanceAmount === 0 ? 'Net Due Now' : 'Advance Due Now'}</p>
                                                                        <p className="text-[8px] font-medium uppercase opacity-60">Verified Transaction</p>
                                                                    </div>
                                                                    <div className="text-right">
                                                                        <p className="text-2xl font-black leading-none">{formData.participation.currency === 'INR' ? '₹' : '$'} {fmtAmt(formData.amountPaid)}</p>
                                                                    </div>
                                                                </div>

                                                                {formData.paymentMode === 'online' && formData.amountPaid > 0 && (
                                                                    <div className="mt-3 pt-2 border-t border-white/20 space-y-1.5">
                                                                        <div className="flex justify-between items-center opacity-75">
                                                                            <p className="text-[9px] font-bold uppercase">+ 2.5% Razorpay Gateway Fee</p>
                                                                            <p className="text-[10px] font-bold">
                                                                                {formData.participation.currency === 'INR' ? '₹' : '$'} {Math.round(formData.amountPaid * 0.025).toLocaleString()}
                                                                            </p>
                                                                        </div>
                                                                        <div className="flex justify-between items-center border-t border-white/40 pt-1.5 text-yellow-300">
                                                                            <div>
                                                                                <p className="text-[10px] font-black uppercase tracking-wider">Total Charged by Gateway</p>
                                                                                <p className="text-[8px] opacity-60 font-medium">(Our invoice: {formData.participation.currency === 'INR' ? '₹' : '$'}{fmtAmt(formData.amountPaid)} — 2.5% fee goes to Razorpay)</p>
                                                                            </div>
                                                                            <p className="text-[14px] font-black">
                                                                                {formData.participation.currency === 'INR' ? '₹' : '$'} {Math.round(formData.amountPaid * 1.025).toLocaleString()}
                                                                            </p>
                                                                        </div>
                                                                    </div>
                                                                )}
                                                                <div className="pt-4 flex flex-col items-center">
                                                                    <button
                                                                        type="submit"
                                                                        disabled={isLoading || !formData.participation.stallNo}
                                                                        className="w-full max-w-56 h-12 rounded-sm bg-[#a3510f] hover:bg-[#1a3516] text-white font-bold text-xs uppercase tracking-widest transition-all duration-300 shadow-xl flex items-center justify-center gap-3 group disabled:opacity-70 disabled:cursor-not-allowed"
                                                                    >
                                                                        {isLoading ? (
                                                                            <><div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" /><span>PROCESSING...</span></>
                                                                        ) : (
                                                                            <>PROCEED FOR PAYMENT <Send size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" /></>
                                                                        )}
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </form>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </SectionContainer>
                </div>

            </section>
        </div>
    );
};

export default BookAStand;
