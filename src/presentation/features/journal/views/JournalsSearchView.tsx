import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useEffect } from "react";
import { useAppSelector } from "../../../redux/reduxHooks";
import { Button, Toolbar } from "@mui/material";
import { useJournalStore } from "../../../redux/journalSlice/useJournalStore";
import { useNavigate } from "react-router-dom";
import type { Journal } from "../../../../domain";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

export const JournalSearchView = () => {

  const { onGetJournals, onSetActiveJournal } = useJournalStore();

  const {journals} = useAppSelector((state) => state.journal);
  const navigate = useNavigate();

  const params = new URLSearchParams(location.search);
  const idUser = params.get('idUser') ? params.get('idUser') as string : '';
  const data = params.get('data') ? params.get('data') as string : '';

  const navigateToJournalView = (journal: Journal) => {

    onSetActiveJournal(journal);
     navigate(`/journal/${journal.id}`)
  }; 

  useEffect(() => {
    onGetJournals({idUser, data});
  }, []);

  return (
    <Grid>
      {journals?.map((journal) => (
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
    </Grid>
  );
};
