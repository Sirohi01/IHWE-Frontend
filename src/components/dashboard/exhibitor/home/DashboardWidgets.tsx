import { useState, useEffect } from "react";
import { Building2, FileText, CreditCard, Calendar, FolderOpen, Megaphone, CalendarDays, UsersRound, MessageSquare, Ticket, ShoppingBag, Package, ArrowRight, Headset, ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useExhibitorCtx } from "@/context/ExhibitorContext";
import { API_URL } from "@/lib/api";

const Sparkle = ({ style, color = '#fff176' }: { style?: React.CSSProperties, color?: string }) => (
    <span
        style={{
            position: 'absolute',
            pointerEvents: 'none',
            fontSize: '12px',
            color: color,
            textShadow: `0 0 8px ${color}, 0 0 16px ${color}, 0 0 24px ${color}`,
            animation: 'sparkleAnim 1.6s ease-in-out infinite',
            opacity: 0,
            zIndex: 20,
            ...style,
        }}
    >
        ✦
    </span>
);

// ─── Quick Access Data ────────────────────────────────────────────────────────

// ─── Important Updates Data ───────────────────────────────────────────────────

type BadgeType = "New" | "Info" | "Alert";

const BADGE_STYLES: Record<string, string> = {
    New: "bg-blue-100 text-blue-600 border border-blue-200",
    Info: "bg-amber-100 text-amber-600 border border-amber-200",
    Alert: "bg-red-100 text-red-600 border border-red-200",
};

// ─── Props ────────────────────────────────────────────────────────────────────

