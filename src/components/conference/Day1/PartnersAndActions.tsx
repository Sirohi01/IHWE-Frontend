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
    <div className="mx-auto px-6 md:px-0 max-w-[1320px] py-4">
      <section className="md:grid gap-4 lg:grid-cols-2 items-stretch">
        {/* Left */}
        <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-3 items-stretch">
          {cards.map((card, i) => {
            const Icon = icons[i];

            return (
              <Link to={card.link} key={i} className="flex h-full">
                <div
                  className="flex h-full w-full flex-col items-center rounded-xl border border-[#ececec] bg-white px-3 py-3 text-center"
                >
                  <div className="mx-auto flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#eef7eb]">
                    <Icon
                      size={20}
                      className="text-[#4b8f46]"
                      strokeWidth={1.8}
                    />
                  </div>

                  <h3 className="mt-2 text-sm font-semibold text-[#16213e]">
                    {card.title}
                  </h3>

                  <p className="mt-1 line-clamp-2 min-h-[36px] text-[11px] leading-5 text-[#666666]">
                    {card.text}
                  </p>

                  <button className="mt-auto inline-flex items-center gap-2 pt-1 text-[11px] font-semibold uppercase text-[#3d8b37]">
                    Learn More
                    <ArrowRight size={13} />
                  </button>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Right */}
        <div className="rounded-xl border border-[#ececec] bg-white p-4">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-base font-bold uppercase text-[#222]">
              Associations & Partners
            </h2>
          </div>

          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            navigation
            pagination={{ clickable: true }}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            spaceBetween={12}
            breakpoints={{
              0: {
                slidesPerView: 2,
              },
              640: {
                slidesPerView: 3,
              },
              1024: {
                slidesPerView: 5,
              },
              1280: {
                slidesPerView: 6,
              },
            }}
            className="partner-swiper"
          >
            {associates.map((logo, i) => (
              <SwiperSlide key={i}>
                <div className="flex h-[104px] items-center justify-center rounded-lg border border-[#ececec] bg-white ">
                  <img
                    src={`${SERVER_URL}${logo}`}
                    alt="partner"
                    className="w-full object-contain"
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