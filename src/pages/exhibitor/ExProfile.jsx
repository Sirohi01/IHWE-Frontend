import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    User,
    Building2,
    Mail,
    Phone,
    MapPin,
    ShieldCheck,
    ExternalLink,
    Award,
    Globe,
    FileText,
    BadgeCheck,
    Edit2,
    Save,
    X,
    Upload,
    CheckCircle2,
    Briefcase,
    Hash,
    Camera,
    Info,
    AlertCircle,
    ChevronRight,
    Printer,
    Download,
    Check,
    Activity,
    HeartPulse,
    Stethoscope,
    Bed,
    Syringe,
    Heart,
    Package,
    UserPlus,
    Users,
    Plus,
    Trash2,
    Eye

} from 'lucide-react';
import { Link } from "react-router-dom";
import { API_URL, SERVER_URL } from '@/lib/api';
import { toast } from 'sonner';
import { useExhibitorCtx } from '@/context/ExhibitorContext';
const DEFAULT_PLACEHOLDER = "https://placehold.co/400x400?text=No+Logo";

const fixUrl = (url) => {
    if (!url || url === 'undefined' || url === 'null' || url === '') return DEFAULT_PLACEHOLDER;
    if (url.startsWith('http') || url.startsWith('blob:')) return url;
    const cleanPath = url.startsWith('/') ? url : `/${url}`;
    return url.includes('res.cloudinary.com') ? url : `${SERVER_URL}${cleanPath}`;
};

const Avatar = ({ url, alt, className }) => (
    url ? (
        <img src={fixUrl(url)} alt={alt} className={`${className} object-cover`} />
    ) : (
        <div className={`${className} bg-slate-100 flex items-center justify-center text-slate-300`}>
            <User className="w-1/2 h-1/2" />
        </div>
    )
);

// Fixed selectable taxonomy for an exhibitor's product categories (not exhibitor-specific data).
const PRODUCT_CATEGORIES = [
    { id: 'Medical Devices', name: 'Medical Devices', color: 'text-blue-600 bg-blue-50 border-blue-100', icon: Activity },
    { id: 'Diagnostic Equipment', name: 'Diagnostic Equipment', color: 'text-green-600 bg-green-50 border-green-100', icon: Stethoscope },
    { id: 'Hospital Furniture', name: 'Hospital Furniture', color: 'text-teal-600 bg-teal-50 border-teal-100', icon: Bed },
    { id: 'Disposables & Consumables', name: 'Disposables & Consumables', color: 'text-indigo-600 bg-indigo-50 border-indigo-100', icon: Syringe },
    { id: 'Health & Wellness Products', name: 'Health & Wellness Products', color: 'text-emerald-600 bg-emerald-50 border-emerald-100', icon: Heart }
];

// Backend only stores {name, fileUrl, issuedDate, expiryDate} for certificates - derive the
// display badge code from the name instead of relying on a "code" field that isn't persisted.
const certBadgeCode = (name = '') => {
    const upper = name.toUpperCase();
    if (upper.includes('CE')) return 'CE';
    if (upper.includes('GMP')) return 'GMP';
    return 'ISO';
};

const VERIFICATION_BADGES = {
    verified: { label: 'Verified Exhibitor', icon: ShieldCheck, classes: 'bg-emerald-50 text-emerald-700 border-emerald-100', dotClasses: 'text-emerald-500' },
    pending: { label: 'Verification Pending', icon: AlertCircle, classes: 'bg-amber-50 text-amber-700 border-amber-100', dotClasses: 'text-amber-500' },
    rejected: { label: 'Verification Rejected', icon: AlertCircle, classes: 'bg-rose-50 text-rose-700 border-rose-100', dotClasses: 'text-rose-500' },
};

