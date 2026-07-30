"use client";

import AutoScroll from "embla-carousel-auto-scroll";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";

import { SERVER_URL } from "@/lib/api";

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
  currentDay: number;
  data: any;
}

export default function OurSpeakersCarousel({
  title = "OUR SPEAKERS",
  subtitle = "Meet the visionaries shaping the future of healthcare.",
  data,
  currentDay,
}: OurSpeakersCarouselProps) {
  const speakers = data.ourSpeakers;

  return (
    <div className="mx-auto px-6 md:px-0 max-w-[1320px]">
      <section className="rounded-3xl border border-slate-200 bg-white p-4 pb-0 shadow-sm">
        {/* Header */}
        <div className="mb-3 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-slate-900">{title}</h2>
            <p className="mt-1 text-xs text-slate-500">{subtitle}</p>
          </div>

          <button className="hidden rounded-full bg-green-700 px-4 py-2 text-xs font-semibold text-white transition hover:bg-green-800 md:block">
            VIEW ALL
          </button>
        </div>

        {/* Carousel */}
        <Carousel
          opts={{ loop: true, align: "start", watchDrag: false }}
          plugins={[AutoScroll({ playOnInit: true, speed: 1.8, stopOnInteraction: false, stopOnMouseEnter: false })]}
          className="w-full h-[230px]"
        >
          <CarouselContent className="-ml-3 h-full">
            {speakers.concat(speakers).map((speaker: Speaker, index: number) => (
              <CarouselItem
                key={index}
                className="pl-3 basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/6 xl:basis-[12.5%] h-full"
              >
                <div className="flex h-[190px] flex-col items-center overflow-hidden rounded-xl border border-[#e9e9e9] bg-white px-2 py-4 text-center transition hover:shadow-sm">
                  {/* Avatar */}
                  <img loading="lazy" decoding="async" src={`${SERVER_URL}${speaker?.image}`}
                    alt={speaker.name}
                    className="mb-3 h-16 w-16 shrink-0 rounded-full object-cover"
                  />

                  {/* Name */}
                  <h3 className="line-clamp-2 text-[11px] font-semibold text-[#111111]">
                    {speaker.name}
                  </h3>

                  {/* Role */}
                  <p className="mt-1 line-clamp-2 text-[8px] leading-[13px] font-medium">
                    {speaker.role}
                  </p>

                  {/* Company */}
                  <p className="mt-1 line-clamp-2 text-[9px] font-medium">
                    {speaker.company}
                  </p>

                  {/* Badge */}
                  <div className="mt-auto">
                    <span className="rounded-full border border-[#2f7d32] px-2 py-1 text-[8px] font-semibold uppercase tracking-wide text-[#2f7d32]">
                      {speaker.badge || "FEATURED SPEAKER"}
                    </span>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </section>
    </div>
  );
}
