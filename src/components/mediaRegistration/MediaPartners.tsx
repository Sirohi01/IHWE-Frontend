"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { mediaRegistrationApi, SERVER_URL } from "@/lib/api";
import ani from "@/assets/media/ani.webp";
import assocham from "@/assets/media/assocham.webp";
import big from "@/assets/media/big.webp";
import business_standard from "@/assets/media/business_standard.webp";
import bw_wellbeing from "@/assets/media/bw_wellbeing.webp";
import ficci from "@/assets/media/ficci.webp";
import healthworld from "@/assets/media/health_world.webp";
import ht from "@/assets/media/ht.webp";
import india_today from "@/assets/media/india_today.webp";
import medical_dialogues from "@/assets/media/medical_dialagues.webp";  
import outlook from "@/assets/media/outlook.webp";
import the_print from "@/assets/media/the_print.webp";
import zee_business from "@/assets/media/zee_business.webp";



export default function MediaPartners() {
    const [dynamicPartners, setDynamicPartners] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const data = await mediaRegistrationApi.getPageData();
            if (data && data.partners) {
                setDynamicPartners(data.partners);
            }
        };
        fetchData();
    }, []);

    const groupedPartners =  Object.values(dynamicPartners.reduce((acc: any, partner: any) => {
        const category = partner.category || 'MEDIA PARTNER';
        if (!acc[category]) {
            acc[category] = { category, logos: [] };
        }
        acc[category].logos.push(partner.logo.startsWith('http') ? partner.logo : `${SERVER_URL}${partner.logo}`);
        return acc;
    }, {})) ;

    return (

        <section className="w-full bg-[#f5f7fb] px-4 py-4">
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                viewport={{ once: true }}
                className="max-w-[1400px] mx-auto bg-white border border-gray-200 rounded-2xl shadow-sm px-5 md:px-8 py-7"
            >
                {/* HEADING */}
                <div className="flex items-center justify-center gap-4 mb-8">
                    <div className="h-px bg-gray-300 flex-1 max-w-[220px]" />

                    <motion.h2
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        viewport={{ once: true }}
                        className="text-[#0f172a] text-lg md:text-xl font-bold uppercase tracking-wide whitespace-nowrap"
                    >
                        Our Media Partners
                    </motion.h2>

                    <div className="h-px bg-gray-300 flex-1 max-w-[220px]" />
                </div>

                {/* PARTNERS GRID */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-y-8 gap-x-4">
                    {groupedPartners.map((item: any, index: number) => (

                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 25 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{
                                delay: index * 0.08,
                                duration: 0.5,
                            }}
                            viewport={{ once: true }}
                            className="relative text-center"
                        >
                            {/* DIVIDER */}
                            

                            {/* CATEGORY */}
                            <h3 className="text-[11px] md:text-xs font-bold text-[#0f172a] uppercase tracking-wide mb-5">
                                {item.category}
                            </h3>

                            {/* LOGOS */}
                            <div className="flex flex-col items-center justify-center gap-5">
                                {item.logos.map((logo, i) => (
                                    <motion.div
                                        key={i}
                                        whileHover={{
                                            scale: 1.06,
                                            y: -2,
                                        }}
                                        transition={{
                                            type: "spring",
                                            stiffness: 250,
                                        }}
                                        className="flex items-center justify-center"
                                    >
                                        <img
                                            src={logo}
                                            alt="partner-logo"
                                            className="h-8 md:h-9 object-contain max-w-[120px]"
                                        />
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* BUTTON */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{
                        delay: 0.7,
                        duration: 0.5,
                    }}
                    viewport={{ once: true }}
                    className="flex justify-center mt-10"
                >
                    <motion.a
                        href="#"
                        whileHover={{
                            scale: 1.03,
                            backgroundColor: "#eff6ff",
                        }}
                        whileTap={{ scale: 0.97 }}
                        className="h-[42px] px-8 border border-2 border-[#63a0e4] rounded-lg flex items-center justify-center text-[#2563eb] text-sm font-semibold transition-all"
                    >
                        VIEW ALL MEDIA PARTNERS
                    </motion.a>
                </motion.div>
            </motion.div>
        </section>
    );
}