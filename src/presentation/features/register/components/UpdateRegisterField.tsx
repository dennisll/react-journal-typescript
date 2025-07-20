import Grid from "@mui/material/Grid";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimeField } from "@mui/x-date-pickers/TimeField";
import dayjs, { Dayjs } from "dayjs";
import type { Register } from "../../../../domain/entities/register";
import Button from "@mui/material/Button";
import { Edit } from "@mui/icons-material";
import type { PickerValue } from "@mui/x-date-pickers/internals/models";
import { useState } from "react";
import { useRegisterStore } from "../../../redux/registerSlice/useRegisterStore";
import { useAppSelector } from "../../../redux/reduxHooks";
import { CircularProgress } from "@mui/material";
//import { useNavigate } from "react-router-dom";

interface Props{
  register: Register
  setValue: React.Dispatch<React.SetStateAction<dayjs.Dayjs | null>>
}

export const UpdateRegisterField = (props: Props) => {

  const [value, setValue] = useState<Dayjs | null>(dayjs(props.register.createdAt));
  const { onUpdateRegister } = useRegisterStore();
  const {isLoading} = useAppSelector(state => state.register);

  const onChangeDate = (newValue: PickerValue)=>{

    setValue(dayjs(newValue));
  }

  const updateRegister = () => {

      const register = {...props.register, createdAt: value!.toISOString()}

      onUpdateRegister(register);
      props.setValue(null);
     // navigate(`/register/search?idUser=${register.idUser}`)
      
    };

  return (
    <Grid sx={{ mt: 3, display: "flex" }}>
      
      {isLoading ? 
      (<CircularProgress/>): 
      (<Button
        sx={{
          backgroundColor: "primary.main",
          color: "white",
          mr: 3,
        }}
        //disabled={isSaving}
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
  );
};
