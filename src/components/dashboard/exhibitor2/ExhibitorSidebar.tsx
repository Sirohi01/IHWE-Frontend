import { LayoutDashboard, User, FileText, Building2, Lock, ChevronRight } from 'lucide-react';

interface SidebarProps {
    activeTab: string;
    setActiveTab: (tab: any) => void;
    sidebarOpen: boolean;
    onChangePwd: () => void;
}

const navItems = [
    { id: 'dashboard',   label: 'Dashboard',   icon: LayoutDashboard },
    { id: 'profile',     label: 'Profile',     icon: User },
    { id: 'invoices',    label: 'Invoices',    icon: FileText },
    { id: 'exhibitions', label: 'My Events',   icon: Building2 },
];

export default function ExhibitorSidebar({ activeTab, setActiveTab, sidebarOpen, onChangePwd }: SidebarProps) {
    return (
        <aside
            className={`
                fixed top-16 left-0 bottom-0 z-50 bg-white border-r border-slate-200
                flex flex-col transition-all duration-300 overflow-hidden
                ${sidebarOpen ? 'w-56' : 'w-14'}
            `}
        >
            <nav className="flex-1 py-4 space-y-0.5 px-2">
                {navItems.map(item => {
                    const Icon = item.icon;
                    const active = activeTab === item.id;
                    return (
                        <button
                            key={item.id}
                            onClick={() => setActiveTab(item.id)}
                            className={`
                                w-full flex items-center gap-3 px-2 py-2 rounded-sm text-left transition-all
                                ${active
                                    ? 'bg-[#23471d] text-white'
                                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                                }
                            `}
                        >
                            <Icon size={15} className="shrink-0" />
                            {sidebarOpen && (
                                <span className="text-[11px] font-bold uppercase tracking-wider whitespace-nowrap">{item.label}</span>
                            )}
                            {sidebarOpen && active && <ChevronRight size={12} className="ml-auto" />}
                        </button>
                    );
                })}
            </nav>

            {/* Change Password */}
            <div className="px-2 pb-4">
                <button
                    onClick={onChangePwd}
                    className="w-full flex items-center gap-3 px-2 py-2 rounded-sm text-slate-500 hover:bg-slate-100 hover:text-slate-900 transition-all"
                >
                    <Lock size={15} className="shrink-0" />
                    {sidebarOpen && <span className="text-[11px] font-bold uppercase tracking-wider whitespace-nowrap">Change Password</span>}
                </button>
            </div>
        </aside>
    );
}
