import { 
    LayoutDashboard, Building2, 
    Package, Handshake, Send, Award, 
    CalendarCheck, Megaphone, MessageSquare, 
    Lock, ChevronRight,
    Users, BarChart3, ArrowLeft,
    Truck, ShoppingBag, AlertCircle, Bell
} from "lucide-react";
import { useNavigate } from 'react-router-dom';

interface SidebarProps {
    data: any;
    activeTab: string;
    setActiveTab: (tab: any) => void;
    sidebarOpen: boolean;
    onChangePwd: () => void;
    unreadChat?: number;
    access?: Record<string, boolean>;
    subInfo?: any;
}

export default function SellerSidebar({ data, activeTab, setActiveTab, sidebarOpen, onChangePwd, unreadChat = 0, access = {}, subInfo }: SidebarProps) {
    const navigate = useNavigate();

    // Use subInfo from hook (most accurate) — NEVER fallback to data field alone
    // subInfo is fetched with selectedRegId so it's always registration-specific
    const isSubscribed = subInfo?.subscription?.isActive === true;
    const planName = subInfo?.planDetails?.name || null;

    const canAccess = (featureKey: string) => {
        // access map comes from subscription-info API with correct regId
        if (Object.keys(access).length > 0) return access[featureKey] === true;
        return false; // no access if access map not loaded
    };

    const menuGroups = [
        {
            title: "Dashboard",
            items: [
                { id: "seller-dashboard", label: "Dashboard Home", icon: LayoutDashboard, featureKey: null },
            ]
        },
        {
            title: "Stall & Booking",
            items: [
                { id: "stall-management", label: "Stall Booking", icon: Building2, featureKey: null },
            ]
        },
        {
            title: "BSM & Meetings",
            items: [
                { id: "seller-bsm",      label: "BSM Management",    icon: Handshake, featureKey: "bsm_marketing" },
                { id: "seller-calendar", label: "Meeting Calendar",   icon: CalendarCheck, featureKey: "meeting_scheduler" },
            ]
        },
        {
            title: "Lead Management",
            items: [
                { id: "seller-leads", label: "Lead Management", icon: Users, featureKey: "lead_access" },
            ]
        },
        {
            title: "Sponsorship",
            items: [
                { id: "seller-sponsorship", label: "Subscription Plans", icon: Award, featureKey: null },
            ]
        },
        {
            title: "Marketing",
            items: [
                { id: "seller-marketing", label: "Marketing Toolkit", icon: Megaphone, featureKey: "bsm_marketing" },
            ]
        },
        {
            title: "Logistics",
            items: [
                { id: "seller-conference",  label: "Conference",            icon: CalendarCheck, featureKey: "conference" },
                // { id: "seller-logistics",   label: "Logistics & Operations", icon: Truck, featureKey: "logistics" },
                { id: "seller-accessories", label: "Accessories",            icon: ShoppingBag, featureKey: "accessories" },
            ]
        },
        {
            title: "Products & Export",
            items: [
                { id: "seller-products", label: "Manage Products", icon: Package, featureKey: "product_showcase" },
                { id: "product-export", label: "Product Export", icon: Send, featureKey: "export_inquiry" },
            ]
        },
        {
            title: "Account & Settings",
            items: [
                { id: "seller-profile", label: "Profile Management", icon: Users, featureKey: null },
                { id: "payments", label: "Payment Tracker", icon: Package, featureKey: null },
            ]
        },
        {
            title: "Support & Reports",
            items: [
                { id: "seller-notifications", label: "Notifications", icon: Bell, featureKey: null },
                { id: "chat", label: "Helpdesk Support", icon: MessageSquare, featureKey: null },
                { id: "seller-reports", label: "Reports Section", icon: BarChart3, featureKey: "analytics_dashboard" },
            ]
        }
    ];

    return (
        <aside className={`fixed top-16 left-0 bottom-0 z-50 bg-white border-r border-slate-200 flex flex-col transition-all duration-300 overflow-hidden print:hidden ${sidebarOpen ? "w-64" : "w-14"}`}>
            {/* Subscription status badge */}
            {sidebarOpen && (
                <div className={`mx-3 mt-3 px-3 py-2 rounded-sm text-[9px] font-black uppercase tracking-wider flex items-center gap-2 ${
                    isSubscribed 
                        ? 'bg-green-50 text-green-700 border border-green-200' 
                        : 'bg-amber-50 text-amber-700 border border-amber-200'
                }`}>
                    {isSubscribed ? (
                        <>
                            <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse shrink-0" />
                            <span className="truncate">{planName || 'Active Plan'}</span>
                        </>
                    ) : (
                        <>
                            <AlertCircle size={10} className="shrink-0" />
                            No Active Plan
                        </>
                    )}
                </div>
            )}

            <nav className="flex-1 py-4 space-y-5 px-3 overflow-y-auto">
                {menuGroups.map((group, gIdx) => (
                    <div key={gIdx} className="space-y-0.5">
                        {sidebarOpen && (
                            <p className="px-3 text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2">{group.title}</p>
                        )}
                        {group.items.map(item => {
                            const Icon = item.icon;
                            const active = activeTab === item.id;
                            const isLocked = item.featureKey !== null && !canAccess(item.featureKey);
                            
                            return (
                                <button 
                                    key={item.id} 
                                    onClick={() => !isLocked && setActiveTab(item.id)}
                                    title={isLocked ? `Requires: ${item.featureKey}` : item.label}
                                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-sm text-left transition-all relative group
                                        ${active ? "bg-[#23471d] text-white" : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"}
                                        ${isLocked ? "opacity-40 cursor-not-allowed" : "cursor-pointer"}
                                    `}>
                                    <Icon size={15} className={`${active ? "text-white" : "text-slate-400 group-hover:text-[#23471d]"} transition-colors shrink-0`} />
                                    {sidebarOpen && (
                                        <>
                                            <span className="text-[11px] font-bold uppercase tracking-wide whitespace-nowrap flex-1 text-left">{item.label}</span>
                                            {active && !isLocked && <ChevronRight size={12} className="ml-auto shrink-0" />}
                                            {isLocked && <Lock size={10} className="ml-auto shrink-0 text-amber-400" />}
                                            {!isLocked && unreadChat > 0 && item.id === 'chat' && (
                                                <span className="ml-auto bg-red-500 text-white text-[8px] font-black px-1.5 py-0.5 rounded-full">{unreadChat}</span>
                                            )}
                                        </>
                                    )}
                                </button>
                            );
                        })}
                    </div>
                ))}
            </nav>

            <div className="p-3 border-t border-slate-100 space-y-1">
                <button 
                    onClick={() => navigate('/exhibitor-dashboard')}
                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-sm text-[#23471d] font-bold hover:bg-emerald-50 transition-all"
                >
                    <ArrowLeft size={15} className="shrink-0" />
                    {sidebarOpen && <span className="text-[11px] font-bold uppercase tracking-wide">Main Dashboard</span>}
                </button>
                <button onClick={onChangePwd} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-sm text-slate-500 hover:bg-slate-50 hover:text-slate-900 transition-all">
                    <Lock size={15} className="shrink-0" />
                    {sidebarOpen && <span className="text-[11px] font-bold uppercase tracking-wide">Security Settings</span>}
                </button>
            </div>
        </aside>
    );
}
