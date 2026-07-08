import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Download,
  FileText,
  Package,
  Image as ImageIcon,
  FileArchive,
  Video,
} from "lucide-react";
import mediakit_image from "../../assets/mediakit.webp";
import { mediaRegistrationApi, SERVER_URL } from "@/lib/api";
import SectionContainer from "../layout/SectionContainer";


const MediaKitComponent = () => {
  const [dynamicResources, setDynamicResources] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await mediaRegistrationApi.getPageData();
      if (data && data.resources) {
        setDynamicResources(data.resources);
      }
    };
    fetchData();
  }, []);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'FileText': return <FileText size={28} />;
      case 'Package': return <Package size={28} />;
      case 'FileArchive': return <FileArchive size={28} />;
      case 'ImageIcon': return <ImageIcon size={28} />;
      case 'Video': return <Video size={28} />;
      default: return <FileText size={28} />;
    }
  };

  const getFormat = (icon: string) => {
    switch (icon) {
      case 'FileText': return 'PDF';
      case 'FileArchive': return 'ZIP';
      case 'ImageIcon': return 'GALLERY';
      case 'Video': return 'WATCH';
      default: return 'FILE';
    }
  };

  const downloadItems = [
    {
      label: "Event Brochure",
      format: "PDF",
      icon: <FileText size={28} />,
    },
    {
      label: "Logo Pack",
      format: "ZIP",
      icon: <Package size={28} />,
    },
    {
      label: "Press Kit",
      format: "PDF",
      icon: <FileArchive size={28} />,
    },
  ];

  const displayResources =
    dynamicResources.filter((r: any) => !r.isMain).map((item: any) => ({
      ...item,
      label: item.title,
      format: getFormat(item.icon),
      icon: getIcon(item.icon),
      link: item.link.startsWith('http') ? item.link : `${SERVER_URL}${item.link}`
    })) ;

  const mainDownload = dynamicResources.find((r: any) => r.isMain) ||
    dynamicResources.find((r: any) => r.icon === 'FileArchive');

  const mainDownloadLink = mainDownload ? (mainDownload.link.startsWith('http') ? mainDownload.link : `${SERVER_URL}${mainDownload.link}`) : null;


  return (
    <section className="w-full bg-slate-100 py-0 flex items-center justify-center ">
      <SectionContainer>
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            ease: "easeOut",
          }}
          viewport={{ once: true }}
          className="w-full overflow-hidden rounded-xl shadow-2xl relative "
        >
          {/* Background Gradient */}
          <div className="relative bg-gradient-to-r from-[#003d4d] via-[#001e30] to-[#000a14] flex flex-col lg:flex-row items-center gap-8 overflow-hidden lg:px-8 px-4">

            {/* BACKGROUND GLOW */}
            <motion.div
              animate={{
                opacity: [0.15, 0.35, 0.15],
                scale: [1, 1.15, 1],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute top-[-60px] left-[-40px] w-[150px] h-[100px] bg-emerald-500/20 rounded-full blur-3xl"
            />

            {/* LEFT PRODUCT MOCKUPS */}
            <motion.div
              initial={{ opacity: 0, x: -80, rotate: -8 }}
              whileInView={{ opacity: 1, x: 0, rotate: 0 }}
              transition={{
                delay: 0.2,
                duration: 0.9,
                type: "spring",
              }}
              viewport={{ once: true }}
              className="relative flex justify-center items-center w-full lg:w-1/6 h-40 sm:h-40"
            >
              {/* FRONT CARD */}
              <img loading="lazy" decoding="async" src={mediakit_image} alt="Media Kit" className="w-auto h-full object-contain" />
            </motion.div>
            <div className="flex items-center">

              {/* MIDDLE CONTENT */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.5,
                  duration: 0.7,
                }}
                viewport={{ once: true }}
                className="text-center lg:text-left border-l-0 lg:border-l border-white/10 lg:pl-8 w-[250px]"
              >
                <motion.h4
                  initial={{ opacity: 0, letterSpacing: "0px" }}
                  whileInView={{ opacity: 1, letterSpacing: "2px" }}
                  transition={{
                    delay: 0.7,
                    duration: 0.5,
                  }}
                  viewport={{ once: true }}
                  className="text-white text-sm font-semibold tracking-widest uppercase mb-1"
                >
                  Download
                </motion.h4>

                <motion.h2
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 0.9,
                    duration: 0.6,
                  }}
                  viewport={{ once: true }}
                  className="text-white text-4xl font-bold mb-4"
                >
                  MEDIA KIT
                </motion.h2>

                <motion.p
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{
                    delay: 1.1,
                    duration: 0.7,
                  }}
                  viewport={{ once: true }}
                  className="text-slate-300 text-xs max-w-md leading-relaxed mx-auto lg:mx-0"
                >
                  Get access to event information, logos, images, brochures and
                  official resources.
                </motion.p>
              </motion.div>

              {/* FILES SECTION */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 lg:gap-8 items-center border-l-0 lg:border-l border-white/10 lg:px-8">
                {displayResources.map((item: any, index: number) => (
                  <motion.div
                    key={index}
                    initial={{
                      opacity: 0,
                      scale: 0.7,
                      y: 30,
                    }}
                    whileInView={{
                      opacity: 1,
                      scale: 1,
                      y: 0,
                    }}
                    transition={{
                      delay: 1.3 + index * 0.18,
                      duration: 0.5,
                      type: "spring",
                    }}
                    viewport={{ once: true }}
                    whileHover={{
                      y: -8,
                      scale: 1.06,
                    }}
                    onClick={() => {
                      if (item.link) {
                        window.open(item.link, '_blank');
                      }
                    }}
                    className="flex flex-col items-center px-2 text-center group cursor-pointer border-l-0 lg:border-r border-white/10 "
                  >
                    <motion.div
                      whileHover={{
                        rotate: [0, -8, 8, 0],
                      }}
                      transition={{
                        duration: 0.5,
                      }}
                      className="text-emerald-400 mb-2"
                    >
                      {item.icon}
                    </motion.div>

                    <span className="text-white text-[11px] font-medium leading-tight">
                      {item.label}
                    </span>

                    <span className="text-emerald-400 text-[10px] font-bold mt-1">
                      {item.format}
                    </span>
                  </motion.div>
                ))}
              </div>


              {/* CTA BUTTON */}
              <motion.div
                initial={{ opacity: 0, x: 60 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{
                  delay: 2,
                  duration: 0.7,
                }}
                viewport={{ once: true }}
                className="max-w-[250px] lg:pl-8 flex justify-center"
              >
                <motion.button
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0px 0px 25px rgba(16,185,129,0.4)",
                  }}
                  whileTap={{
                    scale: 0.95,
                  }}
                  onClick={() => {
                    if (mainDownloadLink) {
                      window.open(mainDownloadLink, '_blank');
                    } else {
                      alert("Media Kit is currently being updated. Please check back later.");
                    }
                  }}
                  className="flex items-center justify-between gap-4 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-white font-bold py-4 px-8 rounded-lg transition-all w-full lg:w-64 shadow-lg shadow-emerald-900/20 max-h-12 mt-5"
                >
                  <span className="text-sm tracking-wide">
                    DOWNLOAD ALL
                  </span>

                  <motion.div
                    animate={{
                      y: [0, 3, 0],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                    }}
                  >
                    <Download size={20} />
                  </motion.div>
                </motion.button>
              </motion.div>
            </div>

          </div>
        </motion.div>
      </SectionContainer>
    </section>
  );
};

export default MediaKitComponent;