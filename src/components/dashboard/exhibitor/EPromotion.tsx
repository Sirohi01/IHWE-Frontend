import { useEffect, useState } from "react";
import { ePromotionPackagesApi } from "@/lib/api";
import bg222 from "@/assets/222.webp";

const testimonials = [
  {
    text: "IHWE digital promotion helped us reach the right audience before the event. We generated quality leads even before the exhibition started.",
    name: "Exhibitor, IHWE 2025",
  },
  {
    text: "The email campaigns and social media promotions gave our brand excellent visibility across the industry.",
    name: "Marketing Partner",
  },
  {
    text: "We received strong visitor engagement and genuine business inquiries through the online promotion package.",
    name: "International Exhibitor",
  },
];

export default function EPromotion({ data }: any) {
  const [active, setActive] = useState(0);
  const [packages, setPackages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const data = await ePromotionPackagesApi.getAll();
        setPackages(data);
      } catch (error) {
        console.error("Error fetching packages:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPackages();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActive((prev) => (prev + 1) % testimonials.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-5 bg-white">
      {/* ... rest of the component remains similar but cards will be dynamic ... */}

      {/* INTRO */}
      <div className="w-full -mt-1.5">
          <div className="w-full relative flex flex-col justify-center rounded-none">
              <img loading="lazy" decoding="async" src={bg222} 
                  alt="E-Promotion Banner" 
                  className="w-full h-[100px] md:h-[120px] lg:h-[140px] object-cover object-center rounded-none"
              />
          </div>
      </div>

      {/* WHY */}
      {/* WHY E-PROMOTION */}
      <section className="bg-gray-100 py-1 px-8 rounded-xl">
        <h3 className="text-center font-semibold text-lg text-green-900 mb-2">
          WHY E-PROMOTION?
        </h3>

        <div className="flex flex-wrap md:flex-nowrap items-center justify-between divide-y md:divide-y-0 md:divide-x divide-gray-300 bg-white rounded-lg shadow-sm">

          {[
            {
              text: "Reach 20,000+ Trade Visitors Before Event",
              icon: "/images/5.webp",
            },
            {
              text: "Targeted B2B & B2C Audience",
              icon: "/images/6.webp",
            },
            {
              text: "Build Brand Recall Before the Exhibition",
              icon: "/images/7.webp",
            },
            {
              text: "Generate Pre-qualified Leads & Business Opportunities",
              icon: "/images/8.webp",
            },
            {
              text: "Maximize ROI from Your Participation",
              icon: "/images/icon1.png",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="flex items-center gap-3 p-4 flex-1 min-w-[200px]"
            >
              {/* ICON */}
              <img loading="lazy" decoding="async" src={item.icon}
                className="w-10 h-10 object-contain"
                alt="icon"
              />

              {/* TEXT */}
              <p className="text-gray-700 text-sm leading-snug">
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </section>
      <section className="px-4 py-4 bg-[#f5f7f6]">
        <h4 className="text-center text-xl md:text-2xl font-bold text-gray-800 mb-4">
          CHOOSE YOUR E-PROMOTION PACKAGE
        </h4>

        <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto px-4">
          {loading ? (
            <div className="col-span-3 text-center py-10">Loading packages...</div>
          ) : (
            packages.map((pkg, index) => (
              <div
                key={pkg._id || index}
                className={`bg-white rounded-2xl shadow-sm overflow-hidden border flex flex-col relative`}
                style={{ borderColor: pkg.borderColor }}
              >
                {pkg.badgeText && (
                  <span className="absolute top-0 left-1/2 -translate-x-1/2 bg-[#e8a415] text-white text-xs px-4 py-1 rounded-b-lg font-semibold z-10">
                    {pkg.badgeText}
                  </span>
                )}

                {/* HEADER IMAGE */}
                <div
                  className="h-40 bg-cover bg-center flex items-end p-5"
                  style={{ backgroundImage: `url('${pkg.backgroundImage}')` }}
                >
                  <div>
                    <h4 className={`text-lg font-bold ${pkg.textColor || 'text-green-800'}`}>
                      {pkg.title.split('<br />').map((line, i) => (
                        <span key={i}>{line}<br /></span>
                      ))}
                    </h4>
                    <p className="text-sm text-gray-700 font-semibold">
                      {pkg.subtitle}
                    </p>
                    <p className={`text-3xl font-bold ${pkg.priceColor || 'text-green-800'} mt-2`}>
                      ₹ {pkg.price.toLocaleString()} <span className="text-sm text-gray-400">{pkg.gstText}</span>
                    </p>
                  </div>
                </div>

                {/* CONTENT */}
                <div className="p-6 flex flex-col flex-1">
                  <ul className="space-y-3 text-sm text-gray-600 flex-1">
                    {pkg.features.map((item, i) => (
                      <li key={i} className="flex gap-2">
                        <span className="text-green-600">✔</span> {item}
                      </li>
                    ))}
                  </ul>

                  <button className={`mt-6 w-full py-2 rounded-lg font-semibold transition ${pkg.title.includes("GROWTH")
                      ? "bg-orange-500 text-white hover:bg-orange-600"
                      : pkg.title.includes("PREMIUM")
                        ? "bg-green-800 text-white hover:bg-green-700"
                        : "border border-green-700 text-green-700 hover:bg-green-700 hover:text-white"
                    }`}>
                    {pkg.buttonText}
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        <p className="text-center text-sm text-gray-500 mt-2">
          *GST Extra on all packages • Packages can be customized as per your requirements • Limited slots available
        </p>
      </section>

      {/* CHANNELS */}
      <section className="bg-[#f8f8f8] py-2 px-4 md:px-9">
        <h3 className="text-center text-md md:text-xl font-bold text-gray-800 mb-4 tracking-wide">
          OUR DIGITAL PROMOTION CHANNELS
        </h3>

        <div className="grid grid-cols-2 md:grid-cols-6 gap-4 max-w-7xl mx-auto">
          {[
            {
              image: "/images/epromotion/website.webp",
              label: "Website\nFeatured Listings",
            },
            {
              image: "/images/epromotion/emailMarketing.webp",
              label: "Email Marketing\nCampaigns",
            },
            {
              image: "/images/epromotion/social-media.webp",
              label: "Social Media\nPromotions",
            },
            {
              image: "/images/epromotion/whatsapp.webp",
              label: "WhatsApp\nCampaigns",
            },
            {
              image: "/images/epromotion/targeted.webp",
              label: "Targeted\nOnline Ads",
            },
            {
              image: "/images/epromotion/visitor.webp",
              label: "Visitor Database\nOutreach",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="bg-white rounded-xl border p-4 text-center shadow-sm hover:shadow-md transition"
            >
              <img loading="lazy" decoding="async" src={item.image}
                alt={item.label}
                className="w-12 h-12 object-contain mx-auto mb-3"
              />

              <p className="text-xs md:text-sm text-gray-700 whitespace-pre-line font-medium">
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ADDONS + STATS */}
      <section className="py-2 px-4 md:px-10 bg-white">
        <div className="grid md:grid-cols-[30%_70%] gap-6 max-w-7xl mx-auto">
          {/* LEFT - ADDONS */}
          <div className="bg-gray-50 rounded-xl p-6 border">
            <h4 className="text-lg font-bold text-green-800 mb-4">
              ADD-ON PROMOTION OPTIONS
            </h4>

            <ul className="space-y-3 text-sm">
              {[
                ["Homepage Banner Ad (7 Days)", "₹ 15,000"],
                ["Category Sponsorship", "₹ 25,000"],
                ["Featured Brand of the Day", "₹ 10,000"],
                ["Push Notification Alert (App)", "₹ 8,000"],
                ["Influencer Collaboration", "₹ 20,000"],
                ["Additional Email Campaign", "₹ 10,000"],
              ].map((item, i) => (
                <li key={i} className="flex justify-between border-b pb-2">
                  <span className="text-gray-700">{item[0]}</span>
                  <span className="font-semibold text-green-700">{item[1]}</span>
                </li>
              ))}
            </ul>

            <p className="text-xs text-gray-500 mt-3">
              *GST Extra on all add-ons
            </p>
          </div>

          {/* RIGHT - STATS */}
          <div>
            <h4 className="text-lg font-bold text-green-800 mb-4 text-center md:text-left">
              OUR REACH & IMPACT
            </h4>

            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {[
                ["/images/epromotion/visitors.webp", "20,000+", "Trade Visitors"],
                ["/images/epromotion/exhibitors.webp", "500+", "Exhibitors"],
                ["/images/epromotion/globe.webp", "25+", "Countries"],
                ["/images/epromotion/social-reach.webp", "5,00,000+", "Social Media Reach"],
                ["/images/epromotion/email-reach.webp", "1,00,000+", "Email Reach"],
              ].map((item, i) => (
                <div
                  key={i}
                  className="bg-gray-50 border rounded-xl p-4 text-center hover:shadow-md transition"
                >
                  <img loading="lazy" decoding="async" src={item[0]}
                    alt={item[2]}
                    className="w-12 h-12 object-contain mx-auto mb-2"
                  />

                  <p className="text-lg font-bold text-green-800">{item[1]}</p>

                  <p className="text-xs text-gray-600">{item[2]}</p>
                </div>
              ))}
            </div>

            {/* TESTIMONIAL SECTION */}
            <div className="mt-6 rounded-2xl overflow-hidden border bg-white shadow-sm">
              <div className="grid md:grid-cols-[50%_50%] min-h-[120px]">

                {/* LEFT TESTIMONIAL */}
                <div className="relative bg-[#f7f8f5] p-6 md:p-8 flex flex-col justify-center">

                  {/* TOP QUOTE */}
                  <div className="absolute top-3 left-2 text-5xl text-[#6aa84f] opacity-30 font-serif leading-none">
                    &#10077;
                  </div>

                  {/* CONTENT */}
                  <div className="relative z-10 max-w-md">
                    <p className="text-sm md:text-[15px] text-gray-700 leading-relaxed font-medium">
                      {testimonials[active].text}
                    </p>

                    <div className="mt-4 text-xs md:text-sm font-semibold text-gray-600">
                      – {testimonials[active].name}
                    </div>
                  </div>

                  {/* BOTTOM QUOTE */}
                  <div className="absolute bottom-8 right-10 text-5xl text-[#6aa84f] opacity-70 font-serif leading-none rotate-180">
                    &#10077;
                  </div>

                  {/* DOTS */}
                  <div className="absolute bottom-4 left-6 flex gap-2">
                    {testimonials.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setActive(i)}
                        className={`h-2 rounded-full transition-all duration-300 ${active === i
                          ? "bg-[#6aa84f] w-6"
                          : "bg-gray-300 w-2"
                          }`}
                      />
                    ))}
                  </div>
                </div>

                {/* RIGHT IMAGE */}
                <div className="relative h-[120px] md:h-auto overflow-hidden">
                  <img loading="lazy" decoding="async" src="/images/epromotion/test.webp"
                    alt="Testimonial"
                    className="w-full h-full object-cover"
                  />

                  {/* OPTIONAL DARK OVERLAY */}
                  <div className="absolute"></div>
                </div>

              </div>
            </div>
          </div>

        </div>
      </section>

      {/* CTA */}
      {/* PROMOTION CTA SECTION */}
      {/* PROMOTION CTA SECTION */}
      {/* FULL PROMOTION BANNER */}
      {/* TOP MAIN SECTION */}
      <section className="px-4 sm:px-6 mt-4 mb-0">

        <div className="bg-gradient-to-r from-[#062c17] via-[#0d4b27] to-[#062c17] rounded-[4px] relative pb-4 overflow-visible shadow-md border border-[#1f4f33]">

          {/* MAIN CONTENT */}
          <div className="flex flex-col lg:flex-row items-center justify-between gap-4 px-4 sm:px-5 py-3">

            {/* LEFT SIDE */}
            <div className="flex items-center gap-3 flex-1 w-full">

              {/* ICON */}
              <div className="w-[62px] h-[62px] shrink-0 flex items-center justify-center shadow-md">
                <img loading="lazy" decoding="async" src="/images/epromotion/megaphone.webp"
                  alt="Megaphone"
                  className="w-20 h-20 object-contain"
                />
              </div>

              {/* TEXT */}
              <div className="leading-tight">
                <h2 className="text-white font-bold text-[15px] sm:text-[22px]">
                  Don’t Just Exhibit – Get Seen Before You Arrive!
                </h2>

                <p className="text-[#d7e8da] text-[10px] sm:text-[12px] mt-[2px]">
                  Promote your brand, generate leads and grow your business with IHWE 2026.
                </p>
              </div>
            </div>

            {/* RIGHT BUTTONS */}
            <div className="flex items-center gap-2 shrink-0">

              <button className="bg-[#f58220] hover:bg-orange-600 transition-all duration-300 text-white text-[10px] sm:text-[11px] font-bold px-4 sm:px-5 py-2 rounded-sm uppercase tracking-wide whitespace-nowrap">
                Book E-Promotion Package →
              </button>

              <button className="border border-[#5ea06f] hover:bg-white/10 transition-all duration-300 text-white text-[10px] sm:text-[11px] font-bold px-4 sm:px-5 py-2 rounded-sm uppercase tracking-wide whitespace-nowrap">
                Talk To Our Team →
              </button>

            </div>
          </div>

          {/* WHITE OFFER STRIP */}
          <div className="absolute left-1/2 -translate-x-1/2 -bottom-4 w-[70%] z-10 rounded-[4px]">

            <div className="bg-white border border-gray-200 rounded-[4px] px-4 py-[8px] shadow-sm">

              <div className="flex items-center justify-between gap-3">

                {/* LEFT OFFER */}
                <div className="flex items-center gap-2">

                  <div className="w-[18px] h-[18px] rounded-full bg-[#0d4b27] flex items-center justify-center shrink-0">
                    <span className="text-white text-[9px]">✦</span>
                  </div>

                  <p className="text-[11px] sm:text-[11px] font-semibold text-[#222]">
                    <span className="uppercase text-[#0d4b27] font-bold">
                      Special Offer:
                    </span>{" "}
                    Book your stall & get{" "}
                    <span className="text-[#f58220] font-bold">
                      20% OFF
                    </span>{" "}
                    on any E-Promotion Package
                  </p>
                </div>

                {/* KNOW MORE */}
                <button className="text-[#0d4b27] text-[10px] sm:text-[11px] font-bold uppercase whitespace-nowrap flex items-center gap-1">
                  Know More →
                </button>

              </div>
            </div>
          </div>

        </div>
      </section>
      <section className="mt-0 w-full overflow-hidden border border-[#1f4f33] shadow-md rounded-[4px]">

        {/* BOTTOM STATS BAR */}
        <div className="bg-[#062c17] px-4 sm:px-5 pt-5 pb-3">

          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-5 items-center">

            {[
              ["/images/epromotion/globe.webp", "25+", "COUNTRIES"],
              ["/images/epromotion/exhibitors.webp", "500+", "EXHIBITORS"],
              ["/images/epromotion/visitors.webp", "20,000+", "TRADE VISITORS"],
              ["/images/epromotion/speakers.png", "50+", "CONFERENCE SPEAKERS"],
              ["/images/epromotion/business.webp", "3 DAYS", "BUSINESS OPPORTUNITIES"],
            ].map((item, i) => (
              <div
                key={i}
                className="flex items-center gap-3 xl:border-r xl:border-[#ffffff15] last:border-r-0 xl:pr-3"
              >

                {/* IMAGE ICON */}
                <div className="w-10 h-10 rounded-full bg-[#0d3a20] border border-[#7ea35f] flex items-center justify-center shrink-0 p-2">

                  <img loading="lazy" decoding="async" src={item[0]}
                    alt={item[2]}
                    className="w-full h-full object-contain"
                  />

                </div>

                {/* TEXT */}
                <div className="leading-tight">

                  <p className="text-[#d6ff63] text-[14px] font-bold">
                    {item[1]}
                  </p>

                  <p className="text-[9px] sm:text-[10px] text-[#d4d4d4] uppercase tracking-wide">
                    {item[2]}
                  </p>

                </div>

              </div>
            ))}

            {/* SOCIAL */}
            <div className="flex items-center gap-3 xl:justify-end">

              <p className="text-[9px] sm:text-[10px] text-[#d4d4d4] uppercase whitespace-nowrap tracking-wide">
                Follow Us
              </p>

              <a href="#">
                <img loading="lazy" decoding="async" src="/images/social/instagram.png"
                  alt="Instagram"
                  className="w-5 h-5 object-contain hover:scale-110 transition"
                />
              </a>

              <a href="#">
                <img loading="lazy" decoding="async" src="/images/social/linkedin.png"
                  alt="LinkedIn"
                  className="w-5 h-5 object-contain hover:scale-110 transition"
                />
              </a>

              <a href="#">
                <img loading="lazy" decoding="async" src="/images/social/youtube.png"
                  alt="YouTube"
                  className="w-5 h-5 object-contain hover:scale-110 transition"
                />
              </a>

            </div>

          </div>
        </div>

      </section>
    </div>
  );
}