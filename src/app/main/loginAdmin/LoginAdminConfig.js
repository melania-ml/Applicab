import { authRoles } from "app/auth";
import LoginAdmin from "./LoginAdmin";

const LoginAdminConfig = {
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
      path: "login_admin",
      element: <LoginAdmin />
    }
  ]
};

export default LoginAdminConfig;
