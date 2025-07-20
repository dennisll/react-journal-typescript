import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import { AuthLayout } from "../layout/AuthLayout";
import type { FormEvent } from "react";
import { useForm } from "../../../hooks/useForm";
import { useAuthStore } from "../../../redux/authSlice/useAuthStore";

const initialForm = {
  email: '',
  password: '',
  displayName: ''
};

export const RegisterPage = () => {

  const {formState, onInputChange} = useForm(initialForm);

  const {startCreatingUserWithEmailPassword} = useAuthStore();

  const errorMessage = '';

    const onSubmit = (event: FormEvent)=>{
      event.preventDefault();
      startCreatingUserWithEmailPassword(formState);
    }
  
  return (
    <AuthLayout title="Register">
      <form
       onSubmit={onSubmit}
       className=' animate__animated animate__fadeIn animate__faster'
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

          <Grid
            container
            size={12}
            spacing={2}
            sx={{ mb: 2, mt: 1 }}
          >
            <Grid 
            size={{ xs: 12 }}
            //display={!!errorMessage ? "" : "none"}
            >
              <Alert severity="error">{errorMessage}</Alert> 
            </Grid>

            <Grid
            size={{ xs: 12, md: 6 }}
            >
              <Button
                variant="contained"
                fullWidth
                type="submit"
                //disabled={isCheckingAuthentication}
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
