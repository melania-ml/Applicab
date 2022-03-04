import { lazy } from 'react';

const FaqsPage = lazy(() => import('./components/FaqsPage'));

const FaqPageConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  routes: [
    {
      path: 'pages/faq',
      element: <FaqsPage />,
    },
  ],
};

export default FaqPageConfig;
