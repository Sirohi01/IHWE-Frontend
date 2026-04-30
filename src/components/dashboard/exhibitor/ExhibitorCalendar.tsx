import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Clock, Users, MapPin, AlertCircle } from 'lucide-react';
import { API_URL } from '@/lib/api';
import { toast } from 'sonner';

// Normalize meeting date to YYYY-MM-DD using UTC (avoids timezone shift)
const toDateStr = (dateVal: string | null | undefined): string => {
    if (!dateVal) return '';
    const d = new Date(dateVal);
    if (isNaN(d.getTime())) return '';
    // Use UTC values so "2026-08-21T00:00:00.000Z" always returns "2026-08-21"
    const y = d.getUTCFullYear();
    const m = String(d.getUTCMonth() + 1).padStart(2, '0');
    const day = String(d.getUTCDate()).padStart(2, '0');
    return `${y}-${m}-${day}`;
};

const generateDays = (start: string, end: string): string[] => {
    const days: string[] = [];
    const current = new Date(start + 'T00:00:00Z');
    const last = new Date(end + 'T00:00:00Z');
    while (current <= last) {
        const y = current.getUTCFullYear();
        const m = String(current.getUTCMonth() + 1).padStart(2, '0');
        const d = String(current.getUTCDate()).padStart(2, '0');
        days.push(`${y}-${m}-${d}`);
        current.setUTCDate(current.getUTCDate() + 1);
    }
    return days;
};

