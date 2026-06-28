import { useState, useEffect } from "react";
import { Edit, X, Check } from "lucide-react";
import { useExhibitorCtx } from "@/context/ExhibitorContext";
import { API_URL } from "@/lib/api";
import { toast } from "sonner";

const COMPANY_FIELDS = [
    { key: "typeOfBusiness", label: "Type of Business" },
    { key: "industrySector", label: "Industry Sector" },
    { key: "fasciaName", label: "Fascia Name" },
    { key: "website", label: "Website" },
    { key: "gstNo", label: "GST No." },
    { key: "panNo", label: "PAN No." },
    { key: "landlineNo", label: "Landline" },
    { key: "natureOfBusiness", label: "Nature of Business" },
];

const ADDRESS_FIELDS = [
    { key: "address", label: "Address", fullWidth: true },
    { key: "city", label: "City" },
    { key: "state", label: "State" },
    { key: "country", label: "Country" },
    { key: "pincode", label: "Pincode" },
];

export default function CompanyDetails() {
    const { data, setData, fetchDashboard } = useExhibitorCtx();
    const [editing, setEditing] = useState(false);
    const [saving, setSaving] = useState(false);
    const [form, setForm] = useState<Record<string, string>>({});

    useEffect(() => {
        if (data) {
            const next: Record<string, string> = {};
            [...COMPANY_FIELDS, ...ADDRESS_FIELDS].forEach(({ key }) => {
                next[key] = data[key] || "";
            });
            setForm(next);
        }
    }, [data]);

    if (!data) return <div className="p-6 text-gray-500">Loading...</div>;

    const companyDetails = COMPANY_FIELDS.map((f) => ({ ...f, value: data[f.key] || "N/A" }));
    const addressDetails = ADDRESS_FIELDS.map((f) => ({ ...f, value: data[f.key] || "N/A" }));

    const handleSave = async () => {
        setSaving(true);
        try {
            const token = localStorage.getItem("exhibitorToken");
            const formData = new FormData();
            Object.entries(form).forEach(([key, value]) => formData.append(key, value));

            const res = await fetch(`${API_URL}/exhibitor-auth/update-profile?id=${data._id}`, {
                method: "PUT",
                headers: { Authorization: `Bearer ${token}` },
                body: formData,
            });
            const result = await res.json();
            if (result.success) {
                toast.success("Company details updated successfully!");
                if (result.data) setData(result.data);
                setEditing(false);
                await fetchDashboard();
            } else {
                toast.error(result.message || "Saving failed");
            }
        } catch {
            toast.error("Error saving data");
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="p-6 bg-[#f4f6fb] min-h-screen">
            <div className="max-w-[1540px] mx-auto space-y-6">

                {/* Company & Business Section */}
                <div className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm">
                    <div className="bg-[#1f4e3d] text-white px-4 py-2.5 flex items-center justify-between">
                        <h2 className="text-sm font-bold tracking-wide">COMPANY & BUSINESS</h2>
                        <button onClick={() => setEditing(true)} className="flex items-center gap-1.5 text-xs font-semibold hover:text-emerald-200 transition-colors">
                            <Edit size={14} /> EDIT
                        </button>
                    </div>
                    <div className="p-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-y-6 gap-x-4">
                        {companyDetails.map((detail, idx) => (
                            <div key={idx} className="flex flex-col gap-1">
                                <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">{detail.label}</span>
                                <span className="text-[14px] font-semibold text-[#0A143D]">{detail.value}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Address Section */}
                <div className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm">
                    <div className="bg-[#1f4e3d] text-white px-4 py-2.5 flex items-center justify-between">
                        <h2 className="text-sm font-bold tracking-wide">ADDRESS</h2>
                        <button onClick={() => setEditing(true)} className="flex items-center gap-1.5 text-xs font-semibold hover:text-emerald-200 transition-colors">
                            <Edit size={14} /> EDIT
                        </button>
                    </div>
                    <div className="p-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-y-6 gap-x-4">
                        {addressDetails.map((detail, idx) => (
                            <div key={idx} className={`flex flex-col gap-1 ${detail.fullWidth ? "lg:col-span-4 md:col-span-2" : ""}`}>
                                <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">{detail.label}</span>
                                <span className="text-[14px] font-semibold text-[#0A143D]">{detail.value}</span>
                            </div>
                        ))}
                    </div>
                </div>

            </div>

            {editing && (
                <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl overflow-hidden border border-slate-100 max-h-[90vh] flex flex-col">
                        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                            <h3 className="font-extrabold text-slate-900 text-lg uppercase tracking-tight">Edit Company Details</h3>
                            <button onClick={() => setEditing(false)} className="p-1 rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-600">
                                <X size={18} />
                            </button>
                        </div>
                        <div className="p-6 overflow-y-auto space-y-4 flex-1">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {[...COMPANY_FIELDS, ...ADDRESS_FIELDS].map(({ key, label }) => (
                                    <div key={key} className="space-y-1">
                                        <label className="text-xs font-bold uppercase tracking-wider text-slate-400">{label}</label>
                                        <input
                                            type="text"
                                            className="w-full rounded-xl border border-slate-200 p-2.5 outline-none focus:border-blue-500 text-sm"
                                            value={form[key] || ""}
                                            onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="px-6 py-4 border-t border-slate-100 flex items-center justify-end gap-3 bg-slate-50/50">
                            <button onClick={() => setEditing(false)} className="px-5 py-2.5 rounded-xl text-sm font-semibold border border-slate-200 hover:bg-slate-100 text-slate-600 transition-colors">
                                Cancel
                            </button>
                            <button
                                onClick={handleSave}
                                disabled={saving}
                                className="px-5 py-2.5 rounded-xl text-sm font-semibold bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white transition-colors disabled:opacity-50 flex items-center gap-2 shadow-sm"
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
                    </div>
                </div>
            )}
        </div>
    );
}
