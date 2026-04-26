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
    CreditCard,
    Award,
    Calendar,
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
    Check
} from 'lucide-react';
import { API_URL, SERVER_URL } from '@/lib/api';
import { toast } from 'sonner';
import { useExhibitorCtx } from '@/context/ExhibitorContext';

import DashboardHero from '@/components/dashboard/DashboardHero';

const DEFAULT_PLACEHOLDER = "https://placehold.co/400x400?text=No+Logo";

const fixUrl = (url) => {
    if (!url || url === 'undefined' || url === 'null' || url === '') return DEFAULT_PLACEHOLDER;
    if (url.startsWith('http') || url.startsWith('blob:')) return url;
    const cleanPath = url.startsWith('/') ? url : `/${url}`;
    return url.includes('res.cloudinary.com') ? url : `${SERVER_URL}${cleanPath}`;
};

export default function ExProfile() {
    const { data, setData } = useExhibitorCtx();
    const [isEditing, setIsEditing] = useState(false);
    const [saving, setSaving] = useState(false);

    // Form State
    const [form, setForm] = useState({
        website: '',
        address: '',
        city: '',
        state: '',
        country: '',
        pincode: '',
        landlineNo: '',
        fasciaName: '',
        gstNo: '',
        panNo: '',
        natureOfBusiness: '',
        brandName: '',
        contact1: {
            title: 'Mr.',
            firstName: '',
            lastName: '',
            email: '',
            designation: '',
            mobile: '',
            alternateNo: '',
        },
        contact2: {
            title: '',
            firstName: '',
            lastName: '',
            email: '',
            designation: '',
            mobile: '',
            alternateNo: '',
        },
    });

    const [files, setFiles] = useState({});
    const [previews, setPreviews] = useState({});

    useEffect(() => {
        if (data) {
            setForm({
                website: data.website || '',
                address: data.address || '',
                city: data.city || '',
                state: data.state || '',
                country: data.country || '',
                pincode: data.pincode || '',
                landlineNo: data.landlineNo || '',
                fasciaName: data.fasciaName || '',
                gstNo: data.gstNo || '',
                panNo: data.panNo || '',
                natureOfBusiness: data.natureOfBusiness || '',
                brandName: data.brandName || '',
                contact1: {
                    title: data.contact1?.title || 'Mr.',
                    firstName: data.contact1?.firstName || '',
                    lastName: data.contact1?.lastName || '',
                    email: data.contact1?.email || '',
                    designation: data.contact1?.designation || '',
                    mobile: data.contact1?.mobile || '',
                    alternateNo: data.contact1?.alternateNo || '',
                },
                contact2: {
                    title: data.contact2?.title || '',
                    firstName: data.contact2?.firstName || '',
                    lastName: data.contact2?.lastName || '',
                    email: data.contact2?.email || '',
                    designation: data.contact2?.designation || '',
                    mobile: data.contact2?.mobile || '',
                    alternateNo: data.contact2?.alternateNo || '',
                },
            });
        }
    }, [data]);

    // const handleFileChange = (field, file) => {
    //     if (!file) {
    //         setFiles(prev => { const next = { ...prev }; delete next[field]; return next; });
    //         setPreviews(prev => { const next = { ...prev }; delete next[field]; return next; });
    //         return;
    //     }
    //     if (file.size > 5 * 1024 * 1024) {
    //         toast.error('File size should be less than 5MB');
    //         return;
    //     }
    //     setFiles(prev => ({ ...prev, [field]: file }));
    //     const url = URL.createObjectURL(file);
    //     setPreviews(prev => ({ ...prev, [field]: url }));
    // };
    const handleFileChange = (field, file) => {
        if (!file) {
            setFiles(prev => { const next = { ...prev }; delete next[field]; return next; });
            setPreviews(prev => { const next = { ...prev }; delete next[field]; return next; });
            return;
        }
        if (file.size > 5 * 1024 * 1024) {
            toast.error('File size should be less than 5MB');
            return;
        }
        // ✅ All image types allowed including webp, avif, svg
        if (!file.type.startsWith('image/')) {
            toast.error('Only image files are allowed');
            return;
        }
        setFiles(prev => ({ ...prev, [field]: file }));
        const url = URL.createObjectURL(file);
        setPreviews(prev => ({ ...prev, [field]: url }));
    };

    const handleSave = async () => {
        setSaving(true);
        try {
            const token = localStorage.getItem('exhibitorToken');
            const formData = new FormData();
            Object.entries(form).forEach(([key, value]) => {
                if (typeof value === 'object') formData.append(key, JSON.stringify(value));
                else formData.append(key, value);
            });
            const multerFieldMap = {
                companyLogo: 'companyLogo',
                panCardFront: 'panCardFront',
                aadhaarCardFront: 'aadhaarCardFront',
                aadhaarCardBack: 'aadhaarCardBack',
                gstCertificate: 'gstCertificate',
                cancelledCheque: 'cancelledCheque',
                representativePhoto: 'representativePhoto'
            };
            Object.entries(files).forEach(([field, file]) => {
                formData.append(multerFieldMap[field] || field, file);
            });
            const res = await fetch(`${API_URL}/exhibitor-auth/update-profile?id=${data._id}`, {
                method: 'PUT',
                headers: { Authorization: `Bearer ${token}` },
                body: formData,
            });
            const result = await res.json();
            if (result.success) {
                toast.success('Profile Updated Successfully!');
                if (result.data) setData(result.data);
                setIsEditing(false);
            } else toast.error(result.message || 'Update failed');
        } catch (error) {
            toast.error('Error updating profile');
        } finally {
            setSaving(false);
        }
    };

    const handlePrint = () => window.print();

    const formatRupee = (amount) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0
        }).format(amount);
    };

    return (
        <div className="w-full pb-2 min-h-screen bg-white font-sans text-slate-900 space-y-6">
            <DashboardHero 
                pageId="ex-profile" 
                defaultTitle="Exhibitor Profile" 
                defaultSubtitle="Manage your corporate identity and official participation records"
                type="exhibitor" 
            />
            {/* Optimized Document Print CSS - Fixed for Tables */}
            <style dangerouslySetInnerHTML={{
                __html: `
    @media print {
        @page { size: A4; margin: 10mm; }
        body { background: white !important; font-size: 10px !important; }
        .no-print { display: none !important; }
        .print-container { width: 100% !important; padding: 0 !important; margin: 0 !important; }
        
        table { width: 100% !important; border-collapse: collapse !important; margin-bottom: 10px !important; }
        th, td { 
            border: 0.5pt solid black !important; 
            padding: 4px 6px !important; 
            text-align: left !important;
            vertical-align: middle !important;
        }
        th { background-color: #f8fafc !important; font-weight: 800 !important; color: black !important; text-transform: uppercase !important; font-size: 8px !important; }
        .participation-row td { text-align: center !important; }
        
        .print-header { 
            display: flex !important;
            flex-direction: row !important;
            align-items: center !important;
            border-bottom: 2pt solid black !important;
            margin-bottom: 15px !important;
            padding-bottom: 10px !important;
        }
    }
`}} />

            <div className="max-w-6xl mx-auto print-container px-4 py-4">

                {/* Header Section */}
                <div className="print-header flex flex-col md:flex-row items-center gap-6 mb-2 border-b border-slate-200 pb-4">
                    <div className="w-20 h-20 rounded-full bg-white border border-slate-200 flex items-center justify-center overflow-hidden shadow-sm relative shrink-0">
                        <img src={previews.companyLogo || fixUrl(data?.companyLogoUrl)} alt="Logo" className="w-full h-full object-fit" />
                        {isEditing && (
                            <label className="absolute inset-0 bg-black/40 flex items-center justify-center cursor-pointer no-print opacity-0 hover:opacity-100 transition-opacity">
                                <Camera className="text-white" size={18} />
                                <input type="file" className="hidden" accept="image/*,image/webp,image/avif" onChange={(e) => handleFileChange('companyLogo', e.target.files[0])} />                            </label>
                        )}
                    </div>

                    <div className="flex-1 text-center md:text-left space-y-1">
                        <h2 className="text-xl font-medium uppercase tracking-tight text-slate-900 leading-none">
                            {data?.brandName || data?.exhibitorName || 'Official Profile'}
                        </h2>
                        <p className="text-xs font-medium text-slate-500 uppercase tracking-widest">
                            9th India Handicrafts & Gifts Fair (IHWE) 2026
                        </p>
                        <div className="flex flex-wrap justify-center md:justify-start gap-4 text-[10px] font-medium uppercase text-slate-400">
                            <span className="flex items-center gap-1"><Hash size={10} /> ID: {data?.registrationId}</span>
                            <span className="flex items-center gap-1"><Briefcase size={10} /> Sector: {data?.industrySector}</span>
                        </div>
                    </div>

                    <div className="flex items-center gap-3 no-print">
                        <button
                            onClick={handlePrint}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 hover:text-slate-700 hover:border-slate-300 transition-all duration-150"
                        >
                            <Printer size={13} />
                            Print
                        </button>

                        <div className="w-px h-6 bg-slate-200" />

                        {isEditing ? (
                            <button
                                onClick={handleSave}
                                disabled={saving}
                                className="inline-flex items-center gap-2 px-5 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider text-white transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
                                style={{ background: saving ? '#6ee7b7' : '#059669' }}
                            >
                                <Check size={13} />
                                {saving ? 'Saving...' : 'Update'}
                            </button>
                        ) : (
                            <button
                                onClick={() => setIsEditing(true)}
                                className="inline-flex items-center gap-2 px-5 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider text-white bg-slate-900 hover:bg-slate-700 transition-all duration-150"
                            >
                                <Edit2 size={13} />
                                Edit Profile
                            </button>
                        )}
                    </div>
                </div>

                {/* Table Formatted Sections */}
                <div className="space-y-4">

                    {/* 01. Participation Summary */}
                    {/* <TableSection title="01. Participation & Financial Summary">
                        <table className="w-full border border-slate-200 rounded-lg overflow-hidden">
                            <thead>
                                <tr className="bg-slate-50 text-[10px] font-black uppercase text-slate-500 border-b border-slate-200">
                                    <th className="p-3">Stall Type</th>
                                    <th className="p-3">Category</th>
                                    <th className="p-3">Reg Ref</th>
                                    <th className="p-3">Total Cost</th>
                                    <th className="p-3">Amt Paid</th>
                                    <th className="p-3">Balance</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="participation-row text-center font-bold text-slate-900">
                                    <td className="p-3 border-r border-slate-200">{data?.participation?.stallType || '—'}</td>
                                    <td className="p-3 border-r border-slate-200">{data?.participation?.currency === 'INR' ? 'Domestic' : 'International'}</td>
                                    <td className="p-3 border-r border-slate-200 font-mono text-[10px]">{data?.registrationId}</td>
                                    <td className="p-3 border-r border-slate-200">{formatRupee(data?.participation?.total || 0)}</td>
                                    <td className="p-3 border-r border-slate-200 text-emerald-600">{formatRupee(data?.amountPaid || 0)}</td>
                                    <td className={`p-3 ${data?.balanceAmount > 0 ? 'text-orange-500' : 'text-slate-300'}`}>{formatRupee(data?.balanceAmount || 0)}</td>
                                </tr>
                            </tbody>
                        </table>
                    </TableSection> */}

                    {/* 01. Business Identity */}
                    <TableSection title="01. Official Business Identity">
                        <table className="w-full border border-slate-200 table-fixed">
                            <tbody>
                                <DataRowTriple
                                    l1="Legal Entity Name" v1={data?.exhibitorName}
                                    l2="Brand / Fascia" v2={form.fasciaName}
                                    l3="Nature of Business" v3={form.natureOfBusiness}
                                    edit={isEditing}
                                    onV2={(v) => setForm({ ...form, fasciaName: v })}
                                    onV3={(v) => setForm({ ...form, natureOfBusiness: v })}
                                />
                                <DataRowTriple
                                    l1="GSTIN Number" v1={form.gstNo}
                                    l2="PAN Number" v2={form.panNo}
                                    l3="Corporate Website" v3={form.website}
                                    edit={isEditing}
                                    onV1={(v) => setForm({ ...form, gstNo: v })}
                                    onV2={(v) => setForm({ ...form, panNo: v })}
                                    onV3={(v) => setForm({ ...form, website: v })}
                                />
                            </tbody>
                        </table>
                    </TableSection>

                    {/* 02. Address & Communication */}
                    <TableSection title="02. Registered Address & Communication">
                        <table className="w-full border border-slate-200 table-fixed">
                            <tbody>
                                <tr>
                                    <th className="w-[12%] bg-slate-50 p-1 text-[11px] uppercase font-semibold text-slate-500 border border-slate-200 text-left">Mailing Address</th>
                                    <td colSpan={5} className="p-1 border border-slate-200">
                                        {isEditing ? (
                                            <textarea className="w-full bg-slate-50 p-1 font-medium text-xs outline-none" value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} rows={2} />
                                        ) : <span className="font-medium text-xs">{form.address}</span>}
                                    </td>
                                </tr>
                                <DataRowTriple
                                    l1="City" v1={form.city}
                                    l2="State / Prov" v2={form.state}
                                    l3="Pincode" v3={form.pincode}
                                    edit={isEditing}
                                    onV1={(v) => setForm({ ...form, city: v })}
                                    onV2={(v) => setForm({ ...form, state: v })}
                                    onV3={(v) => setForm({ ...form, pincode: v })}
                                />
                                <DataRow
                                    l1="Country" v1={form.country}
                                    l2="Landline / Contact" v2={form.landlineNo}
                                    edit={isEditing}
                                    onV1={(v) => setForm({ ...form, country: v })}
                                    onV2={(v) => setForm({ ...form, landlineNo: v })}
                                />
                            </tbody>
                        </table>
                    </TableSection>

                    {/* 03. Authorized Personnel */}
                    <TableSection title="03. Authorized Personnel Details">
                        <table className="w-full border border-slate-200 mt-2">
                            <thead>
                                <tr className="bg-slate-50 text-[10px] font-black uppercase text-slate-500 border-b border-slate-200">
                                    <th className="w-[30%] p-1 text-[11px] border-r border-slate-200">Official Name</th>
                                    <th className="w-[20%] p-1 text-[11px] border-r border-slate-200">Designation</th>
                                    <th className="w-[20%] p-1 text-[11px] border-r border-slate-200">Mobile No</th>
                                    <th className="w-[30%] p-1 text-[11px]">Email ID</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* Primary Contact */}
                                <tr className="border-b border-slate-200">
                                    <td className="p-1 border-r border-slate-200">
                                        {isEditing ? (
                                            <div className="flex gap-1">
                                                <select className="bg-slate-50 text-[11px]" value={form.contact1.title} onChange={(e) => setForm({ ...form, contact1: { ...form.contact1, title: e.target.value } })}>
                                                    <option value="Mr.">Mr.</option><option value="Ms.">Ms.</option>
                                                </select>
                                                <input className="w-full bg-slate-50 p-1 font-medium text-[11px] outline-none" value={`${form.contact1.firstName} ${form.contact1.lastName}`} onChange={(e) => {
                                                    const p = e.target.value.split(' '); setForm({ ...form, contact1: { ...form.contact1, firstName: p[0] || '', lastName: p.slice(1).join(' ') || '' } });
                                                }} />
                                            </div>
                                        ) : <span className="font-medium text-xs">{form.contact1.title} {form.contact1.firstName} {form.contact1.lastName}</span>}
                                    </td>
                                    <td className="p-1 border-r border-slate-200">
                                        {isEditing ? <input className="w-full bg-slate-50 p-0.5 font-medium text-[11px] outline-none" value={form.contact1.designation} onChange={(e) => setForm({ ...form, contact1: { ...form.contact1, designation: e.target.value } })} />
                                            : <span className="font-medium text-xs text-slate-600">{form.contact1.designation || '—'}</span>}
                                    </td>
                                    <td className="p-1 border-r border-slate-200">
                                        {isEditing ? <input className="w-full bg-slate-50 p-0.5 font-medium text-[11px] outline-none" value={form.contact1.mobile} onChange={(e) => setForm({ ...form, contact1: { ...form.contact1, mobile: e.target.value } })} />
                                            : <span className="font-medium text-xs text-slate-600">{form.contact1.mobile || '—'}</span>}
                                    </td>
                                    <td className="p-1">
                                        {isEditing ? <input className="w-full bg-slate-50 p-0.5 font-medium text-[11px] outline-none" value={form.contact1.email} onChange={(e) => setForm({ ...form, contact1: { ...form.contact1, email: e.target.value } })} />
                                            : <span className="font-medium text-xs text-slate-600">{form.contact1.email || '—'}</span>}
                                    </td>
                                </tr>
                                {/* Secondary Contact */}
                                <tr>
                                    <td className="p-1 border-r border-slate-200">
                                        {isEditing ? (
                                            <div className="flex gap-1">
                                                <select className="bg-slate-50 text-[11px]" value={form.contact2.title} onChange={(e) => setForm({ ...form, contact2: { ...form.contact2, title: e.target.value } })}>
                                                    <option value="">N/A</option><option value="Mr.">Mr.</option><option value="Ms.">Ms.</option>
                                                </select>
                                                <input className="w-full bg-slate-50 p-1 font-medium text-[11px] outline-none" value={`${form.contact2.firstName} ${form.contact2.lastName}`} onChange={(e) => {
                                                    const p = e.target.value.split(' '); setForm({ ...form, contact2: { ...form.contact2, firstName: p[0] || '', lastName: p.slice(1).join(' ') || '' } });
                                                }} />
                                            </div>
                                        ) : <span className="font-medium text-xs">{form.contact2.title ? `${form.contact2.title} ` : ''}{form.contact2.firstName} {form.contact2.lastName || '—'}</span>}
                                    </td>
                                    <td className="p-1 border-r border-slate-200">
                                        {isEditing ? <input className="w-full bg-slate-50 p-0.5 font-medium text-[11px] outline-none" value={form.contact2.designation} onChange={(e) => setForm({ ...form, contact2: { ...form.contact2, designation: e.target.value } })} />
                                            : <span className="font-medium text-xs text-slate-600">{form.contact2.designation || '—'}</span>}
                                    </td>
                                    <td className="p-1 border-r border-slate-200">
                                        {isEditing ? <input className="w-full bg-slate-50 p-0.5 font-medium text-[11px] outline-none" value={form.contact2.mobile} onChange={(e) => setForm({ ...form, contact2: { ...form.contact2, mobile: e.target.value } })} />
                                            : <span className="font-medium text-xs text-slate-600">{form.contact2.mobile || '—'}</span>}
                                    </td>
                                    <td className="p-1">
                                        {isEditing ? <input className="w-full bg-slate-50 p-0.5 font-medium text-[11px] outline-none" value={form.contact2.email} onChange={(e) => setForm({ ...form, contact2: { ...form.contact2, email: e.target.value } })} />
                                            : <span className="font-medium text-xs text-slate-600">{form.contact2.email || '—'}</span>}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </TableSection>

                    {/* 04. Assets */}
                    <div className="no-print">
                        <TableSection title="04. Digital Assets & KYC Documents ">
                            <div className="border border-slate-200 rounded-lg px-3 py-3 bg-slate-50/50 flex flex-wrap justify-between gap-4">
                                <AssetItem label="PAN CARD" url={data?.panCardFrontUrl} preview={previews.panCardFront} field="panCardFront" edit={isEditing} onChange={handleFileChange} />
                                <AssetItem label="GST CERT" url={data?.gstCertificateUrl} preview={previews.gstCertificate} field="gstCertificate" edit={isEditing} onChange={handleFileChange} />
                                <AssetItem label="AADHAAR F" url={data?.aadhaarCardFrontUrl} preview={previews.aadhaarCardFront} field="aadhaarCardFront" edit={isEditing} onChange={handleFileChange} />
                                <AssetItem label="AADHAAR B" url={data?.aadhaarCardBackUrl} preview={previews.aadhaarCardBack} field="aadhaarCardBack" edit={isEditing} onChange={handleFileChange} />
                                <AssetItem label="CANCEL CHQ" url={data?.cancelledChequeUrl} preview={previews.cancelledCheque} field="cancelledCheque" edit={isEditing} onChange={handleFileChange} />
                                <AssetItem label="PRO PHOTO" url={data?.representativePhotoUrl} preview={previews.representativePhoto} field="representativePhoto" edit={isEditing} onChange={handleFileChange} />
                            </div>
                        </TableSection>
                    </div>

                </div>

                {/* Footer */}
                <div className="mt-2 text-center text-[10px] font-black uppercase text-slate-300 tracking-widest border-t border-slate-100 pt-2 no-print">
                    India Handicrafts & Gifts Fair • Confidential Participation Record
                </div>
            </div>
        </div>
    );
}

