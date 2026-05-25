import React from "react"
import { useNavigate, Link } from 'react-router-dom';
import { MessageSquareText, X, Mail, Phone } from 'lucide-react';
import { useState, useEffect } from 'react';
import { settingsApi } from "@/lib/api";


const ExhibitorTopbar = () => {
    const [settings, setSettings] = useState<any>(null);

    useEffect(() => {
        const fetchSettings = async () => {
            try {
                const data = await settingsApi.get();
                if (data) {
                    setSettings(data);
                }
            } catch (error) {
                console.error("Error fetching settings for topbar:", error);
            }
        };
        fetchSettings();
    }, []);

    const topbarEmails = settings?.emails?.filter((e: any) => e.forTopbar) || [{ email: "info@healthwellnessexpo.com" }];
    const topbarPhones = settings?.phones?.filter((p: any) => p.forTopbar) || [{ phone: "+1 (234) 567-890" }];

    return (
        <>
            <div className="bg-[#002511] border-b border-white/5 text-slate-300 text-[11px] relative z-[90] py-0.5">
                <div className="flex items-center justify-between px-6 py-1.5 flex-nowrap gap-x-4">
                    {/* Left Section - Contact Info (Compact on mobile) */}
                    <div className="flex items-center justify-center md:justify-start gap-3 md:gap-3 w-full md:w-auto overflow-hidden">
                        {topbarEmails.slice(0, 1).map((item: any, idx: number) => (
                            <a
                                key={`email-top-${idx}`}
                                href={`mailto:${item.email}`}
                                className="flex items-center gap-1.5 hover:text-white transition font-bold text-[9px] md:text-[11px] whitespace-nowrap"
                            >
                                <Mail className="w-3 md:w-3.5 h-3 md:h-3.5 text-[#d26019]" />
                                <span>{item.email}</span>
                            </a>
                        ))}

                        {/* Secondary Emails - Desktop Only */}
                        <div className="hidden md:flex gap-6">
                            {topbarEmails.slice(1).map((item: any, idx: number) => (
                                <a
                                    key={`email-sec-${idx}`}
                                    href={`mailto:${item.email}`}
                                    className="flex items-center gap-2 hover:text-white transition font-medium"
                                >
                                    <Mail className="w-3.5 h-3.5 text-[#d26019]" />
                                    <span>{item.email}</span>
                                </a>
                            ))}
                        </div>

                        <div className="h-2 w-px bg-slate-700 md:hidden" />

                        {topbarPhones.slice(0, 1).map((item: any, idx: number) => (
                            <a
                                key={`phone-top-${idx}`}
                                href={`tel:${item.phone}`}
                                className="flex items-center gap-1.5 hover:text-white transition font-bold text-[9px] md:text-[11px] whitespace-nowrap"
                            >
                                <Phone className="w-3 md:w-3.5 h-3 md:h-3.5 text-[#d26019]" />
                                <span>{item.phone}</span>
                            </a>
                        ))}

                        {/* Secondary Phones - Desktop Only */}
                        <div className="hidden md:flex gap-6">
                            {topbarPhones.slice(1).map((item: any, idx: number) => (
                                <a
                                    key={`phone-sec-${idx}`}
                                    href={`tel:${item.phone}`}
                                    className="flex items-center gap-2 hover:text-white transition font-medium"
                                >
                                    <Phone className="w-3.5 h-3.5 text-[#d26019]" />
                                    <span>{item.phone}</span>
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Right Section - Logins */}
                    <div className="hidden md:flex flex-shrink-0 items-center gap-3">
                        <Link
                            to="#"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-2.5 py-1.5 rounded-md bg-white/5 hover:bg-[#d26019] text-white transition-all duration-300 font-bold border border-white/30 hover:border-[#d26019] text-[9px] uppercase tracking-wider whitespace-nowrap shadow-sm hover:scale-105 inline-block"
                        >
                            Seller Registration
                        </Link>
                        <Link
                            to="/delegate-registration"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-2.5 py-1.5 rounded-md bg-white/5 hover:bg-[#d26019] text-white transition-all duration-300 font-bold border border-white/30 hover:border-[#d26019] text-[9px] uppercase tracking-wider whitespace-nowrap shadow-sm hover:scale-105 inline-block text-center"
                        >
                            Delegates Registration
                        </Link>
                        <Link
                            to="/exhibitor-dashboard/feedback"
                            className="px-2.5 py-1.5 rounded-md bg-[#d26019] hover:bg-[#b05015] text-white transition-all duration-300 font-bold border border-white/40 text-[9px] uppercase tracking-wider whitespace-nowrap shadow-md hover:scale-105 inline-block text-center"
                        >
                            Feedback Form
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ExhibitorTopbar;