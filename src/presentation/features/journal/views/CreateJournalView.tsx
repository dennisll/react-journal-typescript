import SaveOutlined from "@mui/icons-material/SaveOutlined";
import UploadOutlined from "@mui/icons-material/UploadOutlined";
import {
  Alert,
  Button,
  Card,
  CardMedia,
  IconButton,
  TextField,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import { useEffect, useRef, type ChangeEvent, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useJournalStore } from "../../../redux/journalSlice/useJournalStore";
import { useForm } from "../../../hooks/useForm";
import { useAppSelector } from "../../../redux/reduxHooks";
import { CustomSelect } from "../components/CustomSelect";
import { useClientStore } from "../../../redux/clientSlice/useClientStore";

let photoUrls: string[];

export const CreateJournalView = () => {
  const { onCreateJournal, onUploadImagens } = useJournalStore();

  const { isLoading, errorMessage } = useAppSelector((state) => state.journal);
  const clients = useAppSelector((state) => state.client.clients);
  const user = useAppSelector((state) => state.auth.user);

  const { onGetClients } = useClientStore();

  const initialForm = {
    title: "",
    description: "",
    nameClient: "",
  };

  const { formState, onInputChange, onResetForm} = useForm(initialForm, {});

  const fileInputRef = useRef<HTMLInputElement>(null);

  const navigate = useNavigate();

  const onFileInputChange = async ({
    target,
  }: ChangeEvent<HTMLInputElement>) => {
    const { files } = target;
    photoUrls = await onUploadImagens(files!);
  };

  const navigatetoJournals = () => {
    navigate(`/journal/search?idUser=${user!.id}`);
  };

  const onSubmit = (event: FormEvent) => {

    event.preventDefault();

    const data = { ...formState, idUser: user!.id, imageUrls: photoUrls };

    onCreateJournal(data);
    onResetForm();
  };

  useEffect(() => {
    onGetClients();
  }, []);

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
        <Button
          color="primary"
          sx={{ padding: 2 }}
          onClick={navigatetoJournals}
        >
          <ArrowForwardIcon sx={{ fontSize: 30, mr: 1 }} />
          Journals
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
            minHeight: "calc(100vh - 110px)",
            borderRadius: 3,
            width: 1,
            padding: 2,
          }}        
        >
          <Grid 
          container
          size={{lg: 8.2, md:9.2, sm: 12}}
          sx={{ pb: 5 }}>
            <Card  
              sx={{ 
                minWidth: '70%',
              }}
            >
              <CardMedia
                component="img"
                sx={{ 
                  borderRadius: "300px", 
                  
                }}
                image="/src/assets/header-1440x768.jpg"
                alt="Imagen con bordes redondeados"
              />
            </Card>
          </Grid>

          <Grid>

              <form onSubmit={onSubmit} aria-label="submit-form">
                <Grid container>
                    <Grid size={12} sx={{ mt: 2 }}>
                      <TextField
                        type="text"
                        fullWidth
                        placeholder="Ingrese un título"
                        label="Title"
                        sx={{ border: "none", mb: 1 }}
                        name="title"
                        value={formState.title}
                        onChange={onInputChange}
                      />
                    </Grid>

                    <CustomSelect
                      name="nameClient"
                      initialData={clients!}
                      value={formState.nameClient}
                      onSelectChange={onInputChange}
                    />

                  <Grid size={12} sx={{ mt: 2 }}>
                    <TextField
                      type="text"
                      label="Description"
                      fullWidth
                      multiline
                      placeholder="¿Qué sucedió en el día de hoy?"
                      minRows={5}
                      name="description"
                      value={formState.description}
                      onChange={onInputChange}
                    />
                  </Grid>

                  <Grid size={12} sx={{ mt: 2, display: "flex" }}>
                    <input
                      type="file"
                      multiple
                      ref={fileInputRef}
                      onChange={onFileInputChange}
                      style={{ display: "none" }}
                    />
                    <IconButton
                      color="primary"
                      disabled={isLoading}
                      onClick={() => fileInputRef.current!.click()}
                    >
                      <UploadOutlined />
                    </IconButton>

                    <Button
                      disabled={isLoading}
                      type="submit"
                      color="primary"
                      sx={{ padding: 2 }}
                    >
                      <SaveOutlined sx={{ fontSize: 30, mr: 1 }} />
                      Create
                    </Button>
                  </Grid>
                  <Grid
                    size={12}
                    sx={{ mt: 2 }}
                    display={errorMessage !== null ? "" : "none"}
                  >
                    <Alert severity="error">Error</Alert>
                  </Grid>
                </Grid>
              </form>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};
