import { useExhibitorCtx } from '../ExhibitorDashboard';
import ExhibitorInvoices from '@/components/dashboard/exhibitor/ExhibitorInvoices';

export default function ExhibitorInvoicesPage() {
    const { data } = useExhibitorCtx();
    const cur = data.participation?.currency === 'USD' ? '$' : '₹';
    const paid = data.amountPaid || 0;
    const total = data.participation?.total || 0;
    const balance = data.balanceAmount || 0;
    const paidPct = total > 0 ? Math.min(100, Math.round((paid / total) * 100)) : 0;
    const regDate = data.createdAt ? new Date(data.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }) : '—';
    return <ExhibitorInvoices data={data} cur={cur} total={total} paid={paid} balance={balance} paidPct={paidPct} regDate={regDate} />;
}
