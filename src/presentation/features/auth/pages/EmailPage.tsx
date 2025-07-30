import Grid from "@mui/material/Grid";
import { AuthLayout } from "../layout/AuthLayout";
import TextField from "@mui/material/TextField";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import { useEffect, type FormEvent } from "react";
import { useForm } from "../../../hooks/useForm";
import { useSendEmailMutation } from "../../../redux/services/authApi";
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { EmailDto } from "../../../../domain/dtos/auth/email.dto";
import { useHandledError } from "../../../hooks/useHandledError";

const initialForm = {
  email: "",
};

export const EmailPage = () => {
  const { handledError, errorMessage } = useHandledError();

  //const [errorMessage, setErrorMessage] = useState("");

  const { formState, onInputChange } = useForm(initialForm, {});

  const [sendEmail, { isLoading, isError, isSuccess, error }] =
    useSendEmailMutation();

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();

    const [error, emailDto] = EmailDto.create(formState);

    if (error) {
      handledError({ errorDto: error });
    }

    /* if (error) {
      setErrorMessage(error);
      return;
    } */

    sendEmail(emailDto!).catch((error) => console.error("rejected", error));
  };

  useEffect(() => {
    /* if (isError) {
      const { data } = error as FetchBaseQueryError;
      if (typeof data === "object" && data !== null) {
        const keys = Object.keys(data);
  
        keys.map((key) => {
          if (key === "error") {
            //errorMessage = data[key as keyof typeof data];
            setErrorMessage(data[key as keyof typeof data]);
          }
        });
      }
    } */

    if (isError) {
      const typeError = error as FetchBaseQueryError;

      handledError({ error: typeError });
    }

    if (isSuccess) {

      handledError({ errorDto: "Email send with exit, please access your email for reset" });

      /* setErrorMessage(
        "Email send with exit, please access your email for reset"
      ); */
    }
  }, [isError, isSuccess]);

  return (
    <AuthLayout title="Email">
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

          <Grid
            size={12}
            sx={{ mt: 2 }}
            //display={"none"}
          >
            {(isError || errorMessage.length > 2) && !isSuccess && (
              <Alert severity="error">
                {errorMessage}
              </Alert>
            )}
          </Grid>

          <Grid
            size={12}
            sx={{ mt: 2 }}
            //display={"none"}
          >
            {isSuccess && <Alert severity="success">{errorMessage}</Alert>}
          </Grid>

          <Grid
            container
            size={5}
            spacing={2}
            justifyContent="end"
            sx={{ mb: 2, mt: 1 }}
          >
            <Button
              variant="contained"
              fullWidth
              type="submit"
              disabled={isLoading}
            >
              Send
            </Button>
          </Grid>
        </Grid>
      </form>
    </AuthLayout>
  );
};
