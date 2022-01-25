import AcademyAppConfig from './academy/AcademyAppConfig';
import DashboardAppConfig from './dashboard/DashboardAppConfig';
import DossiersAppConfig from './dossiers/DossiersAppConfig';
import ChatAppConfig from './chat/ChatAppConfig';
import ContactsAppConfig from './contacts/ContactsAppConfig';
import AnalyticsDashboardAppConfig from './dashboards/analytics/AnalyticsDashboardAppConfig';
import ProjectDashboardAppConfig from './dashboards/project/ProjectDashboardAppConfig';
import ECommerceAppConfig from './e-commerce/ECommerceAppConfig';
import FileManagerAppConfig from './file-manager/FileManagerAppConfig';
import MailAppConfig from './mail/MailAppConfig';
import NotesAppConfig from './notes/NotesAppConfig';
import ScrumboardAppConfig from './scrumboard/ScrumboardAppConfig';
import TodoAppConfig from './todo/TodoAppConfig';

const appsConfigs = [
  AnalyticsDashboardAppConfig,
  ProjectDashboardAppConfig,
  MailAppConfig,
  TodoAppConfig,
  FileManagerAppConfig,
  ContactsAppConfig,
  DashboardAppConfig,
  ChatAppConfig,
  ECommerceAppConfig,
  ScrumboardAppConfig,
  AcademyAppConfig,
  NotesAppConfig,
  DossiersAppConfig
];

export default appsConfigs;
