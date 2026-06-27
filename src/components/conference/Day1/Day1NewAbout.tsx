import React from "react";
import {
  ShieldCheck,
  Globe,
  HeartPulse,
  Microscope,
  Building2,
  Handshake,
} from "lucide-react";

const focusAreas = [
  {
    icon: ShieldCheck,
    title: "Smart Hospitals &",
    subtitle: "Digital Transformation",
  },
  {
    icon: Globe,
    title: "AI, HealthTech &",
    subtitle: "Digital Health",
  },
  {
    icon: HeartPulse,
    title: "Diagnostics, Labs &",
    subtitle: "Precision Medicine",
  },
  {
    icon: Microscope,
    title: "Medical Devices",
    subtitle: "& Innovation",
  },
  {
    icon: Building2,
    title: "Healthcare Infrastructure",
    subtitle: "& Investment",
  },
  {
    icon: Handshake,
    title: "Leadership, Policy &",
    subtitle: "Global Collaboration",
  },
];

const AboutDayOne: React.FC<{ data?: any }> = ({ data }) => {
  return (
    <div className="mx-auto max-w-[1320px] py-4">
      <div>
        <div className="rounded-2xl border border-gray-200 bg-white p-5 md:p-6">
          <div className="grid gap-8 lg:grid-cols-2">
            {/* Left */}
            <div>
              <h3 className="mb-4 text-[20px] font-bold uppercase tracking-wide text-gray-900">
                About Day 1
              </h3>

              <p className="mb-4 text-[13px] leading-6">
                The Healthcare Innovation Summit brings together visionaries,
                technologists, clinicians, and industry leaders to explore the
                latest advancements shaping the future of healthcare.
              </p>

              <p className="text-[13px] leading-6">
                From smart hospitals to AI-powered diagnostics, this summit
                focuses on building resilient, efficient, and patient-centric
                healthcare systems.
              </p>
            </div>

            {/* Right */}
            <div>
              <h3 className="mb-5 text-[20px] font-bold uppercase tracking-wide text-gray-900">
                Key Focus Areas
              </h3>

              <div className="grid grid-cols-2 gap-x-8 gap-y-5 md:grid-cols-3">
                {focusAreas.map((item, index) => {
                  const Icon = item.icon;

                  return (
                    <div key={index} className="flex items-start gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-green-100 bg-green-50">
                        <Icon className="h-4 w-4 text-green-600" />
                      </div>

                      <div>
                        <p className="text-[12px] font-semibold leading-4 text-slate-900">
                          {item.title}
                        </p>
                        <p className="text-[12px] font-semibold leading-4 text-slate-900">
                          {item.subtitle}
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