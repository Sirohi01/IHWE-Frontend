import React, { lazy } from "react";
import { Route, Outlet } from "react-router-dom";
import Layout from "@/components/layout/Layout";

const Index = lazy(() => import("../pages/Index"));
const About = lazy(() => import("../pages/about"));
const AdvisoryBoard = lazy(() => import("../pages/AdvisoryBoard"));
const Advisory = lazy(() => import("../pages/Advisory"));
const Exhibition = lazy(() => import("../pages/Exhibition"));
const ExhibitorProfile = lazy(() => import("../pages/ExhibitorProfile"));
const Partners = lazy(() => import("../pages/Partners"));
const Conference = lazy(() => import("../pages/Conference"));
const Exhibitors = lazy(() => import("../pages/Exhibitors"));
const WhyExhibit = lazy(() => import("../pages/WhyExhibit"));
const BookAStand = lazy(() => import("../pages/book-a-stand"));
const Blog = lazy(() => import("../pages/Blog"));
const BlogAll = lazy(() => import("../pages/BlogAll"));
const BlogDetail = lazy(() => import("../pages/BlogDetail"));
const Contact = lazy(() => import("../pages/contact"));
const Gallery = lazy(() => import("../pages/Gallery"));
const BuyerSellerMeet = lazy(() => import("../pages/buyerSellerMeet/BuyerSellerMeet"));
const GovernmentMsmePmsSchemes = lazy(() => import("../pages/governmentMsmePmsSchemes/GovernmentMsmePmsSchemes"));
const VisitorRegistration = lazy(() => import("../pages/visitors/VisitorRegistration"));
const BuyerRegistration = lazy(() => import("../pages/buyer/BuyerRegistration"));
const InternationalBuyerRegistration = lazy(() => import("../pages/buyer/InternationalBuyerRegistration"));
const TravelAccommodation = lazy(() => import("../pages/TravelAccommodation"));
const MediaRegistration = lazy(() => import("../pages/MediaRegistration"));
const SpeakerRegistration = lazy(() => import("../components/conference/Arogyasangostiform"));
const SellerRegistration = lazy(() => import("../pages/SellerRegistration"));
const StallDesigningVendors = lazy(() => import("../pages/StallDesigningVendors"));
const IndustryZoneDetail = lazy(() => import("../pages/IndustryZoneDetail"));
const MsmePmsScheme = lazy(() => import("../pages/governmentMsmePmsSchemes/MsmePmsScheme"));
const HotelStay = lazy(() => import("../pages/support/HotelStay"));
const PrintingBrandingPartner = lazy(() => import("../pages/support/PrintingBrandingPartner"));
const TravelAssistance = lazy(() => import("../pages/support/TravelAssistance"));
const StallDesign = lazy(() => import("../pages/support/StallDesign"));
const LogisticsSupport = lazy(() => import("../pages/support/LogisticsSupport"));
const PrintingBranding = lazy(() => import("../pages/support/PrintingBranding"));
const HospitalityDesk = lazy(() => import("../pages/support/HospitalityDesk"));
const ConferenceDayUnified = lazy(() => import("../pages/ConferenceDayNew"));
const TravelPartner = lazy(() => import("../pages/TravelPartner"));
const HotelStayPartner = lazy(() => import("../pages/HotelStayPartner"));
const NotFound = lazy(() => import("../pages/NotFound"));
const Sponsership = lazy(() => import("../pages/Sponsership"));
const EPromotion = lazy(() => import("../pages/EPromotion"));
const Partnership = lazy(() => import("../pages/Partnership"));
const Fabricationpartner = lazy(() => import("../pages/Fabricationpartner"));
const PartnerRegistration = lazy(() => import("../pages/PartnerRegistration"));
const LogisticPartner = lazy(() => import("../pages/LogisticPartner"));
const DownloadBadge = lazy(() => import("../pages/DownloadBadge"));
const PrivacyPolicy = lazy(() => import("../pages/PrivacyPolicy"));
const TermsOfService = lazy(() => import("../pages/TermsOfService"));
const RefundPolicy = lazy(() => import("../pages/RefundPolicy"));
const PaymentPolicy = lazy(() => import("../pages/PaymentPolicy"));
const CancellationPolicy = lazy(() => import("../pages/CancellationPolicy"));
const EEPromotion = lazy(() => import("../components/dashboard/exhibitor/EPromotion"));
const BuyerLanding = lazy(() => import("../pages/BuyerLanding"));
const HospitalityPartner = lazy(() => import("../pages/HospitalityPartner"));
const AddInternationalVistor = lazy(() => import("@/pages/visitors/international_vistor/AddInternationalVistor"));
const WhyVisit = lazy(() => import("@/pages/why_visit/WhyVisit"));
const EPromotionWeb = lazy(() => import("../pages/e_promotion_webPage/EPromotionWeb"));
const DelegateRegistrationDetails = lazy(() => import("../pages/delegate/DelegateRegistrationDetails"));
const Awards = lazy(() => import("../pages/awards/Awards"));
const NominationFormPage = lazy(() => import("../pages/awards/NominationFormPage"));
const DelegateRegistration = lazy(() => import("@/pages/delegate/DelegateRegistration"));
const GroupRegistration = lazy(() => import("@/pages/visitors/GroupRegistration"));
const PaperPresentation = lazy(() => import("../pages/presentation/PaperPresentation"));
const PosterPresentation = lazy(() => import("../pages/presentation/PosterPresentation"));
const AbstractPresentation = lazy(() => import("../pages/presentation/AbstractPresentation"));

export const PublicRoutes = (openVisitorDrawer: () => void) => (
<>
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
                    <Route path="/conference/paper-presentation" element={<PaperPresentation />} />
                    <Route path="/conference/poster-presentation" element={<PosterPresentation />} />
                    <Route path="/conference/abstract-submission" element={<AbstractPresentation />} />
                    <Route path="/delegate-registration" element={<DelegateRegistration />} />
                    <Route path="/delegate-registration-details" element={<DelegateRegistrationDetails />} />
                    <Route path="/group-registration" element={<GroupRegistration />} />
                    <Route path="/exhibitors" element={<Exhibitors />} />
                    <Route path="/blog" element={<Blog />} />
                    <Route path="/blog/all" element={<BlogAll />} />
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
                    <Route path="*" element={<NotFound />} />
                  </Route>

</>);
