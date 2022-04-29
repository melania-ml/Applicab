import { lazy } from "react";

const Error404Page = lazy(() => import("./Error404Page"));

const Error404PageConfig = {
  settings: {
    layout: {
      config: {
        navbar: {
          display: false
        },
        toolbar: {
          display: false
        },
        footer: {
          display: false
        },
        leftSidePanel: {
          display: false
        },
        rightSidePanel: {
          display: false
        }
      }
    }
  },
  routes: [
    {
      path: "apps/errors/error-404",
      element: <Error404Page />
    }
  ]
};

export default Error404PageConfig;
