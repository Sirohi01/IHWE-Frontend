import { motion } from 'framer-motion';
import { Building2, MapPin, Calendar, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';

interface EventsProps {
    data: any; allRegistrations: any[];
    setLoading: (l: boolean) => void;
    fetchDashboard: (id?: string) => void;
    setActiveTab: (tab: any) => void;
}

export default function ExhibitorEvents({ data, allRegistrations, setLoading, fetchDashboard, setActiveTab }: EventsProps) {
    return (
        <motion.div key="events" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
            <div className="bg-white shadow-md p-4">
                <div className="pb-3 border-b border-gray-100 mb-4">
                    <h1 className="text-xl font-bold text-slate-900 uppercase tracking-tight">My Events</h1>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">All Exhibition Participations</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
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
                                className={`group relative p-5 border-2 rounded-[2px] transition-all duration-300 cursor-pointer overflow-hidden
                                    ${isActive
                                        ? 'border-[#23471d] bg-[#23471d]/5 shadow-md'
                                        : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50 hover:shadow-sm'
                                    }`}
                            >
                                {/* Decorative ball */}
                                <div className={`absolute top-0 right-0 w-24 h-24 rounded-full -mr-8 -mt-8 opacity-10 transition-all duration-700
                                    ${isActive ? 'bg-[#23471d]' : 'bg-slate-400 group-hover:bg-slate-600'}`} />

                                <div className="relative z-10 space-y-4">
                                    <div className="flex justify-between items-start">
                                        <div className={`w-10 h-10 flex items-center justify-center rounded-[2px] shadow-sm
                                            ${isActive ? 'bg-[#23471d] text-white' : 'bg-white text-slate-400 border border-slate-200'}`}>
                                            <Building2 size={18} />
                                        </div>
                                        <span className={`px-2 py-0.5 text-[9px] font-black uppercase tracking-widest rounded-[2px] border
                                            ${isActive ? 'bg-[#23471d] text-white border-[#23471d]' : 'bg-slate-100 text-slate-400 border-slate-200'}`}>
                                            {isActive ? 'Active' : 'Past'}
                                        </span>
                                    </div>

                                    <div>
                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 truncate">
                                            {reg.eventId?.name || 'IHWE'}
                                        </p>
                                        <h3 className="text-[13px] font-bold text-slate-900 leading-tight truncate">{reg.exhibitorName}</h3>
                                    </div>

                                    <div className="flex items-center gap-3 text-[10px] font-bold text-slate-400 pt-3 border-t border-slate-200">
                                        <div className="flex items-center gap-1">
                                            <MapPin size={10} />
                                            <span>{reg.participation?.stallFor || 'TBD'}</span>
                                        </div>
                                        <div className="w-1 h-1 rounded-full bg-slate-300" />
                                        <div className="flex items-center gap-1">
                                            <Calendar size={10} />
                                            <span>{reg.eventId?.startDate ? new Date(reg.eventId.startDate).getFullYear() : '—'}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}

                    {/* New Registration Card */}
                    <Link to="/book-a-stand" className="group flex flex-col items-center justify-center p-5 border-2 border-dashed border-slate-200 rounded-[2px] hover:border-[#23471d] hover:bg-[#23471d]/5 transition-all min-h-[160px]">
                        <div className="w-10 h-10 rounded-[2px] bg-slate-100 group-hover:bg-[#23471d]/10 flex items-center justify-center text-slate-400 group-hover:text-[#23471d] transition-all mb-3">
                            <Plus size={20} />
                        </div>
                        <p className="text-[10px] font-black text-slate-400 group-hover:text-[#23471d] uppercase tracking-widest text-center">Book New Stand</p>
                    </Link>
                </div>
            </div>
        </motion.div>
    );
}
