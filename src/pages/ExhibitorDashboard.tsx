import { useEffect, useState, lazy, Suspense, createContext, useContext } from 'react';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';
import { toast } from 'sonner';
import { API_URL, settingsApi } from '@/lib/api';
import ExhibitorLayout from '@/components/dashboard/exhibitor2/ExhibitorLayout';
import SecurityModal from '@/components/dashboard/exhibitor/SecurityModal';
import PrintCertificate from '@/components/dashboard/exhibitor/PrintCertificate';
import { AnimatePresence } from 'framer-motion';
export const ExhibitorCtx = createContext<any>(null);
export const useExhibitorCtx = () => useContext(ExhibitorCtx);

const TAB_ROUTES: Record<string, string> = {
    dashboard: '/exhibitor-dashboard',
    profile: '/exhibitor-dashboard/profile',
    invoices: '/exhibitor-dashboard/invoices',
    accessories: '/exhibitor-dashboard/accessories',
    marketing: '/exhibitor-dashboard/marketing',
    bsm: '/exhibitor-dashboard/bsm',
    calendar: '/exhibitor-dashboard/calendar',
    chat: '/exhibitor-dashboard/chat',
    msme: '/exhibitor-dashboard/msme',
    psm_claim: '/exhibitor-dashboard/psm-claim',
    annexure_c: '/exhibitor-dashboard/psm-claim/annexure-c',
    declaration: '/exhibitor-dashboard/psm-claim/declaration',
    feedback_report: '/exhibitor-dashboard/psm-claim/feedback-report',
    undertaking: '/exhibitor-dashboard/psm-claim/undertaking',
    exhibitions: '/exhibitor-dashboard/exhibitions',
};

const ROUTE_TABS: Record<string, string> = Object.fromEntries(
    Object.entries(TAB_ROUTES).map(([k, v]) => [v, k])
);

export default function ExhibitorDashboard() {
    const navigate = useNavigate();
    const location = useLocation();
    const [data, setData] = useState<any>(null);
    const [allRegistrations, setAllRegistrations] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [unreadChat, setUnreadChat] = useState(0);
    const [showChangePwd, setShowChangePwd] = useState(false);
    const [pwdForm, setPwdForm] = useState({ current: '', newPwd: '', confirm: '' });
    const [pwdLoading, setPwdLoading] = useState(false);
    const [showPwd, setShowPwd] = useState({ current: false, newPwd: false });
    const [logo, setLogo] = useState<string | null>(null);

    const activeTab = ROUTE_TABS[location.pathname] || 'dashboard';

    const setActiveTab = (tab: string) => {
        const path = TAB_ROUTES[tab] || '/exhibitor-dashboard';
        if (tab === 'chat') setUnreadChat(0);
        navigate(path);
    };

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
                if (res.data?._id) {
                    fetch(`${API_URL}/chat/unread/${res.data._id}`, { headers: { Authorization: `Bearer ${token}` } })
                        .then(r => r.json()).then(r => { if (r.success) setUnreadChat(r.count); }).catch(() => { });
                }
            } else {
                toast.error(res.message);
                if (res.message === 'Token expired or invalid') {
                    localStorage.removeItem('exhibitorToken');
                    navigate('/exhibitor-login');
                }
            }
        } catch { toast.error('Failed to load dashboard.'); }
        finally { setLoading(false); }
    };

    useEffect(() => {
        fetchDashboard();
        settingsApi.get().then(s => { if (s?.logo) setLogo(s.logo); });
        const handleVisibility = () => { if (document.visibilityState === 'visible') fetchDashboard(); };
        document.addEventListener('visibilitychange', handleVisibility);
        const poll = setInterval(() => fetchDashboard(), 30000);
        return () => { document.removeEventListener('visibilitychange', handleVisibility); clearInterval(poll); };
    }, []);

    const handleLogout = () => { localStorage.removeItem('exhibitorToken'); navigate('/exhibitor-login'); };

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
            if (result.success) { toast.success('Password changed successfully'); setShowChangePwd(false); setPwdForm({ current: '', newPwd: '', confirm: '' }); }
            else toast.error(result.message);
        } catch { toast.error('Failed to change password'); }
        finally { setPwdLoading(false); }
    };

    if (loading) return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center">
            <div className="flex flex-col items-center gap-3">
                <div className="w-10 h-10 rounded-full border-[3px] border-[#23471d]/20 border-t-[#23471d] animate-spin" />
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Loading Portal...</p>
            </div>
        </div>
    );

    if (!data) return null;

    return (
        <ExhibitorCtx.Provider value={{ data, allRegistrations, fetchDashboard, setLoading }}>
            <ExhibitorLayout
                logo={logo}
                data={data}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                handleLogout={handleLogout}
                onChangePwd={() => setShowChangePwd(true)}
                unreadChat={unreadChat}
            >
                <Suspense fallback={
                    <div className="h-64 flex items-center justify-center">
                        <div className="w-8 h-8 border-4 border-[#23471d]/20 border-t-[#23471d] rounded-full animate-spin" />
                    </div>
                }>
                    <AnimatePresence mode="wait">
                        <Outlet />
                    </AnimatePresence>
                </Suspense>

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
        </ExhibitorCtx.Provider>
    );
}