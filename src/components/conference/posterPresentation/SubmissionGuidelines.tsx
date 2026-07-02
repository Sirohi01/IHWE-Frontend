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
  "Poster size should be 90 cm (width) x 120 cm (height) in portrait orientation.",
  "Poster should be clear, self-explanatory and visually attractive.",
  "Use large fonts and high-resolution images for better visibility.",
  "Include title, authors, affiliation, introduction, methods, results, conclusion and references.",
  "All posters must be in English.",
  "Presenting author must be present at the poster during the assigned time.",
  "Posters should be mounted at the assigned board number.",
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

export default function PosterSubmissionGuidelinesSection() {
  return (
    <section className="bg-white py-2">
      <div className=" px-5 sm:px-6 lg:px-12">
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Submission Guidelines */}
          <div className="rounded-xl border border-gray-200 bg-white px-5 py-2 shadow-sm">
            <div className="mb-2">
              <h2 className="text-lg font-medium uppercase text-[#1B1B1B]">
                POSTER GUIDELINES
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
                THEMES / TRACKS
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