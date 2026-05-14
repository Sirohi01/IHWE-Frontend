import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Users,
  Globe,
  Briefcase,
  TrendingUp,
  ArrowRight,
} from "lucide-react";

import {
  advisoryApi,
  heroBackgroundApi,
  SERVER_URL,
} from "@/lib/api";

import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

import heroImgFallback from "../assets/members.jpg";

const AdvisoryBoard = () => {
  const [heroData, setHeroData] = useState<any>(null);
  const [members, setMembers] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [heroRes, membersRes] = await Promise.all([
          heroBackgroundApi.getByPage(
            "Overview / Advisory Board Members"
          ),
          advisoryApi.getAll(),
        ]);

        if (heroRes) setHeroData(heroRes);

        setMembers(membersRes);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="bg-[#f7f7f7] overflow-hidden">

      {/* HERO SECTION */}
      <section className="relative bg-[#f7f7f7] overflow-hidden">

        {/* HERO BG */}
        <div
          className="relative min-h-[700px] bg-cover bg-center"
          style={{
            backgroundImage: heroData?.backgroundImage
              ? `url(${SERVER_URL}${heroData.backgroundImage})`
              : `url(${heroImgFallback})`,
          }}
        >


          {/* CONTENT */}
          <div className="relative z-10 min-w-[1450px] mx-auto px-4 md:px-10 lg:px-16 xl:px-24 pt-20">

            <div className="grid lg:grid-cols-[65%_35%] gap-4 items-center">

              {/* LEFT SIDE */}
              <div className="text-white mt-10">

                {/* TAG */}
                <div className="flex items-center gap-3 mb-6">

                  <div className="w-16 h-[2px] bg-[#c6931f]" />

                  <p className="uppercase tracking-[3px] text-[#c6931f] font-bold text-sm">
                    Experts & Visionaries
                  </p>

                </div>

                {/* TITLE */}
                <h1 className="text-4xl md:text-5xl font-black leading-[0.95] uppercase">

                  Advisory

                  <span className="block text-[#6fce3d] mt-2">
                    Board Members
                  </span>

                </h1>

                {/* DESC */}
                <p className="text-white/85 text-lg md:text-[22px] leading-9 mt-8 max-w-[700px]">

                  Meet the distinguished leaders and professionals
                  shaping the strategic direction of
                  <span className="text-[#6fce3d] font-bold">
                    {" "}IHWE Expo 2026.
                  </span>

                </p>
              </div>
            </div>
            <div className="grid lg:grid-cols-[65%_35%] gap-10 items-center">
              <div className="text-white">
                {/* FEATURES */}
                <div className="grid grid-cols-4 gap-x-10 gap-y-4 mt-10">

                  {[
                    {
                      title: "Industry Experts",
                      desc: "From diverse sectors",
                      image: "/images/2.png",
                    },
                    {
                      title: "Strategic Guidance",
                      desc: "Driving innovation and excellence",
                      image: "/images/3.png",
                    },
                    {
                      title: "Global Perspective",
                      desc: "Bringing international expertise",
                      image: "/images/epromotion/globe.png",
                    },
                    {
                      title: "Vision For The Future",
                      desc: "Building a healthier tomorrow",
                      image: "/images/icon1.png",
                    },
                  ].map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-4"
                    >

                      {/* IMAGE */}
                      <div className="w-12 h-12 rounded-full bg-white p-2 flex items-center justify-center shrink-0 shadow-xl overflow-hidden">

                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-contain"
                        />

                      </div>

                      {/* TEXT */}
                      <div>

                        <h3 className="text-white text-sm font-black uppercase leading-tight">
                          {item.title}
                        </h3>

                        <p className="text-white/75 text-[9px] leading-4 mt-2">
                          {item.desc}
                        </p>

                      </div>

                    </div>
                  ))}

                </div>
              </div>

              {/* RIGHT CTA CARD */}
              <div className="hidden lg:block absolute right-[8px] z-20 mt-40">

                <div className="relative max-w-[360px]">


                  {/* TITLE */}
                  <h4 className="relative z-10 text-white text-sm md:text-sm font-black leading-tight">

                    Be Part of a Visionary Network

                  </h4>

                  {/* DESC */}
                  <p className="relative z-10 text-white/80 text-base leading-1 mt-1">

                    Connect with thought leaders and drive
                    meaningful change in the health &
                    wellness ecosystem.

                  </p>

                  {/* BUTTON */}
                  <Link
                    to="/advisory"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative z-10 mt-2 bg-[#56b532] hover:bg-[#479d2a] transition-all duration-300 text-white font-black uppercase px-4 py-2 rounded-[12px] flex items-center gap-3 shadow-lg"
                  >
                    Register Now
                    <div className="w-7 h-7 rounded-full bg-white text-[#56b532] flex items-center justify-center font-bold">
                      →
                    </div>
                  </Link>

                  {/* FOOTER */}
                  <div className="relative z-10 border-t border-white/10 mt-2 pt-2">

                    <p className="text-[#ffb648] text-lg font-bold">
                      Join 8,000+
                    </p>

                    <p className="text-white/70 text-sm mt-0">
                      Global Professionals
                    </p>

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
                fill="#f7f7f7"
                d="M0,64L80,69.3C160,75,320,85,480,85.3C640,85,800,75,960,69.3C1120,64,1280,64,1360,64L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"
              />
            </svg>

          </div>

        </div>

        {/* STATS SECTION */}
        <div className="relative z-20 -mt-16 px-4 md:px-10 lg:px-16 xl:px-24">

          <div className="max-w-[1350px] mx-auto bg-white rounded-[26px] shadow-[0_10px_40px_rgba(0,0,0,0.08)] border border-[#ececec] overflow-hidden">

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5">

              {[
                {
                  number: "150+",
                  title: "Expert Speakers",
                  color: "#265613",
                  image: "/images/advisiory/1.png",
                },
                {
                  number: "8,000+",
                  title: "Visitor / Delegates",
                  color: "#c6931f",
                  image: "/images/advisiory/2.png",
                },
                {
                  number: "1000+",
                  title: "Global Buyers",
                  color: "#3f7be0",
                  image: "/images/advisiory/3.png",
                },
                {
                  number: "10+",
                  title: "Years Legacy",
                  color: "#9d4edd",
                  image: "/images/advisiory/4.png",
                },
                {
                  number: "100+",
                  title: "Exhibitors",
                  color: "#27b0c8",
                  image: "/images/advisiory/5.png",
                },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-3 px-4 md:px-6 border-r border-[#ececec] last:border-r-0"
                >

                  {/* IMAGE */}
                  <div
                    className="w-20 h-20 bg-white flex items-center justify-center shrink-0 overflow-hidden p-2"
                    style={{
                      borderColor: item.color,
                    }}
                  >

                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-contain"
                    />

                  </div>

                  {/* TEXT */}
                  <div>

                    <h3
                      className="text-xl font-black"
                      style={{ color: item.color }}
                    >
                      {item.number}
                    </h3>

                    <p className="text-[#222] text-sm font-medium leading-6 mt-1">
                      {item.title}
                    </p>

                  </div>

                </div>
              ))}

            </div>

          </div>

        </div>

      </section>

      {/* MEMBERS SECTION */}
      {/* MEMBERS SECTION */}
      {/* MEMBERS SECTION */}
      <section className="py-4 bg-[#f7f7f7] px 12 lg:px-24">

        <div className="max-w-[1450px] mx-auto">

          {/* HEADING */}
          <div className="flex items-center justify-center gap-4 mb-8">

            <div className="w-16 h-[2px] bg-[#6fa83d]" />

            <h2 className="text-[18px] lg:text-[34px] font-black uppercase text-[#101828] tracking-tight">
              Our <span className="text-[#4d9b2e]">Advisory Board</span>
            </h2>

            <div className="w-16 h-[2px] bg-[#6fa83d]" />

          </div>

          {/* LOADER */}
          {isLoading ? (
            <div className="flex justify-center py-20">
              <div className="w-12 h-12 border-4 border-[#2f7d1d] border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : (
            <>
              {/* SINGLE ROW */}
              <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">

                {members.map((member, idx) => (
                  <motion.div
                    key={member._id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.4,
                      delay: idx * 0.04,
                    }}
                    className="min-w-[320px] max-w-[320px] bg-white border border-[#e5e7eb] rounded-[10px] overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 relative shrink-0"
                  >

                    {/* GREEN RIBBON */}
                    <div className="absolute top-0 right-2 z-20">

                      <div className="bg-[#4d9b2e] w-6 h-9 flex items-center justify-center relative">

                        <span className="text-white text-[11px]">
                          ★
                        </span>

                        <div className="absolute bottom-[-8px] left-0 w-0 h-0 border-l-[12px] border-r-[12px] border-t-[8px] border-l-transparent border-r-transparent border-t-[#4d9b2e]" />

                      </div>
                    </div>

                    {/* CARD BODY */}
                    <div className="flex gap-3 p-3">

                      {/* LEFT IMAGE */}
                      <div className="w-[100px] h-[250px] shrink-0 rounded-[6px] overflow-hidden bg-[#f3f3f3]">

                        <LazyLoadImage
                          src={`${SERVER_URL}${member.image}`}
                          alt={member.name}
                          effect="blur"
                          className="w-full h-full object-cover"
                        />

                      </div>

                      {/* RIGHT CONTENT */}
                      <div className="flex-1 flex flex-col h-[260px]">

                        {/* NAME */}
                        <h3 className="text-[18px] leading-[24px] font-black text-[#111827] mt-1">
                          {member.name}
                        </h3>

                        {/* ROLE */}
                        <p className="text-[#5ba234] text-[10px] font-bold uppercase tracking-wide mt-1">
                          {member.role}
                        </p>

                        {/* ORGANIZATION */}
                        <p className="text-[#444] text-[11px] leading-[16px] mt-2 font-medium">
                          {member.organization}
                        </p>

                        {/* GREEN LINE */}
                        <div className="w-10 h-[2px] bg-[#5ba234] mt-3 mb-3" />

                        {/* DESCRIPTION */}
                        <p className="text-[#555] text-[11px] leading-[18px] line-clamp-4">
                          {member.description ||
                            "Visionary leader and industry expert driving innovation and impactful transformation globally."}
                        </p>

                        {/* BUTTON */}
                        <button className="absolute bottom-5 border border-[#5ba234] hover:bg-[#5ba234] hover:text-white transition-all duration-300 text-[#2d6b18] text-[10px] font-bold px-3 py-2 rounded-[5px] flex items-center gap-2 w-fit">

                          VIEW PROFILE

                          <div className="w-4 h-4 rounded-full bg-[#5ba234] text-white flex items-center justify-center">
                            <ArrowRight size={10} />
                          </div>

                        </button>

                      </div>

                    </div>

                  </motion.div>
                ))}

              </div>

              {/* BOTTOM BUTTON */}
              {/* <div className="text-center mt-4 ">

          <button className="border border-[#5ba234] hover:bg-[#5ba234] hover:text-white transition-all duration-300 text-[#2d6b18] font-bold px-5 py-2 rounded-[6px] uppercase tracking-wide text-sm inline-flex items-center gap-3">

            VIEW ALL ADVISORY BOARD MEMBERS

            <div className="w-6 h-6 rounded-full bg-[#5ba234] text-white flex items-center justify-center">
              <ArrowRight size={13} />
            </div>

          </button>

        </div> */}
            </>
          )}
        </div>
      </section>

      {/* WHY JOIN */}
      <section className="pb-0 px-4 md:px-10 lg:px-16 xl:px-24">

        <div className="max-w-[1450px] mx-auto">

          <div className="bg-white border border-[#ececec] rounded-[14px] shadow-sm overflow-hidden">

            {/* HEADING */}
            <div className="pt-6 pb-5 text-center">

              <h2 className="text-[18px] md:text-[26px] font-black uppercase text-[#111827] tracking-tight">
                WHY JOIN AS AN ADVISORY BOARD MEMBER?
              </h2>

            </div>

            {/* ITEMS */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6">

              {[
                {
                  title: "Shape the Future",
                  desc: "Contribute to shaping the future of health & wellness.",
                  icon: <Users size={26} />,
                },
                {
                  title: "Expand Network",
                  desc: "Connect with global leaders and industry pioneers.",
                  icon: <Globe size={26} />,
                },
                {
                  title: "Influence Change",
                  desc: "Drive meaningful impact and positive change.",
                  icon: <TrendingUp size={26} />,
                },
                {
                  title: "Thought Leadership",
                  desc: "Position yourself as a thought leader in the industry.",
                  icon: <Briefcase size={26} />,
                },
                {
                  title: "Global Exposure",
                  desc: "Gain visibility across international platforms.",
                  icon: <Globe size={26} />,
                },
                {
                  title: "Exclusive Access",
                  desc: "Get exclusive access to events & opportunities.",
                  icon: <ArrowRight size={26} />,
                },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="relative text-center px-5 py-7 border-r border-[#ececec] last:border-r-0"
                >

                  {/* ICON */}
                  <div className="flex justify-center text-[#4d9b2e] mb-3">
                    {item.icon}
                  </div>

                  {/* TITLE */}
                  <h3 className="text-[14px] font-bold text-[#2f7d1d] leading-tight">
                    {item.title}
                  </h3>

                  {/* DESC */}
                  <p className="text-[#444] text-[11px] leading-[18px] mt-2">
                    {item.desc}
                  </p>

                </div>
              ))}

            </div>

          </div>
        </div>
      </section>
      {/* BOTTOM CTA SECTION */}
      <section className="px-4 md:px-10 lg:px-16 xl:px-24 pb-10 mt-2">

        <div className="max-w-[1450px] mx-auto">

          <div className="relative overflow-hidden rounded-[18px] bg-gradient-to-r from-[#02122b] via-[#041d3d] to-[#02122b] px-6 md:px-10 py-2">

            {/* CONTENT */}
            <div className="flex flex-col lg:flex-row items-center justify-between gap-6">

              {/* LEFT */}
              <div className="flex items-center gap-5">

                {/* ICON */}
                <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center shrink-0">


                  <img src="/images/2.png" />


                </div>

                {/* TEXT */}
                <div>

                  <h2 className="text-white text-xl md:text-2xl font-black uppercase leading-tight">
                    Join The League Of Visionaries
                  </h2>

                  <p className="text-white/80 text-sm md:text-lg mt-2 max-w-2xl">
                    Be a part of a mission to build a healthier,
                    happier and sustainable world.
                  </p>

                </div>

              </div>

              {/* RIGHT BUTTON */}
              <div className="flex flex-col items-center lg:items-end">

                <Link
                  to="/advisory"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#56b532] hover:bg-[#469629] transition-all duration-300 text-white font-black uppercase px-3 md:px-4 py-1 rounded-[10px] text-sm md:text-sm flex items-center gap-3 shadow-lg"
                >
                  Become An Advisory Board Member
                  <div className="w-7 h-7 rounded-full bg-white text-[#56b532] flex items-center justify-center font-bold">
                    →
                  </div>
                </Link>

                <p className="text-white/80 text-sm mt-4 text-center lg:text-right">
                  Collaborate. Contribute. Create Impact.
                </p>

              </div>

            </div>

            {/* OPTIONAL GLOW */}
            <div className="absolute -bottom-16 -right-16 w-56 h-56 bg-[#56b532]/20 blur-3xl rounded-full" />

          </div>

        </div>

      </section>
    </div>
  );
};

export default AdvisoryBoard;