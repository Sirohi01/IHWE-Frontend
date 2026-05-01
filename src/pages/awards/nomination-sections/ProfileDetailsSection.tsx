import { SectionHeader, FormSelect } from "./FormComponents";
import profileImg from "../../../assets/profile1.png";
import type { FormData } from "../NominationForm";

type Props = { form: FormData; update: (field: keyof FormData, value: string | boolean) => void };

const ProfileDetailsSection = ({ form, update }: Props) => (
  <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-3 md:p-4">
    <SectionHeader number="3" title="Profile Details" />
    <div className="space-y-2">

      <div className="space-y-1">
        <label className="text-[13px] font-semibold text-[#0a2e5c]">Brief Profile (150 – 200 words) *</label>
        <textarea
          value={form.briefProfile}
          onChange={e => update("briefProfile", e.target.value)}
          placeholder="Tell us about yourself / your organization and your core purpose."
          className="w-full px-3 py-2 border border-slate-200 rounded-md text-[13.5px] placeholder:text-slate-300 focus:outline-none focus:ring-1 focus:ring-[#008d48] bg-white resize-none min-h-[55px]"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        <FormSelect label="Years of Experience *" placeholder="Select Experience"
          options={["0-2 years", "2-5 years", "5-10 years", "10+ years"]}
          value={form.yearsOfExperience} onChange={v => update("yearsOfExperience", v)} />
        <FormSelect label="Team Size (If Organization)" placeholder="Select Team Size"
          options={["1-10", "11-50", "51-200", "201+"]}
          value={form.teamSize} onChange={v => update("teamSize", v)} />
      </div>

      <div className="flex items-end gap-3">
        <div className="flex-1 space-y-1">
          <label className="text-[13px] font-semibold text-[#0a2e5c]">Key Services / Products Offered *</label>
          <textarea
            value={form.keyServices}
            onChange={e => update("keyServices", e.target.value)}
            placeholder="Write about the key services or products you offer."
            className="w-full px-3 py-2 border border-slate-200 rounded-md text-[13.5px] placeholder:text-slate-300 focus:outline-none focus:ring-1 focus:ring-[#008d48] bg-white resize-none min-h-[48px]"
          />
        </div>
        <div className="hidden md:block shrink-0 mb-1">
          <img src={profileImg} alt="Profile" className="w-16 h-16 object-contain opacity-70" />
        </div>
      </div>
    </div>
  </div>
);

export default ProfileDetailsSection;

