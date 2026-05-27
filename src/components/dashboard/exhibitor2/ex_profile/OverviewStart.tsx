import { Pencil, Edit2, Trash2, MapPin, Link2, Globe, Eye, Upload, Package, UserPlus, Shield, FileText, Phone, Mail, Monitor, FlaskConical, BedDouble, Syringe, Heart } from "lucide-react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

// ─── Donut Chart ──────────────────────────────────────────────────────────────

function DonutChart({ percent }: { percent: number }) {
    const r = 40, cx = 50, cy = 50;
    const circ = 2 * Math.PI * r;
    const dash = (percent / 100) * circ;
    return (
        <svg width="100" height="100" viewBox="0 0 100 100">
            <circle cx={cx} cy={cy} r={r} fill="none" stroke="#e5e7eb" strokeWidth="8" />
            <circle cx={cx} cy={cy} r={r} fill="none" stroke="#22a96a" strokeWidth="8"
                strokeDasharray={`${dash} ${circ}`} strokeLinecap="round"
                transform={`rotate(-90 ${cx} ${cy})`} />
            <text x={cx} y={cy - 4} textAnchor="middle" fill="#1a3a7c" fontSize="14" fontWeight="900">{percent}%</text>
            <text x={cx} y={cy + 12} textAnchor="middle" fill="#22a96a" fontSize="9" fontWeight="700">Complete</text>
        </svg>
    );
}


const DEFAULT_AVATAR = "https://ui-avatars.com/api/?background=e2e8f0&color=64748b&size=128";

