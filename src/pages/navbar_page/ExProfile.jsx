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
import { useExhibitorCtx } from '@/context/ExhibitorContext';
import { API_URL, SERVER_URL } from '@/lib/api';
import { toast } from 'sonner';

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
        <div className="w-full pb-20 min-h-screen bg-white font-sans text-slate-900">
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

            <div className="max-w-6xl mx-auto print-container p-4 md:p-8">

                {/* Header Section */}
                <div className="print-header flex flex-col md:flex-row items-center gap-6 mb-4 border-b border-slate-200 pb-4">
                    <div className="w-24 h-24 rounded-2xl bg-white border border-slate-200 flex items-center justify-center overflow-hidden shadow-sm relative">
                        <img src={previews.companyLogo || fixUrl(data?.companyLogoUrl)} alt="Logo" className="w-full h-full object-contain p-2" />
                        {isEditing && (
                            <label className="absolute inset-0 bg-black/40 flex items-center justify-center cursor-pointer no-print opacity-0 hover:opacity-100 transition-opacity">
                                <Camera className="text-white" size={20} />
                                <input type="file" className="hidden" accept="image/*" onChange={(e) => handleFileChange('companyLogo', e.target.files[0])} />
                            </label>
                        )}
                    </div>

                    <div className="flex-1 text-center md:text-left space-y-1">
                        <h1 className="text-2xl font-black uppercase tracking-tight text-slate-900 leading-none">
                            {data?.brandName || data?.exhibitorName || 'Official Profile'}
                        </h1>
                        <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">
                            9th India Handicrafts & Gifts Fair (IHWE) 2026
                        </p>
                        <div className="flex flex-wrap justify-center md:justify-start gap-4 text-[10px] font-black uppercase text-slate-400">
                            <span className="flex items-center gap-1"><Hash size={10} /> ID: {data?.registrationId}</span>
                            <span className="flex items-center gap-1"><Briefcase size={10} /> Sector: {data?.industrySector}</span>
                        </div>
                    </div>

                    <div className="flex items-center gap-2 no-print">
                        <button onClick={handlePrint} className="flex items-center gap-2 px-4 py-2 bg-slate-100 text-slate-600 rounded-lg font-bold text-xs hover:bg-slate-200 transition-colors">
                            <Printer size={14} /> Print
                        </button>
                        {isEditing ? (
                            <button onClick={handleSave} disabled={saving} className="flex items-center gap-2 px-6 py-2 bg-emerald-600 text-white rounded-lg font-bold text-xs shadow-lg shadow-emerald-200">
                                <Check size={14} /> {saving ? 'Wait...' : 'Update'}
                            </button>
                        ) : (
                            <button onClick={() => setIsEditing(true)} className="flex items-center gap-2 px-6 py-2 bg-slate-900 text-white rounded-lg font-bold text-xs shadow-lg shadow-slate-200">
                                <Edit2 size={14} /> Edit Profile
                            </button>
                        )}
                    </div>
                </div>

                {/* Table Formatted Sections */}
                <div className="space-y-8">

                    {/* 01. Participation Summary */}
                    <TableSection title="01. Participation & Financial Summary">
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
                    </TableSection>

                    {/* 02. Business Identity */}
                    <TableSection title="02. Official Business Identity">
                        <table className="w-full border border-slate-200">
                            <tbody>
                                <DataRow
                                    l1="Legal Entity Name" v1={data?.exhibitorName}
                                    l2="Brand / Fascia" v2={form.brandName}
                                    edit={isEditing}
                                    onV2={(v) => setForm({ ...form, brandName: v })}
                                />
                                <DataRow
                                    l1="Nature of Business" v1={form.natureOfBusiness}
                                    l2="Corporate Website" v2={form.website}
                                    edit={isEditing}
                                    onV1={(v) => setForm({ ...form, natureOfBusiness: v })}
                                    onV2={(v) => setForm({ ...form, website: v })}
                                />
                                <DataRow
                                    l1="GSTIN Number" v1={form.gstNo}
                                    l2="PAN Number" v2={form.panNo}
                                    edit={isEditing}
                                    onV1={(v) => setForm({ ...form, gstNo: v })}
                                    onV2={(v) => setForm({ ...form, panNo: v })}
                                />
                            </tbody>
                        </table>
                    </TableSection>

                    {/* 03. Address & Communication */}
                    <TableSection title="03. Registered Address & Communication">
                        <table className="w-full border border-slate-200">
                            <tbody>
                                <tr>
                                    <th className="w-1/4 bg-slate-50 p-3 text-[10px] uppercase font-black text-slate-500 border border-slate-200">Mailing Address</th>
                                    <td colSpan={3} className="p-3 border border-slate-200">
                                        {isEditing ? (
                                            <textarea className="w-full bg-slate-50 p-1 font-bold text-xs outline-none" value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} rows={2} />
                                        ) : <span className="font-bold text-xs">{form.address}</span>}
                                    </td>
                                </tr>
                                <DataRow
                                    l1="City" v1={form.city}
                                    l2="State / Province" v2={form.state}
                                    edit={isEditing}
                                    onV1={(v) => setForm({ ...form, city: v })}
                                    onV2={(v) => setForm({ ...form, state: v })}
                                />
                                <DataRow
                                    l1="Pincode" v1={form.pincode}
                                    l2="Country" v2={form.country}
                                    edit={isEditing}
                                    onV1={(v) => setForm({ ...form, pincode: v })}
                                    onV2={(v) => setForm({ ...form, country: v })}
                                />
                                <tr>
                                    <th className="w-1/4 bg-slate-50 p-3 text-[10px] uppercase font-black text-slate-500 border border-slate-200">Landline / Contact</th>
                                    <td colSpan={3} className="p-3 border border-slate-200">
                                        {isEditing ? (
                                            <input className="w-full bg-slate-50 p-1 font-bold text-xs outline-none" value={form.landlineNo} onChange={(e) => setForm({ ...form, landlineNo: e.target.value })} />
                                        ) : <span className="font-bold text-xs">{form.landlineNo || '—'}</span>}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </TableSection>

                    {/* 04. Authorized Personnel */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <TableSection title="04. A. Primary Contact">
                            <table className="w-full border border-slate-200">
                                <tbody>
                                    <tr>
                                        <th className="w-1/3 bg-slate-50 p-2 text-[9px] uppercase font-bold text-slate-500 border border-slate-200">Official Name</th>
                                        <td className="p-2 border border-slate-200">
                                            {isEditing ? (
                                                <div className="flex gap-1">
                                                    <select className="bg-slate-50 text-[10px]" value={form.contact1.title} onChange={(e) => setForm({ ...form, contact1: { ...form.contact1, title: e.target.value } })}>
                                                        <option value="Mr.">Mr.</option><option value="Ms.">Ms.</option>
                                                    </select>
                                                    <input className="w-full bg-slate-50 p-1 font-bold text-[10px]" value={`${form.contact1.firstName} ${form.contact1.lastName}`} onChange={(e) => {
                                                        const p = e.target.value.split(' '); setForm({ ...form, contact1: { ...form.contact1, firstName: p[0] || '', lastName: p.slice(1).join(' ') || '' } });
                                                    }} />
                                                </div>
                                            ) : <span className="font-bold text-xs">{form.contact1.title} {form.contact1.firstName} {form.contact1.lastName}</span>}
                                        </td>
                                    </tr>
                                    <DataRowSingle l="Designation" v={form.contact1.designation} edit={isEditing} onV={(v) => setForm({ ...form, contact1: { ...form.contact1, designation: v } })} />
                                    <DataRowSingle l="Mobile No" v={form.contact1.mobile} edit={isEditing} onV={(v) => setForm({ ...form, contact1: { ...form.contact1, mobile: v } })} />
                                    <DataRowSingle l="Email ID" v={form.contact1.email} edit={isEditing} onV={(v) => setForm({ ...form, contact1: { ...form.contact1, email: v } })} />
                                </tbody>
                            </table>
                        </TableSection>

                        <TableSection title="04. B. Secondary Contact">
                            <table className="w-full border border-slate-200">
                                <tbody>
                                    <tr>
                                        <th className="w-1/3 bg-slate-50 p-2 text-[9px] uppercase font-bold text-slate-500 border border-slate-200">Official Name</th>
                                        <td className="p-2 border border-slate-200">
                                            {isEditing ? (
                                                <div className="flex gap-1">
                                                    <select className="bg-slate-50 text-[10px]" value={form.contact2.title} onChange={(e) => setForm({ ...form, contact2: { ...form.contact2, title: e.target.value } })}>
                                                        <option value="">N/A</option><option value="Mr.">Mr.</option><option value="Ms.">Ms.</option>
                                                    </select>
                                                    <input className="w-full bg-slate-50 p-1 font-bold text-[10px]" value={`${form.contact2.firstName} ${form.contact2.lastName}`} onChange={(e) => {
                                                        const p = e.target.value.split(' '); setForm({ ...form, contact2: { ...form.contact2, firstName: p[0] || '', lastName: p.slice(1).join(' ') || '' } });
                                                    }} />
                                                </div>
                                            ) : <span className="font-bold text-xs">{form.contact2.title ? `${form.contact2.title} ` : ''}{form.contact2.firstName} {form.contact2.lastName || '—'}</span>}
                                        </td>
                                    </tr>
                                    <DataRowSingle l="Designation" v={form.contact2.designation} edit={isEditing} onV={(v) => setForm({ ...form, contact2: { ...form.contact2, designation: v } })} />
                                    <DataRowSingle l="Mobile No" v={form.contact2.mobile} edit={isEditing} onV={(v) => setForm({ ...form, contact2: { ...form.contact2, mobile: v } })} />
                                    <DataRowSingle l="Email ID" v={form.contact2.email} edit={isEditing} onV={(v) => setForm({ ...form, contact2: { ...form.contact2, email: v } })} />
                                </tbody>
                            </table>
                        </TableSection>
                    </div>

                    {/* 05. Assets */}
                    <div className="no-print">
                        <TableSection title="05. Digital Assets & KYC Documents ">
                            <div className="border border-slate-200 rounded-lg p-6 bg-slate-50/50 flex flex-wrap justify-between gap-4">
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
                <div className="mt-12 text-center text-[10px] font-black uppercase text-slate-300 tracking-widest border-t border-slate-100 pt-8 no-print">
                    India Handicrafts & Gifts Fair • Confidential Participation Record
                </div>
            </div>
        </div>
    );
}

