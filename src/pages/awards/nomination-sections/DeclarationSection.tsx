import { Send, ShieldCheck } from "lucide-react";
import { SectionHeader } from "./FormComponents";
import type { FormData } from "../NominationForm";

type Props = {
  form: FormData;
  update: (field: keyof FormData, value: string | boolean) => void;
  onSubmit: () => void;
  submitting: boolean;
  error: string;
};

const DeclarationSection = ({ form, update, onSubmit, submitting, error }: Props) => (
  <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-3 md:p-4">
    <SectionHeader number="6" title="Declaration" />
    <div className="space-y-3">

      <label className="flex items-start gap-2.5 cursor-pointer">
        <input
          type="checkbox"
          checked={form.declaration}
          onChange={e => update("declaration", e.target.checked)}
          className="w-4 h-4 mt-0.5 accent-[#008d48] cursor-pointer shrink-0"
        />
        <span className="text-[13.5px] text-slate-600 leading-snug">
          I hereby declare that the information provided above is true, correct and complete to the best of my knowledge.
        </span>
      </label>

      {error && (
        <p className="text-red-500 text-[13px] font-semibold bg-red-50 border border-red-100 rounded-lg px-3 py-2">
          ⚠️ {error}
        </p>
      )}

      <div className="flex flex-col items-center gap-2">
        <button
          type="button"
          onClick={onSubmit}
          disabled={submitting}
          className="w-full max-w-xs py-3 bg-[#1a7a3c] text-white rounded-lg font-black text-[13px] uppercase tracking-widest flex items-center justify-center gap-3 shadow-md hover:bg-[#166832] transition-all disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {submitting ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Submitting...
            </>
          ) : (
            <>
              <Send className="w-4 h-4" /> Submit Nomination
            </>
          )}
        </button>
        <div className="flex items-center gap-1.5 text-slate-400 text-[10px]">
          <ShieldCheck className="w-3.5 h-3.5 text-[#008d48]" />
          Your information is secure and will be kept confidential.
        </div>
      </div>
    </div>
  </div>
);

export default DeclarationSection;

