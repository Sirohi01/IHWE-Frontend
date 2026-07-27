import { SectionHeader } from "./FormComponents";
import awardImg from "../../../assets/awards1.png";
import type { FormData } from "../NominationForm";

type Props = {
  form: FormData;
  update: (field: keyof FormData, value: string | boolean) => void;
  categories: { _id: string; name: string }[];
};

const AwardCategorySection = ({ form, update, categories }: Props) => (
  <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-3 md:p-4">
    <SectionHeader number="2" title="Award Category" />
    <div className="flex items-center gap-3">
      <div className="flex flex-1 flex-col md:flex-row md:items-center gap-1 md:gap-3">
        <label className="text-[13px] font-semibold text-[#0a2e5c] md:w-44 shrink-0">Select Award Category *</label>
        <select
          value={form.awardCategory}
          onChange={e => update("awardCategory", e.target.value)}
          className="flex-1 px-3 py-1.5 border border-slate-200 rounded-md text-[13.5px] text-slate-500 focus:outline-none focus:ring-1 focus:ring-[#008d48] bg-white appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20fill%3D%22none%22%20viewBox%3D%220%200%2020%2020%22%3E%3Cpath%20stroke%3D%22%236b7280%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20stroke-width%3D%221.5%22%20d%3D%22m6%208%204%204%204-4%22%2F%3E%3C%2Fsvg%3E')] bg-[length:1rem_1rem] bg-no-repeat bg-[right_0.5rem_center]"
        >
          <option value="">-- Select Award Category --</option>
          {categories.map(c => (
            <option key={c._id} value={c.name}>{c.name}</option>
          ))}
        </select>
      </div>
      <div className="hidden md:block shrink-0">
        <img loading="lazy" decoding="async" src={awardImg} alt="Award" className="w-12 h-12 object-contain opacity-60" />
      </div>
    </div>
  </div>
);

export default AwardCategorySection;

