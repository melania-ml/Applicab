import { Provider, useDispatch } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import axios from "axios";
import BrowserRouter from "@fuse/core/BrowserRouter";
import FuseAuthorization from "@fuse/core/FuseAuthorization";
import FuseLayout from "@fuse/core/FuseLayout";
import FuseTheme from "@fuse/core/FuseTheme";
import { SnackbarProvider } from "notistack";
import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import withAppProviders from "./withAppProviders";
import { Auth } from "./auth";
import store, { persistor } from "./store";
import { logoutUser } from "app/auth/store/userSlice";
import { BASE_URL } from "app/config";

const emotionCacheOptions = {
  ltr: {
    key: "muiltr",
    stylisPlugins: [],
    insertionPoint: document.getElementById("emotion-insertion-point")
  }
};

const App = () => {
  const dispatch = useDispatch();
  axios.defaults.baseURL = BASE_URL;

  axios.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error.response) {
        if (parseInt(error.response.data.status) === 403) {
          dispatch(logoutUser());
          return;
        }
      }
      return Promise.reject(error);
    }
  );
  return (
    <CacheProvider value={createCache(emotionCacheOptions.ltr)}>
      <Auth>
        <BrowserRouter>
          <FuseAuthorization>
            <FuseTheme>
              <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                  <SnackbarProvider
                    maxSnack={5}
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "right"
                    }}
                    classes={{
                      containerRoot:
                        "bottom-0 right-0 mb-52 md:mb-68 mr-8 lg:mr-80 z-99"
                    }}
                  >
                    <FuseLayout />
                  </SnackbarProvider>
                </PersistGate>
              </Provider>
            </FuseTheme>
          </FuseAuthorization>
        </BrowserRouter>
      </Auth>
    </CacheProvider>
  );
};

export default withAppProviders(App)();
