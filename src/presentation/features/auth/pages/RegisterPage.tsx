import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import { AuthLayout } from "../layout/AuthLayout";
import type { FormEvent } from "react";

export const RegisterPage = () => {

  const errorMessage = '';

    const onSubmit = (event: FormEvent)=>{
      event.preventDefault();
  
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
              type="name"
              placeholder="Enter your name"
              fullWidth
              name="name"
              value={""}
              onChange={() => {}}
            />
          </Grid>

          <Grid size={12} sx={{ mt: 2 }}>
            <TextField
              label="Correo"
              type="email"
              placeholder="correo@google.com"
              fullWidth
              name="email"
              value={""}
              onChange={() => {}}
            />
          </Grid>

          <Grid size={12} sx={{ mt: 2 }}>
            <TextField
              label="Password"
              type="password"
              placeholder="*********"
              fullWidth
              name="password"
              value={""}
              onChange={() => {}}
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
