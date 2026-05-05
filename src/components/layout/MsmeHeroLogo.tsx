import { useState, useEffect } from "react";
import { settingsApi, SERVER_URL } from "@/lib/api";
import { motion, AnimatePresence } from "framer-motion";

interface MsmeLogo {
    _id: string;
    imageUrl: string;
    title: string;
    category: string;
    isActive: boolean;
    displayOrder: number;
}

const MsmeHeroLogo = () => {
    const [settings, setSettings] = useState<any>(null);
    const [currentLogoIndex, setCurrentLogoIndex] = useState(0);

    useEffect(() => {
        const fetchSettings = async () => {
            try {
                const data = await settingsApi.get();
                if (data) setSettings(data);
            } catch (error) {
                console.error("Error fetching settings for MSME logo:", error);
            }
        };
        fetchSettings();
    }, []);

    // Get active logos sorted by display order
    const activeLogos = settings?.msmeLogos?.filter((logo: MsmeLogo) => logo.isActive)
        .sort((a: MsmeLogo, b: MsmeLogo) => a.displayOrder - b.displayOrder) || [];
    // Auto-rotate logos if multiple
    useEffect(() => {
        if (activeLogos.length > 1) {
            const interval = setInterval(() => {
                setCurrentLogoIndex((prev) => (prev + 1) % activeLogos.length);
            }, 3000); // Change every 3 seconds

            return () => clearInterval(interval);
        }
    }, [activeLogos.length]);

    // Don't show if section is inactive or no active logos
    if (!settings?.isMsmeLogoActive || activeLogos.length === 0) return null;

    const currentLogo = activeLogos[currentLogoIndex];

    return (
        <div className="relative ml-4 flex items-center h-full pt-11">
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <div className="relative flex flex-col items-center">
                    {/* Powerful Glow Base - Positioned behind logo only */}
                    <div className="absolute top-[60%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-white blur-[20px] rounded-full scale-[1.3] opacity-100 z-0" />
                    <div className="absolute top-[60%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-white blur-[10px] rounded-full scale-[1.1] opacity-100 z-0" />

                    {/* Category Label */}
                    {currentLogo.category && (
                        <span className="relative z-20 text-[9px] xl:text-[8px] font-bold text-slate-700 uppercase tracking-[0.15em] mb-1.5 whitespace-nowrap drop-shadow-[0_0_1px_rgba(255,255,255,1)]">
                            {currentLogo.category}
                        </span>
                    )}

                    {/* Logo with Animation */}
                    <AnimatePresence mode="wait">
                        <motion.img
                            key={currentLogo._id}
                            src={`${SERVER_URL}${currentLogo.imageUrl}`}
                            alt={currentLogo.title}
                            className="relative z-10 h-12 xl:h-16 w-auto object-contain 
                                       drop-shadow-[0_0_15px_rgba(255,255,255,1)] 
                                       drop-shadow-[0_0_25px_rgba(255,255,255,1)]
                                       transition-all duration-500 
                                       group-hover:scale-105
                                       grayscale opacity-100 group-hover:grayscale-0"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            transition={{ duration: 0.5 }}
                        />
                    </AnimatePresence>
                </div>
            </motion.div>
        </div>
    );
};

export default MsmeHeroLogo;
