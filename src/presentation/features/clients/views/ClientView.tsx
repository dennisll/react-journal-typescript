import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import { useEffect, type FormEvent } from "react";
import { useForm } from "../../../hooks/useForm";
import TextField from "@mui/material/TextField";
import { useClientStore } from "../../../redux/clientSlice/useClientStore";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../../redux/reduxHooks";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';



export const CreateClientView = () => {

  const {active, isLoading, message} = useAppSelector( state => state.client);

  const initialForm = active !== null ? 
  {
    name: active.name,
    description: active.description,
    address: active.address
  } 
  : {
    name: "",
    description: "",
    address: "",
  };


  const { formState, onInputChange, onResetForm} = useForm(initialForm, {});
  const { onCreateClient, onUpdateClient } = useClientStore();
  const navigate = useNavigate();

  const onSubmit = (event: FormEvent) => {

    event.preventDefault();

    if(active !== null){ 
      onUpdateClient({id: active.id, ...formState});
      return;
    }

    onCreateClient(formState);
    onResetForm();
  };

  const navigatetoClients = () => {
    navigate("/client/search");
  };

  useEffect(()=>{
    if(active === null) onResetForm();
  }, [active])

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

              <Grid size={12} sx={{ mt: 2 }} 
               display={message !== null ? '' : "none"}>
                <Alert severity="error">{message}</Alert>
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
                    { active !== null ? 'Update': 'Create'}
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </form>
        </Grid>
      </Grid>
    </>
  );
};
