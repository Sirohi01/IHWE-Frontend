import { useState, useEffect } from "react";
import AutoScroll from "embla-carousel-auto-scroll";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { heroBackgroundApi, SERVER_URL, partnersApi, clientApi } from "@/lib/api";

import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import partnersHeroFallback from "../assets/cara14.jpg";

const Partners = () => {
  const [heroData, setHeroData] = useState<any>(null);
  const [partnerGroups, setPartnerGroups] = useState<any[]>([]);

  useEffect(() => {
    const fetchHero = async () => {
      try {
        const data = await heroBackgroundApi.getByPage("Overview / Our Partners");
        if (data) setHeroData(data);
      } catch (error) {
        console.error("Error fetching hero:", error);
      }
    };

    const fetchPartners = async () => {
      try {
        const partnersData = await partnersApi.getAll();
        const clientData = await clientApi.get();

        let finalGroups = [...partnersData];

        // If clientData exists, create/merge the Media Partners group
        if (clientData) {
          const mediaPartnersGroup = {
            _id: clientData._id || 'media-partners-marquee',
            subheading: clientData.subheading || "Media Partners",
            heading: clientData.heading || "Industry Leadership",
            highlightText: clientData.highlightText || "Leadership",
            partners: clientData.images.map((img: any) => ({
              _id: img._id,
              name: img.altText || '',
              logo: img.url,
              imageAlt: img.altText || ''
            })),
            isMarquee: true // Flag to identify it uses the marquee layout
          };

          // Remove any existing Media Partners group from backend if we want to replace it
          finalGroups = finalGroups.filter(g => g.subheading !== "Media Partners");
          finalGroups.push(mediaPartnersGroup);
        }

        setPartnerGroups(finalGroups);
      } catch (error) {
        console.error("Error fetching partners:", error);
      }
    };

    fetchHero();
    fetchPartners();
  }, []);

  return (
    <div className="bg-white min-h-screen font-inter">
      {/* HERO SECTION - Standardized 16:4 Sleek Style */}
      <section
        className="hero-background-standard"
        style={{
          backgroundImage: `url(${heroData?.backgroundImage ? `${SERVER_URL}${heroData.backgroundImage}` : partnersHeroFallback})`
        }}
      >
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute bottom-0 left-0 w-full h-4 md:h-8 bg-white" style={{ clipPath: "ellipse(60% 100% at 50% 100%)" }} />

        <div className="container mx-auto px-4 text-center text-white relative z-10" data-aos="fade-up">
          <p className="text-sm uppercase tracking-[0.4em] mb-4 opacity-80">
            {heroData?.title || "Our Network"}
          </p>
          <h1 className="text-4xl md:text-6xl font-inter font-semibold mb-6 tracking-tight">
            {heroData?.heading || "Partners & Associations"}
          </h1>
          <p className="text-white/70 text-base md:text-lg mb-8 max-w-2xl mx-auto font-light leading-relaxed">
            {heroData?.shortDescription || "Collaborating with global leaders to shape the future of medical innovation."}
          </p>
        </div>
      </section>

      {partnerGroups.map((group) => {
        const isMarquee = group.isMarquee || group.subheading === "Media Partners";

        const renderTitle = () => (
          <div className="text-center mb-10" data-aos="fade-up">
            <div className="flex items-center justify-center gap-3 mb-3">
              <div className="h-px w-10 bg-[#23471d]" />
              <span className="text-xs font-bold uppercase tracking-[0.4em] text-[#23471d]">{group.subheading}</span>
              <div className="h-px w-10 bg-[#23471d]" />
            </div>
            <h2 className="text-3xl md:text-4xl font-inter text-slate-900 leading-tight">
              {group.heading.split(group.highlightText).map((part, i, arr) => (
                <span key={i}>
                  {part}
                  {i < arr.length - 1 && <span className="text-[#d26019]">{group.highlightText}</span>}
                </span>
              ))}
            </h2>
          </div>
        );

        if (isMarquee) {
          return (
            <section key={group._id} className="py-16 bg-[#F7F8F0]">
              <div className="container mx-auto px-4">
                {renderTitle()}
              </div>

              <div className="border-y border-slate-300 py-10 bg-slate-50/50">
                <div className="relative mx-auto flex items-center justify-center max-w-7xl overflow-hidden px-4">
                  <Carousel
                    opts={{ loop: true, align: "center" }}
                    plugins={[AutoScroll({ playOnInit: true, speed: 0.5 })]}
                    className="w-full"
                  >
                    <CarouselContent className="-ml-4">
                      {group.partners.concat(group.partners).map((p, idx) => (
                        <CarouselItem
                          key={`${p._id}-${idx}`}
                          className="pl-4 basis-1/3 sm:basis-1/3 md:basis-1/4 lg:basis-1/6"
                        >
                          <div className="bg-white border border-slate-200 p-4 h-20 md:h-24 flex items-center justify-center overflow-hidden shadow-sm hover:shadow-md hover:scale-105 transition-all duration-300">
                            <LazyLoadImage
                              src={p.logo.startsWith("http") ? p.logo : `${SERVER_URL}${p.logo}`}
                              alt={p.imageAlt || p.name}
                              effect="blur"
                              className="max-h-full max-w-full object-contain mx-auto"
                              wrapperClassName="!flex items-center justify-center h-full w-full"
                            />
                          </div>
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                  </Carousel>

                  {/* Fading Gradients - Matching Home Page */}
                  <div className="absolute inset-y-0 left-0 w-24 md:w-48 bg-gradient-to-r from-[#F7F8F0] to-transparent z-10 pointer-events-none"></div>
                  <div className="absolute inset-y-0 right-0 w-24 md:w-48 bg-gradient-to-l from-[#F7F8F0] to-transparent z-10 pointer-events-none"></div>
                </div>
              </div>
            </section>
          );
        }

        return (
          <section key={group._id} className="py-12 even:bg-slate-50">
            <div className="container mx-auto px-4">
              {renderTitle()}

              <div className={`grid grid-cols-2 sm:grid-cols-3 ${group.subheading === 'Title Partners' ? 'md:grid-cols-4' : 'md:grid-cols-4 lg:grid-cols-5'} gap-6 max-w-7xl mx-auto items-center justify-center justify-items-center`}>
                {group.partners.map((p, idx) => (
                  <div
                    key={p._id}
                    data-aos="fade-up"
                    data-aos-delay={idx * 50}
                    className="group relative bg-white border border-slate-200 p-2 h-24 w-full max-w-[220px] flex flex-col items-center justify-center shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                  >
                    <div className="w-full h-full flex items-center justify-center overflow-hidden">
                      <LazyLoadImage
                        src={`${SERVER_URL}${p.logo}`}
                        alt={p.imageAlt || p.name}
                        effect="blur"
                        className="max-h-[92%] max-w-[92%] object-contain transition-all duration-500 mx-auto"
                        wrapperClassName="!flex items-center justify-center h-full w-full"
                      />
                    </div>
                    {p.name && (
                      <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] py-1 px-2 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-20">
                        {p.name}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </section>
        );
      })}
    </div>
  );
};

export default Partners;
