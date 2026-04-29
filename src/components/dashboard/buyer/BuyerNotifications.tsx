
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, BellOff, CheckCircle, AlertCircle, Info, Trash2, Clock, MailOpen, Mail, CreditCard, User, Handshake } from 'lucide-react';
import { toast } from 'sonner';
import { useBuyerCtx } from '@/context/BuyerContext';

interface Notification {
    _id: string;
    title: string;
    message: string;
    type: 'info' | 'success' | 'warning' | 'error';
    read: boolean;
    createdAt: string;
}

export default function BuyerNotifications() {
    const { data } = useBuyerCtx();
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!data) return;

        const dynamicNotifs: Notification[] = [];

        // 1. Welcome Notification (based on registration date)
        const regDate = new Date(data.createdAt || Date.now());
        const isNew = (Date.now() - regDate.getTime()) < 7 * 24 * 60 * 60 * 1000;
        
        dynamicNotifs.push({
            _id: 'welcome',
            title: 'Welcome to 9th IHWE!',
            message: `Hello ${data.fullName || 'Buyer'}, thank you for joining us. Your Registration ID is ${data.registrationId}.`,
            type: 'success',
            read: !isNew,
            createdAt: data.createdAt || new Date().toISOString()
        });

        // 2. Payment Notification
        if (data.paymentStatus === 'Pending') {
            dynamicNotifs.push({
                _id: 'payment-pending',
                title: 'Payment Action Required',
                message: `Your registration fee of ${data.registrationFee || '₹0'} is currently pending. Please complete it to confirm your hosted buyer status.`,
                type: 'warning',
                read: false,
                createdAt: new Date().toISOString()
            });
        } else if (data.paymentStatus === 'Completed') {
            dynamicNotifs.push({
                _id: 'payment-success',
                title: 'Payment Verified',
                message: 'Your registration payment has been successfully verified. Welcome aboard!',
                type: 'success',
                read: true,
                createdAt: data.updatedAt || new Date().toISOString()
            });
        }

        // 3. Profile Completion
        const requiredFields = ['gstNumber', 'panNumber', 'businessType', 'registeredAddress'];
        const missingFields = requiredFields.filter(f => !data[f]);
        
        if (missingFields.length > 0) {
            dynamicNotifs.push({
                _id: 'profile-incomplete',
                title: 'Complete Your Business Profile',
                message: `You haven't provided your ${missingFields.join(', ')}. Complete these to increase your matchmaking chances.`,
                type: 'info',
                read: false,
                createdAt: new Date().toISOString()
            });
        }

        // 4. B2B / BSM Status
        if (data.b2bMeetInterest === 'Yes') {
            dynamicNotifs.push({
                _id: 'bsm-interest',
                title: 'B2B Matchmaking Active',
                message: 'You are registered for B2B meetings. Keep an eye on the BSM section for meeting requests from exhibitors.',
                type: 'info',
                read: true,
                createdAt: new Date().toISOString()
            });
        }

        setNotifications(dynamicNotifs);
        setLoading(false);
    }, [data]);

    const markAsRead = (id: string) => {
        setNotifications(prev => prev.map(n => n._id === id ? { ...n, read: true } : n));
        toast.success('Notification marked as read');
    };

    const deleteNotification = (id: string) => {
        setNotifications(prev => prev.filter(n => n._id !== id));
        toast.success('Notification deleted');
    };

    const markAllRead = () => {
        setNotifications(prev => prev.map(n => ({ ...n, read: true })));
        toast.success('All notifications marked as read');
    };

    const clearAll = () => {
        setNotifications([]);
        toast.success('All notifications cleared');
    };

    const getIcon = (type: string, id?: string) => {
        if (id === 'payment-pending' || id === 'payment-success') return <CreditCard className={type === 'success' ? 'text-emerald-500' : 'text-amber-500'} size={18} />;
        if (id === 'profile-incomplete') return <User className="text-blue-500" size={18} />;
        if (id === 'bsm-interest') return <Handshake className="text-indigo-500" size={18} />;

        switch (type) {
            case 'success': return <CheckCircle className="text-emerald-500" size={18} />;
            case 'warning': return <AlertCircle className="text-amber-500" size={18} />;
            case 'error': return <AlertCircle className="text-rose-500" size={18} />;
            default: return <Info className="text-blue-500" size={18} />;
        }
    };

    if (loading) {
        return (
            <div className="h-64 flex flex-col items-center justify-center gap-3">
                <div className="w-8 h-8 border-4 border-[#23471d]/20 border-t-[#23471d] rounded-full animate-spin" />
                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Fetching Notifications...</p>
            </div>
        );
    }

    return (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl mx-auto">
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-[#23471d]/10 rounded-lg text-[#23471d]">
                            <Bell size={20} />
                        </div>
                        <div>
                            <h1 className="text-[15px] font-black uppercase tracking-widest text-slate-800">Notifications</h1>
                            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Stay updated with latest activities</p>
                        </div>
                    </div>
                    
                    {notifications.length > 0 && (
                        <div className="flex gap-2">
                            <button 
                                onClick={markAllRead}
                                className="text-[10px] font-bold uppercase tracking-wider text-slate-500 hover:text-[#23471d] transition-colors"
                            >
                                Mark all as read
                            </button>
                            <span className="text-slate-300">|</span>
                            <button 
                                onClick={clearAll}
                                className="text-[10px] font-bold uppercase tracking-wider text-slate-500 hover:text-rose-600 transition-colors"
                            >
                                Clear all
                            </button>
                        </div>
                    )}
                </div>

                <div className="divide-y divide-slate-100">
                    <AnimatePresence mode='popLayout'>
                        {notifications.length === 0 ? (
                            <motion.div 
                                initial={{ opacity: 0 }} 
                                animate={{ opacity: 1 }}
                                className="py-20 flex flex-col items-center justify-center text-slate-400 gap-4"
                            >
                                <div className="p-6 bg-slate-50 rounded-full">
                                    <BellOff size={48} className="text-slate-300" />
                                </div>
                                <div className="text-center">
                                    <p className="font-bold uppercase tracking-widest text-[12px]">No new notifications</p>
                                    <p className="text-[10px] mt-1">We'll notify you when something important happens.</p>
                                </div>
                            </motion.div>
                        ) : (
                            notifications.map((n) => (
                                <motion.div 
                                    key={n._id}
                                    layout
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 10 }}
                                    className={`p-5 flex gap-4 transition-colors group relative ${!n.read ? 'bg-[#23471d]/5' : 'hover:bg-slate-50'}`}
                                >
                                    <div className="shrink-0 mt-1">
                                        {getIcon(n.type, n._id)}
                                    </div>
                                    
                                    <div className="flex-1 min-w-0">
                                        <div className="flex justify-between items-start gap-4">
                                            <h3 className={`text-[13px] font-bold tracking-tight leading-none mb-1.5 ${!n.read ? 'text-[#23471d]' : 'text-slate-700'}`}>
                                                {n.title}
                                            </h3>
                                            <span className="text-[10px] font-medium text-slate-400 whitespace-nowrap flex items-center gap-1">
                                                <Clock size={10} />
                                                {new Date(n.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                                            </span>
                                        </div>
                                        <p className="text-[12px] text-slate-500 leading-relaxed max-w-2xl">
                                            {n.message}
                                        </p>
                                        
                                        <div className="mt-3 flex gap-3">
                                            {!n.read && (
                                                <button 
                                                    onClick={() => markAsRead(n._id)}
                                                    className="text-[10px] font-bold text-[#23471d] uppercase tracking-widest flex items-center gap-1 hover:underline"
                                                >
                                                    <MailOpen size={10} /> Mark as read
                                                </button>
                                            )}
                                            <button 
                                                onClick={() => deleteNotification(n._id)}
                                                className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1 hover:text-rose-600 transition-colors"
                                            >
                                                <Trash2 size={10} /> Remove
                                            </button>
                                        </div>
                                    </div>

                                    {!n.read && (
                                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#23471d]" />
                                    )}
                                </motion.div>
                            ))
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </motion.div>
    );
}
