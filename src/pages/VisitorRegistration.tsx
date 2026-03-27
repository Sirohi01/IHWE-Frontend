import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
    CheckCircle,
    Send, ChevronRight,
    ShieldCheck,
    UserCircle,
    Building2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import HeroBg from "@/assets/car22.jpg";

const COUNTRIES = [
    "Afghanistan", "Albania", "Algeria", "American Samoa", "Andorra", "Angola", "Anguilla", "Antarctica", "Antigua And Barbuda", "Argentina", "Armenia", "Aruba", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bermuda", "Bhutan", "Bolivia", "Bosnia And Herzegovina", "Botswana", "Bouvet Island", "Brazil", "British Indian Ocean Territory", "Brunei Darussalam", "Bulgaria", "Burkina Faso", "Burundi", "Cambodia", "Cameroon", "Canada", "Cape Verde", "Cayman Islands", "Central African Republic", "Chad", "Chile", "China", "Christmas Island", "Cocos (Keeling) Islands", "Colombia", "Comoros", "Congo", "Congo, The Democratic Republic Of The", "Cook Islands", "Costa Rica", "Cote D'ivoire", "Croatia", "Cuba", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Ethiopia", "Falkland Islands (Malvinas)", "Faroe Islands", "Fiji", "Finland", "France", "French Guiana", "French Polynesia", "French Southern Territories", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Gibraltar", "Greece", "Greenland", "Grenada", "Guadeloupe", "Guam", "Guatemala", "Guinea", "Guinea-bissau", "Guyana", "Haiti", "Heard Island And Mcdonald Islands", "Holy See (Vatican City State)", "Honduras", "Hong Kong", "Hungary", "Iceland", "India", "Indonesia", "Iran, Islamic Republic Of", "Iraq", "Ireland", "Israel", "Italy", "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Korea, Democratic People's Republic Of", "Korea, Republic Of", "Kuwait", "Kyrgyzstan", "Lao People's Democratic Republic", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libyan Arab Jamahiriya", "Liechtenstein", "Lithuania", "Luxembourg", "Macao", "Macedonia, The Former Yugoslav Republic Of", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Martinique", "Mauritania", "Mauritius", "Mayotte", "Mexico", "Micronesia, Federated States Of", "Moldova, Republic Of", "Monaco", "Mongolia", "Montserrat", "Morocco", "Mozambique", "Myanmar", "Namibia", "Nauru", "Nepal", "Netherlands", "Netherlands Antilles", "New Caledonia", "New Zealand", "Nicaragua", "Niger", "Nigeria", "Niue", "Norfolk Island", "Northern Mariana Islands", "Norway", "Oman", "Pakistan", "Palau", "Palestinian Territory, Occupied", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Pitcairn", "Poland", "Portugal", "Puerto Rico", "Qatar", "Reunion", "Romania", "Russian Federation", "Rwanda", "Saint Helena", "Saint Kitts And Nevis", "Saint Lucia", "Saint Pierre And Miquelon", "Saint Vincent And The Grenadines", "Samoa", "San Marino", "Sao Tome And Principe", "Saudi Arabia", "Senegal", "Serbia And Montenegro", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Georgia And The South Sandwich Islands", "Spain", "Sri Lanka", "Sudan", "Suriname", "Svalbard And Jan Mayen", "Swaziland", "Sweden", "Switzerland", "Syrian Arab Republic", "Taiwan, Province Of China", "Tajikistan", "Tanzania, United Republic Of", "Thailand", "Timor-leste", "Togo", "Tokelau", "Tonga", "Trinidad And Tobago", "Tunisia", "Turkey", "Turkmenistan", "Turks And Caicos Islands", "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States", "United States Minor Outlying Islands", "Uruguay", "Uzbekistan", "Vanuatu", "Venezuela", "Viet Nam", "Virgin Islands, British", "Virgin Islands, U.s.", "Wallis And Futuna", "Western Sahara", "Yemen", "Zambia", "Zimbabwe"
];

const PURPOSE_GENERAL = [
    "Business Networking",
    "Exploring New Products",
    "Buying Products & Services",
    "Learning Industry Trends",
    "Others"
];

