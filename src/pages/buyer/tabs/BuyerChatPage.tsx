import { useBuyerCtx } from '@/context/BuyerContext';
import BuyerChatTab from '@/components/dashboard/buyer/BuyerChatTab';

export default function BuyerChatPage() {
    const { data } = useBuyerCtx();
    return (
        <div className="space-y-4">
            <div className="bg-white p-4 rounded-md border border-slate-200 shadow-sm">
                <h1 className="text-[13px] font-black uppercase tracking-widest text-slate-800">Chat Support</h1>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Connect with your Relationship Manager</p>
            </div>
            <BuyerChatTab data={data} />
        </div>
    );
}
