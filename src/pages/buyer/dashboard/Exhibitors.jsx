import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, Star, Building2, MapPin, 
  Globe, MessageSquare, ArrowUpRight
} from 'lucide-react';

const mockExhibitors = [
  {
    id: 1,
    name: "CraftArt Exports",
    category: "Home Decor & Furnishing",
    location: "Jaipur, India",
    rating: 4.8,
    matchScore: "98%",
    description: "Specializing in handcrafted wooden furniture and decorative items with a focus on sustainable materials.",
    tags: ["Sustainable", "Handcrafted", "B2B Expert"]
  },
  {
    id: 2,
    name: "Loom weavers Co.",
    category: "Textiles & Carpets",
    location: "Varanasi, India",
    rating: 4.9,
    matchScore: "95%",
    description: "Premium silk textiles and hand-knotted carpets serving luxury European and American markets.",
    tags: ["Silk", "Luxury", "Custom Designs"]
  },
  {
    id: 3,
    name: "Earthware Ceramics",
    category: "Pottery & Ceramics",
    location: "Khurja, India",
    rating: 4.7,
    matchScore: "92%",
    description: "Industrial-scale production of high-quality ceramic tableware and hotel supplies.",
    tags: ["Tableware", "Mass Production", "Hotel Supplies"]
  },
  {
    id: 4,
    name: "Indigo Blues",
    category: "Apparel & Fashion",
    location: "Auroville, India",
    rating: 4.6,
    matchScore: "88%",
    description: "Natural dye apparel and conscious fashion accessories for global brands.",
    tags: ["Natural Dye", "Eco-Friendly", "Fashion"]
  }
];

export default function Exhibitors() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('All');

  const filtered = mockExhibitors.filter(ex => 
    (filter === 'All' || ex.category.includes(filter)) &&
    (ex.name.toLowerCase().includes(searchTerm.toLowerCase()) || ex.category.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="space-y-6 animate-fadeIn pb-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="w-1 h-3.5 bg-[#23471d] rounded-full" />
            <span className="font-extrabold text-[10px] text-[#23471d] uppercase tracking-widest font-sans">Strategic Partnering</span>
          </div>
          <h2 className="text-[20px] font-black text-slate-800 tracking-tight uppercase font-sans">Exhibitor Directory</h2>
        </div>
        <div className="flex gap-2">
           <div className="px-3 py-1.5 bg-[#23471d]/10 text-[#23471d] rounded-sm text-[9px] font-black uppercase tracking-widest border border-[#23471d]/20 flex items-center gap-2 font-sans">
              <Star className="w-3 h-3 fill-[#23471d]" />
              Top Global Matches
           </div>
        </div>
      </div>

      {/* Control Bar */}
      <div className="p-4 bg-white border border-slate-200 rounded-sm shadow-sm flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search by name, category or product..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-sm text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-[#23471d] transition-all font-sans"
          />
        </div>
        <div className="flex gap-2 shrink-0">
          {['All', 'Textiles', 'Decor', 'Fashion'].map(cat => (
            <button 
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-2 rounded-sm text-[9px] font-black uppercase tracking-widest border transition-all font-sans ${
                filter === cat 
                ? 'bg-[#23471d] text-white border-[#23471d] shadow-sm' 
                : 'bg-white text-slate-500 border-slate-200 hover:border-[#23471d]/30'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        <AnimatePresence mode='popLayout'>
          {filtered.map((ex, idx) => (
            <motion.div
              layout
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              key={ex.id}
              className="bg-white border border-slate-200 p-6 flex flex-col md:flex-row gap-6 group rounded-sm hover:shadow-md transition-all duration-300"
            >
              <div className="shrink-0 w-24 h-24 bg-slate-50 rounded-sm border border-slate-100 flex items-center justify-center relative group-hover:bg-[#23471d]/5 transition-colors">
                <Building2 className="w-10 h-10 text-slate-300 group-hover:text-[#23471d] transition-colors" />
                <div className="absolute -top-2 -right-2 bg-[#d26019] text-white text-[8px] font-black px-2 py-1 rounded-sm shadow-lg uppercase tracking-tighter">
                   {ex.matchScore} Match
                </div>
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-[14px] font-black text-slate-800 tracking-tight font-sans uppercase">{ex.name}</h3>
                    <p className="text-[9px] font-bold text-[#23471d] uppercase tracking-widest font-sans">{ex.category}</p>
                  </div>
                  <div className="flex items-center gap-1 bg-amber-50 text-amber-600 px-2 py-0.5 rounded-sm text-[9px] font-black font-sans">
                     <Star className="w-3 h-3 fill-amber-600" />
                     {ex.rating}
                  </div>
                </div>

                <p className="mt-3 text-[11px] text-slate-500 leading-relaxed line-clamp-2 italic font-medium font-sans">
                   "{ex.description}"
                </p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {ex.tags.map(tag => (
                    <span key={tag} className="px-2 py-0.5 bg-slate-100 text-slate-500 rounded-sm text-[8px] font-black uppercase tracking-widest font-sans">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                   <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1.5 text-[9px] font-bold text-slate-400 font-sans uppercase">
                         <MapPin className="w-3 h-3" />
                         {ex.location}
                      </div>
                      <div className="flex items-center gap-1.5 text-[9px] font-bold text-slate-400 font-sans uppercase">
                         <Globe className="w-3 h-3" />
                         Certified
                      </div>
                   </div>
                   <div className="flex gap-2">
                      <button className="p-2 bg-slate-50 text-slate-400 rounded-sm hover:bg-[#23471d]/5 hover:text-[#23471d] transition-all border border-transparent hover:border-[#23471d]/20 shadow-sm">
                         <MessageSquare className="w-3.5 h-3.5" />
                      </button>
                      <button className="px-4 py-2 bg-[#23471d] text-white rounded-sm text-[9px] font-black uppercase tracking-widest hover:bg-[#1a3516] transition-all shadow-md flex items-center gap-1.5 font-sans">
                         Schedule B2B
                         <ArrowUpRight className="w-3 h-3" />
                      </button>
                   </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {filtered.length === 0 && (
         <div className="bg-white border border-slate-200 p-20 text-center rounded-sm">
            <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4 border border-slate-100">
               <Search className="w-8 h-8 text-slate-200" />
            </div>
            <h3 className="text-sm font-black text-slate-800 uppercase tracking-widest font-sans">No Exhibitors Found</h3>
            <p className="text-xs text-slate-500 mt-2 font-sans">Try adjusting your filters or search terms.</p>
         </div>
      )}
    </div>
  );
}

