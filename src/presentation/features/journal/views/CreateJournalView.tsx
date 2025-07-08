import DeleteOutline from "@mui/icons-material/DeleteOutline";
import SaveOutlined from "@mui/icons-material/SaveOutlined";
import UploadOutlined from "@mui/icons-material/UploadOutlined";
import { Button, IconButton, ImageListItem, TextField } from "@mui/material";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useRef, type ChangeEvent } from "react";
import ListOutlinedIcon from "@mui/icons-material/ListOutlined";
import { useNavigate } from "react-router-dom";

export const CreateJournal = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const navigate = useNavigate();

  const onInputChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    console.log(target.files);
  };

  const onFileInputChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    console.log(target.files);
  };

  const onSaveNote = () => {};

  const onDelete = () => {};

  const navigatetoJournals = () => {
    navigate("/journal/search");
  };

  return (
    <>
      <Grid
        sx={{
          display: "flex",
          flexDirection: "row-reverse",
          //p: 1,
          //m: 1,
          bgcolor: "background.paper",
          borderRadius: 1,
        }}
      >
        <Button
          color="primary"
          sx={{ padding: 2 }}
          onClick={navigatetoJournals}
        >
          <ListOutlinedIcon sx={{ fontSize: 30, mr: 1 }} />
          Journals
        </Button>
      </Grid>

      <Grid sx={{pb:5}}>
         <ImageListItem>
            <img src="/src/assets/trabajo-equipo-ti-recluit.jpg" alt="" />
         </ImageListItem>
      </Grid>

      <Grid sx={{ display: "flex" }}>

        <Grid
          className=" animate__animated animate__fadeIn animate__faster"
          container
          direction="column"
          alignItems="center"
          //justifyContent="center"
          sx={{
            minHeight: "calc(100vh - 110px)",
            borderRadius: 3,
            //width: { xs: `calc(100%)`, sm: `calc(100% - ${drawerWidth}px)` },
            width: 1,
          }}
        >
          <Grid sx={{padding: 2}}>
            <Typography color="primary" variant="h5">
              Create journal
            </Typography>
          </Grid>

          <Grid container sx={{ width: "100%" }}>

            <TextField
              type="text"
              variant="filled"
              fullWidth
              placeholder="Ingrese un título"
              label="Título"
              sx={{ border: "none", mb: 1 }}
              name="title"
              //value={title}
              onChange={onInputChange}
            />

            <TextField
              type="text"
              variant="filled"
              fullWidth
              multiline
              placeholder="¿Qué sucedió en el día de hoy?"
              minRows={5}
              name="body"
              //value={body}
              onChange={onInputChange}
            />
          </Grid>

          <Grid>
            <input
              type="file"
              multiple
              ref={fileInputRef}
              onChange={onFileInputChange}
              style={{ display: "none" }}
            />
            <IconButton
              color="primary"
              //disabled={isSaving}
              onClick={() => fileInputRef.current!.click()}
            >
              <UploadOutlined />
            </IconButton>

            <Button
              //disabled={isSaving}
              color="primary"
              sx={{ padding: 2 }}
              onClick={onSaveNote}
            >
              <SaveOutlined sx={{ fontSize: 30, mr: 1 }} />
              Guardar
            </Button>
          </Grid>

          <Grid container justifyContent="end">
            <Button onClick={onDelete} sx={{ mt: 2 }} color="error">
              <DeleteOutline />
              Borrar
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};
