import { useState, useEffect } from 'react';
import {
    Search, RefreshCw, Loader2, AlertTriangle,
    Building2, Ruler, Calendar, User, Hash,
    ChevronLeft, ChevronRight, MapPin
} from 'lucide-react';
import { API_URL } from '@/lib/api';
import { toast } from 'sonner';

interface Stall {
    _id: string;
    stallNumber: string;
    length: number;
    width: number;
    area: number;
    plScheme: string;
    incrementPercentage: number;
    discountPercentage: number;
    status: 'available' | 'booked' | 'reserved';
    eventId: { _id: string; name: string };
    bookedBy?: string | null;
    bookedByInfo?: {
        exhibitorName: string;
        registrationId: string;
        bookedAt: string;
    };
    createdAt: string;
}

interface EventInfo {
    _id: string;
    name: string;
    startDate?: string;
    endDate?: string;
    location?: string;
}

interface StallMapProps {
    onStallSelect?: (stall: Stall) => void;
    selectedStallId?: string;
    currentUserRegId?: string;
}

const BOOKED_PAGE_SIZE = 8;

export default function StallMap({ onStallSelect, selectedStallId, currentUserRegId }: StallMapProps) {
    const [stalls, setStalls] = useState<Stall[]>([]);
    const [event, setEvent] = useState<EventInfo | null>(null);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState<'all' | 'available' | 'booked' | 'reserved'>('all');
    const [schemeFilter, setSchemeFilter] = useState('all');
    const [bookedPage, setBookedPage] = useState(1);

    useEffect(() => { fetchStalls(); }, []);

    const fetchStalls = async () => {
        setLoading(true);
        try {
            const token = localStorage.getItem('exhibitorToken');
            const res = await fetch(`${API_URL}/seller-portal/stall-map`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            const d = await res.json();
            if (d.success) {
                setStalls(d.data || []);
                setEvent(d.event || null);
            }
        } catch {
            toast.error('Failed to load stall data');
        } finally {
            setLoading(false);
        }
    };

    const handleStallClick = (stall: Stall) => {
        // Do nothing - user cannot select stalls, only view their booked stall
    };

    const schemes = [...new Set(stalls.map(s => s.plScheme))].filter(Boolean);

    const filteredStalls = stalls.filter(s => {
        const matchSearch = s.stallNumber.toLowerCase().includes(searchTerm.toLowerCase());
        const matchStatus = statusFilter === 'all' || s.status === statusFilter;
        const matchScheme = schemeFilter === 'all' || s.plScheme === schemeFilter;
        return matchSearch && matchStatus && matchScheme;
    });

    const availableCount = stalls.filter(s => s.status === 'available').length;
    const bookedCount   = stalls.filter(s => s.status === 'booked').length;
    const reservedCount = stalls.filter(s => s.status === 'reserved').length;

    // Booked stalls pagination
    const bookedStalls = stalls.filter(s => s.status === 'booked');
    const bookedTotalPages = Math.ceil(bookedStalls.length / BOOKED_PAGE_SIZE);
    const paginatedBooked = bookedStalls.slice(
        (bookedPage - 1) * BOOKED_PAGE_SIZE,
        bookedPage * BOOKED_PAGE_SIZE
    );

    // Stall card styles
    const getCardStyle = (status: string, isSelected: boolean, bookedByRegId?: string) => {
        // Show selected style for available stalls OR booked stalls that belong to current user
        const isCurrentUserBooked = status === 'booked' && bookedByRegId === currentUserRegId;
        if ((isSelected && status === 'available') || isCurrentUserBooked) return {
            wrapper: 'border-blue-500 bg-blue-600 shadow-lg shadow-blue-200 scale-[1.03]',
            number: 'text-white',
            meta: 'text-blue-100',
            scheme: 'text-blue-200',
        };
        switch (status) {
            case 'available': return {
                wrapper: 'border-emerald-300 bg-gradient-to-br from-emerald-50 to-white opacity-60',
                number: 'text-emerald-800',
                meta: 'text-emerald-600',
                scheme: 'text-emerald-400',
            };
            case 'booked': return {
                wrapper: 'border-red-200 bg-gradient-to-br from-red-50 to-white cursor-not-allowed opacity-80',
                number: 'text-red-700',
                meta: 'text-red-500',
                scheme: 'text-red-300',
            };
            case 'reserved': return {
                wrapper: 'border-amber-300 bg-gradient-to-br from-amber-50 to-white cursor-not-allowed opacity-80',
                number: 'text-amber-700',
                meta: 'text-amber-500',
                scheme: 'text-amber-300',
            };
            default: return {
                wrapper: 'border-gray-200 bg-gray-50',
                number: 'text-gray-600',
                meta: 'text-gray-400',
                scheme: 'text-gray-300',
            };
        }
    };

    const getStatusDot = (status: string) => {
        switch (status) {
            case 'available': return 'bg-emerald-500';
            case 'booked':    return 'bg-red-500';
            case 'reserved':  return 'bg-amber-500';
            default:          return 'bg-gray-400';
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="flex flex-col items-center gap-3">
                    <Loader2 className="w-8 h-8 text-[#23471d] animate-spin" />
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Loading Stalls...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-4">

            {/* ── Event Banner ── */}
            {event && (
                <div className="bg-gradient-to-r from-[#23471d] to-[#2d5a25] rounded-xl px-5 py-4 flex flex-wrap items-center gap-4 shadow-sm">
                    <div className="flex items-center gap-3">
                        <div className="w-9 h-9 bg-white/15 rounded-lg flex items-center justify-center shrink-0">
                            <Building2 className="w-4 h-4 text-white" />
                        </div>
                        <div>
                            <p className="text-[9px] text-white/50 font-black uppercase tracking-widest">Current Event</p>
                            <p className="text-sm font-black text-white leading-tight">{event.name}</p>
                        </div>
                    </div>
                    {event.location && (
                        <>
                            <div className="w-px h-8 bg-white/20 hidden sm:block" />
                            <div className="flex items-center gap-2">
                                <MapPin className="w-3.5 h-3.5 text-white/60" />
                                <div>
                                    <p className="text-[9px] text-white/50 font-black uppercase tracking-widest">Location</p>
                                    <p className="text-xs font-bold text-white">{event.location}</p>
                                </div>
                            </div>
                        </>
                    )}
                    {event.startDate && (
                        <>
                            <div className="w-px h-8 bg-white/20 hidden sm:block" />
                            <div className="flex items-center gap-2">
                                <Calendar className="w-3.5 h-3.5 text-white/60" />
                                <div>
                                    <p className="text-[9px] text-white/50 font-black uppercase tracking-widest">Dates</p>
                                    <p className="text-xs font-bold text-white">
                                        {new Date(event.startDate).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
                                        {event.endDate && ` – ${new Date(event.endDate).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}`}
                                    </p>
                                </div>
                            </div>
                        </>
                    )}
                    <button
                        onClick={fetchStalls}
                        className="ml-auto flex items-center gap-1.5 px-3 py-1.5 bg-white/10 hover:bg-white/20 rounded-lg text-white text-[10px] font-black uppercase transition-colors border border-white/20"
                    >
                        <RefreshCw className="w-3 h-3" /> Refresh
                    </button>
                </div>
            )}

            {/* ── Stats ── */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                    { label: 'Total Stalls', value: stalls.length,  dot: 'bg-gray-400',    card: 'bg-white border-gray-200' },
                    { label: 'Available',    value: availableCount, dot: 'bg-emerald-500', card: 'bg-emerald-50 border-emerald-200' },
                    { label: 'Booked',       value: bookedCount,    dot: 'bg-red-500',     card: 'bg-red-50 border-red-200' },
                    { label: 'Reserved',     value: reservedCount,  dot: 'bg-amber-500',   card: 'bg-amber-50 border-amber-200' },
                ].map(stat => (
                    <div key={stat.label} className={`border rounded-xl p-4 flex items-center gap-3 ${stat.card}`}>
                        <div className={`w-3 h-3 rounded-full shrink-0 ${stat.dot}`} />
                        <div>
                            <p className="text-2xl font-black text-gray-800 leading-none">{stat.value}</p>
                            <p className="text-[9px] font-black uppercase tracking-wider text-gray-500 mt-0.5">{stat.label}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* ── Filters ── */}
            <div className="bg-white border border-gray-200 rounded-xl p-3 flex flex-wrap items-center gap-2.5">
                <div className="relative flex-1 min-w-[150px]">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-3.5 h-3.5" />
                    <input
                        type="text"
                        placeholder="Search stall no..."
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                        className="w-full pl-8 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-bold focus:outline-none focus:border-[#23471d] transition-colors"
                    />
                </div>
                <div className="flex items-center gap-1.5 flex-wrap">
                    {(['all', 'available', 'booked', 'reserved'] as const).map(s => (
                        <button
                            key={s}
                            onClick={() => setStatusFilter(s)}
                            className={`px-3 py-1.5 text-[10px] font-black uppercase rounded-lg border-2 transition-all ${
                                statusFilter === s
                                    ? 'bg-[#23471d] text-white border-[#23471d]'
                                    : 'bg-white text-gray-600 border-gray-200 hover:border-gray-400'
                            }`}
                        >
                            {s === 'all' ? 'All' : s}
                        </button>
                    ))}
                </div>
                {schemes.length > 1 && (
                    <select
                        value={schemeFilter}
                        onChange={e => setSchemeFilter(e.target.value)}
                        className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-bold focus:outline-none focus:border-[#23471d]"
                    >
                        <option value="all">All Schemes</option>
                        {schemes.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                )}
                <span className="ml-auto text-[10px] font-black text-gray-400 uppercase tracking-wider">
                    {filteredStalls.length} stalls
                </span>
            </div>

            {/* ── Stall Layout Grid ── */}
            {stalls.length === 0 ? (
                <div className="bg-white border border-gray-200 rounded-xl py-16 text-center">
                    <Building2 className="w-12 h-12 text-gray-200 mx-auto mb-3" />
                    <p className="text-sm font-bold text-gray-400">No stalls found for this event</p>
                    <p className="text-xs text-gray-300 mt-1">Admin needs to add stalls from the admin panel</p>
                </div>
            ) : (
                <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
                    {/* Header with legend */}
                    <div className="bg-slate-800 px-5 py-3 flex flex-wrap items-center justify-between gap-3">
                        <div className="flex items-center gap-2">
                            <Hash className="w-4 h-4 text-white/60" />
                            <span className="text-white font-black text-sm uppercase tracking-tight">Stall Layout</span>
                            <span className="bg-white/10 text-white/70 text-[9px] font-black px-2 py-0.5 rounded-full uppercase ml-1">
                                {filteredStalls.length} stalls
                            </span>
                        </div>
                        <div className="flex items-center gap-4">
                            {[
                                { dot: 'bg-emerald-400', label: 'Available' },
                                { dot: 'bg-red-400',     label: 'Booked' },
                                { dot: 'bg-amber-400',   label: 'Reserved' },
                                { dot: 'bg-blue-500',    label: 'Selected' },
                            ].map(l => (
                                <div key={l.label} className="flex items-center gap-1.5">
                                    <div className={`w-2.5 h-2.5 rounded-full ${l.dot}`} />
                                    <span className="text-[9px] text-white/60 font-bold uppercase">{l.label}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Grid */}
                    <div className="p-5 bg-slate-50/50 relative">
                        {filteredStalls.length === 0 ? (
                            <div className="py-12 text-center">
                                <p className="text-sm font-bold text-gray-400">No stalls match your filters</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 auto-rows-max relative z-0 overflow-visible">
                                {filteredStalls.map(stall => {
                                    const isSelected = stall._id === selectedStallId;
                                    const style = getCardStyle(stall.status, isSelected, stall.bookedByInfo?.registrationId);
                                    return (
                                        <div
                                            key={stall._id}
                                            className={`relative group border-2 rounded-xl p-3 transition-all duration-150 overflow-visible ${style.wrapper}`}
                                        >
                                            {/* Status dot */}
                                            <div className={`absolute top-2.5 left-2.5 w-2 h-2 rounded-full ${getStatusDot(isSelected ? 'selected' : stall.status)} ${isSelected ? 'bg-white' : ''}`} />

                                            {/* Increment / Discount badge */}
                                            {stall.incrementPercentage > 0 && (
                                                <span className="absolute top-2 right-2 text-[7px] font-black bg-red-500 text-white px-1.5 py-0.5 rounded-full leading-none">
                                                    +{stall.incrementPercentage}%
                                                </span>
                                            )}
                                            {stall.discountPercentage > 0 && (
                                                <span className="absolute top-2 right-2 text-[7px] font-black bg-emerald-500 text-white px-1.5 py-0.5 rounded-full leading-none">
                                                    -{stall.discountPercentage}%
                                                </span>
                                            )}

                                            {/* Content */}
                                            <div className="mt-3">
                                                <p className={`text-base font-black uppercase tracking-tight leading-none ${style.number}`}>
                                                    {stall.stallNumber}
                                                </p>
                                                <div className={`flex items-center gap-1 mt-1.5 ${style.meta}`}>
                                                    <Ruler className="w-2.5 h-2.5 shrink-0" />
                                                    <span className="text-[10px] font-bold">
                                                        {stall.length}×{stall.width}m
                                                    </span>
                                                </div>
                                                <p className={`text-[11px] font-black mt-0.5 ${style.meta}`}>
                                                    {stall.area} sqm
                                                </p>
                                                <p className={`text-[8px] font-bold uppercase mt-1.5 leading-none ${style.scheme}`}>
                                                    {stall.plScheme?.replace(' Open', '')}
                                                </p>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                </div>
            )}
            {bookedCount > 0 && (
                <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
                    {/* Header */}
                    <div className="bg-red-600 px-5 py-3 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <AlertTriangle className="w-4 h-4 text-white" />
                            <h3 className="text-white font-black text-sm uppercase tracking-tight">Booked Stalls</h3>
                        </div>
                        <span className="bg-white/20 text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wider">
                            {bookedCount} Booked
                        </span>
                    </div>

                    {/* Table */}
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-slate-50 border-b border-slate-200">
                                <tr>
                                    {['#', 'Stall No.', 'Dimensions', 'PL Scheme', 'Booked By', 'Reg. ID', 'Booked On'].map(h => (
                                        <th key={h} className="px-4 py-3 text-left text-[9px] font-black text-slate-500 uppercase tracking-wider whitespace-nowrap">{h}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {paginatedBooked.map((stall, i) => (
                                    <tr key={stall._id} className="hover:bg-slate-50/70 transition-colors">
                                        <td className="px-4 py-3 text-xs text-gray-400 font-bold">
                                            {(bookedPage - 1) * BOOKED_PAGE_SIZE + i + 1}
                                        </td>
                                        <td className="px-4 py-3">
                                            <span className="text-sm font-black text-red-600">{stall.stallNumber}</span>
                                        </td>
                                        <td className="px-4 py-3">
                                            <div className="flex items-center gap-1">
                                                <Ruler className="w-3 h-3 text-gray-400" />
                                                <span className="text-xs font-bold text-slate-700">
                                                    {stall.length}×{stall.width}m
                                                </span>
                                                <span className="text-[10px] font-black text-[#23471d] ml-1">
                                                    {stall.area} sqm
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-4 py-3">
                                            <span className="text-[9px] font-black uppercase px-2 py-1 bg-slate-100 text-slate-600 rounded-md whitespace-nowrap">
                                                {stall.plScheme}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3">
                                            <div className="flex items-center gap-1.5">
                                                <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center shrink-0">
                                                    <User className="w-3 h-3 text-red-500" />
                                                </div>
                                                <span className="text-xs font-black text-slate-800">
                                                    {stall.bookedByInfo?.exhibitorName || '—'}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-4 py-3">
                                            <span className="text-[10px] font-mono text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                                                {stall.bookedByInfo?.registrationId || '—'}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3 whitespace-nowrap">
                                            <span className="text-xs text-slate-500 font-bold">
                                                {stall.bookedByInfo?.bookedAt
                                                    ? new Date(stall.bookedByInfo.bookedAt).toLocaleDateString('en-IN', {
                                                        day: '2-digit', month: 'short', year: 'numeric'
                                                    })
                                                    : '—'}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination Footer */}
                    <div className="px-5 py-3 border-t border-gray-100 bg-slate-50/50 flex flex-col sm:flex-row items-center justify-between gap-3">
                        <p className="text-[10px] text-gray-400 font-black uppercase tracking-wider">
                            Showing{' '}
                            <span className="text-red-600">{(bookedPage - 1) * BOOKED_PAGE_SIZE + 1}–{Math.min(bookedPage * BOOKED_PAGE_SIZE, bookedCount)}</span>
                            {' '}of{' '}
                            <span className="text-red-600">{bookedCount}</span> booked stalls
                        </p>
                        {bookedTotalPages > 1 && (
                            <div className="flex items-center gap-1.5">
                                <button
                                    onClick={() => setBookedPage(p => Math.max(1, p - 1))}
                                    disabled={bookedPage === 1}
                                    className="p-1.5 px-3 border border-slate-200 bg-white text-slate-700 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-slate-50 transition-all rounded-lg"
                                >
                                    <ChevronLeft className="w-4 h-4" />
                                </button>
                                {[...Array(bookedTotalPages)].map((_, i) => (
                                    <button
                                        key={i}
                                        onClick={() => setBookedPage(i + 1)}
                                        className={`w-8 h-8 text-[11px] font-black border transition-all rounded-lg ${
                                            bookedPage === i + 1
                                                ? 'bg-red-600 text-white border-red-600'
                                                : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                                        }`}
                                    >
                                        {i + 1}
                                    </button>
                                ))}
                                <button
                                    onClick={() => setBookedPage(p => Math.min(bookedTotalPages, p + 1))}
                                    disabled={bookedPage === bookedTotalPages}
                                    className="p-1.5 px-3 border border-slate-200 bg-white text-slate-700 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-slate-50 transition-all rounded-lg"
                                >
                                    <ChevronRight className="w-4 h-4" />
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
