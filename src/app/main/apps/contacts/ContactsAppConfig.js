import { lazy } from "react";

const ContactsApp = lazy(() => import("./ContactsApp"));

const ContactsAppConfig = {
  routes: [
    {
      path: "apps/contacts",
      element: <ContactsApp />
    }
  ]
};

export default ContactsAppConfig;
