import { useState } from 'react';
import SellerNavbar from './SellerNavbar';
import SellerSidebar from './SellerSidebar';
import SocialSidebar from '@/components/layout/SocialSidebar';

interface LayoutProps {
    logo: string | null;
    data: any;
    activeTab: string;
    setActiveTab: (tab: any) => void;
    handleLogout: () => void;
    onChangePwd: () => void;
    children: React.ReactNode;
    unreadChat?: number;
    access?: Record<string, boolean>;
}

export default function SellerLayout({ logo, data, activeTab, setActiveTab, handleLogout, onChangePwd, children, unreadChat = 0, access = {} }: LayoutProps) {
    const [sidebarOpen, setSidebarOpen] = useState(true);

    return (
        <div className="min-h-screen flex flex-col bg-slate-100">
            <SellerNavbar
                logo={logo}
                data={data}
                sidebarOpen={sidebarOpen}
                setSidebarOpen={setSidebarOpen}
                handleLogout={handleLogout}
            />
            
            <SocialSidebar />
            
            <div className="flex pt-16 flex-1">
                <SellerSidebar
                    data={data}
                    activeTab={activeTab}
                    setActiveTab={setActiveTab}
                    sidebarOpen={sidebarOpen}
                    onChangePwd={onChangePwd}
                    unreadChat={unreadChat}
                    access={access}
                />

                <main
                    className={`flex-1 transition-all duration-300 overflow-hidden p-3 sm:p-4
                        ${sidebarOpen ? 'lg:ml-64' : 'lg:ml-14'}
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
