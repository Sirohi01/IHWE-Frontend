import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { API_URL } from "@/lib/api";
import { CheckCircle, XCircle, Loader2, User, Building2, Phone, Mail, MapPin, Tag, Globe, Hash, Calendar, ShoppingBag } from "lucide-react";

interface Buyer {
  registrationId: string;
  fullName: string;
  designation?: string;
  companyName: string;
  businessType?: string;
  mobileNumber: string;
  emailAddress: string;
  website?: string;
  registeredAddress?: string;
  city?: string;
  stateProvince?: string;
  country?: string;
  registrationCategory?: string;
  primaryProductInterest?: string;
  buyerTag?: string;
  paymentStatus?: string;
  preferredMeetingDate?: string;
  preferredTimeSlot?: string;
  createdAt?: string;
}

const Field = ({ icon: Icon, label, value }: { icon: any; label: string; value?: string }) => {
  if (!value) return null;
  return (
    <div className="flex items-start gap-3 py-3 border-b border-gray-100 last:border-0">
      <div className="mt-0.5 p-1.5 bg-blue-50 rounded-md">
        <Icon className="w-4 h-4 text-blue-600" />
      </div>
      <div>
        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{label}</p>
        <p className="text-sm font-semibold text-gray-800 mt-0.5">{value}</p>
      </div>
    </div>
  );
};

const tagColors: Record<string, string> = {
  Hot: 'bg-red-100 text-red-700',
  Warm: 'bg-orange-100 text-orange-700',
  Cold: 'bg-blue-100 text-blue-700',
};

const BuyerScan = () => {
  const [searchParams] = useSearchParams();
  const registrationId = searchParams.get("id");
  const [buyer, setBuyer] = useState<Buyer | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!registrationId) { setError("No registration ID provided."); setLoading(false); return; }
    fetch(`${API_URL}/buyer-registration/scan/${encodeURIComponent(registrationId)}`)
      .then((r) => r.json())
      .then((d) => {
        if (d.success) setBuyer(d.data);
        else setError("Buyer not found for this QR code.");
      })
      .catch(() => setError("Failed to fetch buyer data. Please try again."))
      .finally(() => setLoading(false));
  }, [registrationId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f0f7ff] flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-10 h-10 text-blue-600 animate-spin mx-auto mb-3" />
          <p className="text-sm text-gray-500 font-medium">Fetching buyer details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-red-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-lg p-8 max-w-sm w-full text-center">
          <XCircle className="w-14 h-14 text-red-500 mx-auto mb-4" />
          <h2 className="text-lg font-bold text-gray-800 mb-2">Invalid QR Code</h2>
          <p className="text-sm text-gray-500">{error}</p>
          <p className="text-xs text-gray-400 mt-3 font-mono break-all">{registrationId}</p>
        </div>
      </div>
    );
  }

  if (!buyer) return null;

  const registeredOn = buyer.createdAt
    ? new Date(buyer.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })
    : undefined;

  return (
    <div className="min-h-screen bg-[#f0f7ff] py-8 px-4">
      <div className="max-w-2xl mx-auto">

        {/* Header */}
        <div className="bg-[#1e3a5f] rounded-2xl p-6 text-white text-center mb-4 shadow-lg">
          <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-70 mb-1">9th IHWE 2026 — Buyer Pass</p>
          <h1 className="text-2xl font-black uppercase tracking-wide">{buyer.fullName}</h1>
          {buyer.designation && <p className="text-sm opacity-80 mt-1">{buyer.designation}</p>}
          <p className="text-xs opacity-60 mt-0.5 font-medium">{buyer.companyName}</p>
        </div>

        {/* Status row */}
        <div className="flex items-center justify-between bg-white rounded-xl px-5 py-3 shadow-sm mb-4">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-green-500" />
            <span className="text-sm font-bold text-gray-700">Registration Confirmed</span>
          </div>
          <div className="flex gap-2">
            {buyer.buyerTag && (
              <span className={`text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wider ${tagColors[buyer.buyerTag] || 'bg-gray-100 text-gray-500'}`}>
                {buyer.buyerTag} Buyer
              </span>
            )}
          </div>
        </div>

        {/* Registration ID */}
        <div className="bg-[#1e3a5f]/5 border border-[#1e3a5f]/20 rounded-xl px-5 py-3 mb-4 text-center">
          <p className="text-[10px] font-black text-[#1e3a5f] uppercase tracking-widest mb-1">Registration ID</p>
          <p className="text-base font-black text-[#1e3a5f] font-mono">{buyer.registrationId}</p>
        </div>

        {/* Booking Details */}
        <div className="bg-white rounded-2xl shadow-sm p-5 mb-4">
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">Registration Details</p>
          <Field icon={Tag} label="Category" value={buyer.registrationCategory} />
          <Field icon={ShoppingBag} label="Primary Product Interest" value={buyer.primaryProductInterest} />
          <Field icon={Calendar} label="Preferred Meeting Date" value={buyer.preferredMeetingDate} />
          <Field icon={Calendar} label="Preferred Time Slot" value={buyer.preferredTimeSlot} />
          <Field icon={Calendar} label="Registered On" value={registeredOn} />
        </div>

        {/* Contact & Company */}
        <div className="bg-white rounded-2xl shadow-sm p-5 mb-4">
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">Contact & Company</p>
          <Field icon={Mail} label="Email" value={buyer.emailAddress} />
          <Field icon={Phone} label="Mobile" value={buyer.mobileNumber} />
          <Field icon={Building2} label="Business Type" value={buyer.businessType} />
          <Field icon={Globe} label="Website" value={buyer.website} />
          <Field icon={MapPin} label="City" value={buyer.city} />
          <Field icon={MapPin} label="State" value={buyer.stateProvince} />
          <Field icon={Globe} label="Country" value={buyer.country} />
        </div>

        <p className="text-center text-[10px] text-gray-400 mt-6 font-medium">
          9th International Health & Wellness Expo 2026<br />
          Hall 8, 9 & 10 · Pragati Maidan, New Delhi · 21–23 Aug 2026
        </p>
      </div>
    </div>
  );
};

export default BuyerScan;
