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

const ExhibitorGrid: React.FC<Props> = ({ exhibitors }) => {
    return (
        <section className="pb-3 pt-2 bg-white min-h-[600px]">
            <div className="max-w-[1400px] mx-auto px-6 md:px-12">
                <VirtuosoGrid
                    data={exhibitors}
                    useWindowScroll
                    listClassName="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-10 gap-3"
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
                                <img decoding="async" src={exhi.image.startsWith('http') ? exhi.image : `${SERVER_URL}${exhi.image}`}
                                    alt={exhi.altText || exhi.title}
                                    loading="lazy"
                                    className="max-w-[92%] max-h-[92%] object-contain group-hover:scale-110 transition-transform duration-500"
                                    onError={(e) => {
                                        // Fallback if image fails to load
                                        e.currentTarget.src = 'https://placehold.co/150?text=Logo';
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
            </div>
        </section>
    );
};

export default ExhibitorGrid;
