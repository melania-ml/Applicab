import AcademyAppConfig from "./academy/AcademyAppConfig";
import DashboardAppConfig from "./dashboard/DashboardAppConfig";
import DossiersAppConfig from "./dossiers/DossiersAppConfig";
import ChatAppConfig from "./chat/ChatAppConfig";
import ContactsAppConfig from "./contacts/ContactsAppConfig";
import AnalyticsDashboardAppConfig from "./dashboards/analytics/AnalyticsDashboardAppConfig";
import ProjectDashboardAppConfig from "./dashboards/project/ProjectDashboardAppConfig";

const appsConfigs = [
  AnalyticsDashboardAppConfig,
  ProjectDashboardAppConfig,
  ContactsAppConfig,
  DashboardAppConfig,
  ChatAppConfig,
  AcademyAppConfig,
  DossiersAppConfig
];

export default appsConfigs;
