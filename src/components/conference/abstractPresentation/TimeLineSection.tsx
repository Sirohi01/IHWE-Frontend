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

const iconMap: { [key: string]: any } = {
  Calendar,
  ShieldCheck,
  Upload,
  FileText,
  Bell,
  BadgeCheck,
  Users,
};

export default function TimelineSection({ data }: { data: any }) {
  const timeline = data?.timeline || [];
  return (
    <section className="w-full mt-2">
      <div className="  sm:px-6 lg:px-14">
        <div className="rounded-xl border border-gray-200 bg-white px-5 py-2 shadow-sm">
          <h2 className="mb-4 text-[13px] font-bold uppercase tracking-wide text-gray-900">
            SUBMISSION TIMELINE
            <span className="mt-1.5 block h-[3px] w-8 rounded-full bg-[#2F8B2E]" />
          </h2>

          <div className="overflow-x-auto">
            <div className="flex min-w-[1100px] items-start justify-between gap-4">
              {timeline.map((item: any, index: number) => {
                const Icon = iconMap[item.icon] || Calendar;

                return (
                  <div
                    key={item.title}
                    className="relative flex flex-1 flex-col items-center text-center"
                  >
                    {/* Dotted line */}
                    {index !== timeline.length - 1 && (
                      <div className="absolute left-[58%] top-5 h-[2px] w-full border-t-2 border-dotted border-gray-300" />
                    )}

                    {/* Icon */}
                    <div className="relative z-10 flex h-10 w-10 items-center justify-center rounded-full bg-[#EDF8EE]">
                      <Icon className="h-5 w-5 text-[#2F8B2E]" strokeWidth={2} />
                    </div>

                    {/* Content */}
                    <h3 className="mt-2 text-[12px] font-bold leading-[1.2] text-[#0A1C63]">
                      {item.title}
                    </h3>

                    <p className="mt-0.5 text-[11px] font-medium text-gray-500">
                      {item.date}
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