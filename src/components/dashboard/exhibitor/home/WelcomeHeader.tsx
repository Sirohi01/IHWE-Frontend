import { CalendarDays, MapPin } from "lucide-react";
import { useExhibitorCtx } from "@/context/ExhibitorContext";

const formatEventDates = (start?: string, end?: string) => {
    if (!start) return "DATES TBA";
    const startDate = new Date(start);
    const endDate = end ? new Date(end) : startDate;
    if (Number.isNaN(startDate.getTime())) return "DATES TBA";

    const sameMonth = startDate.getMonth() === endDate.getMonth() && startDate.getFullYear() === endDate.getFullYear();
    if (sameMonth) {
        return `${startDate.getDate()} - ${endDate.getDate()} ${startDate.toLocaleDateString("en-GB", { month: "long", year: "numeric" })}`.toUpperCase();
    }
    return `${startDate.toLocaleDateString("en-GB", { day: "2-digit", month: "short" })} - ${endDate.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })}`.toUpperCase();
};

const WelcomeHeader = () => {
    const { data } = useExhibitorCtx();
    const companyName = data?.companyName || data?.exhibitorName || data?.fullName || "Exhibitor";
    const eventName = data?.eventId?.name || "IHWE";
    const eventDates = formatEventDates(data?.eventId?.startDate, data?.eventId?.endDate);
    const eventLocation = data?.eventId?.location || "Location TBA";

    return (
        <div className="w-full flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4 mb-3 p-3 bg-white rounded-lg border border-slate-100" style={{ boxShadow: 'rgba(67, 71, 85, 0.27) 0px 0px 0.25em, rgba(90, 125, 188, 0.05) 0px 0.25em 1em', fontFamily: 'Inter, sans-serif' }}>
            {/* Left Welcome Info */}
            <div className="flex flex-col justify-center">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-0.5">Welcome back,</p>
                <div className="flex flex-col gap-0.5 mb-1">
                    <h2 className="text-lg font-bold text-[#124170] leading-tight">
                        {companyName}.
                    </h2>
                    {data?.contact1 && (data?.contact1?.firstName || data?.contact1?.lastName) && (
                        <div className="text-[13px] font-bold text-slate-700 leading-tight">
                            {data.contact1.title ? `${data.contact1.title} ` : ''}{data.contact1.firstName} {data.contact1.lastName}
                            {data?.contact1?.designation && (
                                <span className="text-slate-500 font-medium ml-1">
                                    ({data.contact1.designation})
                                </span>
                            )}
                        </div>
                    )}
                </div>
                <div className="flex items-center gap-2.5 mt-0.5 flex-wrap">
                    <p className="text-xs font-medium text-slate-500 leading-relaxed">
                        Here's what's happening with your participation in {eventName}.
                    </p>
                </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 items-center">
                {/* Middle Event Details Card */}
                <div className="flex-none sm:w-[220px] bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 flex flex-col justify-center text-left">
                    <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 flex items-center justify-center flex-shrink-0 bg-white rounded-md shadow-sm border border-slate-100">
                            <CalendarDays size={14} className="text-[#0A2947]" />
                        </div>
                        <p className="text-xs font-bold text-[#0A2947] leading-snug">
                            {eventDates}
                        </p>
                    </div>
                    <div className="flex items-center gap-2.5 pt-2">
                        <div className="w-7 h-7 flex items-center justify-center flex-shrink-0 bg-white rounded-md shadow-sm border border-slate-100">
                            <MapPin size={14} className="text-[#0A2947]" />
                        </div>
                        <p className="text-[10px] font-bold text-[#0A2947] uppercase leading-snug">
                            {eventLocation}
                        </p>
                    </div>
                </div>

                {/* Right Banner */}
                <div
                    className="flex-none sm:w-[350px] rounded-lg overflow-hidden relative flex items-center px-4 py-3 text-left min-h-[70px] shadow-sm"
                    style={{
                        backgroundImage: "url('/exhibition/topright.webp')",
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat",
                    }}
                >
                    {/* Overlay to ensure text readability */}
                    <div className="absolute inset-0 bg-gradient-to-r from-[#111844]/90 to-transparent"></div>
                    
                    <div className="relative z-[2] max-w-[200px]">
                        <p className="text-[10px] font-bold text-white/80 uppercase tracking-wider mb-0.5">
                            Be a part of the
                        </p>
                        <p className="text-sm font-semibold text-white leading-snug">
                            World's Leading Platform for Healthcare & Wellness Innovation!
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WelcomeHeader;
