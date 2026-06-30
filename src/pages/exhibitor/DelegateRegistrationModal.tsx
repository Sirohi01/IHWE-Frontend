import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CalendarDays, FileSignature, ArrowLeft, ArrowRight } from "lucide-react";
import ConferenceAgenda from "../../components/conference/ConferenceAgenda";
import DelegateRegistrationForm from "../../components/delegate/delegate-registration/DelegateRegistrationForm";

interface DelegateRegistrationModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmitRegistration: (formData: any) => void;
}

type ViewState = 'choice' | 'agenda' | 'registration';

const DelegateRegistrationModal: React.FC<DelegateRegistrationModalProps> = ({ isOpen, onClose, onSubmitRegistration }) => {
    const [view, setView] = useState<ViewState>('choice');

    if (!isOpen) return null;

    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
        const data = Object.fromEntries(formData.entries());
        onSubmitRegistration(data);
    };

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                    className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
                />
                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 20 }}
                    transition={{ type: "spring", duration: 0.5, bounce: 0.3 }}
                    className={`relative bg-[#f8fafc] rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[95vh] ring-1 ring-slate-900/5 ${view === 'choice' ? 'w-full max-w-[500px]' : 'w-full max-w-[1000px]'}`}
                >
                    {/* Modal Header */}
                    <div className="px-6 py-4 flex items-center justify-between bg-white border-b border-slate-100 z-10 shadow-sm shrink-0">
                        <div className="flex items-center gap-3">
                            {view !== 'choice' && (
                                <button 
                                    onClick={() => setView('choice')}
                                    className="w-8 h-8 rounded-full hover:bg-slate-100 flex items-center justify-center text-slate-500 transition-colors"
                                >
                                    <ArrowLeft size={18} />
                                </button>
                            )}
                            <div>
                                <h2 className="text-[18px] font-black text-slate-800 tracking-tight leading-tight">
                                    {view === 'choice' && 'Delegate Registration'}
                                    {view === 'agenda' && 'Conference Agenda'}
                                    {view === 'registration' && 'Register Delegate'}
                                </h2>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            {view === 'agenda' && (
                                <button 
                                    onClick={() => setView('registration')}
                                    className="px-4 py-1.5 bg-[#be185d] hover:bg-[#9d174d] text-white text-[12px] font-black rounded-lg transition-colors flex items-center gap-1.5 shadow-sm"
                                >
                                    Register Now
                                    <ArrowRight size={12} />
                                </button>
                            )}
                            {view === 'registration' && (
                                <button 
                                    onClick={() => setView('agenda')}
                                    className="px-4 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-[12px] font-black rounded-lg transition-colors flex items-center gap-1.5 shadow-sm"
                                >
                                    View Agenda
                                    <CalendarDays size={12} />
                                </button>
                            )}
                            <button 
                                onClick={onClose}
                                className="w-9 h-9 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-all"
                            >
                                <X size={16} strokeWidth={2.5} />
                            </button>
                        </div>
                    </div>

                    {/* Modal Body */}
                    <div className="overflow-y-auto custom-scrollbar flex-1 relative bg-slate-50">
                        {view === 'choice' && (
                            <div className="p-8 flex flex-col items-center justify-center space-y-6">
                                <div className="text-center mb-4">
                                    <h3 className="text-xl font-bold text-slate-800 mb-2">Welcome to Delegate Registration</h3>
                                    <p className="text-sm text-slate-500">Would you like to explore the conference agenda first or proceed directly to registration?</p>
                                </div>
                                
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
                                    <button 
                                        onClick={() => setView('agenda')}
                                        className="group relative bg-white border border-indigo-100 hover:border-indigo-300 p-6 rounded-2xl flex flex-col items-center text-center shadow-sm hover:shadow-md transition-all hover:-translate-y-1"
                                    >
                                        <div className="w-14 h-14 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600 mb-4 group-hover:scale-110 transition-transform">
                                            <CalendarDays size={28} />
                                        </div>
                                        <h4 className="text-sm font-bold text-slate-800 mb-1">View Agenda</h4>
                                        <p className="text-[11px] text-slate-500 leading-tight">Explore the 3-day conference schedule and speakers</p>
                                    </button>

                                    <button 
                                        onClick={() => setView('registration')}
                                        className="group relative bg-white border border-pink-100 hover:border-pink-300 p-6 rounded-2xl flex flex-col items-center text-center shadow-sm hover:shadow-md transition-all hover:-translate-y-1"
                                    >
                                        <div className="w-14 h-14 rounded-full bg-pink-50 flex items-center justify-center text-pink-600 mb-4 group-hover:scale-110 transition-transform">
                                            <FileSignature size={28} />
                                        </div>
                                        <h4 className="text-sm font-bold text-slate-800 mb-1">Register Now</h4>
                                        <p className="text-[11px] text-slate-500 leading-tight">Fill out the delegate registration form</p>
                                    </button>
                                </div>
                            </div>
                        )}

                        {view === 'agenda' && (
                            <div className="p-0 bg-white">
                                <ConferenceAgenda isModal={true} />
                            </div>
                        )}

                        {view === 'registration' && (
                            <div className="p-4 sm:p-8">
                                <DelegateRegistrationForm onSubmit={handleFormSubmit} />
                            </div>
                        )}
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
};

export default DelegateRegistrationModal;
