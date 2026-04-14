import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { RefreshCw } from "lucide-react";
import { policyApi } from "@/lib/api";

const RefundPolicy = () => {
  const [policy, setPolicy] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPolicy = async () => {
      try {
        const data = await policyApi.getByPage("refund-policy");
        if (data) setPolicy(data);
      } catch (error) {
        console.error("Error fetching refund policy:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPolicy();
  }, []);

  return (
    <div className="bg-[#f9fafb] min-h-screen font-inter">
      <section className="relative pt-36 pb-20 overflow-hidden bg-slate-900 text-white">
        <div className="absolute inset-0 bg-black/40" />
        <div className="container mx-auto px-4 text-center relative z-10" data-aos="fade-up">
          <p className="text-sm uppercase tracking-[0.4em] mb-4 opacity-80">Legal Information</p>
          <h1 className="text-4xl md:text-6xl font-inter font-semibold mb-6 tracking-tight">
            {policy?.title || "Refund Policy"}
          </h1>
          <p className="text-white/70 text-base md:text-lg mb-8 max-w-2xl mx-auto font-light leading-relaxed">
            Please read our refund and cancellation policy carefully before booking.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-1 max-w-8xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white p-8 md:p-12 shadow-sm border border-slate-100 space-y-12 text-slate-700 leading-relaxed"
          >
            {isLoading ? (
              <div className="flex justify-center py-20">
                <div className="w-10 h-10 border-4 border-[#d26019] border-t-transparent rounded-full animate-spin"></div>
              </div>
            ) : policy ? (
              <div
                className="dynamic-content prose prose-slate max-w-none 
                  [&_h2]:text-2xl [&_h2]:md:text-3xl [&_h2]:font-inter [&_h2]:font-bold [&_h2]:text-slate-900 [&_h2]:mb-6 [&_h2]:mt-10
                  [&_h3]:text-xl [&_h3]:font-inter [&_h3]:font-bold [&_h3]:text-slate-800 [&_h3]:mb-4 [&_h3]:mt-8
                  [&_p]:mb-6 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-6 [&_ul]:space-y-2
                  [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:mb-6 [&_ol]:space-y-2
                  [&_strong]:font-bold [&_strong]:text-slate-900"
                dangerouslySetInnerHTML={{ __html: policy.content }}
              />
            ) : (
              <div className="text-center py-20 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200">
                <RefreshCw className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-slate-400">Refund Policy Not Found</h3>
                <p className="text-slate-400">This content is currently being updated.</p>
              </div>
            )}
            {policy && (
              <div className="text-xs text-slate-400 pt-10 border-t border-slate-100">
                Last Updated: {new Date(policy.updatedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              </div>
            )}
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default RefundPolicy;
