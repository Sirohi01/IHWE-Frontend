"use client";

import {
  CheckCircle2,
  Download,
  Lightbulb,
  BriefcaseMedical,
  HeartPulse,
  FlaskConical,
  Brain,
  MonitorSmartphone,
  Hospital,
  Stethoscope,
  Apple,
  Leaf,
  Scale,
  Pill,
} from "lucide-react";

const guidelines = [
  "Papers must be original and not published or presented elsewhere.",
  "Abstract should be between 250–300 words.",
  "Full paper should be between 2500–3500 words.",
  "Submit your paper in MS Word format (.doc/.docx).",
  "Use Times New Roman font, 12pt size, 1.5 line spacing.",
  "Include a cover page with title, authors, affiliations, and contact details.",
  "All submissions are subject to a double-blind peer review process.",
  "Presenting author must register for the conference.",
];

const topics = [
  {
    icon: Lightbulb,
    title: "Healthcare Technology & Innovation",
  },
  {
    icon: Hospital,
    title: "Healthcare Management",
  },
  {
    icon: MonitorSmartphone,
    title: "AI & Digital Health",
  },
  {
    icon: Stethoscope,
    title: "Nursing & Patient Care",
  },
  {
    icon: HeartPulse,
    title: "Public Health & Epidemiology",
  },
  {
    icon: Apple,
    title: "Nutrition & Dietetics",
  },
  {
    icon: BriefcaseMedical,
    title: "Medical Devices & Diagnostics",
  },
  {
    icon: Leaf,
    title: "Environmental Health",
  },
  {
    icon: Pill,
    title: "Pharmaceutical Sciences",
  },
  {
    icon: Scale,
    title: "Policy, Ethics & Education",
  },
  {
    icon: Brain,
    title: "Mental Health & Wellbeing",
  },
  {
    icon: FlaskConical,
    title: "Other Allied Health Sciences",
  },
];

export default function SubmissionGuidelinesSection() {
  return (
    <section className="bg-white py-14 lg:py-20">
      <div className="mx-auto max-w-[1320px] px-5 sm:px-6 lg:px-0">
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Submission Guidelines */}
          <div className="rounded-[28px] border border-gray-200 bg-white p-6 shadow-sm md:p-8">
            <div className="mb-8">
              <h2 className="text-[26px] font-bold uppercase text-[#1B1B1B]">
                Submission Guidelines
              </h2>

              <div className="mt-3 h-1 w-12 rounded-full bg-[#2F8B2E]" />
            </div>

            <div className="space-y-5">
              {guidelines.map((item, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle2
                    size={18}
                    className="mt-0.5 shrink-0 text-[#2F8B2E]"
                  />

                  <p className="text-[14px] leading-7 text-gray-600">
                    {item}
                  </p>
                </div>
              ))}
            </div>

            <button className="mt-10 flex h-12 items-center gap-2 rounded-full border border-[#2F8B2E] px-7 text-sm font-semibold uppercase text-[#2F8B2E] transition hover:bg-[#2F8B2E] hover:text-white">
              Download Detailed Guidelines
              <Download size={16} />
            </button>
          </div>

          {/* Topics */}
          <div className="rounded-[28px] border border-gray-200 bg-white p-6 shadow-sm md:p-8">
            <div className="mb-8">
              <h2 className="text-[26px] font-bold uppercase text-[#1B1B1B]">
                Paper Presentation Topics
              </h2>

              <div className="mt-3 h-1 w-12 rounded-full bg-[#2F8B2E]" />
            </div>

            <div className="grid gap-x-10 gap-y-6 sm:grid-cols-2">
              {topics.map((topic, index) => {
                const Icon = topic.icon;

                return (
                  <div key={index} className="flex items-start gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#EDF8EE]">
                      <Icon size={18} className="text-[#2F8B2E]" />
                    </div>

                    <p className="text-[14px] font-medium leading-6 text-gray-700">
                      {topic.title}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}