// *********************** lAWYER DASHBOARD *****************************************
// import AcademyAppConfig from './academy/AcademyAppConfig';
import DashboardAppConfig from "./dashboard/DashboardAppConfig";
import DossiersAppConfig from "./dossiers/DossiersAppConfig";
import ContactsAppConfig from "./contacts/ContactsAppConfig";
import Error404PageConfig from "./errors/404/Error404PageConfig";
// import AnalyticsDashboardAppConfig from './dashboards/analytics/AnalyticsDashboardAppConfig';
// import ProjectDashboardAppConfig from './dashboards/project/ProjectDashboardAppConfig';
// import ECommerceAppConfig from './e-commerce/ECommerceAppConfig';
// import FileManagerAppConfig from './file-manager/FileManagerAppConfig';
// import MailAppConfig from './mail/MailAppConfig';
// import NotesAppConfig from './notes/NotesAppConfig';
// import ScrumboardAppConfig from './scrumboard/ScrumboardAppConfig';
// import TodoAppConfig from './todo/TodoAppConfig';
// import EtapesAppConfig from "./Etapes/EtapesAppConfig";
//import EmailAppConfig from "./Email/EmailAppConfig";
// import NaturesAppConfig from './Natures/NaturesAppConfig';
// import ApplicabAppConfig from './Applicab/ApplicabAppConfig';

// *********************** CLIENT DASHBOARD *****************************************
// import MessageAppConfig from "./Messages/MessageAppConfig";
import ClientDashboardAppConfig from "./ClientDashboard/ClientDashboardAppConfig";
import ChatAppConfig from "./chat/ChatAppConfig";
import FaqAppConfig from "./FAQ/FaqAppConfig";

const appsConfigs = [
  DashboardAppConfig,
  ContactsAppConfig,
  DossiersAppConfig,
  Error404PageConfig,
  // AnalyticsDashboardAppConfig,
  // ProjectDashboardAppConfig,
  // MailAppConfig,
  // TodoAppConfig,
  // FileManagerAppConfig,
  // ECommerceAppConfig,
  // ScrumboardAppConfig,
  // AcademyAppConfig,
  // NotesAppConfig,
  // EtapesAppConfig,
  //EmailAppConfig,
  // NaturesAppConfig,
  // ApplicabAppConfig

  //*********client Dashboard*********
  ClientDashboardAppConfig,
  // MessageAppConfig,
  ChatAppConfig,
  FaqAppConfig
];

export default appsConfigs;
