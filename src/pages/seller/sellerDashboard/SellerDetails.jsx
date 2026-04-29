import React from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '@/context/SellerAuthContext';

function InfoGrid({ rows }) {
    return (
        <div className="border border-slate-200 rounded-sm overflow-hidden bg-white">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
                {rows.map(([label, value], i) => (
                    <div
                        key={i}
                        className="flex border-r border-b border-slate-200 last:border-r-0 hover:bg-slate-50/40 transition"
                    >
                        <div className="w-[120px] min-w-[120px] px-2 py-2 text-[10px] font-semibold text-slate-500 uppercase border-r border-slate-200 bg-slate-50 flex items-center font-sans">
                            {label}
                        </div>
                        <div className="flex-1 px-2 py-2 text-[11px] text-slate-800 flex items-center break-all font-sans leading-tight">
                            {value || '—'}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

function Section({ title, children }) {
    return (
        <div className="mb-6">
            <div className="flex items-center gap-2 mb-2">
                <div className="w-1 h-3.5 bg-[#23471d] rounded-full" />
                <span className="font-extrabold text-[10px] text-[#23471d] uppercase tracking-widest font-sans">
                    {title}
                </span>
            </div>
            {children}
        </div>
    );
}

export default function SellerDetails() {
  const { currentSeller } = useAuth();

  if (!currentSeller) return null;

  return (
    <div className="space-y-6 animate-fadeIn pb-10">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
        <div>
          <h2 className="text-[18px] font-black uppercase text-slate-800 tracking-tight font-sans">Complete Registration Dossier</h2>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5 font-sans">Dynamic record from server</p>
        </div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 10 }} 
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        <Section title="Personal & Professional Profile">
            <InfoGrid rows={[
                ['Full Name', currentSeller.fullName],
                ['Designation', currentSeller.designation],
                ['Email', currentSeller.emailAddress],
                ['Mobile', currentSeller.mobileNumber],
                ['Alt Number', currentSeller.alternateNumber],
                ['Business Type', currentSeller.businessType],
            ]} />
        </Section>

        <Section title="Organization Details">
            <InfoGrid rows={[
                ['Company Name', currentSeller.companyName],
                ['Website', currentSeller.website],
                ['Years Active', currentSeller.yearsInOperation],
                ['Annual Turnover', currentSeller.annualTurnover],
            ]} />
        </Section>

        <Section title="Location Information">
            <InfoGrid rows={[
                ['Address', currentSeller.registeredAddress],
                ['City', currentSeller.city],
                ['State/Prov.', currentSeller.stateProvince],
                ['Country', currentSeller.country],
                ['PIN/Zip', currentSeller.pinCode],
            ]} />
        </Section>

        <Section title="Sourcing & Requirements">
            <InfoGrid rows={[
                ['Primary Interest', currentSeller.primaryProductInterest],
                ['Secondary Cat.', Array.isArray(currentSeller.secondaryProductCategories) ? currentSeller.secondaryProductCategories.join(', ') : currentSeller.secondaryProductCategories],
                ['Buying Freq.', currentSeller.buyingFrequency],
                ['Annual Volume', currentSeller.estimatedAnnualPurchaseValue],
                ['Timeline', currentSeller.purchaseTimeline],
                ['Pricing Pref.', currentSeller.pricingPreference],
            ]} />
        </Section>

        <Section title="Supplier Preferences">
            <InfoGrid rows={[
                ['Preferred Region', Array.isArray(currentSeller.preferredSupplierRegion) ? currentSeller.preferredSupplierRegion.join(', ') : currentSeller.preferredSupplierRegion],
                ['Preferred State', Array.isArray(currentSeller.preferredState) ? currentSeller.preferredState.join(', ') : currentSeller.preferredState],
                ['Supplier Type', Array.isArray(currentSeller.preferredSupplierType) ? currentSeller.preferredSupplierType.join(', ') : currentSeller.preferredSupplierType],
                ['Company Size', currentSeller.preferredCompanySize],
            ]} />
        </Section>

        <Section title="Registration & Financials">
            <InfoGrid rows={[
                ['Registration ID', currentSeller.registrationId],
                ['Category', currentSeller.registrationCategory],
                ['Payment Status', currentSeller.paymentStatus],
                ['Payment Mode', currentSeller.paymentMode],
                ['Transaction ID', currentSeller.transactionId],
                ['Created At', currentSeller.createdAt ? new Date(currentSeller.createdAt).toLocaleString() : '—'],
            ]} />
        </Section>

        <Section title="Logistics & Meetings">
            <InfoGrid rows={[
                ['Logistics Req.', currentSeller.logisticsRequirements],
                ['Certifications', Array.isArray(currentSeller.requiredCertifications) ? currentSeller.requiredCertifications.join(', ') : currentSeller.requiredCertifications],
                ['Preferred Date', currentSeller.preferredMeetingDate],
                ['Preferred Slot', currentSeller.preferredTimeSlot],
                ['B2B Meeting', currentSeller.requirePreScheduledB2B],
                ['Priority', currentSeller.meetingPriorityLevel],
            ]} />
        </Section>
      </motion.div>

      <div className="bg-[#23471d] p-8 rounded-sm text-center shadow-lg border border-white/10">
        <h3 className="text-xl font-black text-white uppercase tracking-tight mb-2 font-sans">Account Integrity Verified</h3>
        <p className="text-emerald-100/70 text-xs font-medium max-w-lg mx-auto mb-6 font-sans">
          This dossier contains the complete digital record of your 9th IHWE registration. Any changes made are reflected instantly across our global matching system.
        </p>
        <button className="px-8 py-3 bg-white text-[#23471d] rounded-sm font-black text-[10px] uppercase tracking-widest hover:bg-emerald-50 transition-all font-sans">
          Request Profile Update
        </button>
      </div>
    </div>
  );
}

