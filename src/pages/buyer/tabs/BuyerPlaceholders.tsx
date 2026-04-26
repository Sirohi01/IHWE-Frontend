import { useBuyerCtx } from '@/context/BuyerContext';
import { Calendar, FileText, FolderOpen } from 'lucide-react';

export function BuyerCalendarPage() {
    return (
        <div className="bg-white p-8 rounded-md border border-slate-200 text-center space-y-4">
            <Calendar size={48} className="mx-auto text-slate-200" />
            <h1 className="text-xl font-black text-slate-800 uppercase tracking-widest">Meeting Calendar</h1>
            <p className="text-sm text-slate-500">Your scheduled B2B meetings will appear here once confirmed.</p>
        </div>
    );
}

export function BuyerInvoicesPage() {
    const { data } = useBuyerCtx();
    return (
        <div className="space-y-4">
            <div className="bg-white p-4 rounded-md border border-slate-200 shadow-sm flex justify-between items-center">
                <div>
                    <h1 className="text-[13px] font-black uppercase tracking-widest text-slate-800">Invoices & Receipts</h1>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Manage your payment records</p>
                </div>
            </div>
            <div className="bg-white p-8 rounded-md border border-slate-200 text-center space-y-4">
                <FileText size={48} className="mx-auto text-slate-200" />
                <p className="text-sm text-slate-500">No invoices generated yet for {data.registrationId}.</p>
            </div>
        </div>
    );
}

export function BuyerDocumentationPage() {
    return (
        <div className="bg-white p-8 rounded-md border border-slate-200 text-center space-y-4">
            <FolderOpen size={48} className="mx-auto text-slate-200" />
            <h1 className="text-xl font-black text-slate-800 uppercase tracking-widest">Documentation</h1>
            <p className="text-sm text-slate-500">Event brochures, guidebooks, and floor plans will be available here.</p>
        </div>
    );
}