const PURPOSE_CORPORATE = [
    "Exploring Business Opportunities",
    "Networking & Collaborations",
    "Meeting Exhibitors & Suppliers",
    "Learning About Latest Trends",
    "Attending Arogya Sangosthi Seminar"
];

const INTEREST_GENERAL = [
    "AYUSH & Herbal Products",
    "Organic & Natural Products",
    "Fitness & Wellness Equipment",
    "Health Supplements",
    "Hospitals & Healthcare Services",
    "Agriculture & Organic Farming",
    "R&D & Innovations",
    "Others"
];

const INTEREST_CORPORATE = [
    "AYUSH & Herbal Products",
    "Fitness & Nutrition",
    "Health & Wellness",
    "Bio-Medicine & Research",
    "Organic Farming & Agriculture",
    "HealthTech & Startups"
];

const VisitorRegistration = () => {
    const [visitorType, setVisitorType] = useState("general");
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitted(true);
        window.scrollTo({ top: 0, behavior: "smooth" });
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
                        Visitor Registration
                    </p>

                    <h1 
                        className="text-4xl md:text-6xl font-semibold mb-4 tracking-tight"
                        style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                    >
                        Witness the Future of Wellness
                    </h1>

                    <p className="text-white/70 text-base mb-6 max-w-xl mx-auto leading-relaxed">
                        Join 8,000+ healthcare professionals and discover the latest innovations in health and wellness.
                        Complimentary registration for a limited time.
                    </p>

                </div>
            </section>

            {/* ── MAIN CONTENT ── */}
            <section className="pt-8 pb-24 relative overflow-hidden">
                <div className="container mx-auto px-6 max-w-[1400px]">
                    <div className="space-y-8">
                        <AnimatePresence mode="wait">
                            {submitted ? (
                                <motion.div
                                    key="success"
                                    initial={{ opacity: 0, scale: 0.98 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="bg-white border border-slate-300 shadow-2xl p-16 flex flex-col items-center justify-center text-center space-y-6"
                                >
                                    <div className="w-20 h-20 bg-[#23471d]/10 flex items-center justify-center text-[#23471d]">
                                        <CheckCircle size={40} />
                                    </div>
                                    <div className="space-y-2">
                                        <h2 className="text-3xl font-serif font-bold text-slate-900">
                                            Registration Complete!
                                        </h2>
                                        <p className="text-slate-600 text-base max-w-md mx-auto leading-relaxed font-inter">
                                            Your visitor pass has been confirmed. You will receive a digital copy via email shortly.
                                            We look forward to seeing you at IH&WE 2026.
                                        </p>
                                    </div>
                                    <div className="flex gap-4 pt-4">
                                        <Link to="/">
                                            <Button className="rounded-sm px-10 h-11 bg-[#23471d] hover:bg-[#1a3516] text-sm font-bold uppercase tracking-widest transition-all">
                                                Return Home
                                            </Button>
                                        </Link>
                                        <Button
                                            variant="outline"
                                            onClick={() => setSubmitted(false)}
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
                                    <div className="bg-slate-50/80 border-b border-slate-200 px-8 py-4">
                                        <h2 
                                            className="text-xl font-bold text-slate-900 uppercase"
                                            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                                        >
                                            Visitor Registration
                                        </h2>
                                        <p className="text-[10px] text-slate-500 uppercase tracking-[0.2em] mt-0.5 font-bold">International Health & Wellness Expo 2026</p>
                                    </div>

                                    {visitorType === "corporate" && (
                                        <div className="px-8 pt-6 pb-2">
                                            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-widest">Corporate Visitor Registration</h3>
                                        </div>
                                    )}

                                    <form onSubmit={handleSubmit} className="p-8 space-y-8 font-inter">
                                        {/* ── VISITOR TYPE ── */}
                                        <div className="flex flex-wrap items-center gap-12">
                                            <RadioGroup
                                                defaultValue="corporate"
                                                className="flex flex-wrap gap-10"
                                                onValueChange={(v) => setVisitorType(v)}
                                            >
                                                <div className="flex items-center space-x-3">
                                                    <RadioGroupItem value="corporate" id="corporate" className="w-5 h-5 border-slate-400 text-[#23471d]" />
                                                    <Label htmlFor="corporate" className="text-sm font-bold text-slate-700 cursor-pointer flex items-center gap-2">
                                                        Corporate Visitor
                                                    </Label>
                                                </div>
                                                <div className="flex items-center space-x-3">
                                                    <RadioGroupItem value="general" id="general" className="w-5 h-5 border-slate-400 text-[#23471d]" />
                                                    <Label htmlFor="general" className="text-sm font-bold text-slate-700 cursor-pointer flex items-center gap-2">
                                                        General Visitor
                                                    </Label>
                                                </div>
                                            </RadioGroup>

                                            <Link to="/buyer-registration">
                                                <Button 
                                                    type="button"
                                                    variant="outline"
                                                    className="rounded-full px-6 h-9 border-[#d26019] text-[#d26019] hover:bg-[#d26019] hover:text-white text-[11px] font-bold uppercase tracking-wider transition-all"
                                                >
                                                    Buyer Register
                                                </Button>
                                            </Link>
                                        </div>

                                        {/* ── PERSONAL DETAILS ── */}
                                        <div className="space-y-6">
                                            <h3 
                                                className="text-sm font-bold text-[#d26019] uppercase tracking-[0.05em] border-b border-slate-100 pb-1.5"
                                                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                                            >
                                                Personal Information
                                            </h3>
                                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-5 gap-y-4">
                                                <div>
                                                    <Label className={labelClasses}>REGISTRATION FOR *</Label>
                                                    <Select>
                                                        <SelectTrigger className={inputClasses}>
                                                            <SelectValue placeholder="Select Here" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <SelectItem value="organic_expo">5th Organic Expo 2026</SelectItem>
                                                            <SelectItem value="ihwe_expo">9th International Health and Wellness Expo</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                </div>
                                                <div>
                                                    <Label className={labelClasses}>FIRST NAME *</Label>
                                                    <Input required placeholder="Enter First Name" className={inputClasses} />
                                                </div>
                                                <div>
                                                    <Label className={labelClasses}>LAST NAME *</Label>
                                                    <Input required placeholder="Enter Last Name" className={inputClasses} />
                                                </div>
                                                <div>
                                                    <Label className={labelClasses}>GENDER *</Label>
                                                    <Select>
                                                        <SelectTrigger className={inputClasses}>
                                                            <SelectValue placeholder="Select Here" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <SelectItem value="male">Male</SelectItem>
                                                            <SelectItem value="female">Female</SelectItem>
                                                            <SelectItem value="others">Others</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                </div>
                                                <div>
                                                    <Label className={labelClasses}>DATE OF BIRTH (OPTIONAL)</Label>
                                                    <Input type="date" className={inputClasses} />
                                                </div>
                                                <div>
                                                    <Label className={labelClasses}>EMAIL *</Label>
                                                    <Input type="email" required placeholder="Enter Address.." className={inputClasses} />
                                                </div>
                                                <div>
                                                    <Label className={labelClasses}>MOBILE NO. *</Label>
                                                    <Input required placeholder="Enter Telephone/Mobile.." className={inputClasses} />
                                                </div>
                                                {visitorType === "corporate" && (
                                                    <div>
                                                        <Label className={labelClasses}>DESIGNATION *</Label>
                                                        <Input required placeholder="Enter Designation.." className={inputClasses} />
                                                    </div>
                                                )}
                                                <div>
                                                    <Label className={labelClasses}>ALTERNATE NO. (OPTIONAL)</Label>
                                                    <Input placeholder="Enter Alternate No." className={inputClasses} />
                                                </div>
                                            </div>
                                        </div>

                                        {/* ── PROFESSIONAL DETAILS ── */}
                                        {visitorType === "corporate" && (
                                            <div className="space-y-6">
                                                <h3 
                                                    className="text-sm font-bold text-[#d26019] uppercase tracking-[0.05em] border-b border-slate-100 pb-1.5"
                                                    style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                                                >
                                                    Company & Industry Information:
                                                </h3>
                                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-5 gap-y-4">
                                                    <div className="lg:col-span-2">
                                                        <Label className={labelClasses}>COMPANY NAME *</Label>
                                                        <Input required placeholder="Enter Company Name.." className={inputClasses} />
                                                    </div>
                                                    <div>
                                                        <Label className={labelClasses}>COMPANY WEBSITE *</Label>
                                                        <Input required placeholder="Enter Company Website.." className={inputClasses} />
                                                    </div>
                                                    <div>
                                                        <Label className={labelClasses}>INDUSTRY/SECTOR *</Label>
                                                        <Select>
                                                            <SelectTrigger className={inputClasses}>
                                                                <SelectValue placeholder="Select Here" />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                <SelectItem value="ayush">AYUSH (Ayurveda, Yoga, Unani, Siddha, Homeopathy)</SelectItem>
                                                                <SelectItem value="agriculture">Agriculture, Horticulture & Medicinal Plants</SelectItem>
                                                                <SelectItem value="bioenergy">Bio-Energy & Sustainable Living</SelectItem>
                                                                <SelectItem value="fitness">Fitness & Wellness Industry</SelectItem>
                                                                <SelectItem value="health_services">Health & Medical Services</SelectItem>
                                                                <SelectItem value="wellness_tourism">Health & Wellness Tourism</SelectItem>
                                                                <SelectItem value="medical_equipment">Medical Equipment & Healthcare Technology</SelectItem>
                                                                <SelectItem value="medical_tourism">Medical Tourism</SelectItem>
                                                                <SelectItem value="nutrition">Nutrition & Health Supplements</SelectItem>
                                                                <SelectItem value="organic_herbal">Organic & Herbal Products</SelectItem>
                                                                <SelectItem value="pharma">Pharmaceutical Companies</SelectItem>
                                                                <SelectItem value="research_edu">Research, Education & Government Bodies</SelectItem>
                                                                <SelectItem value="others">Others</SelectItem>
                                                                </SelectContent>
                                                            </Select>
                                                        </div>
                                                        <div>
                                                            <Label className={labelClasses}>COMPANY SIZE *</Label>
                                                            <Select>
                                                                <SelectTrigger className={inputClasses}>
                                                                    <SelectValue placeholder="Select Here" />
                                                                </SelectTrigger>
                                                                <SelectContent>
                                                                    <SelectItem value="1-10">1-10 Employees</SelectItem>
                                                                    <SelectItem value="11-50">11-50 Employees</SelectItem>
                                                                    <SelectItem value="51-200">51-200 Employees</SelectItem>
                                                                    <SelectItem value="200+">200+ Employees</SelectItem>
                                                                </SelectContent>
                                                            </Select>
                                                        </div>
                                                    <div>
                                                        <Label className={labelClasses}>COUNTRY *</Label>
                                                        <Select>
                                                            <SelectTrigger className={inputClasses}>
                                                                <SelectValue placeholder="Select Country" />
                                                            </SelectTrigger>
                                                            <SelectContent className="max-h-[300px]">
                                                                {COUNTRIES.map(c => (
                                                                    <SelectItem key={c} value={c.toLowerCase().replace(/ /g, "_")}>{c}</SelectItem>
                                                                ))}
                                                            </SelectContent>
                                                        </Select>
                                                    </div>
                                                    <div>
                                                        <Label className={labelClasses}>STATE *</Label>
                                                        <Select>
                                                            <SelectTrigger className={inputClasses}>
                                                                <SelectValue placeholder="Select Country first" />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                <SelectItem value="state1">State 1</SelectItem>
                                                            </SelectContent>
                                                        </Select>
                                                    </div>
                                                    <div>
                                                        <Label className={labelClasses}>CITY *</Label>
                                                        <Select>
                                                            <SelectTrigger className={inputClasses}>
                                                                <SelectValue placeholder="Select State first" />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                <SelectItem value="city1">City 1</SelectItem>
                                                            </SelectContent>
                                                        </Select>
                                                    </div>
                                                </div>
                                            </div>
                                        )}

                                        {/* ── PURPOSE & INTEREST ── */}
                                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                            {/* Purpose of Visit */}
                                            <div className="space-y-4 bg-slate-50/50 p-5 border border-slate-300 rounded-[2px] shadow-sm">
                                                <Label className="text-[11px] font-bold text-[#23471d] uppercase tracking-wider block border-b border-slate-200 pb-2">Purpose of Visit *</Label>
                                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                                                    {(visitorType === "corporate" ? PURPOSE_CORPORATE : PURPOSE_GENERAL).map((opt) => (
                                                        <label key={opt} className="flex items-center gap-3 cursor-pointer group">
                                                            <Checkbox className="rounded-none w-3.5 h-3.5 border-slate-400 data-[state=checked]:bg-[#23471d] data-[state=checked]:border-[#23471d]" />
                                                            <span className="text-[11px] text-slate-600 group-hover:text-slate-900 font-medium transition-colors">{opt}</span>
                                                        </label>
                                                    ))}
                                                </div>
                                            </div>

                                            {/* Area of Interest */}
                                            <div className="space-y-4 bg-slate-50/50 p-5 border border-slate-300 rounded-[2px] shadow-sm">
                                                <Label className="text-[11px] font-bold text-[#23471d] uppercase tracking-wider block border-b border-slate-200 pb-2">Area of Interest *</Label>
                                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                                                    {(visitorType === "corporate" ? INTEREST_CORPORATE : INTEREST_GENERAL).map((opt) => (
                                                        <label key={opt} className="flex items-center gap-3 cursor-pointer group">
                                                            <Checkbox className="rounded-none w-3.5 h-3.5 border-slate-400 data-[state=checked]:bg-[#23471d] data-[state=checked]:border-[#23471d]" />
                                                            <span className="text-[11px] text-slate-600 group-hover:text-slate-900 font-medium transition-colors">{opt}</span>
                                                        </label>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>

                                        {visitorType === "corporate" && (
                                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-4">
                                                <div className="space-y-4">
                                                    <Label className="text-[11px] font-bold text-slate-900 uppercase tracking-wider block">Would you like to schedule B2B meetings? *</Label>
                                                    <RadioGroup defaultValue="no" className="flex gap-6">
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
                                                <div className="space-y-4">
                                                    <Label className="text-[11px] font-bold text-slate-900 uppercase tracking-wider block">Would you like updates via WhatsApp? *</Label>
                                                    <RadioGroup defaultValue="yes" className="flex gap-6">
                                                        <div className="flex items-center space-x-2">
                                                            <RadioGroupItem value="yes" id="wa-yes" className="w-4 h-4 border-slate-400 text-[#23471d]" />
                                                            <Label htmlFor="wa-yes" className="text-sm font-medium text-slate-600 cursor-pointer">Yes</Label>
                                                        </div>
                                                        <div className="flex items-center space-x-2">
                                                            <RadioGroupItem value="no" id="wa-no" className="w-4 h-4 border-slate-400 text-[#23471d]" />
                                                            <Label htmlFor="wa-no" className="text-sm font-medium text-slate-600 cursor-pointer">No</Label>
                                                        </div>
                                                    </RadioGroup>
                                                </div>
                                            </div>
                                        )}

                                        {visitorType === "corporate" && (
                                            <div className="space-y-2">
                                                <Label className="text-[11px] font-bold text-slate-900 uppercase tracking-wider block">Any Specific requirement</Label>
                                                <Input placeholder="Write Here .." className={inputClasses} />
                                            </div>
                                        )}

                                        {/* ── NEWSLETTER ── */}
                                        <div className="pt-4 border-t border-slate-100">
                                            <label className="flex items-center gap-3 cursor-pointer group">
                                                <Checkbox className="rounded-none w-4 h-4 border-slate-400 data-[state=checked]:bg-[#23471d] data-[state=checked]:border-[#23471d]" />
                                                <span className="text-[11px] font-bold text-slate-700 uppercase tracking-wide">Subscribe to Event Updates & Newsletters</span>
                                            </label>
                                        </div>

                                        {/* ── SUBMIT BAR ── */}
                                        <div className="pt-6 flex flex-col items-center">
                                            <Button
                                                type="submit"
                                                className="w-full max-w-sm h-12 rounded-sm bg-[#23471d] hover:bg-[#1a3516] text-white font-bold text-xs uppercase tracking-widest transition-all duration-300 shadow-xl shadow-[#23471d]/10 flex items-center justify-center gap-3 group"
                                            >
                                                SUBMIT REGISTRATION
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
            </section>
        </div>
    );
};

export default VisitorRegistration;
