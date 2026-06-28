"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, FreeMode } from "swiper/modules";
import { ArrowRight } from "lucide-react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";


interface Speaker {
  id?: string | number;
  name: string;
  role: string;
  company: string;
  image: string;
  badge?: string;
}

interface OurSpeakersCarouselProps {
  title?: string;
  subtitle?: string;
  speakers: Speaker[];
}

export default function OurSpeakersCarousel({
  title = "OUR SPEAKERS",
  subtitle = "Meet the visionaries shaping the future of healthcare.",
  speakers,
}: OurSpeakersCarouselProps) {
  return (
         <div className="container mx-auto px-6 max-w-[1320px] py-4" >
    <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
      {/* Header */}
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-900">
            {title}
          </h2>

          <p className="mt-1 text-xs text-slate-500">
            {subtitle}
          </p>
        </div>

        <button className="hidden rounded-full bg-green-700 px-4 py-2 text-xs font-semibold text-white transition hover:bg-green-800 md:block">
          VIEW ALL
        </button>
      </div>

      {/* Carousel */}
    <Swiper
  modules={[Autoplay, FreeMode]}
  loop={true}
  freeMode={true}
  speed={5000}
  allowTouchMove={false}
  autoplay={{
    delay: 0,
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
    768: {
      slidesPerView: 4,
    },
    1024: {
      slidesPerView: 6,
    },
    1280: {
      slidesPerView: 8,
    },
  }}
  className="speaker-swiper"
>
  {speakers.concat(speakers).map((speaker, index) => (
    <SwiperSlide key={index}>
      <div className="flex h-[210px] flex-col items-center rounded-xl border border-[#e9e9e9] bg-white px-2 py-4 text-center transition hover:shadow-sm">
        {/* Avatar */}
        <img
          src={speaker.image}
          alt={speaker.name}
          className="mb-3 h-16 w-16 rounded-full object-cover"
        />

        {/* Name */}
        <h3 className="line-clamp-2 min-h-[30px] text-[11px] font-semibold leading-[15px] text-[#111111]">
          {speaker.name}
        </h3>

        {/* Role */}
        <p className="mt-2 line-clamp-2 text-[9px] leading-[13px] text-[#555555]">
          {speaker.role}
        </p>

        {/* Company */}
        <p className="mt-1 line-clamp-2 text-[9px] leading-[13px] text-[#555555]">
          {speaker.company}
        </p>

        {/* Badge */}
        <div className="mt-auto pt-3">
          <span className="rounded-full border border-[#2f7d32] px-2 py-1 text-[8px] font-semibold uppercase tracking-wide text-[#2f7d32]">
            {speaker.badge || "FEATURED SPEAKER"}
          </span>
        </div>
      </div>
    </SwiperSlide>
  ))}
</Swiper>
<style global jsx>{`
.speaker-swiper .swiper-button-prev,
.speaker-swiper .swiper-button-next {
    width: 24px;
    height: 24px;
    color: #000;
    top: 45%;
    }
    
    .speaker-swiper .swiper-button-prev::after,
    .speaker-swiper .swiper-button-next::after {
        font-size: 12px;
        font-weight: 700;
        }
        `}</style>
    </section>
        </div>
  );
}