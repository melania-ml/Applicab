import { lazy } from "react";

const EtapesApp = lazy(() => import("./EtapesApp"));
// const NewDossier = lazy(() => import("./dossier/Dossier"));

const EtapesAppConfig = {
  settings: {
    layout: {},
  },
  routes: [
    {
      path: "apps/etapes/all",
      element: <EtapesApp />,
    },
    // {
    //   path: "apps/dossiers/new",
    //   element: <NewDossier />,
    // },
  ],
};

export default EtapesAppConfig;
