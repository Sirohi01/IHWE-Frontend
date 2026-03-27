import { useEffect, Suspense } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Topbar from "./Topbar";
import Navbar from "./Navbar";
import Footer from "./Footer";
import ScrollToTop from "./ScrollToTop";
import SocialSidebar from "./SocialSidebar";
import WhatsAppFloat from "./WhatsAppFloat";

interface LayoutProps {
  children: React.ReactNode;
  onRegisterVisit: () => void;
}

const Layout = ({ children, onRegisterVisit }: LayoutProps) => {
  useEffect(() => {
    AOS.init({ duration: 800, once: true, easing: "ease-out-cubic" });
  }, []);

  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden">
      <Topbar />
      <Navbar onRegisterVisit={onRegisterVisit} />
      <SocialSidebar />
      <WhatsAppFloat />
      <main className="flex-1">
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-white"><div className="w-8 h-8 border-4 border-[#23471d] border-t-transparent rounded-full animate-spin" /></div>}>
          {children}
        </Suspense>
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default Layout;
