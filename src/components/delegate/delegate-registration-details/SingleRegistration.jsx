import React from "react";
import SectionContainer from "@/components/layout/SectionContainer";
import { Calendar, MapPin, Users, Lightbulb, BookOpen, TrendingUp, Mail, Lock } from "lucide-react";
import leftImg from "@/assets/deligateimage/left.png";
import BottomData from "./BottomData";

const SingleRegistration = () => {
    return (
        <div className="bg-[#FAFBF6]">
            <SectionContainer>
                <div className="flex w-full flex-col lg:flex-row gap-6 py-6">

                    {/* ===== LEFT PANEL ===== */}
                    <div className="w-[35%] flex-shrink-0 flex flex-col">
                        <p className="text-sm font-semibold text-gray-700 mb-1">Join the Global Movement for a</p>
                        <h1 className="text-4xl font-medium text-[#1a5c1a] leading-tight mb-2">
                            Healthier<br />Tomorrow
                        </h1>
                        <div className="w-10 h-[3px] bg-[#1a5c1a] mb-2" />
                        <p className="text-sm text-gray-500 mb-7 leading-relaxed">
                            Be part of Asia's premier platform for<br />
                            Health, Wellness, Innovation & Collaboration.
                        </p>

                        <div className="flex flex-row  gap-4 mb-4">
                            {/* Date */}
                            <div className="flex items-start gap-4 ">
                                <div className="w-9 h-9 border border-[#1a5c1a] rounded-xl flex items-center justify-center flex-shrink-0">
                                    <Calendar size={18} className="text-[#1a5c1a]" />
                                </div>
                                <div>
                                    <p className="font-semibold text-sm text-[#1a5c1a] ">18 – 20 JUNE 2026</p>
                                    <p className="text-sm  font-medium text-[#1a5c1a]">Thursday – Saturday</p>
                                </div>
                            </div>

                            {/* Location */}
                            <div className="flex items-start gap-4 ">
                                <div className="w-9 h-9 border border-[#1a5c1a] rounded-xl flex items-center justify-center flex-shrink-0">
                                    <MapPin size={18} className="text-[#1a5c1a]" />
                                </div>
                                <div>
                                    <p className="font-semibold text-sm text-[#1a5c1a]">PRAGATI MAIDAN,</p>
                                    <p className="font-semibold text-sm text-[#1a5c1a]">NEW DELHI, INDIA</p>
                                </div>
                            </div>
                        </div>


                        {/* Illustration */}
                        {/* bg-gradient-to-br from-[#e8f5e8] to-[#c8e6c8] rounded-2xl */}
                        <div className=" flex items-end justify-start overflow-hidden">
                            {/* Add your illustration image here */}
                            <img src={leftImg} alt="IHWE" className="h-full object-contain" />
                        </div>

                        {/* Why Attend */}
                        <div className="bg-white rounded-2xl p-5 shadow-sm">
                            <h3 className="text-[#1a5c1a] font-bold text-base mb-4">Why Attend IHWE 2026?</h3>

                            {[
                                { icon: <Users size={18} className="text-[#1a5c1a]" />, title: "Connect", desc: "Network with global leaders, experts & professionals" },
                                { icon: <Lightbulb size={18} className="text-[#1a5c1a]" />, title: "Discover", desc: "Explore the latest products, technologies & innovations" },
                                { icon: <BookOpen size={18} className="text-[#1a5c1a]" />, title: "Learn", desc: "Gain insights from world-class conferences & workshops" },
                                { icon: <TrendingUp size={18} className="text-[#1a5c1a]" />, title: "Grow", desc: "Expand your knowledge, business & opportunities" },
                            ].map((item) => (
                                <div key={item.title} className="flex gap-3 mb-4 items-start">
                                    <div className="w-9 h-9 bg-[#f0f7f0] rounded-lg flex items-center justify-center flex-shrink-0">
                                        {item.icon}
                                    </div>
                                    <div>
                                        <p className="text-[#1a5c1a] font-bold text-sm">{item.title}</p>
                                        <p className="text-gray-500 text-xs leading-snug">{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* ===== RIGHT FORM PANEL ===== */}
                    <div className="flex-1 w-[65%] bg-white rounded-2xl p-10 shadow-md">
                        <h2 className="text-2xl font-medium text-[#1a5c1a] mb-2">Delegate Registration</h2>
                        <div className="w-9 h-[2px] bg-[#1a5c1a] mb-3" />
                        <p className="text-sm text-gray-500 mb-7">Please fill in the details below to register as a delegate.</p>

                        {/* Row 1: Title + Full Name + Email Address */}
                        <div className="flex gap-5 mb-5">
                            {/* Title */}
                            <div className="flex flex-col gap-1.5 w-28 flex-shrink-0">
                                <label className="text-sm font-medium text-gray-800">Title <span className="text-red-500">*</span></label>
                                <select className="border border-gray-300 rounded-md px-3 py-1.5 text-sm text-gray-600 focus:outline-none focus:border-[#1a5c1a]">
                                    <option value="">Select</option>
                                    <option>Mr.</option>
                                    <option>Ms.</option>
                                    <option>Dr.</option>
                                    <option>Prof.</option>
                                </select>
                            </div>
                            {/* Full Name */}
                            <div className="flex flex-col gap-1.5 flex-1">
                                <label className="text-sm font-medium text-gray-800">Full Name <span className="text-red-500">*</span></label>
                                <input type="text" placeholder="Enter your full name"
                                    className="border border-gray-300 rounded-md px-3 py-1.5 text-sm focus:outline-none focus:border-[#1a5c1a] w-full" />
                            </div>
                            {/* Email Address */}
                            <div className="flex flex-col gap-1.5 flex-1">
                                <label className="text-sm font-medium text-gray-800">Email Address <span className="text-red-500">*</span></label>
                                <input type="email" placeholder="Enter your email address"
                                    className="border border-gray-300 rounded-md px-3 py-1.5 text-sm focus:outline-none focus:border-[#1a5c1a] w-full" />
                            </div>
                        </div>

                        {/* Row 3: Mobile + WhatsApp */}
                        <div className="flex gap-5 mb-5">
                            {["Mobile Number *", "WhatsApp Number"].map((label, i) => (
                                <div key={i} className="flex flex-col gap-1.5 flex-1">
                                    <label className="text-sm font-medium text-gray-800">
                                        {label.replace(" *", "")} {i === 0 && <span className="text-red-500">*</span>}
                                    </label>
                                    <div className="flex">
                                        <select className="border border-gray-300 border-r-0 rounded-l-md px-2 py-1.5 text-sm bg-white focus:outline-none">
                                            <option>🇮🇳 +91</option>
                                        </select>
                                        <input type="tel" placeholder={i === 0 ? "Enter mobile number" : "Enter WhatsApp number"}
                                            className="border border-gray-300 rounded-r-md px-3 py-1.5 text-sm flex-1 focus:outline-none focus:border-[#1a5c1a]" />
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Row 4: Designation + Organization */}
                        <div className="flex gap-5 mb-5">
                            <div className="flex flex-col gap-1.5 flex-1">
                                <label className="text-sm font-medium text-gray-800">Designation <span className="text-red-500">*</span></label>
                                <input type="text" placeholder="Enter your designation"
                                    className="border border-gray-300 rounded-md px-3 py-1.5 text-sm focus:outline-none focus:border-[#1a5c1a]" />
                            </div>
                            <div className="flex flex-col gap-1.5 flex-1">
                                <label className="text-sm font-medium text-gray-800">Organization / Company <span className="text-red-500">*</span></label>
                                <input type="text" placeholder="Enter organization / company"
                                    className="border border-gray-300 rounded-md px-3 py-1.5 text-sm focus:outline-none focus:border-[#1a5c1a]" />
                            </div>
                        </div>

                        {/* Row 5: Country + City */}
                        <div className="flex gap-5 mb-5">
                            <div className="flex flex-col gap-1.5 flex-1">
                                <label className="text-sm font-medium text-gray-800">Country <span className="text-red-500">*</span></label>
                                <select className="border border-gray-300 rounded-md px-3 py-1.5 text-sm focus:outline-none focus:border-[#1a5c1a]">
                                    <option value="">Select country</option>
                                    <option>India</option>
                                </select>
                            </div>
                            <div className="flex flex-col gap-1.5 flex-1">
                                <label className="text-sm font-medium text-gray-800">City <span className="text-red-500">*</span></label>
                                <input type="text" placeholder="Enter your city"
                                    className="border border-gray-300 rounded-md px-3 py-1.5 text-sm focus:outline-none focus:border-[#1a5c1a]" />
                            </div>
                        </div>

                        {/* Row 6: Industry + Areas of Interest */}
                        <div className="flex gap-5 mb-5">
                            <div className="flex flex-col gap-1.5 flex-1">
                                <label className="text-sm font-medium text-gray-800">Industry Type <span className="text-red-500">*</span></label>
                                <select className="border border-gray-300 rounded-md px-3 py-1.5 text-sm focus:outline-none focus:border-[#1a5c1a]">
                                    <option value="">Select industry</option>
                                </select>
                            </div>
                            <div className="flex flex-col gap-1.5 flex-1">
                                <label className="text-sm font-medium text-gray-800">Areas of Interest <span className="text-red-500">*</span></label>
                                <select className="border border-gray-300 rounded-md px-3 py-1.5 text-sm focus:outline-none focus:border-[#1a5c1a]">
                                    <option value="">Select your area of interest</option>
                                </select>
                            </div>
                        </div>

                        {/* Row 7: How did you hear */}
                        <div className="flex flex-col gap-1.5 mb-5">
                            <label className="text-sm font-medium text-gray-800">How did you hear about IHWE 2026? <span className="text-red-500">*</span></label>
                            <select className="border border-gray-300 rounded-md px-3 py-1.5 text-sm w-full focus:outline-none focus:border-[#1a5c1a]">
                                <option value="">Select an option</option>
                                <option>Social Media</option>
                                <option>Email</option>
                                <option>Friend/Colleague</option>
                                <option>Website</option>
                            </select>
                        </div>

                        {/* Checkbox */}
                        <div className="flex items-center gap-2 mb-5">
                            <input type="checkbox" id="terms" className="w-4 h-4 accent-[#1a5c1a]" />
                            <label htmlFor="terms" className="text-sm text-gray-600">
                                I agree to the{" "}
                                <a href="#" className="text-[#1a5c1a] underline">Terms & Conditions</a>
                                {" "}and{" "}
                                <a href="#" className="text-[#1a5c1a] underline">Privacy Policy</a>.{" "}
                                <span className="text-red-500">*</span>
                            </label>
                        </div>

                        {/* Buttons */}
                        <button className="w-full mt-4 bg-[#1a5c1a] text-white font-medium py-2 rounded-lg text-base hover:bg-[#145014] transition-colors">
                            Register Now
                        </button>
                    </div>

                </div>

                {/* bottom data */}
                <BottomData />
            </SectionContainer>
        </div>
    );
};

export default SingleRegistration;