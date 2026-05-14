import React from 'react';
import { 
  FileText, Image as ImageIcon, Briefcase, Video, 
  ArrowRight, Download, Eye, Play,
  Heart, Shield, Cpu, Activity, User, BookOpen
} from 'lucide-react';
import { SERVER_URL } from '@/lib/api';

interface BlogResourcesProps {
  topics: any[];
  resources: any[];
}

const BlogResources: React.FC<BlogResourcesProps> = ({ topics, resources }) => {
  const demoTopics = [
    { label: 'Preventive Healthcare', count: '28', color: 'bg-cyan-50 text-cyan-500', icon: Shield },
    { label: 'Mental Health', count: '24', color: 'bg-green-50 text-green-500', icon: Heart },
    { label: 'Women\'s Health', count: '20', color: 'bg-pink-50 text-pink-500', icon: User },
    { label: 'Nutrition & Diet', count: '18', color: 'bg-orange-50 text-orange-500', icon: Activity },
    { label: 'Fitness & Lifestyle', count: '32', color: 'bg-purple-50 text-purple-500', icon: BookOpen },
    { label: 'Medical Technology', count: '26', color: 'bg-blue-50 text-blue-500', icon: Cpu },
  ];

  // Helper to get icon component
  const getIcon = (iconName: string, color: string) => {
    const size = 16;
    const className = color;
    switch(iconName) {
      case 'FileText': return <FileText size={size} className={className} />;
      case 'Download': return <Download size={size} className={className} />;
      case 'Eye': return <Eye size={size} className={className} />;
      case 'Video': return <Video size={size} className={className} />;
      case 'ImageIcon': return <ImageIcon size={size} className={className} />;
      case 'Briefcase': return <Briefcase size={size} className={className} />;
      default: return <FileText size={size} className={className} />;
    }
  };

  const getActionLabel = (type: string) => {
    switch(type) {
      case 'download': return 'Download';
      case 'watch': return 'Watch';
      default: return 'View';
    }
  };

  const getColor = (icon: string) => {
    if (icon === 'Video') return 'text-red-600';
    if (icon === 'Briefcase') return 'text-green-600';
    return 'text-blue-600';
  };

  return (
    <section className="pt-4 pb-2 bg-white">
      <div className="container mx-auto px-5 md:px-12">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
          
          {/* Popular Topics Section (Left - 50%) */}
          <div className="w-full lg:w-1/2">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-[#001529] font-black text-lg uppercase tracking-tight">POPULAR TOPICS</h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {demoTopics.map((topic, idx) => (
                <div 
                  key={idx}
                  className="group flex items-center gap-3 p-3 rounded-xl bg-white border border-slate-50 hover:border-[#00df82] hover:shadow-lg hover:shadow-slate-100 transition-all duration-300 cursor-default"
                >
                  <div className={`w-10 h-10 shrink-0 rounded-lg ${topic.color} flex items-center justify-center transition-all group-hover:scale-110`}>
                    <topic.icon size={18} />
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-[#001529] font-black text-[11px] leading-tight mb-0.5 truncate">{topic.label}</h4>
                    <span className="text-slate-400 text-[9px] font-bold">{topic.count} Articles</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Media Resources Section (Right - 50%) */}
          <div className="w-full lg:w-1/2">
            <div className="mb-4">
              <h3 className="text-[#001529] font-black text-lg uppercase tracking-tight">MEDIA RESOURCES</h3>
              <p className="text-slate-500 text-[11px] font-medium mt-2 leading-relaxed">Access our media library for images, logos, videos and press materials.</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
              {resources.map((res, idx) => {
                const isUpload = res.link.startsWith('/uploads/');
                const isExternal = res.link.startsWith('http');
                const finalLink = isExternal ? res.link : (isUpload ? `${SERVER_URL}${res.link}` : res.link);
                
                return (
                  <a 
                    key={idx}
                    href={finalLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-2 p-3 rounded-xl bg-white border border-slate-50 hover:shadow-xl hover:border-slate-200 transition-all cursor-pointer"
                  >
                    <div className="w-9 h-9 shrink-0 rounded-lg bg-slate-50 flex items-center justify-center group-hover:bg-slate-100 transition-all">
                      {getIcon(res.icon, getColor(res.icon))}
                    </div>
                    <div className="min-w-0">
                      <h4 className="text-[#001529] font-black text-[10px] leading-tight mb-0.5 truncate">{res.title}</h4>
                      <span className="text-slate-400 text-[8px] font-bold uppercase tracking-widest">{getActionLabel(res.type)}</span>
                    </div>
                  </a>
                );
              })}
            </div>

            <div className="flex justify-center">
              <a 
                href="http://localhost:8080/gallery"
                target="_blank"
                rel="noopener noreferrer"
                className="py-3 px-8 bg-[#001529] text-white rounded-xl font-black text-[11px] uppercase tracking-[0.15em] hover:bg-[#002a4d] transition-all flex items-center justify-center gap-3 shadow-xl cursor-pointer"
              >
                VISIT MEDIA CENTER <ArrowRight size={14} className="text-[#00df82]" />
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default BlogResources;
