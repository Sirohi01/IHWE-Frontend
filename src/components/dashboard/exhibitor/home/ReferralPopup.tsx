import { X, Gift, Building2, User, Phone, Mail, Tag, PenLine, ShieldCheck, CheckCircle2, ArrowRight, Clock } from 'lucide-react';
import exbanImg from '@/assets/exban.webp';
import extopImg from '@/assets/extop.webp';
import { motion, AnimatePresence } from 'framer-motion';

export default function ReferralPopup({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
    if (!isOpen) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[200] flex items-center justify-center p-3 bg-black/60 backdrop-blur-sm">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.3 }}
                        className="relative w-full max-w-[550px] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden max-h-[410px] font-inter"
                    >
                        {/* Close Button */}
                        <button
                            onClick={onClose}
                            className="absolute top-2.5 right-2.5 z-10 w-6 h-6 flex items-center justify-center bg-black text-white rounded-full hover:bg-red-600 shadow-md transition-colors"
                        >
                            <X size={12} />
                        </button>

                        {/* Main Content Area: Left Image & Right Form */}
                        <div className="flex flex-col md:flex-row flex-1 overflow-hidden">
                            {/* Left Side: Image - full contained, no crop */}
                            <div className="hidden md:flex w-[46%] shrink-0 relative bg-gradient-to-b from-[#f0fdf4] to-[#dcfce7]">
                                <img src="/logo.png" alt="Logo" className="absolute top-3 left-3 z-10 h-8 w-auto drop-shadow-md" />
                                <img
                                    src={exbanImg}
                                    alt="Refer and Earn"
                                    className="w-full h-full object-fill object-center"
                                />
                            </div>

                            {/* Right Side */}
                            <div className="w-full md:w-[54%] flex flex-col bg-white">

                            {/* Top Banner Image */}
                            <img src={extopImg} alt="Earn 10% Referral Bonus" className="w-[96%] mx-auto h-auto object-contain shrink-0 mt-1" />

                            {/* Form - no scroll, tight spacing */}
                            <div className="p-2 flex flex-col gap-1 flex-1 font-inter">

                                {/* Row 1 */}
                                <div className="grid grid-cols-2 gap-1.5">
                                    <div>
                                        <label className="block text-[9px] font-bold text-black mb-0">Company Name <span className="text-red-500">*</span></label>
                                        <div className="relative">
                                            <Building2 size={10} className="absolute left-2 top-1/2 -translate-y-1/2 text-green-700 pointer-events-none" />
                                            <input type="text" placeholder="Enter Company Name" className="w-full pl-6 pr-2 py-1 text-[9px] border border-gray-200 rounded-lg focus:ring-1 focus:ring-green-600/30 focus:border-green-600 outline-none" />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-[9px] font-bold text-black mb-0">Contact Person <span className="text-red-500">*</span></label>
                                        <div className="relative">
                                            <User size={10} className="absolute left-2 top-1/2 -translate-y-1/2 text-green-700 pointer-events-none" />
                                            <input type="text" placeholder="Enter Contact Person" className="w-full pl-6 pr-2 py-1 text-[9px] border border-gray-200 rounded-lg focus:ring-1 focus:ring-green-600/30 focus:border-green-600 outline-none" />
                                        </div>
                                    </div>
                                </div>

                                {/* Row 2 */}
                                <div className="grid grid-cols-2 gap-1.5">
                                    <div>
                                        <label className="block text-[9px] font-bold text-black mb-0">Mobile Number <span className="text-red-500">*</span></label>
                                        <div className="flex border border-gray-200 rounded-lg overflow-hidden focus-within:ring-1 focus-within:ring-green-600/30 focus-within:border-green-600">
                                            <div className="bg-gray-50 px-1 flex items-center border-r border-gray-200 gap-1">
                                                <Phone size={9} className="text-green-700" />
                                                <span className="text-[9px] font-semibold text-gray-700">+91</span>
                                            </div>
                                            <input type="tel" placeholder="Mobile Number" className="w-full px-1.5 py-1 text-[9px] outline-none" />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-[9px] font-bold text-black mb-0">Email ID</label>
                                        <div className="relative">
                                            <Mail size={10} className="absolute left-2 top-1/2 -translate-y-1/2 text-green-700 pointer-events-none" />
                                            <input type="email" placeholder="Enter Email Address" className="w-full pl-6 pr-2 py-1 text-[9px] border border-gray-200 rounded-lg focus:ring-1 focus:ring-green-600/30 focus:border-green-600 outline-none" />
                                        </div>
                                    </div>
                                </div>

                                {/* Category */}
                                <div>
                                    <label className="block text-[9px] font-bold text-black mb-0">Product / Service Category</label>
                                    <div className="relative">
                                        <Tag size={10} className="absolute left-2 top-1/2 -translate-y-1/2 text-green-700 pointer-events-none" />
                                        <select className="w-full pl-6 pr-5 py-1 text-[9px] border border-gray-200 rounded-lg focus:ring-1 focus:ring-green-600/30 focus:border-green-600 outline-none appearance-none text-gray-500">
                                            <option value="">Select Category</option>
                                            <option value="nutrition">Nutrition & Superfoods</option>
                                            <option value="equipment">Healthcare Equipment</option>
                                            <option value="wellness">Wellness Services</option>
                                        </select>
                                        <svg className="w-3 h-3 text-gray-400 absolute right-1.5 top-1/2 -translate-y-1/2 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                                    </div>
                                </div>

                                {/* Remarks */}
                                <div>
                                    <div className="flex justify-between items-end mb-0">
                                        <label className="block text-[9px] font-bold text-black">Remarks <span className="text-gray-400 font-normal">(Optional)</span></label>
                                        <span className="text-[7px] text-gray-400">0/300</span>
                                    </div>
                                    <div className="relative">
                                        <PenLine size={10} className="absolute left-2 top-1.5 text-green-700 pointer-events-none" />
                                        <textarea rows={1} placeholder="Write your comments here..." className="w-full pl-6 pr-2 py-1 text-[9px] border border-gray-200 rounded-lg focus:ring-1 focus:ring-green-600/30 focus:border-green-600 outline-none resize-none" />
                                    </div>
                                </div>

                                {/* Info Alert */}
                                <div className="bg-[#fff9e6] border border-[#f5ebcc] rounded-lg px-2 py-1 flex gap-1.5 items-center">
                                    <div className="bg-green-700 rounded-full p-0.5 shrink-0">
                                        <ShieldCheck size={9} className="text-white" />
                                    </div>
                                    <p className="text-[7.5px] text-gray-900 font-bold leading-tight">
                                        Bonus applicable only on <span className="font-bold text-green-800">new clients</span>, after <span className="font-bold text-green-800">payment realization</span> &amp; <span className="font-bold text-green-800">verification</span>.
                                    </p>
                                </div>

                                {/* How it works */}
                                <div className="border border-gray-100 rounded-lg px-2 py-0.5 bg-gray-50/50 relative mt-0.5">
                                    <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 bg-white px-1.5 border border-gray-100 rounded-full text-[6px] font-extrabold text-green-800 tracking-wider whitespace-nowrap">
                                        HOW IT WORKS
                                    </div>
                                    <div className="flex items-center justify-between gap-1 mt-1">
                                        <div className="flex items-center text-left flex-1 gap-1">
                                            <div className="w-5 h-5 bg-green-700 text-white rounded-full flex items-center justify-center relative shadow-sm shrink-0">
                                                <User size={8} />
                                                <div className="absolute -top-0.5 -left-0.5 w-2.5 h-2.5 bg-white rounded-full border border-green-700 flex items-center justify-center text-[5px] font-black text-green-700">1</div>
                                            </div>
                                            <div className="whitespace-nowrap">
                                                <p className="text-[8px] font-bold text-[#00530a] leading-none">Share</p>
                                                <p className="text-[7px]  font-semibold text-black leading-tight mt-[1px]">company /<br />contact details</p>
                                            </div>
                                        </div>
                                        <div className="flex-1 h-px border-t border-dashed border-green-300 relative">
                                            <ArrowRight size={7} className="absolute right-0 -top-[3.5px] text-green-400" />
                                        </div>
                                        <div className="flex items-center text-left flex-1 gap-1">
                                            <div className="w-5 h-5 bg-white border border-green-700 text-green-700 rounded-full flex items-center justify-center relative shadow-sm shrink-0">
                                                <Phone size={8} />
                                                <div className="absolute -top-0.5 -left-0.5 w-2.5 h-2.5 bg-green-700 rounded-full flex items-center justify-center text-[5px] font-black text-white">2</div>
                                            </div>
                                            <div className="whitespace-nowrap">
                                                <p className="text-[8px] font-bold text-[#00530a] leading-none">Our team</p>
                                                <p className="text-[7px] font-semibold text-black leading-tight mt-[1px]">will connect<br />with them</p>
                                            </div>
                                        </div>
                                        <div className="flex-1 h-px border-t border-dashed border-green-300 relative">
                                            <ArrowRight size={7} className="absolute right-0 -top-[3.5px] text-green-400" />
                                        </div>
                                        <div className="flex items-center text-left flex-1 gap-1">
                                            <div className="w-5 h-5 bg-white border border-green-700 text-green-700 rounded-full flex items-center justify-center relative shadow-sm shrink-0">
                                                <CheckCircle2 size={8} />
                                                <div className="absolute -top-0.5 -left-0.5 w-2.5 h-2.5 bg-green-700 rounded-full flex items-center justify-center text-[5px] font-black text-white">3</div>
                                            </div>
                                            <div className="whitespace-nowrap">
                                                <p className="text-[8px] font-bold text-[#00530a] leading-none">After successful</p>
                                                <p className="text-[7px] font-semibold text-black leading-tight mt-[1px]">booking, earn bonus</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Actions */}
                                <div className="flex justify-start items-center gap-2 mt-auto pt-0.5">
                                    <button onClick={onClose} className="flex items-center gap-1 px-2 py-1 rounded-lg border border-[#041f1a] text-black hover:bg-gray-50 transition-colors shrink-0">
                                        <Clock size={10} />
                                        <div className="text-left">
                                            <div className="text-[8px] font-semibold leading-none">Maybe Later</div>
                                            <div className="text-[7px] text-black mt-[1px]">I'll do it later</div>
                                        </div>
                                    </button>
                                    <button className="flex-1 max-w-[160px] bg-gradient-to-r from-[#011e08] to-[#327808] hover:from-[#2a6807] hover:to-[#013e09] text-white py-1 px-2 rounded-lg flex items-center justify-between shadow-lg shadow-green-900/20 transition-all group">
                                        <div className="flex items-center gap-1.5">
                                            <div className="bg-white/20 p-0.5 rounded shrink-0">
                                                <svg width="10" height="10" viewBox="0 0 24 24" fill="none"><path d="M22 2L11 13M22 2L15 22L11 13M11 13L2 9L22 2" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                                            </div>
                                            <div className="text-left">
                                                <div className="text-[8.5px] font-medium tracking-wide leading-none">SUBMIT REFERRAL</div>
                                                <div className="text-[6px] text-white mt-[1px]">Let's Refer & Earn Together!</div>
                                            </div>
                                        </div>
                                        <ArrowRight size={10} className="group-hover:translate-x-0.5 transition-transform" />
                                    </button>
                                </div>
                            </div>

                            </div>
                        </div>

                        {/* Footer - Full Width */}
                        <div className="bg-[#13291a] py-2 px-5 flex items-center justify-start shrink-0 w-full">
                            <div className="flex items-center gap-1.5">
                                <ShieldCheck size={11} className="text-[#f5c300]" />
                                <span className="text-[8px] font-bold text-white tracking-widest">YOUR TRUST. OUR PROMISE.</span>
                            </div>
                            
                            <div className="h-3 w-[1px] bg-white/30 mx-5"></div>
                            
                            <div className="flex items-center gap-4">
                                <div className="flex items-center gap-1"><CheckCircle2 size={10} className="text-[#f5c300]" /><span className="text-[8px] font-bold text-white tracking-widest">SECURE</span></div>
                                <div className="h-3 w-[1px] bg-white/30"></div>
                                <div className="flex items-center gap-1"><ShieldCheck size={10} className="text-[#f5c300]" /><span className="text-[8px] font-bold text-white tracking-widest">TRANSPARENT</span></div>
                                <div className="h-3 w-[1px] bg-white/30"></div>
                                <div className="flex items-center gap-1">
                                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-[#f5c300]"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
                                    <span className="text-[8px] font-bold text-white tracking-widest">VERIFIED</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}