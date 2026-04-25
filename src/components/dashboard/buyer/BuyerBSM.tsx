import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Users, Calendar, Clock, MapPin, Search,
    Send, CheckCircle2, XCircle, Clock4,
    Briefcase, Globe2, Sparkles, ChevronLeft, ChevronRight
} from 'lucide-react';
import { API_URL } from '@/lib/api';
import { toast } from 'sonner';

interface Exhibitor {
    _id: string;
    exhibitorName: string;
    contact1: { firstName: string; lastName: string };
    typeOfBusiness: string;
    industrySector: string;
    country: string;
    registrationId: string;
}

interface Meeting {
    _id: string;
    exhibitorId: Exhibitor;
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

export default function BuyerBSM({ data }: { data: any }) {
    const [activeTab, setActiveTab] = useState<'meetings' | 'exhibitors'>('meetings');
    const [meetings, setMeetings] = useState<Meeting[]>([]);
    const [exhibitors, setExhibitors] = useState<Exhibitor[]>([]);
    const [pagination, setPagination] = useState<Pagination>({ total: 0, page: 1, limit: LIMIT, pages: 1 });
    const [exhibitorsLoading, setExhibitorsLoading] = useState(false);
    const [meetingsLoading, setMeetingsLoading] = useState(true);
    const [eventData, setEventData] = useState<any>(null);

    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);
    const debouncedSearch = useDebounce(search, 400);
    const token = localStorage.getItem('buyerToken');

    useEffect(() => {
        fetchMeetingsAndEvent();
    }, []);

    useEffect(() => {
        if (activeTab === 'exhibitors') fetchExhibitors();
    }, [activeTab, debouncedSearch, page]);

    useEffect(() => { setPage(1); }, [debouncedSearch]);

    const fetchMeetingsAndEvent = async () => {
        setMeetingsLoading(true);
        try {
            const [mRes, eRes] = await Promise.all([
                fetch(`${API_URL}/bsm/buyer/${data._id}`, { headers: { Authorization: `Bearer ${token}` } }),
                fetch(`${API_URL}/events/current`, { headers: { Authorization: `Bearer ${token}` } }), // Mock or get real event
            ]);
            const mData = await mRes.json();
            const eData = await eRes.json();
            if (mData.success) setMeetings(mData.data);
            if (eData.success) setEventData(eData.data);
        } catch { toast.error("Failed to load meetings"); }
        finally { setMeetingsLoading(false); }
    };

    const fetchExhibitors = async () => {
        setExhibitorsLoading(true);
        try {
            const params = new URLSearchParams({
                page: String(page), limit: String(LIMIT),
                ...(debouncedSearch && { search: debouncedSearch }),
            });
            const res = await fetch(`${API_URL}/bsm/exhibitors?${params}`, { headers: { Authorization: `Bearer ${token}` } });
            const d = await res.json();
            if (d.success) { setExhibitors(d.data); setPagination(d.pagination); }
        } catch { toast.error("Failed to load exhibitors"); }
        finally { setExhibitorsLoading(false); }
    };

