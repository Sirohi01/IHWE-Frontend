import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Search, Filter, Globe, MapPin, ExternalLink } from "lucide-react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import exhiHero from "../assets/exhi.jpg";

import { exhibitorApi, heroBackgroundApi, SERVER_URL } from "@/lib/api";

const Exhibitors = () => {
  const [exhibitors, setExhibitors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [heroData, setHeroData] = useState<any>(null);

  useEffect(() => {
    const fetchExhibitors = async () => {
      try {
        const [exhiData, bgData] = await Promise.all([
          exhibitorApi.get(),
          heroBackgroundApi.getByPage("General / Exhibitors List")
        ]);
        setExhibitors(exhiData || []);
        if (bgData) setHeroData(bgData);
      } catch (error) {
        console.error("Error fetching exhibitors:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchExhibitors();
  }, []);

  const filteredExhibitors = exhibitors.filter((exhi: any) =>
    exhi.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    exhi.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-[#fcfcfc] min-h-screen">
      {/* ── HERO SECTION - Standardized 16:4 Sleek Style ── */}
      <section
        className="hero-background-standard"
        style={{ 
          backgroundImage: `url(${heroData?.backgroundImage ? `${SERVER_URL}${heroData.backgroundImage}` : exhiHero})`
        }}
      >

        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute bottom-0 left-0 w-full h-4 md:h-8 bg-[#fcfcfc]" style={{ clipPath: "ellipse(60% 100% at 50% 100%)" }} />

        <div className="container mx-auto px-4 text-center text-white relative z-10" data-aos="fade-up">
          <p className="text-sm uppercase tracking-[0.4em] mb-4 opacity-80">
            {heroData?.title || "Global Network"}
          </p>
          <h1 className="text-4xl md:text-6xl font-inter font-semibold mb-6 tracking-tight">
            {heroData?.heading || "Exhibitor List"}
          </h1>
          <p className="text-white/70 text-base md:text-lg mb-8 max-w-2xl mx-auto font-light leading-relaxed">
            {heroData?.shortDescription || "Meet the innovators showcasing the latest in health, wellness, and medical technology."}
          </p>
        </div>
      </section>

      {/* FILTER & SEARCH */}
      <section className="py-2">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-3 items-center justify-between mb-6">
            <div className="flex gap-2">
              <button className="flex items-center gap-1.5 px-3 py-2 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors shadow-sm">
                <Filter className="w-3 h-3 text-[#23471d]" />
                <span className="text-[10px] font-bold text-slate-700 uppercase tracking-wider">Filter</span>
              </button>
            </div>

            <div className="relative w-full md:w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3 h-3 text-slate-400" />
              <input
                type="text"
                placeholder="Search exhibitors..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-4 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-1 focus:ring-[#23471d] bg-white text-xs shadow-sm transition-all"
              />
            </div>
          </div>

          {/* EXHIBITOR GRID */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
            {loading ? (
              [...Array(6)].map((_, i) => (
                <div key={i} className="animate-pulse bg-white border border-slate-200 rounded-sm aspect-[4/3]" />
              ))
            ) : filteredExhibitors.length > 0 ? (
              filteredExhibitors.map((exhi, idx) => (
                <motion.div
                  key={exhi._id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: idx * 0.03 }}
                  className="group relative bg-white border border-slate-200 rounded-sm overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500"
                >
                  {/* Header Dot */}
                  <div className="absolute top-2 left-2 z-10">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_6px_rgba(34,197,94,0.5)] animate-pulse" />
                  </div>

                  {/* Logo Area */}
                  <div className="aspect-[4/3] p-3 flex items-center justify-center bg-white border-b border-slate-100">
                    <LazyLoadImage
                      src={exhi.image.startsWith('http') ? exhi.image : `${SERVER_URL}${exhi.image}`}
                      alt={exhi.altText || exhi.title}
                      effect="blur"
                      className="max-h-full max-w-full object-contain transition-all duration-700 scale-90 group-hover:scale-100"
                      wrapperClassName="flex items-center justify-center"
                    />
                  </div>

                  {/* Content Overlay */}
                  <div className="absolute inset-x-0 bottom-0 p-2.5 translate-y-full group-hover:translate-y-0 transition-transform duration-500 bg-white/95 backdrop-blur-md border-t border-slate-200">
                    <h3 className="text-[9px] font-bold text-slate-900 mb-1 truncate">{exhi.title}</h3>
                    <div className="flex items-center gap-1 text-[7px] text-slate-500 font-bold uppercase tracking-widest mb-1.5">
                      <MapPin className="w-2 h-2 text-[#d26019]" />
                      {exhi.location}
                    </div>
                    <a
                      href={exhi.websiteUrl || "#"}
                      target={exhi.websiteUrl ? "_blank" : "_self"}
                      rel="noreferrer"
                      className="flex items-center justify-center gap-1.5 w-full py-1.5 bg-slate-900 text-white text-[8px] font-black uppercase tracking-[0.2em] hover:bg-[#23471d] transition-colors"
                    >
                      Profile <ExternalLink className="w-2 h-2" />
                    </a>
                  </div>

                  {/* Permanent Name */}
                  <div className="p-1 bg-slate-100/50 group-hover:opacity-0 transition-opacity duration-300 border-t border-slate-200">
                    <p className="text-[8px] font-bold text-slate-700 text-center truncate uppercase tracking-widest">{exhi.title}</p>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="col-span-full py-20 text-center text-slate-400 text-xs font-medium uppercase tracking-widest">
                No exhibitors found matching your search.
              </div>
            )}
          </div>

          {/* LOAD MORE */}
          {filteredExhibitors.length > 0 && (
            <div className="mt-12 text-center" data-aos="fade-up">
              <p className="text-slate-400 text-[10px] mb-3 font-medium uppercase tracking-widest">
                Showing {filteredExhibitors.length} of {exhibitors.length} Exhibitors
              </p>
              <button className="px-6 py-2.5 bg-[#23471d] text-white text-[9px] font-black uppercase tracking-[0.2em] hover:bg-[#1a3a14] transition-all shadow-md">
                View All
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Exhibitors;
