import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '@/context/BuyerAuthContext';
import { buyerApi } from '@/lib/buyer/api';
import HeroSection from '@/components/home/HeroSection';

function InfoGrid({ rows }) {
    return (
        <div className="border border-slate-200 rounded-sm overflow-hidden bg-white">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
                {rows.map(([label, value], i) => (
                    <div
                        key={i}
                        className="flex border-r border-b border-slate-200 last:border-r-0 hover:bg-slate-50/40 transition"
                    >
                        <div className="w-[120px] min-w-[120px] px-2 py-2 text-[10px] font-semibold text-slate-500 uppercase border-r border-slate-200 bg-slate-50 flex items-center font-sans">
                            {label}
                        </div>
                        <div className="flex-1 px-2 py-2 text-[11px] text-slate-800 flex items-center break-all font-sans">
                            {value ?? '—'}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

function Section({ title, children }) {
    return (
        <div className="mb-6">
            <div className="flex items-center gap-2 mb-2">
                <div className="w-1 h-3.5 bg-[#23471d] rounded-full" />
                <span className="font-extrabold text-[10px] text-[#23471d] uppercase tracking-widest font-sans">
                    {title}
                </span>
            </div>
            {children}
        </div>
    );
}

export default function Overview() {
    const { currentBuyer } = useAuth();
    const [stats, setStats] = useState({ totalBuyers: 0, completedPayments: 0 });

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const response = await buyerApi.getStats();
                if (response.data.success) {
                    setStats(response.data.stats);
                }
            } catch (error) {
                console.error("Error fetching global stats:", error);
            }
        };
        fetchStats();
    }, []);

    if (!currentBuyer) return null;

    return (
        <div className="space-y-6 animate-fadeIn pb-10">
            {/* Hero Section */}
            <div className="rounded-md overflow-hidden shadow-sm border border-slate-200">
                <HeroSection onRegisterVisit={() => { }} forceNewTab={true} />
            </div>

            {/* Main Content Card */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white border border-slate-200 p-6 rounded-md shadow-sm"
            >
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 pb-4 border-b">
                    <div>
                        <h2 className="text-[16px] font-black uppercase text-slate-800 tracking-tight font-sans">
                            {currentBuyer.fullName}
                        </h2>
                        <p className="text-[10px] text-slate-400 uppercase font-bold tracking-widest font-sans mt-0.5">
                            {currentBuyer.companyName} · {currentBuyer.registrationCategory}
                        </p>
                    </div>

                    <div className="flex items-center gap-2">
                        <span className={`px-3 py-1 text-[10px] font-black border uppercase tracking-widest font-sans ${currentBuyer.paymentStatus === 'Completed'
                                ? 'border-emerald-200 bg-emerald-50 text-emerald-700'
                                : 'border-amber-200 bg-amber-50 text-amber-700'
                            }`}>
                            {currentBuyer.paymentStatus}
                        </span>
                        <span className="bg-[#23471d] text-white px-3 py-1 text-[10px] font-black uppercase tracking-widest font-sans">
                            {currentBuyer.registrationId}
                        </span>
                    </div>
                </div>

                <div className="space-y-6">
                    <Section title="Registration Overview">
                        <InfoGrid rows={[
                            ['Registration ID', currentBuyer.registrationId],
                            ['Category', currentBuyer.registrationCategory],
                            ['Payment Status', currentBuyer.paymentStatus],
                            ['Registration Date', currentBuyer.createdAt ? new Date(currentBuyer.createdAt).toLocaleDateString() : '—'],
                            ['Member Since', '2026 Edition'],
                            ['Primary Interest', currentBuyer.primaryProductInterest],
                        ]} />
                    </Section>

                    <Section title="Professional Profile">
                        <InfoGrid rows={[
                            ['Designation', currentBuyer.designation],
                            ['Email', currentBuyer.emailAddress],
                            ['Mobile', currentBuyer.mobileNumber],
                            ['City', currentBuyer.city],
                            ['Country', currentBuyer.country],
                            ['Business Type', currentBuyer.businessType],
                        ]} />
                    </Section>

                    <Section title="Sourcing Requirements">
                        <InfoGrid rows={[
                            ['Buying Frequency', currentBuyer.buyingFrequency],
                            ['Annual Volume', currentBuyer.estimatedAnnualPurchaseValue],
                            ['Purchase Timeline', currentBuyer.purchaseTimeline],
                            ['Pricing Pref.', currentBuyer.pricingPreference],
                        ]} />
                    </Section>
                </div>

                {/* Quick Actions */}
                <div className="flex flex-wrap gap-2 mt-8 pt-6 border-t">
                    <button className="px-4 py-2 bg-slate-800 text-white text-[10px] font-black uppercase tracking-widest font-sans hover:bg-black transition-colors">
                        View Full Dossier
                    </button>
                    <button className="px-4 py-2 bg-[#23471d] text-white text-[10px] font-black uppercase tracking-widest font-sans hover:bg-[#1a3516] transition-colors">
                        Print Badge
                    </button>
                    <button className="px-4 py-2 border border-slate-200 text-slate-600 text-[10px] font-black uppercase tracking-widest font-sans hover:bg-slate-50 transition-colors">
                        Support Desk
                    </button>
                </div>
            </motion.div>
        </div>
    );
}

