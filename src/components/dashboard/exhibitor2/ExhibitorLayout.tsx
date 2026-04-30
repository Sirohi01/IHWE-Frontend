import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import ExhibitorNavbar from './ExhibitorNavbar';
import ExhibitorSidebar from './ExhibitorSidebar';
import SocialSidebar from '@/components/layout/SocialSidebar';
import AdminWhatsAppFloat from './AdminWhatsAppFloat';

interface LayoutProps {
    logo: string | null;
    data: any;
    activeTab: string;
    setActiveTab: (tab: any) => void;
    handleLogout: () => void;
    onChangePwd: () => void;
    children: React.ReactNode;
    unreadChat?: number;
}

export default function ExhibitorLayout({ logo, data, activeTab, setActiveTab, handleLogout, onChangePwd, children, unreadChat = 0 }: LayoutProps) {
    const [sidebarOpen, setSidebarOpen] = useState(true);

    return (
        <div className="min-h-screen flex flex-col bg-slate-100">
            <ExhibitorNavbar
                logo={logo}
                data={data}
                sidebarOpen={sidebarOpen}
                setSidebarOpen={setSidebarOpen}
                handleLogout={handleLogout}
                onChatClick={() => setActiveTab('chat')}
                unreadChat={unreadChat}
            />
            <SocialSidebar />
            <AdminWhatsAppFloat data={data} />
            <div className="flex pt-16 print:pt-0 flex-1">
                <ExhibitorSidebar
                    data={data}
                    activeTab={activeTab}
                    setActiveTab={setActiveTab}
                    sidebarOpen={sidebarOpen}
                    onChangePwd={onChangePwd}
                    unreadChat={unreadChat}
                />

                <main
                    className={`flex-1 transition-all duration-300 overflow-hidden print:overflow-visible p-3 sm:p-4 print:p-0
                        ${sidebarOpen ? 'lg:ml-56 print:ml-0' : 'lg:ml-14 print:ml-0'}
                    `}
                >
                    <div className="w-full">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}
