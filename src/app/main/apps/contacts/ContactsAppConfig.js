import { lazy } from "react";

const ContactsApp = lazy(() => import("./ContactsApp"));

const ContactsAppConfig = {
  routes: [
    {
      path: "apps/contacts/all",
      element: <ContactsApp />
    }
  ]
};

export default ContactsAppConfig;
