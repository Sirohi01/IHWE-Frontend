import React from 'react';
import {
  Shield, User, Gavel, Cookie, Folder, Link as LinkIcon,
  FileText, UserCheck, Share2, Scale, Edit3, Building2,
  Calendar, Users, Handshake, Mail, Phone, Globe, Headset,
  Download, Leaf
} from 'lucide-react';
import SectionContainer from "@/components/layout/SectionContainer";
import TopImage from "@/assets/privacyPolicy/topImage.png";
import middleimage from "@/assets/privacyPolicy/middleImage.png";

const PrivacyPolicies = () => {
  return (
    <div className="min-h-screen bg-white font-inter text-[#0b1a3a]">
      <style type="text/css" media="print">
        {`
                    @page { size: auto; margin: 10mm; }
                    /* Force browsers to print background colors and images */
                    * {
                        -webkit-print-color-adjust: exact !important;
                        print-color-adjust: exact !important;
                    }
                    /* Hide everything in Layout except main */
                    #root > div > *:not(main) {
                        display: none !important;
                    }
                    /* Ensure main can expand fully for print */
                    main {
                        overflow: visible !important;
                    }
                `}
      </style>
      {/* MAIN CONTENT WRAPPER */}
      <div className="w-full">

        {/* 1. HERO SECTION */}
        <div className="relative w-full overflow-hidden min-h-[440px] bg-slate-50 flex items-center">
          <div className="absolute inset-0 z-0">
            <img
              src={TopImage}
              alt="Hero Background"
              className="w-full h-full object-cover object-center opacity-90"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-transparent"></div>
          </div>

          <SectionContainer className="relative z-10 py-2">
            <div className="max-w-2xl">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-[#2e7d32] font-black text-[12px] uppercase tracking-[0.3em]">Legal Information</span>
                <div className="w-10 h-[2px] bg-amber-500"></div>
              </div>

              <h1 className="text-[47px] lg:text-[57px] font-serif font-extrabold leading-[1.05] text-[#0b1a3a] mb-3">
                Privacy Policy – <br />
                <span className="text-[#2e7d32]">IHWE 2026</span>
              </h1>

              <div className="flex w-1/2 print:w-1/2 h-[4px] mb-4">
                <div className="w-[45%] bg-[#2e7d32]"></div>
                <div className="w-[55%] bg-amber-500"></div>
              </div>

              <div className="space-y-1 mb-4">
                <p className="text-[18px] font-black text-[#0b1a3a] leading-tight">Your privacy is our priority.</p>
                <p className="text-slate-600 text-[14px] font-medium leading-relaxed max-w-[480px]">Please read our policy below.</p>
              </div>

              <div className="flex flex-wrap gap-2 print:hidden">
                <button className="flex items-center gap-3 bg-[#004d40] text-white px-7 py-2 rounded-xl font-black text-sm hover:bg-[#00332c] transition-all shadow-xl tracking-tight">
                  <Mail className="w-5 h-5" />
                  CONTACT SUPPORT
                </button>
                <button onClick={() => window.print()} className="flex items-center gap-3 bg-white text-[#0b1a3a] border-2 border-slate-200 px-7 py-2 rounded-xl font-black text-sm hover:border-[#2e7d32] transition-all shadow-sm tracking-tight">
                  <Download className="w-5 h-5 text-[#2e7d32]" />
                  DOWNLOAD POLICY PDF
                </button>
              </div>
            </div>
          </SectionContainer>
        </div>

        {/* 2. OVERLAPPING INFO STRIP */}
        <SectionContainer className="mb-1 relative z-20 -mt-3">
          <div className="bg-white rounded-[1.5rem] shadow-sm border border-slate-200 grid grid-cols-1 md:grid-cols-4 print:grid-cols-1 divide-y md:divide-y-0 print:divide-y md:divide-x print:divide-x-0 divide-slate-100 overflow-hidden">
            {[
              {
                icon: Calendar,
                text: <>9th Edition of <br className="print:hidden" />International Health & <br className="print:hidden" />Wellness Expo 2026 <br className="print:hidden" />(IHWE – Global Edition) & <br className="print:hidden" />Associated Programs</>
              },
              {
                icon: Users,
                label: "Organised by:",
                text: <>Namo Gange <br className="print:hidden" />Wellness Pvt. Ltd.</>
              },
              {
                icon: Handshake,
                label: "In Association With:",
                text: <>International Council of <br className="print:hidden" />AYUSH (ICOA) – (Buyer- <br className="print:hidden" />Seller Meet) <br className="print:hidden" />Namo Gange Trust – <br className="print:hidden" />(Arogya Sanghoshti / <br className="print:hidden" />Conferences)</>
              },
              {
                icon: Calendar,
                label: "Last Updated",
                text: <>April 15, 2026</>
              }
            ].map((item, i) => (
              <div key={i} className="py-4 px-4 flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-[#004d40] flex items-center justify-center shrink-0 shadow-lg print:w-14 print:h-14">
                  <item.icon className="w-5 h-5 text-white" />
                </div>
                <div className="flex flex-col gap-0.5 flex-1">
                  {item.label && <span className="text-[#0b1a3a] font-black text-[11px] uppercase tracking-wider">{item.label}</span>}
                  <p className="text-[14px] font-black text-slate-700 leading-tight print:text-[15px]">{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </SectionContainer>



        {/* 3. COMMITMENT SECTION */}
        <div className="relative py-1 overflow-hidden bg-slate-50">
          <div className="absolute inset-0 w-full h-full" style={{
            backgroundImage: `url(${middleimage})`,
            backgroundSize: "100% 100%",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}>
          </div>
          <SectionContainer className="relative z-10 text-center max-w-4xl py-2">
            <h2 className="text-[38px] lg:text-[46px] font-serif font-extrabold text-[#0b1a3a] mb-2 leading-tight">
              Our Commitment to <span className="text-[#2e7d32]">Your Privacy</span>
            </h2>

            <div className="flex items-center justify-center gap-4 mb-2">
              <div className="w-16 h-[1.5px] bg-amber-500/60"></div>
              <Leaf className="w-6 h-6 text-[#2e7d32]" />
              <div className="w-16 h-[1.5px] bg-amber-500/60"></div>
            </div>

            <p className="text-slate-600 text-[14px] leading-relaxed font-medium max-w-3xl mx-auto uppercase tracking-tight">
              Namo Gange Wellness Pvt. Ltd. is committed to protecting your personal data and ensuring transparency. This Privacy Policy explains how we collect, use, protect and share your information.
            </p>
          </SectionContainer>
          {/* Decorative Divider */}
          <div className="flex items-center justify-center gap-4 py-3">
            <div className="w-16 h-[1.5px] bg-amber-500/60"></div>
            <Leaf className="w-6 h-6 text-[#2e7d32]" />
            <div className="w-16 h-[1.5px] bg-amber-500/60"></div>
          </div>
        </div>


        {/* 4. POLICY GRID */}
        <SectionContainer className="relative z-10 py-2">
          <div className="grid grid-cols-1 md:grid-cols-2 print:grid-cols-2 gap-2">
            {[
              { icon: Shield, title: "Scope & Applicability", desc: "This policy applies to all visitors, exhibitors, buyers, sponsors, delegates and partners engaging with IHWE 2026 through our website, registration forms, emails or events." },
              { icon: User, title: "User Rights", desc: "You have the right to access, update, correct or request deletion of your personal data by contacting us." },
              { icon: Gavel, title: "Legal Basis for Processing", desc: "We process personal data in accordance with applicable Indian laws including IT Act, 2000 and for legitimate business purposes." },
              { icon: Cookie, title: "Cookies & Tracking Technologies", desc: "We use cookies and analytics tools to enhance user experience. You can manage cookie preferences in your browser settings." },
              { icon: Folder, title: "Categories of Information", desc: "Personal, business, financial, technical and usage data collected for event execution and communication." },
              { icon: LinkIcon, title: "Third-Party Platforms", desc: "Our website may contain links to third-party sites. We are not responsible for their privacy practices or content." },
              { icon: FileText, title: "Purpose of Data Processing", desc: "To manage registrations, communicate updates, facilitate networking, improve experience and ensure smooth event operations." },
              { icon: UserCheck, title: "Children's Privacy", desc: "Our services are intended for business professionals. We do not knowingly collect data from individuals below 18 years." },
              { icon: Share2, title: "Data Sharing & Disclosure", desc: "Data may be shared with event partners, service providers and authorities where necessary and with your consent." },
              { icon: Scale, title: "Limitation of Liability", desc: "We are not liable for indirect or consequential damages arising from the use or inability to use our services." },
              { icon: Edit3, title: "Data Security Measures", desc: "We implement robust security practices to protect your data against unauthorized access, alteration, disclosure or destruction." },
              { icon: FileText, title: "Amendments to Policy", desc: "We may update this policy from time to time. Changes will be effective upon posting on our website." },
              { icon: Shield, title: "Data Retention Policy", desc: "Personal data is retained only as long as necessary for event execution, legal compliance and legitimate business purposes." },
              { icon: Building2, title: "Governing Law & Jurisdiction", desc: "This policy is governed by the laws of India. Jurisdiction lies with the courts in Delhi NCR, India." }
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-4 bg-white border border-slate-200 p-3 rounded-2xl hover:shadow-md transition-shadow group">
                <div className="w-14 h-14 rounded-full bg-[#f1f8e9] flex items-center justify-center shrink-0 group-hover:bg-[#2e7d32] transition-colors shadow-sm">
                  <item.icon className="w-7 h-7 text-[#2e7d32] group-hover:text-white transition-colors" />
                </div>
                <div className="space-y-1 pt-1">
                  <h4 className="text-[14px] font-black text-[#0b1a3a] leading-tight uppercase tracking-tight">{item.title}</h4>
                  <p className="text-[10px] text-slate-600 leading-tight font-medium">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </SectionContainer>



        {/* 5. CONTACT BANNER */}
        <SectionContainer className="py-4">
          <div className="bg-white rounded-[1.5rem] border border-slate-200 shadow-sm flex flex-col lg:flex-row print:flex-row items-center gap-0 lg:gap-6 print:gap-2 print:justify-between overflow-hidden break-inside-avoid">
            {/* Left: Headset icon + text */}
            <div className="flex flex-col sm:flex-row print:flex-row items-center gap-5 shrink-0 text-center sm:text-left print:text-left bg-[#f1f8e9] px-6 py-2">
              <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center shrink-0 shadow-sm">
                <Headset className="w-9 h-9 text-[#2e7d32]" />
              </div>
              <div className="flex flex-col">
                <h4 className="text-[#0b1a3a] font-black text-[18px] leading-tight">
                  Have Questions?<br />
                  We're here to help!
                </h4>
                <p className="text-slate-600 text-[12px] font-medium mt-1 max-w-[240px] leading-snug italic">
                  Reach out to us for any privacy related queries or concerns.
                </p>
              </div>
            </div>

            {/* Right: Contact items */}
            <div className="flex flex-col sm:flex-row print:flex-col items-start sm:items-center print:items-start gap-4 sm:gap-6 print:gap-2 flex-1 lg:justify-end print:justify-start w-full lg:w-auto print:w-full px-4 sm:px-2 py-2">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#004d40] flex items-center justify-center shrink-0">
                  <Mail className="w-4 h-4 text-white" />
                </div>
                <a href="mailto:info@namogangewellness.com" className="text-[#0b1a3a] font-semibold text-[13px] hover:text-[#2e7d32] transition-colors">info@namogangewellness.com</a>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#004d40] flex items-center justify-center shrink-0">
                  <Phone className="w-4 h-4 text-white" />
                </div>
                <a href="tel:+919654900525" className="text-[#0b1a3a] font-semibold text-[13px] hover:text-[#2e7d32] transition-colors whitespace-nowrap">+91-9654900525</a>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#004d40] flex items-center justify-center shrink-0">
                  <Globe className="w-4 h-4 text-white" />
                </div>
                <a href="https://namogangewellness.com" target="_blank" rel="noreferrer" className="text-[#0b1a3a] font-semibold text-[13px] hover:text-[#2e7d32] transition-colors">namogangewellness.com</a>
              </div>
            </div>
          </div>
        </SectionContainer>

      </div>
    </div>
  );
};

export default PrivacyPolicies;
