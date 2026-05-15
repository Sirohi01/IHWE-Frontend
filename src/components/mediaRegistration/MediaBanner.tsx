import React from 'react'
import { motion, AnimatePresence } from "framer-motion";
import media_registration_bg from "@/assets/media_registration.webp";
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
import {
    Globe,
    Newspaper,
    Users,
    Handshake
} from "lucide-react";
import SectionContainer from '../layout/SectionContainer';

const mediaLogos = [
    ani,
    business_standard,
    india_today,
    zee_business,
    healthworld,
    the_print,
    outlook,
    ht,
    medical_dialogues,
];
const MediaBanner = () => {
  return (
    <section className="relative w-full overflow-hidden pb-15">
                {/* FULL WIDTH BANNER */}
                <div className={`w-full bg-cover bg-center bg-[url('../../assets/media_registration.webp')]`}
                style={{ backgroundImage: `url(${media_registration_bg})` }}>
                    <SectionContainer>

                        {/* Glow Effects */}
                        <motion.div
                            animate={{
                                scale: [1, 1.2, 1],
                                opacity: [0.2, 0.35, 0.2],
                            }}
                            transition={{
                                duration: 6,
                                repeat: Infinity,
                                ease: "easeInOut",
                            }}
                            className="absolute top-10 right-20 w-72 h-72 bg-cyan-400/10 rounded-full blur-3xl"
                        />

                        <motion.div
                            animate={{
                                y: [0, -30, 0],
                                opacity: [0.15, 0.3, 0.15],
                            }}
                            transition={{
                                duration: 8,
                                repeat: Infinity,
                                ease: "easeInOut",
                            }}
                            className="absolute bottom-0 left-1/2 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl"
                        />

                        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

                            {/* LEFT CONTENT */}
                            <motion.div
                                initial={{ opacity: 0, x: -60 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{
                                    duration: 0.8,
                                    delay: 0.2,
                                }}
                                viewport={{ once: true }}
                                className="text-white"
                            >
                                <motion.h2
                                    initial={{ opacity: 0, y: 40 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{
                                        delay: 0.5,
                                        duration: 0.7,
                                    }}
                                    viewport={{ once: true }}
                                    className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight"
                                >
                                    MEDIA & PR
                                    <br />
                                    <span className="text-green-400">COVERAGE</span>
                                </motion.h2>

                                <motion.div
                                    initial={{ width: 0, opacity: 0 }}
                                    whileInView={{ width: "30%", opacity: 1 }}
                                    transition={{
                                        delay: 0.9,
                                        duration: 0.8,
                                    }}
                                    viewport={{ once: true }}
                                    className="h-[2px] bg-white/30 my-6 relative"
                                >
                                    <div className="w-[50%] h-[2px] bg-white"></div>
                                </motion.div>

                                <motion.p
                                    initial={{ opacity: 0, y: 25 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{
                                        delay: 1.2,
                                        duration: 0.7,
                                    }}
                                    viewport={{ once: true }}
                                    className="text-white/80 text-base sm:text-lg max-w-xl leading-relaxed"
                                >
                                    Showcasing the global recognition
                                    <br /> and media visibility of{" "}
                                    <span className="text-green-400 font-semibold">
                                        IHWE 2026
                                    </span>
                                </motion.p>

                                {/* STATS */}
                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-10">
                                    {[
                                        { number: "100+", label: "Media Mentions", icon: <Newspaper /> },
                                        { number: "1M+", label: "Audience Reach", icon: <Users /> },
                                        { number: "20+", label: "Media Partners", icon: <Handshake /> },
                                        { number: "12+", label: "Countries Coverage", icon: <Globe /> },
                                    ].map((item, index) => (
                                        <motion.div
                                            key={index}
                                            initial={{ opacity: 0, y: 40 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            transition={{
                                                delay: 1.5 + index * 0.25,
                                                duration: 0.5,
                                            }}
                                            viewport={{ once: true }}
                                            whileHover={{
                                                y: -6,
                                                scale: 1.03,
                                            }}
                                            className="flex gap-3 align-items-start"
                                        >
                                            <motion.div
                                                whileHover={{
                                                    rotate: 8,
                                                    scale: 1.08,
                                                }}
                                                transition={{
                                                    type: "spring",
                                                    stiffness: 300,
                                                }}
                                                className="border border-white/15 bg-white/5 backdrop-blur-md rounded-full p-2 h-10"
                                            >
                                                {item.icon}
                                            </motion.div>

                                            <div>
                                                <h3 className="text-xl font-bold">
                                                    {item.number}
                                                </h3>

                                                <p className="text-sm text-white/70 mt-1">
                                                    {item.label}
                                                </p>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>

                                {/* BUTTONS */}
                                <motion.div
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{
                                        delay: 2.7,
                                        duration: 0.7,
                                    }}
                                    viewport={{ once: true }}
                                    className="flex flex-wrap gap-4 mt-10"
                                >
                                    <motion.button
                                        whileHover={{
                                            scale: 1.05,
                                            boxShadow: "0 10px 25px rgba(34,197,94,0.35)",
                                        }}
                                        whileTap={{ scale: 0.95 }}
                                        className="bg-green-500 hover:bg-green-600 transition-all duration-300 px-6 py-3 rounded-xl font-semibold text-white"
                                    >
                                        Explore Coverage →
                                    </motion.button>

                                    <motion.button
                                        whileHover={{
                                            scale: 1.05,
                                            backgroundColor: "rgba(255,255,255,0.08)",
                                        }}
                                        whileTap={{ scale: 0.95 }}
                                        className="border border-white/30 hover:bg-white/10 transition-all duration-300 px-6 py-3 rounded-xl font-semibold text-white"
                                    >
                                        Download Media Kit
                                    </motion.button>

                                    <motion.button
                                        whileHover={{ x: 5 }}
                                        className="text-white hover:text-green-400 transition-all duration-300 font-semibold"
                                    >
                                        Become Media Partner →
                                    </motion.button>
                                </motion.div>
                            </motion.div>

                            {/* RIGHT SIDE */}
                        </div>
                    </SectionContainer>
                </div>

                {/* FLOATING WHITE CARD */}
                <SectionContainer>
                <motion.div
                    initial={{ opacity: 0, y: 80 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{
                        duration: 0.4,
                        delay: 0.8,
                    }}
                    viewport={{ once: true }}
                    className="relative px-4"
                >
                    <div className="bg-white rounded-3xl shadow-2xl px-6 sm:px-10 py-8 -mt-16 relative z-20">
                        <div className="flex items-center justify-center gap-4 mb-8">
                            <div className="h-px bg-gray-300 flex-1 max-w-[120px]"></div>

                            <motion.h3
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                transition={{
                                    delay: 1.2,
                                    duration: 0.5,
                                }}
                                viewport={{ once: true }}
                                className="text-[#1e243a] font-bold text-sm sm:text-base tracking-wide text-center"
                            >
                                FEATURED IN LEADING MEDIA
                            </motion.h3>

                            <div className="h-px bg-gray-300 flex-1 max-w-[120px]"></div>
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-9 justify-between items-center md:flex-row gap-5">
                            {mediaLogos.map((logo, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, scale: 0.8, y: 20 }}
                                    whileInView={{ opacity: 1, scale: 1, y: 0 }}
                                    transition={{
                                        delay: 1.2 + index * 0.12,
                                        duration: 0.5,
                                    }}
                                    viewport={{ once: true }}
                                    whileHover={{
                                        y: -6,
                                        scale: 1.04,
                                    }}
                                    className="h-16 rounded-xl border border-gray-100 flex items-center justify-center hover:shadow-md transition-all duration-300"
                                >
                                    <img src={logo} alt={`Media Logo ${index + 1}`} className="max-h-10 object-contain" />                                                                                                                                                  
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </motion.div>
                </SectionContainer>
            </section>
  )
}

export default MediaBanner