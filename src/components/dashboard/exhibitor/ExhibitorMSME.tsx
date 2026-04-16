import { useState } from 'react';
import { motion } from 'framer-motion';
import { Save, Pencil, X, Upload, ExternalLink, FileText } from 'lucide-react';
import { API_URL, SERVER_URL } from '@/lib/api';
import { toast } from 'sonner';

interface MSMEProps { data: any; }

const inputCls = "rounded-[2px] border border-slate-400 h-8 text-[12px] bg-white text-slate-900 font-medium outline-none px-3 w-full focus:border-[#23471d]";
const labelCls = "text-[10px] font-bold text-slate-600 uppercase tracking-wider mb-1 block";

const MSME_CATEGORIES = ['Manufacturer', 'Service Provider', 'Trader', 'Others'];

const emptyForm = {
    udhyamRegNo: '',
    udhyamMobileNo: '',
    udhyamEmailId: '',
    udhyamContactPerson: '',
    udhyamDesignation: '',
    udhyamAddress: '',
    udhyamIssueDate: '',
    dfoLocation: '',
    dfoEmail: '',
    dfoMobileNo: '',
    msmeCategory: 'Manufacturer',
    msmeRemark: '',
};

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
        if (!form.udhyamRegNo) { toast.error('Udhyam Reg. No. is required'); return; }
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
                toast.success('MSME details saved successfully');
                setEditing(false);
                Object.assign(data, { msme: result.data });
            } else {
                toast.error(result.message || 'Save failed');
            }
        } catch { toast.error('Failed to save MSME details'); }
        finally { setSaving(false); }
    };

    const certUrl = msme.udhyamCertificateUrl
        ? (msme.udhyamCertificateUrl.startsWith('http') ? msme.udhyamCertificateUrl : `${SERVER_URL}${msme.udhyamCertificateUrl}`)
        : null;

    return (
        <motion.div key="msme" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
            <div className="bg-white shadow-md p-4">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 pb-3 border-b border-gray-100 mb-4">
                    <div>
                        <h1 className="text-xl font-bold text-slate-900 uppercase tracking-tight">MSME / Udhyam Details</h1>
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">Micro, Small & Medium Enterprise Registration</p>
                    </div>
                    <div className="flex gap-2">
                        {editing ? (
                            <>
                                {msme.udhyamRegNo && (
                                    <button onClick={() => setEditing(false)} className="flex items-center gap-1.5 px-4 py-1.5 border border-slate-300 text-slate-500 text-[11px] font-bold uppercase tracking-widest rounded-[2px] hover:bg-slate-50">
                                        <X size={12} /> Cancel
                                    </button>
                                )}
                                <button onClick={handleSave} disabled={saving} className="flex items-center gap-1.5 px-4 py-1.5 bg-[#23471d] text-white text-[11px] font-bold uppercase tracking-widest rounded-[2px] hover:bg-[#1a3516] disabled:opacity-60">
                                    <Save size={12} /> {saving ? 'Saving...' : 'Save MSME Details'}
                                </button>
                            </>
                        ) : (
                            <button onClick={() => setEditing(true)} className="flex items-center gap-1.5 px-4 py-1.5 bg-slate-800 text-white text-[11px] font-bold uppercase tracking-widest rounded-[2px] hover:bg-slate-900">
                                <Pencil size={12} /> Edit
                            </button>
                        )}
                    </div>
                </div>

                {!editing && !msme.udhyamRegNo ? (
                    <div className="py-12 text-center">
                        <FileText className="w-12 h-12 text-slate-200 mx-auto mb-3" />
                        <p className="text-[12px] font-bold text-slate-400 uppercase tracking-widest mb-4">No MSME details added yet</p>
                        <button onClick={() => setEditing(true)} className="px-6 py-2 bg-[#23471d] text-white text-[11px] font-black uppercase tracking-widest rounded-[2px]">
                            Add MSME Details
                        </button>
                    </div>
                ) : editing ? (
                    <div className="space-y-4">
                        {/* Udhyam Details */}
                        <div>
                            <p className="text-[11px] font-black text-[#23471d] uppercase tracking-wider mb-3 pb-1 border-b border-slate-100">Udhyam Registration Details</p>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div>
                                    <label className={labelCls}>Udhyam Reg. No. *</label>
                                    <input className={inputCls} value={form.udhyamRegNo} onChange={e => inp('udhyamRegNo', e.target.value)} placeholder="UDYAM-XX-00-0000000" />
                                </div>
                                <div>
                                    <label className={labelCls}>Udhyam Mobile No.</label>
                                    <input className={inputCls} value={form.udhyamMobileNo} onChange={e => inp('udhyamMobileNo', e.target.value.replace(/\D/g,'').slice(0,10))} placeholder="10-digit mobile" />
                                </div>
                                <div>
                                    <label className={labelCls}>Udhyam Email ID</label>
                                    <input type="email" className={inputCls} value={form.udhyamEmailId} onChange={e => inp('udhyamEmailId', e.target.value)} placeholder="email@example.com" />
                                </div>
                                <div>
                                    <label className={labelCls}>Contact Person</label>
                                    <input className={inputCls} value={form.udhyamContactPerson} onChange={e => inp('udhyamContactPerson', e.target.value)} placeholder="Name" />
                                </div>
                                <div>
                                    <label className={labelCls}>Designation</label>
                                    <input className={inputCls} value={form.udhyamDesignation} onChange={e => inp('udhyamDesignation', e.target.value)} placeholder="Designation" />
                                </div>
                                <div>
                                    <label className={labelCls}>Issue Date</label>
                                    <input type="date" className={inputCls} value={form.udhyamIssueDate} onChange={e => inp('udhyamIssueDate', e.target.value)} />
                                </div>
                                <div className="md:col-span-2">
                                    <label className={labelCls}>Udhyam Address</label>
                                    <input className={inputCls} value={form.udhyamAddress} onChange={e => inp('udhyamAddress', e.target.value)} placeholder="Registered address" />
                                </div>
                                <div>
                                    <label className={labelCls}>Udhyam Certificate {certUrl && '(already uploaded)'}</label>
                                    <input type="file" accept="image/*" onChange={e => setCertFile(e.target.files?.[0] || null)}
                                        className="w-full text-[11px] border border-slate-400 rounded-[2px] px-2 py-1.5 bg-white file:mr-2 file:py-1 file:px-3 file:border-0 file:bg-[#23471d] file:text-white file:text-[10px] file:font-bold file:uppercase file:rounded-[2px] cursor-pointer" />
                                </div>
                            </div>
                        </div>

                        {/* DFO Details */}
                        <div>
                            <p className="text-[11px] font-black text-[#23471d] uppercase tracking-wider mb-3 pb-1 border-b border-slate-100">DFO Details</p>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div>
                                    <label className={labelCls}>DFO Location</label>
                                    <input className={inputCls} value={form.dfoLocation} onChange={e => inp('dfoLocation', e.target.value)} placeholder="DFO Location" />
                                </div>
                                <div>
                                    <label className={labelCls}>DFO Email</label>
                                    <input type="email" className={inputCls} value={form.dfoEmail} onChange={e => inp('dfoEmail', e.target.value)} placeholder="DFO Email" />
                                </div>
                                <div>
                                    <label className={labelCls}>DFO Mobile No.</label>
                                    <input className={inputCls} value={form.dfoMobileNo} onChange={e => inp('dfoMobileNo', e.target.value.replace(/\D/g,'').slice(0,10))} placeholder="10-digit mobile" />
                                </div>
                            </div>
                        </div>

                        {/* MSME Category & Remark */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className={labelCls}>MSME Category</label>
                                <select className={inputCls} value={form.msmeCategory} onChange={e => inp('msmeCategory', e.target.value)}>
                                    {MSME_CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                                </select>
                            </div>
                            <div>
                                <label className={labelCls}>MSME Remark</label>
                                <input className={inputCls} value={form.msmeRemark} onChange={e => inp('msmeRemark', e.target.value)} placeholder="Any remarks..." />
                            </div>
                        </div>
                    </div>
                ) : (
                    /* View Mode */
                    <div className="space-y-4">
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            {[
                                { label: 'Udhyam Reg. No.', value: msme.udhyamRegNo },
                                { label: 'MSME Category', value: msme.msmeCategory },
                                { label: 'Issue Date', value: msme.udhyamIssueDate ? new Date(msme.udhyamIssueDate).toLocaleDateString('en-IN') : '—' },
                                { label: 'Contact Person', value: msme.udhyamContactPerson },
                                { label: 'Designation', value: msme.udhyamDesignation },
                                { label: 'Mobile No.', value: msme.udhyamMobileNo },
                                { label: 'Email ID', value: msme.udhyamEmailId },
                                { label: 'Address', value: msme.udhyamAddress },
                                { label: 'DFO Location', value: msme.dfoLocation },
                                { label: 'DFO Email', value: msme.dfoEmail },
                                { label: 'DFO Mobile', value: msme.dfoMobileNo },
                                { label: 'Remark', value: msme.msmeRemark },
                            ].map((item, i) => (
                                <div key={i} className="bg-slate-50 border border-slate-200 p-3 rounded-[2px]">
                                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-wider mb-1">{item.label}</p>
                                    <p className="text-[12px] font-bold text-slate-800">{item.value || '—'}</p>
                                </div>
                            ))}
                        </div>
                        {certUrl && (
                            <a href={certUrl} target="_blank" rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-4 py-2 bg-[#23471d] text-white text-[10px] font-black uppercase tracking-widest rounded-[2px] hover:bg-[#1a3516]">
                                <ExternalLink size={12} /> View Udhyam Certificate
                            </a>
                        )}
                    </div>
                )}
            </div>
        </motion.div>
    );
}
