import jwtService from "app/services/jwtService";
import { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "@reduxjs/toolkit";
import { hideMessage, showMessage } from "app/store/fuse/messageSlice";

import {
  setUserDataFirebase,
  setUserDataAuth0,
  setUserData,
  logoutUser
} from "./store/userSlice";

class Auth extends Component {
  componentDidMount() {
    return Promise.all([this.jwtCheck()]);
  }

  jwtCheck = () =>
    new Promise((resolve) => {
      jwtService.handleAuthentication();
      jwtService.on("onAutoLogin", () => {
        this.props.showMessage({ message: "Logging in with JWT" });
        resolve();
      });
      return Promise.resolve();
    });

  render() {
    return <>{this.props.children}</>;
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      logout: logoutUser,
      setUserData,
      setUserDataAuth0,
      setUserDataFirebase,
      showMessage,
      hideMessage
    },
    dispatch
  );
}

export default connect(null, mapDispatchToProps)(Auth);
