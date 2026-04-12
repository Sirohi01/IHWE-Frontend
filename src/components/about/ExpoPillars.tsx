import { Globe, Users, Lightbulb, BarChart3 } from "lucide-react";

const pillars = [
    {
        icon: Globe,
        title: "Global Networking",
        text: "Connect with healthcare leaders, policy makers, and pioneers from over 25+ countries in a high-octane professional environment.",
        color: "text-[#23471d]",
        bgColor: "bg-[#23471d]/10",
    },
    {
        icon: Users,
        title: "B2B Matchmaking",
        text: "Facilitating structured meetings between exhibitors and decision-makers to drive real business growth and partnerships.",
        color: "text-[#d26019]",
        bgColor: "bg-[#d26019]/10",
    },
    {
        icon: Lightbulb,
        title: "Innovation Showcase",
        text: "Experience the future of medical technology, from AI-driven diagnostics to breakthrough wellness solutions.",
        color: "text-[#23471d]",
        bgColor: "bg-[#23471d]/10",
    },
    {
        icon: BarChart3,
        title: "Knowledge Hub",
        text: "Engage in scientific conferences and leadership summits that tackle the most pressing challenges in global health.",
        color: "text-[#d26019]",
        bgColor: "bg-[#d26019]/10",
    },
];

const ExpoPillars = () => {
    return (
        <section className="py-20 bg-transparent">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16" data-aos="fade-up">
                    <div className="flex items-center justify-center gap-3 mb-4">
                        <div className="h-px w-8 bg-[#23471d]" />
                        <span className="uppercase tracking-[0.4em] text-[#23471d] font-bold text-xs">
                            The Expo Core
                        </span>
                        <div className="h-px w-8 bg-[#23471d]" />
                    </div>
                    <h2 className="text-3xl md:text-5xl font-inter text-slate-900 leading-tight max-w-2xl mx-auto">
                        Our Core Pillars for <br />
                        <span className="text-[#d26019]">Healthcare Excellence</span>
                    </h2>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {pillars.map((pillar, idx) => (
                        <div
                            key={idx}
                            data-aos="fade-up"
                            data-aos-delay={idx * 100}
                            className="p-8 bg-white border-t-4 border-[#23471d] hover:border-[#d26019] transition-all duration-300 shadow-sm hover:shadow-xl group"
                        >
                            <div className={`w-14 h-14 ${pillar.bgColor} flex items-center justify-center mb-6 group-hover:bg-[#d26019] transition-colors duration-300`}>
                                <pillar.icon className={`w-7 h-7 ${pillar.color} group-hover:text-white transition-colors duration-300`} />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-4 font-inter">
                                {pillar.title}
                            </h3>
                            <p className="text-slate-600 text-sm leading-relaxed">
                                {pillar.text}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ExpoPillars;
