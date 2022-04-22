import { lazy } from "react";

const DashboardApp = lazy(() => import("./DashboardApp"));

const DashboardAppConfig = {
  routes: [
    {
      path: "apps/dashboard",
      element: <DashboardApp />
    }
  ]
};

export default DashboardAppConfig;
