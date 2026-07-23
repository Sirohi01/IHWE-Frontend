import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { API_URL } from "@/lib/api";
import { CheckCircle, XCircle, Loader2, User, Building2, Phone, Mail, MapPin, Calendar, Tag, Globe } from "lucide-react";

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
    <div className="flex items-start gap-3 py-3 border-b border-gray-100 last:border-0">
      <div className="mt-0.5 p-1.5 bg-green-50 rounded-md">
        <Icon className="w-4 h-4 text-[#23471d]" />
      </div>
      <div>
        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{label}</p>
        <p className="text-sm font-semibold text-gray-800 mt-0.5">{value}</p>
      </div>
    </div>
  );
};

const VisitorScan = () => {
  const [searchParams] = useSearchParams();
  const registrationId = searchParams.get("id");
  const [visitor, setVisitor] = useState<Visitor | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!registrationId) return;
    // Try corporate first, then general
    fetch(`${API_URL}/corporate-visitors/scan/${encodeURIComponent(registrationId)}`)
      .then((r) => r.json())
      .then((d) => {
        if (d.success) { setVisitor(d.data); setLoading(false); }
        else {
          // Try general visitor
          return fetch(`${API_URL}/general-visitors/scan/${encodeURIComponent(registrationId)}`)
            .then((r) => r.json())
            .then((d2) => {
              if (d2.success) setVisitor(d2.data);
              else setError("Visitor not found for this QR code.");
            });
        }
      })
      .catch(() => setError("Failed to fetch visitor data. Please try again."))
      .finally(() => setLoading(false));
  }, [registrationId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f0fdf4] flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-10 h-10 text-[#23471d] animate-spin mx-auto mb-3" />
          <p className="text-sm text-gray-500 font-medium">Fetching visitor details...</p>
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

  if (!visitor) return null;

  const fullName = `${visitor.firstName} ${visitor.lastName}`.trim();
  const registeredOn = visitor.createdAt
    ? new Date(visitor.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })
    : undefined;

  return (
    <div className="min-h-screen bg-[#f0fdf4] py-8 px-4">
      <div className="max-w-2xl mx-auto">

        {/* Header */}
        <div className="bg-[#23471d] rounded-2xl p-6 text-white text-center mb-4 shadow-lg">
          <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-70 mb-1">9th IHWE 2026 — Entry Pass</p>
          <h1 className="text-2xl font-black uppercase tracking-wide">{fullName}</h1>
          {visitor.designation && (
            <p className="text-sm opacity-80 mt-1">{visitor.designation}</p>
          )}
          {visitor.companyName && (
            <p className="text-xs opacity-60 mt-0.5 font-medium">{visitor.companyName}</p>
          )}
        </div>

        {/* Status Badge */}
        <div className="flex items-center justify-between bg-white rounded-xl px-5 py-3 shadow-sm mb-4">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-green-500" />
            <span className="text-sm font-bold text-gray-700">Registration Confirmed</span>
          </div>
          <span className="text-[10px] font-black bg-green-100 text-green-700 px-3 py-1 rounded-full uppercase tracking-wider">
            {visitor.status || "Active"}
          </span>
        </div>

        {/* Registration ID */}
        <div className="bg-[#23471d]/5 border border-[#23471d]/20 rounded-xl px-5 py-3 mb-4 text-center">
          <p className="text-[10px] font-black text-[#23471d] uppercase tracking-widest mb-1">Registration ID</p>
          <p className="text-base font-black text-[#23471d] font-mono">{visitor.registrationId}</p>
        </div>

        {/* Details Card */}
        <div className="bg-white rounded-2xl shadow-sm p-5 mb-4">
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">Contact & Company</p>
          <Field icon={Mail} label="Email" value={visitor.email} />
          <Field icon={Phone} label="Mobile" value={visitor.mobile} />
          <Field icon={Building2} label="Company" value={visitor.companyName} />
          <Field icon={Tag} label="Industry" value={visitor.industrySector} />
          <Field icon={User} label="Company Size" value={visitor.companySize} />
          <Field icon={Globe} label="Website" value={visitor.companyWebsite} />
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-5 mb-4">
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">Location</p>
          <Field icon={MapPin} label="City" value={visitor.city} />
          <Field icon={MapPin} label="State" value={visitor.state} />
          <Field icon={Globe} label="Country" value={visitor.country} />
        </div>

        {(visitor.purposeOfVisit?.length || visitor.areaOfInterest?.length) && (
          <div className="bg-white rounded-2xl shadow-sm p-5 mb-4">
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">Interests</p>
            {visitor.purposeOfVisit?.length ? (
              <div className="mb-3">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Purpose of Visit</p>
                <div className="flex flex-wrap gap-1.5">
                  {visitor.purposeOfVisit.map((p) => (
                    <span key={p} className="text-[11px] bg-green-50 text-[#23471d] border border-green-200 px-2.5 py-1 rounded-full font-semibold">{p}</span>
                  ))}
                </div>
              </div>
            ) : null}
            {visitor.areaOfInterest?.length ? (
              <div>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Area of Interest</p>
                <div className="flex flex-wrap gap-1.5">
                  {visitor.areaOfInterest.map((a) => (
                    <span key={a} className="text-[11px] bg-blue-50 text-blue-700 border border-blue-200 px-2.5 py-1 rounded-full font-semibold">{a}</span>
                  ))}
                </div>
              </div>
            ) : null}
          </div>
        )}

        <Field icon={Calendar} label="Registered On" value={registeredOn} />

        <p className="text-center text-[10px] text-gray-400 mt-6 font-medium">
          9th International Health & Wellness Expo 2026<br />
          Hall 12 · Pragati Maidan, New Delhi · 21–23 Aug 2026
        </p>
      </div>
    </div>
  );
};

export default VisitorScan;
