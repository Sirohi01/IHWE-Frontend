import { Printer, Star } from "lucide-react";
import { TbStarFilled } from "react-icons/tb";

const FloatingOfficialPartner = () => {
    return (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transform bg-white text-white p-2 rounded-full border border-white w-[220px] h-[220px] flex items-center justify-center">
            <div className="w-full rounded-full h-full bg-[#81912F] p-1">
                <div className="w-full rounded-full h-full bg-[#294669] p-1 flex items-center justify-center flex-col">
                    <Printer size={48} className="text-white" />
                    <h4 className="uppercase font-bold text-xl text-center flex items-center justify-center">Official Printing & branding partner</h4>
                    <div className="flex items-center gap-2 text-yellow-600">
                        <TbStarFilled/>
                        <TbStarFilled/>
                        <TbStarFilled/>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default FloatingOfficialPartner;