import { useCallback, useEffect, useMemo, useState } from 'react';
import { API_URL, SERVER_URL } from '@/lib/api';

const authHeaders = (json = false) => {
  const token = localStorage.getItem('exhibitorToken');
  return { ...(json ? { 'Content-Type': 'application/json' } : {}), Authorization: `Bearer ${token || ''}` };
};

const isMongoObjectId = (value: any) => /^[a-f\d]{24}$/i.test(String(value || '').trim());

async function request(path: string, options: RequestInit = {}, exhibitorId = '') {
  const separator = path.includes('?') ? '&' : '?';
  const selectedQuery = exhibitorId ? `${separator}exhibitorId=${encodeURIComponent(exhibitorId)}` : '';
  const response = await fetch(`${API_URL}/msme-pms-scheme${path}${selectedQuery}`, options);
  const payload = await response.json().catch(() => ({}));
  if (!response.ok) {
    const detail = payload.fields?.join(', ') || payload.documentTypes?.join(', ') || payload.missingDocuments?.join(', ');
    throw new Error(detail ? `${payload.message}: ${detail}` : payload.message || 'MSME application request failed');
  }
  return payload.data;
}

export function useMsmePmsApplication(exhibitorData: any) {
  const selectedExhibitorId = String(exhibitorData?._id || '');
  const [application, setApplication] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [relationshipManager, setRelationshipManager] = useState<any>(null);

  const refresh = useCallback(async () => {
    setLoading(true);
    setError('');
    try { setApplication(await request('/application/me', { headers: authHeaders() }, selectedExhibitorId)); }
    catch (err: any) { setError(err.message); }
    finally { setLoading(false); }
  }, [selectedExhibitorId]);

  useEffect(() => { refresh(); }, [refresh]);

  useEffect(() => {
    const username = exhibitorData?.filledBy && exhibitorData.filledBy !== 'User' ? exhibitorData.filledBy : null;
    if (!username) { setRelationshipManager(null); return; }
    fetch(`${API_URL}/admin/by-username/${encodeURIComponent(username)}`)
      .then(response => response.json())
      .then(payload => setRelationshipManager(payload?.success ? payload.data : null))
      .catch(() => setRelationshipManager(null));
  }, [exhibitorData?.filledBy]);

  const run = useCallback(async (action: () => Promise<any>) => {
    setSaving(true);
    setError('');
    try {
      const next = await action();
      setApplication(next);
      return next;
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally { setSaving(false); }
  }, []);

  const saveStep = useCallback((step: number, body: any) => run(() => request(`/application/step/${step}`, {
    method: 'PUT', headers: authHeaders(true), body: JSON.stringify(body),
  }, selectedExhibitorId)), [run, selectedExhibitorId]);

  const uploadDocument = useCallback((documentType: string, file: File) => run(() => {
    const form = new FormData(); form.append('file', file);
    return request(`/application/documents/${documentType}`, { method: 'POST', headers: authHeaders(), body: form }, selectedExhibitorId);
  }), [run, selectedExhibitorId]);

  const deleteDocument = useCallback((documentType: string) => run(() => request(`/application/documents/${documentType}`, {
    method: 'DELETE', headers: authHeaders(),
  }, selectedExhibitorId)), [run, selectedExhibitorId]);

  const submit = useCallback(() => run(() => request('/application/submit', { method: 'POST', headers: authHeaders(true), body: '{}' }, selectedExhibitorId)), [run, selectedExhibitorId]);

  const data = useMemo(() => {
    const participation = exhibitorData?.participation || {};
    const savedApplicant = application?.applicantDetails || {};
    const sourceBank = application?.bankDetails && Object.keys(application.bankDetails).length
      ? application.bankDetails
      : exhibitorData?.bankDetails || exhibitorData?.bank || {};
    const total = Number(exhibitorData?.financeBreakdown?.netPayable || participation.total || exhibitorData?.totalPayable || 0);
    const paid = Number(exhibitorData?.amountPaid || 0);
    const paymentStatus = total > 0 ? (paid >= total ? 'Fully Paid' : paid > 0 ? 'Partially Paid' : 'Pending') : (exhibitorData?.status === 'paid' ? 'Fully Paid' : 'Pending');
    const latestPayment = Array.isArray(exhibitorData?.paymentHistory) && exhibitorData.paymentHistory.length
      ? exhibitorData.paymentHistory[exhibitorData.paymentHistory.length - 1]
      : null;
    const profileImage = relationshipManager?.profileImage
      ? (String(relationshipManager.profileImage).startsWith('http') ? relationshipManager.profileImage : `${SERVER_URL}${String(relationshipManager.profileImage).startsWith('/') ? '' : '/'}${relationshipManager.profileImage}`)
      : '';
    const rmPhone = relationshipManager?.mobile || '';
    const assignedRmName = relationshipManager?.fullName || exhibitorData?.filledByFullName || exhibitorData?.spokenWith || (exhibitorData?.filledBy !== 'User' ? exhibitorData?.filledBy : '');

    // The MSME PMS scheme only ever reimburses ONE stall up to 9 sqm per
    // exhibitor — regardless of how many stalls they actually booked or how
    // large their combined footprint is (participation.stallSize is the
    // *combined* area across every PI once an exhibitor has more than one —
    // see syncExhibitorStallSize in estimateController.js — so it can't be
    // used directly as "their one stall's size"). Cap at 9 sqm using their
    // per-sqm PI rate, which stays correct per-stall regardless of how many
    // stalls they hold.
    const MSME_CAP_SQM = 9;
    const ratePerSqm = Number(participation.rate || 0);
    const gstPercent = Number(participation.gstPercent ?? 18);
    const stallSize = Number(participation.stallSize || 0);
    const cappedSqm = stallSize > 0 ? Math.min(MSME_CAP_SQM, stallSize) : MSME_CAP_SQM;
    let cappedStallCharge = 0;
    if (ratePerSqm > 0) {
      const base = ratePerSqm * cappedSqm;
      cappedStallCharge = base + (base * gstPercent) / 100;
    } else if (stallSize > 0 && total > 0) {
      // No per-sqm rate on record — prorate the known contract value down to
      // the capped area instead of claiming the full multi-stall total.
      cappedStallCharge = total * (cappedSqm / stallSize);
    } else {
      cappedStallCharge = total;
    }
    const stallClaim = Number(exhibitorData?.claim?.stallCharges ?? cappedStallCharge ?? 0);
    const existingClaim = exhibitorData?.claim || application?.claim || {};
    const knownClaimValues = [stallClaim, existingClaim.hotelStay, existingClaim.travel, existingClaim.courier, existingClaim.marketing]
      .map(value => Number(value || 0));
    const totalClaimed = existingClaim.totalClaimed != null ? Number(existingClaim.totalClaimed) : knownClaimValues.reduce((sum, value) => sum + value, 0);
    return ({
    ...exhibitorData,
    ...application,
    documents: (application?.documents || []).map((doc: any) => ({
      ...doc,
      url: doc.path ? (doc.path.startsWith('http') ? doc.path : `${SERVER_URL}${doc.path.startsWith('/') ? '' : '/'}${doc.path.replace(/\\/g, '/')}`) : null
    })),
    ...savedApplicant,
    organizationType: savedApplicant.organizationType || exhibitorData?.typeOfBusiness || exhibitorData?.organizationType,
    emailId: savedApplicant.emailId || exhibitorData?.contact1?.email || exhibitorData?.companyEmail,
    bank: { ...sourceBank, accountHolderName: sourceBank.accountHolderName || sourceBank.accountHolder || exhibitorData?.exhibitorName, accountHolder: sourceBank.accountHolder || sourceBank.accountHolderName || exhibitorData?.exhibitorName, branchName: sourceBank.branchName || sourceBank.branch, branch: sourceBank.branch || sourceBank.branchName, ifscCode: sourceBank.ifscCode || sourceBank.ifsc, ifsc: sourceBank.ifsc || sourceBank.ifscCode, accountType: sourceBank.accountType === 'Current' ? 'Current Account' : sourceBank.accountType === 'Savings' ? 'Savings Account' : sourceBank.accountType },
    msme: { ...(exhibitorData?.msme || {}), msmeCategory: application?.applicantDetails?.msmeCategory || exhibitorData?.msme?.msmeCategory, udyamRegNo: application?.applicantDetails?.udyamRegNo || exhibitorData?.msme?.udyamRegNo },
    gstNo: application?.applicantDetails?.gstNumber || exhibitorData?.gstNo,
    panNo: application?.applicantDetails?.panNumber || exhibitorData?.panNo,
    event: {
      name: savedApplicant.eventName || exhibitorData?.eventId?.name || exhibitorData?.eventName,
      stallNumber: (!isMongoObjectId(savedApplicant.stallNo) && savedApplicant.stallNo)
        || participation.stallFor
        || exhibitorData?.stallDetails?.stallNumber,
      hallNumber: savedApplicant.hallNo || exhibitorData?.stallDetails?.hallNumber || exhibitorData?.hallNo,
      stallSize: savedApplicant.stallSize || participation.stallSize || exhibitorData?.stallDetails?.area,
      participationType: savedApplicant.participationType || participation.stallType || participation.stallCategory,
      bookingStatus: savedApplicant.bookingStatus || (participation.stallFor ? 'Confirmed' : exhibitorData?.status),
      paymentStatus: savedApplicant.paymentStatus || paymentStatus,
    },
    payment: { invoiceValue: total || null, amountPaid: paid, paymentDate: latestPayment?.paidAt || exhibitorData?.manualPaymentDetails?.updatedAt },
    claim: {
      ...existingClaim,
      stallCharges: stallClaim || null,
      stallSqmClaimed: cappedSqm,
      stallSqmActual: stallSize || null,
      totalClaimed: totalClaimed || null,
      eligibleAmount: existingClaim.eligibleAmount != null ? Number(existingClaim.eligibleAmount) : (totalClaimed ? Math.min(totalClaimed, 150000) : null),
    },
    pmsCoordinator: (relationshipManager || assignedRmName) ? {
      name: assignedRmName,
      designation: relationshipManager?.designation || relationshipManager?.department || 'Relationship Manager',
      phone: rmPhone,
      whatsapp: relationshipManager?.whatsapp || rmPhone,
      email: relationshipManager?.email,
      photo: profileImage,
      initials: assignedRmName.split(/\s+/).filter(Boolean).map((part: string) => part[0]).slice(0, 2).join('').toUpperCase(),
    } : null,
  })}, [application, exhibitorData, relationshipManager]);

  return { application, data, loading, saving, error, refresh, saveStep, uploadDocument, deleteDocument, submit };
}
