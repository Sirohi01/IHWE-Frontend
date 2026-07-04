"use client";

import {
  FileText,
  Newspaper,
  CloudUpload,
  ArrowRight,
} from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import partner from "../../../assets/day/partners.webp"
import { Link } from "react-router-dom";
import { SERVER_URL } from "@/lib/api";
const icons = [
  FileText,
  Newspaper,
  CloudUpload,

];


export default function PartnersAndActionsSection({ currentDay, data }: { currentDay: number; data: any }) {
  const cards = data.cards;
  const associates = data.associates;

  return (
    <div className="mx-auto px-6 md:px-0 max-w-[1320px] py-2">
      <section className="md:grid gap-4 lg:grid-cols-2 items-stretch">
        {/* Left */}
        <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-3 items-stretch">
          {cards.map((card, i) => {
            const Icon = icons[i];

            return (
              <Link to={card.link || '#'} key={i} className="flex h-full group">
                <div
                  className="flex h-full w-full flex-col items-center rounded-xl border border-[#ececec] bg-white px-3 py-3 text-center transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-lg group-hover:border-[#4b8f46]/30"
                >
                  <div className="mx-auto flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#eef7eb] transition-all duration-300 group-hover:bg-[#4b8f46] group-hover:scale-110 group-hover:shadow-md">
                    <Icon
                      size={20}
                      className="text-[#4b8f46] transition-colors duration-300 group-hover:text-white"
                      strokeWidth={1.8}
                    />
                  </div>

                  <h3 className="mt-2 text-sm font-semibold text-[#16213e] transition-colors duration-300 group-hover:text-[#4b8f46]">
                    {card.title}
                  </h3>

                  <p className="mt-1 line-clamp-2 min-h-[36px] text-[11px] leading-5 text-[#666666]">
                    {card.text}
                  </p>

                  <button className="mt-auto inline-flex items-center gap-2 pt-1 text-[11px] font-semibold uppercase text-[#3d8b37] transition-all duration-300">
                    Learn More
                    <ArrowRight size={13} className="transition-transform duration-300 group-hover:translate-x-1" />
                  </button>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Right */}
        <div className="flex flex-col justify-center overflow-hidden rounded-xl bg-gradient-to-br from-slate-50 to-white px-6 py-2 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.05)] border border-gray-100">
          <div className="mb-2 flex items-center justify-between">
            <h2 className="text-[15px] font-semibold uppercase tracking-wide text-[#0B2A63] flex items-center gap-2">
              Associations & Partners
            </h2>
          </div>

          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            // navigation
            pagination={{ clickable: true }}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            spaceBetween={16}
            breakpoints={{
              0: { slidesPerView: 2 },
              640: { slidesPerView: 3 },
              1024: { slidesPerView: 4 },
              1280: { slidesPerView: 5 },
            }}
            className="partner-swiper w-full !pb-8"
          >
            {associates.map((logo, i) => (
              <SwiperSlide key={i}>
                <div className="group flex h-[90px] items-center justify-center rounded-xl bg-white p-3 shadow-sm border border-gray-100 transition-all duration-300 hover:border-[#2F8B2E] hover:shadow-md cursor-pointer">
                  <img
                    src={`${SERVER_URL}${logo}`}
                    alt="partner"
                    className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <style>{`
        .partner-swiper .swiper-button-next,
        .partner-swiper .swiper-button-prev {
          width: 26px;
          height: 26px;
          color: #222;
        }

        .partner-swiper .swiper-button-next:after,
        .partner-swiper .swiper-button-prev:after {
          font-size: 14px;
          font-weight: 700;
        }

        .partner-swiper .swiper-pagination-bullet {
          width: 7px;
          height: 7px;
          background: #d8d8d8;
          opacity: 1;
        }

        .partner-swiper .swiper-pagination-bullet-active {
          background: #2f7d32;
        }
      `}</style>
      </section>
    </div>
  );
}