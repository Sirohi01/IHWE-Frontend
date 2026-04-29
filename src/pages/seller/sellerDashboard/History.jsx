import { 
  Activity, CheckCircle2, AlertCircle, 
  MapPin, User, Settings, Filter,
  Calendar, Clock, ExternalLink
} from 'lucide-react';

export default function History() {
  const activities = [
    {
      id: 1,
      title: "Registration Approved",
      description: "Admin verified and approved your VIP Seller Pass registration.",
      time: "2 hours ago",
      date: "Oct 16, 2026",
      icon: CheckCircle2,
      color: "text-emerald-600",
      bg: "bg-emerald-50"
    },
    {
      id: 2,
      title: "Profile Updated",
      description: "You updated your sourcing product interests and budget range.",
      time: "5 hours ago",
      date: "Oct 16, 2026",
      icon: User,
      color: "text-blue-600",
      bg: "bg-blue-50"
    },
    {
      id: 3,
      title: "Meeting Request Sent",
      description: "Request sent to 'Exotic Silks & Weaves' for a B2B session.",
      time: "Yesterday",
      date: "Oct 15, 2026",
      icon: Activity,
      color: "text-amber-600",
      bg: "bg-amber-50"
    },
    {
      id: 4,
      title: "Login from New Device",
      description: "Secure login detected from Chrome on macOS - New Delhi.",
      time: "2 days ago",
      date: "Oct 14, 2026",
      icon: ShieldCheck,
      color: "text-slate-600",
      bg: "bg-slate-100"
    },
    {
      id: 5,
      title: "Payment Received",
      description: "Successful payment of ₹25,000 for VIP Membership.",
      time: "3 days ago",
      date: "Oct 13, 2026",
      icon: CreditCard,
      color: "text-emerald-600",
      bg: "bg-emerald-50"
    }
  ];

  return (
    <div className="space-y-8 animate-slide-up">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-black text-slate-800 tracking-tight">Activity History</h2>
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Track all your interactions and account updates</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-5 py-2.5 bg-white border border-slate-200 rounded-xl font-black text-[10px] uppercase tracking-widest text-slate-600 hover:bg-slate-50 transition-all">
            <Filter className="w-4 h-4" />
            Filter
          </button>
          <button className="flex items-center gap-2 px-5 py-2.5 bg-white border border-slate-200 rounded-xl font-black text-[10px] uppercase tracking-widest text-slate-600 hover:bg-slate-50 transition-all">
            <Calendar className="w-4 h-4" />
            Oct 2026
          </button>
        </div>
      </div>

      <div className="max-w-4xl">
        <div className="premium-card p-8">
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-[19px] top-6 bottom-6 w-[2px] bg-slate-100"></div>

            <div className="space-y-12">
              {activities.map((activity) => {
                const Icon = activity.icon;
                return (
                  <div key={activity.id} className="relative pl-12">
                    {/* Circle Icon */}
                    <div className={`absolute left-0 top-0 w-10 h-10 rounded-full ${activity.bg} ${activity.color} flex items-center justify-center ring-8 ring-white z-10 shadow-sm`}>
                      <Icon className="w-5 h-5" />
                    </div>

                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-2">
                      <div>
                        <h3 className="text-lg font-black text-slate-800 tracking-tight">{activity.title}</h3>
                        <p className="text-sm font-medium text-slate-500 mt-1 max-w-xl leading-relaxed">
                          {activity.description}
                        </p>
                      </div>
                      <div className="flex flex-col md:items-end">
                        <span className="text-xs font-black text-slate-800 uppercase tracking-widest">{activity.time}</span>
                        <span className="text-[10px] font-bold text-slate-400 mt-1 uppercase tracking-widest">{activity.date}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-slate-100 text-center">
            <button className="text-sm font-black text-primary-green uppercase tracking-widest hover:underline flex items-center gap-2 mx-auto">
              Load older activity <Clock className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Minimal missing icons
function CreditCard(props) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-credit-card"><rect width="20" height="14" x="2" y="5" rx="2"/><line x1="2" x2="22" y1="10" y2="10"/></svg>
  )
}

function ShieldCheck(props) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-shield-check"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/><path d="m9 12 2 2 4-4"/></svg>
  )
}
