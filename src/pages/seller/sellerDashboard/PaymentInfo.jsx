import { 
  CreditCard, CheckCircle2, AlertCircle, 
  Download, ExternalLink, Calendar, 
  DollarSign, ShieldCheck, FileText,
  BadgeIndianRupee
} from 'lucide-react';
import { useAuth } from '@/context/SellerAuthContext';

export default function PaymentInfo() {
  const { currentSeller } = useAuth();

  if (!currentSeller) return null;

  const payments = [
    { 
      id: "PAY-" + (currentSeller.transactionId?.split('-').pop() || "1001"), 
      date: new Date(currentSeller.createdAt).toLocaleDateString(), 
      plan: currentSeller.registrationCategory, 
      amount: "₹" + (currentSeller.registrationFee || "0"), 
      method: currentSeller.paymentMode || "N/A", 
      status: currentSeller.paymentStatus === "Completed" ? "Successful" : currentSeller.paymentStatus, 
      txnId: currentSeller.transactionId || "N/A" 
    }
  ];

  return (
    <div className="space-y-8 animate-slide-up">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-black text-slate-800 tracking-tight">Payment Information</h2>
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Manage your subscriptions and transaction records</p>
        </div>
        <button className="flex items-center gap-2 px-6 py-3 bg-primary-green text-white rounded-xl font-black text-xs uppercase tracking-widest hover:bg-primary-green/90 transition-all shadow-lg shadow-primary-green/20">
          <DollarSign className="w-4 h-4" />
          Make New Payment
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Active Subscription Card */}
        <div className="premium-card overflow-hidden bg-primary-green text-white relative lg:col-span-1">
          <div className="p-8 relative z-10">
            <div className="flex items-center justify-between mb-8">
              <div className="p-3 bg-white/10 rounded-2xl backdrop-blur-md">
                <ShieldCheck className="w-6 h-6 text-emerald-300" />
              </div>
              <span className="px-3 py-1 bg-emerald-500 rounded-full text-[10px] font-black uppercase tracking-widest">
                {currentSeller.paymentStatus === 'Completed' ? 'Active Plan' : 'Pending'}
              </span>
            </div>
            
            <p className="text-xs font-black uppercase tracking-[0.2em] text-emerald-300/80 mb-2">Current Membership</p>
            <h3 className="text-2xl font-black mb-1 leading-tight">{currentSeller.registrationCategory}</h3>
            <p className="text-4xl font-black mb-8">₹{currentSeller.registrationFee || '0'}<span className="text-sm font-bold text-emerald-300/60 ml-2">/ Year</span></p>
            
            <div className="space-y-4 pt-6 border-t border-white/10">
              <div className="flex items-center justify-between text-sm">
                <span className="text-emerald-50/60 font-bold">Registration ID</span>
                <span className="font-black">{currentSeller.registrationId}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-emerald-50/60 font-bold">Payment Status</span>
                <span className="font-black">{currentSeller.paymentStatus}</span>
              </div>
            </div>
          </div>
          
          <div className="absolute -bottom-12 -right-12 w-48 h-48 bg-emerald-400/10 rounded-full blur-3xl"></div>
        </div >

        {/* Payment Summary Stats */}
        <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="premium-card p-8 flex flex-col justify-between">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center">
                <BadgeIndianRupee className="w-6 h-6 text-emerald-600" />
              </div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Total Spent</p>
                <p className="text-2xl font-black text-slate-800 tracking-tight">₹{currentSeller.registrationFee || '0'}</p>
              </div>
            </div>
            <p className="text-xs font-bold text-slate-500">Includes memberships and event taxes</p>
          </div>
          
          <div className="premium-card p-8 flex flex-col justify-between">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center">
                <FileText className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Invoices</p>
                <p className="text-2xl font-black text-slate-800 tracking-tight">01 Available</p>
              </div>
            </div>
            <p className="text-xs font-bold text-slate-500 underline cursor-pointer">Download annual statement</p>
          </div>
        </div>
      </div>

      {/* Transaction History Table */}
      <div className="premium-card overflow-hidden">
        <div className="p-6 md:p-8 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
          <h3 className="font-black text-slate-800 tracking-tight">Transaction History</h3>
          <button className="text-xs font-black uppercase tracking-widest text-primary-green flex items-center gap-2">
            See All <ExternalLink className="w-3 h-3" />
          </button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-white border-b border-slate-100">
              <tr>
                <th className="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Order ID</th>
                <th className="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Date</th>
                <th className="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Plan Description</th>
                <th className="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Amount</th>
                <th className="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Status</th>
                <th className="px-8 py-4 text-center text-[10px] font-black uppercase tracking-widest text-slate-400">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {payments.map((p) => (
                <tr key={p.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-8 py-5 text-sm font-bold text-slate-700">{p.id}</td>
                  <td className="px-8 py-5 text-sm font-medium text-slate-500">{p.date}</td>
                  <td className="px-8 py-5 text-sm font-bold text-slate-800">{p.plan}</td>
                  <td className="px-8 py-5 text-sm font-black text-slate-800">{p.amount}</td>
                  <td className="px-8 py-5">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                      p.status === 'Successful' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'
                    }`}>
                      {p.status === 'Successful' ? <CheckCircle2 className="w-3 h-3" /> : <AlertCircle className="w-3 h-3" />}
                      {p.status}
                    </span>
                  </td>
                  <td className="px-8 py-5 text-center">
                    <button className="p-2 text-slate-400 hover:text-primary-green hover:bg-slate-100 rounded-lg transition-all">
                      <Download className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
