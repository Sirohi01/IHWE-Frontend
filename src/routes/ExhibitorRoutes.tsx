import React, { lazy } from "react";
import { Route, Outlet } from "react-router-dom";


const ExhibitorProfile = lazy(() => import("../pages/ExhibitorProfile"));
const ExhibitorDashboard = lazy(() => import("../pages/ExhibitorDashboard"));
const ExhibitorDashboardHome = lazy(() => import("../pages/exhibitor/ExhibitorDashboardHome"));
const AddTeamMembers = lazy(() => import("../pages/exhibitor/AddTeamMembers"));
const ExhibitorProfilePage = lazy(() => import("../pages/exhibitor/ExhibitorProfilePage"));
const ExhibitorInvoicesPage = lazy(() => import("../pages/exhibitor/ExhibitorInvoicesPage"));
const ExhibitorCalendarPage = lazy(() => import("../pages/exhibitor/ExhibitorCalendarPage"));
const ExhibitorPassesPage = lazy(() => import("../pages/exhibitor/ExhibitorPassesPage"));
const ExhibitorAccessoriesPage = lazy(() => import("../pages/exhibitor/ExhibitorAccessoriesPage"));
const ExhibitorMarketingPage = lazy(() => import("../pages/exhibitor/ExhibitorMarketingPage"));
const ExhibitorChatPage = lazy(() => import("../pages/exhibitor/ExhibitorChatPage"));
const ExhibitorMSMEPage = lazy(() => import("../pages/exhibitor/ExhibitorMSMEPage"));
const ExhibitorStallManagementPage = lazy(() => import("../pages/exhibitor/ExhibitorStallManagementPage"));
const ExhibitorEventsPage = lazy(() => import("../pages/exhibitor/ExhibitorEventsPage"));
const ExhibitorPaymentPage = lazy(() => import("../pages/exhibitor/ExhibitorPaymentPage"));
const ExhibitorEPromotion = lazy(() => import("../pages/exhibitor/ExhibitorEPromotion"));
const ExhibitorSellerRegistrationPage = lazy(() => import("@/pages/exhibitor/ExhibitorSellerRegistrationPage"));
const PsmReports = lazy(() => import("../pages/psmClaim/PsmReports"));
const PsmReportsTable = lazy(() => import("../pages/psmClaim/PsmReportsTable"));
const ExhibitorFeedbackFormNew = lazy(() => import("../pages/exhibitor/ExhibitorFeedbackFormNew"));
const ParticipantsFeedback = lazy(() => import("@/pages/psmClaim/ParticipantsFeedback"));
const MandateForm = lazy(() => import("@/pages/psmClaim/MandateForm"));
const PaymentReminders = lazy(() => import("@/pages/exhibitor/PaymentReminders"));
const MSMEPMSApplicationPage = lazy(() => import("@/pages/exhibitor/MSMEPMSApplicationPage"));
const MSMEPMSClaimStatusPage = lazy(() => import("@/pages/exhibitor/MSMEPMSClaimStatusPage"));
const MSMEPMSClaimApprovedPage = lazy(() => import("@/pages/exhibitor/MSMEPMSClaimApprovedPage"));
const Notification = lazy(() => import("@/pages/exhibitor/Notification"));
const SupportAssistance = lazy(() => import("@/pages/exhibitor/SupportAssistance"));
const RelationshipManager = lazy(() => import("@/pages/exhibitor/RelationshipManager"));
const ExProfile = lazy(() => import("@/pages/exhibitor/ExProfile"));
const Overview = lazy(() => import("@/pages/exhibitor/Overview"));
const MSMEDashboard = lazy(() => import("../pages/MSME_PMS_ReimbursementCenter"));
const MSMEPMSBankDetailsPage = lazy(() => import("../pages/exhibitor/MSMEPMSBankDetailsPage"));
const MSMEPMSDocumentsUploadPage = lazy(() => import("../pages/exhibitor/MSMEPMSDocumentsUploadPage"));
const PMSReimbursementApprovedPage = lazy(() => import("../pages/exhibitor/PMSFinalSubmissionPage"));
const MSMEApplicationReviewPage = lazy(() => import("../pages/exhibitor/MSMEApplicationReviewPage"));
const ProductServices = lazy(() => import("../pages/exhibitor/ProductServices"));
const StallInformation = lazy(() => import("../pages/exhibitor/StallInformation"));
const MyEvent = lazy(() => import("../pages/exhibitor/MyEvent"));
const DocumentCenter = lazy(() => import("../pages/exhibitor/DocumentCenter"));
const BuyerContacts = lazy(() => import("../pages/exhibitor/BuyerContacts"));

