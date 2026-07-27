import React from 'react';
import {
  Activity, Heart, Lightbulb, Scale,
  Calendar, Users, Newspaper, ArrowRight, LucideIcon
} from 'lucide-react';

interface Category {
  id: string;
  label: string;
  icon: LucideIcon;
  count: number;
  color: string;
}

const categories: Category[] = [
  { id: 'healthcare', label: 'Healthcare Innovation', icon: Activity, count: 28, color: 'text-blue-500 bg-blue-50' },
  { id: 'digital', label: 'Digital Health', icon: Activity, count: 24, color: 'text-cyan-500 bg-cyan-50' },
  { id: 'wellness', label: 'Wellness & Prevention', icon: Heart, count: 22, color: 'text-rose-500 bg-rose-50' },
  { id: 'sustainability', label: 'Sustainability', icon: Lightbulb, count: 18, color: 'text-emerald-500 bg-emerald-50' },
  { id: 'policy', label: 'Policy & Economy', icon: Scale, count: 16, color: 'text-amber-500 bg-amber-50' },
  { id: 'startups', label: 'Startups & Entrepreneurs', icon: Users, count: 14, color: 'text-indigo-500 bg-indigo-50' },
  { id: 'research', label: 'Research & Insights', icon: Newspaper, count: 20, color: 'text-slate-500 bg-slate-50' },
];

interface BlogCategoriesProps {
  activeCategory: string;
  onCategoryChange: (id: string) => void;
}

const BlogCategories: React.FC<BlogCategoriesProps> = ({ activeCategory, onCategoryChange }) => {
  return (
    <div className="bg-white rounded-[24px] border border-slate-100 p-5 shadow-sm h-full flex flex-col">
      <h3 className="text-[#001529] font-medium text-sm mb-4 tracking-tight">Explore Categories</h3>

      <div className="flex flex-col gap-0 flex-1">
        {categories.map((cat) => {
          const Icon = cat.icon;
          const isActive = activeCategory === cat.id;

          return (
            <button
              key={cat.id}
              onClick={() => onCategoryChange(cat.id)}
              className={`flex items-center justify-between group transition-all p-1.5 -mx-1.5 rounded-xl hover:bg-slate-50 ${isActive ? 'text-[#00df82]' : 'text-slate-600'
                }`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-lg border flex items-center justify-center transition-all group-hover:scale-110 shadow-sm ${isActive
                    ? 'bg-[#00df82] border-[#00df82] text-white'
                    : `border-slate-100 ${cat.color}`
                  }`}>
                  <Icon size={14} strokeWidth={2.5} />
                </div>
                <span className="text-[11px] font-medium tracking-tight text-[#001529] group-hover:text-[#00df82] transition-colors">
                  {cat.label}
                </span>
              </div>
              <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded-md ${isActive ? 'bg-[#00df82] text-white' : 'bg-slate-50 text-slate-400'
                }`}>
                {cat.count}
              </span>
            </button>
          );
        })}
      </div>

      <button className="mt-4 flex items-center justify-end gap-2 text-slate-400 text-[14px] font-medium hover:text-[#00df82] transition-colors">
        View all categories <ArrowRight size={12} />
      </button>
    </div>
  );
};

export default BlogCategories;
