import { useState, useEffect } from "react";
import { blogApi } from "@/lib/api";
import {
  Activity, Heart, Lightbulb, Scale, Users,
  FileText, Image as ImageIcon, Briefcase, Video
} from 'lucide-react';
import blogHero from "../assets/blogs.webp";

// Components
import BlogHero from "@/components/blog/BlogHero";
import BlogCategories from "@/components/blog/BlogCategories";
import BlogFeaturedLayout from "@/components/blog/BlogFeaturedLayout";
import BlogLatest from "@/components/blog/BlogLatest";
import BlogExperts from "@/components/blog/BlogExperts";
import BlogResources from "@/components/blog/BlogResources";
import BlogCTA from "@/components/blog/BlogCTA";

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

  // Get explicitly marked blogs (from all blogs to keep featured section stable)
  const explicitlyFeatured = allBlogs.filter(b => b.featured === true || b.featured === 'true');
  const explicitlyTrending = allBlogs.filter(b => b.isTrending === true || b.isTrending === 'true');

  // Featured & Trending sections
  const featuredBlogs = [...explicitlyFeatured, ...allBlogs.filter(b => !explicitlyFeatured.includes(b))].slice(0, 6);
  const trendingBlogs = [...explicitlyTrending, ...allBlogs.filter(b => !explicitlyTrending.includes(b))].slice(0, 6);
  
  // Latest blogs should definitely be filtered
  const latestBlogs = filteredBlogs.slice(0, 12);

  const displayExperts = experts.length > 0 ? experts : [
    { name: "Dr. Randeep Guleria", role: "Pulmonologist, AIIMS", insight: "Preparing Healthcare Systems for the Future is our top priority.", image: "/uploads/experts/expert1.png", linkedArticleSlug: "healthcare-future" },
    { name: "Dr. Harsh Vardhan", role: "Former Union Minister", insight: "India's Vision for Global Health Leadership is becoming a reality.", image: "/uploads/experts/expert2.png", linkedArticleSlug: "health-leadership" },
    { name: "Dr. Mickey Mehta", role: "Global Leading Wellness Guru", insight: "The Wellness Mantra for a Better Tomorrow starts with self-care.", image: "/uploads/experts/expert3.png", linkedArticleSlug: "wellness-mantra" },
    { name: "Dr. Soumya Swaminathan", role: "Former Chief Scientist, WHO", insight: "Building Resilient & Inclusive Health Systems is the path forward.", image: "/uploads/experts/expert4.png", linkedArticleSlug: "resilient-systems" },
  ];

  const popularTopics = [
    { id: 'preventive', label: 'Preventive Healthcare', count: 28, icon: Activity },
    { id: 'mental', label: 'Mental Health', count: 24, icon: Heart },
    { id: 'women', label: 'Women\'s Health', count: 20, icon: Users },
    { id: 'nutrition', label: 'Nutrition & Diet', count: 18, icon: Lightbulb },
    { id: 'fitness', label: 'Fitness & Lifestyle', count: 32, icon: Briefcase },
    { id: 'tech', label: 'Medical Technology', count: 26, icon: Activity },
  ];

  const mediaResources = [
    { title: "Press Kit", type: "download", icon: <FileText size={20} />, link: "#" },
    { title: "Image Gallery", type: "view", icon: <ImageIcon size={20} />, link: "#" },
    { title: "Logos", type: "download", icon: <Briefcase size={20} />, link: "#" },
    { title: "Videos", type: "watch", icon: <Video size={20} />, link: "#" },
  ];

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <div className="bg-white min-h-screen font-inter">
      {/* 1. Hero Section */}
      <BlogHero settings={settings} onSearch={handleSearch} heroImage={blogHero} />

      {/* 2. Category Filter Bar */}
      <BlogCategories
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
      />

      {/* 3. Featured & Trending Section */}
      <BlogFeaturedLayout
        featured={featuredBlogs}
        trending={trendingBlogs}
      />

      {/* 4. Latest Articles Grid */}
      <BlogLatest blogs={latestBlogs} />

      {/* 5. Expert Insights Carousel */}
      <BlogExperts experts={displayExperts} />

      {/* 6. Popular Topics & Resources */}
      <BlogResources topics={popularTopics} resources={resources.length > 0 ? resources : mediaResources} />

      {/* 7. Newsletter & Footer CTA */}
      <BlogCTA />
    </div>
  );
};

export default Blog;
