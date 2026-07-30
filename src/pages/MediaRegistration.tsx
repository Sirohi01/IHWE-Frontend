import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
    CheckCircle,
    ShieldCheck,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { heroBackgroundApi, SERVER_URL, crmApi } from "@/lib/api";
import HeroBg from "@/assets/media.webp";
import FeaturedMediaCoverage from "@/components/mediaRegistration/FeaturedMediaCarousel";
import MediaSection from "@/components/mediaRegistration/MediaSection";
import MediaBanner from "@/components/mediaRegistration/MediaBanner";
import GlobalMediaStats from "@/components/mediaRegistration/GlobalMediaStats";
import MediaPartners from "@/components/mediaRegistration/MediaPartners";
import MediaKitComponent from "@/components/mediaRegistration/MediaKitComponent";
import MediaContact from "@/components/mediaRegistration/MediaContact";



const MEDIA_CATEGORIES = [
    "Print Media",
    "Digital News/Portal",
    "Blogger/Influencer",
    "Television",
    "Radio",
    "Freelance Journalist",
    "Others"
];



const MediaRegistration = () => {
    return (
        <div className="min-h-screen bg-[#FDFDFD] font-inter text-slate-900">
            {/* ── HERO SECTION - Registration Standard 16:5 ── */}
          <MediaBanner/>
            <FeaturedMediaCoverage />
            <MediaSection />
            <GlobalMediaStats />
            <MediaPartners />
            <MediaKitComponent/>
            <MediaContact />
        </div>
    );
};

export default MediaRegistration;
