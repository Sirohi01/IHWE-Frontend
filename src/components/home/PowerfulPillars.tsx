import { motion } from "framer-motion";
import { Building2, Users, Trophy, Handshake, Leaf } from "lucide-react";

const cards = [
  {
    id: "01",
    title: "DYNAMIC\nEXHIBITION",
    color: "#2f8f3a",
    description: "Showcasing cutting-edge innovations, products, and services from global leaders and emerging startups in health and wellness sectors. A vibrant marketplace for direct engagement and unparalleled business showcasing.",
    icon: <Building2 className="w-5 h-5" />,
  },
  {
    id: "02",
    title: "INSIGHTFUL\nCONFERENCE & AROGYA\nSANGOSHTHI",
    color: "#0d47a1",
    description: "A platform for critical policy dialogue, knowledge dissemination, and expert discussions. Featuring keynote speakers and panel sessions on global health trends, traditional medicine, and future challenges.",
    icon: <Users className="w-5 h-5" />,
  },
  {
    id: "03",
    title: "PRESTIGIOUS\nAWARDS CEREMONY",
    color: "#d89a00",
    description: "Recognizing excellence and innovation across the health and wellness spectrum. Categories honor trailblazers, ground-breaking research, and significant contributions to the industry, fostering aspiration and leadership.",
    icon: <Trophy className="w-5 h-5" />,
  },
  {
    id: "04",
    title: "EXCLUSIVE\nBUYER-SELLER MEETS",
    color: "#0f8b8d",
    description: "Facilitating strategically curated B2B interactions and fostering powerful partnerships. Pre-scheduled 1-on-1 meetings connect international buyers with exhibitors, driving global commerce and collaboration.",
    icon: <Handshake className="w-5 h-5" />,
  },
];

const IntegratedFormatSection = () => {
  return (
    <section className="bg-white pt-16 pb-8 px-6 md:px-14 font-['Inter',sans-serif] overflow-hidden">
      <div className="max-w-[1500px] mx-auto flex flex-col lg:flex-row items-center gap-8">

        {/* LEFT COLUMN - HEADING (Narrower to allow more card width) */}
        <div className="w-full lg:w-[22%] flex flex-col items-start text-left shrink-0">
          <div className="flex items-center gap-3 mb-3">
            <div className="h-[1.5px] w-10 bg-[#2f8f3a]" />
            <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#2f8f3a]">Our Comprehensive</span>
          </div>

          <h2 className="text-[30px] font-black mb-5 leading-[1.1] tracking-tight">
            <span className="text-[#0d47a1]">INTEGRATED</span><br />
            <span className="flex items-center gap-3">
              <span className="text-[#2f8f3a]">FORMAT</span>
              <Leaf className="w-8 h-8 text-[#2f8f3a]" fill="#2f8f3a" />
            </span>
          </h2>

          <div className="flex flex-col gap-5 max-w-[380px]">
            <p className="text-[13.5px] leading-[1.6] text-gray-500 font-medium text-justify">
              The 9th International Health & Wellness Expo brings together innovation, business, and global opportunities on one powerful platform. Designed to maximize engagement and meaningful connections, it creates a dynamic space for exhibitors, buyers, and healthcare leaders.
            </p>
            <p className="text-[13.5px] leading-[1.6] text-gray-500 font-medium text-justify">
              From exhibitions and conferences to awards and buyer-seller meets, every element is curated to promote knowledge exchange, inspire innovation, and recognize excellence in the health and wellness industry.
            </p>
          </div>
        </div>

        {/* RIGHT COLUMN - CARDS GRID */}
        <div className="w-full lg:w-[75%] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-8 lg:pt-0">
          {cards.map((card, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              viewport={{ once: true }}
              className="relative flex flex-col items-start text-left bg-white border-[1.5px] rounded-[1.8rem] px-6 pt-16 pb-12 transition-all duration-300 hover:shadow-xl group h-full"
              style={{
                borderColor: card.color + "50",
                boxShadow: "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px"
              }}
            >
              {/* Icon Circle */}
              <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-16 h-16 rounded-full border-[4px] border-white shadow-md flex items-center justify-center z-10 overflow-hidden transition-transform duration-300 group-hover:scale-110"
                style={{ backgroundColor: card.color }}>
                <div className="absolute inset-0 border-[2px] border-white/20 rounded-full m-1" />
                <div className="relative text-white">
                  {card.icon}
                </div>
              </div>

              {/* Card Title */}
              <h3 className="text-[12.5px] font-black uppercase tracking-tight leading-tight mb-1 h-10 flex items-center text-left"
                style={{ color: card.color }}>
                {card.title}
              </h3>

              {/* Divider Gap */}
              <div className="mb-1" />

              {/* Description */}
              <p className="text-[11.2px] leading-[2.1] text-gray-600 font-medium tracking-[0.01em]">
                {card.description}
              </p>

              {/* Bottom Tab */}
              <div className="absolute -bottom-[2px] left-1/2 -translate-x-1/2 w-20 h-5 flex items-center justify-center z-30">
                <div className="absolute inset-0 rounded-b-[0.6rem]" style={{ backgroundColor: card.color }} />
                <span className="relative text-white font-black text-[10px] tracking-widest">{card.id}</span>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default IntegratedFormatSection;