import React, { useState } from "react";
import SectionContainer from "@/components/layout/SectionContainer";
import { Plus, Trash2 } from "lucide-react";
import BottomData from "./BottomData";

const emptyMember = () => ({
    title: "",
    fullName: "",
    email: "",
    mobile: "",
    whatsapp: "",
    designation: "",
});

const GroupRegistration = () => {
    const [members, setMembers] = useState(Array.from({ length: 5 }, emptyMember));

    const handleMemberChange = (index, field, value) => {
        setMembers((prev) =>
            prev.map((m, i) => (i === index ? { ...m, [field]: value } : m))
        );
    };

    const addMember = () => setMembers((prev) => [...prev, emptyMember()]);

    const removeMember = (index) => {
        if (members.length <= 5) return; // minimum 5 members
        setMembers((prev) => prev.filter((_, i) => i !== index));
    };

    return (
        <div className="bg-[#FAFBF6]">
            <SectionContainer>
                <div className="py-4">
                    {/* ===== FORM PANEL ===== */}
                    <div className="w-full bg-white rounded-2xl p-8 shadow-md">

                        {/* Header */}
                        <div className="flex flex-col md:flex-row md:items-end  gap-2 md:gap-4 mb-2">
                            <h2 className="text-2xl font-medium text-[#1a5c1a]">Group Delegate Registration</h2>
                            <p className="text-sm text-gray-500 md:mb-1">
                                Please fill in the details for each delegate. Minimum 5 members required.
                            </p>
                        </div>
                        <div className="w-9 h-[2px] bg-[#1a5c1a] mb-4" />

                        {/* ===== MEMBERS TABLE ===== */}
                        <div className="mb-2">
                            <div className="flex items-center justify-between mb-1">
                                <h3 className="text-base font-semibold text-[#1a5c1a]">
                                    Member Details
                                    <span className="ml-2 text-xs font-normal bg-[#EBF5EC] text-[#113F16] border border-[#c5e0c6] px-2 py-0.5 rounded-full">
                                        {members.length} Members
                                    </span>
                                </h3>
                                <button
                                    onClick={addMember}
                                    className="flex items-center gap-1.5 text-sm font-medium text-[#1a5c1a] border border-[#1a5c1a] px-3 py-1.5 rounded-lg hover:bg-[#f0f7f0] transition-colors"
                                >
                                    <Plus size={15} /> Add Member
                                </button>
                            </div>

                            {/* Table */}
                            <div className="overflow-x-auto rounded-xl border border-gray-200">
                                <table className="w-full text-sm border-collapse">
                                    <thead>
                                        <tr className="bg-[#f5faf5] border-b border-gray-200">
                                            <th className="text-left px-3 py-3 text-xs font-semibold text-gray-500 w-8">#</th>
                                            <th className="text-left px-3 py-3 text-xs font-semibold text-gray-500 w-24">
                                                Title <span className="text-red-500">*</span>
                                            </th>
                                            <th className="text-left px-3 py-3 text-xs font-semibold text-gray-500 min-w-[160px]">
                                                Full Name <span className="text-red-500">*</span>
                                            </th>
                                            <th className="text-left px-3 py-3 text-xs font-semibold text-gray-500 min-w-[190px]">
                                                Email Address <span className="text-red-500">*</span>
                                            </th>
                                            <th className="text-left px-3 py-3 text-xs font-semibold text-gray-500 min-w-[150px]">
                                                Mobile No. <span className="text-red-500">*</span>
                                            </th>
                                            <th className="text-left px-3 py-3 text-xs font-semibold text-gray-500 min-w-[150px]">
                                                WhatsApp No.
                                            </th>
                                            <th className="text-left px-3 py-3 text-xs font-semibold text-gray-500 min-w-[150px]">
                                                Designation <span className="text-red-500">*</span>
                                            </th>
                                            <th className="px-3 py-3 w-10"></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {members.map((member, index) => (
                                            <tr
                                                key={index}
                                                className={`border-b border-gray-100 ${index % 2 === 0 ? "bg-white" : "bg-[#fafff9]"}`}
                                            >
                                                {/* Row number */}
                                                <td className="px-3 py-2 text-xs text-gray-400 font-medium">{index + 1}</td>

                                                {/* Title */}
                                                <td className="px-2 py-2">
                                                    <select
                                                        value={member.title}
                                                        onChange={(e) => handleMemberChange(index, "title", e.target.value)}
                                                        className="w-full border border-gray-200 rounded-md px-2 py-1.5 text-sm text-gray-700 focus:outline-none focus:border-[#1a5c1a] bg-white"
                                                    >
                                                        <option value="">Select</option>
                                                        <option>Mr.</option>
                                                        <option>Ms.</option>
                                                        <option>Dr.</option>
                                                        <option>Prof.</option>
                                                    </select>
                                                </td>

                                                {/* Full Name */}
                                                <td className="px-2 py-2">
                                                    <input
                                                        type="text"
                                                        placeholder="Full name"
                                                        value={member.fullName}
                                                        onChange={(e) => handleMemberChange(index, "fullName", e.target.value)}
                                                        className="w-full border border-gray-200 rounded-md px-2 py-1.5 text-sm focus:outline-none focus:border-[#1a5c1a]"
                                                    />
                                                </td>

                                                {/* Email */}
                                                <td className="px-2 py-2">
                                                    <input
                                                        type="email"
                                                        placeholder="Email address"
                                                        value={member.email}
                                                        onChange={(e) => handleMemberChange(index, "email", e.target.value)}
                                                        className="w-full border border-gray-200 rounded-md px-2 py-1.5 text-sm focus:outline-none focus:border-[#1a5c1a]"
                                                    />
                                                </td>

                                                {/* Mobile */}
                                                <td className="px-2 py-2">
                                                    <div className="flex">
                                                        <span className="border border-gray-200 border-r-0 rounded-l-md px-2 py-1.5 text-xs bg-gray-50 text-gray-500 flex items-center">+91</span>
                                                        <input
                                                            type="tel"
                                                            placeholder="Mobile"
                                                            value={member.mobile}
                                                            onChange={(e) => handleMemberChange(index, "mobile", e.target.value)}
                                                            className="w-full border border-gray-200 rounded-r-md px-2 py-1.5 text-sm focus:outline-none focus:border-[#1a5c1a]"
                                                        />
                                                    </div>
                                                </td>

                                                {/* WhatsApp */}
                                                <td className="px-2 py-2">
                                                    <div className="flex">
                                                        <span className="border border-gray-200 border-r-0 rounded-l-md px-2 py-1.5 text-xs bg-gray-50 text-gray-500 flex items-center">+91</span>
                                                        <input
                                                            type="tel"
                                                            placeholder="WhatsApp"
                                                            value={member.whatsapp}
                                                            onChange={(e) => handleMemberChange(index, "whatsapp", e.target.value)}
                                                            className="w-full border border-gray-200 rounded-r-md px-2 py-1.5 text-sm focus:outline-none focus:border-[#1a5c1a]"
                                                        />
                                                    </div>
                                                </td>

                                                {/* Designation */}
                                                <td className="px-2 py-2">
                                                    <input
                                                        type="text"
                                                        placeholder="Designation"
                                                        value={member.designation}
                                                        onChange={(e) => handleMemberChange(index, "designation", e.target.value)}
                                                        className="w-full border border-gray-200 rounded-md px-2 py-1.5 text-sm focus:outline-none focus:border-[#1a5c1a]"
                                                    />
                                                </td>

                                                {/* Delete */}
                                                <td className="px-2 py-2 text-center">
                                                    <button
                                                        onClick={() => removeMember(index)}
                                                        disabled={members.length <= 5}
                                                        className={`p-1.5 rounded-lg transition-colors ${members.length <= 5
                                                            ? "text-gray-200 cursor-not-allowed"
                                                            : "text-red-400 hover:bg-red-50 hover:text-red-600"
                                                            }`}
                                                    >
                                                        <Trash2 size={14} />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* ===== COMMON FIELDS BELOW ===== */}
                        <div className="border-t border-gray-100 pt-1">
                            <h3 className="text-base font-semibold text-[#1a5c1a] mb-2">Group / Organization Details</h3>

                            {/* Organization + Country */}
                            <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-5 mb-4">
                                <div className="flex flex-col gap-1.5 flex-1">
                                    <label className="text-sm font-medium text-gray-800">Organization / Company <span className="text-red-500">*</span></label>
                                    <input type="text" placeholder="Enter organization / company"
                                        className="border border-gray-300 rounded-md px-3 py-1.5 text-sm focus:outline-none focus:border-[#1a5c1a]" />
                                </div>
                                <div className="flex flex-col gap-1.5 flex-1">
                                    <label className="text-sm font-medium text-gray-800">Country <span className="text-red-500">*</span></label>
                                    <select className="border border-gray-300 rounded-md px-3 py-1.5 text-sm focus:outline-none focus:border-[#1a5c1a]">
                                        <option value="">Select country</option>
                                        <option>India</option>
                                    </select>
                                </div>
                                <div className="flex flex-col gap-1.5 flex-1">
                                    <label className="text-sm font-medium text-gray-800">City <span className="text-red-500">*</span></label>
                                    <input type="text" placeholder="Enter city"
                                        className="border border-gray-300 rounded-md px-3 py-1.5 text-sm focus:outline-none focus:border-[#1a5c1a]" />
                                </div>
                                <div className="flex flex-col gap-1.5 flex-1">
                                    <label className="text-sm font-medium text-gray-800">Industry Type <span className="text-red-500">*</span></label>
                                    <select className="border border-gray-300 rounded-md px-3 py-1.5 text-sm focus:outline-none focus:border-[#1a5c1a]">
                                        <option value="">Select industry</option>
                                    </select>
                                </div>
                                <div className="flex flex-col gap-1.5 flex-1">
                                    <label className="text-sm font-medium text-gray-800">Areas of Interest <span className="text-red-500">*</span></label>
                                    <select className="border border-gray-300 rounded-md px-3 py-1.5 text-sm focus:outline-none focus:border-[#1a5c1a]">
                                        <option value="">Select area of interest</option>
                                    </select>
                                </div>
                                <div className="flex flex-col gap-1.5 flex-1">
                                    <label className="text-sm font-medium text-gray-800">How did you hear about IHWE 2026? <span className="text-red-500">*</span></label>
                                    <select className="border border-gray-300 rounded-md px-3 py-1.5 text-sm focus:outline-none focus:border-[#1a5c1a]">
                                        <option value="">Select an option</option>
                                        <option>Social Media</option>
                                        <option>Email</option>
                                        <option>Friend/Colleague</option>
                                        <option>Website</option>
                                    </select>
                                </div>
                            </div>

                            {/* Terms */}
                            <div className="flex items-center gap-2 mb-2 mt-2">
                                <input type="checkbox" id="terms" className="w-4 h-4 accent-[#1a5c1a]" />
                                <label htmlFor="terms" className="text-sm text-gray-600">
                                    I agree to the{" "}
                                    <a href="#" className="text-[#1a5c1a] underline">Terms & Conditions</a>
                                    {" "}and{" "}
                                    <a href="#" className="text-[#1a5c1a] underline">Privacy Policy</a>.{" "}
                                    <span className="text-red-500">*</span>
                                </label>
                            </div>

                            {/* Submit */}
                            <div className="flex justify-end mt-0">
                                <button className="bg-[#1a5c1a] text-white font-medium px-6 py-2 rounded-lg text-base hover:bg-[#145014] transition-colors">
                                    Register Group ({members.length} Members)
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Data */}
                <BottomData />
            </SectionContainer>
        </div>
    );
};

export default GroupRegistration;