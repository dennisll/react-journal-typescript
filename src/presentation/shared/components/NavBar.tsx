import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";
import Grid from "@mui/material/Grid";
import LogoutOutlined from "@mui/icons-material/LogoutOutlined";
//import { useCustomLayout} from '../hooks/useLayout';

interface Props {
  drawerWidth?: number;
  handleDrawerToggle: () => void;
}

export const NavBar = (props: Props) => {

  const { drawerWidth = 280, handleDrawerToggle } = props;
  
  const onLogout = ()=>{

  }

  return (
    <AppBar
      position="fixed"
      sx={{
        width: { sm: `calc(100% - ${drawerWidth}px)` },
        ml: { sm: `${drawerWidth}px` },
      }}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{ mr: 2, display: { sm: "none" } }}
        >
          <MenuIcon />
        </IconButton>

        <Grid
          container
          sx={{ width: "100%" }}
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography variant="h6" noWrap component="div">
            {" "}
            JournalApp{" "}
          </Typography>

          <IconButton color="error" onClick={onLogout}>
            <LogoutOutlined />
          </IconButton>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};
