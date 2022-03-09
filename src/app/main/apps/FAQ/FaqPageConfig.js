import { lazy } from "react";

const FaqsPage = lazy(() => import("./FaqsPage"));

const FaqPageConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  routes: [
    {
      path: "apps/faq",
      element: <FaqsPage />,
    },
  ],
};

export default FaqPageConfig;
