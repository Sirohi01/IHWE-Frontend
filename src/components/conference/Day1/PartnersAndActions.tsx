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
const cards = [
  {
    title: "Paper Presentation",
    text: "Submit your original research papers and showcase your innovative ideas to a global audience.",
    icon: FileText,
    link:"/conference/paper-presentation"
  },
  {
    title: "Poster Presentation",
    text: "Present your research visually and engage in insightful discussions with experts and peers.",
    icon: Newspaper,
    link:"/conference/poster-presentation"
  },
  {
    title: "Abstract Submission",
    text: "Submit your abstract for review and be a part of this prestigious global event.",
    icon: CloudUpload,
    link:"/conference/abstract-submission"
  },
];

const associates = [
  partner,
  partner,
  partner,
  partner,
  partner,
  partner,
];

export default function PartnersAndActionsSection() {
  return (
       <div className="container mx-auto px-6 max-w-[1320px] py-4">
   <section className="grid gap-5 lg:grid-cols-2 items-stretch">
      {/* Left */}
      <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-3">
        {cards.map((card, i) => {
          const Icon = card.icon;

          return (
            <Link to={card.link}>
            <div
              key={i}
              className="rounded-xl border border-[#ececec] bg-white px-4 py-5 text-center"
            >
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#eef7eb]">
                <Icon
                  size={28}
                  className="text-[#4b8f46]"
                  strokeWidth={1.8}
                />
              </div>

              <h3 className="mt-4 text-[18px] font-semibold leading-5 text-[#16213e]">
                {card.title}
              </h3>

              <p className="mt-4 text-[11px] leading-5 text-[#666666]">
                {card.text}
              </p>

              <button className="mt-6 inline-flex items-center gap-2 text-[11px] font-semibold uppercase text-[#3d8b37]">
                Learn More
                <ArrowRight size={13} />
              </button>
            </div>
            </Link>
          );
        })}
      </div>

      {/* Right */}
      <div className="rounded-xl border border-[#ececec] bg-white p-5">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-[20px] font-bold uppercase text-[#222]">
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
          className="partner-swiper pb-8"
        >
          {associates.map((logo, i) => (
            <SwiperSlide key={i}>
              <div className="flex h-[130px] items-center justify-center rounded-lg border border-[#ececec] bg-white p-5">
                <img
                  src={logo}
                  alt="partner"
                  className="max-h-16 w-full object-contain"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <style jsx global>{`
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