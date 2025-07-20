import { useTheme, type Theme } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import Grid from "@mui/material/Grid";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import OutlinedInput from "@mui/material/OutlinedInput";
import Select, { type SelectChangeEvent } from "@mui/material/Select";
import { type FC } from "react";

interface Props {
  initialData: string[];
  name: string;
  onSelectChange: ({target}: SelectChangeEvent<string []>) => void;
  value: string [];
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

function getStyles(name: string, personName: string[], theme: Theme) {
  return {
    fontWeight: personName.includes(name)
      ? theme.typography.fontWeightMedium
      : theme.typography.fontWeightRegular,
  };
}

export const CustomMultipleSelect: FC<Props> = ({ initialData, onSelectChange, name, value}) => {
  
  const theme = useTheme();

  return (
    <Grid>
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="demo-multiple-name-label">Name</InputLabel>
        <Select
          labelId="demo-multiple-name-label"
          id={name}
          multiple
          value={value}
          name = {name}
          onChange={onSelectChange}
          input={<OutlinedInput label="Name" />}
          MenuProps={MenuProps}
        >
        
            {initialData?.map((name) => (
              <MenuItem
                key={name}
                value={name}
                style={getStyles(name, initialData, theme)}
              >
                {name}
              </MenuItem>
            ))}
          
        </Select>
      </FormControl>
    </Grid>
  );
};
