import Message from "./Message";

const MessageAppConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  routes: [
    {
      path: "apps/messages",
      element: <Message />,
    },
  ],
};

export default MessageAppConfig;
