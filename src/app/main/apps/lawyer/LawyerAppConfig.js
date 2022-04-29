import { lazy } from "react";

const LawyerApp = lazy(() => import("./LawyerApp"));

const LawyerAppConfig = {
  routes: [
    {
      path: "apps/lawyers/all",
      element: <LawyerApp />
    }
  ]
};

export default LawyerAppConfig;
