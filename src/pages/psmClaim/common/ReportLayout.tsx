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
    showUnderlines?: boolean;
    isLetterhead?: boolean;
    isCommon?: boolean;
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
    maxWidth = "210mm",
    showUnderlines = true,
    isLetterhead = false,
    isCommon = false
}) => {
    return (
        <div className="flex flex-col gap-0 mx-auto min-h-screen bg-slate-50/50">
            <ReportHeader title={title} />

            <div className="p-4 sm:p-8 flex flex-col items-center">
                <div
                    ref={componentRef}
                    id="printable-form"
                    className="bg-white pt-[10mm] pb-[8mm] px-[8mm] shadow-2xl w-full text-[#000] text-[12px] leading-tight relative overflow-hidden"
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
                        margin: ${isLetterhead ? '35mm 10mm 20mm 10mm' : '8mm 8mm 5mm 8mm'}; 
                    }
                    .no-print { display: none !important; }
                    body { background: white !important; }
                    #printable-form {
                        width: 100% !important;
                        padding: ${isLetterhead ? '5mm 10mm' : '5mm 5mm 2mm 5mm'} !important;
                        box-shadow: none !important;
                        zoom: ${isLetterhead ? '0.9' : '0.98'} !important;
                        display: block !important;
                        min-height: auto !important;
                        overflow: visible !important;
                        page-break-inside: avoid !important;
                        break-inside: avoid !important;
                    }
                    table, th, td { 
                        border-color: black !important; 
                        padding: 6px 9px !important;
                    }
                    input::placeholder, textarea::placeholder { 
                        color: transparent !important; 
                        -webkit-text-fill-color: transparent !important;
                    }
                    input, textarea { 
                        border-top: none !important; 
                        border-left: none !important; 
                        border-right: none !important;
                        border-bottom: ${showUnderlines ? '1px solid black !important' : 'none !important'};
                        background: transparent !important;
                    }
                    table { font-size: inherit; width: 100% !important; }
                    tr, p, div { page-break-inside: auto !important; }
                    /* Restore standard spacing in print mode */
                    .space-y-6 > * + * { margin-top: 1.5rem !important; }
                }
            `}} />
        </div>
    );
};

export default ReportLayout;
