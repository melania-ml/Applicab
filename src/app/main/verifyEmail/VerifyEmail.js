import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import withReducer from "app/store/withReducer";
import reducer from "./store";
import history from "@history";
import OTPInput from "otp-input-react";

//material-ui
import { styled, darken } from "@mui/material/styles";
import { Typography, Button, Card, CardContent } from "@mui/material";
import { motion } from "framer-motion";

import { callVerifyEmail, callResendOTP } from "./store/verifyEmailSlice";

const Root = styled("div")(({ theme }) => ({
  background: `linear-gradient(to right, ${
    theme.palette.primary.dark
  } 0%, ${darken(theme.palette.primary.dark, 0.5)} 100%)`,
  color: theme.palette.primary.contrastText,

  "& .email-leftSection": {
    width: "50%",
    "@media (max-width: 767px)": {
      width: "100%"
    }
  },
  "& .leading-tight": {
    "@media (max-width: 767px)": {
      fontSize: "30px"
    }
  },
  "& .email-rightSection": {
    background: `linear-gradient(to right, ${
      theme.palette.primary.dark
    } 0%, ${darken(theme.palette.primary.dark, 0.5)} 100%)`,
    color: theme.palette.primary.contrastText,
    "@media (max-width: 767px)": {
      padding: "30px"
    }
  },
  "& .email-responsive": {
    "@media (max-width: 767px)": {
      display: "block",
      width: "100%"
    }
  },
  "& .MuiCardContent-root": {
    "@media (max-width: 767px)": {
      marginLeft: "auto",
      marginRight: "auto"
    }
  },
  "& .MuiFormControl-root": {
    width: "100%"
  },
  "& .email-leftSection input": {
    outlineColor: "#22d3ee"
  }
}));

function VerifyEmail() {
  const [otp, setOtp] = useState("");
  const searchParam = window.location.pathname.split("/")[2];
  const [isValid, setIsValid] = useState(false);
  const dispatch = useDispatch();
  const verifyEmailState = useSelector(
    ({ verifyEmail }) => verifyEmail.verifyEmail
  );
  function onSubmit() {
    dispatch(callVerifyEmail(otp));
  }

  function onResentOTP() {
    dispatch(callResendOTP({ userId: searchParam }));
  }

  useEffect(() => {
    if (verifyEmailState.success) {
      history.push({
        pathname: "/createPassword"
      });
    }
  }, [verifyEmailState]);

  useEffect(() => {
    if (otp.length === 6) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  }, [otp]);

  return (
    <Root className="flex flex-col flex-auto items-center justify-center shrink-0">
      <motion.div
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex w-full md:max-w-full shadow-2xl overflow-hidden h-full email-responsive"
      >
        <Card
          className="email-leftSection flex flex-col w-full items-center justify-center shadow-0"
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
              <div className="mb-14 text-center">
                <h2>
                  <b>Vérifiez votre identité</b>
                </h2>
              </div>
              <div className="mb-16 text-center">
                <span>Saisissez le code que nous avons envoyé par email</span>
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
                disabled={!isValid}
                value="legacy"
                onClick={onSubmit}
              >
                Vérifier
              </Button>
              <br />
              <div className="flex flex-col items-center justify-center">
                <a
                  className="font-normal mt-8"
                  onClick={onResentOTP}
                  style={{
                    background: "none",
                    color: "#22d3ee",
                    cursor: "pointer"
                  }}
                >
                  Renvoyer le code
                </a>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="email-rightSection md:flex flex-1 items-center justify-center p-64">
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
