import { motion } from 'framer-motion';
import { Building2, MapPin, Calendar, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface EventsProps {
    data: any;
    allRegistrations: any[];
    setLoading: (l: boolean) => void;
    fetchDashboard: (id?: string) => void;
    setActiveTab: (tab: any) => void;
}

export default function ExhibitorEvents({ data, allRegistrations, setLoading, fetchDashboard, setActiveTab }: EventsProps) {
    return (
        <motion.div
            key="exhibitions"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="space-y-8"
        >
            <div className="bg-white rounded-[3rem] border border-slate-200 shadow-sm overflow-hidden">
                <div className="px-10 py-8 border-b border-slate-100 bg-slate-50/50">
                    <h2 className="text-xl font-black text-slate-900 tracking-tight">Institutional Participation</h2>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Cross-Event Identity Manager</p>
                </div>
                <div className="p-10">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {allRegistrations.map((reg: any) => (
                            <div
                                key={reg._id}
                                onClick={() => {
                                    if (reg._id !== data._id) {
                                        setLoading(true);
                                        fetchDashboard(reg._id);
                                        setActiveTab('dashboard');
                                    }
                                }}
                                className={`group relative p-8 rounded-[2.5rem] border-2 transition-all duration-500 cursor-pointer
                                        ${reg._id === data._id
                                        ? 'border-[#23471d] bg-[#23471d]/5 shadow-xl shadow-green-900/5'
                                        : 'border-slate-100 hover:border-slate-200 hover:bg-slate-50'}`}
                            >
                                <div className="space-y-6">
                                    <div className="flex justify-between items-start">
                                        <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-slate-400 group-hover:text-[#23471d] transition-colors shadow-sm">
                                            <Building2 size={24} />
                                        </div>
                                        <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest border ${reg._id === data._id ? 'bg-[#23471d] text-white' : 'bg-slate-100 text-slate-400'}`}>
                                            {reg._id === data._id ? 'Active Context' : 'Historical'}
                                        </span>
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5">{reg.eventId?.name || 'ANNUAL GATHERING'}</p>
                                        <h3 className="text-lg font-black text-slate-900 tracking-tight leading-tight">{reg.exhibitorName}</h3>
                                    </div>
                                    <div className="flex items-center gap-4 text-[11px] font-bold text-slate-400 border-t border-slate-100 pt-6">
                                        <div className="flex items-center gap-1.5"><MapPin size={12} /> {reg.participation?.stallFor || 'TBD'}</div>
                                        <div className="w-1 h-1 rounded-full bg-slate-200" />
                                        <div className="flex items-center gap-1.5"><Calendar size={12} /> {new Date(reg.eventId?.startDate).getFullYear()}</div>
                                    </div>
                                </div>
                            </div>
                        ))}

                        <Link
                            to="/book-a-stand"
                            className="group flex flex-col items-center justify-center p-8 rounded-[2.5rem] border-2 border-dashed border-slate-200 hover:border-[#23471d] hover:bg-[#23471d]/5 transition-all"
                        >
                            <div className="w-14 h-14 rounded-full bg-slate-50 group-hover:bg-[#23471d]/10 flex items-center justify-center text-slate-300 group-hover:text-[#23471d] transition-all mb-4">
                                <ArrowRight size={24} className="-rotate-45" />
                            </div>
                            <p className="text-[11px] font-black text-slate-400 group-hover:text-[#23471d] uppercase tracking-[0.2em]">New Event Registration</p>
                        </Link>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
