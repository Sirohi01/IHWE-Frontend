import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import media_registration_bg from "@/assets/media_registration.webp";
import { mediaRegistrationApi, SERVER_URL } from "@/lib/api";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import {
    Globe,
    Newspaper,
    Users,
    Handshake,
} from "lucide-react";
import SectionContainer from "../layout/SectionContainer";

const icons = [
    <Newspaper />,
    <Users />,
    <Handshake />,
    <Globe />,
];

const MediaBanner = () => {
    const [dynamicLogos, setDynamicLogos] = useState([]);
    const [bannerSettings, setBannerSettings] = useState(null);
    const [mainDownloadLink, setMainDownloadLink] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await mediaRegistrationApi.getPageData();

                // LOGOS
                if (data?.bannerLogos) {
                    const bannerLogos = data.bannerLogos.map((c) =>
                        c.logo?.startsWith("http")
                            ? c.logo
                            : `${SERVER_URL}${c.logo}`
                    );

                    setDynamicLogos(bannerLogos);
                }

                // DOWNLOAD LINK
                if (data?.resources) {
                    const main =
                        data.resources.find((r) => r.isMain) ||
                        data.resources.find(
                            (r) => r.icon === "FileArchive"
                        );

                    if (main) {
                        const link = main.link?.startsWith("http")
                            ? main.link
                            : `${SERVER_URL}${main.link}`;

                        setMainDownloadLink(link);
                    }
                }

                // SETTINGS
                if (data?.bannerSettings) {
                    setBannerSettings(data.bannerSettings);
                }
            } catch (error) {
                console.log("Error fetching banner data:", error);
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
        <section className="relative w-full overflow-hidden pb-15">
            {/* FULL WIDTH BANNER */}
            <div
                className="w-full"
                style={{
                    backgroundImage: `url(${media_registration_bg})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
            >
                <SectionContainer className="relative mx-auto  py-16 lg:py-24">

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
                                {bannerSettings?.heroTitle}
                            </motion.h2>

                            <motion.div
                                initial={{ width: 0, opacity: 0 }}
                                whileInView={{
                                    width: "30%",
                                    opacity: 1,
                                }}
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
                                {bannerSettings?.heroSubtitle}
                            </motion.p>

                            {/* STATS */}
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-10">
                                {displayStats.map((item, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{
                                            opacity: 0,
                                            y: 40,
                                        }}
                                        whileInView={{
                                            opacity: 1,
                                            y: 0,
                                        }}
                                        transition={{
                                            delay:
                                                1.5 +
                                                index * 0.25,
                                            duration: 0.5,
                                        }}
                                        viewport={{ once: true }}
                                        whileHover={{
                                            y: -6,
                                            scale: 1.03,
                                        }}
                                        className="flex gap-3 items-start"
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
                                            {icons[index]}
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
                                        boxShadow:
                                            "0 10px 25px rgba(34,197,94,0.35)",
                                    }}
                                    whileTap={{ scale: 0.95 }}
                                    className="bg-green-500 hover:bg-green-600 transition-all duration-300 px-6 py-3 rounded-xl font-semibold text-white"
                                >
                                    Explore Coverage →
                                </motion.button>

                                <motion.button
                                    whileHover={{
                                        scale: 1.05,
                                        backgroundColor:
                                            "rgba(255,255,255,0.08)",
                                    }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => {
                                        if (mainDownloadLink) {
                                            window.open(
                                                mainDownloadLink,
                                                "_blank"
                                            );
                                        }
                                    }}
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
                    className="relative"
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

                        {/* SWIPER */}
                        <Swiper
                            modules={[Autoplay]}
                            slidesPerView={2}
                            spaceBetween={20}
                            loop={true}
                            speed={4000}
                            autoplay={{
                                delay: 0,
                                disableOnInteraction: false,
                                pauseOnMouseEnter: false,
                            }}
                            breakpoints={{
                                640: {
                                    slidesPerView: 3,
                                },
                                768: {
                                    slidesPerView: 4,
                                },
                                1024: {
                                    slidesPerView: 5,
                                },
                                1280: {
                                    slidesPerView: 7,
                                },
                            }}
                            className="media-logo-swiper"
                        >
                            {dynamicLogos.map((logo, index) => (
                                <SwiperSlide key={index} className="!h-auto">
                                    <motion.div
                                        initial={{
                                            opacity: 0,
                                            scale: 0.8,
                                            y: 20,
                                        }}
                                        whileInView={{
                                            opacity: 1,
                                            scale: 1,
                                            y: 0,
                                        }}
                                        transition={{
                                            delay: 1.2 + index * 0.08,
                                            duration: 0.5,
                                        }}
                                        viewport={{ once: true }}
                                        whileHover={{
                                            y: -6,
                                            scale: 1.04,
                                        }}
                                        className="h-16 rounded-xl border border-gray-100 flex items-center justify-center hover:shadow-md transition-all duration-300 bg-white"
                                    >
                                        <img loading="lazy" decoding="async" src={logo}
                                            alt={`Media Logo ${index + 1}`}
                                            className="object-contain min-h-10 max-h-20"
                                        />
                                    </motion.div>
                                </SwiperSlide>
                            ))}
                        </Swiper>

                        <style>{`
            .media-logo-swiper .swiper-wrapper {
                transition-timing-function: linear !important;
                align-items: center;
            }
        `}</style>
                    </div>
                </motion.div>
            </SectionContainer>

        </section>
    );
};

export default MediaBanner;