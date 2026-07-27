import React from 'react';
import { FileText, Download, ArrowRight } from 'lucide-react';
import { SERVER_URL } from '@/lib/api';

interface BlogResourcesProps {
  resources: any[];
}

const BlogResources: React.FC<BlogResourcesProps> = ({ resources }) => {
  const displayResources = [
    { title: "FULL MEDIA KIT (ZIP/PDF)", type: "MEDIA", size: "Download", color: "text-rose-500 bg-rose-50" },
    { title: "Exhibitors", type: "INFO", size: "Download", color: "text-blue-500 bg-blue-50" },
    { title: "YouTube Channel", type: "WATCH", size: "Download", color: "text-red-600 bg-red-50" },
    { title: "Image Gallery", type: "VIEW", size: "Download", color: "text-indigo-500 bg-indigo-50" },
  ];

  return (
    <div className="bg-white rounded-[24px] p-5 border border-slate-100 shadow-sm flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-[#001529] font-medium text-sm tracking-tight uppercase">Reports & Resources</h3>
        <Link to="/resources" className="text-slate-400 text-[14px] font-medium hover:text-[#00df82] transition-colors flex items-center gap-1">
          View all <ArrowRight size={12} />
        </Link>
      </div>

      <div className="flex flex-col gap-1">
        {displayResources.map((res, idx) => (
          <div
            key={idx}
            className="group flex items-center justify-between p-2 rounded-xl bg-white border border-transparent hover:border-slate-100 hover:bg-slate-50 transition-all cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all ${res.color}`}>
                <FileText size={18} strokeWidth={2.5} />
              </div>
              <div>
                <h4 className="text-[#001529] font-medium text-[11px] leading-tight mb-0.5 group-hover:text-[#00df82] transition-colors">
                  {res.title}
                </h4>
                <div className="text-[9px] font-medium text-slate-400 uppercase tracking-widest">
                  {res.type} • {res.size}
                </div>
              </div>
            </div>

            <div className="w-8 h-8 rounded-full border border-slate-100 flex items-center justify-center text-slate-300 group-hover:text-[#00df82] group-hover:border-[#00df82] transition-all">
              <Download size={14} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Internal Link component to avoid import issues if not used
const Link = ({ to, children, className }: { to: string, children: React.ReactNode, className?: string }) => (
  <a href={to} className={className}>{children}</a>
);

export default BlogResources;
