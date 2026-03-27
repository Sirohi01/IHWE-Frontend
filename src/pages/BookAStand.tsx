import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
    CheckCircle,
    Send, ChevronRight,
    ShieldCheck
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { heroBackgroundApi, SERVER_URL } from "@/lib/api";

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

const registrationTiers = [
    { type: "Shell Space (min. 9 sq m.)", inr: "INR ₹ 11,700 / sq m. + GST (18%)", usd: "USD $ 175 / sq m. + GST (18%)" },
    { type: "Raw Space (min. 18 sq m.)", inr: "INR ₹ 11,200 / sq m. + GST (18%)", usd: "USD $ 165 / sq m. + GST (18%)" },
];

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

const BookAStand = () => {
    const [submitted, setSubmitted] = useState(false);
    const [heroData, setHeroData] = useState<any>(null);

    useEffect(() => {
        const fetchHero = async () => {
            try {
                const data = await heroBackgroundApi.getByPage("Registration / Book A Stand");
                if (data) setHeroData(data);
            } catch (error) {
                console.error("Error fetching hero background for Book A Stand:", error);
            }
        };
        fetchHero();
    }, []);

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
                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="bg-[#23471d] text-white">
                                            <th className="px-6 py-3 text-sm font-bold border-r border-white/20">Stand Type</th>
                                            <th className="px-6 py-3 text-sm font-bold border-r border-white/20">Cost (in indian rupees ₹)</th>
                                            <th className="px-6 py-3 text-sm font-bold">Cost (in USD $)</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-200 font-inter">
                                        {registrationTiers.map((tier, idx) => (
                                            <tr key={idx} className="hover:bg-slate-50 transition-colors">
                                                <td className="px-6 py-4 text-sm font-medium text-slate-800 border-r border-slate-200">{tier.type}</td>
                                                <td className="px-6 py-4 text-sm text-slate-600 border-r border-slate-200">{tier.inr}</td>
                                                <td className="px-6 py-4 text-sm text-slate-600">{tier.usd}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
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
                                        className="bg-white border border-slate-300 shadow-2xl p-16 flex flex-col items-center justify-center text-center space-y-6"
                                    >
                                        <div className="w-20 h-20 bg-[#23471d]/10 flex items-center justify-center text-[#23471d]">
                                            <CheckCircle size={40} />
                                        </div>
                                        <div className="space-y-2">
                                            <h2 
                                                className="text-3xl font-bold text-slate-900"
                                                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                                            >
                                                Registration Successful!
                                            </h2>
                                            <p className="text-slate-600 text-base max-w-md mx-auto leading-relaxed font-inter">
                                                Thank you for your interest in IH&WE 2026. Our team will contact you within 24 hours to discuss your stand options.
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
                                                className="text-lg font-bold text-slate-900 uppercase"
                                                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                                            >
                                                Exhibition Space Application
                                            </h2>
                                            <p className="text-[10px] text-slate-500 uppercase tracking-[0.2em] mt-0.5 font-bold">International Health & Wellness Expo 2026</p>
                                        </div>

                                        <form onSubmit={handleSubmit} className="p-8 space-y-8 font-inter">
                                            {/* ── EXHIBITOR DETAILS ── */}
                                            <div className="space-y-5">
                                                <h3 
                                                    className="text-sm font-bold text-[#d26019] uppercase tracking-[0.05em] border-b border-slate-100 pb-1.5"
                                                    style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                                                >
                                                    Exhibitor Details
                                                </h3>
                                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-5 gap-y-4">
                                                    <div>
                                                        <Label className={labelClasses}>EXHIBITOR NAME *</Label>
                                                        <Input required placeholder="Write Here.." className={inputClasses} />
                                                    </div>
                                                    <div>
                                                        <Label className={labelClasses}>TYPE OF BUSINESS *</Label>
                                                        <Select>
                                                            <SelectTrigger className={inputClasses}>
                                                                <SelectValue placeholder="Select Here" />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                {BUSINESS_TYPES.map(type => (
                                                                    <SelectItem key={type} value={type.toLowerCase().replace(/ /g, "_")}>{type}</SelectItem>
                                                                ))}
                                                            </SelectContent>
                                                        </Select>
                                                    </div>
                                                    <div>
                                                        <Label className={labelClasses}>INDUSTRY/SECTOR *</Label>
                                                        <Select>
                                                            <SelectTrigger className={inputClasses}>
                                                                <div className="truncate text-left flex-1">
                                                                    <SelectValue placeholder="Select Here" />
                                                                </div>
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                {INDUSTRY_SECTORS.map(s => (
                                                                    <SelectItem key={s} value={s.toLowerCase().replace(/ /g, "_")}>{s}</SelectItem>
                                                                ))}
                                                            </SelectContent>
                                                        </Select>
                                                    </div>
                                                    <div>
                                                        <Label className={labelClasses}>WEBSITE *</Label>
                                                        <Input required placeholder="Write Here.." className={inputClasses} />
                                                    </div>
                                                    <div className="lg:col-span-2">
                                                        <Label className={labelClasses}>EXHIBITOR ADDRESS *</Label>
                                                        <Input required placeholder="Write Here.." className={inputClasses} />
                                                    </div>
                                                    <div>
                                                        <Label className={labelClasses}>COUNTRY *</Label>
                                                        <Select>
                                                            <SelectTrigger className={inputClasses}>
                                                                <SelectValue placeholder="Select Here" />
                                                            </SelectTrigger>
                                                            <SelectContent className="max-h-[300px]">
                                                                {COUNTRIES.map(country => (
                                                                    <SelectItem key={country} value={country.toLowerCase().replace(/ /g, "_")}>{country}</SelectItem>
                                                                ))}
                                                            </SelectContent>
                                                        </Select>
                                                    </div>
                                                    <div>
                                                        <Label className={labelClasses}>STATE *</Label>
                                                        <Select>
                                                            <SelectTrigger className={inputClasses}>
                                                                <SelectValue placeholder="Select Here" />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                <SelectItem value="state1">State 1</SelectItem>
                                                                <SelectItem value="state2">State 2</SelectItem>
                                                            </SelectContent>
                                                        </Select>
                                                    </div>
                                                    <div>
                                                        <Label className={labelClasses}>CITY *</Label>
                                                        <Select>
                                                            <SelectTrigger className={inputClasses}>
                                                                <SelectValue placeholder="Select Here" />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                <SelectItem value="city1">City 1</SelectItem>
                                                                <SelectItem value="city2">City 2</SelectItem>
                                                            </SelectContent>
                                                        </Select>
                                                    </div>
                                                    <div>
                                                        <Label className={labelClasses}>Landline No.</Label>
                                                        <Input placeholder="Write Here.." className={inputClasses} />
                                                    </div>
                                                    <div>
                                                        <Label className={labelClasses}>GST NO. *</Label>
                                                        <Input required placeholder="Write Here.." className={inputClasses} />
                                                    </div>
                                                    <div>
                                                        <Label className={labelClasses}>PAN NO. *</Label>
                                                        <Input required placeholder="Write Here.." className={inputClasses} />
                                                    </div>
                                                    <div>
                                                        <Label className={labelClasses}>NATURE OF BUSINESS *</Label>
                                                        <Select>
                                                            <SelectTrigger className={inputClasses}>
                                                                <SelectValue placeholder="Select Here" />
                                                            </SelectTrigger>
                                                            <SelectContent className="max-h-[300px]">
                                                                {NATURE_OF_BUSINESS.map(nature => (
                                                                    <SelectItem key={nature} value={nature.toLowerCase().replace(/ /g, "_")}>{nature}</SelectItem>
                                                                ))}
                                                            </SelectContent>
                                                        </Select>
                                                    </div>
                                                    <div>
                                                        <Label className={labelClasses}>FASCIA NAME *</Label>
                                                        <Input required placeholder="Write Here.." className={inputClasses} />
                                                    </div>
                                                </div>
                                            </div>

                                            {/* ── EXHIBITOR CONTACT DETAILS ── */}
                                            <div className="space-y-6">
                                                <h3 
                                                    className="text-sm font-bold text-[#d26019] uppercase tracking-[0.05em] border-b border-slate-100 pb-1.5"
                                                    style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                                                >
                                                    Exhibitor Contact Details
                                                </h3>

                                                {/* First Contact Person */}
                                                <div className="space-y-3">
                                                    <h4 className="text-[11px] font-bold text-slate-800 border-l-4 border-[#23471d] pl-2 uppercase tracking-wider">First Contact Person Details</h4>
                                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-5 gap-y-3">
                                                        <div>
                                                            <Label className={labelClasses}>TITLE *</Label>
                                                            <Select>
                                                                <SelectTrigger className={inputClasses}>
                                                                    <SelectValue placeholder="Select Here" />
                                                                </SelectTrigger>
                                                                <SelectContent>
                                                                    <SelectItem value="mr">Mr.</SelectItem>
                                                                    <SelectItem value="ms">Ms.</SelectItem>
                                                                    <SelectItem value="dr">Dr.</SelectItem>
                                                                </SelectContent>
                                                            </Select>
                                                        </div>
                                                        <div>
                                                            <Label className={labelClasses}>FIRST NAME *</Label>
                                                            <Input required placeholder="Write Here.." className={inputClasses} />
                                                        </div>
                                                        <div>
                                                            <Label className={labelClasses}>LAST NAME *</Label>
                                                            <Input required placeholder="Write Here.." className={inputClasses} />
                                                        </div>
                                                        <div>
                                                            <Label className={labelClasses}>EMAIL *</Label>
                                                            <Input type="email" required placeholder="Write Here.." className={inputClasses} />
                                                        </div>
                                                        <div>
                                                            <Label className={labelClasses}>DESIGNATION *</Label>
                                                            <Input required placeholder="Write Here.." className={inputClasses} />
                                                        </div>
                                                        <div>
                                                            <Label className={labelClasses}>MOBILE *</Label>
                                                            <Input required placeholder="Write Here.." className={inputClasses} />
                                                        </div>
                                                        <div>
                                                            <Label className={labelClasses}>ALTERNATE NO. *</Label>
                                                            <Input required placeholder="Write Here.." className={inputClasses} />
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Second Contact Person */}
                                                <div className="space-y-3 pt-2">
                                                    <h4 className="text-[11px] font-bold text-slate-800 border-l-4 border-[#23471d] pl-2 uppercase tracking-wider">Second Contact Person Details</h4>
                                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-5 gap-y-3">
                                                        <div>
                                                            <Label className={labelClasses}>TITLE *</Label>
                                                            <Select>
                                                                <SelectTrigger className={inputClasses}>
                                                                    <SelectValue placeholder="Select Here" />
                                                                </SelectTrigger>
                                                                <SelectContent>
                                                                    <SelectItem value="mr">Mr.</SelectItem>
                                                                    <SelectItem value="ms">Ms.</SelectItem>
                                                                    <SelectItem value="dr">Dr.</SelectItem>
                                                                </SelectContent>
                                                            </Select>
                                                        </div>
                                                        <div>
                                                            <Label className={labelClasses}>FIRST NAME *</Label>
                                                            <Input required placeholder="Write Here.." className={inputClasses} />
                                                        </div>
                                                        <div>
                                                            <Label className={labelClasses}>LAST NAME *</Label>
                                                            <Input required placeholder="Write Here.." className={inputClasses} />
                                                        </div>
                                                        <div>
                                                            <Label className={labelClasses}>EMAIL *</Label>
                                                            <Input type="email" required placeholder="Write Here.." className={inputClasses} />
                                                        </div>
                                                        <div>
                                                            <Label className={labelClasses}>DESIGNATION *</Label>
                                                            <Input required placeholder="Write Here.." className={inputClasses} />
                                                        </div>
                                                        <div>
                                                            <Label className={labelClasses}>MOBILE *</Label>
                                                            <Input required placeholder="Write Here.." className={inputClasses} />
                                                        </div>
                                                        <div>
                                                            <Label className={labelClasses}>ALTERNATE NO. *</Label>
                                                            <Input required placeholder="Write Here.." className={inputClasses} />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* ── PARTICIPATION DETAILS ── */}
                                            <div className="space-y-5">
                                                <h3 
                                                    className="text-sm font-bold text-[#d26019] uppercase tracking-[0.05em] border-b border-slate-100 pb-1.5"
                                                    style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                                                >
                                                    Participation Details
                                                </h3>
                                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-5 gap-y-3">
                                                    <div>
                                                        <Label className={labelClasses}>STALL FOR *</Label>
                                                        <Select>
                                                            <SelectTrigger className={inputClasses}>
                                                                <SelectValue placeholder="Select Here" />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                <SelectItem value="stall1">Option 1</SelectItem>
                                                            </SelectContent>
                                                        </Select>
                                                    </div>
                                                    <div>
                                                        <Label className={labelClasses}>STALL SIZE *</Label>
                                                        <Select>
                                                            <SelectTrigger className={inputClasses}>
                                                                <SelectValue placeholder="Select Here" />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                <SelectItem value="9">9 sqm</SelectItem>
                                                                <SelectItem value="18">18 sqm</SelectItem>
                                                            </SelectContent>
                                                        </Select>
                                                    </div>
                                                    <div>
                                                        <Label className={labelClasses}>STALL CATEGORY *</Label>
                                                        <Select>
                                                            <SelectTrigger className={inputClasses}>
                                                                <SelectValue placeholder="Select Here" />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                <SelectItem value="cat1">Category 1</SelectItem>
                                                            </SelectContent>
                                                        </Select>
                                                    </div>
                                                    <div>
                                                        <Label className={labelClasses}>STALL TYPE *</Label>
                                                        <Select>
                                                            <SelectTrigger className={inputClasses}>
                                                                <SelectValue placeholder="Select Here" />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                <SelectItem value="shell">Shell Space</SelectItem>
                                                                <SelectItem value="raw">Raw Space</SelectItem>
                                                            </SelectContent>
                                                        </Select>
                                                    </div>
                                                    <div>
                                                        <Label className={labelClasses}>DIMENSION *</Label>
                                                        <Input required placeholder="Write Here.." className={inputClasses} />
                                                    </div>
                                                    <div>
                                                        <Label className={labelClasses}>STALL NO. *</Label>
                                                        <Input required placeholder="Write Here.." className={inputClasses} />
                                                    </div>
                                                    <div>
                                                        <Label className={labelClasses}>RATE *</Label>
                                                        <Input required placeholder="Write Here.." className={inputClasses} disabled />
                                                    </div>
                                                    <div>
                                                        <Label className={labelClasses}>DISCOUNT *</Label>
                                                        <Input placeholder="Write Here.." className={inputClasses} />
                                                    </div>
                                                    <div>
                                                        <Label className={labelClasses}>AMOUNT *</Label>
                                                        <Input required placeholder="Write Here.." className={inputClasses} disabled />
                                                    </div>
                                                    <div>
                                                        <Label className={labelClasses}>GST (%) *</Label>
                                                        <Input required placeholder="Write Here.." className={inputClasses} disabled />
                                                    </div>
                                                    <div>
                                                        <Label className={labelClasses}>TOTAL *</Label>
                                                        <Input required placeholder="Write Here.." className={inputClasses} disabled />
                                                    </div>
                                                </div>
                                            </div>

                                            {/* ── INDUSTRY INFORMATION ── */}
                                            <div className="space-y-6 pt-6 border-t border-slate-200">
                                                <div>
                                                    <h3 className="text-xs font-bold text-slate-900 uppercase tracking-tight">Industry Information <span className="text-[10px] font-normal text-slate-400 normal-case ml-2">(Please Select at least one..)</span></h3>
                                                </div>
                                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                                                    {sectors.map((cat, idx) => (
                                                        <div key={idx} className="space-y-3 bg-slate-50/50 p-4 border border-slate-300 rounded-[2px] shadow-sm">
                                                            <h4 className="text-[10px] font-bold uppercase tracking-[0.1em] text-[#23471d] border-b border-slate-200 pb-1.5">{cat.category}</h4>
                                                            <div className="space-y-2">
                                                                {cat.options.map((opt, oIdx) => (
                                                                    <label key={oIdx} className="flex items-start gap-2.5 cursor-pointer group">
                                                                        <Checkbox className="rounded-none w-3.5 h-3.5 border-slate-400 data-[state=checked]:bg-[#23471d] data-[state=checked]:border-[#23471d] mt-0.5" />
                                                                        <span className="text-[11px] text-slate-600 group-hover:text-slate-900 leading-tight transition-colors font-medium">{opt}</span>
                                                                    </label>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                                <div className="mt-6 space-y-2">
                                                    <h3 className="text-[11px] font-bold text-slate-900 uppercase tracking-wider">OTHER INDUSTRY/SECTOR</h3>
                                                    <Input placeholder="Write Here.." className={inputClasses} />
                                                </div>
                                            </div>

                                            {/* ── SUBMIT BAR ── */}
                                            <div className="pt-6 flex flex-col items-center">
                                                <Button
                                                    type="submit"
                                                    className="w-full max-w-sm h-12 rounded-sm bg-[#23471d] hover:bg-[#1a3516] text-white font-bold text-xs uppercase tracking-widest transition-all duration-300 shadow-xl shadow-[#23471d]/10 flex items-center justify-center gap-3 group"
                                                >
                                                    Proceed for Payment
                                                    <Send size={16} />
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

export default BookAStand;