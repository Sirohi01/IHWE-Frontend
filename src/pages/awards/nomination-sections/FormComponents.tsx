import { useRef, useState } from "react";
import { Upload, Globe, ChevronRight, CheckCircle2, Loader2 } from "lucide-react";

// ── Section Header ──
export const SectionHeader = ({ number, title }: { number: string; title: string }) => (
  <div className="flex items-center gap-2.5 mb-2 pb-2 border-b border-slate-100">
    <div className="w-6 h-6 bg-[#008d48] text-white rounded-full flex items-center justify-center text-[11px] font-black shrink-0">
      {number}
    </div>
    <h3 className="text-[#0a2e5c] font-black text-[14px] uppercase tracking-wide">{title}</h3>
  </div>
);

// ── Form Input ──
export const FormInput = ({
  label, placeholder, type = "text", value, onChange
}: {
  label: string; placeholder: string; type?: string;
  value?: string; onChange?: (v: string) => void;
}) => (
  <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-3">
    <label className="text-[13px] font-semibold text-[#0a2e5c] md:w-44 shrink-0">{label}</label>
    <input
      type={type} placeholder={placeholder}
      value={value ?? ""}
      onChange={e => onChange?.(e.target.value)}
      className="flex-1 px-3 py-1.5 border border-slate-200 rounded-md text-[13.5px] text-slate-700 placeholder:text-slate-300 focus:outline-none focus:ring-1 focus:ring-[#008d48] focus:border-[#008d48] bg-white transition-all"
    />
  </div>
);

// ── Form Textarea ──
export const FormTextarea = ({
  label, placeholder, className = "min-h-[70px]", value, onChange
}: {
  label: string; placeholder: string; className?: string;
  value?: string; onChange?: (v: string) => void;
}) => (
  <div className="flex flex-col gap-1">
    {label && <label className="text-[13px] font-semibold text-[#0a2e5c] shrink-0">{label}</label>}
    <textarea
      placeholder={placeholder}
      value={value ?? ""}
      onChange={e => onChange?.(e.target.value)}
      className={`w-full px-3 py-2 border border-slate-200 rounded-md text-[13.5px] text-slate-700 placeholder:text-slate-300 focus:outline-none focus:ring-1 focus:ring-[#008d48] focus:border-[#008d48] bg-white transition-all resize-none ${className}`}
    />
  </div>
);

// ── Form Select ──
export const FormSelect = ({
  label, options, placeholder, value, onChange
}: {
  label: string; options: string[]; placeholder?: string;
  value?: string; onChange?: (v: string) => void;
}) => (
  <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-3">
    <label className="text-[13px] font-semibold text-[#0a2e5c] md:w-44 shrink-0">{label}</label>
    <select
      value={value ?? ""}
      onChange={e => onChange?.(e.target.value)}
      className="flex-1 px-3 py-1.5 border border-slate-200 rounded-md text-[13.5px] text-slate-500 focus:outline-none focus:ring-1 focus:ring-[#008d48] focus:border-[#008d48] bg-white transition-all appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20fill%3D%22none%22%20viewBox%3D%220%200%2020%2020%22%3E%3Cpath%20stroke%3D%22%236b7280%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20stroke-width%3D%221.5%22%20d%3D%22m6%208%204%204%204-4%22%2F%3E%3C%2Fsvg%3E')] bg-[length:1rem_1rem] bg-no-repeat bg-[right_0.5rem_center]"
    >
      {placeholder && <option value="">{placeholder}</option>}
      {options.map(o => <option key={o} value={o}>{o}</option>)}
    </select>
  </div>
);

// ── Upload Card ──
export const UploadCard = ({
  label, icon, isLink = false, value, onChange
}: {
  label: string; icon?: React.ReactNode; isLink?: boolean;
  value?: string; onChange?: (v: string) => void;
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [uploaded, setUploaded] = useState(false);
  const [fileName, setFileName] = useState("");

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const { awardsNominationApi } = await import("../../../lib/api");
      const res = await awardsNominationApi.uploadFile(file);
      if (res.success) {
        setUploaded(true);
        setFileName(file.name);
        onChange?.(res.url);
      }
    } catch {
      alert("Upload failed. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  if (isLink) {
    return (
      <div className="flex flex-col items-center justify-center p-3 border border-slate-200 rounded-lg bg-white hover:border-[#008d48] transition-all text-center gap-1.5">
        <div>{icon ?? <Globe className="w-5 h-5 text-[#008d48]" />}</div>
        <span className="text-[13px] font-semibold text-[#0a2e5c] leading-tight">{label}</span>
        <input
          type="text"
          placeholder="https://www.example.com"
          value={value ?? ""}
          onChange={e => {
            e.stopPropagation();
            onChange?.(e.target.value);
          }}
          onClick={e => e.stopPropagation()}
          className="w-full text-[11px] border border-slate-200 rounded px-1.5 py-1 focus:outline-none focus:ring-1 focus:ring-[#008d48] text-center"
        />
      </div>
    );
  }

  return (
    <div
      onClick={() => !uploading && inputRef.current?.click()}
      className="flex flex-col items-center justify-center p-3 border border-slate-200 rounded-lg bg-white hover:border-[#008d48] transition-all cursor-pointer group text-center gap-1.5"
    >
      <input
        ref={inputRef}
        type="file"
        accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.mp4,.mov,.avi,.webm"
        className="hidden"
        onChange={handleFileChange}
      />
      <div className="group-hover:scale-105 transition-transform">
        {uploading
          ? <Loader2 className="w-5 h-5 text-[#008d48] animate-spin" />
          : uploaded
            ? <CheckCircle2 className="w-5 h-5 text-[#008d48]" />
            : (icon ?? <Upload className="w-5 h-5 text-[#008d48]" />)
        }
      </div>
      <span className="text-[13px] font-semibold text-[#0a2e5c] leading-tight">{label}</span>
      <div className="flex items-center gap-0.5 text-[11px] font-black text-[#008d48] uppercase tracking-tight">
        {uploading ? "Uploading..." : uploaded ? fileName.slice(0, 14) + "..." : <>Upload File <ChevronRight className="w-3 h-3" /></>}
      </div>
    </div>
  );
};

