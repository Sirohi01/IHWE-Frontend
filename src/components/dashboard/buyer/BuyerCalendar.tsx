import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Clock, Users, MapPin } from 'lucide-react';
import { API_URL } from '@/lib/api';
import { toast } from 'sonner';

export default function BuyerCalendar({ data }: { data: any }) {
    const [meetings, setMeetings] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [eventDays, setEventDays] = useState<string[]>([]);
    const [selectedDate, setSelectedDate] = useState('');

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const token = localStorage.getItem('buyerToken');
            const eventId = typeof data.eventId === 'object' ? data.eventId._id : data.eventId;

            const [mRes, eRes] = await Promise.all([
                fetch(`${API_URL}/bsm/buyer/${data._id}`, { headers: { Authorization: `Bearer ${token}` } }),
                fetch(`${API_URL}/events/current`, { headers: { Authorization: `Bearer ${token}` } })
            ]);

            const mData = await mRes.json();
            const eData = await eRes.json();

            if (mData.success) {
                setMeetings(mData.data.filter((m: any) => m.status === 'Approved'));
            }

            if (eData.success && eData.data?.startDate && eData.data?.endDate) {
                const days = generateDays(eData.data.startDate, eData.data.endDate);
                setEventDays(days);
                setSelectedDate(days[0] || '');
            }
        } catch (err) {
            toast.error("Error loading calendar");
        } finally {
            setLoading(false);
        }
    };

    const generateDays = (start: string, end: string): string[] => {
        const days: string[] = [];
        const current = new Date(start);
        const last = new Date(end);
        current.setHours(0, 0, 0, 0);
        last.setHours(0, 0, 0, 0);
        while (current <= last) {
            const y = current.getFullYear();
            const m = String(current.getMonth() + 1).padStart(2, '0');
            const d = String(current.getDate()).padStart(2, '0');
            days.push(`${y}-${m}-${d}`);
            current.setDate(current.getDate() + 1);
        }
        return days;
    };

    const toDateStr = (dateVal: string) => {
        if (!dateVal) return '';
        const d = new Date(dateVal);
        // Using UTC methods to ensure consistent date string regardless of browser timezone
        return `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, '0')}-${String(d.getUTCDate()).padStart(2, '0')}`;
    };

    const dayMeetings = meetings.filter(m => m.date && toDateStr(m.date) === selectedDate);


    return (
        <div className="p-4 bg-white border border-slate-200 rounded-sm min-h-[500px]">
            <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 pb-4 border-b">
                <div>
                    <h2 className="text-[16px] font-black text-[#1e293b] uppercase tracking-tighter">Meeting Calendar</h2>
                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-0.5">Your confirmed B2B schedule</p>
                </div>
                {eventDays.length > 0 ? (
                    <div className="flex gap-1 bg-slate-100 p-1 rounded-sm flex-wrap justify-end">
                        {eventDays.map(d => (
                            <button
                                key={d}
                                onClick={() => setSelectedDate(d)}
                                className={`px-4 py-1.5 text-[10px] font-black uppercase tracking-widest rounded-sm transition-all 
                                    ${selectedDate === d ? 'bg-white text-[#23471d] shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                            >
                                {new Date(d + 'T00:00:00').toLocaleDateString(undefined, { day: 'numeric', month: 'short' })}
                            </button>
                        ))}
                    </div>
                ) : (
                    !loading && <span className="text-[10px] text-slate-400 font-bold uppercase">No event dates found</span>
                )}
            </header>

            {loading ? (
                <div className="h-64 flex items-center justify-center">
                    <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: 'linear' }} className="w-8 h-8 border-4 border-[#23471d]/20 border-t-[#23471d] rounded-full" />
                </div>
            ) : (
                <div className="space-y-4">
                    {dayMeetings.length === 0 ? (
                        <div className="text-center py-20 bg-slate-50 border-2 border-dashed border-slate-200 text-slate-400 rounded-sm">
                            <Clock size={40} className="mx-auto mb-3 opacity-20" />
                            <p className="text-[11px] font-bold uppercase tracking-widest">No meetings scheduled for this day</p>
                        </div>
                    ) : (
                        <div className="relative pl-8 border-l-2 border-slate-100 space-y-8 py-4">
                            {dayMeetings.sort((a, b) => (a.timeSlot || '').localeCompare(b.timeSlot || '')).map((m, i) => (
                                <motion.div
                                    initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }}
                                    key={m._id}
                                    className="relative"
                                >
                                    <div className="absolute -left-[41px] top-1/2 -translate-y-1/2 w-4 h-4 rounded-full border-4 border-white bg-[#23471d] shadow-sm shadow-[#23471d]/40" />
                                    <div className="bg-white border border-slate-200 p-4 rounded-sm flex flex-col md:flex-row md:items-center gap-6 hover:border-[#23471d]/30 transition-all group">
                                        <div className="md:w-32">
                                            <span className="text-[11px] font-black text-[#23471d] uppercase tracking-tighter flex items-center gap-2">
                                                <Clock size={12} /> {m.timeSlot?.split(' - ')[0] || 'TBD'}
                                            </span>
                                            <span className="text-[9px] text-slate-400 font-bold uppercase tracking-widest block mt-0.5">
                                                {m.timeSlot?.split(' - ')[1] || ''}
                                            </span>
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2 mb-1">
                                                <Users size={14} className="text-slate-400" />
                                                <h4 className="text-[13px] font-black text-slate-800 uppercase tracking-tight group-hover:text-[#23471d] transition-colors">
                                                    Meeting with {m.exhibitorId?.exhibitorName}
                                                </h4>
                                            </div>
                                            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">
                                                {m.exhibitorId?.contact1?.firstName} {m.exhibitorId?.contact1?.lastName} • {m.exhibitorId?.country}
                                            </p>
                                        </div>
                                        {m.location && (
                                            <div className="md:border-l md:pl-6">
                                                <span className="flex items-center gap-1.5 text-[10px] font-black text-[#ea580c] uppercase tracking-widest">
                                                    <MapPin size={12} /> {m.location}
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
