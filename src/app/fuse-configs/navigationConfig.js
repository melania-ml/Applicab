const navigationConfig = [
  {
    id: "calendar",
    title: "Dashboard",
    type: "item",
    icon: "dashboard",
    url: "apps/dashboard",
    access: ["Lawyer"]
  },
  {
    id: "contacts",
    title: "Contacts",
    type: "item",
    icon: "account_box",
    url: "apps/contacts/all",
    access: ["Lawyer"]
  },
  {
    id: "dossiers",
    title: "Dossiers",
    type: "item",
    icon: "view_column",
    url: "apps/dossiers/all",
    access: ["Lawyer"]
  },
  {
    id: "client_dashboard",
    title: "Dashboard",
    type: "item",
    icon: "dashboard",
    url: "apps/client_dashboard",
    access: ["Client"]
  },
  {
    id: "message",
    title: "Messages",
    type: "item",
    icon: "mail",
    url: "apps/messages/all",
    access: ["Client"]
  },
  {
    id: "faq",
    title: "Foire aux Questions",
    type: "item",
    icon: "help_outline",
    url: "apps/faq",
    access: ["Client"]
  },
  {
    id: "lawyer",
    title: "Lawyers",
    type: "item",
    icon: "account_box",
    url: "apps/lawyers/all",
    access: ["Admin"]
  }
];
export default navigationConfig;
