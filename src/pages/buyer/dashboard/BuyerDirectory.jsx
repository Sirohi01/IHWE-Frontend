import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, Filter, ExternalLink, 
  Building2, Globe, MapPin, 
  MessageSquare, Star, ArrowUpRight,
  Plus, Users, Briefcase, ChevronRight,
  Clock, CheckCircle2, AlertCircle,
  FileText, Download, MoreHorizontal
} from 'lucide-react';
import { buyerApi } from '@/lib/buyer/api';

export default function BuyerDirectory() {
  const [buyers, setBuyers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    const fetchBuyers = async () => {
      try {
        const response = await buyerApi.getAll();
        if (response.data.success) {
          setBuyers(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching buyers:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBuyers();
  }, []);

  const filtered = buyers.filter(b => 
    (filter === 'All' || b.registrationCategory === filter) &&
    (
      (b.fullName || '').toLowerCase().includes(searchTerm.toLowerCase()) || 
      (b.companyName || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (b.city || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (b.registrationId || '').toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <div className="space-y-6 animate-fadeIn pb-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="reg-section-title !border-none !mb-0">
            <Users className="w-5 h-5" />
            Attendee Directory
          </h2>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mt-1 ml-7">Networking with {buyers.length} registered delegates</p>
        </div>
        <div className="flex items-center gap-2">
           <div className="flex -space-x-2 mr-2">
              {[1,2,3,4].map(i => (
                <div key={i} className="w-7 h-7 rounded-full border-2 border-white bg-slate-200 flex items-center justify-center text-[8px] font-black text-slate-400 uppercase">
                  {String.fromCharCode(64+i)}
                </div>
              ))}
              <div className="w-7 h-7 rounded-full border-2 border-white bg-[#23471d] flex items-center justify-center text-[8px] font-black text-white">
                +{Math.max(0, buyers.length - 4)}
              </div>
           </div>
           <button className="px-4 py-2 bg-[#23471d] text-white rounded text-[10px] font-black uppercase tracking-widest hover:bg-[#1a3516] transition-all shadow-lg shadow-[#23471d]/20 flex items-center gap-2">
              <Plus className="w-3.5 h-3.5" />
              Invite Guest
           </button>
        </div>
      </div>

      {/* Control Bar */}
      <div className="p-6 bg-white border border-slate-200 rounded-lg shadow-sm flex flex-col md:flex-row gap-6 items-center">
        <div className="flex-1 relative w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search attendees, company, ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="reg-input !h-10 pl-10"
          />
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Filter:</span>
          <div className="flex bg-slate-100 p-1 rounded-md">
            {['All', 'Standard', 'VIP', 'Hosted'].map(cat => (
              <button 
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-4 py-1.5 rounded text-[9px] font-black uppercase tracking-widest transition-all ${
                  filter === cat 
                  ? 'bg-white text-[#23471d] shadow-sm' 
                  : 'text-slate-500 hover:text-[#23471d]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-left border-collapse min-w-[1000px]">
            <thead>
              <tr className="bg-[#23471d] text-white">
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest w-16">S.No</th>
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest w-40">Buyer ID</th>
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest">Delegate Info</th>
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest">Location</th>
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest">Category</th>
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest">Status</th>
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              <AnimatePresence mode='popLayout'>
                {filtered.map((buyer, idx) => (
                  <motion.tr 
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    key={buyer._id} 
                    className="group hover:bg-slate-50/50 transition-colors"
                  >
                    <td className="px-6 py-4">
                       <span className="text-[10px] font-black text-slate-300 group-hover:text-[#23471d] transition-colors">{idx + 1}</span>
                    </td>
                    <td className="px-6 py-4">
                       <div className="px-2 py-1 bg-slate-100 rounded-md inline-block border border-slate-200 group-hover:border-[#23471d]/20 group-hover:bg-emerald-50 transition-all whitespace-nowrap">
                          <span className="text-[10px] font-black text-slate-600 group-hover:text-[#23471d] uppercase tracking-tighter">
                            {buyer.registrationId || 'PENDING'}
                          </span>
                       </div>
                    </td>
                    <td className="px-6 py-4 min-w-[250px]">
                       <div className="flex items-center gap-3">
                          <div className="shrink-0 w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center font-black text-[10px] text-slate-400 group-hover:bg-emerald-100 group-hover:text-[#23471d] transition-colors uppercase">
                             {(buyer.fullName || '?')[0]}
                          </div>
                          <div className="min-w-0">
                             <p className="text-[11px] font-black text-slate-800 tracking-tight truncate">{buyer.fullName}</p>
                             <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-0.5 truncate">{buyer.companyName}</p>
                          </div>
                       </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                       <div className="flex items-center gap-1.5 text-slate-500">
                          <MapPin className="w-3 h-3 shrink-0" />
                          <span className="text-[10px] font-bold truncate max-w-[150px]">{buyer.city}, {buyer.country}</span>
                       </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                       <span className={`px-2 py-0.5 rounded-md text-[8px] font-black uppercase tracking-widest border ${
                          buyer.registrationCategory === 'VIP' ? 'bg-amber-50 text-amber-600 border-amber-200' :
                          buyer.registrationCategory === 'Hosted' ? 'bg-purple-50 text-purple-600 border-purple-200' :
                          'bg-blue-50 text-blue-600 border-blue-200'
                       }`}>
                          {buyer.registrationCategory}
                       </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                       <div className={`flex items-center gap-1.5 text-[9px] font-black uppercase tracking-widest ${
                          buyer.paymentStatus === 'Completed' ? 'text-emerald-500' : 
                          buyer.paymentStatus === 'Pending' ? 'text-amber-500' : 'text-red-500'
                       }`}>
                          {buyer.paymentStatus === 'Completed' ? <CheckCircle2 className="w-3 h-3" /> : 
                           buyer.paymentStatus === 'Pending' ? <Clock className="w-3 h-3" /> : <AlertCircle className="w-3 h-3" />}
                          {buyer.paymentStatus}
                       </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                       <div className="flex items-center justify-center gap-2">
                          <button className="p-1.5 rounded-lg hover:bg-emerald-50 text-slate-400 hover:text-[#23471d] transition-all" title="View Profile">
                             <FileText className="w-3.5 h-3.5" />
                          </button>
                          <button className="p-1.5 rounded-lg hover:bg-emerald-50 text-slate-400 hover:text-[#23471d] transition-all" title="Message">
                             <MessageSquare className="w-3.5 h-3.5" />
                          </button>
                       </div>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
        
        {loading && (
          <div className="p-20 text-center">
             <div className="w-10 h-10 border-4 border-emerald-100 border-t-[#23471d] rounded-full animate-spin mx-auto mb-4"></div>
             <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Synchronizing Attendee Database...</p>
          </div>
        )}

        {!loading && filtered.length === 0 && (
          <div className="p-20 text-center">
             <div className="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4 border border-slate-100">
                <Search className="w-6 h-6 text-slate-200" />
             </div>
             <p className="text-[11px] font-black text-slate-800 uppercase tracking-widest">No matching attendees found</p>
             <p className="text-[10px] font-bold text-slate-400 mt-2 uppercase tracking-tight">Try adjusting your search or filters</p>
          </div>
        )}

        <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
           <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">
              Showing {filtered.length} of {buyers.length} delegates registered for IHWE 2026
           </p>
           <div className="flex gap-2">
              <button className="px-3 py-1 bg-white border border-slate-200 rounded text-[9px] font-black uppercase text-slate-500 hover:bg-slate-50 disabled:opacity-50" disabled>Previous</button>
              <button className="px-3 py-1 bg-white border border-slate-200 rounded text-[9px] font-black uppercase text-slate-500 hover:bg-slate-50 disabled:opacity-50" disabled>Next</button>
           </div>
        </div>
      </div>
    </div>
  );
}
