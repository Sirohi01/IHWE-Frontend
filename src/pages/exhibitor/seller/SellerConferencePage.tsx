import React, { useState, useEffect } from 'react';
import { useExhibitorCtx } from '@/context/ExhibitorContext';
import { 
    Mic, Calendar, 
    ArrowRight,
    Clock, MapPin, CheckCircle2,
    Lock, RefreshCw, FileText, ChevronRight,
    Send, Star, Play, Users, Zap
} from 'lucide-react';
import { API_URL } from '@/lib/api';
import { toast } from 'sonner';
import DashboardHero from '@/components/dashboard/DashboardHero';

// ─── Subscription Gate ────────────────────────────────────────────────────────
function SubscriptionGate({ children }: { children: React.ReactNode }) {
    const { access } = useExhibitorCtx() || {};
    if (!access?.conference) {
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

const STATUS_COLOR: Record<string, string> = {
    pending:   'bg-amber-50 text-amber-700 border-amber-200',
    open:      'bg-amber-50 text-amber-700 border-amber-200',
    reviewed:  'bg-blue-50 text-blue-700 border-blue-200',
    approved:  'bg-emerald-50 text-emerald-700 border-emerald-200',
    rejected:  'bg-red-50 text-red-700 border-red-200',
    completed: 'bg-green-100 text-green-800 border-green-300',
    'in-progress': 'bg-blue-50 text-blue-700 border-blue-200',
};

const REQUEST_TYPE_LABEL: Record<string, string> = {
    speaker_request:  'Speaker Registration',
    product_launch:   'Product Launch',
    session_register: 'Session Registration',
    conference:       'Conference',
};

export default function SellerConferencePage() {
    const { data, access } = useExhibitorCtx() || {};
    const [sessions, setSessions] = useState<any[]>([]);
    const [myRequests, setMyRequests] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [loadingReqs, setLoadingReqs] = useState(true);
    const [registering, setRegistering] = useState<string | null>(null);
    const [showRequestForm, setShowRequestForm] = useState(false);
    const [requestType, setRequestType] = useState<'speaker' | 'product_launch' | 'general'>('speaker');
    const [requestNote, setRequestNote] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const hasAccess = access?.conference;

    const selectedRegId = localStorage.getItem('selectedRegId');

    const fetchSessions = async () => {
        try {
            setLoading(true);
            const token = localStorage.getItem('exhibitorToken');
            const url = selectedRegId
                ? `${API_URL}/seller-portal/conference-sessions?regId=${selectedRegId}`
                : `${API_URL}/seller-portal/conference-sessions`;
            const res = await fetch(url, { headers: { Authorization: `Bearer ${token}` } });
            const d = await res.json();
            if (d.success) setSessions(d.data || []);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const fetchMyRequests = async () => {
        try {
            setLoadingReqs(true);
            const token = localStorage.getItem('exhibitorToken');
            const url = selectedRegId
                ? `${API_URL}/seller-portal/service-requests?regId=${selectedRegId}`
                : `${API_URL}/seller-portal/service-requests`;
            const res = await fetch(url, { headers: { Authorization: `Bearer ${token}` } });
            const d = await res.json();
            if (d.success) {
                const confReqs = (d.data || []).filter((r: any) => r.serviceType === 'conference');
                setMyRequests(confReqs);
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoadingReqs(false);
        }
    };

    useEffect(() => {
        fetchSessions();
        fetchMyRequests();
    }, []);

    const isRegistered = (sessionId: string) =>
        myRequests.some(r => r.details?.sessionId === sessionId);

    const handleRegister = async (session: any) => {
        if (!hasAccess) { toast.error('Conference access requires an active subscription.'); return; }
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
                    ...(selectedRegId && { regId: selectedRegId }),
                })
            });
            const d = await res.json();
            if (d.success) { toast.success(`Registered for "${session.title}"!`); fetchMyRequests(); }
            else toast.error(d.message || 'Registration failed');
        } catch { toast.error('Failed to register'); }
        finally { setRegistering(null); }
    };

    const handleSpecialRequest = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!hasAccess) { toast.error('Conference access requires an active subscription.'); return; }
        setSubmitting(true);
        try {
            const token = localStorage.getItem('exhibitorToken');
            const typeLabel = requestType === 'speaker' ? 'Speaker Registration'
                : requestType === 'product_launch' ? 'Product Launch Session'
                : 'Conference General Request';
            const res = await fetch(`${API_URL}/seller-portal/service-request`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
                body: JSON.stringify({
                    serviceType: 'conference',
                    serviceName: typeLabel,
                    ...(selectedRegId && { regId: selectedRegId }),
                    details: {
                        type: requestType === 'speaker' ? 'speaker_request'
                            : requestType === 'product_launch' ? 'product_launch'
                            : 'general',
                        exhibitorName: data?.exhibitorName,
                        note: requestNote,
                    }
                })
            });
            const d = await res.json();
            if (d.success) {
                toast.success(`${typeLabel} request submitted successfully!`);
                setRequestNote('');
                setShowRequestForm(false);
                fetchMyRequests();
            } else {
                toast.error(d.message || 'Request failed');
            }
        } catch { toast.error('Failed to submit request'); }
        finally { setSubmitting(false); }
    };

    const formatDate = (dateStr: string) => {
        if (!dateStr) return '—';
        const d = new Date(dateStr);
        return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
    };

    return (
        <div className="space-y-6 pb-12 font-inter">
            <DashboardHero 
                pageId="sl-conference" 
                defaultTitle="Conference Participation" 
                defaultSubtitle="Share your expertise and connect with industry leaders on the global stage"
                type="seller" 
            />

            <SubscriptionGate>
                {/* Header Actions */}
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                    <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest flex items-center gap-2">
                        <Mic size={12} className="text-blue-500" /> Shaping the future of Wellness & Health
                    </p>
                    <div className="flex gap-3">
                        <button
                            onClick={() => { fetchSessions(); fetchMyRequests(); }}
                            className="px-4 py-2.5 border border-slate-200 text-slate-600 font-black text-[10px] uppercase tracking-widest rounded-sm flex items-center gap-2 hover:bg-slate-50"
                        >
                            <RefreshCw size={12} /> Refresh
                        </button>
                        <button
                            onClick={() => setShowRequestForm(true)}
                            className="px-6 py-2.5 bg-blue-600 text-white font-black text-[10px] uppercase tracking-widest rounded-sm shadow-lg hover:bg-blue-700 transition-all flex items-center gap-2"
                        >
                            <Mic size={12} /> Register as Speaker
                        </button>
                    </div>
                </div>



                {/* My Conference Requests */}
                <div className="bg-white border border-slate-200 rounded-sm shadow-sm overflow-hidden">
                    <div className="bg-[#23471d] px-5 py-3 flex items-center justify-between">
                        <h3 className="text-white font-black text-[11px] uppercase tracking-widest flex items-center gap-2">
                            <FileText size={13} /> My Conference Requests
                        </h3>
                        <span className="bg-[#d26019] text-white text-[9px] font-black px-2 py-0.5 uppercase tracking-wider">
                            {myRequests.length} Records
                        </span>
                    </div>

                    {loadingReqs ? (
                        <div className="flex items-center justify-center py-12">
                            <div className="w-7 h-7 border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin" />
                        </div>
                    ) : myRequests.length === 0 ? (
                        <div className="py-12 text-center">
                            <Calendar size={32} className="text-slate-300 mx-auto mb-3" />
                            <p className="text-sm font-black text-slate-400 uppercase tracking-wide">No Conference Requests Yet</p>
                            <p className="text-xs text-slate-400 mt-1">Register for a session or apply as a speaker below.</p>
                        </div>
                    ) : (
                        <div className="divide-y divide-slate-50">
                            {myRequests.map((req, i) => {
                                const statusStyle = STATUS_COLOR[req.status] || STATUS_COLOR.pending;
                                const typeLabel = REQUEST_TYPE_LABEL[req.details?.type] || req.serviceName || 'Conference Request';
                                return (
                                    <div key={i} className="px-5 py-4 flex items-center justify-between hover:bg-slate-50/50 transition-colors">
                                        <div className="flex items-center gap-4">
                                            <div className="w-9 h-9 bg-blue-50 rounded-sm flex items-center justify-center shrink-0">
                                                {req.details?.type === 'speaker_request' ? <Mic size={16} className="text-blue-600" />
                                                    : req.details?.type === 'product_launch' ? <Star size={16} className="text-amber-600" />
                                                    : <Calendar size={16} className="text-blue-600" />}
                                            </div>
                                            <div>
                                                <p className="text-xs font-black text-slate-800 uppercase">{typeLabel}</p>
                                                <div className="flex items-center gap-3 mt-0.5">
                                                    {req.details?.sessionDate && (
                                                        <p className="text-[10px] text-slate-400 font-bold flex items-center gap-1">
                                                            <Clock size={9} /> {req.details.sessionDate}
                                                        </p>
                                                    )}
                                                    {req.details?.sessionHall && (
                                                        <p className="text-[10px] text-slate-400 font-bold flex items-center gap-1">
                                                            <MapPin size={9} /> {req.details.sessionHall}
                                                        </p>
                                                    )}
                                                    <p className="text-[10px] text-slate-400 font-bold">
                                                        {formatDate(req.createdAt)}
                                                    </p>
                                                </div>
                                                {req.details?.note && (
                                                    <p className="text-[10px] text-slate-500 mt-1 italic">"{req.details.note}"</p>
                                                )}
                                                {req.adminNote && (
                                                    <p className="text-[10px] text-blue-600 font-bold mt-1">Admin: {req.adminNote}</p>
                                                )}
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3 shrink-0">
                                            <span className={`text-[9px] font-black px-2 py-1 rounded border uppercase tracking-wider ${statusStyle}`}>
                                                {req.status || 'Pending'}
                                            </span>
                                            <ChevronRight size={14} className="text-slate-300" />
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>

                {/* Available Sessions */}
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

                {/* Product Launch CTA */}
                <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-sm p-8 text-white flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-5"><Zap size={150} /></div>
                    <div className="max-w-xl relative z-10">
                        <h3 className="text-xl font-black uppercase tracking-tight mb-2">Product Launch Session</h3>
                        <p className="text-sm text-slate-400 font-medium leading-relaxed">
                            Want to unveil your latest product to an audience of international buyers and media? Book a dedicated product launch slot on the main stage.
                        </p>
                    </div>
                    <button
                        onClick={() => { setRequestType('product_launch'); setShowRequestForm(true); }}
                        className="px-8 py-3 bg-[#d26019] text-white font-black text-[10px] uppercase tracking-widest rounded-sm shadow-lg hover:bg-[#b8521a] transition-all flex items-center gap-2 shrink-0"
                    >
                        Apply for Launch <ArrowRight size={14} />
                    </button>
                </div>
            </SubscriptionGate>

            {/* Request Form Modal */}
            {showRequestForm && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-xl shadow-2xl w-full max-w-md p-6">
                        <h3 className="text-sm font-black text-slate-800 uppercase tracking-widest mb-5">
                            {requestType === 'speaker' ? 'Speaker Registration Request'
                                : requestType === 'product_launch' ? 'Product Launch Application'
                                : 'Conference Request'}
                        </h3>
                        <form onSubmit={handleSpecialRequest} className="space-y-4">
                            <div>
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2">Request Type</label>
                                <select
                                    value={requestType}
                                    onChange={e => setRequestType(e.target.value as any)}
                                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-xs font-bold focus:outline-none focus:border-[#23471d]"
                                >
                                    <option value="speaker">Speaker Registration</option>
                                    <option value="product_launch">Product Launch Session</option>
                                    <option value="general">General Conference Request</option>
                                </select>
                            </div>
                            <div>
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2">Additional Notes</label>
                                <textarea
                                    rows={4}
                                    value={requestNote}
                                    onChange={e => setRequestNote(e.target.value)}
                                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-sm font-medium focus:outline-none focus:border-[#23471d]"
                                    placeholder="Topic, preferred date/time, or any other details..."
                                />
                            </div>
                            <div className="flex gap-3 pt-2">
                                <button
                                    type="button"
                                    onClick={() => { setShowRequestForm(false); setRequestNote(''); }}
                                    className="flex-1 py-3 border border-slate-200 text-slate-600 font-black text-[10px] uppercase tracking-widest rounded-lg hover:bg-slate-50"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={submitting}
                                    className="flex-1 py-3 bg-[#23471d] text-white font-black text-[10px] uppercase tracking-widest rounded-lg flex items-center justify-center gap-2 hover:bg-[#1a3516] disabled:opacity-50"
                                >
                                    {submitting ? (
                                        <><div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" /> Submitting...</>
                                    ) : (
                                        <><Send size={12} /> Submit Request</>
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
