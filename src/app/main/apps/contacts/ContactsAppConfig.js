import { lazy } from "react";

const ContactsApp = lazy(() => import("./ContactsApp"));

const ContactsAppConfig = {
  settings: {
    layout: {
      config: {}
    }
  },
  routes: [
    {
      path: "apps/contacts/all",
      element: <ContactsApp />
    }
  ]
};

export default ContactsAppConfig;
