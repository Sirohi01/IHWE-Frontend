import React from 'react';
import { motion } from 'framer-motion';
import exhibitorBg from '../../assets/exhibitor.webp';
import h1 from '../../assets/h1.png';
import h2 from '../../assets/h2.png';
import h3 from '../../assets/h3.png';
import h4 from '../../assets/h4.png';

const STATS = [
    { label: 'Years of Legacy', value: '10+', icon: h4 },
    { label: 'Visitors/Delegates', value: '8,000+', icon: h1 },
    { label: 'EXHIBITORS', value: '150+', icon: h2 },
    { label: 'GLOBAL BUYERS', value: '1,000+', icon: h3 },

];

const ExhibitorHero = () => {
    return (
        <section
            className="relative w-full overflow-hidden bg-black font-inter text-white flex items-center aspect-[0.75/1] sm:aspect-[16/9] md:aspect-[21/9] lg:aspect-[16/7] min-h-[380px] md:min-h-[420px] lg:min-h-[480px]"
            style={{
                backgroundImage: `url(${exhibitorBg})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
            }}
        >
            {/* Subtle Gradient Overlay for text readability on left side */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent z-10" />

            <div className="relative z-20 max-w-[1400px] mx-auto px-6 md:px-12 w-full h-full flex flex-col justify-center items-start">
                <div className="max-w-4xl">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0a3622] border border-green-500/20 mb-1"
                    >
                        <span className="text-[10px] uppercase tracking-[0.2em] font-black text-[#86efac]">
                            Trusted By
                        </span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-2xl md:text-2xl lg:text-5xl font-bold leading-[1.05] tracking-tight uppercase mb-1"
                    >
                        150+ <span className="text-green-500">Leading</span><br />
                        Health & Wellness Brands
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="font-light mb-4 max-w-2xl text-white/85 leading-relaxed tracking-wide text-sm md:text-lg"
                    >
                        India's most influential health, Ayurveda, fitness and wellness companies have chosen IHWE as the platform to showcase, connect and grow.
                    </motion.p>

                    {/* Stats Row */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 border-t border-white/70 w-full max-w-3xl">
                        {STATS.map((stat, idx) => (
                            <motion.div
                                key={stat.label}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.6 + (idx * 0.1) }}
                                className="flex flex-col gap-2 mb-2"
                            >
                                <div className="w-10 h-10 md:w-14 md:h-14 flex items-center justify-start mt-2">
                                    <img src={stat.icon} alt={stat.label} className="w-8 h-8 md:w-12 md:h-12 object-contain" />
                                </div>
                                <div>
                                    <div className="text-xl font-bold text-white">{stat.value}</div>
                                    <div className="text-[10px] font-bold text-white uppercase tracking-widest leading-tight">{stat.label}</div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ExhibitorHero;
