import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../../redux/reduxHooks";

import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import type { PickerValue } from "@mui/x-date-pickers/internals";
import {
  Alert,
  Card,
  CardMedia,
  CircularProgress,
  IconButton,
} from "@mui/material";

import { UpdateRegisterField } from "../components/UpdateRegisterField";
import { useEffect, useState } from "react";
import { AddOutlined } from "@mui/icons-material";
import { useGetLocation } from "../../../hooks/useGetLocation";
import {
  useCreateRegisterMutation,
  useGetRegistersQuery,
  useUploadImagesMutation,
} from "../../../redux/services/registerApi";
import { useHandledError } from "../../../hooks/useHandledError";
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query/react";
import { CreateRegisterDto } from "../../../../domain";
import { Camera } from "../components/Camera";
import { base64ToFile } from "../../../helpers/converterBase64ToFile";
import { UploadFileDto } from "../../../../domain/dtos/files/uploadFilesDto";

export const RegisterView = () => {

  const { user } = useAppSelector((state) => state.auth);
  const { handledError, errorMessage } = useHandledError();
  const navigate = useNavigate();
  const { location, setCustomLocation } = useGetLocation();
  const [value, setValue] = useState<Dayjs | null>(null); //dayjs('2022-04-17T18:30')

  const [showCam, setShowCam] = useState(false);
  const [imageData, setImageData] = useState<string | null>(null);

  const [
    onCreateRegister,
    {
      isError: isCreateError,
      isLoading: isCreateLoading,
      isSuccess: isCreateSuccess,
      error: errorWhileCreate,
    },
  ] = useCreateRegisterMutation();

  const [uploadImage] = useUploadImagesMutation();

  const { data, isError, isLoading, error } = useGetRegistersQuery(
    { idUser: user!.id, date: value ? value?.toISOString() : "" },
    { skip: value === null ? true : false }
  );

  const navigatetoRegisters = () => {
    navigate(`/register/search?idUser=${user!.id}`);
  };

  const getRegisters = async (newValue: PickerValue) => {
    setValue(dayjs(newValue));
    handledError({ errorDto: "", success: true });
  };

  const createRegister = (imageData: string) => {
    const userId = user!.id;
    const errorLocation = location[0] ? location[0] : "";

    if (errorLocation) {
      handledError({ errorDto: errorLocation });
    }

    const { lat, long } = location[1]!;

    const [error, registerDto] = CreateRegisterDto.create({
      idUser: userId,
      lat,
      long,
      imageUrl: imageData,
    });

    if (error) {
      handledError({ errorDto: error });
    }

    onCreateRegister(registerDto!);

    setShowCam(true);
  };

  const getImageUrl = async () => {

    const parts = imageData!.split(';base64,');
    const mimeType = parts[0].split(':')[1];
    const type = mimeType.split('/')[1];

    const image = base64ToFile(imageData!, `image.${type}`);
    
    const [errorImage, imageDto] = UploadFileDto.create(image);

    if (errorImage) {
      handledError({ errorDto: errorImage });
    } 

    const imageUrl =  await uploadImage(imageDto!.formData);

    if (imageUrl.error) {
      const typeError = imageUrl.error as FetchBaseQueryError;
      handledError({ error: typeError });
    }
    
    createRegister(imageUrl.data![0]);
    setShowCam(false);
    setImageData(null);
  }


  useEffect(() => {
    setCustomLocation();

    if (isError || isCreateError) {
      let typeError;

      if (isError) typeError = error as FetchBaseQueryError;
      if (isCreateError) typeError = errorWhileCreate as FetchBaseQueryError;

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
          {showCam ? (
            <Grid sx={{mb:3}}>
              <Camera setValue={setImageData} sendImage={getImageUrl} />
            </Grid>
          ) : (
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
          )}

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

            {isLoading ? (
              <Grid>
                <CircularProgress />
              </Grid>
            ) : null}

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

            {value !== null
              ? data?.map((register) => (
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
              disabled={isCreateLoading}
              onClick={() => setShowCam(true)}
            >
              <AddOutlined sx={{ fontSize: 30 }} />
            </IconButton>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};
