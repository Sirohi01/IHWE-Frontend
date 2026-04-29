import { useEffect, useRef, useState } from "react";
import { Globe, Users, TrendingUp, Heart, Building } from "lucide-react";
import { cn } from "@/lib/utils";
import { countersApi, SERVER_URL } from "@/lib/api";

const ICON_MAP: Record<string, any> = {
    Globe,
    Users,
    TrendingUp,
    Heart
};

function useCountUp(end: number, duration: number, started: boolean) {
    const [count, setCount] = useState(0);
    useEffect(() => {
        if (!started) return;
        let startTime: number | null = null;
        const step = (ts: number) => {
            if (!startTime) startTime = ts;
            const progress = Math.min((ts - startTime) / duration, 1);
            setCount(Math.floor(progress * end));
            if (progress < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
    }, [started, end, duration]);
    return count;
}

type StatCardProps = {
    icon: string;
    end: number;
    prefix?: string;
    suffix: string;
    label: string;
    bg: string;
    overlay: number;
    delay: number;
    sectionVisible: boolean;
};

const StatCard = ({ icon, end, prefix = "", suffix, label, bg, overlay, delay, sectionVisible }: StatCardProps) => {
    const [started, setStarted] = useState(false);
    const Icon = ICON_MAP[icon] || Globe;

    useEffect(() => {
        if (!sectionVisible) return;
        const t = setTimeout(() => setStarted(true), delay);
        return () => clearTimeout(t);
    }, [sectionVisible, delay]);

    const count = useCountUp(end, 1600, started);

    return (
        <div className="relative overflow-hidden rounded-2xl group min-h-[140px] cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-500 border border-white/10">
            {/* Background Image */}
            <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                style={{ backgroundImage: `url(${SERVER_URL}${bg})` }}
            />

            {/* Dark Professional Overlay */}
            <div 
                className="absolute inset-0 transition-colors duration-500 group-hover:bg-black/50" 
                style={{ backgroundColor: `rgba(0, 0, 0, ${overlay})` }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-90" />

            {/* Top: icon */}
            <div className="relative z-10 p-4 pb-0 flex justify-end">
                <div className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center group-hover:bg-[#d26019] group-hover:scale-110 transition-all duration-500 shadow-sm">
                    <Icon className="w-4 h-4 text-white group-hover:text-white" />
                </div>
            </div>

            {/* Bottom: counter + label */}
            <div className="relative z-10 p-5 pt-4">
                <div className="text-3xl lg:text-4xl font-black text-white leading-none mb-1 tabular-nums tracking-tighter drop-shadow-xl">
                    {prefix}{count.toLocaleString()}{suffix}
                </div>
                <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/90 group-hover:text-white transition-colors duration-300">
                    {label}
                </div>
                {/* Animated underline on hover */}
                <div className="mt-3 h-1 w-0 bg-[#d26019] group-hover:w-16 transition-all duration-500 rounded-full" />
            </div>
        </div>
    );
};

interface StatsCounterProps {
    variant?: "default" | "hero";
}

const StatsCounter = ({ variant = "default" }: StatsCounterProps) => {
    const [stats, setStats] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const sectionRef = useRef<HTMLDivElement>(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const data = await countersApi.get();
                setStats(data);
            } catch (error) {
                console.error("Error fetching stats:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchStats();
    }, []);

    useEffect(() => {
        if (loading || !sectionRef.current) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setVisible(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.1 }
        );
        
        observer.observe(sectionRef.current);
        return () => observer.disconnect();
    }, [loading]);

    if (loading) {
        return variant === "default" ? (
            <div className="py-20 bg-[#F9FAFB] flex items-center justify-center">
                <div className="w-10 h-10 border-4 border-[#23471d] border-t-transparent rounded-full animate-spin"></div>
            </div>
        ) : null;
    }

    if (!stats || stats.length === 0) return null;

    if (variant === "hero") {
        const heroStats = [
            {
                number: 9, sup: "th", label: "EDITION", sub: "A Decade of Excellence",
                icon: <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z" strokeLinecap="round" strokeLinejoin="round" /></svg>
            },
            {
                number: 1500, sup: "+", label: "EXHIBITORS", sub: "Across 8 Successful Editions",
                icon: <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="9" cy="7" r="4" /><path d="M3 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2" strokeLinecap="round" strokeLinejoin="round" /><path d="M16 3.13a4 4 0 0 1 0 7.75" strokeLinecap="round" /><path d="M21 21v-2a4 4 0 0 0-3-3.87" strokeLinecap="round" /></svg>
            },
            {
                number: 10, sup: "+", label: "YEARS", sub: "Legacy of Trust & Growth",
                icon: <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" strokeLinecap="round" strokeLinejoin="round" /></svg>
            },
            {
                number: 500, sup: "Cr+", prefix: "₹", label: "BUSINESS OPPORTUNITIES", sub: "Generated Over the Years",
                icon: <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8"><line x1="12" y1="1" x2="12" y2="23" strokeLinecap="round" /><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" strokeLinecap="round" strokeLinejoin="round" /></svg>
            },
        ];

        return (
            <div className="relative z-30 w-full px-6 -mt-6 md:-mt-8">
                <div className="max-w-6xl mx-auto bg-white shadow-[0_20px_50px_rgba(0,0,0,0.12)] rounded-2xl overflow-hidden border border-gray-100/50 backdrop-blur-sm bg-white/95">
                    <div ref={sectionRef} className="grid grid-cols-2 md:grid-cols-4 divide-x divide-gray-100">
                        {heroStats.map((s, index) => {
                            return (
                                <div key={index} className="flex items-center gap-4 px-6 py-6 group hover:bg-slate-50 transition-colors duration-300">
                                    <div className="w-12 h-12 rounded-xl bg-[#f0f9f0] flex items-center justify-center shrink-0 group-hover:bg-[#23471d] transition-colors duration-300 text-[#23471d] group-hover:text-white shadow-sm transition-all duration-300">
                                        {s.icon}
                                    </div>
                                    <div className="flex flex-col">
                                        <div className="flex items-baseline leading-none mb-1 gap-1">
                                            {s.prefix && <span className="text-[#d26019] font-extrabold text-lg" style={{ fontFamily: "'Inter', sans-serif" }}>{s.prefix}</span>}
                                            <span className="text-[#d26019] font-extrabold text-2xl tabular-nums tracking-tight" style={{ fontFamily: "'Inter', sans-serif" }}>
                                                <CounterNumber end={s.number} started={visible} delay={index * 100} />
                                            </span>
                                            <span className="text-[#23471d] font-bold text-sm" style={{ fontFamily: "'Inter', sans-serif" }}>{s.sup}</span>
                                        </div>
                                        <p className="text-[#23471d] font-bold text-[9px] uppercase tracking-[0.18em] leading-tight" style={{ fontFamily: "'Inter', sans-serif" }}>{s.label}</p>
                                        <p className="text-slate-900 font-medium text-[9px] mt-1 line-clamp-1" style={{ fontFamily: "'Inter', sans-serif" }}>{s.sub}</p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <section className="py-10 bg-[#F9FAFB] relative overflow-hidden">
            <div className="container mx-auto px-4 relative z-10">
                <div ref={sectionRef} className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {stats.map((s, index) => (
                        <StatCard
                            key={s._id || index}
                            icon={s.icon}
                            end={isNaN(Number(s.end)) ? 0 : Number(s.end)}
                            prefix={s.prefix}
                            suffix={s.suffix}
                            label={s.label}
                            bg={s.bg}
                            overlay={s.overlay}
                            delay={index * 100}
                            sectionVisible={visible}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

// Helper component for count animation in hero variant
const CounterNumber = ({ end, started, delay }: { end: number, started: boolean, delay: number }) => {
    const [active, setActive] = useState(false);
    useEffect(() => {
        if (started) {
            const t = setTimeout(() => setActive(true), delay);
            return () => clearTimeout(t);
        }
    }, [started, delay]);
    const count = useCountUp(end, 1600, active);
    return <>{count.toLocaleString()}</>;
};

export default StatsCounter;
