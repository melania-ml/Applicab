import FuseUtils from "@fuse/utils";
import appsConfigs from "app/main/apps/appsConfigs";
import LoginConfig from "app/main/login/LoginConfig";
import ForgotPasswordConfig from "app/main/forgotPassword/ForgotPasswordConfig";
import ResetPasswordConfig from "app/main/resetPassword/ResetPasswordConfig";
import VerifyEmailConfig from "app/main/verifyEmail/VerifyEmailConfig";
import CreatePasswordConfig from "app/main/createPassword/CreatePasswordConfig";
import FuseLoading from "@fuse/core/FuseLoading";
import { Navigate } from "react-router-dom";

const routeConfigs = [
  ...appsConfigs,
  LoginConfig,
  ForgotPasswordConfig,
  ResetPasswordConfig,
  VerifyEmailConfig,
  CreatePasswordConfig,
];

const routes = [
  // if you want to make whole app auth protected by default change defaultAuth for example:
  // ...FuseUtils.generateRoutesFromConfigs(routeConfigs, ['admin','staff','user']),
  // The individual route configs which has auth option won't be overridden.
  ...FuseUtils.generateRoutesFromConfigs(routeConfigs, null),
  {
    path: "/",
    //element: <Navigate to="apps/dashboard" />,
    element: <Navigate to="/login" />,
  },
  {
    path: "loading",
    element: <FuseLoading />,
  },
  {
    path: "*",
    element: <Navigate to="pages/errors/error-404" />,
  },
];

export default routes;
