import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '@/components/buyer/Sidebar';
import Navbar from '@/components/buyer/Navbar';

export default function BuyerDashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Auto-collapse sidebar on mobile
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setSidebarOpen(false);
      } else {
        setSidebarOpen(true);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-slate-100">
      <Navbar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      <div className="flex pt-16 flex-1">
        <Sidebar
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />

        <main
          className={`flex-1 transition-all duration-300 overflow-hidden p-4 sm:p-6
            ${sidebarOpen ? 'lg:ml-56' : 'lg:ml-14'}
          `}
        >
          <div className="w-full max-w-[1600px] mx-auto">
            <Outlet />
          </div>
        </main>
      </div>

      {/* Footer */}
      <footer className={`py-6 px-4 border-t border-slate-200 bg-white/50 text-center transition-all duration-300 ${sidebarOpen ? 'lg:ml-56' : 'lg:ml-14'}`}>
        <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">
          &copy; 2026 9th IHWE Buyer Portal. Powered by IHWE Tech Team.
        </p>
      </footer>
    </div>
  );
}