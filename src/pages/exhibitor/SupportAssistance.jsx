import React from 'react';
import { 
    Search, MessageSquare, Ticket, HelpCircle, BookOpen, Download, PhoneCall, 
    ChevronRight, MessageCircle, Phone, FileText, Clock, BarChart2, 
    ShieldCheck, Zap, CheckCircle, Target, Mail, User
} from 'lucide-react';
import SupportAgentImg from '@/assets/ss.webp';
import cc1Image from '@/assets/cc1.webp';
import cc2Image from '@/assets/cc2.webp';
import cc3Image from '@/assets/cc3.webp';
import cc4Image from '@/assets/cc4.webp';
import cc5Image from '@/assets/cc5.webp';
import cc6Image from '@/assets/cc6.webp';

export default function SupportAssistance() {
    return (
        <div className="min-h-screen bg-white px-6 py-2 md:px-8 md:py-0" style={{ fontFamily: '"Inter", sans-serif' }}>
            <div className="max-w-7xl mx-auto space-y-6">
                
                {/* Header (Optional based on layout, but sidebar has header, let's keep it clean) */}
                <div className="hidden">
                    <h1 className="text-2xl font-bold text-slate-800">Support & Assistance</h1>
                </div>

                <div className="flex flex-col lg:flex-row gap-6">
                    {/* Left Column (Main Content) */}
                    <div className="flex-1 min-w-0 space-y-6">
                        
                        {/* Hero Section */}
                        <div className="bg-[#eef6ef] rounded-xl px-8 pb-8 pt-4 relative overflow-hidden flex flex-col md:flex-row items-start justify-between shadow-sm min-h-[220px]">
                            <div className="z-10 w-full md:w-3/5 space-y-4 mt-6">
                                <div>
                                    <h2 className="text-xl font-bold text-slate-800 mb-2 whitespace-nowrap">We're Here to Help You Succeed!</h2>
                                    <p className="text-sm font-medium text-slate-600">Dedicated support for all your <span className="font-bold text-emerald-700">IHWE 2026</span> needs.</p>
                                </div>
                                <div className="relative w-full max-w-sm">
                                    <input 
                                        type="text" 
                                        placeholder="Search for help, issues or guides..." 
                                        className="w-full pl-4 pr-10 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 shadow-sm text-xs font-medium"
                                    />
                                    <div className="absolute right-2 top-1/2 -translate-y-1/2 w-6 h-6 bg-slate-100 rounded-lg flex items-center justify-center">
                                        <Search size={12} className="text-slate-500" />
                                    </div>
                                </div>
                            </div>
                            
                            {/* Decorative Agent Image Area */}
                            <img 
                                src={SupportAgentImg} 
                                alt="Support Agent" 
                                className="hidden md:block absolute right-8 bottom-0 h-[220px] object-contain z-10"
                            />
                        </div>

                        {/* How can we help you? */}
                        <div className="bg-white rounded-2xl px-4 pb-4 pt-2 lg:px-5 lg:pb-5 lg:pt-2.5 border border-slate-200/60" style={{ boxShadow: 'rgba(0, 0, 0, 0.05) 0px 0px 0px 1px' }}>
                            <h3 className="text-[16px] font-bold text-[#1e293b] mb-3">How can we help you?</h3>
                            <div className="grid grid-cols-2 md:grid-cols-6 gap-2 lg:gap-3">
                                {/* Live Chat */}
                                <div className="bg-white rounded-xl py-2 px-2 lg:py-2 lg:px-2 flex flex-col items-center justify-center text-center cursor-pointer hover:shadow-md transition-all" style={{ boxShadow: 'rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px' }}>
                                    <img src={cc1Image} alt="Live Chat" className="w-10 h-10 object-contain mb-2" />
                                    <h4 className="text-[12px] lg:text-[13px] font-bold text-slate-800 mb-1">Live Chat</h4>
                                    <p className="text-[9px] lg:text-[10px] font-medium text-slate-500 leading-tight mb-2">Chat with our team instantly</p>
                                    <ChevronRight size={14} className="text-slate-400 mt-auto" />
                                </div>
                                {/* Raise a Ticket */}
                                <div className="bg-white rounded-xl py-2 px-2 lg:py-2 lg:px-2 flex flex-col items-center justify-center text-center cursor-pointer hover:shadow-md transition-all" style={{ boxShadow: 'rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px' }}>
                                    <img src={cc2Image} alt="Raise a Ticket" className="w-10 h-10 object-contain mb-2" />
                                    <h4 className="text-[12px] lg:text-[13px] font-bold text-slate-800 mb-1">Raise a Ticket</h4>
                                    <p className="text-[9px] lg:text-[10px] font-medium text-slate-500 leading-tight mb-2">Report an issue or request support</p>
                                    <ChevronRight size={14} className="text-slate-400 mt-auto" />
                                </div>
                                {/* FAQs */}
                                <div className="bg-white rounded-xl py-2 px-2 lg:py-2 lg:px-2 flex flex-col items-center justify-center text-center cursor-pointer hover:shadow-md transition-all" style={{ boxShadow: 'rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px' }}>
                                    <img src={cc3Image} alt="FAQs" className="w-10 h-10 object-contain mb-2" />
                                    <h4 className="text-[12px] lg:text-[13px] font-bold text-slate-800 mb-1">FAQs</h4>
                                    <p className="text-[9px] lg:text-[10px] font-medium text-slate-500 leading-tight mb-2">Find answers to common questions</p>
                                    <ChevronRight size={14} className="text-slate-400 mt-auto" />
                                </div>
                                {/* Guides & Help */}
                                <div className="bg-white rounded-xl py-2 px-2 lg:py-2 lg:px-2 flex flex-col items-center justify-center text-center cursor-pointer hover:shadow-md transition-all" style={{ boxShadow: 'rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px' }}>
                                    <img src={cc4Image} alt="Guides & Help" className="w-10 h-10 object-contain mb-2" />
                                    <h4 className="text-[12px] lg:text-[13px] font-bold text-slate-800 mb-1">Guides & Help</h4>
                                    <p className="text-[9px] lg:text-[10px] font-medium text-slate-500 leading-tight mb-2">Step-by-step guides & tutorials</p>
                                    <ChevronRight size={14} className="text-slate-400 mt-auto" />
                                </div>
                                {/* Downloads */}
                                <div className="bg-white rounded-xl py-2 px-2 lg:py-2 lg:px-2 flex flex-col items-center justify-center text-center cursor-pointer hover:shadow-md transition-all" style={{ boxShadow: 'rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px' }}>
                                    <img src={cc5Image} alt="Downloads" className="w-10 h-10 object-contain mb-2" />
                                    <h4 className="text-[12px] lg:text-[13px] font-bold text-slate-800 mb-1">Downloads</h4>
                                    <p className="text-[9px] lg:text-[10px] font-medium text-slate-500 leading-tight mb-2">Forms, documents & resources</p>
                                    <ChevronRight size={14} className="text-slate-400 mt-auto" />
                                </div>
                                {/* Call Support */}
                                <div className="bg-white rounded-xl py-2 px-2 lg:py-2 lg:px-2 flex flex-col items-center justify-center text-center cursor-pointer hover:shadow-md transition-all" style={{ boxShadow: 'rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px' }}>
                                    <img src={cc6Image} alt="Call Support" className="w-10 h-10 object-contain mb-2" />
                                    <h4 className="text-[12px] lg:text-[13px] font-bold text-slate-800 mb-1">Call Support</h4>
                                    <p className="text-[9px] lg:text-[10px] font-medium text-slate-500 leading-tight mb-2">Speak directly to our team</p>
                                    <ChevronRight size={14} className="text-slate-400 mt-auto" />
                                </div>
                            </div>
                        </div>

                        {/* Recent Conversations & Resources */}
                        <div className="grid md:grid-cols-3 gap-6">
                            
                            {/* Recent Conversations */}
                            <div className="bg-white rounded-2xl flex flex-col md:col-span-2 overflow-hidden" style={{ boxShadow: 'rgba(0, 0, 0, 0.05) 0px 0px 0px 1px' }}>
                                <div className="flex items-center justify-between px-4 py-2 bg-white border-b border-slate-100">
                                    <div className="flex items-center gap-2">
                                        <MessageSquare size={14} className="text-slate-800" />
                                        <h2 className="text-[12px] font-bold text-slate-800 tracking-tight">Recent Conversations</h2>
                                    </div>
                                    <span className="text-[11px] font-bold text-blue-600 cursor-pointer hover:underline">View All</span>
                                </div>
                                <div className="p-3 flex-1">
                                <div className="space-y-1.5">
                                    {/* Ticket 1 */}
                                    <div className="flex items-center justify-between py-1.5 px-2 border-b border-slate-100 hover:bg-slate-50 transition-colors cursor-pointer">
                                        <div className="flex items-start gap-2">
                                            <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                                                <Zap size={12} className="fill-emerald-600" />
                                            </div>
                                            <div>
                                                <div className="flex items-center gap-1.5">
                                                    <h4 className="text-[11px] font-bold text-slate-800">Stall Power & Electricity Issue</h4>
                                                    <span className="text-[8px] font-bold text-blue-600 bg-blue-50 border border-blue-100 px-1.5 py-0.5 rounded uppercase tracking-wider">TICKET #IHWE-1256</span>
                                                </div>
                                                <p className="text-[9px] font-medium text-[#4B1426]">Updated: 02 Jul 2026, 11:30 AM</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <span className="px-1.5 py-0.5 rounded-full bg-emerald-100 text-emerald-700 text-[9px] font-bold">In Progress</span>
                                            <ChevronRight size={12} className="text-slate-400" />
                                        </div>
                                    </div>
                                    {/* Ticket 2 */}
                                    <div className="flex items-center justify-between py-1.5 px-2 border-b border-slate-100 hover:bg-slate-50 transition-colors cursor-pointer">
                                        <div className="flex items-start gap-2">
                                            <div className="w-6 h-6 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center shrink-0">
                                                <Ticket size={12} />
                                            </div>
                                            <div>
                                                <div className="flex items-center gap-1.5">
                                                    <h4 className="text-[11px] font-bold text-slate-800">Extra Exhibitor Pass Request</h4>
                                                    <span className="text-[8px] font-bold text-blue-600 bg-blue-50 border border-blue-100 px-1.5 py-0.5 rounded uppercase tracking-wider">TICKET #IHWE-1240</span>
                                                </div>
                                                <p className="text-[9px] font-medium text-[#4B1426]">Updated: 30 Jun 2026, 04:15 PM</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <span className="px-1.5 py-0.5 rounded-full bg-orange-100 text-orange-700 text-[9px] font-bold">Waiting for Reply</span>
                                            <ChevronRight size={12} className="text-slate-400" />
                                        </div>
                                    </div>
                                    {/* Ticket 3 */}
                                    <div className="flex items-center justify-between py-1.5 px-2 border-b border-slate-100 hover:bg-slate-50 transition-colors cursor-pointer">
                                        <div className="flex items-start gap-2">
                                            <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                                                <FileText size={12} />
                                            </div>
                                            <div>
                                                <div className="flex items-center gap-1.5">
                                                    <h4 className="text-[11px] font-bold text-slate-800">Invoice Payment Receipt</h4>
                                                    <span className="text-[8px] font-bold text-blue-600 bg-blue-50 border border-blue-100 px-1.5 py-0.5 rounded uppercase tracking-wider">TICKET #IHWE-1208</span>
                                                </div>
                                                <p className="text-[9px] font-medium text-[#4B1426]">Updated: 28 Jun 2026, 10:05 AM</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <span className="px-1.5 py-0.5 rounded-full bg-slate-100 text-slate-600 text-[9px] font-bold">Resolved</span>
                                            <ChevronRight size={12} className="text-slate-400" />
                                        </div>
                                    </div>
                                    {/* Ticket 4 */}
                                    <div className="flex items-center justify-between py-1.5 px-2 border-b border-slate-100 hover:bg-slate-50 transition-colors cursor-pointer">
                                        <div className="flex items-start gap-2">
                                            <div className="w-6 h-6 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center shrink-0">
                                                <MessageSquare size={12} />
                                            </div>
                                            <div>
                                                <div className="flex items-center gap-1.5">
                                                    <h4 className="text-[11px] font-bold text-slate-800">Booth Customization Inquiry</h4>
                                                    <span className="text-[8px] font-bold text-blue-600 bg-blue-50 border border-blue-100 px-1.5 py-0.5 rounded uppercase tracking-wider">TICKET #IHWE-1205</span>
                                                </div>
                                                <p className="text-[9px] font-medium text-[#4B1426]">Updated: 27 Jun 2026, 02:45 PM</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <span className="px-1.5 py-0.5 rounded-full bg-emerald-100 text-emerald-700 text-[9px] font-bold">In Progress</span>
                                            <ChevronRight size={12} className="text-slate-400" />
                                        </div>
                                    </div>

                                </div>
                                </div>
                            </div>

                            {/* Important Resources */}
                            <div className="bg-white rounded-2xl flex flex-col md:col-span-1 overflow-hidden" style={{ boxShadow: 'rgba(0, 0, 0, 0.05) 0px 0px 0px 1px' }}>
                                <div className="flex items-center justify-between px-4 py-2 bg-white border-b border-slate-100">
                                    <div className="flex items-center gap-2">
                                        <FileText size={14} className="text-slate-800" />
                                        <h2 className="text-[12px] font-bold text-slate-800 tracking-tight">Important Resources</h2>
                                    </div>
                                    <span className="text-[11px] font-bold text-blue-600 cursor-pointer hover:underline">View All</span>
                                </div>
                                <div className="p-3 flex-1">
                                <div className="space-y-1 flex-1">
                                    {[
                                        { title: "Terms & Conditions" },
                                        { title: "Exhibitor Manual" },
                                        { title: "Stall Guidelines" },
                                        { title: "Passes Information" },
                                        { title: "Logistics & Setup" },

                                    ].map((item, i) => (
                                        <div key={i} className="flex items-center justify-between py-1 px-1.5 border-b border-slate-100 hover:bg-slate-50 transition-colors cursor-pointer">
                                            <div className="flex items-center gap-2">
                                                <div className="w-5 h-5 rounded-md bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                                                    <FileText size={10} />
                                                </div>
                                                <div>
                                                    <h4 className="text-[10px] font-bold text-slate-800 leading-tight mb-0.5">{item.title}</h4>
                                                    <p className="text-[8px] font-medium text-slate-500 leading-tight">Download PDF</p>
                                                </div>
                                            </div>
                                            <div className="w-4 h-4 rounded bg-emerald-50 flex items-center justify-center text-emerald-600 hover:bg-emerald-100 transition-colors">
                                                <Download size={8} />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                </div>
                            </div>

                        </div>
                    </div>

                    {/* Right Column (Sidebar) */}
                    <div className="w-full lg:w-[240px] xl:w-[260px] flex-shrink-0 space-y-6">
                        
                        {/* Your Relationship Manager */}
                        <div className="bg-white rounded-2xl flex flex-col overflow-hidden" style={{ boxShadow: 'rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px' }}>
                            <div className="px-4 py-2 bg-white border-b border-slate-100 flex items-center gap-2">
                                <User size={14} className="text-emerald-700" />
                                <h2 className="text-[12px] font-bold text-emerald-700 tracking-tight">Your Relationship Manager</h2>
                            </div>
                            <div className="p-3">
                            <div className="flex items-center gap-4 mb-3">
                                <div className="relative">
                                    <div className="w-14 h-14 rounded-full bg-slate-200 overflow-hidden shrink-0 border-2 border-emerald-100 relative z-10">
                                        <img src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=200&h=200" alt="Vansh Chaudhary" className="w-full h-full object-cover" />
                                    </div>
                                    <span className="absolute bottom-0.5 right-0.5 w-3.5 h-3.5 bg-emerald-500 border-2 border-white rounded-full z-20"></span>
                                    <span className="absolute bottom-0.5 right-0.5 w-3.5 h-3.5 bg-emerald-400 rounded-full animate-ping opacity-75 z-20"></span>
                                </div>
                                <div>
                                    <h4 className="text-[15px] font-bold text-slate-800">Vansh Chaudhary</h4>
                                    <p className="text-[12px] font-medium text-slate-500">Finance Executive</p>
                                </div>
                            </div>
                            <div className="space-y-2 mb-3">
                                <div className="flex items-center gap-3 text-slate-600">
                                    <Phone size={14} />
                                    <span className="text-[12px] font-bold">09568259784</span>
                                </div>
                                <div className="flex items-center gap-3 text-slate-600">
                                    <Mail size={14} />
                                    <span className="text-[12px] font-bold">vansh.chaudhary@ihwe.in</span>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                                <button className="flex items-center justify-center gap-2 py-2 rounded-lg border border-emerald-500 text-emerald-600 hover:bg-emerald-50 transition-colors">
                                    <MessageCircle size={14} className="fill-emerald-600" />
                                    <span className="text-[11px] font-bold">WHATSAPP</span>
                                </button>
                                <button className="flex items-center justify-center gap-2 py-2 rounded-lg border border-blue-500 text-blue-600 hover:bg-blue-50 transition-colors">
                                    <Phone size={14} className="fill-blue-600" />
                                    <span className="text-[11px] font-bold">CALL</span>
                                </button>
                            </div>
                            </div>
                        </div>

                        {/* Support Hours */}
                        <div className="bg-white rounded-2xl flex flex-col overflow-hidden" style={{ boxShadow: 'rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px' }}>
                            <div className="px-4 py-2 bg-white border-b border-slate-100 flex items-center gap-2">
                                <Clock size={14} className="text-slate-800" />
                                <h2 className="text-[12px] font-bold text-slate-800 tracking-tight">Support Hours</h2>
                            </div>
                            <div className="p-4">
                            <div className="bg-emerald-50/50 rounded-xl p-4 text-center border border-emerald-100 mb-4">
                                <p className="text-[13px] font-bold text-slate-800 mb-1">09:00 AM - 07:00 PM (IST)</p>
                                <p className="text-[11px] font-medium text-slate-500">Monday to Saturday</p>
                            </div>
                            <button className="w-full flex items-center justify-center gap-2 py-3 bg-[#116e37] hover:bg-[#0c542a] text-white rounded-xl transition-colors">
                                <MessageSquare size={14} />
                                <span className="text-[12px] font-bold tracking-wide">START LIVE CHAT</span>
                                <ChevronRight size={14} />
                            </button>
                            </div>
                        </div>

                        {/* Quick Stats */}
                        <div className="bg-white rounded-2xl flex flex-col overflow-hidden" style={{ boxShadow: 'rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px' }}>
                            <div className="px-4 py-2 bg-white border-b border-slate-100 flex items-center gap-2">
                                <BarChart2 size={14} className="text-slate-800" />
                                <h2 className="text-[12px] font-bold text-slate-800 tracking-tight">Quick Stats</h2>
                            </div>
                            <div className="p-4">
                            <div className="grid grid-cols-2 gap-3">
                                <div className="bg-emerald-50 rounded-xl p-2.5" style={{ boxShadow: 'rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px' }}>
                                    <p className="text-[9px] font-bold text-emerald-800/80 mb-0.5">Tickets Raised</p>
                                    <p className="text-lg font-black text-emerald-600 mb-0.5">12</p>
                                    <p className="text-[8px] font-semibold text-emerald-600/70">This Month</p>
                                </div>
                                <div className="bg-purple-50 rounded-xl p-2.5" style={{ boxShadow: 'rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px' }}>
                                    <p className="text-[9px] font-bold text-purple-800/80 mb-0.5 whitespace-nowrap">Avg. Response Time</p>
                                    <p className="text-lg font-black text-purple-600 mb-0.5">~30m</p>
                                    <p className="text-[8px] font-semibold text-purple-600/70">This Month</p>
                                </div>
                                <div className="bg-orange-50 rounded-xl p-2.5" style={{ boxShadow: 'rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px' }}>
                                    <p className="text-[9px] font-bold text-orange-800/80 mb-0.5">Satisfaction Rate</p>
                                    <p className="text-lg font-black text-orange-500 mb-0.5">98%</p>
                                    <p className="text-[8px] font-semibold text-orange-600/70">Out of 5</p>
                                </div>
                                <div className="bg-blue-50 rounded-xl p-2.5" style={{ boxShadow: 'rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px' }}>
                                    <p className="text-[9px] font-bold text-blue-800/80 mb-0.5">Closed Tickets</p>
                                    <p className="text-lg font-black text-blue-600 mb-0.5">28</p>
                                    <p className="text-[8px] font-semibold text-blue-600/70">This Month</p>
                                </div>
                            </div>
                            </div>
                        </div>

                    </div>
                </div>

                {/* Bottom Footer Features */}
                <div className="pt-3 mt-2 border-t border-slate-200">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        <div className="flex items-start gap-3">
                            <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center shrink-0">
                                <ShieldCheck size={18} className="text-emerald-600" />
                            </div>
                            <div>
                                <h4 className="text-[12px] font-bold text-slate-800 mb-1">Dedicated Support</h4>
                                <p className="text-[10px] font-medium text-slate-500 leading-relaxed">One-to-one assistance <br /> for all your requirements.</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <div className="w-10 h-10 rounded-full bg-purple-50 flex items-center justify-center shrink-0">
                                <Zap size={18} className="text-purple-600 fill-purple-600" />
                            </div>
                            <div>
                                <h4 className="text-[12px] font-bold text-slate-800 mb-1">Quick Response</h4>
                                <p className="text-[10px] font-medium text-slate-500 leading-relaxed">We ensure prompt response <br /> within 30 minutes.</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
                                <CheckCircle size={18} className="text-blue-600" />
                            </div>
                            <div>
                                <h4 className="text-[12px] font-bold text-slate-800 mb-1">Expert Guidance</h4>
                                <p className="text-[10px] font-medium text-slate-500 leading-relaxed">Experienced team to help <br /> you at every step.</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <div className="w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center shrink-0">
                                <Target size={18} className="text-orange-500" />
                            </div>
                            <div>
                                <h4 className="text-[12px] font-bold text-slate-800 mb-1">Complete Assistance</h4>
                                <p className="text-[10px] font-medium text-slate-500 leading-relaxed">End-to-end support for a <br /> seamless experience.</p>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
