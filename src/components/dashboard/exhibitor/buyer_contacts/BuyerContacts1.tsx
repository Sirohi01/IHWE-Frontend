import React, { useEffect, useMemo, useState } from "react";
import { Mail, Phone, Search, Users, UserCheck, CalendarDays, MessageSquare, Loader2 } from "lucide-react";
import { API_URL } from "@/lib/api";

type Lead = {
    _id: string;
    name?: string;
    company?: string;
    designation?: string;
    country?: string;
    interest?: string;
    email?: string;
    phone?: string;
    sourceType?: string;
    temperature?: string;
    notes?: string;
    createdAt?: string;
    scannedAt?: string;
};

const statusLabel = (lead: Lead) => {
    if (lead.temperature) return lead.temperature;
    if (lead.notes) return "Contacted";
    return "New";
};

const formatDate = (value?: string) => {
    if (!value) return "N/A";
    return new Date(value).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
};

const StatCard = ({ icon: Icon, value, label }: { icon: React.ElementType; value: number; label: string }) => (
    <div className="flex items-center gap-3 p-3 rounded-xl bg-white border border-gray-100 shadow-sm min-w-[150px] flex-1">
        <div className="w-10 h-10 rounded-xl bg-green-50 text-green-700 flex items-center justify-center shrink-0">
            <Icon size={18} />
        </div>
        <div>
            <div className="text-lg font-bold text-gray-900 leading-tight">{value}</div>
            <div className="text-xs text-gray-500 font-medium">{label}</div>
        </div>
    </div>
);

const BuyerContacts1: React.FC = () => {
    const [leads, setLeads] = useState<Lead[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        const fetchLeads = async () => {
            setLoading(true);
            try {
                const token = localStorage.getItem("exhibitorToken");
                const res = await fetch(`${API_URL}/exhibitor-leads/my`, {
                    headers: token ? { Authorization: `Bearer ${token}` } : undefined,
                });
                const result = await res.json();
                setLeads(result.success && Array.isArray(result.data) ? result.data : []);
            } catch (error) {
                console.error("Failed to load exhibitor leads", error);
                setLeads([]);
            } finally {
                setLoading(false);
            }
        };

        fetchLeads();
    }, []);

    const filtered = useMemo(() => {
        const query = searchQuery.trim().toLowerCase();
        if (!query) return leads;
        return leads.filter((lead) =>
            [lead.name, lead.company, lead.designation, lead.country, lead.interest, lead.email, lead.phone]
                .filter(Boolean)
                .some((value) => String(value).toLowerCase().includes(query))
        );
    }, [leads, searchQuery]);

    const contacted = leads.filter((lead) => statusLabel(lead) !== "New").length;
    const buyers = leads.filter((lead) => lead.sourceType === "buyer").length;
    const visitors = leads.filter((lead) => lead.sourceType === "visitor").length;

    return (
        <div className="font-sans mt-2 space-y-3">
            <div className="flex bg-white rounded-lg flex-wrap gap-2 justify-between border border-gray-100 p-2">
                <StatCard icon={Users} value={leads.length} label="Total Leads" />
                <StatCard icon={UserCheck} value={buyers} label="Buyer Leads" />
                <StatCard icon={CalendarDays} value={visitors} label="Visitor Leads" />
                <StatCard icon={MessageSquare} value={contacted} label="Contacted" />
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
                <div className="flex items-center justify-between px-3 py-3 border-b border-gray-100 gap-2 flex-wrap">
                    <div>
                        <h3 className="text-sm font-bold text-gray-900">Captured Leads</h3>
                        <p className="text-xs text-gray-500">Live data from scanned buyer and visitor leads.</p>
                    </div>
                    <div className="flex items-center gap-2 border border-gray-200 rounded-lg px-2 py-1.5 bg-gray-50">
                        <Search size={15} className="text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search leads..."
                            value={searchQuery}
                            onChange={(event) => setSearchQuery(event.target.value)}
                            className="text-sm bg-transparent outline-none w-44 text-gray-700 placeholder-gray-400"
                        />
                    </div>
                </div>

                {loading ? (
                    <div className="h-56 flex flex-col items-center justify-center gap-3 text-gray-400">
                        <Loader2 className="animate-spin" size={24} />
                        <p className="text-xs font-bold uppercase tracking-wider">Loading leads</p>
                    </div>
                ) : filtered.length === 0 ? (
                    <div className="h-56 flex flex-col items-center justify-center gap-2 text-gray-400">
                        <Users size={32} className="opacity-40" />
                        <p className="text-sm font-semibold">No captured leads found.</p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="text-gray-500 text-xs font-medium uppercase tracking-wide border-b border-gray-100 bg-gray-50">
                                    <th className="px-4 py-3 text-left">Name</th>
                                    <th className="px-4 py-3 text-left">Company</th>
                                    <th className="px-4 py-3 text-left">Contact</th>
                                    <th className="px-4 py-3 text-left">Interest</th>
                                    <th className="px-4 py-3 text-left">Source</th>
                                    <th className="px-4 py-3 text-left">Status</th>
                                    <th className="px-4 py-3 text-left">Captured</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {filtered.map((lead) => (
                                    <tr key={lead._id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-4 py-3">
                                            <div className="font-semibold text-gray-800">{lead.name || "Unnamed Lead"}</div>
                                            <div className="text-xs text-gray-400">{lead.designation || "N/A"}</div>
                                        </td>
                                        <td className="px-4 py-3 text-gray-600">
                                            <div>{lead.company || "N/A"}</div>
                                            <div className="text-xs text-gray-400">{lead.country || ""}</div>
                                        </td>
                                        <td className="px-4 py-3">
                                            <div className="flex items-center gap-1.5 text-xs text-gray-600">
                                                <Mail size={12} className="text-gray-400" />
                                                {lead.email || "N/A"}
                                            </div>
                                            <div className="flex items-center gap-1.5 text-xs text-gray-600 mt-1">
                                                <Phone size={12} className="text-gray-400" />
                                                {lead.phone || "N/A"}
                                            </div>
                                        </td>
                                        <td className="px-4 py-3 text-gray-600">{lead.interest || "N/A"}</td>
                                        <td className="px-4 py-3">
                                            <span className="px-2 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 capitalize">
                                                {lead.sourceType || "unknown"}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3">
                                            <span className="px-2 py-1 rounded-full text-xs font-semibold bg-green-50 text-green-700">
                                                {statusLabel(lead)}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3 text-xs text-gray-500">{formatDate(lead.scannedAt || lead.createdAt)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default BuyerContacts1;
