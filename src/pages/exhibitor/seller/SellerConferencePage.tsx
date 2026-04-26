import React, { useState, useEffect } from 'react';
import { useExhibitorCtx } from '@/context/ExhibitorContext';
import { 
    Mic, Calendar, Users, Zap, 
    ArrowRight, MessageSquare, Play,
    Clock, MapPin, Download, CheckCircle2,
    Lock, AlertCircle, RefreshCw
} from 'lucide-react';
import { motion } from 'framer-motion';
import { API_URL } from '@/lib/api';
import { toast } from 'sonner';
import DashboardHero from '@/components/dashboard/DashboardHero';

// ─── Subscription Gate Component ─────────────────────────────────────────────
function SubscriptionGate({ featureName, children }: { featureName: string; children: React.ReactNode }) {
    const { access } = useExhibitorCtx() || {};
    const hasAccess = access?.conference;

    if (!hasAccess) {
        return (
            <div className="flex flex-col items-center justify-center py-20 text-center">
                <div className="w-16 h-16 bg-amber-50 rounded-full flex items-center justify-center mb-4 border border-amber-200">
                    <Lock size={28} className="text-amber-500" />
                </div>
                <h3 className="text-base font-black text-slate-800 uppercase tracking-tight mb-2">Conference Access Locked</h3>
                <p className="text-sm text-slate-500 max-w-sm mb-6">
                    Your current subscription plan does not include Conference participation. Upgrade to unlock this feature.
                </p>
                <a href="/seller-portal/sponsorship" className="px-6 py-2.5 bg-[#23471d] text-white font-black text-[10px] uppercase tracking-widest rounded-sm hover:bg-[#1a3516] transition-all">
                    View Upgrade Plans
                </a>
            </div>
        );
    }

    return <>{children}</>;
}

