import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
    CheckCircle,
    Send,
    ShieldCheck,
    Loader2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import HeroBg from "@/assets/buyer.jpg";
import { buyerRegistrationApi } from "@/lib/api";

const COUNTRIES = [
    "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda", "Argentina", "Armenia", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bhutan", "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria", "Burkina Faso", "Burundi", "Cabo Verde", "Cambodia", "Cameroon", "Canada", "Central African Republic", "Chad", "Chile", "China", "Colombia", "Comoros", "Congo", "Costa Rica", "Croatia", "Cuba", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Eswatini", "Ethiopia", "Fiji", "Finland", "France", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Greece", "Grenada", "Guatemala", "Guinea", "Guinea-Bissau", "Guyana", "Haiti", "Honduras", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Israel", "Italy", "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Korea, North", "Korea, South", "Kosovo", "Kuwait", "Kyrgyzstan", "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Mauritania", "Mauritius", "Mexico", "Micronesia", "Moldova", "Monaco", "Mongolia", "Montenegro", "Morocco", "Mozambique", "Myanmar", "Namibia", "Nauru", "Nepal", "Netherlands", "New Zealand", "Nicaragua", "Niger", "Nigeria", "North Macedonia", "Norway", "Oman", "Pakistan", "Palau", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Qatar", "Romania", "Russia", "Rwanda", "Saint Kitts and Nevis", "Saint Lucia", "Saint Vincent and the Grenadines", "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Sudan", "Spain", "Sri Lanka", "Sudan", "Suriname", "Sweden", "Switzerland", "Syria", "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Timor-Leste", "Togo", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan", "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States", "Uruguay", "Uzbekistan", "Vanuatu", "Vatican City", "Venezuela", "Vietnam", "Yemen", "Zambia", "Zimbabwe"
];

const COMPANY_TYPES = [
    "Importer/Exporter",
    "Distributor",
    "Retail Chain",
    "Wholesaler",
    "Private Label Buyer",
    "HoReCa",
    "E-commerce Platform",
    "Government Agency",
    "Other"
];

const PRODUCT_CATEGORIES = [
    "Cereals & Grains",
    "Pulses",
    "Spices & Herbs",
    "Oils",
    "Tea & Coffee",
    "Processed Food",
    "Superfoods",
    "Dairy",
    "Fresh Produce",
    "Private Label",
    "Other"
];

