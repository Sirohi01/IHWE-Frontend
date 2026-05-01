import { SectionHeader, FormInput, FormSelect } from "./FormComponents";
import type { FormData } from "../NominationForm";

type Props = { form: FormData; update: (field: keyof FormData, value: string | boolean) => void };

const ApplicantDetailsSection = ({ form, update }: Props) => (
  <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-3 md:p-4">
    <SectionHeader number="1" title="Applicant Details" />
    <div className="space-y-2">

      {/* Applicant Type */}
      <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-3">
        <label className="text-[13px] font-semibold text-[#0a2e5c] md:w-44 shrink-0">Applicant Type *</label>
        <div className="flex gap-6">
          {["Individual", "Organization", "Startup"].map(t => (
            <label key={t} className="flex items-center gap-1.5 cursor-pointer">
              <input
                type="radio" name="applicantType"
                checked={form.applicantType === t}
                onChange={() => update("applicantType", t)}
                className="w-3.5 h-3.5 accent-[#008d48] cursor-pointer"
              />
              <span className="text-[13.5px] text-slate-600 font-medium">{t}</span>
            </label>
          ))}
        </div>
      </div>

      <FormInput label="Full Name / Org Name *" placeholder="Enter full name or organization name"
        value={form.fullName} onChange={v => update("fullName", v)} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        <FormInput label="Contact Person *" placeholder="Enter contact person name"
          value={form.contactPersonName} onChange={v => update("contactPersonName", v)} />
        <FormInput label="Designation" placeholder="Enter designation"
          value={form.designation} onChange={v => update("designation", v)} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        <FormInput label="Mobile Number *" placeholder="Enter mobile number" type="tel"
          value={form.mobile} onChange={v => update("mobile", v)} />
        <FormInput label="Email ID *" placeholder="Enter email address" type="email"
          value={form.email} onChange={v => update("email", v)} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        <FormInput label="Website (If any)" placeholder="www.example.com"
          value={form.website} onChange={v => update("website", v)} />
        <FormInput label="City / State / Country *" placeholder="Enter city / state / country"
          value={form.city} onChange={v => update("city", v)} />
      </div>
    </div>
  </div>
);

export default ApplicantDetailsSection;

