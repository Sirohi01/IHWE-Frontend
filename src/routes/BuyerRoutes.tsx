import React, { lazy } from "react";
import { Route, Outlet } from "react-router-dom";


const BuyerFeedbackForm = lazy(() => import("../pages/buyer/dashboard/BuyerFeedbackForm"));
const BuyerDashboard = lazy(() => import("../pages/buyer/BuyerDashboard"));
const BuyerDashboardHome = lazy(() => import("../pages/buyer/BuyerDashboardHome"));
const BuyerProfilePage = lazy(() => import("../pages/buyer/tabs/BuyerProfilePage"));
const BuyerChatPage = lazy(() => import("../pages/buyer/tabs/BuyerChatPage"));
const BuyerBSMPage = lazy(() => import("../pages/buyer/tabs/BuyerBSMPage"));
const BuyerInvoicesPage = lazy(() => import("../pages/buyer/tabs/BuyerInvoicesPage"));
const BuyerNotificationsPage = lazy(() => import("../pages/buyer/tabs/BuyerNotificationsPage"));
const BuyerCalendarPage = lazy(() => import("../pages/buyer/tabs/BuyerCalendarPage"));
const BuyerDocumentationPage = lazy(() => import("../pages/buyer/tabs/BuyerPlaceholders").then(m => ({ default: m.BuyerDocumentationPage })));

export const BuyerRoutes = () => (
<>
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

</>);
