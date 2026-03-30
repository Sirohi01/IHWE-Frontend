export function InfoRow({ label, value, mono = false, icon: Icon }: { label: string; value?: string | null; mono?: boolean; icon?: any }) {
    return (
        <div className="flex items-start gap-3.5 p-4 rounded-2xl border border-slate-100 bg-white/50 hover:bg-white hover:border-[#23471d]/20 hover:shadow-sm transition-all group">
            {Icon && (
                <div className="w-9 h-9 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-[#23471d]/10 group-hover:text-[#23471d] transition-all shrink-0">
                    <Icon size={16} strokeWidth={2.5} />
                </div>
            )}
            <div className="min-w-0">
                <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">{label}</p>
                <p className={`text-[13px] font-black text-slate-900 truncate ${mono ? 'font-mono tracking-wider' : ''}`}>
                    {value || <span className="text-slate-300 font-bold italic opacity-50">Not Provided</span>}
                </p>
            </div>
        </div>
    );
}
