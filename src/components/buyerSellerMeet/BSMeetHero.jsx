import { FaCalendarAlt, FaMapMarkerAlt, FaUserTie, FaStore } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const BSMeetHero = () => {
    const navigate = useNavigate();

    return (
        <div
            className="w-full bg-cover relative bg-no-repeat bg-center"
            style={{
                backgroundImage: "url('/bsmeet/bg2.png')"
            }}
        >
            {/* GREEN OVERLAY */}
            <div className="absolute inset-0 bg-green-500/10"></div>

            <div className="relative z-10 py-1 px-6 md:px-16">
                <div className="flex justify-between w-full gap-10 items-center">

                    {/* LEFT CONTENT */}
                    <div className="w-[55%]">
                        <h2 className="text-2xl md:text-4xl mt-4 font-bold text-green-900 leading-tight">
                            IHWE 2026

                        </h2>
                        <h2 className="text-2xl md:text-6xl font-bold text-green-900 leading-tight">
                            BUYER–SELLER <br />
                            <span style={{ color: '#739b20' }}>MEET 2026</span>
                        </h2>

                        <p className="mt-4 text-sm md:text-xl text-green-800 font-base">
                            CONNECTING BRANDS WITH VERIFIED BUYERS <br />
                            FOR REAL BUSINESS GROWTH
                        </p>

                        <p className="mt-4 text-gray-700 text-sm md:text-sm leading-relaxed">
                            International Health & Wellness Expo 2026 brings a curated B2B networking platform where manufacturers, brands,
                            distributors and institutional buyers meet for meaningful collaborations, market expansion and faster deal closures.
                        </p>

                        {/* BUTTONS */}
                        <div className="flex gap-6 mt-6">
                            <button
                                onClick={() => navigate('/buyer-registration')}
                                className="text-sm bg-green-800 text-white flex items-center gap-2 px-5 py-1.5 rounded-lg font-normal shadow hover:bg-green-900 transition"
                            >
                                <FaUserTie className="text-lg" />
                                REGISTER AS BUYER
                            </button>
                            <button
                                onClick={() => navigate('/exhibitor-login')}
                                className="text-sm bg-yellow-600 text-white flex items-center gap-2 px-5 py-1.5 rounded-lg font-normal shadow hover:bg-yellow-700 transition"
                            >
                                <FaStore className="text-lg" />
                                REGISTER AS SELLER
                            </button>
                        </div>

                        <div className="inline-flex items-stretch overflow-hidden rounded-xl mt-6"
                            style={{ background: "#edf2e4", border: "1.5px solid #c8d8b0" }}>

                            <div className="flex items-center gap-3 px-10 py-2"
                                style={{ fontSize: "15px", fontWeight: 500, color: "#1a3d20", textTransform: "uppercase", whiteSpace: "nowrap" }}>

                                <FaCalendarAlt size={20} color="#1a3d20" />
                                21 - 23 AUGUST 2026
                            </div>

                            <div style={{ width: "1.5px", background: "#c0d4a8", margin: "10px 0" }} />

                            <div className="flex items-center gap-3 px-10 py-2 "
                                style={{ fontSize: "15px", fontWeight: 500, color: "#1a3d20", textTransform: "uppercase" }}>

                                <FaMapMarkerAlt size={20} color="#1a3d20" />
                                <span>PRAGATI MAIDAN, NEW DELHI, INDIA</span>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT SIDE EMPTY (optional ya kuch aur add kar sakte ho) */}
                    <div className="relative w-[45%]">
                        {/* Base Image */}
                        <img src="/bsmeet/bsmeetRight3.png" alt="Buyer Seller Meet" className="mix-blend-multiply bg-transparent object-contain w-full h-auto" />
                        {/* Overlapping WhatsApp Button Image */}
                        <a
                            href="https://wa.me/919220408160"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="absolute bottom-4 right-60 z-10 cursor-pointer hover:scale-110 transition-transform duration-300 drop-shadow-xl hover:drop-shadow-2xl"
                        >
                            <img src="/bsmeet/bsherob.png" alt="WhatsApp Chat" className="w-24 h-24 object-contain" />
                        </a>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default BSMeetHero