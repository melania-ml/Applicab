import { lazy } from "react";

const DossiersApp = lazy(() => import("./DossiersApp"));
const NewDossier = lazy(() => import("./dossier/Dossier"));

const DossiersAppConfig = {
  routes: [
    {
      path: "apps/dossiers",
      element: <DossiersApp />
    },
    {
      path: "apps/dossiers/:id",
      element: <NewDossier />
    }
  ]
};

export default DossiersAppConfig;
