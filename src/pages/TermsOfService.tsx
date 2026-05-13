import React, { useEffect, useState } from "react";
import {
  Handshake, Users, CreditCard, Tag, Ban, CalendarX,
  Wallet, AlertTriangle, Scale, Shield, Calendar, User, Globe, Mail, MapPin, Loader2, Phone,
  ShieldCheck, Printer
} from "lucide-react";
import { policyApi } from "@/lib/api";
import termBanner from "@/assets/termPage.jpeg";
import team1Icon from "@/assets/team1.png";
import doc22Icon from "@/assets/doc22.png";
const getIconForTitle = (title: string) => {
  const t = title.toLowerCase();
  if (t.includes("acceptance")) return Shield;
  if (t.includes("scope")) return CreditCard;
  if (t.includes("confirmation")) return ShieldCheck;
  if (t.includes("pricing") || t.includes("tax")) return Tag;
  if (t.includes("refund") || t.includes("transfer")) return Ban;
  if (t.includes("cancel") || t.includes("reschedul")) return CalendarX;
  if (t.includes("mode")) return Wallet;
  if (t.includes("fail") || t.includes("dispute")) return AlertTriangle;
  if (t.includes("chargeback") || t.includes("fraud")) return Shield;
  if (t.includes("role") || t.includes("partner")) return Users;
  if (t.includes("liability") || t.includes("limitat")) return AlertTriangle;
  if (t.includes("indemnity")) return ShieldCheck;
  if (t.includes("force majeure")) return Globe;
  if (t.includes("govern") || t.includes("jurisdiction")) return Scale;
  return Shield;
};
const parseContent = (htmlContent: string) => {
  if (!htmlContent) return null;
  const regex = /<(h[1-4]|strong|b|u)[^>]*>(.*?)<\/\1>|(?:\r?\n|^)\s*([A-Z][^<.\n\r]{2,80})(?:\r?\n|$)|<p[^>]*>\s*<(strong|b|u|h[1-4])[^>]*>(.*?)<\/\4>\s*<\/p>/gim;

  const rawMatches = Array.from(htmlContent.matchAll(regex));
  const uniqueMatches: any[] = [];
  const seenIndices = new Set<number>();

  rawMatches.forEach(m => {
    const titleText = (m[2] || m[3] || m[5] || "")
      .replace(/<[^>]*>?/gm, "")
      .replace(/&nbsp;/g, " ")
      .replace(/&amp;/g, "&")
      .replace(/&quot;/g, '"')
      .trim();
    const cleanTitle = titleText.replace(/^\d+[\s.)-]+\s*/, "").trim();
    if (cleanTitle.length > 2 && cleanTitle.length < 100 && !cleanTitle.endsWith('.') && !seenIndices.has(m.index)) {
      uniqueMatches.push({
        index: m.index,
        length: m[0].length,
        title: cleanTitle
      });
      seenIndices.add(m.index);
    }
  });
  uniqueMatches.sort((a, b) => a.index - b.index);

  if (uniqueMatches.length === 0) {
    return {
      preamble: "",
      terms: [{ id: 1, title: "Terms of Service", content: htmlContent }]
    };
  }

  const preamble = htmlContent.substring(0, uniqueMatches[0].index).trim();
  const terms = [];

  for (let i = 0; i < uniqueMatches.length; i++) {
    const current = uniqueMatches[i];
    const next = uniqueMatches[i + 1];

    const contentStart = current.index + current.length;
    const contentEnd = next ? next.index : htmlContent.length;
    const content = htmlContent.substring(contentStart, contentEnd).trim();

    if (current.title) {
      terms.push({
        id: i + 1,
        title: current.title,
        content: content
      });
    }
  }

  return { preamble, terms };
};

