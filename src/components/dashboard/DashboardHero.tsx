import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { API_URL, SERVER_URL } from '@/lib/api';

interface DashboardHeroProps {
    pageId: string;
    defaultTitle: string;
    defaultSubtitle?: string;
    type: 'exhibitor' | 'seller';
}

export default function DashboardHero({ pageId, defaultTitle, defaultSubtitle, type }: DashboardHeroProps) {
    const [banner, setBanner] = useState<any>(null);

    useEffect(() => {
        const fetchBanner = async () => {
            try {
                const res = await fetch(`${API_URL}/dashboard-banners/page/${pageId}`);
                const d = await res.json();
                if (d.success && d.data) setBanner(d.data);
            } catch (err) {
                console.error("Hero Banner Load Error:", err);
            }
        };
        fetchBanner();
    }, [pageId]);

    const title = banner?.title || defaultTitle;
    const subtitle = banner?.subtitle || defaultSubtitle;
    const imageUrl = banner?.imageUrl ? `${SERVER_URL}${banner.imageUrl}` : (type === 'seller' ? '/seller-default-bg.jpg' : '/exhibitor-default-bg.jpg');

    return (
        <div className="relative w-full h-[180px] rounded-xl overflow-hidden mb-8 shadow-lg group">
            {/* Background Image with Parallax effect */}
            <motion.div 
                initial={{ scale: 1.1 }}
                animate={{ scale: 1 }}
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700"
                style={{ backgroundImage: `url(${imageUrl})` }}
            />
            
            {/* Gradient Overlays */}
            <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-slate-900/60 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent" />
            
            {/* Content */}
            <div className="relative h-full flex flex-col justify-center px-8 md:px-12">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    <span className="inline-block px-3 py-1 bg-[#d26019] text-white text-[8px] font-black uppercase tracking-[0.3em] rounded-sm mb-3 shadow-lg">
                        {type} portal • 2026
                    </span>
                    <h1 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tighter leading-none mb-2 drop-shadow-2xl">
                        {title}
                    </h1>
                    {subtitle && (
                        <p className="text-white/70 text-xs font-bold uppercase tracking-widest max-w-xl">
                            {subtitle}
                        </p>
                    )}
                </motion.div>
            </div>

            {/* Decorative Element */}
            <div className="absolute bottom-0 right-0 p-8 opacity-10 pointer-events-none group-hover:opacity-20 transition-opacity">
                <img src="/logo-icon-white.png" alt="" className="w-32 h-32 rotate-12" />
            </div>
        </div>
    );
}
