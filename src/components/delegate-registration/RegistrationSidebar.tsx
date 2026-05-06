import React from "react";
import { ShoppingCart, Package, ShieldCheck, Coffee, Users, Info, Lock, CheckCircle, ChevronRight, ArrowRight } from "lucide-react";

interface SelectedItem {
  id: string;
  name: string;
  price: number;
}

interface RegistrationSidebarProps {
  selectedItems?: SelectedItem[];
  totalAmount?: number;
}

const RegistrationSidebar: React.FC<RegistrationSidebarProps> = ({ 
  selectedItems = [], 
  totalAmount = 0 
}) => {
  return (
    <div className="sticky top-4 space-y-4">
      {/* Selection Card */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="bg-gray-50/50 p-6 flex flex-col items-center">
          <h4 className="text-[14px] font-black text-gray-400 uppercase tracking-[0.2em] mb-8">YOUR SELECTION</h4>
          
          <div className="w-24 h-24 rounded-full border-2 border-dashed border-gray-200 flex items-center justify-center mb-6">
            <ShoppingCart className="w-10 h-10 text-gray-200" />
          </div>
          
          <p className="text-[14px] font-bold text-gray-400 italic mb-8">No option selected yet</p>
          
          <div className="w-full pt-8 border-t border-gray-100 flex flex-col items-center">
            <div className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-1">Total Amount</div>
            <div className="text-[28px] font-black text-[#143111] leading-none">₹{totalAmount}</div>
          </div>

          <button className="w-full mt-8 bg-[#143111] hover:bg-[#0d210b] text-white py-3 px-6 rounded-xl font-black text-[12px] uppercase tracking-[0.1em] flex items-center justify-between gap-2 transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-xl shadow-green-900/20 group">
            <span>CONTINUE TO DETAILS</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>

      {/* Includes Section - Balanced Size */}
      <div className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm">
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
      <div className="bg-[#FFF8EE] border border-[#FF9800]/10 rounded-xl p-5 flex items-start gap-4">
        <Info className="w-5 h-5 text-[#FF9800] shrink-0 mt-0.5" />
        <div>
          <span className="text-[13px] font-black text-[#855B1C] uppercase tracking-widest block mb-1">NOTE</span>
          <p className="text-[13px] font-bold text-[#855B1C]/80 leading-snug">
            Seats are limited. Early registration recommended.
          </p>
        </div>
      </div>

      {/* Secure Info - Balanced Size */}
      <div className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm">
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
