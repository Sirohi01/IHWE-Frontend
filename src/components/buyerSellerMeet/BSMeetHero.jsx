const BSMeetHero = () => {
    return (
        <div
            className="w-full h-[700] bg-cover relative bg-no-repeat bg-contain bg-center"
            style={{
                backgroundImage: "url('/bsmeet/bg.png')"
            }}
        >
            {/* DARK OVERLAY (text readable banane ke liye) */}
            <div className="absolute inset-0"></div>

            <div className="relative z-10 py-8 px-6 md:px-16">
                <div className="grid md:grid-cols-2 gap-10 items-center">

                    {/* LEFT CONTENT */}
                    <div>
                        <h1 className="text-3xl md:text-6xl font-bold text-green-900 leading-tight">
                            BUYER–SELLER <br />
                            <span style={{ color: '#739b20' }}>MEET 2026</span>
                        </h1>

                        <p className="mt-4 text-xl text-green-800 font-semibold">
                            CONNECTING BRANDS WITH VERIFIED BUYERS <br />
                            FOR REAL BUSINESS GROWTH
                        </p>

                        <p className="mt-4 text-gray-700 text-sm md:text-lg leading-relaxed">
                            International Health & Wellness Expo 2026 brings a curated B2B networking platform where manufacturers, brands,
                            distributors and institutional buyers meet for meaningful collaborations, market expansion and faster deal closures.
                        </p>

                        {/* BUTTONS */}
                        <div className="flex gap-4 mt-6">
                            <button className="bg-green-800 text-white px-5 py-3 rounded-lg font-medium shadow hover:bg-green-900 transition">
                                REGISTER AS BUYER
                            </button>
                            <button className="bg-yellow-500 text-white px-5 py-3 rounded-lg font-medium shadow hover:bg-yellow-600 transition">
                                REGISTER AS SELLER
                            </button>
                        </div>

                        {/* DATE + LOCATION */}
                        {/* <div className="flex flex-col bg-gray-200 md:flex-row gap-6 mt-8 text-gray-700 text-sm md:text-lg">
                            <div className="flex items-center gap-2">
                                📅 <span>26 – 29 MARCH 2026</span>
                            </div>
                            <div className="flex items-center gap-2">
                                📍 <span>PRAGATI MAIDAN, NEW DELHI, INDIA</span>
                            </div>
                        </div> */}
                        <div className="inline-flex items-stretch overflow-hidden rounded-xl mt-8"
                            style={{ background: "#edf2e4", border: "1.5px solid #c8d8b0" }}>

                            {/* DATE */}
                            <div className="flex items-center gap-3 px-10 py-3"
                                style={{ fontSize: "15px", fontWeight: 800, color: "#1a3d20", textTransform: "uppercase", whiteSpace: "nowrap" }}>

                                {/* Calendar SVG */}
                                <svg width="26" height="26" viewBox="0 0 28 28" fill="none">
                                    <rect x="2" y="4" width="24" height="22" rx="3" fill="#1a3d20" />
                                    <rect x="3" y="10" width="22" height="15" rx="2" fill="#1a3d20" />
                                    <rect x="6" y="14" width="3" height="3" rx="0.5" fill="#edf2e4" />
                                    <rect x="11" y="14" width="3" height="3" rx="0.5" fill="#edf2e4" />
                                    <rect x="16" y="14" width="3" height="3" rx="0.5" fill="#edf2e4" />
                                    <rect x="21" y="14" width="3" height="3" rx="0.5" fill="#edf2e4" />
                                    <rect x="6" y="19" width="3" height="3" rx="0.5" fill="#edf2e4" />
                                    <rect x="11" y="19" width="3" height="3" rx="0.5" fill="#edf2e4" />
                                    <rect x="16" y="19" width="3" height="3" rx="0.5" fill="#edf2e4" />
                                    <rect x="8" y="2" width="3" height="5" rx="1.5" fill="#1a3d20" />
                                    <rect x="17" y="2" width="3" height="5" rx="1.5" fill="#1a3d20" />
                                </svg>
                                26 – 29 MARCH 2026
                            </div>

                            {/* Separator */}
                            <div style={{ width: "1.5px", background: "#c0d4a8", margin: "10px 0" }} />

                            {/* LOCATION */}
                            <div className="flex items-center gap-3 px-10 py-3"
                                style={{ fontSize: "15px", fontWeight: 800, color: "#1a3d20", textTransform: "uppercase" }}>

                                {/* Pin SVG */}
                                <svg width="22" height="28" viewBox="0 0 24 28" fill="none">
                                    <path d="M12 2C7.03 2 3 6.03 3 11c0 6.5 9 16 9 16s9-9.5 9-16c0-4.97-4.03-9-9-9z" fill="#1a3d20" />
                                    <circle cx="12" cy="11" r="3.5" fill="#edf2e4" />
                                    <ellipse cx="12" cy="27" rx="5" ry="1.5" fill="#1a3d20" opacity="0.18" />
                                </svg>
                                <span>PRAGATI MAIDAN,<br />NEW DELHI, INDIA</span>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT SIDE EMPTY (optional ya kuch aur add kar sakte ho) */}
                    <div>
                        <img src="/bsmeet/bsmeetRight.png" alt="" />
                    </div>

                </div>
            </div>
        </div>
    )
}

export default BSMeetHero