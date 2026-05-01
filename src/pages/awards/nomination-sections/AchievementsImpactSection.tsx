import { SectionHeader } from "./FormComponents";

const Field = ({ label, placeholder, tall = false }: { label: string; placeholder: string; tall?: boolean }) => (
  <div className="space-y-1">
    <label className="text-[11.5px] font-semibold text-[#0a2e5c] block">{label}</label>
    <textarea
      placeholder={placeholder}
      className={`w-full px-3 py-1.5 border border-slate-200 rounded-md text-[12px] placeholder:text-slate-300 focus:outline-none focus:ring-1 focus:ring-[#008d48] bg-white resize-none ${tall ? "min-h-[65px]" : "min-h-[52px]"}`}
    />
  </div>
);

const AchievementsImpactSection = () => (
  <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-3 md:p-4">
    <SectionHeader number="4" title="Achievements & Impact" />
    <div className="space-y-2">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        <Field label="Key Achievements (Max 5 points) *" placeholder="List your major achievements, awards, recognitions or milestones." />
        <Field label="Unique Contribution to Healthcare / Wellness *" placeholder="What makes you unique and your contribution to the industry?" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        <Field label="Impact Created *" placeholder="Share the impact created, people served, lives touched, growth metrics, etc." />
        <Field label="Innovation / Technology Used (If any)" placeholder="Mention any innovation, technology or research that adds value." />
      </div>
      <Field label="Why do you deserve this award? (Max 100 words) *" placeholder="Share why you believe you are the right choice for this award." tall />
    </div>
  </div>
);

export default AchievementsImpactSection;
