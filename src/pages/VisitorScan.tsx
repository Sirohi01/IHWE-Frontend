import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { API_URL } from "@/lib/api";
import { CheckCircle, XCircle, Loader2, User, Building2, Phone, Mail, MapPin, Calendar, Tag, Globe, QrCode, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";

interface Visitor {
  registrationId: string;
  firstName: string;
  lastName: string;
  email: string;
  mobile: string;
  designation?: string;
  companyName?: string;
  companyWebsite?: string;
  industrySector?: string;
  companySize?: string;
  country?: string;
  state?: string;
  city?: string;
  b2bMeeting?: string;
  purposeOfVisit?: string[];
  areaOfInterest?: string[];
  registrationFor?: string;
  status?: string;
  createdAt?: string;
}

const Field = ({ icon: Icon, label, value }: { icon: any; label: string; value?: string }) => {
  if (!value) return null;
  return (
    <div className="flex items-center gap-3 py-3 border-b border-gray-100/50 last:border-0 hover:bg-slate-50/50 transition-colors px-2 rounded-lg">
      <div className="p-2 bg-[#23471d]/5 rounded-lg">
        <Icon className="w-4 h-4 text-[#23471d]" />
      </div>
      <div>
        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{label}</p>
        <p className="text-sm font-semibold text-gray-800">{value}</p>
      </div>
    </div>
  );
};

const VisitorScan = () => {
  const [searchParams] = useSearchParams();
  const registrationId = searchParams.get("id");
  const [visitor, setVisitor] = useState<Visitor | null>(null);
  const [visitorType, setVisitorType] = useState<string>("Visitor Pass");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!registrationId) return;

    const lookups: { url: string; label: string }[] = [
      { url: "corporate-visitors", label: "Corporate Visitor Pass" },
      { url: "general-visitors", label: "General Visitor Pass" },
      { url: "international-visitors", label: "International Visitor Pass" },
      { url: "health-camp-visitors", label: "Health Camp Visitor Pass" },
    ];

    const findVisitor = async () => {
      for (const { url, label } of lookups) {
        try {
          const res = await fetch(`${API_URL}/${url}/scan/${encodeURIComponent(registrationId)}`);
          const data = await res.json();
          if (data.success) {
            setVisitor(data.data);
            setVisitorType(label);
            return;
          }
        } catch {
          // try the next visitor type
        }
      }
      setError("Visitor not found for this QR code.");
    };

    findVisitor().finally(() => setLoading(false));
  }, [registrationId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#f0fdf4] to-[#e0f2fe] flex items-center justify-center">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center bg-white p-8 rounded-3xl shadow-xl flex flex-col items-center"
        >
          <div className="relative">
            <div className="absolute inset-0 bg-[#23471d] blur-xl opacity-20 rounded-full animate-pulse"></div>
            <Loader2 className="w-12 h-12 text-[#23471d] animate-spin relative z-10 mx-auto mb-4" />
          </div>
          <p className="text-base text-gray-700 font-semibold">Authenticating Pass...</p>
        </motion.div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 flex items-center justify-center p-4">
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-white rounded-3xl shadow-2xl p-8 max-w-sm w-full text-center border border-red-100"
        >
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-5">
            <XCircle className="w-10 h-10 text-red-500" />
          </div>
          <h2 className="text-2xl font-black text-gray-800 mb-2">Invalid Pass</h2>
          <p className="text-sm text-gray-500 mb-6">{error}</p>
          <div className="bg-gray-50 rounded-xl p-3">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Scanned ID</p>
            <p className="text-sm font-mono text-gray-700 break-all">{registrationId}</p>
          </div>
        </motion.div>
      </div>
    );
  }

  if (!visitor) return null;

  const fullName = `${visitor.firstName} ${visitor.lastName}`.trim();
  const registeredOn = visitor.createdAt
    ? new Date(visitor.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })
    : undefined;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#e0fce9] via-[#f0fdf4] to-[#f8fafc] py-10 px-4 flex items-center justify-center font-sans overflow-hidden relative">
      
      {/* Background abstract shapes */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-green-200 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-[pulse_6s_ease-in-out_infinite]"></div>
      <div className="absolute top-[20%] right-[-10%] w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-[pulse_8s_ease-in-out_infinite_2s]"></div>
      <div className="absolute bottom-[-10%] left-[20%] w-80 h-80 bg-emerald-200 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-[pulse_7s_ease-in-out_infinite_4s]"></div>

      <motion.div 
        initial={{ y: 40, opacity: 0, scale: 0.95 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        transition={{ type: "spring", stiffness: 100, damping: 15 }}
        className="max-w-[420px] w-full relative z-10"
      >
        {/* Pass Container */}
        <div className="bg-white rounded-[32px] shadow-2xl overflow-hidden relative border border-white/50 backdrop-blur-sm">
          
          {/* Top Section - Brand & Status */}
          <div className="bg-gradient-to-r from-[#0f2a0d] via-[#1a3615] to-[#23471d] py-5 px-6 relative overflow-hidden flex flex-col justify-center items-start border-b-[3px] border-[#386b2e]">
            {/* Subtle overlay pattern */}
            <div className="absolute inset-0 opacity-5 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] mix-blend-overlay"></div>
            <div className="absolute -right-10 -top-10 w-32 h-32 bg-green-500/10 rounded-full blur-2xl"></div>
            
            <div className="relative z-10 w-full flex justify-between items-start mb-1">
              <p className="text-[9px] font-black text-green-400 uppercase tracking-[0.25em] bg-green-900/40 px-2 py-0.5 rounded backdrop-blur-sm border border-green-500/20">{visitorType}</p>
              <div className="text-right">
                <p className="text-[10px] font-bold text-white/50 tracking-wider">IHWE 2026</p>
              </div>
            </div>

            <h1 className="relative z-10 text-2xl font-black text-white uppercase tracking-wider leading-none mt-2 mb-1 drop-shadow-md">{fullName}</h1>
            
            <div className="relative z-10 mt-1 flex flex-col gap-0.5">
              {visitor.designation && (
                <p className="text-[13px] font-medium text-green-100/90 leading-tight">{visitor.designation}</p>
              )}
              {visitor.companyName && (
                <p className="text-[11px] font-bold text-white/60 uppercase tracking-widest leading-tight">{visitor.companyName}</p>
              )}
            </div>
          </div>

          {/* Ticket Notch (Left & Right Cutouts) */}
          <div className="relative h-10 bg-white flex items-center px-6">
            <div className="absolute left-[-20px] w-10 h-10 bg-[#eefaf2] rounded-full shadow-inner z-10"></div>
            <div className="absolute right-[-20px] w-10 h-10 bg-[#eefaf2] rounded-full shadow-inner z-10"></div>
            {/* Perforated Line */}
            <div className="w-full border-t-[2.5px] border-dashed border-gray-200/80"></div>
          </div>

          {/* Registration Info Section */}
          <div className="px-8 pb-8 pt-1 bg-white">
            <div className="flex items-center justify-between bg-gradient-to-r from-green-50 to-emerald-50/50 rounded-2xl p-4 mb-6 border border-green-100/80 shadow-sm">
              <div>
                <p className="text-[10px] font-black text-green-800 uppercase tracking-widest mb-1">Status</p>
                <div className="flex items-center gap-2">
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                  </span>
                  <span className="text-sm font-bold text-green-700 uppercase tracking-wide">{visitor.status || "Verified"}</span>
                </div>
              </div>
              <div className="text-right">
                <p className="text-[10px] font-black text-green-800 uppercase tracking-widest mb-1">Reg ID</p>
                <p className="text-sm font-black text-gray-800 font-mono tracking-wider">{visitor.registrationId}</p>
              </div>
            </div>

            {/* Scrollable details if too long */}
            <div className="max-h-[320px] overflow-y-auto pr-3" style={{ scrollbarWidth: 'thin' }}>
              <div className="space-y-1">
                <Field icon={Mail} label="Email Address" value={visitor.email} />
                <Field icon={Phone} label="Contact Number" value={visitor.mobile} />
                <Field icon={Building2} label="Company Name" value={visitor.companyName} />
                <Field icon={Tag} label="Industry Sector" value={visitor.industrySector} />
                <Field icon={User} label="Company Size" value={visitor.companySize} />
                <Field icon={MapPin} label="Location" value={[visitor.city, visitor.state, visitor.country].filter(Boolean).join(", ")} />
                <Field icon={Calendar} label="Registration Date" value={registeredOn} />
              </div>

              {(visitor.purposeOfVisit?.length || visitor.areaOfInterest?.length) && (
                <div className="mt-5 pt-5 border-t border-gray-100">
                  {visitor.purposeOfVisit?.length ? (
                    <div className="mb-5">
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2.5 px-2">Purpose of Visit</p>
                      <div className="flex flex-wrap gap-2 px-2">
                        {visitor.purposeOfVisit.map((p) => (
                          <span key={p} className="text-xs bg-gray-50 text-gray-700 border border-gray-200 px-3 py-1.5 rounded-xl font-medium shadow-sm transition-all hover:shadow-md hover:bg-gray-100">{p}</span>
                        ))}
                      </div>
                    </div>
                  ) : null}
                  
                  {visitor.areaOfInterest?.length ? (
                    <div className="mb-2">
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2.5 px-2">Area of Interest</p>
                      <div className="flex flex-wrap gap-2 px-2">
                        {visitor.areaOfInterest.map((a) => (
                          <span key={a} className="text-xs bg-[#23471d]/5 text-[#23471d] border border-[#23471d]/20 px-3 py-1.5 rounded-xl font-medium shadow-sm transition-all hover:shadow-md hover:bg-[#23471d]/10">{a}</span>
                        ))}
                      </div>
                    </div>
                  ) : null}
                </div>
              )}
            </div>

          </div>

          {/* Footer - Event Details */}
          <div className="bg-gradient-to-b from-gray-50 to-gray-100/50 p-6 border-t border-gray-100 flex flex-col items-center justify-center">
            <div className="flex items-center gap-3 opacity-60 mb-2">
              <QrCode className="w-8 h-8 text-gray-800" />
              <div className="text-left">
                <p className="text-xs font-black text-gray-800 uppercase tracking-wider">9th IHWE 2026</p>
                <p className="text-[10px] font-semibold text-gray-500 uppercase tracking-wide mt-0.5">Hall 12, Pragati Maidan</p>
              </div>
            </div>
            <p className="text-[9px] font-bold text-gray-400 uppercase tracking-[0.2em] mt-1 text-center">Scan valid for entry</p>
          </div>
          
        </div>
      </motion.div>
    </div>
  );
};

export default VisitorScan;
