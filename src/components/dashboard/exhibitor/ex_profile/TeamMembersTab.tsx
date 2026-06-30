import { useState, useEffect, useRef } from "react";
import { Users, UserPlus, Edit2, Trash2, Phone, X, Check, User, IdCard, Badge, Utensils, Car, FileText } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import { useExhibitorCtx } from "@/context/ExhibitorContext";
import { API_URL, SERVER_URL } from "@/lib/api";
import { toast } from "sonner";

const fixUrl = (url?: string) => {
    if (!url || url === "undefined" || url === "null") return "";
    if (url.startsWith("http") || url.startsWith("blob:")) return url;
    const cleanPath = url.startsWith("/") ? url : `/${url}`;
    return url.includes("res.cloudinary.com") ? url : `${SERVER_URL}${cleanPath}`;
};

const Avatar = ({ url, alt, className }: { url?: string; alt: string; className: string }) => {
    const resolved = fixUrl(url);
    return resolved ? (
        <img src={resolved} alt={alt} className={`${className} object-cover`} />
    ) : (
        <div className={`${className} bg-slate-100 flex items-center justify-center text-slate-300`}>
            <User className="w-1/2 h-1/2" />
        </div>
    );
};

const EMPTY_FORM = {
    name: "", designation: "", department: "", roleAtExhibition: "",
    email: "", mobile: "", isPrimary: false, photoUrl: "",
    passes: { exhibitor: false, vehicle: false, service: false, visitor: false }
};

