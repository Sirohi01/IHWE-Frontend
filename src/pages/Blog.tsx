import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Calendar, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { blogApi, heroBackgroundApi, SERVER_URL } from "@/lib/api";
import blogHero from "../assets/blogs.jpg";

const Blog = () => {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [heroData, setHeroData] = useState<any>(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const [blogResponse, bgData] = await Promise.all([
          blogApi.getAll(),
          heroBackgroundApi.getByPage("General / Blog")
        ]);
        // Backend returns { success: true, data: [...] }
        if (blogResponse && blogResponse.success && Array.isArray(blogResponse.data)) {
          setBlogs(blogResponse.data);
        } else {
          setBlogs([]);
        }
        if (bgData) setHeroData(bgData);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  return (
    <div className="bg-[#f5f0e8] min-h-screen">
      {/* ── HERO SECTION - Standardized 16:4 Sleek Style ── */}
      <section
        className="hero-background-standard"
        style={{ 
          backgroundImage: `url(${heroData?.backgroundImage ? `${SERVER_URL}${heroData.backgroundImage}` : blogHero})`,
          aspectRatio: "16 / 4"
        }}
      >
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute bottom-0 left-0 w-full h-4 md:h-8 bg-[#f5f0e8]" style={{ clipPath: "ellipse(60% 100% at 50% 100%)" }} />

        <div className="container mx-auto px-4 text-center text-white relative z-10" data-aos="fade-up">
          <p className="text-sm uppercase tracking-[0.4em] mb-4 opacity-80">
            {heroData?.title || "Insights & Media"}
          </p>
          <h1 className="text-4xl md:text-6xl font-serif font-semibold mb-6 italic tracking-tight">
            {heroData?.heading || "Blog & News"}
          </h1>
          <p className="text-white/70 text-base md:text-lg mb-8 max-w-2xl mx-auto font-light leading-relaxed">
            {heroData?.shortDescription || "Stay updated with the latest trends and insights from the global healthcare landscape."}
          </p>
        </div>
      </section>

      <section className="pt-4 pb-20">
        <div className="container mx-auto px-4">

          {loading ? (
            <div className="text-center py-20">
              <p className="text-slate-500">Loading articles...</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogs.map((post, i) => (
                <Link
                  to={`/blog/${post.slug}`}
                  key={post._id}
                  data-aos="fade-up"
                  data-aos-delay={i * 80}
                  className="group relative block rounded-2xl bg-white border border-slate-100 hover:border-[#23471d]/20 transition-all duration-500 hover:-translate-y-1 hover:shadow-xl overflow-hidden font-inter"
                >
                  {/* IMAGE */}
                  <div className="relative aspect-[16/9] overflow-hidden">
                    <img
                      src={`${SERVER_URL}${post.image}`}
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    {/* Shiny Sweep */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/25 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />

                    {/* Category Badge */}
                    <div className="absolute top-3 left-3">
                      <span className="bg-white/90 backdrop-blur-md text-[#23471d] text-[9px] font-bold uppercase tracking-widest px-3 py-1 rounded-full shadow-sm">
                        {post.category}
                      </span>
                    </div>
                  </div>

                  {/* CONTENT */}
                  <div className="p-5 relative overflow-hidden">
                    <div className="flex items-center gap-2 text-slate-400 text-[9px] font-bold uppercase tracking-widest mb-3">
                      <Calendar className="w-3 h-3 text-[#d26019]" />
                      {new Date(post.createdAt || post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </div>
                    <h3 className="text-base font-bold text-[#23471d] mb-3 leading-snug line-clamp-2 transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-black text-xs leading-relaxed mb-5 line-clamp-2 font-medium">
                      {post.excerpt}
                    </p>

                    <div className="flex items-center justify-between pt-3 border-t border-slate-100 relative z-10">
                      <span className="text-[#23471d] font-bold text-[100px] uppercase tracking-widest flex items-center gap-1.5 group-hover:text-[#d26019] transition-colors" style={{ fontSize: '10px' }}>
                        Read More <ArrowRight className="w-3 h-3" />
                      </span>
                      <span className="text-slate-400 text-[9px] uppercase font-bold tracking-widest">
                        {post.readTime || "5 min read"}
                      </span>
                    </div>

                    {/* GREEN HOVER SHADE — bottom-right corner, rises on hover */}
                    <div
                      className="absolute bottom-0 right-0 w-28 h-0 group-hover:h-28 transition-all duration-500 ease-in-out rounded-tl-full pointer-events-none"
                      style={{
                        background: "radial-gradient(ellipse at bottom right, rgba(35,71,29,0.12) 0%, transparent 75%)"
                      }}
                    />
                  </div>
                </Link>
              ))}
            </div>
          )}

          {!loading && blogs.length === 0 && (
            <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-slate-200" data-aos="fade-up">
              <p className="text-slate-500 text-sm font-inter">No articles found matching your criteria.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Blog;
