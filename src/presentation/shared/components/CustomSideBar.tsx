
import Drawer from "@mui/material/Drawer";
import { CustomDrawer } from "./Drawer";
//import type { SxProps } from "@mui/material";

interface Props {
  drawerWidth?: number;
  mobileOpen: boolean;
  handleDrawerClose: () => void;
  handleDrawerTransitionEnd: () => void;
}

export const CustomSideBar = (props: Props) => {
  const {
    drawerWidth = 280,
    mobileOpen,
    handleDrawerClose,
    handleDrawerTransitionEnd,
  } = props;

  return (
    <>
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onTransitionEnd={handleDrawerTransitionEnd}
        onClose={handleDrawerClose}
        sx={{
          display: { xs: "block", sm: "none" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
          },
        }}
        slotProps={{
          root: {
            keepMounted: true, // Better open performance on mobile.
          },
        }}
      >
        <CustomDrawer/>
      </Drawer>

      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", sm: "block" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
          },
        }}
        open
      >
        <CustomDrawer/>
      </Drawer>
    </>
  );
};
