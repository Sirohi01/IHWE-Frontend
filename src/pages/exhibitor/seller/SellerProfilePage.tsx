import { useState, useEffect, useRef } from 'react';
import { useExhibitorCtx } from '@/context/ExhibitorContext';
import {
    Building2, User, Mail, Phone, Globe,
    Upload, FileText, CheckCircle2, AlertCircle,
    Save, Loader2, Camera, Link as LinkIcon,
    Users, Briefcase, Shield, MapPin, Hash,
    CreditCard, Info, Eye
} from 'lucide-react';
import { API_URL, SERVER_URL } from '@/lib/api';
import { toast } from 'sonner';
import DashboardHero from '@/components/dashboard/DashboardHero';
const InfoRow = ({ label, value }: { label: string; value?: string }) => (
    value ? (
        <div className="flex flex-col gap-0.5">
            <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{label}</span>
            <span className="text-sm font-bold text-slate-800">{value}</span>
        </div>
    ) : null
);

const inputCls = "w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-[#23471d] transition-colors font-medium";
const labelCls = "text-[10px] font-black text-slate-600 uppercase tracking-widest mb-1.5 block";

export default function SellerProfilePage() {
    const { data, fetchDashboard, setData } = useExhibitorCtx();
    const [loading, setLoading] = useState(false);
    const [uploading, setUploading] = useState<string | null>(null);
    const initializedRef = useRef<string | null>(null);

    const [profile, setProfile] = useState({
        brandName: '',
        companyDescription: '',
        productCategories: [] as string[],
        website: '',
        socialMedia: { facebook: '', instagram: '', linkedin: '', twitter: '', youtube: '' },
        primaryContact: { firstName: '', lastName: '', email: '', mobile: '', designation: '' },
        secondaryContact: { firstName: '', lastName: '', email: '', mobile: '', designation: '' },
        billingContact: { firstName: '', lastName: '', email: '', mobile: '', designation: '' },
        accountsContact: { firstName: '', lastName: '', email: '', mobile: '', designation: '' },
        logo: '',
        brochure: '',
        productCatalogue: '',
        kycDocuments: { gstCertificate: '', panCard: '', registrationCertificate: '', authorizedSignatoryId: '' }
    });

    const [availableCategories, setAvailableCategories] = useState<string[]>([]);
    // Pre-fill from exhibitor data — re-initialize when registration changes
    useEffect(() => {
        if (data && initializedRef.current !== data._id) {
            initializedRef.current = data._id;
            setProfile({
                brandName:          data.brandName          || data.fasciaName || data.exhibitorName || '',
                companyDescription: data.companyDescription || '',
                productCategories:  data.productCategories  || [],
                website:            data.website            || '',
                socialMedia: {
                    facebook:  data.socialMedia?.facebook  || '',
                    instagram: data.socialMedia?.instagram || '',
                    linkedin:  data.socialMedia?.linkedin  || '',
                    twitter:   data.socialMedia?.twitter   || '',
                    youtube:   data.socialMedia?.youtube   || '',
                },
                primaryContact: {
                    firstName:   data.contact1?.firstName   || '',
                    lastName:    data.contact1?.lastName    || '',
                    email:       data.contact1?.email       || '',
                    mobile:      data.contact1?.mobile      || '',
                    designation: data.contact1?.designation || '',
                },
                secondaryContact: {
                    firstName:   data.contact2?.firstName   || '',
                    lastName:    data.contact2?.lastName    || '',
                    email:       data.contact2?.email       || '',
                    mobile:      data.contact2?.mobile      || '',
                    designation: data.contact2?.designation || '',
                },
                billingContact: {
                    firstName:   data.billingContact?.firstName   || '',
                    lastName:    data.billingContact?.lastName    || '',
                    email:       data.billingContact?.email       || '',
                    mobile:      data.billingContact?.mobile      || '',
                    designation: data.billingContact?.designation || '',
                },
                accountsContact: {
                    firstName:   data.accountsContact?.firstName   || '',
                    lastName:    data.accountsContact?.lastName    || '',
                    email:       data.accountsContact?.email       || '',
                    mobile:      data.accountsContact?.mobile      || '',
                    designation: data.accountsContact?.designation || '',
                },
                logo:             data.logo             || data.companyLogoUrl || '',
                brochure:         data.brochure         || '',
                productCatalogue: data.productCatalogue || '',
                kycDocuments: {
                    gstCertificate:          data.kycDocuments?.gstCertificate          || data.gstCertificateUrl || '',
                    panCard:                 data.kycDocuments?.panCard                 || data.panCardFrontUrl   || '',
                    registrationCertificate: data.kycDocuments?.registrationCertificate || '',
                    authorizedSignatoryId:   data.kycDocuments?.authorizedSignatoryId   || '',
                }
            });
        }
        fetchCategories();
    }, [data]);

    const fetchCategories = async () => {
        try {
            const token = localStorage.getItem('exhibitorToken');
            const res = await fetch(`${API_URL}/seller-portal/product-categories`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            const d = await res.json();
            if (d.success) setAvailableCategories(d.data);
        } catch { /* silent */ }
    };

    const handleFileUpload = async (field: string, file: File) => {
        setUploading(field);
        const formData = new FormData();
        formData.append('file', file);
        formData.append('field', field);
        try {
            const token = localStorage.getItem('exhibitorToken');
            const res = await fetch(`${API_URL}/seller-portal/upload-document`, {
                method: 'POST',
                headers: { Authorization: `Bearer ${token}` },
                body: formData
            });
            const d = await res.json();
            if (d.success) {
                toast.success('File uploaded successfully');
                if (field.startsWith('kyc.')) {
                    const kycField = field.split('.')[1];
                    setProfile(prev => ({ ...prev, kycDocuments: { ...prev.kycDocuments, [kycField]: d.fileUrl } }));
                } else {
                    setProfile(prev => ({ ...prev, [field]: d.fileUrl }));
                }
            } else {
                toast.error(d.message || 'Upload failed');
            }
        } catch { toast.error('Upload failed'); }
        finally { setUploading(null); }
    };

    const handleSave = async () => {
        setLoading(true);
        try {
            const token = localStorage.getItem('exhibitorToken');
            const res = await fetch(`${API_URL}/seller-portal/update-profile`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
                body: JSON.stringify(profile)
            });
            const d = await res.json();
            if (d.success) {
                toast.success('Profile updated successfully');
                // Update context data directly so UI reflects changes immediately
                // Also update the ref to the new data._id so form doesn't reset
                setData((prev: any) => {
                    const updated = { ...prev, ...d.data };
                    initializedRef.current = updated._id;
                    return updated;
                });
            }
            else toast.error(d.message || 'Update failed');
        } catch { toast.error('Failed to update profile'); }
        finally { setLoading(false); }
    };

    const toggleCategory = (cat: string) => {
        setProfile(prev => ({
            ...prev,
            productCategories: prev.productCategories.includes(cat)
                ? prev.productCategories.filter(c => c !== cat)
                : [...prev.productCategories, cat]
        }));
    };

    const getVerificationStatus = () => {
        const k = profile.kycDocuments;
        const hasAll = k.gstCertificate && k.panCard && k.registrationCertificate && k.authorizedSignatoryId;
        if (data?.kycStatus === 'approved') return { label: 'Verified', cls: 'bg-emerald-50 border-emerald-200 text-emerald-700', icon: CheckCircle2 };
        if (data?.kycStatus === 'rejected')  return { label: 'Rejected', cls: 'bg-red-50 border-red-200 text-red-700', icon: AlertCircle };
        if (hasAll)                           return { label: 'Under Review', cls: 'bg-blue-50 border-blue-200 text-blue-700', icon: Loader2 };
        return { label: 'Pending', cls: 'bg-amber-50 border-amber-200 text-amber-700', icon: AlertCircle };
    };

    const vs = getVerificationStatus();
    const VsIcon = vs.icon;

    const fixUrl = (url: string) => {
        if (!url) return '';
        if (url.startsWith('http')) return url;
        return `${SERVER_URL}${url.startsWith('/') ? '' : '/'}${url}`;
    };

    return (
        <div className="space-y-5 pb-12">
            <DashboardHero
                pageId="sl-profile"
                defaultTitle="Seller Profile"
                defaultSubtitle="Your business profile — pre-filled from your exhibitor registration"
                type="seller"
            />

            {/* ── KYC Status Banner ── */}
            <div className={`flex items-center gap-3 px-5 py-3.5 rounded-xl border-2 ${vs.cls}`}>
                <VsIcon size={18} className={vs.icon === Loader2 ? 'animate-spin' : ''} />
                <div>
                    <p className="text-xs font-black uppercase tracking-tight">KYC Status: {vs.label}</p>
                    <p className="text-[10px] font-medium mt-0.5 opacity-80">
                        {vs.label === 'Pending'      && 'Upload all 4 KYC documents to start verification'}
                        {vs.label === 'Under Review' && 'Documents submitted — our team is reviewing them'}
                        {vs.label === 'Verified'     && 'Your profile is fully verified and active'}
                        {vs.label === 'Rejected'     && 'Some documents were rejected — please re-upload'}
                    </p>
                </div>
            </div>

            {/* ── READ-ONLY: Exhibitor Registration Info ── */}
            <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
                <div className="bg-slate-800 px-5 py-3 flex items-center gap-2">
                    <Eye size={16} className="text-white/70" />
                    <h2 className="text-sm font-black uppercase tracking-tight text-white">Registration Details</h2>
                    <span className="ml-auto text-[9px] font-black bg-white/10 text-white/60 px-2 py-0.5 rounded-full uppercase">Read Only</span>
                </div>
                <div className="p-5">
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-4">
                        <InfoRow label="Company / Exhibitor Name" value={data?.exhibitorName} />
                        <InfoRow label="Fascia Name"              value={data?.fasciaName} />
                        <InfoRow label="Registration ID"          value={data?.registrationId} />
                        <InfoRow label="Type of Business"         value={data?.typeOfBusiness} />
                        <InfoRow label="Nature of Business"       value={data?.natureOfBusiness} />
                        <InfoRow label="Industry Sector"          value={data?.industrySector} />
                        <InfoRow label="Primary Category"         value={data?.primaryCategory} />
                        <InfoRow label="Sub Category"             value={data?.subCategory} />
                        <InfoRow label="GST No."                  value={data?.gstNo} />
                        <InfoRow label="PAN No."                  value={data?.panNo} />
                        <InfoRow label="Aadhaar No."              value={data?.aadhaarNo} />
                        <InfoRow label="Landline No."             value={data?.landlineNo} />
                        <InfoRow label="Address"                  value={data?.address} />
                        <InfoRow label="City"                     value={data?.city} />
                        <InfoRow label="State"                    value={data?.state} />
                        <InfoRow label="Country"                  value={data?.country} />
                        <InfoRow label="Pincode"                  value={data?.pincode} />
                        <InfoRow label="Stall No."                value={data?.participation?.stallFor || data?.participation?.stallNo} />
                        <InfoRow label="Stall Type"               value={data?.participation?.stallType} />
                        <InfoRow label="Stall Size"               value={data?.participation?.stallSize ? `${data.participation.stallSize} sqm` : undefined} />
                    </div>
                </div>
            </div>

            {/* ── EDITABLE: Brand & Company Info ── */}
            <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
                <div className="bg-[#23471d] px-5 py-3 flex items-center gap-2">
                    <Building2 size={16} className="text-white/80" />
                    <h2 className="text-sm font-black uppercase tracking-tight text-white">Brand & Company Profile</h2>
                </div>
                <div className="p-5 space-y-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div>
                            <label className={labelCls}>Brand Name</label>
                            <input type="text" value={profile.brandName}
                                onChange={e => setProfile(p => ({ ...p, brandName: e.target.value }))}
                                className={inputCls} placeholder="Your brand name" />
                        </div>
                        <div>
                            <label className={labelCls}>Website</label>
                            <div className="relative">
                                <Globe size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                                <input type="url" value={profile.website}
                                    onChange={e => setProfile(p => ({ ...p, website: e.target.value }))}
                                    className={`${inputCls} pl-9`} placeholder="https://example.com" />
                            </div>
                        </div>
                    </div>

                    <div>
                        <label className={labelCls}>Company Description</label>
                        <textarea rows={4} value={profile.companyDescription}
                            onChange={e => setProfile(p => ({ ...p, companyDescription: e.target.value }))}
                            className={inputCls} placeholder="Tell buyers about your company, products, and USPs..." />
                    </div>

                    {/* Product Categories */}
                    <div>
                        <label className={labelCls}>Product Categories</label>
                        <div className="flex flex-wrap gap-2">
                            {availableCategories.map(cat => (
                                <button key={cat} type="button" onClick={() => toggleCategory(cat)}
                                    className={`px-3 py-1.5 rounded-lg text-[10px] font-black uppercase transition-all border ${
                                        profile.productCategories.includes(cat)
                                            ? 'bg-[#23471d] text-white border-[#23471d]'
                                            : 'bg-white text-slate-600 border-slate-200 hover:border-slate-400'
                                    }`}>
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Social Media */}
                    <div>
                        <label className={`${labelCls} flex items-center gap-1.5`}>
                            <LinkIcon size={11} /> Social Media Links
                        </label>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                            {(Object.keys(profile.socialMedia) as Array<keyof typeof profile.socialMedia>).map(platform => (
                                <div key={platform}>
                                    <label className="text-[9px] font-black text-slate-400 uppercase mb-1 block capitalize">{platform}</label>
                                    <input type="url"
                                        value={profile.socialMedia[platform]}
                                        onChange={e => setProfile(p => ({ ...p, socialMedia: { ...p.socialMedia, [platform]: e.target.value } }))}
                                        className={inputCls} placeholder={`https://${platform}.com/...`} />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* File Uploads */}
                    <div>
                        <label className={labelCls}>Company Files</label>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            {[
                                { field: 'logo',             label: 'Company Logo',      icon: Camera,    accept: 'image/*' },
                                { field: 'brochure',         label: 'Company Brochure',  icon: FileText,  accept: '.pdf,.doc,.docx' },
                                { field: 'productCatalogue', label: 'Product Catalogue', icon: Briefcase, accept: '.pdf,.doc,.docx' }
                            ].map(item => {
                                const val = profile[item.field as keyof typeof profile] as string;
                                const isUploading = uploading === item.field;
                                return (
                                    <div key={item.field} className="border-2 border-dashed border-slate-200 rounded-xl p-4 text-center hover:border-[#23471d]/40 transition-colors">
                                        {val ? (
                                            <div className="space-y-2">
                                                {item.field === 'logo' ? (
                                                    <img loading="lazy" decoding="async" src={fixUrl(val)} alt="logo" className="w-16 h-16 object-contain mx-auto rounded-lg border border-slate-100" />
                                                ) : (
                                                    <div className="w-12 h-12 bg-emerald-50 rounded-lg flex items-center justify-center mx-auto">
                                                        <CheckCircle2 size={20} className="text-emerald-600" />
                                                    </div>
                                                )}
                                                <p className="text-[9px] font-black text-emerald-600 uppercase">Uploaded</p>
                                                <label className="cursor-pointer text-[9px] font-bold text-blue-600 hover:underline block">
                                                    <input type="file" accept={item.accept} className="hidden" disabled={isUploading}
                                                        onChange={e => e.target.files?.[0] && handleFileUpload(item.field, e.target.files[0])} />
                                                    {isUploading ? 'Uploading...' : 'Replace'}
                                                </label>
                                            </div>
                                        ) : (
                                            <label className="cursor-pointer block">
                                                <input type="file" accept={item.accept} className="hidden" disabled={isUploading}
                                                    onChange={e => e.target.files?.[0] && handleFileUpload(item.field, e.target.files[0])} />
                                                <item.icon size={22} className="text-slate-300 mx-auto mb-2" />
                                                <p className="text-[10px] font-black text-slate-500 uppercase mb-1">{item.label}</p>
                                                <span className="text-[10px] font-bold text-[#23471d]">
                                                    {isUploading ? 'Uploading...' : '+ Upload'}
                                                </span>
                                            </label>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>

            {/* ── EDITABLE: Contact Details ── */}
            <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
                <div className="bg-[#23471d] px-5 py-3 flex items-center gap-2">
                    <Users size={16} className="text-white/80" />
                    <h2 className="text-sm font-black uppercase tracking-tight text-white">Contact Details</h2>
                    <span className="ml-auto text-[9px] font-black bg-white/10 text-white/60 px-2 py-0.5 rounded-full uppercase">Pre-filled from registration</span>
                </div>
                <div className="p-5 space-y-4">
                    {([
                        { key: 'primaryContact',   label: 'Primary Contact',   required: true  },
                        { key: 'secondaryContact', label: 'Secondary Contact', required: false },
                        { key: 'billingContact',   label: 'Billing Contact',   required: false },
                        { key: 'accountsContact',  label: 'Accounts Contact',  required: false },
                    ] as const).map(contact => {
                        const c = profile[contact.key];
                        return (
                            <div key={contact.key} className="border border-slate-100 rounded-xl p-4 bg-slate-50/40">
                                <h3 className="text-[10px] font-black text-slate-600 uppercase tracking-widest mb-3 flex items-center gap-1.5">
                                    <User size={12} className="text-[#23471d]" />
                                    {contact.label}
                                    {contact.required && <span className="text-red-500">*</span>}
                                </h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                                    <input type="text" placeholder="First Name" value={c.firstName}
                                        onChange={e => setProfile(p => ({ ...p, [contact.key]: { ...p[contact.key], firstName: e.target.value } }))}
                                        className={inputCls} />
                                    <input type="text" placeholder="Last Name" value={c.lastName}
                                        onChange={e => setProfile(p => ({ ...p, [contact.key]: { ...p[contact.key], lastName: e.target.value } }))}
                                        className={inputCls} />
                                    <input type="email" placeholder="Email" value={c.email}
                                        onChange={e => setProfile(p => ({ ...p, [contact.key]: { ...p[contact.key], email: e.target.value } }))}
                                        className={inputCls} />
                                    <input type="tel" placeholder="Mobile" value={c.mobile}
                                        onChange={e => setProfile(p => ({ ...p, [contact.key]: { ...p[contact.key], mobile: e.target.value } }))}
                                        className={inputCls} />
                                    <input type="text" placeholder="Designation" value={c.designation}
                                        onChange={e => setProfile(p => ({ ...p, [contact.key]: { ...p[contact.key], designation: e.target.value } }))}
                                        className={inputCls} />
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* ── EDITABLE: KYC Documents ── */}
            <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
                <div className="bg-[#23471d] px-5 py-3 flex items-center gap-2">
                    <Shield size={16} className="text-white/80" />
                    <h2 className="text-sm font-black uppercase tracking-tight text-white">KYC Documents</h2>
                </div>
                <div className="p-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {([
                            { field: 'gstCertificate',          label: 'GST Certificate' },
                            { field: 'panCard',                  label: 'PAN Card' },
                            { field: 'registrationCertificate',  label: 'Registration Certificate' },
                            { field: 'authorizedSignatoryId',    label: 'Authorized Signatory ID' },
                        ] as const).map(doc => {
                            const val = profile.kycDocuments[doc.field];
                            const fieldKey = `kyc.${doc.field}`;
                            const isUploading = uploading === fieldKey;
                            return (
                                <div key={doc.field} className="border-2 border-dashed border-slate-200 rounded-xl p-4 hover:border-[#23471d]/40 transition-colors">
                                    <p className="text-[10px] font-black text-slate-600 uppercase mb-3 flex items-center gap-1.5">
                                        <FileText size={11} className="text-[#23471d]" />
                                        {doc.label} <span className="text-red-500">*</span>
                                    </p>
                                    {val ? (
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                <div className="w-8 h-8 bg-emerald-50 rounded-lg flex items-center justify-center">
                                                    <CheckCircle2 size={14} className="text-emerald-600" />
                                                </div>
                                                <div>
                                                    <p className="text-[9px] font-black text-emerald-600 uppercase">Uploaded</p>
                                                    <a href={fixUrl(val)} target="_blank" rel="noreferrer"
                                                        className="text-[9px] font-bold text-blue-500 hover:underline">View</a>
                                                </div>
                                            </div>
                                            <label className="cursor-pointer text-[9px] font-bold text-slate-500 hover:text-[#23471d] transition-colors">
                                                <input type="file" accept=".pdf,.jpg,.jpeg,.png" className="hidden" disabled={isUploading}
                                                    onChange={e => e.target.files?.[0] && handleFileUpload(fieldKey, e.target.files[0])} />
                                                {isUploading ? 'Uploading...' : 'Re-upload'}
                                            </label>
                                        </div>
                                    ) : (
                                        <label className="cursor-pointer flex flex-col items-center gap-1.5 py-2">
                                            <input type="file" accept=".pdf,.jpg,.jpeg,.png" className="hidden" disabled={isUploading}
                                                onChange={e => e.target.files?.[0] && handleFileUpload(fieldKey, e.target.files[0])} />
                                            <Upload size={18} className="text-slate-300" />
                                            <span className="text-[10px] font-bold text-[#23471d]">
                                                {isUploading ? 'Uploading...' : 'Upload Document'}
                                            </span>
                                            <span className="text-[9px] text-slate-400">PDF, JPG, PNG</span>
                                        </label>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* ── Save Button ── */}
            <div className="flex items-center justify-between bg-white border border-slate-200 rounded-xl px-5 py-4 shadow-sm">
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
                    <Info size={12} />
                    Registration details (top section) are read-only — contact admin to update
                </p>
                <button onClick={handleSave} disabled={loading}
                    className="flex items-center gap-2 px-6 py-2.5 bg-[#23471d] text-white font-black text-[11px] uppercase tracking-widest rounded-lg hover:bg-[#1a3516] transition-all shadow-md disabled:opacity-50">
                    {loading
                        ? <><Loader2 size={14} className="animate-spin" /> Saving...</>
                        : <><Save size={14} /> Save Profile</>
                    }
                </button>
            </div>
        </div>
    );
}
