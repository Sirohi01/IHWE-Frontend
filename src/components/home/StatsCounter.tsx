import { useEffect, useRef, useState } from "react";
import { Globe, Users, TrendingUp, Heart } from "lucide-react";
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

const StatsCounter = () => {
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
        return (
            <div className="py-20 bg-[#F9FAFB] flex items-center justify-center">
                <div className="w-10 h-10 border-4 border-[#23471d] border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    if (!stats || stats.length === 0) return null;

    return (
        <section className="py-10 bg-[#F9FAFB] relative overflow-hidden">
            <div className="container mx-auto px-4 relative z-10">
                <div ref={sectionRef} className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {stats.map((s, index) => (
                        <StatCard
                            key={s._id || index}
                            icon={s.icon}
                            end={Number(s.end)}
                            prefix={s.prefix}
                            suffix={s.suffix}
                            label={s.label}
                            bg={s.bg}
                            overlay={s.overlay}
                            delay={index * 200} // Reduced delay for snappier feel
                            sectionVisible={visible}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default StatsCounter;
