"use client";

import { motion } from "framer-motion";

const partners = [
    {
        category: "TV PARTNERS",
        logos: [
            "https://upload.wikimedia.org/wikipedia/commons/0/0b/Zee_Business_logo.png",
            "https://upload.wikimedia.org/wikipedia/commons/7/7b/News18_India.png",
        ],
    },
    {
        category: "DIGITAL PARTNERS",
        logos: [
            "https://upload.wikimedia.org/wikipedia/commons/2/2e/ET_Healthworld.png",
            "https://upload.wikimedia.org/wikipedia/commons/0/0e/ThePrintLogo.png",
        ],
    },
    {
        category: "HEALTHCARE MEDIA",
        logos: [
            "https://upload.wikimedia.org/wikipedia/commons/4/44/Medical_Dialogues_logo.png",
            "https://upload.wikimedia.org/wikipedia/commons/2/2f/Healthcare_Radius_logo.png",
        ],
    },
    {
        category: "MAGAZINE PARTNERS",
        logos: [
            "https://upload.wikimedia.org/wikipedia/commons/f/fc/Outlook_Logo.png",
            "https://bwhealthcareworld.com/assets/images/logo.png",
        ],
    },
    {
        category: "RADIO PARTNERS",
        logos: [
            "https://upload.wikimedia.org/wikipedia/commons/2/24/Big_FM_92.7_logo.png",
            "https://upload.wikimedia.org/wikipedia/commons/5/57/Radio_City_Logo.png",
        ],
    },
    {
        category: "COMMUNITY PARTNERS",
        logos: [
            "https://upload.wikimedia.org/wikipedia/en/0/06/FICCI_logo.png",
            "https://upload.wikimedia.org/wikipedia/en/5/5b/ASSOCHAM_Logo.png",
        ],
    },
];

export default function MediaPartners() {
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
                    {partners.map((item, index) => (
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
                            {index !== partners.length - 1 && (
                                <div className="hidden lg:block absolute top-2 right-[-8px] h-[90px] w-px bg-gray-200" />
                            )}

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