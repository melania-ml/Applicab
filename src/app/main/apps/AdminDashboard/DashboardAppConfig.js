import { lazy } from 'react';

const DashboardApp = lazy(() => import('./adminDashboardApp'));

const AdminDashboardAppConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  routes: [
    {
      path: 'apps/dashboard',
      element: <DashboardApp />,
    },
  ],
};

export default AdminDashboardAppConfig;
