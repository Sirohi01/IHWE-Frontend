import { Printer, Star } from "lucide-react";
import { TbStarFilled } from "react-icons/tb";

const FloatingOfficialPartner = () => {
    return (
        <div className="relative lg:absolute lg:top-1/2 lg:left-1/2 lg:-translate-x-1/2 lg:-translate-y-1/2 transform bg-white text-white p-2 rounded-full border border-white w-[200px] h-[200px] lg:w-[220px] lg:h-[220px] flex items-center justify-center mx-auto my-6 lg:my-0 shadow-lg lg:shadow-none z-30 shrink-0">
            <div className="w-full rounded-full h-full bg-[#81912F] p-1">
                <div className="w-full rounded-full h-full bg-[#294669] p-1 flex items-center justify-center flex-col">
                    <Printer size={36} className="text-white lg:w-[48px] lg:h-[48px]" />
                    <h4 className="uppercase font-bold text-sm lg:text-xl text-center flex items-center justify-center">Official Printing & Branding Partner</h4>
                    <div className="flex items-center gap-2 text-yellow-500 mt-1">
                        <TbStarFilled />
                        <TbStarFilled />
                        <TbStarFilled />
                    </div>
                </div>
            </div>
        </div>
    )
}
export default FloatingOfficialPartner;