import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { ShieldCheck, Download,PhoneCall,
  Mail,
  Globe,
  Send } from "lucide-react";
const sponsorCards = [
  {
    title: "TITLE SPONSOR",
    desc: "Maximum visibility & brand exclusivity",
    image: "/images/partnership/trophy.png",
    color: "blue",
  },
  {
    title: "POWERED BY SPONSOR",
    desc: "Align your brand as the power behind IHWE",
    image: "/images/partnership/saver.png",
    color: "green",
  },
  {
    title: "ASSOCIATE SPONSOR",
    desc: "High-impact visibility & brand recognition",
    image: "/images/partnership/associate.png",
    color: "blue",
  },
  {
    title: "CONFERENCE SPONSOR",
    desc: "Brand association with knowledge sessions",
    image: "/images/partnership/speaker.png",
    color: "green",
  },
  {
    title: "REGISTRATION SPONSOR",
    desc: "High brand recall at every entry point",
    image: "/images/partnership/reg.png",
    color: "blue",
  },
  {
    title: "LANYARD / BADGE SPONSOR",
    desc: "Put your brand around every neck",
    image: "/images/partnership/lanyard.png",
    color: "green",
  },
  {
    title: "WELLNESS ZONE SPONSOR",
    desc: "Showcase your brand in the wellness experience zone",
    image: "/images/partnership/wellness.png",
    color: "blue",
  },
  {
    title: "DIGITAL PROMOTION PARTNER",
    desc: "Expand your reach across digital platforms",
    image: "/images/partnership/digital.png",
    color: "green",
  },
];

