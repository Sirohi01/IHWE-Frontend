import React, { useState, useEffect } from 'react';
import { useExhibitorCtx } from '@/context/ExhibitorContext';
import { 
    Building2, User, Mail, Phone, Globe, 
    Upload, FileText, CheckCircle2, AlertCircle,
    Save, Loader2, Camera, Link as LinkIcon,
    Users, CreditCard, Briefcase, Shield
} from 'lucide-react';
import { API_URL, SERVER_URL } from '@/lib/api';
import { toast } from 'sonner';
import DashboardHero from '@/components/dashboard/DashboardHero';

export default function SellerProfilePage() {
    const { data, fetchDashboard } = useExhibitorCtx();
    const [loading, setLoading] = useState(false);
    const [uploading, setUploading] = useState<string | null>(null);
    
    const [profile, setProfile] = useState({
        // Company Profile
        companyName: '',
        brandName: '',
        companyDescription: '',
        productCategories: [] as string[],
        website: '',
        socialMedia: {
            facebook: '',
            instagram: '',
            linkedin: '',
            twitter: '',
            youtube: ''
        },
        
        // Contact Details
        primaryContact: {
            firstName: '',
            lastName: '',
            email: '',
            mobile: '',
            designation: ''
        },
        secondaryContact: {
            firstName: '',
            lastName: '',
            email: '',
            mobile: '',
            designation: ''
        },
        billingContact: {
            firstName: '',
            lastName: '',
            email: '',
            mobile: '',
            designation: ''
        },
        accountsContact: {
            firstName: '',
            lastName: '',
            email: '',
            mobile: '',
            designation: ''
        },
        
        // Documents
        logo: '',
        brochure: '',
        productCatalogue: '',
        
        // KYC Documents
        kycDocuments: {
            gstCertificate: '',
            panCard: '',
            registrationCertificate: '',
            authorizedSignatoryId: ''
        }
    });

    const [availableCategories, setAvailableCategories] = useState<string[]>([]);

    useEffect(() => {
        if (data) {
            setProfile({
                companyName: data.companyName || '',
                brandName: data.brandName || '',
                companyDescription: data.companyDescription || '',
                productCategories: data.productCategories || [],
                website: data.website || '',
                socialMedia: data.socialMedia || {
                    facebook: '',
                    instagram: '',
                    linkedin: '',
                    twitter: '',
                    youtube: ''
                },
                primaryContact: data.contact1 || {
                    firstName: '',
                    lastName: '',
                    email: '',
                    mobile: '',
                    designation: ''
                },
                secondaryContact: data.contact2 || {
                    firstName: '',
                    lastName: '',
                    email: '',
                    mobile: '',
                    designation: ''
                },
                billingContact: data.billingContact || {
                    firstName: '',
                    lastName: '',
                    email: '',
                    mobile: '',
                    designation: ''
                },
                accountsContact: data.accountsContact || {
                    firstName: '',
                    lastName: '',
                    email: '',
                    mobile: '',
                    designation: ''
                },
                logo: data.logo || '',
                brochure: data.brochure || '',
                productCatalogue: data.productCatalogue || '',
                kycDocuments: data.kycDocuments || {
                    gstCertificate: '',
                    panCard: '',
                    registrationCertificate: '',
                    authorizedSignatoryId: ''
                }
            });
        }
        
        // Fetch available categories
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
        } catch (err) {
            console.error('Failed to fetch categories');
        }
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
                
                // Update profile state
                if (field.startsWith('kyc.')) {
                    const kycField = field.split('.')[1];
                    setProfile(prev => ({
                        ...prev,
                        kycDocuments: {
                            ...prev.kycDocuments,
                            [kycField]: d.fileUrl
                        }
                    }));
                } else {
                    setProfile(prev => ({ ...prev, [field]: d.fileUrl }));
                }
            } else {
                toast.error(d.message || 'Upload failed');
            }
        } catch (err) {
            toast.error('Upload failed');
        } finally {
            setUploading(null);
        }
    };

    const handleSave = async () => {
        setLoading(true);
        try {
            const token = localStorage.getItem('exhibitorToken');
            const res = await fetch(`${API_URL}/seller-portal/update-profile`, {
                method: 'PUT',
                headers: { 
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}` 
                },
                body: JSON.stringify(profile)
            });
            const d = await res.json();
            
            if (d.success) {
                toast.success('Profile updated successfully');
                fetchDashboard();
            } else {
                toast.error(d.message || 'Update failed');
            }
        } catch (err) {
            toast.error('Failed to update profile');
        } finally {
            setLoading(false);
        }
    };

    const toggleCategory = (category: string) => {
        setProfile(prev => ({
            ...prev,
            productCategories: prev.productCategories.includes(category)
                ? prev.productCategories.filter(c => c !== category)
                : [...prev.productCategories, category]
        }));
    };

    const getVerificationStatus = () => {
        const kycDocs = profile.kycDocuments;
        const hasAllDocs = kycDocs.gstCertificate && kycDocs.panCard && 
                          kycDocs.registrationCertificate && kycDocs.authorizedSignatoryId;
        
        if (data?.kycStatus === 'approved') return { label: 'Approved', color: 'text-green-600 bg-green-50', icon: CheckCircle2 };
        if (data?.kycStatus === 'rejected') return { label: 'Rejected', color: 'text-red-600 bg-red-50', icon: AlertCircle };
        if (hasAllDocs) return { label: 'Under Review', color: 'text-blue-600 bg-blue-50', icon: Loader2 };
        return { label: 'Pending', color: 'text-orange-600 bg-orange-50', icon: AlertCircle };
    };

    const status = getVerificationStatus();
    const StatusIcon = status.icon;

    return (
        <div className="space-y-6 pb-12 font-inter">
            <DashboardHero 
                pageId="sl-profile" 
                defaultTitle="Seller Profile Management" 
                defaultSubtitle="Complete your business profile to unlock all seller features"
                type="seller" 
            />

            {/* Verification Status Banner */}
            <div className={`p-4 rounded-lg border-2 flex items-center gap-3 ${status.color}`}>
                <StatusIcon size={20} className={status.icon === Loader2 ? 'animate-spin' : ''} />
                <div>
                    <p className="text-sm font-black uppercase tracking-tight">KYC Verification Status: {status.label}</p>
                    <p className="text-xs font-medium mt-0.5">
                        {status.label === 'Pending' && 'Upload all required documents to start verification'}
                        {status.label === 'Under Review' && 'Your documents are being reviewed by our team'}
                        {status.label === 'Approved' && 'Your profile is verified and active'}
                        {status.label === 'Rejected' && 'Please re-upload correct documents'}
                    </p>
                </div>
            </div>

            {/* Company Profile */}
            <div className="bg-white border border-slate-200 rounded-lg overflow-hidden">
                <div className="bg-slate-50 px-6 py-4 border-b border-slate-200 flex items-center gap-3">
                    <Building2 size={20} className="text-[#23471d]" />
                    <h2 className="text-sm font-black uppercase tracking-tight text-slate-800">Company Profile</h2>
                </div>
                <div className="p-6 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="text-[10px] font-black text-slate-600 uppercase tracking-widest mb-2 block">Company Name *</label>
                            <input 
                                type="text"
                                value={profile.companyName}
                                onChange={(e) => setProfile(prev => ({ ...prev, companyName: e.target.value }))}
                                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-[#23471d]"
                            />
                        </div>
                        <div>
                            <label className="text-[10px] font-black text-slate-600 uppercase tracking-widest mb-2 block">Brand Name</label>
                            <input 
                                type="text"
                                value={profile.brandName}
                                onChange={(e) => setProfile(prev => ({ ...prev, brandName: e.target.value }))}
                                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-[#23471d]"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="text-[10px] font-black text-slate-600 uppercase tracking-widest mb-2 block">Company Description</label>
                        <textarea 
                            rows={4}
                            value={profile.companyDescription}
                            onChange={(e) => setProfile(prev => ({ ...prev, companyDescription: e.target.value }))}
                            className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-[#23471d]"
                            placeholder="Tell buyers about your company..."
                        />
                    </div>

                    <div>
                        <label className="text-[10px] font-black text-slate-600 uppercase tracking-widest mb-2 block">Product Categories</label>
                        <div className="flex flex-wrap gap-2">
                            {availableCategories.map(cat => (
                                <button
                                    key={cat}
                                    onClick={() => toggleCategory(cat)}
                                    className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase transition-all ${
                                        profile.productCategories.includes(cat)
                                            ? 'bg-[#23471d] text-white'
                                            : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                                    }`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="text-[10px] font-black text-slate-600 uppercase tracking-widest mb-2 block">Website</label>
                            <input 
                                type="url"
                                value={profile.website}
                                onChange={(e) => setProfile(prev => ({ ...prev, website: e.target.value }))}
                                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-[#23471d]"
                                placeholder="https://example.com"
                            />
                        </div>
                    </div>

                    {/* Social Media Links */}
                    <div>
                        <label className="text-[10px] font-black text-slate-600 uppercase tracking-widest mb-3 block flex items-center gap-2">
                            <LinkIcon size={12} /> Social Media Links
                        </label>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {Object.keys(profile.socialMedia).map(platform => (
                                <div key={platform}>
                                    <label className="text-[9px] font-bold text-slate-500 uppercase mb-1 block">{platform}</label>
                                    <input 
                                        type="url"
                                        value={profile.socialMedia[platform as keyof typeof profile.socialMedia]}
                                        onChange={(e) => setProfile(prev => ({
                                            ...prev,
                                            socialMedia: { ...prev.socialMedia, [platform]: e.target.value }
                                        }))}
                                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:outline-none focus:border-[#23471d]"
                                        placeholder={`https://${platform}.com/...`}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* File Uploads */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {[
                            { field: 'logo', label: 'Company Logo', icon: Camera },
                            { field: 'brochure', label: 'Company Brochure', icon: FileText },
                            { field: 'productCatalogue', label: 'Product Catalogue', icon: Briefcase }
                        ].map(item => (
                            <div key={item.field} className="border-2 border-dashed border-slate-200 rounded-lg p-4 text-center">
                                <item.icon size={24} className="text-slate-400 mx-auto mb-2" />
                                <p className="text-[10px] font-black text-slate-600 uppercase mb-2">{item.label}</p>
                                {profile[item.field as keyof typeof profile] ? (
                                    <div className="space-y-2">
                                        <CheckCircle2 size={16} className="text-green-600 mx-auto" />
                                        <p className="text-[9px] text-green-600 font-bold">Uploaded</p>
                                    </div>
                                ) : (
                                    <label className="cursor-pointer">
                                        <input 
                                            type="file"
                                            accept={item.field === 'logo' ? 'image/*' : '.pdf,.doc,.docx'}
                                            onChange={(e) => e.target.files?.[0] && handleFileUpload(item.field, e.target.files[0])}
                                            className="hidden"
                                            disabled={uploading === item.field}
                                        />
                                        <span className="text-[10px] font-bold text-[#23471d] hover:underline">
                                            {uploading === item.field ? 'Uploading...' : 'Choose File'}
                                        </span>
                                    </label>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Contact Details */}
            <div className="bg-white border border-slate-200 rounded-lg overflow-hidden">
                <div className="bg-slate-50 px-6 py-4 border-b border-slate-200 flex items-center gap-3">
                    <Users size={20} className="text-[#23471d]" />
                    <h2 className="text-sm font-black uppercase tracking-tight text-slate-800">Contact Details</h2>
                </div>
                <div className="p-6 space-y-6">
                    {[
                        { key: 'primaryContact', label: 'Primary Contact Person', required: true },
                        { key: 'secondaryContact', label: 'Secondary Contact Person', required: false },
                        { key: 'billingContact', label: 'Billing Contact', required: false },
                        { key: 'accountsContact', label: 'Accounts Contact', required: false }
                    ].map(contact => (
                        <div key={contact.key} className="border border-slate-100 rounded-lg p-4">
                            <h3 className="text-[10px] font-black text-slate-700 uppercase tracking-widest mb-4">
                                {contact.label} {contact.required && <span className="text-red-500">*</span>}
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <input 
                                    type="text"
                                    placeholder="First Name"
                                    value={profile[contact.key as keyof typeof profile].firstName}
                                    onChange={(e) => setProfile(prev => ({
                                        ...prev,
                                        [contact.key]: { ...prev[contact.key as keyof typeof profile], firstName: e.target.value }
                                    }))}
                                    className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-[#23471d]"
                                />
                                <input 
                                    type="text"
                                    placeholder="Last Name"
                                    value={profile[contact.key as keyof typeof profile].lastName}
                                    onChange={(e) => setProfile(prev => ({
                                        ...prev,
                                        [contact.key]: { ...prev[contact.key as keyof typeof profile], lastName: e.target.value }
                                    }))}
                                    className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-[#23471d]"
                                />
                                <input 
                                    type="email"
                                    placeholder="Email"
                                    value={profile[contact.key as keyof typeof profile].email}
                                    onChange={(e) => setProfile(prev => ({
                                        ...prev,
                                        [contact.key]: { ...prev[contact.key as keyof typeof profile], email: e.target.value }
                                    }))}
                                    className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-[#23471d]"
                                />
                                <input 
                                    type="tel"
                                    placeholder="Mobile"
                                    value={profile[contact.key as keyof typeof profile].mobile}
                                    onChange={(e) => setProfile(prev => ({
                                        ...prev,
                                        [contact.key]: { ...prev[contact.key as keyof typeof profile], mobile: e.target.value }
                                    }))}
                                    className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-[#23471d]"
                                />
                                <input 
                                    type="text"
                                    placeholder="Designation"
                                    value={profile[contact.key as keyof typeof profile].designation}
                                    onChange={(e) => setProfile(prev => ({
                                        ...prev,
                                        [contact.key]: { ...prev[contact.key as keyof typeof profile], designation: e.target.value }
                                    }))}
                                    className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-[#23471d]"
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* KYC Documents */}
            <div className="bg-white border border-slate-200 rounded-lg overflow-hidden">
                <div className="bg-slate-50 px-6 py-4 border-b border-slate-200 flex items-center gap-3">
                    <Shield size={20} className="text-[#23471d]" />
                    <h2 className="text-sm font-black uppercase tracking-tight text-slate-800">KYC Documents</h2>
                </div>
                <div className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {[
                            { field: 'gstCertificate', label: 'GST Certificate' },
                            { field: 'panCard', label: 'PAN Card' },
                            { field: 'registrationCertificate', label: 'Registration Certificate' },
                            { field: 'authorizedSignatoryId', label: 'Authorized Signatory ID' }
                        ].map(doc => (
                            <div key={doc.field} className="border-2 border-dashed border-slate-200 rounded-lg p-4">
                                <p className="text-[10px] font-black text-slate-600 uppercase mb-3">{doc.label} *</p>
                                {profile.kycDocuments[doc.field as keyof typeof profile.kycDocuments] ? (
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <CheckCircle2 size={16} className="text-green-600" />
                                            <span className="text-[9px] text-green-600 font-bold">Uploaded</span>
                                        </div>
                                        <label className="cursor-pointer text-[9px] font-bold text-blue-600 hover:underline">
                                            <input 
                                                type="file"
                                                accept=".pdf,.jpg,.jpeg,.png"
                                                onChange={(e) => e.target.files?.[0] && handleFileUpload(`kyc.${doc.field}`, e.target.files[0])}
                                                className="hidden"
                                                disabled={uploading === `kyc.${doc.field}`}
                                            />
                                            {uploading === `kyc.${doc.field}` ? 'Uploading...' : 'Re-upload'}
                                        </label>
                                    </div>
                                ) : (
                                    <label className="cursor-pointer block text-center">
                                        <input 
                                            type="file"
                                            accept=".pdf,.jpg,.jpeg,.png"
                                            onChange={(e) => e.target.files?.[0] && handleFileUpload(`kyc.${doc.field}`, e.target.files[0])}
                                            className="hidden"
                                            disabled={uploading === `kyc.${doc.field}`}
                                        />
                                        <Upload size={20} className="text-slate-400 mx-auto mb-2" />
                                        <span className="text-[10px] font-bold text-[#23471d] hover:underline">
                                            {uploading === `kyc.${doc.field}` ? 'Uploading...' : 'Upload Document'}
                                        </span>
                                    </label>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Save Button */}
            <div className="flex justify-end">
                <button
                    onClick={handleSave}
                    disabled={loading}
                    className="px-8 py-3 bg-[#23471d] text-white font-black text-[11px] uppercase tracking-widest rounded-lg hover:bg-[#1a3516] transition-all shadow-lg flex items-center gap-2 disabled:opacity-50"
                >
                    {loading ? (
                        <><Loader2 size={14} className="animate-spin" /> Saving...</>
                    ) : (
                        <><Save size={14} /> Save Profile</>
                    )}
                </button>
            </div>
        </div>
    );
}
