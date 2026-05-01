import { SectionHeader } from "./FormComponents";
import type { FormData } from "../NominationForm";

type Props = { form: FormData; update: (field: keyof FormData, value: string | boolean) => void };

const Field = ({ label, placeholder, value, onChange, tall = false }: {
  label: string; placeholder: string; value: string;
  onChange: (v: string) => void; tall?: boolean;
}) => (
  <div className="space-y-1">
    <label className="text-[13px] font-semibold text-[#0a2e5c] block">{label}</label>
    <textarea
      value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder}
      className={`w-full px-3 py-1.5 border border-slate-200 rounded-md text-[13.5px] placeholder:text-slate-300 focus:outline-none focus:ring-1 focus:ring-[#008d48] bg-white resize-none ${tall ? "min-h-[65px]" : "min-h-[52px]"}`}
    />
  </div>
);

const AchievementsImpactSection = ({ form, update }: Props) => (
  <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-3 md:p-4">
    <SectionHeader number="4" title="Achievements & Impact" />
    <div className="space-y-2">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        <Field label="Key Achievements (Max 5 points) *" placeholder="List your major achievements, awards, recognitions or milestones."
          value={form.keyAchievements} onChange={v => update("keyAchievements", v)} />
        <Field label="Unique Contribution to Healthcare / Wellness *" placeholder="What makes you unique and your contribution to the industry?"
          value={form.uniqueContribution} onChange={v => update("uniqueContribution", v)} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        <Field label="Impact Created *" placeholder="Share the impact created, people served, lives touched, growth metrics, etc."
          value={form.impactCreated} onChange={v => update("impactCreated", v)} />
        <Field label="Innovation / Technology Used (If any)" placeholder="Mention any innovation, technology or research that adds value."
          value={form.innovationUsed} onChange={v => update("innovationUsed", v)} />
      </div>
      <Field label="Why do you deserve this award? (Max 100 words) *" placeholder="Share why you believe you are the right choice for this award."
        value={form.whyDeserve} onChange={v => update("whyDeserve", v)} tall />
    </div>
  </div>
);

export default AchievementsImpactSection;

