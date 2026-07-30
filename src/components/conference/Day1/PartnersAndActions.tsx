"use client";

import {
  FileText,
  Newspaper,
  CloudUpload,
  ArrowRight,
} from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import AutoplayPlugin from "embla-carousel-autoplay";
import { useCallback, useEffect, useState } from "react";
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

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false, align: "start" }, [
    AutoplayPlugin({ delay: 2500, stopOnInteraction: false }),
  ]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);
  const scrollTo = useCallback((index: number) => emblaApi?.scrollTo(index), [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    setScrollSnaps(emblaApi.scrollSnapList());
    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi]);

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

          <div className="overflow-hidden pb-8 w-full partner-swiper" ref={emblaRef}>
            <div className="flex -ml-4">
              {associates.map((logo, i) => (
                <div
                  key={i}
                  className="pl-4 min-w-0 shrink-0 grow-0 basis-1/2 sm:basis-1/3 lg:basis-1/4 xl:basis-1/5"
                >
                  <div className="group flex h-[90px] items-center justify-center rounded-xl bg-white p-3 shadow-sm border border-gray-100 transition-all duration-300 hover:border-[#2F8B2E] hover:shadow-md cursor-pointer">
                    <img loading="lazy" decoding="async" src={`${SERVER_URL}${logo}`}
                      alt="partner"
                      className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {scrollSnaps.length > 1 && (
            <div className="flex items-center justify-center gap-1.5 -mt-6">
              {scrollSnaps.map((_, index) => (
                <button
                  key={index}
                  onClick={() => scrollTo(index)}
                  aria-label={`Go to slide ${index + 1}`}
                  className={`h-[7px] w-[7px] rounded-full transition-colors ${index === selectedIndex ? "bg-[#2f7d32]" : "bg-[#d8d8d8]"
                    }`}
                />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
