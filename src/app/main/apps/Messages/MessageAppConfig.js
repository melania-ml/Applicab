import { lazy } from "react";

const MessageApp = lazy(() => import("./MessageApp"));

const MessageAppConfig = {
  routes: [
    {
      path: "apps/messages/all",
      element: <MessageApp />
    }
  ]
};

export default MessageAppConfig;
