import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import ExhibitorNavbar from './ExhibitorNavbar';
import ExhibitorSidebar from './ExhibitorSidebar';

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
    const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth >= 1024);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 1024) {
                setSidebarOpen(true);
            } else {
                setSidebarOpen(false);
            }
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div className="min-h-screen flex flex-col bg-slate-100" style={{ fontFamily: '"Inter", sans-serif' }}>
            <ExhibitorNavbar
                logo={logo}
                data={data}
                sidebarOpen={sidebarOpen}
                setSidebarOpen={setSidebarOpen}
                handleLogout={handleLogout}
                onChatClick={() => setActiveTab('chat')}
                unreadChat={unreadChat}
            />
            <div className="flex pt-14 print:pt-0 flex-1 relative">
                {/* Mobile Backdrop */}
                {sidebarOpen && (
                    <div 
                        className="fixed inset-0 bg-slate-900/50 z-[105] lg:hidden"
                        onClick={() => setSidebarOpen(false)}
                    />
                )}
                <ExhibitorSidebar
                    data={data}
                    activeTab={activeTab}
                    setActiveTab={setActiveTab}
                    sidebarOpen={sidebarOpen}
                    onChangePwd={onChangePwd}
                    unreadChat={unreadChat}
                />

                <main
                    className={`flex-1 flex flex-col transition-all duration-300 overflow-hidden print:overflow-visible print:p-0
                        ${sidebarOpen ? 'lg:ml-56 print:ml-0' : 'lg:ml-[72px] print:ml-0'}
                    `}
                >
                    <div className="w-full bg-white flex-1">
                        {children}
                    </div>
                    
                    {/* Footer */}
                    <footer className="w-full bg-white border-t border-gray-200 px-6 py-2.5 mt-auto shrink-0 print:hidden text-center md:text-left">
                        <p className="text-[10px] font-bold uppercase tracking-widest text-gray-700">
                            © 2026 International Health & Wellness Expo | <span className="text-[#d26019]">An Intellectual Property of Namo Gange Wellness Pvt. Ltd.</span> All Rights Reserved Worldwide.
                        </p>
                    </footer>
                </main>
            </div>
        </div>
    );
}
