import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useNavigate } from "react-router-dom";
import { useRegisterStore } from "../../../redux/registerSlice/useRegisterStore";
import { useAppSelector } from "../../../redux/reduxHooks";

import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import type { PickerValue } from "@mui/x-date-pickers/internals";
import { Card, CardMedia, IconButton } from "@mui/material";

import { UpdateRegisterField } from "../components/UpdateRegisterField";
import { useEffect, useState } from "react";
import { AddOutlined } from "@mui/icons-material";
import { useGetLocation } from "../../../hooks/useGetLocation";

export const RegisterView = () => {
  const { onCreateRegister, onGetRegisters } = useRegisterStore();
  const { user } = useAppSelector((state) => state.auth);
  const { registers} = useAppSelector((state) => state.register);
  const navigate = useNavigate();

  const { location, setCustomLocation } = useGetLocation();

  const [value, setValue] = useState<Dayjs | null>(null); //dayjs('2022-04-17T18:30')

  const navigatetoRegisters = () => {
    navigate(`/register/search?idUser=${user!.id}`);
  };

  const getRegisters = async (newValue: PickerValue) => {
    onGetRegisters({ idUser: user!.id, data: newValue!.toString() });
    setValue(dayjs(newValue));
  };

  const createRegister = () => {
    const userId = user!.id;
    const errorLocation = location[0] ? location[0] : "";
    onCreateRegister({ userId, ...location[1], errorLocation });
  };

  useEffect(() => {
    setCustomLocation();
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
          onClick={navigatetoRegisters}
        >
          <ArrowForwardIcon sx={{ fontSize: 30, mr: 1 }} />
          Registers
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
          <Grid sx={{ pb: 5 }}>
            <Card>
              <CardMedia
                component="img"
                sx={{ borderRadius: "300px" }} 
                image="/src/assets/trabajo-equipo-ti-recluit.jpg"
                alt="Imagen con bordes redondeados"
              />
            </Card>
          </Grid>

          <Grid>
            <Grid sx={{ display: "flex" }}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  sx={{
                    mr: 3,
                    fontSize: 30,
                    width: {},
                  }}
                  label="Actualizar registros"
                  value={value} // aca deberia estar el valor del ultimo registro creado, o sea el registro activo
                  onChange={(newValue) => getRegisters(newValue)}
                  slotProps={{
                    textField: {
                      helperText:
                        "Para actualizar un registro seleccione una fecha",
                    },
                  }}
                  format="YYYY-MM-DD"
                />
              </LocalizationProvider>
            </Grid>

            {value !== null
              ? registers?.map((register) => (
                  <UpdateRegisterField
                    key={register.id}
                    register={{ ...register }}
                    setValue={setValue}
                  />
                ))
              : null}

            <IconButton
              size="large"
              sx={{
                color: "white",
                backgroundColor: "error.main",
                ":hover": { backgroundColor: "error.main", opacity: 0.9 },
                position: "fixed",
                right: 50,
                bottom: 50,
              }}
              disabled={value !== null}
              onClick={createRegister}
            >
              <AddOutlined sx={{ fontSize: 30 }} />
            </IconButton>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};
