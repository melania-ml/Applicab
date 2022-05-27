import { lazy } from "react";

const LawyerApp = lazy(() => import("./LawyerApp"));

const LawyerAppConfig = {
  routes: [
    {
      path: "apps/lawyers",
      element: <LawyerApp />
    }
  ]
};

export default LawyerAppConfig;
