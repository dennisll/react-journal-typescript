import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import { AuthLayout } from "../layout/AuthLayout";
import { useEffect, type FormEvent } from "react";
import { useForm } from "../../../hooks/useForm";
//import { useAuthStore } from "../../../redux/authSlice/useAuthStore";
import { useRegisterUserMutation } from "../../../redux/services/authApi";
import { CreateUserDto } from "../../../../domain";
import { useNavigate } from "react-router-dom";
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { useHandledError } from "../../../hooks/useHandledError";

const initialForm = {
  email: "",
  password: "",
  displayName: "",
};

//let errorData;

export const RegisterPage = () => {
  const { handledError, errorMessage } = useHandledError();

  const { formState, onInputChange } = useForm(initialForm, {});
  const navigate = useNavigate();

  const [registerUser, { isLoading, isError, isSuccess, error }] =
    useRegisterUserMutation();

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    //startCreatingUserWithEmailPassword(formState);

    const [error, userDto] = CreateUserDto.create(formState);

    if (error) {
      handledError({ errorDto: error });
    }

    registerUser(userDto!)
      .unwrap()
      .catch((error) => console.error("rejected", error.data!.error));
  };

  useEffect(() => {
    if (isError) {
      const typeError = error as FetchBaseQueryError;

      handledError({ error: typeError });
    }
    if (isSuccess) {
      navigate("/login");
    }
  }, [isSuccess, isError]);

  return (
    <AuthLayout title="Register">
      <form
        onSubmit={onSubmit}
        className=" animate__animated animate__fadeIn animate__faster"
        aria-label="submit-form"
      >
        <Grid container>
          <Grid size={12} sx={{ mt: 2 }}>
            <TextField
              label="Name"
              type="text"
              placeholder="Enter your name"
              fullWidth
              name="displayName"
              value={formState.displayName}
              onChange={onInputChange}
            />
          </Grid>

          <Grid size={12} sx={{ mt: 2 }}>
            <TextField
              label="Correo"
              type="email"
              placeholder="correo@google.com"
              fullWidth
              name="email"
              value={formState.email}
              onChange={onInputChange}
            />
          </Grid>

          <Grid size={12} sx={{ mt: 2 }}>
            <TextField
              label="Password"
              type="password"
              placeholder="*********"
              fullWidth
              name="password"
              value={formState.password}
              onChange={onInputChange}
            />
          </Grid>

          <Grid container size={12} spacing={2} sx={{ mb: 2, mt: 1 }}>
            <Grid
              size={{ xs: 12 }}
              //display={!!errorMessage ? "" : "none"}
            >
              {isError && <Alert severity="error">{errorMessage}</Alert>}
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <Button
                variant="contained"
                fullWidth
                type="submit"
                //disabled={isCheckingAuthentication}
                disabled={isLoading}
              >
                Crear cuenta
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </AuthLayout>
  );
};
