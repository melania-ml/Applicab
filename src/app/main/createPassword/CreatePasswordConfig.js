import { authRoles } from "app/auth";
import CreatePassword from "./CreatePassword";

const CreatePasswordConfig = {
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
      path: "createPassword",
      element: <CreatePassword />
    }
  ]
};

export default CreatePasswordConfig;
