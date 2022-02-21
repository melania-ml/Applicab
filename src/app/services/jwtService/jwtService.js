import FuseUtils from "@fuse/utils/FuseUtils";
import axios from "axios";
import jwtDecode from "jwt-decode";
/* eslint-disable camelcase */

class JwtService extends FuseUtils.EventEmitter {
  init() {
    this.setInterceptors();
    this.handleAuthentication();
  }

  handleAuthentication = () => {
    const access_token = this.getAccessToken();
    if (!access_token) {
      this.emit("onNoAccessToken");

      return;
    }
    if (access_token) {
      this.setSession(access_token);
      this.emit("onAutoLogin", true);
    }
  };

  signInWithEmailAndPassword = (email, password) => {
    return new Promise((resolve, reject) => {
      axios
        .post("auth/user/loginClient", {
          email,
          password
        })
        .then((response) => {
          if (response.data.data.email) {
            this.setSession(response.data.data.jwtoken);
            resolve(response.data);
          } else {
            reject(response.data.error);
          }
        });
    });
  };

  getForgotPasswordMail = ({ email }) => {
    return new Promise((resolve, reject) => {
      axios
        .post("auth/user/forgotPassword", {
          email
        })
        .then((response) => {
          if (response.data.data.email_shared) {
            resolve(response.data);
          } else {
            reject(response.data.error);
          }
        });
    });
  };

  postCallResetPassword = ({ params }) => {
    const { forgotPasswordToken, password } = params;
    return new Promise((resolve, reject) => {
      axios
        .put("auth/user/changePassword", {
          forgotPasswordToken,
          password
        })
        .then((response) => {
          if (response.data.data.password_changed) {
            resolve(response.data);
          } else {
            reject(response.data.error);
          }
        });
    });
  };

  updateUserData = (user) => {
    return axios.post("/api/auth/user/update", {
      user
    });
  };

  setSession = (access_token) => {
    if (access_token) {
      localStorage.setItem("jwt_access_token", access_token);
      console.log("axios.defaults", axios.defaults);
      axios.defaults.headers.common.Authorization = `Bearer ${access_token}`;
    } else {
      localStorage.removeItem("jwt_access_token");
      delete axios.defaults.headers.common.Authorization;
    }
  };

  logout = () => {
    this.setSession(null);
  };

  isAuthTokenValid = (access_token) => {
    if (!access_token) {
      return false;
    }
    const decoded = jwtDecode(access_token);
    const currentTime = Date.now() / 1000;
    if (decoded.exp < currentTime) {
      console.warn("access token expired");
      return false;
    }

    return true;
  };

  getAccessToken = () => {
    return window.localStorage.getItem("jwt_access_token");
  };
}

const instance = new JwtService();

export default instance;
