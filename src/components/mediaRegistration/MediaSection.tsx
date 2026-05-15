import { useState, useCallback, useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { motion } from "framer-motion";
import {
    ArrowRight,
    Download,
    FileText,
    PlayCircle,
} from "lucide-react";
import { mediaRegistrationApi, SERVER_URL } from "@/lib/api";
import SectionContainer from "../layout/SectionContainer";

const socialPosts = [
    {
        embed:
            "https://www.linkedin.com/embed/feed/update/urn:li:share:7119712431831646208",
    },
    {
        embed:
            "https://www.linkedin.com/embed/feed/update/urn:li:share:7120786239455924224",
    },
    {
        embed:
            "https://www.linkedin.com/embed/feed/update/urn:li:share:7123123444834732032",
    },
];

export default function MediaSection() {
    const [dynamicPressReleases, setDynamicPressReleases] = useState([]);
    const [dynamicVideos, setDynamicVideos] = useState([]);
    const [selectedVideo, setSelectedVideo] = useState(undefined);

    useEffect(() => {
        const fetchData = async () => {
            const data = await mediaRegistrationApi.getPageData();
            if (data) {
                if (data.pressReleases) setDynamicPressReleases(data.pressReleases);
                if (data.videos) {
                    setDynamicVideos(data.videos);
                    if (data.videos.length > 0) {
                        const firstVideo = data.videos[0];
                        setSelectedVideo({
                            ...firstVideo,
                            videoUrl: getYouTubeEmbedUrl(firstVideo.videoUrl),
                            thumbnail: firstVideo.thumbnail?.startsWith('http') ? firstVideo.thumbnail : (firstVideo.thumbnail ? `${SERVER_URL}${firstVideo.thumbnail}` : "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200&auto=format&fit=crop"),
                        });
                    }
                }
            }
        };
        fetchData();
    }, []);

    const displayPressReleases = dynamicPressReleases.map(item => ({
        ...item,
        file: item.file.startsWith('http') ? item.file : `${SERVER_URL}${item.file}`,
        date: item.date ? new Date(item.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : ''
    }));

    const getYouTubeEmbedUrl = (url: string) => {
        if (!url) return '';
        if (url.includes('embed')) return url;
        
        const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/|youtube\.com\/shorts\/)([^"&?\/\s]{11})/i;
        const match = url.match(regex);
        const videoId = match ? match[1] : null;
        
        return videoId ? `https://www.youtube.com/embed/${videoId}` : url;
    };

    const displayVideos = dynamicVideos.map(item => ({
        ...item,
        videoUrl: getYouTubeEmbedUrl(item.videoUrl),
        thumbnail: item.thumbnail?.startsWith('http') ? item.thumbnail : (item.thumbnail ? `${SERVER_URL}${item.thumbnail}` : "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200&auto=format&fit=crop"),
    }));

    const [emblaRef, emblaApi] = useEmblaCarousel({
        loop: true,
        align: "start",
    });

    const scrollPrev = useCallback(() => {
        if (emblaApi) emblaApi.scrollPrev();
    }, [emblaApi]);

    const scrollNext = useCallback(() => {
        if (emblaApi) emblaApi.scrollNext();
    }, [emblaApi]);

useEffect(()=>{
    if(dynamicVideos){

        setSelectedVideo(dynamicVideos[0])
    }
},[dynamicVideos])
    return (
        <section className="w-full bg-[#f5f7fb] py-4 px-4">
            <SectionContainer className="grid grid-cols-1 lg:grid-cols-12 gap-5">

                {/* PRESS RELEASES */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="lg:col-span-3 bg-white rounded-2xl border border-gray-200 shadow-sm p-5"
                >
                    <div className="flex items-center justify-between mb-5">
                        <h2 className="text-[#0f172a] font-bold text-sm uppercase">
                            Press Releases
                        </h2>

                        <a
                            href="#"
                            className="text-[#2563eb] text-xs font-semibold flex items-center gap-1"
                        >
                            View All
                            <ArrowRight size={13} />
                        </a>
                    </div>

                    <div className="space-y-4">
                        {displayPressReleases.map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{
                                    delay: index * 0.08,
                                }}
                                viewport={{ once: true }}
                                className="flex items-start justify-between gap-3 pb-4 border-b border-gray-100"
                            >
                                <div className="flex gap-3">
                                    <div className="mt-1">
                                        <FileText
                                            size={18}
                                            className="text-[#2563eb]"
                                        />
                                    </div>

                                    <div>
                                        <h3 className="text-sm font-semibold text-[#0f172a] leading-[1.45]">
                                            {item.title}
                                        </h3>

                                        <p className="text-xs text-gray-500 mt-1">
                                            {item.date}
                                        </p>
                                    </div>
                                </div>

                                <a
                                    href={item.file}
                                    download
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-[#2563eb] text-xs font-semibold flex items-center gap-1"
                                >
                                    PDF
                                    <Download size={13} />
                                </a>
                            </motion.div>
                        ))}
                    </div>

                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.97 }}
                        className="w-full border border-[#cbd5e1] mt-6 h-[44px] rounded-lg text-[#2563eb] font-semibold text-sm"
                    >
                        VIEW ALL PRESS RELEASES
                    </motion.button>
                </motion.div>

                {/* VIDEO & TV COVERAGE */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1, duration: 0.6 }}
                    viewport={{ once: true }}
                    className="lg:col-span-5 bg-white rounded-2xl border border-gray-200 shadow-sm p-5"
                >
                    <div className="flex items-center justify-between mb-5">
                        <h2 className="text-[#0f172a] font-bold text-sm uppercase">
                            Video & TV Coverage
                        </h2>

                        <a
                            href="#"
                            className="text-[#2563eb] text-xs font-semibold flex items-center gap-1"
                        >
                            View All
                            <ArrowRight size={13} />
                        </a>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-[1.8fr_1fr] gap-4">
                        {/* MAIN VIDEO */}
                        <motion.div
                            layout
                            className="rounded-xl overflow-hidden bg-black h-[320px]"
                        >
                            {selectedVideo&&(

                                <iframe
                                width="100%"
                                height="100%"
                                src={getYouTubeEmbedUrl(selectedVideo.videoUrl)}
                                title={selectedVideo.title}
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                className="w-full h-full"
                                />
                            )}
                        </motion.div>

                        {/* VIDEO LIST */}
                        <div className="space-y-3">
                            {displayVideos.slice(0,4).map((video, index) => (
                                <motion.button
                                    key={index}
                                    onClick={() => setSelectedVideo(video)}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className={`w-full flex gap-3 p-2 rounded-xl border transition-all text-left ${
                                        selectedVideo.title === video.title
                                            ? "border-[#2563eb] bg-[#eff6ff]"
                                            : "border-gray-200"
                                    }`}
                                >
                                    <div className="relative w-[90px] h-[65px] rounded-lg overflow-hidden shrink-0">
                                        <img
                                            src={video.thumbnail}
                                            alt={video.title}
                                            className="w-full h-full object-cover"
                                        />

                                        <div className="absolute inset-0 bg-black/35 flex items-center justify-center">
                                            <PlayCircle
                                                size={24}
                                                className="text-white"
                                            />
                                        </div>
                                    </div>

                                    <div className="flex-1">
                                        <h3 className="text-xs font-semibold text-[#0f172a] leading-[1.4]">
                                            {video.title}
                                        </h3>

                                        <p className="text-[11px] text-gray-500 mt-2">
                                            {video.duration}
                                        </p>
                                    </div>
                                </motion.button>
                            ))}
                        </div>
                    </div>

                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.97 }}
                        className="w-full border border-[#cbd5e1] mt-5 h-[44px] rounded-lg text-[#2563eb] font-semibold text-sm"
                    >
                        VIEW ALL VIDEOS
                    </motion.button>
                </motion.div>

                {/* SOCIAL MEDIA BUZZ */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                    viewport={{ once: true }}
                    className="lg:col-span-4 bg-white rounded-2xl border border-gray-200 shadow-sm p-5 overflow-hidden"
                >
                    <div className="flex items-center justify-between mb-5">
                        <h2 className="text-[#0f172a] font-bold text-sm uppercase">
                            Social Media Buzz
                        </h2>

                        <a
                            href="#"
                            className="text-[#2563eb] text-xs font-semibold flex items-center gap-1"
                        >
                            View All
                            <ArrowRight size={13} />
                        </a>
                    </div>

                    <div className="overflow-hidden" ref={emblaRef}>
                        <div className="flex">
                            {socialPosts.map((post, index) => (
                                <div
                                    key={index}
                                    className="min-w-full pr-2"
                                >
                                    <div className="rounded-xl overflow-hidden border border-gray-200 bg-white h-[430px]">
                                        <iframe
                                            src={post.embed}
                                            height="430"
                                            width="100%"
                                            frameBorder="0"
                                            allowFullScreen
                                            title={`LinkedIn Post ${index}`}
                                            className="w-full"
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* DOTS */}
                    <div className="flex items-center justify-center gap-2 mt-4">
                        <button
                            onClick={scrollPrev}
                            className="w-2 h-2 rounded-full bg-gray-300 hover:bg-[#2563eb]"
                        />

                        <button className="w-2 h-2 rounded-full bg-green-500" />

                        <button
                            onClick={scrollNext}
                            className="w-2 h-2 rounded-full bg-gray-300 hover:bg-[#2563eb]"
                        />
                    </div>
                </motion.div>
            </SectionContainer>
        </section>
    );
}