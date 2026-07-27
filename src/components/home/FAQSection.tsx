import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus, HelpCircle } from "lucide-react";
import { faqApi, SERVER_URL } from "@/lib/api";
import leaf from "@/assets/leaf.png";
import SectionContainer from "@/components/layout/SectionContainer";

// Fallback static data shown while loading or if API fails
const fallbackData = {
  subheading: "Support & Info",
  heading: "Frequently Asked",
  highlightText: "Questions",
  description: "Find answers to common inquiries about the 9th International Health & Wellness Expo 2026.",
  items: [
    { _id: "1", question: "What is the 9th International Health & Wellness Expo 2026?", answer: "The 9th International Health & Wellness Expo (IHWE) is India's premier global platform for healthcare excellence, bringing together medical professionals, industry leaders, and wellness innovators.", image: "" },
    { _id: "2", question: "Who should participate in this Expo?", answer: "Medical device manufacturers, healthcare providers, hospital administrators, wellness practitioners, government health departments, and trade visitors.", image: "" },
    { _id: "3", question: "How can I register as a visitor or exhibitor?", answer: "Click the 'Register Now' button in the navigation menu and select your category (Visitor, Exhibitor, Buyer, or Speaker).", image: "" },
  ]
};

const FAQSection = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);
  const [faqData, setFaqData] = useState<any>(fallbackData);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await faqApi.get();
        if (result) {
          setFaqData(result);
        }
      } catch (error) {
        console.error("Error fetching FAQ data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const items = faqData?.items || [];

  return (
    <section className="pt-8 pb-8 bg-white border-t border-gray-100 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-32 md:w-56 h-auto pointer-events-none z-0">
        <img loading="lazy" decoding="async" src={leaf} alt="decoration" className="w-full h-full object-contain rotate-[110deg] -translate-x-1/3 translate-y-[5%]" />
      </div>
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#23471d]/[0.01] rounded-full blur-[80px] -mr-48 -mt-48" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#d26019]/[0.01] rounded-full blur-[80px] -ml-48 -mb-48" />

      <SectionContainer className="relative z-10">
        {/* Section Header */}
        <div className="text-center mb-10">
          <div className="flex items-center justify-center gap-3 mb-2">
            <div className="h-px w-8 bg-[#23471d]" />
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#23471d]">
              {faqData?.subheading || "Support & Info"}
            </span>
            <div className="h-px w-8 bg-[#23471d]" />
          </div>
          <h2 className="text-xl md:text-2xl lg:text-3xl font-inter font-semibold text-slate-900 leading-tight">
            {faqData?.heading || "Frequently Asked"}{" "}
            <span className="text-[#134812]">{faqData?.highlightText || "Questions"}</span>
          </h2>
          <p className="mt-3 text-slate-800 max-w-2xl mx-auto text-xs md:text-sm leading-relaxed">
            {faqData?.description}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT COLUMN: Accordions */}
          <div className="lg:col-span-7 space-y-3">
            {items.map((item: any, index: number) => {
              const isActive = activeIndex === index;
              return (
                <motion.div
                  key={item._id || index}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.08 }}
                  className={`group transition-all duration-300 overflow-hidden border ${
                    isActive
                      ? "border-slate-200 bg-white shadow-sm border-l-4 border-l-[#d26019]"
                      : "border-slate-100 hover:border-slate-200 bg-white"
                  }`}
                >
                  <button
                    onClick={() => setActiveIndex(isActive ? null : index)}
                    className="w-full px-5 py-3 flex items-center justify-between text-left gap-4"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 ${
                        isActive ? "bg-[#23471d] text-white" : "bg-slate-50 text-slate-400"
                      }`}>
                        <HelpCircle className="w-3.5 h-3.5" />
                      </div>
                      <span className="font-bold text-[15px] transition-colors duration-300 text-black">
                        {item.question}
                      </span>
                    </div>
                    <div className={`shrink-0 w-5 h-5 border flex items-center justify-center transition-all duration-300 ${
                      isActive ? "bg-[#d26019] border-[#d26019] text-white" : "bg-white border-slate-200 text-slate-400"
                    }`}>
                      {isActive ? <Minus className="w-3 h-3" /> : <Plus className="w-3 h-3" />}
                    </div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isActive && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        style={{ overflow: "hidden" }}
                      >
                        <div className="px-5 pb-4 pt-1">
                          <div className="space-y-2">
                            <div className="h-0.5 w-10 bg-slate-100" />
                            <p className="text-slate-600 leading-relaxed text-[13px] text-justify">
                              {item.answer}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>

          {/* RIGHT COLUMN: Synced Image */}
          <div className="lg:col-span-5 lg:sticky lg:top-32 order-first lg:order-last mb-8 lg:mb-0">
            <div className="relative aspect-[4/3] bg-white border-2 border-slate-100 overflow-hidden shadow-md rounded-xl">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex ?? "none"}
                  initial={{ opacity: 0, scale: 1.04 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  className="absolute inset-0"
                >
                  {activeIndex !== null && items[activeIndex]?.image ? (
                    <img loading="lazy" decoding="async" src={items[activeIndex].image.startsWith('http') ? items[activeIndex].image : `${SERVER_URL}${items[activeIndex].image}`}
                      alt={items[activeIndex]?.imageAlt || items[activeIndex]?.question}
                      className="w-full h-full object-cover"
                    />
                  ) : faqData?.defaultImage ? (
                    <img loading="lazy" decoding="async" src={faqData.defaultImage.startsWith('http') ? faqData.defaultImage : `${SERVER_URL}${faqData.defaultImage}`}
                      alt={faqData?.defaultImageAlt || "9th International Health & Wellness Expo 2026"}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center text-slate-300 p-8 text-center">
                      <HelpCircle className="w-10 h-10 mb-3 opacity-20" />
                      <p className="text-[10px] font-bold uppercase tracking-widest opacity-40 mb-2">
                        {activeIndex !== null ? items[activeIndex]?.question : "Select a question"}
                      </p>
                      <div className="h-px w-16 bg-slate-200 mx-auto" />
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
              {/* Corner decor */}
              <div className="absolute top-3 left-3 w-4 h-4 border-l border-t border-slate-200 pointer-events-none" />
              <div className="absolute bottom-3 right-3 w-4 h-4 border-r border-b border-slate-200 pointer-events-none" />
            </div>

            {/* CTA below image */}
            <div className="mt-3 p-3.5 bg-white border border-slate-100 shadow-sm text-center">
              <p className="text-slate-500 text-[11px] font-medium mb-2">
                "Still have questions about exhibiting at IHWE 2026?"
              </p>
              <Link
                to="/contact"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-[#23471d] text-white px-5 py-2 text-[9.5px] font-bold uppercase tracking-[0.2em] hover:bg-[#1a3a14] transition-all shadow-sm"
              >
                Contact Our Help Desk
              </Link>
            </div>
          </div>
        </div>
      </SectionContainer>
    </section>
  );
};

export default FAQSection;
