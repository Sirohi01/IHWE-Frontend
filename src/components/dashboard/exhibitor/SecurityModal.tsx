import { AnimatePresence, motion } from 'framer-motion';
import { KeyRound, X, Eye, EyeOff } from 'lucide-react';

interface SecurityModalProps {
    show: boolean;
    onClose: () => void;
    pwdForm: any;
    setPwdForm: (f: any) => void;
    pwdLoading: boolean;
    showPwd: any;
    setShowPwd: (s: any) => void;
    onSubmit: (e: any) => void;
}

const inputCls = "w-full h-9 px-3 rounded-[2px] border border-slate-400 text-[12px] font-medium bg-white text-slate-900 outline-none focus:border-[#23471d] pr-10";

export default function SecurityModal({
    show, onClose, pwdForm, setPwdForm, pwdLoading, showPwd, setShowPwd, onSubmit
}: SecurityModalProps) {
    return (
        <AnimatePresence>
            {show && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[200] flex items-center justify-center bg-black/40 p-4 print:hidden"
                >
                    <motion.div
                        initial={{ scale: 0.97, y: 10 }}
                        animate={{ scale: 1, y: 0 }}
                        exit={{ scale: 0.97, y: 10 }}
                        className="bg-white shadow-2xl w-full max-w-md overflow-hidden rounded-[2px]"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between px-6 py-4 bg-slate-50 border-b border-slate-200">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 bg-[#23471d] flex items-center justify-center rounded-[2px]">
                                    <KeyRound size={16} className="text-white" />
                                </div>
                                <div>
                                    <h3 className="text-[13px] font-bold text-slate-900 uppercase tracking-tight">Change Password</h3>
                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Exhibitor Portal Security</p>
                                </div>
                            </div>
                            <button onClick={onClose} className="w-7 h-7 flex items-center justify-center hover:bg-slate-200 rounded-[2px] transition-colors">
                                <X size={15} className="text-slate-500" />
                            </button>
                        </div>

                        {/* Form */}
                        <form onSubmit={onSubmit} className="p-6 space-y-4">
                            {[
                                { key: 'current', label: 'Current Password', showKey: 'current' as const },
                                { key: 'newPwd',  label: 'New Password',     showKey: 'newPwd' as const },
                                { key: 'confirm', label: 'Confirm Password', showKey: 'newPwd' as const },
                            ].map(field => (
                                <div key={field.key}>
                                    <label className="text-[10px] font-bold text-slate-700 uppercase tracking-widest block mb-1">{field.label} *</label>
                                    <div className="relative">
                                        <input
                                            type={showPwd[field.showKey] ? 'text' : 'password'}
                                            required
                                            value={(pwdForm as any)[field.key]}
                                            onChange={e => setPwdForm((p: any) => ({ ...p, [field.key]: e.target.value }))}
                                            className={inputCls}
                                            placeholder="••••••••"
                                        />
                                        {field.key !== 'confirm' && (
                                            <button
                                                type="button"
                                                onClick={() => setShowPwd((p: any) => ({ ...p, [field.showKey]: !p[field.showKey] }))}
                                                className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-[#23471d] transition-colors"
                                            >
                                                {showPwd[field.showKey] ? <EyeOff size={14} /> : <Eye size={14} />}
                                            </button>
                                        )}
                                    </div>
                                </div>
                            ))}

                            <div className="flex gap-3 pt-2">
                                <button
                                    type="button"
                                    onClick={onClose}
                                    className="flex-1 py-2 border border-slate-300 text-slate-500 text-[11px] font-bold uppercase tracking-widest rounded-[2px] hover:bg-slate-50 transition-all"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={pwdLoading}
                                    className="flex-1 py-2 bg-[#23471d] hover:bg-[#1a3516] text-white text-[11px] font-bold uppercase tracking-widest rounded-[2px] transition-all disabled:opacity-50"
                                >
                                    {pwdLoading ? 'Saving...' : 'Save Changes'}
                                </button>
                            </div>
                        </form>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
