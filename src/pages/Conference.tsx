import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Users, Mic, Calendar, Clock,
  ArrowRight, MapPin,
  CheckCircle2, Sparkles,
  Presentation, Users2,
  MessageSquare, Award,
  ChevronRight, Play
} from "lucide-react";
import { heroBackgroundApi, SERVER_URL } from "@/lib/api";
import confeHeroFallback from "../assets/confe.jpg";

// Detailed Conference Data
const conferenceSchedule = {
  "Day 1": {
    date: "11th July 2025",
    sessions: [
      {
        time: "09:00 AM - 10:00 AM",
        title: "Registration & Networking",
        type: "General",
        icon: Users2,
        description: "Arrival of delegates, collection of badges, and morning refreshments in the main atrium."
      },
      {
        time: "10:00 AM - 11:30 AM",
        title: "Welcome Address and Conference Inauguration",
        type: "Keynote",
        speaker: "Ministry Official & Expo Directors",
        org: "Department of Health",
        icon: Mic,
        description: "Official opening of IHWE 2025, outlining the vision for global health integration."
      },
      {
        time: "11:30 AM - 12:00 PM",
        title: "INDIVIDUAL PRESENTATION: Bridging Government & Diagnostics",
        type: "Presentation",
        speaker: "Mr. Vijay Kumar",
        role: "CCO",
        org: "Transasia Bio-Medicals Ltd.",
        icon: Presentation,
        talkpoints: [
          "Aligning Diagnostics with National Health Missions",
          "Public-Private Partnerships for Reach & Cost-Efficiency",
          "Scaling 'Make in India' in Govt Diagnostics"
        ]
      },
      {
        time: "12:00 PM - 12:20 PM",
        title: "INDIVIDUAL PRESENTATION: Simulation in Healthcare",
        type: "Technical",
        speaker: "Mr. Ajit Kumar",
        role: "Vice President-Sales",
        org: "Mavericks",
        icon: Play,
        talkpoints: [
          "Safe learning environment without risk to real patients",
          "Enhancing Clinical skills and Decision-Making",
          "Simulation in curriculum development",
          "Maverick's Role in Research & Development of New Medical Simulators"
        ]
      },
      {
        time: "12:20 PM - 12:35 PM",
        title: "INDIVIDUAL PRESENTATION: NRDC's Critical Role in Startup India & Make in India",
        type: "Presentation",
        speaker: "Mr. Vivek Kumar Jain",
        role: "Senior Manager",
        org: "National Research Development Corporation",
        icon: Presentation,
        talkpoints: [
          "Acts as a key enabler and facilitator for promoting innovation, entrepreneurship, and indigenous technology development",
          "Plays a central role in bridging the gap between R&D and industry by commercializing technologies developed in public-funded R&D institutions",
          "Implements the Indian Oil Startup Scheme as an official partner, fostering energy sector innovations",
          "Supports Startups, MSMEs, and entrepreneurs through technology licensing, technical consultancy, and incubation support"
        ]
      },
      {
        time: "12:35 PM - 01:30 PM",
        title: "PANEL DISCUSSION: Government Initiatives Pushing Digital Diagnostics",
        type: "Panel",
        moderator: "Mr. Rajeev Chhibber",
        role: "Vice President - External Affairs",
        org: "Sahajanand Medical Technologies",
        icon: MessageSquare,
        talkpoints: [
          "The Role of Academia and Startups in Disrupting Traditional Diagnostics",
          "Collaboration models that work",
          "Funding, incubation, and IP challenges",
          "Success stories: from campus to clinic"
        ],
        panelists: [
          "Mr. Aditya Das, Director & Head MHD, BIS",
          "Dr. Amit Agrawal, Additional Director, Fortis Hospital Delhi",
          "Dr. Taruna Madan, Scientist G and Head, Development Research, Indian Council of Medical Research"
        ]
      },
      {
        time: "01:30 PM - 01:45 PM",
        title: "White Paper Launch: Single Specialty - Care At Scale BY Praxis Global Alliance",
        type: "Event",
        icon: Award,
        description: "Official launch of the white paper focusing on specialized care models."
      },
      {
        time: "01:45 PM - 02:30 PM",
        title: "PANEL DISCUSSION: How India Can Take The Leap Towards Local Manufacturing In Medical Devices",
        type: "Panel",
        moderator: "Mr. Ayush Singh",
        role: "Practice Member, Healthcare and Lifesciences",
        org: "Praxis Global Alliance",
        icon: MessageSquare,
        talkpoints: [
          "What to local Indian companies need to do to become more competitive in manufacturing?",
          "How are multi nationals viewing this opportunity to localize and manufacture in India?",
          "Are Indian made products ready for the world?",
          "How can Indian manufactured products be differentiated?",
          "IS there shift from China? Will India benefit? Why?",
          "What further can the govt do to enable Make in India?",
          "What are some of the intrinsic challenges?"
        ],
        panelists: [
          "Dr. Dinesh Verma, Co Founder CEO, Dumfries Visionostics",
          "Mr. Ambarish Jajodia, Director of Business Development (Strategy and M&A), Danaher Corporation",
          "Mr. Tanmay kumar, Deputy General Manager-Head of Suppy Chain Management, BPL Medical Technologies Pvt Ltd.",
          "Mr. Prashant Rai, Associate Vice President, Transasia Bio-Medicals"
        ]
      },
      {
        time: "02:30 PM - 02:45 PM",
        title: "INDIVIDUAL PRESENTATION: Human Touch Meets High Tech: Nursing Leadership In Era of healthcare 360",
        type: "Presentation",
        speaker: "Captain Bobby Ramesh",
        role: "Group Director - Nursing Excellence",
        org: "Sarvodaya Healthcare Faridabad",
        icon: Presentation,
        talkpoints: [
          "Balance Empathy with innovation.",
          "Lead technology adoption without losing compassion.",
          "Redesign care models around patient-centered tech.",
          "Strengthen nurse-patient connection through smart tools.",
          "Cultivate a digitally fluent, emotionally intelligent workforce.",
          "Drive interdisciplinary collaboration with tech integration.",
          "Champion holistic, tech-enabled nursing excellence."
        ]
      },
      {
        time: "02:45 PM - 03:35 PM",
        title: "PANEL DISCUSSION: Driving Procurement Access and Transparency through GeM",
        type: "Panel",
        icon: MessageSquare,
        description: "Discussion on streamlining procurement and enhancing transparency in healthcare through Government e-Marketplace."
      }
    ]
  },
  "Day 2": {
    date: "12th July 2025",
    sessions: [
      {
        time: "09:30 AM - 10:45 AM",
        title: "Global Biotech Innovation Forum",
        type: "Presentation",
        speaker: "Dr. Elena Vance",
        org: "Biotech Global",
        icon: Sparkles,
        description: "Showcasing breakthrough research in genomic medicine and cellular therapies."
      },
      {
        time: "11:00 AM - 12:30 PM",
        title: "WORKSHOP: Future of Ayurvedic Integration",
        type: "Workshop",
        speaker: "Ayush Practitioners Council",
        org: "Ministry of AYUSH",
        icon: Award,
        description: "Hands-on session exploring the integration of traditional medicine with modern clinical practice."
      }
    ]
  },
  "Day 3": {
    date: "13th July 2025",
    sessions: [
      {
        time: "10:00 AM - 11:30 AM",
        title: "The Zero-Emission Hospital: Future of Healthcare Infrastructure",
        type: "Panel",
        moderator: "Prof. Michael Sterling",
        panelists: ["Infrastructure Directors", "Sustainability Experts"],
        icon: MapPin,
        description: "Discussing sustainable building practices and carbon-neutral energy solutions for modern hospitals."
      },
      {
        time: "02:00 PM - 04:00 PM",
        title: "Closing Plenary: Health 2030 Vision",
        type: "Keynote",
        speaker: "Global Healthcare Coalition",
        icon: CheckCircle2,
        description: "Summarizing findings and setting the roadmap for the next decade of wellness."
      }
    ]
  }
};