// Internal Helper Components
function TableSection({ title, children }) {
    return (
        <div className="space-y-1">
            <h2 className="text-[12px] font-semibold uppercase tracking-tight text-slate-800 flex items-center gap-2 border-l-4 border-slate-900 pl-3 leading-none py-1">
                {title}
            </h2>
            {children}
        </div>
    );
}

function DataRowTriple({ l1, v1, l2, v2, l3, v3, edit, onV1, onV2, onV3 }) {
    return (
        <tr>
            <th className="w-[12%] bg-slate-50 p-1 text-[11px] uppercase font-medium text-slate-500 border border-slate-200">{l1}</th>
            <td className="w-[21%] p-1 border border-slate-200">
                {edit && onV1 ? (
                    <input className="w-full bg-slate-50 p-1 font-medium text-[12px] outline-none" value={v1} onChange={(e) => onV1(e.target.value)} />
                ) : <span className="font-medium text-[12px]">{v1 || '—'}</span>}
            </td>
            <th className="w-[12%] bg-slate-50 p-1 text-[11px] uppercase font-medium text-slate-500 border border-slate-200">{l2}</th>
            <td className="w-[21%] p-1 border border-slate-200">
                {edit && onV2 ? (
                    <input className="w-full bg-slate-50 p-1 font-medium text-[12px] outline-none" value={v2} onChange={(e) => onV2(e.target.value)} />
                ) : <span className="font-medium text-[12px]">{v2 || '—'}</span>}
            </td>
            <th className="w-[12%] bg-slate-50 p-1 text-[11px] uppercase font-medium text-slate-500 border border-slate-200">{l3}</th>
            <td className="w-[21%] p-1 border border-slate-200">
                {edit && onV3 ? (
                    <input className="w-full bg-slate-50 p-1 font-medium text-[12px] outline-none" value={v3} onChange={(e) => onV3(e.target.value)} />
                ) : <span className="font-medium text-[12px]">{v3 || '—'}</span>}
            </td>
        </tr>
    );
}

