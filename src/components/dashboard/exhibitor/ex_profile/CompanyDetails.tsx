import { useExhibitorCtx } from "@/context/ExhibitorContext";
import { Edit } from "lucide-react";

export default function CompanyDetails() {
    const { data } = useExhibitorCtx();

    if (!data) return <div className="p-6 text-gray-500">Loading...</div>;

    const companyDetails = [
        { label: "Company Name", value: data.exhibitorName || data.brandName || "N/A" },
        { label: "Type of Business", value: data.typeOfBusiness || "N/A" },
        { label: "Industry Sector", value: data.industrySector || "N/A" },
        { label: "Fascia Name", value: data.fasciaName || "N/A" },
        { label: "Website", value: data.website || "N/A" },
        { label: "GST No.", value: data.gstNo || "N/A" },
        { label: "PAN No.", value: data.panNo || "N/A" },
        { label: "Landline", value: data.landline || "N/A" },
        { label: "Nature of Business", value: data.natureOfBusiness || "N/A" },
    ];

    const addressDetails = [
        { label: "Address", value: data.address || "N/A", fullWidth: true },
        { label: "City", value: data.city || "N/A" },
        { label: "State", value: data.state || "N/A" },
        { label: "Country", value: data.country || "N/A" },
        { label: "Pincode", value: data.pincode || "N/A" },
    ];

    return (
        <div className="p-6 bg-[#f4f6fb] min-h-screen">
            <div className="max-w-[1540px] mx-auto space-y-6">
                
                {/* Company & Business Section */}
                <div className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm">
                    <div className="bg-[#1f4e3d] text-white px-4 py-2.5 flex items-center justify-between">
                        <h2 className="text-sm font-bold tracking-wide">COMPANY & BUSINESS</h2>
                        <button className="flex items-center gap-1.5 text-xs font-semibold hover:text-emerald-200 transition-colors">
                            <Edit size={14} /> EDIT
                        </button>
                    </div>
                    <div className="p-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-y-6 gap-x-4">
                        {companyDetails.map((detail, idx) => (
                            <div key={idx} className="flex flex-col gap-1">
                                <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">{detail.label}</span>
                                <span className="text-[14px] font-semibold text-[#0A143D]">{detail.value}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Address Section */}
                <div className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm">
                    <div className="bg-[#1f4e3d] text-white px-4 py-2.5">
                        <h2 className="text-sm font-bold tracking-wide">ADDRESS</h2>
                    </div>
                    <div className="p-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-y-6 gap-x-4">
                        {addressDetails.map((detail, idx) => (
                            <div key={idx} className={`flex flex-col gap-1 ${detail.fullWidth ? 'lg:col-span-4 md:col-span-2' : ''}`}>
                                <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">{detail.label}</span>
                                <span className="text-[14px] font-semibold text-[#0A143D]">{detail.value}</span>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
}
