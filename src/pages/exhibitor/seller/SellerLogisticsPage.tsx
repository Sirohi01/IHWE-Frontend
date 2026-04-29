import React, { useState, useEffect } from 'react';
import { useExhibitorCtx } from '@/context/ExhibitorContext';
import { 
    Package, Truck, Zap, 
    Wrench, ClipboardList, Info, 
    ArrowRight, CheckCircle2, AlertCircle,
    ShoppingBag, Lamp, Monitor, Users,
    Lock, RefreshCw, Clock
} from 'lucide-react';
import { API_URL } from '@/lib/api';
import { toast } from 'sonner';
import DashboardHero from '@/components/dashboard/DashboardHero';

// ─── Subscription Gate ────────────────────────────────────────────────────────
function SubscriptionGate({ children }: { children: React.ReactNode }) {
    const { access } = useExhibitorCtx() || {};
    const hasAccess = access?.logistics;

    if (!hasAccess) {
        return (
            <div className="flex flex-col items-center justify-center py-20 text-center">
                <div className="w-16 h-16 bg-amber-50 rounded-full flex items-center justify-center mb-4 border border-amber-200">
                    <Lock size={28} className="text-amber-500" />
                </div>
                <h3 className="text-base font-black text-slate-800 uppercase tracking-tight mb-2">Logistics Access Locked</h3>
                <p className="text-sm text-slate-500 max-w-sm mb-6">
                    Your current subscription plan does not include Logistics & Operations. Upgrade to unlock this feature.
                </p>
                <a href="/seller-portal/sponsorship" className="px-6 py-2.5 bg-[#23471d] text-white font-black text-[10px] uppercase tracking-widest rounded-sm hover:bg-[#1a3516] transition-all">
                    View Upgrade Plans
                </a>
            </div>
        );
    }

    return <>{children}</>;
}

const SERVICE_TYPES = [
    { key: 'booth_fabrication', title: "Booth Fabrication", desc: "Custom stall design and construction services.", icon: Wrench },
    { key: 'furniture_rental', title: "Furniture Rental", desc: "Tables, chairs, display racks, and more.", icon: ShoppingBag },
    { key: 'electrical_load', title: "Electrical Load", desc: "Additional power sockets and lighting.", icon: Lamp },
    { key: 'audio_visual', title: "Audio Visual", desc: "LED screens, projectors, and sound systems.", icon: Monitor },
    { key: 'internet', title: "Internet Requirement", desc: "High-speed WiFi and broadband connectivity.", icon: Monitor },
    { key: 'housekeeping', title: "Housekeeping", desc: "Daily cleaning and maintenance services.", icon: ShoppingBag },
    { key: 'manpower', title: "Manpower", desc: "Booth hostesses, security, and cleaning staff.", icon: Users },
    { key: 'freight_storage', title: "Freight & Storage", desc: "Safe handling and storage of your exhibits.", icon: Truck },
];

