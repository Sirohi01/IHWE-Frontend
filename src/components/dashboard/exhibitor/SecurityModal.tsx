import { motion, AnimatePresence } from 'framer-motion';
import { KeyRound, X, EyeOff, Eye } from 'lucide-react';

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
                    className="fixed inset-0 z-[200] flex items-center justify-center bg-slate-900/40 backdrop-blur-md p-4 print:hidden"
                >
                    <motion.div
                        initial={{ scale: 0.95, y: 20 }}
                        animate={{ scale: 1, y: 0 }}
                        exit={{ scale: 0.95, y: 20 }}
                        className="bg-white rounded-[3rem] shadow-2xl w-full max-w-md overflow-hidden relative"
                    >
                        <div className="px-10 py-10 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-2xl bg-[#23471d] text-white flex items-center justify-center">
                                    <KeyRound size={20} />
                                </div>
                                <div>
                                    <h3 className="text-lg font-black text-slate-900 tracking-tight">Security Update</h3>
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Credential Governance</p>
                                </div>
                            </div>
                            <button onClick={onClose} className="w-8 h-8 rounded-full hover:bg-slate-200 flex items-center justify-center transition-colors">
                                <X size={18} className="text-slate-500" />
                            </button>
                        </div>
                        <form onSubmit={onSubmit} className="p-10 space-y-6">
                            {[
                                { key: 'current', label: 'Current Authentication', showKey: 'current' as const },
                                { key: 'newPwd', label: 'New Passphrase', showKey: 'newPwd' as const },
                                { key: 'confirm', label: 'Validate Passphrase', showKey: 'newPwd' as const },
                            ].map(field => (
                                <div key={field.key}>
                                    <label className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] block mb-2 px-1">{field.label}</label>
                                    <div className="relative group">
                                        <input
                                            type={showPwd[field.showKey] ? 'text' : 'password'}
                                            required
                                            value={(pwdForm as any)[field.key]}
                                            onChange={e => setPwdForm((p: any) => ({ ...p, [field.key]: e.target.value }))}
                                            className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-[13px] font-bold focus:outline-none focus:bg-white focus:border-[#23471d]/30 focus:shadow-sm transition-all"
                                            placeholder="••••••••"
                                        />
                                        {field.key !== 'confirm' && (
                                            <button type="button" onClick={() => setShowPwd((p: any) => ({ ...p, [field.showKey]: !p[field.showKey] }))}
                                                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 hover:text-[#23471d] transition-colors">
                                                {showPwd[field.showKey] ? <EyeOff size={16} /> : <Eye size={16} />}
                                            </button>
                                        )}
                                    </div>
                                </div>
                            ))}
                            <div className="grid grid-cols-2 gap-4 pt-4">
                                <button
                                    type="button"
                                    onClick={onClose}
                                    className="py-4 rounded-2xl text-[11px] font-black uppercase tracking-widest text-slate-400 hover:bg-slate-50 transition-all"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={pwdLoading}
                                    className="py-4 bg-[#23471d] hover:bg-black text-white rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all shadow-xl shadow-green-900/20 disabled:opacity-50"
                                >
                                    {pwdLoading ? 'UPDATING...' : 'SAVE CHANGES'}
                                </button>
                            </div>
                        </form>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
