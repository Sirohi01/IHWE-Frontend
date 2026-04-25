import React from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '@/context/BuyerAuthContext';

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

export default function BuyerDetails() {
  const { currentBuyer } = useAuth();

  if (!currentBuyer) return null;

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
                ['Full Name', currentBuyer.fullName],
                ['Designation', currentBuyer.designation],
                ['Email', currentBuyer.emailAddress],
                ['Mobile', currentBuyer.mobileNumber],
                ['Alt Number', currentBuyer.alternateNumber],
                ['Business Type', currentBuyer.businessType],
            ]} />
        </Section>

        <Section title="Organization Details">
            <InfoGrid rows={[
                ['Company Name', currentBuyer.companyName],
                ['Website', currentBuyer.website],
                ['Years Active', currentBuyer.yearsInOperation],
                ['Annual Turnover', currentBuyer.annualTurnover],
            ]} />
        </Section>

        <Section title="Location Information">
            <InfoGrid rows={[
                ['Address', currentBuyer.registeredAddress],
                ['City', currentBuyer.city],
                ['State/Prov.', currentBuyer.stateProvince],
                ['Country', currentBuyer.country],
                ['PIN/Zip', currentBuyer.pinCode],
            ]} />
        </Section>

        <Section title="Sourcing & Requirements">
            <InfoGrid rows={[
                ['Primary Interest', currentBuyer.primaryProductInterest],
                ['Secondary Cat.', Array.isArray(currentBuyer.secondaryProductCategories) ? currentBuyer.secondaryProductCategories.join(', ') : currentBuyer.secondaryProductCategories],
                ['Buying Freq.', currentBuyer.buyingFrequency],
                ['Annual Volume', currentBuyer.estimatedAnnualPurchaseValue],
                ['Timeline', currentBuyer.purchaseTimeline],
                ['Pricing Pref.', currentBuyer.pricingPreference],
            ]} />
        </Section>

        <Section title="Supplier Preferences">
            <InfoGrid rows={[
                ['Preferred Region', Array.isArray(currentBuyer.preferredSupplierRegion) ? currentBuyer.preferredSupplierRegion.join(', ') : currentBuyer.preferredSupplierRegion],
                ['Preferred State', Array.isArray(currentBuyer.preferredState) ? currentBuyer.preferredState.join(', ') : currentBuyer.preferredState],
                ['Supplier Type', Array.isArray(currentBuyer.preferredSupplierType) ? currentBuyer.preferredSupplierType.join(', ') : currentBuyer.preferredSupplierType],
                ['Company Size', currentBuyer.preferredCompanySize],
            ]} />
        </Section>

        <Section title="Registration & Financials">
            <InfoGrid rows={[
                ['Registration ID', currentBuyer.registrationId],
                ['Category', currentBuyer.registrationCategory],
                ['Payment Status', currentBuyer.paymentStatus],
                ['Payment Mode', currentBuyer.paymentMode],
                ['Transaction ID', currentBuyer.transactionId],
                ['Created At', currentBuyer.createdAt ? new Date(currentBuyer.createdAt).toLocaleString() : '—'],
            ]} />
        </Section>

        <Section title="Logistics & Meetings">
            <InfoGrid rows={[
                ['Logistics Req.', currentBuyer.logisticsRequirements],
                ['Certifications', Array.isArray(currentBuyer.requiredCertifications) ? currentBuyer.requiredCertifications.join(', ') : currentBuyer.requiredCertifications],
                ['Preferred Date', currentBuyer.preferredMeetingDate],
                ['Preferred Slot', currentBuyer.preferredTimeSlot],
                ['B2B Meeting', currentBuyer.requirePreScheduledB2B],
                ['Priority', currentBuyer.meetingPriorityLevel],
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

