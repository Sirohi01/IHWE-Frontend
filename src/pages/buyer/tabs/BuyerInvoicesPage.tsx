import { useBuyerCtx } from '@/context/BuyerContext';
import BuyerInvoices from '@/components/dashboard/buyer/BuyerInvoices';
import { useEffect, useState } from 'react';
import { settingsApi } from '@/lib/api';

export default function BuyerInvoicesPage() {
    const { data } = useBuyerCtx();
    const [settings, setSettings] = useState<any>(null);

    useEffect(() => {
        settingsApi.get().then(setSettings);
    }, []);

    const cur = '₹';
    const total = typeof data.registrationFee === 'string' 
        ? Number(data.registrationFee.replace(/[^0-9.]/g, '')) || 0 
        : Number(data.registrationFee) || 0;
    const paid = data.paymentStatus === 'Completed' ? total : 0;
    const balance = total - paid;
    const paidPct = total > 0 ? (paid / total) * 100 : 0;

    return (
        <div className="space-y-4">
            <div className="bg-white p-4 rounded-md border border-slate-200 shadow-sm">
                <h1 className="text-[13px] font-black uppercase tracking-widest text-slate-800">Invoices & Receipts</h1>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Official tax invoice for your registration</p>
            </div>
            <BuyerInvoices 
                data={data} 
                settings={settings} 
                cur={cur} 
                total={total} 
                paid={paid} 
                balance={balance} 
                paidPct={paidPct} 
                regDate={new Date(data.createdAt).toLocaleDateString()} 
            />
        </div>
    );
}
