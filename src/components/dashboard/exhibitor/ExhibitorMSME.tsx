import { useState } from 'react';
import { motion } from 'framer-motion';
import { Save, Pencil, X, ExternalLink, FileText } from 'lucide-react';
import { API_URL, SERVER_URL } from '@/lib/api';
import { toast } from 'sonner';

interface MSMEProps { data: any; }

/* 🔥 SAME GRID SYSTEM */
function InfoGrid({ rows }: { rows: [string, React.ReactNode][] }) {
    return (
        <div className="border border-slate-200 rounded-sm overflow-hidden">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
                {rows.map(([label, value], i) => (
                    <div key={i} className="flex border-r border-b border-slate-200 last:border-r-0 hover:bg-slate-50/40">
                        <div className="w-[120px] min-w-[120px] px-2 py-2 text-[10px] font-semibold text-slate-500 uppercase border-r bg-slate-50 flex items-center">
                            {label}
                        </div>
                        <div className="flex-1 px-2 py-2 text-[11px] text-slate-800 flex items-center break-all">
                            {value ?? '—'}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

function Section({ title, children }: any) {
    return (
        <div className="mb-4">
            <div className="flex items-center gap-2 mb-1.5">
                <div className="w-1 h-3.5 bg-[#23471d] rounded-full" />
                <span className="text-[11px] font-semibold text-[#23471d] uppercase tracking-wider">
                    {title}
                </span>
            </div>
            {children}
        </div>
    );
}

const inputCls = "rounded border border-slate-300 h-8 text-[11px] px-2 w-full";

const MSME_CATEGORIES = ['Manufacturer', 'Service Provider', 'Trader', 'Others'];

export default function ExhibitorMSME({ data }: MSMEProps) {
    const msme = data.msme || {};

    const [editing, setEditing] = useState(!msme.udhyamRegNo);
    const [saving, setSaving] = useState(false);

    const [form, setForm] = useState({
        udhyamRegNo: msme.udhyamRegNo || '',
        udhyamMobileNo: msme.udhyamMobileNo || '',
        udhyamEmailId: msme.udhyamEmailId || '',
        udhyamContactPerson: msme.udhyamContactPerson || '',
        udhyamDesignation: msme.udhyamDesignation || '',
        udhyamAddress: msme.udhyamAddress || '',
        udhyamIssueDate: msme.udhyamIssueDate ? msme.udhyamIssueDate.split('T')[0] : '',
        dfoLocation: msme.dfoLocation || '',
        dfoEmail: msme.dfoEmail || '',
        dfoMobileNo: msme.dfoMobileNo || '',
        msmeCategory: msme.msmeCategory || 'Manufacturer',
        msmeRemark: msme.msmeRemark || '',
    });

    const [certFile, setCertFile] = useState<File | null>(null);

    const inp = (k: string, v: string) => setForm(p => ({ ...p, [k]: v }));

    const handleSave = async () => {
        if (!form.udhyamRegNo) return toast.error('Udhyam Reg. No. required');

        setSaving(true);
        try {
            const token = localStorage.getItem('exhibitorToken');
            const fd = new FormData();

            Object.entries(form).forEach(([k, v]) => fd.append(k, v));
            if (certFile) fd.append('udhyamCertificate', certFile);

            const res = await fetch(`${API_URL}/exhibitor-registration/${data._id}/msme`, {
                method: 'PUT',
                headers: { Authorization: `Bearer ${token}` },
                body: fd,
            });

            const result = await res.json();

            if (result.success) {
                toast.success('Saved');
                setEditing(false);
                Object.assign(data, { msme: result.data });
            } else toast.error(result.message);

        } catch {
            toast.error('Error saving');
        } finally {
            setSaving(false);
        }
    };

    const certUrl = msme.udhyamCertificateUrl
        ? (msme.udhyamCertificateUrl.startsWith('http')
            ? msme.udhyamCertificateUrl
            : `${SERVER_URL}${msme.udhyamCertificateUrl}`)
        : null;

    return (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <div className="bg-white border border-slate-200 p-4 rounded-md">

                {/* Header */}
                <div className="flex justify-between items-center mb-4 border-b pb-3">
                    <h1 className="text-[14px] font-semibold uppercase">MSME Details</h1>

                    {editing ? (
                        <div className="flex gap-2">
                            <button onClick={() => setEditing(false)} className="text-xs border px-2 py-1">
                                <X size={12} /> Cancel
                            </button>
                            <button onClick={handleSave} className="text-xs bg-[#23471d] text-white px-2 py-1">
                                <Save size={12} /> Save
                            </button>
                        </div>
                    ) : (
                        <button onClick={() => setEditing(true)} className="text-xs bg-slate-700 text-white px-2 py-1">
                            <Pencil size={12} /> Edit
                        </button>
                    )}
                </div>

                {/* EDIT MODE */}
                {editing ? (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">

                        <input className={inputCls} placeholder="Reg No" value={form.udhyamRegNo} onChange={e => inp('udhyamRegNo', e.target.value)} />
                        <input className={inputCls} placeholder="Mobile" value={form.udhyamMobileNo} onChange={e => inp('udhyamMobileNo', e.target.value)} />
                        <input className={inputCls} placeholder="Email" value={form.udhyamEmailId} onChange={e => inp('udhyamEmailId', e.target.value)} />

                        <input className={inputCls} placeholder="Contact" value={form.udhyamContactPerson} onChange={e => inp('udhyamContactPerson', e.target.value)} />
                        <input className={inputCls} placeholder="Designation" value={form.udhyamDesignation} onChange={e => inp('udhyamDesignation', e.target.value)} />
                        <input type="date" className={inputCls} value={form.udhyamIssueDate} onChange={e => inp('udhyamIssueDate', e.target.value)} />

                        <input className={inputCls} placeholder="Address" value={form.udhyamAddress} onChange={e => inp('udhyamAddress', e.target.value)} />
                        <input className={inputCls} placeholder="DFO Location" value={form.dfoLocation} onChange={e => inp('dfoLocation', e.target.value)} />
                        <input className={inputCls} placeholder="DFO Email" value={form.dfoEmail} onChange={e => inp('dfoEmail', e.target.value)} />

                        <input className={inputCls} placeholder="DFO Mobile" value={form.dfoMobileNo} onChange={e => inp('dfoMobileNo', e.target.value)} />

                        <select className={inputCls} value={form.msmeCategory} onChange={e => inp('msmeCategory', e.target.value)}>
                            {MSME_CATEGORIES.map(c => <option key={c}>{c}</option>)}
                        </select>

                        <input className={inputCls} placeholder="Remark" value={form.msmeRemark} onChange={e => inp('msmeRemark', e.target.value)} />

                        <input type="file" onChange={e => setCertFile(e.target.files?.[0] || null)} />

                    </div>
                ) : (
                    /* 🔥 VIEW MODE (GRID FIXED) */
                    <div className="space-y-3">

                        <Section title="Udhyam Details">
                            <InfoGrid rows={[
                                ['Reg No', msme.udhyamRegNo],
                                ['Category', msme.msmeCategory],
                                ['Issue Date', msme.udhyamIssueDate ? new Date(msme.udhyamIssueDate).toLocaleDateString() : '—'],
                                ['Contact', msme.udhyamContactPerson],
                                ['Designation', msme.udhyamDesignation],
                                ['Mobile', msme.udhyamMobileNo],
                                ['Email', msme.udhyamEmailId],
                                ['Address', msme.udhyamAddress],
                            ]} />
                        </Section>

                        <Section title="DFO Details">
                            <InfoGrid rows={[
                                ['Location', msme.dfoLocation],
                                ['Email', msme.dfoEmail],
                                ['Mobile', msme.dfoMobileNo],
                                ['Remark', msme.msmeRemark],
                            ]} />
                        </Section>

                        {certUrl && (
                            <a href={certUrl} target="_blank"
                                className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#23471d] text-white text-[10px]">
                                <ExternalLink size={12} /> View Certificate
                            </a>
                        )}

                    </div>
                )}

            </div>
        </motion.div>
    );
}