import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { partnerRegistrationApi, otpApi } from "@/lib/api";
import { motion } from "framer-motion";

import {
    Building2, User, MapPin, Settings, Award, Upload, Handshake, FileText, ShieldCheck,
    ChevronRight, RotateCcw, ArrowRight, Calendar, Users, Globe, Eye, TrendingUp,
    Mail, Phone, Clock, ExternalLink
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Swal from "sweetalert2";
import heroImg from "@/assets/partnerRegistration/new.jpeg";
import MiddleImage from "@/assets/partnerRegistration/MiddleImage.png";
import BottomImage from "@/assets/partnerRegistration/BottomImage.png";



const BUSINESS_CATEGORIES = [
    "Event Management", "Travel & Tourism", "Hospitality", "Logistics & Freight",
    "Printing & Branding", "Stall Fabrication", "IT & Technology", "Media & Advertising",
    "Catering & Food Services", "Security Services", "Others"
];

const SERVICES_LIST = [
    "Hotel Booking Assistance", "Flight Booking", "Airport Transfers", "Local Transportation",
    "Exhibition Stall Fabrication", "Custom Stall Designing", "Printing & Branding Solutions",
    "Logistics & Freight Handling", "Warehousing Support", "Hospitality & Concierge",
    "Event Staffing", "Other Services"
];

const PARTNERSHIP_TYPES = [
    "Official Hotel Partner", "Official Travel Partner", "Official Logistics Partner",
    "Official Stall Fabrication Partner", "Official Printing Partner", "Official Hospitality Partner",
    "Preferred Vendor Partner"
];

const EXPERIENCE_OPTIONS = [
    "Less than 1 year", "1-3 years", "3-5 years", "5-10 years", "10+ years"
];

const DOC_FIELDS = [
    { key: "companyProfile", label: "Company Profile" },
    { key: "gstCertificate", label: "GST Certificate" },
    { key: "panCard", label: "PAN Card" },
    { key: "msmeCertificate", label: "MSME Certificate" },
    { key: "portfolio", label: "Portfolio / Brochure" },
    { key: "visitingCard", label: "Visiting Card" },
];

const LOCATION_DATA: Record<string, { states: string[]; cities: Record<string, string[]> }> = {
    "India": {
        states: ["Delhi", "Maharashtra", "Karnataka", "Tamil Nadu", "West Bengal"],
        cities: {
            "Delhi": ["New Delhi", "North Delhi", "South Delhi"],
            "Maharashtra": ["Mumbai", "Pune", "Nagpur", "Thane"],
            "Karnataka": ["Bangalore", "Mysore", "Hubli", "Mangalore"],
            "Tamil Nadu": ["Chennai", "Coimbatore", "Madurai"],
            "West Bengal": ["Kolkata", "Howrah", "Durgapur"]
        }
    },
    "United Arab Emirates": {
        states: ["Dubai", "Abu Dhabi", "Sharjah", "Ajman"],
        cities: {
            "Dubai": ["Dubai City", "Marina", "Deira"],
            "Abu Dhabi": ["Abu Dhabi City", "Al Ain", "Yas Island"],
            "Sharjah": ["Sharjah City", "Khor Fakkan"],
            "Ajman": ["Ajman City"]
        }
    },
    "Singapore": {
        states: ["Central Region", "East Region", "North Region"],
        cities: {
            "Central Region": ["Singapore City", "Bukit Merah"],
            "East Region": ["Tampines", "Pasir Ris"],
            "North Region": ["Woodlands", "Yishun"]
        }
    }
};

const inputCls = "rounded-[4px] border-slate-300 h-9 focus:border-[#0b1a3a] focus:ring-[#0b1a3a]/10 transition-all text-[13px] bg-white placeholder:text-slate-400 placeholder:text-[13px] text-slate-900 font-medium shadow-none outline-none px-2.5 py-0 w-full";
const labelCls = "text-[12px] font-black text-[#003399] mb-0.5 block";

const SectionHeader = ({ num, icon: Icon, title }: { num: number; icon: any; title: string }) => (
    <div className="flex items-center gap-2 mb-4">
        <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full border-2 border-green-500 flex items-center justify-center bg-white shadow-sm">
                <Icon className="w-4 h-4 text-[#2e7d32]" />
            </div>
            <div className="w-6 h-6 rounded-full bg-[#2e7d32] text-white flex items-center justify-center text-[12px] font-semibold">{num}</div>
        </div>
        <h3 className="text-[15px] font-bold text-[#003399] uppercase tracking-tight">{title}</h3>
    </div>
);

const initialForm = {
    companyName: "", businessCategory: "", website: "", yearEstablished: "", gstNumber: "", msmeRegistration: "",
    fullName: "", designation: "", mobile: "", whatsapp: "", email: "",
    officeAddress: "", city: "", state: "", country: "", pinCode: "",
    selectedServices: [] as string[], otherService: "",
    experience: "", majorClients: "", canHandleInternational: "", operationalCities: "",
    documents: {} as Record<string, File | null>,
    partnershipInterests: [] as string[],
    additionalInfo: "",
    declaration: false,
    otpCode: "",
    isOtpSent: false,
    isOtpVerified: false,
    otpInput: "",
    mobileOtpCode: "",
    isMobileOtpSent: false,
    isMobileOtpVerified: false,
    mobileOtpInput: ""
};

const PartnerRegistration = () => {
    const [form, setForm] = useState(initialForm);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [loading, setLoading] = useState(false);
    const countries = Object.keys(LOCATION_DATA);
    const states = form.country ? LOCATION_DATA[form.country]?.states || [] : [];
    const cities = form.state && form.country ? LOCATION_DATA[form.country]?.cities[form.state] || [] : [];

    const [searchParams] = useSearchParams();
    const referrerType = searchParams.get("type");

    const filteredServices = (() => {
        if (!referrerType) return SERVICES_LIST;
        const type = referrerType.toLowerCase();
        switch (type) {
            case "hotel":
                return ["Hotel Booking Assistance", "Hospitality & Concierge", "Other Services"];
            case "fabrication":
                return ["Exhibition Stall Fabrication", "Custom Stall Designing", "Other Services"];
            case "travel":
                return ["Flight Booking", "Airport Transfers", "Local Transportation", "Other Services"];
            case "logistics":
                return ["Logistics & Freight Handling", "Warehousing Support", "Local Transportation", "Other Services"];
            case "printing":
                return ["Printing & Branding Solutions", "Exhibition Stall Fabrication", "Custom Stall Designing", "Other Services"];
            case "hospitality":
                return ["Hospitality & Concierge", "Event Staffing", "Other Services"];
            default:
                return SERVICES_LIST;
        }
    })();

    useEffect(() => {
        if (referrerType) {
            const type = referrerType.toLowerCase();
            let category = "";
            let interest = "";
            switch (type) {
                case "hotel":
                    category = "Hospitality";
                    interest = "Official Hotel Partner";
                    break;
                case "fabrication":
                    category = "Stall Fabrication";
                    interest = "Official Stall Fabrication Partner";
                    break;
                case "travel":
                    category = "Travel & Tourism";
                    interest = "Official Travel Partner";
                    break;
                case "logistics":
                    category = "Logistics & Freight";
                    interest = "Official Logistics Partner";
                    break;
                case "printing":
                    category = "Printing & Branding";
                    interest = "Official Printing Partner";
                    break;
                case "hospitality":
                    category = "Hospitality";
                    interest = "Official Hospitality Partner";
                    break;
            }
            if (category) {
                setForm(p => ({
                    ...p,
                    businessCategory: category,
                    partnershipInterests: interest ? [interest] : []
                }));
            }
        }
    }, [referrerType]);


    const set = (key: string, val: any) => {
        setForm(p => ({ ...p, [key]: val }));
        if (errors[key]) {
            setErrors(p => {
                const copy = { ...p };
                delete copy[key];
                return copy;
            });
        }
    };

    const toggleService = (s: string) => {
        setForm(p => {
            const arr = [...p.selectedServices];
            const idx = arr.indexOf(s);
            idx > -1 ? arr.splice(idx, 1) : arr.push(s);

            // Clear service errors if any service is selected
            if (arr.length > 0 && errors.selectedServices) {
                setErrors(prev => {
                    const copy = { ...prev };
                    delete copy.selectedServices;
                    return copy;
                });
            }
            return { ...p, selectedServices: arr };
        });
    };

    const togglePartnership = (s: string) => {
        setForm(p => {
            const arr = [...p.partnershipInterests];
            const idx = arr.indexOf(s);
            idx > -1 ? arr.splice(idx, 1) : arr.push(s);

            // Clear partnership errors if any interest is selected
            if (arr.length > 0 && errors.partnershipInterests) {
                setErrors(prev => {
                    const copy = { ...prev };
                    delete copy.partnershipInterests;
                    return copy;
                });
            }
            return { ...p, partnershipInterests: arr };
        });
    };

    const handleFileChange = (key: string, file: File | null) => {
        setForm(p => ({ ...p, documents: { ...p.documents, [key]: file } }));
    };

    const handleSendOtp = async () => {
        if (!form.email || !form.email.includes("@")) {
            Swal.fire("Error", "Please enter a valid email address first.", "error");
            return;
        }

        try {
            Swal.fire({
                title: "Sending OTP...",
                allowOutsideClick: false,
                didOpen: () => {
                    Swal.showLoading();
                }
            });
            const res = await otpApi.request(form.email, "email", form.fullName, "partner");
            Swal.close();
            if (res.success) {
                set("isOtpSent", true);
                Swal.fire({
                    title: "OTP Sent!",
                    text: `A 6-digit verification code has been sent to your email address.`,
                    icon: "success",
                    confirmButtonColor: "#2e7d32"
                });
            } else {
                Swal.fire("Error", res.message || "Failed to send OTP. Please try again.", "error");
            }
        } catch (error) {
            Swal.close();
            Swal.fire("Error", "Could not connect to the server. Please try again.", "error");
        }
    };

    const handleVerifyOtp = async () => {
        if (!form.otpInput) {
            Swal.fire("Error", "Please enter the OTP first.", "error");
            return;
        }
        try {
            Swal.fire({
                title: "Verifying OTP...",
                allowOutsideClick: false,
                didOpen: () => {
                    Swal.showLoading();
                }
            });
            const res = await otpApi.verify(form.email, form.otpInput, "email");
            Swal.close();
            if (res.success) {
                set("isOtpVerified", true);
                set("otpInput", "");
                Swal.fire("Verified", "Email address verified successfully!", "success");
                if (errors.email) {
                    setErrors(p => {
                        const copy = { ...p };
                        delete copy.email;
                        return copy;
                    });
                }
            } else {
                Swal.fire("Error", res.message || "Invalid OTP. Please try again.", "error");
            }
        } catch (error) {
            Swal.close();
            Swal.fire("Error", "Could not connect to the server. Please try again.", "error");
        }
    };

    const handleSendMobileOtp = async () => {
        if (!form.mobile || form.mobile.length !== 10) {
            Swal.fire("Error", "Please enter a valid 10-digit mobile number first.", "error");
            return;
        }

        try {
            Swal.fire({
                title: "Sending OTP...",
                allowOutsideClick: false,
                didOpen: () => {
                    Swal.showLoading();
                }
            });
            const res = await otpApi.request(form.mobile, "phone", form.fullName, "partner");
            Swal.close();
            if (res.success) {
                set("isMobileOtpSent", true);
                Swal.fire({
                    title: "OTP Sent!",
                    text: `A 6-digit verification code has been sent to your mobile number.`,
                    icon: "success",
                    confirmButtonColor: "#2e7d32"
                });
            } else {
                Swal.fire("Error", res.message || "Failed to send OTP. Please try again.", "error");
            }
        } catch (error) {
            Swal.close();
            Swal.fire("Error", "Could not connect to the server. Please try again.", "error");
        }
    };

    const handleVerifyMobileOtp = async () => {
        if (!form.mobileOtpInput) {
            Swal.fire("Error", "Please enter the OTP first.", "error");
            return;
        }
        try {
            Swal.fire({
                title: "Verifying OTP...",
                allowOutsideClick: false,
                didOpen: () => {
                    Swal.showLoading();
                }
            });
            const res = await otpApi.verify(form.mobile, form.mobileOtpInput, "phone");
            Swal.close();
            if (res.success) {
                set("isMobileOtpVerified", true);
                set("mobileOtpInput", "");
                Swal.fire("Verified", "Mobile number verified successfully!", "success");
                if (errors.mobile) {
                    setErrors(p => {
                        const copy = { ...p };
                        delete copy.mobile;
                        return copy;
                    });
                }
            } else {
                Swal.fire("Error", res.message || "Invalid OTP. Please try again.", "error");
            }
        } catch (error) {
            Swal.close();
            Swal.fire("Error", "Could not connect to the server. Please try again.", "error");
        }
    };

    const handleReset = () => {
        setForm(initialForm);
        setErrors({});
    };

    const validateForm = () => {
        const newErrors: Record<string, string> = {};

        // 1. Company Name
        if (!form.companyName.trim()) {
            newErrors.companyName = "Company or Brand Name is required";
        }

        // 2. Business Category
        if (!form.businessCategory) {
            newErrors.businessCategory = "Business Category is required";
        }

        // 3. Website
        if (form.website.trim() && !form.website.includes(".")) {
            newErrors.website = "Please enter a valid website URL";
        }

        // 4. Year Established
        if (form.yearEstablished) {
            if (form.yearEstablished.length !== 4 || isNaN(Number(form.yearEstablished))) {
                newErrors.yearEstablished = "Must be a 4-digit year";
            } else if (Number(form.yearEstablished) > new Date().getFullYear()) {
                newErrors.yearEstablished = "Year cannot be in the future";
            }
        }

        // 5. Full Name (Name-only checks)
        if (!form.fullName.trim()) {
            newErrors.fullName = "Full Name is required";
        } else if (/[^a-zA-Z\s]/.test(form.fullName)) {
            newErrors.fullName = "Name must only contain letters and spaces";
        }

        // 6. Designation
        if (!form.designation.trim()) {
            newErrors.designation = "Designation is required";
        }

        // 7. Mobile
        if (!form.mobile) {
            newErrors.mobile = "Mobile Number is required";
        } else if (form.mobile.length !== 10) {
            newErrors.mobile = "Mobile number must be exactly 10 digits";
        } else if (!form.isMobileOtpVerified) {
            newErrors.mobile = "Please verify your mobile number via OTP";
        }

        // 8. WhatsApp
        if (form.whatsapp && form.whatsapp.length !== 10) {
            newErrors.whatsapp = "WhatsApp number must be exactly 10 digits";
        }

        // 9. Email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!form.email.trim()) {
            newErrors.email = "Email Address is required";
        } else if (!emailRegex.test(form.email)) {
            newErrors.email = "Please enter a valid email address";
        } else if (!form.isOtpVerified) {
            newErrors.email = "Please verify your email address via OTP";
        }

        // 10. Office Address
        if (!form.officeAddress.trim()) {
            newErrors.officeAddress = "Office Address is required";
        }

        // 11. Location
        if (!form.country) {
            newErrors.country = "Country is required";
        }
        if (!form.state) {
            newErrors.state = "State is required";
        }
        if (!form.city) {
            newErrors.city = "City is required";
        }

        // 12. Pincode
        if (!form.pinCode.trim()) {
            newErrors.pinCode = "PIN Code is required";
        } else if (form.pinCode.length < 5 || form.pinCode.length > 10) {
            newErrors.pinCode = "PIN Code must be between 5 and 10 digits";
        }

        // 13. Service offering
        if (form.selectedServices.length === 0) {
            newErrors.selectedServices = "Please select at least one service offering";
        }

        // 14. Experience
        if (!form.experience) {
            newErrors.experience = "Experience selection is required";
        }

        // 15. Partnership interests
        if (form.partnershipInterests.length === 0) {
            newErrors.partnershipInterests = "Please select at least one partnership interest";
        }

        // 16. Declaration
        if (!form.declaration) {
            newErrors.declaration = "You must accept the declaration to register";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const isValid = validateForm();
        if (!isValid) {
            Swal.fire({
                icon: "warning",
                title: "Incomplete Form",
                text: "Please fill in all mandatory fields and resolve errors highlighted in red.",
                confirmButtonColor: "#2e7d32"
            });
            return;
        }

        setLoading(true);

        const formData = new FormData();
        // Append text fields
        const textFields = [
            "companyName", "businessCategory", "website", "yearEstablished", "gstNumber", "msmeRegistration",
            "fullName", "designation", "mobile", "whatsapp", "email", "officeAddress", "city",
            "state", "country", "pinCode", "otherService", "experience", "majorClients",
            "canHandleInternational", "operationalCities", "additionalInfo", "declaration"
        ];

        textFields.forEach(field => {
            if (form[field as keyof typeof form] !== undefined) {
                formData.append(field, String(form[field as keyof typeof form]));
            }
        });

        // Append array fields
        formData.append("selectedServices", JSON.stringify(form.selectedServices));
        formData.append("partnershipInterests", JSON.stringify(form.partnershipInterests));

        // Append document files
        Object.entries(form.documents).forEach(([key, file]) => {
            if (file) {
                formData.append(key, file);
            }
        });

        try {
            const res = await partnerRegistrationApi.submit(formData);
            if (res.success) {
                Swal.fire({
                    icon: "success",
                    title: "Registration Successful!",
                    text: `Thank you for your interest. Your Registration ID is ${res.data.registrationId}. Our team will review the details for ${form.companyName} and contact you soon.`,
                    confirmButtonColor: "#084c17"
                });
                handleReset();
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Registration Failed",
                    text: res.message || "An error occurred during submission. Please try again.",
                    confirmButtonColor: "#c62828"
                });
            }
        } catch (error) {
            console.error("Submission error:", error);
            Swal.fire({
                icon: "error",
                title: "Submission Error",
                text: "Could not connect to the server. Please check your network and try again.",
                confirmButtonColor: "#c62828"
            });
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className="min-h-screen bg-[#f8faf9] font-inter relative">
            {/* HERO BANNER */}
            <section className="relative pb-2 overflow-hidden px-4 md:px-10 w-full max-w-[1400px] mx-auto ">
                <img src={heroImg} alt="partner form" className="w-full h-auto object-cover" />
            </section>

            {/* MAIN CONTENT */}
            <section className="px-4 md:px-10 relative z-10 mt-[2%] xl:-mt-[2%] mb-0">
                <div className="container mx-auto px-0 md:px-6 max-w-[1400px]">
                    <div className="flex flex-col lg:flex-row gap-8 items-stretch">
                        {/* LEFT: FORM */}
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex-1 min-w-0 mt-6">
                            <form onSubmit={handleSubmit} noValidate className="bg-white border border-slate-200 rounded-2xl shadow-lg overflow-hidden flex flex-col h-full">
                                <div className="p-5 md:p-6 space-y-4 flex-1">

                                    {/* 1. COMPANY INFORMATION */}
                                    <div>
                                        <SectionHeader num={1} icon={Building2} title="Company Information" />
                                        <div className="grid grid-cols-1 md:grid-cols-4 gap-x-5 gap-y-2">
                                            <div>
                                                <Label className={labelCls}>Company / Brand Name <span className="text-red-500">*</span></Label>
                                                <Input placeholder="Enter company or brand name" className={inputCls} value={form.companyName} onChange={e => set("companyName", e.target.value)} />
                                                {errors.companyName && <span className="text-red-500 text-[10px] font-bold mt-1 block">{errors.companyName}</span>}
                                            </div>
                                            <div>
                                                <Label className={labelCls}>Business Category <span className="text-red-500">*</span></Label>
                                                <Select value={form.businessCategory} onValueChange={v => set("businessCategory", v)}>
                                                    <SelectTrigger className={inputCls}><SelectValue placeholder="Select business category" /></SelectTrigger>
                                                    <SelectContent>{BUSINESS_CATEGORIES.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent>
                                                </Select>
                                                {errors.businessCategory && <span className="text-red-500 text-[10px] font-bold mt-1 block">{errors.businessCategory}</span>}
                                            </div>
                                            <div>
                                                <Label className={labelCls}>Company Website</Label>
                                                <Input placeholder="www.yourwebsite.com" className={inputCls} value={form.website} onChange={e => set("website", e.target.value)} />
                                                {errors.website && <span className="text-red-500 text-[10px] font-bold mt-1 block">{errors.website}</span>}
                                            </div>
                                            <div>
                                                <Label className={labelCls}>Year Established</Label>
                                                <Input placeholder="YYYY" maxLength={4} className={inputCls} value={form.yearEstablished} onChange={e => set("yearEstablished", e.target.value.replace(/\D/g, "").slice(0, 4))} />
                                                {errors.yearEstablished && <span className="text-red-500 text-[10px] font-bold mt-1 block">{errors.yearEstablished}</span>}
                                            </div>
                                            <div>
                                                <Label className={labelCls}>GST Number</Label>
                                                <Input placeholder="Enter GST number" className={inputCls} value={form.gstNumber} onChange={e => set("gstNumber", e.target.value)} />
                                            </div>
                                            <div className="md:col-span-2">
                                                <Label className={labelCls}>MSME / Startup Registration (If Any)</Label>
                                                <Input placeholder="Enter MSME / Startup registration number" className={inputCls} value={form.msmeRegistration} onChange={e => set("msmeRegistration", e.target.value)} />
                                            </div>
                                        </div>
                                    </div>

                                    {/* 2. CONTACT PERSON DETAILS */}
                                    <div>
                                        <SectionHeader num={2} icon={User} title="Contact Person Details" />
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-5 gap-y-2">
                                            <div>
                                                <Label className={labelCls}>Full Name <span className="text-red-500">*</span></Label>
                                                <Input placeholder="Enter full name" className={inputCls} value={form.fullName} onChange={e => set("fullName", e.target.value.replace(/[^a-zA-Z\s]/g, ""))} />
                                                {errors.fullName && <span className="text-red-500 text-[10px] font-bold mt-1 block">{errors.fullName}</span>}
                                            </div>
                                            <div>
                                                <Label className={labelCls}>Designation <span className="text-red-500">*</span></Label>
                                                <Input placeholder="Enter designation" className={inputCls} value={form.designation} onChange={e => set("designation", e.target.value)} />
                                                {errors.designation && <span className="text-red-500 text-[10px] font-bold mt-1 block">{errors.designation}</span>}
                                            </div>
                                            <div>
                                                <Label className={labelCls}>Mobile Number <span className="text-red-500">*</span></Label>
                                                <div className="flex gap-2">
                                                    <div className="relative flex-1">
                                                        <Input
                                                            disabled={form.isMobileOtpVerified}
                                                            placeholder="Enter mobile number"
                                                            maxLength={10}
                                                            className={`${inputCls} ${form.isMobileOtpVerified ? "bg-green-50 border-green-200 pr-8" : ""}`}
                                                            value={form.mobile}
                                                            onChange={e => set("mobile", e.target.value.replace(/\D/g, "").slice(0, 10))}
                                                        />
                                                        {form.isMobileOtpVerified && <ShieldCheck className="w-3.5 h-3.5 text-green-600 absolute right-2.5 top-1/2 -translate-y-1/2" />}
                                                    </div>
                                                    {!form.isMobileOtpVerified && !form.isMobileOtpSent && (
                                                        <button
                                                            type="button"
                                                            onClick={handleSendMobileOtp}
                                                            className="px-4 py-0 h-7 bg-[#003399] text-white text-[10px] font-bold rounded-[4px] hover:bg-[#002266] transition-colors whitespace-nowrap"
                                                        >
                                                            SEND OTP
                                                        </button>
                                                    )}
                                                    {form.isMobileOtpSent && !form.isMobileOtpVerified && (
                                                        <button
                                                            type="button"
                                                            onClick={() => set("isMobileOtpSent", false)}
                                                            className="px-3 py-0 h-7 border border-slate-200 text-slate-500 text-[10px] font-bold rounded-[4px] hover:bg-slate-50 transition-colors whitespace-nowrap"
                                                        >
                                                            CHANGE
                                                        </button>
                                                    )}
                                                </div>
                                                {form.isMobileOtpSent && !form.isMobileOtpVerified && (
                                                    <div className="mt-2 flex gap-2 items-center animate-in fade-in slide-in-from-top-2 duration-300">
                                                        <div className="flex-1">
                                                            <Input
                                                                placeholder="Enter OTP"
                                                                maxLength={6}
                                                                className={inputCls}
                                                                value={form.mobileOtpInput}
                                                                onChange={e => set("mobileOtpInput", e.target.value.replace(/\D/g, ""))}
                                                            />
                                                        </div>
                                                        <button
                                                            type="button"
                                                            onClick={handleVerifyMobileOtp}
                                                            className="px-4 py-0 h-7 bg-emerald-600 text-white text-[10px] font-bold rounded-[4px] hover:bg-emerald-700 transition-colors whitespace-nowrap"
                                                        >
                                                            VERIFY OTP
                                                        </button>
                                                    </div>
                                                )}
                                                {form.isMobileOtpVerified && (
                                                    <p className="text-[9px] text-green-600 font-bold mt-1 flex items-center gap-1">
                                                        <ShieldCheck className="w-3 h-3" /> Mobile number verified
                                                    </p>
                                                )}
                                                {errors.mobile && <span className="text-red-500 text-[10px] font-bold mt-1 block">{errors.mobile}</span>}
                                            </div>
                                            <div>
                                                <Label className={labelCls}>WhatsApp Number</Label>
                                                <Input placeholder="Enter WhatsApp number" maxLength={10} className={inputCls} value={form.whatsapp} onChange={e => set("whatsapp", e.target.value.replace(/\D/g, "").slice(0, 10))} />
                                                {errors.whatsapp && <span className="text-red-500 text-[10px] font-bold mt-1 block">{errors.whatsapp}</span>}
                                            </div>
                                            <div className="md:col-span-2">
                                                <Label className={labelCls}>Official Email Address <span className="text-red-500">*</span></Label>
                                                <div className="flex gap-2">
                                                    <div className="relative flex-1">
                                                        <Input
                                                            type="email"
                                                            disabled={form.isOtpVerified}
                                                            placeholder="Enter official email address"
                                                            className={`${inputCls} ${form.isOtpVerified ? "bg-green-50 border-green-200 pr-8" : ""}`}
                                                            value={form.email}
                                                            onChange={e => set("email", e.target.value)}
                                                        />
                                                        {form.isOtpVerified && <ShieldCheck className="w-3.5 h-3.5 text-green-600 absolute right-2.5 top-1/2 -translate-y-1/2" />}
                                                    </div>
                                                    {!form.isOtpVerified && !form.isOtpSent && (
                                                        <button
                                                            type="button"
                                                            onClick={handleSendOtp}
                                                            className="px-4 py-0 h-7 bg-[#003399] text-white text-[10px] font-bold rounded-[4px] hover:bg-[#002266] transition-colors whitespace-nowrap"
                                                        >
                                                            SEND OTP
                                                        </button>
                                                    )}
                                                    {form.isOtpSent && !form.isOtpVerified && (
                                                        <button
                                                            type="button"
                                                            onClick={() => set("isOtpSent", false)}
                                                            className="px-3 py-0 h-7 border border-slate-200 text-slate-500 text-[10px] font-bold rounded-[4px] hover:bg-slate-50 transition-colors whitespace-nowrap"
                                                        >
                                                            CHANGE
                                                        </button>
                                                    )}
                                                </div>
                                                {form.isOtpSent && !form.isOtpVerified && (
                                                    <div className="mt-2 flex gap-2 items-center animate-in fade-in slide-in-from-top-2 duration-300">
                                                        <div className="flex-1">
                                                            <Input
                                                                placeholder="Enter 6-digit OTP"
                                                                maxLength={6}
                                                                className={inputCls}
                                                                value={form.otpInput}
                                                                onChange={e => set("otpInput", e.target.value.replace(/\D/g, ""))}
                                                            />
                                                        </div>
                                                        <button
                                                            type="button"
                                                            onClick={handleVerifyOtp}
                                                            className="px-4 py-0 h-7 bg-emerald-600 text-white text-[10px] font-bold rounded-[4px] hover:bg-emerald-700 transition-colors whitespace-nowrap"
                                                        >
                                                            VERIFY OTP
                                                        </button>
                                                    </div>
                                                )}
                                                {form.isOtpVerified && (
                                                    <p className="text-[9px] text-green-600 font-bold mt-1 flex items-center gap-1">
                                                        <ShieldCheck className="w-3 h-3" /> Email verified successfully
                                                    </p>
                                                )}
                                                {errors.email && <span className="text-red-500 text-[10px] font-bold mt-1 block">{errors.email}</span>}
                                            </div>
                                        </div>
                                    </div>

                                    {/* 3. BUSINESS ADDRESS */}
                                    <div>
                                        <SectionHeader num={3} icon={MapPin} title="Business Address" />
                                        <div className="space-y-3">
                                            <div>
                                                <Label className={labelCls}>Office Address <span className="text-red-500">*</span></Label>
                                                <Input placeholder="Enter complete office address" className={inputCls} value={form.officeAddress} onChange={e => set("officeAddress", e.target.value)} />
                                                {errors.officeAddress && <span className="text-red-500 text-[10px] font-bold mt-1 block">{errors.officeAddress}</span>}
                                            </div>
                                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
                                                <div>
                                                    <Label className={labelCls}>Country <span className="text-red-500">*</span></Label>
                                                    <Select value={form.country} onValueChange={v => { set("country", v); set("state", ""); set("city", ""); }}>
                                                        <SelectTrigger className={inputCls}><SelectValue placeholder="Select country" /></SelectTrigger>
                                                        <SelectContent className="max-h-[250px]">{countries.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent>
                                                    </Select>
                                                    {errors.country && <span className="text-red-500 text-[10px] font-bold mt-1 block">{errors.country}</span>}
                                                </div>
                                                <div>
                                                    <Label className={labelCls}>State <span className="text-red-500">*</span></Label>
                                                    <Select disabled={!form.country} value={form.state} onValueChange={v => { set("state", v); set("city", ""); }}>
                                                        <SelectTrigger className={inputCls}><SelectValue placeholder="Select state" /></SelectTrigger>
                                                        <SelectContent className="max-h-[250px]">{states.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent>
                                                    </Select>
                                                    {errors.state && <span className="text-red-500 text-[10px] font-bold mt-1 block">{errors.state}</span>}
                                                </div>
                                                <div>
                                                    <Label className={labelCls}>City <span className="text-red-500">*</span></Label>
                                                    <Select disabled={!form.state} value={form.city} onValueChange={v => set("city", v)}>
                                                        <SelectTrigger className={inputCls}><SelectValue placeholder="Enter city" /></SelectTrigger>
                                                        <SelectContent className="max-h-[250px]">{cities.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent>
                                                    </Select>
                                                    {errors.city && <span className="text-red-500 text-[10px] font-bold mt-1 block">{errors.city}</span>}
                                                </div>
                                                <div>
                                                    <Label className={labelCls}>PIN Code <span className="text-red-500">*</span></Label>
                                                    <Input placeholder="Enter PIN code" maxLength={6} className={inputCls} value={form.pinCode} onChange={e => set("pinCode", e.target.value.replace(/\D/g, "").slice(0, 6))} />
                                                    {errors.pinCode && <span className="text-red-500 text-[10px] font-bold mt-1 block">{errors.pinCode}</span>}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* 4. SERVICE DETAILS */}
                                    <div>
                                        <SectionHeader num={4} icon={Settings} title="Service Details" />
                                        <p className="text-[10px] font-bold text-slate-600 mb-2 uppercase tracking-tight">
                                            Which Services Do You Offer? <span className="text-slate-400 font-medium normal-case">(Select all that apply)</span>
                                        </p>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-1.5">
                                            {filteredServices.map(s => (
                                                <label key={s} className="flex items-center gap-2 cursor-pointer group">
                                                    <Checkbox

                                                        checked={form.selectedServices.includes(s)}
                                                        onCheckedChange={() => toggleService(s)}
                                                        className="border-slate-300 data-[state=checked]:bg-[#2e7d32] data-[state=checked]:border-[#2e7d32]"
                                                    />
                                                    <span className="text-[10px] font-medium text-slate-700 group-hover:text-[#2e7d32] transition-colors">{s}</span>
                                                </label>
                                            ))}
                                        </div>
                                        {errors.selectedServices && <span className="text-red-500 text-[10px] font-bold mt-1 block">{errors.selectedServices}</span>}
                                        {form.selectedServices.includes("Other Services") && (
                                            <div className="mt-2">
                                                <Input placeholder="Please specify" className={inputCls} value={form.otherService} onChange={e => set("otherService", e.target.value)} />
                                            </div>
                                        )}
                                    </div>

                                    {/* 5. EXPERIENCE & CAPACITY */}
                                    <div>
                                        <SectionHeader num={5} icon={Award} title="Experience & Capacity" />
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-5 gap-y-3">
                                            <div>
                                                <Label className={labelCls}>Years of Experience <span className="text-red-500">*</span></Label>
                                                <Select value={form.experience} onValueChange={v => set("experience", v)}>
                                                    <SelectTrigger className={inputCls}><SelectValue placeholder="Select experience" /></SelectTrigger>
                                                    <SelectContent>{EXPERIENCE_OPTIONS.map(o => <SelectItem key={o} value={o}>{o}</SelectItem>)}</SelectContent>
                                                </Select>
                                                {errors.experience && <span className="text-red-500 text-[10px] font-bold mt-1 block">{errors.experience}</span>}
                                            </div>
                                            <div>
                                                <Label className={labelCls}>Major Clients / Brands Worked With</Label>
                                                <Input placeholder="Enter client / brand names" className={inputCls} value={form.majorClients} onChange={e => set("majorClients", e.target.value)} />
                                            </div>
                                            <div>
                                                <Label className={labelCls}>Can You Handle International Delegates?</Label>
                                                <div className="flex items-center gap-4 mt-1">
                                                    {["Yes", "No"].map(v => (
                                                        <label key={v} className="flex items-center gap-2 cursor-pointer">
                                                            <Checkbox
                                                                checked={form.canHandleInternational === v}
                                                                onCheckedChange={() => set("canHandleInternational", v)}
                                                                className="rounded-full border-slate-300 data-[state=checked]:bg-[#2e7d32] data-[state=checked]:border-[#2e7d32]"
                                                            />
                                                            <span className="text-[11px] font-medium text-slate-700">{v}</span>
                                                        </label>
                                                    ))}
                                                </div>
                                            </div>
                                            <div>
                                                <Label className={labelCls}>Operational Cities</Label>
                                                <Input placeholder="Enter cities where you operate" className={inputCls} value={form.operationalCities} onChange={e => set("operationalCities", e.target.value)} />
                                            </div>
                                        </div>
                                    </div>

                                    {/* 6. UPLOAD DOCUMENTS */}
                                    <div>
                                        <SectionHeader num={6} icon={Upload} title="Upload Documents" />
                                        <p className="text-[9px] text-slate-500 font-bold mb-3 uppercase tracking-wider">(PDF / JPG / PNG – Max 5MB each)</p>
                                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
                                            {DOC_FIELDS.map(d => (
                                                <div key={d.key} className="text-center group">
                                                    <p className="text-[10px] font-black text-[#0b1126] mb-1.5 uppercase leading-tight min-h-[28px] flex items-center justify-center px-1">{d.label}</p>
                                                    <label className="flex flex-col items-center justify-center h-12 border border-slate-200 rounded-lg cursor-pointer hover:border-[#084c17] hover:bg-emerald-50/50 transition-all shadow-sm group-hover:shadow-md">
                                                        <Upload className="w-3.5 h-3.5 text-[#2e7d32] mb-0.5 group-hover:scale-110 transition-transform" />
                                                        <span className="text-[9px] font-bold text-slate-400 group-hover:text-[#2e7d32]">
                                                            {form.documents[d.key] ? "✓ Uploaded" : "Upload File"}
                                                        </span>
                                                        <input type="file" className="hidden" accept=".pdf,.jpg,.jpeg,.png" onChange={e => handleFileChange(d.key, e.target.files?.[0] || null)} />
                                                    </label>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* 7. PARTNERSHIP INTEREST */}
                                    <div>
                                        <SectionHeader num={7} icon={Handshake} title="Partnership Interest" />
                                        <p className="text-[10px] font-bold text-slate-600 mb-2 uppercase tracking-tight">
                                            Interested In Becoming: <span className="text-slate-400 font-medium normal-case">(Select one or more)</span>
                                        </p>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                                            {PARTNERSHIP_TYPES.map(p => (
                                                <label key={p} className="flex items-center gap-2 cursor-pointer group">
                                                    <Checkbox
                                                        checked={form.partnershipInterests.includes(p)}
                                                        onCheckedChange={() => togglePartnership(p)}
                                                        className="border-slate-300 data-[state=checked]:bg-[#2e7d32] data-[state=checked]:border-[#2e7d32]"
                                                    />
                                                    <span className="text-[10px] font-medium text-slate-700 group-hover:text-[#2e7d32] transition-colors">{p}</span>
                                                </label>
                                            ))}
                                        </div>
                                        {errors.partnershipInterests && <span className="text-red-500 text-[10px] font-bold mt-1 block">{errors.partnershipInterests}</span>}
                                    </div>

                                    {/* 8. ADDITIONAL INFORMATION */}
                                    <div>
                                        <SectionHeader num={8} icon={FileText} title="Additional Information" />
                                        <Label className={labelCls}>Tell Us About Your Services</Label>
                                        <div className="relative">
                                            <textarea
                                                placeholder="Write about your services, capabilities, infrastructure and unique strengths."
                                                className="w-full h-24 px-3 py-2 rounded-[3px] border border-slate-300 text-[13px] font-medium text-slate-900 placeholder:text-slate-400 placeholder:text-[13px] resize-none focus:border-[#084c17] focus:ring-2 focus:ring-[#084c17]/10 outline-none transition-all"
                                                maxLength={1000}
                                                value={form.additionalInfo}
                                                onChange={e => set("additionalInfo", e.target.value)}
                                            />
                                            <span className="absolute bottom-1 right-2 text-[9px] text-slate-400 font-medium">{form.additionalInfo.length}/1000</span>
                                        </div>
                                    </div>

                                    {/* 9. DECLARATION */}
                                    <div>
                                        <SectionHeader num={9} icon={ShieldCheck} title="Declaration" />
                                        <label className="flex items-start gap-2.5 cursor-pointer group">
                                            <Checkbox
                                                checked={form.declaration}
                                                onCheckedChange={v => set("declaration", v === true)}
                                                className="mt-0.5 border-slate-300 data-[state=checked]:bg-[#2e7d32] data-[state=checked]:border-[#2e7d32]"
                                            />
                                            <span className="text-[10px] font-medium text-slate-600 leading-relaxed">
                                                We confirm that all information provided is correct and authentic.
                                            </span>
                                        </label>
                                        {errors.declaration && <span className="text-red-500 text-[10px] font-bold mt-1 block">{errors.declaration}</span>}
                                    </div>
                                </div>

                                {/* FORM FOOTER */}
                                <div className="bg-[#f8fafc] border-t border-slate-100 px-6 md:p-4 py-1 ">
                                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">

                                        <button
                                            type="submit"
                                            disabled={loading}
                                            className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-2 rounded-lg text-white font-bold text-[13px] uppercase tracking-wider transition-all bg-[#2e7d32] hover:bg-[#1b5e20] shadow-lg active:scale-[0.98]"
                                        >
                                            <span>{loading ? "Submitting..." : "REGISTER"}</span>
                                            <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center shadow-inner">
                                                <ArrowRight className="w-4 h-4 text-[#2e7d32]" />
                                            </div>
                                        </button>
                                    </div>
                                    <p className="text-center text-[10px] text-slate-400 font-bold mt-3 uppercase tracking-tight">
                                        By clicking submit, you agree to our <a href="/terms-of-service" className="text-[#2e7d32] hover:underline">Terms & Conditions</a> and <a href="/privacy-policy" className="text-[#2e7d32] hover:underline">Privacy Policy</a>.
                                    </p>
                                </div>
                            </form>
                        </motion.div>

                        {/* RIGHT: SIDEBAR */}
                        <div className="w-full lg:w-[400px] shrink-0 pt-6">
                            <aside className="space-y-6 flex flex-col h-full">
                                {/* WHY PARTNER WITH IHWE 2026? */}
                                <div className="bg-white border border-slate-100 rounded-2xl shadow-sm p-5 md:p-8">
                                    <h3 className="text-[#0b1a3a] font-black text-[18px] uppercase tracking-tight mb-2">Why Partner With IHWE 2026?</h3>
                                    <div className="w-12 h-1 bg-[#084c17] mb-8" />
                                    <div className="space-y-4">
                                        {[
                                            { icon: Users, title: "DIRECT ACCESS TO EXHIBITORS", desc: "Connect with 300+ exhibitors from across the world." },
                                            { icon: Globe, title: "INTERNATIONAL BUSINESS OPPORTUNITIES", desc: "Build long-term partnerships with global brands." },
                                            { icon: Eye, title: "BRAND VISIBILITY AT IHWE 2026", desc: "Showcase your brand to a targeted and relevant audience." },
                                            { icon: TrendingUp, title: "CONNECT WITH 8,000+ VISITORS", desc: "Engage with industry leaders, buyers & delegates." },
                                            { icon: Handshake, title: "LONG-TERM BUSINESS PARTNERSHIPS", desc: "Be a preferred partner for future events and collaborations." },
                                        ].map((b, i) => (
                                            <div key={i} className="flex items-center gap-5 p-5 bg-[#f8faf7] rounded-2xl group hover:shadow-md transition-all duration-300">
                                                <div className="w-16 h-16 rounded-full bg-[#e8f5e9] flex items-center justify-center shrink-0">
                                                    <b.icon className="w-8 h-8 text-[#2e7d32]" />
                                                </div>
                                                <div>
                                                    <p className="text-[14px] font-black text-[#2e7d32] uppercase tracking-tight mb-1">{b.title}</p>
                                                    <p className="text-[12px] text-slate-500 font-bold leading-snug">{b.desc}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* ABOUT IHWE 2026 */}
                                <div className="relative rounded-[24px] overflow-hidden shadow-xl group border border-white/10 min-h-[270px]">
                                    <img src={BottomImage} alt="IHWE Venue" className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
                                    <div className="absolute inset-0 bg-gradient-to-r from-[#0b1a3a] via-[#0b1a3a]/85 to-transparent p-6 md:p-10 flex flex-col justify-center">
                                        <div className="relative z-10">
                                            <h3 className="text-[18px] font-semibold uppercase tracking-widest mb-6 text-white drop-shadow-md">About IHWE 2026</h3>
                                            <div className="space-y-5">
                                                {[
                                                    { icon: Calendar, label: "21 – 23 AUGUST 2026" },
                                                    { icon: MapPin, label: "PRAGATI MAIDAN, NEW DELHI, INDIA" },
                                                    { icon: Users, label: "8,000+ VISITORS EXPECTED" },
                                                    { icon: ShieldCheck, label: "UNDER THE PMS SCHEME, APPROVED BY MSME" },
                                                ].map((item, i) => (
                                                    <div key={i} className="flex items-center gap-6">
                                                        <item.icon className="w-7 h-7 text-white shrink-0 drop-shadow-md" />
                                                        <p className="text-[14px] font-medium text-white uppercase tracking-wider drop-shadow-sm leading-tight">{item.label}</p>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex-grow"></div>                                {/* NEED HELP? */}
                                <div className="bg-white border border-slate-100 rounded-2xl p-5 md:p-8">
                                    <h4 className="text-[20px] font-black text-[#0b1a3a] uppercase mb-1">Need Help?</h4>
                                    <p className="text-[13px] text-slate-500 font-bold mb-6">Our team is here to assist you.</p>
                                    <div className="space-y-4">
                                        <a href="mailto:partner@ihwe.in" className="flex items-center gap-4 text-[15px] font-black text-[#0b1a3a] hover:text-[#2e7d32] transition-colors">
                                            <Mail className="w-6 h-6 text-[#2e7d32]" /> info@ihwe.in
                                        </a>
                                        <a href="tel:+91 9654900525" className="flex items-center gap-4 text-[15px] font-black text-[#0b1a3a] hover:text-[#2e7d32] transition-colors">
                                            <Phone className="w-6 h-6 text-[#2e7d32]" /> +91 9654900525
                                        </a>
                                        <div className="flex items-center gap-4 text-[13px] font-bold text-slate-500">
                                            <Clock className="w-6 h-6 text-[#2e7d32]" /> Mon – Sat: 10:00 AM – 6:00 PM
                                        </div>
                                    </div>
                                </div>

                                {/* CTA BANNER */}
                                <div className="min-h-[200px] relative rounded-[24px] overflow-hidden shadow-2xl group ">
                                    <img src={MiddleImage} alt="Handshake" className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
                                    <div className="absolute inset-0 bg-gradient-to-r from-[#1b5e20] via-[#1b5e20]/90 to-transparent p-6 md:p-10 flex flex-col justify-center">
                                        <div className="max-w-full md:max-w-[75%] mb-2">
                                            <h4 className="text-white font-semibold text-[22px] uppercase leading-[1.1] mb-4 drop-shadow-lg">Become An Official IHWE 2026 <br /> Service Partner</h4>
                                            <p className="text-[13px] font-semibold text-white leading-relaxed drop-shadow-md">Deliver world-class support services to exhibitors, buyers & delegates from across the globe.</p>
                                        </div>

                                    </div>
                                </div>
                            </aside>
                        </div>
                    </div>
                </div>
            </section>

            {/* BOTTOM INFO BAR */}
            <section className="bg-[#0f1b3d] ">
                <div className="w-full px-8">
                    <div className="flex flex-col lg:flex-row items-center lg:justify-between py-6 lg:py-3 gap-6 lg:gap-0">
                        {/* STAY CONNECTED */}
                        <div className="flex flex-col items-center gap-1.5">
                            <p className="text-[9px] font-bold text-[#4ade80] uppercase tracking-[0.15em]">Stay Connected</p>
                            <div className="flex items-center gap-1.5">
                                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="w-7 h-7 bg-[#1877F2] rounded-full flex items-center justify-center hover:opacity-80 transition-opacity">
                                    <svg className="w-4 h-4 fill-white" viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" /></svg>
                                </a>
                                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-7 h-7 bg-gradient-to-tr from-[#fd5949] via-[#d6249f] to-[#285AEB] rounded-full flex items-center justify-center hover:opacity-80 transition-opacity">
                                    <svg className="w-4 h-4 fill-white" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" /></svg>
                                </a>
                                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="w-7 h-7 bg-[#0A66C2] rounded-full flex items-center justify-center hover:opacity-80 transition-opacity">
                                    <svg className="w-4 h-4 fill-white" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
                                </a>
                                <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="w-7 h-7 bg-[#FF0000] rounded-full flex items-center justify-center hover:opacity-80 transition-opacity">
                                    <svg className="w-4 h-4 fill-white" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" /></svg>
                                </a>
                            </div>
                        </div>

                        {/* CONTACT US */}
                        <div className="flex flex-col items-center lg:items-start gap-0.5 border-t lg:border-t-0 lg:border-l-[1px] border-[#4ade80] pt-4 lg:pt-0 w-full lg:w-auto pl-0 lg:pl-12">
                            <p className="text-[9px] font-bold text-[#4ade80] uppercase tracking-[0.15em] mb-0.5">Contact Us</p>
                            <div className="flex items-center gap-1.5">
                                <Mail className="w-3.5 h-3.5 text-white/70" />
                                <a href="mailto:info@ihwe.in" className="text-[11px] font-medium text-white hover:text-[#4ade80] transition-colors">info@ihwe.in</a>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <Phone className="w-3.5 h-3.5 text-white/70" />
                                <a href="tel:+91 9654900525" className="text-[11px] font-medium text-white hover:text-[#4ade80] transition-colors">+91 9654900525</a>
                            </div>
                        </div>

                        {/* VISIT OUR WEBSITE */}
                        <div className="flex flex-col lg:flex-row items-center gap-3 border-t lg:border-t-0 lg:border-l-[1px] border-[#4ade80] pt-4 lg:pt-0 w-full lg:w-auto pl-0 lg:pl-12 text-center lg:text-left">
                            <div className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center">
                                <Globe className="w-5 h-5 text-white/70" />
                            </div>
                            <div>
                                <p className="text-[9px] font-bold text-[#4ade80] uppercase tracking-[0.15em]">Visit Our Website</p>
                                <a href="https://www.ihwe.in" target="_blank" rel="noopener noreferrer" className="text-[12px] font-bold text-white hover:text-[#4ade80] transition-colors">www.ihwe.in</a>
                            </div>
                        </div>

                        {/* EVENT DATES */}
                        <div className="flex flex-col lg:flex-row items-center gap-3 border-t lg:border-t-0 lg:border-l-[1px] border-[#4ade80] pt-4 lg:pt-0 w-full lg:w-auto pl-0 lg:pl-12 text-center lg:text-left">
                            <div className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center">
                                <Calendar className="w-5 h-5 text-white/70" />
                            </div>
                            <div>
                                <p className="text-[9px] font-bold text-[#4ade80] uppercase tracking-[0.15em]">Event Dates</p>
                                <p className="text-[12px] font-bold text-white">21 – 23 AUGUST 2026</p>
                                <p className="text-[9px] font-medium text-white/50">(Tentative)</p>
                            </div>
                        </div>

                        {/* PMS SCHEME BADGE */}
                        <div className="flex flex-col lg:flex-row items-center gap-2.5 border-t lg:border-t-0 lg:border-l-[1px] border-[#4ade80] pt-4 lg:pt-0 w-full lg:w-auto pl-0 lg:pl-12 text-center lg:text-left">
                            <svg className="w-9 h-9" viewBox="0 0 40 40" fill="none">
                                <path d="M20 2L6 10v10c0 9.1 5.97 17.6 14 20 8.03-2.4 14-10.9 14-20V10L20 2z" fill="#4CAF50" />
                                <path d="M20 4L8 11v9c0 8.2 5.1 15.8 12 18 6.9-2.2 12-9.8 12-18v-9L20 4z" fill="#43A047" />
                                <path d="M17 21l-4-4 1.5-1.5L17 18l7-7 1.5 1.5L17 21z" fill="#fff" />
                                <circle cx="32" cy="8" r="5" fill="#FF9800" />
                                <path d="M30.5 8l1 1 2-2" stroke="#fff" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            <div>
                                <p className="text-[10px] font-extrabold text-white uppercase leading-tight">Under The PMS Scheme,</p>
                                <p className="text-[10px] font-extrabold text-white uppercase leading-tight">Approved By MSME</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default PartnerRegistration;
