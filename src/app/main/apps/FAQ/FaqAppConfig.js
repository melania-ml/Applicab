import { lazy } from "react";

const FaqApp = lazy(() => import("./FaqApp"));

const FaqAppConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  routes: [
    {
      path: "apps/faq",
      element: <FaqApp />,
    },
  ],
};

export default FaqAppConfig;
