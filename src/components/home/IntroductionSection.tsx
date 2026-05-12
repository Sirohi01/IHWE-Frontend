import { motion, useInView, animate } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import SectionContainer from "../layout/SectionContainer";
import { 
  Stethoscope, Landmark, Leaf, Globe, Building2, GraduationCap, 
  Users, Handshake, Package, Sparkles, Camera, ShieldCheck, UserCheck, Activity, Award, Briefcase
} from "lucide-react";
import { introductionApi, SERVER_URL } from "../../lib/api";

const ICON_MAP: Record<string, React.ReactNode> = {
  Award: <Award size={32} className="text-[#1a6b3a]" />,
  Sparkles: <Sparkles size={32} className="text-[#3b6fd4]" />,
  Users: <Users size={32} className="text-[#1a6b3a]" />,
  Globe: <Globe size={32} className="text-[#3b6fd4]" />,
  Stethoscope: <Stethoscope size={32} className="text-[#1a6b3a]" />,
  Landmark: <Landmark size={32} className="text-[#3b6fd4]" />,
  Leaf: <Leaf size={32} className="text-[#1a6b3a]" />,
  Building2: <Building2 size={32} className="text-[#3b6fd4]" />,
  GraduationCap: <GraduationCap size={32} className="text-[#1a6b3a]" />,
  Handshake: <Handshake size={32} className="text-[#3b6fd4]" />,
  Package: <Package size={32} className="text-[#1a6b3a]" />,
  Camera: <Camera size={32} className="text-[#3b6fd4]" />,
  ShieldCheck: <ShieldCheck size={32} className="text-[#1a6b3a]" />,
  UserCheck: <UserCheck size={32} className="text-[#3b6fd4]" />,
  Activity: <Activity size={32} className="text-[#1a6b3a]" />,
  Briefcase: <Briefcase size={32} className="text-[#3b6fd4]" />,
};

const EventCountdown = ({ targetDateString }: { targetDateString?: string }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const targetDate = targetDateString ? new Date(targetDateString) : new Date("2026-08-21T00:00:00");
    const timer = setInterval(() => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();
      if (difference <= 0) {
        clearInterval(timer);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }
      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60)
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [targetDateString]);

  const boxes = [
    { label: "DAYS", value: timeLeft.days, color: "#d26019" },
    { label: "HOURS", value: timeLeft.hours, color: "#d26019" },
    { label: "MINS", value: timeLeft.minutes, color: "#1a6b3a" },
    { label: "SECS", value: timeLeft.seconds, color: "#1a6b3a" },
  ];

  return (
    <div className="flex gap-2 sm:gap-2.5 items-center">
      {boxes.map((box, i) => (
        <div key={i} className="flex flex-col items-center">
          <div
            className="w-10 h-10 md:w-12 md:h-12 rounded-xl border-2 flex items-center justify-center bg-white shadow-sm transition-colors duration-300"
            style={{ borderColor: box.color }}
          >
            <span
              className="text-base md:text-lg font-bold tabular-nums"
              style={{ color: box.color }}
            >
              {box.value.toString().padStart(2, '0')}
            </span>
          </div>
          <span className="text-[7px] font-bold uppercase tracking-widest text-slate-400 mt-1">{box.label}</span>
        </div>
      ))}
    </div>
  );
};

const StatCounter = ({ value }: { value: string }) => {
  const [displayValue, setDisplayValue] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const numericValue = parseInt(value.replace(/,/g, '')) || 0;
  const suffix = value.replace(/[0-9,]/g, '');

  useEffect(() => {
    if (isInView) {
      const controls = animate(0, numericValue, {
        duration: 3.5,
        ease: "easeOut",
        onUpdate(v) {
          setDisplayValue(Math.floor(v));
        },
      });
      return () => controls.stop();
    }
  }, [isInView, numericValue]);

  return (
    <span ref={ref}>
      {displayValue.toLocaleString()}{suffix}
    </span>
  );
};

