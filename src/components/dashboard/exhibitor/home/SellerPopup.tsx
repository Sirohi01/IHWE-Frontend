import { X, Building2, User, Phone, Mail, Tag, ShoppingBag, FileText, MapPin, ShieldCheck, CheckCircle2, ArrowRight, Clock } from 'lucide-react';
import exsellImg from '@/assets/exsell2.png';
import exselltopImg from '@/assets/exselltop.png';
import { motion, AnimatePresence } from 'framer-motion';

export default function SellerPopup({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
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
                        className="relative w-full max-w-[580px] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden max-h-[440px] font-inter"
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
                                    src={exsellImg}
                                    alt="Seller Registration"
                                    className="w-full h-full object-fill object-center"
                                />
                            </div>

                            {/* Right Side */}
                            <div className="w-full md:w-[54%] flex flex-col bg-white">

                                {/* Top Banner Image */}
                                <img src={exselltopImg} alt="Seller Registration" className="w-[96%] mx-auto h-auto object-contain shrink-0 mt-1" />

                                {/* Form - no scroll, tight spacing */}
                                <div className="p-2 flex flex-col gap-1.5 flex-1 font-inter">

                                    {/* Row 1 */}
                                    <div className="grid grid-cols-2 gap-1.5">
                                        <div>
                                            <label className="block text-[9px] font-bold text-black mb-0.5">Business / Company Name <span className="text-red-500">*</span></label>
                                            <div className="relative">
                                                <Building2 size={10} className="absolute left-2 top-1/2 -translate-y-1/2 text-green-700 pointer-events-none" />
                                                <input type="text" placeholder="Enter Business / Company Name" className="w-full pl-6 pr-2 py-1 text-[9px] border border-gray-200 rounded-lg focus:ring-1 focus:ring-green-600/30 focus:border-green-600 outline-none" />
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-[9px] font-bold text-black mb-0.5">Contact Person Name <span className="text-red-500">*</span></label>
                                            <div className="relative">
                                                <User size={10} className="absolute left-2 top-1/2 -translate-y-1/2 text-green-700 pointer-events-none" />
                                                <input type="text" placeholder="Enter Contact Person Name" className="w-full pl-6 pr-2 py-1 text-[9px] border border-gray-200 rounded-lg focus:ring-1 focus:ring-green-600/30 focus:border-green-600 outline-none" />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Row 2 */}
                                    <div className="grid grid-cols-2 gap-1.5">
                                        <div>
                                            <label className="block text-[9px] font-bold text-black mb-0.5">Mobile Number <span className="text-red-500">*</span></label>
                                            <div className="flex border border-gray-200 rounded-lg overflow-hidden focus-within:ring-1 focus-within:ring-green-600/30 focus-within:border-green-600">
                                                <div className="bg-gray-50 px-1 flex items-center border-r border-gray-200 gap-1 cursor-pointer">
                                                    <Phone size={9} className="text-green-700" />
                                                    <span className="text-[9px] font-semibold text-gray-700">+91</span>
                                                    <svg className="w-2 h-2 text-gray-500 ml-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                                                </div>
                                                <input type="tel" placeholder="Enter Mobile Number" className="w-full px-1.5 py-1 text-[9px] outline-none" />
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-[9px] font-bold text-black mb-0.5">Email Address <span className="text-red-500">*</span></label>
                                            <div className="relative">
                                                <Mail size={10} className="absolute left-2 top-1/2 -translate-y-1/2 text-green-700 pointer-events-none" />
                                                <input type="email" placeholder="Enter Email Address" className="w-full pl-6 pr-2 py-1 text-[9px] border border-gray-200 rounded-lg focus:ring-1 focus:ring-green-600/30 focus:border-green-600 outline-none" />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Row 3 - Category & Sub Category */}
                                    <div className="grid grid-cols-2 gap-1.5">
                                        <div>
                                            <label className="block text-[9px] font-bold text-black mb-0.5">Business Category <span className="text-red-500">*</span></label>
                                            <div className="relative">
                                                <Tag size={10} className="absolute left-2 top-1/2 -translate-y-1/2 text-green-700 pointer-events-none" />
                                                <select className="w-full pl-6 pr-5 py-1 text-[9px] border border-gray-200 rounded-lg focus:ring-1 focus:ring-green-600/30 focus:border-green-600 outline-none appearance-none text-gray-400 bg-white">
                                                    <option value="">Select Business Category</option>
                                                    <option value="nutrition">Nutrition & Superfoods</option>
                                                    <option value="equipment">Healthcare Equipment</option>
                                                    <option value="wellness">Wellness Services</option>
                                                </select>
                                                <svg className="w-3 h-3 text-gray-400 absolute right-1.5 top-1/2 -translate-y-1/2 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-[9px] font-bold text-black mb-0.5">Sub Category</label>
                                            <div className="relative">
                                                <select className="w-full pl-2 pr-5 py-1 text-[9px] border border-gray-200 rounded-lg focus:ring-1 focus:ring-green-600/30 focus:border-green-600 outline-none appearance-none text-gray-400 bg-white">
                                                    <option value="">Select Sub Category</option>
                                                    <option value="sub1">Sub Category 1</option>
                                                    <option value="sub2">Sub Category 2</option>
                                                </select>
                                                <svg className="w-3 h-3 text-gray-400 absolute right-1.5 top-1/2 -translate-y-1/2 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Products / Services */}
                                    <div>
                                        <label className="block text-[9px] font-bold text-black mb-0.5">Products / Services You Deal In <span className="text-red-500">*</span></label>
                                        <div className="relative">
                                            <ShoppingBag size={10} className="absolute left-2 top-1.5 text-green-700 pointer-events-none" />
                                            <textarea rows={1} placeholder="Enter Products / Services" className="w-full pl-6 pr-2 py-1 text-[9px] border border-gray-200 rounded-lg focus:ring-1 focus:ring-green-600/30 focus:border-green-600 outline-none resize-none" />
                                        </div>
                                    </div>

                                    {/* Row 4 - GST & City */}
                                    <div className="grid grid-cols-2 gap-1.5">
                                        <div>
                                            <label className="block text-[9px] font-bold text-black mb-0.5">GST Number <span className="text-gray-400 font-normal">(Optional)</span></label>
                                            <div className="relative">
                                                <FileText size={10} className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                                                <input type="text" placeholder="Enter GST Number" className="w-full pl-6 pr-2 py-1 text-[9px] border border-gray-200 rounded-lg focus:ring-1 focus:ring-green-600/30 focus:border-green-600 outline-none" />
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-[9px] font-bold text-black mb-0.5">City <span className="text-red-500">*</span></label>
                                            <div className="relative">
                                                <MapPin size={10} className="absolute left-2 top-1/2 -translate-y-1/2 text-green-700 pointer-events-none" />
                                                <input type="text" placeholder="Enter City" className="w-full pl-6 pr-2 py-1 text-[9px] border border-gray-200 rounded-lg focus:ring-1 focus:ring-green-600/30 focus:border-green-600 outline-none" />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Checkbox Section */}
                                    <div className="bg-[#f0fdf4] border border-[#dcfce7] rounded-lg p-1.5 flex gap-1.5 items-start mt-1">
                                        <div className="bg-green-700 rounded p-0.5 shrink-0 mt-0.5">
                                            <ShieldCheck size={10} className="text-white" />
                                        </div>
                                        <p className="text-[6.5px] text-gray-900 font-extrabold leading-tight pr-2">
                                            By registering, you agree to our <span className="font-bold text-[#0D530E]">Terms & Conditions</span> and <span className="font-bold text-[#0D530E]">Privacy Policy</span>. <br /> Our team will verify your details and get in touch with you shortly.
                                        </p>
                                    </div>

                                    {/* Actions */}
                                    <div className="flex justify-start items-center gap-2 mt-auto pt-1 mb-1">
                                        <button onClick={onClose} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#041f1a] text-black hover:bg-gray-50 transition-colors shrink-0">
                                            <Clock size={12} />
                                            <div className="text-left">
                                                <div className="text-[9px] font-bold leading-none">Maybe Later</div>
                                                <div className="text-[7px] text-gray-600 mt-[1px]">I'll do it later</div>
                                            </div>
                                        </button>
                                        <button className="flex-1 bg-gradient-to-r from-[#011e08] to-[#327808] hover:from-[#2a6807] hover:to-[#013e09] text-white py-1.5 px-3 rounded-lg flex items-center justify-between shadow-lg shadow-green-900/20 transition-all group">
                                            <div className="flex items-center gap-2">
                                                <div className="bg-white/20 p-1 rounded shrink-0">
                                                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none"><path d="M22 2L11 13M22 2L15 22L11 13M11 13L2 9L22 2" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                                                </div>
                                                <div className="text-left">
                                                    <div className="text-[10px] font-bold tracking-wide leading-none">REGISTER NOW</div>
                                                    <div className="text-[7.5px] text-gray-200 mt-0.5">Join IHWE Expo 2026</div>
                                                </div>
                                            </div>
                                            <ArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
                                        </button>
                                    </div>
                                </div>

                            </div>
                        </div>

                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