    const handleRespond = async (meetingId: string, approval: 'Approved' | 'Rejected') => {
        try {
            const res = await fetch(`${API_URL}/bsm/buyer/respond/${meetingId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
                body: JSON.stringify({ approval })
            });
            const result = await res.json();
            if (result.success) { toast.success(`Meeting ${approval}`); fetchMeetingsAndEvent(); }
            else toast.error(result.message);
        } catch { toast.error("Network error"); }
    };

    return (
        <div className="p-4 bg-white border border-slate-200 rounded-sm">
            <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-4 border-b">
                <div>
                    <h2 className="text-[16px] font-black text-[#1e293b] uppercase tracking-tighter">Buyer Seller Meet (BSM)</h2>
                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-0.5">Schedule meetings with premium exhibitors</p>
                </div>
                <div className="flex bg-slate-100 p-1 rounded-sm">
                    <button onClick={() => setActiveTab('meetings')} className={`px-4 py-1.5 text-[10px] font-black uppercase tracking-widest rounded-sm transition-all ${activeTab === 'meetings' ? 'bg-white text-[#23471d] shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}>My Schedule</button>
                    <button onClick={() => setActiveTab('exhibitors')} className={`px-4 py-1.5 text-[10px] font-black uppercase tracking-widest rounded-sm transition-all ${activeTab === 'exhibitors' ? 'bg-white text-[#23471d] shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}>Browse Exhibitors</button>
                </div>
            </header>

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
                            <button onClick={() => setActiveTab('exhibitors')} className="mt-4 text-[10px] text-[#23471d] font-black underline uppercase tracking-widest">Connect with Exhibitors</button>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 gap-3">
                            {meetings.map((m) => (
                                <div key={m._id} className="bg-white border border-slate-200 rounded-sm overflow-hidden hover:border-[#23471d]/30 transition-all">
                                    <div className="flex flex-col md:flex-row md:items-center p-4 gap-4">
                                        <div className="w-12 h-12 bg-slate-50 rounded-sm flex items-center justify-center">
                                            <Users className="text-slate-400 w-6 h-6" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2 mb-1">
                                                <span className="text-[12px] font-black text-slate-800 uppercase truncate">{m.exhibitorId?.exhibitorName}</span>
                                                <span className="text-[10px] bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded-sm font-bold uppercase tracking-tighter">{m.exhibitorId?.registrationId}</span>
                                            </div>
                                            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[10px] text-slate-500 font-bold uppercase tracking-widest">
                                                <span className="flex items-center gap-1"><Briefcase size={12} /> {m.exhibitorId?.industrySector}</span>
                                                <span className="flex items-center gap-1"><Globe2 size={12} /> {m.exhibitorId?.country}</span>
                                            </div>
                                        </div>
                                        <div className="flex flex-wrap items-center gap-3 md:border-l md:pl-6">
                                            <div className="flex flex-col gap-1">
                                                <span className="flex items-center gap-1.5 text-[11px] font-black text-slate-700"><Calendar size={12} className="text-[#23471d]" />{new Date(m.date).toLocaleDateString()}</span>
                                                <span className="flex items-center gap-1.5 text-[11px] font-black text-slate-700"><Clock size={12} className="text-[#23471d]" />{m.timeSlot}</span>
                                            </div>
                                            <div className="ml-auto flex flex-col items-end gap-2">
                                                <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest flex items-center gap-1.5 ${m.status === 'Approved' ? 'bg-green-100 text-green-700' : m.status === 'Pending' ? 'bg-amber-100 text-amber-700' : 'bg-red-100 text-red-700'}`}>
                                                    {m.status === 'Approved' ? <CheckCircle2 size={12}/> : m.status === 'Pending' ? <Clock4 size={12}/> : <XCircle size={12}/>}
                                                    {m.status}
                                                </span>
                                                {m.buyerApproval === 'Pending' && m.status !== 'Rejected' && (
                                                    <div className="flex gap-1.5">
                                                        <button onClick={() => handleRespond(m._id, 'Approved')} className="px-2.5 py-1 bg-green-600 hover:bg-green-700 text-white text-[9px] font-black uppercase rounded-sm transition-all">Accept</button>
                                                        <button onClick={() => handleRespond(m._id, 'Rejected')} className="px-2.5 py-1 bg-red-500 hover:bg-red-600 text-white text-[9px] font-black uppercase rounded-sm transition-all">Decline</button>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}

            {activeTab === 'exhibitors' && (
                <div className="space-y-6 min-h-[400px]">
                    <div className="flex justify-end">
                        <div className="relative w-full max-w-xs">
                            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" size={13} />
                            <input type="text" placeholder="Search exhibitors..." className="w-full h-9 bg-slate-50 border border-slate-200 rounded-sm pl-8 text-[11px] focus:bg-white focus:border-[#23471d] outline-none" value={search} onChange={e => setSearch(e.target.value)} />
                        </div>
                    </div>
                    {exhibitorsLoading ? (
                        <div className="h-48 flex items-center justify-center">
                            <div className="w-8 h-8 border-4 border-[#23471d]/20 border-t-[#23471d] rounded-full animate-spin" />
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                            {exhibitors.map(ex => (
                                <div key={ex._id} className="border border-slate-200 rounded-sm p-3 hover:shadow-md transition-all">
                                    <h4 className="text-[12px] font-black text-slate-800 uppercase truncate">{ex.exhibitorName}</h4>
                                    <p className="text-[10px] text-slate-500 uppercase mt-1 truncate">{ex.industrySector}</p>
                                    <div className="flex items-center gap-2 mt-2 text-[9px] text-slate-400 font-bold uppercase">
                                        <Globe2 size={10} /> {ex.country}
                                    </div>
                                    <button className="w-full mt-3 py-2 bg-[#23471d] text-white text-[9px] font-black uppercase rounded-sm hover:bg-[#1a3516] transition-all">Request Meeting</button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
