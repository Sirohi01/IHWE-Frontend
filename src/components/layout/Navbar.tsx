import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown, Award, Briefcase, Users, Layout, MapPin, Handshake, Camera, Sparkles, Rocket, FileCheck, Search, IdCard, Image, Info, ShoppingBag, HelpCircle, Lock, CalendarDays } from "lucide-react";
import { cn } from "@/lib/utils";
import { settingsApi, analyticsApi, SERVER_URL } from "@/lib/api";

const navLinks = [
  { label: "Home", path: "/" },
  {
    label: "Overview",
  
    dropdown: [
      {
        label: "About IHWE",
        path: "/about",
        icon: Info,
        description: "Learn about the mission and vision of IHWE"
      },
      {
        label: "Our Partners",
        path: "/partners",
        icon: Handshake,
        description: "Explore our global network of collaborators"
      },
      {
        label: "Advisory Board Members",
        path: "/advisory-board",
        icon: Users,
        description: "Meet the experts behind the exhibition"
      },
      {
        label: "Media",
        path: "/media-registration",
        icon: Camera,
        description: "Latest updates, press releases and event coverage"
      },
    ],
  },
  {
    label: "Exhibit",
   
    dropdown: [
      {
        label: "Why Exhibit?",
        path: "/why-exhibit",
        icon: HelpCircle,
        description: "Maximize your brand visibility and growth"
      },
      {
        label: "Book a Stall",
        path: "/book-a-stand",
        icon: Layout,
        description: "Secure your premium space at IHWE 2026",
      },
      {
        label: "Exhibitor Profile",
        path: "/exhibitor-profile",
        icon: Users,
        description: "Target audience and industry segments"
      },
      {
        label: "E-Promotion Opportunities",
        path: "/e-promotion",
        icon: Rocket,
        description: "Digital exposure for your brand"
      },
      {
        label: "Travel & Accommodation",
        path: "/travel-accommodation",
        icon: MapPin,
        description: "Easy travel planning for exhibitors"
      },
      {
        label: "Stall Designing Vendors",
        path: "/stall-designing-vendors",
        icon: Layout, // Assuming a relevant icon, e.g., Layout for design
        description: "Connect with trusted stall designers" // Assuming a relevant description
      },
    ],
  },
  {
    label: "Visit",
    
    dropdown: [
      {
        label: "Register for FREE",
        path: "/visitor-registration",
        icon: FileCheck,
        description: "Get your complimentary visitor pass today"
      },
      {
        label: "Buyer Registration",
        path: "/buyer-registration",
        icon: ShoppingBag,
        description: "Explore opportunities as a domestic or international buyer"
      },
      {
        label: "Why Visit",
        path: "/why-visit",
        icon: Sparkles,
        description: "Experience the latest in health & wellness"
      },
      {
        label: "Download Badge",
        path: "/download-badge",
        icon: IdCard,
        description: "Fast-track your entry to the expo"
      },
    ],
  },
  { label: "Exhibitor List", path: "/exhibitors" },
  { label: "Conference", path: "/conference" },
  { label: "Blogs", path: "/blog" },
  { label: "Gallery", path: "/gallery" },
  { label: "Contact", path: "/contact" },
];

interface NavbarProps {
  onRegisterVisit: () => void;
}

