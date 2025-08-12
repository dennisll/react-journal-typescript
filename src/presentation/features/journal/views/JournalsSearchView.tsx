import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useEffect } from "react";
import { useAppDispatch} from "../../../redux/reduxHooks";
import { Alert, Button, CircularProgress, Toolbar } from "@mui/material";
import { useNavigate } from "react-router-dom";
import type { Journal } from "../../../../domain";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useGetJournalsQuery } from "../../../redux/services/journalApi";
import { useHandledError } from "../../../hooks/useHandledError";
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query/react";
import { setActiveJournal } from "../../../redux/journalSlice/journalSlice";

export const JournalSearchView = () => {

  const dispatch = useAppDispatch();

  const { handledError, errorMessage } = useHandledError();

  const navigate = useNavigate();

  const {data, isSuccess, isLoading, isError, error} = useGetJournalsQuery({});

  //const params = new URLSearchParams(location.search);
  //const idUser = params.get('idUser') ? params.get('idUser') as string : '';
  //const date = params.get('data') ? params.get('data') as string : '';

  const navigateToJournalView = (journal: Journal) => {

    dispatch(setActiveJournal(journal));
     navigate(`/journal/${journal.id}`)
  }; 

   useEffect(() => {
      if (isError) {
        const typeError = error as FetchBaseQueryError;
        handledError({ error: typeError });
      }
    }, [isError]);
  

  return (

    <>

    {isLoading ? <CircularProgress /> : null}
    
    {isSuccess ? 
    (<Grid>
      {data?.map((journal) => (
        <Grid key={journal.id} container sx={{ display: "flex" }}>
          <Toolbar>
             <Typography sx={{ mr: 2 }}>
              {journal.createdAt}
            </Typography> 
            <Typography sx={{ mr: 2 }}>{journal.title}</Typography>
            <Typography sx={{ mr: 2 }}>{journal.description}</Typography>
            <Typography sx={{ mr: 2 }}>{journal.idClient}</Typography>
            <Button onClick={() => navigateToJournalView(journal)}><ArrowForwardIcon sx={{ fontSize: 30, mr: 1 }} /></Button>
          </Toolbar>
        </Grid>
      ))}
    </Grid>) : null}

    {isError && errorMessage.length > 2 ? (
              <Grid sx={{ mt: 2 }}>
                <Alert severity="error">{errorMessage}</Alert>
              </Grid>
            ) : null}

    </>
  );
};