const comparisonData = [
  {
    benefit: "Logo on all event branding",
    values: ["✔", "✔", "✔", "✔", "✔", "✔", "✔", "✔"],
  },
  {
    benefit: "Keynote / Speaking Opportunity",
    values: ["30 mins", "20 mins", "—", "—", "—", "—", "—", "—"],
  },
  {
    benefit: "Exhibition Space",
    values: ["12 sqm", "9 sqm", "6 sqm", "—", "—", "—", "2 sqm", "—"],
  },
  {
    benefit: "Ad in Souvenir",
    values: [
      "Full Page",
      "Half Page",
      "Half Page",
      "Listing",
      "Listing",
      "Listing",
      "Listing",
      "—",
    ],
  },
  {
    benefit: "Press Release Mentions",
    values: ["All", "Featured", "Featured", "—", "—", "—", "—", "—"],
  },
  {
    benefit: "Complimentary Delegate Passes",
    values: ["12", "8", "6", "4", "4", "2", "2", "—"],
  },
  {
    benefit: "VIP Lounge Access",
    values: ["✔", "✔", "✔", "✔", "✔", "✔", "✔", "—"],
  },
];
const Sponsership = () => {
    return (
        <div className="bg-[#f5f5f5] overflow-hidden">
            {/* SPONSOR HERO SECTION */}
            <section className="relative overflow-hidden bg-[#f5f9ff]">

                {/* HERO SECTION */}
                <div
                    className="relative min-h-[480px] bg-cover bg-center bg-no-repeat"
                    style={{
                        backgroundImage: "url('/images/sponsor/sponsor-hero.png')",
                    }}
                >

                    {/* CONTENT */}
                    <div className="relative z-20 max-w-[1450px] mx-auto px-4 md:px-10 lg:px-16 pt-12 lg:pt-20 pb-32">

                        <div className="grid lg:grid-cols-[1fr_0.95fr] gap-10 items-center">

                            {/* LEFT CONTENT */}
                            <div>

                                <p className="uppercase tracking-[3px] text-[#1E4D92] font-bold text-sm mb-3">
                                    Partner For Impact
                                </p>

                                <h1 className="text-[#0B2C66] text-5xl lg:text-7xl font-black leading-[0.95] uppercase">
                                    Sponsor
                                    <span className="block text-[#76B82A] mt-1">
                                        IHWE EXPO 2026
                                    </span>
                                </h1>

                                <p className="text-[#4B5563] text-[17px] leading-8 mt-6 max-w-[650px]">
                                    Position your brand at the forefront of the global health &
                                    wellness industry and connect with leaders, innovators and
                                    decision-makers.
                                </p>

                                {/* STATS */}
                                <div className="flex flex-wrap gap-8 mt-10">

                                    {[
                                        {
                                            number: "8,000+",
                                            label: "Visitors / Delagtes",
                                            icon: "/images/partnership/users.png",
                                        },
                                        {
                                            number: "1000+",
                                            label: "Global Buyers",
                                            icon: "/images/partnership/global.png",
                                        },
                                        {
                                            number: "150+",
                                            label: "Exhibitors",
                                            icon: "/images/partnership/exhibitors.png",
                                        },
                                        {
                                            number: "150+",
                                            label: "Speakers",
                                            icon: "/images/partnership/delegate.png",
                                        },
                                    ].map((item, idx) => (
                                        <div
                                            key={idx}
                                            className="flex items-center gap-3"
                                        >

                                            <div className="w-12 h-12 rounded-full bg-white shadow-md border border-[#E5E7EB] flex items-center justify-center shrink-0">

                                                <img
                                                    src={item.icon}
                                                    alt=""
                                                    className="w-10 h-10 object-contain"
                                                />

                                            </div>

                                            <div>

                                                <h4 className="text-[#0B2C66] font-bold text-[18px] leading-none">
                                                    {item.number}
                                                </h4>

                                                <p className="text-[#5E6472] text-[12px] mt-1">
                                                    {item.label}
                                                </p>

                                            </div>

                                        </div>
                                    ))}

                                </div>

                            </div>

                            {/* RIGHT SIDE */}
                            <div className="relative flex justify-end min-h-[400px]">

                                {/* FLOATING EVENT CARD */}
                                <div className="absolute bottom-[-40px] right-0 bg-[#032C69] text-white rounded-[24px] px-4 py-4 shadow-[0_20px_50px_rgba(0,0,0,0.25)] w-[340px] z-30">
                                   {[
                                        {
                                            label: "21 – 23 August 2026",
                                            icon: "/images/partnership/blue-calender.png",
                                        },
                                        {
                                            label: "Pragati Maidan\nNew Delhi, India",
                                            icon: "/images/partnership/location.png",
                                        },
                                        
                                    ].map((item, idx) => (
                                   
                                    <div key={idx} className="flex items-start gap-4 py-2">

                                        <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-xl shrink-0">
                                            <img
                                            src={item.icon}
                                            alt=""
                                            className="w-full h-full object-contain"
                                        />
                                        </div>

                                        <div>

                                            <h4 className="font-bold text-[18px] leading-tight pt-1">
                                                {item.label}
                                            </h4>

                                        </div>

                                    </div>
                                    ))}
                                    
                                    

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

                {/* WHY SPONSOR SECTION */}
                <div className="relative z-20 -mt-20 px-6 md:px-16 lg:px-24 pb-8">

                    <div className="max-w-[1450px] mx-auto bg-white rounded-[26px] border border-[#E7EAF0] shadow-[0_15px_60px_rgba(0,0,0,0.06)] overflow-hidden">

                        {/* HEADING */}
                        <div className="flex items-center justify-center gap-5 pt-3">

                            <div className="w-16 h-[2px] bg-[#76B82A]"></div>

                            <h2 className="text-[#0B2C66] text-[24px] font-black uppercase text-center">
                                Why Sponsor IHWE Expo 2026?
                            </h2>

                            <div className="w-16 h-[2px] bg-[#76B82A]"></div>

                        </div>

                        {/* FEATURES */}
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6">

                            {[
                                {
                                    title: "Increase Brand Visibility",
                                    desc: "Showcase your brand to a highly targeted audience.",
                                    icon: "/images/partnership/social.png",
                                },
                                {
                                    title: "Network with Key Leaders",
                                    desc: "Connect with industry leaders & innovators.",
                                    icon: "/images/partnership/network.png",
                                },
                                {
                                    title: "Generate Quality Leads",
                                    desc: "Engage with clients, partners & investors.",
                                    icon: "/images/partnership/leads.png",
                                },
                                {
                                    title: "Thought Leadership",
                                    desc: "Position your organization as an industry leader.",
                                    icon: "/images/partnership/idea.png",
                                },
                                {
                                    title: "Exclusive Privileges",
                                    desc: "Enjoy VIP access & premium brand exposure.",
                                    icon: "/images/partnership/diamond.png",
                                },
                                {
                                    title: "Drive Business Growth",
                                    desc: "Expand globally with meaningful partnerships.",
                                    icon: "/images/partnership/grow.png",
                                },
                            ].map((item, idx) => (
                                <div
                                    key={idx}
                                    className="text-center px-4 py-4 border-r border-b lg:border-b-0 border-[#ECECEC] last:border-r-0"
                                >

                                    <div className="w-16 h-16 mx-auto flex items-center justify-center">

                                        <img
                                            src={item.icon}
                                            alt=""
                                            className="w-full h-full object-contain"
                                        />

                                    </div>

                                    <h4 className="text-[#0B2C66] text-[16px] font-bold leading-2 mt-3">
                                        {item.title}
                                    </h4>

                                    <p className="text-[#5E6472] text-[14px] leading-6 mt-1">
                                        {item.desc}
                                    </p>

                                </div>
                            ))}

                        </div>

                    </div>

                </div>

            </section>
            <section className="w-full bg-white py-4 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        {/* ================= HEADING ================= */}
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-[#173A72] uppercase">
            Sponsorship Opportunities
          </h2>
        </div>

        {/* ================= SPONSOR CARDS ================= */}
        <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-8 gap-4">
          {sponsorCards.map((item, index) => (
            <div
              key={index}
              className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm hover:shadow-lg transition-all duration-300 text-center"
            >
              {/* IMAGE */}
              <div className="w-16 h-16 mx-auto flex items-center justify-center">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-14 h-14 object-contain"
                />
              </div>

              {/* TITLE */}
              <h3
                className={`mt-4 text-[13px] font-bold leading-5 ${
                  item.color === "blue"
                    ? "text-[#173A72]"
                    : "text-[#1F8A4C]"
                }`}
              >
                {item.title}
              </h3>

              {/* DESCRIPTION */}
              <p className="text-[11px] text-gray-600 mt-2 leading-5">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        {/* ================= INFO BAR ================= */}
        <div className="mt-8 mx-6 bg-[#F3F7FD] border border-[#DCE6F8] rounded-2xl px-6 py-5 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">
          {/* LEFT */}
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
              <ShieldCheck className="text-blue-700 w-6 h-6" />
            </div>

            <div>
              <h4 className="font-bold text-[#173A72] text-sm uppercase">
                Limited Sponsorship Slots Available
              </h4>

              <p className="text-sm text-gray-600">
                Secure your category before it’s gone!
              </p>
            </div>
          </div>

          {/* RIGHT */}
          <div className="text-sm text-gray-600">
            Featured sponsors get exclusive media coverage & brand promotions.
          </div>
        </div>

        {/* ================= COMPARISON TABLE ================= */}
        <div className="mt-8">
          <div className="text-center mb-2">
            <h2 className="text-sm md:text-2xl font-bold text-[#173A72] uppercase">
              Sponsorship Benefits Comparison
            </h2>
          </div>

          <div className="overflow-x-auto border border-gray-200 rounded-2xl shadow-sm">
            <table className="w-full min-w-[1200px] border-collapse">
              {/* TABLE HEADER */}
              <thead>
                <tr>
                  <th className="bg-[#173A72] text-white p-4 text-left text-sm font-semibold">
                    BENEFITS
                  </th>

                  {sponsorCards.map((item, index) => (
                    <th
                      key={index}
                      className={`p-2 text-white text-sm font-medium ${
                        item.color === "blue"
                          ? "bg-[#025cb4]"
                          : "bg-[#05803f]"
                      }`}
                    >
                      <div className="flex flex-col items-center gap-2">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-8 h-8 object-contain brightness-0 invert"
                        />

                        <span>{item.title}</span>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>

              {/* TABLE BODY */}
              <tbody>
                {comparisonData.map((row, idx) => (
                  <tr
                    key={idx}
                    className="border-b border-gray-200 hover:bg-gray-50"
                  >
                    <td className="p-2 text-sm font-medium text-gray-600 bg-gray-50">
                      {row.benefit}
                    </td>

                    {row.values.map((value, i) => (
                      <td
                        key={i}
                        className="p-4 text-center text-sm text-gray-700"
                      >
                        {value}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* ================= CTA BOX ================= */}
          <div className="mt-8 flex flex-col lg:flex-row items-center justify-between gap-5 bg-[#F8FAFC] border border-gray-200 rounded-2xl px-6 py-5">
            <div>
              <h4 className="font-bold text-[#173A72]">
                Custom sponsorship packages are also available.
              </h4>

              <p className="text-sm text-gray-600 mt-1">
                Let’s create something impactful together!
              </p>
            </div>

            <button className="flex items-center gap-2 bg-white border border-[#173A72] text-[#173A72] px-6 py-3 rounded-xl font-semibold hover:bg-[#173A72] hover:text-white transition-all duration-300">
              <Download size={18} />
              DOWNLOAD SPONSORSHIP BROCHURE
            </button>
          </div>
        </div>
      </div>
    </section>
     <section className="w-full bg-[#f5f7fb] py-2 px-4">
  <div className="max-w-7xl mx-auto">

    {/* MAIN WRAPPER */}
    <div className="grid grid-cols-1 lg:grid-cols-[380px_1fr] overflow-hidden rounded-[24px] shadow-[0_10px_40px_rgba(0,0,0,0.08)]">

      {/* LEFT SECTION */}
      <div
        className="relative min-h-[420px] bg-cover bg-center bg-no-repeat p-8 md:p-10 flex items-center"
        style={{
          backgroundImage:
            "url('/images/partnership/pattern.png')",
        }}
      >

        
        {/* CONTENT */}
        <div className="relative z-10 max-w-[320px]">

          <h2 className="text-white text-[20px] md:text-[28px] font-extrabold leading-[1.1]">
            READY TO PARTNER <br />
            <span className="text-[#d9ff61]">WITH US?</span>
          </h2>

          <p className="text-white/90 text-[15px] leading-7 mt-5">
            Fill out the form and our team will
            get in touch with you shortly.
          </p>

          {/* CONTACT INFO */}
          <div className="flex flex-col gap-5 mt-8">

            {/* PHONE */}
            <div className="flex items-center gap-4 text-white">

              <div className="w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center shrink-0">
                <PhoneCall size={18} />
              </div>

              <a
                href="tel:+919654900525"
                className="text-[16px] font-medium"
              >
                +91 9654900525
              </a>
            </div>

            {/* EMAIL */}
            <div className="flex items-center gap-4 text-white">

              <div className="w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center shrink-0">
                <Mail size={18} />
              </div>

              <a
                href="mailto:info@ihwe.in"
                className="text-[16px] font-medium"
              >
                info@ihwe.in
              </a>
            </div>

            {/* WEBSITE */}
            <div className="flex items-center gap-4 text-white">

              <div className="w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center shrink-0">
                <Globe size={18} />
              </div>

              <a
                href="https://www.ihwe.in"
                target="_blank"
                className="text-[16px] font-medium"
              >
                www.ihwe.in
              </a>
            </div>

          </div>
        </div>

      </div>

      {/* RIGHT FORM SECTION */}
      <div className="bg-white p-6 md:p-8 lg:p-10">

        <form>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

            {/* FULL NAME */}
            <div className="flex flex-col">
              <label className="text-[14px] font-semibold text-[#1c2b4a] mb-2">
                Full Name *
              </label>

              <input
                type="text"
                placeholder="Enter full name"
                className="h-[54px] border border-[#d7dce5] rounded-[10px] px-4 outline-none focus:border-[#0d9448]"
              />
            </div>

            {/* COMPANY NAME */}
            <div className="flex flex-col">
              <label className="text-[14px] font-semibold text-[#1c2b4a] mb-2">
                Company Name *
              </label>

              <input
                type="text"
                placeholder="Enter company name"
                className="h-[54px] border border-[#d7dce5] rounded-[10px] px-4 outline-none focus:border-[#0d9448]"
              />
            </div>

            {/* EMAIL */}
            <div className="flex flex-col">
              <label className="text-[14px] font-semibold text-[#1c2b4a] mb-2">
                Email Address *
              </label>

              <input
                type="email"
                placeholder="Enter email address"
                className="h-[54px] border border-[#d7dce5] rounded-[10px] px-4 outline-none focus:border-[#0d9448]"
              />
            </div>

            {/* PHONE */}
            <div className="flex flex-col">
              <label className="text-[14px] font-semibold text-[#1c2b4a] mb-2">
                Phone Number *
              </label>

              <div className="flex gap-2">

                <select className="w-[105px] h-[54px] border border-[#d7dce5] rounded-[10px] px-3 outline-none">
                  <option>🇮🇳 +91</option>
                </select>

                <input
                  type="text"
                  placeholder="Enter phone number"
                  className="flex-1 h-[54px] border border-[#d7dce5] rounded-[10px] px-4 outline-none focus:border-[#0d9448]"
                />
              </div>
            </div>

            {/* CATEGORY */}
            <div className="flex flex-col">
              <label className="text-[14px] font-semibold text-[#1c2b4a] mb-2">
                Interested Sponsorship Category *
              </label>

              <select className="h-[54px] border border-[#d7dce5] rounded-[10px] px-4 outline-none focus:border-[#0d9448]">
                <option>Select a category</option>
              </select>
            </div>

            {/* MESSAGE */}
            <div className="flex flex-col">
              <label className="text-[14px] font-semibold text-[#1c2b4a] mb-2">
                Message (Optional)
              </label>

              <textarea
                placeholder="Tell us about your sponsorship goals..."
                className="h-[54px] border border-[#d7dce5] rounded-[10px] px-4 pt-3 resize-none outline-none focus:border-[#0d9448]"
              ></textarea>
            </div>

          </div>

          {/* BUTTON */}
          <button
            type="submit"
            className="w-full h-[58px] bg-[#0d9448] hover:bg-[#087539] transition-all duration-300 rounded-[10px] text-white text-[18px] font-bold mt-7 flex items-center justify-center gap-3"
          >
            <Send size={20} />
            SUBMIT ENQUIRY
          </button>

        </form>
      </div>

    </div>
  </div>
</section>
        </div>
    )
}

export default Sponsership