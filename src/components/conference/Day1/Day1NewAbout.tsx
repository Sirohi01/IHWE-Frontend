import React from "react";
import {
  ShieldCheck,
  Globe,
  HeartPulse,
  Microscope,
  Building2,
  Handshake,
} from "lucide-react";

const focusAreasIcons = [
  ShieldCheck,
  Globe,
  HeartPulse,
  Microscope,
  Building2,
  Handshake,
];

const AboutDayOne: React.FC<{ data?: any, currentDay: number }> = ({ data, currentDay }) => {
  return (
    <div className="mx-auto max-w-[1320px] px-6 md:px-0">
      <div>
        <div className="rounded-2xl border border-gray-200 bg-white p-4 md:p-4">
          <div className="grid gap-8 lg:grid-cols-2">
            {/* Left */}
            <div>
              <h3 className="mb-2 text-[20px] font-bold uppercase tracking-wide text-gray-900">
                {data.title || `About Day ${currentDay}`}
              </h3>

              <p className="mb-2 text-[13px]">
                {data.description || `The Healthcare Innovation Summit brings together visionaries,
                technologists, clinicians, and industry leaders to explore the
                latest advancements shaping the future of healthcare.`}
              </p>

              <p className="text-[13px]">
                {data.descriptionSecondary || `From smart hospitals to AI-powered diagnostics, this summit
                focuses on building resilient, efficient, and patient-centric
                healthcare systems.`}
              </p>
            </div>

            {/* Right */}
            <div>
              <h3 className="mb-5 text-[20px] font-bold uppercase tracking-wide text-gray-900">
                Key Focus Areas
              </h3>

              <div className="grid grid-cols-2 gap-x-4 gap-y-4 md:grid-cols-3">
                {data.focusAreas.map((item, index) => {
                  const Icon =focusAreasIcons[index];
const splitedItem= item.split("&")
                  return (
                    <div key={index} className="flex items-start gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-green-100 bg-green-50">
                        <Icon className="h-4 w-4 text-green-600" />
                      </div>

                      <div>
                        <p className="text-[12px] font-semibold leading-4 text-slate-900">
                          {splitedItem[0]} &
                        </p>
                        <p className="text-[12px] font-semibold leading-4 text-slate-900">
                          {splitedItem[1]}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AboutDayOne