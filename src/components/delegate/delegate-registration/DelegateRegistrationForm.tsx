import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Checkbox } from "@/components/ui/checkbox";
import { RefreshCw } from "lucide-react";

interface DelegateRegistrationFormProps {
    onSubmit: (e: React.FormEvent) => void;
    compact?: boolean;
    submitLabel?: string;
}

const DelegateRegistrationForm: React.FC<DelegateRegistrationFormProps> = ({
    onSubmit,
    compact = false,
    submitLabel = "Submit Registration"
}) => {
    const [pincode, setPincode] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [country, setCountry] = useState("India");
    const [loadingPincode, setLoadingPincode] = useState(false);
    
    const [termsAccepted, setTermsAccepted] = useState(false);
    const [refundAccepted, setRefundAccepted] = useState(false);

    const handlePincodeChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value.replace(/\D/g, '').slice(0, 6);
        setPincode(val);

        if (val.length === 6) {
            setLoadingPincode(true);
            try {
                const res = await axios.get(`https://api.postalpincode.in/pincode/${val}`);
                if (res.data && res.data[0].Status === "Success") {
                    const postOffice = res.data[0].PostOffice[0];
                    setCity(postOffice.District);
                    setState(postOffice.State);
                    setCountry(postOffice.Country);
                } else {
                    setCity("");
                    setState("");
                    setCountry("India");
                }
            } catch (error) {
                console.error("Error fetching pincode details", error);
            } finally {
                setLoadingPincode(false);
            }
        }
    };

    return (
        <div className={`w-full bg-white rounded-2xl ${compact ? "p-5" : "p-6 lg:p-10"} shadow-sm border border-gray-100`}>
            <h2 className={`${compact ? "text-xl" : "text-2xl"} font-medium text-[#1a5c1a] mb-2`}>Delegate Registration Details</h2>
            <div className="w-9 h-[2px] bg-[#1a5c1a] mb-3" />
            <p className="text-sm text-gray-500 mb-7">Please fill in the details below to complete your registration.</p>

            <form onSubmit={onSubmit}>
                {/* Row 1: Title + Full Name + Email Address */}
                <div className="flex flex-col md:flex-row gap-5 mb-5">
                    <div className="flex flex-col gap-1.5 w-full md:w-28 flex-shrink-0">
                        <label className="text-sm font-medium text-gray-800">Title <span className="text-red-500">*</span></label>
                        <select name="title" required className="border border-gray-300 rounded-md px-3 py-1.5 text-sm text-gray-600 focus:outline-none focus:border-[#1a5c1a]">
                            <option value="">Select</option>
                            <option value="Mr.">Mr.</option>
                            <option value="Ms.">Ms.</option>
                            <option value="Dr.">Dr.</option>
                            <option value="Prof.">Prof.</option>
                        </select>
                    </div>
                    <div className="flex flex-col gap-1.5 flex-1">
                        <label className="text-sm font-medium text-gray-800">Full Name <span className="text-red-500">*</span></label>
                        <input name="fullName" required type="text" placeholder="Enter your full name"
                            className="border border-gray-300 rounded-md px-3 py-1.5 text-sm focus:outline-none focus:border-[#1a5c1a]" />
                    </div>
                    <div className="flex flex-col gap-1.5 flex-1">
                        <label className="text-sm font-medium text-gray-800">Email Address <span className="text-red-500">*</span></label>
                        <input name="email" required type="email" placeholder="Enter your email address"
                            className="border border-gray-300 rounded-md px-3 py-1.5 text-sm focus:outline-none focus:border-[#1a5c1a]" />
                    </div>
                </div>

                {/* Profile Image Row */}
                <div className="flex flex-col gap-1.5 mb-5">
                    <label className="text-sm font-medium text-gray-800">Profile Image</label>
                    <input name="profileImage" type="file" accept="image/*"
                        className="border border-gray-300 rounded-md px-3 py-1.5 text-sm focus:outline-none focus:border-[#1a5c1a]" />
                    <p className="text-xs text-gray-400">Upload a professional photo for your delegate badge.</p>
                </div>

                {/* Row 2: Designation + Organization Name */}
                <div className="flex flex-col md:flex-row gap-5 mb-5">
                    <div className="flex flex-col gap-1.5 flex-1">
                        <label className="text-sm font-medium text-gray-800">Designation <span className="text-red-500">*</span></label>
                        <input name="designation" required type="text" placeholder="Enter your designation"
                            className="border border-gray-300 rounded-md px-3 py-1.5 text-sm focus:outline-none focus:border-[#1a5c1a]" />
                    </div>
                    <div className="flex flex-col gap-1.5 flex-1">
                        <label className="text-sm font-medium text-gray-800">Organization Name <span className="text-red-500">*</span></label>
                        <input name="organization" required type="text" placeholder="Enter your organization name"
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
                            <input name="mobile" required type="tel" placeholder="Enter your mobile number"
                                className="flex-1 border border-gray-300 rounded-r-md px-3 py-1.5 text-sm focus:outline-none focus:border-[#1a5c1a]" />
                        </div>
                    </div>
                    <div className="flex flex-col gap-1.5 flex-1">
                        <label className="text-sm font-medium text-gray-800">Alternative Phone Number</label>
                        <div className="flex">
                            <span className="inline-flex items-center px-3 border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm rounded-l-md">
                                +91
                            </span>
                            <input name="alternateMobile" type="tel" placeholder="Enter alternative phone number"
                                className="flex-1 border border-gray-300 rounded-r-md px-3 py-1.5 text-sm focus:outline-none focus:border-[#1a5c1a]" />
                        </div>
                    </div>
                </div>

                {/* Row 5: Pincode, Country, State, City */}
                <div className="flex flex-col md:flex-row gap-5 mb-5">
                    <div className="flex flex-col gap-1.5 flex-1 relative">
                        <label className="text-sm font-medium text-gray-800">Pincode <span className="text-red-500">*</span></label>
                        <div className="relative">
                            <input name="pincode" required type="text" placeholder="Enter 6-digit pincode"
                                value={pincode}
                                onChange={handlePincodeChange}
                                className="w-full border border-gray-300 rounded-md px-3 py-1.5 text-sm focus:outline-none focus:border-[#1a5c1a]" />
                            {loadingPincode && <RefreshCw size={14} className="absolute right-3 top-1/2 -translate-y-1/2 animate-spin text-gray-400" />}
                        </div>
                    </div>
                    <div className="flex flex-col gap-1.5 flex-1">
                        <label className="text-sm font-medium text-gray-800">Country <span className="text-red-500">*</span></label>
                        <input name="country" required type="text" placeholder="Country"
                            value={country}
                            onChange={(e) => setCountry(e.target.value)}
                            className="border border-gray-300 rounded-md px-3 py-1.5 text-sm focus:outline-none focus:border-[#1a5c1a] bg-gray-50" />
                    </div>
                </div>

                <div className="flex flex-col md:flex-row gap-5 mb-5">
                    <div className="flex flex-col gap-1.5 flex-1">
                        <label className="text-sm font-medium text-gray-800">State <span className="text-red-500">*</span></label>
                        <input name="state" required type="text" placeholder="State"
                            value={state}
                            onChange={(e) => setState(e.target.value)}
                            className="border border-gray-300 rounded-md px-3 py-1.5 text-sm focus:outline-none focus:border-[#1a5c1a] bg-gray-50" />
                    </div>
                    <div className="flex flex-col gap-1.5 flex-1">
                        <label className="text-sm font-medium text-gray-800">City <span className="text-red-500">*</span></label>
                        <input name="city" required type="text" placeholder="City"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            className="border border-gray-300 rounded-md px-3 py-1.5 text-sm focus:outline-none focus:border-[#1a5c1a] bg-gray-50" />
                    </div>
                </div>

                {/* Row 6: Industry / Sector + Type Of Business */}
                <div className="flex flex-col md:flex-row gap-5 mb-5">
                    <div className="flex flex-col gap-1.5 flex-1">
                        <label className="text-sm font-medium text-gray-800">Industry / Sector <span className="text-red-500">*</span></label>
                        <select name="industrySector" required className="border border-gray-300 rounded-md px-3 py-1.5 text-sm focus:outline-none focus:border-[#1a5c1a]">
                            <option value="">Select Here</option>
                            <option value="Medical & Healthcare">Medical & Healthcare</option>
                            <option value="AYUSH & Traditional Medicine">AYUSH & Traditional Medicine</option>
                            <option value="Wellness, Fitness & Lifestyle">Wellness, Fitness & Lifestyle</option>
                            <option value="Nutrition, Organic & Health Foods">Nutrition, Organic & Health Foods</option>
                            <option value="Beauty, Personal Care & Aesthetic Wellness">Beauty, Personal Care & Aesthetic Wellness</option>
                            <option value="Mental Health, Yoga & Spiritual Wellness">Mental Health, Yoga & Spiritual Wellness</option>
                            <option value="Medical Technology, Diagnostics & Devices">Medical Technology, Diagnostics & Devices</option>
                            <option value="Institutions, Government Bodies & Startups">Institutions, Government Bodies & Startups</option>
                        </select>
                    </div>
                    <div className="flex flex-col gap-1.5 flex-1">
                        <label className="text-sm font-medium text-gray-800">Type Of Business <span className="text-red-500">*</span></label>
                        <select name="typeOfBusiness" required className="border border-gray-300 rounded-md px-3 py-1.5 text-sm focus:outline-none focus:border-[#1a5c1a]">
                            <option value="">Select Here</option>
                            <option value="Pvt. Ltd. Company">Pvt. Ltd. Company</option>
                            <option value="Pub. Ltd. Company">Pub. Ltd. Company</option>
                            <option value="Partnership Company">Partnership Company</option>
                            <option value="Limited Liability Partnership (LLP)">Limited Liability Partnership (LLP)</option>
                            <option value="One Person Company">One Person Company</option>
                            <option value="Sole Proprietorship">Sole Proprietorship</option>
                            <option value="Section 8 Company">Section 8 Company</option>
                            <option value="Others">Others</option>
                        </select>
                    </div>
                </div>

                {/* Address block moved here */}
                <div className="flex flex-col gap-1.5 mb-5">
                    <label className="text-sm font-medium text-gray-800">Address <span className="text-red-500">*</span></label>
                    <textarea name="address" required rows={3} placeholder="Enter your complete address"
                        className="border border-gray-300 rounded-md px-3 py-1.5 text-sm focus:outline-none focus:border-[#1a5c1a] resize-none"></textarea>
                </div>

                {/* Checkboxes */}
                <div className="w-full space-y-2 mt-6">
                    <label className="flex items-start gap-3 p-3 bg-slate-50 border border-slate-200 rounded-sm cursor-pointer group hover:bg-slate-100 transition-all">
                        <Checkbox required checked={termsAccepted} onCheckedChange={(c) => setTermsAccepted(c === true)} className="mt-0.5 border-slate-400 peer-checked:bg-[#23471d]" />
                        <span className="text-[11px] font-medium text-slate-600 group-hover:text-slate-900 transition-colors leading-relaxed">
                            I hereby confirm that the information provided is accurate. I have read and agree to the  <Link to={`/terms-of-service?page=delegate-registration`} className="text-blue-600 font-bold hover:underline" target="_blank">Terms & Conditions</Link> and the exhibition policy for IHWE Delegate Pass.
                        </span>
                    </label>
                    <label className="flex items-start gap-3 p-3 bg-slate-50 border border-slate-200 rounded-sm cursor-pointer group hover:bg-slate-100 transition-all">
                        <Checkbox required checked={refundAccepted} onCheckedChange={(c) => setRefundAccepted(c === true)} className="mt-0.5 border-slate-400 peer-checked:bg-[#23471d]" />
                        <span className="text-[11px] font-medium text-slate-600 group-hover:text-slate-900 transition-colors leading-relaxed">
                            I have read and agree to the <Link to="/refund-policy" className="text-blue-600 font-bold hover:underline" target="_blank">Refund & Cancellation Policy</Link> for IHWE Delegate Pass.
                        </span>
                    </label>
                </div>

                {/* Buttons */}
                <button type="submit" disabled={!termsAccepted || !refundAccepted} className={`w-full mt-6 text-white font-medium py-3 rounded-lg text-sm transition-colors shadow-md hover:shadow-lg ${(!termsAccepted || !refundAccepted) ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#1a5c1a] hover:bg-[#145014]'}`}>
                    {submitLabel}
                </button>
            </form>
        </div>
    );
};

export default DelegateRegistrationForm;
