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
import SectionContainer from "@/components/layout/SectionContainer";

const AdvisoryBoard = () => {
  const [heroData, setHeroData] = useState<any>(null);
  const [members, setMembers] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [visibleRows, setVisibleRows] = useState(2);
  const itemsPerRow = 6;
  const visibleMembers = members.slice(0, visibleRows * itemsPerRow);
  const hasMore = visibleRows * itemsPerRow < members.length;

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
          className="relative min-h-[500px] bg-cover bg-center"
          style={{
            backgroundImage: heroData?.backgroundImage
              ? `url(${SERVER_URL}${heroData.backgroundImage})`
              : `url(${heroImgFallback})`,
          }}
        >


          {/* CONTENT */}
          <SectionContainer className="relative z-10 px-4 pt-20">

            <div className="grid lg:grid-cols-[65%_35%] gap-4 items-center">

              {/* LEFT SIDE */}
              <div className="">

                {/* TAG */}
                <div className="mb-4">
                  <p className="uppercase tracking-[4px] text-[#23471d] font-bold text-base">
                    Experts. Leaders. Visionaries.
                  </p>
                  <div className="w-10 h-[2px] bg-[#23471d] mt-2" />
                </div>

                {/* TITLE */}

                <h1 className="text-xl md:text-5xl font-black leading-[0.95] uppercase">

                  <span className="text-[#0d1f3c]">Advisory</span>

                  <span
                    className="block mt-1"
                    style={{
                      background: "linear-gradient(90deg, #1a4a1a 0%, #2d6b2d 40%, #7dc142 100%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    Board Members
                  </span>

                </h1>

                {/* DESC */}
                <p className="text-gray-700 text-[17px] leading-1 mt-8 max-w-[430px]">

                  Meet the distinguished leaders and professionals
                  shaping the strategic direction of
                  <span className="text-[#6fce3d] font-bold">
                    {" "}IHWE Expo 2026.
                  </span>

                </p>
                {/* BUTTON */}
                <Link
                  to="/advisory"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-fit ml-32 inline-block mt-10 bg-green-800 hover:bg-green-900 transition-all duration-300 text-white font-semibold uppercase px-4 py-2 rounded flex items-center gap-3 shadow-lg"
                >
                  Register Now
                  <div className="w-7 h-7 rounded-full bg-white text-[#56b532] flex items-center justify-center font-bold">
                    →
                  </div>
                </Link>
              </div>
            </div>
          </SectionContainer>
        </div>
      </section>

      {/* charman section  */}
      <section className="relative py-6 overflow-hidden">

        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#eaf3f0] via-[#f0f7f4] to-[#ddeee8]" />
        <div className="absolute inset-0 opacity-[0.1] bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url("/advisory/bg.png")` }} />

        <SectionContainer className="relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr_210px] gap-8 items-center">

            {/* ── LEFT: Photo Card — exact image match ── */}
            <div className="relative w-[220px] h-[290px] flex-shrink-0">

              {/* Light green bg block */}
              <div className="absolute top-[10px] left-[10px] right-0 bottom-0 bg-[#d4edcc] rounded-[18px] z-0" />

              {/* Dark green LEFT vertical bar */}
              <div className="absolute top-[10px] left-0 w-[13px] bottom-[28px] bg-gradient-to-b from-[#2d6b2d] to-[#4a9e2a] rounded-l-lg z-[2]" />

              {/* Dark green BOTTOM horizontal bar */}
              <div className="absolute bottom-[14px] left-0 right-[10px] h-[13px] bg-gradient-to-r from-[#2d6b2d] to-[#4a9e2a] rounded-b-lg z-[2]" />

              {/* Photo */}
              <div className="absolute top-[10px] left-[13px] right-0 bottom-[27px] rounded-[14px] overflow-hidden z-[1]">
                <img
                  src="/advisory/chef1.png"
                  alt="Dr. Randeep Guleria"
                  className="w-full h-full object-cover object-top"
                />
              </div>

            </div>

            {/* ── MIDDLE: Text Content ── */}
            <div className="space-y-5 px-2">

              <div>
                <p className="uppercase tracking-[3px] text-[#23471d] font-bold text-[11px] mb-2">
                  Chairman's Message
                </p>
                <div className="w-8 h-[2px] bg-[#23471d]" />
              </div>

              <h2 className="text-3xl font-black text-[#0d1f3c] leading-tight">
                Leading Together for a <br />Healthier Tomorrow
              </h2>

              <p className="text-slate-500 text-[14px] leading-relaxed">
                At IHWE Expo 2026, our Advisory Board plays a pivotal role in driving our mission
                forward. Their expertise, global perspective, and commitment to innovation guide us
                in creating a world-class platform that empowers the health and wellness ecosystem.
              </p>

              <div className="pt-2">
                <p className="font-[Brush_Script_MT,cursive] text-2xl text-slate-600 italic mb-3 tracking-wide">
                  Randeep Guleria
                </p>
                <p className="text-[#23471d] font-bold text-sm">Dr. Randeep Guleria</p>
                <p className="text-slate-400 text-xs tracking-wide">Chairman, IHWE Expo 2026</p>
              </div>

            </div>

            {/* ── RIGHT: Vision Card ── */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-slate-100 shadow-lg p-6 space-y-4">

              <div className="w-11 h-11 rounded-xl bg-[#23471d]/10 flex items-center justify-center">
                <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none">
                  <path d="M17 20H7M12 4C9.8 4 8 5.8 8 8s1.8 4 4 4 4-1.8 4-4-1.8-4-4-4zM4 20c0-3.3 3.6-6 8-6s8 2.7 8 6"
                    stroke="#23471d" strokeWidth="2" strokeLinecap="round" />
                  <circle cx="5" cy="10" r="2.5" stroke="#23471d" strokeWidth="1.5" />
                  <circle cx="19" cy="10" r="2.5" stroke="#23471d" strokeWidth="1.5" />
                </svg>
              </div>

              <div className="border-l-[3px] border-[#23471d] pl-4 space-y-2">
                <p className="text-[10px] font-black uppercase tracking-widest text-[#23471d]">Vision</p>
                <p className="text-[#434B54] font-medium text-sm leading-snug">
                  A global platform for collaboration, innovation and impact in health & wellness.
                </p>
              </div>

            </div>

          </div>
        </SectionContainer>

      </section>

      {/* MEMBERS SECTION */}
      <section className="py-4 bg-[#f7f7f7] ">
        <SectionContainer className="">

          {/* HEADING */}
          <div className="flex items-center justify-center gap-4">
            <div className="w-12 h-[2px] bg-[#23471d]" />
            <h2 className="text-[20px] lg:text-2xl font-semibold uppercase text-[#101828] tracking-tight text-center">
              Our <span className="">Esteemed Advisory Board</span>
            </h2>
            <div className="w-12 h-[2px] bg-[#23471d]" />
          </div>

          {/* LOADER */}
          {isLoading ? (
            <div className="flex justify-center py-20">
              <div className="w-12 h-12 border-4 border-[#2f7d1d] border-t-transparent rounded-full animate-spin" />
            </div>
          ) : (
            <>
              {/* GRID — 6 per row */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mt-4">
                {visibleMembers.map((member, idx) => (
                  <motion.div
                    key={member._id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.35, delay: idx * 0.03 }}
                    className="bg-white border border-[#e5e7eb] rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col"
                  >
                    {/* IMAGE */}
                    <div className="w-full h-[160px] bg-[#f3f4f6] overflow-hidden">
                      <LazyLoadImage
                        src={`${SERVER_URL}${member.image}`}
                        alt={member.name}
                        effect="blur"
                        className="w-full h-full object-cover object-top"
                      />
                    </div>

                    {/* CONTENT */}
                    <div className="p-3 flex flex-col flex-1">

                      {/* NAME */}
                      <h3 className="text-[13px] font-black text-[#111827] leading-tight mb-1">
                        {member.name}
                      </h3>

                      {/* ROLE */}
                      <p className="text-[#5ba234] text-[9px] font-bold uppercase tracking-wide mb-1">
                        {member.role}
                      </p>

                      {/* ORGANIZATION */}
                      <p className="text-[#666] text-[10px] leading-[14px] mb-2">
                        {member.organization}
                      </p>

                      {/* GREEN LINE */}
                      <div className="w-8 h-[2px] bg-[#5ba234] mb-2" />

                      {/* COUNTRY FLAG */}
                      <div className="flex items-center gap-1 mb-3">
                        <img
                          src={member.country?.toLowerCase() === 'usa' ? '/images/usa-flag.png' : '/images/india-flag.png'}
                          alt={member.country || 'India'}
                          className="w-5 h-3 object-cover rounded-sm"
                        />
                        <span className="text-[10px] text-[#666]">{member.country || 'India'}</span>
                      </div>

                      {/* BUTTON */}
                      <div className="mt-auto flex items-center gap-2">
                        <button className="border border-[#5ba234] hover:bg-[#5ba234] hover:text-white transition-all duration-200 text-[#2d6b18] text-[9px] font-bold px-2.5 py-1.5 rounded-[5px] flex items-center gap-1.5">
                          VIEW PROFILE
                          <div className="w-3.5 h-3.5 rounded-full bg-[#5ba234] text-white flex items-center justify-center">
                            <ArrowRight size={8} />
                          </div>
                        </button>

                        {/* LinkedIn icon */}
                        <a href={member.linkedin || '#'} target="_blank" rel="noreferrer"
                          className="w-6 h-6 rounded-full bg-[#0077b5] flex items-center justify-center hover:scale-110 transition-transform">
                          <svg viewBox="0 0 24 24" className="w-3 h-3 fill-white">
                            <path d="M19 3A2 2 0 0 1 21 5V19A2 2 0 0 1 19 21H5A2 2 0 0 1 3 19V5A2 2 0 0 1 5 3H19M18.5 18.5V13.2A3.26 3.26 0 0 0 15.24 9.94C14.39 9.94 13.4 10.46 12.92 11.24V10.13H10.13V18.5H12.92V13.57A1.46 1.46 0 0 1 14.38 12.11A1.46 1.46 0 0 1 15.84 13.57V18.5H18.5M6.88 8.56A1.68 1.68 0 0 0 8.56 6.88C8.56 5.95 7.81 5.19 6.88 5.19A1.69 1.69 0 0 0 5.19 6.88C5.19 7.81 5.95 8.56 6.88 8.56M8.27 18.5V10.13H5.5V18.5H8.27Z" />
                          </svg>
                        </a>
                      </div>

                    </div>
                  </motion.div>
                ))}
              </div>

              {/* VIEW ALL BUTTON */}
              <div className="text-center mt-8">
                {hasMore ? (
                  <button
                    onClick={() => setVisibleRows(prev => prev + 1)}
                    className="border border-[#5ba234] hover:bg-[#5ba234] hover:text-white transition-all duration-300 text-[#2d6b18] font-bold px-6 py-1.5 rounded-full uppercase tracking-wide text-sm inline-flex items-center gap-3 bg-white shadow-sm"
                  >
                    VIEW ALL ADVISORY BOARD MEMBERS
                    <div className="w-6 h-6 rounded-full bg-[#5ba234] text-white flex items-center justify-center">
                      <ArrowRight size={13} />
                    </div>
                  </button>
                ) : (
                  <button
                    onClick={() => setVisibleRows(2)}
                    className="border border-slate-300 hover:border-[#5ba234] transition-all duration-300 text-slate-500 hover:text-[#2d6b18] font-bold px-6 py-1.5 rounded-full uppercase tracking-wide text-sm inline-flex items-center gap-3 bg-white shadow-sm"
                  >
                    SHOW LESS
                    <div className="w-6 h-6 rounded-full bg-slate-200 text-slate-500 flex items-center justify-center rotate-180">
                      <ArrowRight size={13} />
                    </div>
                  </button>
                )}
              </div>
            </>
          )}
        </SectionContainer>
      </section>

      {/* why join new  */}
      <section className="py-12 bg-[#f4f6f3] relative overflow-hidden">

        {/* DNA bg watermark */}
        <div className="absolute right-0 top-0 h-full w-64 opacity-[0.04] pointer-events-none"
          style={{ backgroundImage: `url("/advisory/dna-bg.png")`, backgroundSize: "cover" }} />

        <SectionContainer className=" space-y-4">

          {/* ── ROW 1: Why Join + 4 cards ── */}
          <div className="flex w-full gap-6 items-start">

            {/* Left: Why Join text */}
            <div className="w-[30%] space-y-3">
              <p className="text-[11px] font-bold uppercase tracking-[3px] text-[#5ba234]">Why Join</p>
              <h2 className="text-[26px] font-black text-[#0d1f3c] uppercase leading-tight">
                The Advisory Board?
              </h2>
              <div className="flex items-center gap-2">
                <div className="w-10 h-[3px] bg-[#5ba234] rounded-full" />
                <div className="w-2 h-2 rounded-full bg-[#5ba234]" />
              </div>
              <p className="text-[13px] text-[#555] leading-relaxed pt-1">
                Be at the forefront of transformation in the health & wellness industry.
              </p>
            </div>

            {/* Right: 4 feature cards */}
            <div className="w-[65%] grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                {
                  icon: <svg viewBox="0 0 24 24" className="w-7 h-7" fill="none" stroke="#23471d" strokeWidth="1.5"><circle cx="12" cy="12" r="10" /><path d="M12 6v2M12 16v2M8 12H6M18 12h-2" /><path d="M12 8a4 4 0 1 1 0 8 4 4 0 0 1 0-8z" /></svg>,
                  title: "Shape the Future",
                  desc: "Contribute to policies, initiatives and global health conversations."
                },
                {
                  icon: <svg viewBox="0 0 24 24" className="w-7 h-7" fill="none" stroke="#23471d" strokeWidth="1.5"><path d="M17 20H7M12 4C9.8 4 8 5.8 8 8s1.8 4 4 4 4-1.8 4-4-1.8-4-4-4z" /><path d="M4 20c0-3.3 3.6-6 8-6s8 2.7 8 6" /><circle cx="5" cy="10" r="2" /><circle cx="19" cy="10" r="2" /></svg>,
                  title: "Global Influence",
                  desc: "Engage with leaders and experts from across the world."
                },
                {
                  icon: <svg viewBox="0 0 24 24" className="w-7 h-7" fill="none" stroke="#23471d" strokeWidth="1.5"><path d="M11 5H6a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2v-5" /><path d="M17 3l4 4-9 9H8v-4l9-9z" /></svg>,
                  title: "Thought Leadership",
                  desc: "Position yourself as a trusted voice in the health & wellness sector."
                },
                {
                  icon: <svg viewBox="0 0 24 24" className="w-7 h-7" fill="none" stroke="#23471d" strokeWidth="1.5"><path d="M9 12l2 2 4-4" /><path d="M20.618 5.984A11.955 11.955 0 0 1 12 2.944a11.955 11.955 0 0 1-8.618 3.04A12.02 12.02 0 0 0 3 9c0 5.591 3.824 10.29 9 11.622C17.176 19.29 21 14.591 21 9a12.02 12.02 0 0 0-.382-3.016z" /></svg>,
                  title: "Drive Impact",
                  desc: "Support innovation, collaboration and meaningful change."
                },
              ].map((item, i) => (
                <div key={i} className="bg-white rounded-2xl p-5 shadow-sm border border-[#e8ede6] hover:shadow-md transition-all duration-300 flex flex-col gap-3">
                  <div className="w-14 h-14 rounded-full bg-[#f0f7eb] border border-[#d4edcc] flex items-center justify-center">
                    {item.icon}
                  </div>
                  <h3 className="text-[14px] font-bold text-[#23471d] leading-tight">{item.title}</h3>
                  <p className="text-[12px] text-[#666] leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* ── ROW 2: Nominate Banner ── */}
          <div className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-[#1a4d1a] via-[#23471d] to-[#2d6b2d] min-h-[220px] flex items-center">

            {/* Mesh/hex bg pattern */}
            <div className="absolute inset-0 opacity-20"
              style={{
                backgroundImage: `radial-gradient(circle at 20% 50%, #4a9e2a 0%, transparent 50%), radial-gradient(circle at 80% 20%, #7dc142 0%, transparent 40%)`,
              }}
            />
            <div className="absolute inset-0 opacity-10"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0l30 17.3v34.6L30 69.3 0 51.9V17.3z' fill='none' stroke='%23ffffff' stroke-width='0.5'/%3E%3C/svg%3E")`,
                backgroundSize: "60px 60px"
              }}
            />

            {/* Left text */}
            <div className="relative z-10 px-10 py-8 flex-1">
              <p className="text-[11px] font-bold uppercase tracking-[3px] text-[#d6ff63] mb-3">
                Know an Inspiring Leader?
              </p>
              <h2 className="text-[36px] font-black text-white uppercase leading-none mb-4">
                Nominate For<br />Advisory Board
              </h2>
              <p className="text-[14px] text-white/70 mb-6 max-w-md leading-relaxed">
                Help us bring the right leaders together to create a healthier world.
              </p>
              <button className="bg-white text-[#23471d] font-black text-[11px] uppercase tracking-widest px-6 py-3 rounded-full flex items-center gap-3 hover:bg-[#d6ff63] transition-all duration-300 w-fit shadow-lg">
                Nominate Now
                <div className="w-7 h-7 rounded-full bg-[#23471d] text-white flex items-center justify-center">
                  <ArrowRight size={14} />
                </div>
              </button>
            </div>

            {/* Right image */}
            <div className="hidden md:block absolute right-0 bottom-0 h-full w-[420px] pointer-events-none">
              <img
                src="/advisory/last1.png"
                alt="Nominate"
                className="h-full w-full object-contain object-right-bottom"
              />
            </div>
          </div>

          {/* ── ROW 3: Register CTA strip ── */}
          <div className="bg-white rounded-2xl border border-[#e5e7eb] shadow-sm px-8 py-2 flex flex-col sm:flex-row items-center gap-6 justify-between">

            {/* Left */}
            <div className="flex items-center gap-5">
              <div className="w-14 h-14 rounded-full bg-[#f0f7eb] border border-[#d4edcc] flex items-center justify-center shrink-0">
                <svg viewBox="0 0 24 24" className="w-7 h-7" fill="none" stroke="#23471d" strokeWidth="1.5">
                  <path d="M17 20H7M12 4C9.8 4 8 5.8 8 8s1.8 4 4 4 4-1.8 4-4-1.8-4-4-4z" />
                  <path d="M4 20c0-3.3 3.6-6 8-6s8 2.7 8 6" />
                  <circle cx="5" cy="10" r="2" /><circle cx="19" cy="10" r="2" />
                </svg>
              </div>
              <div>
                <h3 className="text-[16px] font-bold text-[#0d1f3c]">Be Part of a Visionary Network</h3>
                <p className="text-[13px] text-[#666]">Connect with leaders and drive meaningful change in the health & wellness ecosystem.</p>
              </div>
            </div>

            {/* Right: Button */}
            <button className="bg-[#e8711a] hover:bg-[#d26019] text-white font-black text-[12px] uppercase tracking-widest px-8 py-2 rounded-full flex items-center gap-3 transition-all duration-300 shrink-0 shadow-lg hover:shadow-[#e8711a]/30 hover:-translate-y-0.5">
              Register Now
              <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center">
                <ArrowRight size={14} />
              </div>
            </button>
          </div>

        </SectionContainer>
      </section>
    </div>
  );
};

export default AdvisoryBoard;