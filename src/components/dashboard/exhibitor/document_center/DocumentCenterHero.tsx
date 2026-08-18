import React from "react";
import { Folder, FileText, UploadCloud } from "lucide-react";

const DocumentCenterHero: React.FC = () => {
    return (
        <div className="w-full">
            <div className="relative w-full rounded-2xl overflow-hidden bg-gradient-to-br from-[#eaf4ff] via-[#eef6ff] to-[#e6f7ef] border border-slate-100">
                {/* Decorative blurred accents */}
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-sky-200/40 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute -bottom-12 right-20 w-40 h-40 bg-emerald-200/40 rounded-full blur-3xl pointer-events-none" />

                <div className="relative flex items-center justify-between gap-4 px-5 py-3.5 md:px-6 md:py-4">
                    <div className="min-w-0">
                        <h1 className="text-[16px] md:text-[18px] font-black leading-snug tracking-tight text-[#0f1f3d] whitespace-nowrap">
                            All Your Documents, <span className="text-[#f0730d]">All in One Place</span>
                        </h1>
                        <p className="mt-0.5 text-[11px] font-medium text-slate-500 max-w-md">
                            Upload, manage and track every document required for your participation.
                        </p>
                    </div>

                    {/* Icon illustration cluster */}
                    <div className="relative shrink-0 hidden sm:flex items-center justify-center w-14 h-14">
                        <div className="absolute inset-0 rounded-full bg-white/70 shadow-inner" />
                        <div className="relative flex items-center justify-center w-9 h-9 rounded-xl bg-[#f6b93b] shadow-lg rotate-[-8deg]">
                            <Folder size={18} className="text-white" strokeWidth={1.8} fill="currentColor" fillOpacity={0.15} />
                        </div>
                        <div className="absolute -top-1 right-0 w-5 h-5 rounded-md bg-white shadow-md flex items-center justify-center rotate-6">
                            <FileText size={10} className="text-blue-600" />
                        </div>
                        <div className="absolute -bottom-1 -left-1 w-6 h-6 rounded-full bg-[#3b82f6] shadow-md flex items-center justify-center">
                            <UploadCloud size={11} className="text-white" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DocumentCenterHero;
