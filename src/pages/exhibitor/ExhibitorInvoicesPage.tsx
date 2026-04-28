import { useEffect, useState } from 'react';
import { useExhibitorCtx } from '@/context/ExhibitorContext';
import ExhibitorInvoices from '../../components/dashboard/exhibitor/ExhibitorInvoices';
import { settingsApi } from '@/lib/api';

import DashboardHero from '@/components/dashboard/DashboardHero';

export default function ExhibitorInvoicesPage() {
    const { data } = useExhibitorCtx();
    const [settings, setSettings] = useState<any>(null);

    useEffect(() => {
        settingsApi.get().then((s: any) => { if (s) setSettings(s); });
        // Fetch header image from public settings or template
        fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}/settings`)
            .then(r => r.json())
            .then(res => { if (res.success) setSettings(res.data); })
            .catch(() => {});
    }, []);

    const isUSD = data.participation?.currency === 'USD';
    const cur = isUSD ? 'USD ' : 'INR ';
    const paid = data.amountPaid || 0;
    const total = data.financeBreakdown?.netPayable || data.participation?.total || 0;
    const balance = data.balanceAmount || 0;
    const paidPct = total > 0 ? Math.min(100, Math.round((paid / total) * 100)) : 0;
    const regDate = data.createdAt
        ? new Date(data.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })
        : '';

    return (
        <div className="space-y-6">
            <DashboardHero 
                pageId="ex-invoices" 
                defaultTitle="Invoices & Finance" 
                defaultSubtitle="Track your payments and download official receipts"
                type="exhibitor" 
            />
            <ExhibitorInvoices
                data={data}
                settings={settings}
                cur={cur}
                total={total}
                paid={paid}
                balance={balance}
                paidPct={paidPct}
                regDate={regDate}
            />
        </div>
    );
}