const TermsOfService: React.FC = () => {
  const [policy, setPolicy] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPolicy = async () => {
      try {
        const data = await policyApi.getByPage("terms-of-service");
        setPolicy(data);
      } catch (error) {
        console.error("Failed to fetch terms:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPolicy();
  }, []);

  const parsedData = policy ? parseContent(policy.content) : null;

  return (
    <div className="bg-[#f8f9fa] min-h-screen font-inter pb-1">
      <style dangerouslySetInnerHTML={{
        __html: `
        @media print {
          /* Hide only the print button */
          .print-hidden { 
            display: none !important; 
          }

          /* Force background colors and images */
          body, * {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }

          /* Reset margins for full banner printing */
          @page {
            margin: 0 !important;
          }

          body { 
            background-color: white !important; 
            padding: 0 !important;
            margin: 0 !important;
          }

          #root, main, .bg-[#f8f9fa] {
            padding-top: 0 !important;
            margin-top: 0 !important;
          }

          /* Keep Hero and Info Bar but adjust for paper */
          .bg-[#eef5f0] { background-color: #eef5f0 !important; }
          .bg-white { background-color: white !important; }
          .bg-[#115d33] { background-color: #115d33 !important; }

          /* Preserve the layout as much as possible */
          .rounded-3xl, .rounded-[20px] { 
            border-radius: 12px !important; 
            border: 1px solid #f1f5f9 !important;
          }

          .shadow-[0_2px_20px_rgb(0,0,0,0.03)], 
          .shadow-[0_8px_30px_rgb(0,0,0,0.05)] { 
            box-shadow: 0 4px 10px rgba(0,0,0,0.05) !important; 
          }

          /* Force single column for print readability */
          .grid-cols-1.lg\\:grid-cols-2 { 
            grid-template-columns: 1fr !important; 
            display: block !important;
          }

          .lg\\:border-r { 
            border-right: none !important; 
            border-bottom: 1px solid #f1f5f9 !important; 
          }

          /* Force Contact Bar into a single line for print */
          .terms-contact-bar {
            flex-direction: row !important;
            flex-wrap: nowrap !important;
            width: 100% !important;
          }
          .terms-contact-bar > div:first-child {
            width: auto !important;
            padding-right: 20px !important;
          }
          .terms-contact-items {
            flex-direction: row !important;
            justify-content: space-between !important;
            flex: 1 !important;
            padding: 0 10px !important;
          }
          .terms-contact-items > div {
            padding: 0 !important;
            margin: 0 !important;
          }
          .terms-contact-items .hidden.md\\:block {
            display: block !important;
          }

          /* Hide floating global elements only */
          nav, footer:not(.terms-footer), header, 
          [class*="bg-[#002511]"], /* Target Topbar */
          .fixed, 
          aside,
          .xl\\:hidden,
          [class*="fixed"], [class*="z-[100]"], [class*="z-[90]"] {
            display: none !important;
          }

          /* Section spacing */
          section { 
            page-break-inside: auto;
            margin-bottom: 8px !important;
            padding-top: 0 !important;
            padding-bottom: 0 !important;
          }

          /* Tighten overlap and paddings */
          .relative.z-10.w-full.mx-auto.px-6.md\\:px-12.max-w-\\[1400px\\].-mt-6.md\\:-mt-8 {
            margin-top: -15px !important;
          }

          .p-4, .md\\:p-6 {
            padding: 12px !important;
          }

          /* Tighten term card content */
          .flex.items-start.gap-4 {
            gap: 12px !important;
          }
          
          .prose {
            max-width: 100% !important;
          }

          .prose p, .prose ul {
            margin-bottom: 4px !important;
          }

          .mt-1 {
            margin-top: 2px !important;
          }

          .mt-4 {
            margin-top: 4px !important;
          }

          /* Banner Text Adjustments */
          h1 {
            font-size: 32px !important;
            line-height: 1.2 !important;
            margin-bottom: 10px !important;
            display: block !important;
          }
          h1 br {
            display: block !important;
            content: "" !important;
            margin-top: 5px !important;
          }
          h1 span {
            display: inline-block !important;
          }
        }
      ` }} />

      {/* Hero Section */}
      <section className="relative w-full flex flex-col items-center">
        <div className="w-full relative h-[280px] sm:h-[330px] md:h-[380px] lg:h-[430px] bg-[#eef5f0] overflow-hidden">
          {/* Background Layer */}
          <div className="absolute inset-0 w-full h-full">
            <img
              src={termBanner}
              alt="Terms Banner"
              className="w-full h-full object-cover object-center"
            />
          </div>

          {/* Overlay Text */}
          <div className="absolute inset-0 flex items-center">
            <div className="w-full mx-auto px-6 md:px-12 max-w-[1400px]">
              <div className="max-w-2xl relative z-10 p-4 md:p-0">
                <h1 className="text-3xl md:text-5xl lg:text-[54px] font-[900] text-[#0f2e1d] leading-[1.1] mb-2 tracking-tight">
                  Terms & Conditions – <br className="hidden md:block" />
                  IHWE <span className="text-[#32965d]">2026</span>
                </h1>
                <div className="w-16 h-1 bg-[#32965d] rounded-full my-4 md:my-6"></div>
                <p className="text-[#0f2e1d] font-[800] text-sm md:text-[15px] tracking-wide">
                  Please read these terms carefully before proceeding.
                </p>

                <div className="mt-6 md:mt-8 print-hidden">
                  <button
                    onClick={() => window.print()}
                    className="group flex items-center gap-2.5 px-6 py-3 bg-[#115d33] hover:bg-[#0c3120] text-white rounded-xl shadow-lg transition-all duration-300 font-[800] text-[12px] uppercase tracking-wider hover:scale-[1.02] active:scale-95"
                  >
                    <Printer className="w-4 h-4" strokeWidth={2.5} />
                    <span>Print Document</span>
                    <div className="w-1.5 h-1.5 rounded-full bg-white/40 animate-pulse ml-1" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Info Bar overlapping the bottom of the image */}
        <div className="relative z-10 w-full mx-auto px-6 md:px-12 max-w-[1400px] -mt-6 md:-mt-8">
          <div className="w-full bg-white rounded-[20px] shadow-[0_8px_30px_rgb(0,0,0,0.05)] border border-gray-100 px-6 py-3 md:px-8 md:py-3.5 flex flex-col lg:flex-row gap-6 lg:gap-8 items-center">

            {/* Col 1 */}
            <div className="flex gap-4 items-center w-full lg:w-5/12">
              <div className="w-12 h-12 md:w-[52px] md:h-[52px] flex items-center justify-center shrink-0">
                <img src={doc22Icon} alt="IHWE Edition" className="w-full h-full object-contain" />
              </div>
              <div className="flex flex-col justify-center">
                <span className="text-[#115d33] font-[800] text-[12px] md:text-[13px] tracking-wide mb-0.5">9th Edition of</span>
                <h3 className="font-[900] text-slate-800 text-[12px] md:text-[12px] leading-tight">International Health & Wellness Expo 2026</h3>
                <p className="text-slate-600 text-[11px] md:text-[12.5px] font-[700] mt-0.5">(IHWE – Global Edition) & Associated Programs</p>
              </div>
            </div>

            <div className="hidden lg:block w-px bg-gray-200 self-stretch min-h-[40px]"></div>

            {/* Col 2 */}
            <div className="flex gap-3 md:gap-4 items-center w-full lg:w-3/12">
              <div className="w-10 h-10 md:w-11 md:h-11 rounded-full bg-[#f0f7f3] border border-[#115d33]/20 flex items-center justify-center shrink-0 p-1.5">
                <img src={team1Icon} alt="Organised By" className="w-full h-full object-contain" />
              </div>
              <div className="flex flex-col justify-center">
                <span className="text-slate-800 font-[800] text-[10px] md:text-[11px] uppercase tracking-wider mb-0.5">Organised by:</span>
                <p className="font-[800] text-slate-600 text-[12px] md:text-[13px] leading-snug">Namo Gange Wellness<br />Pvt. Ltd.</p>
              </div>
            </div>

            <div className="hidden lg:block w-px bg-gray-200 self-stretch min-h-[40px]"></div>

            {/* Col 3 */}
            <div className="flex gap-3 md:gap-4 items-center w-full lg:w-4/12">
              <div className="w-10 h-10 md:w-11 md:h-11 rounded-full bg-[#f0f7f3] border border-[#115d33]/20 flex items-center justify-center shrink-0">
                <Handshake className="w-4 h-4 md:w-5 md:h-5 text-[#115d33]" strokeWidth={1.5} />
              </div>
              <div className="flex flex-col justify-center w-full">
                <span className="text-slate-800 font-[800] text-[10px] md:text-[11px] uppercase tracking-wider mb-0.5">In Association With:</span>
                <p className="font-[700] text-slate-800 text-[11px] leading-snug">International Council of AYUSH (ICOA) – <br /><span className="text-slate-500 font-medium">(Buyer-Seller Meet)</span></p>
                <div className="w-full h-px bg-gray-100 my-1.5"></div>
                <p className="font-[700] text-slate-800 text-[11px] leading-snug">Namo Gange Trust – <br /><span className="text-slate-500 font-medium">(Arogya Sanghosthi / Conferences)</span></p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="pt-2 md:pt-2 pb-10 w-full">
        <div className="w-full mx-auto px-6 md:px-12 max-w-[1400px]">
          {isLoading ? (
            <div className="flex justify-center py-10">
              <Loader2 className="w-10 h-10 text-[#0c3120] animate-spin" />
            </div>
          ) : !parsedData ? (
            <div className="text-center py-10">
              <Shield className="w-12 h-12 text-slate-300 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-slate-400">Terms Content Not Found</h3>
            </div>
          ) : (
            <>
              <div className="bg-white rounded-3xl shadow-[0_2px_20px_rgb(0,0,0,0.03)] border border-gray-200 overflow-hidden">
                <div className="grid grid-cols-1 lg:grid-cols-2">
                  {parsedData.terms.map((term, index) => {
                    const Icon = getIconForTitle(term.title);
                    const isLastRow = index >= parsedData.terms.length - (parsedData.terms.length % 2 === 0 ? 2 : 1);
                    return (
                      <div
                        key={index}
                        className={`p-4 md:p-6 flex flex-col ${index % 2 === 0 ? 'lg:border-r border-gray-100' : ''} ${!isLastRow ? 'border-b border-gray-100' : ''}`}
                      >
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 md:w-[60px] md:h-[60px] rounded-full bg-[#f6f9f7] border border-[#115d33]/15 flex items-center justify-center shrink-0 shadow-sm">
                            <Icon className="w-6 h-6 md:w-7 md:h-7 text-[#115d33]" strokeWidth={1.5} />
                          </div>
                          <div className="flex flex-col pt-1">
                            <div className="flex items-center gap-3">
                              <span className="text-sm md:text-[17px] font-[900] text-slate-900 leading-none">
                                {term.id.toString().padStart(2, '0')}
                              </span>
                              <h3 className="text-[16px] md:text-[16px] font-[900] text-slate-900 leading-none">
                                {term.title}
                              </h3>
                            </div>
                            <div className="mt-1">
                              <div
                                className="prose prose-sm prose-slate max-w-none
                                     [&_ul]:list-none [&_ul]:pl-0 [&_ul]:space-y-2 [&_li]:text-slate-600 [&_li]:relative [&_li]:pl-5 [&_li]:text-[12px] md:[&_li]:text-[12.5px] [&_li]:leading-[1.6]
                                     [&_li::before]:content-['•'] [&_li::before]:absolute [&_li::before]:left-0 [&_li::before]:text-slate-900 [&_li::before]:font-black
                                     [&_p]:text-slate-600 [&_p]:leading-[1.6] [&_p]:mb-0 [&>*:not(:last-child)]:mb-4 [&_p]:text-[12.5px] md:[&_p]:text-[12.5.5px]
                                     [&_a]:text-[#115d33] [&_a]:font-semibold [&_a]:underline"
                                dangerouslySetInnerHTML={{ __html: term.content }}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Contact Footer */}
                <div className="bg-[#fdfefd] border-t border-gray-100 flex flex-col lg:flex-row items-stretch terms-contact-bar">
                  <div className="bg-[#f4f7f2] font-[900] text-slate-900 text-[15px] md:text-lg px-8 py-3 md:py-4 flex items-center justify-center lg:justify-start lg:w-2/12">
                    Contact:
                  </div>

                  <div className="flex-1 flex flex-col md:flex-row items-center justify-between px-6 py-4 md:py-0 terms-contact-items">
                    <a
                      href="mailto:info@namogangewellness.com"
                      className="flex items-center gap-2.5 md:h-full py-2 md:py-0 hover:text-[#115d33] transition-colors"
                    >
                      <Mail className="w-5 h-5 text-[#0c3120] fill-[#0c3120]/10" strokeWidth={1.5} />
                      <span className="text-[13px] md:text-[14px] font-[700] text-slate-600">info@namogangewellness.com</span>
                    </a>

                    <div className="hidden md:block w-px h-6 bg-gray-200"></div>

                    <a
                      href="tel:+919654900525"
                      className="flex items-center gap-2.5 md:h-full py-2 md:py-0 hover:text-[#115d33] transition-colors"
                    >
                      <Phone className="w-5 h-5 text-[#0c3120] fill-[#0c3120]/10" strokeWidth={1.5} />
                      <span className="text-[13px] md:text-[14px] font-[700] text-slate-600">9654900525</span>
                    </a>

                    <div className="hidden md:block w-px h-6 bg-gray-200"></div>

                    <a
                      href="https://namogangewellness.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2.5 md:h-full py-2 md:py-0 hover:text-[#115d33] transition-colors"
                    >
                      <Globe className="w-5 h-5 text-[#0c3120] fill-[#0c3120]/10" strokeWidth={1.5} />
                      <span className="text-[13px] md:text-[14px] font-[700] text-slate-600">namogangewellness.com</span>
                    </a>
                  </div>
                </div>
              </div>
            </>
          )}

          {policy && (
            <div className="mt-4 pl-4 md:pl-6 print-hidden">
              <p className="text-[9px] md:text-[10px] text-slate-400 font-[800] uppercase tracking-wider">
                LAST UPDATED: {new Date(policy.updatedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }).toUpperCase()}
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default TermsOfService;
