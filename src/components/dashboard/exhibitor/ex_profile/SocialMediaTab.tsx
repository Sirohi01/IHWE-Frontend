import { useState, useEffect } from "react";
import { Facebook, Instagram, Linkedin, Twitter, Youtube, Save } from "lucide-react";
import { useExhibitorCtx } from "@/context/ExhibitorContext";
import { API_URL } from "@/lib/api";
import { toast } from "sonner";

const PLATFORMS = [
    { key: "facebook", label: "Facebook", icon: Facebook, placeholder: "https://facebook.com/yourpage", color: "text-blue-600" },
    { key: "instagram", label: "Instagram", icon: Instagram, placeholder: "https://instagram.com/yourhandle", color: "text-pink-600" },
    { key: "linkedin", label: "LinkedIn", icon: Linkedin, placeholder: "https://linkedin.com/company/yourcompany", color: "text-sky-700" },
    { key: "twitter", label: "Twitter / X", icon: Twitter, placeholder: "https://x.com/yourhandle", color: "text-slate-800" },
    { key: "youtube", label: "YouTube", icon: Youtube, placeholder: "https://youtube.com/@yourchannel", color: "text-red-600" },
];

export default function SocialMediaTab() {
    const { data, setData, fetchDashboard } = useExhibitorCtx();
    const [form, setForm] = useState<Record<string, string>>({});
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        if (data) {
            const next: Record<string, string> = {};
            PLATFORMS.forEach(({ key }) => { next[key] = data.socialMedia?.[key] || ""; });
            setForm(next);
        }
    }, [data]);

    if (!data) return <div className="p-6 text-gray-500">Loading...</div>;

    const handleSave = async () => {
        setSaving(true);
        try {
            const token = localStorage.getItem("exhibitorToken");
            const formData = new FormData();
            formData.append("socialMedia", JSON.stringify(form));
            const res = await fetch(`${API_URL}/exhibitor-auth/update-profile?id=${data._id}`, {
                method: "PUT",
                headers: { Authorization: `Bearer ${token}` },
                body: formData,
            });
            const result = await res.json();
            if (result.success) {
                toast.success("Social media links updated successfully!");
                if (result.data) setData(result.data);
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
            <div className="max-w-[800px] mx-auto">
                <div className="bg-white rounded-lg border border-gray-100 shadow-sm p-6">
                    <h3 className="text-base font-semibold text-[#0A143D] mb-1">Social Media Links</h3>
                    <p className="text-[12px] text-gray-500 mb-5">These links will appear on your public exhibitor profile.</p>

                    <div className="space-y-4">
                        {PLATFORMS.map(({ key, label, icon: Icon, placeholder, color }) => (
                            <div key={key} className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-lg border border-gray-200 flex items-center justify-center shrink-0 bg-gray-50">
                                    <Icon size={18} className={color} />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">{label}</label>
                                    <input
                                        type="text"
                                        placeholder={placeholder}
                                        className="w-full rounded-lg border border-gray-200 p-2 mt-0.5 text-[13px] outline-none focus:border-blue-500"
                                        value={form[key] || ""}
                                        onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="flex justify-end mt-6">
                        <button
                            onClick={handleSave}
                            disabled={saving}
                            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white text-[13px] font-bold transition-colors shadow-sm disabled:opacity-50"
                        >
                            {saving ? (
                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            ) : (
                                <Save size={14} />
                            )}
                            Save Changes
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
