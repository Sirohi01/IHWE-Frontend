import { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
    Pencil, Edit2, Trash2, MapPin, Link2, Globe, Eye, Upload, Package, UserPlus, Shield,
    FileText, Phone, Users, Mail, Monitor, FlaskConical, BedDouble, Syringe, Heart, Camera, X, Check,
    AlertCircle, ShieldCheck, User, IdCard, Badge, Utensils, Car
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { API_URL, SERVER_URL } from "@/lib/api";
import { toast } from "sonner";
import { useExhibitorCtx } from "@/context/ExhibitorContext";

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

const DEFAULT_PLACEHOLDER = "https://placehold.co/400x400?text=No+Logo";

const fixUrl = (url?: string) => {
    if (!url || url === "undefined" || url === "null") return "";
    if (url.startsWith("http") || url.startsWith("blob:")) return url;
    const cleanPath = url.startsWith("/") ? url : `/${url}`;
    return url.includes("res.cloudinary.com") ? url : `${SERVER_URL}${cleanPath}`;
};

// Generic person-icon avatar shown when a contact/team member has no real photo on file.
const Avatar = ({ url, alt, className }: { url?: string; alt: string; className: string }) => {
    const resolved = fixUrl(url);
    return resolved ? (
        <img loading="lazy" decoding="async" src={resolved} alt={alt} className={`${className} object-cover`} />
    ) : (
        <div className={`${className} bg-slate-100 flex items-center justify-center text-slate-300`}>
            <User className="w-1/2 h-1/2" />
        </div>
    );
};

// Fixed selectable taxonomy for an exhibitor's product categories (not exhibitor-specific data).
const PRODUCT_CATEGORIES = [
    { id: "Medical Devices", name: "Medical Devices", icon: Monitor, color: "text-blue-500", bg: "bg-blue-50" },
    { id: "Diagnostic Equipment", name: "Diagnostic Equipment", icon: FlaskConical, color: "text-blue-500", bg: "bg-blue-50" },
    { id: "Hospital Furniture", name: "Hospital Furniture", icon: BedDouble, color: "text-blue-500", bg: "bg-blue-50" },
    { id: "Disposables & Consumables", name: "Disposables & Consumables", icon: Syringe, color: "text-blue-500", bg: "bg-blue-50" },
    { id: "Health & Wellness Products", name: "Health & Wellness Products", icon: Heart, color: "text-emerald-500", bg: "bg-emerald-50" },
];

// Backend only stores {name, fileUrl, issuedDate, expiryDate} for certificates - derive the
// display badge code/color from the name instead of relying on a field that isn't persisted.
const certBadge = (name = "") => {
    const upper = name.toUpperCase();
    if (upper.includes("CE")) return { logo: "CE", color: "#111827", isGmp: false };
    if (upper.includes("GMP")) return { logo: "GMP", color: "#ffffff", isGmp: true };
    return { logo: "ISO", color: "#1a3a7c", isGmp: false };
};

const VERIFICATION_BADGES: Record<string, { label: string; icon: any; dot: string }> = {
    verified: { label: "Verified Exhibitor", icon: ShieldCheck, dot: "bg-emerald-400" },
    pending: { label: "Verification Pending", icon: AlertCircle, dot: "bg-amber-400" },
    rejected: { label: "Verification Rejected", icon: AlertCircle, dot: "bg-rose-400" },
};

const QUICK_ACTIONS = [
    { label: "Upload Logo", icon: Upload, color: "text-blue-500", key: "logo" },
    { label: "Add Product", icon: Package, color: "text-blue-500", key: "product" },
    { label: "Add Team Member", icon: UserPlus, color: "text-blue-500", key: "team" },
    { label: "Add Certificate", icon: Shield, color: "text-amber-500", key: "certificates" },
    { label: "Upload Brochure", icon: FileText, color: "text-blue-500", key: "brochure" },
    { label: "Update Details", icon: Pencil, color: "text-blue-400", key: "profile" },
];

// ─── Component ────────────────────────────────────────────────────────────────

export default function OverviewStart() {
    const navigate = useNavigate();
    const { data, setData, fetchDashboard } = useExhibitorCtx();

    const [activeModal, setActiveModal] = useState<string | null>(null);
    const [saving, setSaving] = useState(false);
    const [selectedTeamMember, setSelectedTeamMember] = useState<number | null>(null);

    const [profileForm, setProfileForm] = useState({
        brandName: "", website: "", address: "", city: "", state: "", country: "", pincode: "", companyDescription: "",
    });
    const [contactForm, setContactForm] = useState({
        title: "Mr.", firstName: "", lastName: "", email: "", designation: "", mobile: "", photoUrl: "",
    });
    const [teamMemberForm, setTeamMemberForm] = useState({
        name: "", designation: "", department: "", roleAtExhibition: "", email: "", mobile: "", isPrimary: false, photoUrl: "", passes: { exhibitor: false, vehicle: false, service: false, visitor: false },
    });

    const [categorySelection, setCategorySelection] = useState<string[]>([]);
    const [certificateList, setCertificateList] = useState<any[]>([]);
    const [teamList, setTeamList] = useState<any[]>([]);
    const [newCertName, setNewCertName] = useState("");

    const logoInputRef = useRef<HTMLInputElement>(null);
    const contactPhotoInputRef = useRef<HTMLInputElement>(null);
    const teamPhotoInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (data) {
            setProfileForm({
                brandName: data.brandName || data.exhibitorName || "",
                website: data.website || "",
                address: data.address || "",
                city: data.city || "",
                state: data.state || "",
                country: data.country || "India",
                pincode: data.pincode || "",
                companyDescription: data.companyDescription || "",
            });
            setContactForm({
                title: data.contact1?.title || "Mr.",
                firstName: data.contact1?.firstName || "",
                lastName: data.contact1?.lastName || "",
                email: data.contact1?.email || "",
                designation: data.contact1?.designation || "",
                mobile: data.contact1?.mobile || "",
                photoUrl: data.contact1?.photoUrl || "",
            });
            setCategorySelection(data.productCategories || []);
            setCertificateList(data.certificates || []);
            setTeamList(data.teamMembers || []);
        }
    }, [data]);

    const verificationBadge = VERIFICATION_BADGES[data?.verificationStatus] || null;

    const calculateCompleteness = () => {
        let completed = 0;
        const total = 6;
        if (data?.companyLogoUrl) completed++;
        if (profileForm.brandName) completed++;
        if (profileForm.companyDescription) completed++;
        if (categorySelection.length > 0) completed++;
        if (certificateList.length > 0) completed++;
        if (contactForm.firstName && contactForm.email) completed++;
        return { percentage: Math.round((completed / total) * 100), completed, total };
    };
    const completeness = calculateCompleteness();

    const saveProfileData = async (payload: Record<string, any>) => {
        setSaving(true);
        try {
            const token = localStorage.getItem("exhibitorToken");
            const formData = new FormData();
            Object.entries(payload).forEach(([key, value]) => {
                formData.append(key, typeof value === "object" ? JSON.stringify(value) : (value as any));
            });
            const res = await fetch(`${API_URL}/exhibitor-auth/update-profile?id=${data._id}`, {
                method: "PUT",
                headers: { Authorization: `Bearer ${token}` },
                body: formData,
            });
            const result = await res.json();
            if (result.success) {
                toast.success("Profile Saved Successfully!");
                if (result.data) setData(result.data);
                setActiveModal(null);
                await fetchDashboard();
            } else {
                toast.error(result.message || "Saving failed");
            }
        } catch (error) {
            toast.error("Error saving data");
        } finally {
            setSaving(false);
        }
    };

    const handleLogoUpload = async (file?: File) => {
        if (!file) return;
        if (file.size > 5 * 1024 * 1024) return toast.error("File size should be less than 5MB");
        if (!file.type.startsWith("image/")) return toast.error("Only image files are allowed");

        const loadingToast = toast.loading("Uploading company logo...");
        try {
            const token = localStorage.getItem("exhibitorToken");
            const formData = new FormData();
            formData.append("companyLogo", file);
            const res = await fetch(`${API_URL}/exhibitor-auth/update-profile?id=${data._id}`, {
                method: "PUT",
                headers: { Authorization: `Bearer ${token}` },
                body: formData,
            });
            const result = await res.json();
            toast.dismiss(loadingToast);
            if (result.success) {
                toast.success("Logo Uploaded Successfully!");
                if (result.data) setData(result.data);
                await fetchDashboard();
            } else {
                toast.error(result.message || "Logo upload failed");
            }
        } catch {
            toast.dismiss(loadingToast);
            toast.error("Error uploading logo");
        }
    };
    const uploadPersonPhoto = async (file: File | undefined, onUploaded: (url: string) => void) => {
        if (!file) return;
        if (file.size > 5 * 1024 * 1024) return toast.error("File size should be less than 5MB");
        if (!file.type.startsWith("image/")) return toast.error("Only image files are allowed");

        const loadingToast = toast.loading("Uploading photo...");
        try {
            const token = localStorage.getItem("exhibitorToken");
            const formData = new FormData();
            formData.append("photo", file);
            const res = await fetch(`${API_URL}/exhibitor-auth/team-member-photo`, {
                method: "POST",
                headers: { Authorization: `Bearer ${token}` },
                body: formData,
            });
            const result = await res.json();
            toast.dismiss(loadingToast);
            if (result.success) {
                toast.success("Photo uploaded successfully!");
                onUploaded(result.photoUrl);
            } else {
                toast.error(result.message || "Photo upload failed");
            }
        } catch {
            toast.dismiss(loadingToast);
            toast.error("Error uploading photo");
        }
    };

    const handleCategoryToggle = (catId: string) => {
        setCategorySelection((prev) => prev.includes(catId) ? prev.filter((c) => c !== catId) : [...prev, catId]);
    };
    const saveCategories = () => saveProfileData({ productCategories: categorySelection });

    const addCertificate = () => {
        if (!newCertName.trim()) return;
        const updatedList = [...certificateList, { name: newCertName.trim() }];
        setCertificateList(updatedList);
        setNewCertName("");
        saveProfileData({ certificates: updatedList });
    };
    const deleteCertificate = (index: number) => {
        const updatedList = certificateList.filter((_, i) => i !== index);
        setCertificateList(updatedList);
        saveProfileData({ certificates: updatedList });
    };

    const openAddTeamMember = () => {
        navigate('/exhibitor-dashboard/add-team-members');
    };
    const openEditTeamMember = (index: number, member: any) => {
        setSelectedTeamMember(index);
        setTeamMemberForm({ ...member });
        setActiveModal("team");
    };
    const saveTeamMember = () => {
        if (!teamMemberForm.name.trim() || !teamMemberForm.designation.trim()) {
            toast.error("Name and designation are required.");
            return;
        }
        let updatedList = [...teamList];
        if (teamMemberForm.isPrimary) updatedList = updatedList.map((m) => ({ ...m, isPrimary: false }));
        if (selectedTeamMember !== null) updatedList[selectedTeamMember] = teamMemberForm;
        else updatedList.push(teamMemberForm);
        setTeamList(updatedList);
        saveProfileData({ teamMembers: updatedList });
    };
    const deleteTeamMember = (index: number) => {
        const updatedList = teamList.filter((_, i) => i !== index);
        setTeamList(updatedList);
        saveProfileData({ teamMembers: updatedList });
    };

    const saveContact = () => {
        if (!contactForm.firstName.trim() || !contactForm.email.trim()) {
            toast.error("First Name and Email are required.");
            return;
        }
        saveProfileData({ contact1: contactForm });
    };

    if (!data) return <div className="p-6 text-gray-500">Loading...</div>;

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
                            <svg className="absolute inset-0 w-full h-full opacity-20" viewBox="0 0 600 130" preserveAspectRatio="xMidYMid slice">
                                <polygon points="480,10 510,28 510,64 480,82 450,64 450,28" fill="none" stroke="white" strokeWidth="1.5" />
                                <polygon points="540,40 560,52 560,76 540,88 520,76 520,52" fill="none" stroke="white" strokeWidth="1" />
                                <polygon points="420,50 440,62 440,86 420,98 400,86 400,62" fill="none" stroke="white" strokeWidth="1" />
                                <circle cx="350" cy="30" r="18" fill="none" stroke="white" strokeWidth="1.5" />
                                <path d="M340 30 h20 M350 20 v20" stroke="white" strokeWidth="2" strokeLinecap="round" />
                                <circle cx="430" cy="20" r="12" fill="none" stroke="white" strokeWidth="1" />
                                <path d="M424 20 h12 M430 14 v12" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
                                <path d="M100 65 L160 65 L180 30 L200 100 L220 45 L240 65 L580 65" fill="none" stroke="white" strokeWidth="1.5" opacity="0.6" />
                                <path d="M500 55 L510 60 L520 55 L520 70 Q510 78 500 70 Z" fill="none" stroke="white" strokeWidth="1.2" />
                            </svg>

                            {verificationBadge && (
                                <div className="absolute bottom-2 left-[155px] flex items-center gap-1.5 px-3 py-1 rounded-full bg-white backdrop-blur-sm border border-white/30">
                                    <div className={`w-4 h-4 rounded-full ${verificationBadge.dot} flex items-center justify-center shrink-0`}>
                                        <verificationBadge.icon size={9} className="text-white" />
                                    </div>
                                    <span className="text-[11px] font-semibold text-[#1a3a7c]">{verificationBadge.label}</span>
                                </div>
                            )}
                        </div>

                        {/* Body — logo overlaps banner */}
                        <div className="flex gap-5 px-6 pb-6">
                            <div className="relative shrink-0 group" style={{ marginTop: "-48px" }}>
                                <div className="w-28 h-28 rounded-full bg-white border-4 border-white shadow-xl flex flex-col items-center justify-center overflow-hidden">
                                    {data?.companyLogoUrl ? (
                                        <img loading="lazy" decoding="async" src={fixUrl(data.companyLogoUrl) || DEFAULT_PLACEHOLDER} alt="Company Logo" className="w-full h-full object-contain p-2" />
                                    ) : (
                                        <>
                                            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-emerald-400 to-teal-600 flex items-center justify-center mb-1 shadow-sm">
                                                <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                                                    <path d="M11 4v14M4 11h14" stroke="white" strokeWidth="3" strokeLinecap="round" />
                                                </svg>
                                            </div>
                                            <span className="text-[9px] font-black text-[#1a3a7c] text-center leading-tight px-2">{(profileForm.brandName || "Your Company").toUpperCase()}</span>
                                        </>
                                    )}
                                </div>
                                <div
                                    onClick={() => logoInputRef.current?.click()}
                                    className="absolute inset-0 rounded-full bg-black/60 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center cursor-pointer transition-all text-white"
                                >
                                    <Camera size={20} className="mb-1" />
                                    <span className="text-[9px] font-semibold uppercase">Upload</span>
                                    <input type="file" ref={logoInputRef} className="hidden" accept="image/*" onChange={(e) => handleLogoUpload(e.target.files?.[0])} />
                                </div>
                            </div>

                            {/* Info */}
                            <div className="flex-1 pt-3 min-w-0">
                                <div className="flex items-center gap-2 mb-1">
                                    <h2 className="text-[20px] font-semibold text-[#0A143D]">{profileForm.brandName || "Company name not added"}</h2>
                                    <button onClick={() => setActiveModal("profile")} className="text-gray-600 hover:text-gray-700 transition-colors shrink-0">
                                        <Pencil size={14} />
                                    </button>
                                </div>

                                {data?.industrySector && (
                                    <p className="text-[13px] text-gray-600 mb-2.5">{data.industrySector}</p>
                                )}

                                <div className="flex items-center gap-5 mb-3 flex-wrap">
                                    <div className="flex items-center gap-1.5">
                                        <MapPin size={13} className="text-gray-600 shrink-0" />
                                        <span className="text-[12px] text-gray-600">
                                            {profileForm.city ? `${profileForm.city}, ${profileForm.state}, ${profileForm.country}` : "Address not added"}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <Link2 size={13} className="text-gray-400 shrink-0" />
                                        {profileForm.website ? (
                                            <a href={profileForm.website.startsWith("http") ? profileForm.website : `https://${profileForm.website}`} target="_blank" rel="noopener noreferrer" className="text-[12px] text-blue-500 hover:underline">
                                                {profileForm.website}
                                            </a>
                                        ) : (
                                            <span className="text-[12px] text-gray-400">Website not added</span>
                                        )}
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <Globe size={13} className="text-gray-400 shrink-0" />
                                        <span className="text-[12px] text-gray-500">{profileForm.country || "India"}</span>
                                    </div>
                                </div>

                                <p className={`text-[13px] leading-relaxed mb-5 max-w-2xl ${profileForm.companyDescription ? "text-gray-600" : "text-gray-400 italic"}`}>
                                    {profileForm.companyDescription || "No company description added yet. Click 'Edit Profile' to add one."}
                                </p>

                                <div className="flex items-center gap-3">
                                    <button onClick={() => setActiveModal("profile")} className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white text-[13px] font-bold transition-colors shadow-sm">
                                        <Pencil size={13} />
                                        Edit Profile
                                    </button>
                                    <button onClick={() => window.open("/profile")} className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 text-[13px] font-semibold transition-colors">
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
                                <button onClick={() => setActiveModal("categories")} className="text-[12px] font-semibold text-blue-500 hover:text-blue-700">Manage</button>
                            </div>
                            <div className="grid grid-cols-3 lg:grid-cols-5 gap-0.5">
                                {PRODUCT_CATEGORIES.filter((cat) => categorySelection.includes(cat.id)).map((cat, i) => {
                                    const Icon = cat.icon;
                                    return (
                                        <div key={i} className="flex flex-col items-center gap-2">
                                            <div className="w-12 h-12 rounded-lg border border-gray-100 flex items-center justify-center">
                                                <Icon size={18} className={cat.color} strokeWidth={1.4} />
                                            </div>
                                            <span className="text-[10px] font-medium text-gray-800 text-center leading-tight">{cat.name}</span>
                                        </div>
                                    );
                                })}
                                {categorySelection.length === 0 && (
                                    <div className="col-span-full py-4 text-center text-gray-400 text-[11px] font-medium">
                                        No categories selected. Click 'Manage' to choose.
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Key Certificates */}
                        <div className="flex flex-col w-[40%] bg-white rounded-lg border border-gray-100 shadow-sm py-5 px-3">
                            <div className="flex items-center justify-between mb-4">
                                <span className="text-base font-semibold text-[#0A143D]">Key Certificates</span>
                                <button onClick={() => setActiveModal("certificates")} className="text-[12px] font-semibold text-blue-500 hover:text-blue-700">Manage</button>
                            </div>
                            <div className="grid grid-cols-3 lg:grid-cols-4 gap-4">
                                {certificateList.map((cert, i) => {
                                    const badge = certBadge(cert.name);
                                    return (
                                        <div key={i} className="flex flex-col items-center gap-2">
                                            <div className="w-14 h-14 rounded-lg border border-gray-200 bg-white shadow-sm flex items-center justify-center">
                                                {badge.isGmp ? (
                                                    <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center">
                                                        <span className="text-[13px] font-black text-white">{badge.logo}</span>
                                                    </div>
                                                ) : (
                                                    <span className="text-[15px] font-black leading-none" style={{ color: badge.color }}>{badge.logo}</span>
                                                )}
                                            </div>
                                            <span className="text-[10px] font-semibold text-gray-600 text-center leading-tight line-clamp-2">{cert.name}</span>
                                        </div>
                                    );
                                })}
                                {certificateList.length === 0 && (
                                    <div className="col-span-full py-4 text-center text-gray-400 text-[11px] font-medium">
                                        No certificates added yet.
                                    </div>
                                )}
                            </div>
                        </div>

                    </div>
                </div>

                {/* ══ RIGHT COLUMN ══ */}
                <div className="w-[25%] shrink-0 flex flex-col gap-3">

                    {/* Profile Completeness */}
                    <div className="bg-white rounded-lg border border-gray-100 shadow-sm p-2">
                        <h3 className="text-base font-semibold text-gray-800">Profile Completeness</h3>
                        <div className="flex gap-1 mt-2">
                            <div className="shrink-0">
                                <DonutChart percent={completeness.percentage} />
                            </div>
                            <div className="flex flex-col gap-2">
                                <p className="text-[13px] text-gray-600">
                                    {completeness.percentage >= 100 ? "Great! Your profile is complete." : "Add more details to improve your visibility."}
                                </p>
                                <div className="w-full bg-gray-100 rounded-full h-1.5">
                                    <div className="bg-emerald-500 h-1.5 rounded-full" style={{ width: `${completeness.percentage}%` }} />
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-[11px] text-gray-400">{completeness.completed} of {completeness.total} sections completed</span>
                                </div>
                                <div className="flex justify-end">
                                    <button onClick={() => setActiveModal("profile")} className="text-[12px] font-semibold text-blue-500 hover:text-blue-700">Complete Now →</button>
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
                                    <button
                                        key={i}
                                        onClick={() => {
                                            if (action.key === "logo") logoInputRef.current?.click();
                                            else if (action.key === "product") toast.info("Products can be added via the Seller Portal on your sidebar.");
                                            else if (action.key === "team") openAddTeamMember();
                                            else if (action.key === "certificates") setActiveModal("certificates");
                                            else if (action.key === "brochure") toast.info("Documents and Brochures can be managed via the Documentation tab.");
                                            else if (action.key === "profile") setActiveModal("profile");
                                        }}
                                        className="flex flex-col items-center gap-2 py-3 px-1 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors group"
                                    >
                                        <Icon size={22} className={`${action.color} group-hover:scale-110 transition-transform`} strokeWidth={1.5} />
                                        <span className="text-[8px] text-gray-700 text-center font-medium">{action.label}</span>
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Primary Contact */}
                    <div className="bg-white rounded-lg border border-gray-100 shadow-sm p-3">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-base font-semibold text-[#0A143D]">Primary Contact</h3>
                            <button onClick={() => setActiveModal("contact")} className="text-[12px] font-semibold text-blue-500 hover:text-blue-700">Edit</button>
                        </div>
                        <div className="flex items-start gap-3">
                            <div className="w-16 h-16 rounded-full overflow-hidden shrink-0 border border-gray-100">
                                <Avatar url={contactForm.photoUrl} alt="Contact" className="w-full h-full" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-[14px] font-medium text-[#0A143D] mb-0.5">
                                    {contactForm.firstName ? `${contactForm.title} ${contactForm.firstName} ${contactForm.lastName}`.trim() : "Not added"}
                                </p>
                                <p className="text-[12px] text-gray-600 mb-2">{contactForm.designation || "—"}</p>
                                <div className="flex items-center gap-2 mb-1.5">
                                    <Phone size={13} className="text-gray-400 shrink-0" />
                                    <span className="text-[12px] text-gray-700">{contactForm.mobile || "—"}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Mail size={13} className="text-gray-400 shrink-0" />
                                    <span className="text-[11px] text-gray-700 truncate">{contactForm.email || "—"}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            {/* 3. BOTTOM ROW: TEAM MEMBERS */}
            <div className="bg-white rounded-xl py-3 px-2 mt-3 border border-[#e5eaf2] shadow-[0_1px_8px_rgba(15,23,42,0.08)] relative xl:col-span-4">
                <div className="flex items-center justify-between">
                    <h3 className="text-base font-semibold text-[#0A143D]">
                        Team Members ({teamList.length})
                    </h3>
                    <button onClick={openAddTeamMember} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-lg text-sm font-medium bg-[#08245b] hover:bg-[#071f4e] text-white transition-all print:hidden">
                        <UserPlus size={14} />
                        Manage Team
                    </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 mt-3 gap-4">
                    {teamList.map((member, index) => (
                        <div key={index} className="bg-white border border-[#e5eaf2] rounded-lg px-4 py-2 flex items-center gap-4 hover:shadow-sm hover:border-slate-200 transition-all group relative min-h-[112px]">
                            <div className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 flex items-center gap-1 transition-opacity print:hidden">
                                <button onClick={() => openEditTeamMember(index, member)} className="p-1 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded">
                                    <Edit2 size={12} />
                                </button>
                                <button onClick={() => { if (confirm("Delete this team member?")) deleteTeamMember(index); }} className="p-1 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded">
                                    <Trash2 size={12} />
                                </button>
                            </div>

                            <div className="w-[60px] h-[60px] rounded-full overflow-hidden shrink-0 border border-slate-100">
                                <Avatar url={member.photoUrl} alt={member.name} className="w-full h-full" />
                            </div>

                            <div className="space-y-1 min-w-0 text-sm text-[#26365f] font-semibold">
                                <div className="flex flex-wrap items-center gap-2">
                                    <h4 className="text-sm font-semibold text-[#14234a] truncate max-w-[135px]">{member.name}</h4>
                                    {member.isPrimary && (
                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-[10px] font-medium bg-[#d9f4e9] text-[#158568]">Primary</span>
                                    )}
                                </div>
                                <p className="text-[13px] font-medium text-gray-600 truncate">{member.designation}</p>
                                <div className="truncate text-gray-600 text-xs">{member.email}</div>
                                <div className="flex items-center gap-2 text-gray-600 text-xs">
                                    <Phone size={14} className="text-gray-600 shrink-0" />
                                    <span>{member.mobile}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                    {teamList.length === 0 && (
                        <div className="col-span-full py-6 text-center text-gray-400 text-[11px] font-medium">
                            No team members added yet. Click 'Manage Team' to invite one.
                        </div>
                    )}
                </div>

                <div className="flex justify-center pt-3 print:hidden">
                    <button onClick={openAddTeamMember} className="inline-flex items-center gap-1 text-sm font-bold text-blue-600 hover:text-blue-700 hover:underline">
                        + Add Team Member
                    </button>
                </div>
            </div>

            {/* DYNAMIC MODALS SECTION */}
            <AnimatePresence>
                {activeModal && (
                    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[110] flex items-center justify-center p-4">
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.95, opacity: 0 }}
                            transition={{ duration: 0.15 }}
                            className="bg-white rounded-2xl shadow-xl w-full max-w-xl overflow-hidden border border-slate-100 max-h-[90vh] flex flex-col"
                        >
                            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                                <h3 className="font-extrabold text-slate-900 text-lg uppercase tracking-tight">
                                    {activeModal === "profile" && "Update Corporate Identity"}
                                    {activeModal === "categories" && "Manage Product Sectors"}
                                    {activeModal === "certificates" && "Key Exhibitor Certificates"}
                                    {activeModal === "contact" && "Primary Contact Details"}
                                    {activeModal === "team" && (selectedTeamMember !== null ? "Modify Team Member" : "New Team Member")}
                                </h3>
                                <button onClick={() => setActiveModal(null)} className="p-1 rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-600">
                                    <X size={18} />
                                </button>
                            </div>

                            <div className="p-6 overflow-y-auto space-y-4 flex-1 text-slate-700 text-sm font-medium">

                                {activeModal === "profile" && (
                                    <div className="space-y-4">
                                        <div className="space-y-1">
                                            <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Exhibitor Brand Name</label>
                                            <input type="text" className="w-full rounded-xl border border-slate-200 p-2.5 outline-none focus:border-blue-500"
                                                value={profileForm.brandName} onChange={(e) => setProfileForm({ ...profileForm, brandName: e.target.value })} />
                                        </div>
                                        <div className="space-y-1">
                                            <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Website Address</label>
                                            <input type="text" className="w-full rounded-xl border border-slate-200 p-2.5 outline-none focus:border-blue-500"
                                                value={profileForm.website} onChange={(e) => setProfileForm({ ...profileForm, website: e.target.value })} />
                                        </div>
                                        <div className="space-y-1">
                                            <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Exhibitor Bio Description</label>
                                            <textarea className="w-full rounded-xl border border-slate-200 p-2.5 outline-none focus:border-blue-500" rows={4}
                                                value={profileForm.companyDescription} onChange={(e) => setProfileForm({ ...profileForm, companyDescription: e.target.value })} />
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-1">
                                                <label className="text-xs font-bold uppercase tracking-wider text-slate-400">City</label>
                                                <input type="text" className="w-full rounded-xl border border-slate-200 p-2.5 outline-none focus:border-blue-500"
                                                    value={profileForm.city} onChange={(e) => setProfileForm({ ...profileForm, city: e.target.value })} />
                                            </div>
                                            <div className="space-y-1">
                                                <label className="text-xs font-bold uppercase tracking-wider text-slate-400">State</label>
                                                <input type="text" className="w-full rounded-xl border border-slate-200 p-2.5 outline-none focus:border-blue-500"
                                                    value={profileForm.state} onChange={(e) => setProfileForm({ ...profileForm, state: e.target.value })} />
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {activeModal === "categories" && (
                                    <div className="space-y-2">
                                        <p className="text-xs text-slate-400 font-bold uppercase mb-4 tracking-wider">
                                            Select product categories to show on your public profile:
                                        </p>
                                        <div className="space-y-2">
                                            {PRODUCT_CATEGORIES.map((cat) => {
                                                const isSelected = categorySelection.includes(cat.id);
                                                return (
                                                    <label key={cat.id}
                                                        className={`flex items-center justify-between p-3.5 rounded-xl border cursor-pointer transition-all ${isSelected ? "border-blue-500 bg-blue-50/40 text-blue-900 font-bold" : "border-slate-100 hover:bg-slate-50 text-slate-600"}`}
                                                        onClick={() => handleCategoryToggle(cat.id)}>
                                                        <div className="flex items-center gap-3">
                                                            <div className={`p-1.5 rounded-md ${isSelected ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-400"}`}>
                                                                <cat.icon size={16} />
                                                            </div>
                                                            <span className="text-sm font-semibold">{cat.name}</span>
                                                        </div>
                                                        <input type="checkbox" checked={isSelected} onChange={() => { }} className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500" />
                                                    </label>
                                                );
                                            })}
                                        </div>
                                    </div>
                                )}

                                {activeModal === "certificates" && (
                                    <div className="space-y-4">
                                        <div className="flex gap-2">
                                            <input type="text" placeholder="e.g. ISO 9001:2015 Certified" className="flex-1 rounded-xl border border-slate-200 p-2.5 outline-none focus:border-blue-500"
                                                value={newCertName} onChange={(e) => setNewCertName(e.target.value)} />
                                            <button onClick={addCertificate} disabled={saving} className="bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white px-5 rounded-xl text-sm font-bold shadow-sm">
                                                Add
                                            </button>
                                        </div>
                                        <div className="space-y-2 pt-2">
                                            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Current Certificates</span>
                                            <div className="border border-slate-100 rounded-xl overflow-hidden divide-y divide-slate-100">
                                                {certificateList.map((cert, index) => (
                                                    <div key={index} className="flex items-center justify-between p-3 bg-white">
                                                        <div className="flex items-center gap-3">
                                                            <div className="w-8 h-8 rounded-full bg-slate-50 border flex items-center justify-center text-[10px] font-bold text-indigo-700">
                                                                {certBadge(cert.name).logo}
                                                            </div>
                                                            <span className="text-xs font-bold text-slate-700">{cert.name}</span>
                                                        </div>
                                                        <button onClick={() => deleteCertificate(index)} className="p-1.5 hover:bg-rose-50 text-slate-400 hover:text-rose-600 rounded">
                                                            <Trash2 size={14} />
                                                        </button>
                                                    </div>
                                                ))}
                                                {certificateList.length === 0 && (
                                                    <div className="p-6 text-center text-slate-400 text-xs font-medium">No certificates registered.</div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {activeModal === "contact" && (
                                    <div className="space-y-4">
                                        <div className="grid grid-cols-3 gap-2">
                                            <div className="space-y-1">
                                                <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Title</label>
                                                <select className="w-full rounded-xl border border-slate-200 p-2.5 outline-none focus:border-blue-500 bg-white"
                                                    value={contactForm.title} onChange={(e) => setContactForm({ ...contactForm, title: e.target.value })}>
                                                    <option value="Mr.">Mr.</option>
                                                    <option value="Ms.">Ms.</option>
                                                    <option value="Dr.">Dr.</option>
                                                    <option value="Mrs.">Mrs.</option>
                                                </select>
                                            </div>
                                            <div className="col-span-2 space-y-1">
                                                <label className="text-xs font-bold uppercase tracking-wider text-slate-400">First Name</label>
                                                <input type="text" className="w-full rounded-xl border border-slate-200 p-2.5 outline-none focus:border-blue-500"
                                                    value={contactForm.firstName} onChange={(e) => setContactForm({ ...contactForm, firstName: e.target.value })} />
                                            </div>
                                        </div>
                                        <div className="space-y-1">
                                            <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Last Name</label>
                                            <input type="text" className="w-full rounded-xl border border-slate-200 p-2.5 outline-none focus:border-blue-500"
                                                value={contactForm.lastName} onChange={(e) => setContactForm({ ...contactForm, lastName: e.target.value })} />
                                        </div>
                                        <div className="space-y-1">
                                            <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Corporate Designation</label>
                                            <input type="text" className="w-full rounded-xl border border-slate-200 p-2.5 outline-none focus:border-blue-500"
                                                value={contactForm.designation} onChange={(e) => setContactForm({ ...contactForm, designation: e.target.value })} />
                                        </div>
                                        <div className="space-y-1">
                                            <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Registered Mobile</label>
                                            <input type="text" className="w-full rounded-xl border border-slate-200 p-2.5 outline-none focus:border-blue-500"
                                                value={contactForm.mobile} onChange={(e) => setContactForm({ ...contactForm, mobile: e.target.value })} />
                                        </div>
                                        <div className="space-y-1">
                                            <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Registered Email Address</label>
                                            <input type="email" className="w-full rounded-xl border border-slate-200 p-2.5 outline-none focus:border-blue-500"
                                                value={contactForm.email} onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })} />
                                        </div>
                                        <div className="space-y-1">
                                            <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Photo (Optional)</label>
                                            <div className="flex items-center gap-3">
                                                <div className="w-14 h-14 rounded-full overflow-hidden shrink-0 border border-slate-200">
                                                    <Avatar url={contactForm.photoUrl} alt="Contact" className="w-full h-full" />
                                                </div>
                                                <button
                                                    type="button"
                                                    onClick={() => contactPhotoInputRef.current?.click()}
                                                    className="px-4 py-2 rounded-xl text-xs font-bold border border-slate-200 hover:bg-slate-50 text-slate-600 transition-colors"
                                                >
                                                    {contactForm.photoUrl ? "Replace Photo" : "Upload Photo"}
                                                </button>
                                                <input
                                                    type="file"
                                                    ref={contactPhotoInputRef}
                                                    className="hidden"
                                                    accept="image/*"
                                                    onChange={(e) => uploadPersonPhoto(e.target.files?.[0], (url) => setContactForm((prev) => ({ ...prev, photoUrl: url })))}
                                                />
                                            </div>
                                            <p className="text-[10px] text-slate-400 font-medium">Photo is screened automatically before it's accepted.</p>
                                        </div>
                                    </div>
                                )}

                                {activeModal === "team" && (
                                    <div className="space-y-4">
                                        <div className="space-y-1">
                                            <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Full Name</label>
                                            <input type="text" className="w-full rounded-xl border border-slate-200 p-2.5 outline-none focus:border-blue-500"
                                                value={teamMemberForm.name} onChange={(e) => setTeamMemberForm({ ...teamMemberForm, name: e.target.value })} />
                                        </div>
                                        <div className="space-y-1">
                                            <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Company Role / Designation</label>
                                            <input type="text" className="w-full rounded-xl border border-slate-200 p-2.5 outline-none focus:border-blue-500"
                                                value={teamMemberForm.designation} onChange={(e) => setTeamMemberForm({ ...teamMemberForm, designation: e.target.value })} />
                                        </div>
                                        <div className="space-y-1">
                                            <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Department</label>
                                            <input type="text" className="w-full rounded-xl border border-slate-200 p-2.5 outline-none focus:border-blue-500"
                                                value={teamMemberForm.department} onChange={(e) => setTeamMemberForm({ ...teamMemberForm, department: e.target.value })} />
                                        </div>
                                        <div className="space-y-1">
                                            <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Role at Exhibition</label>
                                            <input type="text" className="w-full rounded-xl border border-slate-200 p-2.5 outline-none focus:border-blue-500"
                                                value={teamMemberForm.roleAtExhibition} onChange={(e) => setTeamMemberForm({ ...teamMemberForm, roleAtExhibition: e.target.value })} />
                                        </div>
                                        <div className="space-y-1">
                                            <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Work Email</label>
                                            <input type="email" className="w-full rounded-xl border border-slate-200 p-2.5 outline-none focus:border-blue-500"
                                                value={teamMemberForm.email} onChange={(e) => setTeamMemberForm({ ...teamMemberForm, email: e.target.value })} />
                                        </div>
                                        <div className="space-y-1">
                                            <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Mobile Number</label>
                                            <input type="text" className="w-full rounded-xl border border-slate-200 p-2.5 outline-none focus:border-blue-500"
                                                value={teamMemberForm.mobile} onChange={(e) => setTeamMemberForm({ ...teamMemberForm, mobile: e.target.value })} />
                                        </div>
                                        <div className="space-y-1">
                                            <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Passes Required</label>
                                            <div className="flex gap-4 p-3 border border-slate-200 rounded-xl flex-wrap">
                                                <label className="flex items-center gap-2 cursor-pointer text-gray-700">
                                                    <input type="checkbox" checked={teamMemberForm.passes?.exhibitor} onChange={() => setTeamMemberForm({ ...teamMemberForm, passes: { ...teamMemberForm.passes, exhibitor: !teamMemberForm.passes?.exhibitor } })} className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 border-gray-300" />
                                                    <IdCard size={16} /> Exhibitor
                                                </label>
                                                <label className="flex items-center gap-2 cursor-pointer text-gray-700">
                                                    <input type="checkbox" checked={teamMemberForm.passes?.vehicle} onChange={() => setTeamMemberForm({ ...teamMemberForm, passes: { ...teamMemberForm.passes, vehicle: !teamMemberForm.passes?.vehicle } })} className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 border-gray-300" />
                                                    <Car size={16} /> Vehicle
                                                </label>
                                                <label className="flex items-center gap-2 cursor-pointer text-gray-700">
                                                    <input type="checkbox" checked={teamMemberForm.passes?.service} onChange={() => setTeamMemberForm({ ...teamMemberForm, passes: { ...teamMemberForm.passes, service: !teamMemberForm.passes?.service } })} className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 border-gray-300" />
                                                    <Badge size={16} /> Service
                                                </label>
                                                <label className="flex items-center gap-2 cursor-pointer text-gray-700">
                                                    <input type="checkbox" checked={teamMemberForm.passes?.visitor} onChange={() => setTeamMemberForm({ ...teamMemberForm, passes: { ...teamMemberForm.passes, visitor: !teamMemberForm.passes?.visitor } })} className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 border-gray-300" />
                                                    <Users size={16} /> Visitor
                                                </label>
                                            </div>
                                        </div>
                                        <div className="space-y-1">
                                            <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Photo (Optional)</label>
                                            <div className="flex items-center gap-3">
                                                <div className="w-14 h-14 rounded-full overflow-hidden shrink-0 border border-slate-200">
                                                    <Avatar url={teamMemberForm.photoUrl} alt="Team Member" className="w-full h-full" />
                                                </div>
                                                <button
                                                    type="button"
                                                    onClick={() => teamPhotoInputRef.current?.click()}
                                                    className="px-4 py-2 rounded-xl text-xs font-bold border border-slate-200 hover:bg-slate-50 text-slate-600 transition-colors"
                                                >
                                                    {teamMemberForm.photoUrl ? "Replace Photo" : "Upload Photo"}
                                                </button>
                                                <input
                                                    type="file"
                                                    ref={teamPhotoInputRef}
                                                    className="hidden"
                                                    accept="image/*"
                                                    onChange={(e) => uploadPersonPhoto(e.target.files?.[0], (url) => setTeamMemberForm((prev) => ({ ...prev, photoUrl: url })))}
                                                />
                                            </div>
                                            <p className="text-[10px] text-slate-400 font-medium">Photo is screened automatically before it's accepted.</p>
                                        </div>
                                        <label className="flex items-center gap-3 p-3.5 bg-slate-50 border border-slate-100 rounded-xl cursor-pointer">
                                            <input type="checkbox" checked={teamMemberForm.isPrimary}
                                                onChange={(e) => setTeamMemberForm({ ...teamMemberForm, isPrimary: e.target.checked })}
                                                className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500" />
                                            <div>
                                                <span className="text-sm font-bold text-slate-900 block leading-tight">Designate as Primary Contact</span>
                                                <span className="text-[10px] text-slate-400 font-semibold block pt-0.5">This person will appear as the lead representative for team-specific inquiries.</span>
                                            </div>
                                        </label>
                                    </div>
                                )}
                            </div>

                            <div className="px-6 py-4 border-t border-slate-100 flex items-center justify-end gap-3 bg-slate-50/50">
                                <button onClick={() => setActiveModal(null)} className="px-5 py-2.5 rounded-xl text-sm font-semibold border border-slate-200 hover:bg-slate-100 text-slate-600 transition-colors">
                                    Cancel
                                </button>
                                <button
                                    onClick={() => {
                                        if (activeModal === "profile") saveProfileData(profileForm);
                                        if (activeModal === "categories") saveCategories();
                                        if (activeModal === "contact") saveContact();
                                        if (activeModal === "team") saveTeamMember();
                                    }}
                                    disabled={saving}
                                    className="px-5 py-2.5 rounded-xl text-sm font-semibold bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 shadow-sm"
                                >
                                    {saving ? (
                                        <>
                                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                            Saving...
                                        </>
                                    ) : (
                                        <>
                                            <Check size={16} />
                                            Save Changes
                                        </>
                                    )}
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
