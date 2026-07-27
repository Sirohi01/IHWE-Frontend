import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Save, Upload, FileText, Edit2, Check, XCircle, AlertCircle, Lock, X, Building2, User, MapPin, Briefcase, Mail, Phone, Globe, CreditCard } from 'lucide-react';
import { API_URL, SERVER_URL } from '@/lib/api';
import { toast } from 'sonner';

interface ProfileProps {
    data: any;
    setData: (data: any) => void;
}

const inputCls = (isEditable: boolean) =>
    `h-10 text-[13px] border rounded-lg px-4 w-full outline-none transition-all duration-200 ${isEditable
        ? 'border-slate-300 focus:border-[#23471d] focus:ring-2 focus:ring-[#23471d]/20 bg-white shadow-sm'
        : 'border-slate-200 bg-slate-50 text-slate-500 cursor-not-allowed'
    }`;

function Section({ title, icon: Icon, children }: { title: string; icon?: any; children: React.ReactNode }) {
    return (
        <div className="mb-8 last:mb-0">
            <div className="flex items-center gap-3 mb-4 pb-2 border-b border-slate-200">
                {Icon && <Icon size={18} className="text-[#23471d]" />}
                <div className="w-1 h-5 bg-[#23471d] rounded-full" />
                <span className="text-[13px] font-bold text-[#23471d] uppercase tracking-wider">
                    {title}
                </span>
            </div>
            <div className="pl-1">
                {children}
            </div>
        </div>
    );
}

function Field({ label, value, isEditing, onChange, placeholder, type = "text", required = false }: { label: string, value: any, isEditing: boolean, onChange: (v: string) => void, placeholder?: string, type?: string, required?: boolean }) {
    return (
        <div className="flex flex-col gap-1.5">
            <label className="text-[11px] font-bold text-slate-600 uppercase tracking-wider flex items-center gap-1">
                {label}
                {required && <span className="text-red-500 text-[10px]">*</span>}
            </label>
            {isEditing ? (
                <input
                    type={type}
                    className={inputCls(true)}
                    value={value || ''}
                    onChange={e => onChange(e.target.value)}
                    placeholder={placeholder}
                />
            ) : (
                <div className="px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-[13px] text-slate-700 min-h-[42px] flex items-center">
                    {value || <span className="text-slate-400">—</span>}
                </div>
            )}
        </div>
    );
}

function ReadOnlyField({ label, value }: { label: string, value: any }) {
    return (
        <div className="flex flex-col gap-1.5">
            <label className="text-[11px] font-bold text-slate-600 uppercase tracking-wider">{label}</label>
            <div className="px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-[13px] text-slate-700 min-h-[42px] flex items-center">
                {value || <span className="text-slate-400">—</span>}
            </div>
        </div>
    );
}

