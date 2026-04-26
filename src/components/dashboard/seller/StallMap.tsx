import React, { useState, useEffect } from 'react';
import { 
    ZoomIn, ZoomOut, Maximize2, Filter,
    MapPin, CheckCircle2, XCircle, Clock,
    DollarSign, Ruler, Building2
} from 'lucide-react';
import { API_URL } from '@/lib/api';
import { toast } from 'sonner';

interface Stall {
    _id: string;
    stallNumber: string;
    hallNumber: string;
    size: number;
    type: string;
    price: number;
    currency: string;
    status: 'available' | 'booked' | 'reserved';
    isCorner: boolean;
    position: { x: number; y: number };
    exhibitorId?: string;
}

interface StallMapProps {
    onStallSelect?: (stall: Stall) => void;
    selectedStallId?: string;
}

export default function StallMap({ onStallSelect, selectedStallId }: StallMapProps) {
    const [stalls, setStalls] = useState<Stall[]>([]);
    const [loading, setLoading] = useState(true);
    const [zoom, setZoom] = useState(1);
    const [selectedHall, setSelectedHall] = useState<string>('all');
    const [sizeFilter, setSizeFilter] = useState<string>('all');
    const [typeFilter, setTypeFilter] = useState<string>('all');
    const [showCornerOnly, setShowCornerOnly] = useState(false);

    useEffect(() => {
        fetchStalls();
    }, []);

    const fetchStalls = async () => {
        try {
            const token = localStorage.getItem('exhibitorToken');
            const res = await fetch(`${API_URL}/seller-portal/stall-map`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            const d = await res.json();
            if (d.success) setStalls(d.data);
        } catch (err) {
            toast.error('Failed to load stall map');
        } finally {
            setLoading(false);
        }
    };

    const filteredStalls = stalls.filter(stall => {
        if (selectedHall !== 'all' && stall.hallNumber !== selectedHall) return false;
        if (sizeFilter !== 'all' && stall.size.toString() !== sizeFilter) return false;
        if (typeFilter !== 'all' && stall.type !== typeFilter) return false;
        if (showCornerOnly && !stall.isCorner) return false;
        return true;
    });

    const halls = [...new Set(stalls.map(s => s.hallNumber))].sort();
    const sizes = [...new Set(stalls.map(s => s.size))].sort((a, b) => a - b);
    const types = [...new Set(stalls.map(s => s.type))];

    const getStallColor = (stall: Stall) => {
        if (stall._id === selectedStallId) return '#2563eb'; // Blue - Selected
        switch (stall.status) {
            case 'available': return '#10b981'; // Green
            case 'booked': return '#ef4444'; // Red
            case 'reserved': return '#f59e0b'; // Yellow
            default: return '#94a3b8'; // Gray
        }
    };

    const getStallBorderColor = (stall: Stall) => {
        if (stall.isCorner) return '#d26019'; // Orange border for corner stalls
        return getStallColor(stall);
    };

    const handleStallClick = (stall: Stall) => {
        if (stall.status === 'available' && onStallSelect) {
            onStallSelect(stall);
        } else if (stall.status !== 'available') {
            toast.error('This stall is not available');
        }
    };

    const availableCount = filteredStalls.filter(s => s.status === 'available').length;
    const bookedCount = filteredStalls.filter(s => s.status === 'booked').length;
    const reservedCount = filteredStalls.filter(s => s.status === 'reserved').length;

    if (loading) {
        return (
            <div className="flex items-center justify-center h-96">
                <div className="w-8 h-8 border-4 border-[#23471d]/20 border-t-[#23471d] rounded-full animate-spin" />
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {/* Controls */}
            <div className="bg-white border border-slate-200 rounded-lg p-4">
                <div className="flex flex-wrap items-center gap-4">
                    {/* Hall Filter */}
                    <div className="flex items-center gap-2">
                        <Building2 size={16} className="text-slate-400" />
                        <select
                            value={selectedHall}
                            onChange={(e) => setSelectedHall(e.target.value)}
                            className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-bold uppercase focus:outline-none"
                        >
                            <option value="all">All Halls</option>
                            {halls.map(hall => (
                                <option key={hall} value={hall}>Hall {hall}</option>
                            ))}
                        </select>
                    </div>

                    {/* Size Filter */}
                    <div className="flex items-center gap-2">
                        <Ruler size={16} className="text-slate-400" />
                        <select
                            value={sizeFilter}
                            onChange={(e) => setSizeFilter(e.target.value)}
                            className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-bold uppercase focus:outline-none"
                        >
                            <option value="all">All Sizes</option>
                            {sizes.map(size => (
                                <option key={size} value={size}>{size} sqm</option>
                            ))}
                        </select>
                    </div>

                    {/* Type Filter */}
                    <select
                        value={typeFilter}
                        onChange={(e) => setTypeFilter(e.target.value)}
                        className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-bold uppercase focus:outline-none"
                    >
                        <option value="all">All Types</option>
                        {types.map(type => (
                            <option key={type} value={type}>{type}</option>
                        ))}
                    </select>

                    {/* Corner Stalls */}
                    <label className="flex items-center gap-2 cursor-pointer">
                        <input
                            type="checkbox"
                            checked={showCornerOnly}
                            onChange={(e) => setShowCornerOnly(e.target.checked)}
                            className="w-4 h-4 text-[#23471d] rounded focus:ring-[#23471d]"
                        />
                        <span className="text-xs font-bold text-slate-600 uppercase">Corner Stalls Only</span>
                    </label>

                    {/* Zoom Controls */}
                    <div className="flex items-center gap-2 ml-auto">
                        <button
                            onClick={() => setZoom(Math.max(0.5, zoom - 0.25))}
                            className="p-2 bg-slate-50 border border-slate-200 rounded-lg hover:bg-slate-100"
                        >
                            <ZoomOut size={16} />
                        </button>
                        <span className="text-xs font-bold text-slate-600">{Math.round(zoom * 100)}%</span>
                        <button
                            onClick={() => setZoom(Math.min(2, zoom + 0.25))}
                            className="p-2 bg-slate-50 border border-slate-200 rounded-lg hover:bg-slate-100"
                        >
                            <ZoomIn size={16} />
                        </button>
                        <button
                            onClick={() => setZoom(1)}
                            className="p-2 bg-slate-50 border border-slate-200 rounded-lg hover:bg-slate-100"
                        >
                            <Maximize2 size={16} />
                        </button>
                    </div>
                </div>

                {/* Legend */}
                <div className="flex flex-wrap items-center gap-4 mt-4 pt-4 border-t border-slate-100">
                    <div className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-green-500 rounded" />
                        <span className="text-xs font-bold text-slate-600">Available ({availableCount})</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-red-500 rounded" />
                        <span className="text-xs font-bold text-slate-600">Booked ({bookedCount})</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-yellow-500 rounded" />
                        <span className="text-xs font-bold text-slate-600">Reserved ({reservedCount})</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-blue-500 rounded" />
                        <span className="text-xs font-bold text-slate-600">Your Selection</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-4 border-orange-500 rounded" />
                        <span className="text-xs font-bold text-slate-600">Corner Stall</span>
                    </div>
                </div>
            </div>

            {/* Map */}
            <div className="bg-white border border-slate-200 rounded-lg p-6 overflow-auto">
                <div 
                    className="relative min-h-[600px]"
                    style={{ 
                        transform: `scale(${zoom})`,
                        transformOrigin: 'top left',
                        width: `${100 / zoom}%`
                    }}
                >
                    {/* Grid Background */}
                    <div className="absolute inset-0 bg-slate-50" style={{
                        backgroundImage: 'linear-gradient(#e2e8f0 1px, transparent 1px), linear-gradient(90deg, #e2e8f0 1px, transparent 1px)',
                        backgroundSize: '50px 50px'
                    }} />

                    {/* Stalls */}
                    {filteredStalls.map(stall => (
                        <div
                            key={stall._id}
                            onClick={() => handleStallClick(stall)}
                            className={`absolute group ${stall.status === 'available' ? 'cursor-pointer hover:shadow-lg' : 'cursor-not-allowed'}`}
                            style={{
                                left: `${stall.position.x}px`,
                                top: `${stall.position.y}px`,
                                width: `${Math.sqrt(stall.size) * 10}px`,
                                height: `${Math.sqrt(stall.size) * 10}px`,
                                backgroundColor: getStallColor(stall),
                                borderWidth: stall.isCorner ? '4px' : '2px',
                                borderColor: getStallBorderColor(stall),
                                borderStyle: 'solid',
                                borderRadius: '4px',
                                transition: 'all 0.2s'
                            }}
                        >
                            {/* Stall Info */}
                            <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-2">
                                <span className="text-xs font-black">{stall.stallNumber}</span>
                                <span className="text-[8px] font-bold">{stall.size} sqm</span>
                            </div>

                            {/* Hover Tooltip */}
                            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block z-10">
                                <div className="bg-slate-900 text-white px-3 py-2 rounded-lg text-xs font-bold whitespace-nowrap shadow-lg">
                                    <p className="font-black">{stall.stallNumber}</p>
                                    <p className="text-[10px] text-slate-300">Hall {stall.hallNumber} • {stall.size} sqm</p>
                                    <p className="text-[10px] text-slate-300">{stall.type}</p>
                                    <p className="text-[10px] text-slate-300">{stall.currency} {stall.price.toLocaleString()}</p>
                                    {stall.isCorner && <p className="text-[10px] text-orange-400">Corner Stall</p>}
                                    <p className={`text-[10px] font-black mt-1 ${
                                        stall.status === 'available' ? 'text-green-400' :
                                        stall.status === 'booked' ? 'text-red-400' : 'text-yellow-400'
                                    }`}>
                                        {stall.status.toUpperCase()}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-white border border-slate-200 rounded-lg p-4">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Total Stalls</p>
                    <p className="text-2xl font-black text-slate-800">{filteredStalls.length}</p>
                </div>
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <p className="text-[10px] font-black text-green-600 uppercase tracking-widest mb-1">Available</p>
                    <p className="text-2xl font-black text-green-700">{availableCount}</p>
                </div>
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <p className="text-[10px] font-black text-red-600 uppercase tracking-widest mb-1">Booked</p>
                    <p className="text-2xl font-black text-red-700">{bookedCount}</p>
                </div>
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <p className="text-[10px] font-black text-yellow-600 uppercase tracking-widest mb-1">Reserved</p>
                    <p className="text-2xl font-black text-yellow-700">{reservedCount}</p>
                </div>
            </div>
        </div>
    );
}
