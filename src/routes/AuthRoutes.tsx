import React, { lazy } from "react";
import { Route, Outlet } from "react-router-dom";


const ExhibitorLogin = lazy(() => import("../pages/ExhibitorLogin"));
const ExhibitorDocumentPrintPage = lazy(() => import("../pages/exhibitor/ExhibitorDocumentPrintPage"));
const ExhibitorPrintAllInvoicesPage = lazy(() => import("../pages/exhibitor/ExhibitorPrintAllInvoicesPage"));
const VisitorScan = lazy(() => import("../pages/VisitorScan"));
const BuyerScan = lazy(() => import("../pages/BuyerScan"));
const BuyerLogin = lazy(() => import("../pages/BuyerLogin"));
const DelegatesLogin = lazy(() => import("../pages/delegate/DelegatesLogin"));

export const AuthRoutes = () => (
<>
                  <Route path="/exhibitor-login" element={<ExhibitorLogin />} />
                  <Route path="/exhibitor-print/:docType/:docId" element={<ExhibitorDocumentPrintPage />} />
                  <Route path="/exhibitor-print-all" element={<ExhibitorPrintAllInvoicesPage />} />
                  <Route path="/buyer-login" element={<BuyerLogin />} />
                  <Route path="/delegates-login" element={<DelegatesLogin />} />
                  <Route path="/visitor" element={<VisitorScan />} />
                  <Route path="/buyer-scan" element={<BuyerScan />} />

</>);
