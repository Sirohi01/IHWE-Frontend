import React from 'react';
import { VirtuosoGrid } from 'react-virtuoso';
import { motion } from 'framer-motion';
import { ChevronDown, Loader2, Leaf } from 'lucide-react';
import { SERVER_URL } from '@/lib/api';

interface Props {
    exhibitors: any[];
    onLoadMore?: () => void;
    hasMore?: boolean;
    isLoadingMore?: boolean;
}

const ExhibitorGrid: React.FC<Props> = ({ exhibitors, onLoadMore, hasMore, isLoadingMore }) => {
    return (
        <section className="pb-3 pt-2 bg-white min-h-[600px]">
            <div className="max-w-[1400px] mx-auto px-6 md:px-12">
                <VirtuosoGrid
                    data={exhibitors}
                    useWindowScroll
                    listClassName="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4"
                    itemContent={(index, exhi) => (
                        <motion.div
                            key={exhi._id}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.3, delay: (index % 12) * 0.03 }}
                            className="group relative bg-white border border-gray-100 rounded-xl p-1 flex items-center justify-center aspect-square shadow-sm hover:shadow-xl hover:border-green-100 transition-all duration-300"
                        >
                            <div className="w-full h-full flex items-center justify-center overflow-hidden">
                                <img
                                    src={exhi.image.startsWith('http') ? exhi.image : `${SERVER_URL}${exhi.image}`}
                                    alt={exhi.altText || exhi.title}
                                    loading="lazy"
                                    className="max-w-[92%] max-h-[92%] object-contain group-hover:scale-110 transition-transform duration-500"
                                    onError={(e) => {
                                        // Fallback if image fails to load
                                        e.currentTarget.src = 'https://via.placeholder.com/150?text=Logo';
                                    }}
                                />
                            </div>
                        </motion.div>
                    )}
                />

                {exhibitors.length === 0 && (
                    <div className="text-center py-24 text-gray-400 italic">
                        No exhibitors found matching your search.
                    </div>
                )}

                {hasMore && (
                    <div className="mt-2 flex flex-col items-center">
                        <button
                            onClick={onLoadMore}
                            disabled={isLoadingMore}
                            className="flex items-center gap-6 px-10 py-3 bg-white border border-gray-200 rounded-xl text-[12px] font-bold uppercase tracking-[0.05em] text-[#1a4a2a] hover:bg-gray-50 hover:border-gray-300 transition-all shadow-sm group disabled:opacity-50"
                        >
                            {isLoadingMore ? (
                                <>
                                    Loading... <Loader2 className="w-4 h-4 animate-spin" />
                                </>
                            ) : (
                                <>
                                    LOAD MORE EXHIBITORS <ChevronDown className="w-4 h-4 text-gray-400 group-hover:translate-y-0.5 transition-transform" />
                                </>
                            )}
                        </button>
                    </div>
                )}
            </div>
        </section>
    );
};

export default ExhibitorGrid;
