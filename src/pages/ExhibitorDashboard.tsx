import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';
import { API_URL, settingsApi } from '@/lib/api';

// Old sub-components (kept for tabs)
import { STATUS_CONFIG } from '@/components/dashboard/exhibitor/types';
import ExhibitorOverview from '@/components/dashboard/exhibitor/ExhibitorOverview';
import ExhibitorProfile from '@/components/dashboard/exhibitor/ExhibitorProfile';
import ExhibitorInvoices from '@/components/dashboard/exhibitor/ExhibitorInvoices';
import ExhibitorEvents from '@/components/dashboard/exhibitor/ExhibitorEvents';
import ExhibitorMSME from '@/components/dashboard/exhibitor/ExhibitorMSME';
import SecurityModal from '@/components/dashboard/exhibitor/SecurityModal';
import PrintCertificate from '@/components/dashboard/exhibitor/PrintCertificate';
import StallExtras from '@/components/dashboard/exhibitor/StallExtras';
import ExhibitorChatTab from '@/components/dashboard/exhibitor/ExhibitorChatTab';

// New admin-style layout components
import ExhibitorLayout from '@/components/dashboard/exhibitor2/ExhibitorLayout';
import ExhibitorStatsGrid from '@/components/dashboard/exhibitor2/ExhibitorStatsGrid';
import ExhibitorModuleGrid from '@/components/dashboard/exhibitor2/ExhibitorModuleGrid';
import HeroSection from '@/components/home/HeroSection';

