import Grid from "@mui/material/Grid";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimeField } from "@mui/x-date-pickers/TimeField";
import dayjs, { Dayjs } from "dayjs";
import type { Register } from "../../../../domain/entities/register";
import Button from "@mui/material/Button";
import { Edit } from "@mui/icons-material";
import type { PickerValue } from "@mui/x-date-pickers/internals/models";
import { useEffect, useState } from "react";

import { Alert, CircularProgress } from "@mui/material";
import { useUpdateRegisterMutation } from "../../../redux/services/registerApi";
import { UpdateRegisterDto } from "../../../../domain";
import { useHandledError } from "../../../hooks/useHandledError";
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query/react";

interface Props {
  register: Register;
  setValue: React.Dispatch<React.SetStateAction<dayjs.Dayjs | null>>;
}

export const UpdateRegisterField = (props: Props) => {
  const [value, setValue] = useState<Dayjs | null>(
    dayjs(props.register.createdAt)
  );

  const [
    updateRegisterApi,
    { isError, isLoading, isSuccess, error: errorRegister },
  ] = useUpdateRegisterMutation();

  const { handledError, errorMessage } = useHandledError();

  const onChangeDate = (newValue: PickerValue) => {
    setValue(dayjs(newValue));
  };

  const updateRegister = () => {
    const register = { ...props.register, updatedAt: value!.toISOString() };

    const [error, registerDto] = UpdateRegisterDto.create({ ...register });

    if (error) {
      console.log(error);
      return;
    }

    if (isError) console.log(errorRegister);

    updateRegisterApi(registerDto!);
  };

  useEffect(() => {
    if (isSuccess) {
      setTimeout(() => {
        props.setValue(null);
      }, 2000);
      handledError({ errorDto: "Request of updating sent correctly", success: true});
    }

    if (isError) {

          const typeError = errorRegister as FetchBaseQueryError;
          handledError({ error: typeError });
        }

  }, [isSuccess, isError]);

  return (
    <Grid>
      <Grid sx={{ mt: 3, display: "flex" }}>
        {isLoading ? (
          <CircularProgress />
        ) : (
          <Button
            sx={{
              backgroundColor: "primary.main",
              color: "white",
              mr: 3,
            }}
            disabled={isLoading}
            onClick={updateRegister}
          >
            <Edit sx={{ fontSize: 30, mr: 1 }} /> Update
          </Button>
        )}

        <LocalizationProvider
          dateAdapter={AdapterDayjs}
          //adapterLocale={locale}
        >
          <TimeField
            label="Time"
            name="timeField"
            value={value}
            onChange={(newValue) => onChangeDate(newValue)}
            //format=""
          />
        </LocalizationProvider>
      </Grid>

      {(isError) && errorMessage.length > 2 ? (
        <Grid sx={{ mt: 2 }}>
          <Alert severity="error">{errorMessage}</Alert>
        </Grid>
      ) : null}

      {isSuccess && errorMessage.length > 2 ? (
        <Grid sx={{ mt: 2 }}>
          <Alert severity="success">{errorMessage}</Alert>
        </Grid>
      ) : null}
    </Grid>
  );
};
