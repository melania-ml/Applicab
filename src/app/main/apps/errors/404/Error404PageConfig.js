import { lazy } from "react";

const Error404Page = lazy(() => import("./Error404Page"));

const Error404PageConfig = {
  routes: [
    {
      path: "apps/errors/error-404",
      element: <Error404Page />
    }
  ]
};

export default Error404PageConfig;