export const ExhibitorRoutes = () => (
<>
                  <Route path="/exhibitor-dashboard" element={<ExhibitorDashboard />}>
                    <Route path="/exhibitor-dashboard/msme-pms-reimbursement-center" element={<MSMEDashboard />} />

                    <Route index element={<ExhibitorDashboardHome />} />
                    <Route path="profile" element={<ExhibitorProfilePage />} />
                    <Route path="add-team-members" element={<AddTeamMembers />} />
                    <Route path="invoices" element={<ExhibitorInvoicesPage />} />
                    <Route path="payments" element={<ExhibitorPaymentPage />} />
                    <Route path="exhibitor-pass" element={<ExhibitorPassesPage />} />
                    <Route path="accessories" element={<ExhibitorAccessoriesPage />} />
                    <Route path="stall-management" element={<ExhibitorStallManagementPage />} />
                    <Route path="marketing" element={<ExhibitorMarketingPage />} />
                    <Route path="bsm" element={<BuyerContacts />} />
                    <Route path="calendar" element={<ExhibitorCalendarPage />} />
                    <Route path="chat" element={<ExhibitorChatPage />} />
                    <Route path="msme" element={<ExhibitorMSMEPage />} />
                    <Route path="msme/application" element={<MSMEPMSApplicationPage />} />
                    <Route path="msme/pms-claim-status" element={<MSMEPMSClaimStatusPage />} />
                    <Route path="msme/pms-claim-status-approved" element={<MSMEPMSClaimApprovedPage />} />
                    <Route path="msme/bank-details" element={<MSMEPMSBankDetailsPage />} />
                    <Route path="msme/documents-upload" element={<MSMEPMSDocumentsUploadPage />} />
                    <Route path="msme/pms-approved" element={<PMSReimbursementApprovedPage />} />
                    <Route path="msme/application-review" element={<MSMEApplicationReviewPage />} />
                    <Route path="epromotion" element={<ExhibitorEPromotion />} />
                    <Route path="product" element={<ProductServices />} />
                    <Route path="stall-information" element={<StallInformation />} />
                    <Route path="psm-claim">
                      <Route index element={<ExhibitorMSMEPage />} />
                      <Route path="reports" element={<PsmReports />} />
                      <Route path="reports/:type" element={<PsmReports />} />
                      <Route path="reports/:type/:id" element={<PsmReports />} />
                      <Route path="reports-table" element={<PsmReportsTable />} />
                      <Route path="reports-table/:type" element={<PsmReportsTable />} />
                    </Route>
                    <Route path="exhibitions" element={<ExhibitorEventsPage />} />
                    <Route path="documentation" element={<DocumentCenter />} />
                    <Route path="participants-feedback" element={<ParticipantsFeedback />} />
                    <Route path="mandate-form" element={<MandateForm />} />
                    <Route path="reminders" element={<PaymentReminders />} />
                    <Route path="msme-pms-application" element={<MSMEPMSApplicationPage />} />
                    <Route path="notification" element={<Notification />} />
                    <Route path="support" element={<SupportAssistance />} />
                    <Route path="relationship-manager" element={<RelationshipManager />} />
                    <Route path="exhibitor-feedback" element={<ExhibitorFeedbackFormNew />} />
                    <Route path="ex-profile" element={<ExProfile />} />
                    <Route path="ex-profile1" element={<Overview />} />
                    <Route path="my-event" element={<MyEvent />} />
                    <Route path="document-center" element={<DocumentCenter />} />
                    <Route path="buyer-contacts" element={<BuyerContacts />} />
                    {/* Seller Specific Routes */}
                    <Route path="become-seller" element={<ExhibitorSellerRegistrationPage />} />
                  </Route>

</>);
