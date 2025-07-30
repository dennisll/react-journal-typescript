import Grid from "@mui/material/Grid";
import { AuthLayout } from "../layout/AuthLayout";
import TextField from "@mui/material/TextField";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import Google from "@mui/icons-material/Google";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useEffect, type FormEvent } from "react";
import { useForm } from "../../../hooks/useForm";
import { useLoginMutation } from "../../../redux/services/authApi";
import { LoginDto } from "../../../../domain";
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { useAuthStore } from "../../../redux/authSlice/useAuthStore";
import { useHandledError } from "../../../hooks/useHandledError";


const initialForm = {
  email: "",
  password: "",
};

export const LoginPage = () => {

  const {handledError, errorMessage} = useHandledError();
  
  const { formState, onInputChange} = useForm(initialForm, {});

  const {startLogin} = useAuthStore();

  const navigate = useNavigate();

  const [login, { isLoading, isError, isSuccess, data, error }] =
    useLoginMutation();

  const onSubmit = (event: FormEvent) => {

    event.preventDefault();

    const [error, loginDto] = LoginDto.create(formState);

    if (error) {
      handledError({errorDto: error});
    }

    login(loginDto!).catch((error) => console.error("rejected", error));
  };

  const onGoogleSignIn = async () => {
    //await startGoogleSingIn();
  };

  useEffect(()=>{

    if(isError){

      const typeError = error as FetchBaseQueryError;

      handledError({error: typeError});
    }

    if(isSuccess){
      localStorage.setItem('token', data!.token);
      startLogin(data.token);
      navigate('/register');
    }
  }, [isSuccess, isError]);

  return (
    <AuthLayout title="Login">
      <form
        onSubmit={onSubmit}
        className=" animate__animated animate__fadeIn animate__faster"
        aria-label="submit-form"
      >
        <Grid container>
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
              placeholder="correo@google.com"
              fullWidth
              name="password"
              value={formState.password}
              onChange={onInputChange}
            />
          </Grid>

          <Grid
            size={12}
            sx={{ mt: 2 }}
            //display={"none"}
          >
            {(isError) && (
              <Alert severity="error">
                {errorMessage}
              </Alert>
            )}
          </Grid>

          <Grid
              
              container size={12} 
              spacing={2}
              justifyContent='end'
              sx={{ mb: 2, mt: 1 }}
            >
              <Link component={RouterLink} color="inherit" to="/auth/email-to-reset-password">
              Forgot your password
            </Link>
            </Grid>

          <Grid container size={12} spacing={2}>
            <Grid
              container
              size={{ xs: 12, md: 6 }}
              spacing={2}
              sx={{ mb: 2, mt: 1 }}
            >
              <Button
                variant="contained"
                fullWidth
                type="submit"
                disabled={isLoading}
              >
                Login
              </Button>
            </Grid>

            <Grid
              container
              size={{ xs: 12, md: 6 }}
              spacing={2}
              sx={{ mb: 2, mt: 1 }}
            >
              <Button
                variant="contained"
                fullWidth
                onClick={onGoogleSignIn}
                //disabled={isAuthenticated}
                aria-label="google-btn"
              >
                <Google />
                <Typography sx={{ ml: 1 }}>Google</Typography>
              </Button>
            </Grid>
          </Grid>

          <Grid container size={12} spacing={2}>

            {/* <Grid
              container
              size={{ xs: 12, md: 6 }}
              spacing={2}
              sx={{ mb: 2, mt: 1 }}
            >
             <Link component={RouterLink} color="inherit" to="/auth/register">
              Forgot your password
            </Link>
            </Grid> */}

            <Grid
              container size={12} 
              spacing={2}
              justifyContent='end'
              sx={{ mb: 2, mt: 1 }}
            >
              <Link component={RouterLink} color="inherit" to="/auth/register">
              Crear una cuenta
            </Link>
            </Grid>
          </Grid>

        </Grid>
      </form>
    </AuthLayout>
  );
};
