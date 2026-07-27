import { useEffect, useState, Suspense } from 'react';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';
import { toast } from 'sonner';
import { API_URL, settingsApi } from '@/lib/api';
import SellerLayout from '@/components/dashboard/seller/SellerLayout';
import SecurityModal from '@/components/dashboard/exhibitor/SecurityModal';
import { AnimatePresence } from 'framer-motion';
import { ExhibitorCtx } from '@/context/ExhibitorContext';
import { useSellerSubscription } from '@/hooks/useSellerSubscription';
import { Lock, ArrowRight } from 'lucide-react';
const ROUTE_FEATURE_MAP: Record<string, string> = {
    '/seller-portal/leads': 'lead_access',
    '/seller-portal/bsm': 'bsm_marketing',
    '/seller-portal/calendar': 'meeting_scheduler',
    '/seller-portal/product-export': 'export_inquiry',
    '/seller-portal/products': 'product_showcase',
    '/seller-portal/marketing': 'bsm_marketing',
    '/seller-portal/logistics': 'logistics',
    '/seller-portal/conference': 'conference',
    '/seller-portal/accessories': 'accessories',
    '/seller-portal/reports': 'analytics_dashboard',
};

const FEATURE_LABELS: Record<string, string> = {
    lead_access: 'Lead Management',
    bsm_marketing: 'BSM Marketing',
    meeting_scheduler: 'Meeting Calendar',
    export_inquiry: 'Product Export',
    product_showcase: 'Product Showcase',
    logistics: 'Logistics & Operations',
    conference: 'Conference Participation',
    accessories: 'Stall Accessories',
    analytics_dashboard: 'Business Reports',
};
function LockedPage({ featureKey, onUpgrade }: { featureKey: string; onUpgrade: () => void }) {
    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
            <div className="w-20 h-20 bg-amber-50 rounded-full flex items-center justify-center mb-6 border-2 border-amber-200">
                <Lock size={36} className="text-amber-500" />
            </div>
            <h2 className="text-xl font-black text-slate-800 uppercase tracking-tight mb-2">
                {FEATURE_LABELS[featureKey] || 'Feature'} Locked
            </h2>
            <p className="text-sm text-slate-500 max-w-md mb-8 leading-relaxed">
                This feature is not included in your current subscription plan.
                Upgrade to unlock <strong>{FEATURE_LABELS[featureKey] || 'this feature'}</strong> and more.
            </p>
            <button
                onClick={onUpgrade}
                className="flex items-center gap-2 px-8 py-3 bg-[#23471d] text-white font-black text-[11px] uppercase tracking-widest rounded-sm hover:bg-[#1a3516] transition-all shadow-lg"
            >
                View Subscription Plans <ArrowRight size={14} />
            </button>
        </div>
    );
}
const TAB_ROUTES: Record<string, string> = {
    'seller-dashboard': '/seller-portal',
    'seller-leads': '/seller-portal/leads',
    'seller-bsm': '/seller-portal/bsm',
    'seller-calendar': '/seller-portal/calendar',
    'product-export': '/seller-portal/product-export',
    'seller-products': '/seller-portal/products',
    'stall-management': '/seller-portal/stall',
    'seller-marketing': '/seller-portal/marketing',
    'seller-sponsorship': '/seller-portal/sponsorship',
    'seller-profile': '/seller-portal/profile',
    'payments': '/seller-portal/payments',
    'seller-logistics': '/seller-portal/logistics',
    'seller-conference': '/seller-portal/conference',
    'seller-reports': '/seller-portal/reports',
    'seller-feedback': '/seller-portal/feedback',
    'seller-notifications': '/seller-portal/notifications',
    'chat': '/seller-portal/helpdesk',
    'seller-accessories': '/seller-portal/accessories',
};

