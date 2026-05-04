import { useState, useEffect, useCallback } from "react";
import ExhibitorHero from "../components/exhibitors/ExhibitorHero";
import ExhibitorFilters from "../components/exhibitors/ExhibitorFilters";
import ExhibitorGrid from "../components/exhibitors/ExhibitorGrid";
import ExhibitorCTA from "../components/exhibitors/ExhibitorCTA";
import { Leaf } from "lucide-react";
import { exhibitorApi } from "@/lib/api";

const ITEMS_PER_PAGE = 32;

const Exhibitors = () => {
    const [exhibitors, setExhibitors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [loadingMore, setLoadingMore] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [activeCategory, setActiveCategory] = useState("ALL");

    // Pagination State
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(false);

    // Manual debounce logic
    const [debouncedSearch, setDebouncedSearch] = useState("");

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedSearch(searchTerm);
            setPage(1);
        }, 500);

        return () => clearTimeout(handler);
    }, [searchTerm]);

    useEffect(() => {
        setPage(1); // Reset page on category change
    }, [activeCategory]);

    const fetchExhibitors = useCallback(async (isLoadMore = false) => {
        if (isLoadMore) setLoadingMore(true);
        else setLoading(true);

        try {
            const currentPage = isLoadMore ? page + 1 : 1;
            const response = await exhibitorApi.get({
                category: activeCategory,
                search: debouncedSearch,
                page: currentPage,
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

            if (isLoadMore) {
                setExhibitors(prev => [...prev, ...newData]);
                setPage(currentPage);
            } else {
                setExhibitors(newData);
                setPage(1);
            }

            // Update hasMore status
            if (pagination) {
                setHasMore(pagination.page < pagination.totalPages);
            } else {
                setHasMore(false);
            }

        } catch (error) {
            console.error("Error fetching exhibitors:", error);
        } finally {
            setLoading(false);
            setLoadingMore(false);
        }
    }, [activeCategory, debouncedSearch, page]);

    useEffect(() => {
        fetchExhibitors(false);
    }, [activeCategory, debouncedSearch]);

    return (
        <div className="bg-white min-h-screen">
            <ExhibitorHero />
            {/* Header Section - Moved above filters */}
            <div className="text-center py-4 bg-white">
                <div className="flex items-center justify-center gap-3 mb-1">
                    <div className="w-8 h-[1px] bg-gray-200" />
                    <span className="text-[14px] font-black uppercase tracking-[0.3em] text-[#1a4a2a] flex items-center gap-2">
                        OUR PREVIOUS EXHIBITORS <Leaf className="w-3 h-3 fill-[#1a4a2a]" />
                    </span>
                    <div className="w-8 h-[1px] bg-gray-200" />
                </div>
                <h2 className="text-2xl md:text-[2.2rem] font-bold text-[#0a3622] tracking-tight">
                    A Platform Trusted by Industry Leaders
                </h2>
            </div>

            {/* <ExhibitorFilters
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
                activeCategory={activeCategory}
                onCategoryChange={setActiveCategory}
            /> */}
            {loading ? (
                <div className="min-h-[400px] flex items-center justify-center">
                    <div className="w-10 h-10 border-4 border-green-500 border-t-transparent rounded-full animate-spin" />
                </div>
            ) : (
                <ExhibitorGrid
                    exhibitors={exhibitors}
                    onLoadMore={() => fetchExhibitors(true)}
                    hasMore={hasMore}
                    isLoadingMore={loadingMore}
                />
            )}
            <ExhibitorCTA />
        </div>
    );
};

export default Exhibitors;
