import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import TaskAltOutlinedIcon from "@mui/icons-material/TaskAltOutlined";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../redux/reduxHooks";

const routes = ["/register", "/journal", "/client"];

export const CustomDrawer = () => {

  const user = useAppSelector( state => state.auth.user);

  const navigate = useNavigate();

  const navigateTo = (url: string) => {
    navigate(url);
  };

  return (
    <div>
      <Toolbar>
        <Typography variant="h6" noWrap component="div" >
          {user?.displayName.toUpperCase()}
        </Typography>
      </Toolbar>

      <Divider />
      <List>
        {
          routes.map( url => (
            <ListItem key={url} disablePadding>
          <ListItemButton onClick={() => navigateTo(url)}>
            <ListItemIcon>
              <TaskAltOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary={url.split('/').at(1)?.toUpperCase()} />
          </ListItemButton>
        </ListItem>
          ))
        }
      </List>
    </div>
  );
};
