import React from 'react';
import { Printer, Download, Save, Loader2 } from 'lucide-react';
import ReportHeader from './ReportHeader';

interface ReportLayoutProps {
    title: string;
    children: React.ReactNode;
    componentRef: React.RefObject<HTMLDivElement | null>;
    handlePrint: () => void;
    handleDownload: () => void;
    handleSave: () => void;
    saving: boolean;
    reportId?: string;
    isExporting?: boolean;
    maxWidth?: string;
}

const ReportLayout: React.FC<ReportLayoutProps> = ({
    title,
    children,
    componentRef,
    handlePrint,
    handleDownload,
    handleSave,
    saving,
    reportId,
    isExporting = false,
    maxWidth = "210mm"
}) => {
    return (
        <div className="flex flex-col gap-0 mx-auto min-h-screen bg-slate-50/50">
            <ReportHeader title={title} />

            <div className="p-4 sm:p-8 flex flex-col items-center">
                <div
                    ref={componentRef}
                    id="printable-form"
                    className="bg-white pt-[10mm] pb-[15mm] px-[15mm] shadow-2xl w-full text-[#000] text-[12px] leading-tight relative overflow-hidden"
                    style={{ 
                        fontFamily: "'Inter', sans-serif",
                        maxWidth: maxWidth,
                        minHeight: "297mm" 
                    }}
                >
                    {/* Corner Action Icons - Only visible in Web View */}
                    <div className="absolute top-4 right-4 flex gap-2 no-print">
                        <button
                            onClick={handlePrint}
                            className="p-2.5 bg-slate-50 hover:bg-slate-100 text-slate-400 hover:text-slate-600 rounded-full transition-all shadow-sm border border-slate-100 group"
                            title="Print Document"
                        >
                            <Printer size={18} className="group-hover:scale-110 transition-transform" />
                        </button>
                        <button
                            onClick={handleDownload}
                            className="p-2.5 bg-slate-50 hover:bg-slate-100 text-slate-400 hover:text-slate-600 rounded-full transition-all shadow-sm border border-slate-100 group"
                            title="Download PDF"
                        >
                            <Download size={18} className="group-hover:scale-110 transition-transform" />
                        </button>
                    </div>

                    {children}
                </div>
            </div>

            {/* Bottom Save Button */}
            <div className="flex justify-center mb-12 no-print">
                <button
                    onClick={handleSave}
                    disabled={saving}
                    className="flex items-center gap-2 px-8 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all shadow-lg active:scale-95 font-semibold disabled:opacity-50"
                >
                    {saving ? <Loader2 size={20} className="animate-spin" /> : <Save size={20} />}
                    {reportId ? 'Update Report' : 'Save Report'}
                </button>
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
                @media print {
                    @page { 
                        size: A4; 
                        margin: 10mm 15mm; 
                    }
                    .no-print { display: none !important; }
                    body { background: white !important; }
                    #printable-form {
                        width: 100% !important;
                        padding: 0 !important;
                        box-shadow: none !important;
                        zoom: 1;
                        display: flex;
                        flex-direction: column;
                        min-height: 277mm;
                        border: none !important;
                    }
                    table, th, td { 
                        border-color: black !important; 
                        padding: 6px !important;
                    }
                    input, textarea { border-bottom: none !important; border-top: none !important; border-left: none !important; border-right: none !important; }
                    .print-bold { font-weight: bold !important; }
                }
            `}} />
        </div>
    );
};

export default ReportLayout;
