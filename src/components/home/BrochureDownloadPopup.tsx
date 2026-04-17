import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, Download, User, Building, Phone, Send, Heart, FileText } from "lucide-react";
import { brochureLeadApi, settingsApi, SERVER_URL } from "@/lib/api";
import { toast } from "sonner";

const BrochureDownloadPopup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    phone: "",
    interest: "Exhibitor",
  });
  const [brochureUrl, setBrochureUrl] = useState("");

  useEffect(() => {
    if (!isHomePage) {
      setIsOpen(false);
      return;
    }
    
    console.log("Brochure popup useEffect hit");
    const timer = setTimeout(() => {
      console.log("Setting brochure popup to open");
      setIsOpen(true);
    }, 1000); 
    return () => clearTimeout(timer);
  }, [isHomePage]);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const settings = await settingsApi.get();
        if (settings?.exhibitorBrochurePdf) {
          const path = settings.exhibitorBrochurePdf;
          const fullUrl = path.startsWith("http") ? path : `${SERVER_URL}${path.startsWith("/") ? path : "/" + path}`;
          setBrochureUrl(fullUrl);
        }
      } catch (error) {
        console.error("Failed to fetch brochure URL:", error);
      }
    };
    fetchSettings();
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    sessionStorage.setItem("brochure_popup_closed", "true");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.company || !formData.phone) {
      toast.error("Please fill all required fields");
      return;
    }

    try {
      setIsSubmitting(true);
      const res = await brochureLeadApi.submit(formData);
      if (res.success) {
        toast.success("Details submitted! Downloading brochure...");
        
        // Trigger download
        if (brochureUrl) {
          const link = document.createElement("a");
          link.href = brochureUrl;
          link.setAttribute("download", "Exhibitor_Brochure.pdf");
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        } else {
          toast.error("Brochure file not found. Contact administrator.");
        }
        
        // Close after a short delay
        setTimeout(() => handleClose(), 2000);
      } else {
        toast.error(res.message || "Failed to submit details");
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={handleClose}
          />
          
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="relative w-full max-w-xl bg-white overflow-hidden shadow-2xl flex flex-col md:flex-row border border-slate-100"
          >
            {/* Left Side - Image/Info */}
            <div className="hidden md:flex w-[30%] bg-[#23471d] p-6 flex-col justify-between text-white border-r border-white/10">
              <div>
                <div className="w-10 h-10 bg-white/10 flex items-center justify-center mb-6 backdrop-blur-md">
                  <FileText className="text-white" size={20} />
                </div>
                <h3 className="text-xl font-bold leading-tight mb-3 uppercase tracking-tight">
                  Exhibitor Brochure
                </h3>
                <p className="text-white/60 text-[10px] leading-relaxed font-light">
                  Get exclusive insights into the 9th International Health & Wellness Expo.
                </p>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-[10px] text-white/50">
                  <div className="w-1 h-1 bg-[#d26019]" />
                  Full Schedule
                </div>
                <div className="flex items-center gap-2 text-[10px] text-white/50">
                  <div className="w-1 h-1 bg-[#d26019]" />
                  Floor Plans
                </div>
                <div className="flex items-center gap-2 text-[10px] text-white/50">
                  <div className="w-1 h-1 bg-[#d26019]" />
                  Speakers
                </div>
              </div>
            </div>

            {/* Right Side - Form */}
            <div className="flex-1 p-6 bg-white relative">
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-900 transition-colors"
                title="Close"
              >
                <X size={20} />
              </button>

              <div className="mb-6">
                <div className="flex items-center gap-2 mb-1">
                  <div className="h-px w-4 bg-[#23471d]" />
                  <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-[#23471d]">Inquiry Form</span>
                </div>
                <h2 className="text-lg font-bold text-slate-900 uppercase tracking-tight">Download Brochure 2026</h2>
              </div>

              <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
                <div className="col-span-1">
                  <input
                    type="text"
                    placeholder="Full Name *"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2.5 border-2 border-slate-200 text-xs outline-none focus:border-[#23471d] transition-all bg-white"
                  />
                </div>

                <div className="col-span-1">
                  <input
                    type="text"
                    placeholder="Company Name *"
                    required
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="w-full px-4 py-2.5 border-2 border-slate-200 text-xs outline-none focus:border-[#23471d] transition-all bg-white"
                  />
                </div>

                <div className="col-span-1">
                  <input
                    type="tel"
                    placeholder="Phone Number *"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-2.5 border-2 border-slate-200 text-xs outline-none focus:border-[#23471d] transition-all bg-white"
                  />
                </div>

                <div className="col-span-1">
                  <select
                    value={formData.interest}
                    onChange={(e) => setFormData({ ...formData, interest: e.target.value })}
                    className="w-full px-4 py-[11px] border-2 border-slate-200 text-xs outline-none focus:border-[#23471d] transition-all bg-white text-gray-500"
                  >
                    <option value="">Select Interest...</option>
                    <option value="Exhibitor">Exhibitor</option>
                    <option value="Visitor">Visitor</option>
                    <option value="Speaker">Speaker</option>
                    <option value="Media">Media/Press</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div className="col-span-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 bg-[#23471d] text-white font-bold flex items-center justify-center gap-2 hover:bg-[#1a3a14] transition-all uppercase tracking-widest text-xs shadow-md active:scale-[0.98] disabled:bg-slate-300"
                  >
                    {isSubmitting ? (
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <>
                        Download Brochure <Download size={16} />
                      </>
                    )}
                  </button>
                </div>
              </form>
              
              <p className="mt-4 text-[8px] text-center text-slate-400 uppercase tracking-wider font-medium">
                Instant access to event floorplan & schedule.
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default BrochureDownloadPopup;
