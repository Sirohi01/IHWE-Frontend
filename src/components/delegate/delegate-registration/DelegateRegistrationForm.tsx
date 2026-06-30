import React from "react";
import { Link } from "react-router-dom";
import { Checkbox } from "@/components/ui/checkbox";

interface DelegateRegistrationFormProps {
  onSubmit: (e: React.FormEvent) => void;
}

const DelegateRegistrationForm: React.FC<DelegateRegistrationFormProps> = ({ onSubmit }) => {
  return (
    <div className="w-full bg-white rounded-2xl p-6 lg:p-10 shadow-sm border border-gray-100">
      <h2 className="text-2xl font-medium text-[#1a5c1a] mb-2">Delegate Registration Details</h2>
      <div className="w-9 h-[2px] bg-[#1a5c1a] mb-3" />
      <p className="text-sm text-gray-500 mb-7">Please fill in the details below to complete your registration.</p>

      <form onSubmit={onSubmit}>
        {/* Row 1: Title + Full Name + Email Address */}
        <div className="flex flex-col md:flex-row gap-5 mb-5">
            <div className="flex flex-col gap-1.5 w-full md:w-28 flex-shrink-0">
                <label className="text-sm font-medium text-gray-800">Title <span className="text-red-500">*</span></label>
                <select required className="border border-gray-300 rounded-md px-3 py-1.5 text-sm text-gray-600 focus:outline-none focus:border-[#1a5c1a]">
                    <option value="">Select</option>
                    <option>Mr.</option>
                    <option>Ms.</option>
                    <option>Dr.</option>
                    <option>Prof.</option>
                </select>
            </div>
            <div className="flex flex-col gap-1.5 flex-1">
                <label className="text-sm font-medium text-gray-800">Full Name <span className="text-red-500">*</span></label>
                <input required type="text" placeholder="Enter your full name"
                    className="border border-gray-300 rounded-md px-3 py-1.5 text-sm focus:outline-none focus:border-[#1a5c1a]" />
            </div>
            <div className="flex flex-col gap-1.5 flex-1">
                <label className="text-sm font-medium text-gray-800">Email Address <span className="text-red-500">*</span></label>
                <input required type="email" placeholder="Enter your email address"
                    className="border border-gray-300 rounded-md px-3 py-1.5 text-sm focus:outline-none focus:border-[#1a5c1a]" />
            </div>
        </div>

        {/* Row 2: Designation + Organization Name */}
        <div className="flex flex-col md:flex-row gap-5 mb-5">
            <div className="flex flex-col gap-1.5 flex-1">
                <label className="text-sm font-medium text-gray-800">Designation <span className="text-red-500">*</span></label>
                <input required type="text" placeholder="Enter your designation"
                    className="border border-gray-300 rounded-md px-3 py-1.5 text-sm focus:outline-none focus:border-[#1a5c1a]" />
            </div>
            <div className="flex flex-col gap-1.5 flex-1">
                <label className="text-sm font-medium text-gray-800">Organization Name <span className="text-red-500">*</span></label>
                <input required type="text" placeholder="Enter your organization name"
                    className="border border-gray-300 rounded-md px-3 py-1.5 text-sm focus:outline-none focus:border-[#1a5c1a]" />
            </div>
        </div>

        {/* Row 3: Mobile Number + Alternative Phone Number */}
        <div className="flex flex-col md:flex-row gap-5 mb-5">
            <div className="flex flex-col gap-1.5 flex-1">
                <label className="text-sm font-medium text-gray-800">Mobile Number <span className="text-red-500">*</span></label>
                <div className="flex">
                    <span className="inline-flex items-center px-3 border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm rounded-l-md">
                        +91
                    </span>
                    <input required type="tel" placeholder="Enter your mobile number"
                        className="flex-1 border border-gray-300 rounded-r-md px-3 py-1.5 text-sm focus:outline-none focus:border-[#1a5c1a]" />
                </div>
            </div>
            <div className="flex flex-col gap-1.5 flex-1">
                <label className="text-sm font-medium text-gray-800">Alternative Phone Number</label>
                <div className="flex">
                    <span className="inline-flex items-center px-3 border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm rounded-l-md">
                        +91
                    </span>
                    <input type="tel" placeholder="Enter alternative phone number"
                        className="flex-1 border border-gray-300 rounded-r-md px-3 py-1.5 text-sm focus:outline-none focus:border-[#1a5c1a]" />
                </div>
            </div>
        </div>

        {/* Row 4: Address */}
        <div className="flex flex-col gap-1.5 mb-5">
            <label className="text-sm font-medium text-gray-800">Address <span className="text-red-500">*</span></label>
            <textarea required rows={3} placeholder="Enter your complete address"
                className="border border-gray-300 rounded-md px-3 py-1.5 text-sm focus:outline-none focus:border-[#1a5c1a] resize-none"></textarea>
        </div>

        {/* Row 5: Country + City */}
        <div className="flex flex-col md:flex-row gap-5 mb-5">
            <div className="flex flex-col gap-1.5 flex-1">
                <label className="text-sm font-medium text-gray-800">Country <span className="text-red-500">*</span></label>
                <select required className="border border-gray-300 rounded-md px-3 py-1.5 text-sm focus:outline-none focus:border-[#1a5c1a]">
                    <option value="">Select country</option>
                    <option>India</option>
                </select>
            </div>
            <div className="flex flex-col gap-1.5 flex-1">
                <label className="text-sm font-medium text-gray-800">City <span className="text-red-500">*</span></label>
                <input required type="text" placeholder="Enter your city"
                    className="border border-gray-300 rounded-md px-3 py-1.5 text-sm focus:outline-none focus:border-[#1a5c1a]" />
            </div>
        </div>

        {/* Row 6: Industry + Areas of Interest */}
        <div className="flex flex-col md:flex-row gap-5 mb-5">
            <div className="flex flex-col gap-1.5 flex-1">
                <label className="text-sm font-medium text-gray-800">Industry Type <span className="text-red-500">*</span></label>
                <select required className="border border-gray-300 rounded-md px-3 py-1.5 text-sm focus:outline-none focus:border-[#1a5c1a]">
                    <option value="">Select industry</option>
                    <option value="healthcare">Healthcare</option>
                    <option value="wellness">Wellness</option>
                    <option value="pharma">Pharmaceuticals</option>
                </select>
            </div>
            <div className="flex flex-col gap-1.5 flex-1">
                <label className="text-sm font-medium text-gray-800">Areas of Interest <span className="text-red-500">*</span></label>
                <select required className="border border-gray-300 rounded-md px-3 py-1.5 text-sm focus:outline-none focus:border-[#1a5c1a]">
                    <option value="">Select your area of interest</option>
                    <option value="networking">Networking</option>
                    <option value="exhibitions">Exhibitions</option>
                    <option value="conferences">Conferences</option>
                </select>
            </div>
        </div>

        {/* Checkboxes */}
        <div className="w-full space-y-2 mt-6">
            <label className="flex items-start gap-3 p-3 bg-slate-50 border border-slate-200 rounded-sm cursor-pointer group hover:bg-slate-100 transition-all">
                <Checkbox required className="mt-0.5 border-slate-400 peer-checked:bg-[#23471d]" />
                <span className="text-[11px] font-medium text-slate-600 group-hover:text-slate-900 transition-colors leading-relaxed">
                    I hereby confirm that the information provided is accurate. I have read and agree to the  <Link to={`/terms-of-service?page=exhibitor-registration`} className="text-blue-600 font-bold hover:underline" target="_blank">Terms & Conditions</Link> and the exhibition policy for IHWE Stand Booking.
                </span>
            </label>
            <label className="flex items-start gap-3 p-3 bg-slate-50 border border-slate-200 rounded-sm cursor-pointer group hover:bg-slate-100 transition-all">
                <Checkbox required className="mt-0.5 border-slate-400 peer-checked:bg-[#23471d]" />
                <span className="text-[11px] font-medium text-slate-600 group-hover:text-slate-900 transition-colors leading-relaxed">
                    I have read and agree to the <Link to="/refund-policy" className="text-blue-600 font-bold hover:underline" target="_blank">Refund & Cancellation Policy</Link> for IHWE Stand Booking.
                </span>
            </label>
        </div>

        {/* Buttons */}
        <button type="submit" className="w-full mt-6 bg-[#1a5c1a] text-white font-medium py-3 rounded-lg text-sm hover:bg-[#145014] transition-colors shadow-md hover:shadow-lg">
            Submit Registration
        </button>
      </form>
    </div>
  );
};

export default DelegateRegistrationForm;