const teamList = [
    {
        name: "Neha Patel",
        designation: "Marketing Head",
        email: "neha.patel@abchealthcare.com",
        mobile: "+91 91234 56789",
        isPrimary: true,
        photoUrl: "https://randomuser.me/api/portraits/women/44.jpg",
    },
    {
        name: "Vikram Mehta",
        designation: "Sales Manager",
        email: "vikram.mehta@abchealthcare.com",
        mobile: "+91 99876 54321",
        isPrimary: false,
        photoUrl: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    {
        name: "Pooja Nair",
        designation: "Product Specialist",
        email: "pooja.nair@abchealthcare.com",
        mobile: "+91 88776 65544",
        isPrimary: false,
        photoUrl: "https://randomuser.me/api/portraits/women/68.jpg",
    },
    {
        name: "Arjun Verma",
        designation: "Technical Support",
        email: "arjun.verma@abchealthcare.com",
        mobile: "+91 77665 44332",
        isPrimary: false,
        photoUrl: "https://randomuser.me/api/portraits/men/75.jpg",
    },
];

// ─── Data ─────────────────────────────────────────────────────────────────────

const QUICK_ACTIONS = [
    { label: "Upload Logo", icon: Upload, color: "text-blue-500" },
    { label: "Add Product", icon: Package, color: "text-blue-500" },
    { label: "Add Team Member", icon: UserPlus, color: "text-blue-500" },
    { label: "Add Certificate", icon: Shield, color: "text-amber-500" },
    { label: "Upload Brochure", icon: FileText, color: "text-blue-500" },
    { label: "Update Details", icon: Pencil, color: "text-blue-400" },
];

const CATEGORIES = [
    { label: "Medical\nDevices", icon: Monitor, color: "text-blue-500", bg: "bg-blue-50" },
    { label: "Diagnostic\nEquipment", icon: FlaskConical, color: "text-blue-500", bg: "bg-blue-50" },
    { label: "Hospital\nFurniture", icon: BedDouble, color: "text-blue-500", bg: "bg-blue-50" },
    { label: "Disposables &\nConsumables", icon: Syringe, color: "text-blue-500", bg: "bg-blue-50" },
    { label: "Health & Wellness\nProducts", icon: Heart, color: "text-emerald-500", bg: "bg-emerald-50" },
];

const CERTS = [
    { line: "ISO 13485:2016 Certified", logo: "ISO", color: "#1a3a7c", isGmp: false },
    { line: "CE Certified", logo: "CE", color: "#111827", isGmp: false },
    { line: "ISO 9001:2015 Certified", logo: "ISO", color: "#1a3a7c", isGmp: false },
    { line: "GMP Certified", logo: "GMP", color: "#ffffff", isGmp: true },
];

// ─── Component ────────────────────────────────────────────────────────────────

export default function OverviewStart() {
    return (
        <div className="p-6 bg-[#f4f6fb] min-h-screen">
            <div className="w-full flex gap-2 items-start">

                {/* ══ LEFT COLUMN ══ */}
                <div className="flex w-[75%] flex-col gap-4 min-w-0">

                    {/* ── Company Header Card ── */}
                    <div className="bg-white rounded-lg border border-gray-100 shadow-sm overflow-visible">

                        {/* Banner */}
                        <div className="relative h-32 rounded-t-lg overflow-hidden"
                            style={{ background: "linear-gradient(135deg, #1a3a9c 0%, #1565c0 40%, #1976d2 70%, #1e88e5 100%)" }}>
                            {/* Circuit / hex pattern */}
                            <svg className="absolute inset-0 w-full h-full opacity-20" viewBox="0 0 600 130" preserveAspectRatio="xMidYMid slice">
                                <polygon points="480,10 510,28 510,64 480,82 450,64 450,28" fill="none" stroke="white" strokeWidth="1.5" />
                                <polygon points="540,40 560,52 560,76 540,88 520,76 520,52" fill="none" stroke="white" strokeWidth="1" />
                                <polygon points="420,50 440,62 440,86 420,98 400,86 400,62" fill="none" stroke="white" strokeWidth="1" />
                                <circle cx="350" cy="30" r="18" fill="none" stroke="white" strokeWidth="1.5" />
                                <path d="M340 30 h20 M350 20 v20" stroke="white" strokeWidth="2" strokeLinecap="round" />
                                <circle cx="430" cy="20" r="12" fill="none" stroke="white" strokeWidth="1" />
                                <path d="M424 20 h12 M430 14 v12" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
                                {/* ECG line */}
                                <path d="M100 65 L160 65 L180 30 L200 100 L220 45 L240 65 L580 65" fill="none" stroke="white" strokeWidth="1.5" opacity="0.6" />
                                {/* Shield icon */}
                                <path d="M500 55 L510 60 L520 55 L520 70 Q510 78 500 70 Z" fill="none" stroke="white" strokeWidth="1.2" />
                            </svg>

                            {/* Verified badge inside banner */}
                            <div className="absolute bottom-2 left-[155px] flex items-center gap-1.5 px-3 py-1 rounded-full bg-white backdrop-blur-sm border border-white/30">
                                <div className="w-4 h-4 rounded-full bg-emerald-400 flex items-center justify-center shrink-0">
                                    <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                                        <path d="M1.5 4L3 5.5L6.5 2" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </div>
                                <span className="text-[11px] font-semibold text-[#1a3a7c]">Verified Exhibitor</span>
                            </div>
                        </div>

                        {/* Body — logo overlaps banner */}
                        <div className="flex gap-5 px-6 pb-6">
                            {/* Logo circle — overlaps banner */}
                            <div className="relative shrink-0" style={{ marginTop: "-48px" }}>
                                <div className="w-28 h-28 rounded-full bg-white border-4 border-white shadow-xl flex flex-col items-center justify-center">
                                    <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-emerald-400 to-teal-600 flex items-center justify-center mb-1 shadow-sm">
                                        <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                                            <path d="M11 4v14M4 11h14" stroke="white" strokeWidth="3" strokeLinecap="round" />
                                        </svg>
                                    </div>
                                    <span className="text-[9px] font-black text-[#1a3a7c] text-center leading-tight">ABC<br />HEALTHCARE</span>
                                </div>
                            </div>

                            {/* Info */}
                            <div className="flex-1 pt-3 min-w-0">
                                <div className="flex items-center gap-2 mb-1">
                                    <h2 className="text-[20px] font-semibold text-[#0A143D]">ABC Healthcare Pvt. Ltd.</h2>
                                    <button className="text-gray-600 hover:text-gray-700 transition-colors shrink-0">
                                        <Pencil size={14} />
                                    </button>
                                </div>

                                <p className="text-[13px] text-gray-600 mb-2.5">Healthcare Equipment & Medical Devices</p>

                                <div className="flex items-center gap-5 mb-3 flex-wrap">
                                    <div className="flex items-center gap-1.5">
                                        <MapPin size={13} className="text-gray-600 shrink-0" />
                                        <span className="text-[12px] text-gray-600">Mumbai, Maharashtra, India</span>
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <Link2 size={13} className="text-gray-400 shrink-0" />
                                        <a href="#" className="text-[12px] text-blue-500 hover:underline">www.abchealthcare.com</a>
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <Globe size={13} className="text-gray-400 shrink-0" />
                                        <span className="text-[12px] text-gray-500">India</span>
                                    </div>
                                </div>

                                <p className="text-[13px] text-gray-600 leading-relaxed mb-5 max-w-2xl">
                                    ABC Healthcare Pvt. Ltd. is a leading manufacturer and supplier of advanced medical equipment and healthcare solutions. With over 15 years of excellence, we serve hospitals, clinics and healthcare professionals across India and abroad.
                                </p>

                                <div className="flex items-center gap-3">
                                    <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white text-[13px] font-bold transition-colors shadow-sm">
                                        <Pencil size={13} />
                                        Edit Profile
                                    </button>
                                    <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 text-[13px] font-semibold transition-colors">
                                        <Eye size={13} />
                                        View Public Profile
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* ── Bottom Row ── */}
                    <div className="flex gap-2 w-full">

                        {/* Product Categories */}
                        <div className="flex flex-col w-[60%] bg-white rounded-lg border border-gray-100 shadow-sm py-5 px-2">
                            <div className="flex items-center justify-between mb-4">
                                <span className="text-base font-semibold text-[#0A143D]">Product Categories</span>
                                <button className="text-[12px] font-semibold text-blue-500 hover:text-blue-700">Manage</button>
                            </div>
                            <div className="grid grid-cols-3 lg:grid-cols-5 gap-0.5">
                                {CATEGORIES.map((cat, i) => {
                                    const Icon = cat.icon;
                                    return (
                                        <div key={i} className="flex flex-col items-center gap-2">
                                            <div className={`w-12 h-12 rounded-lg border border-gray-100 flex items-center justify-center`}>
                                                <Icon size={18} className={cat.color} strokeWidth={1.4} />
                                            </div>
                                            <span className="text-[10px] font-medium text-gray-800 text-center leading-tight whitespace-pre-line">{cat.label}</span>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Key Certificates */}
                        <div className="flex flex-col w-[40%] bg-white rounded-lg border border-gray-100 shadow-sm py-5 px-3">
                            <div className="flex items-center justify-between mb-4">
                                <span className="text-base font-semibold text-[#0A143D]">Key Certificates</span>
                                <button className="text-[12px] font-semibold text-blue-500 hover:text-blue-700">Manage</button>
                            </div>
                            <div className="grid grid-cols-3 lg:grid-cols-4 gap-4">
                                {CERTS.map((cert, i) => (
                                    <div key={i} className="flex flex-col items-center gap-2">
                                        {/* Box */}
                                        <div className="w-14 h-14 rounded-lg border border-gray-200 bg-white shadow-sm flex items-center justify-center">
                                            {cert.isGmp ? (
                                                <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center">
                                                    <span className="text-[13px] font-black text-white">{cert.logo}</span>
                                                </div>
                                            ) : (
                                                <span className="text-[15px] font-black leading-none" style={{ color: cert.color }}>{cert.logo}</span>
                                            )}
                                        </div>
                                        {/* Label */}
                                        <span className="text-[10px] font-semibold text-gray-600 text-center leading-tight line-clamp-2">{cert.line}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>
                </div>

                {/* ══ RIGHT COLUMN ══ */}
                <div className="w-[25%] shrink-0 flex flex-col gap-3">

                    {/* Profile Completeness */}
                    <div className="bg-white rounded-lg border border-gray-100 shadow-sm p-2">
                        <h3 className="text-base font-semibold text-gray-800">Profile Completeness</h3>
                        <div className="flex  gap-1 mt-2">
                            <div className="shrink-0">
                                <DonutChart percent={85} />
                            </div>
                            <div className="flex flex-col gap-2">
                                <div>
                                    <p className="text-[13px] text-gray-600 ">
                                        Great! Your profile is almost complete. Add more details to improve your visibility.
                                    </p>
                                </div>

                                <div className="w-full bg-gray-100 rounded-full h-1.5 ">
                                    <div className="bg-emerald-500 h-1.5 rounded-full" style={{ width: "85%" }} />
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-[11px] text-gray-400">5 of 6 sections completed</span>
                                </div>
                                <div className="flex justify-end">
                                    <button className="text-[12px] font-semibold text-blue-500 hover:text-blue-700">Complete Now →</button>

                                </div>
                            </div>
                        </div>

                    </div>

                    {/* Quick Actions */}
                    <div className="bg-white rounded-lg border border-gray-100 shadow-sm p-2">
                        <h3 className="text-base font-semibold text-[#0A143D]">Quick Actions</h3>
                        <div className="grid grid-cols-3 gap-2">
                            {QUICK_ACTIONS.map((action, i) => {
                                const Icon = action.icon;
                                return (
                                    <button key={i} className="flex flex-col items-center gap-2 py-3 px-1 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors group">
                                        <Icon size={22} className={`${action.color} group-hover:scale-110 transition-transform`} strokeWidth={1.5} />
                                        <span className="text-[8px] text-gray-700 text-center  font-medium">{action.label}</span>
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Primary Contact */}
                    <div className="bg-white rounded-lg border border-gray-100 shadow-sm p-3">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-base font-semibold text-[#0A143D]">Primary Contact</h3>
                            <button className="text-[12px] font-semibold text-blue-500 hover:text-blue-700">Edit</button>
                        </div>
                        <div className="flex items-start gap-3">
                            <div className="w-16 h-16 rounded-full overflow-hidden shrink-0 bg-gray-200">
                                <div className="w-full h-full bg-gradient-to-br from-gray-300 to-gray-500 flex items-center justify-center">
                                    {/* <span className="text-white font-black text-xl">R</span> */}
                                    <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="" />
                                </div>
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-[14px] font-medium text-[#0A143D] mb-0.5">Rahul Sharma</p>
                                <p className="text-[12px] text-gray-600 mb-2">Manager – Business Development</p>
                                <div className="flex items-center gap-2 mb-1.5">
                                    <Phone size={13} className="text-gray-400 shrink-0" />
                                    <span className="text-[12px] text-gray-700">+91 98765 43210</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Mail size={13} className="text-gray-400 shrink-0" />
                                    <span className="text-[11px] text-gray-700 truncate">rahul.sharma@abchealthcare.com</span>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            {/* 3. BOTTOM ROW: TEAM MEMBERS */}
            <div className="bg-white rounded-xl py-3 px-2 mt-3 border border-[#e5eaf2] shadow-[0_1px_8px_rgba(15,23,42,0.08)]  relative xl:col-span-4">
                <div className="flex items-center justify-between">
                    <h3 className="text-base font-semibold text-[#0A143D]">
                        Team Members ({teamList.length})
                    </h3>
                    <button
                        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-lg text-sm font-medium bg-[#08245b] hover:bg-[#071f4e] text-white transition-all print:hidden"
                    >
                        <UserPlus size={14} />
                        Manage Team
                    </button>
                </div>

                {/* Team Members Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 mt-3 gap-4">
                    {teamList.map((member, index) => (
                        <div
                            key={index}
                            className="bg-white border border-[#e5eaf2] rounded-lg px-4 py-2 flex items-center gap-4 hover:shadow-sm hover:border-slate-200 transition-all group relative min-h-[112px]"
                        >
                            {/* Edit buttons on hover */}
                            <div className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 flex items-center gap-1 transition-opacity print:hidden">
                                <button

                                    className="p-1 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded"
                                >
                                    <Edit2 size={12} />
                                </button>
                                <button

                                    className="p-1 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded"
                                >
                                    <Trash2 size={12} />
                                </button>
                            </div>

                            <div className="w-[60px] h-[60px] rounded-full overflow-hidden shrink-0 border border-slate-100">
                                <img
                                    src={member.photoUrl || DEFAULT_AVATAR}
                                    alt={member.name}
                                    className="w-full h-full object-cover"
                                />
                            </div>

                            <div className="space-y-1 min-w-0 text-sm text-[#26365f] font-semibold">
                                <div className="flex flex-wrap items-center gap-2">
                                    <h4 className="text-sm font-semibold text-[#14234a] truncate max-w-[135px]">
                                        {member.name}
                                    </h4>
                                    {member.isPrimary && (
                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-[10px] font-medium bg-[#d9f4e9] text-[#158568]">
                                            Primary
                                        </span>
                                    )}
                                </div>
                                <p className="text-[13px] font-medium text-gray-600 truncate">
                                    {member.designation}
                                </p>
                                <div className="truncate text-gray-600 text-xs">
                                    {member.email}
                                </div>
                                <div className="flex items-center gap-2 text-gray-600 text-xs">
                                    <Phone size={14} className="text-gray-600 shrink-0" />
                                    <span>{member.mobile}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="flex justify-center pt-3 print:hidden">
                    <button

                        className="inline-flex items-center gap-1 text-sm font-bold text-blue-600 hover:text-blue-700 hover:underline"
                    >
                        + Add Team Member
                    </button>
                </div>
            </div>
        </div>
    );
}