const BuyerRegistration = () => {
    const [submitted, setSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        companyName: "",
        country: "",
        companyWebsite: "",
        yearsInBusiness: "",
        annualImportVolume: "",
        mainMarketsServed: "",
        companyTypes: [] as string[],
        contactPerson: "",
        designation: "",
        email: "",
        whatsapp: "",
        interestedCategories: [] as string[],
        targetPriceRange: "",
        preferredMeetingType: "both",
        specificExhibitors: "",
        confirmed: false
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSelectChange = (name: string, value: string) => {
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleCheckboxChange = (name: string, value: string, checked: boolean) => {
        setFormData(prev => {
            const list = prev[name as keyof typeof prev] as string[];
            if (checked) {
                return { ...prev, [name]: [...list, value] };
            } else {
                return { ...prev, [name]: list.filter(item => item !== value) };
            }
        });
    };

    const handleConfirmChange = (checked: boolean) => {
        setFormData(prev => ({ ...prev, confirmed: checked }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.confirmed) {
            alert("Please confirm that you are a genuine trade buyer.");
            return;
        }
        setIsSubmitting(true);
        try {
            const res = await buyerRegistrationApi.submit(formData);
            if (res.success) {
                setSubmitted(true);
                window.scrollTo({ top: 0, behavior: "smooth" });
            } else {
                alert(res.message || "Something went wrong. Please try again.");
            }
        } catch (error) {
            console.error("Error submitting registration:", error);
            alert("Connection error. Please check your internet and try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const inputClasses =
        "rounded-[2px] border-slate-400 h-8 focus:border-[#23471d] focus:ring-[#23471d]/10 transition-all text-[12px] bg-white placeholder:text-slate-400 text-slate-900 font-medium shadow-none outline-none px-3 w-full text-left";
    const labelClasses =
        "text-[11px] font-bold text-slate-800 mb-1 block capitalize";

    return (
        <div className="min-h-screen bg-[#FDFDFD] font-inter">

            {/* ── HERO ── */}
            <section
                className="relative pt-36 pb-20 overflow-hidden"
                style={{
                    backgroundImage: `url(${HeroBg})`,
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
                        BUYER REGISTRATION 2026
                    </p>

                    <h1 
                        className="text-4xl md:text-6xl font-semibold mb-4 tracking-tight"
                        style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                    >
                        Witness the Future of Wellness
                    </h1>

                    <p className="text-white/70 text-base mb-6 max-w-2xl mx-auto leading-relaxed">
                        Join 8,000+ healthcare professionals and discover the latest innovations in
                        health and wellness. Complimentary registration for a limited time.
                    </p>

                </div>
            </section>

            {/* ── MAIN CONTENT ── */}
            <section className="pt-8 pb-24 relative overflow-hidden">
                <div className="container mx-auto px-6 max-w-[1400px]">
                    <div className="space-y-8">

                        <div className="w-full">
                            <AnimatePresence mode="wait">
                                {submitted ? (
                                    <motion.div
                                        key="success"
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0 }}
                                        className="bg-white border border-green-300 p-16 flex flex-col items-center justify-center text-center space-y-6 shadow-sm min-h-[480px]"
                                    >
                                        <motion.div 
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            transition={{ type: "spring", damping: 12, stiffness: 200 }}
                                            className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center text-green-500 mb-2"
                                        >
                                            <CheckCircle size={60} strokeWidth={1.5} />
                                        </motion.div>
                                        <div className="space-y-3">
                                            <h2 
                                                className="text-3xl font-bold text-slate-900"
                                                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                                            >
                                                Registration <span className="text-green-600">Successful!</span>
                                            </h2>
                                            <p className="text-slate-500 text-base max-w-md mx-auto leading-relaxed font-inter">
                                                Thank you for registering as a buyer for IHWE 2026. Our team will review your application and contact you soon.
                                            </p>
                                        </div>
                                        
                                        <div className="flex items-center gap-2 text-xs text-slate-400 mt-4">
                                            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                                            Application is being processed...
                                        </div>

                                        <div className="flex gap-4 pt-6">
                                            <Link to="/">
                                                <Button className="rounded-none px-10 h-11 bg-[#23471d] hover:bg-[#1a3516] text-sm font-bold uppercase tracking-widest transition-all">
                                                    Return Home
                                                </Button>
                                            </Link>
                                            <Button
                                                variant="outline"
                                                onClick={() => {
                                                    setSubmitted(false);
                                                    setFormData({
                                                        companyName: "",
                                                        country: "",
                                                        companyWebsite: "",
                                                        yearsInBusiness: "",
                                                        annualImportVolume: "",
                                                        mainMarketsServed: "",
                                                        companyTypes: [],
                                                        contactPerson: "",
                                                        designation: "",
                                                        email: "",
                                                        whatsapp: "",
                                                        interestedCategories: [],
                                                        targetPriceRange: "",
                                                        preferredMeetingType: "both",
                                                        specificExhibitors: "",
                                                        confirmed: false
                                                    });
                                                }}
                                                className="rounded-none px-10 h-11 border-slate-300 text-sm font-bold uppercase tracking-widest hover:bg-slate-50 transition-all font-inter"
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
                                        <div className="bg-slate-50/80 border-b border-slate-200 px-8 py-4">
                                            <h2 
                                                className="text-lg font-bold text-slate-900 uppercase"
                                                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                                            >
                                                Buyer Registration Form
                                            </h2>
                                            <p className="text-[10px] text-slate-500 uppercase tracking-[0.2em] mt-0.5 font-bold">International Health & Wellness Expo 2026</p>
                                        </div>

                                        <form onSubmit={handleSubmit} className="p-8 space-y-5 font-inter">
                                            {/* ── COMPANY INFORMATION ── */}
                                            <div className="space-y-3">
                                                <h3 
                                                    className="text-[16px] font-bold text-[#23471d] pb-0.5 border-b border-slate-100"
                                                    style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                                                >
                                                    Company Information
                                                </h3>
                                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-5 gap-y-2.5">
                                                    <div>
                                                        <Label className={labelClasses}>Company Name *</Label>
                                                        <Input required name="companyName" value={formData.companyName} onChange={handleChange} placeholder="Write Here.." className={inputClasses} />
                                                    </div>
                                                    <div>
                                                        <Label className={labelClasses}>Country *</Label>
                                                        <Select value={formData.country} onValueChange={(v) => handleSelectChange('country', v)}>
                                                            <SelectTrigger className={inputClasses}>
                                                                <SelectValue placeholder="Select Country" />
                                                            </SelectTrigger>
                                                            <SelectContent className="max-h-[300px]">
                                                                {COUNTRIES.map(country => (
                                                                    <SelectItem key={country} value={country}>{country}</SelectItem>
                                                                ))}
                                                            </SelectContent>
                                                        </Select>
                                                    </div>
                                                    <div>
                                                        <Label className={labelClasses}>Company Website</Label>
                                                        <Input name="companyWebsite" value={formData.companyWebsite} onChange={handleChange} placeholder="Write Here.." className={inputClasses} />
                                                    </div>
                                                    <div>
                                                        <Label className={labelClasses}>Years in Business</Label>
                                                        <Input name="yearsInBusiness" value={formData.yearsInBusiness} onChange={handleChange} placeholder="Write Here.." className={inputClasses} />
                                                    </div>
                                                </div>

                                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-5 gap-y-2.5">
                                                    <div>
                                                        <Label className={labelClasses}>Annual Import Volume</Label>
                                                        <Input name="annualImportVolume" value={formData.annualImportVolume} onChange={handleChange} placeholder="Write Here.." className={inputClasses} />
                                                    </div>
                                                    <div>
                                                        <Label className={labelClasses}>Main Markets Served</Label>
                                                        <Input name="mainMarketsServed" value={formData.mainMarketsServed} onChange={handleChange} placeholder="Write Here.." className={inputClasses} />
                                                    </div>
                                                </div>

                                                <div className="space-y-4 bg-slate-50/50 p-5 border border-slate-300 rounded-[2px] shadow-sm mt-2">
                                                    <Label className="text-[11px] font-bold text-slate-800 mb-1.5 block">Type of Company *</Label>
                                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                                                        {COMPANY_TYPES.map((type) => (
                                                            <label key={type} className="flex items-center gap-2.5 cursor-pointer group">
                                                                <Checkbox 
                                                                    checked={formData.companyTypes.includes(type)}
                                                                    onCheckedChange={(checked) => handleCheckboxChange('companyTypes', type, !!checked)}
                                                                    className="rounded-none w-3.5 h-3.5 border-slate-400 data-[state=checked]:bg-[#23471d] data-[state=checked]:border-[#23471d]" 
                                                                />
                                                                <span className="text-[11px] text-slate-600 group-hover:text-slate-900 leading-tight transition-colors font-medium">{type}</span>
                                                            </label>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>

                                            {/* ── CONTACT DETAILS ── */}
                                            <div className="space-y-3">
                                                <h3 
                                                    className="text-[16px] font-bold text-[#23471d] pb-0.5 border-b border-slate-100"
                                                    style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                                                >
                                                    Contact Details
                                                </h3>
                                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-5 gap-y-2.5">
                                                    <div>
                                                        <Label className={labelClasses}>Contact Person *</Label>
                                                        <Input required name="contactPerson" value={formData.contactPerson} onChange={handleChange} placeholder="Write Here.." className={inputClasses} />
                                                    </div>
                                                    <div>
                                                        <Label className={labelClasses}>Designation *</Label>
                                                        <Input required name="designation" value={formData.designation} onChange={handleChange} placeholder="Write Here.." className={inputClasses} />
                                                    </div>
                                                    <div>
                                                        <Label className={labelClasses}>Email *</Label>
                                                        <Input type="email" required name="email" value={formData.email} onChange={handleChange} placeholder="Write Here.." className={inputClasses} />
                                                    </div>
                                                    <div>
                                                        <Label className={labelClasses}>WhatsApp *</Label>
                                                        <Input required name="whatsapp" value={formData.whatsapp} onChange={handleChange} placeholder="Write Here.." className={inputClasses} />
                                                    </div>
                                                </div>
                                            </div>

                                            {/* ── PRODUCT INTEREST ── */}
                                            <div className="space-y-4">
                                                <h3 
                                                    className="text-[16px] font-bold text-[#23471d] pb-0.5 border-b border-slate-100"
                                                    style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                                                >
                                                    Product Interest
                                                </h3>
                                                <div className="space-y-4 bg-slate-50/50 p-5 border border-slate-300 rounded-[2px] shadow-sm">
                                                    <Label className="text-[11px] font-bold text-slate-800 mb-1.5 block">Interested Categories *</Label>
                                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                                                        {PRODUCT_CATEGORIES.map((cat) => (
                                                            <label key={cat} className="flex items-center gap-2.5 cursor-pointer group">
                                                                <Checkbox 
                                                                    checked={formData.interestedCategories.includes(cat)}
                                                                    onCheckedChange={(checked) => handleCheckboxChange('interestedCategories', cat, !!checked)}
                                                                    className="rounded-none w-3.5 h-3.5 border-slate-400 data-[state=checked]:bg-[#23471d] data-[state=checked]:border-[#23471d]" 
                                                                />
                                                                <span className="text-[11px] text-slate-600 group-hover:text-slate-900 leading-tight transition-colors font-medium">{cat}</span>
                                                            </label>
                                                        ))}
                                                    </div>
                                                </div>
                                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-5 mt-1">
                                                    <div className="md:col-span-2 lg:col-span-4">
                                                        <Label className={labelClasses}>Target Price Range</Label>
                                                        <Input name="targetPriceRange" value={formData.targetPriceRange} onChange={handleChange} placeholder="Write Here.." className={inputClasses} />
                                                    </div>
                                                </div>
                                            </div>

                                            {/* ── MEETING PREFERENCES ── */}
                                            <div className="space-y-3">
                                                <h3 
                                                    className="text-[16px] font-bold text-[#23471d] pb-0.5 border-b border-slate-100"
                                                    style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                                                >
                                                    Meeting Preferences
                                                </h3>

                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                                                    <div className="space-y-2.5 px-0.5">
                                                        <Label className="text-[11px] font-bold text-slate-800">Preferred Meeting Type *</Label>
                                                        <RadioGroup 
                                                            value={formData.preferredMeetingType} 
                                                            onValueChange={(v) => handleSelectChange('preferredMeetingType', v)}
                                                            className="flex flex-col space-y-1.5 pt-1"
                                                        >
                                                            <div className="flex items-center space-x-3">
                                                                <RadioGroupItem value="1:1" id="1:1" className="w-3.5 h-3.5 border-slate-400 text-[#23471d]" />
                                                                <Label htmlFor="1:1" className="text-[11px] font-medium text-slate-600 cursor-pointer">1:1 Scheduled Meetings</Label>
                                                            </div>
                                                            <div className="flex items-center space-x-3">
                                                                <RadioGroupItem value="roundtable" id="roundtable" className="w-3.5 h-3.5 border-slate-400 text-[#23471d]" />
                                                                <Label htmlFor="roundtable" className="text-[11px] font-medium text-slate-600 cursor-pointer">Small Group Roundtable</Label>
                                                            </div>
                                                            <div className="flex items-center space-x-3">
                                                                <RadioGroupItem value="both" id="both" className="w-3.5 h-3.5 border-slate-400 text-[#23471d]" />
                                                                <Label htmlFor="both" className="text-[11px] font-medium text-slate-600 cursor-pointer">Both</Label>
                                                            </div>
                                                        </RadioGroup>
                                                    </div>

                                                    <div className="pt-1">
                                                        <Label className={labelClasses}>Registration Fee + (18% GST)</Label>
                                                        <div className="relative">
                                                            <Input value="₹0" disabled className={`${inputClasses} bg-slate-50 text-[#23471d] border-slate-900 font-bold border-2 h-9`} />
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="pt-1">
                                                    <Label className={labelClasses}>Specific Exhibitors You Wish to Meet</Label>
                                                    <textarea
                                                        name="specificExhibitors"
                                                        value={formData.specificExhibitors}
                                                        onChange={handleChange}
                                                        className="rounded-[2px] border border-slate-400 min-h-[80px] focus:border-[#23471d] focus:ring-[#23471d]/10 transition-all text-[12px] bg-white placeholder:text-slate-400 text-slate-900 font-medium shadow-none outline-none px-3 py-2 w-full text-left"
                                                        placeholder="Write Here.."
                                                    ></textarea>
                                                </div>

                                                <div className="flex items-start gap-3 pt-1">
                                                    <Checkbox 
                                                        id="confirm" 
                                                        checked={formData.confirmed}
                                                        onCheckedChange={(checked) => handleConfirmChange(!!checked)}
                                                        className="rounded-none w-3.5 h-3.5 border-slate-400 data-[state=checked]:bg-green-600 data-[state=checked]:border-green-600 mt-0.5" 
                                                    />
                                                    <Label htmlFor="confirm" className="text-[11px] leading-relaxed text-slate-600 font-medium cursor-pointer">
                                                        I confirm that I am a genuine trade buyer and agree to attend scheduled meetings.
                                                    </Label>
                                                </div>
                                            </div>

                                            <div className="pt-6 flex flex-col items-center">
                                                <Button
                                                    type="submit"
                                                    disabled={isSubmitting}
                                                    className="w-full max-w-sm h-12 rounded-sm bg-[#23471d] hover:bg-[#1a3516] text-white font-bold text-xs uppercase tracking-widest transition-all duration-300 shadow-xl shadow-[#23471d]/10 flex items-center justify-center gap-3 group"
                                                >
                                                    {isSubmitting ? (
                                                        <>
                                                            <Loader2 size={16} className="animate-spin" />
                                                            Submitting...
                                                        </>
                                                    ) : (
                                                        <>
                                                            Submit Registration
                                                            <Send size={16} />
                                                        </>
                                                    )}
                                                </Button>
                                                <p className="mt-4 text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em] flex items-center gap-2">
                                                    <ShieldCheck size={12} className="text-[#23471d]" />
                                                    Secure Registration Portal
                                                </p>
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

export default BuyerRegistration;
