import { motion } from "framer-motion";
import global_stats_bg from "@/assets/global_stats_bg.jpg";
import { useState, useEffect } from "react";
import { mediaRegistrationApi } from "@/lib/api";
import SectionContainer from "../layout/SectionContainer";

export default function GlobalMediaStats() {
    const [bannerSettings, setBannerSettings] = useState(null);
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await mediaRegistrationApi.getPageData();

                if (data?.bannerSettings) {
                    setBannerSettings(data.bannerSettings);
                }
            } catch (error) {
                console.log("Error fetching banner settings:", error);
            }
        };

        fetchData();
    }, []);

    // ONLY API DATA
    const displayStats =
        bannerSettings?.stats?.filter(
            (s) => s.number || s.label
        ) || [];

    return (
        <section className="w-full px-4 py-8 bg-[#001635]">
            <SectionContainer>
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7 }}
                    viewport={{ once: true }}
                    className="rounded-2xl overflow-hidden relative"
                >
                    {/* BACKGROUND GLOW */}
                    <motion.div
                        animate={{
                            opacity: [0.2, 0.35, 0.2],
                            scale: [1, 1.1, 1],
                        }}
                        transition={{
                            duration: 6,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                        className="absolute -left-20 top-0 w-[300px] h-[300px] bg-green-500/10 blur-3xl rounded-full"
                    />

                    <div className="relative z-10 grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] items-center gap-10">

                        {/* LEFT WORLD MAP */}
                        <motion.div
                            initial={{ opacity: 0, x: -40 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2, duration: 0.7 }}
                            viewport={{ once: true }}
                            className="relative flex justify-center lg:justify-start"
                        >
                            <div className="relative w-full max-w-[520px]">
                                <img
                                    src={global_stats_bg}
                                    alt="World Map"
                                    className="w-full opacity-90"
                                />
                            </div>
                        </motion.div>

                        {/* RIGHT CONTENT */}
                        <motion.div
                            initial={{ opacity: 0, x: 40 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3, duration: 0.7 }}
                            viewport={{ once: true }}
                        >
                            {/* STATS */}
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                                {displayStats.map((item, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{
                                            delay: 0.4 + index * 0.12,
                                            duration: 0.5,
                                        }}
                                        viewport={{ once: true }}
                                        className="relative"
                                    >
                                        {/* DIVIDER */}
                                        {index !== displayStats.length - 1 && (
                                            <div className="hidden md:block absolute right-[-12px] top-1 h-14 w-px bg-white/10" />
                                        )}

                                        <h3 className="text-white text-3xl md:text-4xl font-extrabold">
                                            {item.number}
                                        </h3>

                                        <p className="text-white/75 text-sm mt-2 leading-relaxed">
                                            {item.label}
                                        </p>
                                    </motion.div>
                                ))}
                            </div>

                            {/* DESCRIPTION */}
                            {/* {bannerSettings?.description && ( */}
                                <p
                                    className="text-white/70 text-sm md:text-[15px] leading-relaxed mt-6 max-w-[600px]"
                                >
                                    {bannerSettings?.description || "IHWE 2026 is making waves accross continents with strong coverage in leading healthcare, business, wellness and trade media."}
                                </p>
                            {/* )} */}
                        </motion.div>
                    </div>
                </motion.div>
            </SectionContainer>

        </section>
    );
}