import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Calendar, User, ArrowLeft, Tag, ArrowRight, Clock } from "lucide-react";
import { blogApi, SERVER_URL } from "@/lib/api";
import SeoHelmet from "@/components/SeoHelmet";

const BlogDetail = () => {
  const { id } = useParams(); // This is the slug
  const [blog, setBlog] = useState<any>(null);
  const [relatedBlogs, setRelatedBlogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogDetail = async () => {
      if (!id) return;
      try {
        setLoading(true);
        const [blogResponse, allBlogsResponse] = await Promise.all([
          blogApi.getBySlug(id),
          blogApi.getAll()
        ]);

        if (blogResponse && blogResponse.success) {
          setBlog(blogResponse.data);
        }

        if (allBlogsResponse && allBlogsResponse.success && Array.isArray(allBlogsResponse.data)) {
          setRelatedBlogs(allBlogsResponse.data.filter((b: any) => b.slug !== id).slice(0, 3));
        }
      } catch (error) {
        console.error("Error fetching blog detail:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogDetail();
    window.scrollTo(0, 0);
  }, [id]);

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F9FAFB]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-[#134E8E] border-t-transparent rounded-full animate-spin" />
          <p className="text-slate-500 font-medium">Loading story...</p>
        </div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#F9FAFB] p-4 text-center">
        <h2 className="text-3xl font-inter font-bold text-slate-800 mb-4">Article Not Found</h2>
        <Link to="/blog" className="inline-flex items-center gap-2 bg-[#134E8E] text-white px-6 py-3 font-bold text-xs uppercase tracking-widest hover:bg-[#0e3a6a] transition-all">
          <ArrowLeft className="w-4 h-4" /> Back to Blog
        </Link>
      </div>
    );
  }

    return (
    <div className="min-h-screen bg-[#F9FAFB] font-sans">
      {/* SEO Injection */}
      <SeoHelmet
        data={{
          metaTitle: blog.metaTitle,
          metaDescription: blog.metaDescription,
          metaKeywords: blog.metaKeywords,
          ogImage: blog.image,
          openGraphTags: blog.openGraphTags,
          schemaMarkup: blog.schemaMarkup,
          canonicalTag: blog.canonicalTag
        }}
      />

      {/* ── HERO SECTION - Article Style (1600x675) ── */}
      <section
        className="hero-background-post"
        style={{
          backgroundImage: `url(${blog.image.startsWith('http') ? blog.image : `${SERVER_URL}${blog.image}`})`
        }}
      >
        <div className="absolute inset-0 bg-black/40" />

        <div className="container mx-auto px-4 text-white relative z-10" data-aos="fade-up">
          {/* Back link */}
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-white/70 hover:text-white text-xs font-bold uppercase tracking-widest mb-6 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Articles
          </Link>

          {/* Category badge */}
          <div className="mb-4">
            <span className="bg-[#DE802B] text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1.5">
              {blog.category}
            </span>
          </div>

          {/* Title - Using h1Title if available for SEO prioritisation */}
          <h1 className="text-3xl md:text-5xl font-inter font-semibold mb-5 tracking-tight leading-tight max-w-4xl">
            {blog.h1Title || blog.title}
          </h1>

          {/* Meta row */}
          <div className="flex flex-wrap items-center gap-5 text-white/70 text-xs font-bold uppercase tracking-widest">
            <span className="flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-[#DE802B]" />
              {blog.author?.name || blog.author || "IHWE Team"}
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-[#DE802B]" />
              {formatDate(blog.createdAt)}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-[#DE802B]" />
              {blog.readTime || "5 min read"}
            </span>
          </div>
        </div>
      </section>

      {/* ── CONTENT AREA ── */}
      <div className="container mx-auto px-4 py-14 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* ── MAIN ARTICLE ── */}
          <motion.article
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-8"
          >
            {/* Excerpt highlight */}
            {blog.excerpt && (
              <div className="border-l-4 border-[#DE802B] pl-6 mb-10 bg-white p-6 shadow-sm">
                <p className="text-slate-600 text-base leading-relaxed font-medium">
                  {blog.excerpt}
                </p>
              </div>
            )}

            {/* Article body */}
            <div
              className="bg-white border border-slate-100 p-8 md:p-10 shadow-sm
                prose prose-slate max-w-none
                prose-headings:font-inter prose-headings:text-slate-900 prose-headings:font-bold
                prose-h2:text-3xl prose-h2:mt-10 prose-h2:mb-4 prose-h2:border-b prose-h2:border-slate-100 prose-h2:pb-2
                prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-3
                prose-p:text-slate-700 prose-p:leading-relaxed prose-p:text-[15px]
                prose-a:text-blue-600 prose-a:font-semibold prose-a:underline
                prose-strong:text-slate-900 prose-strong:font-extrabold prose-img:rounded-2xl"
              style={{ color: '#374151' }}
              dangerouslySetInnerHTML={{ __html: blog.content }}
            />
            <style>{`
              .prose { font-family: 'Lora', Georgia, serif !important; font-size: 16px; line-height: 1.85; }
              .prose p, .prose li, .prose span { font-family: 'Lora', Georgia, serif !important; color: #374151 !important; font-size: 16px !important; line-height: 1.85 !important; }
              .prose h1, .prose h2, .prose h3, .prose h4, .prose h5, .prose h6 { font-family: 'Playfair Display', Georgia, serif !important; color: #0f172a !important; }
              .prose h2 { font-weight: 800 !important; font-size: 1.875rem !important; margin-top: 2.5rem !important; margin-bottom: 1rem !important; padding-bottom: 0.5rem !important; border-bottom: 1px solid #e2e8f0; }
              .prose h3 { font-weight: 700 !important; font-size: 1.5rem !important; margin-top: 2rem !important; margin-bottom: 0.75rem !important; }
              .prose a { color: #2563eb !important; text-decoration: underline !important; font-weight: 600 !important; font-family: 'Lora', Georgia, serif !important; }
              .prose a:hover { color: #1d4ed8 !important; }
              .prose strong, .prose b { font-weight: 800 !important; color: #0f172a !important; font-family: 'Lora', Georgia, serif !important; }
              .prose ul { padding-left: 1.5rem !important; margin: 1rem 0 !important; }
              .prose ul li { list-style-type: disc !important; color: #374151 !important; font-family: 'Lora', Georgia, serif !important; margin-bottom: 0.4rem !important; }
              .prose ol li { color: #374151 !important; font-family: 'Lora', Georgia, serif !important; margin-bottom: 0.4rem !important; }
            `}</style>

            {/* Tags - Hidden if not exists */}
            {blog.tags && blog.tags.length > 0 && (
              <div className="mt-8 bg-white border border-slate-100 p-6 shadow-sm">
                <div className="flex items-center gap-3 flex-wrap">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-400">
                    <Tag className="w-3.5 h-3.5" /> Tags:
                  </div>
                  {blog.tags.map((tag: string) => (
                    <span
                      key={tag}
                      className="text-[10px] font-bold uppercase tracking-wider bg-[#134E8E]/10 text-[#134E8E] border border-[#134E8E]/20 px-3 py-1.5"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Back to blogs */}
            <div className="mt-8">
              <Link
                to="/blog"
                className="inline-flex items-center gap-2 bg-[#134E8E] hover:bg-[#0e3a6a] text-white text-xs font-bold uppercase tracking-widest px-6 py-3 transition-all duration-300 shadow-sm hover:shadow-md"
              >
                <ArrowLeft className="w-3.5 h-3.5" /> Back to All Articles
              </Link>
            </div>
          </motion.article>

          {/* ── SIDEBAR ── */}
          <aside className="lg:col-span-4 space-y-7">
            {/* Author card */}
            <div className="bg-white border border-slate-100 p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <div className="h-px w-5 bg-[#134E8E]" />
                <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#134E8E]">Author</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[#134E8E]/10 flex items-center justify-center rounded-full shrink-0">
                  <User className="w-6 h-6 text-[#134E8E]" />
                </div>
                <div>
                  <p className="font-bold text-slate-900 text-sm">{blog.author?.name || blog.author || "IHWE Team"}</p>
                  <p className="text-[11px] text-slate-400 font-medium mt-0.5">Official Exhibition Partner</p>
                </div>
              </div>
            </div>

            {/* Category */}
            <div className="bg-white border border-slate-100 p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <div className="h-px w-5 bg-[#134E8E]" />
                <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#134E8E]">Category</span>
              </div>
              <span className="inline-block bg-[#DE802B] text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1.5">
                {blog.category}
              </span>
            </div>

            {/* Recent Articles */}
            {relatedBlogs.length > 0 && (
              <div className="bg-white border border-slate-100 p-6 shadow-sm">
                <div className="flex items-center gap-2 mb-5">
                  <div className="h-px w-5 bg-[#134E8E]" />
                  <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#134E8E]">Recent Articles</span>
                </div>
                <div className="space-y-5">
                  {relatedBlogs.map((recent) => (
                    <Link
                      key={recent._id}
                      to={`/blog/${recent.slug}`}
                      className="group flex gap-3 pb-5 border-b border-slate-100 last:border-0 last:pb-0"
                    >
                      {/* Thumbnail */}
                      <div className="w-16 h-16 shrink-0 overflow-hidden bg-slate-100 rounded-lg">
                        <img
                          src={recent.image.startsWith('http') ? recent.image : `${SERVER_URL}${recent.image}`}
                          alt={recent.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <span className="text-[9px] font-bold uppercase tracking-widest text-[#DE802B] block mb-1">
                          {recent.category}
                        </span>
                        <h4 className="text-sm font-bold text-slate-800 leading-snug group-hover:text-[#134E8E] transition-colors line-clamp-2 mb-1">
                          {recent.title}
                        </h4>
                        <span className="flex items-center gap-1 text-[10px] text-slate-400 font-medium">
                          <Calendar className="w-3 h-3" />
                          {formatDate(recent.createdAt)}
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* CTA card */}
            <div className="bg-[#134E8E] p-8 text-white relative overflow-hidden group">
              <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-white/5 rounded-full group-hover:scale-110 transition-transform duration-700" />
              <div className="relative z-10">
                <h4 className="font-inter font-bold text-xl mb-3">Plan Your Exhibit at IHWE 2026</h4>
                <p className="text-white/70 text-xs leading-relaxed mb-6">
                  Experience the largest upcoming interior, home decor & Woodworking exhibition.
                </p>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 bg-[#DE802B] hover:bg-[#c67226] text-white text-[11px] font-bold uppercase tracking-widest px-5 py-3 transition-all duration-300 shadow-lg"
                >
                  Get in Touch <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default BlogDetail;
