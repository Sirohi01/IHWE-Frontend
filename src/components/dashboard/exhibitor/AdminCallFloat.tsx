import { Phone } from "lucide-react";
import { analyticsApi, API_URL } from "@/lib/api";
import { useEffect, useState } from "react";

const AdminCallFloat = ({ data }: { data: any }) => {
  const [rmPhone, setRmPhone] = useState<string | null>(null);

  useEffect(() => {
    const rmName = data?.spokenWith || data?.referredBy || null;
    if (!rmName) return;
    fetch(`${API_URL}/admin/by-username/${encodeURIComponent(rmName)}`)
        .then(r => r.json())
        .then(res => { 
            if (res.success && res.data) {
                setRmPhone(res.data.mobile || res.data.altMobile || null);
            } 
        })
        .catch(() => { });
  }, [data]);

  const rawPhone = rmPhone || data?.admin?.phone || data?.vendorDetails?.phone || "";
  const cleanPhone = rawPhone.replace(/\D/g, '');
  const url = `tel:${cleanPhone.startsWith('91') ? cleanPhone : '+91' + cleanPhone}`;

  if (cleanPhone.length < 10) return null;

  return (
    <>
      <style>{`
        @keyframes phonePulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }

        @keyframes ringPulse {
          0% { transform: scale(1); opacity: 0.8; }
          100% { transform: scale(1.8); opacity: 0; }
        }

        .call-float-btn {
          position: relative;
          z-index: 50;
          width: 40px;
          height: 40px;
          background: linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 16px rgba(30, 58, 138, 0.4);
          cursor: pointer;
          transition: all 0.3s ease;
          animation: phonePulse 2s ease-in-out infinite;
        }

        .call-float-btn:hover {
          transform: scale(1.1) !important;
          box-shadow: 0 8px 24px rgba(30, 58, 138, 0.6);
          background: linear-gradient(135deg, #3b82f6 0%, #60a5fa 100%);
        }

        .call-ring {
          position: absolute;
          inset: -3px;
          border-radius: 50%;
          border: 2px solid #3b82f6;
          animation: ringPulse 2s ease-out infinite;
        }

        .call-ring:nth-child(2) {
          animation-delay: 0.5s;
        }

        .call-ring:nth-child(3) {
          animation-delay: 1s;
        }

        .call-icon {
          color: white;
          animation: phonePulse 2s ease-in-out infinite;
        }
      `}</style>

      <a
        href={url}
        className="call-float-btn"
        aria-label="Call us"
        onClick={() => analyticsApi.logClick("Call Float")}
      >
        {/* Pulse Rings */}
        <div className="call-ring"></div>
        <div className="call-ring"></div>
        <div className="call-ring"></div>

        {/* Call Icon */}
        <Phone className="call-icon" size={18} strokeWidth={2.5} />
      </a>
    </>
  );
};

export default AdminCallFloat;
