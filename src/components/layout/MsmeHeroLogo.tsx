import { useState, useEffect } from "react";
import { settingsApi, SERVER_URL } from "@/lib/api";
import { motion } from "framer-motion";

const MsmeHeroLogo = () => {
    const [settings, setSettings] = useState<any>(null);

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

    if (!settings?.isMsmeLogoActive || !settings?.msmeLogo) return null;

    return (
        <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="absolute top-8 right-6 md:right-14 z-30"
        >
            <div className="bg-white/90 backdrop-blur-sm rounded-xl py-2 px-4 shadow-xl border border-white/20 flex items-center h-16 md:h-20">
                <img
                    src={`${SERVER_URL}${settings.msmeLogo}`}
                    alt="MSME"
                    className="h-10 md:h-14 w-auto object-contain"
                />
            </div>
        </motion.div>
    );
};

export default MsmeHeroLogo;