export default function SellerLogisticsPage() {
    const { data, access } = useExhibitorCtx() || {};
    const [myRequests, setMyRequests] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState<string | null>(null);
    const hasAccess = access?.logistics;

    const fetchMyRequests = async () => {
        try {
            setLoading(true);
            const token = localStorage.getItem('exhibitorToken');
            const selectedRegId = localStorage.getItem('selectedRegId');
            const url = selectedRegId
                ? `${API_URL}/seller-portal/logistics-requests?regId=${selectedRegId}`
                : `${API_URL}/seller-portal/logistics-requests`;
            const res = await fetch(url, {
                headers: { Authorization: `Bearer ${token}` }
            });
            const d = await res.json();
            if (d.success) setMyRequests(d.data || []);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMyRequests();
    }, []);

    const getRequestStatus = (serviceKey: string) => {
        const req = myRequests.find(r => r.details?.serviceKey === serviceKey || r.serviceName === SERVICE_TYPES.find(s => s.key === serviceKey)?.title);
        return req?.status || null;
    };

    const handleRequest = async (svc: typeof SERVICE_TYPES[0]) => {
        if (!hasAccess) {
            toast.error('Logistics access requires an active subscription.');
            return;
        }
        setSubmitting(svc.key);
        try {
            const token = localStorage.getItem('exhibitorToken');
            const selectedRegId = localStorage.getItem('selectedRegId');
            const res = await fetch(`${API_URL}/seller-portal/service-request`, {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}` 
                },
                body: JSON.stringify({
                    serviceType: 'logistics',
                    serviceName: svc.title,
                    ...(selectedRegId && { regId: selectedRegId }),
                    details: { description: svc.desc, serviceKey: svc.key }
                })
            });
            const d = await res.json();
            if (d.success) {
                toast.success(`Request for "${svc.title}" submitted!`);
                fetchMyRequests();
            } else {
                toast.error(d.message || 'Failed to submit request');
            }
        } catch (err) {
            toast.error("Failed to submit request");
        } finally {
            setSubmitting(null);
        }
    };

    const getStatusBadge = (status: string | null) => {
        if (!status) return { label: 'Available', cls: 'bg-blue-50 text-blue-600' };
        const map: Record<string, { label: string; cls: string }> = {
            pending: { label: 'Pending', cls: 'bg-orange-50 text-orange-600' },
            reviewed: { label: 'In Review', cls: 'bg-yellow-50 text-yellow-600' },
            approved: { label: 'Approved', cls: 'bg-emerald-50 text-emerald-600' },
            rejected: { label: 'Rejected', cls: 'bg-red-50 text-red-600' },
        };
        return map[status] || { label: status, cls: 'bg-slate-50 text-slate-600' };
    };

    return (
        <div className="space-y-6 pb-12 font-inter">
            <DashboardHero 
                pageId="sl-logistics" 
                defaultTitle="Logistics & Operations" 
                defaultSubtitle="Prepare your booth for a successful event with our operational services"
                type="seller" 
            />

            <SubscriptionGate>
                <header className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                    <div className="hidden md:block">
                        <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest flex items-center gap-2">
                            <Package size={12} className="text-blue-500" /> Professional exhibit management
                        </p>
                    </div>
                    <div className="flex gap-3">
                        <button onClick={fetchMyRequests} className="px-4 py-2.5 border border-slate-200 text-slate-600 font-black text-[10px] uppercase tracking-widest rounded-sm flex items-center gap-2 hover:bg-slate-50">
                            <RefreshCw size={12} /> Refresh
                        </button>
                        <button className="px-6 py-2.5 bg-slate-800 text-white font-black text-[10px] uppercase tracking-widest rounded-sm shadow-lg hover:bg-black transition-all">
                            Download Exhibitor Manual
                        </button>
                    </div>
                </header>

                {/* My Requests Summary */}
                {myRequests.length > 0 && (
                    <div className="bg-white border border-slate-200 rounded-sm p-4">
                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-3">My Active Requests ({myRequests.length})</p>
                        <div className="flex flex-wrap gap-2">
                            {myRequests.map((req, i) => {
                                const badge = getStatusBadge(req.status);
                                return (
                                    <div key={i} className={`flex items-center gap-2 px-3 py-1.5 rounded-sm text-[10px] font-bold border ${badge.cls}`}>
                                        <Clock size={10} />
                                        {req.serviceName} — {badge.label}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}

                {/* Services Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {SERVICE_TYPES.map((svc) => {
                        const status = getRequestStatus(svc.key);
                        const badge = getStatusBadge(status);
                        const isSubmitting = submitting === svc.key;
                        const alreadyRequested = status !== null;

                        return (
                            <div key={svc.key} className="bg-white border border-slate-200 rounded-sm overflow-hidden hover:shadow-lg transition-all flex flex-col">
                                <div className="p-5 flex-1">
                                    <div className="flex justify-between items-start mb-4">
                                        <div className="w-11 h-11 bg-slate-50 border border-slate-100 rounded-sm flex items-center justify-center text-slate-600">
                                            <svc.icon size={22} />
                                        </div>
                                        <span className={`text-[8px] font-black px-1.5 py-0.5 rounded uppercase tracking-widest ${badge.cls}`}>
                                            {badge.label}
                                        </span>
                                    </div>
                                    <h4 className="text-sm font-black text-slate-800 uppercase tracking-tight mb-2">{svc.title}</h4>
                                    <p className="text-xs text-slate-500 font-medium leading-relaxed">{svc.desc}</p>
                                </div>
                                <button 
                                    onClick={() => !alreadyRequested && handleRequest(svc)}
                                    disabled={isSubmitting || alreadyRequested}
                                    className={`w-full py-3.5 border-t border-slate-100 text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2 transition-colors ${
                                        alreadyRequested 
                                            ? 'bg-slate-50 text-slate-400 cursor-not-allowed' 
                                            : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
                                    }`}
                                >
                                    {isSubmitting ? (
                                        <><div className="w-3 h-3 border-2 border-slate-400 border-t-transparent rounded-full animate-spin" /> Submitting...</>
                                    ) : alreadyRequested ? (
                                        <><CheckCircle2 size={13} className="text-emerald-500" /> Request Submitted</>
                                    ) : (
                                        <>Request Service <ArrowRight size={13} /></>
                                    )}
                                </button>
                            </div>
                        );
                    })}
                </div>

                {/* Info Box */}
                <div className="p-5 bg-blue-50 border border-blue-100 rounded-sm flex items-start gap-4">
                    <Info size={20} className="text-blue-600 shrink-0 mt-0.5" />
                    <div>
                        <p className="text-[10px] font-black text-blue-800 uppercase tracking-widest mb-1">Move-in Information</p>
                        <p className="text-xs text-blue-600 font-medium leading-relaxed">
                            Exhibitor move-in starts from April 15, 2026, at 08:00 AM. Please ensure all your exhibits arrive at the loading bay with proper gate pass documentation. Contact the organizer for any special requirements.
                        </p>
                    </div>
                </div>
            </SubscriptionGate>
        </div>
    );
}
