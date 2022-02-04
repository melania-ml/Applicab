import Card from "@mui/material/Card";
import { styled, darken } from "@mui/material/styles";
import CardContent from "@mui/material/CardContent";
import {
  Typography,
  Button,
  TextField,
  IconButton,
  InputAdornment,
  Icon
} from "@mui/material";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Controller, useForm } from "react-hook-form";
import withReducer from "app/store/withReducer";
import { Link, useSearchParams } from "react-router-dom";
import * as yup from "yup";
import history from "@history";
import { yupResolver } from "@hookform/resolvers/yup";
import _ from "@lodash";
import reducer from "./store";
import { callResetPassword } from "./store/resetPasswordSlice";

const Root = styled("div")(({ theme }) => ({
  background: `linear-gradient(to right, ${
    theme.palette.primary.dark
  } 0%, ${darken(theme.palette.primary.dark, 0.5)} 100%)`,
  color: theme.palette.primary.contrastText,

  "& .Resetpass-leftSection": {
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

  "& .Resetpass-rightSection": {
    background: `linear-gradient(to right, ${
      theme.palette.primary.dark
    } 0%, ${darken(theme.palette.primary.dark, 0.5)} 100%)`,
    color: theme.palette.primary.contrastText,
    "@media (max-width: 767px)": {
      padding: "30px"
    }
  },
    "& .Resetpass-responsive": {
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

const defaultValues = {
  password: "",
  confirmPassword: ""
};

const schema = yup.object().shape({
  password: yup
    .string()
    .required("Entrez un mot de passe")
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{13,20}$/,
      "13 caractères minimum, Au moins 1 lettre majuscule, Au moins 1 chiffre, Au moins 1 caractère spécial"
    ),
  confirmPassword: yup
    .string()
    .required("Entrez un mot de passe")
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{13,20}$/,
      "13 caractères minimum, Au moins 1 lettre majuscule, Au moins 1 chiffre, Au moins 1 caractère spécial"
    )
    .oneOf(
      [yup.ref("password"), null],
      "Le nouveau mot de passe et le mot de passe de confirmation ne correspondent pas"
    )
});

function ResetPassword(props) {
  const dispatch = useDispatch();
  const searchParam = window.location.pathname.split("/")[2];
  const authRegister = useSelector(({ auth }) => auth.register);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const resetPasswordState = useSelector(
    ({ resetPassword }) => resetPassword.resetPassword
  );

  useEffect(() => {
    if (resetPasswordState.success) {
      history.push({
        pathname: "/login"
      });
    }
  }, [resetPasswordState]);

  const { control, formState, handleSubmit, reset, setError } = useForm({
    mode: "onChange",
    defaultValues,
    resolver: yupResolver(schema)
  });

  const { isValid, dirtyFields, errors } = formState;

  useEffect(() => {
    authRegister.errors.forEach((error) => {
      setError(error.type, {
        type: "manual",
        message: error.message
      });
    });
  }, [authRegister.errors, setError]);

  function onSubmit(model) {
    dispatch(callResetPassword({ ...model, forgotPasswordToken: searchParam }));
  }
  return (
    <Root className="flex flex-col flex-auto items-center justify-center shrink-0">
      <motion.div
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex w-full md:max-w-full shadow-2xl overflow-hidden h-full Resetpass-responsive"
      >
        <Card
          className="Resetpass-leftSection flex flex-col w-full items-center justify-center shadow-0"
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

            <form
              className="flex flex-col justify-center w-full"
              onSubmit={handleSubmit(onSubmit)}
            >
              <Controller
                name="password"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    className="mb-16"
                    label="Nouveau mot de passe"
                    type="password"
                    error={!!errors.password}
                    helperText={errors?.password?.message}
                    variant="outlined"
                    InputProps={{
                      className: "pr-2",
                      type: showPassword ? "text" : "password",
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() => setShowPassword(!showPassword)}
                            size="large"
                          >
                            <Icon className="text-20" color="action">
                              {showPassword ? "visibility" : "visibility_off"}
                            </Icon>
                          </IconButton>
                        </InputAdornment>
                      )
                    }}
                    required
                  />
                )}
              />
              <Controller
                name="confirmPassword"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    className="mb-16"
                    label="Confirmation"
                    type="password"
                    error={!!errors.confirmPassword}
                    helperText={errors?.confirmPassword?.message}
                    variant="outlined"
                    InputProps={{
                      className: "pr-2",
                      type: showConfirmPassword ? "text" : "password",
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() =>
                              setShowConfirmPassword(!showConfirmPassword)
                            }
                            size="large"
                          >
                            <Icon className="text-20" color="action">
                              {showConfirmPassword
                                ? "visibility"
                                : "visibility_off"}
                            </Icon>
                          </IconButton>
                        </InputAdornment>
                      )
                    }}
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
                Modifier le mot de passe
              </Button>
            </form>
          </CardContent>

          <div className="flex flex-col items-center justify-center pb-32">
            <div>
              <Link className="font-normal align-center" to="/login">
                Login
              </Link>
            </div>
          </div>
        </Card>

        <div className="Resetpass-rightSection md:flex flex-1 items-center justify-center p-64">
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

export default withReducer("resetPassword", reducer)(ResetPassword);
