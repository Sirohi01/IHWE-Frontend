import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Users, Calendar, Clock, MapPin, Search,
    Filter, Send, CheckCircle2, XCircle, Clock4,
    Briefcase, Globe2, Tag, Sparkles, ChevronLeft, ChevronRight
} from 'lucide-react';
import { API_URL } from '@/lib/api';
import { toast } from 'sonner';

interface Buyer {
    _id: string;
    fullName: string;
    companyName: string;
    designation: string;
    businessType: string;
    primaryProductInterest: string;
    secondaryProductCategories: string[];
    country: string;
    registrationId: string;
}

interface Meeting {
    _id: string;
    buyerId: Buyer;
    date: string;
    timeSlot: string;
    status: 'Pending' | 'Approved' | 'Rejected' | 'Completed' | 'Cancelled';
    requestedBy: string;
    exhibitorApproval: 'Pending' | 'Approved' | 'Rejected';
    buyerApproval: 'Pending' | 'Approved' | 'Rejected';
    location?: string;
    remarks?: string;
}

interface Pagination { total: number; page: number; limit: number; pages: number; }

const LIMIT = 20;

function useDebounce<T>(value: T, delay = 400): T {
    const [debounced, setDebounced] = useState(value);
    useEffect(() => {
        const t = setTimeout(() => setDebounced(value), delay);
        return () => clearTimeout(t);
    }, [value, delay]);
    return debounced;
}