export default function BuyerProfile({ data, setData }: ProfileProps) {
    const [saving, setSaving] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [form, setForm] = useState({ ...data });

    useEffect(() => {
        setForm({ ...data });
    }, [data]);

    const handleSave = async () => {
        setSaving(true);
        try {
            const token = localStorage.getItem('buyerToken');
            const res = await fetch(`${API_URL}/buyer-auth/update-profile?id=${data._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(form),
            });

            const result = await res.json();
            if (result.success) {
                toast.success('Profile updated successfully');
                setData(result.data);
                setIsEditing(false);
            } else {
                toast.error(result.message || 'Update failed');
            }
        } catch (error) {
            toast.error('Error updating profile');
        } finally {
            setSaving(false);
        }
    };

    const updateField = (f: string, v: any) => setForm(p => ({ ...p, [f]: v }));

    return (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-7xl mx-auto">
            {/* Header Card */}
            <div className="bg-gradient-to-r from-[#1a3516] to-[#23471d] rounded-xl shadow-lg mb-6 overflow-hidden">
                <div className="px-6 py-5 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div className="text-white">
                        <div className="flex items-center gap-2 mb-1">
                            <Building2 size={20} className="text-[#8bc34a]" />
                            <h1 className="text-[18px] font-black uppercase tracking-widest">Buyer Profile</h1>
                        </div>
                        <p className="text-[11px] text-white/70 font-bold uppercase tracking-wider">
                            Registration ID: <span className="text-white">{data.registrationId || '—'}</span>
                        </p>
                    </div>
                    <div className="flex gap-3">
                        {!isEditing ? (
                            <button
                                onClick={() => setIsEditing(true)}
                                className="flex items-center gap-2 px-5 py-2.5 bg-white text-[#23471d] text-[11px] font-bold uppercase rounded-lg hover:bg-slate-100 transition-all duration-200 shadow-md"
                            >
                                <Edit2 size={14} /> Edit Profile
                            </button>
                        ) : (
                            <>
                                <button
                                    onClick={() => { setIsEditing(false); setForm({ ...data }); }}
                                    className="flex items-center gap-2 px-5 py-2.5 bg-slate-600 text-white text-[11px] font-bold uppercase rounded-lg hover:bg-slate-700 transition-all duration-200"
                                >
                                    <X size={14} /> Cancel
                                </button>
                                <button
                                    onClick={handleSave}
                                    disabled={saving}
                                    className="flex items-center gap-2 px-5 py-2.5 bg-[#8bc34a] text-[#1a3516] text-[11px] font-bold uppercase rounded-lg hover:bg-[#9ed15c] transition-all duration-200 disabled:opacity-50 shadow-md"
                                >
                                    <Save size={14} /> {saving ? 'Saving...' : 'Save Changes'}
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </div>

            {/* Profile Content */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="p-6 space-y-8">
                    {/* Business Information */}
                    <Section title="Business Information" icon={Building2}>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                            <Field
                                label="Company/Firm Name"
                                value={form.companyName || form.companyFirmName}
                                isEditing={isEditing}
                                onChange={v => updateField('companyName', v)}
                                placeholder="Enter company name"
                                required
                            />
                            <Field
                                label="Business Type"
                                value={form.businessType}
                                isEditing={isEditing}
                                onChange={v => updateField('businessType', v)}
                                placeholder="e.g., Manufacturer, Distributor"
                            />
                            <Field
                                label="Year Established"
                                value={form.yearOfEstablishment}
                                isEditing={isEditing}
                                onChange={v => updateField('yearOfEstablishment', v)}
                                placeholder="YYYY"
                            />
                            <Field
                                label="GST Number"
                                value={form.gstNumber || form.gstNo}
                                isEditing={isEditing}
                                onChange={v => updateField('gstNumber', v)}
                                placeholder="e.g., 09AAFCN9238F1Z6"
                            />
                            <Field
                                label="PAN Number"
                                value={form.panNumber || form.panNo}
                                isEditing={isEditing}
                                onChange={v => updateField('panNumber', v)}
                                placeholder="e.g., AAAAA1234A"
                            />
                            <Field
                                label="Website"
                                value={form.website}
                                isEditing={isEditing}
                                onChange={v => updateField('website', v)}
                                placeholder="https://example.com"
                                type="url"
                            />
                        </div>
                    </Section>

                    {/* Contact Information */}
                    <Section title="Contact Information" icon={User}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:col-span-2">
                                <Field
                                    label="Representative Name"
                                    value={form.fullName || form.nameOfRepresentative || form.representativeName}
                                    isEditing={isEditing}
                                    onChange={v => updateField('nameOfRepresentative', v)}
                                    placeholder="Full name"
                                    required
                                />
                                <Field
                                    label="Designation"
                                    value={form.designation}
                                    isEditing={isEditing}
                                    onChange={v => updateField('designation', v)}
                                    placeholder="e.g., CEO, Manager"
                                />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:col-span-2">
                                <Field
                                    label="Mobile Number"
                                    value={form.mobileNumber || form.phoneNumber}
                                    isEditing={isEditing}
                                    onChange={v => updateField('mobileNumber', v)}
                                    placeholder="10-digit mobile number"
                                    type="tel"
                                    required
                                />
                                <Field
                                    label="Alternate Number"
                                    value={form.alternateNumber}
                                    isEditing={isEditing}
                                    onChange={v => updateField('alternateNumber', v)}
                                    placeholder="Alternate contact number"
                                    type="tel"
                                />
                            </div>
                            <Field
                                label="Email Address"
                                value={form.emailAddress || form.email}
                                isEditing={isEditing}
                                onChange={v => updateField('emailAddress', v)}
                                placeholder="email@example.com"
                                type="email"
                                required
                            />
                        </div>
                    </Section>

                    {/* Address Details */}
                    <Section title="Address Details" icon={MapPin}>
                        <div className="grid grid-cols-1 gap-5">
                            <Field
                                label="Registered Address"
                                value={form.registeredAddress || form.address}
                                isEditing={isEditing}
                                onChange={v => updateField('registeredAddress', v)}
                                placeholder="Street address, building name, etc."
                            />
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                                <Field
                                    label="City"
                                    value={form.city}
                                    isEditing={isEditing}
                                    onChange={v => updateField('city', v)}
                                    placeholder="City name"
                                />
                                <Field
                                    label="State / Province"
                                    value={form.stateProvince || form.state}
                                    isEditing={isEditing}
                                    onChange={v => updateField('stateProvince', v)}
                                    placeholder="State name"
                                />
                                <Field
                                    label="Pincode / ZIP"
                                    value={form.pinCode || form.pincode}
                                    isEditing={isEditing}
                                    onChange={v => updateField('pinCode', v)}
                                    placeholder="Postal code"
                                />
                                <Field
                                    label="Country"
                                    value={form.country}
                                    isEditing={isEditing}
                                    onChange={v => updateField('country', v)}
                                    placeholder="Country name"
                                />
                            </div>
                        </div>
                    </Section>

                    {/* Registration Details - Read Only */}
                    <Section title="Registration Details" icon={CreditCard}>
                        <div className="bg-slate-50 rounded-lg p-5 border border-slate-200">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                                <ReadOnlyField label="Registration Category" value={data.registrationCategory} />
                                <ReadOnlyField label="Registration Fee" value={data.registrationFee ? `₹ ${data.registrationFee.toLocaleString()}` : '—'} />
                                <ReadOnlyField label="Payment Status" value={data.paymentStatus} />
                                <ReadOnlyField label="Payment Mode" value={data.paymentMode} />
                                <ReadOnlyField label="Transaction ID" value={data.transactionId || data.paymentId} />
                                <ReadOnlyField label="Registration Date" value={data.createdAt ? new Date(data.createdAt).toLocaleDateString() : '—'} />
                            </div>
                        </div>
                    </Section>
                </div>
            </div>
        </motion.div>
    );
}