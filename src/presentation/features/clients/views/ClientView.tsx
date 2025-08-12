import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import { useEffect, type FormEvent } from "react";
import { useForm } from "../../../hooks/useForm";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../redux/reduxHooks";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import {
  useCreateClientMutation,
  useUpdateClientMutation,
} from "../../../redux/services/clientApi";
import { CreateClientDto, UpdateClientDto } from "../../../../domain";
import { useHandledError } from "../../../hooks/useHandledError";
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query/react";
import { setActiveClient } from "../../../redux/clientSlice/clientSlice";

export const CreateClientView = () => {

  const dispatch = useAppDispatch();

  const { active } = useAppSelector(
    (state) => state.client
  );

  const [
    createClient,
    { isError, isLoading: isCreateLoading, isSuccess, error },
  ] = useCreateClientMutation();

  const [
    updateClient,
    {
      isSuccess: isUpdateSuccess,
      isLoading: isUpdateLoading,
      isError: isUpdateError,
      error: errorWhileUpdate,
    },
  ] = useUpdateClientMutation();

  const initialForm =
    active !== null
      ? {
          name: active.name,
          description: active.description,
          address: active.address,
        }
      : {
          name: "",
          description: "",
          address: "",
        };

  const { formState, onInputChange, onResetForm } = useForm(initialForm, {});
  const { handledError, errorMessage } = useHandledError();
  const navigate = useNavigate();

  const onSubmit = (event: FormEvent) => {

    event.preventDefault();
   
    const [error, clientDto] = CreateClientDto.create(formState);

    if (error) {
      handledError({ errorDto: error });
    }

    if (active !== null) {
      const [error, clientDto] = UpdateClientDto.create({
        ...formState,
        updatedAt: new Date().toISOString(),
        id: active.id,
      });

      if (error) {
        handledError({ errorDto: error });
      }

      updateClient(clientDto!);
      dispatch(setActiveClient(null));
      //onActiveClient(null);
      return;
    }

    createClient(clientDto!);
    onResetForm();
  };

  const navigatetoClients = () => {
    navigate("/client/search");
  };

  useEffect(() => {
    if (isError) {

      const typeError = error as FetchBaseQueryError;
      handledError({ error: typeError });
    }

    if (isUpdateError) {

      const typeError = errorWhileUpdate as FetchBaseQueryError;
      handledError({ error: typeError });
    }

    if (isSuccess) {
      handledError({ errorDto: "Client created correctly", success: true });
    }

    if (isUpdateSuccess) {
      onResetForm();
      handledError({ errorDto: "Client updated correctly", success: true });
    }

  }, [isSuccess, isError, isUpdateSuccess]);

  return (
    <>
      <Grid
        sx={{
          display: "flex",
          flexDirection: "row-reverse",
          bgcolor: "background.paper",
          borderRadius: 1,
        }}
      >
        <Button color="primary" sx={{ padding: 2 }} onClick={navigatetoClients}>
          <ArrowForwardIcon sx={{ fontSize: 30, mr: 1 }} />
          Clients
        </Button>
      </Grid>

      <Grid sx={{ display: "flex" }}>
        <Grid
          className=" animate__animated animate__fadeIn animate__faster"
          container
          direction="column"
          alignItems="center"
          justifyContent="center"
          sx={{
            borderRadius: 3,
            width: 1,
          }}
        >
          <form onSubmit={onSubmit} aria-label="submit-form">
            <Grid container>
              <Grid size={12} sx={{ mt: 2 }}>
                <TextField
                  label="Name"
                  type="text"
                  placeholder="Enter the name to Enterprise"
                  fullWidth
                  name="name"
                  value={formState.name}
                  onChange={onInputChange}
                />
              </Grid>

              <Grid size={12} sx={{ mt: 2 }}>
                <TextField
                  label="Address"
                  type="text"
                  placeholder="Enter the address to the Enterprise"
                  fullWidth
                  name="address"
                  value={formState.address}
                  onChange={onInputChange}
                />
              </Grid>

              <Grid size={12} sx={{ mt: 2 }}>
                <TextField
                  type="text"
                  fullWidth
                  multiline
                  placeholder="Make a simple description"
                  minRows={5}
                  name="description"
                  value={formState.description}
                  onChange={onInputChange}
                />
              </Grid>

              <Grid container size={12} spacing={2}>
                {isError && errorMessage.length > 2 ? (
                  <Grid sx={{ mt: 2 }}>
                    <Alert severity="error">{errorMessage}</Alert>
                  </Grid>
                ) : null}

                {(isSuccess || isUpdateSuccess) && errorMessage.length > 2 ? (
                  <Grid sx={{ mt: 2 }}>
                    <Alert severity="success">{errorMessage}</Alert>
                  </Grid>
                ) : null}   
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
                    type="submit"
                    disabled={isCreateLoading || isUpdateLoading}
                  >
                    {active !== null ? "Update" : "Create"}
                  </Button>
                </Grid>
                
            </Grid>
          </form>
        </Grid>
      </Grid>
    </>
  );
};
