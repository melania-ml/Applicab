import { lazy } from 'react';
import { Navigate } from 'react-router-dom';

const DossiersApp = lazy(() => import('./DossiersApp'));
const Product = lazy(() => import('./dossier/Dossier'));

const DossiersAppConfig = {
  settings: {
    layout: {},
  },
  routes: [
    {
      path: 'apps/dossiers/:dossiersId/*',
      element: <Product />,
    },
    {
      path: 'apps/dossiers/all',
      element: <DossiersApp />,
    },
  ],
};

export default DossiersAppConfig;
