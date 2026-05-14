import React from 'react';
import {
  LayoutGrid, Activity, Heart, Lightbulb, Scale,
  Calendar, Users, Newspaper
} from 'lucide-react';
import { motion } from 'framer-motion';

const categories = [
  { id: 'all', label: 'All', icon: LayoutGrid },
  { id: 'healthcare', label: 'Healthcare', icon: Activity },
  { id: 'wellness', label: 'Wellness', icon: Heart },
  { id: 'innovation', label: 'Innovation', icon: Lightbulb },
  { id: 'policy', label: 'Policy & Industry', icon: Scale },
  { id: 'events', label: 'Events & Highlights', icon: Calendar },
  { id: 'exhibitor', label: 'Exhibitor News', icon: Users },
  { id: 'press', label: 'Press Releases', icon: Newspaper },
];

interface BlogCategoriesProps {
  activeCategory: string;
  onCategoryChange: (id: string) => void;
}

const BlogCategories: React.FC<BlogCategoriesProps> = ({ activeCategory, onCategoryChange }) => {
  return (
    <div className="relative z-50 -mt-6 container mx-auto px-4 md:px-10">
      <div className="bg-white rounded-[24px] shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-slate-100 overflow-x-auto no-scrollbar">
        <div className="flex items-center justify-between min-w-max gap-8 px-8 py-2">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isActive = activeCategory === cat.id;

            return (
              <button
                key={cat.id}
                onClick={() => onCategoryChange(cat.id)}
                className={`flex flex-col items-center gap-2 group transition-all relative px-6 py-2 rounded-2xl ${isActive ? 'bg-gradient-to-b from-[#1a365d] to-[#001529] text-white shadow-xl' : 'text-slate-400 hover:text-[#001529]'
                  }`}
              >
                <div className={`transition-all ${isActive ? 'text-[#00df82]' : 'text-slate-400 group-hover:text-[#001529]'
                  }`}>
                  <Icon className="w-5 h-5" />
                </div>
                <span className={`text-[10px] font-bold uppercase tracking-wider transition-colors ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-[#001529]'
                  }`}>
                  {cat.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default BlogCategories;
