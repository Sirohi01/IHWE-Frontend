import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CalendarDays, FileSignature, ArrowLeft, ArrowRight } from "lucide-react";
import MainConferences from "../../components/conference/MainConferences";
import DelegateRegistrationForm from "../../components/delegate/delegate-registration/DelegateRegistrationForm";
import SessionSelection, { SelectedSession } from "../../components/delegate/delegate-registration/SessionSelection";
import RegistrationSidebar from "../../components/delegate/delegate-registration/RegistrationSidebar";

interface DelegateRegistrationModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmitRegistration: (formData: any) => void;
    complimentaryRemaining?: number;
}

type ViewState = 'choice' | 'agenda' | 'registration';

const DelegateRegistrationModal: React.FC<DelegateRegistrationModalProps> = ({
    isOpen,
    onClose,
    onSubmitRegistration,
    complimentaryRemaining = 0
}) => {
    const [view, setView] = useState<ViewState>('choice');
    const [registrationStep, setRegistrationStep] = useState(1);
    const [activeDay, setActiveDay] = useState<string | number>("");
    const [selectedSessions, setSelectedSessions] = useState<SelectedSession[]>([]);
    const [selectedPasses, setSelectedPasses] = useState<any[]>([]);

    const selectedItems = [...selectedSessions, ...selectedPasses];
    const subTotal = selectedItems.reduce((sum, item) => sum + Number(item.price || 0), 0);
    const isComplimentary = complimentaryRemaining > 0;

    if (!isOpen) return null;

    const openRegistration = () => {
        setView('registration');
        setRegistrationStep(1);
    };

    const goBack = () => {
        if (view === 'registration' && registrationStep === 2) {
            setRegistrationStep(1);
            return;
        }
        setView('choice');
        setRegistrationStep(1);
    };

    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (selectedItems.length === 0) {
            alert("Please select at least one session or pass to continue.");
            return;
        }
        const formData = new FormData(e.target as HTMLFormElement);
        const data: any = Object.fromEntries(formData.entries());
        data.sessions = selectedSessions as any;
        data.specialPasses = selectedPasses as any;
        data.gatewayAmount = String(subTotal);
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
                    className={`relative bg-[#f8fafc] rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[95vh] ring-1 ring-slate-900/5 ${view === 'choice' ? 'w-full max-w-[500px]' : 'w-full max-w-[1180px]'}`}
                >
                    {/* Modal Header */}
                    <div className="px-6 py-4 flex items-center justify-between bg-white border-b border-slate-100 z-10 shadow-sm shrink-0">
                        <div className="flex items-center gap-3">
                            {view !== 'choice' && (
                                <button 
                                    onClick={goBack}
                                    className="w-8 h-8 rounded-full hover:bg-slate-100 flex items-center justify-center text-slate-500 transition-colors"
                                >
                                    <ArrowLeft size={18} />
                                </button>
                            )}
                            <div>
                                <h2 className="text-[18px] font-black text-slate-800 tracking-tight leading-tight">
                                    {view === 'choice' && 'Delegate Registration'}
                                    {view === 'agenda' && 'Conference Agenda'}
                                    {view === 'registration' && (registrationStep === 1 ? 'Choose Sessions & Passes' : 'Delegate Registration Details')}
                                </h2>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            {view === 'agenda' && (
                                <button 
                                    onClick={openRegistration}
                                    className="px-4 py-1.5 bg-[#be185d] hover:bg-[#9d174d] text-white text-[12px] font-black rounded-lg transition-colors flex items-center gap-1.5 shadow-sm"
                                >
                                    Register Now
                                    <ArrowRight size={12} />
                                </button>
                            )}
                            {view === 'registration' && (
                                <button 
                                    onClick={() => {
                                        setView('agenda');
                                        setRegistrationStep(1);
                                    }}
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
                                        onClick={openRegistration}
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
                                <MainConferences isModal />
                            </div>
                        )}

                        {view === 'registration' && (
                            <div className="p-4 sm:p-6">
                                <div className={`mb-4 flex flex-wrap items-center justify-between gap-2 rounded-xl border px-4 py-3 ${
                                    isComplimentary
                                        ? 'border-emerald-200 bg-emerald-50 text-emerald-800'
                                        : 'border-amber-200 bg-amber-50 text-amber-900'
                                }`}>
                                    <div>
                                        <p className="text-[12px] font-black uppercase">
                                            {isComplimentary ? 'Complimentary Delegate Registration' : 'Paid Delegate Registration'}
                                        </p>
                                        <p className="text-[11px] font-semibold opacity-80">
                                            {isComplimentary
                                                ? 'No payment required. One complimentary delegate pass will be used.'
                                                : 'Complimentary quota is exhausted. Payment will be completed through Razorpay.'}
                                        </p>
                                    </div>
                                    <span className="rounded-md bg-white px-2.5 py-1 text-[11px] font-black shadow-sm">
                                        {isComplimentary ? `${complimentaryRemaining} FREE LEFT` : 'PAYMENT REQUIRED'}
                                    </span>
                                </div>
                                <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
                                    <div className="lg:col-span-8">
                                        {registrationStep === 1 ? (
                                            <SessionSelection
                                                activeDay={activeDay}
                                                setActiveDay={setActiveDay}
                                                selectedSessions={selectedSessions}
                                                setSelectedSessions={setSelectedSessions}
                                                selectedPasses={selectedPasses}
                                                setSelectedPasses={setSelectedPasses}
                                                isComplimentary={isComplimentary}
                                                compact
                                            />
                                        ) : (
                                            <DelegateRegistrationForm
                                                onSubmit={handleFormSubmit}
                                                submitLabel={isComplimentary ? 'Submit Complimentary Registration' : 'Proceed to Payment'}
                                                compact
                                            />
                                        )}
                                    </div>
                                    <div className="lg:col-span-4">
                                        <RegistrationSidebar
                                            onNext={() => {
                                                if (selectedItems.length === 0) {
                                                    alert("Please select at least one session or pass to continue.");
                                                    return;
                                                }
                                                setRegistrationStep(2);
                                            }}
                                            showNextButton={registrationStep === 1}
                                            selectedItems={selectedItems}
                                            subTotal={subTotal}
                                            isComplimentary={isComplimentary}
                                            compact
                                        />
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
};

export default DelegateRegistrationModal;
