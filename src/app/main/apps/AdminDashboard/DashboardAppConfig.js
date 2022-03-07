import { lazy } from "react";

const AdminDashboardApp = lazy(() => import("./adminDashboardApp"));

const AdminDashboardAppConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  routes: [
    {
      path: "apps/client_dashboard",
      element: <AdminDashboardApp />,
    },
  ],
};

export default AdminDashboardAppConfig;
