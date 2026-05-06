import { useState, useEffect, useCallback } from "react";
import ExhibitorHero from "../components/exhibitors/ExhibitorHero";
import ExhibitorFilters from "../components/exhibitors/ExhibitorFilters";
import ExhibitorGrid from "../components/exhibitors/ExhibitorGrid";
import ExhibitorCTA from "../components/exhibitors/ExhibitorCTA";
import { Leaf } from "lucide-react";
import { exhibitorApi } from "@/lib/api";

const ITEMS_PER_PAGE = 80;

const Exhibitors = () => {
    const [exhibitors, setExhibitors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [activeCategory, setActiveCategory] = useState("ALL");
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [debouncedSearch, setDebouncedSearch] = useState("");

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedSearch(searchTerm);
            setPage(1);
        }, 500);

        return () => clearTimeout(handler);
    }, [searchTerm]);

    const fetchExhibitors = useCallback(async (targetPage = 1) => {
        setLoading(true);
        try {
            const response = await exhibitorApi.get({
                category: activeCategory,
                search: debouncedSearch,
                page: targetPage,
                limit: ITEMS_PER_PAGE
            });

            let newData = [];
            let pagination = null;

            if (response && response.data) {
                newData = response.data;
                pagination = response.pagination;
            } else {
                newData = response || [];
            }

            setExhibitors(newData);
            if (pagination) {
                setTotalPages(pagination.totalPages);
            }
        } catch (error) {
            console.error("Error fetching exhibitors:", error);
        } finally {
            setLoading(false);
        }
    }, [activeCategory, debouncedSearch]);
    useEffect(() => {
        fetchExhibitors(page);
    }, [page, activeCategory, debouncedSearch, fetchExhibitors]);
    useEffect(() => {
        setPage(1);
    }, [activeCategory, debouncedSearch]);
    useEffect(() => {
        if (totalPages <= 1) return;

        const interval = setInterval(() => {
            setPage(prev => (prev >= totalPages ? 1 : prev + 1));
        }, 20000);

        return () => clearInterval(interval);
    }, [totalPages]);

    return (
        <div className="bg-white min-h-screen">
            <ExhibitorHero />
            <div className="text-center py-4 bg-white">
                <div className="flex items-center justify-center gap-3 mb-1">
                    <div className="w-8 h-[1px] bg-gray-200" />
                    <span className="text-[14px] font-black uppercase tracking-[0.3em] text-[#1a4a2a] flex items-center gap-2">
                        OUR PREVIOUS EXHIBITORS <Leaf className="w-3 h-3 fill-[#1a4a2a]" />
                    </span>
                    <div className="w-8 h-[1px] bg-gray-200" />
                </div>
                <h2 className="text-xl md:text-[2.0rem] font-semiBold text-[#d26019] tracking-tight">
                    A Platform Trusted by Industry Leaders
                </h2>
            </div>

            {loading ? (
                <div className="min-h-[400px] flex items-center justify-center">
                    <div className="w-10 h-10 border-4 border-green-500 border-t-transparent rounded-full animate-spin" />
                </div>
            ) : (
                <div className="pb-12">
                    <ExhibitorGrid exhibitors={exhibitors} />

                    {/* Pagination UI */}
                    {totalPages > 1 && (
                        <div className="flex justify-center items-center gap-2 mt-8">
                            <button
                                onClick={() => setPage(prev => Math.max(1, prev - 1))}
                                disabled={page === 1}
                                className="px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50"
                            >
                                Previous
                            </button>

                            <div className="flex gap-2">
                                {[...Array(totalPages)].map((_, i) => (
                                    <button
                                        key={i + 1}
                                        onClick={() => setPage(i + 1)}
                                        className={`w-8 h-8 rounded-full text-xs font-bold transition-all ${page === i + 1
                                            ? "bg-[#1a4a2a] text-white"
                                            : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                                            }`}
                                    >
                                        {i + 1}
                                    </button>
                                ))}
                            </div>

                            <button
                                onClick={() => setPage(prev => Math.min(totalPages, prev + 1))}
                                disabled={page === totalPages}
                                className="px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50"
                            >
                                Next
                            </button>
                        </div>
                    )}
                </div>
            )}
            <ExhibitorCTA />
        </div>
    );
};

export default Exhibitors;
