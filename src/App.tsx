import { useState, lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import Layout from "@/components/layout/Layout";
const Index = lazy(() => import("./pages/Index"));
const About = lazy(() => import("./pages/About"));
const AdvisoryBoard = lazy(() => import("./pages/AdvisoryBoard"));
const Exhibition = lazy(() => import("./pages/Exhibition"));
const ExhibitorProfile = lazy(() => import("./pages/ExhibitorProfile"));
const Partners = lazy(() => import("./pages/Partners"));
const Conference = lazy(() => import("./pages/Conference"));
const Exhibitors = lazy(() => import("./pages/Exhibitors"));
const WhyExhibit = lazy(() => import("./pages/WhyExhibit"));
const BookAStand = lazy(() => import("./pages/BookAStand"));
const Blog = lazy(() => import("./pages/Blog"));
const BlogDetail = lazy(() => import("./pages/BlogDetail"));
const Contact = lazy(() => import("./pages/Contact"));
const Gallery = lazy(() => import("./pages/Gallery"));
const VisitorRegistration = lazy(() => import("./pages/VisitorRegistration"));
const BuyerRegistration = lazy(() => import("./pages/BuyerRegistration"));
const InternationalBuyerRegistration = lazy(() => import("./pages/InternationalBuyerRegistration"));
const TravelAccommodation = lazy(() => import("./pages/TravelAccommodation"));
const MediaRegistration = lazy(() => import("./pages/MediaRegistration"));
const SpeakerRegistration = lazy(() => import("./pages/SpeakerRegistration"));
const SellerRegistration = lazy(() => import("./pages/SellerRegistration"));
const StallDesigningVendors = lazy(() => import("./pages/StallDesigningVendors"));
const NotFound = lazy(() => import("./pages/NotFound"));
const EPromotion = lazy(() => import("./pages/EPromotion"));
const DownloadBadge = lazy(() => import("./pages/DownloadBadge"));
const WhyVisit = lazy(() => import("./pages/WhyVisit"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const TermsOfService = lazy(() => import("./pages/TermsOfService"));
const RefundPolicy = lazy(() => import("./pages/RefundPolicy"));
const ExhibitorLogin = lazy(() => import("./pages/ExhibitorLogin"));
const ExhibitorDashboard = lazy(() => import("./pages/ExhibitorDashboard"));
const ExhibitorDashboardHome = lazy(() => import("./pages/exhibitor/ExhibitorDashboardHome"));
const ExhibitorProfilePage = lazy(() => import("./pages/exhibitor/ExhibitorProfilePage"));
const ExhibitorInvoicesPage = lazy(() => import("./pages/exhibitor/ExhibitorInvoicesPage"));
const ExhibitorBSMPage = lazy(() => import("./pages/exhibitor/ExhibitorBSMPage"));
const ExhibitorCalendarPage = lazy(() => import("./pages/exhibitor/ExhibitorCalendarPage"));
const ExhibitorAccessoriesPage = lazy(() => import("./pages/exhibitor/ExhibitorAccessoriesPage"));
const ExhibitorMarketingPage = lazy(() => import("./pages/exhibitor/ExhibitorMarketingPage"));
const ExhibitorChatPage = lazy(() => import("./pages/exhibitor/ExhibitorChatPage"));
const ExhibitorMSMEPage = lazy(() => import("./pages/exhibitor/ExhibitorMSMEPage"));
const ExhibitorStallManagementPage = lazy(() => import("./pages/exhibitor/ExhibitorStallManagementPage"));
const ExhibitorEventsPage = lazy(() => import("./pages/exhibitor/ExhibitorEventsPage"));
const ExhibitorDocumentsPage = lazy(() => import("./pages/exhibitor/ExhibitorDocumentsPage"));
const AnnexureC = lazy(() => import("./pages/psmClaim/AnnexureC"));
const Declaration = lazy(() => import("./pages/psmClaim/Declaration"));
const FeedbackReport = lazy(() => import("./pages/psmClaim/FeedbackReport"));
const Undertaking = lazy(() => import("./pages/psmClaim/Undertaking"));
const PreReceipt = lazy(() => import("./pages/psmClaim/PreReceipt"));
const PsmReports = lazy(() => import("./pages/psmClaim/PsmReports"));
const PsmReportsTable = lazy(() => import("./pages/psmClaim/PsmReportsTable"));
const ExhibitorFeedbackForm = lazy(() => import("./pages/exhibitor/ExhibitorFeedbackForm"));
const BuyerFeedbackForm = lazy(() => import("./pages/buyer/dashboard/BuyerFeedbackForm"));
const BuyerLanding = lazy(() => import("./pages/BuyerLanding"));
const VisitorScan = lazy(() => import("./pages/VisitorScan"));
const BuyerScan = lazy(() => import("./pages/BuyerScan"));
const BuyerLogin = lazy(() => import("./pages/BuyerLogin"));
import BuyerDashboardLayout from "./pages/buyer/BuyerDashboardLayout";
import BuyerOverview from "./pages/buyer/dashboard/Overview";
import BuyerRegistrationProfile from "./pages/buyer/dashboard/RegistrationProfile";
import BuyerDetailsPage from "./pages/buyer/dashboard/BuyerDetails";
import BuyerExhibitors from "./pages/buyer/dashboard/Exhibitors";
import BuyerDirectoryPage from "./pages/buyer/dashboard/BuyerDirectory";
import BuyerPaymentInfo from "./pages/buyer/dashboard/PaymentInfo";
import BuyerHistory from "./pages/buyer/dashboard/History";
import { AuthProvider as BuyerAuthProvider } from "@/context/BuyerAuthContext";
import VisitorRegistrationDrawer from "@/components/VisitorRegistrationDrawer";
import { HelmetProvider } from "react-helmet-async";
import SeoHelmet from "@/components/SeoHelmet";
import BrochureDownloadPopup from "@/components/home/BrochureDownloadPopup";
import AnnexureD from "@/pages/psmClaim/AnnexureD";
import ParticipantsFeedback from "@/pages/psmClaim/ParticipantsFeedback";
import MandateForm from "@/pages/psmClaim/MandateForm";
import PaymentReminders from "@/pages/navbar_page/PaymentReminders";
import Notification from "@/pages/navbar_page/Notification";
import RelationshipManager from "@/pages/navbar_page/RelationshipManager";
import ExProfile from "@/pages/navbar_page/ExProfile";

const queryClient = new QueryClient();

const App = () => {
  const [visitorDrawerOpen, setVisitorDrawerOpen] = useState(false);

  const openVisitorDrawer = () => setVisitorDrawerOpen(true);
  const closeVisitorDrawer = () => setVisitorDrawerOpen(false);

  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <BrowserRouter>
            <BuyerAuthProvider>
              <Toaster />
              <Sonner />
              <BrochureDownloadPopup />
              <SeoHelmet />
            <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-slate-50"><div className="w-10 h-10 border-4 border-[#23471d] border-t-transparent rounded-full animate-spin"></div></div>}>
              <Routes>
                <Route element={<Layout onRegisterVisit={openVisitorDrawer}><Outlet /></Layout>}>
                  <Route path="/" element={<Index onRegisterVisit={openVisitorDrawer} />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/advisory-board" element={<AdvisoryBoard />} />
                  <Route path="/exhibitor-profile" element={<ExhibitorProfile />} />
                  <Route path="/book-a-stand" element={<BookAStand />} />
                  <Route path="/visitor-registration" element={<VisitorRegistration />} />
                  <Route path="/exhibition" element={<Exhibition />} />
                  <Route path="/media-registration" element={<MediaRegistration />} />
                  <Route path="/speaker-registration" element={<SpeakerRegistration />} />
                  <Route path="/seller-registration" element={<SellerRegistration />} />
                  <Route path="/stall-designing-vendors" element={<StallDesigningVendors />} />
                  <Route path="/why-exhibit" element={<WhyExhibit />} />
                  <Route path="/partners" element={<Partners />} />
                  <Route path="/conference" element={<Conference />} />
                  <Route path="/exhibitors" element={<Exhibitors />} />
                  <Route path="/blog" element={<Blog />} />
                  <Route path="/blog/:id" element={<BlogDetail />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/gallery" element={<Gallery />} />
                  <Route path="/travel-accommodation" element={<TravelAccommodation />} />
                  <Route path="/e-promotion" element={<EPromotion />} />
                  <Route path="/download-badge" element={<DownloadBadge />} />
                  <Route path="/why-visit" element={<WhyVisit />} />
                  <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                  <Route path="/terms-of-service" element={<TermsOfService />} />
                  <Route path="/refund-policy" element={<RefundPolicy />} />
                  <Route path="/buyer-registration" element={<BuyerLanding />} />
                  <Route path="/buyer-registration-form" element={<BuyerRegistration />} />
                  <Route path="/international-buyer-registration" element={<InternationalBuyerRegistration />} />
                  <Route path="*" element={<NotFound />} />
                </Route>

                <Route path="/exhibitor-login" element={<ExhibitorLogin />} />
                <Route path="/buyer-login" element={<BuyerLogin />} />
                <Route path="/exhibitor-dashboard" element={<ExhibitorDashboard />}>
                  <Route index element={<ExhibitorDashboardHome />} />
                  <Route path="profile" element={<ExhibitorProfilePage />} />
                  <Route path="invoices" element={<ExhibitorInvoicesPage />} />
                  <Route path="accessories" element={<ExhibitorAccessoriesPage />} />
                  <Route path="stall-management" element={<ExhibitorStallManagementPage />} />
                  <Route path="marketing" element={<ExhibitorMarketingPage />} />
                  <Route path="bsm" element={<ExhibitorBSMPage />} />
                  <Route path="calendar" element={<ExhibitorCalendarPage />} />
                  <Route path="chat" element={<ExhibitorChatPage />} />
                  <Route path="msme" element={<ExhibitorMSMEPage />} />
                  <Route path="psm-claim">
                    <Route index element={<ExhibitorMSMEPage />} />
                    <Route path="reports" element={<PsmReports />} />
                    <Route path="reports/:type" element={<PsmReports />} />
                    <Route path="reports/:type/:id" element={<PsmReports />} />
                    <Route path="reports-table" element={<PsmReportsTable />} />
                    <Route path="reports-table/:type" element={<PsmReportsTable />} />
                  </Route>
                  <Route path="exhibitions" element={<ExhibitorEventsPage />} />
                  <Route path="documentation" element={<ExhibitorDocumentsPage />} />
                  <Route path="participants-feedback" element={<ParticipantsFeedback />} />
                  <Route path="mandate-form" element={<MandateForm />} />
                  <Route path="reminders" element={<PaymentReminders />} />
                  <Route path="notification" element={<Notification />} />
                  <Route path="relationship-manager" element={<RelationshipManager />} />
                  <Route path="feedback" element={<ExhibitorFeedbackForm />} />
                  <Route path="ex-profile" element={<ExProfile />} />
                </Route>
                <Route path="/visitor" element={<VisitorScan />} />
                <Route path="/buyer-scan" element={<BuyerScan />} />

                {/* Buyer Dashboard Routes */}
                <Route path="/buyer-dashboard" element={<BuyerDashboardLayout />}>
                  <Route index element={<BuyerOverview />} />
                  <Route path="profile" element={<BuyerRegistrationProfile />} />
                  <Route path="details" element={<BuyerDetailsPage />} />
                  <Route path="exhibitors" element={<BuyerExhibitors />} />
                  <Route path="directory" element={<BuyerDirectoryPage />} />
                  <Route path="payments" element={<BuyerPaymentInfo />} />
                  <Route path="history" element={<BuyerHistory />} />
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