const ROUTE_TABS: Record<string, string> = Object.fromEntries(
    Object.entries(TAB_ROUTES).map(([k, v]) => [v, k])
);
export default function SellerPortal() {
    const navigate = useNavigate();
    const location = useLocation();
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [unreadChat, setUnreadChat] = useState(0);
    const [showChangePwd, setShowChangePwd] = useState(false);
    const [pwdForm, setPwdForm] = useState({ current: '', newPwd: '', confirm: '' });
    const [showPwd, setShowPwd] = useState({ current: false, newPwd: false });
    const [logo, setLogo] = useState<string | null>(null);

    const { access, info: subInfo, refetch: refetchSub, loading: subLoading } = useSellerSubscription();
    const accessMap: Record<string, boolean> = access as unknown as Record<string, boolean>;

    const activeTab = ROUTE_TABS[location.pathname] || 'seller-dashboard';
    const setActiveTab = (tab: string) => navigate(TAB_ROUTES[tab] || '/seller-portal');

    const fetchDashboard = async () => {
        const token = localStorage.getItem('exhibitorToken');
        if (!token) { navigate('/exhibitor-login'); return; }

        // Use persisted selectedRegId so seller portal shows the correct registration
        const selectedRegId = localStorage.getItem('selectedRegId');
        let url = `${API_URL}/exhibitor-auth/dashboard`;
        if (selectedRegId) url += `?id=${selectedRegId}`;

        try {
            const r = await fetch(url, { headers: { Authorization: `Bearer ${token}` } });
            const res = await r.json();
            if (res.success) {
                if (!res.data.isSeller) {
                    toast.error('Access Denied: Please register as a seller first.');
                    navigate('/exhibitor-dashboard');
                    return;
                }
                // Pending admin approval — show pending screen
                if (res.data.sellerStatus === 'pending') {
                    setData(res.data);
                    localStorage.setItem('selectedRegId', res.data._id);
                } else if (res.data.sellerStatus !== 'active') {
                    toast.error('Your seller account is not active. Please contact admin.');
                    navigate('/exhibitor-dashboard');
                    return;
                } else {
                    // Active seller — let them in regardless of subscription
                    // (features are locked via ROUTE_FEATURE_MAP, but they can buy a plan)
                    setData(res.data);
                    localStorage.setItem('selectedRegId', res.data._id);
                }
                fetch(`${API_URL}/chat/unread/${res.data._id}`, {
                    headers: { Authorization: `Bearer ${token}` }
                }).then(r => r.json()).then(r => { if (r.success) setUnreadChat(r.count); }).catch(() => { });
            } else {
                navigate('/exhibitor-login');
            }
        } catch { toast.error('Failed to load portal.'); }
        finally { setLoading(false); }
    };

    useEffect(() => {
        fetchDashboard();
        settingsApi.get().then(s => { if (s?.logo) setLogo(s.logo); });
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('exhibitorToken');
        localStorage.removeItem('selectedRegId');
        navigate('/exhibitor-login');
    };

    if (loading || subLoading) return (
        <div className="min-h-screen bg-[#020617] flex items-center justify-center">
            <div className="flex flex-col items-center gap-3">
                <div className="w-10 h-10 rounded-full border-[3px] border-blue-900/20 border-t-blue-500 animate-spin" />
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em]">Initializing Business Engine...</p>
            </div>
        </div>
    );

    if (!data) return null;

    // ── Pending admin approval screen ──────────────────────────────────────────
    if (data.sellerStatus === 'pending') {
        return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
                <div className="bg-white rounded-2xl shadow-xl border border-slate-200 max-w-md w-full p-8 text-center">
                    <div className="w-20 h-20 bg-amber-50 rounded-full flex items-center justify-center mx-auto mb-5 border-2 border-amber-200">
                        <Lock size={32} className="text-amber-500" />
                    </div>
                    <h2 className="text-xl font-black text-slate-800 uppercase tracking-tight mb-2">Pending Admin Approval</h2>
                    <p className="text-sm text-slate-500 mb-2 leading-relaxed">
                        Your seller registration has been submitted and is currently under review by our team.
                    </p>
                    <p className="text-xs text-slate-400 mb-6">
                        Registration ID: <span className="font-mono font-bold text-slate-600">{data.registrationId}</span>
                    </p>
                    <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6 text-left space-y-2">
                        <p className="text-[10px] font-black text-amber-700 uppercase tracking-wider">What happens next?</p>
                        <ul className="text-xs text-amber-700 space-y-1.5">
                            <li className="flex items-start gap-2"><span className="text-amber-500 font-black mt-0.5">1.</span> Admin reviews your seller application</li>
                            <li className="flex items-start gap-2"><span className="text-amber-500 font-black mt-0.5">2.</span> Once approved, you can purchase a subscription plan</li>
                            <li className="flex items-start gap-2"><span className="text-amber-500 font-black mt-0.5">3.</span> Seller portal features unlock automatically</li>
                        </ul>
                    </div>
                    <button
                        onClick={() => navigate('/exhibitor-dashboard')}
                        className="w-full py-3 bg-[#23471d] text-white font-black text-xs uppercase tracking-widest rounded-xl hover:bg-[#1a3516] transition-colors"
                    >
                        Back to Dashboard
                    </button>
                </div>
            </div>
        );
    }

    // ── Approved but no subscription — let them into portal to buy plan ────────
    // (no blocking screen — they land on dashboard and can go to sponsorship)

    const requiredFeature = ROUTE_FEATURE_MAP[location.pathname];
    const isRouteBlocked = !!requiredFeature && !accessMap[requiredFeature];

    return (
        <ExhibitorCtx.Provider value={{ data, setData, fetchDashboard, setLoading, subInfo, refetchSub, access: accessMap }}>
            <SellerLayout
                logo={logo}
                data={data}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                handleLogout={handleLogout}
                onChangePwd={() => setShowChangePwd(true)}
                unreadChat={unreadChat}
                access={accessMap}
                subInfo={subInfo}
            >
                <Suspense fallback={
                    <div className="h-64 flex items-center justify-center">
                        <div className="w-8 h-8 border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin" />
                    </div>
                }>
                    <AnimatePresence mode="wait">
                        {isRouteBlocked ? (
                            <LockedPage
                                key="locked"
                                featureKey={requiredFeature}
                                onUpgrade={() => navigate('/seller-portal/sponsorship')}
                            />
                        ) : (
                            <Outlet key={location.pathname} />
                        )}
                    </AnimatePresence>
                </Suspense>

                <SecurityModal
                    show={showChangePwd}
                    onClose={() => setShowChangePwd(false)}
                    pwdForm={pwdForm}
                    setPwdForm={setPwdForm}
                    pwdLoading={false}
                    showPwd={showPwd}
                    setShowPwd={setShowPwd}
                    onSubmit={() => { }}
                />
            </SellerLayout>
        </ExhibitorCtx.Provider>
    );
}
