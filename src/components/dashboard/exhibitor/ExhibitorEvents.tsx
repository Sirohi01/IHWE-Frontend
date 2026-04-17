import { motion } from 'framer-motion';
import { Building2, MapPin, Calendar, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';

interface EventsProps {
    data: any;
    allRegistrations: any[];
    setLoading: (l: boolean) => void;
    fetchDashboard: (id?: string) => void;
    setActiveTab: (tab: any) => void;
}

export default function ExhibitorEvents({
    data,
    allRegistrations,
    setLoading,
    fetchDashboard,
    setActiveTab
}: EventsProps) {

    return (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <div className="bg-white border border-slate-200 rounded-md p-4">

                {/* Header */}
                <div className="mb-4 border-b pb-3">
                    <h1 className="text-[14px] font-semibold uppercase">My Events</h1>
                    <p className="text-[10px] text-slate-400">All Participations</p>
                </div>

                {/* Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">

                    {allRegistrations.map((reg: any) => {
                        const isActive = reg._id === data._id;

                        return (
                            <div
                                key={reg._id}
                                onClick={() => {
                                    if (!isActive) {
                                        setLoading(true);
                                        fetchDashboard(reg._id);
                                        setActiveTab('dashboard');
                                    }
                                }}
                                className={`
                                    relative p-3 border rounded-sm cursor-pointer transition-all
                                    ${isActive
                                        ? 'border-[#23471d] bg-[#23471d]/5'
                                        : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'}
                                `}
                            >

                                {/* Top */}
                                <div className="flex justify-between items-start mb-2">

                                    <div className={`
                                        w-8 h-8 flex items-center justify-center rounded
                                        ${isActive
                                            ? 'bg-[#23471d] text-white'
                                            : 'bg-slate-100 text-slate-400'}
                                    `}>
                                        <Building2 size={14} />
                                    </div>

                                    <span className={`
                                        px-2 py-0.5 text-[8px] font-bold uppercase rounded
                                        ${isActive
                                            ? 'bg-[#23471d] text-white'
                                            : 'bg-slate-100 text-slate-400'}
                                    `}>
                                        {isActive ? 'Active' : 'Past'}
                                    </span>

                                </div>

                                {/* Title */}
                                <div className="mb-2">
                                    <p className="text-[9px] text-slate-400 uppercase truncate">
                                        {reg.eventId?.name || 'IHWE'}
                                    </p>
                                    <h3 className="text-[12px] font-semibold text-slate-900 truncate">
                                        {reg.exhibitorName}
                                    </h3>
                                </div>

                                {/* Footer */}
                                <div className="flex items-center gap-2 text-[9px] text-slate-400 border-t pt-2">

                                    <div className="flex items-center gap-1">
                                        <MapPin size={10} />
                                        <span>{reg.participation?.stallFor || 'TBD'}</span>
                                    </div>

                                    <span>•</span>

                                    <div className="flex items-center gap-1">
                                        <Calendar size={10} />
                                        <span>
                                            {reg.eventId?.startDate
                                                ? new Date(reg.eventId.startDate).getFullYear()
                                                : '—'}
                                        </span>
                                    </div>

                                </div>

                            </div>
                        );
                    })}

                    {/* Add New */}
                    <Link
                        to="/book-a-stand"
                        className="flex flex-col items-center justify-center p-3 border border-dashed border-slate-300 rounded-sm hover:border-[#23471d] hover:bg-[#23471d]/5 transition-all"
                    >
                        <div className="w-8 h-8 flex items-center justify-center bg-slate-100 rounded mb-2 text-slate-400">
                            <Plus size={16} />
                        </div>
                        <p className="text-[9px] text-slate-400 uppercase text-center">
                            Book Stand
                        </p>
                    </Link>

                </div>
            </div>
        </motion.div>
    );
}