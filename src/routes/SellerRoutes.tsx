import React, { lazy } from "react";
import { Route, Outlet } from "react-router-dom";


const ExhibitorBSMPage = lazy(() => import("../pages/exhibitor/ExhibitorBSMPage"));
const ExhibitorAccessoriesPage = lazy(() => import("../pages/exhibitor/ExhibitorAccessoriesPage"));
const ExhibitorMarketingPage = lazy(() => import("../pages/exhibitor/ExhibitorMarketingPage"));
const ExhibitorPaymentPage = lazy(() => import("../pages/exhibitor/ExhibitorPaymentPage"));
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
const SellerCalendarPage = lazy(() => import("@/pages/exhibitor/seller/SellerCalendarPage"));
const SellerFeedbackForm = lazy(() => import("../pages/feedbacks/SellerFeedbackForm"));

export const SellerRoutes = () => (
<>
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

</>);
