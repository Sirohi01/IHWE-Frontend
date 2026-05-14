import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Mail } from 'lucide-react';
import axios from 'axios';
import { SERVER_URL } from '@/lib/api';
import { toast } from 'sonner';

interface BlogLatestProps {
  blogs: any[];
}

const BlogLatest: React.FC<BlogLatestProps> = ({ blogs }) => {
  const [email, setEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const marqueeBlogs = [...blogs, ...blogs, ...blogs, ...blogs];

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

  return (
    <section className="pt-4 pb-2 bg-white">
      <div className="container mx-auto px-5 md:px-12">

        <div className="flex flex-col lg:flex-row gap-8 items-stretch">

          {/* Latest Articles Marquee Area (Left - 75%) */}
          <div className="w-full lg:w-3/4 overflow-hidden">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-3">
                <div className="w-1 h-6 bg-[#00df82] rounded-full" />
                <h2 className="text-[#001529] text-xl font-black uppercase tracking-tight">LATEST ARTICLES</h2>
              </div>
            </div>

            <div 
              className="relative flex overflow-hidden"
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
            >
              <motion.div
                className="flex gap-6 py-4 px-2"
                animate={{
                  x: isPaused ? undefined : [0, -2400], 
                }}
                transition={{
                  x: {
                    repeat: Infinity,
                    repeatType: "loop",
                    duration: 50, 
                    ease: "linear",
                  },
                }}
                style={{ width: 'fit-content' }}
              >
                {marqueeBlogs.map((blog, idx) => (
                  <Link
                    key={idx}
                    to={`/blog/${blog.slug}`}
                    className="group flex flex-col bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all overflow-hidden w-[240px] shrink-0"
                  >
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <img
                        src={`${SERVER_URL}${blog.image}`}
                        alt={blog.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute top-3 left-3">
                        <span className="bg-black/20 backdrop-blur-md text-white text-[8px] font-black uppercase tracking-widest px-2 py-1 rounded">
                          {blog.category || "HEALTHCARE"}
                        </span>
                      </div>
                    </div>
                    <div className="p-4 flex flex-col flex-1">
                      <h3 className="text-[#001529] font-black text-[13px] leading-snug group-hover:text-[#00df82] transition-colors mb-3 line-clamp-2">
                        {blog.title}
                      </h3>
                      <div className="mt-auto flex items-center gap-3 text-slate-400 text-[9px] font-bold">
                        <span>{new Date(blog.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                        <span className="opacity-40">|</span>
                        <span>{blog.readTime || "5 min read"}</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </motion.div>

              {/* Edge fading */}
              <div className="absolute inset-y-0 left-0 w-10 bg-gradient-to-r from-white to-transparent z-10" />
              <div className="absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-white to-transparent z-10" />
            </div>
          </div>

          {/* Stay Updated Sidebar (Right - 25%) - Restored */}
          <div className="w-full lg:w-1/4 pt-16">
            <div className="bg-[#001529] rounded-[24px] p-6 flex flex-col">
              <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center mb-4 text-[#00df82]">
                <Mail size={20} />
              </div>
              <h3 className="text-white text-md font-black uppercase tracking-tight mb-2">STAY UPDATED</h3>
              <p className="text-white/60 text-[11px] font-medium mb-6 leading-relaxed">
                Subscribe to our newsletter and never miss an update.
              </p>

              <div className="space-y-3">
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-transparent border border-white/20 rounded-xl py-2.5 px-4 text-white text-[11px] focus:outline-none focus:border-[#00df82] transition-colors"
                />
                <button
                  disabled={submitting}
                  onClick={handleSubscribe}
                  className="w-full bg-[#00df82] hover:bg-[#00c572] disabled:opacity-50 text-[#001529] font-black py-2.5 rounded-xl uppercase tracking-widest text-[10px] transition-all shadow-lg shadow-[#00df82]/20"
                >
                  {submitting ? 'Subscribing...' : 'SUBSCRIBE'}
                </button>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default BlogLatest;
