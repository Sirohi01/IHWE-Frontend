"use client";

import {
  Calendar,
  ShieldCheck,
  Upload,
  FileText,
  Bell,
  BadgeCheck,
  Users,
} from "lucide-react";

const timeline = [
  {
    title: "Abstract Submission",
    date: "01 May - 30 June 2026",
    icon: Calendar,
  },
  {
    title: "Abstract Acceptance",
    date: "05 July 2026",
    icon: ShieldCheck,
  },
  {
    title: "Full Paper Submission",
    date: "10 July - 31 July 2026",
    icon: Upload,
  },
  {
    title: "Review Process",
    date: "01 Aug - 15 Aug 2026",
    icon: FileText,
  },
  {
    title: "Notification of Acceptance",
    date: "20 Aug 2026",
    icon: Bell,
  },
  {
    title: "Registration Deadline",
    date: "25 Aug 2026",
    icon: BadgeCheck,
  },
  {
    title: "Presentation Date",
    date: "21 August 2026",
    icon: Users,
  },
];

export default function TimelineSection() {
  return (
    <section className="w-full">
      <div className="mx-auto max-w-[1320px] rounded-2xl border border-gray-200 bg-white p-6 md:p-8">
        <h2 className="mb-10 text-sm font-semibold uppercase tracking-wide text-gray-900">
          Timeline
          <span className="mt-2 block h-[3px] w-10 rounded-full bg-green-600" />
        </h2>

        <div className="overflow-x-auto">
          <div className="flex min-w-[1100px] items-start justify-between gap-4">
            {timeline.map((item, index) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="relative flex flex-1 flex-col items-center text-center"
                >
                  {/* Dotted line */}
                  {index !== timeline.length - 1 && (
                    <div className="absolute left-[58%] top-7 h-[2px] w-full border-t-2 border-dotted border-gray-300" />
                  )}

                  {/* Icon */}
                  <div className="relative z-10 flex h-14 w-14 items-center justify-center rounded-full bg-green-50">
                    <Icon className="h-7 w-7 text-green-700" strokeWidth={1.8} />
                  </div>

                  {/* Content */}
                  <h3 className="mt-5 text-[13px] font-semibold leading-5 text-[#0f172a]">
                    {item.title}
                  </h3>

                  <p className="mt-2 text-[13px] font-medium text-gray-600">
                    {item.date}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}