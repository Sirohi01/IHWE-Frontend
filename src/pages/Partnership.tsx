import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  heroBackgroundApi,
  SERVER_URL,
} from "@/lib/api";

import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

import partnersHeroFallback from "../assets/cara14.jpg";

const Partnership = () => {
  const [heroData, setHeroData] = useState<any>(null);

  useEffect(() => {
    const fetchHero = async () => {
      try {
        const data = await heroBackgroundApi.getByPage(
          "Overview / Our Partners"
        );

        if (data) setHeroData(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchHero();
  }, []);

  return (
    <div className="bg-[#f5f5f5] overflow-hidden">

      {/* HERO SECTION */}
      <section className="relative overflow-hidden">

        {/* BG */}
        <div
          className="relative min-h-[580px] bg-cover bg-center"
          style={{
            backgroundImage: `url('/images/hero.jpg')`,
          }}
        >


          {/* CONTENT */}
          <div className="relative z-20 max-w-[1450px] mx-auto px-4 md:px-10 lg:px-16 xl:px-24 pt-16">

            <div className="grid lg:grid-cols-[1fr_0.9fr] gap-10 items-center">

              {/* LEFT */}
              <div>
                <p className="uppercase tracking-[4px] text-white font-bold text-sm mb-3">
                  Be a Catalyst For
                </p>


                <h1 className="text-white text-5xl md:text-7xl font-black leading-[0.95] uppercase">
                  Healthier
                  <span className="block text-[#619941] mt-0">
                    Tomorrow
                  </span>
                </h1>
                <p className="uppercase tracking-[4px] text-white font-bold text-sm mb-3">
                  Partner With IHWE 2026
                </p>
                <p className="text-white/85 text-lg md:text-[16px] leading-9 mt-2 max-w-[700px]">

                  Join hands with IHWE 2026, the global
                  platform bringing together innovators,
                  industry leaders and changemakers in
                  Health & Wellness.

                </p>

                {/* BUTTONS */}
                <div className="flex flex-wrap gap-3 mt-4">

                  <Link to="/partner-registration">
                    <button className="bg-[#619941] hover:bg-[#58b02d] transition-all duration-300 text-white uppercase px-4 py-1 rounded-[20px] shadow-2xl">
                      Register As Partner
                    </button>
                  </Link>

                  <button className="border border-white hover:bg-white hover:text-[#021b45] transition-all duration-300 text-white uppercase px-4 py-2 rounded-[20px]">

                    Explore Opportunities

                  </button>

                </div>

              </div>

              {/* RIGHT */}
              <div className="flex">

                {/* MAIN IMAGE */}
                <div className="w-full max-w-[620px]">
                  {/* FLOATING CARD */}
                  <div className="absolute top-10 right-6 bg-[#042a64] border-[4px] border-[#619941] rounded-[30px] p-6 w-[280px] shadow-2xl rotate-[6deg]">

                    {[
                      {
                        number: "8,000+",
                        label: "Visitors Expected",
                        image: "/images/partnership/visitors.png",
                      },
                      {
                        number: "100+",
                        label: "Global Buyers",
                        image: "/images/partnership/globe.png",
                      },
                      {
                        number: "3",
                        label: "Power-Packed Days",
                        image: "/images/partnership/calender.png",
                      },
                      {
                        number: "Unlimited",
                        label: "Business Opportunities",
                        image: "/images/partnership/business.png",
                      },
                      {
                        number: "High",
                        label: "Brand Visibility & Exposure ",
                        image: "/images/partnership/high.png",
                      },
                    ].map((item, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-4 py-2 border-b border-white/10 last:border-b-0"
                      >

                        <div className="w-16 h-16 flex items-center justify-center p-2">

                          <img
                            src={item.image}
                            alt=""
                            className="w-full h-full object-contain"
                          />

                        </div>

                        <div>

                          <h3 className="text-white text-[16px] font-black leading-none">
                            {item.number}
                          </h3>

                          <p className="text-white/70 text-[10px] mt-1">
                            {item.label}
                          </p>

                        </div>

                      </div>
                    ))}

                  </div>

                </div>

              </div>

            </div>

          </div>

          {/* CURVE */}
          <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">

            <svg
              viewBox="0 0 1440 120"
              className="w-full h-[120px]"
              preserveAspectRatio="none"
            >
              <path
                fill="#f5f5f5"
                d="M0,64L80,69.3C160,75,320,85,480,85.3C640,85,800,75,960,69.3C1120,64,1280,64,1360,64L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"
              />
            </svg>

          </div>

        </div>

        {/* WHY PARTNER */}
        <div className="relative z-20 -mt-16 px-4 md:px-10 lg:px-16 xl:px-24">

          <div className="max-w-[1450px] mx-auto bg-white rounded-[30px] shadow-[0_15px_60px_rgba(0,0,0,0.08)] overflow-hidden border border-[#ececec]">

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
              <div className=" p-2 md:p-4 border-r border-[#ececec] last:border-r-0 mt-10">
                <h3 className="text-[#16316b] text-lg md:text-xl font-black uppercase">WHY PARTNER <span className="text-[#619941]">WITH IHWE 2026?</span></h3>
              </div>
              {[
                {
                  title: "Direct Access",
                  desc: "Connect with 8,000+ industry leaders & Decision makers",
                  image: "/images/partnership/visitor.png",
                },
                {
                  title: "Global Exposure",
                  desc: "Enhance your brand presence globally",
                  image: "/images/partnership/global.png",
                },
                {
                  title: "Brand Visibility",
                  desc: "Showcase your brand across multiple channels before, during & after the event",
                  image: "/images/partnership/social.png",
                },
                {
                  title: "Long-Term Growth",
                  desc: "Build long-term partnerships & open doors to new business opportunities",
                  image: "/images/partnership/grow.png",
                },
                {
                  title: "Business Growth",
                  desc: "Genrate quality leads, expand customer base & increase ROI",
                  image: "/images/partnership/businessgrow.png",
                },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="text-center p-2 md:p-4 border-r border-[#ececec] last:border-r-0"
                >

                  <div className="w-16 h-16 mx-auto rounded-full bg-[#eef8ea] flex items-center justify-center p-3">

                    <img
                      src={item.image}
                      alt=""
                      className="w-full h-full object-contain"
                    />

                  </div>

                  <h4 className="text-[#16316b] text-[14px] font-black uppercase">
                    {item.title}
                  </h4>

                  <p className="text-[#555] text-[12px] leading-2">
                    {item.desc}
                  </p>

                </div>
              ))}

            </div>

          </div>

        </div>

      </section>

      {/* PARTNER CATEGORIES */}
      <section className="py-8 px-4 md:px-10 lg:px-16 xl:px-24">

        <div className="max-w-[1450px] mx-auto">

          {/* HEADING */}
          <div className="text-center mb-10">

            <div className="flex items-center justify-center gap-3 mb-2">

              <div className="w-10 h-[2px] bg-[#619941]" />

              <span className="text-[#619941] text-sm font-bold uppercase tracking-[2px]">
                Partnership Opportunities
              </span>

              <div className="w-10 h-[2px] bg-[#619941]" />

            </div>

            <h3 className="text-[18px] md:text-[24px] font-black text-[#102040] uppercase leading-tight">

              Our Partner Categories
              <span className="text-[#619941]">
                {" "} & Benefits
              </span>

            </h3>

            <p className="text-[#555] text-sm md:text-base mt-2">
              Choose a category that fits your business goals and unlock exclusive advantages.
            </p>

          </div>

          {/* CARDS */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

            {[
              {
                no: "01",
                title: "Hotel & Stay Partner",
                image: "/images/partnership/3.png",
                color: "#619941",
                icon: "/images/partnership/bed.png",
                points: [
                  "Brand visibility on official platforms",
                  "Direct access to exhibitors & delegates",
                  "Priority partner listing",
                  "Business inquiries & repeat bookings",
                  "Exclusive partner rates",
                ],
              },
              {
                no: "02",
                title: "Travel Partner",
                image: "/images/partnership/2.png",
                color: "#2f68c5",
                icon: "/images/partnership/aeroplan.png",
                points: [
                  "Featured as official travel partner",
                  "Exposure to global exhibitors & buyers",
                  "Lead generation opportunities",
                  "Association with premium event",
                  "Referral business opportunities",
                ],
              },
              {
                no: "03",
                title: "Stall Design & Fabrication",
                image: "/images/partnership/1.png",
                color: "#11a7b8",
                icon: "/images/partnership/home.png",
                points: [
                  "Official branding on event collaterals",
                  "High visibility at venue",
                  "Access to exhibitors for stall needs",
                  "Repeat business potential",
                  "Showcase portfolio to global brands",
                ],
              },
              {
                no: "04",
                title: "Logistics Partner",
                image: "/images/partnership/Logistics.png",
                color: "#7b43c9",
                icon: "/images/partnership/delivery.png",
                points: [
                  "Listed as official logistics partner",
                  "International partner recognition",
                  "Continuous business opportunities",
                  "Access to exhibitors logistics needs",
                  "Long-term contracts",
                ],
              },
              {
                no: "05",
                title: "Printing & Branding",
                image: "/images/partnership/printing.png",
                color: "#ff7a00",
                icon: "/images/partnership/print.png",
                points: [
                  "Branding across event materials",
                  "On-site branding opportunities",
                  "High footfall audience visibility",
                  "Year-round referrals",
                  "Association with globally recognized event",
                ],
              },
              {
                no: "06",
                title: "Hospitality Partner",
                image: "/images/partnership/hospitality.jpg",
                color: "#e93d8b",
                icon: "/images/partnership/bell.png",
                points: [
                  "Recognition as hospitality partner",
                  "Networking with delegates & exhibitors",
                  "Brand exposure at venue",
                  "Long-term collaboration opportunities",
                  "Enhance brand credibility",
                ],
              },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -6 }}
                transition={{ duration: 0.3 }}
                className="relative bg-white rounded-[24px] border overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300"
                style={{
                  borderColor: `${item.color}50`,
                }}
              >

                {/* TOP NUMBER */}
                <div
                  className="absolute top-0 left-0 z-20 w-[72px] h-[72px] rounded-br-[28px] flex items-center justify-center"
                  style={{
                    backgroundColor: item.color,
                  }}
                >

                  <span className="text-white text-2xl font-black">
                    {item.no}
                  </span>

                </div>

                {/* DOTS */}
                <div className="absolute top-5 right-5 z-20">

                  <div className="grid grid-cols-4 gap-[3px]">

                    {Array.from({ length: 16 }).map((_, i) => (
                      <div
                        key={i}
                        className="w-[3px] h-[3px] rounded-full"
                        style={{
                          backgroundColor: item.color,
                        }}
                      />
                    ))}

                  </div>

                </div>

                {/* IMAGE */}
                <div
                  className="h-[200px] bg-cover bg-center relative"
                  style={{
                    backgroundImage: `url(${item.image})`,
                  }}
                >

                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

                </div>

                {/* CONTENT */}
                <div className="relative px-6 pb-6 pt-5">

                  {/* ICON */}
                  <div
                    className="absolute -top-10 left-6 w-20 h-20 rounded-full flex items-center justify-center border-white"

                  >

                    <img
                      src={item.icon}
                      alt=""
                      className="w-full h-full object-contain"
                    />

                  </div>

                  {/* TITLE */}
                  <div className="pl-24">

                    <h3
                      className="text-[18px] font-black uppercase leading-tight"
                      style={{
                        color: item.color,
                      }}
                    >
                      {item.title}
                    </h3>

                  </div>

                  {/* LIST */}
                  <ul className="space-y-3 mt-8">

                    {item.points.map((point, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-3"
                      >

                        <div
                          className="w-5 h-5 rounded-full mt-[2px] flex items-center justify-center shrink-0"
                          style={{
                            backgroundColor: `${item.color}15`,
                          }}
                        >

                          <div
                            className="w-2 h-2 rounded-full"
                            style={{
                              backgroundColor: item.color,
                            }}
                          />

                        </div>

                        <span className="text-[#444] text-[14px] leading-6">
                          {point}
                        </span>

                      </li>
                    ))}

                  </ul>

                  {/* BUTTON */}
                  <button
                    className="mt-8 h-[46px] px-8 rounded-full border-2 font-black uppercase text-sm transition-all duration-300 hover:text-white"
                    style={{
                      borderColor: item.color,
                      color: item.color,
                    }}
                    onClick={() => {
                      if (item.title === "Travel Partner") {
                        window.location.href = "/travel-partner";
                      }
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = item.color;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = "transparent";
                    }}
                  >
                    View Benefits →
                  </button>
                </div>

              </motion.div>
            ))}

          </div>

        </div>

      </section>
      {/* IMPACT PARTNERSHIP SECTION */}
      <section
        className="relative overflow-hidden bg-no-repeat bg-top bg-contain mb-0"
        style={{
          backgroundImage: "url('/images/partnership/impact-bg.png')",
          backgroundSize: "100% auto",
          minHeight: "490px",
        }}
      >
        <div className="max-w-[1400px] mx-auto px-4 md:px-10 h-full">

          <div className="grid grid-cols-2 md:grid-cols-4 items-end h-[420px]">

            <div></div>
            <div></div>
            <div></div>

            {/* BUTTON */}
            <div className="flex justify-end relative bottom-[10px]">
              <Link to="/partner-registration">
                <button className="group h-[42px] px-2 rounded-full bg-gradient-to-r from-[#78cd3d] to-[#57b327] text-white  tracking-wide text-sm font-semibold shadow-xl hover:scale-105 transition-all duration-300 flex items-center gap-4">

                  Register As Official Partner

                </button>
              </Link>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
};

export default Partnership;