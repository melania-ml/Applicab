import { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Icon from "@mui/material/Icon";
import InputAdornment from "@mui/material/InputAdornment";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { submitRegister } from "app/auth/store/registerSlice";
import { Link } from 'react-router-dom'
import * as yup from "yup";
import _ from "@lodash";

/**
 * Form Validation Schema
 */
const schema = yup.object().shape({
  email: yup
    .string()
    .email("You must enter a valid email")
    .required("You must enter a email"),
});

const defaultValues = {
  email: "",
};

function JWTRegisterTab(props) {
  const dispatch = useDispatch();
  const authRegister = useSelector(({ auth }) => auth.register);

  const { control, formState, handleSubmit, reset, setError } = useForm({
    mode: "onChange",
    defaultValues,
    resolver: yupResolver(schema),
  });

  const { isValid, dirtyFields, errors } = formState;

  useEffect(() => {
    authRegister.errors.forEach((error) => {
      setError(error.type, {
        type: "manual",
        message: error.message,
      });
    });
  }, [authRegister.errors, setError]);

  function onSubmit(model) {
    props.setIsConfirmationMessage(true);
    //dispatch(submitRegister(model));
  }

  return (
    <div className="w-full">
      {!props.isConfirmationMessage ? (
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
                  Saisissez l’adresse e-mail associée à votre compte. Nous vous
                  enverrons un lien par e-mail pour changer votre mot de passe.
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
                  ),
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
                <Icon color="success">
                  check_circle
                </Icon>
                <h3 className="ml-3">
                  <b>
                    Vous allez rapidement recevoir un E-mail. Suivez les
                    instructions pour réinitialiser votre mot de passe.
                  </b>
                </h3>
              </div>
            )}
          />
          <Button component={Link} to='/resetPassword'>Jump</Button>
        </>
      )}
    </div>
  );
}

export default JWTRegisterTab;