export default function ExProfile() {
    const { data, setData, fetchDashboard } = useExhibitorCtx();

    // Modals Control State
    const [activeModal, setActiveModal] = useState(null); // 'profile' | 'categories' | 'certificates' | 'contact' | 'team'
    const [saving, setSaving] = useState(false);
    const [selectedTeamMember, setSelectedTeamMember] = useState(null);

    // Form inputs state
    const [profileForm, setProfileForm] = useState({
        brandName: '',
        website: '',
        address: '',
        city: '',
        state: '',
        country: '',
        pincode: '',
        companyDescription: '',
    });

    const [contactForm, setContactForm] = useState({
        title: 'Mr.',
        firstName: '',
        lastName: '',
        email: '',
        designation: '',
        mobile: '',
    });

    const [teamMemberForm, setTeamMemberForm] = useState({
        name: '',
        designation: '',
        email: '',
        mobile: '',
        isPrimary: false,
        photoUrl: '',
    });

    const [categorySelection, setCategorySelection] = useState([]);
    const [certificateList, setCertificateList] = useState([]);
    const [teamList, setTeamList] = useState([]);
    const [newCertName, setNewCertName] = useState('');

    const logoInputRef = useRef(null);

    // Initialize forms from context data
    useEffect(() => {
        if (data) {
            setProfileForm({
                brandName: data.brandName || data.exhibitorName || '',
                website: data.website || '',
                address: data.address || '',
                city: data.city || '',
                state: data.state || '',
                country: data.country || 'India',
                pincode: data.pincode || '',
                companyDescription: data.companyDescription || '',
            });

            setContactForm({
                title: data.contact1?.title || 'Mr.',
                firstName: data.contact1?.firstName || '',
                lastName: data.contact1?.lastName || '',
                email: data.contact1?.email || '',
                designation: data.contact1?.designation || '',
                mobile: data.contact1?.mobile || '',
            });

            setCategorySelection(data.productCategories || []);
            setCertificateList(data.certificates || []);
            setTeamList(data.teamMembers || []);
        }
    }, [data]);

    // Handle profile fields save
    const saveProfileData = async (payload) => {
        setSaving(true);
        try {
            const token = localStorage.getItem('exhibitorToken');
            const formData = new FormData();

            // Format contact object and other details
            Object.entries(payload).forEach(([key, value]) => {
                if (typeof value === 'object') {
                    formData.append(key, JSON.stringify(value));
                } else {
                    formData.append(key, value);
                }
            });

            const res = await fetch(`${API_URL}/exhibitor-auth/update-profile?id=${data._id}`, {
                method: 'PUT',
                headers: { Authorization: `Bearer ${token}` },
                body: formData,
            });

            const result = await res.json();
            if (result.success) {
                toast.success('Profile Saved Successfully!');
                if (result.data) setData(result.data);
                setActiveModal(null);
                await fetchDashboard();
            } else {
                toast.error(result.message || 'Saving failed');
            }
        } catch (error) {
            toast.error('Error saving data');
            console.error(error);
        } finally {
            setSaving(false);
        }
    };

    // Trigger company logo file upload
    const handleLogoUpload = async (file) => {
        if (!file) return;
        if (file.size > 5 * 1024 * 1024) {
            toast.error('File size should be less than 5MB');
            return;
        }
        if (!file.type.startsWith('image/')) {
            toast.error('Only image files are allowed');
            return;
        }

        const loadingToast = toast.loading('Uploading company logo...');
        try {
            const token = localStorage.getItem('exhibitorToken');
            const formData = new FormData();
            formData.append('companyLogo', file);

            const res = await fetch(`${API_URL}/exhibitor-auth/update-profile?id=${data._id}`, {
                method: 'PUT',
                headers: { Authorization: `Bearer ${token}` },
                body: formData,
            });

            const result = await res.json();
            toast.dismiss(loadingToast);
            if (result.success) {
                toast.success('Logo Uploaded Successfully!');
                if (result.data) setData(result.data);
                await fetchDashboard();
            } else {
                toast.error(result.message || 'Logo upload failed');
            }
        } catch (error) {
            toast.dismiss(loadingToast);
            toast.error('Error uploading logo');
        }
    };

    const verificationBadge = VERIFICATION_BADGES[data?.verificationStatus] || null;

    // Calculate completeness metric dynamically
    const calculateCompleteness = () => {
        let completed = 0;
        let total = 6;

        if (data?.companyLogoUrl) completed++;
        if (profileForm.brandName) completed++;
        if (profileForm.companyDescription) completed++;
        if (categorySelection.length > 0) completed++;
        if (certificateList.length > 0) completed++;
        if (contactForm.firstName && contactForm.email) completed++;

        const percentage = Math.round((completed / total) * 100);
        return { percentage, completed, total };
    };

    const completeness = calculateCompleteness();

    // Toggle categories list selection
    const handleCategoryToggle = (catId) => {
        setCategorySelection(prev => {
            const next = prev.includes(catId)
                ? prev.filter(c => c !== catId)
                : [...prev, catId];
            return next;
        });
    };

    const saveCategories = () => {
        saveProfileData({ productCategories: categorySelection });
    };

    // Add key certificates
    const addCertificate = () => {
        if (!newCertName.trim()) return;
        const newCert = { name: newCertName.trim() };
        const updatedList = [...certificateList, newCert];
        setCertificateList(updatedList);
        setNewCertName('');
        saveProfileData({ certificates: updatedList });
    };

    const deleteCertificate = (index) => {
        const updatedList = certificateList.filter((_, i) => i !== index);
        setCertificateList(updatedList);
        saveProfileData({ certificates: updatedList });
    };

    // Team Member actions
    const openAddTeamMember = () => {
        setSelectedTeamMember(null);
        setTeamMemberForm({
            name: '',
            designation: '',
            email: '',
            mobile: '',
            isPrimary: false,
            photoUrl: '',
        });
        setActiveModal('team');
    };

    const openEditTeamMember = (index, member) => {
        setSelectedTeamMember(index);
        setTeamMemberForm({ ...member });
        setActiveModal('team');
    };

    const saveTeamMember = () => {
        if (!teamMemberForm.name.trim() || !teamMemberForm.designation.trim()) {
            toast.error('Name and designation are required.');
            return;
        }

        let updatedList = [...teamList];

        // Handle setting primary (only one member should be primary)
        if (teamMemberForm.isPrimary) {
            updatedList = updatedList.map(m => ({ ...m, isPrimary: false }));
        }

        if (selectedTeamMember !== null) {
            // Edit existing
            updatedList[selectedTeamMember] = teamMemberForm;
        } else {
            // Add new
            updatedList.push(teamMemberForm);
        }

        setTeamList(updatedList);
        saveProfileData({ teamMembers: updatedList });
    };

    const deleteTeamMember = (index) => {
        const updatedList = teamList.filter((_, i) => i !== index);
        setTeamList(updatedList);
        saveProfileData({ teamMembers: updatedList });
    };

    // Save Primary Contact Form
    const saveContact = () => {
        if (!contactForm.firstName.trim() || !contactForm.email.trim()) {
            toast.error('First Name and Email are required.');
            return;
        }
        saveProfileData({ contact1: contactForm });
    };

    // Print Handler
    const handlePrint = () => window.print();

    return (
        <div className="w-full pb-4 min-h-screen bg-[#f6f8fb] font-sans text-[#14234a]">


            <div className="max-w-[1540px] mx-auto p-4 grid grid-cols-1 xl:grid-cols-3 gap-4 print:p-0 print:bg-white">

                {/* 1. Header Cover Profile Card */}
                <div className="bg-white rounded-xl overflow-hidden shadow-[0_1px_8px_rgba(15,23,42,0.08)] border border-[#e5eaf2] relative xl:col-span-2 print:border-none print:shadow-none">

                    {/* Healthcare Abstract Grid Overlay Header Banner */}
                    <div className="h-[100px] md:h-[104px] w-full bg-gradient-to-r from-cyan-600 via-blue-800 to-blue-950 relative overflow-hidden flex items-center">
                        <div className="absolute inset-0 opacity-20 bg-[linear-gradient(90deg,rgba(255,255,255,0.16)_1px,transparent_1px),linear-gradient(rgba(255,255,255,0.16)_1px,transparent_1px)] [background-size:34px_34px]"></div>
                        <div className="absolute inset-y-0 right-0 w-3/4 opacity-20 bg-[radial-gradient(circle_at_20%_35%,#fff_2px,transparent_3px),radial-gradient(circle_at_70%_65%,#fff_2px,transparent_3px)] [background-size:120px_90px]"></div>

                        {/* Decorative medical elements mock */}
                        <div className="absolute right-12 bottom-0 hidden md:flex items-center gap-8 text-white/15 select-none">
                            <Plus size={34} strokeWidth={4} />
                            <HeartPulse size={96} strokeWidth={1.2} />
                            <Plus size={34} strokeWidth={4} />
                            <ShieldCheck size={46} strokeWidth={1.4} />
                        </div>
                        {verificationBadge && (
                            <span className="absolute left-[260px] top-[58px] hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-bold bg-white/95 text-blue-700 shadow-sm">
                                <verificationBadge.icon size={15} className={verificationBadge.dotClasses} />
                                {verificationBadge.label}
                            </span>
                        )}
                    </div>

                    {/* Logo & Core Info Area */}
                    <div className="px-7 pb-7 pt-4 relative flex flex-col md:flex-row gap-6">

                        {/* Interactive Overlapping Avatar Logo Container */}
                        <div className="w-[172px] h-[172px] rounded-full bg-white border-[6px] border-white shadow-[0_10px_28px_rgba(15,23,42,0.16)] flex items-center justify-center overflow-hidden shrink-0 -mt-[82px] relative group z-10">
                            <img
                                src={data?.companyLogoUrl ? fixUrl(data.companyLogoUrl) : DEFAULT_PLACEHOLDER}
                                alt="Company Logo"
                                className="w-full h-full object-contain p-3"
                            />
                            <div
                                onClick={() => logoInputRef.current?.click()}
                                className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center cursor-pointer transition-all duration-250 text-white z-20"
                            >
                                <Camera size={24} className="mb-1" />
                                <span className="text-[10px] font-semibold uppercase tracking-wider">Upload Logo</span>
                                <input
                                    type="file"
                                    ref={logoInputRef}
                                    className="hidden"
                                    accept="image/*"
                                    onChange={(e) => handleLogoUpload(e.target.files[0])}
                                />
                            </div>
                        </div>

                        {/* Text details column */}
                        <div className="flex-1 space-y-3 min-w-0">
                            <div className="flex flex-wrap items-center gap-2">
                                <h1 className="text-[26px] md:text-[30px] leading-tight font-extrabold text-[#12245a]">
                                    {profileForm.brandName}
                                </h1>
                                {verificationBadge && (
                                    <span className={`md:hidden inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-bold border ${verificationBadge.classes}`}>
                                        <verificationBadge.icon size={14} className={verificationBadge.dotClasses} />
                                        {verificationBadge.label}
                                    </span>
                                )}

                                <button
                                    onClick={() => {
                                        setProfileForm({
                                            brandName: data?.brandName || data?.exhibitorName || '',
                                            website: data?.website || '',
                                            address: data?.address || '',
                                            city: data?.city || '',
                                            state: data?.state || '',
                                            country: data?.country || 'India',
                                            pincode: data?.pincode || '',
                                            companyDescription: data?.companyDescription || '',
                                        });
                                        setActiveModal('profile');
                                    }}
                                    className="p-1 text-[#253a68] hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors print:hidden"
                                >
                                    <Edit2 size={16} />
                                </button>
                            </div>

                            {data?.natureOfBusiness && (
                                <p className="text-[#2a3658] font-semibold text-[15px]">
                                    {data.natureOfBusiness}
                                </p>
                            )}

                            <div className="flex flex-wrap gap-x-7 gap-y-2 text-[#27365f] text-sm font-semibold">
                                <span className="flex items-center gap-2">
                                    <MapPin size={17} className="text-[#24345f]" />
                                    {profileForm.city ? `${profileForm.city}, ${profileForm.state}, ${profileForm.country}` : 'Address not added'}
                                </span>
                                <span className="flex items-center gap-2">
                                    <ExternalLink size={17} className="text-[#24345f]" />
                                    {profileForm.website ? (
                                        <a
                                            href={profileForm.website.startsWith('http') ? profileForm.website : `https://${profileForm.website}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-[#236ee8] hover:underline"
                                        >
                                            {profileForm.website}
                                        </a>
                                    ) : (
                                        <span className="text-slate-400">Website not added</span>
                                    )}
                                </span>
                                <span className="flex items-center gap-2">
                                    <Globe size={17} className="text-[#24345f]" />
                                    {profileForm.country || 'India'}
                                </span>
                            </div>

                            <p className={`text-[15px] leading-7 max-w-[720px] pt-1 font-medium ${profileForm.companyDescription ? 'text-[#1f2d52]' : 'text-slate-400 italic'}`}>
                                {profileForm.companyDescription || "No company description added yet. Click 'Edit Profile' to add one."}
                            </p>

                            <div className="flex flex-wrap items-center gap-3 pt-3 print:hidden">
                                <button
                                    onClick={() => setActiveModal('profile')}
                                    className="inline-flex items-center gap-2 px-5 py-3 rounded-lg text-sm font-bold bg-[#12b59d] hover:bg-[#0ea68f] text-white transition-all shadow-sm"
                                >
                                    <Edit2 size={16} />
                                    Edit Profile
                                </button>
                                <button
                                    onClick={handlePrint}
                                    className="inline-flex items-center gap-2 px-5 py-3 rounded-lg text-sm font-bold border border-[#d8dee9] hover:border-slate-300 hover:bg-slate-50 text-[#17264e] transition-all bg-white"
                                >
                                    <Eye size={16} />
                                    View Public Profile
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 2-Column Responsive Body Section */}
                <div className="contents">

                    {/* LEFT COLUMN: Categories & Certificates (2 cols span on desktop) */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-4 xl:col-span-2">

                        {/* PRODUCT CATEGORIES CARD */}
                        <div className="bg-white rounded-xl p-6 border border-[#e5eaf2] shadow-[0_1px_8px_rgba(15,23,42,0.08)] space-y-6 relative">
                            <div className="flex items-center justify-between">
                                <h3 className="text-xl font-extrabold text-[#14234a]">
                                    Product Categories
                                </h3>
                                <button
                                    onClick={() => setActiveModal('categories')}
                                    className="text-sm font-extrabold text-[#236ee8] hover:text-blue-700 print:hidden"
                                >
                                    Manage
                                </button>
                            </div>

                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-5">
                                {PRODUCT_CATEGORIES.map((cat) => {
                                    const isSelected = categorySelection.includes(cat.id);
                                    if (!isSelected) return null;
                                    const Icon = cat.icon;
                                    return (
                                        <div
                                            key={cat.id}
                                            className="flex flex-col items-center justify-start text-center gap-3 transition-all duration-200"
                                        >
                                            <div className={`w-[82px] h-[76px] rounded-lg border flex items-center justify-center shadow-sm ${cat.color}`}>
                                                <Icon size={32} strokeWidth={1.8} />
                                            </div>
                                            <span className="text-xs font-extrabold text-[#1d2a4c] leading-[1.25] min-h-[32px]">
                                                {cat.name}
                                            </span>
                                        </div>
                                    );
                                })}
                                {categorySelection.length === 0 && (
                                    <div className="col-span-full py-6 text-center text-slate-400 text-xs font-medium">
                                        No categories selected. Click 'Manage' to choose.
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* KEY CERTIFICATES CARD */}
                        <div className="bg-white rounded-xl p-6 border border-[#e5eaf2] shadow-[0_1px_8px_rgba(15,23,42,0.08)] space-y-6 relative">
                            <div className="flex items-center justify-between">
                                <h3 className="text-xl font-bold text-[#0A143D]">
                                    Key Certificates
                                </h3>
                                <button
                                    onClick={() => setActiveModal('certificates')}
                                    className="text-sm font-extrabold text-[#236ee8] hover:text-blue-700 print:hidden"
                                >
                                    Manage
                                </button>
                            </div>

                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-5">
                                {certificateList.map((cert, index) => {
                                    const code = certBadgeCode(cert.name);
                                    return (
                                        <div
                                            key={index}
                                            className="flex flex-col items-center text-center justify-start gap-3"
                                        >
                                            <div className="w-[82px] h-[76px] bg-white border border-[#e5eaf2] rounded-lg flex items-center justify-center shadow-sm">
                                                <span className={`${code === 'CE' ? 'text-4xl font-normal text-black' : code === 'GMP' ? 'text-sm font-black text-white bg-[#22ad7a] rounded-full w-11 h-11 flex items-center justify-center' : 'text-lg font-black text-blue-800'} leading-none`}>
                                                    {code}
                                                </span>
                                            </div>
                                            <p className="text-xs font-extrabold text-[#1d2a4c] leading-[1.35]">
                                                {cert.name}
                                            </p>
                                        </div>
                                    );
                                })}
                                {certificateList.length === 0 && (
                                    <div className="col-span-full py-6 text-center text-slate-400 text-xs font-medium">
                                        No certificates added yet. Click 'Manage' to upload.
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* RIGHT COLUMN: Completeness & Quick Actions & Primary Contact */}
                    <div className="space-y-4 xl:col-start-3 xl:row-start-1 xl:row-span-2">

                        {/* 1. Profile Completeness Widget */}
                        <div className="bg-white rounded-xl p-6 border border-[#e5eaf2] shadow-[0_1px_8px_rgba(15,23,42,0.08)] space-y-4">
                            <h3 className="text-xl font-extrabold text-[#14234a]">
                                Profile Completeness
                            </h3>

                            <div className="flex items-center gap-7">
                                {/* SVG Circular Progress */}
                                <div className="relative w-[132px] h-[132px] shrink-0">
                                    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 132 132">
                                        {/* Background Track */}
                                        <circle
                                            cx="66"
                                            cy="66"
                                            r="52"
                                            className="stroke-slate-100"
                                            strokeWidth="9"
                                            fill="transparent"
                                        />
                                        {/* Active Circle Progress */}
                                        <circle
                                            cx="66"
                                            cy="66"
                                            r="52"
                                            className="stroke-[#16b89d] transition-all duration-500 ease-out"
                                            strokeWidth="9"
                                            fill="transparent"
                                            strokeDasharray={`${2 * Math.PI * 52}`}
                                            strokeDashoffset={`${2 * Math.PI * 52 * (1 - completeness.percentage / 100)}`}
                                            strokeLinecap="round"
                                        />
                                    </svg>
                                    <div className="absolute inset-0 flex flex-col items-center justify-center text-[#111827] leading-none">
                                        <span className="text-[27px] font-extrabold">{completeness.percentage}%</span>
                                        <span className="text-sm font-extrabold text-[#17ae94] mt-2">Complete</span>
                                    </div>
                                </div>

                                <div className="space-y-4 flex-1 min-w-0">
                                    <p className="text-[15px] text-[#1f2d52] font-bold leading-6">
                                        Great! Your profile is almost complete. Add more details to improve your visibility.
                                    </p>
                                    {/* Mini line progress bar */}
                                    <div className="w-full h-1.5 bg-[#edf1f5] rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-[#16b89d] rounded-full transition-all duration-500"
                                            style={{ width: `${completeness.percentage}%` }}
                                        />
                                    </div>
                                    <div className="flex items-center justify-between gap-3">
                                        <span className="text-xs font-bold text-[#68758f]">
                                            {completeness.completed} of {completeness.total} sections completed
                                        </span>
                                        <button
                                            onClick={() => setActiveModal('profile')}
                                            className="inline-flex items-center gap-1 text-xs font-extrabold text-[#236ee8] hover:text-blue-700 whitespace-nowrap print:hidden"
                                        >
                                            Complete Now <ChevronRight size={14} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* 2. Quick Actions Grid */}
                        <div className="bg-white rounded-xl p-5 border border-[#e5eaf2] shadow-[0_1px_8px_rgba(15,23,42,0.08)] space-y-4">
                            <h3 className="text-xl font-extrabold text-[#14234a]">
                                Quick Actions
                            </h3>

                            <div className="grid grid-cols-3 gap-2.5 print:hidden">
                                <button
                                    onClick={() => logoInputRef.current?.click()}
                                    className="min-h-[78px] flex flex-col items-center justify-center p-3 rounded-lg border border-[#e7ebf2] hover:border-blue-200 hover:bg-blue-50/30 text-center gap-2 transition-all group"
                                >
                                    <Upload size={26} className="text-[#2374ff] group-hover:scale-105 transition-transform" />
                                    <span className="text-[11px] font-extrabold text-[#17264e] leading-tight">Upload Logo</span>
                                </button>

                                <button
                                    onClick={() => toast.info('Products can be added via the Seller Portal on your sidebar.')}
                                    className="min-h-[78px] flex flex-col items-center justify-center p-3 rounded-lg border border-[#e7ebf2] hover:border-emerald-200 hover:bg-emerald-50/30 text-center gap-2 transition-all group"
                                >
                                    <Package size={26} className="text-[#31b884] group-hover:scale-105 transition-transform" />
                                    <span className="text-[11px] font-extrabold text-[#17264e] leading-tight">Add Product</span>
                                </button>

                                <button
                                    onClick={openAddTeamMember}
                                    className="min-h-[78px] flex flex-col items-center justify-center p-3 rounded-lg border border-[#e7ebf2] hover:border-purple-200 hover:bg-purple-50/30 text-center gap-2 transition-all group"
                                >
                                    <UserPlus size={26} className="text-[#5630d8] group-hover:scale-105 transition-transform" />
                                    <span className="text-[11px] font-extrabold text-[#17264e] leading-tight">Add Team Member</span>
                                </button>

                                <button
                                    onClick={() => setActiveModal('certificates')}
                                    className="min-h-[78px] flex flex-col items-center justify-center p-3 rounded-lg border border-[#e7ebf2] hover:border-amber-200 hover:bg-amber-50/30 text-center gap-2 transition-all group"
                                >
                                    <ShieldCheck size={26} className="text-[#f2a31b] group-hover:scale-105 transition-transform" />
                                    <span className="text-[11px] font-extrabold text-[#17264e] leading-tight">Add Certificate</span>
                                </button>

                                <button
                                    onClick={() => toast.info('Documents and Brochures can be managed via the Documentation tab.')}
                                    className="min-h-[78px] flex flex-col items-center justify-center p-3 rounded-lg border border-[#e7ebf2] hover:border-indigo-200 hover:bg-indigo-50/30 text-center gap-2 transition-all group"
                                >
                                    <FileText size={26} className="text-[#2d74ea] group-hover:scale-105 transition-transform" />
                                    <span className="text-[11px] font-extrabold text-[#17264e] leading-tight">Upload Brochure</span>
                                </button>

                                <button
                                    onClick={() => setActiveModal('profile')}
                                    className="min-h-[78px] flex flex-col items-center justify-center p-3 rounded-lg border border-[#e7ebf2] hover:border-purple-200 hover:bg-purple-50/30 text-center gap-2 transition-all group"
                                >
                                    <Edit2 size={26} className="text-[#6a37e6] group-hover:scale-105 transition-transform" />
                                    <span className="text-[11px] font-extrabold text-[#17264e] leading-tight">Update Details</span>
                                </button>
                            </div>
                        </div>

                        {/* 3. Primary Contact Card */}
                        <div className="bg-white rounded-xl p-6 border border-[#e5eaf2] shadow-[0_1px_8px_rgba(15,23,42,0.08)] space-y-4">
                            <div className="flex items-center justify-between">
                                <h3 className="text-base font-extrabold text-[#14234a]">
                                    Primary Contact
                                </h3>
                                <button
                                    onClick={() => {
                                        setContactForm({
                                            title: data?.contact1?.title || 'Mr.',
                                            firstName: data?.contact1?.firstName || '',
                                            lastName: data?.contact1?.lastName || '',
                                            email: data?.contact1?.email || '',
                                            designation: data?.contact1?.designation || '',
                                            mobile: data?.contact1?.mobile || '',
                                        });
                                        setActiveModal('contact');
                                    }}
                                    className="text-sm font-extrabold text-[#236ee8] hover:text-blue-700 print:hidden"
                                >
                                    Edit
                                </button>
                            </div>

                            <div className="flex items-center gap-5">
                                <div className="w-[72px] h-[72px] rounded-full overflow-hidden shrink-0 border border-slate-100">
                                    <Avatar
                                        url={data?.representativePhotoUrl}
                                        alt="Contact"
                                        className="w-full h-full"
                                    />
                                </div>
                                <div className="space-y-2 text-[#26365f] text-sm font-semibold min-w-0">
                                    <div>
                                        <h4 className="text-base font-extrabold text-[#14234a]">
                                            {contactForm.title} {contactForm.firstName} {contactForm.lastName}
                                        </h4>
                                        <p className="text-[#495775] font-semibold text-sm">
                                            {contactForm.designation}
                                        </p>
                                    </div>
                                    <div className="space-y-2">
                                        <div className="flex items-center gap-2 text-[#24345f]">
                                            <Phone size={16} className="text-[#173166]" />
                                            <span>{contactForm.mobile}</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-[#24345f]">
                                            <Mail size={16} className="text-[#173166]" />
                                            <span className="truncate max-w-[260px]">{contactForm.email}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

                {/* 3. BOTTOM ROW: TEAM MEMBERS */}
                <div className="bg-white rounded-xl p-5 border border-[#e5eaf2] shadow-[0_1px_8px_rgba(15,23,42,0.08)] space-y-5 relative xl:col-span-3">
                    <div className="flex items-center justify-between">
                        <h3 className="text-xl font-extrabold text-[#14234a]">
                            Team Members ({teamList.length})
                        </h3>
                        <button
                            onClick={openAddTeamMember}
                            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-bold bg-[#08245b] hover:bg-[#071f4e] text-white transition-all print:hidden"
                        >
                            <UserPlus size={14} />
                            Manage Team
                        </button>
                    </div>

                    {/* Team Members Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                        {teamList.map((member, index) => (
                            <div
                                key={index}
                                className="bg-white border border-[#e5eaf2] rounded-lg p-4 flex items-center gap-4 hover:shadow-sm hover:border-slate-200 transition-all group relative min-h-[112px]"
                            >
                                {/* Edit buttons on hover */}
                                <div className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 flex items-center gap-1 transition-opacity print:hidden">
                                    <button
                                        onClick={() => openEditTeamMember(index, member)}
                                        className="p-1 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded"
                                    >
                                        <Edit2 size={12} />
                                    </button>
                                    <button
                                        onClick={() => {
                                            if (confirm('Delete this team member?')) deleteTeamMember(index);
                                        }}
                                        className="p-1 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded"
                                    >
                                        <Trash2 size={12} />
                                    </button>
                                </div>

                                <div className="w-[60px] h-[60px] rounded-full overflow-hidden shrink-0 border border-slate-100">
                                    <Avatar url={member.photoUrl} alt={member.name} className="w-full h-full" />
                                </div>

                                <div className="space-y-2 min-w-0 text-sm text-[#26365f] font-semibold">
                                    <div className="flex flex-wrap items-center gap-2">
                                        <h4 className="text-sm font-extrabold text-[#14234a] truncate max-w-[135px]">
                                            {member.name}
                                        </h4>
                                        {member.isPrimary && (
                                            <span className="inline-flex items-center px-2.5 py-1 rounded-md text-[11px] font-extrabold bg-[#d9f4e9] text-[#158568]">
                                                Primary
                                            </span>
                                        )}
                                    </div>
                                    <p className="text-sm font-medium text-[#2e3a5d] truncate">
                                        {member.designation}
                                    </p>
                                    <div className="truncate text-xs">
                                        {member.email}
                                    </div>
                                    <div className="flex items-center gap-2 text-[#172f68] text-xs">
                                        <Phone size={14} className="text-[#173166] shrink-0" />
                                        <span>{member.mobile}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                        {teamList.length === 0 && (
                            <div className="col-span-full py-6 text-center text-slate-400 text-xs font-medium">
                                No team members added yet. Click 'Add Team Member' to invite one.
                            </div>
                        )}
                    </div>

                    <div className="flex justify-center pt-3 print:hidden">
                        <button
                            onClick={openAddTeamMember}
                            className="inline-flex items-center gap-1 text-sm font-bold text-blue-600 hover:text-blue-700 hover:underline"
                        >
                            + Add Team Member
                        </button>
                    </div>
                </div>

                {/* Footer Section */}
                <div className="hidden text-center text-[10px] font-bold uppercase text-slate-300 tracking-widest pt-4 border-t border-slate-100 xl:col-span-3">
                    9th India Health & Wellness Expo (IHWE) • Exhibitor Admin Portal
                </div>
            </div>

            {/* DYNAMIC MODALS SECTION */}
            <AnimatePresence>
                {activeModal && (
                    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.95, opacity: 0 }}
                            transition={{ duration: 0.15 }}
                            className="bg-white rounded-2xl shadow-xl w-full max-w-xl overflow-hidden border border-slate-100 max-h-[90vh] flex flex-col"
                        >
                            {/* Modal Header */}
                            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                                <h3 className="font-extrabold text-slate-900 text-lg uppercase tracking-tight">
                                    {activeModal === 'profile' && 'Update Corporate Identity'}
                                    {activeModal === 'categories' && 'Manage Product Sectors'}
                                    {activeModal === 'certificates' && 'Key Exhibitor Certificates'}
                                    {activeModal === 'contact' && 'Primary Contact Details'}
                                    {activeModal === 'team' && (selectedTeamMember !== null ? 'Modify Team Member' : 'Enlist New Team Member')}
                                </h3>
                                <button
                                    onClick={() => setActiveModal(null)}
                                    className="p-1 rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-600"
                                >
                                    <X size={18} />
                                </button>
                            </div>

                            {/* Modal Content */}
                            <div className="p-6 overflow-y-auto space-y-4 flex-1 text-slate-700 text-sm font-medium">

                                {/* 1. PROFILE DETAILS EDIT FORM */}
                                {activeModal === 'profile' && (
                                    <div className="space-y-4">
                                        <div className="space-y-1">
                                            <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Exhibitor Brand Name</label>
                                            <input
                                                type="text"
                                                className="w-full rounded-xl border border-slate-200 p-2.5 outline-none focus:border-blue-500"
                                                value={profileForm.brandName}
                                                onChange={(e) => setProfileForm({ ...profileForm, brandName: e.target.value })}
                                            />
                                        </div>
                                        <div className="space-y-1">
                                            <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Website Address</label>
                                            <input
                                                type="text"
                                                className="w-full rounded-xl border border-slate-200 p-2.5 outline-none focus:border-blue-500"
                                                value={profileForm.website}
                                                onChange={(e) => setProfileForm({ ...profileForm, website: e.target.value })}
                                            />
                                        </div>
                                        <div className="space-y-1">
                                            <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Exhibitor Bio Description</label>
                                            <textarea
                                                className="w-full rounded-xl border border-slate-200 p-2.5 outline-none focus:border-blue-500"
                                                rows={4}
                                                value={profileForm.companyDescription}
                                                onChange={(e) => setProfileForm({ ...profileForm, companyDescription: e.target.value })}
                                            />
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-1">
                                                <label className="text-xs font-bold uppercase tracking-wider text-slate-400">City</label>
                                                <input
                                                    type="text"
                                                    className="w-full rounded-xl border border-slate-200 p-2.5 outline-none focus:border-blue-500"
                                                    value={profileForm.city}
                                                    onChange={(e) => setProfileForm({ ...profileForm, city: e.target.value })}
                                                />
                                            </div>
                                            <div className="space-y-1">
                                                <label className="text-xs font-bold uppercase tracking-wider text-slate-400">State</label>
                                                <input
                                                    type="text"
                                                    className="w-full rounded-xl border border-slate-200 p-2.5 outline-none focus:border-blue-500"
                                                    value={profileForm.state}
                                                    onChange={(e) => setProfileForm({ ...profileForm, state: e.target.value })}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* 2. CATEGORIES SELECTOR FORM */}
                                {activeModal === 'categories' && (
                                    <div className="space-y-2">
                                        <p className="text-xs text-slate-400 font-bold uppercase mb-4 tracking-wider">
                                            Select product categories to show on your public profile:
                                        </p>
                                        <div className="space-y-2">
                                            {PRODUCT_CATEGORIES.map(cat => {
                                                const isSelected = categorySelection.includes(cat.id);
                                                return (
                                                    <label
                                                        key={cat.id}
                                                        className={`flex items-center justify-between p-3.5 rounded-xl border cursor-pointer transition-all ${isSelected ? 'border-blue-500 bg-blue-50/40 text-blue-900 font-bold' : 'border-slate-100 hover:bg-slate-50 text-slate-600'}`}
                                                        onClick={() => handleCategoryToggle(cat.id)}
                                                    >
                                                        <div className="flex items-center gap-3">
                                                            <div className={`p-1.5 rounded-md ${isSelected ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-400'}`}>
                                                                {React.createElement(cat.icon, { size: 16 })}
                                                            </div>
                                                            <span className="text-sm font-semibold">{cat.name}</span>
                                                        </div>
                                                        <input
                                                            type="checkbox"
                                                            checked={isSelected}
                                                            onChange={() => { }} // handled by click
                                                            className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                                                        />
                                                    </label>
                                                );
                                            })}
                                        </div>
                                    </div>
                                )}

                                {/* 3. CERTIFICATES LIST MANAGER */}
                                {activeModal === 'certificates' && (
                                    <div className="space-y-4">
                                        <div className="flex gap-2">
                                            <input
                                                type="text"
                                                placeholder="e.g. ISO 9001:2015 Certified"
                                                className="flex-1 rounded-xl border border-slate-200 p-2.5 outline-none focus:border-blue-500"
                                                value={newCertName}
                                                onChange={(e) => setNewCertName(e.target.value)}
                                            />
                                            <button
                                                onClick={addCertificate}
                                                disabled={saving}
                                                className="bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white px-5 rounded-xl text-sm font-bold shadow-sm"
                                            >
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
                                                                {certBadgeCode(cert.name)}
                                                            </div>
                                                            <span className="text-xs font-bold text-slate-700">{cert.name}</span>
                                                        </div>
                                                        <button
                                                            onClick={() => deleteCertificate(index)}
                                                            className="p-1.5 hover:bg-rose-50 text-slate-400 hover:text-rose-600 rounded"
                                                        >
                                                            <Trash2 size={14} />
                                                        </button>
                                                    </div>
                                                ))}
                                                {certificateList.length === 0 && (
                                                    <div className="p-6 text-center text-slate-400 text-xs font-medium">
                                                        No certificates registered.
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* 4. PRIMARY CONTACT FORM */}
                                {activeModal === 'contact' && (
                                    <div className="space-y-4">
                                        <div className="grid grid-cols-3 gap-2">
                                            <div className="space-y-1">
                                                <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Title</label>
                                                <select
                                                    className="w-full rounded-xl border border-slate-200 p-2.5 outline-none focus:border-blue-500 bg-white"
                                                    value={contactForm.title}
                                                    onChange={(e) => setContactForm({ ...contactForm, title: e.target.value })}
                                                >
                                                    <option value="Mr.">Mr.</option>
                                                    <option value="Ms.">Ms.</option>
                                                    <option value="Dr.">Dr.</option>
                                                    <option value="Mrs.">Mrs.</option>
                                                </select>
                                            </div>
                                            <div className="col-span-2 space-y-1">
                                                <label className="text-xs font-bold uppercase tracking-wider text-slate-400">First Name</label>
                                                <input
                                                    type="text"
                                                    className="w-full rounded-xl border border-slate-200 p-2.5 outline-none focus:border-blue-500"
                                                    value={contactForm.firstName}
                                                    onChange={(e) => setContactForm({ ...contactForm, firstName: e.target.value })}
                                                />
                                            </div>
                                        </div>
                                        <div className="space-y-1">
                                            <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Last Name</label>
                                            <input
                                                type="text"
                                                className="w-full rounded-xl border border-slate-200 p-2.5 outline-none focus:border-blue-500"
                                                value={contactForm.lastName}
                                                onChange={(e) => setContactForm({ ...contactForm, lastName: e.target.value })}
                                            />
                                        </div>
                                        <div className="space-y-1">
                                            <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Corporate Designation</label>
                                            <input
                                                type="text"
                                                className="w-full rounded-xl border border-slate-200 p-2.5 outline-none focus:border-blue-500"
                                                value={contactForm.designation}
                                                onChange={(e) => setContactForm({ ...contactForm, designation: e.target.value })}
                                            />
                                        </div>
                                        <div className="space-y-1">
                                            <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Registered Mobile</label>
                                            <input
                                                type="text"
                                                className="w-full rounded-xl border border-slate-200 p-2.5 outline-none focus:border-blue-500"
                                                value={contactForm.mobile}
                                                onChange={(e) => setContactForm({ ...contactForm, mobile: e.target.value })}
                                            />
                                        </div>
                                        <div className="space-y-1">
                                            <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Registered Email Address</label>
                                            <input
                                                type="email"
                                                className="w-full rounded-xl border border-slate-200 p-2.5 outline-none focus:border-blue-500"
                                                value={contactForm.email}
                                                onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                                            />
                                        </div>
                                    </div>
                                )}

                                {/* 5. TEAM MEMBERS DETAILS SLIDER */}
                                {activeModal === 'team' && (
                                    <div className="space-y-4">
                                        <div className="space-y-1">
                                            <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Full Name</label>
                                            <input
                                                type="text"
                                                className="w-full rounded-xl border border-slate-200 p-2.5 outline-none focus:border-blue-500"
                                                value={teamMemberForm.name}
                                                onChange={(e) => setTeamMemberForm({ ...teamMemberForm, name: e.target.value })}
                                            />
                                        </div>
                                        <div className="space-y-1">
                                            <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Company Role / Designation</label>
                                            <input
                                                type="text"
                                                className="w-full rounded-xl border border-slate-200 p-2.5 outline-none focus:border-blue-500"
                                                value={teamMemberForm.designation}
                                                onChange={(e) => setTeamMemberForm({ ...teamMemberForm, designation: e.target.value })}
                                            />
                                        </div>
                                        <div className="space-y-1">
                                            <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Work Email</label>
                                            <input
                                                type="email"
                                                className="w-full rounded-xl border border-slate-200 p-2.5 outline-none focus:border-blue-500"
                                                value={teamMemberForm.email}
                                                onChange={(e) => setTeamMemberForm({ ...teamMemberForm, email: e.target.value })}
                                            />
                                        </div>
                                        <div className="space-y-1">
                                            <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Mobile Number</label>
                                            <input
                                                type="text"
                                                className="w-full rounded-xl border border-slate-200 p-2.5 outline-none focus:border-blue-500"
                                                value={teamMemberForm.mobile}
                                                onChange={(e) => setTeamMemberForm({ ...teamMemberForm, mobile: e.target.value })}
                                            />
                                        </div>
                                        <div className="space-y-1">
                                            <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Photo URL (Optional)</label>
                                            <input
                                                type="text"
                                                className="w-full rounded-xl border border-slate-200 p-2.5 outline-none focus:border-blue-500"
                                                value={teamMemberForm.photoUrl}
                                                onChange={(e) => setTeamMemberForm({ ...teamMemberForm, photoUrl: e.target.value })}
                                            />
                                        </div>
                                        <label className="flex items-center gap-3 p-3.5 bg-slate-50 border border-slate-100 rounded-xl cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={teamMemberForm.isPrimary}
                                                onChange={(e) => setTeamMemberForm({ ...teamMemberForm, isPrimary: e.target.checked })}
                                                className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                                            />
                                            <div>
                                                <span className="text-sm font-bold text-slate-900 block leading-tight">Designate as Primary Contact</span>
                                                <span className="text-[10px] text-slate-400 font-semibold block pt-0.5">This person will appear as the lead representative for team-specific inquiries.</span>
                                            </div>
                                        </label>
                                    </div>
                                )}

                            </div>

                            {/* Modal Footer */}
                            <div className="px-6 py-4 border-t border-slate-100 flex items-center justify-end gap-3 bg-slate-50/50">
                                <button
                                    onClick={() => setActiveModal(null)}
                                    className="px-5 py-2.5 rounded-xl text-sm font-semibold border border-slate-200 hover:bg-slate-100 text-slate-600 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={() => {
                                        if (activeModal === 'profile') saveProfileData(profileForm);
                                        if (activeModal === 'categories') saveCategories();
                                        if (activeModal === 'contact') saveContact();
                                        if (activeModal === 'team') saveTeamMember();
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