interface DashboardWidgetsProps {
    onNavigate?: (tab: string) => void;
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function DashboardWidgets({ onNavigate }: DashboardWidgetsProps) {
    const { data } = useExhibitorCtx();
    const [updates, setUpdates] = useState<any[]>([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loadingUpdates, setLoadingUpdates] = useState(true);
    const [moduleStats, setModuleStats] = useState({
        products: 0,
        accessoryOrders: 0,
        passRequests: 0,
        approvedPassRequests: 0,
        meetings: 0,
        marketingTemplates: 0,
        leads: 0,
    });

    useEffect(() => {
        const fetchUpdates = async () => {
            if (!data?._id) return;
            setLoadingUpdates(true);
            try {
                const token = localStorage.getItem('exhibitorToken');
                const res = await fetch(`${API_URL}/exhibitor-auth/updates?id=${data._id}&page=${page}&limit=3`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                const result = await res.json();
                if (result.success) {
                    setUpdates(result.data);
                    setTotalPages(result.pagination.totalPages);
                }
            } catch (err) {
                console.error("Failed to fetch updates", err);
            } finally {
                setLoadingUpdates(false);
            }
        };
        fetchUpdates();
    }, [data?._id, page]);

    useEffect(() => {
        const fetchModuleStats = async () => {
            if (!data?._id) return;
            const token = localStorage.getItem('exhibitorToken');
            const headers = token ? { Authorization: `Bearer ${token}` } : undefined;
            const selectedRegId = localStorage.getItem('selectedRegId') || data._id;

            const readArray = async (url: string, options?: RequestInit) => {
                try {
                    const res = await fetch(url, options);
                    const result = await res.json();
                    return result.success && Array.isArray(result.data) ? result.data : [];
                } catch {
                    return [];
                }
            };

            const [products, accessoryOrders, passRequests, meetings, templates, leads] = await Promise.all([
                readArray(`${API_URL}/stall-products/my?regId=${selectedRegId}`, { headers }),
                readArray(`${API_URL}/stall-accessories/orders?exhibitorId=${data._id}`, { headers }),
                readArray(`${API_URL}/exhibitor-pass-requests/exhibitor/${data._id}`, { headers }),
                readArray(`${API_URL}/bsm/exhibitor/${data._id}`, { headers }),
                readArray(`${API_URL}/marketing-toolkit/templates?exhibitorId=${data._id}`),
                readArray(`${API_URL}/exhibitor-leads/my`, { headers }),
            ]);

            setModuleStats({
                products: products.length,
                accessoryOrders: accessoryOrders.length,
                passRequests: passRequests.length,
                approvedPassRequests: passRequests.filter((item: any) => item.status === 'approved').length,
                meetings: meetings.length,
                marketingTemplates: templates.length,
                leads: leads.length,
            });
        };

        fetchModuleStats();
    }, [data?._id]);

    const balance = Number(data?.balanceAmount || 0);
    const quickAccess = [
        { id: "my-event", label: "My Event", sub: data?.eventId?.name || "View event details", icon: Calendar, link: "/exhibitor-dashboard/my-event", iconBg: "bg-gradient-to-br from-[#3b82f6] to-[#2563eb]" },
        { id: "stall-management", label: "Stall Information", sub: data?.participation?.stallFor ? `${data.participation.stallFor} - ${data?.participation?.stallSize || 0} SQM` : "Stall pending", icon: Building2, link: "/exhibitor-dashboard/stall-information", iconBg: "bg-gradient-to-br from-[#3b82f6] to-[#2563eb]" },
        { id: "invoices", label: "Invoice & Receipts", sub: data?.invoice?.invoiceNo || data?.estimate?.estimateNo || `${data?.paymentHistory?.length || 0} payment records`, icon: FileText, link: "/exhibitor-dashboard/invoices", iconBg: "bg-gradient-to-br from-[#22a96a] to-[#178a52]" },
        { id: "add-on-services", label: "Add On Services", sub: `${moduleStats.accessoryOrders} order${moduleStats.accessoryOrders === 1 ? '' : 's'} placed`, icon: ShoppingBag, link: "/exhibitor-dashboard/accessories", iconBg: "bg-gradient-to-br from-[#f43f5e] to-[#e11d48]" },
        { id: "exhibitor-pass", label: "Passes & Hospitality", sub: moduleStats.passRequests ? `${moduleStats.approvedPassRequests}/${moduleStats.passRequests} approved` : "No requests yet", icon: Ticket, link: "/exhibitor-dashboard/exhibitor-pass", iconBg: "bg-gradient-to-br from-[#10b981] to-[#059669]" },
        { id: "add-product", label: "My Product/Services", sub: `${moduleStats.products} product${moduleStats.products === 1 ? '' : 's'} listed`, icon: Package, link: "/exhibitor-dashboard/product", iconBg: "bg-gradient-to-br from-[#8b5cf6] to-[#6d28d9]" },
        { id: "document-center", label: "Documentations", sub: data?.msme?.udyamRegNo ? "Udyam details added" : "Upload & manage", icon: FolderOpen, link: "/exhibitor-dashboard/document-center", iconBg: "bg-gradient-to-br from-[#a855f7] to-[#9333ea]" },
        ...(import.meta.env.DEV ? [{ id: "buyer-contacts", label: "Buyers Management", sub: `${moduleStats.leads} captured lead${moduleStats.leads === 1 ? '' : 's'}`, icon: UsersRound, link: "/exhibitor-dashboard/buyer-contacts", iconBg: "bg-gradient-to-br from-[#14b8a6] to-[#0d9488]" }] : []),
        { id: "payments", label: "Make Payment", sub: balance > 0 ? `Balance ${data?.participation?.currency || 'INR'} ${balance.toLocaleString('en-IN')}` : "No balance due", icon: CreditCard, link: "/exhibitor-dashboard/payments", iconBg: "bg-gradient-to-br from-[#f97316] to-[#ea6c0a]" },
        ...(import.meta.env.DEV ? [{ id: "epromotion", label: "E-Promotion", sub: `${moduleStats.marketingTemplates} template${moduleStats.marketingTemplates === 1 ? '' : 's'} available`, icon: Megaphone, link: "/exhibitor-dashboard/epromotion", iconBg: "bg-gradient-to-br from-[#ec4899] to-[#db2777]" }] : []),
        { id: "chat", label: "Customer Care", sub: "Get instant help", icon: MessageSquare, link: "/exhibitor-dashboard/chat", iconBg: "bg-gradient-to-br from-[#3b82f6] to-[#6366f1]" },
        { id: "relationship-manager", label: "Relationship Manager", sub: data?.filledByFullName || data?.filledBy || "Your dedicated contact", icon: Headset, link: "/exhibitor-dashboard/relationship-manager", iconBg: "bg-gradient-to-br from-[#059669] to-[#047857]" },
    ];

    return (
        <div className="flex flex-col lg:flex-row items-start gap-2 w-full">
            <style>{`
                @keyframes goldShift {
                    0%   { background-position: 0% 50%; }
                    50%  { background-position: 100% 50%; }
                    100% { background-position: 0% 50%; }
                }
                @keyframes shimmer {
                    0%   { left: -75%; }
                    100% { left: 150%; }
                }
                @keyframes sparkleAnim {
                    0%   { opacity: 0; transform: scale(0.5) translateY(0); }
                    40%  { opacity: 1; transform: scale(1.2) translateY(-4px); }
                    80%  { opacity: 0.6; transform: scale(0.9) translateY(-6px); }
                    100% { opacity: 0; transform: scale(0.5) translateY(-8px); }
                }
                .golden-btn-hero {
                    background: linear-gradient(135deg, #f5c842 0%, #ffdd00 30%, #ffa500 60%, #f5c842 100%);
                    background-size: 200% 200%;
                    animation: goldShift 2.5s ease infinite;
                    box-shadow: 0 0 10px 2px rgba(255,200,0,0.3);
                    position: relative;
                    overflow: hidden;
                    border: 1px solid rgba(255,255,255,0.5) !important;
                }
                .golden-btn-hero::before {
                    content: '';
                    position: absolute;
                    top: -50%;
                    left: -75%;
                    width: 50%;
                    height: 200%;
                    background: linear-gradient(to right, transparent, rgba(255,255,255,0.6), transparent);
                    transform: skewX(-20deg);
                    animation: shimmer 2s infinite;
                }
            `}</style>

            {/* Quick Access */}
            <div
                className="w-full lg:w-[65%] bg-white rounded-xl border border-slate-100 overflow-hidden flex flex-col"
                style={{ boxShadow: 'rgba(67, 71, 85, 0.27) 0px 0px 0.25em, rgba(90, 125, 188, 0.05) 0px 0.25em 1em', fontFamily: 'Inter, sans-serif' }}
            >
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between bg-slate-100 border-b border-slate-200 px-3 py-2.5 gap-3 shrink-0">
                    <h2 className="text-[12px] font-bold text-[#1a3a7c] uppercase tracking-wider leading-none">Quick Access</h2>

                    <div className="flex items-center gap-2 sm:-mt-1.5">
                        <div style={{ position: 'relative', display: 'inline-block' }}>
                            <Sparkle style={{ top: '-10px', left: '10%', animationDelay: '0s' }} />
                            <Sparkle style={{ bottom: '-10px', right: '20%', animationDelay: '0.4s' }} />
                            <Link
                                to="/buyer-registration"
                                className="golden-btn-hero group rounded-md px-2 py-1.5 text-[#0b2912] transition-all duration-500 uppercase tracking-wider text-[8px] font-black flex items-center justify-center shrink-0 shadow-sm border border-transparent"
                            >
                                <span className="relative z-10 flex items-center gap-1">
                                    Buyer Registration
                                    <ArrowRight size={10} className="group-hover:translate-x-1 transition-transform duration-300" />
                                </span>
                            </Link>
                        </div>

                        <div style={{ position: 'relative', display: 'inline-block' }}>
                            <Sparkle color="#3b82f6" style={{ top: '-10px', left: '20%', animationDelay: '0.2s' }} />
                            <Sparkle color="#3b82f6" style={{ bottom: '-10px', right: '15%', animationDelay: '0.6s' }} />
                            <Link
                                to="/delegate-registration"
                                className="group relative overflow-hidden rounded-md px-2 py-1.5 bg-gradient-to-r from-blue-500 to-blue-700 text-white hover:from-blue-600 hover:to-blue-800 transition-all duration-500 uppercase tracking-wider text-[8px] font-bold shadow-[0_4px_10px_rgba(59,130,246,0.3)] hover:shadow-[0_6px_15px_rgba(59,130,246,0.4)] flex items-center justify-center shrink-0 border border-blue-400/30"
                            >
                                <span className="relative z-10 flex items-center gap-1">
                                    Delegates Registration
                                    <ArrowRight size={10} className="group-hover:translate-x-1 transition-transform duration-300" />
                                </span>
                                <span className="absolute inset-0 bg-black scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-1.5 p-3 flex-1">
                    {quickAccess.map(item => {
                        const Icon = item.icon;
                        return (
                            <Link
                                key={item.id}
                                to={item.link}
                                style={{ boxShadow: "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px" }}
                                className="flex items-center gap-1.5 py-1.5 pl-1.5 pr-2 rounded-xl hover:bg-gray-50 transition-all group text-left min-w-0 overflow-hidden"
                            >
                                <div className={`${item.iconBg} rounded-xl p-2 shrink-0 shadow-sm group-hover:scale-105 transition-transform`}>
                                    <Icon size={14} className="text-white" strokeWidth={1.8} />
                                </div>
                                <div className="min-w-0 flex-1 overflow-hidden">
                                    <p className="text-[10px] font-bold text-[#403c9e] leading-tight whitespace-nowrap tracking-tight truncate">{item.label}</p>
                                    <p className="text-[8px] text-[#1a3a7c] mt-0.5 whitespace-nowrap tracking-tight truncate">{item.sub}</p>
                                </div>
                            </Link>
                        );
                    })}
                </div>
            </div>

            {/* Important Updates */}
            <div
                className="w-full lg:w-[35%] shrink-0 bg-white rounded-xl border border-slate-100 overflow-hidden flex flex-col"
                style={{ boxShadow: 'rgba(67, 71, 85, 0.27) 0px 0px 0.25em, rgba(90, 125, 188, 0.05) 0px 0.25em 1em', minHeight: "200px", fontFamily: 'Inter, sans-serif' }}
            >
                <div className="flex items-center justify-between bg-slate-100 border-b border-slate-200 px-3 py-2.5 shrink-0">
                    <h2 className="text-[12px] font-bold text-[#1a3a7c] uppercase tracking-wider leading-none">Important Updates</h2>
                    {/* Pagination Controls in Header */}
                    {!loadingUpdates && totalPages > 1 && (
                        <div className="flex items-center gap-2">
                            <button 
                                onClick={() => setPage(p => Math.max(1, p - 1))}
                                disabled={page === 1}
                                className="text-slate-700 disabled:opacity-30 hover:bg-slate-200 p-0.5 rounded-md transition-colors"
                            >
                                    <ChevronLeft size={14} />
                                </button>
                                <span className="text-[9px] font-medium text-gray-500 whitespace-nowrap">
                                    {page} / {totalPages}
                                </span>
                                <button 
                                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                                disabled={page === totalPages}
                                className="text-slate-700 disabled:opacity-30 hover:bg-slate-200 p-0.5 rounded-md transition-colors"
                            >
                                <ChevronRight size={14} />
                            </button>
                        </div>
                    )}
                </div>

                <div className="p-3 flex-1 flex flex-col justify-center">
                    <div className="space-y-2">
                        {loadingUpdates ? (
                            <div className="flex justify-center py-4">
                                <div className="w-5 h-5 rounded-full border-2 border-blue-500 border-t-transparent animate-spin"></div>
                            </div>
                        ) : updates.length > 0 ? (
                            updates.map((u, i) => (
                                <div key={i} className="flex items-start gap-3 p-2 rounded-xl hover:bg-gray-50 transition-colors" style={{ boxShadow: "rgba(0, 0, 0, 0.05) 0px 0px 0px 1px" }}>
                                    <span className={`w-[34px] text-center text-[9px] font-semibold px-1 py-0.5 rounded-md shrink-0 mt-0.5 ${BADGE_STYLES[u.badge] || 'bg-gray-100 text-gray-600'}`}>
                                        {u.badge}
                                    </span>
                                    <div className="flex-1 min-w-0 ">
                                        <div className="flex items-center justify-between gap-1 mb-1">
                                            <p className="text-[10px] font-semibold text-[#1a3a7c] leading-tight whitespace-nowrap tracking-tight">{u.title}</p>
                                            <span className="text-[8px] text-black shrink-0 whitespace-nowrap">{u.date}</span>
                                        </div>
                                        <p className="text-[8px] text-[#1a3a7c] mt-0.5 leading-snug">{u.desc}</p>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="text-center text-xs text-gray-500 py-4">No updates right now.</div>
                        )}
                    </div>
                </div>
            </div>

        </div>
    );
}
