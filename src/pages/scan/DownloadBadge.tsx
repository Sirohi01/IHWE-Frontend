import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Mail, Phone, Send, CheckCircle, Loader2, Download, 
  User, Lock, Sparkles, LogIn, Eye, EyeOff, Shield, Camera,
  IdCard as IdCardIcon, QrCode as QrIcon, MapPin, Calendar,
  RefreshCw, Printer
} from "lucide-react";
import { settingsApi, heroBackgroundApi, SERVER_URL, visitorAuthApi, eventHighlightsApi } from "@/lib/api";
import Swal from "sweetalert2";
import QRCode from "react-qr-code";
import { toPng } from "html-to-image";


const DownloadBadge = () => {
  const [settings, setSettings] = useState<any>(null);
  const [heroData, setHeroData] = useState<any>(null);
  const [eventData, setEventData] = useState<any>(null);
  const [credentials, setCredentials] = useState("");
  const [otp, setOtp] = useState("");
  const [showOtp, setShowOtp] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isChecking, setIsChecking] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [visitorData, setVisitorData] = useState<any>(null);
  const [maskedEmail, setMaskedEmail] = useState("");
  const [maskedMobile, setMaskedMobile] = useState("");
  
  const badgeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [settingsData, heroRes, eventRes] = await Promise.all([
          settingsApi.get(),
          heroBackgroundApi.getByPage("Visit / Download Badge"),
          eventHighlightsApi.get()
        ]);
        if (settingsData) setSettings(settingsData);
        if (heroRes) setHeroData(heroRes);
        if (eventRes) setEventData(eventRes);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const showAlert = (icon: any, title: string, text: string) => {
    Swal.fire({
      icon: icon,
      title: title,
      text: text,
      confirmButtonColor: '#23471d',
      background: '#f8f9fa',
      customClass: {
        title: 'text-xl font-bold font-inter',
        popup: 'rounded-xl',
        confirmButton: 'py-2 px-6 text-base font-semibold'
      }
    });
  };

  const handleSendOtp = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!credentials) {
      showAlert('warning', 'Missing Information', 'Please enter your registered Email or Mobile Number');
      return;
    }
    setIsLoading(true);
    try {
      const res = await visitorAuthApi.sendOtp(credentials);
      if (res.success) {
        setMaskedEmail(res.data.toEmail);
        setMaskedMobile(res.data.toMobile);
        setShowOtp(true);
        showAlert('success', 'OTP Sent', `A verification code has been sent to your registered Email and WhatsApp`);
      } else {
        showAlert('error', 'Login Failed', res.message || 'Could not send verification code');
      }
    } catch (error) {
      showAlert('error', 'Error', 'Failed to connect to the server');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!otp || otp.length < 6) {
      showAlert('warning', 'Invalid OTP', 'Please enter the 6-digit verification code');
      return;
    }
    setIsChecking(true);
    try {
      const res = await visitorAuthApi.verifyOtp(credentials, otp);
      if (res.success) {
        setVisitorData(res.visitor);
        setIsSuccess(true);
        Swal.fire({
          icon: "success",
          title: "Authenticated!",
          text: "Welcome back! Your badge is ready.",
          timer: 2000,
          showConfirmButton: false,
        });
      } else {
        showAlert('error', 'Verification Failed', res.message || 'Invalid or expired OTP');
      }
    } catch (error) {
      showAlert('error', 'Error', 'Failed to verify OTP');
    } finally {
      setIsChecking(false);
    }
  };

  const handleLogout = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You will need to re-verify your OTP to access your badge again.",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#23471d',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Logout'
    }).then((result) => {
      if (result.isConfirmed) {
        setIsSuccess(false);
        setShowOtp(false);
        setOtp("");
        setCredentials("");
        setVisitorData(null);
      }
    });
  };

  const downloadBadge = () => {
    if (!badgeRef.current) return;
    
    setIsLoading(true);
    toPng(badgeRef.current, { cacheBust: true, pixelRatio: 4 })
      .then((dataUrl) => {
        // Direct conversion to Blob for better browser download tracking
        const arr = dataUrl.split(',');
        const mime = arr[0].match(/:(.*?);/)?.[1] || 'image/png';
        const bstr = atob(arr[1]);
        let n = bstr.length;
        const u8arr = new Uint8Array(n);
        while (n--) {
          u8arr[n] = bstr.charCodeAt(n);
        }
        const blob = new Blob([u8arr], { type: mime });
        
        const blobUrl = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.style.display = 'none';
        link.href = blobUrl;
        link.download = `IHWE_Badge_${visitorData?.registrationId || 'Visitor'}.png`;
        
        document.body.appendChild(link);
        link.click();
        
        // Add a small delay for better browser registration
        setTimeout(() => {
          document.body.removeChild(link);
          window.URL.revokeObjectURL(blobUrl);
          setIsLoading(false);
          showAlert('success', 'Downloaded', 'Your high-resolution badge has been saved.');
        }, 500);
      })
      .catch((err) => {
        console.error('Badge download error:', err);
        setIsLoading(false);
        showAlert('error', 'Download Failed', 'Could not generate badge image. Please try again.');
      });
  };

  const handlePrint = () => {
    if (!badgeRef.current) return;
    
    setIsLoading(true);
    toPng(badgeRef.current, { cacheBust: true, pixelRatio: 4 })
      .then((dataUrl) => {
        // Create a hidden iframe for printing (prevents popup blockers)
        const iframe = document.createElement('iframe');
        iframe.style.position = 'fixed';
        iframe.style.right = '0';
        iframe.style.bottom = '0';
        iframe.style.width = '0';
        iframe.style.height = '0';
        iframe.style.border = '0';
        iframe.style.display = 'none';
        document.body.appendChild(iframe);

        const iframeDoc = iframe.contentWindow?.document;
        if (!iframeDoc) {
          showAlert('error', 'Print Error', 'Could not initialize print engine.');
          setIsLoading(false);
          return;
        }

        iframeDoc.write(`
          <html>
            <head>
              <title>Print Badge - IHWE 2026</title>
              <style>
                @page { size: landscape; margin: 0; }
                body { 
                  margin: 0; 
                  display: flex; 
                  justify-content: center; 
                  align-items: center; 
                  height: 100vh; 
                  background: white;
                }
                img { 
                  max-width: 95%; 
                  max-height: 95%; 
                  object-fit: contain;
                }
              </style>
            </head>
            <body>
              <img src="${dataUrl}" />
              <script>
                window.onload = function() {
                  window.print();
                };
              </script>
            </body>
          </html>
        `);
        iframeDoc.close();

        // Remove iframe after printing
        setTimeout(() => {
          document.body.removeChild(iframe);
          setIsLoading(false);
        }, 3000);
      })
      .catch((err) => {
        console.error('Print error:', err);
        setIsLoading(false);
        showAlert('error', 'Error', 'Failed to generate print preview.');
      });
  };

  const guidelines = [
    "Pass is valid for the registered person's name only.",
    "Pass is non-transferable to protect your personal information.",
    "Kindly get your QR code scanned at the entrance of Halls.",
    "Getting your QR code scanned means allowing the other person to access your business card information.",
    "Please discard your pass into the collection box at the exit gates, when you leave the exhibition.",
    "E- Badge is valid only with the Photo ID in original.",
    "Children below the age of 16 will not be allowed in the exhibition.",
    "Organizers hold the right to ask any visitor to vacate the premises for anti-social activities.",
    "The Decision of organizer will be final and binding, regarding the entry or exit.",
    "Photography & videography is strictly prohibited without prior written permission of the organizer.",
    "Venue is under CCTV surveillance however you are requested to take care of your belongings. The Organizer is not responsible for the loss or theft of any personal belongings."
  ];

  return (
    <div className="bg-[#f9fafb] min-h-screen font-inter pb-20">
      <style dangerouslySetInnerHTML={{ __html: `
        @media print {
          @page { size: landscape; margin: 10mm; }
          body { 
            background: white !important; 
            margin: 0 !important; 
            padding: 0 !important;
          }
          /* Hide EVERYTHING */
          body * { 
            visibility: hidden !important; 
          }
          /* Show ONLY the pass and its contents */
          #id-card-pass, #id-card-pass * { 
            visibility: visible !important; 
          }
          /* Position the pass perfectly for the printer */
          #id-card-pass {
            position: absolute !important;
            left: 50% !important;
            top: 50% !important;
            transform: translate(-50%, -50%) scale(0.95) !important;
            width: 720px !important;
            max-width: none !important;
            margin: 0 !important;
            box-shadow: none !important;
            border: 1px solid #eee !important;
            display: flex !important;
            flex-direction: row !important;
          }
          /* Force horizontal layout even if the screen is small */
          #id-card-pass { flex-direction: row !important; }
          #id-card-pass > div { display: block !important; }
          
          /* Hide all UI elements definitively */
          .no-print, header, footer, button, .swal2-container { 
            display: none !important; 
          }
        }
      `}} />

      {/* ── HERO SECTION (Hidden on Success) ── */}
      {!isSuccess && (
        <section
          className="hero-background-standard no-print"
          style={{ 
            backgroundImage: `url(${heroData?.backgroundImage ? `${SERVER_URL}${heroData.backgroundImage}` : "/src/assets/idcard.jpg"})`
          }}
        >

          <div className="absolute inset-0 bg-black/40" />
          <div
            className="absolute bottom-0 left-0 w-full h-4 md:h-8 bg-[#f9fafb]"
            style={{ clipPath: "ellipse(60% 100% at 50% 100%)" }}
          />

          <div className="container mx-auto px-4 text-center text-white relative z-10" data-aos="fade-up">
            <p className="text-sm uppercase tracking-[0.4em] mb-4 opacity-80">
              {heroData?.title || "Entry Pass"}
            </p>
            <h1 className="text-4xl md:text-6xl font-inter font-semibold mb-6 tracking-tight">
              {heroData?.heading || "Download Badge"}
            </h1>
            <p className="text-white/70 text-base md:text-lg mb-8 max-w-2xl mx-auto font-light leading-relaxed">
              {heroData?.shortDescription || "Access your digital entry pass for the 9th International Expo."}
            </p>
          </div>
        </section>
      )}

      <section className={`${!isSuccess ? "mt-8 md:-mt-20" : "pt-10 md:pt-20"} pb-20 relative overflow-hidden z-20 badge-container-wrapper`}>
        {/* Decorative elements */}
        {!isSuccess && (
          <>
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#23471d]/5 rounded-full blur-[120px] -mr-48 -mt-48" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#d26019]/5 rounded-full blur-[120px] -ml-48 -mb-48" />
          </>
        )}

        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <AnimatePresence mode="wait">
              {!isSuccess ? (
                <motion.div 
                  key="login-section"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="grid lg:grid-cols-2 gap-12 items-center no-print"
                >
                  {/* Left Side: Brand & Info */}
                  <div className="space-y-8" data-aos="fade-right">
                    <div className="flex items-center gap-6">
                      <img 
                        src={settings?.logo ? `${SERVER_URL}${settings.logo}` : "/logo.png"} 
                        alt="IHWE Logo" 
                        className="h-24 w-auto object-contain"
                      />
                      <div className="h-16 w-px bg-slate-200" />
                      <div>
                        <h2 className="text-3xl font-inter font-bold text-slate-900">
                          Digital <span className="text-[#23471d]">Entry</span>
                        </h2>
                        <p className="text-[#d26019] font-bold tracking-[0.2em] uppercase text-xs">Access Portal</p>
                      </div>
                    </div>

                    <div className="space-y-6">
                      <p className="text-slate-600 text-lg leading-relaxed">
                        To maintain a paperless and sustainable event, we've moved all entry badges to digital format. 
                        Simply login to view and download your unique QR-enabled pass.
                      </p>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {[
                          { icon: Shield, title: "Secure Access", desc: "OTP protected login" },
                          { icon: IdCardIcon, title: "Virtual Badge", desc: "Always on your phone" },
                          { icon: QrIcon, title: "Quick Entry", desc: "Scan and proceed" },
                          { icon: Sparkles, title: "Sustainable", desc: "Eco-friendly pass" }
                        ].map((item, idx) => (
                          <div key={idx} className="flex items-center gap-4 bg-white p-4 border-2 border-[#23471d]/20 transition-all shadow-sm">
                            <div className="w-10 h-10 bg-[#23471d]/5 flex items-center justify-center text-[#23471d]">
                              <item.icon size={20} />
                            </div>
                            <div>
                              <p className="text-sm font-bold text-slate-800">{item.title}</p>
                              <p className="text-[10px] text-slate-400 uppercase tracking-wider">{item.desc}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Right Side: Login Form */}
                  <div className="bg-white border border-slate-200 p-8 md:p-10 shadow-xl relative" data-aos="fade-left">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-[#23471d]/10 to-transparent -rotate-45" />
                    
                    <div className="mb-10 text-center lg:text-left">
                      <h3 className="text-3xl font-inter font-bold text-slate-900 mb-2">Welcome Back!</h3>
                      <p className="text-slate-500 text-sm">Sign in to download your interior design expo badge</p>
                    </div>

                    <form className="space-y-6">
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-widest text-[#23471d] mb-3">Email or Mobile Number</label>
                        <div className="relative group">
                          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-[#23471d] transition-colors">
                            <User size={18} />
                          </div>
                          <input 
                            type="text" 
                            disabled={showOtp}
                            value={credentials}
                            onChange={(e) => setCredentials(e.target.value)}
                            placeholder="Enter registered credentials" 
                            className="w-full pl-12 pr-4 py-4 bg-white border-2 border-slate-100 focus:outline-none focus:border-[#23471d] transition-all text-sm placeholder:text-slate-300"
                          />
                        </div>
                      </div>

                      {showOtp && (
                        <motion.div 
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          className="space-y-6 pt-2"
                        >
                          <div>
                            <label className="block text-xs font-bold uppercase tracking-widest text-[#23471d] mb-3">One-Time Password (OTP)</label>
                            <div className="relative group">
                              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-[#23471d] transition-colors">
                                <Lock size={18} />
                              </div>
                              <input 
                                type="text"
                                maxLength={6}
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                                placeholder="Enter 6-digit code" 
                                className="w-full pl-12 pr-4 py-4 bg-white border-2 border-slate-100 focus:outline-none focus:border-[#23471d] transition-all text-sm tracking-[0.5em] font-bold"
                              />
                            </div>
                            <div className="flex justify-between items-center mt-3">
                               <button type="button" onClick={() => setShowOtp(false)} className="text-[10px] font-bold text-slate-400 hover:text-red-500 uppercase flex items-center gap-2">
                                 <RefreshCw size={12} /> Change
                               </button>
                               <button type="button" onClick={() => handleSendOtp()} className="text-[10px] font-bold text-[#d26019] hover:underline uppercase">
                                 Resend OTP
                               </button>
                            </div>
                          </div>
                        </motion.div>
                      )}

                      {!showOtp ? (
                        <button 
                          onClick={handleSendOtp}
                          disabled={isLoading}
                          className="w-full bg-[#23471d] hover:bg-[#1a3a14] text-white font-bold py-5 px-6 transition-all duration-300 flex items-center justify-center gap-3 uppercase tracking-widest text-xs shadow-lg hover:shadow-[#23471d]/20 mt-8"
                        >
                          {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send size={16} />}
                          <span>Send Verification OTP</span>
                        </button>
                      ) : (
                        <button 
                          onClick={handleLogin}
                          disabled={isChecking}
                          className="w-full bg-[#d26019] hover:bg-[#b04d12] text-white font-bold py-5 px-6 transition-all duration-300 flex items-center justify-center gap-3 uppercase tracking-widest text-xs shadow-lg hover:shadow-[#d26019]/20 mt-8"
                        >
                          {isChecking ? <Loader2 className="w-5 h-5 animate-spin" /> : <LogIn size={16} />}
                          <span>Sign in to Dashboard</span>
                        </button>
                      )}

                      <div className="mt-10 p-5 bg-slate-50 border border-slate-100 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-16 h-16 bg-[#23471d]/5 rounded-full -mr-8 -mt-8" />
                        <p className="text-[10px] text-center text-slate-400 font-bold uppercase tracking-widest mb-4">
                          🔐 Demo Verification
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 text-xs">
                          <div className="bg-white px-4 py-2.5 border border-slate-200">
                            <span className="text-slate-400">Mobile: </span>
                            <span className="font-bold text-[#23471d]">Random</span>
                          </div>
                          <div className="bg-white px-4 py-2.5 border border-slate-200">
                            <span className="text-slate-400">OTP: </span>
                            <span className="font-bold text-[#23471d]">Any 6 digits</span>
                          </div>
                        </div>
                      </div>
                    </form>

                    <p className="text-center text-[10px] text-slate-900 mt-10 pt-6 border-t border-slate-100 uppercase tracking-[0.2em] font-bold">
                      © {new Date().getFullYear()} <span className="text-[#23471d]">International Health & Wellness</span> <span className="text-[#d26019]">Expo</span>
                    </p>
                  </div>
                </motion.div>
              ) : (
                <motion.div 
                  key="badge-section"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col items-center justify-center"
                >
                  {/* ACTION BAR */}
                  <div className="w-full max-w-4xl flex items-center justify-between mb-8 bg-white p-4 shadow-sm border border-slate-100 no-print">
                      <div className="flex items-center gap-2">
                        <CheckCircle size={18} className="text-[#23471d]" />
                        <span className="text-sm font-bold uppercase tracking-wider text-slate-700">Visitor Badge Ready</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <button 
                          onClick={handlePrint}
                          className="flex items-center gap-2 bg-slate-100 px-4 py-2 rounded text-[10px] font-black text-slate-600 hover:bg-slate-200 transition-all uppercase tracking-widest"
                        >
                           <Printer size={14} /> Print
                        </button>
                        <button 
                          onClick={handleLogout}
                          className="flex items-center gap-2 bg-red-50 text-red-600 px-4 py-2 rounded text-[10px] font-black hover:bg-red-100 transition-all uppercase tracking-widest"
                        >
                           <LogIn size={14} className="rotate-180" /> Logout
                        </button>
                      </div>
                  </div>

                  {/* THE PASS (SMALLER SIZE & REFINED STYLING) */}
                  <div 
                    ref={badgeRef}
                    id="id-card-pass"
                    className="w-full max-w-[720px] bg-white flex flex-col md:flex-row shadow-2xl border border-slate-100 relative overflow-hidden"
                  >
                    {/* LEFT PANE: VISITOR DETAILS */}
                    <div className="w-full md:w-[58%] flex flex-col items-center p-6 relative">
                        <div className="absolute top-0 left-0 w-20 h-20 bg-[#23471d]/5 rounded-br-full" />
                        
                        {/* REFINED HEADER: LOGO LEFT, DETAILS RIGHT */}
                        <div className="flex items-center gap-6 mb-8 w-full px-6">
                          <img 
                            src={settings?.logo ? `${SERVER_URL}${settings.logo}` : "/logo.png"} 
                            alt="Logo" 
                            className="h-28 w-auto object-contain"
                          />
                          <div className="h-20 w-px bg-slate-200" />
                          <div className="flex flex-col text-left">
                            <h4 className="text-base font-inter font-black text-[#d26019] leading-tight uppercase">
                              {eventData?.venueName || "Dubai World Trade Centre"}
                            </h4>
                            <p className="text-[9px] font-bold text-slate-500 uppercase tracking-tight mb-1">
                              {eventData?.venueAddress || "Hall 6, Sheikh Zayed Road, Dubai"}
                            </p>
                            <div className="flex items-center gap-2 mt-1">
                               <div className="h-2 w-2 rounded-full bg-[#23471d]" />
                               <span className="text-[10px] font-black text-[#23471d] uppercase tracking-wider">
                                  {eventData?.eventDate || "21 - 23 August 2026"}
                               </span>
                            </div>
                          </div>
                        </div>

                        <div className="text-center w-full mb-6 px-4">
                          <h3 className="text-4xl font-inter font-black text-slate-900 mb-1 uppercase tracking-tight leading-tight">
                             {visitorData?.firstName} {visitorData?.lastName}
                          </h3>
                          <p className="text-sm font-bold text-[#d26019] uppercase tracking-widest mb-1">
                             {visitorData?.designation}
                          </p>
                          <p className="text-xl font-inter font-black text-[#23471d] uppercase px-4 truncate">
                             {visitorData?.companyName}
                          </p>
                           <p className="text-lg font-bold text-slate-800 uppercase tracking-widest mt-1">{visitorData?.country}</p>
                        </div>

                        {/* QR Code Container */}
                        <div className="bg-white p-3 border border-slate-50 shadow-inner mb-3">
                          <QRCode 
                            value={visitorData?.registrationId || "IHWE-2026"} 
                            size={120}
                            fgColor="#000000"
                          />
                        </div>
                        <p className="text-[10px] font-black text-[#23471d] bg-[#23471d]/5 px-5 py-1.5 rounded-full uppercase tracking-[0.2em] mb-8">
                           Valid from {eventData?.eventDate || "21 - 23 August 2026"}
                        </p>

                        {/* Visitor Label Bar (BASED ON IMAGE) */}
                        <div className="w-full bg-[#1ab05c] py-3 mb-4 shadow-lg flex items-center justify-center">
                          <span className="text-2xl font-inter font-black text-white uppercase tracking-[0.2em]">
                            VISITOR
                          </span>
                        </div>

                        <div className="text-center">
                           <p className="text-base font-black text-slate-900 mb-0.5">User ID : {visitorData?.registrationId}</p>
                           <p className="text-[8px] font-bold text-slate-500 uppercase tracking-widest opacity-70">NOTE: E-badge is valid with photo ID in original.</p>
                        </div>
                    </div>

                    <div className="hidden md:block w-px border-l-2 border-dashed border-slate-200 my-6" />

                    {/* RIGHT PANE: GUIDELINES */}
                    <div className="w-full md:w-[42%] bg-slate-50/30 p-6 flex flex-col">
                        <h4 className="text-xl font-inter font-black text-slate-900 border-b-2 border-slate-900 pb-2 mb-5 uppercase leading-tight">
                           Visitor Pass <span className="block text-lg">Guidelines</span>
                        </h4>
                        <ul className="space-y-3 text-[10px] text-slate-700 leading-tight list-none font-medium">
                           {guidelines.map((text, i) => (
                             <li key={i} className="flex gap-2">
                               <span className="font-bold text-slate-900">{i + 1}.</span>
                               <span>{text}</span>
                             </li>
                           ))}
                        </ul>
                        
                        <div className="mt-auto pt-6 text-center md:text-left opacity-30">
                           <img src={settings?.logo ? `${SERVER_URL}${settings.logo}` : "/logo.png"} className="h-6 grayscale brightness-0 mb-1 mx-auto md:mx-0" />
                           <p className="text-[6px] font-bold uppercase tracking-widest">Namo Gange Trust Initiative</p>
                        </div>
                    </div>
                  </div>

                  <div className="mt-12 flex flex-col sm:flex-row gap-4 no-print" data-aos="fade-up">
                    <button 
                      onClick={downloadBadge}
                      disabled={isLoading}
                      className="flex items-center justify-center gap-3 bg-[#23471d] text-white px-12 py-5 font-bold uppercase tracking-widest text-xs hover:bg-[#1a3a14] transition-all shadow-xl hover:shadow-[#23471d]/20 border border-transparent hover:border-white/10"
                    >
                      {isLoading ? <Loader2 size={18} className="animate-spin" /> : <Download size={18} />}
                      DOWNLOAD IMAGE PASS (PNG)
                    </button>
                    <button 
                      onClick={handleLogout}
                      className="flex items-center justify-center gap-3 bg-white text-red-600 border border-red-100 px-12 py-5 font-bold uppercase tracking-widest text-xs hover:bg-red-50 transition-all shadow-lg"
                    >
                      LOGOUT SESSION
                    </button>
                  </div>

                  <p className="text-[10px] text-slate-400 mt-10 max-w-sm text-center uppercase font-bold tracking-[0.2em] opacity-60 no-print">
                    © 2026 International Health & Wellness Expo
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DownloadBadge;
