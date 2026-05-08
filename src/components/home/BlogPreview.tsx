import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Calendar, User } from "lucide-react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { blogApi, SERVER_URL } from "@/lib/api";
import SectionContainer from "../layout/SectionContainer";

const BlogPreview = () => {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await blogApi.getLatest(3);
        // Backend returns { success: true, data: [...] }
        if (response && response.success && Array.isArray(response.data)) {
          setBlogs(response.data);
        } else {
          setBlogs([]);
        }
      } catch (error) {
        console.error("Error fetching blogs:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  if (loading) {
    return (
      <section className="pt-8 pb-16 lg:pt-12 lg:pb-22" style={{ backgroundColor: "#F7F8F0" }}>
        <SectionContainer className="text-center">
          <p className="text-slate-500">Loading insights...</p>
        </SectionContainer>
      </section>
    );
  }

  if (blogs.length === 0) return null;

  return (
    <section className="pt-4 pb-16 md:pt-6 md:pb-22 overflow-x-hidden" style={{ backgroundColor: "#F7F8F0" }}>
      <SectionContainer>
        {/* BRANDED HEADING */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 md:mb-4 gap-4 md:gap-6">
          <div data-aos="fade-right">
            <div className="flex items-center gap-3 mb-2">
              <div className="h-px w-8 bg-[#23471d]" />
              <span className="uppercase tracking-[0.3em] md:tracking-[0.4em] text-[#23471d] font-bold text-[10px] md:text-xs">
                Latest Insights
              </span>
            </div>
            <h2 className="text-2xl md:text-4xl font-inter font-black md:font-bold text-slate-900 leading-tight">
              Global Healthcare <span className="text-[#d26019]">Perspectives</span>
            </h2>
          </div>
          <Link
            to="/blog"
            data-aos="fade-left"
            className="flex items-center gap-2 text-[#d26019] font-inter font-bold text-[11px] md:text-xs uppercase tracking-widest hover:gap-4 transition-all w-fit"
          >
            Explore All <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-6">
          {blogs.map((post, i) => (
            <Link
              to={`/blog/${post.slug}`}
              key={post._id}
              data-aos="fade-up"
              data-aos-delay={i * 100}
              className="group relative block rounded-2xl bg-white border border-slate-100 hover:border-[#23471d]/20 transition-all duration-500 hover:-translate-y-1 hover:shadow-xl overflow-hidden font-inter"
            >
              {/* Image Container */}
              <div className="relative h-56 md:h-48 overflow-hidden">
                <LazyLoadImage
                  src={`${SERVER_URL}${post.image}`}
                  alt={post.title}
                  effect="blur"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  wrapperClassName="w-full h-full"
                />
                {/* Shiny Sweep */}
                <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/25 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
                {/* Category Badge */}
                <div className="absolute top-4 left-4 md:top-3 md:left-3">
                  <span className="bg-white/90 backdrop-blur-md text-[#23471d] text-[10px] md:text-[9px] font-bold uppercase tracking-widest px-4 py-1.5 md:px-3 md:py-1 rounded-full shadow-sm font-inter">
                    {post.category}
                  </span>
                </div>
              </div>

              {/* CONTENT */}
              <div className="p-6 md:p-5 relative overflow-hidden">
                <div className="flex items-center gap-2 text-slate-400 text-[10px] md:text-[9px] font-bold uppercase tracking-widest mb-3 font-inter">
                  <Calendar className="w-3.5 h-3.5 text-[#d26019]" />
                  {new Date(post.createdAt || post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                </div>
                <h3 className="text-lg md:text-base font-black md:font-bold text-[#23471d] mb-3 leading-snug line-clamp-2 transition-colors font-inter">
                  {post.title}
                </h3>
                <p className="text-slate-700 md:text-black text-[13px] md:text-xs leading-relaxed mb-6 md:mb-5 line-clamp-3 md:line-clamp-2 font-medium font-inter">
                  {post.excerpt}
                </p>

                <div className="flex items-center justify-between pt-4 md:pt-3 border-t border-slate-100 relative z-10 font-inter">
                  <span className="text-[#23471d] font-bold text-[11px] md:text-[10px] uppercase tracking-widest flex items-center gap-1.5 group-hover:text-[#d26019] transition-colors">
                    Read More <ArrowRight className="w-4 h-4 md:w-3 md:h-3" />
                  </span>
                  <span className="text-slate-400 text-[10px] md:text-[9px] uppercase font-bold tracking-widest">
                    {post.readTime || "5 min read"}
                  </span>
                </div>

                {/* GREEN HOVER SHADE — bottom-right corner, rises on hover */}
                <div
                  className="absolute bottom-0 right-0 w-28 h-0 group-hover:h-28 transition-all duration-500 ease-in-out rounded-tl-full pointer-events-none"
                  style={{
                    background: "radial-gradient(ellipse at bottom right, rgba(35,71,29,0.12) 0%, transparent 75%)",
                  }}
                />
              </div>
            </Link>
          ))}
        </div>
      </SectionContainer>
    </section>
  );
};

export default BlogPreview;