// Internal Helper Components
function TableSection({ title, children }) {
    return (
        <div className="space-y-3">
            <h2 className="text-[12px] font-black uppercase tracking-tight text-slate-800 flex items-center gap-2 border-l-4 border-slate-900 pl-3 leading-none py-1">
                {title}
            </h2>
            {children}
        </div>
    );
}

function DataRow({ l1, v1, l2, v2, edit, onV1, onV2 }) {
    return (
        <tr>
            <th className="w-1/4 bg-slate-50 p-3 text-[10px] uppercase font-black text-slate-500 border border-slate-200">{l1}</th>
            <td className="w-1/4 p-3 border border-slate-200">
                {edit && onV1 ? (
                    <input className="w-full bg-slate-50 p-1 font-bold text-xs outline-none" value={v1} onChange={(e) => onV1(e.target.value)} />
                ) : <span className="font-bold text-xs">{v1 || '—'}</span>}
            </td>
            <th className="w-1/4 bg-slate-50 p-3 text-[10px] uppercase font-black text-slate-500 border border-slate-200">{l2}</th>
            <td className="w-1/4 p-3 border border-slate-200">
                {edit && onV2 ? (
                    <input className="w-full bg-slate-50 p-1 font-bold text-xs outline-none" value={v2} onChange={(e) => onV2(e.target.value)} />
                ) : <span className="font-bold text-xs">{v2 || '—'}</span>}
            </td>
        </tr>
    );
}

function DataRowSingle({ l, v, edit, onV }) {
    return (
        <tr>
            <th className="w-1/3 bg-slate-50 p-2 text-[9px] uppercase font-bold text-slate-500 border border-slate-200">{l}</th>
            <td className="p-2 border border-slate-200">
                {edit ? (
                    <input className="w-full bg-slate-50 p-1 font-bold text-[10px] outline-none" value={v} onChange={(e) => onV(e.target.value)} />
                ) : <span className="font-bold text-[11px]">{v || '—'}</span>}
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
                <a href={preview || fixUrl(url)} target="_blank" rel="noreferrer" className="text-[8px] font-bold text-slate-300 hover:text-slate-900 transition-colors tracking-tighter no-print">View</a>
            )}
        </div>
    );
}