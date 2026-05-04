import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Download } from 'lucide-react';
import { Link } from 'react-router-dom';
import { settingsApi, SERVER_URL } from '../../lib/api';
import leaveImg from '../../assets/leave.png';
import cta1 from '../../assets/cta1.png';
import cta2 from '../../assets/cta2.png';
import cta3 from '../../assets/cta3.png';
import cta4 from '../../assets/cta4.png';
import cta5 from '../../assets/cta5.png';

const BOTTOM_STATS = [
    { label: 'Years of Legacy', value: '10+', icon: cta1 },
    { label: 'Strong Visitor Mix', value: 'B2B + B2C', icon: cta2 },
    { label: 'Business Opportunities', value: 'High Quality', icon: cta3 },
    { label: 'Brand Visibility', value: 'Unmatched', icon: cta4 },
    { label: 'Exhibitor Support', value: 'End-to-End', icon: cta5 },
];

const ExhibitorCTA = () => {
    const [settings, setSettings] = React.useState<any>(null);

    React.useEffect(() => {
        settingsApi.get().then(res => {
            if (res) setSettings(res);
        });
    }, []);

    const domesticBrochureUrl = React.useMemo(() => {
        if (!settings?.domesticRegistrationFormPdf) return '#';
        const path = settings.domesticRegistrationFormPdf;
        return path.startsWith('http') ? path : `${SERVER_URL}${path}`;
    }, [settings]);

    return (
        <section className="bg-white">
            {/* CTA Main Card - Matching the thin, wide style of the screenshot */}
            <div className="w-full bg-[#f8f9f8] border-y border-gray-100 relative overflow-hidden py-8">
                {/* Left Leaf branch */}
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-48 h-full opacity-60 pointer-events-none">
                    <img
                        src={leaveImg}
                        className="w-full h-full object-contain translate-x-4"
                        alt="exhibiton in delhi"
                    />
                </div>

                <div className="max-w-[1400px] mx-auto px-6 md:px-12 flex flex-col lg:flex-row items-center justify-between gap-8 relative z-10">
                    <div className="max-w-2xl text-left">
                        <p className="text-gray-800 text-md font-medium mb-[0.5px]">These brands trust IHWE.</p>
                        <h2 className="text-3xl md:text-[2.6rem] font-bold text-black mb-3 leading-tight tracking-tight">
                            Be the next success story.
                        </h2>
                        <p className="text-gray-800 text-[15px] leading-relaxed max-w-2xl">
                            Join India's most trusted platform for health, wealth, wellness and holistic living.
                        </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-4">
                        <Link
                            to="/book-a-stand"
                            className="px-5 py-2 bg-[#1a4a2a] hover:bg-[#153a21] text-white rounded-lg font-bold text-[13px] tracking-wide transition-all flex items-center gap-3"
                        >
                            BOOK YOUR STALL <ArrowRight className="w-4 h-4" />
                        </Link>
                        <a
                            href={domesticBrochureUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            download
                            className="px-5 py-2 bg-white hover:bg-gray-50 text-[#1a4a2a] border border-[#1a4a2a] rounded-lg font-bold text-[13px] tracking-wide transition-all flex items-center gap-3"
                        >
                            DOWNLOAD BROCHURE <Download className="w-4 h-4" />
                        </a>
                    </div>
                </div>

                {/* Right Leaf branch */}
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-48 h-full opacity-60 pointer-events-none hidden lg:block">
                    <img
                        src={leaveImg}
                        className="w-full h-full object-contain -translate-x-4 rotate-180 scale-x-[-1]"
                        alt="exhibiton in delhi"
                    />
                </div>
            </div>

            {/* Dark Green Bottom Bar - Exact match with dividers and icon positions */}
            <div className="bg-[#0a3622] py-2">
                <div className="max-w-[1400px] mx-auto px-6 md:px-12">
                    <div className="flex flex-wrap md:flex-nowrap justify-between items-center gap-6">
                        {BOTTOM_STATS.map((stat, idx) => (
                            <React.Fragment key={idx}>
                                <div className="flex items-center gap-4 flex-1 justify-start">
                                    <div className="text-white shrink-0 w-14 h-14 md:w-20 md:h-20 flex items-center justify-center">
                                        <img src={stat.icon} alt={stat.label} className="w-14 h-14 md:w-20 md:h-20 object-contain" />
                                    </div>
                                    <div className="flex flex-col text-left">
                                        <span className="text-white text-[15px] font-bold leading-tight">{stat.value}</span>
                                        <span className="text-white text-[11px] leading-tight font-medium uppercase tracking-tight">{stat.label}</span>
                                    </div>
                                </div>
                                {idx < BOTTOM_STATS.length - 1 && (
                                    <div className="hidden md:block w-[1px] h-10 bg-white/10" />
                                )}
                            </React.Fragment>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ExhibitorCTA;