const Conference = () => {
  const [activeTab, setActiveTab] = useState("Day 1");
  const [heroData, setHeroData] = useState<any>(null);

  useEffect(() => {
    const fetchHero = async () => {
      try {
        const data = await heroBackgroundApi.getByPage("General / Conference");
        if (data) setHeroData(data);
      } catch (error) {
        console.error("Error fetching hero:", error);
      }
    };
    fetchHero();
  }, []);

  return (
    <div className="bg-[#f9fafb] min-h-screen font-inter">
      {/* ── HERO SECTION - Standardized 16:4 Sleek Style ── */}
      <section
        className="hero-background-standard"
        style={{ 
          backgroundImage: `url(${heroData?.backgroundImage ? `${SERVER_URL}${heroData.backgroundImage}` : confeHeroFallback})`
        }}
      >
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute bottom-0 left-0 w-full h-4 md:h-8 bg-[#f9fafb]" style={{ clipPath: "ellipse(60% 100% at 50% 100%)" }} />

        <div className="container mx-auto px-4 text-center text-white relative z-10" data-aos="fade-up">
          <p className="text-sm uppercase tracking-[0.4em] mb-4 opacity-80">
            {heroData?.title || "Knowledge & Innovation"}
          </p>
          <h1 className="text-4xl md:text-6xl font-inter font-semibold mb-6 tracking-tight">
            {heroData?.heading || "Conference Agenda"}
          </h1>
          <p className="text-white/70 text-base md:text-lg mb-8 max-w-2xl mx-auto font-light leading-relaxed">
            {heroData?.shortDescription || "Gathering the world's most brilliant minds to discuss the future of global healthcare and wellness."}
          </p>
        </div>
      </section>

      {/* TABBED SCHEDULE SECTION */}
      <section className="mt-8 md:-mt-8 pb-20 relative z-20">
        <div className="container mx-auto px-4">
          {/* Header Summary - Tightened */}
          <div className="max-w-4xl mx-auto text-center mb-10" data-aos="fade-up">
            <div className="inline-flex items-center gap-3 mb-4">
              <div className="h-px w-6 bg-[#23471d]" />
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#23471d]">Program Schedule</span>
              <div className="h-px w-6 bg-[#23471d]" />
            </div>
            <h2 className="text-3xl md:text-4xl font-inter text-slate-900 mb-4">
              Expert <span className="text-[#23471d]">Insights</span> & Dialogues
            </h2>
          </div>

          {/* Tabs Navigation - Matched to Screenshot */}
          <div className="flex justify-center mb-10">
            <div className="flex flex-wrap justify-center gap-4">
              {Object.keys(conferenceSchedule).map((day) => (
                <button
                  key={day}
                  onClick={() => setActiveTab(day)}
                  className={`px-8 py-3 rounded-xl text-[13px] font-bold transition-all duration-300 border ${activeTab === day
                    ? "bg-[#23471d] text-white border-[#23471d] shadow-lg shadow-[#23471d]/20 scale-105"
                    : "bg-white text-slate-600 border-slate-200 hover:border-[#23471d]/30"
                    }`}
                >
                  {day} — {conferenceSchedule[day as keyof typeof conferenceSchedule].date}
                </button>
              ))}
            </div>
          </div>

          {/* Schedule Table Style */}
          <div className="max-w-6xl mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="bg-white border border-slate-300 shadow-sm overflow-hidden rounded-[2px]"
              >
                <div className="bg-slate-50 border-b border-slate-300 px-6 py-4">
                  <h2 className="text-lg font-inter font-bold text-slate-900 uppercase tracking-tight flex items-baseline gap-0.5">
                    IHWE — <span className="text-[#23471d]">{activeTab}</span> Program Schedule
                  </h2>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mt-0.5">Interactive Knowledge Forum 2025</p>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <tbody className="divide-y divide-slate-200">
                      {conferenceSchedule[activeTab as keyof typeof conferenceSchedule].sessions.map((session, idx) => (
                        <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                          {/* Time Column */}
                          <td className="w-48 md:w-64 p-6 md:p-8 border-r border-slate-200 align-top bg-slate-50/30">
                            <div className="flex items-center gap-2 text-[#23471d] mb-1">
                              <Clock className="w-3.5 h-3.5" />
                              <span className="text-[14px] font-bold text-slate-800">
                                {session.time}
                              </span>
                            </div>
                            <div className="mt-2 inline-flex items-center gap-1.5 px-2 py-0.5 bg-slate-100 rounded text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                              {session.type}
                            </div>
                          </td>

                          {/* Content Column */}
                          <td className="p-6 md:p-8 align-top">
                            <h3 className="text-[17px] md:text-[19px] font-bold text-slate-900 mb-4 leading-snug">
                              {session.title}
                            </h3>

                            {/* Talkpoints */}
                            {session.talkpoints && (
                              <div className="mb-6">
                                <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-3">TALKPOINTS:</p>
                                <div className="space-y-2.5">
                                  {session.talkpoints.map((point, i) => (
                                    <div key={i} className="flex items-start gap-2.5">
                                      <CheckCircle2 className="w-4 h-4 text-[#23471d] mt-0.5 shrink-0" />
                                      <span className="text-[13px] text-slate-600 leading-relaxed font-medium">{point}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}

                            {/* Description */}
                            {session.description && (
                              <p className="text-slate-500 text-[13px] leading-relaxed mb-6 max-w-3xl">
                                {session.description}
                              </p>
                            )}

                            {/* Speaker Section */}
                            {(session.speaker || session.moderator) && (
                              <div className="mt-6 pt-5 border-t border-slate-200">
                                {session.speaker && (
                                  <div className="mb-3">
                                    <span className="text-[13px] font-bold text-slate-900">{session.speaker}</span>
                                    <span className="text-[13px] text-slate-500">, {session.role}, {session.org}</span>
                                  </div>
                                )}
                                {session.moderator && (
                                  <div className="mb-4">
                                    <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-1.5">MODERATOR:</p>
                                    <p className="text-[13px] font-bold text-slate-900">{session.moderator}</p>
                                  </div>
                                )}
                                {session.panelists && (
                                  <div>
                                    <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-1.5">PANELISTS:</p>
                                    <div className="space-y-1">
                                      {session.panelists.map((p, pIdx) => (
                                        <p key={pIdx} className="text-[13px] font-bold text-slate-800">{p}</p>
                                      ))}
                                    </div>
                                  </div>
                                )}
                              </div>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Conference;
