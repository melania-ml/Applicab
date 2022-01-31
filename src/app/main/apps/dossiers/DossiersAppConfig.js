import { lazy } from "react";

const DossiersApp = lazy(() => import("./DossiersApp"));
const NewDossier = lazy(() => import("./dossier/Dossier"));

const DossiersAppConfig = {
  settings: {
    layout: {},
  },
  routes: [
    {
      path: "apps/dossiers/all",
      element: <DossiersApp />,
    },
    {
      path: "apps/dossiers/new",
      element: <NewDossier />,
    },
  ],
};

export default DossiersAppConfig;
