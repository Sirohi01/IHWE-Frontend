import React from 'react';
import { Users, UserCheck, Globe, Building2 } from 'lucide-react';
import { motion } from 'framer-motion';

const STATS = [
    { label: 'Trade Visitors', value: '20,000+', icon: Users },
    { label: 'Hosted Buyers', value: '500+', icon: UserCheck },
    { label: 'Countries', value: '25+', icon: Globe },
    { label: 'Exhibiting Brands', value: '100+', icon: Building2 },
];

const ExhibitorStats = () => {
    return (
        <section className="py-12 bg-[#fcfcfc] relative z-20 -mt-12">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                    {STATS.map((stat, idx) => (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: idx * 0.1 }}
                            className="flex flex-col items-center text-center group"
                        >
                            <div className="w-14 h-14 rounded-2xl bg-white shadow-xl flex items-center justify-center mb-4 group-hover:bg-green-600 transition-colors duration-500 border border-gray-100">
                                <stat.icon className="w-6 h-6 text-green-600 group-hover:text-white transition-colors duration-500" />
                            </div>
                            <h3 className="text-3xl font-black text-[#0a2e1f] mb-1 tracking-tight">{stat.value}</h3>
                            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">{stat.label}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ExhibitorStats;
