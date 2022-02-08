import { authRoles } from "app/auth";
import VerifyEmail from "./VerifyEmail";

const VerifyEmailConfig = {
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
  auth: authRoles.onlyGuest,
  routes: [
    {
      path: "verifyEmail/54",
      element: <VerifyEmail />
    }
  ]
};

export default VerifyEmailConfig;
