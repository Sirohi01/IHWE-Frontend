import React, { useState, useEffect } from "react";
import { analyticsApi, API_URL } from "@/lib/api";
import BuyerCallFloat from "./BuyerCallFloat";

const BuyerWhatsAppFloat: React.FC<{ data: any }> = ({ data }) => {
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

    const rawPhone = rmPhone || data?.admin?.phone || "";
    const cleanPhone = rawPhone.replace(/\D/g, '');

    const personName = data?.fullName || data?.nameOfRepresentative || 'Buyer';
    const companyName = data?.companyName || '—';
    const regId = data?.registrationId || '—';

    const msg = `Hi, I am ${personName} from ${companyName}. My Buyer ID is ${regId}. I have a query regarding IHWE 2026: `;
    const whatsappUrl = `https://wa.me/${cleanPhone.startsWith('91') ? cleanPhone : '91' + cleanPhone}?text=${encodeURIComponent(msg)}`;
    const hasWhatsappNumber = cleanPhone.length >= 10;

    return (
        <div className="fixed left-6 bottom-8 z-[60] flex flex-col items-center gap-4 print:hidden">
            {/* Call Button */}
            <BuyerCallFloat data={data} />

            {/* WhatsApp Button */}
            {hasWhatsappNumber && (
                <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Chat on WhatsApp"
                    className="relative block"
                    onClick={() => analyticsApi.logClick("Buyer WhatsApp Icon")}
                >
                {/* Main Button */}
                <div className="relative w-12 h-12 bg-[#25D366] rounded-full flex items-center justify-center shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-110">
                    <svg className="w-[28px] h-[28px] relative z-10" fill="white" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                    <div className="absolute inset-0 rounded-full bg-[#25D366] opacity-75 animate-ping" />
                    <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-transparent via-white/20 to-transparent animate-pulse" />
                </div>
                </a>
            )}
        </div>
    );
};

export default BuyerWhatsAppFloat;
