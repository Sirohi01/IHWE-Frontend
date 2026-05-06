import React from "react";
import { ShoppingCart, Package, ShieldCheck, Coffee, Users, Info, Lock, CheckCircle, ChevronRight } from "lucide-react";

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
        <div className="bg-gray-50/50 p-5 flex flex-col items-center">
          <h4 className="text-[13px] font-black text-gray-400 uppercase tracking-[0.2em] mb-6">YOUR SELECTION</h4>
          
          <div className="w-20 h-20 rounded-full border-2 border-dashed border-gray-200 flex items-center justify-center mb-5">
            <ShoppingCart className="w-8 h-8 text-gray-200" />
          </div>
          
          <p className="text-[13px] font-bold text-gray-400 italic mb-6">No option selected yet</p>
          
          <div className="w-full pt-6 border-t border-gray-100 flex flex-col items-center">
            <div className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-1">Total Amount</div>
            <div className="text-[32px] font-black text-[#143111] leading-none">₹{totalAmount}</div>
          </div>

          <button className="w-full mt-6 bg-[#143111] hover:bg-[#0d210b] text-white py-4 px-6 rounded-xl font-black text-[13px] uppercase tracking-[0.1em] flex items-center justify-between gap-2 transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-xl shadow-green-900/20 group">
            <span>CONTINUE TO DETAILS</span>
            <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>

      {/* Includes Section */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
        <h4 className="text-[13px] font-black text-[#0B2C66] uppercase tracking-[0.15em] mb-6 flex items-center gap-2">
          <div className="w-1.5 h-5 bg-[#0B2C66] rounded-full" />
          INCLUDES
        </h4>
        <div className="space-y-4">
          {[
            { icon: <Package className="w-4 h-4" />, title: "Delegate Kit", desc: "Exclusive conference kit" },
            { icon: <ShieldCheck className="w-4 h-4" />, title: "Participation Certificate", desc: "For all selected sessions" },
            { icon: <Coffee className="w-4 h-4" />, title: "Packed Lunch (Thali)", desc: "For full day / full pass options" },
            { icon: <Users className="w-4 h-4" />, title: "Networking Opportunities", desc: "Connect with experts & peers" }
          ].map((item, idx) => (
            <div key={idx} className="flex items-start gap-4">
              <div className="bg-[#F1F8EE] p-2 rounded-lg text-[#143111]">{item.icon}</div>
              <div>
                <div className="text-[13px] font-black text-gray-900 leading-tight">{item.title}</div>
                <div className="text-[10px] font-bold text-gray-400 mt-0.5 uppercase tracking-tight">{item.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Note Section */}
      <div className="bg-[#FFF8EE] border border-[#FF9800]/20 rounded-2xl p-6">
        <div className="flex items-center gap-4 mb-2">
          <div className="bg-[#FF9800] p-1.5 rounded-lg">
            <Info className="w-4 h-4 text-white" />
          </div>
          <span className="text-[12px] font-black text-[#855B1C] uppercase tracking-widest">NOTE</span>
        </div>
        <p className="text-[12px] font-bold text-[#855B1C]/80 leading-relaxed">
          Seats are limited for each session. Early registration is recommended.
        </p>
      </div>

      {/* Secure Registration */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
        <div className="flex items-center gap-4 mb-4">
          <Lock className="w-5 h-5 text-[#143111]" />
          <h4 className="text-[13px] font-black text-[#143111] uppercase tracking-[0.1em]">SECURE REGISTRATION</h4>
        </div>
        <div className="space-y-2">
          {[
            "100% Secure Payments",
            "Instant Confirmation",
            "Your data is safe with us"
          ].map((text, idx) => (
            <div key={idx} className="flex items-center gap-3 text-[11px] font-bold text-gray-600">
              <CheckCircle className="w-3.5 h-3.5 text-green-600" /> {text}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RegistrationSidebar;
