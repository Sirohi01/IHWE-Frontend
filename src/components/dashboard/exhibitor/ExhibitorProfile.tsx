import { useState } from 'react';
import { motion } from 'framer-motion';
import { Save, Pencil, X } from 'lucide-react';
import { API_URL } from '@/lib/api';
import { toast } from 'sonner';

interface ProfileProps { data: any; }

/* 🔥 CLEAN GRID (compact + perfect border + 4 per row) */
function InfoGrid({ rows }: { rows: [string, React.ReactNode][] }) {
    return (
        <div className="border border-slate-200 rounded-md overflow-hidden">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
                {rows.map(([label, value], i) => (
                    <div
                        key={i}
                        className="flex border-r border-b border-slate-200 last:border-r-0 hover:bg-slate-50/40 transition"
                    >
                        {/* Label */}
                        <div className="w-[120px] min-w-[120px] px-2 py-2 text-[10px] font-semibold text-slate-500 uppercase border-r border-slate-200 bg-slate-50 flex items-center">
                            {label}
                        </div>

                        {/* Value */}
                        <div className="flex-1 px-2 py-2 text-[11px] text-slate-800 flex items-center break-all">
                            {value ?? '—'}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
    return (
        <div className="mb-5">
            <div className="flex items-center gap-2 mb-2">
                <div className="w-1 h-4 bg-[#23471d] rounded-full" />
                <span className="text-[11px] font-semibold text-[#23471d] uppercase tracking-wider">
                    {title}
                </span>
            </div>
            {children}
        </div>
    );
}

const inputCls =
    "h-7 text-[11px] border border-slate-300 rounded px-2 w-full outline-none focus:border-[#23471d] focus:ring-1 focus:ring-[#23471d]/20";

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
            firstName: data.contact1?.firstName || '',
            lastName: data.contact1?.lastName || '',
            email: data.contact1?.email || '',
            designation: data.contact1?.designation || '',
            mobile: data.contact1?.mobile || '',
            alternateNo: data.contact1?.alternateNo || '',
        },
        contact2: {
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
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(form),
            });

            const result = await res.json();

            if (result.success) {
                toast.success('Profile updated');
                setEditing(false);
                Object.assign(data, form);
            } else {
                toast.error(result.message || 'Update failed');
            }
        } catch {
            toast.error('Error updating profile');
        } finally {
            setSaving(false);
        }
    };

    const inp = (f: string, v: string) => setForm(p => ({ ...p, [f]: v }));
    const inpC1 = (f: string, v: string) => setForm(p => ({ ...p, contact1: { ...p.contact1, [f]: v } }));
    const inpC2 = (f: string, v: string) => setForm(p => ({ ...p, contact2: { ...p.contact2, [f]: v } }));

    const v = (val: string, node: React.ReactNode) =>
        editing ? node : val || '—';

    return (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <div className="bg-white rounded-md border border-slate-200">

                {/* Header */}
                <div className="flex justify-between items-center px-4 py-3 border-b bg-slate-50">
                    <div>
                        <h1 className="text-[13px] font-semibold uppercase">Exhibitor Profile</h1>
                        <p className="text-[10px] text-slate-400">ID: {data.registrationId}</p>
                    </div>

                    {editing ? (
                        <div className="flex gap-2">
                            <button onClick={() => setEditing(false)} className="px-2 py-1 border text-[10px]">
                                <X size={12} /> Cancel
                            </button>
                            <button onClick={handleSave} className="px-2 py-1 bg-[#23471d] text-white text-[10px]">
                                <Save size={12} /> Save
                            </button>
                        </div>
                    ) : (
                        <button onClick={() => setEditing(true)} className="px-2 py-1 bg-slate-700 text-white text-[10px]">
                            <Pencil size={12} /> Edit
                        </button>
                    )}
                </div>

                {/* Content */}
                <div className="p-4 space-y-3">

                    <Section title="Company Information">
                        <InfoGrid rows={[
                            ['Company Name', data.exhibitorName],
                            ['Business Type', data.typeOfBusiness],
                            ['Industry', data.industrySector],
                            ['Website', v(form.website, <input className={inputCls} value={form.website} onChange={e => inp('website', e.target.value)} />)],
                            ['Fascia Name', v(form.fasciaName, <input className={inputCls} value={form.fasciaName} onChange={e => inp('fasciaName', e.target.value)} />)],
                            [isDomestic ? 'GST' : 'VAT', v(form.gstNo, <input className={inputCls} value={form.gstNo} onChange={e => inp('gstNo', e.target.value)} />)],
                            [isDomestic ? 'PAN' : 'Reg No.', v(form.panNo, <input className={inputCls} value={form.panNo} onChange={e => inp('panNo', e.target.value)} />)],
                        ]} />
                    </Section>

                    <Section title="Address">
                        <InfoGrid rows={[
                            ['Address', v(form.address, <input className={inputCls} value={form.address} onChange={e => inp('address', e.target.value)} />)],
                            ['City', v(form.city, <input className={inputCls} value={form.city} onChange={e => inp('city', e.target.value)} />)],
                            ['State', v(form.state, <input className={inputCls} value={form.state} onChange={e => inp('state', e.target.value)} />)],
                            ['Country', v(form.country, <input className={inputCls} value={form.country} onChange={e => inp('country', e.target.value)} />)],
                            ['Pincode', v(form.pincode, <input className={inputCls} value={form.pincode} onChange={e => inp('pincode', e.target.value)} />)],
                            ['Landline', v(form.landlineNo, <input className={inputCls} value={form.landlineNo} onChange={e => inp('landlineNo', e.target.value)} />)],
                        ]} />
                    </Section>

                    <Section title="Primary Contact">
                        <InfoGrid rows={[
                            ['First Name', v(form.contact1.firstName, <input className={inputCls} value={form.contact1.firstName} onChange={e => inpC1('firstName', e.target.value)} />)],
                            ['Last Name', v(form.contact1.lastName, <input className={inputCls} value={form.contact1.lastName} onChange={e => inpC1('lastName', e.target.value)} />)],
                            ['Designation', v(form.contact1.designation, <input className={inputCls} value={form.contact1.designation} onChange={e => inpC1('designation', e.target.value)} />)],
                            ['Mobile', v(form.contact1.mobile, <input className={inputCls} value={form.contact1.mobile} onChange={e => inpC1('mobile', e.target.value)} />)],
                            ['Email', v(form.contact1.email, <input className={inputCls} value={form.contact1.email} onChange={e => inpC1('email', e.target.value)} />)],
                            ['Alt No.', v(form.contact1.alternateNo, <input className={inputCls} value={form.contact1.alternateNo} onChange={e => inpC1('alternateNo', e.target.value)} />)],
                        ]} />
                    </Section>

                    <Section title="Secondary Contact">
                        <InfoGrid rows={[
                            ['First Name', v(form.contact2.firstName, <input className={inputCls} value={form.contact2.firstName} onChange={e => inpC2('firstName', e.target.value)} />)],
                            ['Last Name', v(form.contact2.lastName, <input className={inputCls} value={form.contact2.lastName} onChange={e => inpC2('lastName', e.target.value)} />)],
                            ['Designation', v(form.contact2.designation, <input className={inputCls} value={form.contact2.designation} onChange={e => inpC2('designation', e.target.value)} />)],
                            ['Mobile', v(form.contact2.mobile, <input className={inputCls} value={form.contact2.mobile} onChange={e => inpC2('mobile', e.target.value)} />)],
                            ['Email', v(form.contact2.email, <input className={inputCls} value={form.contact2.email} onChange={e => inpC2('email', e.target.value)} />)],
                            ['Alt No.', v(form.contact2.alternateNo, <input className={inputCls} value={form.contact2.alternateNo} onChange={e => inpC2('alternateNo', e.target.value)} />)],
                        ]} />
                    </Section>

                </div>
            </div>
        </motion.div>
    );
}