"use client";

import { SERVER_URL } from "@/lib/api";
import {
  Clock3,
  ChevronRight,
  Users,
  Ticket,
  Handshake,
  ChevronLeft,
  ChevronRightIcon,
} from "lucide-react";

export default function DayAgendaSection({ data, dayTitle, dayNumber }: { data?: any; dayTitle?: string; dayNumber?: number }) {
  const agenda = data.agenda;
  return (
    <div className="mx-auto max-w-[1320px] py-4">
      <section className="grid gap-5 lg:grid-cols-2">
        {/* Left */}
        <div className="rounded-2xl border bg-white p-4 shadow-sm max-h-[500px] flex flex-col">
          <div className="text-center mb-4 shrink-0">
            <h2 className="text-lg font-bold text-green-700">
              {agenda.title||`DAY ${dayNumber} AGENDA — 21 AUGUST 2026`}
            </h2>
            <p className="text-[11px]">
              {agenda.subtitle||`6 Insightful Sessions | 1 Powerful Day`}
            </p>
          </div>

          <div className="overflow-y-auto rounded-xl border flex-1">
            <div className="grid grid-cols-[1.4fr_1fr_2fr_1.5fr] bg-[#0B2A63] px-3 py-2 text-[10px] font-semibold text-white sticky top-0 z-10">
              <div>TIME</div>
              <div>SESSION</div>
              <div>TOPIC</div>
              <div>SPEAKER</div>
            </div>

            {agenda.sessions.map((item, i) => (
              <div
                key={i}
                className="grid grid-cols-[1.4fr_1fr_2fr_1.5fr] items-center border-t px-3 py-3 text-[11px]"
              >
                <div className="flex items-center gap-2 font-medium">
                  <Clock3 size={13} className="" />
                  {item.time}
                </div>

                <div>
                  <p className="font-bold text-[10px]">{item.session}</p>
                  <p className="text-[9px] text-green-700 font-semibold">
                    {item.type}
                  </p>
                </div>

                <div>
                  <p className="font-semibold">{item.topic}</p>
                  <p className="text-[10px] ">{item.description}</p>
                </div>

                <div className="flex items-center gap-2">
                  <img
                    src={`${SERVER_URL}${item.speaker.image}`}
                    className="h-8 w-8 rounded-full object-cover"
                    alt={item.speaker.name}
                  />
                  <div>

                  <p className="text-[11px] font-medium">
                    {item.speaker.name}
                  </p>
<p className="text-[11px]">{item.speaker.role}</p>
<p className="text-[11px]">{item.speaker.company}</p>
</div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-5 flex justify-center shrink-0">
            <button className="flex items-center gap-2 rounded-full border border-slate-300 px-6 py-2 text-xs font-semibold text-slate-800 hover:bg-slate-50">
              VIEW FULL AGENDA
              <ChevronRight size={14} />
            </button>
          </div>
        </div>

        {/* Right */}
        <div>
          <div className="rounded-2xl border bg-white p-4 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-bold">
                FEATURED SPEAKERS{" "}
                <span className="text-green-700">— DAY {dayNumber}</span>
              </h2>

              <button className="rounded-full bg-green-700 px-4 py-1.5 text-[10px] font-semibold text-white">
                VIEW ALL SPEAKERS
              </button>
            </div>

            <div className="relative">
              <button className="absolute -left-2 top-1/2 z-10 -translate-y-1/2 rounded-full border bg-white p-1">
                <ChevronLeft size={14} />
              </button>

              <button className="absolute -right-2 top-1/2 z-10 -translate-y-1/2 rounded-full border bg-white p-1">
                <ChevronRightIcon size={14} />
              </button>

              <div className="grid grid-cols-2 gap-3 xl:grid-cols-4">
                {data.featuredSpeakers.map((speaker, i) => (
                  <div
                    key={i}
                    className="rounded-2xl border p-4 text-center flex flex-col justify-between"
                  >
                    <img
                    src={`${SERVER_URL}${speaker.image}`}
                      className="mx-auto h-16 w-16 rounded-full object-cover"
                    />

                    <h3 className="mt-3 text-xs font-bold">
                      {speaker.name}
                    </h3>

                    <p className="mt-1 text-[10px]">
                      {speaker.role}
                    </p>

                    <p className="text-[10px]">
                      {speaker.company}
                    </p>

                    <span className="mt-4 inline-block rounded-full border border-green-700 px-1 py-1 text-[8px] font-semibold text-green-700">
                      {speaker.category}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-4 flex justify-center gap-1">
                <span className="h-2 w-2 rounded-full bg-green-700" />
                <span className="h-2 w-2 rounded-full bg-gray-300" />
                <span className="h-2 w-2 rounded-full bg-gray-300" />
              </div>
            </div>
          </div>


          {/* Bottom Cards */}
          <div className="mt-4 grid gap-3 md:grid-cols-3">
            {[
              {
                title:  data.cta.bePartTitle||`BE PART OF DAY ${dayNumber}`,
                text: data.cta.
bePartDescription||"Start your journey towards a holistic future.",
                btn: "REGISTER NOW",
                icon: Users,
                bg: "bg-green-700",
              },
              {
                title:  data.cta.delegatePass.title||`DELEGATE PASS - DAY ${dayNumber}`,
                text: data.cta.delegatePass.descriptio||`Full access to all Day ${dayNumber} sessions.`,
                btn: "BOOK NOW",
                icon: Ticket,
                bg: "bg-[#0B2A63]",
              },
              {
                title: data.cta.sponsor.title||`SPONSOR DAY ${dayNumber}`,
                text:data.cta.sponsor.description|| "Showcase your solutions globally.",
                btn: "BECOME A SPONSOR",
                icon: Handshake,
                bg: "bg-green-800",
              },
            ].map((card, i) => {
              const Icon = card.icon;

              return (
                <div
                  key={i}
                  className={`${card.bg} rounded-2xl p-3 text-white shadow-sm`}
                >
                  <div className="flex items-center gap-3">
                    {/* Round Icon */}
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/15">
                      <Icon size={18} />
                    </div>

                    {/* Content */}
                    <div className="min-w-0 flex-1">
                      <h3 className="text-xs font-bold leading-tight">
                        {card.title}
                      </h3>

                      <p className="mt-0.5 text-[10px] leading-4 text-white/75">
                        {card.text}
                      </p>

                      <button className="mt-2 rounded-full bg-white px-3 py-1.5 text-[9px] font-semibold text-black transition hover:bg-white/90">
                        {card.btn}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}