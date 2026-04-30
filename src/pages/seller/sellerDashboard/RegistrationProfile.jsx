import { 
  Building2, User, Phone, MapPin, 
  Globe, Briefcase, Calendar, FileText,
  ShieldCheck, Edit, Download
} from 'lucide-react';
import { useAuth } from '@/context/SellerAuthContext';

export default function RegistrationProfile() {
  const { currentSeller } = useAuth();

  if (!currentSeller) return null;

  return (
    <div className="space-y-8 animate-slide-up pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-black text-slate-800 tracking-tight">Registration Profile</h2>
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Review your submitted registration data</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-5 py-2.5 bg-white border border-slate-200 rounded-xl font-black text-[10px] uppercase tracking-widest text-slate-600 hover:bg-slate-50 hover:border-slate-300 transition-all">
            <Download className="w-4 h-4" />
            Download PDF
          </button>
          <button className="flex items-center gap-2 px-5 py-2.5 bg-primary-green text-white rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-primary-green/90 transition-all shadow-lg shadow-primary-green/20">
            <Edit className="w-4 h-4" />
            Request Edit
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Left Column: ID Card Styling */}
        <div className="space-y-8">
          <div className="premium-card overflow-hidden">
            <div className="bg-primary-green p-6 text-white relative">
              <div className="flex items-center gap-3 relative z-10">
                <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center border border-white/30">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-[10px] uppercase font-black tracking-widest text-emerald-300">Verified Seller</p>
                  <p className="font-display font-black text-lg tracking-tight">9th IHWE 2026</p>
                </div>
              </div>
            </div>
            <div className="p-8 space-y-6">
              <div className="flex flex-col items-center text-center">
                <div className="w-24 h-24 rounded-full bg-slate-100 border-4 border-white shadow-xl flex items-center justify-center mb-4">
                  <User className="w-20 h-20 text-slate-300" />
                </div>
                <h3 className="text-xl font-black text-slate-800">{currentSeller.fullName}</h3>
                <p className="text-sm font-bold text-slate-500">{currentSeller.designation}</p>
                <div className="mt-4 px-4 py-1.5 bg-emerald-50 text-emerald-700 rounded-full text-[10px] font-black uppercase tracking-widest border border-emerald-100">
                  {currentSeller.registrationCategory}
                </div>
              </div>
              
              <div className="pt-6 border-t border-slate-100 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Reg ID</span>
                  <span className="text-sm font-bold text-slate-800">{currentSeller.registrationId}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Status</span>
                  <span className="text-sm font-bold text-emerald-600 uppercase tracking-widest">{currentSeller.paymentStatus}</span>
                </div>
              </div>

              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 flex items-center justify-center">
                <div className="w-32 h-32 bg-white rounded-xl border border-dashed border-slate-300 flex items-center justify-center p-2">
                  {/* QR Code Placeholder using Registration ID */}
                  <div className="text-[8px] font-black text-slate-300 text-center uppercase tracking-tighter">
                    {currentSeller.registrationId}
                    <div className="w-20 h-20 bg-slate-50 rounded mt-2 mx-auto"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Detailed Sections */}
        <div className="xl:col-span-2 space-y-8">
          {/* Section: Company Info */}
          <div className="premium-card p-8">
            <div className="flex items-center gap-3 mb-8 pb-4 border-b border-slate-100">
              <div className="p-2.5 bg-primary-green/10 rounded-xl">
                <Building2 className="w-6 h-6 text-primary-green" />
              </div>
              <h3 className="text-lg font-black text-slate-800 tracking-tight">Organization Details</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-12">
              <div className="space-y-1">
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Company Name</p>
                <p className="text-sm font-bold text-slate-700">{currentSeller.companyName}</p>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Website</p>
                <p className="text-sm font-bold text-primary-green underline">{currentSeller.website || 'N/A'}</p>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Business Type</p>
                <p className="text-sm font-bold text-slate-700">{currentSeller.businessType}</p>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Annual Turnover</p>
                <p className="text-sm font-bold text-slate-700">{currentSeller.annualTurnover}</p>
              </div>
              <div className="md:col-span-2 space-y-1">
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Registered Office Address</p>
                <p className="text-sm font-bold text-slate-700 leading-relaxed">{currentSeller.registeredAddress}, {currentSeller.city}, {currentSeller.stateProvince}, {currentSeller.country} - {currentSeller.pinCode}</p>
              </div>
            </div>
          </div>

          {/* Section: Contacts */}
          <div className="premium-card p-8">
            <div className="flex items-center gap-3 mb-8 pb-4 border-b border-slate-100">
              <div className="p-2.5 bg-blue-500/10 rounded-xl">
                <Phone className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-black text-slate-800 tracking-tight">Contact Information</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100">
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm">
                  <Phone className="w-5 h-5 text-slate-400" />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Mobile Number</p>
                  <p className="text-sm font-bold text-slate-700">{currentSeller.mobileNumber}</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100">
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm">
                  <Globe className="w-5 h-5 text-slate-400" />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Email Address</p>
                  <p className="text-sm font-bold text-slate-700">{currentSeller.emailAddress}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Section: Interests */}
          <div className="premium-card p-8">
            <div className="flex items-center gap-3 mb-8 pb-4 border-b border-slate-100">
              <div className="p-2.5 bg-amber-500/10 rounded-xl">
                <Briefcase className="w-6 h-6 text-amber-600" />
              </div>
              <h3 className="text-lg font-black text-slate-800 tracking-tight">Sourcing Interests</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-1">
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Primary Product Interest</p>
                <p className="text-sm font-bold text-slate-700">{currentSeller.primaryProductInterest}</p>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Buying Frequency</p>
                <p className="text-sm font-bold text-slate-700">{currentSeller.buyingFrequency}</p>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Purchase Timeline</p>
                <p className="text-sm font-bold text-slate-700">{currentSeller.purchaseTimeline}</p>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Estimated Annual Purchase</p>
                <p className="text-sm font-bold text-slate-700">{currentSeller.estimatedAnnualPurchaseValue}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
