import { Stethoscope, Landmark, Leaf, Globe, Building2, GraduationCap } from "lucide-react";

const trustedItems = [
  {
    icon: <Stethoscope size={28} className="text-emerald-700" />,
    iconBg: "bg-emerald-50 border-emerald-100",
    label: "HEALTHCARE",
    label2: "LEADERS",
  },
  {
    icon: <Landmark size={28} className="text-blue-700" />,
    iconBg: "bg-blue-50 border-blue-100",
    label: "GOVERNMENT",
    label2: "BODIES",
  },
  {
    icon: <Leaf size={28} className="text-green-600" />,
    iconBg: "bg-green-50 border-green-100",
    label: "AYUSH",
    label2: "INDUSTRY",
  },
  {
    icon: <Globe size={28} className="text-indigo-600" />,
    iconBg: "bg-indigo-50 border-indigo-100",
    label: "INTERNATIONAL",
    label2: "BUYERS",
  },
  {
    icon: <Building2 size={28} className="text-red-600" />,
    iconBg: "bg-red-50 border-red-100",
    label: "HOSPITAL & CLINIC",
    label2: "PROCUREMENT TEAMS",
  },
  {
    icon: <GraduationCap size={28} className="text-amber-600" />,
    iconBg: "bg-amber-50 border-amber-100",
    label: "UNIVERSITY/",
    label2: "ACADEMIC PARTNERS",
  },
];

const TrustedBy = () => {
  return (
    <div className="relative z-40 w-full bg-[#23471d] py-2 border-y border-white/5 shadow-xl">
      <div className="container mx-auto px-6">
        
        {/* Row 1: Centered Heading */}
        <div className="flex items-center justify-center gap-4 mb-2 w-full max-w-xl mx-auto">
          <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-white/20" />
          <div className="flex items-center px-3">
             <p className="text-[10px] md:text-[11px] font-bold uppercase tracking-[0.25em] text-white/90 whitespace-nowrap">Supported By</p>
          </div>
          <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-white/20" />
        </div>

        {/* Row 2: All Items in One Line */}
        <div className="flex items-center justify-center w-full">
          <div className="grid grid-cols-2 sm:grid-cols-3 xl:flex xl:flex-nowrap items-center justify-center gap-x-8 gap-y-2 w-full">
            {trustedItems.map((item, i) => (
              <div key={i} className="flex items-center justify-center xl:justify-start">
                <div className="flex items-center gap-2.5 group transition-all duration-300">
                  <div className={`w-8 h-8 rounded-full border border-white/10 flex items-center justify-center flex-shrink-0 shadow-md bg-white transition-all duration-500`}>
                    <div className="scale-[0.5] group-hover:scale-[0.6] transition-transform duration-500">{item.icon}</div>
                  </div>
                  <div className="flex flex-col">
                    <p className="text-[9px] lg:text-[10px] font-bold uppercase tracking-tight text-white leading-tight whitespace-nowrap">
                      {item.label}
                    </p>
                    <p className="text-[9px] lg:text-[10px] font-bold uppercase tracking-tight text-white/70 leading-tight whitespace-nowrap">
                      {item.label2}
                    </p>
                  </div>
                </div>
                {i < trustedItems.length - 1 && (
                  <div className="hidden xl:block w-px h-5 bg-white/10 flex-shrink-0 mx-4" />
                )}
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default TrustedBy;