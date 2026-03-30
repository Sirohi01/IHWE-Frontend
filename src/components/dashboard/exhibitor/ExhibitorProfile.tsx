import { motion } from 'framer-motion';
import { Building2, BadgeCheck, Award, User, Briefcase, Hash, Calendar, ShieldCheck, FileText, Mail, Phone, MapPin } from 'lucide-react';
import { InfoRow } from './Shared';

interface ProfileProps {
    data: any;
}

export default function ExhibitorProfile({ data }: ProfileProps) {
    return (
        <motion.div
            key="profile"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="space-y-8"
        >
            <div className="bg-white rounded-[3rem] border border-slate-200 shadow-xl shadow-slate-200/40 overflow-hidden">
                <div className="px-10 py-10 border-b border-slate-100 bg-slate-50/50 flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="flex items-center gap-6">
                        <div className="w-16 h-16 rounded-[1.5rem] bg-slate-900 flex items-center justify-center text-white shadow-2xl shadow-slate-900/20">
                            <Building2 size={32} strokeWidth={2.5} />
                        </div>
                        <div>
                            <h2 className="text-2xl font-black text-slate-900 tracking-tight">Corporate Identity</h2>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mt-1 flex items-center gap-2">
                                <BadgeCheck size={12} className="text-emerald-500" /> Verified Industry Profile
                            </p>
                        </div>
                    </div>
                </div>

                <div className="p-10 space-y-12">
                    {/* Identity Section */}
                    <section>
                        <div className="flex items-center gap-4 mb-8">
                            <h3 className="text-[11px] font-black text-[#23471d] uppercase tracking-[0.25em] whitespace-nowrap bg-[#23471d]/5 px-5 py-2 rounded-full border border-[#23471d]/10">Registration Nucleus</h3>
                            <div className="h-px flex-1 bg-slate-100" />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            <InfoRow label="Official Entity" value={data.exhibitorName} icon={Award} />
                            <InfoRow label="Fascia/Brand" value={data.fasciaName || data.exhibitorName} icon={User} />
                            <InfoRow label="Industry Sector" value={data.industrySector} icon={Briefcase} />
                            <InfoRow label="Nature of Org" value={data.natureOfBusiness} icon={Hash} />
                            <InfoRow label="Business Framework" value={data.typeOfBusiness} icon={Building2} />
                            <InfoRow label="Institutional Web" value={data.website} icon={Calendar} />
                            <InfoRow label="Tax Identification (GST)" value={data.gstNo} icon={ShieldCheck} mono />
                            <InfoRow label="Financial ID (PAN)" value={data.panNo} icon={FileText} mono />
                        </div>
                    </section>

                    {/* Contact Grid */}
                    <section>
                        <div className="flex items-center gap-4 mb-8">
                            <h3 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.25em] whitespace-nowrap">Liaison Framework</h3>
                            <div className="h-px flex-1 bg-slate-100" />
                        </div>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            <div className="bg-slate-50/50 p-8 rounded-[2rem] border border-slate-100 space-y-6">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-3 py-1 bg-white rounded-full shadow-sm">Primary Delegate</span>
                                    <Mail size={16} className="text-slate-300" />
                                </div>
                                <div className="grid grid-cols-1 gap-4">
                                    <InfoRow label="Officer Name" value={`${data.contact1?.title} ${data.contact1?.firstName} ${data.contact1?.lastName}`} icon={User} />
                                    <InfoRow label="Global Email" value={data.contact1?.email} icon={Mail} />
                                    <InfoRow label="Direct Mobile" value={data.contact1?.mobile} icon={Phone} mono />
                                </div>
                            </div>
                            {data.contact2?.firstName && (
                                <div className="bg-slate-50/50 p-8 rounded-[2rem] border border-slate-100 space-y-6">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-3 py-1 bg-white rounded-full shadow-sm">Secondary Delegate</span>
                                        <Mail size={16} className="text-slate-300" />
                                    </div>
                                    <div className="grid grid-cols-1 gap-4">
                                        <InfoRow label="Officer Name" value={`${data.contact2?.title} ${data.contact2?.firstName} ${data.contact2?.lastName}`} icon={User} />
                                        <InfoRow label="Global Email" value={data.contact2?.email} icon={Mail} />
                                        <InfoRow label="Direct Mobile" value={data.contact2?.mobile} icon={Phone} mono />
                                    </div>
                                </div>
                            )}
                        </div>
                    </section>

                    {/* Geographic Footprint */}
                    <section>
                        <div className="flex items-center gap-4 mb-8">
                            <h3 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.25em] whitespace-nowrap">Geographic Footprint</h3>
                            <div className="h-px flex-1 bg-slate-100" />
                        </div>
                        <div className="bg-white p-8 rounded-[2rem] border border-slate-100 flex items-start gap-6">
                            <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400">
                                <MapPin size={22} />
                            </div>
                            <div className="space-y-1.5">
                                <p className="text-sm font-bold text-slate-900 leading-relaxed">{data.address}</p>
                                <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest">{[data.city, data.state, data.country, data.pincode].filter(Boolean).join(' • ')}</p>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </motion.div>
    );
}
