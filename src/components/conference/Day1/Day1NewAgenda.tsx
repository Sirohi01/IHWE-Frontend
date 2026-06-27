"use client";

import {
  Clock3,
  ChevronRight,
  Users,
  Ticket,
  Handshake,
  ChevronLeft,
  ChevronRightIcon,
} from "lucide-react";

const agenda = [
  {
    time: "11:00 AM - 11:45 AM",
    session: "SESSION 1",
    type: "PANEL",
    topic: "Smart Hospitals & Digital Transformation",
    desc: "Building intelligent, connected hospitals.",
    speaker: "Dr. Maria Neira",
    image: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=100",
  },
  {
    time: "12:00 PM - 12:45 PM",
    session: "SESSION 2",
    type: "EXPERT TALK",
    topic: "Medical Devices & Innovation Showcase",
    desc: "Next-gen medical devices improving outcomes.",
    speaker: "Dr. Kevin Tan",
    image: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=100",
  },
  {
    time: "02:00 PM - 02:45 PM",
    session: "SESSION 3",
    type: "PANEL",
    topic: "AI, HealthTech & Digital Health Solutions",
    desc: "AI and digital platforms redefining healthcare.",
    speaker: "Dr. Devi Shetty",
    image: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=100",
  },
];

const speakers = [
  {
    name: "Dr. Randal Pinkett",
    role: "Former Chief Health Officer",
    company: "Amazon",
    image: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=100",
    badge: "KEYNOTE SPEAKER",
  },
  {
    name: "Dr. Maria Neira",
    role: "Director",
    company: "WHO",
    image: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=100",
    badge: "FEATURED SPEAKER",
  },
  {
    name: "Dr. Kevin Tan",
    role: "Founder & CEO",
    company: "HealthTech Asia",
    image: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=100",
    badge: "FEATURED SPEAKER",
  },
  {
    name: "Dr. Devi Shetty",
    role: "Chairman & Founder",
    company: "Narayana Health",
    image: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=100",
    badge: "FEATURED SPEAKER",
  },
];

export default function DayAgendaSection() {
  return (
    <div className="mx-auto max-w-[1320px] py-4 px-0">
    <section className="grid gap-5 lg:grid-cols-2">
      {/* Left */}
      <div className="rounded-2xl border bg-white p-4 shadow-sm">
        <div className="text-center mb-4">
          <h2 className="text-lg font-bold text-green-700">
            DAY 1 AGENDA — 21 AUGUST 2026
          </h2>
          <p className="text-[11px]">
            6 Insightful Sessions | 1 Powerful Day
          </p>
        </div>

        <div className="overflow-hidden rounded-xl border">
          <div className="grid grid-cols-[1.4fr_1fr_2fr_1.5fr] bg-[#0B2A63] px-3 py-2 text-[10px] font-semibold text-white">
            <div>TIME</div>
            <div>SESSION</div>
            <div>TOPIC</div>
            <div>SPEAKER</div>
          </div>

          {agenda.map((item, i) => (
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
                <p className="text-[10px] ">{item.desc}</p>
              </div>

              <div className="flex items-center gap-2">
                <img
                  src={item.image}
                  className="h-8 w-8 rounded-full object-cover"
                />
                <span className="text-[11px] font-medium">
                  {item.speaker}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-5 flex justify-center">
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
              <span className="text-green-700">— DAY 1</span>
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
              {speakers.map((speaker, i) => (
                <div
                  key={i}
                  className="rounded-2xl border p-4 text-center flex flex-col justify-between"
                >
                  <img
                    src={speaker.image}
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
                    {speaker.badge}
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
      title: "BE PART OF DAY 1",
      text: "Start your journey towards a holistic future.",
      btn: "REGISTER NOW",
      icon: Users,
      bg: "bg-green-700",
    },
    {
      title: "DELEGATE PASS",
      text: "Full access to all Day 1 sessions.",
      btn: "BOOK NOW",
      icon: Ticket,
      bg: "bg-[#0B2A63]",
    },
    {
      title: "SPONSOR DAY 1",
      text: "Showcase your solutions globally.",
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