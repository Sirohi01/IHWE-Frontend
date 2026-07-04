"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "@/lib/api";
import * as Icons from "lucide-react";
import {
  Calendar,
  ShieldCheck,
  Upload,
  FileText,
  Bell,
  BadgeCheck,
  Users,
} from "lucide-react";

export default function TimelineSection() {
  const [timeline, setTimeline] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${API_URL}/paper-presentation`);
        if (res.data.success && res.data.data && res.data.data.timeline) {
          setTimeline(res.data.data.timeline);
          console.log("Timeline fetched:", res.data.data.timeline);
        } else {
          console.error("Failed to fetch timeline:", res.data);
        }
      } catch (error) {
        console.error("Error fetching timeline data", error);
      }
    };
    fetchData();
  }, []);

  return (
    <section className="w-full mt-2">
      <div className="  sm:px-6 lg:px-12">
        <div className="rounded-xl border border-gray-200 bg-white px-5 py-2 shadow-sm">
          <h2 className="mb-2 text-[13px] font-samibold uppercase tracking-wide text-gray-900">
            Timeline
            <span className="mt-1.5 block h-[3px] w-8 rounded-full bg-[#2F8B2E]" />
          </h2>

          <div className="overflow-x-auto">
            <div className="flex min-w-[1100px] items-start justify-between gap-4">
              {timeline.map((item, index) => {
                const Icon = (item?.icon && Icons[item.icon as keyof typeof Icons] 
                                ? Icons[item.icon as keyof typeof Icons] 
                                : Icons.Circle) as React.ElementType;

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