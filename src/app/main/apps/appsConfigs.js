import DashboardAppConfig from "./dashboard/DashboardAppConfig";
import DossiersAppConfig from "./dossiers/DossiersAppConfig";
import ContactsAppConfig from "./contacts/ContactsAppConfig";
import LawyerAppConfig from "./lawyer/LawyerAppConfig";
import Error404PageConfig from "./errors/404/Error404PageConfig";
import ClientDashboardAppConfig from "./clientDashboard/ClientDashboardAppConfig";
import MessagesAppConfig from "./messages/MessageAppConfig";
import FaqAppConfig from "./faq/FaqAppConfig";

const appsConfigs = [
  DashboardAppConfig,
  DossiersAppConfig,
  ContactsAppConfig,
  LawyerAppConfig,
  Error404PageConfig,
  ClientDashboardAppConfig,
  MessagesAppConfig,
  FaqAppConfig
];

export default appsConfigs;
