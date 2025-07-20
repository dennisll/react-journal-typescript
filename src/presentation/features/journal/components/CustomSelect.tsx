import FormControl from "@mui/material/FormControl";
import Grid from "@mui/material/Grid";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import OutlinedInput from "@mui/material/OutlinedInput";
import Select, { type SelectChangeEvent } from "@mui/material/Select";
import { type FC } from "react";
import type { Client } from "../../../../domain/entities/client";

interface Props {
  name: string;
  initialData?: Client[];
  onSelectChange?: ({target}: SelectChangeEvent<string>) => void;
  value: string;
}

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export const CustomSelect: FC<Props> = ({ initialData, onSelectChange, value, name}) => {

  return (
    <Grid size={12} sx={{ mt: 2 }}>

      <FormControl 
       
      sx={{ width: '100%', display: 'flex' }}
      >
        <InputLabel id="demo-multiple-name-label">Name</InputLabel>
        <Select
          labelId="demo-multiple-name-label"
          id="demo-multiple-name"
          name={name}
          value={value}
          onChange={onSelectChange}
          input={<OutlinedInput label="Name" />}
          MenuProps={MenuProps}
        >
        
            {initialData?.map((client) => (
              <MenuItem
                key={client.id}
                value={client.name}
              >
                {client.name}
              </MenuItem>
            ))}
          
        </Select>
      </FormControl>
    </Grid>
  );
};