export default function TeamMembersTab({ onSuccess }: { onSuccess?: () => void }) {
    const navigate = useNavigate();
    const { data, setData, fetchDashboard } = useExhibitorCtx();
    const [teamList, setTeamList] = useState<any[]>([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
    const [form, setForm] = useState(EMPTY_FORM);
    const [showOtherRoleInput, setShowOtherRoleInput] = useState(false);
    const [saving, setSaving] = useState(false);
    const photoInputRef = useRef<HTMLInputElement>(null);

    const openAdd = () => navigate('/exhibitor-dashboard/add-team-members');

    // Uploads to Cloudinary and runs the same AI moderation check as other document uploads
    // before accepting the URL.
    const uploadPersonPhoto = async (file: File | undefined) => {
        if (!file) return;
        if (file.size > 5 * 1024 * 1024) return toast.error("File size should be less than 5MB");
        if (!file.type.startsWith("image/")) return toast.error("Only image files are allowed");

        const loadingToast = toast.loading("Uploading photo...");
        try {
            const token = localStorage.getItem("exhibitorToken");
            const formData = new FormData();
            formData.append("photo", file);
            const res = await fetch(`${API_URL}/exhibitor-auth/team-member-photo`, {
                method: "POST",
                headers: { Authorization: `Bearer ${token}` },
                body: formData,
            });
            const result = await res.json();
            toast.dismiss(loadingToast);
            if (result.success) {
                toast.success("Photo uploaded successfully!");
                setForm((prev) => ({ ...prev, photoUrl: result.photoUrl }));
            } else {
                toast.error(result.message || "Photo upload failed");
            }
        } catch {
            toast.dismiss(loadingToast);
            toast.error("Error uploading photo");
        }
    };

    useEffect(() => {
        if (data) setTeamList(data.teamMembers || []);
    }, [data]);

    if (!data) return <div className="p-6 text-gray-500">Loading...</div>;

    const persist = async (updatedList: any[]) => {
        setSaving(true);
        try {
            const token = localStorage.getItem("exhibitorToken");
            const formData = new FormData();
            formData.append("teamMembers", JSON.stringify(updatedList));
            const res = await fetch(`${API_URL}/exhibitor-auth/update-profile?id=${data._id}`, {
                method: "PUT",
                headers: { Authorization: `Bearer ${token}` },
                body: formData,
            });
            const result = await res.json();
            if (result.success) {
                toast.success("Team members updated successfully!");
                if (result.data) setData(result.data);
                setShowModal(false);
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

    const openEdit = (index: number, member: any) => {
        setSelectedIndex(index);
        setForm({ ...member });
        setShowOtherRoleInput(!!member.roleAtExhibition);
        setShowModal(true);
    };

    const handleSaveMember = () => {
        if (!form.name.trim() || !form.designation.trim()) {
            toast.error("Name and designation are required.");
            return;
        }
        let updatedList = [...teamList];
        if (form.isPrimary) updatedList = updatedList.map((m) => ({ ...m, isPrimary: false }));
        if (selectedIndex !== null) updatedList[selectedIndex] = form;
        else updatedList.push(form);
        setTeamList(updatedList);
        persist(updatedList);
    };

    const handleDelete = (index: number) => {
        if (!confirm("Delete this team member?")) return;
        const updatedList = teamList.filter((_, i) => i !== index);
        setTeamList(updatedList);
        persist(updatedList);
    };

    return (
        <div className="p-6 bg-[#f4f6fb] min-h-screen">
            <div className="max-w-[1540px] mx-auto">
                <div className="bg-white rounded-lg border border-gray-100 shadow-sm p-5">
                    <div className="flex items-center justify-between mb-5">
                        <h3 className="text-base font-semibold text-[#0A143D]">Team Members ({teamList.length})</h3>
                        <button onClick={openAdd} className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium bg-[#08245b] hover:bg-[#071f4e] text-white transition-all">
                            <UserPlus size={14} />
                            Add Team Member
                        </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                        {teamList.map((member, index) => (
                            <div key={index} className="bg-white border border-[#e5eaf2] rounded-lg px-4 py-3 flex items-center gap-4 hover:shadow-sm hover:border-slate-200 transition-all group relative min-h-[112px]">
                                <div className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 flex items-center gap-1 transition-opacity">
                                    <button onClick={() => openEdit(index, member)} className="p-1 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded">
                                        <Edit2 size={12} />
                                    </button>
                                    <button onClick={() => handleDelete(index)} className="p-1 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded">
                                        <Trash2 size={12} />
                                    </button>
                                </div>
                                <div className="w-[60px] h-[60px] rounded-full overflow-hidden shrink-0 border border-slate-100">
                                    <Avatar url={member.photoUrl} alt={member.name} className="w-full h-full" />
                                </div>
                                <div className="space-y-1 min-w-0 text-sm text-[#26365f] font-semibold">
                                    <div className="flex flex-wrap items-center gap-2">
                                        <h4 className="text-sm font-semibold text-[#14234a] truncate max-w-[135px]">{member.name}</h4>
                                        {member.isPrimary && (
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-[10px] font-medium bg-[#d9f4e9] text-[#158568]">Primary</span>
                                        )}
                                    </div>
                                    <div className="flex flex-wrap gap-1 mt-1">
                                        {member.passes?.exhibitor && <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs bg-orange-100 text-orange-700"><IdCard size={12} /> Exhibitor</span>}
                                        {member.passes?.vehicle && <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs bg-green-100 text-green-700"><Car size={12} /> Vehicle</span>}
                                        {member.passes?.service && <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs bg-purple-100 text-purple-700"><Badge size={12} /> Service</span>}
                                        {member.passes?.visitor && <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs bg-blue-100 text-blue-700"><Users size={12} /> Visitor</span>}
                                    </div>
                                    <p className="text-[13px] font-medium text-gray-600 truncate">{member.designation}</p>
                                    <div className="truncate text-gray-600 text-xs">{member.email}</div>
                                    <div className="flex items-center gap-2 text-gray-600 text-xs">
                                        <Phone size={14} className="text-gray-600 shrink-0" />
                                        <span>{member.mobile}</span>
                                    </div>
                                    {member.idProofUrl && (
                                        <div className="mt-2 pt-2 border-t border-slate-100">
                                            <a href={member.idProofUrl} target="_blank" rel="noreferrer" className="text-xs text-blue-600 hover:text-blue-800 hover:underline flex items-center gap-1 font-medium">
                                                <FileText size={12} /> View ID Proof
                                            </a>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                        {teamList.length === 0 && (
                            <div className="col-span-full py-10 text-center text-gray-400 text-sm font-medium">
                                No team members added yet. Click 'Add Team Member' to invite one.
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {showModal && (
                <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[110] flex items-center justify-center p-4">
                    <div className="bg-white rounded-2xl shadow-xl w-full max-w-xl overflow-hidden border border-slate-100 max-h-[90vh] flex flex-col">
                        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                            <h3 className="font-extrabold text-slate-900 text-lg uppercase tracking-tight">
                                {selectedIndex !== null ? "Modify Team Member" : "New Team Member"}
                            </h3>
                            <button onClick={() => setShowModal(false)} className="p-1 rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-600">
                                <X size={18} />
                            </button>
                        </div>
                        <div className="p-6 overflow-y-auto space-y-4 flex-1 text-sm font-medium">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Full Name</label>
                                    <input type="text" className="w-full rounded-xl border border-slate-200 p-2.5 outline-none focus:border-blue-500"
                                        value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Company Role / Designation</label>
                                    <input type="text" className="w-full rounded-xl border border-slate-200 p-2.5 outline-none focus:border-blue-500"
                                        value={form.designation} onChange={(e) => setForm({ ...form, designation: e.target.value })} />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Department</label>
                                    <input type="text" className="w-full rounded-xl border border-slate-200 p-2.5 outline-none focus:border-blue-500"
                                        value={form.department} onChange={(e) => setForm({ ...form, department: e.target.value })} />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Role at Exhibition</label>
                                    {showOtherRoleInput ? (
                                        <input
                                            type="text"
                                            className="w-full rounded-xl border border-slate-200 p-2.5 outline-none focus:border-blue-500"
                                            value={form.roleAtExhibition}
                                            onChange={(e) => setForm({ ...form, roleAtExhibition: e.target.value })}
                                            placeholder="Enter role"
                                        />
                                    ) : (
                                        <select
                                            className="w-full rounded-xl border border-slate-200 p-2.5 outline-none focus:border-blue-500 bg-white"
                                            value={form.roleAtExhibition}
                                            onChange={(e) => {
                                                if (e.target.value === "Other") {
                                                    setForm({ ...form, roleAtExhibition: "" });
                                                    setShowOtherRoleInput(true);
                                                } else {
                                                    setForm({ ...form, roleAtExhibition: e.target.value });
                                                }
                                            }}
                                        >
                                            <option value="">Select</option>
                                            <option value="Other">Other</option>
                                        </select>
                                    )}
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Work Email</label>
                                    <input type="email" className="w-full rounded-xl border border-slate-200 p-2.5 outline-none focus:border-blue-500"
                                        value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Mobile Number</label>
                                    <input type="text" className="w-full rounded-xl border border-slate-200 p-2.5 outline-none focus:border-blue-500"
                                        value={form.mobile} onChange={(e) => setForm({ ...form, mobile: e.target.value })} />
                                </div>
                            </div>
                            <div className="space-y-1">
                                <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Passes Required</label>
                                <div className="flex gap-4 p-3 border border-slate-200 rounded-xl flex-wrap">
                                    <label className="flex items-center gap-2 cursor-pointer text-gray-700">
                                        <input type="checkbox" checked={form.passes?.exhibitor} onChange={() => setForm({ ...form, passes: { ...form.passes, exhibitor: !form.passes?.exhibitor } })} className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 border-gray-300" />
                                        <IdCard size={16} /> Exhibitor
                                    </label>
                                    <label className="flex items-center gap-2 cursor-pointer text-gray-700">
                                        <input type="checkbox" checked={form.passes?.vehicle} onChange={() => setForm({ ...form, passes: { ...form.passes, vehicle: !form.passes?.vehicle } })} className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 border-gray-300" />
                                        <Car size={16} /> Vehicle
                                    </label>
                                    <label className="flex items-center gap-2 cursor-pointer text-gray-700">
                                        <input type="checkbox" checked={form.passes?.service} onChange={() => setForm({ ...form, passes: { ...form.passes, service: !form.passes?.service } })} className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 border-gray-300" />
                                        <Badge size={16} /> Service
                                    </label>
                                    <label className="flex items-center gap-2 cursor-pointer text-gray-700">
                                        <input type="checkbox" checked={form.passes?.visitor} onChange={() => setForm({ ...form, passes: { ...form.passes, visitor: !form.passes?.visitor } })} className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 border-gray-300" />
                                        <Users size={16} /> Visitor
                                    </label>
                                </div>
                            </div>
                            <div className="space-y-1">
                                <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Photo (Optional)</label>
                                <div className="flex items-center gap-3">
                                    <div className="w-14 h-14 rounded-full overflow-hidden shrink-0 border border-slate-200">
                                        <Avatar url={form.photoUrl} alt="Team Member" className="w-full h-full" />
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => photoInputRef.current?.click()}
                                        className="px-4 py-2 rounded-xl text-xs font-bold border border-slate-200 hover:bg-slate-50 text-slate-600 transition-colors"
                                    >
                                        {form.photoUrl ? "Replace Photo" : "Upload Photo"}
                                    </button>
                                    <input
                                        type="file"
                                        ref={photoInputRef}
                                        className="hidden"
                                        accept="image/*"
                                        onChange={(e) => uploadPersonPhoto(e.target.files?.[0])}
                                    />
                                </div>
                                <p className="text-[10px] text-slate-400 font-medium">Photo is screened automatically before it's accepted.</p>
                            </div>
                            <label className="flex items-center gap-3 p-3.5 bg-slate-50 border border-slate-100 rounded-xl cursor-pointer">
                                <input type="checkbox" checked={form.isPrimary}
                                    onChange={(e) => setForm({ ...form, isPrimary: e.target.checked })}
                                    className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500" />
                                <div>
                                    <span className="text-sm font-bold text-slate-900 block leading-tight">Designate as Primary Contact</span>
                                    <span className="text-[10px] text-slate-400 font-semibold block pt-0.5">This person will appear as the lead representative for team-specific inquiries.</span>
                                </div>
                            </label>
                        </div>
                        <div className="px-6 py-4 border-t border-slate-100 flex items-center justify-end gap-3 bg-slate-50/50">
                            <button onClick={() => setShowModal(false)} className="px-5 py-2.5 rounded-xl text-sm font-semibold border border-slate-200 hover:bg-slate-100 text-slate-600 transition-colors">
                                Cancel
                            </button>
                            <button onClick={handleSaveMember} disabled={saving} className="px-5 py-2.5 rounded-xl text-sm font-semibold bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white transition-colors disabled:opacity-50 flex items-center gap-2 shadow-sm">
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
