import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Clock, Calendar, ArrowRight, Mail } from 'lucide-react';
import { SERVER_URL } from '@/lib/api';
import BlogCategories from './BlogCategories';
import axios from 'axios';
import { toast } from 'sonner';

interface BlogFeaturedLayoutProps {
  featured: any[];
  activeCategory: string;
  onCategoryChange: (id: string) => void;
}

const BlogFeaturedLayout: React.FC<BlogFeaturedLayoutProps> = ({ featured, activeCategory, onCategoryChange }) => {
  const [email, setEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubscribe = async () => {
    if (!email) {
      toast.error('Please enter your email');
      return;
    }
    setSubmitting(true);
    try {
      const res = await axios.post(`${SERVER_URL}/api/blogs/subscribe`, { email });
      if (res.data.success) {
        toast.success('Successfully subscribed!');
        setEmail('');
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Subscription failed');
    } finally {
      setSubmitting(false);
    }
  };

  const displayPosts = featured.slice(0, 3);

  return (
    <section className="py-2 bg-slate-50/80">
      <div className="container mx-auto px-5 md:px-12">
        <div className="flex flex-col lg:flex-row gap-10 items-start">

          {/* Left Column: Featured Articles */}
          <div className="w-full lg:w-[75%] mt-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-1.5 h-8 bg-[#00df82] rounded-full" />
                <h2 className="text-[#001529] text-3xl font-medium tracking-tight">Featured Articles</h2>
              </div>
              <Link to="/blog/all" className="flex items-center gap-2 text-slate-400 text-sm font-medium hover:text-[#00df82] transition-colors">
                View all articles <ArrowRight size={16} />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {displayPosts.map((post, idx) => {
                const getBadgeStyles = (cat: string) => {
                  const c = cat?.toLowerCase() || '';
                  if (c.includes('healthcare') || c.includes('innovation')) return 'bg-blue-600 text-white';
                  if (c.includes('general') || c.includes('wellness')) return 'bg-emerald-500 text-white';
                  if (c.includes('events') || c.includes('news')) return 'bg-rose-500 text-white';
                  return 'bg-[#00df82] text-[#001529]';
                };

                return (
                  <Link
                    key={idx}
                    to={`/blog/${post.slug}`}
                    className="group flex flex-col bg-white rounded-[24px] overflow-hidden border border-slate-50 hover:shadow-2xl hover:shadow-slate-200 transition-all duration-500"
                  >
                    {/* Image Container */}
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <img
                        src={`${SERVER_URL}${post.image}`}
                        alt={post.title}
                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                      />
                      {/* Category Badge on Image - Precise Positioning */}
                      <div className="absolute bottom-3 left-3">
                        <span className={`${getBadgeStyles(post.category)} text-[9px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-md shadow-lg`}>
                          {post.category || "HEALTHCARE"}
                        </span>
                      </div>
                    </div>

                    {/* Content Area */}
                    <div className="p-5 flex flex-col flex-1">
                      <h3 className="text-[#001529] font-medium text-sm leading-snug mb-3 group-hover:text-[#00df82] transition-colors line-clamp-2">
                        {post.title}
                      </h3>

                      <p className="text-slate-500 text-[11px] font-medium leading-relaxed line-clamp-3 mb-6">
                        {post.excerpt}
                      </p>

                      {/* Metadata Row */}
                      <div className="mt-auto flex items-center gap-4 text-slate-400 text-[13px] font-medium border-t border-slate-50 pt-4">
                        <div className="flex items-center gap-1.5">
                          <Calendar size={16} className="text-[#00df82]" />
                          {new Date(post.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Clock size={16} className="text-[#00df82]" />
                          {post.readTime || "5 min read"}
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Right Column: Sidebar */}
          <div className="w-full lg:w-[25%] space-y-0">
            <BlogCategories
              activeCategory={activeCategory}
              onCategoryChange={onCategoryChange}
            />

            {/* Newsletter Box - Stay ahead */}
            <div className="bg-gradient-to-br from-[#008080] via-[#2E4A9E] to-[#8A2BE2] rounded-[24px] px-6 py-5 text-white shadow-xl relative overflow-hidden group">
              {/* Background Glow */}
              <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 blur-3xl rounded-full translate-x-10 -translate-y-10" />

              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 bg-white/10 backdrop-blur-md rounded-lg flex items-center justify-center border border-white/20">
                    <Mail size={16} />
                  </div>
                  <h3 className="text-lg font-medium tracking-tight leading-tight">Stay ahead.</h3>
                </div>

                <p className="text-white/70 text-[10px] font-medium mb-4 leading-snug">
                  Get exclusive insights & updates delivered to your inbox.
                </p>

                <div className="space-y-2">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-white rounded-lg py-2 px-4 text-[#001529] text-[10px] focus:outline-none placeholder:text-slate-400 font-bold shadow-inner"
                  />
                  <button
                    disabled={submitting}
                    onClick={handleSubscribe}
                    className="w-full bg-[#001529] hover:bg-black text-white font-medium py-2 rounded-lg uppercase tracking-widest text-[9px] transition-all shadow-xl shadow-black/20"
                  >
                    {submitting ? 'SUBSCRIBING...' : 'SUBSCRIBE'}
                  </button>
                </div>

                <div className="mt-3 flex items-center gap-2 text-white/50 text-[8px] font-bold uppercase tracking-widest">
                  <Shield size={10} /> We respect your privacy.
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

// Internal Shield icon for privacy
const Shield = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
);

export default BlogFeaturedLayout;