export default function ExhibitorBSM({ data }: { data: any }) {
    const [activeTab, setActiveTab] = useState<'meetings' | 'buyers'>('meetings');
    const [meetings, setMeetings] = useState<Meeting[]>([]);
    const [buyers, setBuyers] = useState<Buyer[]>([]);
    const [pagination, setPagination] = useState<Pagination>({ total: 0, page: 1, limit: LIMIT, pages: 1 });
    const [buyersLoading, setBuyersLoading] = useState(false);
    const [meetingsLoading, setMeetingsLoading] = useState(true);
    const [eventData, setEventData] = useState<any>(null);

    // filters
    const [search, setSearch] = useState('');
    const [primaryCategory, setPrimaryCategory] = useState('');
    const [page, setPage] = useState(1);

    // category data
    const [primaryCategories, setPrimaryCategories] = useState<string[]>([]);

    // modal
    const [requestModal, setRequestModal] = useState<Buyer | null>(null);
    const [reqDate, setReqDate] = useState('');
    const [reqSlot, setReqSlot] = useState('');
    const [reqRemarks, setReqRemarks] = useState('');

    const debouncedSearch = useDebounce(search, 400);
    const token = localStorage.getItem('exhibitorToken');

    // ── Initial load: meetings + event + categories ──
    useEffect(() => {
        fetchMeetingsAndEvent();
        fetchCategories();
    }, []);

    // ── Buyers: re-fetch on filter/page change ──
    useEffect(() => {
        if (activeTab === 'buyers') fetchBuyers();
    }, [activeTab, debouncedSearch, primaryCategory, page]);

    // reset page when filters change
    useEffect(() => { setPage(1); }, [debouncedSearch, primaryCategory]);

    const fetchMeetingsAndEvent = async () => {
        setMeetingsLoading(true);
        try {
            const eventId = typeof data.eventId === 'object' ? data.eventId._id : data.eventId;
            const [mRes, eRes] = await Promise.all([
                fetch(`${API_URL}/bsm/exhibitor/${data._id}`, { headers: { Authorization: `Bearer ${token}` } }),
                fetch(`${API_URL}/events/${eventId}`, { headers: { Authorization: `Bearer ${token}` } }),
            ]);
            const mData = await mRes.json();
            const eData = await eRes.json();
            if (mData.success) setMeetings(mData.data);
            if (eData.success) setEventData(eData.data);
        } catch { toast.error("Failed to load meetings"); }
        finally { setMeetingsLoading(false); }
    };

    const fetchCategories = async () => {
        try {
            const res = await fetch(`${API_URL}/bsm/buyers/categories`, { headers: { Authorization: `Bearer ${token}` } });
            const d = await res.json();
            if (d.success) setPrimaryCategories(d.primaryCategories);
        } catch { /* silent */ }
    };

    const fetchBuyers = async () => {
        setBuyersLoading(true);
        try {
            const params = new URLSearchParams({
                page: String(page), limit: String(LIMIT),
                ...(debouncedSearch && { search: debouncedSearch }),
                ...(primaryCategory && { primaryCategory }),
            });
            const res = await fetch(`${API_URL}/bsm/buyers?${params}`, { headers: { Authorization: `Bearer ${token}` } });
            const d = await res.json();
            if (d.success) { setBuyers(d.data); setPagination(d.pagination); }
        } catch { toast.error("Failed to load buyers"); }
        finally { setBuyersLoading(false); }
    };

    const getAvailableDates = () => {
        if (!eventData?.startDate || !eventData?.endDate) return [];
        const dates: string[] = [];
        const current = new Date(eventData.startDate);
        const end = new Date(eventData.endDate);
        current.setHours(0, 0, 0, 0); end.setHours(0, 0, 0, 0);
        while (current <= end) {
            const y = current.getFullYear(), m = String(current.getMonth() + 1).padStart(2, '0'), d = String(current.getDate()).padStart(2, '0');
            dates.push(`${y}-${m}-${d}`);
            current.setDate(current.getDate() + 1);
        }
        return dates;
    };

    const handleRespond = async (meetingId: string, approval: 'Approved' | 'Rejected') => {
        try {
            const res = await fetch(`${API_URL}/bsm/exhibitor/respond/${meetingId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
                body: JSON.stringify({ approval })
            });
            const result = await res.json();
            if (result.success) { toast.success(`Meeting ${approval}`); fetchMeetingsAndEvent(); }
            else toast.error(result.message);
        } catch { toast.error("Network error"); }
    };

    const handleRequestMeeting = async () => {
        try {
            const res = await fetch(`${API_URL}/bsm/exhibitor/request`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
                body: JSON.stringify({ exhibitorId: data._id, buyerId: requestModal?._id, date: null, timeSlot: null, remarks: reqRemarks, eventId: eventData?._id })
            });
            const result = await res.json();
            if (result.success) { toast.success("Interest expressed! Admin will schedule your meeting."); setRequestModal(null); fetchMeetingsAndEvent(); }
            else toast.error(result.message);
        } catch { toast.error("Network error"); }
    };

    const subCategories: string[] = [];

    return (
        <div className="p-4 bg-white border border-slate-200 rounded-sm">
            {/* Header */}
            <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-4 border-b">
                <div>
                    <h2 className="text-[16px] font-black text-[#1e293b] uppercase tracking-tighter">Buyer Seller Meet (BSM)</h2>
                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-0.5">Connect with international & domestic buyers</p>
                </div>
                <div className="flex bg-slate-100 p-1 rounded-sm">
                    <button onClick={() => setActiveTab('meetings')} className={`px-4 py-1.5 text-[10px] font-black uppercase tracking-widest rounded-sm transition-all ${activeTab === 'meetings' ? 'bg-white text-[#23471d] shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}>My Schedule</button>
                    <button onClick={() => setActiveTab('buyers')} className={`px-4 py-1.5 text-[10px] font-black uppercase tracking-widest rounded-sm transition-all ${activeTab === 'buyers' ? 'bg-white text-[#23471d] shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}>Browse Buyers</button>
                </div>
            </header>

            {/* MY SCHEDULE TAB */}
            {activeTab === 'meetings' && (
                <div className="space-y-4 min-h-[400px]">
                    {meetingsLoading ? (
                        <div className="h-64 flex items-center justify-center">
                            <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: 'linear' }} className="w-8 h-8 border-4 border-[#23471d]/20 border-t-[#23471d] rounded-full" />
                        </div>
                    ) : meetings.length === 0 ? (
                        <div className="text-center py-20 bg-slate-50 rounded-sm border-2 border-dashed border-slate-200 text-slate-400">
                            <Calendar size={40} className="mx-auto mb-3 opacity-20" />
                            <p className="text-[11px] font-bold uppercase tracking-widest">No meetings scheduled yet</p>
                            <button onClick={() => setActiveTab('buyers')} className="mt-4 text-[10px] text-[#23471d] font-black underline uppercase tracking-widest">Connect with Buyers</button>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 gap-3">
                            {meetings.map((m) => (
                                <div key={m._id} className="group relative bg-white border border-slate-200 rounded-sm overflow-hidden hover:border-[#23471d]/30 transition-all">
                                    <div className="flex flex-col md:flex-row md:items-center p-4 gap-4">
                                        <div className="w-12 h-12 bg-slate-50 rounded-sm flex items-center justify-center group-hover:bg-[#f0f9ff]">
                                            <Users className="text-slate-400 group-hover:text-[#0284c7] w-6 h-6" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2 mb-1">
                                                <span className="text-[12px] font-black text-slate-800 uppercase truncate">{m.buyerId?.companyName}</span>
                                                <span className="text-[10px] bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded-sm font-bold uppercase tracking-tighter">{m.buyerId?.registrationId}</span>
                                            </div>
                                            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[10px] text-slate-500 font-bold uppercase tracking-widest">
                                                <span className="flex items-center gap-1"><Users size={12} /> {m.buyerId?.fullName || m.buyerId?.designation}</span>
                                                <span className="flex items-center gap-1"><Globe2 size={12} /> {m.buyerId?.country}</span>
                                            </div>
                                        </div>
                                        <div className="flex flex-wrap items-center gap-3 md:border-l md:pl-6">
                                            <div className="flex flex-col gap-1">
                                                <span className="flex items-center gap-1.5 text-[11px] font-black text-slate-700"><Calendar size={12} className="text-[#23471d]" />{m.date ? new Date(m.date).toLocaleDateString(undefined, { day: 'numeric', month: 'short' }) : 'Awaiting Assignment'}</span>
                                                {m.timeSlot ? (
                                                    <span className="flex items-center gap-1.5 text-[11px] font-black text-slate-700"><Clock size={12} className="text-[#23471d]" />{m.timeSlot}</span>
                                                ) : (
                                                    <span className="text-[8px] text-amber-600 uppercase font-black tracking-widest mt-0.5 animate-pulse">Slot Not Assigned</span>
                                                )}
                                            </div>
                                            <div className="ml-auto flex flex-col items-end gap-2">
                                                <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest flex items-center gap-1.5 ${m.status === 'Approved' ? 'bg-green-100 text-green-700' : m.status === 'Pending' ? 'bg-amber-100 text-amber-700' : 'bg-red-100 text-red-700'}`}>
                                                    {m.status === 'Approved' ? <CheckCircle2 size={12}/> : m.status === 'Pending' ? <Clock4 size={12}/> : <XCircle size={12}/>}
                                                    {m.status}
                                                </span>
                                                {m.exhibitorApproval === 'Pending' && m.status !== 'Rejected' && (
                                                    <div className="flex gap-1.5">
                                                        <button onClick={() => handleRespond(m._id, 'Approved')} className="flex items-center gap-1 px-2.5 py-1 bg-green-600 hover:bg-green-700 text-white text-[9px] font-black uppercase tracking-widest rounded-sm transition-all"><CheckCircle2 size={11}/> Accept</button>
                                                        <button onClick={() => handleRespond(m._id, 'Rejected')} className="flex items-center gap-1 px-2.5 py-1 bg-red-500 hover:bg-red-600 text-white text-[9px] font-black uppercase tracking-widest rounded-sm transition-all"><XCircle size={11}/> Decline</button>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="bg-slate-50 px-4 py-2 border-t flex flex-wrap items-center gap-4 text-[9px] font-black uppercase tracking-widest">
                                        <span className={`flex items-center gap-1 ${m.exhibitorApproval === 'Approved' ? 'text-green-600' : m.exhibitorApproval === 'Rejected' ? 'text-red-500' : 'text-amber-500'}`}>
                                            {m.exhibitorApproval === 'Approved' ? <CheckCircle2 size={11}/> : m.exhibitorApproval === 'Rejected' ? <XCircle size={11}/> : <Clock4 size={11}/>}
                                            You: {m.exhibitorApproval}
                                        </span>
                                        <span className={`flex items-center gap-1 ${m.buyerApproval === 'Approved' ? 'text-green-600' : m.buyerApproval === 'Rejected' ? 'text-red-500' : 'text-amber-500'}`}>
                                            {m.buyerApproval === 'Approved' ? <CheckCircle2 size={11}/> : m.buyerApproval === 'Rejected' ? <XCircle size={11}/> : <Clock4 size={11}/>}
                                            Buyer: {m.buyerApproval}
                                        </span>
                                        {m.location && <span className="flex items-center gap-1 text-[#23471d] ml-auto"><MapPin size={11}/> Venue: {m.location}</span>}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}

            {/* BROWSE BUYERS TAB */}
            {activeTab === 'buyers' && (
                <div className="space-y-6 min-h-[400px]">
                    {/* Filter bar */}
                    <div className="flex justify-end gap-2">
                        
                        <div className="relative w-[400px] shrink-0">
                            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" size={13} />
                            <input
                                type="text"
                                placeholder="Search..."
                                className="w-full h-9 bg-slate-50 border border-slate-200 rounded-sm pl-8 pr-7 text-[11px] focus:bg-white focus:border-[#23471d] outline-none transition-all placeholder:text-slate-400"
                                value={search}
                                onChange={e => setSearch(e.target.value)}
                            />
                            {search !== debouncedSearch && (
                                <div className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3 h-3 border-2 border-[#23471d]/30 border-t-[#23471d] rounded-full animate-spin" />
                            )}
                        </div>
                    </div>

                    {/* Results count */}
                    <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                            {pagination.total} buyers found
                        </span>
                        {(search || primaryCategory) && (
                            <button onClick={() => { setSearch(''); setPrimaryCategory(''); }} className="text-[9px] font-black text-[#23471d] uppercase tracking-widest hover:underline">
                                Clear filters
                            </button>
                        )}
                    </div>

                    {/* Buyer grid */}
                    {buyersLoading ? (
                        <div className="h-48 flex items-center justify-center">
                            <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: 'linear' }} className="w-8 h-8 border-4 border-[#23471d]/20 border-t-[#23471d] rounded-full" />
                        </div>
                    ) : buyers.length === 0 ? (
                        <div className="text-center py-16 bg-slate-50 border-2 border-dashed border-slate-200 text-slate-400 rounded-sm">
                            <Users size={36} className="mx-auto mb-3 opacity-20" />
                            <p className="text-[11px] font-bold uppercase tracking-widest">No buyers found</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                            {buyers.map(b => (
                                <BuyerCard key={b._id} b={b} onOpen={() => setRequestModal(b)} featured={b.primaryProductInterest === data.primaryCategory} />
                            ))}
                        </div>
                    )}

                    {/* Pagination */}
                    {pagination.pages > 1 && (
                        <div className="flex items-center justify-center gap-2 pt-2">
                            <button
                                onClick={() => setPage(p => Math.max(1, p - 1))}
                                disabled={page === 1}
                                className="p-1.5 rounded-sm border border-slate-200 text-slate-500 hover:bg-slate-50 disabled:opacity-30 disabled:cursor-not-allowed"
                            >
                                <ChevronLeft size={14} />
                            </button>
                            {Array.from({ length: pagination.pages }, (_, i) => i + 1)
                                .filter(p => p === 1 || p === pagination.pages || Math.abs(p - page) <= 1)
                                .reduce<(number | '...')[]>((acc, p, i, arr) => {
                                    if (i > 0 && (p as number) - (arr[i - 1] as number) > 1) acc.push('...');
                                    acc.push(p);
                                    return acc;
                                }, [])
                                .map((p, i) => p === '...' ? (
                                    <span key={`ellipsis-${i}`} className="text-[10px] text-slate-400 px-1">…</span>
                                ) : (
                                    <button
                                        key={p}
                                        onClick={() => setPage(p as number)}
                                        className={`w-7 h-7 text-[10px] font-black rounded-sm border transition-all ${page === p ? 'bg-[#23471d] text-white border-[#23471d]' : 'border-slate-200 text-slate-600 hover:bg-slate-50'}`}
                                    >
                                        {p}
                                    </button>
                                ))}
                            <button
                                onClick={() => setPage(p => Math.min(pagination.pages, p + 1))}
                                disabled={page === pagination.pages}
                                className="p-1.5 rounded-sm border border-slate-200 text-slate-500 hover:bg-slate-50 disabled:opacity-30 disabled:cursor-not-allowed"
                            >
                                <ChevronRight size={14} />
                            </button>
                        </div>
                    )}
                </div>
            )}

            {/* REQUEST MEETING MODAL */}
            <AnimatePresence>
                {requestModal && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setRequestModal(null)} className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" />
                        <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} className="relative w-full max-w-md bg-white rounded-sm shadow-2xl overflow-hidden">
                            <div className="bg-slate-900 p-6 text-white">
                                <h3 className="text-[14px] font-black uppercase tracking-tighter">Schedule BSM Meeting</h3>
                                <p className="text-[10px] text-white/50 font-bold uppercase tracking-widest mt-1">Requesting meeting with {requestModal.fullName}</p>
                            </div>
                            <div className="p-6 space-y-5">
                                <div className="bg-amber-50 border border-amber-100 p-4 rounded-sm">
                                    <p className="text-[10px] text-amber-800 font-bold leading-relaxed uppercase tracking-tight">
                                        <span className="bg-amber-500 text-white px-1.5 py-0.5 rounded-sm mr-1.5">Note:</span> 
                                        By sending this invitation, you are expressing interest in meeting this buyer. The Admin will assign a specific time slot and venue, which you can then approve.
                                    </p>
                                </div>
                                <div>
                                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1.5 block">Introduction / Agenda</label>
                                    <textarea className="w-full h-24 bg-slate-50 border rounded-sm p-3 text-[11px] outline-none focus:border-[#23471d] resize-none" placeholder="Briefly describe what you'd like to discuss..." value={reqRemarks} onChange={e => setReqRemarks(e.target.value)} />
                                </div>
                                <div className="flex gap-3 pt-2">
                                    <button onClick={() => setRequestModal(null)} className="flex-1 py-3 text-[10px] font-black uppercase tracking-widest text-slate-500 bg-slate-100 rounded-sm hover:bg-slate-200 transition-all">Discard</button>
                                    <button onClick={handleRequestMeeting} className="flex-[2] py-3 text-[10px] font-black uppercase tracking-widest text-white bg-[#23471d] rounded-sm shadow-xl shadow-[#23471d]/20 hover:bg-[#1a3516] transition-all flex items-center justify-center gap-2">
                                        <Send size={14} /> Send Interest
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}

function BuyerCard({ b, onOpen, featured }: { b: Buyer; onOpen: () => void; featured?: boolean }) {
    return (
        <motion.div layout className={`relative group bg-white border ${featured ? 'border-[#ea580c]/40 ring-1 ring-[#ea580c]/5' : 'border-slate-200'} rounded-sm p-3 hover:shadow-md transition-all flex flex-col`}>
            {featured && (
                <div className="absolute -top-px -right-px px-2 py-0.5 bg-gradient-to-r from-[#ea580c] to-[#d26019] text-white text-[7px] font-black uppercase tracking-widest rounded-bl-sm flex items-center gap-1 z-10">
                    <Sparkles size={8} /> Match
                </div>
            )}
            <div className="flex items-center gap-2 mb-2">
                <div className={`w-8 h-8 shrink-0 ${featured ? 'bg-[#ea580c]/10 text-[#ea580c]' : 'bg-slate-100 text-slate-400'} rounded-sm flex items-center justify-center font-black text-sm border ${featured ? 'border-[#ea580c]/20' : 'border-transparent'}`}>
                    {b.companyName?.[0] || 'B'}
                </div>
                <div className="min-w-0 flex-1">
                    <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest truncate block">{b.businessType || 'Buyer'}</span>
                    <h4 className="text-[11px] font-black text-slate-800 uppercase truncate leading-tight">{b.companyName}</h4>
                </div>
            </div>
            <div className="bg-slate-50 rounded-sm px-2 py-1.5 mb-2 border border-slate-100">
                <p className="text-[10px] font-bold text-slate-700 uppercase truncate">{b.fullName || b.designation || 'Premium Buyer'}</p>
                <span className="flex items-center gap-1 text-[8px] text-slate-400 font-bold uppercase mt-0.5"><Globe2 size={9} /> {b.country}</span>
            </div>
            <div className="flex items-center gap-1.5 mb-1 px-0.5">
                <div className={`w-1.5 h-1.5 rounded-full shrink-0 ${featured ? 'bg-[#ea580c]' : 'bg-slate-300'}`} />
                <span className={`text-[9px] font-black ${featured ? 'text-[#ea580c]' : 'text-slate-600'} uppercase tracking-tight truncate`}>{b.primaryProductInterest}</span>
            </div>
            {b.secondaryProductCategories?.length > 0 && (
                <div className="flex flex-wrap gap-1 mb-2 px-0.5">
                    {b.secondaryProductCategories.slice(0, 2).map(s => (
                        <span key={s} className="text-[7px] font-bold bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded-sm uppercase truncate max-w-[80px]">{s}</span>
                    ))}
                    {b.secondaryProductCategories.length > 2 && (
                        <span className="text-[7px] font-bold bg-slate-100 text-slate-400 px-1.5 py-0.5 rounded-sm">+{b.secondaryProductCategories.length - 2}</span>
                    )}
                </div>
            )}
            <button onClick={onOpen} className={`w-full py-2 mt-auto ${featured ? 'bg-[#23471d] hover:bg-[#1a3516]' : 'bg-slate-900 hover:bg-black'} text-white text-[9px] font-black uppercase tracking-widest rounded-sm transition-all flex items-center justify-center gap-1.5`}>
                <Send size={11} /> Request Meeting
            </button>
        </motion.div>
    );
}
