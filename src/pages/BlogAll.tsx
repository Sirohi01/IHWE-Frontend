import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Calendar, Clock, ArrowLeft, ArrowRight, Search } from "lucide-react";
import { blogApi, SERVER_URL } from "@/lib/api";
import BlogFooter from "@/components/blog/BlogFooter";

const PAGE_SIZE = 6;

const categories = [
  { id: "all", label: "All" },
  { id: "healthcare", label: "Healthcare Innovation" },
  { id: "digital", label: "Digital Health" },
  { id: "wellness", label: "Wellness & Prevention" },
  { id: "sustainability", label: "Sustainability" },
  { id: "policy", label: "Policy & Economy" },
  { id: "startups", label: "Startups & Entrepreneurs" },
  { id: "research", label: "Research & Insights" },
];

const getBadgeStyles = (cat: string) => {
  const c = cat?.toLowerCase() || "";
  if (c.includes("healthcare") || c.includes("innovation")) return "bg-blue-600 text-white";
  if (c.includes("general") || c.includes("wellness")) return "bg-emerald-500 text-white";
  if (c.includes("events") || c.includes("news")) return "bg-rose-500 text-white";
  return "bg-[#00df82] text-[#001529]";
};

const BlogAll = () => {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchBlogs = async () => {
      setLoading(true);
      try {
        const res = await blogApi.getAll();
        if (res?.success) setBlogs(res.data);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedQuery(searchQuery), 500);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  const filteredBlogs = useMemo(() => {
    return blogs.filter((blog) => {
      const matchesCategory =
        activeCategory === "all" || blog.category?.toLowerCase() === activeCategory.toLowerCase();
      const matchesSearch =
        !debouncedQuery ||
        blog.title?.toLowerCase().includes(debouncedQuery.toLowerCase()) ||
        blog.excerpt?.toLowerCase().includes(debouncedQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [blogs, activeCategory, debouncedQuery]);

  useEffect(() => {
    setPage(1);
  }, [activeCategory, debouncedQuery]);

  const totalPages = Math.max(1, Math.ceil(filteredBlogs.length / PAGE_SIZE));
  const paginatedBlogs = filteredBlogs.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <div className="bg-white min-h-screen font-inter overflow-x-hidden">
      {/* Header */}
      <section className="bg-[#001529] pt-28 pb-12 px-5 md:px-12">
        <div className="container mx-auto">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-slate-400 text-sm font-medium hover:text-[#00df82] transition-colors mb-6"
          >
            <ArrowLeft size={16} /> Back to Blog
          </Link>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-1.5 h-8 bg-[#00df82] rounded-full" />
            <h1 className="text-white text-3xl md:text-4xl font-medium tracking-tight">All Articles</h1>
          </div>
          <p className="text-slate-400 text-sm font-medium ml-6">
            {filteredBlogs.length} article{filteredBlogs.length !== 1 ? "s" : ""} available
          </p>

          {/* Search */}
          <div className="relative mt-8 max-w-md ml-6">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/10 border border-white/10 rounded-xl py-3 pl-11 pr-4 text-white text-sm placeholder:text-slate-400 focus:outline-none focus:border-[#00df82] transition-colors"
            />
          </div>
        </div>
      </section>

      {/* Category Filters */}
      <section className="bg-slate-50/80 border-b border-slate-100 py-5 px-5 md:px-12">
        <div className="container mx-auto flex flex-wrap gap-2">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 rounded-full text-[11px] font-medium tracking-tight transition-all ${
                  isActive
                    ? "bg-[#00df82] text-[#001529]"
                    : "bg-white text-slate-500 border border-slate-100 hover:border-[#00df82] hover:text-[#001529]"
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>
      </section>

      {/* Articles Grid */}
      <section className="py-10 bg-slate-50/80">
        <div className="container mx-auto px-5 md:px-12">
          {loading ? (
            <div className="flex justify-center py-24">
              <div className="w-10 h-10 border-4 border-[#00df82] border-t-transparent rounded-full animate-spin" />
            </div>
          ) : paginatedBlogs.length === 0 ? (
            <div className="text-center py-24">
              <p className="text-slate-500 font-medium">No articles found.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {paginatedBlogs.map((post, idx) => (
                <motion.div
                  key={post._id || post.slug || idx}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: idx * 0.04 }}
                >
                  <Link
                    to={`/blog/${post.slug}`}
                    className="group flex flex-col bg-white rounded-[24px] overflow-hidden border border-slate-50 hover:shadow-2xl hover:shadow-slate-200 transition-all duration-500 h-full"
                  >
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <img
                        loading="lazy"
                        decoding="async"
                        src={`${SERVER_URL}${post.image}`}
                        alt={post.title}
                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                      />
                      <div className="absolute bottom-3 left-3">
                        <span
                          className={`${getBadgeStyles(post.category)} text-[9px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-md shadow-lg`}
                        >
                          {post.category || "HEALTHCARE"}
                        </span>
                      </div>
                    </div>

                    <div className="p-5 flex flex-col flex-1">
                      <h3 className="text-[#001529] font-medium text-sm leading-snug mb-3 group-hover:text-[#00df82] transition-colors line-clamp-2">
                        {post.title}
                      </h3>

                      <p className="text-slate-500 text-[11px] font-medium leading-relaxed line-clamp-3 mb-6">
                        {post.excerpt}
                      </p>

                      <div className="mt-auto flex items-center gap-4 text-slate-400 text-[13px] font-medium border-t border-slate-50 pt-4">
                        <div className="flex items-center gap-1.5">
                          <Calendar size={16} className="text-[#00df82]" />
                          {post.createdAt
                            ? new Date(post.createdAt).toLocaleDateString("en-US", {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                              })
                            : ""}
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Clock size={16} className="text-[#00df82]" />
                          {post.readTime || "5 min read"}
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}

          {/* Pagination */}
          {!loading && totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-12">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="w-9 h-9 flex items-center justify-center rounded-lg border border-slate-200 text-slate-500 disabled:opacity-40 hover:border-[#00df82] hover:text-[#001529] transition-colors"
              >
                <ArrowLeft size={14} />
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <button
                  key={p}
                  onClick={() => setPage(p)}
                  className={`w-9 h-9 flex items-center justify-center rounded-lg text-[12px] font-medium transition-colors ${
                    p === page
                      ? "bg-[#00df82] text-[#001529]"
                      : "border border-slate-200 text-slate-500 hover:border-[#00df82] hover:text-[#001529]"
                  }`}
                >
                  {p}
                </button>
              ))}

              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="w-9 h-9 flex items-center justify-center rounded-lg border border-slate-200 text-slate-500 disabled:opacity-40 hover:border-[#00df82] hover:text-[#001529] transition-colors"
              >
                <ArrowRight size={14} />
              </button>
            </div>
          )}
        </div>
      </section>

      <BlogFooter />
    </div>
  );
};

export default BlogAll;
