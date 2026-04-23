import { LayoutDashboard, User, CreditCard, History, Box, ClipboardList, HelpCircle, Users, Building2, ChevronRight, Lock } from 'lucide-react';
import { useAuth } from '@/context/BuyerAuthContext';
import { useLocation, useNavigate } from 'react-router-dom';

const navItems = [
    { id: 'overview', label: 'Dashboard', icon: LayoutDashboard, path: '/buyer-dashboard' },
    { id: 'directory', label: 'Attendee Directory', icon: Users, path: '/buyer-dashboard/directory' },
    { id: 'exhibitors', label: 'Exhibitors', icon: Building2, path: '/buyer-dashboard/exhibitors' },
    { id: 'details', label: 'Full Details', icon: ClipboardList, path: '/buyer-dashboard/details' },
    { id: 'profile', label: 'My Profile', icon: User, path: '/buyer-dashboard/profile' },
    { id: 'payments', label: 'Payment History', icon: CreditCard, path: '/buyer-dashboard/payments' },
    { id: 'history', label: 'Activity Logs', icon: History, path: '/buyer-dashboard/history' },
    { id: 'help', label: 'Support Hub', icon: HelpCircle, path: '/buyer-dashboard/support' },
];

export default function Sidebar({ sidebarOpen, setSidebarOpen }) {
    const location = useLocation();
    const navigate = useNavigate();
    const { logout } = useAuth();

    const handleNav = (path) => {
        navigate(path);
        if (window.innerWidth < 1024) {
            setSidebarOpen(false);
        }
    };

    return (
        <aside className={`fixed top-16 left-0 bottom-0 z-50 bg-white border-r border-slate-200 flex flex-col transition-all duration-300 overflow-hidden print:hidden ${sidebarOpen ? "w-56" : "w-14"}`}>
            <nav className="flex-1 py-4 space-y-0.5 px-2 overflow-y-auto">
                {navItems.map(item => {
                    const Icon = item.icon;
                    const active = location.pathname === item.path || (item.path === '/buyer-dashboard' && location.pathname === '/buyer-dashboard/');
                    
                    return (
                        <button key={item.id} onClick={() => handleNav(item.path)}
                            className={`w-full flex items-center gap-3 px-2 py-2 rounded-sm text-left transition-all ${active ? "bg-[#23471d] text-white" : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"}`}>
                            <div className="relative shrink-0">
                                <Icon size={15} />
                            </div>
                            {sidebarOpen && (
                                <span className="text-[11px] font-bold uppercase tracking-wider whitespace-nowrap flex-1 font-sans">{item.label}</span>
                            )}
                            {sidebarOpen && active && <ChevronRight size={12} className="ml-auto" />}
                        </button>
                    );
                })}
            </nav>

            <div className="px-2 pb-4 space-y-1">
                <button className="w-full flex items-center gap-3 px-2 py-2 rounded-sm text-slate-500 hover:bg-slate-100 hover:text-slate-900 transition-all font-sans">
                    <Lock size={15} className="shrink-0" />
                    {sidebarOpen && <span className="text-[11px] font-bold uppercase tracking-wider whitespace-nowrap">Security</span>}
                </button>
                <button onClick={logout} className="w-full flex items-center gap-3 px-2 py-2 rounded-sm text-red-500 hover:bg-red-50 transition-all font-sans">
                    <Box size={15} className="shrink-0" />
                    {sidebarOpen && <span className="text-[11px] font-bold uppercase tracking-wider whitespace-nowrap">Logout</span>}
                </button>
            </div>
        </aside>
    );
}