const IntroductionSection = () => {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const introData = await introductionApi.get();
        if (introData) {
          setData(introData);
        }
      } catch (err) {
        console.error("Error fetching introduction data:", err);
      }
    };
    fetchData();
  }, []);

  if (!data) return null;

  const features = data.features || [];
  const sortedFeatures = [...features].sort((a, b) => (a.order || 0) - (b.order || 0));

  return (
    <section 
      className="pt-2 pb-8 overflow-hidden relative transition-colors duration-500 introduction-section-no-shadow"
      style={{ backgroundColor: data.bgColor || '#f5fcfd' }}
    >
      <style dangerouslySetInnerHTML={{ __html: `
        .introduction-section-no-shadow,
        .introduction-section-no-shadow *,
        .introduction-section-no-shadow .prose,
        .introduction-section-no-shadow .prose * {
          text-shadow: none !important;
          box-shadow: none !important;
          filter: none !important;
          -webkit-filter: none !important;
          backdrop-filter: none !important;
        }
      ` }} />
      <SectionContainer>
        <div className="grid lg:grid-cols-2 gap-8 items-start mb-2">
        {/* LEFT */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="pt-10"
        >
          <div 
            className="text-[11px] font-bold uppercase tracking-[.22em] text-[#1a6b3a] mb-3 prose prose-sm max-w-none [&_*]:[text-shadow:none!important]"
            style={{ textShadow: 'none' }}
            dangerouslySetInnerHTML={{ __html: data.subtitle }}
          />
          <div 
            className="text-[24px] md:text-[35px] font-extrabold text-[#0d2137] leading-[1.2] md:leading-[1.12] prose prose-xl max-w-none prose-headings:m-0 [&_*]:[text-shadow:none!important]"
            style={{ textShadow: 'none' }}
            dangerouslySetInnerHTML={{ __html: data.title }}
          />

          <div className="w-11 h-[3px] bg-[#1a6b3a] rounded mt-4 mb-4" />
          
          <div 
            className="text-[13px] md:text-[14px] leading-[1.8] text-[#3d5166] max-w-[520px] text-justify prose prose-sm max-w-none [&_*]:[text-shadow:none!important]"
            style={{ textShadow: 'none' }}
            dangerouslySetInnerHTML={{ __html: data.description }}
          />
        </motion.div>

        {/* RIGHT — Hero Image & Floating Countdown */}
        <motion.div
          initial={{ x: 60, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center justify-center relative pt-4 md:pt-10"
        >
          {/* Top-Right Countdown — Adjusted for Mobile */}
          <div className="relative md:absolute md:top-[40px] md:right-0 flex flex-col items-center md:items-end gap-1 z-20 mb-8 md:mb-0">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#1a6b3a]">Event Begins In</span>
            <EventCountdown />
          </div>

          <div className="relative mt-4 md:mt-20">
            {data.image && (
              <img
                src={`${SERVER_URL}${data.image}`}
                alt={data.altText || "IHWE Introduction"}
                className="w-full max-w-[850px] object-contain scale-100 md:scale-110 md:translate-x-4"
              />
            )}
          </div>
        </motion.div>
      </div>

      {/* STATS ROW */}
      <div className="flex flex-col md:flex-row items-start md:items-center pt-8 md:pt-0 mt-4 md:-mt-14 relative z-30 justify-start">
        {sortedFeatures.map((s: any, i: number) => (
          <div key={s._id || i} className="flex flex-col md:flex-row items-start md:items-center w-full md:w-auto">
            <div className="flex items-center gap-4 px-0 md:px-5 py-4 md:py-4 md:first:pl-0">
              <div className="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center border border-slate-100 md:border-none md:bg-transparent md:shadow-none md:w-auto md:h-auto">
                {ICON_MAP[s.icon] || <Award size={28} className="text-gray-400" />}
              </div>
              <div>
                <p className="text-[20px] md:text-[22px] font-extrabold text-[#3b6fd4] leading-none">
                  <StatCounter value={s.number} />
                </p>
                <p className="text-[9px] md:text-[8.5px] font-bold uppercase tracking-[.15em] text-[#6b8099] mt-1.5">{s.label}</p>
              </div>
            </div>
            {i < sortedFeatures.length - 1 && (
              <>
                <div className="hidden md:block w-px h-10 bg-slate-200" />
                <div className="block md:hidden w-full h-px bg-slate-100 my-1" />
              </>
            )}
          </div>
        ))}
        </div>
      </SectionContainer>
    </section>
  );
};

export default IntroductionSection;