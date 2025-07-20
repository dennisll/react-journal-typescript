import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useClientStore } from "../../../redux/clientSlice/useClientStore";
import { useEffect } from "react";
import { useAppSelector } from "../../../redux/reduxHooks";
import { CircularProgress, IconButton, ListItem, ListItemAvatar, Toolbar } from "@mui/material";
import { Edit } from "@mui/icons-material";
import type { Client } from "../../../../domain/entities/client";
import { useNavigate } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

export const ClientSearchView = () => {
  const { onGetClients, onActiveClient, onDeleteClient } = useClientStore();

  const { clients, isLoading, active } = useAppSelector(
    (state) => state.client
  );

  const navigate = useNavigate();

  const navigateToClient = (client: Client) => {
    onActiveClient(client);
    navigate("/client");
  };

  const deleteClient = async (client: Client) => {
    onActiveClient(client);
    onDeleteClient(client);
  };

  useEffect(() => {
    onGetClients();
  }, []);

  return (
    <Grid>
      {clients?.map((client) => (
        <Grid
          key={client.id}
          container
          direction="column"
          alignItems="flex-start"
          sx={{
            //display: 'flex',
            width: { xs: 12 },
          }}
        >
          <Toolbar>
            <ListItem>
              <ListItemAvatar sx={{ mr: 1 }}>
                <CheckCircleOutlineIcon />
              </ListItemAvatar>

              <Grid size={6} sx={{ mr: 2 }}>
                <Typography sx={{ mr: 2 }}>
                  {client.name.toUpperCase()}
                </Typography>
              </Grid>

              <Grid sx={{ display: "flex" }}>
                <IconButton onClick={() => navigateToClient(client)}>
                  <Edit sx={{color: 'primary.main'}} />
                </IconButton>

                <IconButton
                  disabled={isLoading && active?.id === client.id }
                  onClick={() => deleteClient(client)}
                  edge="end"
                  aria-label="delete"
                  sx={{ mr: 10}}
                >
                  {(isLoading && active?.id === client.id) ? <CircularProgress /> : <DeleteIcon sx={{color: 'error.main'}}/> }
                  
                </IconButton>

              </Grid>
            </ListItem>
          </Toolbar>
        </Grid>
      ))}
    </Grid>
  );
};
