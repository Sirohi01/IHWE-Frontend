"use client";

import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { mediaRegistrationApi, SERVER_URL } from "@/lib/api";

export default function FeaturedMediaCoverage() {
    const [coverages, setCoverages] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await mediaRegistrationApi.getPageData();

                if (data?.coverages) {
                    const formattedData = data.coverages.map((item) => ({
                        ...item,
                        logo: item.logo?.startsWith("http")
                            ? item.logo
                            : `${SERVER_URL}${item.logo}`,

                        image: item.image?.startsWith("http")
                            ? item.image
                            : item.image
                            ? `${SERVER_URL}${item.image}`
                            : "",

                        date: item.date
                            ? new Date(item.date).toLocaleDateString(
                                  "en-US",
                                  {
                                      month: "long",
                                      day: "numeric",
                                      year: "numeric",
                                  }
                              )
                            : "",
                    }));

                    setCoverages(formattedData);
                }
            } catch (error) {
                console.log("Error fetching coverages:", error);
            }
        };

        fetchData();
    }, []);

    return (
        <section className="w-full py-4 px-4">
            <div className="max-w-[1400px] mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7 }}
                    viewport={{ once: true }}
                    className="bg-[#001a4d] rounded-[18px] p-4 md:p-8 shadow-2xl overflow-hidden"
                >
                    {/* HEADER */}
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-white text-sm md:text-base font-semibold uppercase tracking-wide">
                            Featured Media Coverage
                        </h2>

                        <motion.a
                            href="#"
                            whileHover={{ x: 4 }}
                            className="text-white/80 hover:text-white text-xs md:text-sm font-medium flex items-center gap-1 transition-all"
                        >
                            View All <ArrowRight size={14} />
                        </motion.a>
                    </div>

                    {/* SWIPER */}
                    <Swiper
                        modules={[Autoplay, Pagination]}
                        spaceBetween={20}
                        slidesPerView={1.2}
                        loop={coverages.length > 1}
                        autoplay={{
                            delay: 3000,
                            disableOnInteraction: false,
                        }}
                        pagination={{
                            clickable: true,
                            dynamicBullets: true,
                        }}
                        breakpoints={{
                            640: { slidesPerView: 2.2 },
                            768: { slidesPerView: 3.2 },
                            1024: { slidesPerView: 5 },
                        }}
                        className="media-swiper !pb-12"
                    >
                        {coverages.map((item, index) => (
                            <SwiperSlide
                                key={index}
                                className="!h-auto flex"
                            >
                                <motion.div
                                    whileHover={{ y: -6 }}
                                    className="bg-white rounded-xl overflow-hidden border border-gray-200 shadow-md h-full flex flex-col w-full"
                                >
                                    {/* LOGO */}
                                    <div className="h-[56px] flex items-center justify-center border-b border-gray-100 bg-white px-3">
                                        <img
                                            src={item.logo}
                                            alt="Media Logo"
                                            className="max-h-6 object-contain grayscale hover:grayscale-0 transition-all"
                                        />
                                    </div>

                                    {/* IMAGE */}
                                    <div className="relative h-[150px] overflow-hidden">
                                        <img
                                            src={item.image}
                                            alt={item.title}
                                            className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                                        />
                                    </div>

                                    {/* CONTENT */}
                                    <div className="p-4 flex-grow flex flex-col justify-between">
                                        <div>
                                            <p className="text-[11px] text-gray-500 mb-2">
                                                {item.date}
                                            </p>

                                            <h3 className="text-[14px] font-semibold text-[#111827] leading-[1.45] line-clamp-3">
                                                {item.title}
                                            </h3>
                                        </div>

                                        <motion.a
                                            href={item.link || "#"}
                                            target={
                                                item.link
                                                    ? "_blank"
                                                    : "_self"
                                            }
                                            whileHover={{ x: 4 }}
                                            className="inline-flex items-center gap-1 text-[#1d4ed8] text-sm font-medium mt-4"
                                        >
                                            Read Full Article{" "}
                                            <ArrowRight size={14} />
                                        </motion.a>
                                    </div>
                                </motion.div>
                            </SwiperSlide>
                        ))}
                    </Swiper>

                    <style>{`
                        .media-swiper .swiper-wrapper {
                            align-items: stretch;
                        }

                        .media-swiper .swiper-slide {
                            height: auto;
                        }

                        .swiper-pagination-bullet {
                            background: white !important;
                            opacity: 0.4;
                        }

                        .swiper-pagination-bullet-active {
                            background: #4ade80 !important;
                            opacity: 1;
                        }
                    `}</style>
                </motion.div>
            </div>
        </section>
    );
}