function DataRow({ l1, v1, l2, v2, edit, onV1, onV2 }) {
    return (
        <tr>
            <th className="w-[12%] bg-slate-50 p-1 text-[11px] uppercase font-medium text-slate-500 border border-slate-200">{l1}</th>
            <td colSpan={2} className="w-[38%] p-1 border border-slate-200">
                {edit && onV1 ? (
                    <input className="w-full bg-slate-50 p-1 font-bold text-xs outline-none" value={v1} onChange={(e) => onV1(e.target.value)} />
                ) : <span className="font-medium text-[12px]">{v1 || '—'}</span>}
            </td>
            <th className="w-[12%] bg-slate-50 p-1 text-[11px] uppercase font-medium text-slate-500 border border-slate-200">{l2}</th>
            <td colSpan={2} className="w-[38%] p-1 border border-slate-200">
                {edit && onV2 ? (
                    <input className="w-full bg-slate-50 p-1 font-medium text-[12px] outline-none" value={v2} onChange={(e) => onV2(e.target.value)} />
                ) : <span className="font-medium text-[12px]">{v2 || '—'}</span>}
            </td>
        </tr>
    );
}

function DataRowSingle({ l, v, edit, onV }) {
    return (
        <tr>
            <th className="w-1/3 bg-slate-50 p-1 text-[12px] uppercase font-medium text-slate-500 border border-slate-200">{l}</th>
            <td className="p-1 border border-slate-200">
                {edit ? (
                    <input className="w-full bg-slate-50 p-1 font-medium text-[12px] outline-none" value={v} onChange={(e) => onV(e.target.value)} />
                ) : <span className="font-medium text-[12px]">{v || '—'}</span>}
            </td>
        </tr>
    );
}

function AssetItem({ label, url, preview, field, edit, onChange }) {
    const inputRef = useRef(null);
    const hasDoc = url || preview;
    return (
        <div className="flex flex-col items-center gap-2">
            <span className="text-[8px] font-black text-slate-400 uppercase">{label}</span>
            <div className="w-16 h-16 bg-white border border-slate-200 rounded-lg overflow-hidden relative group">
                <img src={preview || fixUrl(url)} alt={label} className="w-full h-full object-contain p-1" />
                {edit && (
                    <div onClick={() => inputRef.current?.click()} className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center cursor-pointer no-print transition-opacity">
                        <Upload size={16} className="text-white" />
                        <input type="file" ref={inputRef} className="hidden" onChange={(e) => onChange(field, e.target.files[0])} />
                    </div>
                )}
            </div>
            {!edit && hasDoc && (
                <a href={preview || fixUrl(url)} target="_blank" rel="noreferrer" className="text-[8px] font-medium text-slate-300 hover:text-slate-900 transition-colors tracking-tighter no-print">View</a>
            )}
        </div>
    );
}