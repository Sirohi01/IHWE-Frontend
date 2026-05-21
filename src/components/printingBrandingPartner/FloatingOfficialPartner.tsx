import { Printer, Star } from "lucide-react";
import { TbStarFilled } from "react-icons/tb";

const FloatingOfficialPartner = () => {
    return (
        <div className="relative md:absolute md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 transform bg-white text-white p-2 rounded-full border border-white w-[200px] h-[200px] md:w-[220px] md:h-[220px] flex items-center justify-center mx-auto my-6 md:my-0 shadow-lg md:shadow-none z-30 shrink-0">
            <div className="w-full rounded-full h-full bg-[#81912F] p-1">
                <div className="w-full rounded-full h-full bg-[#294669] p-1 flex items-center justify-center flex-col">
                    <Printer size={36} className="text-white md:w-[48px] md:h-[48px]" />
                    <h4 className="uppercase font-bold text-sm md:text-xl text-center flex items-center justify-center">Official Printing & Branding Partner</h4>
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