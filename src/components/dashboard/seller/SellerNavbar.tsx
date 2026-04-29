import { Bell, Search, Menu, User, LogOut, ExternalLink, Zap } from 'lucide-react';
import { SERVER_URL } from '@/lib/api';

interface NavbarProps {
    logo: string | null;
    data: any;
    sidebarOpen: boolean;
    setSidebarOpen: (open: boolean) => void;
    handleLogout: () => void;
}

export default function SellerNavbar({ logo, data, sidebarOpen, setSidebarOpen, handleLogout }: NavbarProps) {
    const isSubscribed = data?.sellerSubscription?.status === 'active';

    return (
        <header className="fixed top-0 left-0 right-0 h-16 z-[60] bg-white border-b border-slate-200 px-4 flex items-center justify-between text-slate-800 shadow-sm">
            <div className="flex items-center gap-4">
                <button 
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                    className="p-2 hover:bg-slate-50 rounded-lg text-slate-500 transition-colors"
                >
                    <Menu size={20} />
                </button>
                <div className="flex items-center" style={{ height: '56px' }}>
                    {logo ? (
                        <img src={`${SERVER_URL}${logo}`} style={{ height: '56px', width: 'auto', objectFit: 'contain', maxWidth: '220px' }} alt="Logo" />
                    ) : (
                        <div className="h-10 w-10 bg-[#23471d] rounded-lg flex items-center justify-center text-white font-black text-xl shadow-lg">S</div>
                    )}
                </div>
            </div>

            <div className="flex items-center gap-3 md:gap-6">
                

                <div className="flex items-center gap-2">
                    {isSubscribed && (
                        <div className="hidden lg:flex items-center gap-2 px-3 py-1 bg-[#23471d]/10 text-[#23471d] rounded-full border border-[#23471d]/20">
                            <Zap size={12} className="fill-current" />
                            <span className="text-[9px] font-black uppercase tracking-widest">Premium Business</span>
                        </div>
                    )}
                    
                    <div className="h-8 w-px bg-slate-200 mx-2 hidden sm:block"></div>

                    <div className="flex items-center gap-3 group cursor-pointer pl-2">
                        {/* <div className="text-right hidden sm:block">
                            <p className="text-[10px] font-black text-slate-900 uppercase tracking-tight leading-none mb-1">{data?.companyName}</p>
                            <p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">Seller ID: #{data?._id?.slice(-6).toUpperCase()}</p>
                        </div> */}
                        <div className="w-9 h-9 bg-slate-100 rounded-full border border-slate-200 flex items-center justify-center overflow-hidden">
                            {data?.companyLogo ? (
                                <img src={data.companyLogo} alt="Logo" className="w-full h-full object-cover" />
                            ) : (
                                <User size={18} className="text-slate-400" />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}
