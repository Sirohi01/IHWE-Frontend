import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Info } from "lucide-react";
import { useSearchParams } from "react-router-dom";
import { termsApi, eventApi } from "@/lib/api";

const TermsOfService = () => {
  const [searchParams] = useSearchParams();
  const eventId = searchParams.get("eventId");
  const pageName = searchParams.get("page") || "terms-of-service";

  const [termsContent, setTermsContent] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTerms = async () => {
      try {
        let targetEventId = eventId;
        if (!targetEventId) {
            const events = await eventApi.getActive();
            if (events && events.length > 0) {
                targetEventId = events[0]._id;
            }
        }
        
        if (targetEventId) {
            const data = await termsApi.getByPage(pageName, targetEventId);
            setTermsContent(data);
        }
      } catch (err) {
        console.error("Error fetching terms:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchTerms();
  }, [eventId, pageName]);

  return (
    <div className="bg-[#f9fafb] min-h-screen font-inter">
      {/* Hero Section */}
      <section className="relative pt-36 pb-20 overflow-hidden bg-slate-900 text-white">
        <div className="absolute inset-0 bg-black/40" />
        <div className="container mx-auto px-4 text-center relative z-10" data-aos="fade-up">
          <p className="text-sm uppercase tracking-[0.4em] mb-4 opacity-80">Legal Information</p>
          <h1 className="text-4xl md:text-6xl font-serif font-semibold mb-6 italic tracking-tight">
            Terms & Conditions
          </h1>
          <p className="text-white/70 text-base md:text-lg mb-8 max-w-2xl mx-auto font-light leading-relaxed">
            Please read these terms carefully before proceeding.
          </p>
        </div>
        <div
          className="absolute bottom-0 left-0 w-full h-16 bg-[#f9fafb]"
          style={{ clipPath: "ellipse(60% 100% at 50% 100%)" }}
        />
      </section>

      {/* Content Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white p-8 md:p-12 shadow-sm border border-slate-100 space-y-12 text-slate-700 leading-relaxed min-h-[400px]"
          >
            {loading ? (
                <div className="flex items-center justify-center p-12 text-slate-400 font-bold uppercase tracking-widest text-sm">Loading Terms...</div>
            ) : termsContent ? (
                <div>
                  <div className="flex items-center gap-3 mb-8 pb-4 border-b border-slate-100">
                    <Info className="w-8 h-8 text-[#d26019]" />
                    <h2 className="text-2xl md:text-3xl font-serif font-bold text-slate-900">{termsContent.title}</h2>
                  </div>
                  <div 
                    className="prose prose-slate max-w-none text-slate-700 space-y-4"
                    dangerouslySetInnerHTML={{ __html: termsContent.content }}
                  />
                  <div className="text-xs text-slate-400 pt-10 mt-10 border-t border-slate-100 uppercase font-bold tracking-widest">
                    Last Updated: {new Date(termsContent.updatedAt).toLocaleDateString()}
                  </div>
                </div>
            ) : (
                <div className="text-center p-12 text-slate-500 font-medium">
                  No terms and conditions found for the selected event. Please contact support.
                </div>
            )}
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default TermsOfService;
