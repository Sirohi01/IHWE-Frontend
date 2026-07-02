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
  "Abstract must be original and not published or presented elsewhere.",
  "Word limit: 250 - 300 words.",
  "Use structured format: Background, Objectives, Methods, Results, Conclusion.",
  "Use Times New Roman font, 12pt size, single line spacing.",
  "Do not include author names or affiliations in the abstract.",
  "Use standard abbreviations and avoid uncommon abbreviations.",
  "Submit your abstract in MS Word format (.doc/.docx).",
  "All submissions are subject to a review process.",
];

const topics = [
  {
    icon: Lightbulb,
    title: "Healthcare Technology & Innovation",
  },
  {
    icon: Stethoscope,
    title: "Nursing & Patient Care",
  },
  {
    icon: MonitorSmartphone,
    title: "AI & Digital Health",
  },
  {
    icon: Apple,
    title: "Nutrition & Dietetics",
  },
  {
    icon: HeartPulse,
    title: "Public Health & Epidemiology",
  },
  {
    icon: Leaf,
    title: "Environmental Health",
  },
  {
    icon: BriefcaseMedical,
    title: "Medical Devices & Diagnostics",
  },
  {
    icon: Scale,
    title: "Policy, Ethics & Education",
  },
  {
    icon: Pill,
    title: "Pharmaceutical Sciences",
  },
  {
    icon: Hospital,
    title: "Health Economics & Outcomes",
  },
  {
    icon: Brain,
    title: "Mental Health & Wellbeing",
  },
  {
    icon: FlaskConical,
    title: "Other Allied Health Sciences",
  },
  {
    icon: Hospital,
    title: "Healthcare Management",
  },
];

export default function AbstractSubmissionGuidelinesSection() {
  return (
    <section className="bg-white py-2">
      <div className=" px-5 sm:px-6 lg:px-12">
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Submission Guidelines */}
          <div className="rounded-xl border border-gray-200 bg-white px-5 py-2 shadow-sm">
            <div className="mb-2">
              <h2 className="text-lg font-medium uppercase text-[#1B1B1B]">
                ABSTRACT GUIDELINES
              </h2>

              <div className="mt-1 h-0.5 w-12 rounded-full bg-[#2F8B2E]" />
            </div>

            <div className="space-y-3 mt-3">
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

            <button className="mt-4 flex items-center gap-2 rounded-full border border-[#2F8B2E] px-6 py-1.5 text-[13px] font-medium uppercase text-[#2F8B2E] transition hover:bg-[#2F8B2E] hover:text-white">
              Download Detailed Guidelines
              <Download size={16} />
            </button>
          </div>

          {/* Topics */}
          <div className="rounded-xl border border-gray-200 bg-white px-5 py-2 shadow-sm">
            <div className="mb-2">
              <h2 className="text-lg font-medium uppercase text-[#1B1B1B]">
                ABSTRACT TOPICS
              </h2>

              <div className="mt-1 h-0.5 w-12 rounded-full bg-[#2F8B2E]" />
            </div>

            <div className="grid gap-x-6 gap-y-3 mt-3 sm:grid-cols-2">
              {topics.map((topic, index) => {
                const Icon = topic.icon;

                return (
                  <div key={index} className="flex items-start gap-3">
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#EDF8EE] mt-0.5">
                      <Icon size={14} className="text-[#2F8B2E]" />
                    </div>

                    <p className="text-[14px] leading-7 text-gray-600">
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