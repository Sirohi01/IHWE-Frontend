import { useState } from 'react';
import { motion } from 'framer-motion';
import { Building2, User, Mail, Phone, MapPin, Globe, Save, Pencil, X } from 'lucide-react';
import { API_URL } from '@/lib/api';
import { toast } from 'sonner';

interface ProfileProps { data: any; }

const LC = "bg-[#fafafa] p-3 text-[11px] font-bold text-slate-600 uppercase tracking-tighter border-r border-slate-200 flex items-center min-w-[140px]";
const VC = "bg-white p-3 text-[12px] font-semibold text-slate-900 border-r border-slate-200 flex items-center break-all";

function Row2({ l1, v1, l2, v2 }: any) {
    return (
        <div className="grid grid-cols-2 md:grid-cols-4 border-b border-slate-200 last:border-b-0">
            <div className={LC}>{l1}</div>
            <div className={`${VC} col-span-1`}>{v1 || '—'}</div>
            <div className={`${LC} border-t md:border-t-0`}>{l2}</div>
            <div className={`${VC} col-span-1 border-r-0 border-t md:border-t-0`}>{v2 || '—'}</div>
        </div>
    );
}
function Row1({ label, value }: any) {
    return (
        <div className="grid grid-cols-2 md:grid-cols-4 border-b border-slate-200 last:border-b-0">
            <div className={LC}>{label}</div>
            <div className={`${VC} col-span-1 md:col-span-3 border-r-0`}>{value || '—'}</div>
        </div>
    );
}
function Section({ title, children }: any) {
    return (
        <div className="mb-6">
            <div className="flex items-center gap-2 mb-2 pb-1 border-b border-slate-100">
                <div className="w-1.5 h-4 bg-[#23471d] rounded-full" />
                <span className="font-extrabold text-[12px] text-[#23471d] uppercase tracking-wider">{title}</span>
            </div>
            <div className="border border-slate-300 rounded-[2px] shadow-sm bg-white overflow-hidden">{children}</div>
        </div>
    );
}

const inputCls = "rounded-[2px] border border-slate-400 h-8 text-[12px] bg-white text-slate-900 font-medium outline-none px-3 w-full focus:border-[#23471d]";

