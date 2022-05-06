import { lazy } from "react";

const ClientDashboardApp = lazy(() => import("./ClientDashboardApp"));

const ClientDashboardAppConfig = {
  routes: [
    {
      path: "apps/client_dashboard",
      element: <ClientDashboardApp />
    }
  ]
};

export default ClientDashboardAppConfig;
