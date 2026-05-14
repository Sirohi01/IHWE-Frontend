import { Printer, StarIcon, X} from "lucide-react";
import printer from "../../assets/printing/printer.webp"
const PartnerShipBenefitCard = ({ title, icon, price, list, color }) => {
    return (
        <div className="flex flex-row items-start gap-2 rounded-lg white pt-2 justify-between flex-1 border-b border-b-2 border-gray relative">
            <div
              className="absolute top-0 right-[10px] flex flex-col items-center"
              style={{ color: color }}
            >
              <div
                className="w-[18px] h-[22px] flex items-center justify-center"
                style={{ backgroundColor: color, color:color }}
              >
                <StarIcon fill={color} />
              </div>

              <div
                className="w-0 h-0"
                style={{
                  borderLeft: '9px solid transparent',
                  borderRight: '9px solid transparent',
                  borderTop: `6px solid ${color}`,
                }}
              />
            </div>
            <div className="w-[100px] h-[70px] rounded-full flex items-center justify-center text-white" style={{background:color}}>

                <Printer size={32} />
            </div>
            <div className="flex center flex-col items-start justify-start w-full">
                <h3 className="text-lg font-bold text-[#0D0B61] text-center uppercase">{title}</h3>
                <h3 className="text-lg font-bold">{price} + GST</h3>
                <ul className="list-disc">
                    {list.map((item, index) => <li key={index} className="text-sm text-[#0D0B61] flex items-center gap-2">{item}</li>)}
                </ul>
            </div>
        </div>
    )
}
export default PartnerShipBenefitCard;