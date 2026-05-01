import { FileText, Award, Image, Link as LinkIcon } from "lucide-react";
import { SectionHeader, UploadCard } from "./FormComponents";

const SupportingDocumentsSection = () => (
  <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-3 md:p-4">
    <SectionHeader number="5" title="Supporting Documents" />
    <div className="space-y-2">
      <p className="text-[11px] text-slate-400">Upload supporting documents (PDF, DOC, JPG, PNG – Max size 10MB each)</p>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        <UploadCard label="Profile / Company Deck" icon={<div className="w-8 h-8 bg-green-50 rounded-lg flex items-center justify-center"><FileText className="w-4 h-4 text-[#008d48]" /></div>} />
        <UploadCard label="Certifications / Awards" icon={<div className="w-8 h-8 bg-green-50 rounded-lg flex items-center justify-center"><Award className="w-4 h-4 text-[#008d48]" /></div>} />
        <UploadCard label="Images / Videos" icon={<div className="w-8 h-8 bg-green-50 rounded-lg flex items-center justify-center"><Image className="w-4 h-4 text-[#008d48]" /></div>} />
        <UploadCard label="Website / Social Links" isLink icon={<div className="w-8 h-8 bg-green-50 rounded-lg flex items-center justify-center"><LinkIcon className="w-4 h-4 text-[#008d48]" /></div>} />
      </div>
      <p className="text-[10px] text-slate-300 italic">You can upload multiple files after submission.</p>
    </div>
  </div>
);

export default SupportingDocumentsSection;
