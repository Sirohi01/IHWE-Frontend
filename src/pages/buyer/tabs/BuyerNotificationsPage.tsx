
import BuyerNotifications from '@/components/dashboard/buyer/BuyerNotifications';

export default function BuyerNotificationsPage() {
    return (
        <div className="space-y-6">
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-[18px] font-black uppercase tracking-widest text-slate-800">Alert Center</h1>
                    <p className="text-[11px] text-slate-400 font-bold uppercase tracking-wider">Manage your notifications and stay updated</p>
                </div>
                <div className="px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg">
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mr-2 text-nowrap">Portal Status:</span>
                    <span className="text-[10px] font-black text-[#23471d] uppercase tracking-widest">Active</span>
                </div>
            </div>
            
            <BuyerNotifications />
        </div>
    );
}