const Navbar = ({ onRegisterVisit }: NavbarProps) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [settings, setSettings] = useState<any>(null);
  const location = useLocation();

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const data = await settingsApi.get();
        if (data) {
          setSettings(data);
        }
      } catch (error) {
        console.error("Error fetching settings for navbar:", error);
      }
    };
    fetchSettings();
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setActiveDropdown(null);
  }, [location]);

  const navBg = scrolled;
  const textColor = "text-slate-900";

  return (
    <motion.nav
      className={`sticky top-0 left-0 right-0 z-[100] transition-all duration-500 bg-white border-b border-slate-200 py-2 shadow-sm`}
    >
      <div className="container mx-auto px-6 max-w-[1400px]">
        {/* ... desktop section stays same, skipping to line 384 ... */}

        {/* ─── Desktop Nav ─── */}
        <div className="hidden xl:flex items-center justify-between py-0 relative h-16">

          <Link to="/" className="relative z-[150] h-full flex items-center min-w-[200px]">
            {settings?.logo ? (
              <img
                src={`${SERVER_URL}${settings.logo}`}
                alt="IHWE Logo"
                className="absolute top-1/2 -translate-y-1/2 left-0 h-32 md:h-40 w-auto object-contain transition-transform duration-500 drop-shadow-[0_8px_15px_rgba(0,0,0,0.1)] group-hover:scale-105"
              />
            ) : (
                <div className="flex flex-col">
                  <span className="text-xl font-black text-[#23471d] leading-none">IHWE</span>
                  <span className="text-[10px] font-bold text-[#d26019] tracking-widest uppercase">EXPO 2026</span>
                </div>
              )}
          </Link>

          {/* RIGHT: Nav Links + Button */}
          <div className="flex-1 flex items-center justify-end gap-0.5 px-4">
            {navLinks.map((link) => (
              <div
                key={link.label}
                className="relative flex items-center"
                onMouseEnter={() => link.dropdown && setActiveDropdown(link.label)}
                onMouseLeave={() => link.dropdown && setActiveDropdown(null)}
              >
                <Link
                  to={link.path}
                  style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                  className={`px-2 py-2 text-[12px] font-semibold tracking-[0.1em] uppercase transition-all duration-300 flex items-center gap-1 relative group ${location.pathname === link.path ? "text-[#d26019]" : textColor
                    }`}
                >
                  {link.label}
                  {link.dropdown && (
                    <ChevronDown
                      className={`w-3 h-3 transition-transform duration-300 ${activeDropdown === link.label ? "rotate-180" : ""
                        }`}
                    />
                  )}
                  <span
                    className={`absolute -bottom-1 left-2 right-2 h-[2px] bg-[#d26019] transition-transform duration-300 origin-left ${location.pathname === link.path
                      ? "scale-x-100"
                      : "scale-x-0 group-hover:scale-x-100"
                      }`}
                  />
                </Link>

                {/* Dropdown */}
                {link.dropdown && (
                  <AnimatePresence>
                    {activeDropdown === link.label && (
                      <div className="absolute top-[calc(100%-10px)] left-1/2 -translate-x-1/2 pt-4 w-[240px]">
                        {/* Triangle tip */}
                        <div className="absolute top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white border-t border-l border-slate-100 rotate-45 z-10" />

                        <motion.div
                          initial={{ opacity: 0, scale: 0.95, y: 10 }}
                          animate={{ opacity: 1, scale: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.95, y: 10 }}
                          transition={{ duration: 0.2, ease: "easeOut" }}
                          className="relative bg-white/95 backdrop-blur-2xl rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.12)] border border-slate-100 py-2 overflow-hidden z-20"
                        >
                          {link.dropdown.map((item, idx) => {
                            const isEven = idx % 2 === 0;
                            return (
                              <Link
                                key={item.label}
                                to={item.path}
                                onClick={() => setActiveDropdown(null)}
                                className="flex items-start gap-4 px-4 py-2.5 hover:bg-slate-50 group transition-all border-b border-slate-200 last:border-b-0"
                              >
                                <div className={cn(
                                  "w-7 h-7 mt-0.5 flex-shrink-0 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:text-white group-hover:shadow-md",
                                  isEven
                                    ? "bg-[#23471d]/10 text-[#23471d] group-hover:bg-[#23471d] group-hover:shadow-[#23471d]/20"
                                    : "bg-[#d26019]/10 text-[#d26019] group-hover:bg-[#d26019] group-hover:shadow-[#d26019]/20"
                                )}>
                                  <item.icon className="w-3.5 h-3.5" />
                                </div>
                                <div className="flex flex-col gap-0.5">
                                  <span className={cn(
                                    "text-[12px] font-semibold text-slate-800 transition-colors",
                                    isEven ? "group-hover:text-[#23471d]" : "group-hover:text-[#d26019]"
                                  )}>
                                    {item.label}
                                  </span>
                                  <span className="text-[10px] text-slate-500 leading-normal">
                                    {item.description}
                                  </span>
                                </div>
                              </Link>
                            );
                          })}
                        </motion.div>
                      </div>
                    )}
                  </AnimatePresence>
                )}
              </div>
            ))}

            {/* Combined Register Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setActiveDropdown("registration")}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button
                className={cn(
                  "group relative overflow-hidden border-2 px-6 py-2 rounded-full font-bold text-[10.5px] uppercase tracking-widest transition-all duration-500 whitespace-nowrap flex-shrink-0 bg-[#23471d] border-[#d26019] text-white hover:bg-[#1a3a14] flex items-center gap-1.5 shadow-md hover:shadow-lg"
                )}
                onClick={() => analyticsApi.logClick("Register Now Button (Navbar)")}
              >
                <span className="relative z-10">Register Now</span>
                <ChevronDown className={cn("w-3 h-3 transition-transform duration-500", activeDropdown === "registration" ? "rotate-180" : "")} />
              </button>

              <AnimatePresence>
                {activeDropdown === "registration" && (
                  <div className="absolute top-[calc(100%-8px)] right-0 pt-4 w-[260px] z-50">
                    {/* Shadow Arrow Tip */}
                    <div className="absolute top-[10px] right-10 w-4 h-4 bg-white border-t border-l border-slate-100 rotate-45 z-10" />

                    <motion.div
                      initial={{ opacity: 0, scale: 0.9, y: 15, transformOrigin: "top right" }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.9, y: 10 }}
                      transition={{ type: "spring", damping: 25, stiffness: 300 }}
                      className="relative bg-white rounded-2xl shadow-[0_15px_45px_rgba(0,0,0,0.15)] border border-slate-100 p-1 overflow-hidden z-20"
                    >
                      <div className="grid grid-cols-2 relative h-full">
                        <Link
                          to="/visitor-registration"
                          onClick={() => {
                            setActiveDropdown(null);
                            analyticsApi.logClick("Registration: Visitor Pass");
                          }}
                          className="flex items-center gap-1.5 px-2 py-2 hover:bg-slate-50 text-left transition-all group relative z-20 border-b border-r border-slate-100"
                        >
                          <div className="w-6 h-6 flex-shrink-0 rounded-lg bg-[#23471d]/5 flex items-center justify-center text-[#23471d] group-hover:bg-[#23471d] group-hover:text-white transition-all duration-300 shadow-sm">
                            <Users className="w-3 h-3" />
                          </div>
                          <span className="text-[9px] font-semibold text-slate-800 uppercase tracking-wider group-hover:text-[#23471d] transition-colors leading-tight">Visitor<br />Pass</span>
                        </Link>

                        <Link
                          to="/buyer-registration"
                          onClick={() => {
                            setActiveDropdown(null);
                            analyticsApi.logClick("Registration: Buyer Register");
                          }}
                          className="flex items-center gap-1.5 px-2 py-2 hover:bg-slate-50 text-left transition-all group relative z-20 border-b border-slate-100"
                        >
                          <div className="w-6 h-6 flex-shrink-0 rounded-lg bg-[#d26019]/5 flex items-center justify-center text-[#d26019] group-hover:bg-[#d26019] group-hover:text-white transition-all duration-300 shadow-sm">
                            <ShoppingBag className="w-3 h-3" />
                          </div>
                          <span className="text-[9px] font-semibold text-slate-800 uppercase tracking-wider group-hover:text-[#d26019] transition-colors leading-tight">Buyer<br />Register</span>
                        </Link>

                        <Link
                          to="/book-a-stand"
                          onClick={() => {
                            setActiveDropdown(null);
                            analyticsApi.logClick("Registration: Book A Stand");
                          }}
                          className="flex items-center gap-1.5 px-2 py-2 hover:bg-slate-50 text-left transition-all group relative z-20 border-b border-r border-slate-100"
                        >
                          <div className="w-6 h-6 flex-shrink-0 rounded-lg bg-[#d26019]/5 flex items-center justify-center text-[#d26019] group-hover:bg-[#d26019] group-hover:text-white transition-all duration-300 shadow-sm">
                            <Briefcase className="w-3 h-3" />
                          </div>
                          <span className="text-[9px] font-semibold text-slate-800 uppercase tracking-wider group-hover:text-[#d26019] transition-colors leading-tight">Book A<br />Stand</span>
                        </Link>

                        <Link
                          to="/media-registration"
                          onClick={() => {
                            setActiveDropdown(null);
                            analyticsApi.logClick("Registration: Media & Partners");
                          }}
                          className="flex items-center gap-1.5 px-2 py-2 hover:bg-slate-50 text-left transition-all group relative z-20 border-b border-slate-100"
                        >
                          <div className="w-6 h-6 flex-shrink-0 rounded-lg bg-[#23471d]/5 flex items-center justify-center text-[#23471d] group-hover:bg-[#23471d] group-hover:text-white transition-all duration-300 shadow-sm">
                            <Camera className="w-3 h-3" />
                          </div>
                          <span className="text-[9px] font-semibold text-slate-800 uppercase tracking-wider group-hover:text-[#23471d] transition-colors leading-tight">Media &<br />Partners Register</span>
                        </Link>

                        <Link
                          to="/speaker-registration"
                          onClick={() => {
                            setActiveDropdown(null);
                            analyticsApi.logClick("Registration: Speaker Register");
                          }}
                          className="flex items-center gap-1.5 px-2 py-2 hover:bg-slate-50 text-left transition-all group relative z-20 border-r border-slate-100"
                        >
                          <div className="w-6 h-6 flex-shrink-0 rounded-lg bg-[#23471d]/5 flex items-center justify-center text-[#23471d] group-hover:bg-[#23471d] group-hover:text-white transition-all duration-300 shadow-sm">
                            <Sparkles className="w-3 h-3" />
                          </div>
                          <span className="text-[9px] font-semibold text-slate-800 uppercase tracking-wider group-hover:text-[#23471d] transition-colors leading-tight">Speaker<br />Register</span>
                        </Link>

                        <a
                          href="https://namogange.org/arogya-sangoshthi.php"
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => {
                            setActiveDropdown(null);
                            analyticsApi.logClick("Registration: Delegated Register");
                          }}
                          className="flex items-center gap-1.5 px-2 py-2 hover:bg-slate-50 text-left transition-all group relative z-20"
                        >
                          <div className="w-6 h-6 flex-shrink-0 rounded-lg bg-[#d26019]/5 flex items-center justify-center text-[#d26019] group-hover:bg-[#d26019] group-hover:text-white transition-all duration-300 shadow-sm">
                            <Handshake className="w-3 h-3" />
                          </div>
                          <span className="text-[9px] font-semibold text-slate-800 uppercase tracking-wider group-hover:text-[#d26019] transition-colors leading-tight">Delegated<br />Register</span>
                        </a>
                      </div>
                    </motion.div>
                  </div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        <div className="flex xl:hidden items-center justify-between h-[64px] relative">
          <Link to="/" className="relative z-[150] h-full flex items-center min-w-[140px] ml-2">
            {settings?.logo ? (
              <img
                src={`${SERVER_URL}${settings.logo}`}
                alt="IHWE Logo"
                className="absolute top-1/2 -translate-y-1/2 left-0 h-24 w-auto object-contain drop-shadow-[0_4px_8px_rgba(0,0,0,0.1)]"
              />
            ) : (
              <span className="text-xl font-black text-[#23471d] tracking-tighter">IHWE</span>
            )}
          </Link>

          <button
            className="p-2 rounded-full hover:bg-slate-100 transition-colors relative z-[110]"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? (
              <X className={`w-7 h-7 ${textColor}`} />
            ) : (
              <Menu className={`w-7 h-7 ${textColor}`} />
            )}
          </button>
        </div>
      </div>

      {/* ─── Mobile Menu ─── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 top-[64px] xl:hidden bg-white z-50 flex flex-col"
          >
            <div className="flex-1 overflow-y-auto px-8 py-10">
              <div className="flex flex-col gap-6">
                {navLinks.map((link) => (
                  <div key={link.label} className="border-b border-slate-100/60 pb-6">
                    <Link
                      to={link.path}
                      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                      className={`flex items-center justify-between text-base font-black uppercase tracking-widest ${location.pathname === link.path ? "text-[#d26019]" : "text-slate-900"
                        }`}
                    >
                      {link.label}
                    </Link>
                    {link.dropdown && (
                      <div className="pb-2 pt-1 pl-2 flex flex-col gap-4">
                        {link.dropdown.map((item, idx) => {
                          const isEven = idx % 2 === 0;
                          return (
                            <Link
                              key={item.label}
                              to={item.path}
                              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                              onClick={() => setMobileOpen(false)}
                              className="flex items-start gap-4 group"
                            >
                              <div className={cn(
                                "w-8 h-8 rounded-lg flex items-center justify-center mt-0.5 transition-colors",
                                isEven ? "bg-[#23471d]/5 text-[#23471d]" : "bg-[#d26019]/5 text-[#d26019]"
                              )}>
                                <item.icon className="w-4 h-4" />
                              </div>
                              <div className="flex flex-col">
                                <span className={cn(
                                  "text-[14px] font-bold text-slate-800 transition-colors",
                                  isEven ? "group-active:text-[#23471d]" : "group-active:text-[#d26019]"
                                )}>
                                  {item.label}
                                </span>
                                <span className="text-[12px] text-slate-500">{item.description}</span>
                              </div>
                            </Link>
                          );
                        })}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
              {/* ─── Login & Event Actions (Moved from Topbar) ─── */}
              <div className="flex flex-col gap-3 pt-2 mb-6">
                <div className="flex items-center gap-2 px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl">
                  <CalendarDays className="w-4 h-4 text-[#d26019]" />
                  <span className="text-[12px] font-bold text-slate-600 uppercase tracking-wider">
                    {settings?.topbarDate || "15–17 October 2026"}
                  </span>
                </div>
                
                <div className="grid grid-cols-1 gap-2">
                  <Link
                    to="/exhibitor-login"
                    onClick={() => setMobileOpen(false)}
                    className="w-full flex items-center justify-center gap-2 py-3.5 bg-slate-900 text-white rounded-xl font-bold text-[13px] uppercase tracking-widest shadow-md active:scale-[0.98] transition-all"
                  >
                    <Lock className="w-4 h-4 text-[#d26019]" />
                    Exhibitor Login
                  </Link>
                  <Link
                    to="/buyer-login"
                    onClick={() => setMobileOpen(false)}
                    className="w-full flex items-center justify-center gap-2 py-3.5 bg-slate-900 text-white rounded-xl font-bold text-[13px] uppercase tracking-widest shadow-md active:scale-[0.98] transition-all"
                  >
                    <Lock className="w-4 h-4 text-[#d26019]" />
                    Buyer Login
                  </Link>
                  <div className="grid grid-cols-2 gap-2">
                    <button className="flex items-center justify-center py-3.5 bg-white border border-slate-200 text-slate-800 rounded-xl font-bold text-[11px] uppercase tracking-widest active:scale-[0.98] transition-all">
                      Delegates
                    </button>
                    <button className="flex items-center justify-center py-3.5 bg-white border border-slate-200 text-slate-800 rounded-xl font-bold text-[11px] uppercase tracking-widest active:scale-[0.98] transition-all">
                      User Login
                    </button>
                  </div>
                </div>
              </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
