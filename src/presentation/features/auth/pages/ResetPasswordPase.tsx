import Grid from "@mui/material/Grid";
import { AuthLayout } from "../layout/AuthLayout";
import TextField from "@mui/material/TextField";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import { useParams } from "react-router-dom";
import { useEffect, type FormEvent } from "react";
import { useForm } from "../../../hooks/useForm";
import { useResetPasswordMutation } from "../../../redux/services/authApi";
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { PasswordDto } from "../../../../domain/dtos/auth/password.dto";
import { useHandledError } from "../../../hooks/useHandledError";

const initialForm = {
  passwordConfirm: "",
  password: "",
};

export const ResetPasswordPage = () => {
  const { handledError, errorMessage } = useHandledError();
  const { formState, onInputChange } = useForm(initialForm, {});

  const { token } = useParams();

  const [resetpassword, { isLoading, isError, isSuccess, error }] =
    useResetPasswordMutation();

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();

    const form = { password: formState.password };

    const [error, passwordDto] = PasswordDto.create(form);

    if (error) {
      handledError({ errorDto: error });
    }

    resetpassword({ token: token!, passwordDto: passwordDto! }).catch((error) =>
      console.error("rejected", error)
    );
  };

  useEffect(() => {
    if (isError) {
      const typeError = error as FetchBaseQueryError;

      handledError({ error: typeError });
    }

    if (isSuccess) {
      window.close();
     //navigate("/login"); 
    }
  }, [isSuccess, isError]);

  return (
    <AuthLayout title="Reset Passord">
      <form
        onSubmit={onSubmit}
        className=" animate__animated animate__fadeIn animate__faster"
        aria-label="submit-form"
      >
        <Grid container>
          <Grid size={12} sx={{ mt: 2 }}>
            <TextField
              label="Password"
              type="password"
              placeholder="correo@google.com"
              fullWidth
              name="password"
              value={formState.password}
              onChange={onInputChange}
            />
          </Grid>

          <Grid size={12} sx={{ mt: 2 }}>
            <TextField
              label="Confirm Password"
              type="password"
              placeholder="correo@google.com"
              fullWidth
              name="passwordConfirm"
              value={formState.passwordConfirm}
              onChange={onInputChange}
            />
          </Grid>

          <Grid
            size={{ xs: 12 }}
            sx={{ mt: 2 }}
            //display={!!errorMessage ? "" : "none"}
          >
            {isError && <Alert severity="error">{errorMessage}</Alert>}
          </Grid>

          <Grid
            container
            size={6}
            spacing={2}
            justifyContent="end"
            sx={{ mb: 2, mt: 1 }}
          >
            <Button
              variant="contained"
              fullWidth
              type="submit"
              disabled={
                isLoading || formState.password !== formState.passwordConfirm
              }
            >
              Send
            </Button>
          </Grid>

          <Grid container size={12} spacing={2}></Grid>
        </Grid>
      </form>
    </AuthLayout>
  );
};
