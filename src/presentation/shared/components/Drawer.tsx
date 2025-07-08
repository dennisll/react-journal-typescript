import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import TaskAltOutlinedIcon from "@mui/icons-material/TaskAltOutlined";
import { useNavigate } from "react-router-dom";

export const CustomDrawer = () => {
  const navigate = useNavigate();

  const navigateToJournal = () => {
    navigate("/journal");
  };
  const navigateToRegister = () => {
    navigate("/register");
  };

  return (
    <div>
      <Toolbar>
        <Typography variant="h6" noWrap component="div">
          Responsive drawer
        </Typography>
      </Toolbar>

      <Divider />
      <List>
        <ListItem disablePadding>
          <ListItemButton onClick={navigateToRegister}>
            <ListItemIcon>
              <AccessTimeOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary="Register" />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton onClick={navigateToJournal}>
            <ListItemIcon>
              <TaskAltOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary="Journal" />
          </ListItemButton>
        </ListItem>
      </List>
    </div>
  );
};
