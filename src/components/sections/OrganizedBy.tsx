import React, { useState, useEffect } from 'react';
import { organizedByApi, SERVER_URL } from '@/lib/api';


interface OrganizedByData {
    subheading: string;
    heading: string;
    highlightText: string;
    badgeText: string;
    orgName: string;
    quote: string;
    logo: string;
    logoAlt: string;
}

const OrganizedBy: React.FC = () => {
    const [data, setData] = useState<OrganizedByData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await organizedByApi.get();
                if (result) {
                    setData(result);
                }
            } catch (error) {
                console.error("Error fetching Organized By data:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const renderHeading = (text: string, highlight: string) => {
        if (!highlight || !text.includes(highlight)) return text;
        const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
        return (
            <>
                {parts.map((part, index) => 
                    part.toLowerCase() === highlight.toLowerCase() ? (
                        <span key={index} className="text-[#d26019]">{part}</span>
                    ) : (part)
                )}
            </>
        );
    };

    if (loading || !data) return null;

    const logoUrl = data.logo ? (data.logo.startsWith('http') ? data.logo : `${SERVER_URL}${data.logo}`) : "";

    return (
        <section className="py-12 bg-white relative overflow-hidden">
            {/* Subtle Background Pattern */}
            <div className="absolute top-0 left-0 w-full h-full opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#23471d 0.5px, transparent 0.5px)', backgroundSize: '20px 20px' }} />

            <div className="container mx-auto px-4 max-w-5xl relative z-10">
                <div className="text-center mb-10">
                    <div className="flex items-center justify-center gap-3 mb-3">
                        <div className="h-px w-8 bg-[#23471d]" />
                        <span className="uppercase tracking-[0.3em] text-[#23471d] font-bold text-[11px]">{data.subheading}</span>
                        <div className="h-px w-8 bg-[#23471d]" />
                    </div>
                    <h2 className="text-3xl md:text-4xl font-inter text-slate-900 leading-tight">
                        {renderHeading(data.heading, data.highlightText)}
                    </h2>
                </div>

                <div className="group relative" data-aos="fade-up">
                    {/* Card Background Bloom */}
                    <div className="absolute -inset-4 bg-gradient-to-r from-[#23471d]/5 to-[#d26019]/5 rounded-[3rem] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                    <div className="relative flex flex-col md:flex-row items-center gap-10 lg:gap-16 p-8 md:p-12 rounded-[2.5rem] bg-white border border-slate-100 shadow-[0_20px_50px_rgba(0,0,0,0.05)] hover:shadow-[0_30px_70px_rgba(0,0,0,0.08)] transition-all duration-500 overflow-hidden">
                        {/* Corner Accent */}
                        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[#23471d]/5 to-transparent flex items-start justify-end p-4">
                            <div className="w-1.5 h-1.5 rounded-full bg-[#23471d]/20" />
                        </div>

                        {/* Logo Side */}
                        <div className="w-full md:w-1/3 flex justify-center relative">
                            <div className="relative p-6 bg-slate-50 rounded-3xl group-hover:bg-white transition-colors duration-500">
                                <img src={logoUrl} alt={data.logoAlt} className="max-w-[240px] md:max-w-[300px] filter drop-shadow-xl transition-transform duration-500 group-hover:scale-105" />
                            </div>
                        </div>

                        {/* Content Side */}
                        <div className="w-full md:w-2/3 text-center md:text-left flex flex-col justify-center">
                            <div className="mb-4 inline-block md:inline-flex">
                                <span className="px-4 py-1 rounded-full bg-[#23471d]/5 text-[#23471d] text-[10px] font-bold uppercase tracking-widest border border-[#23471d]/10">{data.badgeText}</span>
                            </div>
                            <h3 className="text-2xl md:text-3xl font-bold text-slate-900 mb-5 tracking-tight group-hover:text-[#23471d] transition-colors">{data.orgName}</h3>
                            <div className="relative">
                                <span className="absolute -left-4 -top-2 text-4xl text-[#23471d]/10 font-inter">"</span>
                                <p className="text-slate-600 text-[15px] md:text-lg leading-relaxed relative z-10">
                                    {data.quote}
                                </p>
                                <span className="absolute -right-2 -bottom-4 text-4xl text-[#23471d]/10 font-inter">"</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default OrganizedBy;
