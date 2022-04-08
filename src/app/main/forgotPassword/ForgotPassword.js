import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import _ from "@lodash";
import withReducer from "app/store/withReducer";
import { motion } from "framer-motion";
import reducer from "app/store";

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

import { callForgotPassword } from "app/store/slices/forgotPasswordSlice";

const Root = styled("div")(({ theme }) => ({
  background: `linear-gradient(to right, ${
    theme.palette.primary.dark
  } 0%, ${darken(theme.palette.primary.dark, 0.5)} 100%)`,
  color: theme.palette.primary.contrastText,

  "& .forgotpass-leftSection": {
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

  "& .forgotpass-rightSection": {
    background: `linear-gradient(to right, ${
      theme.palette.primary.dark
    } 0%, ${darken(theme.palette.primary.dark, 0.5)} 100%)`,
    color: theme.palette.primary.contrastText,
    "@media (max-width: 767px)": {
      padding: "30px"
    }
  },
  "& .forgotpass-responsive": {
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
  }
}));

const schema = yup.object().shape({
  email: yup
    .string()
    .email("Saisissez une adresse e-mail valide")
    .required("Saisissez une adresse e-mail")
});

const defaultValues = {
  email: ""
};

function ForgotPassword() {
  const [isConfirmationMessage, setIsConfirmationMessage] = useState(false);

  const { control, formState, handleSubmit, reset, setError } = useForm({
    mode: "onChange",
    defaultValues,
    resolver: yupResolver(schema)
  });
  const dispatch = useDispatch();
  const { success } = useSelector(({ forgotPassword }) => forgotPassword);
  const { isValid, dirtyFields, errors } = formState;

  useEffect(() => {
    if (success) {
      setIsConfirmationMessage(true);
    }
  }, [success]);

  function onSubmit(model) {
    dispatch(callForgotPassword(model));
  }

  return (
    <Root className="flex flex-col flex-auto items-center justify-center shrink-0">
      <motion.div
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex w-full md:max-w-full shadow-2xl overflow-hidden h-full forgotpass-responsive"
      >
        <Card
          className="forgotpass-leftSection flex flex-col w-full items-center justify-center shadow-0"
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
              {!isConfirmationMessage ? (
                <form
                  className="flex flex-col justify-center w-full"
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <Controller
                    control={control}
                    render={({ field }) => (
                      <div className="mb-14 text-center">
                        <h2>
                          <b>Mot de passe oublié ?</b>
                        </h2>
                      </div>
                    )}
                  />
                  <Controller
                    control={control}
                    render={({ field }) => (
                      <div className="mb-16">
                        <span>
                          Saisissez l’adresse e-mail associée à votre compte.
                          Nous vous enverrons un lien par e-mail pour changer
                          votre mot de passe.
                        </span>
                      </div>
                    )}
                  />
                  <Controller
                    name="email"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        className="mb-16"
                        type="text"
                        error={!!errors.email}
                        helperText={errors?.email?.message}
                        label="Email"
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <Icon className="text-20" color="action">
                                email
                              </Icon>
                            </InputAdornment>
                          )
                        }}
                        variant="outlined"
                        required
                      />
                    )}
                  />
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    className="w-full mx-auto mt-16"
                    aria-label="REGISTER"
                    disabled={_.isEmpty(dirtyFields) || !isValid}
                    value="legacy"
                  >
                    Envoyer le lien de réinitialisation
                  </Button>
                </form>
              ) : (
                <>
                  <Controller
                    control={control}
                    render={({ field }) => (
                      <div className="flex mb-14 text-center">
                        <Icon color="success">check_circle</Icon>
                        <h3 className="ml-3">
                          <b>
                            Vous allez rapidement recevoir un E-mail. Suivez les
                            instructions pour réinitialiser votre mot de passe.
                          </b>
                        </h3>
                      </div>
                    )}
                  />
                </>
              )}
            </div>
          </CardContent>

          {!isConfirmationMessage && (
            <div className="flex flex-col items-center justify-center pb-32">
              <div>
                <Link className="font-normal align-center" to="/login">
                  Login
                </Link>
              </div>
            </div>
          )}
        </Card>

        <div className="forgotpass-rightSection md:flex flex-1 items-center justify-center p-64">
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
                <Button
                  variant="contained"
                  color="secondary"
                  className="p-30"
                  style={{ color: "black", background: "#FFFFFF" }}
                >
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

export default withReducer("forgotPassword", reducer)(ForgotPassword);
