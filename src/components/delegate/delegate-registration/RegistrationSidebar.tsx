import React from "react";
import { ShoppingCart, Package, ShieldCheck, Coffee, Users, Info, Lock, CheckCircle, ChevronRight, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

interface SelectedItem {
  _id: string;
  title: string;
  price: number;
  time?: string;
  date?: string;
  day?: string;
}

interface RegistrationSidebarProps {
  selectedItems?: SelectedItem[];
  subTotal?: number;
  onNext?: () => void;
  showNextButton?: boolean;
  isComplimentary?: boolean;
  compact?: boolean;
}

const RegistrationSidebar: React.FC<RegistrationSidebarProps> = ({
  selectedItems = [],
  subTotal = 0,
  onNext,
  showNextButton = true,
  isComplimentary = false,
  compact = false
}) => {
  return (
    <div className={`sticky top-4 ${compact ? "space-y-3" : "space-y-4"}`}>
      {/* Selection Card */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className={`bg-gray-50/50 ${compact ? "p-4" : "p-6"} flex flex-col items-center`}>
          <h4 className={`${compact ? "text-[12px] mb-4" : "text-[14px] mb-8"} font-black text-gray-400 uppercase tracking-[0.2em]`}>YOUR SELECTION</h4>

          {selectedItems.length === 0 ? (
            <>
              <div className="w-24 h-24 rounded-full border-2 border-dashed border-gray-200 flex items-center justify-center mb-6">
                <ShoppingCart className="w-10 h-10 text-gray-200" />
              </div>
              <p className="text-[14px] font-bold text-gray-400 italic mb-8">No option selected yet</p>
            </>
          ) : (
            <div className={`w-full ${compact ? "mb-4 space-y-2" : "mb-6 space-y-3"}`}>
              {selectedItems.map((item, idx) => (
                <div key={idx} className="bg-white p-3 rounded-lg border border-gray-100 shadow-sm text-left">
                  <h5 className="text-[13px] font-black text-[#143111] leading-tight mb-1">{item.title}</h5>
                  {item.date && item.time && (
                    <p className="text-[10px] font-bold text-gray-500">{item.date} | {item.time}</p>
                  )}
                  <div className={`mt-1 text-[13px] font-black ${isComplimentary ? "text-emerald-700" : "text-gray-800"}`}>
                    {isComplimentary ? "Included in complimentary pass" : `₹${item.price}`}
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className={`w-full ${compact ? "pt-3 gap-1.5" : "pt-4 gap-2"} border-t border-gray-200 flex flex-col`}>
            {isComplimentary ? (
              <div className="flex items-center justify-between rounded-lg bg-emerald-50 px-3 py-3 text-emerald-800">
                <span className="text-[12px] font-black uppercase">Total Payable</span>
                <span className="text-[20px] font-black">FREE</span>
              </div>
            ) : (
              <>
            <div className="flex justify-between items-center">
              <span className="text-[12px] font-bold text-gray-500 uppercase">Subtotal</span>
              <span className="text-[14px] font-black text-gray-700">₹{subTotal}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[12px] font-bold text-gray-500 uppercase">GST (18%)</span>
              <span className="text-[14px] font-black text-gray-700">₹{Math.round(subTotal * 0.18)}</span>
            </div>
            <div className="flex justify-between items-center border-b border-gray-100 pb-3">
              <span className="text-[12px] font-bold text-gray-500 uppercase">Gateway Charges (2.5%)</span>
              <span className="text-[14px] font-black text-gray-700">₹{Math.round((subTotal + Math.round(subTotal * 0.18)) * 0.025)}</span>
            </div>
            <div className="flex justify-between items-center pt-2">
              <span className="text-[14px] font-black text-[#143111] uppercase tracking-widest">Total Amount</span>
              <span className={`${compact ? "text-[20px]" : "text-[24px]"} font-black text-[#143111] leading-none`}>
                ₹{subTotal + Math.round(subTotal * 0.18) + Math.round((subTotal + Math.round(subTotal * 0.18)) * 0.025)}
              </span>
            </div>
              </>
            )}
          </div>

          {showNextButton && (
            <button
              onClick={onNext}
              className={`w-full ${compact ? "mt-5 py-2.5" : "mt-8 py-3"} bg-[#143111] hover:bg-[#0d210b] text-white px-6 rounded-xl font-black text-[12px] uppercase tracking-[0.1em] flex items-center justify-between gap-2 transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-xl shadow-green-900/20 group`}
            >
              <span>CONTINUE TO DETAILS</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          )}
        </div>
      </div>

      {/* Includes Section - Balanced Size */}
      <div className={`bg-white rounded-xl border border-gray-100 ${compact ? "p-4" : "p-5"} shadow-sm`}>
        <h4 className="text-[14px] font-black text-[#0B2C66] uppercase tracking-[0.1em] mb-5 flex items-center gap-2">
          <div className="w-1.5 h-5 bg-[#0B2C66] rounded-full" />
          INCLUDES
        </h4>
        <div className="space-y-4">
          {[
            { icon: <Package className="w-5 h-5" />, title: "Delegate Kit", desc: "Exclusive conference kit" },
            { icon: <ShieldCheck className="w-5 h-5" />, title: "Participation Certificate", desc: "For all selected sessions" },
            { icon: <Coffee className="w-5 h-5" />, title: "Packed Lunch (Thali)", desc: "For full day options" },
            { icon: <Users className="w-5 h-5" />, title: "Networking Opportunities", desc: "Connect with experts" }
          ].map((item, idx) => (
            <div key={idx} className="flex items-start gap-4">
              <div className="bg-[#F1F8EE] p-2 rounded-lg text-[#143111]">{item.icon}</div>
              <div>
                <div className="text-[13px] font-black text-gray-900 leading-none">{item.title}</div>
                <div className="text-[11px] text-gray-400 font-bold uppercase tracking-tight mt-1">{item.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Note - Balanced Size */}
      <div className={`bg-[#FFF8EE] border border-[#FF9800]/10 rounded-xl ${compact ? "p-4" : "p-5"} flex items-start gap-4`}>
        <Info className="w-5 h-5 text-[#FF9800] shrink-0 mt-0.5" />
        <div>
          <span className="text-[13px] font-black text-[#855B1C] uppercase tracking-widest block mb-1">NOTE</span>
          <p className="text-[13px] font-bold text-[#855B1C]/80 leading-snug">
            Seats are limited. Early registration recommended.
          </p>
        </div>
      </div>

      {/* Secure Info - Balanced Size */}
      <div className={`bg-white rounded-xl border border-gray-100 ${compact ? "p-4" : "p-5"} shadow-sm`}>
        <div className="flex items-center gap-3 mb-5">
          <Lock className="w-5 h-5 text-[#143111]" />
          <h4 className="text-[14px] font-black text-[#143111] uppercase tracking-[0.05em]">SECURE REGISTRATION</h4>
        </div>
        <div className="space-y-3">
          {[
            "100% Secure Payments",
            "Instant Confirmation",
            "Your data is safe with us"
          ].map((text, idx) => (
            <div key={idx} className="flex items-center gap-3 text-[12px] font-bold text-gray-600">
              <CheckCircle className="w-4 h-4 text-green-600" /> {text}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RegistrationSidebar;
