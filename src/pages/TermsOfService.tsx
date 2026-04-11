import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Info, Shield } from "lucide-react";
import { policyApi } from "@/lib/api";

const TermsOfService = () => {
  const [policy, setPolicy] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPolicy = async () => {
      try {
        const data = await policyApi.getByPage("terms-of-service");
        if (data) {
          setPolicy(data);
        }
      } catch (error) {
        console.error("Error fetching terms of service:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPolicy();
  }, []);

  return (
    <div className="bg-white min-h-screen font-inter">
      {/* Hero Section */}
      <section className="relative pt-32 pb-16 bg-slate-900 border-b border-white/10 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20" />
        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="text-4xl md:text-6xl font-serif font-bold text-white mb-6">
            {policy?.title || "Terms & Conditions"}
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Please read these terms carefully before proceeding.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-slate-50/50 p-8 md:p-12 rounded-3xl border border-slate-100 min-h-[400px]"
          >
            {isLoading ? (
              <div className="flex justify-center py-20">
                <div className="w-10 h-10 border-4 border-[#d26019] border-t-transparent rounded-full animate-spin"></div>
              </div>
            ) : policy ? (
              <div 
                className="dynamic-content prose prose-slate max-w-none 
                  [&_h2]:text-2xl [&_h2]:md:text-3xl [&_h2]:font-serif [&_h2]:font-bold [&_h2]:text-slate-900 [&_h2]:mb-6 [&_h2]:mt-10
                  [&_h3]:text-xl [&_h3]:font-serif [&_h3]:font-bold [&_h3]:text-slate-800 [&_h3]:mb-4 [&_h3]:mt-8
                  [&_p]:mb-6 [&_p]:text-slate-600 [&_p]:leading-relaxed
                  [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-6 [&_ul]:space-y-2
                  [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:mb-6 [&_ol]:space-y-2
                  [&_strong]:font-bold [&_strong]:text-slate-900"
                dangerouslySetInnerHTML={{ __html: policy.content }} 
              />
            ) : (
              <div className="text-center py-20">
                <Shield className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-slate-400">Terms Content Not Found</h3>
                <p className="text-slate-400">Please check back later.</p>
              </div>
            )}

            {policy && (
              <div className="mt-12 pt-8 border-t border-slate-200 text-xs text-slate-400 uppercase tracking-widest font-bold">
                Last Updated: {new Date(policy.updatedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              </div>
            )}
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default TermsOfService;
