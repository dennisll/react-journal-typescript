import { StarOutline } from "@mui/icons-material";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";



export const NothingSelectedView = () => {

  return (
    <>
      <Grid sx={{ display: "flex" }}>

        <Grid
          className=" animate__animated animate__fadeIn animate__faster"
          container
          direction="column"
          alignItems="center"
          justifyContent="center"
          sx={{
            minHeight: "calc(100vh - 110px)",
            backgroundColor: "primary.main",
            borderRadius: 3,
            //width: { xs: `calc(100%)`, sm: `calc(100% - ${drawerWidth}px)` },
            width: 1
          }}
        >
          <Grid>
            <StarOutline sx={{ fontSize: 100, color: "white" }} />
          </Grid>

          <Grid>
            <Typography color="white" variant="h5">
              Selecciona o crea una entrada
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};
