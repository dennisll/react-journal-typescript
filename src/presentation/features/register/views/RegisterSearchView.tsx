import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useRegisterStore } from "../../../redux/registerSlice/useRegisterStore";
import { useEffect } from "react";
import { useAppSelector } from "../../../redux/reduxHooks";
import { Button, CircularProgress, Toolbar } from "@mui/material";
import type { Register } from "../../../../domain/entities/register";
import DeleteIcon from "@mui/icons-material/Delete";

export const RegisterSearchView = () => {
  const { onGetRegisters, onDeleteRegister, onSetActiveRegister } =
    useRegisterStore();
  const { registers, isLoading, active } = useAppSelector((state) => state.register);

  const params = new URLSearchParams(location.search);
  const idUser = params.get("idUser") ? (params.get("idUser") as string) : "";
  const data = params.get("data") ? (params.get("data") as string) : "";

  const deleteRegister = (register: Register) => {
    onSetActiveRegister(register);
    onDeleteRegister(register.id);
  };

  useEffect(() => {
    onGetRegisters({ idUser, data });
  }, []);

  return (
    <Grid>
      {registers?.map((register) => (
        <Grid key={register.id} container sx={{ display: "flex" }}>
          <Toolbar>
            <Typography sx={{ mr: 2 }}>{register.createdAt}</Typography>
            <Typography sx={{ mr: 2 }}>{register.lat}</Typography>
            <Typography sx={{ mr: 2 }}>{register.long}</Typography>
            <Typography sx={{ mr: 2 }}>{register.imageUrl}</Typography>
            {/* <Button onClick={() => updateRegister(register)}>Edit</Button> */}

            {(isLoading && active?.id === register.id) ? (
              <CircularProgress />
            ) : (
              <Button onClick={() => deleteRegister(register)}><DeleteIcon sx={{color: 'error.main'}}/> </Button>
            )}
          </Toolbar>
        </Grid>
      ))}
    </Grid>
  );
};