export default function ExhibitorCalendar({ data }: { data: any }) {
    const [meetings, setMeetings] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [eventDays, setEventDays] = useState<string[]>([]);
    const [selectedDate, setSelectedDate] = useState('');

    useEffect(() => {
        fetchData();
    }, [data?._id]);

    const fetchData = async () => {
        setLoading(true);
        try {
            const eId = data?._id || data?.id;
            const eventId = typeof data?.eventId === 'object' ? data.eventId?._id : data?.eventId;

            if (!eId || eId === 'undefined') {
                setLoading(false);
                return;
            }

            const token = localStorage.getItem('exhibitorToken');

            const [mRes, eRes] = await Promise.all([
                fetch(`${API_URL}/bsm/exhibitor/${eId}`, {
                    headers: { Authorization: `Bearer ${token}` }
                }),
                fetch(`${API_URL}/events/${eventId || 'current'}`, {
                    headers: { Authorization: `Bearer ${token}` }
                }).catch(() => null)
            ]);

            const mData = await mRes.json();
            const eData = eRes ? await eRes.json().catch(() => null) : null;

            // Load meetings (Approved + Pending)
            let allMeetings: any[] = [];
            if (mData.success) {
                allMeetings = mData.data.filter((m: any) =>
                    ['Approved', 'Pending'].includes(m.status)
                );
                setMeetings(allMeetings);
            }

            // Collect all unique dated meeting dates
            const meetingDates: string[] = Array.from(
                new Set(
                    allMeetings
                        .map((m: any) => toDateStr(m.date))
                        .filter(Boolean)
                )
            ).sort() as string[];

            // Also get event date range if available
            let eventRangeDays: string[] = [];
            if (eData?.success && eData?.data?.startDate && eData?.data?.endDate) {
                eventRangeDays = generateDays(
                    eData.data.startDate.split('T')[0],
                    eData.data.endDate.split('T')[0]
                );
            }

            // Merge: prioritise actual meeting dates, then fill in event range days
            // If meeting dates exist, use ONLY meeting dates (most accurate)
            // If no meeting dates, fall back to event range
            const finalDays = meetingDates.length > 0 ? meetingDates : eventRangeDays;

            setEventDays(finalDays);
            setSelectedDate(finalDays[0] || '');
        } catch (err) {
            toast.error('Error loading calendar');
        } finally {
            setLoading(false);
        }
    };

    // Meetings that have a confirmed date
    const datedMeetings = meetings.filter(m => !!m.date);
    // Meetings with no date yet (interest registered, awaiting admin schedule)
    const undatedMeetings = meetings.filter(m => !m.date);

    // Filter dated meetings by selected tab
    const dayMeetings = selectedDate
        ? datedMeetings.filter(m => toDateStr(m.date) === selectedDate)
        : datedMeetings;

    return (
        <div className="p-4 bg-white border border-slate-200 rounded-sm min-h-[500px]">
            <header className="flex items-center justify-between mb-8 pb-4 border-b flex-wrap gap-3">
                <div>
                    <h2 className="text-[16px] font-black text-[#1e293b] uppercase tracking-tighter">
                        Meeting Calendar
                    </h2>
                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-0.5">
                        Your confirmed B2B schedule
                    </p>
                </div>
                {eventDays.length > 0 && (
                    <div className="flex gap-1 bg-slate-100 p-1 rounded-sm flex-wrap justify-end">
                        {eventDays.map(d => (
                            <button
                                key={d}
                                onClick={() => setSelectedDate(d)}
                                className={`px-4 py-1.5 text-[10px] font-black uppercase tracking-widest rounded-sm transition-all
                                    ${selectedDate === d
                                        ? 'bg-white text-[#23471d] shadow-sm'
                                        : 'text-slate-500 hover:text-slate-700'
                                    }`}
                            >
                                {new Date(d + 'T00:00:00Z').toLocaleDateString('en-IN', {
                                    day: 'numeric',
                                    month: 'short',
                                    timeZone: 'UTC'
                                })}
                            </button>
                        ))}
                    </div>
                )}
            </header>

            {loading ? (
                <div className="h-64 flex items-center justify-center">
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                        className="w-8 h-8 border-4 border-[#23471d]/20 border-t-[#23471d] rounded-full"
                    />
                </div>
            ) : (
                <div className="space-y-8">
                    {dayMeetings.length === 0 && undatedMeetings.length === 0 ? (
                        <div className="text-center py-20 bg-slate-50 border-2 border-dashed border-slate-200 text-slate-400 rounded-sm">
                            <Clock size={40} className="mx-auto mb-3 opacity-20" />
                            <p className="text-[11px] font-bold uppercase tracking-widest">
                                No meetings scheduled
                            </p>
                        </div>
                    ) : (
                        <>
                            {/* Dated meetings timeline */}
                            {dayMeetings.length > 0 ? (
                                <div className="relative pl-8 border-l-2 border-slate-100 space-y-8 py-4">
                                    {[...dayMeetings]
                                        .sort((a, b) => (a.timeSlot || '').localeCompare(b.timeSlot || ''))
                                        .map((m, i) => (
                                            <motion.div
                                                initial={{ opacity: 0, x: -10 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: i * 0.08 }}
                                                key={m._id}
                                                className="relative"
                                            >
                                                <div className="absolute -left-[41px] top-1/2 -translate-y-1/2 w-4 h-4 rounded-full border-4 border-white bg-[#23471d] shadow-sm shadow-[#23471d]/40" />
                                                <div className="bg-white border border-slate-200 p-4 rounded-sm flex flex-col md:flex-row md:items-center gap-6 hover:border-[#23471d]/30 transition-all group">
                                                    {/* Time slot */}
                                                    <div className="md:w-32 shrink-0">
                                                        <span className="text-[11px] font-black text-[#23471d] uppercase tracking-tighter flex items-center gap-2">
                                                            <Clock size={12} />
                                                            {m.timeSlot?.split(' - ')[0] || 'TBD'}
                                                        </span>
                                                        {m.timeSlot?.split(' - ')[1] && (
                                                            <span className="text-[9px] text-slate-400 font-bold uppercase tracking-widest block mt-0.5">
                                                                {m.timeSlot.split(' - ')[1]}
                                                            </span>
                                                        )}
                                                    </div>
                                                    {/* Buyer info */}
                                                    <div className="flex-1 min-w-0">
                                                        <div className="flex items-center gap-2 mb-1">
                                                            <Users size={14} className="text-slate-400 shrink-0" />
                                                            <h4 className="text-[13px] font-black text-slate-800 uppercase tracking-tight group-hover:text-[#23471d] transition-colors truncate">
                                                                Meeting with {m.buyerId?.fullName || m.buyerId?.companyName || 'Buyer'}
                                                            </h4>
                                                        </div>
                                                        <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">
                                                            {m.buyerId?.companyName}
                                                            {m.buyerId?.country ? ` • ${m.buyerId.country}` : ''}
                                                        </p>
                                                    </div>
                                                    {/* Location */}
                                                    {m.location && (
                                                        <div className="md:border-l md:pl-6 shrink-0">
                                                            <span className="flex items-center gap-1.5 text-[10px] font-black text-[#ea580c] uppercase tracking-widest">
                                                                <MapPin size={12} /> {m.location}
                                                            </span>
                                                        </div>
                                                    )}
                                                    {/* Status */}
                                                    <div className="md:border-l md:pl-6 shrink-0">
                                                        <span className={`px-2 py-0.5 rounded-full text-[8px] font-black uppercase tracking-widest ${
                                                            m.status === 'Approved'
                                                                ? 'bg-green-100 text-green-700'
                                                                : 'bg-amber-100 text-amber-700'
                                                        }`}>
                                                            {m.status}
                                                        </span>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        ))}
                                </div>
                            ) : (
                                datedMeetings.length > 0 && (
                                    <div className="text-center py-12 bg-slate-50 border-2 border-dashed border-slate-200 text-slate-400 rounded-sm">
                                        <Clock size={32} className="mx-auto mb-2 opacity-20" />
                                        <p className="text-[11px] font-bold uppercase tracking-widest">
                                            No meetings for this day
                                        </p>
                                    </div>
                                )
                            )}

                            {/* Undated — interest registered, awaiting admin assignment */}
                            {undatedMeetings.length > 0 && (
                                <div className="pt-6 border-t border-dashed border-slate-200">
                                    <h3 className="text-[10px] font-black text-amber-600 uppercase tracking-widest mb-4 flex items-center gap-2">
                                        <AlertCircle size={13} />
                                        Interest Registered — Awaiting Admin Scheduling
                                    </h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                        {undatedMeetings.map((m) => (
                                            <motion.div
                                                key={m._id}
                                                initial={{ opacity: 0, y: 6 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                className="p-4 bg-amber-50 border border-amber-200 rounded-sm flex items-center gap-4"
                                            >
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-[12px] font-black text-slate-800 truncate">
                                                        {m.buyerId?.fullName || m.buyerId?.companyName || 'Buyer'}
                                                    </p>
                                                    <p className="text-[9px] text-slate-500 uppercase font-bold tracking-wider truncate">
                                                        {m.buyerId?.companyName}
                                                        {m.buyerId?.country ? ` • ${m.buyerId.country}` : ''}
                                                    </p>
                                                </div>
                                                <span className="px-2 py-0.5 rounded-full text-[8px] font-black uppercase tracking-widest bg-amber-100 text-amber-700 shrink-0">
                                                    Pending
                                                </span>
                                            </motion.div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </>
                    )}
                </div>
            )}
        </div>
    );
}
