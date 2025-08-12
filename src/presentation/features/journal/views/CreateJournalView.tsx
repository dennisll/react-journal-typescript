import SaveOutlined from "@mui/icons-material/SaveOutlined";
import UploadOutlined from "@mui/icons-material/UploadOutlined";
import {
  Alert,
  Button,
  Card,
  CardMedia,
  CircularProgress,
  IconButton,
  TextField,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import {
  useEffect,
  useRef,
  useState,
  type ChangeEvent,
  type FormEvent,
} from "react";
import { useNavigate } from "react-router-dom";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useForm } from "../../../hooks/useForm";
import { CustomSelect } from "../components/CustomSelect";
import { useGetClientsQuery } from "../../../redux/services/clientApi";
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query/react";
import { useAppSelector } from "../../../redux/reduxHooks";
import { useHandledError } from "../../../hooks/useHandledError";
import {
  useCreateJournalMutation,
  //useUpdateJournalMutation,
  useUploadImagesMutation,
} from "../../../redux/services/journalApi";
import { CreateJournalDto } from "../../../../domain";
import { UploadFileDto } from "../../../../domain/dtos/files/uploadFilesDto";

export const CreateJournalView = () => {
  const [files, setFiles] = useState<FileList | null>(null); //<FileList | null>

  const { handledError, errorMessage } = useHandledError();
  const user = useAppSelector((state) => state.auth.user);

  const { data, isSuccess, isError, isLoading, error } = useGetClientsQuery({});

  const [
    onCreateJournal,
    {
      isLoading: isCreateLoading,
      isSuccess: isCreateSuccess,
      isError: isCreateError,
      //data: dataCreate,
      error: errorCreate,
    },
  ] = useCreateJournalMutation();

  const [ uploadImage] = useUploadImagesMutation();

  const initialForm = {
    title: "",
    description: "",
    nameClient: "",
  };

  const { formState, onInputChange, onResetForm } = useForm(initialForm, {});

  const fileInputRef = useRef<HTMLInputElement>(null);

  const navigate = useNavigate();

  const onFileInputChange = async ({
    target,
  }: ChangeEvent<HTMLInputElement>) => {
    const { files } = target;
    setFiles(files);
  };

  const navigatetoJournals = () => {
    navigate(`/journal/search?idUser=${user!.id}`);
  };

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();

     const [errorUpload, fileToUploadDto] = UploadFileDto.create(files!);

    if (errorUpload) {
      handledError({ errorDto: errorUpload });
    } 

    const imageUrl = await uploadImage(fileToUploadDto!.formData);

    if (imageUrl.error) {
      const typeError = imageUrl.error as FetchBaseQueryError;
      handledError({ error: typeError });
    }

    const datos = {
      ...formState,
      idUser: user!.id,
      imageUrls: imageUrl.data,
    };

    const [error, journalDto] = CreateJournalDto.create(datos);

    if (error) {
      handledError({ errorDto: error });
    }

    onCreateJournal(journalDto!);
    onResetForm();
  };

  useEffect(() => {
    if (isError || isCreateError) {
      let typeError;

      if (isError) typeError = error as FetchBaseQueryError;
      if (isCreateError) typeError = errorCreate as FetchBaseQueryError;

      handledError({ error: typeError });
    }

    if (isCreateSuccess) {
      handledError({ errorDto: "Register created correctly", success: true });
    }
  }, [isCreateSuccess, isCreateError, isError]);

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
          <Grid container size={{ lg: 8.2, md: 9.2, sm: 12 }} sx={{ pb: 5 }}>
            <Card
              sx={{
                minWidth: "70%",
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

                {isLoading ? (
                  <Grid>
                    <CircularProgress />
                  </Grid>
                ) : (
                  <CustomSelect
                    name="nameClient"
                    initialData={isSuccess ? data! : []}
                    value={formState.nameClient}
                    onSelectChange={onInputChange}
                  />
                )}

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
                    disabled={isCreateLoading}
                    type="submit"
                    color="primary"
                    sx={{ padding: 2 }}
                  >
                    <SaveOutlined sx={{ fontSize: 30, mr: 1 }} />
                    Create
                  </Button>
                </Grid>
              </Grid>
            </form>
            {(isError || isCreateError) && errorMessage.length > 2 ? (
              <Grid sx={{ mt: 2 }}>
                <Alert severity="error">{errorMessage}</Alert>
              </Grid>
            ) : null}

            {isCreateSuccess && errorMessage.length > 2 ? (
              <Grid sx={{ mt: 2 }}>
                <Alert severity="success">{errorMessage}</Alert>
              </Grid>
            ) : null}
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};
