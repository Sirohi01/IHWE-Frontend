import { motion } from "framer-motion";
import { Download } from "lucide-react";
import { useState, useEffect } from "react";
import { settingsApi, SERVER_URL } from "@/lib/api";
import s1Image from "@/assets/s1.png";
import s2Image from "@/assets/s2.png";
import s4Image from "@/assets/s4.png";

const CategoryStarIcon = () => (
  <svg width="60" height="60" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M12 2L14.9 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L9.1 8.26L12 2Z"
      fill="#008d48" />
  </svg>
);

const sponsorTypes = [
  { id: "s1", title: "TITLE", subtitle: "SPONSOR", desc: "Maximum Brand Visibility", useIcon: false, image: s1Image },
  { id: "s2", title: "POWERED BY", subtitle: "SPONSOR", desc: "High Impact Branding", useIcon: false, image: s2Image },
  { id: "s3", title: "CATEGORY", subtitle: "SPONSOR", desc: "Exclusive Category Association", useIcon: true, icon: CategoryStarIcon },
  { id: "s4", title: "ASSOCIATE", subtitle: "SPONSOR", desc: "Strong Brand Presence", useIcon: false, image: s4Image }
];

const AwardsSponsorship = () => {
  const [sponsorshipDeckUrl, setSponsorshipDeckUrl] = useState("");

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const data = await settingsApi.get();

        if (data?.sponsorshipDeckPdf) {
          const fullUrl = `${SERVER_URL}${data.sponsorshipDeckPdf}`;
          setSponsorshipDeckUrl(fullUrl);
        } else {
          // console.log("No sponsorship deck found in data");
        }
      } catch (error) {
        // console.error("Error fetching sponsorship deck:", error);
      }
    };
    fetchSettings();
  }, []);

  const handleDownload = () => {
    if (sponsorshipDeckUrl) {
      window.open(sponsorshipDeckUrl, '_blank');
    }
  };

  return (
    <section className="py-2 md:py-4 bg-[#f4faff] overflow-hidden">
      {/* Wider alignment matching home page */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <div className="flex flex-col lg:flex-row gap-3 items-stretch">

          {/* LEFT — Branding Card */}
          <motion.div
            initial={{ opacity: 0, x: -25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex-[0.7] bg-[#002447] rounded-[16px] p-5 md:p-6 flex flex-col justify-center items-start text-left relative overflow-hidden min-h-[220px]"
          >
            <span className="text-[#99cc00] text-[11px] font-black uppercase tracking-[0.25em] mb-1 block">
              SPONSORSHIP OPPORTUNITIES
            </span>
            <h2 className="text-white text-[28px] md:text-[30px] font-bold font-serif leading-tight mb-2">
              Partner With Prestige
            </h2>
            <p className="text-white/60 text-[12px] mb-4 max-w-[340px] leading-relaxed font-medium">
              Showcase your brand to a highly targeted audience of healthcare leaders and decision makers.
            </p>

            <button
              onClick={handleDownload}
              disabled={!sponsorshipDeckUrl}
              className="flex items-center bg-[#008d48] text-white rounded-lg text-[12px] font-black uppercase tracking-widest self-start transition-all hover:bg-[#007a3e] overflow-hidden shadow-lg group disabled:opacity-50 disabled:cursor-not-allowed"
              title={sponsorshipDeckUrl ? "Click to download" : "PDF not available"}
            >
              <span className="px-5 py-2.5">
                {sponsorshipDeckUrl ? "DOWNLOAD SPONSORSHIP DECK" : "DECK NOT AVAILABLE"}
              </span>
              <div className="bg-black/10 px-3 py-3 border-l border-white/20">
                <Download className="w-4 h-4" />
              </div>
            </button>
          </motion.div>

          {/* RIGHT — Sponsorship Grid */}
          <div className="flex-[1.7] grid grid-cols-2 md:grid-cols-4 gap-3">
            {sponsorTypes.map((type, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
                className="bg-white rounded-[16px] px-2 py-4 flex flex-col items-center justify-center text-center border border-slate-100 shadow-[0_4px_25px_-12px_rgba(0,0,0,0.05)] transition-all hover:shadow-xl group"
              >
                <div className="mb-3 w-12 h-12 md:w-16 md:h-16 flex items-center justify-center">
                  {type.useIcon ? (
                    <div className="scale-110">
                      <type.icon />
                    </div>
                  ) : (
                    <img loading="lazy" decoding="async" src={type.image}
                      alt={type.title}
                      className="w-full h-full object-contain scale-[1.15]"
                      style={{ objectPosition: 'center' }}
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.opacity = '0';
                      }}
                    />
                  )}
                </div>

                <div className="flex flex-col gap-0 mb-1.5">
                  <p className="text-[#002447] text-[16px] font-black leading-none tracking-tight">{type.title}</p>
                  <p className="text-[#002447] text-[16px] font-black leading-none tracking-tight">{type.subtitle}</p>
                </div>

                <div className="h-[1.5px] w-8 bg-slate-300 mb-2.5 opacity-60"></div>

                <p className="text-slate-400 text-[10px] font-bold uppercase leading-tight tracking-wide px-1 opacity-80">
                  {type.desc}
                </p>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default AwardsSponsorship;
