import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useEffect } from "react";
import {
  Alert,
  Card,
  CardActions,
  CardContent,
  IconButton,
} from "@mui/material";
import { Edit } from "@mui/icons-material";
import type { Client } from "../../../../domain/entities/client";
import { useNavigate } from "react-router-dom";
import { useGetClientsQuery } from "../../../redux/services/clientApi";
import { useHandledError } from "../../../hooks/useHandledError";
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query/react";
import { Checking } from "../../../shared/components/Checking";
import { useAppDispatch } from "../../../redux/reduxHooks";
import { setActiveClient } from "../../../redux/clientSlice/clientSlice";

export const ClientSearchView = () => {
  
  const dispatch = useAppDispatch();

  const {
    data,
    isError,
    isLoading: isLoadingClients,
    error,
  } = useGetClientsQuery({});
  const { handledError, errorMessage } = useHandledError();

  const navigate = useNavigate();

  const navigateToClient = (client: Client) => {
    dispatch(setActiveClient(client));
    navigate("/client");
  };

  useEffect(() => {
    if (isError) {
      const typeError = error as FetchBaseQueryError;
      handledError({ error: typeError });
    }
  }, [isError]);

  return (
    <>
      {isError && errorMessage.length > 2 ? (
        <Grid sx={{ mt: 2 }}>
          <Alert severity="error">{errorMessage}</Alert>
        </Grid>
      ) : null}

      {isLoadingClients ? <Checking /> : (<Grid>
        {data?.map((client) => (
          <Card key={client.id} variant="outlined" sx={{ mt: 2 }}>
            <CardContent>
              <Typography
                variant="h5"
                component="h2"
                color="textSecondary"
                gutterBottom
              >
                {client.name.toUpperCase()}
              </Typography>
              <Typography component="p">{client.description}</Typography>
              <Typography component="p">{client.address}</Typography>
            </CardContent>
            <CardActions>
              <IconButton onClick={() => navigateToClient(client)}>
                <Edit sx={{ color: "primary.main" }} />
              </IconButton>
            </CardActions>
          </Card>
        ))}
      </Grid>)}
    </>
  );
};