export default function ExhibitorDashboard() {
    const navigate = useNavigate();
    const [data, setData] = useState<any>(null);
    const [allRegistrations, setAllRegistrations] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState<'dashboard' | 'profile' | 'invoices' | 'payments' | 'exhibitions' | 'msme' | 'accessories' | 'chat'>('dashboard');
    const [unreadChat, setUnreadChat] = useState(0);
    const [showChangePwd, setShowChangePwd] = useState(false);
    const [pwdForm, setPwdForm] = useState({ current: '', newPwd: '', confirm: '' });
    const [pwdLoading, setPwdLoading] = useState(false);
    const [showPwd, setShowPwd] = useState({ current: false, newPwd: false });
    const [logo, setLogo] = useState<string | null>(null);

    const fetchDashboard = async (regId?: string) => {
        const token = localStorage.getItem('exhibitorToken');
        if (!token) { navigate('/exhibitor-login'); return; }

        let url = `${API_URL}/exhibitor-auth/dashboard`;
        if (regId) url += `?id=${regId}`;

        try {
            const r = await fetch(url, { headers: { Authorization: `Bearer ${token}` } });
            const res = await r.json();
            if (res.success) {
                setData(res.data);
                if (res.allRegistrations) setAllRegistrations(res.allRegistrations);
                // Fetch unread chat count
                if (res.data?._id) {
                    fetch(`${API_URL}/chat/unread/${res.data._id}`, {
                        headers: { Authorization: `Bearer ${token}` }
                    }).then(r => r.json()).then(r => { if (r.success) setUnreadChat(r.count); }).catch(() => {});
                }
            } else {
                toast.error(res.message);
                if (res.message === 'Token expired or invalid') {
                    localStorage.removeItem('exhibitorToken');
                    navigate('/exhibitor-login');
                }
            }
        } catch {
            toast.error('Failed to load dashboard.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDashboard();
        settingsApi.get().then(s => { if (s?.logo) setLogo(s.logo); });

        // Re-fetch when tab becomes visible (user switches back to this tab)
        const handleVisibility = () => {
            if (document.visibilityState === 'visible') fetchDashboard();
        };
        document.addEventListener('visibilitychange', handleVisibility);

        // Poll every 30s so status changes from admin reflect automatically
        const poll = setInterval(() => fetchDashboard(), 30000);

        return () => {
            document.removeEventListener('visibilitychange', handleVisibility);
            clearInterval(poll);
        };
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('exhibitorToken');
        navigate('/exhibitor-login');
    };

    const handleChangePassword = async (e: React.FormEvent) => {
        e.preventDefault();
        if (pwdForm.newPwd !== pwdForm.confirm) { toast.error('New passwords do not match'); return; }
        if (pwdForm.newPwd.length < 6) { toast.error('Password must be at least 6 characters'); return; }
        setPwdLoading(true);
        try {
            const res = await fetch(`${API_URL}/exhibitor-auth/change-password`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${localStorage.getItem('exhibitorToken')}` },
                body: JSON.stringify({ currentPassword: pwdForm.current, newPassword: pwdForm.newPwd })
            });
            const result = await res.json();
            if (result.success) {
                toast.success('Password changed successfully');
                setShowChangePwd(false);
                setPwdForm({ current: '', newPwd: '', confirm: '' });
            } else {
                toast.error(result.message);
            }
        } catch { toast.error('Failed to change password'); }
        finally { setPwdLoading(false); }
    };

    if (loading) return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center print:hidden">
            <div className="flex flex-col items-center gap-3">
                <div className="w-10 h-10 rounded-full border-[3px] border-[#23471d]/20 border-t-[#23471d] animate-spin" />
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Loading Portal...</p>
            </div>
        </div>
    );

    if (!data) return null;

    const cur = data.participation?.currency === 'USD' ? '$' : '\u20B9';
    const status = STATUS_CONFIG[data.status] || STATUS_CONFIG.pending;
    const paid = data.amountPaid || 0;
    const total = data.participation?.total || 0;
    const balance = data.balanceAmount || 0;
    const paidPct = total > 0 ? Math.min(100, Math.round((paid / total) * 100)) : 0;
    const regDate = data.createdAt ? new Date(data.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }) : '—';

    return (
        <ExhibitorLayout
            logo={logo}
            data={data}
            activeTab={activeTab}
            setActiveTab={(tab) => { setActiveTab(tab); if (tab === 'chat') setUnreadChat(0); }}
            handleLogout={handleLogout}
            onChangePwd={() => setShowChangePwd(true)}
            unreadChat={unreadChat}
        >
            <AnimatePresence mode="wait">

                {activeTab === 'dashboard' && (
                    <div className="space-y-4">
                        <HeroSection onRegisterVisit={() => {}} />
                        <div className="bg-white shadow-sm">
                            <ExhibitorModuleGrid
                                data={data}
                                cur={cur}
                                paid={paid}
                                total={total}
                                balance={balance}
                                paidPct={paidPct}
                                setActiveTab={setActiveTab}
                            />
                        </div>
                        <ExhibitorOverview
                            data={data}
                            cur={cur}
                            status={status}
                            paidPct={paidPct}
                            paid={paid}
                            total={total}
                            balance={balance}
                            setActiveTab={setActiveTab}
                        />
                    </div>
                )}

                {activeTab === 'profile' && (
                    <ExhibitorProfile data={data} />
                )}

                {activeTab === 'invoices' && (
                    <ExhibitorInvoices
                        data={data}
                        cur={cur}
                        total={total}
                        paid={paid}
                        balance={balance}
                        paidPct={paidPct}
                        regDate={regDate}
                    />
                )}

                {activeTab === 'exhibitions' && (
                    <ExhibitorEvents
                        data={data}
                        allRegistrations={allRegistrations}
                        setLoading={setLoading}
                        fetchDashboard={fetchDashboard}
                        setActiveTab={setActiveTab}
                    />
                )}

                {activeTab === 'msme' && (
                    <ExhibitorMSME data={data} />
                )}

                {activeTab === 'accessories' && (
                    <StallExtras data={data} />
                )}

                {activeTab === 'chat' && (
                    <ExhibitorChatTab data={data} />
                )}

            </AnimatePresence>

            <SecurityModal
                show={showChangePwd}
                onClose={() => setShowChangePwd(false)}
                pwdForm={pwdForm}
                setPwdForm={setPwdForm}
                pwdLoading={pwdLoading}
                showPwd={showPwd}
                setShowPwd={setShowPwd}
                onSubmit={handleChangePassword}
            />
            <PrintCertificate data={data} />
        </ExhibitorLayout>
    );
}
