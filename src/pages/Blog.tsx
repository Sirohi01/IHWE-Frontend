import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Search, Calendar, ArrowRight, Layers, Zap, Building2, Sparkles, Smartphone } from "lucide-react";
import { Input } from "@/components/ui/input";
import { motion, AnimatePresence } from "framer-motion";
import { blogApi, SERVER_URL } from "@/lib/api";

import blogHero from "../assets/blogs.jpg";

const categoryList = [
  { id: "All", label: "All", icon: Layers },
  { id: "Technology", label: "Technology", icon: Zap },
  { id: "Industry", label: "Industry", icon: Building2 },
  { id: "Innovation", label: "Innovation", icon: Sparkles },
  { id: "Devices", label: "Devices", icon: Smartphone },
];

const Blog = () => {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState("All");
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await blogApi.getAll();
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

  const filtered = blogs.filter(p =>
    (category === "All" || p.category === category) &&
    (search === "" || p.title.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="bg-[#f5f0e8] min-h-screen">
      <section
        className="relative pt-36 pb-20 overflow-hidden"
        style={{ backgroundImage: `url(${blogHero})`, backgroundSize: "cover", backgroundPosition: "center" }}
      >
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute bottom-0 left-0 w-full h-16 bg-[#f5f0e8]" style={{ clipPath: "ellipse(60% 100% at 50% 100%)" }} />

        <div className="container mx-auto px-4 text-center text-white relative z-10" data-aos="fade-up">
          <p className="text-sm uppercase tracking-[0.4em] mb-4 opacity-80">Insights & Media</p>
          <h1 className="text-4xl md:text-6xl font-serif font-semibold mb-6 italic tracking-tight">Blog & News</h1>
          <p className="text-white/70 text-base md:text-lg mb-8 max-w-2xl mx-auto font-light leading-relaxed">
            Stay updated with the latest trends, breakthroughs, and insights from the global healthcare and wellness landscape.
          </p>
        </div>
      </section>

      <section className="pt-4 pb-20">
        <div className="container mx-auto px-4">
          {/* Filters & Search */}
          <div className="flex flex-col lg:flex-row gap-8 items-center justify-between mb-16 px-2">
            <div className="inline-flex p-1.5 bg-white/40 backdrop-blur-sm rounded-xl border border-white/20 flex-wrap justify-center font-inter order-2 lg:order-1">
              {categoryList.map((c) => (
                <button
                  key={c.id}
                  onClick={() => setCategory(c.id)}
                  className={`relative flex items-center gap-2.5 px-6 py-3 rounded-lg text-[11px] font-bold uppercase tracking-[0.15em] transition-all duration-500 overflow-hidden ${category === c.id
                    ? "text-white shadow-lg"
                    : "text-slate-600 hover:bg-white/30"
                    }`}
                >
                  {category === c.id && (
                    <motion.div
                      layoutId="activeFilter"
                      className="absolute inset-0 bg-[#23471d]"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  <span className="relative z-10 flex items-center gap-2">
                    <c.icon className={`w-3.5 h-3.5 ${category === c.id ? "text-white" : "text-[#23471d]"}`} />
                    {c.label}
                  </span>
                </button>
              ))}
            </div>

            <div className="relative w-full sm:w-80 font-inter order-1 lg:order-2">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#23471d]" />
              <Input
                placeholder="Search articles..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-12 bg-white/50 backdrop-blur-sm border-white/30 h-14 rounded-xl focus:ring-[#23471d]/20 placeholder:text-slate-400 text-sm font-bold tracking-wide"
              />
            </div>
          </div>

          {loading ? (
            <div className="text-center py-20">
              <p className="text-slate-500">Loading articles...</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filtered.map((post, i) => (
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

          {!loading && filtered.length === 0 && (
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