export default function SellerConferencePage() {
    const { data, access } = useExhibitorCtx() || {};
    const [sessions, setSessions] = useState<any[]>([]);
    const [myRegistrations, setMyRegistrations] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [registering, setRegistering] = useState<string | null>(null);
    const hasAccess = access?.conference;

    const fetchSessions = async () => {
        try {
            setLoading(true);
            const token = localStorage.getItem('exhibitorToken');
            const res = await fetch(`${API_URL}/seller-portal/conference-sessions`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            const d = await res.json();
            if (d.success) {
                setSessions(d.data || []);
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const fetchMyRegistrations = async () => {
        try {
            const token = localStorage.getItem('exhibitorToken');
            const res = await fetch(`${API_URL}/seller-portal/service-requests`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            const d = await res.json();
            if (d.success) {
                const confRegs = d.data.filter((r: any) => r.serviceType === 'conference');
                setMyRegistrations(confRegs);
            }
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchSessions();
        fetchMyRegistrations();
    }, []);

    const isRegistered = (sessionId: string) => {
        return myRegistrations.some(r => r.details?.sessionId === sessionId);
    };

    const handleRegister = async (session: any) => {
        if (!hasAccess) {
            toast.error('Conference access requires an active subscription with conference feature.');
            return;
        }
        setRegistering(session._id || session.title);
        try {
            const token = localStorage.getItem('exhibitorToken');
            const res = await fetch(`${API_URL}/seller-portal/conference-register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
                body: JSON.stringify({
                    sessionId: session._id,
                    sessionTitle: session.title,
                    sessionDate: session.date,
                    sessionTime: session.time,
                    sessionHall: session.hall,
                })
            });
            const d = await res.json();
            if (d.success) {
                toast.success(`Registered for "${session.title}" successfully!`);
                fetchMyRegistrations();
            } else {
                toast.error(d.message || 'Registration failed');
            }
        } catch (err) {
            toast.error('Failed to register');
        } finally {
            setRegistering(null);
        }
    };

    const handleSpeakerRequest = async () => {
        if (!hasAccess) {
            toast.error('Conference access requires an active subscription.');
            return;
        }
        try {
            const token = localStorage.getItem('exhibitorToken');
            const res = await fetch(`${API_URL}/seller-portal/service-request`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
                body: JSON.stringify({
                    serviceType: 'conference',
                    serviceName: 'Speaker Registration',
                    details: { type: 'speaker_request', exhibitorName: data?.exhibitorName }
                })
            });
            const d = await res.json();
            if (d.success) toast.success('Speaker registration request submitted!');
            else toast.error(d.message || 'Request failed');
        } catch (err) {
            toast.error('Failed to submit request');
        }
    };

    return (
        <div className="space-y-6 pb-12 font-inter">
            <DashboardHero 
                pageId="sl-conference" 
                defaultTitle="Conference Participation" 
                defaultSubtitle="Share your expertise and connect with industry leaders on the global stage"
                type="seller" 
            />

            <SubscriptionGate featureName="conference">
                <header className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                    <div className="hidden md:block">
                        <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest flex items-center gap-2">
                            <Mic size={12} className="text-blue-500" /> Shaping the future of Wellness & Health
                        </p>
                    </div>
                    <div className="flex gap-3">
                        <button onClick={fetchSessions} className="px-4 py-2.5 border border-slate-200 text-slate-600 font-black text-[10px] uppercase tracking-widest rounded-sm flex items-center gap-2 hover:bg-slate-50">
                            <RefreshCw size={12} /> Refresh
                        </button>
                        <button onClick={handleSpeakerRequest} className="px-6 py-2.5 bg-blue-600 text-white font-black text-[10px] uppercase tracking-widest rounded-sm shadow-lg hover:bg-blue-700 transition-all">
                            Register as Speaker
                        </button>
                    </div>
                </header>

                {/* Quick Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[
                        { label: "My Sessions", value: myRegistrations.length.toString().padStart(2, '0'), icon: Calendar, color: "text-blue-600", bg: "bg-blue-50" },
                        { label: "Total Sessions", value: sessions.length > 0 ? `${sessions.length}+` : "TBA", icon: Users, color: "text-emerald-600", bg: "bg-emerald-50" },
                        { label: "Delegate Pass", value: hasAccess ? "Active" : "Inactive", icon: Zap, color: hasAccess ? "text-amber-600" : "text-slate-400", bg: hasAccess ? "bg-amber-50" : "bg-slate-50" },
                    ].map((s, i) => (
                        <div key={i} className="bg-white p-5 rounded-sm border border-slate-200 shadow-sm flex items-center gap-4">
                            <div className={`w-11 h-11 ${s.bg} ${s.color} rounded-sm flex items-center justify-center`}>
                                <s.icon size={22} />
                            </div>
                            <div>
                                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{s.label}</p>
                                <p className="text-xl font-black text-slate-800">{s.value}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Sessions List */}
                <div>
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-[11px] font-black text-slate-800 uppercase tracking-widest flex items-center gap-2">
                            <Clock size={13} className="text-slate-400" /> Conference Sessions
                        </h3>
                    </div>

                    {loading ? (
                        <div className="flex items-center justify-center py-16">
                            <div className="w-8 h-8 border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin" />
                        </div>
                    ) : sessions.length === 0 ? (
                        <div className="bg-white border border-slate-200 rounded-sm p-12 text-center">
                            <Calendar size={32} className="text-slate-300 mx-auto mb-3" />
                            <p className="text-sm font-black text-slate-400 uppercase tracking-wide">Sessions Coming Soon</p>
                            <p className="text-xs text-slate-400 mt-1">Conference schedule will be published shortly. Check back later.</p>
                        </div>
                    ) : (
                        <div className="space-y-3">
                            {sessions.map((session: any, i: number) => {
                                const registered = isRegistered(session._id);
                                const isRegistering = registering === (session._id || session.title);
                                return (
                                    <div key={i} className="bg-white border border-slate-200 rounded-sm p-5 hover:shadow-md transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                                        <div className="flex items-start gap-4">
                                            <div className="w-10 h-10 bg-slate-50 rounded-sm flex items-center justify-center border border-slate-100 shrink-0">
                                                <Play size={16} className="text-blue-600 fill-current" />
                                            </div>
                                            <div>
                                                <div className="flex items-center gap-2 flex-wrap">
                                                    <h4 className="text-sm font-black text-slate-800 uppercase tracking-tight">{session.title}</h4>
                                                    {session.type && (
                                                        <span className="text-[8px] font-black px-1.5 py-0.5 bg-blue-50 text-blue-600 rounded uppercase tracking-widest">{session.type}</span>
                                                    )}
                                                </div>
                                                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1">
                                                    {session.time && <p className="text-[10px] text-slate-500 font-bold flex items-center gap-1"><Clock size={10} /> {session.time}{session.date ? ` • ${session.date}` : ''}</p>}
                                                    {session.hall && <p className="text-[10px] text-slate-500 font-bold flex items-center gap-1"><MapPin size={10} /> {session.hall}</p>}
                                                    {session.speaker && <p className="text-[10px] text-slate-500 font-bold flex items-center gap-1"><Users size={10} /> {session.speaker}</p>}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3 w-full md:w-auto">
                                            {registered ? (
                                                <div className="flex-1 md:flex-none flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-700 rounded-sm border border-emerald-100">
                                                    <CheckCircle2 size={14} />
                                                    <span className="text-[10px] font-black uppercase tracking-widest">Enrolled</span>
                                                </div>
                                            ) : (
                                                <button 
                                                    onClick={() => handleRegister(session)}
                                                    disabled={isRegistering || session.status === 'closed' || session.status === 'full'}
                                                    className={`flex-1 md:flex-none px-6 py-2 rounded-sm font-black text-[10px] uppercase tracking-widest transition-all ${
                                                        session.status === 'closed' || session.status === 'full'
                                                            ? 'bg-slate-100 text-slate-400 cursor-not-allowed' 
                                                            : 'bg-slate-800 text-white hover:bg-black shadow-md'
                                                    }`}
                                                >
                                                    {isRegistering ? (
                                                        <span className="flex items-center gap-2"><div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" /> Registering...</span>
                                                    ) : session.status === 'closed' || session.status === 'full' ? 'Full' : 'Join Session'}
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>

                {/* Product Launch Section */}
                <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-sm p-8 text-white flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-5"><Zap size={150} /></div>
                    <div className="max-w-xl relative z-10">
                        <h3 className="text-xl font-black uppercase tracking-tight mb-2">Product Launch Session</h3>
                        <p className="text-sm text-slate-400 font-medium leading-relaxed">
                            Want to unveil your latest product to an audience of international buyers and media? Book a dedicated product launch slot on the main stage.
                        </p>
                    </div>
                    <button 
                        onClick={() => handleSpeakerRequest()}
                        className="px-8 py-3 bg-[#d26019] text-white font-black text-[10px] uppercase tracking-widest rounded-sm shadow-lg hover:bg-[#b8521a] transition-all flex items-center gap-2 shrink-0"
                    >
                        Apply for Launch <ArrowRight size={14} />
                    </button>
                </div>
            </SubscriptionGate>
        </div>
    );
}
