import { useState, useEffect } from "react";
import { blogApi } from "@/lib/api";
import blogHero from "../../assets/blog/rename.jpeg";

// Components
import BlogHero from "@/components/blog/BlogHero";
import BlogFeaturedLayout from "@/components/blog/BlogFeaturedLayout";
import BlogLatest from "@/components/blog/BlogLatest";
import BlogExperts from "@/components/blog/BlogExperts";
import BlogResources from "@/components/blog/BlogResources";
import BlogStatsBar from "@/components/blog/BlogStatsBar";
import BlogFooter from "@/components/blog/BlogFooter";

const Blog = () => {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [experts, setExperts] = useState<any[]>([]);
  const [resources, setResources] = useState<any[]>([]);
  const [settings, setSettings] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");

  useEffect(() => {
    const fetchStaticData = async () => {
      try {
        const [expertsRes, resourcesRes, settingsRes] = await Promise.all([
          blogApi.getExpertInsights(),
          blogApi.getMediaResources(),
          blogApi.getSettings()
        ]);
        if (expertsRes?.success) setExperts(expertsRes.data);
        if (resourcesRes?.success) setResources(resourcesRes.data);
        if (settingsRes?.success) setSettings(settingsRes.data);
      } catch (error) {
        console.error("Error fetching static data:", error);
      }
    };
    fetchStaticData();
    window.scrollTo(0, 0);
  }, []);

  // Fetch blogs on Category or Search change
  useEffect(() => {
    const fetchBlogs = async () => {
      setLoading(true);
      try {
        const blogsRes = await blogApi.getAll({
          category: activeCategory,
          search: debouncedQuery
        });
        if (blogsRes?.success) setBlogs(blogsRes.data);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, [activeCategory, debouncedQuery]);

  // Search Debouncing
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 500);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Robust data filtering
  const allBlogs = blogs.length > 0 ? blogs : [];

  // 1. Filter by Category & Search
  const filteredBlogs = allBlogs.filter(blog => {
    const matchesCategory = activeCategory === "all" ||
      blog.category?.toLowerCase() === activeCategory.toLowerCase();

    const matchesSearch = !debouncedQuery ||
      blog.title.toLowerCase().includes(debouncedQuery.toLowerCase()) ||
      blog.excerpt?.toLowerCase().includes(debouncedQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  // Featured blogs for the main section
  const featuredBlogs = allBlogs.filter(b => b.featured === true || b.featured === 'true').slice(0, 3);
  const displayFeatured = featuredBlogs.length > 0 ? featuredBlogs : allBlogs.slice(0, 3);

  // Latest blogs
  const latestBlogs = filteredBlogs.slice(0, 6);

  const displayExperts = experts.length > 0 ? experts : [
    { name: "Dr. Randeep Guleria", role: "Pulmonologist, AIIMS", insightTitle: "Preparing Healthcare Systems for the Future", image: "/uploads/experts/expert1.png", linkedArticleSlug: "healthcare-future" },
    { name: "Dr. Harsh Vardhan", role: "Former Union Minister", insightTitle: "India's Vision for Global Health Leadership", image: "/uploads/experts/expert2.png", linkedArticleSlug: "health-leadership" },
    { name: "Dr. Mickey Mehta", role: "Global Leading Wellness Guru", insightTitle: "The Wellness Mantra for a Better Tomorrow", image: "/uploads/experts/expert3.png", linkedArticleSlug: "wellness-mantra" },
    { name: "Dr. Soumya Swaminathan", role: "Former Chief Scientist, WHO", insightTitle: "Building Resilient & Inclusive Health Systems", image: "/uploads/experts/expert4.png", linkedArticleSlug: "resilient-systems" },
    { name: "Dr. Devi Shetty", role: "Chairman, Narayana Health", insightTitle: "Affordable Healthcare for All: A Global Need", image: "/uploads/experts/expert5.png", linkedArticleSlug: "affordable-healthcare" },
    { name: "Shri Rajiv Bansal", role: "Chairman, Ayush", insightTitle: "The Global Rise of Ayurveda & Wellness", image: "/uploads/experts/expert6.png", linkedArticleSlug: "ayurveda-wellness" },
  ];

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <div className="bg-white min-h-screen font-inter overflow-x-hidden">
      {/* 1. Hero Section + Stats Bar */}
      <BlogHero settings={settings} onSearch={handleSearch} heroImage={blogHero} />

      {/* 2. Featured Section with Sidebar (Categories & Newsletter) */}
      <BlogFeaturedLayout
        featured={displayFeatured}
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
      />

      {/* 3. Voices of Experts (Slider) */}
      <BlogExperts experts={displayExperts} />

      {/* 4. Bottom Grid (Latest + Videos + Resources) */}
      <section className="mt-2 pb-2 bg-slate-50/80">
        <div className="container mx-auto px-5 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-10 gap-8">
            {/* Column 1: Latest from IHWE (30%) */}
            <div className="lg:col-span-3">
              <BlogLatest blogs={latestBlogs} type="latest" />
            </div>

            {/* Column 2: Video Insights (40%) */}
            <div className="lg:col-span-4">
              <BlogLatest blogs={latestBlogs} type="videos" />
            </div>

            {/* Column 3: Resources (30%) */}
            <div className="lg:col-span-3">
              <BlogResources resources={resources} />
            </div>
          </div>
        </div>
      </section>

      {/* 5. Stats Bar (Bottom) */}
      <BlogStatsBar />

      {/* 6. Professional Footer */}
      <BlogFooter />
    </div>
  );
};

export default Blog;