export default function ExhibitorProfile({ data }: ProfileProps) {
    const [editing, setEditing] = useState(false);
    const [saving, setSaving] = useState(false);
    const isDomestic = data.participation?.currency === 'INR';

    const [form, setForm] = useState({
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
        contact1: {
            title: data.contact1?.title || '',
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

    const handleSave = async () => {
        setSaving(true);
        try {
            const token = localStorage.getItem('exhibitorToken');
            const res = await fetch(`${API_URL}/exhibitor-auth/update-profile`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
                body: JSON.stringify(form),
            });
            const result = await res.json();
            if (result.success) {
                toast.success('Profile updated successfully');
                setEditing(false);
                // update local data
                Object.assign(data, form);
            } else {
                toast.error(result.message || 'Update failed');
            }
        } catch { toast.error('Failed to update profile'); }
        finally { setSaving(false); }
    };

    const inp = (field: string, val: string) => setForm(p => ({ ...p, [field]: val }));
    const inpC1 = (field: string, val: string) => setForm(p => ({ ...p, contact1: { ...p.contact1, [field]: val } }));
    const inpC2 = (field: string, val: string) => setForm(p => ({ ...p, contact2: { ...p.contact2, [field]: val } }));

    return (
        <motion.div key="profile" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-0">
            {/* Header */}
            <div className="bg-white shadow-md p-4 mb-4">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 pb-3 border-b border-gray-100">
                    <div>
                        <h1 className="text-xl font-bold text-slate-900 uppercase tracking-tight">Exhibitor Profile</h1>
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">Registration ID: {data.registrationId}</p>
                    </div>
                    <div className="flex gap-2">
                        {editing ? (
                            <>
                                <button onClick={() => setEditing(false)} className="flex items-center gap-1.5 px-4 py-1.5 border border-slate-300 text-slate-500 text-[11px] font-bold uppercase tracking-widest rounded-[2px] hover:bg-slate-50">
                                    <X size={12} /> Cancel
                                </button>
                                <button onClick={handleSave} disabled={saving} className="flex items-center gap-1.5 px-4 py-1.5 bg-[#23471d] text-white text-[11px] font-bold uppercase tracking-widest rounded-[2px] hover:bg-[#1a3516] disabled:opacity-60">
                                    <Save size={12} /> {saving ? 'Saving...' : 'Save Changes'}
                                </button>
                            </>
                        ) : (
                            <button onClick={() => setEditing(true)} className="flex items-center gap-1.5 px-4 py-1.5 bg-slate-800 text-white text-[11px] font-bold uppercase tracking-widest rounded-[2px] hover:bg-slate-900">
                                <Pencil size={12} /> Edit Profile
                            </button>
                        )}
                    </div>
                </div>

                {/* Company Info — read only */}
                <Section title="Company Information">
                    <Row2 l1="Company Name" v1={data.exhibitorName} l2="Type of Business" v2={data.typeOfBusiness} />
                    <Row2 l1="Industry / Sector" v1={data.industrySector} l2="Nature of Business" v2={data.natureOfBusiness} />
                    <Row2
                        l1="Website" v1={editing ? <input className={inputCls} value={form.website} onChange={e => inp('website', e.target.value)} placeholder="www.example.com" /> : data.website}
                        l2="Fascia Name" v2={editing ? <input className={inputCls} value={form.fasciaName} onChange={e => inp('fasciaName', e.target.value)} placeholder="Brand / Fascia name" /> : data.fasciaName}
                    />
                    {isDomestic ? (
                        <Row2
                            l1="GST No." v1={editing ? <input className={inputCls} value={form.gstNo} onChange={e => inp('gstNo', e.target.value)} placeholder="GST Number" /> : data.gstNo}
                            l2="PAN No." v2={editing ? <input className={inputCls} value={form.panNo} onChange={e => inp('panNo', e.target.value)} placeholder="PAN Number" /> : data.panNo}
                        />
                    ) : (
                        <Row2
                            l1="VAT No." v1={editing ? <input className={inputCls} value={form.gstNo} onChange={e => inp('gstNo', e.target.value)} placeholder="VAT Number" /> : data.gstNo}
                            l2="Reg. No." v2={editing ? <input className={inputCls} value={form.panNo} onChange={e => inp('panNo', e.target.value)} placeholder="Registration Number" /> : data.panNo}
                        />
                    )}
                </Section>

                {/* Address */}
                <Section title="Address">
                    <Row1 label="Address" value={
                        editing
                            ? <input className={inputCls} value={form.address} onChange={e => inp('address', e.target.value)} placeholder="Full address" />
                            : data.address
                    } />
                    <Row2
                        l1="City" v1={editing ? <input className={inputCls} value={form.city} onChange={e => inp('city', e.target.value)} /> : data.city}
                        l2="State" v2={editing ? <input className={inputCls} value={form.state} onChange={e => inp('state', e.target.value)} /> : data.state}
                    />
                    <Row2
                        l1="Country" v1={editing ? <input className={inputCls} value={form.country} onChange={e => inp('country', e.target.value)} /> : data.country}
                        l2="Pincode" v2={editing ? <input className={inputCls} value={form.pincode} onChange={e => inp('pincode', e.target.value)} /> : data.pincode}
                    />
                    <Row1 label="Landline No." value={
                        editing
                            ? <input className={inputCls} value={form.landlineNo} onChange={e => inp('landlineNo', e.target.value)} placeholder="Landline number" />
                            : data.landlineNo
                    } />
                </Section>

                {/* Primary Contact */}
                <Section title="Primary Contact">
                    <Row2
                        l1="First Name" v1={editing ? <input className={inputCls} value={form.contact1.firstName} onChange={e => inpC1('firstName', e.target.value)} /> : data.contact1?.firstName}
                        l2="Last Name" v2={editing ? <input className={inputCls} value={form.contact1.lastName} onChange={e => inpC1('lastName', e.target.value)} /> : data.contact1?.lastName}
                    />
                    <Row2
                        l1="Designation" v1={editing ? <input className={inputCls} value={form.contact1.designation} onChange={e => inpC1('designation', e.target.value)} /> : data.contact1?.designation}
                        l2="Mobile" v2={editing ? <input className={inputCls} value={form.contact1.mobile} onChange={e => inpC1('mobile', e.target.value)} /> : data.contact1?.mobile}
                    />
                    <Row2
                        l1="Email" v1={editing ? <input className={inputCls} value={form.contact1.email} onChange={e => inpC1('email', e.target.value)} /> : data.contact1?.email}
                        l2="Alternate No." v2={editing ? <input className={inputCls} value={form.contact1.alternateNo} onChange={e => inpC1('alternateNo', e.target.value)} /> : data.contact1?.alternateNo}
                    />
                </Section>

                {/* Secondary Contact */}
                <Section title="Secondary Contact">
                    <Row2
                        l1="First Name" v1={editing ? <input className={inputCls} value={form.contact2.firstName} onChange={e => inpC2('firstName', e.target.value)} /> : data.contact2?.firstName}
                        l2="Last Name" v2={editing ? <input className={inputCls} value={form.contact2.lastName} onChange={e => inpC2('lastName', e.target.value)} /> : data.contact2?.lastName}
                    />
                    <Row2
                        l1="Designation" v1={editing ? <input className={inputCls} value={form.contact2.designation} onChange={e => inpC2('designation', e.target.value)} /> : data.contact2?.designation}
                        l2="Mobile" v2={editing ? <input className={inputCls} value={form.contact2.mobile} onChange={e => inpC2('mobile', e.target.value)} /> : data.contact2?.mobile}
                    />
                    <Row2
                        l1="Email" v1={editing ? <input className={inputCls} value={form.contact2.email} onChange={e => inpC2('email', e.target.value)} /> : data.contact2?.email}
                        l2="Alternate No." v2={editing ? <input className={inputCls} value={form.contact2.alternateNo} onChange={e => inpC2('alternateNo', e.target.value)} /> : data.contact2?.alternateNo}
                    />
                </Section>
            </div>
        </motion.div>
    );
}
