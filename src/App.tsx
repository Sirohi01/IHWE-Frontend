import { useState, lazy, Suspense, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Outlet, Navigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
const Index = lazy(() => import("./pages/Index"));
const About = lazy(() => import("./pages/about"));
const AdvisoryBoard = lazy(() => import("./pages/AdvisoryBoard"));
const Advisory = lazy(() => import("./pages/Advisory"));
const Exhibition = lazy(() => import("./pages/Exhibition"));
const ExhibitorProfile = lazy(() => import("./pages/ExhibitorProfile"));
const Partners = lazy(() => import("./pages/Partners"));
const Conference = lazy(() => import("./pages/Conference"));
const Exhibitors = lazy(() => import("./pages/Exhibitors"));
const WhyExhibit = lazy(() => import("./pages/WhyExhibit"));
const BookAStand = lazy(() => import("./pages/book-a-stand"));
const Blog = lazy(() => import("./pages/Blog"));
const BlogDetail = lazy(() => import("./pages/BlogDetail"));
const Contact = lazy(() => import("./pages/contact"));
const Gallery = lazy(() => import("./pages/Gallery"));
const BuyerSellerMeet = lazy(() => import("./pages/buyerSellerMeet/BuyerSellerMeet"));
const GovernmentMsmePmsSchemes = lazy(() => import("./pages/governmentMsmePmsSchemes/GovernmentMsmePmsSchemes"));
const VisitorRegistration = lazy(() => import("./pages/visitors/VisitorRegistration"));
const BuyerRegistration = lazy(() => import("./pages/buyer/BuyerRegistration"));
const InternationalBuyerRegistration = lazy(() => import("./pages/buyer/InternationalBuyerRegistration"));
const TravelAccommodation = lazy(() => import("./pages/TravelAccommodation"));
const MediaRegistration = lazy(() => import("./pages/MediaRegistration"));
const SpeakerRegistration = lazy(() => import("./components/conference/Arogyasangostiform"));
const SellerRegistration = lazy(() => import("./pages/SellerRegistration"));
const StallDesigningVendors = lazy(() => import("./pages/StallDesigningVendors"));
const IndustryZoneDetail = lazy(() => import("./pages/IndustryZoneDetail"));
const ConferenceDay1 = lazy(() => import("./pages/ConferenceDay1"));
const ConferenceDay2 = lazy(() => import("./pages/ConferenceDay2"));
const ConferenceDay3 = lazy(() => import("./pages/ConferenceDay3"));
// const MsmePmsScheme = lazy(() => import("./pages/MsmePmsScheme"));
const HotelStay = lazy(() => import("./pages/support/HotelStay"));
const PrintingBrandingPartner = lazy(() => import("./pages/support/PrintingBrandingPartner"));
const TravelAssistance = lazy(() => import("./pages/support/TravelAssistance"));
const StallDesign = lazy(() => import("./pages/support/StallDesign"));
const LogisticsSupport = lazy(() => import("./pages/support/LogisticsSupport"));
const PrintingBranding = lazy(() => import("./pages/support/PrintingBranding"));
const HospitalityDesk = lazy(() => import("./pages/support/HospitalityDesk"));
const ConferenceDayUnified = lazy(() => import("./pages/ConferenceDayNew"));
const TravelPartner = lazy(() => import("./pages/TravelPartner"));
const HotelStayPartner = lazy(() => import("./pages/HotelStayPartner"));
const MsmePmsScheme = lazy(() => import("./pages/governmentMsmePmsSchemes/MsmePmsScheme"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Sponsership = lazy(() => import("./pages/Sponsership"));
const EPromotion = lazy(() => import("./pages/EPromotion"));
const Partnership = lazy(() => import("./pages/Partnership"));
const Fabricationpartner = lazy(() => import("./pages/Fabricationpartner"));
const PartnerRegistration = lazy(() => import("./pages/PartnerRegistration"));
const LogisticPartner = lazy(() => import("./pages/LogisticPartner"));
const DownloadBadge = lazy(() => import("./pages/DownloadBadge"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const TermsOfService = lazy(() => import("./pages/TermsOfService"));
const RefundPolicy = lazy(() => import("./pages/RefundPolicy"));
const PaymentPolicy = lazy(() => import("./pages/PaymentPolicy"));
const CancellationPolicy = lazy(() => import("./pages/CancellationPolicy"));
const ExhibitorLogin = lazy(() => import("./pages/ExhibitorLogin"));
const ExhibitorDashboard = lazy(() => import("./pages/ExhibitorDashboard"));
const ExhibitorDashboardHome = lazy(() => import("./pages/exhibitor/ExhibitorDashboardHome"));
const ExhibitorDocumentPrintPage = lazy(() => import("./pages/exhibitor/ExhibitorDocumentPrintPage"));
const ExhibitorPrintAllInvoicesPage = lazy(() => import("./pages/exhibitor/ExhibitorPrintAllInvoicesPage"));
const AddTeamMembers = lazy(() => import("./pages/exhibitor/AddTeamMembers"));
const ExhibitorProfilePage = lazy(() => import("./pages/exhibitor/ExhibitorProfilePage"));
const ExhibitorInvoicesPage = lazy(() => import("./pages/exhibitor/ExhibitorInvoicesPage"));
const ExhibitorBSMPage = lazy(() => import("./pages/exhibitor/ExhibitorBSMPage"));
const ExhibitorCalendarPage = lazy(() => import("./pages/exhibitor/ExhibitorCalendarPage"));
const ExhibitorPassesPage = lazy(() => import("./pages/exhibitor/ExhibitorPassesPage"));
const ExhibitorAccessoriesPage = lazy(() => import("./pages/exhibitor/ExhibitorAccessoriesPage"));
const ExhibitorMarketingPage = lazy(() => import("./pages/exhibitor/ExhibitorMarketingPage"));
const ExhibitorChatPage = lazy(() => import("./pages/exhibitor/ExhibitorChatPage"));
const ExhibitorMSMEPage = lazy(() => import("./pages/exhibitor/ExhibitorMSMEPage"));
const ExhibitorStallManagementPage = lazy(() => import("./pages/exhibitor/ExhibitorStallManagementPage"));
const ExhibitorEventsPage = lazy(() => import("./pages/exhibitor/ExhibitorEventsPage"));
const ExhibitorDocumentsPage = lazy(() => import("./pages/exhibitor/ExhibitorDocumentsPage"));
const ExhibitorPaymentPage = lazy(() => import("./pages/exhibitor/ExhibitorPaymentPage"));
const ExhibitorEPromotion = lazy(() => import("./pages/exhibitor/ExhibitorEPromotion"));
const EEPromotion = lazy(() => import("./components/dashboard/exhibitor/EPromotion"));
const ExhibitorSellerRegistrationPage = lazy(() => import("@/pages/exhibitor/ExhibitorSellerRegistrationPage"));
const SellerPortal = lazy(() => import("@/pages/SellerPortal"));
const SellerDashboardHome = lazy(() => import("@/pages/exhibitor/seller/SellerDashboardHome"));
const ProductExportPage = lazy(() => import("@/pages/exhibitor/seller/ProductExportPage"));
const SellerLeadsPage = lazy(() => import("@/pages/exhibitor/seller/SellerLeadsPage"));
const SellerSponsorshipPage = lazy(() => import("@/pages/exhibitor/seller/SellerSponsorshipPage"));
const SellerSubscriptionPlanDetail = lazy(() => import("@/pages/exhibitor/seller/SellerSubscriptionPlanDetail"));
const SellerConferencePage = lazy(() => import("@/pages/exhibitor/seller/SellerConferencePage"));
const SellerLogisticsPage = lazy(() => import("@/pages/exhibitor/seller/SellerLogisticsPage"));
const SellerHelpdeskPage = lazy(() => import("@/pages/exhibitor/seller/SellerHelpdeskPage"));
const SellerReportsPage = lazy(() => import("@/pages/exhibitor/seller/SellerReportsPage"));
const SellerProductsPage = lazy(() => import("@/pages/exhibitor/seller/SellerProductsPage"));
const SellerNotificationsPage = lazy(() => import("@/pages/exhibitor/seller/SellerNotificationsPage"));
const SellerProfilePage = lazy(() => import("@/pages/exhibitor/seller/SellerProfilePage"));
const SellerStallBookingPage = lazy(() => import("@/pages/exhibitor/seller/SellerStallBookingPage"));
const SellerMarketingPage = lazy(() => import("@/pages/exhibitor/seller/SellerMarketingPage")); // kept for fallback
const SellerCalendarPage = lazy(() => import("@/pages/exhibitor/seller/SellerCalendarPage"));
const AnnexureC = lazy(() => import("./pages/psmClaim/AnnexureC"));
const Declaration = lazy(() => import("./pages/psmClaim/Declaration"));
const FeedbackReport = lazy(() => import("./pages/psmClaim/FeedbackReport"));
const Undertaking = lazy(() => import("./pages/psmClaim/Undertaking"));
const PreReceipt = lazy(() => import("./pages/psmClaim/PreReceipt"));
const PsmReports = lazy(() => import("./pages/psmClaim/PsmReports"));
const PsmReportsTable = lazy(() => import("./pages/psmClaim/PsmReportsTable"));
const ExhibitorFeedbackFormNew = lazy(() => import("./pages/exhibitor/ExhibitorFeedbackFormNew"));
const BuyerFeedbackForm = lazy(() => import("./pages/buyer/dashboard/BuyerFeedbackForm"));
const BuyerLanding = lazy(() => import("./pages/BuyerLanding"));
const VisitorScan = lazy(() => import("./pages/VisitorScan"));
const BuyerScan = lazy(() => import("./pages/BuyerScan"));
const BuyerLogin = lazy(() => import("./pages/BuyerLogin"));
const BuyerDashboard = lazy(() => import("./pages/buyer/BuyerDashboard"));
const BuyerDashboardHome = lazy(() => import("./pages/buyer/BuyerDashboardHome"));
const BuyerProfilePage = lazy(() => import("./pages/buyer/tabs/BuyerProfilePage"));
const BuyerChatPage = lazy(() => import("./pages/buyer/tabs/BuyerChatPage"));
const BuyerBSMPage = lazy(() => import("./pages/buyer/tabs/BuyerBSMPage"));
const BuyerInvoicesPage = lazy(() => import("./pages/buyer/tabs/BuyerInvoicesPage"));
const BuyerNotificationsPage = lazy(() => import("./pages/buyer/tabs/BuyerNotificationsPage"));
const BuyerCalendarPage = lazy(() => import("./pages/buyer/tabs/BuyerCalendarPage"));
const HospitalityPartner = lazy(() => import("./pages/HospitalityPartner"));
const DelegatesLogin = lazy(() => import("./pages/delegate/DelegatesLogin"));
const BuyerDocumentationPage = lazy(() => import("./pages/buyer/tabs/BuyerPlaceholders").then(m => ({ default: m.BuyerDocumentationPage })));

import { AuthProvider as BuyerAuthProvider } from "@/context/BuyerAuthContext";
import VisitorRegistrationDrawer from "@/components/VisitorRegistrationDrawer";
import { HelmetProvider } from "react-helmet-async";
import SeoHelmet from "@/components/SeoHelmet";
import ScrollToTopOnNavigation from "@/components/layout/ScrollToTopOnNavigation";
const AnnexureD = lazy(() => import("@/pages/psmClaim/AnnexureD"));
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
const AddInternationalVistor = lazy(() => import("@/pages/visitors/international_vistor/AddInternationalVistor"));
const SellerFeedbackForm = lazy(() => import("./pages/feedbacks/SellerFeedbackForm"));
const WhyVisit = lazy(() => import("@/pages/why_visit/WhyVisit"));
const EPromotionWeb = lazy(() => import("./pages/e_promotion_webPage/EPromotionWeb"));
const DelegateRegistrationDetails = lazy(() => import("./pages/delegate/DelegateRegistrationDetails"));

const Awards = lazy(() => import("./pages/awards/Awards"));
const NominationFormPage = lazy(() => import("./pages/awards/NominationFormPage"));
const DelegateRegistration = lazy(() => import("@/pages/delegate/DelegateRegistration"));
const GroupRegistration = lazy(() => import("@/pages/visitors/GroupRegistration"));
import { SERVER_URL } from "./lib/api";
import MSMEDashboard from "./pages/MSME_PMS_ReimbursementCenter";
import MSMEPMSBankDetailsPage from "./pages/exhibitor/MSMEPMSBankDetailsPage";
import MSMEPMSDocumentsUploadPage from "./pages/exhibitor/MSMEPMSDocumentsUploadPage";
import PMSReimbursementApprovedPage from "./pages/exhibitor/PMSFinalSubmissionPage";
import MSMEApplicationReviewPage from "./pages/exhibitor/MSMEApplicationReviewPage";
const ProductServices = lazy(() => import("./pages/exhibitor/ProductServices"));
const StallInformation = lazy(() => import("./pages/exhibitor/StallInformation"));
const MyEvent = lazy(() => import("./pages/exhibitor/MyEvent"));
const DocumentCenter = lazy(() => import("./pages/exhibitor/DocumentCenter"));
const BuyerContacts = lazy(() => import("./pages/exhibitor/BuyerContacts"));
const PaperPresentation = lazy(() => import("./pages/presentation/PaperPresentation"));
const PosterPresentation = lazy(() => import("./pages/presentation/PosterPresentation"));
const AbstractPresentation = lazy(() => import("./pages/presentation/AbstractPresentation"));

const SitemapRedirect = () => {
  useEffect(() => {
    window.location.href = `${SERVER_URL}/sitemap/xml`;
  }, []);
  return null;
};

const RobotsRedirect = () => {
  useEffect(() => {
    window.location.href = `${SERVER_URL}/robots.txt`;
  }, []);
  return null;
};

const queryClient = new QueryClient();

const App = () => {
  const [visitorDrawerOpen, setVisitorDrawerOpen] = useState(false);

  const openVisitorDrawer = () => setVisitorDrawerOpen(true);
  const closeVisitorDrawer = () => setVisitorDrawerOpen(false);

  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
            <ScrollToTopOnNavigation />
            <BuyerAuthProvider>
              <Toaster />
              <Sonner />
              <SeoHelmet />
              <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-slate-50"><div className="w-10 h-10 border-4 border-[#23471d] border-t-transparent rounded-full animate-spin"></div></div>}>
                <Routes>
                  <Route element={<Layout onRegisterVisit={openVisitorDrawer}><Outlet /></Layout>}>
                    <Route path="/" element={<Index onRegisterVisit={openVisitorDrawer} />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/awards" element={<Awards />} />
                    <Route path="/awards/nomination" element={<NominationFormPage />} />
                    <Route path="/advisory-board" element={<AdvisoryBoard />} />
                    <Route path="/advisory" element={<Advisory />} />
                    <Route path="/exhibitor-profile" element={<ExhibitorProfile />} />
                    <Route path="/book-a-stand" element={<BookAStand />} />
                    <Route path="/visitor-registration" element={<VisitorRegistration />} />
                    <Route path="/international-visitor-registration" element={<AddInternationalVistor />} />
                    <Route path="/exhibition" element={<Exhibition />} />
                    <Route path="/government-msme-pms-schemes" element={<GovernmentMsmePmsSchemes />} />
                    <Route path="/media-registration" element={<MediaRegistration />} />
                    <Route path="/speaker-registration" element={<SpeakerRegistration />} />
                    <Route path="/seller-registration" element={<SellerRegistration />} />
                    <Route path="/stall-designing-vendors" element={<StallDesigningVendors />} />
                    <Route path="/why-exhibit" element={<WhyExhibit />} />
                    <Route path="/partners" element={<Partners />} />
                    <Route path="/sponsership" element={<Sponsership />} />
                    <Route path="/partnership" element={<Partnership />} />
                    <Route path="/fabrication-partner" element={<Fabricationpartner />} />

                    <Route path="/partner-registration" element={<PartnerRegistration />} />
                    <Route path="/support/hotel-stay" element={<HotelStay />} />
                    <Route path="/support/travel-assistance" element={<TravelAssistance />} />
                    <Route path="/support/stall-design" element={<StallDesign />} />
                    <Route path="/support/logistics-support" element={<LogisticsSupport />} />
                    <Route path="/support/printing-branding" element={<PrintingBranding />} />
                    <Route path="/support/hospitality-desk" element={<HospitalityDesk />} />
                    <Route path="/conference" element={<Conference />} />
                    <Route path="/conference/:dayNumber" element={<ConferenceDayUnified />} />
                    <Route path="/conference/paper-presentation" element={<PaperPresentation/>}/>
                    <Route path="/conference/poster-presentation" element={<PosterPresentation/>}/>
                    <Route path="/conference/abstract-submission" element={<AbstractPresentation/>}/>
                    <Route path="/delegate-registration" element={<DelegateRegistration />} />
                    <Route path="/delegate-registration-details" element={<DelegateRegistrationDetails />} />
                    <Route path="/group-registration" element={<GroupRegistration />} />
                    <Route path="/exhibitors" element={<Exhibitors />} />
                    <Route path="/blog" element={<Blog />} />
                    <Route path="/blog/:id" element={<BlogDetail />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/gallery" element={<Gallery />} />
                    <Route path="/buyer-seller-meet" element={<BuyerSellerMeet />} />
                    <Route path="/why-visit" element={<WhyVisit />} />
                    <Route path="/msme-pms-scheme" element={<MsmePmsScheme />} />
                    <Route path="/travel-accommodation" element={<TravelAccommodation />} />
                    <Route path="/travel-partner" element={<TravelPartner />} />
                    <Route path="/hotel-stay-partner" element={<HotelStayPartner />} />
                    <Route path="/printing-branding-partner" element={<PrintingBrandingPartner />} />
                    <Route path="/logistic-partner" element={<LogisticPartner />} />
                    <Route path="/e-promotion" element={<EPromotion />} />

                    <Route path="/download-badge" element={<DownloadBadge />} />
                    <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                    <Route path="/terms-of-service" element={<TermsOfService />} />
                    <Route path="/refund-policy" element={<RefundPolicy />} />
                    <Route path="/payment-policy" element={<PaymentPolicy />} />
                    <Route path="/cancellation-policy" element={<CancellationPolicy />} />
                    <Route path="/buyer-registration" element={<BuyerLanding />} />
                    <Route path="/buyer-registration-form" element={<BuyerRegistration />} />
                    <Route path="/international-buyer-registration" element={<InternationalBuyerRegistration />} />
                    <Route path="/industry-zone/:id" element={<IndustryZoneDetail />} />
                    <Route path="/hospitality-partner" element={<HospitalityPartner />} />
                    <Route path="/epromotion" element={<EEPromotion />} />
                    <Route path="/e-promotion-web" element={<EPromotionWeb />} />
                    <Route path="/sitemap/xml" element={<SitemapRedirect />} />
                    <Route path="/sitemap.xml" element={<SitemapRedirect />} />
                    <Route path="/robots.txt" element={<RobotsRedirect />} />
                    <Route path="*" element={<NotFound />} />
                  </Route>

                  <Route path="/exhibitor-login" element={<ExhibitorLogin />} />
                  <Route path="/exhibitor-print/:docType/:docId" element={<ExhibitorDocumentPrintPage />} />
                  <Route path="/exhibitor-print-all" element={<ExhibitorPrintAllInvoicesPage />} />
                  <Route path="/buyer-login" element={<BuyerLogin />} />
                  <Route path="/delegates-login" element={<DelegatesLogin />} />
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

                  <Route path="/seller-portal" element={<SellerPortal />}>
                    <Route index element={<SellerDashboardHome />} />
                    <Route path="leads" element={<SellerLeadsPage />} />
                    <Route path="bsm" element={<ExhibitorBSMPage />} />
                    <Route path="calendar" element={<SellerCalendarPage />} />
                    <Route path="product-export" element={<ProductExportPage />} />
                    <Route path="products" element={<SellerProductsPage />} />
                    <Route path="stall" element={<SellerStallBookingPage />} />
                    <Route path="marketing" element={<ExhibitorMarketingPage />} />
                    <Route path="sponsorship" element={<SellerSponsorshipPage />} />
                    <Route path="sponsorship/:planId" element={<SellerSubscriptionPlanDetail />} />
                    <Route path="profile" element={<SellerProfilePage />} />
                    <Route path="payments" element={<ExhibitorPaymentPage />} />
                    <Route path="logistics" element={<SellerLogisticsPage />} />
                    <Route path="conference" element={<SellerConferencePage />} />
                    <Route path="reports" element={<SellerReportsPage />} />
                    <Route path="feedback" element={<SellerFeedbackForm />} />
                    <Route path="helpdesk" element={<SellerHelpdeskPage />} />
                    <Route path="notifications" element={<SellerNotificationsPage />} />
                    <Route path="accessories" element={<ExhibitorAccessoriesPage />} />
                  </Route>
                  <Route path="/visitor" element={<VisitorScan />} />
                  
                  <Route path="/buyer-scan" element={<BuyerScan />} />
                  <Route path="/buyer-dashboard" element={<BuyerDashboard />}>
                    <Route index element={<BuyerDashboardHome />} />
                    <Route path="profile" element={<BuyerProfilePage />} />
                    <Route path="chat" element={<BuyerChatPage />} />
                    <Route path="bsm" element={<BuyerBSMPage />} />
                    <Route path="calendar" element={<BuyerCalendarPage />} />
                    <Route path="invoices" element={<BuyerInvoicesPage />} />
                    <Route path="notifications" element={<BuyerNotificationsPage />} />
                    <Route path="documentation" element={<BuyerDocumentationPage />} />
                    <Route path="feedback" element={<BuyerFeedbackForm />} />

                  </Route>
                </Routes>
              </Suspense>
              <VisitorRegistrationDrawer open={visitorDrawerOpen} onClose={closeVisitorDrawer} />
            </BuyerAuthProvider>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );
};

export default App;
