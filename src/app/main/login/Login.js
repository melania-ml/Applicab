import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { submitLogin } from "app/auth/store/loginSlice";
import { yupResolver } from "@hookform/resolvers/yup";
import _ from "@lodash";
import history from "@history";
import { motion } from "framer-motion";

// material-ui
import { styled, darken } from "@mui/material/styles";
import {
  Typography,
  Button,
  FormGroup,
  FormControlLabel,
  Checkbox,
  TextField,
  InputAdornment,
  Icon,
  IconButton,
  Card,
  CardContent
} from "@mui/material";

const Root = styled("div")(({ theme }) => ({
  background: `linear-gradient(to right, ${
    theme.palette.primary.dark
  } 0%, ${darken(theme.palette.primary.dark, 0.5)} 100%)`,
  color: theme.palette.primary.contrastText,

  "& .Login-leftSection": {
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

  "& .Login-rightSection": {
    background: `linear-gradient(to right, ${
      theme.palette.primary.dark
    } 0%, ${darken(theme.palette.primary.dark, 0.5)} 100%)`,
    color: theme.palette.primary.contrastText,
    "@media (max-width: 767px)": {
      padding: "30px"
    }
  },
  "& .login-responsive": {
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
    .required("Saisissez une adresse e-mail"),
  password: yup
    .string()
    .required("Entrez un mot de passe")
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{13,20}$/,
      "13 caractères minimum, Au moins 1 lettre majuscule, Au moins 1 chiffre, Au moins 1 caractère spécial"
    )
});

const defaultValues = {
  email: "",
  password: ""
};

function Login() {
  const dispatch = useDispatch();
  const login = useSelector(({ auth }) => auth.login);
  const {
    data: { client_type }
  } = useSelector(({ auth }) => auth.user);
  const { control, setValue, formState, handleSubmit, reset, trigger } =
    useForm({
      mode: "onChange",
      defaultValues,
      resolver: yupResolver(schema)
    });

  const { isValid, dirtyFields, errors } = formState;

  const [showPassword, setShowPassword] = useState(false);
  const [isRememberMe, setIsRememberMe] = useState(true);
  useEffect(() => {
    if (localStorage.getItem("email") && localStorage.getItem("password")) {
      setValue("email", localStorage.getItem("email") || "", {
        shouldDirty: true,
        shouldValidate: true
      });
      setValue("password", localStorage.getItem("password") || "", {
        shouldDirty: true,
        shouldValidate: true
      });
    }
  }, [reset, setValue, trigger]);

  useEffect(() => {
    if (login.success) {
      if (client_type?.client_type === "Client") {
        history.push({
          pathname: "/apps/client_dashboard"
        });
      } else {
        history.push({
          pathname: "/apps/dashboard"
        });
      }
    }
  }, [login.success]);

  function onSubmit(model) {
    const { email, password } = model;
    if (isRememberMe) {
      localStorage.setItem("email", email);
      localStorage.setItem("password", password);
    } else {
      localStorage.setItem("email", "");
      localStorage.setItem("password", "");
    }
    dispatch(submitLogin(model));
  }
  return (
    <Root className="flex flex-col flex-auto items-center shrink-0">
      <motion.div
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex w-full md:max-w-full shadow-2xl overflow-hidden h-full login-responsive"
      >
        <Card
          className="Login-leftSection flex flex-col w-full items-center justify-center shadow-0"
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

            <>
              <form
                className="flex flex-col justify-center w-full"
                onSubmit={handleSubmit(onSubmit)}
              >
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
                      variant="outlined"
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <Icon className="text-20" color="action">
                              email
                            </Icon>
                          </InputAdornment>
                        )
                      }}
                      required
                    />
                  )}
                />

                <Controller
                  name="password"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      className="mb-16"
                      label="Mot de passe"
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

                <div className="flex flex-row items-center justify-between pb-32">
                  <FormGroup>
                    <FormControlLabel
                      control={
                        <Checkbox
                          defaultChecked={isRememberMe}
                          onChange={() => setIsRememberMe(!isRememberMe)}
                        />
                      }
                      label="Se souvenir de moi"
                    />
                  </FormGroup>
                  <Link className="font-normal" to="/forgotPassword">
                    Mot de passe oublié ?
                  </Link>
                </div>

                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  className="w-full mx-auto"
                  aria-label="LOG IN"
                  disabled={_.isEmpty(dirtyFields) || !isValid}
                  value="legacy"
                >
                  Connexion
                </Button>
              </form>
            </>
            <br />
            <div className="flex flex-col items-center justify-center pb-32">
              <div>
                <span className="font-normal mr-8">
                  Vous n'avez pas encore de compte ?
                </span>
              </div>
              <a
                className="font-normal mt-8"
                href="https://qbgcvoq4svu.typeform.com/to/ojDZd0pG"
                style={{ background: "none", color: "#22d3ee" }}
                target={"_blank"}
              >
                Contactez-nous
              </a>
            </div>
          </CardContent>
        </Card>

        <div className="Login-rightSection md:flex flex-1 items-center justify-center p-64">
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

export default Login;
