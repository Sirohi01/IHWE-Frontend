import React from 'react';
import { Search } from 'lucide-react';

interface Props {
    searchTerm: string;
    onSearchChange: (term: string) => void;
    activeCategory: string;
    onCategoryChange: (category: string) => void;
}

const CATEGORIES = [
    "ALL",
    "AYURVEDA",
    "PHARMA",
    "FITNESS",
    "ORGANIC & NUTRITION",
    "MEDICAL DEVICES",
    "WELLNESS & SPA",
    "OTHERS"
];

const ExhibitorFilters: React.FC<Props> = ({
    searchTerm,
    onSearchChange,
    activeCategory,
    onCategoryChange
}) => {
    return (
        <section className="py-2 bg-white sticky top-[80px] z-40 border-b border-gray-100 shadow-sm">
            <div className="max-w-[1400px] mx-auto px-6 md:px-12">
                <div className="flex items-center justify-between gap-4">

                    {/* Categories Pills - Single Line with Scroll */}
                    <div className="flex flex-nowrap items-center gap-1.5 overflow-x-auto scrollbar-hide flex-1 py-1">
                        {CATEGORIES.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => onCategoryChange(cat)}
                                className={`px-4 py-2 rounded-lg text-[12px] font-black uppercase tracking-[0.1em] transition-all border whitespace-nowrap ${activeCategory === cat
                                    ? "bg-[#1a4a2a] text-white border-[#1a4a2a] shadow-md shadow-green-900/10 scale-105"
                                    : "bg-white text-gray-500 border-gray-50 hover:border-gray-200"
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                    {/* Search Bar - Fixed Width to stay on line */}
                    <div className="relative w-48 md:w-64 shrink-0">
                        <input
                            type="text"
                            placeholder="Search Exhibitor..."
                            value={searchTerm}
                            onChange={(e) => onSearchChange(e.target.value)}
                            className="w-full pl-5 pr-12 py-2.5 bg-gray-50/50 border border-gray-100 rounded-xl focus:ring-4 focus:ring-green-500/5 focus:border-[#1a4a2a] outline-none text-[12px] font-semibold transition-all placeholder:text-gray-500"
                        />
                        <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                    </div>

                </div>
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
                .scrollbar-hide::-webkit-scrollbar {
                    display: none;
                }
                .scrollbar-hide {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
            `}} />
        </section>
    );
};

export default ExhibitorFilters;
