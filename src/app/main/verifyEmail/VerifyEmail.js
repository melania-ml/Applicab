import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import _ from "@lodash";
import withReducer from "app/store/withReducer";
import reducer from "./store";
import { showMessage } from "app/store/fuse/messageSlice";
import OTPInput, { ResendOTP } from "otp-input-react";

//material-ui
import { styled, darken } from "@mui/material/styles";
import {
  Typography,
  Button,
  TextField,
  InputAdornment,
  Icon,
  Card,
  CardContent
} from "@mui/material";
import { motion } from "framer-motion";

import { callForgotPassword } from "./store/verifyEmailSlice";
import { color } from "@mui/system";

const Root = styled("div")(({ theme }) => ({
  background: `linear-gradient(to right, ${
    theme.palette.primary.dark
  } 0%, ${darken(theme.palette.primary.dark, 0.5)} 100%)`,
  color: theme.palette.primary.contrastText,

  "& .Register-leftSection": {
    width: "50%"
  },

  "& .Register-rightSection": {
    background: `linear-gradient(to right, ${
      theme.palette.primary.dark
    } 0%, ${darken(theme.palette.primary.dark, 0.5)} 100%)`,
    color: theme.palette.primary.contrastText
  }
}));

function VerifyEmail() {
  const [otp, setOtp] = useState("");
  const dispatch = useDispatch();
  // const forgotPasswordState = useSelector(
  //   ({ forgotPassword }) => forgotPassword.forgotPassword
  // );
  function onSubmit(model) {
    dispatch(callForgotPassword(model));
  }

  return (
    <Root className="flex flex-col flex-auto items-center justify-center shrink-0">
      <motion.div
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex w-full max-w-400 md:max-w-full shadow-2xl overflow-hidden h-full"
      >
        <Card
          className="Register-leftSection flex flex-col w-full items-center justify-center shadow-0"
          square
        >
          <CardContent className="flex flex-col items-center justify-center w-full max-w-400">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { delay: 0.2 } }}
            >
              <div className="flex items-center mb-48">
                <img src="assets/images/logos/login.svg" alt="logo" />
              </div>
            </motion.div>

            <div className="w-full">
              <form
                className="flex flex-col justify-center w-full"
                //onSubmit={handleSubmit(onSubmit)}
              >
                <div className="mb-14 text-center">
                  <h2>
                    <b>Vérifiez votre identité</b>
                  </h2>
                </div>
                <div className="flex" style={{ background: "#FCF1F1" }}>
                  <img
                    className="m-5"
                    src="assets/icons/custom-svgs/warning.svg"
                    alt="warning"
                  />
                  <span className="m-5">
                    Vous avez saisi un code confidentiel incorrect, expiré ou
                    déjà utilisé.
                  </span>
                </div>
                <br />
                <div className="mb-16 text-center">
                  <span>
                    Saisissez le code que nous avons envoyé au
                    melania@altata.tech
                  </span>
                </div>
                <br />
                <OTPInput
                  style={{ justifyContent: "center", marginLeft: 10 }}
                  value={otp}
                  onChange={setOtp}
                  OTPLength={6}
                  otpType="number"
                  disabled={false}
                  inputStyles={{ border: "1px solid gray", marginRight: 10 }}
                />
                <br />
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  className="w-full mx-auto mt-16"
                  aria-label="REGISTER"
                  //disabled={_.isEmpty(dirtyFields) || !isValid}
                  value="legacy"
                >
                  Vérifier
                </Button>
                <br />
                <div className="flex flex-col items-center justify-center">
                  <div>
                    <Link className="font-normal align-center" to="/">
                      Renvoyer le code
                    </Link>
                  </div>
                </div>
              </form>
            </div>
          </CardContent>
        </Card>

        <div className="Register-rightSection hidden md:flex flex-1 items-center justify-center p-64">
          <div className="max-w-500">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0, transition: { delay: 0.2 } }}
            >
              <Typography
                variant="h3"
                color="inherit"
                className="font-semibold leading-tight"
              >
                AppliCab crée et maintient <br />
                le lien entre l'avocat et son <br />
                client
              </Typography>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { delay: 0.3 } }}
            >
              <Typography variant="subtitle1" color="inherit" className="mt-32">
                Plateforme de suivi des dossiers et de gestion du cabinet,
                pensée par des avocats pour des avocats
              </Typography>
            </motion.div>
            <br />
            <br />

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { delay: 0.3 } }}
            >
              <a
                href="https://calendly.com/applicab"
                style={{ background: "none" }}
                target={"_blank"}
              >
                <Button variant="contained" color="secondary" className="p-30">
                  Demander une démo
                </Button>
              </a>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </Root>
  );
}

export default withReducer("verifyEmail", reducer)(VerifyEmail);
