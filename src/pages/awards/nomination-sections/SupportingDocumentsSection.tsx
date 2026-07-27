import { SectionHeader, UploadCard } from "./FormComponents";
import doc22 from "../../../assets/doc22.png";
import certificate11 from "../../../assets/certificate11.png";
import documentsImg from "../../../assets/documents.png";
import uplinkImg from "../../../assets/uplink.png";
import type { FormData } from "../NominationForm";

type Props = { form: FormData; update: (field: keyof FormData, value: string | boolean) => void };

const SupportingDocumentsSection = ({ form, update }: Props) => (
  <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-3 md:p-4">
    <SectionHeader number="5" title="Supporting Documents" />
    <div className="space-y-2">
      <p className="text-[11px] text-slate-400">Upload supporting documents (PDF, DOC, JPG, PNG – Max size 10MB each)</p>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        <UploadCard
          label="Profile / Company Deck"
          icon={<img loading="lazy" decoding="async" src={doc22} alt="Profile Deck" className="w-8 h-8 object-contain" />}
          value={form.profileDeckUrl}
          onChange={v => update("profileDeckUrl", v)}
        />
        <UploadCard
          label="Certifications / Awards"
          icon={<img loading="lazy" decoding="async" src={certificate11} alt="Certifications" className="w-8 h-8 object-contain" />}
          value={form.certificationsUrl}
          onChange={v => update("certificationsUrl", v)}
        />
        <UploadCard
          label="Images / Videos"
          icon={<img loading="lazy" decoding="async" src={documentsImg} alt="Images Videos" className="w-8 h-8 object-contain" />}
          value={form.imagesUrl}
          onChange={v => update("imagesUrl", v)}
        />
        <UploadCard
          label="Website / Social Links"
          isLink
          icon={<img loading="lazy" decoding="async" src={uplinkImg} alt="Social Links" className="w-8 h-8 object-contain" />}
          value={form.socialLinks}
          onChange={v => update("socialLinks", v)}
        />
      </div>
      <p className="text-[10px] text-slate-300 italic">You can upload multiple files after submission.</p>
    </div>
  </div>
);

export default SupportingDocumentsSection;
