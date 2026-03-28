import { useState, useEffect } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { X, CheckCircle, User, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface VisitorRegistrationDrawerProps {
    open: boolean;
    onClose: () => void;
}

const VisitorRegistrationDrawer = ({ open, onClose }: VisitorRegistrationDrawerProps) => {
    const [submitted, setSubmitted] = useState(false);

    useEffect(() => {
        if (open) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [open]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitted(true);
    };

    const inputClasses = "rounded-none border-slate-200 h-10 focus:border-[#23471d] focus:ring-[#23471d]/10 transition-all font-inter text-sm";
    const labelClasses = "text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-1.5 block font-inter";

    const pathVariants: Variants = {
        hidden: { pathLength: 0, opacity: 0 },
        visible: {
            pathLength: 1,
            opacity: 1,
            transition: {
                pathLength: { duration: 1.5, ease: [0.4, 0, 0.2, 1], delay: 0.5 },
                opacity: { duration: 0.3, delay: 0.5 },
            } as never,
        },
    };

    return (
        <AnimatePresence>
            {open && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[100]"
                    />
                    <motion.div
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ type: "spring", damping: 30, stiffness: 300 }}
                        className="fixed right-0 top-0 bottom-0 w-full max-w-lg bg-[#F7F8F0] z-[101] shadow-2xl flex flex-col font-inter"
                    >
                        {/* Header */}
                        <div className="relative py-6 px-8 bg-white border-b border-slate-100 flex flex-col items-center">
                            <button
                                onClick={onClose}
                                className="absolute top-4 right-4 p-2 rounded-full bg-slate-50 hover:bg-[#23471d]/5 hover:text-[#23471d] transition-all group"
                            >
                                <X className="w-5 h-5" />
                            </button>

                            <div className="flex flex-col items-center gap-1 w-full">
                                <div className="flex items-center gap-3 mb-1">
                                    <div className="h-px w-6 bg-[#23471d]" />
                                    <span className="text-[10px] font-bold text-[#23471d] uppercase tracking-[0.4em]">Registration</span>
                                    <div className="h-px w-6 bg-[#23471d]" />
                                </div>

                                <h2 className="text-2xl font-bold text-slate-900 tracking-tight text-center relative px-6">
                                    REGISTER TO{" "}
                                    <span className="text-[#d26019] relative inline-block">
                                        VISIT
                                        <motion.svg
                                            className="absolute -bottom-2.5 left-0 w-full h-2.5 text-[#23471d]"
                                            viewBox="0 0 200 12"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                            initial="hidden"
                                            animate="visible"
                                        >
                                            <motion.path
                                                d="M2 10C60 2, 140 2, 198 10"
                                                stroke="currentColor"
                                                strokeWidth="3"
                                                strokeLinecap="round"
                                                variants={pathVariants}
                                            />
                                        </motion.svg>
                                    </span>
                                </h2>
                            </div>
                        </div>

                        <div className="flex-1 overflow-y-auto p-8">
                            {submitted ? (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="flex flex-col items-center justify-center h-full text-center"
                                >
                                    <div className="w-16 h-16 bg-[#23471d]/10 rounded-full flex items-center justify-center mb-5 text-[#23471d]">
                                        <CheckCircle className="w-8 h-8" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-slate-900 mb-2 tracking-tight">Registration Complete!</h3>
                                    <p className="text-slate-600 mb-6 max-w-xs leading-relaxed text-sm">
                                        Thank you for registering to visit IHWE 2026. Your visitor pass details have been sent to your email address.
                                    </p>
                                    <Button
                                        onClick={() => { setSubmitted(false); onClose(); }}
                                        className="h-11 px-8 rounded-none bg-[#23471d] hover:bg-[#d26019] text-white font-bold transition-all shadow-lg"
                                    >
                                        Return to Expo
                                    </Button>
                                </motion.div>
                            ) : (
                                <form onSubmit={handleSubmit} className="flex flex-col gap-6">

                                    {/* Visitor Information */}
                                    <div className="space-y-4">
                                        <div className="flex items-center gap-2 mb-2 border-b border-slate-100 pb-2">
                                            <User className="w-4 h-4 text-[#d26019]" />
                                            <h4 className="text-[11px] font-bold uppercase tracking-widest text-[#23471d]">Visitor Information</h4>
                                        </div>

                                        <div>
                                            <Label className={labelClasses}>Full Name *</Label>
                                            <Input required placeholder="E.g. John Doe" className={inputClasses} />
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div>
                                                <Label className={labelClasses}>Email Address *</Label>
                                                <Input type="email" required placeholder="john@example.com" className={inputClasses} />
                                            </div>
                                            <div>
                                                <Label className={labelClasses}>Mobile Number *</Label>
                                                <Input required placeholder="+91 98765 43210" className={inputClasses} />
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div>
                                                <Label className={labelClasses}>City *</Label>
                                                <Input required placeholder="Your City" className={inputClasses} />
                                            </div>
                                            <div>
                                                <Label className={labelClasses}>Occupation / Role</Label>
                                                <Input placeholder="E.g. Doctor, Merchant, etc." className={inputClasses} />
                                            </div>
                                        </div>

                                        <div>
                                            <Label className={labelClasses}>Interested In (Wellness / Ayurveda / Organic...)</Label>
                                            <Input placeholder="E.g. Ayurveda, Organic Products" className={inputClasses} />
                                        </div>
                                    </div>

                                    <div className="mt-4">
                                        <p className="text-[11px] text-slate-500 leading-relaxed italic">
                                            * Join thousands of visitors at India's largest health & wellness event. Pre-registration ensures quick entry and exclusive updates.
                                        </p>
                                    </div>

                                    <Button
                                        type="submit"
                                        className="h-12 rounded-none bg-[#23471d] hover:bg-[#d26019] text-white font-bold text-sm uppercase tracking-widest transition-all shadow-xl flex items-center justify-center gap-3 mt-4 group"
                                    >
                                        Register Now <Send className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                                    </Button>
                                </form>
                            )}
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default VisitorRegistrationDrawer;