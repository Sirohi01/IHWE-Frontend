import { useState, useEffect } from "react";
import { awardsNominationApi, awardCategoryApi } from "../../lib/api";
import ApplicantDetailsSection from "./nomination-sections/ApplicantDetailsSection";
import AwardCategorySection from "./nomination-sections/AwardCategorySection";
import ProfileDetailsSection from "./nomination-sections/ProfileDetailsSection";
import AchievementsImpactSection from "./nomination-sections/AchievementsImpactSection";
import SupportingDocumentsSection from "./nomination-sections/SupportingDocumentsSection";
import DeclarationSection from "./nomination-sections/DeclarationSection";

export type FormData = {
  // Section 1
  applicantType: string;
  fullName: string;
  contactPersonName: string;
  designation: string;
  mobile: string;
  email: string;
  website: string;
  city: string;
  // Section 2
  awardCategory: string;
  // Section 3
  briefProfile: string;
  yearsOfExperience: string;
  teamSize: string;
  keyServices: string;
  // Section 4
  keyAchievements: string;
  uniqueContribution: string;
  impactCreated: string;
  innovationUsed: string;
  whyDeserve: string;
  // Section 5
  socialLinks: string;
  // Section 6
  declaration: boolean;
};

const INITIAL: FormData = {
  applicantType: "", fullName: "", contactPersonName: "", designation: "",
  mobile: "", email: "", website: "", city: "",
  awardCategory: "",
  briefProfile: "", yearsOfExperience: "", teamSize: "", keyServices: "",
  keyAchievements: "", uniqueContribution: "", impactCreated: "", innovationUsed: "", whyDeserve: "",
  socialLinks: "",
  declaration: false,
};

const NominationForm = () => {
  const [form, setForm] = useState<FormData>(INITIAL);
  const [categories, setCategories] = useState<{ _id: string; name: string }[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    awardCategoryApi.getAll().then(setCategories).catch(() => {});
  }, []);

  const update = (field: keyof FormData, value: string | boolean) => {
    setForm(prev => ({ ...prev, [field]: value }));
    setError("");
  };

  const handleSubmit = async () => {
    // Basic validation
    if (!form.applicantType) return setError("Please select applicant type.");
    if (!form.fullName.trim()) return setError("Full name is required.");
    if (!form.contactPersonName.trim()) return setError("Contact person name is required.");
    if (!form.mobile.trim()) return setError("Mobile number is required.");
    if (!form.email.trim()) return setError("Email is required.");
    if (!form.awardCategory) return setError("Please select an award category.");
    if (!form.declaration) return setError("Please accept the declaration.");

    setSubmitting(true);
    setError("");
    try {
      const { declaration, ...payload } = form;
      const res = await awardsNominationApi.submit(payload);
      if (res.success) {
        setSubmitted(true);
        setForm(INITIAL);
      } else {
        setError(res.message || "Submission failed. Please try again.");
      }
    } catch {
      setError("Network error. Please check your connection and try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="bg-white rounded-xl border border-green-200 shadow-sm p-10 flex flex-col items-center text-center gap-4">
        <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center">
          <svg className="w-8 h-8 text-[#008d48]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-[#0a2e5c] font-black text-[20px]">Nomination Submitted!</h2>
        <p className="text-slate-500 text-[13px] max-w-md leading-relaxed">
          Thank you for submitting your nomination for the <strong>Namo Gange Global Health Excellence Awards 2026</strong>.
          Our jury team will review your application and contact you shortly.
        </p>
        <p className="text-slate-400 text-[11px]">A confirmation has been sent to your WhatsApp number.</p>
        <button
          onClick={() => setSubmitted(false)}
          className="mt-2 px-8 py-2.5 bg-[#008d48] text-white rounded-lg font-black text-[12px] uppercase tracking-widest hover:bg-[#007a3e] transition-all"
        >
          Submit Another Nomination
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <ApplicantDetailsSection form={form} update={update} />
      <AwardCategorySection form={form} update={update} categories={categories} />
      <ProfileDetailsSection form={form} update={update} />
      <AchievementsImpactSection form={form} update={update} />
      <SupportingDocumentsSection form={form} update={update} />
      <DeclarationSection
        form={form}
        update={update}
        onSubmit={handleSubmit}
        submitting={submitting}
        error={error}
      />
    </div>
  );
};

export default NominationForm;
