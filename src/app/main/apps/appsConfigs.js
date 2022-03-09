// *********************** lAWYER DASHBOARD *****************************************
// import AcademyAppConfig from './academy/AcademyAppConfig';
import DashboardAppConfig from "./dashboard/DashboardAppConfig";
import DossiersAppConfig from "./dossiers/DossiersAppConfig";
import ContactsAppConfig from "./contacts/ContactsAppConfig";
// import ChatAppConfig from './chat/ChatAppConfig';
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
import MessageAppConfig from "./Messages/MessageAppConfig";
import FaqAppConfig from "./FAQ/FaqAppConfig";
import ClientDashboardAppConfig from "./ClientDashboard/ClientDashboardAppConfig";

const appsConfigs = [
  DashboardAppConfig,
  ContactsAppConfig,
  DossiersAppConfig,
  // AnalyticsDashboardAppConfig,
  // ProjectDashboardAppConfig,
  // MailAppConfig,
  // TodoAppConfig,
  // FileManagerAppConfig,
  // ChatAppConfig,
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
  MessageAppConfig,
  FaqAppConfig
];

export default appsConfigs;
